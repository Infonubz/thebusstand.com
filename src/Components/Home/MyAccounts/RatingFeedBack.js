import React, { useEffect, useState } from "react";
import { Rate, Select } from "antd";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import rating_img from "../../../assets/ratings_gif.gif";
import { FaStar } from "react-icons/fa";
import {
  GetFeedbackById,
  PostFeedBack,
} from "../../../Api/MyAccounts/RatingFeedBack";
const { Option } = Select;

export const RatingFeedBack = ({ setRatingModal }) => {
  const [value, setValue] = useState(0);

  const [nameValue, setNameValue] = useState("");
  const [occValue, setOccValue] = useState("");
  const [error, setError] = useState(false);
  const [required, setRequired] = useState(false);
  const [getValues, setGetValues] = useState("");

  const validationSchema = Yup.object({
    feedback: Yup.string()
      .required("Feedback is required")
      .min(10, "Feedback must be at least 10 characters")
      .max(300, "Feedback must be less than 300 characters"),
  });

  console.log("errororororor", error, nameValue, occValue, value);
  const handleClick = () => {
    if (
      value > 0 &&
      (nameValue || getValues.user_name) &&
      (occValue || getValues.occupation)
    ) {
      console.log("im printing");
      setError(true);
      setRequired(false);
      if (getValues) {
        setNameValue(getValues.user_name);
        setOccValue(getValues.occupation);
      }
    } else {
      setError(false);
      setRequired(true);
      console.log("im  not printing");
    }
  };

  const getColorForValue = (value) => {
    if (value <= 0) return "#FF0000";
    if (value <= 1) return "#FF0000";
    if (value <= 2) return "#FFA500";
    if (value <= 3) return "#FFA500";
    if (value <= 4) return "#008000";
    return "#008000";
  };

  const desc = ["Terrible", "Bad", "Okay", "Good", "Excellent"];

  const handleSubmit = (feed) => {
    console.log("iam callinffgggg", value, nameValue, feed.feedback, occValue);
    PostFeedBack(value, nameValue, feed.feedback, occValue);
    setRatingModal(false);
  };

  useEffect(() => {
    const feedback = async () => {
      const response = await GetFeedbackById();
      if (response) {
        setGetValues(response);
        console.log(response, "lszfmjdsfksdhgj");
      }
    };
    feedback();
  }, []);

  return (
    <>
      <Formik
        initialValues={{
          feedback: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ isSubmitting, isValid, handleSubmit, errors, touched }) => (
          <Form onSubmit={handleSubmit}>
            {error ? (
              <div>
                <div className="overflow-hidden w-full h-[34.25vw] rounded-lg py-[1.5vw] px-[2.5vw] over">
                  <span className="text-[#1F487C] font-bold text-[1.5vw]">
                    Enjoy our Website?
                  </span>
                  <div className="py-[1vw]">
                    <p className="text-[1.25vw] text-[#1F487C] font-semibold text-center">
                      Rate your Experience with the TBS App
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="flex"></div>
                    {/* <Rate
                                            className='custom-rate'
                                            value={value}
                                            style={{
                                                fontSize: '3vw',
                                                color: getColorForValue(value), // Dynamically set color
                                            }}
                                            disabled
                                        /> */}

                    <div className="flex justify-center gap-x-[1vw] py-[2vw]">
                      <span>
                        {value == 1 ? (
                          <span className="flex justify-center gap-x-[1vw]">
                            <FaStar
                              color={getColorForValue(value)}
                              size="2.75vw"
                            />
                          </span>
                        ) : value == 2 ? (
                          <span className="flex justify-center gap-x-[1vw]">
                            <FaStar
                              color={getColorForValue(value)}
                              size="2.75vw"
                            />
                            <FaStar
                              color={getColorForValue(value)}
                              size="2.75vw"
                            />
                          </span>
                        ) : value == 3 ? (
                          <span className="flex justify-center gap-x-[1vw] ">
                            <FaStar
                              color={getColorForValue(value)}
                              size="2.75vw"
                            />
                            <FaStar
                              color={getColorForValue(value)}
                              size="2.75vw"
                            />
                            <FaStar
                              color={getColorForValue(value)}
                              size="2.75vw"
                            />
                          </span>
                        ) : value == 4 ? (
                          <span className="flex justify-center gap-x-[1vw]">
                            <FaStar
                              color={getColorForValue(value)}
                              size="2.75vw"
                            />
                            <FaStar
                              color={getColorForValue(value)}
                              size="2.75vw"
                            />
                            <FaStar
                              color={getColorForValue(value)}
                              size="2.75vw"
                            />
                            <FaStar
                              color={getColorForValue(value)}
                              size="2.75vw"
                            />
                          </span>
                        ) : (
                          <span className="flex justify-center gap-x-[1vw]">
                            <FaStar
                              color={getColorForValue(value)}
                              size="2.75vw"
                            />
                            <FaStar
                              color={getColorForValue(value)}
                              size="2.75vw"
                            />
                            <FaStar
                              color={getColorForValue(value)}
                              size="2.75vw"
                            />
                            <FaStar
                              color={getColorForValue(value)}
                              size="2.75vw"
                            />
                            <FaStar
                              color={getColorForValue(value)}
                              size="2.75vw"
                            />
                          </span>
                        )}
                      </span>
                      <span className="flex gap-x-[.6vw] items-center">
                        <span
                          style={{
                            color: getColorForValue(value),
                            fontSize: "1.5vw",
                          }}
                        >
                          {value}
                        </span>
                        <span
                          style={{
                            color: getColorForValue(value),
                            fontSize: "1.5vw",
                          }}
                        >
                          {" "}
                          -{" "}
                        </span>
                        <span
                          style={{
                            color: getColorForValue(value),
                            fontSize: "1.5vw",
                          }}
                        >
                          {desc[Math.floor(value) - 1]}
                        </span>
                      </span>
                    </div>

                    <div>
                      <div className="relative">
                        <Field
                          as="textarea"
                          name="feedback"
                          placeholder="Write your feedback  :)"
                          className="custom-placeholders"
                          style={{
                            backgroundColor: "#D0E5FF4D",
                            color: "#1F487C",
                            borderWidth: "0.1vw",
                            borderColor: "#1F487C",
                            borderRadius: "0.5vw",
                            height: "15vw",
                            width: "30vw",
                            padding: "0.75vw 2vw",
                            fontSize: "1vw",
                            outline: "none",
                          }}
                        />
                        <ErrorMessage
                          name="feedback"
                          component="div"
                          className="text-red-500 text-[0.8vw] absolute bottom-[-1.5vw] left-[1.5vw]"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className=" flex justify-end px-[2vw] gap-x-[1vw]">
                  <button
                    onClick={() => setError(false)}
                    className="bg-[#1F487C] text-[1.2vw] text-white font-bold rounded-full w-[6vw] h-[2.5vw]"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="bg-[#1F487C] text-[1.2vw] text-white font-bold rounded-full w-[13vw] h-[2.5vw]"
                  >
                    Submit
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <div className="relative overflow-hidden w-full h-[19vw] rounded-lg ">
                  <img
                    src={rating_img}
                    className="absolute top-0 left-0 w-full h-[19vw] object-cover"
                    alt="Rating Graphic"
                  />
                  <span className="text-[#1F487C] font-bold text-[1.5vw] absolute top-[1.5vw] left-[2vw]">
                    Enjoy our Website?
                  </span>
                </div>
                <div className="px-[2vw]">
                  <div className="flex flex-col items-center justify-center">
                    <span className="text-[1.5vw] text-[#1F487C] font-bold">
                      Rate your experience with thebusstand.com
                    </span>
                    <span className="text-[1.5vw] text-[#1F487C] font-bold">
                      (TBS)
                    </span>
                  </div>
                  <div className="flex justify-center items-center pt-[2vw] relative  pb-[.7vw] px-[2vw]">
                    {error ? (
                      <div className="col-span-1"></div>
                    ) : (
                      <div>
                        <Rate
                          className="custom-rate"
                          onChange={setValue}
                          value={value}
                          style={{
                            fontSize: "3vw",
                            color: getColorForValue(value),
                          }}
                        />
                      </div>
                    )}
                    {required === true ? (
                      <div className="text-red-800 ml-[.5vw] text-[.8vw] bottom-[-.5vw] absolute">
                        Rating is required
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="flex flex-col gap-y-[1vw]">
                    <div className="flex justify-between py-[2vw] gap-x-[.5vw]">
                      <div className="relative">
                        <input
                          type="text"
                          //   name="name"
                          value={getValues.user_name}
                          placeholder="Enter Name"
                          onChange={(e) => {
                            // Call Formik's handleChange function
                            setNameValue(e.target.value);
                          }}
                          className="p-2 border border-gray-300 pl-[1vw] rounded-[1.5vw] placeholder:text-[#1F487C] outline-none w-full bg-[#D0E5FF4D] text-[#1F487C] h-[3vw]"
                        />

                        {required === true ? (
                          <div className="text-red-800 ml-[.5vw] text-[.8vw] absolute">
                            name is required
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                      {getValues ? (
                        <span>
                          {" "}
                          <input
                            type="text"
                            //   name="name"
                            onChange={(e) => setOccValue(e.target.value)}
                            value={getValues.occupation}
                            // placeholder=""

                            className="p-2 border border-gray-300 pl-[1vw] rounded-[1.5vw] placeholder:text-[#1F487C] outline-none w-full bg-[#D0E5FF4D] text-[#1F487C] h-[3vw]"
                          />
                        </span>
                      ) : (
                        <span>
                          <div className="relative">
                            {/* <input
                        type="text"
                        //   name="occupation"
                          placeholder="Enter Occupation"
                          onChange={(e) => {
                            // Call Formik's handleChange function
                            setOccValue(e.target.value);
                          }}
                          className="p-2 border border-gray-300 pl-[1vw] rounded-2xl placeholder:text-[#1F487C] outline-none w-full bg-[#D0E5FF4D] text-[#1F487C] h-[3vw]"
                        /> */}
                            <Select
                              placeholder="Select Occupation"
                              onChange={(value) => setOccValue(value)}
                              className="w-[14.5vw] h-[3vw] border border-gray-300   bg-[#D0E5FF4D] text-[#1F487C]"
                              style={{
                                borderRadius: "6vw",
                                backgroundColor: "black",
                                color: "#1F487C",
                              }}
                            >
                              <Option value="Business">Business</Option>
                              <Option value="General Public">
                                General Public
                              </Option>
                              <Option value="Physically Challenged">
                                Physically Challenged
                              </Option>
                              <Option value="Pilgrim Traveler">
                                Pilgrim Traveler
                              </Option>
                              <Option value="Senior Citizen">
                                Senior Citizen
                              </Option>
                              <Option value="Student">Student</Option>
                              <Option value="Tourist">Tourist</Option>
                              <Option value="Corporate Traveler">
                                Corporate Traveler
                              </Option>
                            </Select>
                            {required === true ? (
                              <div className="text-red-800 ml-[.5vw] text-[.8vw] absolute">
                                Occupation is required
                              </div>
                            ) : (
                              ""
                            )}
                          </div>{" "}
                        </span>
                      )}
                      {/* <div className="relative">
                        <input
                        type="text"
                        //   name="occupation"
                          placeholder="Enter Occupation"
                          onChange={(e) => {
                            // Call Formik's handleChange function
                            setOccValue(e.target.value);
                          }}
                          className="p-2 border border-gray-300 pl-[1vw] rounded-2xl placeholder:text-[#1F487C] outline-none w-full bg-[#D0E5FF4D] text-[#1F487C] h-[3vw]"
                        />
                         <Select
                          placeholder="Select Occupation"
                          onChange={(value) => setOccValue(value)}
                          className="w-[14.5vw] h-[3vw] border border-gray-300   bg-[#D0E5FF4D] text-[#1F487C]"
                          style={{
                            borderRadius: "6vw",
                            backgroundColor: "black",
                            color: "#1F487C",
                          }}
                        >
                          <Option value="General Public">General Public</Option>
                          <Option value="Physically Challenged">Physically Challenged</Option>
                          <Option value="Pilgrim Travelers">Pilgrim Travelers</Option>
                          <Option value="Senior Citizens">Senior Citizens</Option>
                          <Option value="Students">Students</Option>
                          <Option value="Tourist">Tourist</Option>
                          <Option value="Corporate Travelers">Corporate Travelers</Option>
                        </Select>
                       {required === true ? <div  className="text-red-800 ml-[.5vw] text-[.8vw] absolute">Occupation is required</div> : ""}
                      </div> */}
                    </div>
                  </div>
                </div>
                <div className=" flex justify-end px-[2vw]">
                  <button
                    type="button"
                    onClick={handleClick}
                    className="bg-[#1F487C] text-[1.2vw] text-white font-bold rounded-full w-[13vw] h-[2.5vw]"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </Form>
        )}
      </Formik>
    </>
  );
};
