const express = require("express");
const bodyParser = require("body-parser");
const { reportController } = require("../controllers");
const { checkUserJWT, isAdmin } = require("../middlewares/JsonWebToken");

const reportRouter = express.Router();

reportRouter.use(bodyParser.json());

reportRouter.get("/", [checkUserJWT, isAdmin], reportController.getAllReports);
reportRouter.delete("/:id/delete", reportController.deleteWallpaper);

module.exports = {
  reportRouter,
};
