import axios from "../axios";

const getAllReportsService = () => {
  return axios.get("/report");
};

const deleteWallPaperAndReportService = (wallpaperId, ownerId) => {
  return axios.post(`/report/delete/${wallpaperId}`, { ownerId });
};

const deleteReportService = (id) => {
  return axios.delete(`/report/${id}`);
};

export const ReportService = {
  getAllReportsService,
  deleteWallPaperAndReportService,
  deleteReportService,
};
