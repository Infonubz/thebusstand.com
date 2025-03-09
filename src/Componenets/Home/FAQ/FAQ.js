import React, { useEffect, useState } from "react";
import { SlArrowDown, SlArrowUp } from "react-icons/sl";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { LoadingOutlined } from "@ant-design/icons";
import { GetFAQS } from "../../../Api-TBS/Home/Home";
import { Spin } from "antd";

export default function FAQS() {
  const [btnId, setBtnId] = useState(null);
  const [tabs, setTabs] = useState("general");
  const [content, setContent] = useState(null);
  const [faqData, setFaqData] = useState([]);
  const [spinning, setSpinning] = useState(false);
  const colors = useSelector((state) => state?.themecolors[0]);
  const dispatch = useDispatch();
  const navigation = useNavigate();

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        setSpinning(true);
        const response = await GetFAQS(dispatch, tabs, setSpinning);
        setContent(response);
      } catch (err) {
        console.error(err);
      }
    };

    fetchFaqs();
  }, [tabs, dispatch]);

  useEffect(() => {
    if (content) {
      switch (tabs) {
        case "general":
          setFaqData(content?.general || []);
          break;
        case "ticket_related":
          setFaqData(content?.ticket_related || []);
          break;
        case "payment":
          setFaqData(content?.payment || []);
          break;
        case "cancellation":
          setFaqData(content?.cancelation_refund || []);
          break;
        case "insurance":
          setFaqData(content?.insurance || []);
          break;
        default:
          console.error("Invalid tab name");
          return;
      }
    }
  }, [tabs, content]);

  const toggleState = (id) => {
    setBtnId(id === btnId ? null : id);
  };

  return (
    <div className="px-[5vw] md:mt-[1vw] mb-[7.5vw]">
      <p
        className={`text-[4vw] pl-[2vw] text-[${colors.primary}] font-bold pt-[0.5vw] md:text-[1.5vw] md:pl-[2vw] md:font-bold md:pt-[1vw] md:pb-[1vw]`}
      >
        FAQs Related to Bus Tickets Booking
      </p>

      <div className="px-[2vw]">
        <div className="overflow-x-auto whitespace-nowrap scrollbar-hide md:my-0 my-[2vw]">
          <div className="flex md:space-x-0 md:px-0">
            {[
              "general",
              "ticket_related",
              "payment",
              "cancellation",
              "insurance",
            ].map((tab) => (
              // <div
              //     key={tab}
              //     onClick={() => setTabs(tab)}
              //     className={`${tabs === tab
              //         ? "font-semibold text-[#1F487C] border-b-[0.1vw] border-[#1F487C]"
              //         : ""
              //         } text-[4vw] md:text-[1.2vw] md:px-[4vw] px-[8vw] cursor-pointer`}
              // >
              //     {tab.charAt(0).toUpperCase() + tab.slice(1).replace("_", " ")}
              // </div>
              <div
                key={tab}
                onClick={() => setTabs(tab)}
                className={`${
                  tabs === tab
                    ? "font-semibold text-[#1F487C] border-b-[0.1vw] border-[#1F487C]"
                    : ""
                } text-[4vw] md:text-[1.2vw] md:px-[4vw] px-[8vw] cursor-pointer`}
              >
                {tab
                  .split("_")
                  .map((word, index) =>
                    index === 0
                      ? word.charAt(0).toUpperCase() + word.slice(1)
                      : word.charAt(0).toUpperCase() + word.slice(1)
                  )
                  .join(" ")}
              </div>
            ))}
          </div>
        </div>

        {spinning ? (
          <div className="h-[25vh] flex items-center justify-center">
            <Spin
              indicator={
                <LoadingOutlined
                  style={{
                    fontSize: 48,
                  }}
                  spin
                />
              }
            />
          </div>
        ) : (
          <>
            <div className="">
              {faqData.map((info) => (
                <div
                  key={info.question_id}
                  onClick={() => toggleState(info.question_id)}
                  className="relative w-[100%] cursor-pointer py-[0.25vw]"
                >
                  <div className="flex m-[0.3vw]">
                    <div className="flex items-center">
                      <span className="flex justify-items-start font-semibold font-MontserratFont text-[3.5vw] md:text-[1.1vw]">
                        {info.question}
                      </span>
                      <span className="absolute md:right-[1vw] right-[-2vw]">
                        {btnId === info.question_id ? (
                          <SlArrowUp size={"1.1vw"} />
                        ) : (
                          <SlArrowDown size={"1.1vw"} />
                        )}
                      </span>
                    </div>
                  </div>
                  {btnId === info.question_id && (
                    <div className="ml-[1.5vw] my-[1vw] font-body text-[3vw] md:text-[1.1vw]">
                      {info.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </>
        )}

        <div className="float-end pr-[0vw]">
          <h2
            className={`text-[${colors.primary}] md:text-[1.1vw] md:mt-0 text-[3vw] py-[1vw] font-semibold cursor-pointer mb-[2vw]`}
            onClick={() => {
              navigation("/faq");
            }}
          >
            View All FAQs
          </h2>
        </div>
      </div>
    </div>
  );
}
