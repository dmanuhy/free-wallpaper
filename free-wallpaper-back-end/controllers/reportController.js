const { ReportService } = require("../services");
const db = require("../models");
const Report = db.report;

const getAllReports = async (req, res) => {
  try {
    const serviceResponse = await ReportService.getAllReportsService();
    console.log(serviceResponse);
    return res.status(serviceResponse.status).json(serviceResponse.data);
  } catch (error) {
    return {
      status: 500,
      message: "Internal Server Error đasad",
    };
  }
};

const deleteWallpaper = async (req, res) => {
  try {
    const wallpaperId = req.params.id;
    await WallpaperService.deleteWallpaperService(wallpaperId);
    return { status: 200, message: "Wallpaper deleted successfully" };
  } catch (error) {
    return res.status(500).json({ message: "Error deleting wallpaper", error });
  }
};

module.exports = {
  getAllReports,
  deleteWallpaper,
};
