import React, { useContext, useState } from "react";
import UserRequestRow from "../UserRequestRow/UserRequestRow";
import "./UserRequestTable.scss";
import { Context } from "../RequestManagement";
import chevron from "../../../assets/icon/chevron_up_down.svg";

const UserRequestTable = () => {
  const { users, setUsers } = useContext(Context);
  const [sortOption, setSortOption] = useState({
    name: "asc",
    role: "asc",
  });

  const handleClick = (e) => {
    if (e.target.innerText.trim() === "Full Name") {
      sortByName();
    } else if (e.target.innerText.trim() === "Role") {
      sortByStatus();
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

  const sortByStatus = () => {
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
      <table className="request-table">
        <thead>
          <tr>
            <th>
              <input type="checkbox" />
            </th>
            <th>RequestId</th>
            <th onClick={handleClick} className="sortable">
              Full Name
            </th>
            <th>Email Address</th>
            <th>Request Date</th>
            <th onClick={handleClick} className="sortable">
              Status
            </th>
            <th>Setting</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <UserRequestRow key={user.email} user={user} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserRequestTable;
