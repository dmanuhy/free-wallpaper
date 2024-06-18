//Lưu trữ thông tin về các tag được sử dụng để phân loại wallpaper.
const mongoose = require('mongoose');

const TagSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
}, { timestamps: true });

let Tag = mongoose.model("tag", TagSchema);

module.exports = Tag;
