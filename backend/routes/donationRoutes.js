const express = require('express');
const router = express.Router();
const { createCheckoutSession, confirmDonation, getMyDonations, getDonationNgos } = require('../controllers/donationController');
const { protect } = require('../middleware/authMiddleware');

router.get('/ngos', getDonationNgos);
router.post('/create-checkout-session', protect, createCheckoutSession);
router.post('/confirm', protect, confirmDonation);
router.get('/my-donations', protect, getMyDonations);

module.exports = router;
