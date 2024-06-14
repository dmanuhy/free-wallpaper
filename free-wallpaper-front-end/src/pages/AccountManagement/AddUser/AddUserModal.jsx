import React, { useState, useContext } from "react";
import { Context } from "../AccountManagement";
import "./AddUserModal.scss";

const AddUserModal = ({ show, handleClose }) => {
  const { addNewUser } = useContext(Context);

  const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("viewer");

  const roles = ["Viewer", "Contributor", "Admin"];

  const handleSave = () => {
    const userData = { email, role, name };
    addNewUser(userData);
    handleClose();
  };

  if (!show) {
    return null;
  }

  return (
    <>
      <div className="add-user__modal">
        <div className="modal-header">
          <h2>Add User</h2>
          <button className="close-button" onClick={handleClose}>
            &times;
          </button>
        </div>
        <div className="modal-body">
          <label>
            Full Name:
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
          </label>
          <label>
            Email:
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </label>
          {/* <label>
            Password:
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </label> */}
          <label>
            Role:
            <select value={role} onChange={(e) => setRole(e.target.value)}>
              {roles.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className="modal-footer">
          <button onClick={handleSave}>Save</button>
          <button onClick={handleClose}>Cancel</button>
        </div>
      </div>
      <div className="modal-overlay" onClick={handleClose}></div>
    </>
  );
};

export default AddUserModal;
