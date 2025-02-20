import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
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
    busdatas
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

  const [emailInput, setEmailInput] = useState("");
  const [mobileInput, setMobileInput] = useState("");
  const [confirmModal, setConfirmModal] = useState(false);
  const [confirmRefNo, setConfirmRefNo] = useState(null);
  const [registerfulldetails, setRegisterFullDetails] = useState({});
  const [termschecked, setTermsChecked] = useState(false);

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
      .min(100000, 'Pincode must be at least 6 digits')
      .max(999999, 'Pincode must be a 6-digit number')

  });

  const LuxuryFind = (type) =>
    type?.toLowerCase().includes("volvo") ||
    type?.toLowerCase().includes("mercedes benz") ||
    type?.toLowerCase().includes("washroom") ||
    type?.toLowerCase().includes("bharatBenz") ||
    type?.toLowerCase().includes("luxury");

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
      const response = await Abhibus_SeatBlocked(
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
          const data = await Abhibus_GetFareInfo(
            adultCount,
            childCount,
            response?.ReferenceNo
          );
          setFareDetails(data?.GetFaresInfo);
        } catch {
        }
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

  useEffect(() => {
    const value = sessionStorage.getItem("ticket_view");
    if (value === "open") {
      setShowModal(true);
    } else {
      setShowModal(false);
    }
  }, [sessionStorage.getItem("ticket_view")]);
  return (
    <Formik
      initialValues={{
        email: emailInput || "",
        mobile:
          mobileInput && mobileInput !== "undefined" && mobileInput !== "null"
            ? mobileInput
            : "",
        user_name:
          selectedSeats2?.map(
            (seat, index) => travelerDetails?.[index]?.user_name
          ) || "",
        age:
          selectedSeats2?.map((seat, index) => travelerDetails?.[index]?.age) ||
          "",
        gender: selectedSeats2?.map(
          (seat, index) => travelerDetails?.[index]?.gender || "male"
        ),
        terms: termschecked || false,
        address: selectedRoutes2?.dep_landmark ? selectedRoutes2?.dep_landmark : "",
        pin_code: selectedRoutes2?.dep_pincode ? selectedRoutes2?.dep_pincode : '',
        state: busdatas?.from_state ? busdatas?.from_state : '',
        city: busdatas?.from ? busdatas?.from : '',

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

          <div className="p-[2.5vw] md:p-[1.5vw] flex flex-col gap-y-[3vw] md:gap-y-[1.60vw]">
            {showModal === false && ticketlist?.length === 0 ? (
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
                  <MobileConfirmTicket
                    MobSeatDetails={seatDetails2}
                    MobBusDetails={busdetails2}
                    MobSelectedSeats={selectedSeats2}
                    MobDiscount={busprice2}
                    confirmRefNo={confirmRefNo}
                    faredetails={faredetails}
                    emailInput={emailInput}
                    mobileInput={mobileInput}
                  />
                )}
              </>
            ) : (
              <ViewFullTicket
                ticketDetails={ticketlist}
              // droppingDate={calculatedDate && ConvertDate(calculatedDate)}
              />
            )}
          </div>
          // </Form>
        );
      }}
    </Formik>
  );
}
