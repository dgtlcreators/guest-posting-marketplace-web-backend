const express = require('express');

const Apply = require('../models/applyModel'); 
const xlsx = require('node-xlsx');
const fs = require('fs');
const Activity = require('../models/activity.js');



module.exports.applyForm= async (req, res) => {
  const { userId,publisher, name, email, phone, section ,publisherId} = req.body;

  const today = new Date().toISOString().split('T')[0]; 
  const applicationsToday = await Apply.countDocuments({
    userId,
    //publisher,
   // section,
    createdAt: { $gte: new Date(today) },
  });

  if (applicationsToday >= 2) {
    return res.status(400).json({ error: 'You have reached the application limit for today.' });
  }

  const newApplication = new Apply({
    userId,publisher,publisherId,
    name,
    email,
    phone,
    section,
  });

  try {
    await newApplication.save();
    res.status(201).json({message:`Application applied Succesfully.you have applied ${applicationsToday}`,data:newApplication});
  } catch (error) {
    res.status(500).json({ error: 'Failed to submit application.' });
  }
};

module.exports.applyAllData = async (req, res) => {
  try {
    const applications = await Apply.find(); 
    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch application data", error });
  }
};

module.exports.updateapplydata=async(req,res)=>{
  try {
    const application = await Apply.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }
    res.status(200).json({message:"Apply updated successfullly",data:application})
  } catch (error) {
    res.status(500).json({message:"Failed to update apply data"})
  }
}

module.exports.deleteapplydata=async(req,res)=>{
  try {
    const application = await Apply.findByIdAndDelete(req.params.id)
    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }
    res.status(200).json({message:"Apply deleted successfullly",data:application})
  } catch (error) {
    res.status(500).json({message:"Failed to delete apply data"})
  }
}

module.exports.getApplyByPublisherId = async (req, res) => {
  try {
    const publisherId = req.params.id//publisherId;
    const applyData = await Apply.find({ publisherId });
    
   // if (!applyData.length) {
      // res.status(404).json({ msg: "No apply data found for this publisher" });
//}
    res.status(200).json({message:"Show apply data successfully",data:applyData});
  } catch (error) {
    console.error("Error fetching apply data:", error);
    res.status(500).json({ error: "Error fetching apply data" });
  }
};




module.exports.applyData = async (req, res) => {
  try {
    const { id } = req.params;
    const application = await Apply.findById(id); 

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    res.status(200).json(application);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch application data", error });
  }
};



// Generate a daily Application

/* actual module.exports.getDailyApplications = async (req, res) => {
  try {
    const { date } = req.query; // Get date from query parameters
    const startDate = new Date(date);
    const endDate = new Date(date);
    //const endDate = new Date(startDate);
   // endDate.setDate(startDate.getDate() + 1); // Set end date to the start date of the next day
    endDate.setDate(startDate.getDate() );

    const applications = await Apply.find({
      createdAt: { $gte: startDate, $lt: endDate }
    });

    res.json(applications);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get daily applications' });
  }
};*/

/*module.exports.getDailyApplications = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const applications = await Apply.find({ createdAt: { $gte: today } });
    res.json(applications);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get daily applications' });
  }
};*/
// src/controllers/applyController.js

module.exports.getDailyApplications = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    // Create date range filters if dates are provided
    const dateFilters = {};
    if (startDate) {
      const start = new Date(startDate);
      start.setHours(0, 0, 0, 0);
      dateFilters.createdAt = { $gte: start };
    }
    if (endDate) {
      const end = new Date(endDate);
      end.setHours(23, 59, 59, 999);
      dateFilters.createdAt = { ...dateFilters.createdAt, $lte: end };
    }
//console.log(startDate,endDate,dateFilters)
    // Fetch filtered data
    const applications = await Apply.find(dateFilters);
    
    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get all application data' });
  }
};





module.exports.getDailyApplications1 = async (req, res) => {
  try {
    const { date } = req.query; 
    
    const startDate = new Date(date);
    startDate.setHours(0, 0, 0, 0);
    
    
    const endDate = new Date(startDate);
    endDate.setHours(23, 59, 59, 999);


    const applications = await Apply.find({
      createdAt: { $gte: startDate, $lte: endDate }
    });

    res.json(applications);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get daily applications' });
  }
};


module.exports.generateApplication = async (req, res) => {
  try {
    const applications = await Apply.find();
    const data = applications.map(Application => ({
      'User ID': Application.userId,
      'Publisher': Application.publisher,
      'Name': Application.name,
      'Email': Application.email,
      'Phone': Application.phone,
      'Section': Application.section,
      'Status': Application.status,
      'Created At': Application.createdAt,
    }));

    const buffer = xlsx.build([{ name: 'Applications', data: [Object.keys(data[0]), ...data.map(Object.values)] }]);
    fs.writeFileSync('Application.xlsx', buffer);
    
    res.download('Application.xlsx', 'Application.xlsx');
  } catch (error) {
    res.status(500).json({ error: 'Failed to generate Application' });
  }
};


module.exports.importData = async (req, res) => {
  try {
    const file = req.file.buffer;
    const workbook = xlsx.parse(file);
    const data = workbook[0].data;

    res.status(200).json({ message: 'Data imported successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to import data' });
  }
};


module.exports.exportData = async (req, res) => {
  try {
    const applications = await Apply.find();
    const data = applications.map(Application => ({
      'User ID': Application.userId,
      'Publisher': Application.publisher,
      'Name': Application.name,
      'Email': Application.email,
      'Phone': Application.phone,
      'Section': Application.section,
      'Status': Application.status,
      'Created At': Application.createdAt,
    }));

    const buffer = xlsx.build([{ name: 'Data Export', data: [Object.keys(data[0]), ...data.map(Object.values)] }]);
    fs.writeFileSync('data_export.xlsx', buffer);
    
    res.download('data_export.xlsx', 'data_export.xlsx');
  } catch (error) {
    res.status(500).json({ error: 'Failed to export data' });
  }
};




