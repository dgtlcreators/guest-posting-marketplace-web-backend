const express=require("express");

const {getAllNotifications,getNotificationById,createNotifications,
    updateNotifications,deleteNotifications
}=require("../controllers/notificationController.js");


const router = express.Router();

router.get("/getAllNotifications", getAllNotifications);
router.get("/getNotificationById/:id", getNotificationById);
router.post("/createNotifications", createNotifications);
router.put("/updateNotifications/:id", updateNotifications);
router.delete("/deleteNotifications/:id", deleteNotifications);

module.exports=router;