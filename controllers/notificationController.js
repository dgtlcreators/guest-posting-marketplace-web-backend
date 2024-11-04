

const Notification = require('../models/notificationModel');

const User=require("../models/userModel")
module.exports.getAllNotifications = async (req, res) => {
    try {
        await Notification.deleteMany({ userStatus: { $size: 0 } });
        const notifications = await Notification.find();
        res.status(200).json({
            success: true,
            message: 'Notifications retrieved successfully',
            data: notifications
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};


module.exports.getNotificationById = async (req, res) => {
    try {
        await Notification.deleteMany({ userStatus: { $size: 0 } });
        const notification = await Notification.findById(req.params.id);
        if (!notification) return res.status(404).json({ success: false, message: 'Notification not found' });
        res.status(200).json({
            success: true,
            message: 'Notification retrieved successfully',
            data: notification
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports.createNotifications = async (req, res) => {
    try {
 
        await Notification.deleteMany({ userStatus: { $size: 0 } });

  
        const admins = await User.find({ role: { $in: ["Admin", "Super Admin"] } });

        const userStatus = [];

      
        const user = await User.findById(req.body.userId); 

    
        if (user && user.role !== "Admin" && user.role !== "Super Admin") {
            userStatus.push({
                userId: req.body.userId,
                isSeen: false,
                isBookmarked: false,
            });
        }


        admins.forEach(admin => {
            userStatus.push({
                userId: admin._id,
                isSeen: false,
                isBookmarked: false,
            });
        });

       
        const notification = new Notification({
            ...req.body,
            userStatus 
        });

      
        await notification.save();
        res.status(201).json({
            success: true,
            message: 'Notification created successfully',
            data: notification
        });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};


module.exports.createNotifications1 = async (req, res) => {
   
    try {
        await Notification.deleteMany({ userStatus: { $size: 0 } });
        const admins = await User.find({ role: { $in: ["Admin", "Super Admin"] } });
        

        const userStatus = [
            {
                userId: req.body.userId,
                isSeen: false,
                isBookmarked: false,
            },
            ...admins.map(admin => ({
                userId: admin._id,
                isSeen: false,
                isBookmarked: false,
            }))
        ];
        const notification = new Notification({
            ...req.body,
            userStatus 
        });
       //const notification = new Notification(req.body);
        //console.log(req.body)
        await notification.save();
        res.status(201).json({
            success: true,
            message: 'Notification created successfully',
            data: notification
        });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

module.exports.updateNotificationsUser1 = async (req, res) => {
    const { id, userId } = req.params;

    try {
      
        const notification = await Notification.findOne({ _id: id, "userStatus.userId": userId });

        if (!notification) {
            return res.status(404).json({ success: false, message: 'Notification not found or user not associated' });
        }

  
        const userStatus = notification.userStatus.find(status => status.userId.toString() === userId);
        const newIsSeenValue = !userStatus.isSeen; 

        const updatedNotification = await Notification.findOneAndUpdate(
            { _id: id, "userStatus.userId": userId },
            { $set: { "userStatus.$.isSeen": newIsSeenValue } },
            { new: true }
        );

        res.status(200).json({
            success: true,
            message: 'Notification seen status updated successfully',
            data: updatedNotification
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
module.exports.updateNotificationsUser = async (req, res) => {
    const { id, userId } = req.params;

    try {
        const notification = await Notification.findOne({ _id: id, "userStatus.userId": userId });

        if (!notification) {
            return res.status(404).json({ success: false, message: 'Notification not found or user not associated' });
        }

        const updatedNotification = await Notification.findOneAndUpdate(
            { _id: id, "userStatus.userId": userId },
            { $set: { "userStatus.$.isSeen": !notification.userStatus.find(status => status.userId.toString() === userId).isSeen } },
            { new: true }
        );

        res.status(200).json({
            success: true,
            message: 'Notification seen status updated successfully',
            data: updatedNotification
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports.deleteNotificationUser = async (req, res) => {
    const { id, userId } = req.params; // Get both notification ID and user ID
   // console.log("Notification ID: ", id);
  //  console.log("User ID: ", userId);

    try {
        const updatedNotification = await Notification.findOneAndUpdate(
            { _id: id },
            { $pull: { userStatus: { userId: userId } } }, // Use userId from params
            { new: true }
        );

      //  console.log("Updated Notification: ", updatedNotification);

        if (!updatedNotification) {
            return res.status(404).json({ success: false, message: 'Notification not found' });
        }

        // If userStatus is empty, delete the notification
        if (updatedNotification.userStatus.length === 0) {
            await Notification.findByIdAndDelete(id);
        }

        res.status(200).json({
            success: true,
            message: 'User status deleted successfully',
            data: updatedNotification
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};





module.exports.deleteNotificationUser1 = async (req, res) => {
    const { id } = req.params;

    try {
        const notification = await Notification.findByIdAndDelete(id);

        if (!notification) {
            return res.status(404).json({ success: false, message: 'Notification not found' });
        }

        res.status(204).json({
            success: true,
            message: 'Notification deleted successfully'
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};



module.exports.updateNotifications = async (req, res) => {
    try {
        await Notification.deleteMany({ userStatus: { $size: 0 } });
        const notification = await Notification.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!notification) return res.status(404).json({ success: false, message: 'Notification not found' });
        res.status(200).json({
            success: true,
            message: 'Notification updated successfully',
            data: notification
        });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};


module.exports.deleteNotifications = async (req, res) => {
    try {
        await Notification.deleteMany({ userStatus: { $size: 0 } });
        const notification = await Notification.findByIdAndDelete(req.params.id);
        if (!notification) return res.status(404).json({ success: false, message: 'Notification not found' });
        res.status(204).json({
            success: true,
            message: 'Notification deleted successfully'
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};



