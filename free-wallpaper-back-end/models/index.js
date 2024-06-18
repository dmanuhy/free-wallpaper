const mongoose = require("mongoose");
const User = require("./user");
const Tag = require("./tag");
const Wallpaper = require("./wallpaper");

mongoose.Promise = global.Promise;

const db = {}
db.user = User;
db.tag = Tag;
db.user = User;
db.wallpaper = Wallpaper
db.mongoose = mongoose;

const connectDB = async () => {
    await mongoose.connect(process.env.MONGO_URI, {
        dbName: "free-wallpaper"
    })
        .then(() => console.log("Connected to Mongodb"))
        .catch(error => {
            console.log(error.message)
            process.exit();
        })
}

db.connect = connectDB

module.exports = db