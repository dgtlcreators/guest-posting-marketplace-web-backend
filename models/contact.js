// models/contact.js
const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  publisherId: { type: mongoose.Schema.Types.ObjectId, ref: "Publisher" }, // Reference to Publisher model
  createdAt: { type: Date, default: Date.now },
});

const Contact = mongoose.model("Contact", contactSchema);

module.exports = Contact;
