const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema(
  {
    reporter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: false, // Made optional for guest reports
    },
    animalType: {
      type: String,
      required: [true, 'Animal type is required'],
      enum: ['dog', 'cat', 'bird', 'cow', 'horse', 'monkey', 'rabbit', 'other'],
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      maxlength: [1000, 'Description cannot exceed 1000 characters'],
    },
    images: [{ type: String }], // Array for multiple uploaded photos paths
    imageUrl: { type: String }, // Fulfilling explicit Requirement 3
    latitude: { type: Number, required: [true, 'Latitude is required'] },
    longitude: { type: Number, required: [true, 'Longitude is required'] },
    location: {
      type: {
        type: String,
        enum: ['Point'],
        default: 'Point',
      },
      coordinates: {
        type: [Number], // [longitude, latitude]
        required: true,
      },
      address: String,
      city: String,
      state: String,
    },
    status: {
      type: String,
      enum: ['reported', 'accepted', 'under_treatment', 'rescued', 'closed'],
      default: 'reported',
    },
    severity: {
      type: String,
      enum: ['low', 'medium', 'high', 'critical'],
      default: 'medium',
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
    statusHistory: [
      {
        status: String,
        updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        note: String,
        timestamp: { type: Date, default: Date.now },
      },
    ],
    rewardAwarded: {
      type: Boolean,
      default: false,
    },
    rewardPoints: {
      type: Number,
      default: 50,
    },
    // After rescue, link to adoption if animal is rescued
    adoptionListing: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Adoption',
      default: null,
    },
  },
  { timestamps: true }
);

reportSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Report', reportSchema);
