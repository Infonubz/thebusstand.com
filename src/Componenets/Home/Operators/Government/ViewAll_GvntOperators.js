import React, { useEffect, useState } from "react";
// import buslogo from "../../../src/assets/502-ai 1.png";
// import busstand from "../../../src/assets/busstand.png";
// import bus from "../../../src/assets/bus 1.png";
// import share from "../../../src/assets//Share.png";
// import ticket from "../../../src/assets/ticket.png";
// import profile from "../../../src/assets/Profile.png";
import ShareButtons from "../../../Common/Common-Functions/ShareButton";
import ModalPopup from "../../../Common/Modal/Modal";
// import join from "../../assets/join.png";

import bus1 from "../../../../Assets/BestBusses/bus(2).png";
import bus2 from "../../../../Assets/BestBusses/bus(3).png";
import bus3 from "../../../../Assets/BestBusses/bus(4).png";
// import bus4 from "../../assets/Ellipse 1 (5).png";
import bus5 from "../../../../Assets/BestBusses/bus(6).png";
import bus6 from "../../../../Assets/BestBusses/bus(7).png";
import bus7 from "../../../../Assets/BestBusses/bus(8).png";
import bus8 from "../../../../Assets/BestBusses/bus(9).png";
import bus10 from "../../../../Assets/BestBusses/bus.png";
import bus11 from "../../../../Assets/BestBusses/bus(5).png";
import bus13 from "../../../../Assets/BestBusses/HRTC.jpg";
import bus15 from "../../../../Assets/BestBusses/BSRTC.png";
import bus16 from "../../../../Assets/BestBusses/osrtc.png";
import bus17 from "../../../../Assets/BestBusses/TNSTC.png";
import bus18 from "../../../../Assets/BestBusses/prtc.png";
import bus19 from "../../../../Assets/BestBusses/PUNBUS.png";
import bus20 from "../../../../Assets/BestBusses/WBTC.png";
import bus21 from "../../../../Assets/BestBusses/JKSRTC.png";
// import bus9 from "../../assets/Ellipse.png";
// import { useNavigate } from "react-router-dom";
// import { IoMdArrowBack } from "react-icons/io";
import homesky from "../../../../Assets/Theme/Sky/BackgroundSky1.png";
import CommonMainNavbar from "../../../Common/Top-Navbar/Navbar-One";
// import Footer from "./Footer";
// import ColorCodes from "../Common/ColorCodes";
import { useDispatch, useSelector } from "react-redux";
import { Abhibus_GetOperators } from "../../../../Api-Abhibus/Home/HomePage";
import { Tooltip } from "antd";
//import Footer3 from "../Footer/Footer-Three/Footer-Three";

export default function ViewAll_GvntOperators() {

//   const busdetails = [
//     {
//       label: "KSRTC",
//       logo: bus10,
//     },
//     {
//       label: "APSRTC",
//       logo: bus1,
//     },
//     {
//       label: "GSRTC",
//       logo: bus2,
//     },
//     {
//       label: "TSRTC",
//       logo: bus3,
//     },
//     {
//       label: "MSRTC",
//       logo: bus11,
//     },
//     {
//       label: "Kerala RTC",
//       logo: bus5,
//     },
//     {
//       label: "SBSTC",
//       logo: bus6,
//     },
//     {
//       label: "RSRTC",
//       logo: bus7,
//     },
//     {
//       label: "UPSRTC",
//       logo: bus8,
//     },
//   ];

  const [modalIsOpen, setModalIsOpen] = useState(false);
  // const [showDialog, setShowDialog] = useState(false);
  // const navigation = useNavigate();

  // const colors = ColorCodes();
  const colors = useSelector((state) => state.themecolors[0]);
  const Get_Operators = useSelector((state) => state.get_operators);
  const dispatch = useDispatch();

  // Filter Government Operators
  const Get_GvtOperators = Get_Operators.filter((operator) =>
    operator.operater_name.toLowerCase().includes("rtc")
  );

  // Function to return the correct image based on the operator name
  const getOperatorImage = (operatorName) => {
    if (operatorName === "UPSRTC") {
      return bus8;
    } else if (operatorName === "GSRTC") {
      return bus2;
    } else if (operatorName === "RSRTC") {
      return bus7;
    } else if (operatorName === "KSRTC") {
      return bus10;
    } else if (operatorName === "APSRTC") {
      return bus1;
    } else if (operatorName === "BSRTC") {
      return bus15;
    } else if (operatorName === "TSRTC") {
      return bus3;
    } else if (operatorName === "HRTC") {
      return bus13;
    } else if (operatorName === "OSRTC") {
      return bus16;
    } else if (operatorName === "TNSTC") {
      return bus17;
    } else if (operatorName === "PRTC" || operatorName.startsWith("PRTC")) {
      return bus18;
    } else if (operatorName === "PUNBUS") {
      return bus19;
    } else if (operatorName === "WBTC") {
      return bus20;
    } else if (operatorName === "JKSRTC") {
      return bus21;
    } else if (operatorName === "MSRTC" ) {
      return bus11;
    } else if (operatorName === "KERALA-RTC") {
      return bus5;
    } else {
      return bus3;
    }
  };

  const closeModal = () => {
    setModalIsOpen(false);
    // setShowDialog(false);
  };

  // Fetch Operators
  useEffect(() => {
    Abhibus_GetOperators(dispatch);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div
        className={`bg-[${colors.background}] bg-[${colors.background}] min-h-screen  max-h-auto w-full `}
      >
        <CommonMainNavbar />

        <div
          className="relative md:h-[45vw] h-[100%] bg-[#e5fff1]"
          style={{ zIndex: 1 }}
        >
          <div
            className="md:h-[10vw] h-[20vw] z-0 overflow-x-hidden"
            style={{
              backgroundImage: `url(${homesky})`,
              width: "100%",
              overflow: "hidden",
              // backgroundSize: "cover",
              position: "relative",
              overflowX: "hidden",
            }}
          >
            <label className="absolute left-[41vw] md:left-[43vw] top-[1vw] md:top-[0.1vw] text-[8vw]  md:text-[4vw] text-white font-bold opacity-20">
              {`RTCs`}
            </label>
            <label className="absolute left-[45vw] top-[5vw] md:top-[2vw] text-[4vw]  md:text-[2vw] text-white font-bold">
              {"RTCs"}
            </label>
            <div className="cloudhome"></div>
          </div>

          <div className="absolute top-[12vw] md:top-[7vw] md:left-[12.5vw] left-[3vw] bg-white w-[94%] md:w-3/4 h-[85vh] md:h-[35vw] rounded-lg shadow-lg shadow-gray-400">
            <div className="">
              <div className="md:px-[5vw] px-[0vw] py-[1.5vw] ">
                {/* <p className=" text-[1.5vw] pl-[2vw] text-[${colors.primary}] font-bold pt-[3vw] pb-[1vw]">
                We’ve partnered with the world’s best bus companies
              </p> */}
                <div className=" w-full flex px-[2vw] items-center justify-center md:justify-between py-[2vw] md:py-[1vw] ">
                  <p
                    className={`md:text-[1.5vw] text-[6vw] text-[${colors.primary}] font-bold`}
                  >
                    26 RTCs12
                  </p>
                </div>
                <div className="md:max-h-[28vw] h-[75vh] overflow-y-auto">
                  <div className="grid grid-cols-2 md:grid-cols-5 w-full py-[1vw]">
                    {Get_GvtOperators.length > 0 &&
                      Get_GvtOperators?.map((item, index) => (
                        <div
                          key={index}
                          className="col-span-1 w-full items-center justify-center flex-col"
                        >
                          <img
                            src={getOperatorImage(item.operater_name)} // Dynamically setting image
                            className="md:w-[8vw] md:h-[8vw] ml-[11vw] md:ml-[2.5vw] rounded-full h-[22vw] w-[22vw]"
                            alt={item.operater_name}
                          />
                          <p className="text-center pb-[5vw] md:pb-[1.5vw] py-[1vw] md:py-[0.5vw] text-[3.8vw] md:text-[1vw]">
                          {item?.operater_name?.length > 11 ? (
                    <Tooltip
                      placement="top"
                      title={item?.operater_name}
                      className="cursor-pointer"
                      color="#1F487C"
                    >
                      {`${item?.operater_name.slice(0, 11)}...`}
                    </Tooltip>
                  ) : (
                    item?.operater_name.slice(0, 10)
                  )}
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
      <span className="md:block hidden">{/* <Footer3 /> */}</span>
      {/* <Footer /> */}
      {/* ------------------------MObileView----------------------------------- */}

      {/* <div className=" md:hidden block">
        <div className={`bg-[${colors.primary}] `}>
          <div className="grid grid-cols-6 items-center px-[5vw]">
            <div className="col-span-2 py-5">
              <NavLink to="/">
                <IoMdArrowBack className="w-[6vw] h-[6vw]" color="white" />
              </NavLink>
            </div>
            <div className="col-span-2 text-white">Bus Operators</div>
          </div>
        </div>
        <div
          className={`bg-[${colors.background}] min-h-screen max-h-auto overflow-auto absolute w-full `}
        >
          <p
            className={` text-[3.5vw] pl-[2vw] text-[${colors.primary}] font-bold pt-[3vw] pb-[1vw]`}
          >
            We’ve partnered with the world’s best bus companies
          </p>
          <div className=" w-full flex px-[2vw] items-center justify-between ">
            <p className="text-[3vw] text-black">26 RTCs</p>
          </div>
          <div className="relative overflow-y-auto scrollbar-hide">
            <div className="grid grid-cols-2 w-full py-[1vw] place-items-center">
              {busdetails?.length > 0 &&
                busdetails?.map((item) => (
                  <div className=" w-[25vw] flex-shrink-0">
                    
                    <img
                      src={item.logo}
                      className="w-[25vw] h-[25vw]  rounded-full"
                    />
                    <p className="text-center py-[0.5vw] text-[3vw]">
                      {item.label}
                    </p>
                    
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div> */}

      {/* ------------------------MObileView----------------------------------- */}
    </>
  );
}
