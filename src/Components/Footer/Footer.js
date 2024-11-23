import React from "react";
import FaceBook from "../../assets/Fb.png";
import InstaGram from "../../assets/Insta.png";
import twitter from "../../assets/Twitter1.png";
import Youtube from "../../assets/Utube.png";
import { useNavigate } from "react-router";
const Footer1 = () => {
  const navigation = useNavigate();

  return (
    <>
      <div className="md:block hidden bg-[#1F487C] h-[3vw] flex items-center justify-center z-[2]">
        <div className="flex items-center justify-center pt-[0.5vw] flex-row gap-[5.5vw]">
          <div
            className="flex-2 cursor-pointer"
            onClick={() => navigation("/")}
          >
            <p className="text-[1.1vw] text-white font-semibold pl-[1vw]">
              Home
            </p>
          </div>
          <div
            className="flex-2 cursor-pointer"
            onClick={() => navigation("/rewards")}
          >
            <p className="text-[1.1vw] text-white font-semibold">Offers</p>
          </div>
          <div
            className="flex-2 cursor-pointer"
            onClick={() => navigation("/about")}
          >
            <p className="text-[1.1vw] text-white font-semibold">About</p>
          </div>
          <div
            className="flex-2 cursor-pointer"
            onClick={() => navigation("/contact")}
          >
            <p className="text-[1.1vw] text-white font-semibold">Contact</p>
          </div>
          <div
            className="flex-2 cursor-pointer"
            onClick={() => navigation("/faq")}
          >
            <p className="text-[1.1vw] text-white font-semibold">FAQ</p>
          </div>
          <div
            className="flex-2 cursor-pointer"
            onClick={() => navigation("/terms", { state: { toggleTabs: 2 } })}
          >
            <p className="text-[1.1vw] text-white font-semibold">
              Terms & Conditions
            </p>
          </div>
          <div
            className="flex-2 cursor-pointer"
            onClick={() => navigation("/privacy", { state: { toggleTabs: 1 } })}
          >
            <p className="text-[1.1vw] text-white font-semibold">
              Privacy Policy
            </p>
          </div>
          <div
            className="flex-2 cursor-pointer"
            onClick={() =>
              navigation("/agreement", { state: { toggleTabs: 3 } })
            }
          >
            <p className="text-[1.1vw] text-white font-semibold">
              User Agreement
            </p>
          </div>
          <div
            className="flex-2 cursor-pointer"
            onClick={() => navigation("/operators")}
          >
            <p className="text-[1.1vw] text-white font-semibold">Operators</p>
          </div>
          <div
            className="flex-2 cursor-pointer"
            onClick={() => navigation("/routes")}
          >
            <p className="text-[1.1vw] text-white font-semibold">Routes</p>
          </div>
        </div>
      </div>
      <div className="md:block hidden bg-[#ffffff] h-[3vw] flex items-center">
        <div className="flex justify-between pt-[0.8vw]">
          <div className="flex gap-[1vw] pl-[1vw]">
            <a href="https://www.facebook.com/">
              <img
                src={FaceBook}
                alt="facebook"
                className="w-[1.5vw] h-[1.5vw]"
              />
            </a> 
            <a href="https://www.instagram.com/">
              <img
                src={InstaGram}
                alt="instagram"
                className="w-[1.5vw] h-[1.5vw]"
              />
            </a>
            <a href="https://twitter.com/i/flow/login">
              <img
                src={twitter}
                alt="twitter"
                className="w-[1.5vw] h-[1.5vw]"
              />
            </a>
            <a href="https://www.youtube.com/">
              <img
                src={Youtube}
                alt="youtube"
                className="w-[1.5vw] h-[1.5vw]"
              />
            </a>
          </div>
          <div className="flex">
            <p className="text-[#1F487C] pr-[0.8vw] font-bold text-[1vw]">
              Copyright @ thebusstand.com All Rights Reserved.
            </p>
          </div>
        </div>
      </div>

      <div className="block md:hidden bg-[#1F487C] h-[12vw] flex items-center">
        <div className="flex items-center w-full flex-row px-[2vw] overflow-x-auto scrollbar-hide gap-[8vw]">
          <div
            className="flex-2 cursor-pointer"
            onClick={() => navigation("/")}
          >
            <p className="text-[4vw] text-white font-semibold">Home</p>
          </div>
          <div
            className="flex-2 cursor-pointer"
            onClick={() => navigation("/rewards")}
          >
            <p className="text-[4vw] text-white font-semibold">Offers</p>
          </div>
          <div
            className="flex-2 cursor-pointer"
            onClick={() => navigation("/about")}
          >
            <p className="text-[4vw] text-white font-semibold">About</p>
          </div>
          <div
            className="flex-2 cursor-pointer"
            onClick={() => navigation("/contact")}
          >
            <p className="text-[4vw] text-white font-semibold">Contact</p>
          </div>
          <div
            className="flex-2 cursor-pointer"
            onClick={() => navigation("/faq")}
          >
            <p className="text-[4vw] text-white font-semibold">FAQ</p>
          </div>
          <div
            className="flex-2 cursor-pointer"
            onClick={() => navigation("/terms", { state: { toggleTabs: 2 } })}
          >
            <p className="text-[4vw] text-white text-nowrap font-semibold">
              Terms & Conditions
            </p>
          </div>
          <div
            className="flex-2 cursor-pointer"
            onClick={() => navigation("/privacy", { state: { toggleTabs: 1 } })}
          >
            <p className="text-[4vw] text-nowrap text-white font-semibold">
              Privacy Policy
            </p>
          </div>
          <div
            className="flex-2 cursor-pointer"
            onClick={() =>
              navigation("/agreement", { state: { toggleTabs: 3 } })
            }
          >
            <p className="text-[4vw] text-nowrap text-white font-semibold">
              User Agreement
            </p>
          </div>
          <div
            className="flex-2 cursor-pointer"
            onClick={() => navigation("/operators")}
          >
            <p className="text-[4vw] text-white font-semibold">Operators</p>
          </div>
          <div
            className="flex-2 cursor-pointer"
            onClick={() => navigation("/routes")}
          >
            <p className="text-[4vw] text-white font-semibold">Routes</p>
          </div>
        </div>
      </div>
      <div className="block md:hidden bg-[#ffffff] h-[12vw] flex items-center justify-between">
        {/* <div className="flex "> */}
        {/* <div className="flex gap-[1vw] pl-[1vw]">
            <a href="https://www.facebook.com/">
              <img src={FaceBook} alt="facebook" className="w-[1.5vw] h-[1.5vw]" />
            </a>
            <a href="https://www.instagram.com/">
              <img src={InstaGram} alt="instagram" className="w-[1.5vw] h-[1.5vw]" />
            </a>
            <a href="https://twitter.com/i/flow/login">
              <img src={twitter} alt="twitter" className="w-[1.5vw] h-[1.5vw]" />
            </a>
            <a href="https://www.youtube.com/">
              <img src={Youtube} alt="youtube" className="w-[1.5vw] h-[1.5vw]" />
            </a>
          </div> */}
        <div className="">
          <p className="text-[#1F487C] text-[3.7vw] px-[6vw] font-bold">
            Copyright @ thebusstand.com All Rights Reserved.
          </p>
        </div>
        {/* </div> */}
      </div>
    </>
  );
};

export default Footer1;
