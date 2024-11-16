const AdminData =require("../models/adminModel.js");
const Activity = require('../models/activity.js');

module.exports.getAdminData = async (req, res) => {
  try {
    const userData = await AdminData.find();
    if (!userData) {
      return res.status(404).json({ msg: "Admin data not found" });
    }
    res.status(200).json(userData);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

module.exports.createAdminData = async (req, res) => {
  try {

    const {
      publisherURL,
      publisherName,
      publisherEmail,
      publisherPhoneNo,
      mozDA,
      categories,
      websiteLanguage,
      ahrefsDR,
      linkType,
      price,
      monthlyTraffic,
      mozSpamScore,
      userId, 
    } = req.body;


    const newAdminData = new AdminData({
      publisherURL,
      publisherName,
      publisherEmail,
      publisherPhoneNo,
      mozDA,
      categories,
      websiteLanguage,
      ahrefsDR,
      linkType,
      price,
      monthlyTraffic,
      mozSpamScore,
      userId, 
    });


    const savedData = await newAdminData.save();

    res.status(200).json(savedData);
  } catch (error) {
    console.error("Error creating admin data:", error);
    res.status(500).json({ error: "Error creating admin data" });
  }
};
