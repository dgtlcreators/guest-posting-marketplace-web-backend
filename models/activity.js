const mongoose = require('mongoose');
const InstagramInfluencer = require('./instagramInfluencerModel');
const YouTubeInfluencer = require('./youtubeInfluencerModel');
const ContentWriter = require('./contentWriterModel');
const GuestPost = require('./adminModel');
const Apply = require('./applyModel');

const activitySchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,  
        ref: 'User',  
    },
    user: {
        type: new mongoose.Schema({  
            name: {
                type: String,
                required: true,
                trim: true,
            },
            email: {
                type: String,
                required: true,
            },
            role: {
                type: String,
                enum: ["Admin", "User", "Super Admin", 'Brand User'],
                required: true,
            },
        }),
        required: true,
    },
    action: {
        type: String,
        required: true,
    },
    section: {
        type: String,
        enum: ['Instagram Influencer', 'YouTube Influencer', 'Content Writer', 'Guest Post', 'Apply',"Super Admin","User"],
        required: true,
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },
    details: {
        type: mongoose.Schema.Types.Mixed,
    },
    instagramInfluencer: {
        type: InstagramInfluencer.schema, 
       /// required: function() { return this.section === 'Instagram Influencer'; },
    },
    youtubeInfluencer: {
        type: YouTubeInfluencer.schema, 
        //required: function() { return this.section === 'YouTube Influencer'; },
    },
    contentWriter: {
        type: ContentWriter.schema, 
       // required: function() { return this.section === 'Content Writer'; },
    },
    guestPost: {
        type: GuestPost.schema,
        //required: function() { return this.section === 'Guest Post'; },
    },
    apply: {
        type: Apply.schema,
        //required: function() { return this.section === 'Apply'; },
    },
    isBookmarked:{ type: Boolean, default: false }
}, { timestamps: true });


module.exports= mongoose.model('Activity', activitySchema);


/*const mongoose = require('mongoose');
/*const InstagramInfluencer = require('./instagramInfluencerModel');
const YouTubeInfluencer = require('./youtubeInfluencerModel');
const ContentWriter = require('./contentWriterModel');
const GuestPost = require('./adminModel');
const Apply = require('./applyModel');

const activitySchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        
        
    },
    userName: {
        type: String,
       
    },
    action: {
        type: String,
       
    },
    section: {
        type: String,
        enum: ['Instagram Influencer', 'YouTube Influencer', 'Content Writer', 'Guest Post','Apply'],
        
    },
    role: {
        type: String,
        enum:  ["Admin", "User", "Super Admin",'Brand User'],
        
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },
    details: {
        type: mongoose.Schema.Types.Mixed, 
    },
    /*instagramInfluencer: {
        type: InstagramInfluencer.schema, 
       /// required: function() { return this.section === 'Instagram Influencer'; },
    },
    youtubeInfluencer: {
        type: YouTubeInfluencer.schema, 
        //required: function() { return this.section === 'YouTube Influencer'; },
    },
    contentWriter: {
        type: ContentWriter.schema, 
       // required: function() { return this.section === 'Content Writer'; },
    },
    guestPost: {
        type: GuestPost.schema,
        //required: function() { return this.section === 'Guest Post'; },
    },
    apply: {
        type: Apply.schema,
        //required: function() { return this.section === 'Apply'; },
    },
},{ timestamps: true });

module.exports= mongoose.model('Activity', activitySchema);*/


