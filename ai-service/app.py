"""
AniCure — AI Embedding Microservice
====================================
Loads OpenCLIP (ViT-B/32) once at startup and exposes a REST endpoint
for generating 512-dimensional image embeddings.

The Node.js backend sends base64-encoded images via JSON, and this
service returns the L2-normalised embedding vector suitable for
cosine similarity comparisons.

Usage:
    python app.py

Environment variables:
    CLIP_MODEL      — OpenCLIP model name  (default: ViT-B-32)
    CLIP_PRETRAINED — Pretrained weights   (default: openai)
    AI_SERVICE_PORT — Port to listen on    (default: 8000)
    FLASK_DEBUG     — Enable debug mode    (default: false)
"""

import base64
import io
import logging
import os
import traceback

import numpy as np
import open_clip
import torch
from flask import Flask, jsonify, request
from PIL import Image

# ── Logging ───────────────────────────────────────────────────────────────────
logging.basicConfig(
    level=logging.INFO,
    format="[%(asctime)s] %(levelname)s — %(message)s",
    datefmt="%Y-%m-%d %H:%M:%S",
)
logger = logging.getLogger("AniCure-AI")

app = Flask(__name__)

# ── Load CLIP model once at startup ──────────────────────────────────────────
MODEL_NAME  = os.getenv("CLIP_MODEL", "ViT-B-32")
PRETRAINED  = os.getenv("CLIP_PRETRAINED", "openai")

logger.info(f"Loading CLIP model: {MODEL_NAME} ({PRETRAINED}) — this may take a moment on first run...")
_model, _, _preprocess = open_clip.create_model_and_transforms(MODEL_NAME, pretrained=PRETRAINED)
_model.eval()
logger.info("CLIP model loaded and ready.")


# ── Helpers ───────────────────────────────────────────────────────────────────

def _decode_image(image_b64: str) -> Image.Image:
    """Decode a base64-encoded image string into a PIL Image."""
    image_bytes = base64.b64decode(image_b64)
    return Image.open(io.BytesIO(image_bytes)).convert("RGB")


def _generate_embedding(image: Image.Image) -> list:
    """
    Run the CLIP image encoder and return an L2-normalised embedding.

    Returns:
        list[float] — 512-dimensional vector
    """
    tensor = _preprocess(image).unsqueeze(0)  # [1, 3, 224, 224]

    with torch.no_grad():
        features = _model.encode_image(tensor)
        # L2-normalise so that dot product == cosine similarity
        features = features / features.norm(dim=-1, keepdim=True)

    return features.squeeze().tolist()


# ── Routes ────────────────────────────────────────────────────────────────────

@app.route("/health", methods=["GET"])
def health():
    """
    Health-check endpoint.
    GET /health → { "status": "ok", "model": "ViT-B-32" }
    """
    return jsonify({"status": "ok", "model": MODEL_NAME, "pretrained": PRETRAINED})


@app.route("/embed", methods=["POST"])
def embed():
    """
    Generate a CLIP image embedding from a base64-encoded image.

    Request body (JSON):
    {
        "image_b64": "<base64-encoded image bytes>"
    }

    Response (200):
    {
        "embedding": [0.123, -0.456, ...]   // 512-dim float vector
    }

    Error responses:
        400 — Missing or invalid image data
        500 — Embedding generation failed
    """
    # ── Validate request ──────────────────────────────────────────────────
    data = request.get_json(silent=True)
    if not data:
        return jsonify({"error": "Request body must be JSON"}), 400

    image_b64 = data.get("image_b64")
    if not image_b64:
        return jsonify({"error": "Missing required field: image_b64"}), 400

    if not isinstance(image_b64, str) or len(image_b64) < 10:
        return jsonify({"error": "Invalid image_b64 value"}), 400

    # ── Generate embedding ────────────────────────────────────────────────
    try:
        image = _decode_image(image_b64)
    except Exception as e:
        logger.warning(f"Failed to decode image: {e}")
        return jsonify({"error": f"Invalid image data: {str(e)}"}), 400

    try:
        embedding = _generate_embedding(image)
        logger.info(f"Embedding generated — dim={len(embedding)}")
        return jsonify({"embedding": embedding})
    except Exception as e:
        logger.error(f"Embedding generation failed: {traceback.format_exc()}")
        return jsonify({"error": f"Embedding generation failed: {str(e)}"}), 500


# ── Entry point ───────────────────────────────────────────────────────────────

if __name__ == "__main__":
    port  = int(os.getenv("AI_SERVICE_PORT", 8000))
    debug = os.getenv("FLASK_DEBUG", "false").lower() == "true"
    logger.info(f"Starting AniCure AI Service on port {port}...")
    app.run(host="0.0.0.0", port=port, debug=debug)
