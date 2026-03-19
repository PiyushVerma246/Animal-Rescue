const Adoption = require('../models/Adoption');
const Notification = require('../models/Notification');

// @desc  Get all adoption listings
// @route GET /api/adoption
// @access Public
exports.getAdoptions = async (req, res) => {
  try {
    const { animalType, status = 'available', page = 1, limit = 12 } = req.query;
    const filter = { status };
    if (animalType) filter['animal.type'] = animalType;

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const adoptions = await Adoption.find(filter)
      .populate('postedBy', 'name organizationName avatar')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Adoption.countDocuments(filter);

    res.json({
      success: true,
      adoptions,
      pagination: { total, page: parseInt(page), pages: Math.ceil(total / parseInt(limit)) },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc  Create adoption listing
// @route POST /api/adoption
// @access Private (NGO/Vet/Shelter)
exports.createAdoption = async (req, res) => {
  try {
    const images = req.files ? req.files.map((f) => `/uploads/reports/${f.filename}`) : [];
    const { name, type, breed, age, gender, description, vaccinated, neutered, medicalHistory, city, state, sourceReport } = req.body;

    const adoption = await Adoption.create({
      animal: { name, type, breed, age, gender, description, vaccinated, neutered, medicalHistory, images },
      postedBy: req.user._id,
      sourceReport,
      location: { city, state },
    });

    res.status(201).json({ success: true, adoption });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc  Get single adoption listing
// @route GET /api/adoption/:id
// @access Public
exports.getAdoption = async (req, res) => {
  try {
    const adoption = await Adoption.findById(req.params.id)
      .populate('postedBy', 'name organizationName phone email avatar')
      .populate('adoptionRequests.user', 'name email phone');

    if (!adoption) return res.status(404).json({ success: false, message: 'Listing not found' });

    res.json({ success: true, adoption });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc  Request to adopt an animal
// @route POST /api/adoption/:id/request
// @access Private
exports.requestAdoption = async (req, res) => {
  try {
    const io = req.app.get('io');
    const { message } = req.body;

    const adoption = await Adoption.findById(req.params.id);
    if (!adoption) return res.status(404).json({ success: false, message: 'Listing not found' });
    if (adoption.status !== 'available') {
      return res.status(400).json({ success: false, message: 'This animal is no longer available' });
    }

    // Check duplicate request
    const exists = adoption.adoptionRequests.find(
      (r) => r.user.toString() === req.user._id.toString()
    );
    if (exists) {
      return res.status(400).json({ success: false, message: 'You already submitted an adoption request' });
    }

    adoption.adoptionRequests.push({ user: req.user._id, message });
    await adoption.save();

    // Notify the NGO
    const notif = await Notification.create({
      recipient: adoption.postedBy,
      type: 'adoption_request',
      title: '🐾 New Adoption Request!',
      message: `${req.user.name} has requested to adopt ${adoption.animal.name}.`,
      relatedAdoption: adoption._id,
    });

    if (io) io.to(adoption.postedBy.toString()).emit('notification', notif);

    res.json({ success: true, message: 'Adoption request submitted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc  Approve/reject adoption request
// @route PUT /api/adoption/:id/request/:requestId
// @access Private (NGO/Vet/Shelter)
exports.handleAdoptionRequest = async (req, res) => {
  try {
    const io = req.app.get('io');
    const { status } = req.body; // 'approved' or 'rejected'

    const adoption = await Adoption.findById(req.params.id);
    if (!adoption) return res.status(404).json({ success: false, message: 'Listing not found' });

    const request = adoption.adoptionRequests.id(req.params.requestId);
    if (!request) return res.status(404).json({ success: false, message: 'Request not found' });

    request.status = status;

    if (status === 'approved') {
      adoption.status = 'adopted';
      // Reject all other requests
      adoption.adoptionRequests.forEach((r) => {
        if (r._id.toString() !== req.params.requestId) r.status = 'rejected';
      });

      const notif = await Notification.create({
        recipient: request.user,
        type: 'adoption_approved',
        title: '🎉 Adoption Approved!',
        message: `Your request to adopt ${adoption.animal.name} has been approved!`,
        relatedAdoption: adoption._id,
      });
      if (io) io.to(request.user.toString()).emit('notification', notif);
    }

    await adoption.save();
    res.json({ success: true, adoption });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
