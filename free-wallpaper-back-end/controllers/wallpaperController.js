const db = require("../models");
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
    CreateNewWallpaper

} 