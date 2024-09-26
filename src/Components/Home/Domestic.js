import React, { useEffect } from "react";
import place1 from "../../assets/Vector (6).png";
import place2 from "../../assets/Vector (11).png";
import place4 from "../../assets/Vector (5).png";
import place5 from "../../assets/Vector (6).png";
import place6 from "../../assets/Vector (7).png";
import place7 from "../../assets/Vector (8).png";
import place8 from "../../assets/Vector (9).png";
import mumbai from "../../assets/mumbai.png";
import newdheli from "../../assets/newdheli.jpg";
// import goa from "../../assets/goa.jpg"
import chennai from "../../assets/chennai.jpg";
import Buses from "./Buses";
import BusOperator from "./BusOperator";
import mumbai1 from "../../assets/mumbai1.png";
import bengaluru from "../../assets/bengaluru.png";
import pondy from "../../assets/pondy.png";
import cbe from "../../assets/cbe.png";
import bus from "../../assets/502-ai 1.png";
import { GetPdp } from "../../Api/Home/Home";
import { useDispatch, useSelector } from "react-redux";
import ColorCodes from "../Common/ColorCodes";

// const busdetails = [
//   {
//     label: "chennai",
//     logo: chennai,
//   },
//   {
//     label: "puducherry",
//     logo: pondy,
//   },
//   {
//     label: "hyderabad",
//     logo: place8,
//   },
//   {
//     label: "bengaluru",
//     logo: bengaluru,
//   },
//   {
//     label: "new delhi",
//     logo: newdheli,
//   },
//   {
//     label: "goa",
//     // logo: goa,
//   },
//   {
//     label: "mumbai",
//     logo: mumbai,
//   },
// ];

export default function DomesticPlace() {
  const sanitizePath = (path) => {
    const sanitizedPath = path.replace(/\\\\/g, "file://").replace(/\\/g, "//");
    console.log(encodeURI(sanitizedPath), "techimage");
    return encodeURI(sanitizedPath);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    GetPdp(dispatch);
  }, [dispatch]);

  const popular_domestic_presence = useSelector((state) => state?.pdp);
  console.log(popular_domestic_presence, "popular_domestic_presence");
  // const colors = ColorCodes();
  const colors = useSelector((state) => state.themecolors[0]);

  return (
    <>
      <div className="px-[5vw] md:block hidden">
        <p
          className={`text-[1.5vw] pl-[2vw] text-[${colors.primary}] font-bold pt-[3vw] pb-[1vw]`}
        >
          Popular Domestic Presence
        </p>

        <div className="grid grid-cols-7 w-full py-[1vw]">
          {popular_domestic_presence?.map((item) => (
            <div className="col-span-1 w-full items-center justify-center flex-col">
              <img
                src={`http://192.168.90.47:4001${item.image}`}
                className={`w-[9vw] h-[9vw] ml-[1.8vw] rounded-full shadow-md shadow-[${colors.primary}]`}
              />
              <p className="text-center py-[0.8vw] text-[1.2vw] font-bold">
                {item?.source_name?.toUpperCase()}
              </p>
            </div>
          ))}
        </div>
        <p
          className={` text-[1.5vw] pl-[2vw] text-[${colors.primary}] font-bold pt-[1vw] pb-[1vw]`}
        >
          Deals on thebusstand.com
        </p>
        <p className="pl-[2vw] text-[1.1vw] leading-[2.5vw] tracking-wider">
          Don't miss out on these incredible offers, book your bus tickets now
          and travel with convenience and affordability. Hurry, grab the best
          bus booking deals before they're gone!
        </p>
        <div className="pl-[2vw]">
          <div className="h-[8vw] w-full bg-gradient-to-l from-[#82C5F2] border-[0.01vw] border-[#82C5F2]  shadow-lg  mt-[2vw] rounded-xl grid grid-cols-6">
            <div className="col-span-1 items-center justify-center flex">
              <img src={bus} className="h-[7vw]" />
            </div>
            <div className="col-span-3  ">
              <p className=" text-[1.8vw] tracking-wide mt-[1.2vw] text-[#4A4A4A]">
                Unlock Unbeatable Exclusive Deals!{" "}
              </p>
              <p className="flex  text-[1.3vw] mt-[0.5vw] tracking-wider">
                <span>
                  <span
                    className={`font-bold text-[${colors.primary}] text-[1.5vw] pr-[0.4vw]`}
                  >
                    4152
                  </span>
                  <span className="text-[#4A4A4A] pr-[1vw]">Deals</span>
                </span>
                <span className="w-[0.15vw] h-[2.2vw] bg-black"></span>
                <span className="pl-[1vw]">
                  <span
                    className={`font-bold text-[${colors.primary}] text-[1.5vw]`}
                  >
                    1648
                  </span>
                  <span className="text-[#4A4A4A] pr-[1vw] pl-[0.5vw]">
                    Bus Operators
                  </span>
                </span>
                <span className="w-[0.15vw] h-[2.2vw] bg-black"></span>

                <span className="pl-[1vw]">
                  <span
                    className={`font-bold text-[${colors.primary}] text-[1.5vw]`}
                  >
                    21542
                  </span>
                  <span className="text-[#4A4A4A] pr-[1vw] pl-[0.5vw]">
                    Routes
                  </span>
                </span>
              </p>
            </div>
            <div className="col-span-1 flex items-center ">
              <p className={`text-[3vw] text-[${colors.primary}] font-bold`}>
                20% OFF
              </p>
            </div>
            <div className="col-span-1 items-center justify-center flex">
              <button className="bg-white px-[2vw] py-[0.5vw] shadow-lg rounded-full">
                Book now
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* // mobile */}
      <div className="px-[5vw] md:hidden block">
        <p
          className={`text-[vw] pl-[2vw] text-[${colors.primary}] font-bold pt-[3vw] pb-[1vw]`}
        >
          Popular Domestic Presence
        </p>
        {/* <div className="relative overflow-x-auto scrollbar-hide">
          <div className="flex w-full">
            <div className="flex-shrink-0 w-[30vw] py-[1vw]">
              {busdetails.map((item) => (
                <div className="w-[30vw] ">
                  <img
                    src={item.logo}
                    className="w-[25vw] h-[25vw] ml-[1.8vw] rounded-full shadow-md shadow-[${colors.primary}]"
                  />
                  <p className="text-center py-[0.8vw] text-[3vw] font-bold">
                    {item.label.toUpperCase()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div> */}
        <div className="relative overflow-x-auto scrollbar-hide">
          <div className="flex w-full  py-[1vw]">
            {popular_domestic_presence?.popular_domestic_presence?.map(
              (item) => (
                <div className="w-[20vw] mr-[5vw] flex-shrink-0 ml-[1vw]">
                  {/* <div className="w-[40vw]"> */}
                  <img
                    src={`http://192.168.90.47:4001${item.image}`}
                    className={`w-[20vw] h-[20vw]  rounded-full shadow-md shadow-[${colors.primary}]`}
                  />
                  <p className="text-center py-[0.8vw] mt-[2vw] text-[3vw] font-bold">
                    {item?.source_name?.toUpperCase()}
                  </p>
                  {/* </div> */}
                </div>
              )
            )}
          </div>
        </div>
        <p
          className={` text-[4vw] pl-[2vw] text-[${colors.primary}] font-bold pt-[1vw] pb-[1vw]`}
        >
          Deals on thebusstand.com
        </p>
        <p className="pl-[2vw] text-[3vw] leading-[5vw] tracking-wider">
          Don't miss out on these incredible offers, book your bus tickets now
          and travel with convenience and affordability. Hurry, grab the best
          bus booking deals before they're gone!
        </p>
        <div className="pl-[2vw]">
          <div className="h-[33vw] w-full bg-gradient-to-l relative from-[#82C5F2] border-[0.01vw] border-[#82C5F2]  shadow-lg  mt-[2vw] rounded-xl grid grid-cols-6">
            <img
              src={bus}
              className="h-[18vw] w-[25vw] absolute left-[2vw] top-[2vw]"
            />
            <div>
              <p className=" text-[3.5vw] tracking-wide mt-[2vw] font-semibold absolute left-[30vw] text-[#4A4A4A]">
                Unlock Unbeatable Exclusive Deals!{" "}
              </p>
              <p className="flex  text-[3vw] mt-[0.5vw] absolute left-[30vw] top-[12vw] tracking-wider">
                <span>
                  <span
                    className={`font-bold text-[${colors.primary}] text-[3vw] pr-[1.5vw] `}
                  >
                    4152
                  </span>
                  <span className="text-[#4A4A4A] pr-[1vw] ">Deals</span>
                </span>
                <span className="w-[0.15vw] h-[4vw] bg-black"></span>
                <span className="pl-[1vw]">
                  <span
                    className={`font-bold text-[${colors.primary}] text-[3vw]`}
                  >
                    1648
                  </span>
                  <span className="text-[#4A4A4A] pr-[1vw] pl-[1.5vw]">
                    Bus Operators
                  </span>
                </span>
                {/* <span className="w-[0.15vw] h-[4vw] bg-black"></span> */}
              </p>
              <span className="pl-[1vw] absolute left-[29vw] top-[15vw]">
                <span
                  className={`font-bold text-[${colors.primary}] text-[3vw]`}
                >
                  21542
                </span>
                <span className="text-[#4A4A4A] text-[3vw] pr-[1vw] pl-[1.5vw]">
                  Routes
                </span>
              </span>
            </div>
            {/* </div> */}
            <div className="absolute top-[7vw] right-[30vw] ">
              <p className={`text-[4vw] text-[${colors.primary}] font-bold`}>
                20% OFF
              </p>
            </div>
            <button
              className={`absolute bottom-[1vw] item-center flex left-[2vw]  justify-center w-[95%] py-[1.5vw] bg-[${colors.primary}] text-white`}
            >
              Book now
            </button>
            {/* <div className="col-span-1 items-center justify-center flex">
              <p className="text-[3vw] text-[${colors.primary}] font-bold">20% OFF</p>
              <button className="bg-white px-[2vw] py-[0.5vw] shadow-lg rounded-full">
                Book now
              </button>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
}
