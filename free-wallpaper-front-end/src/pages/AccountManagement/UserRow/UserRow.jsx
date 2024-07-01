import React, { useState, useContext } from "react";
import "./UserRow.scss";
import { Context } from "../AccountManagement";
import { UserService } from "../../../services/UserService";

const UserRow = ({ user }) => {
  const { setUsers, users, setDefaultUsers } = useContext(Context);

  const getRoleClassName = (roles) => {
    if (roles.some((role) => role.name === "admin")) return "badge admin";
    if (roles.some((role) => role.name === "vip")) return "badge vip";
    return `badge contributor`; // Default to 'contributor'
  };

  const className = getRoleClassName(user.roles);

  // const handleBlockUser = () => {
  //   const updatedUsers = users.map((u) => {
  //     if (u._id === user._id) {
  //       return { ...u, isActive: !u.isActive };
  //     }
  //     return u;
  //   });
  //   setUsers(updatedUsers);
  //   setDefaultUsers(updatedUsers);
  // };

  const handleBlockUser = async () => {
    try {
      const response = await UserService.blockUserService(user._id, !user.isActive);
      console.log(!user.isActive);
      console.log(response);

      if (response.status == 200) {
        const updatedUsers = users.map((u) => {
          if (u._id === user._id) {
            return { ...u, isActive: !u.isActive };
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
        <input type="checkbox" checked={!user.isActive} onChange={handleBlockUser} />
      </td>
    </tr>
  );
};

export default UserRow;
