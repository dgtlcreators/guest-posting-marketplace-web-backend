const express = require('express');
const router = express.Router();
const { gfs } = require('../config/db');
const multer = require('multer');


const upload = multer({
  storage: multer.memoryStorage() // Store file in memory to process with GridFS
});

const { GridFSBucket } = require('mongodb');

const uploadToGridFS = (file) => {
  return new Promise((resolve, reject) => {
    const uploadStream = gfs.createWriteStream({
      filename: file.originalname,
      contentType: file.mimetype
    });

    uploadStream.end(file.buffer);

    uploadStream.on('finish', () => resolve(uploadStream.id));
    uploadStream.on('error', (err) => reject(err));
  });
};

router.post('/upload', upload.fields([
  { name: 'profilePicture', maxCount: 1 },
  { name: 'mediaKit', maxCount: 1 }
]), async (req, res) => {
  try {
    const { files } = req;
    if (!files) {
      return res.status(400).json({ message: 'No files uploaded' });
    }

    const profilePicture = files['profilePicture'] ? files['profilePicture'][0] : null;
    const mediaKit = files['mediaKit'] ? files['mediaKit'][0] : null;

    const profilePictureId = profilePicture ? await uploadToGridFS(profilePicture) : null;
    const mediaKitId = mediaKit ? await uploadToGridFS(mediaKit) : null;

    // Create and save document with GridFS file IDs
    const instagramInfluencer = new InstagramInfluencer({
      ...req.body,
      profilePicture: profilePictureId,
      mediaKit: mediaKitId
    });

    await instagramInfluencer.save();
    res.status(201).json({ instagramInfluencer, message: "Instagram Influencer added Successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


module.exports = router;
