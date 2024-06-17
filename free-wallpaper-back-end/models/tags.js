//Lưu trữ thông tin về các tag được sử dụng để phân loại wallpaper.
import mongoose from 'mongoose';

const TagSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      unique: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  });
  