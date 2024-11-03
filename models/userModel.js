const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    bio: { 
      type: String,
      trim: true,
    },
    role: {
      type: String,
      enum: ["Admin", "User", "Super Admin",'Brand User'],
      default: "Brand User",
      index: true 
    },
    verificationToken: {type: String,default:null},
    isVerified: { type: Boolean, default: false },
    permissions: {
      instagram: {
        add: { type: Boolean, default: false },
        edit: { type: Boolean, default: false },
        delete: { type: Boolean, default: false },
        bookmark: { type: Boolean, default: true },
        apply: { type: Boolean, default: true },
        profile: { type: Boolean, default: true },
        showprofile: { type: Boolean, default: true },
        filter: { type: Boolean, default: true },
      },
      youtube: {
        add: { type: Boolean, default: false },
        edit: { type: Boolean, default: false },
        delete: { type: Boolean, default: false },
        bookmark: { type: Boolean, default: true },
        apply: { type: Boolean, default: true },
        profile: { type: Boolean, default: true },
        showprofile: { type: Boolean, default: true },
        filter: { type: Boolean, default: true },
      },
      contentWriter: {
        add: { type: Boolean, default: false },
        edit: { type: Boolean, default: false },
        delete: { type: Boolean, default: false },
        bookmark: { type: Boolean, default: true },
        apply: { type: Boolean, default: true },
        profile: { type: Boolean, default: true },
        showprofile: { type: Boolean, default: true },
        filter: { type: Boolean, default: true },
      },
      guestPost: {
        add: { type: Boolean, default: false },
        edit: { type: Boolean, default: false },
        delete: { type: Boolean, default: false },
        bookmark: { type: Boolean, default: true },
        apply: { type: Boolean, default: true },
        profile: { type: Boolean, default: true },
        showprofile: { type: Boolean, default: true },
        filter: { type: Boolean, default: true },
      },
    },
    isBookmarked:{ type: Boolean, default: false },
    userId:{ type: mongoose.Schema.Types.ObjectId },
   /* isBuyed: {
      type: Boolean,
      default: false, // Assuming default is false
    },
  },*/
   
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);


