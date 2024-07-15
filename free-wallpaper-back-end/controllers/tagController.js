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
const CheckAndAddTag = async (req, res, next) => {
    try {
        // Find existing tags in the database
        const existingTags = await Tag.find({ name: { $in: tags } }).exec();

        // Get the names of the existing tags
        const existingTagNames = existingTags.map(tag => tag.name);

        // Filter out tags that already exist
        const newTags = tags.filter(tag => !existingTagNames.includes(tag));

        // Create new tag documents
        const newTagDocs = newTags.map(tag => ({ name: tag }));

        // Insert new tags into the database
        if (newTagDocs.length > 0) {
            await Tag.insertMany(newTagDocs);
        }

        return res.status(200).send('Update Tag');
    } catch (error) {
        res.status(500).send('Server error');
    }
}

module.exports = {
    getAllTag
} 