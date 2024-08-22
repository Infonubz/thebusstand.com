import React, { useEffect, useState } from "react";
import { Button, Drawer, Radio, Space } from "antd";
import complete from "../../assets/complete.png";
import ticketbus from "../../assets/ticketbus.png";
import bus_complete from "../../assets/bus_complete.png";
import bus_comp from "../../assets/bus_comp.png";
import redbus from "../../assets/redbus.png";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "../../App.css";
import { FaBus } from "react-icons/fa6";
import { RiArrowRightDoubleLine, RiMapPin3Line } from "react-icons/ri";
import { FaFileDownload, FaMapMarkerAlt } from "react-icons/fa";
import ticketview from "../../assets/ticket_view.png";
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
const validationSchema = Yup.object().shape({
  mobile: Yup.string()
    .matches(/^[0-9]+$/, "Mobile number must be a number")
    .min(10, "Mobile number must be at least 10 digits")
    .max(10, "Mobile number maximum 10 digits only")
    .required("Mobile Number is required"),
  age: Yup.number()
    .required("Age is required")
    .min(3, "Age must be at least 3 years")
    .max(100, "Age cannot exceed 100 years"),
  email: Yup.string()
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Invalid email address format"
    )
    .required("Email is required"),
  name: Yup.string().required("Name is required"),
  terms: Yup.bool().oneOf([true], "Terms must be accepted"),
});
const upivalidationSchema = Yup.object().shape({
  upiId: Yup.string()
    // .matches(
    //   /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(@upi)$/,
    //   "Invalid UPI ID format"
    // )
    .required("UPI ID is required"),
});
function DrawerDetails({
  modalshow,
  setShowModal,
  busdetails,
  seatplatform,
  type,
  busprice,
  selectedSeats,
  selectedRoutes,
  logo,
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
  const [open, setOpen] = useState(true);
  const [placement, setPlacement] = useState("right");
  const [paymenttype, setPaymentType] = useState("upi");
  const [registerfulldetails, setRegisterFullDetails] = useState({});
  const [selectbank, setSelectBank] = useState("");
  const [upiId, setUpiId] = useState("");
  const [sumbitbutton, setSubmitButoon] = useState(false);
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

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setShowModal(false);
  };
  const onChange = (e) => {
    setPlacement(e.target.value);
  };

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
        sex: localStorage.getItem("sex"),
        name: localStorage.getItem("name"),
      });
    }
  }, []);

  const colorcode = platformTheme(seatplatform);

  const green = "#c3eee1";

  return (
    <div>
      <div className=" md:block hidden">
        <Drawer
          // title="Basic Drawer"
          placement={placement}
          closable={false}
          onClose={onClose}
          open={modalshow}
          key={placement}
          width={"60%"}
        >
          {upiId == "" ? (
            <div>
              <div className="flex gap-[0.5vw] items-center"></div>
              <div className="px-[2px] ">
                <div
                  className="h-[20vw] w-full F rounded-[0.5vw]"
                  style={{ boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)" }}
                >
                  <div className="flex h-[4vw] w-full px-[1vw] pt-[0.5vw] mb-4 rounded-b-[1vw]"
                   style={{backgroundColor:colorcode.theme}}>
                    <img src={complete} className="h-[2.5vw] w-[2.5vw]" />
                    <div className="h-[2vw]" 
                   >
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
                            {busdetails?.Bus_type}
                          </p>
                        </div>
                      </div>
                      <div className="w-[20%] h-full  py-[1vw] flex justify-center">
                        {/* <img src={bus_complete} className="h-full w-full " /> */}
                        <div className="border-dashed border-r-[0.1vw] h-[90%] relative"
                        //  style={{borderColor:colorcode.theme}}
                         >
                          <FaBus
                            className=" absolute top-[-0.5vw] left-[-0.7vw]"
                            // style={{color:colorcode.theme}}
                            size={"1.5vw"}
                          />
                          <div className=" absolute top-[6vw] left-[-0.5vw]">
                            <div className="h-[1vw] w-[1vw] border-[0.1vw] bg-white rounded-full" 
                            //  style={{borderColor:colorcode.theme}}
                            ></div>
                          </div>{" "}
                          <FaMapMarkerAlt
                            size={"1.5vw"}
                            // style={{color:colorcode.theme}}
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
                                  {dayjs(busdetails?.Bus_depature_date).format(
                                    "DD MMM"
                                  )}
                                </p>
                                <p
                                  className="font-bold  text-[1.2vw]"
                                  // style={{
                                  //   color: colorcode.theme,
                                  // }}
                                >
                                  {/* {item.bus_depature} */}
                                  {/* {bus[busIndex]?.Bus_Depature_time} */}
                                  {busdetails?.Bus_Depature_time}
                                </p>
                                <p
                                  className=" text-[0.9vw] "
                                  // style={{
                                  //   color: colorcode.theme,
                                  // }}
                                >
                                  {/* {bus[busIndex]?.Bus_Depature_place} */}
                                  {busdetails?.Bus_Depature_place}
                                </p>
                              </div>
                            </div>
                            <div className="col-span-2 flex-col mt-[0.5vw] items-center w-full justify-center">
                              <img
                                src={bus_comp}
                                className="h-[3.5vw] w-[22vw] "
                              />
                              <p
                                className="text-center text-[1vw] font-bold"
                                // style={{
                                //   color: colorcode.theme,
                                // }}
                              >
                                {/* {item.bus_travel_time} */}
                                {/* {bus[busIndex]?.Bus_travel_time} */}
                                {busdetails?.Bus_travel_time}
                              </p>
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
                                  {dayjs(busdetails?.Bus_arrival_date).format(
                                    "DD MMM"
                                  )}
                                </p>
                                <p
                                  className="font-bold r text-[1.2vw] "
                                  // style={{
                                  //   color: colorcode.theme,
                                  // }}
                                >
                                  {/* {item.bus_arr} */}
                                  {/* {bus[busIndex]?.Bus_Arrival_time} */}
                                  {busdetails?.Bus_Arrival_time}
                                </p>
                                <p
                                  className=" text-[0.9vw] "
                                  // style={{
                                  //   color: colorcode.theme,
                                  // }}
                                >
                                  {/* {bus[busIndex]?.Bus_Arrival_place} */}
                                  {busdetails?.Bus_Arrival_place}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="row-span-2 flex justify-between px-[1vw] ">
                          <div className="flex flex-col  ">
                            <p className="text-[1vw] ">Boarding Point & Time</p>
                            <p
                              className=" text-[1.1vw] font-semibold"
                              // style={{
                              //   color: colorcode.theme,
                              // }}
                            >
                              {`${selectedRoutes?.dep_route} : ${selectedRoutes?.dep_time}`}
                            </p>
                          </div>
                          <div className="flex flex-col  items-center">
                            <p className="text-[1vw] ">Seat Number(s)</p>
                            <p
                              className="text-[1.1vw] font-semibold"
                              // style={{
                              //   color: colorcode.theme,
                              // }}
                            >
                              {selectedSeats}
                            </p>
                          </div>
                        </div>
                        <div className="row-span-2 flex px-[1vw] justify-between ">
                          <div className="flex flex-col  ">
                            <p className="text-[1vw] ">Dropping Point & Time</p>
                            <p
                              className="text-[1.1vw] font-semibold"
                              // style={{
                              //   color: colorcode.theme,
                              // }}
                            >
                              {`${selectedRoutes?.arri_route} : ${selectedRoutes?.arr_time}`}
                            </p>
                          </div>
                          <div className="relative">
                            <img
                              src={ticketview}
                              className="w-[9vw] h-[3.5vw]"
                            />
                            <p className="text-[1.5vw] font-bold text-white absolute left-[2.8vw] top-[0.8vw]">
                              {`₹ ${busprice.discount}`}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="px-[2px] py-[2vw] ">
                <div
                  className="h-auto w-full F rounded-[0.5vw] pb-[1vw]"
                  style={{ boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)" }}
                >
                  <div className="flex h-[4vw] w-full px-[1vw] pt-[0.5vw] mb-7 rounded-b-[1vw]"
                  style={{backgroundColor:colorcode.theme}}>
                    {registerfulldetails?.terms == true ? (
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
                        mobile: localStorage.getItem("mobile") || "",
                        age: localStorage.getItem("age") || "",
                        email: localStorage.getItem("email") || "",
                        name: localStorage.getItem("name") || "",
                        terms: false,
                      }}
                      validationSchema={validationSchema}
                      onSubmit={(values) => {
                        setRegisterFullDetails(values);
                        localStorage.setItem("page1", true);
                        localStorage.setItem("occupation", values.option);
                        localStorage.setItem("mobile", values.mobile);
                      }}
                      enableReinitialize
                    >
                      {({
                        isSubmitting,
                        isValid,
                        handleSubmit,
                        values,
                        handleChange,
                      }) => (
                        <Form onSubmit={handleSubmit}>
                          <div className="grid grid-row-3 w-full h-full gap-[1vw]">
                            <div className="row-span-1">
                              <div className="grid grid-cols-5 gap-[1.5vw]">
                                <div className="col-span-1 ">
                                  <p
                                    className="text-[1.1vw] font-semibold"
                                    // style={{
                                    //   color: colorcode.theme,
                                    // }}
                                  >
                                    Contact Details
                                  </p>
                                </div>
                                <div className="col-span-2">
                                  <Field
                                    type="text"
                                    name="email"
                                    placeholder="Email ID"
                                    value={values.email}
                                    onChange={(e) => {
                                      handleChange(e); // Formik's handleChange
                                      localStorage.setItem(
                                        "email",
                                        e.target.value
                                      );
                                    }}
                                    className="border-r-[0.5vw]  border-[.1vw]  text-[1.2vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none px-[1vw]"
                                    style={{
                                      // background: `linear-gradient(to right,${colorcode.gradient} , #FFFFFF)`,
                                      borderColor: colorcode.theme,
                                      // color: colorcode.theme,
                                    }}
                                  />
                                  <ErrorMessage
                                    name="email"
                                    component="div"
                                    className="text-red-500 text-[0.8vw]"
                                  />
                                </div>
                                <div className="col-span-2 flex relative">
                                  <Field
                                    as="select"
                                    name="option"
                                    className="border-r-[0.1vw] border-[.1vw]  border-py-[0.5vw] text-[1.1vw] h-[3vw] w-[25%] rounded-l-[0.5vw] outline-none px-[1vw]"
                                    style={{
                                      // background: `linear-gradient(to right,${colorcode.gradient} , #FFFFFF)`,
                                      borderColor: colorcode.theme,
                                      // color: colorcode.theme,
                                    }}
                                  >
                                    <option
                                      value=""
                                      label="+91"
                                      className=""
                                      style={{
                                        color: colorcode.theme,
                                      }}
                                    />
                                  </Field>
                                  <Field
                                    type="text"
                                    name="mobile"
                                    placeholder="Mobile Number"
                                    maxLength={10}
                                    value={values.mobile}
                                    onChange={(e) => {
                                      handleChange(e); // Formik's handleChange
                                      // handleFormChange({
                                      //   ...values,
                                      //   mobile: e.target.value,
                                      // });
                                      localStorage.setItem(
                                        "mobile",
                                        e.target.value
                                      );
                                    }}
                                    className="border-r-[0.5vw] border-black border-[.1vw] bg-gradient-to-r text-[1.2vw] h-[3vw] w-[75%] rounded-r-[0.5vw] outline-none px-[1vw]"
                                    style={{
                                      // background: `linear-gradient(to right,${colorcode.gradient} , #FFFFFF)`,
                                      borderColor: colorcode.theme,
                                      // color: colorcode.theme,
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
                                    Your booking details will be sent to this
                                    email address and mobile number.
                                  </p>
                                  <div className="px-[0.5vw]">
                                    <div className="border-b-[0.2vw] w-full"></div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="row-span-1">
                              <div className="grid grid-cols-5 gap-[1.5vw]">
                                <div className="col-span-1 pt-[1vw]">
                                  <p
                                    className="text-[1.1vw]  font-semibold"
                                    // style={{
                                    //   color: colorcode.theme,
                                    // }}
                                  >
                                    Seat No, L2
                                  </p>
                                </div>
                                <div className="col-span-2">
                                  <Field
                                    type="text"
                                    name="name"
                                    placeholder="Traveller Name"
                                    value={values.name}
                                    onChange={(e) => {
                                      handleChange(e); // Formik's handleChange
                                      localStorage.setItem(
                                        "name",
                                        e.target.value
                                      );
                                    }}
                                    className={`border-r-[0.5vw] border-[.1vw] text-[1.2vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none px-[1vw]`}
                                    style={{
                                      // background: `linear-gradient(to right,${colorcode.gradient} , #FFFFFF)`,
                                      borderColor: colorcode.theme,
                                      // color: colorcode.theme,
                                    }}
                                  />
                                  <ErrorMessage
                                    name="name"
                                    component="div"
                                    className="text-red-500 text-[0.8vw]"
                                  />
                                </div>
                                <div className="col-span-2">
                                  <div className="grid grid-cols-3">
                                    <div className="col-span-1">
                                      <Field
                                        type="text"
                                        name="age"
                                        placeholder="Age"
                                        maxLength={2}
                                        value={values.age}
                                        onChange={(e) => {
                                          handleChange(e); // Formik's handleChange
                                          localStorage.setItem(
                                            "age",
                                            e.target.value
                                          );
                                        }}
                                        className="border-r-[0.5vw] border-[.1vw] border-black  text-[1.2vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none px-[1vw]"
                                        style={{
                                          // background: `linear-gradient(to right,${colorcode.gradient} , #FFFFFF)`,
                                          borderColor: colorcode.theme,
                                          // color: colorcode.theme,
                                        }}
                                      />
                                      <ErrorMessage
                                        name="age"
                                        component="div"
                                        className="text-red-500 text-[0.8vw]"
                                      />
                                    </div>
                                    <div className="col-span-2 gap-[1vw] w-full h-full pl-[1.5vw]">
                                      <button
                                        type="button"
                                        // style={{backgroundColor:userdetails.sex=="male"?colorcode.theme:""}}
                                        style={{
                                          ...(userdetails.sex === "male"
                                            ? {
                                              backgroundColor:
                                                colorcode.theme,
                                            }
                                            : {
                                              background: `linear-gradient(to right,${colorcode.gradient} , #FFFFFF)`,
                                              color: colorcode.theme,
                                              borderColor: colorcode.theme,
                                            }),
                                        }}
                                        className={`${userdetails.sex === "male"
                                            ? " text-white"
                                            : ""
                                          } h-[3vw] w-[50%] rounded-l-[0.5vw] border-[0.1vw] border-[#1F487C]`}
                                        onClick={() =>
                                          setUserDetails({
                                            ...userdetails,
                                            sex: "male",
                                          })
                                        }
                                      >
                                        Male
                                      </button>
                                      <button
                                        type="button"
                                        style={{
                                          ...(userdetails.sex === "female"
                                            ? {
                                              backgroundColor:
                                                colorcode.theme,
                                            }
                                            : {
                                              background: `linear-gradient(to right,${colorcode.gradient} , #FFFFFF)`,
                                              color: colorcode.theme,
                                              borderColor: colorcode.theme,
                                            }),
                                        }}
                                        className={`${userdetails.sex === "female"
                                            ? " text-white"
                                            : ""
                                          } h-[3vw] w-[50%] rounded-r-[0.5vw] border-[0.1vw] border-[#1F487C]`}
                                        onClick={() =>
                                          setUserDetails({
                                            ...userdetails,
                                            sex: "female",
                                          })
                                        }
                                      >
                                        Female
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          {registerfulldetails?.terms == true ? (
                            ""
                          ) : (
                            <>
                              <div className="flex items-center justify-between pt-[2vw]">
                                <div className="flex gap-[0.5vw]">
                                  <Field
                                    type="checkbox"
                                    name="terms"
                                    className="h-[1.5vw] w-[1.5vw]"
                                  />
                                  <p>
                                    Yes and I accept the{" "}
                                    <span>Terms and conditions</span>
                                  </p>
                                </div>

                                {/* <button
                                className={`${
                                  isValid
                                    ? `bg-[${colorcode.theme}] cursor-pointer`
                                    : "bg-gray-400 cursor-not-allowed"
                                } w-[18vw] h-[2.5vw] rounded-[0.5vw]`}
                                type="submit"
                                disabled={isSubmitting}
                                onClick={() =>
                                  registerfulldetails.terms == true
                                    ? setSubmitButoon(true)
                                    : setSubmitButoon(false)
                                }
                              >
                                <span className="text-white text-[1.1vw] font-semibold">
                                  Continue to Pay {`₹ ${busprice.discount}`}
                                </span>
                              </button> */}
                                <button
                                  style={{
                                    backgroundColor: isValid
                                      ? colorcode.theme
                                      : "gray",
                                  }}
                                  className={`${isValid
                                      ? "cursor-pointer"
                                      : "cursor-not-allowed"
                                    } w-[18vw] h-[2.5vw] rounded-[0.5vw]`}
                                  type="submit"
                                  disabled={isSubmitting}
                                  onClick={() =>
                                    registerfulldetails.terms === true
                                      ? setSubmitButoon(true)
                                      : setSubmitButoon(false)
                                  }
                                >
                                  <span className="text-white text-[1.1vw] font-semibold">
                                    Continue to Pay {`₹ ${busprice.discount}`}
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
                {/* <div className="flex items-center justify-between pt-[1vw]">
              <div className="flex gap-[0.5vw]">
                <input type="checkbox" className="h-[1.5vw] w-[1.5vw]" />
                <p>
                  Yes and I accept the <span>Terms and conditions</span>
                </p>
              </div>
              <button
                className="bg-[#1F487C] w-[18vw] h-[2.5vw] rounded-[0.5vw]"
                type="submit"
                disabled={isSubmitting}
              >
                <span className="text-white text-[1.1vw] font-semibold">
                  Continue to Pay 1,300
                </span>
              </button>
            </div> */}
                {registerfulldetails?.terms == true ? (
                  <div className="grid grid-cols-2 gap-[2vw] pt-[2vw] h-[25vw]">
                    <div
                      className="col-span-1 h-[25vw] w-full  rounded-[0.5vw] pb-[2vw]"
                      style={{ boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)" }}
                    >
                      <h1
                        className="text-[1.5vw] font-semibold bg-gradient-to-r px-[1vw] py-[0.5vw]"
                        style={{
                          color: colorcode.theme,
                        }}
                      >
                        Make Payment
                      </h1>
                      <div className="grid grid-cols-5 px-[1vw] ">
                        <div className="col-span-1 pr-[1vw]">
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
                              {/* <img src={card} className="h-[4vw] w-[4vw] p-[0.5vw]" /> */}
                              <IoCardSharp
                                size={"2.5vw"}
                                color={`${paymenttype == "card" ? "white" : "black"
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
                              {/* <img src={bank} className="h-[4vw] w-[4vw] p-[0.5vw]" /> */}
                              <BsBank2
                                size={"2.5vw"}
                                color={`${paymenttype == "bank" ? "white" : "black"
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
                              {/* <img
                          src={wallet}
                          className="h-[4vw] w-[4vw] p-[0.5vw]"
                        /> */}
                              <GiWallet
                                size={"2.5vw"}
                                color={`${paymenttype == "wallet" ? "white" : "black"
                                  }`}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col-span-4 mt-[0.5vw]">
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
                                        {`₹ ${Number(busprice.discount) +
                                          Number(
                                            Math.round(busprice.discount * 0.03)
                                          )
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
                                        {`₹ ${Number(busprice.discount) +
                                          Number(
                                            Math.round(busprice.discount * 0.03)
                                          )
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
                                        {`₹ ${Number(busprice.discount) +
                                          Number(
                                            Math.round(busprice.discount * 0.03)
                                          )
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
                                        {`₹ ${Number(busprice.discount) +
                                          Number(
                                            Math.round(busprice.discount * 0.03)
                                          )
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
                              <div className="flex items-center mt-[1vw]">
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
                                  className={`flex items-center pl-[1vw] mt-[0.2vw] ${selectbank == "HDFC Bank"
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
                                        {`₹ ${Number(busprice.discount) +
                                          Number(
                                            Math.round(busprice.discount * 0.03)
                                          )
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
                                        {`₹ ${Number(busprice.discount) +
                                          Number(
                                            Math.round(busprice.discount * 0.03)
                                          )
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
                        </div>
                      </div>
                    </div>
                    <div
                    // className="col-span-1 h-auto w-full  rounded-[0.5vw] pb-[2vw]"
                    // style={{ boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)" }}
                    >
                      <div className="grid grid-rows-10 h-[25vw] w-full gap-[2vw]">
                        <div
                          className="row-span-4 h-auto w-full  rounded-[0.5vw] pb-[2vw]"
                          style={{ boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)" }}
                        >
                          <h1
                            className="text-[1.5vw] font-semibold bg-gradient-to-r px-[1vw] py-[0.5vw] "
                            style={{ color: colorcode.theme }}
                          >
                            Fare Details
                          </h1>
                          <div className="px-[1vw] flex justify-between">
                            <p className="text-[1vw]">Base Fare</p>
                            <p className="text-[1vw]">₹ {busprice.discount}</p>
                          </div>
                          <div className="px-[1vw] flex justify-between">
                            <p className="text-[1vw]">GST 3%</p>
                            <p className="text-[1vw]">
                              + ₹ {Math.round(busprice.discount * 0.03)}
                            </p>
                          </div>
                          <button
                            className="w-full h-[2.5vw] rounded-b-[0.5vw] mt-[0.8vw] flex items-center justify-between px-[1vw]"
                            style={{ backgroundColor: colorcode.theme }}
                          >
                            <span className="text-white text-[1.1vw] font-semibold">
                              Total Payable
                            </span>
                            <span className="text-white text-[1.3vw] font-bold">
                              {`₹ ${Number(busprice.discount) +
                                Number(Math.round(busprice.discount * 0.03))
                                }`}
                            </span>
                          </button>
                        </div>
                        <div
                          className="row-span-6 h-auto w-full  rounded-[0.5vw] pb-[2vw]"
                          style={{ boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)" }}
                        >
                          <h1 className="text-[1.5vw] font-semibold bg-gradient-to-r px-[1vw] py-[0.5vw] from-[#2E78AE] to-[#1F487C] bg-clip-text text-transparent"
                          style={{color:colorcode.theme}}>
                            Offers
                          </h1>
                          <div className="px-[1vw] h-[6.5vw] overflow-y-auto">
                            {offers.map((item, index) => (
                              <div
                                key={index}
                                className="border-[0.1vw]  rounded-[0.5vw] mb-[1vw]"
                                style={{
                                  borderColor:colorcode.theme
                                  
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
                                  <Form className="flex px-[1vw] mt-[0.8vw] relative">
                                    <GiSevenPointedStar
                                      size={"2vw"}
                                      className="absolute left-[1.5vw] top-[0.5vw]"
                                      // color="color"
                                      style={{color:colorcode.theme}}
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
                                        borderColor:colorcode.theme,
                                        // background: `linear-gradient(to right,${colorcode.gradient} , #FFFFFF)`
                                       }}
                                    />

                                    <button
                                      className=" w-[25%] h-[3vw] rounded-r-[0.5vw] text-white  font-bold flex items-center justify-center"
                                      style={{
                                        backgroundColor: colorcode.theme,
                                      }}
                                    >
                                      Apply
                                    </button>
                                  </Form>
                                )}
                              </Formik>{" "}
                            </div>
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
            <div ref={componentRef}>
              <div
                className="h-[45vw] w-full F rounded-[0.5vw]"
                style={{ boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)" }}
              >
                <div
                  className="h-[3vw] w-full rounded-t-[0.5vw] flex justify-between items-center px-[1vw]"
                  style={{ backgroundColor: colorcode.theme }}
                >
                  <label className="text-white text-[1.1vw] font-semibold">
                    {`Booking Id : ${generateRandomId("AXER", 12)}`}
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
                          {" "}
                          <img
                            src={imageurl}
                            className="w-[5vw] h-[5vw] rounded-full"
                          />
                        </div>
                        <div className="flex flex-col h-[40%] items-center ">
                          <p
                            className="text-[1.1vw] font-bold"
                            style={{ color: colorcode.theme }}
                          >
                            {seatplatform}
                          </p>
                          <p
                            className=" text-[0.7vw] "
                            // style={{ color: colorcode.theme }}
                          >
                            {busdetails?.Bus_type}
                          </p>
                        </div>
                      </div>
                      <div className="w-[20%] h-full  py-[1vw] flex justify-center">
                        {/* <img src={bus_complete} className="h-full w-full " /> */}
                        <div className="border-dashed border-r-[0.1vw] h-[90%] relative"
                        // style={{borderColor:colorcode.theme}}
                        >
                          <FaBus
                            className=" absolute top-[-0.5vw] left-[-0.7vw]"
                            // style={{color:colorcode.theme}}
                            size={"1.5vw"}
                          />
                          <div className=" absolute top-[6vw] left-[-0.5vw]">
                            <div className="h-[1vw] w-[1vw] border-[0.1vw]  bg-white rounded-full" 
                            // style={{borderColor:colorcode.theme}}
                            ></div>
                          </div>{" "}
                          <FaMapMarkerAlt
                            size={"1.5vw"}
                            // style={{color:colorcode.theme}}
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
                                  // style={{ color: colorcode.theme }}
                                >
                                  {/* {dayjs(bus[busIndex]?.Bus_depature_date).format(
                                "DD MMM"
                              )} */}
                                  {dayjs(busdetails?.Bus_depature_date).format(
                                    "DD MMM"
                                  )}
                                </p>
                                <p
                                  className="font-bold  text-[1.2vw]"
                                  // style={{ color: colorcode.theme }}
                                >
                                  {/* {item.bus_depature} */}
                                  {/* {bus[busIndex]?.Bus_Depature_time} */}
                                  {busdetails.Bus_Depature_time}
                                </p>
                                <p
                                  className=" text-[0.9vw] "
                                  // style={{ color: colorcode.theme }}
                                >
                                  {/* {bus[busIndex]?.Bus_Depature_place} */}
                                  {busdetails?.Bus_Depature_place}
                                </p>
                              </div>
                            </div>
                            <div className="col-span-2 flex-col mt-[0.5vw] items-center w-full justify-center">
                              <img
                                src={bus_comp}
                                className="h-[3.5vw] w-[22vw] "
                              />
                              <p
                                className="text-center text-[1vw] font-bold"
                                // style={{ color: colorcode.theme }}
                              >
                                {/* {item.bus_travel_time} */}
                                {/* {bus[busIndex]?.Bus_travel_time} */}
                                {busdetails?.Bus_travel_time}
                              </p>
                            </div>
                            <div className="col-span-1">
                              <div className="flex flex-col text-right pr-[1vw]">
                                <p
                                  className="text-[0.8vw] pt-[0.5vw]"
                                  // style={{ color: colorcode.theme }}
                                >
                                  {/* {dayjs(bus[busIndex]?.Bus_arrival_date).format(
                                "DD MMM"
                              )} */}
                                  {dayjs(busdetails?.Bus_arrival_date).format(
                                    "DD MMM"
                                  )}
                                </p>
                                <p
                                  className="font-bold r text-[1.2vw] "
                                  // style={{ color: colorcode.theme }}
                                >
                                  {/* {item.bus_arr} */}
                                  {/* {bus[busIndex]?.Bus_Arrival_time} */}
                                  {busdetails.Bus_Arrival_time}
                                </p>
                                <p
                                  className=" text-[0.9vw]"
                                  // style={{ color: colorcode.theme }}
                                >
                                  {/* {bus[busIndex]?.Bus_Arrival_place} */}
                                  {busdetails.Bus_Arrival_place}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="row-span-2 flex justify-between px-[1vw] ">
                          <div className="flex flex-col  ">
                            <p className="text-[1vw] ">Boarding Point & Time</p>
                            <p
                              className=" text-[1.1vw] font-semibold"
                              // style={{ color: colorcode.theme }}
                            >
                              {`${selectedRoutes?.dep_route} : ${selectedRoutes?.dep_time}`}
                            </p>
                          </div>
                          <div className="flex flex-col  items-center">
                            <p className="text-[1vw] ">Seat Number(s)</p>
                            <p
                              className=" text-[1.1vw] font-semibold"
                              // style={{ color: colorcode.theme }}
                            >
                              {selectedSeats}
                            </p>
                          </div>
                        </div>
                        <div className="row-span-2 flex px-[1vw] justify-between ">
                          <div className="flex flex-col  ">
                            <p className="text-[1vw] ">Dropping Point & Time</p>
                            <p
                              className="text-[1.1vw] font-semibold"
                              // style={{ color: colorcode.theme }}
                            >
                              {`${selectedRoutes?.arri_route} : ${selectedRoutes?.arr_time}`}
                            </p>
                          </div>
                          <div className="relative">
                            <img
                              src={ticketview}
                              className="w-[9vw] h-[3.5vw]"
                            />
                            <p className="text-[1.5vw] font-bold text-white absolute left-[2.8vw] top-[0.8vw]">
                              {`₹ ${Number(busprice.discount) +
                                Number(Math.round(busprice.discount * 0.03))
                                }`}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="h-auto w-full px-[1vw] pt-[1vw]">
                  <div className="grid grid-row-3 w-full h-full gap-[1vw]">
                    <div className="row-span-1 py-[1vw]">
                      <div className="grid grid-cols-5 gap-[1.5vw]">
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
                            className="border-r-[0.5vw] border-[0.1vw] text-[1.2vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none px-[1vw] relative"
                            style={{
                              // background: `linear-gradient(to right,${colorcode.gradient} , #FFFFFF)`,
                              borderColor: colorcode.theme,
                              // color: colorcode.theme,
                            }}
                          >
                            <p className="absolute left-[1vw] top-[0.6vw] text-[1.1vw]  font-semibold ">
                              {registerfulldetails.name}
                            </p>
                          </div>
                        </div>
                        <div className="col-span-2">
                          <div className="grid grid-cols-3">
                            <div className="col-span-1">
                              <div
                                className="border-r-[0.5vw] bg-gradient-to-r border-[0.1vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none px-[1vw] relative"
                                style={{
                                  // background: `linear-gradient(to right,${colorcode.gradient} , #FFFFFF)`,
                                  borderColor: colorcode.theme,
                                  // color: colorcode.theme,
                                }}
                              >
                                <p className="absolute left-[2.5vw] top-[0.6vw] text-[1.1vw]  font-semibold ">
                                  {registerfulldetails.age}
                                </p>
                              </div>
                            </div>
                            <div className="col-span-2 gap-[1vw] w-full h-full pl-[1.5vw]">
                              <button
                                type="button"
                                style={{
                                  ...(userdetails.sex === "male"
                                    ? {
                                      backgroundColor:
                                        colorcode.theme,
                                    }
                                    : {
                                      background: `linear-gradient(to right,${colorcode.gradient} , #FFFFFF)`,
                                      color: colorcode.theme,
                                      borderColor: colorcode.theme,
                                    }),
                                }}
                                className={`${userdetails.sex === "male"
                                    ? " text-white"
                                    : ""
                                  } h-[3vw] w-[50%] rounded-l-[0.5vw] border-[0.1vw] border-[#1F487C] `}
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
                                  ...(userdetails.sex === "female"
                                    ? {
                                      backgroundColor:
                                        colorcode.theme,
                                    }
                                    : {
                                      background: `linear-gradient(to right,${colorcode.gradient} , #FFFFFF)`,
                                      color: colorcode.theme,
                                      borderColor: colorcode.theme,
                                    }),
                                }}
                                className={`${userdetails.sex === "female"
                                    ? " text-white"
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
                              // background: `linear-gradient(to right,${colorcode.gradient} , #FFFFFF)`,
                              borderColor: colorcode.theme,
                              // color: colorcode.theme,
                            }}
                          >
                            <p className="absolute left-[1vw] top-[0.6vw] text-[1.1vw]  font-semibold ">
                              {registerfulldetails.email}
                            </p>
                          </div>
                        </div>
                        <div className="col-span-2 flex relative">
                          <div
                            className="border-r-[0.1vw] border-py-[0.5vw] border-[0.1vw] text-[1.1vw] h-[3vw] w-[25%] rounded-l-[0.5vw] outline-none px-[1vw] relative"
                            style={{
                              // background: `linear-gradient(to right,${colorcode.gradient} , #FFFFFF)`,
                              borderColor: colorcode.theme,
                              // color: colorcode.theme,
                            }}
                          >
                            <p
                              className="absolute left-[1.5vw] top-[0.6vw] text-[1.1vw]  font-semibold "
                              style={{
                                // color: colorcode.theme,
                                borderColor: colorcode.theme,
                              }}
                            >
                              +91
                            </p>
                          </div>
                          <div
                            className="border-r-[0.5vw] border-[0.1vw]  text-[1.2vw] h-[3vw] w-[75%] rounded-r-[0.5vw] outline-none px-[1vw] relative"
                            style={{
                              // background: `linear-gradient(to right,${colorcode.gradient} , #FFFFFF)`,
                              borderColor: colorcode.theme,
                              // color: colorcode.theme,
                            }}
                          >
                            <p className="absolute left-[1vw] top-[0.6vw] text-[1.1vw]  font-semibold">
                              {registerfulldetails.mobile}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between pl-[1vw] pr-[2vw] pt-[1vw]">
                  <div>
                  <Barcode
                    value={generateRandomId("AXER", 12)}
                    width={2.5}
                    height={70}
                    // lineColor={colorcode.theme}
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
                  <div className="cursor-pointer pr-[2vw] pb-[2vw] " onClick={generatePDF}>
                    <div className="border-[.6vw] h-[6vw] w-[6vw] rounded-[50%]" style={{borderColor:colorcode.gradient}}>
                    <div className="bg-red-600 relative h-[5vw] w-[5vw] right-[.1vw] bottom-[.1vw] rounded-[50%] flex justify-center items-center "
                    style={{backgroundColor:colorcode.theme}}>
                    
                    <span><FiDownload size={35} color="white"/></span>
                    </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </Drawer>
      </div>
      <div className="md:hidden block w-full">
        <DrawerMobile />
      </div>
    </div>
  );
}

export default DrawerDetails;
