import React from "react";
import UserRow from "../UserRow/UserRow";
import "./UserTable.scss";

const UserTable = () => {
  const users = [
    {
      id: 1,
      name: "Leslie Maya",
      email: "leslie@gmail.com",
      location: "Los Angeles, CA",
      joined: "October 2, 2010",
      permission: "Admin",
      avatar: "https://randomuser.me/api/portraits/women/1.jpg",
    },
    {
      id: 2,
      name: "Josie Deck",
      email: "josie@gmail.com",
      location: "Cheyenne, WY",
      joined: "October 3, 2011",
      permission: "Admin",
      avatar: "https://randomuser.me/api/portraits/women/2.jpg",
    },
    {
      id: 3,
      name: "Alex Pfeiffer",
      email: "alex@gmail.com",
      location: "Cheyenne, WY",
      joined: "May 20, 2015",
      permission: "Admin",
      avatar: "https://randomuser.me/api/portraits/men/3.jpg",
    },
    {
      id: 4,
      name: "Mike Dean",
      email: "mike@gmail.com",
      location: "Syracuse, NY",
      joined: "July 14, 2015",
      permission: "Contributor",
      avatar: "https://randomuser.me/api/portraits/men/4.jpg",
    },
    {
      id: 5,
      name: "Mateus Cunha",
      email: "cunha@gmail.com",
      location: "Luanda, AN",
      joined: "October, 2016",
      permission: "Contributor",
      avatar: "https://randomuser.me/api/portraits/men/5.jpg",
    },
    {
      id: 6,
      name: "Nzola Uemo",
      email: "nzola@gmail.com",
      location: "Lagos, NG",
      joined: "June 5, 2016",
      permission: "Viewer",
      avatar: "https://randomuser.me/api/portraits/women/6.jpg",
    },
    {
      id: 7,
      name: "Antony Mack",
      email: "mack@gmail.com",
      location: "London, ENG",
      joined: "June 15, 2015",
      permission: "Contributor",
      avatar: "https://randomuser.me/api/portraits/men/7.jpg",
    },
    {
      id: 8,
      name: "André da Silva",
      email: "andré@gmail.com",
      location: "São Paulo, BR",
      joined: "March 13, 2018",
      permission: "Contributor",
      avatar: "https://randomuser.me/api/portraits/men/8.jpg",
    },
    {
      id: 9,
      name: "Jorge Ferreira",
      email: "jorge@gmail.com",
      location: "Huambo, Angola",
      joined: "March 14, 2018",
      permission: "Contributor",
      avatar: "https://randomuser.me/api/portraits/men/9.jpg",
    },
  ];

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>
              <input type="checkbox" />
            </th>
            <th>Full Name</th>
            <th>Email Address</th>
            <th>Location</th>
            <th>Joined</th>
            <th>Permissions</th>
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
