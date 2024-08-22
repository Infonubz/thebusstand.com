import React, { useEffect, useState } from "react";
import Promotion from "../../MainComponenet/Promotion";
import backdrop from "../../../assets/backdrop.png";
import { FaAngleRight } from "react-icons/fa6";
import { MdEventSeat } from "react-icons/md";
import lowprice from '../../../assets/lowprice.png'
import dayjs from "dayjs";
import { Tooltip } from "antd";
import logo from '../../../assets/Operator_logos/161.png'
import { MdAirlineSeatReclineExtra, MdStarRate } from "react-icons/md";
import { IoPersonSharp } from "react-icons/io5";
// import { MdMyLocation } from "react-icons/md";
import { BiPlug } from "react-icons/bi";
// import { BiSolidBlanket } from "react-icons/bi";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import LiveTracking from './LiveTracking'
import Policy from './Policy'
import DropPick from './DropPick'
import { useDispatch, useSelector } from "react-redux";
import { GetCardDetails, SendTravelDetails } from "../../../Api/Home/Dashboard";
import { BsPlug } from "react-icons/bs";
import { BiSolidBlanket, BiCctv } from "react-icons/bi";
import { PiWifiMedium } from "react-icons/pi";
import { FaBottleWater, FaFirstAid } from "react-icons/fa";
import { IoTicketOutline } from "react-icons/io5";
import { MdOutlineLight } from "react-icons/md";
import { GiWaterBottle } from "react-icons/gi";
import { MdMyLocation } from "react-icons/md";
import OurLowPrice from '../../../assets/OurLowPrice.png'
import DashboardMobile from "../../Dashboard/DashboardMobile"

const SingleCardMobile = () => {

    const [dropDown, setDropDown] = useState(null);
    const toggleDropDown = (index) => {
        setDropDown(dropDown === index ? null : index);
    };

    const [trackingCount, setTrackingCount] = useState()
    console.log(trackingCount, "trackingCounttrackingCount")

    const buslist = useSelector((state) => state?.card_detail)
    console.log(buslist, "buslistbuslist")



    const dispatch = useDispatch()
    useEffect(() => {
        SendTravelDetails(dispatch)
    }, [])

    console.log(trackingCount, "logloglog");

    return (
        <div className="relative ">
            <div className="absolute top-[11vw] w-full bg-[#E5FFF1] min-h-screen max-h-auto py-[1vw] px-[0.5vw] ">
                <Promotion />
                {buslist?.length > 0 &&
                    buslist?.map((item, index) => (
                        <div className={`bg-white ${dropDown === `liveTracking${index}` || dropDown === `policy${index}` ? "h-auto" : "h-[15vw]" || dropDown === `droppick${index}` ? "h-auto" : "h-[15vw]"} w-full mt-[0.5vw] flex-col rounded-[1vw] `} key={index}>
                            <div className="flex flex-col gap-y-[3.5vw]">
                                <div className="grid grid-cols-7">
                                    <div className=" col-span-5 relative  h-full w-full ">
                                        <div>
                                            <img src={backdrop} className="h-[10vw] w-full" />
                                            <div className="absolute top-[0.25vw] right-[11vw] rounded-full"><img src={logo} className="w-[7vw] h-[7vw] rounded-full" /></div>
                                            <label className="text-white text-[2.5vw] absolute left-[0.5vw] top-[0.1vw] underline underline-offset-2 underline-white">
                                                Bus Operator
                                            </label>
                                            <label className="text-white text-[4vw] tracking-wider font-semibold absolute left-[0.5vw] top-[3.75vw]">
                                                {/* {item?.Operator_name} */}
                                                <Tooltip
                                                    placement="right"
                                                    title={item?.Operator_name.toUpperCase()}
                                                    className="cursor-pointer"
                                                    color="#1F487C"
                                                >
                                                    {`${item?.Operator_name.toUpperCase().slice(
                                                        0,
                                                        15
                                                    )}...`}
                                                </Tooltip>
                                            </label>
                                        </div>
                                        <div>
                                            <div className="row-span-1 text-[#1F487C] text-[3vw] px-[2vw] mt-[0.5vw]">{item.bus_type}</div>
                                        </div>
                                    </div>
                                    <div className="col-span-2">
                                        <div className=" flex flex-col py-[1.5vw] justify-center items-center gap-y-[0.5vw]">
                                            <div className="flex gap-[1vw]">
                                                <div className="text-[#1F487C] text-[3.2vw]">{item.seats_avalble.avlWindow}</div>
                                                <div className="text-[#1F487C] text-[3.2vw] w-full">Windows Seat</div>
                                            </div>
                                            <div className="flex justify-center items-center bg-[#FFC1C180] rounded-full h-[5vw] px-[2vw] gap-[1vw]">
                                                <div><MdEventSeat color="#C62B2B" size="4vw" /></div>
                                                <div className="text-[2.8vw] text-[#C62B2B] font-bold">{item.seats_avalble.avlAll} Seats Left</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-7">
                                    <div className="col-span-4 relative">
                                    <div className=" absolute top-[-3.25vw] right-0 border-r-[0.5vw] border-[#1F487C66] h-[17.5vw] border-dashed"> </div>
                                            <div className="grid grid-cols-4 h-full w-full">
                                                <div className="col-span-1 flex-col flex items-center justify-center">
                                                    <label className="text-[3vw] text-[#868686]">
                                                        {dayjs(item?.depat_datetime).format("DD MMM")}
                                                    </label>
                                                    <label className="text-[3.5vw] text-[#1F487C] font-bold">{dayjs(item?.depat_datetime).format('HH:mm')}</label>
                                                </div>
                                                <div className=" col-span-2 h-full relative w-full flex items-center justify-center">
                                                    <div className="bg-[#1F487C] absolute left-[-1vw] h-[3vw] w-[3vw] top-[4vw] rounded-full"></div>
                                                    <div className="border-[#1F487C] border-t-[1vw] absolute left-[3vw] top-[5vw] border-dashed w-[22.5vw]"></div>
                                                    <div className="bg-[#1F487C] relative h-[6.5vw] flex w-[17vw] rounded-tl-[1.5vw] rounded-tr-[1.5vw] rounded-bl-[0.5vw] rounded-br-[1vw] text-white text-[2.5vw] font-bold justify-center items-center">
                                                        {item.Time_duration} Hrs
                                                        <div className="bg-[#1F487C] absolute bottom-[-2vw] left-[1.5vw] h-[3.75vw] w-[3.75vw] rounded-full flex items-center justify-center ">
                                                            <div className="bg-white  h-[1.875vw] w-[1.875vw] rounded-full"></div>
                                                        </div>
                                                        <div className="bg-[#1F487C] absolute bottom-[-2vw] right-[1.5vw] h-[3.75vw] w-[3.75vw] rounded-full flex items-center justify-center ">
                                                            <div className="bg-white  h-[1.875vw] w-[1.875vw] rounded-full"></div>
                                                        </div>
                                                    </div>
                                                    <FaAngleRight
                                                        color="#1F487C"
                                                        size={"5vw"}
                                                        className="absolute right-[-0.5vw] top-[3vw]"
                                                    />
                                                </div>
                                                <div className="col-span-1 flex-col flex items-center justify-center">
                                                    <label className="text-[3vw] text-[#868686]">
                                                        {dayjs(item?.Arrl_datetime).format("DD MMM")}
                                                    </label>
                                                    <label className="text-[3.5vw] text-[#1F487C] font-bold">{dayjs(item?.Arrl_datetime).format('HH:mm')}</label>
                                                </div>
                                            </div>
                                       
                                    </div>
                                    <div className="col-span-3">
                                        <div className="relative">
                                            <p className="absolute top-[-4vw] right-[6vw] w-[18vw] text-[3vw] text-[#1F487C]">Starting @</p>
                                            <div className="relative flex items-center">
                                                <div className="absolute top-[0.5vw] left-[12vw] w-[24vw] h-[8vw] bg-[#1F487C]"><p className=" absolute top-[1.75vw] left-[8vw] font-bold text-[3vw] text-white">₹ {item.low_price[2]}</p></div>
                                                <div className="absolute top-[-3vw] left-[10vw] w-[7.5vw] h-[15vw] bg-white rounded-r-full ">
                                                </div>
                                                <div className="absolute top-[-3vw] right-[1vw] w-[7.5vw] h-[15vw] bg-white rounded-l-full flex items-center justify-center "></div>
                                                <div className=" absolute top-[-5vw] left-[2vw] w-[16.5vw] h-[16.5vw]"><img src={OurLowPrice} className=" " /></div>
                                            </div>
                                            <button className="absolute top-[10vw] right-[9.5vw] w-[15vw] h-[5vw] border-[0.3vw] border-dashed border-[#1F487C] text-[#1F487C] text-[2vw] font-semibold rounded-[0.3vw]">Show Seats</button>
                                        </div>
                                    </div>
                                </div>

                                <div className="px-[1vw] ">
                                    <div className="flex items-center gap-[0.5vw] pt-[2.5vw] pb-[0.5vw]">
                                        <div
                                            className={`${item.rating >= 4
                                                ? "border-[#61B00F]"
                                                : item.rating >= 2
                                                    ? "border-orange-400"
                                                    : "border-red-600"
                                                } border-[0.1vw] rounded-[0.4vw] flex`}
                                        >
                                            <div className="h-[4vw] rounded-[0.8vw]">
                                                <div
                                                    className={` 
                            ${item.rating >= 4
                                                            ? "bg-[#61B00F]"
                                                            : item.rating >= 2
                                                                ? "bg-orange-400"
                                                                : "bg-red-600"
                                                        } 
                            flex h-[4vw] items-center  rounded-l-[0.4vw] rounded-r-none justify-center`}
                                                >
                                                    <MdStarRate
                                                        size={"3vw"}
                                                        style={{
                                                            color: "white",
                                                            marginLeft: "0.5vw"
                                                        }}
                                                    />
                                                    <p className="text-[3vw] font-bold text-white px-[1vw]">
                                                        {/* {item.rating} */}
                                                        4
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="h-[4vw] ">
                                                <div className="flex items-center justify-center h-full">
                                                    <IoPersonSharp
                                                        size={"3vw"}
                                                        className={`${item.rating >= 4
                                                            ? "text-[#61B00F]"
                                                            : item.rating >= 2
                                                                ? "text-orange-400"
                                                                : "text-red-600"
                                                            } ml-[0.5vw]`}
                                                    />
                                                    <p
                                                        className={`text-[3vw] font-bold px-[1vw] ${item.rating >= 4
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
                                        <div className="flex items-center px-[1vw] gap-[1vw]">
                                            <div className="flex items-center cursor-pointer gap-[1vw]" onClick={() => toggleDropDown(`liveTracking${index}`)}>
                                                <div><MdMyLocation size="3vw" color="#1F487C" /></div>
                                                <div><BiPlug color="#1F487C" size="3vw " /></div>
                                                <div><BiSolidBlanket color="#1F487C" size="3vw" /></div>
                                                <div><p className="text-[3vw] text-[#1F487C]">+{(item.amenities.length) - 3}</p></div>
                                                <div>{dropDown === `liveTracking${index}` ? <IoIosArrowUp color="#1F487C" size="3vw" /> : <IoIosArrowDown color="#1F487C" size="3vw" />}</div>
                                            </div>
                                            <div className="h-[3vw] w-[0.3vw] bg-[#1F487C] gap-[1vw]"></div>
                                            <div className="flex items-center cursor-pointer gap-[0.5vw]" onClick={() => toggleDropDown(`droppick${index}`)}>
                                                <div className="text-[#1F487C] text-[2.2vw]">Boarding & Dropping Points</div>
                                                <div>{dropDown === `droppick${index}` ? <IoIosArrowUp color="#1F487C" size="3vw" /> : <IoIosArrowDown color="#1F487C" size="3vw" />}</div>
                                            </div>
                                            <div className="h-[3vw] w-[0.3vw] bg-[#1F487C] gap-[1vw]"></div>
                                            <div className="flex items-center cursor-pointer gap-[0.5vw]" onClick={() => toggleDropDown(`policy${index}`)}>
                                                <div className="text-[#1F487C] text-[2.2vw]">Other Policies</div>
                                                <div>{dropDown === `policy${index}` ? <IoIosArrowUp color="#1F487C" size="3vw" /> : <IoIosArrowDown color="#1F487C" size="3vw" />}</div>
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
                                        amenities={item.amenities} />
                                </div>
                            )}
                            {dropDown === `droppick${index}` && (
                                <div className="bg-gray-200 h-auto w-full mt-[1vw] rounded-[0.5vw] mb-[1vw]">
                                    <DropPick index={index} boarding={item.boarding} dropping={item.dropping} />
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
    )
}

export default SingleCardMobile



