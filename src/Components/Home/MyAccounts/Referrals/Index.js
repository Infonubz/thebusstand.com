import React, { useState } from "react";
import refer from "../../../../assets/refer.png";
import {
  FacebookIcon,
  FacebookShareButton,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
  XIcon,
} from "react-share";
import { IoShareSocialOutline, IoShareSocialSharp } from "react-icons/io5";
import { FaMobileScreen } from "react-icons/fa6";
import { BiSolidOffer } from "react-icons/bi";
import { GiReceiveMoney } from "react-icons/gi";

export default function ReferralsIndex() {
  const [currenttab, setCurrentTab] = useState(1);
  return (
    <div className="bg-white w-full rounded-[1vw]">
      <img
        src={refer}
        // className="rotate-90"
        // style={{
        //   rotate: 90,
        // }}
        // style={{ transform: "rotate(90deg)" }}
      />
      {/* <label>hi</label> */}

      <div className="flex items-center justify-between px-[3vw] py-[1vw]">
        <div className="flex items-center gap-[3vw]">
          <div className="flex flex-col">
            <label className="text-[1.2vw] text-[#1F487C] font-semibold">
              Your referral code
            </label>
            <div className="bg-[#04B9EF] w-[10vw] flex items-center border-dashed rounded-[0.2vw] border-[0.1vw] relative border-[#1F487C]">
              <label className="text-white text-[1.2vw] pl-[1vw]">
                MI487661
              </label>
              <div className="border-[0.15vw] border-white h-[0.8vw] w-[0.8vw] absolute right-[1vw] top-[0.4vw] rounded-[0.2vw]"></div>
              <div className="border-[0.15vw] border-white h-[0.8vw] w-[0.8vw] bg-[#04B9EF] absolute right-[0.8vw] top-[0.6vw] rounded-[0.2vw]"></div>
            </div>
          </div>
          <div className="flex flex-col">
            <label className="text-[1.2vw] text-[#1F487C] font-semibold">
              Share On Social
            </label>
            <div className="flex items-center gap-x-[0.5vw]">
              <WhatsappShareButton url={"hi"} title={"hi"}>
                <WhatsappIcon className="rounded-full" size={"1.5vw"} />
              </WhatsappShareButton>
              <TwitterShareButton url={"hi"} title={"hi"}>
                <XIcon size={"1.5vw"} className="text-red-600 rounded-full" />
              </TwitterShareButton>
              <FacebookShareButton url={"hi"} title={"hi"}>
                <FacebookIcon size={"1.5vw"} className="rounded-full" />
              </FacebookShareButton>
              <IoShareSocialOutline size={"1.5vw"} color="#1F487C" />
            </div>
          </div>
        </div>
        <div className="flex items-center gap-[5vw]">
          <button
            className={`${
              currenttab == 1 ? "border-b-[0.2vw] border-[#1F487C]" : ""
            } text-[#1F487C] text-[1.5vw] font-bold`}
            onClick={() => setCurrentTab(1)}
          >
            Refer and Earn
          </button>
          <button
            className={`${
              currenttab == 2 ? "border-b-[0.2vw] border-[#1F487C]" : ""
            } text-[#1F487C] text-[1.5vw] font-bold`}
            onClick={() => setCurrentTab(2)}
          >
            Referral History
          </button>
        </div>
      </div>
      {currenttab == 1 ? (
        <>
          <div className="flex items-center justify-center">
            <label className="text-[#1F487C] text-[1.3vw] font-semibold">
              How it works
            </label>
          </div>
          <div className="grid grid-cols-2 px-[3vw] justify-between gap-x-[12vw] py-[1vw]">
            <div className="col-span-1 flex gap-x-[1vw] items-center">
              <span className="border-[0.1vw] border-[#1F487C] rounded-[0.5vw] p-[0.5vw]">
                <IoShareSocialSharp size={"3vw"} color="#1F487C" className="" />
              </span>
              <label className="text-[0.9vw] text-[#1F487C]">
                Share your unique referral code with your friends and family to
                earn referral benefits. The more you share, the more benefits
                you get!
              </label>
            </div>
            <div className="col-span-1 flex gap-x-[1vw]  items-center">
              <span className="border-[0.1vw] border-[#1F487C] rounded-[0.5vw] p-[0.5vw]">
                <FaMobileScreen size={"3vw"} color="#1F487C" className="" />
              </span>
              <label className="text-[0.9vw] text-[#1F487C]">
                Your friend must install the Tbs app and enter your unique code
                while signing up.
              </label>
            </div>
          </div>
          <div className="grid grid-cols-2 px-[3vw] justify-between gap-x-[12vw] py-[1vw]">
            <div className="col-span-1 flex gap-x-[1vw] items-center">
              <span className="border-[0.1vw] border-[#1F487C] rounded-[0.5vw] p-[0.5vw]">
                <GiReceiveMoney size={"3vw"} color="#1F487C" className="" />
              </span>
              <label className="text-[0.9vw] text-[#1F487C]">
                Once they successfully sign up, they will receive a voucher of
                ₹250 instant discount + ₹250 cashback that can be availed on
                their first ever booking.
              </label>
            </div>
            <div className="col-span-1 flex gap-x-[1vw]  items-center">
              <span className="border-[0.1vw] border-[#1F487C] rounded-[0.5vw] p-[0.5vw]">
                <BiSolidOffer size={"3vw"} color="#1F487C" className="" />
              </span>
              <label className="text-[0.9vw] text-[#1F487C]">
                After the completion of their first travel you will receive a
                discount voucher worth ₹150.
              </label>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <label className="text-[#1F487C] text-[1.3vw] font-semibold py-[1vw]">
              Terms & Conditions
            </label>
          </div>
        </>
      ) : (
        <div className="flex items-center  justify-end mt-[2vw] pr-[3vw]">
          <div className="flex flex-col w-[20vw]">
            <div className="border-[#1F487C] flex flex-col border-[0.1vw] py-[0.2vw] h-[4vw]  pl-[1vw] w-full rounded-[1vw]">
              <label className="text-[#1F487C] text-[1.1vw]">₹ 0</label>
              <label className="text-[#1F487C] font-semibold text-[1.1vw]">
                Total Rewards
              </label>
            </div>
            <label className="text-[#1F487C] text-[1.2vw] font-bold text-center pt-[2vw]">
              No referrals yet!
            </label>
            <label className="text-[#1F487C] text-[1vw] text-center py-[1vw]">
              Start referring your friends and earn rewards
            </label>
            <label className="text-[#1F487C] text-[1.2vw] text-center font-semibold pb-[2vw]">
              Terms & Conditions
            </label>
          </div>
        </div>
      )}
    </div>
  );
}
