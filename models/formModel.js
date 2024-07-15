import mongoose from "mongoose";

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
    // url: { type: String },
  // serviceType: { type: String },
  // siteWorkedWith: { type: String },
  // publisherRole: { type: String },
  // maxLinkAllow: { type: String },
  // markedAsSponsored: { type: String },
});

const formData = mongoose.model("FormData", formDataSchema);

export default formData;
