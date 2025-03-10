import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { GetFooterTabs } from '../../../../../../Api-TBS/Home/Home';
import BG_IMAGE from "../../../../../../Assets/CommonImages/BG Image.png"
import homesky from '../../../../../../Assets/Theme/Sky/BackgroundSky1.png'
import Navbar_One from "../../../../../Common/Top-Navbar/Navbar-One";

export const PrivacyPolicy = () => {
    const dispatch = useDispatch();
    const priv_policy = useSelector((state) => state?.tbs_info || [])
    console.log(priv_policy.privacy_policy, 'consoleconsole');

    useEffect(() => {
        GetFooterTabs(dispatch);
    }, [dispatch]);

    const privacy_policy = priv_policy?.privacy_policy
    console.log(privacy_policy, 'privacy_policy');

    return (
        <>
            <div className='md:block hidden'>
                <div className='bg-[white] w-full h-[70vh] rounded-xl px-[2vw] shadow-lg shadow-gray-300'>
                    <div className=' text-[1.5vw] text-center text-[#1F487C] font-bold pt-[1vw] pb-[0.5vw]' >Privacy & Policy</div>
                    <div className='Legal-Information overflow-y-scroll w-full h-[60vh] px-[2vw] py-[1vw]'>
                        {/* <div>{}</div> */}
                        <div><p className='text-[1vw] text-[#1F487C]'>
                            {privacy_policy?.split("\r\n")?.map((line, index) => (
                                <p key={index} className="pb-[0.75vw]">
                                    {line}
                                    <br />
                                </p>
                            ))}
                        </p></div>
                    </div>
                </div>
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
                        <label className="absolute left-[22.5vw] md:left-[36vw] top-[2vw] md:top-[0.1vw] text-[8vw]  md:text-[4vw] text-white font-bold opacity-20">
                            {`Privacy & Policy`}
                        </label>
                        <label className="absolute left-[32.5vw] md:left-[43vw] top-[4.5vw] md:top-[2vw] text-[5vw]  md:text-[2vw] text-white font-bold">
                            {`Privacy & Policy`}
                        </label>
                        
                        <div className="cloudhome"></div>
                    </div>
                    <div className="relative min-h-screen bg-[#E5FFF1] ">
                        <img src={BG_IMAGE} className="w-full h-auto" alt="Background" />

                        <div className=" absolute top-[-3vw] left-[2.5vw] h-[77.5vh] bg-white w-[95%] rounded-lg shadow-2xl">
                            <p className="text-[#1F487C] text-[5vw] font-bold px-[2vw] text-center">
                                Privacy Policy
                            </p>
                            <div className=" Legal-Information-Mobile overflow-y-auto max-h-[72.5vh] px-[3vw] pt-[5vw]">
                                {privacy_policy?.split("\r\n")?.map((line, index) => (
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
    )
}
