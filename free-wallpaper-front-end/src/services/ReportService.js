import axios from "../axios";

const getAllReportsService = () => {
  return axios.get("/report");
};

export const ReportService = {
  getAllReportsService,
};
