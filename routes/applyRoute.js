
const express=require("express");
const router = express.Router();

const {
    applyAllData,applyData,updateapplydata,deleteapplydata,
    applyForm,generateReport, importData, exportData, getDailyReports,getApplyByPublisherId
} =require("../controllers/applyController.js");

router.get("/applyAllData", applyAllData);
router.get("/applydata/:id", applyData);
router.post("/apply", applyForm);
router.put("/updateapplydata/:id",updateapplydata);
router.delete("/deleteapplydata/:id",deleteapplydata);
router.get("/getApplyByPublisherId/:id",getApplyByPublisherId);



router.get('/getDailyReports', getDailyReports);
router.get('/generateReport', generateReport);
router.post('/importData', importData);
router.get('/exportData', exportData);

module.exports=router;