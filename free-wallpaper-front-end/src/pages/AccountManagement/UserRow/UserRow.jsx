import React, { useState, useContext } from "react";
import "./UserRow.scss";
import { Context } from "../AccountManagement";
import { UserService } from "../../../services/UserService";

const UserRow = ({ user }) => {
  const { setUsers, users, setDefaultUsers } = useContext(Context);

  const getRoleClassName = (roles) => {
    if (roles.some((role) => role.name === "admin")) return "badge admin";
    if (roles.some((role) => role.name === "vip")) return "badge vip";
    return `badge member`;
  };

  const className = getRoleClassName(user.roles);

  const handleBlockUser = async () => {
    try {
      const response = await UserService.blockUserService(user._id, !user.isActived);
      console.log(!user.isActived);
      console.log(response);

      if (response.status == 200) {
        const updatedUsers = users.map((u) => {
          if (u._id === user._id) {
            return { ...u, isActived: !u.isActived };
          }
          return u;
        });
        setUsers(updatedUsers);
        setDefaultUsers(updatedUsers);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <tr className={!user.isActived ? "blocked" : ""}>
      <td>{user.name}</td>
      <td>{user.email}</td>
      <td className="hidden-xs">{user.dob && new Date(user.dob).toLocaleDateString("vi-VN")}</td>
      <td>
        <span className={className}>
          {user.roles.some((role) => role.name === "admin")
            ? "admin"
            : user.roles.some((role) => role.name === "vip")
            ? "vip"
            : "member"}
        </span>
      </td>
      <td>
        <input type="checkbox" checked={!user.isActived} onChange={handleBlockUser} />
      </td>
    </tr>
  );
};

export default UserRow;
