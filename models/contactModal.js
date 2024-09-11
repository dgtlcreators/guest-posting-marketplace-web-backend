// models/contact.js
const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  
  phone: { type: String, },
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  publisherId: { type: mongoose.Schema.Types.ObjectId, ref: "Publisher" }, 
  userId:{ type: mongoose.Schema.Types.ObjectId },
  createdAt: { type: Date, default: Date.now },
  isBookmarked:{ type: Boolean, default: false },
  userId:{ type: mongoose.Schema.Types.ObjectId },
},{ timestamps: true });

const Contact = mongoose.model("Contact", contactSchema);

module.exports = Contact;
