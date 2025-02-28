import { Modal, Tooltip } from "antd";
import { useEffect, useRef, useState } from "react";
import arrow from "../../../../Assets/CommonImages/arrow.png";
import cut from "../../../../Assets/CommonImages/Cut.png";
import moment from "moment";
// import { FaAngleRight } from "react-icons/fa6";
import QRCode from "react-qr-code";
import { capitalizeFirstLetter } from "../../../Common/Common-Functions/Captalization.js";
import { savePDF } from "@progress/kendo-react-pdf";
import BottomNavbar from "../../../Common/Mobile-NavBar/BottomNavBar.js";
import dayjs from "dayjs";
import ModalPopup from "../../../Common/Modal/Modal.js";
import { useSelector } from "react-redux";
import Barcode from "react-barcode";
import { FiDownload } from "react-icons/fi";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { calculateDiscountedFare } from "../../../Common/Common-Functions/TBS-Discount-Fare";
import { RatingFeedBack } from "../../../Common/Rating&FeedBack/Ratings&Feedback.js";
import Logo from "../../../../Assets/Logo/tbs_logo.png";
import { use } from "react";
import { useLocation } from "react-router";

// function convertTo12Hour(timeString) {
//   if (!timeString) {
//     return "";
//   }

//   const [hours, minutes] = timeString.split(":");
//   let hour = parseInt(hours);
//   // const ampm = hour >= 12 ? "PM" : "AM";

//   hour = hour % 12 || 12;
//   return `${hour}:${minutes}`;
// }

export default function MobileViewTicket({ ticketDetails, droppingDate }) {
  const location = useLocation();
  const ticket_Details = location?.state?.ticketDetails;
  const ticketInfo = ticket_Details?.ticketInfo;
  const dropping_Date = location?.state?.droppingDate;
  const ticketnumber = location?.state?.ticketNo;
  const ticketlist = useSelector((state) => state?.get_ticket_detail);
  const tbs_discount = useSelector((state) => state?.live_per);
  const componentRef = useRef();
  const colorcode = {
    theme: "#1F4B7F",
  };

  function generateRandomId(prefix, length) {
    return prefix;
  }

  const calculateDuration = (startTime, endTime) => {
    // Parse start and end times using Moment.js
    const start = moment(startTime, "hh:mm A"); // 12-hour format (e.g., "08:20 PM")
    const end = moment(endTime, "hh:mm A"); // 12-hour format (e.g., "04:00 AM")

    // If the end time is before the start time, add 1 day to the end time
    if (end.isBefore(start)) {
      end.add(1, "days"); // Add a day to end time
    }

    // Calculate the duration between the two times
    const duration = moment?.duration(end?.diff(start));

    // Get the hours and minutes from the duration
    const hours = duration?.hours();
    const minutes = duration?.minutes();

    return `${hours}h ${minutes}m`;
  };

  const convertTo12HourFormat = (time) => {
    if (!time || typeof time !== "string") {
      throw new Error("Invalid input: time should be a string");
    }

    const [hours, minutes] = time.split(":");

    if (!hours || !minutes) {
      throw new Error("Invalid time format");
    }

    const period = hours >= 12 ? "PM" : "AM";
    const formattedHour = hours % 12 || 12; // Convert 0 hours to 12 (for 12:00 AM)

    return `${formattedHour}:${minutes} ${period}`;
  };

  const [calArrival, setCalArrival] = useState({
    journeyDate: ticket_Details?.ticketInfo?.originStartTime,
    starTime: ticket_Details?.ticketInfo?.Start_Time,
    endTime: ticket_Details?.ticketInfo?.Arr_Time,
  });

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

  const [calculatedDate, setCalculatedDate] = useState("");

  const ConvertDate = (date) => {
    // Get the day of the month
    const day = dayjs(date)?.date();

    // Get the suffix for the day (st, nd, rd, th)
    const dayWithSuffix = day + getDaySuffix(day);

    // Format the date to 'Thu, 6th Feb 2025'
    const formattedDate = dayjs(date)?.format(`ddd, MMM YYYY`);
    // const formattedDate = format(new Date(calculatedDate), `EEE, MMM yyyy`);
    const dateParts = formattedDate?.split(" ");
    dateParts?.splice(1, 0, `${dayWithSuffix}`);
    const modifiedDate = dateParts?.join(" ");
    return modifiedDate;
  };

  const calculateArrivalDate = (boardingDateTime, arrTime) => {
    if (!boardingDateTime || !arrTime) {
      throw new Error(
        "Invalid input: boardingDateTime and arrTime must be provided."
      );
    }

    // Parse the boarding date and time (in "YYYY-MM-DD HH:mm" format)
    const [datePart, timePart] = boardingDateTime?.split(" ");
    if (!datePart || !timePart) {
      throw new Error(
        'Invalid boardingDateTime format. Expected "YYYY-MM-DD HH:mm".'
      );
    }

    const [year, month, day] = datePart?.split("-");
    const [startHours, startMinutes] = timePart?.split(":").map(Number);
    if (isNaN(startHours) || isNaN(startMinutes)) {
      throw new Error("Invalid time format in boardingDateTime.");
    }

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
    if (isNaN(arrHours) || isNaN(arrMinutes) || isNaN(arrSeconds)) {
      throw new Error("Invalid time format in arrTime.");
    }

    // Calculate the arrival time by adding hours and minutes from "arrTime"
    const arrivalDateObj = new Date(journeyDateObj);
    arrivalDateObj.setHours(arrivalDateObj.getHours() + arrHours);
    arrivalDateObj.setMinutes(arrivalDateObj.getMinutes() + arrMinutes);
    arrivalDateObj.setSeconds(arrivalDateObj.getSeconds() + arrSeconds);

    return arrivalDateObj;
  };

  useEffect(() => {
    if (ticket_Details?.status === "success" && calArrival) {
      setCalArrival({
        journeyDate: ticket_Details?.ticketInfo?.originStartTime,
        starTime: ticket_Details?.ticketInfo?.Start_Time,
        endTime: ticket_Details?.ticketInfo?.Arr_Time,
      });
      // if (ticketlist?.status === "success") {
      // alert("heieei")
      const values = calculateArrivalDate(
        ticket_Details?.ticketInfo?.originStartTime,
        ticket_Details?.ticketInfo?.Arr_Time
      );

      setCalculatedDate(values);
      //setShowModal(true);

      // }
    }
  }, [ticket_Details]);

  const LuxuryFind = (type) =>
    type?.toLowerCase().includes("volvo") ||
    type?.toLowerCase().includes("mercedes benz") ||
    type?.toLowerCase().includes("washroom") ||
    type?.toLowerCase().includes("bharatBenz") ||
    type?.toLowerCase().includes("luxury");

  const downloadPDF = () => {
    // setLoader(true);
    const capture = componentRef?.current;
    if (capture) {
      html2canvas(capture, {
        scale: 2, // Higher scale for better image quality
        useCORS: true, // For cross-origin resources (images from other domains)
        logging: true, // Optional, logs any warnings/errors
      }).then((canvas) => {
        const imgData = canvas.toDataURL("image/png"); // Image data URL

        const doc = new jsPDF("p", "mm", "a4");
        // Calculate the appropriate size of the image in the PDF
        const componentWidth = doc.internal.pageSize.getWidth();
        const componentHeight = doc.internal.pageSize.getHeight();

        // Add the image to the PDF with the correct dimensions
        doc.addImage(imgData, "PNG", 0, 0, componentWidth, componentHeight);

        // Save the PDF
        doc.save("receipt.pdf");
        //setLoader(false); // Stop loader after PDF is saved
      });
    } else {
      console.error("Element not found");
      //   setLoader(false);
    }
  };

  const handleDownloadClick = () => {
    const capture = componentRef.current;
    if (capture) {
      downloadPDF();
    } else {
      console.error("Element not found on button click.");
    }
  };
  const formatDate = (inputDate) => {
    // Extract parts from input
    const regex = /(\d{1,2})[a-z]{2} (\w{3}) (\d{4})/;
    const match = inputDate?.match(regex);

    if (!match) return "Invalid Date Format";

    const [, day, monthStr, year] = match;

    // Month mapping
    const monthMap = {
      Jan: "01",
      Feb: "02",
      Mar: "03",
      Apr: "04",
      May: "05",
      Jun: "06",
      Jul: "07",
      Aug: "08",
      Sep: "09",
      Oct: "10",
      Nov: "11",
      Dec: "12",
    };

    const month = monthMap[monthStr];

    return `${year}-${month}-${day.padStart(2, "0")}`;
  };
  const [ratingModal, setRatingModal] = useState(false);

  const closeRatingModal = () => {
    setRatingModal(false);
  };

  useEffect(() => {
    setTimeout(() => {
      if (ticketnumber != null) {
        setRatingModal(true);
      }
    }, [5000]);
  }, []);

  return (
    <>
      <div
        className={`h-screen ${
          ticketInfo?.bus_type_status === "luxury" ? "bg-[#FFEFCE]" : "bg-white"
        } `}
      >
        <div className={`p-[4vw] mb-[15vw] `}>
          {/* <Drawer
        // title="Basic Drawer"
        placement={"bottom"}
        closable={false}
        onClose={onClose}
        open={showModal}
        key={"bottom"}
        width={"100%"}
        height={"80%"}
      > */}
          <div className="my-[4vw]">
            {/* {ticket_Details.map((item)=>( */}
            <div
              ref={componentRef}
              id="capture"
              className={`h-auto w-full border-solid border-2 ${
                ticketInfo?.bus_type_status === "luxury"
                  ? "border-[#393939]"
                  : "border-[#1F487C]"
              }  rounded-t-[3.5vw]`}
            >
              <div
                className={`h-[40vw] w-full rounded-t-[3vw]`}
                style={{ backgroundColor: colorcode.theme }}
              >
                <div className={`grid grid-cols-12 px-[2vw]`}>
                  <div className={`pt-[2vw] col-span-5`}>
                    <label
                      className={`text-white uppercase text-[5vw] font-bold flex justify-center`}
                    >
                      {/* {ticket_Details?.departure_name?.slice(0, 3)}
                       */}
                      {/* {ticket_Details?.departure_name} */}
                      {/* Mahabalipuram */}
                      {ticketInfo?.source_name?.length > 11 ? (
                        <Tooltip
                          title={ticketInfo?.source_name}
                          placement="top"
                        >
                          {ticketInfo?.source_name?.slice(0, 11)}..
                        </Tooltip>
                      ) : (
                        <span>{ticketInfo?.source_name}</span>
                      )}
                    </label>

                    <p
                      className={`text-[4vw] text-white text-center font-semibold`}
                    >
                      {ticketInfo?.Journey_Date}
                    </p>
                  </div>
                  <div className="col-span-2 flex items-center">
                    <img src={arrow} alt="arrow" className="w-[15vw] h-[4vw]" />
                  </div>
                  <div className={`pt-[2vw] col-span-5`}>
                    <label
                      className={`text-white uppercase text-[5vw] font-bold flex justify-center`}
                    >
                      {/* {ticket_Details?.arrival_name?.slice(0, 3)} */}
                      {/* {ticket_Details?.arrival_name} */}
                      {ticketInfo?.dest_name?.length > 11 ? (
                        <Tooltip title={ticketInfo?.dest_name} placement="top">
                          {ticketInfo?.dest_name?.slice(0, 11)}..
                        </Tooltip>
                      ) : (
                        <span>{ticketInfo?.dest_name}</span>
                      )}
                    </label>
                    <p
                      className={`text-[4vw] text-center text-white font-semibold`}
                    >
                      {/* {dropping_Date?.length > 0 ? dropping_Date : ''} */}
                      {ConvertDate(calculatedDate)}
                    </p>
                  </div>
                </div>
                {/* <div className={`flex items-center`}> */}
                <p
                  className={`flex pt-[3vw] justify-center  items-center text-white text-[4.5vw] font-normal`}
                >
                  {`Ticket Number : ${ticketInfo?.Ticket_no}`}
                </p>
                <p
                  className={`flex pt-[2vw] justify-center font-normal items-center text-white text-[4.5vw]`}
                >
                  {`PNR : ${ticketInfo?.operator_pnr}`}
                </p>
                {/* </div> */}
              </div>
              <div
                className={`pl-[7vw] py-[3.5vw] ${
                  ticketInfo?.bus_type_status === "luxury"
                    ? "text-[#393939]"
                    : "text-black"
                }`}
              >
                <div className={`grid grid-cols-3 w-full`}>
                  <p className={`text-[4.5vw]`}>Name</p>
                  <p className={`text-[4.5vw]`}>Age/ Gender</p>
                  <p className={`text-[4.5vw] px-[8vw]`}>Seat</p>
                </div>
                {ticketInfo?.ticket_det?.length > 0
                  ? ticketInfo?.ticket_det?.map((v) => (
                      <div className={`grid grid-cols-3 w-full pt-[2vw]`}>
                        <p className={`text-[4vw] font-semibold`}>
                          {capitalizeFirstLetter(v?.Passenger_Name)}
                        </p>
                        <p className={`text-[4vw] font-semibold px-[6vw]`}>
                          {v?.Age}/ {capitalizeFirstLetter(v?.GENDER_TYPE[0])}
                        </p>
                        <p className={`text-[4vw] font-semibold px-[9vw]`}>
                          {v?.Seat_Num}
                        </p>
                      </div>
                    ))
                  : ""}
              </div>
              <div
                className={`border-dashed border-[0.4vw] ${
                  ticketInfo?.bus_type_status === "luxury"
                    ? "border-[#393939]"
                    : "border-[#1F487C]"
                } mt-[2vw] relative`}
              >
                <span className={`absolute left-[-1vw] top-[-5vw] z-[3]`}>
                  <div
                    className={`${
                      ticketInfo?.bus_type_status === "luxury"
                        ? "bg-[#FFEFCE] border-l-[#FFEFCE] border-[#393939]"
                        : "bg-[white] border-l-white border-[#1F487C]"
                    }  border  border-r-[1vw]  w-[5vw] h-[10vw] rounded-r-full `}
                  ></div>
                </span>
                <span className="absolute right-[-1vw] top-[-5.5vw] z-[1]">
                  <div
                    className={`${
                      ticketInfo?.bus_type_status === "luxury"
                        ? "border-[#393939] bg-[#FFEFCE] border-r-[#FFEFCE]"
                        : "border-[#1F487C] bg-[white] border-r-white"
                    }  border  border-l-[.8vw]  w-[5vw] h-[10vw] rounded-l-full `}
                  ></div>
                </span>
              </div>
              <div
                className={`h-auto flex flex-row items-center justify-center text-center w-full px-[1vw] pt-[2vw] ${
                  ticket_Details?.bus_type_status === "luxury"
                    ? "text-[#393939]"
                    : "text-black"
                }`}
              >
                {/* {ticket_Details?.logos != null && (
                                    // <img
                                    //     // src={`${apiUrlimage}${ticket_Details.logo}`}
                                    //     alt="logos"
                                    //     className={`w-[10vw] h-[10vw] rounded-full bg-white shadow-lg shadow-[rgba(238, 237, 237, 0.7)]`}
                                    // />
                                )} */}
                <label className={`text-[4.5vw] font-bold pt-[1.5vw] pl-[2vw]`}>
                  {ticketInfo?.operatorname}
                </label>
              </div>
              <div
                className={`grid grid-cols-7 px-[1vw] pt-[4vw] pb-[2vw] ${
                  ticketInfo?.bus_type_status === "luxury"
                    ? "text-[#393939]"
                    : "text-black"
                }`}
              >
                <div className="col-span-2 ">
                  <div
                    className={`flex flex-col pl-[1vw] gap-y-[1vw] text-left`}
                  >
                    <p
                      className={`text-[3.7vw] ${
                        ticketInfo?.bus_type_status === "luxury"
                          ? "text-[#393939]"
                          : "text-[#1F487C]"
                      } pt-[0.5vw] flex items-center`}
                    >
                      {/* {moment(ticket_Details?.departure_date).format("DD MMM")} */}
                      {ticketInfo?.Journey_Date}
                    </p>
                    <p className={`font-bold text-[4vw]`}>
                      {/* {ticket_Details?.Start_Time?.slice(0, 5)} */}
                      {convertTo12HourFormat(ticketInfo?.Start_Time)}
                    </p>
                    {/* <p className="text-[3.8vw] ">
                                            {" "}
                                            {ticket_Details?.Boarding_Place_Name}
                                        </p>
                                        <p className="text-[2.8vw] ">
                                            {" "}
                                            {ticket_Details?.Board_Halt_Time}
                                        </p> */}
                  </div>
                </div>
                <div
                  className={`col-span-3 flex-col items-center w-full justify-center`}
                >
                  <div
                    className={`col-span-2 h-full relative w-full flex  justify-center`}
                  >
                    <div className="absolute md:left-0 top-[2vw] w-[33vw] md:w-[18.5vw]">
                      <svg
                        className="w-[36vw] md:w-[19vw] h-[15vw] md:h-[2vw]"
                        viewBox="0 0 300 28"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <line
                          x1="172.258"
                          y1="13.6426"
                          x2="279.058"
                          y2="13.6426"
                          stroke={
                            ticketInfo?.bus_type_status === "luxury"
                              ? "#393939"
                              : "#1F4B7F"
                          }
                          stroke-width="2.71095"
                          stroke-dasharray="5.42 5.42"
                        />
                        <line
                          x1="10.2483"
                          y1="13.6426"
                          x2="111.618"
                          y2="13.6426"
                          stroke={
                            ticketInfo?.bus_type_status === "luxury"
                              ? "#393939"
                              : "#1F4B7F"
                          }
                          stroke-width="2.71095"
                          stroke-dasharray="5.42 5.42"
                        />
                        <ellipse
                          cx="6.12043"
                          cy="13.8221"
                          rx="5.82925"
                          ry="5.42191"
                          fill={
                            ticketInfo?.bus_type_status === "luxury"
                              ? "#393939"
                              : "#1F4B7F"
                          }
                        />
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M280.078 6.24612C280.553 5.805 281.321 5.805 281.796 6.24612L289.082 13.0235C289.557 13.4646 289.557 14.1798 289.082 14.621L281.796 21.3983C281.321 21.8395 280.553 21.8395 280.078 21.3983C279.604 20.9572 279.604 20.242 280.078 19.8009L286.506 13.8222L280.078 7.84357C279.604 7.40245 279.604 6.68725 280.078 6.24612Z"
                          fill={
                            ticketInfo?.bus_type_status === "luxury"
                              ? "#393939"
                              : "#1F4B7F"
                          }
                          stroke={
                            ticketInfo?.bus_type_status === "luxury"
                              ? "#393939"
                              : "#1F4B7F"
                          }
                          stroke-width="0.271095"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </div>
                    <div
                      style={{
                        zIndex: 2,
                      }}
                      className="relative md:h-[2.1vw] h-[8vw] w-[20vw] flex md:w-[5.5vw]
                                            text-white text-[3.5vw]  font-bold justify-center items-center top-[5.5vw] left-[1vw]"
                    >
                      <svg
                        className="w-[30vw] md:w-[40vw] h-[10vw] md:h-[10vw]"
                        viewBox="0 0 106 54"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M9.62178 0.374512C4.61028 0.374512 0.592041 4.3313 0.592041 9.26618V35.1452C0.592041 38.0402 2.93887 40.387 5.83382 40.387H11.5805C11.5805 43.9243 13.0076 47.3168 15.5477 49.818C18.0878 52.3193 21.5329 53.7245 25.1251 53.7245C28.7174 53.7245 32.1625 52.3193 34.7026 49.818C37.2427 47.3168 38.6698 43.9243 38.6698 40.387H69.6765C69.6765 43.9243 71.1035 47.3168 73.6436 49.818C76.1837 52.3193 79.6288 53.7245 83.2211 53.7245C86.8133 53.7245 90.2585 52.3193 92.7986 49.818C95.3387 47.3168 96.7657 43.9243 96.7657 40.387H100.554C103.449 40.387 105.795 38.0402 105.795 35.1452V9.26618C105.795 4.3313 101.777 0.374512 96.7657 0.374512H9.62178ZM25.1251 33.7182C26.9213 33.7182 28.6438 34.4208 29.9139 35.6715C31.1839 36.9221 31.8975 38.6183 31.8975 40.387C31.8975 42.1557 31.1839 43.8519 29.9139 45.1025C28.6438 46.3531 26.9213 47.0557 25.1251 47.0557C23.329 47.0557 21.6065 46.3531 20.3364 45.1025C19.0663 43.8519 18.3528 42.1557 18.3528 40.387C18.3528 38.6183 19.0663 36.9221 20.3364 35.6715C21.6065 34.4208 23.329 33.7182 25.1251 33.7182ZM83.2211 33.7182C85.0172 33.7182 86.7398 34.4208 88.0098 35.6715C89.2799 36.9221 89.9934 38.6183 89.9934 40.387C89.9934 42.1557 89.2799 43.8519 88.0098 45.1025C86.7398 46.3531 85.0172 47.0557 83.2211 47.0557C81.425 47.0557 79.7024 46.3531 78.4324 45.1025C77.1623 43.8519 76.4488 42.1557 76.4488 40.387C76.4488 38.6183 77.1623 36.9221 78.4324 35.6715C79.7024 34.4208 81.425 33.7182 83.2211 33.7182Z"
                          fill={
                            ticketInfo?.bus_type_status === "luxury"
                              ? "#393939"
                              : "#1F4B7F"
                          }
                        />
                      </svg>
                      <div className="absolute pb-[3vw]">
                        {ticketInfo?.duration}
                        {calculateDuration(
                          moment(ticketInfo?.Start_Time, "HH:mm:ss").format(
                            "hh:mm A"
                          ),
                          moment(ticketInfo?.Arr_Time, "HH:mm:ss").format(
                            "hh:mm A"
                          )
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className={`col-span-2`}>
                  <div
                    className={`flex flex-col gap-y-[1vw] text-right pr-[1vw]`}
                  >
                    <p
                      className={`text-[3.7vw] ${
                        ticketInfo?.bus_type_status === "luxury"
                          ? "text-[#393939]"
                          : "text-[#1F487C]"
                      } pt-[0.5vw] `}
                    >
                      {/* {dropping_Date?.length > 0 ? dropping_Date : ''} */}
                      {ConvertDate(calculatedDate)}
                    </p>
                    <p className={`font-bold text-[4vw]`}>
                      {/* {ticket_Details?.Arr_Time?.slice(0, 5)} */}
                      {convertTo12HourFormat(ticketInfo?.Arr_Time)}
                    </p>

                    {/* <p className="text-[3.8vw] ">
                                            {ticket_Details?.Boarding_Place_Name} (
                                            {ticket_Details?.dropping_Date})
                                        </p> */}
                  </div>
                </div>
              </div>
              <div className="px-[1vw] py-[3vw]">
                <div
                  className={`grid grid-cols-2 text-[4vw] font-bold ${
                    ticket_Details?.bus_type_status === "luxury"
                      ? "text-[#393939]"
                      : "text-[#1F487C]"
                  }`}
                >
                  <span className="flex justify-start">Boarding Point</span>
                  <span className="flex justify-end"> Dropping Point</span>
                </div>
                <div className="grid grid-cols-2 gap-x-[6vw]">
                  <div className={` row-span-1 justify-start`}>
                    <span>
                      <p className="text-[3.8vw]  break-words  ">
                        {" "}
                        {ticketInfo?.Boarding_Place_Name}
                      </p>
                      <p className="text-[2.8vw] ">
                        {" "}
                        {ticketInfo?.Board_Halt_Time}
                      </p>
                    </span>
                  </div>
                  <div className={` row-span-1 grid break-words`}>
                    <span className="place-items-end">
                      <p className="text-[3.8vw]   break-words    ">
                        {ticketInfo?.dest_name}
                      </p>
                      <p className="text-[2.8vw]  ">
                        {" "}
                        {convertTo12HourFormat(ticketInfo?.Arr_Time)}
                      </p>
                    </span>
                  </div>
                </div>
              </div>
              {/* <div
                                className={`border-dashed border-[0.4vw] ${ticket_Details?.bus_type_status === "luxury"
                                    ? "border-[#393939]"
                                    : "border-[#1F487C]"
                                    } mt-[2vw] relative`}
                            >
                                <span className={`absolute left-[-1vw] top-[-5vw] z-[1]`}>
                                    <div
                                        className={`${ticket_Details?.bus_type_status === "luxury"
                                            ? "bg-[#FFEFCE] border-l-[#FFEFCE] border-[#393939]"
                                            : "bg-[white] border-l-white border-[#1F487C]"
                                            }  border  border-r-[1vw]  w-[5vw] h-[10vw] rounded-r-full `}
                                    ></div>
                                </span>
                                <span className={`absolute right-[-1vw] top-[-5.5vw] z-[1]`}>
                                    <div
                                        className={`${ticketDetails?.bus_type_status === "luxury"
                                            ? "border-[#393939] bg-[#FFEFCE] border-r-[#FFEFCE]"
                                            : "border-[#1F487C] bg-[white] border-r-white"
                                            }  border  border-l-[.8vw]  w-[5vw] h-[10vw] rounded-l-full `}
                                    ></div>
                                </span>
                            </div>
                            <div
                                className={`flex flex-col items-center justify-center pl-[.8vw] pr-[2vw] py-[5vw]`}
                            >
                                <p
                                    className={`flex text-[4vw] ${ticketDetails?.bus_type_status === "luxury"
                                        ? "text-[#393939]"
                                        : "text-black"
                                        }`}
                                >
                                    Scan this QR code to get on the bus
                                </p>
                                <QRCode
                                    size={256}
                                    className={`flex pt-[2vw] w-[70vw] h-[30vw]`}
                                    value={generateRandomId("AXER", 12)}
                                    viewBox={`0 0 256 256`}
                                />
                            </div> */}
            </div>
            <div
              className={`flex flex-col relative items-center justify-center rounded-b-[3vw] border-dashed 
              border-t-[1vw] border-white h-[16vw] pl-[.8vw] pr-[2vw] mt-[1vw] py-[3vw]`}
              style={{
                transform: "rotate(2deg)",
                backgroundColor: colorcode?.theme,
              }}
              onClick={handleDownloadClick}
            >
              <p className={`flex text-white text-[4vw] font-semibold`}>
                DOWNLOAD TICKET
              </p>
              <img
                className={`absolute top-[-3vw] left-[15vw]`}
                src={cut}
                alt="cut"
              />
            </div>
            {/* ))} */}
          </div>
          {/* </Drawer> */}
        </div>
      </div>

      <BottomNavbar />

      <Modal
        open={ratingModal}
        onCancel={closeRatingModal}
        footer={null}
        maskClosable={false}
        height={"103vw"}
        width={"80vw"}
      >
        <RatingFeedBack setRatingModal={setRatingModal} />
      </Modal>
    </>
  );
}
