import React from "react";

export default function SortBar({ sorting, setSorting }) {
  const handleSortingClick = (value) => {
    setSorting(value);
    //localStorage.setItem("sort", value);
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
                const newValue = sorting === "price" ? "" : "price";
                setSorting(newValue);
                handleSortingClick(newValue);
              }}
              value="price"
              checked={sorting === "price"}
              className="w-[5vw] h-[5vw]"
            />
          </div>
          <p
            className={`
      ${sorting === "price" ? "text-[#1F487C] font-bold" : "text-black "}  
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
                const newValue = sorting === "seats" ? "" : "seats";
                setSorting(newValue);
                handleSortingClick(newValue);
              }}
              value="seats"
              checked={sorting === "seats"}
              className="w-[5vw] h-[5vw]"
            />
          </div>
          <p
            className={`
      ${sorting === "seats" ? "text-[#1F487C] font-bold" : "text-black "}  
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
                const newValue = sorting === "ratings" ? "" : "ratings";
                setSorting(newValue);
                handleSortingClick(newValue);
              }}
              value="ratings"
              checked={sorting === "ratings"}
              className="w-[5vw] h-[5vw]"
            />
          </div>
          <p
            className={`
      ${sorting === "ratings" ? "text-[#1F487C] font-bold" : "text-black "}  
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
                const newValue = sorting === "arrivalSort" ? "" : "arrivalSort";
                setSorting(newValue);
                handleSortingClick(newValue);
              }}
              value="arrivalSort"
              checked={sorting === "arrivalSort"}
              className="w-[5vw] h-[5vw]"
            />
          </div>
          <p
            className={`
      ${
        sorting === "arrivalSort" ? "text-[#1F487C] font-bold" : "text-black "
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
                  sorting === "departureSort" ? "" : "departureSort";
                console.log(newValue, "new_value");
                setSorting(newValue);
                handleSortingClick(newValue);
              }}
              value="departureSort"
              checked={sorting === "departureSort"}
              className="w-[5vw] h-[5vw]"
            />
          </div>
          <p
            className={`
      ${
        sorting === "departureSort" ? "text-[#1F487C] font-bold" : "text-black "
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
