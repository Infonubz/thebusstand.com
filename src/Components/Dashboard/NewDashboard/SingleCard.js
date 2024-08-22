import React, { useEffect, useState } from "react";
import Promotion from "../../MainComponenet/Promotion";
import backdrop from "../../../assets/backdrop.png";
import { FaAngleRight } from "react-icons/fa6";
import { MdEventSeat } from "react-icons/md";
import lowprice from "../../../assets/lowprice.png";
import dayjs from "dayjs";
import { Tooltip } from "antd";
import logo from "../../../assets/Operator_logos/161.png";
import { MdAirlineSeatReclineExtra, MdStarRate } from "react-icons/md";
import { IoPersonSharp } from "react-icons/io5";
// import { MdMyLocation } from "react-icons/md";
import { BiPlug } from "react-icons/bi";
// import { BiSolidBlanket } from "react-icons/bi";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import LiveTracking from "../LiveTracking";
import Policy from "../Policy";
import DropPick from "../DropPick";
import { useDispatch, useSelector } from "react-redux";
import {
  GetCardDetails,
  SendTravelDetails,
} from "../../../Api/Dashboard/Dashboard";
import { BsPlug } from "react-icons/bs";
import { BiSolidBlanket, BiCctv } from "react-icons/bi";
import { PiWifiMedium } from "react-icons/pi";
import { FaBottleWater, FaFirstAid } from "react-icons/fa";
import { IoTicketOutline } from "react-icons/io5";
import { MdOutlineLight } from "react-icons/md";
import { GiWaterBottle } from "react-icons/gi";
import { MdMyLocation } from "react-icons/md";
import Advertisement from "../../Advertisement/Ads";
import OurLowPrice from "../../../assets/OurLowPrice.png";
export default function SingleCard() {
  // const [dropDown, setDropDown] = useState(0)
  const [dropDown, setDropDown] = useState(null);
  const toggleDropDown = (index) => {
    setDropDown(dropDown === index ? null : index);
  };

  const [trackingCount, setTrackingCount] = useState();
  console.log(trackingCount, "trackingCounttrackingCount");

  const buslist = useSelector((state) => state?.card_detail);
  console.log(buslist, "buslistbuslist");

  // const buslist = [
  //   {
  //     operator: "Orange Tours & Travels",
  //     operator_icon: "",
  //     bus_type: "VOLVO AC Multiaxle Sleeper (2+1)",
  //     depature_date: new Date(),
  //     arrival_date: new Date(),
  //     depature_time: "18:30",
  //     arrival_time: "05:30",
  //     time_duration: "10:55 Hrs",
  //     window_seats_left: "5",
  //     seats_left: "7",
  //     price: "850",
  //     rating: "4.3",
  //     rated_users: "1.7K",
  //   },
  //   {
  //     operator: "Orange Tours & Travels",
  //     operator_icon: "",
  //     bus_type: "VOLVO AC Multiaxle Sleeper (2+1)",
  //     depature_date: new Date(),
  //     arrival_date: new Date(),
  //     depature_time: "18:30",
  //     arrival_time: "05:30",
  //     time_duration: "10:55 Hrs",
  //     window_seats_left: "5",
  //     seats_left: "7",
  //     price: "850",
  //     rating: "4.3",
  //     rated_users: "1.7K",
  //   },
  //   {
  //     operator: "Orange Tours & Travels",
  //     operator_icon: "",
  //     bus_type: "VOLVO AC Multiaxle Sleeper (2+1)",
  //     depature_date: new Date(),
  //     arrival_date: new Date(),
  //     depature_time: "18:30",
  //     arrival_time: "05:30",
  //     time_duration: "10:55 Hrs",
  //     window_seats_left: "5",
  //     seats_left: "7",
  //     price: "850",
  //     rating: "4.3",
  //     rated_users: "1.7K",
  //   },
  //   {
  //     operator: "Orange Tours & Travels",
  //     operator_icon: "",
  //     bus_type: "VOLVO AC Multiaxle Sleeper (2+1)",
  //     depature_date: new Date(),
  //     arrival_date: new Date(),
  //     depature_time: "18:30",
  //     arrival_time: "05:30",
  //     time_duration: "10:55 Hrs",
  //     window_seats_left: "5",
  //     seats_left: "7",
  //     price: "850",
  //     rating: "4.3",
  //     rated_users: "1.7K",
  //   },
  // ];

  const dispatch = useDispatch();
  useEffect(() => {
    SendTravelDetails(dispatch);
  }, []);

  console.log(trackingCount, "logloglog");

  return (
    // <div>
    //   {" "}
    //   <div
    //     className={`bg-[#E5FFF1] md:block hidden px-[0.5vw] min-h-screen max-h-auto pb-[1vw] relative`}
    //   >
    //     {/* <Promotion /> */}
    //     <Advertisement />
    //     {buslist?.length > 0 &&
    //       buslist?.map((item, index) => (
    //         <div
    //           className={`bg-white ${
    //             dropDown === `liveTracking${index}` ||
    //             dropDown === `policy${index}`
    //               ? "h-auto"
    //               : "h-[13vw]" || dropDown === `droppick${index}`
    //               ? "h-auto"
    //               : "h-[13vw]"
    //           } w-full mt-[0.5vw] flex-col rounded-[1vw]`}
    //           key={index}
    //         >
    //           <div className="grid grid-cols-2 w-full h-auto">
    //             <div className="grid grid-cols-5">
    //               <div className=" relative col-span-5  h-full w-full">
    //                 <div className="grid grid-rows-6 h-full w-full">
    //                   <div className="row-span-2 relative  h-full w-full ">
    //                     <img src={backdrop} className="h-[3.5vw] w-full" />
    //                     <div className="absolute top-[0.2vw] right-[9vw] rounded-full">
    //                       <img
    //                         src={logo}
    //                         className="w-[2.5vw] h-[2.5vw] rounded-full"
    //                       />
    //                     </div>
    //                     <label className="text-white text-[0.9vw] absolute left-[0.5vw] top-[0.1vw] underline underline-offset-2 underline-white">
    //                       Bus Operator
    //                     </label>
    //                     <label className="text-white text-[1.4vw] tracking-wider font-semibold absolute left-[0.5vw] top-[1.4vw]">
    //                       {item?.Operator_name}
    //                     </label>
    //                   </div>
    //                   <div className="row-span-3  w-full h-full">
    //                     <div className="grid grid-cols-5 h-full w-full">
    //                       <div className="col-span-1 flex-col flex items-center justify-center">
    //                         <label className="text-[1vw] text-[#868686]">
    //                           {dayjs(item?.depat_datetime).format("DD MMM")}
    //                         </label>
    //                         <label className="text-[1.5vw] text-[#1F487C] font-bold">
    //                           {dayjs(item?.depat_datetime).format("HH:mm")}
    //                         </label>
    //                       </div>
    //                       <div className=" col-span-3 h-full relative w-full flex items-center justify-center">
    //                         <div className="bg-[#1F487C] absolute left-0 h-[1vw] w-[1vw] rounded-full"></div>
    //                         <div className="border-[#1F487C] border-[0.15vw] absolute left-0 top-[3vw] border-dashed w-[23vw]"></div>
    //                         <div className="bg-[#1F487C] relative h-[3vw] flex w-[8vw] rounded-tl-[1vw] rounded-tr-[1vw] rounded-bl-[0.5vw] rounded-br-[0.5vw] text-white text-[1.2vw] font-bold justify-center items-center">
    //                           {item.Time_duration}
    //                           <div className="bg-[#1F487C] absolute bottom-[-1vw] left-[1vw] h-[2vw] w-[2vw] rounded-full flex items-center justify-center ">
    //                             <div className="bg-white  h-[1vw] w-[1vw] rounded-full"></div>
    //                           </div>
    //                           <div className="bg-[#1F487C] absolute bottom-[-1vw] right-[1vw] h-[2vw] w-[2vw] rounded-full flex items-center justify-center ">
    //                             <div className="bg-white  h-[1vw] w-[1vw] rounded-full"></div>
    //                           </div>
    //                         </div>
    //                         <FaAngleRight
    //                           color="#1F487C"
    //                           size={"1.5vw"}
    //                           className="absolute right-0"
    //                         />
    //                       </div>
    //                       <div className="col-span-1 flex-col flex items-center justify-center">
    //                         <label className="text-[1vw] text-[#868686]">
    //                           {dayjs(item?.Arrl_datetime).format("DD MMM")}
    //                         </label>
    //                         <label className="text-[1.5vw] text-[#1F487C] font-bold">
    //                           {dayjs(item?.Arrl_datetime).format("HH:mm")}
    //                         </label>
    //                       </div>
    //                     </div>
    //                   </div>
    //                   <div className="row-span-1"></div>
    //                 </div>
    //               </div>
    //             </div>
    //             <div className="flex flex-col">
    //               <div className="text-[#1F487C] text-[1.25vw] px-[1vw]">
    //                 {item.bus_type}
    //               </div>
    //               <div className="grid grid-cols-5">
    //                 <div className=" col-span-2 flex mb-[1vw] py-[1.5vw]">
    //                   <div className="flex flex-col justify-center border-[#1F487C80] border-r-[0.2vw] border-l-[0.2vw] border-dashed px-[1vw] gap-[1vw]">
    //                     <div className="flex gap-[0.5vw]">
    //                       <div className="text-[#1F487C] text-[1.3vw]">
    //                         {item.seats_avalble.avlWindow}
    //                       </div>
    //                       <div className="text-[#1F487C] text-[1.3vw] w-full">
    //                         Windows Seat Left
    //                       </div>
    //                     </div>
    //                     <div className="flex justify-center items-center bg-[#FFC1C180] rounded-full h-[3vw] gap-[1vw]">
    //                       <div>
    //                         <MdEventSeat color="#C62B2B" size="2vw" />
    //                       </div>
    //                       <div className="text-[1.2vw] text-[#C62B2B] font-bold">
    //                         {item.seats_avalble.avlAll} Seats Left
    //                       </div>
    //                     </div>
    //                   </div>
    //                 </div>
    //                 <div className="col-span-3"></div>
    //                 <div className=" w-[25vw] px-[4vw] flex items-end py-[1vw] absolute right-0">
    //                   <div>
    //                     {/* <div className="bg-[#1F487C] h-[10.5vw] w-full cursor-pointer rounded-[0.5vw] relative top-[0vw]">
    //                       <div
    //                         className="bg-[white] h-[8vw] rounded-[0.5vw] rounded-b-none mx-[0.2vw] my-[0.2vw] relative cursor-pointer"
    //                       >
    //                         <img
    //                           src={lowprice}
    //                           className="absolute bottom-[6.5vw] h-[4vw] w-full"
    //                         />
    //                         <img
    //                           src={logo}
    //                           // src={
    //                           //   // bus[
    //                           //   //   busIndex
    //                           //   // ]?.Bus_lowprice_name?.toUpperCase() ==
    //                           //   //   bus[
    //                           //   //     busIndex
    //                           //   //   ]?.Bus_operator_name?.toUpperCase()
    //                           //   //   ? require(`../../assets/Operator_logos/${bus[busIndex]?.bus_operator_id}.png`)
    //                           //   //   : platformlogo(
    //                           //   //     bus[busIndex]?.Bus_lowprice_name
    //                           //   //   )

    //                           // }
    //                           // src={convertPath(bus[busIndex].Logo)}
    //                           // src={imagelogo(bus, busIndex)}
    //                           className="rounded-full w-[4vw] bg-white h-[4vw] absolute bottom-[2.2vw] left-1/2 transform -translate-x-1/2 "
    //                         />

    //                         <h2 className="text-blue-900 text-[1.1vw] absolute bottom-0 font-extrabold text-center w-full">
    //                           {/* {bus[
    //                                       busIndex
    //                                     ]?.Bus_lowprice_name.toUpperCase()} */}
    //                     {/* {item.low_price[1].toUpperCase()
    //                             .length > 20 ? (
    //                             <Tooltip
    //                               placement="right"
    //                               title={item?.low_price[1].toUpperCase()}
    //                               className="cursor-pointer"
    //                               color="#1F487C"
    //                             >
    //                               {`${item?.low_price[1].toUpperCase().slice(
    //                                 0,
    //                                 20
    //                               )}...`}
    //                             </Tooltip>
    //                           ) : (
    //                             item?.low_price[1].toUpperCase().slice(
    //                               0,
    //                               20
    //                             )
    //                           )}
    //                         </h2>
    //                       </div>
    //                       <div className="grid grid-cols-6 absolute bottom-0 w-full">
    //                         <div className="col-span-3 w-full float-left px-[0.6vw] flex flex-col ">
    //                           <h3 className="text-white text-[1.5vw] font-bold">
    //                             {/* {`₹ ${
    //                                         bus[busIndex]?.Bus_lowprice_name ==
    //                                         bus[busIndex]?.Bus_operator_name
    //                                           ? bus[busIndex]
    //                                               ?.Bus_operator_price
    //                                           : bus[busIndex]?.Bus_low_price
    //                                       }`} */}
    //                     {/* {`₹ ${item?.low_price[2]}`}
    //                           </h3>
    //                         </div>
    //                         <div class="col-span-3 justify-center relative cursor-pointer">
    //                           <button
    //                             className="absolute top-[1.1vw] transform cursor-pointer -translate-y-1/2 bg-white right-0 mr-[0.4vw] text-blue-950 mb-[0.25vw] font-bold rounded-[0.3vw] items-center justify-center w-[8vw] h-[2vw] text-[1.1vw] "
    //                           >
    //                             Show Seats
    //                           </button>
    //                         </div>
    //                       </div>
    //                     </div> */}
    //                   </div>
    //                   <div className="absolute top-[0.5vw] left-[3vw]">
    //                     <p className="absolute left-[5vw] top-[-1vw] w-[8vw]  text-[1.5vw] text-[#1F487C]">
    //                       Starting @
    //                     </p>
    //                     <div className="relative flex items-center">
    //                       <div className="w-[16vw] h-[4.5vw] bg-[#1F487C] absolute top-[2.25vw]">
    //                         <p className="absolute left-[6vw] top-[1.3vw] font-bold text-[1.4vw] text-white">
    //                           ₹ {item.low_price[2]}
    //                         </p>
    //                       </div>
    //                       <div className="w-[9vw] h-[9vw] bg-white rounded-full flex items-center justify-center absolute top-0 left-[-4vw]">
    //                         <img
    //                           src={OurLowPrice}
    //                           className="w-[11vw] h-[11vw] absolute left-[0.5vw]"
    //                         />
    //                       </div>
    //                       <div className="w-[9vw] h-[9vw] bg-white rounded-full flex items-center justify-center absolute top-0 right-[-21vw]"></div>
    //                     </div>
    //                     <button className="absolute top-[8vw] left-[4vw] w-[9vw] h-[3vw] border-[0.3vw] border-dashed border-[#1F487C] text-[#1F487C] text-[1.3vw] font-semibold rounded-[0.3vw]">
    //                       Show Seats
    //                     </button>
    //                   </div>
    //                 </div>
    //               </div>
    //             </div>
    //           </div>
    //           <div className="px-[1vw] ">
    //             <div className="flex items-center gap-[0.5vw] py-[0.5vw]">
    //               <div
    //                 className={`${
    //                   item.rating >= 4
    //                     ? "border-[#61B00F]"
    //                     : item.rating >= 2
    //                     ? "border-orange-400"
    //                     : "border-red-600"
    //                 } border-[0.1vw] rounded-[0.4vw] flex`}
    //               >
    //                 <div className="h-[1.5vw] rounded-[0.4vw]">
    //                   <div
    //                     className={`
    //                         ${
    //                           item.rating >= 4
    //                             ? "bg-[#61B00F]"
    //                             : item.rating >= 2
    //                             ? "bg-orange-400"
    //                             : "bg-red-600"
    //                         }
    //                         flex h-[2vw] items-center  rounded-l-[0.4vw] rounded-r-none justify-center`}
    //                   >
    //                     <MdStarRate
    //                       size={"1.2vw"}
    //                       style={{
    //                         color: "white",
    //                         marginLeft: "0.5vw",
    //                       }}
    //                     />
    //                     <p className="text-[1.1vw] font-bold text-white px-[1vw]">
    //                       {/* {item.rating} */}4
    //                     </p>
    //                   </div>
    //                 </div>
    //                 <div className="h-[2vw] ">
    //                   <div className="flex items-center justify-center h-full">
    //                     <IoPersonSharp
    //                       size={"1vw"}
    //                       className={`${
    //                         item.rating >= 4
    //                           ? "text-[#61B00F]"
    //                           : item.rating >= 2
    //                           ? "text-orange-400"
    //                           : "text-red-600"
    //                       } ml-[0.5vw]`}
    //                     />
    //                     <p
    //                       className={`text-[1.1vw] font-bold px-[1vw] ${
    //                         item.rating >= 4
    //                           ? "text-[#61B00F]"
    //                           : item.rating >= 2
    //                           ? "text-orange-400"
    //                           : "text-red-600"
    //                       }`}
    //                     >
    //                       {/* {`${item.rated_users}`} */}
    //                       1.7K
    //                     </p>
    //                   </div>
    //                 </div>
    //               </div>
    //               <div className="flex items-center gap-[0.5vw]">
    //                 <div
    //                   className="flex items-center cursor-pointer gap-[0.5vw]"
    //                   onClick={() => toggleDropDown(`liveTracking${index}`)}
    //                 >
    //                   <div>
    //                     <MdMyLocation size="1.1vw" color="#1F487C" />
    //                   </div>
    //                   <div className="text-[1.1vw] text-[#1F487C]">
    //                     Live Tracking
    //                   </div>
    //                   <div>
    //                     <BiPlug color="#1F487C" />
    //                   </div>
    //                   <div>
    //                     <BiSolidBlanket color="#1F487C" />
    //                   </div>
    //                   <div>
    //                     <p className="text-[1.2vw] text-[#1F487C]">
    //                       +{item.amenities.length - 3}
    //                     </p>
    //                   </div>
    //                   <div>
    //                     {dropDown === `liveTracking${index}` ? (
    //                       <IoIosArrowUp color="#1F487C" size="1.2vw" />
    //                     ) : (
    //                       <IoIosArrowDown color="#1F487C" size="1.2vw" />
    //                     )}
    //                   </div>
    //                 </div>
    //                 <div className="h-[1vw] w-[0.1vw] bg-[#1F487C] gap-[1vw]"></div>
    //                 <div
    //                   className="flex items-center cursor-pointer gap-[0.5vw]"
    //                   onClick={() => toggleDropDown(`droppick${index}`)}
    //                 >
    //                   <div className="text-[#1F487C] text-[1.1vw]">
    //                     Boarding & Dropping Points
    //                   </div>
    //                   <div>
    //                     {dropDown === `droppick${index}` ? (
    //                       <IoIosArrowUp color="#1F487C" size="1.2vw" />
    //                     ) : (
    //                       <IoIosArrowDown color="#1F487C" size="1.2vw" />
    //                     )}
    //                   </div>
    //                 </div>
    //                 <div className="h-[1vw] w-[0.1vw] bg-[#1F487C] gap-[1vw]"></div>
    //                 <div
    //                   className="flex items-center cursor-pointer gap-[0.5vw]"
    //                   onClick={() => toggleDropDown(`policy${index}`)}
    //                 >
    //                   <div className="text-[#1F487C] text-[1.1vw]">
    //                     Booking Policies
    //                   </div>
    //                   <div>
    //                     {dropDown === `policy${index}` ? (
    //                       <IoIosArrowUp color="#1F487C" size="1.2vw" />
    //                     ) : (
    //                       <IoIosArrowDown color="#1F487C" size="1.2vw" />
    //                     )}
    //                   </div>
    //                 </div>
    //               </div>
    //             </div>
    //           </div>
    //           {/* <label>{item.bus_type}</label> */}
    //           {/* {openLiveTracking === index && (
    //             <div className="bg-gray-200 h-[10vw] w-full mt-[1vw] rounded-[0.5vw]">
    //              <LiveTracking/>
    //             </div>
    //           )} */}
    //           {dropDown === `liveTracking${index}` && (
    //             <div className="bg-gray-200 h-auto w-full mt-[1vw] rounded-[0.5vw] mb-[1vw]">
    //               <LiveTracking
    //                 trackingCount={trackingCount}
    //                 setTrackingCount={setTrackingCount}
    //                 amenities={item.amenities}
    //               />
    //             </div>
    //           )}
    //           {dropDown === `droppick${index}` && (
    //             <div className="bg-gray-200 h-auto w-full mt-[1vw] rounded-[0.5vw] mb-[1vw]">
    //               <DropPick
    //                 index={index}
    //                 boarding={item.boarding}
    //                 dropping={item.dropping}
    //               />
    //             </div>
    //           )}
    //           {dropDown === `policy${index}` && (
    //             <div className="bg-gray-200 h-auto w-full mt-[1vw] rounded-[0.5vw] mb-[1vw]">
    //               <Policy />
    //             </div>
    //           )}
    //         </div>
    //       ))}
    //   </div>
    // </div>

    
    <div>
      <div
        className={`bg-[#E5FFF1] md:block hidden px-[0.5vw] min-h-screen max-h-auto pb-[1vw] relative`}
      >
        <Advertisement />
        {buslist?.length > 0 &&
          buslist?.map((item, index) => (
            <div
              className={`bg-white ${
                dropDown === `liveTracking${index}` ||
                dropDown === `policy${index}`
                  ? "h-auto"
                  : "h-[13vw]" || dropDown === `droppick${index}`
                  ? "h-auto"
                  : "h-[13vw]"
              } w-full mt-[0.5vw] flex-col rounded-[1vw]`}
              key={index}
            >
              <div className="grid grid-cols-2 py-[0.5vw]">
                <div>
                  <div className="grid grid-rows-7  h-full w-full">
                    <div className="row-span-3 relative  h-full w-full ">
                      <img src={backdrop} className="h-[3.5vw] w-full" />
                      <div className="absolute top-[0.2vw] right-[9vw] rounded-full">
                        <img
                          src={logo}
                          className="w-[2.5vw] h-[2.5vw] rounded-full"
                        />
                      </div>
                      <label className="text-white text-[0.9vw] absolute left-[0.5vw] top-[0.1vw] underline underline-offset-2 underline-white">
                        Bus Operator
                      </label>
                      <label className="text-white text-[1.4vw] tracking-wider font-semibold absolute left-[0.5vw] top-[1.4vw]">
                        {item?.Operator_name}
                      </label>
                    </div>
                    <div className="row-span-4">
                      <div className="grid grid-cols-5 h-full w-full flex-col items-center">
                        <div className="col-span-1 flex-col flex items-center justify-center">
                          <label className="text-[1vw] text-[#868686]">
                            {dayjs(item?.depat_datetime).format("DD MMM")}
                          </label>
                          <label className="text-[1.5vw] text-[#1F487C] font-bold">
                            {dayjs(item?.depat_datetime).format("HH:mm")}
                          </label>
                        </div>
                        <div className=" col-span-3 h-full relative w-full flex items-center justify-center">
                          <div className="bg-[#1F487C] absolute left-0 h-[1vw] w-[1vw] rounded-full"></div>
                          <div className="border-[#1F487C] border-[0.15vw] absolute left-0 top-[2.3vw] border-dashed w-[23vw]"></div>
                          <div className="bg-[#1F487C] relative h-[3vw] flex w-[8vw] rounded-tl-[1vw] rounded-tr-[1vw] rounded-bl-[0.5vw] rounded-br-[0.5vw] text-white text-[1.2vw] font-bold justify-center items-center">
                            {item.Time_duration}
                            <div className="bg-[#1F487C] absolute bottom-[-1vw] left-[1vw] h-[2vw] w-[2vw] rounded-full flex items-center justify-center ">
                              <div className="bg-white  h-[1vw] w-[1vw] rounded-full"></div>
                            </div>
                            <div className="bg-[#1F487C] absolute bottom-[-1vw] right-[1vw] h-[2vw] w-[2vw] rounded-full flex items-center justify-center ">
                              <div className="bg-white  h-[1vw] w-[1vw] rounded-full"></div>
                            </div>
                          </div>
                          <FaAngleRight
                            color="#1F487C"
                            size={"1.5vw"}
                            className="absolute right-0"
                          />
                        </div>
                        <div className="col-span-1 flex-col flex items-center justify-center">
                          <label className="text-[1vw] text-[#868686]">
                            {dayjs(item?.Arrl_datetime).format("DD MMM")}
                          </label>
                          <label className="text-[1.5vw] text-[#1F487C] font-bold">
                            {dayjs(item?.Arrl_datetime).format("HH:mm")}
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="">
                  <div className="grid grid-rows-4">
                    <div className="row-span-1">
                      <div className="text-[#1F487C] text-[1.1vw] px-[1vw]">
                        {item.bus_type}
                      </div>
                    </div>
                    <div className="row-span-3  flex flex-col">
                      <div className="flex flex-col justify-center  border-dashed px-[1vw] gap-[1vw]">
                        <div className="flex gap-[0.5vw]">
                          <div className="text-[#1F487C] text-[1.1vw]">
                            {item.seats_avalble.avlWindow}
                          </div>
                          <div className="text-[#1F487C] text-[1.1vw] w-full">
                            Windows Seat Left
                          </div>
                        </div>
                        <div className="flex justify-center items-center bg-[#FFC1C180] w-[13vw] rounded-full h-[3vw] gap-[1vw]">
                          <div>
                            <MdEventSeat color="#C62B2B" size="2vw" />
                          </div>
                          <div className="text-[1.2vw] text-[#C62B2B] font-bold">
                            {item.seats_avalble.avlAll} Seats Left
                          </div>
                        </div>
                      </div>
                      <div className=" w-[20vw] px-[4vw] flex items-end py-[1vw] absolute right-0">
                        <div className="absolute top-[0.5vw] left-[3vw]">
                          <p className="absolute left-[3vw] top-[-1vw] w-[8vw]  text-[1.5vw] text-[#1F487C]">
                            Starting @
                          </p>
                          <div className="relative flex items-center ">
                            <div className="w-[10vw] h-[3vw] bg-[#1F487C] absolute top-[2vw]">
                              <p className="absolute left-[4.5vw] top-[0.5vw] font-bold text-[1.4vw] text-white">
                                ₹ {Math.round(item.low_price[2])}
                              </p>
                            </div>
                            <div className="w-[7.5vw] h-[6vw] bg-white rounded-full flex items-center justify-center absolute top-0 left-[-4vw]">
                              <img
                                src={OurLowPrice}
                                className="w-[8vw] h-[8vw] absolute left-[0.5vw]"
                              />
                            </div>
                            {/* <div className="w-[9vw] h-[9vw] bg-white rounded-full flex items-center justify-center absolute top-0 right-[-21vw]"></div> */}
                          </div>
                          <button className="absolute top-[6vw] left-[2vw] w-[8vw] h-[2.2vw] border-[0.2vw] border-dashed border-[#1F487C] text-[#1F487C] text-[1.1vw] font-semibold rounded-[0.3vw]">
                            Show Seats
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="h-[3vw] w-full">
                <div className="px-[1vw] ">
                  <div className="flex items-center gap-[0.5vw] py-[0.5vw]">
                    <div
                      className={`${
                        item.rating >= 4
                          ? "border-[#61B00F]"
                          : item.rating >= 2
                          ? "border-orange-400"
                          : "border-red-600"
                      } border-[0.1vw] rounded-[0.4vw] flex`}
                    >
                      <div className="h-[1.5vw] rounded-[0.4vw]">
                        <div
                          className={`
                            ${
                              item.rating >= 4
                                ? "bg-[#61B00F]"
                                : item.rating >= 2
                                ? "bg-orange-400"
                                : "bg-red-600"
                            }
                            flex h-[2vw] items-center  rounded-l-[0.4vw] rounded-r-none justify-center`}
                        >
                          <MdStarRate
                            size={"1.2vw"}
                            style={{
                              color: "white",
                              marginLeft: "0.5vw",
                            }}
                          />
                          <p className="text-[1.1vw] font-bold text-white px-[1vw]">
                            {/* {item.rating} */}4
                          </p>
                        </div>
                      </div>
                      <div className="h-[2vw] ">
                        <div className="flex items-center justify-center h-full">
                          <IoPersonSharp
                            size={"1vw"}
                            className={`${
                              item.rating >= 4
                                ? "text-[#61B00F]"
                                : item.rating >= 2
                                ? "text-orange-400"
                                : "text-red-600"
                            } ml-[0.5vw]`}
                          />
                          <p
                            className={`text-[1.1vw] font-bold px-[1vw] ${
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
                    <div className="flex items-center gap-[0.5vw]">
                      <div
                        className="flex items-center cursor-pointer gap-[0.5vw]"
                        onClick={() => toggleDropDown(`liveTracking${index}`)}
                      >
                        <div>
                          <MdMyLocation size="1.1vw" color="#1F487C" />
                        </div>
                        <div className="text-[1.1vw] text-[#1F487C]">
                          Live Tracking
                        </div>
                        <div>
                          <BiPlug color="#1F487C" />
                        </div>
                        <div>
                          <BiSolidBlanket color="#1F487C" />
                        </div>
                        <div>
                          <p className="text-[1.2vw] text-[#1F487C]">
                            +{item.amenities.length - 3}
                          </p>
                        </div>
                        <div>
                          {dropDown === `liveTracking${index}` ? (
                            <IoIosArrowUp color="#1F487C" size="1.2vw" />
                          ) : (
                            <IoIosArrowDown color="#1F487C" size="1.2vw" />
                          )}
                        </div>
                      </div>
                      <div className="h-[1vw] w-[0.1vw] bg-[#1F487C] gap-[1vw]"></div>
                      <div
                        className="flex items-center cursor-pointer gap-[0.5vw]"
                        onClick={() => toggleDropDown(`droppick${index}`)}
                      >
                        <div className="text-[#1F487C] text-[1.1vw]">
                          Boarding & Dropping Points
                        </div>
                        <div>
                          {dropDown === `droppick${index}` ? (
                            <IoIosArrowUp color="#1F487C" size="1.2vw" />
                          ) : (
                            <IoIosArrowDown color="#1F487C" size="1.2vw" />
                          )}
                        </div>
                      </div>
                      <div className="h-[1vw] w-[0.1vw] bg-[#1F487C] gap-[1vw]"></div>
                      <div
                        className="flex items-center cursor-pointer gap-[0.5vw]"
                        onClick={() => toggleDropDown(`policy${index}`)}
                      >
                        <div className="text-[#1F487C] text-[1.1vw]">
                          Booking Policies
                        </div>
                        <div>
                          {dropDown === `policy${index}` ? (
                            <IoIosArrowUp color="#1F487C" size="1.2vw" />
                          ) : (
                            <IoIosArrowDown color="#1F487C" size="1.2vw" />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* {openLiveTracking === index && (
                <div className="bg-gray-200 h-[10vw] w-full mt-[1vw] rounded-[0.5vw]">
                  <LiveTracking />
                </div>
              )} */}
              {dropDown === `liveTracking${index}` && (
                <div className="bg-gray-200 h-auto w-full mt-[1vw] rounded-[0.5vw] mb-[1vw]">
                  <LiveTracking
                    trackingCount={trackingCount}
                    setTrackingCount={setTrackingCount}
                    amenities={item.amenities}
                  />
                </div>
              )}
              {dropDown === `droppick${index}` && (
                <div className="bg-gray-200 h-auto w-full mt-[1vw] rounded-[0.5vw] mb-[1vw]">
                  <DropPick
                    index={index}
                    boarding={item.boarding}
                    dropping={item.dropping}
                  />
                </div>
              )}
              {dropDown === `policy${index}` && (
                <div className="bg-gray-200 h-auto w-full mt-[1vw] rounded-[0.5vw] mb-[1vw]">
                  <Policy />
                </div>
              )}
            </div>
          ))}
      </div>
    </div>
  );
}

// {item.map((list)=>(list.numbers))}
