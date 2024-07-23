const InstagramInfluencer = require("../models/instagramInfluencerModel")
const { param } = require("../routes/instagramInfluencerRoute")



const path = require('path');

module.exports.addInstagraminfluencer = async (req, res) => {
    try {
      const { profilePicture, mediaKit, collaborationRates, ...rest } = req.body;
      let profilePictureUrl = profilePicture;
      let mediaKitUrl = mediaKit;
  
      if (req.files) {
        const profilePictureFile = req.files['profilePicture'] ? req.files['profilePicture'][0] : null;
        const mediaKitFile = req.files['mediaKit'] ? req.files['mediaKit'][0] : null;
  
        profilePictureUrl = profilePictureFile ? `/uploads/${profilePictureFile.filename}` : profilePictureUrl;
        mediaKitUrl = mediaKitFile ? `/uploads/${mediaKitFile.filename}` : mediaKitUrl;
      }
  
      const instagramInfluencer = new InstagramInfluencer({
        ...rest,
        profilePicture: profilePictureUrl,
        mediaKit: mediaKitUrl,
        collaborationRates: {
          post: Number(collaborationRates.post) || 0,
          story: Number(collaborationRates.story) || 0,
          reel: Number(collaborationRates.reel) || 0
        }
      });
  
      // Save document to database
      await instagramInfluencer.save();
      res.status(201).json({ instagramInfluencer, message: "Instagram Influencer added Successfully" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

/*module.exports.addInstagraminfluencer = async (req, res) => {
  try {
    const profilePictureFile = req.files['profilePicture'] ? req.files['profilePicture'][0] : null;
    const mediaKitFile = req.files['mediaKit'] ? req.files['mediaKit'][0] : null;

    const profilePictureUrl = profilePictureFile ? `/uploads/${profilePictureFile.filename}` : null;
    const mediaKitUrl = mediaKitFile ? `/uploads/${mediaKitFile.filename}` : null;

    const instagramInfluencer = new InstagramInfluencer({
      ...req.body,
      profilePicture: profilePictureUrl,
      mediaKit: mediaKitUrl
    });

    // Save document to database
    await instagramInfluencer.save();
    res.status(201).json({ instagramInfluencer, message: "Instagram Influencer added Successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};*/


module.exports.getAllInstagraminfluencer=async(req,res)=>{
    try {
        const instagramInfluencer=await InstagramInfluencer.find()
        
            res.status(200).json({instagramInfluencer,message:"Instagram Influencer get all data Successfully"})
            
        } catch (error) {
            res.status(400).json({error:error.message})
        }
}

module.exports.getInstagraminfluencerById=async(req,res)=>{
    try {
        
        const instagramInfluencer=await InstagramInfluencer.findById(req.params.id)
        if(!instagramInfluencer) return res.status(404).json({message:"Instagram Influencer not found"})
            res.status(200).json({instagramInfluencer,message:"Instagram Influencer get by id Successfully"})
            
        } catch (error) {
            res.status(400).json({error:error.message})
        }
}

module.exports.updateInstagraminfluencer=async(req,res)=>{
    try {
        //const profilePicture = req.files['profilePicture'] ? req.files['profilePicture'][0].path : null;
  //  const mediaKit = req.files['mediaKit'] ? req.files['mediaKit'][0].path : null;
  //const profilePictureFile = req.files['profilePicture'] ? req.files['profilePicture'][0] : null;
  //const mediaKitFile = req.files['mediaKit'] ? req.files['mediaKit'][0] : null;

   // const profilePictureUrl = profilePictureFile ? `/uploads/${profilePictureFile.filename}` : 4;
    //const mediaKitUrl = mediaKitFile ? `/uploads/${mediaKitFile.filename}` : null;
    const { profilePicture, mediaKit, collaborationRates, ...rest } = req.body;
    let profilePictureUrl = profilePicture;
    let mediaKitUrl = mediaKit;

    if (req.files) {
      const profilePictureFile = req.files['profilePicture'] ? req.files['profilePicture'][0] : null;
      const mediaKitFile = req.files['mediaKit'] ? req.files['mediaKit'][0] : null;

      profilePictureUrl = profilePictureFile ? `/uploads/${profilePictureFile.filename}` : profilePictureUrl;
      mediaKitUrl = mediaKitFile ? `/uploads/${mediaKitFile.filename}` : mediaKitUrl;
    }

    // Update Instagram influencer
    const updatedData = {
      ...req.body,
      //profilePicture:profilePictureUrl,
     // mediaKit:mediaKitUrl,
     profilePicture: profilePictureUrl,
     mediaKit: mediaKitUrl,
     collaborationRates: {
       post: Number(collaborationRates.post) || 0,
       story: Number(collaborationRates.story) || 0,
       reel: Number(collaborationRates.reel) || 0
     }
    };
    const instagramInfluencer = await InstagramInfluencer.findByIdAndUpdate(req.params.id, updatedData, { new: true });
       // const instagramInfluencer=await InstagramInfluencer.findByIdAndUpdate(req.params.id,req.body,{new:true})
        if(!instagramInfluencer) return res.status(404).json({message:"Instagram Influencer not found"})
            res.status(200).json({instagramInfluencer,message:"Instagram Influencer updated  Successfully"})
            
        } catch (error) {
            res.status(400).json({error:error.message})
        }
}

module.exports.deleteInstagraminfluencer=async(req,res)=>{
    try {
        const instagramInfluencer=await InstagramInfluencer.findByIdAndDelete(req.params.id)
        if(!instagramInfluencer) return res.status(404).json({message:"Instagram Influencer not found"})
        
            res.status(200).json({instagramInfluencer,message:"Instagram Influencer deleted Successfully"})
            
        } catch (error) {
            res.status(400).json({error:error.message})
        }
}
