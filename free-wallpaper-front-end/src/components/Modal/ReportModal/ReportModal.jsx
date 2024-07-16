import React, { useState, useEffect } from "react";
import "./ReportModal.scss";
import { WallpaperService } from "../../../services/WallpaperService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const ReportModal = ({ isOpen, onClose, id }) => {
  const [description, setDescription] = useState("");

  if (!isOpen) return null;

  const handleModalReport = async () => {
    const jwt = Cookies.get("jwt");
    if (!jwt) {
      toast.error("Please log in to report an image.");
      return;
    }

    if (!description.trim()) {
      toast.error("Please enter a description.");
      return;
    }

    if (description.length > 80) {
      toast.error("Description is too long. Please enter a description with less than 80 characters.");
      return;
    }

    try {
      const response = await WallpaperService.reportWallpaperService(id, description);
      if (response.status === 201) {
        toast.success("Report created successfully.", {
          position: "top-right",
          autoClose: 3000,
          closeOnClick: true,
          pauseOnHover: false,
        });
        setDescription("");
        onClose();
      } else if (response.status === 409) {
        toast.error("This image has already been reported.");
      } else {
        toast.error("An error occurred while reporting the image. Please try again later.");
      }
    } catch (error) {
      toast.error("An error occurred while reporting the image. Please try again later.");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="report-modal">
        <div className="modal-header">
          <h2>Report description</h2>
          <button className="close-button" onClick={onClose}>
            ×
          </button>
        </div>
        <div className="modal-content">
          <h3>What is the issue?</h3>
          <textarea
            placeholder="Please tell us why you are reporting this image"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="modal-footer">
          <button
            className="cancel-button"
            onClick={() => {
              onClose();
              setDescription("");
            }}
          >
            Cancel
          </button>
          <button className="report-button" onClick={handleModalReport}>
            Report
          </button>
        </div>
      </div>
      <ToastContainer autoClose={2000} newestOnTop={true} closeOnClick pauseOnFocusLoss={false} pauseOnHover={false} />
    </div>
  );
};

export default ReportModal;
