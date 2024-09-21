import React, { useState } from "react";
import { Modal, Spin } from "antd";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  GoogleOAuthProvider,
  GoogleLogin,
  useGoogleLogin,
} from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import { SendVerificationOTP } from "../../Api/Login/Login";
import { useDispatch } from "react-redux";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail, MdOutlineMail } from "react-icons/md";
import axios from "axios";
import { LoadingOutlined } from "@ant-design/icons";
import { Flex } from "antd";
import { useNavigate } from "react-router";
const MobileNumberLog = ({ setCurrentPage }) => {
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const validationSchema = Yup.object({
    // mobile: Yup.string()
    //   .required("Mobile number is required")
    //   .matches(/^\d{10}$/, "Mobile number must be exactly 10 digits"),
    email: Yup.string()
      .matches(emailPattern, "Invalid email address format") // Custom regex pattern for email
      .required("Email is required"),
  });

  const [toggleNum, setToggleNum] = useState(2);

  const handleSuccess = (response) => {
    const token = response.credential;
    // const decodedUser = jwt_decode(token); // Decode the JWT
    // console.log("User Information:", decodedUser); // Log the decoded token
  };

  // const handleSuccess = useGoogleLogin({
  //   onSuccess: async (tokenResponse) => {
  //     console.log(tokenResponse);
  //     const userInfo = await axios.get(
  //       'https://www.googleapis.com/oauth2/v3/userinfo',
  //       { headers: { Authorization: 'Bearer <tokenResponse.access_token>' } },
  //     );

  //     console.log(userInfo);
  //   },
  //   onError: errorResponse => console.log(errorResponse),
  // });
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const response = await SendVerificationOTP(dispatch, values);
      console.log(response, "responseresponse77");

      setCurrentPage(1);
      // nextPage();
      setLoading(false);
    } catch {}
  };

  const handleFailure = (error) => {
    console.log("Google login failed: ", error);
  };
  console.log(toggleNum, "toggleNumtoggleNum");
  const navigation = useNavigate();
  return (
    <>
      {loading ? (
        // <Flex  className="flex items-center justify-center" >
        <div className="ml-[10vw] mt-[12vw]">
          <Spin
            indicator={
              <LoadingOutlined
                style={{
                  fontSize: "2vw",
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
                className={`border-[#1F487C] cursor-not-allowed border-[0.1vw] rounded-tl-[0.5vw] rounded-bl-[0.5vw] w-[13.5vw] gap-x-[0.5vw] h-[3vw] flex items-center justify-center ${
                  toggleNum == 1 ? "bg-[#1F487C]" : "bg-white"
                }`}
                disabled
                onClick={() => setToggleNum(1)}
                // style={{
                //   transition: "ease-in all 0.3s",
                // }}
              >
                <FaPhoneAlt
                  color={`${toggleNum == 1 ? "white" : "#1F487C"}`}
                  size={"1.3vw"}
                />
                <span
                  className={`text-[1.2vw] ${
                    toggleNum == 1 ? "text-white" : "text-[#1F487C]"
                  }`}
                >
                  Mobile Number
                </span>
              </button>
              <button
                className={`border-[#1F487C] border-[0.1vw] rounded-tr-[0.5vw] rounded-br-[0.5vw] w-[13.5vw] gap-x-[0.5vw] h-[3vw] flex items-center justify-center ${
                  toggleNum == 2 ? "bg-[#1F487C]" : "bg-white"
                }`}
                // style={{
                //   transition: "ease-in all 0.3s",
                // }}
                onClick={() => setToggleNum(2)}
              >
                <MdEmail
                  color={` ${toggleNum == 2 ? "white" : "#1F487C"}`}
                  size={"1.6vw"}
                />
                <span
                  className={` text-[1.2vw] ${
                    toggleNum == 2 ? "text-white" : "text-[#1F487C]"
                  }`}
                >
                  Email Address
                </span>
              </button>
            </div>
            <Formik
              initialValues={{
                mobile: "",
                email: sessionStorage.getItem("email_id") || "",
              }}
              validationSchema={validationSchema}
              onSubmit={(values) => {
                handleSubmit(values);
                sessionStorage.setItem("email_id", values.email);
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
                        className={`border-r-[0.1vw] border-l-[0.1vw] border-t-[0.1vw] border-b-[0.1vw] border-slate-500 border-py-[0.5vw] ${toggleNum == 1 ? 'bg-[#1F487C] text-white' : 'text-[#1F487C]  bg-white'} text-[1.1vw] h-[3vw] w-[5vw] outline-none px-[0.1vw]`}
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
                      className={`border-r-[0.1vw] border-t-[0.1vw] border-b-[0.1vw] border-slate-500 border-py-[0.5vw] text-[#1F487C] text-[1.1vw] h-[3vw] w-[5vw] outline-none px-[0.1vw] flex items-center justify-center ${toggleNum == 2 ? 'bg-[#1F487C] text-white' : 'text-[#1F487C]  bg-white'} `}
                    >    <div className=''>
                        <svg xmlns="http://www.w3.org/2000/svg" width="2.1vw" height="2.1vw" viewBox="0 0 48 48"><path fill="#ffc107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917" /><path fill="#ff3d00" d="m6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C16.318 4 9.656 8.337 6.306 14.691" /><path fill="#4caf50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44" /><path fill="#1976d2" d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002l6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917" /></svg>
                      </div>
                    </div> */}

                      {toggleNum == 1 ? (
                        <>
                          <Field
                            as="select"
                            name="option"
                            className={` border-l-[0.1vw] rounded-tl-[0.5vw] rounded-bl-[0.5vw] border-t-[0.1vw] border-b-[0.1vw] border-slate-500 border-py-[0.5vw]  text-[1.1vw] h-[3vw] w-[5vw] outline-none px-[0.1vw]`}
                          >
                            <option
                              value=""
                              label="+91"
                              className="text-gray-400 text-[1.1vw] w-[20vw]"
                            />
                          </Field>
                          <Field
                            type="text"
                            name="mobile"
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
                            className="text-red-500 text-[0.8vw] absolute top-[3vw] left-[1vw]"
                          />
                        </>
                      ) : (
                        <>
                          <Field
                            type="email"
                            name="email"
                            placeholder="Enter your email address"
                            maxLength={50}
                            value={values.email}
                            onChange={(e) => {
                              handleChange(e);
                            }}
                            className=" border-[0.1vw] rounded-[0.5vw] border-slate-500 text-[#1F487C] text-[1.2vw] h-[3vw] w-[27vw]  outline-none px-[1vw]"
                          />
                          <ErrorMessage
                            name="email"
                            component="div"
                            className="text-red-500 text-[0.8vw] absolute top-[3vw] left-[1vw]"
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
              <GoogleOAuthProvider clientId="374324582256-oisc65slv95m53pod51lmg7r5elfobjv.apps.googleusercontent.com">
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
                    navigation("/terms", { state: { toggleTabs: 1 } })
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

      <div className="md:hidden block">
        <div className="flex flex-col gap-[5vw]">
          <div className="text-[#1F487C] text-[6vw] font-semibold text-center">
            Sign into exciting discount and cashbacks !!
          </div>
          <Formik
            initialValues={{
              mobile: "",
            }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              // nextPage();
            }}
            enableReinitialize
          >
            {({
              isSubmitting,
              isValid,
              handleSubmit,
              values,
              handleChange,
            }) => (
              <Form className="py-[1vw]" onSubmit={handleSubmit}>
                <div className="grid grid-rows-2 gap-y-[9vw] relative">
                  <div className=" flex w-full">
                    <Field
                      as="select"
                      name="option"
                      className="border-[0.1vw] border-slate-500 text-[#1F487C] text-[4vw] h-[13vw] w-[20vw] rounded-l-[0.2vw] outline-none px-[0.1vw]"
                    >
                      <option
                        value=""
                        label="+91"
                        className="text-gray-400 text-[1.1vw]"
                      />
                    </Field>
                    <Field
                      type="text"
                      name="mobile"
                      placeholder="Mobile Number"
                      maxLength={10}
                      value={values.mobile}
                      onChange={(e) => {
                        handleChange(e);
                      }}
                      className="customize-placeholder border-[0.1vw] border-slate-500 text-[#1F487C] text-[4vw] h-[13vw] w-full rounded-r-[0.2vw] outline-none px-[1vw]"
                    />
                    <ErrorMessage
                      name="mobile"
                      component="div"
                      className="text-red-500 text-[3.5vw] absolute top-[13vw]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="bg-[#1F487C] w-full h-[13vw] border-[0.1vw] rounded-[1vw] border-slate-700 text-[4vw] text-white "
                  >
                    GENERATE OTP(One Time Password)
                  </button>
                </div>
              </Form>
            )}
          </Formik>
          <div className="flex flex-col items-center gap-[5vw]">
            <div className="text-[3.5vw]">
              <span className="font-bold text-[4vw]">OR</span>, Connect using
              Social Accounts
            </div>
            <div className="cursor-pointer bg-[#1F487C] w-[60vw] h-[10vw] border-[0.1vw] rounded-[1vw] border-slate-700 text-[4.5vw] text-white flex items-center  gap-[0.5vw]">
              <div className="bg-white rounded-[1vw] ml-[0.1vw]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="9vw"
                  height="9vw"
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
              <div className="pl-[3vw]">Sign in with Google</div>
            </div>
            <div className="text-[3.5vw] text-center text-[#1F487C]  mt-[3vw] ">
              By Signing up, you agree to our
              <span className="font-semibold">
                {" "}
                Terms & Conditions
              </span> and <span className="font-semibold">Privacy Policy</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileNumberLog;
