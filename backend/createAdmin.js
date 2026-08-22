const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const User = require('./models/User');

dotenv.config();

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected');

    const username = 'admin';
    const password = 'password123'; // Default password, change later!

    let user = await User.findOne({ username });

    if (user) {
      console.log('Admin user already exists!');
      process.exit();
    }

    user = new User({
      username,
      password
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();
    console.log(`Admin created successfully! Username: ${username}, Password: ${password}`);
    
    process.exit();
  } catch (err) {
    console.error('Error creating admin:', err);
    process.exit(1);
  }
};

createAdmin();
