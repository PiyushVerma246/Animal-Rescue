const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema(
  {
    recipient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    type: {
      type: String,
      enum: [
        'new_report',
        'report_accepted',
        'report_status_update',
        'adoption_request',
        'adoption_approved',
        'reward_earned',
        'donation_received',
      ],
      required: true,
    },
    title: { type: String, required: true },
    message: { type: String, required: true },
    relatedReport: { type: mongoose.Schema.Types.ObjectId, ref: 'Report' },
    relatedAdoption: { type: mongoose.Schema.Types.ObjectId, ref: 'Adoption' },
    relatedDonation: { type: mongoose.Schema.Types.ObjectId, ref: 'Donation' },
    isRead: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Notification', notificationSchema);
