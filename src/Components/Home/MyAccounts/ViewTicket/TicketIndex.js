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



const validationSchema = Yup.object({
  ticketNumber: Yup.string().required("Ticket Number is required"),
  phoneNumber: Yup.string()
    .required("Phone Number is required")
    .matches(/^[0-9]+$/, "Phone Number must be a number")
    .min(10, "Phone Number must be at least 10 digits"),
});

const TicketIndex = () => {

  const [showList ,setShowList] = useState(false);
  const [ticketDetails, setTicketDetails] = useState("");
  const [passCount, setPassCount] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [spinning,setSpinning] = useState(false);

  const handleSubmit = async(values) => {
    console.log(values, "response for ticket");
    setSpinning(true)
    try {
      const response = await TicketViewDetails(values?.ticketNumber, values?.phoneNumber,setSpinning);
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
      {({handleSubmit,
         setFieldValue,
         handleChange
      }) => (
        <Form onSubmit={handleSubmit}>
          <div className="w-full h-[15vw] bg-white rounded-[.9vw] border-b-[0.1vw]">
            <div className="text-center text-[#1F487C] p-[1vw] font-bold text-[1.5vw]">
              View Ticket
            </div>
            <div className="text-center text-[#1F487C] p-[.5vw] font-semibold text-[1.1vw]">
              Verify your details, and View your Tickets
            </div>
            <div className="flex justify-evenly mt-[3vw]">
              <div className="relative">
                <Field
                  name="ticketNumber"
                  placeholder="Ticket Number *"
                  type="text"
                  className="border-[.1vw] rounded-[.5vw] w-[23vw] h-[3vw] border-gray-400 pl-[1vw] text-[#1F487C] placeholder-[#1F487C]"
                  onChange={(e) => {
                    handleChange(e);
                    setFieldValue("ticketNumber", e.target.value);
                  }}
                />
                <ErrorMessage
                  name="ticketNumber"
                  component="div"
                  className="text-red-600 text-[.9vw] absolute top-full left-0 mt-1"
                />
              </div>
              <div className="relative">
                <Field
                  name="phoneNumber"
                  placeholder="Phone Number *"
                  type="text"
                  className="border-[.1vw] rounded-[.5vw] w-[23vw] h-[3vw] border-gray-400 pl-[1vw] text-[#1F487C] placeholder-[#1F487C]"
                  onChange={(e) => {
                    handleChange(e);
                    setFieldValue("phoneNumber", e.target.value);
                  }}
                />
                <ErrorMessage
                  name="phoneNumber"
                  component="div"
                  className="text-red-600 text-[.9vw] absolute top-full left-0 mt-1"
                />
              </div>
              <button
                className="bg-[#1F487C] text-white rounded-[1.5vw] w-[11vw] h-[3vw]"
                type="submit"
              >
                Submit
              </button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
    </div>
   {showList && 
    <div>
    <div className="">
      {ticketDetails ? (
        <div className="h-[35vw]  overflow-y-scroll ">
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
              indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />}
            />
          </div>
        ) : (
            <div className="grid grid-rows-12 w-full  max-h-[22vw] bg-white mt-[1vw] border-[0.1vw] border-gray-400 relative">
              <div className="absolute left-[-1.5vw] top-[1.6vw] ">
                <div
                  className="bg-white w-[2.5vw] h-[2.5vw] border-[0.2vw] rounded-full border-[#8EA3BD] flex items-center justify-center"
                  style={{
                    zIndex: 2,
                  }}
                >
                  <img src={booking_bus} className="w-[1.7vw] h-[1.7vw]" />
                </div>
              </div>
              <div className="row-span-5 w-full border-b-[0.1vw]  border-gray-400 ">
                <div className="grid grid-cols-4 w-full h-full flex-col items-center ">
                  <div className="col-span-3 flex flex-col gap-y-[0.5vw] pl-[4vw]">
                    <div className="flex items-center">
                      <label className="text-[1.1vw] text-[#1F487C] font-bold">
                        {ticketDetails?.departure_name}
                      </label>
                      <span className="px-[0.5vw]">
                        <FaArrowRightLong color="#1F487C" />
                      </span>
                      <label className="text-[1.1vw] text-[#1F487C] font-bold">
                        {ticketDetails?.arrival_name}
                      </label>
                    </div>
                    <div className="flex items-center gap-x-[0.5vw]">
                      <label className="text-[1.1vw] text-[#1F487C]">
                        {ticketDetails?.status}
                      </label>
                      <div className="h-[0.5vw] w-[0.5vw] bg-[#1F487C] rounded-full"></div>
                      <label className="text-[1.1vw] text-[#1F487C] font-bold">
                        {ticketDetails?.trip_type}
                      </label>
                      <div className="h-[0.5vw] w-[0.5vw] bg-[#1F487C] rounded-full"></div>
                      <label className="text-[1.1vw] text-[#1F487C] ">
                        {`Booking ID - ${ticketDetails?.Booking_Id}`}
                      </label>
                    </div>
                  </div>
                  <div className="col-span-1 flex items-center justify-center">
                    <button   
                    onClick={() => {
                        setShowModal(true);
                        setTicketDetails(ticketDetails);
                      }}
                       className="bg-[#1F487C] text-[1.1vw] font-bold rounded-full text-white w-[15vw] h-[3vw]">
                      VIEW BOOKING
                    </button>
                  </div>
                </div>
              </div>
              <div className=" row-span-7 w-full pl-[1vw] h-full pt-[1vw] pb-[1vw] pr-[2vw]">
                <div className="flex items-center px-[2vw] h-full justify-between">
                  <div className="flex flex-col gap-y-[0.5vw]">
                    <label className="text-[1.1vw] text-[#1F487C] ">From</label>
                    <label className="flex items-center gap-[0.5vw]">
                      <span className="text-[1.1vw] text-[#1F487C] font-bold">
                        {dayjs(ticketDetails?.departure_date).format("DD MMM' YY")}
                      </span>
                      <span className="text-[1.1vw] text-[#1F487C] ">
                        {ticketDetails?.departure_time}
                      </span>
                    </label>
                    <label className="text-[1.1vw] text-[#1F487C] font-bold ">
                      {ticketDetails?.departure_name}
                    </label>
                  </div>
                  <div className="flex flex-col gap-y-[0.5vw]">
                    <label className="text-[1.1vw] text-[#1F487C] ">To</label>
                    <label className="flex items-center gap-[0.5vw]">
                      <span className="text-[1.1vw] text-[#1F487C] font-bold">
                        {dayjs(ticketDetails?.arrival_date).format("DD MMM' YY")}
                      </span>
                      <span className="text-[1.1vw] text-[#1F487C] ">
                        {ticketDetails?.arrival_time}
                      </span>
                    </label>
                    <label className="text-[1.1vw] text-[#1F487C] font-bold ">
                      {ticketDetails?.arrival_name}
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
                            <IoPersonOutline size={"1.2vw"} color={"#1F487C"} />
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
          <img src={empty} className="w-[12vw] h-[13vw]" />
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
   }
   
    </>
  );
};

export default TicketIndex;
