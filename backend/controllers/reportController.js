const Report = require('../models/Report');
const User = require('../models/User');
const Notification = require('../models/Notification');

// Helper: send real-time notification via Socket.io
const sendSocketNotification = (io, recipientId, notification) => {
  if (io) {
    io.to(recipientId.toString()).emit('notification', notification);
  }
};

// @desc  Create a new animal report
// @route POST /api/reports
exports.createReport = async (req, res) => {
  try {
    const io = req.app.get('io');
    const { animalType, description, severity, coordinates, address, city, state } = req.body;

    const images = req.files ? req.files.map((f) => `/uploads/reports/${f.filename}`) : [];
    const parsedCoords = typeof coordinates === 'string' ? JSON.parse(coordinates) : coordinates;

    // ─── VALIDATION (Requirement 5) ───
    if (!images.length) {
      return res.status(400).json({ success: false, message: 'Live camera image capturing is required.' });
    }
    if (!parsedCoords || !Array.isArray(parsedCoords) || parsedCoords.length < 2) {
      return res.status(400).json({ success: false, message: 'Strict live GPS Location coordinates are required.' });
    }

    const isLoggedIn = !!req.user;

    // Build report data
    const reportData = {
      animalType,
      description,
      severity: severity || 'medium',
      images,
      imageUrl: images[0], // Set main image URL for backwards compatibility
      latitude: parsedCoords[1], // Requirement 3 scalar layout mapping
      longitude: parsedCoords[0], // Requirement 3 scalar layout mapping
      location: {
        type: 'Point',
        coordinates: parsedCoords, // [lng, lat]
        address,
        city,
        state,
      },
    };

    // Link reporter only if logged in
    if (isLoggedIn) {
      reportData.reporter = req.user._id;
      reportData.statusHistory = [{ status: 'reported', updatedBy: req.user._id, note: 'Report submitted' }];
    } else {
      // Anonymous report — no reporter linked
      reportData.statusHistory = [{ status: 'reported', note: 'Anonymous report submitted' }];
    }

    const report = await Report.create(reportData);

    // Award reward points to logged-in reporter
    if (isLoggedIn) {
      let pointsToAward = 50; // Base points for submitting a report
      if (images.length > 0) pointsToAward += 25; // Bonus for photos

      await User.findByIdAndUpdate(req.user._id, {
        $inc: { rewardPoints: pointsToAward },
      });

      // Create a points notification for reporter
      const pointsNotif = await Notification.create({
        recipient: req.user._id,
        type: 'reward_earned',
        title: `🎁 +${pointsToAward} Points Earned!`,
        message: `Thanks for reporting! You earned ${pointsToAward} reward points. You'll get +100 more when the animal is rescued.`,
        relatedReport: report._id,
      });
      sendSocketNotification(io, req.user._id.toString(), pointsNotif);
    }

    // Populate reporter for response (only if linked)
    if (isLoggedIn) await report.populate('reporter', 'name email');

    // Find nearby NGOs/Vets/Shelters within 50km and notify them
    const nearby = await User.find({
      role: { $in: ['ngo', 'vet', 'shelter'] },
      isActive: true,
      location: {
        $near: {
          $geometry: { type: 'Point', coordinates: parsedCoords },
          $maxDistance: 50000, // 50km in meters
        },
      },
    }).select('_id name');

    // Create notifications for nearby orgs
    await Promise.all(
      nearby.map(async (org) => {
        const notif = await Notification.create({
          recipient: org._id,
          type: 'new_report',
          title: '🆘 New Animal Emergency Nearby!',
          message: `A ${animalType} needs help near ${city || address}. ${description.substring(0, 80)}...`,
          relatedReport: report._id,
        });
        sendSocketNotification(io, org._id, notif);
      })
    );

    res.status(201).json({
      success: true,
      report,
      notifiedOrgs: nearby.length,
      pointsAwarded: isLoggedIn ? (images.length > 0 ? 75 : 50) : 0,
      isAnonymous: !isLoggedIn,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};


// @desc  Get all reports (with filters)
// @route GET /api/reports
// @access Public/Private
exports.getReports = async (req, res) => {
  try {
    const { status, animalType, severity, page = 1, limit = 10 } = req.query;

    const filter = {};
    if (status) filter.status = status;
    if (animalType) filter.animalType = animalType;
    if (severity) filter.severity = severity;

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const reports = await Report.find(filter)
      .populate('reporter', 'name email avatar')
      .populate('assignedTo', 'name organizationName')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Report.countDocuments(filter);

    res.json({
      success: true,
      reports,
      pagination: { total, page: parseInt(page), pages: Math.ceil(total / parseInt(limit)) },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc  Get single report
// @route GET /api/reports/:id
// @access Public
exports.getReport = async (req, res) => {
  try {
    const report = await Report.findById(req.params.id)
      .populate('reporter', 'name email avatar phone')
      .populate('assignedTo', 'name organizationName phone')
      .populate('statusHistory.updatedBy', 'name role');

    if (!report) return res.status(404).json({ success: false, message: 'Report not found' });

    res.json({ success: true, report });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc  Get user's own reports
// @route GET /api/reports/my-reports
// @access Private
exports.getMyReports = async (req, res) => {
  try {
    const reports = await Report.find({ reporter: req.user._id })
      .populate('assignedTo', 'name organizationName')
      .sort({ createdAt: -1 });

    res.json({ success: true, reports });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc  Get nearby reports (for NGO dashboard)
// @route GET /api/reports/nearby
// @access Private (NGO/Vet/Shelter)
exports.getNearbyReports = async (req, res) => {
  try {
    const { lat, lng, radius = 20 } = req.query; // radius in km

    if (!lat || !lng) {
      return res.status(400).json({ success: false, message: 'Latitude and longitude required' });
    }

    const reports = await Report.find({
      status: { $in: ['reported', 'accepted'] },
      location: {
        $near: {
          $geometry: { type: 'Point', coordinates: [parseFloat(lng), parseFloat(lat)] },
          $maxDistance: parseInt(radius) * 1000,
        },
      },
    })
      .populate('reporter', 'name phone')
      .sort({ createdAt: -1 });

    res.json({ success: true, reports });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc  Update report status (NGO/Vet/Shelter)
// @route PUT /api/reports/:id/status
// @access Private (NGO/Vet/Shelter/Admin)
exports.updateReportStatus = async (req, res) => {
  try {
    const io = req.app.get('io');
    const { status, note } = req.body;

    const report = await Report.findById(req.params.id);
    if (!report) return res.status(404).json({ success: false, message: 'Report not found' });

    // Set assignedTo if accepting
    if (status === 'accepted' && !report.assignedTo) {
      report.assignedTo = req.user._id;
    }

    report.status = status;
    report.statusHistory.push({ status, updatedBy: req.user._id, note });

    // Award rescue bonus points to the original reporter (only if they are a registered user)
    if (status === 'rescued' && !report.rewardAwarded && report.reporter) {
      report.rewardAwarded = true;
      const rescuePoints = report.rewardPoints || 100;

      await User.findByIdAndUpdate(report.reporter, {
        $inc: { rewardPoints: rescuePoints },
      });

      // Notify reporter about points
      const notif = await Notification.create({
        recipient: report.reporter,
        type: 'reward_earned',
        title: '🎁 You earned rescue bonus points!',
        message: `The animal you reported has been rescued! You earned ${rescuePoints} bonus reward points. Keep up the great work!`,
        relatedReport: report._id,
      });
      sendSocketNotification(io, report.reporter.toString(), notif);
    }

    // Notify reporter about status changes (only if reporter is a registered user)
    if (report.reporter) {
      const statusNotif = await Notification.create({
        recipient: report.reporter,
        type: 'report_status_update',
        title: `Report Status Updated: ${status.replace(/_/g, ' ').toUpperCase()}`,
        message: note || `Your report status has been updated to ${status}`,
        relatedReport: report._id,
      });
      sendSocketNotification(io, report.reporter.toString(), statusNotif);
    }

    await report.save();
    await report.populate('assignedTo reporter', 'name organizationName email');

    res.json({ success: true, report });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


// @desc  Get dashboard stats
// @route GET /api/reports/stats
// @access Private
exports.getStats = async (req, res) => {
  try {
    const totalReports = await Report.countDocuments();
    const rescued = await Report.countDocuments({ status: 'rescued' });
    const inProgress = await Report.countDocuments({ status: { $in: ['accepted', 'under_treatment'] }});
    const pending = await Report.countDocuments({ status: 'reported' });

    const byAnimalType = await Report.aggregate([
      { $group: { _id: '$animalType', count: { $sum: 1 } } },
    ]);

    res.json({
      success: true,
      stats: { totalReports, rescued, inProgress, pending, byAnimalType },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
