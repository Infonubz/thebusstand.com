import React, { useEffect } from "react";
//import Footer from "../Home/Footer";
//import HomeHearder from "../MainComponenet/HomeHearder";
import homesky from "../../assets/BackgroundSky1.png";
import CommonMainNavbar from "../Common/CommonMainNavbar";
import Footer1 from "./Footer";

const Contact = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div className="bg-[#E5FFF1] md:h-auto h-screen ">
        <div className="">
          <CommonMainNavbar />
        </div>
        <div
          className="relative h-[50vw] bg-[#E5FFF1]"
          style={{
            zIndex: 1,
          }}
        >
          <div
            className="md:h-[10vw] h-[19vw] overflow-x-hidden"
            style={{
              backgroundImage: `url(${homesky})`,
              overflow: "hidden",
              position: "relative",
              width: "100%",
            }}
          >
            {/* <label className="absolute left-[4vw] top-[2vw] text-[1.6vw] text-white font-bold">{`Home > ContactUs`}</label> */}
            <label className="absolute right-[40vw] md:right-[44.5vw] top-[2.5vw] md:top-[1.7vw] text-[4vw] md:text-[2.2vw] text-white font-bold">{`Contact us`}</label>
            <label className="absolute right-[34vw] md:right-[40vw] top-[.2vw] text-[6vw] md:text-[4vw] opacity-25 text-white font-bold">{`Contact us`}</label>
            <div className="cloudhome"></div>
            <div className="absolute top-[5.5vw] px-[2vw] grid grid-cols-8 gap-[1vw] w-full"></div>
          </div>

          <div
            className="hello h-auto md:top-[6vw]  top-[11vw] md:h-[40vw] w-[95vw] absolute mx-auto bg-black rounded-[2vw] md:rounded-[1vw] shadow-lg shadow-gray-500"
            style={{
              left: "50%",
              // top: "6vw",
              transform: "translateX(-50%)",
            }}
          >
            {/* <Spin className="mx-auto"/> */}
            <div className="bg-white text-center py-[.5vw] text-[#1F487C] font-semibold rounded-t-[2vw] md:rounded-t-[1vw] text-[5vw] md:text-[1.5vw] ">
              Head Office
            </div>
            <div className="w-full h-[50vw] md:h-[23vw]">
              <iframe
                className="w-full h-[50vw] md:h-[23vw]"
                src="
https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3720.740038490879!2d77.3374997748108!3d11.156328489016479!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba9067bc6956c5d%3A0x58cf7efd392961b1!2sAKR%20Industries%20pvt%20ltd!5e1!3m2!1sen!2sin!4v1725452454647!5m2!1sen!2sin"
                // width="600"
                // height="450"
                style={{ border: 0 }}
                allowfullscreen=""
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
            <div className="text-white bg-[#1F487C] h-auto md:h-[14vw] flex flex-col justify-evenly md:py-[0vw] py-[4vw] rounded-b-[2vw] md:rounded-b-[1vw]">
              <div className="text-center md:py-[0vw] py-[1vw] font-semibold text-[5vw] md:text-[1.5vw]">
                Corporate Head Office - Tiruppur
              </div>
              <div className=" grid grid-cols-1 gap-y-[10vw] md:gap-y-[0vw] md:grid-cols-3 text-[4vw] md:text-[1.2vw] px-[5vw] md:py-[0vw] py-[5vw] md:px-[2vw] pb-[1.5vw]">
                <div className="flex flex-col justify-start md:justify-center items-start md:items-center">
                  2, 385 G, PN Rd, Vengamedu,
                  <br /> Mummoorthi Nagar,
                  <br /> Tiruppur, Chettipalayam,
                  <br /> Tamil Nadu 641603
                </div>

                <div className="flex flex-col justify-start md:justify-center items-start md:items-center ">
                  22RQ+Q4Q, Kalapatti Main Rd,
                  <br /> Indira Nagar, <br />
                  Civil Aerodrome Post, <br />
                  Coimbatore, Tamil Nadu 641014
                </div>

                <div className="flex flex-col justify-start md:justify-center items-start md:items-center ">
                  no 40, 1, Old Mangammanapalya Rd,
                  <br /> Bandepalya,
                  <br /> Garvebhavi Palya,
                  <br /> Bengaluru, Karnataka 560068
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="md:block hidden">
          {/* <Footer /> */}
          <Footer1 />
        </div>
      </div>
    </>
  );
};

export default Contact;
