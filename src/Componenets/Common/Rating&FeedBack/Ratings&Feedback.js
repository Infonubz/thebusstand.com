import React, { useEffect, useState } from "react";
import { ConfigProvider, Rate, Select } from "antd";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import rating_img from "../../../Assets/CommonImages/ratings_gif.gif";
import { FaStar } from "react-icons/fa";

import { DownOutlined, UpOutlined } from "@ant-design/icons";
import { RiArrowDropDownFill } from "react-icons/ri";
import { GetFeedbackById, PostFeedBack } from "../../../Api-TBS/Dashboard/Dashboard";

const { Option } = Select;

export const RatingFeedBack = ({ setRatingModal }) => {
  const validationSchema = Yup.object({
    feedback: Yup.string()
      .required("Feedback is required")
      .min(10, "Feedback must be at least 10 characters")
      .max(300, "Feedback must be less than 300 characters"),
  });

  const [value, setValue] = useState(0);

  const [nameValue, setNameValue] = useState("");
  const [occValue, setOccValue] = useState("");
  const [error, setError] = useState(false);
  const [required, setRequired] = useState({
    name: false,
    occupation: false,
    rating: false,
  });

  const [getValues, setGetValues] = useState("");

  const handleValueChange = () => { };

  const handleNamelength = (value) => {
    const nameText = value.target.value;

    if (nameText?.length > 40) {
      setRequired((prevRequired) => ({
        ...prevRequired,
        name: true,
      }));
    } else {
      setRequired((prevRequired) => ({
        ...prevRequired,
        name: false,
      }));
    }
  };

  const handleClick = () => {
    let isValid = true;
    const newRequired = { ...required };

    if (value <= 0) {
      isValid = false;
      newRequired.rating = true;
    }

    if (
      !(nameValue || getValues.user_name) &&
      (nameValue?.length || getValues?.user_name?.length > 40)
    ) {
      isValid = false;
      newRequired.name = true;
    }

    if (!(occValue || getValues.occupation)) {
      isValid = false;
      newRequired.occupation = true;
    }

    if (isValid && Object.values(required).every((value) => value === false)) {

      setError(true);
      setRequired(newRequired);

      if (getValues) {
        setNameValue(getValues.user_name);
        setOccValue(getValues.occupation);
      }
    } else {

      setError(false);
      setRequired(newRequired);
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

    PostFeedBack(value, nameValue, feed.feedback, occValue);
    setRatingModal(false);
  };

  useEffect(() => {
    const feedback = async () => {
      const response = await GetFeedbackById();
      if (response) {
        setGetValues(response);
      }
    };
    feedback();
  }, []);

  return (
    <>
      <div className="md:h-[40vw] h-[105vw]">
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
                  <div className="overflow-hidden w-full rounded-lg md:py-[1vw] py-[2.5vw] px-[2.5vw] h-[32.5vw]">
                    <span className="text-[#1F487C] font-bold md:text-[1.5vw]">
                      Enjoying our Website?
                    </span>
                    <div className="md:py-[1vw] py-[2.5vw]">
                      <p className="md:text-[1.25vw] text-[4vw] text-[#1F487C] font-semibold text-center">
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

                      <div className="flex items-center justify-center md:gap-x-[1vw] gap-x-[2.5vw] py-[2vw]">
                        <div className="md:block hidden">
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
                        </div>
                        <div className="md:hidden block">
                          <span className="flex items-center justify-center">
                            {value == 1 ? (
                              <span className="flex items-center justify-center gap-x-[1vw]">
                                <FaStar
                                  color={getColorForValue(value)}
                                  size="6.5vw"
                                />
                              </span>
                            ) : value == 2 ? (
                              <span className="flex items-center justify-center gap-x-[1vw]">
                                <FaStar
                                  color={getColorForValue(value)}
                                  size="6.5vw"
                                />
                                <FaStar
                                  color={getColorForValue(value)}
                                  size="6.5vw"
                                />
                              </span>
                            ) : value == 3 ? (
                              <span className="flex  items-center justify-center gap-x-[1vw] ">
                                <FaStar
                                  color={getColorForValue(value)}
                                  size="6.5vw"
                                />
                                <FaStar
                                  color={getColorForValue(value)}
                                  size="6.5vw"
                                />
                                <FaStar
                                  color={getColorForValue(value)}
                                  size="6.5vw"
                                />
                              </span>
                            ) : value == 4 ? (
                              <span className="flex items-center justify-center gap-x-[1vw]">
                                <FaStar
                                  color={getColorForValue(value)}
                                  size="6.5vw"
                                />
                                <FaStar
                                  color={getColorForValue(value)}
                                  size="6.5vw"
                                />
                                <FaStar
                                  color={getColorForValue(value)}
                                  size="6.5vw"
                                />
                                <FaStar
                                  color={getColorForValue(value)}
                                  size="6.5vw"
                                />
                              </span>
                            ) : (
                              <span className="flex  items-center justify-center gap-x-[1vw]">
                                <FaStar
                                  color={getColorForValue(value)}
                                  size="6.5vw"
                                />
                                <FaStar
                                  color={getColorForValue(value)}
                                  size="6.5vw"
                                />
                                <FaStar
                                  color={getColorForValue(value)}
                                  size="6.5vw"
                                />
                                <FaStar
                                  color={getColorForValue(value)}
                                  size="6.5vw"
                                />
                                <FaStar
                                  color={getColorForValue(value)}
                                  size="6.5vw"
                                />
                              </span>
                            )}
                          </span>
                        </div>
                        <span className="flex gap-x-[.6vw] items-center justify-center">
                          <span
                            style={{
                              color: getColorForValue(value),
                              // fontSize: "1.5vw",
                            }}
                            className="text-[6vw] md:text-[1.5vw]"
                          >
                            {value}
                          </span>
                          <span
                            style={{
                              color: getColorForValue(value),
                              // fontSize: "1.5vw",
                            }}
                            className="text-[6vw] md:text-[1.5vw]"
                          >
                            {" "}
                            -{" "}
                          </span>
                          <span
                            style={{
                              color: getColorForValue(value),
                              // fontSize: "1.5vw",
                            }}
                            className="text-[5vw] md:text-[1.5vw]"
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
                            className="custom-placeholders md:px-[2vw] px-[4.5vw] py-[2vw] md:py-[0.75vw] md:h-[17vw] h-[50vw] w-full md:w-[30vw] md:text-[1vw] text-[3.5vw] text-[#1F487C] bg-[#D0E5FF4D] md:border-[0.1vw] border-[0.5vw] border-[#1F487C] md:rounded-[0.5vw] rounded-[1.2vw] outline-none resize-none"
                          />
                          <ErrorMessage
                            name="feedback"
                            component="div"
                            className="text-red-500 md:text-[0.8vw] text-[2.75vw] absolute md:bottom-[-0.85vw] bottom-[-3.5vw] left-[1.5vw]"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className=" flex justify-end py-[2vw] px-[2vw] gap-x-[1vw] md:mt-0 mt-[4vw]">
                    <button
                      onClick={() => setError(false)}
                      className="bg-[#1F487C] md:text-[1.2vw] text-[3.2vw] text-white font-bold rounded-full md:w-[6vw] w-[15vw] md:h-[2.5vw] h-[6vw]"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      className="bg-[#1F487C] md:text-[1.2vw] text-[3.2vw] text-white font-bold rounded-full md:w-[13vw] w-[26vw] md:h-[2.5vw] h-[6vw]"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="relative overflow-hidden w-full md:h-[19vw] h-[46.5vw]  md:rounded-lg ">
                    <img
                      src={rating_img}
                      className="absolute top-0 left-0 w-full md:h-[19vw] h-[46.5vw] object-cover"
                      alt="Rating Graphic"
                    />
                    <span className="text-[#1F487C] font-bold md:text-[1.5vw] text-[5vw] absolute md:top-[1.5vw] top-[1.5vw] left-[2vw]">
                      Enjoying our Website?
                    </span>
                  </div>
                  <div className="px-[1vw]">
                    <div className="flex flex-col items-center justify-center">
                      <span className="md:text-[1.5vw] text-[3.5vw] text-[#1F487C] font-bold">
                        Rate your experience with thebusstand.com
                      </span>
                      <span className="md:text-[1.5vw] text-[3.5vw] text-[#1F487C] font-bold">
                        (TBS)
                      </span>
                    </div>
                    <div className="flex justify-center items-center pt-[1vw] relative md:pb-[1.5vw] pb-[4.5vw] px-[2vw]">
                      {error ? (
                        <div className="col-span-1"></div>
                      ) : (
                        <>
                          <div className="md:block hidden">
                            <Rate
                              className="custom-rate"
                              onChange={(newValue) => {
                                setRequired((prevRequired) => ({
                                  ...prevRequired,
                                  rating: false,
                                }));
                                setValue(newValue);
                              }}
                              value={value}
                              style={{
                                fontSize: "3vw",
                                color: getColorForValue(value),
                              }}
                            />
                          </div>
                          <div className="md:hidden block">
                            <Rate
                              className="custom-rate"
                              onChange={(newValue) => {
                                setRequired((prevRequired) => ({
                                  ...prevRequired,
                                  rating: false,
                                }));
                                setValue(newValue);
                              }}
                              value={value}
                              style={{
                                fontSize: "8vw",
                                color: getColorForValue(value),
                              }}
                            />
                          </div>
                        </>
                      )}

                      {required.rating && (
                        <div className="text-red-500 ml-[0.5vw] md:text-[0.8vw] text-[2.5vw] bottom-[0.5vw] absolute">
                          Rating is required
                        </div>
                      )}
                    </div>


                    <div className="md:grid md:grid-cols-5 gap-x-[1.5vw] grid md:grid-rows-none grid-rows-2 gap-y-[2vw]">
                      <div className="relative md:col-span-3">
                        <input
                          value={getValues.user_name || nameValue}
                          placeholder="Enter Name"
                          autoComplete="off"
                          disabled={getValues?.user_name ? true : false}
                          maxLength={41}
                          onChange={(e) => {
                            handleNamelength(e);
                            setNameValue(e.target.value); // Update the name value
                            // setRequired((prevRequired) => ({
                            //   ...prevRequired,
                            //   name: false,
                            // }));
                          }}
                          className={`border ${getValues.user_name ? "cursor-not-allowed" : ""
                            } placeholder:text-[3.5vw] md:placeholder:text-[1.2vw] md:text-[1vw] text-[3.4vw] border-gray-300 px-[2vw] md:px-[0.5vw] md:rounded-[0.35vw] rounded-[1.5vw] placeholder:text-[#1F487C] outline-none w-full text-[#1F487C] md:h-[3vw] h-[7vw] resize-none overflow-x-auto scrollbar-thin scrollbar-thumb-[#1F487C] scrollbar-track-[#D0E5FF4D]`}
                        />
                        {required.name && (
                          <div className="text-red-500 ml-[.5vw]  md:text-[0.8vw] text-[2.5vw] absolute">
                            Name is required
                          </div>
                        )}
                      </div>
                      <div className="relative md:col-span-2">
                        <div className="md:block hidden">
                          <ConfigProvider
                            theme={{
                              components: {
                                Select: {
                                  activeBorderColor: 'rgba(0,0,0,0.25)',
                                  multipleItemColorDisabled: 'rgba(0,0,0,0.25)',
                                  hoverBorderColor: 'rgba(0,0,0,0.25)',
                                  activeOutlineColor: 'rgba(0,0,0,0)'
                                }
                              },
                              token: {
                                colorText: '#1F487C'
                              }
                            }}
                          >
                            <Select
                              placeholder="Select Occupation"
                              onChange={(value) => {
                                setOccValue(value);
                                setRequired((prevRequired) => ({
                                  ...prevRequired,
                                  occupation: false,
                                }));
                              }}
                              value={getValues.occupation || occValue}
                              disabled={getValues?.occupation ? true : false}
                              className="w-full h-[3vw] text-[#1F487C] rounded-2xl text-[1vw] mt-0"
                            // suffixIcon={
                            //   <span className="absolute top-[-1vw] ">
                            //     <RiArrowDropDownFill color="#AFAFAF" size={"3vw"} />
                            //   </span>
                            // }
                            >
                              <Option value="" disabled className="text-gray-200">
                                Select Occupation
                              </Option>
                              <Option value="Business">Business</Option>
                              <Option value="General Public">General Public</Option>
                              <Option value="Physically Challenged">Physically Challenged</Option>
                              <Option value="Pilgrim Traveler">Pilgrim Traveler</Option>
                              <Option value="Senior Citizen">Senior Citizen</Option>
                              <Option value="Student">Student</Option>
                              <Option value="Tourist">Tourist</Option>
                              <Option value="Corporate Traveler">Corporate Traveler</Option>
                            </Select>
                          </ConfigProvider>
                        </div>
                        <div className="md:hidden block">
                          <ConfigProvider
                            theme={{
                              components: {
                                Select: {
                                  activeBorderColor: 'rgba(0,0,0,0.25)',
                                  multipleItemColorDisabled: 'rgba(0,0,0,0.25)',
                                  hoverBorderColor: 'rgba(0,0,0,0.25)',
                                  activeOutlineColor: 'rgba(0,0,0,0)'
                                }
                              },
                              token: {
                                colorText: '#1F487C'
                              }
                            }}
                          >
                            <Select
                              placeholder="Select Occupation"
                              onChange={(value) => {
                                setOccValue(value);
                                setRequired((prevRequired) => ({
                                  ...prevRequired,
                                  occupation: false,
                                }));
                              }}
                              value={getValues.occupation || occValue}
                              disabled={getValues?.occupation ? true : false}
                              className="w-full h-[7vw] text-[#1F487C] rounded-2xl text-[1vw] mt-0"

                            >
                              <Option value="" disabled className="text-gray-200">
                                Select Occupation
                              </Option>
                              <Option value="Business">Business</Option>
                              <Option value="General Public">General Public</Option>
                              <Option value="Physically Challenged">Physically Challenged</Option>
                              <Option value="Pilgrim Traveler">Pilgrim Traveler</Option>
                              <Option value="Senior Citizen">Senior Citizen</Option>
                              <Option value="Student">Student</Option>
                              <Option value="Tourist">Tourist</Option>
                              <Option value="Corporate Traveler">Corporate Traveler</Option>
                            </Select>
                          </ConfigProvider>
                        </div>
                        {required.occupation && (
                          <div className="text-red-500 ml-[.5vw] md:text-[0.8vw] text-[2.5vw] absolute top-[3vw]">
                            Occupation is required
                          </div>
                        )}
                      </div>
                    </div>

                  </div>
                  <div className="flex items-center justify-center px-[2vw] py-[2.5vw] mt-[3.5vw] md:mt-0 ">
                    <button
                      type="button"
                      onClick={handleClick}
                      className="bg-[#1F487C] md:text-[1.2vw] text-[3vw] text-white font-bold rounded-full md:w-[13vw] w-[26vw] md:h-[2.5vw] h-[6vw]"
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};
