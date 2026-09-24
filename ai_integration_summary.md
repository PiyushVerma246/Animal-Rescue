# AI Injury Scanning System Integration

## 1. AI Service Architecture
The `ai-service/app.py` has been updated with the `/analyze-injury` endpoint. The `inference/injury_analyzer.py` handles model loading and inference logic.
*   **Fallback**: If `injury_severity_v1.pt` is not found, the service correctly returns `MODEL_NOT_AVAILABLE` instead of faking the prediction.
*   **Dataset Setup**: The directory structure for the ML team has been fully provisioned (`ai-service/datasets/severity/train/`, `val/`, `test/`) with `dataset_info.md` detailing the visual classes.

## 2. Backend Triage Engine (Node.js)
The existing Node backend was preserved, but augmented with `services/aiService.js`.
*   **Workflow**: When a report is submitted, `reportController.js` uploads the image, triggers the Python microservice, and then runs `calculateTriagePriority`.
*   **Hybrid Logic**: If the user provides manual observations (e.g. "Heavy bleeding"), the triage engine intelligently escalates the priority (e.g., Medium AI Severity + Heavy Bleeding = Critical Priority). 

## 3. Database Updates
`Report.js` Mongoose schema has been expanded without disrupting existing functionality.
*   Added `priority`, `injuryDetected`, `injuryType`, `confidence`, `userObservations`, and `aiAnalysis` fields to persist the scan results.

## 4. UI / UX Upgrades
*   **Report Form**: Users can now select "Immediate Observations" checkboxes. Upon submission, a dynamic loading state visually mimics the AI inference steps (Uploading -> Analyzing -> Estimating -> Generating Priority).
*   **AI Assessment Card**: After submission, the success card was rebuilt to show the detailed AI triage breakdown instead of a generic "Success" message.
*   **NGO Dashboard**: Nearby reports and active lists now prominently display the `Priority` badge, `AI Scan` type, and `Confidence` score, allowing rescue teams to sort cases correctly. Notifications include "ACCEPT RESCUE" and "VIEW CASE" buttons.
*   **Admin Dashboard**: The live rescue tracking table was updated to include the AI Priority metric alongside the Severity.
