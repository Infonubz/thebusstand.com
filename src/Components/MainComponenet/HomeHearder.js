import React, { useState } from "react";
import Partner from "../../assets/Partner.png";
import buslogo from "../../../src/assets/502-ai 1.png";
import busstand from "../../../src/assets/busstand.png";
import bus from "../../../src/assets/bus 1.png";
import share from "../../../src/assets//Share.png";
import ticket from "../../../src/assets/ticket.png";
import profile from "../../../src/assets/Profile.png";
import ShareButtons from "../MainComponenet/ShareButton";
import { Link, NavLink, useNavigate } from "react-router-dom";
export default function HomeHearder() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const navigation = useNavigate();
  return (
    <>
      <div className="md:block hidden">
        <div className="h-[4.5vw] w-full flex bg-[#E5FFF1] ">
          <div className="w-[40%] h-[4vw] flex ">
            <img className="w-[6.25vw] h-[4vw]" src={buslogo} onClick={() => navigation('/')} />
            <img src={busstand} className="h-[4vw] w-[20vw] py-[0.1vw]" onClick={() => navigation('/')} />
            <p className="border-r-[0.3vw] border-[#1F487C] mt-[0.2vw] h-[4vw] ml-[1vw]"></p>
            <div className="w-[9vw] h-[3.8vw] mt-[0.3vw] bg-[#1F487C] ml-[2vw] rounded-full  relative">
              <img
                src={bus}
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
            <img src={Partner} className="w-auto h-full" />
          </div>
          <div className="w-[35%]  h-full   flex gap-[2vw] items-center justify-center">
            <div
              className="flex items-center justify-center gap-[0.5vw] cursor-pointer"
              onClick={() => setModalIsOpen(true)}
            >
              <img className="w-[1.6vw] h-[1.6vw]" src={share} onClick={() => navigation("/rewards")} />
              <p className="text-[1.2vw] font-semibold text-[#1F487C]">Share</p>
            </div>
            <div
              className="flex items-center justify-center gap-[0.5vw]"
              onClick={() => navigation("/rewards")}
            >
              <img className="w-[1.6vw] h-[1.6vw]" src={ticket} />
              <p className="text-[1.2vw] font-semibold text-[#1F487C]">
                Rewards/Offers
              </p>
            </div>{" "}
            <div className="flex items-center justify-center gap-[0.5vw]">
              <img className="w-[1.6vw] h-[1.6vw]" src={profile} />
              <p className="text-[1.2vw] font-semibold text-[#1F487C]">
                Login/SignUp
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* ---MobileView--- */}

      <div className="md:hidden block">
        <div
          className="md:h-[4.5vw] h-[10vw]  w-full flex md:shadow-lg md:shadow-black"
        >
          <div className="w-[40%] md:h-[4vw] h-[10vw] flex ">
            <img
              className="md:w-[6.25vw] w-[15vw] md:h-[4vw] h-[10vw]"
              src={buslogo}
              onClick={() => navigation('/')}
            />
            <img
              src={busstand}
              className="md:h-[4vw] h-[10vw] md:w-[20vw] w-[40vw] py-[0.1vw]"
              onClick={() => navigation('/')}
            />
            <p className="border-r-[0.3vw] border-[#1F487C] hidden md:block mt-[0.2vw] h-[4vw] ml-[1vw]"></p>
            <div className="w-[9vw] h-[3.8vw] mt-[0.3vw]  bg-[#1F487C] ml-[2vw] rounded-full hidden md:block relative">
              <img
                src={bus}
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
            <img src={Partner} className="w-[17vw] hidden md:block h-full" />
          </div>
          <div className="w-[35%]  h-full md:pr-[0vw]  pr-[1vw] flex gap-[2vw] items-center md:justify-center justify-end">
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
            <div className="flex items-center justify-center gap-[0.5vw]" onClick={() => navigation('/rewards')}>
              <img
                className="md:w-[1.6vw] md:h-[1.6vw] w-[7vw] h-[7vw]"
                src={ticket}
              />
              <p className="hidden md:block text-[1.2vw] font-semibold text-[#1F487C]">
                Rewards/Offers
              </p>
            </div>{" "}
            <div className="flex items-center justify-center gap-[0.5vw]">
              <div className="md:block hidden">
                <img
                  className=" w-[1.6vw] h-[1.6vw] "
                  src={profile}
                />
              </div>
              <div className="md:hidden block">
                <img
                  className=" w-[7vw] h-[7vw]"
                  src={profile}
                />
              </div>
              <p
                className="text-[1.2vw] hidden md:block font-semibold text-[#1F487C] cursor-pointer"
              >
                Login/SignUp
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
