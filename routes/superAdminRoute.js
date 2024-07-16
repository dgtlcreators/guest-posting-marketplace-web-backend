
const express=require("express");
const router = express.Router();

const {
  getAllAdminData,
  getOneAdminData,
  updateOneAdminData,
  deleteOneAdminData,
  getFilteredAdminData,
  addContactSpecificId,
  getAllContactData,
  getContactsByPublisherId,
 
} =require("../controllers/superAdminController.js");


// route.post("/getRequest", getRequest);

router.get("/getAllAdminData", getAllAdminData);
router.get("/getOneAdminData/:id", getOneAdminData);
router.post("/getFilteredAdminData", getFilteredAdminData);
router.put("/updateOneAdminData/:id", updateOneAdminData);
router.delete("/deleteOneAdminData/:id", deleteOneAdminData);


router.post("/addContact",addContactSpecificId)
router.get("/getContact",getAllContactData)
router.get("/getContactsByPublisher/:publisherId", getContactsByPublisherId);

module.exports= router;