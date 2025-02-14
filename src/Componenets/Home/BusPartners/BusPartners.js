import React from "react";
import bus1 from "../../../Assets/BestBusses/bus(2).png";
import bus2 from "../../../Assets/BestBusses/bus(3).png";
import bus3 from "../../../Assets/BestBusses/bus(4).png";
// import bus4 from "../../assets/Ellipse 1 (5).png";
import bus5 from "../../../Assets/BestBusses/bus(6).png";
import bus6 from "../../../Assets/BestBusses/bus(7).png";
import bus7 from "../../../Assets/BestBusses/bus(8).png";
import bus8 from "../../../Assets/BestBusses/bus(9).png";
import bus10 from "../../../Assets/BestBusses/bus.png";
import bus11 from "../../../Assets/BestBusses/bus(5).png";
// import bus9 from "../../assets/Ellipse.png";
import { Link } from "react-router-dom";
// import ColorCodes from "../Common/ColorCodes";
import { useSelector } from "react-redux";

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

export default function BusPartners() {

  const colors = useSelector((state) => state.themecolors[0]);

  return (
    <>
      <div className="px-[5vw] md:block hidden ">
        <p
          className={`text-[1.5vw] pl-[2vw] text-[${colors.primary}] font-bold pt-[3vw] pb-[1vw]`}
        >
          We’ve partnered with the world’s best bus companies
        </p>
        <div className=" w-full flex px-[2vw] items-center justify-between ">
          <p className="text-[1.5vw] text-black">26 RTCs</p>
          <Link to="/BusOperators">
            <button className="border-[0.1vw] border-[#AAAAAA] px-[1.5vw] py-[0.2vw] rounded-full text-[1vw] bg-white shadow-l">
              View All
            </button>
          </Link>
        </div>
        <div className="grid grid-cols-9 w-full py-[1vw]">
          {busdetails?.length > 0 &&
            busdetails.map((item, index) => (
              <div key={index} className="col-span-1 w-full items-center justify-center flex-col">
                <img
                  src={item.logo}
                  className="w-[8vw] h-[8vw] ml-[1vw] rounded-full"
                  alt="logo"
                />
                <p className="text-center py-[0.5vw] text-[1vw]">
                  {item.label}
                </p>
              </div>
            ))}
        </div>
      </div>

      {/* mobile */}
      <div className="px-[5vw] md:hidden block">
        <p
          className={` text-[3.5vw] pl-[2vw] text-[${colors.primary}] font-bold pt-[3vw] pb-[1vw]`}
        >
          We’ve partnered with the world’s best bus companies
        </p>
        <div className=" w-full flex px-[2vw] items-center justify-between ">
          <p className="text-[3vw] text-black">26 RTCs</p>
          <Link
            to="/BusPartner"
            className={` px-[2vw] py-[2vw] md:border-[0.1vw] text-[3vw] md:border-[#AAAAAA] md:px-[1.5vw] md:py-[0.2vw] rounded-full md:text-[1vw] `}
          >
            View All
          </Link>
          {/* <button className="border-[0.1vw] border-[#AAAAAA] px-[1.5vw] py-[0.2vw] rounded-full text-[1vw] bg-white shadow-lg">
          View all
        </button> */}
        </div>
        <div className="relative overflow-x-auto scrollbar-hide">
          <div className="flex w-full py-[1vw]">
            {busdetails.length > 0 &&
              busdetails?.map((item, index) => (
                <div key={index} className=" w-[25vw] flex-shrink-0">
                  {/* <div className="w-[40vw]"> */}
                  <img
                    src={item.logo}
                    alt="logo"
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
    </>
  );
}
