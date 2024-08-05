
const Contact = require("../models/contactModal.js");

const ContentWriter = require('../models/contentWriterModel.js');

module.exports.getAllContentWriters = async (req, res) => {
  try {
    const writers = await ContentWriter.find();
    res.json({ message: 'Writer data fetch successfully',data:writers});
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



module.exports.createContentWriter = async (req, res) => {
  const { name, bio, experience, expertise, languages, collaborationRates, email } = req.body;
  try {
    const newWriter = new ContentWriter({ name, bio, experience, expertise, languages, collaborationRates, email });
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
    const { name, bio, experience, expertise, languages, collaborationRates, email } = req.body;
    try {
      let writer = await ContentWriter.findById(req.params.id);
      if (!writer) return res.status(404).json({ message: 'Writer not found' });
  
      writer.name = name || writer.name;
      writer.bio = bio || writer.bio;
      writer.experience = experience || writer.experience;
      writer.expertise = expertise || writer.expertise;
      writer.languages = languages || writer.languages;
      writer.collaborationRates = collaborationRates || writer.collaborationRates;
      writer.email = email || writer.email;
  
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
