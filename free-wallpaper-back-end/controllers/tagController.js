const db = require("../models");

const getAllTag = async (req, res, next) => {
    try {
        const response = await db.tag.find({})
        return res.status(200).json({
            status: res.statusCode,
            data: response
        })
    } catch (error) {
        return res.status(500).json({
            status: res.statusCode,
            message: "Internal Server Error"
        })
    }
}

const getTagsByKey = async (req, res, next) => {
    try {
        const response = await db.tag.find({ name: { $regex: req.params.value, $options: 'i' } })
        return res.status(200).json({
            status: res.statusCode,
            data: response
        })
    } catch (error) {
        return res.status(500).json({
            status: res.statusCode,
            message: "Internal Server Error"
        })
    }
}

module.exports = {
    getAllTag,
    getTagsByKey
} 