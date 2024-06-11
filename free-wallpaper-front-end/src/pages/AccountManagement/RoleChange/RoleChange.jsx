import "./RoleChange.scss";
import { Context } from "../AccountManagement";
import { useContext } from "react";

const RoleChange = ({ toggleRoleChange, setRole, user }) => {
  const roles = ["Viewer", "Contributor"];
  const { changeUserRole } = useContext(Context);

  return (
    <div>
      <div
        className="role-change"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {roles.map((role) => (
          <button
            key={role}
            onClick={(e) => {
              changeUserRole(user, role);
              toggleRoleChange(e);
            }}
          >
            {role}
          </button>
        ))}

        <button onClick={toggleRoleChange}>Close</button>
      </div>
    </div>
  );
};

export default RoleChange;
