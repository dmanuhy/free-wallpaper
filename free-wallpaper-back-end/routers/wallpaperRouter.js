const express = require("express");
const bodyParser = require("body-parser");
const uploadCloud = require("../middlewares/UploadCloud");
const { checkUserJWT } = require("../middlewares/JsonWebToken");

const { wallpaperController } = require("../controllers");

const wallpaperRouter = express.Router();

wallpaperRouter.use(bodyParser.json());

wallpaperRouter.get("/all", wallpaperController.getWallpapers);
wallpaperRouter.get("/by-author/:userId", wallpaperController.getWallpapersByAuthor);
wallpaperRouter.get("/all/:albumId", wallpaperController.getWallpapersByAlbum);
wallpaperRouter.get("/:id", wallpaperController.getWallpaperByID);
wallpaperRouter.delete("/:id", wallpaperController.deleteManyImageAlbum);
wallpaperRouter.post("/comment/add", wallpaperController.addWallpaperComment);
wallpaperRouter.post("/create", uploadCloud.array("imageUrl"), wallpaperController.CreateNewWallpaper);
//Like ảnh
wallpaperRouter.post("/:id/like", wallpaperController.likeWallpaper);
wallpaperRouter.post("/share", wallpaperController.shareWallpaper);
wallpaperRouter.post("/:id/report", [checkUserJWT], wallpaperController.reportWallpaper);

module.exports = {
  wallpaperRouter,
};
