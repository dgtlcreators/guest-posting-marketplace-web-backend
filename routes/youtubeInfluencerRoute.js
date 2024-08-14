const express=require("express")
const router=express.Router()
const upload = require("../multer/multerConfig")

const {addYoutubeInfluencer,getAllYoutubeInfluencer,getYoutubeInfluencerById,updateYoutubeInfluencer,deleteYoutubeInfluencer,
    addContactSpecificId,getAllContactData,getContactsByPublisherId,getFilteredYoutubeInfluences
}=require("../controllers/youtubeInfluencerControllers")

router.post("/addYoutubeInfluencer", upload.fields([
    { name: 'profilePicture', maxCount: 1 },
    { name: 'mediaKit', maxCount: 1 }
  ]),addYoutubeInfluencer)
router.get("/getAllYoutubeInfluencer",getAllYoutubeInfluencer)
router.get("/getYoutubeInfluencer/:id",getYoutubeInfluencerById)
router.put("/updateYoutubeInfluencer/:id", upload.fields([
    { name: 'profilePicture', maxCount: 1 },
    { name: 'mediaKit', maxCount: 1 }
  ]),updateYoutubeInfluencer)
router.delete("/deleteYoutubeInfluencer/:id",deleteYoutubeInfluencer)
router.post('/youtubeInfluencesFilter', getFilteredYoutubeInfluences);



router.post("/addContact",addContactSpecificId)
router.get("/getContact",getAllContactData)
router.get("/getContactsByPublisher/:publisherId", getContactsByPublisherId);

module.exports=router