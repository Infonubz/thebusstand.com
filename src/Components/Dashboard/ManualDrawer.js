// src/Drawer.js
import React from "react";

const ManualDrawer = ({ isOpen, onClose, children }) => {
  return (
    <div
      className={`fixed inset-0 z-50 ${isOpen ? "block" : "hidden"}`}
      style={{ zIndex: 1 }}
    >
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black opacity-50"
        onClick={onClose}
      ></div>

      {/* Drawer */}
      <div
        className="fixed inset-y-0 right-0 w-[50%] h-[100%]  bg-white shadow-lg transform transition-transform duration-300 ease-in-out"
        style={{ transform: isOpen ? "translateX(0)" : "translateX(100%)" }}
      >
        <div className="p-4">
          <h2 className="text-lg font-bold">Drawer</h2>
          <button
            onClick={onClose}
            className="mt-2 px-4 py-2 bg-red-500 text-white rounded"
          >
            Close
          </button>
          <div className="mt-4">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default ManualDrawer;
