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
        { type: mongoose.Schema.Types.ObjectId, ref: "tag" }
    ],
    fromAlbum: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "album"
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    },
    likes: {
        type: Number,
        default: 0,
    },
    comments: [
        { user: { type: mongoose.Schema.Types.ObjectId, ref: "user" }, body: String, date: Date }
    ],
}, { timestamps: true });

const Wallpaper = mongoose.model("wallpaper", WallpaperSchema);

module.exports = Wallpaper;