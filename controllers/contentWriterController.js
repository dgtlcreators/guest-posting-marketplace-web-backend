
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
  const { name, bio, experience, expertise, languages,location, collaborationRates,industry,subCategories, email } = req.body;
  try {
    const newWriter = new ContentWriter({ name, bio, experience, expertise, languages,location, collaborationRates,industry,//subCategories
       email });
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
    const { name, bio, experience, expertise,location, languages, collaborationRates,industry,subCategories, email } = req.body;
    try {
      let writer = await ContentWriter.findById(req.params.id);
      if (!writer) return res.status(404).json({ message: 'Writer not found' });
  
      writer.name = name || writer.name;
      writer.bio = bio || writer.bio;
      writer.experience = experience || writer.experience;
      writer.location = location || writer.location;
      writer.expertise = expertise || writer.expertise;
      writer.languages = languages || writer.languages;
      writer.collaborationRates = collaborationRates || writer.collaborationRates;
      writer.email = email || writer.email;
      writer.industry=industry || writer.industry;
      //writer.subCategories=subCategories || writer.subCategories;
  
      writer = await writer.save();
      res.json({ message: 'Writer updated successfully', data: writer });
    } catch (err) {
      if (err.code === 11000) {  
        res.status(400).json({ message: 'Email already exists' });
      } else {
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
/* correct code but i want combination   module.exports.getFilteredContentWriters = async (req, res) => {
  const { 
    name, 
    bio, 
    experienceFrom, 
    experienceTo, 
    email, 
    expertise, 
    languages, 
    languageProficiency,
    collaborationRates 
  } = req.body;

  try {
    const query = {};

    if (name) query.name = { $regex: new RegExp(name, 'i') };
    if (bio) query.bio = { $regex: new RegExp(bio, 'i') };
    if (experienceFrom !== undefined && experienceFrom !== "") query.experience = { ...query.experience, $gte: Number(experienceFrom) };
    if (experienceTo !== undefined && experienceTo !== "") query.experience = { ...query.experience, $lte: Number(experienceTo) };
    if (email) query.email = { $regex: new RegExp(email, 'i') };

    // Handle expertise filtering
    if (expertise && expertise.length > 0) {
      query.expertise = { 
        $elemMatch: { 
          type: { $in: expertise }
        }
      };
    }

    // Handle languages filtering
    if (languages && languages.length > 0) {
      query.languages = {
        $elemMatch: { 
          $or: languages.map(lang => {
            const langQuery = {};
            if (lang.name) {
              langQuery.name = { $regex: new RegExp(lang.name, 'i') };
            }
            if (lang.proficiency) {
              langQuery.proficiency = { $regex: new RegExp(lang.proficiency, 'i') };
            }
            return langQuery;
          })
        }
      };
    }

    // Handle languageProficiency filtering
    if (languageProficiency) {
      query.languages = {
        $elemMatch: { 
          proficiency: { $regex: new RegExp(languageProficiency, 'i') }
        }
      };
    }

    // Handle collaborationRates filtering
    if (collaborationRates) {
      if (collaborationRates.postFrom !== undefined && collaborationRates.postFrom !== "") query['collaborationRates.post'] = { ...query['collaborationRates.post'], $gte: Number(collaborationRates.postFrom) };
      if (collaborationRates.postTo !== undefined && collaborationRates.postTo !== "") query['collaborationRates.post'] = { ...query['collaborationRates.post'], $lte: Number(collaborationRates.postTo) };
      if (collaborationRates.storyFrom !== undefined && collaborationRates.storyFrom !== "") query['collaborationRates.story'] = { ...query['collaborationRates.story'], $gte: Number(collaborationRates.storyFrom) };
      if (collaborationRates.storyTo !== undefined && collaborationRates.storyTo !== "") query['collaborationRates.story'] = { ...query['collaborationRates.story'], $lte: Number(collaborationRates.storyTo) };
      if (collaborationRates.reelFrom !== undefined && collaborationRates.reelFrom !== "") query['collaborationRates.reel'] = { ...query['collaborationRates.reel'], $gte: Number(collaborationRates.reelFrom) };
      if (collaborationRates.reelTo !== undefined && collaborationRates.reelTo !== "") query['collaborationRates.reel'] = { ...query['collaborationRates.reel'], $lte: Number(collaborationRates.reelTo) };
    }

    const writers = await ContentWriter.find(query);
    res.json({ message: 'Writers filtered successfully', data: writers });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error", data: error });
  }
};*/


/*module.exports.getFilteredContentWriters = async (req, res) => {
  console.log(req.body)
  const { 
    name, 
    bio, 
    experienceFrom, 
    experienceTo, 
    email, 
    expertise, 
    languages, 
    languageProficiency,
    collaborationRates 
  } = req.body;

  try {
    const query = {};

    if (name) query.name = { $regex: new RegExp(name, 'i') };
    if (bio) query.bio = { $regex: new RegExp(bio, 'i') };
    if (experienceFrom !== undefined && experienceFrom !== "") query.experience = { ...query.experience, $gte: Number(experienceFrom) };
    if (experienceTo !== undefined && experienceTo !== "") query.experience = { ...query.experience, $lte: Number(experienceTo) };
    if (email) query.email = { $regex: new RegExp(email, 'i') };

    // Handle expertise filtering
    if (expertise) {
      query.expertise = { 
        $elemMatch: { 
          $or: [
            { type: { $regex: new RegExp(expertise, 'i') } },
            { other: { $regex: new RegExp(expertise, 'i') } }
          ]
        }
      };
    }

    // Handle languages filtering
    if (languages || languageProficiency) {
      query.languages = {
        $elemMatch: { 
          $and: [
            languages ? { name: { $regex: new RegExp(languages, 'i') } } : {},
            languageProficiency ? { proficiency: { $regex: new RegExp(languageProficiency, 'i') } } : {}
          ]
        }
      };
    }

    // Handle collaborationRates filtering
    if (collaborationRates) {
      if (collaborationRates.postFrom !== undefined && collaborationRates.postFrom !== "") query['collaborationRates.post'] = { ...query['collaborationRates.post'], $gte: Number(collaborationRates.postFrom) };
      if (collaborationRates.postTo !== undefined && collaborationRates.postTo !== "") query['collaborationRates.post'] = { ...query['collaborationRates.post'], $lte: Number(collaborationRates.postTo) };
      if (collaborationRates.storyFrom !== undefined && collaborationRates.storyFrom !== "") query['collaborationRates.story'] = { ...query['collaborationRates.story'], $gte: Number(collaborationRates.storyFrom) };
      if (collaborationRates.storyTo !== undefined && collaborationRates.storyTo !== "") query['collaborationRates.story'] = { ...query['collaborationRates.story'], $lte: Number(collaborationRates.storyTo) };
      if (collaborationRates.reelFrom !== undefined && collaborationRates.reelFrom !== "") query['collaborationRates.reel'] = { ...query['collaborationRates.reel'], $gte: Number(collaborationRates.reelFrom) };
      if (collaborationRates.reelTo !== undefined && collaborationRates.reelTo !== "") query['collaborationRates.reel'] = { ...query['collaborationRates.reel'], $lte: Number(collaborationRates.reelTo) };
    }

    const writers = await ContentWriter.find(query);
    res.json({ message: 'Writers filtered successfully', data: writers });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};*/

/*module.exports.getFilteredContentWriters = async (req, res) => {
 // console.log(req.body);
  const { 
    name, 
    bio, 
    experienceFrom, 
    experienceTo, 
    email, 
    expertise, 
    languages, location,
    languageProficiency,industry,subCategories,
    collaborationRates 
  } = req.body;

  try {
    const query = {};

    if (name) query.name = { $regex: new RegExp(name, 'i') };
    if (bio) query.bio = { $regex: new RegExp(bio, 'i') };
    if (experienceFrom !== undefined && experienceFrom !== "") query.experience = { ...query.experience, $gte: Number(experienceFrom) };
    if (experienceTo !== undefined && experienceTo !== "") query.experience = { ...query.experience, $lte: Number(experienceTo) };
    if (email) query.email = { $regex: new RegExp(email, 'i') };

    // Handle expertise filtering
    if (expertise && expertise.length > 0) {
      query.expertise = { 
        $elemMatch: { 
          type: { $in: expertise }
        }
      };
    }

    // Handle languages filtering
    /*if (languages && languages.length > 0) {
      query.languages = {
        $elemMatch: { 
           
          $or: languages.map(lang => ({
            name: lang.name ? { $regex: new RegExp(lang.name, 'i') } : {},
            proficiency: lang.proficiency ? { $regex: new RegExp(lang.proficiency, 'i') } : {}
          }))
        }
      };
    }

      if (languages && languages.length > 0) {
        query.languages = {
          $elemMatch: {
            $and: languages.map(lang => {
              const langQuery = {};
              if (lang.name) {
                langQuery.name = { $regex: new RegExp(lang.name, 'i') };
              }
              if (lang.proficiency) {
                langQuery.proficiency = { $regex: new RegExp(lang.proficiency, 'i') };
              }
              return langQuery;
            })
          }
        };
      }
      

    // Handle languageProficiency filtering
    if (languageProficiency) {
      query.languages = {
        $elemMatch: { 
          proficiency: { $regex: new RegExp(languageProficiency, 'i') }
        }
      };
    }
    if (location) query.location = location;
   /* if (industry) query.industry = { $regex: new RegExp(industry, 'i') };

    // Handle subCategories filtering
    if (subCategories && subCategories.length > 0) {
      query.subCategories = {
        $elemMatch: {
          type: { $in: subCategories }
        }
      };
    }
      if (industry) query.industry = { $regex: new RegExp(industry, 'i') };

      // Handle subCategories filtering
      if (subCategories && subCategories.length > 0) {
        query.subCategories = {
          $all: subCategories.map(subCategory => new RegExp(subCategory, 'i'))
        };
      }
    // Handle collaborationRates filtering
    if (collaborationRates) {
      if (collaborationRates.postFrom !== undefined && collaborationRates.postFrom !== "") query['collaborationRates.post'] = { ...query['collaborationRates.post'], $gte: Number(collaborationRates.postFrom) };
      if (collaborationRates.postTo !== undefined && collaborationRates.postTo !== "") query['collaborationRates.post'] = { ...query['collaborationRates.post'], $lte: Number(collaborationRates.postTo) };
      if (collaborationRates.storyFrom !== undefined && collaborationRates.storyFrom !== "") query['collaborationRates.story'] = { ...query['collaborationRates.story'], $gte: Number(collaborationRates.storyFrom) };
      if (collaborationRates.storyTo !== undefined && collaborationRates.storyTo !== "") query['collaborationRates.story'] = { ...query['collaborationRates.story'], $lte: Number(collaborationRates.storyTo) };
      if (collaborationRates.reelFrom !== undefined && collaborationRates.reelFrom !== "") query['collaborationRates.reel'] = { ...query['collaborationRates.reel'], $gte: Number(collaborationRates.reelFrom) };
      if (collaborationRates.reelTo !== undefined && collaborationRates.reelTo !== "") query['collaborationRates.reel'] = { ...query['collaborationRates.reel'], $lte: Number(collaborationRates.reelTo) };
    }

    const writers = await ContentWriter.find(query);
    res.json({ message: 'Writers filtered successfully', data: writers });
  } catch (error) {
    console.log(error)
    console.error(error);
    res.status(500).json({ error: "Internal server error",data:error });
  }
};
*/

module.exports.getFilteredContentWriters = async (req, res) => {
  const { 
    name, 
    bio, 
    experienceFrom, 
    experienceTo, 
    email, 
    expertise, 
    languages, 
    location,
    languageProficiency,
    industry,
    
    collaborationRates 
  } = req.body;

  try {
    const query = {};

    if (name) query.name = { $regex: new RegExp(name, 'i') };
    if (bio) query.bio = { $regex: new RegExp(bio, 'i') };
    if (experienceFrom !== undefined && experienceFrom !== "") query.experience = { ...query.experience, $gte: Number(experienceFrom) };
    if (experienceTo !== undefined && experienceTo !== "") query.experience = { ...query.experience, $lte: Number(experienceTo) };
    if (email) query.email = { $regex: new RegExp(email, 'i') };

    // Handle expertise filtering with "Add Other"
   /* if (expertise && expertise.length > 0) {
      query.expertise = { 
        $elemMatch: { 
          type: { $in: expertise.map(exp => new RegExp(exp.type || exp.other, 'i')) }
        }
      };
    }*/
    

        /*if (expertise && expertise.length > 0) {
          query.expertise = {
            $elemMatch: {
              $or: expertise.map(exp => {
                const expQuery = {};
                if (exp) {
                  expQuery.type = { $regex: new RegExp(exp, 'i') };
                }
                return expQuery;
              })
            }
          };
        }*/

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
          

    // Handle languages filtering
    if (languages && languages.length > 0) {
      query.languages = {
        $elemMatch: {
          $and: languages.map(lang => {
            const langQuery = {};
            if (lang.name) {
              langQuery.name = { $regex: new RegExp(lang.name, 'i') };
            }
            if (lang.proficiency) {
              langQuery.proficiency = { $regex: new RegExp(lang.proficiency, 'i') };
            }
            return langQuery;
          })
        }
      };
    }

    // Handle languageProficiency filtering
    if (languageProficiency) {
      query.languages = {
        $elemMatch: { 
          proficiency: { $regex: new RegExp(languageProficiency, 'i') }
        }
      };
    }

    if (location) query.location = location;

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
  
   
     /* if (industry && industry.some(ind => ind.type || ind.other || (ind.subCategories && ind.subCategories.some(sub => sub.type || sub.other)))) {
        query.industry = {
          $elemMatch: {
            $and: [
              { type: { $regex: new RegExp(industry.type || industry.other, 'i') } },
              { 'subCategories.type': { $regex: new RegExp(industry.subCategories?.map(sub => sub.type || sub.other).join('|'), 'i') } }
            ]
          }
        };
      }*/

   
   

    // Handle collaborationRates filtering
    if (collaborationRates) {
      if (collaborationRates.postFrom !== undefined && collaborationRates.postFrom !== "") query['collaborationRates.post'] = { ...query['collaborationRates.post'], $gte: Number(collaborationRates.postFrom) };
      if (collaborationRates.postTo !== undefined && collaborationRates.postTo !== "") query['collaborationRates.post'] = { ...query['collaborationRates.post'], $lte: Number(collaborationRates.postTo) };
      if (collaborationRates.storyFrom !== undefined && collaborationRates.storyFrom !== "") query['collaborationRates.story'] = { ...query['collaborationRates.story'], $gte: Number(collaborationRates.storyFrom) };
      if (collaborationRates.storyTo !== undefined && collaborationRates.storyTo !== "") query['collaborationRates.story'] = { ...query['collaborationRates.story'], $lte: Number(collaborationRates.storyTo) };
      if (collaborationRates.reelFrom !== undefined && collaborationRates.reelFrom !== "") query['collaborationRates.reel'] = { ...query['collaborationRates.reel'], $gte: Number(collaborationRates.reelFrom) };
      if (collaborationRates.reelTo !== undefined && collaborationRates.reelTo !== "") query['collaborationRates.reel'] = { ...query['collaborationRates.reel'], $lte: Number(collaborationRates.reelTo) };
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
