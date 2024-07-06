import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./ReportRow.scss";
import { ReportService } from "../../../services/ReportService";

const ReportRow = ({ report, index, handleArrayChange }) => {
  const navigate = useNavigate();

  const handleDeleteWallpaperAndReport = async () => {
    const isConfirmed = window.confirm("Are you sure you want to delete this wallpaper and report?");
    if (isConfirmed) {
      try {
        const response = await ReportService.deleteWallPaperAndReportService(report.wallpaper._id);
        if (response.status === 200) {
          toast.success("Report and wallpaper deleted successfully!");
          handleArrayChange(report.wallpaper._id);
        }
      } catch (error) {
        console.log(error.message);
        toast.error("Failed to delete report and wallpaper.");
      }
    }
  };

  const handleDeleteReport = async () => {
    const isConfirmed = window.confirm("Are you sure you want to delete this report?");
    if (isConfirmed) {
      try {
        const response = await ReportService.deleteReportService(report.wallpaper._id);
        if (response.status === 200) {
          toast.success("Report deleted successfully!");
          handleArrayChange(report.wallpaper._id);
        }
      } catch (error) {
        console.log(error.message);
        toast.error("Failed to delete report.");
      }
    }
  };

  const handleNavigate = () => {
    navigate(`/management/report/${report.wallpaper._id}`);
  };

  return (
    <>
      <tr>
        <td>{index}</td>
        <td>{report.wallpaper._id}</td>
        <td className="">
          <Link to={`/wallpaper/${report.wallpaper._id}`}>Link</Link>
        </td>
        <td>
          <button className="btn btn-sm btn-primary" onClick={handleNavigate}>
            Detail
          </button>
          <button className="btn btn-sm btn-danger mx-2" onClick={handleDeleteReport}>
            Delete report
          </button>
          <button className="btn btn-sm btn-danger" onClick={handleDeleteWallpaperAndReport}>
            Delete report and image
          </button>
        </td>
      </tr>
    </>
  );
};

export default ReportRow;
