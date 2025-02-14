import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
//import { IoIosArrowRoundBack } from "react-icons/io";
//import { useNavigate } from "react-router";
import BG_IMAGE from "../../../../../../Assets/CommonImages/BG Image.png"
import homesky from '../../../../../../Assets/Theme/Sky/BackgroundSky1.png'
import Navbar_One from "../../../../../Common/Top-Navbar/Navbar-One";

const TermsConditions = () => {
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
                <div className='bg-[white] w-full h-[70vh] rounded-xl px-[2vw] shadow-lg shadow-gray-300'>
                    <div className='text-[1.5vw] text-center text-[#1F487C] font-bold pt-[1vw] pb-[0.5vw] ' >Terms & Conditions</div>
                    <div className='Legal-Information overflow-y-scroll w-full h-[60vh] px-[2vw] py-[1vw]'>
                        {/* <div>{terms_conditions}</div> */}
                        <div><p className='text-[1vw] text-[#1F487C]'>
                            {terms_conditions?.split("\r\n")?.map((line, index) => (
                                <p key={index} className="pb-[0.75vw]">
                                    {line}
                                    <br />
                                </p>
                            ))}
                        </p></div>
                    </div>
                </div>
            </div>
           
          
        </>
    );
};

export default TermsConditions;
