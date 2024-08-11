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
  }
}, { timestamps: true });

module.exports = mongoose.model('ContentWriter', ContentWriterSchema);