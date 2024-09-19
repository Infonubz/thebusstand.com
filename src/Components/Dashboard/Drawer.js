import React, { useEffect, useState } from "react";
import { Button, Drawer, Radio, Space } from "antd";
import complete from "../../assets/complete.png";
import ticketbus from "../../assets/ticketbus.png";
import bus_complete from "../../assets/bus_complete.png";
import bus_comp from "../../assets/bus_comp.png";
import redbus from "../../assets/redbus.png";
import operatorlogo from "../../assets/Operator_logos/7.png";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "../../App.css";
import { FaBus } from "react-icons/fa6";
import { RiArrowRightDoubleLine, RiMapPin3Line } from "react-icons/ri";
import { FaFileDownload, FaMapMarkerAlt } from "react-icons/fa";
import ticketview from "../../assets/ticket_view.png";
import amountView from "../../assets/Group.png";
import { FaAngleRight } from "react-icons/fa6";

import upi from "../../assets/upi.png";
import phonepay from "../../assets/phonepay.png";
import gpay from "../../assets/gpay.png";
import bank from "../../assets/bank.png";
import wallet from "../../assets/wallet.png";
import card from "../../assets/card.png";
import { IoCardSharp } from "react-icons/io5";
import { BsBank2 } from "react-icons/bs";
import { GiSevenPointedStar, GiWallet } from "react-icons/gi";
import dayjs from "dayjs";
import platformlogo from "./Logo";
import state from "../../assets/state_bank.jpg";
import kotak from "../../assets/kotak.png";
import hdfc from "../../assets/hdfc.png";
import icici from "../../assets/icici.png";
import axis from "../../assets/axis.png";
import Barcode from "react-barcode";
import { useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import DrawerMobile from "./DrawerMobile";
import platformTheme from "./PlatformTheme";
import { FiDownload } from "react-icons/fi";
import {
  GetPassengById,
  GetPassengerData,
} from "../../Api/MyAccounts/Passenger";
import {
  SendBookingDetails,
  GetBookingDetails,
  sendBookingPrice,
  TicketViewDetails,
} from "../../Api/MyAccounts/MyBookings";
import SINGLECARD_BG from "../../assets/SINGLECARD_BG.png";
import { FaPhoneFlip } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { FaEdit } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import ModalPopup from "../MainComponenet/Modal/ModalPopup";
import { RatingFeedBack } from "../Home/MyAccounts/RatingFeedBack";
import { TicketBooking } from "../../Api/Dashboard/Dashboard";
import { toast } from "react-toastify";
import { GetUserDetails } from "../../Api/Login/Login";
import { useNavigate } from "react-router";

// const upivalidationSchema = Yup.object().shape({
//   upiId: Yup.string()
//     // .matches(
//     //   /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(@upi)$/,
//     //   "Invalid UPI ID format"
//     // )

//     .required("UPI ID is required"),
// });
function DrawerDetails({
  modalshow,
  setShowModal,
  busdetails,
  seatplatform,
  type,
  busprice,
  selectedSeats,
  selectedRoutes,
  discount,
  imageurl,
}) {
  const offers = [
    { Coupon: "BUSSAVE10", details: "Get 10% off on all bus tickets." },
    { Coupon: "TRAVEL20", details: "Save $20 on round-trip bus tickets." },
    {
      Coupon: "BUSRIDE15",
      details: "Enjoy 15% discount on intercity bus rides.",
    },
    { Coupon: "WEEKEND50", details: "Avail 50% off on weekend bus travel." },
  ];

  const banklist = [
    { logo: state, bank: "State Bank of India" },
    { logo: kotak, bank: "Kotak Bank" },
    { logo: axis, bank: "Axis Bank" },
    { logo: hdfc, bank: "HDFC Bank" },
    { logo: icici, bank: "ICICI Bank" },
  ];

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
    ...Array(selectedSeats?.length)
      .fill(0)
      .reduce(
        (acc, _, index) => ({
          ...acc,
          [`user_name_${index}`]: Yup.string().required("Name is required"),
        }),
        {}
      ),
    ...Array(selectedSeats?.length)
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

  const capitalizeFirstLetter = (string) => {
    return string
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const [open, setOpen] = useState(true);
  const [placement, setPlacement] = useState("right");
  const [paymenttype, setPaymentType] = useState("upi");
  const [registerfulldetails, setRegisterFullDetails] = useState({});
  const [selectbank, setSelectBank] = useState("");
  const [continuenext, setContinue] = useState(false);
  const [sumbitbutton, setSubmitButon] = useState(false);
  const [enableInput, setEnableInput] = useState(false);
  console.log(enableInput, "enableInputenableInput");

  const [termschecked, setTermsChecked] = useState(false);
  const [passengerId, setPassengerId] = useState("");
  const [editenable, setEditEnable] = useState(true);
  const [bookingId, setBookingId] = useState();
  const [mobilenum, setMobilenum] = useState();
  const [proceed, setProceed] = useState(false);
  const [showPrice, setShowPrice] = useState(false);
  const [busBookingId, setBusBookingId] = useState("");
  const [ticketDetail, setTicketDetail] = useState({});
  const [promoCode, setPromoCode] = useState("");
  const [userdetails, setUserDetails] = useState({
    sex: localStorage.getItem("sex") || "male",
  });
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
  const dispatch = useDispatch();

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setShowModal(false);
  };
  const onChange = (e) => {
    setPlacement(e.target.value);
  };

  useEffect(() => {
    setTravelerDetails(
      selectedSeats.map((seat, index) => ({
        name: "",
        age: "",
        gender: "male", // Default to male
      }))
    );
  }, [selectedSeats]);

  useEffect(() => {
    GetPassengerData(dispatch);
  }, [dispatch]);

  function generateRandomId(prefix, length) {
    const randomNumbers = Math.random().toString().substr(2, length);
    return prefix + randomNumbers;
  }
  const componentRef = useRef();
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
  const handleFormChange = (values) => {
    setRegisterFullDetails(values);
    localStorage.setItem("mobile", values.mobile);
  };
  useEffect(() => {
    if (localStorage.getItem("occupation")) {
      setPassengerData({
        ...Passengerdata,
        mobile: localStorage.getItem("mobile"),
        email: "",
        age: localStorage.getItem("age"),
        occupation: localStorage.getItem("occupation"),
        gender: localStorage.getItem("sex"),
        name: localStorage.getItem("name"),
      });
    }
  }, []);

  const [travelerDetails, setTravelerDetails] = useState(
    selectedSeats.reduce((acc, seat, index) => {
      acc[index] = { user_name: "", age: "", gender: "male", seat: "" };
      return acc;
    }, {})
  );

  const handleDropdownChange = (e, index, setFieldValue) => {
    const selectedPassengerId = e.target.value;
    const selectedPassenger = passengerdatalist.find(
      (passenger) => passenger.tbs_add_pax_id === selectedPassengerId
    );

    if (selectedPassenger) {
      // Update travelerDetails state
      setTravelerDetails((prevDetails) => ({
        ...prevDetails,
        [index]: {
          user_name: selectedPassenger.user_name,
          age: selectedPassenger.age,
          gender: selectedPassenger.gender,
          seat: selectedSeats[index],
        },
      }));

      // update Formik's values
      setFieldValue(`user_name_${index}`, selectedPassenger.user_name);
      setFieldValue(`age_${index}`, selectedPassenger.age);
      setFieldValue(`gender_${index}`, selectedPassenger.gender);
      setPassengerId(selectedPassengerId);

      console.log("Updated travelerDetails", {
        user_name: selectedPassenger.user_name,
        age: selectedPassenger.age,
        gender: selectedPassenger.gender,
        seat: selectedSeats[index],
      });
    }
  };

  const handlePromoCode = async () => {
    console.log(promoCode, "Promocode Submit");
  };

  const handleBookingPrice = async () => {
    const totalAmount = `${
      Number(discount) + Number(Math.round(discount * 0.03))
    }`;
    console.log(totalAmount, bookingId, selectedSeats, busdetails);
    setTimeout(() => {
      setShowModal(false);
      setRatingModal(true);
    }, [5000]);
    try {
      const response = await sendBookingPrice(
        totalAmount,
        bookingId,
        selectedSeats,
        busdetails,
        travelerDetails,
        promoCode
      );
      setBusBookingId(response.Booking_Id);
      console.log(response, "response for price");
      setContinue(true);
      toast.success("booked successfully");
    } catch (error) {
      console.error("Error", error);
    }
  };

  // useEffect(() => {
  //   if (proceed) {
  //     handleBookingPrice();
  //   }
  // }, [proceed]);

  const handleTicketDetail = async () => {
    console.log(busBookingId, "response for ticket id");
    try {
      const response = await TicketViewDetails(busBookingId, mobilenum);
      setTicketDetail(response);
      console.log(response, "response for ticketdtl");
    } catch (error) {
      console.error("Error", error);
    }
  };

  useEffect(() => {
    console.log(busBookingId, "response for ticket id");
    if (busBookingId) {
      handleTicketDetail();
    }
  }, [busBookingId]);

  const handleSubmit = async (values) => {
    console.log(values.email, values.mobile, "handle Submit");

    try {
      const response = await SendBookingDetails(
        busdetails,
        selectedRoutes,
        selectedSeats,
        travelerDetails,
        // localStorage.getItem("departure_date"),
        new Date(),
        values.email,
        values.mobile,
        // sessionStorage.getItem("user_email_id"),
        // sessionStorage.getItem("user_mobile"),
        bookingId
      );
      console.log(response, "values 123");
      if (!bookingId) {
        setBookingId(response.bookingId);
      }
      setShowPrice(true);
      setSubmitButon(true);
      setEnableInput(true);
    } catch (error) {
      console.error("Error", error);
    }
  };

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

  console.log(travelerDetails, "selectedSeats12");
  useEffect(() => {
    console.log(passengerId, "passengerId");
    if (passengerId) {
      fetchGetPassenger();
    }
  }, [passengerId]);

  // const fetchBookingDetail = async (mobilenum) => {
  //   try {
  //     const data = await GetBookingDetails(mobilenum, dispatch);
  //     console.log(data[0].Array, "GetBookingDetails data");
  //   } catch (error) {
  //     console.error("Error fetching data", error);
  //   }
  // };

  // useEffect(() => {
  //   if (sumbitbutton && localStorage.getItem("mobile")) {
  //     fetchBookingDetail();
  //   }
  // }, []);

  const colorcode = platformTheme(seatplatform);

  const green = "#c3eee1";

  console.log(promoCode, "promoCode");
  console.log("submit form", busBookingId);
  const [ratingModal, setRatingModal] = useState(false);
  const closeRatingModal = () => {
    setRatingModal(false);
  };
  const handleRatings = () => {
    setRatingModal(true);
  };

  const [isEmailDisabled, setIsEmailDisabled] = useState(false);
  const [isMobileDisabled, setIsMobileDisabled] = useState(false);

  const storedEmail = sessionStorage.getItem("user_email_id");
  const storedMobile = sessionStorage.getItem("user_mobile");
  const navigation = useNavigate();
  const user_id = sessionStorage.getItem("user_id");
  useEffect(() => {
    if (storedEmail && storedEmail !== "undefined" && storedEmail !== "null") {
      setIsEmailDisabled(true);
    }

    if (
      storedMobile &&
      storedMobile !== "undefined" &&
      storedEmail !== "null"
    ) {
      setIsMobileDisabled(true);
    }
    if (user_id) {
      GetUserDetails(navigation);
    }
  }, []);

  return (
    <>
      <div>
        <div className="md:block hidden">
          <Drawer
            placement={placement}
            closable={false}
            onClose={onClose}
            open={modalshow}
            key={placement}
            width={"60%"}
          >
            <div>
              {!continuenext ? (
                <div className="">
                  <div className="flex gap-[0.5vw] items-center"></div>
                  <div className="px-[2px] ">
                    <div
                      className={`${
                        busdetails.bus_type_status === "luxury"
                          ? " bg-[#FFEEC9]"
                          : "  bg-white"
                      }  h-[20vw] w-full F rounded-[0.5vw]`}
                      style={{ boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)" }}
                    >
                      <div
                        className="flex h-[4vw] w-full px-[1vw] pt-[0.5vw] mb-4 rounded-t-[1vw]"
                        style={{
                          backgroundColor:
                            busdetails.bus_type_status === "luxury"
                              ? "#393939"
                              : colorcode.theme,
                        }}
                      >
                        <img src={complete} className="h-[2.5vw] w-[2.5vw]" />
                        <div className="h-[2vw]">
                          <h1
                            className="text-[1.5vw] text-white font-semibold "
                            // style={{
                            //   color: colorcode.theme,
                            // }}
                          >
                            Journey Details
                          </h1>
                        </div>
                      </div>
                      <div className="grid grid-cols-6 w-full h-[15vw]">
                        <div className="col-span-2 w-[100%] h-full flex">
                          <div className="w-[80%] h-full items-center justify-center flex flex-col">
                            <div className="h-[60%] flex justify-center items-center">
                              {" "}
                              <img
                                src={imageurl}
                                className="w-[5vw] h-[5vw] rounded-full"
                              />
                            </div>
                            <div className="flex flex-col h-[40%] items-center ">
                              <p
                                className=" text-[1.1vw] font-bold"
                                style={{
                                  color: colorcode.theme,
                                }}
                              >
                                {seatplatform}
                              </p>
                              <p
                                className="text-[0.7vw] "
                                // style={{
                                //   color: colorcode.theme,
                                // }}
                              >
                                {busdetails?.bus_type}
                              </p>
                            </div>
                          </div>
                          <div className="w-[20%] h-full  py-[1vw] flex justify-center">
                            {/* <img src={bus_complete} className="h-full w-full " /> */}
                            <div
                              className="border-dashed border-r-[0.1vw] h-[90%] relative"
                              style={{ borderColor: colorcode.theme }}
                            >
                              <FaBus
                                className=" absolute top-[-0.5vw] left-[-0.7vw]"
                                style={{
                                  color:
                                    busdetails.bus_type_status === "luxury"
                                      ? "#393939"
                                      : colorcode.theme,
                                }}
                                size={"1.5vw"}
                              />
                              <div className=" absolute top-[6vw] left-[-0.5vw]">
                                <div
                                  className={`${
                                    busdetails.bus_type_status === "luxury"
                                      ? "bg-[#FFEEC9]"
                                      : "bg-white"
                                  } h-[1vw] w-[1vw] border-[0.1vw] rounded-full`}
                                  style={{
                                    borderColor:
                                      busdetails.bus_type_status === "luxury"
                                        ? "#393939"
                                        : colorcode.theme,
                                  }}
                                ></div>
                              </div>{" "}
                              <FaMapMarkerAlt
                                size={"1.5vw"}
                                style={{
                                  color:
                                    busdetails.bus_type_status === "luxury"
                                      ? "#393939"
                                      : colorcode.theme,
                                }}
                                className="absolute left-[-0.7vw] bottom-[-1.2vw]"
                              />
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
                                      className="text-[0.8vw]  pt-[0.5vw]"
                                      // style={{
                                      //   color: colorcode.theme,
                                      // }}
                                    >
                                      {/* {dayjs(bus[busIndex]?.Bus_depature_date).format(
                                "DD MMM"
                              )} */}
                                      {dayjs(
                                        busdetails?.departure_date_time
                                      ).format("DD MMM")}
                                    </p>
                                    <p
                                      className="font-bold  text-[1.2vw]"
                                      // style={{
                                      //   color: colorcode.theme,
                                      // }}
                                    >
                                      {/* {item.bus_depature} */}
                                      {/* {bus[busIndex]?.Bus_Depature_time} */}
                                      {dayjs(
                                        busdetails?.departure_date_time
                                      ).format("HH:mm A")}
                                    </p>
                                    <p
                                      className=" text-[0.9vw] "
                                      // style={{
                                      //   color: colorcode.theme,
                                      // }}
                                    >
                                      {/* {bus[busIndex]?.Bus_Depature_place} */}
                                      {busdetails?.source_name}
                                    </p>
                                  </div>
                                </div>
                                <div className="col-span-2 flex-col mt-[0.5vw] items-center w-full justify-center">
                                  {/* <img
                                    src={bus_comp}
                                    className="h-[3.5vw] w-[22vw] "
                                  /> */}
                                  <div className="col-span-2 h-full relative w-full flex items-center justify-center">
                                    <div
                                      className={`${
                                        busdetails.bus_type_status === "luxury"
                                          ? "bg-[#393939]"
                                          : "bg-[#1F487C]"
                                      } absolute left-0 h-[0.5vw] w-[0.5vw] rounded-full`}
                                    ></div>
                                    <div
                                      className={`${
                                        busdetails.bus_type_status === "luxury"
                                          ? "border-[#393939]"
                                          : "border-[#1F487C]"
                                      } border-[0.15vw] absolute left-0 top-[2.1vw] border-dashed w-[18.5vw]`}
                                    ></div>
                                    <div
                                      className={`${
                                        busdetails.bus_type_status === "luxury"
                                          ? "bg-[#393939]"
                                          : "bg-[#1F487C]"
                                      } relative h-[2.1vw] flex w-[5.5vw] rounded-tl-[0.8vw] rounded-tr-[0.8vw] rounded-bl-[0.3vw] 
                                rounded-br-[0.3vw] text-white text-[1vw] font-bold justify-center items-center`}
                                      // style={{
                                      //   zIndex: 2,
                                      // }}
                                    >
                                      {busdetails?.time_duration}
                                      <div
                                        className={`${
                                          busdetails.bus_type_status ===
                                          "luxury"
                                            ? "bg-[#393939]"
                                            : "bg-[#1F487C]"
                                        } absolute bottom-[-0.8vw] left-[0.8vw] h-[1.3vw] w-[1.3vw] rounded-full flex items-center justify-center `}
                                        // style={{
                                        //   zIndex: 1,
                                        // }}
                                      >
                                        <div className="bg-white h-[0.4vw] w-[0.4vw] rounded-full"></div>
                                      </div>
                                      <div
                                        className={`${
                                          busdetails.bus_type_status ===
                                          "luxury"
                                            ? "bg-[#393939]"
                                            : "bg-[#1F487C]"
                                        } absolute bottom-[-0.8vw] right-[0.8vw] h-[1.3vw] w-[1.3vw] rounded-full flex items-center justify-center `}
                                      >
                                        <div className="bg-white h-[0.4vw] w-[0.4vw] rounded-full"></div>
                                      </div>
                                    </div>
                                    <FaAngleRight
                                      color={`${
                                        busdetails.bus_type_status === "luxury"
                                          ? "#393939"
                                          : "#1F487C"
                                      }`}
                                      size={"1vw"}
                                      className="absolute right-0"
                                    />
                                  </div>
                                  {/* <p
                                    className="text-center text-[1vw] font-bold"
                                    // style={{
                                    //   color: colorcode.theme,
                                    // }}
                                  >
                                    {busdetails?.time_duration}
                                  </p> */}
                                </div>
                                <div className="col-span-1">
                                  <div className="flex flex-col text-right pr-[1vw]">
                                    <p
                                      className="text-[0.8vw] pt-[0.5vw] "
                                      // style={{
                                      //   color: colorcode.theme,
                                      // }}
                                    >
                                      {/* {dayjs(bus[busIndex]?.Bus_arrival_date).format(
                                "DD MMM"
                              )} */}
                                      {dayjs(
                                        busdetails?.arrival_date_time
                                      ).format("DD MMM")}
                                    </p>
                                    <p
                                      className="font-bold r text-[1.2vw] "
                                      // style={{
                                      //   color: colorcode.theme,
                                      // }}
                                    >
                                      {/* {item.bus_arr} */}
                                      {/* {bus[busIndex]?.Bus_Arrival_time} */}
                                      {dayjs(
                                        busdetails?.arrival_date_time
                                      ).format("HH:mm A")}
                                    </p>
                                    <p
                                      className=" text-[0.9vw] "
                                      // style={{
                                      //   color: colorcode.theme,
                                      // }}
                                    >
                                      {/* {bus[busIndex]?.Bus_Arrival_place} */}
                                      {busdetails?.destination_name}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="row-span-2 flex justify-between px-[1vw] ">
                              <div className="flex flex-col  ">
                                <p className="text-[1vw] ">
                                  Boarding Point & Time
                                </p>
                                <p
                                  className=" text-[1.1vw] font-semibold"
                                  // style={{
                                  //   color: colorcode.theme,

                                  // }}
                                >
                                  {`${selectedRoutes?.dep_route} : ${dayjs(
                                    selectedRoutes?.dep_time
                                  ).format("DD MMM, HH:mm")}`}
                                </p>
                              </div>
                              <div className="flex flex-col items-center">
                                <p className="text-[1vw]">Seat Number(s)</p>
                                <div className="text-[1.1vw] font-semibold">
                                  <div className="flex flex-row flex-wrap">
                                    {selectedSeats?.length > 0 ? (
                                      selectedSeats.map((seat, index) => (
                                        <p
                                          key={index}
                                          className="text-[1vw] mr-[0.4vw]"
                                        >
                                          {seat}
                                          {index < selectedSeats.length - 1 &&
                                            ","}
                                        </p>
                                      ))
                                    ) : (
                                      <p className="text-[1vw] mr-[0.4vw]">
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
                                  className="text-[1.1vw] font-semibold"
                                  // style={{
                                  //   color: colorcode.theme,
                                  // }}
                                >
                                  {`${selectedRoutes?.arri_route} : ${dayjs(
                                    selectedRoutes?.arr_time
                                  ).format("DD MMM, HH:mm")}`}
                                </p>
                              </div>
                              <div className="relative">
                                {busdetails.bus_type_status === "luxury" ? (
                                  <img
                                    src={amountView}
                                    className="w-[9vw] h-[3.5vw]"
                                  />
                                ) : (
                                  <img
                                    src={ticketview}
                                    className="w-[9vw] h-[3.5vw]"
                                  />
                                )}

                                <p className="text-[1.5vw] font-bold text-white absolute left-[2.3vw] top-[0.8vw]">
                                  {`₹ ${discount}`}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="px-[2px] py-[2vw]">
                    <div
                      className={`${
                        busdetails.bus_type_status === "luxury"
                          ? "bg-[#FFEEC9]"
                          : "bg-white"
                      } h-auto w-full F rounded-[0.5vw] pb-[1vw]`}
                      style={{ boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)" }}
                    >
                      <div
                        className="flex h-[4vw] w-full px-[1vw] pt-[0.5vw] mb-7 rounded-t-[1vw]"
                        style={{
                          backgroundColor:
                            busdetails.bus_type_status === "luxury"
                              ? "#393939"
                              : colorcode.theme,
                        }}
                      >
                        {termschecked ? (
                          <img src={complete} className="h-[2.5vw] w-[2.5vw]" />
                        ) : (
                          ""
                        )}
                        <h1
                          className="text-[1.5vw] font-semibold  text-white"
                          // style={{
                          //   color: colorcode.theme,
                          // }}
                        >
                          Passenger Details
                        </h1>
                      </div>
                      <div className="h-auto w-full px-[1vw]">
                        <Formik
                          initialValues={{
                            email:
                              storedEmail &&
                              storedEmail !== "undefined" &&
                              storedEmail !== "null"
                                ? storedEmail
                                : "",
                            mobile:
                              storedMobile &&
                              storedMobile !== "undefined" &&
                              storedMobile !== "null"
                                ? storedMobile
                                : "",
                            user_name:
                              selectedSeats.map(
                                (seat, index) =>
                                  travelerDetails[index]?.user_name
                              ) || "",
                            age:
                              selectedSeats.map(
                                (seat, index) => travelerDetails[index]?.age
                              ) || "",
                            gender: selectedSeats.map(
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
                          }) => (
                            <Form onSubmit={handleSubmit}>
                              <div className="grid grid-row-4 w-full h-full gap-[1vw]">
                                <div className="row-span-1">
                                  <div className="flex flex-row gap-[2.5vw] mb-[1vw] items-center">
                                    <div className="flex-2">
                                      <p className="text-[1.1vw] font-semibold">
                                        Contact Details
                                      </p>
                                    </div>
                                    <div className="flex-3 relative">
                                      <Field
                                        type="text"
                                        name="email"
                                        disabled={
                                          isEmailDisabled || enableInput
                                        }
                                        placeholder="Email ID"
                                        value={
                                          storedEmail &&
                                          storedEmail !== "undefined" &&
                                          storedEmail !== "null"
                                            ? storedEmail
                                            : values.email
                                        }
                                        onChange={(e) => {
                                          handleChange(e);
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
                                          !isSubmitting || !isEmailDisabled
                                            ? `cursor-pointer`
                                            : "cursor-not-allowed"
                                        } border-r-[0.5vw] border-[.1vw] text-[1.2vw] h-[3vw] w-[21vw] rounded-[0.5vw] outline-none px-[1vw]`}
                                        style={{
                                          borderColor:
                                            busdetails.bus_type_status ===
                                            "luxury"
                                              ? "#393939"
                                              : colorcode.theme,
                                        }}
                                      />
                                      <ErrorMessage
                                        name="email"
                                        component="div"
                                        className="text-red-500 text-[0.8vw] absolute top-[3vw] left-[1vw]"
                                      />
                                      <ErrorMessage
                                        name="email"
                                        component="div"
                                        className="text-red-500 text-[0.8vw] absolute top-[3vw] left-[1vw]"
                                      />
                                    </div>
                                    <div className="flex-3 relative">
                                      <Field
                                        as="select"
                                        name="option"
                                        disabled={
                                          isMobileDisabled || enableInput
                                        }
                                        className={`${
                                          !isSubmitting || !enableInput
                                            ? `cursor-pointer`
                                            : "cursor-not-allowed"
                                        } border-r-[0.1vw] border-[.1vw] border-py-[0.5vw] text-[1.1vw] h-[3vw] w-[25%] rounded-l-[0.5vw] outline-none px-[1vw]`}
                                        style={{
                                          borderColor:
                                            busdetails.bus_type_status ===
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
                                              busdetails.bus_type_status ===
                                              "luxury"
                                                ? "#393939"
                                                : colorcode.theme,
                                          }}
                                        />
                                      </Field>
                                      <Field
                                        type="text"
                                        name="mobile"
                                        disabled={
                                          isMobileDisabled || enableInput
                                        }
                                        placeholder="Mobile Number"
                                        maxLength={10}
                                        value={
                                          storedMobile &&
                                          storedMobile !== "undefined" &&
                                          storedMobile !== "null"
                                            ? storedMobile
                                            : values.mobile
                                        }
                                        onChange={(e) => {
                                          handleChange(e);
                                          setFieldValue(
                                            "mobile",
                                            e.target.value
                                          );
                                          // sessionStorage.setItem(
                                          //   "user_mobile",
                                          //   e.target.value
                                          // );
                                        }}
                                        className={`${
                                          !isSubmitting || !isMobileDisabled
                                            ? `cursor-pointer`
                                            : "cursor-not-allowed"
                                        } border-r-[0.5vw] border-black border-[0.1vw] text-[1.2vw] h-[3vw] w-[75%] rounded-r-[0.5vw] outline-none px-[1vw]`}
                                        style={{
                                          borderColor:
                                            busdetails.bus_type_status ===
                                            "luxury"
                                              ? "#393939"
                                              : colorcode.theme,
                                        }}
                                      />
                                      <ErrorMessage
                                        name="mobile"
                                        component="div"
                                        className="text-red-500 text-[0.8vw] absolute top-[3vw] left-[1vw]"
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div className="row-span-1">
                                  <div className="grid grid-cols-5">
                                    <div className="col-span-1"></div>
                                    <div className="col-span-4">
                                      <p className="text-[1vw] pb-[1vw]">
                                        Your booking details will be sent to
                                        this email address and mobile number.
                                      </p>
                                      <div className="px-[0.5vw]">
                                        <div 
                                        className="border-b-[0.2vw] w-full"
                                        style={{
                                          borderColor:
                                            busdetails.bus_type_status ===
                                            "luxury"
                                              ? "#393939"
                                              : colorcode.theme,
                                        }}
                                        ></div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                {selectedSeats?.length > 0 &&
                                  selectedSeats.map((seat, index) => (
                                    <div
                                      key={index}
                                      className="flex flex-row gap-[1vw] mb-[1vw] items-center"
                                    >
                                      {/* Seat Number */}
                                      <div className="flex-1">
                                        <p className="text-[1.1vw] font-semibold">
                                          Seat No: {seat}
                                        </p>
                                      </div>

                                      {/* Operator Name */}
                                      <div className="flex-1 relative">
                                        <Field
                                          type="text"
                                          disabled={enableInput}
                                          // name={`user_name_${index}`}
                                          name
                                          placeholder="User Name"
                                          value={
                                            travelerDetails[index]?.user_name ||
                                            values[`user_name_${index}`] ||
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
                                                  ...prevDetails[index],
                                                  user_name: e.target.value,
                                                  seat,
                                                },
                                              })
                                            );
                                          }}
                                          className={`${
                                            !isSubmitting || !enableInput
                                              ? `cursor-pointer`
                                              : "cursor-not-allowed"
                                          }  border-r-[0.5vw] border-[.1vw] text-[1.2vw] h-[3vw] w-[15vw] rounded-[0.5vw] outline-none px-[1vw]`}
                                          style={{
                                            borderColor:
                                              busdetails.bus_type_status ===
                                              "luxury"
                                                ? "#393939"
                                                : colorcode.theme,
                                          }}
                                        />
                                        <ErrorMessage
                                          name={`user_name_${index}`}
                                          component="div"
                                          className="text-red-500 text-[0.8vw] absolute top-[3vw] left-[1vw]"
                                        />
                                      </div>

                                      {/* Age */}
                                      <div className="flex-1 relative">
                                        <Field
                                          type="text"
                                          disabled={enableInput}
                                          name={`age_${index}`}
                                          placeholder="Age"
                                          maxLength={2}
                                          value={
                                            travelerDetails[index]?.age ||
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
                                                  ...prevDetails[index],
                                                  age: e.target.value,
                                                  seat,
                                                },
                                              })
                                            );
                                          }}
                                          className={`${
                                            !isSubmitting || !enableInput
                                              ? `cursor-pointer`
                                              : "cursor-not-allowed"
                                          } border-r-[0.5vw] border-[.1vw] border-black text-[1.2vw] h-[3vw] w-[6vw] rounded-[0.5vw] outline-none px-[1vw]`}
                                          style={{
                                            borderColor:
                                              busdetails.bus_type_status ===
                                              "luxury"
                                                ? "#393939"
                                                : colorcode.theme,
                                          }}
                                        />
                                        <ErrorMessage
                                          name={`age_${index}`}
                                          component="div"
                                          className="text-red-500 text-[0.8vw] absolute top-[3vw] left-[1vw]"
                                        />
                                      </div>

                                      {/* Gender Toggle Buttons */}
                                      <div className="flex-2">
                                        <button
                                          disabled={enableInput}
                                          type="button"
                                          name="gender"
                                          style={{
                                            background:
                                              travelerDetails[index]?.gender ===
                                                "male" ||
                                              !travelerDetails[index]
                                                ? busdetails.bus_type_status ===
                                                  "luxury"
                                                  ? "#393939"
                                                  : busdetails.bus_type_status ===
                                                    "regular"
                                                  ? colorcode.theme
                                                  : ""
                                                : "#ffffff",
                                            color:
                                              travelerDetails[index]?.gender !==
                                                "male" && travelerDetails[index]
                                                ? busdetails.bus_type_status ===
                                                  "luxury"
                                                  ? "#393939"
                                                  : busdetails.bus_type_status ===
                                                    "regular"
                                                  ? colorcode.theme
                                                  : ""
                                                : "",
                                            borderColor:
                                              travelerDetails[index]?.gender ===
                                                "male" ||
                                              !travelerDetails[index]
                                                ? busdetails.bus_type_status ===
                                                  "luxury"
                                                  ? "#393939"
                                                  : busdetails.bus_type_status ===
                                                    "regular"
                                                  ? colorcode.theme
                                                  : ""
                                                : "",
                                          }}
                                          className={`${
                                            !isSubmitting || !enableInput
                                              ? "cursor-pointer"
                                              : "cursor-not-allowed"
                                          } 
                                          h-[3vw] w-[4vw] rounded-l-[0.5vw] text-[1vw] border-[0.1vw] text-white border-[#1F487C]`}
                                          onClick={() =>
                                            setTravelerDetails(
                                              (prevDetails) => ({
                                                ...prevDetails,
                                                [index]: {
                                                  ...prevDetails[index],
                                                  gender: "male",
                                                  seat,
                                                },
                                              })
                                            )
                                          }
                                        >
                                          Male
                                        </button>
                                        <button
                                          disabled={enableInput}
                                          type="button"
                                          name={`gender_${index}`}
                                          style={{
                                            background:
                                              travelerDetails[index]?.gender ===
                                                "female" ||
                                              !travelerDetails[index]
                                                ? busdetails.bus_type_status ===
                                                  "luxury"
                                                  ? "#393939"
                                                  : busdetails.bus_type_status ===
                                                    "regular"
                                                  ? colorcode.theme
                                                  : "#ffffff"
                                                : "#ffffff",
                                            color:
                                              travelerDetails[index]?.gender !==
                                                "female" &&
                                              travelerDetails[index]
                                                ? busdetails.bus_type_status ===
                                                  "luxury"
                                                  ? "#393939"
                                                  : busdetails.bus_type_status ===
                                                    "regular"
                                                  ? colorcode.theme
                                                  : ""
                                                : "",
                                            borderColor:
                                              travelerDetails[index]?.gender ===
                                                "female" ||
                                              !travelerDetails[index]
                                                ? busdetails.bus_type_status ===
                                                  "luxury"
                                                  ? "#393939"
                                                  : busdetails.bus_type_status ===
                                                    "regular"
                                                  ? colorcode.theme
                                                  : ""
                                                : "",
                                          }}
                                          className={`${
                                            !isSubmitting || !enableInput
                                              ? "cursor-pointer"
                                              : "cursor-not-allowed"
                                          } text-white h-[3vw] w-[4vw] rounded-r-[0.5vw] border-[0.1vw] text-[1vw] border-[#1F487C]`}
                                          onClick={() =>
                                            setTravelerDetails(
                                              (prevDetails) => ({
                                                ...prevDetails,
                                                [index]: {
                                                  ...prevDetails[index],
                                                  gender: "female",
                                                  seat,
                                                },
                                              })
                                            )
                                          }
                                        >
                                          Female
                                        </button>
                                      </div>

                                      {/* Dropdown Input */}
                                      <div className="flex-3">
                                        <Field
                                          disabled={enableInput}
                                          as="select"
                                          className={`${
                                            !isSubmitting || !enableInput
                                              ? `cursor-pointer`
                                              : "cursor-not-allowed"
                                          } border-r-[0.5vw] border-[.1vw] text-[1.2vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none px-[1vw]`}
                                          style={{
                                            borderColor:
                                              busdetails.bus_type_status ===
                                              "luxury"
                                                ? "#393939"
                                                : colorcode.theme,
                                          }}
                                          name={`dropdown_${index}`}
                                          onChange={(e) =>
                                            handleDropdownChange(
                                              e,
                                              index,
                                              setFieldValue
                                            )
                                          }
                                        >
                                          <option value="">Passenger</option>
                                          {passengerdatalist?.length > 0 &&
                                            passengerdatalist.map(
                                              (passenger, idx) => (
                                                <option
                                                  key={idx}
                                                  value={
                                                    passenger.tbs_add_pax_id
                                                  }
                                                >
                                                  {passenger.user_name}
                                                </option>
                                              )
                                            )}
                                        </Field>
                                      </div>
                                    </div>
                                  ))}
                              </div>
                              {registerfulldetails?.terms == true ? (
                                ""
                              ) : (
                                <>
                                  <div className="flex pt-[2vw] items-center justify-between">
                                    <div className="flex gap-[0.5vw]">
                                      <Field
                                        disabled={enableInput}
                                        type="checkbox"
                                        name="terms"
                                        className="h-[1.5vw] w-[1.5vw]"
                                        checked={values.terms}
                                        onChange={(e) => {
                                          handleChange(e);
                                          setFieldValue(
                                            "terms",
                                            e.target.value
                                          );
                                          setTermsChecked(e.target.checked);
                                          console.log(
                                            e.target.checked,
                                            "setTermsChecked"
                                          );
                                        }}
                                      />
                                      <p>
                                        Yes and I accept the{" "}
                                        <span>Terms and conditions</span>
                                      </p>
                                    </div>
                                    {sumbitbutton && (
                                      <FaEdit
                                        size={"2vw"}
                                        color={
                                          busdetails.bus_type_status ===
                                          "luxury"
                                            ? "#393939"
                                            : busdetails.bus_type_status ===
                                              "regular"
                                            ? colorcode.theme
                                            : ""
                                        }
                                        className="cursor-pointer ml-[15vw]"
                                        onClick={() => {
                                          setEnableInput(false);
                                          //fetchBookingDetail(mobilenum);
                                          console.log(mobilenum, "mobilenum");
                                        }}
                                      />
                                    )}

                                    <button
                                      type="submit"
                                      style={{
                                        backgroundColor:
                                          isValid && termschecked
                                            ? busdetails.bus_type_status ===
                                              "luxury"
                                              ? "#393939"
                                              : busdetails.bus_type_status ===
                                                "regular"
                                              ? colorcode.theme
                                              : ""
                                            : "gray",
                                      }}
                                      className={`${
                                        (!isSubmitting &&
                                          isValid &&
                                          termschecked) ||
                                        !enableInput
                                          ? "cursor-pointer"
                                          : "cursor-not-allowed"
                                      }  
                                  w-[18vw] h-[2.5vw] rounded-[0.5vw] ml-[1vw]`}
                                      disabled={enableInput}
                                      onClick={() => {
                                        setMobilenum(
                                          storedMobile &&
                                            storedMobile != "undefined"
                                            ? sessionStorage.getItem(
                                                "user_mobile"
                                              )
                                            : values.mobile
                                        );
                                        console.log(
                                          "passenger detail",
                                          travelerDetails
                                        );
                                      }}
                                    >
                                      <span className="text-white text-[1.1vw] font-semibold">
                                        {isSubmitting && isValid
                                          ? `Update to Pay ₹ ${discount}`
                                          : `Continue to Pay ₹ ${discount}`}
                                      </span>
                                    </button>
                                  </div>
                                  <ErrorMessage
                                    name="terms"
                                    component="div"
                                    className="text-red-500 text-[0.8vw] ml-[2vw]"
                                  />
                                </>
                              )}
                            </Form>
                          )}
                        </Formik>
                      </div>
                    </div>
                    {showPrice ? (
                      <div className="grid grid-cols-2 gap-[2vw] pt-[2vw] h-[25vw]">
                        <div
                          className={`${
                            busdetails.bus_type_status === "luxury"
                              ? "bg-[#FFEEC9]"
                              : "bg-white"
                          } col-span-1 h-[25vw] w-full  rounded-[0.5vw] pb-[2vw]`}
                          style={{ boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)" }}
                        >
                          <div
                            className="row-span-6 h-auto w-full  rounded-[0.5vw] pb-[2vw]"
                            style={{ boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)" }}
                          >
                            <h1
                              className="text-[1.5vw] font-semibold bg-gradient-to-r px-[1vw] py-[0.5vw] from-[#2E78AE] to-[#1F487C] bg-clip-text text-transparent"
                              style={{
                                color:
                                  busdetails.bus_type_status === "luxury"
                                    ? "#393939"
                                    : colorcode.theme,
                              }}
                            >
                              Offers
                            </h1>
                            <div className="px-[1vw] h-[17vw] overflow-y-auto">
                              {offers.map((item, index) => (
                                <div
                                  key={index}
                                  className="border-[0.1vw]  rounded-[0.5vw] mb-[1vw]"
                                  style={{
                                    borderColor:
                                      busdetails.bus_type_status === "luxury"
                                        ? "#393939"
                                        : colorcode.theme,
                                  }}
                                >
                                  <div className="grid grid-cols-10 m-[0.5vw] w-full">
                                    <div className="col-span-1 pt-[0.2vw]">
                                      <input
                                        type="radio"
                                        name="offer"
                                        className="w-full h-auto"
                                      />
                                    </div>
                                    <div className="col-span-9 flex flex-col w-full">
                                      <p
                                        className="text-[1.1vw] font-bold"
                                        // style={{ color: colorcode.theme }}
                                      >
                                        {item.Coupon}
                                      </p>
                                      <p className="text-[1vw] font-semibold text-[#A4A4A4]">
                                        {item.details}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>

                            <div className="h-[2vw] w-full">
                              <div className="">
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
                                        size={"2vw"}
                                        className="absolute left-[1.5vw] top-[0.5vw]"
                                        // color="color"
                                        style={{
                                          color:
                                            busdetails.bus_type_status ===
                                            "luxury"
                                              ? "#393939"
                                              : colorcode.theme,
                                        }}
                                      />
                                      <p className="text-white font-bold absolute left-[2vw] top-[0.75vw]">
                                        %
                                      </p>
                                      <Field
                                        type="text"
                                        name="name"
                                        placeholder="Enter promo code"
                                        className="border-dashed border-[0.1vw]  outline-none text-[1.2vw] h-[3vw] w-[75%] rounded-l-[0.5vw]  pl-[3vw] "
                                        style={{
                                          // color: colorcode.theme,
                                          borderColor:
                                            busdetails.bus_type_status ===
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
                                        className=" w-[25%] h-[3vw] rounded-r-[0.5vw] text-white  font-bold flex items-center justify-center"
                                        style={{
                                          backgroundColor:
                                            busdetails.bus_type_status ===
                                            "luxury"
                                              ? "#393939"
                                              : colorcode.theme,
                                        }}
                                      >
                                        Apply
                                      </button>
                                    </Form>
                                  )}
                                </Formik>{" "}
                                {/* <Formik
                                initialValues={{
                                  //value: "",
                                  code: "",
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
                                {({ isSubmitting }) => (
                                  <Form className="flex px-[1vw] mt-[0.8vw] relative">
                                    <GiSevenPointedStar
                                      size={"2vw"}
                                      className="absolute left-[1.5vw] top-[0.5vw]"
                                      // color="color"
                                      style={{ color: colorcode.theme }}
                                    />
                                    <p className="text-white font-bold absolute left-[2vw] top-[0.75vw]">
                                      %
                                    </p>
                                    <Field
                                      type="text"
                                      name="code"
                                      placeholder="Enter promo code"
                                      className="border-dashed border-[0.1vw]  outline-none text-[1.2vw] h-[3vw] w-[75%] rounded-l-[0.5vw]  pl-[3vw] "
                                      style={{
                                        // color: colorcode.theme,
                                        borderColor: colorcode.theme,
                                        // background: linear-gradient(to right,${colorcode.gradient} , #FFFFFF)
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
                                      className=" w-[25%] h-[3vw] rounded-r-[0.5vw] text-white  font-bold flex items-center justify-center"
                                      style={{
                                        backgroundColor: colorcode.theme,
                                      }}
                                    >
                                      Apply
                                    </button>
                                  </Form>
                                )}
                              </Formik>{" "} */}
                              </div>
                            </div>
                          </div>
                          {/* <h1
                        className="text-[1.5vw] font-semibold bg-gradient-to-r px-[1vw] py-[0.5vw]"
                        style={{
                          color: colorcode.theme,
                        }}
                      >
                        Make Payment
                      </h1> */}
                          {/* <div className="grid grid-cols-5 px-[1vw] "> */}

                          {/* <div className="col-span-1 pr-[1vw]">
                          <div className="grid grid-rows-6 ">
                            <div
                              style={{
                                backgroundColor:
                                  paymenttype === "upi"
                                    ? colorcode.theme
                                    : "#E9EDF2",
                              }}
                              className={`
                            row-span-1 items-center justify-center flex rounded-t-[0.5vw] cursor-pointer`}
                              onClick={() => setPaymentType("upi")}
                            >
                              <img
                                src={upi}
                                className="h-[3.5vw] w-[3.5vw] p-[0.5vw]"
                              />
                            </div>
                            <div
                              style={{
                                backgroundColor:
                                  paymenttype === "phonepay"
                                    ? colorcode.theme
                                    : "#E9EDF2",
                              }}
                              className={` 
                      
                            row-span-1  flex items-center justify-center cursor-pointer`}
                              onClick={() => setPaymentType("phonepay")}
                            >
                              <img
                                src={phonepay}
                                className="h-[3.5vw] w-[3.5vw] p-[0.5vw]"
                              />
                            </div>
                            <div
                              style={{
                                backgroundColor:
                                  paymenttype === "gpay"
                                    ? colorcode.theme
                                    : "#E9EDF2",
                              }}
                              className={`
                             row-span-1 flex items-center justify-center cursor-pointer`}
                              onClick={() => setPaymentType("gpay")}
                            >
                              <img
                                src={gpay}
                                className="h-[3.5vw] w-[3.5vw] p-[0.5vw]"
                              />
                            </div>
                            <div
                              style={{
                                backgroundColor:
                                  paymenttype === "card"
                                    ? colorcode.theme
                                    : "#E9EDF2",
                              }}
                              className={`row-span-1 flex items-center justify-center cursor-pointer`}
                              onClick={() => setPaymentType("card")}
                            >
                              <img src={card} className="h-[4vw] w-[4vw] p-[0.5vw]" />
                              <IoCardSharp
                                size={"2.5vw"}
                                color={`${
                                  paymenttype == "card" ? "white" : "black"
                                }`}
                              />
                            </div>
                            <div
                              style={{
                                backgroundColor:
                                  paymenttype === "bank"
                                    ? colorcode.theme
                                    : "#E9EDF2",
                              }}
                              className={` row-span-1 flex items-center justify-center cursor-pointer`}
                              onClick={() => setPaymentType("bank")}
                            >
                              <BsBank2
                                size={"2.5vw"}
                                color={`${
                                  paymenttype == "bank" ? "white" : "black"
                                }`}
                              />
                            </div>
                            <div
                              style={{
                                backgroundColor:
                                  paymenttype === "wallet"
                                    ? colorcode.theme
                                    : "#E9EDF2",
                              }}
                              className={` row-span-1 flex items-center justify-center rounded-b-[0.5vw] cursor-pointer`}
                              onClick={() => setPaymentType("wallet")}
                            >
                              <GiWallet
                                size={"2.5vw"}
                                color={`${
                                  paymenttype == "wallet" ? "white" : "black"
                                }`}
                              />
                            </div>
                          </div>
                        </div> */}
                          {/* <div className="col-span-4 mt-[0.5vw]">
                          {paymenttype == "upi" ? (
                            <>
                              <p
                                className="text-[1.2vw] font-bold"
                                // style={{ color: colorcode.theme }}
                              >
                                How to pay using UPI
                              </p>
                              <Formik
                                initialValues={{
                                  upiId: "",
                                }}
                                validationSchema={upivalidationSchema}
                                onSubmit={(values) => {
                                  // Handle form submission
                                  setUpiId(values.upiId);
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
                                {({ isSubmitting, handleSubmit, isValid }) => (
                                  <Form
                                    className="py-[1vw]"
                                    onSubmit={handleSubmit}
                                  >
                                    <Field
                                      type="text"
                                      name="upiId"
                                      placeholder="Enter UPI ID"
                                      className="border-r-[0.5vw] border-[.1vw] text-[1.2vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none px-[1vw] "
                                      style={{
                                        // background: `linear-gradient(to right,${colorcode.gradient} , #FFFFFF)`,
                                        borderColor: colorcode.theme,
                                        // color: colorcode.theme,
                                      }}
                                    />
                                    <ErrorMessage
                                      name="upiId"
                                      component="div"
                                      className="text-red-500 text-[0.8vw] ml-[1vw]]"
                                    />
                                    <ul class="list-disc list-inside py-[1vw]">
                                      <li className="text-[1vw] pb-[0.5vw]">
                                        Enter your UPI ID and click on Pay Now.
                                      </li>
                                      <li className="text-[1vw] pb-[0.5vw]">
                                        You will receive a payment request from
                                        Payment Gateway in your UPI App.
                                      </li>
                                      <li className="text-[1vw] pb-[0.5vw]">
                                        Login to UPI app by entering your mpin &
                                        authorize payment.
                                      </li>
                                    </ul>
                                    <button
                                      type="submit"
                                      style={{
                                        backgroundColor: isValid
                                          ? colorcode.theme
                                          : "gray",
                                      }}
                                      className={`
                                     
                                     
                                     w-[20vw] h-[2.5vw] rounded-[0.5vw]  flex items-center justify-center`}
                                    >
                                      <span className="text-white text-[1.1vw] font-semibold">
                                        Proceed to Pay{" "}
                                        {`₹ ${
                                          Number(discount) +
                                          Number(Math.round(discount * 0.03))
                                        }`}
                                      </span>
                                      <span className="pl-[0.5vw]">
                                        <RiArrowRightDoubleLine
                                          size={"1.7vw"}
                                          color="white"
                                        />
                                      </span>
                                    </button>
                                  </Form>
                                )}
                              </Formik>
                            </>
                          ) : paymenttype == "phonepay" ? (
                            <>
                              <p
                                className="text-[1.2vw] font-bold"
                                // style={{ color: colorcode.theme }}
                              >
                                How to pay using Phonepe
                              </p>
                              <Formik
                                initialValues={{
                                  mobile: "",
                                  age: "",
                                  email: "",
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
                                {({ isSubmitting }) => (
                                  <Form className="py-[1vw]">
                                    <Field
                                      type="text"
                                      name="name"
                                      placeholder="Enter Phonepe Number"
                                      className="border-r-[0.5vw] border-[.1vw] border-black text-[1.2vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none px-[1vw] "
                                      style={{
                                        // background: `linear-gradient(to right,${colorcode.gradient} , #FFFFFF)`,
                                        borderColor: colorcode.theme,
                                        // color: colorcode.theme,
                                      }}
                                    />
                                    <ul class="list-disc list-inside py-[1vw]">
                                      <li className="text-[1vw] pb-[0.5vw]">
                                        Enter your UPI ID and click on Pay Now.
                                      </li>
                                      <li className="text-[1vw] pb-[0.5vw]">
                                        You will receive a payment request from
                                        Payment Gateway in your UPI App.
                                      </li>
                                      <li className="text-[1vw] pb-[0.5vw]">
                                        Login to UPI app by entering your mpin &
                                        authorize payment.
                                      </li>
                                    </ul>
                                    <button
                                      className=" w-[20vw] h-[2.5vw] rounded-[0.5vw] mt-[0.8vw] flex items-center justify-center"
                                      style={{
                                        backgroundColor: colorcode.theme,
                                      }}
                                    >
                                      <span className="text-white text-[1.1vw] font-semibold">
                                        Proceed to Pay{" "}
                                        {`₹ ${
                                          Number(discount) +
                                          Number(Math.round(discount * 0.03))
                                        }`}
                                      </span>
                                      <span className="pl-[0.5vw]">
                                        <RiArrowRightDoubleLine
                                          size={"1.7vw"}
                                          color="white"
                                        />
                                      </span>
                                    </button>
                                  </Form>
                                )}
                              </Formik>
                            </>
                          ) : paymenttype == "gpay" ? (
                            <>
                              <p
                                className="text-[1.2vw] font-bold"
                                // style={{ color: colorcode.theme }}
                              >
                                How to pay using Gpay
                              </p>
                              <Formik
                                initialValues={{
                                  mobile: "",
                                  age: "",
                                  email: "",
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
                                {({ isSubmitting }) => (
                                  <Form className="py-[1vw]">
                                    <Field
                                      type="text"
                                      name="name"
                                      placeholder="Enter Gpay Number"
                                      className="border-r-[0.5vw] border-[.1vw]  text-[1.2vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none px-[1vw] "
                                      style={{
                                        // background: `linear-gradient(to right,${colorcode.gradient} , #FFFFFF)`,
                                        borderColor: colorcode.theme,
                                        // color: colorcode.theme,
                                      }}
                                    />
                                    <ul class="list-disc list-inside py-[1vw]">
                                      <li className="text-[1vw] pb-[0.5vw]">
                                        Enter your UPI ID and click on Pay Now.
                                      </li>
                                      <li className="text-[1vw] pb-[0.5vw]">
                                        You will receive a payment request from
                                        Payment Gateway in your UPI App.
                                      </li>
                                      <li className="text-[1vw] pb-[0.5vw]">
                                        Login to UPI app by entering your mpin &
                                        authorize payment.
                                      </li>
                                    </ul>
                                    <button
                                      className=" w-[20vw] h-[2.5vw] rounded-[0.5vw] mt-[0.8vw] flex items-center justify-center"
                                      style={{
                                        backgroundColor: colorcode.theme,
                                      }}
                                    >
                                      <span className="text-white text-[1.1vw] font-semibold">
                                        Proceed to Pay{" "}
                                        {`₹ ${
                                          Number(discount) +
                                          Number(Math.round(discount * 0.03))
                                        }`}
                                      </span>
                                      <span className="pl-[0.5vw]">
                                        <RiArrowRightDoubleLine
                                          size={"1.7vw"}
                                          color="white"
                                        />
                                      </span>
                                    </button>
                                  </Form>
                                )}
                              </Formik>
                            </>
                          ) : paymenttype == "card" ? (
                            <div>
                              <p
                                className="text-[1.2vw] font-bold"
                                // style={{ color: colorcode.theme }}
                              >
                                Enter Your Card Details
                              </p>
                              <Formik
                                initialValues={{
                                  mobile: "",
                                  age: "",
                                  email: "",
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
                                {({ isSubmitting }) => (
                                  <Form className="">
                                    <Field
                                      type="text"
                                      name="name"
                                      placeholder="XXXX-XXXX-XXXX-XXXX"
                                      className="border-r-[0.5vw] border-[.1vw]  mt-[1vw] mb-[2vw]  text-[1.2vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none px-[1vw] "
                                      style={{
                                        // background: `linear-gradient(to right,${colorcode.gradient} , #FFFFFF)`,
                                        borderColor: colorcode.theme,
                                        // color: colorcode.theme,
                                      }}
                                    />
                                    <div className="grid grid-cols-3 gap-[1vw] pb-[2vw]">
                                      <div className="col-span-1">
                                        <Field
                                          as="select"
                                          name="month"
                                          style={{
                                            // background: `linear-gradient(to right,${colorcode.gradient} , #FFFFFF)`,
                                            borderColor: colorcode.theme,
                                            // color: colorcode.theme,
                                          }}
                                          className="border-r-[0.5vw] border-[.1vw]   text-[1vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none px-[0.5vw] "
                                        >
                                          <option
                                            label="Month"
                                            value="Month"
                                            className=""
                                          />
                                        </Field>
                                      </div>
                                      <div className="col-span-1">
                                        <Field
                                          as="select"
                                          name="month"
                                          style={{
                                            // background: `linear-gradient(to right,${colorcode.gradient} , #FFFFFF)`,
                                            borderColor: colorcode.theme,
                                            // color: colorcode.theme,
                                          }}
                                          className="border-r-[0.5vw]  border-[.1vw]  text-[1vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none px-[0.5vw] "
                                        >
                                          <option
                                            label="Year"
                                            value="Year"
                                            className=""
                                          />
                                        </Field>
                                      </div>
                                      <div className="col-span-1">
                                        <Field
                                          type="text"
                                          name="name"
                                          style={{
                                            // background: `linear-gradient(to right,${colorcode.gradient} , #FFFFFF)`,
                                            borderColor: colorcode.theme,
                                            // color: colorcode.theme,
                                          }}
                                          placeholder="CVV"
                                          className="border-r-[0.5vw]  border-[.1vw] text-[1.2vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none px-[1vw] "
                                        />
                                      </div>
                                    </div>

                                    <Field
                                      type="text"
                                      name="name"
                                      placeholder="Card name"
                                      className="border-r-[0.5vw] mb-[1vw]  border-[.1vw] text-[1.2vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none px-[1vw] "
                                      style={{
                                        // background: `linear-gradient(to right,${colorcode.gradient} , #FFFFFF)`,
                                        borderColor: colorcode.theme,
                                        // color: colorcode.theme,
                                      }}
                                    />
                                    <button
                                      className="w-[20vw] h-[2.5vw] rounded-[0.5vw] mt-[0.8vw] flex items-center justify-center"
                                      style={{
                                        backgroundColor: colorcode.theme,
                                      }}
                                    >
                                      <span className="text-white text-[1.1vw] font-semibold">
                                        Proceed to Pay{" "}
                                        {`₹ ${
                                          Number(discount) +
                                          Number(Math.round(discount * 0.03))
                                        }`}
                                      </span>
                                      <span className="pl-[0.5vw]">
                                        <RiArrowRightDoubleLine
                                          size={"1.7vw"}
                                          color="white"
                                        />
                                      </span>
                                    </button>
                                  </Form>
                                )}
                              </Formik>{" "}
                            </div>
                          ) : paymenttype == "bank" ? (
                            <div>
                              <p
                                className="text-[1.2vw] font-bold"
                                // style={{ color: colorcode.theme }}
                              >
                                Popular bank
                              </p>
                              {/* {banklist.map((item, index) => {
                          return (
                            <div className="flex items-center ">
                              <img
                                src={item.logo}
                                className={`${
                                  item.bank == "State Bank of India"
                                    ? "h-[2vw] w-[3.5vw] "
                                    : item.bank == "Kotak Bank"
                                    ? "h-[2vw] w-[3.5vw] mt-[0.5vw]"
                                    : item.bank == "Axis Bank"
                                    ? "h-[3vw] w-[3.5vw]"
                                    : item.bank == "HDFC Bank"
                                    ? "h-[1.5vw] w-[1.5vw] mr-[1vw]"
                                    : "h-[2.5vw] w-[2.5vw]"
                                }`}
                              />
                              <p className="text-[1vw]">{item.bank}</p>
                            </div>
                          );
                        })} */}
                          {/* <div className="flex items-center mt-[1vw]">
                                <img
                                  src={banklist[0].logo}
                                  className={`h-[2vw] w-[3.5vw]`}
                                />
                                <p className="text-[1vw]">{banklist[0].bank}</p>
                              </div>
                              <div className="flex gap-[1vw] items-center  mt-[0.5vw]">
                                <div className="flex items-center ">
                                  <img
                                    src={banklist[1].logo}
                                    className={`h-[2vw] w-[3.5vw]`}
                                  />
                                  <p className="text-[1vw]">
                                    {banklist[1].bank}
                                  </p>
                                </div>
                                <div className="flex items-center ">
                                  <img
                                    src={banklist[2].logo}
                                    className={`h-[3vw] w-[3.5vw]`}
                                  />
                                  <p className="text-[1vw]">
                                    {banklist[2].bank}
                                  </p>
                                </div>
                              </div>
                              <div className="flex gap-[1vw] ">
                                <div
                                  className={`flex items-center pl-[1vw] mt-[0.2vw] ${
                                    selectbank == "HDFC Bank"
                                      ? "border-[#1F487C] border-[0.1vw] rounded-[0.5vw]"
                                      : ""
                                  }`}
                                  onClick={() => setSelectBank("")}
                                >
                                  <img
                                    src={banklist[3].logo}
                                    className={`h-[1.5vw] w-[1.5vw]`}
                                  />
                                  <p className="text-[1vw] pl-[1vw]">
                                    {banklist[3].bank}
                                  </p>
                                </div>
                                <div className="flex items-center mt-[0.5vw] mb-[0.4vw]">
                                  <img
                                    src={banklist[4].logo}
                                    className={`h-[2.5vw] w-[3.5vw]`}
                                  />
                                  <p className="text-[1vw]">
                                    {banklist[4].bank}
                                  </p>
                                </div>
                              </div>
                              <Formik
                                initialValues={{
                                  mobile: "",
                                  age: "",
                                  email: "",
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
                                {({ isSubmitting }) => (
                                  <Form className="">
                                    <label className="text-[1vw] font-semibold">
                                      Other Bank Name
                                    </label>
                                    <Field
                                      type="text"
                                      name="name"
                                      placeholder="Enter Bank Name"
                                      className="border-r-[0.5vw] mb-[1vw]  border-[.1vw] text-[1.2vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none px-[1vw] "
                                      style={{
                                        // background: `linear-gradient(to right,${colorcode.gradient} , #FFFFFF)`,
                                        borderColor: colorcode.theme,
                                        // color: colorcode.theme,
                                      }}
                                    />
                                    <button
                                      className="w-[20vw] h-[2.5vw] rounded-[0.5vw] mt-[0.4vw] flex items-center justify-center"
                                      style={{
                                        backgroundColor: colorcode.theme,
                                      }}
                                    >
                                      <span className="text-white text-[1.1vw] font-semibold">
                                        Proceed to Pay{" "}
                                        {`₹ ${
                                          Number(discount) +
                                          Number(Math.round(discount * 0.03))
                                        }`}
                                      </span>
                                      <span className="pl-[0.5vw]">
                                        <RiArrowRightDoubleLine
                                          size={"1.7vw"}
                                          color="white"
                                        />
                                      </span>
                                    </button>
                                  </Form>
                                )}
                              </Formik>{" "}
                            </div>
                          ) : (
                            <div>
                              <p
                                className=" text-[1.2vw] font-bold"
                                // style={{ color: colorcode.theme }}
                              >
                                Enter Your Card Details
                              </p>
                              <Formik
                                initialValues={{
                                  mobile: "",
                                  age: "",
                                  email: "",
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
                                {({ isSubmitting }) => (
                                  <Form className="">
                                    <Field
                                      type="text"
                                      name="name"
                                      placeholder="XXXX-XXXX-XXXX-XXXX"
                                      className="border-r-[0.5vw] border-black border-[.1vw] mt-[1vw] mb-[2vw] text-[1.2vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none px-[1vw] "
                                      style={{
                                        // background: `linear-gradient(to right,${colorcode.gradient} , #FFFFFF)`,
                                        borderColor: colorcode.theme,
                                        // color: colorcode.theme,
                                      }}
                                    />
                                    <div className="grid grid-cols-3 gap-[1vw] pb-[2vw]">
                                      <div className="col-span-1">
                                        <Field
                                          as="select"
                                          name="month"
                                          style={{
                                            // background: `linear-gradient(to right,${colorcode.gradient} , #FFFFFF)`,
                                            borderColor: colorcode.theme,
                                            // color: colorcode.theme,
                                          }}
                                          className="border-r-[0.5vw] border-[.1vw]  text-[1vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none px-[0.5vw] "
                                        >
                                          <option
                                            label="Month"
                                            value="Month"
                                            className=""
                                          />
                                        </Field>
                                      </div>
                                      <div className="col-span-1">
                                        <Field
                                          as="select"
                                          name="month"
                                          style={{
                                            // background: `linear-gradient(to right,${colorcode.gradient} , #FFFFFF)`,
                                            borderColor: colorcode.theme,
                                            // color: colorcode.theme,
                                          }}
                                          className="border-r-[0.5vw] border-[.1vw]   text-[1vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none px-[0.5vw] "
                                        >
                                          <option
                                            label="Year"
                                            value="Year"
                                            className=""
                                          />
                                        </Field>
                                      </div>
                                      <div className="col-span-1">
                                        <Field
                                          type="text"
                                          name="name"
                                          placeholder="CVV"
                                          style={{
                                            // background: `linear-gradient(to right,${colorcode.gradient} , #FFFFFF)`,
                                            borderColor: colorcode.theme,
                                            // color: colorcode.theme,
                                          }}
                                          className="border-r-[0.5vw] border-[.1vw]  text-[1.2vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none px-[1vw] "
                                        />
                                      </div>
                                    </div>

                                    <Field
                                      type="text"
                                      name="name"
                                      style={{
                                        // background: `linear-gradient(to right,${colorcode.gradient} , #FFFFFF)`,
                                        borderColor: colorcode.theme,
                                        // color: colorcode.theme,
                                      }}
                                      placeholder="Card name"
                                      className="border-r-[0.5vw] border-[.1vw] text-[1.2vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none px-[1vw] "
                                    />
                                    <button
                                      className=" w-[20vw] h-[2.5vw] rounded-[0.5vw] mt-[0.8vw] flex items-center justify-center"
                                      style={{
                                        backgroundColor: colorcode.theme,
                                      }}
                                    >
                                      <span className="text-white text-[1.1vw] font-semibold">
                                        Proceed to Pay{" "}
                                        {`₹ ${
                                          Number(discount) +
                                          Number(Math.round(discount * 0.03))
                                        }`}
                                      </span>
                                      <span className="pl-[0.5vw]">
                                        <RiArrowRightDoubleLine
                                          size={"1.7vw"}
                                          color="white"
                                        />
                                      </span>
                                    </button>
                                  </Form>
                                )}
                              </Formik>{" "}
                            </div>
                          )}
                        </div>  */}
                          {/* </div> */}
                        </div>
                        <div
                          className={`${
                            busdetails.bus_type_status === "luxury"
                              ? "bg-[#FFEEC9]"
                              : "bg-white"
                          } col-span-1 h-[25vw] w-full  rounded-[0.5vw] pb-[2vw]`}
                          style={{ boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)" }}
                        >
                          <div className="grid grid-rows-10 h-[30vw] w-full gap-[2vw]">
                            <div
                              className="row-span-4 h-[25vw] w-full  rounded-[0.5vw] pb-[2vw]"
                              style={{
                                boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
                              }}
                            >
                              <h1
                                className="text-[1.5vw] font-semibold bg-gradient-to-r px-[1vw] py-[0.5vw] "
                                style={{
                                  color:
                                    busdetails.bus_type_status === "luxury"
                                      ? "#393939"
                                      : colorcode.theme,
                                }}
                              >
                                Fare Details
                              </h1>
                              <div className="px-[1vw] flex justify-between">
                                <p className="text-[1vw]">Base Fare</p>
                                <p className="text-[1vw]">₹ {discount}</p>
                              </div>
                              <div className="px-[1vw] flex justify-between">
                                <p className="text-[1vw]">GST 3%</p>
                                <p className="text-[1vw]">
                                  + ₹ {Math.round(discount * 0.03)}
                                </p>
                              </div>
                              <button
                                className="w-full h-[2.5vw] rounded-b-[0.5vw] mt-[16.3vw] flex items-center justify-between px-[1vw]"
                                style={{
                                  backgroundColor:
                                    busdetails.bus_type_status === "luxury"
                                      ? "#393939"
                                      : colorcode.theme,
                                }}
                                onClick={() => {
                                  setProceed(true);
                                  handleBookingPrice();
                                }}
                              >
                                <span className="text-white text-[1.1vw] font-semibold">
                                  Proceed to Pay{" "}
                                  {`₹ ${
                                    Number(discount) +
                                    Number(Math.round(discount * 0.03))
                                  }`}
                                </span>
                                <span className="pl-[0.5vw]">
                                  <RiArrowRightDoubleLine
                                    size={"1.7vw"}
                                    color="white"
                                  />
                                </span>
                              </button>
                            </div>
                            <div className="h-[2vw] w-full">
                              <div className="">
                                {/* <button
                                      className=" w-[20vw] h-[2.5vw] rounded-[0.5vw] mt-[0.8vw] flex items-center justify-center"
                                      style={{
                                        backgroundColor: colorcode.theme,
                                      }}
                                    >
                                      <span className="text-white text-[1.1vw] font-semibold">
                                        Proceed to Pay{" "}
                                        {`₹ ${
                                          Number(discount) +
                                          Number(Math.round(discount * 0.03))
                                        }`}
                                      </span>
                                      <span className="pl-[0.5vw]">
                                        <RiArrowRightDoubleLine
                                          size={"1.7vw"}
                                          color="white"
                                        />
                                      </span>
                                    </button> */}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              ) : (
                <div
                  className={`${
                    busdetails.bus_type_status === "luxury"
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
                          busdetails.bus_type_status === "luxury"
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
                      <div className="grid grid-cols-6 w-full h-[18vw]">
                        <div className="col-span-2 w-[100%] h-full flex">
                          <div className="w-[80%] h-full items-center justify-center flex flex-col">
                            <div className="h-[60%] flex justify-center items-center">
                              <img
                                src={operatorlogo}
                                className="w-[5vw] h-[5vw] rounded-full"
                              />
                            </div>
                            <div className="flex flex-col h-[40%] items-center ">
                              <p
                                className="text-[1vw] font-bold"
                                style={{
                                  color:
                                    busdetails.bus_type_status === "luxury"
                                      ? "#393939"
                                      : colorcode.theme,
                                }}
                              >
                                {seatplatform}
                              </p>
                              <p
                                className={`${
                                  busdetails.bus_type_status === "luxury"
                                    ? "text-[#393939]"
                                    : "text-[#1F487C]"
                                } text-[1vw]`}
                                // style={{ color: colorcode.theme }}
                              >
                                {ticketDetail?.Bus_Type}
                              </p>
                            </div>
                          </div>
                          <div className="w-[20%] h-full  py-[1vw] flex justify-center">
                            {/* <img src={bus_complete} className="h-full w-full " /> */}
                            <div
                              className="border-dashed border-r-[0.1vw] h-[90%] relative"
                              style={{
                                borderColor:
                                  busdetails.bus_type_status === "luxury"
                                    ? "#393939"
                                    : colorcode.theme,
                              }}
                            >
                              <FaBus
                                className=" absolute top-[-0.5vw] left-[-0.7vw]"
                                style={{
                                  color:
                                    busdetails.bus_type_status === "luxury"
                                      ? "#393939"
                                      : colorcode.theme,
                                }}
                                size={"1.5vw"}
                              />
                              <div className="absolute top-[6vw] left-[-0.5vw]">
                                <div
                                  className="h-[1vw] w-[1vw] border-[0.1vw] rounded-full"
                                  style={{
                                    borderColor:
                                      busdetails.bus_type_status === "luxury"
                                        ? "#393939"
                                        : colorcode.theme,
                                    backgroundColor:
                                      busdetails.bus_type_status === "luxury"
                                        ? "#FFEEC9"
                                        : "#ffffff",
                                  }}
                                ></div>
                              </div>{" "}
                              <FaMapMarkerAlt
                                size={"1.5vw"}
                                style={{
                                  color:
                                    busdetails.bus_type_status === "luxury"
                                      ? "#393939"
                                      : colorcode.theme,
                                }}
                                className="absolute left-[-0.7vw] bottom-[-1.2vw]"
                              />
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
                                        busdetails.bus_type_status === "luxury"
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
                                        busdetails.bus_type_status === "luxury"
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
                                        busdetails.bus_type_status === "luxury"
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
                                    <div
                                      className={`${
                                        busdetails.bus_type_status === "luxury"
                                          ? "bg-[#393939]"
                                          : "bg-[#1F487C]"
                                      } absolute left-0 h-[0.5vw] w-[0.5vw] rounded-full`}
                                    ></div>
                                    <div
                                      className={`${
                                        busdetails.bus_type_status === "luxury"
                                          ? "border-[#393939]"
                                          : "border-[#1F487C]"
                                      } border-[0.15vw] absolute left-0 top-[2.1vw] border-dashed w-[18vw]`}
                                    ></div>
                                    <div
                                      className={`${
                                        busdetails.bus_type_status === "luxury"
                                          ? "bg-[#393939]"
                                          : "bg-[#1F487C]"
                                      } relative h-[2.1vw] flex w-[5.5vw] rounded-tl-[0.8vw] rounded-tr-[0.8vw] rounded-bl-[0.3vw] 
                                rounded-br-[0.3vw] text-white text-[1vw] font-bold justify-center items-center`}
                                      // style={{
                                      //   zIndex: 2,
                                      // }}
                                    >
                                      {busdetails?.time_duration}
                                      <div
                                        className={`${
                                          busdetails.bus_type_status ===
                                          "luxury"
                                            ? "bg-[#393939]"
                                            : "bg-[#1F487C]"
                                        } absolute bottom-[-0.8vw] left-[0.8vw] h-[1.3vw] w-[1.3vw] rounded-full flex items-center justify-center `}
                                        // style={{
                                        //   zIndex: 1,
                                        // }}
                                      >
                                        <div className="bg-white h-[0.4vw] w-[0.4vw] rounded-full"></div>
                                      </div>
                                      <div
                                        className={`${
                                          busdetails.bus_type_status ===
                                          "luxury"
                                            ? "bg-[#393939]"
                                            : "bg-[#1F487C]"
                                        } absolute bottom-[-0.8vw] right-[0.8vw] h-[1.3vw] w-[1.3vw] rounded-full flex items-center justify-center `}
                                      >
                                        <div className="bg-white h-[0.4vw] w-[0.4vw] rounded-full"></div>
                                      </div>
                                    </div>
                                    <FaAngleRight
                                      color={`${
                                        busdetails.bus_type_status === "luxury"
                                          ? "#393939"
                                          : "#1F487C"
                                      }`}
                                      size={"1vw"}
                                      className="absolute right-0"
                                    />
                                  </div>
                                  {/* <img
                                    src={bus_comp}
                                    className="h-[3.5vw] w-[22vw] "
                                  />
                                  <p
                                    className={`${
                                      busdetails.bus_type_status === "luxury"
                                        ? "text-[#393939]"
                                        : "text-[#1F487C]"
                                    } text-[1.1vw] font-bold text-center`}
                                    // style={{ color: colorcode.theme }}
                                  >
                                    {ticketDetail?.duration}
                                  </p> */}
                                </div>
                                <div className="col-span-1">
                                  <div className="flex flex-col text-right pr-[1vw]">
                                    <p
                                      className={`${
                                        busdetails.bus_type_status === "luxury"
                                          ? "text-[#393939]"
                                          : "text-[#1F487C]"
                                      } pt-[0.5vw] text-[0.8vw]`}
                                      // style={{ color: colorcode.theme }}
                                    >
                                      {/* {dayjs(bus[busIndex]?.Bus_arrival_date).format(
                                "DD MMM"
                              )} */}
                                      {dayjs(ticketDetail?.arrival_date).format(
                                        "DD MMM"
                                      )}
                                    </p>
                                    <p
                                      className={`${
                                        busdetails.bus_type_status === "luxury"
                                          ? "text-[#393939]"
                                          : "text-[#1F487C]"
                                      } text-[1.2vw] font-bold`}
                                      // style={{ color: colorcode.theme }}
                                    >
                                      {/* {item.bus_arr} */}
                                      {/* {bus[busIndex]?.Bus_Arrival_time} */}
                                      {ticketDetail?.arrival_time}
                                    </p>
                                    <p
                                      className={`${
                                        busdetails.bus_type_status === "luxury"
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
                            <div className="row-span-2 flex justify-between px-[1vw] ">
                              <div className="flex flex-col  ">
                                <p className="text-[1vw] ">
                                  Boarding Point & Time
                                </p>
                                <p
                                  className={`${
                                    busdetails.bus_type_status === "luxury"
                                      ? "text-[#393939]"
                                      : "text-[#1F487C]"
                                  }  font-bold text-[1.2vw]`}
                                  // style={{ color: colorcode.theme }}
                                >
                                  {/* {`${selectedRoutes?.dep_route} : ${dayjs(
                                  selectedRoutes?.dep_time
                                ).format("DD MMM, HH:mm")}`} */}
                                  {`${
                                    ticketDetail?.Pickup_Point_and_Time
                                  } : ${dayjs(selectedRoutes?.dep_time).format(
                                    "HH:mm"
                                  )}`}
                                </p>
                              </div>
                              <div className="flex flex-col  items-center">
                                <p className="text-[1vw] ">Seat Number(s)</p>
                                <p
                                  className={`${
                                    busdetails.bus_type_status === "luxury"
                                      ? "text-[#393939]"
                                      : "text-[#1F487C]"
                                  }  font-bold text-[1.1vw]`}
                                  // style={{ color: colorcode.theme }}
                                >
                                  {selectedSeats}
                                </p>
                              </div>
                            </div>
                            <div className="row-span-2 flex px-[1vw] justify-between ">
                              <div className="flex flex-col  ">
                                <p className="text-[1vw] ">
                                  Dropping Point & Time
                                </p>
                                <p
                                  className={`${
                                    busdetails.bus_type_status === "luxury"
                                      ? "text-[#393939]"
                                      : "text-[#1F487C]"
                                  }  font-bold text-[1.1vw]`}
                                  // style={{ color: colorcode.theme }}
                                >
                                  {`${
                                    ticketDetail?.Dropping_Point_Time
                                  } : ${dayjs(selectedRoutes?.arr_time).format(
                                    "HH:mm"
                                  )}`}
                                </p>
                              </div>
                              <div className="relative">
                                {busdetails.bus_type_status === "luxury" ? (
                                  <img
                                    src={amountView}
                                    className="w-[9vw] h-[3.5vw]"
                                  />
                                ) : (
                                  <img
                                    src={ticketview}
                                    className="w-[9vw] h-[3.5vw]"
                                  />
                                )}
                                <p className="text-[1.5vw] font-bold text-white absolute left-[2.8vw] top-[0.8vw]">
                                  {`₹ ${
                                    Number(discount) +
                                    Number(Math.round(discount * 0.03))
                                  }`}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="h-auto w-full px-[1vw] pt-[1vw]">
                      {/* <p className="text-[1.4vw] font-bold">Traveller Details:</p>
                    <div className="flex justify-between text-[1.2vw] font-bold pt-[1.5vw]">
                      <div className="flex-1">Name</div>
                      <div className="flex-1">Age</div>
                      <div className="flex-1">Gender</div>
                    </div>
                    {Object.keys(travelerDetails).map((key) => (
                      <div
                        key={key}
                        className="flex justify-between text-[1.2vw] pt-[1vw]"
                      >
                        <div className="flex-1">
                          {capitalizeFirstLetter(
                            travelerDetails[key].user_name
                          )}
                        </div>
                        <div className="flex-1">{travelerDetails[key].age}</div>
                        <div className="flex-1">
                          {capitalizeFirstLetter(travelerDetails[key].gender)}
                        </div>
                      </div>
                    ))} */}

                      {/* <div className="pt-[1.5vw]">
                      <p className="text-[1.4vw] font-bold">
                        Contact Details :{" "}
                      </p>
                      <div class="flex text-[1.2vw] font-medium pt-[1vw]">
                        <div class="flex w-14 pt-[0.3vw]">
                          <FaPhoneFlip color="#1F487C" />
                        </div>
                        <div class="flex w-64">{bookingId?.email_id}</div>
                      </div>
                      <div class="flex text-[1.2vw] font-medium pt-[1vw]">
                        <div class="flex w-14 pt-[0.3vw]">
                          <MdEmail
                            style={{
                              height: "1.5vw",
                              width: "1.5vw",
                              color: "#1F487C",
                            }}
                          />
                        </div>
                        <div class="flex w-64">{bookingId?.mobile_number}</div>
                      </div>
                    </div> */}
                      <div className="grid grid-row-3 w-full h-full gap-[1vw]">
                        <div
                          className={`${
                            busdetails.bus_type_status === "luxury"
                              ? "border-[#393939]"
                              : "border-[#1F487C]"
                          } border-dashed border-2`}
                        ></div>
                        <div className="row-span-1 py-[1vw]">
                          {ticketDetail?.passenger?.length > 0 &&
                            ticketDetail?.passenger.map((passenger, index) => (
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
                                      busdetails.bus_type_status === "luxury"
                                        ? "bg-[#FFEEC9]"
                                        : "bg-white"
                                    } border-r-[0.5vw] border-[0.1vw] text-[1.2vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none px-[1vw] relative`}
                                    style={{
                                      //background: `linear-gradient(to right,${colorcode.gradient} , #FFFFFF)`,
                                      borderColor:
                                        busdetails.bus_type_status === "luxury"
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
                                            busdetails.bus_type_status ===
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
                                                  busdetails.bus_type_status ===
                                                  "luxury"
                                                    ? "#393939"
                                                    : busdetails.bus_type_status ===
                                                      "regular"
                                                    ? colorcode.theme
                                                    : "",
                                              }
                                            : {
                                                //background: `linear-gradient(to right,${colorcode.gradient} , #FFFFFF)`,
                                                color:
                                                  busdetails.bus_type_status ===
                                                  "luxury"
                                                    ? "#393939"
                                                    : busdetails.bus_type_status ===
                                                      "regular"
                                                    ? colorcode.theme
                                                    : "",
                                                borderColor:
                                                  travelerDetails[index]
                                                    ?.gender === "male" ||
                                                  !travelerDetails[index]
                                                    ? busdetails.bus_type_status ===
                                                      "luxury"
                                                      ? "#393939"
                                                      : colorcode.theme
                                                    : "",
                                              }),
                                        }}
                                        className={`${
                                          passenger?.gender === "male"
                                            ? busdetails.bus_type_status ===
                                              "luxury"
                                              ? "text-[#ffff] border-[#393939]"
                                              : busdetails.bus_type_status ===
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
                                                  busdetails.bus_type_status ===
                                                  "luxury"
                                                    ? "#393939"
                                                    : busdetails.bus_type_status ===
                                                      "regular"
                                                    ? colorcode.theme
                                                    : "",
                                              }
                                            : {
                                                color:
                                                  busdetails.bus_type_status ===
                                                  "luxury"
                                                    ? "#393939"
                                                    : colorcode.theme,
                                                borderColor:
                                                  travelerDetails[index]
                                                    ?.gender === "female" ||
                                                  !travelerDetails[index]
                                                    ? busdetails.bus_type_status ===
                                                      "luxury"
                                                      ? "#393939"
                                                      : colorcode.theme
                                                    : "",
                                              }),
                                        }}
                                        className={`${
                                          passenger?.gender === "female"
                                            ? busdetails.bus_type_status ===
                                              "luxury"
                                              ? "text-[#ffff] border-[#393939]"
                                              : busdetails.bus_type_status ===
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
                                        Female
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
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
                                    busdetails.bus_type_status === "luxury"
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
                                    busdetails.bus_type_status === "luxury"
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
                                      busdetails.bus_type_status === "luxury"
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
                                    busdetails.bus_type_status === "luxury"
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
                          className={`${
                            busdetails.bus_type_status === "luxury"
                              ? "border-[#393939]"
                              : "border-[#1F487C]"
                          } border-dashed border-2`}
                        ></div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between pl-[1vw] pr-[2vw] pt-[1vw]">
                      <div>
                        <Barcode
                          value={generateRandomId("AXER", 12)}
                          width={3}
                          height={70}
                          lineColor={
                            busdetails.bus_type_status === "luxury"
                              ? "#393939"
                              : colorcode.theme
                          }
                        />
                      </div>
                      {/* <img
                    className="h-[6vw] w-[6vw] cursor-pointer"
                    src={require("../../assets/download.png")}
                    onClick={generatePDF}
                  /> */}
                      {/* <div className="cursor-pointer pr-[2vw] pb-[2vw]">
                    <div className="border-[.6vw] absolute h-[6vw] w-[6vw] rounded-[50%] border-fuchsia-600"></div>
                    <div className="bg-red-600 relative h-[5vw] w-[5vw] left-[.5vw] top-[.9vw]  rounded-[50%] flex justify-center items-center ">
                    
                    <span><FiDownload size={35} color="white"/></span>
                    </div>
                  </div> */}
                      <div
                        className="cursor-pointer pr-[2vw] pb-[2vw] "
                        onClick={generatePDF}
                      >
                        <div
                          className="border-[.6vw] h-[6vw] w-[6vw] rounded-[50%]"
                          style={{
                            borderColor:
                              busdetails.bus_type_status === "luxury"
                                ? "#39393983"
                                : colorcode.gradient,
                          }}
                        >
                          <div
                            className="bg-red-600 relative h-[5vw] w-[5vw] right-[.1vw] bottom-[.1vw] rounded-[50%] flex justify-center items-center "
                            style={{
                              backgroundColor:
                                busdetails.bus_type_status === "luxury"
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
              )}
            </div>
          </Drawer>
        </div>
        <div className="md:hidden block w-full">
          <DrawerMobile />
        </div>
      </div>

      <ModalPopup
        show={ratingModal}
        onClose={closeRatingModal}
        height="40vw"
        width="37.5vw"
        padding="0px"
      >
        <RatingFeedBack />
      </ModalPopup>
    </>
  );
}

export default DrawerDetails;
