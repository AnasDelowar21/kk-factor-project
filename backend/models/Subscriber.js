const mongoose = require('mongoose');

const subscriberSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  interests: [{
    type: String,
  }],
  status: {
    type: String,
    default: 'active',
    enum: ['active', 'unsubscribed'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model('Subscriber', subscriberSchema);
