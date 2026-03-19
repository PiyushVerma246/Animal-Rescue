const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema(
  {
    donor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    ngo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // NGO is a User with role 'ngo'
      required: true,
    },
    amount: {
      type: Number,
      required: [true, 'Donation amount is required'],
      min: [1, 'Minimum donation is $1'],
    },
    currency: {
      type: String,
      default: 'usd',
    },
    message: {
      type: String,
      maxlength: 500,
    },
    paymentStatus: {
      type: String,
      enum: ['pending', 'completed', 'failed', 'refunded'],
      default: 'pending',
    },
    paymentMethod: {
      type: String,
      enum: ['stripe', 'razorpay', 'manual'],
      default: 'stripe',
    },
    stripePaymentIntentId: String,
    stripeSessionId: String,
    transactionId: String,
    receipt: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model('Donation', donationSchema);
