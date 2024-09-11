const mongoose = require('mongoose');

const instagramInfluencerSchema = new mongoose.Schema({
  username: { type: String, required: true },
  fullName: { type: String },
  profilePicture: { type: String },
  bio: { type: String },
  followersCount: { type: Number, default: 0 },
  followingCount: { type: Number, default: 0 },
  postsCount: { type: Number, default: 0 },
  engagementRate: { type: Number, default: 0 },
  averageLikes: { type: Number, default: 0 },
  averageComments: { type: Number, default: 0 },
  category: { type: String },
  location: { type: String },
  language: { type: String },
  verifiedStatus: { type: Boolean, default: false },
  collaborationRates: {
    post: { type: Number },
    story: { type: Number },
    reel: { type: Number }
  },
  pastCollaborations: { type: Array, default: [] },
  mediaKit: { type: String },
  isBookmarked:{ type: Boolean, default: false },
  userId:{ type: mongoose.Schema.Types.ObjectId },
  
},{ timestamps: true });

module.exports = mongoose.model('InstagramInfluencer', instagramInfluencerSchema);
