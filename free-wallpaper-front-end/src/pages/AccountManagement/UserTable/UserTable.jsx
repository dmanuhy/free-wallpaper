import React, { useContext } from "react";
import "./UserTable.scss";
import UserRow from "../UserRow/UserRow";
import { Context } from "../AccountManagement";

const UserTable = () => {
  const { users, currentPage, usersPerPage, requestSort, sortConfig } = useContext(Context);

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfFirstUser + usersPerPage);

  const getClassNamesFor = (name) => {
    if (!sortConfig) {
      return;
    }
    return sortConfig.key === name ? sortConfig.direction : undefined;
  };

  return (
    <table className="user-table">
      <thead>
        <tr>
          <th onClick={() => requestSort("name")} className={getClassNamesFor("name")}>
            Name
          </th>
          <th onClick={() => requestSort("email")} className={getClassNamesFor("email")}>
            Email
          </th>
          <th onClick={() => requestSort("location")} className={`hidden-xs ${getClassNamesFor("location")}`}>
            Location
          </th>
          <th onClick={() => requestSort("joined")} className={`hidden-xs ${getClassNamesFor("joined")}`}>
            Joined
          </th>
          <th onClick={() => requestSort("role")} className={getClassNamesFor("role")}>
            Role
          </th>
          <th>Block</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {currentUsers.map((user) => (
          <UserRow key={user.id} user={user} />
        ))}
      </tbody>
    </table>
  );
};

export default UserTable;
