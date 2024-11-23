import Sidebar from "../MainComponenet/Sidebar";
import Navbar from "../MainComponenet/Navbar";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import MainNavbar from "../MainComponenet/MainNavbar";
import { Outlet } from "react-router";
import grouplogo from "../../assets/Grouplogos.png";
import "../../../src/Components/Dashboard/loading.css";
import parveen from "../../assets/parveen.png";
import redlogo from "../../assets/redlogo.png";
import yatralogo from "../../assets/yatralogo.png";
import ixigo from "../../assets/ixigologo.png";
import orange from "../../assets/makemy.png";
import lens from "../../assets/lens.png";
import bubble from "../../assets/LENSss.png";
import { getBoxToBoxArrow } from "curved-arrows";
import bus from "../../assets/bus.png";
const MainPage = () => {
  const [sidebarToggle, setSidebarToggle] = useState(false);
  const menulist = useSelector((state) => state.search);
  useEffect(() => {
    if (menulist) {
      setSidebarToggle(true);
    }
  }, [menulist]);
  const [loading, setLoading] = useState(false);
  const getCityAbbreviation = (city) => {
    const cityAbbreviations = {
      Coimbatore: "CBE",
      Bangalore: "BLR",
      Chennai: "CHE",
      Hyderabad: "HYD",
      Mumbai: "BOM",
      Pondicherry: "PDY",
    };

    return cityAbbreviations[city] || "Unknown";
  };
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 7000);
  }, []);
  const logos = [parveen, redlogo, yatralogo, ixigo, orange];

  const [currentLogo, setCurrentLogo] = useState(parveen);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % logos.length);
    }, 400);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setCurrentLogo(logos[index]);
  }, [index]);

  return (
    <>
      <MainNavbar />
      {/* <div> */}
      {loading ? (
        <div className="flex pt-[8vw] ">
          <div className="bg-[#e5fff1] w-screen h-[88vh] overflow-hidden relative">
            {/* <div className="container"> */}
            <div className="scrolling-background"></div>
            <div className="scrolling-background duplicate"></div>
            <div class="black-overlay"></div>

            <div className="graph__wrapper">
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
                    // stroke="white"
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
                    strokeDasharray="10,5"
                    d="M10,150 A200,140 0 0,1 385,150"
                  />
                  {/* <polyline
                    id="arrow"
                    points="0,-9 18,0 0,9 5,0"
                    fill="white"
                  >
                    <animateMotion
                      rotate="auto"
                      begin="1s"
                      dur="6s"
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
                    // href="https://example.com/path-to-your-image.png"
                    href={bus}
                    width="4vw"
                    height="2vw"
                    transform="translate(-20, -20)"
                    // transform="translate(-20, -20) rotate(45)"
                  >
                    <animateMotion
                      rotate="auto"
                      begin="1s"
                      dur="6.5s"
                      repeatCount="1"
                      fill="freeze"
                    >
                      <mpath xlinkHref="#Path-1" />
                    </animateMotion>
                  </image>
                  <circle cx="10" cy="150" r="5" fill="white" className="" />
                  <circle cx="385" cy="150" r="5" fill="white" />
                </g>
              </svg>
            </div>

            {/* <div className="lens"></div>
            <div className="bobble"></div> */}
            <div
              style={{
                backgroundImage: `url(${lens})`,
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                zIndex: 2,
              }}
              className="absolute top-[20vw] left-[61vw] w-[48vw] h-[25vw] z-10 transform -translate-x-1/2 -translate-y-1/2"
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
              className="absolute top-[17vw] left-[49.25vw] w-[15.20vw] h-[12.70vw] z-10 transform -translate-x-1/2 -translate-y-1/2"
            ></div>

            <div className="text-white absolute text-[4vw] font-extrabold left-[28vw] top-[15vw] ">
              {getCityAbbreviation(localStorage.getItem("departure"))}
            </div>
            <div className="text-white absolute text-[4vw] font-extrabold right-[32vw] top-[15vw] ">
              {getCityAbbreviation(localStorage.getItem("arrival"))}
            </div>
          </div>
          {/* </div> */}
        </div>
      ) : (
        <div className="flex md:pt-[8vw] pt-[12vw]">
          <Sidebar sidebarToggle={sidebarToggle} />
          <div className="flex flex-col flex-1">
            <div
              className={` ${
                sidebarToggle ? "" : "md:pl-[18vw] ml-0"
              } fixed w-full mt-[0.5vw] md:block hidden`}
              // style={{
              //   zIndex: 1,
              // }}
            >
              <Navbar
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
              } md:mt-[2.9vw]  md:pt-0 pt-[1vw] z-1`}
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
export default MainPage;

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
