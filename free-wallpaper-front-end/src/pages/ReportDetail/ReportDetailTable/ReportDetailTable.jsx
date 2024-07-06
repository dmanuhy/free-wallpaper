import React, { useEffect, useState } from "react";
import ReportDetailRow from "../ReportDetailRow/ReportDetailRow";
import { ReportService } from "../../../services/ReportService";
import { useParams } from "react-router-dom";
import "./ReportDetailTable.scss";

const ReportDetailTable = () => {
  const [reports, setReports] = useState([]);
  const { id } = useParams();

  const getReportList = async () => {
    const response = await ReportService.getAllReportsService();
    if (response.status == 200) {
      const reportItems = response.data.filter((report) => report.wallpaper._id === id);

      setReports(reportItems);
    }
  };

  useEffect(() => {
    getReportList();
  }, []);

  return (
    <table className="report-detail-table">
      <thead>
        <tr>
          <th>Index</th>
          <th>Image Link</th>
          <th>Description</th>
          <th>Uploader</th>
          <th>Reporter</th>
        </tr>
      </thead>
      <tbody>
        {reports.map((report, index) => (
          <ReportDetailRow key={report._id} report={report} index={index + 1} />
        ))}
      </tbody>
    </table>
  );
};

export default ReportDetailTable;
