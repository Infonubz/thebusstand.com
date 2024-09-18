
import React, { useEffect, useState } from "react";
import { Modal } from "antd";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { GetPassengById, GetPassengerData, SubmitPassengerData } from "../../../../Api/MyAccounts/Passenger";
import { PASSENGER_DATA } from "../../../../Store/type";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router";

const MobileAddPassenger = ({ prevStep, setPassData, passData, updateData, setUpdateData }) => {
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
        countryCode: Yup.string()
            .required('Country code is required')
    });

    const countryCodes = [
        { code: '+1', name: 'United States' },
        { code: '+44', name: 'United Kingdom' },
        { code: '+91', name: 'India' },
        { code: '+81', name: 'Japan' }
    ];

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
            console.log(data,"testing working");
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

    const navigate = useNavigate()
    return (
        <>

            <div className="">
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
                            <div className="w-full">
                                <div className="flex flex-col gap-y-[8vw] overflow-y-scroll h-[74vh] px-[3vw] mt-[1.5vw]  Legal-Information-Mobile">
                                    <div className="flex flex-col gap-[2vw]">
                                        <div className="bg-white p-[3vw] rounded-lg flex flex-col gap-[3.5vw]">
                                            <div className='text-[#1F487C] text-[6vw] font-semibold '>
                                                Personal Details
                                            </div>
                                            <div className="flex flex-col gap-[5.5vw]">
                                                <div className="relative">
                                                    <Field
                                                        type="text"
                                                        name="name"
                                                        id="name"
                                                        className="block py-[0.5vw] px-2 w-full h-[10vw] text-[4vw] text-[#1F487C] bg-transparent border border-[#1F487C] rounded-md focus:outline-none focus:ring-0 focus:border-[#1F487C] peer"
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
                                                        className={`absolute text-[3.5vw] text-[#1F487C] duration-300 transform -translate-y-[0.2vw] scale-75 top-[1.5vw] left-[3vw] origin-0 bg-white px-[0.2vw] peer-focus:left-[0.6vw] peer-focus:text-[#1F487C] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-[0.4vw] peer-placeholder-shown:text-[vw] peer-focus:text-[3.5vw] peer-focus:scale-75 peer-focus:-translate-y-[4.2vw] ${values.name ? "-translate-y-[4.2vw]" : ""
                                                            }`}
                                                    >
                                                        Name<span className="text-red-500 ml-1">*</span>
                                                    </label>
                                                    <ErrorMessage
                                                        name="name"
                                                        component="div"
                                                        className="text-red-500 text-[2.8vw] absolute top-[10vw]"
                                                    />
                                                </div>
                                                <div className="relative">
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

                                                        className="block py-[0.5vw] px-2 w-full h-[10vw] text-[4vw] text-[#1F487C] bg-transparent border border-[#1F487C] rounded-md focus:outline-none focus:ring-0 focus:border-[#1F487C] peer"
                                                    />
                                                    <ErrorMessage
                                                        name="date_of_birth"
                                                        component="div"
                                                        className="text-red-500 text-[2.8vw] absolute top-[vw]"
                                                    />
                                                </div>
                                            </div>
                                            <div className=" flex flex-col gap-[2vw]">
                                                <div className='text-[#1F487C80] font-semibold text-[4vw] '>Gender</div>
                                                <div className='flex  gap-[5.5vw]'>
                                                    <div className="flex items-center justify-between py-[0.5vw] px-2 w-full h-[10vw] text-[3.5vw] text-[#1F487C] bg-transparent border border-[#1F487C] rounded-md focus:outline-none focus:ring-0 focus:border-[#1F487C] peer">
                                                        <div className='order-first'>Male</div>
                                                        <div className='order-last flex items-center'>
                                                            <Field
                                                                type="radio"
                                                                name="gender"
                                                                value="male" />
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center justify-between py-[0.5vw] px-2 w-full h-[10vw] text-[3.5vw] text-[#1F487C] bg-transparent border border-[#1F487C] rounded-md focus:outline-none focus:ring-0 focus:border-[#1F487C] peer">
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
                                    </div>

                                    <div className="bg-white px-[3vw] pt-[1vw] pb-[5vw] rounded-lg">
                                        <div className="flex flex-col gap-[2vw]">
                                            <div className='text-[#1F487C] text-[6vw] font-semibold '>
                                                Contact Details
                                            </div>
                                            <div className="flex flex-col gap-[4.5vw]">
                                                <div>
                                                    <div className="relative flex flex-col border-[0.5vw] border-[#1F487C] rounded-md">
                                                        <label
                                                            htmlFor="state"
                                                            // className={`absolute text-[3.5vw] text-[#1F487C] duration-300 transform -translate-y-[0.2vw] scale-75 top-[1.5vw] left-[3vw] origin-0 bg-white px-[0.2vw] peer-focus:left-[0.6vw] peer-focus:text-[#1F487C] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-[0.4vw] peer-placeholder-shown:text-[vw] peer-focus:text-[3.5vw] peer-focus:scale-75 peer-focus:-translate-y-[4.2vw] ${values.state ? "-translate-y-[4.2vw]" : "-translate-y-[4.2vw]"
                                                            //     }`}
                                                            className="pl-[2vw] text-[3.5vw] text-[#1F487C80]"
                                                        >
                                                            State of Residance
                                                            <span className="text-red-500 ml-1">*</span>
                                                        </label>
                                                        <Field
                                                            as="select"
                                                            name="state"
                                                            id="state"
                                                            className="px-2 w-full h-[6vw] text-[3.5vw] text-[#1F487C] bg-transparent  focus:outline-none focus:ring-0 focus:border-[#1F487C] peer"
                                                            value={values.state}
                                                            onChange={(e) => {
                                                                handleChange(e); // Formik's handleChange
                                                            }}
                                                        // className="border-[0.1vw] border-slate-500 text-[#1F487C] text-[1.2vw] h-[3vw] w-[27vw]  outline-none px-[1vw] rounded-[0.5vw]"
                                                        >
                                                            <option
                                                                value=""
                                                                label="State of state"
                                                                className="text-gray-400 text-[3vw] w-1/2"
                                                            />
                                                            <option
                                                                value="Tamilnadu"
                                                                label="Tamilnadu"
                                                                className="text-gray-400 text-[3vw] w-1/2"
                                                            />
                                                        </Field>
                                                        {/* <ErrorMessage
                                                name="state"
                                                component="div"
                                                className="text-red-500 text-[0.8vw] absolute top-[4vw]"
                                            /> */}
                                                    </div>
                                                    <div className=" text-[2.8vw] text-[#1F487C80] ">
                                                        Required for GST Tax Invoicing{" "}
                                                    </div>
                                                </div>
                                                <div className="relative flex flex-col border-[0.5vw] border-[#1F487C] rounded-md ">
                                                    <div className="grid grid-cols-3">
                                                        <div className="col-span-1 border-r-[0.5vw] border-[#1F487C] ">
                                                            <div className="text-[#1F487C80] text-[3.5vw] pl-[1vw]">Country Code</div>
                                                            <Field
                                                                as="select"
                                                                name="countryCode"
                                                                id="countryCode"
                                                                className="text-[#1F487C] text-[3.5vw] px-2 w-full h-[6vw] bg-transparent  focus:outline-none focus:ring-0 focus:border-[#1F487C] peer"
                                                                onChange={handleChange}
                                                                value={values.countryCode}
                                                            >
                                                                <option value="" label="+91 (IND)" />
                                                            </Field>
                                                        </div>
                                                        <div className="col-span-2">
                                                            <label
                                                                htmlFor="phone"
                                                                // className={`absolute text-[3.5vw] text-[#1F487C] duration-300 transform -translate-y-[0.2vw] scale-75 top-[1.5vw] left-[3vw] origin-0 bg-white px-[0.2vw] peer-focus:left-[0.6vw] peer-focus:text-[#1F487C] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-[0.4vw] peer-placeholder-shown:text-[vw] peer-focus:text-[3.5vw] peer-focus:scale-75 peer-focus:-translate-y-[4.2vw] ${values.phone ? "-translate-y-[4.2vw]" : ""
                                                                //     }`}
                                                                className="text-[#1F487C80] pl-[2vw] text-[3.5vw]"
                                                            >
                                                                Phone Number<span className="text-red-500 ml-1">*</span>
                                                            </label>
                                                            <Field
                                                                type="text"
                                                                name="phone"
                                                                id="phone"
                                                                className="block py-[0.5vw] px-2 w-full h-[6vw] text-[4vw] text-[#1F487C] bg-transparent  focus:outline-none focus:ring-0 focus:border-[#1F487C] peer"
                                                                placeholder=" "
                                                                value={values.phone}
                                                                onChange={(e) => {
                                                                    handleChange(e); // Formik's handleChange
                                                                    // handleFormChange({
                                                                    //   ...values,
                                                                    //   phone: e.target.value,
                                                                    // });
                                                                    localStorage.setItem(
                                                                        "phone",
                                                                        e.target.value
                                                                    );
                                                                }}
                                                            // className="border-[0.1vw] border-slate-500 text-[#1F487C] text-[1.2vw] h-[3vw] w-[27vw]  outline-none px-[1vw] rounded-[0.5vw]"
                                                            />
                                                        </div>
                                                    </div>
                                                    <ErrorMessage
                                                        name="phone"
                                                        component="div"
                                                        className="text-red-500 text-[2.8vw] absolute top-[13vw]"
                                                    />
                                                </div>
                                                <div className="relative border border-[#1F487C] rounded-md">
                                                    <label
                                                        htmlFor="email"

                                                        // className={`absolute text-[5vw] text-[#1F487C] duration-300 transform -translate-y-[0.2vw] scale-75 top-[1vw] left-[3vw] origin-0 bg-white px-[0.2vw] peer-focus:left-[0.6vw] peer-focus:text-[#1F487C] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-[0.4vw] peer-placeholder-shown:text-[vw] peer-focus:text-[3.5vw] peer-focus:scale-75 peer-focus:-translate-y-[3.5vw] ${values.email ? "-translate-y-[3.5vw]" : ""
                                                        //     }`}
                                                        className="pl-[2vw] text-[3.5vw] text-[#1F487C80]"
                                                    >
                                                        Email<span className="text-red-500 ml-1">*</span>
                                                    </label>
                                                    <Field
                                                        type="email"
                                                        name="email"
                                                        id="email"
                                                        className="block py-[0.5vw] px-2 w-full h-[5vw] text-[4vw] text-[#1F487C] bg-transparent  focus:outline-none focus:ring-0 focus:border-[#1F487C] peer"

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


                                                    <ErrorMessage
                                                        name="email"
                                                        component="div"
                                                        className="text-red-500 text-[2.8vw] absolute top-[13vw]"
                                                    />
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className=' fixed bottom-[1vw] w-full flex items-center justify-center'>
                                    <button type='submit' className='bg-[#1F487C] text-[white] w-3/4 h-[10vw] rounded-full text-[5vw] '>{updateData ? "Update Passenger" : "Add Passenger"}</button>
                                </div>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </>
    );
};

export default MobileAddPassenger;