/**
 * Rescue Model
 * ============
 * Represents a unique animal-in-distress rescue case.
 *
 * Key difference from the existing Report model:
 * - Multiple reporters can be attached to the same rescue case.
 * - The duplicate detection system merges near-identical reports
 *   into a single Rescue document instead of creating duplicates.
 * - CLIP image embeddings are stored for future similarity lookups.
 *
 * This model is intentionally additive — it does NOT modify or replace
 * the existing Report model. Both collections coexist.
 */

const mongoose = require('mongoose');

// ── Sub-schema: Reporter Entry ────────────────────────────────────────────────
/**
 * Represents one person who reported this rescue (primary or witness).
 */
const reporterEntrySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null, // null = anonymous reporter
    },
    reportTime: {
      type: Date,
      default: Date.now,
    },
    description: {
      type: String,
      maxlength: [1000, 'Description cannot exceed 1000 characters'],
    },
    images: [{ type: String }], // File paths of uploaded images
    isAnonymous: {
      type: Boolean,
      default: false,
    },
  },
  { _id: true }
);

// ── Sub-schema: Duplicate Stat Entry ─────────────────────────────────────────
/**
 * Stored whenever a duplicate report is successfully merged.
 * Powers the admin duplicate detection panel.
 */
const duplicateStatSchema = new mongoose.Schema(
  {
    mergedAt: { type: Date, default: Date.now },
    finalScore: { type: Number },          // 0–1 composite score
    imageSimilarity: { type: Number },     // 0–1 CLIP cosine similarity (null if AI service unavailable)
    locationScore: { type: Number },       // 0–1 proximity score
    timeScore: { type: Number },           // 0–1 recency score
    similarityPercent: { type: Number },   // finalScore × 100 (integer, for display)
    reporterIsAnonymous: { type: Boolean, default: false },
    isEmbeddingFallback: { type: Boolean, default: false }, // true if AI service was down
  },
  { _id: false }
);

// ── Main Schema ───────────────────────────────────────────────────────────────
const rescueSchema = new mongoose.Schema(
  {
    // ── Animal Info ────────────────────────────────────────────
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

    // ── Media ──────────────────────────────────────────────────
    images: [{ type: String }], // File paths

    /**
     * CLIP embedding vector (512-dim for ViT-B/32).
     * Stored as an array of numbers. NOT indexed in MongoDB —
     * comparisons are done in application layer AFTER geo-filtering
     * to keep memory usage and query time manageable.
     */
    imageEmbedding: {
      type: [Number],
      default: [],
      select: false, // Never returned by default (too large for API responses)
    },

    // ── Location ────────────────────────────────────────────────
    location: {
      type: {
        type: String,
        enum: ['Point'],
        default: 'Point',
      },
      coordinates: {
        type: [Number], // [longitude, latitude] — GeoJSON order
        required: [true, 'Location coordinates are required'],
      },
      address: String,
      city: String,
      state: String,
    },
    // Scalar copies for convenience (no GeoJSON parsing needed in app code)
    latitude:  { type: Number, required: [true, 'Latitude is required'] },
    longitude: { type: Number, required: [true, 'Longitude is required'] },

    // ── Status & Priority ────────────────────────────────────────
    status: {
      type: String,
      enum: ['open', 'assigned', 'in_progress', 'rescued', 'closed'],
      default: 'open',
    },
    priority: {
      type: String,
      enum: ['low', 'medium', 'high', 'critical'],
      default: 'medium',
    },
    /** severity is an alias kept for naming consistency with the Report model */
    severity: {
      type: String,
      enum: ['low', 'medium', 'high', 'critical'],
      default: 'medium',
    },

    // ── Witness Tracking ─────────────────────────────────────────
    /**
     * All reporters: index 0 is the primary reporter,
     * subsequent entries are witnesses added by duplicate detection.
     */
    reporters: {
      type: [reporterEntrySchema],
      default: [],
    },
    witnessCount: {
      type: Number,
      default: 1,
      min: 1,
    },

    // ── Assignment ───────────────────────────────────────────────
    primaryReporter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },

    // ── Rewards ──────────────────────────────────────────────────
    rewardAwarded:  { type: Boolean, default: false },
    rewardPoints:   { type: Number,  default: 50 },

    // ── Duplicate Detection Audit Trail ─────────────────────────
    /**
     * One entry per successfully merged duplicate report.
     * Used by the admin panel to inspect deduplication activity.
     */
    duplicateStats: {
      type: [duplicateStatSchema],
      default: [],
    },
  },
  {
    timestamps: true,
    toJSON:   { virtuals: true },
    toObject: { virtuals: true },
  }
);

// ── Virtual: total duplicates merged ─────────────────────────────────────────
rescueSchema.virtual('duplicatesMerged').get(function () {
  return this.duplicateStats.length;
});

// ── Indexes ───────────────────────────────────────────────────────────────────
// 2dsphere index: enables $near geo-queries for proximity search
rescueSchema.index({ location: '2dsphere' });

// Compound index: speeds up the candidate lookup query used in duplicate detection
// Filters: status != 'closed', same animalType, within 24-hour window
rescueSchema.index({ status: 1, animalType: 1, createdAt: -1 });

// Index: fast pagination on admin list endpoint
rescueSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Rescue', rescueSchema);
