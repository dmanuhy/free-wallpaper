import React from "react";
import ReportTable from "./ReportTable/ReportTable";

const ReportList = () => {
  return (
    <div className="container">
      <h1 className="text-center fw-bold">List of reported images</h1>
      <ReportTable />
    </div>
  );
};

export default ReportList;
