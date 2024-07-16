const { ReportService, UserService } = require("../services");
const db = require("../models");
const { on } = require("../models/user");
const Report = db.report;

const getAllReports = async (req, res) => {
  try {
    const serviceResponse = await ReportService.getAllReportsService();
    return res.status(serviceResponse.status).json(serviceResponse);
  } catch (error) {
    return res.status(500).json({ message: "Error fetching reports", error: error.message });
  }
};

const deleteWallpaperAndReport = async (req, res) => {
  try {
    const wallpaperId = req.params.id;
    const ownerId = req.body.ownerId;
    const response = await ReportService.deleteWallpaperAndReportService(wallpaperId);
    if (ownerId) {
      await UserService.sendNotificationService(ownerId, "One of your wallpapers has been deleted by Admin");
    }
    return res.json({ message: response.message, status: response.status });
  } catch (error) {
    return res.status(500).json({ message: "Error deleting wallpaper", error: error.message });
  }
};

const deleteReport = async (req, res) => {
  try {
    const reportId = req.params.id;
    const response = await ReportService.deleteReportService(reportId);
    return res.json({ message: response.message, status: response.status });
  } catch (error) {
    return res.status(500).json({ message: "Error deleting report", error });
  }
};

module.exports = {
  getAllReports,
  deleteWallpaperAndReport,
  deleteReport,
};
