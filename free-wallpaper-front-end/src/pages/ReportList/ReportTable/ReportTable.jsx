import { useState, useEffect } from "react";
import "./ReportTable.scss";
import { ReportService } from "../../../services/ReportService";
import ReportRow from "../ReportRow/ReportRow";

const ReportTable = () => {
  const [reports, setReports] = useState([]);

  const getReportList = async () => {
    const response = await ReportService.getAllReportsService();
    setReports(response);
  };

  useEffect(() => {
    getReportList();
  }, []);

  console.log(reports);

  return (
    <table className="report-table">
      <thead>
        <tr>
          <th>Index</th>
          <th>Image Link</th>
          <th>Description</th>
          <th>Uploader</th>
          <th>Reporter</th>
          <th>Delete</th>
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
