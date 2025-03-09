import React, { useEffect } from "react";
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
import { Link } from "react-router-dom";
// import ColorCodes from "../Common/ColorCodes";
import { useDispatch, useSelector } from "react-redux";
import { Abhibus_GetOperators } from "../../../../Api-Abhibus/Home/HomePage";
import { Tooltip } from "antd";

 const busdetails = [
      {
        label: "TNSTC",
        logo: bus17,
      },
      {
        label: "Kerala RTC",
        logo: bus5,
      },
      {
        label: "KSRTC",
        logo: bus10,
      },
      {
        label: "APSRTC",
        logo: bus1,
      },
      {
        label: "TSRTC",
        logo: bus3,
      },
      {
        label: "GSRTC",
        logo: bus2,
      },
    
      {
        label: "HRTC",
        logo: bus13,
      },
      {
        label: "JKSRTC",
        logo: bus21,
      },
      {
        label: "OSRTC",
        logo: bus16,
      },
      {
        label: "PRTC",
        logo: bus18,
      },
      {
        label: "PUNBUS",
        logo: bus19,
      },
      {
        label: "RSRTC",
        logo: bus7,
      },
      {
        label: "UPSRTC",
        logo: bus8,
      },
      {
        label: "BSRTC",
        logo: bus15,
      },
      {
        label: "WBTC",
        logo: bus20,
      },
    ];

export default function Government_Operators() {
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

  // Fetch Operators
  // useEffect(() => {
  //   Abhibus_GetOperators(dispatch);
  // }, []);

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
          {Get_GvtOperators?.length >= 10 &&
           <Link to="/GvrnBusOperators">
           <button className="border-[0.1vw] border-[#AAAAAA] px-[1.5vw] py-[0.2vw] rounded-full text-[1vw] bg-white shadow-l">
             View All
           </button>
         </Link>
          }
        </div>
        <div className="grid grid-cols-9 w-full py-[1vw]">
          {/* {Get_GvtOperators?.length > 0 &&
            Get_GvtOperators?.slice(0, 9)?.map((item, index) => (
              <div
                key={index}
                className="col-span-1 w-full items-center justify-center flex-col"
              >
                <img
                  src={getOperatorImage(item?.operater_name)} // Dynamically setting image
                  className="w-[8vw] h-[8vw] ml-[1vw] rounded-full"
                  alt={item?.operater_name}
                />
                <p className="text-center py-[0.5vw] text-[1vw]">
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
            ))} */}
              {
            busdetails?.slice(0, 9)?.map((item, index) => (
              <div
                key={index}
                className="col-span-1 w-full items-center justify-center flex-col"
              >
                <img
                  src={item?.logo} // Dynamically setting image
                  className="w-[8vw] h-[8vw] ml-[1vw] rounded-full"
                  alt={item?.label}
                />
                <p className="text-center py-[0.5vw] text-[1vw]">
                  {item?.label?.length > 11 ? (
                    <Tooltip
                      placement="top"
                      title={item?.label}
                      className="cursor-pointer"
                      color="#1F487C"
                    >
                      {`${item?.label.slice(0, 11)}...`}
                    </Tooltip>
                  ) : (
                    item?.label.slice(0, 10)
                  )}
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
            to="/GvrnBusOperators"
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
            {Get_GvtOperators?.length > 0 &&
              Get_GvtOperators?.map((item, index) => (
                <div key={index} className=" w-[25vw] flex-shrink-0">
                  {/* <div className="w-[40vw]"> */}
                  <img
                    src={getOperatorImage(item?.operater_name)}
                    alt={item?.operater_name}
                    className="w-[25vw] h-[25vw]  rounded-full"
                  />
                  <p className="text-center py-[0.5vw] text-[3vw]">
                    {item?.operater_name}
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
