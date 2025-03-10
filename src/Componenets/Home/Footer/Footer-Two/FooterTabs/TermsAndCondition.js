import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
//import { IoIosArrowRoundBack } from "react-icons/io";
//import { useNavigate } from "react-router";
import { GetFooterTabs } from '../../../../../Api-TBS/Home/Home';
import BG_IMAGE from "../../../../../Assets/CommonImages/BG Image.png"
import homesky from '../../../../../Assets/Theme/Sky/BackgroundSky1.png'
import Navbar_One from "../../../../Common/Top-Navbar/Navbar-One";
import TermsIndex from "./LegalInformations/Index";
import FooterTwo from "../FooterTwo";
import FooterThree from "../../Footer-Three/FooterThree";
import NavMobile from "./NavMobile";

export default function TermsAndCondition() {
    const dispatch = useDispatch();
    const conditionsMobile = useSelector((state) => state?.tbs_info || []);
    const terms_conditions = conditionsMobile?.terms_conditions;
    // const navigation = useNavigate()



    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <div className="md:block hidden">
                <TermsIndex />
                <FooterTwo />
                <FooterThree />
            </div>
            <div className="md:hidden block fixed top-0">
                <div className=" bg-[#E5FFF1] ">
                    <Navbar_One />
                </div>
                <div
                    className="relative md:h-[45vw] h-[100%] bg-[#d1f8e3]"
                    style={{ zIndex: 1 }}
                >
                    <div
                        className="md:h-[10vw] h-[19vw] md:z-0 overflow-x-hidden"
                        style={{
                            backgroundImage: `url(${homesky})`,
                            width: "100%",
                            overflow: "hidden",
                            // backgroundSize: "cover",
                            position: "relative",
                            overflowX: "hidden",
                        }}
                    >
                        <label className="absolute left-[28vw] md:left-[36vw] top-[2vw] md:top-[0.1vw] text-[6vw]  md:text-[4vw] text-white font-bold opacity-20">
                            {`Rewards & Offers`}
                        </label>
                        <label className="absolute left-[34vw] md:left-[43vw] top-[3.5vw] md:top-[2vw] text-[4vw]  md:text-[2vw] text-white font-bold">
                            {"Rewards & Offers"}
                        </label>
                        <div className="absolute left-[3vw] top-[4vw] z-[2] text-[7vw] text-white font-bold md:hidden sm:block ">
                        </div>
                        <div className="absolute left-[3vw] top-[4vw] z-[2] text-[7vw] text-white font-bold md:hidden sm:block ">
                            < NavMobile/>
                        </div>
                        <div className="cloudhome"></div>
                    </div>

                    <div className="relative min-h-screen bg-[#E5FFF1] ">
                        <img src={BG_IMAGE} className="w-full h-auto" alt="Background" />

                        <div className=" absolute top-[-3vw] left-[2.5vw] h-[77.5vh] bg-white w-[95%] rounded-lg shadow-2xl">
                            <p className="text-[#1F487C] text-[5vw] font-bold px-[2vw]">
                                Terms & Conditions
                            </p>
                            <div className=" Legal-Information-Mobile overflow-y-auto max-h-[72.5vh] px-[3vw] pt-[5vw]">
                                {terms_conditions?.split("\r\n")?.map((line, index) => (
                                    <p
                                        key={index}
                                        className="text-[#1F487C] text-[3vw] pb-[0.75vw]"
                                    >
                                        {line}
                                    </p>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
};

