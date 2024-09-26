import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import PassengerList from "./PassengerList";
import { useDispatch } from "react-redux";
import { GetCancelTicket } from "../../../../Api/MyAccounts/MyBookings";
 
const validationSchema = Yup.object({
  ticketNumber: Yup.string().required(
    "Please enter your Ticket Number (from your ticket)"
  ),
  phoneNumber: Yup.string()
    .required("Phone Number is required")
    .matches(/^[0-9]+$/, "Phone Number must be a number")
    .min(10, "Phone Number must be at least 10 digits"),
});
 
const CancelIndex = () => {
 
  const [showTable,setShowtable] = useState(false)
  const [spinning,setSpinning] = useState(false)
 
  const dispatch = useDispatch();
  const handleSubmit = (values) => {
    setSpinning(true)
    console.log("Form Data:", values);
   GetCancelTicket(dispatch, values.ticketNumber, values.phoneNumber,setSpinning)
   setShowtable(true)
  };

  
 
  return (
    <div className="w-full h-auto bg-white rounded-[.9vw] border-b-[0.1vw] ">
      <Formik
        initialValues={{
          ticketNumber: "",
          phoneNumber: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form>
            <div >
              <div className="text-center text-[#1F487C] p-[1vw] font-bold text-[1.5vw]">
                Cancel Your Ticket
              </div>
              <div className="flex justify-evenly mt-[2vw]">
                <div className="relative">
                  <Field
                    name="ticketNumber"
                    placeholder="Ticket Number *"
                    type="text"
                    className="border-[.1vw] rounded-[.5vw] w-[23vw] text-[#1F487C] text-[1.2vw] h-[3vw] border-gray-400 pl-[1vw] placeholder-[#1F487C]"
                  />
                  <ErrorMessage
                    name="ticketNumber"
                    component="div"
                    className="text-red-600 text-[.9vw] absolute top-full left-0 mt-1"
                  />
                </div>
                <div className="relative">
                  <Field
                    name="phoneNumber"
                    placeholder="Phone Number *"
                    type="text"
                    className="border-[.1vw] rounded-[.5vw] w-[23vw] text-[#1F487C] text-[1.2vw] h-[3vw] border-gray-400 pl-[1vw] placeholder-[#1F487C]"
                  />
                  <ErrorMessage
                    name="phoneNumber"
                    component="div"
                    className="text-red-600 text-[.9vw] absolute top-full left-0 mt-1"
                  />
                </div>
                <button
                  type="submit"
               
                  className="bg-[#1F487C] text-[1.3vw] text-white rounded-[1.5vw] w-[11vw] h-[3vw]"
                >
                  submit
                </button>
              </div>
              {/* <div className="flex justify-center gap-x-[5vw] mt-[3vw]">
              <button
                type="submit"
                className="bg-[#1F487C] text-white rounded-[1.5vw] w-[16vw] h-[3vw]"
              >
                Select Passengers
              </button>
              <button
                type="submit"
                className="bg-[#1F487C] text-white rounded-[1.5vw] w-[11vw] h-[3vw]"
              >
                submit
              </button>
            </div> */}
              <div className="mt-[3vw]">
               
              </div>
            </div>
          </Form>
        )}
      </Formik>
      {
        showTable === true ?<div className="px-[3.5vw] pb-[2vw]"><PassengerList spinning={spinning} setSpinning={setSpinning} /></div>   :""
      }
     
    </div>
  );
};
 
export default CancelIndex;