const express = require('express');
const bodyParser = require('body-parser');
const uploadCloud = require('../middlewares/UploadCloud');

const { wallpaperController } = require("../controllers")
const wallpaperRouter = express.Router();

wallpaperRouter.use(bodyParser.json());

wallpaperRouter.get("/all", wallpaperController.getWallpapers);
wallpaperRouter.get("/by-author/:userId", wallpaperController.getWallpapersByAuthor);
wallpaperRouter.get("/all/:albumId", wallpaperController.getWallpapersByAlbum);
wallpaperRouter.get("/:id", wallpaperController.getWallpaperByID);
wallpaperRouter.delete("/:id", wallpaperController.deleteManyImageAlbum);
wallpaperRouter.post("/create", uploadCloud.array('imageUrl'), wallpaperController.CreateNewWallpaper)
module.exports = {
    wallpaperRouter
}