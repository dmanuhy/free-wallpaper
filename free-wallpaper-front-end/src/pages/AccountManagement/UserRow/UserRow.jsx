import React, { useState, useContext } from "react";
import "./UserRow.scss";
import { Context } from "../AccountManagement";

const UserRow = ({ user }) => {
  const getRoleClassName = (roles) => {
    if (roles.some((role) => role.name === "admin")) return "badge admin";
    if (roles.some((role) => role.name === "vip")) return "badge vip";
    return `badge contributor`; // Default to 'contributor'
  };

  const className = getRoleClassName(user.roles);

  return (
    <tr className={!user.isActive ? "blocked" : ""}>
      <td>{user.name}</td>
      <td>{user.email}</td>
      <td className="hidden-xs">{user.dob}</td>
      <td>
        <span className={className}>
          {user.roles.some((role) => role.name === "admin")
            ? "admin"
            : user.roles.some((role) => role.name === "vip")
            ? "vip"
            : "contributor"}
        </span>
      </td>
      <td>
        <input type="checkbox" checked={!user.isActive} onChange={() => {}} />
      </td>
    </tr>
  );
};

export default UserRow;
