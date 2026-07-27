/**
 * Rescue Validation Middleware
 * ============================
 * express-validator rules for the POST /api/rescue/report endpoint.
 *
 * Validates:
 *   - animalType  (required, must be from allowed enum)
 *   - description (required, 10–1000 characters)
 *   - latitude    (required, valid float −90 to 90)
 *   - longitude   (required, valid float −180 to 180)
 *   - address     (optional, string)
 *   - city        (optional, string ≤ 100 chars)
 *   - state       (optional, string ≤ 100 chars)
 *   - severity    (optional, valid enum)
 *
 * Image presence is validated inside the controller AFTER multer
 * processes the multipart upload.
 */

const { body } = require('express-validator');

/** Allowed animal types — must stay in sync with Rescue.js enum */
const ANIMAL_TYPES = [
  'dog', 'cat', 'bird', 'cow', 'horse', 'monkey', 'rabbit', 'other',
];

const SEVERITY_LEVELS = ['low', 'medium', 'high', 'critical'];

const rescueReportValidation = [
  // ── animalType ──────────────────────────────────────────────────────────
  body('animalType')
    .notEmpty()
    .withMessage('Animal type is required')
    .isIn(ANIMAL_TYPES)
    .withMessage(`Animal type must be one of: ${ANIMAL_TYPES.join(', ')}`),

  // ── description ─────────────────────────────────────────────────────────
  body('description')
    .notEmpty()
    .withMessage('Description is required')
    .isString()
    .withMessage('Description must be a string')
    .trim()
    .isLength({ min: 10, max: 1000 })
    .withMessage('Description must be between 10 and 1000 characters'),

  // ── latitude ─────────────────────────────────────────────────────────────
  body('latitude')
    .notEmpty()
    .withMessage('Latitude is required')
    .isFloat({ min: -90, max: 90 })
    .withMessage('Latitude must be a number between -90 and 90')
    .customSanitizer((v) => parseFloat(v)),

  // ── longitude ────────────────────────────────────────────────────────────
  body('longitude')
    .notEmpty()
    .withMessage('Longitude is required')
    .isFloat({ min: -180, max: 180 })
    .withMessage('Longitude must be a number between -180 and 180')
    .customSanitizer((v) => parseFloat(v)),

  // ── optional fields ──────────────────────────────────────────────────────
  body('address')
    .optional()
    .isString()
    .trim()
    .isLength({ max: 200 })
    .withMessage('Address cannot exceed 200 characters'),

  body('city')
    .optional()
    .isString()
    .trim()
    .isLength({ max: 100 })
    .withMessage('City cannot exceed 100 characters'),

  body('state')
    .optional()
    .isString()
    .trim()
    .isLength({ max: 100 })
    .withMessage('State cannot exceed 100 characters'),

  body('severity')
    .optional()
    .isIn(SEVERITY_LEVELS)
    .withMessage(`Severity must be one of: ${SEVERITY_LEVELS.join(', ')}`),
];

module.exports = { rescueReportValidation };
