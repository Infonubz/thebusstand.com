import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Verification from "../../assets/Verified.gif";
import { GetUserDetails, SendOTPassword } from "../../Api/Login/Login";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

const OtpVerification = ({ setCurrentPage, setLoginIsOpen }) => {
  const validationSchema = Yup.object().shape({
    otp: Yup.string()
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

  return (
    <>
      <div className="md:block hidden">
        <div className="flex flex-col items-center">
          <div className="text-[#1F487C] text-[2vw] font-semibold w-[27vw] text-center">
            Sign in to exciting discounts and cashbacks !!
          </div>
          <div className="text-[1.05vw] opacity-60">
            To continue, please enter the OTP sent to verify your mobile number
            or Email Id
          </div>

          <div className="py-[0.5vw]">
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
                      placeholder="Enter OTP"
                      value={values.otp}
                      onChange={(e) => {
                        handleChange(e);
                      }}
                      className="border-[0.1vw] border-slate-500 text-[#1F487C] text-[1.2vw] h-[3vw] w-[27vw] rounded-r-[0.2vw] outline-none px-[1vw]"
                    />
                    <ErrorMessage
                      name="otp"
                      component="div"
                      className="text-red-500 text-[0.8vw] absolute top-[3.5vw]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="bg-[#1F487C] w-[27vw] h-[2.5vw] border-[0.1vw] rounded-[0.2vw] border-slate-700 text-[1.2vw] text-white"
                  >
                    VERIFY OTP
                  </button>
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
