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
      filteredUsers = filteredUsers.filter((user) => user.role === role);
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
          <option>Contributor</option>
          <option>Viewer</option>
        </select>
      </div>
    </div>
  );
};

export default SearchBar;
