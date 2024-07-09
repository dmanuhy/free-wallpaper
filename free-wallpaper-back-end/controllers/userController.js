const User = require("../models/user");
const { UserService, WallpaperService } = require("../services");

const signUp = async (req, res, next) => {
    try {
        const { name, email, password, confirmPassword } = req.body;
        if (!name || !email || !password || !confirmPassword) {
            return res.status(422).json({
                status: res.statusCode,
                message: "Missing parameter(s)",
            });
        } else {
            if (password !== confirmPassword) {
                return res.status(400).json({
                    status: res.statusCode,
                    message: "Invalid confirm password",
                });
            } else {
                const serviceResponse = await UserService.signUpService(req.body);
                return res.status(serviceResponse.status).json(serviceResponse);
            }
        }
    } catch (error) {
        return res.status(500).json({
            status: res.statusCode,
            message: "Internal Server Error",
        });
    }
};

const signIn = async (req, res) => {
    try {
        if (!req.body.email || !req.body.password) {
            return res.status(422).json({
                status: res.statusCode,
                message: "Missing input(s)",
            });
        } else {
            const serviceResponse = await UserService.signInService(req.body);
            res.cookie("jwt", serviceResponse.token, { httpOnly: false, maxAge: 60 * 1000 * 60 * 24 });
            return res.status(200).json(serviceResponse);
        }
    } catch (error) {
        return res.status(500).json({
            status: res.statusCode,
            message: "Internal Server Error",
        });
    }
};

const logout = async (req, res) => {
    try {
        res.clearCookie("jwt");
        return res.status(200).json({
            status: res.statusCode,
            message: "Logged out!",
        });
    } catch (error) {
        return res.status(500).json({
            status: res.statusCode,
            message: "Internal Server Error",
        });
    }
};
const finduserById = async (req, res) => {
    const { userId } = req.params;
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "user not found" });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getAllUsers = async (req, res) => {
    try {
        const serviceResponse = await UserService.getAllUsersService();
        return res.status(serviceResponse.status).json(serviceResponse.data);
    } catch (error) {
        return res.status(500).json({
            status: res.statusCode,
            message: "Internal Server Error",
        });
    }
};

const blockUser = async (req, res, next) => {
    try {
        const userId = req.params.id;
        const isActived = req.body.isActived;

        const serviceResponse = await UserService.blockUserService(userId, isActived);
        return res.status(serviceResponse.status).json(serviceResponse);
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: error.message || "Internal Server Error",
        });
    }
};

const getUserNotification = async (req, res) => {
    try {
        const { id } = req.body
        if (!id) {
            return res.status(400).json({
                status: res.statusCode,
                message: "Can not get Notifications"
            });
        }
        const serviceResponse = await UserService.getUserNotificationService(id);
        return res.status(serviceResponse.status).json(serviceResponse);
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: error.message || "Internal Server Error",
        });
    }
};

const getUserLikedWallpaper = async (req, res) => {
    try {
        const { id } = req.body
        if (!id) {
            return res.status(400).json({
                status: res.statusCode,
                message: "An error is occured when try to get User's liked wallpaper"
            });
        }
        const serviceResponse = await UserService.getUserLikedWallpaperService(id);
        return res.status(serviceResponse.status).json(serviceResponse);
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: error.message || "Internal Server Error",
        });
    }
};

const updateUserLikedWallpaper = async (req, res) => {
    try {
        const { userId, wallpaperId } = req.body
        if (!userId || !wallpaperId) {
            return res.status(400).json({
                status: res.statusCode,
                message: "Connect failed"
            });
        }
        const serviceResponse = await UserService.updateUserLikedWallpaperService(userId, wallpaperId);
        return res.status(serviceResponse.status).json(serviceResponse);
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: error.message || "Internal Server Error",
        });
    }
};

module.exports = {
    signUp,
    signIn,
    logout,
    finduserById,
    getAllUsers,
    blockUser,
    getUserNotification,
    getUserLikedWallpaper,
    updateUserLikedWallpaper
};
