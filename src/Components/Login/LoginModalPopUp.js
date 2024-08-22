// src/LoginModal.js
import React from "react";
import "./LoginModalPopUp.css";
import { RxCross2 } from "react-icons/rx";

const LoginModalPopUp = ({ show, onClose, children, height, width }) => {
  if (!show) {
    return null;
  }

  const modalStyle = {
    height: height || "auto",
    width: width || "auto",
  };

  return (
    <div className="Login-modal-overlay" onClick={onClose}>
      <div
        className="Login-modal-content"
        style={modalStyle}
        onClick={(e) => e.stopPropagation()}
      >
        <RxCross2 className="Login-modal-close" onClick={onClose} />
        {children}
      </div>
    </div>
  );
};

export default LoginModalPopUp;
