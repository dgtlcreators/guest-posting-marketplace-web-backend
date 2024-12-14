
const Contact = require("../models/contactModal.js");

const ContentWriter = require('../models/contentWriterModel.js');
const Activity = require('../models/activity.js');

module.exports.getAllContentWriters = async (req, res) => {
  try {
    const writers = await ContentWriter.find();
    res.json({ message: 'Writer data fetch successfully',data:writers});
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



module.exports.createContentWriter = async (req, res) => {
  const { name, bio, experience, expertise, languages,location, collaboration,industry,subCategories, wordCount ,gender, email } = req.body;
  if (!email) {
  //  return res.status(400).json({ message: 'Email is required' });
  }
 
  try {
    const newWriter = new ContentWriter({ name, bio, experience, expertise, languages,location, collaboration,industry,//subCategories
      wordCount ,gender,  email });
    const writer = await newWriter.save();
    res.status(201).json({ message: 'Writer created successfully', data: writer });
  } catch (err) {
    if (err.code === 11000) {  // Duplicate email error
      res.status(400).json({ message: 'Email already exists' });
    } else {
      res.status(500).json({ message: 'Server error', error: err.message });
    }
  }
};


module.exports.getContentWriterById = async (req, res) => {
  try {
    const writer = await ContentWriter.findById(req.params.id);
    if (!writer) return res.status(404).json({ message: 'Writer not found' });
    res.json({ message: 'Writer data fetch successfully',data:writer});
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports.updateContentWriter = async (req, res) => {
  const { 
    name, 
    bio, 
    experience, 
    expertise, 
    location, 
    languages, 
    collaboration, 
    industry, 
    gender, 
    wordCount, 
    email, 
    verifiedStatus, // Added verifiedStatus
    isBookmarked // Added isBookmarked
  } = req.body;

  try {
    let writer = await ContentWriter.findById(req.params.id);
    if (!writer) return res.status(404).json({ message: 'Writer not found' });

    // Update writer fields with values from request body
    writer.name = name || writer.name;
    writer.bio = bio || writer.bio;
    writer.experience = experience || writer.experience;
    writer.location = location || writer.location;
    writer.expertise = expertise || writer.expertise;
    writer.languages = languages || writer.languages;
    writer.collaboration = collaboration || writer.collaboration;
    writer.email = email || writer.email;
    writer.wordCount = wordCount || writer.wordCount;
    writer.gender = gender || writer.gender;
    writer.industry = industry || writer.industry;
    writer.verifiedStatus = verifiedStatus !== undefined ? verifiedStatus : writer.verifiedStatus;
    writer.isBookmarked = isBookmarked !== undefined ? isBookmarked : writer.isBookmarked;

    // Save the updated writer data
    writer = await writer.save();

    res.json({ message: 'Writer updated successfully', data: writer });
  } catch (err) {
    if (err.code === 11000) {
      // Duplicate email error
      res.status(400).json({ message: 'Email already exists' });
    } else {
      // General server error
      res.status(500).json({ message: 'Server error', error: err.message });
    }
  }
};

  

module.exports.deleteContentWriter = async (req, res) => {
  try {
    const writer = await ContentWriter.findByIdAndDelete(req.params.id);
    if (!writer) return res.status(404).json({ message: 'Writer not found' });
    
    res.json({ message: 'Writer removed sucessfully',data:writer});
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


module.exports.getFilteredContentWriters = async (req, res) => {
  const formData = Array.isArray(req.body) ? req.body[0] : req.body;

  const { 
    name, 
    bio, 
    experienceFrom, 
    experienceTo, 
    verifiedStatus,
    email, 
    expertise, 
    languages, 
    location,
    languageProficiency,
    industry,
    collaboration,
    gender, 
    wordCountFrom,
    wordCountTo
  } = formData;



  try {
    // Create an empty query object
    const query = {};

    // Check if any filter is provided; if none, return all results
    const isFilterEmpty = 
      !name && 
      !bio && 
      !experienceFrom && 
      !experienceTo && 
      !email && 
      !expertise && 
      !languages && 
      !verifiedStatus && 
      !location && 
      !languageProficiency && 
      !industry && 
      !collaboration && 
      !gender && 
      !wordCountFrom && 
      !wordCountTo;

    // If all filters are empty, skip query filtering and fetch all results
    if (isFilterEmpty) {
      const writers = await ContentWriter.find();
      return res.json({ message: 'All writers fetched successfully', data: writers });
    }

    // Add filters only if they are not empty
    if (name) query.name = { $regex: new RegExp(name, 'i') };
    if (bio) query.bio = { $regex: new RegExp(bio, 'i') };
    if (experienceFrom !== undefined && experienceFrom !== "") query.experience = { ...query.experience, $gte: Number(experienceFrom) };
    if (experienceTo !== undefined && experienceTo !== "") query.experience = { ...query.experience, $lte: Number(experienceTo) };
    if (email) query.email = { $regex: new RegExp(email, 'i') };
    if (gender) query.gender = { $regex: new RegExp(gender, 'i') };
    if (wordCountFrom !== undefined && wordCountFrom !== "") query.wordCount = { ...query.wordCount, $gte: Number(wordCountFrom) };
    if (wordCountTo !== undefined && wordCountTo !== "") query.wordCount = { ...query.wordCount, $lte: Number(wordCountTo) };

    if (languages && languages.length > 0) query.language = languages;
    if (languageProficiency) query.languageProficiency = languageProficiency;
    if (verifiedStatus !== undefined && verifiedStatus !== "") query.verifiedStatus = verifiedStatus;

  

    // Apply languages filter if it's provided
    if (languages && languages.length > 0) {
      query.language = {
        $elemMatch: {
          $and: languages.map(lang => {
            const langQuery = {};
            if (lang.name) langQuery.name = { $regex: new RegExp(lang.name, 'i') };
            if (lang.proficiency) langQuery.proficiency = { $regex: new RegExp(lang.proficiency, 'i') };
            return langQuery;
          })
        }
      };
    }

    // Apply location filter if it's provided
    if (location) {
      if (location.country) query['location.country'] = { $regex: new RegExp(location.country, 'i') };
      if (location.state) query['location.state'] = { $regex: new RegExp(location.state, 'i') };
      if (location.city) query['location.city'] = { $regex: new RegExp(location.city, 'i') };
    }

    if (industry && industry.length > 0) {
      query.industry = {
          $elemMatch: {
              $or: industry.map(ind => {
                  const industryQuery = {};
                  
                
                  if (ind.type) {
                      industryQuery.type = { $regex: new RegExp(ind.type, 'i') };
                  }
  
                
                  if (ind.subCategories && ind.subCategories.length > 0) {
                      industryQuery.subCategories = {
                          $elemMatch: {
                              $and: ind.subCategories.map(sub => {
                                  const subCategoryQuery = {};
                                  if (sub.type) {
                                      subCategoryQuery.type = { $regex: new RegExp(sub.type, 'i') };
                                  }
                                  if (sub.other) {
                                      subCategoryQuery.other = { $regex: new RegExp(sub.other, 'i') };
                                  }
                                  return subCategoryQuery;
                              })
                          }
                      };
                  }
  
                  return industryQuery;
              })
          }
      };
  }


    if (expertise && expertise.length > 0) {
            query.expertise = {
              $elemMatch: {
                $or: expertise.map(exp => {
                  const expQuery = {};
                  
                  if (exp.type) {
                    expQuery.type = { $regex: new RegExp(exp.type, 'i') };
                  }
                  
                  if (exp.other) {
                    expQuery.other = { $regex: new RegExp(exp.other, 'i') };
                  }
                  
                  return expQuery;
                })
              }
            };
          }

    // Apply collaboration rate filters if they are provided
    if (collaboration) {
      if (collaboration.hourlyRateFrom !== undefined && collaboration.hourlyRateFrom !== "") query['collaboration.hourlyRate'] = { ...query['collaboration.hourlyRate'], $gte: Number(collaboration.hourlyRateFrom) };
      if (collaboration.hourlyRateTo !== undefined && collaboration.hourlyRateTo !== "") query['collaboration.hourlyRate'] = { ...query['collaboration.hourlyRate'], $lte: Number(collaboration.hourlyRateTo) };
      if (collaboration.perWordRateFrom !== undefined && collaboration.perWordRateFrom !== "") query['collaboration.perWordRate'] = { ...query['collaboration.perWordRate'], $gte: Number(collaboration.perWordRateFrom) };
      if (collaboration.perWordRateTo !== undefined && collaboration.perWordRateTo !== "") query['collaboration.perWordRate'] = { ...query['collaboration.perWordRate'], $lte: Number(collaboration.perWordRateTo) };
      if (collaboration.projectRateFrom !== undefined && collaboration.projectRateFrom !== "") query['collaboration.projectRate'] = { ...query['collaboration.projectRate'], $gte: Number(collaboration.projectRateFrom) };
      if (collaboration.projectRateTo !== undefined && collaboration.projectRateTo !== "") query['collaboration.projectRate'] = { ...query['collaboration.projectRate'], $lte: Number(collaboration.projectRateTo) };
    }


    const writers = await ContentWriter.find(query);
    res.json({ message: 'Writers filtered successfully', data: writers });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error", data: error });
  }
};







module.exports.addContactSpecificId=async (req, res) => {
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
};


module.exports.getAllContactData = async (req, res) => {
  try {
    
    const contactData = await Contact.find();
    if (!contactData) {
      return res
        .status(404)
        .json({ msg: "Contact data not found from super admin" });
    }
    res.status(200).json(contactData);
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
    res.status(200).json(contactData);
  } catch (error) {
    console.error("Error fetching contact data:", error);
    res.status(500).json({ error: "Error fetching contact data" });
  }
};
