import React, { useEffect, useState } from "react";
import Bus from "../../assets/502-ai 1 (2).png";
import FaceBook from "../../assets/Facebook.png";
import InstaGram from "../../assets/Instagram.png";
//import thebusstand from "../../assets/thebusstand.png";
import twitter from "../../assets/Twitter.png";
import Youtube from "../../assets/Youtube.png";
//import ads from "../../assets/We cover 100% of the bus routes.png";
import Tabbings from "./Tabbings";
//import FooterBg from "../../assets/FooterBG.png";
import Footer1 from "../Footer/Footer";
import "../../Components/Home/Footer.css";
//import { IoIosArrowDropupCircle } from "react-icons/io";
import { MdKeyboardDoubleArrowUp } from "react-icons/md";
//import ColorCodes from "../Common/ColorCodes";
import { useDispatch, useSelector } from "react-redux";
import { GetFooter } from "../../Api/Home/Home";

const Footer = () => {
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
  const handleVisibleButton = () => {
    setShowGoTop(window.pageYOffset > 50);
  };
  const handleScrollUp = () => {
    window.scrollTo({ left: 0, top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleVisibleButton);
  }, []);
  console.log(top, "top");
  // const colors =ColorCodes()
  //const colors = useSelector((state) => state.themecolors[0]);

  const fetchedFooter = useSelector((state) => state.footer);
  const top_bus_routeFooter = fetchedFooter[0]?.top_bus_route;
  const buses_from_top_citiesFooter = fetchedFooter[0]?.buses_from_top_cities;
  const top_rtc_busesFooter = fetchedFooter[0]?.top_rtc_buses;
  const top_bus_serviceFooter = fetchedFooter[0]?.top_bus_service;
  const quick_links = fetchedFooter[0]?.quick_links;

  const dispatch = useDispatch();
  useEffect(() => {
    GetFooter(dispatch);
  }, [dispatch]);

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

      <div className="md:block hidden relative">
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
            <div className="row-span-1">
              <div className="absolute left-0 bottom-0">
                {/* <p className="text-gray-300 text-[1vw]">Version - 1.0.1</p> */}
              </div>
            </div>
          </div>
          <div className="w-[75%] h-full">
            <Tabbings />
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
              className="bg-[${colors.primary}] text-white text-[1vw] p-[1vw] rounded-full shadow-lg shadow-white"
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
              top_bus_routeFooter?.slice(0,3)?.map((item) => (
                <a
                  className="text-[#7A7A7A] hover:text-[#7A7A7A]  text-[3vw] mt-[10%]"
                  href=""
                  target="blank"
                >
                  <p>
                    {item.from} to {item.to}
                  </p>
                </a>
              ))}
          </div>
          <div>
            <p className="text-white  font-bold text-[4vw] w-full items-center py-[2vw]  flex">
              Buses from top cities
            </p>
            {buses_from_top_citiesFooter?.length > 0 &&
              buses_from_top_citiesFooter?.slice(0,3)?.map((item) => (
                <a
                  className="text-[#7A7A7A] hover:text-[#7A7A7A]  text-[3vw] mt-[10%]"
                  href=""
                  target="blank"
                >
                  <p>{item.city_name}</p>
                </a>
              ))}
          </div>
          <div>
            <p className="text-white  font-bold text-[4vw] w-full items-center py-[2vw]  flex">
              Top RTC Buses
            </p>
            {top_rtc_busesFooter?.length > 0 &&
              top_rtc_busesFooter?.slice(0,3)?.map((item) => (
                <a
                  className="text-[#7A7A7A] hover:text-[#7A7A7A]  text-[3vw] mt-[10%]"
                  href=""
                  target="blank"
                >
                  <p>{item.rtc_name}</p>
                </a>
              ))}
          </div>
          <div>
            <p className="text-white  font-bold text-[4vw] w-full items-center py-[2vw]  flex">
              Top Bus Service
            </p>
            {top_bus_serviceFooter?.length > 0 &&
              top_bus_serviceFooter?.slice(0,3)?.map((item) => (
                <a
                  className="text-[#7A7A7A] hover:text-[#7A7A7A]  text-[3vw] mt-[10%]"
                  href=""
                  target="blank"
                >
                  <p>{item.operator_name}</p>
                </a>
              ))}
          </div>
          <div>
            <p className="text-white  font-bold text-[4vw] w-full items-center py-[2vw]  flex">
              Quick Links
            </p>
            {quick_links?.length > 0 &&
             quick_links?.slice(0,3)?.map((item) => (
                <a
                  className="text-[#7A7A7A] hover:text-[#7A7A7A]  text-[3vw] mt-[10%]"
                  href=""
                  target="blank"
                >
                  <p>{item.link}</p>
                </a>
              ))}
          </div>
        </div>

        <div className=" flex absolute right-[1vw] bottom-0 my-[1vw] gap-[2vw]">
          <a href="https://www.youtube.com/">
            <img src={Youtube} alt="youtube" className=" w-[5vw] h-[5vw]" />
          </a>
          <a href="https://twitter.com/i/flow/login">
            <img src={twitter} alt="twitter" className="w-[5vw] h-[5vw] " />
          </a>
          <a href="https://www.instagram.com/">
            <img src={InstaGram} alt="instagram" className="w-[5vw] h-[5vw]" />
          </a>
          <a href="https://www.facebook.com/">
            <img src={FaceBook} alt="facebook" className="w-[5vw] h-[5vw]" />
          </a>
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
      <Footer1></Footer1>
    </>
  );
};

export default Footer;
