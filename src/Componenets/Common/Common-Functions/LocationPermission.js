// import Modal from "react-modal";
import React, { useEffect, useState } from "react";
// import { FaMapMarkerAlt } from "react-icons/fa";

function LocationPermission() {
  const [modalIsOpen, setModalIsOpen] = useState(true); // Set true to show modal initially
  // const [location, setLocation] = useState({ lat: null, long: null });
  // const [error, setError] = useState(null);

  const getLocationPermission = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // setLocation({
          //   lat: position.coords.latitude,
          //   long: position.coords.longitude,
          // });
          localStorage.setItem("latitude", position.coords.latitude);
          localStorage.setItem("longitude", position.coords.longitude);
          setModalIsOpen(false);
          localStorage.setItem("location_permission", 2);
          // setError(null); // Clear any previous errors
        },
        (error) => {
          switch (error.code) {
            case error.PERMISSION_DENIED:
              // setError("User denied the request for Geolocation.");
              break;
            case error.POSITION_UNAVAILABLE:
              // setError("Location information is unavailable.");
              break;
            case error.TIMEOUT:
              // setError("The request to get user location timed out.");
              break;
            case error.UNKNOWN_ERROR:
              // setError("An unknown error occurred.");
              break;
            default:
            // setError("Geolocation is not supported by this browser.");
          }
        }
      );
    } else {
      // setError("Geolocation is not supported by this browser.");
    }
  };

  // const closeModal = () => {
  //   setModalIsOpen(false);
  // };
  const lat = localStorage.getItem("latitude");
  const long = localStorage.getItem("longitude");
  const getlocation = localStorage.getItem("location_permission");
  // console.log(modalIsOpen, "modalIsOpenmodalIsOpen");
  // console.log(lat === null, long, "location741852");
  // console.log(getlocation, "get_permissionget_permission");
  // const handledeny = () => {
  //   setModalIsOpen(false);
  //   localStorage.setItem("location_permission", 2);
  // };
  useEffect(() => {
    localStorage.setItem("location_permission", 1);
  }, []);
  useEffect(() => {
    const lat = localStorage.getItem("latitude");
    const long = localStorage.getItem("longitude");
    const getlocation = localStorage.getItem("location_permission");
    if (lat === null && long === null && Number(getlocation) === 1) {
      getLocationPermission();
    }
  }, [getlocation]);
  return (
    // lat === null &&
    // long === null &&
    // Number(getlocation) === 1 && (
    //   <Modal
    //     isOpen={modalIsOpen}
    //     onRequestClose={closeModal}
    //     style={{
    //       overlay: {
    //         backgroundColor: "rgba(0, 0, 0, 0.5)",
    //       },
    //       content: {
    //         width: "28vw",
    //         height: "16vw",
    //         margin: "auto",
    //       },
    //     }}
    //   >
    //     <div className="flex items-center justify-center">
    //       <div className="flex flex-col items-center justify-center">
    //         <FaMapMarkerAlt
    //           color="#1F487C"
    //           size={"5vw"}
    //           className="my-[0.5vw]"
    //         />
    //         <label className="text-[#1F487C] text-[1vw] py-[1vw]">
    //           Give a loaction permission access
    //         </label>
    //         <div className="flex items-center justify-center gap-x-[1.5vw]">
    //           <button
    //             className="border-[0.1vw] border-[#1F487C] text-[#1F487C] text-[1.2vw] px-[3vw] py-[0.5vw] rounded-[0.5vw]"
    //             onClick={handledeny}
    //           >
    //             Deny
    //           </button>
    //           <button
    //             className="bg-[#1F487C] text-white font-semibold text-[1.2vw] px-[3vw] py-[0.5vw] rounded-[0.5vw] "
    //             onClick={getLocationPermission}
    //           >
    //             Allow
    //           </button>
    //         </div>
    //       </div>
    //     </div>
    //   </Modal>
    // )
    <></>
  );
}

export default LocationPermission;
