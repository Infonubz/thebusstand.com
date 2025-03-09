// import React, { useState } from 'react';
// import { Modal } from 'antd';
// import { Formik, Form, Field, ErrorMessage } from "formik";
// import * as Yup from "yup";

// export default function AddPassengers(){
//     const validationSchema = Yup.object().shape({
//         name: Yup.string()
//             .min(2, "Name must be at least 2 characters long")
//             .max(50, "Name can't be longer than 50 characters")
//             .required("Name is required"),
//         date_of_birth: Yup.date()
//             .max(new Date(), "Date of birth can't be in the future")
//             .required("Date of birth is required"),
//         email: Yup.string()
//             .email("Invalid email format")
//             .required("Email is required"),
//         phone: Yup.string()
//             .matches(/^\d{10}$/, "phone number must be exactly 10 digits")
//             .required("phone number is required"),
//     });

//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const showModal = () => {
//         setIsModalOpen(true);
//     };
//     return (
//         <>
//             <div className=' border-[0.1vw] border-black w-[75%] h-full px-[5vw] ml-[5vw] mt-[5vw] rounded-[1vw] bg-'>
//                 <Formik
//                     initialValues={{
//                         name: "",
//                         date_of_birth: "",
//                         state: "",
//                         email: "",
//                         phone: "",
//                     }}
//                     validationSchema={validationSchema}
//                     onSubmit={(values) => {
//                         localStorage.setItem("phone", values.phone);
//                     }}
//                     enableReinitialize
//                 >
//                     {({
//                         isSubmitting,
//                         isValid,
//                         handleSubmit,
//                         values,
//                         handleChange,
//                     }) => (
//                         <Form
//                             className="py-[1vw]"
//                             onSubmit={handleSubmit}
//                         >
//                             <div className='grid grid-rows-2 gap-[1vw]'>
//                                 <div>
//                                     <div className='text-[#1F487C] text-[1.5vw] font-semibold '>
//                                         Personal Details
//                                     </div>
//                                     <div className='grid grid-cols-2 py-[1vw] relative '>
//                                         <div className="">
//                                             <Field
//                                                 type="text"
//                                                 name="name"
//                                                 id="name"
//                                                 className="block py-[0.5vw] px-2 w-[27vw] h-[3vw] text-[1vw] text-[#1F487C] bg-transparent border border-gray-300 rounded-[0.5vw] focus:outline-none focus:ring-0 focus:border-[#1F487C] peer"
//                                                 placeholder=" "
//                                                 value={values.name}
//                                                 onChange={(e) => {
//                                                     handleChange(e); // Formik's handleChange
//                                                     // handleFormChange({
//                                                     //   ...values,
//                                                     //   phone: e.target.value,
//                                                     // });
//                                                     localStorage.setItem(
//                                                         "name",
//                                                         e.target.value
//                                                     );
//                                                 }}
//                                             // className="border-[0.1vw]  border-slate-500 text-[#1F487C] text-[1.2vw] h-[3vw] w-[27vw]  outline-none px-[1vw] rounded-[0.5vw]"
//                                             />
//                                             <label
//                                                 htmlFor="name"
//                                                 className="absolute text-[1.25vw] text-[#1F487C] duration-300 transform -translate-y-[0.2vw] scale-75 top-[1.3vw] left-[0.4vw] origin-0 bg-white px-[0.2vw] peer-focus:left-[0.6vw] peer-focus:text-[#1F487C] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-[0.4vw] peer-placeholder-shown:text-[1vw] peer-focus:text-[1vw] peer-focus:scale-75 peer-focus:-translate-y-[1vw]"
//                                             >
//                                                 Name<span className="text-red-500 ml-1">*</span>
//                                             </label>
//                                             <ErrorMessage
//                                                 name="name"
//                                                 component="div"
//                                                 className="text-red-500 text-[0.8vw] absolute top-[4vw]"
//                                             />
//                                         </div>
//                                         <div className="">
//                                             <Field
//                                                 type="date"
//                                                 name="date_of_birth"
//                                                 placeholder="Date of Birth*"
//                                                 value={values.date_of_birth}
//                                                 onChange={(e) => {
//                                                     handleChange(e); // Formik's handleChange
//                                                     // handleFormChange({
//                                                     //   ...values,
//                                                     //   phone: e.target.value,
//                                                     // });
//                                                     localStorage.setItem(
//                                                         "date_of_birth",
//                                                         e.target.value
//                                                     );
//                                                 }}
//                                                 className="border-[0.1vw] border-slate-500 text-[#1F487C] text-[1.2vw] h-[3vw] w-[27vw]  outline-none px-[1vw] rounded-[0.5vw]"
//                                             />
//                                             <ErrorMessage
//                                                 name="date_of_birth"
//                                                 component="div"
//                                                 className="text-red-500 text-[0.8vw] absolute top-[4vw]"
//                                             />
//                                         </div>
//                                     </div>

//                                     <div className='py-[1vw]'>
//                                         <span className='opacity-60 font-semibold '>Gender</span>
//                                         <div className='flex gap-x-[2vw]'>
//                                             <div className='border-[0.1vw] border-slate-500 text-[#1F487C] text-[1.2vw] h-[3vw] w-[12.5vw] outline-none px-[1vw] rounded-[0.5vw] flex items-center justify-between'>
//                                                 <div className='order-first'>Male</div>
//                                                 <div className='order-last flex items-center'>
//                                                     <Field type="radio" name="gender" value="male" />
//                                                 </div>
//                                             </div>
//                                             <div className='border-[0.1vw] border-slate-500 text-[#1F487C] text-[1.2vw] h-[3vw] w-[12.5vw] outline-none px-[1vw] rounded-[0.5vw] flex items-center justify-between'>
//                                                 <div className='order-first'>Female</div>
//                                                 <div className='order-last flex items-center'>
//                                                     <Field type="radio" name="gender" value="female" />
//                                                 </div>
//                                             </div>
//                                         </div>
//                                         <ErrorMessage name="gender" component="div" className="text-red-500" />
//                                     </div>
//                                 </div>
//                                 <div className='relative'>
//                                     <div className='text-[#1F487C] text-[1.5vw] font-semibold '>
//                                         Contact Details
//                                     </div>
//                                     <div className='grid grid-cols-2 py-[1vw] gap-y-[2.5vw]'>
//                                         <div className="relative z-0 w-full" >
//                                             <Field
//                                                 as="select"
//                                                 name="state"
//                                                 id="state"
//                                                 className="block py-[0.5vw] px-2 w-[27vw] h-[3vw] text-[1vw] text-[#1F487C] bg-transparent border border-gray-300 rounded-[0.5vw] focus:outline-none focus:ring-0 focus:border-[#1F487C] peer"
//                                                 value={values.state}
//                                                 onChange={(e) => {
//                                                     handleChange(e); // Formik's handleChange
//                                                     // handleFormChange({
//                                                     //   ...values,
//                                                     //   phone: e.target.value,
//                                                     // });
//                                                     localStorage.setItem(
//                                                         "name",
//                                                         e.target.value
//                                                     );
//                                                 }}
//                                             // className="border-[0.1vw] border-slate-500 text-[#1F487C] text-[1.2vw] h-[3vw] w-[27vw]  outline-none px-[1vw] rounded-[0.5vw]"
//                                             >
//                                                 {/* <option
//                                                     value=""
//                                                     label="State of state"
//                                                     className="text-gray-400 text-[1.1vw]"
//                                                 /> */}

//                                             </Field>
//                                             <label
//                                                 htmlFor="state"
//                                                 className="absolute text-[1.4vw] text-[#1F487C] duration-300 transform -translate-y-[0.2vw] scale-75 top-[0.7vw] left-[0.4vw] origin-0 bg-white px-[0.2vw] peer-focus:left-[0.6vw] peer-focus:text-[#1F487C] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-[0.4vw] peer-placeholder-shown:text-[1vw] peer-focus:text-[1vw] peer-focus:scale-75 peer-focus:-translate-y-[1.4vw]"
//                                             >
//                                                 State of state<span className="text-red-500 ml-1">*</span>
//                                             </label>
//                                             <div className='absolute top-[3vw] left-[1.5vw] text-[0.8vw] text-[#1F487C] opacity-50'>Required for GST Tax Invoicing </div>
//                                             {/* <ErrorMessage
//                                                 name="state"
//                                                 component="div"
//                                                 className="text-red-500 text-[0.8vw] absolute top-[4vw]"
//                                             /> */}
//                                         </div>
//                                         <div className="relative z-0 w-full">
//                                             <Field
//                                                 type="email"
//                                                 name="email"
//                                                 id="email"
//                                                 className="block py-[0.5vw] px-2 w-[27vw] h-[3vw] text-[1vw] text-[#1F487C] bg-transparent border border-gray-300 rounded-[0.5vw] focus:outline-none focus:ring-0 focus:border-[#1F487C] peer"

//                                                 value={values.email}
//                                                 onChange={(e) => {
//                                                     handleChange(e); // Formik's handleChange
//                                                     // handleFormChange({
//                                                     //   ...values,
//                                                     //   phone: e.target.value,
//                                                     // });
//                                                     localStorage.setItem(
//                                                         "email",
//                                                         e.target.value
//                                                     );
//                                                 }}
//                                             // className="border-[0.1vw] border-slate-500 text-[#1F487C] text-[1.2vw] h-[3vw] w-[27vw]  outline-none px-[1vw] rounded-[0.5vw]"
//                                             />
//                                             <label
//                                                 htmlFor="email"
//                                                 className="absolute text-[1.25vw] text-[#1F487C] duration-300 transform -translate-y-[0.2vw] scale-75 top-[0.7vw] left-[0.4vw] origin-0 bg-white px-[0.2vw] peer-focus:left-[0.6vw] peer-focus:text-[#1F487C] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-[0.4vw] peer-placeholder-shown:text-[1vw] peer-focus:text-[1vw] peer-focus:scale-75 peer-focus:-translate-y-[1.4vw]"
//                                             >
//                                                 Email<span className="text-red-500 ml-1">*</span>
//                                             </label>

//                                             <ErrorMessage
//                                                 name="email"
//                                                 component="div"
//                                                 className="text-red-500 text-[0.8vw] absolute top-[2.8vw] "
//                                             />
//                                         </div>
//                                         <div className="relative z-0 w-full">
//                                             <Field
//                                                 type="text"
//                                                 name="phone"
//                                                 id="phone"
//                                                 className="block py-[0.5vw] px-2 w-[27vw] h-[3vw] text-[1vw] text-[#1F487C] bg-transparent border border-gray-300 rounded-[0.5vw] focus:outline-none focus:ring-0 focus:border-[#1F487C] peer"
//                                                 placeholder=" "

//                                                 value={values.phone}
//                                                 onChange={(e) => {
//                                                     handleChange(e); // Formik's handleChange
//                                                     // handleFormChange({
//                                                     //   ...values,
//                                                     //   phone: e.target.value,
//                                                     // });
//                                                     localStorage.setItem(
//                                                         "email",
//                                                         e.target.value
//                                                     );
//                                                 }}
//                                             // className="border-[0.1vw] border-slate-500 text-[#1F487C] text-[1.2vw] h-[3vw] w-[27vw]  outline-none px-[1vw] rounded-[0.5vw]"
//                                             />
//                                             <label
//                                                 htmlFor="phone"
//                                                 className="absolute text-[1vw] text-[#1F487C]  duration-300 transform -translate-y-[0.2vw] scale-75 top-[0.3vw] left-[0.4vw] origin-0 bg-white px-[0.2vw] peer-focus:left-[0.6vw] peer-focus:text-[#1F487C] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-[0.4vw] peer-placeholder-shown:text-[1vw] peer-focus:text-[1vw] peer-focus:scale-75 peer-focus:-translate-y-[1.1vw]"
//                                             >
//                                                 phone Number<span className="text-red-500 ml-1">*</span>
//                                             </label>

//                                             <ErrorMessage
//                                                 name="phone"
//                                                 component="div"
//                                                 className="text-red-500 text-[0.8vw] absolute top-[2.9vw]"
//                                             />
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                             <div className=' flex flex-col items-center'>
//                                 <button type='submit' className='bg-[#1F487C] text-[white] w-[18vw] h-[3vw] rounded-full text-[1.25vw]'>Save Changes</button>
//                             </div>
//                         </Form>
//                     )}
//                 </Formik>
//             </div >
//         </>
//     )
// }

import React, { useEffect, useState } from "react";
import { ConfigProvider, Modal, Select } from "antd";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import {
  GetPassengById,
  GetPassengerData,
  SubmitPassengerData,
} from "../../../../Api-TBS/MyAccounts/Passenger";
import { PASSENGER_DATA } from "../../../../Store/Type";

const AddPassengers = ({
  prevStep,
  setPassData,
  passData,
  updateData,
  setUpdateData,
  isEdit,
  setSpinning,
}) => {
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, "Name must be at least 2 characters long")
      .max(40, "Name can't be longer than 50 characters")
      .required("Name is required"),
    date_of_birth: Yup.date()
      .max(new Date(), "Date of birth can't be in the future")
      .max(
        new Date(new Date()?.setFullYear(new Date()?.getFullYear() - 1)),
        "Date of birth must be at least 1 year "
      )
      .required("Date of birth is required"),
    email: Yup.string()
      .email("Invalid email format")
      .max(40, "Email can't be longer than 40 characters")
      .required("Email is required"),
    phone: Yup.string()
      .matches(/^\d{10}$/, "phone number must be exactly 10 digits")
      .required("Phone Number is Required"),
    gender: Yup.string().required("Gender is required"),
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [passengData, setPassengData] = useState();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const dispatch = useDispatch();

  const handleSubmit = async (values) => {
    setSpinning(true);
    try {
      const data = await SubmitPassengerData(values, updateData, dispatch);
      // toast.success(data?.message);
      GetPassengerData(dispatch, setSpinning);
      prevStep();
       // console.log(data);
    } catch (error) {
      console.error("Error uploading data", error);
    }
  };
  const fetchGetPassenger = async () => {
    try {
      const data = await GetPassengById(updateData);
      setPassengData(data);
       // console.log(data, "datadatanameeeeee");
    } catch (error) {
      console.error("Error fetching additional user data", error);
    }
  };
  const handleKeyDown = (event) => {
    // Allow control keys like Backspace, Delete, Tab, etc.
    const isControlKey = [
      "Backspace",
      "Tab",
      "ArrowLeft",
      "ArrowRight",
      "Delete",
    ].includes(event.key);
    if (isControlKey) {
      return;
    }

    // Allow numeric characters (0-9)
    if (!/^[0-9]$/.test(event.key)) {
      event.preventDefault(); // Prevent the key if it's not a number
    }
  };

  useEffect(() => {
    if (updateData) {
      fetchGetPassenger();
    }
  }, [updateData]);
  const indianStates = [
    { values: "Andhra Pradesh", label: "Andhra Pradesh" },
    { values: "Arunachal Pradesh", label: "Arunachal Pradesh" },
    { values: "Assam", label: "Assam" },
    { values: "Bihar", label: "Bihar" },
    { values: "Chhattisgarh", label: "Chhattisgarh" },
    { values: "Goa", label: "Goa" },
    { values: "Gujarat", label: "Gujarat" },
    { values: "Haryana", label: "Haryana" },
    { values: "Himachal Pradesh", label: "Himachal Pradesh" },
    { values: "Jharkhand", label: "Jharkhand" },
    { values: "Karnataka", label: "Karnataka" },
    { values: "Kerala", label: "Kerala" },
    { values: "Madhya Pradesh", label: "Madhya Pradesh" },
    { values: "Maharashtra", label: "Maharashtra" },
    { values: "Manipur", label: "Manipur" },
    { values: "Meghalaya", label: "Meghalaya" },
    { values: "Mizoram", label: "Mizoram" },
    { values: "Nagaland", label: "Nagaland" },
    { values: "Odisha", label: "Odisha" },
    { values: "Punjab", label: "Punjab" },
    { values: "Rajasthan", label: "Rajasthan" },
    { values: "Sikkim", label: "Sikkim" },
    { values: "Tamil Nadu", label: "Tamil Nadu" },
    { values: "Telangana", label: "Telangana" },
    { values: "Tripura", label: "Tripura" },
    { values: "Uttar Pradesh", label: "Uttar Pradesh" },
    { values: "Uttarakhand", label: "Uttarakhand" },
    { values: "West Bengal", label: "West Bengal" },
    {
      values: "Andaman and Nicobar Islands",
      label: "Andaman and Nicobar Islands",
    },
    { values: "Chandigarh", label: "Chandigarh" },
    {
      values: "Dadra and Nagar Haveli and Daman and Diu",
      label: "Dadra and Nagar Haveli and Daman and Diu",
    },
    { values: "Lakshadweep", label: "Lakshadweep" },
    { values: "Delhi", label: "Delhi" },
    { values: "Puducherry", label: "Puducherry" },
    { values: "Ladakh", label: "Ladakh" },
    { values: "Jammu and Kashmir", label: "Jammu and Kashmir" },
  ];

  const stateOptions = indianStates?.map((value, ind) => ({
    value: value.values,
    label: (
      <div
        className="text-[1vw] font-normal px-[0.2vw] pb-[0.1vw] text-[#1F487C]"
        title={value.label} // This will show full text on hover
        style={{
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
          maxWidth: "28ch", // Ensure truncation if text is too long
        }}
      >
        {value.label?.length > 28
          ? `${value.label.substring(0, 28)}...`
          : value.label}
      </div>
    ),
    id: ind,
  }));
  const defaultoption = {
    value: "",
    label: (
      <div className="text-[1vw] px-[0.2vw] pb-[0.1vw] text-gray-400">
        Select State
      </div>
    ),
    disabled: true,
  };

  const optionss = [defaultoption, ...stateOptions];

  return (
    <>
      <Formik
        initialValues={{
          name: passengData?.user_name || "",
          date_of_birth: passengData?.date_of_birth || "",
          age: passengData?.age || "",
          state: passengData?.state || "",
          email: passengData?.email_id || "",
          phone: passengData?.mobile_number || "",
          gender: passengData?.gender || "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          const birthYear = new Date(values.date_of_birth).getFullYear();
          const currentYear = new Date().getFullYear();
          const age = currentYear - birthYear;
           // console.log("Date of Birth:", values.date_of_birth);
           // console.log("Age:", age);
          values.age = age; // Set the calculated age in the form values
           // console.log("Date of Birth:", values.date_of_birth); // Log the date_of_birth here
          // localStorage.setItem("phone", values.phone);
          dispatch({
            type: PASSENGER_DATA,
            payload: values,
          });
          handleSubmit(values);
        }}
        enableReinitialize
      >
        {({ isSubmitting, isValid, handleSubmit, values, handleChange }) => (
          <Form className="" onSubmit={handleSubmit}>
            <div className="">
              <div className="pb-[1vw]">
                <span className="">
                  <div className="grid grid-cols-2 md:gap-0 gap-[2vw] ">
                    <div className="text-[#1F487C] text-[4vw] md:text-[1.5vw] font-semibold flex items-center">
                      {isEdit === true
                        ? "Edit Passenger Details"
                        : "Add Passenger Details"}
                    </div>
                    <div className="md:pl-[13vw] pl-[5vw] flex items-center md:h-[2.5vw] gap-[1vw] ">
                      <button
                        className="border border-[#1F487C] text-[#1F487C]  h-full md:rounded-[0.5vw] rounded-[1vw] md:text-[1.2vw] text-[3.5vw] px-[2vw]"
                        onClick={prevStep}
                      >
                        Back
                      </button>
                      <button
                        type="submit"
                        className="bg-[#1F487C]  w-full text-white md:rounded-[0.5vw] rounded-[1vw] h-full md:text-[1.2vw] text-[3.5vw] px-[1vw]"
                      >
                        <span className="md:block hidden">
                          {isEdit === true ? "Save Passenger" : "Add Passenger"}
                        </span>

                        <span className="md:hidden block ">
                          {isEdit === true ? "Save" : "Add"}
                        </span>
                      </button>
                    </div>
                  </div>
                </span>
              </div>
              <div className="grid md:grid-cols-2 my-[2vw] md:my-[0vw] py-[1vw] md:gap-y-[0vw] gap-y-[6vw] relative ">
                <div>
                  <Field
                    type="text"
                    name="name"
                    id="name"
                    className="block py-[0.5vw] px-2 w-full md:w-[27vw] h-[10vw] md:h-[3vw] text-[4vw] md:text-[1vw] text-[#1F487C] bg-transparent border-[0.1vw] border-slate-400 rounded-[1vw] md:rounded-[0.5vw] focus:outline-none focus:ring-0 focus:border-[#1F487C] peer"
                    placeholder=" "
                    value={values.name}
                    autoComplete="off"
                    onChange={(e) => {
                      handleChange(e); // Formik's handleChange
                      // handleFormChange({
                      //   ...values,
                      //   phone: e.target.value,
                      // });
                      localStorage.setItem("name", e.target.value);
                    }}
                    // className="border-[0.1vw]  border-slate-500 text-[#1F487C] text-[1.2vw] h-[3vw] w-[27vw]  outline-none px-[1vw] rounded-[0.5vw]"
                  />
                  <label
                    htmlFor="name"
                    className={`absolute text-[4vw] placeholder:font-medium md:text-[1vw] text-[#1F487C] duration-300 transform -translate-y-[0.2vw] scale-75 top-[3vw] md:top-[1.3vw] left-[2vw] md:left-[0.4vw] origin-0 bg-white px-[0.2vw] md:peer-focus:left-[0.6vw] peer-focus:left-[2vw] peer-focus:text-[#1F487C] peer-placeholder-shown:scale-100 md:peer-placeholder-shown:translate-y-[0.4vw] peer-placeholder-shown:text-[vw] md:peer-focus:text-[1vw] peer-focus:text-[3.7vw] peer-focus:scale-75 md:peer-focus:-translate-y-[1vw] peer-focus:-translate-y-[5vw] ${
                      values.name
                        ? "md:-translate-y-[1vw] -translate-y-[5vw] "
                        : ""
                    }`}
                  >
                    Name
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-red-500 md:text-[0.8vw] text-[2.1vw]  absolute top-[11vw] md:top-[4vw]"
                  />
                </div>

                <div className="relative">
                  <Field
                    type="date"
                    name="date_of_birth"
                    placeholder=" "
                    value={values.date_of_birth}
                    onChange={(e) => {
                      handleChange(e); // Formik's handleChange
                      // handleFormChange({
                      //   ...values,
                      //   phone: e.target.value,
                      // });
                      localStorage.setItem("date_of_birth", e.target.value);
                    }}
                    className="block py-[0.5vw] px-2 w-full md:w-[27vw] h-[10vw] md:h-[3vw] text-[4vw] md:text-[1vw] text-[#1F487C] bg-transparent border-[0.1vw] border-slate-400 rounded-[1vw] md:rounded-[0.5vw] focus:outline-none focus:ring-0 focus:border-[#1F487C] peer"
                  />
                  <label
                    htmlFor="date_of_birth"
                    className={`absolute text-[4vw] md:text-[1vw] text-[#1F487C] duration-300 transform  scale-75 top-[-2.5vw] md:top-[.3vw] left-[0.4vw] origin-0 bg-white px-[0.2vw] peer-focus:left-[0.6vw] peer-focus:text-[#1F487C] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-[0.4vw] peer-placeholder-shown:text-[vw] md:peer-focus:text-[1vw] peer-focus:text-[3.7vw] peer-focus:scale-75 md:peer-focus:-translate-y-[1vw] peer-focus:-translate-y-[1vw]  -translate-y-[1vw]`}
                  >
                    Date Of Birth
                    <span className="text-red-500 ml-1">*</span>
                  </label>

                  <ErrorMessage
                    name="date_of_birth"
                    component="div"
                    className="text-red-500 md:text-[0.8vw] text-[2.1vw] absolute top-[10vw] md:top-[3.1vw]"
                  />
                </div>
              </div>

              <div className="mt-[0vw] md:mt-[2vw] md:mb-[0vw] grid md:grid-rows-2 relative gap-y-[2vw] md:gap-y-[0vw]">
                <span className="font-bold text-[4vw] md:text-[1.5vw] text-[#1F487C]">
                  Gender
                </span>
                <div className="flex gap-x-[2vw]">
                  <div className=" border-[0.1vw] border-slate-400 text-[#1F487C] text-[4vw] md:text-[1.2vw] h-[10vw] w-full md:h-[3vw] md:w-[12.5vw] outline-none px-[4vw] md:px-[1vw] font-semibold rounded-[1vw] md:rounded-[0.5vw] flex items-center justify-between">
                    <label
                      htmlFor="male"
                      className="flex h-full cursor-pointer w-full justify-between items-center"
                    >
                      <div className="order-first">Male</div>
                      <div className="order-last flex items-center">
                        <Field
                          id="male"
                          type="radio"
                          name="gender"
                          value="male"
                        />
                      </div>
                    </label>
                  </div>
                  <div className="border-[0.1vw] border-slate-400 text-[#1F487C] font-semibold text-[4vw] md:text-[1.2vw] h-[10vw] w-full md:h-[3vw] md:w-[12.5vw] outline-none px-[4vw] md:px-[1vw] rounded-[1vw] md:rounded-[0.5vw] flex items-center justify-between cursor-pointer">
                    <label
                      className="flex w-full h-full items-center cursor-pointer justify-between"
                      htmlFor="female"
                    >
                      <div className="order-first">Female</div>
                      <div className="order-last flex items-center">
                        <Field
                          id="female" // Assigning an id to the radio button
                          type="radio"
                          name="gender"
                          value="female"
                        />
                      </div>
                    </label>
                  </div>
                </div>
                <ErrorMessage
                  name="gender"
                  component="div"
                  className="text-red-500 bottom-[-2.5vw] md:bottom-[-1.2vw] md:text-[0.8vw] text-[2.1vw]  absolute"
                />
              </div>
            </div>
            <div className="relative md:pb-[0.5vw]">
              <div className="text-[#1F487C] md:pt-[1.5vw] md:pb-[1vw] text-[4vw] md:text-[1.5vw] font-semibold ">
                Contact Details
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 py-[1vw] my-[3vw] md:my-[0vw] gap-y-[6vw] md:gap-y-[2.5vw]">
                <div className="relative z-0 w-full">
                  {/* <Field
                      as="select"
                      name="state"
                      id="state"
                      className={`block py-[0.5vw] px-2 w-full md:w-[27vw] h-[10vw] md:h-[3vw] text-[4vw] md:text-[1vw] text-[#1F487C] bg-transparent border-[0.1vw] border-slate-400 rounded-[1vw] md:rounded-[0.5vw] focus:outline-none focus:ring-0 focus:border-[#1F487C] peer`}
                      value={values.state}
                      onChange={(e) => {
                        handleChange(e); // Formik's handleChange
                      }}
                    // className="border-[0.1vw] border-slate-500 text-[#1F487C] text-[1.2vw] h-[3vw] w-[27vw]  outline-none px-[1vw] rounded-[0.5vw]"
                    >
                      <option
                        value=""
                        label="State of state"
                        className="text-gray-400 text-[3vw] md:text-[1.1vw]"
                      />
                      <option
                        value="Tamilnadu"
                        label="Tamilnadu"
                        className="text-gray-400 text-[3vw] md:text-[1.1vw]"
                      />
                    </Field> */}
                  <ConfigProvider
                    theme={{
                      components: {
                        Select: {
                          // optionActiveBg: 'none',
                          // optionSelectedColor: 'none',
                          // optionSelectedBg: 'none',
                          optionHeight: "2",
                          activeBorderColor: "none",
                          activeOutlineColor: "none",
                          hoverBorderColor: "none",
                        },
                      },
                    }}
                  >
                    <Select
                      showSearch
                      value={values.state || ""}
                      // placement="topRight"
                      listHeight={150}
                      onChange={(value, id) => {
                        handleChange({ target: { name: "state", value } });
                        //    // console.log(id.id,"idididisdfsdf");
                        //   setCurrentRoleId(id.id)
                      }}
                      // onChange={(e) => {
                      //   handleChange(e); // Formik's handleChange
                      // }}
                      name="state"
                      id="state"
                      className={`block py-[0.5vw]  w-full md:w-[27vw] h-[10vw] md:h-[3vw] text-[4vw] md:text-[1vw] text-[#1F487C] bg-transparent rounded-[1vw] md:rounded-[0.5vw] focus:outline-none focus:ring-0 focus:border-[#1F487C] peer`}
                      placeholder="Select role"
                      filterOption={
                        (input, option) =>
                          option?.value
                            ?.toLowerCase()
                            ?.includes(input.toLowerCase()) // Make it case-insensitive
                      }
                      optionFilterProp="value"
                      // suffixIcon={<span style={{ fontSize: '1vw', color: '#1f487c' }}>
                      //   <IoMdArrowDropup size="2vw" />
                      // </span>}
                      style={{ padding: 4 }}
                      options={optionss}
                    />
                  </ConfigProvider>
                  <label
                    htmlFor="state"
                    className={`absolute text-[4vw] md:text-[1vw] text-[#1F487C] duration-300 transform -translate-y-[0.2vw] scale-75 top-[-1vw] md:top-[1.3vw] left-[0vw] md:left-[0.4vw] origin-0 bg-white px-[0.2vw] peer-focus:left-[0.6vw] peer-focus:text-[#1F487C] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-[0.4vw] peer-placeholder-shown:text-[vw] peer-focus:text-[3.7vw] md:peer-focus:text-[1vw] peer-focus:scale-75 peer-focus:-translate-y-[2vw] ${
                      values.state ? "-translate-y-[2vw]" : "-translate-y-[2vw]"
                    }`}
                  >
                    State of Residence
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <div className="absolute top-[10vw] md:top-[3vw] left-[0vw] md:left-[1.5vw] md:text-[0.8vw] text-[2.5vw] text-[#1F487C] opacity-50">
                    Required for GST Tax Invoicing{" "}
                  </div>
                  {/* <ErrorMessage
                                                name="state"
                                                component="div"
                                                className="text-red-500 text-[0.8vw] absolute top-[4vw]"
                                            /> */}
                </div>
                <div className="relative z-0 w-full">
                  <Field
                    type="email"
                    name="email"
                    id="email"
                    autoComplete="off"
                    className="block py-[0.5vw] px-2 w-full md:w-[27vw] h-[10vw] md:h-[3vw] text-[4vw] md:text-[1vw] text-[#1F487C] bg-transparent border-[0.1vw] border-slate-400 rounded-[1vw] md:rounded-[0.5vw] focus:outline-none focus:ring-0 focus:border-[#1F487C] peer"
                    value={values.email}
                    onChange={(e) => {
                      handleChange(e); // Formik's handleChange
                      // handleFormChange({
                      //   ...values,
                      //   phone: e.target.value,
                      // });
                      localStorage.setItem("email", e.target.value);
                    }}
                    // className="border-[0.1vw] border-slate-500 text-[#1F487C] text-[1.2vw] h-[3vw] w-[27vw]  outline-none px-[1vw] rounded-[0.5vw]"
                  />
                  <label
                    htmlFor="email"
                    className={`absolute text-[5.5vw] md:text-[1.2vw] text-[#1F487C] duration-300 transform -translate-y-[0.2vw] scale-75 top-[1vw] md:top-[0.8vw] md:left-[0.4vw] left-[1.5vw] origin-0 bg-white px-[0.2vw] peer-focus:left-[2vw] md:peer-focus:left-[0.6vw] peer-focus:text-[#1F487C] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-[0.4vw] peer-placeholder-shown:text-[vw] peer-focus:text-[3.2vw] md:peer-focus:text-[1vw] peer-focus:scale-75 peer-focus:-translate-y-[5vw] md:peer-focus:-translate-y-[1.5vw] ${
                      values.email
                        ? "md:-translate-y-[1.5vw] -translate-y-[5.5vw]"
                        : ""
                    }`}
                  >
                    Email<span className="text-red-500 ml-1">*</span>
                  </label>

                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500 md:text-[0.8vw] text-[2.1vw] absolute md:top-[3vw] top-[10vw]"
                  />
                </div>
                <div className="relative z-0 w-full">
                  <Field
                    type="text"
                    name="phone"
                    id="phone"
                    onKeyDown={handleKeyDown}
                    maxLength={10}
                    className="block py-[0.5vw] px-2 w-full md:w-[27vw] h-[10vw] md:h-[3vw] text-[4vw] md:text-[1vw] text-[#1F487C] bg-transparent border-[0.1vw] border-slate-400 rounded-[1vw] md:rounded-[0.5vw] focus:outline-none focus:ring-0 focus:border-[#1F487C] peer"
                    placeholder=" "
                    autoComplete="off"
                    value={values.phone}
                    onChange={(e) => {
                      handleChange(e); // Formik's handleChange
                      // handleFormChange({
                      //   ...values,
                      //   phone: e.target.value,
                      // });
                      localStorage.setItem("email", e.target.value);
                    }}
                    // className="border-[0.1vw] border-slate-500 text-[#1F487C] text-[1.2vw] h-[3vw] w-[27vw]  outline-none px-[1vw] rounded-[0.5vw]"
                  />
                  <label
                    htmlFor="phone"
                    className={`absolute text-[4vw] md:text-[1vw] text-[#1F487C] duration-300 transform -translate-y-[0.2vw] scale-75 top-[1vw] md:top-[0.5vw] md:left-[0.4vw] left-[2.3vw] origin-0 bg-white px-[0.2vw] peer-focus:left-[1.5vw] md:peer-focus:left-[0.6vw] peer-focus:text-[#1F487C] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-[0.4vw] peer-placeholder-shown:text-[vw] peer-focus:text-[3.7vw] md:peer-focus:text-[1vw] peer-focus:scale-75 md:peer-focus:-translate-y-[1.2vw] peer-focus:-translate-y-[4vw] ${
                      values.phone
                        ? "md:-translate-y-[1.2vw] -translate-y-[4vw] "
                        : ""
                    }`}
                  >
                    Phone Number<span className="text-red-500 ml-1">*</span>
                  </label>

                  <ErrorMessage
                    name="phone"
                    component="div"
                    className="text-red-500 md:text-[0.8vw] text-[2.1vw] absolute md:top-[3vw] top-[10vw]"
                  />
                </div>
              </div>
            </div>

            {/* <div className=" flex justify-center gap-x-[2vw] md:my-[0vw] my-[2vw]">
                <button
                  className="bg-[#1F487C] text-[white] md:w-[18vw] w-full h-[9vw] md:h-[3vw] rounded-full text-[4vw] md:text-[1.25vw]"
                  onClick={prevStep}
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="bg-[#1F487C] text-[white] md:w-[18vw] w-full h-[9vw] md:h-[3vw] rounded-full text-[4vw]  md:text-[1.25vw]"
                >
                  {isEdit === true ? "Save Passenger" : "Add Passenger"}
                </button>
              </div> */}
          </Form>
        )}
      </Formik>
    </>
  );
};

export default AddPassengers;
