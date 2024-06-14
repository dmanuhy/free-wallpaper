import React, { useContext, useState } from "react";
import "./SearchBar.scss";
import { Context } from "../RequestManagement";

const SearchBar = () => {
  const { setUsers, defaultUsers } = useContext(Context);
  // const [selectedRole, setSelectedRole] = useState("All");
  const [searchValue, setSearchValue] = useState("");

  // const handleRoleChange = (event) => {
  //   const role = event.target.value;
  //   setSelectedRole(role);
  //   sortByRoleAndSearch(role, searchValue);
  // };

  const handleSearch = (event) => {
    const searchValue = event.target.value;
    setSearchValue(searchValue);
    sortByRoleAndSearch(searchValue);
  };

  const sortByRoleAndSearch = (searchValue) => {
    let filteredUsers = defaultUsers;

    if (searchValue) {
      filteredUsers = filteredUsers.filter((user) => user.name.toLowerCase().includes(searchValue.toLowerCase()));
    }

    setUsers(filteredUsers);
  };

  return (
    <div className="header">
      <div className="search-bar">
        {/* <input type="text" placeholder="Search users..." /> */}
        <input type="text" placeholder="Search users..." onChange={handleSearch} value={searchValue} />
        {/* <select onChange={handleRoleChange} value={selectedRole}>
          <option disabled>Roles</option>
          <option>All</option>
          <option>Admin</option>
          <option>Contributor</option>
          <option>Viewer</option>
        </select> */}
      </div>
    </div>
  );
};

export default SearchBar;
