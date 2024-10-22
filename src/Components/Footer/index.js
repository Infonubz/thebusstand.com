import React, { useEffect, useState } from "react";
import HomeHearder from "../MainComponenet/HomeHearder";
//import Footer from "../Home/Footer";
import homesky from "../../assets/homesky.png";
import { PrivacyPolicy } from "./PrivacyPolicy";
import { TermsConditions } from "./TermsConditions";
import { UserAgreement } from "./UserAgreement";
import { useLocation } from "react-router";
//import { GetFooter } from "../../Api/Home/Home";
import { useDispatch } from "react-redux";
import { GetFooterTabs } from "../../Api/FooterTabs/FooterTabs";

export default function TermsIndex() {

    const [currenttab, setCurrentTab] = useState(1);
    const dispatch = useDispatch();
    const location = useLocation()

    useEffect(() => {
        // Set currenttab based on the passed state or default to 1
        const toggleTabs = location.state?.toggleTabs;
        setCurrentTab(toggleTabs);
    }, [location.state]);

    useEffect(() => {
        GetFooterTabs(dispatch);
    }, [dispatch]);


    return (
        <div>
            <HomeHearder />
            <div className="relative h-[45vw] bg-[#E5FFF1]" style={{ zIndex: 1 }}>
                <div
                    className="h-[10vw] overflow-x-hidden"
                    style={{
                        backgroundImage: `url(${homesky})`,
                        width: "100%",
                        overflow: "hidden",
                        // backgroundSize: "cover",
                        position: "relative",
                        overflowX: "hidden",
                        width: "100%",
                    }}
                >
                    <label className="absolute left-[4vw] top-[1.5vw] text-[1.2vw] text-white font-bold">
                        {`Home > My Account > ${currenttab === 1
                            ? "Privacy Policy"
                            : currenttab === 2
                                ? "Terms & Conditions"
                                : "User Agreement"
                            }`}
                    </label>
                    <div
                        className={`absolute top-[0vw] left-[43.5vw] text-white text-[3.5vw] font-bold transition-transform duration-500 ease-in-out opacity-25 ${currenttab === 1
                            ? "translate-x-0"
                            : currenttab === 2
                                ? "-translate-x-[5vw]"
                                : "translate-x-[5vw]"
                            }`}
                    >
                        {`${currenttab === 1
                            ? "Privacy Policy"
                            : currenttab === 2
                                ? "Terms & Conditions"
                                : "User Agreement"
                            }`}
                    </div>
                    <div
                        className={`absolute top-[1.25vw] left-[48.5vw] text-white text-[2vw] font-bold transition-transform duration-500 ease-in-out ${currenttab === 1
                            ? "translate-x-0"
                            : currenttab === 2
                                ? "-translate-x-[5vw]"
                                : "translate-x-[5vw]"
                            }`}
                    >
                        {`${currenttab === 1
                            ? "Privacy Policy"
                            : currenttab === 2
                                ? "Terms & Conditions"
                                : "User Agreement"
                            }`}
                    </div>
                    <div className="cloudhome"></div>
                </div>

                <div className="absolute top-[5vw] left-[4vw]">
                    <div
                        className={`cursor-pointer w-[18vw] h-[5vw] rounded-tl-[1vw] rounded-tr-[1vw] border-[0.1vw] border-[#1F487C] flex items-center pl-[4vw] transition-colors duration-300 ${currenttab === 1 ? "bg-[#1F487C] text-white" : "bg-white text-[#1F487C]"
                            }`}
                        onClick={() => setCurrentTab(1)}
                    >
                        <label className="font-bold text-[1.3vw]">
                            Privacy Policy
                        </label>
                    </div>
                </div>
                <div className="absolute top-[10vw] left-[4vw]">
                    <div
                        className={`cursor-pointer w-[18vw] h-[5vw] flex items-center pl-[4vw] border-l-[0.1vw] border-r-[0.1vw] border-b-[0.1vw] border-[#1F487C] transition-colors duration-300 ${currenttab === 2 ? "bg-[#1F487C] text-white" : "bg-white text-[#1F487C]"
                            }`}
                        onClick={() => setCurrentTab(2)}
                    >
                        <label className="font-bold text-[1.3vw]">
                            Terms & Conditions
                        </label>
                    </div>
                </div>
                <div className="absolute top-[15vw] left-[4vw]">
                    <div
                        className={`cursor-pointer w-[18vw] h-[5vw] flex items-center pl-[4vw] border-l-[0.1vw] border-r-[0.1vw] border-b-[0.1vw] border-[#1F487C] transition-colors duration-300 ${currenttab === 3 ? "bg-[#1F487C] text-white" : "bg-white text-[#1F487C]"
                            }`}
                        onClick={() => setCurrentTab(3)}
                    >
                        <label className="font-bold text-[1.3vw]">
                            User Agreement
                        </label>
                    </div>
                </div>

                <div className=" absolute left-[25vw] top-[5vw]">
                    {/* <div className="bg-white h-[35vw] w-[71vw] rounded-[1vw] border-[0.1vw] border-[#1F487C] shadow-xl"> */}
                    <div className="h-[35vw] w-[71vw]">
                        {currenttab == 1 ? (
                            <PrivacyPolicy currenttab={currenttab} />
                        ) : currenttab == 2 ? (
                            <TermsConditions />
                        ) : (
                            <UserAgreement />
                        )}
                    </div>
                </div>
            </div>
            {/* <Footer /> */}
        </div>
    );
}
