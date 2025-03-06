import { Modal, Tooltip } from "antd";
import { useEffect, useRef, useState } from "react";
import arrow from "../../../../Assets/CommonImages/arrow.png";
import blackarrow from "../../../../Assets/CommonImages/BlackArrow.png"
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
// import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { calculateDiscountedFare } from "../../../Common/Common-Functions/TBS-Discount-Fare";
import { RatingFeedBack } from "../../../Common/Rating&FeedBack/Ratings&Feedback.js";
import Logo from "../../../../Assets/Logo/tbs_logo.png";
import { use } from "react";
import { useLocation, useNavigate } from "react-router";
import busloading from "../../../../Assets/Gif/bus.gif";
import MOBILE_CARD from "../../../../Assets/BusList/Luxury_BG.png"
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

  const apiUrl = process.env.REACT_APP_API_URL;


  const navigation = useNavigate()
  const [on_reload, setOn_Reload] = useState(false);

  useEffect(() => {
    // Check localStorage to set the initial state
    const reloadState = localStorage.getItem('on_reload');
    if (reloadState === 'true') {
      setOn_Reload(true);
      localStorage.removeItem('on_reload'); // Clear the state after setting it
    }

    const handleBeforeUnload = (event) => {
      localStorage.setItem('on_reload', 'true');
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);


  useEffect(() => {
    if (on_reload === true) {
      navigation("/main", { state: { tabIndex: 3 } });
    }
  }, [navigation, on_reload])


  const location = useLocation();
  const ticket_Details = location?.state?.ticketDetails;
  const ticket = useSelector((state) => state?.get_ticket_detail)
  const ticketInfo = ticket_Details?.ticketInfo || ticket?.ticketInfo
  const dropping_Date = location?.state?.droppingDate;
  const ticketnumber = location?.state?.ticketNo;
  const ticketlist = useSelector((state) => state?.get_ticket_detail);
  const tbs_discount = useSelector((state) => state?.live_per);
  const spinning = location?.state?.spinning
  const componentRef = useRef();
  const colorcode = {
    theme: "#1F4B7F",
  };

  function generateRandomId(prefix, length) {
    return prefix;
  }

  const tbs_ticket_details = useSelector((state) => state?.tbs_booking_details);
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
    } else if (ticket?.status === "success" && calArrival) {
      setCalArrival({
        journeyDate: ticket?.ticketInfo?.originStartTime,
        starTime: ticket?.ticketInfo?.Start_Time,
        endTime: ticket?.ticketInfo?.Arr_Time,
      });
      // if (ticketlist?.status === "success") {
      // alert("heieei")
      const values = calculateArrivalDate(
        ticket?.ticketInfo?.originStartTime,
        ticket?.ticketInfo?.Arr_Time
      );

      setCalculatedDate(values);
      //setShowModal(true);

      // }
    }


  }, [ticket_Details, ticket]);

  const LuxuryFind = (type) =>
    type?.toLowerCase().includes("volvo") ||
    type?.toLowerCase().includes("mercedes benz") ||
    type?.toLowerCase().includes("washroom") ||
    type?.toLowerCase().includes("bharatBenz") ||
    type?.toLowerCase().includes("luxury");

  // const downloadPDF = () => {
  //   // setLoader(true);
  //   const capture = componentRef?.current;
  //   if (capture) {
  //     html2canvas(capture, {
  //       scale: 2, // Higher scale for better image quality
  //       useCORS: true, // For cross-origin resources (images from other domains)
  //       logging: true, // Optional, logs any warnings/errors
  //     }).then((canvas) => {
  //       const imgData = canvas.toDataURL("image/png"); // Image data URL

  //       const doc = new jsPDF("p", "mm", "a4");
  //       // Calculate the appropriate size of the image in the PDF
  //       const componentWidth = doc.internal.pageSize.getWidth();
  //       const componentHeight = doc.internal.pageSize.getHeight();

  //       // Add the image to the PDF with the correct dimensions
  //       doc.addImage(imgData, "PNG", 0, 0, componentWidth, componentHeight);

  //       // Save the PDF
  //       doc.save("receipt.pdf");
  //       //setLoader(false); // Stop loader after PDF is saved
  //     });
  //   } else {
  //     console.error("Element not found");
  //     //   setLoader(false);
  //   }
  // };

  // const handleDownloadClick = () => {
  //   const capture = componentRef.current;
  //   if (capture) {
  //     downloadPDF();
  //   } else {
  //     console.error("Element not found on button click.");
  //   }
  // };
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

  const getCityAbbreviation = (cityName) => {
    if (!cityName) return "";

    const words = cityName.split(" ");

    // If city has multiple words (e.g., "New Delhi" → "NDL")
    if (words.length > 1) {
      return words
        .map((word) => word.charAt(0))
        .join("")
        .toUpperCase();
    }

    // If single-word city, take first + two consonants (e.g., "Vijayawada" → "VJA")
    const letters = cityName.toUpperCase().replace(/[^A-Z]/g, ""); // Remove non-alphabet chars
    const vowels = ["A", "E", "I", "O", "U"];

    let abbreviation = letters.charAt(0); // First letter
    let consonants = letters
      .split("")
      .filter((letter) => !vowels.includes(letter));

    abbreviation += (consonants[1] || letters[1] || "").charAt(0); // Second letter
    abbreviation += (consonants[2] || letters[2] || "").charAt(0); // Third letter

    return abbreviation;
  };


  const handleDownloadClick = async (ticketid) => {
    // const capture = componentRef.current;
    // if (capture) {
    //   downloadPDF();
    // } else {
    //   console.error("Element not found on button click.");
    // }
    // const response = await DownloadTicket(ticketid);
    // navigate(`http://192.168.90.47:4001/api/downloadticket/${ticketid}`)
    const downloadUrl = `${apiUrl}/downloadticket/${ticketid}`;
    window.open(downloadUrl, "_blank");
    // console.log(ticketid, response?.data, "downloading_main_ticket");
    // return response?.data
  };



  return (
    <>
      {spinning  ?
        <div className="flex items-center justify-center h-full w-full">
          <img src={busloading} className="h-[50vw] w-[100vw]" alt="loadergif" />
        </div>
        :
        <>
          <div
            className={`h-screen ${LuxuryFind(ticketInfo?.bustype) === true ? "bg-[#E5FFF1]" : "bg-[#E5FFF1]"
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
                  className={`h-auto w-full border-solid border-2 ${LuxuryFind(ticketInfo?.bustype) === true
                    ? "border-[#D8A445]"
                    : "border-[#1F487C]"
                    }  rounded-t-[3.5vw]`}
                >
                  <div
                    className={`h-[40vw] w-full rounded-t-[3vw]`}
                    // style={{ backgroundColor: colorcode.theme }}
                    style={{
                      // backgroundColor: LuxuryFind(ticketInfo?.bustype) === true ? '#393939' : '#1F487C',
                      backgroundImage: ` ${LuxuryFind(ticketInfo?.bustype) === true ? `linear-gradient(to right, #F8C550, #FFEB76, #FFE173), url(${MOBILE_CARD})` : 'linear-gradient(to right, #1F487C, #1F487C, #1F487C)'} `,
                      backgroundBlendMode: "overlay"
                    }}
                  >
                    <div className={`grid grid-cols-12 px-[2vw]`}>
                      <div className={`pt-[2vw] col-span-5`}>
                        <label
                          className={`${LuxuryFind(ticketInfo?.bustype) === true ? 'text-black' : 'text-white'}  uppercase text-[7.5vw] font-extrabold flex justify-center tracking-[2vw]`}
                        >
                          {/* {ticket_Details?.departure_name?.slice(0, 3)}
                       */}
                          {/* {ticket_Details?.departure_name} */}
                          {/* Mahabalipuram */}
                          {/* {ticketInfo?.source_name?.length > 11 ? (
                            <Tooltip
                              title={ticketInfo?.source_name}
                              placement="top"
                            >
                              {ticketInfo?.source_name?.slice(0, 11)}..
                            </Tooltip>
                          ) : (
                            <span>{ticketInfo?.source_name}</span>
                          )} */}
                          {getCityAbbreviation(ticketInfo?.source_name)}
                        </label>

                        <p
                          className={`text-[4vw] ${LuxuryFind(ticketInfo?.bustype) === true ? 'text-black' : 'text-white'}  text-center font-semibold`}
                        >
                          {ticketInfo?.Journey_Date?.slice(5, 20)}
                        </p>
                      </div>
                      <div className="col-span-2 flex items-center">
                        <img src={LuxuryFind(ticketInfo?.bustype) === true ? blackarrow : arrow} alt="arrow" className="w-[15vw] h-[4vw]" />
                      </div>
                      <div className={`pt-[2vw] col-span-5`}>
                        <label
                          className={` ${LuxuryFind(ticketInfo?.bustype) === true ? 'text-black' : 'text-white'} uppercase text-[7.5vw] font-extrabold flex justify-center tracking-[2vw] `}
                        >
                          {/* {ticket_Details?.arrival_name?.slice(0, 3)} */}
                          {/* {ticket_Details?.arrival_name} */}
                          {/* {ticketInfo?.dest_name?.length > 11 ? (
                            <Tooltip title={ticketInfo?.dest_name} placement="top">
                              {ticketInfo?.dest_name?.slice(0, 11)}..
                            </Tooltip>
                          ) : (
                            <span>{ticketInfo?.dest_name}</span>
                          )} */}
                          {getCityAbbreviation(ticketInfo?.dest_name)}
                        </label>
                        <p
                          className={`text-[4vw] text-center ${LuxuryFind(ticketInfo?.bustype) === true ? 'text-black' : 'text-white'}  font-semibold`}
                        >
                          {/* {dropping_Date?.length > 0 ? dropping_Date : ''} */}
                          {ConvertDate(calculatedDate).slice(5, 20)}
                        </p>
                      </div>
                    </div>
                    {/* <div className={`flex items-center`}> */}
                    <p
                      className={`flex pt-[3vw] justify-center  items-center ${LuxuryFind(ticketInfo?.bustype) === true ? 'text-black' : 'text-white'}  text-[4.5vw] font-normal`}
                    >
                      {`Ticket Number : ${ticketInfo?.Ticket_no}`}
                    </p>
                    <p
                      className={`flex pt-[2vw] justify-center font-normal items-center ${LuxuryFind(ticketInfo?.bustype) === true ? 'text-black' : 'text-white'}  text-[4.5vw]`}
                    >
                      {`PNR : ${ticketInfo?.operator_pnr}`}
                    </p>
                    {/* </div> */}
                  </div>

                  <div className="bg-white">
                    <div
                      className={`h-auto flex flex-row items-center justify-center text-center w-full px-[1vw] ${LuxuryFind(ticketInfo?.bustype) === true
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
                      <label className={`text-[4.5vw] font-extrabold pt-[1.5vw] pl-[2vw]`}>
                        {ticketInfo?.operatorname}
                      </label>
                    </div>
                    <div
                      className={`h-auto flex flex-row items-center justify-center text-center w-full px-[1vw]  ${LuxuryFind(ticketInfo?.bustype) === true
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
                      <label className={`text-[3.5vw] font-semibold pt-[1.5vw] pl-[2vw]`}>
                        {ticketInfo?.bustype}
                      </label>
                    </div>


                    <div className="px-[3vw] pt-[3vw] pb-[1vw] ">
                      {/* <div
                        className={`grid grid-cols-2 text-[4.5vw] ${LuxuryFind(ticketInfo?.bustype) === true
                          ? "text-[#393939]"
                          : "text-black"
                          }`}
                      >
                        <span className="flex justify-start">BOARDING POINT</span>
                        <span className="flex justify-end">DROPPING POINT</span>
                      </div> */}
                      <div className="grid grid-cols-2 gap-x-[6vw]">
                        <div className={` row-span-1 justify-start`}>

                          <span className={`${LuxuryFind(ticketInfo?.bustype) === true
                            ? "text-[#393939]"
                            : "text-black"
                            }`}>
                            <p className="text-[4vw] font-bold">{ticketInfo?.source_name?.toUpperCase()}</p>
                            <p className="text-[3.8vw] font-extrabold break-words  ">
                              {" "}
                              {ticketInfo?.Boarding_Place_Name}
                            </p>
                            {/* <p className="text-[2.8vw] ">
                            {" "}
                            {ticketInfo?.Board_Halt_Time}
                          </p> */}
                          </span>
                        </div>
                        <div className={` row-span-1 grid break-words`}>

                          <span className={`place-items-end ${LuxuryFind(ticketInfo?.bustype) === true
                            ? "text-[#393939]"
                            : "text-black"
                            }`}>
                            <p className="text-[4vw] font-bold">{ticketInfo?.dest_name?.toUpperCase()}</p>
                            <p className="text-[3.8vw] font-extrabold break-words">
                              {ticketInfo?.dest_name}
                            </p>
                            {/* <p className="text-[2.8vw]  ">
                            {" "}
                            {convertTo12HourFormat(ticketInfo?.Arr_Time)}
                          </p> */}
                          </span>
                        </div>
                      </div>
                      <div
                        className={`grid grid-cols-7 pb-[2vw] ${LuxuryFind(ticketInfo?.bustype) === true
                          ? "text-[#393939]"
                          : "text-black"
                          }`}
                      >
                        <div className="col-span-2 ">
                          <div
                            className={`flex flex-col gap-y-[1vw] text-left`}
                          >
                            <p
                              className={`text-[3.7vw] ${LuxuryFind(ticketInfo?.bustype) === true
                                ? "text-[#393939]"
                                : "text-black"
                                } pt-[0.5vw] flex items-center`}
                            >
                              {/* {moment(ticket_Details?.departure_date).format("DD MMM")} */}
                              {ticketInfo?.Journey_Date.slice(5, 12)}
                            </p>
                            <p className={`font-extrabold text-[4vw]`}>
                              {/* {ticket_Details?.Start_Time?.slice(0, 5)} */}
                              {ticketInfo?.Start_Time ? convertTo12HourFormat(ticketInfo?.Start_Time) : null}
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
                            <div className="absolute md:left-0 top-[0.5vw] w-[33vw] md:w-[18.5vw]">
                              <svg
                                className="w-[37.5vw] md:w-[19vw] h-[16vw] md:h-[2vw]"
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
                                    LuxuryFind(ticketInfo?.bustype) === true
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
                                    LuxuryFind(ticketInfo?.bustype) === true
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
                                    LuxuryFind(ticketInfo?.bustype) === true
                                      ? "#393939"
                                      : "#1F4B7F"
                                  }
                                />
                                <path
                                  fill-rule="evenodd"
                                  clip-rule="evenodd"
                                  d="M280.078 6.24612C280.553 5.805 281.321 5.805 281.796 6.24612L289.082 13.0235C289.557 13.4646 289.557 14.1798 289.082 14.621L281.796 21.3983C281.321 21.8395 280.553 21.8395 280.078 21.3983C279.604 20.9572 279.604 20.242 280.078 19.8009L286.506 13.8222L280.078 7.84357C279.604 7.40245 279.604 6.68725 280.078 6.24612Z"
                                  fill={
                                    LuxuryFind(ticketInfo?.bustype) === true
                                      ? "#393939"
                                      : "#1F4B7F"
                                  }
                                  stroke={
                                    LuxuryFind(ticketInfo?.bustype) === true
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
                                            text-white text-[4vw] font-bold justify-center items-center top-[5.5vw] left-[1vw]"
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
                                    LuxuryFind(ticketInfo?.bustype) === true
                                      ? "#393939"
                                      : "#1F4B7F"
                                  }
                                />
                              </svg>
                              <div className="absolute pb-[3vw] font-extrabold">
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
                              className={`text-[3.7vw] ${LuxuryFind(ticketInfo?.bustype) === true
                                ? "text-[#393939]"
                                : "text-black"
                                } pt-[0.5vw] `}
                            >
                              {/* {dropping_Date?.length > 0 ? dropping_Date : ''} */}
                              {ConvertDate(calculatedDate).slice(5, 12)}
                            </p>
                            <p className={`font-extrabold text-[4vw]`}>
                              {/* {ticket_Details?.Arr_Time?.slice(0, 5)} */}
                              {ticketInfo?.Arr_Time ? convertTo12HourFormat(ticketInfo?.Arr_Time) : null}
                            </p>

                            {/* <p className="text-[3.8vw] ">
                                            {ticket_Details?.Boarding_Place_Name} (
                                            {ticket_Details?.dropping_Date})
                                        </p> */}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div
                      className={`border-dashed border-[0.4vw] ${LuxuryFind(ticketInfo?.bustype) === true
                        ? "border-[#393939]"
                        : "border-[#1F487C]"
                        } mt-[2vw] relative`}
                    >
                      <span className={`absolute left-[-1vw] top-[-5vw] z-[3]`}>
                        <div
                          className={`${LuxuryFind(ticketInfo?.bustype) === true
                            ? "bg-[#E5FFF1] border-l-white border-[#D8A445]"
                            : "bg-[#E5FFF1] border-l-white border-[#1F487C]"
                            }  border  border-r-[1vw]  w-[5vw] h-[10vw] rounded-r-full `}
                        ></div>
                      </span>
                      <span className="absolute right-[-1vw] top-[-5.5vw] z-[1]">
                        <div
                          className={`${LuxuryFind(ticketInfo?.bustype) === true
                            ? "border-[#D8A445] bg-[#E5FFF1] border-r-white"
                            : "border-[#1F487C] bg-[#E5FFF1] border-r-white"
                            }  border  border-l-[.8vw]  w-[5vw] h-[10vw] rounded-l-full `}
                        ></div>
                      </span>
                    </div>
                    <div
                      className={` py-[3.5vw] px-[2.5vw]  ${LuxuryFind(ticketInfo?.bustype) === true
                        ? "text-[#393939]"
                        : "text-black"
                        }`}
                    >
                      <div className={`flex w-full gap-x-[2.5vw] justify-between px-[1vw]`}>
                        <p className={`text-[4vw]`}>Traveller Name</p>
                        <p className={`text-[4vw]`}>Age & Gender</p>
                        <p className={`text-[4vw] `}>Seat No</p>
                      </div>
                      {ticketInfo?.ticket_det?.length > 0
                        ? ticketInfo?.ticket_det?.map((v) => (
                          <div className={`flex w-full gap-x-[2.5vw] justify-between pt-[2vw] px-[3vw]`}>
                            <p className={`text-[4vw] font-semibold break-words`}>
                              {capitalizeFirstLetter(v?.Passenger_Name)}
                            </p>
                            <p className={`text-[4vw] font-semibold flex justify-center`}>
                              {v?.Age}/ {capitalizeFirstLetter(v?.GENDER_TYPE[0])}
                            </p>
                            <p className={`text-[4vw] font-semibold flex justify-center pr-[2vw]`}>
                              {v?.Seat_Num}
                            </p>
                          </div>
                        ))
                        : ""}
                    </div>
                    <div
                      className={`border-dashed border-[0.4vw] ${LuxuryFind(ticketInfo?.bustype) === true
                        ? "border-[#393939]"
                        : "border-[#1F487C]"
                        } mt-[2vw] relative`}
                    >
                      <span className={`absolute left-[-1vw] top-[-5vw] z-[3]`}>
                        <div
                          className={`${LuxuryFind(ticketInfo?.bustype) === true
                            ? "bg-[#E5FFF1] border-l-white border-[#D8A445]"
                            : "bg-[#E5FFF1] border-l-white border-[#1F487C]"
                            }  border  border-r-[1vw]  w-[5vw] h-[10vw] rounded-r-full `}
                        ></div>
                      </span>
                      <span className="absolute right-[-1vw] top-[-5.5vw] z-[1]">
                        <div
                          className={`${LuxuryFind(ticketInfo?.bustype) === true
                            ? "border-[#D8A445] bg-[#E5FFF1] border-r-white"
                            : "border-[#1F487C] bg-[#E5FFF1] border-r-white"
                            }  border  border-l-[.8vw]  w-[5vw] h-[10vw] rounded-l-full `}
                        ></div>
                      </span>
                    </div>
                    <div className="w-full flex items-center justify-between px-[7.5vw] gap-[2vw] py-[3vw]">
                      <div className="relative py-[5vw] ">
                        <svg
                          className="md:w-[10vw] md:h-[4vw] w-[35vw] h-[12vw]"
                          viewBox="0 0 191 65"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <defs>
                            <linearGradient id="myGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                              <stop offset="0%" style={{ stopColor: "#F8C550", stopOpacity: 1 }} />
                              <stop offset="50%" style={{ stopColor: "#FFEB76", stopOpacity: 1 }} />
                              <stop offset="100%" style={{ stopColor: "#FFE173", stopOpacity: 1 }} />
                            </linearGradient>
                          </defs>
                          <path
                            d="M63.8027 21.9522V46.3763C63.8027 49.4454 66.3049 51.9629 69.3893 51.9629H104.074C107.159 51.9629 109.661 49.4446 109.661 46.3763V21.9522C109.661 18.883 107.159 16.3656 104.074 16.3656H69.3893C66.3049 16.3656 63.8027 18.8839 63.8027 21.9522Z"
                            fill={
                              LuxuryFind(ticketInfo?.bustype) ===
                                true
                                ? "url(#myGradient)"
                                : "#1F4B7F"
                            }
                          />
                          <path
                            d="M15.9289 2.65835C12.1005 0.255909 8.38323 -0.150284 5.5036 1.50614C-0.254637 4.80155 -0.571095 15.0933 4.76045 24.9138C5.82014 26.8619 7.05462 28.648 8.39942 30.2544C6.51724 33.8422 6.97543 38.339 9.87036 41.4234L28.4267 61.1303C30.1672 62.9812 32.6192 64.0527 35.1345 64.0527H181.215C186.356 64.0527 190.533 59.7672 190.533 54.4913L190.532 15.0765C190.532 9.8006 186.355 5.51503 181.214 5.51503L35.1337 5.51503C32.6184 5.51503 30.1816 6.58665 28.4258 8.43743L24.7869 12.3011C22.3833 8.14502 19.2666 4.73605 15.9289 2.65835ZM35.1337 8.71347L181.214 8.71347C184.631 8.71347 187.431 11.5704 187.431 15.0933V54.491C187.431 57.9974 184.647 60.8709 181.214 60.8709L35.1337 60.8709C33.4571 60.8709 31.8275 60.1565 30.6724 58.9229L12.1161 39.1993C10.9455 37.9657 10.3602 36.3584 10.3602 34.7675C10.3602 33.1766 10.9455 31.5858 12.1161 30.3356L23.9969 17.7063C25.2784 20.7907 27.3527 23.6617 27.0355 26.7161V26.8133C27.0355 27.2519 27.0039 27.6897 26.9723 28.0959C26.4502 27.9663 25.9126 27.8683 25.3427 27.8683C21.6408 27.8683 18.6196 30.9527 18.6196 34.7515C18.6196 38.5662 21.6408 41.6505 25.3427 41.6505C29.0602 41.6505 32.0659 38.566 32.0659 34.7515C32.0659 32.7545 31.2118 30.9527 29.8826 29.7033C30.0404 28.7946 30.136 27.8525 30.136 26.8299V26.716C29.8826 22.046 28.0939 19.1183 26.3065 15.2389L30.6408 10.645C31.8276 9.42716 33.4571 8.71347 35.1337 8.71347ZM22.5412 14.6714L10.344 27.6255C9.29964 26.3105 8.33468 24.8983 7.48069 23.3565C3.13026 15.3691 2.92467 6.63597 7.02169 4.29839C8.88849 3.22677 11.483 3.6164 14.3148 5.38581C17.4161 7.33383 20.3264 10.6291 22.5412 14.6714Z"
                            fill={
                              LuxuryFind(ticketInfo?.bustype) ===
                                true
                                ? "url(#myGradient)"
                                : "#1F4B7F"
                            }
                          />
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M32.2528 54.6614C34.0086 54.6614 35.4319 55.8294 35.4319 57.2702C35.4319 58.711 34.0086 59.879 32.2528 59.879C32.2365 59.879 32.2202 59.8789 32.2039 59.8787L32.2528 62.4375L184.608 62.4375L187.301 59.8787C187.284 59.8789 187.269 59.879 187.252 59.879C185.496 59.879 184.073 58.711 184.073 57.2702C184.073 55.8294 185.496 54.6614 187.252 54.6614C187.269 54.6614 187.284 54.6615 187.301 54.6617V50.4067C187.284 50.4069 187.269 50.407 187.252 50.407C185.496 50.407 184.073 49.239 184.073 47.7982C184.073 46.3574 185.496 45.1894 187.252 45.1894H187.26L187.275 45.1895L187.284 45.1895L187.301 45.1897V41.5772C182.493 41.5772 178.595 38.3786 178.595 34.433C178.595 30.4875 182.493 27.2889 187.301 27.2889V23.7566C187.284 23.7569 187.269 23.757 187.252 23.757C185.496 23.757 184.073 22.5889 184.073 21.1481C184.073 19.7073 185.496 18.5393 187.252 18.5393C187.269 18.5393 187.284 18.5394 187.301 18.5396V14.2846C187.292 14.2847 187.284 14.2848 187.275 14.2849C187.268 14.2849 187.26 14.2849 187.252 14.2849C185.496 14.2849 184.073 13.1169 184.073 11.6761C184.073 10.2353 185.496 9.0673 187.252 9.0673C187.269 9.0673 187.284 9.06738 187.301 9.06762L185.147 6.42857L32.2039 6.96711L32.2039 9.06762C32.1876 9.06762 32.2202 9.06738 32.2039 9.06762C33.9597 9.06762 35.4319 10.2353 35.4319 11.6761C35.4319 13.1169 34.0086 14.2849 32.2528 14.2849C32.2365 14.2849 32.2202 14.2849 32.2039 14.2846V18.5396C32.2202 18.5394 32.2365 18.5393 32.2528 18.5393C34.0086 18.5393 35.4319 19.7073 35.4319 21.1481C35.4319 22.5889 34.0086 23.757 32.2528 23.757C32.2365 23.757 32.2202 23.7569 32.2039 23.7566V27.2889C37.0119 27.2889 41.9793 30.4875 41.9793 34.433C41.9793 38.3786 37.0119 41.5772 32.2039 41.5772V45.1897C32.2202 45.1895 32.2365 45.1894 32.2528 45.1894C34.0086 45.1894 35.4319 46.3574 35.4319 47.7982C35.4319 49.239 34.0086 50.407 32.2528 50.407C32.2365 50.407 32.2202 50.4069 32.2039 50.4067V54.6617C32.2202 54.6615 32.2365 54.6614 32.2528 54.6614Z"
                            fill={
                              LuxuryFind(ticketInfo?.bustype) ===
                                true
                                ? "url(#myGradient)"
                                : "#1F4B7F"
                            }
                          />
                        </svg>
                        <p
                          className={`md:text-[1.5vw] text-[5vw] font-extrabold ${LuxuryFind(ticketInfo?.bustype) ===
                            true
                            ? "text-[#393939]"
                            : "text-white"} absolute left-[10vw] md:left-[3.5vw] top-[8vw] md:top-[0.9vw] flex items-center justify-center ${ticketDetails?.bus_type_status === "luxury"
                              ? "text-[#393939]"
                              : "text-[#1F487C]"}`}
                        >
                          {/* {`₹ ${calculateDiscountedFare(
                      ticketDetails?.BUS_START_DATE,
                      busprice,
                      tbs_discount
                    )}`} */}
                          {`₹ ${Math.floor(tbs_ticket_details?.total_fare)}`}
                        </p>
                      </div>

                      <div >
                        <div className={` h-[15vw] w-[15vw] rounded-full ${LuxuryFind(ticketInfo?.bustype) === true
                          ? "bg-[#FFCF6E80]"
                          : 'bg-[#1F487C66]'}  flex items-center justify-center`}>
                          <div
                            onClick={() =>
                              handleDownloadClick(ticketInfo?.Ticket_no)
                            }
                            className={`h-[12.5vw] w-[12.5vw] rounded-full flex justify-center items-center ${LuxuryFind(ticketInfo?.bustype) === true ? "bg-[linear-gradient(to_right,_#F8C550,_#FFEB76,_#FFE173)]" : "bg-[#1F487C]"}`}
                          // style={{

                          //   backgroundColor:
                          //     LuxuryFind(ticketInfo?.bustype) === true
                          //       ? "#ffbf3e"
                          //       : colorcode.theme,
                          // }}
                          >
                            <span>
                              <FiDownload size={"5vw"} color={`${LuxuryFind(ticketInfo?.bustype) === true ? "#393939" : "white"}`} />
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* <div
                                className={`border-dashed border-[0.4vw] ${ LuxuryFind(ticketInfo?.bustype) ===true
                                    ? "border-[#393939]"
                                    : "border-[#1F487C]"
                                    } mt-[2vw] relative`}
                            >
                                <span className={`absolute left-[-1vw] top-[-5vw] z-[1]`}>
                                    <div
                                        className={`${ LuxuryFind(ticketInfo?.bustype) ===true
                                            ? "bg-white border-l-white border-[#393939]"
                                            : "bg-[white] border-l-white border-[#1F487C]"
                                            }  border  border-r-[1vw]  w-[5vw] h-[10vw] rounded-r-full `}
                                    ></div>
                                </span>
                                <span className={`absolute right-[-1vw] top-[-5.5vw] z-[1]`}>
                                    <div
                                        className={`${ticketDetails?.bus_type_status === "luxury"
                                            ? "border-[#393939] bg-white border-r-white"
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
                </div>

                <div
                  className={`flex flex-col relative items-center justify-center rounded-b-[3vw] border-dashed 
              border-t-[1vw] border-white h-[16vw] pl-[.8vw] pr-[2vw] mt-[1vw] py-[3vw]`}
                  style={{
                    transform: "rotate(2deg)",
                    // backgroundColor: colorcode?.theme,
                    // backgroundColor: LuxuryFind(ticketInfo?.bustype) === true ? '#393939' : '#1F487C',
                    backgroundImage: ` ${LuxuryFind(ticketInfo?.bustype) === true ? `linear-gradient(to right, #F8C550, #FFEB76, #FFE173), url(${MOBILE_CARD})` : 'linear-gradient(to right, #1F487C, #1F487C, #1F487C)'} `,
                    backgroundBlendMode: "overlay"
                  }}
                // onClick={handleDownloadClick}
                >
                  <p className={`flex  ${LuxuryFind(ticketInfo?.bustype) === true ? 'text-black' : 'text-white'} text-[4vw] font-bold`}>
                    Thanks for booking..! Travel again
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

          <BottomNavbar ticketInfo={ticketInfo} />
        </>
      }

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
