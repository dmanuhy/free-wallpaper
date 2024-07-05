const db = require("../models");
const User = require("../models/user");
const Album = require("../models/album");
const { WallpaperService } = require("../services");
const cloudinary = require("cloudinary").v2;

const getWallpapers = async (req, res) => {
  const page = req.query.page ? req.query.page : "1";
  const order = req.query.order ? req.query.order : "createdAt";
  const priority = req.query.priority ? req.query.priority : "DESC";

  try {
    const serviceResponse = await WallpaperService.getAllWallpaperService(page, order, priority);
    return res.status(200).json(serviceResponse);
  } catch (error) {
    console.log(error);
  }
};

const Wallpaper = require("../models/wallpaper");
async function CreateNewWallpaper(req, res, next) {
  try {
    const files = req.files;
    const { fromAlbum, createdBy } = req.body;

    const savedWallpapers = await Promise.all(
      files.map(async (file) => {
        const newWallpaper = new Wallpaper({
          imageUrl: file.path,
          fromAlbum,
          publicId: file.filename,
          createdBy,
          likes: 0,
          comments: [],
        });
        return await newWallpaper.save();
      })
    );
    const wallpaperIds = savedWallpapers.map((wallpaper) => wallpaper._id);
    await Album.findByIdAndUpdate(fromAlbum, { $push: { wallpapers: { $each: wallpaperIds } } });
    return res.status(201).json({ message: "Tạo thành công", wallpapers: savedWallpapers });
  } catch (error) {
    next(error);
  }
}

const deleteOneImage = async (req, res, next) => {
    try {
        const { id } = req.params;
        const wallpapers = await Wallpaper.findById(id);
        await Wallpaper.deleteOne({ _id: id })
        const deletePromises = cloudinary.uploader.destroy(wallpapers.publicId);
        await Promise.all(deletePromises);
        await Album.findByIdAndUpdate(fromAlbum, { $pull: { wallpapers: { $in: wallpapers._id } } });
        console.log(`Deleted images with public_ids: ${publicIds}`);
    } catch (error) {
        console.error(`Failed to delete images with public_ids: ${publicIds}`, error);
    }
};

const deleteManyImageAlbum = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: "Missing albumId in query parameters" });
    }

    // Tìm các ảnh trong album có id là `id`
    const wallpapers = await Wallpaper.find({ fromAlbum: id });

    // Lấy ra publicId của các ảnh
    const publicIds = wallpapers.map((wallpaper) => wallpaper.publicId);

    // Xóa từng ảnh khỏi Cloudinary
    const deletePromises = publicIds.map((publicId) => cloudinary.uploader.destroy(publicId));
    await Promise.all(deletePromises);

    // Xóa tất cả ảnh khỏi MongoDB
    await Wallpaper.deleteMany({ fromAlbum: id });

    // Trả về phản hồi thành công
    return res.status(200).json({ message: "Deleted images from album successfully" });
  } catch (error) {
    console.error(`Failed to delete images with public_ids`, error);
    return res.status(500).json({ error: "Failed to delete images from album", details: error.message });
  }
};

const getWallpapersByAuthor = async (req, res) => {
  try {
    const { userId } = req.params;
    const page = req.query.page ? req.query.page : "1";
    const order = req.query.order ? req.query.order : "updatedAt";
    const priority = req.query.priority ? req.query.priority : "DESC";
    try {
      const serviceResponse = await WallpaperService.getAllWallpaperByAuthorService(userId, page, order, priority);
      return res.status(200).json(serviceResponse);
    } catch (error) {
      console.log(error);
    }
  } catch (error) {
    console.log(error);
  }
};

const getWallpapersByAlbum = async (req, res) => {
  try {
    const { albumId } = req.params;
    const page = req.query.page ? req.query.page : "1";
    const order = req.query.order ? req.query.order : "updatedAt";
    const priority = req.query.priority ? req.query.priority : "DESC";
    try {
      const serviceResponse = await WallpaperService.getAllWallpaperByAlbumService(albumId, page, order, priority);
      return res.status(200).json(serviceResponse);
    } catch (error) {
      console.log(error);
    }
  } catch (error) {
    console.log(error);
  }
};

const getWallpaperByID = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(422).json({
        message: "Id not found",
      });
    } else {
      const serviceResponse = await WallpaperService.getWallpaperByIDService(id);
      return res.status(200).json(serviceResponse);
    }
  } catch (error) {
    console.log(error);
  }
};

const addWallpaperComment = async (req, res) => {
  try {
    const { wallpaperID, commentID, body, userID } = req.body;
    if (!wallpaperID || !body || !userID) {
      return res.status(422).json({
        status: res.statusCode,
        message: "Cannot access data",
      });
    } else {
      const serviceResponse = await WallpaperService.addWallpaperCommentService(req.body);
      return res.status(200).json(serviceResponse);
    }
  } catch (error) {
    console.log(error);
  }
};

//Like ảnh
const likeWallpaper = async (req, res) => {
  try {
    const wallpaperId = req.params.id;
    const wallpaper = await Wallpaper.findById(wallpaperId);

    if (!wallpaper) {
      return res.status(404).json({ message: "Wallpaper not found" });
    }

    wallpaper.likes += 1;
    await wallpaper.save();

    res.status(200).json({ message: "Wallpaper liked successfully", likes: wallpaper.likes });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

const reportWallpaper = async (req, res) => {
  try {
    const reason = req.body.reason;
    const wallpaperId = req.params.id;
    const userId = req.user._id;

    if (!wallpaperId || !reason || !userId) {
      return res.status(422).json({
        status: res.statusCode,
        message: "Not enough information",
      });
    } else {
      const data = {
        reason,
        userId,
        wallpaperId,
      };
      const serviceResponse = await WallpaperService.reportWallpaperService(data);
      return res.status(200).json(serviceResponse);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

module.exports = {
  getWallpapers,
  CreateNewWallpaper,
  getWallpapersByAuthor,
  getWallpapersByAlbum,
  getWallpaperByID,
  deleteManyImageAlbum,
  addWallpaperComment,
  likeWallpaper,
  reportWallpaper,
};
