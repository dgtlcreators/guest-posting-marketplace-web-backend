// routes/activity.js
const express = require('express');
const router = express.Router();
const Activity = require('../models/Activity');

router.get('/activities', async (req, res) => {
  try {
    const activities = await Activity.find().sort({ timestamp: -1 }).limit(10);
    res.json(activities);
  } catch (error) {
    res.status(500).send('Server Error');
  }
});

module.exports = router;
