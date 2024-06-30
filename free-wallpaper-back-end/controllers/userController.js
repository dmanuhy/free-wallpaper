const User = require("../models/user")
const { UserService, WallpaperService } = require("../services")

const signUp = async (req, res, next) => {
    try {
        const { name, email, password, confirmPassword } = req.body
        if (!name || !email || !password || !confirmPassword) {
            return res.status(422).json({
                status: res.statusCode,
                message: "Missing parameter(s)"
            })
        } else {
            if (password !== confirmPassword) {
                return res.status(400).json({
                    status: res.statusCode,
                    message: "Invalid confirm password"
                })
            } else {
                const serviceResponse = await UserService.signUpService(req.body)
                return res.status(serviceResponse.status).json(serviceResponse)
            }
        }
    } catch (error) {
        return res.status(500).json({
            status: res.statusCode,
            message: "Internal Server Error"
        })
    }
}

const signIn = async (req, res) => {
    try {
        if (!req.body.email || !req.body.password) {
            return res.status(422).json({
                status: res.statusCode,
                message: "Missing input(s)"
            })
        } else {
            const serviceResponse = await UserService.signInService(req.body)
            res.cookie("jwt", serviceResponse.token, { httpOnly: false, maxAge: 60 * 1000 * 60 * 24 })
            return res.status(200).json(serviceResponse)
        }
    } catch (error) {
        return res.status(500).json({
            status: res.statusCode,
            message: "Internal Server Error"
        })
    }
}

const logout = async (req, res) => {
    try {
        res.clearCookie("jwt");
        return res.status(200).json({
            status: res.statusCode,
            message: "Logged out!"
        })
    } catch (error) {
        return res.status(500).json({
            status: res.statusCode,
            message: "Internal Server Error"
        })
    }
}
const finduserById = async (req, res) => {
    const { userId } = req.params;
    try {
        const user = await User.findById(userId)
        if (!user) {
            return res.status(404).json({ message: 'user not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
module.exports = {
    signUp,
    signIn,
    logout,
    finduserById
} 