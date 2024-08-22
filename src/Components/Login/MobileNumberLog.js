import React, { useState } from 'react';
import { Modal } from 'antd';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";


const MobileNumberLog = ({ nextPage }) => {

    const validationSchema = Yup.object({
        mobile: Yup.string()
            .required('Mobile number is required')
            .matches(/^\d{10}$/, 'Mobile number must be exactly 10 digits'),
    });

    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };


    return (
        <>
            <div className='md:block hidden'>
                <div className='flex flex-col justify-center items-center'>
                    <div className='text-[#1F487C] text-[2vw] font-semibold w-[27vw] text-center'>
                        Sign in to exciting discount and cashbacks !!
                    </div>
                    <Formik
                        initialValues={{
                            mobile: ""
                        }}
                        validationSchema={validationSchema}
                        onSubmit={(values) => {
                            // Store mobile number in local storage
                            localStorage.setItem("mobile", values.mobile);
                            nextPage();
                        }}
                        enableReinitialize
                    >
                        {({ isSubmitting, handleSubmit, values, handleChange }) => (
                            <Form className="py-[1vw]" onSubmit={handleSubmit}>
                                <div className='flex flex-col gap-y-[2vw] w-[27vw]'>
                                    <div className="col-span-2 flex relative">
                                        <Field
                                            as="select"
                                            name="option"
                                            className="border-l-[0.1vw] border-t-[0.1vw] border-b-[0.1vw] border-slate-500 border-py-[0.5vw] text-[#1F487C] text-[1.1vw] h-[3vw] w-[6vw] rounded-l-[0.2vw] outline-none px-[0.1vw]"
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
                                            className="border-r-[0.1vw] border-t-[0.1vw] border-b-[0.1vw] border-slate-500 text-[#1F487C] text-[1.2vw] h-[3vw] w-[21vw] rounded-r-[0.2vw] outline-none px-[1vw]"
                                        />
                                        <ErrorMessage
                                            name="mobile"
                                            component="div"
                                            className="text-red-500 text-[0.8vw] absolute top-[3vw] left-[1vw]"
                                        />
                                    </div>

                                    <button
                                        type='submit'
                                        className='bg-[#1F487C] w-[27vw] h-[2.5vw] border-[0.1vw] rounded-[0.2vw] border-slate-700 text-[1.2vw] text-white'
                                    // disabled={isSubmitting} // Disable button during submission
                                    >
                                        GENERATE OTP (One Time Password)
                                    </button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                    <div className='flex flex-col items-center '>
                        <div className='text-[1vw]'><span className='font-bold text-[1vw]'>OR</span>, Connect using Social Accounts</div>
                        <div className='cursor-pointer bg-[#1F487C] w-[12.5vw] h-[2.5vw] border-[0.1vw] rounded-[0.2vw] border-slate-700 text-[1vw] text-white flex items-center  gap-[0.5vw] mt-[2vw]'>
                            <div className='bg-white rounded-[0.2vw] ml-[0.1vw]'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="2.1vw" height="2.1vw" viewBox="0 0 48 48"><path fill="#ffc107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917" /><path fill="#ff3d00" d="m6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C16.318 4 9.656 8.337 6.306 14.691" /><path fill="#4caf50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44" /><path fill="#1976d2" d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002l6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917" /></svg>
                            </div>
                            <div>
                                Sign in with Google
                            </div>
                        </div>
                        <div className=' w-[27vw] text-[1vw] text-center text-[#1F487C]  mt-[3vw] '>
                            By Signing up, you agree to our<span className='font-semibold'> Terms & Conditions</span> and <span className='font-semibold'>Privacy Policy</span>
                        </div>
                    </div>
                </div>
            </div>


            {/* ---MobileView--- */}

            <div className='md:hidden block'>
                <div className='flex flex-col gap-[5vw]'>
                    <div className='text-[#1F487C] text-[6vw] font-semibold text-center'>
                        Sign into exciting discount and cashbacks !!
                    </div>
                    <Formik
                        initialValues={{
                            mobile: "",
                        }}
                        validationSchema={validationSchema}
                        onSubmit={(values) => {
                           
                            nextPage();
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
                                <div className='grid grid-rows-2 gap-y-[9vw] relative'>
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

                                    <button type='submit' className='bg-[#1F487C] w-full h-[13vw] border-[0.1vw] rounded-[1vw] border-slate-700 text-[4vw] text-white '>GENERATE OTP(One Time Password)</button>
                                </div>
                            </Form>

                      

                        )}
                    </Formik>
                    <div className='flex flex-col items-center gap-[5vw]'>
                        <div className='text-[3.5vw]'><span className='font-bold text-[4vw]'>OR</span>, Connect using Social Accounts</div>
                        <div className='cursor-pointer bg-[#1F487C] w-[60vw] h-[10vw] border-[0.1vw] rounded-[1vw] border-slate-700 text-[4.5vw] text-white flex items-center  gap-[0.5vw]'>
                            <div className='bg-white rounded-[1vw] ml-[0.1vw]'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="9vw" height="9vw" viewBox="0 0 48 48"><path fill="#ffc107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917" /><path fill="#ff3d00" d="m6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C16.318 4 9.656 8.337 6.306 14.691" /><path fill="#4caf50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44" /><path fill="#1976d2" d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002l6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917" /></svg>
                            </div>
                            <div className='pl-[3vw]'>
                                Sign in with Google
                            </div>
                        </div>
                        <div className='text-[3.5vw] text-center text-[#1F487C]  mt-[3vw] '>
                            By Signing up, you agree to our<span className='font-semibold'> Terms & Conditions</span> and <span className='font-semibold'>Privacy Policy</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MobileNumberLog
