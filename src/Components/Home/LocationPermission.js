import { Modal } from "react-modal";
import React, { useState } from "react";
function LocationPermission() {
  const [showDialog, setShowDialog] = useState(true);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleGrantPermission = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        console.log("User location:", latitude, longitude);

        setShowDialog(false);
      },
      (error) => {
        console.error("Error getting user location:", error.message);
      }
    );
  };

  const handleDenyPermission = () => {
    setShowDialog(false);
  };
  const closeModal = () => {
    setModalIsOpen(false);
  };
  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={{
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        },
        content: {
          width: "30%", // Adjust width as needed
          height: "300px", // Adjust height as needed
          margin: "auto",
        },
      }}
    >
      <div className="items-center justify-center flex">
        <div className="border-[0.2vw] h-[10vw] w-[30%] bg-slate-200 ">
          {showDialog && (
            <div className="">
              <h2>Location Access</h2>
              <p>We need your location to provide personalized content.</p>
              <div className="button-container">
                <button onClick={handleGrantPermission}>Allow</button>
                <button onClick={handleDenyPermission}>Deny</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
}

export default LocationPermission;
