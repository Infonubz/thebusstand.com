import React, { useEffect } from "react";
//import Footer from "../Home/Footer";
import HomeHearder from "../MainComponenet/HomeHearder";
import homesky from "../../assets/homesky.png";
//import Footer1 from "./Footer";
import Footer from "../Home/Footer";

const Offers = () => {

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  
  return (
    <>
      <div className="">
        <div className="">
          <HomeHearder />
        </div>
        <div
          className="relative h-[42vw] bg-[#E5FFF1]"
          style={{
            zIndex: 1,
          }}
        >
          {/* <img src={homesky} className="w-full h-[10vw] bg-[#2B8EE4]" /> */}
          <div
            className=" h-[10vw] overflow-x-hidden"
            style={{
              backgroundImage: `url(${homesky})`,
              overflow: "hidden",
              backgroundSize: "cover",
              position: "relative",
              overflowX: "hidden",
              width: "100%",
            }}
          >
            <label className=" absolute left-[4vw] top-[2vw] text-[1.4vw] text-white font-bold">{`Home > Offers`}</label>
            <div className="cloudhome"></div>
            <div className="absolute top-[5.5vw] px-[2vw] grid grid-cols-8 gap-[1vw] w-full">
            </div>
          </div>

        </div>
        <div className="">
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Offers;
