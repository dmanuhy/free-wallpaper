import axios from "../axios";

const getAllReportsService = () => {
  return axios.get("/report");
};

const deleteWallPaperAndReportService = (wallpaperId) => {
  return axios.delete(`/report/delete/${wallpaperId}`);
};

const deleteReportService = (id) => {
  return axios.delete(`/report/${id}`);
};

export const ReportService = {
  getAllReportsService,
  deleteWallPaperAndReportService,
  deleteReportService,
};
