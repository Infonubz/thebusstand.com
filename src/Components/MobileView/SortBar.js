import React from "react";

export default function SortBar({ sorting, setSorting }) {
  const handleSortingClick = (value) => {
    setSorting(value);
    sessionStorage.setItem("mbleSort", value);
    console.log(value, "tooovalue");
  };
  return (
    <>
      <div className="flex justify-between px-[6vw]">
        <p className="text-[5vw] font-bold pb-[3vw] order-first">SORT BY:</p>
        <p
          className="order-last text-[5vw] underline pb-[3vw]"
          onClick={() => {
            setSorting("");
          }}
        >
          Clear
        </p>
      </div>
      <div className="grid grid-rows-5 gap-[2vw] px-[6vw]">
        <label className="flex items-center justify-start gap-[5vw]">
          <div className="flex items-center">
            <input
              type="radio"
              onClick={() => {
                const newValue = sorting === "mblePrice" ? "" : "mblePrice";
                setSorting(newValue);
                handleSortingClick(newValue);
              }}
              value="mblePrice"
              checked={sorting === "mblePrice"}
              className="w-[5vw] h-[5vw]"
            />
          </div>
          <p
            className={`
      ${sorting === "mblePrice" ? "text-[#1F487C] font-bold" : "text-black "}  
      text-[5vw] 
    `}
          >
            Price - Low to High
          </p>
        </label>
        <label className="flex items-center justify-start gap-[5vw]">
          <div className="flex items-center">
            <input
              type="radio"
              onClick={() => {
                const newValue = sorting === "mbleSeats" ? "" : "mbleSeats";
                setSorting(newValue);
                handleSortingClick(newValue);
              }}
              value="mbleSeats"
              checked={sorting === "mbleSeats"}
              className="w-[5vw] h-[5vw]"
            />
          </div>
          <p
            className={`
      ${sorting === "mbleSeats" ? "text-[#1F487C] font-bold" : "text-black "}  
      text-[5vw] 
    `}
          >
            Seats - High to Low
          </p>
        </label>
        <label className="flex items-center justify-start gap-[5vw]">
          <div className="flex items-center">
            <input
              type="radio"
              onClick={() => {
                const newValue = sorting === "mbleRatings" ? "" : "mbleRatings";
                setSorting(newValue);
                handleSortingClick(newValue);
              }}
              value="mbleRatings"
              checked={sorting === "mbleRatings"}
              className="w-[5vw] h-[5vw]"
            />
          </div>
          <p
            className={`
      ${sorting === "mbleRatings" ? "text-[#1F487C] font-bold" : "text-black "}  
      text-[5vw] 
    `}
          >
            Best Rated First
          </p>
        </label>
        <label className="flex items-center justify-start gap-[5vw]">
          <div className="flex items-center">
            <input
              type="radio"
              onClick={() => {
                const newValue = sorting === "mbleArrivalSort" ? "" : "mbleArrivalSort";
                setSorting(newValue);
                handleSortingClick(newValue);
              }}
              value="mbleArrivalSort"
              checked={sorting === "mbleArrivalSort"}
              className="w-[5vw] h-[5vw]"
            />
          </div>
          <p
            className={`
      ${
        sorting === "mbleArrivalSort" ? "text-[#1F487C] font-bold" : "text-black "
      }  
      text-[5vw] 
    `}
          >
            Early Arrival
          </p>
        </label>
        <label className="flex items-center justify-start gap-[5vw]">
          <div className="flex items-center">
            <input
              type="radio"
              onClick={() => {
                const newValue =
                  sorting === "mbleDepartureSort" ? "" : "mbleDepartureSort";
                console.log(newValue, "new_value");
                setSorting(newValue);
                handleSortingClick(newValue);
              }}
              value="mbleDepartureSort"
              checked={sorting === "mbleDepartureSort"}
              className="w-[5vw] h-[5vw]"
            />
          </div>
          <p
            className={`
      ${
        sorting === "mbleDepartureSort" ? "text-[#1F487C] font-bold" : "text-black "
      }  
      text-[5vw] 
    `}
          >
            Early Departure{" "}
          </p>
        </label>
      </div>
    </>
  );
}
