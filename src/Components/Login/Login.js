import React, { useState } from "react";
import Password from "../../assets/Password.gif";
import TBSLOGO from "../../assets/TBS Logo.png";
import MobileNumberLog from "./MobileNumberLog";
import OtpVerification from "./OtpVerification";
import LoginProfile from "./LoginProfile";

const Login = ({ closeLoginModal, setLoginIsOpen }) => {
  const [CurrentPage, setCurrentPage] = useState(0);

  //   const nextPage = () => {
  //     setCurrentPage((prevStep) => prevStep + 1);
  //   };

  //   const prevStep = () => {
  //     setCurrentPage((prevStep) => prevStep - 1);
  //   };

  //   const renderStepComponent = () => {
  //     switch (CurrentPage) {
  //       case 0:
  //         return (
  //           <MobileNumberLog
  //             nextPage={nextPage}
  //             setCurrentPage={setCurrentPage}
  //           />
  //         );
  //       case 1:
  //         return (
  //           <OtpVerification
  //             nextPage={nextPage}
  //             prevStep={prevStep}
  //             setCurrentPage={setCurrentPage}
  //           />
  //         );
  //       case 2:
  //         return (
  //           <LoginProfile
  //             prevStep={prevStep}
  //             closeLoginModal={closeLoginModal}
  //             setLoginIsOpen={setLoginIsOpen}
  //             setCurrentPage={setCurrentPage}
  //           />
  //         );
  //       default:
  //         return <MobileNumberLog nextPage={nextPage} />;
  //     }
  //   };
  console.log(CurrentPage, "CurrentPageCurrentPage555");

  return (
    <>
      <div className="flex">
        <div className="w-[25vw] h-[35vw] bg-[#1F487C] flex items-center justify-center">
          <img 
          src={Password} 
          alt="password"
          className="w-[20vw] h-[20vw]" />
        </div>
        <div className="">
          <div className="w-[10vw]">
            <img 
            alt="tbsLogo"
            src={TBSLOGO} />
          </div>
          <div className="px-[5vw]">
            {/* {renderStepComponent()} */}
            {CurrentPage === 0 ? (
              <MobileNumberLog
                // nextPage={nextPage}
                setCurrentPage={setCurrentPage}
                setLoginIsOpen={setLoginIsOpen}
              />
            ) : CurrentPage === 1 ? (
              <OtpVerification
                // nextPage={nextPage}
                // prevStep={prevStep}
                setCurrentPage={setCurrentPage}
                setLoginIsOpen={setLoginIsOpen}
              />
            ) : CurrentPage === 2 ? (
              <LoginProfile
                // prevStep={prevStep}
                // closeLoginModal={closeLoginModal}
                setLoginIsOpen={setLoginIsOpen}
                setCurrentPage={setCurrentPage}
              />
            ) : (
              <MobileNumberLog
                // nextPage={nextPage}
                setCurrentPage={setCurrentPage}
                setLoginIsOpen={setLoginIsOpen}
              />
            )}
            {/* <MobileNumberLog /> */}
            {/* <OtpVerification/> */}
            {/* <LoginProfile/> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
