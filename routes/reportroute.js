
const express=require("express");
const router = express.Router();

const {
    getallreports,getreportbyid,createreport,updatereport,deletereport
} =require("../controllers/reportController.js");

router.get("/getallreports",getallreports)
router.get("/getreportbyid/:id",getreportbyid)
router.post("/createreport",createreport)
router.put("/updatereport/:id",updatereport)
router.delete("/deletereport/:id",deletereport)

module.exports=router;