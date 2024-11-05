const InstagramInfluencer = require("../models/instagramInfluencerModel")
const { param } = require("../routes/instagramInfluencerRoute")
const Activity = require('../models/activity.js');



const path = require('path');
module.exports.addInstagraminfluencer = async (req, res) => {
  try {
     
      const { location = '', profilePicture, mediaKit, collaborationRates, ...rest } = req.body;
      let profilePictureUrl = profilePicture;
      let mediaKitUrl = mediaKit;

      console.log("req.body: ", req.body); 
      console.log("req.files: ", req.files);

   
     

      console.log("Before location: ",location)
      let parsedLocation = {};

      if (location) {
          try {
              if (typeof location === 'string') {
                  // Try parsing the location if it's a string
                  parsedLocation = JSON.parse(location);
                  console.log("Parsed location from string:", parsedLocation);
              } else if (typeof location === 'object') {
                  // If location is already an object, use it as is
                  parsedLocation = location;
                  console.log("Using location as object:", parsedLocation);
              }
          } catch (err) {
              console.error("Error parsing location:", err);
              // In case of error, set parsedLocation to an empty object
              parsedLocation = {};
          }
      } else {
          console.log("Location not provided or is empty");
      }
      
          //const parsedLocation = typeof location === 'string' ? JSON.parse(location) : location;

      // Handle file uploads
      if (req.files) {
          const profilePictureFile = req.files['profilePicture'] ? req.files['profilePicture'][0] : null;
          const mediaKitFile = req.files['mediaKit'] ? req.files['mediaKit'][0] : null;

          profilePictureUrl = profilePictureFile ? `/uploads/${profilePictureFile.filename}` : profilePictureUrl;
          mediaKitUrl = mediaKitFile ? `/uploads/${mediaKitFile.filename}` : mediaKitUrl;
      }

      // Parse collaborationRates if it's a string
      let parsedCollaborationRates = {};
      if (collaborationRates) {
          if (typeof collaborationRates === 'string') {
              parsedCollaborationRates = JSON.parse(collaborationRates);
          } else {
              parsedCollaborationRates = collaborationRates || {};  // Handle undefined or empty cases
          }
      }

      // Create the InstagramInfluencer object
      const instagramInfluencer = new InstagramInfluencer({
          ...rest,
          location: parsedLocation,  // Store parsed location here
          profilePicture: profilePictureUrl,
          mediaKit: mediaKitUrl,
          collaborationRates: {
              post: Number(parsedCollaborationRates.post) || 0,
              story: Number(parsedCollaborationRates.story) || 0,
              reel: Number(parsedCollaborationRates.reel) || 0
          }
      });

      // Save the influencer to the database
      await instagramInfluencer.save();

      res.status(201).json({ instagramInfluencer, message: "Instagram Influencer added Successfully" });
  } catch (error) {
      res.status(400).json({ error: error.message });
  }
};





module.exports.addInstagraminfluencer11 = async (req, res) => {
  try {
      const {  location= {},profilePicture, mediaKit, collaborationRates, ...rest } = req.body;
      let profilePictureUrl = profilePicture;
      let mediaKitUrl = mediaKit;

      console.log("req.body: ", req.body);
      console.log("req.files: ", req.files);

      if (req.files) {
          const profilePictureFile = req.files['profilePicture'] ? req.files['profilePicture'][0] : null;
          const mediaKitFile = req.files['mediaKit'] ? req.files['mediaKit'][0] : null;

          profilePictureUrl = profilePictureFile ? `/uploads/${profilePictureFile.filename}` : profilePictureUrl;
          mediaKitUrl = mediaKitFile ? `/uploads/${mediaKitFile.filename}` : mediaKitUrl;
      }

      
      let parsedCollaborationRates = {};
      if (collaborationRates) {
          if (typeof collaborationRates === 'string') {
              parsedCollaborationRates = JSON.parse(collaborationRates);
          } else {
              parsedCollaborationRates = collaborationRates || {}; 
          }
      }
      let parsedLocation = {};
      if (location) {
          try {
              // Try to clean and parse the location string
              let locationString = location.trim();

              // Manually fix the malformed string if necessary
              if (locationString.startsWith('{') && locationString.endsWith('}')) {
                  // Ensure keys are quoted and try parsing again
                  locationString = locationString.replace(/(\w+):/g, '"$1":');
                  parsedLocation = JSON.parse(locationString);
              }
          } catch (err) {
              console.log("Error parsing location:", err);
              // Handle the case where location format is invalid
              parsedLocation = {};
          }
      }
      const instagramInfluencer = new InstagramInfluencer({
          ...rest,
          location: parsedLocation,
          profilePicture: profilePictureUrl,
          mediaKit: mediaKitUrl,
          collaborationRates: {
              post: Number(parsedCollaborationRates.post) || 0,
              story: Number(parsedCollaborationRates.story) || 0,
              reel: Number(parsedCollaborationRates.reel) || 0
          }
      });

      await instagramInfluencer.save();
      res.status(201).json({ instagramInfluencer, message: "Instagram Influencer added Successfully" });
  } catch (error) {
      res.status(400).json({ error: error.message });
  }
};


module.exports.addInstagraminfluencer1 = async (req, res) => {
    try {
      const { profilePicture, mediaKit, collaborationRates, ...rest } = req.body;
      let profilePictureUrl = profilePicture;
      let mediaKitUrl = mediaKit;
      console.log("req.body: ", req.body);
console.log("req.files: ", req.files);

  
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
          post: Number(collaborationRates?.post) || 0,
          story: Number(collaborationRates?.story) || 0,
          reel: Number(collaborationRates?.reel) || 0
        }
      });

       
      //console.log("req.user: ",req.user)
     /* const activity = new Activity({
        userId: req.user._id, 
        action: 'Added Instagram Influencer',
        section: 'Instagram Influencer',
        role: req.user.role, 
        details: {
            influencerId: instagramInfluencer._id,
            influencerName: instagramInfluencer.name, 
        }
    });
    await activity.save();*/
  
      
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
        
     /* console.log("req.user: ",req)
        const activity = new Activity({
          userId: req.user?._id,
          action: 'Get all Instagram Influencer',
          section: 'Instagram Influencer',
          role: req.user.role,
          details: {
              influencerId: instagramInfluencer._id,
              influencerName: instagramInfluencer.name,
          }
      });
      await activity.save();*/
            res.status(200).json({instagramInfluencer,message:"Instagram Influencer get all data Successfully"})
            
        } catch (error) {
            res.status(400).json({error:error.message})
        }
}

module.exports.getInstagraminfluencerById=async(req,res)=>{
    try {
        
        const instagramInfluencer=await InstagramInfluencer.findById(req.params.id)
        if(!instagramInfluencer) return res.status(404).json({message:"Instagram Influencer not found"})
            
         /* const activity = new Activity({
            userId: req.user?._id,
            action: 'Get  Instagram Influencer By Id',
            section: 'Instagram Influencer',
            role: req.user.role,
            details: {
                influencerId: instagramInfluencer._id,
                influencerName: instagramInfluencer.name,
            }
        });
        await activity.save();*/

          res.status(200).json({instagramInfluencer,message:"Instagram Influencer get by id Successfully"})
            
        } catch (error) {
            res.status(400).json({error:error.message})
        }
}

module.exports.updateInstagraminfluencer=async(req,res)=>{
    try {
      //console.log("updateInstagraminfluencer ",req.body)
        //const profilePicture = req.files['profilePicture'] ? req.files['profilePicture'][0].path : null;
  //  const mediaKit = req.files['mediaKit'] ? req.files['mediaKit'][0].path : null;
  //const profilePictureFile = req.files['profilePicture'] ? req.files['profilePicture'][0] : null;
  //const mediaKitFile = req.files['mediaKit'] ? req.files['mediaKit'][0] : null;

   // const profilePictureUrl = profilePictureFile ? `/uploads/${profilePictureFile.filename}` : 4;
    //const mediaKitUrl = mediaKitFile ? `/uploads/${mediaKitFile.filename}` : null;
    const { profilePicture, mediaKit, collaborationRates,isBookmarked, ...rest } = req.body;
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
     isBookmarked: isBookmarked === true,
     profilePicture: profilePictureUrl,
     mediaKit: mediaKitUrl,
     collaborationRates: {
       post: Number(collaborationRates?.post) || 0,
       story: Number(collaborationRates?.story) || 0,
       reel: Number(collaborationRates?.reel) || 0
     }
    };
    const instagramInfluencer = await InstagramInfluencer.findByIdAndUpdate(req.params.id, updatedData, { new: true });
       // const instagramInfluencer=await InstagramInfluencer.findByIdAndUpdate(req.params.id,req.body,{new:true})
        if(!instagramInfluencer) return res.status(404).json({message:"Instagram Influencer not found"})
            
        /*  console.log("req.user: ",req.user)
          const activity = new Activity({
            userId: req.user._id,
            action: 'Updated Instagram Influencer',
            section: 'Instagram Influencer',
            role: req.user.role,
            details: {
                influencerId: instagramInfluencer._id,
                influencerName: instagramInfluencer.name,
            }
        });
        await activity.save();*/
          res.status(200).json({instagramInfluencer,message:"Instagram Influencer updated  Successfully"})
            
        } catch (error) {
            res.status(400).json({error:error.message})
        }
}

module.exports.deleteInstagraminfluencer=async(req,res)=>{
    try {
      console.log("req.params.id ",req.params.id)
        const instagramInfluencer=await InstagramInfluencer.findByIdAndDelete(req.params.id)
        if(!instagramInfluencer) return res.status(404).json({message:"Instagram Influencer not found"})
        

         /* const activity = new Activity({
            userId: req.user._id,
            action: 'Deleted Instagram Influencer',
            section: 'Instagram Influencer',
            role: req.user.role,
            details: {
                influencerId: instagramInfluencer._id,
                influencerName: instagramInfluencer.name,
            }
        });
        await activity.save();*/

            res.status(200).json({instagramInfluencer,message:"Instagram Influencer deleted Successfully"})
            
        } catch (error) {
            res.status(400).json({error:error.message})
        }
}
