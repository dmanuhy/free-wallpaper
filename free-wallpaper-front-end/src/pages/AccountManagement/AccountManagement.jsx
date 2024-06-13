import React, { createContext, useState } from "react";
import UserTable from "./UserTable/UserTable";
import SearchBar from "./SearchBar/SearchBar";
import Pagination from "./Pagination/Pagination";
import "./AccountManagement.scss";
import { usersArray } from "./users";
export const Context = createContext();

const AccountManagement = () => {
  const [defaultUsers, setDefaultUsers] = useState(usersArray);
  const [users, setUsers] = useState(usersArray);

  const changeUserRole = (user, newRole) => {
    const newUsers = users.map((u) => {
      if (u.id === user.id) {
        // console.log(user, newRole);
        return { ...u, role: newRole };
      }
      return u;
    });

    const newDefaultUsers = defaultUsers.map((u) => {
      if (u.id === user.id) {
        return { ...u, role: newRole };
      }
      return u;
    });
    setUsers(newUsers);
    setDefaultUsers(newDefaultUsers);
  };

  return (
    <div className="container account-management">
      <Context.Provider value={{ users, setUsers, defaultUsers, changeUserRole }}>
        <SearchBar />
        <UserTable />
        <Pagination />
      </Context.Provider>
    </div>
  );
};

export default AccountManagement;
