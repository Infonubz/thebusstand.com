// src/Modal.js
import React from "react";
import "../Modal/ModalPopup.css";
import { RxCross2 } from "react-icons/rx";

const ModalPopup = ({ show, onClose, children, height, width }) => {
  if (!show) {
    return null;
  }

  const modalStyle = {
    height: height || "auto",
    width: width || "auto",
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        style={modalStyle}
        onClick={(e) => e.stopPropagation()}
      >
        <RxCross2 className="modal-close" onClick={onClose} />
        {children}
      </div>
    </div>
  );
};

export default ModalPopup;
