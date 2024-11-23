import React, { useEffect } from "react";
import Footer from "./Footer"; // import homesky from "../../assets/homesky.png";
//import HomeHearder from "../MainComponenet/HomeHearder";
import { useDispatch, useSelector } from "react-redux";
import { GetFooterTabs } from "../../Api/FooterTabs/FooterTabs";
// import AboutMobile from "./FooterMobile.js/AboutMobile";
import homesky from "../../assets/BackgroundSky1.png";
import logo from "../../assets/crmlogo.png";
import { TbInfoHexagon } from "react-icons/tb";
import { FiInfo } from "react-icons/fi";
import { RiArrowRightSLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import layer from "../../assets/BG Image.png";
import { FaBriefcase } from "react-icons/fa";
import NavMobile from "./NavMobile";
import CommonMainNavbar from "../Common/CommonMainNavbar";

const About = () => {
  const about_us = useSelector((state) => state?.tbs_info || []);
  const abt_us = about_us.about_us;
  const dispatch = useDispatch();
  const navigation = useNavigate();


  useEffect(() => {
    GetFooterTabs(dispatch);
  }, [dispatch]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


  console.log(about_us, "about_us");

  return (
    <>
      <div className="bg-[#d1f8e3] min-h-screen max-h-auto w-full">
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
            }}
          >
            <label className="absolute left-[39vw] md:left-[42vw] top-[2vw] md:top-[0.1vw] text-[6vw]  md:text-[4vw] text-white font-bold opacity-20">
              {`About Us`}
            </label>
            <label className="absolute left-[46vw] top-[5vw] md:top-[2vw] text-[4vw]  md:text-[2vw] text-white font-bold">
              {"About Us"}
            </label>
            <div className="absolute left-[3vw] top-[4vw] z-[2] text-[7vw] text-white font-bold md:hidden sm:block ">
              <NavMobile />
            </div>
            <div className="cloudhome"></div>
          </div>
          <>
            <div className="absolute top-[7vw] left-[12.5vw] bg-white w-3/4 h-[35vw] md:rounded-[1vw] md:block hidden shadow-lg shadow-gray-300">
              <div>
                <div className="px-[5vw] py-[3vw]"> 
                  <p className="text-[1.25vw] font-semibold text-[#1F487C]">
                    {abt_us?.split("\r\n")?.map((line, index) => (
                      <p key={index} className="pb-[0.75vw]">
                        {line}
                        <br />
                      </p>
                    ))}
                  </p>
                </div>
              </div>
            </div>
          </>
          <div className="md:hidden block">
            <div className="bg-[#E5FFF1] relative h-full w-full">
              <img
                className="absolute inset-0 object-cover w-full h-full"
                src={layer}
                alt="Layer background"
              />
              <div className=" relative">
                {/* <div className="absolute left-[3vw] top-[4vw]  text-[7vw] text-white font-bold md:hidden block z-10"><NavMobile/></div> */}

                <div className="py-[5vw]">
                  <div className="mx-[2vw]">
                    <img src={logo} className="h-[40vw] w-full" alt="Logo" />
                  </div>
                </div>

                <div className="bg-white m-[4vw] rounded-[2vw] p-[2vw] text-[#1F487C]">
                  Designed exclusively for travellers, TBS’s pioneering
                  technology consolidates your bus booking into one easy-to-use
                  platform, custom built to your exact requirements.
                  <br />
                  <br />
                  Booking bus has always proved challenging for Passengers. TBS
                  makes it simple to configure each client’s preferences and
                  then curates search results to show in-policy rates first,
                  guaranteeing satisfied customers.
                  <br />
                  <br /> With TBS, finding the right bus is just a few clicks
                  away. You no longer need to hop from platform to platform as
                  it connects to all the key players and Operator sources you
                  use and presents the options in one easy-to-compare view.
                </div>

                <div>
                  <div className="px-[6vw] py-[4vw] text-[#1F487C]">
                    <div
                      className="flex items-center cursor-pointer" // Added cursor-pointer for better UX
                      onClick={() =>
                        navigation("/privacy", { state: { toggleTabs: 1 } })
                      }
                    >
                      <TbInfoHexagon className="text-[7vw]" />
                      <div className="ml-[2vw] flex-1 flex items-center">
                        <span className="ml-[1vw]">Privacy Policy</span>
                        <div className="mr-[1vw] flex-grow flex justify-end">
                          <RiArrowRightSLine className="text-[7vw]" />
                        </div>
                      </div>
                    </div>
                    <div className="mt-[2vw] border-t border-[#1F487C]"></div>
                  </div>

                  <div className="px-[6vw] py-[4vw] text-[#1F487C]">
                    <div
                      className="flex items-center cursor-pointer" // Added cursor-pointer for better UX
                      onClick={() =>
                        navigation("/terms", { state: { toggleTabs: 2 } })
                      }
                    >
                      <FiInfo className="text-[7vw]" />
                      <div className="ml-[2vw] flex-1 flex items-center">
                        <span className="ml-[1vw]">Terms & Conditions</span>
                        <div className="mr-[1vw] flex-grow flex justify-end">
                          <RiArrowRightSLine className="text-[7vw]" />
                        </div>
                      </div>
                    </div>
                    <div className="mt-[2vw] border-t border-[#1F487C]"></div>
                  </div>

                  <div className="px-[6vw] py-[4vw] text-[#1F487C] pb-[20vw]">
                    <div
                      className="flex items-center cursor-pointer" // Added cursor-pointer for better UX
                      onClick={() =>
                        navigation("/agreement", { state: { toggleTabs: 3 } })
                      }
                    >
                      <FaBriefcase className="text-[7vw]" />
                      <div className="ml-[2vw] flex-1 flex items-center">
                        <span className="ml-[1vw]">User Agreement</span>
                        <div className="mr-[1vw] flex-grow flex justify-end">
                          <RiArrowRightSLine className="text-[7vw]" />
                          {/* <TbInfoHexagon className="text-[7vw]" /> */}
                        </div>
                      </div>
                    </div>
                    <div className="mt-[2vw] border-t border-[#1F487C]"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <span className="md:block hidden">
          <Footer />
        </span>
    </>
  );
};

export default About;
