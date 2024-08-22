import Sidebar from "../MainComponenet/Sidebar";
import Navbar from "../MainComponenet/Navbar";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import MainNavbar from "../MainComponenet/MainNavbar";
import { Outlet } from "react-router";

const MainPage = () => {
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
        <div className="flex md:pt-[8vw] pt-[23vw]">
          <Sidebar sidebarToggle={sidebarToggle} />
          <div className="flex flex-col flex-1">
            <div
              className={` ${sidebarToggle ? "" : "md:ml-[18vw] ml-0"} fixed w-full `}
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
              className={` ${sidebarToggle ? "" : "md:ml-[18vw] ml-0"} md:mt-[2.4vw] md:pt-0 pt-[1vw] z-1`}
            >
              <Outlet />
            </main>
          </div>
        </div>
      </div>
    </>
  );
};
export default MainPage;
