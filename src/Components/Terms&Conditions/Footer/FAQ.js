import React, { useEffect, useState } from "react";
//import HomeHearder from "../MainComponenet/HomeHearder";
import homesky from "../../assets/BackgroundSky1.png";
import Footer1 from "./Footer";
import {
  Collapse,
  // Divider
} from "antd";
import { RiArrowUpSFill } from "react-icons/ri";
import { RiArrowDownSFill } from "react-icons/ri";
import { Input } from "antd";
import FaQgif from "../../assets/faq.gif";
import CommonMainNavbar from "../Common/CommonMainNavbar";
import { GetFAQById } from "../../Api/FooterTabs/FooterTabs";
import "../../App.css";
import { useDispatch } from "react-redux";

const Faq = () => {
  const [faq, setFAQ] = useState();
  const dispatch = useDispatch();
  const [activeKey, setActiveKey] = useState(null);

  const handleCollapseChange = (key) => {
    setActiveKey(activeKey === key ? null : key);
  };

  const handleClick = async (value) => {
    try {
      const response = await GetFAQById(dispatch, value);
      setFAQ(response);
      console.log("response of FAQ", response);
    } catch (error) {
      console.error("Error", error);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div className="bg-[#E5FFF1] min-h-screen max-h-auto w-full ">
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
            <label className="absolute right-[25vw] md:right-[35vw] top-[2.5vw] md:top-[1.7vw] text-[4vw] md:text-[2.2vw] text-white font-bold">{`Frequently Ask Question`}</label>
            <label className="absolute md:block hidden right-[34vw] md:right-[25vw] top-[.2vw] text-[7vw] md:text-[4vw] opacity-25 text-white font-bold">{`Frequently Ask Question`}</label>
            <div className="cloudhome"></div>
            <div className="absolute top-[5.5vw] px-[2vw] grid grid-cols-8 gap-[1vw] w-full"></div>
          </div>
          <div className="absolute md:top-[6vw] top-[12vw] px-[3vw] flex flex-col">
            <div className="bg-white h-[87vh] w-[94vw] md:h-[34vw] relative rounded-[2.5vw] md:rounded-[1vw] shadow-lg shadow-gray-300">
              <div className="grid grid-rows md:grid-cols-7">
                <div className="md:col-start-1 md:col-span-4 m-[1vw] md:m-[3vw] h-[37vh] md:h-[24vw] Legal-Information  overflow-y-auto">
                  <Collapse
                    accordion
                    activeKey={activeKey ? [activeKey] : []} // Ensure only one can be opened
                    onChange={handleCollapseChange}
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
                            className="block md:hidden mt-[5vw]"
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
                            onClick={() => {
                              const value = 1;
                              handleCollapseChange("1");
                              handleClick(value);
                            }}
                            className="md:block hidden mt-[0.5vw]"
                            style={{
                              color: "#1F487C",
                              height: "2.5vw",
                              width: "2.5vw",
                            }}
                          />
                          <RiArrowDownSFill
                            onClick={() => {
                              const value = 1;
                              handleCollapseChange("1");
                              handleClick(value);
                            }}
                            className="block md:hidden mt-[6.5vw]"
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
                          <div
                            className="flex items-center md:flex-none h-[13vw] md:h-[5vh]"
                            onClick={() => {
                              const value = 1;
                              handleCollapseChange("1");
                              handleClick(value);
                            }}
                          >
                            <div className="col-span-2 pl-[1vw]">
                              <span className="text-[#1F487C] font-medium  text-[4.5vw] md:text-[1.5vw]">
                                GENERAL
                              </span>
                            </div>
                          </div>
                        ),
                        children:
                          faq?.general?.length > 0 ? (
                            faq?.general?.map((item, index) => (
                              <div key={index}>
                                <p className="font-bold text-[#1F487C] pb-[1.5vw] md:pb-[0.5vw]">
                                  {item?.question}
                                </p>
                                <p className="text-[#1F487C] md:text-[1vw] text-[3.2vw] pb-[2vw] md:pb-[1.5vw]">
                                  {item?.answer}
                                </p>
                              </div>
                            ))
                          ) : (
                            <p className="text-[#1F487C] md:text-[1vw] text-[3.2vw]">
                              No FAQs available.
                            </p>
                          ),
                      },
                    ]}
                  />
                  <Collapse
                    accordion
                    activeKey={activeKey ? [activeKey] : []} // Ensure only one can be opened
                    onChange={handleCollapseChange}
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
                            className="block md:hidden mt-[5vw]"
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
                            onClick={() => {
                              const value = 2;
                              handleCollapseChange("2");
                              handleClick(value);
                            }}
                            className="md:block hidden mt-[0.5vw]"
                            style={{
                              color: "#1F487C",
                              height: "2.5vw",
                              width: "2.5vw",
                            }}
                          />
                          <RiArrowDownSFill
                            onClick={() => {
                              const value = 2;
                              handleCollapseChange("2");
                              handleClick(value);
                            }}
                            className="block md:hidden mt-[6.5vw]"
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
                        key: "2",
                        label: (
                          <div
                            className="flex items-center md:flex-none h-[13vw] md:h-[5vh]"
                            onClick={() => {
                              const value = 2;
                              handleCollapseChange("2");
                              handleClick(value);
                            }}
                          >
                            <div className="col-span-2 pl-[1vw]">
                              <span className="text-[#1F487C] font-medium text-[4.5vw] md:text-[1.5vw]">
                                TICKET - RELATED
                              </span>
                            </div>
                          </div>
                        ),
                        children:
                          faq?.ticket_related?.length > 0 ? (
                            faq?.ticket_related?.map((item, index) => (
                              <div key={index}>
                                <p className="font-bold text-[#1F487C] pb-[1.5vw] md:pb-[0.5vw]">
                                  {item?.question}
                                </p>
                                <p className="text-[#1F487C] md:text-[1vw] text-[3.2vw] pb-[2vw] md:pb-[1.5vw]">
                                  {item?.answer}
                                </p>
                              </div>
                            ))
                          ) : (
                            <p className="text-[#1F487C] md:text-[1vw] text-[3.2vw]">
                              No FAQs available.
                            </p>
                          ),
                      },
                    ]}
                  />
                  <Collapse
                    size={`large`}
                    accordion
                    activeKey={activeKey ? [activeKey] : []} // Ensure only one can be opened
                    onChange={handleCollapseChange}
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
                            className="block md:hidden mt-[5vw]"
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
                            onClick={() => {
                              const value = 3;
                              handleCollapseChange("3");
                              handleClick(value);
                            }}
                            className="md:block hidden mt-[0.5vw]"
                            style={{
                              color: "#1F487C",
                              height: "2.5vw",
                              width: "2.5vw",
                            }}
                          />
                          <RiArrowDownSFill
                            onClick={() => {
                              const value = 3;
                              handleCollapseChange("3");
                              handleClick(value);
                            }}
                            className="block md:hidden mt-[6.5vw]"
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
                        key: "3",
                        label: (
                          <div
                            className="flex items-center md:flex-none h-[13vw] md:h-[5vh]"
                            onClick={() => {
                              const value = 3;
                              handleCollapseChange("3");
                              handleClick(value);
                            }}
                          >
                            <div className="col-span-2 pl-[1vw]">
                              <span className="text-[#1F487C] font-medium text-[4.5vw] md:text-[1.5vw]">
                                PAYMENT - RELATED
                              </span>
                            </div>
                          </div>
                        ),
                        children:
                          faq?.payment?.length > 0 ? (
                            faq?.payment?.map((item, index) => (
                              <div key={index}>
                                <p className="font-bold text-[#1F487C] pb-[1.5vw] md:pb-[0.5vw]">
                                  {item?.question}
                                </p>
                                <p className="text-[#1F487C] md:text-[1vw] text-[3.2vw] pb-[2vw] md:pb-[1.5vw]">
                                  {item?.answer}
                                </p>
                              </div>
                            ))
                          ) : (
                            <p className="text-[#1F487C] md:text-[1vw] text-[3.2vw]">
                              No FAQs available.
                            </p>
                          ),
                      },
                    ]}
                  />
                  <Collapse
                    size={`large`}
                    accordion
                    activeKey={activeKey ? [activeKey] : []} // Ensure only one can be opened
                    onChange={handleCollapseChange}
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
                            className="block md:hidden mt-[5vw]"
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
                            onClick={() => {
                              const value = 4;
                              handleCollapseChange("4");
                              handleClick(value);
                            }}
                            className="md:block hidden mt-[0.5vw]"
                            style={{
                              color: "#1F487C",
                              height: "2.5vw",
                              width: "2.5vw",
                            }}
                          />
                          <RiArrowDownSFill
                            onClick={() => {
                              const value = 4;
                              handleCollapseChange("4");
                              handleClick(value);
                            }}
                            className="block md:hidden mt-[6.5vw]"
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
                        key: "4",
                        label: (
                          <div
                            className="flex items-center md:flex-none h-[13vw] md:h-[5vh]"
                            onClick={() => {
                              const value = 4;
                              handleCollapseChange("4");
                              handleClick(value);
                            }}
                          >
                            <div className="col-span-2 pl-[1vw]">
                              <span className="text-[#1F487C] font-medium text-[4.5vw] md:text-[1.5vw]">
                                CANCELLATION - RELATED
                              </span>
                            </div>
                          </div>
                        ),
                        children:
                          faq?.cancelation_refund?.length > 0 ? (
                            faq?.cancelation_refund?.map((item, index) => (
                              <div key={index}>
                                <p className="font-bold text-[#1F487C] pb-[1.5vw] md:pb-[0.5vw]">
                                  {item?.question}
                                </p>
                                <p className="text-[#1F487C] md:text-[1vw] text-[3.2vw] pb-[2vw] md:pb-[1.5vw]">
                                  {item?.answer}
                                </p>
                              </div>
                            ))
                          ) : (
                            <p className="text-[#1F487C] md:text-[1vw] text-[3.2vw]">
                              No FAQs available.
                            </p>
                          ),
                      },
                    ]}
                  />
                  <Collapse
                    size={`large`}
                    accordion
                    activeKey={activeKey ? [activeKey] : []} // Ensure only one can be opened
                    onChange={handleCollapseChange}
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
                            className="block md:hidden mt-[5vw]"
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
                            onClick={() => {
                              const value = 5;
                              handleCollapseChange("5");
                              handleClick(value);
                            }}
                            className="md:block hidden mt-[0.5vw]"
                            style={{
                              color: "#1F487C",
                              height: "2.5vw",
                              width: "2.5vw",
                            }}
                          />
                          <RiArrowDownSFill
                            onClick={() => {
                              const value = 5;
                              handleCollapseChange("5");
                              handleClick(value);
                            }}
                            className="block md:hidden mt-[6.5vw]"
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
                        key: "5",
                        label: (
                          <div
                            className="flex items-center md:flex-none h-[13vw] md:h-[5vh]"
                            onClick={() => {
                              const value = 5;
                              handleCollapseChange("5");
                              handleClick(value);
                            }}
                          >
                            <div className="col-span-2 pl-[1vw]">
                              <span className="text-[#1F487C] font-medium text-[4.5vw] md:text-[1.5vw]">
                                {" "}
                                REFUND - RELATED
                              </span>
                            </div>
                          </div>
                        ),
                        children:
                          faq?.insurance?.length > 0 ? (
                            faq?.insurance?.map((item, index) => (
                              <div key={index}>
                                <p className="font-bold text-[#1F487C] pb-[1.5vw] md:pb-[0.5vw]">
                                  {item?.question}
                                </p>
                                <p className="text-[#1F487C] md:text-[1vw] text-[3.2vw] pb-[2vw] md:pb-[1.5vw]">
                                  {item?.answer}
                                </p>
                              </div>
                            ))
                          ) : (
                            <p className="text-[#1F487C] md:text-[1vw] text-[3.2vw]">
                              No FAQs available.
                            </p>
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
      </div>
      <span className="md:block hidden">
          <Footer1 />
        </span>
    </>
  );
};

export default Faq;
