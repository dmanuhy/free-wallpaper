const { UserService } = require("../services")

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

const signIn = async (req, res, next) => {
    try {

    } catch (error) {
        return res.status(500).json({
            status: res.statusCode,
            message: "Internal Server Error"
        })
    }
}

module.exports = {
    signUp,
    signIn
} 