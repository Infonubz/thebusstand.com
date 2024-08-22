import React, { useEffect, useState } from "react";
import { RiSteering2Fill } from "react-icons/ri";
import men_se from "../../../../assets/men_se.png";
import men_se_sel from "../../../../assets/men_se_sel.png";
import men_se_book from "../../../../assets/se_men_book.png";
import women_se from "../../../../assets/women_se.png";
import women_se_sel from "../../../../assets/women_se_sel.png";
import unisex_book from "../../../../assets/unisex_se_book.png";
import unisex_se from "../../../../assets/seats.png";
import unisex_se_sel from "../../../../assets/unisex_se_sel.png";
import { Popover, Tooltip } from "antd";
import { toast } from "react-toastify";
import { Link } from 'react-router-dom'
import platformTheme from "../../PlatformTheme";

import IMG from '../../../../assets/platforms/makemytrip.png'
function SeaterMobile({ busdetails, type, busprice, logo, imageurl }) {
    const lowerseatlist = [
        {
            rowlist: [
                {
                    id: "L1",
                    seattype: unisex_se,
                    rate: 650,
                    gender: "unisex",
                    status: "available",
                    berth: "lower",
                },
                {
                    id: "L2",
                    seattype: unisex_se,
                    rate: 650,
                    gender: "unisex",
                    status: "available",
                    berth: "lower",
                },
                {
                    id: "L3",
                    seattype: women_se,
                    rate: 650,
                    gender: "women",
                    status: "available",
                    berth: "lower",
                },
                {
                    id: "L4",
                    seattype: women_se,
                    rate: 650,
                    gender: "women",
                    status: "available",
                    berth: "lower",
                },
            ],
        },
        {
            rowlist: [
                {
                    id: "L5",
                    seattype: unisex_se,
                    rate: 650,
                    gender: "unisex",
                    status: "available",
                    berth: "lower",
                },
                {
                    id: "L6",
                    seattype: unisex_se,
                    rate: 650,
                    gender: "unisex",
                    status: "available",
                    berth: "lower",
                },
                {
                    id: "L7",
                    seattype: women_se,
                    rate: 650,
                    gender: "women",
                    status: "available",
                    berth: "lower",
                },
                {
                    id: "L8",
                    seattype: women_se,
                    rate: 650,
                    gender: "women",
                    status: "available",
                    berth: "lower",
                },
            ],
        },
        {
            rowlist: [
                {
                    id: "L9",
                    seattype: unisex_se,
                    rate: 650,
                    gender: "unisex",
                    status: "available",
                    berth: "lower",
                },
                {
                    id: "L10",
                    seattype: unisex_se,
                    rate: 650,
                    gender: "unisex",
                    status: "available",
                    berth: "lower",
                },
                {
                    id: "L11",
                    seattype: unisex_se,
                    rate: 650,
                    gender: "unisex",
                    status: "available",
                    berth: "lower",
                },
                {
                    id: "L12",
                    seattype: unisex_se,
                    rate: 650,
                    gender: "unisex",
                    status: "available",
                    berth: "lower",
                },
            ],
        },
        {
            rowlist: [
                {
                    id: "L13",
                    seattype: men_se,
                    rate: 650,
                    gender: "men",
                    status: "available",
                    berth: "lower",
                },
                {
                    id: "L14",
                    seattype: men_se,
                    rate: 650,
                    gender: "men",
                    status: "available",
                    berth: "lower",
                },
                {
                    id: "L15",
                    seattype: unisex_se,
                    rate: 650,
                    gender: "unisex",
                    status: "available",
                    berth: "lower",
                },
                {
                    id: "L16",
                    seattype: unisex_se,
                    rate: 650,
                    gender: "unisex",
                    status: "available",
                    berth: "lower",
                },
            ],
        },
        {
            rowlist: [
                {
                    id: "L17",
                    seattype: unisex_book,
                    rate: 650,
                    gender: "unisex",
                    status: "booked",
                    berth: "lower",
                },
                {
                    id: "L18",
                    seattype: unisex_book,
                    rate: 650,
                    gender: "unisex",
                    status: "booked",
                    berth: "lower",
                },
                {
                    id: "L19",
                    seattype: unisex_se,
                    rate: 650,
                    gender: "unisex",
                    status: "available",
                    berth: "lower",
                },
                {
                    id: "L20",
                    seattype: unisex_se,
                    rate: 650,
                    gender: "unisex",
                    status: "available",
                    berth: "lower",
                },
            ],
        },
        {
            rowlist: [
                {
                    id: "L21",
                    seattype: unisex_se,
                    rate: 650,
                    gender: "unisex",
                    status: "available",
                    berth: "lower",
                },
                {
                    id: "L22",
                    seattype: unisex_se,
                    rate: 650,
                    gender: "unisex",
                    status: "available",
                    berth: "lower",
                },
                {
                    id: "L23",
                    seattype: unisex_se,
                    rate: 650,
                    gender: "unisex",
                    status: "available",
                    berth: "lower",
                },
                {
                    id: "L24",
                    seattype: unisex_se,
                    rate: 650,
                    gender: "unisex",
                    status: "available",
                    berth: "lower",
                },
            ],
        },
        {
            rowlist: [
                {
                    id: "L25",
                    seattype: unisex_se,
                    rate: 650,
                    gender: "men",
                    status: "booked",
                    berth: "lower",
                },
                {
                    id: "L26",
                    seattype: unisex_se,
                    rate: 650,
                    gender: "unisex",
                    status: "available",
                    berth: "lower",
                },
                {
                    id: "L27",
                    seattype: men_se,
                    rate: 650,
                    gender: "men",
                    status: "available",
                    berth: "lower",
                },
                {
                    id: "L28",
                    seattype: men_se,
                    rate: 650,
                    gender: "men",
                    status: "available",
                    berth: "lower",
                },
            ],
        },
        {
            rowlist: [
                {
                    id: "L29",
                    seattype: unisex_se,
                    rate: 650,
                    gender: "unisex",
                    status: "available",
                    berth: "lower",
                },
                {
                    id: "L30",
                    seattype: unisex_se,
                    rate: 650,
                    gender: "unisex",
                    status: "available",
                    berth: "lower",
                },
                {
                    id: "L31",
                    seattype: unisex_se,
                    rate: 650,
                    gender: "unisex",
                    status: "available",
                    berth: "lower",
                },
                {
                    id: "L32",
                    seattype: unisex_se,
                    rate: 650,
                    gender: "unisex",
                    status: "available",
                    berth: "lower",
                },
            ],
        },
        {
            rowlist: [
                {
                    id: "L33",
                    seattype: men_se_book,
                    rate: 650,
                    gender: "men",
                    status: "booked",
                    berth: "lower",
                },
                {
                    id: "L34",
                    seattype: men_se_book,
                    rate: 650,
                    gender: "men",
                    status: "booked",
                    berth: "lower",
                },
                {
                    id: "L35",
                    seattype: unisex_book,
                    rate: 650,
                    gender: "unisex",
                    status: "booked",
                    berth: "lower",
                },
                {
                    id: "L36",
                    seattype: unisex_book,
                    rate: 650,
                    gender: "unisex",
                    status: "booked",
                    berth: "lower",
                },
            ],
        },
    ];
   
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [seatplatform, setSeatPlatform] = useState("");
    const colorcode = platformTheme(seatplatform);

    const content = (
        <div>
            <div className="grid grid-cols-2 gap-[2vw]">
                <div className="col-span-1">
                    <p className="text-[1vw] font-bold">Fare</p>
                </div>
                <div className="col-span-1">
                    <p>{`₹${busprice?.discount * selectedSeats.length}`}</p>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-[2vw]">
                <div className="col-span-1">
                    <p className="text-[1vw] font-bold">Base Fare</p>
                </div>
                <div className="col-span-1">
                    <p>{`₹${busprice?.price * selectedSeats.length}`}</p>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-[2vw]">
                <div className="col-span-1">
                    <p className="text-[1vw] font-bold">Discount</p>
                </div>
                <div className="col-span-1">
                    <p>{`₹${(busprice?.price - busprice?.discount) * selectedSeats.length
                        }`}</p>
                </div>
            </div>
        </div>
    );

    const handleSeatClick = (seat) => {
        if (seat.status === "booked") return;

        setSelectedSeats((prevSelectedSeats) => {
            if (prevSelectedSeats.includes(seat.id)) {
                return prevSelectedSeats.filter(
                    (selectedSeat) => selectedSeat !== seat.id
                );
            } else {
                if (prevSelectedSeats.length < 1) {
                    return [...prevSelectedSeats, seat.id];
                } else {
                    // alert("You can only book a maximum of 2 seats.");
                    toast.warning("You can book only one seat.");
                    return prevSelectedSeats;
                }
            }
        });
    };

    return (

        <>
            <div className=" h-full w-full  bg-[#EEEDED] border-[0.1vw] border-slate-500 rounded-b-[0.5vw] px-[3vw] py-[3vw]">
                <div className="col-span-1 h-full w-full">
                    <div className=" h-full w-full gap-[1.5vw]">
                        <div className=" h-full w-full py-[1vw]">
                            <div className="border-[0.1vw] border-gray-400 h-full w-full rounded-[0.5vw] relative bg-white">
                                <div className="px-[5vw] py-[1vw]">
                                    <span className="flex float-end">
                                        <RiSteering2Fill size={"8vw"} />
                                    </span>
                                </div>
                                <div className="border-l-[0.2vw] border-[#EEEDED] absolute left-[-0.15vw] top-[3vw] h-[3vw]"></div>
                                <div className="border-r-[0.1vw] border-t-[0.1vw] border-b-[0.1vw] bg-[#EEEDED] border-gray-400 h-[3vw] left-[-0.05vw] w-[3vw] top-[3vw] absolute"></div>
                                <div className="grid grid-rows-9 h-full w-full pt-[6vw] py-[1vw]">
                                    {lowerseatlist?.map((item, rowIndex) => (
                                        <div className="row-span-1 pt-[0.5vw]" key={rowIndex}>
                                            <div className="grid grid-cols-5">
                                                {item.rowlist?.map((bus, index) => (
                                                    <React.Fragment key={index}>
                                                        {index === 2 && (
                                                            <div className="col-span-1"></div>
                                                        )}
                                                        <Tooltip
                                                            title={
                                                                <div className="flex">
                                                                    <span className="text-[1vw]">{`${bus.id}`}</span>
                                                                    <span className="pl-[0.3vw] font-bold text-[1.1vw]">{`₹${busprice?.discount}`}</span>
                                                                </div>
                                                            }
                                                            color={
                                                                bus.gender === "women" &&
                                                                    bus.status === "available"
                                                                    ? "#FF26E5"
                                                                    : bus.gender === "men" &&
                                                                        bus.status === "available"
                                                                        ? "#0099F2"
                                                                        : bus.gender === "unisex" &&
                                                                            bus.status === "available"
                                                                            ? "#4caf50"
                                                                            : "gray"
                                                            }
                                                        >
                                                            <div
                                                                className={`col-span-1 flex flex-col justify-center items-center ${bus.status === "booked"
                                                                    ? "cursor-not-allowed"
                                                                    : "cursor-pointer"
                                                                    } `}
                                                                onClick={() => handleSeatClick(bus)}
                                                            >
                                                                <img
                                                                    src={
                                                                        bus.status === "available"
                                                                            ? selectedSeats.includes(bus.id)
                                                                                ? bus.gender === "men"
                                                                                    ? men_se_sel
                                                                                    : bus.gender === "women"
                                                                                        ? women_se_sel
                                                                                        : unisex_se_sel
                                                                                : bus.seattype
                                                                            : bus.seattype
                                                                    }
                                                                    className="h-[14vw] w-[10vw]"
                                                                    alt="seat type"
                                                                />
                                                                <p className="text-[2.5vw]">{`₹ ${busprice?.discount}`}</p>
                                                            </div>
                                                        </Tooltip>
                                                    </React.Fragment>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Link to="/dashboard/viewSeats/PickUppoint">
                {/* <button className='bg-blue-900 w-full h-[4vh] fixed bottom-0'>
            <p className='text-white'>CONTINUE</p>
          </button> */}
                <button className={`w-full h-[4vh] ${selectedSeats.length > 0
                    ? "bg-[#1F487C] cursor-pointer"
                    : "bg-gray-400 cursor-not-allowed"
                    } rounded-[0.5vw] text-white font-bold text-[1.3vw] fixed bottom-0`}
                    disabled={selectedSeats.length > 0 ? false : true}
                    // onClick={() => setShowModal(!modalshow)}
                    style={{
                        backgroundColor: selectedSeats.length > 0
                                ? colorcode.btn
                                : "#9CA3AF",
                    }}>
                    <p className='text-white text-[3vw]'>CONTINUE</p>
                </button>
            </Link>
        </>

    );
}

export default SeaterMobile;
