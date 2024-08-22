import React from "react";
import { Link } from "react-router-dom";


export default function BusOperator() {
  const BusOperator = [
    "SRS Travels",
    "VRL Travels",
    "JBT Travels",
    "Humsafar Travels",
    "Kallada Travels",
    "Chartered Speed",
    "Shatabdi Travels",
    "Mahasagar Travels",
    "SRS Travels",
    "VRL Travels",
    "JBT Travels",
    "Humsafar Travels",
    "Kallada Travels",
    "Chartered Speed",
    "Shatabdi Travels",
    "Mahasagar Travels",
    "SRS Travels",
    "VRL Travels",
    "JBT Travels",
    "Humsafar Travels",
    "Kallada Travels",
    "Chartered Speed",
    "Shatabdi Travels",
    "Mahasagar Travels",
  ];
  return (
    <div className="px-[5vw]">
      <div className=" w-full flex px-[2vw] items-center justify-between mt-[1vw] ">
        <p className="md:text-[1.5vw] text-[5vw] text-[#1F487C] font-bold">
          4500+ Private Bus Operators
        </p>
        <Link to='/BusOpp'><button className="text-[2.5vw] text-[#1F487C] md:border-[0.1vw] md:border-[#AAAAAA] md:px-[1.5vw] md:py-[0.2vw] md:rounded-full md:text-[1vw] md:bg-white md:shadow-lg">
              View all
            </button></Link>
      </div>
      <div className="grid md:grid-cols-6 grid-cols-3 w-full  px-[2vw] my-[2vw] ">
        {BusOperator.map((item) => (
          <div className="col-span-1 w-full py-[0.8vw]">
            <p className="md:text-[1.2vw] text-[2.8vw]">{item}</p>
          </div>
        ))}
      </div>
      <div className="px-[2vw] my-[1vw]">
        <p className="md:text-[1.5vw] text-[4vw] text-[#1F487C] font-bold">
          Why Booking Buses with thebusstand.com ?{" "}
        </p>
        <p className="md:text-[1.1vw] text-[3vw] md:leading-[2.5vw] leading-[5vw] tracking-wide  md:tracking-wider mt-[1vw]">
          <span className="font-bold md:text-[1.3vw] text-[2.8vw]">thebusstand.com</span>
          <span className="pl-[0.5vw]">
            is India's largest brand for online bus ticket booking and offers an
            easy-to-use online bus ticket booking service, With over 36 million
            satisfied customers, 3500+ bus operators to choose from, and plenty
            of offers on bus ticket booking, thebusstand.com makes road journeys
            super convenient for travelers. A leading platform for booking bus
            tickets, thebusstand.com has been the leader in online bus booking
            over the past 17 years across thousands of cities and lakhs of
            routes in India.
          </span>
        </p>
        <p className="md:text-[1.1vw] text-[2.8vw] md:leading-[2.5vw] leading-[5vw] tracking-wide md:tracking-wider mt-[2.5vw]">
          Booking a bus ticket online on thebusstand.com app or website is very
          simple. You can download the thebusstand.com app or visit
          thebusstand.com and enter your source, destination & travel date to
          check the top-rated bus services available. You can then compare bus
          prices, user ratings & bus amenities, select your preferred seat,
          boarding & dropping points and make the payment using multiple payment
          options like UPI, debit or credit card, net banking and more. With
          thebusstand.com get assured safe & secure payment method
        </p>
      </div>
    </div>
  );
}
