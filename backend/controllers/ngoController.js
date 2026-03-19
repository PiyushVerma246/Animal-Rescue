const User = require('../models/User');
const Report = require('../models/Report');

// @desc  Get all NGOs/Vets/Shelters
// @route GET /api/ngos
// @access Public
exports.getNGOs = async (req, res) => {
  try {
    const { role, lat, lng, radius = 50 } = req.query;

    let filter = { role: { $in: ['ngo', 'vet', 'shelter'] }, isActive: true };
    if (role) filter.role = role;

    let query = User.find(filter).select('-password');

    // If location provided, sort by distance
    if (lat && lng) {
      query = User.find({
        ...filter,
        location: {
          $near: {
            $geometry: { type: 'Point', coordinates: [parseFloat(lng), parseFloat(lat)] },
            $maxDistance: parseInt(radius) * 1000,
          },
        },
      }).select('-password');
    }

    const ngos = await query.limit(20);

    res.json({ success: true, ngos });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc  Get single NGO profile
// @route GET /api/ngos/:id
// @access Public
exports.getNGO = async (req, res) => {
  try {
    const ngo = await User.findById(req.params.id).select('-password');
    if (!ngo || !['ngo', 'vet', 'shelter'].includes(ngo.role)) {
      return res.status(404).json({ success: false, message: 'Organization not found' });
    }

    const rescuedCount = await Report.countDocuments({ assignedTo: ngo._id, status: 'rescued' });

    res.json({ success: true, ngo, rescuedCount });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc  Update NGO location
// @route PUT /api/ngos/location
// @access Private (NGO/Vet/Shelter)
exports.updateLocation = async (req, res) => {
  try {
    const { coordinates, address, city, state } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user._id,
      {
        location: {
          type: 'Point',
          coordinates,
          address,
          city,
          state,
        },
      },
      { new: true }
    );

    res.json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
