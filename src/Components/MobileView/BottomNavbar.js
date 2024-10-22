import React, { useEffect, useState } from "react";
import ColorCodes from "../Common/ColorCodes";
import { FaHome, FaTicketAlt } from "react-icons/fa";
import { IoFilter } from "react-icons/io5";
import { BiSolidDashboard, BiSolidUserRectangle } from "react-icons/bi";
import { useNavigate } from "react-router";
import { Drawer } from "antd";
import SidebarMobile from "../MainComponenet/SidebarMobile";

export default function BottomNavbar() {
  const colors = ColorCodes();
  const [currentTab, setCurrentTab] = useState(
    Number(sessionStorage.getItem("tab")) || 2
  );
  const [opendrawer, setOpenDrawer] = useState(false);
  const navigation = useNavigate();

  const handleDrawerClose = () => {
    setOpenDrawer(false);
  };

  const handleFilterClick = (e) => {
    e.preventDefault();
    // Only set currentTab if it's not already on the filter tab
    if (currentTab !== 2) {
      setCurrentTab(2);
      sessionStorage.setItem("tab", 2);
    }
    // Toggle the drawer instead of resetting it
    setOpenDrawer(!opendrawer);
  };

  useEffect(() => {
    sessionStorage.setItem("tab", currentTab);
  }, [currentTab]);
  
  console.log(currentTab, "currentTabcurrentTab");

  return (
    <>
      <footer
        className={` fixed bottom-0 h-[15vw] w-full bg-[${colors.primary}] md:hidden block py-[1vw] z-[2]`}
      >
        <div className="flex items-center justify-between px-[5vw]">
          <div
            className={`flex flex-col items-center ${
              currentTab === 1 ? "" : " opacity-50"
            }`}
            onClick={(e) => {
              setCurrentTab(1);
              sessionStorage.setItem("tab", 1);
              navigation("/");
              e.preventDefault();
            }}
          >
            <FaHome color="white" size={"8vw"} />
            <label
              className={`${
                currentTab === 1 ? "text-white font-extrabold" : "text-white"
              } text-[4vw]`}
            >
              Home
            </label>
          </div>
          <div
            className={`flex flex-col items-center ${
              currentTab === 2 ? "" : " opacity-50"
            }`}
            // onClick={handleFilterClick}
            onClick={(e) => {
              setCurrentTab(2);
              sessionStorage.setItem("tab", 2);
              navigation("/dashboard");
              e.preventDefault();
            }}
          >
            {/* <IoFilter color="white" size={"8vw"} />
            <label
              className={`${
                currentTab === 2 ? "text-white font-extrabold" : "text-white"
              } text-[4vw]`}
            >
              Filter
            </label> */}
            <BiSolidDashboard color="white" size={"8vw"} />
            <label
              className={`${
                currentTab === 2 ? "text-white font-extrabold" : "text-white"
              } text-[4vw]`}
            >
              Dashboard
            </label>
          </div>
          <div
            className={`flex flex-col items-center ${
              currentTab === 3 ? "" : " opacity-50"
            }`}
            onClick={(e) => {
              setCurrentTab(3);
              sessionStorage.setItem("tab", 3);
              navigation("/main", { state: { tabIndex: 3 } });
              e.preventDefault();
            }}
          >
            <FaTicketAlt color="white" size={"8vw"} />
            <label
              className={`${
                currentTab === 3 ? "text-white font-extrabold" : "text-white"
              } text-[4vw]`}
            >
              Booking
            </label>
          </div>
          <div
            className={`flex flex-col items-center ${
              currentTab === 4 ? "" : " opacity-50"
            }`}
            onClick={(e) => {
              setCurrentTab(4);
              sessionStorage.setItem("tab", 4);
              navigation("/settings");
              e.preventDefault();
            }}
          >
            <BiSolidUserRectangle color="white" size={"8vw"} />
            <label
              className={`${
                currentTab === 4 ? "text-white font-extrabold" : "text-white"
              } text-[4vw]`}
            >
              Profile
            </label>
          </div>
        </div>
      </footer>

      <Drawer
        closable
        destroyOnClose
        placement="bottom"
        width={"100%"}
        style={{ backgroundColor: "#E5FFF1" }}
        open={opendrawer}
        onClose={handleDrawerClose}
      >
        <SidebarMobile />
      </Drawer>
    </>
  );
}
