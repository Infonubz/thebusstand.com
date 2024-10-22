import React, { useState } from "react";
import Password from "../../assets/Password.gif";
//import TBSLOGO from "../../assets/TBS Logo.png";
import MobileNumberLog from "./MobileNumberLog";
import OtpVerification from "./OtpVerification";
import LoginProfile from "./LoginProfile";
//import { IoMdArrowBack } from "react-icons/io";

const LoginMobile = ({ setLoginMobileIsOpen }) => {

  const [CurrentPage, setCurrentPage] = useState(0);


  // const nextPage = () => {
  //   setCurrentPage((prevStep) => prevStep + 1);
  // };

  // const prevStep = () => {
  //   setCurrentPage((prevStep) => prevStep - 1);
  // };

  // const renderStepComponent = () => {
  //   switch (CurrentPage) {
  //     case 0:
  //       return <MobileNumberLog nextPage={setCurrentPage} />;
  //     case 1:
  //       return <OtpVerification nextPage={nextPage} prevStep={prevStep} />;
  //     case 2:
  //       return <LoginProfile prevStep={prevStep} />;
  //     default:
  //       return <MobileNumberLog nextPage={nextPage} />;
  //   }
  // };

  console.log(CurrentPage, "curpagefh");
  

  return (
    <>
      <div className="flex  flex-col items-center mt-[5vw]">
        <div className=" flex justify-items-center">
          <img alt="Password_Image" src={Password} className="w-[65vw] h-[58vw]" />
        </div>
        <div className="px-[5vw]">
          {/* {renderStepComponent()} */}
          {CurrentPage === 0 ? (
            <MobileNumberLog
              setCurrentPage={setCurrentPage}
              setLoginMobileIsOpen={setLoginMobileIsOpen}
            />
          ) : CurrentPage === 1 ? (
            <OtpVerification
              setCurrentPage={setCurrentPage}
              setLoginMobileIsOpen={setLoginMobileIsOpen}
            />
          ) : CurrentPage === 2 ? (
            <LoginProfile
              setLoginMobileIsOpen={setLoginMobileIsOpen}
              // setCurrentPage={setCurrentPage}
            />
          ) : (
            <MobileNumberLog
              setCurrentPage={setCurrentPage}
              setLoginMobileIsOpen={setLoginMobileIsOpen}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default LoginMobile;
