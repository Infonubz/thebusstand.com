import React, { useState } from "react";
import Partner from "../../assets/Partner.png";
import buslogo from "../../../src/assets/502-ai 1.png";
import busstand from "../../../src/assets/busstand.png";
import bus from "../../../src/assets/bus 1.png";
import share from "../../../src/assets//Share.png";
import ticket from "../../../src/assets/ticket.png";
import profile from "../../../src/assets/Profile.png";
// import ShareButtons from "../MainComponenet/ShareButton";
import { useNavigate } from "react-router-dom";
import LoginModalPopUp from "../Login/LoginModalPopUp";
import Login from "../Login/Login";
import { FaUserCircle } from "react-icons/fa";
import { PiUserCircleDuotone } from "react-icons/pi";
import { FaTicketAlt } from "react-icons/fa";
import { RiLogoutCircleLine } from "react-icons/ri";
import { Dropdown, Space, Modal } from "antd";
// import {  Drawer } from "antd";
import { toast } from "react-toastify";

export default function HomeHearder() {
  const navigation = useNavigate();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [loginIsOpen, setLoginIsOpen] = useState(false);
  const closeLoginModal = () => {
    setLoginIsOpen(false);
  };
  const LoginUser_Name = sessionStorage.getItem("user_name");

  const handleProPage = () => {
    navigation("/main", { state: { tabIndex: 1 } });
  };

  const handleBookingPage = () => {
    navigation("/main", { state: { tabIndex: 3 } });
  };

  const openLogModal = () => {
    console.log("openhokeeeeeeeeee");
    setAccDrawer(false);
    setLogModalIsOpen(true);
    sessionStorage.clear();
    localStorage.clear();
    navigation("/");
    toast.success("Logout Successfully");
  };
  const closeLogModal = () => {
    setLogModalIsOpen(false);
  };

  const [logModalIsOpen, setLogModalIsOpen] = useState(false);

  const [accDrawer, setAccDrawer] = useState(false);
  const showAccDrawer = () => {
    setAccDrawer(true);
  };

  // const onAccClose = () => {
  //   setAccDrawer(false);
  // };

  // const [logMobileIsOpen, setLogMobileIsOpen] = useState(false);

  console.log(modalIsOpen, accDrawer, "modalIsOpen");

  // const openLogMobile = () => {
  //   console.log("open555555hjukajscakjsckas");
  //   setAccDrawer(false);
  //   setLogMobileIsOpen(true);
  //   // navigation("/");
  //   // sessionStorage.clear();
  // };
  // const closeLogMobile = () => {
  //   setLogMobileIsOpen(false);
  // };

  const items = [
    {
      key: "1",
      label: (
        <div
          className="text-[#1F487C] text-[1.4vw] px-[2vw] flex items-center gap-[1vw]"
          onClick={handleProPage}
        >
          <PiUserCircleDuotone color="#1F487C" size="1.5vw" /> My Account
        </div>
      ),
    },
    {
      key: "2",
      label: (
        <div
          className="text-[#1F487C] text-[1.4vw] px-[2vw] flex items-center gap-[1vw]"
          onClick={handleBookingPage}
        >
          <FaTicketAlt color="#1F487C" size="1.5vw" /> Bookings
        </div>
      ),
    },
    {
      key: "3",
      label: (
        <div
          className="text-[#1F487C] text-[1.4vw] px-[2vw] flex items-center gap-[1vw]"
          onClick={openLogModal}
        >
          <RiLogoutCircleLine color="#1F487C" size="1.5vw" /> Logout
        </div>
      ),
    },
  ];
  console.log(
    LoginUser_Name !== null || LoginUser_Name !== "null",
    "LoginUser_Name"
  );

  return (
    <>
      <div className="md:block hidden">
        <div className="h-[4.5vw] w-full flex bg-[#E5FFF1] ">
          <div className="w-[40%] h-[4vw] flex ">
            <img
              className="w-[6.25vw] h-[4vw]"
              src={buslogo}
              alt="BusLogo"
              onClick={() => navigation("/")}
            />
            <img
              src={busstand}
              alt="BusStandLogo"
              className="h-[4vw] w-[20vw] py-[0.1vw]"
              onClick={() => navigation("/")}
            />
            <p className="border-r-[0.3vw] border-[#1F487C] mt-[0.2vw] h-[4vw] ml-[1vw]"></p>
            <div className="w-[9vw] h-[3.8vw] mt-[0.3vw] bg-[#1F487C] ml-[2vw] rounded-full  relative">
              <img
                src={bus}
                alt="BusLogo"
                className="h-[3.1vw] w-[4vw] absolute top-0"
                style={{ left: "50%", transform: "translateX(-50%)" }}
              />
              <p
                className="text-white  font-semibold absolute bottom-[0.2vw] text-[0.8vw]"
                style={{ left: "50%", transform: "translateX(-50%)" }}
              >
                Bus Tickets
              </p>
            </div>
          </div>
          <div className="w-[25%] h-full items-center flex justify-center ">
            <img src={Partner} alt="partner" className="w-auto h-full" />
          </div>
          <div className="w-[35%]  h-full   flex gap-[2vw] items-center justify-center">
            <div
              className="flex items-center justify-center gap-[0.5vw] cursor-pointer"
              onClick={() => setModalIsOpen(true)}
            >
              <img
                className="w-[1.6vw] h-[1.6vw]"
                src={share}
                alt={share}
                onClick={() => navigation("/rewards")}
              />
              <p className="text-[1.2vw] font-semibold text-[#1F487C]">Share</p>
            </div>
            <div
              className="flex items-center justify-center gap-[0.5vw]"
              onClick={() => navigation("/rewards")}
            >
              <img className="w-[1.6vw] h-[1.6vw]" alt="ticket" src={ticket} />
              <p className="text-[1.2vw] font-semibold text-[#1F487C]">
                Rewards/Offers
              </p>
            </div>{" "}
            <div>
              {LoginUser_Name && LoginUser_Name !== "null" ? (
                <div>
                  <Dropdown
                    menu={{
                      items,
                    }}
                    className="flex items-center gap-[0.5vw]"
                  >
                    <button
                      onClick={(e) => e.preventDefault()}
                      className="flex items-center gap-[0.5vw] bg-transparent border-none cursor-pointer"
                    >
                      <Space>
                        <div className="flex items-center gap-[0.5vw]">
                          <div>
                            <FaUserCircle size="1.5vw" color="#1F487C" />
                          </div>
                          <p className="text-[1.2vw] font-semibold text-[#1F487C]">
                            {LoginUser_Name === "undefined"
                              ? "Guest"
                              : LoginUser_Name}
                          </p>
                        </div>
                      </Space>
                    </button>
                  </Dropdown>
                </div>
              ) : (
                <div
                  className="flex items-center justify-center gap-[0.5vw]"
                  onClick={() => setLoginIsOpen(true)}
                >
                  <img
                    className="w-[1.6vw] h-[1.6vw]"
                    alt="profile"
                    src={profile}
                  />
                  <p className="text-[1.2vw] font-semibold text-[#1F487C]">
                    Login/SignUp
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ---MobileView--- */}

      <div className="md:hidden block">
        <div className="md:h-[4.5vw] h-[10vw]  w-full flex md:shadow-lg md:shadow-black">
          <div className="w-[40%] md:h-[4vw] h-[10vw] flex ">
            <img
              className="md:w-[6.25vw] w-[15vw] md:h-[4vw] h-[10vw]"
              src={buslogo}
              alt="busLogo"
              onClick={() => navigation("/")}
            />
            <img
              src={busstand}
              alt="busStand"
              className="md:h-[4vw] h-[10vw] md:w-[20vw] w-[40vw] py-[0.1vw]"
              onClick={() => navigation("/")}
            />
            <p className="border-r-[0.3vw] border-[#1F487C] hidden md:block mt-[0.2vw] h-[4vw] ml-[1vw]"></p>
            <div className="w-[9vw] h-[3.8vw] mt-[0.3vw]  bg-[#1F487C] ml-[2vw] rounded-full hidden md:block relative">
              <img
                src={bus}
                alt="bus"
                className="h-[3.1vw] w-[4vw] absolute top-0"
                style={{ left: "50%", transform: "translateX(-50%)" }}
              />
              <p
                className="text-white  font-semibold absolute bottom-[0.2vw]  text-[0.8vw]"
                style={{ left: "50%", transform: "translateX(-50%)" }}
              >
                Bus Tickets
              </p>
            </div>
          </div>
          <div className="w-[25%] h-full  items-center flex justify-center ">
            <img
              src={Partner}
              alt="partner"
              className="w-[17vw] hidden md:block h-full"
            />
          </div>
          <div className="w-[35%]  h-full md:pr-[0vw]  pr-[1vw] flex gap-[2vw] items-center md:justify-center justify-end">
            <div
              className="flex items-center justify-center gap-[0.5vw] cursor-pointer"
              onClick={() => setModalIsOpen(true)}
            >
              <img
                className="md:w-[1.6vw] md:h-[1.6vw] w-[7vw] h-[7vw]"
                src={share}
                alt="share"
              />
              <p className="text-[1.2vw] font-semibold text-[#1F487C] hidden md:block">
                Share
              </p>
            </div>
            <div
              className="flex items-center justify-center gap-[0.5vw]"
              onClick={() => navigation("/rewards")}
            >
              <img
                className="md:w-[1.6vw] md:h-[1.6vw] w-[7vw] h-[7vw]"
                src={ticket}
                alt="ticket"
              />
              <p className="hidden md:block text-[1.2vw] font-semibold text-[#1F487C]">
                Rewards/Offers
              </p>
            </div>{" "}
            <div className="flex items-center justify-center gap-[0.5vw]">
              <div className="md:block hidden">
                <img
                  className="w-[1.6vw] h-[1.6vw] "
                  src={profile}
                  alt="profile"
                />
              </div>
              <div className="md:hidden block" onClick={showAccDrawer}>
                <img className=" w-[7vw] h-[7vw]" src={profile} alt="profile" />
              </div>
              <p className="text-[1.2vw] hidden md:block font-semibold text-[#1F487C] cursor-pointer">
                Login/SignUp
              </p>
            </div>
          </div>
        </div>
      </div>

      <LoginModalPopUp
        show={loginIsOpen}
        onClose={closeLoginModal}
        height="35vw"
        width="60vw"
      >
        <Login
          closeLoginModal={closeLoginModal}
          setLoginIsOpen={setLoginIsOpen}
        />
      </LoginModalPopUp>

      {/* <Drawer
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
      </Drawer> */}

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
              console.log("hiiiiii", "home");

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
    </>
  );
}
