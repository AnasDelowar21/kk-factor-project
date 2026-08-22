const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const News = require('../models/News');
const auth = require('../middleware/authMiddleware');

// Multer storage config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

// @route   GET api/news
// @desc    Get all published news (public) or all news for admin
// @access  Public
router.get('/', async (req, res) => {
  try {
    const filter = req.query.all ? {} : { status: 'published' };
    const news = await News.find(filter).sort({ isFeatured: -1, createdAt: -1 });
    res.json(news);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/news/:id
// @desc    Get single news article by id
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const news = await News.findById(req.params.id);
    if (!news) return res.status(404).json({ msg: 'News not found' });
    res.json(news);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// @route   POST api/news
// @desc    Create a news article
// @access  Private
router.post(
  '/',
  [auth, upload.fields([{ name: 'video', maxCount: 1 }, { name: 'image', maxCount: 1 }])],
  async (req, res) => {
    try {
      const { title, content, summary, category, authorName, status, isFeatured, tags } = req.body;

      let videoUrl = '';
      let imageUrl = '';

      if (req.files && req.files['video']) {
        videoUrl = `/uploads/${req.files['video'][0].filename}`;
      }
      if (req.files && req.files['image']) {
        imageUrl = `/uploads/${req.files['image'][0].filename}`;
      }

      const parsedTags = tags ? tags.split(',').map(t => t.trim()).filter(Boolean) : [];

      const newNews = new News({
        title,
        content,
        summary: summary || content.substring(0, 200),
        category: category || 'NEWS',
        authorName: authorName || 'KK Factor Staff',
        status: status || 'published',
        isFeatured: isFeatured === 'true',
        tags: parsedTags,
        videoUrl,
        imageUrl
      });

      const saved = await newNews.save();
      res.json(saved);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   PUT api/news/:id
// @desc    Edit an existing news article
// @access  Private
router.put(
  '/:id',
  [auth, upload.fields([{ name: 'video', maxCount: 1 }, { name: 'image', maxCount: 1 }])],
  async (req, res) => {
    try {
      const { title, content, summary, category, authorName, status, isFeatured, tags } = req.body;

      const article = await News.findById(req.params.id);
      if (!article) return res.status(404).json({ msg: 'News not found' });

      // Only overwrite media if new files were provided
      if (req.files && req.files['video']) {
        article.videoUrl = `/uploads/${req.files['video'][0].filename}`;
      }
      if (req.files && req.files['image']) {
        article.imageUrl = `/uploads/${req.files['image'][0].filename}`;
      }

      const parsedTags = tags ? tags.split(',').map(t => t.trim()).filter(Boolean) : article.tags;

      article.title = title || article.title;
      article.content = content || article.content;
      article.summary = summary || (content ? content.substring(0, 200) : article.summary);
      article.category = category || article.category;
      article.authorName = authorName || article.authorName;
      article.status = status || article.status;
      article.isFeatured = isFeatured !== undefined ? isFeatured === 'true' : article.isFeatured;
      article.tags = parsedTags;

      await article.save();
      res.json(article);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   DELETE api/news/:id
// @desc    Delete a news article
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const news = await News.findById(req.params.id);
    if (!news) return res.status(404).json({ msg: 'News not found' });
    await news.deleteOne();
    res.json({ msg: 'News removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
