const db = require("../models");
const User = require("../models/user");
const Album = require("../models/album");
const { WallpaperService } = require("../services")

const getWallpapers = async (req, res) => {
    const page = req.query.page ? req.query.page : "1";
    const order = req.query.order ? req.query.order : "updatedAt";
    const priority = req.query.priority ? req.query.priority : "DESC";

    try {
        const serviceResponse = await WallpaperService.getAllWallpaperService(page, order, priority);
        return res.status(200).json(serviceResponse)
    } catch (error) {
        console.log(error);
    }
}


const Wallpaper = require("../models/wallpaper");
async function CreateNewWallpaper(req, res, next) {
    try {
        const files = req.files;
        const { fromAlbum, createdBy } = req.body;

        const savedWallpapers = await Promise.all(files.map(async (file) => {
            const newWallpaper = new Wallpaper({
                imageUrl: file.path,
                fromAlbum,
                publicId: file.filename,
                createdBy,
                likes: 0,
                comments: []
            });
            return await newWallpaper.save();
        }));
        const wallpaperIds = savedWallpapers.map(wallpaper => wallpaper._id);
        await Album.findByIdAndUpdate(fromAlbum, { $push: { wallpapers: { $each: wallpaperIds } } });
        return res.status(201).json({ message: "Tạo thành công", wallpapers: savedWallpapers });
    } catch (error) {
        next(error);
    }
}
const deleteOneImage = async (publicIds) => {
    try {
        const deletePromises = publicIds.map(publicId => cloudinary.uploader.destroy(publicId));
        await Promise.all(deletePromises);
        console.log(`Deleted images with public_ids: ${publicIds}`);
    } catch (error) {
        console.error(`Failed to delete images with public_ids: ${publicIds}`, error);
    }
};
const deleteManyImageAlbum = async (publicIds) => {
    try {
        const deletePromises = publicIds.map(publicId => cloudinary.uploader.destroy(publicId));
        await Promise.all(deletePromises);
        console.log(`Deleted images with public_ids: ${publicIds}`);
    } catch (error) {
        console.error(`Failed to delete images with public_ids: ${publicIds}`, error);
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
            return res.status(200).json(serviceResponse)
        } catch (error) {
            console.log(error);
        }
    } catch (error) {
        console.log(error);
    }
}
const getWallpapersByAlbum = async (req, res) => {
    try {
        const { albumId } = req.params;
        const page = req.query.page ? req.query.page : "1";
        const order = req.query.order ? req.query.order : "updatedAt";
        const priority = req.query.priority ? req.query.priority : "DESC";
        try {
            const serviceResponse = await WallpaperService.getAllWallpaperByAlbumService(albumId, page, order, priority);
            return res.status(200).json(serviceResponse)
        } catch (error) {
            console.log(error);
        }
    } catch (error) {
        console.log(error);
    }
}
module.exports = {
    getWallpapers,
    CreateNewWallpaper,
    getWallpapersByAuthor,
    getWallpapersByAlbum

} 