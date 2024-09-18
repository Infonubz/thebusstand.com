import React, { useEffect, useState } from "react";
import { SlArrowDown } from "react-icons/sl";
import { SlArrowUp } from "react-icons/sl";
import booking_bus from "../../../../assets/booking_bus.png";
import { FaArrowRightLong } from "react-icons/fa6";
import dayjs from "dayjs";
import { IoPersonOutline } from "react-icons/io5";
import { LuDownload } from "react-icons/lu";
import empty from "../../../../assets/empty.png";
import * as Yup from 'yup';
import { IoTicketOutline } from "react-icons/io5";
import { MdOutlinePhone } from "react-icons/md";
import { Formik, Field, Form, ErrorMessage } from "formik";
export default function MobileCancelled() {

  const validationSchema = Yup.object({
    ticketNumber: Yup.string()
      .required('Ticket number is required'),
    phoneNumber: Yup.string()
      .matches(/^\+?[1-9]\d{1,14}$/, 'Phone number must be a valid phone number')
      .required('Phone number is required')
  });
  const [isToggled, setIsToggled] = useState(0);

  const [btnid, setBtnId] = useState(null);

  const toggleState = (id) => {
    setIsToggled(!isToggled);
    console.log(id);
    setBtnId(id);
  };

  const cancelledDetails = [
    {
        id: 1,
        qus: "How do I cancel my booking?",
        ans: "To cancel your booking, guest users need to provide the Booking ID and the Passenger Mobile number. If you booked through a registered account, log in to your account and follow the instructions to cancel your ticket.",
    },
    {
        id: 2,
        qus: "Where can I review the cancellation policy?",
        ans: "Cancellation policies differ by bus operator. You can check the cancellation policy on the bus operator's website or refer to the terms provided with your ticket. Many tickets are refundable, subject to applicable fees.",
    },
    {
        id: 3,
        qus: "What should I do if my bus service was cancelled?",
        ans: "If your bus service is cancelled, check for any communication from the bus operator for instructions. They may offer a refund, alternative travel options, or a voucher for future use.",
    },
    {
        id: 4,
        qus: "When and where will I receive my refund?",
        ans: "Refunds are usually processed to the original payment method within a few business days. The exact timing can vary based on the bus operator's policies and your payment method.",
    },
    {
        id: 5,
        qus: "Can I change my ticket if my travel plans change?",
        ans: "Some tickets allow changes based on availability and the bus operator's policies. Review your ticket terms or contact customer support for details on how to amend your booking.",
    },
    {
        id: 6,
        qus: "How do I know if my booking is eligible for a refund?",
        ans: "Eligibility for a refund depends on the bus operator's cancellation policy and the type of ticket purchased. Check your ticket details or contact customer support to confirm if you qualify for a refund.",
    },
    {
        id: 7,
        qus: "What are the fees associated with cancelling a booking?",
        ans: "Cancellation fees vary by bus operator and ticket type. You can find details about potential fees in the cancellation policy or by contacting customer support.",
    },
    {
        id: 8,
        qus: "Is it possible to get a refund if I miss my bus?",
        ans: "Typically, refunds are not available for missed buses. However, some operators may offer alternative solutions or partial refunds based on their policies. Check the terms of your ticket or contact customer support for more information.",
    },
    {
        id: 9,
        qus: "How do I request a refund for a cancelled booking?",
        ans: "To request a refund for a cancelled booking, follow the instructions provided by the bus operator or on their website. This usually involves filling out a refund request form or contacting customer support.",
    },
];

  return (
    <div className="flex flex-col w-full justify-center py-[5vw] px-[5vw]">
      {cancelledDetails.length > 0 ? (
        <>
          <div className="text-[5vw] text-[#1F487C] font-bold">Enter Ticket Details</div>
          <div className="text-[3vw] text-[#1F487C]">Check Your email or sms for booking confirmation Details</div>
          <Formik
            initialValues={{
              ticketNumber: '',
              phoneNumber: ''
            }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              console.log(values);
            }}
            enableReinitialize
          >
            {({
              isSubmitting,
              isValid,
              handleSubmit,
              values,
              handleChange,
            }) => (
              <Form onSubmit={handleSubmit}>
                <div className=" py-[2.5vw]">
                  <div className="relative ">
                    <div className="absolute top-[2.5vw] left-[1.5vw]"><IoTicketOutline size="6vw" color="#1F487C80" /></div>
                    <div>
                      <style>
                        {`
                          input::placeholder {
                          font-size:4vw;
                          
                            }
                        `}
                      </style>
                      <Field
                        name="ticketNumber"
                        type="text"
                        placeholder="Ticket Number"
                        className='w-full py-[2vw] px-[10vw] bg-white  border-[0.5vw] border-[#1F487C] rounded-lg focus:outline-none'
                        onChange={handleChange}
                        value={values.ticketNumber}
                      />
                    </div>
                  </div>
                  <ErrorMessage
                    name="ticketNumber"
                    component="div"
                    className="text-red-500 text-[2.8vw] absolute" />
                </div>

                <div className=" py-[2.5vw]">
                  <div className="relative ">
                    <div className="absolute top-[2.5vw] left-[1.5vw]"><MdOutlinePhone size="6vw" color="#1F487C80" /></div>
                    <div>
                      <style>
                        {`
                          input::placeholder {
                          font-size:4vw;
                          
                            }
                        `}
                      </style>
                      <Field
                        name="phoneNumber"
                        type="text"
                        placeholder="Phone Number"
                        className='w-full py-[2vw] px-[10vw] bg-white  border-[0.5vw] border-[#1F487C] rounded-lg focus:outline-none'
                        onChange={handleChange}
                        value={values.phoneNumber}
                      />
                    </div>
                  </div>
                  <ErrorMessage
                    name="phoneNumber"
                    component="div"
                    className="text-red-500 text-[2.8vw] absolute" />
                </div>
                <div className=' flex justify-center gap-[2vw] py-[2.5vw]'>
                  <button type='submit' className='bg-[#1F487C] text-[white] w-3/5 h-[10vw] rounded-full text-[5vw]'>Submit</button>

                </div>
              </Form>
            )}
          </Formik>
          <div className=" overflow-y-scroll">
            <div>
              <div className="text-[4vw] text-[#1F487C] font-bold py-[3vw]">Frequently Asked Questions</div>
              <div className="bg-white border-[0.5vw] border-[#1F487C] rounded-lg px-[2vw] py-[1vw] h-[40vh] overflow-y-auto">
                {cancelledDetails.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => toggleState(item.id)}
                    className='w-[100%] relative cursor-pointer py-[2vw] border-b-[0.5vw] border-[#1F487C80]'
                  >
                    <div className="text-[3.75vw] w-[90%] text-[#1F487C] font-bold">{item.qus}</div>
                    <div className="absolute top-[3.5vw] right-[2vw]">
                      {isToggled && item.id == btnid ? (
                        <SlArrowUp size={"3vw"} color="#1F487C" />
                      ) : (
                        <SlArrowDown size={"3vw"} color="#1F487C" />
                      )}
                    </div>
                    {isToggled && item.id == btnid ? (
                      <div className="text-[#1F487C] ml-[1.5vw] my-[1vw] font-body text-[3.25vw]">
                        {item.ans}
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                ))}
              </div>
            </div>

          </div>
        </>
      ) : (
        <div className="flex flex-col gap-y-[5vw] justify-center items-center">
          <img src={empty} className="w-[50vw] h-[50vw]" />
          <div className="flex flex-col gap-y-[5vw]  items-center justify-center">
            <label className="text-[4vw] text-[#1F487C] font-bold w-full">
              Looks empty, you’ve no cancelled bookings
            </label>
            <label className="text-[4vw]  text-[#1F487C] items-center gap-[0.5vw] w-full">
              Looks like you don’t have any cancelled trips
            </label>
            <button className="bg-[#1F487C] mt-[1vw] w-[32vw] text-white font-bold text-[4vw] h-[8vw] rounded-full">
              Plan a Trip
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
