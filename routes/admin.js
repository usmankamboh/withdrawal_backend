const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const User = require('../models/User');

async function createAdmin() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB connected');

    const existing = await User.findOne({ email: 'mariakamboh@gmail.com' });
    if (existing) {
      console.log('❌ Admin already exists.');
      return process.exit(0);
    }

    const hashedPassword = await bcrypt.hash('admin123', 10);

    const admin = new User({
      name: 'Admin',
      email: 'mariakamboh@gmail.com',
      password: hashedPassword,
      role: 'admin',
    });

    await admin.save();
    console.log('✅ Admin created with password: admin123');
  } catch (err) {
    console.error('❌ Error creating admin:', err.message);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

createAdmin();
