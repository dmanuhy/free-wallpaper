import React from "react";
import "./SearchBar.scss";
import AddUserButton from "../AddUser/AddUserButton";

const SearchBar = () => {
  return (
    <div className="header">
      <div className="search-bar">
        <input type="text" placeholder="Search users..." />
        <select>
          <option>Permissions</option>
          <option>All</option>
          <option>Admin</option>
          <option>Contributor</option>
          <option>Viewer</option>
        </select>
        <select>
          <option>Joined</option>
          <option>Anytime</option>
          <option>Last 30 days</option>
          <option>Last 6 months</option>
          <option>Last year</option>
        </select>
      </div>
      <div>
        <AddUserButton />
      </div>
    </div>
  );
};

export default SearchBar;
