const { albumRouter } = require("./albumRouter");
const { tagRouter } = require("./tagRouter");
const { userRouter } = require("./userRouter");
const { wallpaperRouter } = require("./wallpaperRouter");
const { reportRouter } = require("./reportRouter");

module.exports = {
  userRouter,
  wallpaperRouter,
  tagRouter,
  albumRouter,
  reportRouter,
};
