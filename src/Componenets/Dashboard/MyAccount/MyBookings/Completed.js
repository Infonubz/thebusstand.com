import React, { useEffect, useState } from "react";
//import booking_bus from "../../../../assets/booking_bus.png";
import { FaArrowRightLong } from "react-icons/fa6";
import dayjs from "dayjs";
import { IoPersonOutline } from "react-icons/io5";
//import { LuDownload } from "react-icons/lu";
import empty from "../../../../Assets/CommonImages/empty.png";
import { useDispatch, useSelector } from "react-redux";
import { Popover, Drawer, Tooltip } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import { HiTicket } from "react-icons/hi2";
import { capitalizeFirstLetter } from "../../../Common/Common-Functions/Captalization";
import ViewFullTicket from "../ViewTicket/ViewFullTicket";
import { GetBookingStatusDetails } from "../../../../Api-TBS/MyAccounts/MyBookings";
import { decryptData } from "../../../Common/Common-Functions/Encrypt-Decrypt";
import { GET_TICKET_DETAILS } from "../../../../Store/Type";
import { ViewTicketById } from "../../../../Api-Abhibus/MyAccount/ViewTicket";
import busloading from "../../../../Assets/Gif/bus.gif";
import { Get_TBS_Booking_details } from "../../../../Api-TBS/Dashboard/Dashboard";

function convertTo12Hour(timeString) {
  // Split the time string into its components (hours, minutes, seconds)
  const [hours, minutes] = timeString?.split(":");

  // Convert hours from string to number
  let hour = parseInt(hours);

  // Determine AM or PM
  const ampm = hour >= 12 ? "PM" : "AM";

  // Convert 24-hour time to 12-hour time
  hour = hour % 12 || 12;

  // Return formatted time with AM/PM
  return `${hour}:${minutes} ${ampm}`;
}

export default function Completed() {
  const [showModal, setShowModal] = useState(false);
  const [ticketDetails, setTicketDetails] = useState([]);
  const [spinning1, setSpinning1] = useState(false);
  const [spinning, setSpinning] = useState(false);
  // const completedDetails = [
  //   {
  //     depature: "Chennai",
  //     arraival: "Coimbatore",
  //     status: "Completed",
  //     trip_type: "One Way Bus",
  //     booking_id: "NU123456789101234",
  //     depature_date: new Date(),
  //     arraival_date: new Date(),
  //     depature_time: "11:30 PM",
  //     arraival_time: "05:30 AM",
  //     passenger_name: "Mithun Kumar",
  //   },
  // ];
  // const passenger = [
  //   {
  //     user_name: "John Doe",
  //   },
  //   {
  //     user_name: "Jane Smith",
  //   },
  //   {
  //     user_name: "Alice Johnson",
  //   },
  //   {
  //     user_name: "mark",
  //   },
  //   {
  //     user_name: "jeff",
  //   },
  // ];

  const completedDetails = useSelector((state) => state.booking_details);
  console.log(completedDetails, "ithuulla");

  const dispatch = useDispatch();

  useEffect(() => {
    const statusid = 2;
    const user_id = sessionStorage.getItem("user_id");
    const login_user_id = decryptData(user_id);
    setSpinning1(true);
    GetBookingStatusDetails(statusid, login_user_id, dispatch, setSpinning1);
  }, [dispatch]);

  const [viewmodalIsOpen, setViewModalIsOpen] = useState(false);

  const closeModal = () => {
    setViewModalIsOpen(false);
  };

  //  setTimeout(() => {
  //   setSpinning1(false)
  // }, 500);

  // const isTwoColumn = passenger.length > 3;
  //const [passCount, setPassCount] = useState(false);

  useEffect(() => {
    completedDetails?.forEach((booking, index) => {
      const passengerCount = booking?.passenger_details?.length;
      if (passengerCount > 3) {
        //setPassCount(true);
      }
      console.log(
        `Booking ID: ${booking.Booking_Id}, Passenger Count: ${passengerCount}`
      );
    });
  }, [completedDetails]);
  const updateStartIndex = (item) => {
    const width = window.innerWidth;
    if (width < 640) {
      // mobile
      setTicketDetails(item);
      setViewModalIsOpen(true);
    }
  };

  const onClose = () => {
    setViewModalIsOpen(false);
    dispatch({
      type: GET_TICKET_DETAILS,
      payload: [],
    });
  };
  const handleviewticket = async (ticketno) => {
    setViewModalIsOpen(true);
    console.log("yyyyyyyyyyyyy");
    Get_TBS_Booking_details(ticketno, dispatch);

    try {
      console.log("tyucusdcsd");

      const ticketdetails = await ViewTicketById(ticketno, setSpinning);
      dispatch({
        type: GET_TICKET_DETAILS,
        payload: ticketdetails,
      });
    } catch (err) {
      console.log(err);
    }
  };
  const ticketlist = useSelector((state) => state?.get_ticket_detail);
  return (
    <>
      {spinning1 ? (
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
            spinning1={spinning1}
            indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />}
          />
        </div>
      ) : (
        <div>
          {completedDetails?.length > 0 ? (
            <div
              className={`flex mt-[2vw] mb-[0.5vw] z-[2]  md:mt-[0vw] md:text-[1vw] text-[3.5vw]  items-center justify-end pr-[0.5vw] text-[#1F487C] font-bold`}
            >
              {/* <HiTicket
                className={`md:block hidden`}
                size={"1.6vw"}
                color="#1F487C"
              />
              <HiTicket
                className={`block md:hidden`}
                size={"5.5vw"}
                color="#1F487C"
              /> */}
              {/* <span className="ml-2">
              Showing {completedDetails?.length} completed tickets
            </span> */}
              <span
                className={` flex items-center pl-[1vw] md:text-[1vw] text-[4vw] gap-x-[0.5vw]`}
              >
                Showing{" "}
                <div className="bg-[#1F487C] rounded-full flex items-center justify-center w-[1.75vw] h-[1.75vw]">
                  <span
                    className={`rounded-full font-extrabold md:text-[0.9vw] text-[4vw] text-white `}
                  >
                    {completedDetails?.length}
                  </span>{" "}
                </div>
                Tickets
              </span>
            </div>
          ) : (
            ""
          )}
          {completedDetails?.length > 0 ? (
            <div className="md:h-[28vw]   overflow-y-scroll  ">
              {completedDetails?.map((item) => (
                <div
                  onClick={() => {
                    updateStartIndex(item);
                  }}
                  className="grid grid-rows-5 w-full mb-[1.5vw] h-[35vw] md:h-[13vw] shadow-md shadow-gray-400  bg-white  border-[0.1vw] border-gray-400 md:rounded-[1vw] rounded-[2vw] relative"
                >
                  {/* <div className="absolute left-[-1.5vw] top-[1.6vw] ">
                <div
                  className="bg-white w-[2.5vw] h-[2.5vw] border-[0.2vw] rounded-full border-[#8EA3BD] flex items-center justify-center"
                  style={{
                    zIndex: 1,
                  }}
                >
                  <img src={booking_bus} className="w-[1.7vw] h-[1.7vw]" />
                </div>
              </div> */}
                  <div
                    className={`row-span-2 w-full border-b-[0.1vw] border-gray-400 `}
                  >
                    <div
                      className={`grid grid-cols-5 md:grid-cols-4 w-full h-full flex-col items-center`}
                    >
                      <div
                        className={`col-span-3 flex flex-col gap-y-[0.5vw] pl-[4vw]`}
                      >
                        <div className={`flex items-center`}>
                          <label
                            className={`block md:hidden text-[3.7vw] text-[#1F487C] font-semibold`}
                          >
                            {item.operator_name}
                          </label>
                          <label
                            className={`md:block hidden text-[1.1vw] text-[#1F487C] font-bold`}
                          >
                            {item.source_name}
                          </label>
                          <span className={`md:block hidden px-[0.5vw]`}>
                            <FaArrowRightLong color="#1F487C" />
                          </span>
                          <label
                            className={`md:block hidden text-[1.1vw] text-[#1F487C] font-bold`}
                          >
                            {item.destination_name} {`(${item.operator_name})`}
                          </label>
                        </div>
                        <div className={`flex items-center md:gap-x-[0.4vw]`}>
                          <label
                            className={`md:block hidden md:text-[1.1vw] text-[2.6vw] text-[#1F487C]`}
                          >
                            {capitalizeFirstLetter(item.status)}
                          </label>
                          {/* <div className="h-[0.5vw] w-[0.5vw] bg-[#1F487C] rounded-full"></div> */}
                          <label
                            className={`text-[1.1vw] text-[#1F487C] font-bold`}
                          >
                            {/* {item.trip_type} */}
                          </label>
                          <div
                            className={`md:block hidden h-[0.5vw] w-[0.5vw] bg-[#1F487C] rounded-full`}
                          ></div>
                          <label
                            className={`md:text-[1.1vw] md:block hidden text-[3.3vw] text-[#1F487C] `}
                          >
                            {`Booking ID - ${item.ticket_no}`}
                          </label>
                        </div>
                      </div>
                      <div className={`md:col-span-1 col-span-2`}>
                        <button
                          onClick={() => {
                            handleviewticket(item?.ticket_no);
                          }}
                          className={`md:block hidden bg-[#1F487C] text-[1.1vw] font-bold rounded-full text-white w-[15vw] h-[3vw]`}
                        >
                          VIEW BOOKING
                        </button>
                        <div className="flex flex-col ">
                          <label
                            className={`md:text-[1.1vw] md:hidden block text-[3.5vw] font-semibold text-[#1F487C] `}
                          >
                            {`Booking ID`}
                          </label>
                          <label
                            className={`md:text-[1.1vw] md:hidden block text-[3.3vw] text-[#1F487C] `}
                          >
                            {item.ticket_no}
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={`row-span-3 w-full px-[4vw] h-full`}>
                    <div
                      className={`items-center  h-full grid grid-cols-6 pr-[vw]`}
                    >
                      <div
                        className={`flex justify-between col-span-6 md:col-span-4 md:pr-[5vw] w-full`}
                      >
                        <div
                          className={`flex md:block hidden flex-col gap-y-[0.5vw]`}
                        >
                          <label
                            className={`md:text-[1.1vw] text-[3.2vw] text-[#1F487C]`}
                          >
                            From
                          </label>
                          <label
                            className={`flex items-center pt-2 gap-[0.5vw]`}
                          >
                            <span
                              className={`md:text-[1.1vw] text-[3vw] text-[#1F487C] font-bold`}
                            >
                              {`${dayjs(item.depature_date).format(
                                "DD MMM' YY"
                              )},`}
                            </span>
                            <span
                              className={`md:text-[1.1vw] text-[3vw] text-[#1F487C]`}
                            >
                              {item.depature_time}{" "}
                            </span>
                          </label>
                          <label
                            className={`flex text-[1.1vw] pt-2 text-[#1F487C] font-bold`}
                          >
                            {item.pickup_point_name}
                          </label>
                        </div>
                        <div
                          className={`flex md:block hidden  flex-col gap-y-[0.5vw]`}
                        >
                          <label className={`text-[1.1vw] text-[#1F487C] `}>
                            To
                          </label>
                          <label
                            className={`flex pt-2 items-center gap-[0.5vw]`}
                          >
                            <span
                              className={`text-[1.1vw] text-[#1F487C] font-bold`}
                            >
                              {`${dayjs(item.arrival_date).format(
                                "DD MMM' YY"
                              )},`}
                            </span>
                            <span className={`text-[1.1vw] text-[#1F487C] `}>
                              {item.arraival_time}
                            </span>
                          </label>
                          <label
                            className={`flex text-[1.1vw] pt-2 text-[#1F487C] font-bold `}
                          >
                            {item.droping_point_name}
                          </label>
                        </div>
                        <div
                          className={`block md:hidden flex flex-col gap-y-[0.5vw]`}
                        >
                          <label
                            className={`text-[3.5vw] text-[#1F487C] font-semibold`}
                          >
                            From
                          </label>
                          <label className={`text-[3.5vw] text-[#1F487C]`}>
                            {item.source_name}
                          </label>
                          <label className={`flex items-center gap-[2vw]`}>
                            <span
                              className={`text-[3vw] text-[#1F487C] font-bold`}
                            >
                              {dayjs(item.depature_date).format("DD MMM' YY")}
                            </span>
                            <span className={`text-[3vw] text-[#1F487C]`}>
                              {item.depature_time}
                            </span>
                          </label>
                        </div>
                        <div
                          className={`block md:hidden flex flex-col gap-y-[0.5vw]`}
                        >
                          <label
                            className={`text-[3.5vw] text-[#1F487C] font-semibold`}
                          >
                            To
                          </label>
                          <label className={`text-[3.5vw] text-[#1F487C]`}>
                            {item.destination_name}
                          </label>
                          <label className={`flex items-center gap-[2vw]`}>
                            <span
                              className={`text-[3.2vw] text-[#1F487C] font-bold`}
                            >
                              {dayjs(item.arrival_date).format("DD MMM' YY")}
                            </span>
                            <span className={`text-[3.2vw] text-[#1F487C] `}>
                              {item.arraival_time}
                            </span>
                          </label>
                        </div>
                        <div className="block  md:hidden">
                          <div
                            onClick={() => {
                              setViewModalIsOpen(true);
                              setTicketDetails(item);
                            }}
                            className={` text-[3.5vw] font-semibold text-[#1F487C] flex items-center justify-center w-full h-full`}
                          >
                            View
                          </div>
                        </div>
                      </div>
                      {/* <div 
      className={`flex flex-col gap-y-[0.5vw] ${passCount ? 'grid grid-cols-2 gap-x-[.5vw]' : ''}`}
    >
                    {item.passenger.map((list) => (
                      
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
                      <div className={`md:block hidden w-full col-span-2  `}>
                        <div className={`flex justify-center`}>
                          {console.log(
                            item?.passenger_details?.length,
                            "lengthhhhhhhhhhhhhhhhhhhhh"
                          )}
                          <div
                            className={`w-full ${
                              item?.passenger_details?.length > 3
                                ? "grid grid-cols-2 gap-x-[1.5vw] gap-y-[.5vw]"
                                : "flex flex-col gap-y-[0.5vw]"
                            }`}
                          >
                            {item?.passenger_details?.map((list) =>
                              list?.Passenger_Name?.length > 10 ? (
                                <Tooltip
                                  title={list.Passenger_Name}
                                  color="white"
                                  placement="bottom"
                                  overlayInnerStyle={{
                                    color: "#1F487C",
                                  }}
                                >
                                  <label
                                    className={`flex items-center gap-x-[1vw] md:gap-x-[0.5vw]`}
                                  >
                                    <span className={`md:block hidden`}>
                                      <IoPersonOutline
                                        size={"1.2vw"}
                                        color={"#1F487C"}
                                      />
                                    </span>
                                    <span className={`block md:hidden`}>
                                      <IoPersonOutline
                                        size={"3vw"}
                                        color={"#1F487C"}
                                      />
                                    </span>
                                    <span
                                      className={`md:text-[1.1vw] text-[3vw] text-[#1F487C] font-bold`}
                                    >
                                      {list?.Passenger_Name?.length > 10
                                        ? `${list.Passenger_Name.slice(
                                            0,
                                            10
                                          )}...`
                                        : list.Passenger_Name}
                                      {/* {(list.user_name)} */}
                                    </span>
                                  </label>
                                </Tooltip>
                              ) : (
                                <label className="flex items-center gap-x-[0.5vw]">
                                  <span className={`md:block hidden`}>
                                    <IoPersonOutline
                                      size={"1.2vw"}
                                      color={"#1F487C"}
                                    />
                                  </span>
                                  <span className={`block md:hidden`}>
                                    <IoPersonOutline
                                      size={"3vw"}
                                      color={"#1F487C"}
                                    />
                                  </span>
                                  <span
                                    className={`md:text-[1.1vw] text-[3vw] text-[#1F487C] font-bold`}
                                  >
                                    {list?.Passenger_Name}
                                  </span>
                                </label>
                              )
                            )}
                          </div>
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
              ))}
            </div>
          ) : (
            <div
              className={`md:flex flex flex-col gap-x-[3vw] items-center pt-[30vw] md:pt-[3vw] justify-center`}
            >
              <img
                src={empty}
                alt="empty"
                className={`md:w-[12vw] md:h-[13vw] w-[22vw] h-[22vw]`}
              />
              <div
                className={`flex flex-col gap-y-[0.5vw] items-center md:mt-[1vw] mt-[2vw]`}
              >
                <label
                  className={`md:text-[2vw] text-[4vw] text-[#1F487C] font-bold `}
                >
                  Looks empty, you’ve no cancelled bookings
                </label>
                <label
                  className={`flex md:text-[1.2vw] text-[3.5vw] text-[#1F487C] items-center gap-[0.5vw]`}
                >
                  Looks like you don’t have any cancelled trips
                </label>
                <button
                  className={`bg-[#1F487C] mt-[3vw] w-[30vw] md:mt-[1vw] md:w-[12vw] text-white font-bold text-[3.5vw] md:text-[1.2vw] 
             rounded-[5vw] h-[10vw] md:h-[3vw] md:rounded-full`}
                >
                  Plan a Trip
                </button>
              </div>
            </div>
          )}
          {/* <ViewFullTicket
            showModal={showModal}
            setShowModal={setShowModal}
            ticketDetails={ticketDetails}
          /> */}
        </div>
      )}
      {/* 
      <Drawer
        onClose={closeModal}
        placement={"bottom"}
        closable={false}
        open={viewmodalIsOpen}
        // key={"right"}
        // width={"75%"}
        className="block md:hidden custom-drawer"
        height="80%"
        width="100%"
      >
        <div>
          <div className="flex flex-col justify-center">
            <ViewFullTicket
              showModal={viewmodalIsOpen}
              setShowModal={setViewModalIsOpen}
              ticketDetails={ticketDetails}
            />
          </div>
        </div>
      </Drawer> */}

      <Drawer
        // title="Basic Drawer"
        placement={"right"}
        closable={false}
        onClose={onClose}
        open={viewmodalIsOpen}
        key={"bottom"}
        width={"60%"}
        height={"100%"}
      >
        {/* <MobileTicketView
          // showModal={viewmodalIsOpen}
          // setShowModal={setViewModalIsOpen}
          ticketDetails={ticketDetails}
        /> */}
        {spinning ? (
          <div className="flex items-center justify-center h-full w-full">
            <img src={busloading} className="h-[20vw] w-[40vw]" />
          </div>
        ) : (
          <ViewFullTicket
            showModal={viewmodalIsOpen}
            setShowModal={setViewModalIsOpen}
            ticketDetails={ticketlist}
          />
        )}
      </Drawer>
    </>
  );
}
