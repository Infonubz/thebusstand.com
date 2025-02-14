import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import PassengerList from "./PassengerList";
import { useDispatch } from "react-redux";
import {
  PreCancelTicket,
  ViewTicketById,
} from "../../../../Api-Abhibus/MyAccount/ViewTicket";
// import { GetCancelTicket } from "../../../../Api/MyAccounts/MyBookings";
import empty from "../../../../Assets/CommonImages/empty.png";
import { useNavigate } from "react-router";

const validationSchema = Yup.object({
  ticketNumber: Yup.string().required(
    "Please Enter Your Ticket Number (From Your Ticket)"
  ),
  phoneNumber: Yup.string()
    .required("Phone Number Is Required")
    .matches(/^[0-9]+$/, "Phone Number must be a number")
    .min(10, "Phone Number must be at least 10 digits"),
});

const CancelIndex = () => {
  const [showTable, setShowtable] = useState(false);
  const [spinning, setSpinning] = useState(false);
  const [passengerDetails, setPassengerDetails] = useState("");
  const dispatch = useDispatch();
  const [info, setInfo] = useState("");
  const handleSubmit = async (values) => {
    console.log("Form Data:", values);
    // GetCancelTicket(
    //   dispatch,
    //   values.ticketNumber,
    //   values.phoneNumber,
    //   setSpinning
    // );
    setInfo(values);
    try {
      // const data = await PreCancelTicket(values);
      // console.log(data,"datadatadatadatadata");
      const response = await ViewTicketById(values?.ticketNumber, setSpinning);
      setPassengerDetails(response?.ticketInfo);
      console.log(response, "responseresponse");
    } catch {
      console.log("hi");
    }
    setShowtable(true);
  };

  const handleKeyDown = (event, values) => {
    // Allow control keys like Backspace, Delete, Tab, etc.
    const isControlKey = [
      "Backspace",
      "Tab",
      "ArrowLeft",
      "ArrowRight",
      "Delete",
    ].includes(event.key);
    if (isControlKey) {
      return;
    }

    // Allow numeric characters (0-9)
    if (!/^[0-9]$/.test(event.key)) {
      event.preventDefault(); // Prevent the key if it's not a number
    }
    if (event.key === "Enter") {
      handleSubmit(values);
    }
  };
  const navigation = useNavigate();
  return (
    <div className="w-full md:h-auto h-[60vw] pb-[2.5vw] bg-white shadow-lg shadow-gray-400 rounded-[2vw] md:rounded-[.9vw] border-b-[0.1vw] ">
      <Formik
        initialValues={{
          ticketNumber: "",
          phoneNumber: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ handleSubmit, setFieldValue, handleChange, values }) => (
          <Form>
            <div>
              <div className="text-center text-[#1F487C] p-[1vw] font-bold text-[4.2vw] md:text-[1.5vw] pt-[1vw]">
                Cancel Your Ticket
              </div>
              <div
                className={`grid grid-rows-3 gap-y-[6vw] md:gap-y-[0vw] justify-center md:flex md:justify-evenly mt-[5vw] md:mt-[1vw]`}
              >
                <div className={`relative`}>
                  <Field
                    name="ticketNumber"
                    placeholder="Ticket Number *"
                    autoComplete="off"
                    type="text"
                    className={`placeholder:text-[3.6vw] md:placeholder:text-[1.2vw] border-[.1vw] rounded-[1.5vw] md:rounded-[.5vw] w-[70vw] h-[10vw] 
                      md:w-[23vw] md:h-[3vw] border-gray-400 pl-[1vw] text-[#1F487C] placeholder-[#1F487C] md:text-[1.2vw] text-[3.2vw] outline-none`}
                  />
                  <ErrorMessage
                    name="ticketNumber"
                    component="div"
                    className="text-red-500 text-[.9vw] absolute top-full left-0 mt-1"
                  />
                </div>
                <div className={`relative`}>
                  <Field
                    name="phoneNumber"
                    placeholder="Phone Number *"
                    type="text"
                    maxLength={10}
                    autoComplete="off"
                    onKeyDown={(event) => handleKeyDown(event, values)}
                    className={`placeholder:text-[3.6vw] md:placeholder:text-[1.2vw] border-[.1vw] rounded-[1.5vw] md:rounded-[.5vw] w-[70vw] h-[10vw] 
                      md:w-[23vw] md:h-[3vw] border-gray-400 pl-[1vw] text-[#1F487C] placeholder-[#1F487C] md:text-[1.2vw] text-[3.2vw] outline-none`}
                  />
                  <ErrorMessage
                    name="phoneNumber"
                    component="div"
                    className="text-red-500 text-[.9vw] absolute top-full left-0 mt-1"
                  />
                </div>
                <div className={`relative flex justify-center`}>
                  <button
                    type="submit"
                    className={`bg-[#1F487C] md:text-[1.1vw] text-[3.5vw] text-white rounded-[5vw] w-[25vw] h-[10vw] md:w-[11vw] md:h-[3vw]`}
                  >
                    Submit
                  </button>
                </div>
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
              <div className="mt-[2vw]"></div>
            </div>
          </Form>
        )}
      </Formik>
      {showTable === true && passengerDetails?.ticket_det?.length > 0 ? (
        <div className="px-[3.5vw] pb-[2vw]">
          <PassengerList
            spinning={spinning}
            setSpinning={setSpinning}
            passengerDetails={passengerDetails}
            info={info}
          />
        </div>
      ) : (
        showTable === true &&
        <div className="flex flex-col gap-x-[3vw] items-center mt-[13vw] md:mt-[0vw] md:pt-[1.5vw] justify-center">
          <img
            src={empty}
            alt="empty"
            className="md:w-[8vw] md:h-[9vw] h-[24vw] w-[22vw]"
          />
          <div className="flex flex-col gap-y-[0.5vw] items-center pt-[2vw] justify-center">
            <label className="text-[4.2vw] md:text-[2vw] text-[#1F487C] font-bold text-center">
              Invalid Ticket Number or Phone Number
            </label>
            <label className="flex text-[3.6vw] md:text-[1.1vw] text-[#1F487C] items-center gap-[0.5vw]">
              Looks like given details are invalid
            </label>
            <button
              onClick={() => navigation("/")}
              className="bg-[#1F487C] md:mt-[1vw] mt-[3vw] md:w-[12vw] w-[30vw] text-white font-bold md:text-[1.1vw] text-[3.6vw] md:h-[3vw] h-[8vw] rounded-full"
            >
              Plan a Trip
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CancelIndex;
