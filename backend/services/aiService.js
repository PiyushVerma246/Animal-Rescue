const axios = require('axios');
const fs = require('fs');
const path = require('path');

const AI_SERVICE_URL = process.env.AI_SERVICE_URL || 'http://localhost:8000';

exports.analyzeInjury = async (imagePath, userObservations = []) => {
  try {
    // Read the image file and convert to base64
    const fullPath = path.join(__dirname, '..', imagePath);
    const imageBytes = fs.readFileSync(fullPath);
    const image_b64 = imageBytes.toString('base64');

    // Send to Python AI Service
    const response = await axios.post(`${AI_SERVICE_URL}/analyze-injury`, {
      image_b64,
    });

    const aiResult = response.data;
    
    // Triage Engine (Combining AI + User Observations)
    return this.calculateTriagePriority(aiResult, userObservations);
  } catch (error) {
    if (error.response && error.response.status === 503) {
      throw new Error('MODEL_NOT_AVAILABLE');
    }
    throw new Error('AI_SERVICE_ERROR');
  }
};

exports.calculateTriagePriority = (aiResult, observations = []) => {
  let severity = aiResult.severity || 'UNKNOWN';
  let priority = 'MANUAL_REVIEW';
  let confidence = aiResult.confidence || 0.0;

  const hasEmergencyObs = observations.some(obs => 
    ['Heavy bleeding', 'Difficulty breathing', 'Cannot stand/walk', 'Unconscious/unresponsive', 'Suspected fracture', 'Severe distress', 'Eye injury'].includes(obs)
  );

  if (severity === 'UNKNOWN' || confidence < 0.5) {
    priority = 'MANUAL_REVIEW';
  } else if (severity === 'HIGH') {
    priority = 'CRITICAL'; // High AI severity defaults to Critical priority
  } else if (severity === 'MEDIUM' && hasEmergencyObs) {
    priority = 'CRITICAL';
    severity = 'HIGH'; // Escalate severity based on user observation
  } else if (severity === 'MEDIUM') {
    priority = 'HIGH';
  } else if (severity === 'LOW' && hasEmergencyObs) {
    priority = 'MEDIUM';
  } else if (severity === 'LOW') {
    priority = 'LOW';
  }

  return {
    ...aiResult,
    finalSeverity: severity,
    finalPriority: priority,
    userObservations: observations
  };
};
