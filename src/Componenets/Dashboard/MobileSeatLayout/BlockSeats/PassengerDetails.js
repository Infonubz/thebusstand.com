import React, { useEffect, useState } from "react";
import { Tooltip, Spin, Select, ConfigProvider } from "antd";
import { IoIosCloseCircle } from "react-icons/io";
import { LoadingOutlined } from "@ant-design/icons";
import { IoCaretDownSharp } from "react-icons/io5";
import { IoCaretUpSharp } from "react-icons/io5";
import { RiArrowRightDoubleLine } from "react-icons/ri";
import { Collapse } from "antd";
import { IoIosArrowUp } from "react-icons/io";
import { RiArrowRightSLine } from "react-icons/ri";
import { GiSevenPointedStar } from "react-icons/gi";
import { BiSolidOffer } from "react-icons/bi";
import dayjs from "dayjs";
import Barcode from "react-barcode";
import { useRef } from "react";
// import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import complete from "../../../../Assets/BookingList/complete.png";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useLocation, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getTabIndex } from "@progress/kendo-react-common";
import { FaEdit } from "react-icons/fa";
import { Abhibus_SeatBlocked } from "../../../../Api-Abhibus/Dashboard/DashboardPage";
import { decryptData } from "../../../Common/Common-Functions/Encrypt-Decrypt";

export default function PassengerDetails({
  BusDetails,
  layout,
  selectedSeats,
  selectedRoutes,
  busprice,
  seatDetails,
  discount,
  travelerDetails,
  setTravelerDetails,
  setEmailInput,
  emailInput,
  mobileInput,
  setMobileInput,
}) {
  const apiUrlimage = process.env.REACT_APP_API_URL_IMAGE;
  const location = useLocation();

  const {
    selectedSeats2,
    selectedRoutes2,
    busdetails2,
    seatDetails2,
    discount2,
    //busprice,
  } = location.state || {};

  const [loader, setLoader] = useState(false);
  const selectedSeats1 = selectedSeats;
  const selectedRoutes1 = selectedRoutes2 || selectedRoutes;
  const busdetails1 = busdetails2 || BusDetails;
  const seatDetails1 = seatDetails2 || seatDetails;
  const discount1 = discount2 || discount;

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
    ...Array(selectedSeats1?.length)
      .fill(0)
      ?.reduce(
        (acc, _, index) => ({
          ...acc,
          [`user_name_${index}`]: Yup.string().required("Name is required"),
        }),
        {}
      ),
    ...Array(selectedSeats1?.length)
      .fill(0)
      ?.reduce(
        (acc, _, index) => ({
          ...acc,
          [`age_${index}`]: Yup.string().required("Age is required"),
        }),
        {}
      ),
    terms: Yup.boolean().oneOf(
      [true],
      "You must accept the terms and conditions"
    ),
  });
  // const [travelerDetails, setTravelerDetails] = useState(
  //   selectedSeats1?.reduce((acc, seat, index) => {
  //     acc[index] = { user_name: "", age: "", gender: "male", seat: "" };
  //     return acc;
  //   }, {})
  // );
  const LuxuryFind = (type) =>
    type?.toLowerCase().includes("volvo") ||
    type?.toLowerCase().includes("mercedes benz") ||
    type?.toLowerCase().includes("washroom") ||
    type?.toLowerCase().includes("bharatBenz") ||
    type?.toLowerCase().includes("luxury");
  const [registerfulldetails, setRegisterFullDetails] = useState({});
  console.log(registerfulldetails, "register_full_details");
  const [continuenext, setContinue] = useState(false);
  const [sumbitbutton, setSubmitButon] = useState(false);

  const [enableInput, setEnableInput] = useState(false);
  const [bookingId, setBookingId] = useState();
  const [loading, setLoading] = useState(false);
  const [termschecked, setTermsChecked] = useState(false);
  const [passengerId, setPassengerId] = useState("");
  const [showPrice, setShowPrice] = useState(false);
  const [busBookingId, setBusBookingId] = useState("");
  const [ticketDetail, setTicketDetail] = useState({});
  const [promoCode, setPromoCode] = useState("");
  const storedEmail = sessionStorage.getItem("user_email_id");
  const storedMobile = sessionStorage.getItem("user_mobile");
  // const [emailInput, setEmailInput] = useState(storedEmail || "");
  // const [mobileInput, setMobileInput] = useState(storedMobile || "");
  const [ratingModal, setRatingModal] = useState(false);
  const [passengerDropDown, setPassengerDropDown] = useState(null);
  // const [Passengerdata, setPassengerData] = useState({
  //   mobile: "",
  //   email: "",
  //   age: "",
  //   occupation: "",
  //   sex: "",
  // });
  const passengerdatalist = useSelector(
    (state) => state?.passenger_data?.add_passenger_details
  );
  const [formState, setFormState] = useState({
    isValid: false,
    isSubmitting: false,
  });

  const componentRef = useRef();

  const user_id1 = sessionStorage.getItem("user_id");
  const user_id = user_id && decryptData(user_id1);
  const navigation = useNavigate();

  const toggleDropDown = (index) => {
    setPassengerDropDown(passengerDropDown === index ? null : index);
  };

  const handlePassengerSelect = (e, passenger, index, setFieldValue) => {
    const selectedPassengerId = passenger.tbs_add_pax_id;
    const seatStatus = seatDetails1?.[selectedSeats1?.[index]]?.Status;

    if (passenger) {
      // Check gender match based on seat status
      if (
        (seatStatus === "F" && passenger.gender !== "female") ||
        // (seatStatus === "M" && passenger.gender !== "male") ||
        (seatStatus === "M" && !["male", "female"].includes(passenger.gender))
      ) {
        toast.error(
          "Selected passenger does not match seat gender requirement."
        );
        return; // Prevent selection if gender doesn't match seat status
      }

      // Update travelerDetails state
      setTravelerDetails((prevDetails) => {
        const updatedDetails = {
          ...prevDetails,
          [index]: {
            user_name: passenger.user_name,
            age: passenger.age,
            gender: passenger.gender,
            seat: selectedSeats1?.[index],
          },
        };

        // Check if the updated details are valid
        const hasValidDetails =
          updatedDetails[index]?.user_name &&
          updatedDetails[index]?.age &&
          updatedDetails[index]?.seat;

        // If valid details, you can execute any additional logic here
        if (hasValidDetails) {
          // Add any logic for displaying the icon or other actions
          console.log(
            "Valid traveler details selected:",
            updatedDetails[index]
          );
        }

        return updatedDetails;
      });

      // Update Formik's values
      setFieldValue(`user_name_${index}`, passenger.user_name);
      setFieldValue(`age_${index}`, passenger.age);
      setFieldValue(`gender_${index}`, passenger.gender);

      setPassengerId(selectedPassengerId);
    }

    setPassengerDropDown(null);
  };

  function generateRandomId(prefix, length) {
    const randomNumbers = Math.random().toString().substr(2, length);
    return prefix + randomNumbers;
  }

  // const generatePDF = () => {

  //   html2canvas(componentRef.current, {
  //     scrollX: 0,
  //     scrollY: -window.scrollY,
  //   }).then((canvas) => {
  //     const imgData = canvas.toDataURL("image/png");
  //     const pdf = new jsPDF("p", "mm", "a4");
  //     const imgWidth = pdf.internal.pageSize.getWidth();
  //     const imgHeight = (canvas.height * imgWidth) / canvas.width;
  //     pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
  //     pdf.save(`${registerfulldetails.name}.pdf`);
  //   });

  // };

  // const downloadPDF = () => {
  //   setLoader(true);
  //   const capture = componentRef.current;
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
  //       setLoader(false); // Stop loader after PDF is saved
  //     });
  //   } else {
  //     console.error("Element not found");
  //     setLoader(false);
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

  // useEffect(() => {
  //   const capture = componentRef.current;
  //   if (capture) {
  //     downloadPDF();
  //   } else {
  //     console.error("Element .actual-receipt not found on mount.");
  //   }
  // }, []);

  const handleSubmit = async (values) => {
    try {
      // const response = await SendBookingDetails(
      //   busdetails1,
      //   selectedRoutes1,
      //   selectedSeats1,
      //   travelerDetails,
      //   // localStorage.getItem("departure_date"),
      //   new Date(),
      //   emailInput,
      //   mobileInput,
      //   // sessionStorage.getItem("user_email_id"),
      //   // sessionStorage.getItem("user_mobile"),
      //   bookingId
      // );
      const response = await Abhibus_SeatBlocked(BusDetails);
      setShowPrice(true);
      setSubmitButon(true);
      setEnableInput(true);
      if (!bookingId) {
        setBookingId(response?.bookingId);
        // setBookingId1(response?.bookingId);
      }
    } catch (error) {
      console.error("Error", error);
    }
  };

  const handleBookingPrice = async () => {
    setLoading(true);
    const totalAmount = `${
      Number(discount1) + Number(Math.round(discount1 * 0.03))
    }`;

    setTimeout(() => {
      // setShowModal(false);
      setRatingModal(true);
    }, [5000]);
    // try {
    //   const response = await sendBookingPrice(
    //     totalAmount,
    //     bookingId,
    //     selectedSeats1,
    //     busdetails1,
    //     travelerDetails,
    //     promoCode
    //   );
    //   setBusBookingId(response.Booking_Id);
    //   console.log(response, "response for price");
    //   setContinue(true);
    //   toast.success("booked successfully");
    //   setLoading(false);
    // } catch (error) {
    //   console.error("Error", error);
    //   setLoading(false);
    // }
  };

  const closeRatingModal = () => {
    setRatingModal(false);
  };

  // const handleFormChange = (values) => {
  //   setRegisterFullDetails(values);
  //   localStorage.setItem("mobile", values.mobile);
  // };

  // const onClose = () => {
  //   setShowModal(false);
  //   setDropDown(null);
  // };

  // const onChange = (e) => {
  //   setPlacement(e.target.value);
  // };

  // const fetchBookingDetail = async (mobilenum) => {
  //   try {
  //     const data = await GetBookingDetails(mobilenum, dispatch);
  //     console.log(data[0].Array, "GetBookingDetails data");
  //   } catch (error) {
  //     console.error("Error fetching data", error);
  //   }
  // };

  // const handleRatings = () => {
  //   setRatingModal(true);
  // };

  // useEffect(() => {
  //   if (proceed) {
  //     handleBookingPrice();
  //   }
  // }, [proceed]);
  const seatStatus = seatDetails1;

  useEffect(() => {
    setTravelerDetails(
      selectedSeats1?.map((seat, index) => {
        // Find the seat status from setseatDetails1 using the seat number
        const seatStatus = seatDetails1?.[seat]?.Status;

        let gender = "male"; // Default to male
        if (seatStatus === "F") {
          gender = "female";
        } else if (seatStatus === "M") {
          gender = "male";
        }

        // Return traveler details object with the determined gender
        return {
          user_name: "",
          age: "",
          gender: gender, // Set gender based on seat status
          seat: "",
        };
      })
    );
  }, [selectedSeats1, seatDetails1]);

  // useEffect(() => {
  //   setTravelerDetails(
  //     selectedSeats1.map((seat, index) => ({
  //       name: "",
  //       age: "",
  //       gender: "male", // Default to male
  //     }))
  //   );
  // }, [selectedSeats1]);

  //   useEffect(() => {
  //     GetPassengerData(dispatch);
  //   }, [dispatch]);

  // useEffect(() => {
  //   if (localStorage.getItem("occupation")) {
  //     setPassengerData((prevPassengerdata) => ({
  //       ...prevPassengerdata,
  //       mobile: localStorage.getItem("mobile"),
  //       email: "",
  //       age: localStorage.getItem("age"),
  //       occupation: localStorage.getItem("occupation"),
  //       sex: localStorage.getItem("sex"),
  //       name: localStorage.getItem("name"),
  //     }));
  //   }
  // }, []);

  useEffect(() => {
    const handleTicketDetail = async () => {
      //   try {
      //     const response = await TicketViewDetails(busBookingId, mobileInput);
      //     setTicketDetail(response);
      //     console.log(response, "response for ticketdtl");
      //   } catch (error) {
      //     console.error("Error", error);
      //   }
    };
    if (busBookingId) {
      handleTicketDetail();
    }
  }, [busBookingId, mobileInput]);

  useEffect(() => {
    const fetchGetPassenger = async () => {
      const updateData = passengerId;
      //   try {
      //     const data = await GetPassengById(updateData);
      //     console.log(data, "datadata");
      //   } catch (error) {
      //     console.error("Error fetching additional user data", error);
      //   }
    };

    if (passengerId) {
      fetchGetPassenger();
    }
  }, [passengerId]);

  useEffect(() => {
    // if (storedEmail && storedEmail !== "undefined" && storedEmail !== "null") {
    //   setIsEmailDisabled(true);
    // }
    // if (
    //   storedMobile &&
    //   storedMobile !== "undefined" &&
    //   storedEmail !== "null"
    // ) {
    //   setIsMobileDisabled(true);
    // }
    // if (user_id) {
    //   GetUserDetails(navigation);
    // }
  }, [user_id, navigation]);

  // useEffect(() => {
  //   const handleResize = () => {
  //     if (window.innerWidth <= 480) {
  //       setDrawerWidth("95%");
  //     } else if (window.innerWidth <= 768) {
  //       setDrawerWidth("95%");
  //     } else {
  //       setDrawerWidth("60%");
  //     }
  //   };

  //   window.addEventListener("resize", handleResize);
  //   handleResize(); // Call it once to set initial width

  //   return () => {
  //     window.removeEventListener("resize", handleResize);
  //   };
  // }, []);

  const handleKeyDown = (event) => {
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
  };

  // const borderColor =
  //   busdetails1?.bus_type_status === "luxury" ? "#393939" : colorcode.theme;
  const getSeatColor = (index, travelerDetails, BusDetails, enableInput) => {
    const isMale =
      travelerDetails?.[index]?.gender === "male" || !travelerDetails?.[index];

    const isLuxury = LuxuryFind(BusDetails?.Bus_Type_Name);

    if (isMale) {
      return isLuxury ? "#393939" : "#1F4B7F";
    } else {
      return isLuxury ? (enableInput ? "#FFEFCE" : "#FFFFFF") : "#FFEFCE";
    }
  };
  const getButtonStyles = (
    index,
    travelerDetails,
    BusDetails,
    enableInput,
    gender
  ) => {
    const isLuxury = LuxuryFind(BusDetails?.Bus_Type_Name);
    const isSelected = travelerDetails?.[index]?.gender === gender;
    const isEmpty = !travelerDetails?.[index];

    return {
      background:
        isSelected || isEmpty
          ? isLuxury
            ? "#393939"
            : "#1F4B7F"
          : isLuxury
          ? enableInput
            ? "#FFFFFF"
            : "#FFFFFF"
          : "#FFFFFF",
      color:
        !isSelected && travelerDetails?.[index]
          ? isLuxury
            ? "#393939"
            : "#1F4B7F"
          : "",
      borderColor:
        isSelected || isEmpty ? (isLuxury ? "#393939" : "#1F4B7F") : "",
    };
  };

  const [isEmpty, setIsEmpty] = useState(true);

  // useEffect(() => {
  //   const checkIfAnyEmpty = Object?.values(travelerDetails)?.some((item) =>
  //     Object?.values(item)?.some((value) => value === "")
  //   );
  //   setIsEmpty(checkIfAnyEmpty);
  // }, [travelerDetails]);

  return (
    <div>
      <div className="">
        <Collapse
          style={{
            backgroundColor:
              LuxuryFind(BusDetails?.Bus_Type_Name) === true
                ? "#393939"
                : "#1F4B7F",
          }}
          defaultActiveKey={["1"]}
          className="rounded-[2.5vw] md:rounded-[1vw] shadow-xl border-none"
          expandIcon={({ isActive }) =>
            isActive ? (
              <IoIosArrowUp
                className="mt-[0.5vw] h-[5vw] w-[5vw] md:h-[2vw] md:w-[1.8vw]"
                style={{ color: "#FFFFFF" }}
              />
            ) : (
              <RiArrowRightSLine
                className="md:mt-[0.9vw] h-[5vw] w-[5vw] md:h-[2.5vw] md:w-[2.3vw]"
                style={{ color: "#FFFFFF" }}
              />
            )
          }
          expandIconPosition="end"
          items={[
            {
              key: "1",
              label: (
                <div className="flex items-center h-[4vw] md:h-[2.5vw]">
                  <div className="col-span-2">
                    <span className="">
                      {mobileInput != "" &&
                      emailInput != "" &&
                      isEmpty === false ? (
                        <img
                          src={complete}
                          alt="completeImage"
                          className="md:h-[2.5vw] md:w-[2.5vw] h-[7vw] w-[7vw]"
                        />
                      ) : (
                        ""
                      )}
                    </span>
                  </div>
                  <div className="pl-[1vw] text-[#FFFFFF] font-medium md:text-[1.5vw] text-[4vw]">
                    Passenger Details
                  </div>
                </div>
              ),
              children: (
                <div
                  style={{
                    backgroundColor:
                      LuxuryFind(BusDetails?.Bus_Type_Name) === true
                        ? "#FFEEC9"
                        : "white",
                  }}
                >
                  <div className="h-auto w-full px-[1vw] pb-[1vw]">
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
                          (seat, index) =>
                            travelerDetails?.[index]?.gender || "male"
                        ),
                        terms: termschecked || false,
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
                          <Form onSubmit={handleSubmit}>
                            <div class="flex flex-col md:grid md:grid-cols-6 md:flex-row md:items-center md:gap-[1vw] gap-y-[4vw] md:mb-[1vw] mb-[3vw] md:px-[0vw] px-[2vw] pt-[1vw]">
                              <div className="col-span-1">
                                <p
                                  className={`md:text-[1.1vw] text-[4vw] font-semibold  ${
                                    LuxuryFind(BusDetails?.Bus_Type_Name) ===
                                    true
                                      ? "text-[#393939]"
                                      : "text-[#1F487C]"
                                  }`}
                                >
                                  Contact Details
                                </p>
                              </div>
                              <div className="relative col-span-3">
                                <Field
                                  type="text"
                                  name="email"
                                  disabled={enableInput}
                                  autoComplete="off"
                                  placeholder="Email ID"
                                  value={emailInput}
                                  onChange={(e) => {
                                    handleChange(e);
                                    setEmailInput(e.target.value);
                                    setFieldValue("email", e.target.value);
                                    // sessionStorage.setItem(
                                    //   "user_email_id",
                                    //   e.target.value
                                    // );
                                  }}
                                  className={`${
                                    !isSubmitting || !enableInput
                                      ? `cursor-pointer`
                                      : "cursor-not-allowed"
                                  } border-r-[1.5vw] md:border-r-[0.5vw] md:placeholder:text-[1.2vw] placeholder:text-[3.5vw] border-[.1vw] 
                                                text-[4vw] md:text-[1.2vw] md:h-[3vw] w-full h-[10vw] md:w-full rounded-[1.5vw] md:rounded-[0.3vw] outline-none 
                                                px-[0.75vw] md:px-[0.5vw]   `}
                                  style={{
                                    borderColor:
                                      LuxuryFind(BusDetails?.Bus_Type_Name) ===
                                      true
                                        ? "#393939"
                                        : "#1F4B7F",
                                    color:
                                      LuxuryFind(BusDetails?.Bus_Type_Name) ===
                                      true
                                        ? "#393939"
                                        : "#1F4B7F",
                                  }}
                                />
                                <ErrorMessage
                                  name="email"
                                  component="div"
                                  className="text-red-500 text-[2.5vw] md:text-[0.8vw] absolute top-[9.7vw] md:top-[3vw] md:left-[0vw] left-[1vw] "
                                />
                              </div>
                              <div className="relative flex items-center col-span-2">
                                <div className="relative">
                                  <ConfigProvider
                                    theme={{
                                      token: {
                                        colorBgBase:
                                          enableInput === true
                                            ? "#FFEFCE"
                                            : "#FFFFFF",
                                        colorTextBase:
                                          BusDetails?.bus_type_status ===
                                          "luxury"
                                            ? "#393939"
                                            : "#1F487C",
                                      },
                                    }}
                                  >
                                    <Select
                                      disabled={enableInput}
                                      className={`${
                                        !isSubmitting || !enableInput
                                          ? `cursor-pointer`
                                          : "cursor-not-allowed"
                                      } custom-web-select md:w-[5.5vw] md:px-[0.01vw] md:h-[3vw] md:rounded-l-[0.3vw] w-[20vw] border-[0.1vw] outline-none px-[3vw] md:block hidden
    ${
      LuxuryFind(BusDetails?.Bus_Type_Name) === true
        ? "border-[#393939] text-[#393939]"
        : "border-[#1F487C] text-[#1F487C]"
    }`}
                                      dropdownStyle={{
                                        width: "5vw",
                                      }}
                                      style={{
                                        color:
                                          BusDetails?.bus_type_status ===
                                          "luxury"
                                            ? "#393939"
                                            : "#1F487C",
                                      }}
                                      optionRender={(item) => (
                                        <div
                                          style={{
                                            fontSize: "1vw",
                                            color:
                                              BusDetails?.bus_type_status ===
                                              "luxury"
                                                ? "#393939"
                                                : "#1F487C",
                                          }}
                                        >
                                          {item.label}
                                        </div>
                                      )}
                                      defaultValue={"+91"}
                                      options={[
                                        {
                                          value: "+91",
                                          label: "+91",
                                        },
                                        {
                                          value: "+31",
                                          label: "+31",
                                        },
                                      ]}
                                    />
                                  </ConfigProvider>
                                  <ConfigProvider
                                    theme={{
                                      token: {
                                        colorBgBase:
                                          enableInput === true
                                            ? "#FFEFCE"
                                            : "#FFFFFF",
                                        colorTextBase:
                                          BusDetails?.bus_type_status ===
                                          "luxury"
                                            ? "#393939"
                                            : "#1F487C",
                                      },
                                    }}
                                  >
                                    {" "}
                                    <Select
                                      disabled={enableInput}
                                      className={`${
                                        !isSubmitting || !enableInput
                                          ? `cursor-pointer`
                                          : "cursor-not-allowed"
                                      } custom-mobile-select w-[20vw] h-[10vw] outline-none  md:hidden block border-[0.1vw] rounded-l-[1.5vw]
                                              ${
                                                BusDetails?.bus_type_status ===
                                                "luxury"
                                                  ? "border-[#393939] text-[#393939]"
                                                  : "border-[#1F487C] text-[#1F487C]"
                                              }`}
                                      dropdownStyle={{
                                        width: "20vw",
                                      }}
                                      style={{
                                        color:
                                          BusDetails?.bus_type_status ===
                                          "luxury"
                                            ? "#393939"
                                            : "#1F487C",
                                      }}
                                      optionRender={(item) => (
                                        <div
                                          style={{
                                            fontSize: "4vw",
                                            color:
                                              BusDetails?.bus_type_status ===
                                              "luxury"
                                                ? "#393939"
                                                : "#1F487C",
                                          }}
                                        >
                                          {item.label}
                                        </div>
                                      )}
                                      defaultValue={"+91"}
                                      options={[
                                        {
                                          value: "+91",
                                          label: "+91",
                                        },
                                        {
                                          value: "+31",
                                          label: "+31",
                                        },
                                      ]}
                                    />
                                  </ConfigProvider>
                                </div>

                                <Field
                                  type="text"
                                  name="mobile"
                                  disabled={enableInput}
                                  // disabled={
                                  //   isMobileDisabled || enableInput
                                  // }
                                  placeholder="Mobile Number"
                                  maxLength={10}
                                  autoComplete="off"
                                  onKeyDown={handleKeyDown}
                                  value={mobileInput}
                                  onChange={(e) => {
                                    handleChange(e);
                                    setMobileInput(e.target.value);
                                    setFieldValue("mobile", e.target.value);
                                  }}
                                  className={`${
                                    !isSubmitting || !enableInput
                                      ? `cursor-pointer`
                                      : "cursor-not-allowed"
                                  }  border-r-[1.5vw] md:border-r-[0.5vw] md:placeholder:text-[1.2vw] placeholder:text-[3.5vw] border-black border-[0.1vw] 
                                                text-[4vw] md:text-[1.2vw] h-[10vw] md:h-[3vw] w-full md:w-full rounded-r-[1.5vw] md:rounded-r-[0.3vw] outline-none px-[3vw] md:px-[1vw]`}
                                  style={{
                                    borderColor:
                                      LuxuryFind(BusDetails?.Bus_Type_Name) ===
                                      true
                                        ? "#393939"
                                        : "#1F4B7F",
                                    color:
                                      LuxuryFind(BusDetails?.Bus_Type_Name) ===
                                      true
                                        ? "#393939"
                                        : "#1F4B7F",
                                  }}
                                />
                                <ErrorMessage
                                  name="mobile"
                                  component="div"
                                  className="text-red-500 text-[2.5vw] md:text-[0.8vw] absolute top-[9.75vw] md:top-[3vw] left-[1.2vw] md:left-[5.25vw]"
                                />
                              </div>
                            </div>
                            <div className="md:ml-[9vw] ml-[2.5vw]">
                              <p className="md:text-[1vw] text-[#666666] text-[3vw] md:pb-[1vw] md:px-[0vw]">
                                Your booking details will be sent to this email
                                address and mobile number.
                              </p>
                            </div>
                            <div className="grid md:grid-row-4 w-full h-full gap-[1vw] mt-[2vw] md:mt-[0vw] md:px-[0vw]">
                              <div
                                className=" md:w-full md:ml-[0vw] md:mr-[0.5vw] ml-[2vw] mr-[4vw] rounded-[2vw] md:rounded-[0.7vw]"
                                style={{
                                  borderColor:
                                    LuxuryFind(BusDetails?.Bus_Type_Name) ===
                                    true
                                      ? "#393939"
                                      : "#1F4B7F",
                                }}
                              >
                                {/* {Object?.entries([seatDetails1])?.length > 0 &&
                                  Object?.entries([seatDetails1])?.map(
                                
                                    ([seatNumber, item], index) => ( */}
                                {seatDetails1 &&
                                  Object.entries(seatDetails1)?.length > 0 &&
                                  Object.entries(seatDetails1)?.map(
                                    ([seatNumber, item], index) => (
                                      <>
                                        <div className="md:block hidden pt-[1vw] pb-[1.5vw]">
                                          <div className="grid grid-cols-12 gap-[1vw]">
                                            <div className="col-span-2 flex w-full items-center ">
                                              <p
                                                className={`text-[1vw] font-semibold ${
                                                  LuxuryFind(
                                                    BusDetails?.Bus_Type_Name
                                                  ) === true
                                                    ? "text-[#393939]"
                                                    : "text-[#1F487C]"
                                                }`}
                                              >
                                                Seat No: {item?.Seat}
                                              </p>
                                            </div>
                                            <div className=" col-span-6 relative">
                                              <Field
                                                type="text"
                                                autoComplete="off"
                                                disabled={enableInput}
                                                name={`user_name_${index}`}
                                                placeholder="Enter Passenger Name"
                                                value={
                                                  travelerDetails?.[index]
                                                    ?.user_name ||
                                                  values[
                                                    `user_name_${index}`
                                                  ] ||
                                                  ""
                                                }
                                                onChange={(e) => {
                                                  handleChange(e);
                                                  setFieldValue(
                                                    `user_name_${index}`,
                                                    e.target.value
                                                  );
                                                  setTravelerDetails(
                                                    (prevDetails) => ({
                                                      ...prevDetails,
                                                      [index]: {
                                                        ...prevDetails?.[index],
                                                        user_name:
                                                          e.target.value,
                                                        seat: item?.Seat,
                                                      },
                                                    })
                                                  );
                                                }}
                                                className={`${
                                                  !isSubmitting || !enableInput
                                                    ? `cursor-pointer`
                                                    : "cursor-not-allowed"
                                                } md:placeholder:text-[1.2vw] placeholder:text-[3.5vw] border-r-[0.5vw] border-[.1vw] text-[1.2vw] h-[3vw] w-full rounded-[0.3vw] outline-none px-[0.5vw] ${
                                                  LuxuryFind(
                                                    BusDetails?.Bus_Type_Name
                                                  ) === true
                                                    ? "text-[#393939]"
                                                    : "text-[#1F478C]"
                                                }`}
                                                style={{
                                                  borderColor:
                                                    LuxuryFind(
                                                      BusDetails?.Bus_Type_Name
                                                    ) === true
                                                      ? "#393939"
                                                      : "#1F4B7F",
                                                }}
                                              />
                                              <ErrorMessage
                                                name={`user_name_${index}`}
                                                component="div"
                                                className="text-red-500 text-[0.8vw] absolute mb-[1vw]"
                                              />
                                            </div>
                                            <div className="grid grid-cols-7 col-span-4 gap-[1vw]">
                                              <div className="col-span-3">
                                                <div className="relative">
                                                  <Field
                                                    type="text"
                                                    disabled={enableInput}
                                                    autoComplete="off"
                                                    name={`age_${index}`}
                                                    placeholder="Age"
                                                    maxLength={2}
                                                    value={
                                                      travelerDetails?.[index]
                                                        ?.age ||
                                                      values[`age_${index}`] ||
                                                      ""
                                                    }
                                                    onChange={(e) => {
                                                      handleChange(e);
                                                      setFieldValue(
                                                        `age_${index}`,
                                                        e.target.value
                                                      );
                                                      setTravelerDetails(
                                                        (prevDetails) => ({
                                                          ...prevDetails,
                                                          [index]: {
                                                            ...prevDetails?.[
                                                              index
                                                            ],
                                                            age: e.target.value,
                                                            seat: item?.Seat,
                                                          },
                                                        })
                                                      );
                                                    }}
                                                    onKeyDown={handleKeyDown}
                                                    className={`${
                                                      !isSubmitting ||
                                                      !enableInput
                                                        ? `cursor-pointer`
                                                        : "cursor-not-allowed"
                                                    }  md:placeholder:text-[1.2vw] md:text-[1.2vw] placeholder:text-[2vw] border-r-[0.5vw] border-[.1vw] border-black h-[3vw] w-full rounded-[0.3vw] outline-none px-[1vw]  ${
                                                      LuxuryFind(
                                                        BusDetails?.Bus_Type_Name
                                                      ) === true
                                                        ? "text-[#393939]"
                                                        : "text-[#1F478C]"
                                                    }`}
                                                    style={{
                                                      borderColor:
                                                        LuxuryFind(
                                                          BusDetails?.Bus_Type_Name
                                                        ) === true
                                                          ? "#393939"
                                                          : "#1F4B7F",
                                                    }}
                                                  />
                                                  <ErrorMessage
                                                    name={`age_${index}`}
                                                    component="div"
                                                    className="text-red-500 text-[0.8vw] absolute bottom-[-1.2vw]"
                                                  />
                                                </div>
                                              </div>

                                              <div className="relative col-span-4">
                                                <div className="flex pr-[1vw]">
                                                  {["male", "female"].map(
                                                    (gender, i) => (
                                                      <button
                                                        key={gender}
                                                        disabled={
                                                          enableInput ||
                                                          (gender === "male"
                                                            ? seatDetails1?.[
                                                                selectedSeats1?.[
                                                                  index
                                                                ]
                                                              ]?.Status === "M"
                                                            : seatDetails1?.[
                                                                selectedSeats1?.[
                                                                  index
                                                                ]
                                                              ]?.Status !== "F")
                                                        }
                                                        type="button"
                                                        name={`gender_${index}`}
                                                        style={getButtonStyles(
                                                          index,
                                                          travelerDetails,
                                                          BusDetails,
                                                          enableInput,
                                                          gender
                                                        )}
                                                        className={`${
                                                          !isSubmitting ||
                                                          !enableInput
                                                            ? "cursor-pointer"
                                                            : "cursor-not-allowed"
                                                        } text-white w-full h-[3vw] ${
                                                          i === 0
                                                            ? "rounded-l-[0.3vw]"
                                                            : "rounded-r-[0.3vw]"
                                                        } border-[0.1vw] text-[1vw] ${
                                                          LuxuryFind(
                                                            BusDetails?.Bus_Type_Name
                                                          )
                                                            ? "border-[#393939]"
                                                            : "border-[#1F487C]"
                                                        }`}
                                                        onClick={() =>
                                                          setTravelerDetails(
                                                            (prevDetails) => ({
                                                              ...prevDetails,
                                                              [index]: {
                                                                ...prevDetails?.[
                                                                  index
                                                                ],
                                                                gender,
                                                                seat: item?.Seat,
                                                              },
                                                            })
                                                          )
                                                        }
                                                      >
                                                        {gender
                                                          .charAt(0)
                                                          .toUpperCase() +
                                                          gender.slice(1)}
                                                      </button>
                                                    )
                                                  )}
                                                </div>

                                                <span className=" absolute top-[1vw] right-[-0.75vw] ">
                                                  {!travelerDetails?.[index]
                                                    ?.user_name &&
                                                  passengerdatalist?.length >
                                                    0 &&
                                                  !travelerDetails?.[index]
                                                    ?.age ? (
                                                    passengerDropDown ===
                                                    `${index}` ? (
                                                      <IoCaretUpSharp
                                                        onClick={() =>
                                                          toggleDropDown(
                                                            `${index}`
                                                          )
                                                        }
                                                        color={
                                                          LuxuryFind(
                                                            BusDetails?.Bus_Type_Name
                                                          ) === true
                                                            ? "#393939"
                                                            : "#1F4B7F"
                                                        }
                                                        className=" cursor-pointer"
                                                        size={"1.5vw"}
                                                      />
                                                    ) : (
                                                      <IoCaretDownSharp
                                                        onClick={() =>
                                                          toggleDropDown(
                                                            `${index}`
                                                          )
                                                        }
                                                        color={
                                                          LuxuryFind(
                                                            BusDetails?.Bus_Type_Name
                                                          ) === true
                                                            ? "#393939"
                                                            : "#1F4B7F"
                                                        }
                                                        className=" cursor-pointer"
                                                        size={"1.5vw"}
                                                      />
                                                    )
                                                  ) : (
                                                    <IoIosCloseCircle
                                                      onClick={() => {
                                                        if (enableInput) return; // Prevent action if disabled
                                                        setTravelerDetails(
                                                          (prevDetails) => ({
                                                            ...prevDetails,
                                                            [index]: {
                                                              ...prevDetails?.[
                                                                index
                                                              ],
                                                              user_name:
                                                                undefined,
                                                              age: undefined,
                                                            },
                                                          })
                                                        );
                                                        setFieldValue(
                                                          `user_name_${index}`,
                                                          undefined
                                                        );
                                                        setFieldValue(
                                                          `age_${index}`,
                                                          undefined
                                                        );
                                                      }}
                                                      color={
                                                        LuxuryFind(
                                                          BusDetails?.Bus_Type_Name
                                                        ) === true
                                                          ? "#393939"
                                                          : "#1F4B7F"
                                                      }
                                                      disabled={enableInput}
                                                      className={` ${
                                                        !isSubmitting ||
                                                        !enableInput
                                                          ? "cursor-pointer"
                                                          : "cursor-not-allowed"
                                                      }`}
                                                      size={"1.5vw"}
                                                    />
                                                  )}
                                                </span>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                        <div className="md:block hidden">
                                          {passengerDropDown === `${index}` &&
                                          passengerdatalist?.length > 0 ? (
                                            <div
                                              style={{
                                                borderColor:
                                                  LuxuryFind(
                                                    BusDetails?.Bus_Type_Name
                                                  ) === true
                                                    ? "#393939"
                                                    : "#1F4B7F",
                                              }}
                                              className="ml-[8.7vw] mr-[3vw] my-[0.5vw] border-[0.1vw] border-l-[0.1vw] border-t-[0.01vw] border-b-[0.3vw]
                                                       border-r-[0.3vw] rounded-[0.7vw]"
                                            >
                                              <div className="min-h-[4vw] max-h-[6.5vw] overflow-y-auto">
                                                {passengerdatalist?.length >
                                                  0 &&
                                                  passengerdatalist
                                                    .filter((passenger) => {
                                                      const seatStatus =
                                                        seatDetails1?.[
                                                          selectedSeats1?.[
                                                            index
                                                          ]
                                                        ]?.Status;
                                                      // Filter based on seat status
                                                      if (
                                                        seatStatus === "AFF"
                                                      ) {
                                                        return (
                                                          passenger.gender ===
                                                          "female"
                                                        );
                                                      } else if (
                                                        seatStatus === "AFM"
                                                      ) {
                                                        return (
                                                          passenger.gender ===
                                                          "male"
                                                        );
                                                      } else if (
                                                        seatStatus === "AFA"
                                                      ) {
                                                        // Allow both male and female for AFA status
                                                        return (
                                                          passenger.gender ===
                                                            "male" ||
                                                          passenger.gender ===
                                                            "female"
                                                        );
                                                      }
                                                      return true;
                                                    })
                                                    ?.map((passenger, idx) => (
                                                      <div
                                                        onClick={(e) => {
                                                          setFieldValue(
                                                            `passenger_name_${index}`,
                                                            passenger.passengerName
                                                          );
                                                          setTravelerDetails(
                                                            (prevDetails) => ({
                                                              ...prevDetails,
                                                              [index]: {
                                                                ...prevDetails?.[
                                                                  getTabIndex
                                                                ],
                                                                user_name:
                                                                  passenger.passengerName,
                                                                age: passenger.age,
                                                              },
                                                            })
                                                          );
                                                          handlePassengerSelect(
                                                            e,
                                                            passenger,
                                                            index,
                                                            setFieldValue
                                                          );
                                                        }}
                                                        className={`grid grid-cols-3 gap-[8vw] items-center px-[3vw] py-[0.7vw] border-b-[0.1vw] mx-[0.3vw] ${
                                                          LuxuryFind(
                                                            BusDetails?.Bus_Type_Name
                                                          ) === true
                                                            ? "text-[#393939] border-b-[#393939]"
                                                            : "text-[#1F487C] border-b-[#adadad]"
                                                        } hover:bg-gray-200 hover:rounded-sm`}
                                                        key={idx}
                                                      >
                                                        <div
                                                          className={`flex font-medium text-center text-[1.2vw] ${
                                                            LuxuryFind(
                                                              BusDetails?.Bus_Type_Name
                                                            ) === true
                                                              ? "text-[#393939]"
                                                              : "text-[#1F487C]"
                                                          }`}
                                                        >
                                                          {passenger.user_name}
                                                        </div>
                                                        <div
                                                          className={`flex font-medium text-center text-[1.2vw] ${
                                                            LuxuryFind(
                                                              BusDetails?.Bus_Type_Name
                                                            ) === true
                                                              ? "text-[#393939]"
                                                              : "text-[#1F487C]"
                                                          }`}
                                                        >
                                                          {passenger.age}
                                                        </div>
                                                        <div
                                                          className={`flex font-medium text-center text-[1.2vw] ${
                                                            LuxuryFind(
                                                              BusDetails?.Bus_Type_Name
                                                            ) === true
                                                              ? "text-[#393939]"
                                                              : "text-[#1F487C]"
                                                          }`}
                                                        >
                                                          {passenger.gender}
                                                        </div>
                                                      </div>
                                                    ))}
                                              </div>
                                            </div>
                                          ) : (
                                            ""
                                          )}
                                        </div>
                                        <span>
                                          <span className="md:hidden block">
                                            <div
                                              key={index}
                                              className="px-[0.3vw]"
                                            >
                                              <div className="">
                                                <p
                                                  className={`text-[4vw] font-semibold mt-[2vw] ${
                                                    LuxuryFind(
                                                      BusDetails?.Bus_Type_Name
                                                    ) === true
                                                      ? "text-[#393939]"
                                                      : "text-[#1F487C]"
                                                  }`}
                                                >
                                                  Seat No: {item?.Seat}
                                                </p>
                                              </div>
                                              <div className="flex flex-col gap-y-[4vw]">
                                                <div className="flex flex-row">
                                                  <div className="relative">
                                                    <Field
                                                      type="text"
                                                      disabled={enableInput}
                                                      name={`user_name_${index}`}
                                                      placeholder="User Name"
                                                      autoComplete="off"
                                                      value={
                                                        travelerDetails?.[index]
                                                          ?.user_name ||
                                                        values[
                                                          `user_name_${index}`
                                                        ] ||
                                                        ""
                                                      }
                                                      onChange={(e) => {
                                                        handleChange(e);
                                                        setFieldValue(
                                                          `user_name_${index}`,
                                                          e.target.value
                                                        );
                                                        setTravelerDetails(
                                                          (prevDetails) => ({
                                                            ...prevDetails,
                                                            [index]: {
                                                              ...prevDetails?.[
                                                                index
                                                              ],
                                                              user_name:
                                                                e.target.value,
                                                              seat: item?.Seat,
                                                            },
                                                          })
                                                        );
                                                      }}
                                                      className={`${
                                                        !isSubmitting ||
                                                        !enableInput
                                                          ? `cursor-pointer`
                                                          : "cursor-not-allowed"
                                                      }  border-r-[2vw] border-[.1vw] text-[4vw]  md:text-[1.2vw] md:placeholder:text-[1.2vw] 
                                                                placeholder:text-[3.5vw] h-[10vw] w-[83vw] rounded-[2vw] outline-none pl-[2vw] md:px-[1vw]`}
                                                      style={{
                                                        color:
                                                          LuxuryFind(
                                                            BusDetails?.Bus_Type_Name
                                                          ) === true
                                                            ? "#393939"
                                                            : "#1F4B7F",
                                                        borderColor:
                                                          LuxuryFind(
                                                            BusDetails?.Bus_Type_Name
                                                          ) === true
                                                            ? "#393939"
                                                            : "#1F4B7F",
                                                      }}
                                                    />
                                                    <ErrorMessage
                                                      name={`user_name_${index}`}
                                                      component="div"
                                                      className="text-red-500 text-[2.5vw] absolute top-[9.7vw] left-[2vw]"
                                                    />
                                                  </div>
                                                  <div>
                                                    {!travelerDetails?.[index]
                                                      ?.user_name &&
                                                    passengerdatalist?.length >
                                                      0 &&
                                                    !travelerDetails?.[index]
                                                      ?.age ? (
                                                      passengerDropDown ===
                                                      `${index}` ? (
                                                        <IoCaretUpSharp
                                                          onClick={() =>
                                                            toggleDropDown(
                                                              `${index}`
                                                            )
                                                          }
                                                          color={
                                                            LuxuryFind(
                                                              BusDetails?.Bus_Type_Name
                                                            ) === true
                                                              ? "#393939"
                                                              : "#1F4B7F"
                                                          }
                                                          className="ml-[1vw] mt-[2vw] cursor-pointer"
                                                          size={"5vw"}
                                                        />
                                                      ) : (
                                                        <IoCaretDownSharp
                                                          onClick={() =>
                                                            toggleDropDown(
                                                              `${index}`
                                                            )
                                                          }
                                                          color={
                                                            LuxuryFind(
                                                              BusDetails?.Bus_Type_Name
                                                            ) === true
                                                              ? "#393939"
                                                              : "#1F4B7F"
                                                          }
                                                          className="ml-[1vw] mt-[2vw] cursor-pointer"
                                                          size={"5vw"}
                                                        />
                                                      )
                                                    ) : (
                                                      <IoIosCloseCircle
                                                        onClick={() => {
                                                          if (enableInput)
                                                            return;
                                                          setTravelerDetails(
                                                            (prevDetails) => ({
                                                              ...prevDetails,
                                                              [index]: {
                                                                ...prevDetails?.[
                                                                  index
                                                                ],
                                                                user_name:
                                                                  undefined,
                                                                age: undefined, // or null to remove the value
                                                              },
                                                            })
                                                          );
                                                          setFieldValue(
                                                            `user_name_${index}`,
                                                            undefined
                                                          );
                                                          setFieldValue(
                                                            `age_${index}`,
                                                            undefined
                                                          );
                                                        }}
                                                        color={
                                                          LuxuryFind(
                                                            BusDetails?.Bus_Type_Name
                                                          ) === true
                                                            ? "#393939"
                                                            : "#1F4B7F"
                                                        }
                                                        disabled={enableInput}
                                                        className={`ml-[1vw] mt-[2vw] cursor-pointer
                                                                ${
                                                                  !isSubmitting ||
                                                                  !enableInput
                                                                    ? "cursor-pointer"
                                                                    : "cursor-not-allowed"
                                                                }`}
                                                        size={"5vw"}
                                                      />
                                                    )}
                                                  </div>
                                                </div>
                                                {passengerDropDown ===
                                                  `${index}` &&
                                                passengerdatalist?.length >
                                                  0 ? (
                                                  <div
                                                    style={{
                                                      borderColor:
                                                        LuxuryFind(
                                                          BusDetails?.Bus_Type_Name
                                                        ) === true
                                                          ? "#393939"
                                                          : "#1F4B7F",
                                                    }}
                                                    className={`my-[0.5vw] border-[0.1vw] border-l-[0.1vw] border-t-[0.01vw] border-b-[0.3vw]
                                                                    border-r-[0.3vw] rounded-[1.5vw] mr-[6vw] 
                                                                   "}`}
                                                  >
                                                    <div className="min-h-[9vw] max-h-[18vw] overflow-y-auto">
                                                      {passengerdatalist?.length >
                                                        0 &&
                                                        passengerdatalist
                                                          .filter(
                                                            (passenger) => {
                                                              const seatStatus =
                                                                seatDetails1?.[
                                                                  selectedSeats1[
                                                                    index
                                                                  ]
                                                                ]?.Status;
                                                              if (
                                                                seatStatus ===
                                                                "AFF"
                                                              ) {
                                                                return (
                                                                  passenger.gender ===
                                                                  "female"
                                                                );
                                                              } else if (
                                                                seatStatus ===
                                                                "AFM"
                                                              ) {
                                                                return (
                                                                  passenger.gender ===
                                                                  "male"
                                                                );
                                                              } else if (
                                                                seatStatus ===
                                                                "AFA"
                                                              ) {
                                                                return (
                                                                  passenger.gender ===
                                                                    "male" ||
                                                                  passenger.gender ===
                                                                    "female"
                                                                );
                                                              }
                                                              return true;
                                                            }
                                                          )
                                                          ?.map(
                                                            (
                                                              passenger,
                                                              idx
                                                            ) => (
                                                              <div
                                                                onClick={(
                                                                  e
                                                                ) => {
                                                                  setFieldValue(
                                                                    `passenger_name_${index}`,
                                                                    passenger.passengerName
                                                                  );
                                                                  setTravelerDetails(
                                                                    (
                                                                      prevDetails
                                                                    ) => ({
                                                                      ...prevDetails,
                                                                      [index]: {
                                                                        ...prevDetails?.[
                                                                          getTabIndex
                                                                        ],
                                                                        user_name:
                                                                          passenger.passengerName,
                                                                        age: passenger.age,
                                                                      },
                                                                    })
                                                                  );
                                                                  handlePassengerSelect(
                                                                    e,
                                                                    passenger,
                                                                    index,
                                                                    setFieldValue
                                                                  );
                                                                }}
                                                                className={`grid grid-cols items-center px-[2vw] py-[1.9vw] border-b-[0.1vw] ${
                                                                  LuxuryFind(
                                                                    BusDetails?.Bus_Type_Name
                                                                  ) === true
                                                                    ? "text-[#393939] border-b-[#393939]"
                                                                    : "text-[#1F487C] border-b-[#adadad]"
                                                                } hover:bg-gray-200 hover:rounded-sm`}
                                                                key={idx}
                                                              >
                                                                <div
                                                                  className={`flex font-medium text-center ${
                                                                    LuxuryFind(
                                                                      BusDetails?.Bus_Type_Name
                                                                    ) === true
                                                                      ? "text-[#393939]"
                                                                      : "text-[#1F487C]"
                                                                  }`}
                                                                >
                                                                  {
                                                                    passenger.user_name
                                                                  }{" "}
                                                                  - (Age :{" "}
                                                                  {
                                                                    passenger.age
                                                                  }
                                                                  /
                                                                  {/* {capitalizeFirstLetter(
                                                                    passenger.gender
                                                                  )} */}
                                                                  )
                                                                </div>
                                                              </div>
                                                            )
                                                          )}
                                                    </div>
                                                  </div>
                                                ) : (
                                                  ""
                                                )}
                                                <div className="flex justify-between pb-[5vw]">
                                                  <div className="">
                                                    <button
                                                      // disabled={
                                                      //   enableInput ||
                                                      //   seatDetails1?.[
                                                      //     selectedSeats1?.[
                                                      //       index
                                                      //     ]
                                                      //   ]?.Status !== "AFA"
                                                      // }
                                                      type="button"
                                                      name="gender"
                                                      style={{
                                                        background:
                                                          travelerDetails?.[
                                                            index
                                                          ]?.gender ===
                                                            "male" ||
                                                          !travelerDetails?.[
                                                            index
                                                          ]
                                                            ? LuxuryFind(
                                                                BusDetails?.Bus_Type_Name
                                                              ) === true
                                                              ? "#393939"
                                                              : LuxuryFind(
                                                                  BusDetails?.Bus_Type_Name
                                                                ) === true
                                                              ? "#1F4B7F"
                                                              : ""
                                                            : "#ffffff",
                                                        color:
                                                          travelerDetails?.[
                                                            index
                                                          ]?.gender !==
                                                            "male" &&
                                                          travelerDetails?.[
                                                            index
                                                          ]
                                                            ? LuxuryFind(
                                                                BusDetails?.Bus_Type_Name
                                                              ) === true
                                                              ? "#393939"
                                                              : LuxuryFind(
                                                                  BusDetails?.Bus_Type_Name
                                                                ) === true
                                                              ? "#1F4B7F"
                                                              : ""
                                                            : "",
                                                        borderColor:
                                                          travelerDetails?.[
                                                            index
                                                          ]?.gender ===
                                                            "male" ||
                                                          !travelerDetails?.[
                                                            index
                                                          ]
                                                            ? LuxuryFind(
                                                                BusDetails?.Bus_Type_Name
                                                              ) === true
                                                              ? "#393939"
                                                              : LuxuryFind(
                                                                  BusDetails?.Bus_Type_Name
                                                                ) === true
                                                              ? "#1F4B7F"
                                                              : ""
                                                            : "",
                                                      }}
                                                      className={`${
                                                        !isSubmitting ||
                                                        !enableInput
                                                          ? "cursor-pointer"
                                                          : "cursor-not-allowed"
                                                      } h-[10vw] w-[22vw] rounded-l-[1.5vw] text-[3.5vw] border-[0.1vw] text-white ${
                                                        LuxuryFind(
                                                          BusDetails?.Bus_Type_Name
                                                        ) === true
                                                          ? "border-[#393939]"
                                                          : "border-[#1F487C]"
                                                      }`}
                                                      onClick={() =>
                                                        setTravelerDetails(
                                                          (prevDetails) => ({
                                                            ...prevDetails,
                                                            [index]: {
                                                              ...prevDetails?.[
                                                                index
                                                              ],
                                                              gender: "male",
                                                              seat: item?.Seat,
                                                            },
                                                          })
                                                        )
                                                      }
                                                    >
                                                      Male
                                                    </button>
                                                    <button
                                                      // disabled={
                                                      //   enableInput ||
                                                      //   seatDetails1?.[
                                                      //     selectedSeats1?.[
                                                      //       index
                                                      //     ]
                                                      //   ]?.Status !== "AFA"
                                                      // }
                                                      type="button"
                                                      name={`gender_${index}`}
                                                      style={{
                                                        background:
                                                          travelerDetails?.[
                                                            index
                                                          ]?.gender ===
                                                            "female" ||
                                                          !travelerDetails?.[
                                                            index
                                                          ]
                                                            ? LuxuryFind(
                                                                BusDetails?.Bus_Type_Name
                                                              ) === true
                                                              ? "#393939"
                                                              : LuxuryFind(
                                                                  BusDetails?.Bus_Type_Name
                                                                ) === true
                                                              ? "#1F4B7F"
                                                              : "#ffffff"
                                                            : "#ffffff",
                                                        color:
                                                          travelerDetails?.[
                                                            index
                                                          ]?.gender !==
                                                            "female" &&
                                                          travelerDetails?.[
                                                            index
                                                          ]
                                                            ? LuxuryFind(
                                                                BusDetails?.Bus_Type_Name
                                                              ) === true
                                                              ? "#393939"
                                                              : LuxuryFind(
                                                                  BusDetails?.Bus_Type_Name
                                                                ) === true
                                                              ? "#1F4B7F"
                                                              : ""
                                                            : "",
                                                        borderColor:
                                                          travelerDetails?.[
                                                            index
                                                          ]?.gender ===
                                                            "female" ||
                                                          !travelerDetails?.[
                                                            index
                                                          ]
                                                            ? LuxuryFind(
                                                                BusDetails?.Bus_Type_Name
                                                              ) === true
                                                              ? "#393939"
                                                              : LuxuryFind(
                                                                  BusDetails?.Bus_Type_Name
                                                                ) === true
                                                              ? "#1F4B7F"
                                                              : ""
                                                            : "",
                                                      }}
                                                      className={`${
                                                        !isSubmitting ||
                                                        !enableInput
                                                          ? "cursor-pointer"
                                                          : "cursor-not-allowed"
                                                      } text-white h-[10vw] w-[22vw] rounded-r-[1.5vw] border-[0.1vw] text-[3.5vw] ${
                                                        LuxuryFind(
                                                          BusDetails?.Bus_Type_Name
                                                        ) === true
                                                          ? "border-[#393939]"
                                                          : "border-[#1F487C]"
                                                      }`}
                                                      onClick={() =>
                                                        setTravelerDetails(
                                                          (prevDetails) => ({
                                                            ...prevDetails,
                                                            [index]: {
                                                              ...prevDetails?.[
                                                                index
                                                              ],
                                                              gender: "female",
                                                              seat: item?.Seat,
                                                            },
                                                          })
                                                        )
                                                      }
                                                    >
                                                      Female
                                                    </button>
                                                  </div>
                                                  <div className="relative">
                                                    <Field
                                                      type="text"
                                                      disabled={enableInput}
                                                      autoComplete="off"
                                                      name={`age_${index}`}
                                                      placeholder="Age"
                                                      maxLength={2}
                                                      value={
                                                        travelerDetails?.[index]
                                                          ?.age ||
                                                        values[
                                                          `age_${index}`
                                                        ] ||
                                                        ""
                                                      }
                                                      onChange={(e) => {
                                                        handleChange(e);
                                                        setFieldValue(
                                                          `age_${index}`,
                                                          e.target.value
                                                        );
                                                        setTravelerDetails(
                                                          (prevDetails) => ({
                                                            ...prevDetails,
                                                            [index]: {
                                                              ...prevDetails?.[
                                                                index
                                                              ],
                                                              age: e.target
                                                                .value,
                                                              seat: item?.Seat,
                                                            },
                                                          })
                                                        );
                                                      }}
                                                      className={`${
                                                        !isSubmitting ||
                                                        !enableInput
                                                          ? `cursor-pointer`
                                                          : "cursor-not-allowed"
                                                      } border-r-[2vw] border-[.1vw] border-black text-[4vw] md:text-[1.2vw] placeholder:text-[3.5vw] 
                                                                h-[10vw] w-[33vw] rounded-[2vw] outline-none pl-[2vw] ml-[-39vw]`}
                                                      style={{
                                                        color:
                                                          LuxuryFind(
                                                            BusDetails?.Bus_Type_Name
                                                          ) === true
                                                            ? "#393939"
                                                            : "#1F4B7F",
                                                        borderColor:
                                                          LuxuryFind(
                                                            BusDetails?.Bus_Type_Name
                                                          ) === true
                                                            ? "#393939"
                                                            : "#1F4B7F",
                                                      }}
                                                    />
                                                    <ErrorMessage
                                                      name={`age_${index}`}
                                                      component="div"
                                                      className="text-red-500 text-[2.5vw] absolute md:top-[9.7vw] top-[10.7vw] md:left-[-30vw] left-[-38vw]"
                                                    />
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </span>
                                        </span>
                                      </>
                                    )
                                  )}
                              </div>
                            </div>
                          </Form>
                        );
                      }}
                    </Formik>
                  </div>
                </div>
              ),
            },
          ]}
        />
      </div>
    </div>
  );
}
