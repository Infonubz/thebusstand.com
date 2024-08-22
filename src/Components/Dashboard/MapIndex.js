import Sidebar from "../MainComponenet/Sidebar";
import Navbar from "../MainComponenet/Navbar";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import MainNavbar from "../MainComponenet/MainNavbar";
import Map from "./Map";

const MapIndex = () => {
  const [sidebarToggle, setSidebarToggle] = useState(false);
  const menulist = useSelector((state) => state.search);
  useEffect(() => {
    if (menulist) {
      setSidebarToggle(true);
    }
  }, [menulist]);
  return (
    <>
      <MainNavbar />
      <div>
        {" "}
        <div className="flex pt-[17vh]">
          <Sidebar sidebarToggle={sidebarToggle} />
          <div className="flex flex-col flex-1">
            <div
              className={` ${sidebarToggle ? "" : "ml-[18vw]"} fixed w-full `}
              style={{
                zIndex: 1,
              }}
            >
              <Navbar
                sidebarToggle={sidebarToggle}
                setSidebarToggle={setSidebarToggle}
              />
            </div>
            <div
              className={` ${sidebarToggle ? "" : "ml-[18vw] "}mt-[5.5vh] z-1`}
            >
              <Map />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default MapIndex;
