import React, { useEffect, useRef, useState } from "react";
import JourneyDetails from "./JourneyDetails";
import PassengerDetails from "./PassengerDetails";
import BiilingAddress from "./BiilingAddress";
import { useLocation } from "react-router";
import ConfirmTicket from "./ConfirmTicket";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  Abhibus_GetFareInfo,
  Abhibus_SeatBlocked,
} from "../../../Api-Abhibus/Dashboard/DashboardPage";
import { Drawer, Skeleton } from "antd";
import { useSelector } from "react-redux";
import ViewFullTicket from "../MyAccount/ViewTicket/ViewFullTicket";
import busloading from "../../../Assets/Gif/bus.gif";
import dayjs from "dayjs";
import { LoginCheck } from "../../../Api-TBS/Login/Login";
import { decryptData } from "../../Common/Common-Functions/Encrypt-Decrypt";
export default function DrawerIndex({
  BusDetails,
  layout,
  selectedSeats,
  selectedRoutes,
  busprice,
  seatDetails,
  selectedseatprice,
  setDropDown,
  travelerDetails,
  setTravelerDetails,
  emailInput,
  setEmailInput,
  mobileInput,
  setMobileInput,
  billAddress,
  setBillAddress,
  termschecked,
  setTermsChecked,
  setTicketNumber,
  setTicketLoading,
  ticketnumber,
  ticketloading,
  onClose
}) {
  const [loader, setLoader] = useState(false);
  const [razorpayloading, setRazorpayLoading] = useState(false);
  const selectedSeats1 = selectedSeats;
  // const [travelerDetails, setTravelerDetails] = useState(
  //   selectedSeats1?.reduce((acc, seat, index) => {
  //     acc[index] = { user_name: "", age: "", gender: "male", seat: "" };
  //     return acc;
  //   }, {})
  // );

  const location = useLocation();
  const from_source = location.state; // Retrieve the passed state

  // const [emailInput, setEmailInput] = useState("");
  // const [mobileInput, setMobileInput] = useState("");
  const [confirmModal, setConfirmModal] = useState(false);
  const [confirmRefNo, setConfirmRefNo] = useState(null);
  const sectionRef = useRef(null);
  const [faredetails, setFareDetails] = useState("");
  const [registerfulldetails, setRegisterFullDetails] = useState({});
  const [formState, setFormState] = useState({
    isValid: false,
    isSubmitting: false,
  });

  // const [termschecked, setTermsChecked] = useState(false);
  const [enableInput, setEnableInput] = useState(false);

  const validationSchema = Yup.object().shape({
    mobile: Yup.string()
      .matches(/^[0-9]+$/, "Mobile number must be a number")
      .min(10, "Mobile number must be at least 10 digits")
      .max(10, "Mobile number maximum 10 digits only")
      .required("Mobile Number is required"),
    // age: Yup.number()
    //   .required("Age is required"),
    email: Yup.string()
      .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Invalid email address format"
      )
      .max(50, "Email Id maximum limit reached")
      .required("Email is required"),
    ...Array(selectedSeats?.length)
      .fill(0)
      ?.reduce(
        (acc, _, index) => ({
          ...acc,
          [`user_name_${index}`]: Yup.string()
            .required("Name is required")
            .min(3, " Name must be atleast 3 Characters long")
            .matches(/^[A-Za-z\s]+$/, "Name should Contain only Alphabets."),
        }),
        {}
      ),
    ...Array(selectedSeats?.length)
      .fill(0)
      ?.reduce(
        (acc, _, index) => ({
          ...acc,
          [`age_${index}`]: Yup.number()
            .required("Age is required")
            .min(1, "Age cannot be 0.")
            .typeError("Age must be a number."),
        }),
        {}
      ),
    terms: Yup.boolean().oneOf(
      [true],
      "You must accept the terms and conditions"
    ),
    city: Yup.string()
      .matches(/^[A-Za-z\s]+$/, "InValid Names for City")
      .required("City is required"),
    state: Yup.string()
      .matches(/^[A-Za-z\s]+$/, "InValid Names for State")
      .required("State is required"),
    pincode: Yup.number()
      .min(100000, "Pincode must be at least 6 digits")
      .max(999999, "Pincode must be a 6-digit number"),
  });

  const getPassengerCount = (data) => {
    let adultCount = 0;
    let childCount = 0;

    data.forEach((passenger) => {
      if (parseInt(passenger.age) > 3) {
        adultCount++;
      } else {
        childCount++;
      }
    });

    return { adultCount, childCount };
  };
  const { adultCount, childCount } = getPassengerCount(
    Object?.values(travelerDetails)
  );
  const [buttondisable, setButtonDisable] = useState(false);
  const [checkerror, setCheckError] = useState("");
  const user = sessionStorage?.getItem("user_id");
  const getuserid = decryptData(user);
  const handleSubmit = async (values, setFieldError) => {
    console.log(values, 'values__Values')
    setButtonDisable(true);
    // if (getuserid) {
    //   try {
    //     const response = await Abhibus_SeatBlocked(
    //       BusDetails,
    //       seatDetails,
    //       travelerDetails,
    //       values,
    //       selectedRoutes,
    //       emailInput,
    //       mobileInput,
    //       selectedseatprice
    //     );
    //     if (response?.status === "success") {
    //       setConfirmModal(true);
    //       setEnableInput(true);
    //       setConfirmRefNo(response?.ReferenceNo);
    //       handleScroll();
    //       try {
    //         const data = await Abhibus_GetFareInfo(
    //           adultCount,
    //           childCount,
    //           response?.ReferenceNo
    //         );
    //         setFareDetails(data?.GetFaresInfo);
    //       } catch {}
    //     }
    //   } catch (error) {
    //     console.error("API call failed:", error);
    //   } finally {
    //     setButtonDisable(false);
    //   }
    // } else {
    //   const checklogindetails = await LoginCheck(emailInput, mobileInput);
    //   console.log(
    //     checklogindetails?.userExist,
    //     "checklogindetailschecklogindetails"
    //   );
    //   if (checklogindetails.userExist) {
    //     setButtonDisable(true);
    //     setFieldError("email", "Email already exist");
    //   } else {
    try {
      const response = await Abhibus_SeatBlocked(
        BusDetails,
        seatDetails,
        travelerDetails,
        values,
        selectedRoutes,
        emailInput,
        mobileInput,
        selectedseatprice
      );
      if (response?.status === "success") {
        setConfirmModal(true);
        setEnableInput(true);
        setConfirmRefNo(response?.ReferenceNo);
        handleScroll();
        try {
          const data = await Abhibus_GetFareInfo(
            adultCount,
            childCount,
            response?.ReferenceNo
          );
          setFareDetails(data?.GetFaresInfo);
        } catch { }
      }
    } catch (error) {
      console.error("API call failed:", error);
    } finally {
      setButtonDisable(false);
    }
    //   }
    //   // setCheckError(checklogindetails);
    // }

    // else{
    //   const checklogindetails = await LoginCheck(emailInput, mobileInput);
    //     console.log(checklogindetails?.message, "checklogindetailschecklogindetails");
    //     setCheckError(checklogindetails);
    //     setButtonDisable(true);
    // }
  };

  const handleScroll = () => {
    sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  };

  const isAllDetailsFilled = Object.values(travelerDetails).every(
    (traveler) =>
      traveler.user_name !== "" &&
      traveler.age !== "" &&
      traveler.gender !== "" &&
      traveler.seat !== ""
  );

  const ticketlist = useSelector((state) => state?.get_ticket_detail);

  const [showModal, setShowModal] = useState(false);
  const [calArrival, setCalArrival] = useState({
    journeyDate: ticketlist?.ticketInfo?.originStartTime,
    starTime: ticketlist?.ticketInfo?.Start_Time,
    endTime: ticketlist?.ticketInfo?.Arr_Time,
  });
  console.log(calArrival, "calArrival");

  useEffect(() => {
    const value = sessionStorage.getItem("ticket_view");
    if (value === "open") {
      setShowModal(true);
    } else {
      setShowModal(false);
    }
  }, [sessionStorage.getItem("ticket_view")]);

  useEffect(() => {
    if (confirmModal) {
      const element = document.getElementById("targetSection");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [confirmModal]);

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
    console.log(date, "modfuhdifhdataadff");
    return modifiedDate;
  };

  // const calculateArrivalDate = (boardingDateTime, arrTime) => {
  //   // Parse the boarding date and time (in "YYYY-MM-DD HH:mm" format)
  //   const [datePart, timePart] = boardingDateTime?.split(" ");
  //   const [year, month, day] = datePart?.split("-");
  //   const [startHours, startMinutes] = timePart?.split(":")?.map(Number);

  //   // Create a Date object with the parsed values
  //   const journeyDateObj = new Date(
  //     year,
  //     month - 1,
  //     day,
  //     startHours,
  //     startMinutes
  //   );

  //   // Extract hours and minutes from Arrival Time (in "HH:mm:ss" format)
  //   const [arrHours, arrMinutes, arrSeconds] = arrTime?.split(":")?.map(Number);

  //   // Calculate the arrival time by adding hours and minutes from "Arrival_Time"
  //   const arrivalDateObj = new Date(journeyDateObj);
  //   arrivalDateObj?.setHours(arrivalDateObj?.getHours() + arrHours);
  //   arrivalDateObj?.setMinutes(arrivalDateObj?.getMinutes() + arrMinutes);
  //   arrivalDateObj?.setSeconds(arrivalDateObj?.getSeconds() + arrSeconds);

  //   return arrivalDateObj;
  // };

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
    if (ticketlist?.status === "success" && calArrival) {
      setCalArrival({
        journeyDate: ticketlist?.ticketInfo?.originStartTime,
        starTime: ticketlist?.ticketInfo?.Start_Time,
        endTime: ticketlist?.ticketInfo?.Arr_Time,
      });
      // if (ticketlist?.status === "success") {
      // alert("heieei")
      const values = calculateArrivalDate(
        ticketlist?.ticketInfo?.originStartTime,
        ticketlist?.ticketInfo?.Arr_Time
      );
      console.log(
        ticketlist?.ticketInfo?.originStartTime,
        ticketlist?.ticketInfo?.Arr_Time,
        "vashdfkjdhkjfsdd"
      );
      setCalculatedDate(values);
      //setShowModal(true);
      console.log(
        (ticketlist?.ticketInfo?.Journey_Date,
          ticketlist?.ticketInfo?.Start_Time,
          ticketlist?.ticketInfo?.Arr_Time),
        calculatedDate && ConvertDate(calculatedDate),
        "helldfhkdxjhfkdjhfkxdjhf"
      );
      // }
    }
  }, [ticketlist]);

  console.log(selectedSeats1?.map(
    (seat, index) => travelerDetails?.[index]?.age), 'passenger_age')
  return (
    <>
      {razorpayloading ? (
        <>
          {/* <Skeleton
            loading={razorpayloading}
            active
            style={{ margin: "0.5vw", padding: "0.5vw" }}
            paragraph={{ rows: 4 }}
            avatar
          ></Skeleton> */}
          <div className="flex items-center justify-center h-full w-full">
            <img src={busloading} className="h-[20vw] w-[40vw]" />
          </div>
          {/* <label className="text-center text-[1.5vw]">Loading</label> */}
        </>
      ) : (
        <Formik
          initialValues={{
            email: emailInput || "",
            mobile:
              mobileInput &&
                mobileInput !== "undefined" &&
                mobileInput !== "null"
                ? mobileInput
                : "",
            user_name:
              selectedSeats1?.map(
                (seat, index) => travelerDetails?.[index]?.user_name
              ) || "",
            age:
              selectedSeats1?.map(
                (seat, index) => travelerDetails?.[index]?.age
              ) || "",
            gender: selectedSeats1?.map(
              (seat, index) => travelerDetails?.[index]?.gender || "male"
            ),
            ...selectedSeats1?.reduce((acc, seat, index) => {
              // Assuming travelerDetails is an array with traveler data corresponding to the selected seats
              acc[`user_name_${index}`] = travelerDetails?.[index]?.user_name || "";
              acc[`age_${index}`] = travelerDetails?.[index]?.age || "";
              acc[`gender_${index}`] = travelerDetails?.[index]?.gender || "male"; // Default gender to "male"
              return acc;
            }, {}),
            terms: termschecked || false,
            address: billAddress?.address ? billAddress?.address : "",
            pin_code: selectedRoutes?.pincode || "",
            state: from_source?.from_state || "",
            city: from_source?.from || "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { setFieldError }) => {
            handleSubmit(values, setFieldError);
            console.log(values, "values values");
            setRegisterFullDetails(values);
            localStorage.setItem("page1", true);
            localStorage.setItem("occupation", values.option);
            localStorage.setItem("mobile", values.mobile);
          }}
          enableReinitialize={false}
        >
          {({
            isSubmitting,
            isValid,
            handleSubmit,
            values,
            setFieldValue,
            handleChange,
            resetForm
          }) => {

            // Update the form state when Formik state changes
            if (
              formState?.isValid !== isValid ||
              formState?.isSubmitting !== isSubmitting
            ) {
              setFormState({ isValid, isSubmitting });
            }

            return (
              // <Form onSubmit={handleSubmit}>
              <div className="w-full h-full">
                {ticketloading === false && ticketnumber === null ? (
                  <div
                    ref={sectionRef}
                    className="p-[2.5vw] md:p-[1.5vw] flex flex-col gap-y-[3vw] md:gap-y-[1.60vw]"
                  >
                    {/* Wrap the components in a Fragment or div */}
                    <>
                      <>
                        <JourneyDetails
                          BusDetails={BusDetails}
                          layout={layout}
                          selectedSeats={selectedSeats}
                          selectedRoutes={selectedRoutes}
                          busprice={busprice}
                          seatDetails={seatDetails}
                        />
                        <PassengerDetails
                          registerfulldetails={registerfulldetails}
                          setRegisterFullDetails={setRegisterFullDetails}
                          seatDetails={seatDetails}
                          BusDetails={BusDetails}
                          selectedSeats={selectedSeats}
                          discount={busprice}
                          setTravelerDetails={setTravelerDetails}
                          travelerDetails={travelerDetails}
                          setEmailInput={setEmailInput}
                          emailInput={emailInput}
                          setMobileInput={setMobileInput}
                          mobileInput={mobileInput}
                          enableInput={enableInput}
                          setEnableInput={setEnableInput}
                          isAllDetailsFilled={isAllDetailsFilled}
                          onClose={onClose}
                        />
                        <BiilingAddress
                          BusDetails={BusDetails}
                          selectedSeats1={seatDetails}
                          travelerDetails={travelerDetails}
                          selectedRoutes={selectedRoutes}
                          emailInput={emailInput}
                          mobileInput={mobileInput}
                          selectedseatprice={selectedseatprice}
                          setConfirmModal={setConfirmModal}
                          setConfirmRefNo={setConfirmRefNo}
                          confirmRefNo={confirmRefNo}
                          confirmModal={confirmModal}
                          handleScroll={handleScroll}
                          faredetails={faredetails}
                          setFareDetails={setFareDetails}
                          enableInput={enableInput}
                          setEnableInput={setEnableInput}
                          isAllDetailsFilled={isAllDetailsFilled}
                          setTermsChecked={setTermsChecked}
                          termschecked={termschecked}
                          billAddress={billAddress}
                          setBillAddress={setBillAddress}
                          buttondisable={buttondisable}
                          onClose={onClose}
                        />
                        {confirmModal && (
                          <div id="targetSection">
                            <ConfirmTicket
                              seatDetails={seatDetails}
                              BusDetails={BusDetails}
                              selectedSeats={selectedSeats}
                              discount={busprice}
                              confirmRefNo={confirmRefNo}
                              faredetails={faredetails}
                              emailInput={emailInput}
                              mobileInput={mobileInput}
                              setDropDown={setDropDown}
                              setRazorpayLoading={setRazorpayLoading}
                              setTicketNumber={setTicketNumber}
                              setTicketLoading={setTicketLoading}
                              selectedRoutes={selectedRoutes}
                              travelerDetails={travelerDetails}
                            />
                          </div>
                        )}
                      </>
                    </>
                  </div>
                ) : ticketlist?.status === "success" ? (
                  <div className="p-[2.5vw] md:p-[1.5vw] flex flex-col gap-y-[3vw] md:gap-y-[1.60vw]">
                    <ViewFullTicket
                      ticketnumber={ticketnumber}
                      ticketDetails={ticketlist}
                      droppingDate={
                        calculatedDate && ConvertDate(calculatedDate)
                      }
                    />
                  </div>
                ) : (
                  // <Skeleton
                  //   active
                  //   style={{ margin: "0.5vw", padding: "0.5vw" }}
                  //   paragraph={{ rows: 10 }}
                  //   avatar
                  // ></Skeleton>
                  <div className="flex items-center justify-center h-full w-full">
                    <img src={busloading} className="h-[20vw] w-[40vw]" />
                  </div>
                )}
              </div>
              // </Form>
            );
          }}
        </Formik>
      )}
    </>
  );
}
