import React, { useState } from "react";
import ColorCodes from "../../Common/Common-Functions/ColorCodes";
import { FaRegUserCircle } from "react-icons/fa";
import { HiUserGroup } from "react-icons/hi";
import { LuLayoutList } from "react-icons/lu";
import { VscReferences } from "react-icons/vsc";
import { ImTicket } from "react-icons/im";
import { TbTicketOff } from "react-icons/tb";
import { MdHelpOutline } from "react-icons/md";
import { FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router";
import BottomNavbar from "../../Common/Mobile-NavBar/BottomNavBar";
import { Drawer, Tooltip } from "antd";
import LoginMobile from "../../Home/Login/LoginMobile";
import homesky from "../../../Assets/Theme/Sky/BackgroundSky1.png";
import { toast } from "react-toastify";

export default function Settings() {
  const colors = ColorCodes();
  const navigation = useNavigate();

  const [currenttab, setCurrentTab] = useState(1);

  const [loginMobileIsOpen, setLoginMobileIsOpen] = useState(false);

  const handleonclick = (tab) => {
    navigation("/main", { state: { tabIndex: tab } });
  };
  const userName = sessionStorage.getItem("user_name");

  const firstWord = userName?.split(" ")[0];

  const secondWord = userName?.split(" ")[1] || "";

  const firstLetter = firstWord?.charAt(0)?.toUpperCase();
  const secondLetter = secondWord?.charAt(0)?.toUpperCase();

  const initials = firstLetter + (secondLetter || "");

  return (
    <>
      <div className="bg-[#E5FFF1] md:min-h-screen md:max-h-screen w-full h-screen">
        <div className="relative h-screen ">
          <div
            className={`
               overflow-x-hidden h-[20vw]`}
            style={{
              backgroundImage: `url(${homesky})`,
              overflow: "hidden",
              position: "relative",
              width: "100%",
            }}
          >
            <label className=" flex absolute left-[5vw] top-[4.5vw] text-[7.5vw] md:text-[1.4vw] z-[2] text-white font-bold">
              My Account
            </label>
            <div className="cloudhome"></div>
          </div>
          <div className="absolute top-[17.5vw]">
            {sessionStorage.getItem("user_id") ? (
              <div className="py-[2vw]  w-screen">
                <div className="flex items-center px-[5vw] py-[5vw]  gap-x-[3vw]">
                  <label
                    className={`text-[6.5vw] text-[${colors.primary}] font-bold`}
                  >
                    {`Hi! `}
                    {firstWord?.length > 10 ? (
                      <Tooltip
                        title={userName}
                        color="white"
                        overlayInnerStyle={{
                          color: "#1F487C",
                          fontSize: "5vw",
                        }}
                      >
                        {firstWord.slice(0, 10) + "..."}
                      </Tooltip>
                    ) : (
                      firstWord
                    )}
                  </label>
                </div>
                <div>
                  <div
                    className={`flex items-center px-[5vw] gap-x-[3vw] border-t-[0.1vw] py-[3vw] border-[${colors.primary}]`}
                    onClick={() => handleonclick(1)}
                  >
                    <span>
                      <FaRegUserCircle
                        color={`${colors.primary}`}
                        size={"7vw"}
                      />
                    </span>
                    <label className={`text-[5vw] text-[${colors.primary}] `}>
                      Profile
                    </label>
                  </div>
                  <div
                    className={`flex items-center px-[5vw] gap-x-[3vw] border-t-[0.1vw] py-[3vw] border-[${colors.primary}]`}
                    onClick={() => handleonclick(2)}
                  >
                    <span>
                      <HiUserGroup color={`${colors.primary}`} size={"7vw"} />
                    </span>
                    <label className={`text-[5vw] text-[${colors.primary}] `}>
                      Passengers
                    </label>
                  </div>
                  <div
                    className={`flex items-center px-[5vw] gap-x-[3vw] border-t-[0.1vw] py-[3vw] border-[${colors.primary}]`}
                    onClick={() => handleonclick(3)}
                  >
                    <span>
                      <LuLayoutList color={`${colors.primary}`} size={"7vw"} />
                    </span>
                    <label className={`text-[5vw] text-[${colors.primary}] `}>
                      My Bookings
                    </label>
                  </div>
                  <div
                    className={`flex items-center px-[5vw] gap-x-[3vw] border-t-[0.1vw] py-[3vw] border-[${colors.primary}]`}
                    onClick={() => handleonclick(4)}
                  >
                    <span>
                      <VscReferences color={`${colors.primary}`} size={"7vw"} />
                    </span>
                    <label className={`text-[5vw] text-[${colors.primary}] `}>
                      Referrals
                    </label>
                  </div>
                  <div
                    className={`flex items-center px-[5vw] gap-x-[3vw] border-t-[0.1vw] py-[3vw] border-[${colors.primary}]`}
                    onClick={() => handleonclick(5)}
                  >
                    <span>
                      <ImTicket color={`${colors.primary}`} size={"7vw"} />
                    </span>
                    <label className={`text-[5vw] text-[${colors.primary}] `}>
                      View Ticket
                    </label>
                  </div>
                  <div
                    className={`flex items-center px-[5vw] gap-x-[3vw] border-t-[0.1vw] py-[3vw] border-[${colors.primary}]`}
                    onClick={() => handleonclick(6)}
                  >
                    <span>
                      <TbTicketOff color={`${colors.primary}`} size={"7vw"} />
                    </span>
                    <label className={`text-[5vw] text-[${colors.primary}] `}>
                      Cancel Ticket
                    </label>
                  </div>
                  <div
                    className={`flex items-center px-[5vw] gap-x-[3vw] border-t-[0.1vw] py-[3vw] border-[${colors.primary}]`}
                    onClick={() => handleonclick(7)}
                  >
                    <span>
                      <MdHelpOutline color={`${colors.primary}`} size={"7vw"} />
                    </span>
                    <label className={`text-[5vw] text-[${colors.primary}] `}>
                      Help
                    </label>
                  </div>
                  <div
                    className={`flex items-center px-[5vw] gap-x-[3vw] border-t-[0.1vw] py-[3vw] border-[${colors.primary}]`}
                    onClick={() => {
                      console.log("hiiiiii", "main");
                      navigation("/");
                      toast.success("Logged Out Successfully.");
                      sessionStorage.clear();
                    }}
                  >
                    <span>
                      <FiLogOut color={`${colors.primary}`} size={"7vw"} />
                    </span>
                    <label className={`text-[5vw] text-[${colors.primary}] `}>
                      Logout
                    </label>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <div className="flex flex-col items-center justify-center gap-y-[2vw] w-screen">
                  <div className="flex flex-col items-center justify-center bg-white w-[90%] py-[10vw] rounded-[2vw] shadow-2xl gap-[3.5vw]">
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
              </>
            )}
            <BottomNavbar />
          </div>
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
