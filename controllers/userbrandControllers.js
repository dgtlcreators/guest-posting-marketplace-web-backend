const InstagramInfluencerModel = require('../models/instagramInfluencerModel');
const ApplicationBrandUser = require('../models/applicationBrandUser');


/*const filterInstagramInfluencers = async (req, res) => {
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
    } = req.query;

    const filters = {};

    if (minFollowers) filters.followersCount = { $gte: parseInt(minFollowers) };
    if (maxFollowers) filters.followersCount = { ...filters.followersCount, $lte: parseInt(maxFollowers) };
    if (minEngagementRate) filters.engagementRate = { $gte: parseFloat(minEngagementRate) };
    if (maxEngagementRate) filters.engagementRate = { ...filters.engagementRate, $lte: parseFloat(maxEngagementRate) };
    if (category) filters.category = category;
    if (location) filters.location = location;
    if (minCollabRate) filters['collaborationRates.post'] = { $gte: parseFloat(minCollabRate) }; // Example for post rates
    if (maxCollabRate) filters['collaborationRates.post'] = { ...filters['collaborationRates.post'], $lte: parseFloat(maxCollabRate) };
    if (verifiedStatus !== undefined) filters.verifiedStatus = verifiedStatus === 'true';
    if (language) filters.language = language;
    if (recentActivity) filters.updatedAt = { $gte: new Date(Date.now() - 30*24*60*60*1000) }; // Last 30 days
    if (minRating) filters.rating = { $gte: parseFloat(minRating) }; // Assuming you have a rating field
    if (maxRating) filters.rating = { ...filters.rating, $lte: parseFloat(maxRating) };

    const influencers = await InstagramInfluencerModel.find(filters);
    res.json(influencers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};*/

const filterInstagramInfluencers =async (req, res) => {
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
};


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



// Create a new application
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

// Get all applications
const getAllApplications = async (req, res) => {
  try {
    const applications = await ApplicationBrandUser.find();
    res.status(200).json({ message: "Application getting successfully", data: applications });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get a single application by ID
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

// Update an existing application by ID
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


