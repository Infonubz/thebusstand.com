import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { GetFooterTabs } from '../../Api/FooterTabs/FooterTabs';

export const TermsConditions = () => {
    const dispatch = useDispatch();
    const conditions = useSelector((state) => state?.tbs_info || [])
    console.log(conditions.terms_conditions, 'consoleconsole');

    useEffect(() => {
        GetFooterTabs(dispatch);
    }, [dispatch]);

    const terms_conditions = conditions?.terms_conditions
    console.log(terms_conditions, 'terms_conditions');

    return (
        <>
            <div className='bg-[white] w-full h-full rounded-xl px-[2vw] shadow-lg shadow-gray-300'>
                <div className='text-[1.5vw] text-center text-[#1F487C] font-bold pt-[1vw] pb-[0.5vw] ' >Terms & Conditions</div>
                <div className='Legal-Information overflow-y-scroll w-full h-[85%] px-[2vw] py-[1vw]'>
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
        </>
    )
}
