/**
 * Rescue Routes
 * =============
 * Routes for the AI-powered duplicate rescue detection system.
 *
 * Middleware chain for POST /report:
 *   1. rescueRateLimiter   — 5 req / 15 min per IP (prevents spam)
 *   2. rescueReportValidation + validateRequest — input validation
 *   3. optionalAuth        — attaches req.user if JWT present (reward points)
 *   4. upload.single       — multer handles the image file
 *   5. submitRescueReport  — controller
 */

const express = require('express');
const router  = express.Router();

const {
  submitRescueReport,
  getRescues,
  getRescueStats,
} = require('../controllers/rescueController');

const { protect, optionalAuth, authorize } = require('../middleware/authMiddleware');
const { rescueRateLimiter }                = require('../middleware/rateLimitMiddleware');
const { rescueReportValidation }           = require('../middleware/rescueValidation');
const { validateRequest }                  = require('../middleware/errorMiddleware');
const upload                               = require('../middleware/uploadMiddleware');

// ── Public Routes ─────────────────────────────────────────────────────────────

/**
 * POST /api/rescue/report
 * Submit an animal rescue report with duplicate detection.
 * Anyone can submit (optionalAuth — reward points if logged in).
 * Rate limited: 5 requests per 15 minutes per IP.
 * Accepts multipart/form-data with field 'image'.
 */
router.post(
  '/report',
  rescueRateLimiter,
  rescueReportValidation,
  validateRequest,
  optionalAuth,
  upload.single('image'),
  submitRescueReport
);

// ── Protected Routes (NGO / Vet / Shelter / Admin only) ──────────────────────

/**
 * GET /api/rescue/stats
 * Duplicate detection statistics for the admin panel.
 * Must be registered BEFORE /:id to avoid route shadowing.
 */
router.get(
  '/stats',
  protect,
  authorize('ngo', 'vet', 'shelter', 'admin'),
  getRescueStats
);

/**
 * GET /api/rescue
 * Paginated list of rescue cases with duplicate metadata.
 * Query params: status, animalType, page, limit
 */
router.get(
  '/',
  protect,
  authorize('ngo', 'vet', 'shelter', 'admin'),
  getRescues
);

module.exports = router;
