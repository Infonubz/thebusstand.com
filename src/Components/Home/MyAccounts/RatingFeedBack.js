import React, { useState } from "react";
import { Rate } from "antd";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import rating_img from "../../../assets/ratings_gif.gif";
import { FaStar } from "react-icons/fa";

export const RatingFeedBack = () => {
  const [value, setValue] = useState(0);

  const validationSchema = Yup.object({
    feedback: Yup.string()
      .required("Feedback is required")
      .min(10, "Feedback must be at least 10 characters")
      .max(300, "Feedback must be less than 300 characters"),
  });

  const getColorForValue = (value) => {
    if (value <= 0) return "#FF0000";
    if (value <= 1) return "#FF0000";
    if (value <= 2) return "#FFA500";
    if (value <= 3) return "#FFA500";
    if (value <= 4) return "#008000";
    return "#008000";
  };

  const desc = ["Terrible", "Bad", "Okay", "Good", "Excellent"];

  return (
    <>
      <Formik
        initialValues={{
          feedback: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log("Form values:", values);
        }}
        enableReinitialize
      >
        {({ isSubmitting, isValid, handleSubmit, errors, touched }) => (
          <Form onSubmit={handleSubmit}>
            {value > 0 ? (
              <div>
                <div className="overflow-hidden w-full h-[34.25vw] rounded-lg py-[1.5vw] px-[2.5vw]">
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
              </div>
            ) : (
              <div>
                <div className="relative overflow-hidden w-full h-[22.5vw] rounded-lg ">
                  <img
                    src={rating_img}
                    className="absolute top-0 left-0 w-full h-full object-cover"
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
                  <div className="flex flex-col gap-y-[1vw]">
                    <div className="flex justify-between py-[2vw] gap-x-[.5vw]">
                      <div>
                        <input
                          type="text"
                          placeholder="Enter Name"
                          className="p-2 border border-gray-300 pl-[1vw] rounded-2xl placeholder:text-[#1F487C] outline-none w-full bg-[#D0E5FF4D] text-[#1F487C] h-[3vw]"
                        />
                      </div>
                      <div>
                        <input
                          type="text"
                          placeholder="Enter Occupation"
                          className="p-2 border border-gray-300 pl-[1vw]  rounded-2xl placeholder:text-[#1F487C]  outline-none w-full bg-[#D0E5FF4D] text-[#1F487C] h-[3vw]"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="flex justify-between items-center  pb-[2vw] px-[2vw]">
              {value > 0 ? (
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
              <div className="">
                <button
                  type="submit"
                  className="bg-[#1F487C] text-[1.2vw] text-white font-bold rounded-full w-[13vw] h-[2.5vw]"
                >
                  Submit
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};
