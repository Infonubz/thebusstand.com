import React, { useEffect, useState } from "react";
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
import { Link, NavLink, useNavigate } from "react-router-dom";
import { IoMdArrowBack } from "react-icons/io";
import homesky from "../../assets/BackgroundSky1.png";
import CommonMainNavbar from "../Common/CommonMainNavbar";
import Footer from "./Footer";

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
  const navigation = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  return (
    <>
      <div className="bg-[#E5FFF1] bg-[#E5FFF1] min-h-screen max-h-auto w-full  md:block hidden ">
        <CommonMainNavbar />

        <div
          className="relative md:h-[45vw] h-[100%] bg-[#d1f8e3]"
          style={{ zIndex: 1 }}
        >
          <div
            className="md:h-[10vw] h-[14vw] z-[1] md:z-0 overflow-x-hidden"
            style={{
              backgroundImage: `url(${homesky})`,
              width: "100%",
              overflow: "hidden",
              // backgroundSize: "cover",
              position: "relative",
              overflowX: "hidden",
              width: "100%",
            }}
          >
            <label className="absolute left-[39vw] md:left-[43vw] top-[2vw] md:top-[0.1vw] text-[6vw]  md:text-[4vw] text-white font-bold opacity-20">
              {`RTCs`}
            </label>
            <label className="absolute left-[45vw] top-[5vw] md:top-[2vw] text-[3vw]  md:text-[2vw] text-white font-bold">
              {"RTCs"}
            </label>
            <div className="cloudhome"></div>
          </div>

          <div className="absolute top-[7vw] left-[12.5vw] bg-white w-3/4 h-[35vw] rounded-lg md:block hidden">
            <div className="">
              <div className="px-[5vw] py-[1.5vw] ">
                {/* <p className=" text-[1.5vw] pl-[2vw] text-[#1F487C] font-bold pt-[3vw] pb-[1vw]">
                We’ve partnered with the world’s best bus companies
              </p> */}
                <div className=" w-full flex px-[2vw] items-center justify-between py-[1vw] ">
                  <p className="text-[1.5vw] text-[#1F487C] font-bold">
                    26 RTCs
                  </p>
                </div>
                <div className="max-h-[28vw]  overflow-y-auto">
                  <div className="grid grid-cols-5 w-full py-[1vw]">
                    {busdetails.map((item) => (
                      <div className="col-span-1 w-full items-center justify-center py-[.5vw]  flex-col">
                        <img
                          src={item.logo}
                          className="w-[8vw] h-[8vw] ml-[1vw] rounded-full"
                        />
                        <p className="text-center py-[0.5vw] text-[1vw] pr-[3vw]">
                          {item.label}
                        </p>
                      </div>
                    ))}
                  </div>
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
      </div>
      <Footer />
      {/* ------------------------MObileView----------------------------------- */}

      <div className=" md:hidden block">
        <div className="bg-[#1f487c] ">
          <div className="grid grid-cols-6 items-center px-[5vw]">
            <div className="col-span-2 py-5">
              <NavLink to="/">
                <IoMdArrowBack className="w-[6vw] h-[6vw]" color="white" />
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
