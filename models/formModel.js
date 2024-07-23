//import mongoose from "mongoose";
const mongoose = require('mongoose');

const formDataSchema = new mongoose.Schema({
  mozDA: { type: Number, min: 1 },
  categories: { type: String },
  websiteLanguage: { type: String },
  ahrefsDR: { type: Number, min: 1 },
  linkType: { type: String },
  price: { type: Number, min: 1 },
  monthlyTraffic: { type: String },
  mozSpamScore: { type: String },
  DAto: { type: Number, min: 1, max: 100 },
  DRto: { type: Number, min: 1, max: 100 },
  priceTo: { type: Number, min: 1, max: 100000 },
  userId:{ type: mongoose.Schema.Types.ObjectId },

    // url: { type: String },
  // serviceType: { type: String },
  // siteWorkedWith: { type: String },
  // publisherRole: { type: String },
  // maxLinkAllow: { type: String },
  // markedAsSponsored: { type: String },
},{ timestamps: true });

const formData = mongoose.model("FormData", formDataSchema);

//export default formData;
module.exports = formData;
