import React, { useEffect, useState } from "react";
import homesky from "../../../Assets/Theme/Sky/BackgroundSky1.png";
import { CgProfile } from "react-icons/cg";
import { MdHelpOutline } from "react-icons/md";
import { VscReferences } from "react-icons/vsc";
import { HiUserGroup } from "react-icons/hi";
//import "../../../Components/Home/test.css";
import HomeProfile from "./Profile/Profile";
// import MyBookingIndex from "./MyBookings/Index";
import ReferralsIndex from "./Referrals/Referrals";
import PassengerIndex from "./Passenger/Index";
// import TicketIndex from "./ViewTicket/TicketIndex";
// import CancelIndex from "./CancelTicket/CancelIndex";
import { useAsyncError, useLocation, useNavigate } from "react-router";
import Help from "./Help/Help";
import { TbTicketOff } from "react-icons/tb";
import { ImTicket } from "react-icons/im";
import Navbar_One from "../../Common/Top-Navbar/Navbar-One";
//import BottomNavbar from "../../MobileView/BottomNavbar";
import Footer1 from "../../Home/Footer/Footer-Two/FooterTwo";
import Footer2 from "../../Home/Footer/Footer-Three/FooterThree";
import { FaTicketAlt } from "react-icons/fa";
import { Drawer } from "antd";
import LoginMobile from "../../Home/Login/LoginMobile";
import ViewTicket from "./ViewTicket/ViewTicket";
import moment from "moment";
import BottomNavbar from "../../Common/Mobile-NavBar/BottomNavBar";
import FooterTwo from "../../Home/Footer/Footer-Two/FooterTwo";
import FooterThree from "../../Home/Footer/Footer-Three/FooterThree";
import CancelIndex from "./CancelTicket/CancelIndex";
import { decryptData } from "../../Common/Common-Functions/Encrypt-Decrypt";

export default function MyAccountIndex() {
  const [currenttab, setCurrentTab] = useState();
  console.log(currenttab, "current_tab");
  const location = useLocation();
  const name = sessionStorage.getItem("user_name");
  const decryptname = name && decryptData(name);
  const [userName, setUserName] = useState(decryptname || "");
  const [loginMobileIsOpen, setLoginMobileIsOpen] = useState(false);
  const [togglePage, setTogglePage] = useState(false);
  useEffect(() => {
    // Set currenttab based on the passed state or default to 1
    const tabIndex = location.state?.tabIndex;
    setCurrentTab(tabIndex);
  }, [location.state]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const navigation = useNavigate();

  useEffect(() => {
    const name = sessionStorage.getItem("user_name");
    const decryptname = name && decryptData(name);
    const storedName = decryptname;
    if (storedName !== userName) {
      setUserName(storedName);
    }
    console.log(storedName, "userName");
  }, [userName]);

  const busFrom = localStorage.getItem("departure");
  const busTo = localStorage.getItem("arrival");
  const fromSourceID = localStorage.getItem("departureID");
  const toSourceID = localStorage.getItem("arrivalID");
  const jdate = localStorage.getItem("selectedDate");

  useEffect(() => {
    if (fromSourceID || toSourceID) {
      setTogglePage(true);
    } else {
      setTogglePage(false);
    }
  }, [fromSourceID, toSourceID]);
  const id = sessionStorage.getItem("user_id");
    const decrypid = id && decryptData(id);
  return (
    <>
      <div className="bg-[#E5FFF1] md:min-h-screen md:max-h-screen w-full h-screen overflow-clip">
        <div>
          <div>
            {/* <HomeHearder /> */}
            <Navbar_One userName={userName} setUserName={setUserName} />
          </div>
          <div className="relative h-screen bg-[#E5FFF1]">
            <div
              // className="md:h-[10vw] h-[20vw] overflow-x-hidden"
              className={`md:h-[10vw] h-[20vw] overflow-x-hidden`}
              style={{
                backgroundImage: `url(${homesky})`,
                overflow: "hidden",
                position: "relative",
                width: "100%",
              }}
            >
              <label className=" flex absolute left-[4vw] top-[1.5vw] text-[5vw] md:text-[1.4vw] z-[2] text-white font-bold">
                {togglePage === false ? (
                  <span
                    className="pr-[0.5vw] underline underline-offset-2 cursor-pointer "
                    onClick={() => navigation("/")}
                  >
                    Home
                  </span>
                ) : (
                  <span
                    className="pr-[0.5vw] underline underline-offset-2 cursor-pointer "
                    onClick={() =>
                      navigation(
                        `/buslist/${busFrom}/${fromSourceID}/${busTo}/${toSourceID}/${moment(
                          jdate
                        ).format("YYYY-MM-DD")}`
                      )
                    }
                  >
                    Dashboard
                  </span>
                )}
                {" > "}
                <span className="underline underline-offset-2 md:block hidden">
                  My Account
                </span>
                <span
                  onClick={() => navigation("/settings")}
                  className="underline underline-offset-2 md:hidden block"
                >
                  My Account
                </span>
                {" > "}
                {currenttab === 1
                  ? "Profile"
                  : currenttab === 2
                  ? "Passengers"
                  : currenttab === 3
                  ? "My Bookings"
                  : currenttab === 4
                  ? "Referrals"
                  : currenttab === 5
                  ? "View Ticket"
                  : currenttab === 6
                  ? "Cancel Ticket"
                  : "Help"}
              </label>
              <div className="cloudhome"></div>
            </div>

            <div className="w-auto">
              <div className="absolute md:block hidden top-[5vw] left-[4vw]">
                <div
                  className={`${
                    currenttab === 1 ? "bg-[#1F487C]" : "bg-white"
                  } cursor-pointer w-[18vw] h-[5vw] rounded-tl-[1vw] rounded-tr-[1vw] border-[0.1vw] border-[#1F487C] flex items-center pl-[4vw]`}
                  onClick={() => setCurrentTab(1)}
                >
                  <div className="flex items-center gap-x-[1vw]">
                    <CgProfile
                      size={"1.3vw"}
                      color={` ${currenttab === 1 ? "white" : "#1F487C"}`}
                    />
                    <label
                      className={`${
                        currenttab === 1 ? "text-white" : "text-[#1F487C]"
                      } text-[#1F487C] font-bold text-[1.3vw] cursor-pointer`}
                    >
                      Profile
                    </label>
                  </div>
                </div>
              </div>
              <div className="absolute md:block hidden top-[10vw] left-[4vw]">
                <div
                  className={`${
                    currenttab === 2 ? "bg-[#1F487C]" : "bg-white"
                  } cursor-pointer w-[18vw] h-[5vw] flex items-center pl-[4vw] border-l-[0.1vw] border-r-[0.1vw] border-b-[0.1vw] border-[#1F487C]`}
                  onClick={() => setCurrentTab(2)}
                >
                  <div className="flex items-center gap-x-[1vw]">
                    <HiUserGroup
                      size={"1.3vw"}
                      color={` ${currenttab === 2 ? "white" : "#1F487C"}`}
                    />
                    <label
                      className={`${
                        currenttab === 2 ? "text-white" : "text-[#1F487C]"
                      } text-[#1F487C] font-bold text-[1.3vw] cursor-pointer`}
                    >
                      Passengers
                    </label>
                  </div>
                </div>
              </div>
              <div className="absolute md:block hidden top-[15vw] left-[4vw]">
                <div
                  className={`${
                    currenttab === 3 ? "bg-[#1F487C]" : "bg-white"
                  } cursor-pointer w-[18vw] h-[5vw] flex items-center pl-[4vw] border-l-[0.1vw] border-r-[0.1vw] border-b-[0.1vw] border-[#1F487C]`}
                  onClick={() => setCurrentTab(3)}
                >
                  <div className="flex items-center gap-x-[1vw]">
                    <FaTicketAlt
                      color={` ${currenttab === 3 ? "white" : "#1F487C"}`}
                      className="h-[5vw] w-[5vw] md:h-[1.5vw] md:w-[1.5vw]"
                    />{" "}
                    <label
                      className={`${
                        currenttab === 3 ? "text-white" : "text-[#1F487C]"
                      } text-[#1F487C] font-bold text-[1.3vw] cursor-pointer`}
                    >
                      My Bookings
                    </label>
                  </div>
                </div>
              </div>
              <div className="absolute md:block hidden top-[20vw] left-[4vw]">
                <div
                  className={`${
                    currenttab === 4 ? "bg-[#1F487C]" : "bg-white"
                  } cursor-pointer w-[18vw] h-[5vw] flex items-center pl-[4vw] border-l-[0.1vw] border-r-[0.1vw] border-b-[0.1vw] border-[#1F487C]`}
                  onClick={() => setCurrentTab(4)}
                >
                  <div className="flex items-center gap-x-[1vw]">
                    <VscReferences
                      size={"1.3vw"}
                      color={` ${currenttab === 4 ? "white" : "#1F487C"}`}
                    />
                    <label
                      className={`${
                        currenttab === 4 ? "text-white" : "text-[#1F487C]"
                      } text-[#1F487C] font-bold text-[1.3vw] cursor-pointer`}
                    >
                      Referrals
                    </label>
                  </div>
                </div>
              </div>
              <div className="absolute md:block hidden top-[25vw] left-[4vw]">
                <div
                  className={`${
                    currenttab === 5 ? "bg-[#1F487C]" : "bg-white"
                  } cursor-pointer w-[18vw] h-[5vw] flex items-center pl-[4vw] border-l-[0.1vw] border-r-[0.1vw] border-b-[0.1vw] border-[#1F487C]`}
                  onClick={() => setCurrentTab(5)}
                >
                  <div className="flex items-center gap-x-[1vw]">
                    <ImTicket
                      size={"1.3vw"}
                      color={` ${currenttab === 5 ? "white" : "#1F487C"}`}
                    />
                    <label
                      className={`${
                        currenttab === 5 ? "text-white" : "text-[#1F487C]"
                      } text-[#1F487C] font-bold text-[1.3vw] cursor-pointer`}
                    >
                      View Ticket
                    </label>
                  </div>
                </div>
              </div>
              <div className="absolute md:block hidden top-[30vw] left-[4vw]">
                <div
                  className={`${
                    currenttab === 6 ? "bg-[#1F487C]" : "bg-white"
                  } cursor-pointer w-[18vw] h-[5vw] flex items-center pl-[4vw] border-l-[0.1vw] border-r-[0.1vw] border-b-[0.1vw] border-[#1F487C]`}
                  onClick={() => setCurrentTab(6)}
                >
                  <div className="flex items-center gap-x-[1vw]">
                    <TbTicketOff
                      size={"1.3vw"}
                      color={` ${currenttab === 6 ? "white" : "#1F487C"}`}
                    />
                    <label
                      className={`${
                        currenttab === 6 ? "text-white" : "text-[#1F487C]"
                      } text-[#1F487C] font-bold text-[1.3vw] cursor-pointer`}
                    >
                      Cancel Ticket
                    </label>
                  </div>
                </div>
              </div>
              <div className="absolute md:block hidden top-[35vw] left-[4vw]">
                <div
                  className={`${
                    currenttab === 7 ? "bg-[#1F487C]" : "bg-white"
                  } cursor-pointer w-[18vw] h-[5vw] rounded-bl-[1vw] rounded-br-[1vw] flex items-center pl-[4vw] border-l-[0.1vw] border-r-[0.1vw] border-b-[0.1vw] border-[#1F487C]`}
                  onClick={() => setCurrentTab(7)}
                >
                  <div className="flex items-center gap-x-[1vw]">
                    <MdHelpOutline
                      size={"1.5vw"}
                      color={` ${currenttab === 7 ? "white" : "#1F487C"}`}
                    />
                    <label
                      className={`${
                        currenttab === 7 ? "text-white" : "text-[#1F487C]"
                      } text-[#1F487C] font-bold text-[1.3vw] cursor-pointer`}
                    >
                      Help
                    </label>
                  </div>
                </div>
              </div>
              <div className="absolute left-[5vw] md:left-[25vw] top-[12vw] md:top-[5vw]">
                <div className="md:h-[35vw] md:w-[71vw] h-full w-[90vw]">
                  {!decrypid ? (
                    <div className="md:hidden block">
                      <div className="flex flex-col items-center justify-center bg-white w-[100%] py-[10vw] rounded-[2vw] shadow-2xl gap-[3.5vw]">
                        <span> Need to Log In to Access Your Bookings.</span>
                        <div
                          onClick={() => {
                            setLoginMobileIsOpen(true);
                          }}
                          className="flex items-center justify-center bg-[#1F487C] text-white rounded-[1vw] text-[5vw] cursor-pointer w-1/4 py-[1.5vw]"
                        >
                          Log-In
                        </div>
                      </div>
                    </div>
                  ) : (
                    <>
                      {currenttab === 1 && (
                        <HomeProfile
                          userName={userName}
                          setUserName={setUserName}
                        />
                      )}
                      {currenttab === 2 && <PassengerIndex />}
                      {/* {currenttab === 3 && <MyBookingIndex />} */}
                      {currenttab === 4 && <ReferralsIndex />}
                      {currenttab === 5 && <ViewTicket />}
                      {currenttab === 6 && <CancelIndex />}
                      {currenttab === 7 && <Help />}
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className="block md:hidden">
              {/* {currenttab === 4 && <ReferralsIndex />} */}
            </div>
          </div>
        </div>
        <div className="md:hidden block">
          <BottomNavbar />
        </div>
      </div>

      <Drawer
        onClose={() => setLoginMobileIsOpen(false)}
        placement={"bottom"}
        closable={true}
        open={loginMobileIsOpen}
        className="custom-drawer"
        height="100%"
        width="100%"
      >
        <LoginMobile setLoginMobileIsOpen={setLoginMobileIsOpen} />
      </Drawer>
    </>
  );
}
