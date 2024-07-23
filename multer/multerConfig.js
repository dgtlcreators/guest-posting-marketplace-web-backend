/*
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  }
});

const upload = multer({ storage: storage });

module.exports = upload;
*/
// multer/multerConfig.js
//blow actual code
/*const multer = require('multer');
const path = require('path');

// Storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Destination folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Filename with timestamp
  }
});

const upload = multer({ storage });

module.exports = upload;*/

const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();

// Storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

app.use(express.json());

// Route to handle file upload
app.post('/instagraminfluencers/addInstagraminfluencer', upload.single('profilePicture'), (req, res) => {
  try {
    // Handle the request here
    console.log(req.file); // Log file details for debugging
    res.status(200).json({ message: 'File uploaded successfully', file: req.file });
  } catch (error) {
    console.error('Error processing file upload:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Start the server
app.listen(process.env.PORT || 5000, () => {
  console.log('Server is running');
});


