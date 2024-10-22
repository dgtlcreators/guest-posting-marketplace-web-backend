const Report = require('../models/reportModel.js'); 



// Get all reports
exports.getallreports = async (req, res) => {
  try {
    const reports = await Report.find();
    res.status(200).json({ success: true, data: reports });
  } catch (error) {
    console.error('Error fetching reports:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Get a report by ID
exports.getreportbyid = async (req, res) => {
  try {
    const report = await Report.findById(req.params.id);
    if (!report) {
      return res.status(404).json({ success: false, message: 'Report not found' });
    }
    res.status(200).json({ success: true, data: report });
  } catch (error) {
    console.error('Error fetching report:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};


exports.createreport = async (req, res) => {
//  console.log("Incoming report data:", req.body); 

  const { userId, publisherId, section, reportType, reason, details } = req.body;

  if (!userId || !publisherId || !section || !reportType || !reason) {
      return res.status(400).json({ success: false, message: 'Please provide all required fields.' });
  }

  try {
      const newReport = new Report({
          userId,
          publisherId,
          section,
          reportType,
          reason,
          details,
      });

      await newReport.save();
      res.status(201).json({ success: true, data: newReport });
  } catch (error) {
      console.error('Error creating report:', error);
      res.status(500).json({ success: false, message: 'Server error' });
  }
};


// Update a report
exports.updatereport = async (req, res) => {
  try {
    const report = await Report.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

    if (!report) {
      return res.status(404).json({ success: false, message: 'Report not found' });
    }

    res.status(200).json({ success: true, data: report });
  } catch (error) {
    console.error('Error updating report:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Delete a report
exports.deletereport = async (req, res) => {
  try {
    const report = await Report.findByIdAndDelete(req.params.id);

    if (!report) {
      return res.status(404).json({ success: false, message: 'Report not found' });
    }

    res.status(200).json({ success: true, message: 'Report deleted successfully' });
  } catch (error) {
    console.error('Error deleting report:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};


module.exports.getDailyReports = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    
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
  
//console.log("Date Filters:", dateFilters);
    const applications = await Report.find(dateFilters);
    //console.log(applications)
    
    res.status(200).json({message:"Getting report data",data:applications});
  } catch (error) {
    res.status(500).json({ error: 'Failed to get all application data' });
  }
};

module.exports.checkReport=async (req, res) => {
  const { userId, publisherId } = req.query;
  const report = await Report.findOne({ userId, publisherId });
  res.json({ hasReported: !!report });
}