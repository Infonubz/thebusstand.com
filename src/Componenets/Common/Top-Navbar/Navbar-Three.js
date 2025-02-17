import React, { useEffect, useState } from "react";
// import { FaBars } from "react-icons/fa"; // Corrected import
import sbus from "../../../Assets/Navabr-Three/sbus.png";
import {
  MdKeyboardDoubleArrowDown,
  MdOutlineKeyboardDoubleArrowUp,
} from "react-icons/md";
//import menu from "../../assets/menu.png";
// import { REARRANGE_ORDER,
//   // SEARCH_BUTTON
// } from "../..";
import { useDispatch, useSelector } from "react-redux";
//import { MdSort } from "react-icons/md";
//import { TfiMapAlt } from "react-icons/tfi";
// import filterImg from "../../assets/filter.png";
import { Drawer } from "antd";
import SidebarMobile from "../Sidebar-Filter/Sidebar-Mobile";
// import {  Drawer } from "antd";

//import { LuSettings2 } from "react-icons/lu";
// import { Googlemap } from "./../Home/GoogleMap";
//import { useNavigate } from "react-router-dom";

const Navbar_Three = ({ sidebarToggle, setSidebarToggle }) => {
  // const bus_count = useSelector((state) => state.bus_list);
  const buslist = useSelector((state) => state?.get_buslist);
  const buslistFilter = useSelector((state) => state?.get_buslist_filter);
  const [selectedButton, setSelectedButton] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  // const [drawerHeight, setDrawerHeight] = useState("100%");
  //const navigateMap = useNavigate();

  // const [isSortedByPrice, setIsSortedByPrice] = useState(false);

  const dispatch = useDispatch();
  const [sortList, setSortList] = useState({
    price: null,
    seats: null,
    departure: null,
    arrival: null,
  });

  const sortingFields = ["price", "seats", "departure", "arrival"];
  // const menuhandle = () => {
  //   setSidebarToggle(!sidebarToggle);

  //   dispatch({
  //     type: SEARCH_BUTTON,
  //     payload: false,
  //   });

  //   localStorage.setItem("search", false);
  // };

  // const handleButtonClick = (button) => {
  //   if (button === "map") {
  //     setSelectedButton(button);
  //     navigateMap("/map");
  //   } else if (button === "filter") {
  //     setDrawerHeight("50%");
  //     setSelectedButton(button);
  //     setIsDrawerOpen(true);
  //     navigateMap("/dashboard");
  //   } else {
  //     setDrawerHeight("100%");
  //     setSelectedButton(button);
  //     setIsDrawerOpen(true);
  //     navigateMap("/dashboard");
  //   }
  // };

  const convertTo24Hour = (timeString) => {
    if (!timeString) return "1970-01-01 00:00"; // Default to prevent errors
    return new Date(`1970-01-01 ${timeString}`);
  };

  const handleDrawerClose = (button) => {
    setIsDrawerOpen(false);
    setSelectedButton(null);
  };
  // console.log(buslist.length, "buslistbuslist");

  const handleSortingClick = (type) => {
    setSortList((prevState) => {
      const newSortOrder =
        prevState[type] === null
          ? true
          : prevState[type] === true
            ? false
            : null;

      return sortingFields.reduce(
        (acc, field) => ({
          ...acc,
          [field]: field === type ? newSortOrder : null, // Reset others
        }),
        {}
      );
    });
  };

  const handleSorting = (type) => {
    let sortedList = [...buslistFilter];

    sortedList?.sort((a, b) => {
      const keyMap = {
        price: (item) => item?.Fare,
        departure: (item) => convertTo24Hour(item?.Start_time),
        arrival: (item) => convertTo24Hour(item?.Arr_Time),
      };
      // For seats: descending first, then ascending
      if (type === "seats") {
        return sortList[type]
          ? b.available_seats - a.available_seats // Ascending order
          : a.available_seats - b.available_seats; // Descending order first
      }
      return sortList[type]
        ? keyMap[type](a) - keyMap[type](b) // Ascending order
        : keyMap[type](b) - keyMap[type](a); // Descending order
    });

    dispatch({ type: "GET_BUS_FILTERS", payload: sortedList });
    console.log(`Sorted by ${type}:`, sortedList);
  };

  // const getButtonLabel = (type) => {
  //   const labels = {
  //     price:
  //       sortList.price === null
  //         ? "Price"
  //         : sortList.price
  //         ? "Price - Low to High"
  //         : "Price - High to Low",
  //     seats:
  //       sortList.seats === null
  //         ? "Seats Left"
  //         : sortList.seats
  //         ? "Seats Left - High to Low"
  //         : "Seats Left - Low to High",
  //     departure:
  //       sortList.departure === null
  //         ? "Departure Time"
  //         : sortList.departure
  //         ? "Early Departure"
  //         : "Departure",
  //     arrival:
  //       sortList.arrival === null
  //         ? "Arrival Time"
  //         : sortList.arrival
  //         ? "Early Arrival"
  //         : " Arrival",
  //   };
  //   return labels[type];
  // };

  const getSortingIcon = (type) => {
    if (sortList[type] === null) return null; // No icon when sorting is inactive
    return sortList[type] ? (
      <MdKeyboardDoubleArrowDown color="white" size={"1vw"} />
    ) : (
      <MdOutlineKeyboardDoubleArrowUp color="white" size={"1vw"} />
    );
  };

  // Trigger sorting when sortList updates
  useEffect(() => {
    const activeSortType = sortingFields.find(
      (field) => sortList[field] !== null
    );
    if (activeSortType) {
      handleSorting(activeSortType);
    } else {
      dispatch({ type: "GET_BUS_LIST", payload: buslist }); // Reset sorting
    }
  }, [sortList]);

  return (
    <>
      <div
        className="bg-[#E5FFF1] justify-between z-10 mt-[0.32vw] py-[0.3vw] h-full  flex " >
        <div className=" h-full w-[60%] flex gap-[1.5vw] items-center ">
          {/* <FaBars
            className="text-black me-4 cursor-pointer"
            onClick={() => setSidebarToggle(!sidebarToggle)}
          /> */}

          {/* <div className="bg-white px-4 py-[1px] border-2 items-center justify-center border-gray-300 rounded-md"> */}
          <p
            className={`text-[#1F487C] font-bold text-[0.9vw] text-center ${sidebarToggle ? "" : "ml-[0.8vw]"
              }`}
          >
            Sort By :
          </p>
          <button
            className={`${sortList.price !== null
              ? "bg-[#1F487C] text-white"
              : "bg-white border-gray-300 text-[#1F487C]"
              } px-[0.5vw] py-[0.1vw] border-[0.1vw] rounded-[0.4vw]`}
            onClick={() => handleSortingClick("price")}
          >
            <span className="flex items-center justify-center gap-1">
              <p className="text-[0.9vw] font-bold">
                {/* {getButtonLabel("price")} */} Price
              </p>
              {getSortingIcon("price")}
            </span>
          </button>
          <button
            className={`${sortList.seats !== null
              ? "bg-[#1F487C] text-white"
              : "bg-white border-gray-300 text-[#1F487C]"
              } px-[0.5vw] py-[0.1vw] border-[0.1vw] rounded-[0.4vw]`}
            onClick={() => handleSortingClick("seats")}
          >
            <span className="flex items-center justify-center gap-1">
              <p className="text-[0.9vw] font-bold">
                {/* {getButtonLabel("seats")} */} Seats Left
              </p>
              {/* {sortList?.seats ? (
                <MdKeyboardDoubleArrowDown color="white" size={"1vw"} />
              ) : (
                <MdOutlineKeyboardDoubleArrowUp color="white" size={"1vw"} />
              )} */}
              {getSortingIcon("seats")}
            </span>
          </button>
          <button
            className={`${sortList.departure !== null
              ? "bg-[#1F487C] text-white"
              : "bg-white border-gray-300 text-[#1F487C]"
              } px-[0.5vw] py-[0.1vw] border-[0.1vw] rounded-[0.4vw]`}
            onClick={() => handleSortingClick("departure")}
          >
            <span className="flex items-center justify-center gap-1">
              <p className="text-[0.9vw] font-bold">
                {/* {getButtonLabel("departure")} */} Departure Time
              </p>
              {getSortingIcon("departure")}
            </span>
          </button>
          <button
            className={`${sortList.arrival !== null
              ? "bg-[#1F487C] text-white"
              : "bg-white border-gray-300 text-[#1F487C]"
              } px-[0.5vw] py-[0.1vw] border-[0.1vw] rounded-[0.4vw]`}
            onClick={() => handleSortingClick("arrival")}
          >
            <span className="flex items-center justify-center gap-1">
              <p className="text-[0.9vw] font-bold">
                {/* {getButtonLabel("arrival")} */} Arrival Time
              </p>
              {getSortingIcon("arrival")}
            </span>
          </button>
          {/* </div> */}
        </div>

        <div
          // className={`flex ${
          //   sidebarToggle
          //     ? "absolute right-[0.8vw] top-[0.5vw]"
          //     : "absolute left-[64.5vw] top-[0.2vw]"
          // } items-center `}
          className="flex w-[22%] "
        >
          <div className=" flex items-center justify-center">
            <img
              src={sbus}
              className="w-[1.4vw] h-[1.5vw] mr-[0.5vw]"
              alt="sbus"
            />
          </div>

          <span className="text-[#1F487C] font-bold  text-[1vw]  px-[0.1vw] flex items-center">
            <span className="pr-[0.4vw]">Showing</span>
            <div className="w-[1.7vw] h-[1.7vw] bg-[#1F487C] text-white mr-[0.4vw] items-center flex justify-center rounded-full">
              <span className=" text-[1vw] font-extrabold ">
                {buslistFilter?.length}
              </span>
            </div>
            <span className="text-[1vw]">Buses on This Route</span>
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
        // height={drawerHeight}
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

export default Navbar_Three;
