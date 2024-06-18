import React, { useState, useContext } from "react";
import "./UserRow.scss";
import { Context } from "../AccountManagement";

const UserRow = ({ user }) => {
  const { blockedUsers, toggleBlockUser } = useContext(Context);

  const className = `badge ${user.role.toLowerCase()}`;
  const [isChanging, setIsChanging] = useState(false);

  const toggleRoleChange = (e) => {
    e.stopPropagation();
    setIsChanging(!isChanging);
  };

  const isBlocked = blockedUsers.includes(user.id);

  return (
    <tr className={isBlocked ? "blocked" : ""}>
      <td>{user.name}</td>
      <td>{user.email}</td>
      <td className="hidden-xs">{user.location}</td>
      <td className="hidden-xs">{user.joined}</td>
      <td>
        <span className={className}>{user.role}</span>
      </td>
      <td>
        <input
          type="checkbox"
          checked={isBlocked}
          onChange={() => {
            toggleBlockUser(user.id);
          }}
        />
      </td>
      {/* <td onClick={toggleRoleChange} className="dot-action">
        ...
        {isChanging && <RoleChange toggleRoleChange={toggleRoleChange} user={user} />}
      </td> */}
    </tr>
  );
};

export default UserRow;
