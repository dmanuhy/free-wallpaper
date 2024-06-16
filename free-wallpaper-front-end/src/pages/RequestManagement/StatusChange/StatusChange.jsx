import "./StatusChange.scss";
import { useContext } from "react";
import { Context } from "../RequestManagement";

const StatusChange = ({ toggleStatusChange, setRole, user }) => {
  const status = ["Approved", "Pending", "Rejected"];
  const { changeRequestStatus } = useContext(Context);

  return (
    <div>
      <div
        className="role-change"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {status.map((role) => (
          <button
            key={role}
            onClick={(e) => {
              changeRequestStatus(user, role);
              toggleStatusChange(e);
            }}
          >
            {role}
          </button>
        ))}

        <button onClick={toggleStatusChange}>Close</button>
      </div>
    </div>
  );
};

export default StatusChange;
