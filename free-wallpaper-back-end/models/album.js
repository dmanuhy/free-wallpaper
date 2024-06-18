// models/Album.js
const mongoose = require('mongoose');

const AlbumSchema = new mongoose.Schema({
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
    isActived: {
        type: Boolean
    }
}, { timestamps: true });

const Album = mongoose.model('album', AlbumSchema);
module.exports = Album;
