import React, { useState } from "react";
import "./UserRow.scss";
import RoleChange from "../RoleChange/RoleChange";

const UserRow = ({ user }) => {
  const className = `badge ${user.role.toLowerCase()}`;
  const [isChanging, setIsChanging] = useState(false);

  const toggleRoleChange = (e) => {
    e.stopPropagation();
    setIsChanging(!isChanging);
  };

  return (
    <tr>
      <td>{user.name}</td>
      <td>{user.email}</td>
      <td>{user.location}</td>
      <td>{user.joined}</td>
      <td>
        <span className={className}>{user.role}</span>
      </td>
      <td onClick={toggleRoleChange} className="dot-action">
        ...
        {isChanging && <RoleChange toggleRoleChange={toggleRoleChange} user={user} />}
      </td>
    </tr>
  );
};

export default UserRow;
