# Animal Injury Severity Dataset

This dataset directory is structured for training computer vision models (e.g. YOLO, ResNet, MobileNet) to detect and classify animal injuries for the AniCure system.

## Data Structure

- **`detection/`**: Contains raw images and bounding box annotations (YOLO format) for detecting the presence of an animal and identifying the localized wound/injury area.
- **`severity/`**: Contains cropped images of wounds or full images sorted by visual severity.
  - **`low/`**: Superficial/minor visible injury, small scratch/abrasion, no obvious major bleeding.
  - **`medium/`**: Larger wound, moderate visible tissue damage, significant swelling, multiple visible wounds, moderate bite injury.
  - **`high/`**: Major/open wound, heavy visible bleeding, exposed tissue/bone, severe visible trauma, suspected fracture, major penetrating/bite injury, severe eye injury.

## Image Requirements
- Recommended formats: JPG, JPEG, PNG
- Recommended minimum resolution: 224x224
- Ensure images are clear and well-lit to prevent false-positives in inference.

## Usage
Once populated, use `training/train_severity.py` (to be implemented) to train the classification head. The final trained model should be saved in the `models/` directory as `injury_severity_v1.pt`.
