const express = require('express');
const router = express.Router();
const { getUserDashboard, getNGODashboard, markNotificationsRead, getNotifications } = require('../controllers/userController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.get('/dashboard', protect, getUserDashboard);
router.get('/ngo-dashboard', protect, authorize('ngo', 'vet', 'shelter', 'admin'), getNGODashboard);
router.get('/notifications', protect, getNotifications);
router.put('/notifications/read', protect, markNotificationsRead);

module.exports = router;
