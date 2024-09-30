
const express=require("express");
const router = express.Router();

const {
    applyAllData,applyData,updateapplydata,deleteapplydata,
    applyForm,generateApplication, importData, exportData, getDailyApplications,getApplyByPublisherId,
} =require("../controllers/applyController.js");

router.get("/applyAllData", applyAllData);
router.get("/applydata/:id", applyData);
router.post("/apply", applyForm);
router.put("/updateapplydata/:id",updateapplydata);
router.delete("/deleteapplydata/:id",deleteapplydata);
router.get("/getApplyByPublisherId/:id",getApplyByPublisherId);



router.get('/getDailyApplications', getDailyApplications);
router.get('/generateApplication', generateApplication);
router.post('/importData', importData);
router.get('/exportData', exportData);

module.exports=router;