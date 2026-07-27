/**
 * Rescue Controller
 * =================
 * Handles all HTTP requests for the rescue deduplication system.
 *
 * Routes:
 *   POST /api/rescue/report  — Submit rescue report (duplicate-aware)
 *   GET  /api/rescue         — Paginated list of rescue cases (admin)
 *   GET  /api/rescue/stats   — Duplicate detection statistics (admin)
 */

const mongoose = require('mongoose');
const path     = require('path');

const Rescue    = require('../models/Rescue');
const User      = require('../models/User');
const Notification = require('../models/Notification');

const { generateEmbedding, checkAIServiceHealth } = require('../services/embeddingService');
const { findDuplicate }                           = require('../services/duplicateDetectionService');

// ── Internal Helpers ──────────────────────────────────────────────────────────

/**
 * Emit a Socket.io notification to a specific user's room.
 * Room keys are the user's MongoDB ObjectId string.
 */
const emitNotification = (io, recipientId, notification) => {
  if (io && recipientId) {
    io.to(recipientId.toString()).emit('notification', notification);
  }
};

// ── Controllers ───────────────────────────────────────────────────────────────

/**
 * submitRescueReport
 * ------------------
 * Main entry point for the duplicate rescue detection system.
 *
 * Flow:
 *   1. Validate image upload (post-multer check)
 *   2. Generate CLIP embedding (graceful fallback if AI unavailable)
 *   3. Open MongoDB transaction
 *   4a. If duplicate found → append reporter + increment witnessCount
 *   4b. If new           → create Rescue document
 *   5. Commit transaction
 *   6. Post-commit: award reward points, notify nearby NGOs
 *
 * The MongoDB transaction in steps 3–5 prevents race conditions when
 * multiple identical reports arrive simultaneously.
 *
 * @route  POST /api/rescue/report
 * @access Public (optionalAuth — reward points for logged-in users)
 */
exports.submitRescueReport = async (req, res) => {
  const session = await mongoose.startSession();

  try {
    const io = req.app.get('io');
    const {
      animalType, description,
      latitude, longitude,
      address, city, state,
      severity,
    } = req.body;

    const parsedLat = parseFloat(latitude);
    const parsedLng = parseFloat(longitude);

    // ── Guard: image is required ────────────────────────────────────────
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'An animal photo is required. Please upload at least one image.',
      });
    }

    const imageStoredPath = `/uploads/reports/${req.file.filename}`;
    const imageAbsPath    = path.join(
      __dirname, '..', 'uploads', 'reports', req.file.filename
    );

    const isLoggedIn = !!req.user;

    // ── Step 1: Generate CLIP embedding ──────────────────────────────────
    // Returns null if the AI micro-service is down — system falls back
    // to location + time only scoring with a lower threshold (0.70).
    const embedding = await generateEmbedding(imageAbsPath);

    if (!embedding) {
      console.warn(
        '[RescueController] No embedding returned — duplicate detection ' +
        'will use geo + time fallback scoring.'
      );
    }

    // ── Steps 2–4: Duplicate detection + DB write (transactional) ────────
    let operationResult; // Holds the outcome for use after the transaction

    await session.withTransaction(async () => {
      const duplicateMatch = await findDuplicate({
        embedding,
        coordinates: [parsedLng, parsedLat],
        animalType,
        session,
      });

      if (duplicateMatch) {
        // ── DUPLICATE DETECTED ─────────────────────────────────────────
        const {
          rescue,
          finalScore,
          imageSimilarity,
          locationScore,
          timeScore,
          isEmbeddingFallback,
        } = duplicateMatch;

        // Append this reporter to the existing rescue document
        rescue.reporters.push({
          userId:      isLoggedIn ? req.user._id : null,
          reportTime:  new Date(),
          description,
          images:      [imageStoredPath],
          isAnonymous: !isLoggedIn,
        });

        rescue.witnessCount += 1;

        // Record audit trail for admin panel
        rescue.duplicateStats.push({
          mergedAt:            new Date(),
          finalScore,
          imageSimilarity:     imageSimilarity ?? null,
          locationScore,
          timeScore,
          similarityPercent:   Math.round(finalScore * 100),
          reporterIsAnonymous: !isLoggedIn,
          isEmbeddingFallback,
        });

        await rescue.save({ session });

        operationResult = {
          type:        'duplicate',
          rescue,
          similarity:  Math.round(finalScore * 100),
        };

      } else {
        // ── NEW RESCUE ─────────────────────────────────────────────────
        const [newRescue] = await Rescue.create(
          [
            {
              animalType,
              description,
              images:         [imageStoredPath],
              imageEmbedding: embedding || [],
              location: {
                type:        'Point',
                coordinates: [parsedLng, parsedLat],
                address,
                city,
                state,
              },
              latitude:  parsedLat,
              longitude: parsedLng,
              severity:  severity || 'medium',
              priority:  severity || 'medium',
              reporters: [
                {
                  userId:      isLoggedIn ? req.user._id : null,
                  reportTime:  new Date(),
                  description,
                  images:      [imageStoredPath],
                  isAnonymous: !isLoggedIn,
                },
              ],
              witnessCount:    1,
              primaryReporter: isLoggedIn ? req.user._id : null,
            },
          ],
          { session }
        );

        operationResult = { type: 'new', rescue: newRescue };
      }
    }); // ← transaction committed here

    // ── Post-transaction side effects ─────────────────────────────────────
    // These run outside the transaction (best-effort, non-critical).

    if (operationResult.type === 'new') {
      const rescueId = operationResult.rescue._id;

      // Award reward points to logged-in user
      if (isLoggedIn) {
        const pointsToAward = 75; // 50 base + 25 photo bonus
        await User.findByIdAndUpdate(req.user._id, {
          $inc: { rewardPoints: pointsToAward },
        });

        const pointsNotif = await Notification.create({
          recipient:     req.user._id,
          type:          'reward_earned',
          title:         `🎁 +${pointsToAward} Points Earned!`,
          message:       `Thanks for the rescue report! You earned ${pointsToAward} reward points for your photo and report.`,
          relatedReport: rescueId,
        });
        emitNotification(io, req.user._id, pointsNotif);
      }

      // Find NGOs / Vets / Shelters within 50 km and notify them
      const nearbyOrgs = await User.find({
        role:     { $in: ['ngo', 'vet', 'shelter'] },
        isActive: true,
        location: {
          $near: {
            $geometry:   { type: 'Point', coordinates: [parsedLng, parsedLat] },
            $maxDistance: 50000,
          },
        },
      }).select('_id name');

      await Promise.all(
        nearbyOrgs.map(async (org) => {
          const notif = await Notification.create({
            recipient:     org._id,
            type:          'new_report',
            title:         '🆘 New Animal Emergency Nearby!',
            message:       `A ${animalType} needs help near ${city || address || 'your area'}. ${description.substring(0, 80)}...`,
            relatedReport: rescueId,
          });
          emitNotification(io, org._id, notif);
        })
      );

      session.endSession();

      return res.status(201).json({
        success:        true,
        duplicate:      false,
        rescueId:       operationResult.rescue._id,
        witnessCount:   1,
        pointsAwarded:  isLoggedIn ? 75 : 0,
        aiEmbedding:    !!embedding, // Tells client whether AI was used
        message:
          'Rescue report created successfully! Nearby organisations have been alerted.',
      });
    }

    // Duplicate path
    session.endSession();

    return res.status(200).json({
      success:       true,
      duplicate:     true,
      rescueId:      operationResult.rescue._id,
      witnessCount:  operationResult.rescue.witnessCount,
      similarity:    operationResult.similarity,
      aiEmbedding:   !!embedding,
      message:
        `This rescue has already been reported. Your sighting has been recorded ` +
        `as witness #${operationResult.rescue.witnessCount}. Thank you for caring! 🐾`,
    });

  } catch (error) {
    console.error('[RescueController] submitRescueReport error:', error);

    // Abort transaction if it is still open
    if (session.inTransaction()) {
      await session.abortTransaction().catch(() => {});
    }
    session.endSession();

    res.status(500).json({
      success: false,
      message: error.message || 'An error occurred while processing the rescue report.',
    });
  }
};

/**
 * getRescues
 * ----------
 * Returns a paginated list of rescue cases for the admin panel.
 * imageEmbedding is excluded from the response (too large).
 *
 * @route  GET /api/rescue
 * @access Private (NGO / Vet / Shelter / Admin)
 */
exports.getRescues = async (req, res) => {
  try {
    const { status, animalType, page = 1, limit = 10 } = req.query;

    const filter = {};
    if (status)     filter.status     = status;
    if (animalType) filter.animalType = animalType;

    const skip = (parseInt(page, 10) - 1) * parseInt(limit, 10);

    const rescues = await Rescue.find(filter)
      .select('-imageEmbedding')         // Exclude large embedding vectors
      .populate('primaryReporter', 'name email avatar')
      .populate('assignedTo',      'name organizationName')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit, 10));

    const total = await Rescue.countDocuments(filter);

    res.json({
      success: true,
      rescues,
      pagination: {
        total,
        page:  parseInt(page,  10),
        pages: Math.ceil(total / parseInt(limit, 10)),
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * getRescueStats
 * --------------
 * Aggregated statistics for the duplicate detection admin dashboard.
 *
 * Returns:
 *   - Total rescues, total witnesses
 *   - Total duplicates merged, average similarity %
 *   - Breakdown by animal type and status
 *   - Top 5 most-witnessed cases
 *   - AI service health status
 *
 * @route  GET /api/rescue/stats
 * @access Private (NGO / Vet / Shelter / Admin)
 */
exports.getRescueStats = async (req, res) => {
  try {
    // Run all aggregations concurrently for speed
    const [
      totalRescues,
      witnessAgg,
      duplicatesAgg,
      avgSimilarityAgg,
      byAnimalType,
      byStatus,
      topWitnessed,
      aiHealthy,
    ] = await Promise.all([
      Rescue.countDocuments(),

      Rescue.aggregate([
        { $group: { _id: null, total: { $sum: '$witnessCount' } } },
      ]),

      Rescue.aggregate([
        { $project: { mergeCount: { $size: '$duplicateStats' } } },
        { $group:   { _id: null,  total: { $sum: '$mergeCount' } } },
      ]),

      Rescue.aggregate([
        { $unwind:  '$duplicateStats' },
        { $group:   { _id: null, avg: { $avg: '$duplicateStats.finalScore' } } },
      ]),

      Rescue.aggregate([
        { $group: { _id: '$animalType', count: { $sum: 1 } } },
        { $sort:  { count: -1 } },
      ]),

      Rescue.aggregate([
        { $group: { _id: '$status', count: { $sum: 1 } } },
      ]),

      Rescue.find()
        .select('-imageEmbedding')
        .sort({ witnessCount: -1 })
        .limit(5),

      checkAIServiceHealth(),
    ]);

    res.json({
      success: true,
      stats: {
        totalRescues,
        totalWitnesses:       witnessAgg[0]?.total        || 0,
        duplicatesMerged:     duplicatesAgg[0]?.total     || 0,
        avgSimilarityPercent: avgSimilarityAgg[0]
          ? Math.round(avgSimilarityAgg[0].avg * 100)
          : 0,
        byAnimalType,
        byStatus,
        topWitnessed,
        aiServiceHealthy: aiHealthy,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
