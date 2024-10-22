import React from "react";
import ColorCodes from "../Common/ColorCodes";
import { FaRegUserCircle } from "react-icons/fa";
import { HiUserGroup } from "react-icons/hi";
import { LuLayoutList } from "react-icons/lu";
import { VscReferences } from "react-icons/vsc";
import { ImTicket } from "react-icons/im";
import { TbTicketOff } from "react-icons/tb";
import { MdHelpOutline } from "react-icons/md";
import { FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router";
import BottomNavbar from "./BottomNavbar";

export default function Settings() {
  const colors = ColorCodes();
  const navigation = useNavigate();
  const handleonclick = (tab) => {
    navigation("/main", { state: { tabIndex: tab } });
  };
  return (
    <>
    <div className={`bg-[${colors.background}] h-screen w-full`}>
      <div className="py-[2vw]">
        <div className="flex items-center px-[5vw] py-[5vw]  gap-x-[3vw]">
          {/* <span>
            <FaRegUserCircle color={`${colors.primary}`} size={"10vw"} />
          </span> */}
          <label className={`text-[8vw] text-[${colors.primary}] font-bold`}>
            Manoj
          </label>
        </div>
        <div>
          <div
            className={`flex items-center px-[5vw] gap-x-[3vw] border-t-[0.1vw] py-[3vw] border-[${colors.primary}]`}
            onClick={() => handleonclick(1)}
          >
            <span>
              <FaRegUserCircle color={`${colors.primary}`} size={"7vw"} />
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
    </div>
    <BottomNavbar/>
    </>
  );
}
