const mongoose = require('mongoose');

const SavefilterSchema=new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId },
    publisher: { type: mongoose.Schema.Types.ObjectId},
    section: { type: String }, 
    status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
    isBookmarked:{ type: Boolean, default: false },
    formData: { type: [mongoose.Schema.Types.Mixed], default: [] },
    details: {
        type: mongoose.Schema.Types.Mixed,
    },
    createdAt: { type: Date, default: Date.now },
},{timestamps:true})


module.exports =mongoose.model('SaveFilter', SavefilterSchema);

