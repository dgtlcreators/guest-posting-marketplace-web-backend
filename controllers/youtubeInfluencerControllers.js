

const YoutubeInfluencer=require("../models/youtubeInfluencerModel.js")
const Contact = require("../models/contactModal.js");



module.exports.addYoutubeInfluencer = async (req, res) => {
  try {
    const {
      username,
      fullname,
      profilePicture,
      bio,
      followersCount,
      videosCount,
      engagementRate,
      averageViews,
      category,
      location,
      language,
      collaborationRates = {},
      pastCollaborations = '[]',
      audienceDemographics = {},
      mediaKit,
    } = req.body;

    // Parse JSON strings into arrays
    const parsedPastCollaborations = JSON.parse(pastCollaborations);
    const parsedAudienceDemographics = {
      age: JSON.parse(audienceDemographics.age || '[]'),
      gender: JSON.parse(audienceDemographics.gender || '[]'),
      geographicDistribution: JSON.parse(audienceDemographics.geographicDistribution || '[]'),
    };

    const youtubeInfluencer = new YoutubeInfluencer({
      username,
      fullname,
      profilePicture,
      bio,
      followersCount: Number(followersCount) || 0,
      videosCount: Number(videosCount) || 0,
      engagementRate: Number(engagementRate) || 0,
      averageViews: Number(averageViews) || 0,
      category,
      location,
      language,
      collaborationRates: {
        sponsoredVideos: Number(collaborationRates.sponsoredVideos) || 0,
        productReviews: Number(collaborationRates.productReviews) || 0,
        shoutouts: Number(collaborationRates.shoutouts) || 0,
      },
      pastCollaborations: parsedPastCollaborations,
      audienceDemographics: parsedAudienceDemographics,
      mediaKit,
    });

    await youtubeInfluencer.save();
    res.status(200).json({ message: "Youtube Influencer added successfully", data: youtubeInfluencer });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message, error: error });
  }
};




module.exports.getAllYoutubeInfluencer=async(req,res)=>{
    try {
        const youtubeInfluencer=await YoutubeInfluencer.find({})
    
        res.status(200).json({message:"All Youtube Influencers fetch details successfully",data:youtubeInfluencer})
        
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}
    
    
module.exports.getYoutubeInfluencerById=async(req,res)=>{
    try {
     
        const youtubeInfluencer=await YoutubeInfluencer.findById(req.params.id)
        if(!youtubeInfluencer) return res.status(404).json({meassage:"Youtube Influencer not found"})
        res.status(200).json({message:"Youtube Influencer By Id fetch data successfully",data:youtubeInfluencer})
        
    } catch (error) {
        res.status(500).json({message:error.message})
    }
    }
    

module.exports.updateYoutubeInfluencer = async (req, res) => {
  try {
      const { username, fullname, profilePicture, bio, followersCount, videosCount, engagementRate, averageViews, category, location, language, collaborationRates, pastCollaborations, audienceDemographics, mediaKit } = req.body;
    //  console.log(req.body);


      let profilePictureUrl = profilePicture;
      let mediaKitUrl = mediaKit;

      if (req.files) {
          const profilePictureFile = req.files["profilePicture"] ? req.files["profilePicture"][0] : null;
          const mediaKitFile = req.files["mediaKit"] ? req.files["mediaKit"][0] : null;

          profilePictureUrl = profilePictureFile ? `/uploads/${profilePictureFile.filename}` : profilePictureUrl;
          mediaKitUrl = mediaKitFile ? `/uploads/${mediaKitFile.filename}` : mediaKitUrl;
      }

      const parsedPastCollaborations = Array.isArray(pastCollaborations) ? pastCollaborations : JSON.parse(pastCollaborations || '[]');
      const parsedAudienceDemographics = {
          age: Array.isArray(audienceDemographics?.age) ? audienceDemographics.age : JSON.parse(audienceDemographics?.age || '[]'),
          gender: Array.isArray(audienceDemographics?.gender) ? audienceDemographics.gender : JSON.parse(audienceDemographics?.gender || '[]'),
          geographicDistribution: Array.isArray(audienceDemographics?.geographicDistribution) ? audienceDemographics.geographicDistribution : JSON.parse(audienceDemographics?.geographicDistribution || '[]'),
      };

      const updatedData = {
          username,
          fullname,
          profilePicture: profilePictureUrl,
          bio,
          followersCount: Number(followersCount) || 0,
          videosCount: Number(videosCount) || 0,
          engagementRate: Number(engagementRate) || 0,
          averageViews: Number(averageViews) || 0,
          category,
          location,
          language,
          collaborationRates: {
              sponsoredVideos: Number(collaborationRates?.sponsoredVideos) || 0,
              productReviews: Number(collaborationRates?.productReviews) || 0,
              shoutouts: Number(collaborationRates?.shoutouts) || 0,
          },
          pastCollaborations: parsedPastCollaborations,
          audienceDemographics: parsedAudienceDemographics,
          mediaKit: mediaKitUrl,
      };

      const youtubeInfluencer = await YoutubeInfluencer.findByIdAndUpdate(req.params.id, updatedData, { new: true });

    
      if (!youtubeInfluencer) {
          return res.status(404).json({ message: "Youtube Influencer not found" });
      }

      res.status(200).json({ message: "Youtube Influencer updated successfully", data: youtubeInfluencer });

  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};

    
    
module.exports.deleteYoutubeInfluencer=async(req,res)=>{
    try {
        const youtubeInfluencer=await YoutubeInfluencer.findByIdAndDelete(req.params.id)
        if(!youtubeInfluencer) return res.status(404).json({meassage:"Youtube Influencer not found"})
    
        res.status(200).json({message:"Youtube Influencer",data:youtubeInfluencer})
        
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

module.exports.getFilteredYoutubeInfluences=async(req,res)=>{
  try {

    const {
      username,
      followersCountFrom,followersCountTo,
      videosCountFrom,videosCountTo,
      engagementRateFrom,engagementRateTo,
      averageViewsFrom,averageViewsTo,
      category,
      location,
      language,
      collaborationRates ,
      pastCollaborations ,
      audienceDemographics,
    } = req.body;

    const query = {};

    if(username) query.username={$regex:new RegExp(username,'i')}
    if(followersCountFrom!==undefined && followersCountFrom !=="") query.followersCount={...query.followersCount,$gte:Number(followersCountFrom)}
    if(followersCountFrom!==undefined && followersCountTo !=="") query.followersCount={...query.followersCount,$lte:Number(followersCountTo)}
    if(videosCountFrom!==undefined && videosCountFrom !=="") query.videosCount={...query.videosCount,$gte:Number(videosCountFrom)}
    if(videosCountTo!==undefined && videosCountTo !=="") query.videosCount={...query.videosCount,$lte:Number(videosCountTo)}
    if(engagementRateFrom!==undefined && engagementRateFrom !=="") query.engagementRate={...query.engagementRate,$gte:Number(engagementRateFrom)}
    if(engagementRateTo!==undefined && engagementRateTo !=="") query.engagementRate={...query.engagementRate,$lte:Number(engagementRateTo)}
    if(averageViewsFrom!==undefined && averageViewsFrom !=="") query.averageViews={...query.averageViews,$gte:Number(averageViewsFrom)}
    if(averageViewsTo!==undefined && averageViewsTo !=="") query.averageViews={...query.averageViews,$lte:Number(averageViewsTo)}
    if(category) query.category=category;
    if(location) query.location=location
    if(language) query.language=language
   

    if(collaborationRates){
      if(collaborationRates.sponsoredVideosFrom!==undefined && collaborationRates.sponsoredVideosFrom!=="") 
        query["collaborationRates.sponsoredVideos"]={...query["collaborationRates.sponsoredVideos"],$gte:Number(collaborationRates.sponsoredVideosFrom)}
      if(collaborationRates.sponsoredVideosTo!==undefined && collaborationRates.sponsoredVideosTo!=="") 
        query["collaborationRates.sponsoredVideos"]={...query["collaborationRates.sponsoredVideos"],$lte:Number(collaborationRates.sponsoredVideosTo)}
      if(collaborationRates.productReviewsFrom!==undefined && collaborationRates.productReviewsFrom!=="") 
        query["collaborationRates.productReviews"]={...query["collaborationRates.productReviews"],$gte:Number(collaborationRates.productReviewsFrom)}
      if(collaborationRates.productReviewsTo!==undefined && collaborationRates.productReviewsTo!=="") 
        query["collaborationRates.productReviews"]={...query["collaborationRates.productReviews"],$lte:Number(collaborationRates.productReviewsTo)}
      if(collaborationRates.shoutoutsFrom!==undefined && collaborationRates.shoutoutsFrom!=="") 
        query["collaborationRates.shoutouts"]={...query["collaborationRates.shoutouts"],$gte:Number(collaborationRates.shoutoutsFrom)}
      if(collaborationRates.shoutoutsTo!==undefined && collaborationRates.shoutoutsTo!=="") 
        query["collaborationRates.shoutouts"]={...query["collaborationRates.shoutouts"],$lte:Number(collaborationRates.shoutoutsTo)}
    }

    if(pastCollaborations && pastCollaborations.length>0){
      query.pastCollaborations={$in:pastCollaborations}
    }

    if(audienceDemographics){
      if(audienceDemographics.age && audienceDemographics.age.length>0){
        query["audienceDemographics.age"]={$in:audienceDemographics.age}
      }
      if(audienceDemographics.gender && audienceDemographics.gender.length>0){
        query["audienceDemographics.gender"]={$in:audienceDemographics.gender}
      }
      if(audienceDemographics.geographicDistribution && audienceDemographics.geographicDistribution.length>0){
        query["audienceDemographics.geographicDistribution"]={$in:audienceDemographics.geographicDistribution}
      }
    }




    const influencers = await YoutubeInfluencer.find(query);
    res.status(200).json({message:"Getting Youtube Influencer filters",data:influencers})
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

    
    
/*module.exports.addContactSpecificId=async (req, res) => {
    try {
      const { name, email, message, publisherId,userId } = req.body;
      
      const newContact = new Contact({
        name,
        email,
        message,
        publisherId,
        userId
      });
  
      
      await newContact.save();
  
      res.status(201).json({ message: "Contact form submitted successfully" });
    } catch (error) {
      console.error("Error submitting contact form:", error);
      res.status(500).json({ error: "Error submitting contact form" });
    }
  };*/

  module.exports.addContactSpecificId = async (req, res) => {
    try {
      const { name, email, message, phone, status, publisherId, userId } = req.body;
      
      if (!name || !email || !message) {
        return res.status(400).json({ error: "Name, email, and message are required" });
      }
  
      const newContact = new Contact({
        name,
        email,
        message,
        phone: phone || '', 
        status: status || 'pending', 
        publisherId,
        userId
      });
  
      await newContact.save();
      res.status(201).json({ message: "Contact form submitted successfully", data: newContact });
    } catch (error) {
      console.error("Error submitting contact form:", error);
      res.status(500).json({ error: "Error submitting contact form", details: error.message });
    }
  };
  
  
  module.exports.getAllContactData = async (req, res) => {
    try {
      
      const contactData = await Contact.find();
      if (!contactData) {
        return res
          .status(404)
          .json({ msg: "Contact data not found from super admin" });
      }
      res.status(200).json({ message: "Contact form getting successfully", data: contactData });
    } catch (error) {
      res.status(500).json({ error: error });
    }
  };
  
  
  module.exports.getContactsByPublisherId = async (req, res) => {
    try {
      const publisherId = req.params.publisherId;
      const contactData = await Contact.find({ publisherId });
      if (!contactData.length) {
        return res.status(404).json({ msg: "No contact data found for this publisher" });
      }
      res.status(200).json({ message: "Contact form getting successfully", data: contactData });
    } catch (error) {
      console.error("Error fetching contact data:", error);
      res.status(500).json({ error: "Error fetching contact data" });
    }
  };
  
    
    