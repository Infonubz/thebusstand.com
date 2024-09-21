import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Verification from "../../assets/Verified.gif";
import {
  GetUserDetails,
  SendOTPassword,
  SendVerificationOTP,
} from "../../Api/Login/Login";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

const OtpVerification = ({ setCurrentPage, setLoginIsOpen }) => {
  const validationSchema = Yup.object().shape({
    otp: Yup.string()
      .matches(/^\d+$/, "OTP must contain only numeric digits")
      .matches(/^\d{6}$/, "OTP must be exactly 6 digits")
      .required("OTP is required"),
  });

  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const dispatch = useDispatch();

  const Email_Id = useSelector((state) => state.send_otp);
  const navigation = useNavigate();
  const handleOtpSubmit = async (values, { setErrors }) => {
    console.log("response85858");

    try {
      const response = await SendOTPassword(
        dispatch,
        values,
        sessionStorage.getItem("email_id")
      );
      console.log(response, "responseresponse");
      // if (response.message) {
      //   setPopupMessage("VERIFIED SUCCESSFULLY!");
      //   setShowPopup(true);
      //   setTimeout(() => {
      //     setShowPopup(false);
      //     nextPage();
      //   }, 2500);
      // } else {
      //   setErrors({ otp: response.error || "Invalid OTP" });
      // }
      sessionStorage.setItem("passenger_id", response.user.tbs_passenger_id);
      sessionStorage.setItem("user_id", response.user.tbs_passenger_id);
      toast.success(response.message);
      if (response.user.status == 2) {
        setLoginIsOpen(false);
        GetUserDetails(navigation);
      } else {
        setCurrentPage(2);
      }
      console.log(response.tbs_passenger_id, "passengers_idd");
    } catch (error) {
      console.error("An error occurred:", error);
      setErrors({ otp: "Invalid OTP" });
    }
  };

  const passenger_mail = sessionStorage.getItem("email_id");
  const [timeLeft, setTimeLeft] = useState(120); // 2 minutes = 120 seconds

  useEffect(() => {
    if (timeLeft > 0) {
      const timerId = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000); // Decrease every second

      return () => clearInterval(timerId); // Cleanup on component unmount
    }
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };
  console.log(timeLeft, "hhhh");
  const email = {
    email: sessionStorage.getItem("email_id"),
  };
  const handleresend = async () => {
    try {
      const response = await SendVerificationOTP(dispatch, email);
      setTimeLeft(120);
    } catch {}
  };
  return (
    <>
      <div className="md:block hidden mt-[1vw]">
        <div className="flex flex-col items-center">
          <div className="text-[#1F487C] text-[1.5vw] font-extrabold w-[27vw] text-center">
            Sign in to exciting discounts and cashbacks !!
          </div>

          <div className="px-[1vw] text-[0.9vw] flex opacity-60 pt-[1vw]">
            To proceed, please enter the{" "}
            <span className="font-extrabold px-[0.2vw]">OTP</span> sent to your
            registered
          </div>
          <label className="px-[1vw] text-[0.9vw] opacity-60">
            mobile number or email address for verification.
          </label>
          <div className="pt-[2vw]">
            {passenger_mail ? (
              <div>
                <div className="w-[27vw] flex items-start text-[1.25vw] font-semibold opacity-60">
                  EMAIL ID
                </div>
                <div className=" w-[27vw] flex justify-between">
                  <span className="text-[1vw] font-bold ">
                    {passenger_mail}
                  </span>
                  <span
                    className="cursor-pointer text-[1vw] order-last text-[#1F487C] font-bold"
                    onClick={() => {
                      setCurrentPage(0);
                    }}
                  >
                    CHANGE
                  </span>
                </div>
              </div>
            ) : (
              <div>
                <div className="w-[27vw] flex items-start text-[1.25vw] font-semibold opacity-60">
                  MOBILE NUMBER
                </div>
                <div className=" w-[27vw] flex justify-between">
                  <span className="text-[1vw] font-bold ">{`+91 96885 53316`}</span>
                  <span
                    className="cursor-pointer text-[1vw] order-last text-[#1F487C] font-bold"
                    onClick={() => {
                      setCurrentPage(0);
                    }}
                  >
                    CHANGE
                  </span>
                </div>
              </div>
            )}
          </div>

          <Formik
            initialValues={{ otp: "" }}
            validationSchema={validationSchema}
            onSubmit={handleOtpSubmit}
            enableReinitialize
          >
            {({
              isSubmitting,
              isValid,
              handleSubmit,
              values,
              handleChange,
              setErrors,
            }) => (
              <Form className="py-[1vw]" onSubmit={handleSubmit}>
                <div className="flex flex-col gap-y-[2vw] w-[27vw]">
                  <div className="relative">
                    <Field
                      type="text"
                      name="otp"
                      placeholder="Enter Your OTP"
                      value={values.otp}
                      onChange={(e) => {
                        handleChange(e);
                      }}
                      className="border-[0.1vw] rounded-[0.5vw] border-slate-500 text-[#1F487C] text-[1.2vw] h-[3vw] w-[27vw]  outline-none px-[1vw]"
                    />
                    <ErrorMessage
                      name="otp"
                      component="div"
                      className="text-red-500 text-[0.8vw] absolute top-[3.5vw]"
                    />
                  </div>
                  <div className="flex items-center gap-[1vw]">
                    <button
                      onClick={() => handleresend()}
                      disabled={timeLeft == 0 ? false : true}
                      className={`text-[#1F487C] ${
                        timeLeft == 0 ? "cursor-pointer" : " cursor-not-allowed"
                      } w-[13vw] font-bold h-[2.5vw] border-[0.1vw] rounded-[0.5vw] border-[#1F487C]  text-[1.2vw] bg-white`}
                    >
                      {timeLeft == 0 ? "Resend OTP" : formatTime(timeLeft)}
                    </button>
                    <button
                      type="submit"
                      className="bg-[#1F487C] w-[13vw] font-bold h-[2.5vw] border-[0.1vw] rounded-[0.5vw]  text-[1.2vw] text-white"
                    >
                      VERIFY OTP
                    </button>
                  </div>
                  {/* <button
                    type="submit"
                    className="bg-[#1F487C] w-[27vw] h-[2.5vw] border-[0.1vw] rounded-[0.5vw]  text-[1.2vw] text-white"
                  >
                    VERIFY OTP
                  </button> */}
                </div>
              </Form>
            )}
          </Formik>
          {/* <div className="flex flex-col items-center ">
            <button className="bg-[#1F487C] w-[27vw] h-[2.5vw]  rounded-[0.2vw] border-slate-700 text-[1.2vw] text-white">
              OTHER WAYS TO SIGN IN{" "}
            </button>
          </div> */}
        </div>

        {showPopup && (
          <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-4 flex flex-col items-center rounded">
              <div>
                <img
                  className="w-[15vw] h-[15vw]"
                  src={Verification}
                  alt="Verification"
                />
              </div>
              <p className="text-[#1F487C] text-[1.2vw]">{popupMessage}</p>
            </div>
          </div>
        )}
      </div>
      {/* ---MobileView--- */}
      <div className="md:hidden block ">
        <div className="flex flex-col gap-y-[4vw] justify-items-center">
          <div className="pt-[6vw]">
            <div className="text-[#1F487C] text-[6vw] font-semibold text-center">
              Sign into exciting discounts and cashbacks !!
            </div>
            <div className="text-[3.5vw] opacity-60 text-center">
              To continue, please enter the OTP sent to verify your mobile
              number
            </div>
          </div>
          <div className="py-[0.5vw] grid grid-rows-2 gap-y-[2vw]">
            {passenger_mail ? (
              <div>
                <div className="flex items-start text-[4.5vw] font-semibold opacity-60">
                  Email Id
                </div>
                <div className="flex justify-between">
                  <span className="text-[4.5vw] font-bold order-first">
                    {passenger_mail}
                  </span>
                  <span className="cursor-pointer text-[4.5vw] order-last border-[0.1vw] text-[#1F487C] font-bold">
                    CHANGE
                  </span>
                </div>
              </div>
            ) : (
              <div>
                <div className="flex items-start text-[4.5vw] font-semibold opacity-60">
                  MOBILE NUMBER
                </div>
                <div className="flex justify-between">
                  <span className="text-[4.5vw] font-bold order-first">
                    +91 96885 53316
                  </span>
                  <span className="cursor-pointer text-[4.5vw] order-last border-[0.1vw] text-[#1F487C] font-bold">
                    CHANGE
                  </span>
                </div>
              </div>
            )}
          </div>

          <Formik
            initialValues={{
              otp: "",
            }}
            validationSchema={validationSchema}
            onSubmit={handleOtpSubmit}
            enableReinitialize
          >
            {({
              isSubmitting,
              isValid,
              handleSubmit,
              values,
              handleChange,
              setErrors,
            }) => (
              <Form className="py-[1vw]" onSubmit={handleSubmit}>
                <div className="flex flex-col gap-y-[7vw] relative">
                  <div className=" ">
                    <Field
                      type="text"
                      name="otp"
                      placeholder="Enter OTP"
                      value={values.otp}
                      onChange={(e) => {
                        handleChange(e);
                      }}
                      className="customize-placeholder border-[0.1vw] border-slate-500 text-[#1F487C] text-[3.7vw] h-[13vw] w-full rounded-r-[0.2vw] outline-none px-[1vw]"
                    />
                    <ErrorMessage
                      name="otp"
                      component="div"
                      className="text-red-500 text-[3.5vw] absolute"
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-[#1F487C] w-full h-[13vw] border-[0.1vw] rounded-[1vw] border-slate-700 text-[4.5vw] text-white"
                  >
                    VERIFY OTP
                  </button>
                </div>
              </Form>
            )}
          </Formik>
          {/* <div className="flex flex-col items-center ">
            <button className="bg-[#1F487C] w-full h-[13vw] border-[0.1vw] rounded-[1vw] border-slate-700 text-[4.5vw] text-white">
              OTHER WAYS TO SIGN IN{" "}
            </button>
          </div> */}
        </div>

        {showPopup && (
          <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-4 flex flex-col items-center rounded">
              <div>
                <img
                  className="w-[30vw] h-[30vw]"
                  src={Verification}
                  alt="Verification"
                />
              </div>
              <p className="text-[#1F487C] text-[4vw]">{popupMessage}</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default OtpVerification;
