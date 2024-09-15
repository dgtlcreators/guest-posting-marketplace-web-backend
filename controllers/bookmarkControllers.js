

const Bookmark = require("../models/bookmarkModal.js");
//const Bookmark = require('../models/bookmarkModal'); // Update the path if necessary
const YoutubeInfluencer = require('../models/youtubeInfluencerModel.js');
const InstagramInfluencer = require('../models/instagramInfluencerModel.js');
const ContentWriter = require('../models/contentWriterModel.js');
const AdminData = require('../models/adminModel.js');

module.exports.getallbookmarks = async (req, res) => {
    try {
      
        const bookmarks = await Bookmark.find({})
       
       
        console.log("Bookmarks:", bookmarks);


        const youtubeInfluencers = bookmarks.flatMap(b => b.youtubeInfluencers).filter(influencer => influencer.isBookmarked);
        const instagramInfluencers = bookmarks.flatMap(b => b.instagramInfluencers).filter(influencer => influencer.isBookmarked);
        const contentWriters = bookmarks.flatMap(b => b.contentWriters).filter(contentWriter => contentWriter.isBookmarked);
        const guestposts = bookmarks.flatMap(b => b.guestposts).filter(guestpost => guestpost.isBookmarked);

      
        console.log("Filtered YouTube Influencers:", youtubeInfluencers);
        console.log("Filtered Instagram Influencers:", instagramInfluencers);
        console.log("Filtered Content Writers:", contentWriters);
        console.log("Filtered Guest Posts:", guestposts);

        const data = { youtubeInfluencers, instagramInfluencers, contentWriters, guestposts };
        res.status(200).json({ message: "Get All Bookmarks successfully", data });
        
    } catch (error) {
        console.error('Error:', error); 
        res.status(500).json({ message: "Failed to Get All Bookmarks", error });
    }
};


module.exports.getallbookmarks1=async(req,res)=>{
    try {
        const bookmarks1 = await Bookmark.find({})
    .populate('youtubeInfluencers');

console.log("Populated YouTube Influencers:", bookmarks1.map(b => b.youtubeInfluencers));

const instagramBookmarks = await Bookmark.find({})
    .populate('instagramInfluencers');

console.log("Populated Instagram Influencers:", instagramBookmarks.map(b => b.instagramInfluencers));

        const bookmarks = await Bookmark.find({})
            .populate('youtubeInfluencers', 'username fullname profilePicture bio followersCount videosCount engagementRate averageViews category location language collaborationRates pastCollaborations audienceDemographics mediaKit isBookmarked userId') 
            .populate('instagramInfluencers', 'username fullName profilePicture bio followersCount followingCount postsCount engagementRate averageLikes averageComments category location language verifiedStatus collaborationRates pastCollaborations mediaKit isBookmarked userId')
            .populate('contentWriters', 'name bio experience expertise languages location collaborationRates email industry isBookmarked userId')
            .populate('guestposts', 'publisherURL publisherName publisherPhoneNo mozDA categories websiteLanguage ahrefsDR linkType price monthlyTraffic mozSpamScore isBookmarked userId');  
           
            console.log("Bookmarks:", bookmarks);
            const youtubeInfluencers1 = bookmarks.flatMap(b => b.youtubeInfluencers)
            console.log(youtubeInfluencers1)
        
        const youtubeInfluencers = bookmarks.flatMap(b => b.youtubeInfluencers).filter(influencer => influencer.isBookmarked);
        const instagramInfluencers = bookmarks.flatMap(b => b.instagramInfluencers).filter(influencer => influencer.isBookmarked);
        const contentWriters = bookmarks.flatMap(b => b.contentWriters).filter(contentWriter => contentWriter.isBookmarked);
        const guestposts = bookmarks.flatMap(b => b.guestposts).filter(guestpost => guestpost.isBookmarked);
  const data={youtubeInfluencers,instagramInfluencers,contentWriters,guestposts}
        res.status(200).json({ message: "Get All Bookmarks successfully" ,data});
        
    } catch (error) {
        res.status(500).json({ message: "Failed to Get All Bookmark" ,error});
    }
}

module.exports.getbookmarkbyid=async(req,res)=>{
    try {

        res.status(200).json({ message: "Get All Bookmarks successfully" });
        
    } catch (error) {
        res.status(500).json({ message: "Failed to Get All Bookmark" ,error});
    }
}

module.exports.updatebookmark=async(req,res)=>{
    try {

        res.status(200).json({ message: "Get All Bookmarks successfully" });
        
    } catch (error) {
        res.status(500).json({ message: "Failed to Get All Bookmark" ,error});
    }
}

module.exports.deletebookmark=async(req,res)=>{
    try {

        res.status(200).json({ message: "Get All Bookmarks successfully" });
        
    } catch (error) {
        res.status(500).json({ message: "Failed to Get All Bookmark" ,error});
    }
}