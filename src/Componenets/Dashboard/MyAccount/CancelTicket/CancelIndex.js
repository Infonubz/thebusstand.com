import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import PassengerList from "./PassengerList";
import { useDispatch, useSelector } from "react-redux";
import {
  PreCancelTicket,
  ViewTicketById,
} from "../../../../Api-Abhibus/MyAccount/ViewTicket";
// import { GetCancelTicket } from "../../../../Api/MyAccounts/MyBookings";
import empty from "../../../../Assets/CommonImages/empty.png";
import { Await, useNavigate } from "react-router";
import dayjs from "dayjs";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import ModalPopup from "../../../Common/Modal/Modal";
import { FaCheckCircle } from "react-icons/fa";
import { Get_TBS_Booking_details } from "../../../../Api-TBS/Dashboard/Dashboard";
const validationSchema = Yup.object({
  ticketNumber: Yup.string().required(
    "Please Enter Your Ticket Number (From Your Ticket)"
  ).matches(/^\S+$/, "Ticket Number cannot contain spaces"),
  // phoneNumber: Yup.string()
  //   .required("Phone Number Is Required")
  //   .matches(/^[0-9]+$/, "Phone Number must be a number")
  //   .min(10, "Phone Number must be at least 10 digits"),
});

const CancelIndex = () => {
  const tbs_ticket_details = useSelector((state) => state?.tbs_booking_details);
  const [showTable, setShowtable] = useState(false);
  const [spinning, setSpinning] = useState(false);
  const [passengerDetails, setPassengerDetails] = useState("");
  const [cancellationPolicy, setCancellationPolicy] = useState("");
  const [formValues, setFormValues] = useState({
    ticketNo: "",
    phoneNo: "",
  });
  const [cancellResModal, setCancellResModal] = useState(false);
  const [cancelResponse, setCancelResponse] = useState("");

  console.log(formValues, "responsegggggggggg");
  const dispatch = useDispatch();
  const [info, setInfo] = useState("");
  const [calArrival, setCalArrival] = useState({
    journeyDate: "",
    starTime: "",
    endTime: "",
  });
    const tbs_discount = useSelector((state) => state?.live_per);

  const closeDeleteModal = () =>{
    setCancellResModal(false)
  }
  const handleSubmit = async (values) => {
    // GetCancelTicket(
    //   dispatch,
    //   values.ticketNumber,
    //   values.phoneNumber,
    //   setSpinning
    // );
    setInfo(values);
    try {
      await Get_TBS_Booking_details(values.ticketNumber, dispatch);
      const data = await PreCancelTicket(values ,tbs_ticket_details?.mobile);
      setCancellationPolicy(data);
      console.log(data, "datadatadatadatadatsdsdsdzfdghfga");
      const response = await ViewTicketById(values?.ticketNumber, setSpinning);
      setPassengerDetails(response?.ticketInfo);
      setCalArrival({
        journeyDate: response?.ticketInfo?.originStartTime,
        starTime: response?.ticketInfo?.Start_Time,
        endTime: response?.ticketInfo?.Arr_Time,
      });
    } catch {}
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

  const [calculatedDate, setCalculatedDate] = useState("");
  const getDaySuffix = (day) => {
    // Check for the special case of 11th, 12th, and 13th
    if (day >= 11 && day <= 13) return "th";

    // Use the last digit of the day to determine the suffix
    switch (day % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };
  const ConvertDate = (date) => {
    // Get the day of the month
    const day = dayjs(date).date();

    // Get the suffix for the day (st, nd, rd, th)
    const dayWithSuffix = day + getDaySuffix(day);

    // Format the date to 'Thu, 6th Feb 2025'
    const formattedDate = dayjs(date).format(`ddd, MMM YYYY`);
    // const formattedDate = format(new Date(calculatedDate), `EEE, MMM yyyy`);
    const dateParts = formattedDate.split(" ");
    dateParts.splice(1, 0, `${dayWithSuffix}`);
    const modifiedDate = dateParts.join(" ");
    console.log(date, "modfuhdifhdataadff");
    return modifiedDate;
  };

  const calculateArrivalDate = (boardingDateTime, arrTime) => {
    // Parse the boarding date and time (in "YYYY-MM-DD HH:mm" format)
    const [datePart, timePart] = boardingDateTime.split(" ");
    const [year, month, day] = datePart.split("-");
    const [startHours, startMinutes] = timePart.split(":").map(Number);

    // Create a Date object with the parsed values
    const journeyDateObj = new Date(
      year,
      month - 1,
      day,
      startHours,
      startMinutes
    );

    // Extract hours and minutes from Arrival Time (in "HH:mm:ss" format)
    const [arrHours, arrMinutes, arrSeconds] = arrTime.split(":").map(Number);

    // Calculate the arrival time by adding hours and minutes from "Arrival_Time"
    const arrivalDateObj = new Date(journeyDateObj);
    arrivalDateObj.setHours(arrivalDateObj.getHours() + arrHours);
    arrivalDateObj.setMinutes(arrivalDateObj.getMinutes() + arrMinutes);
    arrivalDateObj.setSeconds(arrivalDateObj.getSeconds() + arrSeconds);

    return arrivalDateObj;
  };

  useEffect(() => {
    if (passengerDetails && calArrival) {
      // alert("heieei")
      const values = calculateArrivalDate(
        calArrival?.journeyDate,
        calArrival?.endTime
      );
      console.log(values, "vashdfkjdhkjfsdd");
      setCalculatedDate(values);
      // setShowModal(true);
      // console.log((ticketDetails?.ticketInfo?.Journey_Date, ticketDetails?.ticketInfo?.Start_Time, ticketDetails?.ticketInfo?.Arr_Time), "helldfhkdxjhfkdjhfkxdjhf");
    }
  }, [passengerDetails]);

  console.log(cancelResponse, "thedate");


  return (
    <div
      className={`w-full md:h-auto h-auto md:pb-[0vw] pb-[2vw] ${
        passengerDetails?.ticket_det?.length > 0 ? "pb-[0vw]" : "pb-[2.5vw]"
      }   bg-white shadow-lg shadow-gray-400 rounded-[2vw] md:rounded-[.9vw] border-b-[0.1vw] `}
    >
      <Formik
        initialValues={{
          ticketNumber: formValues?.ticketNo ? formValues?.ticketNo : "",
          phoneNumber: formValues?.phoneNo ? formValues?.phoneNo : "",
        }} 
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ handleSubmit, setFieldValue, resetForm, handleChange, values }) => (
          <Form onSubmit={handleSubmit}>
            <div>
              <div className="text-center text-[#1F487C] p-[1vw] font-bold text-[4.2vw] md:text-[1.5vw] pt-[1vw]">
                Cancel Your Ticket
              </div>
              <div
                className={`grid grid-rows-2 gap-y-[6vw] md:gap-y-[0vw] justify-center md:flex md:justify-evenly mt-[5vw] md:mt-[1vw]`}
              >
                <div className={`relative`}>
                  <Field
                    name="ticketNumber"
                    placeholder="Ticket Number *"
                    autoComplete="off"
                    type="text"
                    value={formValues?.ticketNo}
                    onChange={(e) => {
                      setFieldValue("ticketNumber", e.target.value);
                      setFormValues((prev) => ({
                        ...prev,
                        ticketNo: e.target.value,
                      }));
                    }}
                    className={`placeholder:text-[3.6vw] md:placeholder:text-[1.2vw] border-[.1vw] rounded-[1.5vw] md:rounded-[.5vw] w-[70vw] h-[10vw] 
                      md:w-[23vw] md:h-[3vw] border-gray-400 pl-[1vw] text-[#1F487C] placeholder-[#1F487C] md:text-[1.2vw] text-[3.2vw] outline-none`}
                  />
                  <ErrorMessage
                    name="ticketNumber"
                    component="div"
                    className="text-red-500 text-[2.8vw] md:text-[0.9vw] absolute top-full left-0 mt-1"
                  />
                </div>
                {/* <div className={`relative`}>
                  <Field
                    name="phoneNumber"
                    placeholder="Phone Number *"
                    type="text"
                    maxLength={10}
                    autoComplete="off"
                    value={formValues?.phoneNo}
                    onChange={(e) => {
                      setFieldValue("phoneNumber", e.target.value);
                      setFormValues((prev) => ({
                        ...prev,
                        phoneNo: e.target.value,
                      }));
                    }}
                    onKeyDown={(event) => handleKeyDown(event, values)}
                    className={`placeholder:text-[3.6vw] md:placeholder:text-[1.2vw] border-[.1vw] rounded-[1.5vw] md:rounded-[.5vw] w-[70vw] h-[10vw] 
                      md:w-[23vw] md:h-[3vw] border-gray-400 pl-[1vw] text-[#1F487C] placeholder-[#1F487C] md:text-[1.2vw] text-[3.2vw] outline-none`}
                  />
                  <ErrorMessage
                    name="phoneNumber"
                    component="div"
                    className="text-red-500 md:text-[0.9vw] text-[2.75vw] absolute top-full left-0 mt-1"
                  />
                </div> */}
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
              <div className="mt-[1.5vw]"></div>
            </div>
          </Form>
        )}
      </Formik>
      <div>
      {spinning ? (
        // <div
        //   style={{
        //     position: "fixed",
        //     top: 0,
        //     left: 0,
        //     width: "100%",
        //     height: "100%",
        //     // background: "rgba(0, 0, 0, 0.2)",
        //     display: "flex",
        //     justifyContent: "center",
        //     alignItems: "center",
        //     zIndex: 1000,
        //   }}
        // >
        <Spin
          className=""
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
          spinning={spinning}
          indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />}
        />
      ) :
      <> 
      {showTable === true && passengerDetails?.ticket_det?.length > 0 && cancellationPolicy?.status === "success" ? (
        <div className="md:px-[3.5vw] md:pb-[2vw] md:mt-0 mt-[7.5vw]">
          <PassengerList
            spinning={spinning}
            setSpinning={setSpinning}
            passengerDetails={passengerDetails}
            setPassengerDetails={setPassengerDetails}
            info={info}
            cancellationPolicy={cancellationPolicy}
            droppingDate={calculatedDate && ConvertDate(calculatedDate)}
            setShowtable={setShowtable}
            setFormValues={setFormValues}
            mobileno={tbs_ticket_details?.mobile}
            setCancellResModal={setCancellResModal}
            setCancelResponse={setCancelResponse}
          />
        </div>
      ) : (
        showTable === true && (
          <div className="flex flex-col gap-x-[3vw] items-center md:pb-[2.5vw] mt-[13vw] md:mt-[0vw] md:pt-[1.5vw] justify-center">
            <img
              src={empty}
              alt="empty"
              className="md:w-[8vw] md:h-[9vw] h-[24vw] w-[22vw]"
            />
            <div className="flex flex-col gap-y-[0.5vw] items-center pt-[2vw] justify-center">
              <label className="text-[4.2vw] md:text-[2vw] text-[#1F487C] font-bold text-center">
                {/* Invalid Ticket Number or Phone Number */}
                Invalid ticket number or cancellation policy might have been expired.
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
        )
      )}
      </>
}
    </div>
    <ModalPopup
        show={cancellResModal}
        onClose={closeDeleteModal}
        height="auto"
        width="auto"
        closeicon={false}
        className="md:block hidden"
      >
       <div className="text-[#1F487C] md:w-[25vw] md:h-[13vw] h-[35vw] w-[70vw]">
  {/* <div className="font-bold text-center text-[3.5vw] md:text-[1.2vw] pb-[3vw] md:pb-[2vw] flex items-center gap-x-[.5vw]"><span><FaCheckCircle  className="md:text-[1.5vw] text-[5.5vw]" color="green" /></span> <span>{cancelResponse?.message}</span></div> */}

  {/* <div className={`grid grid-cols-2 gap-x-[1vw] md:pl-[1vw] pl-[4vw] md:pb-[1vw] pb-[3vw] text-[3vw] md:text-[1vw] ${cancelResponse?.NewPNR ? "" :"md:pb-[3vw] pb-[6vw]"}`}> */}
    <div className="col-span-1 flex flex-col font-bold gap-y-[2vw] md:gap-y-[1vw]">
      {cancelResponse?.NewPNR ? (<div>New Ticket No :</div>) : "" } 
      <div>Refund Amount :</div>
    </div>
<div>{cancelResponse}</div>
    <div className="col-span-1 flex flex-col gap-y-[2vw] md:gap-y-[1vw]">
     {/* {cancelResponse?.NewPNR ? (<div>{cancelResponse?.NewPNR}</div>) : "" }  */}
      {/* <div>{Math.round(cancelResponse?.return_amount)}</div> */}
      {/* <div>{tbs_discount}</div> */}
      {/* <div>{Math.round(cancelResponse?.return_amount - ( cancelResponse?.return_amount * (tbs_discount / 100 )))}</div> */}
    </div>
  </div>

  <div className="text-center mt-[1vw] md:px-[0vw] px-[1vw] text-[2.6vw] md:text-[.9vw]">The refund amount will be returned to your account within 5 - 7 working days</div>
{/* </div> */}

      </ModalPopup>
    </div>
  );
};

export default CancelIndex;
