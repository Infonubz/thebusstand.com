import React from "react";
import { useSelector } from "react-redux";

export default function About() {
  const colors = useSelector((state) => state.themecolors[0]);

  return (
    <>
      <div className="px-[6.55vw] my-[1vw]">
        <p
          className={`md:text-[1.5vw] text-[4vw] text-[${colors.primary}] font-bold`}
        >
          Why Booking Buses with thebusstand.com ?{" "}
        </p>
        {/* <p className="md:text-[1.1vw] text-[3vw] md:leading-[2.5vw] leading-[5vw] text-justify  tracking-wide  md:tracking-wider mt-[1vw]">
          <span className="font-bold md:text-[1.3vw] text-[2.8vw]">
            thebusstand.com
          </span>
          <span className="pl-[0.5vw]">
            is India's exclusive online bus ticketing platform, revolutionizing
            bus travel in the country by bringing ease and comfort to millions
            of Indians who commute by bus.
          </span>
        </p>
        <p className="md:text-[1.1vw] text-[3vw] md:leading-[2.5vw] leading-[5vw] tracking-wide text-justify   md:tracking-wider mt-[1vw]">
          <span className="font-bold md:text-[1.3vw] text-[2.8vw]">
            thebusstand.com
          </span>
          <span className="pl-[0.5vw]">
            enables you to book tickets from anywhere in India at the most
            affordable price. thebusstand.com offers innovative and bespoke bus
            booking solutions to help customers boost their profitability and
            efficiency.
          </span>
        </p>
        <p className="md:text-[1.1vw] text-[3vw] md:leading-[2.5vw] leading-[5vw]  text-justify tracking-wide  md:tracking-wider mt-[1vw]">
          <span className="font-bold md:text-[1.3vw] text-[2.8vw]">
            thebusstand.com
          </span>
          <span className="pl-[0.5vw]">
            ensures a comfortable payment experience for users by making wallet
            payments secure and speedy. It also allows you to book bus tickets
            in less than a minute and with no difficulty. Make sure your wallet
            has enough amount because it will allow you to check out faster.
            Having a registered thebusstand.com wallet can provide you with
            numerous perks.
          </span>
        </p>
        <p className="md:text-[1.1vw] text-[3vw] md:leading-[2.5vw] leading-[5vw] text-justify  tracking-wide  md:tracking-wider mt-[1vw]">
          <span className="">
            You can also choose from different payment methods such as
            debit/credit card or net banking. Thebusstand.com utilizes the most
            modern AI technologies to assist us make your travel experience more
            enjoyable.
          </span>
        </p> */}
        <ul style={{ listStyleType: "disc" }} className="pl-[3vw]">
          <li>
            <p className="md:text-[1.1vw] text-[3vw] md:leading-[2.5vw] leading-[5vw] text-justify  tracking-wide  md:tracking-wider mt-[1vw]">
              <span className="font-bold md:text-[1.3vw] text-[2.8vw]">
                thebusstand.com
              </span>
              <span className="pl-[0.5vw]">
                is India's exclusive online bus ticketing platform,
                revolutionizing bus travel in the country by bringing ease and
                comfort to millions of Indians who commute by bus.
              </span>
            </p>
          </li>
          <li>
            <p className="md:text-[1.1vw] text-[3vw] md:leading-[2.5vw] leading-[5vw] tracking-wide text-justify   md:tracking-wider mt-[1vw]">
              <span className="font-bold md:text-[1.3vw] text-[2.8vw]">
                thebusstand.com
              </span>
              <span className="pl-[0.5vw]">
                enables you to book tickets from anywhere in India at the most
                affordable price. thebusstand.com offers innovative and bespoke
                bus booking solutions to help customers boost their
                profitability and efficiency.
              </span>
            </p>
          </li>
          <li>
            <p className="md:text-[1.1vw] text-[3vw] md:leading-[2.5vw] leading-[5vw]  text-justify tracking-wide  md:tracking-wider mt-[1vw]">
              <span className="font-bold md:text-[1.3vw] text-[2.8vw]">
                thebusstand.com
              </span>
              <span className="pl-[0.5vw]">
                ensures a comfortable payment experience for users by making
                wallet payments secure and speedy. It also allows you to book
                bus tickets in less than a minute and with no difficulty. Make
                sure your wallet has enough amount because it will allow you to
                check out faster. Having a registered thebusstand.com wallet can
                provide you with numerous perks.
              </span>
            </p>
          </li>
          <li>
            <p className="md:text-[1.1vw] text-[3vw] md:leading-[2.5vw] leading-[5vw] text-justify  tracking-wide  md:tracking-wider mt-[1vw]">
              <span className="">
                You can also choose from different payment methods such as
                debit/credit card or net banking. Thebusstand.com utilizes the
                most modern AI technologies to assist us make your travel
                experience more enjoyable.
              </span>
            </p>
          </li>
        </ul>
      </div>
    </>
  );
}
