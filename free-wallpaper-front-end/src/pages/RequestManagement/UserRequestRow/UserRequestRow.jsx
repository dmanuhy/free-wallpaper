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

  return (
    <tr>
      <td>
        <input type="checkbox" />
      </td>
      <td>{user.name}</td>
      <td>{user.email}</td>
      <td>{user.location}</td>
      <td>{user.joined}</td>
      <td>
        <span className={className}>{user.role}</span>
      </td>
      <td onClick={toggleStatusChange} className="dot-action">
        ...
        {isChanging && <StatusChange toggleStatusChange={toggleStatusChange} user={user} />}
      </td>
    </tr>
  );
};

export default UserRequestRow;