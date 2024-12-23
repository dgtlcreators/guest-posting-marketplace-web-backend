// import formData from "../models/form.model.js";
const AdminData=require("../models/adminModel");
const Activity = require('../models/activity.js');

module.exports.submitForm = async (req, res) => {
  try {
    const data = new AdminData(req.body);
   // console.log(data);
    await data.save();
    res.status(201).json({ message: "Form data saved successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.getData = async (req, res) => {
  try {
    const response = await AdminData.find({});
    response.forEach(doc => {
      if (doc.isBuyed === undefined) {
        doc.isBuyed = false; 
      }
    });
    res
      .status(200)
      .json({ message: "Form data fetched successfully", data: response });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

module.exports.getRequest = async (req, res) => {
  try {
    const {
      mozDA,
      categories,
      websiteLanguage,
      ahrefsDR,
      linkType,
      price,
      monthlyTraffic,
      mozSpamScore,
      isBuyed,
      userId
    } = req.body;

    // Construct the query object
    let query = {};

    if (mozDA) query.mozDA = { $gte: Number(mozDA) };
    if (categories) query.categories = categories;
    if (websiteLanguage) query.websiteLanguage = websiteLanguage;
    if (ahrefsDR) query.ahrefsDR = { $gte: Number(ahrefsDR) };
    if (linkType) query.linkType = linkType;
    if (price) query.price = { $gte: Number(price) };
    if (monthlyTraffic) query.monthlyTraffic = monthlyTraffic;
    if (mozSpamScore) query.mozSpamScore = mozSpamScore;
    if (isBuyed) query.isBuyed = isBuyed;
    if(userId) query.userId=userId;
    // if (toDA) query.toDA = { $lte: Number(toDA) };
    // if (toDR) query.toDR = { $lte: Number(toDR) };
    // if (toPrice) query.toPrice = { $lte: Number(toPrice) };
    // if (maxLinkAllow) query.maxLinkAllow = maxLinkAllow;
    // if (markedAsSponsored) query.markedAsSponsored = markedAsSponsored;
    // if (serviceType) query.serviceType = serviceType;
    // if (siteWorkedWith) query.siteWorkedWith = siteWorkedWith;
    // if (publisherRole) query.publisherRole = publisherRole;

    // Fetch the filtered data
    const response = await AdminData.find(query);

    res.status(200).json({
      message: "Form data fetched based on query successfully",
      data: response,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

// export const getRequest = async (req, res) => {
//   try {
//     const {
//       mozDA,
//       DAto,
//       categories,
//       websiteLanguage,
//       ahrefsDR,
//       DRto,
//       linkType,
//       price,
//       priceTo,
//       monthlyTraffic,
//       mozSpamScore,
//     } = req.body;

//     const filter = {};

//     // Construct filter based on conditions
//     if (mozDA && DAto)
//       filter.mozDA = { $gte: parseInt(mozDA), $lte: parseInt(DAto) };
//     if (ahrefsDR && DRto)
//       filter.ahrefsDR = { $gte: parseInt(ahrefsDR), $lte: parseInt(DRto) };
//     if (price && priceTo)
//       filter.price = { $gte: parseInt(price), $lte: parseInt(priceTo) };
//     if (categories && categories !== "allCategories")
//       filter.categories = categories;
//     if (websiteLanguage && websiteLanguage !== "allLanguage")
//       filter.websiteLanguage = websiteLanguage;
//     if (linkType && linkType !== "All") filter.linkType = linkType;
//     if (monthlyTraffic && monthlyTraffic !== "allMonthlyTraffic")
//       filter.monthlyTraffic = { $gte: parseInt(monthlyTraffic.split(" ")[2]) };
//     if (mozSpamScore && mozSpamScore !== "allMozSpamScore")
//       filter.mozSpamScore = { $lte: parseInt(mozSpamScore.split(" ")[2]) };

//     // Query the database with the constructed filter
//     const data = await formData.find(filter);

//     res.status(200).json(data);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server error" });
//   }
// };

module.exports.getFilteredData = async (req, res) => {
  try {
    const {
      mozDA,
      categories,
      verifiedStatus,
      websiteLanguage,
      ahrefsDR,
      linkType,
      price,
      monthlyTraffic,
      mozSpamScore,
      DAto,
      DRto,
      priceTo,
      publisherURL,userId,publisherName
    } = req.body;
    //console.log("request body",req.body)

    const filter = {};

    // Construct filter based on conditions
    if (mozDA && DAto)
      filter.mozDA = { $gte: parseInt(mozDA), $lte: parseInt(DAto) };
    if (categories && categories !== "allCategories")
      filter.categories = categories;
    if (websiteLanguage && websiteLanguage !== "allLanguage")
      filter.websiteLanguage = websiteLanguage;
    if (ahrefsDR && DRto)
      filter.ahrefsDR = { $gte: parseInt(ahrefsDR), $lte: parseInt(DRto) };
    if (linkType && linkType !== "All") filter.linkType = linkType;
    if (price && priceTo)
      filter.price = { $gte: parseInt(price), $lte: parseInt(priceTo) };
    if (monthlyTraffic && monthlyTraffic !== "allMonthlyTraffic")
      filter.monthlyTraffic = monthlyTraffic;
    if (mozSpamScore && mozSpamScore !== "allMozSpamScore")
      filter.mozSpamScore = mozSpamScore;

    if (verifiedStatus !== undefined && verifiedStatus !== "") filter.verifiedStatus = verifiedStatus;

     if (publisherURL)
       filter.publisherURL = publisherURL;
     if (publisherName)
      filter.publisherName =publisherName;
    // if(userId) filter.userId=userId
    // Query the database with the constructed filter
    const allusers=await AdminData.find();
   // console.log("All Users",allusers)

    const users = await AdminData.find(filter);
  

    // Check each filter condition sequentially
    if (!users.length) {
      if (
        categories &&
        categories !== "allCategories" &&
        monthlyTraffic &&
        monthlyTraffic !== "allMonthlyTraffic" &&
        websiteLanguage &&
        websiteLanguage !== "allLanguage" &&
        linkType &&
        linkType !== "allLinkType" &&
        mozSpamScore &&
        mozSpamScore !== "allMozSpamScore" &&
        publisherURL
      ) {
        const categoryFilter = { categories };
        const monthlyTrafficFilter = { monthlyTraffic };
        const languageFilter = { websiteLanguage };
        const linkTypeFilter = { linkType };
        const mozSpamScoreFilter = { mozSpamScore };
        const data = await AdminData.find({
          categoryFilter,
          monthlyTrafficFilter,
          languageFilter,
          linkTypeFilter,
          mozSpamScoreFilter,
          publisherURL,userId
        });
       // console.log(data)
        if (data.length) return res.json(data);
      }
    }
    /*const activity = new Activity({
      userId: req.user?._id,
      action: 'Get Guest Post Filtered List',
      section: 'Guest Post',
      role: req.user.role,
      details: {
          influencerId: filter,
          influencerName: users.length,
      }
  });
  await activity.save();*/
  
    //console.log(users,users.length)
 
    // If no conditions match, return the initial filtered users or empty array
    res.json(users.length ? users : []);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
