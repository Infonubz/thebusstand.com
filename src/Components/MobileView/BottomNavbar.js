import React, { useState } from "react";
import ColorCodes from "../Common/ColorCodes";
import { FaHome, FaTicketAlt, FaUserCircle } from "react-icons/fa";
import { IoFilter } from "react-icons/io5";
import { HiTicket } from "react-icons/hi";
import { BiSolidUserRectangle } from "react-icons/bi";
import { useNavigate } from "react-router";
import { Drawer } from "antd";
import SidebarMobile from "../MainComponenet/SidebarMobile";

export default function BottomNavbar() {
  const colors = ColorCodes();
  const [currentTab, setCurrentTab] = useState(1);
  const navigation = useNavigate();
  const handleonclick = (tabvalue, route) => {
    setCurrentTab(tabvalue);
    if (tabvalue !== 2) {
      navigation(route);
    }
  };
  // Tab Name - Value
  // Home - 1
  // Filter - 2
  // Booking - 3
  // Profile - 4
  const handleDrawerClose=()=>{
    setCurrentTab(1)
  }
  return (
    <>
      <footer
        className={` fixed bottom-0 h-[15vw] w-full bg-[${colors.primary}] md:hidden block py-[1vw]`}
      >
        <div className="flex items-center justify-between px-[5vw] ">
          <div
            className={`flex flex-col items-center ${
              currentTab === 1 ? "" : " opacity-50"
            }`}
            onClick={() => handleonclick(1, "/")}
          >
            <FaHome
              color={`${currentTab === 1 ? colors.background : "white"} `}
              size={"8vw"}
              className={`shadow-lg shadow-[${colors.background}]`}
            />
            <label
              className={`${
                currentTab === 1
                  ? `text-[${colors.background}] font-extrabold`
                  : "text-white"
              } text-[4vw]`}
            >
              Home
            </label>
          </div>
          <div
            className={`flex flex-col items-center ${
              currentTab === 2 ? "" : " opacity-50"
            }`}
            onClick={() => handleonclick(2, "/")}
          >
            <IoFilter
              color={`${currentTab === 2 ? colors.background : "white"} `}
              size={"8vw"}
            />
            <label
              className={`${
                currentTab === 2
                  ? `text-[${colors.background}] font-extrabold`
                  : "text-white"
              } text-[4vw]`}
            >
              Filter
            </label>
          </div>{" "}
          <div
            className={`flex flex-col items-center ${
              currentTab === 3 ? "" : " opacity-50"
            }`}
            onClick={() => handleonclick(3, "/")}
          >
            <FaTicketAlt
              color={`${currentTab === 3 ? colors.background : "white"} `}
              size={"8vw"}
            />
            <label
              className={`${
                currentTab === 3
                  ? `text-[${colors.background}] font-extrabold`
                  : "text-white"
              } text-[4vw]`}
            >
              Booking
            </label>
          </div>{" "}
          <div
            className={`flex flex-col items-center ${
              currentTab === 4 ? "" : " opacity-50"
            }`}
            onClick={() => handleonclick(4, "/main")}
          >
            <BiSolidUserRectangle
              color={`${currentTab === 4 ? colors.background : "white"} `}
              size={"8vw"}
            />
            <label
              className={`${
                currentTab === 4
                  ? `text-[${colors.background}] font-extrabold`
                  : "text-white"
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
        // title={<p>{selectedButton === "sort" ? "Sort" : "Filter"}</p>}
        placement="bottom"
        width={"100%"}
        // height={drawerHeight}
        style={{
          backgroundColor: "#E5FFF1",
        }}
        open={currentTab === 2 ? true : false}
        onClose={handleDrawerClose}
      >
        {/* {selectedButton === 'sort' && <SortDrawer />} */}
        <SidebarMobile />
        {/* {selectedButton === 'map' && <MapDrawer />} */}
      </Drawer>
    </>
  );
}
