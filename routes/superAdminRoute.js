
const express=require("express");
const router = express.Router();

const {
  getAllAdminData,
  getOneAdminData,
  updateOneAdminData,
  deleteOneAdminData,
  getFilteredAdminData,
} =require("../controllers/superAdminController.js");


// route.post("/getRequest", getRequest);

router.get("/getAllAdminData", getAllAdminData);
router.get("/getOneAdminData/:id", getOneAdminData);
router.post("/getFilteredAdminData", getFilteredAdminData);
router.put("/updateOneAdminData/:id", updateOneAdminData);
router.delete("/deleteOneAdminData/:id", deleteOneAdminData);

module.exports= router;