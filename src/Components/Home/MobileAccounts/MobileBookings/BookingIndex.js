import React, { useState } from "react";
import MobileCancelled from "./MobileCancelled";
import MobileCompleted from "./MobileCompleted";
import MobileUpcoming from "./MobileUpComing";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router";
import BGSCREEN from '../../../../assets/BG Image.png'


export default function BookingIndex() {
    const [currenttab, setCurrentTab] = useState(1);

    const navigation = useNavigate();

    const handlePrevPage = () => {
        localStorage.setItem('navigateBack', 'true');
        navigation('/dashboard', { state: { togglePage: true } });
    };
    return (
        <div className='bg-[#E5FFF1] min-h-screen max-h-auto w-full'>
            <div className="relative">
                <img src={BGSCREEN} className="bg-cover h-screen w-screen" />
                <div className="absolute top-0">
                    <div className="w-full h-[15vw] bg-[#1F487C] flex items-center justify-center">
                        <div className="col-span-2 "><IoIosArrowRoundBack color="white" size="10vw" onClick={handlePrevPage} /></div>
                        <div className="px-[2vw] text-[5vw] text-white font-bold flex gap-[2vw]"><p onClick={() => navigation('/dashboard')}>Home</p><p>{`>`}</p><p onClick={handlePrevPage}>My Account</p><p>{`>`}</p><p>Booking</p></div>
                    </div>
                    <div className="grid grid-cols-3 w-screen mt-[5vw]">
                        <button
                            className={`${currenttab == 1
                                ? "  text-[#1F487C] border-b-[0.7vw] border-[#1F487C] font-bold"
                                : "text-[#1F487C] "
                                } rounded-tr-[0.9vw] text-[4vw] `}
                            onClick={() => setCurrentTab(1)}
                        >
                            UPCOMING
                        </button>
                        <button
                            className={`${currenttab == 2
                                ? "  text-[#1F487C] border-b-[0.7vw] border-[#1F487C] font-bold"
                                : "text-[#1F487C] "
                                } rounded-tr-[0.9vw] text-[4vw] `}
                            onClick={() => setCurrentTab(2)}
                        >
                            COMPLETED
                        </button>
                        <button
                            className={`${currenttab == 3
                                ? "  text-[#1F487C] border-b-[0.7vw] border-[#1F487C] font-bold"
                                : "text-[#1F487C] "
                                } rounded-tr-[0.9vw] text-[4vw] `}
                            onClick={() => setCurrentTab(3)}
                        >
                            CANCELLED
                        </button>
                    </div>
                    <div className="">
                        {currenttab == 1 ? (
                            <MobileUpcoming />
                        ) : currenttab == 2 ? (
                            <MobileCompleted />
                        ) : (
                            <MobileCancelled />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
