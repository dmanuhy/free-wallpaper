import React from "react";
import "./UserRow.scss";

const UserRow = ({ user }) => {
  const className = `badge ${user.permission.toLowerCase()}`;
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
        <span className={className}>{user.permission}</span>
      </td>
      <td>...</td>
    </tr>
  );
};

export default UserRow;
