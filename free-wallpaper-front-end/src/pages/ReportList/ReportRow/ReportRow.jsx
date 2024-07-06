import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./ReportRow.scss";
import { WallpaperService } from "../../../services/WallpaperService";

const ReportRow = ({ report, index }) => {
  const navigate = useNavigate();

  const handleDeleteImage = async () => {
    try {
      const response = await WallpaperService.deleteWallPaperService(report.wallpaper._id);
      console.log(response);
    } catch (error) {
      console.log(error.message);
    }
  };

  const confirmDeleteImage = () => {
    const isConfirmed = window.confirm("Are you sure you want to delete this image?");
    if (isConfirmed) {
      handleDeleteImage();
    }
  };

  const handleNavigate = () => {
    navigate(`/management/report/${report.wallpaper._id}`);
  };

  return (
    <tr>
      <td>{report.wallpaper._id}</td>
      <td className="">
        <Link to={`/wallpaper/${report.wallpaper._id}`}>Link</Link>
        {/* <button className="btn btn-sm btn-primary" onClick={confirmDeleteImage}>
          Delete Image
        </button> */}
      </td>
      {/* <td className="reason">{report.reason}</td>
      <td>{report.wallpaper.createdBy.name}</td>
      <td>{report.reporter.name}</td> */}
      <td>
        <button className="btn btn-sm btn-primary" onClick={handleNavigate}>
          Detail
        </button>
      </td>
    </tr>
  );
};

export default ReportRow;
