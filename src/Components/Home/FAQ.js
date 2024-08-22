import React, { useEffect, useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { SlArrowDown } from "react-icons/sl";
import { SlArrowUp } from "react-icons/sl";
import "../../Components/Home/FAQ.css";
import { GetFAQS } from "../../Api/Home/Home";
import { useDispatch, useSelector } from "react-redux";

const Faqs = () => {
  const [isToggled, setIsToggled] = useState(0);

  const fetchedFaqs = useSelector((state)=>state?.faqs)
  const generalFaqs=fetchedFaqs[0]?.general;
  console.log(generalFaqs,"generalFaqs")
  const ticket_relatedFaqs=fetchedFaqs[0]?.ticket_related;
  const paymentFaqs=fetchedFaqs[0]?.payment;
  const cancelation_refundFaqs=fetchedFaqs[0]?.cancelation_refund;
  const insuranceFaqs=fetchedFaqs[0]?.insurance;
  

  const dispatch = useDispatch();

  useEffect(() => {
    GetFAQS(dispatch);
  }, [dispatch]);

  const question1 = [
    {
      id: 1,
      qus: "Q. How do I book a bus ticket on your site?",
      ans: "Simply search for your desired route, select your preferred bus, and complete the booking process in a few easy steps.",
    },
    {
      id: 2,
      qus: "Q. Can I cancel my bus ticket reservation?",
      ans: "Yes, cancellation policies vary depending on the bus operator, but many tickets are refundable with applicable fees.",
    },
    {
      id: 3,
      qus: "Q. Are there any discounts available for booking multiple tickets?",
      ans: "Yes, we often offer discounts for group bookings or multiple ticket purchases on select routes.",
    },
    {
      id: 4,
      qus: "Q. Is it possible to change the date or time of my booked ticket?",
      ans: "Some tickets may be amendable, subject to availability and the policies of the specific bus operator.",
    },
    {
      id: 5,
      qus: "Q. How can I pay for my bus ticket?",
      ans: "We accept various payment methods including credit/debit cards, net banking, and mobile wallets for convenient booking.",
    },
  ];
  const ticket_related = [
    {
      id: 6,
      qus: "Q. Can I choose my seat when booking a bus ticket?",
      ans: "Yes, many bus operators allow you to select your preferred seat during the booking process, subject to availability.",
    },
    {
      id: 7,
      qus: "Q. How far in advance can I book a bus ticket?",
      ans: "You can typically book bus tickets up to several months in advance, depending on the route and bus operator.",
    },
    {
      id: 8,
      qus: "Q. Is it possible to get a receipt for my bus ticket booking?",
      ans: "Yes, you will receive a confirmation email with your booking details which can serve as your receipt.",
    },
    {
      id: 9,
      qus: "Q. Do I need to print my bus ticket or can I show it on my phone?",
      ans: "Most bus operators accept e-tickets displayed on your mobile device, but it's always good to check with the operator beforehand.",
    },
    {
      id: 10,
      qus: "Q. What should I do if I miss my bus?",
      ans: "Contact our customer support as soon as possible for assistance with rescheduling or alternative options, if available.",
    },
  ];

  const [btnid, setBtnId] = useState(null);

  const toggleState = (id) => {
    // setIsToggled(prevState => !prevState);
    setIsToggled(!isToggled);
    console.log(id);
    setBtnId(id);
  };

  return (
    <>
      <div className="px-[5vw] md:mt-[2vw] mb-[5vw]">
        <p className="text-[4vw] pl-[2vw] text-[#1F487C] font-bold pt-[0.5vw] md:text-[1.5vw] md:pl-[2vw] md:font-bold md:pt-[1vw] md:pb-[1vw]">
          FAQs Related to bus tickets Booking{" "}
        </p>
        <div className="px-[2vw]">
          <Tabs>
            {/* <TabList className="overflow-x-auto">
              <div className="flex-shrink-0">
                <div >
                  <Tab className="tab2 md:text-[1vw]">General</Tab>
                  <Tab className="tab2 md:text-[1vw]">Ticket-related</Tab>
                  <Tab className="tab2 md:text-[1vw]">Payment</Tab>
                  <Tab className="tab2 md:text-[1vw]">Cancelation & Refund</Tab>
                  <Tab className="tab2 md:text-[1vw]">Insurence</Tab>
                </div>
              </div>
            </TabList> */}
            <TabList className="overflow-x-auto whitespace-nowrap scrollbar-hide md:my-0 my-[2vw]">
              <div className="flex md:space-x-0  md:px-0">
                <Tab className="tab2  text-[4vw] md:text-[1.2vw] md:px-[4vw] px-[8vw]">
                  General
                </Tab>
                <Tab className="tab2 text-[4vw] md:text-[1.2vw]  md:px-[4vw] px-[8vw]">
                  Ticket-related
                </Tab>
                <Tab className="tab2 text-[4vw] md:text-[1.2vw]  md:px-[4vw] px-[8vw]">
                  Payment
                </Tab>
                <Tab className="tab2 text-[4vw] md:text-[1.2vw]  md:px-[4vw] px-[8vw]">
                  Cancelation & Refund
                </Tab>
                <Tab className="tab2 text-[4vw] md:text-[1.2vw]  md:px-[4vw] px-[8vw]">
                  Insurance
                </Tab>
              </div>
            </TabList>

            <TabPanel>
              <div className="py-[2vh] flex flex-col flex-wrap gap-[1vw]">
                {generalFaqs?.map((info) => (
                  // < div className='bg-white rounded-lg border border-slate-300 w-fit p-5' >
                  <div
                    key={info.question_id}
                    onClick={() => toggleState(info.question_id)}
                    className={` relative w-[100%] cursor-pointer`}
                  >
                    <button className=" flex m-[0.3vw] ">
                      <div className="flex items-center">
                        <span className="flex justify-items-start  font-semibold font-MontserratFont text-[3.5vw] md:text-[1.1vw]">
                          {info.question}
                        </span>
                        <span className="absolute md:right-[1vw] right-[-2vw]">
                          {isToggled && info.question_id == btnid ? (
                            <SlArrowUp size={"1.1vw"} />
                          ) : (
                            <SlArrowDown size={"1.1vw"} />
                          )}
                        </span>
                      </div>
                    </button>
                    {isToggled && info.question_id == btnid ? (
                      <div className="ml-[1.5vw] my-[1vw] font-body text-[3vw] md:text-[1.1vw]">
                        {info.answer}
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                ))}
              </div>
            </TabPanel>
            <TabPanel>
              <div className="py-[2vh] flex flex-col flex-wrap gap-[1vw]">
                {ticket_relatedFaqs?.map((info) => (
                  // < div className='bg-white rounded-lg border border-slate-300 w-fit p-5' >
                  <div
                    key={info.question_id}
                    onClick={() => toggleState(info.question_id)}
                    className={` relative w-[100%] cursor-pointer`}
                  >
                    <button className=" flex m-[0.3vw]">
                      <div className="flex items-center">
                        <span className="flex justify-items-start font-semibold font-MontserratFont text-[3vw] md:text-[1.1vw] ">
                          {info.question}
                        </span>
                        <span className="absolute right-[1vw]">
                          {isToggled && info.question_id == btnid ? (
                            <SlArrowUp size={"1.1vw"} />
                          ) : (
                            <SlArrowDown size={"1.1vw"} />
                          )}
                        </span>
                      </div>
                    </button>
                    {isToggled && info.question_id == btnid ? (
                      <div className="ml-[1.5vw] my-[1vw] font-body text-[3vw] md:text-[1.1vw]">
                        {info.answer}
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                ))}
              </div>
            </TabPanel>
            <TabPanel>
            <div className="py-[2vh] flex flex-col flex-wrap gap-[1vw]">
                {paymentFaqs?.map((info) => (
                  // < div className='bg-white rounded-lg border border-slate-300 w-fit p-5' >
                  <div
                    key={info.question_id}
                    onClick={() => toggleState(info.question_id)}
                    className={` relative w-[100%] cursor-pointer`}
                  >
                    <button className=" flex m-[0.3vw] ">
                      <div className="flex items-center">
                        <span className="flex justify-items-start  font-semibold font-MontserratFont text-[3.5vw] md:text-[1.1vw] ">
                          {info.question}
                        </span>
                        <span className="absolute md:right-[1vw] right-[-2vw]">
                          {isToggled && info.question_id == btnid ? (
                            <SlArrowUp size={"1.1vw"} />
                          ) : (
                            <SlArrowDown size={"1.1vw"} />
                          )}
                        </span>
                      </div>
                    </button>
                    {isToggled && info.question_id == btnid ? (
                      <div className="ml-[1.5vw] my-[1vw] font-body text-[3vw] md:text-[1.1vw]">
                        {info.answer}
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                ))}
              </div>
            </TabPanel>
            <TabPanel>
            <div className="py-[2vh] flex flex-col flex-wrap gap-[1vw]">
                {cancelation_refundFaqs?.map((info) => (
                  // < div className='bg-white rounded-lg border border-slate-300 w-fit p-5' >
                  <div
                    key={info.question_id}
                    onClick={() => toggleState(info.question_id)}
                    className={` relative w-[100%] cursor-pointer`}
                  >
                    <button className=" flex m-[0.3vw] ">
                      <div className="flex items-center">
                        <span className="flex justify-items-start  font-semibold font-MontserratFont text-[3.5vw] md:text-[1.1vw] ">
                          {info.question}
                        </span>
                        <span className="absolute md:right-[1vw] right-[-2vw]">
                          {isToggled && info.question_id == btnid ? (
                            <SlArrowUp size={"1.1vw"} />
                          ) : (
                            <SlArrowDown size={"1.1vw"} />
                          )}
                        </span>
                      </div>
                    </button>
                    {isToggled && info.question_id == btnid ? (
                      <div className="ml-[1.5vw] my-[1vw] font-body text-[3vw] md:text-[1.1vw]">
                        {info.answer}
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                ))}
              </div>
            </TabPanel>
            <TabPanel>
            <div className="py-[2vh] flex flex-col flex-wrap gap-[1vw]">
                {insuranceFaqs?.map((info) => (
                  // < div className='bg-white rounded-lg border border-slate-300 w-fit p-5' >
                  <div
                    key={info.question_id}
                    onClick={() => toggleState(info.question_id)}
                    className={` relative w-[100%] cursor-pointer`}
                  >
                    <button className=" flex m-[0.3vw] ">
                      <div className="flex items-center">
                        <span className="flex justify-items-start  font-semibold font-MontserratFont text-[3.5vw] md:text-[1.1vw] ">
                          {info.question}
                        </span>
                        <span className="absolute md:right-[1vw] right-[-2vw]">
                          {isToggled && info.question_id == btnid ? (
                            <SlArrowUp size={"1.1vw"} />
                          ) : (
                            <SlArrowDown size={"1.1vw"} />
                          )}
                        </span>
                      </div>
                    </button>
                    {isToggled && info.question_id == btnid ? (
                      <div className="ml-[1.5vw] my-[1vw] font-body text-[3vw] md:text-[1.1vw]">
                        {info.answer}
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                ))}
              </div>
            </TabPanel>
          </Tabs>
          <div className="float-end pr-[0vw] ">
            <h2 className="text-[#1F487C] text-[1.1vw] font-semibold cursor-pointer">
              View all FAQs
            </h2>
          </div>
        </div>
      </div>
    </>
  );
};

export default Faqs;
