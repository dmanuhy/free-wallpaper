const db = require("../models");
const Report = db.report;
const User = db.user;
const Wallpaper = db.wallpaper;

const getAllReportsService = async (req, res) => {
  try {
    const reports = await Report.find({})
      .populate([
        {
          path: "reporter",
        },
        {
          path: "wallpaper",
          select: "createdBy",
        },
      ])
      .lean();

    if (reports) {
      const reportWithUsers = await Promise.all(
        reports.map(async (report) => {
          const wallpaperUploaderId = report.wallpaper.createdBy;
          const wallpaperUploader = await User.findById(wallpaperUploaderId);

          return {
            ...report,
            wallpaper: {
              ...report.wallpaper,
              createdBy: {
                _id: wallpaperUploader._id,
                name: wallpaperUploader.name,
              },
            },
            reporter: {
              _id: report.reporter._id,
              name: report.reporter.name,
            },
          };
        })
      );
      return {
        status: 200,
        message: "Get all reports successfully!",
        data: reportWithUsers,
      };
    } else {
      return {
        status: 404,
        message: "No reports found",
      };
    }
  } catch (error) {
    return {
      status: 500,
      message: "Error fetching reports: " + error.message,
    };
  }
};

const deleteWallpaperService = async (id) => {
  try {
    const wallpaper = await Wallpaper.findById(id);

    if (!wallpaper) {
      return {
        status: 404,
        message: "Wallpaper not found",
      };
    }

    await Wallpaper.deleteOne({ _id: id });
    return {
      status: 200,
      message: "Wallpaper deleted successfully",
    };
  } catch (error) {
    return {
      status: 500,
      message: "Error deleting wallpaper",
      error: error.message,
    };
  }
};

module.exports = {
  getAllReportsService,
  deleteWallpaperService,
};
