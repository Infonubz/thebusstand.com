

import React, { useEffect, useState } from "react";
import Bus from "../../../../Assets/Navbar/TBS-LOGO.png";
// import FaceBook from "../../assets/Facebook.png";
// import InstaGram from "../../assets/Instagram.png";
//import thebusstand from "../../assets/thebusstand.png";
// import twitter from "../../assets/Twitter.png";
// import Youtube from "../../assets/Youtube.png";
//import ads from "../../assets/We cover 100% of the bus routes.png";
//import FooterBg from "../../assets/FooterBG.png";
//import { IoIosArrowDropupCircle } from "react-icons/io";

import { RiTwitterXLine } from "react-icons/ri";
import { FaFacebookSquare, FaYoutube } from "react-icons/fa";
import { IoLogoInstagram } from "react-icons/io5";
import { IoLogoYoutube } from "react-icons/io5";
import { MdKeyboardDoubleArrowUp } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import Tabbings from "./Tabbings";
import { GetFooter } from "../../../../Api-TBS/Home/Home";
import ColorCodes from "../../../Common/Common-Functions/ColorCodes";

export default function FooterOne() {
  // const footerdata = [
  //   {
  //     label: "Top Bus Routes",
  //     list: [
  //       "Hyderabad to Mumbai",
  //       "Chennai to Coimbatore",
  //       "Bangalore to Goa",
  //       "Coimbatore to Pondicherry",
  //     ],
  //   },
  //   {
  //     label: "Buses from top cities",
  //     list: [
  //       "Hyderabad to Mumbai",
  //       "Chennai to Coimbatore",
  //       "Bangalore to Goa",
  //       "Coimbatore to Pondicherry",
  //     ],
  //   },
  //   {
  //     label: "Top RTC Buses",
  //     list: [
  //       "Hyderabad to Mumbai",
  //       "Chennai to Coimbatore",
  //       "Bangalore to Goa",
  //       "Coimbatore to Pondicherry",
  //     ],
  //   },
  //   {
  //     label: "Top Bus Service",
  //     list: [
  //       "Hyderabad to Mumbai",
  //       "Chennai to Coimbatore",
  //       "Bangalore to Goa",
  //       "Coimbatore to Pondicherry",
  //     ],
  //   },
  //   {
  //     label: "Quick Links",
  //     list: [
  //       "Hyderabad to Mumbai",
  //       "Chennai to Coimbatore",
  //       "Bangalore to Goa",
  //       "Coimbatore to Pondicherry",
  //     ],
  //   },
  // ];

  const [top, setShowGoTop] = useState(false);
  const fetchedFooter = useSelector((state) => state?.footer);
  //const colors = useSelector((state) => state.themecolors[0]);
  const dispatch = useDispatch();
  const location = useLocation();
  const path = location.pathname;

  const top_bus_routeFooter = fetchedFooter[0]?.top_bus_route;
  const buses_from_top_citiesFooter = fetchedFooter[0]?.buses_from_top_cities;
  const top_rtc_busesFooter = fetchedFooter[0]?.top_rtc_buses;
  const top_bus_serviceFooter = fetchedFooter[0]?.top_bus_service;
  const quick_links = fetchedFooter[0]?.quick_links;
  console.log(top_bus_routeFooter, 'top_bus_routeFooter')
  const colors = ColorCodes()

  const handleVisibleButton = () => {
    setShowGoTop(window.pageYOffset > 50);
  };

  const handleScrollUp = () => {
    window.scrollTo({ left: 0, top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleVisibleButton);
  }, []);

  useEffect(() => {
    GetFooter(dispatch);
  }, [dispatch]);

  console.log(top, "top");
  console.log(path !== "/", "pathpathpathpathpathpath");

  return (
    <>
      {/* <div
        style={{
          backgroundImage: `url(${FooterBg})`,
        }}
      >
        <div className="grid grid-flow-col p-[2%] ">
          <div className="">
            <img src={Bus} alt="Bus" className="w-full h-[38vh]" />
            <div className="grid grid-flow-row gap-4 content-center ml-2 mt-[4%]">
              <img src={thebusstand} alt="text" className="w-[80%]" />
              <img src={ads} alt="text1" className="w-[70%]" />
            </div>
          </div>

          <div className="">
            <Tabbings />
          </div>
        </div>
        <div className="flex flex-row-reverse items-center p-[1%] gap-[1%]">
          <a href="https://www.youtube.com/">
            <img src={Youtube} alt="youtube" className="p-[15%]" />
          </a>
          <a href="https://twitter.com/i/flow/login">
            <img src={twitter} alt="twitter" className="p-[15%] " />
          </a>
          <a href="https://www.instagram.com/">
            <img src={InstaGram} alt="instagram" className="p-[15%] " />
          </a>
          <a href="https://www.facebook.com/">
            <img src={FaceBook} alt="facebook" className="p-[15%] " />
          </a>
        </div>
      </div> */}

      <div
        className={`md:block ${path === "/" ? "" : "hidden"
          } hidden relative z-[2]`}
      >
        <div className="absolute top-0 right-0">
          <button
            className="text-white text-[1.2vw] font-bold p-[1vw] bg-blue-950"
            onClick={handleScrollUp}
          >
            top
          </button>
        </div>
        <div className="bg-black flex  h-[23vw] w-full py-[1vw]  relative">
          {" "}
          <div className="w-[25%] h-full grid grid-rows-7">
            <div className="row-span-5 w-full h-full">
              <img src={Bus} draggable={false} alt="Bus" className="w-full h-full" />
            </div>
            <div className="row-span-1 h-full relative">
              <p className="text-white font-bold text-[3vw] absolute left-0 top-0 tracking-wider">
                thebusstand.com
              </p>
              <p className="text-[#7A7A7A] text-[1.5vw] absolute left-0 top-[3.1vw] tracking-wider italic">
                We cover 100% of the bus routes
              </p>
            </div>
            <div className="row-span-1">
              <div className="absolute left-0 bottom-0">
                {/* <p className="text-gray-300 text-[1vw]">Version - 1.0.1</p> */}
              </div>
            </div>
          </div>
          <div className="w-[75%] h-full">
            <Tabbings top_bus_routeFooter={top_bus_routeFooter} buses_from_top_citiesFooter={buses_from_top_citiesFooter} top_rtc_busesFooter={top_rtc_busesFooter} top_bus_serviceFooter={top_bus_serviceFooter} quick_links={quick_links} />
          </div>
          {/* <div className=" flex absolute right-[1vw] bottom-0 my-[1vw] gap-[0.5vw]">
            <a href="https://www.youtube.com/">
              <img
                src={Youtube}
                alt="youtube"
                className=" w-[1.8vw] h-[1.8vw]"
              />
            </a>
            <a href="https://twitter.com/i/flow/login">
              <img
                src={twitter}
                alt="twitter"
                className="w-[1.8vw] h-[1.8vw] "
              />
            </a>
            <a href="https://www.instagram.com/">
              <img
                src={InstaGram}
                alt="instagram"
                className="w-[1.8vw] h-[1.8vw] "
              />
            </a>
            <a href="https://www.facebook.com/">
              <img
                src={FaceBook}
                alt="facebook"
                className="h-[1.8vw] w-[1.8vw] "
              />
            </a>
          </div> */}
          <div className="absolute bottom-[3vw] right-[2vw]">
            <button
              className={`bg-[${colors.primary}] text-white text-[1vw] p-[1vw] rounded-full shadow-lg shadow-white`}
              onClick={handleScrollUp}
            >
              <MdKeyboardDoubleArrowUp size={"2vw"} />
            </button>
          </div>
        </div>
      </div>
      {/* mobile */}
      <div className="md:hidden block h-auto bg-black w-full py-[1vw]  relative">
        <div className="grid grid-cols-2 row-auto w-full h-full px-[3vw]">
          <div>
            <p className="text-white  font-bold text-[4vw] w-full items-center py-[2vw]  flex">
              Top Bus Routes
            </p>
            {top_bus_routeFooter?.length > 0 &&
              top_bus_routeFooter?.slice(0, 3)?.map((item) => (
                <button
                  className="text-[#7A7A7A] hover:text-[#7A7A7A]  text-[3vw] mt-[10%]"
                  //href="#"
                  target="blank"
                >
                  <p>
                    {item.from} to {item.to}
                  </p>
                </button>
              ))}
          </div>
          <div>
            <p className="text-white  font-bold text-[4vw] w-full items-center py-[2vw]  flex">
              Buses from top cities
            </p>
            {buses_from_top_citiesFooter?.length > 0 &&
              buses_from_top_citiesFooter?.slice(0, 3)?.map((item) => (
                <button
                  className="text-[#7A7A7A] hover:text-[#7A7A7A]  text-[3vw] mt-[10%]"
                  //href="#"
                  target="blank"
                >
                  <p>{item.city_name}</p>
                </button>
              ))}
          </div>
          <div>
            <p className="text-white  font-bold text-[4vw] w-full items-center py-[2vw]  flex">
              Top RTC Buses
            </p>
            {top_rtc_busesFooter?.length > 0 &&
              top_rtc_busesFooter?.slice(0, 3)?.map((item) => (
                <button
                  className="text-[#7A7A7A] hover:text-[#7A7A7A]  text-[3vw] mt-[10%]"
                  //href="#"
                  target="blank"
                >
                  <p>{item.rtc_name}</p>
                </button>
              ))}
          </div>
          <div>
            <p className="text-white  font-bold text-[4vw] w-full items-center py-[2vw]  flex">
              Top Bus Service
            </p>
            {top_bus_serviceFooter?.length > 0 &&
              top_bus_serviceFooter?.slice(0, 3)?.map((item) => (
                <button
                  className="text-[#7A7A7A] hover:text-[#7A7A7A]  text-[3vw] mt-[10%]"
                  // href="#"
                  target="blank"
                >
                  <p>{item.operator_name}</p>
                </button>
              ))}
          </div>
          <div>
            <p className="text-white  font-bold text-[4vw] w-full items-center py-[2vw]  flex">
              Quick Links
            </p>
            {quick_links?.length > 0 &&
              quick_links?.slice(0, 3)?.map((item) => (
                <button
                  className="text-[#7A7A7A] hover:text-[#7A7A7A]  text-[3vw] mt-[10%]"
                  href="#"
                  target="blank"
                >
                  <p>{item.link}</p>
                </button>
              ))}
          </div>

          <div className=" items-center py-[2vw] flex gap-[3vw] pl-[1vw]">
            <a href="https://www.facebook.com/">

              <FaFacebookSquare size={"5vw"} color="#1F487C" />
            </a>
            <a href="https://www.instagram.com/">

              <IoLogoInstagram size={"5vw"} color="#1F487C" />
            </a>
            <a href="https://twitter.com/i/flow/login">

              <RiTwitterXLine size={"5vw"} color="#1F487C" />
            </a>
            <a href="https://www.youtube.com/">

              <IoLogoYoutube size={"5vw"} color="#1F487C" />
            </a>
          </div>
        </div>

        {/* <div className="absolute right-[15vw] bottom-0">
          <p className="text-white text-[10vw]">Version - 1.0.1</p>
        </div> */}
        {/* <div className="w-[25%] h-full grid grid-rows-7">
          <div className="row-span-5 w-full h-full">
            <img src={Bus} alt="Bus" className="w-full h-full" />
          </div>
          <div className="row-span-1 h-full relative">
            <p className="text-white font-bold text-[3vw] absolute left-0 top-0 tracking-wider">
              thebusstand.com
            </p>
            <p className="text-[#7A7A7A] text-[1.5vw] absolute left-0 top-[3.1vw] tracking-wider italic">
              We cover 100% of the bus routes
            </p>
          </div>
          <div className="row-span-1"></div>
        </div> */}
        {/* <div className="w-[75%] h-full">
          <Tabbings />
        </div> */}
        {/* <div className=" flex absolute right-[1vw] bottom-0 my-[1vw] gap-[0.5vw]">
          <a href="https://www.youtube.com/">
            <img src={Youtube} alt="youtube" className=" w-[1.8vw] h-[1.8vw]" />
          </a>
          <a href="https://twitter.com/i/flow/login">
            <img src={twitter} alt="twitter" className="w-[1.8vw] h-[1.8vw] " />
          </a>
          <a href="https://www.instagram.com/">
            <img
              src={InstaGram}
              alt="instagram"
              className="w-[1.8vw] h-[1.8vw] "
            />
          </a>
          <a href="https://www.facebook.com/">
            <img
              src={FaceBook}
              alt="facebook"
              className="h-[1.8vw] w-[1.8vw] "
            />
          </a>
        </div> */}
      </div>
    </>
  );
};


