import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { GetUserDetails, SendPassengerName } from "../../Api/Login/Login";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate, useNavigation } from "react-router";
import { Select } from "antd";
const { Option } = Select; // Destructure Option from Select

const LoginProfile = ({ closeLoginModal, setLoginIsOpen }) => {
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, "Name must be at least 2 characters long")
      .max(50, "Name must be 50 characters or less")
      .required("Name is required"),
    // email: Yup.string()
    //   .email("Invalid email address")
    //   .required("Email is required"),
    mobile: Yup.string()
      .matches(/^(\+?\d{1,3}[- ]?)?\d{10}$/, "Invalid mobile number format")
      .required("Mobile number is required"),
    occupation: Yup.string().required("Occupation is required"),
  });

  const [occValue, setOccValue] = useState(false);

  const dispatch = useDispatch();
  const navigation = useNavigate();
  const user_id = sessionStorage.getItem("user_id");

  const handleSubmit = async (values) => {
    console.log(values, "vaaaaaaaaaaaaaaaaaaaaafddddddddddd");
    const response = await SendPassengerName(dispatch, values, "register");
    setLoginIsOpen(false);
    console.log(response, "responsemail");

    toast.success(response.response);
    if (user_id) {
      GetUserDetails();
    }
    // closeLoginModal();
  };

  return (
    <>
      <div className="md:block hidden h-auto">
        <div className="flex flex-col ">
          <div className="text-[#1F487C] text-[1.4vw] font-bold w-[27vw] flex items-center justify-center ">
            Registration Successful
          </div>
          <div className="text-[1vw] opacity-50 flex items-center justify-center ">
            You are almost there. Complete your profile
          </div>
          <Formik
            initialValues={{
              name: "",
              //   email: sessionStorage.getItem("email_id"),
              mobile: "",
              occupation: "",
            }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              handleSubmit(values);
              sessionStorage.setItem("passenger_name", values.name);
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
              <Form className="py-[1vw]" onSubmit={handleSubmit}>
                <div className="flex flex-col  gap-y-[1vw] w-[27vw]">
                  <div className="relative">
                    <label className="text-[1.2vw] flex items-center font-bold opacity-50">
                      <span className="pr-[0.2vw] font-bold">Name</span>
                      <span className="text-red-600">*</span>
                    </label>
                    <div className="">
                      <Field
                        type="text"
                        name="name"
                        placeholder="Enter Your Name"
                        value={values.name}
                        onChange={(e) => {
                          handleChange(e);
                          // handleFormChange({
                          //   ...values,
                          //   mobile: e.target.value,
                          // });
                          localStorage.setItem("name", e.target.value);
                        }}
                        className="border-[0.1vw] border-slate-500 rounded-[0.5vw] text-[#1F487C] text-[1.2vw] h-[3vw] w-[27vw]  outline-none px-[1vw]"
                      />
                      <ErrorMessage
                        name="name"
                        component="div"
                        className="text-red-500 text-[0.8vw] absolute "
                      />
                    </div>
                  </div>
                  {/* <div>
                    <label className="text-[1.2vw] font-bold opacity-50">
                      Email
                    </label>
                    <div className="">
                      <Field
                        type="text"
                        name="email"
                        placeholder="Enter Your Mail"
                        value={values.email}
                        className="border-[0.1vw] border-slate-500 text-[#1F487C] text-[1.2vw] h-[3vw] w-[27vw]  outline-none px-[1vw]"
                        disabled
                      />
                      <ErrorMessage
                        name="email"
                        component="div"
                        className="text-red-500 text-[0.8vw] "
                      />
                    </div>
                  </div> */}
                  <div className="relative">
                    <label className="text-[1.2vw] flex items-center font-bold opacity-50">
                      <span className="pr-[0.2vw] font-bold">Mobile</span>
                      <span className="text-red-600">*</span>
                    </label>
                    <div className="">
                      <Field
                        type="text"
                        name="mobile"
                        placeholder="Enter Your Mobile Number"
                        value={values.email}
                        className="border-[0.1vw] border-slate-500 rounded-[0.5vw] text-[#1F487C] text-[1.2vw] h-[3vw] w-[27vw]  outline-none px-[1vw]"
                        // disabled
                      />
                      <ErrorMessage
                        name="mobile"
                        component="div"
                        className="text-red-500 text-[0.8vw] absolute"
                      />
                    </div>
                  </div>
                  <div className="relative">
                    <label className="text-[1.2vw] flex items-center font-bold opacity-50">
                      <span className="pr-[0.2vw] font-bold">Occupation</span>
                      <span className="text-red-600">*</span>
                    </label>
                    <div className="">
                      <Field
                        as="select"
                        name="occupation"
                        className="border-[0.1vw] border-slate-500 rounded-[0.5vw] text-[#1F487C] text-[1.2vw] h-[3vw] w-[27vw]  outline-none px-[1vw]"
                      >
                        <option
                          value=""
                          className="text-gray-400"
                          label="Select Occupation"
                          disabled
                        />
                        {/* <option value="GeneralPublic">General Public</option>
                        <option value="PhysicallyChallenged">
                          Physically Challenged
                        </option>
                        <option value="PilgrimTravelers">
                          Pilgrim Travelers
                        </option>
                        <option value="SeniorCitizens">Senior Citizens</option>
                        <option value="Students">Students</option>
                        <option value="Tourist">Tourist</option>
                        <option value="Corporate Travelers">
                          Corporate Travelers
                        </option> */}
                        <option value="Business">Business</option>
                        <option value="GeneralPublic">General Public</option>
                        <option value="PhysicallyChallenged">Physically Challenged</option>
                        <option value="PilgrimTravelers">Pilgrim Traveler</option>
                        <option value="SeniorCitizens">Senior Citizen</option>
                        <option value="Students">Student</option>
                        <option value="Tourist">Tourist</option>
                        <option value="CorporateTravelers">Corporate Traveler</option>
                      </Field>
                      <ErrorMessage
                        name="occupation"
                        component="div"
                        className="text-red-500 text-[0.8vw] absolute"
                      />
                    </div>
                  </div>
                  <div className="py-[2vw] relative">
                    <button
                      type="submit"
                      className="bg-[#1F487C] w-[27vw] h-[2.5vw] border-[0.1vw] rounded-[0.2vw] border-slate-700 text-[1.2vw] text-white "
                    >
                      SUBMIT
                    </button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>

      <div className="md:hidden block">
        <div className="py-[5vw]">
          <div className="text-[#1F487C] text-[5vw] font-bold ">
            Registration Successful
          </div>
          <div className="text-[4.5vw] opacity-50">
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
              <Form className="py-[1vw]" onSubmit={handleSubmit}>
                <div className="flex flex-col gap-y-[4vw]">
                  <div className="relative">
                    <label className="text-[4.5vw] flex items-center font-bold opacity-50">
                      <span className="pr-[0.5vw] font-bold">Name</span>
                      <span className="text-red-600">*</span>
                    </label>
                    <div className="">
                      <Field
                        type="text"
                        name="name"
                        placeholder="Enter Your Name"
                        value={values.name}
                        onChange={(e) => {
                          handleChange(e);
                          // handleFormChange({
                          //   ...values,
                          //   mobile: e.target.value,
                          // });
                          localStorage.setItem("name", e.target.value);
                        }}
                        className="customize-placeholder border-[0.1vw] border-slate-500 text-[#1F487C] text-[4vw] h-[13vw] w-full  outline-none px-[1vw]"
                      />
                      <ErrorMessage
                        name="name"
                        component="div"
                        className="text-red-500 text-[2.8vw] absolute "
                      />
                    </div>
                  </div>

                  <div className="relative">
                    <label className="text-[4.5vw] flex items-center font-bold opacity-50">
                      <span className="pr-[0.5vw] font-bold">Email</span>
                      <span className="text-red-600">*</span>
                    </label>
                    <div>
                      <Field
                        type="text"
                        name="email"
                        placeholder="Enter Your Mail"
                        value={values.email}
                        onChange={(e) => {
                          handleChange(e);
                          // handleFormChange({
                          //   ...values,
                          //   mobile: e.target.value,
                          // });
                          localStorage.setItem("email", e.target.value);
                        }}
                        className="customize-placeholder border-[0.1vw] border-slate-500 text-[#1F487C] text-[4vw] h-[13vw] w-full  outline-none px-[1vw]"
                      />
                      <ErrorMessage
                        name="email"
                        component="div"
                        className="text-red-500 text-[2.8vw] absolute "
                      />
                    </div>
                  </div>

                  <div className="py-[3.5vw]">
                    <button
                      type="submit"
                      className="bg-[#1F487C] w-full h-[13vw] border-[0.1vw] rounded-[0.5vw] border-slate-700 text-[4.5vw] text-white "
                    >
                      SUBMIT
                    </button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
};

export default LoginProfile;
