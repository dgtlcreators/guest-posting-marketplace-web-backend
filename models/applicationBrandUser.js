const mongoose = require('mongoose');

const applicationBrandUserSchema = new mongoose.Schema({
  brandName: String,
  contactPerson: String,
  emailId: String,
  phoneNumber: String,
  campaignDetails: String,
  preferredCollaborationType: String,
  budget: String,
  additionalNotes: String,
  influencerId:String,
  isBookmarked:{ type: Boolean, default: false },
  userId:{ type: mongoose.Schema.Types.ObjectId },
},{ timestamps: true });

module.exports = mongoose.model('ApplicationBrandUser', applicationBrandUserSchema);
