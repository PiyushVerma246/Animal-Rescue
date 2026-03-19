const mongoose = require('mongoose');

const adoptionSchema = new mongoose.Schema(
  {
    animal: {
      name: { type: String, required: true },
      type: {
        type: String,
        enum: ['dog', 'cat', 'bird', 'cow', 'horse', 'monkey', 'rabbit', 'other'],
        required: true,
      },
      breed: String,
      age: String,
      gender: { type: String, enum: ['male', 'female', 'unknown'], default: 'unknown' },
      description: { type: String, required: true },
      images: [String],
      vaccinated: { type: Boolean, default: false },
      neutered: { type: Boolean, default: false },
      medicalHistory: String,
    },
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    sourceReport: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Report',
      default: null,
    },
    status: {
      type: String,
      enum: ['available', 'pending', 'adopted', 'removed'],
      default: 'available',
    },
    adoptionRequests: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        message: String,
        status: {
          type: String,
          enum: ['pending', 'approved', 'rejected'],
          default: 'pending',
        },
        requestedAt: { type: Date, default: Date.now },
      },
    ],
    location: {
      city: String,
      state: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Adoption', adoptionSchema);
