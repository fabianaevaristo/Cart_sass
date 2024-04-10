import React from "react";
import "./styles.css";

const CustomModal = ({ handleCloseModal, children }) => {
  return (
    <div className= "modal">
      <div className= "modal-content">
        <button className="modal-close" onClick={handleCloseModal}>
          X
        </button>
        {children}
      </div>
    </div>
  );
};

export default CustomModal;