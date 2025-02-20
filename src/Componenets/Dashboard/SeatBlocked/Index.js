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
      .min(100000, 'Pincode must be at least 6 digits')
      .max(999999, 'Pincode must be a 6-digit number')

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

  const handleSubmit = async (values) => {

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
        } catch {
        }
      }
    } catch (error) {
      console.error("API call failed:", error);
    }
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
            terms: termschecked || false,
            address: billAddress?.address ? billAddress?.address : "",
            pin_code: selectedRoutes?.pincode || "",
            state: from_source?.from_state || "",
            city: from_source?.from || "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            handleSubmit(values);
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
                    // droppingDate={calculatedDate && ConvertDate(calculatedDate)}
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
