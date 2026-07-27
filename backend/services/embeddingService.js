/**
 * Embedding Service
 * =================
 * Communicates with the Python CLIP micro-service to generate
 * 512-dimensional L2-normalised image embeddings.
 *
 * Images are sent as base64-encoded JSON (no multipart dependencies).
 * Uses the built-in `fetch` available in Node.js 18+.
 *
 * Graceful degradation:
 *   - If the AI service is unreachable or times out, returns null.
 *   - The calling code (duplicateDetectionService) detects null and
 *     falls back to location + time only scoring.
 */

const fs   = require('fs');
const path = require('path');

const AI_SERVICE_URL = process.env.AI_SERVICE_URL || 'http://localhost:8000';
const AI_TIMEOUT_MS  = parseInt(process.env.AI_TIMEOUT_MS, 10) || 10000; // 10 s

// ── Helpers ───────────────────────────────────────────────────────────────────

/**
 * _withTimeout
 * Wraps a fetch call with an AbortController-based timeout.
 *
 * @param {string}   url
 * @param {object}   options - fetch options
 * @param {number}   timeoutMs
 * @returns {Promise<Response>}
 */
const _withTimeout = (url, options, timeoutMs) => {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeoutMs);

  return fetch(url, { ...options, signal: controller.signal })
    .finally(() => clearTimeout(id));
};

// ── Public API ────────────────────────────────────────────────────────────────

/**
 * generateEmbedding
 * -----------------
 * Reads the image at `imagePath`, encodes it as base64, and sends it
 * to the Python CLIP service. Returns the 512-dim embedding vector.
 *
 * @param {string} imagePath - Absolute path to the uploaded image file
 * @returns {Promise<number[]|null>}
 *   512-dim float array, or null if the AI service is unavailable
 */
const generateEmbedding = async (imagePath) => {
  // Resolve to absolute path
  const absPath = path.isAbsolute(imagePath)
    ? imagePath
    : path.resolve(imagePath);

  if (!fs.existsSync(absPath)) {
    console.warn(`[EmbeddingService] Image file not found: ${absPath}`);
    return null;
  }

  try {
    // Read image and convert to base64
    const imageBuffer = fs.readFileSync(absPath);
    const imageB64    = imageBuffer.toString('base64');

    const response = await _withTimeout(
      `${AI_SERVICE_URL}/embed`,
      {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ image_b64: imageB64 }),
      },
      AI_TIMEOUT_MS
    );

    if (!response.ok) {
      const errText = await response.text().catch(() => '');
      console.error(
        `[EmbeddingService] AI service returned ${response.status}: ${errText}`
      );
      return null;
    }

    const data = await response.json();

    if (!data.embedding || !Array.isArray(data.embedding) || data.embedding.length === 0) {
      console.error('[EmbeddingService] AI service returned invalid embedding shape.');
      return null;
    }

    return data.embedding; // number[]

  } catch (err) {
    if (err.name === 'AbortError') {
      console.warn(`[EmbeddingService] Request timed out after ${AI_TIMEOUT_MS}ms — AI service may be overloaded.`);
    } else {
      // Connection refused, network error, etc.
      console.warn(`[EmbeddingService] AI service unreachable (${err.message}). Falling back to geo+time scoring.`);
    }
    return null;
  }
};

/**
 * checkAIServiceHealth
 * --------------------
 * Pings the AI service health endpoint.
 * Used by the rescue controller to include AI status in the response.
 *
 * @returns {Promise<boolean>} true if the service is reachable
 */
const checkAIServiceHealth = async () => {
  try {
    const response = await _withTimeout(
      `${AI_SERVICE_URL}/health`,
      { method: 'GET' },
      3000
    );
    return response.ok;
  } catch {
    return false;
  }
};

module.exports = { generateEmbedding, checkAIServiceHealth };
