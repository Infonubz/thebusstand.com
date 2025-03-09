import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import MobileJourneyDetails from "./BlockSeats/MobileJourneyDetails";
import MobilePassengerDetails from "./BlockSeats/MobilePassengerDetails";
import MobileBillAddress from "./BlockSeats/MobileBillAddress";
import MobileConfirmTicket from "./BlockSeats/MobileConfirmTicket";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import {
  Abhibus_GetFareInfo,
  Abhibus_SeatBlocked,
} from "../../../Api-Abhibus/Dashboard/DashboardPage";
import { useSelector } from "react-redux";
import ViewFullTicket from "../MyAccount/ViewTicket/ViewFullTicket";
import MobileViewTicket from "../MyAccount/ViewTicket/MobileViewTicket";
import dayjs from "dayjs";
import busloading from "../../../Assets/Gif/bus.gif";
import { decryptData } from "../../Common/Common-Functions/Encrypt-Decrypt";
import {
  GetTBSFareInfo,
  GetTBSSeatBlock,
} from "../../../Api-TBS/Dashboard/Dashboard";

export default function IndexBlock() {
  const location = useLocation();
  const {
    selectedSeats2,
    selectedRoutes2,
    busdetails2,
    seatDetails2,
    busprice2,
    selectedseatprice2,
    layout2,
    busdatas,
  } = location.state || {};

  const [loader, setLoader] = useState(false);
  const [formState, setFormState] = useState({
    isValid: false,
    isSubmitting: false,
  });

  const [travelerDetails, setTravelerDetails] = useState(
    selectedSeats2?.reduce((acc, seat, index) => {
      acc[index] = { user_name: "", age: "", gender: "male", seat: "" };
      return acc;
    }, {})
  );

  const [emailInput, setEmailInput] = useState(
    decryptData(sessionStorage.getItem("email_id")) || ""
  );
  const [mobileInput, setMobileInput] = useState(
    decryptData(sessionStorage.getItem("user_mobile")) || ""
  );
  const [confirmModal, setConfirmModal] = useState(false);
  const [confirmRefNo, setConfirmRefNo] = useState(null);
  const [registerfulldetails, setRegisterFullDetails] = useState({});
  const [termschecked, setTermsChecked] = useState(false);
  const [ticketNo, setTicketNo] = useState(null);
  const navigation = useNavigate();
  const [ticketLoader, setTicketLoader] = useState(false);
  const [razorpayloading, setRazorpayLoading] = useState(false);

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
    ...Array(selectedSeats2?.length)
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
    ...Array(selectedSeats2?.length)
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

  // const LuxuryFind = (type) =>
  //   type?.toLowerCase().includes("volvo") ||
  //   type?.toLowerCase().includes("mercedes benz") ||
  //   type?.toLowerCase().includes("washroom") ||
  //   type?.toLowerCase().includes("bharatBenz") ||
  //   type?.toLowerCase().includes("luxury");

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
  const [faredetails, setFareDetails] = useState("");

  const handleSubmit = async (values) => {
    try {
      // const response = await Abhibus_SeatBlocked(
      //   busdetails2,
      //   seatDetails2,
      //   travelerDetails,
      //   values,
      //   selectedRoutes2,
      //   emailInput,
      //   mobileInput,
      //   selectedseatprice2
      // );
      const response = await GetTBSSeatBlock(
        busdetails2,
        seatDetails2,
        travelerDetails,
        values,
        selectedRoutes2,
        emailInput,
        mobileInput,
        selectedseatprice2
      );
      if (response?.status === "success") {
        setConfirmModal(true);
        setEnableInput(true);
        setConfirmRefNo(response?.ReferenceNo);
        try {
          // const data = await Abhibus_GetFareInfo(
          //   adultCount,
          //   childCount,
          //   response?.ReferenceNo
          // );
          const data = await GetTBSFareInfo(
            adultCount,
            childCount,
            response?.ReferenceNo
          );
          setFareDetails(data?.GetFaresInfo);
        } catch {}
      }
    } catch (error) {
      console.error("API call failed:", error);
    }
  };
  const isAllDetailsFilled = Object.values(travelerDetails).every(
    (traveler) =>
      traveler.user_name !== "" &&
      traveler.age !== "" &&
      traveler.gender !== "" &&
      traveler.seat !== ""
  );

  const [enableInput, setEnableInput] = useState(false);

  const ticketlist = useSelector((state) => state?.get_ticket_detail);

  const [showModal, setShowModal] = useState(false);
  const [calArrival, setCalArrival] = useState({
    journeyDate: ticketlist?.ticketInfo?.originStartTime,
    starTime: ticketlist?.ticketInfo?.Start_Time,
    endTime: ticketlist?.ticketInfo?.Arr_Time,
  });

  useEffect(() => {
    if (ticketNo?.length > 0) {
      setTicketLoader(false);
    }
  }, [ticketNo]);

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

      setCalculatedDate(values);
      //setShowModal(true);

      // }
    }
  }, [ticketlist]);
  const handleNavigate = () => {
    navigation(`/bookedTicket`, {
      state: { ticketDetails: ticketlist, ticketNo: ticketNo },
    });
  };

  useEffect(() => {
    if (confirmModal) {
      const element = document.getElementById("targetSection");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [confirmModal]);

  return (
    <>
      {razorpayloading ? (
        <div className="flex items-center justify-center h-screen w-full">
          <img src={busloading} className="h-[50vw] w-[100vw]" />
        </div>
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
              selectedSeats2?.map(
                (seat, index) => travelerDetails?.[index]?.user_name
              ) || "",
            age:
              selectedSeats2?.map(
                (seat, index) => travelerDetails?.[index]?.age
              ) || "",
            gender: selectedSeats2?.map(
              (seat, index) => travelerDetails?.[index]?.gender || "male"
            ),
            terms: termschecked || false,
            address: selectedRoutes2?.dep_landmark
              ? selectedRoutes2?.dep_landmark
              : "",
            pin_code: selectedRoutes2?.dep_pincode
              ? selectedRoutes2?.dep_pincode
              : "",
            state: busdatas?.from_state ? busdatas?.from_state : "",
            city: busdatas?.from ? busdatas?.from : "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            handleSubmit(values);
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
              <>
                {ticketLoader === false && ticketNo === null ? (
                  <div className="p-[2.5vw] md:p-[1.5vw] flex flex-col gap-y-[3vw] md:gap-y-[1.60vw]">
                    <>
                      <MobileJourneyDetails
                        MobBusDetails={busdetails2}
                        MobLayout={layout2}
                        MobSelectedSeats={selectedSeats2}
                        MobSelectedRoutes={selectedRoutes2}
                        MobBusprice={busprice2}
                        MobSeatDetails={seatDetails2}
                      />
                      <MobilePassengerDetails
                        registerfulldetails={registerfulldetails}
                        setRegisterFullDetails={setRegisterFullDetails}
                        MobSeatDetails={seatDetails2}
                        MobBusDetails={busdetails2}
                        MobSelectedSeats={selectedSeats2}
                        MobDiscount={busprice2}
                        travelerDetails={travelerDetails}
                        setTravelerDetails={setTravelerDetails}
                        setEmailInput={setEmailInput}
                        emailInput={emailInput}
                        setMobileInput={setMobileInput}
                        mobileInput={mobileInput}
                        isAllDetailsFilled={isAllDetailsFilled}
                        enableInput={enableInput}
                        setEnableInput={setEnableInput}
                      />
                      <MobileBillAddress
                        MobBusDetails={busdetails2}
                        MobSeatDetails={seatDetails2}
                        travelerDetails={travelerDetails}
                        MobSelectedRoutes={selectedRoutes2}
                        emailInput={emailInput}
                        mobileInput={mobileInput}
                        MobSelectedseatprice={selectedseatprice2}
                        setConfirmModal={setConfirmModal}
                        setConfirmRefNo={setConfirmRefNo}
                        confirmModal={confirmModal}
                        registerfulldetails={registerfulldetails}
                        setRegisterFullDetails={setRegisterFullDetails}
                        isAllDetailsFilled={isAllDetailsFilled}
                        enableInput={enableInput}
                        setEnableInput={setEnableInput}
                        faredetails={faredetails}
                        setFareDetails={setFareDetails}
                      />
                      {confirmModal && (
                        <span id="targetSection">
                          <MobileConfirmTicket
                            MobSeatDetails={seatDetails2}
                            MobBusDetails={busdetails2}
                            MobSelectedSeats={selectedSeats2}
                            MobDiscount={busprice2}
                            MobSelectedRoutes={selectedRoutes2}
                            confirmRefNo={confirmRefNo}
                            faredetails={faredetails}
                            emailInput={emailInput}
                            mobileInput={mobileInput}
                            droppingDate={
                              calculatedDate && ConvertDate(calculatedDate)
                            }
                            ticketNo={ticketNo}
                            setTicketNo={setTicketNo}
                            ticketLoader={ticketLoader}
                            setTicketLoader={setTicketLoader}
                            razorpayloading={razorpayloading}
                            setRazorpayLoading={setRazorpayLoading}
                          />
                        </span>
                      )}
                    </>
                  </div>
                ) : ticketlist?.status === "success" && ticketNo !== null ? (
                  handleNavigate()
                ) : (
                  <div>
                    <div className="flex items-center justify-center h-screen w-full">
                      <img src={busloading} className="h-[50vw] w-[100vw]" />
                    </div>
                  </div>
                )}

                {/* navigation(`/bookedTicket`, { state: { ticketDetails: ticketlist?.ticketInfo, droppingDate: droppingDate } }) */}
              </>
              // </Form>
            );
          }}
        </Formik>
      )}
    </>
  );
}
