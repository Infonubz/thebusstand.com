import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { GetFooterTabs } from '../../../../../../Api-TBS/Home/Home';
import BG_IMAGE from "../../../../../../Assets/CommonImages/BG Image.png"
import homesky from '../../../../../../Assets/Theme/Sky/BackgroundSky1.png'
import Navbar_One from "../../../../../Common/Top-Navbar/Navbar-One";


export const UserAgreement = () => {
    const dispatch = useDispatch();
    const agreement = useSelector((state) => state?.tbs_info || [])
     // console.log(agreement.user_agreement, 'consoleconsole');

    useEffect(() => {
        GetFooterTabs(dispatch);
    }, [dispatch]);

    const user_agreement = agreement?.user_agreement
     // console.log(user_agreement, 'user_agreement');

    return (
        <>
            <div className='md:block hidden'>
                <div className='bg-[white] w-full h-[70vh] rounded-xl px-[2vw] shadow-lg shadow-gray-300'>
                    <div className=' text-[1.5vw] text-center text-[#1F487C] font-bold pt-[1vw] pb-[0.5vw] ' >User Agreement</div>
                    <div className='Legal-Information overflow-y-scroll w-full h-[60vh] px-[2vw] py-[1vw]'>
                        {/* <div>{user_agreement}</div> */}
                        <div><p className='text-[1vw] text-[#1F487C]'>
                            {user_agreement?.split("\r\n")?.map((line, index) => (
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
    )
}
