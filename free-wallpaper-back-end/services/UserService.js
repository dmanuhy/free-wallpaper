const db = require("../models")
const { v4 } = require("uuid")
const bcrypt = require("bcrypt")
const { createJWT } = require("../middlewares/JsonWebToken")

const getRoles = async (roleName) => {
    const role = await db.role.findOne({ name: roleName }).select("_id");
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
            const existUser = await db.user.findOne({ email: data.email }).select("email isActived password")
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
                    const userData = await db.user.findOne({ email: data.email })
                        .populate({
                            path: "roles"
                        })
                        .populate({
                            path: "albums",
                            select: "_id name wallpapers",
                            populate: {
                                path: "wallpapers",
                                select: "imageUrl"
                            }
                        })
                        .populate({
                            path: "shared",
                            select: "_id name wallpapers",
                            populate: {
                                path: "wallpapers",
                                select: "imageUrl"
                            }
                        })
                        .populate({
                            path: "liked"
                        });
                    if (isCorrectPassword) {
                        const payload = {
                            name: userData.name,
                            email: userData.email,
                            roles: userData.roles,
                            isActived: userData.isActived
                        }
                        const token = createJWT(payload)
                        resolve({
                            status: 200,
                            message: "Authenticated successfully!",
                            data: {
                                name: userData.name,
                                isActived: userData.isActived,
                                roles: userData.roles,
                                albums: userData.albums,
                                shared: userData.shared,
                                liked: userData.liked
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