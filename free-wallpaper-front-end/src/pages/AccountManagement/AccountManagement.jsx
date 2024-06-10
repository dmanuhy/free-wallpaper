import React from "react";
import UserTable from "./UserTable/UserTable";
import SearchBar from "./SearchBar/SearchBar";
import Pagination from "./Pagination/Pagination";
import "./AccountManagement.scss";
const AccountManagement = () => {
  return (
    <div className="container account-management">
      <SearchBar />
      <UserTable />
      <Pagination />
    </div>
  );
};

export default AccountManagement;
