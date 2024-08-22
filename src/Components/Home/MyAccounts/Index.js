import React, { useState } from "react";
import HomeHearder from "../../MainComponenet/HomeHearder";
import Footer from "../Footer";
import homesky from "../../../assets/homesky.png";
import { CgProfile } from "react-icons/cg";
import { MdGroups, MdHelpOutline } from "react-icons/md";
import { LuLayoutList } from "react-icons/lu";
import { VscReferences } from "react-icons/vsc";
import { HiUserGroup } from "react-icons/hi";
import "../../../Components/Home/test.css";
import HomeProfile from "./Profile/Profile";
import PassengersList from "./Passengers/PassengersList";
import MyBookingIndex from "./MyBookings/Index";
import ReferralsIndex from "./Referrals/Index";
import Help from "./Help/Help";
import PassengerIndex from "./Passengers/Index";
export default function MyAccountsDetails() {
  const [currenttab, setCurrentTab] = useState(1);
  return (
    <div>
      <div className="">
        <HomeHearder />
      </div>
      <div
        className="relative h-[45vw] bg-[#E5FFF1]"
        style={{
          zIndex: 1,
        }}
      >
        {/* <img src={homesky} className="w-full h-[10vw] bg-[#2B8EE4]" /> */}
        <div
          className=" h-[10vw] overflow-x-hidden"
          style={{
            backgroundImage: `url(${homesky})`,
            overflow: "hidden",
            // backgroundSize: "cover",
            position: "relative",
            overflowX: "hidden",
            width: "100%",
          }}
        >
          <label className=" absolute left-[4vw] top-[1.5vw] text-[1.4vw] text-white font-bold">{`Home > My Account > ${
            currenttab == 1
              ? "Profile"
              : currenttab == 2
              ? "Passengers"
              : currenttab == 3
              ? "My Bokkings"
              : currenttab == 4
              ? "Referrels"
              : "Help"
          }`}</label>
          <div className="cloudhome"></div>
        </div>

        <div className="absolute top-[5vw] left-[4vw]">
          <div
            className={`${
              currenttab == 1 ? "bg-[#1F487C]" : "bg-white"
            } cursor-pointer  w-[18vw] h-[5vw] rounded-tl-[1vw] rounded-tr-[1vw] border-[0.1vw] border-[#1F487C] flex items-center pl-[4vw]`}
            onClick={() => setCurrentTab(1)}
          >
            <div className="flex items-center gap-x-[1vw]">
              <CgProfile
                size={"1.3vw"}
                color={` ${currenttab == 1 ? "white" : "#1F487C"}`}
              />
              <label
                className={`${
                  currenttab == 1 ? "text-white" : "text-[#1F487C]"
                } text-[#1F487C] font-bold text-[1.3vw]`}
              >
                Profile
              </label>
            </div>
          </div>
        </div>
        <div className="absolute top-[10vw] left-[4vw]">
          <div
            className={`${
              currenttab == 2 ? "bg-[#1F487C]" : "bg-white"
            } cursor-pointer w-[18vw] h-[5vw] flex items-center pl-[4vw] border-l-[0.1vw] border-r-[0.1vw] border-b-[0.1vw] border-[#1F487C] `}
            onClick={() => setCurrentTab(2)}
          >
            <div className="flex items-center gap-x-[1vw]">
              <HiUserGroup
                size={"1.3vw"}
                color={` ${currenttab == 2 ? "white" : "#1F487C"}`}
              />
              <label
                className={`${
                  currenttab == 2 ? "text-white" : "text-[#1F487C]"
                } text-[#1F487C] font-bold text-[1.3vw]`}
              >
                Passengers
              </label>
            </div>
          </div>
        </div>
        <div className="absolute top-[15vw] left-[4vw]">
          <div
            className={`${
              currenttab == 3 ? "bg-[#1F487C]" : "bg-white"
            } cursor-pointer w-[18vw] h-[5vw] flex items-center pl-[4vw] border-l-[0.1vw] border-r-[0.1vw] border-b-[0.1vw] border-[#1F487C] `}
            onClick={() => setCurrentTab(3)}
          >
            <div className="flex items-center gap-x-[1vw]">
              <LuLayoutList
                size={"1.3vw"}
                color={` ${currenttab == 3 ? "white" : "#1F487C"}`}
              />
              <label
                className={`${
                  currenttab == 3 ? "text-white" : "text-[#1F487C]"
                } text-[#1F487C] font-bold text-[1.3vw]`}
              >
                My Bookings
              </label>
            </div>
          </div>
        </div>
        <div className="absolute top-[20vw] left-[4vw]">
          <div
            className={`${
              currenttab == 4 ? "bg-[#1F487C]" : "bg-white"
            } cursor-pointer w-[18vw] h-[5vw] flex items-center pl-[4vw] border-l-[0.1vw] border-r-[0.1vw] border-b-[0.1vw] border-[#1F487C] `}
            onClick={() => setCurrentTab(4)}
          >
            <div className="flex items-center gap-x-[1vw]">
              <VscReferences
                size={"1.3vw"}
                color={` ${currenttab == 4 ? "white" : "#1F487C"}`}
              />
              <label
                className={`${
                  currenttab == 4 ? "text-white" : "text-[#1F487C]"
                } text-[#1F487C] font-bold text-[1.3vw]`}
              >
                Referrals
              </label>
            </div>
          </div>
        </div>
        <div className="absolute top-[25vw] left-[4vw]">
          <div
            className={` ${
              currenttab == 5 ? "bg-[#1F487C]" : "bg-white"
            } cursor-pointer w-[18vw] h-[5vw] rounded-bl-[1vw] rounded-br-[1vw]  flex items-center pl-[4vw] border-l-[0.1vw] border-r-[0.1vw] border-b-[0.1vw] border-[#1F487C] `}
            onClick={() => setCurrentTab(5)}
          >
            <div className="flex items-center gap-x-[1vw]">
              <MdHelpOutline
                size={"1.5vw"}
                color={` ${currenttab == 5 ? "white" : "#1F487C"}`}
              />
              <label
                className={`${
                  currenttab == 5 ? "text-white" : "text-[#1F487C]"
                } text-[#1F487C] font-bold text-[1.3vw]`}
              >
                Help
              </label>
            </div>
          </div>
        </div>
        <div className=" absolute left-[25vw] top-[5vw]">
          {/* <div className="bg-white h-[35vw] w-[71vw] rounded-[1vw] border-[0.1vw] border-[#1F487C] shadow-xl"> */}
          <div className="h-[35vw] w-[71vw]">
            {currenttab == 1 ? (
              <HomeProfile currenttab={currenttab} />
            ) : currenttab == 2 ? (
              <PassengerIndex />
            ) : currenttab == 3 ? (
              <MyBookingIndex />
            ) : currenttab == 4 ? (
              <ReferralsIndex />
            ) : (
              <Help />
            )}
          </div>
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}
