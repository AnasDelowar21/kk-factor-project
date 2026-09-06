const mongoose = require('mongoose');

const sponsorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  logoUrl: {
    type: String,
    default: null,
  },
  websiteUrl: {
    type: String,
    trim: true,
    default: '',
  },
  tagline: {
    type: String,
    trim: true,
    default: '',
  },
  tier: {
    type: String,
    enum: ['Headline Partner', 'Gold Sponsor', 'Silver Sponsor', 'Official Partner'],
    default: 'Official Partner',
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  order: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Sponsor', sponsorSchema);
