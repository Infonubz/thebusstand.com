import React, { useEffect, useRef, useState } from "react";
// import { Modal } from "antd";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  GetProfileById,
  UpdateProfile,
} from "../../../../Api/MyAccounts/Profile";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import { GetUserDetails } from "../../../../Api/Login/Login";

const HomeProfile = () => {
  const validationSchema = Yup.object().shape({
    user_name: Yup.string()
      .min(2, "Name must be at least 2 characters long")
      .max(50, "Name can't be longer than 50 characters")
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

  const dispatch = useDispatch();
  const hasFetched = useRef(false);

  // const [isDisabled, setIsDisabled] = useState(false);
  const [editenable, setEditEnable] = useState(false);
  const [gender, setGender] = useState("male");

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
  const profiledata = useSelector((state) => state.profile_data);
  console.log(profiledata, "profiledataprofiledata");

  return (
    <>
      <div className="bg-white rounded-[1vw] px-[2vw] pb-[1vw]">
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
                await UpdateProfile(values,setSpinning);
                console.log(values, "valuesvalues");
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
            <Form className="py-[1vw]" onSubmit={handleSubmit}>
              <div className="grid grid-rows-2 gap-[1vw]">
                <div>
                  <div className="grid grid-cols-2">
                    <div className="text-[#1F487C] text-[1.5vw] font-semibold">
                      Personal Details
                    </div>
                    <div className="pl-[22vw]">
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
                  <div className="pt-[1vw]">
                    <div className="grid grid-cols-2 pt-[1vw] py-[1vw] relative">
                      <div className="">
                        <Field
                          type="text"
                          name="user_name"
                          disabled={!editenable}
                          id="user_name"
                          className={`${
                            editenable ? `cursor-pointer` : "cursor-not-allowed"
                          } block py-[0.5vw] px-2 w-[27vw] h-[3vw] text-[1vw] text-[#1F487C] bg-transparent border border-gray-400 rounded-[0.5vw] 
                        focus:outline-none focus:ring-0 focus:border-[#1F487C] peer`}
                          placeholder=" "
                          onChange={handleChange}
                        />
                        <label
                          htmlFor="user_name"
                          className={`absolute font-bold text-[1.4vw] text-[#1F487C] duration-300 transform -translate-y-[0.2vw] scale-75 top-[0.1vw] left-[0.4vw] 
                          origin-0 bg-white px-[0.2vw] peer-focus:left-[0.6vw] peer-focus:text-[#1F487C] peer-placeholder-shown:scale-100 
                          peer-placeholder-shown:translate-y-[0.4vw] peer-placeholder-shown:text-[vw] peer-focus:text-[1vw] peer-focus:scale-75 peer-focus:-translate-y-[0.2vw] ${
                            values.user_name ? "-translate-y-[0.2vw]" : ""
                          }`}
                        >
                          {" "}
                          Name<span className="text-red-500 ml-1">*</span>
                        </label>
                        <ErrorMessage
                          name="user_name"
                          component="div"
                          className="text-red-500 text-[0.8vw] absolute top-[4vw]"
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
                          } block py-[0.5vw] px-2 w-[27vw] h-[3vw] text-[1vw] text-[#1F487C] bg-transparent border border-gray-400 rounded-[0.5vw] 
                        focus:outline-none focus:ring-0 focus:border-[#1f477c] peer`}
                          onChange={handleChange}
                        />
                        <label
                          htmlFor="date_of_birth"
                          className={`absolute font-bold text-[1.4vw] text-[#1F487C] duration-300 transform -translate-y-[0.2vw] scale-75 top-[0.8vw] left-[0.4vw] 
                          origin-0 bg-white px-[0.2vw] peer-focus:left-[0.6vw] peer-focus:text-[#1F487C] peer-placeholder-shown:scale-100 
                          peer-placeholder-shown:translate-y-[0.4vw] peer-placeholder-shown:text-[vw] peer-focus:text-[1vw] peer-focus:scale-75 peer-focus:-translate-y-[2vw] 
                          ${
                            values.date_of_birth
                              ? "-translate-y-[2vw]"
                              : "-translate-y-[2vw]"
                          }
                          `}
                        >
                          Date of Birth
                          <span className="text-red-500 ml-1">*</span>
                        </label>
                        <ErrorMessage
                          name="date_of_birth"
                          component="div"
                          className="text-red-500 text-[0.8vw] absolute top-[4vw]"
                        />
                      </div>
                    </div>

                    <div className="py-[1vw]">
                      <span className="font-bold text-[1.1vw] text-[#1F487C]">
                        Gender
                      </span>
                      <div
                        className={`${
                          editenable ? `cursor-pointer` : "cursor-not-allowed"
                        } flex gap-x-[2vw]`}
                      >
                        <div
                        // className={`
                        // border-[0.1vw] border-slate-400 text-[#1F487C] text-[1vw] h-[3vw] w-[12.5vw] outline-none px-[1vw] rounded-[0.5vw] flex items-center justify-between`}
                        >
                          {/* <div className="order-first">Male</div> */}
                          <button
                            type="button"
                            disabled={!editenable}
                            className={`${
                              editenable
                                ? `cursor-pointer`
                                : "cursor-not-allowed"
                            } ${gender === "male" && "bg-[#1F487C] text-white"}
                            rounded-[0.5vw] text-[1.2vw] h-[3vw] w-[12.5vw] text-[#1F487C] border-[0.1vw] border-slate-400`}
                            onClick={() => setGender("male")}
                          >
                            Male
                          </button>
                          {/* <button 
                          type="button"
                          className="">
                             <Field
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
                          </button>  */}
                        </div>
                        <div
                        // className={`${gender === "female" && "bg-[#1F487C] text-white"} border-[0.1vw] border-slate-400 text-[#1F487C] text-[1vw] h-[3vw] w-[12.5vw] outline-none px-[1vw]
                        // rounded-[0.5vw] flex items-center justify-between`}
                        >
                          <button
                            type="button"
                            disabled={!editenable}
                            className={`${
                              editenable
                                ? `cursor-pointer`
                                : "cursor-not-allowed"
                            } ${
                              gender === "female" && "bg-[#1F487C] text-white"
                            }
                             rounded-[0.5vw] text-[1.2vw] h-[3vw] w-[12.5vw] text-[#1F487C] border-[0.1vw] border-slate-400`}
                            onClick={() => setGender("female")}
                          >
                            Female
                          </button>
                          {/* <div className="order-first">Female</div> */}
                          {/* <div className="order-last flex items-center">
                            <Field
                              disabled={!editenable}
                              type="radio"
                              name="gender"
                              value="female"
                              className={`${
                                editenable
                                  ? `cursor-pointer`
                                  : "cursor-not-allowed"
                              } h-[1vw] w-[1vw]`}
                              onChange={(e) => {
                                handleChange(e);
                                setGender("female");
                              }}
                            />
                          </div> */}
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
                <div className="relative">
                  <div className="text-[#1F487C] text-[1.5vw] pb-[1.5vw] font-semibold">
                    Contact Details
                  </div>
                  <div className="grid grid-cols-2 py-[1vw] gap-y-[2.5vw]">
                    <div className="relative z-0 w-full">
                      <Field
                        as="select"
                        disabled={!editenable}
                        name="state"
                        id="state"
                        className={`${
                          editenable ? `cursor-pointer` : "cursor-not-allowed"
                        } block py-[0.5vw] px-2 w-[27vw] h-[3vw] text-[1vw] text-[#1F487C] bg-transparent border 
                        border-gray-400 rounded-[0.5vw] focus:outline-none focus:ring-0 focus:border-[#1F487C] peer`}
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
                        className={`absolute text-[1.4vw] font-bold text-[#1F487C] duration-300 transform -translate-y-[0.2vw] scale-75 top-[0.8vw] left-[0vw] origin-0 bg-white px-[0.2vw] peer-focus:left-[0.6vw] peer-focus:text-[#1F487C] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-[0.4vw] peer-placeholder-shown:text-[vw] peer-focus:text-[1vw] peer-focus:scale-75 peer-focus:-translate-y-[2vw] ${
                          values.state
                            ? "-translate-y-[2vw]"
                            : "-translate-y-[2vw]"
                        }`}
                      >
                        State of Residence
                        <span className="text-red-500 ml-1">*</span>
                      </label>
                      <div className="absolute top-[3vw] left-[1.5vw] text-[0.8vw] text-[#1F487C] opacity-60">
                        Required for GST Tax Invoicing
                      </div>
                    </div>
                    <div className="relative z-0 w-full">
                      <Field
                        type="email_id"
                        name="email_id"
                        id="email_id"
                        className={`${
                          editenable ? `cursor-pointer` : "cursor-not-allowed"
                        } block py-[0.5vw] px-2 w-[27vw] h-[3vw] text-[1vw] text-[#1F487C] bg-transparent border border-gray-400 rounded-[0.5vw]
                         focus:outline-none focus:ring-0 focus:border-[#1F487C] peer`}
                        autocomplete="off"
                        onChange={handleChange}
                        disabled={!editenable}
                      />
                      <label
                        htmlFor="email_id"
                        className={`absolute text-[1.4vw] font-bold text-[#1F487C] duration-300 transform -translate-y-[0.2vw] scale-75 top-[0.8vw] left-[0.4vw] origin-0 bg-white px-[0.2vw] peer-focus:left-[0.6vw] peer-focus:text-[#1F487C] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-[0.4vw] peer-placeholder-shown:text-[1vw] peer-focus:text-[1vw] peer-focus:scale-75 peer-focus:-translate-y-[2vw] ${
                          values.email_id ? "-translate-y-[2vw]" : ""
                        }`}
                      >
                        Email<span className="text-red-500 ml-1">*</span>
                      </label>
                      <ErrorMessage
                        name="email_id"
                        component="div"
                        className="text-red-500 text-[0.8vw] absolute top-[2.8vw]"
                      />
                    </div>
                    <div className="relative z-0 w-full pt-[1.5vw]">
                      <Field
                        type="text"
                        name="mobile_number"
                        id="mobile_number"
                        className={`${
                          editenable ? `cursor-pointer` : "cursor-not-allowed"
                        } block py-[0.5vw] px-2 w-[27vw] h-[3vw] text-[1vw] text-[#1F487C] bg-transparent border border-gray-400 
                        rounded-[0.5vw] focus:outline-none focus:ring-0 focus:border-[#1F487C] peer`}
                        autocomplete="off"
                        onChange={handleChange}
                        disabled={!editenable}
                        // disabled={true}
                      />
                      <label
                        htmlFor="mobile_number"
                        className={`absolute text-[1.4vw] font-bold text-[#1F487C] duration-300 transform -translate-y-[0.2vw] scale-75 top-[2.3vw] left-[0vw] origin-0 bg-white px-[0.2vw] peer-focus:left-[0.6vw] peer-focus:text-[#1F487C] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-[0.4vw] peer-placeholder-shown:text-[1vw] peer-focus:text-[1vw] peer-focus:scale-75 peer-focus:-translate-y-[2vw] ${
                          values.mobile_number ? "-translate-y-[2vw]" : ""
                        }`}
                      >
                        Mobile Number
                        <span className="text-red-500 ml-1">*</span>
                      </label>
                      <ErrorMessage
                        name="mobile_number"
                        component="div"
                        className="text-red-500 text-[0.8vw] absolute top-[2.8vw]"
                      />
                    </div>
                    <div className="relative z-0 w-full pt-[1.5vw]">
                    <Field
                        as="select"
                        name="occupation"
                        id="occupation"
                        className="block py-[0.5vw] px-2 w-[27vw] h-[3vw] text-[1vw] text-[#1F487C] bg-transparent border border-gray-300 rounded-[0.5vw] focus:outline-none focus:ring-0 focus:border-[#1F487C] peer"
                        autocomplete="off"
                        onChange={handleChange}
                        disabled={!editenable}
                        // disabled={true}
                      >
                        <option value="Business">Business</option>
                        <option value="GeneralPublic">General Public</option>
                        <option value="PhysicallyChallenged">Physically Challenged</option>
                        <option value="PilgrimTravelers">Pilgrim Traveler</option>
                        <option value="SeniorCitizens">Senior Citizen</option>
                        <option value="Students">Student</option>
                        <option value="Tourist">Tourist</option>
                        <option value="CorporateTravelers">Corporate Traveler</option>
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
                        className={`absolute text-[1.2vw] text-[#1F487C] duration-300 transform -translate-y-[0.2vw] scale-75 top-[1vw] left-[0vw] origin-0 bg-white px-[0.2vw] peer-focus:left-[0.6vw] peer-focus:text-[#1F487C] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-[0.4vw] peer-placeholder-shown:text-[vw] peer-focus:text-[1vw] peer-focus:scale-75 peer-focus:-translate-y-[2vw] ${
                          values.occupation
                            ? "-translate-y-[2vw]"
                            : "-translate-y-[2vw]"
                        }`}
                      >
                        Occupation
                        <span className="text-red-500 ml-1">*</span>
                      </label>
                      <ErrorMessage
                        name="occupation"
                        component="div"
                        className="text-red-500 text-[0.8vw] absolute top-[2.8vw]"
                      />
                    </div>
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
};

export default HomeProfile;
