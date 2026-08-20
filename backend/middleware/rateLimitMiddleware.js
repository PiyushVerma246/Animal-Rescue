/**
 * Rate Limit Middleware
 * =====================
 * Protects the rescue report endpoint from spam and abuse.
 *
 * Limits are configurable via environment variables:
 *   RESCUE_RATE_LIMIT_WINDOW_MS  — window length in ms (default: 15 min)
 *   RESCUE_RATE_LIMIT_MAX        — max requests per window (default: 5)
 *
 * Rate limit headers (RFC 6585) are included in every response.
 * Disabled automatically in test environment (NODE_ENV === 'test').
 */

const rateLimit = require('express-rate-limit');
const { ipKeyGenerator } = require('express-rate-limit');

/**
 * rescueRateLimiter
 * -----------------
 * Applied to: POST /api/rescue/report
 *
 * Default: 5 requests per 15 minutes per IP address.
 * On breach: returns 429 with a descriptive JSON error.
 */
const rescueRateLimiter = rateLimit({
  windowMs: parseInt(process.env.RESCUE_RATE_LIMIT_WINDOW_MS, 10) || 15 * 60 * 1000,
  max:      parseInt(process.env.RESCUE_RATE_LIMIT_MAX, 10)        || 5,

  // Include standard rate-limit headers (X-RateLimit-*)
  standardHeaders: true,
  legacyHeaders:   false,

  // JSON error response (consistent with the rest of the API)
  message: {
    success: false,
    message:
      'Too many rescue reports submitted from this IP. ' +
      'Please wait 15 minutes before submitting again. ' +
      'If you have an emergency, please call your local animal rescue helpline.',
  },

  // Skip in test environment so unit tests are not throttled
  skip: () => process.env.NODE_ENV === 'test',

  // Use built-in IP key generator to support IPv4 and IPv6
  keyGenerator: ipKeyGenerator,

  // Handler called when limit is exceeded (allows custom logging)
  handler: (req, res, next, options) => {
    console.warn(
      `[RateLimit] Rescue report rate limit exceeded — IP: ${req.ip}, ` +
      `Path: ${req.path}`
    );
    res.status(options.statusCode).json(options.message);
  },
});

module.exports = { rescueRateLimiter };
