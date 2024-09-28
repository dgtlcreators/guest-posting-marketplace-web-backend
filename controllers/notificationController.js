

const Notification = require('../models/notificationModel');


module.exports.getAllNotifications = async (req, res) => {
    try {
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
        const notification = new Notification(req.body);
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


module.exports.updateNotifications = async (req, res) => {
    try {
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

