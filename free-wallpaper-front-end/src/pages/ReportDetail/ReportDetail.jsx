import React from "react";
import { useNavigate } from "react-router-dom";
import ReportDetailTable from "./ReportDetailTable/ReportDetailTable";

const ReportDetail = () => {
  const navigate = useNavigate();

  const toReportList = () => {
    navigate("/management/report");
  };

  return (
    <div className="container">
      <h1 className="fw-bold text-center">Reported image detail</h1>
      <button className="btn btn-primary " onClick={toReportList}>
        Back to Report List
      </button>
      <ReportDetailTable />
    </div>
  );
};

export default ReportDetail;
