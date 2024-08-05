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
  influencerId:String
},{ timestamps: true });

module.exports = mongoose.model('ApplicationBrandUser', applicationBrandUserSchema);
