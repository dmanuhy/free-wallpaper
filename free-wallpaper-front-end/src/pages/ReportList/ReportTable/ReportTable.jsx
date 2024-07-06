import { useState, useEffect } from "react";
import "./ReportTable.scss";
import { ReportService } from "../../../services/ReportService";
import ReportRow from "../ReportRow/ReportRow";

const ReportTable = () => {
  const [reports, setReports] = useState([]);

  const getReportList = async () => {
    const response = await ReportService.getAllReportsService();

    const uniqueReports = response.reduce((acc, report) => {
      if (!acc.some((r) => r.wallpaper._id === report.wallpaper._id)) {
        acc.push(report);
      }
      return acc;
    }, []);

    setReports(uniqueReports);
  };

  useEffect(() => {
    getReportList();
  }, []);

  return (
    <table className="report-table">
      <thead>
        <tr>
          <th>Image ID</th>
          <th>Image Link</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {reports.map((report, index) => (
          <ReportRow key={report._id} report={report} index={index + 1} />
        ))}
      </tbody>
    </table>
  );
};

export default ReportTable;
