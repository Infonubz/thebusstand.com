import React from 'react'
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const LoginProfile = () => {
    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .min(2, 'Name must be at least 2 characters long')
            .max(50, 'Name must be 50 characters or less')
            .required('Name is required'),
        email: Yup.string()
            .email('Invalid email address')
            .required('Email is required'),
    });
    return (
        <>
            <div className='md:block hidden'>
                <div className='flex flex-col '>
                    <div className='text-[#1F487C] text-[1.4vw] font-bold w-[27vw] '>
                        Registration Successful
                    </div>
                    <div className='text-[1vw] opacity-50'>
                        You are almost there. Complete your profile
                    </div>
                    <Formik
                        initialValues={{
                            name: "",
                            email: "",
                        }}
                        validationSchema={validationSchema}
                        onSubmit={(values) => {
                            // localStorage.setItem("name", values.name);
                            // localStorage.setItem("name", values.name);
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
                                <div className='flex flex-col gap-y-[1.5vw] w-[27vw]'>

                                    <div className=''>
                                        <label className='text-[1.2vw] font-bold opacity-50'>Name</label>
                                        <div className="">
                                            <Field
                                                type="text"
                                                name="name"
                                                placeholder="Enter Your Name"
                                                value={values.name}
                                                onChange={(e) => {
                                                    handleChange(e); // Formik's handleChange
                                                    // handleFormChange({
                                                    //   ...values,
                                                    //   mobile: e.target.value,
                                                    // });
                                                    localStorage.setItem(
                                                        "name",
                                                        e.target.value
                                                    );
                                                }}
                                                className="border-[0.1vw] border-slate-500 text-[#1F487C] text-[1.2vw] h-[3vw] w-[27vw] rounded-r-[0.2vw] outline-none px-[1vw]"
                                            />
                                            <ErrorMessage
                                                name="name"
                                                component="div"
                                                className="text-red-500 text-[0.8vw] "
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className='text-[1.2vw] font-bold opacity-50'>Email</label>
                                        <div className="">
                                            <Field
                                                type="text"
                                                name="email"
                                                placeholder="Enter Your Mail"
                                                value={values.email}
                                                onChange={(e) => {
                                                    handleChange(e); // Formik's handleChange
                                                    // handleFormChange({
                                                    //   ...values,
                                                    //   mobile: e.target.value,
                                                    // });
                                                    localStorage.setItem(
                                                        "email",
                                                        e.target.value
                                                    );
                                                }}
                                                className="border-[0.1vw] border-slate-500 text-[#1F487C] text-[1.2vw] h-[3vw] w-[27vw] rounded-r-[0.2vw] outline-none px-[1vw]"
                                            />
                                            <ErrorMessage
                                                name="email"
                                                component="div"
                                                className="text-red-500 text-[0.8vw] "/>
                                        </div>
                                    </div>
                                    <div className='py-[3.5vw]'>
                                        <button type='submit' className='bg-[#1F487C] w-[27vw] h-[2.5vw] border-[0.1vw] rounded-[0.2vw] border-slate-700 text-[1.2vw] text-white '>SUBMIT</button>
                                    </div>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>


            <div className='md:hidden block'>
                <div className='py-[5vw]'>
                    <div className='text-[#1F487C] text-[5vw] font-bold '>
                        Registration Successful
                    </div>
                    <div className='text-[4.5vw] opacity-50'>
                        You are almost there. Complete your profile
                    </div>
                    <Formik
                        initialValues={{
                            name: "",
                            email: "",
                        }}
                        validationSchema={validationSchema}
                        onSubmit={(values) => {
                            // localStorage.setItem("name", values.name);
                            // localStorage.setItem("name", values.name);
                        }}
                        enableReinitialize >
                        {({
                            isSubmitting,
                            isValid,
                            handleSubmit,
                            values,
                            handleChange,
                        }) => (
                            <Form
                                className="py-[1vw]"
                                onSubmit={handleSubmit} >
                                <div className='flex flex-col gap-y-[4vw]'>
                                    <div className='relative'>
                                        <label className='text-[4.5vw] font-bold opacity-50'>Name</label>
                                        <div className="">
                                            <Field
                                                type="text"
                                                name="name"
                                                placeholder="Enter Your Name"
                                                value={values.name}
                                                onChange={(e) => {
                                                    handleChange(e); // Formik's handleChange
                                                    // handleFormChange({
                                                    //   ...values,
                                                    //   mobile: e.target.value,
                                                    // });
                                                    localStorage.setItem(
                                                        "name",
                                                        e.target.value
                                                    );
                                                }}
                                                className="customize-placeholder border-[0.1vw] border-slate-500 text-[#1F487C] text-[4vw] h-[13vw] w-full rounded-r-[0.2vw] outline-none px-[1vw]"
                                            />
                                            <ErrorMessage
                                                name="name"
                                                component="div"
                                                className="text-red-500 text-[2.8vw] absolute "
                                            />
                                        </div>
                                    </div>
                                    <div className="relative">
                                        <label className='text-[4.5vw] font-bold opacity-50'>Email</label>
                                        <div>
                                            <Field
                                                type="text"
                                                name="email"
                                                placeholder="Enter Your Mail"
                                                value={values.email}
                                                onChange={(e) => {
                                                    handleChange(e); // Formik's handleChange
                                                    // handleFormChange({
                                                    //   ...values,
                                                    //   mobile: e.target.value,
                                                    // });
                                                    localStorage.setItem(
                                                        "email",
                                                        e.target.value
                                                    );
                                                }}
                                                className="customize-placeholder border-[0.1vw] border-slate-500 text-[#1F487C] text-[4vw] h-[13vw] w-full rounded-r-[0.2vw] outline-none px-[1vw]"
                                            />
                                            <ErrorMessage
                                                name="email"
                                                component="div"
                                                className="text-red-500 text-[2.8vw] absolute "/>
                                        </div>
                                    </div>
                                    <div className='py-[3.5vw]'>
                                        <button type='submit' className='bg-[#1F487C] w-full h-[13vw] border-[0.1vw] rounded-[0.2vw] border-slate-700 text-[4.5vw] text-white '>SUBMIT</button>
                                    </div>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </>
    )
}

export default LoginProfile
