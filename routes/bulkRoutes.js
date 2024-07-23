const express = require('express');
const router = express.Router();
const multer = require('multer');
const csv = require('fast-csv');
const fs = require('fs');
const path = require('path');
const Influencer = require('../models/Influencer'); // Assuming you have an Influencer model

const upload = multer({ dest: 'uploads/' });

// Bulk import
router.post('/import', upload.single('file'), (req, res) => {
  const filePath = req.file.path;

  fs.createReadStream(filePath)
    .pipe(csv.parse({ headers: true }))
    .on('data', async (row) => {
      const newInfluencer = new Influencer(row);
      await newInfluencer.save();
    })
    .on('end', () => {
      fs.unlinkSync(filePath);
      res.status(200).json({ message: 'Import successful' });
    })
    .on('error', (error) => {
      res.status(500).json({ message: error.message });
    });
});

// Bulk export
router.get('/export', async (req, res) => {
  try {
    const influencers = await Influencer.find();
    const csvStream = csv.format({ headers: true });
    res.setHeader('Content-Disposition', 'attachment; filename=influencers.csv');
    res.setHeader('Content-Type', 'text/csv');

    csvStream.pipe(res);

    influencers.forEach((influencer) => {
      csvStream.write(influencer.toObject());
    });

    csvStream.end();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
