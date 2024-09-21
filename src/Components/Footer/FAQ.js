import React, { useEffect, useState } from "react";
import HomeHearder from "../MainComponenet/HomeHearder";
import homesky from "../../assets/homesky.png";
import Footer1 from "./Footer";
import { Collapse, Divider } from "antd";
import { RiArrowUpSFill } from "react-icons/ri";
import { RiArrowDownSFill } from "react-icons/ri";
import { Input } from "antd";
import FaQgif from "../../assets/faq.gif";
import CommonMainNavbar from "../Common/CommonMainNavbar";

const Faq = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  return (
    <>
      <div className="">
        <div className="">
          <CommonMainNavbar />
        </div>
        <div
          className="relative h-[42vw] bg-[#E5FFF1]"
          style={{
            zIndex: 1,
          }}
        >
          <div
            className="h-[10vw] overflow-x-hidden"
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
              <span className="text-[4vw] text-white font-bold">
                Frequently Ask Question
              </span>
            </div>

            <div className="absolute grid grid-cols-12 gap-[7.5vw]">
              {/* <div className="col-start-1 col-span-4 pt-[2vw] pl-[3vw] text-[1.1vw] text-white font-bold">
              {`Home > FAQs`}
              </div> */}
              <div className="cloudhome"></div>
              <div className="col-start-6 col-end-12 text-[2.5vw] pt-[1vw] text-white font-bold">
                Frequently Ask Question
              </div>
            </div>
            <div className="absolute top-[5.5vw] px-[2vw] grid grid-cols-8 w-full"></div>
          </div>
          <div className="absolute top-[6vw] px-[3vw] flex flex-col">
            <div className="bg-white w-[94vw] h-[34vw] relative rounded-[1vw]">
              <div className="grid grid-cols-7">
                <div className="col-start-1 col-span-4 m-[3vw] h-[25.2vw] overflow-auto">
                  <Collapse
                    size="large"
                    className="shadow-lg"
                    expandIcon={({ isActive }) =>
                      isActive ? (
                        <RiArrowUpSFill
                          className="mt-[0.5vw]"
                          style={{
                            color: "#1F487C",
                            height: "2vw",
                            width: "1.8vw",
                          }}
                        />
                      ) : (
                        <RiArrowDownSFill
                          className="mt-[1.5vw]"
                          style={{
                            color: "#1F487C",
                            height: "2vw",
                            width: "1.8vw",
                          }}
                        />
                      )
                    }
                    expandIconPosition="end"
                    items={[
                      {
                        key: "1",
                        label: (
                          <div className="flex items-center h-[5vh]">
                            <div className="col-span-2 pl-[1vw]">
                              <span className="text-[#1F487C] font-medium text-[1.2vw]">
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
                            <p className="text-[#1F487C]">
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
                    className="shadow-lg mt-[1vw]"
                    expandIcon={({ isActive }) =>
                      isActive ? (
                        <RiArrowUpSFill
                          className="mt-[0.5vw]"
                          style={{
                            color: "#1F487C",
                            height: "2vw",
                            width: "1.8vw",
                          }}
                        />
                      ) : (
                        <RiArrowDownSFill
                          className="mt-[1.5vw]"
                          style={{
                            color: "#1F487C",
                            height: "2vw",
                            width: "1.8vw",
                          }}
                        />
                      )
                    }
                    expandIconPosition="end"
                    items={[
                      {
                        key: "1",
                        label: (
                          <div className="flex items-center h-[5vh]">
                            <div className="col-span-2 pl-[1vw]">
                              <span className="text-[#1F487C] font-medium text-[1.2vw]">
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
                            <p className="text-[#1F487C]">
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
                    className="shadow-lg mt-[1vw]"
                    expandIcon={({ isActive }) =>
                      isActive ? (
                        <RiArrowUpSFill
                          className="mt-[0.5vw]"
                          style={{
                            color: "#1F487C",
                            height: "2vw",
                            width: "1.8vw",
                          }}
                        />
                      ) : (
                        <RiArrowDownSFill
                          className="mt-[1.5vw]"
                          style={{
                            color: "#1F487C",
                            height: "2vw",
                            width: "1.8vw",
                          }}
                        />
                      )
                    }
                    expandIconPosition="end"
                    items={[
                      {
                        key: "1",
                        label: (
                          <div className="flex items-center h-[5vh]">
                            <div className="col-span-2 pl-[1vw]">
                              <span className="text-[#1F487C] font-medium text-[1.2vw]">
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
                            <p className="text-[#1F487C]">
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
                    className="shadow-lg mt-[1vw]"
                    expandIcon={({ isActive }) =>
                      isActive ? (
                        <RiArrowUpSFill
                          className="mt-[0.5vw]"
                          style={{
                            color: "#1F487C",
                            height: "2vw",
                            width: "1.8vw",
                          }}
                        />
                      ) : (
                        <RiArrowDownSFill
                          className="mt-[1.5vw]"
                          style={{
                            color: "#1F487C",
                            height: "2vw",
                            width: "1.8vw",
                          }}
                        />
                      )
                    }
                    expandIconPosition="end"
                    items={[
                      {
                        key: "1",
                        label: (
                          <div className="flex items-center h-[5vh]">
                            <div className="col-span-2 pl-[1vw]">
                              <span className="text-[#1F487C] font-medium text-[1.2vw]">
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
                            <p className="text-[#1F487C]">
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
                    className="shadow-lg mt-[1vw]"
                    expandIcon={({ isActive }) =>
                      isActive ? (
                        <RiArrowUpSFill
                          className="mt-[0.5vw]"
                          style={{
                            color: "#1F487C",
                            height: "2vw",
                            width: "1.8vw",
                          }}
                        />
                      ) : (
                        <RiArrowDownSFill
                          className="mt-[1.5vw]"
                          style={{
                            color: "#1F487C",
                            height: "2vw",
                            width: "1.8vw",
                          }}
                        />
                      )
                    }
                    expandIconPosition="end"
                    items={[
                      {
                        key: "1",
                        label: (
                          <div className="flex items-center h-[5vh]">
                            <div className="col-span-2 pl-[1vw]">
                              <span className="text-[#1F487C] font-medium text-[1.2vw]">
                                REFUND - RELATED
                              </span>
                            </div>
                          </div>
                        ),
                        children: "rtrtyrty",
                      },
                    ]}
                  />
                </div>
                <div className="col-start-5 col-span-3">
                  <div className="pt-[2vw] text-center"></div>
                  <div className=" ml-[10.5vw]">
                    <img
                      src={FaQgif}
                      alt="GIF description"
                      className="w-[13vw] h-[13vw] object-cover"
                    />
                    <p className="text-[1.5vw] font-bold text-[#1F487C] pt-[1vw]">
                      Any Question?
                    </p>
                  </div>
                  <div className="pl-[3vw]">
                    <p className="text-[1vw] font-bold text-[#1F487C] pt-[1vw]">
                      You can ask anything you want to know about Feedback
                    </p>
                  </div>
                  <div className="pl-[3vw]">
                    <p className="text-[1vw] font-bold text-[#90a7c7] pt-[2vw]">
                      Let me know...?
                    </p>
                  </div>
                  <div className="pl-[3vw] pt-[1vw]">
                    <Input
                      className="w-[26vw] h-[3vw] rounded-xl"
                      placeholder="Enter Here"
                    />
                  </div>
                  <div className="pt-[2vw] ml-[14vw] ">
                    <button
                      type="submit"
                      className="bg-[#1F4B7F] px-[2vw] text-white text-[1vw] justify-center h-[2.5vw] gap-[0.5vw] items-center shadow-xl rounded-[2vw]"
                    >
                      Sent
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="">
          <Footer1 />
        </div>
      </div>
    </>
  );
};

export default Faq;
