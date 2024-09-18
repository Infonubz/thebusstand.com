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
import { IoIosArrowRoundBack } from "react-icons/io";
import CASHBACK from '../../../../assets/cash back.gif'
import BGSCREEN from '../../../../assets/BG Image.png'
import { useNavigate } from "react-router";
import dayjs from "dayjs";


export default function MobileReferrals() {
    const [currenttab, setCurrentTab] = useState(1);
    const navigation = useNavigate();

    const handlePrevPage = () => {
        localStorage.setItem('navigateBack', 'true');
        navigation('/dashboard', { state: { togglePage: true } });
    };

    const [isValue, SetIsValue] = useState()
    const time = new Date()
    const refferalList = [
        {
            name: "Vipin",
            date: <div>{dayjs(time).format("DD MMM YYYY")}</div>,
            price: "₹ 400"
        },
        {
            name: "Vipin",
            date: <div>{dayjs(time).format("DD MMM YYYY")}</div>,
            price: "₹ 400"
        },
        {
            name: "Vipin",
            date: <div>{dayjs(time).format("DD MMM YYYY")}</div>,
            price: "₹ 400"
        },
        {
            name: "Vipin",
            date: <div>{dayjs(time).format("DD MMM YYYY")}</div>,
            price: "₹ 400"
        },
        {
            name: "Vipin",
            date: <div>{dayjs(time).format("DD MMM YYYY")}</div>,
            price: "₹ 400"
        },
        {
            name: "Vipin",
            date: <div>{dayjs(time).format("DD MMM YYYY")}</div>,
            price: "₹ 400"
        },
        {
            name: "Vipin",
            date: <div>{dayjs(time).format("DD MMM YYYY")}</div>,
            price: "₹ 400"
        },
        {
            name: "Vipin",
            date: <div>{dayjs(time).format("DD MMM YYYY")}</div>,
            price: "₹ 400"
        },
    ]

    return (
        <>

            <div className='bg-[#E5FFF1] min-h-screen max-h-auto w-full'>
                <div className="relative">
                    <img src={BGSCREEN} className="bg-cover h-screen w-screen" />
                    <div className="absolute top-0">
                        <div className="w-screen h-[15vw] bg-[#1F487C] flex items-center justify-center">
                            <div className="col-span-2 "><IoIosArrowRoundBack color="white" size="10vw" onClick={handlePrevPage} /></div>
                            <div className="px-[2vw] text-[4.5vw] text-white font-bold flex gap-[2vw]"><p onClick={() => navigation('/dashboard')}>Home</p><p>{`>`}</p><p onClick={handlePrevPage}>My Account</p><p>{`>`}</p><p>Referrals</p></div>
                        </div>
                        <div className="mt-[2.5vw]">
                            <div>
                                <img src={CASHBACK}
                                    className="w-full " />
                            </div>
                            <div className="px-[5vw] py-[2vw]">
                                <div className="relative ">
                                    <div className="bg-white flex items-center justify-center gap-[5vw] py-[2vw] drop-shadow-xl">
                                        <div className="flex flex-col">
                                            <div className="bg-[#04B9EF] w-[40vw] h-[8vw] flex items-center justify-center border-dashed rounded-[1vw] border-[0.1vw] relative border-[#1F487C]">
                                                <label className="text-white text-[4vw] pl-[3vw]">
                                                    MI487661
                                                </label>
                                            </div>
                                            <div>
                                                <label className="text-[4.2vw] text-[#1F487C] font-semibold">
                                                    Your referral code
                                                </label>
                                            </div>
                                        </div>
                                        <div className="flex flex-col gap-y-[2vw] items-center justify-center">
                                            <div className="bg-[#1F487C] w-[24vw] h-[8vw] relative flex items-center justify-between px-[2vw] rounded-[1vw]">
                                                <div className="text-[4vw] text-white font-semibold order-last">Copy</div>
                                                <div>
                                                    <div className="border-[0.5vw] border-white h-[3.5vw] w-[3.5vw] absolute left-[3.5vw] top-[1.4vw] rounded-[0.2vw]"></div>
                                                    <div className="border-[0.5vw] border-white h-[3.5vw] w-[3.5vw] bg-[#1F487C] absolute left-[2.75vw] top-[2.2vw] rounded-[0.2vw]"></div>

                                                </div>
                                            </div>
                                            <div className="flex items-center justify-center gap-x-[1vw]">
                                                <WhatsappShareButton url={"hi"} title={"hi"}>
                                                    <WhatsappIcon className="rounded-full" size={"5vw"} />
                                                </WhatsappShareButton>
                                                <TwitterShareButton url={"hi"} title={"hi"}>
                                                    <XIcon size={"5vw"} className="text-red-600 rounded-full" />
                                                </TwitterShareButton>
                                                <FacebookShareButton url={"hi"} title={"hi"}>
                                                    <FacebookIcon size={"5vw"} className="rounded-full" />
                                                </FacebookShareButton>
                                                <IoShareSocialOutline size={"5vw"} color="#1F487C" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="absolute top-[6.5vw] left-[-3.5vw] w-[7vw] h-[7vw] bg-[#E5FFF1] rounded-full"></div>
                                    <div className="absolute top-[6.5vw] right-[-3.5vw] w-[7vw] h-[7vw] bg-[#E5FFF1] rounded-full"></div>
                                </div>
                            </div>
                            <div className="flex items-center justify-between gap-[5vw] w-full ">
                                <button
                                    className={`${currenttab == 1 ? "border-b-[0.2vw] border-[#1F487C]" : ""
                                        } text-[#1F487C] text-[5vw] font-bold order-first`}
                                    onClick={() => setCurrentTab(1)}
                                >
                                    <p className="px-[2vw]"> Refer and Earn</p>
                                </button>
                                <button
                                    className={`${currenttab == 2 ? "border-b-[0.2vw] border-[#1F487C]" : ""
                                        } text-[#1F487C] text-[5vw] font-bold order-last`}
                                    onClick={() => setCurrentTab(2)}
                                >
                                    <p className="px-[2vw]"> Referral History</p>
                                </button>
                            </div>
                            {currenttab == 1 ? (
                                <>
                                    <div className="flex px-[2vw] py-[3vw]">
                                        <label className="text-[#1F487C] text-[3.5vw] font-semibold">
                                            How it works:
                                        </label>
                                    </div>
                                    <div className=" px-[3vw] justify-between  py-[1vw] flex flex-col gap-y-[5vw]">
                                        <div className="col-span-1 flex gap-x-[1vw] items-center">
                                            <span className="w-[12vw] h-[12vw] border-[0.1vw] border-[#1F487C] bg-white rounded-[1.5vw] p-[0.5vw] flex items-center">
                                                <IoShareSocialSharp size={"9vw"} color="#1F487C" className="" />
                                            </span>
                                            <label className="text-[3vw] text-[#1F487C]">
                                                Share your unique referral code with your friends and family to
                                                earn referral benefits. The more you share, the more benefits
                                                you get!
                                            </label>
                                        </div>
                                        <div className="col-span-1 flex gap-x-[1vw]  items-center">
                                            <span className="w-[12vw] h-[12vw] border-[0.1vw] border-[#1F487C] bg-white rounded-[1.5vw] p-[0.5vw] flex items-center">
                                                <FaMobileScreen size={"9vw"} color="#1F487C" className="" />
                                            </span>
                                            <label className="text-[3vw] text-[#1F487C]">
                                                Your friend must install the Tbs app and enter your unique code
                                                while signing up.
                                            </label>
                                        </div>
                                        <div className="col-span-1 flex gap-x-[1vw] items-center">
                                            <span className="w-[12vw] h-[12vw] border-[0.1vw] border-[#1F487C] bg-white rounded-[1.5vw] p-[0.5vw] flex items-center">
                                                <GiReceiveMoney size={"9vw"} color="#1F487C" className="" />
                                            </span>
                                            <label className="text-[3vw] text-[#1F487C]">
                                                Once they successfully sign up, they will receive a voucher of
                                                ₹250 instant discount + ₹250 cashback that can be availed on
                                                their first ever booking.
                                            </label>
                                        </div>
                                        <div className="col-span-1 flex gap-x-[1vw]  items-center">
                                            <span className="w-[12vw] h-[12vw] border-[0.1vw] border-[#1F487C] bg-white rounded-[1.5vw] p-[0.5vw] flex items-center">
                                                <BiSolidOffer size={"9vw"} color="#1F487C" className="" />
                                            </span>
                                            <label className="text-[3vw] text-[#1F487C]">
                                                After the completion of their first travel you will receive a
                                                discount voucher worth ₹150.
                                            </label>
                                        </div>
                                    </div>
                                    <div className="fixed bottom-[2vw] flex flex-col justify-center w-full">
                                        <div className="flex items-center justify-center">
                                            <label className="text-[#1F487C] text-[3.75vw] font-semibold py-[1vw]">
                                                Terms & Conditions
                                            </label>
                                        </div>
                                        <div className="flex items-center justify-center">
                                            <button className="bg-[#1F487C] text-[3.75vw] text-white text-center rounded-full w-[50vw] h-[12vw]">Refer Now</button>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <>
                                    {refferalList.length > 0 ?
                                        (
                                            <>
                                                <div className="px-[10vw] pt-[5vw]">
                                                    <div className="flex flex-col">
                                                        <div className="border-[#1F487C] bg-white flex flex-col border-[0.1vw] py-[2vw] h-[20vw]  pl-[4vw] w-full rounded-xl">
                                                            <label className="text-[#1F487C] text-[5vw] font-bold">₹ 2500</label>
                                                            <label className="text-[#1F487C] font-semibold text-[4.5vw]">
                                                                Total Referred Amount
                                                            </label>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="pt-[2vw] ">
                                                    <div className="px-[5vw] bg-[#1F487C] text-white w-full h-[5vh] rounded-t-xl flex items-center text-[4.5vw] font-bold ">Refferal List</div>
                                                    <div className="overflow-y-auto w-full h-[36.5vh] bg-white">
                                                        <div className="space-y-2 px-[1vw]">
                                                            {refferalList.map((items, index) => (
                                                                <div key={index} className="flex items-center space-x-4 p-2 border-b">
                                                                    <div className="flex items-center">
                                                                        <div className="w-[10vw] h-[10vw] bg-blue-600 rounded-full"></div>
                                                                        <div className="ml-2 text-[#1F487C] font-bold text-[5vw]">{items.name}</div>
                                                                    </div>
                                                                    <div className="flex-1 text-center text-[#1F487C] text-[4vw]">{items.date}</div>
                                                                    <div className="text-[#1F487C] font-bold text-[5vw]">{items.price}</div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>

                                                </div>
                                            </>
                                        )
                                        :
                                        (
                                            <>
                                                <div className=" px-[10vw] pt-[20vw]">
                                                    <div className="flex flex-col">
                                                        <div className="border-[#1F487C] bg-white flex flex-col border-[0.1vw] py-[2vw] h-[20vw]  pl-[4vw] w-full rounded-xl">
                                                            <label className="text-[#1F487C] text-[5vw]">₹ 0</label>
                                                            <label className="text-[#1F487C] font-semibold text-[4.5vw]">
                                                                Total Rewards
                                                            </label>
                                                        </div>
                                                        <label className="text-[#1F487C] text-[5vw] font-bold text-center pt-[10vw]">
                                                            No referrals yet!
                                                        </label>
                                                        <label className="text-[#1F487C] text-[4vw] text-center py-[1vw]">
                                                            Start referring your friends and earn rewards
                                                        </label>
                                                    </div>
                                                </div>
                                                <div className="fixed bottom-[2vw] flex flex-col justify-center w-full">
                                                    <div className="flex items-center justify-center">
                                                        <label className="text-[#1F487C] text-[3.75vw] font-semibold py-[1vw]">
                                                            Terms & Conditions
                                                        </label>
                                                    </div>
                                                    <div className="flex items-center justify-center">
                                                        <button className="bg-[#1F487C] text-[3.75vw] text-white text-center rounded-full w-[50vw] h-[12vw]">Refer Now</button>
                                                    </div>
                                                </div>
                                            </>
                                        )
                                    }

                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
