const express=require("express");

const {
  submitForm,
  getData,
  getFilteredData,
  getRequest,
} =require("../controllers/formController.js");

const router = express.Router();

router.post("/submit", submitForm);
router.get("/getData", getData);
router.post("/getRequest", getRequest);
router.post("/getFilteredData", getFilteredData);

module.exports=router;