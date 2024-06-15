require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const Router = require('./routers');
const db = require("./models");

//khoi tao web server
const app = express();
app.use('/user', Router.userRouter);
app.use(bodyParser.json());

app.listen(process.env.PORT || 9999, process.env.HOST_NAME || "localhost", () => {
    console.log(`Server in running at: http://${process.env.HOST_NAME}:${process.env.PORT}`)
    db.connect()
})
