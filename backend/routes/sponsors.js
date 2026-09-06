const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Sponsor = require('../models/Sponsor');
const auth = require('../middleware/authMiddleware');

// Multer storage config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = 'uploads/sponsors/';
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    cb(null, 'sponsor-' + Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// @route   GET api/sponsors
// @desc    Get active sponsors for public website carousel
// @access  Public
router.get('/', async (req, res) => {
  try {
    const sponsors = await Sponsor.find({ isActive: true }).sort({ order: 1, createdAt: -1 });
    res.json(sponsors);
  } catch (err) {
    console.error('Error fetching public sponsors:', err.message);
    res.status(500).json({ msg: 'Server error loading sponsors' });
  }
});

// @route   GET api/sponsors/all
// @desc    Get all sponsors (active and inactive) for admin management
// @access  Private
router.get('/all', auth, async (req, res) => {
  try {
    const sponsors = await Sponsor.find().sort({ order: 1, createdAt: -1 });
    res.json(sponsors);
  } catch (err) {
    console.error('Error fetching admin sponsors:', err.message);
    res.status(500).json({ msg: 'Server error loading admin sponsors' });
  }
});

// @route   POST api/sponsors
// @desc    Create a new sponsor
// @access  Private
router.post('/', auth, upload.single('logo'), async (req, res) => {
  try {
    const { name, websiteUrl, tagline, tier, isActive, order } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({ msg: 'Sponsor name is required' });
    }

    const logoUrl = req.file ? `/uploads/sponsors/${req.file.filename}` : null;

    const newSponsor = new Sponsor({
      name: name.trim(),
      websiteUrl: websiteUrl ? websiteUrl.trim() : '',
      tagline: tagline ? tagline.trim() : '',
      tier: tier || 'Official Partner',
      isActive: isActive === undefined ? true : String(isActive) === 'true',
      order: order ? Number(order) : 0,
      logoUrl,
    });

    const saved = await newSponsor.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error('Error creating sponsor:', err.message);
    res.status(500).json({ msg: 'Server error creating sponsor' });
  }
});

// @route   PUT api/sponsors/:id
// @desc    Update a sponsor
// @access  Private
router.put('/:id', auth, upload.single('logo'), async (req, res) => {
  try {
    const { name, websiteUrl, tagline, tier, isActive, order } = req.body;
    const sponsor = await Sponsor.findById(req.params.id);

    if (!sponsor) {
      return res.status(404).json({ msg: 'Sponsor not found' });
    }

    if (name) sponsor.name = name.trim();
    if (websiteUrl !== undefined) sponsor.websiteUrl = websiteUrl.trim();
    if (tagline !== undefined) sponsor.tagline = tagline.trim();
    if (tier) sponsor.tier = tier;
    if (isActive !== undefined) sponsor.isActive = String(isActive) === 'true';
    if (order !== undefined) sponsor.order = Number(order);

    if (req.file) {
      // Remove old logo file if it exists
      if (sponsor.logoUrl) {
        const oldPath = path.join(__dirname, '..', sponsor.logoUrl);
        if (fs.existsSync(oldPath)) {
          try { fs.unlinkSync(oldPath); } catch {}
        }
      }
      sponsor.logoUrl = `/uploads/sponsors/${req.file.filename}`;
    }

    const updated = await sponsor.save();
    res.json(updated);
  } catch (err) {
    console.error('Error updating sponsor:', err.message);
    res.status(500).json({ msg: 'Server error updating sponsor' });
  }
});

// @route   DELETE api/sponsors/:id
// @desc    Delete a sponsor
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const sponsor = await Sponsor.findById(req.params.id);
    if (!sponsor) {
      return res.status(404).json({ msg: 'Sponsor not found' });
    }

    if (sponsor.logoUrl) {
      const logoPath = path.join(__dirname, '..', sponsor.logoUrl);
      if (fs.existsSync(logoPath)) {
        try { fs.unlinkSync(logoPath); } catch {}
      }
    }

    await Sponsor.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Sponsor deleted successfully' });
  } catch (err) {
    console.error('Error deleting sponsor:', err.message);
    res.status(500).json({ msg: 'Server error deleting sponsor' });
  }
});

module.exports = router;
