import React, { useContext, useEffect, useState } from "react";
import UserRow from "../UserRow/UserRow";
import "./UserTable.scss";
import { Context } from "../AccountManagement";
import chevron from "../../../assets/icon/chevron_up_down.svg";

const UserTable = () => {
  const { users, setUsers } = useContext(Context);
  const [sortOption, setSortOption] = useState({
    name: "asc",
    role: "asc",
  });

  const handleClick = (e) => {
    if (e.target.innerText.trim() === "Full Name") {
      sortByName();
    } else if (e.target.innerText.trim() === "Role") {
      sortByRole();
    }
  };

  const sortByName = () => {
    if (sortOption.name === "asc") {
      const newUsers = users.sort((a, b) => (a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1));
      setUsers(newUsers);
      setSortOption({ ...sortOption, name: "desc" });
    } else if (sortOption.name === "desc") {
      const newUsers = users.sort((a, b) => (a.name.toLowerCase() > b.name.toLowerCase() ? -1 : 1));
      setUsers(newUsers);
      setSortOption({ ...sortOption, name: "asc" });
    }
  };

  const sortByRole = () => {
    if (sortOption.role === "asc") {
      const newUsers = users.sort((a, b) => (a.role.toLowerCase() < b.role.toLowerCase() ? -1 : 1));
      setUsers(newUsers);
      setSortOption({ ...sortOption, role: "desc" });
    } else if (sortOption.role === "desc") {
      const newUsers = users.sort((a, b) => (a.role.toLowerCase() > b.role.toLowerCase() ? -1 : 1));
      setUsers(newUsers);
      setSortOption({ ...sortOption, role: "asc" });
    }
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>
              <input type="checkbox" />
            </th>
            <th onClick={handleClick} className="sortable">
              Full Name <img src={chevron} alt="chevron" />
            </th>
            <th>Email Address</th>
            <th>Location</th>
            <th>Joined</th>
            <th onClick={handleClick} className="sortable">
              Role <img src={chevron} alt="chevron" />
            </th>
            <th>Setting</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <UserRow key={user.email} user={user} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
