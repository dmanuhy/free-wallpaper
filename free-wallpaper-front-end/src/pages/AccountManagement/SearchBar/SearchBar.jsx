import React, { useContext, useState } from "react";
import "./SearchBar.scss";
import { Context } from "../AccountManagement";

const SearchBar = () => {
  const { setUsers, defaultUsers, setCurrentPage } = useContext(Context);
  const [selectedRole, setSelectedRole] = useState("All");
  const [searchValue, setSearchValue] = useState("");

  const handleRoleChange = (event) => {
    const role = event.target.value;
    setSelectedRole(role);
    sortByRoleAndSearch(role, searchValue);
  };

  const handleSearch = (event) => {
    const searchValue = event.target.value;
    setSearchValue(searchValue);
    sortByRoleAndSearch(selectedRole, searchValue);
  };

  const sortByRoleAndSearch = (role, searchValue) => {
    let filteredUsers = defaultUsers;

    if (role !== "All") {
      if (role.toLowerCase() === "member") {
        filteredUsers = filteredUsers.filter(
          (user) => user.roles.length === 1 && user.roles[0].name.toLowerCase() === "member"
        );
      } else {
        filteredUsers = filteredUsers.filter((user) =>
          user.roles.some((r) => r.name.toLowerCase() === role.toLowerCase())
        );
      }
    }

    if (searchValue) {
      filteredUsers = filteredUsers.filter((user) => user.name.toLowerCase().includes(searchValue.toLowerCase()));
    }

    setUsers(filteredUsers);
    setCurrentPage(1);
  };

  return (
    <div className="search-bar__header">
      <div className="search-bar__inner">
        <input type="text" placeholder="Search users..." onChange={handleSearch} value={searchValue} />
        <select onChange={handleRoleChange} value={selectedRole}>
          <option disabled>Roles</option>
          <option>All</option>
          <option>Vip</option>
          <option>Member</option>
        </select>
      </div>
    </div>
  );
};

export default SearchBar;
