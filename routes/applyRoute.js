
const express=require("express");
const router = express.Router();

const {
    applyAllData,applyData,
    applyForm,generateReport, importData, exportData, getDailyReports
} =require("../controllers/applyController.js");

router.get("/applyAllData", applyAllData);
router.get("/applydata/:id", applyData);
router.post("/apply", applyForm);

router.get('/getDailyReports', getDailyReports);
router.get('/generateReport', generateReport);
router.post('/importData', importData);
router.get('/exportData', exportData);

module.exports=router;