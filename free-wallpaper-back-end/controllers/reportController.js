const { ReportService } = require("../services");
const db = require("../models");
const Report = db.report;

const getAllReports = async (req, res) => {
  try {
    const serviceResponse = await ReportService.getAllReportsService();
    return res.status(serviceResponse.status).json(serviceResponse.data);
  } catch (error) {
    return {
      status: 500,
      message: "Internal Server Error",
    };
  }
};

module.exports = {
  getAllReports,
};
