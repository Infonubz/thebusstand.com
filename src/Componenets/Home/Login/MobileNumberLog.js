import React, { useEffect, useState } from "react";
import {
  //Modal,
  Spin,
} from "antd";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  GoogleOAuthProvider,
  GoogleLogin,
  //useGoogleLogin,
} from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import { SendVerificationOTP, SendMessage } from "../../../Api-TBS/Login/Login";
import { useDispatch } from "react-redux";
import { FaPhoneAlt } from "react-icons/fa";
import {
  MdEmail,
  //MdOutlineMail
} from "react-icons/md";
//import axios from "axios";
import { LoadingOutlined } from "@ant-design/icons";
//import { Flex } from "antd";
import { useNavigate } from "react-router";
import {
  decryptData,
  encryptData,
} from "../../Common/Common-Functions/Encrypt-Decrypt";

const MobileNumberLog = ({ setCurrentPage, setLoginMobileIsOpen }) => {
  const clientId =
    "374324582256-oisc65slv95m53pod51lmg7r5elfobjv.apps.googleusercontent.com";
  const email1 = sessionStorage.getItem("email_id");
  const mobile1 = sessionStorage.getItem("mobile");
  // const mobile = mobile1 && decryptData(mobile1);
  const email = email1 && decryptData(email1);
  const decryptEmailId = email && decryptData(email);
  const decryptMobile = mobile1 && decryptData(mobile1);
  const navigation = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [toggleNum, setToggleNum] = useState(1);
  // const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const validationSchema = Yup.object({
    // mobile: Yup.string()
    //   .required("Mobile number is required")
    //   .matches(/^\d{10}$/, "Mobile number must be exactly 10 digits"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required")
      .min(5, "Email must be at least 5 characters long")
      .max(40, "Email must be less than 40 characters")
      .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Invalid email address"
      )
      .test(
        "no-special-characters",
        "Email contains invalid characters",
        (value) => {
          // Regular expression to disallow certain special characters
          const forbiddenChars = /[!#$%&'*+/=?^_{}|~]/;
          return !forbiddenChars.test(value); // Returns false if invalid characters are found
        }
      ),
  });
  const validationMobile = Yup.object({
    mobile: Yup.string()
      .required("Mobile number is required")
      .matches(/^\d{10}$/, "Mobile number must be exactly 10 digits"),
    // email: Yup.string()
    //   .email("Invalid email address")
    //   .required("Email is required")
    //   .min(5, "Email must be at least 5 characters long")
    //   .max(40, "Email must be less than 40 characters")
    //   .test(
    //     "no-special-characters",
    //     "Email contains invalid characters",
    //     (value) => {
    //       // Regular expression to disallow certain special characters
    //       const forbiddenChars = /[!#$%&'*+/=?^_{}|~]/;
    //       return !forbiddenChars.test(value); // Returns false if invalid characters are found
    //     }
    //   ),
  });

  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  // Handle successful login
  const handleSuccess = (response) => {
    try {
      const decoded = jwt_decode(response.credential); // Decode JWT token
      setUser(decoded);
      setError(null);
    } catch (err) {
      console.error("JWT Decode Error:", err);
      setError("Failed to decode token");
    }
  };

  // Handle failed login
  const handleFailure = (error) => {
    console.error("Login Failed:", error);
    setError("Google login failed. Please try again.");
  };

  // Handle logout
  const handleLogout = () => {
    setUser(null);
    setError(null);
  };
  const handleKeyEnter = (event, values) => {
    // Regular expression to check for special characters except for email-friendly ones
    const specialCharPattern = /[^a-zA-Z0-9@.]/;

    if (event.key === "Enter" && !specialCharPattern.test(values)) {
      handleSubmit(values);
    }
  };
  const [otpvalid, setOTPValid] = useState(null);
  const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };
  const random = generateOTP();
  const handleSubmit = async (values) => {
    const email = values?.email;
    const mobile = values?.mobile;
    const encryptedUserEmail = email && encryptData(values.email);
    const encryptedUserMobile = mobile && encryptData(values.mobile);
    sessionStorage.setItem("email_id", encryptedUserEmail);
    sessionStorage.setItem("mobile", encryptedUserMobile);
    setLoading(true);
     // console.log("testiiiiiiiii");

    if (values?.email) {
      try {
        const response = await SendVerificationOTP(dispatch, values);
        setCurrentPage(1);
        // nextPage();
        setLoading(false);
      } catch (err) {
         // console.log(err);
      }
    } else {
      try {
        const mblres = await SendMessage(values?.mobile, random);
        setOTPValid(random);
        setCurrentPage(1);
        // nextPage();
        setLoading(false);
      } catch (err) {
         // console.log(err);
      }
    }
  };
  useEffect(() => {
    const OTPdata = sessionStorage.getItem("mobileOTP");
    const decryptOTP = OTPdata && decryptData(OTPdata);
     // console.log(random, decryptOTP, OTPdata, otpvalid, "wssssssssssss");
  }, [sessionStorage.getItem("mobileOTP")]);

  useEffect(() => {
    if (user?.email) {
      const email = user?.email;
      const encryptedUserEmail = email && encryptData(user?.email);
      sessionStorage.setItem("email_id", encryptedUserEmail);
      setLoading(true);
      const response = SendVerificationOTP(dispatch, user?.email);
      setCurrentPage(1);
      // nextPage();
      setLoading(false);
    }
  }, [dispatch, user]);
   // console.log(decryptMobile, "decryptMobiledecryptMobile");
   // console.log(toggleNum, "toggleNumhhhhhhhhh");

  return (
    <>
      {loading ? (
        // <Flex  className="flex items-center justify-center" >
        <div className="ml-[6vw] mt-0 md:ml-[10vw] md:mt-[12vw]">
          <Spin
            className="md:block hidden"
            indicator={
              <LoadingOutlined
                style={{
                  fontSize: "2vw",
                }}
                spin
              />
            }
          />
          <Spin
            className="block md:hidden"
            indicator={
              <LoadingOutlined
                style={{
                  fontSize: "7vw",
                }}
                spin
              />
            }
          />
        </div>
      ) : (
        <div className="md:block hidden ">
          <div className="flex flex-col justify-center items-center">
            <div className="text-[#1F487C] text-[1.5vw] font-extrabold  w-[27vw] text-center">
              Sign in to exciting discount and cashbacks !!
            </div>
            <div className="flex items-center mt-[1vw]">
              <button
                className={`border-[#1F487C]  border-[0.1vw] rounded-tl-[0.5vw] rounded-bl-[0.5vw] w-[13.5vw] gap-x-[0.5vw] h-[3vw] flex items-center justify-center ${
                  toggleNum === 1 ? "bg-[#1F487C]" : "bg-white"
                }`}
                // disabled
                onClick={() => setToggleNum(1)}
                // style={{
                //   transition: "ease-in all 0.3s",
                // }}
              >
                <FaPhoneAlt
                  color={`${toggleNum === 1 ? "white" : "#1F487C"}`}
                  size={"1.3vw"}
                />
                <span
                  className={`text-[1.2vw] ${
                    toggleNum === 1 ? "text-white" : "text-[#1F487C]"
                  }`}
                >
                  Mobile Number
                </span>
              </button>
              <button
                className={`border-[#1F487C] border-[0.1vw] rounded-tr-[0.5vw] rounded-br-[0.5vw] w-[13.5vw] gap-x-[0.5vw] h-[3vw] flex items-center justify-center ${
                  toggleNum === 2 ? "bg-[#1F487C]" : "bg-white"
                }`}
                // style={{
                //   transition: "ease-in all 0.3s",
                // }}
                onClick={() => setToggleNum(2)}
              >
                <MdEmail
                  color={` ${toggleNum === 2 ? "white" : "#1F487C"}`}
                  size={"1.6vw"}
                />
                <span
                  className={` text-[1.2vw] ${
                    toggleNum === 2 ? "text-white" : "text-[#1F487C]"
                  }`}
                >
                  Email Address
                </span>
              </button>
            </div>
            <Formik
              initialValues={{
                mobile: decryptMobile || "",
                email: decryptEmailId || "",
              }}
              validationSchema={
                toggleNum === 2 ? validationSchema : validationMobile
              }
              onSubmit={(values) => {
                handleSubmit(values);
                // sessionStorage.setItem("email_id", values.email);
              }}
              enableReinitialize
            >
              {({ isSubmitting, handleSubmit, values, handleChange }) => (
                <Form className="pb-[1vw]" onSubmit={handleSubmit}>
                  <div className="flex flex-col gap-y-[2vw] w-[27vw]">
                    <div className="col-span-2 flex relative mt-[2vw]">
                      {/* <div onClick={() => setToggleNum(1)}>
                      <Field
                        as="select"
                        name="option"
                        className={`border-r-[0.1vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.1vw] border-slate-500 border-py-[0.5vw] ${toggleNum === 1 ? 'bg-[#1F487C] text-white' : 'text-[#1F487C]  bg-white'} text-[1.1vw] h-[3vw] w-[5vw] outline-none px-[0.1vw]`}
                      >
                        <option
                          value=""
                          label="+91"
                          className="text-gray-400 text-[1.1vw]"
                        />
                      </Field>
                    </div>
                    <div
                      onClick={() => setToggleNum(2)}
                      className={`border-r-[0.1vw] border-t-[0.1vw] border-b-[0.1vw] border-slate-500 border-py-[0.5vw] text-[#1F487C] text-[1.1vw] h-[3vw] w-[5vw] outline-none px-[0.1vw] flex items-center justify-center ${toggleNum === 2 ? 'bg-[#1F487C] text-white' : 'text-[#1F487C]  bg-white'} `}
                    >    <div className=''>
                        <svg xmlns="http://www.w3.org/2000/svg" width="2.1vw" height="2.1vw" viewBox="0 0 48 48"><path fill="#ffc107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917" /><path fill="#ff3d00" d="m6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C16.318 4 9.656 8.337 6.306 14.691" /><path fill="#4caf50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44" /><path fill="#1976d2" d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002l6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917" /></svg>
                      </div>
                    </div> */}

                      {toggleNum === 1 ? (
                        <>
                          <Field
                            // as="select"
                            type="text"
                            // name="option"
                            name="country_code"
                            autoComplete="off"
                            value={"+91"}
                            disabled
                            className={`pl-[1vw] text-[#1F487C] flex items-center justify-center border-r-[0.1vw]   border-l-[0.1vw] rounded-tl-[0.5vw] rounded-bl-[0.5vw] border-t-[0.1vw] border-b-[0.1vw] border-slate-500 border-py-[0.5vw]  text-[1.1vw] h-[3vw] w-[5vw] outline-none px-[0.1vw]`}
                          />
                          {/* <option
                              value=""
                              label="+91"
                              className="text-gray-400 text-[1.1vw] w-[20vw]"
                            />
                          </Field> */}
                          <Field
                            type="text"
                            name="mobile"
                            autoComplete="off"
                            placeholder="Enter your mobile number"
                            maxLength={10}
                            value={values.mobile}
                            onChange={(e) => {
                              handleChange(e);
                            }}
                            className=" border-r-[0.1vw] border-t-[0.1vw] border-b-[0.1vw] rounded-tr-[0.5vw] rounded-br-[0.5vw] border-slate-500 text-[#1F487C] text-[1.2vw] h-[3vw] w-[22vw]  outline-none px-[1vw]"
                          />
                          <ErrorMessage
                            name="mobile"
                            component="div"
                            className="text-red-500 text-[0.8vw] absolute top-[3vw] left-[0.3vw]"
                          />
                        </>
                      ) : (
                        <>
                          <Field
                            type="email"
                            name="email"
                            autoComplete="off"
                            placeholder="Enter your email address"
                            maxLength={41}
                            value={values.email}
                            onKeyDown={(event) => handleKeyEnter(event, values)}
                            onChange={(e) => {
                              handleChange(e);
                            }}
                            className=" border-[0.1vw] rounded-[0.5vw] border-slate-500 text-[#1F487C] text-[1.2vw] h-[3vw] w-[27vw]  outline-none px-[1vw]"
                          />
                          <ErrorMessage
                            name="email"
                            component="div"
                            className="text-red-500 text-[0.8vw] absolute top-[3vw] left-[0.3vw]"
                          />
                        </>
                      )}
                    </div>

                    <button
                      type="submit"
                      className="bg-[#1F487C] w-[27vw] h-[3vw] rounded-[0.5vw] border-[0.1vw]  gap-x-[0.5vw] border-slate-700  flex items-center justify-center text-white"
                      // disabled={isSubmitting} // Disable button during submission
                    >
                      <span className="text-[1.2vw]">GENERATE OTP</span>
                      <span className="text-[1vw]">(One Time Password)</span>
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
            <div className="flex flex-col items-center ">
              <div className="text-[1vw]">
                <span className="font-bold text-[1vw]">OR</span>, Connect using
                Social Accounts
              </div>
              {/* <div className="cursor-pointer bg-[#1F487C] w-[12.5vw] h-[2.5vw] border-[0.1vw] rounded-[0.2vw] border-slate-700 text-[1vw] text-white flex items-center  gap-[0.5vw] mt-[2vw]">
              <div className="bg-white rounded-[0.2vw] ml-[0.1vw]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="2.1vw"
                  height="2.1vw"
                  viewBox="0 0 48 48"
                >
                  <path
                    fill="#ffc107"
                    d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917"
                  />
                  <path
                    fill="#ff3d00"
                    d="m6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C16.318 4 9.656 8.337 6.306 14.691"
                  />
                  <path
                    fill="#4caf50"
                    d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44"
                  />
                  <path
                    fill="#1976d2"
                    d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002l6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917"
                  />
                </svg>
              </div>
              <div>Sign in with Google</div>
            </div> */}
              <GoogleOAuthProvider clientId={clientId}>
                <div className="mt-[1vw] ">
                  <GoogleLogin
                    onSuccess={handleSuccess}
                    onError={handleFailure}
                  />
                </div>
              </GoogleOAuthProvider>

              <div className=" w-[27vw] text-[1vw] text-center  text-[#7F7F7F]  mt-[1vw] ">
                By Signing up, you agree to our
                <span
                  className="font-semibold text-[#1F487C] cursor-pointer"
                  onClick={() =>
                    navigation("/terms", { state: { toggleTabs: 2 } })
                  }
                >
                  {" "}
                  Terms & Conditions
                </span>{" "}
                and{" "}
                <span
                  className="font-semibold text-[#1F487C] cursor-pointer"
                  onClick={() =>
                    navigation("/privacy", { state: { toggleTabs: 1 } })
                  }
                >
                  Privacy Policy
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* ---MobileView--- */}

      <div className="md:hidden block pt-[4vw]">
        <div className="flex flex-col gap-[5vw]">
          <div className="text-[#1F487C] text-[4.5vw] font-semibold text-center">
            Sign into exciting discount and cashbacks !!
          </div>
          <div className="flex items-center mt-[1vw]">
            <button
              className={`border-[#1F487C] border-[0.1vw] rounded-tl-[1.5vw] rounded-bl-[1.5vw] w-[43vw] gap-x-[3vw] h-[9vw] flex items-center 
                  justify-center ${
                    toggleNum === 1 ? "bg-[#1F487C]" : "bg-white"
                  }`}
              onClick={() => setToggleNum(1)}
              // style={{
              //   transition: "ease-in all 0.3s",
              // }}
            >
              <FaPhoneAlt
                color={`${toggleNum === 1 ? "white" : "#1F487C"}`}
                size={"5vw"}
              />
              <span
                className={`text-[4vw] ${
                  toggleNum === 1 ? "text-white" : "text-[#1F487C]"
                }`}
              >
                Mobile Number
              </span>
            </button>
            <button
              className={`border-[#1F487C] border-[0.1vw] rounded-tr-[1.5vw] rounded-br-[1.5vw] w-[43vw] gap-x-[3vw] h-[9vw] flex items-center justify-center ${
                toggleNum === 2 ? "bg-[#1F487C]" : "bg-white"
              }`}
              // style={{
              //   transition: "ease-in all 0.3s",
              // }}
              onClick={() => setToggleNum(2)}
            >
              <MdEmail
                color={` ${toggleNum === 2 ? "white" : "#1F487C"}`}
                size={"5vw"}
              />
              <span
                className={` text-[4vw] ${
                  toggleNum === 2 ? "text-white" : "text-[#1F487C]"
                }`}
              >
                Email Address
              </span>
            </button>
          </div>
          <Formik
            initialValues={{
              mobile: decryptMobile || "",
              email: decryptEmailId || "",
            }}
            // validationSchema={validationSchema}
            onSubmit={(values) => {
              handleSubmit(values);
              // sessionStorage.setItem("email_id", values.email);
            }}
            enableReinitialize
          >
            {({ isSubmitting, handleSubmit, values, handleChange }) => (
              <Form className="pb-[1vw]" onSubmit={handleSubmit}>
                <div className="flex flex-col gap-y-[2vw] w-[85vw]">
                  <div className="col-span-2 flex relative">
                    {/* <div onClick={() => setToggleNum(1)}>
                      <Field
                        as="select"
                        name="option"
                        className={`border-r-[0.1vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.1vw] border-slate-500 border-py-[0.5vw] ${toggleNum === 1 ? 'bg-[#1F487C] text-white' : 'text-[#1F487C]  bg-white'} text-[1.1vw] h-[3vw] w-[5vw] outline-none px-[0.1vw]`}
                      >
                        <option
                          value=""
                          label="+91"
                          className="text-gray-400 text-[1.1vw]"
                        />
                      </Field>
                    </div>
                    <div
                      onClick={() => setToggleNum(2)}
                      className={`border-r-[0.1vw] border-t-[0.1vw] border-b-[0.1vw] border-slate-500 border-py-[0.5vw] text-[#1F487C] text-[1.1vw] h-[3vw] w-[5vw] outline-none px-[0.1vw] flex items-center justify-center ${toggleNum === 2 ? 'bg-[#1F487C] text-white' : 'text-[#1F487C]  bg-white'} `}
                    >    <div className=''>
                        <svg xmlns="http://www.w3.org/2000/svg" width="2.1vw" height="2.1vw" viewBox="0 0 48 48"><path fill="#ffc107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917" /><path fill="#ff3d00" d="m6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C16.318 4 9.656 8.337 6.306 14.691" /><path fill="#4caf50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44" /><path fill="#1976d2" d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002l6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917" /></svg>
                      </div>
                    </div> */}

                    {toggleNum === 1 ? (
                      <>
                        {/* <Field
                          as="select"
                          name="option"
                          className={` border-l-[0.1vw] text-[#1F487C] rounded-tl-[1.5vw] rounded-bl-[1.5vw] border-t-[0.1vw] border-b-[0.1vw] border-slate-500 border-py-[0.5vw]  
                              text-[1.1vw] h-[3vw] w-[5vw] outline-none px-[0.1vw]`}
                        >
                          <option
                            value=""
                            label="+91"
                            className="text-gray-400 text-[1.1vw] w-[20vw]"
                          />
                        </Field> */}
                        <Field
                          // as="select"
                          type="text"
                          // name="option"
                          name="country_code"
                          autoComplete="off"
                          value={"+91"}
                          disabled
                          className="placeholder:text-lg text-[4vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.1vw] rounded-tl-[1.5vw] rounded-bl-[1.5vw] border-slate-500 text-[#1F487C]
                            h-[10vw] w-[15vw] outline-none px-[3vw]"
                        />
                        <Field
                          type="text"
                          name="mobile"
                          placeholder="Enter your mobile number"
                          autoComplete="off"
                          maxLength={10}
                          value={values.mobile}
                          onChange={(e) => {
                            handleChange(e);
                          }}
                          className="placeholder:text-lg text-[4vw] border-[0.1vw] rounded-tr-[1.5vw] rounded-br-[1.5vw] border-slate-500 text-[#1F487C]
                            h-[10vw] w-[100vw] outline-none px-[3vw]"
                        />
                        <ErrorMessage
                          name="mobile"
                          component="div"
                          className="text-red-500 text-[0.8vw] absolute top-[3vw] left-[1vw]"
                        />
                      </>
                    ) : (
                      <>
                        <Field
                          type="email"
                          name="email"
                          placeholder={"Enter your email address"}
                          // maxLength={90}
                          value={values.email}
                          autoComplete="off"
                          onChange={(e) => {
                            handleChange(e);
                          }}
                          className="placeholder:text-lg text-[4vw] border-[0.1vw] rounded-[1.5vw] border-slate-500 text-[#1F487C]
                            h-[10vw] w-[100vw] outline-none px-[3vw]"
                        />
                        <ErrorMessage
                          name="email"
                          component="div"
                          className="text-red-500 text-[3.5vw] absolute top-[10vw] left-[3vw]"
                        />
                      </>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="bg-[#1F487C] w-[85vw] h-[10vw] rounded-[1.5vw] border-[0.1vw] gap-x-[0.5vw] border-slate-700 mt-[5vw]  
                      flex items-center justify-center text-white"
                    // disabled={isSubmitting} // Disable button during submission
                  >
                    <span className="text-[4vw]">GENERATE OTP</span>
                    <span className="text-[3vw]">(One Time Password)</span>
                  </button>
                </div>
              </Form>
            )}
          </Formik>
          <div className="flex flex-col items-center ">
            <div className="text-[4vw]">
              <span className="font-bold text-[4vw]">OR</span>, Connect using
              Social Accounts
            </div>
            {/* <div className="cursor-pointer bg-[#1F487C] w-[12.5vw] h-[2.5vw] border-[0.1vw] rounded-[0.2vw] border-slate-700 text-[1vw] text-white flex items-center  gap-[0.5vw] mt-[2vw]">
              <div className="bg-white rounded-[0.2vw] ml-[0.1vw]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="2.1vw"
                  height="2.1vw"
                  viewBox="0 0 48 48"
                >
                  <path
                    fill="#ffc107"
                    d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917"
                  />
                  <path
                    fill="#ff3d00"
                    d="m6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C16.318 4 9.656 8.337 6.306 14.691"
                  />
                  <path
                    fill="#4caf50"
                    d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44"
                  />
                  <path
                    fill="#1976d2"
                    d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002l6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917"
                  />
                </svg>
              </div>
              <div>Sign in with Google</div>
            </div> */}
            <div className="md:hidden block">
              <GoogleOAuthProvider clientId={clientId}>
                <div className="mt-[3vw]">
                  <GoogleLogin
                    onSuccess={handleSuccess}
                    theme="filled_blue"
                    onError={handleFailure}
                    width={"152px"}
                  />
                </div>
              </GoogleOAuthProvider>
            </div>

            <div className="md:block hidden">
              <GoogleOAuthProvider clientId={clientId}>
                <div className="mt-[3vw]">
                  <GoogleLogin
                    onSuccess={handleSuccess}
                    onError={handleFailure}
                    style={{ width: "100vw", height: "80vw" }}
                  />
                </div>
              </GoogleOAuthProvider>
            </div>

            <div className="w-[85vw] text-[3.7vw] text-center text-[#7F7F7F] mt-[7vw]">
              By Signing up, you agree to our
              <span
                className="font-semibold text-[#1F487C] cursor-pointer"
                onClick={() =>
                  navigation("/terms", { state: { toggleTabs: 2 } })
                }
              >
                {" "}
                Terms & Conditions
              </span>{" "}
              and{" "}
              <span
                className="font-semibold text-[#1F487C] cursor-pointer"
                onClick={() =>
                  navigation("/terms", { state: { toggleTabs: 1 } })
                }
              >
                Privacy Policy
              </span>
            </div>
            <div>
              <div
                onClick={() => setLoginMobileIsOpen(false)}
                // onClick={() => navigation("/")}
                className="gap-x-[0.5vw] mt-[9vw]  
                      flex items-center justify-center text-[#1F487C]"
              >
                Back
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileNumberLog;
