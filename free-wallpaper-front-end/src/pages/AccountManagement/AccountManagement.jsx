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
  const [currentPage, setCurrentPage] = useState(1);

  const [sortConfig, setSortConfig] = useState({ key: null, direction: "ascending" });
  const [blockedUsers, setBlockedUsers] = useState([]);

  const usersPerPage = 10;

  const changeUserRole = (user, newRole) => {
    const newUsers = users.map((u) => {
      if (u.id === user.id) {
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

  const addNewUser = (newUser) => {
    setUsers([...users, newUser]);
    setDefaultUsers([...defaultUsers, newUser]);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const sortedUsers = [...users].sort((a, b) => {
    if (sortConfig.key) {
      const order = sortConfig.direction === "ascending" ? 1 : -1;
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return -1 * order;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return 1 * order;
      }
      return 0;
    }
    return users;
  });

  const requestSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const toggleBlockUser = (userId) => {
    if (blockedUsers.includes(userId)) {
      setBlockedUsers(blockedUsers.filter((id) => id !== userId));
    } else {
      setBlockedUsers([...blockedUsers, userId]);
    }
  };

  return (
    <div className="container account-management">
      <Context.Provider
        value={{
          users: sortedUsers,
          setUsers,
          defaultUsers,
          changeUserRole,
          addNewUser,
          currentPage,
          setCurrentPage,
          usersPerPage,
          handlePageChange,
          requestSort,
          sortConfig,
          blockedUsers,
          toggleBlockUser,
        }}
      >
        <SearchBar />
        <UserTable />
        <Pagination />
      </Context.Provider>
    </div>
  );
};

export default AccountManagement;
