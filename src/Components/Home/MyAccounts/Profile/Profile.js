import React, { useEffect, useRef, useState } from "react";
import { Modal } from "antd";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  GetProfileById,
  UpdateProfile,
} from "../../../../Api/MyAccounts/Profile";
import { useDispatch, useSelector } from "react-redux";

const HomeProfile = () => {
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, "Name must be at least 2 characters long")
      .max(50, "Name can't be longer than 50 characters")
      .required("Name is required"),
    date_of_birth: Yup.date()
      .max(new Date(), "Date of birth can't be in the future")
      .required("Date of birth is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    mobile: Yup.string()
      .matches(/^\d{10}$/, "Mobile number must be exactly 10 digits")
      .required("Mobile number is required"),
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleSubmit = async (values) => {
    try {
      const data = await UpdateProfile(values);
      console.log(data, "datadatadata");
      // console.log(data.offer_name, "datadata");
      // setOfferData(data);
    } catch (error) {
      console.error("Error fetching additional user data", error);
    }
  };
  const dispatch = useDispatch();
  const hasFetched = useRef(false);

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
      <div className="bg-white rounded-[1vw] px-[2vw]">
        <Formik
          initialValues={{
            name: profiledata.name || "",
            date_of_birth: profiledata.date_of_birth || "",
            residence: profiledata.state || "",
            email: profiledata.email || "",
            mobile: profiledata.phone || "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            handleSubmit(values);
          }}
          enableReinitialize
        >
          {({ isSubmitting, isValid, handleSubmit, values, handleChange }) => (
            <Form className="py-[1vw]" onSubmit={handleSubmit}>
              <div className="grid grid-rows-2 gap-[1vw]">
                <div>
                  <div className="text-[#1F487C] text-[1.5vw] font-semibold ">
                    Personal Details
                  </div>
                  <div className="grid grid-cols-2 py-[1vw] relative ">
                    <div className="">
                      <Field
                        type="text"
                        name="name"
                        id="name"
                        className="block py-[0.5vw] px-2 w-[27vw] h-[3vw] text-[1vw] text-[#1F487C] bg-transparent border border-gray-300 rounded-[0.5vw] focus:outline-none focus:ring-0 focus:border-[#1F487C] peer"
                        placeholder=" "
                        value={values.name}
                        onChange={(e) => {
                          handleChange(e); // Formik's handleChange
                        }}
                        // className="border-[0.1vw]  border-slate-500 text-[#1F487C] text-[1.2vw] h-[3vw] w-[27vw]  outline-none px-[1vw] rounded-[0.5vw]"
                      />
                      <label
                        htmlFor="name"
                        className={`absolute text-[1vw] text-[#1F487C] duration-300 transform -translate-y-[0.2vw] scale-75 top-[1.3vw] left-[0.4vw] origin-0 bg-white px-[0.2vw] peer-focus:left-[0.6vw] peer-focus:text-[#1F487C] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-[0.4vw] peer-placeholder-shown:text-[vw] peer-focus:text-[1vw] peer-focus:scale-75 peer-focus:-translate-y-[1vw] ${
                          values.name ? "-translate-y-[1vw]" : ""
                        }`}
                      >
                        Name<span className="text-red-500 ml-1">*</span>
                      </label>
                      <ErrorMessage
                        name="name"
                        component="div"
                        className="text-red-500 text-[0.8vw] absolute top-[4vw]"
                      />
                    </div>
                    <div className="">
                      <Field
                        type="date"
                        name="date_of_birth"
                        placeholder="Date of Birth*"
                        value={values.date_of_birth}
                        onChange={(e) => {
                          handleChange(e); // Formik's handleChange
                        }}
                        className="border-[0.1vw] border-slate-500 text-[#1F487C] text-[1.2vw] h-[3vw] w-[27vw]  outline-none px-[1vw] rounded-[0.5vw]"
                      />
                      <ErrorMessage
                        name="date_of_birth"
                        component="div"
                        className="text-red-500 text-[0.8vw] absolute top-[4vw]"
                      />
                    </div>
                  </div>

                  <div className="py-[1vw]">
                    <span className="opacity-60 font-semibold ">Gender</span>
                    <div className="flex gap-x-[2vw]">
                      <div className="border-[0.1vw] border-slate-500 text-[#1F487C] text-[1.2vw] h-[3vw] w-[12.5vw] outline-none px-[1vw] rounded-[0.5vw] flex items-center justify-between">
                        <div className="order-first">Male</div>
                        <div className="order-last flex items-center">
                          <Field type="radio" name="gender" value="male" />
                        </div>
                      </div>
                      <div className="border-[0.1vw] border-slate-500 text-[#1F487C] text-[1.2vw] h-[3vw] w-[12.5vw] outline-none px-[1vw] rounded-[0.5vw] flex items-center justify-between">
                        <div className="order-first">Female</div>
                        <div className="order-last flex items-center">
                          <Field type="radio" name="gender" value="female" />
                        </div>
                      </div>
                    </div>
                    <ErrorMessage
                      name="gender"
                      component="div"
                      className="text-red-500"
                    />
                  </div>
                </div>
                <div className="relative">
                  <div className="text-[#1F487C] text-[1.5vw] font-semibold ">
                    Contact Details
                  </div>
                  <div className="grid grid-cols-2 py-[1vw] gap-y-[2.5vw]">
                    <div className="relative z-0 w-full">
                      <Field
                        as="select"
                        name="residence"
                        id="residence"
                        className={`block py-[0.5vw] px-2 w-[27vw] h-[3vw] text-[1vw] text-[#1F487C] bg-transparent border border-gray-300 rounded-[0.5vw] focus:outline-none focus:ring-0 focus:border-[#1F487C] peer`}
                        value={values.residence}
                        onChange={(e) => {
                          handleChange(e); // Formik's handleChange
                        }}
                        // className="border-[0.1vw] border-slate-500 text-[#1F487C] text-[1.2vw] h-[3vw] w-[27vw]  outline-none px-[1vw] rounded-[0.5vw]"
                      >
                        <option
                          value=""
                          label="State of Residence"
                          className="text-gray-400 text-[1.1vw]"
                        />
                        <option
                          value="Tamilnadu"
                          label="Tamilnadu"
                          className="text-gray-400 text-[1.1vw]"
                        />
                      </Field>
                      <label
                        htmlFor="residence"
                        className={`absolute text-[1vw] text-[#1F487C] duration-300 transform -translate-y-[0.2vw] scale-75 top-[1.3vw] left-[0.4vw] origin-0 bg-white px-[0.2vw] peer-focus:left-[0.6vw] peer-focus:text-[#1F487C] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-[0.4vw] peer-placeholder-shown:text-[vw] peer-focus:text-[1vw] peer-focus:scale-75 peer-focus:-translate-y-[2vw] ${
                          values.residence
                            ? "-translate-y-[2vw]"
                            : "-translate-y-[2vw]"
                        }`}
                      >
                        State of Residence
                        <span className="text-red-500 ml-1">*</span>
                      </label>
                      <div className="absolute top-[3vw] left-[1.5vw] text-[0.8vw] text-[#1F487C] opacity-50">
                        Required for GST Tax Invoicing{" "}
                      </div>
                      {/* <ErrorMessage
                                                name="residence"
                                                component="div"
                                                className="text-red-500 text-[0.8vw] absolute top-[4vw]"
                                            /> */}
                    </div>
                    <div className="relative z-0 w-full">
                      <Field
                        type="email"
                        name="email"
                        id="email"
                        className="block py-[0.5vw] px-2 w-[27vw] h-[3vw] text-[1vw] text-[#1F487C] bg-transparent border border-gray-300 rounded-[0.5vw] focus:outline-none focus:ring-0 focus:border-[#1F487C] peer"
                        value={values.email}
                        autocomplete="off"
                        onChange={(e) => {
                          handleChange(e); // Formik's handleChange
                        }}
                      />

                      <label
                        htmlFor="email"
                        className={`absolute text-[1.2vw] text-[#1F487C] duration-300 transform -translate-y-[0.2vw] scale-75 top-[1vw] left-[0.4vw] origin-0 bg-white px-[0.2vw] peer-focus:left-[0.6vw] peer-focus:text-[#1F487C] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-[0.4vw] peer-placeholder-shown:text-[1vw] peer-focus:text-[1vw] peer-focus:scale-75 peer-focus:-translate-y-[2vw] ${
                          values.email ? "-translate-y-[2vw]" : ""
                        }`}
                      >
                        Email<span className="text-red-500 ml-1">*</span>
                      </label>

                      <ErrorMessage
                        name="email"
                        component="div"
                        className="text-red-500 text-[0.8vw] absolute top-[2.8vw] "
                      />
                    </div>
                    <div className="relative z-0 w-full">
                      <Field
                        type="mobile"
                        name="mobile"
                        id="mobile"
                        className="block py-[0.5vw] px-2 w-[27vw] h-[3vw] text-[1vw] text-[#1F487C] bg-transparent border border-gray-300 rounded-[0.5vw] focus:outline-none focus:ring-0 focus:border-[#1F487C] peer"
                        value={values.mobile}
                        autocomplete="off"
                        onChange={(e) => {
                          handleChange(e); // Formik's handleChange
                        }}
                      />

                      <label
                        htmlFor="mobile"
                        className={`absolute text-[1.2vw] text-[#1F487C] duration-300 transform -translate-y-[0.2vw] scale-75 top-[1vw] left-[0.4vw] origin-0 bg-white px-[0.2vw] peer-focus:left-[0.6vw] peer-focus:text-[#1F487C] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-[0.4vw] peer-placeholder-shown:text-[1vw] peer-focus:text-[1vw] peer-focus:scale-75 peer-focus:-translate-y-[2vw] ${
                          values.mobile ? "-translate-y-[2vw]" : ""
                        }`}
                      >
                        Mobile Number
                        <span className="text-red-500 ml-1">*</span>
                      </label>

                      <ErrorMessage
                        name="email"
                        component="div"
                        className="text-red-500 text-[0.8vw] absolute top-[2.8vw] "
                      />
                    </div>
                    {/* <div className="relative z-0 w-full flex float-right">
                      <button
                        type="submit"
                        className="bg-[#1F487C] text-[white] w-[18vw] h-[3vw] rounded-full text-[1.25vw]"
                      >
                        Save Changes
                      </button>
                    </div> */}
                  </div>
                </div>
              </div>
              <div className=" flex flex-col items-center mb-[1vw]">
                <button
                  type="submit"
                  className="bg-[#1F487C] text-[white] w-[12vw] h-[3vw] rounded-full text-[1.25vw]"
                >
                  Update
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default HomeProfile;
