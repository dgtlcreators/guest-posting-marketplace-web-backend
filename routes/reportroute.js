
const express=require("express");
const router = express.Router();

const {
    getallreports,getreportbyid,createreport,updatereport,deletereport,getDailyReports,checkReport
} =require("../controllers/reportController.js");

router.get("/getallreports",getallreports)
router.get("/getreportbyid/:id",getreportbyid)
router.post("/createreport",createreport)
router.put("/updatereport/:id",updatereport)
router.delete("/deletereport/:id",deletereport)
router.get("/getDailyReports",getDailyReports)
router.get('/checkReport', checkReport);


module.exports=router;