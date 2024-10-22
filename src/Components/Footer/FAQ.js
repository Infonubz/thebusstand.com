import React, { useEffect } from "react";
//import HomeHearder from "../MainComponenet/HomeHearder";
import homesky from "../../assets/homesky.png";
import Footer1 from "./Footer";
import { Collapse,
  // Divider 
  } from "antd";
import { RiArrowUpSFill } from "react-icons/ri";
import { RiArrowDownSFill } from "react-icons/ri";
import { Input } from "antd";
import FaQgif from "../../assets/faq.gif";
import CommonMainNavbar from "../Common/CommonMainNavbar";
import "../../App.css";

const Faq = () => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div className="h-screen bg-[#E5FFF1]">
        <div className="">
          <CommonMainNavbar />
        </div>
        <div
          className="relative h-auto md:h-[42vw] "
          style={{
            zIndex: 1,
          }}
        >
          <div
            className="md:h-[10vw] h-[20vw] overflow-x-hidden"
            style={{
              backgroundImage: `url(${homesky})`,
              overflow: "hidden",
              backgroundSize: "cover",
              position: "relative",
              overflowX: "hidden",
              width: "100%",
            }}
          >
            <div className="absolute inset-0 flex justify-center opacity-20">
              <span className="md:text-[4vw] text-white font-bold">
                Frequently Ask Question
              </span>
            </div>

            <div className="absolute grid grid-cols-12 gap-[7.5vw]">
              {/* <div className="col-start-1 col-span-4 pt-[2vw] pl-[3vw] text-[1.1vw] text-white font-bold">
              {`Home > FAQs`}
              </div> */}
              <div className="cloudhome"></div>
              <div className="col-start-4 col-end-12 md:col-start-6 md:col-end-12 text-[4vw] md:text-[2.5vw] pt-[1vw] text-white font-bold">
                Frequently Ask Question
              </div>
            </div>
            <div className="absolute top-[5.5vw] px-[2vw] grid grid-cols-8 w-full"></div>
          </div>
          <div className="absolute md:top-[6vw] top-[12vw] px-[3vw] flex flex-col">
            <div className="bg-white h-[87vh] w-[94vw] md:h-[34vw] relative rounded-[2.5vw] md:rounded-[1vw] shadow-lg shadow-gray-300">
              <div className="grid grid-rows md:grid-cols-7">
                <div className="md:col-start-1 md:col-span-4 m-[1vw] md:mt-[3vw] md:pr-[1.5vw] md:pl-[2.5vw] h-[37vh] md:h-[24vw] Legal-Information overflow-y-scroll">
                  <Collapse
                    size={`large`}
                    className="relative shadow-lg bg-white md:m-[1vw] m-[3vw] border-none"
                    style={{
                      boxShadow:
                        "0 -4px 6px rgba(31, 71, 124, 0.04), 0 8px 15px rgba(31, 71, 124, 0.2)",
                    }}
                    expandIcon={({ isActive }) =>
                      isActive ? (
                        <>
                          <RiArrowUpSFill
                            className="md:block hidden mt-[0.5vw]"
                            style={{
                              color: "#1F487C",
                              height: "2.5vw",
                              width: "2.5vw",
                            }}
                          />
                          <RiArrowUpSFill
                            className="block md:hidden mt-[0.5vw]"
                            style={{
                              color: "#1F487C",
                              height: "7vw",
                              width: "7vw",
                            }}
                          />
                        </>
                      ) : (
                        <>
                          <RiArrowDownSFill
                            className="md:block hidden mt-[0.5vw]"
                            style={{
                              color: "#1F487C",
                              height: "2.5vw",
                              width: "2.5vw",
                            }}
                          />
                          <RiArrowDownSFill
                            className="block md:hidden mt-[0.5vw]"
                            style={{
                              color: "#1F487C",
                              height: "7vw",
                              width: "7vw",
                            }}
                          />
                        </>
                      )
                    }
                    expandIconPosition="end"
                    items={[
                      {
                        key: "1",
                        label: (
                          <div className="flex items-center h-[3.5vw] md:h-[5vh]">
                            <div className="col-span-2 pl-[1vw]">
                              <span className="text-[#1F487C] font-medium  text-[4.5vw] md:text-[1.5vw]">
                                GENERAL
                              </span>
                            </div>
                          </div>
                        ),
                        children: (
                          <div>
                            <p className="font-bold text-[#1F487C]">
                              {" "}
                              What are the advantages of purchasing a bus ticket
                              with TBS?{" "}
                            </p>
                            <p className="text-[#1F487C] md:text-[1vw] text-[3.2vw]">
                              - You can choose your seat - You can book your bus
                              tickets online, by phone, or in person - You can
                              choose from over 1500+ bus operators - You can
                              choose from buses based on boarding points, timing
                              and bus type
                            </p>
                          </div>
                        ),
                      },
                    ]}
                  />
                  <Collapse
                    size="large"
                    className="relative shadow-lg bg-white md:m-[1vw] m-[3vw] border-none"
                    style={{
                      boxShadow:
                        "0 -4px 6px rgba(31, 71, 124, 0.04), 0 8px 15px rgba(31, 71, 124, 0.2)",
                    }}
                    expandIcon={({ isActive }) =>
                      isActive ? (
                        <>
                          <RiArrowUpSFill
                            className="md:block hidden mt-[0.5vw]"
                            style={{
                              color: "#1F487C",
                              height: "2.5vw",
                              width: "2.5vw",
                            }}
                          />
                          <RiArrowUpSFill
                            className="block md:hidden mt-[0.5vw]"
                            style={{
                              color: "#1F487C",
                              height: "7vw",
                              width: "7vw",
                            }}
                          />
                        </>
                      ) : (
                        <>
                          <RiArrowDownSFill
                            className="md:block hidden mt-[0.5vw]"
                            style={{
                              color: "#1F487C",
                              height: "2.5vw",
                              width: "2.5vw",
                            }}
                          />
                          <RiArrowDownSFill
                            className="block md:hidden mt-[0.5vw]"
                            style={{
                              color: "#1F487C",
                              height: "7vw",
                              width: "7vw",
                            }}
                          />
                        </>
                      )
                    }
                    expandIconPosition="end"
                    items={[
                      {
                        key: "1",
                        label: (
                          <div className="flex items-center h-[3.5vw] md:h-[5vh]">
                            <div className="col-span-2 pl-[1vw] pt-[2vw] md:pt-[0vw]">
                              <span className="text-[#1F487C] font-medium  text-[4.5vw] md:text-[1.5vw]">
                                TICKET - RELATED
                              </span>
                            </div>
                          </div>
                        ),
                        children: (
                          <div>
                            <p className="font-bold text-[#1F487C]">
                              {" "}
                              What are the advantages of purchasing a bus ticket
                              with TBS?{" "}
                            </p>
                            <p className="text-[#1F487C] md:text-[1vw] text-[3.2vw]">
                              - You can choose your seat - You can book your bus
                              tickets online, by phone, or in person - You can
                              choose from over 1500+ bus operators - You can
                              choose from buses based on boarding points, timing
                              and bus type
                            </p>
                          </div>
                        ),
                      },
                    ]}
                  />
                  <Collapse
                    size="large"
                    className="relative shadow-lg bg-white md:m-[1vw] m-[3vw] border-none"
                    style={{
                      boxShadow:
                        "0 -4px 6px rgba(31, 71, 124, 0.04), 0 8px 15px rgba(31, 71, 124, 0.2)",
                    }}
                    expandIcon={({ isActive }) =>
                      isActive ? (
                        <>
                          <RiArrowUpSFill
                            className="md:block hidden mt-[0.5vw]"
                            style={{
                              color: "#1F487C",
                              height: "2.5vw",
                              width: "2.5vw",
                            }}
                          />
                          <RiArrowUpSFill
                            className="block md:hidden mt-[0.5vw]"
                            style={{
                              color: "#1F487C",
                              height: "7vw",
                              width: "7vw",
                            }}
                          />
                        </>
                      ) : (
                        <>
                          <RiArrowDownSFill
                            className="md:block hidden mt-[0.5vw]"
                            style={{
                              color: "#1F487C",
                              height: "2.5vw",
                              width: "2.5vw",
                            }}
                          />
                          <RiArrowDownSFill
                            className="block md:hidden mt-[0.5vw]"
                            style={{
                              color: "#1F487C",
                              height: "7vw",
                              width: "7vw",
                            }}
                          />
                        </>
                      )
                    }
                    expandIconPosition="end"
                    items={[
                      {
                        key: "1",
                        label: (
                          <div className="flex items-center h-[3.5vw] md:h-[5vh]">
                            <div className="col-span-2 pl-[1vw] pt-[2vw] md:pt-[0vw]">
                              <span className="text-[#1F487C] font-medium text-[4.5vw] md:text-[1.5vw]">
                                PAYMENT - RELATED
                              </span>
                            </div>
                          </div>
                        ),
                        children: (
                          <div>
                            <p className="font-bold text-[#1F487C]">
                              {" "}
                              What are the advantages of purchasing a bus ticket
                              with TBS?{" "}
                            </p>
                            <p className="text-[#1F487C] md:text-[1vw] text-[3.2vw]">
                              - You can choose your seat - You can book your bus
                              tickets online, by phone, or in person - You can
                              choose from over 1500+ bus operators - You can
                              choose from buses based on boarding points, timing
                              and bus type
                            </p>
                          </div>
                        ),
                      },
                    ]}
                  />
                  <Collapse
                    size="large"
                    className="relative shadow-lg bg-white md:m-[1vw] m-[3vw] border-none"
                    style={{
                      boxShadow:
                        "0 -4px 6px rgba(31, 71, 124, 0.04), 0 8px 15px rgba(31, 71, 124, 0.2)",
                    }}
                    expandIcon={({ isActive }) =>
                      isActive ? (
                        <>
                          <RiArrowUpSFill
                            className="md:block hidden mt-[0.5vw]"
                            style={{
                              color: "#1F487C",
                              height: "2.5vw",
                              width: "2.5vw",
                            }}
                          />
                          <RiArrowUpSFill
                            className="block md:hidden mt-[0.5vw]"
                            style={{
                              color: "#1F487C",
                              height: "7vw",
                              width: "7vw",
                            }}
                          />
                        </>
                      ) : (
                        <>
                          <RiArrowDownSFill
                            className="md:block hidden mt-[0.5vw]"
                            style={{
                              color: "#1F487C",
                              height: "2.5vw",
                              width: "2.5vw",
                            }}
                          />
                          <RiArrowDownSFill
                            className="block md:hidden mt-[0.5vw]"
                            style={{
                              color: "#1F487C",
                              height: "7vw",
                              width: "7vw",
                            }}
                          />
                        </>
                      )
                    }
                    expandIconPosition="end"
                    items={[
                      {
                        key: "1",
                        label: (
                          <div className="flex items-center h-[3.5vw] md:h-[5vh]">
                            <div className="col-span-2 pl-[1vw] pt-[2vw] md:pt-[0vw]">
                              <span className="text-[#1F487C] font-medium text-[4.5vw] md:text-[1.5vw]">
                                CANCELLATION - RELATED
                              </span>
                            </div>
                          </div>
                        ),
                        children: (
                          <div>
                            <p className="font-bold text-[#1F487C]">
                              {" "}
                              What are the advantages of purchasing a bus ticket
                              with TBS?{" "}
                            </p>
                            <p className="text-[#1F487C] md:text-[1vw] text-[3.2vw]">
                              - You can choose your seat - You can book your bus
                              tickets online, by phone, or in person - You can
                              choose from over 1500+ bus operators - You can
                              choose from buses based on boarding points, timing
                              and bus type
                            </p>
                          </div>
                        ),
                      },
                    ]}
                  />
                  <Collapse
                    size="large"
                    className="relative shadow-lg bg-white md:m-[1vw] m-[3vw] border-none"
                    style={{
                      boxShadow:
                        "0 -4px 6px rgba(31, 71, 124, 0.04), 0 8px 15px rgba(31, 71, 124, 0.2)",
                    }}
                    expandIcon={({ isActive }) =>
                      isActive ? (
                        <>
                          <RiArrowUpSFill
                            className="md:block hidden mt-[0.5vw]"
                            style={{
                              color: "#1F487C",
                              height: "2.5vw",
                              width: "2.5vw",
                            }}
                          />
                          <RiArrowUpSFill
                            className="block md:hidden mt-[0.5vw]"
                            style={{
                              color: "#1F487C",
                              height: "7vw",
                              width: "7vw",
                            }}
                          />
                        </>
                      ) : (
                        <>
                          <RiArrowDownSFill
                            className="md:block hidden mt-[0.5vw]"
                            style={{
                              color: "#1F487C",
                              height: "2.5vw",
                              width: "2.5vw",
                            }}
                          />
                          <RiArrowDownSFill
                            className="block md:hidden mt-[0.5vw]"
                            style={{
                              color: "#1F487C",
                              height: "7vw",
                              width: "7vw",
                            }}
                          />
                        </>
                      )
                    }
                    expandIconPosition="end"
                    items={[
                      {
                        key: "1",
                        label: (
                          <div className="flex items-center h-[3.5vw] md:h-[5vh]">
                            <div className="col-span-2 pl-[1vw] pt-[2vw] md:pt-[0vw]">
                              <span className="text-[#1F487C] font-medium text-[4.5vw] md:text-[1.5vw]">
                                REFUND - RELATED
                              </span>
                            </div>
                          </div>
                        ),
                        children: (
                          <div>
                            <p className="font-bold text-[#1F487C]">
                              {" "}
                              What are the advantages of purchasing a bus ticket
                              with TBS?{" "}
                            </p>
                            <p className="text-[#1F487C] md:text-[1vw] text-[3.2vw]">
                              - You can choose your seat - You can book your bus
                              tickets online, by phone, or in person - You can
                              choose from over 1500+ bus operators - You can
                              choose from buses based on boarding points, timing
                              and bus type
                            </p>
                          </div>
                        ),
                      },
                    ]}
                  />
                </div>
                <div className="md:col-start-5 pt-[2vw] md:pl-[3.5vw] md:pt-[0vw] md:col-span-3">
                  <div className="md:pt-[2vw] text-center"></div>
                  <div className="md:ml-[10.5vw] ml-[27vw]">
                    <img
                      src={FaQgif}
                      alt="GIF description"
                      className="h-[40vw] w-[40vw] md:w-[13vw] md:h-[13vw] object-cover"
                    />
                    <p className="text-[4.5vw] pl-[3vw] md:pl-[0vw] md:text-[1.5vw] font-extrabold md:font-bold text-[#1F487C] pt-[1vw]">
                      Any Question?
                    </p>
                  </div>
                  <div className="pl-[3vw]">
                    <p className="text-[3.2vw] ml-[1vw] md:ml-[0vw] md:text-[1vw] font-bold text-[#1F487C] pt-[1vw]">
                      You can ask anything you want to know about Feedback
                    </p>
                  </div>
                  <div className="pl-[3vw]">
                    <p className="text-[3.2vw] ml-[1vw] md:ml-[0vw] md:text-[1vw] font-bold text-[#90a7c7] pt-[2vw]">
                      Let me know...?
                    </p>
                  </div>
                  <div className={`pl-[3vw] pt-[1vw]`}>
                    <Input
                      className={`w-[87vw] h-[10vw] md:w-[26vw] md:h-[3vw] rounded-[1.5vw] md:rounded-xl md:placeholder:text-[1.1vw] placeholder:text-[4vw]`}
                      placeholder="Enter Here"
                    />
                  </div>
                  <div
                    className={`pt-[4vw] ml-[30vw] md:pt-[2vw] md:ml-[12vw]`}
                  >
                    <button
                      type="submit"
                      className={`bg-[#1F4B7F] md:px-[2vw] text-white text-[5vw] md:text-[1vw] md:w-[9vw] md:justify-center h-[10vw] w-[31vw] md:h-[2.5vw] gap-[0.5vw] 
                        md:items-center shadow-2xl md:shadow-xl rounded-[6vw] md:rounded-[2vw]`}
                    >
                      Send
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="md:block hidden">
          <Footer1 />
        </div>
      </div>
    </>
  );
};

export default Faq;
