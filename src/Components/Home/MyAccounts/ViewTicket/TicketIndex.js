import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { TicketViewDetails } from "../../../../Api/MyAccounts/MyBookings";
import TicketView from "../MyBookings/TicketView";
import { FaArrowRightLong } from "react-icons/fa6";
import empty from "../../../../assets/empty.png";
import booking_bus from "../../../../assets/booking_bus.png";
import dayjs from "dayjs";
import { IoPersonOutline } from "react-icons/io5";
import { Popover, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

function convertTo12Hour(timeString) {
  const [hours, minutes] = timeString.split(":");
  let hour = parseInt(hours);
  const ampm = hour >= 12 ? "PM" : "AM";

  hour = hour % 12 || 12;
  return `${hour}:${minutes} ${ampm}`;
}

const validationSchema = Yup.object({
  ticketNumber: Yup.string().required("Ticket Number is required"),
  phoneNumber: Yup.string()
    .required("Phone Number is required")
    .matches(/^[0-9]+$/, "Phone Number must be a number")
    .min(10, "Phone Number must be at least 10 digits"),
});

const TicketIndex = () => {
  const [showList, setShowList] = useState(false);
  const [ticketDetails, setTicketDetails] = useState("");
  const [passCount, setPassCount] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [spinning, setSpinning] = useState(false);

  const handleSubmit = async (values) => {
    console.log(values, "response for ticket");
    setSpinning(true);
    try {
      const response = await TicketViewDetails(
        values?.ticketNumber,
        values?.phoneNumber,
        setSpinning
      );
      console.log(response, "response for ticketdtl");
      setShowList(true);
      setTicketDetails(response);
    } catch (error) {
      console.error("Error", error);
    }
  };

  useEffect(() => {
    const passengerCount = ticketDetails?.passenger?.length;
    if (passengerCount > 3) {
      setPassCount(true);
    }
    console.log(
      `Booking ID: ${ticketDetails?.Booking_Id}, Passenger Count: ${passengerCount}`
    );
  }, [ticketDetails]);

  return (
    <>
      <div>
        <Formik
          initialValues={{
            ticketNumber: "",
            phoneNumber: "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            handleSubmit(values);
          }}
          enableReinitialize={false}
        >
          {({ handleSubmit, setFieldValue, handleChange }) => (
            <Form onSubmit={handleSubmit}>
              <div className="w-full shadow-lg shadow-gray-400 h-[75vw] md:h-[15vw] bg-white rounded-[2vw] md:rounded-[.9vw] border-b-[0.1vw]">
                <div className="text-center py-[3vw] md:py-[1vw] text-[#1F487C] p-[1vw] font-bold text-[5vw] md:text-[1.5vw]">
                  View Ticket
                </div>
                <div className="text-center text-[#1F487C] p-[.5vw] font-semibold text-[4vw] md:text-[1.1vw]">
                  Verify your details, and View your Tickets
                </div>
                <div className="grid grid-rows-3 gap-y-[7vw] justify-center md:gap-y-[0vw] md:flex md:justify-evenly mt-[5vw] md:mt-[3vw]">
                  <div className="relative flex">
                    <Field
                      name="ticketNumber"
                      placeholder="Ticket Number *"
                      type="text"
                      className="placeholder:text-[3.6vw] md:placeholder:text-[1.2vw] border-[.1vw] rounded-[1.5vw] md:rounded-[.5vw] w-[70vw] h-[10vw] md:w-[23vw] md:h-[3vw] border-gray-400 pl-[1vw] text-[#1F487C] placeholder-[#1F487C]"
                      onChange={(e) => {
                        handleChange(e);
                        setFieldValue("ticketNumber", e.target.value);
                      }}
                    />
                    <ErrorMessage
                      name="ticketNumber"
                      component="div"
                      className="text-red-600 text-[3vw] md:text-[.9vw] absolute top-full left-0 mt-1"
                    />
                  </div>
                  <div className="relative flex">
                    <Field
                      name="phoneNumber"
                      placeholder="Phone Number *"
                      type="text"
                      className="placeholder:text-[3.6vw] md:placeholder:text-[1.2vw] border-[.1vw] rounded-[1.5vw] md:rounded-[.5vw] w-[70vw] h-[10vw] 
                      md:w-[23vw] md:h-[3vw] border-gray-400 pl-[1vw] text-[#1F487C] placeholder-[#1F487C]"
                      onChange={(e) => {
                        handleChange(e);
                        setFieldValue("phoneNumber", e.target.value);
                      }}
                    />
                    <ErrorMessage
                      name="phoneNumber"
                      component="div"
                      className="text-red-600 text-[3vw] md:text-[.9vw] absolute top-full left-0 mt-1"
                    />
                  </div>
                  <div className="relative flex justify-center">
                    <button
                      className={`bg-[#1F487C] text-white rounded-[5vw] w-[25vw] h-[10vw] md:w-[11vw] md:h-[3vw]`}
                      type="submit"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
      {showList && (
        <div>
          <div className="">
            {ticketDetails ? (
              <div className="md:h-[35vw] md:md-[0vw] md:mt-[0vw] mt-[9vw] h-[60vw] overflow-y-scroll ">
                {/* {ticketDetails?.map((item) => ( */}
                {spinning ? (
                  <div
                    style={{
                      position: "fixed",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      // background: "rgba(0, 0, 0, 0.2)",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      zIndex: 1000,
                    }}
                  >
                    <Spin
                      className="pl-[20vw]"
                      style={{
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                      spinning={spinning}
                      indicator={
                        <LoadingOutlined style={{ fontSize: 48 }} spin />
                      }
                    />
                  </div>
                ) : (
                  <div className="grid grid-rows-12 w-full h-[45vw] md:max-h-[22vw] bg-white mt-[1vw] border-[0.1vw] border-gray-400 relative md:rounded-none rounded-[2vw]">
                    <div className="absolute left-[-1.5vw] top-[3vw] md:top-[1.6vw] ">
                      {/* <div
                  className="bg-white w-[3.5vw] h-[4vw] md:w-[2.5vw] md:h-[2.5vw] border-[0.2vw] rounded-[90vw] md:rounded-full border-[#8EA3BD] flex items-center justify-center"
                  style={{
                    zIndex: 2,
                  }}
                >
                  <img src={booking_bus} alt="bookingBus" className="w-[2.5vw] h-[3vw] md:w-[1.7vw] md:h-[1.7vw]" />
                </div> */}
                    </div>
                    <div className="row-span-5 w-full border-b-[0.1vw]  border-gray-400 ">
                      <div className="grid grid-cols-4 w-full h-full flex-col items-center ">
                        <div className="col-span-3 flex flex-col gap-y-[0.5vw] pl-[4vw]">
                          <div className="flex items-center">
                            <label className="block md:hidden text-[4.2vw] text-[#1F487C] font-semibold">
                              {ticketDetails?.operator_name}
                            </label>
                            <label className="md:block hidden text-[1.1vw] text-[#1F487C] font-bold">
                              {ticketDetails?.departure_name}
                            </label>
                            <span className="md:block hidden px-[0.5vw]">
                              <FaArrowRightLong color="#1F487C" />
                            </span>
                            <label className="md:block hidden text-[1.1vw] text-[#1F487C] font-bold">
                              {ticketDetails?.arrival_name}
                            </label>
                          </div>
                          <div className="flex items-center gap-x-[0.5vw]">
                            <label className="md:block hidden text-[1.1vw] text-[#1F487C]">
                              {ticketDetails?.status}
                            </label>
                            <div className="md:block hidden h-[0.5vw] w-[0.5vw] bg-[#1F487C] rounded-full"></div>
                            <label className="text-[3.7vw] md:text-[1.1vw] text-[#1F487C] font-bold">
                              {ticketDetails?.trip_type}
                            </label>
                            <div className="md:block hidden h-[0.5vw] w-[0.5vw] bg-[#1F487C] rounded-full"></div>
                            <label className="md:text-[1.1vw] text-[3.7vw] text-[#1F487C] ">
                              {`Booking ID - ${ticketDetails?.Booking_Id}`}
                            </label>
                          </div>
                        </div>
                        <div className="col-span-1 md:block hidden flex items-center justify-center">
                          <button
                            onClick={() => {
                              setShowModal(true);
                              setTicketDetails(ticketDetails);
                            }}
                            className="bg-[#1F487C] text-[1.1vw] font-bold rounded-full text-white w-[15vw] h-[3vw]"
                          >
                            VIEW BOOKING
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className=" row-span-7 w-full pl-[1vw] h-full pt-[1vw] pb-[1vw] pr-[2vw]">
                      <div className="flex items-center px-[2vw] h-full justify-between">
                        <div className="flex flex-col gap-y-[0.5vw]">
                          <label className="text-[3.5vw] md:text-[1.1vw] text-[#1F487C] ">
                            From
                          </label>
                          <label className="flex md:block hidden  items-center gap-[0.5vw]">
                            <span className="text-[3.5vw] md:text-[1.1vw] text-[#1F487C] font-bold">
                              {dayjs(ticketDetails?.departure_date).format(
                                "DD MMM' YY"
                              )}
                            </span>
                            <span className="text-[3.5vw] md:text-[1.1vw] text-[#1F487C] ">
                              {convertTo12Hour(ticketDetails?.departure_time)}
                            </span>
                          </label>
                          <label className="text-[3.5vw] md:text-[1.1vw] text-[#1F487C] font-bold ">
                            {ticketDetails?.departure_name}
                          </label>
                          <label className="flex block md:hidden items-center gap-[2vw]">
                            <span className="text-[3.5vw] md:text-[1.1vw] text-[#1F487C] font-bold">
                              {dayjs(ticketDetails?.departure_date).format(
                                "DD MMM' YY"
                              )}
                            </span>
                            <span className="text-[3.5vw] md:text-[1.1vw] text-[#1F487C] ">
                              {convertTo12Hour(ticketDetails?.departure_time)}
                            </span>
                          </label>
                        </div>
                        <div className="flex flex-col gap-y-[0.5vw]">
                          <label className="text-[3.5vw] md:text-[1.1vw] text-[#1F487C] ">
                            To
                          </label>
                          <label className="md:block hidden flex items-center gap-[0.5vw]">
                            <span className="text-[3.5vw] md:text-[1.1vw] text-[#1F487C] font-bold">
                              {dayjs(ticketDetails?.arrival_date).format(
                                "DD MMM' YY"
                              )}
                            </span>
                            <span className="text-[3.5vw] md:text-[1.1vw] text-[#1F487C] ">
                              {convertTo12Hour(ticketDetails?.arrival_time)}
                            </span>
                          </label>
                          <label className="text-[3.5vw] md:text-[1.1vw] text-[#1F487C] font-bold ">
                            {ticketDetails?.arrival_name}
                          </label>
                          <label className="block md:hidden flex items-center gap-[2vw]">
                            <span className="text-[3.5vw] md:text-[1.1vw] text-[#1F487C] font-bold">
                              {dayjs(ticketDetails?.arrival_date).format(
                                "DD MMM' YY"
                              )}
                            </span>
                            <span className="text-[3.5vw] md:text-[1.1vw] text-[#1F487C] ">
                              {convertTo12Hour(ticketDetails?.arrival_time)}
                            </span>
                          </label>
                        </div>
                        {/* <div 
                     className={`flex flex-col gap-y-[0.5vw] ${passCount ? 'grid grid-cols-2 gap-x-[.5vw]' : ''}`}
                     >
                    {ticketDetails?.passenger.map((list) => (
                      
                      <label className="flex items-center gap-x-[0.5vw]">
                        
                        <span>
                          <IoPersonOutline size={"1.2vw"} color={"#1F487C"} />
                        </span>
                        <span className="text-[1.1vw] text-[#1F487C] font-bold ">
                          {list.user_name}
                        </span>
                      </label>
                    ))}
                  </div> */}
                        <div className="md:block hidden col-span-2">
                          <div
                            className={`flex flex-col gap-y-[0.5vw] ${
                              passCount ? "grid grid-cols-2 gap-x-[2vw]" : ""
                            }`}
                          >
                            {ticketDetails?.passenger.map((list) => (
                              <Popover
                                key={list.user_name}
                                content={list.user_name}
                                trigger="hover"
                              >
                                <label className="flex items-center gap-x-[0.5vw]">
                                  <span>
                                    <IoPersonOutline
                                      size={"1.2vw"}
                                      color={"#1F487C"}
                                    />
                                  </span>
                                  <span className="text-[1.1vw] text-[#1F487C] font-bold">
                                    {list.user_name.length > 8
                                      ? `${list.user_name.slice(0, 8)}...`
                                      : list.user_name}
                                    {/* {(list.user_name)} */}
                                  </span>
                                </label>
                              </Popover>
                            ))}
                          </div>
                        </div>
                        {/* <div className="flex flex-col gap-y-[0.5vw]">
                    <label
                      // onClick={() => {
                      //   setShowModal(true);
                      //   setTicketDetails(item);
                      // }}
                      className="flex items-center gap-x-[0.5vw]"
                    >
                      <span>
                        <LuDownload size={"1.2vw"} color={"#1F487C"} />
                      </span>
                      <span className="text-[1.1vw] text-[#1F487C] font-bold ">
                        Preview Invoice
                      </span>
                    </label>
                  </div> */}
                      </div>
                    </div>
                  </div>
                )}
                {/* ))} */}
              </div>
            ) : (
              <div className="flex gap-x-[3vw] items-center pt-[3vw] justify-center">
                <img src={empty} alt="empty" className="w-[12vw] h-[13vw]" />
                <div className="flex flex-col gap-y-[0.5vw]">
                  <label className="text-[2vw] text-[#1F487C] font-bold ">
                    Invalid Ticket Number or Phone Number
                  </label>
                  <label className="flex text-[1.2vw] text-[#1F487C] items-center gap-[0.5vw]">
                    Looks like given details are invalid
                  </label>
                  <button className="bg-[#1F487C] mt-[1vw] w-[12vw] text-white font-bold text-[1.2vw] h-[3vw] rounded-full">
                    Plan a Trip
                  </button>
                </div>
              </div>
            )}

            {/* {showInvoice?<DrawerDetails showInvoice={showInvoice}/>:""} */}
            <TicketView
              showModal={showModal}
              setShowModal={setShowModal}
              ticketDetails={ticketDetails}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default TicketIndex;
