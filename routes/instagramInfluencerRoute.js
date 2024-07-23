const express=require("express")
const router=express.Router()
const {addInstagraminfluencer,getAllInstagraminfluencer,getInstagraminfluencerById,updateInstagraminfluencer,deleteInstagraminfluencer}=require("../controllers/instagramInfluencerControllers")
const upload = require("../multer/multerConfig")

router.post("/addInstagraminfluencer", upload.fields([
    { name: 'profilePicture', maxCount: 1 },
    { name: 'mediaKit', maxCount: 1 }
  ]),addInstagraminfluencer)
router.get("/getAllInstagraminfluencer",getAllInstagraminfluencer)
router.get("/getInstagraminfluencerById/:id",getInstagraminfluencerById)
router.put("/updateInstagraminfluencer/:id", upload.fields([
    { name: 'profilePicture', maxCount: 1 },
    { name: 'mediaKit', maxCount: 1 }
  ]),updateInstagraminfluencer)
router.delete("/deleteInstagraminfluencer/:id",deleteInstagraminfluencer)


module.exports = router;

/*const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');


// Ensure uploads directory exists
const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });*/

/*const InstagramInfluencer = require('../models/instagramInfluencerModel');
const {
  addInstagraminfluencer,
  getAllInstagraminfluencer,
  getInstagraminfluencerById,
  updateInstagraminfluencer,
  deleteInstagraminfluencer
} = require('../controllers/instagramInfluencerControllers');

router.post('/addInstagraminfluencer', upload.fields([
  { name: 'profilePicture', maxCount: 1 },
  { name: 'mediaKit', maxCount: 1 }
]), addInstagraminfluencer);

router.put('/updateInstagraminfluencer/:id', upload.fields([
  { name: 'profilePicture', maxCount: 1 },
  { name: 'mediaKit', maxCount: 1 }
]), updateInstagraminfluencer);

router.get('/getAllInstagraminfluencer', getAllInstagraminfluencer);
router.get('/getInstagraminfluencerById/:id', getInstagraminfluencerById);
router.delete('/deleteInstagraminfluencer/:id', deleteInstagraminfluencer);

module.exports = router;




module.exports=router*/