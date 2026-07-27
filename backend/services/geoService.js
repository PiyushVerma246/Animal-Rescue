/**
 * Geo Service
 * ===========
 * Provides Haversine distance calculation and tiered location
 * similarity scoring for the duplicate detection pipeline.
 */

/** Earth's mean radius in metres (WGS-84 standard) */
const EARTH_RADIUS_M = 6371000;

/**
 * haversineDistance
 * -----------------
 * Calculates the great-circle distance between two GPS coordinates
 * using the Haversine formula.
 *
 * @param {{ lat: number, lng: number }} point1 - First coordinate
 * @param {{ lat: number, lng: number }} point2 - Second coordinate
 * @returns {number} Distance in metres
 */
const haversineDistance = (point1, point2) => {
  const toRad = (deg) => (deg * Math.PI) / 180;

  const dLat = toRad(point2.lat - point1.lat);
  const dLng = toRad(point2.lng - point1.lng);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(point1.lat)) *
    Math.cos(toRad(point2.lat)) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return EARTH_RADIUS_M * c;
};

/**
 * locationScore
 * -------------
 * Returns a proximity similarity score (0–1) based on the distance
 * between an incoming report and an existing rescue case.
 *
 * Scoring tiers:
 *   ≤ 100 m   → 1.00  (same street corner — almost certainly the same animal)
 *   ≤ 250 m   → 0.85  (same block)
 *   ≤ 500 m   → 0.60  (same neighbourhood — possible duplicate)
 *   > 500 m   → 0.00  (too far — not a candidate)
 *
 * @param {number} distanceMeters
 * @returns {number} Score in [0, 1]
 */
const locationScore = (distanceMeters) => {
  if (distanceMeters <= 100) return 1.00;
  if (distanceMeters <= 250) return 0.85;
  if (distanceMeters <= 500) return 0.60;
  return 0.00;
};

/**
 * coordsToGeoJSON
 * ---------------
 * Converts a { lat, lng } pair to GeoJSON [longitude, latitude] order.
 *
 * @param {{ lat: number, lng: number }} coords
 * @returns {[number, number]} [longitude, latitude]
 */
const coordsToGeoJSON = ({ lat, lng }) => [lng, lat];

module.exports = { haversineDistance, locationScore, coordsToGeoJSON };
