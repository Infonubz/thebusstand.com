import { Field, Form, Formik, useFormikContext } from "formik";
import React, { useEffect, useState } from "react";
import { BiSolidOffer } from "react-icons/bi";
import { RiArrowRightDoubleLine } from "react-icons/ri";
import { Abhibus_SeatConfirmed } from "../../../../Api-Abhibus/Dashboard/DashboardPage";
import { toast } from "react-toastify";
import { calculateDiscountedFare } from "../../../Common/Common-Functions/TBS-Discount-Fare";
import { useNavigate, useParams } from "react-router";
import { Modal } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import ModalPopup from "../../../Common/Modal/Modal";
import { GET_TICKET_DETAILS } from "../../../../Store/Type";
import { ViewTicketById } from "../../../../Api-Abhibus/MyAccount/ViewTicket";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import dayjs from "dayjs";
import { TBS_Booking_Details } from "../../../../Api-TBS/Dashboard/Dashboard";

export default function MobileConfirmTicket({
  MobSeatDetails,
  MobBusDetails,
  MobDiscount,
  MobSelectedRoutes,
  confirmRefNo,
  faredetails,
  emailInput,
  mobileInput,
  droppingDate,
  ticketNo,
  setTicketNo,
  ticketLoader,
  setTicketLoader,
  razorpayloading,
  setRazorpayLoading
}) {
  const navigation = useNavigate();
  const [promoCode, setPromoCode] = useState("");
  const [ticektConfirm, setTicektConfirm] = useState(false);
  // const [ticketNo, setTicketNo] = useState("");
  const [navigate, setNavigate] = useState(false);
  const tbs_discount = useSelector((state) => state?.live_per);
  const ticketlist = useSelector((state) => state?.get_ticket_detail);

  const key_id = process.env.REACT_APP_RAZORPAY_KEY_ID;
  const key_secret = process.env.REACT_APP_RAZORPAY_KEY_SECRET;
  const OrderApi = process.env.REACT_APP_API_URL;

  const closeModal = () => {
    setTicektConfirm(false);
    setNavigate(true);
  };
  const seatTaxList = Object.values(MobSeatDetails)
    .map((item) => item?.tax?.split(",")[0])
    .filter((tax) => tax);
  const totaltax =
    seatTaxList?.length > 0 &&
    seatTaxList?.reduce((a, b) => {
      return Number(a) + Number(b);
    });
  const tbsamount =
    calculateDiscountedFare(
      MobBusDetails?.BUS_START_DATE,
      Number(faredetails?.TotadultFare),
      tbs_discount
    ) + Number(Math.round(totaltax));
  const { handleSubmit, handleChange, isSubmitting, isValid, values } =
    useFormikContext();
  const handlePromoCode = async () => {
  };
  const dispatch = useDispatch();
  const [spinning, setSpinning] = useState(false);


  const initiateRazorpay = (generatedOrderId) => {
    const options = {
      key: key_id,
      amount: tbsamount * 100,
      currency: "INR",
      name: "thebusstand.com",
      description: "For testing purposes",
      order_id: generatedOrderId,
      handler: async function (response) {
        if (response?.razorpay_payment_id) {
          try {
            const payload = {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            };

            const { data: jsonRes } = await axios.post(
              `${OrderApi}/order/validate`,
              payload
            );

            if (jsonRes?.msg === "success") {
              handleBookingPrice(
                response.razorpay_order_id,
                response.razorpay_payment_id,
                response.razorpay_signature,
                jsonRes?.msg
              );
            }
          } catch (err) {
            console.error("Validation failed:", err);
          }
        }
      },
      prefill: {
        name: "Nubiznez",
        email: emailInput,
        contact: mobileInput,
      },
      theme: {
        color: "#1F4B7F",
      },
    };

    const pay = new window.Razorpay(options);
    pay.open();
  };


  const calculateArrival = (departureDate, departureTime, duration) => {
    try {
      const departureDateTime = new Date(`${departureDate} ${departureTime}`);
      if (isNaN(departureDateTime.getTime())) {
        throw new Error("Invalid departure date or time format.");
      }
      const [hours, minutes] = duration.split(":").map(Number);
      if (isNaN(hours) || isNaN(minutes)) {
        throw new Error("Invalid duration format.");
      }
      departureDateTime.setHours(departureDateTime.getHours() + hours);
      departureDateTime.setMinutes(departureDateTime.getMinutes() + minutes);
      const arrivalDate = departureDateTime.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "2-digit",
      });
      const arrivalTime = departureDateTime.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
      return dayjs(arrivalDate).format("YYYY-MM-DD");
    } catch (error) {
      return { arrivalDate: null, arrivalTime: null };
    }
  };


  const currentpath = useParams();

  const arraivaldate = calculateArrival(
    MobBusDetails?.BUS_START_DATE,
    MobBusDetails?.Start_time,
    MobBusDetails?.TravelTime
  );

  const handleBookingPrice = async (order_id, payment_id, signature, msg) => {
    setTicketLoader(true)
    try {
      const response = await Abhibus_SeatConfirmed(MobBusDetails, confirmRefNo);
      if (response?.status === "success") {
        // toast.success(`Ticket Booked Successfully, your TicketNo: ${response?.TicketNo}`);
        const ticketdetails = await ViewTicketById(
          response?.TicketNo,
          setSpinning
        );
        const TBS_booking = await TBS_Booking_Details(
          response?.TicketNo,
          order_id,
          payment_id,
          signature,
          ticketdetails?.ticketInfo,
          emailInput,
          mobileInput,
          msg,
          MobBusDetails,
          arraivaldate,
          MobSelectedRoutes,
          MobSeatDetails,
          currentpath
        );
        dispatch({
          type: GET_TICKET_DETAILS,
          payload: ticketdetails,
        });
        sessionStorage.setItem("ticket_view", "open");
        if (response?.TicketNo) {
          setTicketNo(response?.TicketNo);
          setTicektConfirm(true);
        }
      }

    } catch (error) {
      console.error("API call failed:", error);
    }
  };
  const LuxuryFind = (type) =>
    type.toLowerCase().includes("volvo") ||
    type.toLowerCase().includes("mercedes benz") ||
    type.toLowerCase().includes("washroom") ||
    type.toLowerCase().includes("bharatBenz") ||
    type.toLowerCase().includes("luxury");

  const offers = [
    { Coupon: "BUSSAVE10", details: "Get 10% off on all bus tickets." },
    { Coupon: "TRAVEL20", details: "Save $20 on round-trip bus tickets." },
    {
      Coupon: "BUSRIDE15",
      details: "Enjoy 15% discount on intercity bus rides.",
    },
    { Coupon: "WEEKEND50", details: "Avail 50% off on weekend bus travel." },
  ];

  useEffect(() => {
    if (navigate === true) {
      navigation("/seats", {
        state: MobBusDetails,
      });
    }
  }, [navigate]);

  const OrderId_Generate = async () => {
    const username = key_id;
    const password = key_secret;
    const apiUrl = `${OrderApi}/order`;

    const requestBody = {
      amount: tbsamount * 100,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
      notes: {
        notes_key_1: "test",
        notes_key_2: "test2",
      },
      payment_capture: 1,
    };

    try {
      console.log("API URL:", apiUrl); // Debugging API URL

      const authHeader = `Basic ${btoa(`${username}:${password}`)}`;

      const response = await axios.post(apiUrl, requestBody, {
        headers: {
          "Content-Type": "application/json",
          Authorization: authHeader,
        },
      });

      console.log("Generated Order ID:", response?.data?.id); // Debugging Order ID
      return response?.data.id; // Return the order ID
    } catch (error) {
      if (error.response) {
        console.error("Response Data:", error.response.data);
        console.error("Response Status:", error.response.status);
      } else if (error.request) {
        console.error("No Response Received:", error.request);
      } else {
        console.error("Error Configuring Request:", error.message);
      }
      return null;
    }
  };

  const loadRazorpayScript = (callback) => {
    if (
      document.querySelector(
        'script[src="https://checkout.razorpay.com/v1/checkout.js"]'
      )
    ) {
      callback();
      return;
    }

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = callback;
    script.onerror = () => console.error("Failed to load Razorpay script.");
    document.body.appendChild(script);
  };
  // const RazorpayGateway = async () => {
  //   if (!tbsamount) {
  //     alert("Please enter an amount");
  //     return;
  //   }

  //   loadRazorpayScript(() => {
  //     const options = {
  //       key: "rzp_test_eyuWUoPChgfzBC",
  //       amount: tbsamount * 100, // Razorpay expects amount in paise
  //       currency: "INR",
  //       name: "THEBUSSTAND.COM",
  //       description: "For testing purposes",
  //       // image: logo,
  //       handler: async function (response) {
  //         if (response?.razorpay_payment_id) {
  //           handleBookingPrice();
  //         }
  //         // toast.success(`Payment ID: ${response.razorpay_payment_id}`);
  //         //   alert(`Payment ID: ${response.razorpay_payment_id}`);

  //       },
  //       prefill: {
  //         name: "Nubiznez",
  //         email: emailInput,
  //         contact: mobileInput,
  //       },
  //       notes: {
  //         address: "Razorpay Corporate Office",
  //       },
  //       theme: {
  //         color: "#1F4B7F",
  //       },
  //       modal: {
  //         escape: false,
  //         backdropclose: false,
  //         handleback: true,
  //       },
  //     };

  //     const pay = new window.Razorpay(options);
  //     pay.open();
  //   });
  // };
  const RazorpayGateway = async () => {
    setRazorpayLoading(true);
    if (!tbsamount) {
      alert("Please enter an amount");
      return;
    }

    try {
      const generatedOrderId = await OrderId_Generate();
      if (!generatedOrderId) {
        alert("Failed to generate Order ID. Please try again.");
        return;
      }

      loadRazorpayScript(() => {
        setRazorpayLoading(false);
        initiateRazorpay(generatedOrderId);
      });
    } catch (error) {
      console.error("Error generating order ID:", error);
    }
  };
  return (
    <div>
      <div className="grid grid-cols-1  gap-[2vw] h-[5vw]">
        <div
          className={`${LuxuryFind(MobBusDetails.Bus_Type_Name) === true
            ? "bg-[#FFEEC9]"
            : "bg-white"
            } col-span-1 h-[67vw]  w-full rounded-[1.5vw]`}
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
              className=" text-[4vw] font-semibold bg-gradient-to-r  px-[3vw] py-[2vw] 
                                         from-[#2E78AE] to-[#1F487C] bg-clip-text text-transparent"
              style={{
                color:
                  LuxuryFind(MobBusDetails.Bus_Type_Name) === true
                    ? "#393939"
                    : "#1F487C",
              }}
            >
              Offers
            </h1>
            <div className=" px-[3vw] h-[42vw]  overflow-y-auto">
              {offers.map((item, index) => (
                <div
                  key={index}
                  className="border-[0.1vw] rounded-[2vw]  mb-[2vw]"
                  style={{
                    borderColor:
                      LuxuryFind(MobBusDetails.Bus_Type_Name) === true
                        ? "#393939"
                        : "#1F487C",
                  }}
                >
                  <div className="grid grid-cols-10 m-[1vw] w-full">
                    <div className="col-span-1 pt-[.5vw] ">
                      <input
                        type="radio"
                        name="offer"
                        className="w-full h-auto"
                      />
                    </div>
                    <div className="col-span-9 flex flex-col w-full">
                      <p
                        className=" text-[3.3vw] font-bold"
                      // style={{ color: "#1F487C" }}
                      >
                        {item.Coupon}
                      </p>
                      <p className=" text-[3vw] font-semibold text-[#A4A4A4]">
                        {item.details}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className=" h-[15vw]  py-[2vw]  w-full">
              <div className="px-[2.5vw] ">
                {/* <Formik
                                    initialValues={{
                                        name: "",
                                    }}
                                    //   validationSchema={validationSchema}
                                    onSubmit={(values) => {
                                        // Handle form submission
                                        // setShowRegister(true);
                                        localStorage.setItem("page1", true);
                                        localStorage.setItem("occupation", values.option);
                                        localStorage.setItem("mobile", values.mobileData);
                                    }}
                                >
                                    {({ handleChange, isSubmitting }) => ( */}
                <Form className="flex px-[1vw] mt-[0.8vw] relative">
                  <BiSolidOffer
                    className="absolute left-[1.5vw] top-[0.5vw] text-[7vw] "
                    // color="color"
                    style={{
                      color:
                        LuxuryFind(MobBusDetails.Bus_Type_Name) === true
                          ? "#393939"
                          : "#1F487C",
                    }}
                  />

                  <Field
                    type="text"
                    name="name"
                    placeholder="Enter promo code"
                    className="border-dashed border-[.3vw]  placeholder:text-[3.5vw]  outline-none text-[3.5vw]  h-[9vw] w-[75%] rounded-l-[1.5vw] pl-[9vw] "
                    style={{
                      // color: "#1F487C",
                      borderColor:
                        LuxuryFind(MobBusDetails.Bus_Type_Name) === true
                          ? "#393939"
                          : "#1F487C",
                      // background: `linear-gradient(to right,${colorcode.gradient} , #FFFFFF)`
                    }}
                    onChange={(e) => {
                      setPromoCode(e.target.value);
                      handleChange(e);
                    }}
                  />
                  <button
                    onClick={handlePromoCode}
                    className=" w-[25%]  h-[9vw]  rounded-r-[1.5vw]  text-white  font-bold flex items-center justify-center"
                    style={{
                      backgroundColor:
                        LuxuryFind(MobBusDetails.Bus_Type_Name) === true
                          ? "#393939"
                          : "#1F487C",
                    }}
                  >
                    Apply
                  </button>
                </Form>
                {/* )}
                                </Formik> */}
              </div>
            </div>
          </div>
        </div>
        <div
          className={`${LuxuryFind(MobBusDetails.Bus_Type_Name) === true
            ? "bg-[#FFEEC9]"
            : "bg-white"
            } col-span-1 h-[40vw]  w-full rounded-[0.5vw]`}
          style={{
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
          }}
        >
          <div className="grid grid-rows-10 h-[45vw]  w-full gap-[2vw]">
            <div
              className="row-span-4 h-[40vw] w-full rounded-[1.5vw] px-[2vw] pb-[2vw]"
              style={{
                boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
              }}
            >
              <h1
                className=" text-[4vw] font-semibold bg-gradient-to-r px-[1vw] py-[0.5vw] "
                style={{
                  color:
                    LuxuryFind(MobBusDetails.Bus_Type_Name) === true
                      ? "#393939"
                      : "#1F487C",
                }}
              >
                Fare Details
              </h1>
              <div className="px-[1vw] flex justify-between">
                <p className=" text-[3.5vw]">Base Fare</p>
                <p className=" text-[3.5vw]">
                  {calculateDiscountedFare(
                    MobBusDetails?.BUS_START_DATE,
                    MobDiscount,
                    tbs_discount
                  )}
                </p>
              </div>
              <div className="px-[1vw] flex justify-between">
                <p className=" text-[3.5vw]">Service Tax</p>
                <p className=" text-[3.5vw]">+ ₹ {Math.round(totaltax)}</p>
              </div>
              <button
                className="w-full h-[8vw] rounded-[1.5vw]  mt-[12vw]  flex 
                                          items-center justify-between px-[3vw] "
                style={{
                  backgroundColor:
                    LuxuryFind(MobBusDetails.Bus_Type_Name) === true
                      ? "#393939"
                      : "#1F487C",
                }}
                onClick={RazorpayGateway}
              >
                <span className="text-white text-[3.5vw]  font-semibold">
                  Proceed to Pay{" "}
                  {/* {`₹ ${
                    Number(discount) + Number(Math.round(discount * 0.03))
                  }`} */}
                  {calculateDiscountedFare(
                    MobBusDetails?.BUS_START_DATE,
                    Number(MobDiscount),
                    tbs_discount
                  ) + Number(Math.round(totaltax))}
                </span>
                <span className="pl-[0.5vw]">
                  <RiArrowRightDoubleLine
                    // size={"1.7vw"}
                    color="white"
                    className=" text-[3.5vw]"
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

      {/* <ModalPopup
        show={ticektConfirm}
        onClose={closeModal}
        height="auto"
        width="auto"
      >
        <div className="flex flex-col items-center justify-center w-full p-[5vw]">
          <span className="mt-[1vw] flex items-center justify-center w-full">
            <FontAwesomeIcon
              icon={faCircleCheck}
              beat
              style={{ color: "#3bb249", fontSize: "12.5vh" }}
            />
          </span>
          <div className="mt-[5vw] flex flex-col items-center justify-center w-full">
            <span className="text-[5vw] font-semibold">
              Ticket Booked Successfully
            </span>
            <span className="flex gap-[2vw] text-[4vw] font-semibold">
              Your TicketNo:<p className="text-[#3BB249]">{ticketNo}</p>
            </span>
          </div>
        </div>
      </ModalPopup> */}
    </div>
  );
}
