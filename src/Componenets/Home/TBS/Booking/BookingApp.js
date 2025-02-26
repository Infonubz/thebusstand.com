import React, { useEffect, useState } from "react";
import BgHills from "../../../../Assets/BookingApp/BgHills.png";
// import AppRating from "../../assets/App rating.png";
import iphone from "../../../../Assets/BookingApp/iPhone 13 Pro.png";
// import Award from "../../assets/Award.png";
import AppStore from "../../../../Assets/BookingApp/AppStore.png";
import GoogleStore from "../../../../Assets/BookingApp/GoogleStore.png";
import * as Yup from "yup";
// import { App } from "antd";
// import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
// import { Rate } from "antd";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { Rate } from "antd";
import { GetAverageRating, sendAppLink } from "../../../../Api-TBS/Home/Home";

const mobileValidationSchema = Yup.object().shape({
  mobile: Yup.string()
    .matches(/^\d{10}$/, "Mobile number must be 10 digits")
    .required("Mobile number is required"),
});

const emailValidationSchema = Yup.object().shape({
  email: Yup.string()
    .max(40, "Email limit has reached")
    .email("Invalid email format")
    .required("Email is required"),
});

export default function BookingApp() {
  const [modalshow, setModalShow] = useState(2);
  const [averageData, setAverageData] = useState("");
  const dispatch = useDispatch();

  const handleSubmitlink = async (values) => {
    try {
      const sendLink = await sendAppLink(dispatch, values);
      console.log(sendLink, "send app link");
      toast.success(sendLink.message);
    } catch (error) {
      console.error(error, "Error");
    }
  };

  useEffect(() => {
    const AverageRating = async () => {
      const response = await GetAverageRating();
      console.log(response, "ratingavvadsd");
      // console.log(parseFloat(response?.average_rating),"ratingavvadsdp");
      setAverageData(response);
    };
    AverageRating();
  }, []);

  const handleKeyDown = (event, values) => {
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

  // State for input values and error messages
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [mobileError, setMobileError] = useState("");
  const [emailError, setEmailError] = useState("");

  // Handle mobile input change
  const handleMobileChange = (e) => {
    setMobile(e.target.value);
  };

  // Handle email input change
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  // Validate mobile input
  const validateMobile = async () => {
    try {
      await mobileValidationSchema.validate({ mobile });
      setMobileError(""); // Clear any previous error
      return true;
    } catch (err) {
      setMobileError(err.message); // Show error message
      return false;
    }
  };

  // Validate email input
  const validateEmail = async () => {
    try {
      await emailValidationSchema.validate({ email });
      setEmailError(""); // Clear any previous error
      return true;
    } catch (err) {
      setEmailError(err.message); // Show error message
      return false;
    }
  };

  // Handle form submission for mobile
  const handleMobileSubmit = async () => {
    const isValid = await validateMobile();
    if (isValid) {
      const values = { mobile };
      handleSubmitlink(values);
    }
  };

  // Handle form submission for email
  const handleEmailSubmit = async () => {
    const isValid = await validateEmail();
    if (isValid) {
      const values = { email };
      handleSubmitlink(values);
    }
  };

  return (
    <>
      <div
        alt="BgHills"
        className="h-[35vw] w-full relative md:block hidden"
        style={{
          backgroundImage: `url(${BgHills})`,
          backgroundSize: "cover",
          backgroundPosition: "bottom",
        }}
      >
        <div className="grid grid-cols-6 w-full h-[35vw] ">
          <div className=" col-span-2 relative">
            <img
              src={iphone}
              draggable={false}
              alt="iphone"
              className="absolute top-[-5vw] left-[2vw] h-[35vw] w-[28vw]"
            />
          </div>
          <div className=" col-span-4  h-[35vw] w-full">
            <div className="grid grid-rows-7 w-full h-full">
              <div className="row-span-1 items-center flex">
                <span className=" text-white font-bold text-[2.5vw] select-none">
                  Your all-in-one Booking app
                </span>
              </div>
              <div className="row-span-1 items-center flex">
                <span className=" text-white text-[1.3vw] ">
                  Book Buses anywhere in the world in just seconds. Get
                  real-time flight updates, travel info, exclusive deals, and
                  30% more Trip Coins only on the app!
                </span>
              </div>

              <div className="row-span-3 items-center flex">
                <div className="flex flex-col ">
                  <div className="flex">
                    <div
                      className={`cursor-pointer ${
                        modalshow === 2 ? "bg-[#B3C2D4]" : ""
                      } rounded-[1vw] w-[10vw] py-[0.5vw]`}
                      onClick={() => setModalShow(2)}
                    >
                      <div className="text-[1.4vw] text-white text-center">
                        E-Mail
                      </div>
                    </div>
                    <div
                      className={`cursor-pointer ${
                        modalshow === 1 ? "bg-[#B3C2D4]" : ""
                      } rounded-[1vw] w-[10vw] py-[0.5vw]`}
                      onClick={() => setModalShow(1)}
                    >
                      <p className="text-[1.4vw] text-white text-center">
                        Mobile
                      </p>
                    </div>
                  </div>

                  {/* <div>
                    {modalshow === 1 ? (
                      <Formik
                        initialValues={{
                          mobile: "",
                        }}
                        validationSchema={mobileValidationSchema}
                        onSubmit={(values, { resetForm, validateForm }) => {
                          handleSubmitlink(values);
                          console.log(values, "values");
                          resetForm();
                          validateForm();
                        }}
                        enableReinitialize={false}
                      >
                        {({
                          isSubmitting,
                          isValid,
                          handleChange,
                          handleSubmit,
                        }) => (
                          <Form onSubmit={handleSubmit}>
                            <div className="">
                              <div className="font-InterFont text-white text-[1.3vw] py-[1vw]">
                                Enter your mobile number to receive a text with
                                a link to download the app.
                              </div>
                              <div className="relative">
                                <button
                                  type="submit"
                                  className="absolute top-[0.37vw] right-[6.4vw] w-[8vw] h-[3vw] bg-white rounded-full text-[#1F4B7F] font-bold text-[1.2vw]"
                                >
                                  Submit
                                </button>
                                <Field
                                  type="text"
                                  name="mobile"
                                  autoComplete="off"
                                  placeholder="+91 Mobile Number"
                                  onChange={(e) => handleChange(e)}
                                  maxLength={10}
                                  onKeyDown={handleKeyDown}
                                  className="text-[1.2vw] h-[3.8vw] w-[36vw] bg-[#ffffff9a] rounded-[1vw] outline-none px-[1vw]"
                                />
                                <div>
                                  <ErrorMessage
                                    name="mobile"
                                    component="div"
                                    className="text-white text-[0.8vw] absolute top-[4vw] left-[0.7vw]"
                                  />
                                </div>
                              </div>
                            </div>
                          </Form>
                        )}
                      </Formik>
                    ) : (
                      <Formik
                        initialValues={{
                          email: "",
                        }}
                        validationSchema={emailValidationSchema}
                        onSubmit={(values, { resetForm, validateForm }) => {
                          handleSubmitlink(values);
                          console.log(values, "values");
                          resetForm();
                          validateForm();
                        }}
                        enableReinitialize={false}
                      >
                        {({
                          isSubmitting,
                          isValid,
                          handleChange,
                          handleSubmit,
                        }) => (
                          <Form onSubmit={handleSubmit}>
                            <div>
                              <div className="font-InterFont text-white text-[1.3vw] py-[1vw]">
                                Enter your Email to receive a text with a link
                                to download the app.
                              </div>
                              <div className="relative">
                                <button
                                  type="submit"
                                  className="absolute top-[0.37vw] right-[1.3vw] w-[8vw] h-[3vw] bg-white rounded-full text-[#1F4B7F] font-bold text-[1.2vw]"
                                >
                                  Submit
                                </button>
                                <Field
                                  type="text"
                                  name="email"
                                  autoComplete="off"
                                  placeholder="Email"
                                  onChange={(e) => handleChange(e)}
                                  className="text-[1.2vw] h-[3.8vw] w-[36vw] bg-[#ffffff9a] rounded-[1vw] outline-none px-[1vw]"
                                />
                                <div>
                                  <ErrorMessage
                                    name="email"
                                    component="div"
                                    className="text-white text-[0.8vw] absolute top-[4vw] left-[0.7vw]"
                                  />
                                </div>
                              </div>
                            </div>
                          </Form>
                        )}
                      </Formik>
                    )}
                  </div> */}

                  {modalshow === 1 ? (
                    // Mobile Form
                    <div className="">
                      <div className="font-InterFont text-white text-[1.3vw] py-[1vw]">
                        Enter your mobile number to receive a text with a link
                        to download the app.
                      </div>
                      <div className="relative w-fit">
                        <button
                          type="button"
                          onClick={handleMobileSubmit}
                          className="absolute top-[0.37vw] right-[1vw]  w-[8vw] h-[3vw] bg-white rounded-full text-[#1F4B7F] font-bold text-[1.2vw]"
                        >
                          Submit
                        </button>
                        <input
                          type="text"
                          value={mobile}
                          autoComplete="off"
                          onChange={handleMobileChange}
                          placeholder="+91 Mobile Number"
                          onKeyDown={handleKeyDown}
                          maxLength={10}
                          className="text-[1.2vw] h-[3.8vw] w-[36vw] bg-[#ffffff9a] rounded-[1vw] outline-none px-[1vw]"
                        />
                        {mobileError && (
                          <div className="text-white text-[0.8vw] absolute top-[4vw] left-[0.7vw]">
                            {mobileError}
                          </div>
                        )}
                      </div>
                    </div>
                  ) : (
                    //  Email Form
                    <div>
                      <div className="font-InterFont text-white text-[1.3vw] py-[1vw]">
                        Enter your Email to receive a text with a link to
                        download the app.
                      </div>
                      <div className="relative w-fit">
                        <button
                          type="button"
                          onClick={handleEmailSubmit}
                          className="absolute top-[0.37vw] right-[1vw] w-[8vw] h-[3vw] bg-white rounded-full text-[#1F4B7F] font-bold text-[1.2vw]"
                        >
                          Submit
                        </button>
                        <input
                          type="text"
                          value={email}
                          autoComplete="off"
                          onChange={handleEmailChange}
                          placeholder="Email"
                          className="text-[1.2vw] h-[3.8vw] w-[36vw] bg-[#ffffff9a] rounded-[1vw] outline-none px-[1vw]"
                        />
                        {emailError && (
                          <div className="text-white text-[0.8vw] absolute top-[4vw] left-[0.7vw]">
                            {emailError}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="row-span-2">
                <div className="flex gap-[5vw] py-[1vw]">
                  <div className="">
                    {/* <img
                      src={AppRating}
                      alt="AppRating"
                      className="w-[15vw] h-[2.5vw]"  
                    /> */}
                    {/* <Rate disabled allowHalf defaultValue={averageData.average_rating ? averageData.average_rating : 4.5} className="text-[2vw]"  /> */}
                    <Rate
                      disabled
                      allowHalf
                      defaultValue={3.6}
                      value={averageData?.average_rating}
                      className="home-rate text-[2.3vw]"
                    />
                    {console.log(
                      parseFloat(averageData?.average_rating, "avdssiuzdrs")
                    )}
                    <div className=" text-white font-InterFont text-[1.1vw] ">
                      <span className="font-semibold text-[1.2vw]">{`${averageData?.average_rating}/5`}</span>{" "}
                      based on{" "}
                      <span className="font-semibold text-[1.2vw]">
                        {`${averageData?.total_feedbacks}`}{" "}
                      </span>{" "}
                      reviews
                    </div>
                    {/* <div className=" text-white font-InterFont text-[1.1vw]">
                      Trusted by 5+ Crores Travellers
                    </div> */}
                  </div>
                  {/* <div>
                    <img src={Award} alt="Award" className="w-[15vw] h-[6vw]" />
                  </div> */}
                </div>
              </div>

              {/* </div> */}

              {/* <div className=" flex flex-rows gap-[5%] w-[65vw]">
                <div className=" ">
                  <Tabs>
                    <div className="flex flex-col ">
                      <TabList>
                        <Tab className="tab1 my-[2vh]">
                          <div className="text-2xl text-white">Mobile</div>
                        </Tab>
                        <Tab className="tab1 my-[2vh]">
                          <div className="text-2xl text-white">E-Mail</div>
                        </Tab>
                      </TabList>

                      <TabPanel>
                        <div className="flex flex-col gap-6">
                          <div className="font-InterFont text-white text-xl w-[37vw]">
                            Enter your phone number to receive a text with a
                            link to download the app.
                          </div>
                          <input
                            type="text"
                            className="inputbox   font-InterFont rounded-2xl  grid content-center  outline-none "
                            placeholder="   +91 Mobile Number"
                            style={{}}
                          />
                        </div>
                      </TabPanel>

                      <TabPanel>
                        <div className="flex flex-col gap-6">
                          <div className="font-InterFont text-white text-xl w-[37vw]">
                            Enter your Email to receive a text with a link to
                            download the app.
                          </div>
                          <input
                            type="email"
                            className="inputbox   font-InterFont rounded-2xl  grid content-center  outline-none "
                            placeholder="  Email"
                            style={{}}
                          />
                        </div>
                      </TabPanel>
                    </div>
                  </Tabs>
                </div>
                <div className="flex flex-col justify-center items-center ">
                  <div className="w-[0.1vw] h-[11vh] opacity-35 rounded-full bg-white"></div>
                  <div className="text-white text-2xl">or</div>
                  <div className="w-[0.1vw] h-[11vh] opacity-35 rounded-full bg-white"></div>
                </div>

                <div className=" grid grid-flow-row w-[15vw] gap-[10%] items-center">
                  <img src={GoogleStore} alt="GoogleStore" className=" " />
                  <img src={AppStore} alt="App store" className="" />
                </div>
              </div>

              <div className="flex flex-col">
                <div className="grid grid-flow-col w-[55%] gap-[20%] items-center">
                  <div>
                    <img src={AppRating} alt="AppRating" className="w-[90%]" />
                    <div className=" text-white font-InterFont text-lg">
                      4.6/5 based on 210260 reviews
                    </div>
                    <div className=" text-white font-InterFont text-lg">
                      Trusted by 5+ Crores Travellers
                    </div>
                  </div>
                  <img src={Award} alt="Award" className="w-[100%]" />
                </div>
              </div> */}
            </div>
          </div>
        </div>
        <img
          src={GoogleStore}
          alt="GoogleStore"
          draggable={false}
          className="absolute right-[2vw] bottom-[19vw] w-[15vw] h-[5vw]"
        />
        <img
          src={AppStore}
          draggable={false}
          alt="App store"
          className="absolute right-[2vw] bottom-[12vw] w-[15vw] h-[5vw]"
        />
        {/* <div className="flex flex-col justify-center items-center ">
          <div className="w-[0.1vw] h-[11vh] opacity-35 rounded-full bg-white"></div>
          <div className="text-white text-2xl">or</div>
          <div className="w-[0.1vw] h-[11vh] opacity-35 rounded-full bg-white"></div>
        </div> */}
      </div>
    </>
  );
}
