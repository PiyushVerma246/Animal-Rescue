const express = require('express');
const router = express.Router();
const {
  getAdoptions, createAdoption, getAdoption, requestAdoption, handleAdoptionRequest,
} = require('../controllers/adoptionController');
const { protect, authorize } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

router.get('/', getAdoptions);
router.get('/:id', getAdoption);
router.post('/', protect, authorize('ngo', 'vet', 'shelter', 'admin'), upload.array('images', 5), createAdoption);
router.post('/:id/request', protect, requestAdoption);
router.put('/:id/request/:requestId', protect, authorize('ngo', 'vet', 'shelter', 'admin'), handleAdoptionRequest);

module.exports = router;
