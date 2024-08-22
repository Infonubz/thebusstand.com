import React, { useEffect, useState } from "react";
import { FaBars } from "react-icons/fa"; // Corrected import
import sbus from "../../assets/sbus.png";
import { MdOutlineKeyboardDoubleArrowUp } from "react-icons/md";
import menu from "../../assets/menu.png";
import { REARRANGE_ORDER, SEARCH_BUTTON } from "../../Store/type";
import { useDispatch, useSelector } from "react-redux";
import { MdSort } from "react-icons/md";
import { TfiMapAlt } from "react-icons/tfi";
import filterImg from "../../assets/filter.png";
import { Button, Drawer } from "antd";
import SidebarMobile from "./SidebarMobile";
import { LuSettings2 } from "react-icons/lu"
import { Googlemap } from "./../Home/GoogleMap"
import { useNavigate } from 'react-router-dom';

const Navbar = ({ sidebarToggle, setSidebarToggle }) => {
  const bus_count = useSelector((state) => state.bus_list);
  const [sorting, setSorting] = useState("");
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
  const [boolean, setBoolean] = useState(false);
  useEffect(() => {
    dispatch({
      type: REARRANGE_ORDER,
      payload: {
        price: sorting == "price" ? "TRUE" : "FALSE",
        seats: sorting == "seats" ? "TRUE" : "FALSE",
        rating: sorting == "ratings" ? "TRUE" : "FALSE",
        arrival: sorting == "arrival" ? "TRUE" : "FALSE",
        depature: sorting == "departure" ? "TRUE" : "FALSE",
      },
    });
  }, [sorting]);

  const [selectedButton, setSelectedButton] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [drawerHeight, setDrawerHeight] = useState("100%");
  const navigateMap = useNavigate();

  const handleButtonClick = (button) => {
    if (button === 'map') {
      setSelectedButton(button);
      navigateMap('/map'); 
    } 
    else if (button === 'filter') {
      setDrawerHeight("50%");
      setSelectedButton(button);
      setIsDrawerOpen(true);
      navigateMap('/dashboard'); 
    }
    else {
      setDrawerHeight("100%");
      setSelectedButton(button);
      setIsDrawerOpen(true);
      navigateMap('/dashboard'); 
    }
  }; 
  


  const handleDrawerClose = (button) =>{
    setIsDrawerOpen(false);
    setSelectedButton(null);
  }

  return (
    <>
      <div
        className="bg-[#E5FFF1] grid grid-cols-12  py-[0.3vw] h-full w-full relative md:block hidden"
        // style={{
        //   zIndex: 1,
        // }}
      >
        <div className="col-span-6  h-full w-full flex gap-[1.5vw] items-center ">
          {/* <FaBars
            className="text-black me-4 cursor-pointer"
            onClick={() => setSidebarToggle(!sidebarToggle)}
          /> */}
          {sidebarToggle ? (
            <button
              className={`border-gray-300 bg-white px-[0.5vw] py-[0.1vw] border-y-2 border-r-[0.1vw] rounded-r-md`}
              onClick={menuhandle}
            >
              <img src={menu} className="w-[1.2vw] h-[1vw]" />
            </button>
          ) : (
            ""
          )}
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
    py-[0.1vw] border-[0.1vw] rounded-[0.4vw]
    w-[4.5vw]  
  `}
            onClick={() => {
              setSorting(sorting === "price" ? "" : "price");
            }}
          >
            <span className="flex justify-center items-center">
              <p
                className={`
        ${sorting === "price" ? "text-white" : "text-[#1F487C]"}  
        text-[0.9vw] font-bold
      `}
              >
                Price
              </p>
              {sorting === "price" ? (
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
              sorting == "seats" ? "bg-[#1F487C] " : "bg-white border-gray-300"
            } px-[0.5vw] w-[4.5vw] py-[0.1vw] border-[0.1vw]  rounded-[0.4vw]`}
            onClick={() => {
              setSorting(sorting === "seats" ? "" : "seats");
            }}
          >
            <span className="flex items-center justify-center">
              <p
                className={`${
                  sorting == "seats" ? "text-white" : "text-[#1F487C]"
                }  text-[0.9vw]  font-bold `}
              >
                Seats
              </p>
              {sorting == "seats" ? (
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
              sorting == "ratings"
                ? "bg-[#1F487C] "
                : "bg-white border-gray-300"
            } px-[0.2vw] py-[0.1vw] border-[0.1vw]  rounded-[0.4vw] w-[4.5vw]`}
            onClick={() => {
              setSorting(sorting === "ratings" ? "" : "ratings");
            }}
          >
            <span className="flex items-center justify-center">
              <p
                className={`${
                  sorting == "ratings" ? "text-white" : "text-[#1F487C]"
                }  text-[0.9vw]  font-bold `}
              >
                Ratings
              </p>
              {sorting == "ratings" ? (
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
              sorting == "arrival"
                ? "bg-[#1F487C] "
                : "bg-white  border-gray-300"
            }  py-[0.1vw] border-[0.1vw]  rounded-[0.4vw] w-[6.5vw]`}
            onClick={() => {
              setSorting(sorting === "arrival" ? "" : "arrival");
            }}
          >
            <span className="flex items-center justify-center">
              <p
                className={`${
                  sorting == "arrival" ? "text-white" : "text-[#1F487C]"
                }  text-[0.9vw]  font-bold `}
              >
                Arrival Time
              </p>
              {sorting == "arrival" ? (
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
              sorting == "departure"
                ? "bg-[#1F487C]  "
                : "bg-white border-gray-300"
            } w-[8vw] py-[0.1vw] border-[0.1vw] rounded-[0.4vw]`}
            onClick={() => {
              setSorting(sorting === "departure" ? "" : "departure");
            }}
          >
            <span className="flex items-center justify-center">
              <p
                className={`${
                  sorting == "departure" ? "text-white" : "text-[#1F487C]"
                }  text-[0.9vw]  font-bold `}
              >
                Departure Time
              </p>
              {sorting == "departure" ? (
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
        <div className={`${sidebarToggle ? "col-span-4" : "col-span-2"}`}></div>
        <div className={`${sidebarToggle ? "col-span-2 " : "col-span-4 "}`}>
          <div
            className={`flex ${
              sidebarToggle
                ? "absolute right-[0.8vw] top-[0.5vw]"
                : "absolute left-[68vw] top-[0.5vw]"
            } items-center `}
          >
            <img src={sbus} className="w-[1.4vw] h-[1.5vw] mr-[0.5vw]" />
            <span className="text-[#1F487C] font-bold  text-[0.8vw]  px-[0.1vw] flex items-center">
              <span className="pr-[0.2vw]">Showing</span>
              <span className="pr-[0.2vw] text-[1vw] font-extrabold">{bus_count?.length}</span>
              <span>Buses On this route</span>
              {/* {`Showing ${bus_count?.length} Buses On this route`} */}
            </span>
          </div>
        </div>
      </div>


      <div
        className="bg-[#E5FFF1] grid grid-cols-12 py-[1vw] h-full w-full relative md:hidden block" >
        <div className="col-span-7 pb-[1vw] pt-[1vw] h-full w-full flex gap-[1.5vw] ml-[1vw]">
          <button
            className={`py-[0.3vw] border-[0.1vw] rounded-md w-[17.5vw]  
            ${
              selectedButton === 'sort' ? 'bg-[#1F487C]' : 'bg-white border-gray-300'
            }`}
            onClick={() => handleButtonClick('sort')}
          >
            <span className="flex">
              <span className=""> 
              <MdSort className="h-[6vw] w-[6vw]" color={selectedButton === 'sort' ? '#FFFFFF' : '#1F487C'} /> </span>
            <span><p className={`text-[4.5vw] pl-[1vw] font-bold ${selectedButton === 'sort' ? 'text-white' : 'text-[#1F487C]'} `} >  Sort </p></span> 
            </span>
            {selectedButton === 'sort' 
            // && (
            //   <span>
            //     <MdOutlineKeyboardDoubleArrowUp color="white" size={"1vw"} className="font-bold" />
            //   </span> )
              }
          </button>

          <button
            className={`px-[1vw] w-[18.5vw] py-[0.3vw] border-[0.1vw]  rounded-md
            ${
              selectedButton === 'filter' ? 'bg-[#1F487C]' : 'bg-white border-gray-300'
            }`}
            onClick={() => handleButtonClick('filter')}
          >
            <span className="flex justify-center">
              <span> <LuSettings2 className="h-[5.5vw] w-[5.5vw] pt-[1vw]" color={selectedButton === 'filter' ? '#FFFFFF' : '#1F487C'} /> </span>
              <span> <p
                className={`text-[4.5vw] pl-[1vw] pr-[1vw] font-bold ${selectedButton === 'filter' ? 'text-white' : 'text-[#1F487C]'}`}
              >
                Filter
              </p></span>
              {selectedButton === 'filter' 
              // && (
              // <span>
              //   <MdOutlineKeyboardDoubleArrowUp color="white" className="font-bold" />
              // </span> )
            }
            </span>
          </button>
          <button
            className={`py-[0.3vw] border-[0.1vw] rounded-md w-[18vw] px-[1vw] ${
              selectedButton === 'map' ? 'bg-[#1F487C]' : 'bg-white border-gray-300'
            }`}
            onClick={() => handleButtonClick('map')}
          >
            <span className="flex justify-center">
              <span className="pt-[0.5vw]">
                <TfiMapAlt className="h-[5.5vw] w-[5.5vw]" color={selectedButton === 'map' ? '#FFFFFF' : '#1F487C'} /></span>
              <span> 
                <p className= {`text-[#1F487C] text-[4.5vw] pl-[1.5vw] font-bold ${selectedButton === 'map' ? 'text-white' : 'text-[#1F487C]'} `} >
                Map
              </p>
              </span>
              {selectedButton === 'map' 
            //   && (
            //   <span>
            //     <MdOutlineKeyboardDoubleArrowUp className="font-bold" />
            //   </span>
            // )
            }
            </span>
          </button>
        </div>

        <div className="col-span-5">

          <div className="absolute top-[2.5vw] ml-[5vw]" >
            <span className="text-[#1F487C] font-bold text-[3.8vw] flex items-center">
              <span><img src={sbus} className="w-[5.2vw] h-[5.5vw]" /></span>
              <span className="pl-[1.5vw]">Showing</span>
              <span className="text-[3.8vw] pl-[0.8vw] font-extrabold">{bus_count?.length}</span>
              <span className="pl-[0.8vw]">Buses </span>
              {/* {`Showing ${bus_count?.length} Buses On this route`} */}
            </span>
          </div>
        </div>

      </div>


      <Drawer
        closable
        destroyOnClose
        title={<p>{selectedButton === 'sort' ? 'Sort' : 'Filter'}</p>}
        placement="bottom"
        width={"100%"}
        height={drawerHeight}
        style={{
          backgroundColor: "#E5FFF1"
        }}
        open={isDrawerOpen}
        onClose={handleDrawerClose}
      >
        {/* {selectedButton === 'sort' && <SortDrawer />} */}
        {selectedButton === 'filter' && <SidebarMobile />}
        {/* {selectedButton === 'map' && <MapDrawer />} */}
      </Drawer>

    </>
  );
};

export default Navbar;
