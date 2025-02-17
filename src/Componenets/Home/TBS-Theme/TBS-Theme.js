import React from "react";
import "./TBS-Theme.css";
export default function TBS_Theme() {
  return (
    <div>
      <div className="Background relative md:block hidden">
        <p className="absolute top-[3vw] left-[17.75vw] text-[1.65vw] tracking-widest font-bold">
          <span className="text-white">
            {"India's exclusive".toUpperCase()}
            <span className="text-[#f1de4f] px-[0.5vw] font-extrabold">
              {"bus finder & Booking platform".toUpperCase()}
            </span>
            <span>{"for the Best".toUpperCase()}</span>
          </span>
        </p>{" "}
        <div className="Buildings"></div>
        {/* <div className="build_1"></div> */}
        {/* <div className="cloud1"></div> */}
        {/* <img
        src={require("../../assets/passingclouds1.png")}
        className="absolute top-0 "
      /> */}
          <div className="Road"></div>
          <div className="cloud1"></div>
          <div className="vehicle-container">
            {/* {/* <div className="cloud2"></div> */}
            {/* <div className="cloud3"></div> 
         <div className="cloud4"></div>  */}
            <div className="flight"></div>
            <div className="scooter"></div>
            <div className="car"></div>
            <div className="bus1"></div>
            {/* <div className="car1"></div> */}
            <div className="bike"></div>
            {/* <div className="auto"></div> */}
            <div className="dubleducker"></div>
            {/* <div className="ambulance"></div> */}
            {/* <div className="ice"></div> */}
          </div>
      </div>
    </div>
  );
}
