const express = require('express');
const router = express.Router();
const { getNGOs, getNGO, updateLocation } = require('../controllers/ngoController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.get('/', getNGOs);
router.get('/:id', getNGO);
router.put('/location', protect, authorize('ngo', 'vet', 'shelter'), updateLocation);

module.exports = router;
