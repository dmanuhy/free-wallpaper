import { useState, useEffect } from "react";
import "./ReportTable.scss";
import { ReportService } from "../../../services/ReportService";
import ReportRow from "../ReportRow/ReportRow";

const ReportTable = () => {
  const [reports, setReports] = useState([]);

  const getReportList = async () => {
    const response = await ReportService.getAllReportsService();
    if (response.status === 200) {
      const uniqueReports = response.data.reduce((acc, report) => {
        if (!acc.some((r) => r.wallpaper._id === report.wallpaper._id)) {
          acc.push(report);
        }
        return acc;
      }, []);

      setReports(uniqueReports);
    }
  };

  const handleDeleteReport = (id) => {
    setReports(reports.filter((report) => report.wallpaper._id !== id));
  };

  useEffect(() => {
    getReportList();
  }, []);

  return (
    <table className="report-table">
      <thead>
        <tr>
          <th>Index</th>
          <th>Image ID</th>
          <th>Image Link</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {reports.map((report, index) => (
          <ReportRow key={report._id} report={report} index={index + 1} handleArrayChange={handleDeleteReport} />
        ))}
      </tbody>
    </table>
  );
};

export default ReportTable;
