const express = require('express');
const bodyParser = require('body-parser')
const { wallpaperController } = require("../controllers")
const wallpaperRouter = express.Router();

wallpaperRouter.use(bodyParser.json());

wallpaperRouter.get("/all", wallpaperController.getWallpapers);


module.exports = {
    wallpaperRouter
}