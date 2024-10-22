import React, { useEffect, useState } from "react";
// import { FaBars } from "react-icons/fa"; // Corrected import
import sbus from "../../assets/sbus.png";
import {
  MdKeyboardDoubleArrowDown,
  MdOutlineKeyboardDoubleArrowUp,
} from "react-icons/md";
import menu from "../../assets/menu.png";
import { REARRANGE_ORDER, SEARCH_BUTTON } from "../../Store/type";
import { useDispatch, useSelector } from "react-redux";
import { MdSort } from "react-icons/md";
import { TfiMapAlt } from "react-icons/tfi";
// import filterImg from "../../assets/filter.png";
import { Drawer } from "antd";
// import {  Drawer } from "antd";

import SidebarMobile from "./SidebarMobile";
import { LuSettings2 } from "react-icons/lu";
// import { Googlemap } from "./../Home/GoogleMap";
import { useNavigate } from "react-router-dom";

const Navbar = ({ sidebarToggle, setSidebarToggle }) => {
  // const bus_count = useSelector((state) => state.bus_list);
  const buslist = useSelector((state) => state?.card_detail);

  const [sorting, setSorting] = useState("");
  // const [isSortedByPrice, setIsSortedByPrice] = useState(false);

  console.log(sorting, "sortingsorting");

  const dispatch = useDispatch();

  const menuhandle = () => {
    setSidebarToggle(!sidebarToggle);

    dispatch({
      type: SEARCH_BUTTON,
      payload: false,
    });

    localStorage.setItem("search", false);
  };

  const handleSortingClick = (value) => {
    setSorting(value);
    localStorage.setItem("sort", value);
    console.log(value, "tooovalue");
  };

  // const handleSortingClick = (value) => {
  //   // Update the sorting state
  //   setSorting(value === sorting ? "" : value);

  //   // Clear all previous sorting values from localStorage
  //   localStorage.removeItem("price");
  //   localStorage.removeItem("seats");
  //   localStorage.removeItem("ratings");
  //   localStorage.removeItem("arrivalSort");
  //   localStorage.removeItem("departureSort");

  //   // Store the new sorting value in localStorage
  //   if (value !== sorting) {
  //     localStorage.setItem("sort", value);
  //   }
  // };

  // const [boolean, setBoolean] = useState(false);

  useEffect(() => {
    dispatch({
      type: REARRANGE_ORDER,
      payload: {
        price: sorting === "price" ? "TRUE" : "FALSE",
        seats: sorting === "seats" ? "TRUE" : "FALSE",
        rating: sorting === "ratings" ? "TRUE" : "FALSE",
        arrival: sorting === "arrivalSort" ? "TRUE" : "FALSE",
        depature: sorting === "departureSort" ? "TRUE" : "FALSE",
      },
    });
  }, [sorting, dispatch]);

  const [selectedButton, setSelectedButton] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [drawerHeight, setDrawerHeight] = useState("100%");
  const navigateMap = useNavigate();

  const handleButtonClick = (button) => {
    if (button === "map") {
      setSelectedButton(button);
      navigateMap("/map");
    } else if (button === "filter") {
      setDrawerHeight("50%");
      setSelectedButton(button);
      setIsDrawerOpen(true);
      navigateMap("/dashboard");
    } else {
      setDrawerHeight("100%");
      setSelectedButton(button);
      setIsDrawerOpen(true);
      navigateMap("/dashboard");
    }
  };

  const handleDrawerClose = (button) => {
    setIsDrawerOpen(false);
    setSelectedButton(null);
  };
  // console.log(buslist.length, "buslistbuslist");

  return (
    <>
      <div
        className="bg-[#E5FFF1] justify-between  mt-[0.2vw] py-[0.3vw] h-full  flex "
        // style={{
        //   zIndex: 1,
        // }}
      >
        <div className=" h-full w-[60%] flex gap-[1.5vw] items-center ">
          {/* <FaBars
            className="text-black me-4 cursor-pointer"
            onClick={() => setSidebarToggle(!sidebarToggle)}
          /> */}

          {/* <div className="bg-white px-4 py-[1px] border-2 items-center justify-center border-gray-300 rounded-md"> */}
          <p
            className={`text-[#1F487C] font-bold text-[0.9vw] text-center ${
              sidebarToggle ? "" : "ml-[0.8vw]"
            }`}
          >
            Sort By :
          </p>
          {/* </div> */}
          <button
            className={`
    ${sorting === "price" ? "bg-[#1F487C] " : "bg-white border-gray-300 "}  
    py-[0.1vw] border-[0.1vw] rounded-[0.4vw] px-[0.5vw] `}
            onClick={() => {
              const newValue = sorting === "price" ? "" : "price";
              setSorting(newValue);
              handleSortingClick(newValue);
            }}
          >
            <span className="flex justify-center items-center">
              <p
                className={`
        ${sorting === "price" ? "text-white" : "text-[#1F487C]"}  
        text-[0.9vw] font-bold
      `}
              >
                {sorting === "price" ? "Price - Low to High " : "Price"}
              </p>
              {sorting === "price" && (
                <span>
                  <MdKeyboardDoubleArrowDown
                    color="white"
                    size={"1vw"}
                    className="font-bold"
                  />
                </span>
              )}
            </span>
          </button>

          <button
            className={`${
              sorting === "seats" ? "bg-[#1F487C] " : "bg-white border-gray-300"
            } px-[0.5vw]  py-[0.1vw] border-[0.1vw]  rounded-[0.4vw]`}
            onClick={() => {
              const newValue = sorting === "seats" ? "" : "seats";
              setSorting(newValue);
              handleSortingClick(newValue);
            }}
          >
            <span className="flex items-center justify-center">
              <p
                className={`${
                  sorting === "seats" ? "text-white" : "text-[#1F487C]"
                }  text-[0.9vw]  font-bold `}
              >
                {sorting === "seats"
                  ? "Seats Left - High to Low"
                  : "Seats Left"}
              </p>
              {sorting === "seats" ? (
                <span>
                  <MdOutlineKeyboardDoubleArrowUp
                    color="white"
                    size={"1vw"}
                    className="font-bold"
                  />
                </span>
              ) : (
                ""
              )}
            </span>
          </button>
          <button
            className={`${
              sorting === "ratings"
                ? "bg-[#1F487C] "
                : "bg-white border-gray-300"
            } px-[0.5vw] py-[0.1vw] border-[0.1vw] rounded-[0.4vw]`}
            onClick={() => {
              const newValue = sorting === "ratings" ? "" : "ratings";
              setSorting(newValue);
              handleSortingClick(newValue);
            }}
          >
            <span className="flex items-center justify-center">
              <p
                className={`${
                  sorting === "ratings" ? "text-white" : "text-[#1F487C]"
                }  text-[0.9vw]  font-bold `}
              >
                {sorting === "ratings" ? "Ratings - High to Low" : "Ratings"}
              </p>
              {sorting === "ratings" ? (
                <span>
                  <MdOutlineKeyboardDoubleArrowUp
                    color="white"
                    size={"1vw"}
                    className="font-bold"
                  />
                </span>
              ) : (
                ""
              )}
            </span>
          </button>
          <button
            className={`${
              sorting === "departureSort"
                ? "bg-[#1F487C]  "
                : "bg-white border-gray-300"
            } px-[0.5vw] py-[0.1vw] border-[0.1vw] rounded-[0.4vw]`}
            onClick={() => {
              const newValue =
                sorting === "departureSort" ? "" : "departureSort";
              setSorting(newValue);
              handleSortingClick(newValue);
            }}
          >
            <span className="flex items-center justify-center">
              <p
                className={`${
                  sorting === "departureSort" ? "text-white" : "text-[#1F487C]"
                }  text-[0.9vw]  font-bold `}
              >
                {sorting === "departureSort"
                  ? " Early Departure"
                  : "Departure Time"}
              </p>
              {sorting === "departureSort" ? (
                <span>
                  <MdOutlineKeyboardDoubleArrowUp
                    color="white"
                    size={"1vw"}
                    className="font-bold"
                  />
                </span>
              ) : (
                ""
              )}
            </span>
          </button>
          <button
            className={`${
              sorting === "arrivalSort"
                ? "bg-[#1F487C] "
                : "bg-white  border-gray-300"
            }  py-[0.1vw] border-[0.1vw] px-[0.5vw]  rounded-[0.4vw] `}
            onClick={() => {
              const newValue = sorting === "arrivalSort" ? "" : "arrivalSort";
              setSorting(newValue);
              handleSortingClick(newValue);
            }}
          >
            <span className="flex items-center justify-center">
              <p
                className={`${
                  sorting === "arrivalSort" ? "text-white" : "text-[#1F487C]"
                }  text-[0.9vw]  font-bold `}
              >
                {sorting === "arrivalSort" ? "Early Arrival" : "Arrival Time"}
              </p>
              {sorting === "arrivalSort" ? (
                <span>
                  <MdOutlineKeyboardDoubleArrowUp
                    color="white"
                    size={"1vw"}
                    className="font-bold"
                  />
                </span>
              ) : (
                ""
              )}
            </span>
          </button>
        </div>

        <div
          // className={`flex ${
          //   sidebarToggle
          //     ? "absolute right-[0.8vw] top-[0.5vw]"
          //     : "absolute left-[64.5vw] top-[0.2vw]"
          // } items-center `}
          className="flex w-[22%] "
        >
          <img
            src={sbus}
            className="w-[1.4vw] h-[1.5vw] mr-[0.5vw]"
            alt="sbus"
          />
          <span className="text-[#1F487C] font-bold  text-[1vw]  px-[0.1vw] flex items-center">
            <span className="pr-[0.4vw]">Showing</span>
            <div className="w-[1.7vw] h-[1.7vw] bg-[#1F487C] text-white mr-[0.4vw] items-center flex justify-center rounded-full">
              <span className=" text-[1vw] font-extrabold ">
                {buslist?.length}
              </span>
            </div>
            <span className="text-[1vw]">Buses On this route</span>
            {/* {`Showing ${bus_count?.length} Buses On this route`} */}
          </span>
        </div>
      </div>

      {/* <----------------------mobileview----------------------> */}
      {/* <div className="bg-[#E5FFF1] grid grid-cols-12 py-[1vw] h-full w-full relative md:hidden block">
        <div className="col-span-7 pb-[1vw] pt-[1vw] h-full w-full flex gap-[1.5vw] ml-[1vw]">
          <button
            className={`px-[1vw] w-[18.5vw] py-[0.3vw] border-[0.1vw]  rounded-md
            ${
              selectedButton === "filter"
                ? "bg-[#1F487C]"
                : "bg-white border-gray-300"
            }`}
            onClick={() => handleButtonClick("filter")}
          >
            <span className="flex justify-center">
              <span>
                {" "}
                <LuSettings2
                  className="h-[5.5vw] w-[5.5vw] pt-[1vw]"
                  color={selectedButton === "filter" ? "#FFFFFF" : "#1F487C"}
                />{" "}
              </span>
              <span>
                {" "}
                <p
                  className={`text-[4.5vw] pl-[1vw] pr-[1vw] font-bold ${
                    selectedButton === "filter"
                      ? "text-white"
                      : "text-[#1F487C]"
                  }`}
                >
                  Filter
                </p>
              </span>
              {selectedButton === "filter"}
            </span>
          </button>
          <button
            className={`py-[0.3vw] border-[0.1vw] rounded-md w-[17.5vw]  
            ${
              selectedButton === "sort"
                ? "bg-[#1F487C]"
                : "bg-white border-gray-300"
            }`}
            onClick={() => handleButtonClick("sort")}
          >
            <span className="flex">
              <span className="">
                <MdSort
                  className="h-[6vw] w-[6vw]"
                  color={selectedButton === "sort" ? "#FFFFFF" : "#1F487C"}
                />{" "}
              </span>
              <span>
                <p
                  className={`text-[4.5vw] pl-[1vw] font-bold ${
                    selectedButton === "sort" ? "text-white" : "text-[#1F487C]"
                  } `}
                >
                  {" "}
                  Sort{" "}
                </p>
              </span>
            </span>
            {selectedButton === "sort"}
          </button>

          <button
            className={`py-[0.3vw] border-[0.1vw] rounded-md w-[18vw] px-[1vw] ${
              selectedButton === "map"
                ? "bg-[#1F487C]"
                : "bg-white border-gray-300"
            }`}
            onClick={() => handleButtonClick("map")}
          >
            <span className="flex justify-center">
              <span className="pt-[0.5vw]">
                <TfiMapAlt
                  className="h-[5.5vw] w-[5.5vw]"
                  color={selectedButton === "map" ? "#FFFFFF" : "#1F487C"}
                />
              </span>
              <span>
                <p
                  className={`text-[#1F487C] text-[4.5vw] pl-[1.5vw] font-bold ${
                    selectedButton === "map" ? "text-white" : "text-[#1F487C]"
                  } `}
                >
                  Map
                </p>
              </span>
              {selectedButton === "map"}
            </span>
          </button>
        </div>

        <div className="col-span-5">
          <div className="absolute top-[2.5vw] ml-[5vw]">
            <span className="text-[#1F487C] font-bold text-[3.8vw] flex items-center">
              <span>
                <img src={sbus} className="w-[5.2vw] h-[5.5vw]" alt="sbus" />
              </span>
              <span className="pl-[1.5vw]">Showing</span>
              <span className="text-[3.8vw] pl-[0.8vw] font-extrabold">
                {buslist?.length}
              </span>
              <span className="pl-[0.8vw]">Buses </span>
            </span>
          </div>
        </div>
      </div> */}

      <Drawer
        closable
        destroyOnClose
        title={<p>{selectedButton === "sort" ? "Sort" : "Filter"}</p>}
        placement="bottom"
        width={"100%"}
        height={drawerHeight}
        style={{
          backgroundColor: "#E5FFF1",
        }}
        open={isDrawerOpen}
        onClose={handleDrawerClose}
      >
        {/* {selectedButton === 'sort' && <SortDrawer />} */}
        {selectedButton === "filter" && <SidebarMobile />}
        {/* {selectedButton === 'map' && <MapDrawer />} */}
      </Drawer>
    </>
  );
};

export default Navbar;
