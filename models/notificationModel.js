const mongoose = require('mongoose');
const User=require("./userModel")

const notoficationSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId },
    
    publisherId:{ type: mongoose.Schema.Types.ObjectId},
    section: { type: String, required: true }, 
    status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
    isSeen: { type: Boolean, default: false },
    isBookmarked:{ type: Boolean, default: false },
    section: { type: String },
    formData: { type: [mongoose.Schema.Types.Mixed], default: [] },
    details: {
        type: mongoose.Schema.Types.Mixed,
    },
    isShowing:{ type: Boolean, default: false },
    userStatus: [
        {
            userId: { 
                type: mongoose.Schema.Types.ObjectId, 
               required:true
            },
            isSeen: { type: Boolean, default: false },
            isBookmarked: { type: Boolean, default: false }, 
             createdAt: { type: Date, default: Date.now },
        }
    ],
    
    createdAt: { type: Date, default: Date.now },
},{ timestamps: true });

module.exports = mongoose.model('Notification', notoficationSchema);