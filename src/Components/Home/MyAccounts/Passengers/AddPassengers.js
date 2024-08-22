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
import { Modal } from "antd";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { GetPassengById, GetPassengerData, SubmitPassengerData } from "../../../../Api/MyAccounts/Passenger";
import { PASSENGER_DATA } from "../../../../Store/type";

const AddPassengers = ({ prevStep, setPassData, passData, updateData, setUpdateData }) => {
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
        phone: Yup.string()
            .matches(/^\d{10}$/, "phone number must be exactly 10 digits")
            .required("phone number is required"),
    });

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [passengData, setPassengData] = useState()

    const showModal = () => {
        setIsModalOpen(true);
    };

    const dispatch = useDispatch();

    const handleSubmit = async (values) => {
        try {
            const data = await SubmitPassengerData(values, updateData, dispatch,);
            // toast.success(data?.message);
            GetPassengerData(dispatch);
            prevStep();
            console.log(data);
        } catch (error) {
            console.error("Error uploading data", error);
        }
    };
    const fetchGetPassenger = async () => {
        try {
            const data = await GetPassengById(
                updateData,
            );
            setPassengData(data)
            console.log(data, "datadatanameeeeee");
        } catch (error) {
            console.error("Error fetching additional user data", error);
        }
    };

    useEffect(() => {
        if (updateData) {
            fetchGetPassenger();
        }
    }, [updateData]);


    return (
        <>

            <Formik
                initialValues={{
                    name: passengData?.name || "",
                    date_of_birth: passengData?.date_of_birth || "",
                    age: passengData?.age || "",
                    state: passengData?.state || "",
                    email: passengData?.email || "",
                    phone: passengData?.phone || "",
                    gender: passengData?.gender || "",
                }}
                validationSchema={validationSchema}
                onSubmit={(values) => {

                    const birthYear = new Date(values.date_of_birth).getFullYear();
                    const currentYear = new Date().getFullYear();
                    const age = currentYear - birthYear;
                    console.log("Date of Birth:", values.date_of_birth);
                    console.log("Age:", age);
                    values.age = age; // Set the calculated age in the form values
                    console.log("Date of Birth:", values.date_of_birth); // Log the date_of_birth here
                    // localStorage.setItem("phone", values.phone);
                    dispatch({
                        type: PASSENGER_DATA,
                        payload: values,
                    });
                    handleSubmit(values);
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
                    <Form
                        className="py-[1vw]"
                        onSubmit={handleSubmit}
                    >
                        <div className='grid grid-rows-2 gap-[1vw]'>
                            <div>
                                <div className='text-[#1F487C] text-[1.5vw] font-semibold '>
                                    Add Passengers Details
                                </div>
                                <div className='grid grid-cols-2 py-[1vw] relative '>
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
                                                // handleFormChange({
                                                //   ...values,
                                                //   phone: e.target.value,
                                                // });
                                                localStorage.setItem(
                                                    "name",
                                                    e.target.value
                                                );
                                            }}
                                        // className="border-[0.1vw]  border-slate-500 text-[#1F487C] text-[1.2vw] h-[3vw] w-[27vw]  outline-none px-[1vw] rounded-[0.5vw]"
                                        />
                                        <label
                                            htmlFor="name"
                                            className={`absolute text-[1vw] text-[#1F487C] duration-300 transform -translate-y-[0.2vw] scale-75 top-[1.3vw] left-[0.4vw] origin-0 bg-white px-[0.2vw] peer-focus:left-[0.6vw] peer-focus:text-[#1F487C] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-[0.4vw] peer-placeholder-shown:text-[vw] peer-focus:text-[1vw] peer-focus:scale-75 peer-focus:-translate-y-[1vw] ${values.name ? "-translate-y-[1vw]" : ""
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
                                                // handleFormChange({
                                                //   ...values,
                                                //   phone: e.target.value,
                                                // });
                                                localStorage.setItem(
                                                    "date_of_birth",
                                                    e.target.value
                                                );
                                            }}

                                            className="block py-[0.5vw] px-2 w-[27vw] h-[3vw] text-[1vw] text-[#1F487C] bg-transparent border border-gray-300 rounded-[0.5vw] focus:outline-none focus:ring-0 focus:border-[#1F487C] peer"
                                        />
                                        <ErrorMessage
                                            name="date_of_birth"
                                            component="div"
                                            className="text-red-500 text-[0.8vw] absolute top-[4vw]"
                                        />
                                    </div>
                                </div>

                                <div className='py-[0.5vw] grid grid-rows-2'>
                                    <div className='opacity-60 font-semibold text-[1.5vw] '>Gender</div>
                                    <div className='flex gap-x-[2vw]'>
                                        <div className='border-[0.1vw] border-slate-500 text-[#1F487C] text-[1.2vw] h-[3vw] w-[12.5vw] outline-none px-[1vw] rounded-[0.5vw] flex items-center justify-between'>
                                            <div className='order-first'>Male</div>
                                            <div className='order-last flex items-center'>
                                                <Field
                                                    type="radio"
                                                    name="gender"
                                                    value="male" />
                                            </div>
                                        </div>
                                        <div className='border-[0.1vw] border-slate-500 text-[#1F487C] text-[1.2vw] h-[3vw] w-[12.5vw] outline-none px-[1vw] rounded-[0.5vw] flex items-center justify-between'>
                                            <div className='order-first'>Female</div>
                                            <div className='order-last flex items-center'>
                                                <Field
                                                    type="radio"
                                                    name="gender"
                                                    value="female" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='relative'>
                                <div className='text-[#1F487C] text-[1.5vw] font-semibold '>
                                    Contact Details
                                </div>
                                <div className='grid grid-cols-2 py-[1vw] gap-y-[2.5vw]'>
                                    <div className="relative z-0 w-full">
                                        <Field
                                            as="select"
                                            name="state"
                                            id="state"
                                            className={`block py-[0.5vw] px-2 w-[27vw] h-[3vw] text-[1vw] text-[#1F487C] bg-transparent border border-gray-300 rounded-[0.5vw] focus:outline-none focus:ring-0 focus:border-[#1F487C] peer`}
                                            value={values.state}
                                            onChange={(e) => {
                                                handleChange(e); // Formik's handleChange
                                            }}
                                        // className="border-[0.1vw] border-slate-500 text-[#1F487C] text-[1.2vw] h-[3vw] w-[27vw]  outline-none px-[1vw] rounded-[0.5vw]"
                                        >
                                            <option
                                                value=""
                                                label="State of state"
                                                className="text-gray-400 text-[1.1vw]"
                                            />
                                            <option
                                                value="Tamilnadu"
                                                label="Tamilnadu"
                                                className="text-gray-400 text-[1.1vw]"
                                            />
                                        </Field>
                                        <label
                                            htmlFor="state"
                                            className={`absolute text-[1vw] text-[#1F487C] duration-300 transform -translate-y-[0.2vw] scale-75 top-[1.3vw] left-[0.4vw] origin-0 bg-white px-[0.2vw] peer-focus:left-[0.6vw] peer-focus:text-[#1F487C] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-[0.4vw] peer-placeholder-shown:text-[vw] peer-focus:text-[1vw] peer-focus:scale-75 peer-focus:-translate-y-[2vw] ${values.state
                                                ? "-translate-y-[2vw]"
                                                : "-translate-y-[2vw]"
                                                }`}
                                        >
                                            State of state
                                            <span className="text-red-500 ml-1">*</span>
                                        </label>
                                        <div className="absolute top-[3vw] left-[1.5vw] text-[0.8vw] text-[#1F487C] opacity-50">
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
                                            className="block py-[0.5vw] px-2 w-[27vw] h-[3vw] text-[1vw] text-[#1F487C] bg-transparent border border-gray-300 rounded-[0.5vw] focus:outline-none focus:ring-0 focus:border-[#1F487C] peer"

                                            value={values.email}
                                            onChange={(e) => {
                                                handleChange(e); // Formik's handleChange
                                                // handleFormChange({
                                                //   ...values,
                                                //   phone: e.target.value,
                                                // });
                                                localStorage.setItem(
                                                    "email",
                                                    e.target.value
                                                );
                                            }}
                                        // className="border-[0.1vw] border-slate-500 text-[#1F487C] text-[1.2vw] h-[3vw] w-[27vw]  outline-none px-[1vw] rounded-[0.5vw]"
                                        />
                                        <label
                                            htmlFor="email"
                                            className={`absolute text-[1.2vw] text-[#1F487C] duration-300 transform -translate-y-[0.2vw] scale-75 top-[0.8vw] left-[0.4vw] origin-0 bg-white px-[0.2vw] peer-focus:left-[0.6vw] peer-focus:text-[#1F487C] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-[0.4vw] peer-placeholder-shown:text-[1vw] peer-focus:text-[1vw] peer-focus:scale-75 peer-focus:-translate-y-[1.5vw] ${values.email ? "-translate-y-[1.5vw]" : ""
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
                                            type="text"
                                            name="phone"
                                            id="phone"
                                            className="block py-[0.5vw] px-2 w-[27vw] h-[3vw] text-[1vw] text-[#1F487C] bg-transparent border border-gray-300 rounded-[0.5vw] focus:outline-none focus:ring-0 focus:border-[#1F487C] peer"
                                            placeholder=" "

                                            value={values.phone}
                                            onChange={(e) => {
                                                handleChange(e); // Formik's handleChange
                                                // handleFormChange({
                                                //   ...values,
                                                //   phone: e.target.value,
                                                // });
                                                localStorage.setItem(
                                                    "email",
                                                    e.target.value
                                                );
                                            }}
                                        // className="border-[0.1vw] border-slate-500 text-[#1F487C] text-[1.2vw] h-[3vw] w-[27vw]  outline-none px-[1vw] rounded-[0.5vw]"
                                        />
                                        <label
                                            htmlFor="phone"
                                            className={`absolute text-[1.2vw] text-[#1F487C] duration-300 transform -translate-y-[0.2vw] scale-75 top-[0.5vw] left-[0.4vw] origin-0 bg-white px-[0.2vw] peer-focus:left-[0.6vw] peer-focus:text-[#1F487C] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-[0.4vw] peer-placeholder-shown:text-[1vw] peer-focus:text-[1vw] peer-focus:scale-75 peer-focus:-translate-y-[1.2vw] ${values.phone ? "-translate-y-[1.2vw]" : ""
                                                }`}
                                        >
                                            phone Number<span className="text-red-500 ml-1">*</span>
                                        </label>

                                        <ErrorMessage
                                            name="phone"
                                            component="div"
                                            className="text-red-500 text-[0.8vw] absolute top-[2.9vw]"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className=' flex justify-center gap-[2vw]'>
                            <button className='bg-[#1F487C] text-[white] w-[18vw] h-[3vw] rounded-full text-[1.25vw]' onClick={prevStep}>Back</button>
                            <button type='submit' className='bg-[#1F487C] text-[white] w-[18vw] h-[3vw] rounded-full text-[1.25vw]'>Add Passengers</button>

                        </div>
                    </Form>
                )}
            </Formik>
        </>
    );
};

export default AddPassengers;