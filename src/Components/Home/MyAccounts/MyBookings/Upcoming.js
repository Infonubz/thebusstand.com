import React, { useEffect, useState } from "react";
//import booking_bus from "../../../../assets/booking_bus.png";
import { FaArrowRightLong } from "react-icons/fa6";
import dayjs from "dayjs";
import { IoPersonOutline } from "react-icons/io5";
//import { LuDownload } from "react-icons/lu";
import empty from "../../../../assets/empty.png";
import { GetBookingStatusDetails } from "../../../../Api/MyAccounts/MyBookings";
import { useDispatch, useSelector } from "react-redux";
import { Drawer, Popover } from "antd";
//import DrawerDetails from "../../../Dashboard/Drawer";
import TicketView from "./TicketView";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import { capitalizeFirstLetter } from "../../../Common/Captalization";
import { HiTicket } from "react-icons/hi2";
import MobileTicketView from "../../../MobileView/MobileTicketView";

function convertTo12Hour(timeString) {
  const [hours, minutes] = timeString.split(":");
  let hour = parseInt(hours);
  const ampm = hour >= 12 ? "PM" : "AM";
  hour = hour % 12 || 12;
  return `${hour}:${minutes} ${ampm}`;
}

export default function Upcoming() {
  // const [showInvoice, setShowInvoice] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [ticketDetails, setTicketDetails] = useState([]);
  const [spinning, setSpinning] = useState(false);
  const [viewmodalIsOpen, setViewModalIsOpen] = useState(false);

  console.log(viewmodalIsOpen, "modalmodaldd");

  // const closeModal = () => {
  //   setViewModalIsOpen(false);
  // };

  const onClose = () => {
    setShowModal(false);
    setViewModalIsOpen(false);
  };
  // const UpcomingDetails = [
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
  //     passenger_name: ["Mithun Kumar"],
  //   },
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
  //     passenger_name: ["Mithun Kumar", "Subash"],
  //   },
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
  //     passenger_name: ["Mithun Kumar", "Subash", "Manoj"],
  //   },
  // ];
  const UpcomingDetailss = useSelector((state) => state.booking_details_status);
  console.log(UpcomingDetailss, "ithuulla");

  // const ticketdetails = useSelector((state)=>state.ticket_details)
  // console.log(ticketdetails,"ticketdetailsin the isdfkdsnf");

  const dispatch = useDispatch();

  useEffect(() => {
    const statusid = `upcoming`;
    const Number = sessionStorage.getItem("user_mobile");
    setSpinning(true);
    GetBookingStatusDetails(statusid, Number, dispatch, setSpinning);
  }, [dispatch]);
  // useEffect(() => {
  //   if (UpcomingDetailss.map((item) => item.passenger_name.length > 3)) {
  //     const passengerlist = UpcomingDetailss.map((item) => {
  //       return item.passenger_name.slice(3);
  //     });
  //     console.log(passengerlist, "passengerlist");
  //   }
  // }, [UpcomingDetailss]);
  //const [passCount, setPassCount] = useState(false);

  useEffect(() => {
    UpcomingDetailss?.forEach((booking, index) => {
      const passengerCount = booking.passenger.length;
      if (passengerCount > 3) {
        //setPassCount(true);
      }
      console.log(
        `Booking ID: ${booking.Booking_Id}, Passenger Count: ${passengerCount}`
      );
    });
  }, [UpcomingDetailss]);
  const updateStartIndex = (item) => {
    const width = window.innerWidth;
    setTicketDetails(item);
    if (width < 640) {
      // mobile
      setViewModalIsOpen(true);
    }
  };

  return (
    <>
      {spinning ? (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
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
        <div className="">
          {UpcomingDetailss?.length > 0 ? (
            <div
              className={`flex mt-[2vw] md:mt-[0vw] md:text-[1vw] text-[3.5vw]  items-center justify-end text-[#1F487C] font-bold`}
            >
              <HiTicket
                className={`md:block hidden`}
                size={"1.6vw"}
                color="#1F487C"
              />
              <HiTicket
                className={`block md:hidden`}
                size={"5.5vw"}
                color="#1F487C"
              />
              {/* <span className="ml-2">
              Showing {UpcomingDetailss?.length} completed tickets
            </span> */}
              <span
                className={`ml-2 flex items-center md:text-[1vw] text-[4vw]`}
              >
                Showing{" "}
                <span
                  className={`rounded-full font-extrabold md:text-[1vw] text-[5vw] text-[#1F487C] mx-[0.5vw]`}
                >
                  {UpcomingDetailss?.length}
                </span>{" "}
                Tickets
              </span>
            </div>
          ) : (
            ""
          )}
          {UpcomingDetailss?.length > 0 ? (
            <div
              className={`md:h-[32vw] max-h-[85vh] overflow-y-scroll pb-[20vw] md:pb-[5vw]`}
            >
              {UpcomingDetailss?.map((item) => (
                <div
                  onClick={() => {
                    updateStartIndex(item);
                  }}
                  className={`grid grid-rows-5 w-full h-[35vw] md:h-[15vw] shadow-md shadow-gray-400  bg-white mt-[4vw] md:mt-[1vw] border-[0.1vw] border-gray-400 
                  md:rounded-[1vw] rounded-[2vw] relative`}
                >
                  {/* <div className="absolute left-[-1.5vw] top-[1.6vw] ">
                <div className="bg-white w-[2.5vw] h-[2.5vw] border-[0.2vw] rounded-full z-[1] border-[#8EA3BD] flex items-center justify-center">
                  <img src={booking_bus} className="w-[1.7vw] h-[1.7vw]" />
                </div>
              </div> */}
                  <div
                    className={`row-span-5 w-full border-b-[0.1vw]  border-gray-400`}
                  >
                    <div
                      className={`grid grid-cols-5 md:grid-cols-4 w-full h-full flex-col items-center`}
                    >
                      <div className="col-span-3 flex flex-col gap-y-[0.5vw] pl-[4vw]">
                        <div className={`flex items-center`}>
                          <label
                            className={`block md:hidden text-[3.7vw] text-[#1F487C] font-semibold`}
                          >
                            {item.operator_name}
                          </label>
                          <label
                            className={`md:block hidden text-[1.1vw] text-[#1F487C] font-bold`}
                          >
                            {item.departure_name}
                          </label>
                          <span className={`md:block hidden px-[0.5vw]`}>
                            <FaArrowRightLong color="#1F487C" />
                          </span>
                          <label
                            className={`md:block hidden text-[1.1vw] text-[#1F487C] font-bold`}
                          >
                            {item.arrival_name} {`(${item.operator_name})`}
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
                            className={`md:text-[1.1vw] text-[3.3vw] text-[#1F487C]`}
                          >
                            {`Booking ID - ${item.Booking_Id}`}
                          </label>
                        </div>
                      </div>
                      <div className={`col-span-2 md:col-span-1 flex`}>
                        <button
                          onClick={() => {
                            setShowModal(true);
                            setTicketDetails(item);
                          }}
                          className={`md:block hidden bg-[#1F487C] text-[1.1vw] font-bold rounded-full text-white w-[15vw] h-[3vw]`}
                        >
                          VIEW BOOKING
                        </button>
                        <div
                          onClick={() => {
                            setViewModalIsOpen(true);
                            setTicketDetails(item);
                          }}
                          className={`block pl-[25vw] md:hidden text-[3.5vw] font-semibold text-[#1F487C]`}
                        >
                          View
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className={`row-span-7 w-full pl-[4vw] h-full pt-[1vw] pb-[1vw]`}
                  >
                    <div
                      className={`items-center  h-full grid grid-cols-6 pr-[vw]`}
                    >
                      <div
                        className={`flex justify-between col-span-5 md:col-span-4 md:pr-[5vw]`}
                      >
                        <div
                          className={`flex md:block hidden flex-col gap-y-[0.5vw]`}
                        >
                          <label
                            className={`md:text-[1.1vw] text-[3.2vw] text-[#1F487C] `}
                          >
                            From
                          </label>
                          <label
                            className={`flex items-center pt-2 gap-[0.5vw]`}
                          >
                            <span
                              className={`md:text-[1.1vw] text-[3vw] text-[#1F487C] font-bold`}
                            >
                              {dayjs(item.departure_date).format("DD MMM' YY")}
                            </span>
                            <span
                              className={`md:text-[1.1vw] text-[3vw] text-[#1F487C] `}
                            >
                              {convertTo12Hour(item.departure_time)}
                            </span>
                          </label>
                          <label
                            className={`flex text-[1.1vw] pt-2 text-[#1F487C] font-bold `}
                          >
                            {item.departure_name}
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
                              {dayjs(item.arrival_date).format("DD MMM' YY")}
                            </span>
                            <span className={`text-[1.1vw] text-[#1F487C] `}>
                              {convertTo12Hour(item.arrival_time)}
                            </span>
                          </label>
                          <label
                            className={`flex text-[1.1vw] pt-2 text-[#1F487C] font-bold `}
                          >
                            {item.arrival_name}
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
                          <label className="text-[3.5vw] text-[#1F487C]">
                            {item.departure_name}
                          </label>
                          <label className={`flex items-center gap-[2vw]`}>
                            <span
                              className={`text-[3vw] text-[#1F487C] font-bold`}
                            >
                              {dayjs(item.departure_date).format("DD MMM' YY")}
                            </span>
                            <span className={`text-[3vw] text-[#1F487C]`}>
                              {convertTo12Hour(item.departure_time)}
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
                            {item.arrival_name}
                          </label>
                          <label className={`flex items-center gap-[2vw]`}>
                            <span
                              className={`text-[3.2vw] text-[#1F487C] font-bold`}
                            >
                              {dayjs(item.arrival_date).format("DD MMM' YY")}
                            </span>
                            <span className={`text-[3.2vw] text-[#1F487C] `}>
                              {convertTo12Hour(item.arrival_time)}
                            </span>
                          </label>
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
                      <div className={`md:block hidden col-span-2`}>
                        <div className={`flex justify-center`}>
                          <div
                            className={` ${
                              item?.passenger?.length > 3
                                ? "grid grid-cols-2 gap-x-[1.5vw] gap-y-[.5vw]"
                                : "flex flex-col gap-y-[0.5vw]"
                            }`}
                          >
                            {item?.passenger?.map((list) => (
                              <Popover
                                key={list.user_name}
                                content={list.user_name}
                                trigger="hover"
                              >
                                <label
                                  className={`flex items-center gap-x-[0.5vw]`}
                                >
                                  <span>
                                    <IoPersonOutline
                                      size={"1.2vw"}
                                      color={"#1F487C"}
                                    />
                                  </span>
                                  <span
                                    className={`text-[1.1vw] text-[#1F487C] font-bold`}
                                  >
                                    {list?.user_name?.length > 8
                                      ? `${list.user_name.slice(0, 8)}...`
                                      : list.user_name}
                                    {/* {(list.user_name)} */}
                                  </span>
                                </label>
                              </Popover>
                            ))}
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

          {/* {showInvoice?<DrawerDetails showInvoice={showInvoice}/>:""} */}
          <TicketView
            showModal={showModal}
            setShowModal={setShowModal}
            ticketDetails={ticketDetails}
          />
        </div>
      )}
      <Drawer
        // title="Basic Drawer"
        placement={"bottom"}
        closable={false}
        onClose={onClose}
        open={viewmodalIsOpen}
        key={"bottom"}
        width={"100%"}
        height={"80%"}
      >
        <MobileTicketView
          // showModal={viewmodalIsOpen}
          // setShowModal={setViewModalIsOpen}
          ticketDetails={ticketDetails}
        />
      </Drawer>
    </>
  );
}
