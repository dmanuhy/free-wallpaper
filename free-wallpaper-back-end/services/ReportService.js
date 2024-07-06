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

const deleteWallpaperAndReportService = async (wallpaperId) => {
  try {
    const wallpaper = await Wallpaper.findById(wallpaperId);
    const reports = await Report.findOne({ wallpaper: wallpaperId });

    if (!wallpaper || !reports) {
      return res.status(404).json({
        message: "Wallpaper not found",
      });
    }

    const reportRes = await Report.deleteMany({ wallpaper: wallpaperId });
    const wallPaperRes = await Wallpaper.deleteOne({ _id: wallpaperId });
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
const deleteReportService = async (wallpaperId) => {
  try {
    const result = await Report.deleteMany({ wallpaper: wallpaperId });

    if (!result) {
      return {
        status: 404,
        message: "No reports found for the specified wallpaper.",
      };
    }
    return {
      status: 200,
      message: `reports deleted successfully.`,
    };
  } catch (error) {
    return {
      status: 500,
      message: "Error deleting reports",
      error: error.message,
    };
  }
};

module.exports = {
  getAllReportsService,
  deleteWallpaperAndReportService,
  deleteReportService,
};
