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
    role: {
      type: String,
      enum: ["Admin", "User", "Super Admin",'Brand User'],
      default: "Brand User",
      index: true 
    },
    permissions: {
      instagram: {
        add: { type: Boolean, default: false },
        edit: { type: Boolean, default: false },
        delete: { type: Boolean, default: false },
        bookmark: { type: Boolean, default: true },
        apply: { type: Boolean, default: true },
      },
      youtube: {
        add: { type: Boolean, default: false },
        edit: { type: Boolean, default: false },
        delete: { type: Boolean, default: false },
        bookmark: { type: Boolean, default: true },
        apply: { type: Boolean, default: true },
      },
      contentWriter: {
        add: { type: Boolean, default: false },
        edit: { type: Boolean, default: false },
        delete: { type: Boolean, default: false },
        bookmark: { type: Boolean, default: true },
        apply: { type: Boolean, default: true },
      },
      guestPost: {
        add: { type: Boolean, default: false },
        edit: { type: Boolean, default: false },
        delete: { type: Boolean, default: false },
        bookmark: { type: Boolean, default: true },
        apply: { type: Boolean, default: true },
      },
    },
   /* isBuyed: {
      type: Boolean,
      default: false, // Assuming default is false
    },
  },*/
   
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);


