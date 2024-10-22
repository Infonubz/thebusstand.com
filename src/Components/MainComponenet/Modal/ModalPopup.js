// src/Modal.js
import React from "react";
import "../Modal/ModalPopup.css";
import { RxCross2 } from "react-icons/rx";

const ModalPopup = ({ show, onClose, children, height, width, padding }) => {
  if (!show) {
    return null;
  }

  const modalStyle = {
    height: height || "auto",
    width: width || "auto",
    padding: padding || "auto"
  };

  return (
    <div className="modal-overlay rounded-b-[2vw] md:rounded-b-[0vw]" onClick={onClose}>
      <div
        className="modal-content"
        style={modalStyle}
        onClick={(e) => e.stopPropagation()}
      >
        <RxCross2 className="modal-close md:h-[1.5vw] md:w-[1.5vw] h-[4vw] w-[4vw]" onClick={onClose} />
        {children}
      </div>
    </div>
  );
};

export default ModalPopup;
