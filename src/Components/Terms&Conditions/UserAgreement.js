import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { GetFooterTabs } from '../../Api/FooterTabs/FooterTabs';

export const UserAgreement = () => {
    const dispatch = useDispatch();
    const agreement = useSelector((state) => state?.tbs_info || [])
    console.log(agreement.user_agreement, 'consoleconsole');

    useEffect(() => {
        GetFooterTabs(dispatch);
    }, [dispatch]);

    const user_agreement = agreement?.user_agreement
    console.log(user_agreement, 'user_agreement');

    return (
        <>
            <div className='bg-[white] w-full h-full rounded-xl px-[2vw]'>
                <div className=' text-[1.5vw] text-center text-[#1F487C] font-bold pt-[1vw] pb-[0.5vw] ' >User Agreement</div>
                <div className='Legal-Information overflow-y-scroll w-full h-[85%] px-[2vw] py-[1vw]'>
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
        </>
    )
}
