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

const SubCategoriesSchema = new mongoose.Schema({
  type: {
    type: String,
   
    default: ""
  },
  other: {
    type: String,
    default: ""
  }
});
const IndustrySchema = new mongoose.Schema({
  type: {
    type: String,
    default: ""
  },
  other: {
    type: String,
    default: ""
  },
  subCategories: [SubCategoriesSchema] 
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
 // location: { type: String },
 location: {
  country: { type: String },
  state: { type: String },
  city: { type: String },
},
  collaborationRates: {
    post: { type: Number,  },
    story: { type: Number, },
    reel: { type: Number,  }
  },
  email: {
    type: String,
    
    unique: true
  },
  wordCount: {
    type: Number,
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Other", "Prefer not to say"], 
    default: "Prefer not to say" 
  },
  /*industry: {
    type: [SubCategoriesSchema],
   
  },
  subCategories: {
    type: [{SubCategoriesSchema}],  
  },
  industry: {
    type: String,
  },
  subCategories: {
    type: [SubCategoriesSchema],
  },*/
  industry: [IndustrySchema],
  createdAt: {
    type: Date,
    default: Date.now
  },
  verifiedStatus: { type: Boolean, default: false },
  isBookmarked:{ type: Boolean, default: false },
  userId:{ type: mongoose.Schema.Types.ObjectId },
}, { timestamps: true });

module.exports = mongoose.model('ContentWriter', ContentWriterSchema);
