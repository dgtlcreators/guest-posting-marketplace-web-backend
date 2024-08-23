const mongoose = require('mongoose');

const ApplySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true },
  publisher: { type: mongoose.Schema.Types.ObjectId},
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  section: { type: String, required: true }, 
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  createdAt: { type: Date, default: Date.now },
},{timestamps:true});

const Apply = mongoose.model('Apply', ApplySchema);

module.exports = Apply;
