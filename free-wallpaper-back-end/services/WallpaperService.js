const db = require("../models")

const getAllWallpaperService = (page, order, priority) => {
    return new Promise(async (resolve, reject) => {
        try {
            const wallpaperPerPage = 6;
            const wallpapers = await db.wallpaper.find({})
                .populate({
                    path: "createdBy",
                    select: "_id name avatar"
                })
                .populate({
                    path: "tags"
                })
                .populate({
                    path: "fromAlbum",
                    select: "_id name"
                })
                .sort([[order, priority]])
                .limit(wallpaperPerPage)
                .skip((page - 1) * wallpaperPerPage)
            if (wallpapers && wallpapers.length > 0) {
                resolve({
                    status: 200,
                    data: wallpapers
                })
            } else {
                resolve({
                    status: 404,
                    message: "No data found"
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}
const getAllWallpaperByAuthorService = (userId, page, order, priority) => {
    return new Promise(async (resolve, reject) => {
        try {
            const wallpaperPerPage = 6;
            const wallpapers = await db.wallpaper.find({ createdBy: userId })
                .populate({
                    path: "createdBy",
                    select: "_id name avatar"
                })
                .populate({
                    path: "tags"
                })
                .populate({
                    path: "fromAlbum",
                    select: "_id name"
                })
                .sort([[order, priority]])
                .limit(wallpaperPerPage)
                .skip((page - 1) * wallpaperPerPage)
            if (wallpapers && wallpapers.length > 0) {
                resolve({
                    status: 200,
                    data: wallpapers
                })
            } else {
                resolve({
                    status: 404,
                    message: "No data found"
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}
const getAllWallpaperByAlbumService = (albumId, page, order, priority) => {
    return new Promise(async (resolve, reject) => {
        try {
            const wallpaperPerPage = 6;
            const wallpapers = await db.wallpaper.find({ fromAlbum: albumId })
                .populate({
                    path: "createdBy",
                    select: "_id name avatar"
                })
                .populate({
                    path: "tags"
                })
                .populate({
                    path: "fromAlbum",
                    select: "_id name"
                })
                .sort([[order, priority]])
                .limit(wallpaperPerPage)
                .skip((page - 1) * wallpaperPerPage)
            if (wallpapers && wallpapers.length > 0) {
                resolve({
                    status: 200,
                    data: wallpapers
                })
            } else {
                resolve({
                    status: 404,
                    message: "No data found"
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}


module.exports = {
    getAllWallpaperService,
    getAllWallpaperByAuthorService,
    getAllWallpaperByAlbumService
}