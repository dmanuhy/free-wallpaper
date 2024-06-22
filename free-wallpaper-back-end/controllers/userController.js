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

const signIn = async (req, res) => {
    try {
        if (!req.body.email || !req.body.password) {
            return res.status(422).json({
                status: res.statusCode,
                message: "Vui lòng điền đầy đủ thông tin"
            })
        } else {
            const serviceResponse = await UserService.signInService(req.body)
            // res.cookie("jwt", serviceResponse.token, { httpOnly: true, maxAge: 60 * 1000 * 60 * 24 })
            return res.status(200).json(serviceResponse)
        }
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    signUp,
    signIn
} 