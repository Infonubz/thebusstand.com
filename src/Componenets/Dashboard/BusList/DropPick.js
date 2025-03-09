import { Popover } from "antd";
import dayjs from "dayjs";
import React from "react";
import { capitalizeFirstLetter } from '../../Common/Common-Functions/Captalization'
import { LuxuryFind } from "../../Common/Common-Functions/LuxuryFind";

export default function DropPick({ boarding, dropping, bus_type_status, busType, bus_type }) {

    // const LuxuryFind = (type) =>
    //     type.toLowerCase().includes("volvo") ||
    //     type.toLowerCase().includes("mercedes benz");

    return (
        <>
            <div className="md:block hidden w-full">
                <div
                    className={`${
                        // busType === "luxury"
                        LuxuryFind(bus_type) === true
                            ? "bg-[#FFEEC9]" : "bg-[#EEEDED]"
                        } h-auto md:rounded-[0.5vw] px-[1vw]`}
                >
                    <div className="grid grid-cols-2 ">
                        <div className="flex flex-col  justify-start px-[1vw]">
                            <p
                                className={`${
                                    // busType === "luxury"
                                    LuxuryFind(bus_type) === true
                                        ? "text-[#393939]" : "text-[#1F487C]"
                                    } text-[1.25vw] font-extrabold py-[1vw]`}
                            >
                                BOARDING
                            </p>
                            {/* <div className='w-[30vw] h-[20vw] overflow-x-auto'>
                                <div className=" h-[12.5vw] w-[20vw] flex flex-col flex-wrap gap-x-[1.5vw] gap-y-[1.5vw]">
                                    {boarding.map((item) => (
                                        <div className='flex gap-[1vw]'>
                                            <div className='text-[1.1vw] text-[#1F487C] font-bold'>{`${dayjs(item.time).format('HH:mm')}`}</div>
                                            <div className='text-[1.1vw] text-[#1F487C]'>{item.name}</div>
                                        </div>
                                    ))}
                                </div>
                            </div> */}

                            <div className="grid grid-cols-2">
                                {boarding?.map((item) => {
                                    // Split the string item by '^'
                                    const parts = item.split('^');
                                     // console.log(parts, 'parts_dropping')
                                    // Ensure we have enough parts in the split string
                                    if (parts.length >= 3) {
                                        const place = parts[0];  // "Ameerpet"
                                        const time = parts[1];   // "09:00 PM"
                                        const id = parts[2];     // "6"

                                        return (
                                            <div className="flex gap-x-[1vw] pb-[.7vw] items-center" key={id}>


                                                <div className={`${
                                                    // busType === "luxury"
                                                    LuxuryFind(bus_type) === true
                                                        ? "text-[#393939]" : "text-[#1F487C]"} text-[1.1vw] cursor-pointer flex items-center gap-x-[1vw]`}>
                                                    <span className="font-bold">{time}</span>

                                                    <span>
                                                        {place?.length > 15 ? (
                                                            <Popover content={place}>
                                                                <div
                                                                    className={`${
                                                                        // busType === "luxury"
                                                                        LuxuryFind(bus_type) === true
                                                                            ? "text-[#393939]" : "text-[#1F487C]"} text-[1.1vw] cursor-pointer`}
                                                                >
                                                                    {place?.substr(0, 15)}...
                                                                </div>
                                                            </Popover>
                                                        ) : (
                                                            <div
                                                                className={`${
                                                                    // busType === "luxury"
                                                                    LuxuryFind(bus_type) === true
                                                                        ? "text-[#393939]" : "text-[#1F487C]"} text-[1.1vw]`}
                                                            >
                                                                {place}
                                                            </div>
                                                        )}
                                                    </span>
                                                </div>
                                            </div>

                                        );
                                    }

                                    return null;  // If the parts don't have the expected structure, return null.
                                })}
                            </div>
                        </div>
                        <div className="flex flex-col justify-start px-[1vw]">
                            <p
                                className={`${
                                    // busType === "luxury"
                                    LuxuryFind(bus_type) === true
                                        ? "text-[#393939]" : "text-[#1F487C]"
                                    } text-[1.25vw] font-extrabold py-[1vw]`}
                            >
                                DROPPING
                            </p>
                            {/* <div className='w-[30vw] h-[20vw] overflow-x-auto'>
                                <div className=" h-[12.5vw] w-[24vw] flex flex-col flex-wrap gap-x-[1.5vw] gap-y-[1.5vw]">
                                    {dropping.map((item) => (
                                        <div className='flex gap-[1vw]'>
                                            <div className='text-[1.1vw] text-[#1F487C] font-bold'>{`${dayjs(item.time).format('HH:mm')} (${dayjs(item.time).format('DD')} ${dayjs(item.time).format('MMM')})`}</div>
                                            <div className='text-[1.1vw] text-[#1F487C]'>{item.name}</div>
                                        </div>
                                    ))}
                                </div>
                            </div> */}
                            <div className="grid grid-cols-2">
                                {dropping?.map((item) => {
                                    // Split the string item by '^'
                                    const parts = item.split('^');

                                    // Ensure we have enough parts in the split string
                                    if (parts.length >= 3) {
                                        const place = parts[1];
                                        const time = parts[2];
                                        const id = parts[0];

                                        return (
                                            <div className="flex gap-x-[1vw] pb-[.7vw] items-center" key={id}>


                                                <div className={`${
                                                    // busType === "luxury"
                                                    LuxuryFind(bus_type) === true
                                                        ? "text-[#393939]" : "text-[#1F487C]"} text-[1.1vw] cursor-pointer flex items-center gap-x-[1vw]`}>
                                                    <span className="font-bold">{time}</span>

                                                    <span>
                                                        {place?.length > 15 ? (
                                                            <Popover content={place}>
                                                                <div
                                                                    className={`${
                                                                        // busType === "luxury"
                                                                        LuxuryFind(bus_type) === true
                                                                            ? "text-[#393939]" : "text-[#1F487C]"} text-[1.1vw] cursor-pointer`}
                                                                >
                                                                    {place?.substr(0, 15)}...
                                                                </div>
                                                            </Popover>
                                                        ) : (
                                                            <div
                                                                className={`${
                                                                    // busType === "luxury"
                                                                    LuxuryFind(bus_type) === true
                                                                        ? "text-[#393939]" : "text-[#1F487C]"} text-[1.1vw]`}
                                                            >
                                                                {place}
                                                            </div>
                                                        )}
                                                    </span>
                                                </div>
                                            </div>

                                        );
                                    }

                                    return null;  // If the parts don't have the expected structure, return null.
                                })}

                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </>
    );
};

