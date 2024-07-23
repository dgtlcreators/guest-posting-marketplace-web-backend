const mongoose = require('mongoose');

const UserInstagramInfluencerSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, enum: ['admin', 'brand'], default: 'brand' }
},{ timestamps: true });

module.exports = mongoose.model('UserInstagramInfluencer',UserInstagramInfluencerSchema);
