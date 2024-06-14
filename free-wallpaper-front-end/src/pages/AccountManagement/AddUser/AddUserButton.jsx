import React, { useState } from "react";
import AddUserModal from "./AddUserModal";

const AddUserButton = () => {
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <button className="add-user-btn" onClick={handleOpenModal}>
        + New User
      </button>
      <AddUserModal show={showModal} handleClose={handleCloseModal} />
    </div>
  );
};

export default AddUserButton;
