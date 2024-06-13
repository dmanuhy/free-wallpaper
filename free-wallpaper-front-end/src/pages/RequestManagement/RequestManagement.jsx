import React, { createContext, useState } from "react";
import SearchBar from "./SearchBar/SearchBar";
import UserRequestTable from "./UserRequestTable/UserRequestTable";
import Pagination from "./Pagination/Pagination";
import { usersArray } from "../AccountManagement/users";

export const Context = createContext();

const RequestManagement = () => {
  const [defaultUsers, setDefaultUsers] = useState(usersArray);
  const [users, setUsers] = useState(usersArray);

  //   const changeRequestStatus = (user, newRole) => {
  //     const newUsers = users.map((u) => {
  //       if (u.id === user.id) {
  //         // console.log(user, newRole);
  //         return { ...u, role: newRole };
  //       }
  //       return u;
  //     });

  //     const newDefaultUsers = defaultUsers.map((u) => {
  //       if (u.id === user.id) {
  //         return { ...u, role: newRole };
  //       }
  //       return u;
  //     });
  //     setUsers(newUsers);
  //     setDefaultUsers(newDefaultUsers);
  //   };
  return (
    <div className="container request-management">
      <Context.Provider value={{ users, setUsers, defaultUsers }}>
        <SearchBar />
        <UserRequestTable />
        <Pagination />
      </Context.Provider>
    </div>
  );
};

export default RequestManagement;
