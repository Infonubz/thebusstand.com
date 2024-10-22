import { Calendar, Drawer } from "antd";
import React from "react";
import { FaArrowRight } from "react-icons/fa";

export default function SourceNavbar() {
  return (
    <div className="flex px-[2vw] items-center justify-between h-full md:hidden block">
      <div className="flex flex-col ">
        <div className="flex gap-x-[2vw] items-center">
          <div className="text-[4.5vw] text-white font-semibold">
            {fromValue}
          </div>
          <div className="text-white">
            <FaArrowRight />
          </div>
          <div className="text-[5vw] text-white font-semibold">{toValue}</div>
        </div>
        <div className="mt-[-2vw]">
          <label className="text-gray-300 text-[3vw]">{`Showing ${totalbuses?.length} Buses on this route`}</label>
        </div>
      </div>
      <div>
        <button
          onClick={showDrawer}
          className="px-[4vw] h-[7vw] flex items-center justify-center bg-white text-[#1F487C] rounded-full shadow-lg"
        >
          <div className="text-center text-[3.5vw] flex font-extrabold">
            {/* <span className="text-[4.5vw]">
                    <MdKeyboardArrowLeft />
                  </span>{" "} */}
            <span>{mobileformattedDate}</span>{" "}
            {/* <span className="text-[4.5vw]">
                    <MdKeyboardArrowRight />
                  </span> */}
          </div>
        </button>
        <Drawer
          title="Select Date"
          placement="bottom"
          closable={false}
          onClose={onClosee}
          open={openDatee}
          height="50%" // Adjust height as needed
          bodyStyle={{ padding: 0 }} // Removes extra padding
          className="flex justify-center md:hidden"
        >
          <div className="flex items-center justify-center">
            <Calendar
              onChange={(date) => {
                setSelectedDatee(date);
                setFromDate(date);
                onClosee(); // Close drawer on date select
              }}
              value={selectedDatee}
              minDate={new Date()}
              style={{ width: "100%" }}
            />
          </div>
        </Drawer>
      </div>
    </div>
  );
}
