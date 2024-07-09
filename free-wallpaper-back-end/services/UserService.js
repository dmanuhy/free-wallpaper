const db = require("../models");
const { v4 } = require("uuid");
const bcrypt = require("bcrypt");
const { createJWT } = require("../middlewares/JsonWebToken");
const server = require("../server");
const { updateWallpaperLikesService } = require("./WallpaperService");

const getRoles = async (roleName) => {
    let role = await db.role.findOne({ name: roleName }).select("_id");
    if (!role) {
        role = await db.role.create({ name: roleName });
    }
    return role;
};

const signUpService = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await db.user.findOne({ email: data.email }).select("email");
            if (user) {
                resolve({
                    status: 409,
                    message: "This Email is already used.",
                });
            } else {
                //create password & token
                const token = v4();
                const hashPassword = bcrypt.hashSync(data.password, parseInt(process.env.PASSWORD_HASH_KEY));
                const roles = await getRoles("member");
                await db.user.create({
                    name: data.name,
                    email: data.email,
                    password: hashPassword,
                    roles: [roles._id],
                    token: token,
                    isActived: true,
                });
                //Send email to notice host admin

                // data.activeLink = `${process.env.FRONT_END_URL}/active-account/${token}`;
                // await EmailService.sendRegisterRequest(data);
                resolve({
                    status: 201,
                    message: "Registed successfully",
                });
            }
        } catch (e) {
            reject({
                status: 500,
                message: e.message,
            });
        }
    });
};

const signInService = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const existUser = await db.user.findOne({ email: data.email }).populate({
                path: "roles",
            });
            if (!existUser) {
                resolve({
                    status: 401,
                    message: "Email or password is wrong",
                });
            } else {
                if (!existUser.isActived) {
                    resolve({
                        status: 401,
                        message: "This account is locked!. Please contact admin",
                    });
                } else {
                    const isCorrectPassword = bcrypt.compareSync(data.password, existUser.password);
                    if (isCorrectPassword) {
                        const payload = {
                            _id: existUser._id,
                            name: existUser.name,
                            email: existUser.email,
                            roles: existUser.roles,
                            avatar: existUser.avatar,
                            isActived: existUser.isActived,
                        };
                        const token = createJWT(payload);
                        resolve({
                            status: 200,
                            message: "Authenticated successfully!",
                            data: {
                                _id: existUser._id,
                                name: existUser.name,
                                email: existUser.email,
                                roles: existUser.roles,
                                avatar: existUser.avatar,
                                isActived: existUser.isActived,
                            },
                            token: token,
                        });
                    } else {
                        resolve({
                            error: 1,
                            message: "Wrong account or password",
                        });
                    }
                }
            }
        } catch (e) {
            reject(e);
        }
    });
};

const getAllUsersService = async () => {
    try {
        const adminRole = await db.role.findOne({ name: "admin" }).select("_id");

        const users = await db.user.find({ roles: { $ne: adminRole._id } }).populate("roles", "-_id");

        return {
            status: 200,
            data: users,
            message: "Successfully retrieved all users except admins",
        };
    } catch (error) {
        return {
            status: 500,
            message: error.message,
        };
    }
};

const blockUserService = async (userId, isActived) => {
    try {
        const updatedUser = await db.user
            .findByIdAndUpdate(userId, { $set: { isActived: isActived } }, { new: true })
            .populate("roles", "-_id");

        if (!updatedUser) {
            return {
                status: 404,
                message: "User not found or no changes made",
            };
        }

        return {
            status: 200,
            data: updatedUser,
            message: "User updated successfully",
        };
    } catch (error) {
        return {
            status: 500,
            message: error.message || "Internal Server Error",
        };
    }
};

const getUserNotificationService = async (id) => {
    try {
        const userNotification = await db.user.findOne({ _id: id })
            .select("_id notifications")
        return {
            status: 200,
            data: userNotification
        };
    } catch (error) {
        return {
            status: 500,
            message: error.message,
        };
    }
};

const getUserLikedWallpaperService = async (id) => {
    try {
        const userNotification = await db.user.findOne({ _id: id })
            .select("_id liked")
        return {
            status: 200,
            data: userNotification
        };
    } catch (error) {
        return {
            status: 500,
            message: error.message,
        };
    }
};

const updateUserLikedWallpaperService = async (userId, wallpaperId, userName, ownerId) => {
    try {
        let action = ""
        const userLikedWallpaper = await db.user.findOne({ _id: userId })
            .select("_id liked")
        if (userLikedWallpaper && userLikedWallpaper.liked.includes(wallpaperId)) {
            const wallpaperIndex = userLikedWallpaper.liked.indexOf(wallpaperId)
            userLikedWallpaper.liked.splice(wallpaperIndex, 1)
            action = "DES"
        } else {
            action = "INC"
            userLikedWallpaper.liked.push(wallpaperId);
            if (userId !== ownerId) {
                await sendNotificationService(ownerId, userName + " liked your photos.", "/wallpaper/" + wallpaperId)
            }
        }
        const response = await userLikedWallpaper.save();
        await updateWallpaperLikesService(wallpaperId, action)
        return {
            status: 200,
            data: response
        };
    } catch (error) {
        return {
            status: 500,
            message: error.message,
        };
    }
};

const sendNotificationService = async (ownerId, body, link) => {

    const userNotification = await db.user.findOneAndUpdate(
        { _id: ownerId },
        { $push: { notifications: { body: body, link: link, date: Date.now() } } },
        { new: true }
    ).select("_id notifications")
    const newNotifications = userNotification.notifications[userNotification.notifications.length - 1]
    server.io.emit("newNotification", { userId: ownerId, notification: newNotifications })
}

const markReadedNotificationService = async (userId, notificationId) => {

    const userNotification = await db.user.findOne({ _id: userId })
        .select("_id notifications");
    if (userNotification) {
        const matchedNotificationIndex = userNotification.notifications.findIndex((n) => n._id.toString() === notificationId);
        userNotification.notifications[matchedNotificationIndex].isReaded = true;
        await userNotification.save()
        return {
            status: 201,
        }
    }
}

module.exports = {
    signUpService,
    signInService,
    getAllUsersService,
    blockUserService,
    getUserNotificationService,
    getUserLikedWallpaperService,
    updateUserLikedWallpaperService,
    markReadedNotificationService
};
