//Lưu trữ thông tin về các tag được sử dụng để phân loại wallpaper.
const mongoose = require('mongoose');

const RoleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
}, { timestamps: true });

let Role = mongoose.model("role", RoleSchema);

module.exports = Role;
