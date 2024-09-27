import React, { useState } from "react";
import buslogo from "../../assets/502-ai 1.png";
import busstand from "../../assets/busstand.png";
//import bus from "../../assets/bus 1.png";
import share from "../../assets/Share.png";
//import Partner from "../../assets/Partner.png";
import { useLocation, useNavigate } from "react-router";
import ticket from "../../assets/ticket.png";
import { Drawer, Dropdown, Modal, Space, Tooltip } from "antd";
import { FaTicketAlt, FaUserCircle } from "react-icons/fa";
import profile from "../../assets/Profile.png";
import ModalPopup from "../MainComponenet/Modal/ModalPopup";
import ShareButtons from "../MainComponenet/ShareButton";
import LoginModalPopUp from "../Login/LoginModalPopUp";
import Login from "../Login/Login";
import LoginMobile from "../Login/LoginMobile";
import { RiLogoutCircleLine } from "react-icons/ri";
import { PiUserCircleDuotone } from "react-icons/pi";
import { toast } from "react-toastify";
import { capitalizeFirstLetter } from "./Captalization";
import { MdStarRate } from "react-icons/md";

export default function CommonMainNavbar() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [loginIsOpen, setLoginIsOpen] = useState(false);
  const [loginMobileIsOpen, setLoginMobileIsOpen] = useState(false);
  const [logModalIsOpen, setLogModalIsOpen] = useState(false);
  const [accDrawer, setAccDrawer] = useState(false);
  const [logMobileIsOpen, setLogMobileIsOpen] = useState(false);
  //const [LoginUser_Name, setLoginUser_Name] = useState(sessionStorage.getItem("user_name"));
  const closeLoginModal = () => {
    setLoginIsOpen(false);
    setLoginMobileIsOpen(false);
  };
  const closeModal = () => {
    setModalIsOpen(false);
    // setShowDialog(false);
  };
  const closeLogModal = () => {
    setLogModalIsOpen(false);
  };
  const navigation = useNavigate();
  const handleProPage = () => {
    navigation("/main", { state: { tabIndex: 1 } });
  };

  const handleBookingPage = () => {
    navigation("/main", { state: { tabIndex: 3 } });
  };
  // const showAccDrawer = () => {
  //   setAccDrawer(true);
  // };
  const onAccClose = () => {
    setAccDrawer(false);
  };
  const closeLogMobile = () => {
    setLogMobileIsOpen(false);
  };
  const openLogModal = () => {
    console.log("openkkkkk");
    setAccDrawer(false);
    setLogModalIsOpen(true);
    sessionStorage.clear();
    localStorage.clear();
    toast.success("Logout Successfully");
    navigation("/");
    // window.location.reload();
  };
  const openLogMobile = () => {
    console.log("open8888888888888888888");
    setAccDrawer(false);
    setLogMobileIsOpen(true);
  };
  const items = [
    {
      key: "1",
      label: (
        <div
          className="text-[#1F487C] text-[3.5vw] md:text-[1.4vw] px-[2vw] flex items-center gap-[1vw]"
          onClick={handleProPage}
        >
          <PiUserCircleDuotone color="#1F487C" className="h-[5vw] w-[5vw] md:h-[1.5vw] md:w-[1.5vw]" /> My Account
        </div>
      ),
    },
    {
      key: "2",
      label: (
        <div
          className="text-[#1F487C] text-[3.5vw] md:text-[1.4vw] px-[2vw] flex items-center gap-[1vw]"
          onClick={handleBookingPage}
        >
          <FaTicketAlt color="#1F487C" className="h-[5vw] w-[5vw] md:h-[1.5vw] md:w-[1.5vw]" /> Bookings
        </div>
      ),
    },
    {
      key: "3",
      label: (
        <div
          className="text-[#1F487C] text-[3.5vw] md:text-[1.4vw] px-[2vw] flex items-center gap-[1vw]"
          onClick={openLogModal}
        >
          <RiLogoutCircleLine color="#1F487C" className="h-[5vw] w-[5vw] md:h-[1.5vw] md:w-[1.5vw]" /> Logout
        </div>
      ),
    },
  ];
  const LoginUser_Name = sessionStorage.getItem("user_name");

  // useEffect(() => {
  //   const LoginUser_Name = sessionStorage.getItem("user_name");
  //   setLoginUser_Name(LoginUser_Name);
  //   console.log(LoginUser_Name,"User Name");
  // }, []);

  const location = useLocation();
  console.log(
    sessionStorage.getItem("user_name"),
    "locationlocationlocationlocation"
  );

  return (
    <>
      <div className="md:h-[3.8vw] bg-[#E5FFF1] h-[10vw] relative  w-full flex ">
        <div
          className="w-[19%] md:h-[3.3vw] h-[10vw] flex cursor-pointer"
          onClick={() => {
            navigation("/");
            localStorage.clear();
          }}
        >
          <img
            className="md:w-[4.7vw] w-[15vw] md:h-[3vw] h-[10vw] pl-[0.2vw] absolute top-[0.2vw]"
            src={buslogo}
            alt="busLogo"
          />
          <img
            src={busstand}
            alt="busStandLogo"
            className="md:h-[2.8vw] h-[10vw] md:w-[13.5vw] w-[40vw] py-[0.1vw] absolute md:top-[0.3vw] left-[15.5vw] md:left-[5vw]"
          />
        </div>
        {location.pathname !== "/dashboard" ? (
          <a
            className="w-[20%] h-full  items-center flex justify-center cursor-pointer"
            href="http://192.168.90.43:8082/"
            target="_blank"
            rel="noreferrer"
          >
            {/* <img src={Partner} className="w-auto hidden md:block h-[3.3vw]" /> */}
          </a>
        ) : (
          <div className="w-[60%] md:w-[70%] flex items-center justify-center ">
            <MdStarRate
              size={"2.5vw"}
              id="changingText"
              className="md:block hidden "
              style={{
                animation: "colorChange 2s infinite alternate",
              }}
            />
            <span
              id="changingText"
              className="md:block hidden text-[2.1vw] tracking-normal italic px-[0.5vw]"
              style={{
                fontFamily: "Calibri",
                animation: "colorChange 2s infinite alternate",
              }}
            >
              We show the best travel rates for the same bus by comparing market
              apps
            </span>

            <MdStarRate
              size={"2.5vw"}
              id="changingText"
              className="md:block hidden "
              style={{
                animation: "colorChange 2s infinite alternate",
              }}
            />
          </div>
        )}
        {location.pathname !== "/dashboard" ? (
          <div className="w-[70%] h-full md:pr-[2vw] flex gap-[2vw] md:flex items-center md:justify-end justify-end">
            <div
              className="flex items-center justify-center gap-[0.5vw] cursor-pointer"
              onClick={() => setModalIsOpen(true)}
            >
              <img
                className="md:w-[1.6vw] md:h-[1.6vw] w-[7vw] h-[7vw]"
                src={share}
                alt="shareImg"
              />
              <p className="text-[1.2vw] font-semibold text-[#1F487C] hidden md:block">
                Share
              </p>
            </div>
            <div
              className="flex items-center justify-center gap-[0.5vw] cursor-pointer"
              onClick={() => navigation("/rewards")}
            >
              <img
                className="md:w-[1.6vw] md:h-[1.6vw] w-[7vw] h-[7vw]"
                src={ticket}
                alt="ticketImage"
              />
              <p className="hidden md:block text-[1.2vw] font-semibold text-[#1F487C]">
                Rewards/Offers
              </p>
            </div>{" "}
            {LoginUser_Name && LoginUser_Name !== "null" ? (
              <div>
                <Dropdown
                  menu={{
                    items,
                  }}
                  className="md:block hidden flex items-center gap-[0.5vw] cursor-pointer"
                >
                  <button
                    onClick={(e) => e.preventDefault()}
                    className=" flex items-center gap-[0.5vw] bg-transparent border-none cursor-pointer"
                  >
                    <Space>
                      <div className="flex items-center gap-[0.5vw]">
                        <div>
                          <FaUserCircle size="1.5vw" color="#1F487C" />
                        </div>
                        <p className="text-[1.2vw] font-semibold text-[#1F487C]">
                          {capitalizeFirstLetter(LoginUser_Name)}
                        </p>
                      </div>
                    </Space>
                  </button>
                </Dropdown>
                <Dropdown
                  menu={{
                    items,
                  }}
                  className="block md:hidden flex items-center gap-[0.5vw] cursor-pointer"
                >
                  <button
                    onClick={(e) => e.preventDefault()}
                    className="bg-[#1F487C] mr-[1vw] w-[7.5vw] h-[7.5vw] rounded-full flex items-center justify-center"
                  >
                    <p className="text-[4vw] text-white font-extrabold">
                      {capitalizeFirstLetter(LoginUser_Name.split("")[0])}
                    </p>
                  </button>
                </Dropdown>
              </div>
            ) : (
              <>
                <div
                  className="hidden md:flex items-center justify-center gap-[0.5vw] cursor-pointer"
                  onClick={() => setLoginIsOpen(true)}
                >
                  <img
                    className="w-[1.6vw] h-[1.6vw]"
                    src={profile}
                    alt="profile"
                  />
                  <p className="text-[1.2vw] font-semibold text-[#1F487C]">
                    Login/SignUp
                  </p>
                </div>

                <div
                  className="block md:hidden flex items-center justify-center gap-[0.5vw] cursor-pointer"
                   onClick={() => navigation('/Login')}
                >
                  <img
                    className="w-[7vw] h-[7vw] mr-[1vw]"
                    src={profile}
                    alt="profile"
                  />
                </div>
              </>
            )}
          </div>
        ) : (
          <div className="w-[25%] md:w-[11%] h-full gap-[1vw] md:gap-[0.8vw] pr-[1vw]  flex md:flex items-center md:justify-end justify-end">
            <div
              className="flex items-center justify-center gap-[0.5vw] cursor-pointer"
              onClick={() => setModalIsOpen(true)}
            >
              <Tooltip
                placement="bottom"
                title="Share"
                className="cursor-pointer"
                // color="white"
              >
                <img
                  className="md:w-[2.5vw] md:h-[2.5vw] w-[10vw] h-[7vw]"
                  src={share}
                  alt="shareImage"
                />
              </Tooltip>

              {/* <p className="text-[1.2vw] font-semibold text-[#1F487C] hidden md:block">
                Share
              </p> */}
            </div>
            <div
              className="flex items-center justify-center gap-[0.5vw] cursor-pointer"
              onClick={() => navigation("/rewards")}
            >
              <Tooltip
                placement="bottom"
                title="Rewards/Offers"
                className="cursor-pointer"
                // color="white"
              >
                <img
                  className="md:w-[2.5vw] md:h-[2.5vw] w-[10vw] h-[7vw]"
                  src={ticket}
                  alt="ticketImage"
                />
              </Tooltip>

              {/* <p className="hidden md:block text-[1.2vw] font-semibold text-[#1F487C]">
                Rewards/Offers
              </p> */}
            </div>{" "}
            {LoginUser_Name && LoginUser_Name !== "null" ? (
              <div>
                <Dropdown
                  menu={{
                    items,
                  }}
                  className="flex items-center gap-[0.5vw] cursor-pointer"
                >
                  <button
                    onClick={(e) => e.preventDefault()}
                    className="bg-[#1F487C] w-[7.5vw] h-[7.5vw] md:w-[2.5vw] md:h-[2.5vw] rounded-full flex items-center justify-center"
                  >
                    <p className="text-[4vw] md:text-[1.5vw] text-white font-extrabold">
                      {capitalizeFirstLetter(LoginUser_Name.split("")[0])}
                    </p>
                  </button>
                  {/* <Space>
                      <div className="flex items-center  gap-[0.5vw]">
                        <div>
                          <FaUserCircle size="1.5vw" color="#1F487C" />
                        </div>
                        <p className="text-[1.2vw] font-semibold text-[#1F487C]">
                          {capitalizeFirstLetter(LoginUser_Name)}
                        </p>
                      </div>
                    </Space> */}
                  {/* <div className="bg-white w-[1.8vw] h-[1.8vw] rounded-full flex items-center justify-center"> */}

                  {/* </div> */}
                </Dropdown>
              </div>
            ) : (
              <>
                <div
                  className="block md:hidden flex items-center justify-center gap-[0.5vw] cursor-pointer"
                  onClick={() => navigation('/Login')}
                >
                  <img
                    className="w-[10vw] h-[7vw]"
                    src={profile}
                    alt="profile"
                  />
                </div>
                <div
                  className="md:block hidden flex items-center justify-center gap-[0.5vw] cursor-pointer"
                  onClick={() => setLoginIsOpen(true)}
                >
                  <img
                    className=":w-[2.5vw] h-[2.5vw]"
                    src={profile}
                    alt="profile"
                  />
                  {/* <p className="text-[1.2vw] font-semibold text-[#1F487C]">
                  Login/SignUp
                </p> */}
                </div>
              </>
            )}
          </div>
        )}
      </div>
      <ModalPopup
        show={modalIsOpen}
        onClose={closeModal}
        height="28vw"
        width="32vw"
      >
        <ShareButtons url={"http://localhost:3008/"} />
      </ModalPopup>
      <LoginModalPopUp
        show={loginIsOpen}
        onClose={closeLoginModal}
        height="35vw"
        width="60vw"
      >
        <Login setLoginIsOpen={setLoginIsOpen} />
      </LoginModalPopUp>
      <Drawer
        //show={loginMobileIsOpen}
        onClose={closeLoginModal}
        placement={"bottom"}
        closable={true}
        open={loginMobileIsOpen}
        // key={"right"}
        // width={"75%"}
        className="custom-drawer"
        height="100%"
        width="100%"
      >
        <LoginMobile setLoginMobileIsOpen={setLoginMobileIsOpen} />
      </Drawer>
      <Modal
        isOpen={logModalIsOpen}
        onRequestClose={closeLogModal}
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          },
          content: {
            height: "23vw",
            width: "auto",
            margin: "8vw 30vw",
          },
        }}
      >
        <div className=" flex flex-col items-center gap-y-[1vw]">
          <div className="font-bold text-[1.7vw] text-[#1F487C]">
            Are you Sure you want to Log Out ?
          </div>
          <div className="text-[1.2vw] px-[4vw] text-center text-[#1F487C]">
            Tickets Booking is Faster when you are Logged In
          </div>
          <button
            className=" bg-[#1F487C] text-[1.4vw] w-[20vw] h-[3.5vw] text-white rounded-full font-bold "
            onClick={() => {
              console.log("hiiiiii", "main");

              navigation("/");
              sessionStorage.clear();
            }}
          >
            Yes, Log Out
          </button>
          <button className="  border-[0.2vw] border-[#1F487C] text-[1.4vw] w-[20vw] h-[3.5vw] text-[#1F487C] rounded-full font-bold">
            Cancel
          </button>
        </div>
      </Modal>
      <Drawer
        // title="Basic Drawer"
        placement={"right"}
        closable={true}
        onClose={onAccClose}
        open={accDrawer}
        key={"right"}
        width={"75%"}
        className="custom-drawer"
      >
        <div className="grid grid-rows-3 gap-y-[2vw]">
          <div className="text-[#1F487C] text-[5vw] px-[2vw] flex items-center gap-[5vw]">
            <PiUserCircleDuotone color="#1F487C" size="5vw" /> My Account
          </div>
          <div className="text-[#1F487C] text-[5vw] px-[2vw] flex items-center gap-[5vw]">
            <FaTicketAlt color="#1F487C" size="5vw" /> Bookings
          </div>
          <div
            className="text-[#1F487C] text-[5vw] px-[2vw] flex items-center gap-[5vw]"
            onClick={openLogMobile}
          >
            <RiLogoutCircleLine color="#1F487C" size="5vw" /> Logout
          </div>
        </div>
      </Drawer>
      <Drawer
        // title="Basic Drawer"
        placement={"bottom"}
        closable={true}
        onClose={closeLogMobile}
        open={logMobileIsOpen}
        key={"right"}
        width={"50%"}
        className="custom-drawer"
      >
        <div className=" flex flex-col items-center gap-y-[5vw]">
          <div className="font-bold text-[5vw] text-[#1F487C]">
            Are you Sure you want to Log Out ?
          </div>
          <div className="text-[4vw] px-[10vw] text-center text-[#1F487C]">
            Tickets Booking is Faster when you are Logged In
          </div>
          <button
            className=" bg-[#1F487C] text-[4vw] w-3/4 h-[10vw] text-white rounded-md font-bold"
            onClick={() => {
              console.log("hiiiiii", "main");

              navigation("/");
              sessionStorage.clear();
            }}
          >
            Yes, Log Out
          </button>
          <button className="  border-[0.2vw] border-[#1F487C] text-[4vw] w-3/4 h-[10vw] text-[#1F487C] rounded-md font-bold">
            Cancel
          </button>
        </div>
      </Drawer>
    </>
  );
}

// <--vikram-->

// import React, { useEffect, useState } from "react";
// import buslogo from "../../assets/502-ai 1.png";
// import busstand from "../../assets/busstand.png";
// import bus from "../../assets/bus 1.png";
// import share from "../../assets/Share.png";
// import Partner from "../../assets/Partner.png";
// import { useLocation, useNavigate } from "react-router";
// import ticket from "../../assets/ticket.png";
// import { Drawer, Dropdown, Modal, Popover, Space, Tooltip } from "antd";
// import { FaTicketAlt, FaUserCircle } from "react-icons/fa";
// import profile from "../../assets/Profile.png";
// import ModalPopup from "../MainComponenet/Modal/ModalPopup";
// import ShareButtons from "../MainComponenet/ShareButton";
// import LoginModalPopUp from "../Login/LoginModalPopUp";
// import Login from "../Login/Login";
// import { RiLogoutCircleLine } from "react-icons/ri";
// import { PiUserCircleDuotone } from "react-icons/pi";
// import { toast } from "react-toastify";
// import { capitalizeFirstLetter } from "./Captalization";
// import { MdStarRate } from "react-icons/md";
// import { IoMdShare } from "react-icons/io";
// import { HiTicket } from "react-icons/hi2";

// export default function CommonMainNavbar() {
//   const [modalIsOpen, setModalIsOpen] = useState(false);
//   const [loginIsOpen, setLoginIsOpen] = useState(false);
//   const [logModalIsOpen, setLogModalIsOpen] = useState(false);
//   const [accDrawer, setAccDrawer] = useState(false);
//   const [logMobileIsOpen, setLogMobileIsOpen] = useState(false);
//   const [LoginUser_Name, setLoginUser_Name] = useState("");
//   const [hovered, setHovered] = useState(false);
//   const [currentIcon, setCurrentIcon] = useState("login");

//   const closeLoginModal = () => {
//     setLoginIsOpen(false);
//   };
//   const closeModal = () => {
//     setModalIsOpen(false);
//     // setShowDialog(false);
//   };
//   const closeLogModal = () => {
//     setLogModalIsOpen(false);
//   };
//   const navigation = useNavigate();
//   const handleProPage = () => {
//     navigation("/main", { state: { tabIndex: 1 } });
//   };

//   const handleBookingPage = () => {
//     navigation("/main", { state: { tabIndex: 3 } });
//   };
//   const showAccDrawer = () => {
//     setAccDrawer(true);
//   };
//   const onAccClose = () => {
//     setAccDrawer(false);
//   };
//   const closeLogMobile = () => {
//     setLogMobileIsOpen(false);
//   };
//   const openLogModal = () => {
//     console.log("openkkkkk");
//     setAccDrawer(false);
//     setLogModalIsOpen(true);
//     sessionStorage.clear();
//     localStorage.clear();
//     toast.success("Logout Successfully");
//     navigation("/");
//     // window.location.reload();
//   };
//   const openLogMobile = () => {
//     console.log("open8888888888888888888");
//     setAccDrawer(false);
//     setLogMobileIsOpen(true);
//   };
//   const items = [
//     {
//       key: "1",
//       label: (
//         <div
//           className="text-[#1F487C] text-[1.4vw] px-[2vw] flex items-center gap-[1vw]"
//           onClick={handleProPage}
//         >
//           <PiUserCircleDuotone color="#1F487C" size="1.5vw" /> My Account
//         </div>
//       ),
//     },
//     {
//       key: "2",
//       label: (
//         <div
//           className="text-[#1F487C] text-[1.4vw] px-[2vw] flex items-center gap-[1vw]"
//           onClick={handleBookingPage}
//         >
//           <FaTicketAlt color="#1F487C" size="1.5vw" /> Bookings
//         </div>
//       ),
//     },
//     {
//       key: "3",
//       label: (
//         <div
//           className="text-[#1F487C] text-[1.4vw] px-[2vw] flex items-center gap-[1vw]"
//           onClick={openLogModal}
//         >
//           <RiLogoutCircleLine color="#1F487C" size="1.5vw" /> Logout
//         </div>
//       ),
//     },
//   ];
//   useEffect(() => {
//     const LoginUser_Name = sessionStorage.getItem("user_name");
//     setLoginUser_Name(LoginUser_Name);
//   }, [sessionStorage.getItem("user_name")]);
//   const location = useLocation();
//   console.log(location.pathname, "locationlocation");

//   const [visible, setVisible] = useState(false);

//   const handleClick = () => {
//     setVisible(!visible); // Toggle visibility on click
//   };

//   return (
//     <>
//       <div className="md:h-[3.8vw] bg-[#E5FFF1] h-[10vw] relative  w-full flex ">
//         <div
//           className="w-[19%] md:h-[3.3vw] h-[10vw] flex cursor-pointer"
//           onClick={() => navigation("/")}
//         >
//           <img
//             className="md:w-[4.7vw] w-[15vw] md:h-[3vw] h-[10vw] pl-[0.2vw] absolute top-[0.2vw]"
//             src={buslogo}
//           />
//           <img
//             src={busstand}
//             className="md:h-[2.8vw] h-[10vw] md:w-[13.5vw] w-[40vw] py-[0.1vw] absolute md:top-[0.3vw] left-[5vw]"
//           />
//         </div>
//         {location.pathname !== "/dashboard" ? (
//           <a
//             className="w-[20%] h-full  items-center flex justify-center cursor-pointer"
//             href="http://192.168.90.43:8082/"
//             target="_blank"
//           >
//             {/* <img src={Partner} className="w-auto hidden md:block h-[3.3vw]" /> */}
//           </a>
//         ) : (
//           <div className="w-[70%] flex items-center justify-center px-[.5vw] ">
//             <MdStarRate
//               size={"2.5vw"}
//               id="changingText"
//               style={{
//                 animation: "colorChange 2s infinite alternate",
//               }}
//             />
//             <span
//               id="changingText"
//               className="text-[1.8vw] tracking-normal italic px-[0vw]"
//               style={{
//                 fontFamily: "Calibri",
//                 animation: "colorChange 2s infinite alternate",
//               }}
//             >
//               We show the best travel rates for the same bus by comparing market
//               apps
//             </span>

//             <MdStarRate
//               size={"2.5vw"}
//               id="changingText"
//               style={{
//                 animation: "colorChange 2s infinite alternate",
//               }}
//             />
//           </div>
//         )}
//         {location.pathname !== "/dashboard" ? (
//           <div className="w-[68%]  h-full md:pr-[2vw]   flex gap-[2vw] md:flex items-center md:justify-end justify-end">
//             <div
//               className="flex items-center justify-center gap-[0.5vw] cursor-pointer"
//               onClick={() => setModalIsOpen(true)}
//             >
//               <img
//                 className="md:w-[1.6vw] md:h-[1.6vw] w-[7vw] h-[7vw]"
//                 src={share}
//               />
//               <p className="text-[1.2vw] font-semibold text-[#1F487C] hidden md:block">
//                 Share
//               </p>
//             </div>
//             <div
//               className="flex items-center justify-center gap-[0.5vw] cursor-pointer"
//               onClick={() => navigation("/rewards")}
//             >
//               <img
//                 className="md:w-[1.6vw] md:h-[1.6vw] w-[7vw] h-[7vw]"
//                 src={ticket}
//               />
//               <p className="hidden md:block text-[1.2vw] font-semibold text-[#1F487C]">
//                 Rewards/Offers
//               </p>
//             </div>{" "}
//             {LoginUser_Name && LoginUser_Name !== "null" ? (
//               <div>
//                 <Dropdown
//                   menu={{
//                     items,
//                   }}
//                   className="flex items-center gap-[0.5vw] cursor-pointer"
//                 >
//                   <a onClick={(e) => e.preventDefault()}>
//                     <Space>
//                       <div className="flex items-center  gap-[0.5vw]">
//                         <div>
//                           <FaUserCircle size="1.5vw" color="#1F487C" />
//                         </div>
//                         <p className="text-[1.2vw] font-semibold text-[#1F487C]">
//                           {capitalizeFirstLetter(LoginUser_Name)}
//                         </p>
//                       </div>
//                     </Space>
//                   </a>
//                 </Dropdown>
//               </div>
//             ) : (
//               <div
//                 className="flex items-center justify-center gap-[0.5vw] cursor-pointer"
//                 onClick={() => setLoginIsOpen(true)}
//               >
//                 <img className="w-[1.6vw] h-[1.6vw]" src={profile} />
//                 <p className="text-[1.2vw] font-semibold text-[#1F487C]">
//                   Login/SignUp
//                 </p>
//               </div>
//             )}
//           </div>
//         ) : (
//           <div className="w-[18%]  h-full  gap-y-[0.8vw] gap-x-[1vw] pr-[1vw]  flex md:flex items-center md:justify-between justify-end">
//             <div
//               className="flex items-center justify-between gap-[0.5vw] cursor-pointer"
//               onClick={() => setModalIsOpen(true)}
//             >
//               {/* <Tooltip
//                 placement="bottom"
//                 title="Share"
//                 className="cursor-pointer"
//                 // color="white"
//               > */}
//               {/* <img
//                 className="md:w-[2.5vw] mt-[.4vw] md:h-[2.5vw] w-[7vw] h-[7vw]"
//                 src={share}
//                 style={{
//                   transition: "ease-in all 15s",
//                 }}
//                 onMouseEnter={() => setCurrentIcon("share")}
//                 onMouseLeave={() => setCurrentIcon("login")}
//               /> */}
//               {/* </Tooltip> */}
//               <IoMdShare className="text-[2vw] text-[#1F487c] font-[1vw]"
//               onMouseEnter={() => setCurrentIcon("share")}
//               onMouseLeave={() => setCurrentIcon("login")}/>

//               {currentIcon == "share" ? (
//                 <p
//                   className="text-[1.5vw]  hidden md:block font-semibold text-[#1F487C]"
//                   style={{
//                     transition: "ease-in all 15s",
//                   }}
//                 >
//                   Share
//                 </p>
//               ) : (
//                 ""
//               )}
//             </div>
//             <div
//               className="flex items-center justify-center gap-[0.5vw] cursor-pointer"
//               onClick={() => navigation("/rewards")}
//             >
//               {/* <Tooltip
//                 placement="bottom"
//                 title="Rewards/Offers"
//                 className="cursor-pointer"
//                 // color="white"
//               > */}
//               {/* <img
//                 className="md:w-[2.5vw] md:h-[2.5vw] w-[7vw] h-[7vw]"
//                 src={ticket}
//                 onMouseEnter={() => setCurrentIcon("rewards")}
//                 onMouseLeave={() => setCurrentIcon("login")}
//               /> */}
//               {/* </Tooltip> */}
//               <HiTicket  className="text-[2.4vw] text-[#1F487c] font-[1vw]"
//               onMouseEnter={() => setCurrentIcon("rewards")}
//               onMouseLeave={() => setCurrentIcon("login")}/>

//               {currentIcon === "rewards" ? (
//                 <p className="hidden md:block text-[1.5vw] font-semibold text-[#1F487C] transition-opacity duration-300">
//                   Offers
//                 </p>
//               ) : (
//                 ""
//               )}
//             </div>{" "}
//             {LoginUser_Name && LoginUser_Name !== "null" ? (
//               <div className="flex  items-center ">
//                 <Dropdown
//                   menu={{
//                     items,
//                   }}
//                   className="flex items-center gap-[0.5vw] cursor-pointer"
//                 >

//                   {/* <a
//                     onClick={(e) => e.preventDefault()}
//                     onMouseEnter={() => setCurrentIcon("login")}
//                   onMouseLeave={() => setCurrentIcon("login")}
//                     className="bg-[#1F487C] w-[2.5vw] h-[2.5vw] rounded-full flex items-center justify-center"
//                   > */}
//                     {/* <Space>
//                       <div className="flex items-center  gap-[0.5vw]">
//                         <div>
//                           <FaUserCircle size="1.5vw" color="#1F487C" />
//                         </div>
//                         <p className="text-[1.2vw] font-semibold text-[#1F487C]">
//                           {capitalizeFirstLetter(LoginUser_Name)}
//                         </p>
//                       </div>
//                     </Space> */}
//                     {/* <div className="bg-white w-[1.8vw] h-[1.8vw] rounded-full flex items-center justify-center"> */}
//                     {/* <p className="text-[1.5vw]  text-white font-extrabold">
//                       {capitalizeFirstLetter(LoginUser_Name.split("")[0])}
//                     </p>
//                     </div>
//                   </a> */}
//                   <span>
//                 <FaUserCircle   className="text-[2vw] text-[#1F487c] font-[1vw]"
//               onMouseEnter={() => setCurrentIcon("login")}
//               onMouseLeave={() => setCurrentIcon("login")}/>
//                 {currentIcon == "login" ?  LoginUser_Name?.length > 8?<span className="text-[1.5vw] pl-[.2vw] font-semibold text-[#1F487C] transition-opacity flex  duration-300">{LoginUser_Name.substring(0,7)}...</span> :<span className="text-[1.5vw] pl-[.2vw] font-semibold text-[#1F487C] transition-opacity duration-300">{LoginUser_Name}</span> : ""}
//           </span>
//           </Dropdown>
//               </div>
//             ) : (
//               <div
//                 className="flex items-center justify-center gap-[0.5vw] cursor-pointer"
//                 onClick={() => setLoginIsOpen(true)}
//               >
//                 {/* <img
//                   className="md:w-[2.5vw] md:h-[2.5vw]"
//                   src={profile}
//                   onMouseEnter={() => setCurrentIcon("login")}
//                   onMouseLeave={() => setCurrentIcon("login")}
//                 /> */} <FaUserCircle  className="text-[2vw] text-[#1F487c] font-[1vw]"
//               onMouseEnter={() => setCurrentIcon("login")}
//               onMouseLeave={() => setCurrentIcon("login")}/>

//                 {currentIcon == "login" ? (
//                   <p className="text-[1.5vw] font-semibold text-[#1F487C] transition-opacity duration-300">
//                     Login
//                   </p>
//                 ) : (
//                   ""
//                 )}
//               </div>
//             )}
//           </div>
//         )}
//       </div>
//       <ModalPopup
//         show={modalIsOpen}
//         onClose={closeModal}
//         height="28vw"
//         width="32vw"
//       >
//         <ShareButtons url={"http://localhost:3008/"} />
//       </ModalPopup>
//       <LoginModalPopUp
//         show={loginIsOpen}
//         onClose={closeLoginModal}
//         height="35vw"
//         width="60vw"
//       >
//         <Login setLoginIsOpen={setLoginIsOpen} />
//       </LoginModalPopUp>
//       <Modal
//         isOpen={logModalIsOpen}
//         onRequestClose={closeLogModal}
//         style={{
//           overlay: {
//             backgroundColor: "rgba(0, 0, 0, 0.5)",
//           },
//           content: {
//             height: "23vw",
//             width: "auto",
//             margin: "8vw 30vw",
//           },
//         }}
//       >
//         <div className=" flex flex-col items-center gap-y-[1vw]">
//           <div className="font-bold text-[1.7vw] text-[#1F487C]">
//             Are you Sure you want to Log Out ?
//           </div>
//           <div className="text-[1.2vw] px-[4vw] text-center text-[#1F487C]">
//             Tickets Booking is Faster when you are Logged In
//           </div>
//           <button
//             className=" bg-[#1F487C] text-[1.4vw] w-[20vw] h-[3.5vw] text-white rounded-full font-bold "
//             onClick={() => {
//               console.log("hiiiiii", "main");

//               navigation("/");
//               sessionStorage.clear();
//             }}
//           >
//             Yes, Log Out
//           </button>
//           <button className="  border-[0.2vw] border-[#1F487C] text-[1.4vw] w-[20vw] h-[3.5vw] text-[#1F487C] rounded-full font-bold">
//             Cancel
//           </button>
//         </div>
//       </Modal>
//       <Drawer
//         // title="Basic Drawer"
//         placement={"right"}
//         closable={true}
//         onClose={onAccClose}
//         open={accDrawer}
//         key={"right"}
//         width={"75%"}
//         className="custom-drawer"
//       >
//         <div className="grid grid-rows-3 gap-y-[2vw]">
//           <div className="text-[#1F487C] text-[5vw] px-[2vw] flex items-center gap-[5vw]">
//             <PiUserCircleDuotone color="#1F487C" size="5vw" /> My Account
//           </div>
//           <div className="text-[#1F487C] text-[5vw] px-[2vw] flex items-center gap-[5vw]">
//             <FaTicketAlt color="#1F487C" size="5vw" /> Bookings
//           </div>
//           <div
//             className="text-[#1F487C] text-[5vw] px-[2vw] flex items-center gap-[5vw]"
//             onClick={openLogMobile}
//           >
//             <RiLogoutCircleLine color="#1F487C" size="5vw" /> Logout
//           </div>
//         </div>
//       </Drawer>
//       <Drawer
//         // title="Basic Drawer"
//         placement={"bottom"}
//         closable={true}
//         onClose={closeLogMobile}
//         open={logMobileIsOpen}
//         key={"right"}
//         width={"50%"}
//         className="custom-drawer"
//       >
//         <div className=" flex flex-col items-center gap-y-[5vw]">
//           <div className="font-bold text-[5vw] text-[#1F487C]">
//             Are you Sure you want to Log Out ?
//           </div>
//           <div className="text-[4vw] px-[10vw] text-center text-[#1F487C]">
//             Tickets Booking is Faster when you are Logged In
//           </div>
//           <button
//             className=" bg-[#1F487C] text-[4vw] w-3/4 h-[10vw] text-white rounded-md font-bold"
//             onClick={() => {
//               console.log("hiiiiii", "main");

//               navigation("/");
//               sessionStorage.clear();
//             }}
//           >
//             Yes, Log Out
//           </button>
//           <button className="  border-[0.2vw] border-[#1F487C] text-[4vw] w-3/4 h-[10vw] text-[#1F487C] rounded-md font-bold">
//             Cancel
//           </button>
//         </div>
//       </Drawer>
//     </>
//   );
// }
