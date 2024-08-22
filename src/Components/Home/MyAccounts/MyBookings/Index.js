import React, { useState } from "react";
import Upcoming from "./Upcoming";
import Completed from "./Completed";
import Cancelled from "./Cancelled";

export default function MyBookingIndex() {
  const [currenttab, setCurrentTab] = useState(1);
  return (
    <div>
      <div className="grid grid-cols-3 w-full h-[5vw] border-b-[0.1vw] border-[#1F487C]">
        <button
          className={`${
            currenttab == 1
              ? "bg-[#1F487C] text-[white]"
              : "bg-white text-[#1F487C]"
          } rounded-tl-[0.9vw] text-[1.3vw] font-bold`}
          onClick={() => setCurrentTab(1)}
        >
          UPCOMING
        </button>
        <button
          className={`${
            currenttab == 2
              ? "bg-[#1F487C] text-[white]"
              : "bg-white text-[#1F487C]"
          }  text-[1.3vw] font-bold`}
          onClick={() => setCurrentTab(2)}
        >
          COMPLETED
        </button>
        <button
          className={`${
            currenttab == 3
              ? "bg-[#1F487C] text-[white]"
              : "bg-white text-[#1F487C]"
          } rounded-tr-[0.9vw] text-[1.3vw] font-bold`}
          onClick={() => setCurrentTab(3)}
        >
          CANCELLED
        </button>
      </div>
      <div className="">
        {currenttab == 1 ? (
          <Upcoming />
        ) : currenttab == 2 ? (
          <Completed />
        ) : (
          <Cancelled />
        )}
      </div>
    </div>
  );
}
