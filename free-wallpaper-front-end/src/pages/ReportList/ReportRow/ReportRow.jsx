import React from "react";
import { Link } from "react-router-dom";

const ReportRow = ({ report, index }) => {
  return (
    <tr>
      <td>{index}</td>
      <td>
        <Link to={`/wallpaper/${report.wallpaper._id}`}>Link</Link>
      </td>
      <td>{report.reason}</td>
      <td>{report.wallpaper.createdBy.name}</td>
      <td>{report.reporter.name}</td>
      <td>
        <button>Delete</button>
      </td>
    </tr>
  );
};

export default ReportRow;
