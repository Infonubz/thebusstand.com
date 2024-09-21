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
import { Link, NavLink, useNavigate } from "react-router-dom";
import { IoMdArrowBack } from "react-icons/io";
import homesky from "../../assets/BackgroundSky1.png";
import CommonMainNavbar from "../Common/CommonMainNavbar";
import Footer from "./Footer";
import Footer1 from "../Footer/Footer";

const BusOpp = () => {
  const BusOperator = [
    "SRS Travels",
    "VRL Travels",
    "JBT Travels",
    "Humsafar Travels",
    "Kallada Travels",
    "Chartered Speed",
    "Shatabdi Travels",
    "Mahasagar Travels",
    "SRS Travels",
    "VRL Travels",
    "JBT Travels",
    "Humsafar Travels",
    "Kallada Travels",
    "Chartered Speed",
    "Shatabdi Travels",
    "Mahasagar Travels",
    "SRS Travels",
    "VRL Travels",
    "JBT Travels",
    "Humsafar Travels",
    "Kallada Travels",
    "Chartered Speed",
    "Shatabdi Travels",
    "Mahasagar Travels",
  ];
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const closeModal = () => {
    setModalIsOpen(false);
    setShowDialog(false);
  };
  const [showDialog, setShowDialog] = useState(false);

  const navigation = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <div className="bg-[#E5FFF1] border-b-2 bg-[#E5FFF1] min-h-screen max-h-auto w-full> md:block hidden">
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
            <label className="absolute left-[30vw] md:left-[30vw] top-[2vw] md:top-[0.1vw] text-[6vw]  md:text-[4vw] text-white font-bold opacity-20">
              {`Private Bus Operators`}
            </label>
            <label className="absolute left-[37vw] top-[5vw] md:top-[2vw] text-[3vw]  md:text-[2vw] text-white font-bold">
              {"Private Bus Operators"}
            </label>
            <div className="cloudhome"></div>
          </div>
          <div className="absolute top-[7vw] left-[12.5vw] bg-white w-3/4 h-[35vw] rounded-lg md:block hidden">
            <div className="px-[5vw]">
              <div className=" w-full flex px-[2vw] items-center justify-between my-[1vw] ">
                <p className="text-[1.5vw] text-[#1F487C] font-bold">
                  4500+ Private Bus Operators
                </p>
              </div>
              <div className="max-h-[28vw]  overflow-y-auto">
                <div className="grid grid-cols-4 w-full px-[2vw] mt-[2vw] ">
                  {BusOperator.map((item) => (
                    <div className="col-span-1 w-full py-[0.8vw] ">
                      <p className="text-[1.2vw]">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <ModalPopup
        show={modalIsOpen}
        onClose={closeModal}
        height="28vw"
        width="32vw"
      >
        <ShareButtons url={"http://localhost:3008/"} />
      </ModalPopup>

      {/* ------------------------MobileView------------------- */}
      <div className="md:hidden block">
        <div className="bg-[#1f487c] ">
          <div className="grid grid-cols-6 items-center px-[5vw]">
            <div className="col-span-2 py-5">
              <NavLink to="/">
                <IoMdArrowBack className="w-[6vw] h-[6vw]" color="white" />
              </NavLink>
            </div>
            <div className="col-span-2 text-white">Bus Companies</div>
          </div>
        </div>
        <div className=" bg-[#E5FFF1] min-h-screen max-h-auto overflow-auto absolute w-full ">
          <div className=" w-full flex px-[2vw] items-center justify-between ">
            <p className="md:text-[1.5vw] text-[5vw] text-[#1F487C] font-bold">
              4500+ Private Bus Operators
            </p>
          </div>
          <div className="grid md:grid-cols-6 grid-cols-3 w-full  px-[2vw] my-[2vw] ">
            {BusOperator.map((item) => (
              <div className="col-span-1 w-full py-[0.8vw]">
                <p className="md:text-[1.2vw] text-[2.8vw]">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ------------------------MobileView------------------- */}
    </>
  );
};

export default BusOpp;
