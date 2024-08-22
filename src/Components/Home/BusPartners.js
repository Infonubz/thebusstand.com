import React, { useState } from "react";
import buslogo from "../../../src/assets/502-ai 1.png";
import busstand from "../../../src/assets/busstand.png";
import bus from "../../../src/assets/bus 1.png";
import share from "../../../src/assets//Share.png";
import ticket from "../../../src/assets/ticket.png";
import profile from "../../../src/assets/Profile.png";
import ShareButtons from "../MainComponenet/ShareButton";
import ModalPopup from "../MainComponenet/Modal/ModalPopup";
import join from "../../assets/join.png";

import bus1 from "../../assets/Ellipse 1 (2).png";
import bus2 from "../../assets/Ellipse 1 (3).png";
import bus3 from "../../assets/Ellipse 1 (4).png";
import bus4 from "../../assets/Ellipse 1 (5).png";
import bus5 from "../../assets/Ellipse 1 (6).png";
import bus6 from "../../assets/Ellipse 1 (7).png";
import bus7 from "../../assets/Ellipse 1 (8).png";
import bus8 from "../../assets/Ellipse 1 (9).png";
import bus10 from "../../assets/Ellipse.png";
import bus11 from "../../assets/Ellipse 1 (5).png";
import { Link, NavLink } from "react-router-dom";
import { IoMdArrowBack } from "react-icons/io";

const BusPartners = () => {
  const busdetails = [
    {
      label: "KSRTC",
      logo: bus10,
    },
    {
      label: "APSRTC",
      logo: bus1,
    },
    {
      label: "GSRTC",
      logo: bus2,
    },
    {
      label: "TSRTC",
      logo: bus3,
    },
    {
      label: "MSRTC",
      logo: bus11,
    },
    {
      label: "Kerala RTC",
      logo: bus5,
    },
    {
      label: "SBSTC",
      logo: bus6,
    },
    {
      label: "RSRTC",
      logo: bus7,
    },
    {
      label: "UPSRTC",
      logo: bus8,
    },
  ];
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const closeModal = () => {
    setModalIsOpen(false);
    setShowDialog(false);
  };
  const [showDialog, setShowDialog] = useState(false);

  return (
    <>
      <div className="bg-[#E5FFF1] bg-[#E5FFF1] min-h-screen max-h-auto w-full  md:block hidden ">
        <div className="border-b-2">
          <div className="h-[4.5vw] w-full flex">
            <div className="w-[40%] h-[4vw] flex ">
              <img className="w-[6.25vw] h-[4vw]" src={buslogo} />
              <img src={busstand} className="h-[4vw] w-[20vw] py-[0.1vw]" />
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
              <img src={join} className="w-[17vw] h-full" />
            </div>
            <div className="w-[35%]  h-full   flex gap-[2vw] items-center justify-center">
              <div
                className="flex items-center justify-center gap-[0.5vw] cursor-pointer"
                onClick={() => setModalIsOpen(true)}
              >
                <img className="w-[1.6vw] h-[1.6vw]" src={share} />
                <p className="text-[1.2vw] font-semibold text-[#1F487C]">
                  Share
                </p>
              </div>
              <div className="flex items-center justify-center gap-[0.5vw]">
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

        <div className="bg-[#E5FFF1] ">
          <div>
            <div className="px-[5vw] ">
              <p className=" text-[1.5vw] pl-[2vw] text-[#1F487C] font-bold pt-[3vw] pb-[1vw]">
                We’ve partnered with the world’s best bus companies
              </p>
              <div className=" w-full flex px-[2vw] items-center justify-between ">
                <p className="text-[1.5vw] text-black">26 RTCs</p>
              </div>
              <div className="grid grid-cols-9 w-full py-[1vw]">
                {busdetails.map((item) => (
                  <div className="col-span-1 w-full items-center justify-center flex-col">
                    <img
                      src={item.logo}
                      className="w-[8vw] h-[8vw] ml-[1vw] rounded-full"
                    />
                    <p className="text-center py-[0.5vw] text-[1vw]">
                      {item.label}
                    </p>
                  </div>
                ))}
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
          </div>
        </div>
      </div>

      {/* ------------------------MObileView----------------------------------- */}

      <div className=" md:hidden block">
      <div className="bg-[#1f487c] ">
          <div className="grid grid-cols-6 items-center px-[5vw]">
            <div className="col-span-2 py-5">
              <NavLink to="/">
                <IoMdArrowBack className="w-[6vw] h-[6vw]" color="white"/>
              </NavLink>
            </div>
            <div className="col-span-2 text-white">Bus Operators</div>
          </div>
        </div>
        <div className=" bg-[#E5FFF1] min-h-screen max-h-auto overflow-auto absolute w-full ">
          <p className=" text-[3.5vw] pl-[2vw] text-[#1F487C] font-bold pt-[3vw] pb-[1vw]">
            We’ve partnered with the world’s best bus companies
          </p>
          <div className=" w-full flex px-[2vw] items-center justify-between ">
            <p className="text-[3vw] text-black">26 RTCs</p>
          </div>
          <div className="relative overflow-y-auto scrollbar-hide">
            <div className="grid grid-cols-2 w-full py-[1vw] place-items-center">
              {busdetails.map((item) => (
                <div className=" w-[25vw] flex-shrink-0">
                  {/* <div className="w-[40vw]"> */}
                  <img
                    src={item.logo}
                    className="w-[25vw] h-[25vw]  rounded-full"
                  />
                  <p className="text-center py-[0.5vw] text-[3vw]">
                    {item.label}
                  </p>
                  {/* </div> */}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ------------------------MObileView----------------------------------- */}
    </>
  );
};

export default BusPartners;
