import React, { useState } from "react";
import { Rate } from "antd";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import rating_img from "../../../assets/ratings_gif.gif";
import { FaStar } from "react-icons/fa";
import ColorCodes from "../Common/ColorCodes";
import { useSelector } from "react-redux";

export const RatingFeedBack = () => {
  const [value, setValue] = useState(0);

  const validationSchema = Yup.object({
    feedback: Yup.string()
      .required("Feedback is required")
      .min(10, "Feedback must be at least 10 characters")
      .max(300, "Feedback must be less than 300 characters"),
  });

  const getColorForValue = (value) => {
    if (value <= 0) return "#FFDD2B";
    if (value <= 1) return "#FF2A2A";
    if (value <= 2) return "#FF4A22";
    if (value <= 3) return "#F3880A";
    if (value <= 4) return "#FFA800";
    return "#FFDD2B";
  };

  const desc = ["Terrible", "Bad", "Okay", "Good", "Excellent"];
  //   const colors = ColorCodes();
  const colors = useSelector((state) => state.themecolors[0]);
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
                  <span
                    className={`text-[${colors.primary}] font-bold text-[1.5vw]`}
                  >
                    Enjoy our Website?
                  </span>
                  <div className="py-[1vw]">
                    <p
                      className={`text-[1.25vw] text-[${colors.primary}] font-semibold text-center`}
                    >
                      Rate your Experience with the TBS App
                    </p>
                  </div>
                  <div className="text-center">
                    <Rate
                      className="custom-rate"
                      value={value}
                      style={{
                        fontSize: "2.75vw",
                        color: getColorForValue(value), // Dynamically set color
                      }}
                      disabled
                    />
                    <div className="flex gap-[1vw] items-center justify-center py-[1vw]">
                      <span style={{ color: getColorForValue(value) }}>
                        <FaStar color={getColorForValue(value)} size="2.75vw" />
                      </span>
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
                            color: `${colors.primary}`,
                            borderWidth: "0.1vw",
                            borderColor: `${colors.primary}`,
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
                <div className="relative overflow-hidden w-full h-[22.5vw] rounded-md ">
                  <img
                    src={rating_img}
                    className="absolute top-0 left-0 w-full h-full object-cover"
                    alt="Rating Graphic"
                  />
                  <span
                    className={`text-[${colors.primary}] font-bold text-[1.5vw] absolute top-[1.5vw] left-[2vw]`}
                  >
                    Enjoy our Website?
                  </span>
                </div>
                <div className="px-[2vw]">
                  <div className="flex flex-col items-center justify-center">
                    <span
                      className={`text-[1.5vw] text-[${colors.primary}] font-bold`}
                    >
                      Rate your experience with thebusstand.com
                    </span>
                    <span
                      className={`text-[1.5vw] text-[${colors.primary}] font-bold`}
                    >
                      (TBS)
                    </span>
                  </div>
                  <div className="flex flex-col gap-y-[1vw]">
                    <div className="grid grid-cols-2 gap-[0.5vw] py-[2vw]">
                      <div>
                        <input
                          type="text"
                          placeholder="Enter Name"
                          className={`p-2 border border-gray-300 rounded-2xl outline-none w-full bg-[#D0E5FF4D] text-[${colors.primary}] h-[3vw] text-[1.2vw]`}
                        />
                      </div>
                      <div>
                        <input
                          type="text"
                          placeholder="Enter Occupation"
                          className={`p-2 border border-gray-300 rounded-2xl outline-none w-full bg-[#D0E5FF4D] text-[${colors.primary}] h-[3vw] text-[1.2vw]`}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 items-center pb-[2vw] px-[1vw]">
              {value > 0 ? (
                <div className="col-span-1"></div>
              ) : (
                <div>
                  <Rate
                    className="custom-rate"
                    onChange={setValue}
                    value={value}
                    style={{
                      fontSize: "2.5vw",
                      color: getColorForValue(value),
                    }}
                  />
                </div>
              )}
              <div className="flex justify-center">
                <button
                  type="submit"
                  className={`bg-[${colors.primary}] text-[1.2vw] text-white font-bold rounded-full w-3/4 h-[2.5vw]`}
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
