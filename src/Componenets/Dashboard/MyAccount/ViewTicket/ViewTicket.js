import { ErrorMessage, Field, Form, Formik } from "formik";
import { React, useEffect, useState } from "react";
import * as Yup from "yup";
import { ViewTicketById } from "../../../../Api-Abhibus/MyAccount/ViewTicket";
import { IoPersonOutline } from "react-icons/io5";
import { FaArrowRightLong } from "react-icons/fa6";
import dayjs from "dayjs";
import { Drawer, Spin, Tooltip } from "antd";
import { HiOutlineDownload } from "react-icons/hi";
import moment from "moment";
import { LoadingOutlined } from "@ant-design/icons";
import empty from "../../../../Assets/CommonImages/empty.png";
import { useNavigate } from "react-router";
import ViewFullTicket from "./ViewFullTicket";
import { useDispatch } from "react-redux";

export default function ViewTicket() {
  const validationSchema = Yup.object({
    ticketNumber: Yup.string().required("Ticket Number is required"),
  });

  const navigation = useNavigate();
  const [ticketDetails, setTicketDetails] = useState([]);
  const [spinning, setSpinning] = useState(false);
  const [showList, setShowList] = useState(false);
  const [showDrawer, setShowDrawer] = useState(false);
  const [calArrival, setCalArrival] = useState({
    journeyDate: "",
    starTime: "",
    endTime: "",
  });
  const dispatch = useDispatch();
  const handleSubmit = async (values) => {
    // alert(values);
    // console.log(values.ticketNumber, "dkjfhdkjfhkdjf");
    // setSpinning(true)
    setShowList(true);
    const response = await ViewTicketById(
      values.ticketNumber,
      setSpinning
      // dispatch
    );
    setTicketDetails(response);
    setCalArrival({
      journeyDate: response?.ticketInfo?.originStartTime,
      starTime: response?.ticketInfo?.Start_Time,
      endTime: response?.ticketInfo?.Arr_Time,
    });
    setSpinning(false);
  };

  console.log(ticketDetails, "mytickwtsfskdhfdz");

  const onClose = () => {
    setShowDrawer(false);
    // sessionStorage.setItem("ticket_view", false);
  };

  // const calculateArrival = (departureDate, departureTime, duration) => {
  //   try {
  //     const departureDateTime = new Date(`${departureDate} ${departureTime}`);
  //     if (isNaN(departureDateTime.getTime())) {
  //       throw new Error("Invalid departure date or time format.");
  //     }
  //     const [hours, minutes] = duration.split(":").map(Number);
  //     if (isNaN(hours) || isNaN(minutes)) {
  //       throw new Error("Invalid duration format.");
  //     }
  //     departureDateTime.setHours(departureDateTime.getHours() + hours);
  //     departureDateTime.setMinutes(departureDateTime.getMinutes() + minutes);
  //     const arrivalDate = departureDateTime.toLocaleDateString("en-US", {
  //       year: "numeric",
  //       month: "short",
  //       day: "2-digit",
  //     });
  //     const arrivalTime = departureDateTime.toLocaleTimeString("en-US", {
  //       hour: "2-digit",
  //       minute: "2-digit",
  //       hour12: true,
  //     });
  //     return dayjs(arrivalDate).format("DD MMM");
  //   } catch (error) {
  //     return { arrivalDate: null, arrivalTime: null };
  //   }
  // };

  // const calculateArrivalDate = (journeyDate,) => {
  //   // Create a Date object for the journey start
  //   const journeyDateTime = new Date(`${journeyDate.split(', ')[1]}T${startTime}`);

  //   // Add the arrival time duration to the journey start time
  //   const hoursToAdd = 6; // From 21:45 to 04:00, it's 6 hours and 15 minutes.
  //   const minutesToAdd = 15;

  //   journeyDateTime.setHours(journeyDateTime.getHours() + hoursToAdd);
  //   journeyDateTime.setMinutes(journeyDateTime.getMinutes() + minutesToAdd);

  //   return journeyDateTime;
  // };

  // const calculateArrivalDate = (journeyDate, startTime, arrTime) => {
  //   // Parse the journey date (you may need to handle the full date format)
  //   const journeyDateObj = new Date(journeyDate);

  //   // Extract hours and minutes from the Start Time and Arrival Time
  //   const [startHours, startMinutes] = startTime?.split(":").map(Number); // Ensure values are numbers
  //   const [arrHours, arrMinutes] = arrTime?.split(":").map(Number); // Ensure values are numbers

  //   // Set the start time to the journey date
  //   journeyDateObj.setHours(startHours, startMinutes, 0);

  //   // Calculate the arrival time by adding hours and minutes from "Arr_Time"
  //   const arrivalDateObj = new Date(journeyDateObj);
  //   arrivalDateObj.setHours(arrivalDateObj.getHours() + arrHours);
  //   arrivalDateObj.setMinutes(arrivalDateObj.getMinutes() + arrMinutes);

  //   // If the arrival time is in the next day, it will automatically adjust the date.
  //   return arrivalDateObj;
  // };

  // const calculateArrivalDate = (journeyDate, startTime, arrTime) => {
  //   // Convert "Thu, 6th Feb 2025" to a valid date format "2025-02-06"
  //   console.log(journeyDate, startTime, arrTime, "ieusfhdkjfh");

  //   const [dayOfWeek, day, month, year] = journeyDate.split(" ");
  //   const monthMap = {
  //     Jan: "01", Feb: "02", Mar: "03", Apr: "04", May: "05", Jun: "06",
  //     Jul: "07", Aug: "08", Sep: "09", Oct: "10", Nov: "11", Dec: "12"
  //   };
  //   const formattedDate = `${year}-${monthMap[month]}-${day.padStart(2, '0')}`;

  //   // Parse the formatted date string to create a Date object
  //   const journeyDateObj = new Date(formattedDate);

  //   // Extract hours and minutes from the Start Time and Arrival Time
  //   const [startHours, startMinutes] = startTime?.split(":").map(Number); // Ensure values are numbers
  //   const [arrHours, arrMinutes] = arrTime?.split(":").map(Number); // Ensure values are numbers

  //   // Set the start time to the journey date
  //   journeyDateObj.setHours(startHours, startMinutes, 0);

  //   // Calculate the arrival time by adding hours and minutes from "Arr_Time"
  //   const arrivalDateObj = new Date(journeyDateObj);
  //   arrivalDateObj.setHours(arrivalDateObj.getHours() + arrHours);
  //   arrivalDateObj.setMinutes(arrivalDateObj.getMinutes() + arrMinutes);

  //   // If the arrival time is in the next day, it will automatically adjust the date.
  //   return arrivalDateObj;
  // };

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

  // const [arrivalDate, setArrivalDate] = useState(null);

  // const handleCalculateArrival = (journeyDate, startTime, arrTime) => {
  //   const arrival = calculateArrivalDate(journeyDate, startTime, arrTime);
  //   setArrivalDate(arrival);
  // };
  // console.log(calculateArrivalDate(ticketDetails?.ticketInfo?.Journey_Date, ticketDetails?.ticketInfo?.Start_Time, ticketDetails?.ticketInfo?.Arr_Time),"helldfhkdxjhfkdjhfkxdjhf");
  // console.log((ticketDetails?.ticketInfo?.Journey_Date), "helldfhkdxjhfkdjhfkxdjhf");
  // console.log(ticketDetails?.ticketInfo?.Start_Time, "helldfhkdxjhfkdjhfkxdjhf");
  // console.log(ticketDetails?.ticketInfo?.Arr_Time, "helldfhkdxjhfkdjhfkxdjhf");
  console.log(calArrival, "helldfhkdxjhfkdjhfkxdjhf");

  const [calculatedDate, setCalculatedDate] = useState("");
  const [showmodal, setShowModal] = useState(false);

  useEffect(() => {
    if (ticketDetails?.status === "success" && calArrival) {
      // alert("heieei")
      const values = calculateArrivalDate(
        calArrival?.journeyDate,
        calArrival?.endTime
      );
      console.log(values, "vashdfkjdhkjfsdd");
      setCalculatedDate(values);
      setShowModal(true);
      // console.log((ticketDetails?.ticketInfo?.Journey_Date, ticketDetails?.ticketInfo?.Start_Time, ticketDetails?.ticketInfo?.Arr_Time), "helldfhkdxjhfkdjhfkxdjhf");
    }
  }, [ticketDetails]);
  // Simple function to get suffix
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
    return <div>{modifiedDate}</div>;
  };
  const [dropDate, setDropDate] = useState();

  useEffect(() => {
    setDropDate(ConvertDate(calculatedDate));
  }, []);

  const handleNavigation = () => {
    navigation(`/bookedTicket`, {
      state: {
        ticketDetails: ticketDetails?.ticketInfo,
        droppingDate: dropDate?.props?.children,
      },
    });
  };
  return (
    <div>
      <Formik
        initialValues={{
          ticketNumber: "",
        }}
        validationSchema={validationSchema}
        enableReinitialize={false}
        onSubmit={(values) => {
          handleSubmit(values);
          console.log(values, "valefdkfdkfh");
        }}
      >
        {({ handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <div className="w-full shadow-lg shadow-gray-400 h-[60vw] md:h-[15vw] bg-white rounded-[2vw] md:rounded-[.9vw] border-b-[0.1vw]">
              <div className="text-center py-[3vw] md:py-[1vw] text-[#1F487C] p-[1vw] font-bold text-[5vw] md:text-[1.5vw]">
                View Ticket
              </div>
              <div className="text-center text-[#1F487C] p-[.5vw] font-semibold text-[4vw] md:text-[1.1vw]">
                Verify your details, and View your Tickets
              </div>
              <div className="grid grid-rows-3 gap-y-[7vw] justify-center md:gap-y-[0vw] md:flex md:justify-evenly mt-[5vw] md:mt-[3vw]">
                <div className="relative flex">
                  <Field
                    name="ticketNumber"
                    placeholder="Ticket Number *"
                    type="text"
                    autoComplete="Off"
                    className="placeholder:text-[3.6vw] md:text-[1.2vw] outline-none md:placeholder:text-[1.2vw] border-[.1vw] rounded-[1.5vw] md:rounded-[.5vw] w-[70vw] h-[10vw] md:w-[23vw] md:h-[3vw] border-gray-400 pl-[3vw] md:pl-[1vw] text-[#1F487C] placeholder-[#1F487C]"
                  />
                  <ErrorMessage
                    name="ticketNumber"
                    component="div"
                    className="text-red-600 text-[3vw] md:text-[.8vw] absolute top-full left-[.2vw] mt-1"
                  />
                </div>
                <div className="relative flex justify-center">
                  <button
                    className={`bg-[#1F487C] text-[3.6vw] md:text-[1.1vw] text-white rounded-[5vw] w-[25vw] h-[10vw] md:w-[11vw] md:h-[3vw]`}
                    type="submit"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
      {showList && (
        <>
          {spinning ? (
            <div
              style={{
                zIndex: 1000,
              }}
            >
              <Spin
                style={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                spinning={spinning}
                indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />}
              />
            </div>
          ) : (
            <>
              {ticketDetails?.status === "success" ? (
                // <div className="grid grid-rows-12 w-full h-[45vw] md:max-h-[18.5vw] bg-white mt-[1vw] border-[0.1vw] border-gray-400 relative md:rounded-none rounded-[2vw]">
                //   <div className="row-span-5 w-full border-b-[0.1vw] border-gray-400 ">
                //     <div className="grid grid-cols-4 w-full h-full flex-col items-center ">
                //       <div className="col-span-3 flex flex-col gap-y-[0.5vw] pl-[4vw]">
                //         <div className="flex items-center">
                //           <label
                //             className={`block md:hidden text-[4.2vw]  ${ticketDetails?.bus_type_status === "luxury"
                //               ? "text-[#393939]"
                //               : "text-[#1F487C]"
                //               } font-semibold`}
                //           >
                //             {ticketDetails?.ticketInfo?.Boarding_Place_Name}
                //           </label>
                //           <label
                //             className={`md:block hidden text-[1.1vw]  ${ticketDetails?.bus_type_status === "luxury"
                //               ? "text-[#393939]"
                //               : "text-[#1F487C]"
                //               } font-bold`}
                //           >
                //             {ticketDetails?.ticketInfo?.source_name}
                //           </label>
                //           <span className="md:block hidden px-[0.5vw]">
                //             <FaArrowRightLong
                //               color={` ${ticketDetails?.bus_type_status === "luxury"
                //                 ? "#393939"
                //                 : "#1F487C"
                //                 }`}
                //             />
                //           </span>
                //           <label
                //             className={`md:block hidden text-[1.1vw]  ${ticketDetails?.bus_type_status === "luxury"
                //               ? "text-[#393939]"
                //               : "text-[#1F487C]"
                //               } font-bold`}
                //           >
                //             {ticketDetails?.ticketInfo?.dest_name}
                //           </label>
                //         </div>
                //         <div className="flex items-center gap-x-[0.5vw]">
                //           <label
                //             className={`md:block hidden text-[1.3vw] font-bold  ${ticketDetails?.bus_type_status === "luxury"
                //               ? "text-[#393939]"
                //               : "text-[#1F487C]"
                //               }`}
                //           >
                //             {ticketDetails?.ticketInfo?.operatorname}
                //           </label>
                //           <label
                //             className={`text-[3.7vw] md:text-[1.1vw]  ${ticketDetails?.bus_type_status === "luxury"
                //               ? "text-[#393939]"
                //               : "text-[#1F487C]"
                //               } font-bold`}
                //           ></label>
                //           <div
                //             className={` ${ticketDetails?.bus_type_status === "luxury"
                //               ? "bg-[#393939]"
                //               : "bg-[#1F487C]"
                //               } md:block hidden h-[0.5vw] w-[0.5vw] rounded-full`}
                //           ></div>
                //           <label
                //             className={`md:text-[1.1vw] text-[3.7vw]  ${ticketDetails?.bus_type_status === "luxury"
                //               ? "text-[#393939]"
                //               : "text-[#1F487C]"
                //               } `}
                //           >
                //             {`Booking ID - ${ticketDetails?.ticketInfo?.Ticket_no}`}
                //           </label>
                //         </div>
                //       </div>
                //       <div className="col-span-1 md:block hidden flex items-center justify-center">
                //         <button
                //           className={` ${ticketDetails?.bus_type_status === "luxury"
                //             ? "bg-[#393939]"
                //             : "bg-[#1F487C]"
                //             }  text-[3.6vw] md:text-[1.1vw] font-bold rounded-full text-white w-[15vw] h-[3vw] outline-none`}
                //         >
                //           VIEW BOOKING
                //         </button>
                //       </div>
                //     </div>
                //   </div>
                //   <div className="row-span-7 w-full pl-[1vw] h-full pt-[1vw] pb-[1vw] pr-[2vw]">
                //     <div className="flex items-center px-[2vw] h-full justify-between">
                //       <div className="flex flex-col gap-y-[0.5vw]">
                //         <label
                //           className={`text-[3.5vw] md:text-[1.1vw]  ${ticketDetails?.bus_type_status === "luxury"
                //             ? "text-[#393939]"
                //             : "text-[#1F487C]"
                //             }`}
                //         >
                //           From
                //         </label>
                //         <div className="md:block hidden">
                //           <label className="flex items-center gap-[0.5vw]">
                //             <span
                //               className={`text-[3.5vw] md:text-[1.1vw]  ${ticketDetails?.bus_type_status === "luxury"
                //                 ? "text-[#393939]"
                //                 : "text-[#1F487C]"
                //                 } font-bold`}
                //             >
                //               {ticketDetails?.ticketInfo?.Journey_Date}
                //             </span>
                //             <span
                //               className={`text-[3.5vw] md:text-[1.1vw]  ${ticketDetails?.bus_type_status === "luxury"
                //                 ? "text-[#393939]"
                //                 : "text-[#1F487C]"
                //                 }`}
                //             >
                //               {moment(
                //                 ticketDetails?.ticketInfo?.Start_Time,
                //                 "HH:mm:ss"
                //               ).format("hh:mm A")}
                //             </span>
                //           </label>
                //         </div>
                //         <label
                //           className={`text-[3.5vw] md:text-[1.1vw]  ${ticketDetails?.bus_type_status === "luxury"
                //             ? "text-[#393939]"
                //             : "text-[#1F487C]"
                //             } font-bold`}
                //         >
                //           {ticketDetails?.ticketInfo?.source_name}
                //         </label>
                //       </div>
                //       <div className="flex flex-col gap-y-[0.5vw]">
                //         <label
                //           className={`text-[3.5vw] md:text-[1.1vw]  ${ticketDetails?.bus_type_status === "luxury"
                //             ? "text-[#393939]"
                //             : "text-[#1F487C]"
                //             }`}
                //         >
                //           To
                //         </label>
                //         <div className="md:block hidden">
                //           <label className="flex items-center gap-[0.5vw]">
                //             <span
                //               className={`text-[3.5vw] md:text-[1.1vw]  ${ticketDetails?.bus_type_status === "luxury"
                //                 ? "text-[#393939]"
                //                 : "text-[#1F487C]"
                //                 } font-bold`}
                //             >
                //               {calculatedDate && ConvertDate(calculatedDate)}
                //             </span>
                //             <span
                //               className={`text-[3.5vw] md:text-[1.1vw]  ${ticketDetails?.bus_type_status === "luxury"
                //                 ? "text-[#393939]"
                //                 : "text-[#1F487C]"
                //                 }`}
                //             >
                //               {moment(
                //                 ticketDetails?.ticketInfo?.Arr_Time,
                //                 "HH:mm:ss"
                //               ).format("hh:mm A")}
                //             </span>
                //           </label>
                //         </div>
                //         <label
                //           className={`text-[3.5vw] md:text-[1.1vw]  ${ticketDetails?.bus_type_status === "luxury"
                //             ? "text-[#393939]"
                //             : "text-[#1F487C]"
                //             } font-bold`}
                //         >
                //           {ticketDetails?.ticketInfo?.dest_name}
                //         </label>
                //       </div>
                //     </div>
                //   </div>
                // </div>
                <div className="grid grid-rows-12 w-full h-[45vw] md:max-h-[18.5vw]  bg-white md:mt-[1vw] mt-[5vw] border-[0.1vw] border-gray-400 relative md:rounded-none rounded-[2vw]">
                  <div className="absolute left-[-1.5vw] top-[3vw] md:top-[1.6vw] ">
                    {/* <div
                  className="bg-white w-[3.5vw] h-[4vw] md:w-[2.5vw] md:h-[2.5vw] border-[0.2vw] rounded-[90vw] md:rounded-full border-[#8EA3BD] flex items-center justify-center"
                  style={{
                    zIndex: 2,
                  }}
                >
                  <img src={booking_bus} alt="bookingBus" className="w-[2.5vw] h-[3vw] md:w-[1.7vw] md:h-[1.7vw]" />
                </div> */}
                  </div>
                  <div className="row-span-5 w-full border-b-[0.1vw]  border-gray-400 ">
                    <div className="grid grid-cols-4 w-full h-full flex-col items-center ">
                      <div className="col-span-3 flex flex-col gap-y-[0.5vw] pl-[4vw]">
                        <div className="flex items-center">
                          <label
                            className={`block md:hidden text-[4.2vw]  ${
                              ticketDetails?.bus_type_status === "luxury"
                                ? "text-[#393939]"
                                : "text-[#1F487C]"
                            } font-semibold`}
                          >
                            {ticketDetails?.ticketInfo?.operatorname}
                          </label>
                          <label
                            className={`md:block hidden text-[1.1vw]  ${
                              ticketDetails?.bus_type_status === "luxury"
                                ? "text-[#393939]"
                                : "text-[#1F487C]"
                            } font-bold`}
                          >
                            {ticketDetails?.ticketInfo?.source_name}
                          </label>
                          <span className="md:block hidden px-[0.5vw]">
                            <FaArrowRightLong
                              color={` ${
                                ticketDetails?.bus_type_status === "luxury"
                                  ? "#393939"
                                  : "#1F487C"
                              }`}
                            />
                          </span>
                          <label
                            className={`md:block hidden text-[1.1vw]  ${
                              ticketDetails?.bus_type_status === "luxury"
                                ? "text-[#393939]"
                                : "text-[#1F487C]"
                            } font-bold`}
                          >
                            {ticketDetails?.ticketInfo?.dest_name}
                          </label>
                        </div>
                        <div className="flex items-center gap-x-[0.5vw]">
                          <label
                            className={`md:block hidden text-[1.3vw] font-bold  ${
                              ticketDetails?.bus_type_status === "luxury"
                                ? "text-[#393939]"
                                : "text-[#1F487C]"
                            }`}
                          >
                            {/* {ticketDetails?.status} */}
                            {ticketDetails?.ticketInfo?.operatorname}
                          </label>
                          {/* <div className="md:block hidden h-[0.5vw] w-[0.5vw] bg-[#1F487C] rounded-full"></div> */}
                          <label
                            className={`text-[3.7vw] md:text-[1.1vw]  ${
                              ticketDetails?.bus_type_status === "luxury"
                                ? "text-[#393939]"
                                : "text-[#1F487C]"
                            } font-bold`}
                          >
                            {/* {ticketDetails?.trip_type} */}
                          </label>
                          <div
                            className={` ${
                              ticketDetails?.bus_type_status === "luxury"
                                ? "bg-[#393939]"
                                : "bg-[#1F487C]"
                            } md:block hidden h-[0.5vw] w-[0.5vw] rounded-full`}
                          ></div>
                          <label
                            className={`md:text-[1.1vw] text-[3.7vw]  ${
                              ticketDetails?.bus_type_status === "luxury"
                                ? "text-[#393939]"
                                : "text-[#1F487C]"
                            } `}
                          >
                            {`Booking ID - ${ticketDetails?.ticketInfo?.Ticket_no}`}
                          </label>
                        </div>
                      </div>
                      <div className="col-span-1  flex items-center justify-center">
                        <button
                          // onClick={() => {
                          //   setShowModal(true);
                          //   setTicketDetails(ticketDetails);
                          // }}
                          className={` ${
                            ticketDetails?.bus_type_status === "luxury"
                              ? "bg-[#393939]"
                              : "bg-[#1F487C]"
                          }  text-[3.6vw] md:text-[1.1vw] font-bold rounded-full text-white md:w-[15vw] md:h-[3vw] w-[20vw] h-[7vw] outline-none`}
                        >
                          <span className="md:hidden block" onClick={handleNavigation}>VIEW</span>{" "}
                          <span
                            className="md:block hidden"
                            onClick={() => {
                              setShowDrawer(true);
                            }}
                          >
                            VIEW BOOKING
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className=" row-span-7 w-full pl-[1vw] h-full pt-[1vw] pb-[1vw] pr-[2vw]">
                    <div className="flex items-center px-[2vw] h-full justify-between">
                      <div className="flex flex-col gap-y-[1.2vw] md:gap-y-[0.5vw]">
                        <label
                          className={`text-[3.5vw] md:text-[1.1vw] relative flex items-center gap-[2vw] ${
                            ticketDetails?.bus_type_status === "luxury"
                              ? "text-[#393939]"
                              : "text-[#1F487C]"
                          }`}
                        >
                          <span className="">From</span>
                          <span className="md:hidden  block text-[2.5vw]">
                            ({" "}
                            {moment(
                              ticketDetails?.ticketInfo?.Start_Time,
                              "HH:mm:ss"
                            ).format("hh:mm A")}{" "}
                            )
                          </span>
                        </label>
                        <div className="md:block hidden">
                          <label className="flex   items-center mr-[1vw] gap-[0.5vw]">
                            <span
                              className={`text-[3.5vw] md:text-[1.1vw]  ${
                                ticketDetails?.bus_type_status === "luxury"
                                  ? "text-[#393939]"
                                  : "text-[#1F487C]"
                              } font-bold`}
                            >
                              {ticketDetails?.ticketInfo?.Journey_Date}
                            </span>
                            <span
                              className={`text-[3.5vw] md:text-[1.1vw]  ${
                                ticketDetails?.bus_type_status === "luxury"
                                  ? "text-[#393939]"
                                  : "text-[#1F487C]"
                              }`}
                            >
                              {moment(
                                ticketDetails?.ticketInfo?.Start_Time,
                                "HH:mm:ss"
                              ).format("hh:mm A")}
                            </span>
                          </label>
                        </div>
                        <label
                          className={`text-[3.5vw] md:text-[1.1vw]  ${
                            ticketDetails?.bus_type_status === "luxury"
                              ? "text-[#393939]"
                              : "text-[#1F487C]"
                          } font-bold`}
                        >
                          {ticketDetails?.ticketInfo?.source_name}
                        </label>
                        <div className="  block md:hidden">
                          <label className="flex items-center gap-[2vw]">
                            <span
                              className={` text-[3vw] md:text-[1.1vw]  ${
                                ticketDetails?.bus_type_status === "luxury"
                                  ? "text-[#393939]"
                                  : "text-[#1F487C]"
                              } font-bold`}
                            >
                              {/* {dayjs(ticketDetails?.departure_date).format(
                                "DD MMM' YY"
                              )} */}
                              {ticketDetails?.ticketInfo?.Journey_Date}
                            </span>
                            <span
                              className={`text-[3.5vw] md:text-[1.1vw]  ${
                                ticketDetails?.bus_type_status === "luxury"
                                  ? "text-[#393939]"
                                  : "text-[#1F487C]"
                              } `}
                            >
                              {ticketDetails?.departure_time}
                            </span>
                          </label>
                        </div>
                      </div>
                      <div className="flex flex-col gap-y-[1.2vw] md:gap-y-[0.5vw]">
                        <label
                          className={`text-[3.5vw] md:text-[1.1vw] relative flex items-center ${
                            ticketDetails?.bus_type_status === "luxury"
                              ? "text-[#393939]"
                              : "text-[#1F487C]"
                          }`}
                        >
                          <span className="">To</span>{" "}
                          <span className="md:hidden  block text-[2.5vw] pl-[3vw]">
                            ({" "}
                            {moment(
                              ticketDetails?.ticketInfo?.Arr_Time,
                              "HH:mm:ss"
                            ).format("hh:mm A")}{" "}
                            )
                          </span>
                        </label>
                        <div className="md:block hidden">
                          <label className=" flex items-center gap-[0.5vw]">
                            <span
                              className={`text-[3.5vw] md:text-[1.1vw]  ${
                                ticketDetails?.bus_type_status === "luxury"
                                  ? "text-[#393939]"
                                  : "text-[#1F487C]"
                              } font-bold`}
                            >
                              {calculatedDate && ConvertDate(calculatedDate)}
                            </span>
                            <span
                              className={`text-[3.5vw] md:text-[1.1vw]  ${
                                ticketDetails?.bus_type_status === "luxury"
                                  ? "text-[#393939]"
                                  : "text-[#1F487C]"
                              }`}
                            >
                              {moment(
                                ticketDetails?.ticketInfo?.Arr_Time,
                                "HH:mm:ss"
                              ).format("hh:mm A")}
                            </span>
                          </label>
                        </div>
                        <label
                          className={`text-[3.5vw] md:text-[1.1vw]  ${
                            ticketDetails?.bus_type_status === "luxury"
                              ? "text-[#393939]"
                              : "text-[#1F487C]"
                          } font-bold`}
                        >
                          {ticketDetails?.ticketInfo?.dest_name}
                        </label>
                        <div className="block md:hidden">
                          <label className="flex items-center gap-[2vw]">
                            <span
                              className={`text-[3vw] md:text-[1.1vw]  ${
                                ticketDetails?.bus_type_status === "luxury"
                                  ? "text-[#393939]"
                                  : "text-[#1F487C]"
                              } font-bold`}
                            >
                              {/* {dayjs(ticketDetails?.arrival_date).format(
                                "DD MMM' YY"
                              )} */}
                              {calculatedDate && ConvertDate(calculatedDate)}
                            </span>
                            {/* <span
                              className={`text-[2vw] md:text-[1.1vw]  ${ticketDetails?.bus_type_status === "luxury"
                                ? "text-[#393939]"
                                : "text-[#1F487C]"
                                }`}
                            >
                         
                            {moment(ticketDetails?.ticketInfo?.Arr_Time, 'HH:mm:ss').format('hh:mm A')}
                          </span> */}
                          </label>
                        </div>
                      </div>
                      {/* <div
                     className={`flex flex-col gap-y-[0.5vw] ${passCount ? 'grid grid-cols-2 gap-x-[.5vw]' : ''}`}
                     >
                    {ticketDetails?.passenger.map((list) => (
                     
                      <label className="flex items-center gap-x-[0.5vw]">
                       
                        <span>
                          <IoPersonOutline size={"1.2vw"} color={"#1F487C"} />
                        </span>
                        <span className="text-[1.1vw] text-[#1F487C] font-bold ">
                          {list.user_name}
                        </span>
                      </label>
                    ))}
                  </div> */}
                      <div className="md:block hidden   col-span-2">
                        <div
                          className={`flex flex-col gap-y-[0.5vw] ${
                            true ? "grid grid-cols-2 gap-x-[2vw]" : ""
                          }`}
                        >
                          {ticketDetails?.ticketInfo?.ticket_det?.map(
                            (list, index) =>
                              list?.Passenger_Name?.length > 10 ? (
                                <Tooltip
                                  color="white"
                                  overlayInnerStyle={{
                                    color: "#1F487C",
                                  }}
                                  placement="bottom"
                                  title={list.Passenger_Name}
                                >
                                  <label
                                    key={index}
                                    className="flex items-center gap-x-[0.5vw]"
                                  >
                                    <span>
                                      <IoPersonOutline
                                        size={"1.2vw"}
                                        color={`${
                                          ticketDetails?.bus_type_status ===
                                          "luxury"
                                            ? "#393939"
                                            : "#1F487C"
                                        }`}
                                      />
                                    </span>
                                    <span
                                      className={`text-[1.1vw]  ${
                                        ticketDetails?.bus_type_status ===
                                        "luxury"
                                          ? "text-[#393939]"
                                          : "text-[#1F487C]"
                                      } font-bold`}
                                    >
                                      {list.Passenger_Name.length > 8
                                        ? `${list.Passenger_Name.slice(
                                            0,
                                            8
                                          )}...`
                                        : list.Passenger_Name}
                                      {/* {(list.user_name)} */}
                                      <span>{list?.Age}</span>
                                    </span>
                                  </label>
                                </Tooltip>
                              ) : (
                                <label className="flex items-center gap-[0.5vw]">
                                  <span>
                                    <IoPersonOutline
                                      size={"1.2vw"}
                                      color={`${
                                        ticketDetails?.bus_type_status ===
                                        "luxury"
                                          ? "#393939"
                                          : "#1F487C"
                                      }`}
                                    />
                                  </span>
                                  <span
                                    className={`text-[1.1vw]  ${
                                      ticketDetails?.bus_type_status ===
                                      "luxury"
                                        ? "text-[#393939]"
                                        : "text-[#1F487C]"
                                    } font-bold`}
                                  >
                                    {list.Passenger_Name}{" "}
                                    <span className="text-[.9vw] pl-[.1vw] font-bold">
                                      , {list?.Age}
                                    </span>
                                    {/* {(list.user_name)} */}
                                  </span>
                                </label>
                              )
                          )}
                        </div>
                      </div>
                      <div className="flex flex-col gap-y-[0.5vw]">
                        <label
                          // onClick={() => {
                          //   setShowModal(true);
                          //   setTicketDetails(item);
                          // }}
                          className="flex items-center gap-x-[0.5vw]"
                        >
                          <span>
                            {/* <LuDownload size={"1.2vw"} color={"#1F487C"} />  */}
                            <HiOutlineDownload
                              className="md:text-[1.5vw] text-[3.5vw]"
                              color={"#1F487C"}
                            />
                          </span>
                          <span className="md:text-[1.1vw] text-[3vw] text-[#1F487C] font-bold md:block hidden ">
                            Download Invoice
                          </span>
                          <span className="md:text-[1.1vw] text-[3vw] text-[#1F487C] font-bold md:hidden block">
                            Download
                          </span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col gap-x-[3vw] items-center mt-[13vw] md:mt-[0vw] md:pt-[1.5vw] justify-center">
                  <img
                    src={empty}
                    alt="empty"
                    className="md:w-[8vw] md:h-[9vw] h-[24vw] w-[22vw]"
                  />
                  <div className="flex flex-col gap-y-[0.5vw] items-center pt-[3vw] justify-center">
                    <label className="text-[4.2vw] md:text-[2vw] text-[#1F487C] font-bold text-center">
                      Invalid ticket number or ticket might have been canceled.
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
            </>
          )}
        </>
      )}
      <Drawer
        placement={"right"}
        closable={false}
        onClose={onClose}
        open={showDrawer}
        key={"right"}
        width={"60%"}
        // width={drawerWidth}
      >
        <ViewFullTicket
          ticketDetails={ticketDetails}
          droppingDate={calculatedDate && ConvertDate(calculatedDate)}
        />
      </Drawer>
    </div>
  );
}
