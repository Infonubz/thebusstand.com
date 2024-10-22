import React, { useEffect, useState } from "react";
import BgHills from "../../assets/BgHills.png";
import AppRating from "../../assets/App rating.png";
import iphone from "../../assets/iPhone 13 Pro.png";
import Award from "../../assets/Award.png";
import AppStore from "../../assets/AppStore.png";
import GoogleStore from "../../assets/GoogleStore.png";
import * as Yup from "yup";
// import { App } from "antd";
// import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "../../Components/Home/Mobile.css";
// import { Rate } from "antd";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { sendAppLink } from "../../Api/Home/Home";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { Rate } from "antd";
import "../../../src/App.css";
import { GetAverageRating } from "../../Api/MyAccounts/RatingFeedBack";

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  // mobile: Yup.string()
  //   .matches(/^\+91\d{10}$/, 'Invalid mobile number')
  //   .required('Mobile number is required'),
});

const MobileApp = () => {
  const [modalshow, setModalShow] = useState(false);
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
              alt="iphone"
              className="absolute top-[-5vw] left-[2vw] h-[35vw] w-[28vw]"
            />
          </div>
          <div className=" col-span-4  h-[35vw] w-full">
            <div className="grid grid-rows-7 w-full h-full">
              <div className="row-span-1 items-center flex">
                <span className=" text-white font-bold text-[2.5vw]">
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
                      className={` cursor-pointer ${
                        modalshow ? "bg-[#B3C2D4]" : ""
                      } rounded-[1vw] w-[10vw] py-[0.5vw]`}
                      onClick={() => setModalShow(!modalshow)}
                    >
                      <p className="text-[1.4vw] text-white text-center">
                        Mobile
                      </p>
                    </div>
                    <div
                      className={` cursor-pointer ${
                        modalshow ? "" : "bg-[#B3C2D4]"
                      } rounded-[1vw] w-[10vw] py-[0.5vw]`}
                      onClick={() => setModalShow(!modalshow)}
                    >
                      <div className="text-[1.4vw] text-white text-center">
                        E-Mail
                      </div>
                    </div>
                  </div>
                  <div>
                    <Formik
                      initialValues={{
                        email: "",
                        mobile: "",
                      }}
                      validationSchema={validationSchema}
                      onSubmit={(values, { resetForm }) => {
                        handleSubmitlink(values);
                        console.log(values, "values");
                        resetForm();
                      }}
                      enableReinitialize={false}
                    >
                      {({
                        isSubmitting,
                        isValid,
                        handleChange,
                        handleSubmit,
                      }) => (
                        <Form
                          onSubmit={handleSubmit}
                          validateOnChange={false} // Disables validation onChange
                          validateOnBlur={false} // Disables validation onBlur
                        >
                          {modalshow ? (
                            <div className="">
                              <div className="font-InterFont text-white text-[1.3vw] py-[1vw]">
                                Enter your phone number to receive a text with a
                                link to download the app.
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
                                  placeholder="+91 Mobile Number"
                                  onChange={(e) => handleChange(e)}
                                  className="text-[1.2vw] h-[3.8vw] w-[36vw] bg-[#ffffff9a] rounded-[1vw] outline-none px-[1vw]"
                                />
                                <div>
                                  <ErrorMessage
                                    name="mobile"
                                    component="div"
                                    className="text-white text-[0.8vw] absolute top-[3vw] left-[1vw]"
                                  />
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div className="">
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
                                  placeholder="Email"
                                  onChange={(e) => handleChange(e)}
                                  className="text-[1.2vw] h-[3.8vw] w-[36vw] bg-[#ffffff9a] rounded-[1vw] outline-none px-[1vw]"
                                />{" "}
                                <div>
                                  <ErrorMessage
                                    name="email"
                                    component="div"
                                    className="text-white text-[0.8vw] absolute top-[4vw] left-[0.7vw]"
                                  />
                                </div>
                              </div>
                            </div>
                          )}
                        </Form>
                      )}
                    </Formik>
                  </div>
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
                      className="text-[2.3vw]"
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
          className="absolute right-[2vw] bottom-[19vw] w-[15vw] h-[5vw]"
        />
        <img
          src={AppStore}
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
};

export default MobileApp;
