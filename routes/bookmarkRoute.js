const express=require("express")
const router=express.Router()

const {getallbookmarks,getbookmarkbyid,updatebookmark,deletebookmark}=require("../controllers/bookmarkControllers")

router.get("/getallbookmarks",getallbookmarks)
router.get("/getbookmarkbyid",getbookmarkbyid)
router.get("/updatebookmark",updatebookmark)
router.get("/deletebookmark",deletebookmark)
module.exports=router