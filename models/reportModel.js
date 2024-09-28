const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId },
    
    publisherId:{ type: mongoose.Schema.Types.ObjectId},
    section: { type: String, required: true }, 
    status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
    isSeen: { type: Boolean, default: false },
    isBookmarked:{ type: Boolean, default: false },
    reportType: { 
        type: String, 
        enum: ['Spam', 'Harassment', 'Inappropriate Content', 'Other'], 
        required: true 
    },
    reason: { type: String,required: true },
    details: {
        type: mongoose.Schema.Types.Mixed,
    },
    createdAt: { type: Date, default: Date.now },
},{ timestamps: true });

module.exports = mongoose.model('Report', reportSchema);