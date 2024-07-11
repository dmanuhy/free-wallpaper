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
wallpaperRouter.delete("/delete/:wid", wallpaperController.deleteOneImage);
wallpaperRouter.post("/comment/add", wallpaperController.addWallpaperComment);
wallpaperRouter.post("/create", uploadCloud.array("imageUrl"), wallpaperController.CreateNewWallpaper);
wallpaperRouter.get("/search/:key", wallpaperController.getWallpaperByKey)
//Like ảnh
wallpaperRouter.post("/:id/like", wallpaperController.likeWallpaper);
wallpaperRouter.post("/share", wallpaperController.shareWallpaper);
wallpaperRouter.post("/:id/report", [checkUserJWT], wallpaperController.reportWallpaper);
wallpaperRouter.put("/edit/:id", wallpaperController.EditTagWallpaper);

module.exports = {
  wallpaperRouter,
};
