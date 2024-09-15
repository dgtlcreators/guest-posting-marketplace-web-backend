const mongoose = require('mongoose');

const BookmarkSchema=new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId },
    youtubeInfluencers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'YoutubeInfluencer' }],
    instagramInfluencers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'InstagramInfluencer' }],
    guestposts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'AdminData' }],
    contentWriters: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ContentWriter' }],
    createdAt: { type: Date, default: Date.now },
},{timestamps:true})

module.exports =mongoose.model('Bookmark', BookmarkSchema);