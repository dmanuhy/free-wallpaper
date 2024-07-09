const express = require("express");
const { userController } = require("../controllers");
const bodyParser = require("body-parser");
const { checkUserJWT } = require("../middlewares/JsonWebToken");

const userRouter = express.Router();

userRouter.use(bodyParser.json());

userRouter.post("/sign-up", userController.signUp);
userRouter.post("/sign-in", userController.signIn);
userRouter.get("/logout", userController.logout);
userRouter.get("/:userId", userController.finduserById);
userRouter.get("/", userController.getAllUsers);
userRouter.patch("/:id", userController.blockUser);
userRouter.post("/get-notification", userController.getUserNotification)
userRouter.post("/get-liked-wallpaper", checkUserJWT, userController.getUserLikedWallpaper)
userRouter.post("/update-liked-wallpaper", checkUserJWT, userController.updateUserLikedWallpaper)

module.exports = {
  userRouter,
};
