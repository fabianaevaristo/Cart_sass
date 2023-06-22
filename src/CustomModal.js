import React from "react";

const CustomModal = ({ isOpen, onRequestClose, contentLabel, children }) => {
  return (
    <div className={`modal ${isOpen ? "open" : ""}`}>
      <div className="modal-content">
        <button className="modal-close" onClick={onRequestClose}>
          X
        </button>
        <h2>{contentLabel}</h2>
        {children}
      </div>
    </div>
  );
};

export default CustomModal;