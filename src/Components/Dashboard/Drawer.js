import React, { useEffect, useState } from "react";
import { Tooltip, Spin } from "antd";
import complete from "../../assets/complete.png";
import { IoIosCloseCircle } from "react-icons/io";
import { capitalizeFirstLetter } from "../Common/Captalization";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "../../App.css";
import { LoadingOutlined } from "@ant-design/icons";
import { IoCaretDownSharp } from "react-icons/io5";
import { IoCaretUpSharp } from "react-icons/io5";
import { RiArrowRightDoubleLine } from "react-icons/ri";
import { Collapse } from "antd";
import { IoIosArrowUp } from "react-icons/io";
import { RiArrowRightSLine } from "react-icons/ri";
import { GiSevenPointedStar } from "react-icons/gi";
import dayjs from "dayjs";
import Barcode from "react-barcode";
import { useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import platformTheme from "./PlatformTheme";
import { FiDownload } from "react-icons/fi";
import {
  GetPassengById,
  GetPassengerData,
} from "../../Api/MyAccounts/Passenger";
import {
  SendBookingDetails,
  sendBookingPrice,
  TicketViewDetails,
  // GetBookingDetails,
} from "../../Api/MyAccounts/MyBookings";
import { useDispatch, useSelector } from "react-redux";
import { FaEdit } from "react-icons/fa";
import ModalPopup from "../MainComponenet/Modal/ModalPopup";
import { RatingFeedBack } from "../Home/MyAccounts/RatingFeedBack";
import { toast } from "react-toastify";
import { GetUserDetails } from "../../Api/Login/Login";
import { useLocation, useNavigate } from "react-router";
import MobileTicketView from "../MobileView/MobileTicketView";
import { getTabIndex } from "@progress/kendo-react-common";
//import { useFormikContext } from "formik";

// import { FaAngleRight } from "react-icons/fa6";
// import { FaBus } from "react-icons/fa6";
// import { FaMapMarkerAlt } from "react-icons/fa";
// import ticketview from "../../assets/ticket_view.png";
// import amountView from "../../assets/Group.png";
// import backgroundImg from "../../assets/SINGLECARD_BG.png";
// import upi from "../../assets/upi.png";
// import phonepay from "../../assets/phonepay.png";
// import gpay from "../../assets/gpay.png";
// import bank from "../../assets/bank.png";
// import wallet from "../../assets/wallet.png";
// import card from "../../assets/card.png";
// import { IoCardSharp } from "react-icons/io5";
// import { BsBank2 } from "react-icons/bs";

// import { GiWallet } from "react-icons/gi";

// import state from "../../assets/state_bank.jpg";
// import kotak from "../../assets/kotak.png";
// import hdfc from "../../assets/hdfc.png";
// import icici from "../../assets/icici.png";
// import axis from "../../assets/axis.png";
// import DrawerMobile from "./DrawerMobile";
// import { FaPhoneFlip } from "react-icons/fa6";
// import { MdEmail } from "react-icons/md";

// const upivalidationSchema = Yup.object().shape({
//   upiId: Yup.string()
//     // .matches(
//     //   /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(@upi)$/,
//     //   "Invalid UPI ID format"
//     // )

//     .required("UPI ID is required"),
// });

function DrawerDetails({
  // modalshow,
  //setShowModal,
  busdetails,
  seatplatform,
  seatDetails,
  // type,
  // busprice,
  selectedSeats,
  selectedRoutes,
  discount,
  //imageurl,
  //setDropDown,
  //bookingId1,
  setBookingId1,
}) {
  const apiUrlimage = process.env.REACT_APP_API_URL_IMAGE;

  const apicrmimage = process.env.REACT_APP_CRM_API_URL_IMAGE;
  const location = useLocation();
  const {
    selectedSeats2,
    selectedRoutes2,
    busdetails2,
    seatDetails2,
    discount2,
    //busprice,
  } = location.state || {};

  const selectedSeats1 = selectedSeats2 || selectedSeats;
  const selectedRoutes1 = selectedRoutes2 || selectedRoutes;
  const busdetails1 = busdetails2 || busdetails;
  const seatDetails1 = seatDetails2 || seatDetails;
  const discount1 = discount2 || discount;
  const offers = [
    { Coupon: "BUSSAVE10", details: "Get 10% off on all bus tickets." },
    { Coupon: "TRAVEL20", details: "Save $20 on round-trip bus tickets." },
    {
      Coupon: "BUSRIDE15",
      details: "Enjoy 15% discount1 on intercity bus rides.",
    },
    { Coupon: "WEEKEND50", details: "Avail 50% off on weekend bus travel." },
  ];

  // const banklist = [
  //   { logo: state, bank: "State Bank of India" },
  //   { logo: kotak, bank: "Kotak Bank" },
  //   { logo: axis, bank: "Axis Bank" },
  //   { logo: hdfc, bank: "HDFC Bank" },
  //   { logo: icici, bank: "ICICI Bank" },
  // ];

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
      .required("Email is required"),
    ...Array(selectedSeats1?.length)
      .fill(0)
      .reduce(
        (acc, _, index) => ({
          ...acc,
          [`user_name_${index}`]: Yup.string().required("Name is required"),
        }),
        {}
      ),
    ...Array(selectedSeats1?.length)
      .fill(0)
      .reduce(
        (acc, _, index) => ({
          ...acc,
          [`age_${index}`]: Yup.string().required("Age is required"),
        }),
        {}
      ),
    //terms: Yup.bool().oneOf([true], "Terms must be accepted"),
  });
  //const [open, setOpen] = useState(true);
  //const [placement, setPlacement] = useState("right");
  // const [paymenttype, setPaymentType] = useState("upi");
  // const [selectbank, setSelectBank] = useState("");
  // const [editenable, setEditEnable] = useState(true);
  //const [mobilenum, setMobilenum] = useState();
  //const [proceed, setProceed] = useState(false);
  // const [userdetails, setUserDetails] = useState({
  //   sex: localStorage.getItem("sex") || "male",
  // });
  // const [selectedPassenger, setSelectedPassenger] = useState(null);

  //const [isEmailDisabled, setIsEmailDisabled] = useState(false);
  //const [isMobileDisabled, setIsMobileDisabled] = useState(false);
  const [registerfulldetails, setRegisterFullDetails] = useState({});
  const [continuenext, setContinue] = useState(false);
  const [sumbitbutton, setSubmitButon] = useState(false);
  const [enableInput, setEnableInput] = useState(false);
  const [bookingId, setBookingId] = useState();
  const [loading, setLoading] = useState(false);
  const [termschecked, setTermsChecked] = useState();
  const [passengerId, setPassengerId] = useState("");
  const [showPrice, setShowPrice] = useState(false);
  const [busBookingId, setBusBookingId] = useState("");
  const [ticketDetail, setTicketDetail] = useState({});
  const [promoCode, setPromoCode] = useState("");
  const storedEmail = sessionStorage.getItem("user_email_id");
  const storedMobile = sessionStorage.getItem("user_mobile");
  const [emailInput, setEmailInput] = useState(storedEmail || "");
  const [mobileInput, setMobileInput] = useState(storedMobile || "");
  const [ratingModal, setRatingModal] = useState(false);
  const [passengerDropDown, setPassengerDropDown] = useState(null);
  const [Passengerdata, setPassengerData] = useState({
    mobile: "",
    email: "",
    age: "",
    occupation: "",
    sex: "",
  });
  const passengerdatalist = useSelector(
    (state) => state?.passenger_data.add_passenger_details
  );
  const [formState, setFormState] = useState({
    isValid: false,
    isSubmitting: false,
  });

  const colorcode = platformTheme(seatplatform);
  const componentRef = useRef();
  const dispatch = useDispatch();
  const [travelerDetails, setTravelerDetails] = useState(
    selectedSeats1.reduce((acc, seat, index) => {
      acc[index] = { user_name: "", age: "", gender: "male", seat: "" };
      return acc;
    }, {})
  );
  const [drawerWidth, setDrawerWidth] = useState("60%");
  const user_id = sessionStorage.getItem("user_id");
  const navigation = useNavigate();

  const toggleDropDown = (index) => {
    setPassengerDropDown(passengerDropDown === index ? null : index);
  };

  const handlePassengerSelect = (e, passenger, index, setFieldValue) => {
    const selectedPassengerId = passenger.tbs_add_pax_id;
    const seatStatus = seatDetails1[selectedSeats1[index]]?.Status;

    if (passenger) {
      // Check gender match based on seat status
      if (
        (seatStatus === "AFF" && passenger.gender !== "female") ||
        (seatStatus === "AFM" && passenger.gender !== "male") ||
        (seatStatus === "AFA" && !["male", "female"].includes(passenger.gender))
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
            seat: selectedSeats1[index],
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

      console.log("Updated travelerDetails", {
        user_name: passenger.user_name,
        age: passenger.age,
        gender: passenger.gender,
        seat: selectedSeats1[index],
      });
    }

    setPassengerDropDown(null);
  };

  function generateRandomId(prefix, length) {
    const randomNumbers = Math.random().toString().substr(2, length);
    return prefix + randomNumbers;
  }

  const generatePDF = () => {
    html2canvas(componentRef.current, {
      scrollX: 0,
      scrollY: -window.scrollY,
    }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgWidth = pdf.internal.pageSize.getWidth();
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      pdf.save(`${registerfulldetails.name}.pdf`);
    });
  };

  const handleSubmit = async (values) => {
    console.log(values.email, values.mobile, "handle Submit");

    try {
      const response = await SendBookingDetails(
        busdetails1,
        selectedRoutes1,
        selectedSeats1,
        travelerDetails,
        // localStorage.getItem("departure_date"),
        new Date(),
        emailInput,
        mobileInput,
        // sessionStorage.getItem("user_email_id"),
        // sessionStorage.getItem("user_mobile"),
        bookingId
      );
      setShowPrice(true);
      setSubmitButon(true);
      setEnableInput(true);
      console.log(response?.bookingId, "values 123");
      if (!bookingId) {
        setBookingId(response?.bookingId);
        setBookingId1(response?.bookingId);
      }
    } catch (error) {
      console.error("Error", error);
    }
  };

  const handlePromoCode = async () => {
    console.log(promoCode, "Promocode Submit");
  };

  const handleBookingPrice = async () => {
    setLoading(true);
    const totalAmount = `${
      Number(discount1) + Number(Math.round(discount1 * 0.03))
    }`;
    console.log(
      totalAmount,
      bookingId,
      selectedSeats1,
      busdetails1,
      "busdetails1"
    );
    setTimeout(() => {
      // setShowModal(false);
      setRatingModal(true);
    }, [5000]);
    try {
      const response = await sendBookingPrice(
        totalAmount,
        bookingId,
        selectedSeats1,
        busdetails1,
        travelerDetails,
        promoCode
      );
      setBusBookingId(response.Booking_Id);
      console.log(response, "response for price");
      setContinue(true);
      toast.success("booked successfully");
      setLoading(false);
    } catch (error) {
      console.error("Error", error);
      setLoading(false);
    }
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

  useEffect(() => {
    setTravelerDetails(
      selectedSeats1.map((seat, index) => {
        // Find the seat status from setseatDetails1 using the seat number
        const seatStatus = seatDetails1[seat]?.Status;

        // Determine gender based on the seatStatus
        let gender = "male"; // Default to male
        if (seatStatus === "AFF") {
          gender = "female";
        } else if (seatStatus === "AFM" || seatStatus === "AFA") {
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

  useEffect(() => {
    GetPassengerData(dispatch);
  }, [dispatch]);

  useEffect(() => {
    if (localStorage.getItem("occupation")) {
      setPassengerData((prevPassengerdata) => ({
        ...prevPassengerdata,
        mobile: localStorage.getItem("mobile"),
        email: "",
        age: localStorage.getItem("age"),
        occupation: localStorage.getItem("occupation"),
        sex: localStorage.getItem("sex"),
        name: localStorage.getItem("name"),
      }));
    }
  }, []);

  useEffect(() => {
    const handleTicketDetail = async () => {
      console.log(busBookingId, "response for ticket id");
      try {
        const response = await TicketViewDetails(busBookingId, mobileInput);
        setTicketDetail(response);
        console.log(response, "response for ticketdtl");
      } catch (error) {
        console.error("Error", error);
      }
    };

    console.log(busBookingId, "response for ticket id");
    if (busBookingId) {
      handleTicketDetail();
    }
  }, [busBookingId, mobileInput]);

  useEffect(() => {
    const fetchGetPassenger = async () => {
      console.log(passengerId, "passengerId");
      const updateData = passengerId;
      try {
        const data = await GetPassengById(updateData);
        console.log(data, "datadata");
      } catch (error) {
        console.error("Error fetching additional user data", error);
      }
    };

    console.log(passengerId, "passengerId");
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
    if (user_id) {
      GetUserDetails(navigation);
    }
  }, [user_id, navigation]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 480) {
        setDrawerWidth("95%");
      } else if (window.innerWidth <= 768) {
        setDrawerWidth("95%");
      } else {
        setDrawerWidth("60%");
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Call it once to set initial width

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <div className="relative">
        {loading ? (
          // <Flex  className="flex items-center justify-center" >
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              //background: "rgba(0, 0, 0, 0.2)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 1000,
            }}
            className="absolute"
          >
            <Spin
              className="md:block hidden ml-[40vw]"
              indicator={
                <LoadingOutlined
                  style={{
                    fontSize: "2vw",
                  }}
                  spin
                />
              }
            />
            <Spin
              className="block md:hidden"
              indicator={
                <LoadingOutlined
                  style={{
                    fontSize: "8vw",
                  }}
                  spin
                />
              }
            />
          </div>
        ) : null}
        <div>
          <div className="md:block">
            <div>
              {!continuenext ? (
                <div className="p-[2.5vw] md:p-[1.5vw] flex flex-col gap-y-[3vw] md:gap-y-[1.60vw]">
                  <div className="">
                    <Collapse
                      style={{
                        backgroundColor:
                          busdetails1.bus_type_status === "luxury"
                            ? "#393939"
                            : colorcode.theme,
                      }}
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
                            style={{
                              color: "#FFFFFF",
                              // height: "2vw",
                              // width: "1.8vw",
                            }}
                          />
                        )
                      }
                      defaultActiveKey={["1"]}
                      expandIconPosition="end"
                      items={[
                        {
                          key: "1",
                          label: (
                            <div className="flex items-center h-[4vw] md:h-[2.5vw]">
                              <div className="col-span-2">
                                <span className="">
                                  <img
                                    src={complete}
                                    alt="complete"
                                    className="md:h-[2.5vw] h-[7vw] w-[7vw] md:w-[2.5vw]"
                                  />
                                </span>
                              </div>
                              <div className="pl-[1vw] text-[#FFFFFF] font-medium md:text-[1.5vw] text-[4vw]">
                                Journey Details
                              </div>
                            </div>
                          ),
                          children: (
                            <div
                              style={{
                                backgroundColor:
                                  busdetails1.bus_type_status === "luxury"
                                    ? "#FFEEC9"
                                    : "white",
                              }}
                            >
                              <div className="py-[0.5vw]">
                                <div className="grid grid-cols-8 md:grid-cols-6 w-full md:h-[15vw] h-[50vw] md:px-[0vw] px-[3vw] relative">
                                  <div className="md:col-span-2 w-[100%] h-full flex justify-center">
                                    <div className="w-[80%] h-full flex flex-col md:block hidden ">
                                      <div className="h-[60%] flex items-center justify-center">
                                        {" "}
                                        {busdetails1?.logos != null && (
                                          <img
                                            src={`${apiUrlimage}${busdetails1.logos}`}
                                            alt="logos"
                                            className={`w-[6vw] h-[6vw] rounded-full bg-white  ${
                                              busdetails1?.bus_type_status ===
                                              "luxury"
                                                ? "shadow-lg shadow-[rgba(255, 238, 201, 0.9)]"
                                                : "shadow-lg shadow-[rgba(238, 237, 237, 0.7)]"
                                            }`}
                                          />
                                        )}
                                      </div>
                                      <div className="flex flex-col h-[40%] items-center">
                                        <p
                                          className={`text-[1.1vw] font-bold ${
                                            busdetails1?.bus_type_status ===
                                            "luxury"
                                              ? "text-[#393939]"
                                              : "text-[#1F487C]"
                                          }`}
                                        >
                                          {busdetails1?.operator_name?.length >
                                          23 ? (
                                            <Tooltip
                                              placement="top"
                                              title={busdetails1?.operator_name}
                                              className="cursor-pointer"
                                              color={
                                                busdetails1.bus_type_status ===
                                                "luxury"
                                                  ? "#393939"
                                                  : colorcode.theme
                                              }
                                            >
                                              {`${busdetails1?.operator_name?.slice(
                                                0,
                                                22
                                              )}...`}
                                            </Tooltip>
                                          ) : (
                                            `${busdetails1?.operator_name?.slice(
                                              0,
                                              22
                                            )}`
                                          )}
                                        </p>
                                        <p
                                          className={`text-[1vw] ${
                                            busdetails1.bus_type_status ===
                                            "luxury"
                                              ? "text-[#393939]"
                                              : "text-[#1F487C]"
                                          }`}
                                        >
                                          {busdetails1?.bus_type?.length >
                                          25 ? (
                                            <Tooltip
                                              placement="top"
                                              title={busdetails1?.bus_type}
                                              className="cursor-pointer"
                                              color={
                                                busdetails1.bus_type_status ===
                                                "luxury"
                                                  ? "#393939"
                                                  : colorcode.theme
                                              }
                                            >
                                              {`${busdetails1?.bus_type?.slice(
                                                0,
                                                24
                                              )}...`}
                                            </Tooltip>
                                          ) : (
                                            `${busdetails1?.bus_type?.slice(
                                              0,
                                              24
                                            )}`
                                          )}
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="md:col-span-4 col-span-8">
                                    <div className="grid grid-rows-7 w-full h-full">
                                      <div className="row-span-3">
                                        <div className="grid md:grid-cols-4 grid-cols-7">
                                          <div className="md:col-span-1 col-span-2 ">
                                            <div className="flex flex-col pl-[1vw] text-left">
                                              <p className="md:text-[0.8vw] text-[3.5vw]  pt-[0.5vw]">
                                                {dayjs(
                                                  busdetails1?.departure_date_time
                                                ).format("DD MMM")}
                                              </p>
                                              <p
                                                className={`font-bold text-[4vw] md:text-[1.2vw] ${
                                                  busdetails1.bus_type_status ===
                                                  "luxury"
                                                    ? "text-[#393939]"
                                                    : "text-[#1F487C]"
                                                }`}
                                              >
                                                {dayjs(
                                                  busdetails1?.departure_date_time
                                                ).format("HH:mm")}
                                              </p>
                                              <p
                                                className={`md:text-[0.9vw] text-[3vw] ${
                                                  busdetails1.bus_type_status ===
                                                  "luxury"
                                                    ? "text-[#393939]"
                                                    : "text-[#1F487C]"
                                                }`}
                                              >
                                                {busdetails1?.source_name}
                                              </p>
                                            </div>
                                          </div>
                                          <div className="md:col-span-2 col-span-3 flex-col mt-[0.5vw] items-center w-full justify-center">
                                            <div className="md:col-span-2 col-span-3 h-full relative w-full flex justify-center items-center md:items-center md:justify-center">
                                              <div className="absolute md:left-0 left-[-1.2vw] md:top-[1.2vw] w-[33vw] md:w-[18.5vw]">
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
                                                      busdetails1.bus_type_status ===
                                                      "luxury"
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
                                                      busdetails1.bus_type_status ===
                                                      "luxury"
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
                                                      busdetails1.bus_type_status ===
                                                      "luxury"
                                                        ? "#393939"
                                                        : "#1F4B7F"
                                                    }
                                                  />
                                                  <path
                                                    fill-rule="evenodd"
                                                    clip-rule="evenodd"
                                                    d="M280.078 6.24612C280.553 5.805 281.321 5.805 281.796 6.24612L289.082 13.0235C289.557 13.4646 289.557 14.1798 289.082 14.621L281.796 21.3983C281.321 21.8395 280.553 21.8395 280.078 21.3983C279.604 20.9572 279.604 20.242 280.078 19.8009L286.506 13.8222L280.078 7.84357C279.604 7.40245 279.604 6.68725 280.078 6.24612Z"
                                                    fill={
                                                      busdetails1.bus_type_status ===
                                                      "luxury"
                                                        ? "#393939"
                                                        : "#1F4B7F"
                                                    }
                                                    stroke={
                                                      busdetails1.bus_type_status ===
                                                      "luxury"
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
                                           text-white text-[3.5vw] md:text-[1vw] font-bold justify-center items-center left-[-1vw] md:left-[0vw]"
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
                                                      busdetails1.bus_type_status ===
                                                      "luxury"
                                                        ? "#393939"
                                                        : "#1F4B7F"
                                                    }
                                                  />
                                                </svg>
                                                <div className="absolute pb-[3vw] md:pb-[0.8vw]">
                                                  {busdetails1?.time_duration}
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                          <div className="md:col-span-1 col-span-2 ">
                                            <div className="flex flex-col text-right pr-[1vw]">
                                              <p
                                                className={`md:text-[0.8vw] text-[3.5vw] pt-[0.5vw]${
                                                  busdetails1.bus_type_status ===
                                                  "luxury"
                                                    ? "text-[#393939]"
                                                    : "text-[#1F487C]"
                                                }`}
                                              >
                                                {dayjs(
                                                  busdetails1?.arrival_date_time
                                                ).format("DD MMM")}
                                              </p>
                                              <p
                                                className={`font-bold r text-[4vw] md:text-[1.2vw] ${
                                                  busdetails1.bus_type_status ===
                                                  "luxury"
                                                    ? "text-[#393939]"
                                                    : "text-[#1F487C]"
                                                }`}
                                              >
                                                {dayjs(
                                                  busdetails1?.arrival_date_time
                                                ).format("HH:mm")}
                                              </p>
                                              <p
                                                className={`text-[3vw] md:text-[0.9vw] ${
                                                  busdetails1.bus_type_status ===
                                                  "luxury"
                                                    ? "text-[#393939]"
                                                    : "text-[#1F487C]"
                                                }`}
                                              >
                                                {busdetails1?.destination_name}
                                              </p>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="row-span-2 flex justify-between px-[1vw] md:my-[0vw] my-[2vw] ">
                                        <div className="flex flex-col  ">
                                          <p
                                            className={`md:text-[1vw] text-[3.5vw] ${
                                              busdetails1.bus_type_status ===
                                              "luxury"
                                                ? "text-[#393939]"
                                                : "text-[#1F487C]"
                                            }`}
                                          >
                                            Boarding Point & Time
                                          </p>
                                          <p
                                            className={`md:text-[1.1vw] text-[2.8vw] font-semibold ${
                                              busdetails1.bus_type_status ===
                                              "luxury"
                                                ? "text-[#393939]"
                                                : "text-[#1F487C]"
                                            }`}
                                            // style={{
                                            //   color: colorcode.theme,

                                            // }}
                                          >
                                            {selectedRoutes1?.dep_route
                                              ?.length > 25 ? (
                                              <Tooltip
                                                placement="top"
                                                title={
                                                  selectedRoutes1?.dep_route
                                                }
                                                className="cursor-pointer"
                                                color={
                                                  busdetails1.bus_type_status ===
                                                  "luxury"
                                                    ? "#393939"
                                                    : colorcode.theme
                                                }
                                              >
                                                {`${selectedRoutes1?.dep_route?.slice(
                                                  0,
                                                  20
                                                )}... (${dayjs(
                                                  selectedRoutes1?.dep_time
                                                ).format("HH:mm")})`}
                                              </Tooltip>
                                            ) : (
                                              `${selectedRoutes1?.dep_route?.slice(
                                                0,
                                                20
                                              )} (${dayjs(
                                                selectedRoutes1?.dep_time
                                              ).format("HH:mm")})`
                                            )}
                                          </p>
                                        </div>
                                        <div className="flex flex-col items-center">
                                          <p
                                            className={`md:text-[1vw] text-[3.5vw] ${
                                              busdetails1.bus_type_status ===
                                              "luxury"
                                                ? "text-[#393939]"
                                                : "text-[#1F487C]"
                                            }`}
                                          >
                                            Seat Number(s)
                                          </p>
                                          <div className="text-[1.1vw] font-semibold">
                                            <div
                                              className={`flex flex-row flex-wrap ${
                                                busdetails1.bus_type_status ===
                                                "luxury"
                                                  ? "text-[#393939]"
                                                  : "text-[#1F487C]"
                                              }`}
                                            >
                                              {selectedSeats1?.length > 0 ? (
                                                selectedSeats1.map(
                                                  (seat, index) => (
                                                    <p
                                                      key={index}
                                                      className="md:text-[1.1vw] text-[2.8vw] mr-[0.4vw]"
                                                    >
                                                      {seat}
                                                      {index <
                                                        selectedSeats1.length -
                                                          1 && ","}
                                                    </p>
                                                  )
                                                )
                                              ) : (
                                                <p
                                                  className={`text-[1vw] mr-[0.4vw] ${
                                                    busdetails1.bus_type_status ===
                                                    "luxury"
                                                      ? "text-[#393939]"
                                                      : "text-[#1F487C]"
                                                  }`}
                                                >
                                                  No Seat Selected
                                                </p>
                                              )}
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="row-span-2 flex px-[1vw] justify-between md:py-[0vw] py-[2vw]">
                                        <div className="flex flex-col  ">
                                          <p
                                            className={`md:text-[1vw] text-[3.5vw] ${
                                              busdetails1.bus_type_status ===
                                              "luxury"
                                                ? "text-[#393939]"
                                                : "text-[#1F487C]"
                                            }`}
                                          >
                                            Dropping Point & Time
                                          </p>
                                          <p
                                            className={`md:text-[1.1vw] text-[2.8vw] font-semibold ${
                                              busdetails1.bus_type_status ===
                                              "luxury"
                                                ? "text-[#393939]"
                                                : "text-[#1F487C]"
                                            }`}
                                            // style={{
                                            //   color: colorcode.theme,
                                            // }}
                                          >
                                            {selectedRoutes1?.arri_route
                                              ?.length > 25 ? (
                                              <Tooltip
                                                placement="top"
                                                title={
                                                  selectedRoutes1?.arri_route
                                                }
                                                className="cursor-pointer"
                                                color={
                                                  busdetails1.bus_type_status ===
                                                  "luxury"
                                                    ? "#393939"
                                                    : colorcode.theme
                                                }
                                              >
                                                {`${selectedRoutes1?.arri_route?.slice(
                                                  0,
                                                  20
                                                )}... (${dayjs(
                                                  selectedRoutes1?.arr_time
                                                ).format("HH:mm")})`}
                                              </Tooltip>
                                            ) : (
                                              `${selectedRoutes1?.arri_route?.slice(
                                                0,
                                                20
                                              )} (${dayjs(
                                                selectedRoutes1?.arr_time
                                              ).format("HH:mm")})`
                                            )}
                                          </p>
                                        </div>
                                        <div className="relative">
                                          <svg
                                            className="md:w-[10vw] md:h-[4vw] w-[30vw] h-[10vw]"
                                            viewBox="0 0 191 65"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                          >
                                            <path
                                              d="M63.8027 21.9522V46.3763C63.8027 49.4454 66.3049 51.9629 69.3893 51.9629H104.074C107.159 51.9629 109.661 49.4446 109.661 46.3763V21.9522C109.661 18.883 107.159 16.3656 104.074 16.3656H69.3893C66.3049 16.3656 63.8027 18.8839 63.8027 21.9522Z"
                                              fill={
                                                busdetails1.bus_type_status ===
                                                "luxury"
                                                  ? "#393939"
                                                  : "#1F4B7F"
                                              }
                                            />
                                            <path
                                              d="M15.9289 2.65835C12.1005 0.255909 8.38323 -0.150284 5.5036 1.50614C-0.254637 4.80155 -0.571095 15.0933 4.76045 24.9138C5.82014 26.8619 7.05462 28.648 8.39942 30.2544C6.51724 33.8422 6.97543 38.339 9.87036 41.4234L28.4267 61.1303C30.1672 62.9812 32.6192 64.0527 35.1345 64.0527H181.215C186.356 64.0527 190.533 59.7672 190.533 54.4913L190.532 15.0765C190.532 9.8006 186.355 5.51503 181.214 5.51503L35.1337 5.51503C32.6184 5.51503 30.1816 6.58665 28.4258 8.43743L24.7869 12.3011C22.3833 8.14502 19.2666 4.73605 15.9289 2.65835ZM35.1337 8.71347L181.214 8.71347C184.631 8.71347 187.431 11.5704 187.431 15.0933V54.491C187.431 57.9974 184.647 60.8709 181.214 60.8709L35.1337 60.8709C33.4571 60.8709 31.8275 60.1565 30.6724 58.9229L12.1161 39.1993C10.9455 37.9657 10.3602 36.3584 10.3602 34.7675C10.3602 33.1766 10.9455 31.5858 12.1161 30.3356L23.9969 17.7063C25.2784 20.7907 27.3527 23.6617 27.0355 26.7161V26.8133C27.0355 27.2519 27.0039 27.6897 26.9723 28.0959C26.4502 27.9663 25.9126 27.8683 25.3427 27.8683C21.6408 27.8683 18.6196 30.9527 18.6196 34.7515C18.6196 38.5662 21.6408 41.6505 25.3427 41.6505C29.0602 41.6505 32.0659 38.566 32.0659 34.7515C32.0659 32.7545 31.2118 30.9527 29.8826 29.7033C30.0404 28.7946 30.136 27.8525 30.136 26.8299V26.716C29.8826 22.046 28.0939 19.1183 26.3065 15.2389L30.6408 10.645C31.8276 9.42716 33.4571 8.71347 35.1337 8.71347ZM22.5412 14.6714L10.344 27.6255C9.29964 26.3105 8.33468 24.8983 7.48069 23.3565C3.13026 15.3691 2.92467 6.63597 7.02169 4.29839C8.88849 3.22677 11.483 3.6164 14.3148 5.38581C17.4161 7.33383 20.3264 10.6291 22.5412 14.6714Z"
                                              fill={
                                                busdetails1.bus_type_status ===
                                                "luxury"
                                                  ? "#393939"
                                                  : "#1F4B7F"
                                              }
                                            />
                                            <path
                                              fill-rule="evenodd"
                                              clip-rule="evenodd"
                                              d="M32.2528 54.6614C34.0086 54.6614 35.4319 55.8294 35.4319 57.2702C35.4319 58.711 34.0086 59.879 32.2528 59.879C32.2365 59.879 32.2202 59.8789 32.2039 59.8787L32.2528 62.4375L184.608 62.4375L187.301 59.8787C187.284 59.8789 187.269 59.879 187.252 59.879C185.496 59.879 184.073 58.711 184.073 57.2702C184.073 55.8294 185.496 54.6614 187.252 54.6614C187.269 54.6614 187.284 54.6615 187.301 54.6617V50.4067C187.284 50.4069 187.269 50.407 187.252 50.407C185.496 50.407 184.073 49.239 184.073 47.7982C184.073 46.3574 185.496 45.1894 187.252 45.1894H187.26L187.275 45.1895L187.284 45.1895L187.301 45.1897V41.5772C182.493 41.5772 178.595 38.3786 178.595 34.433C178.595 30.4875 182.493 27.2889 187.301 27.2889V23.7566C187.284 23.7569 187.269 23.757 187.252 23.757C185.496 23.757 184.073 22.5889 184.073 21.1481C184.073 19.7073 185.496 18.5393 187.252 18.5393C187.269 18.5393 187.284 18.5394 187.301 18.5396V14.2846C187.292 14.2847 187.284 14.2848 187.275 14.2849C187.268 14.2849 187.26 14.2849 187.252 14.2849C185.496 14.2849 184.073 13.1169 184.073 11.6761C184.073 10.2353 185.496 9.0673 187.252 9.0673C187.269 9.0673 187.284 9.06738 187.301 9.06762L185.147 6.42857L32.2039 6.96711L32.2039 9.06762C32.1876 9.06762 32.2202 9.06738 32.2039 9.06762C33.9597 9.06762 35.4319 10.2353 35.4319 11.6761C35.4319 13.1169 34.0086 14.2849 32.2528 14.2849C32.2365 14.2849 32.2202 14.2849 32.2039 14.2846V18.5396C32.2202 18.5394 32.2365 18.5393 32.2528 18.5393C34.0086 18.5393 35.4319 19.7073 35.4319 21.1481C35.4319 22.5889 34.0086 23.757 32.2528 23.757C32.2365 23.757 32.2202 23.7569 32.2039 23.7566V27.2889C37.0119 27.2889 41.9793 30.4875 41.9793 34.433C41.9793 38.3786 37.0119 41.5772 32.2039 41.5772V45.1897C32.2202 45.1895 32.2365 45.1894 32.2528 45.1894C34.0086 45.1894 35.4319 46.3574 35.4319 47.7982C35.4319 49.239 34.0086 50.407 32.2528 50.407C32.2365 50.407 32.2202 50.4069 32.2039 50.4067V54.6617C32.2202 54.6615 32.2365 54.6614 32.2528 54.6614Z"
                                              fill={
                                                busdetails1.bus_type_status ===
                                                "luxury"
                                                  ? "#393939"
                                                  : "#1F4B7F"
                                              }
                                            />
                                          </svg>
                                          <p
                                            className={`md:text-[1.5vw] text-[4vw] font-bold text-white absolute left-[8.5vw] md:left-[3vw] top-[1.5vw] md:top-[0.8vw] 
                                      ${
                                        busdetails1.bus_type_status === "luxury"
                                          ? "text-[#393939]"
                                          : "text-[#1F487C]"
                                      }`}
                                          >
                                            {`₹ ${discount1}`}
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <span className="absolute md:block hidden left-[15.5vw]">
                                    <div className="h-full py-[0.5vw]">
                                      <svg
                                        className=" md:h-[13.5vw] md:w-[3.3vw]"
                                        viewBox="0 0 58 233"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <rect
                                          x="24.7695"
                                          y="110.186"
                                          width="7.77032"
                                          height="7.77032"
                                          rx="3.88516"
                                          stroke={
                                            busdetails1.bus_type_status ===
                                            "luxury"
                                              ? "#393939"
                                              : "#1F4B7F"
                                          }
                                          stroke-width="2.30622"
                                        />
                                        <mask
                                          id="path-2-inside-1_6794_2554"
                                          fill="white"
                                        >
                                          {" "}
                                          <path d="M28.0771 117.016H29.2303V203.374H28.0771V117.016Z" />{" "}
                                        </mask>
                                        <path
                                          d="M29.8068 203.374V201.647H28.6537V203.374H29.8068ZM29.8068 199.344V195.89H28.6537V199.344H29.8068ZM29.8068 193.587V190.133H28.6537V193.587H29.8068ZM29.8068 187.83V184.375H28.6537V187.83H29.8068ZM29.8068 182.072V178.618H28.6537V182.072H29.8068ZM29.8068 176.315V172.861H28.6537V176.315H29.8068ZM29.8068 170.558V167.104H28.6537V170.558H29.8068ZM29.8068 164.801V161.346H28.6537V164.801H29.8068ZM29.8068 159.043V155.589H28.6537V159.043H29.8068ZM29.8068 153.286V149.832H28.6537V153.286H29.8068ZM29.8068 147.529V144.075H28.6537V147.529H29.8068ZM29.8068 141.772V138.317H28.6537V141.772H29.8068ZM29.8068 136.014V132.56H28.6537V136.014H29.8068ZM29.8068 130.257V126.803H28.6537V130.257H29.8068ZM29.8068 124.5V121.046H28.6537V124.5H29.8068ZM29.8068 118.743V117.016H28.6537V118.743H29.8068ZM30.3834 203.374V201.647H28.0771V203.374H30.3834ZM30.3834 199.344V195.89H28.0771V199.344H30.3834ZM30.3834 193.587V190.133H28.0771V193.587H30.3834ZM30.3834 187.83V184.375H28.0771V187.83H30.3834ZM30.3834 182.072V178.618H28.0771V182.072H30.3834ZM30.3834 176.315V172.861H28.0771V176.315H30.3834ZM30.3834 170.558V167.104H28.0771V170.558H30.3834ZM30.3834 164.801V161.346H28.0771V164.801H30.3834ZM30.3834 159.043V155.589H28.0771V159.043H30.3834ZM30.3834 153.286V149.832H28.0771V153.286H30.3834ZM30.3834 147.529V144.075H28.0771V147.529H30.3834ZM30.3834 141.772V138.317H28.0771V141.772H30.3834ZM30.3834 136.014V132.56H28.0771V136.014H30.3834ZM30.3834 130.257V126.803H28.0771V130.257H30.3834ZM30.3834 124.5V121.046H28.0771V124.5H30.3834ZM30.3834 118.743V117.016H28.0771V118.743H30.3834Z"
                                          fill={
                                            busdetails1.bus_type_status ===
                                            "luxury"
                                              ? "#393939"
                                              : "#1F4B7F"
                                          }
                                          mask="url(#path-2-inside-1_6794_2554)"
                                        />
                                        <line
                                          x1="11.3012"
                                          y1="232.748"
                                          x2="45.4302"
                                          y2="232.748"
                                          stroke={
                                            busdetails1.bus_type_status ===
                                            "luxury"
                                              ? "#393939"
                                              : "#1F4B7F"
                                          }
                                          stroke-width="0.2"
                                        />
                                        <path
                                          d="M41.7225 208.675V207.454H43.0084C43.1814 207.454 43.3228 207.31 43.3228 207.133C43.3228 205.061 41.6721 202.374 39.644 202.374H16.8165C14.7884 202.374 13.1376 205.061 13.1376 207.133C13.1376 207.31 13.276 207.454 13.452 207.454H14.7349V208.672C13.8294 208.826 13.1376 209.632 13.1376 210.599V221.927C13.1376 222.897 13.8294 223.7 14.7349 223.855V232.378C14.7349 232.554 14.8765 232.699 15.0493 232.699C15.2254 232.699 15.3638 232.554 15.3638 232.378V223.855C16.2693 223.7 16.9642 222.897 16.9642 221.927V219.919H18.6873V220.353C18.6873 221.516 19.6117 222.46 20.7499 222.46H35.7105C36.8456 222.46 37.77 221.516 37.77 220.353V219.919H39.4962V221.927C39.4962 222.897 40.1817 223.7 41.0935 223.855V232.378C41.0935 232.554 41.2351 232.699 41.4079 232.699C41.584 232.699 41.7223 232.554 41.7223 232.378V223.855C42.6279 223.7 43.3228 222.897 43.3228 221.927V219.379C43.3228 219.203 43.1813 219.058 43.0084 219.058C42.8354 219.058 42.694 219.203 42.694 219.379V221.927C42.694 222.65 42.1186 223.238 41.4111 223.241H41.408C41.059 223.241 40.7383 223.096 40.5056 222.859C40.2729 222.624 40.1251 222.296 40.1251 221.927V210.599C40.1251 209.876 40.7005 209.288 41.408 209.288C41.7507 209.288 42.0746 209.427 42.3167 209.674C42.5619 209.921 42.694 210.249 42.694 210.599V219.773C42.694 219.95 42.8356 220.094 43.0084 220.094C43.1814 220.094 43.3228 219.95 43.3228 219.773V210.599C43.3228 210.079 43.1247 209.587 42.7632 209.218C42.4771 208.925 42.1155 208.739 41.7225 208.675ZM16.3354 221.927C16.3354 222.653 15.76 223.241 15.0494 223.241C14.3419 223.241 13.7665 222.653 13.7665 221.927V210.599C13.7665 209.876 14.3419 209.288 15.0494 209.288C15.76 209.288 16.3354 209.876 16.3354 210.599V221.927ZM18.6873 219.277H16.9643V213.25H18.6873V219.277ZM33.3083 219.334H23.1491C22.9762 219.334 22.8347 219.193 22.8347 219.013C22.8347 218.836 22.9762 218.692 23.1491 218.692H33.3083C33.4844 218.692 33.6227 218.836 33.6227 219.013C33.6228 219.193 33.4844 219.334 33.3083 219.334ZM33.3083 216.584H23.1491C22.9762 216.584 22.8347 216.443 22.8347 216.263C22.8347 216.086 22.9762 215.942 23.1491 215.942H33.3083C33.4844 215.942 33.6227 216.087 33.6227 216.263C33.6228 216.443 33.4844 216.584 33.3083 216.584ZM33.3083 213.834H23.1491C22.9762 213.834 22.8347 213.69 22.8347 213.513C22.8347 213.336 22.9762 213.192 23.1491 213.192H33.3083C33.4844 213.192 33.6227 213.336 33.6227 213.513C33.6228 213.69 33.4844 213.834 33.3083 213.834ZM39.4963 219.277H37.7732V213.25H39.4963V219.277ZM41.0936 208.675C40.188 208.829 39.4963 209.632 39.4963 210.599V212.607H37.7701V212.173C37.7701 211.014 36.8457 210.069 35.7106 210.069H20.75C19.6117 210.069 18.6873 211.014 18.6873 212.173V212.607H16.9643V210.599C16.9643 209.632 16.2694 208.826 15.3638 208.672V207.454H41.0936V208.675Z"
                                          fill={
                                            busdetails1.bus_type_status ===
                                            "luxury"
                                              ? "#393939"
                                              : "#1F4B7F"
                                          }
                                        />
                                        <path
                                          d="M16.1612 221.961V210.605C16.1612 210.245 15.9867 209.906 15.6933 209.697C15.3059 209.42 14.7849 209.42 14.3975 209.696C14.1036 209.906 13.9296 210.245 13.9307 210.606L13.9633 221.963C13.9643 222.302 14.1223 222.622 14.3908 222.83C14.7864 223.136 15.3391 223.136 15.7346 222.83C16.0037 222.622 16.1612 222.301 16.1612 221.961Z"
                                          fill={
                                            busdetails1.bus_type_status ===
                                            "luxury"
                                              ? "#393939"
                                              : "#1F4B7F"
                                          }
                                          stroke={
                                            busdetails1.bus_type_status ===
                                            "luxury"
                                              ? "#393939"
                                              : "#1F4B7F"
                                          }
                                          stroke-width="0.2"
                                        />
                                        <path
                                          d="M42.5103 221.975V210.591C42.5103 210.239 42.3415 209.908 42.0569 209.702C41.6728 209.423 41.1524 209.423 40.7683 209.701C40.4833 209.908 40.315 210.24 40.316 210.592L40.3481 221.977C40.3491 222.308 40.5018 222.62 40.762 222.825C41.1537 223.132 41.7057 223.133 42.0974 222.825C42.3581 222.62 42.5103 222.307 42.5103 221.975Z"
                                          fill={
                                            busdetails1.bus_type_status ===
                                            "luxury"
                                              ? "#393939"
                                              : "#1F4B7F"
                                          }
                                          stroke={
                                            busdetails1.bus_type_status ===
                                            "luxury"
                                              ? "#393939"
                                              : "#1F4B7F"
                                          }
                                          stroke-width="0.2"
                                        />
                                        <path
                                          d="M36.5847 224.381H19.8759C18.7252 224.381 17.7881 225.336 17.7881 226.511C17.7881 227.687 18.7252 228.645 19.8759 228.645H20.2218V232.378C20.2218 232.554 20.3634 232.699 20.5362 232.699H22.4637C22.6366 232.699 22.7781 232.554 22.7781 232.378V228.645H33.6825V232.378C33.6825 232.554 33.8241 232.699 33.997 232.699H35.9213C36.0942 232.699 36.2357 232.554 36.2357 232.378V228.645H36.5847C37.7356 228.645 38.6694 227.687 38.6694 226.511C38.6694 225.336 37.7356 224.381 36.5847 224.381ZM22.1493 232.056V228.756V228.645V232.056ZM36.5847 226.511C35.7829 226.511 19.8759 226.511 19.8759 226.511C19.071 226.511 19.8759 226.511 18.417 226.511C18.417 225.692 19.071 225.024 19.8759 225.024H36.5847C37.3865 225.024 38.0405 225.692 38.0405 226.511C36.7628 226.511 37.3865 226.511 36.5847 226.511Z"
                                          fill={
                                            busdetails1.bus_type_status ===
                                            "luxury"
                                              ? "#393939"
                                              : "#1F4B7F"
                                          }
                                        />
                                        <mask
                                          id="path-9-inside-2_6794_2554"
                                          fill="white"
                                        >
                                          {" "}
                                          <path d="M28.01 26.7649H29.1631V108.636H28.01V26.7649Z" />
                                        </mask>
                                        <path
                                          d="M29.7396 108.636V106.881H28.5865V108.636H29.7396ZM29.7396 104.542V101.033H28.5865V104.542H29.7396ZM29.7396 98.6942V95.1855H28.5865V98.6942H29.7396ZM29.7396 92.8463V89.3376H28.5865V92.8463H29.7396ZM29.7396 86.9984V83.4897H28.5865V86.9984H29.7396ZM29.7396 81.1505V77.6417H28.5865V81.1505H29.7396ZM29.7396 75.3026V71.7938H28.5865V75.3026H29.7396ZM29.7396 69.4547V65.9459H28.5865V69.4547H29.7396ZM29.7396 63.6068V60.098H28.5865V63.6068H29.7396ZM29.7396 57.7588V54.2501H28.5865V57.7588H29.7396ZM29.7396 51.9109V48.4022H28.5865V51.9109H29.7396ZM29.7396 46.063V42.5543H28.5865V46.063H29.7396ZM29.7396 40.2151V36.7064H28.5865V40.2151H29.7396ZM29.7396 34.3672V30.8584H28.5865V34.3672H29.7396ZM29.7396 28.5193V26.7649H28.5865V28.5193H29.7396ZM30.3162 108.636V106.881H28.01V108.636H30.3162ZM30.3162 104.542V101.033H28.01V104.542H30.3162ZM30.3162 98.6942V95.1855H28.01V98.6942H30.3162ZM30.3162 92.8463V89.3376H28.01V92.8463H30.3162ZM30.3162 86.9984V83.4897H28.01V86.9984H30.3162ZM30.3162 81.1505V77.6417H28.01V81.1505H30.3162ZM30.3162 75.3026V71.7938H28.01V75.3026H30.3162ZM30.3162 69.4547V65.9459H28.01V69.4547H30.3162ZM30.3162 63.6068V60.098H28.01V63.6068H30.3162ZM30.3162 57.7588V54.2501H28.01V57.7588H30.3162ZM30.3162 51.9109V48.4022H28.01V51.9109H30.3162ZM30.3162 46.063V42.5543H28.01V46.063H30.3162ZM30.3162 40.2151V36.7064H28.01V40.2151H30.3162ZM30.3162 34.3672V30.8584H28.01V34.3672H30.3162ZM30.3162 28.5193V26.7649H28.01V28.5193H30.3162Z"
                                          fill={
                                            busdetails1.bus_type_status ===
                                            "luxury"
                                              ? "#393939"
                                              : "#1F4B7F"
                                          }
                                          mask="url(#path-9-inside-2_6794_2554)"
                                        />
                                        <g clip-path="url(#clip0_6794_2554)">
                                          <path
                                            d="M14.4654 3.70703C13.98 3.70703 13.5865 4.10055 13.5865 4.58594V11.5586C13.5865 12.044 13.98 12.4375 14.4654 12.4375C14.9508 12.4375 16.945 11.6491 16.945 11.1637L15.3443 5.46484H28.5865V3.70703H14.4654Z"
                                            fill={
                                              busdetails1.bus_type_status ===
                                              "luxury"
                                                ? "#393939"
                                                : "#1F4B7F"
                                            }
                                          />
                                          <path
                                            d="M42.7076 3.70703H28.5865V5.46484H41.8287L40.2712 11.0776C40.2712 11.563 42.2222 12.4961 42.7076 12.4961C43.193 12.4961 43.5865 12.1026 43.5865 11.6172V4.58594C43.5865 4.10055 43.193 3.70703 42.7076 3.70703Z"
                                            fill={
                                              busdetails1.bus_type_status ===
                                              "luxury"
                                                ? "#393939"
                                                : "#1F4B7F"
                                            }
                                          />
                                          <path
                                            d="M24.192 26.3241V29.2538C24.192 29.739 23.7982 30.1327 23.313 30.1327H19.7974C19.3123 30.1327 18.9185 29.739 18.9185 29.2538V26.0259C19.2578 26.2157 19.6486 26.3241 20.0646 26.3241H24.192Z"
                                            fill={
                                              busdetails1.bus_type_status ===
                                              "luxury"
                                                ? "#393939"
                                                : "#1F4B7F"
                                            }
                                          />
                                          <path
                                            d="M38.2545 26.0259V29.2538C38.2545 29.739 37.8607 30.1327 37.3755 30.1327H33.8599C33.3748 30.1327 32.981 29.739 32.981 29.2538V26.3241H37.1084C37.5244 26.3241 37.9152 26.2157 38.2545 26.0259Z"
                                            fill={
                                              busdetails1.bus_type_status ===
                                              "luxury"
                                                ? "#393939"
                                                : "#1F4B7F"
                                            }
                                          />
                                          <path
                                            d="M40.0123 2.76953V3.70703L38.8404 11.198C40.368 20.8654 40.0205 17.0927 39.8775 21.3438L39.3091 22.2227L39.7914 23.1016L39.7416 24.11C39.6724 25.5156 38.5158 26.6172 37.1084 26.6172H20.0646C18.6572 26.6172 17.5005 25.5156 17.4314 24.11L17.3793 23.043L17.8052 22.1641L17.2925 21.2852C17.2105 19.5058 17.1607 18.8219 17.1607 18.4141L18.3326 11.198L17.1607 3.70703V2.76953C17.1607 1.31582 18.3437 0.132812 19.7974 0.132812H37.3755C38.8293 0.132812 40.0123 1.31582 40.0123 2.76953Z"
                                            fill={
                                              busdetails1.bus_type_status ===
                                              "luxury"
                                                ? "#393939"
                                                : "#1F4B7F"
                                            }
                                          />
                                          <path
                                            d="M39.8775 21.3438L39.3091 22.2227L39.7914 23.1016L39.7416 24.11C39.6724 25.5156 38.5158 26.6172 37.1084 26.6172H28.5865V0.132812H37.3756C38.8293 0.132812 40.0123 1.31582 40.0123 2.76953V3.70703L38.8404 11.1982C39.6449 16.2883 39.9291 17.6523 39.9976 18.4234C40.0586 19.1172 39.9455 19.3311 39.8775 21.3438Z"
                                            fill={
                                              busdetails1.bus_type_status ===
                                              "luxury"
                                                ? "#393939"
                                                : "#1F4B7F"
                                            }
                                          />
                                          <path
                                            d="M40.0123 3.70703V18.4205C32.463 19.8572 24.7105 19.8572 17.1607 18.4205V3.70703H40.0123Z"
                                            fill={
                                              busdetails1.bus_type_status ===
                                              "luxury"
                                                ? "#393939"
                                                : "#1F4B7F"
                                            }
                                          />
                                          <path
                                            d="M40.0123 3.70703V18.4205C40.0076 18.4217 40.0023 18.4223 39.9976 18.4234C36.2277 19.14 32.4074 19.498 28.5865 19.498V3.70703H40.0123Z"
                                            fill={
                                              busdetails1.bus_type_status ===
                                              "luxury"
                                                ? "#393939"
                                                : "#1F4B7F"
                                            }
                                          />
                                          <path
                                            d="M22.4341 22.1641C22.4341 22.6492 22.0404 23.043 21.5552 23.043H17.3793L17.2925 21.2852H21.5552C22.0404 21.2852 22.4341 21.6789 22.4341 22.1641Z"
                                            fill="#FFF81E"
                                          />
                                          <path
                                            d="M39.8775 21.3438L39.7914 23.1016H35.6177C35.1326 23.1016 34.7388 22.7078 34.7388 22.2227C34.7388 21.7375 35.1326 21.3438 35.6177 21.3438H39.8775Z"
                                            fill="#FFF81E"
                                          />
                                          <path
                                            d="M32.0435 21.2852H25.0709C24.5855 21.2852 24.192 21.6787 24.192 22.1641V23.8963C24.192 24.3805 24.5835 24.7735 25.0676 24.7752L32.0403 24.8008H32.0435C32.276 24.8008 32.4991 24.7087 32.6639 24.5445C32.8294 24.3796 32.9224 24.1555 32.9224 23.9219V22.1641C32.9224 21.6787 32.5289 21.2852 32.0435 21.2852Z"
                                            fill="#596C76"
                                          />
                                          <path
                                            d="M32.9224 22.1641V23.9219C32.9224 24.1557 32.8293 24.3795 32.664 24.5447C32.4994 24.7088 32.2761 24.8008 32.0435 24.8008H32.0406L28.5865 24.7879V21.2852H32.0435C32.5287 21.2852 32.9224 21.6789 32.9224 22.1641Z"
                                            fill="#465A61"
                                          />
                                        </g>
                                        <defs>
                                          {" "}
                                          <clipPath id="clip0_6794_2554">
                                            <rect
                                              width="30"
                                              height="30"
                                              fill="white"
                                              transform="translate(13.5865 0.132812)"
                                            />
                                          </clipPath>{" "}
                                        </defs>
                                      </svg>
                                    </div>
                                  </span>
                                </div>
                              </div>
                            </div>
                          ),
                        },
                      ]}
                    />
                  </div>
                  <div className="">
                    <Collapse
                      style={{
                        backgroundColor:
                          busdetails1.bus_type_status === "luxury"
                            ? "#393939"
                            : colorcode.theme,
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
                                  {formState.isValid &&
                                  formState.isSubmitting ? (
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
                                  busdetails1.bus_type_status === "luxury"
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
                                      selectedSeats1.map(
                                        (seat, index) =>
                                          travelerDetails[index]?.user_name
                                      ) || "",
                                    age:
                                      selectedSeats1.map(
                                        (seat, index) =>
                                          travelerDetails[index]?.age
                                      ) || "",
                                    gender: selectedSeats1.map(
                                      (seat, index) =>
                                        travelerDetails[index]?.gender || "male"
                                    ),
                                    terms: termschecked || false,
                                  }}
                                  validationSchema={validationSchema}
                                  onSubmit={(values) => {
                                    handleSubmit(values);
                                    console.log(values, "values values");
                                    setRegisterFullDetails(values);
                                    localStorage.setItem("page1", true);
                                    localStorage.setItem(
                                      "occupation",
                                      values.option
                                    );
                                    localStorage.setItem(
                                      "mobile",
                                      values.mobile
                                    );
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
                                      formState.isValid !== isValid ||
                                      formState.isSubmitting !== isSubmitting
                                    ) {
                                      setFormState({ isValid, isSubmitting });
                                    }

                                    return (
                                      <Form onSubmit={handleSubmit}>
                                        <div class="flex flex-col md:flex-row md:items-center md:gap-[1vw] gap-[4vw] md:mb-[1vw] mb-[3vw] md:px-[0vw] px-[2vw] pt-[1vw]">
                                          <div>
                                            <p
                                              className={`md:text-[1.1vw] text-[4vw] font-semibold ${
                                                busdetails1.bus_type_status ===
                                                "luxury"
                                                  ? "text-[#393939]"
                                                  : "text-[#1F487C]"
                                              }`}
                                            >
                                              Contact Details
                                            </p>
                                          </div>
                                          <div>
                                            <Field
                                              type="text"
                                              name="email"
                                              disabled={enableInput}
                                              placeholder="Email ID"
                                              value={emailInput}
                                              onChange={(e) => {
                                                handleChange(e);
                                                setEmailInput(e.target.value);
                                                setFieldValue(
                                                  "email",
                                                  e.target.value
                                                );
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
                                                text-[3.5vw] md:text-[1.2vw] md:h-[3vw] w-[100%] h-[10vw] md:w-[23vw] rounded-[1.5vw] md:rounded-[0.3vw] outline-none 
                                                px-[3vw] md:px-[1vw]`}
                                              style={{
                                                borderColor:
                                                  busdetails1.bus_type_status ===
                                                  "luxury"
                                                    ? "#393939"
                                                    : colorcode.theme,
                                              }}
                                            />
                                            <ErrorMessage
                                              name="email"
                                              component="div"
                                              className="text-red-500 text-[2.5vw] md:text-[0.8vw] absolute top-[9.7vw] md:top-[3vw] left-[2vw] md:left-[1vw]"
                                            />
                                          </div>
                                          <div className="flex items-center">
                                            <Field
                                              as="select"
                                              name="option"
                                              disabled={enableInput}
                                              // disabled={
                                              //   isMobileDisabled || enableInput
                                              // }
                                              className={`${
                                                !isSubmitting || !enableInput
                                                  ? `cursor-pointer`
                                                  : "cursor-not-allowed"
                                              } border-r-[0.1vw] border-[0.1vw] border-py-[0.5vw] md:placeholder:text-[1.2vw] placeholder:text-[3.5vw] text-[3.5vw] 
                                                md:text-[1.2vw] h-[10vw] md:h-[3vw] w-[20vw] md:w-[5vw] rounded-l-[1.5vw] md:rounded-l-[0.3vw] outline-none px-[3vw] md:px-[.5vw]`}
                                              style={{
                                                borderColor:
                                                  busdetails1.bus_type_status ===
                                                  "luxury"
                                                    ? "#393939"
                                                    : colorcode.theme,
                                              }}
                                            >
                                              <option
                                                value=""
                                                label="+91"
                                                className=""
                                                style={{
                                                  color:
                                                    busdetails1.bus_type_status ===
                                                    "luxury"
                                                      ? "#393939"
                                                      : colorcode.theme,
                                                }}
                                              />
                                            </Field>
                                            <Field
                                              type="text"
                                              name="mobile"
                                              disabled={enableInput}
                                              // disabled={
                                              //   isMobileDisabled || enableInput
                                              // }
                                              placeholder="Mobile Number"
                                              maxLength={10}
                                              value={mobileInput}
                                              onChange={(e) => {
                                                handleChange(e);
                                                setMobileInput(e.target.value);
                                                setFieldValue(
                                                  "mobile",
                                                  e.target.value
                                                );
                                              }}
                                              className={`${
                                                !isSubmitting || !enableInput
                                                  ? `cursor-pointer`
                                                  : "cursor-not-allowed"
                                              } border-r-[1.5vw] md:border-r-[0.5vw] md:placeholder:text-[1.2vw] placeholder:text-[3.5vw] border-black border-[0.1vw] 
                                                text-[3.5vw] md:text-[1.2vw] h-[10vw] md:h-[3vw] w-[70vw] md:w-[17vw] rounded-r-[1.5vw] md:rounded-r-[0.3vw] outline-none px-[3vw] md:px-[1vw]`}
                                              style={{
                                                borderColor:
                                                  busdetails1.bus_type_status ===
                                                  "luxury"
                                                    ? "#393939"
                                                    : colorcode.theme,
                                              }}
                                            />
                                            <ErrorMessage
                                              name="mobile"
                                              component="div"
                                              className="text-red-500 text-[2.5vw] md:text-[0.8vw] absolute top-[9.7vw] md:top-[3vw] left-[2vw] md:left-[1vw]"
                                            />
                                          </div>
                                        </div>
                                        <div className="md:ml-[9vw] ml-[2.5vw]">
                                          <p className="md:text-[1vw] text-[#666666] text-[2.6vw] pb-[1vw] md:px-[0vw]">
                                            Your booking details will be sent to
                                            this email address and mobile
                                            number.
                                          </p>
                                        </div>
                                        <div className="grid md:grid-row-4 w-full h-full gap-[1vw] mt-[2vw] md:mt-[0vw] md:px-[0vw]">
                                          <div
                                            className=" md:w-full md:ml-[0vw] md:mr-[0.5vw] ml-[2vw] mr-[4vw] rounded-[2vw] md:rounded-[0.7vw]"
                                            style={{
                                              borderColor:
                                                busdetails1.bus_type_status ===
                                                "luxury"
                                                  ? "#393939"
                                                  : colorcode.theme,
                                            }}
                                          >
                                            {Object.entries(seatDetails1)
                                              .length > 0 &&
                                              Object.entries(seatDetails1).map(
                                                (
                                                  [seatNumber, seatDetail],
                                                  index
                                                ) => (
                                                  <>
                                                    <div className="md:block hidden pt-[1vw] pb-[1.5vw]">
                                                      <div class="grid grid-cols-4 grid-flow-row">
                                                        <div className="flex w-[6.90vw] items-center ">
                                                          <p
                                                            className={`text-[1vw] font-semibold ${
                                                              busdetails1.bus_type_status ===
                                                              "luxury"
                                                                ? "text-[#393939]"
                                                                : "text-[#1F487C]"
                                                            }`}
                                                          >
                                                            Seat No:{" "}
                                                            {seatDetail.Seat}
                                                          </p>
                                                        </div>
                                                        <div className="ml-[-5.42vw]">
                                                          <Field
                                                            type="text"
                                                            disabled={
                                                              enableInput
                                                            }
                                                            name={`user_name_${index}`}
                                                            placeholder="Enter passenger Name"
                                                            value={
                                                              travelerDetails[
                                                                index
                                                              ]?.user_name ||
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
                                                                (
                                                                  prevDetails
                                                                ) => ({
                                                                  ...prevDetails,
                                                                  [index]: {
                                                                    ...prevDetails[
                                                                      index
                                                                    ],
                                                                    user_name:
                                                                      e.target
                                                                        .value,
                                                                    seat: seatDetail.Seat,
                                                                  },
                                                                })
                                                              );
                                                            }}
                                                            className={`${
                                                              !isSubmitting ||
                                                              !enableInput
                                                                ? `cursor-pointer`
                                                                : "cursor-not-allowed"
                                                            } md:placeholder:text-[1.2vw] placeholder:text-[3.5vw] border-r-[0.5vw] border-[.1vw] text-[1.2vw] h-[3vw] w-[23.1vw]
                                                           rounded-[0.3vw] outline-none px-[1vw]`}
                                                            style={{
                                                              borderColor:
                                                                busdetails1.bus_type_status ===
                                                                "luxury"
                                                                  ? "#393939"
                                                                  : colorcode.theme,
                                                            }}
                                                          />
                                                          <ErrorMessage
                                                            name={`user_name_${index}`}
                                                            component="div"
                                                            className="text-red-500 text-[0.8vw] absolute left-[12vw] mb-[1vw]"
                                                          />
                                                        </div>
                                                        <div className="ml-[5.2vw]">
                                                          <Field
                                                            type="text"
                                                            disabled={
                                                              enableInput
                                                            }
                                                            name={`age_${index}`}
                                                            placeholder="Age"
                                                            maxLength={2}
                                                            value={
                                                              travelerDetails[
                                                                index
                                                              ]?.age ||
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
                                                                (
                                                                  prevDetails
                                                                ) => ({
                                                                  ...prevDetails,
                                                                  [index]: {
                                                                    ...prevDetails[
                                                                      index
                                                                    ],
                                                                    age: e
                                                                      .target
                                                                      .value,
                                                                    seat: seatDetail.Seat,
                                                                  },
                                                                })
                                                              );
                                                            }}
                                                            className={`${
                                                              !isSubmitting ||
                                                              !enableInput
                                                                ? `cursor-pointer`
                                                                : "cursor-not-allowed"
                                                            }  md:placeholder:text-[1.2vw] placeholder:text-[2vw] border-r-[0.5vw] border-[.1vw] border-black h-[3vw] w-[7.5vw] rounded-[0.3vw] outline-none px-[1vw]`}
                                                            style={{
                                                              borderColor:
                                                                busdetails1.bus_type_status ===
                                                                "luxury"
                                                                  ? "#393939"
                                                                  : colorcode.theme,
                                                            }}
                                                          />
                                                          <ErrorMessage
                                                            name={`age_${index}`}
                                                            component="div"
                                                            className="text-red-500 text-[0.8vw] absolute left-[36vw]"
                                                          />
                                                        </div>
                                                        <div className="ml-[-0.1vw]">
                                                          <button
                                                            disabled={
                                                              enableInput ||
                                                              seatDetails1[
                                                                selectedSeats1[
                                                                  index
                                                                ]
                                                              ]?.Status !==
                                                                "AFA"
                                                            }
                                                            type="button"
                                                            name="gender"
                                                            style={{
                                                              background:
                                                                travelerDetails[
                                                                  index
                                                                ]?.gender ===
                                                                  "male" ||
                                                                !travelerDetails[
                                                                  index
                                                                ]
                                                                  ? busdetails1.bus_type_status ===
                                                                    "luxury"
                                                                    ? "#393939"
                                                                    : busdetails1.bus_type_status ===
                                                                      "regular"
                                                                    ? colorcode.theme
                                                                    : ""
                                                                  : "#ffffff",
                                                              color:
                                                                travelerDetails[
                                                                  index
                                                                ]?.gender !==
                                                                  "male" &&
                                                                travelerDetails[
                                                                  index
                                                                ]
                                                                  ? busdetails1.bus_type_status ===
                                                                    "luxury"
                                                                    ? "#393939"
                                                                    : busdetails1.bus_type_status ===
                                                                      "regular"
                                                                    ? colorcode.theme
                                                                    : ""
                                                                  : "",
                                                              borderColor:
                                                                travelerDetails[
                                                                  index
                                                                ]?.gender ===
                                                                  "male" ||
                                                                !travelerDetails[
                                                                  index
                                                                ]
                                                                  ? busdetails1.bus_type_status ===
                                                                    "luxury"
                                                                    ? "#393939"
                                                                    : busdetails1.bus_type_status ===
                                                                      "regular"
                                                                    ? colorcode.theme
                                                                    : ""
                                                                  : "",
                                                            }}
                                                            className={`${
                                                              !isSubmitting ||
                                                              !enableInput
                                                                ? "cursor-pointer"
                                                                : "cursor-not-allowed"
                                                            } h-[3vw] w-[5.5vw] rounded-l-[0.3vw] text-[1vw] border-[0.1vw] text-white border-[#1F487C]`}
                                                            onClick={() =>
                                                              setTravelerDetails(
                                                                (
                                                                  prevDetails
                                                                ) => ({
                                                                  ...prevDetails,
                                                                  [index]: {
                                                                    ...prevDetails[
                                                                      index
                                                                    ],
                                                                    gender:
                                                                      "male",
                                                                    seat: seatDetail.Seat,
                                                                  },
                                                                })
                                                              )
                                                            }
                                                          >
                                                            {" "}
                                                            Male
                                                          </button>
                                                          <button
                                                            disabled={
                                                              enableInput ||
                                                              seatDetails1[
                                                                selectedSeats1[
                                                                  index
                                                                ]
                                                              ]?.Status !==
                                                                "AFA"
                                                            }
                                                            type="button"
                                                            name={`gender_${index}`}
                                                            style={{
                                                              background:
                                                                travelerDetails[
                                                                  index
                                                                ]?.gender ===
                                                                  "female" ||
                                                                !travelerDetails[
                                                                  index
                                                                ]
                                                                  ? busdetails1.bus_type_status ===
                                                                    "luxury"
                                                                    ? "#393939"
                                                                    : busdetails1.bus_type_status ===
                                                                      "regular"
                                                                    ? colorcode.theme
                                                                    : "#ffffff"
                                                                  : "#ffffff",
                                                              color:
                                                                travelerDetails[
                                                                  index
                                                                ]?.gender !==
                                                                  "female" &&
                                                                travelerDetails[
                                                                  index
                                                                ]
                                                                  ? busdetails1.bus_type_status ===
                                                                    "luxury"
                                                                    ? "#393939"
                                                                    : busdetails1.bus_type_status ===
                                                                      "regular"
                                                                    ? colorcode.theme
                                                                    : ""
                                                                  : "",
                                                              borderColor:
                                                                travelerDetails[
                                                                  index
                                                                ]?.gender ===
                                                                  "female" ||
                                                                !travelerDetails[
                                                                  index
                                                                ]
                                                                  ? busdetails1.bus_type_status ===
                                                                    "luxury"
                                                                    ? "#393939"
                                                                    : busdetails1.bus_type_status ===
                                                                      "regular"
                                                                    ? colorcode.theme
                                                                    : ""
                                                                  : "",
                                                            }}
                                                            className={`${
                                                              !isSubmitting ||
                                                              !enableInput
                                                                ? "cursor-pointer"
                                                                : "cursor-not-allowed"
                                                            } text-white h-[3vw] w-[5.5vw] rounded-r-[0.3vw] border-[0.1vw] text-[1vw] border-[#1F487C]`}
                                                            onClick={() =>
                                                              setTravelerDetails(
                                                                (
                                                                  prevDetails
                                                                ) => ({
                                                                  ...prevDetails,
                                                                  [index]: {
                                                                    ...prevDetails[
                                                                      index
                                                                    ],
                                                                    gender:
                                                                      "female",
                                                                    seat: seatDetail.Seat,
                                                                  },
                                                                })
                                                              )
                                                            }
                                                          >
                                                            {" "}
                                                            Female{" "}
                                                          </button>
                                                          <span>
                                                            {!travelerDetails[
                                                              index
                                                            ]?.user_name &&
                                                            passengerdatalist?.length >
                                                              0 &&
                                                            !travelerDetails[
                                                              index
                                                            ]?.age ? (
                                                              passengerDropDown ===
                                                              `${index}` ? (
                                                                <IoCaretUpSharp
                                                                  onClick={() =>
                                                                    toggleDropDown(
                                                                      `${index}`
                                                                    )
                                                                  }
                                                                  color={
                                                                    busdetails1.bus_type_status ===
                                                                    "luxury"
                                                                      ? "#393939"
                                                                      : colorcode.theme
                                                                  }
                                                                  className="ml-[12vw] mt-[-2.5vw] cursor-pointer"
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
                                                                    busdetails1.bus_type_status ===
                                                                    "luxury"
                                                                      ? "#393939"
                                                                      : colorcode.theme
                                                                  }
                                                                  className="ml-[12vw] mt-[-2.5vw] cursor-pointer"
                                                                  size={"1.5vw"}
                                                                />
                                                              )
                                                            ) : (
                                                              <IoIosCloseCircle
                                                                onClick={() => {
                                                                  if (
                                                                    enableInput
                                                                  )
                                                                    return; // Prevent action if disabled
                                                                  setTravelerDetails(
                                                                    (
                                                                      prevDetails
                                                                    ) => ({
                                                                      ...prevDetails,
                                                                      [index]: {
                                                                        ...prevDetails[
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
                                                                  busdetails1.bus_type_status ===
                                                                  "luxury"
                                                                    ? "#393939"
                                                                    : colorcode.theme
                                                                }
                                                                disabled={
                                                                  enableInput
                                                                }
                                                                className={`ml-[12vw] mt-[-2.5vw] ${
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
                                                    <div className="md:block hidden">
                                                      {passengerDropDown ===
                                                        `${index}` &&
                                                      passengerdatalist?.length >
                                                        0 ? (
                                                        <div
                                                          style={{
                                                            borderColor:
                                                              busdetails1.bus_type_status ===
                                                              "luxury"
                                                                ? "#393939"
                                                                : colorcode.theme,
                                                          }}
                                                          className="ml-[8.7vw] mr-[3vw] my-[0.5vw] border-[0.1vw] border-l-[0.1vw] border-t-[0.01vw] border-b-[0.3vw]
                                                       border-r-[0.3vw] rounded-[0.7vw]"
                                                        >
                                                          <div className="min-h-[4vw] max-h-[6.5vw] overflow-y-auto">
                                                            {passengerdatalist?.length >
                                                              0 &&
                                                              passengerdatalist
                                                                .filter(
                                                                  (
                                                                    passenger
                                                                  ) => {
                                                                    const seatStatus =
                                                                      seatDetails1[
                                                                        selectedSeats1[
                                                                          index
                                                                        ]
                                                                      ]?.Status;
                                                                    // Filter based on seat status
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
                                                                      // Allow both male and female for AFA status
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
                                                                .map(
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
                                                                            [index]:
                                                                              {
                                                                                ...prevDetails[
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
                                                                        busdetails1.bus_type_status ===
                                                                        "luxury"
                                                                          ? "text-[#393939] border-b-[#393939]"
                                                                          : "text-[#1F487C] border-b-[#adadad]"
                                                                      } hover:bg-gray-200 hover:rounded-sm`}
                                                                      key={idx}
                                                                    >
                                                                      <div
                                                                        className={`flex font-medium text-center ${
                                                                          busdetails1.bus_type_status ===
                                                                          "luxury"
                                                                            ? "text-[#393939]"
                                                                            : "text-[#1F487C]"
                                                                        }`}
                                                                      >
                                                                        {
                                                                          passenger.user_name
                                                                        }
                                                                      </div>
                                                                      <div
                                                                        className={`flex font-medium text-center ${
                                                                          busdetails1.bus_type_status ===
                                                                          "luxury"
                                                                            ? "text-[#393939]"
                                                                            : "text-[#1F487C]"
                                                                        }`}
                                                                      >
                                                                        {
                                                                          passenger.age
                                                                        }
                                                                      </div>
                                                                      <div
                                                                        className={`flex font-medium text-center ${
                                                                          busdetails1.bus_type_status ===
                                                                          "luxury"
                                                                            ? "text-[#393939]"
                                                                            : "text-[#1F487C]"
                                                                        }`}
                                                                      >
                                                                        {
                                                                          passenger.gender
                                                                        }
                                                                      </div>
                                                                    </div>
                                                                  )
                                                                )}
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
                                                            <p className="text-[4vw] font-semibold mt-[2vw]">
                                                              Seat No:{" "}
                                                              {seatDetail.Seat}
                                                            </p>
                                                          </div>
                                                          <div className="flex flex-col gap-y-[4vw]">
                                                            <div className="flex flex-row">
                                                              <div className="relative">
                                                                <Field
                                                                  type="text"
                                                                  disabled={
                                                                    enableInput
                                                                  }
                                                                  name={`user_name_${index}`}
                                                                  placeholder="User Name"
                                                                  value={
                                                                    travelerDetails[
                                                                      index
                                                                    ]
                                                                      ?.user_name ||
                                                                    values[
                                                                      `user_name_${index}`
                                                                    ] ||
                                                                    ""
                                                                  }
                                                                  onChange={(
                                                                    e
                                                                  ) => {
                                                                    handleChange(
                                                                      e
                                                                    );
                                                                    setFieldValue(
                                                                      `user_name_${index}`,
                                                                      e.target
                                                                        .value
                                                                    );
                                                                    setTravelerDetails(
                                                                      (
                                                                        prevDetails
                                                                      ) => ({
                                                                        ...prevDetails,
                                                                        [index]:
                                                                          {
                                                                            ...prevDetails[
                                                                              index
                                                                            ],
                                                                            user_name:
                                                                              e
                                                                                .target
                                                                                .value,
                                                                            seat: seatDetail.Seat,
                                                                          },
                                                                      })
                                                                    );
                                                                  }}
                                                                  className={`${
                                                                    !isSubmitting ||
                                                                    !enableInput
                                                                      ? `cursor-pointer`
                                                                      : "cursor-not-allowed"
                                                                  }  border-r-[2vw] border-[.1vw] text-[3.5vw] md:text-[1.2vw] md:text-[1.2vw] md:placeholder:text-[1.2vw] 
                                                                placeholder:text-[3.5vw] h-[10vw] w-[83vw] rounded-[2vw] outline-none pl-[2vw] md:px-[1vw]`}
                                                                  style={{
                                                                    borderColor:
                                                                      busdetails1.bus_type_status ===
                                                                      "luxury"
                                                                        ? "#393939"
                                                                        : colorcode.theme,
                                                                  }}
                                                                />
                                                                <ErrorMessage
                                                                  name={`user_name_${index}`}
                                                                  component="div"
                                                                  className="text-red-500 text-[2.5vw] absolute top-[9.7vw] left-[2vw]"
                                                                />
                                                              </div>
                                                              <div>
                                                                {!travelerDetails[
                                                                  index
                                                                ]?.user_name &&
                                                                passengerdatalist?.length >
                                                                  0 &&
                                                                !travelerDetails[
                                                                  index
                                                                ]?.age ? (
                                                                  passengerDropDown ===
                                                                  `${index}` ? (
                                                                    <IoCaretUpSharp
                                                                      onClick={() =>
                                                                        toggleDropDown(
                                                                          `${index}`
                                                                        )
                                                                      }
                                                                      color={
                                                                        busdetails1.bus_type_status ===
                                                                        "luxury"
                                                                          ? "#393939"
                                                                          : colorcode.theme
                                                                      }
                                                                      className="ml-[1vw] mt-[2vw] cursor-pointer"
                                                                      size={
                                                                        "5vw"
                                                                      }
                                                                    />
                                                                  ) : (
                                                                    <IoCaretDownSharp
                                                                      onClick={() =>
                                                                        toggleDropDown(
                                                                          `${index}`
                                                                        )
                                                                      }
                                                                      color={
                                                                        busdetails1.bus_type_status ===
                                                                        "luxury"
                                                                          ? "#393939"
                                                                          : colorcode.theme
                                                                      }
                                                                      className="ml-[1vw] mt-[2vw] cursor-pointer"
                                                                      size={
                                                                        "5vw"
                                                                      }
                                                                    />
                                                                  )
                                                                ) : (
                                                                  <IoIosCloseCircle
                                                                    onClick={() => {
                                                                      if (
                                                                        enableInput
                                                                      )
                                                                        return;
                                                                      setTravelerDetails(
                                                                        (
                                                                          prevDetails
                                                                        ) => ({
                                                                          ...prevDetails,
                                                                          [index]:
                                                                            {
                                                                              ...prevDetails[
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
                                                                      busdetails1.bus_type_status ===
                                                                      "luxury"
                                                                        ? "#393939"
                                                                        : colorcode.theme
                                                                    }
                                                                    disabled={
                                                                      enableInput
                                                                    }
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
                                                                    busdetails1.bus_type_status ===
                                                                    "luxury"
                                                                      ? "#393939"
                                                                      : colorcode.theme,
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
                                                                        (
                                                                          passenger
                                                                        ) => {
                                                                          const seatStatus =
                                                                            seatDetails1[
                                                                              selectedSeats1[
                                                                                index
                                                                              ]
                                                                            ]
                                                                              ?.Status;
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
                                                                      .map(
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
                                                                                  [index]:
                                                                                    {
                                                                                      ...prevDetails[
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
                                                                              busdetails1.bus_type_status ===
                                                                              "luxury"
                                                                                ? "text-[#393939] border-b-[#393939]"
                                                                                : "text-[#1F487C] border-b-[#adadad]"
                                                                            } hover:bg-gray-200 hover:rounded-sm`}
                                                                            key={
                                                                              idx
                                                                            }
                                                                          >
                                                                            <div
                                                                              className={`flex font-medium text-center ${
                                                                                busdetails1.bus_type_status ===
                                                                                "luxury"
                                                                                  ? "text-[#393939]"
                                                                                  : "text-[#1F487C]"
                                                                              }`}
                                                                            >
                                                                              {
                                                                                passenger.user_name
                                                                              }{" "}
                                                                              -
                                                                              (Age
                                                                              :{" "}
                                                                              {
                                                                                passenger.age
                                                                              }
                                                                              /
                                                                              {capitalizeFirstLetter(
                                                                                passenger.gender
                                                                              )}
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
                                                                  disabled={
                                                                    enableInput ||
                                                                    seatDetails1[
                                                                      selectedSeats1[
                                                                        index
                                                                      ]
                                                                    ]
                                                                      ?.Status !==
                                                                      "AFA"
                                                                  }
                                                                  type="button"
                                                                  name="gender"
                                                                  style={{
                                                                    background:
                                                                      travelerDetails[
                                                                        index
                                                                      ]
                                                                        ?.gender ===
                                                                        "male" ||
                                                                      !travelerDetails[
                                                                        index
                                                                      ]
                                                                        ? busdetails1.bus_type_status ===
                                                                          "luxury"
                                                                          ? "#393939"
                                                                          : busdetails1.bus_type_status ===
                                                                            "regular"
                                                                          ? colorcode.theme
                                                                          : ""
                                                                        : "#ffffff",
                                                                    color:
                                                                      travelerDetails[
                                                                        index
                                                                      ]
                                                                        ?.gender !==
                                                                        "male" &&
                                                                      travelerDetails[
                                                                        index
                                                                      ]
                                                                        ? busdetails1.bus_type_status ===
                                                                          "luxury"
                                                                          ? "#393939"
                                                                          : busdetails1.bus_type_status ===
                                                                            "regular"
                                                                          ? colorcode.theme
                                                                          : ""
                                                                        : "",
                                                                    borderColor:
                                                                      travelerDetails[
                                                                        index
                                                                      ]
                                                                        ?.gender ===
                                                                        "male" ||
                                                                      !travelerDetails[
                                                                        index
                                                                      ]
                                                                        ? busdetails1.bus_type_status ===
                                                                          "luxury"
                                                                          ? "#393939"
                                                                          : busdetails1.bus_type_status ===
                                                                            "regular"
                                                                          ? colorcode.theme
                                                                          : ""
                                                                        : "",
                                                                  }}
                                                                  className={`${
                                                                    !isSubmitting ||
                                                                    !enableInput
                                                                      ? "cursor-pointer"
                                                                      : "cursor-not-allowed"
                                                                  } h-[10vw] w-[22vw] rounded-l-[1.5vw] text-[3.5vw] border-[0.1vw] text-white border-[#1F487C]`}
                                                                  onClick={() =>
                                                                    setTravelerDetails(
                                                                      (
                                                                        prevDetails
                                                                      ) => ({
                                                                        ...prevDetails,
                                                                        [index]:
                                                                          {
                                                                            ...prevDetails[
                                                                              index
                                                                            ],
                                                                            gender:
                                                                              "male",
                                                                            seat: seatDetail.Seat,
                                                                          },
                                                                      })
                                                                    )
                                                                  }
                                                                >
                                                                  Male
                                                                </button>
                                                                <button
                                                                  disabled={
                                                                    enableInput ||
                                                                    seatDetails1[
                                                                      selectedSeats1[
                                                                        index
                                                                      ]
                                                                    ]
                                                                      ?.Status !==
                                                                      "AFA"
                                                                  }
                                                                  type="button"
                                                                  name={`gender_${index}`}
                                                                  style={{
                                                                    background:
                                                                      travelerDetails[
                                                                        index
                                                                      ]
                                                                        ?.gender ===
                                                                        "female" ||
                                                                      !travelerDetails[
                                                                        index
                                                                      ]
                                                                        ? busdetails1.bus_type_status ===
                                                                          "luxury"
                                                                          ? "#393939"
                                                                          : busdetails1.bus_type_status ===
                                                                            "regular"
                                                                          ? colorcode.theme
                                                                          : "#ffffff"
                                                                        : "#ffffff",
                                                                    color:
                                                                      travelerDetails[
                                                                        index
                                                                      ]
                                                                        ?.gender !==
                                                                        "female" &&
                                                                      travelerDetails[
                                                                        index
                                                                      ]
                                                                        ? busdetails1.bus_type_status ===
                                                                          "luxury"
                                                                          ? "#393939"
                                                                          : busdetails1.bus_type_status ===
                                                                            "regular"
                                                                          ? colorcode.theme
                                                                          : ""
                                                                        : "",
                                                                    borderColor:
                                                                      travelerDetails[
                                                                        index
                                                                      ]
                                                                        ?.gender ===
                                                                        "female" ||
                                                                      !travelerDetails[
                                                                        index
                                                                      ]
                                                                        ? busdetails1.bus_type_status ===
                                                                          "luxury"
                                                                          ? "#393939"
                                                                          : busdetails1.bus_type_status ===
                                                                            "regular"
                                                                          ? colorcode.theme
                                                                          : ""
                                                                        : "",
                                                                  }}
                                                                  className={`${
                                                                    !isSubmitting ||
                                                                    !enableInput
                                                                      ? "cursor-pointer"
                                                                      : "cursor-not-allowed"
                                                                  } text-white h-[10vw] w-[22vw] rounded-r-[1.5vw] border-[0.1vw] text-[3.5vw] border-[#1F487C]`}
                                                                  onClick={() =>
                                                                    setTravelerDetails(
                                                                      (
                                                                        prevDetails
                                                                      ) => ({
                                                                        ...prevDetails,
                                                                        [index]:
                                                                          {
                                                                            ...prevDetails[
                                                                              index
                                                                            ],
                                                                            gender:
                                                                              "female",
                                                                            seat: seatDetail.Seat,
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
                                                                  disabled={
                                                                    enableInput
                                                                  }
                                                                  name={`age_${index}`}
                                                                  placeholder="Age"
                                                                  maxLength={2}
                                                                  value={
                                                                    travelerDetails[
                                                                      index
                                                                    ]?.age ||
                                                                    values[
                                                                      `age_${index}`
                                                                    ] ||
                                                                    ""
                                                                  }
                                                                  onChange={(
                                                                    e
                                                                  ) => {
                                                                    handleChange(
                                                                      e
                                                                    );
                                                                    setFieldValue(
                                                                      `age_${index}`,
                                                                      e.target
                                                                        .value
                                                                    );
                                                                    setTravelerDetails(
                                                                      (
                                                                        prevDetails
                                                                      ) => ({
                                                                        ...prevDetails,
                                                                        [index]:
                                                                          {
                                                                            ...prevDetails[
                                                                              index
                                                                            ],
                                                                            age: e
                                                                              .target
                                                                              .value,
                                                                            seat: seatDetail.Seat,
                                                                          },
                                                                      })
                                                                    );
                                                                  }}
                                                                  className={`${
                                                                    !isSubmitting ||
                                                                    !enableInput
                                                                      ? `cursor-pointer`
                                                                      : "cursor-not-allowed"
                                                                  } border-r-[2vw] border-[.1vw] border-black text-[3.5vw] md:text-[1.2vw] placeholder:text-[3.5vw] 
                                                                h-[10vw] w-[33vw] rounded-[2vw] outline-none pl-[2vw] ml-[-39vw]`}
                                                                  style={{
                                                                    borderColor:
                                                                      busdetails1.bus_type_status ===
                                                                      "luxury"
                                                                        ? "#393939"
                                                                        : colorcode.theme,
                                                                  }}
                                                                />
                                                                <ErrorMessage
                                                                  name={`age_${index}`}
                                                                  component="div"
                                                                  className="text-red-500 text-[2.5vw] absolute top-[9.7vw] left-[-30vw]"
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
                                        {registerfulldetails?.terms === true ? (
                                          ""
                                        ) : (
                                          <>
                                            <div className="flex md:flex-row flex-col md:pt-[2vw] pt-[4vw] md:items-center md:justify-between py-[2vw] md:py-[0vw] px-[2vw] md:px-[0vw]">
                                              <div className="flex items-center gap-[2vw] md:gap-[0.5vw] md:mb-[0vw] mb-[3vw]">
                                                <Field
                                                  disabled={enableInput}
                                                  id="custom-checkbox"
                                                  type="checkbox"
                                                  name="terms"
                                                  className="md:h-[1.5vw] md:w-[2vw] h-[4.5vw] w-[5vw] "
                                                  checked={values.terms}
                                                  //color="#393939"
                                                  onChange={(e) => {
                                                    handleChange(e);
                                                    setFieldValue(
                                                      "terms",
                                                      e.target.value
                                                    );
                                                    setTermsChecked(
                                                      e.target.checked
                                                    );
                                                    console.log(
                                                      e.target.checked,
                                                      "setTermsChecked"
                                                    );
                                                  }}
                                                />
                                                <p className="md:text-[.8vw] text-[4vw]">
                                                  Yes and I accept the{" "}
                                                  <span>
                                                    Terms and conditions
                                                  </span>
                                                </p>
                                              </div>
                                              <div className="flex justify-end md:gap-x-[0vw] gap-x-[6vw] items-center">
                                                {sumbitbutton && (
                                                  <FaEdit
                                                    // size={"2vw"}
                                                    color={
                                                      busdetails1.bus_type_status ===
                                                      "luxury"
                                                        ? "#393939"
                                                        : busdetails1.bus_type_status ===
                                                          "regular"
                                                        ? colorcode.theme
                                                        : ""
                                                    }
                                                    className="cursor-pointer md:ml-[15vw] md:text-[2vw] text-[7vw]"
                                                    onClick={() => {
                                                      setEnableInput(false);
                                                      //fetchBookingDetail(mobilenum);
                                                    }}
                                                  />
                                                )}

                                                <button
                                                  type="submit"
                                                  style={{
                                                    backgroundColor:
                                                      isValid && termschecked
                                                        ? busdetails1.bus_type_status ===
                                                          "luxury"
                                                          ? "#393939"
                                                          : busdetails1.bus_type_status ===
                                                            "regular"
                                                          ? colorcode.theme
                                                          : ""
                                                        : "gray",
                                                  }}
                                                  className={`${
                                                    termschecked &&
                                                    isValid &&
                                                    !enableInput
                                                      ? "cursor-pointer"
                                                      : "cursor-not-allowed"
                                                  }
                                                  md:w-[18vw] w-full h-[8vw] md:h-[2.5vw] rounded-[2vw] md:rounded-[0.5vw] ml-[1vw]`}
                                                  disabled={enableInput}
                                                  onClick={() => {
                                                    // setMobilenum(
                                                    //   storedMobile &&
                                                    //     storedMobile != "undefined"
                                                    //     ? sessionStorage.getItem(
                                                    //         "user_mobile"
                                                    //       )
                                                    //     : values.mobile
                                                    // );
                                                    console.log(
                                                      "passenger detail",
                                                      travelerDetails,
                                                      showPrice
                                                    );
                                                  }}
                                                >
                                                  <span className="text-white text-[2.8vw] md:text-[1.1vw] font-semibold">
                                                    {isSubmitting && isValid
                                                      ? `Update to Pay ₹ ${discount1}`
                                                      : `Continue to Pay ₹ ${discount1}`}
                                                  </span>
                                                </button>
                                              </div>
                                            </div>
                                            <ErrorMessage
                                              name="terms"
                                              component="div"
                                              className="text-red-500 text-[2.5] md:text-[0.8vw] ml-[2vw]"
                                            />
                                          </>
                                        )}
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
                  {showPrice ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-[2vw] h-[5vw]">
                      <div
                        className={`${
                          busdetails1.bus_type_status === "luxury"
                            ? "bg-[#FFEEC9]"
                            : "bg-white"
                        } col-span-1 h-[67vw] md:h-[17.4vw] w-full rounded-[1.5vw]  md:rounded-[0.5vw]`}
                        style={{
                          boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
                        }}
                      >
                        <div
                          className="row-span-6 h-auto w-full  rounded-[0.5vw] pb-[2vw]"
                          style={{
                            boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
                          }}
                        >
                          <h1
                            className="md:text-[1.5vw] text-[4vw] font-semibold bg-gradient-to-r md:px-[1vw] px-[3vw] py-[2vw] 
                                        md:py-[0.5vw] from-[#2E78AE] to-[#1F487C] bg-clip-text text-transparent"
                            style={{
                              color:
                                busdetails1?.bus_type_status === "luxury"
                                  ? "#393939"
                                  : colorcode.theme,
                            }}
                          >
                            Offers
                          </h1>
                          <div className="md:px-[1vw] px-[3vw] h-[42vw] md:h-[9.5vw] overflow-y-auto">
                            {offers.map((item, index) => (
                              <div
                                key={index}
                                className="border-[0.1vw] rounded-[2vw] md:rounded-[0.5vw] mb-[2vw] md:mb-[1vw]"
                                style={{
                                  borderColor:
                                    busdetails1.bus_type_status === "luxury"
                                      ? "#393939"
                                      : colorcode.theme,
                                }}
                              >
                                <div className="grid grid-cols-10 m-[1vw] md:m-[0.5vw] w-full">
                                  <div className="col-span-1 pt-[.5vw] md:pt-[0.2vw]">
                                    <input
                                      type="radio"
                                      name="offer"
                                      className="w-full h-auto"
                                    />
                                  </div>
                                  <div className="col-span-9 flex flex-col w-full">
                                    <p
                                      className="md:text-[1.1vw] text-[3.3vw] font-bold"
                                      // style={{ color: colorcode.theme }}
                                    >
                                      {item.Coupon}
                                    </p>
                                    <p className="md:text-[1vw] text-[3vw] font-semibold text-[#A4A4A4]">
                                      {item.details}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>

                          <div className="md:h-[1.9vw] h-[15vw] md:py-[0vw] py-[2vw]  w-full">
                            <div className="px-[2.5vw] md:px-[0vw]">
                              <Formik
                                initialValues={{
                                  name: "",
                                }}
                                validationSchema={validationSchema}
                                onSubmit={(values) => {
                                  // Handle form submission
                                  // setShowRegister(true);
                                  localStorage.setItem("page1", true);
                                  localStorage.setItem(
                                    "occupation",
                                    values.option
                                  );
                                  localStorage.setItem(
                                    "mobile",
                                    values.mobileData
                                  );
                                }}
                              >
                                {({ handleChange, isSubmitting }) => (
                                  <Form className="flex px-[1vw] mt-[0.8vw] relative">
                                    <GiSevenPointedStar
                                      // size={"2vw"}
                                      className="absolute left-[1.5vw] top-[0.5vw] text-[7vw] md:text-[2vw]"
                                      // color="color"
                                      style={{
                                        color:
                                          busdetails1.bus_type_status ===
                                          "luxury"
                                            ? "#393939"
                                            : colorcode.theme,
                                      }}
                                    />
                                    <p className="text-white font-bold absolute left-[3.4vw] top-[1.3vw] md:left-[2vw] md:top-[0.75vw]">
                                      %
                                    </p>
                                    <Field
                                      type="text"
                                      name="name"
                                      placeholder="Enter promo code"
                                      className="border-dashed border-[.3vw] md:border-[0.1vw] placeholder:text-[3.5vw] md:placeholder:text-[1.2vw]  outline-none text-[3.5vw] md:text-[1.2vw] h-[9vw] md:h-[3vw] w-[75%] md:rounded-l-[0.5vw] rounded-l-[1.5vw] pl-[9vw]  md:pl-[3vw] "
                                      style={{
                                        // color: colorcode.theme,
                                        borderColor:
                                          busdetails1.bus_type_status ===
                                          "luxury"
                                            ? "#393939"
                                            : colorcode.theme,
                                        // background: `linear-gradient(to right,${colorcode.gradient} , #FFFFFF)`
                                      }}
                                      onChange={(e) => {
                                        setPromoCode(e.target.value);
                                        handleChange(e);
                                        console.log(
                                          e.target.value,
                                          "promoCode11"
                                        );
                                      }}
                                    />
                                    <button
                                      onClick={handlePromoCode}
                                      className=" w-[25%] md:h-[3vw] h-[9vw] md:rounded-r-[0.5vw] rounded-r-[1.5vw]  text-white  font-bold flex items-center justify-center"
                                      style={{
                                        backgroundColor:
                                          busdetails1.bus_type_status ===
                                          "luxury"
                                            ? "#393939"
                                            : colorcode.theme,
                                      }}
                                    >
                                      Apply
                                    </button>
                                  </Form>
                                )}
                              </Formik>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        className={`${
                          busdetails1.bus_type_status === "luxury"
                            ? "bg-[#FFEEC9]"
                            : "bg-white"
                        } col-span-1 h-[40vw] md:h-[17.4vw] w-full rounded-[0.5vw]`}
                        style={{
                          boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
                        }}
                      >
                        <div className="grid grid-rows-10 h-[45vw] md:h-[20vw] w-full gap-[2vw]">
                          <div
                            className="row-span-4 h-[40vw] md:h-[17.4vw] w-full rounded-[1.5vw] px-[2vw] md:px-[0vw]  md:rounded-[0.5vw] pb-[2vw]"
                            style={{
                              boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
                            }}
                          >
                            <h1
                              className="md:text-[1.5vw] text-[4vw] font-semibold bg-gradient-to-r px-[1vw] py-[0.5vw] "
                              style={{
                                color:
                                  busdetails1.bus_type_status === "luxury"
                                    ? "#393939"
                                    : colorcode.theme,
                              }}
                            >
                              Fare Details
                            </h1>
                            <div className="px-[1vw] flex justify-between">
                              <p className="md:text-[1vw] text-[3.5vw]">
                                Base Fare
                              </p>
                              <p className="md:text-[1vw] text-[3.5vw]">
                                ₹ {discount1}
                              </p>
                            </div>
                            <div className="px-[1vw] flex justify-between">
                              <p className="md:text-[1vw] text-[3.5vw]">
                                GST 3%
                              </p>
                              <p className="md:text-[1vw] text-[3.5vw]">
                                + ₹ {Math.round(discount1 * 0.03)}
                              </p>
                            </div>
                            <button
                              className="w-full md:h-[2.5vw] h-[8vw] rounded-[1.5vw] md:rounded-[0vw] md:rounded-b-[0.5vw] mt-[12vw] md:mt-[8.7vw] flex 
                                          items-center justify-between px-[3vw] md:px-[1vw]"
                              style={{
                                backgroundColor:
                                  busdetails1.bus_type_status === "luxury"
                                    ? "#393939"
                                    : colorcode.theme,
                              }}
                              onClick={() => {
                                //setProceed(true);
                                handleBookingPrice();
                              }}
                            >
                              <span className="text-white text-[3.5vw] md:text-[1.1vw] font-semibold">
                                Proceed to Pay{" "}
                                {`₹ ${
                                  Number(discount1) +
                                  Number(Math.round(discount1 * 0.03))
                                }`}
                              </span>
                              <span className="pl-[0.5vw]">
                                <RiArrowRightDoubleLine
                                  // size={"1.7vw"}
                                  color="white"
                                  className="md:text-[1.7vw] text-[3.5vw]"
                                />
                              </span>
                            </button>
                          </div>
                          <div className="h-[2vw] w-full">
                            <div className=""></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              ) : (
                <>
                  <div
                    className={` md:block hidden p-[2vw] ${
                      busdetails1.bus_type_status === "luxury"
                        ? "bg-[#FFEEC9]"
                        : "bg-white"
                    }`}
                    ref={componentRef}
                  >
                    <div
                      className="h-[54vw] w-full rounded-[1vw]"
                      style={{ boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)" }}
                    >
                      <div
                        className="h-[3vw] w-full rounded-t-[0.5vw] flex justify-between items-center px-[1vw]"
                        style={{
                          backgroundColor:
                            busdetails1.bus_type_status === "luxury"
                              ? "#393939"
                              : colorcode.theme,
                        }}
                      >
                        <label className="text-white text-[1.1vw] font-semibold">
                          {`Booking Id : ${ticketDetail?.Booking_Id}`}
                        </label>
                        <label className="text-white text-[1.1vw] font-semibold">
                          {`Bus Partner Id : ${generateRandomId("CHEN", 12)}`}
                        </label>
                      </div>
                      <div className="px-[1vw] py-[1vw]">
                        <div className="grid grid-cols-6 w-full h-[18vw] relative">
                          <div className="col-span-2 w-[100%] h-full flex">
                            <div className="w-[80%] h-full items-center justify-center flex flex-col">
                              <div className="h-[60%] flex justify-center items-center">
                                {busdetails1?.logos != null && (
                                  <img
                                    src={`${apiUrlimage}${busdetails1.logos}`}
                                    // src={orange_travel_logo}
                                    alt="logos"
                                    className={`w-[6vw] h-[6vw] rounded-full bg-white  ${
                                      busdetails1?.bus_type_status === "luxury"
                                        ? "shadow-lg shadow-[rgba(255, 238, 201, 0.9)]"
                                        : "shadow-lg shadow-[rgba(238, 237, 237, 0.7)]"
                                    }`}
                                  />
                                )}
                              </div>
                              <div className="flex flex-col h-[40%] items-center ">
                                <p
                                  className="text-[1vw] font-bold"
                                  style={{
                                    color:
                                      busdetails1.bus_type_status === "luxury"
                                        ? "#393939"
                                        : colorcode.theme,
                                  }}
                                >
                                  {busdetails1?.operator_name?.length > 23 ? (
                                    <Tooltip
                                      placement="top"
                                      title={busdetails1?.operator_name}
                                      className="cursor-pointer"
                                      color={
                                        busdetails1.bus_type_status === "luxury"
                                          ? "#393939"
                                          : colorcode.theme
                                      }
                                    >
                                      {`${busdetails1?.operator_name?.slice(
                                        0,
                                        22
                                      )}...`}
                                    </Tooltip>
                                  ) : (
                                    `${busdetails1?.operator_name?.slice(
                                      0,
                                      22
                                    )}`
                                  )}
                                </p>
                                <p
                                  className={`${
                                    busdetails1.bus_type_status === "luxury"
                                      ? "text-[#393939]"
                                      : "text-[#1F487C]"
                                  } text-[1vw]`}
                                  // style={{ color: colorcode.theme }}
                                >
                                  {busdetails1?.bus_type?.length > 25 ? (
                                    <Tooltip
                                      placement="top"
                                      title={busdetails1?.bus_type}
                                      className="cursor-pointer"
                                      color={
                                        busdetails1.bus_type_status === "luxury"
                                          ? "#393939"
                                          : colorcode.theme
                                      }
                                    >
                                      {`${busdetails1?.bus_type?.slice(
                                        0,
                                        24
                                      )}...`}
                                    </Tooltip>
                                  ) : (
                                    `${busdetails1?.bus_type?.slice(0, 24)}`
                                  )}
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="col-span-4">
                            <div className="grid grid-rows-7 w-full h-full">
                              <div className="row-span-3">
                                <div className="grid grid-cols-4">
                                  <div className="col-span-1 ">
                                    <div className="flex flex-col pl-[1vw] text-left">
                                      <p
                                        className={`${
                                          busdetails1.bus_type_status ===
                                          "luxury"
                                            ? "text-[#393939]"
                                            : "text-[#1F487C]"
                                        } text-[0.8vw] pt-[0.5vw]`}
                                        // style={{ color: colorcode.theme }}
                                      >
                                        {/* {dayjs(bus[busIndex]?.Bus_depature_date).format(
                                "DD MMM"
                              )} */}
                                        {dayjs(
                                          ticketDetail?.departure_date
                                        ).format("DD MMM")}
                                      </p>
                                      <p
                                        className={`${
                                          busdetails1.bus_type_status ===
                                          "luxury"
                                            ? "text-[#393939]"
                                            : "text-[#1F487C]"
                                        } text-[1.2vw] font-bold`}
                                        // style={{ color: colorcode.theme }}
                                      >
                                        {/* {item.bus_depature} */}
                                        {/* {bus[busIndex]?.Bus_Depature_time} */}
                                        {ticketDetail?.departure_time}
                                      </p>
                                      <p
                                        className={`${
                                          busdetails1.bus_type_status ===
                                          "luxury"
                                            ? "text-[#393939]"
                                            : "text-[#1F487C]"
                                        } text-[0.9vw]`}
                                        // style={{ color: colorcode.theme }}
                                      >
                                        {/* {bus[busIndex]?.Bus_Depature_place} */}
                                        {ticketDetail?.arrival_name}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="col-span-2 flex-col mt-[0.5vw] items-center w-full justify-center">
                                    <div className="col-span-2 h-full relative w-full flex items-center justify-center">
                                      {/* <div
                                        className={`${
                                          busdetails1.bus_type_status ==="luxury"
                                            ? "bg-[#393939]"
                                            : "bg-[#1F487C]"
                                        } absolute left-0 h-[0.5vw] w-[0.5vw] rounded-full`}
                                      ></div> */}
                                      <div className="absolute md:left-0 left-[-1.2vw] md:top-[1.2vw] w-[33vw] md:w-[18.5vw]">
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
                                              busdetails1.bus_type_status ===
                                              "luxury"
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
                                              busdetails1.bus_type_status ===
                                              "luxury"
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
                                              busdetails1.bus_type_status ===
                                              "luxury"
                                                ? "#393939"
                                                : "#1F4B7F"
                                            }
                                          />
                                          <path
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M280.078 6.24612C280.553 5.805 281.321 5.805 281.796 6.24612L289.082 13.0235C289.557 13.4646 289.557 14.1798 289.082 14.621L281.796 21.3983C281.321 21.8395 280.553 21.8395 280.078 21.3983C279.604 20.9572 279.604 20.242 280.078 19.8009L286.506 13.8222L280.078 7.84357C279.604 7.40245 279.604 6.68725 280.078 6.24612Z"
                                            fill={
                                              busdetails1.bus_type_status ===
                                              "luxury"
                                                ? "#393939"
                                                : "#1F4B7F"
                                            }
                                            stroke={
                                              busdetails1.bus_type_status ===
                                              "luxury"
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
                                           text-white text-[3.5vw] md:text-[1vw] font-bold justify-center items-center left-[-1vw] md:left-[0vw]"
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
                                              busdetails1.bus_type_status ===
                                              "luxury"
                                                ? "#393939"
                                                : "#1F4B7F"
                                            }
                                          />
                                        </svg>
                                        <div className="absolute pb-[3vw] md:pb-[0.8vw]">
                                          {busdetails1?.time_duration}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-span-1">
                                    <div className="flex flex-col text-right pr-[1vw]">
                                      <p
                                        className={`${
                                          busdetails1.bus_type_status ===
                                          "luxury"
                                            ? "text-[#393939]"
                                            : "text-[#1F487C]"
                                        } pt-[0.5vw] text-[0.8vw]`}
                                        // style={{ color: colorcode.theme }}
                                      >
                                        {dayjs(
                                          ticketDetail?.arrival_date
                                        ).format("DD MMM")}
                                      </p>
                                      <p
                                        className={`${
                                          busdetails1.bus_type_status ===
                                          "luxury"
                                            ? "text-[#393939]"
                                            : "text-[#1F487C]"
                                        } text-[1.2vw] font-bold`}
                                        // style={{ color: colorcode.theme }}
                                      >
                                        {ticketDetail?.arrival_time}
                                      </p>
                                      <p
                                        className={`${
                                          busdetails1.bus_type_status ===
                                          "luxury"
                                            ? "text-[#393939]"
                                            : "text-[#1F487C]"
                                        } text-[0.9vw]`}
                                        // style={{ color: colorcode.theme }}
                                      >
                                        {/* {bus[busIndex]?.Bus_Arrival_place} */}
                                        {ticketDetail?.departure_name}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="row-span-2 flex justify-between px-[1vw]  ">
                                <div className="flex flex-col  ">
                                  <p className="text-[1vw] ">
                                    Boarding Point & Time
                                  </p>
                                  <p
                                    className={`${
                                      busdetails1.bus_type_status === "luxury"
                                        ? "text-[#393939]"
                                        : "text-[#1F487C]"
                                    }  font-bold text-[1.2vw]`}
                                    // style={{ color: colorcode.theme }}
                                  >
                                    {/* {`${selectedRoutes1?.dep_route} : ${dayjs(
                                  selectedRoutes1?.dep_time
                                ).format("DD MMM, HH:mm")}`} */}
                                    {`${ticketDetail?.Pickup_Point_and_Time}`}
                                  </p>
                                </div>
                                <div className="flex flex-col  items-center">
                                  <p className="text-[1vw] ">Seat Number(s)</p>
                                  <div className="text-[1.1vw] font-semibold">
                                    <div
                                      className={`flex flex-row flex-wrap ${
                                        busdetails1.bus_type_status === "luxury"
                                          ? "text-[#393939]"
                                          : "text-[#1F487C]"
                                      }`}
                                    >
                                      {selectedSeats1?.length > 0 ? (
                                        selectedSeats1.map((seat, index) => (
                                          <p
                                            key={index}
                                            className="md:text-[1.1vw] text-[2.8vw] mr-[0.4vw]"
                                          >
                                            {seat}
                                            {index <
                                              selectedSeats1.length - 1 && ","}
                                          </p>
                                        ))
                                      ) : (
                                        <p
                                          className={`text-[1vw] mr-[0.4vw] ${
                                            busdetails1.bus_type_status ===
                                            "luxury"
                                              ? "text-[#393939]"
                                              : "text-[#1F487C]"
                                          }`}
                                        >
                                          No Seat Selected
                                        </p>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="row-span-2 flex px-[1vw] justify-between ">
                                <div className="flex flex-col  ">
                                  <p className="text-[1vw] ">
                                    Dropping Point & Time
                                  </p>
                                  <p
                                    className={`${
                                      busdetails1.bus_type_status === "luxury"
                                        ? "text-[#393939]"
                                        : "text-[#1F487C]"
                                    }  font-bold text-[1.1vw]`}
                                    // style={{ color: colorcode.theme }}
                                  >
                                    {selectedRoutes1?.arri_route?.length >
                                    25 ? (
                                      <Tooltip
                                        placement="top"
                                        title={selectedRoutes1?.arri_route}
                                        className="cursor-pointer"
                                        color={
                                          busdetails1.bus_type_status ===
                                          "luxury"
                                            ? "#393939"
                                            : colorcode.theme
                                        }
                                      >
                                        {`${selectedRoutes1?.arri_route?.slice(
                                          0,
                                          20
                                        )}... (${ticketDetail?.Droppimg_Time})`}
                                      </Tooltip>
                                    ) : (
                                      `${selectedRoutes1?.arri_route?.slice(
                                        0,
                                        20
                                      )} (${ticketDetail?.Droppimg_Time})`
                                    )}
                                  </p>
                                </div>
                                <div className="relative">
                                  <svg
                                    className="md:w-[10vw] md:h-[4vw] w-[30vw] h-[10vw]"
                                    viewBox="0 0 191 65"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M63.8027 21.9522V46.3763C63.8027 49.4454 66.3049 51.9629 69.3893 51.9629H104.074C107.159 51.9629 109.661 49.4446 109.661 46.3763V21.9522C109.661 18.883 107.159 16.3656 104.074 16.3656H69.3893C66.3049 16.3656 63.8027 18.8839 63.8027 21.9522Z"
                                      fill={
                                        busdetails1.bus_type_status === "luxury"
                                          ? "#393939"
                                          : "#1F4B7F"
                                      }
                                    />
                                    <path
                                      d="M15.9289 2.65835C12.1005 0.255909 8.38323 -0.150284 5.5036 1.50614C-0.254637 4.80155 -0.571095 15.0933 4.76045 24.9138C5.82014 26.8619 7.05462 28.648 8.39942 30.2544C6.51724 33.8422 6.97543 38.339 9.87036 41.4234L28.4267 61.1303C30.1672 62.9812 32.6192 64.0527 35.1345 64.0527H181.215C186.356 64.0527 190.533 59.7672 190.533 54.4913L190.532 15.0765C190.532 9.8006 186.355 5.51503 181.214 5.51503L35.1337 5.51503C32.6184 5.51503 30.1816 6.58665 28.4258 8.43743L24.7869 12.3011C22.3833 8.14502 19.2666 4.73605 15.9289 2.65835ZM35.1337 8.71347L181.214 8.71347C184.631 8.71347 187.431 11.5704 187.431 15.0933V54.491C187.431 57.9974 184.647 60.8709 181.214 60.8709L35.1337 60.8709C33.4571 60.8709 31.8275 60.1565 30.6724 58.9229L12.1161 39.1993C10.9455 37.9657 10.3602 36.3584 10.3602 34.7675C10.3602 33.1766 10.9455 31.5858 12.1161 30.3356L23.9969 17.7063C25.2784 20.7907 27.3527 23.6617 27.0355 26.7161V26.8133C27.0355 27.2519 27.0039 27.6897 26.9723 28.0959C26.4502 27.9663 25.9126 27.8683 25.3427 27.8683C21.6408 27.8683 18.6196 30.9527 18.6196 34.7515C18.6196 38.5662 21.6408 41.6505 25.3427 41.6505C29.0602 41.6505 32.0659 38.566 32.0659 34.7515C32.0659 32.7545 31.2118 30.9527 29.8826 29.7033C30.0404 28.7946 30.136 27.8525 30.136 26.8299V26.716C29.8826 22.046 28.0939 19.1183 26.3065 15.2389L30.6408 10.645C31.8276 9.42716 33.4571 8.71347 35.1337 8.71347ZM22.5412 14.6714L10.344 27.6255C9.29964 26.3105 8.33468 24.8983 7.48069 23.3565C3.13026 15.3691 2.92467 6.63597 7.02169 4.29839C8.88849 3.22677 11.483 3.6164 14.3148 5.38581C17.4161 7.33383 20.3264 10.6291 22.5412 14.6714Z"
                                      fill={
                                        busdetails1.bus_type_status === "luxury"
                                          ? "#393939"
                                          : "#1F4B7F"
                                      }
                                    />
                                    <path
                                      fill-rule="evenodd"
                                      clip-rule="evenodd"
                                      d="M32.2528 54.6614C34.0086 54.6614 35.4319 55.8294 35.4319 57.2702C35.4319 58.711 34.0086 59.879 32.2528 59.879C32.2365 59.879 32.2202 59.8789 32.2039 59.8787L32.2528 62.4375L184.608 62.4375L187.301 59.8787C187.284 59.8789 187.269 59.879 187.252 59.879C185.496 59.879 184.073 58.711 184.073 57.2702C184.073 55.8294 185.496 54.6614 187.252 54.6614C187.269 54.6614 187.284 54.6615 187.301 54.6617V50.4067C187.284 50.4069 187.269 50.407 187.252 50.407C185.496 50.407 184.073 49.239 184.073 47.7982C184.073 46.3574 185.496 45.1894 187.252 45.1894H187.26L187.275 45.1895L187.284 45.1895L187.301 45.1897V41.5772C182.493 41.5772 178.595 38.3786 178.595 34.433C178.595 30.4875 182.493 27.2889 187.301 27.2889V23.7566C187.284 23.7569 187.269 23.757 187.252 23.757C185.496 23.757 184.073 22.5889 184.073 21.1481C184.073 19.7073 185.496 18.5393 187.252 18.5393C187.269 18.5393 187.284 18.5394 187.301 18.5396V14.2846C187.292 14.2847 187.284 14.2848 187.275 14.2849C187.268 14.2849 187.26 14.2849 187.252 14.2849C185.496 14.2849 184.073 13.1169 184.073 11.6761C184.073 10.2353 185.496 9.0673 187.252 9.0673C187.269 9.0673 187.284 9.06738 187.301 9.06762L185.147 6.42857L32.2039 6.96711L32.2039 9.06762C32.1876 9.06762 32.2202 9.06738 32.2039 9.06762C33.9597 9.06762 35.4319 10.2353 35.4319 11.6761C35.4319 13.1169 34.0086 14.2849 32.2528 14.2849C32.2365 14.2849 32.2202 14.2849 32.2039 14.2846V18.5396C32.2202 18.5394 32.2365 18.5393 32.2528 18.5393C34.0086 18.5393 35.4319 19.7073 35.4319 21.1481C35.4319 22.5889 34.0086 23.757 32.2528 23.757C32.2365 23.757 32.2202 23.7569 32.2039 23.7566V27.2889C37.0119 27.2889 41.9793 30.4875 41.9793 34.433C41.9793 38.3786 37.0119 41.5772 32.2039 41.5772V45.1897C32.2202 45.1895 32.2365 45.1894 32.2528 45.1894C34.0086 45.1894 35.4319 46.3574 35.4319 47.7982C35.4319 49.239 34.0086 50.407 32.2528 50.407C32.2365 50.407 32.2202 50.4069 32.2039 50.4067V54.6617C32.2202 54.6615 32.2365 54.6614 32.2528 54.6614Z"
                                      fill={
                                        busdetails1.bus_type_status === "luxury"
                                          ? "#393939"
                                          : "#1F4B7F"
                                      }
                                    />
                                  </svg>
                                  <p className="text-[1.5vw] font-bold text-white absolute left-[2.8vw] top-[0.8vw]">
                                    {`₹ ${
                                      Number(discount1) +
                                      Number(Math.round(discount1 * 0.03))
                                    }`}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                          <span className="absolute md:block hidden left-[15.2vw]">
                            <div className="h-full py-[0.5vw]">
                              <svg
                                className="md:h-[15.3vw] md:w-[4.2vw]"
                                viewBox="0 0 58 233"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <rect
                                  x="24.7695"
                                  y="110.186"
                                  width="7.77032"
                                  height="7.77032"
                                  rx="3.88516"
                                  stroke={
                                    busdetails1.bus_type_status === "luxury"
                                      ? "#393939"
                                      : "#1F4B7F"
                                  }
                                  stroke-width="2.30622"
                                />
                                <mask
                                  id="path-2-inside-1_6794_2554"
                                  fill="white"
                                >
                                  {" "}
                                  <path d="M28.0771 117.016H29.2303V203.374H28.0771V117.016Z" />{" "}
                                </mask>
                                <path
                                  d="M29.8068 203.374V201.647H28.6537V203.374H29.8068ZM29.8068 199.344V195.89H28.6537V199.344H29.8068ZM29.8068 193.587V190.133H28.6537V193.587H29.8068ZM29.8068 187.83V184.375H28.6537V187.83H29.8068ZM29.8068 182.072V178.618H28.6537V182.072H29.8068ZM29.8068 176.315V172.861H28.6537V176.315H29.8068ZM29.8068 170.558V167.104H28.6537V170.558H29.8068ZM29.8068 164.801V161.346H28.6537V164.801H29.8068ZM29.8068 159.043V155.589H28.6537V159.043H29.8068ZM29.8068 153.286V149.832H28.6537V153.286H29.8068ZM29.8068 147.529V144.075H28.6537V147.529H29.8068ZM29.8068 141.772V138.317H28.6537V141.772H29.8068ZM29.8068 136.014V132.56H28.6537V136.014H29.8068ZM29.8068 130.257V126.803H28.6537V130.257H29.8068ZM29.8068 124.5V121.046H28.6537V124.5H29.8068ZM29.8068 118.743V117.016H28.6537V118.743H29.8068ZM30.3834 203.374V201.647H28.0771V203.374H30.3834ZM30.3834 199.344V195.89H28.0771V199.344H30.3834ZM30.3834 193.587V190.133H28.0771V193.587H30.3834ZM30.3834 187.83V184.375H28.0771V187.83H30.3834ZM30.3834 182.072V178.618H28.0771V182.072H30.3834ZM30.3834 176.315V172.861H28.0771V176.315H30.3834ZM30.3834 170.558V167.104H28.0771V170.558H30.3834ZM30.3834 164.801V161.346H28.0771V164.801H30.3834ZM30.3834 159.043V155.589H28.0771V159.043H30.3834ZM30.3834 153.286V149.832H28.0771V153.286H30.3834ZM30.3834 147.529V144.075H28.0771V147.529H30.3834ZM30.3834 141.772V138.317H28.0771V141.772H30.3834ZM30.3834 136.014V132.56H28.0771V136.014H30.3834ZM30.3834 130.257V126.803H28.0771V130.257H30.3834ZM30.3834 124.5V121.046H28.0771V124.5H30.3834ZM30.3834 118.743V117.016H28.0771V118.743H30.3834Z"
                                  fill={
                                    busdetails1.bus_type_status === "luxury"
                                      ? "#393939"
                                      : "#1F4B7F"
                                  }
                                  mask="url(#path-2-inside-1_6794_2554)"
                                />
                                <line
                                  x1="11.3012"
                                  y1="232.748"
                                  x2="45.4302"
                                  y2="232.748"
                                  stroke={
                                    busdetails1.bus_type_status === "luxury"
                                      ? "#393939"
                                      : "#1F4B7F"
                                  }
                                  stroke-width="0.2"
                                />
                                <path
                                  d="M41.7225 208.675V207.454H43.0084C43.1814 207.454 43.3228 207.31 43.3228 207.133C43.3228 205.061 41.6721 202.374 39.644 202.374H16.8165C14.7884 202.374 13.1376 205.061 13.1376 207.133C13.1376 207.31 13.276 207.454 13.452 207.454H14.7349V208.672C13.8294 208.826 13.1376 209.632 13.1376 210.599V221.927C13.1376 222.897 13.8294 223.7 14.7349 223.855V232.378C14.7349 232.554 14.8765 232.699 15.0493 232.699C15.2254 232.699 15.3638 232.554 15.3638 232.378V223.855C16.2693 223.7 16.9642 222.897 16.9642 221.927V219.919H18.6873V220.353C18.6873 221.516 19.6117 222.46 20.7499 222.46H35.7105C36.8456 222.46 37.77 221.516 37.77 220.353V219.919H39.4962V221.927C39.4962 222.897 40.1817 223.7 41.0935 223.855V232.378C41.0935 232.554 41.2351 232.699 41.4079 232.699C41.584 232.699 41.7223 232.554 41.7223 232.378V223.855C42.6279 223.7 43.3228 222.897 43.3228 221.927V219.379C43.3228 219.203 43.1813 219.058 43.0084 219.058C42.8354 219.058 42.694 219.203 42.694 219.379V221.927C42.694 222.65 42.1186 223.238 41.4111 223.241H41.408C41.059 223.241 40.7383 223.096 40.5056 222.859C40.2729 222.624 40.1251 222.296 40.1251 221.927V210.599C40.1251 209.876 40.7005 209.288 41.408 209.288C41.7507 209.288 42.0746 209.427 42.3167 209.674C42.5619 209.921 42.694 210.249 42.694 210.599V219.773C42.694 219.95 42.8356 220.094 43.0084 220.094C43.1814 220.094 43.3228 219.95 43.3228 219.773V210.599C43.3228 210.079 43.1247 209.587 42.7632 209.218C42.4771 208.925 42.1155 208.739 41.7225 208.675ZM16.3354 221.927C16.3354 222.653 15.76 223.241 15.0494 223.241C14.3419 223.241 13.7665 222.653 13.7665 221.927V210.599C13.7665 209.876 14.3419 209.288 15.0494 209.288C15.76 209.288 16.3354 209.876 16.3354 210.599V221.927ZM18.6873 219.277H16.9643V213.25H18.6873V219.277ZM33.3083 219.334H23.1491C22.9762 219.334 22.8347 219.193 22.8347 219.013C22.8347 218.836 22.9762 218.692 23.1491 218.692H33.3083C33.4844 218.692 33.6227 218.836 33.6227 219.013C33.6228 219.193 33.4844 219.334 33.3083 219.334ZM33.3083 216.584H23.1491C22.9762 216.584 22.8347 216.443 22.8347 216.263C22.8347 216.086 22.9762 215.942 23.1491 215.942H33.3083C33.4844 215.942 33.6227 216.087 33.6227 216.263C33.6228 216.443 33.4844 216.584 33.3083 216.584ZM33.3083 213.834H23.1491C22.9762 213.834 22.8347 213.69 22.8347 213.513C22.8347 213.336 22.9762 213.192 23.1491 213.192H33.3083C33.4844 213.192 33.6227 213.336 33.6227 213.513C33.6228 213.69 33.4844 213.834 33.3083 213.834ZM39.4963 219.277H37.7732V213.25H39.4963V219.277ZM41.0936 208.675C40.188 208.829 39.4963 209.632 39.4963 210.599V212.607H37.7701V212.173C37.7701 211.014 36.8457 210.069 35.7106 210.069H20.75C19.6117 210.069 18.6873 211.014 18.6873 212.173V212.607H16.9643V210.599C16.9643 209.632 16.2694 208.826 15.3638 208.672V207.454H41.0936V208.675Z"
                                  fill={
                                    busdetails1.bus_type_status === "luxury"
                                      ? "#393939"
                                      : "#1F4B7F"
                                  }
                                />
                                <path
                                  d="M16.1612 221.961V210.605C16.1612 210.245 15.9867 209.906 15.6933 209.697C15.3059 209.42 14.7849 209.42 14.3975 209.696C14.1036 209.906 13.9296 210.245 13.9307 210.606L13.9633 221.963C13.9643 222.302 14.1223 222.622 14.3908 222.83C14.7864 223.136 15.3391 223.136 15.7346 222.83C16.0037 222.622 16.1612 222.301 16.1612 221.961Z"
                                  fill={
                                    busdetails1.bus_type_status === "luxury"
                                      ? "#393939"
                                      : "#1F4B7F"
                                  }
                                  stroke={
                                    busdetails1.bus_type_status === "luxury"
                                      ? "#393939"
                                      : "#1F4B7F"
                                  }
                                  stroke-width="0.2"
                                />
                                <path
                                  d="M42.5103 221.975V210.591C42.5103 210.239 42.3415 209.908 42.0569 209.702C41.6728 209.423 41.1524 209.423 40.7683 209.701C40.4833 209.908 40.315 210.24 40.316 210.592L40.3481 221.977C40.3491 222.308 40.5018 222.62 40.762 222.825C41.1537 223.132 41.7057 223.133 42.0974 222.825C42.3581 222.62 42.5103 222.307 42.5103 221.975Z"
                                  fill={
                                    busdetails1.bus_type_status === "luxury"
                                      ? "#393939"
                                      : "#1F4B7F"
                                  }
                                  stroke={
                                    busdetails1.bus_type_status === "luxury"
                                      ? "#393939"
                                      : "#1F4B7F"
                                  }
                                  stroke-width="0.2"
                                />
                                <path
                                  d="M36.5847 224.381H19.8759C18.7252 224.381 17.7881 225.336 17.7881 226.511C17.7881 227.687 18.7252 228.645 19.8759 228.645H20.2218V232.378C20.2218 232.554 20.3634 232.699 20.5362 232.699H22.4637C22.6366 232.699 22.7781 232.554 22.7781 232.378V228.645H33.6825V232.378C33.6825 232.554 33.8241 232.699 33.997 232.699H35.9213C36.0942 232.699 36.2357 232.554 36.2357 232.378V228.645H36.5847C37.7356 228.645 38.6694 227.687 38.6694 226.511C38.6694 225.336 37.7356 224.381 36.5847 224.381ZM22.1493 232.056V228.756V228.645V232.056ZM36.5847 226.511C35.7829 226.511 19.8759 226.511 19.8759 226.511C19.071 226.511 19.8759 226.511 18.417 226.511C18.417 225.692 19.071 225.024 19.8759 225.024H36.5847C37.3865 225.024 38.0405 225.692 38.0405 226.511C36.7628 226.511 37.3865 226.511 36.5847 226.511Z"
                                  fill={
                                    busdetails1.bus_type_status === "luxury"
                                      ? "#393939"
                                      : "#1F4B7F"
                                  }
                                />
                                <mask
                                  id="path-9-inside-2_6794_2554"
                                  fill="white"
                                >
                                  {" "}
                                  <path d="M28.01 26.7649H29.1631V108.636H28.01V26.7649Z" />
                                </mask>
                                <path
                                  d="M29.7396 108.636V106.881H28.5865V108.636H29.7396ZM29.7396 104.542V101.033H28.5865V104.542H29.7396ZM29.7396 98.6942V95.1855H28.5865V98.6942H29.7396ZM29.7396 92.8463V89.3376H28.5865V92.8463H29.7396ZM29.7396 86.9984V83.4897H28.5865V86.9984H29.7396ZM29.7396 81.1505V77.6417H28.5865V81.1505H29.7396ZM29.7396 75.3026V71.7938H28.5865V75.3026H29.7396ZM29.7396 69.4547V65.9459H28.5865V69.4547H29.7396ZM29.7396 63.6068V60.098H28.5865V63.6068H29.7396ZM29.7396 57.7588V54.2501H28.5865V57.7588H29.7396ZM29.7396 51.9109V48.4022H28.5865V51.9109H29.7396ZM29.7396 46.063V42.5543H28.5865V46.063H29.7396ZM29.7396 40.2151V36.7064H28.5865V40.2151H29.7396ZM29.7396 34.3672V30.8584H28.5865V34.3672H29.7396ZM29.7396 28.5193V26.7649H28.5865V28.5193H29.7396ZM30.3162 108.636V106.881H28.01V108.636H30.3162ZM30.3162 104.542V101.033H28.01V104.542H30.3162ZM30.3162 98.6942V95.1855H28.01V98.6942H30.3162ZM30.3162 92.8463V89.3376H28.01V92.8463H30.3162ZM30.3162 86.9984V83.4897H28.01V86.9984H30.3162ZM30.3162 81.1505V77.6417H28.01V81.1505H30.3162ZM30.3162 75.3026V71.7938H28.01V75.3026H30.3162ZM30.3162 69.4547V65.9459H28.01V69.4547H30.3162ZM30.3162 63.6068V60.098H28.01V63.6068H30.3162ZM30.3162 57.7588V54.2501H28.01V57.7588H30.3162ZM30.3162 51.9109V48.4022H28.01V51.9109H30.3162ZM30.3162 46.063V42.5543H28.01V46.063H30.3162ZM30.3162 40.2151V36.7064H28.01V40.2151H30.3162ZM30.3162 34.3672V30.8584H28.01V34.3672H30.3162ZM30.3162 28.5193V26.7649H28.01V28.5193H30.3162Z"
                                  fill={
                                    busdetails1.bus_type_status === "luxury"
                                      ? "#393939"
                                      : "#1F4B7F"
                                  }
                                  mask="url(#path-9-inside-2_6794_2554)"
                                />
                                <g clip-path="url(#clip0_6794_2554)">
                                  <path
                                    d="M14.4654 3.70703C13.98 3.70703 13.5865 4.10055 13.5865 4.58594V11.5586C13.5865 12.044 13.98 12.4375 14.4654 12.4375C14.9508 12.4375 16.945 11.6491 16.945 11.1637L15.3443 5.46484H28.5865V3.70703H14.4654Z"
                                    fill={
                                      busdetails1.bus_type_status === "luxury"
                                        ? "#393939"
                                        : "#1F4B7F"
                                    }
                                  />
                                  <path
                                    d="M42.7076 3.70703H28.5865V5.46484H41.8287L40.2712 11.0776C40.2712 11.563 42.2222 12.4961 42.7076 12.4961C43.193 12.4961 43.5865 12.1026 43.5865 11.6172V4.58594C43.5865 4.10055 43.193 3.70703 42.7076 3.70703Z"
                                    fill={
                                      busdetails1.bus_type_status === "luxury"
                                        ? "#393939"
                                        : "#1F4B7F"
                                    }
                                  />
                                  <path
                                    d="M24.192 26.3241V29.2538C24.192 29.739 23.7982 30.1327 23.313 30.1327H19.7974C19.3123 30.1327 18.9185 29.739 18.9185 29.2538V26.0259C19.2578 26.2157 19.6486 26.3241 20.0646 26.3241H24.192Z"
                                    fill={
                                      busdetails1.bus_type_status === "luxury"
                                        ? "#393939"
                                        : "#1F4B7F"
                                    }
                                  />
                                  <path
                                    d="M38.2545 26.0259V29.2538C38.2545 29.739 37.8607 30.1327 37.3755 30.1327H33.8599C33.3748 30.1327 32.981 29.739 32.981 29.2538V26.3241H37.1084C37.5244 26.3241 37.9152 26.2157 38.2545 26.0259Z"
                                    fill={
                                      busdetails1.bus_type_status === "luxury"
                                        ? "#393939"
                                        : "#1F4B7F"
                                    }
                                  />
                                  <path
                                    d="M40.0123 2.76953V3.70703L38.8404 11.198C40.368 20.8654 40.0205 17.0927 39.8775 21.3438L39.3091 22.2227L39.7914 23.1016L39.7416 24.11C39.6724 25.5156 38.5158 26.6172 37.1084 26.6172H20.0646C18.6572 26.6172 17.5005 25.5156 17.4314 24.11L17.3793 23.043L17.8052 22.1641L17.2925 21.2852C17.2105 19.5058 17.1607 18.8219 17.1607 18.4141L18.3326 11.198L17.1607 3.70703V2.76953C17.1607 1.31582 18.3437 0.132812 19.7974 0.132812H37.3755C38.8293 0.132812 40.0123 1.31582 40.0123 2.76953Z"
                                    fill={
                                      busdetails1.bus_type_status === "luxury"
                                        ? "#393939"
                                        : "#1F4B7F"
                                    }
                                  />
                                  <path
                                    d="M39.8775 21.3438L39.3091 22.2227L39.7914 23.1016L39.7416 24.11C39.6724 25.5156 38.5158 26.6172 37.1084 26.6172H28.5865V0.132812H37.3756C38.8293 0.132812 40.0123 1.31582 40.0123 2.76953V3.70703L38.8404 11.1982C39.6449 16.2883 39.9291 17.6523 39.9976 18.4234C40.0586 19.1172 39.9455 19.3311 39.8775 21.3438Z"
                                    fill={
                                      busdetails1.bus_type_status === "luxury"
                                        ? "#393939"
                                        : "#1F4B7F"
                                    }
                                  />
                                  <path
                                    d="M40.0123 3.70703V18.4205C32.463 19.8572 24.7105 19.8572 17.1607 18.4205V3.70703H40.0123Z"
                                    fill={
                                      busdetails1.bus_type_status === "luxury"
                                        ? "#393939"
                                        : "#1F4B7F"
                                    }
                                  />
                                  <path
                                    d="M40.0123 3.70703V18.4205C40.0076 18.4217 40.0023 18.4223 39.9976 18.4234C36.2277 19.14 32.4074 19.498 28.5865 19.498V3.70703H40.0123Z"
                                    fill={
                                      busdetails1.bus_type_status === "luxury"
                                        ? "#393939"
                                        : "#1F4B7F"
                                    }
                                  />
                                  <path
                                    d="M22.4341 22.1641C22.4341 22.6492 22.0404 23.043 21.5552 23.043H17.3793L17.2925 21.2852H21.5552C22.0404 21.2852 22.4341 21.6789 22.4341 22.1641Z"
                                    fill="#FFF81E"
                                  />
                                  <path
                                    d="M39.8775 21.3438L39.7914 23.1016H35.6177C35.1326 23.1016 34.7388 22.7078 34.7388 22.2227C34.7388 21.7375 35.1326 21.3438 35.6177 21.3438H39.8775Z"
                                    fill="#FFF81E"
                                  />
                                  <path
                                    d="M32.0435 21.2852H25.0709C24.5855 21.2852 24.192 21.6787 24.192 22.1641V23.8963C24.192 24.3805 24.5835 24.7735 25.0676 24.7752L32.0403 24.8008H32.0435C32.276 24.8008 32.4991 24.7087 32.6639 24.5445C32.8294 24.3796 32.9224 24.1555 32.9224 23.9219V22.1641C32.9224 21.6787 32.5289 21.2852 32.0435 21.2852Z"
                                    fill="#596C76"
                                  />
                                  <path
                                    d="M32.9224 22.1641V23.9219C32.9224 24.1557 32.8293 24.3795 32.664 24.5447C32.4994 24.7088 32.2761 24.8008 32.0435 24.8008H32.0406L28.5865 24.7879V21.2852H32.0435C32.5287 21.2852 32.9224 21.6789 32.9224 22.1641Z"
                                    fill="#465A61"
                                  />
                                </g>
                                <defs>
                                  {" "}
                                  <clipPath id="clip0_6794_2554">
                                    <rect
                                      width="30"
                                      height="30"
                                      fill="white"
                                      transform="translate(13.5865 0.132812)"
                                    />
                                  </clipPath>{" "}
                                </defs>
                              </svg>
                            </div>
                          </span>
                        </div>
                      </div>
                      <ModalPopup
                        show={ratingModal}
                        onClose={closeRatingModal}
                        height="40vw"
                        width="37.5vw"
                        padding="0px"
                      >
                        <RatingFeedBack setRatingModal={setRatingModal} />
                      </ModalPopup>
                      <div className="h-auto w-full px-[1vw] pt-[1vw]">
                        <div className="grid grid-row-3 w-full h-full gap-[1vw]">
                          <div
                            className={`border-dashed border-2 border-[#1F487C] relative`}
                          >
                            <span
                              className={`absolute left-[-1.1vw] top-[-1.4vw] z-[3]`}
                            >
                              <div
                                className={`bg-white border-dashed border-[0.16vw] border-l-[#ffffff] border-[#1F487C] w-[2.3vw] h-[2.7vw] rounded-r-full `}
                              ></div>
                            </span>
                            <span className="absolute right-[-1.1vw] top-[-1.4vw] z-[3]">
                              <div
                                className={`bg-white border-dashed border-[0.16vw] border-r-[#ffffff] border-[#1F487C] w-[2.3vw] h-[2.7vw] rounded-l-full`}
                              ></div>
                            </span>
                          </div>
                          <div className="row-span-1 py-[1vw]">
                            {ticketDetail?.passenger?.length > 0 &&
                              ticketDetail?.passenger.map(
                                (passenger, index) => (
                                  <div
                                    key={index}
                                    className="grid grid-cols-5 gap-[1.5vw] pt-[1vw]"
                                  >
                                    <div className="col-span-1 pt-[1vw]">
                                      <p
                                        className="text-[1.1vw] font-semibold"
                                        // style={{ color: colorcode.theme }}
                                      >
                                        Traveller Name
                                      </p>
                                    </div>
                                    <div className="col-span-2">
                                      <div
                                        className={`${
                                          busdetails1.bus_type_status ===
                                          "luxury"
                                            ? "bg-[#FFEEC9]"
                                            : "bg-white"
                                        } border-r-[0.5vw] border-[0.1vw] text-[1.2vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none px-[1vw] relative`}
                                        style={{
                                          //background: `linear-gradient(to right,${colorcode.gradient} , #FFFFFF)`,
                                          borderColor:
                                            busdetails1.bus_type_status ===
                                            "luxury"
                                              ? "#393939"
                                              : colorcode.theme,
                                          // color: colorcode.theme,
                                        }}
                                      >
                                        <p className="absolute left-[1vw] top-[0.6vw] text-[1.1vw]  font-semibold ">
                                          {passenger?.user_name}
                                        </p>
                                      </div>
                                    </div>
                                    <div className="col-span-2">
                                      <div className="grid grid-cols-3">
                                        <div className="col-span-1">
                                          <div
                                            className="border-r-[0.5vw] bg-gradient-to-r border-[0.1vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none px-[1vw] relative"
                                            style={{
                                              //background: `linear-gradient(to right,${colorcode.gradient} , #FFFFFF)`,
                                              borderColor:
                                                busdetails1.bus_type_status ===
                                                "luxury"
                                                  ? "#393939"
                                                  : colorcode.theme,
                                              // color: colorcode.theme,
                                            }}
                                          >
                                            <p className="absolute left-[2.5vw] top-[0.6vw] text-[1.1vw]  font-semibold ">
                                              {passenger?.age}
                                            </p>
                                          </div>
                                        </div>
                                        <div className="col-span-2 gap-[1vw] w-full h-full pl-[1.5vw]">
                                          <button
                                            type="button"
                                            style={{
                                              ...(passenger?.gender === "male"
                                                ? {
                                                    backgroundColor:
                                                      busdetails1.bus_type_status ===
                                                      "luxury"
                                                        ? "#393939"
                                                        : busdetails1.bus_type_status ===
                                                          "regular"
                                                        ? colorcode.theme
                                                        : "",
                                                  }
                                                : {
                                                    //background: `linear-gradient(to right,${colorcode.gradient} , #FFFFFF)`,
                                                    color:
                                                      busdetails1.bus_type_status ===
                                                      "luxury"
                                                        ? "#393939"
                                                        : busdetails1.bus_type_status ===
                                                          "regular"
                                                        ? colorcode.theme
                                                        : "",
                                                    borderColor:
                                                      travelerDetails[index]
                                                        ?.gender === "male" ||
                                                      !travelerDetails[index]
                                                        ? busdetails1.bus_type_status ===
                                                          "luxury"
                                                          ? "#393939"
                                                          : colorcode.theme
                                                        : "",
                                                  }),
                                            }}
                                            className={`${
                                              passenger?.gender === "male"
                                                ? busdetails1.bus_type_status ===
                                                  "luxury"
                                                  ? "text-[#ffff] border-[#393939]"
                                                  : busdetails1.bus_type_status ===
                                                    "regular"
                                                  ? "text-[#ffff] border-[#1F487C]"
                                                  : ""
                                                : ""
                                            } h-[3vw] w-[50%] rounded-l-[0.5vw] border-[0.1vw] border-[#1F487C]`}
                                            // onClick={() =>
                                            //   setUserDetails({
                                            //     ...userdetails,
                                            //     sex: "male",
                                            //   })
                                            // }
                                          >
                                            Male
                                          </button>
                                          <button
                                            type="button"
                                            style={{
                                              ...(passenger?.gender === "female"
                                                ? {
                                                    background:
                                                      busdetails1.bus_type_status ===
                                                      "luxury"
                                                        ? "#393939"
                                                        : busdetails1.bus_type_status ===
                                                          "regular"
                                                        ? colorcode.theme
                                                        : "",
                                                  }
                                                : {
                                                    color:
                                                      busdetails1.bus_type_status ===
                                                      "luxury"
                                                        ? "#393939"
                                                        : colorcode.theme,
                                                    borderColor:
                                                      travelerDetails[index]
                                                        ?.gender === "female" ||
                                                      !travelerDetails[index]
                                                        ? busdetails1.bus_type_status ===
                                                          "luxury"
                                                          ? "#393939"
                                                          : colorcode.theme
                                                        : "",
                                                  }),
                                            }}
                                            className={`${
                                              passenger?.gender === "female"
                                                ? busdetails1.bus_type_status ===
                                                  "luxury"
                                                  ? "text-[#ffff] border-[#393939]"
                                                  : busdetails1.bus_type_status ===
                                                    "regular"
                                                  ? "text-[#ffff] border-[#1F487C]"
                                                  : ""
                                                : ""
                                            } h-[3vw] w-[50%] rounded-r-[0.5vw] border-[0.1vw] border-[#1F487C]`}
                                            // onClick={() =>
                                            //   setUserDetails({
                                            //     ...userdetails,
                                            //     sex: "female",
                                            //   })
                                            // }
                                          >
                                            {" "}
                                            Female
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                )
                              )}
                          </div>
                          <div className="row-span-1 py-[1vw]">
                            <div className="grid grid-cols-5 gap-[1.5vw]">
                              <div className="col-span-1 ">
                                <p
                                  className="text-[1.1vw] font-semibold"
                                  // style={{ color: colorcode.theme }}
                                >
                                  Contact Details
                                </p>
                              </div>
                              <div className="col-span-2">
                                <div
                                  className="border-r-[0.5vw]  border-[0.1vw]  text-[1.2vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none px-[1vw] relative"
                                  style={{
                                    //background: `linear-gradient(to right,${colorcode.gradient} , #FFFFFF)`,
                                    borderColor:
                                      busdetails1.bus_type_status === "luxury"
                                        ? "#393939"
                                        : colorcode.theme,
                                    // color: colorcode.theme,
                                  }}
                                >
                                  <p className="absolute left-[1vw] top-[0.6vw] text-[1.1vw]  font-semibold ">
                                    {ticketDetail?.email_id}
                                  </p>
                                </div>
                              </div>
                              <div className="col-span-2 flex relative">
                                <div
                                  className="border-r-[0.1vw] border-py-[0.5vw] border-[0.1vw] text-[1.1vw] h-[3vw] w-[25%] rounded-l-[0.5vw] outline-none px-[1vw] relative"
                                  style={{
                                    //background: `linear-gradient(to right,${colorcode.gradient} , #FFFFFF)`,
                                    borderColor:
                                      busdetails1.bus_type_status === "luxury"
                                        ? "#393939"
                                        : colorcode.theme,
                                    // color: colorcode.theme,
                                  }}
                                >
                                  <p
                                    className="absolute left-[1.5vw] top-[0.6vw] text-[1.1vw]  font-semibold "
                                    style={{
                                      // color: colorcode.theme,
                                      borderColor:
                                        busdetails1.bus_type_status === "luxury"
                                          ? "#393939"
                                          : colorcode.theme,
                                    }}
                                  >
                                    +91
                                  </p>
                                </div>
                                <div
                                  className="border-r-[0.5vw] border-[0.1vw]  text-[1.2vw] h-[3vw] w-[75%] rounded-r-[0.5vw] outline-none px-[1vw] relative"
                                  style={{
                                    //background: `linear-gradient(to right,${colorcode.gradient} , #FFFFFF)`,
                                    borderColor:
                                      busdetails1.bus_type_status === "luxury"
                                        ? "#393939"
                                        : colorcode.theme,
                                    // color: colorcode.theme,
                                  }}
                                >
                                  <p className="absolute left-[1vw] top-[0.6vw] text-[1.1vw]  font-semibold">
                                    {ticketDetail?.mobile_number}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div
                            className={`border-dashed border-2 border-[#1F487C] relative mt-[2vw]`}
                          >
                            <span
                              className={`absolute left-[-1.1vw] top-[-1.4vw] z-[3]`}
                            >
                              <div
                                className={`bg-white border-dashed border-[0.16vw] border-l-[#ffffff] border-[#1F487C] w-[2.3vw] h-[2.7vw] rounded-r-full `}
                              ></div>
                            </span>
                            <span className="absolute right-[-1.1vw] top-[-1.4vw] z-[3]">
                              <div
                                className={`bg-white border-dashed border-[0.16vw] border-r-[#ffffff] border-[#1F487C] w-[2.3vw] h-[2.7vw] rounded-l-full`}
                              ></div>
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between pl-[1vw] pr-[2vw] pt-[1.5vw]">
                        <div>
                          <Barcode
                            value={generateRandomId("AXER", 12)}
                            width={3}
                            height={70}
                            lineColor={
                              busdetails1.bus_type_status === "luxury"
                                ? "#393939"
                                : colorcode.theme
                            }
                          />
                        </div>
                        <div
                          className="cursor-pointer pr-[2vw] pb-[2vw] "
                          onClick={generatePDF}
                        >
                          <div
                            className="border-[.6vw] h-[6vw] w-[6vw] rounded-[50%]"
                            style={{
                              borderColor:
                                busdetails1.bus_type_status === "luxury"
                                  ? "#39393983"
                                  : colorcode.gradient,
                            }}
                          >
                            <div
                              className="bg-red-600 relative h-[5vw] w-[5vw] right-[.1vw] bottom-[.1vw] rounded-[50%] flex justify-center items-center "
                              style={{
                                backgroundColor:
                                  busdetails1.bus_type_status === "luxury"
                                    ? "#393939"
                                    : colorcode.theme,
                              }}
                            >
                              <span>
                                <FiDownload size={35} color="white" />
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="md:hidden block">
                    <MobileTicketView ticketDetails={ticketDetail} />
                  </div>
                </>
              )}
            </div>
          </div>
          {/* <div className="md:hidden block w-full">
          <DrawerMobile />
        </div> */}
        </div>
      </div>
    </>
  );
}

export default DrawerDetails;
