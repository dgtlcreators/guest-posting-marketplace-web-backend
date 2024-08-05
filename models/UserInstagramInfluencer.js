

const mongoose = require('mongoose');

const userActionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  action: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

module.exports = mongoose.model('UserAction', userActionSchema);

/*const mongoose = require('mongoose');

const UserInstagramInfluencerSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, enum: ["Admin", "User", "Super Admin",'Brand User'], default: 'Brand User' }
},{ timestamps: true });

module.exports = mongoose.model('UserInstagramInfluencer',UserInstagramInfluencerSchema);
*/