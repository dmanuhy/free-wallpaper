const express = require("express");
const { userController } = require("../controllers");
const bodyParser = require("body-parser");

const userRouter = express.Router();

userRouter.use(bodyParser.json());

userRouter.post("/sign-up", userController.signUp);
userRouter.post("/sign-in", userController.signIn);
userRouter.get("/logout", userController.logout);
userRouter.get("/:userId", userController.finduserById);
userRouter.get("/", userController.getAllUsers);
userRouter.patch("/:id", userController.blockUser);

module.exports = {
  userRouter,
};
