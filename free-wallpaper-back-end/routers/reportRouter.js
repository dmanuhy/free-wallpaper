const express = require("express");
const bodyParser = require("body-parser");
const { reportController } = require("../controllers");
const { checkUserJWT, isAdmin } = require("../middlewares/JsonWebToken");

const reportRouter = express.Router();

reportRouter.use(bodyParser.json());

reportRouter.get("/", [checkUserJWT, isAdmin], reportController.getAllReports);
reportRouter.delete("/delete/:id", reportController.deleteWallpaperAndReport);
reportRouter.delete("/:id", reportController.deleteReport);

module.exports = {
  reportRouter,
};
