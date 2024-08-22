import React, { useState } from 'react'
import Password from '../../assets/Password.gif'
import TBSLOGO from '../../assets/TBS Logo.png'
import MobileNumberLog from './MobileNumberLog'
import OtpVerification from './OtpVerification'
import LoginProfile from './LoginProfile'


const LoginMobile = () => {
    const [CurrentPage, setCurrentPage] = useState(0);

    const nextPage = () => {
        setCurrentPage((prevStep) => prevStep + 1);
    };

    const prevStep = () => {
        setCurrentPage((prevStep) => prevStep - 1);
    };

    const renderStepComponent = () => {
        switch (CurrentPage) {
            case 0:
                return <MobileNumberLog nextPage={nextPage} />;
            case 1:
                return <OtpVerification nextPage={nextPage} prevStep={prevStep} />;
            case 2:
                return <LoginProfile prevStep={prevStep} />;
            default:
                return <MobileNumberLog nextPage={nextPage} />;
        }
    };


    return (
        <>
            <div className='flex flex-col items-center py-[25%]'>
                <div className=' flex justify-items-center'>
                    <img src={Password} className='w-[75vw] h-[75vw]' />
                </div>
                <div className='px-[5vw]'>
                    {renderStepComponent()}
                </div>
            </div>
        </>
    )
}

export default LoginMobile
