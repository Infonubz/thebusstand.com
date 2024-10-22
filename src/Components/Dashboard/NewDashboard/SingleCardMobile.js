import React, { useEffect, useState } from "react";
//import Promotion from "../../MainComponenet/Promotion";
import backdrop from "../../../assets/backdrop.png";
import { FaAngleRight } from "react-icons/fa6";
import { MdEventSeat } from "react-icons/md";
//import lowprice from "../../../assets/lowprice.png";
import dayjs from "dayjs";
import { Tooltip } from "antd";
import logo from "../../../assets/Operator_logos/161.png";
import {
  // MdAirlineSeatReclineExtra,
  MdStarRate,
} from "react-icons/md";
import { IoPersonSharp } from "react-icons/io5";
// import { MdMyLocation } from "react-icons/md";
import { BiPlug } from "react-icons/bi";
// import { BiSolidBlanket } from "react-icons/bi";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
// import LiveTracking from "./LiveTracking";
import sliver from "../../../assets/Silver_surfer.png";
// import DropPick from "./DropPick";
import { useDispatch, useSelector } from "react-redux";
import SINGLECARD_BG from "../../../assets/SINGLECARD_BG.png";

import { LoadingOutlined } from "@ant-design/icons";
import { Spin, Space } from "antd";
//import { BsPlug } from "react-icons/bs";
import { BiSolidBlanket, BiCctv } from "react-icons/bi";
// import { PiWifiMedium } from "react-icons/pi";
// import { FaBottleWater, FaFirstAid } from "react-icons/fa";
// import { IoTicketOutline } from "react-icons/io5";
// import { MdOutlineLight } from "react-icons/md";
// import { GiWaterBottle } from "react-icons/gi";
import { MdMyLocation } from "react-icons/md";
import OurLowPrice from "../../../assets/OurLowPrice.png";
//import DashboardMobile from "../../Dashboard/DashboardMobile";
import { SendTravelDetails } from "../../../Api/Dashboard/Dashboard";
import Policy from "../Policy";
import LiveTracking from "../LiveTracking";
import DropPick from "../DropPick";
//import { createMemoryRouter } from "react-router";
import Advertisement from "../../Advertisement/Ads";
import thread from "../../../assets/thread.png";
import BusSeatsLayout from "../BusSeatsLayout/BusSeatsLayout";
import BottomNavbar from "../../MobileView/BottomNavbar";
import MobileFilterNavbar from "./MobileFilterNavbar";

const SingleCardMobile = ({ isluxury }) => {
  const [dropDown, setDropDown] = useState(null);
  const [trackingCount, setTrackingCount] = useState();
  const buslist = useSelector((state) => state?.card_detail);
  const [spinner, setSpinner] = useState("false");
  const dispatch = useDispatch();

  // const buslist = useSelector((state) => state?.card_detail);
  // const buslist = useSelector((state)=>state?.card_detail)
  // console.log(buslist, "buslistbuslist");

  const toggleDropDown = (index) => {
    setDropDown(dropDown === index ? null : index);
  };

  setTimeout(() => {
    setSpinner("false");
    console.log("cleartiemout", 2);
  }, 2000);

  useEffect(() => {
    window.scrollTo(0, 0);
    sessionStorage.setItem("tab", 2);
  }, []);

  useEffect(() => {
    SendTravelDetails(
      dispatch,
      localStorage.getItem("departure"),
      localStorage.getItem("arrival")
    );
  }, []);

  useEffect(() => {
    setSpinner(sessionStorage.getItem("loading"));
  }, [sessionStorage.getItem("loading")]);

  console.log(buslist, "buslistbuslist");
  console.log(trackingCount, "trackingCounttrackingCount");
  console.log(trackingCount, "logloglog");

  return (
    <>
      <div className="relative ">
        <div className="absolute top-0 w-full bg-[#E5FFF1] min-h-screen max-h-auto  px-[0.5vw] ">
          {/* <Promotion /> */}
          <Advertisement />
          <MobileFilterNavbar />
          <div className="mb-[16vw]">
            {spinner == true ? (
              <div
                className=""
                style={{
                  position: "fixed",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  background: "rgba(0, 0, 0, 0.2)",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  opacity: "50px",
                  zIndex: 1000,
                }}
              >
                <Space align="center" size="middle">
                  <Spin
                    indicator={
                      <LoadingOutlined style={{ fontSize: 48 }} spin />
                    }
                  />
                </Space>
              </div>
            ) : (
              <>
                {buslist?.length > 0 &&
                  buslist?.map((item, index) => (
                    <div
                      // className={`bg-white ${dropDown === `liveTracking${index}` ||
                      //   dropDown === `policy${index}`
                      //   ? "h-auto"
                      //   : "h-[15vw]" || dropDown === `droppick${index}`
                      //     ? "h-auto"
                      //     : "h-[15vw]"
                      //   } w-full mt-[0.5vw] flex-col rounded-[1vw] `}

                      className={`
                    ${
                      item.bus_type_status === "luxury"
                        ? "luxury-card"
                        : "bg-white"
                    }  ${
                        dropDown === `liveTracking${index}` ||
                        dropDown === `policy${index}`
                          ? "h-auto"
                          : "h-[13vw]" || dropDown === `droppick${index}`
                          ? "h-auto"
                          : "h-[13vw]"
                      } w-full mt-[0.5vw] flex-col rounded-[1.5vw] border-[0.15vw] border-[#C9C9C9] `}
                      key={index}
                      style={{
                        backgroundImage: `linear-gradient(to right, #F8C550, #FFEB76, #FFE173), url(${SINGLECARD_BG})`,
                        backgroundBlendMode: "overlay", // Add this line to blend the color and image
                        zIndex: 2,
                      }}
                    >
                      <div className="flex flex-col gap-y-[3.5vw]">
                        <div className="grid grid-cols-7">
                          <div className=" col-span-5 relative  h-full w-full ">
                            <div className="">
                              <img
                                src={
                                  item.bus_type_status === "luxury"
                                    ? sliver
                                    : backdrop
                                }
                                className="h-[10vw] w-full"
                              />
                              <div className="absolute top-[0.25vw] right-[11vw] rounded-full">
                                <img
                                  src={logo}
                                  className="w-[7vw] h-[7vw] rounded-full"
                                />
                              </div>
                              <label
                                // className="text-white text-[2.5vw] absolute left-[0.5vw] top-[0.1vw] underline underline-offset-2 underline-white"
                                className={`${
                                  item.bus_type_status === "luxury"
                                    ? "text-black"
                                    : " text-white"
                                } text-[2.5vw] absolute left-[0.5vw] top-[0.1vw] underline underline-offset-2 underline-white`}
                              >
                                Bus Operator
                              </label>
                              <label
                                // className="text-white text-[4vw] tracking-wider font-semibold absolute left-[0.5vw] top-[3.75vw]"
                                className={`${
                                  item.bus_type_status === "luxury"
                                    ? "text-black"
                                    : " text-white"
                                }  text-[4vw] tracking-wider font-semibold absolute left-[0.5vw] top-[3.75vw]`}
                              >
                                {item?.Operator_name}
                                <Tooltip
                                  placement="right"
                                  title={item?.operator_name}
                                  className="cursor-pointer"
                                  color="#1F487C"
                                >
                                  {item?.operator_name.length > 20
                                    ? `${item.operator_name.slice(0, 20)}...`
                                    : item.operator_name}
                                </Tooltip>
                              </label>
                            </div>
                            <div>
                              <div className="row-span-1 text-[#1F487C] text-[3vw] px-[2vw] mt-[0.5vw]">
                                {item.bus_type}
                              </div>
                            </div>
                          </div>
                          <div className="col-span-2">
                            <div className=" flex flex-col py-[1.5vw] justify-center items-center gap-y-[1vw]">
                              <div className="flex gap-[1vw]">
                                <div
                                  // className="text-[#1F487C] text-[3.2vw]"
                                  className={`${
                                    item.bus_type_status === "luxury"
                                      ? "text-black"
                                      : "text-[#1F487C]"
                                  } text-[3.2vw] `}
                                >
                                  {item.seat_availability.avlWindow}
                                </div>
                                <div
                                  //  className="text-[#1F487C] text-[3.2vw] w-full"
                                  className={`${
                                    item.bus_type_status === "luxury"
                                      ? "text-black"
                                      : "text-[#1F487C]"
                                  } text-[3.2vw] w-full`}
                                >
                                  Windows Seat
                                </div>
                              </div>
                              <div className="flex justify-center items-center bg-[#FFC1C180] rounded-full h-[5vw] px-[2vw] gap-[1vw]">
                                <div>
                                  <MdEventSeat color="#C62B2B" size="4vw" />
                                </div>
                                <div className="text-[2.8vw] text-[#C62B2B] font-bold">
                                  {item.seat_availability.avlAll} Seats Left
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-7">
                          <div className="col-span-4 relative">
                            <div className=" absolute top-[-3.25vw] right-0 border-r-[0.5vw] border-[#1F487C66] h-[17.5vw] border-dashed">
                              {" "}
                            </div>
                            <div className="grid grid-cols-4 h-full w-full gap-[2.5vw]">
                              <div className="col-span-1 flex-col flex items-center justify-center">
                                <label
                                  // className="text-[3vw] text-[#868686]"
                                  className={`text-[3vw] ${
                                    item.bus_type_status === "luxury"
                                      ? "text-black"
                                      : "text-[#1F487C]"
                                  } font-semibold opacity-60`}
                                >
                                  {dayjs(item?.departure_date_time).format(
                                    "DD MMM"
                                  )}
                                </label>
                                <label
                                  // className="text-[3.5vw] text-[#1F487C] font-bold"
                                  className={`text-[3.5vw] ${
                                    item.bus_type_status === "luxury"
                                      ? "text-black"
                                      : "text-[#1F487C]"
                                  } font-bold`}
                                >
                                  {dayjs(item?.departure_date_time).format(
                                    "HH:mm"
                                  )}
                                </label>
                              </div>
                              <div className=" col-span-2 h-full relative w-full flex items-center justify-center">
                                <div
                                  // className="bg-[#1F487C] absolute left-[-1vw] h-[3vw] w-[3vw] top-[4vw] rounded-full"
                                  className={`${
                                    item.bus_type_status === "luxury"
                                      ? "bg-black"
                                      : "bg-[#1F487C]"
                                  } absolute left-[-1.4vw] h-[3vw] w-[3vw] top-[3.8vw] rounded-full`}
                                ></div>
                                <div
                                  //  className="border-[#1F487C] border-t-[1vw] absolute left-[3vw] top-[5vw] border-dashed w-[22.5vw]"
                                  className={`${
                                    item.bus_type_status === "luxury"
                                      ? "border-black"
                                      : "border-[#1F487C]"
                                  } border-t-[0.75vw] absolute left-[1.9vw] top-[5vw] border-dashed w-[25vw]`}
                                ></div>
                                <div
                                  // className="bg-[#1F487C] relative h-[6.5vw] flex w-[17vw] rounded-tl-[1.5vw] rounded-tr-[1.5vw] rounded-bl-[0.5vw] rounded-br-[1vw] text-white text-[2.5vw] font-bold justify-center items-center"
                                  className={`${
                                    item.bus_type_status === "luxury"
                                      ? "bg-black"
                                      : "bg-[#1F487C]"
                                  } left-[1vw] relative h-[6vw] flex w-[15vw] rounded-tl-[2.5vw] rounded-tr-[2.5vw] rounded-bl-[1vw] rounded-br-[1vw] text-white text-[2.5vw] font-bold justify-center items-center`}
                                >
                                  {item.time_duration}
                                  <div
                                    className={`${
                                      item.bus_type_status === "luxury"
                                        ? "bg-black"
                                        : "bg-[#1F487C]"
                                    } absolute bottom-[-2vw] left-[2vw] h-[3.75vw] w-[3.75vw] rounded-full flex items-center justify-center`}
                                  >
                                    <div className="bg-white h-[2vw] w-[2vw] rounded-full"></div>
                                  </div>

                                  {/* <div className="absolute top-[6vw] left-[2.9vw] bg-white  h-[1.9vw] w-[1.9vw] rounded-full"></div> */}

                                  <div
                                    className={`${
                                      item.bus_type_status === "luxury"
                                        ? "bg-black"
                                        : "bg-[#1F487C]"
                                    } absolute bottom-[-2vw] right-[2vw] h-[3.75vw] w-[3.75vw] rounded-full flex items-center justify-center`}
                                  >
                                    <div className="bg-white h-[2vw] w-[2vw] rounded-full"></div>
                                  </div>
                                  {/* <div className="absolute top-[6vw] right-[3vw] bg-white  h-[1.9vw] w-[1.9vw] rounded-full"></div> */}
                                </div>
                                <FaAngleRight
                                  // color="#1F487C"
                                  size={"5vw"}
                                  color={`${
                                    item.bus_type_status === "luxury"
                                      ? "black"
                                      : "#1F487C"
                                  }`}
                                  className="absolute right-[-2.7vw] top-[2.8vw]"
                                />
                              </div>
                              <div className="col-span-1 flex-col flex items-center justify-center">
                                <label
                                  // className="text-[3vw] text-[#868686]"
                                  className={`text-[3vw] ${
                                    item.bus_type_status === "luxury"
                                      ? "text-black"
                                      : "text-[#1F487C]"
                                  } font-semibold opacity-60`}
                                >
                                  {dayjs(item?.arrival_date_time).format(
                                    "DD MMM"
                                  )}
                                </label>
                                <label
                                  // className="text-[3.5vw] text-[#1F487C] font-bold"
                                  className={`text-[3.5vw] ${
                                    item.bus_type_status === "luxury"
                                      ? "text-black"
                                      : "text-[#1F487C]"
                                  } font-bold`}
                                >
                                  {dayjs(item?.arrival_date_time).format(
                                    "HH:mm"
                                  )}
                                </label>
                              </div>
                            </div>
                          </div>
                          {/* <div className="col-span-3">
                    <div className="relative">
                      <p className="absolute top-[-4vw] right-[6vw] w-[18vw] text-[3vw] text-[#1F487C]">
                        Starting @
                      </p>
                      <div className="relative flex items-center">
                        <div className="absolute top-[0.5vw] left-[12vw] w-[24vw] h-[8vw] bg-[#1F487C]">
                          <p className=" absolute top-[1.75vw] left-[8vw] font-bold text-[3vw] text-white">
                            ₹ {Math.round(item.lowest_price.price)}
                          </p>
                        </div>
                        <div className="absolute top-[-3vw] left-[10vw] w-[7.5vw] h-[15vw] bg-white rounded-r-full "></div>
                        <div className="absolute top-[-3vw] right-[1vw] w-[7.5vw] h-[15vw] bg-white rounded-l-full flex items-center justify-center "></div>
                        <div className=" absolute top-[-5vw] left-[2vw] w-[16.5vw] h-[16.5vw]">
                          <img src={OurLowPrice} className=" " />
                        </div>
                      </div>
                      <button className="absolute top-[10vw] right-[9.5vw] w-[15vw] h-[5vw] border-[0.3vw] border-dashed border-[#1F487C] text-[#1F487C] text-[2vw] font-semibold rounded-[0.3vw]">
                        Show Seats
                      </button>
                    </div>
                  </div> */}

                          {/* ---------------------------------------------PRICELIST---------------------------------------------------------- */}

                          <div className=" w-[20vw] px-[4vw] flex items-end py-[1vw] absolute right-0  ">
                            <div className="absolute top-[0.5vw] left-[3vw]">
                              <p
                                className={`absolute left-[-5vw] top-[-4.5vw] w-[15vw]  text-[3vw] ${
                                  item.bus_type_status === "luxury"
                                    ? "text-black"
                                    : "text-[#1F487C]"
                                }`}
                              >
                                Starting @
                              </p>
                              {/* <div className="relative flex items-center ">
                            <div className="w-[10vw] h-[3vw] bg-[#1F487C] absolute top-[2vw]">
                              <p className="absolute left-[4.5vw] top-[0.5vw] font-bold text-[1.4vw] text-white">
                                ₹ {Math.round(item.low_price[2])}
                              </p>
                            </div>
                            <div className="w-[3vw] h-[6vw] bg-[red] rounded-r-full flex items-center justify-center relative top-0 left-[-4vw]">
                            </div>
                            <img
                              src={OurLowPrice}
                              className="w-[8vw] h-[8vw] absolute top-[-1vw] left-[0.5vw]"
                            />
                            {/* <div className="w-[9vw] h-[9vw] bg-white rounded-full flex items-center justify-center absolute top-0 right-[-21vw]"></div> */}
                              {/* </div> */}
                              <div className="relative flex items-center">
                                <div
                                  className={`absolute top-[0.8vw] left-[-10vw] w-[24vw] h-[8vw] ${
                                    item.bus_type_status === "luxury"
                                      ? "bg-custom-gradient"
                                      : "clip-trapezoid"
                                  } `}
                                >
                                  <p
                                    className={` absolute top-[1.1vw] left-[6.2vw] font-bold text-[4vw] ${
                                      item.bus_type_status === "luxury"
                                        ? "text-black"
                                        : "text-white"
                                    } `}
                                  >
                                    ₹ {Math.round(item.lowest_price.price)}
                                  </p>
                                  {/* <div
                            className={` absolute right-0 top-[-1vw] -rotate-90 w-0 h-0 border-l-[1vw] border-l-transparent border-r-[1vw] border-r-transparent border-b-[2vw] ${item.bus_type_status === "luxury"
                              ? "border-b-[#FFEB76]"
                              : "border-b-red-800"
                              } `}
                          ></div> */}
                                  <div
                                    className={`absolute right-0 top-[-2.1vw] -rotate-90 w-0 h-0 border-l-[2vw] border-l-transparent border-r-[2vw] border-r-transparent border-b-[4vw] ${
                                      item.bus_type_status === "luxury"
                                        ? "border-b-[#FFEB76]"
                                        : "border-b-white"
                                    }`}
                                  ></div>
                                  <div
                                    className={`absolute right-0 bottom-[-2.1vw] -rotate-90 w-0 h-0 border-l-[2vw] border-l-transparent border-r-[2vw] border-r-transparent border-b-[4vw] ${
                                      item.bus_type_status === "luxury"
                                        ? "border-b-[#FFEB76]"
                                        : "border-b-white"
                                    }`}
                                  ></div>
                                  <div className="bg-[#61B00F] absolute top-1/2 right-0 transform -translate-y-1/2 w-[4vw] h-[3vw] flex items-center justify-center">
                                    <div className="bg-[#2D5C05] w-[2vw] h-[2vw] rounded-full flex items-center justify-center">
                                      <div
                                        className={` ${
                                          item.bus_type_status === "luxury"
                                            ? "bg-[#FFEB76]"
                                            : "bg-white"
                                        } w-[1.2vw] h-[1.2vw] rounded-full`}
                                      ></div>
                                    </div>
                                  </div>
                                  <img
                                    src={thread}
                                    className="w-[10vw] h-[16vw] absolute top-[-7vw] right-[-3vw] "
                                  />
                                </div>
                                {/* <div class="relative w-96 h-36 bg-blue-600 clip-trapezoid"></div> */}

                                <div
                                  className={`absolute top-[-5.5vw] left-[-16.5vw] w-[10vw]  h-[20vw] ${
                                    item.bus_type_status === "luxury"
                                      ? "bg-[#FFEB76]"
                                      : "bg-white"
                                  } rounded-r-full `}
                                ></div>
                                {/* <div className="absolute top-[-1vw] right-[-16vw] w-[4vw] h-[8vw] bg-white rounded-l-full flex items-center justify-center "></div> */}
                                <div className=" absolute top-[-6.5vw] left-[-25vw] w-[20vw] h-[20vw]">
                                  <img src={OurLowPrice} className=" " />
                                </div>
                              </div>
                              <button
                                className="absolute top-[10vw] left-[-6vw] w-[16vw] h-[4vw]  bg-[#61B00F] text-white text-[2.25vw] font-semibold rounded-[0.75vw]"
                                onClick={() => toggleDropDown(`seat${index}`)}
                              >
                                Show Seats
                              </button>
                            </div>
                          </div>

                          {/* ------------------------------------------------------------------------------------------------------ */}
                        </div>
                        <div className="px-[1vw] ">
                          <div className="flex items-center gap-[0.5vw] pt-[2.5vw] pb-[0.5vw]">
                            <div
                              className={`${
                                item.rating >= 4
                                  ? "border-[#61B00F]"
                                  : item.rating >= 2
                                  ? "border-orange-400"
                                  : "border-red-600"
                              } border-[0.1vw] rounded-[0.4vw] flex`}
                            >
                              <div className="h-fit rounded-[0.8vw]">
                                <div
                                  className={` 
                            ${
                              item.rating >= 4
                                ? "bg-[#61B00F]"
                                : item.rating >= 2
                                ? "bg-orange-400"
                                : "bg-red-600"
                            } 
                            flex h-[4vw] items-center rounded-r-none justify-center`}
                                >
                                  <div>
                                    <MdStarRate
                                      size={"3vw"}
                                      style={{
                                        color: "white",
                                        marginLeft: "0.5vw",
                                      }}
                                    />
                                  </div>
                                  <div>
                                    <p className="text-[3vw] font-bold text-white px-[1vw] flex items-center">
                                      {/* {item.rating} */}4
                                    </p>
                                  </div>
                                </div>
                              </div>
                              <div className="h-[4vw] ">
                                <div className="flex items-center justify-center h-full">
                                  <IoPersonSharp
                                    size={"3vw"}
                                    className={`${
                                      item.rating >= 4
                                        ? "text-[#61B00F]"
                                        : item.rating >= 2
                                        ? "text-orange-400"
                                        : "text-red-600"
                                    } ml-[0.5vw]`}
                                  />
                                  <p
                                    className={`text-[3vw] font-bold px-[1vw] ${
                                      item.rating >= 4
                                        ? "text-[#61B00F]"
                                        : item.rating >= 2
                                        ? "text-orange-400"
                                        : "text-red-600"
                                    }`}
                                  >
                                    {/* {`${item.rated_users}`} */}
                                    1.7K
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center justify-center  gap-[3vw] w-full">
                              <div
                                className="flex items-center cursor-pointer gap-[1vw]"
                                onClick={() =>
                                  toggleDropDown(`liveTracking${index}`)
                                }
                              >
                                <div>
                                  <MdMyLocation
                                    size="3vw"
                                    color={`${
                                      item.bus_type_status === "luxury"
                                        ? "black"
                                        : "#1F487C"
                                    }`}
                                  />
                                </div>
                                <div>
                                  <BiPlug
                                    color={`${
                                      item.bus_type_status === "luxury"
                                        ? "black"
                                        : "#1F487C"
                                    }`}
                                    size="3vw "
                                  />
                                </div>
                                <div>
                                  <BiSolidBlanket
                                    color={`${
                                      item.bus_type_status === "luxury"
                                        ? "black"
                                        : "#1F487C"
                                    }`}
                                    size="3vw"
                                  />
                                </div>
                                <div>
                                  <p
                                    // className="text-[3vw] text-[#1F487C]"
                                    className={`text-[3vw]  ${
                                      item.bus_type_status === "luxury"
                                        ? "text-black"
                                        : "text-[#1F487C]"
                                    }`}
                                  >
                                    +{item.amenities.length - 3}
                                  </p>
                                </div>
                                <div>
                                  {dropDown === `liveTracking${index}` ? (
                                    <IoIosArrowUp
                                      color={`${
                                        item.bus_type_status === "luxury"
                                          ? "black"
                                          : "#1F487C"
                                      }`}
                                      size="3vw"
                                    />
                                  ) : (
                                    <IoIosArrowDown
                                      color={`${
                                        item.bus_type_status === "luxury"
                                          ? "black"
                                          : "#1F487C"
                                      }`}
                                      size="3vw"
                                    />
                                  )}
                                </div>
                              </div>
                              <div
                                // className="h-[3vw] w-[0.3vw] bg-[#1F487C] gap-[1vw]"
                                className={`h-[3vw] w-[0.3vw] gap-[1vw] ${
                                  item.bus_type_status === "luxury"
                                    ? "bg-black"
                                    : "bg-[#1F487C]"
                                }`}
                              ></div>
                              <div
                                className="flex items-center cursor-pointer gap-[0.5vw]"
                                onClick={() =>
                                  toggleDropDown(`droppick${index}`)
                                }
                              >
                                <div
                                  // className="text-[#1F487C] text-[2.2vw]"
                                  className={`text-[2vw]  ${
                                    item.bus_type_status === "luxury"
                                      ? "text-black"
                                      : "text-[#1F487C]"
                                  }`}
                                >
                                  Boarding & Dropping Points
                                </div>
                                <div>
                                  {dropDown === `droppick${index}` ? (
                                    <IoIosArrowUp
                                      color={`${
                                        item.bus_type_status === "luxury"
                                          ? "black"
                                          : "#1F487C"
                                      }`}
                                      size="3vw"
                                    />
                                  ) : (
                                    <IoIosArrowDown
                                      color={`${
                                        item.bus_type_status === "luxury"
                                          ? "black"
                                          : "#1F487C"
                                      }`}
                                      size="3vw"
                                    />
                                  )}
                                </div>
                              </div>
                              <div
                                // className="h-[3vw] w-[0.3vw] bg-[#000000] gap-[1vw]"
                                className={`h-[3vw] w-[0.3vw] gap-[1vw] ${
                                  item.bus_type_status === "luxury"
                                    ? "bg-black"
                                    : "bg-[#1F487C]"
                                }`}
                              ></div>
                              <div
                                className="flex items-center cursor-pointer gap-[0.5vw]"
                                onClick={() => toggleDropDown(`policy${index}`)}
                              >
                                <div
                                  // className="text-[#1F487C] text-[2.2vw]"
                                  className={`text-[2vw]  ${
                                    item.bus_type_status === "luxury"
                                      ? "text-black"
                                      : "text-[#1F487C]"
                                  }`}
                                >
                                  Other Policies
                                </div>
                                <div>
                                  {dropDown === `policy${index}` ? (
                                    <IoIosArrowUp
                                      color={`${
                                        item.bus_type_status === "luxury"
                                          ? "black"
                                          : "#1F487C"
                                      }`}
                                      size="3vw"
                                    />
                                  ) : (
                                    <IoIosArrowDown
                                      color={`${
                                        item.bus_type_status === "luxury"
                                          ? "black"
                                          : "#1F487C"
                                      }`}
                                      size="3vw"
                                    />
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* <label>{item.bus_type}</label> */}
                      {/* {openLiveTracking === index && (
                <div className="bg-gray-200 h-[10vw] w-full mt-[1vw] rounded-[0.5vw]">
                 <LiveTracking/>
                </div>
              )} */}
                      {dropDown === `liveTracking${index}` && (
                        <div className="bg-gray-200 h-auto w-full mt-[1vw] rounded-[0.5vw] mb-[1vw]">
                          <LiveTracking
                            trackingCount={trackingCount}
                            setTrackingCount={setTrackingCount}
                            amenities={item.amenities}
                            busType={item.bus_type_status}
                          />
                        </div>
                      )}
                      {dropDown === `droppick${index}` && (
                        <div className="bg-gray-200 h-auto w-full mt-[1vw] rounded-[0.5vw] mb-[1vw]">
                          <DropPick
                            index={index}
                            boarding={item.boarding}
                            dropping={item.dropping}
                            busType={item.bus_type_status}
                          />
                        </div>
                      )}
                      {dropDown === `policy${index}` && (
                        <div className="bg-gray-200 h-auto w-full mt-[1vw] rounded-[0.5vw] mb-[1vw]">
                          <Policy
                            busType={item.bus_type_status}
                            policies={item.cancellation_policy}
                            price={item.lowest_price}
                          />
                        </div>
                      )}
                      {dropDown === `seat${index}` && (
                        <div className="">
                          <BusSeatsLayout
                            busid={item.bus_id}
                            busdroping={item.dropping}
                            busboarding={item.boarding}
                            busdetails={item}
                            busType={item.bus_type_status}
                          />
                        </div>
                      )}
                    </div>
                  ))}
              </>
            )}
          </div>
        </div>
      </div>
      <BottomNavbar />
    </>
  );
};

export default SingleCardMobile;
