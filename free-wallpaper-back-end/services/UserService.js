const db = require("../models")
const { v4 } = require("uuid")
const bcrypt = require("bcrypt")

const checkEmail = async (email) => {
    const user = await db.user.findOne({ email: email })
    return user ? user : null
}

const getRoles = async (roleName) => {
    const role = await db.role.findOne({ name: roleName }).select("_id");
    return role;
}

const signUpService = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await checkEmail(data.email)
            if (user) {
                resolve({
                    status: 409,
                    message: "This Email is already used."
                })
            } else {
                //create password & token
                const token = v4();
                const hashPassword = bcrypt.hashSync(data.password, parseInt(process.env.PASSWORD_HASH_KEY));
                const roles = await getRoles("member")
                await db.user.create({
                    name: data.name,
                    email: data.email,
                    password: hashPassword,
                    roles: [roles._id],
                    token: token,
                    isActived: true
                })
                //Send email to notice host admin

                // data.activeLink = `${process.env.FRONT_END_URL}/active-account/${token}`;
                // await EmailService.sendRegisterRequest(data);
                resolve({
                    status: 201,
                    message: "Registed successfully"
                })
            }
        } catch (e) {
            reject({
                status: 500,
                message: e.message
            })
        }
    })
}

module.exports = {
    signUpService
}