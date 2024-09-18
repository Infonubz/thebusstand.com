import React from "react";
import { HiMiniPhone } from "react-icons/hi2";
import { TbMailFilled } from "react-icons/tb";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router";
import BGSCREEN from '../../../../assets/BG Image.png'


export default function MobileHelp() {

    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .min(2, "Name must be at least 2 characters long")
            .max(50, "Name can't be longer than 50 characters")
            .required("Name is required"),
        email: Yup.string()
            .email("Invalid email format")
            .required("Email is required"),
        terms: Yup.bool()
            .oneOf([true], 'You must accept the terms and conditions')
            .required('You must accept the terms and conditions'),
        message: Yup.string()
            .required('Message is required')
            .min(10, 'Message must be at least 10 characters')
            .max(250, 'Message cannot exceed 250 characters')

    });

    const navigation = useNavigate();

    const handlePrevPage = () => {
        localStorage.setItem('navigateBack', 'true');
        navigation('/dashboard', { state: { togglePage: true } });
    };

    return (
        <>
            <div className='bg-[#E5FFF1] min-h-screen max-h-auto w-full'>
                <div className="relative">
                    <img src={BGSCREEN} className="bg-cover h-screen w-screen" />
                    <div className="absolute top-0">
                        <div>
                            <div className="w-full h-[15vw] bg-[#1F487C] flex items-center justify-center">
                                <div className="col-span-2 "><IoIosArrowRoundBack color="white" size="10vw" onClick={handlePrevPage} /></div>
                                <div className="px-[2vw] text-[5vw] text-white font-bold flex gap-[2vw]"><p onClick={() => navigation('/dashboard')}>Home</p><p>{`>`}</p><p onClick={handlePrevPage}>My Account</p><p>{`>`}</p><p>Help</p></div>
                            </div>
                        </div>
                        <div className="px-[3vw]">
                            <div className="font-bold text-[#1F487C] text-[5vw] text-center">Get in Touch</div>
                            <div className="py-[2vw] flex flex-col gap-[4vw]">
                                <div className="w-full text-[#1F487C] text-[4vw]">
                                    If you have any Inquiries get in touch with us. We'll be happy to help you.
                                </div>
                                <div className="flex flex-col gap-[1.5vw] px-[3vw]">
                                    <div className="grid grid-cols-12 items-center border-[0.5vw] rounded-lg bg-white border-[#1F487C] w-full h-[12vw] px-[3vw] gap-[3vw] text-[4vw]">
                                        <div className="col-span-4 justify-self-center"><HiMiniPhone color="#1F487C" size='8vw' /></div>
                                        <p className="text-[#1F487C] col-span-8 justify-self-start">+91 96885 53316</p>
                                    </div>
                                    <div className="grid grid-cols-12 items-center border-[0.5vw] rounded-lg bg-white border-[#1F487C] w-full h-[12vw] px-[3vw] gap-[3vw] text-[4vw]">
                                        <div className="col-span-4 justify-self-center"><TbMailFilled color="#1F487C" size='8vw' /></div>
                                        <p className="text-[#1F487C] col-span-8 justify-self-start">info@theebusstand.com</p>
                                    </div>
                                </div>
                            </div>

                            <div className="h-auto w-full rounded-[1vw]">
                                <Formik
                                    initialValues={{
                                        name: "",
                                        email: "",
                                        message: "",
                                        terms: false,
                                    }}
                                    validationSchema={validationSchema}
                                    onSubmit={(values) => {
                                        localStorage.setItem("mobile", values.mobile);
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
                                            className=""
                                            onSubmit={handleSubmit}
                                        >
                                            <div>
                                                <div>
                                                    <div className="px-[3vw] pt-[2vw] pb-[1vw] flex flex-col gap-[1.5vw]">

                                                        <div className="font-semibold text-[#1F487C] text-[4.5vw] text-center">Feel Free to ask your query : ) </div>
                                                    </div>
                                                    <div className="px-[1.5vw]">
                                                        <div className='flex flex-col gap-[4vw] pb-[5vw] pt-[1vw] w-full relative border-[0.1vw] bg-white border-[#1F487C] px-[3vw] rounded-2xl'>
                                                            <div className="flex flex-col gap-[0.5vw]">
                                                                <div><label className="text-[4.5vw] text-[#1F487C]">Name*</label></div>
                                                                <div>
                                                                    <Field
                                                                        type="name"
                                                                        name="name"
                                                                        placeholder=""
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
                                                                        className="bg-[#D6EBFF80] border-slate-500 text-[#1F487C] text-[3.5vw] h-[10vw] w-full outline-none px-[3vw] rounded-[0.5vw]"
                                                                    />
                                                                    <ErrorMessage
                                                                        name="name"
                                                                        component="div"
                                                                        className="text-red-500 text-[2.8vw] absolute"
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="flex flex-col gap-[0.5vw]">
                                                                <div><label className="text-[4.5vw] text-[#1F487C]">Email*</label></div>
                                                                <div>
                                                                    <Field
                                                                        type="email"
                                                                        name="email"
                                                                        placeholder=""
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
                                                                        className="bg-[#D6EBFF80] border-slate-500 text-[#1F487C] text-[3.5vw] h-[10vw] w-full outline-none px-[3vw] rounded-[0.5vw]"

                                                                    />
                                                                    <ErrorMessage
                                                                        name="email"
                                                                        component="div"
                                                                        className="text-red-500 text-[2.8vw] absolute "
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="relative">
                                                                <div className="flex flex-col gap-[0.5vw]">
                                                                    <div><label className="text-[4.5vw] text-[#1F487C]">Message*</label></div>
                                                                    <Field
                                                                        as="textarea"
                                                                        id="message"
                                                                        name="message"
                                                                        maxlength="251"
                                                                        className="bg-[#D6EBFF80] border-slate-500 text-[#1F487C] text-[3.5vw] h-[17vw] w-full outline-none px-[3vw] rounded-[0.5vw]" />
                                                                </div>
                                                                <ErrorMessage
                                                                    name="message"
                                                                    component="div"
                                                                    className="text-red-500 text-[2.8vw] absolute " />
                                                                {values.message.length >= 10 && values.message.length <= 250 && (
                                                                    <div className="text-red-500 text-[2.8vw] absolute">
                                                                        {values.message.length >= 251 ? 'Message cannot exceed 250 characters' : ''}
                                                                    </div>
                                                                )}
                                                            </div>
                                                            <div className=" flex items-center gap-[2vw] py-[1vw]">
                                                                <Field type="checkbox" name="terms" />
                                                                <label htmlFor="terms" className="text-[3vw] text-[#1F487C]">I accept the terms and conditions</label>
                                                                <ErrorMessage
                                                                    name="terms"
                                                                    component="div"
                                                                    className="text-red-500 text-[2.8vw] absolute bottom-[0.8vw] " />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='flex items-center justify-center py-[2vw] fixed bottom-[2vw] w-full'>
                                                    <button type='submit' className='bg-[#1F487C] text-[white] w-3/4 h-[10vw] rounded-full text-[4vw] '>Save Changes</button>
                                                </div>
                                            </div>

                                        </Form>
                                    )}
                                </Formik>
                            </div >
                        </div>
                    </div></div></div>

        </>
    );
}
