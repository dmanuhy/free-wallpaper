// models/user.js
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
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
    required: true
  },
  bio: {
    type: String,
    require: false
  },
  avatar: {
    type: String,
    require: false
  },
  albums: [
    { type: mongoose.Schema.Types.ObjectId, ref: "albums" }
  ],
  shared: [
    { type: mongoose.Schema.Types.ObjectId, ref: "albums" }
  ],
  liked: [
    { type: mongoose.Schema.Types.ObjectId, ref: "wallpapers" }
  ],
  dob: {
    type: Date,
    require: false
  },
  token: {
    type: String,
    require: true
  },
  isVip: {
    type: Boolean,
    default: false
  },
  isActived: {
    type: Boolean,
    default: false
  }
});

const User = mongoose.model('user', UserSchema);
module.exports = User;
