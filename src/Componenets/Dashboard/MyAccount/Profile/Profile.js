import React, { useEffect, useRef, useState } from "react";
// import { Modal } from "antd";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  GetProfileById,
  UpdateProfile,
} from "../../../../Api-TBS/MyAccounts/Profile";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import { GetUserDetails } from "../../../../Api-TBS/Login/Login";
import { TbEdit } from "react-icons/tb";
import { IoIosCloseCircle } from "react-icons/io";
import { LuSaveAll } from "react-icons/lu";
import { decryptData } from "../../../Common/Common-Functions/Encrypt-Decrypt";

export default function Profile({ userName, setUserName }) {
  const validationSchema = Yup.object().shape({
    user_name: Yup.string()
      .min(2, "Name must be at least 2 characters long")
      .max(100, "Name can't be longer than 50 characters")
      .required("Name is required"),
    date_of_birth: Yup.date()
      .max(new Date(), "Date of birth can't be in the future")
      .required("Date of birth is required"),
    email_id: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    mobile_number: Yup.string()
      .matches(/^\d{10}$/, "Mobile number must be exactly 10 digits")
      .required("Mobile number is required"),
  });

  // const [isModalOpen, setIsModalOpen] = useState(false);
  const [spinning, setSpinning] = React.useState(false);
  const dispatch = useDispatch();
  const hasFetched = useRef(false);
  const profiledata = useSelector((state) => state.profile_data);
  // const [isDisabled, setIsDisabled] = useState(false);
  const [editenable, setEditEnable] = useState(false);
  const [gender, setGender] = useState("male");

  // const showModal = () => {
  //   setIsModalOpen(true);
  // };

  // const handleSubmit = async (values) => {
  //   try {
  //     const data = await UpdateProfile(values);
  //     console.log(data, "datadatadata");
  //     // console.log(data.offer_name, "datadata");
  //     // setOfferData(data);
  //   } catch (error) {
  //     console.error("Error fetching additional user data", error);
  //   }
  // };

  const handleEdit = () => {
    setEditEnable(true);
    console.log("enabled", "true");
  };

  // useEffect(() => {
  //   const storedMobileNumber = sessionStorage.getItem("mobile_number");
  //   if (storedMobileNumber) {
  //     setIsDisabled(true);
  //   }
  //   const stroedEmailId = sessionStorage.getItem("email_id");
  //   if (stroedEmailId) {
  //     setIsDisabled(true);
  //   }
  // }, []);

  useEffect(() => {
    if (!hasFetched.current) {
      GetProfileById(dispatch, "tbs-pax1001");
      console.log("hitesting");
      hasFetched.current = true;
    }
  }, [dispatch]);

  useEffect(() => {
    const storedName1 = sessionStorage.getItem("user_name");
    const storedName = storedName1 && decryptData(storedName1);
    if (storedName !== userName) {
      setUserName(storedName);
    }
    console.log(storedName, "userName");
  }, [userName, setUserName]);

  return (
    <>
      <div className="bg-white shadow-lg shadow-gray-400  md:mx-[0vw] w-[90vw] md:w-full md:rounded-[1vw] rounded-[2vw] md:px-[2vw] px-[4vw] pb-[1vw]">
        {spinning ? (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background: "rgba(0, 0, 0, 0.2)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 1000,
            }}
          >
            <Spin
              className="pl-[20vw]"
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              spinning={spinning}
              indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />}
            />
          </div>
        ) : null}

        <Formik
          initialValues={{
            user_name: profiledata.user_name || "",
            date_of_birth: profiledata.date_of_birth || "",
            state: profiledata.state || "",
            email_id: profiledata.email_id || "",
            mobile_number: profiledata.mobile_number || "",
            gender: profiledata.gender || gender,
            occupation: profiledata.occupation || "",
            age: profiledata.age || "",
          }}
          validationSchema={validationSchema}
          onSubmit={async (values) => {
            setSpinning(true);
            try {
              const birthYear = new Date(values.date_of_birth).getFullYear();
              const currentYear = new Date().getFullYear();
              const age = currentYear - birthYear;
              values.age = age;
              GetUserDetails();
              // Simulating network delay with setTimeout
              // setTimeout(async () => {
              await UpdateProfile(values, setSpinning);
              setUserName(values.name);
              sessionStorage.setItem("user_name", profiledata.user_name);
              //window.location.reload();
              toast.success("Updated Successfully");
              setSpinning(false);
              setEditEnable(false);
              // }, 2000); // Adjust timeout duration as needed
            } catch (error) {
              console.error("Error updating profile", error);
              setSpinning(false); // Stop spinner in case of error
            }

            sessionStorage.setItem("mobile_number", values.mobile_number);
          }}
          enableReinitialize
        >
          {({ isSubmitting, handleSubmit, values, handleChange }) => (
            <Form
              className="py-[0.70vw] h-[75vh] overflow-y-auto"
              onSubmit={handleSubmit}
            >
              <div className="grid md:grid-rows-2 md:gap-[1vw] ">
                <div className="">
                  <span className="">
                    <div className="grid grid-cols-2 ">
                      <div className="text-[#1F487C] text-[4vw] md:mb-[0vw] mb-[5vw] md:text-[1.5vw] font-semibold">
                        Personal Details
                      </div>
                      <div className="pl-[22vw] md:block hidden">
                        {!editenable && (
                          <button
                            type="button"
                            onClick={handleEdit}
                            className="bg-[#1F487C] text-white w-[5vw] h-[2vw] ml-[6vw] rounded-[0.5vw] text-[1.2vw]"
                          >
                            Edit
                          </button>
                        )}
                        {editenable && (
                          <div>
                            <button
                              type="button"
                              onClick={() => setEditEnable(false)} // Use arrow function to pass the callback
                              className="border border-[#1F487C] text-[#1F487C] w-[5vw] h-[2vw] rounded-[0.5vw] text-[1.2vw]"
                            >
                              Cancel
                            </button>
                            <button
                              type="submit"
                              className="bg-[#1F487C] text-white ml-[1vw] w-[5vw] h-[2vw] rounded-[0.5vw] text-[1.2vw]"
                            >
                              Save
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </span>
                  <div className="pt-[1vw]">
                    <div className="grid md:grid-cols-2  grid-cols-1 gap-y-[6vw]  md:pt-[1vw] md:py-[1vw] relative">
                      <div className="">
                        <Field
                          type="text"
                          name="user_name"
                          autoComplete="off"
                          disabled={!editenable}
                          id="user_name"
                          className={`${
                            editenable ? `cursor-pointer` : "cursor-not-allowed"
                          } block py-[0.5vw] px-2 w-full md:w-[27vw] h-[10vw] md:h-[3vw] text-[4vw] md:text-[1vw] text-[#1F487C] bg-transparent border border-gray-400 rounded-[1vw] md:rounded-[0.5vw] 
                            focus:outline-none focus:ring-0 focus:border-[#1F487C] peer`}
                          placeholder=" "
                          onChange={handleChange}
                        />
                        <label
                          htmlFor="user_name"
                          // className={`absolute text-[4vw] md:text-[1.4vw] font-bold text-[#1F487C] duration-300 transform -translate-y-[0.2vw] scale-75 top-[-2.5vw] md:top-[0vw] left-[3vw] md:left-[0.8vw] origin-0 bg-white px-[0.2vw] md:peer-focus:left-[0.6vw]  peer-focus:text-[#1F487C] peer-placeholder-shown:scale-100  md:peer-placeholder-shown:translate-y-[2vw]
                          //   peer-placeholder-shown:translate-y-[5vw]
                          // md:peer-placeholder-shown:text-[1vw]
                          //    peer-placeholder-shown:text-[3.7vw]
                          // md:peer-focus:text-[1.1vw]
                          //   peer-focus:text-[3.7vw]  peer-focus:scale-75 peer-focus:-translate-y-[0.2vw] ${
                          //   values.user_name ? "-translate-y-[0.2vw]" : ""
                          // }`}
                          className={`absolute text-[4vw] md:text-[1.4vw] font-bold text-[#1F487C] duration-300 transform -translate-y-[0.2vw] scale-75 top-[-2.5vw] md:top-[0vw] left-[3vw] md:left-[0.8vw] origin-0 bg-white px-[0.2vw] peer-placeholder-shown:scale-100 md:peer-placeholder-shown:translate-y-[2vw]
                                peer-placeholder-shown:translate-y-[4.5vw]
                              md:peer-placeholder-shown:text-[1vw] 
                              peer-placeholder-shown:text-[3.7vw]
                              md:peer-focus:text-[1.1vw] 
                              peer-focus:text-[3.7vw] 
                              md:peer-focus:-translate-y-[.2vw]
                              peer-focus:-translate-y-[0vw]
                                ${
                                  values.user_name ? "-translate-y-[0.2vw]" : ""
                                }`}
                        >
                          {" "}
                          Name<span className="text-red-500 ml-1">*</span>
                        </label>
                        <ErrorMessage
                          name="user_name"
                          component="div"
                          className="text-red-500 md:text-[0.8vw] text-[2.1vw] absolute top-[10vw] md:top-[4vw]"
                        />
                      </div>
                      <div className="relative z-0 w-full">
                        <Field
                          type="date"
                          name="date_of_birth"
                          id="date_of_birth"
                          placeholder=""
                          disabled={!editenable}
                          className={`${
                            editenable ? `cursor-pointer` : "cursor-not-allowed"
                          } block py-[0.5vw] px-2 w-full  md:w-[27vw] h-[10vw] md:h-[3vw] text-[4vw] md:text-[1vw] text-[#1F487C] bg-transparent border border-gray-400 rounded-[1vw] md:rounded-[0.5vw]  
                            focus:outline-none focus:ring-0 focus:border-[#1f477c] peer`}
                          onChange={handleChange}
                        />
                        <label
                          htmlFor="date_of_birth"
                          className={`absolute font-bold text-[4vw] md:text-[1.4vw] text-[#1F487C] duration-300 transform -translate-y-[0.2vw] scale-75 top-[0.8vw] md:left-[0.4vw]  left-[.1vw]
                              origin-0 bg-white px-[0.2vw] peer-focus:left-[0.6vw] peer-focus:text-[#1F487C] peer-placeholder-shown:scale-100 
                              peer-placeholder-shown:translate-y-[0.4vw] md:peer-placeholder-shown:text-[1vw]
                              peer-placeholder-shown:text-[3.7vw] md:peer-focus:text-[1vw] peer-focus:text-[3.7vw] peer-focus:scale-75 md:peer-focus:-translate-y-[2vw] peer-focus:-translate-y-[4vw]
                              ${
                                values.date_of_birth
                                  ? "md:-translate-y-[2vw] -translate-y-[4vw]"
                                  : "md:-translate-y-[2vw] -translate-y-[4vw]"
                              }
                              `}
                        >
                          Date of Birth
                          <span className="text-red-500 ml-1">*</span>
                        </label>
                        <ErrorMessage
                          name="date_of_birth"
                          component="div"
                          className="text-red-500 md:text-[0.8vw] text-[2.1vw] absolute top-[10 vw] md:top-[3vw]"
                        />
                      </div>
                    </div>

                    <div className="md:py-[0.4vw] md:my-[0vw] my-[4vw]">
                      <span className="font-bold text-[4vw] md:text-[1.1vw]  text-[#1F487C]">
                        Gender
                      </span>
                      <div
                        className={`${
                          editenable ? `cursor-pointer` : "cursor-not-allowed"
                        } flex justify-between md:justify-normal mt-[2.5vw] md:mt-[0vw]
                             md:gap-x-[2vw]`}
                      >
                        <div
                          className={`
                            border-[0.1vw] border-slate-400 text-[#1F487C] md:rounded-[0.5vw] rounded-[1vw] md:text-[1.2vw] font-bold text-[3vw] md:h-[3vw] md:w-[12.5vw] h-[9vw] w-[40vw] outline-none px-[1vw]  flex items-center justify-between`}
                        >
                          <label
                            htmlFor="male"
                            className={`h-full w-full flex justify-between items-center md:px-[0vw] px-[4vw] ${
                              editenable
                                ? `cursor-pointer`
                                : "cursor-not-allowed"
                            } `}
                          >
                            <div className="order-first font-semibold text-[4vw] md:text-[1.2vw]">
                              Male
                            </div>
                            {/* <button
                                type="button"
                                disabled={!editenable}
                                className={`${
                                  editenable
                                    ? `cursor-pointer`
                                    : "cursor-not-allowed"
                                } ${gender === "male" && "bg-[#1F487C] text-white"}
                                md:rounded-[0.5vw] rounded-[1vw] md:text-[1.2vw] font-bold text-[3vw] md:h-[3vw] md:w-[12.5vw] h-[9vw] w-[40vw] text-[#1F487C] border-[0.1vw] border-slate-400`}
                                onClick={() => setGender("male")}
                              >
                                Male
                              </button> */}
                            <button type="button" className="">
                              <Field
                                id="male"
                                disabled={!editenable}
                                type="radio"
                                name="gender"
                                value="male"
                                className={`${
                                  editenable
                                    ? `cursor-pointer`
                                    : "cursor-not-allowed"
                                } `}
                                onChange={(e) => {
                                  handleChange(e);
                                  setGender("male");
                                }}
                              />
                            </button>
                          </label>
                        </div>
                        <div
                          className={` border-[0.1vw] border-slate-400 text-[#1F487C] md:rounded-[0.5vw] rounded-[1vw] md:text-[1.2vw] font-bold text-[3vw] md:h-[3vw] md:w-[12.5vw] h-[9vw] w-[40vw] outline-none px-[1vw]
                             flex items-center justify-between`}
                        >
                          {/* <button
                                type="button"
                                disabled={!editenable}
                                className={`${
                                  editenable
                                    ? `cursor-pointer`
                                    : "cursor-not-allowed"
                                } ${
                                  gender === "female" && "bg-[#1F487C] text-white"
                                }
                                 md:rounded-[0.5vw] rounded-[1vw] md:text-[1.2vw] font-bold text-[3vw] md:h-[3vw] md:w-[12.5vw] h-[9vw] w-[40vw] text-[#1F487C] border-[0.1vw] border-slate-400`}
                                onClick={() => setGender("female")}
                              >
                                Female
                              </button> */}
                          <label
                            htmlFor="female"
                            className={`h-full w-full flex justify-between items-center md:px-[0vw] px-[4vw] ${
                              editenable
                                ? `cursor-pointer`
                                : "cursor-not-allowed"
                            } `}
                          >
                            <div className="order-first font-semibold text-[4vw] md:text-[1.2vw]">
                              Female
                            </div>
                            <button type="button" className="">
                              <Field
                                id="female"
                                disabled={!editenable}
                                type="radio"
                                name="gender"
                                value="female"
                                className={`${
                                  editenable
                                    ? `cursor-pointer`
                                    : "cursor-not-allowed"
                                } `}
                                onChange={(e) => {
                                  handleChange(e);
                                  setGender("female");
                                }}
                              />
                            </button>
                          </label>
                        </div>
                      </div>
                      <ErrorMessage
                        name="gender"
                        component="div"
                        className="text-red-500"
                      />
                    </div>
                  </div>
                </div>
                <div className="relative ">
                  <div className="text-[#1F487C] text-[4vw] md:text-[1.5vw] pb-[5vw] md:pb-[1.5vw] font-semibold">
                    Contact Details
                  </div>
                  <div className="grid md:grid-cols-2 md:py-[1vw] md:gap-y-[2.5vw] mb-[2vw] md:mb-[0vw] grid-cols-1 gap-y-[6vw]">
                    <div className="relative z-0 w-full">
                      <Field
                        as="select"
                        disabled={!editenable}
                        name="state"
                        id="state"
                        className={`${
                          editenable ? `cursor-pointer` : "cursor-not-allowed"
                        } block py-[0.5vw] px-2 w-full  md:w-[27vw] h-[10vw] md:h-[3vw] text-[4vw] md:text-[1vw] text-[#1F487C] bg-transparent border 
                            border-gray-400 rounded-[1vw] md:rounded-[0.5vw] focus:outline-none focus:ring-0 focus:border-[#1F487C] peer`}
                        onChange={handleChange}
                      >
                        <option
                          value=""
                          label="State of Residence"
                          className="text-gray-400 text-[1vw]"
                        />
                        <option
                          value="Tamilnadu"
                          label="Tamilnadu"
                          className="text-[1vw] text-[#1F487C] "
                        />
                      </Field>
                      <label
                        htmlFor="residence"
                        className={`absolute text-[4vw] md:text-[1.4vw] font-bold text-[#1F487C] duration-300 transform -translate-y-[0.2vw] scale-75 md:top-[0.8vw] top-[-.1vw] md:left-[0vw] left-[-.4vw]  origin-0 bg-white px-[0.2vw] peer-focus:left-[0.6vw] peer-focus:text-[#1F487C] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-[-3vw] md:peer-placeholder-shown:translate-y-[0.4vw] peer-placeholder-shown:text-[1vw] md:peer-focus:text-[1vw] peer-focus:text-[3.7vw] peer-focus:scale-75 peer-focus:-translate-y-[2vw] ${
                          values.state
                            ? "md:-translate-y-[2vw] -translate-y-[4vw] "
                            : "md:-translate-y-[2vw] -translate-y-[2.5vw]"
                        }`}
                      >
                        State of Residence
                        <span className="text-red-500 ml-1">*</span>
                      </label>
                      <div className="absolute top-[10vw] md:top-[3vw] md:left-[1.5vw] md:text-[0.8vw] text-[2.5vw] text-[#1F487C] opacity-60">
                        Required for GST Tax Invoicing
                      </div>
                    </div>
                    <div className="relative z-0 w-full">
                      <Field
                        type="email_id"
                        name="email_id"
                        id="email_id"
                        autoComplete="off"
                        className={`${
                          editenable ? `cursor-pointer` : "cursor-not-allowed"
                        } block py-[0.5vw] px-2 w-full  md:w-[27vw] h-[10vw] md:h-[3vw] text-[4vw] md:text-[1vw] text-[#1F487C] bg-transparent border border-gray-400 rounded-[1vw] md:rounded-[0.5vw]
                             focus:outline-none focus:ring-0 focus:border-[#1F487C] peer`}
                        onChange={handleChange}
                        disabled={!editenable}
                      />
                      <label
                        htmlFor="email_id"
                        className={`absolute text-[4vw] md:text-[1.4vw] font-bold text-[#1F487C] duration-300 transform -translate-y-[0.2vw] scale-75 md:top-[0.9vw] top-[2vw] left-[2.5vw] md:left-[0.6vw] origin-0 bg-white px-[0.2vw] peer-focus:left-[2.5vw]  md:peer-focus:left-[0.6vw] peer-focus:text-[#1F487C] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-[0.4vw] peer-placeholder-shown:text-[1vw] md:peer-focus:text-[1vw] peer-focus:text-[3.7vw] peer-focus:scale-75 md:peer-focus:-translate-y-[2vw] peer-focus:-translate-y-[5vw] ${
                          values.email_id
                            ? "md:-translate-y-[2vw] -translate-y-[5vw] "
                            : ""
                        }`}
                      >
                        Email<span className="text-red-500 ml-1">*</span>
                      </label>
                      <ErrorMessage
                        name="email_id"
                        component="div"
                        className="text-red-500 md:text-[0.8vw] text-[2.1vw] absolute top-[10vw] md:top-[2.8vw]"
                      />
                    </div>
                    <div className="relative z-0 w-full md:pt-[1.5vw] ">
                      <Field
                        type="text"
                        name="mobile_number"
                        autoComplete="off"
                        id="mobile_number"
                        className={`${
                          editenable ? `cursor-pointer` : "cursor-not-allowed"
                        } block py-[0.5vw] px-2 w-full md:w-[27vw] h-[10vw] md:h-[3vw] text-[4vw] md:text-[1vw] text-[#1F487C] bg-transparent border border-gray-400 
                           rounded-[1vw] md:rounded-[0.5vw] focus:outline-none focus:ring-0 focus:border-[#1F487C] peer`}
                        onChange={handleChange}
                        disabled={!editenable}
                        // disabled={true}
                      />
                      <label
                        htmlFor="mobile_number"
                        className={`absolute text-[4vw] md:text-[1.4vw] font-bold text-[#1F487C] duration-300 transform -translate-y-[0.2vw] scale-75 md:top-[2.3vw] top-[2vw] md:left-[0vw] left-[-.4vw] origin-0 bg-white px-[0.2vw] peer-focus:left-[0.6vw] md:peer-focus:top-[2.5vw] peer-focus:top-[0vw] peer-focus:text-[#1F487C] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-[0.4vw] peer-placeholder-shown:text-[1vw] md:peer-focus:text-[1vw]  peer-focus:text-[3.7vw] peer-focus:scale-75 md:peer-focus:-translate-y-[2vw] peer-focus:-translate-y-[4vw] ${
                          values.mobile_number
                            ? "md:-translate-y-[2vw] -translate-y-[5vw] "
                            : ""
                        }`}
                      >
                        Mobile Number
                        <span className="text-red-500 ml-1">*</span>
                      </label>
                      <ErrorMessage
                        name="mobile_number"
                        component="div"
                        className="text-red-500 md:text-[0.8vw] text-[2.1vw] absolute top-[10vw]   md:top-[5vw]"
                      />
                    </div>
                    <div className="relative z-0 w-full md:pt-[1.5vw] pt-[0vw]">
                      <Field
                        as="select"
                        name="occupation"
                        id="occupation"
                        className={`${
                          editenable ? `cursor-pointer` : "cursor-not-allowed"
                        } block py-[0.5vw] px-2 w-full  md:w-[27vw] h-[10vw] md:h-[3vw] text-[4vw] md:text-[1vw] text-[#1F487C] bg-transparent border
                               border-gray-400 rounded-[1vw] md:rounded-[0.5vw] focus:outline-none focus:ring-0 focus:border-[#1F487C] peer`}
                        onChange={handleChange}
                        disabled={!editenable}
                        // disabled={true}
                      >
                        <option value="Business">Business</option>
                        <option value="General Public">General Public</option>
                        <option value="Physically Challenged">
                          Physically Challenged
                        </option>
                        <option value="Pilgrim Travelers">
                          Pilgrim Traveler
                        </option>
                        <option value="Senior Citizens">Senior Citizen</option>
                        <option value="Students">Student</option>
                        <option value="Tourist">Tourist</option>
                        <option value="Corporate Travelers">
                          Corporate Traveler
                        </option>
                        {/* <option
                              value=""
                              label="Occupation"
                              className="text-gray-400 text-[1.1vw]"
                            />
                            <option
                              value="General Public"
                              label="General Public"
                              className="text-gray-400 text-[1.1vw]"
                            />
                             <option
                              value="Physically Challenged"
                              label="Physically Challenged"
                              className="text-gray-400 text-[1.1vw]"
                            />
                             <option
                              value="Pilgrim Travelers"
                              label="Pilgrim Travelers"
                              className="text-gray-400 text-[1.1vw]"
                            />
                             <option
                              value="Senior Citizens"
                              label="Senior Citizens"
                              className="text-gray-400 text-[1.1vw]"
                            />
                             <option
                              value="Students"
                              label="Students"
                              className="text-gray-400 text-[1.1vw]"
                            />
                             <option
                              value="Tourist"
                              label="Tourist"
                              className="text-gray-400 text-[1.1vw]"
                            /> */}
                      </Field>
                      <label
                        htmlFor="occupation"
                        className={`absolute text-[4vw] md:text-[1.4vw] font-bold text-[#1F487C] duration-300 transform -translate-y-[0.2vw] scale-75 md:top-[2.3vw] top-[1.75vw] 
                              md:left-[0vw] left-[-.4vw] origin-0 bg-white px-[0.2vw] peer-focus:left-[0.6vw] md:peer-focus:top-[2.5vw] peer-focus:top-[0.6vw] peer-focus:text-[#1F487C] 
                              peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-[0.4vw] peer-placeholder-shown:text-[1vw] md:peer-focus:text-[1vw]  peer-focus:text-[3.7vw] 
                              peer-focus:scale-75 md:peer-focus:-translate-y-[2vw] peer-focus:-translate-y-[4vw] ${
                                values.occupation
                                  ? "md:-translate-y-[2vw] -translate-y-[5vw] "
                                  : ""
                              }`}
                      >
                        Occupation
                        <span className="text-red-500 ml-1">*</span>
                      </label>
                      <ErrorMessage
                        name="occupation"
                        component="div"
                        className="text-red-500 md:text-[0.8vw] text-[2.1vw] absolute top-[10vw] md:top-[2.8vw]"
                      />
                    </div>
                  </div>
                  <div className=" md:hidden block mt-[8vw] mb-[4vw]">
                    {!editenable && (
                      <div className="flex justify-center">
                        <button
                          type="button"
                          onClick={handleEdit}
                          className="bg-[#1F487C] items-center text-center mt-[2vw] text-white w-[40vw] h-[9vw]  md:w-[5vw] md:h-[2vw]  rounded-[1vw]  md:rounded-[0.5vw] text-[4vw] font-bold md:text-[1.2vw]"
                        >
                          Edit
                        </button>
                      </div>
                    )}
                    {editenable && (
                      <div className="md:mt-[1vw] mt-[3vw] flex justify-between">
                        <button
                          type="button"
                          onClick={() => setEditEnable(false)} // Use arrow function to pass the callback
                          className="border border-[#1F487C] text-[#1F487C]  w-[40vw] h-[9vw] md:w-[5vw] md:h-[2vw] rounded-[1vw] md:rounded-[0.5vw] text-[4vw] font-bold md:text-[1.2vw]"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="bg-[#1F487C] text-white md:ml-[1vw] ml-[3vw] w-[40vw] h-[9vw] md:w-[5vw] md:h-[2vw] rounded-[1vw] md:rounded-[0.5vw] text-[4vw] font-bold md:text-[1.2vw]"
                        >
                          Save
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* <div className="flex flex-col items-center mb-[1vw]">
                    <button
                      type="submit"
                      className="bg-[#1F487C] text-[white] w-[12vw] h-[3vw] rounded-full text-[1.25vw]"
                    >
                      Update
                    </button>
                  </div>  */}
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
}
