import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router";
import "./Loader.css";
import parveen from "../../../Assets/Loader/Opertor_Logos/parveen.png";
import redlogo from "../../../Assets/Loader/Opertor_Logos/redlogo.png";
import yatralogo from "../../../Assets/Loader/Opertor_Logos/yatralogo.png";
import ixigo from "../../../Assets/Loader/Opertor_Logos/ixigologo.png";
import lens from "../../../Assets/Loader/lens.png";
import bubble from "../../../Assets/Loader/LENSss.png";
import { getBoxToBoxArrow } from "curved-arrows";
import Vectorarrow from "../../../Assets/Loader/Vectorarrow.png";
import bobble from "../../../Assets/Loader/LENSss.png";
import thinkbox3 from "../../../Assets/Loader/thinkbox3.png";
import scaleimg2 from "../../../Assets/Loader/scale2.png";
import scaleimg3 from "../../../Assets/Loader/scale3.png";
import word3 from "../../../Assets/Loader/Your Comfort is Our AI's Priority.png";
import word2 from "../../../Assets/Loader/Travel Simplified by our AI.png";
import word4 from "../../../Assets/Loader/Expand your travel with our AI.png";
import Navbar_One from "../../Common/Top-Navbar/Navbar-One";
import { Navbar_Two } from "../../Common/Top-Navbar/Navbar-Two";
import Sidebar from "../../Common/Sidebar-Filter/Sidebar";
import Navbar_Three from "../../Common/Top-Navbar/Navbar-Three";

const Loader = () => {
  const [sidebarToggle, setSidebarToggle] = useState(false);
  const menulist = useSelector((state) => state.search);
  useEffect(() => {
    if (menulist) {
      setSidebarToggle(true);
    }
  }, [menulist]);
  const [loading, setLoading] = useState(true);
  // const getCityAbbreviation = (city) => {
  //   const cityAbbreviations = {
  //     Ahmedabad: "AMD",
  //     Bangalore: "BLR",
  //     Chennai: "MAA",
  //     Coimbatore: "CBE",
  //     Delhi: "DEL",
  //     Hyderabad: "HYD",
  //     Jaipur: "JAI",
  //     Kolkata: "CCU",
  //     Mumbai: "BOM",
  //     Pune: "PNQ",
  //     Surat: "STV",
  //     Vadodara: "BDQ",
  //     Visakhapatnam: "VTZ",
  //     Lucknow: "LKO",
  //     Bhopal: "BHO",
  //     Indore: "IDR",
  //     Patna: "PAT",
  //     Chandigarh: "IXC",
  //     Bhubaneswar: "BBI",
  //     Guwahati: "GAU",
  //     Nagpur: "NAG",
  //     Kochi: "COK",
  //     Madurai: "IXM",
  //     Varanasi: "VNS",
  //     Thiruvananthapuram: "TRV",
  //     Goa: "GOI",
  //     Jodhpur: "JDH",
  //     Raipur: "RPR",
  //     Ranchi: "IXR",
  //     Dehradun: "DED",
  //     Mysore: "MYQ",
  //     Mangalore: "IXE",
  //     Udaipur: "UDR",
  //     Amritsar: "ATQ",
  //   };

  //   return cityAbbreviations[city] || "Unknown";
  // };

  const getCityAbbreviation = (cityName) => {
    if (!cityName) return "";

    const words = cityName.split(" ");

    // If city has multiple words (e.g., "New Delhi" → "NDL")
    if (words.length > 1) {
      return words
        .map((word) => word.charAt(0))
        .join("")
        .toUpperCase();
    }

    // If single-word city, take first + two consonants (e.g., "Vijayawada" → "VJA")
    const letters = cityName.toUpperCase().replace(/[^A-Z]/g, ""); // Remove non-alphabet chars
    const vowels = ["A", "E", "I", "O", "U"];

    let abbreviation = letters.charAt(0); // First letter
    let consonants = letters
      .split("")
      .filter((letter) => !vowels.includes(letter));

    abbreviation += (consonants[1] || letters[1] || "").charAt(0); // Second letter
    abbreviation += (consonants[2] || letters[2] || "").charAt(0); // Third letter

    return abbreviation;
  };

  useEffect(() => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 6000);
  }, []);
  const logos = [parveen, redlogo, yatralogo, ixigo];
  const [currentLogo, setCurrentLogo] = useState(logos[0]);

  useEffect(() => {
    if (logos.length === 0) return;

    const interval = setInterval(() => {
      setCurrentLogo((prevLogo) => {
        const currentIndex = logos.indexOf(prevLogo);
        const nextIndex = (currentIndex + 1) % logos.length;
        return logos[nextIndex];
      });
    }, 400);

    const timeout = setTimeout(() => {
      clearInterval(interval);
    }, 6000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);
  const [scale, setScale] = useState(0);
  const [scale2, setScale2] = useState(0);
  const [scale3, setScale3] = useState(0);
  const [rtscale, setRTScale] = useState(0);
  const [rtscale2, setRTScale2] = useState(0);
  const [rtscale3, setRTScale3] = useState(0);

  const [rtbtscale, setRTBTScale] = useState(0);
  const [rtbtscale2, setRTBTScale2] = useState(0);
  const [rtbtscale3, setRTBTScale3] = useState(0);
  useEffect(() => {
    // left bottom
    const scaleStages = [
      { time: 0, scale: 1 },
      { time: 50, scale: 2 },
      { time: 100, scale: 3 },
      { time: 150, scale: 5 },
      { time: 1700, scale: 3 },
      { time: 1800, scale: 2 },
      { time: 1900, scale: 0 },
    ];
    const scaleStages2 = [
      { time: 0, scale: 1 },
      { time: 15, scale: 2 },
      { time: 1900, scale: 0 },
    ];
    const scaleStages3 = [
      { time: 0, scale: 0 },
      { time: 10, scale: 1 },
      { time: 1950, scale: 0 },
    ];
    scaleStages.forEach((stage) => {
      setTimeout(() => {
        setScale(stage.scale);
      }, stage.time);
    });
    scaleStages2.forEach((stage) => {
      setTimeout(() => {
        setScale2(stage.scale);
      }, stage.time);
    });
    scaleStages3.forEach((stage) => {
      setTimeout(() => {
        setScale3(stage.scale);
      }, stage.time);
    });
    // right top
    const rtscaleStages = [
      { time: 2050, scale: 1 },
      { time: 2100, scale: 2 },
      { time: 2200, scale: 3 },
      { time: 2300, scale: 5 },
      { time: 3700, scale: 3 },
      { time: 3800, scale: 2 },
      { time: 3900, scale: 0 },
    ];
    const rtscaleStages2 = [
      { time: 2010, scale: 1 },
      { time: 2025, scale: 2 },
      { time: 3900, scale: 0 },
    ];
    const rtscaleStages3 = [
      { time: 2000, scale: 0 },
      { time: 2005, scale: 1 },
      { time: 3950, scale: 0 },
    ];
    rtscaleStages.forEach((stage) => {
      setTimeout(() => {
        if (count <= 3) {
          setRTScale(stage.scale);
        }
      }, stage.time);
    });
    rtscaleStages2.forEach((stage) => {
      setTimeout(() => {
        setRTScale2(stage.scale);
      }, stage.time);
    });
    rtscaleStages3.forEach((stage) => {
      setTimeout(() => {
        setRTScale3(stage.scale);
      }, stage.time);
    });
    // right bottom
    const rtbtscaleStages = [
      { time: 4050, scale: 1 },
      { time: 4100, scale: 2 },
      { time: 4200, scale: 3 },
      { time: 4300, scale: 5 },
      { time: 5700, scale: 3 },
      { time: 5800, scale: 2 },
      { time: 5900, scale: 0 },
    ];
    const rtbtscaleStages2 = [
      { time: 4010, scale: 1 },
      { time: 4025, scale: 2 },
      { time: 5900, scale: 0 },
    ];
    const rtbtscaleStages3 = [
      { time: 4000, scale: 0 },
      { time: 4005, scale: 1 },
      { time: 5950, scale: 0 },
    ];
    rtbtscaleStages.forEach((stage) => {
      setTimeout(() => {
        setRTBTScale(stage.scale);
      }, stage.time);
    });
    rtbtscaleStages2.forEach((stage) => {
      setTimeout(() => {
        setRTBTScale2(stage.scale);
      }, stage.time);
    });
    rtbtscaleStages3.forEach((stage) => {
      setTimeout(() => {
        setRTBTScale3(stage.scale);
      }, stage.time);
    });
  }, []);
  console.log(scale, "scalescale");
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (count < 7) {
      const timer = setInterval(() => {
        setCount((prevCount) => prevCount + 1);
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [count]);

  console.log(count, "countcount");

  return (
    <>
      <Navbar_Two loading={loading} />
      {/* <div> */}
      {loading ? (
        <div>
          <div className="md:block hidden">
            <div className="flex pt-[8vw] h-screen">
              <div className="bg-[#e5fff1] w-screen  overflow-hidden relative">
                {/* <div className="container"> */}
                <div className="scrolling-background blur-md"></div>
                <div className="scrolling-background duplicate"></div>
                <div class="black-overlay"></div>

                {/* 1st scale left side */}
                <div
                  style={{
                    position: "absolute",
                    bottom: "26%",
                    left: "9.5%",
                    width: "2.75vw",
                    height: "2.75vw",
                    backgroundImage: `url(${thinkbox3})`,
                    backgroundSize: "contain",
                    backgroundRepeat: "no-repeat",
                    // zIndex: 4,
                    transform: `scale(${scale})`,
                    transformOrigin: "center",
                    transition: "transform 1s ease-in-out",
                    // display: count >= 3 ? "none" : "",
                  }}
                >
                  {/* <label className="text-[0.2vw]">
                Our AI makes your travel simple and easy{" "}
              </label> */}
                  <img
                    style={{
                      position: "absolute",
                      bottom: "54%",
                      left: "43%",
                      width: "0.35vw",
                      height: "0.35vw",
                      // backgroundImage: `url(${word3})`,
                      // backgroundSize: "contain",
                      // backgroundRepeat: "no-repeat",
                      // zIndex: 3,
                      transform: `scale(${scale}) rotate(20deg)`,
                      transformOrigin: "center",
                      transition: "transform 1s ease-in-out",

                      // display: count >= 3 ? "none" : "",
                    }}
                    src={word2}
                  />
                </div>

                <div
                  style={{
                    position: "absolute",
                    bottom: "12%",
                    left: "7%",
                    width: "1.75vw",
                    height: "1.75vw",
                    backgroundImage: `url(${scaleimg2})`,
                    backgroundSize: "contain",
                    backgroundRepeat: "no-repeat",
                    zIndex: 4,
                    transform: `scale(${scale2})`,
                    transformOrigin: "center",
                    transition: "transform 1s ease-in-out",
                    // display: count >= 3 ? "none" : "",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    bottom: "7%",
                    left: "5%",
                    width: "1.25vw",
                    height: "1.25vw",
                    backgroundImage: `url(${scaleimg3})`,
                    backgroundSize: "contain",
                    backgroundRepeat: "no-repeat",
                    zIndex: 4,
                    transform: `scale(${scale3})`,
                    transformOrigin: "center",
                    transition: "transform 1s ease-in-out",
                    // display: count >= 3 ? "none" : "",
                  }}
                />
                {/* <-------2nd scale right side-------> */}
                <div
                  style={{
                    position: "absolute",
                    top: "17%",
                    right: "14%",
                    width: "2.75vw",
                    height: "2.75vw",
                    backgroundImage: `url(${thinkbox3})`,
                    backgroundSize: "contain",
                    backgroundRepeat: "no-repeat",
                    zIndex: 4,
                    transform: `scale(${rtscale})`,
                    transformOrigin: "center",
                    transition: "transform 1s ease-in-out",
                    // display: count <= 3 ? "none" : "",
                  }}
                >
                  {/* <label className="text-[0.2vw]">
                Our AI makes your travel simple and easy{" "}
              </label> */}
                  <img
                    style={{
                      position: "absolute",
                      bottom: "57%",
                      left: "43%",
                      width: "0.35vw",
                      height: "0.35vw",
                      // backgroundImage: `url(${word3})`,
                      // backgroundSize: "contain",
                      // backgroundRepeat: "no-repeat",
                      zIndex: 3,
                      transform: `scale(${rtscale}) rotate(20deg)`,
                      transformOrigin: "center",
                      transition: "transform 1s ease-in-out",

                      // display: count >= 3 ? "none" : "",
                    }}
                    src={word3}
                  />
                </div>
                <div
                  style={{
                    position: "absolute",
                    top: "34%",
                    right: "18%",
                    width: "1.75vw",
                    height: "1.75vw",
                    backgroundImage: `url(${scaleimg2})`,
                    backgroundSize: "contain",
                    backgroundRepeat: "no-repeat",
                    zIndex: 4,
                    transform: `scale(${rtscale2})`,
                    transformOrigin: "center",
                    transition: "transform 1s ease-in-out",
                    // display: count <= 3 ? "none" : "",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    top: "41%",
                    right: "20%",
                    width: "1.25vw",
                    height: "1.25vw",
                    backgroundImage: `url(${scaleimg3})`,
                    backgroundSize: "contain",
                    backgroundRepeat: "no-repeat",
                    zIndex: 4,
                    transform: `scale(${rtscale3})`,
                    transformOrigin: "center",
                    transition: "transform 1s ease-in-out",
                    // display: count <= 3 ? "none" : "",
                  }}
                />
                <div className="graph__wrapper">
                  <svg
                    width="60vw"
                    height="45vw"
                    viewBox="0 0 600 300"
                    version="1.1"
                    style={{ overflow: "visible" }}
                  >
                    <g
                      id="Page-1"
                      stroke="none"
                      strokeWidth="1"
                      fill="none"
                      fillRule="evenodd"
                    >
                      <path
                        id="Path-1"
                        className="path"
                        fill="none"
                        // stroke="white"
                        strokeWidth="5"
                        strokeLinejoin="round"
                        strokeMiterlimit="10"
                        d="M10,150 A250,150 0 0,1 385,150" // increase width 385
                      />
                      <path
                        className="dashed"
                        fill="none"
                        stroke="white"
                        strokeWidth="3"
                        strokeLinejoin="round"
                        strokeMiterlimit="10"
                        strokeDasharray="10,5"
                        d="M10,150 A250,150 0 0,1 385,150"
                      />
                      {/* <polyline id="arrow" points="0,-9 18,0 0,9 5,0" fill="white"  transform="scale(1.5)">
                    <animateMotion
                      rotate="auto"
                      begin="0.1s"
                      dur="7s"
                      repeatCount="1"
                      fill="freeze"
                    >
                      <mpath xlinkHref="#Path-1" />
                    </animateMotion>
                  </polyline> */}

                      {/* <g id="bus" fill="white" transform="translate(-10, -10)">
                    <rect x="0" y="0" width="20" height="10" rx="2" />
                    <circle cx="5" cy="12" r="2" />
                    <circle cx="15" cy="12" r="2" />
                  </g>
                  <animateMotion
                    xlinkHref="#bus"
                    rotate="auto"
                    begin="1s"
                    dur="6s"
                    repeatCount="1"
                    fill="freeze"
                  >
                    <mpath xlinkHref="#Path-1" />
                  </animateMotion> */}
                      <image
                        id="moving-image"
                        href={Vectorarrow}
                        width="1.8vw"
                        height="1.8vw"
                        style={{
                          transform: "rotate(45deg)",
                        }}
                        x="0"
                        y="-1.7vw" // arrow moving top
                      >
                        <animateMotion
                          rotate="auto"
                          begin="0.1s"
                          dur="7s"
                          repeatCount="1"
                          fill="freeze"
                          height={"1.8vw"}
                          width={"1.8vw"}
                        >
                          <mpath xlinkHref="#Path-1" />
                        </animateMotion>
                        {/* <animate
                      attributeName="y"
                      from="0"
                      to="-20"
                      dur="2s"
                      fill="freeze"
                    /> */}
                      </image>

                      <circle
                        cx="10"
                        cy="150"
                        r="10"
                        fill="white"
                        className="opacity-50"
                      />
                      <circle
                        cx="10"
                        cy="150"
                        r="5"
                        fill="white"
                        className=""
                      />
                      <circle
                        cx="385"
                        cy="150"
                        r="10"
                        fill="white"
                        className="opacity-50"
                      />
                      <circle cx="385" cy="150" r="5" fill="white" />
                    </g>
                  </svg>
                </div>
                {/* 3rd scale right side */}
                <div
                  style={{
                    position: "absolute",
                    bottom: "28%",
                    right: "10%",
                    width: "2.75vw",
                    height: "2.75vw",
                    backgroundImage: `url(${thinkbox3})`,
                    backgroundSize: "contain",
                    backgroundRepeat: "no-repeat",
                    zIndex: 4,
                    transform: `scale(${rtbtscale})`,
                    transformOrigin: "center",
                    transition: "transform 1s ease-in-out",
                    // display: count <= 3 ? "none" : "",
                  }}
                >
                  {/* <label className="text-[0.2vw]">
                Our AI makes your travel simple and easy{" "}
              </label> */}
                  <img
                    style={{
                      position: "absolute",
                      bottom: "56%",
                      left: "43%",
                      width: "0.35vw",
                      height: "0.35vw",
                      // backgroundImage: `url(${word3})`,
                      // backgroundSize: "contain",
                      // backgroundRepeat: "no-repeat",
                      zIndex: 3,
                      transform: `scale(${rtbtscale}) rotate(20deg)`,
                      transformOrigin: "center",
                      transition: "transform 1s ease-in-out",

                      // display: count >= 3 ? "none" : "",
                    }}
                    src={word4}
                    alt="tagline"
                  />
                </div>
                <div
                  style={{
                    position: "absolute",
                    bottom: "13%",
                    right: "12%",
                    width: "1.75vw",
                    height: "1.75vw",
                    backgroundImage: `url(${scaleimg2})`,
                    backgroundSize: "contain",
                    backgroundRepeat: "no-repeat",
                    zIndex: 4,
                    transform: `scale(${rtbtscale2})`,
                    transformOrigin: "center",
                    transition: "transform 1s ease-in-out",
                    // display: count <= 3 ? "none" : "",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    bottom: "7%",
                    right: "14%",
                    width: "1.25vw",
                    height: "1.25vw",
                    backgroundImage: `url(${scaleimg3})`,
                    backgroundSize: "contain",
                    backgroundRepeat: "no-repeat",
                    zIndex: 4,
                    transform: `scale(${rtbtscale3})`,
                    transformOrigin: "center",
                    transition: "transform 1s ease-in-out",
                    // display: count <= 3 ? "none" : "",
                  }}
                />
                <div className="graph__wrapper">
                  <svg
                    width="60vw"
                    height="45vw"
                    viewBox="0 0 600 300"
                    version="1.1"
                    style={{ overflow: "visible" }}
                  >
                    <g
                      id="Page-1"
                      stroke="none"
                      strokeWidth="1"
                      fill="none"
                      fillRule="evenodd"
                    >
                      <path
                        id="Path-1"
                        className="path"
                        fill="none"
                        // stroke="white"
                        strokeWidth="5"
                        strokeLinejoin="round"
                        strokeMiterlimit="10"
                        d="M10,150 A250,150 0 0,1 385,150" // increase width 385
                      />
                      <path
                        className="dashed"
                        fill="none"
                        stroke="white"
                        strokeWidth="3"
                        strokeLinejoin="round"
                        strokeMiterlimit="10"
                        strokeDasharray="10,5"
                        d="M10,150 A250,150 0 0,1 385,150"
                      />
                      {/* <polyline id="arrow" points="0,-9 18,0 0,9 5,0" fill="white"  transform="scale(1.5)">
                    <animateMotion
                      rotate="auto"
                      begin="0.1s"
                      dur="7s"
                      repeatCount="1"
                      fill="freeze"
                    >
                      <mpath xlinkHref="#Path-1" />
                    </animateMotion>
                  </polyline> */}

                      {/* <g id="bus" fill="white" transform="translate(-10, -10)">
                    <rect x="0" y="0" width="20" height="10" rx="2" />
                    <circle cx="5" cy="12" r="2" />
                    <circle cx="15" cy="12" r="2" />
                  </g>
                  <animateMotion
                    xlinkHref="#bus"
                    rotate="auto"
                    begin="1s"
                    dur="6s"
                    repeatCount="1"
                    fill="freeze"
                  >
                    <mpath xlinkHref="#Path-1" />
                  </animateMotion> */}
                      <image
                        id="moving-image"
                        href={Vectorarrow}
                        width="1.8vw"
                        height="1.8vw"
                        style={{
                          transform: "rotate(45deg)",
                        }}
                        x="0"
                        y="-1.7vw" // arrow moving top
                      >
                        <animateMotion
                          rotate="auto"
                          begin="0.1s"
                          dur="7s"
                          repeatCount="1"
                          fill="freeze"
                          height={"1.8vw"}
                          width={"1.8vw"}
                        >
                          <mpath xlinkHref="#Path-1" />
                        </animateMotion>
                        {/* <animate
                      attributeName="y"
                      from="0"
                      to="-20"
                      dur="2s"
                      fill="freeze"
                    /> */}
                      </image>

                      <circle
                        cx="10"
                        cy="150"
                        r="10"
                        fill="white"
                        className="opacity-50"
                      />
                      <circle
                        cx="10"
                        cy="150"
                        r="5"
                        fill="white"
                        className=""
                      />
                      <circle
                        cx="385"
                        cy="150"
                        r="10"
                        fill="white"
                        className="opacity-50"
                      />
                      <circle cx="385" cy="150" r="5" fill="white" />
                    </g>
                  </svg>
                </div>
                {/* <div className="lens"></div> */}
                {/* <div className="bobble"></div>  */}
                <div
                  style={{
                    backgroundImage: `url(${lens})`,
                    backgroundSize: "contain",
                    backgroundRepeat: "no-repeat",
                    zIndex: 2,
                  }}
                  className="absolute top-[22vw] left-[59vw] w-[40vw] h-[22vw] z-10 transform -translate-x-1/2 -translate-y-1/2"
                ></div>
                {/* <div className="absolute top-[60.1%] left-[70.15%] w-[25vw] h-[40vw] transform -translate-x-1/2 -translate-y-1/2">
              <div
                className=" w-full h-full bg-contain bg-no-repeat"
                style={{
                  // backgroundImage: "url('../../assets/lens.png')",
                  backgroundImage: `url(${lens})`,
                  zIndex: 2,
                }}
              >
                <div
                  className="absolute top-[40%] left-[69.5%] w-[52.5%] h-1/4 bg-contain bg-no-repeat transform -translate-x-1/2 -translate-y-1/2"
                  style={{
                    // backgroundImage: "url('../../assets/LENSss.png')",
                    backgroundImage: `url(${bubble})`,
                    zIndex: 4,
                  }}
                ></div>
              </div>
            </div> */}

                {/* <div className="parveen"></div> */}
                {/* <div className="arrow-container"> */}
                <div className="arrow"></div>
                {/* </div>{" "} */}
                <div
                  style={{
                    backgroundImage: `url(${currentLogo})`,
                    backgroundSize: "contain",
                    backgroundRepeat: "no-repeat",
                    zIndex: 2,
                  }}
                  className="absolute top-[19.50vw] left-[48.80vw] w-[11vw] h-[11vw] z-10 transform -translate-x-1/2 -translate-y-1/2"
                ></div>
                <div
                  style={{
                    backgroundImage: `url(${bobble})`,
                    backgroundSize: "contain",
                    backgroundRepeat: "no-repeat",
                    zIndex: 2,
                  }}
                  className="absolute top-[19.50vw] left-[48.80vw] w-[11vw] h-[11vw] z-10 transform -translate-x-1/2 -translate-y-1/2"
                ></div>
                <div className="text-white absolute text-[5.5vw] font-extrabold left-[24vw] top-[15vw] ">
                  {getCityAbbreviation(localStorage.getItem("departure"))}
                </div>
                <div className="text-white absolute text-[5.5vw] font-extrabold right-[27vw] top-[15vw] ">
                  {getCityAbbreviation(localStorage.getItem("arrival"))}
                </div>
              </div>
              {/* </div> */}
            </div>
          </div>
          {/* -------------------------------------------------MobileResponsive--------------------------------------------------- */}
          <div className="md:hidden block">
            <div className="flex pt-[11vw] h-screen">
              <div className="bg-[#e5fff1] w-screen  overflow-hidden relative">
                {/* <div className="container"> */}
                <div className="mobile-scrolling-background blur-md"></div>
                <div className="mobile-scrolling-background mobile-duplicate"></div>
                <div class="black-overlay"></div>

                {/* 1st scale left side */}
                <div
                  style={{
                    position: "absolute",
                    top: "16%",
                    left: "22.5%",
                    width: "7vw",
                    height: "7vw",
                    backgroundImage: `url(${thinkbox3})`,
                    backgroundSize: "contain",
                    backgroundRepeat: "no-repeat",
                    // zIndex: 4,
                    transform: `scale(${scale})`,
                    transformOrigin: "center",
                    transition: "transform 1s ease-in-out",
                    // display: count >= 3 ? "none" : "",
                  }}
                >
                  {/* <label className="text-[0.2vw]">
                Our AI makes your travel simple and easy{" "}
              </label> */}
                  <img
                    style={{
                      position: "absolute",
                      bottom: "51%",
                      left: "41%",
                      width: "1.1vw",
                      height: "1.1vw",
                      // backgroundImage: `url(${word3})`,
                      // backgroundSize: "contain",
                      // backgroundRepeat: "no-repeat",
                      // zIndex: 3,
                      transform: `scale(${scale}) rotate(20deg)`,
                      transformOrigin: "center",
                      transition: "transform 1s ease-in-out",

                      // display: count >= 3 ? "none" : "",
                    }}
                    src={word2}
                  />
                </div>

                <div
                  style={{
                    position: "absolute",
                    top: "25%",
                    left: "11%",
                    width: "4vw",
                    height: "4vw",
                    backgroundImage: `url(${scaleimg2})`,
                    backgroundSize: "contain",
                    backgroundRepeat: "no-repeat",
                    zIndex: 4,
                    transform: `scale(${scale2})`,
                    transformOrigin: "center",
                    transition: "transform 1s ease-in-out",
                    // display: count >= 3 ? "none" : "",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    top: "29%",
                    left: "7.5%",
                    width: "2.75vw",
                    height: "2.75vw",
                    backgroundImage: `url(${scaleimg3})`,
                    backgroundSize: "contain",
                    backgroundRepeat: "no-repeat",
                    zIndex: 4,
                    transform: `scale(${scale3})`,
                    transformOrigin: "center",
                    transition: "transform 1s ease-in-out",
                    // display: count >= 3 ? "none" : "",
                  }}
                />
                {/* <-------2nd scale right side-------> */}
                <div
                  style={{
                    position: "absolute",
                    top: "16%",
                    right: "20%",
                    width: "7vw",
                    height: "7vw",
                    backgroundImage: `url(${thinkbox3})`,
                    backgroundSize: "contain",
                    backgroundRepeat: "no-repeat",
                    zIndex: 4,
                    transform: `scale(${rtscale})`,
                    transformOrigin: "center",
                    transition: "transform 1s ease-in-out",
                    // display: count <= 3 ? "none" : "",
                  }}
                >
                  {/* <label className="text-[0.2vw]">
                Our AI makes your travel simple and easy{" "}
              </label> */}
                  <img
                    style={{
                      position: "absolute",
                      top: "30%",
                      left: "43%",
                      width: "1.1vw",
                      height: "1.1vw",
                      // backgroundImage: `url(${word3})`,
                      // backgroundSize: "contain",
                      // backgroundRepeat: "no-repeat",
                      zIndex: 3,
                      transform: `scale(${rtscale}) rotate(20deg)`,
                      transformOrigin: "center",
                      transition: "transform 1s ease-in-out",

                      // display: count >= 3 ? "none" : "",
                    }}
                    src={word3}
                  />
                </div>
                <div
                  style={{
                    position: "absolute",
                    top: "24%",
                    right: "11%",
                    width: "4vw",
                    height: "4vw",
                    backgroundImage: `url(${scaleimg2})`,
                    backgroundSize: "contain",
                    backgroundRepeat: "no-repeat",
                    zIndex: 4,
                    transform: `scale(${rtscale2})`,
                    transformOrigin: "center",
                    transition: "transform 1s ease-in-out",
                    // display: count <= 3 ? "none" : "",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    top: "28%",
                    right: "7.5%",
                    width: "2.75vw",
                    height: "2.75vw",
                    backgroundImage: `url(${scaleimg3})`,
                    backgroundSize: "contain",
                    backgroundRepeat: "no-repeat",
                    zIndex: 4,
                    transform: `scale(${rtscale3})`,
                    transformOrigin: "center",
                    transition: "transform 1s ease-in-out",
                    // display: count <= 3 ? "none" : "",
                  }}
                />

                {/* 3rd scale right side */}
                <div
                  style={{
                    position: "absolute",
                    top: "70%",
                    left: "22.5%",
                    width: "7vw",
                    height: "7vw",
                    backgroundImage: `url(${thinkbox3})`,
                    backgroundSize: "contain",
                    backgroundRepeat: "no-repeat",
                    zIndex: 4,
                    transform: `scale(${rtbtscale})`,
                    transformOrigin: "center",
                    transition: "transform 1s ease-in-out",
                    // display: count <= 3 ? "none" : "",
                  }}
                >
                  {/* <label className="text-[0.2vw]">
                Our AI makes your travel simple and easy{" "}
              </label> */}
                  <img
                    style={{
                      position: "absolute",
                      bottom: "50%",
                      right: "43%",
                      width: "1.1vw",
                      height: "1.1vw",
                      // backgroundImage: `url(${word3})`,
                      // backgroundSize: "contain",
                      // backgroundRepeat: "no-repeat",
                      zIndex: 3,
                      transform: `scale(${rtbtscale}) rotate(20deg)`,
                      transformOrigin: "center",
                      transition: "transform 1s ease-in-out",

                      // display: count >= 3 ? "none" : "",
                    }}
                    src={word4}
                    alt="tagline"
                  />
                </div>
                <div
                  style={{
                    position: "absolute",
                    top: "79.5%",
                    left: "11%",
                    width: "4vw",
                    height: "4vw",
                    backgroundImage: `url(${scaleimg2})`,
                    backgroundSize: "contain",
                    backgroundRepeat: "no-repeat",
                    zIndex: 4,
                    transform: `scale(${rtbtscale2})`,
                    transformOrigin: "center",
                    transition: "transform 1s ease-in-out",
                    // display: count <= 3 ? "none" : "",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    top: "83.5%",
                    left: "7.5%",
                    width: "2.75vw",
                    height: "2.75vw",
                    backgroundImage: `url(${scaleimg3})`,
                    backgroundSize: "contain",
                    backgroundRepeat: "no-repeat",
                    zIndex: 4,
                    transform: `scale(${rtbtscale3})`,
                    transformOrigin: "center",
                    transition: "transform 1s ease-in-out",
                    // display: count <= 3 ? "none" : "",
                  }}
                />
                <div className="relative w-full ">
                  <div className="relative  left-[17.5vw] top-[50vw] ">
                    <svg
                      width="100vw"
                      // height="100vh"
                      viewBox="0 0 600 300"
                      fill="green"
                      version="1.1"
                      style={{ overflow: "visible" }}
                    >
                      <g
                        id="Page-1"
                        stroke="none"
                        strokeWidth="1"
                        fill="none"
                        fillRule="evenodd"
                      >
                        <path
                          id="Path-1"
                          className="path"
                          fill="none"
                          // stroke="white"
                          strokeWidth="105"
                          strokeLinejoin="round"
                          strokeMiterlimit="10"
                          d="M10,150 A250,150 0 0,1 385,150" // increase width 385
                        />
                        <path
                          className="dashed"
                          fill="none"
                          stroke="white"
                          strokeWidth="3"
                          strokeLinejoin="round"
                          strokeMiterlimit="10"
                          strokeDasharray="10,5"
                          d="M10,150 A250,150 0 0,1 385,150"
                        />
                        {/* <polyline id="arrow" points="0,-9 18,0 0,9 5,0" fill="white"  transform="scale(1.5)">
                    <animateMotion
                      rotate="auto"
                      begin="0.1s"
                      dur="7s"
                      repeatCount="1"
                      fill="freeze"
                    >
                      <mpath xlinkHref="#Path-1" />
                    </animateMotion>
                  </polyline> */}

                        {/* <g id="bus" fill="white" transform="translate(-10, -10)">
                    <rect x="0" y="0" width="20" height="10" rx="2" />
                    <circle cx="5" cy="12" r="2" />
                    <circle cx="15" cy="12" r="2" />
                  </g>
                  <animateMotion
                    xlinkHref="#bus"
                    rotate="auto"
                    begin="1s"
                    dur="6s"
                    repeatCount="1"
                    fill="freeze"
                  >
                    <mpath xlinkHref="#Path-1" />
                  </animateMotion> */}
                        <image
                          id="moving-image"
                          href={Vectorarrow}
                          width="10vw"
                          height="10vw"
                          style={{
                            transform: "rotate(45deg)",
                          }}
                          x="0"
                          y="-10vw" // arrow moving top
                        >
                          <animateMotion
                            rotate="auto"
                            begin="0.1s"
                            dur="7s"
                            repeatCount="1"
                            fill="freeze"
                            height={"1.8vw"}
                            width={"1.8vw"}
                          >
                            <mpath xlinkHref="#Path-1" />
                          </animateMotion>
                          {/* <animate
                      attributeName="y"
                      from="0"
                      to="-20"
                      dur="2s"
                      fill="freeze"
                    /> */}
                        </image>

                        <circle
                          cx="10"
                          cy="150"
                          r="15"
                          fill="white"
                          className="opacity-50"
                        />
                        <circle
                          cx="10"
                          cy="150"
                          r="7.5"
                          fill="white"
                          className=""
                        />
                        <circle
                          cx="385"
                          cy="150"
                          r="15"
                          fill="white"
                          className="opacity-50"
                        />
                        <circle cx="385" cy="150" r="7.5" fill="white" />
                      </g>
                    </svg>
                  </div>
                  <div className="relative">
                    <img
                      style={{
                        // backgroundImage: `url(${lens})`,
                        backgroundSize: "contain",
                        backgroundRepeat: "no-repeat",
                        zIndex: 2,
                      }}
                      src={lens}
                      className="absolute top-[40vw] left-[60vw] w-[55vw] h-[41vw] z-10 transform -translate-x-1/2 -translate-y-1/2"
                    />
                    <img
                      style={{
                        // backgroundImage: `url(${currentLogo})`,
                        backgroundSize: "contain",
                        backgroundRepeat: "no-repeat",
                        zIndex: 2,
                      }}
                      src={currentLogo}
                      className=" absolute top-[35.5vw] left-[51vw] w-[20vw] h-[20vw] z-10 transform -translate-x-1/2 -translate-y-1/2"
                    />{" "}
                    <img
                      style={{
                        // backgroundImage: `url(${bobble})`,
                        backgroundSize: "contain",
                        backgroundRepeat: "no-repeat",
                        zIndex: 2,
                      }}
                      src={bobble}
                      className=" absolute top-[35.5vw] left-[51vw] w-[20vw] h-[20vw] z-10 transform -translate-x-1/2 -translate-y-1/2"
                    />
                    {/* </div> */}
                    <div className="text-white absolute text-[8vw] font-extrabold left-[12vw] top-[28vw] ">
                      {getCityAbbreviation(localStorage.getItem("departure"))}
                    </div>
                    <div className="text-white absolute text-[8vw] font-extrabold right-[10vw] top-[28vw] ">
                      {getCityAbbreviation(localStorage.getItem("arrival"))}
                    </div>
                  </div>
                </div>
                {/* <div className="lens"></div> */}
                {/* <div className="bobble"></div>  */}

                {/* <div className="absolute top-[60.1%] left-[70.15%] w-[25vw] h-[40vw] transform -translate-x-1/2 -translate-y-1/2">
              <div
                className=" w-full h-full bg-contain bg-no-repeat"
                style={{
                  // backgroundImage: "url('../../assets/lens.png')",
                  backgroundImage: `url(${lens})`,
                  zIndex: 2,
                }}
              >
                <div
                  className="absolute top-[40%] left-[69.5%] w-[52.5%] h-1/4 bg-contain bg-no-repeat transform -translate-x-1/2 -translate-y-1/2"
                  style={{
                    // backgroundImage: "url('../../assets/LENSss.png')",
                    backgroundImage: `url(${bubble})`,
                    zIndex: 4,
                  }}
                ></div>
              </div>
            </div> */}

                {/* <div className="parveen"></div> */}
                {/* <div className="arrow-container"> */}
                <div className="mobile-arrow"></div>
                {/* </div>{" "} */}
              </div>
              {/* </div> */}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex md:pt-[8vw] pt-[12vw] bg-[#E5FFF1]">
          <Sidebar sidebarToggle={sidebarToggle} />
          <div className="flex flex-col flex-1">
            <div
              className={` ${
                sidebarToggle ? "" : "md:pl-[18vw] ml-0"
              } fixed w-full mt-[0.5vw] md:block hidden z-10`}
              // style={{
              //   zIndex: 1,
              // }}
            >
              <Navbar_Three
                sidebarToggle={sidebarToggle}
                setSidebarToggle={setSidebarToggle}
              />
            </div>
            {/* <div
              className={` ${sidebarToggle ? "" : "ml-[18vw] "}mt-[2.4vw] z-1`}
            >
              <Sample />
            </div> */}
            <main
              className={` ${
                sidebarToggle ? "" : "md:ml-[18vw] ml-0"
              } md:mt-[2.8vw]  md:pt-0 pt-[1vw] -z-1`}
            >
              <Outlet />
            </main>
          </div>
        </div>
      )}
      {/* </div> */}
    </>
  );
};
export default Loader;

{
  /* <div className="graph__wrapper">
<svg
  width="40vw"
  height="15vw"
  viewBox="0 0 450 160"
  version="1.1"
  style={{ overflow: "visible" }}
>
  <g
    id="Page-1"
    stroke="none"
    strokeWidth="1"
    fill="none"
    fillRule="evenodd"
  >
    <path
      id="Path-1"
      className="path"
      fill="none"
      strokeWidth="5"
      strokeLinejoin="round"
      strokeMiterlimit="10"
      d="M10,150 A200,140 0 0,1 385,150"
    />
    <path
      className="dashed"
      fill="none"
      stroke="white"
      strokeWidth="5"
      strokeLinejoin="round"
      strokeMiterlimit="10"
      d="M10,150 A200,140 0 0,1 385,150"
    />
  </g>
</svg>
<motion.div
  style={{
    position: "absolute",
    fontSize: "20px",
    color: "white",
  }}
  animate={{
    x: [10, 385], // Match the start and end of the path
    y: [150, 150], // Keep it aligned along the bottom curve
  }}
  transition={{
    duration: 6,
    repeat: 1,
  }}
>
  <FaBus />
</motion.div>
</div> */
}
