import React, { useEffect, useState } from "react";
import HomeHearder from "../../MainComponenet/HomeHearder";
import Footer from "../Footer";
import homesky from "../../../assets/BackgroundSky1.png";
import { CgProfile } from "react-icons/cg";
import { MdHelpOutline } from "react-icons/md";
import { LuLayoutList } from "react-icons/lu";
import { VscReferences } from "react-icons/vsc";
import { HiTicket, HiUserGroup } from "react-icons/hi";
import "../../../Components/Home/test.css";
import HomeProfile from "./Profile/Profile";
import PassengersList from "./Passengers/PassengersList";
import MyBookingIndex from "./MyBookings/Index";
import ReferralsIndex from "./Referrals/Index";
import PassengerIndex from "./Passengers/Index";
import MobileHelp from "./Help/MobileHelp";
import TicketIndex from "./ViewTicket/TicketIndex";
import CancelIndex from "./CancelTicket/CancelIndex";
import { useLocation, useNavigate } from "react-router";
import Help from "./Help/Help";
import { TbTicketOff } from "react-icons/tb";
import { ImTicket } from "react-icons/im";
import CommonMainNavbar from "../../Common/CommonMainNavbar";
import BottomNavbar from "../../MobileView/BottomNavbar";
import Footer1 from "../../Footer/Footer";

export default function MyAccountsDetails() {
  const [currenttab, setCurrentTab] = useState(1);
  const location = useLocation();
  const [userName, setUserName] = useState(sessionStorage.getItem("user_name") || "");

  useEffect(() => {
    // Set currenttab based on the passed state or default to 1
    const tabIndex = location.state?.tabIndex || 1;
    setCurrentTab(tabIndex);
  }, [location.state]);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const navigation = useNavigate();

  useEffect(() => {
    const storedName = sessionStorage.getItem("user_name");
    if (storedName !== userName) {
      setUserName(storedName); 
    }
    console.log(storedName, "userName")
  }, [userName])

  return (
    <>
      <div className="bg-[#E5FFF1] md:min-h-screen md:max-h-auto w-full h-screen">
        <div>
          {/* <HomeHearder /> */}
          <CommonMainNavbar userName ={userName} setUserName={setUserName} />
        </div>
        <div className="relative md:h-[45vw] h-auto z-[2] mb-[0vw]  bg-[#E5FFF1]">
          <div
            // className="md:h-[10vw] h-[20vw] overflow-x-hidden"
            className={`
              ${
                currenttab === 4
                  ? "h-[10vw] md:h-[10vw]"
                  : "md:h-[10vw] h-[20vw]"
              }
               overflow-x-hidden`}
            style={{
              backgroundImage: `url(${homesky})`,
              overflow: "hidden",
              position: "relative",
              width: "100%",
            }}
          >
            <label className="absolute left-[4vw] top-[1.5vw] text-[3.5vw] md:text-[1.4vw] z-[1] text-white font-bold">
              <span
                className="pr-[0.5vw] underline underline-offset-2 cursor-pointer "
                onClick={() => navigation("/dashboard")}
              >
                Dashboard
              </span>
              {`> My Account > ${
                currenttab === 1
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
                  : "Help"
              }`}
            </label>
            <div className="cloudhome"></div>
          </div>

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
                <LuLayoutList
                  size={"1.3vw"}
                  color={` ${currenttab === 3 ? "white" : "#1F487C"}`}
                />
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
              {currenttab === 1 && <HomeProfile userName ={userName} setUserName={setUserName}  />}
              {currenttab === 2 && <PassengerIndex />}
              {currenttab === 3 && <MyBookingIndex />}
              <div className="md:block hidden">
                {currenttab === 4 && <ReferralsIndex />}
              </div>
              {currenttab === 5 && <TicketIndex />}
              {currenttab === 6 && <CancelIndex />}
              {currenttab === 7 && <Help />}
            </div>
          </div>
          <div className="block md:hidden">
            {currenttab === 4 && <ReferralsIndex />}
          </div>
        </div>
      </div>
      <div className="md:hidden block">
        <BottomNavbar />
      </div>
      <span className="md:block hidden">
          <Footer1 />
        </span>
    </>
  );
}
