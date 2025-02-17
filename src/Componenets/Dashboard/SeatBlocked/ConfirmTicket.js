import { Field, Form, Formik, useFormikContext } from "formik";
import React, { useState } from "react";
import { BiSolidOffer } from "react-icons/bi";
import { RiArrowRightDoubleLine } from "react-icons/ri";
import { Abhibus_SeatConfirmed } from "../../../Api-Abhibus/Dashboard/DashboardPage";
import { toast } from "react-toastify";
import { calculateDiscountedFare } from "../../Common/Common-Functions/TBS-Discount-Fare";
import logo from "../../../Assets/Logo/tbs_logo.png";
import { ViewTicketById } from "../../../Api-Abhibus/MyAccount/ViewTicket";
import { Drawer } from "antd";
import ViewFullTicket from "../MyAccount/ViewTicket/ViewFullTicket";
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
}) {
  const [promoCode, setPromoCode] = useState("");
  const handlePromoCode = async () => {
    console.log(promoCode, "Promocode Submit");
  };
  const seatTaxList = Object.values(seatDetails)
    .map((item) => item.tax.split(",")[0])
    .filter((tax) => tax);
  console.log(seatTaxList, "seatTaxListseatTaxList");
  const totaltax =
    seatTaxList?.length > 0 &&
    seatTaxList?.reduce((a, b) => {
      return Number(a) + Number(b);
    });
  const [spinning, setSpinning] = useState(false);
  const [showTicket, setShowTicket] = useState(false);
  const [ticketDetails, setTicketDetails] = useState("");
  const handleBookingPrice = async () => {
    try {
      console.log("Calling API...");
      const response = await Abhibus_SeatConfirmed(BusDetails, confirmRefNo);
      if (response?.status === "success") {
        toast.success(
          `Ticket Booked Successfully, your TicketNo: ${response?.TicketNo}`
        );
        setDropDown(null);
        const ticketdetails = await ViewTicketById(
          response?.TicketNo,
          setSpinning
        );
        setShowTicket(true);
        setTicketDetails(ticketdetails);
      }
      console.log(response, "API Response");
      console.log(response);
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
  const gstamount = calculateDiscountedFare(
    BusDetails?.BUS_START_DATE,
    faredetails?.TotadultFare
  );
  const tbsamount =
    calculateDiscountedFare(
      BusDetails?.BUS_START_DATE,
      Number(faredetails?.TotadultFare)
    ) + Number(totaltax);
  const loadRazorpayScript = (callback) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = callback;
    document.body.appendChild(script);
  };
  console.log(tbsamount, "tbsamounttbsamount");
  const { handleChange, isSubmitting } = useFormikContext();
  const RazorpayGateway = () => {
    if (!tbsamount) {
      alert("Please enter an amount");
      return;
    }

    loadRazorpayScript(() => {
      const options = {
        key: "rzp_test_eyuWUoPChgfzBC",
        amount: tbsamount * 100, // Razorpay expects amount in paise
        currency: "INR",
        name: "THEBUSSTAND.COM",
        description: "For testing purposes",
        // image: logo,
        handler: function (response) {
          console.log(response, "responseresponsrazorpaye");
          if (response?.razorpay_payment_id) {
            handleBookingPrice();
          }
          toast.success(`Payment ID: ${response.razorpay_payment_id}`);
          //   alert(`Payment ID: ${response.razorpay_payment_id}`);
        },
        prefill: {
          name: "Nubiznez",
          email: emailInput,
          contact: mobileInput,
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#1F4B7F",
        },
        modal: {
          escape: false,
          backdropclose: false,
          handleback: true,
        },
      };

      const pay = new window.Razorpay(options);
      pay.open();
    });
  };

  console.log(faredetails, "faredetailsfaredetails");
  const abhibusamount = Number(faredetails?.totalAmount);

  console.log(gstamount, "gstamountgstamount");
  console.log(abhibusamount, "abhibusamountabhibusamount");
  console.log(ticketDetails, "ticketDetailsticketDetails");

  return (
    <>
      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[2vw] h-[5vw]">
          <div
            className={`${
              LuxuryFind(BusDetails.Bus_Type_Name) === true
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
              <div className="md:px-[1vw] px-[3vw] h-[42vw] md:h-[9.5vw] overflow-y-auto">
                {offers.map((item, index) => (
                  <div
                    key={index}
                    className="border-[0.1vw] rounded-[2vw] md:rounded-[0.5vw] mb-[2vw] md:mb-[1vw]"
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
                        />
                      </div>
                      <div className="col-span-9 flex flex-col w-full">
                        <p
                          className="md:text-[1.1vw] text-[3.3vw] font-bold"
                          // style={{ color: "#1F487C" }}
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
                      className="absolute left-[1.5vw] top-[0.5vw] text-[7vw] md:text-[2vw]"
                      // color="color"
                      style={{
                        color:
                          LuxuryFind(BusDetails.Bus_Type_Name) === true
                            ? "#393939"
                            : "#1F487C",
                      }}
                    />

                    <Field
                      type="text"
                      name="name"
                      placeholder="Enter promo code"
                      className="border-dashed border-[.3vw] md:border-[0.1vw] placeholder:text-[3.5vw] md:placeholder:text-[1.2vw]  outline-none text-[3.5vw] md:text-[1.2vw] h-[9vw] md:h-[3vw] w-[75%] md:rounded-l-[0.5vw] rounded-l-[1.5vw] pl-[9vw]  md:pl-[3vw] "
                      style={{
                        // color: "#1F487C",
                        borderColor:
                          LuxuryFind(BusDetails.Bus_Type_Name) === true
                            ? "#393939"
                            : "#1F487C",
                        // background: `linear-gradient(to right,${colorcode.gradient} , #FFFFFF)`
                      }}
                      onChange={(e) => {
                        setPromoCode(e.target.value);
                        handleChange(e);
                        console.log(e.target.value, "promoCode11");
                      }}
                    />
                    <button
                      onClick={handlePromoCode}
                      className=" w-[25%] md:h-[3vw] h-[9vw] md:rounded-r-[0.5vw] rounded-r-[1.5vw]  text-white  font-bold flex items-center justify-center"
                      style={{
                        backgroundColor:
                          LuxuryFind(BusDetails.Bus_Type_Name) === true
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
            className={`${
              LuxuryFind(BusDetails.Bus_Type_Name) === true
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
                    {`₹ ${calculateDiscountedFare(
                      BusDetails?.BUS_START_DATE,
                      faredetails?.TotadultFare
                    )}`}
                  </p>
                </div>
                {/* <div className="px-[1vw] flex justify-between">
                <p className="md:text-[1vw] text-[3.5vw]">Concession Fare</p>
                <p className="md:text-[1vw] text-[3.5vw]">
                  - ₹ {Math.round(faredetails?.concessionAmount)}
                </p>
              </div> */}
                <div className="px-[1vw] flex justify-between">
                  <p className="md:text-[1.1vw] text-[3.5vw]">Service Tax</p>
                  <p className="md:text-[1.1vw] text-[3.5vw]">
                    + ₹ {Math.round(totaltax)}
                  </p>
                </div>
                {/* <div className="px-[1vw] flex justify-between">
                <p className="md:text-[1vw] text-[3.5vw]">GST 3%</p>
                <p className="md:text-[1vw] text-[3.5vw]">
                  + ₹ {Math.round(Number(gstamount) * 0.03)}
                </p>
              </div> */}
                <button
                  className="w-full md:h-[3vw] h-[8vw] rounded-[1.5vw] md:rounded-[0vw] md:rounded-b-[0.5vw] mt-[12vw] md:mt-[7.8vw] flex 
                                          items-center justify-between px-[3vw] md:px-[1vw]"
                  style={{
                    backgroundColor:
                      LuxuryFind(BusDetails.Bus_Type_Name) === true
                        ? "#393939"
                        : "#1F487C",
                  }}
                  onClick={RazorpayGateway}
                >
                  <label className="text-white text-[3.5vw] md:text-[1.1vw] flex items-center font-semibold">
                    Proceed to Pay
                    {/* {`₹ ${
                    Number(discount) + Number(Math.round(discount * 0.03))
                  }`} */}
                    <span className="font-extrabold pl-[1vw] text-[1.3vw]">
                      {`₹ ${
                        calculateDiscountedFare(
                          BusDetails?.BUS_START_DATE,
                          Number(faredetails?.TotadultFare)
                        ) + Number(totaltax)
                      }`}
                    </span>
                  </label>
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
      </div>
      {/* <Drawer
        placement={"right"}
        closable={false}
        onClose={setShowTicket(false)}
        open={showTicket}
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
