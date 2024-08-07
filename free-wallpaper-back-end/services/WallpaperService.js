const db = require("../models");
const Wallpaper = require("../models/wallpaper");
const Report = require("../models/report");
const server = require("../server");

const getAllWallpaperService = (page, order, priority) => {
    return new Promise(async (resolve, reject) => {
        try {
            const wallpaperPerPage = 6;
            const wallpapers = await db.wallpaper
                .find({})
                .select("_id imageUrl createdBy")
                .populate({
                    path: "createdBy",
                    select: "_id name avatar",
                })
                .sort([[order, priority]])
                .limit(wallpaperPerPage)
                .skip((page - 1) * wallpaperPerPage);
            if (wallpapers && wallpapers.length > 0) {
                resolve({
                    status: 200,
                    data: wallpapers,
                });
            } else {
                resolve({
                    status: 404,
                    message: "No data found",
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};
const getAllWallpaperByAuthorService = (userId, page, order, priority) => {
    return new Promise(async (resolve, reject) => {
        try {
            const wallpaperPerPage = 6;
            const wallpapers = await db.wallpaper
                .find({ createdBy: userId })
                .populate({
                    path: "createdBy",
                    select: "_id name avatar",
                })
                .populate({
                    path: "tags",
                })
                .populate({
                    path: "fromAlbum",
                    select: "_id name",
                })
                .sort([[order, priority]])
                .limit(wallpaperPerPage)
                .skip((page - 1) * wallpaperPerPage);
            if (wallpapers && wallpapers.length > 0) {
                resolve({
                    status: 200,
                    data: wallpapers,
                });
            } else {
                resolve({
                    status: 404,
                    message: "No data found",
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};
const getAllWallpaperByAlbumService = (albumId, page, order, priority) => {
    return new Promise(async (resolve, reject) => {
        try {
            const wallpaperPerPage = 6;
            const wallpapers = await db.wallpaper
                .find({ fromAlbum: albumId })
                .populate({
                    path: "createdBy",
                    select: "_id name avatar",
                })
                .populate({
                    path: "tags",
                })
                .populate({
                    path: "fromAlbum",
                    select: "_id name",
                })
                .sort([[order, priority]])
                .limit(wallpaperPerPage)
                .skip((page - 1) * wallpaperPerPage);
            if (wallpapers && wallpapers.length > 0) {
                resolve({
                    status: 200,
                    data: wallpapers,
                });
            } else {
                resolve({
                    status: 404,
                    message: "No data found",
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};

const getWallpaperByIDService = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const wallpaper = await db.wallpaper
                .findOne({ _id: id })
                .select("_id imageUrl description tags fromAlbum createdBy likes comments")
                .populate({
                    path: "tags",
                    select: "_id name",
                })
                .populate({
                    path: "fromAlbum",
                    select: "_id name",
                })
                .populate({
                    path: "createdBy",
                    select: "_id name avatar",
                })
                .populate({
                    path: "comments",
                    select: "_id user body date replies",
                    populate: [
                        {
                            path: "user",
                            select: "_id name avatar",
                        },
                        {
                            path: "replies",
                            populate: {
                                path: "user",
                                select: "_id name avatar",
                            },
                        },
                    ],
                });
            if (wallpaper) {
                resolve({
                    status: 200,
                    data: wallpaper,
                });
            } else {
                resolve({
                    status: 404,
                    message: "No data found",
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};

const addWallpaperCommentService = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let existWallpaper = null;
            if (!data.commentID || data.commentID === "") {
                existWallpaper = await Wallpaper.findOneAndUpdate(
                    { _id: data.wallpaperID },
                    { $push: { comments: { user: data.userID, body: data.body, date: Date.now() } } },
                    { new: true }
                )
                    .select("_id comments")
                    .populate({
                        path: "comments",
                        populate: { path: "user", select: "_id name avatar" },
                    });
                if (existWallpaper) {
                    const newComment = existWallpaper.comments[existWallpaper.comments.length - 1];
                    let commentData = {
                        user: newComment.user,
                        body: newComment.body,
                        date: newComment.date,
                        replies: [],
                        _id: newComment._id,
                        wID: data.wallpaperID,
                    };
                    server.io.emit("newComment", commentData);
                    resolve({
                        status: 201,
                        data: commentData,
                    });
                }
            } else {
                existWallpaper = await Wallpaper.findOne({ _id: data.wallpaperID })
                    .select("_id comments")
                    .populate({
                        path: "comments",
                        select: "_id replies",
                        populate: {
                            path: "replies",
                            select: "_id user body date",
                            populate: {
                                path: "user",
                                select: "_id name avatar",
                            },
                        },
                    });
                if (existWallpaper) {
                    updateIndex = existWallpaper.comments.indexOf(
                        existWallpaper.comments.find((comment) => comment._id.toString() === data.commentID)
                    );
                    existWallpaper.comments[updateIndex].replies.push({ user: data.userID, body: data.body, date: Date.now() });
                    await existWallpaper.save();
                    const lastReplyIndex = existWallpaper.comments[updateIndex].replies.length;
                    const reply = existWallpaper.comments[updateIndex].replies[lastReplyIndex - 1];
                    const user = await db.user.findOne({ _id: reply.user.toString() }).select("name avatar");
                    server.io.emit("newComment", {
                        user: user,
                        _id: reply._id,
                        body: reply.body,
                        date: reply.date,
                        cID: data.commentID,
                        wID: data.wallpaperID,
                    });
                    resolve({
                        status: 201,
                        data: {
                            user: user,
                            _id: reply._id,
                            body: reply.body,
                            date: reply.date,
                            cID: data.commentID,
                            wID: data.wallpaperID,
                        },
                    });
                }
            }
        } catch (e) {
            reject(e);
        }
    });
};

const reportWallpaperService = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const existingReport = await Report.findOne({
                reporter: data.userId,
                wallpaper: data.wallpaperId,
            });

            if (existingReport) {
                resolve({
                    status: 409,
                    message: "Report already exists for this user and wallpaper",
                });
                return;
            }

            const newReport = new Report({
                reason: data.reason,
                wallpaper: data.wallpaperId,
                reporter: data.userId,
            });
            await newReport.save();
            resolve({
                status: 201,
                message: "Report created successfully",
                data: newReport,
            });
        } catch (e) {
            reject(e);
        }
    });
};

const getWallpaperByKeyService = (key) => {
    return new Promise(async (resolve, reject) => {
        try {
            const tags = key.toLowerCase().split(" ");
            const regexTags = tags.map(tag => new RegExp(`${tag}`, "i"))
            const wallpapers = await db.wallpaper
                .find({ "tags": { $in: regexTags } })
                .select("_id imageUrl createdBy")
                .populate({
                    path: "createdBy",
                    select: "_id name avatar",
                })
                .populate({
                    path: "tags",
                    select: "_id name",
                })
            if (wallpapers && wallpapers.length > 0) {
                resolve({
                    status: 200,
                    data: wallpapers,
                });
            } else {
                resolve({
                    status: 404,
                    message: "No data found",
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};

const updateWallpaperLikesService = async (wallpaperID, action) => {
    try {

        let value = 0;
        if (action === "INC") {
            value++
        } else {
            if (action === "DES") {
                value--
            }
        }
        await db.wallpaper.findByIdAndUpdate({ _id: wallpaperID }, { $inc: { likes: value } })
        server.io.emit("updateWallpaperLikes", value)
    } catch (e) {
        console.log(e)
    }
};

module.exports = {
    getAllWallpaperService,
    getAllWallpaperByAuthorService,
    getAllWallpaperByAlbumService,
    getWallpaperByIDService,
    addWallpaperCommentService,
    reportWallpaperService,
    getWallpaperByKeyService,
    updateWallpaperLikesService
};
