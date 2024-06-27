const db = require("../models")
const { v4 } = require("uuid")
const bcrypt = require("bcrypt")
const { createJWT } = require("../middlewares/JsonWebToken")

const getRoles = async (roleName) => {
    let role = await db.role.findOne({ name: roleName }).select("_id");
    if (!role) {
        role = await db.role.create({ name: roleName })
    }
    return role;
}

const signUpService = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await db.user.findOne({ email: data.email }).select("email")
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

const signInService = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const existUser = await db.user.findOne({ email: data.email })
                .populate({
                    path: "roles"
                })
            if (!existUser) {
                resolve({
                    status: 401,
                    message: "Email or password is wrong"
                })
            }
            else {
                if (!existUser.isActived) {
                    resolve({
                        status: 401,
                        message: "This account is locked!. Please contact admin"
                    })
                }
                else {
                    const isCorrectPassword = bcrypt.compareSync(data.password, existUser.password)
                    if (isCorrectPassword) {
                        const payload = {
                            _id: existUser._id,
                            name: existUser.name,
                            email: existUser.email,
                            roles: existUser.roles,
                            isActived: existUser.isActived
                        }
                        const token = createJWT(payload)
                        resolve({
                            status: 200,
                            message: "Authenticated successfully!",
                            data: {
                                _id: existUser._id,
                                name: existUser.name,
                                email: existUser.email,
                                roles: existUser.roles,
                                isActived: existUser.isActived
                            },
                            token: token,
                        })
                    } else {
                        resolve({
                            error: 1,
                            message: "Wrong account or password"
                        })
                    }
                }
            }
        } catch (e) {
            reject(e)
        }
    })
}



module.exports = {
    signUpService,
    signInService
}