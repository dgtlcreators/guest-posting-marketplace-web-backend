const mongoose=require("mongoose")
const Schema=mongoose.Schema;

const YoutubeInfluencerSchema=new mongoose.Schema({
    username:{type:String},
    fullname:{type:String},
    profilePicture:{type:String},
    bio:{type:String},
    followersCount:{type:Number,default:0},
    videosCount:{type:Number,default:0},
    engagementRate:{type:Number,default:0},
    averageViews:{type:Number,default:0},
    category:{type:String},
    location: {
        country: { type: String },
        state: { type: String },
        city: { type: String },
    },
    verifiedStatus: { type: Boolean, required: true, default: false },
    language:{type:String},
    collaborationRates:{
        sponsoredVideos:{type:Number,default:0},
        productReviews:{type:Number,default:0},
        shoutouts:{type:Number,default:0}
    },
    pastCollaborations:{type:Array,default:[]},
    audienceDemographics:{
        age:{type:[String]},
        gender:{type:[String]},
        geographicDistribution:{type:[String]},
    },
    mediaKit:{type:String},
    isBookmarked:{ type: Boolean, default: false },
    userId:{ type: mongoose.Schema.Types.ObjectId },
},{timestamps:true})



module.exports=mongoose.model("YoutubeInfluencer",YoutubeInfluencerSchema)