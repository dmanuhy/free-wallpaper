const mongoose = require("mongoose");
const User = require("./user");
const Tag = require("./tag");
const Wallpaper = require("./wallpaper");
const Role = require("./role");
const Album = require("./album")

mongoose.Promise = global.Promise;

const db = {}
db.user = User;
db.tag = Tag;
db.user = User;
db.wallpaper = Wallpaper
db.role = Role
db.album = Album

const connectDB = async () => {
    await mongoose.connect(process.env.MONGO_URI, {
        dbName: process.env.DB_NAME
    })
        .then(() => console.log("Connected to Mongodb"))
        .catch(error => {
            console.log(error.message)
            process.exit();
        })
}

db.connect = connectDB

module.exports = db