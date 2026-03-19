const express = require('express');
const router = express.Router();
const {
  createReport, getReports, getReport, getMyReports,
  getNearbyReports, updateReportStatus, getStats,
} = require('../controllers/reportController');
const { protect, optionalAuth, authorize } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

router.get('/stats', getStats);
router.get('/my-reports', protect, getMyReports);
router.get('/nearby', protect, authorize('ngo', 'vet', 'shelter', 'admin'), getNearbyReports);
router.get('/', getReports);
router.get('/:id', getReport);
// Public: anyone can report; optionalAuth attaches user if logged in (for reward points)
router.post('/', optionalAuth, upload.array('images', 5), createReport);
router.put('/:id/status', protect, authorize('ngo', 'vet', 'shelter', 'admin'), updateReportStatus);

module.exports = router;
