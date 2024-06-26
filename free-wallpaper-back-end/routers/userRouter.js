const express = require("express");
const { userController } = require("../controllers");
const bodyParser = require("body-parser");

const userRouter = express.Router();

userRouter.use(bodyParser.json());

userRouter.post("/sign-up", userController.signUp);
userRouter.post("/sign-in", userController.signIn);
userRouter.get("/logout", userController.logout);
userRouter.get("/", userController.getAllUsers);

module.exports = {
  userRouter,
};
