import React, { useState } from "react";
import Bus from "../../assets/502-ai 1 (2).png";
import FaceBook from "../../assets/Facebook.png";
import InstaGram from "../../assets/Instagram.png";
import thebusstand from "../../assets/thebusstand.png";
import twitter from "../../assets/Twitter.png";
import Youtube from "../../assets/Youtube.png";
import ads from "../../assets/We cover 100% of the bus routes.png";
import Tabbings from "./Tabbings";
import FooterBg from "../../assets/FooterBG.png";
import "../../Components/Home/Footer.css";
const Footer = () => {
  const footerdata = [
    {
      label: "Top Bus Routes",
      list: [
        "Hyderabad to Mumbai",
        "Chennai to Coimbatore",
        "Bangalore to Goa",
        "Coimbatore to Pondicherry",
      ],
    },
    {
      label: "Buses from top cities",
      list: [
        "Hyderabad to Mumbai",
        "Chennai to Coimbatore",
        "Bangalore to Goa",
        "Coimbatore to Pondicherry",
      ],
    },
    {
      label: "Top RTC Buses",
      list: [
        "Hyderabad to Mumbai",
        "Chennai to Coimbatore",
        "Bangalore to Goa",
        "Coimbatore to Pondicherry",
      ],
    },
    {
      label: "Top Bus Service",
      list: [
        "Hyderabad to Mumbai",
        "Chennai to Coimbatore",
        "Bangalore to Goa",
        "Coimbatore to Pondicherry",
      ],
    },
    {
      label: "Quick Links",
      list: [
        "Hyderabad to Mumbai",
        "Chennai to Coimbatore",
        "Bangalore to Goa",
        "Coimbatore to Pondicherry",
      ],
    },
  ];
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

      <div className="md:block hidden">
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
                <p className="text-gray-300 text-[1vw]">Version - 1.0.1</p>
              </div>
            </div>
          </div>
          <div className="w-[75%] h-full">
            <Tabbings />
          </div>
          <div className=" flex absolute right-[1vw] bottom-0 my-[1vw] gap-[0.5vw]">
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
          </div>
        </div>
      </div>
      {/* mobile */}
      <div className="md:hidden block h-auto bg-black w-full py-[1vw]  relative">
        <div className="grid grid-cols-2 row-auto w-full h-full px-[3vw]">
          {footerdata.map((item) => (
            <div>
              <p className="text-white  font-bold text-[4vw] w-full items-center py-[2vw]  flex">
                {item.label}
              </p>
              {item.list.map((data) => (
                <p className="text-white text-[2.5vw]">{data}</p>
              ))}
            </div>
          ))}
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
    </>
  );
};

export default Footer;
