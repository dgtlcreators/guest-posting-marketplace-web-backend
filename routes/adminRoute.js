const express=require("express");
const {
  createAdminData,
  getAdminData,
} =require("../controllers/adminController.js");
const route = express.Router();


route.get("/getAdminData", getAdminData);
route.post("/createAdminData", createAdminData);

module.exports= route;