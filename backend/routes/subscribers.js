const express = require('express');
const router = express.Router();
const Subscriber = require('../models/Subscriber');
const auth = require('../middleware/authMiddleware');

// @route   POST api/subscribers
// @desc    Subscribe an email to newsletter / updates
// @access  Public
router.post('/', async (req, res) => {
  try {
    const { email, interests } = req.body;
    if (!email || !email.includes('@')) {
      return res.status(400).json({ msg: 'Please provide a valid email address' });
    }

    const cleanEmail = email.trim().toLowerCase();
    let subscriber = await Subscriber.findOne({ email: cleanEmail });

    if (subscriber) {
      if (interests && Array.isArray(interests)) {
        subscriber.interests = Array.from(new Set([...(subscriber.interests || []), ...interests]));
      }
      subscriber.status = 'active';
      await subscriber.save();
      return res.status(200).json({
        msg: 'Welcome back! Your subscription preferences have been updated.',
        subscriber,
      });
    }

    subscriber = new Subscriber({
      email: cleanEmail,
      interests: interests || ['breaking_news', 'live_shows', 'music_releases'],
    });

    await subscriber.save();
    return res.status(201).json({
      msg: 'Successfully subscribed to THE KK FACTOR newsletter!',
      subscriber,
    });
  } catch (err) {
    console.error('Subscription error:', err.message);
    res.status(500).json({ msg: 'Server error while processing subscription' });
  }
});

// @route   GET api/subscribers
// @desc    Get all subscribers (Admin only)
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const subscribers = await Subscriber.find().sort({ createdAt: -1 });
    res.json(subscribers);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
