import React, { useEffect } from "react";
import booking_bus from "../../../../assets/booking_bus.png";
import { FaArrowRightLong } from "react-icons/fa6";
import dayjs from "dayjs";
import { IoPersonOutline } from "react-icons/io5";
import { LuDownload } from "react-icons/lu";
import empty from "../../../../assets/empty.png";

export default function MobileUpcoming() {
    const UpcomingDetails = [
        {
            depature: "Chennai",
            arraival: "Coimbatore",
            status: "Completed",
            trip_type: "One Way Bus",
            booking_id: "NU123456789101234",
            depature_date: new Date(),
            arraival_date: new Date(),
            depature_time: "11:30 PM",
            arraival_time: "05:30 AM",
            passenger_name: ["Mithun Kumar"],
            bus_name: "InterCity SmartBus",
            boarding_point: "Gandhipuram 1"
        },
        {
            depature: "Chennai",
            arraival: "Coimbatore",
            status: "Completed",
            trip_type: "One Way Bus",
            booking_id: "NU123456789101234",
            depature_date: new Date(),
            arraival_date: new Date(),
            depature_time: "11:30 PM",
            arraival_time: "05:30 AM",
            passenger_name: ["Mithun Kumar", "Subash"],
            bus_name: "InterCity SmartBus",
            boarding_point: "Gandhipuram 1"
        },
        {
            depature: "Chennai",
            arraival: "Coimbatore",
            status: "Completed",
            trip_type: "One Way Bus",
            booking_id: "NU123456789101234",
            depature_date: new Date(),
            arraival_date: new Date(),
            depature_time: "11:30 PM",
            arraival_time: "05:30 AM",
            passenger_name: ["Mithun Kumar", "Subash", "Manoj"],
            bus_name: "InterCity SmartBus",
            boarding_point: "Gandhipuram 1"
        },
        {
            depature: "Chennai",
            arraival: "Coimbatore",
            status: "Completed",
            trip_type: "One Way Bus",
            booking_id: "NU123456789101234",
            depature_date: new Date(),
            arraival_date: new Date(),
            depature_time: "11:30 PM",
            arraival_time: "05:30 AM",
            passenger_name: ["Mithun Kumar", "Subash"],
            bus_name: "InterCity SmartBus",
            boarding_point: "Gandhipuram 1"
        },
        {
            depature: "Chennai",
            arraival: "Coimbatore",
            status: "Completed",
            trip_type: "One Way Bus",
            booking_id: "NU123456789101234",
            depature_date: new Date(),
            arraival_date: new Date(),
            depature_time: "11:30 PM",
            arraival_time: "05:30 AM",
            passenger_name: ["Mithun Kumar", "Subash"],
            bus_name: "InterCity SmartBus",
            boarding_point: "Gandhipuram 1"
        },
    ];
    useEffect(() => {
        if (UpcomingDetails.map((item) => item.passenger_name.length > 3)) {
            const passengerlist = UpcomingDetails.map((item) => {
                return item.passenger_name.slice(3);
            });
            console.log(passengerlist, "passengerlist");
        }
    }, [UpcomingDetails]);
    return (
        <div>
            {UpcomingDetails.length > 0 ? (
                <div className=" overflow-y-scroll">
                    {UpcomingDetails.map((item) => (
                        <div className="w-full h-full py-[2vw] ">
                            <div className="bg-white flex flex-col gap-[1vw] py-[2vw]">
                                <div className="grid grid-cols-2 ">
                                    <div className="flex flex-col justify-center items-center gap-[0.5vw]">
                                        <div
                                            className="bg-white w-[8vw] h-[8vw] border-[0.2vw] rounded-full border-[#8EA3BD] flex items-center justify-center"
                                        >
                                            <img src={booking_bus} className="w-[7vw] h-[7vw]" />
                                        </div>
                                        <div className="text-[3.5vw]">
                                            <div className="text-center text-[#1F487C] font-bold">{dayjs(item.depature_date).format("DD")}</div>
                                            <div className="text-center text-[#1F487C] font-bold">{dayjs(item.depature_date).format("dddd")}</div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col justify-start px-[3vw]">
                                        <div className=" w-full flex justify-end text-[3vw] text-[#FF7C03]">UPCOMING</div>
                                        <div className="text-[#1F487C] text-[3vw]">Bus Ticket</div>
                                        <div>
                                            <label className="text-[4vw] text-[#1F487C] font-bold">
                                                {item.depature}
                                            </label>
                                            -
                                            <label className="text-[4vw] text-[#1F487C] font-bold">
                                                {item.arraival}
                                            </label>
                                        </div>
                                        <div className="text-[3.5vw] text-[#1F487C]">{item.bus_name}</div>
                                    </div>
                                </div>
                                <div className="w-full border-b-[0.5vw] border-slate-400 border-dashed"></div>
                                <div className="grid grid-cols-2  ">
                                    <div className="text-center text-[#1F487C] text-[3vw]">{dayjs(item.depature_date).format("MMM YYYY").toLocaleUpperCase()}</div>
                                    <div className="text-[3vw] text-[#1F487C] flex flex-col justify-start px-[3vw]">Boarding: {item.boarding_point}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="flex flex-col gap-y-[5vw] justify-center items-center mt-[5vw]">
                    <img src={empty} className="w-[50vw] h-[50vw]" />
                    <div className="flex flex-col gap-y-[5vw]  items-center justify-center">
                        <label className="text-[4vw] text-[#1F487C] font-bold w-full">
                            Looks empty, you’ve no cancelled bookings
                        </label>
                        <label className="text-[4vw]  text-[#1F487C] items-center gap-[0.5vw] w-full">
                            Looks like you don’t have any cancelled trips
                        </label>
                        <button className="bg-[#1F487C] mt-[1vw] w-[32vw] text-white font-bold text-[4vw] h-[8vw] rounded-full">
                            Plan a Trip
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
