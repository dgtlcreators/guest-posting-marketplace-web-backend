const express=require("express");

const {getAllNotifications,getNotificationById,createNotifications,
    updateNotifications,deleteNotifications,deleteNotificationUser,updateNotificationsUser
}=require("../controllers/notificationController.js");


const router = express.Router();

router.get("/getAllNotifications", getAllNotifications);
router.get("/getNotificationById/:id", getNotificationById);
router.post("/createNotifications", createNotifications);
router.put("/updateNotifications/:id", updateNotifications);
router.delete("/deleteNotifications/:id", deleteNotifications);

router.put("/updateNotificationsUser/:id/:userId", updateNotificationsUser);
router.delete("/deleteNotificationUser/:id/:userId", deleteNotificationUser);

//router.put('/markAsSeen/:notificationId/:userId', markAsSeen);


//router.delete('/delete/:notificationId', deleteNotification);

module.exports=router;