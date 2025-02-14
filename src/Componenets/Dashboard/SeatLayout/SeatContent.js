import React from "react";
import men_se from "../../../Assets/Seats/men_se.png";
import men_se_sel from "../../../Assets/Seats/men_se_sel.png";
import men_se_book from "../../../Assets/Seats/se_men_book.png";
import women_se from "../../../Assets/Seats/women_se.png";
import women_se_sel from "../../../Assets/Seats/women_se_sel.png";
import women_se_book from "../../../Assets/Seats/se_women_book.png";
import unisex_book from "../../../Assets/Seats/unisex_se_book.png";
import unisex_se_sel from "../../../Assets/Seats/unisex_se_sel.png";
import unisex_se from "../../../Assets/Seats/unisex_se.png";

export default function SeatContent() {
  return (
    <div>
      <div className="grid grid-rows-4 gap-[0.5vw]">
        <div className="row-span-1">
          <div className="grid grid-cols-6">
            <div className="col-span-3"></div>
            <div className="col-span-1 items-center justify-center flex">
              <p className="font-bold text-[0.8vw]">Unisex</p>
            </div>
            <div className="col-span-1 items-center justify-center flex">
              <p className="font-bold text-[0.8vw]">Men</p>
            </div>
            <div className="col-span-1 items-center justify-center flex">
              <p className="font-bold text-[0.8vw]">Women</p>
            </div>
          </div>
        </div>
        <div className="row-span-1">
          <div className="grid grid-cols-6">
            <div className="col-span-3">Available</div>
            <div className="col-span-1 items-center justify-center flex">
              {" "}
              <img src={unisex_se} className="w-[1.5vw] h-[1.5vw]" alt="" />
            </div>
            <div className="col-span-1  items-center justify-center flex">
              {" "}
              <img src={men_se} className="w-[1.5vw] h-[1.5vw]" alt="" />
            </div>
            <div className="col-span-1  items-center justify-center flex">
              {" "}
              <img src={women_se} className="w-[1.5vw] h-[1.5vw]" alt="" />
            </div>
          </div>
        </div>
        <div className="row-span-1">
          <div className="grid grid-cols-6">
            <div className="col-span-3">Selected</div>
            <div className="col-span-1  items-center justify-center flex">
              <img src={unisex_se_sel} className="w-[1.5vw] h-[1.5vw]" alt="" />
            </div>
            <div className="col-span-1  items-center justify-center flex">
              <img src={men_se_sel} className="w-[1.5vw] h-[1.5vw]" alt="" />
            </div>
            <div className="col-span-1  items-center justify-center flex">
              <img src={women_se_sel} className="w-[1.5vw] h-[1.5vw]" alt="" />
            </div>
          </div>
        </div>
        <div className="row-span-1">
          <div className="grid grid-cols-6">
            <div className="col-span-3">Booked</div>
            <div className="col-span-1  items-center justify-center flex">
              <img src={unisex_book} className="w-[1.5vw] h-[1.5vw]" alt="" />
            </div>
            <div className="col-span-1  items-center justify-center flex">
              <img src={men_se_book} className="w-[1.5vw] h-[1.5vw]" alt="" />
            </div>
            <div className="col-span-1  items-center justify-center flex">
              <img src={women_se_book} className="w-[1.5vw] h-[1.5vw]" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
