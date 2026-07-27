/**
 * Time Service
 * ============
 * Provides time-based similarity scoring for the duplicate detection pipeline.
 *
 * The logic: two reports about the same location/animal submitted closer
 * in time are more likely to be duplicates than reports hours apart.
 */

const MS_PER_HOUR = 1000 * 60 * 60;

/**
 * timeScore
 * ---------
 * Returns a recency score (0–1) based on the age of an existing rescue report.
 *
 * Scoring tiers:
 *   < 1 h    → 1.00  (very fresh — almost certainly the same incident)
 *   1–6 h    → 0.90  (recent — highly likely the same animal)
 *   6–12 h   → 0.75  (same day — probable duplicate)
 *   12–24 h  → 0.60  (within a day — possible duplicate)
 *   > 24 h   → 0.00  (too old — not a duplicate candidate)
 *
 * @param {Date|string|number} createdAt - Timestamp of the existing rescue document
 * @returns {number} Score in [0, 1]
 */
const timeScore = (createdAt) => {
  const ageMs    = Date.now() - new Date(createdAt).getTime();
  const ageHours = ageMs / MS_PER_HOUR;

  if (ageHours < 1)  return 1.00;
  if (ageHours < 6)  return 0.90;
  if (ageHours < 12) return 0.75;
  if (ageHours < 24) return 0.60;
  return 0.00;
};

/**
 * ageInHours
 * ----------
 * Returns the age of a timestamp in hours (utility for debugging/logging).
 *
 * @param {Date|string|number} createdAt
 * @returns {number}
 */
const ageInHours = (createdAt) =>
  (Date.now() - new Date(createdAt).getTime()) / MS_PER_HOUR;

module.exports = { timeScore, ageInHours };
