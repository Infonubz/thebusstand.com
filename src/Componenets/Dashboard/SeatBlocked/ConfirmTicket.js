import { ErrorMessage, Field, Form, Formik, useFormikContext } from "formik";
import React, { useEffect, useState } from "react";
import { BiSolidOffer } from "react-icons/bi";
import { RiArrowRightDoubleLine } from "react-icons/ri";
import { Abhibus_SeatConfirmed } from "../../../Api-Abhibus/Dashboard/DashboardPage";
import { toast } from "react-toastify";
import { calculateDiscountedFare } from "../../Common/Common-Functions/TBS-Discount-Fare";
import logo from "../../../Assets/Logo/tbs_logo.png";
import {
  PreCancelTicket,
  ViewTicketById,
} from "../../../Api-Abhibus/MyAccount/ViewTicket";
import { Drawer, Empty, Skeleton } from "antd";
import ViewFullTicket from "../MyAccount/ViewTicket/ViewFullTicket";
import { useDispatch, useSelector } from "react-redux";
import { GET_TICKET_DETAILS } from "../../../Store/Type";
import axios from "axios";
import {
  GetAvailableOffers,
  GetOfferValid,
  TBS_Booking_Details,
} from "../../../Api-TBS/Dashboard/Dashboard";
import dayjs from "dayjs";
import { useParams } from "react-router";
import { GetDiscountOffers } from "../../../Api-TBS/Home/Home";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  coupon_code: Yup.string().required("Coupon Code is required"),
});

export default function ConfirmTicket({
  seatDetails,
  BusDetails,
  selectedSeats,
  discount,
  confirmRefNo,
  faredetails,
  emailInput,
  mobileInput,
  setDropDown,
  setRazorpayLoading,
  setTicketNumber,
  setTicketLoading,
  selectedRoutes,
  travelerDetails,
}) {
  const dispatch = useDispatch();
  const [selectvalue, setSelectValues] = useState({
    value: null,
    Symbol: "",
    code: "",
  });
  const [paybutton, setPayButton] = useState(false);
  const [tbsdiscountamount, setDiscount] = useState(null);
  const key_id = process.env.REACT_APP_RAZORPAY_KEY_ID;
  const key_secret = process.env.REACT_APP_RAZORPAY_KEY_SECRET;
  const OrderApi = process.env.REACT_APP_API_URL;
  const ticketlist = useSelector((state) => state?.get_ticket_detail);
  const tbs_discount = useSelector((state) => state?.live_per);
  const tbs_available_offer = useSelector(
    (state) => state?.tbs_available_offer?.data
  );
  console.log(selectvalue, "tbs_discounttbs_discount");

  const [finaldiscount, setFinalDiscount] = useState(null);
  const [promoCode, setPromoCode] = useState("");
  const [spinning, setSpinning] = useState(false);
  const [ticketDetails, setTicketDetails] = useState(null);
  const [showTicket, setShowTicket] = useState(false);
  const { handleChange, isSubmitting } = useFormikContext();
  const [orderid, setOrderId] = useState(null);
  const abhibusamount = Number(faredetails?.totalAmount);
  console.log(promoCode, "Therikaa")

  const seatTaxList = Object.values(seatDetails)
    .map((item) => item.tax.split(",")[0])
    .filter((tax) => tax);
  const totaltax =
    seatTaxList?.length > 0 &&
    seatTaxList?.reduce((a, b) => {
      return Number(a) + Number(b);
    });
  const gstamount = calculateDiscountedFare(
    BusDetails?.BUS_START_DATE,
    faredetails?.TotadultFare,
    tbs_discount
  );
  const tbsamount =
    calculateDiscountedFare(
      BusDetails?.BUS_START_DATE,
      Number(faredetails?.TotadultFare),
      tbs_discount
    ) +
    Number(Math.round(totaltax)) -
    Number(finaldiscount);
  const tbsbasefare = faredetails?.TotadultFare;
  const handlePromoCode = async () => {
    console.log("hi");
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
      setOrderId(response?.data?.id);
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

  const initiateRazorpay = (generatedOrderId) => {
    setPayButton(false);
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
  const RazorpayGateway = async () => {
    setPayButton(true);
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
  const arraivaldate = calculateArrival(
    BusDetails?.BUS_START_DATE,
    BusDetails?.Start_time,
    BusDetails?.TravelTime
  );
  const currentpath = useParams();
  const dddddd = new Date();
  console.log(dddddd, "dddddddddddddddddddddddddddddd");

  const handleBookingPrice = async (order_id, payment_id, signature, msg) => {
    setTicketLoading(true);
    try {
      console.log("Calling API...");
      const response = await Abhibus_SeatConfirmed(BusDetails, confirmRefNo);

      if (response?.status === "success") {
        // toast.success(
        //   `Ticket Booked Successfully, your TicketNo: ${response?.TicketNo}`
        // );
        sessionStorage.setItem("testing", "hello");
        // setDropDown(null);
        // Fetch ticket details
        const ticketdetails = await ViewTicketById(
          response?.TicketNo,
          setSpinning
        );
        const values = {
          ticketNumber: response?.TicketNo,
        };
        console.log(ticketdetails, "ticketdetails");

        // const cancel_data = await PreCancelTicket(values, mobileInput);
        // console.log("cancel_data", cancel_data);

        if (response?.TicketNo) {
          setTicketNumber(response?.TicketNo);
          setTicketLoading(false);
        }
        const tbs_deal = Math?.round(
          Number(faredetails?.TotadultFare) * Number(tbs_discount / 100)
        );
        // const data = await PreCancelTicket(values, tbs_ticket_details?.mobile);

        const TBS_booking = await TBS_Booking_Details(
          response?.TicketNo,
          order_id,
          payment_id,
          signature,
          ticketdetails?.ticketInfo,
          emailInput,
          mobileInput,
          msg,
          BusDetails,
          arraivaldate,
          selectedRoutes,
          seatDetails,
          currentpath,
          LuxuryFind(ticketdetails?.ticketInfo?.bustype),
          finaldiscount,
          selectvalue?.code,
          tbsamount,
          tbsbasefare,
          dispatch,
          tbs_deal,
          tbs_discount,
          totaltax,
          ticketdetails?.ticketInfo?.Board_Halt_Time
        );
        dispatch({
          type: GET_TICKET_DETAILS,
          payload: ticketdetails,
        });
        sessionStorage.setItem("ticket_view", "open"); // Update state with ticket details
        setTicketDetails(ticketdetails);
        setShowTicket(true);
        console.log(ticketdetails, "ggggggggggg");
      }
      console.log(response, "API Response");
    } catch (error) {
      console.error("API call failed:", error);
    }
  };
  useEffect(() => {
    loadRazorpayScript(() => console.log("Razorpay script preloaded"));
  }, []);
  useEffect(() => {
    GetDiscountOffers(dispatch);
  }, [dispatch, sessionStorage.getItem("occupation_id")]);
  const offerlist = useSelector((state) => state?.discount_offer_list);
  console.log(offerlist?.response, "offerlistofferlist");
  const GetOffers = async () => {
    try {
      const data = await GetAvailableOffers(dispatch, emailInput, mobileInput);
    } catch {
      console.log("hi");
    }
  };
  useEffect(() => {
    GetOffers();
  }, []);
  // const loadRazorpayScript = (callback) => {
  //   const script = document.createElement("script");
  //   script.src = "https://checkout.razorpay.com/v1/checkout.js";
  //   script.async = true;
  //   script.onload = callback;
  //   document.body.appendChild(script);
  // };

  // const RazorpayGateway = async () => {
  //   if (!tbsamount) {
  //     alert("Please enter an amount");
  //     return;
  //   }

  //   const generatedOrderId = await OrderId_Generate(); // Ensure order ID is generated before proceeding

  //   if (!generatedOrderId) {
  //     alert("Failed to generate Order ID. Please try again.");
  //     return;
  //   }

  //   loadRazorpayScript(() => {
  //     const options = {
  //       key: key_id, // demo key
  //       amount: tbsamount * 100, // Razorpay expects amount in paise
  //       currency: "INR",
  //       name: "THEBUSSTAND.COM",
  //       description: "For testing purposes",
  //       order_id: generatedOrderId, // Use the generated order ID
  //       handler: async function (response) {
  //         console.log(response, "Razorpay response");

  //         if (response?.razorpay_payment_id) {
  //           const payload = {
  //             razorpay_order_id: response?.razorpay_order_id,
  //             razorpay_payment_id: response?.razorpay_payment_id,
  //             razorpay_signature: response?.razorpay_signature,
  //           };
  //           try {
  //             // Validate payment
  //             const { data: jsonRes } = await axios.post(
  //               `${OrderApi}/order/validate`,
  //               payload
  //             );
  //             console.log(jsonRes, "jsonRes");

  //             if (jsonRes?.msg === "success") {
  //               handleBookingPrice(
  //                 response?.razorpay_order_id,
  //                 response?.razorpay_payment_id,
  //                 response?.razorpay_signature,
  //                 jsonRes?.msg
  //               );
  //             }
  //             console.log(jsonRes, "Payment validation response");
  //           } catch (err) {
  //             console.error("Validation failed:", err);
  //           }
  //         }
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

  const handleoffer = (item) => {
    if (selectvalue?.value === item?.offer_value) {
      setSelectValues({
        ...selectvalue,
        value: null,
        Symbol: "",
        code: "",
      });
    } else {
      setSelectValues({
        ...selectvalue,
        value: item?.offer_value,
        Symbol: item?.value_symbol,
        code: item?.code,
      });
    }
    // setSelectValues({
    //   ...selectvalue,
    //   value: item?.offer_value,
    //   Symbol: item?.value_symbol,
    //   code: item?.code,
    // });
    if (item?.value_symbol?.includes("₹")) {
      const amount = calculateDiscountedFare(
        BusDetails?.BUS_START_DATE,
        faredetails?.TotadultFare,
        tbs_discount
      );
      console.log(amount, "amountgggggg");

      const final = Number(amount) - Number(item?.offer_value);
      if (selectvalue?.value === item?.offer_value) {
        setDiscount(null);
        setFinalDiscount(null);
      } else {
        // if (promoCode != "") {
        setDiscount(Math.round(item?.offer_value));
        // } else {
        //   setDiscount(null);
        // }
      }
    } else {
      const amount = calculateDiscountedFare(
        BusDetails?.BUS_START_DATE,
        faredetails?.TotadultFare,
        tbs_discount
      );
      const per = Number(item?.offer_value) / 100;
      const final = Number(amount) * Number(per);
      console.log(final, per, amount, "finalfinalfinal");
      if (selectvalue?.value === item?.offer_value) {
        setDiscount(null);
      } else {
        setDiscount(Math.round(final));
      }
    }
  };
  const [spin, setSpin] = useState(true);

  useEffect(() => {
    if (
      calculateDiscountedFare(
        BusDetails?.BUS_START_DATE,
        faredetails?.TotadultFare,
        tbs_discount
      )
    ) {
      setSpin(false);
    } else {
      setTimeout(() => {
        setSpin(false);
      }, 1000);
    }
  }, [faredetails?.TotadultFare]);
  const handlesubmit = async (values, { setFieldError }) => {
    if (!values.coupon_code) {
      setFieldError("coupon_code", "Promo code is required");
      return;
    }
    setPromoCode(values.coupon_code);
    try {
      const response = await GetOfferValid(
        emailInput,
        mobileInput,
        values.coupon_code
      );
      if (response?.data === true) {
        setFinalDiscount(tbsdiscountamount);
      } else {
        setFinalDiscount(null);
        setFieldError("coupon_code", "Coupon code is not valid or expired");
      }
      console.log("datawdedwedew", response?.data);
    } catch (error) {
      console.log("Error fetching offer:", error);
    }
  };
  console.log(tbsdiscountamount, "tbsdiscountamount");
  console.log(promoCode, "selectvalueselectvalue");

  return (
    <>
      <div>
        {spin === true ? (
          <Skeleton
            loading={spin}
            active
            style={{ margin: "0.5vw", padding: "0.5vw" }}
            paragraph={{ rows: 9 }}
            avatar
          ></Skeleton>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[2vw] h-[5vw]">
            <div
              className={`${LuxuryFind(BusDetails.Bus_Type_Name) === true
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
                      LuxuryFind(BusDetails.Bus_Type_Name) === true
                        ? "#393939"
                        : "#1F487C",
                  }}
                >
                  Offers
                </h1>
                <div className="md:px-[1vw] px-[3vw] h-[42vw] md:h-[9.5vw] overflow-y-auto overflow-x-hidden w-full">
                  {tbs_available_offer?.length > 0 ? (
                    tbs_available_offer?.map((item, index) => (
                      <div
                        key={index}
                        className="border-[0.1vw] w-full rounded-[2vw] h-auto md:rounded-[0.5vw] mb-[2vw] md:mb-[1vw]"
                        style={{
                          borderColor:
                            LuxuryFind(BusDetails.Bus_Type_Name) === true
                              ? "#393939"
                              : "#1F487C",
                        }}
                      >
                        <div className="grid grid-cols-10 m-[1vw] md:m-[0.5vw] w-full">
                          <div className="col-span-1 pt-[.5vw] md:pt-[0.2vw]">
                            <input
                              type="radio"
                              name="offer"
                              className="w-full h-auto"
                              checked={selectvalue?.value === item.offer_value} // Properly control the selection state
                              onClick={() => {
                                handleoffer(item);
                              }}
                            // value={selectvalue?.value}
                            />
                          </div>
                          <div className="col-span-9 flex flex-col w-full min-w-0 pr-[2vw]">
                            <p className="md:text-[1.1vw] text-[3.3vw] font-bold break-words whitespace-normal">
                              {item.code}
                            </p>
                            <p className="md:text-[1vw] text-[3vw] font-semibold text-[#A4A4A4] break-words whitespace-normal">
                              {item.offer_desc}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="flex flex-col items-center justify-center">
                      <Empty description={false} />
                      <label
                        className="text-[1.1vw] font-semibold "
                        style={{
                          color: LuxuryFind(BusDetails.Bus_Type_Name)
                            ? "#393939"
                            : "#1F487C",
                        }}
                      >
                        No Offers Available
                      </label>
                    </div>
                  )}
                </div>

                <div className="md:h-[1.9vw] h-[15vw] md:py-[0vw] py-[2vw]  w-full">
                  <div className="px-[2.5vw] md:px-[0vw]">
                    <Formik
                      initialValues={{
                        coupon_code: selectvalue?.code || "",
                      }}
                      validationSchema={validationSchema}
                      onSubmit={handlesubmit}
                      enableReinitialize
                    >
                      {({ handleChange, handleSubmit, values }) => (
                        <Form
                          className="flex px-[1vw] mt-[0.8vw] relative"
                          onSubmit={handleSubmit}
                        >
                          <BiSolidOffer
                            className="absolute left-[1.5vw] top-[0.5vw] text-[7vw] md:text-[2vw]"
                            style={{
                              color: LuxuryFind(BusDetails.Bus_Type_Name)
                                ? "#393939"
                                : "#1F487C",
                            }}
                          />

                          <Field
                            type="text"
                            name="coupon_code"
                            placeholder="Enter offer code"
                            className="border-dashed border-[.3vw] md:border-[0.1vw] placeholder:text-[3.5vw] md:placeholder:text-[1.2vw] 
        outline-none text-[3.5vw] md:text-[1.2vw] h-[9vw] md:h-[3vw] w-[75%] md:rounded-l-[0.5vw] rounded-l-[1.5vw] pl-[9vw] md:pl-[3vw]"
                            style={{
                              borderColor: LuxuryFind(BusDetails.Bus_Type_Name)
                                ? "#393939"
                                : "#1F487C",
                            }}
                            value={values?.coupon_code}
                            onChange={(e) => {
                              setPromoCode(e.target.value);
                              handleChange(e);
                            }}
                          />
                          <ErrorMessage
                            name="coupon_code"
                            component="div"
                            className="text-red-500 text-[2.5vw] md:text-[0.75vw] absolute md:top-[2.75vw] md:left-[4vw] top-[4.5vw]"
                          />
                          <button
                            type="submit"
                            className="w-[25%] md:h-[3vw] h-[9vw] md:rounded-r-[0.5vw] rounded-r-[1.5vw] text-white font-bold flex items-center justify-center"
                            style={{
                              backgroundColor: LuxuryFind(
                                BusDetails.Bus_Type_Name
                              )
                                ? "#393939"
                                : "#1F487C",
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
              className={`${LuxuryFind(BusDetails.Bus_Type_Name) === true
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
                        LuxuryFind(BusDetails.Bus_Type_Name) === true
                          ? "#393939"
                          : "#1F487C",
                    }}
                  >
                    Fare Details
                  </h1>
                  <div className="px-[1vw] flex justify-between">
                    <p className="md:text-[1.1vw] text-[3.5vw]">Base Fare</p>
                    <p className="md:text-[1.1vw] text-[3.5vw]">
                      {`₹ ${Math?.round(faredetails?.TotadultFare)}`}
                    </p>
                  </div>
                  {/* <div className="px-[1vw] flex justify-between">
                <p className="md:text-[1vw] text-[3.5vw]">Concession Fare</p>
                <p className="md:text-[1vw] text-[3.5vw]">
                  - ₹ {Math.round(faredetails?.concessionAmount)}
                </p>
              </div> */}
                  <div className="px-[1vw] flex justify-between">
                    <p className="md:text-[1.1vw] text-[3.5vw]">GST</p>
                    <p className="md:text-[1.1vw] text-[3.5vw]">
                      + ₹ {Math.round(totaltax)}
                    </p>
                  </div>
                  <div className="px-[1vw] flex justify-between">
                    <p className="md:text-[1.1vw] text-[3.5vw]">TBS Deal</p>
                    <p className="md:text-[1.1vw] text-[3.5vw]">
                      {`- ₹ ${Math?.round(
                        Number(faredetails?.TotadultFare) *
                        Number(tbs_discount / 100)
                      )}`}
                    </p>
                  </div>
                  {finaldiscount != null && promoCode != "" && (
                    <div className="px-[1vw] flex justify-between">
                      <p className="md:text-[1.1vw] text-[3.5vw]">
                        Discount
                        <span className="pl-[0.5vw]">
                          {selectvalue.Symbol?.includes("%")
                            ? ` ( ${selectvalue?.value} % )`
                            : `( Flat ₹ ${selectvalue?.value} )`}
                        </span>
                      </p>
                      <p className="md:text-[1.1vw] text-[3.5vw]">
                        - ₹ {finaldiscount}
                      </p>
                    </div>
                  )}
                  <button
                    className={`w-full md:h-[3vw] h-[8vw] rounded-[1.5vw] md:rounded-[0vw] md:rounded-b-[0.5vw] mt-[12vw] ${finaldiscount != null && promoCode != ""
                      ? "md:mt-[4.55vw]"
                      : "md:mt-[6.2vw]"
                      } flex 
                                          items-center justify-between px-[3vw] md:px-[1vw] cursor-pointer`}
                    style={{
                      backgroundColor:
                        LuxuryFind(BusDetails.Bus_Type_Name) === true
                          ? "#393939"
                          : "#1F487C",
                    }}
                    disabled={paybutton}
                    onClick={RazorpayGateway}
                  >
                    <label className="text-white cursor-pointer text-[3.5vw] md:text-[1.1vw] flex items-center font-semibold">
                      Proceed to Pay
                      {/* {`₹ ${
                    Number(discount) + Number(Math.round(discount * 0.03))
                  }`} */}
                      <span className="font-extrabold cursor-pointer pl-[1vw] text-[1.3vw]">
                        {`₹ ${calculateDiscountedFare(
                          BusDetails?.BUS_START_DATE,
                          Number(faredetails?.TotadultFare),
                          tbs_discount
                        ) +
                          Number(Math.round(totaltax)) -
                          Number(finaldiscount)
                          }`}
                      </span>
                    </label>
                    <span className="pl-[0.5vw] cursor-pointer">
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
        )}
      </div>
      {/* <Drawer
        placement={"right"}
        closable={sessionStorage.getItem("ticket_view", "open")}
        onClose={sessionStorage.setItem("ticket_view", "close")}
        open={showModal}
        key={"right"}
        width={"60%"}
        // width={drawerWidth}
      >
        <ViewFullTicket
          ticketDetails={ticketDetails}
          // droppingDate={calculatedDate && ConvertDate(calculatedDate)}
        />
      </Drawer> */}
    </>
  );
}
