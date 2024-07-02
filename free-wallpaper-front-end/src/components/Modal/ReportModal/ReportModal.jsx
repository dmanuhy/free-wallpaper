import React, { useState } from "react";
import "./ReportModal.scss";

const ReportModal = ({ isOpen, onClose }) => {
  const [description, setDescription] = useState("");

  if (!isOpen) return null;

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
          <button className="cancel-button" onClick={onClose}>
            Cancel
          </button>
          <button className="report-button">Report</button>
        </div>
      </div>
    </div>
  );
};

export default ReportModal;
