const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Donation = require('../models/Donation');
const User = require('../models/User');
const Notification = require('../models/Notification');

// @desc  Create Stripe payment intent / checkout session
// @route POST /api/donations/create-checkout-session
// @access Private
exports.createCheckoutSession = async (req, res) => {
  try {
    const { ngoId, amount, message, currency = 'usd' } = req.body;

    const ngo = await User.findById(ngoId);
    if (!ngo || !['ngo', 'shelter', 'vet'].includes(ngo.role)) {
      return res.status(404).json({ success: false, message: 'NGO not found' });
    }

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency,
            product_data: {
              name: `Donation to ${ngo.organizationName || ngo.name}`,
              description: message || 'Animal Rescue & Care Donation',
            },
            unit_amount: Math.round(amount * 100), // cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.CLIENT_URL}/pages/donation-success.html?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL}/pages/donate.html`,
      metadata: {
        donorId: req.user._id.toString(),
        ngoId: ngoId,
        message: message || '',
      },
    });

    // Create pending donation record
    const donation = await Donation.create({
      donor: req.user._id,
      ngo: ngoId,
      amount,
      currency,
      message,
      paymentStatus: 'pending',
      paymentMethod: 'stripe',
      stripeSessionId: session.id,
    });

    res.json({ success: true, sessionUrl: session.url, sessionId: session.id, donationId: donation._id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc  Confirm donation after payment success
// @route POST /api/donations/confirm
// @access Private
exports.confirmDonation = async (req, res) => {
  try {
    const io = req.app.get('io');
    const { sessionId } = req.body;

    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status !== 'paid') {
      return res.status(400).json({ success: false, message: 'Payment not completed' });
    }

    const donation = await Donation.findOneAndUpdate(
      { stripeSessionId: sessionId },
      { paymentStatus: 'completed', transactionId: session.payment_intent },
      { new: true }
    );

    if (!donation) return res.status(404).json({ success: false, message: 'Donation record not found' });

    // Notify NGO
    const notif = await Notification.create({
      recipient: donation.ngo,
      type: 'donation_received',
      title: '💰 Donation Received!',
      message: `You received a donation of $${donation.amount} from a supporter!`,
      relatedDonation: donation._id,
    });
    if (io) io.to(donation.ngo.toString()).emit('notification', notif);

    res.json({ success: true, donation });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc  Get all donations for a user
// @route GET /api/donations/my-donations
// @access Private
exports.getMyDonations = async (req, res) => {
  try {
    const donations = await Donation.find({ donor: req.user._id })
      .populate('ngo', 'name organizationName avatar')
      .sort({ createdAt: -1 });

    res.json({ success: true, donations });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc  Get all NGOs that can receive donations
// @route GET /api/donations/ngos
// @access Public
exports.getDonationNgos = async (req, res) => {
  try {
    const ngos = await User.find({ role: { $in: ['ngo', 'shelter'] }, isActive: true })
      .select('name organizationName organizationDescription avatar location verified');

    res.json({ success: true, ngos });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
