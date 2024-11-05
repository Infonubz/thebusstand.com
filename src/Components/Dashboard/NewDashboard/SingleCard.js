import React, { useEffect, useState } from "react";
//import Promotion from "../../MainComponenet/Promotion";
// import backdrop from "../../../assets/backdrop.png";
// import { FaAngleRight } from "react-icons/fa6";
// import { MdEventSeat } from "react-icons/md";
//import lowprice from "../../../assets/lowprice.png";
import dayjs from "dayjs";
//import { Tooltip } from "antd";
//import logo from "../../../assets/Operator_logos/161.png";
import { MdStarRate } from "react-icons/md";
// import { MdAirlineSeatReclineExtra } from "react-icons/md";
import { IoPersonSharp } from "react-icons/io5";
// import { MdMyLocation } from "react-icons/md";
import { BiPlug } from "react-icons/bi";
// import { BiSolidBlanket } from "react-icons/bi";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import LiveTracking from "../LiveTracking";
import Policy from "../Policy";
import DropPick from "../DropPick";
import { useSelector } from "react-redux";
import { Skeleton } from "antd";
// import { useDispatch } from "react-redux";
// import {
//   GetCardDetails,
//   SendTravelDetails,
// } from "../../../Api/Dashboard/Dashboard";
// import { BsPlug } from "react-icons/bs";
import { BiSolidBlanket } from "react-icons/bi";
import { MdMyLocation } from "react-icons/md";
import Advertisement from "../../Advertisement/Ads";
import OurLowPrice from "../../../assets/OurLowPrice.png";
import BusSeatsLayout from "../BusSeatsLayout/BusSeatsLayout";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import thread from "../../../assets/thread.png";
//import sliver from "../../../assets/Silver_surfer.png";
import SINGLECARD_BG from "../../../assets/SINGLECARD_BG.png";
//import SingleCardMobile from "./SingleCardMobile";
import { GetUserDetails } from "../../../Api/Login/Login";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin, Space, Empty } from "antd";
import { useNavigate } from "react-router";
//import ColorCodes from "../../Common/ColorCodes";
import SingleBookingCardList from "../../MobileView/SingleBookingCardList";
//import MobileFilterNavbar from "./MobileFilterNavbar";
// import orange_travel_logo from "../../../assets/orange.png"

export default function SingleCard() {
  // const [dropDown, setDropDown] = useState(0)
  const [dropDown, setDropDown] = useState(null);
  const [spinner, setSpinner] = useState(sessionStorage.getItem("spinner"));
  //const isluxury = sessionStorage.getItem("isLuxury");
  const [trackingCount, setTrackingCount] = useState();
  const buslist = useSelector((state) => state?.card_detail);
  const navigation = useNavigate();
  const user_id = sessionStorage.getItem("user_id");
  //const colors = ColorCodes();
  //const dispatch = useDispatch();

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

  // setTimeout(()=>{
  //   setSpinner("true")
  //   console.log("tiemout",1)
  // },3000)

  // setTimeout(() => {
  //   // setSpinner(false);
  //   setSpinner(false)
  //   sessionStorage.setItem("loading",false)
  //   console.log("cleartiemout", 2);
  // }, 1000);

  // useEffect(() => {
  //   SendTravelDetails(
  //     dispatch,
  //     localStorage.getItem("departure"),
  //     localStorage.getItem("arrival")
  //   );
  // }, []);

  const toggleDropDown = (index) => {
    setDropDown(dropDown === index ? null : index);
  };

  setTimeout(() => {
    setSpinner("false");
  }, 1000);

  useEffect(() => {
    const loader = sessionStorage.getItem("spinner");
    setSpinner(loader);
  }, []);

  useEffect(() => {
    if (user_id) {
      GetUserDetails(navigation);
    }
  }, [user_id, navigation]);

  console.log(spinner, "spinnerrrrrrrrrrr");

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

        {buslist?.length > 0 ? (
          buslist?.map((item, index) => (
            <>
              <div
                className={`${
                  // isluxury == "true" || isluxury == true ||
                  item.bus_type_status === "luxury"
                    ? "custom-gradient-luxury"
                    : "bg-white"
                }  ${
                  dropDown === `liveTracking${index}` ||
                  dropDown === `policy${index}`
                    ? "h-auto"
                    : "h-[1vw]" || dropDown === `droppick${index}`
                    ? "h-auto"
                    : "h-[1vw]"
                } w-full mt-[0.5vw] flex-col rounded-[1vw] border-[0.15vw] border-[#C9C9C9]`}
                key={index}
                style={{
                  backgroundImage: `linear-gradient(to right, #F8C550, #FFEB76, #FFE173), url(${SINGLECARD_BG})`,
                  backgroundBlendMode: "overlay", // Add this line to blend the color and image
                  zIndex: 2,
                }}
              >
                {spinner === "true" ? (
                  <div>
                    <Skeleton
                      loading={spinner}
                      active
                      style={{ margin: "0.5vw", padding: "0.5vw" }}
                      paragraph={{ rows: 4 }}
                      avatar
                    ></Skeleton>
                  </div>
                ) : (
                  <>
                    <div className="grid grid-cols-2 ">
                      <div>
                        <div className="grid grid-rows-7 h-full w-full">
                          <div className="row-span-3 relative  md:left-[-0.1vw]">
                            {item.bus_type_status !== "luxury" ? (
                              <div
                                style={{
                                  width: "47vw",
                                  height: "3.99vw",
                                  overflow: "hidden",
                                  borderTopLeftRadius: "0.5vw",
                                }}
                              >
                                <svg
                                  width="100%"
                                  height="100%"
                                  viewBox="0 20 890 72"
                                  fill="none"
                                >
                                  <path
                                    d="M19.5326 0.0410156L787.192 0.504427C787.192 0.504427 747.324 60.2735 587.004 74.6164C426.684 88.9593 0.831245 83.2804 0.831245 83.2804V10.0627C0.831245 10.0627 0.163636 4.70378 7.06975 1.59887C9.66618 0.0410203 19.5326 0.0410156 19.5326 0.0410156Z"
                                    fill="url(#paint0_linear_4645_2726)"
                                  />
                                  <defs>
                                    <linearGradient
                                      id="paint0_linear_4645_2726"
                                      x1="775.267"
                                      y1="1.05479"
                                      x2="37.0093"
                                      y2="205.377"
                                      gradientUnits="userSpaceOnUse"
                                    >
                                      <stop stopColor="#03C8F0" />
                                      <stop offset="1" stopColor="#1F487C" />
                                    </linearGradient>
                                  </defs>
                                </svg>
                              </div>
                            ) : (
                              <div
                                style={{
                                  width: "47vw",
                                  height: "4vw",
                                  overflow: "hidden",
                                  borderTopColor: "black",
                                  borderTopLeftRadius: "0.6vw",
                                }}
                              >
                                <svg
                                  width="100%"
                                  height="100%"
                                  viewBox="0 20 890 74"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <g filter="url(#filter0_i_4583_1956)">
                                    <path
                                      d="M0.869629 18.916C0.869629 12.975 0.869629 10.0045 2.06162 7.7499C3.02358 5.93043 4.50954 4.44159 6.32714 3.4761C8.57938 2.27973 11.5499 2.27396 17.4909 2.26242L791.396 0.759766C791.396 0.759766 765.528 30.2504 707.678 53.2564C651.684 75.5241 543.157 82.3145 536.25 82.7274C536.131 82.7345 536.072 82.738 536 82.7413C535.944 82.7439 535.878 82.7463 535.822 82.7479C535.75 82.75 535.683 82.7509 535.549 82.7528L270.116 86.5289H0.869629V18.916Z"
                                      fill="url(#paint0_linear_4583_1956)"
                                    />
                                  </g>
                                  <path
                                    d="M1.38363 18.916C1.38363 15.9367 1.38405 13.7342 1.53081 11.9937C1.67703 10.2596 1.96577 9.0309 2.51602 7.99014C3.42988 6.26164 4.84154 4.84725 6.56826 3.93003C7.60794 3.37776 8.83604 3.08664 10.5699 2.93705C12.3101 2.78691 14.5126 2.78221 17.4919 2.77642L790.221 1.27605C790.096 1.40801 789.956 1.55457 789.802 1.71522C788.987 2.56055 787.757 3.79633 786.099 5.35234C782.783 8.46436 777.756 12.8572 770.923 17.9692C757.257 28.1932 736.367 41.294 707.488 52.7788C679.556 63.8868 638.482 71.1454 603.49 75.6777C568.513 80.2083 539.667 82.0082 536.219 82.2143C536.1 82.2215 536.044 82.2248 535.976 82.2279C535.924 82.2303 535.86 82.2326 535.808 82.2341C535.74 82.2361 535.677 82.237 535.541 82.2389L270.116 86.0149H1.38363V18.916Z"
                                    stroke="#393939"
                                    strokeWidth="0.9"
                                  />
                                  <defs>
                                    <filter
                                      id="filter0_i_4583_1956"
                                      x="0.869629"
                                      y="0.759766"
                                      width="790.527"
                                      height="89.8815"
                                      filterUnits="userSpaceOnUse"
                                      colorInterpolationFilters="sRGB"
                                    >
                                      <feFlood
                                        floodOpacity="0"
                                        result="BackgroundImageFix"
                                      />
                                      <feBlend
                                        mode="normal"
                                        in="SourceGraphic"
                                        in2="BackgroundImageFix"
                                        result="shape"
                                      />
                                      <feColorMatrix
                                        in="SourceAlpha"
                                        type="matrix"
                                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                        result="hardAlpha"
                                      />
                                      <feOffset dy="4.112" />
                                      <feGaussianBlur stdDeviation="3.084" />
                                      <feComposite
                                        in2="hardAlpha"
                                        operator="arithmetic"
                                        k2="-1"
                                        k3="1"
                                      />
                                      <feColorMatrix
                                        type="matrix"
                                        values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.6 0"
                                      />
                                      <feBlend
                                        mode="normal"
                                        in2="shape"
                                        result="effect1_innerShadow_4583_1956"
                                      />
                                    </filter>
                                    <linearGradient
                                      id="paint0_linear_4583_1956"
                                      x1="20.5023"
                                      y1="4.04911"
                                      x2="35.452"
                                      y2="158.559"
                                      gradientUnits="userSpaceOnUse"
                                    >
                                      <stop stopColor="#E3E3E3" />
                                      <stop offset="0.18" stopColor="#EAEFF3" />
                                      <stop
                                        offset="0.315"
                                        stopColor="#E3E3E3"
                                      />
                                      <stop
                                        offset="0.491919"
                                        stopColor="white"
                                      />
                                      <stop
                                        offset="0.615"
                                        stopColor="#DEDEDE"
                                      />
                                      <stop
                                        offset="0.785"
                                        stopColor="#E3E3E3"
                                      />
                                      <stop
                                        offset="0.955"
                                        stopColor="#E3E3E3"
                                      />
                                    </linearGradient>
                                  </defs>
                                </svg>
                              </div>
                            )}

                            {/* <img
                          src={
                            // isluxury == "true" || isluxury == true
                            item.bus_type_status === "luxury"
                              ? sliver
                              : backdrop
                          }
                          className="h-[3.5vw] w-full"
                          alt="theme"
                        /> */}
                            <div className="absolute top-[0.1vw] right-[8.5vw] rounded-full">
                              {item.logos != null && (
                                <img
                                  src={`http://192.168.90.47:4001${item.logos}`}
                                  // src={orange_travel_logo}
                                  alt="logos"
                                  className={`w-[3.5vw] h-[3.5vw] rounded-full bg-white  ${
                                    item.bus_type_status === "luxury"
                                      ? "shadow-lg shadow-[rgba(255, 238, 201, 0.9)]"
                                      : "shadow-lg shadow-[rgba(238, 237, 237, 0.7)]"
                                  }`}
                                />
                              )}
                            </div>
                            <label
                              className={`${
                                // isluxury == "true" || isluxury == true
                                item.bus_type_status === "luxury"
                                  ? "text-black"
                                  : " text-white"
                              } text-[0.9vw] absolute left-[0.5vw] top-[0.1vw] underline underline-offset-2 underline-white`}
                            >
                              Bus Operator
                            </label>
                            <label
                              className={`${
                                // isluxury == "true" || isluxury == true
                                item.bus_type_status === "luxury"
                                  ? "text-black"
                                  : " text-white"
                              }  text-[1.4vw] tracking-wider font-semibold absolute left-[0.5vw] top-[1.4vw]`}
                            >
                              {item?.operator_name}
                            </label>
                          </div>
                          <div className="row-span-4 md:ml-[-1.5vw] md:mt-[0.2vw]">
                            <div className="grid grid-cols-5 flex-col items-center">
                              <div className="col-span-1 flex-col flex items-center justify-center">
                                <label
                                  className={`text-[1.2vw] ${
                                    // isluxury == "true" || isluxury == true
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
                                  className={`text-[1.7vw] ${
                                    // isluxury == "true" || isluxury == true
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
                              <div className="col-span-3 md:ml-[-4vw] md:mt-[0.5vw] relative flex items-center justify-center">
                                <svg
                                  className="absolute"
                                  width="26.5vw"
                                  height="4vw"
                                  viewBox="0 0 470 62"
                                  fill="none"
                                >
                                  <line
                                    x1="256.674"
                                    y1="21.2265"
                                    x2="415.354"
                                    y2="21.2265"
                                    stroke={
                                      item.bus_type_status === "luxury"
                                        ? "#393939"
                                        : "#1F4B7F"
                                    }
                                    stroke-width="2.60367"
                                    stroke-dasharray="5.21 5.21"
                                  />
                                  <line
                                    x1="15.9639"
                                    y1="21.2275"
                                    x2="166.575"
                                    y2="21.2274"
                                    stroke={
                                      item.bus_type_status === "luxury"
                                        ? "#393939"
                                        : "#1F4B7F"
                                    }
                                    stroke-width="2.60367"
                                    stroke-dasharray="5.21 5.21"
                                  />
                                  <circle
                                    cx="9.07097"
                                    cy="20.7636"
                                    r="8.21282"
                                    fill={
                                      item.bus_type_status === "luxury"
                                        ? "#393939"
                                        : "#1F4B7F"
                                    }
                                  />
                                  <path
                                    fill-rule="evenodd"
                                    clip-rule="evenodd"
                                    d="M416.866 9.28204C417.571 8.61432 418.713 8.61432 419.418 9.28204L430.244 19.5409C430.949 20.2086 430.949 21.2912 430.244 
21.9589L419.418 32.2177C418.713 32.8854 417.571 32.8854 416.866 32.2177C416.161 31.55 416.161 30.4674 416.866 29.7997L426.416 20.7499L416.866 11.7001C416.161 11.0323 416.161 
9.94976 416.866 9.28204Z"
                                    fill={
                                      item.bus_type_status === "luxury"
                                        ? "#393939"
                                        : "#1F4B7F"
                                    }
                                    stroke="#1F487C"
                                    stroke-width="0.260367"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                  />
                                </svg>
                                <div
                                  className={`relative md:ml-[-0.4vw] flex text-center justify-center`}
                                >
                                  <div
                                    className={` absolute md:pt-[0.5vw] font-bold text-[1.2vw] text-white`}
                                  >
                                    {item.time_duration}
                                  </div>
                                  <svg
                                    className="w-[30vw] md:w-[7.2vw] h-[1vw] md:h-[3.90vw]"
                                    viewBox="0 0 106 54"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M9.62178 0.374512C4.61028 0.374512 0.592041 4.3313 0.592041 9.26618V35.1452C0.592041 38.0402 2.93887 40.387 5.83382 40.387H11.5805C11.5805 
                                  43.9243 13.0076 47.3168 15.5477 49.818C18.0878 52.3193 21.5329 53.7245 25.1251 53.7245C28.7174 53.7245 32.1625 52.3193 34.7026 49.818C37.2427 
                                  47.3168 38.6698 43.9243 38.6698 40.387H69.6765C69.6765 43.9243 71.1035 47.3168 73.6436 49.818C76.1837 52.3193 79.6288 53.7245 83.2211 
                                  53.7245C86.8133 53.7245 90.2585 52.3193 92.7986 49.818C95.3387 47.3168 96.7657 43.9243 96.7657 40.387H100.554C103.449 40.387 105.795 38.0402 
                                  105.795 35.1452V9.26618C105.795 4.3313 101.777 0.374512 96.7657 0.374512H9.62178ZM25.1251 33.7182C26.9213 33.7182 28.6438 34.4208 29.9139 
                                  35.6715C31.1839 36.9221 31.8975 38.6183 31.8975 40.387C31.8975 42.1557 31.1839 43.8519 29.9139 45.1025C28.6438 46.3531 26.9213 47.0557 25.1251 
                                  47.0557C23.329 47.0557 21.6065 46.3531 20.3364 45.1025C19.0663 43.8519 18.3528 42.1557 18.3528 40.387C18.3528 38.6183 19.0663 36.9221 20.3364 
                                  35.6715C21.6065 34.4208 23.329 33.7182 25.1251 33.7182ZM83.2211 33.7182C85.0172 33.7182 86.7398 34.4208 88.0098 35.6715C89.2799 36.9221 
                                  89.9934 38.6183 89.9934 40.387C89.9934 42.1557 89.2799 43.8519 88.0098 45.1025C86.7398 46.3531 85.0172 47.0557 83.2211 47.0557C81.425 47.0557 
                                  79.7024 46.3531 78.4324 45.1025C77.1623 43.8519 76.4488 42.1557 76.4488 40.387C76.4488 38.6183 77.1623 36.9221 78.4324 35.6715C79.7024 34.4208 
                                  81.425 33.7182 83.2211 33.7182Z"
                                      fill={
                                        item.bus_type_status === "luxury"
                                          ? "#393939"
                                          : "#1F4B7F"
                                      }
                                    />
                                  </svg>
                                  {/* <div
                                    className={`${
                                      item.bus_type_status === "luxury"
                                        ? "bg-black"
                                        : "bg-[#1F487C]"
                                    } absolute bottom-[-1vw] left-[0.8vw] h-[2vw] w-[2vw] rounded-full flex items-center justify-center `}
                                  >
                                    <div className="bg-white  h-[1vw] w-[1vw] rounded-full"></div>
                                  </div>
                                  <div
                                    className={`${
                                      item.bus_type_status === "luxury"
                                        ? "bg-black"
                                        : "bg-[#1F487C]"
                                    } absolute bottom-[-1vw] right-[0.8vw] h-[2vw] w-[2vw] rounded-full flex items-center justify-center `}
                                  >
                                    <div className="bg-white  h-[1vw] w-[1vw] rounded-full"></div>
                                  </div> */}
                                </div>
                                {/* <FaAngleRight
                                  color={`${
                                    // isluxury == "true" || isluxury == true
                                    item.bus_type_status === "luxury"
                                      ? "black"
                                      : "#1F487C"
                                  }`}
                                  size={"1.5vw"}
                                  className="absolute right-0"
                                /> */}
                              </div>
                              <div className="col-span-1 md:ml-[-11vw] flex-col flex items-center justify-center">
                                <label
                                  className={`text-[1.2vw] ${
                                    // isluxury == "true" || isluxury == true
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
                                  className={`text-[1.7vw] ${
                                    // isluxury == "true" || isluxury == true
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
                        </div>
                      </div>
                      <div className="">
                        <div className="grid grid-rows-4">
                          <div className="row-span-1">
                            <div
                              className={`${
                                // isluxury == "true" || isluxury == true
                                item.bus_type_status === "luxury"
                                  ? "text-black"
                                  : "text-[#1F487C]"
                              } font-semibold text-[1.2vw] px-[1vw]`}
                            >
                              {item.bus_type}
                            </div>
                          </div>
                          <div className="row-span-3  flex flex-col">
                            <div className="border-r-[0.2vw] border-l-[0.2vw] w-[15.5vw] h-auto border-slate-400 border-dashed relative top-[1vw]">
                              <div className="flex flex-col items-center  border-dashed px-[1vw] gap-[1vw]">
                                {item.seat_availability.avlFemale ? (
                                  <div className="flex gap-[0.5vw] ">
                                    <div
                                      className={`${
                                        // isluxury == "true" || isluxury == true
                                        item.bus_type_status === "luxury"
                                          ? "text-black"
                                          : "text-[#1F487C]"
                                      } text-[1.1vw] `}
                                    >
                                      {item.seat_availability.avlFemale}
                                    </div>
                                    <div
                                      className={`${
                                        // isluxury == "true" || isluxury == true
                                        item.bus_type_status === "luxury"
                                          ? "text-black"
                                          : "text-[#1F487C]"
                                      } text-[1.1vw] w-full`}
                                    >
                                      Female Seat Left
                                    </div>
                                  </div>
                                ) : (
                                  <div className="flex gap-[0.5vw] items-center ">
                                    <div className="">
                                      <AiOutlineExclamationCircle
                                        size={"1.1vw"}
                                        color="red"
                                      />
                                    </div>
                                    <div className="text-[#FF0000] text-[1.1vw] w-full">
                                      Female Seats Sold out
                                    </div>
                                  </div>
                                )}
                                <div className="flex justify-center items-center bg-[#FFC1C180] w-[13vw] rounded-full h-[3vw] gap-[1vw]">
                                  <div>
                                    {/* <MdEventSeat color="#C62B2B" size="2vw" /> */}
                                    <svg
                                      width="2vw"
                                      height="2vw"
                                      viewBox="0 0 33 33"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        d="M31.9668 31.3057C31.9668 31.4571 31.8917 31.6023 31.7579 31.7094C31.6242 31.8164 31.4429 31.8766 31.2538 31.8766H12.7164C12.5273 31.8766 12.3459 31.8164 12.2122 31.7094C12.0785 31.6023 12.0034 31.4571 12.0034 31.3057C12.0034 31.1543 12.0785 31.0091 12.2122 30.902C12.3459 30.7949 12.5273 30.7348 12.7164 30.7348H31.2538C31.4429 30.7348 31.6242 30.7949 31.7579 30.902C31.8917 31.0091 31.9668 31.1543 31.9668 31.3057ZM31.9668 21.0298V25.5968C31.9668 26.0511 31.7414 26.4867 31.3403 26.8079C30.9392 27.129 30.3951 27.3095 29.8278 27.3095H13.0925C12.6949 27.3107 12.3048 27.2227 11.9664 27.0555C11.628 26.8882 11.355 26.6484 11.1781 26.3632L0.820357 9.80761C0.672595 9.56945 0.595703 9.30713 0.595703 9.0412C0.595703 8.77527 0.672595 8.51295 0.820357 8.27479L4.76312 1.99506C5.01515 1.59115 5.45619 1.28326 5.99028 1.1384C6.52437 0.993529 7.10831 1.0234 7.61503 1.22151L13.6361 3.25814L13.6771 3.27384C13.9284 3.37438 14.1525 3.51357 14.3366 3.68346C14.5207 3.85336 14.6612 4.05062 14.7501 4.264C14.839 4.47738 14.8745 4.70268 14.8546 4.92705C14.8348 5.15142 14.7599 5.37045 14.6343 5.57165L14.6236 5.58592L12.0747 9.36375C12.0266 9.44213 12.0015 9.52831 12.0015 9.61565C12.0015 9.70299 12.0266 9.78917 12.0747 9.86755L17.7393 19.0017C17.7987 19.0961 17.8896 19.1754 18.002 19.2308C18.1143 19.2862 18.2437 19.3156 18.3756 19.3157H29.8278C30.1089 19.3157 30.3872 19.36 30.6468 19.4462C30.9064 19.5323 31.1423 19.6586 31.3409 19.8178C31.5396 19.977 31.6971 20.166 31.8045 20.3739C31.9119 20.5819 31.967 20.8047 31.9668 21.0298ZM30.5408 21.0298C30.5408 20.8784 30.4657 20.7331 30.332 20.6261C30.1983 20.519 30.0169 20.4589 29.8278 20.4589H18.3792C17.9807 20.4609 17.5894 20.3733 17.25 20.206C16.9107 20.0387 16.6368 19.7985 16.4595 19.5126L10.7949 10.3785C10.6468 10.1409 10.5697 9.87904 10.5697 9.61351C10.5697 9.34798 10.6468 9.08609 10.7949 8.84853L10.8056 8.83283L13.3492 5.055C13.4294 4.92237 13.4425 4.77002 13.3857 4.62983C13.3289 4.48965 13.2066 4.37248 13.0444 4.30286L7.03574 2.26623L6.99296 2.25053C6.89463 2.2107 6.78588 2.19015 6.67568 2.19059C6.54323 2.19051 6.41336 2.21998 6.30065 2.2757C6.18794 2.33141 6.09684 2.41116 6.03757 2.506L2.0948 8.78573C2.04553 8.86485 2.01988 8.95207 2.01988 9.04049C2.01988 9.1289 2.04553 9.21611 2.0948 9.29524L12.4526 25.8509C12.5119 25.9457 12.603 26.0255 12.7157 26.0812C12.8284 26.1369 12.9582 26.1664 13.0907 26.1663H29.8278C30.0169 26.1663 30.1983 26.1061 30.332 25.9991C30.4657 25.892 30.5408 25.7468 30.5408 25.5954V21.0298Z"
                                        fill="#C62B2B"
                                        stroke="#C62B2B"
                                        stroke-width="1.0132"
                                      />
                                    </svg>
                                  </div>
                                  <div className="text-[1.2vw] text-[#C62B2B] font-bold">
                                    {item.seat_availability.total} Seats Left
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className=" w-[20vw] px-[4vw] flex items-end py-[1vw] absolute right-0">
                              <div className="absolute top-[0.5vw] left-[3vw]">
                                <p
                                  className={`absolute left-[3vw] top-[-1.5vw] w-[8vw]  text-[1.5vw] ${
                                    // isluxury == "true" || isluxury == true
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
                                    className={`absolute top-[1.2vw] left-0 w-[13vw] h-[4vw] ${
                                      // isluxury == true || isluxury == "true"
                                      item.bus_type_status === "luxury"
                                        ? "bg-custom-gradient"
                                        : "clip-trapezoid"
                                    } `}
                                  >
                                    <p
                                      className={` absolute top-[0.2vw] left-[3vw] font-bold text-[2.5vw] ${
                                        // isluxury == true || isluxury == "true"
                                        item.bus_type_status === "luxury"
                                          ? "text-black"
                                          : "text-white"
                                      } `}
                                    >
                                      ₹ {Math.round(item.lowest_price.price)}
                                    </p>
                                    <div
                                      className={` absolute right-0 top-[-1vw] -rotate-90 w-0 h-0 border-l-[1vw] border-l-transparent border-r-[1vw] border-r-transparent border-b-[2vw] ${
                                        // isluxury == "true" || isluxury == true
                                        item.bus_type_status === "luxury"
                                          ? "border-b-[#FFEB76]"
                                          : "border-b-white"
                                      } `}
                                    ></div>
                                    <div
                                      className={` absolute right-0 bottom-[-1vw] -rotate-90 w-0 h-0 border-l-[1vw] border-l-transparent border-r-[1vw] border-r-transparent border-b-[2vw] ${
                                        // isluxury == "true" || isluxury == true
                                        item.bus_type_status === "luxury"
                                          ? "border-b-[#FFEB76]"
                                          : "border-b-white"
                                      } `}
                                    ></div>
                                    <div className="bg-[#61B00F] absolute top-1/2 right-0 transform -translate-y-1/2 w-[2vw] h-[1.5vw] flex items-center justify-center">
                                      <div className="bg-[#2D5C05] w-[1vw] h-[1vw] rounded-full flex items-center justify-center">
                                        <div
                                          className={` ${
                                            // isluxury == "true" || isluxury == true
                                            item.bus_type_status === "luxury"
                                              ? "bg-[#FFEB76]"
                                              : "bg-white"
                                          } w-[0.6vw] h-[0.6vw] rounded-full`}
                                        ></div>
                                      </div>
                                    </div>
                                    <img
                                      src={thread}
                                      alt="thread"
                                      className="w-[6vw] h-[7vw] absolute top-[-3.4vw] right-[-2vw] "
                                    />
                                  </div>
                                  {/* <div class="relative w-96 h-36 bg-blue-600 clip-trapezoid"></div> */}

                                  <div
                                    className={`absolute top-[-1vw] left-[-3vw] w-[4vw]  h-[8vw] ${
                                      // isluxury == "true" || isluxury == true
                                      item.bus_type_status === "luxury"
                                        ? "bg-[#FFEB76]"
                                        : "bg-white"
                                    } rounded-r-full `}
                                  ></div>
                                  {/* <div className="absolute top-[-1vw] right-[-16vw] w-[4vw] h-[8vw] bg-white rounded-l-full flex items-center justify-center "></div> */}
                                  <div className=" absolute top-[-1.4vw] left-[-7.5vw] w-[9vw] h-[9vw]">
                                    <img
                                      src={OurLowPrice}
                                      alt="lowPrice"
                                      className=" "
                                    />
                                  </div>
                                </div>
                                <button
                                  className="absolute top-[6vw] left-[2vw] w-[9vw] h-[2.2vw]  bg-[#61B00F] text-white text-[1.1vw] font-semibold rounded-[0.3vw]"
                                  onClick={() => toggleDropDown(`seat${index}`)}
                                >
                                  {`${
                                    dropDown === `seat${index}`
                                      ? "Hide Seats"
                                      : "Show Seats"
                                  }`}
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="h-[2.7vw] w-full">
                      <div className="px-[1vw] ">
                        <div className="flex items-center gap-[0.5vw] py-[0.1vw]">
                          <div
                            className={`${
                              item.rating >= 4
                                ? "border-[#61B00F]"
                                : item.rating >= 2
                                ? "border-orange-400"
                                : "border-[#61B00F]"
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
                                : "bg-[#61B00F]"
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
                                <p className="text-[1.1vw] font-bold text-white px-[0.8vw]">
                                  {/* {item.rating} */}4
                                </p>
                              </div>
                            </div>
                            <div className="h-[2vw] ">
                              <div className="flex items-center justify-center h-full bg-white rounded-r-[0.5vw]">
                                <IoPersonSharp
                                  size={"1vw"}
                                  className={`${
                                    item.rating >= 4
                                      ? "text-[#61B00F]"
                                      : item.rating >= 2
                                      ? "text-orange-400"
                                      : "text-[#61B00F]"
                                  } ml-[0.5vw]`}
                                />
                                <p
                                  className={`text-[1.1vw] font-bold px-[0.8vw] ${
                                    item.rating >= 4
                                      ? "text-[#61B00F]"
                                      : item.rating >= 2
                                      ? "text-orange-400"
                                      : "text-[#61B00F]"
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
                              onClick={() =>
                                toggleDropDown(`liveTracking${index}`)
                              }
                            >
                              <div>
                                <MdMyLocation
                                  size="1.1vw"
                                  color={`${
                                    // isluxury == "true" || isluxury == true
                                    item.bus_type_status === "luxury"
                                      ? "black"
                                      : "#1F487C"
                                  }`}
                                />
                              </div>
                              <div
                                className={`text-[1.1vw]  ${
                                  // isluxury == "true" || isluxury == true
                                  item.bus_type_status === "luxury"
                                    ? "text-black"
                                    : "text-[#1F487C]"
                                }`}
                              >
                                Live Tracking
                              </div>
                              <div>
                                <BiPlug
                                  color={`${
                                    // isluxury == "true" || isluxury == true
                                    item.bus_type_status === "luxury"
                                      ? "black"
                                      : "#1F487C"
                                  }`}
                                />
                              </div>
                              <div>
                                <BiSolidBlanket
                                  color={`${
                                    // isluxury == "true" || isluxury == true
                                    item.bus_type_status === "luxury"
                                      ? "black"
                                      : "#1F487C"
                                  }`}
                                />
                              </div>
                              <div>
                                <p
                                  className={`text-[1.2vw] ${
                                    // isluxury == "true" || isluxury == true
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
                                      // isluxury == "true" || isluxury == true
                                      item.bus_type_status === "luxury"
                                        ? "black"
                                        : "#1F487C"
                                    }`}
                                    size="1.2vw"
                                  />
                                ) : (
                                  <IoIosArrowDown
                                    color={`${
                                      // isluxury == "true" || isluxury == true
                                      item.bus_type_status === "luxury"
                                        ? "black"
                                        : "#1F487C"
                                    }`}
                                    size="1.2vw"
                                  />
                                )}
                              </div>
                            </div>
                            <div className="h-[1vw] w-[0.1vw] bg-[#1F487C] gap-[1vw]"></div>
                            <div
                              className="flex items-center cursor-pointer gap-[0.5vw]"
                              onClick={() => toggleDropDown(`droppick${index}`)}
                            >
                              <div
                                className={`${
                                  // isluxury == "true" || isluxury == true
                                  item.bus_type_status === "luxury"
                                    ? "text-black"
                                    : "text-[#1F487C]"
                                }  text-[1.1vw] `}
                              >
                                Boarding & Dropping Points
                              </div>
                              <div>
                                {dropDown === `droppick${index}` ? (
                                  <IoIosArrowUp
                                    color={`${
                                      // isluxury == "true" || isluxury == true
                                      item.bus_type_status === "luxury"
                                        ? "black"
                                        : "#1F487C"
                                    }`}
                                    size="1.2vw"
                                  />
                                ) : (
                                  <IoIosArrowDown
                                    color={`${
                                      // isluxury == "true" || isluxury == true
                                      item.bus_type_status === "luxury"
                                        ? "black"
                                        : "#1F487C"
                                    }`}
                                    size="1.2vw"
                                  />
                                )}
                              </div>
                            </div>
                            <div className="h-[1vw] w-[0.1vw] bg-[#1F487C] gap-[1vw]"></div>
                            <div
                              className="flex items-center cursor-pointer gap-[0.5vw]"
                              onClick={() => toggleDropDown(`policy${index}`)}
                            >
                              <div
                                className={`${
                                  // isluxury == "true" || isluxury == true
                                  item.bus_type_status === "luxury"
                                    ? "text-black"
                                    : "text-[#1F487C]"
                                } text-[1.1vw]`}
                              >
                                Booking Policies
                              </div>
                              <div>
                                {dropDown === `policy${index}` ? (
                                  <IoIosArrowUp
                                    color={`${
                                      // isluxury == "true" || isluxury == true
                                      item.bus_type_status === "luxury"
                                        ? "black"
                                        : "#1F487C"
                                    }`}
                                    size="1.2vw"
                                  />
                                ) : (
                                  <IoIosArrowDown
                                    color={`${
                                      // isluxury == "true" || isluxury == true
                                      item.bus_type_status === "luxury"
                                        ? "black"
                                        : "#1F487C"
                                    }`}
                                    size="1.2vw"
                                  />
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* {spinner == "true" ? (
                  <div
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
                    <img
                      src={giff}
                      className="absolute top-[17vw] rounded-[5vw] left-[45vw] h-[10vw] w-[10vw]"
                    />
                  </div>
                ) : (
                  ""
                )} */}
                    </div>
                    {/* {openLiveTracking === index && (
                <div className="bg-gray-200 h-[10vw] w-full mt-[1vw] rounded-[0.5vw]">
                  <LiveTracking />
                </div>
              )} */}
                    {dropDown === `liveTracking${index}` && (
                      <div className="bg-gray-200 h-auto m-[0.5vw] rounded-[0.5vw]">
                        <LiveTracking
                          trackingCount={trackingCount}
                          setTrackingCount={setTrackingCount}
                          amenities={item.amenities}
                          busType={item.bus_type_status}
                        />
                      </div>
                    )}
                    {dropDown === `droppick${index}` && (
                      <div className="bg-gray-200 h-auto m-[0.5vw] rounded-[0.5vw]">
                        <DropPick
                          index={index}
                          boarding={item.boarding}
                          dropping={item.dropping}
                          busType={item.bus_type_status}
                        />
                      </div>
                    )}
                    {dropDown === `policy${index}` && (
                      <div className="bg-gray-200 h-auto m-[0.5vw] rounded-[0.5vw]">
                        <Policy
                          policies={item.cancellation_policy}
                          price={item.lowest_price}
                          busType={item.bus_type_status}
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
                          setDropDown={setDropDown}
                        />
                      </div>
                    )}
                  </>
                )}
              </div>
              {/* <div className="md:hidden block ">
                    <SingleBookingCardList
                      busboarding={item.boarding}
                      busdroping={item.dropping}
                    />
                  </div> */}
            </>
          ))
        ) : (
          <div className="flex items-center justify-center mt-[5vw]">
            <Empty
              description="No Buses Found"
              className=" rounded-full p-[1vw]"
              // style={{
              //   backgroundColor: "white",
              //   color:"black"
              // }}
            />
          </div>
        )}
      </div>
      <div className="md:hidden block ">
        {/* <SingleCardMobile /> */}
        {/* <Advertisement /> */}
        {/* <MobileFilterNavbar /> */}
        <SingleBookingCardList
        // busboarding={item.boarding}
        // busdroping={item.dropping}
        />
      </div>
    </div>
  );
}

// {item.map((list)=>(list.numbers))}
