import React from "react";
import Promotion from "../MainComponenet/Promotion";
import googlemap from "../../assets/googlemap.png";
import GoogleMap from "../Home/GoogleMap";
import GoogleMapRadius from "../Home/GoogleMapRadius";
import Advertisement from "../Advertisement/Ads";
export default function Map() {
  return (
    <>
      <div className="bg-[#E5FFF1] h-screen md:block hidden">
        <div className="p-[0.5vw]">
          <div className="h-[30%] w-full">
            {/* <Promotion /> */}
            <Advertisement />
          </div>
          <div className="mt-[0.5vw] h-[70%] w-full">
            <GoogleMapRadius width={"100%"} height={"37vw"} />{" "}
          </div>
        </div>
      </div>

      <div className="bg-[#E5FFF1] h-screen md:hidden block">
        <div className="p-[0.5vw]">
          <div className="h-[30%] w-full">
            {/* <Promotion />/ */}
            <Advertisement />
          </div>
          <div className="mt-[0.5vw] h-full w-full">
            <GoogleMapRadius width={"100%"} height={"100vw"} />{" "}
          </div>
        </div>
      </div>
    </>
  );
}
