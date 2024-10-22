import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { GetFooterTabs } from '../../Api/FooterTabs/FooterTabs';

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
            <div className='bg-[white] w-full h-full rounded-xl px-[2vw] shadow-lg shadow-gray-300'>
                <div className=' text-[1.5vw] text-center text-[#1F487C] font-bold pt-[1vw] pb-[0.5vw]' >Privacy & Policy</div>
                <div className='Legal-Information overflow-y-scroll w-full h-[85%] px-[2vw] py-[1vw]'>
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
        </>
    )
}
