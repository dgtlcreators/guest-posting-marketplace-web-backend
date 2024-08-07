const mongoose = require('mongoose');

const ExpertiseSchema = new mongoose.Schema({
  type: {
    type: String,
   
    default: ""
  },
  other: {
    type: String,
    default: ""
  }
});

const LanguageSchema = new mongoose.Schema({
  name: {
    type: String,
    
  },
  proficiency: {
    type: String,
    
    enum: ["Beginner", "Intermediate", "Advanced", 'Native']
  }
});

const ContentWriterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  bio: {
    type: String,
   
  },
  experience: {
    type: Number,
  
  },
  expertise: {
    type: [ExpertiseSchema]
    
  },
  languages: {
    type: [LanguageSchema],
    
  },
  location: { type: String },
  collaborationRates: {
    post: { type: Number,  },
    story: { type: Number, },
    reel: { type: Number,  }
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

module.exports = mongoose.model('ContentWriter', ContentWriterSchema);
