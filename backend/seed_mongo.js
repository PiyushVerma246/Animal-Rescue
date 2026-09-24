const mongoose = require('mongoose');
require('dotenv').config();

const ReportSchema = new mongoose.Schema({
  reporter: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  animalType: { type: String, required: true },
  description: { type: String },
  location: {
    type: { type: String, enum: ['Point'], default: 'Point' },
    coordinates: { type: [Number], required: true }, 
    address: String,
    city: String,
    state: String
  },
  severity: { type: String, enum: ['low', 'medium', 'high', 'critical'], default: 'medium' },
  status: { type: String, enum: ['reported', 'assigned', 'in_progress', 'resolved'], default: 'reported' },
  image: { type: String, required: true },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  assignedAt: Date,
  resolvedAt: Date
}, { timestamps: true });

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String },
  role: { type: String, enum: ['user', 'ngo', 'vet', 'shelter', 'admin'], default: 'user' },
  orgName: String,
  address: String,
  points: { type: Number, default: 0 }
});

const Report = mongoose.models.Report || mongoose.model('Report', ReportSchema);
const User = mongoose.models.User || mongoose.model('User', UserSchema);

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/anicure');
    console.log('Connected to MongoDB');

    const user = await User.findOne({ email: 'user@demo.com' });
    if (!user) {
      console.log('User not found. Run setup_demo.js first.');
      process.exit(1);
    }

    // Give user some points/rewards
    user.points = 1500;
    await user.save();

    await Report.deleteMany({ description: /Dummy/ });

    const reports = [
      {
        reporter: user._id,
        animalType: 'dog',
        description: 'Dummy: Found a stray dog with a severe leg injury needing immediate vet care.',
        location: {
          type: 'Point',
          coordinates: [80.9462, 26.8467], // Lucknow coords approx
          address: 'Gomti Nagar',
          city: 'Lucknow',
          state: 'UP'
        },
        severity: 'critical',
        status: 'reported',
        image: 'uploads/dummy-dog.jpg'
      },
      {
        reporter: user._id,
        animalType: 'cat',
        description: 'Dummy: Kitten stuck inside a drain pipe.',
        location: {
          type: 'Point',
          coordinates: [80.9500, 26.8500],
          address: 'Indira Nagar',
          city: 'Lucknow',
          state: 'UP'
        },
        severity: 'medium',
        status: 'assigned',
        image: 'uploads/dummy-cat.jpg'
      },
      {
        reporter: user._id,
        animalType: 'cow',
        description: 'Dummy: Cow eating plastic near the dump yard, looking very sick.',
        location: {
          type: 'Point',
          coordinates: [80.9400, 26.8400],
          address: 'Hazratganj',
          city: 'Lucknow',
          state: 'UP'
        },
        severity: 'high',
        status: 'resolved',
        image: 'uploads/dummy-cow.jpg',
        resolvedAt: new Date()
      }
    ];

    await Report.insertMany(reports);
    console.log('Dummy reports inserted successfully! User points updated to 1500.');
    
    mongoose.disconnect();
  } catch (err) {
    console.error('Error seeding DB:', err);
    mongoose.disconnect();
  }
}

seed();
