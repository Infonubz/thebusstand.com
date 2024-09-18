import React, { useState } from "react";
import buslogo from "../../assets/502-ai 1.png";
import busstand from "../../assets/busstand.png";
import bus from "../../assets/bus 1.png";
import share from "../../assets/Share.png";
import Partner from "../../assets/Partner.png";
import { useNavigate } from "react-router";
import ticket from "../../assets/ticket.png";
import { Drawer, Dropdown, Modal, Space } from "antd";
import { FaTicketAlt, FaUserCircle } from "react-icons/fa";
import profile from "../../assets/Profile.png";
import ModalPopup from "../MainComponenet/Modal/ModalPopup";
import ShareButtons from "../MainComponenet/ShareButton";
import LoginModalPopUp from "../Login/LoginModalPopUp";
import Login from "../Login/Login";
import { RiLogoutCircleLine } from "react-icons/ri";
import { PiUserCircleDuotone } from "react-icons/pi";
import { toast } from "react-toastify";
import { capitalizeFirstLetter } from "./Captalization";

export default function CommonMainNavbar() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [loginIsOpen, setLoginIsOpen] = useState(false);
  const [logModalIsOpen, setLogModalIsOpen] = useState(false);
  const [accDrawer, setAccDrawer] = useState(false);
  const [logMobileIsOpen, setLogMobileIsOpen] = useState(false);

  const closeLoginModal = () => {
    setLoginIsOpen(false);
  };
  const closeModal = () => {
    setModalIsOpen(false);
    // setShowDialog(false);
  };
  const closeLogModal = () => {
    setLogModalIsOpen(false);
  };
  const navigation = useNavigate();
  const LoginUser_Name = sessionStorage.getItem("user_name");
  const handleProPage = () => {
    navigation("/main", { state: { tabIndex: 1 } });
  };

  const handleBookingPage = () => {
    navigation("/main", { state: { tabIndex: 3 } });
  };
  const showAccDrawer = () => {
    setAccDrawer(true);
  };
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
  return (
    <>
      <div className="md:h-[3.8vw] bg-[#E5FFF1] h-[10vw] relative  w-full flex md:shadow-lg md:shadow-black">
        <div
          className="w-[40%] md:h-[3.3vw] h-[10vw] flex cursor-pointer"
          onClick={() => navigation("/")}
        >
          <img
            className="md:w-[4.7vw] w-[15vw] md:h-[3vw] h-[10vw] pl-[0.2vw] absolute top-[0.2vw]"
            src={buslogo}
          />
          <img
            src={busstand}
            className="md:h-[2.8vw] h-[10vw] md:w-[12vw] w-[40vw] py-[0.1vw] absolute md:top-[0.3vw] left-[5vw]"
          />
          {/* <p className="border-r-[0.3vw] border-[#1F487C] hidden md:block mt-[0.2vw] h-[3.3vw] ml-[1vw]"></p> */}
          {/* <div className="w-[9vw] h-[3.1vw] mt-[0.3vw]  bg-[#1F487C] ml-[1vw] rounded-full hidden md:block relative">
            <img
              src={bus}
              className="h-[2.4vw] w-[4vw] absolute top-0"
              style={{ left: "50%", transform: "translateX(-50%)" }}
            />
            <p
              className="text-white  font-semibold absolute bottom-[0.2vw]  text-[0.8vw]"
              style={{ left: "50%", transform: "translateX(-50%)" }}
            >
              Bus Tickets
            </p>
          </div> */}
        </div>
        <a
          className="w-[20%] h-full  items-center flex justify-center cursor-pointer"
          href="http://192.168.90.43:8082/"
        >
          <img src={Partner} className="w-auto hidden md:block h-[3.3vw]" />
        </a>
        <div className="w-[40%]  h-full md:pr-[2vw]   flex gap-[2vw] md:flex items-center md:justify-end justify-end">
          <div
            className="flex items-center justify-center gap-[0.5vw] cursor-pointer"
            onClick={() => setModalIsOpen(true)}
          >
            <img
              className="md:w-[1.6vw] md:h-[1.6vw] w-[7vw] h-[7vw]"
              src={share}
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
            />
            <p className="hidden md:block text-[1.2vw] font-semibold text-[#1F487C]">
              Rewards/Offers
            </p>
          </div>{" "}
          {/* <div className="flex items-center justify-center gap-[0.5vw]">
            <div className="md:block hidden">
              <img className=" w-[1.6vw] h-[1.6vw] " src={profile} />
            </div>
            <div className="md:hidden block" onClick={handleLoginPage}>
              <img className=" w-[7vw] h-[7vw]" src={profile} />
            </div>
            <p
              className="text-[1.2vw] hidden md:block font-semibold text-[#1F487C] cursor-pointer"
              onClick={() => setLoginIsOpen(true)}
            >
              {`${
                sessionStorage.getItem("user_name") &&
                sessionStorage.getItem("user_name") != "null"
                  ? sessionStorage.getItem("user_name")
                  : "Login/SignUp"
              }`}
            </p>
          </div> */}
          {LoginUser_Name && LoginUser_Name != "null" ? (
            <div>
              <Dropdown
                menu={{
                  items,
                }}
                className="flex items-center gap-[0.5vw] cursor-pointer"
              >
                <a onClick={(e) => e.preventDefault()}>
                  <Space>
                    <div className="flex items-center  gap-[0.5vw]">
                      <div>
                        <FaUserCircle size="1.5vw" color="#1F487C" />
                      </div>
                      <p className="text-[1.2vw] font-semibold text-[#1F487C]">
                        {capitalizeFirstLetter(LoginUser_Name)}
                      </p>
                    </div>
                  </Space>
                </a>
              </Dropdown>
            </div>
          ) : (
            <div
              className="flex items-center justify-center gap-[0.5vw] cursor-pointer"
              onClick={() => setLoginIsOpen(true)}
            >
              <img className="w-[1.6vw] h-[1.6vw]" src={profile} />
              <p className="text-[1.2vw] font-semibold text-[#1F487C]">
                Login/SignUp
              </p>
            </div>
          )}
        </div>
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
