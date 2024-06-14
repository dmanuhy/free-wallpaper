const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

const db = {}
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