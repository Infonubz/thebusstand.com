import React from 'react'
import { useSelector } from "react-redux";

export default function About() {

    const colors = useSelector((state) => state.themecolors[0]);

  return (
   <>
        <div className="px-[6.55vw] my-[1vw]">
        <p className={`md:text-[1.5vw] text-[4vw] text-[${colors.primary}] font-bold`}>
          Why Booking Buses with thebusstand.com ?{" "}
        </p>
        <p className="md:text-[1.1vw] text-[3vw] md:leading-[2.5vw] leading-[5vw] tracking-wide  md:tracking-wider mt-[1vw]">
          <span className="font-bold md:text-[1.3vw] text-[2.8vw]">
            thebusstand.com
          </span>
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
   </>
  )
}
