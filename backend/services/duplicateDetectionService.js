/**
 * Duplicate Detection Service
 * ===========================
 * Orchestrates the full duplicate-detection pipeline for incoming
 * rescue reports.
 *
 * Pipeline:
 *   1. MongoDB $near geo-query — candidates within 500 m, last 24 h,
 *      same animal type, status ≠ 'closed'  (NEVER scans the whole collection)
 *   2. For each candidate:
 *      a. Cosine similarity of CLIP embeddings
 *      b. Location score (Haversine tiers)
 *      c. Time score (age tiers)
 *      d. Weighted composite score
 *   3. Return the best-scoring candidate if score ≥ threshold, else null.
 */

const Rescue             = require('../models/Rescue');
const { cosineSimilarity, calculateFinalScore, isDuplicate } = require('./similarityService');
const { haversineDistance, locationScore }                   = require('./geoService');
const { timeScore }                                          = require('./timeService');

/** Search radius for candidate geo-query (metres) */
const SEARCH_RADIUS_M = 500;

/** Candidate age window (milliseconds) — 24 hours */
const MAX_AGE_MS = 24 * 60 * 60 * 1000;

/** Maximum number of candidates to score (prevents unbounded work) */
const MAX_CANDIDATES = 20;

/**
 * findDuplicate
 * -------------
 * Finds the best-matching existing Rescue document for an incoming report.
 *
 * @param {object}        params
 * @param {number[]|null} params.embedding    CLIP vector (null if AI unavailable)
 * @param {number[]}      params.coordinates  GeoJSON [longitude, latitude]
 * @param {string}        params.animalType   e.g. 'dog', 'cat'
 * @param {object|null}   params.session      Mongoose session (for transaction safety)
 *
 * @returns {Promise<{
 *   rescue:              mongoose.Document,
 *   finalScore:          number,
 *   imageSimilarity:     number|null,
 *   locationScore:       number,
 *   timeScore:           number,
 *   isEmbeddingFallback: boolean
 * } | null>}
 */
const findDuplicate = async ({ embedding, coordinates, animalType, session = null }) => {
  const [lng, lat] = coordinates;
  const cutoffTime = new Date(Date.now() - MAX_AGE_MS);

  // ── Step 1: Geo-filtered candidate query ─────────────────────────────────
  // Performance note:
  //   $near + the compound index on { status, animalType, createdAt } means
  //   MongoDB first resolves the nearest documents via 2dsphere, then applies
  //   the remaining filters — we never compare against the full collection.
  const queryOptions = session ? { session } : {};

  const candidates = await Rescue.find(
    {
      animalType,
      status:    { $ne: 'closed' },
      createdAt: { $gte: cutoffTime },
      location:  {
        $near: {
          $geometry:   { type: 'Point', coordinates: [lng, lat] },
          $maxDistance: SEARCH_RADIUS_M,
        },
      },
    },
    // Only fetch the fields we need — exclude the large imageEmbedding by default
    // but explicitly include it here since select: false is on the schema field
    'animalType status createdAt latitude longitude imageEmbedding witnessCount duplicateStats reporters',
    queryOptions
  ).limit(MAX_CANDIDATES);

  if (candidates.length === 0) return null;

  // ── Step 2: Score each candidate ─────────────────────────────────────────
  let bestMatch  = null;
  let bestScore  = -1;

  for (const rescue of candidates) {
    // 2a. Image similarity (cosine distance on CLIP vectors)
    //     imageSim is null if either side lacks an embedding
    const storedEmbedding = rescue.imageEmbedding;
    let imageSim = null;
    if (
      embedding && Array.isArray(embedding) && embedding.length > 0 &&
      storedEmbedding && Array.isArray(storedEmbedding) && storedEmbedding.length > 0
    ) {
      imageSim = cosineSimilarity(embedding, storedEmbedding);
    }

    // 2b. Location score
    const distM   = haversineDistance(
      { lat, lng },
      { lat: rescue.latitude, lng: rescue.longitude }
    );
    const locScore = locationScore(distM);

    // Skip candidates that fall outside the 500 m threshold
    // (should not happen after $near, but acts as a safety net)
    if (locScore === 0) continue;

    // 2c. Time score
    const tScore = timeScore(rescue.createdAt);

    // 2d. Weighted composite score
    const { finalScore, isEmbeddingFallback } = calculateFinalScore({
      imageSim,
      locationScore: locScore,
      timeScore:     tScore,
    });

    // 2e. Keep track of the best qualifying match
    if (isDuplicate(finalScore, isEmbeddingFallback) && finalScore > bestScore) {
      bestScore = finalScore;
      bestMatch = {
        rescue,
        finalScore,
        imageSimilarity:     imageSim,
        locationScore:       locScore,
        timeScore:           tScore,
        isEmbeddingFallback,
      };
    }
  }

  return bestMatch; // null if no duplicate found
};

module.exports = { findDuplicate };
