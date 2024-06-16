import React, { useState } from "react";
import "./UserRequestRow.scss";
import StatusChange from "../StatusChange/StatusChange";

const UserRequestRow = ({ user }) => {
  const className = `badge ${user.role.toLowerCase()}`;
  const [isChanging, setIsChanging] = useState(false);

  const toggleStatusChange = (e) => {
    e.stopPropagation();
    setIsChanging(!isChanging);
  };

  let status = "";

  if (user.role === "Admin") {
    status = "Approved";
  } else if (user.role === "Contributor") {
    status = "Pending";
  } else if (user.role === "Viewer") {
    status = "Rejected";
  }

  return (
    <tr>
      <td>
        <input type="checkbox" />
      </td>
      <td>{user.id}</td>
      <td>{user.email}</td>
      <td>{user.location}</td>
      <td>{user.joined}</td>
      <td>
        <span className={className}>{status}</span>
      </td>
      <td onClick={toggleStatusChange} className="dot-action">
        ...
        {isChanging && <StatusChange toggleStatusChange={toggleStatusChange} user={user} />}
      </td>
    </tr>
  );
};

export default UserRequestRow;
