require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser")
const cors = require("cors")
const Router = require('./routers');
const db = require("./models");

//khoi tao web server
const app = express();

app.use(cors({
    origin: true,
    credentials: true
}));
app.use(cookieParser());
app.use(bodyParser.json({ limit: '64mb' }));
app.use(bodyParser.urlencoded({ limit: '64mb', extended: true }));

app.use('/user', Router.userRouter);
app.use('/wallpaper', Router.wallpaperRouter);
app.use('/tag', Router.tagRouter);
app.use('/album', Router.albumRouter);

app.listen(process.env.PORT || 9999, process.env.HOST_NAME || "localhost", () => {
    console.log(`Server in running at: http://${process.env.HOST_NAME}:${process.env.PORT}`)
    db.connect()
})
