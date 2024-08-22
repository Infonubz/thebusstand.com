import React from "react";
import booking_bus from "../../../../assets/booking_bus.png";
import { FaArrowRightLong } from "react-icons/fa6";
import dayjs from "dayjs";
import { IoPersonOutline } from "react-icons/io5";
import { LuDownload } from "react-icons/lu";
import empty from "../../../../assets/empty.png";

export default function Completed() {
  const completedDetails = [
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
      passenger_name: "Mithun Kumar",
    },
  ];
  return (
    <div>
      {completedDetails.length > 0 ? (
        <div className="h-[35vw] overflow-y-scroll">
          {completedDetails.map((item) => (
            <div className="grid grid-rows-5 w-full h-[15vw] bg-white mt-[1vw] border-[0.1vw] border-gray-400 relative">
              <div className="absolute left-[-1.5vw] top-[1.6vw] ">
                <div
                  className="bg-white w-[2.5vw] h-[2.5vw] border-[0.2vw] rounded-full border-[#8EA3BD] flex items-center justify-center"
                  style={{
                    zIndex: -1,
                  }}
                >
                  <img src={booking_bus} className="w-[1.7vw] h-[1.7vw]" />
                </div>
              </div>
              <div className="row-span-2 w-full border-b-[0.1vw] border-gray-400 ">
                <div className="grid grid-cols-4 w-full h-full flex-col items-center ">
                  <div className="col-span-3 flex flex-col gap-y-[0.5vw] pl-[4vw]">
                    <div className="flex items-center">
                      <label className="text-[1.1vw] text-[#1F487C] font-bold">
                        {item.depature}
                      </label>
                      <span className="px-[0.5vw]">
                        <FaArrowRightLong color="#1F487C" />
                      </span>
                      <label className="text-[1.1vw] text-[#1F487C] font-bold">
                        {item.arraival}
                      </label>
                    </div>
                    <div className="flex items-center gap-x-[0.5vw]">
                      <label className="text-[1.1vw] text-[#1F487C]">
                        {item.status}
                      </label>
                      <div className="h-[0.5vw] w-[0.5vw] bg-[#1F487C] rounded-full"></div>
                      <label className="text-[1.1vw] text-[#1F487C] font-bold">
                        {item.trip_type}
                      </label>
                      <div className="h-[0.5vw] w-[0.5vw] bg-[#1F487C] rounded-full"></div>
                      <label className="text-[1.1vw] text-[#1F487C] ">
                        {`Booking ID - ${item.booking_id}`}
                      </label>
                    </div>
                  </div>
                  <div className="col-span-1 flex items-center justify-center">
                    <button className="bg-[#1F487C] text-[1.1vw] font-bold rounded-full text-white w-[15vw] h-[3vw]">
                      VIEW BOOKING
                    </button>
                  </div>
                </div>
              </div>
              <div className=" row-span-3 w-full pl-[4vw] h-full pr-[2vw]">
                <div className="flex items-center h-full justify-between">
                  <div className="flex flex-col gap-y-[0.5vw]">
                    <label className="text-[1.1vw] text-[#1F487C] ">From</label>
                    <label className="flex items-center gap-[0.5vw]">
                      <span className="text-[1.1vw] text-[#1F487C] font-bold">
                        {dayjs(item.depature_date).format("DD MMM' YY")}
                      </span>
                      <span className="text-[1.1vw] text-[#1F487C] ">
                        {item.arraival_time}
                      </span>
                    </label>
                    <label className="text-[1.1vw] text-[#1F487C] font-bold ">
                      {item.depature}
                    </label>
                  </div>
                  <div className="flex flex-col gap-y-[0.5vw]">
                    <label className="text-[1.1vw] text-[#1F487C] ">From</label>
                    <label className="flex items-center gap-[0.5vw]">
                      <span className="text-[1.1vw] text-[#1F487C] font-bold">
                        {dayjs(item.depature_date).format("DD MMM' YY")}
                      </span>
                      <span className="text-[1.1vw] text-[#1F487C] ">
                        {item.arraival_time}
                      </span>
                    </label>
                    <label className="text-[1.1vw] text-[#1F487C] font-bold ">
                      {item.arraival}
                    </label>
                  </div>
                  <div className="flex flex-col gap-y-[0.5vw]">
                    <label className="flex items-center gap-x-[0.5vw]">
                      <span>
                        <IoPersonOutline size={"1.2vw"} color={"#1F487C"} />
                      </span>
                      <span className="text-[1.1vw] text-[#1F487C] font-bold ">
                        {item.passenger_name}
                      </span>
                    </label>
                  </div>
                  <div className="flex flex-col gap-y-[0.5vw]">
                    <label className="flex items-center gap-x-[0.5vw]">
                      <span>
                        <LuDownload size={"1.2vw"} color={"#1F487C"} />
                      </span>
                      <span className="text-[1.1vw] text-[#1F487C] font-bold ">
                        Download Invoice
                      </span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex gap-x-[3vw] items-center pt-[3vw] justify-center">
          <img src={empty} className="w-[12vw] h-[13vw]" />
          <div className="flex flex-col gap-y-[0.5vw]">
            <label className="text-[2vw] text-[#1F487C] font-bold ">
              Looks empty, you’ve no cancelled bookings
            </label>
            <label className="flex text-[1.2vw] text-[#1F487C] items-center gap-[0.5vw]">
              Looks like you don’t have any cancelled trips
            </label>
            <button className="bg-[#1F487C] mt-[1vw] w-[12vw] text-white font-bold text-[1.2vw] h-[3vw] rounded-full">
              Plan a Trip
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
