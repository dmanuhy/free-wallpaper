const { albumRouter } = require("./albumRouter")
const { tagRouter } = require("./tagRouter")
const { userRouter } = require("./userRouter")
const { wallpaperRouter } = require("./wallpaperRouter")

module.exports = {
    userRouter,
    wallpaperRouter,
    tagRouter,
    albumRouter
}