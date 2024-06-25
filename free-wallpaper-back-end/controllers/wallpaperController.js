const db = require("../models");
const User = require("../models/user");
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
        const { description, tags, fromAlbum, createdBy } = req.body;

        const savedWallpapers = await Promise.all(files.map(async (file) => {
            const newWallpaper = new Wallpaper({
                description,
                imageUrl: file.path,
                tags,
                fromAlbum,
                createdBy,
                likes: 0,
                comments: []
            });
            return await newWallpaper.save();
        }));
        return res.status(200).json({ message: "Tạo thành công", wallpapers: savedWallpapers });
    } catch (error) {
        next(error);
    }
}
module.exports = {
    getWallpapers,
    CreateNewWallpaper

} 