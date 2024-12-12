const InstagramInfluencerModel = require('../models/instagramInfluencerModel');
const ApplicationBrandUser = require('../models/applicationBrandUser');
const Activity = require('../models/activity.js');


const filterInstagramInfluencers = async (req, res) => {
  // Extract the first object from the array in req.body
 // const formData = req.body[0];
 const formData = Array.isArray(req.body) ? req.body[0] : req.body;

  
  //console.log("Received formData:", formData);
  
  const {
    username,
    fullName,
    followersCountFrom,
    followersCountTo,
    engagementRateFrom,
    engagementRateTo,
    category,
    location,
    language,
    verifiedStatus,
    collaborationRates
  } = formData ;
console.log(formData);
  try {
    const query = {};

    if (username) query.username = { $regex: new RegExp(username, 'i') };
    if (fullName) query.fullName = { $regex: new RegExp(fullName, 'i') };
    if (followersCountFrom !== undefined && followersCountFrom !== "") {
      query.followersCount = { $gte: Number(followersCountFrom) };
    }
    if (followersCountTo !== undefined && followersCountTo !== "") {
      query.followersCount = { ...query.followersCount, $lte: Number(followersCountTo) };
    }
    if (engagementRateFrom !== undefined && engagementRateFrom !== "") {
      query.engagementRate = { $gte: Number(engagementRateFrom) };
    }
    if (engagementRateTo !== undefined && engagementRateTo !== "") {
      query.engagementRate = { ...query.engagementRate, $lte: Number(engagementRateTo) };
    }
    if (category) query.category = category;
    
    
    if (location) {
      if (location.country) query['location.country'] = { $regex: new RegExp(location.country, 'i') };
      if (location.state) query['location.state'] = { $regex: new RegExp(location.state, 'i') };
      if (location.city) query['location.city'] = { $regex: new RegExp(location.city, 'i') };
    }


    if (language) query.language = language;


    //if (verifiedStatus !== undefined && verifiedStatus !== "") {
    //  query.verifiedStatus = verifiedStatus === "true";
    //}
    if (verifiedStatus !== undefined && verifiedStatus !== "") query.verifiedStatus = verifiedStatus;

    if (collaborationRates) {
      if (collaborationRates.postFrom !== undefined && collaborationRates.postFrom !== "") {
        query['collaborationRates.post'] = { $gte: Number(collaborationRates.postFrom) };
      }
      if (collaborationRates.postTo !== undefined && collaborationRates.postTo !== "") {
        query['collaborationRates.post'] = { ...query['collaborationRates.post'], $lte: Number(collaborationRates.postTo) };
      }
      if (collaborationRates.storyFrom !== undefined && collaborationRates.storyFrom !== "") {
        query['collaborationRates.story'] = { $gte: Number(collaborationRates.storyFrom) };
      }
      if (collaborationRates.storyTo !== undefined && collaborationRates.storyTo !== "") {
        query['collaborationRates.story'] = { ...query['collaborationRates.story'], $lte: Number(collaborationRates.storyTo) };
      }
      if (collaborationRates.reelFrom !== undefined && collaborationRates.reelFrom !== "") {
        query['collaborationRates.reel'] = { $gte: Number(collaborationRates.reelFrom) };
      }
      if (collaborationRates.reelTo !== undefined && collaborationRates.reelTo !== "") {
        query['collaborationRates.reel'] = { ...query['collaborationRates.reel'], $lte: Number(collaborationRates.reelTo) };
      }
    }

   // console.log("Constructed Query:", query);

    // Find influencers based on the constructed query
    const influencers = await InstagramInfluencerModel.find(query);
    //console.log("Filtered Influencers:", influencers);

    res.json(influencers);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


const filterInstagramInfluencers1 = async (req, res) => {
  const formData = req.body[0];
  const { 
    username, 
    fullName,
    followersCountFrom, 
    followersCountTo, 
    engagementRateFrom, 
    engagementRateTo, 
    category, 
    location, 
    language, 
    verifiedStatus,
    collaborationRates
  } = req.body;
  //console.log(req.body)
  console.log("Received formData:", formData);
  try {
    const query = {};

    if (username) query.username = { $regex: new RegExp(username, 'i') };
    if (fullName) query.fullName = { $regex: new RegExp(fullName, 'i') };
    if (followersCountFrom !== undefined && followersCountFrom !== "") query.followersCount = { ...query.followersCount, $gte: Number(followersCountFrom) };
    if (followersCountTo !== undefined && followersCountTo !== "") query.followersCount = { ...query.followersCount, $lte: Number(followersCountTo) };
    if (engagementRateFrom !== undefined && engagementRateFrom !== "") query.engagementRate = { ...query.engagementRate, $gte: Number(engagementRateFrom) };
    if (engagementRateTo !== undefined && engagementRateTo !== "") query.engagementRate = { ...query.engagementRate, $lte: Number(engagementRateTo) };
    if (category) query.category = category;
    if (location) query.location = location;
    if (language) query.language = language;
    if (verifiedStatus !== undefined && verifiedStatus !== "") query.verifiedStatus = verifiedStatus;

   //if (verifiedStatus !== "") {
  //  query.verifiedStatus = query.verifiedStatus === "true"; // or adjust based on how you handle booleans
 // }

    if (collaborationRates) {
      if (collaborationRates.postFrom !== undefined && collaborationRates.postFrom !== "") query['collaborationRates.post'] = { ...query['collaborationRates.post'], $gte: Number(collaborationRates.postFrom) };
      if (collaborationRates.postTo !== undefined && collaborationRates.postTo !== "") query['collaborationRates.post'] = { ...query['collaborationRates.post'], $lte: Number(collaborationRates.postTo) };
      if (collaborationRates.storyFrom !== undefined && collaborationRates.storyFrom !== "") query['collaborationRates.story'] = { ...query['collaborationRates.story'], $gte: Number(collaborationRates.storyFrom) };
      if (collaborationRates.storyTo !== undefined && collaborationRates.storyTo !== "") query['collaborationRates.story'] = { ...query['collaborationRates.story'], $lte: Number(collaborationRates.storyTo) };
      if (collaborationRates.reelFrom !== undefined && collaborationRates.reelFrom !== "") query['collaborationRates.reel'] = { ...query['collaborationRates.reel'], $gte: Number(collaborationRates.reelFrom) };
      if (collaborationRates.reelTo !== undefined && collaborationRates.reelTo !== "") query['collaborationRates.reel'] = { ...query['collaborationRates.reel'], $lte: Number(collaborationRates.reelTo) };
    }
    console.log("Constructed Query:", query);
    const influencers = await InstagramInfluencerModel.find(query);
    console.log("Filtered Influencers:", influencers);
    res.json(influencers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};






/*const filterInstagramInfluencers =async (req, res) => {
  const { 
    username, 
    followersCount, 
    engagementRate, 
    category, 
    location, 
    language, 
    verifiedStatus, 
    collaborationRates
    //collaborationRatePost, 
    //collaborationRateStory, 
   // collaborationRateReel 
  } = req.body;

  const filters = {};

  if (username) filters.username = username;
  if (followersCount) filters.followersCount = { $gte: followersCount };
  if (engagementRate) filters.engagementRate = { $gte: engagementRate };
  if (category) filters.category = category;
  if (location) filters.location = location;
  if (language) filters.language = language;
  if (verifiedStatus) filters.verifiedStatus = verifiedStatus === "true";
  if (collaborationRates) {
    if (collaborationRates.post !== undefined) filters['collaborationRates.post'] = { $gte: collaborationRates.post };
    if (collaborationRates.story !== undefined) filters['collaborationRates.story'] = { $gte: collaborationRates.story };
    if (collaborationRates.reel !== undefined) filters['collaborationRates.reel'] = { $gte: collaborationRates.reel };
  }

  //console.log(collaborationRatePost)
  //if (collaborationRatePost) filters.collaborationRatePost = { $gte: collaborationRatePost };
 // if (collaborationRateStory) filters.collaborationRateStory = { $gte: collaborationRateStory };
 // if (collaborationRateReel) filters.collaborationRateReel = { $gte: collaborationRateReel };
 //if (collaborationRatePost !== undefined) filters['collaborationRates.post'] = { $gte: collaborationRatePost };
  //if (collaborationRateStory !== undefined) filters['collaborationRates.story'] = { $gte: collaborationRateStory };
  //if (collaborationRateReel !== undefined) filters['collaborationRates.reel'] = { $gte: collaborationRateReel };


  try {
    const influencers = await InstagramInfluencerModel.find(filters);
    res.status(200).json(influencers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};*/


const submitForm = async (req, res) => {
    try {
      const data = new InstagramInfluencerModel(req.body);
      await data.save();
      res.status(201).json({ message: "Form data saved successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  const getData = async (req, res) => {
    try {
      const response = await InstagramInfluencerModel.find({});
      res.status(200).json({ message: "Form data fetched successfully", data: response });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  const getFilteredData = async (req, res) => {
    try {
      const {
        minFollowers,
        maxFollowers,
        minEngagementRate,
        maxEngagementRate,
        category,
        location,
        minCollabRate,
        maxCollabRate,
        verifiedStatus,
        language,
        recentActivity,
        minRating,
        maxRating,
      } = req.body;
  
      const filters = {};
  
      if (minFollowers) filters.followersCount = { $gte: parseInt(minFollowers) };
      if (maxFollowers) filters.followersCount = { ...filters.followersCount, $lte: parseInt(maxFollowers) };
      if (minEngagementRate) filters.engagementRate = { $gte: parseFloat(minEngagementRate) };
      if (maxEngagementRate) filters.engagementRate = { ...filters.engagementRate, $lte: parseFloat(maxEngagementRate) };
      if (category) filters.category = category;
      if (location) filters.location = location;
      if (minCollabRate) filters['collaborationRates.post'] = { $gte: parseFloat(minCollabRate) }; 
      if (maxCollabRate) filters['collaborationRates.post'] = { ...filters['collaborationRates.post'], $lte: parseFloat(maxCollabRate) };
      if (verifiedStatus !== undefined) filters.verifiedStatus = verifiedStatus === 'true';
      if (language) filters.language = language;
      if (recentActivity) filters.updatedAt = { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) }; 
      if (minRating) filters.rating = { $gte: parseFloat(minRating) }; 
      if (maxRating) filters.rating = { ...filters.rating, $lte: parseFloat(maxRating) };
  
      const influencers = await InstagramInfluencerModel.find(filters);
      res.json(influencers);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  const getRequest = async (req, res) => {
    try {
      const {
        username, 
        followersCount, 
        engagementRate, 
        category, 
        location, 
        language, 
        verifiedStatus, 
        collaborationRates,
        //collaborationRatePost, 
        //collaborationRateStory, 
       // collaborationRateReel 
      } = req.body;
  
      const query = {};

      if (username) query.username = username;
      if (followersCount) query.followersCount = followersCount;
      if (engagementRate) query.engagementRate = engagementRate;
      if (category) query.category = category;
      if (location) query.location = location;
      if (language) query.language =language;
      if (verifiedStatus) query.verifiedStatus = verifiedStatus;
     // if (collaborationRatePost) query.collaborationRatePost = collaborationRatePost;
    //  if (collaborationRateStory) query.collaborationRateStory = collaborationRateStory;
     // if (collaborationRateReel) query.collaborationRateReel = collaborationRateReel;
     if (collaborationRates) {
      if (collaborationRates.post !== undefined) query['collaborationRates.post'] = { $gte: collaborationRates.post };
      if (collaborationRates.story !== undefined) query['collaborationRates.story'] = { $gte: collaborationRates.story };
      if (collaborationRates.reel !== undefined) query['collaborationRates.reel'] = { $gte: collaborationRates.reel };
    }

     
  
      const response = await InstagramInfluencerModel.find(query);
      res.status(200).json({ message: "Form data fetched based on query successfully", data: response });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };




const createApplication = async (req, res) => {
  try {
    const application = new ApplicationBrandUser(req.body);
    await application.save();
    res.status(200).json({ message: "Application added successfully", data: application });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


const appliacationByInfluencerId= async (req, res) => {
  try {
    const applications = await ApplicationBrandUser.find({ influencerId: req.params.influencerId });
    res.json(applications);
  } catch (error) {
    console.error('Error fetching applications:', error);
    res.status(500).send('Error fetching applications');
  }
};


const getAllApplications = async (req, res) => {
  try {
    const applications = await ApplicationBrandUser.find();
    res.status(200).json({ message: "Application getting successfully", data: applications });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


const getApplicationById = async (req, res) => {
  try {
    const application = await ApplicationBrandUser.findById(req.params.id);
    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }
    res.status(200).json({ message: "Application by id getting successfully", data: application });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


const updateApplicationById = async (req, res) => {
  try {
    const application = await ApplicationBrandUser.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }
    res.status(200).json({ message: "Application updated successfully", data: application });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete an application by ID
const deleteApplicationById = async (req, res) => {
  try {
    const application = await ApplicationBrandUser.findByIdAndDelete(req.params.id);
    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }
    res.status(200).json({ message: 'Application deleted successfully',data:application });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

  module.exports = {
    filterInstagramInfluencers,
    submitForm,
    getData,
    getFilteredData,
    getRequest,
    createApplication,
    getAllApplications,
   getApplicationById,
   updateApplicationById,
   deleteApplicationById,
   appliacationByInfluencerId
  };


