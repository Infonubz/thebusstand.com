import React from "react";
import { HiMiniPhone } from "react-icons/hi2";
import { TbMailFilled } from "react-icons/tb";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import helpss from '../../../../assets/Help.gif'
import { message } from "antd";

export default function Help() {

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
      .required('You must accept the terms and conditions')
  });

  return (
    <div className="bg-white h-auto w-full rounded-[1vw]">
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
            <div className='flex'>
              <div className="flex flex-col justify-items-center px-[5vw] gap-[2vw]">
                <div className="flex justify-center">
                  <img src={helpss} alt="" className="h-[18vw] w-[18vw]" />
                </div>
                <div className="w-[23vw] text-center text-[#1F487C] font-bold">
                  If you have any Inquiries get in touch with us. We'll be happy to help you.
                </div>
                <div className="flex flex-col gap-[2.5vw]">
                  <div className="flex items-center border-[0.1vw] rounded-[0.5vw] border-[#1F487C] w-[21vw] h-[2.5vw] px-[1vw] gap-[3vw] text-[1vw]"><HiMiniPhone color="#1F487C" size='1.5vw' /><p className="text-[#1F487C]">+91 96885 53316</p></div>
                  <div className="flex items-center border-[0.1vw] rounded-[0.5vw] border-[#1F487C] w-[21vw] h-[2.5vw] px-[1vw] gap-[3vw] text-[1vw]"><TbMailFilled color="#1F487C" size='1.5vw' /><p className="text-[#1F487C]">info@theebusstand.com</p></div>
                </div>
              </div>

              <div className="w-[0.01vw] h-[28vw] border-r-[0.2vw] mt-[2vw] border-dashed content-center"></div>

              <div>
                <div className="px-[3vw] pt-[2vw] pb-[1vw] flex flex-col gap-[1.5vw]">
                  <div className="font-bold text-[#1F487C] text-[1.5vw]">Get in Touch</div>
                  <div className="font-semibold text-[#1F487C] text-[1.1vw]">Feel free to ask your query :) </div>
                </div>
                <div className="px-[1.5vw]">
                  <div className='flex flex-col gap-[0.8vw] py-[0.5vw] w-[35vw] relative border-[0.1vw] border-[#1F487C] px-[1.5vw] rounded-[1vw]'>
                    <div className="flex flex-col gap-[0.5vw]">
                      <div><label className="text-[1vw] text-[#1F487C]">Name*</label></div>
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
                          className="bg-[#D6EBFF80] opacity-50 border-slate-500 text-[#1F487C] text-[1.2vw] h-[2.5vw] w-[32vw]  outline-none px-[1vw] rounded-[0.5vw]"
                        />
                        <ErrorMessage
                          name="name"
                          component="div"
                          className="text-red-500 text-[0.8vw] absolute"
                        />
                      </div>
                    </div>
                    <div className="flex flex-col gap-[0.5vw]">
                      <div><label className="text-[1vw] text-[#1F487C]">Email*</label></div>
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
                          className="bg-[#D6EBFF80] opacity-50 border-slate-500 text-[#1F487C] text-[1.2vw] h-[2.5vw] w-[32vw]  outline-none px-[1vw] rounded-[0.5vw]"

                        />
                        <ErrorMessage
                          name="email"
                          component="div"
                          className="text-red-500 text-[0.8vw] absolute "
                        />
                      </div>
                    </div>
                    <div className="flex flex-col gap-[0.5vw]">
                      <div><label className="text-[1vw] text-[#1F487C]">Message*</label></div>
                      <Field
                        as="textarea"
                        id="message"
                        name="message"
                        className="bg-[#D6EBFF80] opacity-50 border-slate-500 text-[#1F487C] text-[1.2vw] h-[5vw] w-[32vw]  outline-none px-[1vw] rounded-[0.5vw]" />
                    </div>
                    <div className=" flex items-center gap-[2vw] py-[1vw]">
                      <Field type="checkbox" name="terms" />
                      <label htmlFor="terms" className="text-[1vw] text-[#1F487C]">I accept the terms and conditions</label>
                      <ErrorMessage
                        name="terms"
                        component="div"
                        className="text-red-500 text-[0.8vw] absolute bottom-[0.1vw]" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='flex px-[25vw] py-[1.5vw]'>
              <button type='submit' className='bg-[#1F487C] text-[white] w-[18vw] h-[3vw] rounded-full text-[1.25vw] '>Save Changes</button>
            </div>
          </Form>
        )}
      </Formik>
    </div >
  );
}
