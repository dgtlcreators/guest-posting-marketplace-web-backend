const express=require("express");
const router = express.Router();

const {
    countryApi,stateApi,cityApi
} =require("../controllers/locationController.js");

router.get("/country", countryApi);
router.post("/state", stateApi);
router.post("/city", cityApi);

module.exports=router;