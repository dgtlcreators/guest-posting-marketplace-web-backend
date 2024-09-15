
const express=require("express");
const router = express.Router();

const {
    getallsavefilter,getsavefilterbyid,createsavefilter,updatesavefilter,deletesavefilter
} =require("../controllers/savefilterController.js");

router.get("/getallsavefilter",getallsavefilter)
router.get("/getsavefilterbyid/:id",getsavefilterbyid)
router.post("/createsavefilter",createsavefilter)
router.put("/updatesavefilter/:id",updatesavefilter)
router.delete("/deletesavefilter/:id",deletesavefilter)

module.exports=router;