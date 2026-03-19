const User = require('../models/User');
const Report = require('../models/Report');
const Notification = require('../models/Notification');

// @desc  Get user dashboard data
// @route GET /api/users/dashboard
// @access Private
exports.getUserDashboard = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const reports = await Report.find({ reporter: req.user._id })
      .sort({ createdAt: -1 })
      .limit(5);

    const totalReports = await Report.countDocuments({ reporter: req.user._id });
    const rescued = await Report.countDocuments({ reporter: req.user._id, status: 'rescued' });

    const notifications = await Notification.find({ recipient: req.user._id, isRead: false })
      .sort({ createdAt: -1 })
      .limit(10);

    res.json({
      success: true,
      user: {
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        rewardPoints: user.rewardPoints,
        role: user.role,
      },
      stats: { totalReports, rescued },
      recentReports: reports,
      notifications,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc  Get NGO dashboard data
// @route GET /api/users/ngo-dashboard
// @access Private (NGO/Vet/Shelter)
exports.getNGODashboard = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    const acceptedCases = await Report.countDocuments({ assignedTo: req.user._id });
    const rescuedCases = await Report.countDocuments({ assignedTo: req.user._id, status: 'rescued' });
    const activeCases = await Report.find({ assignedTo: req.user._id, status: { $in: ['accepted', 'under_treatment'] } })
      .populate('reporter', 'name phone');

    const notifications = await Notification.find({ recipient: req.user._id, isRead: false })
      .sort({ createdAt: -1 })
      .limit(10);

    res.json({
      success: true,
      user: {
        name: user.name,
        organizationName: user.organizationName,
        verified: user.verified,
        role: user.role,
      },
      stats: { acceptedCases, rescuedCases },
      activeCases,
      notifications,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc  Mark notifications as read
// @route PUT /api/users/notifications/read
// @access Private
exports.markNotificationsRead = async (req, res) => {
  try {
    await Notification.updateMany({ recipient: req.user._id, isRead: false }, { isRead: true });
    res.json({ success: true, message: 'All notifications marked as read' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc  Get all notifications
// @route GET /api/users/notifications
// @access Private
exports.getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ recipient: req.user._id })
      .sort({ createdAt: -1 })
      .limit(20);

    res.json({ success: true, notifications });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
