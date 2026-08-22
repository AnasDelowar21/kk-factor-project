const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  summary: {
    type: String,
    default: '',
  },
  category: {
    type: String,
    enum: ['WORLD', 'ENTERTAINMENT', 'TECHNOLOGY', 'MUSIC', 'SPORTS', 'NEWS'],
    default: 'NEWS',
  },
  authorName: {
    type: String,
    default: 'KK Factor Staff',
  },
  status: {
    type: String,
    enum: ['draft', 'published'],
    default: 'published',
  },
  isFeatured: {
    type: Boolean,
    default: false,
  },
  tags: {
    type: [String],
    default: [],
  },
  videoUrl: {
    type: String,
  },
  imageUrl: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model('News', newsSchema);
