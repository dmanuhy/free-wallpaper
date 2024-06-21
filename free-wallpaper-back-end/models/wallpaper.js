const mongoose = require('mongoose');

const WallpaperSchema = new mongoose.Schema({
  description: {
    type: String,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  tags: [
    { type: mongoose.Schema.Types.ObjectId, ref: "tags" }
  ],
  fromAlbum: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "albums"
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: true,
  },
  likes: {
    type: Number,
    default: 0,
  },
  comments: [
    { user: { type: mongoose.Schema.Types.ObjectId, ref: "users" }, body: String, date: Date }
  ],
  newNotification: {
    type: Boolean,
    require: false
  }
}, { timestamps: true });

let Wallpaper = mongoose.model("wallpaper", WallpaperSchema);

module.exports = Wallpaper;
