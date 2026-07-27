/**
 * Similarity Service
 * ==================
 * Provides cosine similarity computation and the weighted composite
 * score formula used by the duplicate detection pipeline.
 *
 * Weights (as specified in the requirements):
 *   Image similarity  → 60%
 *   Location score    → 25%
 *   Time score        → 15%
 *
 * Fallback (when CLIP AI service is unavailable):
 *   Location score    → 50%
 *   Time score        → 50%
 *   Threshold drops from 0.90 → 0.70
 */

/** Primary duplicate threshold (embedding available) */
const DUPLICATE_THRESHOLD =
  parseFloat(process.env.DUPLICATE_SCORE_THRESHOLD) || 0.90;

/** Fallback threshold (no embedding — location + time only) */
const FALLBACK_THRESHOLD = 0.70;

/** Contribution weights for the composite score */
const WEIGHTS = Object.freeze({
  image:    0.60,
  location: 0.25,
  time:     0.15,
});

/** Fallback weights when no embedding is available */
const FALLBACK_WEIGHTS = Object.freeze({
  location: 0.50,
  time:     0.50,
});

// ── Core Functions ────────────────────────────────────────────────────────────

/**
 * cosineSimilarity
 * ----------------
 * Computes the cosine similarity between two numeric vectors.
 * The CLIP model L2-normalises embeddings at generation time,
 * so this reduces to a dot product in practice.
 *
 * @param {number[]} vecA
 * @param {number[]} vecB
 * @returns {number} Similarity in [0, 1] (clamped to handle float precision)
 */
const cosineSimilarity = (vecA, vecB) => {
  if (
    !Array.isArray(vecA) || !Array.isArray(vecB) ||
    vecA.length === 0   || vecA.length !== vecB.length
  ) {
    return 0;
  }

  let dot   = 0;
  let normA = 0;
  let normB = 0;

  for (let i = 0; i < vecA.length; i++) {
    dot   += vecA[i] * vecB[i];
    normA += vecA[i] * vecA[i];
    normB += vecB[i] * vecB[i];
  }

  if (normA === 0 || normB === 0) return 0;

  // Clamp to [0, 1] to guard against floating-point rounding errors
  return Math.max(0, Math.min(1, dot / (Math.sqrt(normA) * Math.sqrt(normB))));
};

/**
 * calculateFinalScore
 * -------------------
 * Computes the weighted composite duplicate-likelihood score.
 *
 * When `imageSim` is null (AI service unavailable), the system falls
 * back to a 50/50 location+time blend with a lower acceptance threshold.
 *
 * @param {object}      scores
 * @param {number|null} scores.imageSim       CLIP cosine similarity (null if unavailable)
 * @param {number}      scores.locationScore  0–1 proximity score
 * @param {number}      scores.timeScore      0–1 recency score
 *
 * @returns {{
 *   finalScore:          number,   // Composite score 0–1
 *   isEmbeddingFallback: boolean   // true if AI service was down
 * }}
 */
const calculateFinalScore = ({ imageSim, locationScore, timeScore }) => {
  const isEmbeddingFallback = imageSim === null || imageSim === undefined;

  const finalScore = isEmbeddingFallback
    ? (locationScore * FALLBACK_WEIGHTS.location) + (timeScore * FALLBACK_WEIGHTS.time)
    : (imageSim      * WEIGHTS.image)             +
      (locationScore * WEIGHTS.location)           +
      (timeScore     * WEIGHTS.time);

  return {
    finalScore: Math.max(0, Math.min(1, finalScore)), // clamp to [0, 1]
    isEmbeddingFallback,
  };
};

/**
 * isDuplicate
 * -----------
 * Returns true if the composite score meets or exceeds the acceptance threshold.
 *
 * Uses DUPLICATE_THRESHOLD (0.90) when embeddings are available,
 * or FALLBACK_THRESHOLD (0.70) otherwise.
 *
 * @param {number}  finalScore
 * @param {boolean} isEmbeddingFallback
 * @returns {boolean}
 */
const isDuplicate = (finalScore, isEmbeddingFallback = false) => {
  const threshold = isEmbeddingFallback ? FALLBACK_THRESHOLD : DUPLICATE_THRESHOLD;
  return finalScore >= threshold;
};

module.exports = {
  cosineSimilarity,
  calculateFinalScore,
  isDuplicate,
  WEIGHTS,
  FALLBACK_WEIGHTS,
  DUPLICATE_THRESHOLD,
  FALLBACK_THRESHOLD,
};
