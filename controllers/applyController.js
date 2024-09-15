const express = require('express');

const Apply = require('../models/applyModel'); 
const xlsx = require('node-xlsx');
const fs = require('fs');
const Activity = require('../models/activity.js');



module.exports.applyForm= async (req, res) => {
  const { userId,publisher, name, email, phone, section } = req.body;

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
    userId,publisher,
    name,
    email,
    phone,
    section,
  });

  try {
    await newApplication.save();
    res.status(201).json({message:"Application applied Succesfully",data:newApplication});
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



// Generate a daily report

/* actual module.exports.getDailyReports = async (req, res) => {
  try {
    const { date } = req.query; // Get date from query parameters
    const startDate = new Date(date);
    const endDate = new Date(date);
    //const endDate = new Date(startDate);
   // endDate.setDate(startDate.getDate() + 1); // Set end date to the start date of the next day
    endDate.setDate(startDate.getDate() );

    const reports = await Apply.find({
      createdAt: { $gte: startDate, $lt: endDate }
    });

    res.json(reports);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get daily reports' });
  }
};*/

/*module.exports.getDailyReports = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const reports = await Apply.find({ createdAt: { $gte: today } });
    res.json(reports);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get daily reports' });
  }
};*/
// src/controllers/applyController.js

module.exports.getDailyReports = async (req, res) => {
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
    const reports = await Apply.find(dateFilters);
    
    res.status(200).json(reports);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get all application data' });
  }
};





module.exports.getDailyReports1 = async (req, res) => {
  try {
    const { date } = req.query; // Get date from query parameters

    // Parse the date
    const startDate = new Date(date);
    
    // Set the start date to the beginning of the day (00:00:00)
    startDate.setHours(0, 0, 0, 0);
    
    // Set the end date to the end of the day (23:59:59)
    const endDate = new Date(startDate);
    endDate.setHours(23, 59, 59, 999);

    // Find reports within the given date range
    const reports = await Apply.find({
      createdAt: { $gte: startDate, $lte: endDate }
    });

    res.json(reports);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get daily reports' });
  }
};

// Generate detailed report
module.exports.generateReport = async (req, res) => {
  try {
    const reports = await Apply.find();
    const data = reports.map(report => ({
      'User ID': report.userId,
      'Publisher': report.publisher,
      'Name': report.name,
      'Email': report.email,
      'Phone': report.phone,
      'Section': report.section,
      'Status': report.status,
      'Created At': report.createdAt,
    }));

    const buffer = xlsx.build([{ name: 'Reports', data: [Object.keys(data[0]), ...data.map(Object.values)] }]);
    fs.writeFileSync('report.xlsx', buffer);
    
    res.download('report.xlsx', 'report.xlsx');
  } catch (error) {
    res.status(500).json({ error: 'Failed to generate report' });
  }
};

// Import data from an Excel file
module.exports.importData = async (req, res) => {
  try {
    const file = req.file.buffer;
    const workbook = xlsx.parse(file);
    const data = workbook[0].data;

    // Process data and import it
    // ...

    res.status(200).json({ message: 'Data imported successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to import data' });
  }
};

// Export data to an Excel file
module.exports.exportData = async (req, res) => {
  try {
    const reports = await Apply.find();
    const data = reports.map(report => ({
      'User ID': report.userId,
      'Publisher': report.publisher,
      'Name': report.name,
      'Email': report.email,
      'Phone': report.phone,
      'Section': report.section,
      'Status': report.status,
      'Created At': report.createdAt,
    }));

    const buffer = xlsx.build([{ name: 'Data Export', data: [Object.keys(data[0]), ...data.map(Object.values)] }]);
    fs.writeFileSync('data_export.xlsx', buffer);
    
    res.download('data_export.xlsx', 'data_export.xlsx');
  } catch (error) {
    res.status(500).json({ error: 'Failed to export data' });
  }
};




