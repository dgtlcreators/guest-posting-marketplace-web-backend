const mongoose=require("mongoose");

const adminFormDataSchema = new mongoose.Schema({
  publisherURL: {
    type: String,
    match: [
      /^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/,
      "Please fill a valid URL",
    ],
  },
  publisherName: { type: String, trim: true },
  publisherEmail: {
    type: String,
    match: [/.+\@.+\..+/, "Please fill a valid email address"],
  },
  publisherPhoneNo: { type: Number },
  mozDA: { type: Number, min: 1, max: 100 },
  categories: { type: String },
  websiteLanguage: { type: String },
  ahrefsDR: { type: Number, min: 1, max: 100 },
  linkType: { type: String, enum: ["Do Follow", "No Follow"] },
  price: { type: Number, min: 1, max: 100000 },
  monthlyTraffic: { type: String },
  mozSpamScore: { type: String },
  isBookmarked:{ type: Boolean, default: false },
  verifiedStatus: { type: Boolean, default: false },
  userId:{ type: mongoose.Schema.Types.ObjectId },
},{ timestamps: true });

module.exports=mongoose.model("AdminData", adminFormDataSchema);