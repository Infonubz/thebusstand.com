import React, { useEffect, useState } from "react";
// import "./SeatLayout.css"; // Ensure correct styles
import { Abhibus_SeatLayout } from "../../../Api-Abhibus/Dashboard/DashboardPage";
import { useDispatch, useSelector } from "react-redux";
import { Drawer, Flex, Popover, Skeleton, Spin, Tooltip } from "antd";
import SeatContent from "./SeatContent";
import SVG_List from "../.././Common/SVG/SVG";
import { HiCheckCircle } from "react-icons/hi";
import { RiSteering2Fill } from "react-icons/ri";
import { LoadingOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { toast } from "react-toastify";
import PickUpandDrop from "./PickUp&Drop";
import DrawerIndex from "../SeatBlocked/Index";
import { calculateDiscountedFare } from "../../Common/Common-Functions/TBS-Discount-Fare";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { GET_TICKET_DETAILS } from "../../../Store/Type";
import { decryptData } from "../../Common/Common-Functions/Encrypt-Decrypt";

const SeatLayout = ({ BusDetails, busdroping, busboarding, setDropDown }) => {
  const tbs_discount = useSelector((state) => state?.live_per);
  const [ticketnumber, setTicketNumber] = useState(null);
  const [ticketloading, setTicketLoading] = useState(false);
  const dispatch = useDispatch();
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [modalshow, setShowModal] = useState(false);
  const [layout, setLayout] = useState("");
  const [selectedRoutes, setSelectedRoutes] = useState({
    dep_route: layout?.boarding_info?.[0]?.placeName,
    arri_route: layout?.dropping_info?.[0]?.placeName,
    dep_time: layout?.boarding_info?.[0]?.placeTime,
    arr_time: layout?.dropping_info?.[0]?.placeTime,
    dep_route_id: null,
    arr_route_id: null,
    dep_landmark: layout?.boarding_info?.[0]?.landMark,
    dep_pincode: "",
    arr_landmark: layout?.dropping_info?.[0]?.landMark,
  });

  const [selectedseatprice, setSelectedSeatsPrice] = useState([]);
  const [totalprice, setTotalPrice] = useState(null);
  const [seatDetails, setSeatDetails] = useState(
    selectedSeats.reduce((acc, seat, index) => {
      acc[index] = {
        Seat: "",
        Status: "",
        type: "",
        typeId: "",
        tax: "",
        price: "",
      };
      return acc;
    }, {})
  );
  const [bookingId1, setBookingId1] = useState();
  const [layoutloading, setLayoutLoading] = useState(false);
  const SVG = SVG_List();
  const fetchSeatLayout = async () => {
    setLayoutLoading(true);
    try {
      const data = await Abhibus_SeatLayout(BusDetails, dispatch);
      setLayoutLoading(false);
      setLayout(data?.seatlayout);
    } catch (error) {
      console.error("Error fetching seat layout data", error);
    }
  };

  useEffect(() => {
    fetchSeatLayout();
  }, []);

  // Function to format seat data (for both decks)
  const formatSeatData = (seatList) => {
    return seatList?.map((seat) => {
      const [
        seatNumber,
        row,
        column,
        type,
        isBooked,
        gender,
        price,
        seatTypeID,
        tax,
        childFare,
        category,
        weight,
      ] = seat.split(", ");

      // Safely parse tax as a number, default to 0 if invalid
      const parsedTax = isNaN(tax) ? 0 : Number(tax);

      return {
        seatNumber,
        row: Number(column), // Swap row and column for rotation
        column: Number(row),
        type,
        isBooked: isBooked === "N",
        gender,
        price: Number(price),
        seatTypeID: Number(seatTypeID),
        tax,
        childFare: Number(childFare),
        category,
        weight: Number(weight),
      };
    });
  };

  const lowerDeckSeats = formatSeatData(
    layout?.TotalSeatList?.lowerdeck_seat_nos || []
  );
  const upperDeckSeats = formatSeatData(
    layout?.TotalSeatList?.upperdeck_seat_nos || []
  );
  const getBorderClass = (seat) => {
    if (seat?.isBooked === true && seat.gender === "M") {
      return "#7fc3e9";
    }
    if (seat?.isBooked === false && seat.gender === "F") {
      return "#FF00D5";
    }
    if (seat?.isBooked === true && seat.gender === "F") {
      return "#ff84ea";
    }
    if (
      selectedSeats.includes(seat?.seatNumber) &&
      seat?.isBooked === false &&
      seat?.gender === "F"
    ) {
      return "#FDB0F9";
    } else if (
      selectedSeats.includes(seat?.seatNumber) &&
      seat?.isBooked === false &&
      seat?.gender === "M"
    ) {
      return "#298121";
    }
    switch (seat.gender) {
      case "F":
        return "#FF56E3";
      case "M":
        return "#298121";
      default:
        return "#958F8F";
    }
  };

  const getBackgroundClass = (seat) => {
    if (
      selectedSeats.includes(seat?.seatNumber) &&
      seat?.isBooked === false &&
      seat?.gender === "F"
    ) {
      return "#FDB0F9";
    } else if (
      selectedSeats.includes(seat?.seatNumber) &&
      seat?.isBooked === false &&
      seat?.gender === "M"
    ) {
      return "#84EC7A";
    }

    // switch (seat.gender) {
    //   case "M":
    //     return "#CCF6FF";
    //   case "F":
    //     return "#FFE9FE";
    //   default:
    //     return "#D8D8D8";
    // }
    if (seat?.isBooked === false) {
      return "#FFFFFF";
    } else if (seat?.gender === "M" && seat?.isBooked === true) {
      return "#edfbff";
    } else if (seat?.gender === "F" && seat?.isBooked === true) {
      return "#fff6fe";
    }
  };
  const LuxuryFind = (type) =>
    type.toLowerCase().includes("volvo") ||
    type.toLowerCase().includes("mercedes benz") ||
    type.toLowerCase().includes("washroom") ||
    type.toLowerCase().includes("bharatBenz") ||
    type.toLowerCase().includes("luxury");
  const [currentrate, SetCurrentRate] = useState(1);
  const getStatusText = (seat) => {
    switch (seat.status) {
      case "AFA":
        return "Available For All";
      case "AFF":
        return "Available For Female";
      case "AFM":
        return "Available For Male";
      case "BFA":
        return "Booked";
      case "BFF":
        return "Booked For Female";
      case "BFM":
        return "Booked For Male";
      case "on_booking":
        return "Seat Locked";
      default:
        return "none";
    }
  };

  const getColor = (seat) => {
    if (seat?.gender === "M") {
      return seat?.isBooked === false ? "#61C357" : "gray";
    } else if (seat?.gender === "F") {
      return seat?.isBooked === false ? "#FD71EB" : "gray";
    }
    // switch (seat.status) {
    //   case "BFF":
    //   case "BFM":
    //   case "BFA":
    //     return "gray";
    //   case "AFF":
    //     return "#FD71EB";
    //   case "AFM":
    //     return "#34BEEC";
    //   case "on_booking":
    //     return "gray";
    //   default:
    //     return "#61C357";
    // }
  };
  const seatHighlight = (seat) => {
    const roundedFare = Math.round(seat?.price);
    return currentrate === roundedFare && seat.isBooked === false ? (
      <div className="h-[0.6vw] w-[0.6vw] rounded-full bg-[#1F487C] absolute top-[-1vw] left-1/2 transform -translate-x-1/2"></div>
    ) : null;
  };
  const handleSeatClick = (seat) => {
    if (seat.isBooked === true) return;

    setSelectedSeats((prevSelectedSeats) => {
      if (prevSelectedSeats.includes(seat.seatNumber)) {
        // Remove seat from selectedSeats
        setSeatDetails((prevSeatDetails) => {
          const updatedDetails = { ...prevSeatDetails };
          delete updatedDetails[seat.seatNumber]; // Remove seat from seatDetails
          return updatedDetails;
        });
        return prevSelectedSeats.filter(
          (selectedSeat) => selectedSeat !== seat.seatNumber
        );
      } else {
        // Add seat to selectedSeats
        if (prevSelectedSeats.length < 6) {
          setSeatDetails((prevSeatDetails) => ({
            ...prevSeatDetails,
            [seat.seatNumber]: {
              Seat: seat.seatNumber,
              Status: seat.gender,
              type: seat.type,
              typeId: seat.seatTypeID,
              tax: seat.tax,
              price: seat.price,
            }, // Store seat ID and its status
          }));
          return [...prevSelectedSeats, seat.seatNumber];
        } else {
          toast.warning("You can book only six seats.");
          return prevSelectedSeats;
        }
      }
    });

    setSelectedSeatsPrice((prevSelectedSeatsPrice) => {
      const seatIndex = selectedSeats.indexOf(seat?.seatNumber);

      if (seatIndex !== -1) {
        return prevSelectedSeatsPrice.filter((_, i) => i !== seatIndex);
      } else {
        if (prevSelectedSeatsPrice.length < 6) {
          return [...prevSelectedSeatsPrice, seat.price];
        } else {
          //toast.warning("You can book only six seats.");
          return prevSelectedSeatsPrice;
        }
      }
    });
  };
  const [drawerWidth, setDrawerWidth] = useState("60%");
  // const onClose = () => {
  //   setShowModal(false);
  //   setDropDown(false);
  //   sessionStorage.setItem("ticket_view", "close");
  //   if (bookingId1) {
  //     // setDropDown(null);
  //   }
  // };
  const totalseats = lowerDeckSeats.concat(upperDeckSeats);
  const allprice = totalseats
    ?.map((item) => {
      return Math.round(item?.price);
    })
    .sort((a, b) => a - b);

  const uniqueprice = [...new Set(allprice)];
  useEffect(() => {
    if (selectedseatprice.length > 0) {
      const price = selectedseatprice.reduce((a, b) => {
        return a + b;
      });
      setTotalPrice(Math.round(price));
    }
  }, [selectedseatprice]);

  const [emailInput, setEmailInput] = useState(
    decryptData(sessionStorage.getItem("email_id")) || ""
  );
  const [mobileInput, setMobileInput] = useState(
    decryptData(sessionStorage.getItem("user_mobile")) || ""
  );
  const [travelerDetails, setTravelerDetails] = useState(
    selectedSeats?.reduce((acc, seat, index) => {
      acc[index] = { user_name: "", age: "", gender: "male", seat: "" };
      return acc;
    }, {})
  );
  const [billAddress, setBillAddress] = useState({
    address: layout?.boarding_info?.[0]?.landMark,
    pincode: layout?.boarding_info?.[0]?.pincode,
    state: "",
    city: "",
  });
  const [termschecked, setTermsChecked] = useState(false);
  // useslecteor
  const onClose = () => {
    setShowModal(false);
    if (ticketnumber) {
      setDropDown(false);
    }
    sessionStorage.setItem("ticket_view", "close");
    setTicketNumber(null);
    setTicketLoading(false);
    if (bookingId1) {
      // setDropDown(null);
    }
    dispatch({
      type: GET_TICKET_DETAILS,
      payload: [],
    });
    setEmailInput("");
    setMobileInput("");
    setTermsChecked(false);
    selectedSeats?.forEach((seat, index) => {
      setTravelerDetails((prevDetails) => ({
        ...prevDetails,
        [index]: {
          ...prevDetails[index],
          user_name: "",
          age: "",
        },
      }));
    });
    setBillAddress({
      address: "",
      pincode: "",
      city: "",
      state: "",
    });
  };
  return (
    <>
      {/* ------------------------------------------------------------------------------------ */}
      {layoutloading === false ? (
        <div className="px-[0.5vw] mb-[0.5vw]">
          <div
            className={`${
              LuxuryFind(BusDetails?.Bus_Type_Name) === true
                ? "bg-[#FFEEC9]"
                : "bg-[#EEEDED]"
            }  border-x-[0.1vw]  border-b-[0.1vw] rounded-b-[0.5vw]`}
          >
            <>
              <div className="h-[4vw] w-full">
                <div className=" w-full h-full pt-[1vw] px-[1vw]  items-center">
                  <div className="col-span-3 flex pl-[4vw]">
                    <button
                      type="button"
                      className={`${
                        currentrate === 1 ? " " : "  "
                      } h-[2.5vw] w-[6vw] rounded-l-[0.5vw] font-bold  border-y-[0.1vw] border-l-[0.1vw] border-r-[0.1vw] text-[1.2vw]
               ${
                 currentrate === 1
                   ? LuxuryFind(BusDetails?.Bus_Type_Name) === true
                     ? "bg-[#393939] text-white"
                     : LuxuryFind(BusDetails?.Bus_Type_Name) === false
                     ? "bg-[#1F487C] text-white "
                     : "bg-white text-black"
                   : LuxuryFind(BusDetails?.Bus_Type_Name) === true
                   ? "bg-white text-[#393939] hover:bg-[#d6d6d6ce]"
                   : LuxuryFind(BusDetails?.Bus_Type_Name) === false
                   ? "bg-white text-[#1F487C] hover:bg-gray-200"
                   : "bg-white text-black"
               }
              `}
                      onClick={() => SetCurrentRate(1)}
                      style={{
                        borderColor:
                          LuxuryFind(BusDetails?.Bus_Type_Name) === true
                            ? "#393939"
                            : "#1F487C",
                      }}
                    >
                      All
                    </button>
                    {uniqueprice.length > 0 &&
                      uniqueprice.map((item, index) => (
                        <button
                          type="button"
                          className={`h-[2.5vw] w-[6vw] font-bold border-y-[0.1vw] border-r-[0.1vw] px-[0.5vw] text-[1.2vw] ${
                            index === uniqueprice.length - 1
                              ? "rounded-r-[0.5vw]"
                              : ""
                          } ${
                            currentrate === item
                              ? LuxuryFind(BusDetails?.Bus_Type_Name) === true
                                ? "bg-[#393939] text-white"
                                : LuxuryFind(BusDetails?.Bus_Type_Name) ===
                                  false
                                ? "bg-[#1F487C] text-white "
                                : "bg-white text-black"
                              : LuxuryFind(BusDetails?.Bus_Type_Name) === true
                              ? "bg-white text-[#393939] hover:bg-[#d6d6d6ce]"
                              : LuxuryFind(BusDetails?.Bus_Type_Name) === false
                              ? "bg-white text-[#1F487C] hover:bg-gray-200"
                              : "bg-white text-black"
                          }`}
                          onClick={() => SetCurrentRate(item)}
                          style={{
                            borderColor:
                              LuxuryFind(BusDetails?.Bus_Type_Name) === true
                                ? "#393939"
                                : "#1F487C",
                          }}
                        >
                          {/* {`₹ ${item}`} */}
                          {`₹ ${calculateDiscountedFare(
                            BusDetails?.BUS_START_DATE,
                            item,
                            tbs_discount
                          )}`}
                        </button>
                      ))}
                  </div>
                  <div className="col-span-1 flex items-center">
                    <div className=" w-full h-[2vw] px-[2vw]">
                      <div className=" items-center  flex">
                        <Popover
                          placement="rightRight"
                          title={
                            <span className="text-[0.8vw]">Seater/Sleeper</span>
                          }
                          content={SeatContent()}
                          style={{
                            padding: "8px",
                            margin: "0",
                          }}
                        >
                          {/* <div className="flex items-center ">
                    <span className="">
                      <IoIosInformationCircleOutline
                        color="black"
                        size={"1.5vw"}
                      />
                    </span>
                    <span className="text-[1.2vw] font-bold  pl-[0.2vw] cursor-pointer">
                      Know your seats
                    </span>
                  </div> */}
                        </Popover>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className={`${
                  LuxuryFind(BusDetails?.Bus_Type_Name) === true
                    ? "bg-[#FFEEC9]"
                    : "bg-[#EEEDED]"
                }  grid grid-cols-7  pt-[1vw] w-full rounded-b-[0.5vw]`}
                style={{
                  height: `${
                    Number(layout?.lowerTotalColumns) * 4.5 > 40
                      ? `${Number(layout?.lowerTotalColumns) * 4.5}vw`
                      : "40vw"
                  }`,
                }}
              >
                <div className="col-span-1 h-[30vw] w-full ml-[1vw] rounded-[1vw] mt-[1vw]  flex items-center py-[1vw] flex-col justify-between gap-[0.5vw]">
                  <div className="flex flex-col gap-y-[1vw]">
                    <label className="text-[1vw] font-bold ">
                      Available Seats
                    </label>

                    <div className="grid grid-rows-3 gap-y-[0.5vw]">
                      <div className="row-span-1 ">
                        <div className="flex items-center gap-x-[1vw]">
                          {/* <span className="w-[1.6vw] h-[1.6vw]">
                            {SVG?.available_unisex}
                          </span> */}
                          <span className="w-[1.25vw] h-[1.25vw] rounded-[0.1vw] bg-white border-[0.1vw] border-[#4C9646]"></span>
                          <span className="text-[1vw] font-bold ">Unisex</span>
                        </div>
                      </div>
                      <div className=" row-span-1">
                        <div className="flex items-center gap-x-[1vw]">
                          {/* <span className="w-[1.6vw] h-[1.6vw]">
                            {SVG?.available_men}
                            
                          </span> */}
                          <span className="w-[1.25vw] h-[1.25vw] rounded-[0.1vw] bg-white border-[0.1vw] border-[#FE35DF]"></span>
                          <span className="text-[1vw] font-bold ">Women</span>
                        </div>
                      </div>
                      <div className=" row-span-1">
                        <div className="flex items-center gap-x-[1vw]">
                          {/* <span className="w-[1.6vw] h-[1.6vw]">
                            {SVG?.available_women}
                          </span> */}
                          <span className="w-[1.25vw] h-[1.25vw] rounded-[0.1vw] bg-white border-[0.1vw] border-[#28AFE6]"></span>
                          <span className="text-[1vw] font-bold ">Men</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-y-[1vw]">
                    <label className="text-[1vw] font-bold ">
                      Selected Seats
                    </label>

                    <div className="grid grid-rows-3 gap-y-[0.5vw]">
                      <div className="row-span-1 ">
                        <div className="flex items-center gap-x-[1vw]">
                          {/* <span className="w-[1.6vw] h-[1.6vw]">
                            {SVG?.selected_unisex}
                          </span> */}
                          <span className="w-[1.25vw] h-[1.25vw] rounded-[0.1vw] bg-[#84EC7A] border-[0.1vw] border-[#4C9646]"></span>

                          <span className="text-[1vw] font-bold ">Unisex</span>
                        </div>
                      </div>
                      <div className=" row-span-1">
                        <div className="flex items-center gap-x-[1vw]">
                          {/* <span className="w-[1.6vw] h-[1.6vw]">
                            {SVG?.selected_women}
                          </span> */}
                          <span className="w-[1.25vw] h-[1.25vw] rounded-[0.1vw] bg-[#FDB0F9] border-[0.1vw] border-[#FE35DF]"></span>
                          <span className="text-[1vw] font-bold ">Women</span>
                        </div>
                      </div>
                      <div className=" row-span-1">
                        <div className="flex items-center gap-x-[1vw]">
                          {/* <span className="w-[1.6vw] h-[1.6vw]">
                            {SVG?.selected_men}
                          </span> */}
                          <span className="w-[1.25vw] h-[1.25vw] rounded-[0.1vw] bg-[#58E1FF] border-[0.1vw] border-[#28AFE6]"></span>
                          <span className="text-[1vw] font-bold ">Men</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-y-[1vw]">
                    <label className="text-[1vw] font-bold  ">
                      Booked Seats
                    </label>

                    <div className="grid grid-rows-3 gap-y-[0.5vw] ">
                      <div className="row-span-1 ">
                        <div className="flex items-center gap-x-[1vw]">
                          {/* <span className="w-[1.6vw] h-[1.6vw]">
                            {SVG?.booked_unisex}
                          </span> */}
                          <span className="w-[1.25vw] h-[1.25vw] rounded-[0.1vw] bg-[#D8D8D8] border-[0.1vw] border-[#958F8F]"></span>
                          <span className="text-[1vw] font-bold ">Unisex</span>
                        </div>
                      </div>
                      <div className=" row-span-1">
                        <div className="flex items-center gap-x-[1vw]">
                          {/* <span className="w-[1.6vw] h-[1.6vw]">
                            {SVG?.booked_women}
                          </span> */}
                          <span className="w-[1.25vw] h-[1.25vw] rounded-[0.1vw] bg-[#FFE9FE] border-[0.1vw] border-[#FE35DF]"></span>
                          <span className="text-[1vw] font-bold ">Women</span>
                        </div>
                      </div>
                      <div className=" row-span-1">
                        <div className="flex items-center gap-x-[1vw]">
                          {/* <span className="w-[1.6vw] h-[1.6vw]">
                            {SVG?.booked_men}
                          </span> */}
                          <span className="w-[1.25vw] h-[1.25vw] rounded-[0.1vw] bg-[#CCF6FF] border-[0.1vw] border-[#28AFE6]"></span>
                          <span className="text-[1vw] font-bold ">Men</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={`md:col-span-3 col-span-6 h-full w-full`}>
                  <div className="grid grid-cols-2 h-full w-full px-[2vw] gap-[1.5vw]">
                    <div className={`col-span-1 h-full w-full py-[1vw]`}>
                      <div
                        className={`border-[0.1vw] border-gray-400  w-full rounded-[0.5vw] relative bg-white`}
                        style={{
                          height: `${
                            Number(layout?.lowerTotalColumns) * 3.8
                          }vw`,
                        }}
                      >
                        <p className="text-[1vw] absolute top-[-1.5vw] left-[3vw] text-center">
                          {"Lower List".toUpperCase()}
                          {`(${lowerDeckSeats?.length})`}
                        </p>
                        <span className="absolute top-[1vw] right-[1vw]">
                          <RiSteering2Fill size={"2vw"} />
                        </span>
                        <div
                          className={` border-l-[0.2vw] ${
                            LuxuryFind(BusDetails?.Bus_Type_Name) === true
                              ? "border-[#FFEEC9]"
                              : "border-[#EEEDED]"
                          }  absolute left-[-0.15vw] top-[3vw] h-[3vw]`}
                        ></div>
                        <div
                          className={`border-r-[0.1vw] border-t-[0.1vw] border-b-[0.1vw] ${
                            LuxuryFind(BusDetails?.Bus_Type_Name) === true
                              ? "bg-[#FFEEC9]"
                              : "bg-[#EEEDED]"
                          } border-gray-400 h-[3vw] left-[-0.05vw] w-[3vw] top-[3vw] absolute`}
                        ></div>
                        <div
                          className="grid grid-rows-6 h-full w-full gap-[1vw] pt-[6vw] py-[1vw]"
                          style={{ userSelect: "none" }}
                        >
                          <div>
                            <div>
                              <div
                                className={`grid grid-flow-col gap-y-[0.5vw] mt-[0.5vw]`}
                                style={{
                                  transform: "rotateY(180deg)",
                                }}
                              >
                                {lowerDeckSeats?.map((seat, index) =>
                                  seat?.type === "SS" ? (
                                    // <Flex align="center">
                                    <>
                                      <div
                                        key={index}
                                        className="relative items-center justify-center flex"
                                        style={{
                                          gridRow: seat.row,
                                          gridColumn: seat.column,
                                        }}
                                      >
                                        {" "}
                                        {/* <div className="absolute top-[0.8vw] right-[58%]">
                                          {seatHighlight(seat)}
                                        </div> */}
                                        {/* <Tooltip
                                          placement="top"
                                          title={ */}
                                        {/* }
                                          color={getColor(seat)}
                                        > */}
                                        <svg
                                          width="2.4vw"
                                          height="2.6vw"
                                          viewBox="0 0 34 39"
                                          fill={`${getBackgroundClass(seat)}`}
                                          onClick={() => handleSeatClick(seat)}
                                          className={`cursor-pointer hovsvg`}
                                          style={{
                                            filter:
                                              currentrate ===
                                                Math.round(seat?.price) &&
                                              seat.isBooked === false
                                                ? `drop-shadow(2px 2px 2px  ${getBorderClass(
                                                    seat
                                                  )})`
                                                : null,
                                          }}
                                          // data-tooltip-id={`tooltip-${index}`}
                                          // data-tooltip-content={`${
                                          //   seat.seatNumber
                                          // }  -   ₹ ${calculateDiscountedFare(
                                          //   BusDetails?.BUS_START_DATE,
                                          //   seat?.price
                                          // )}`}
                                        >
                                          <path
                                            d="M3.55687 11.5354V6.43945C3.55687 3.67803 5.79544 1.43945 8.55687 1.43945H23.91C26.6714 1.43945 28.9099 3.67855 28.9099 6.43998V11.5352L29.6538 11.5353C30.5498 11.5353 31.2762 12.2618 31.2762 13.1579V34.0056C31.2762 35.3498 30.1865 36.4395 28.8423 36.4395H3.28643C1.94223 36.4395 0.852539 35.3498 0.852539 34.0056V13.158C0.852539 12.2619 1.579 11.5354 2.47514 11.5354H3.55687Z"
                                            fill={`${getBackgroundClass(seat)}`}
                                          />
                                          <path
                                            d="M3.55687 11.5354V6.43945C3.55687 3.67803 5.79544 1.43945 8.55687 1.43945H23.91C26.6714 1.43945 28.9099 3.67855 28.9099 6.43998C28.9099 9.12696 28.9099 11.5352 28.9099 11.5352M28.9099 11.5352L29.6538 11.5353C30.5498 11.5353 31.2762 12.2618 31.2762 13.1579V34.0056C31.2762 35.3498 30.1865 36.4395 28.8423 36.4395H3.28643C1.94223 36.4395 0.852539 35.3498 0.852539 34.0056V13.158C0.852539 12.2619 1.579 11.5354 2.47514 11.5354H4.6386C5.53474 11.5354 6.2612 12.2619 6.2612 13.158V29.9671C6.2612 31.3113 7.35089 32.401 8.69509 32.401H24.1098C25.454 32.401 26.5437 31.3113 26.5437 29.9671V13.1579C26.5437 12.2618 27.2701 11.5353 28.1661 11.5353L28.9099 11.5352Z"
                                            stroke={`${getBorderClass(seat)}`}
                                          />
                                        </svg>
                                        <div
                                          style={{
                                            transform: "rotateY(180deg)",
                                          }}
                                          className="hovcontent hidden absolute z-[40]   top-[-2.4vw] "
                                        >
                                          <div
                                            className={`flex items-center w-[7vw] px-[.4vw] py-[.2vw] rounded-[.3vw]  justify-around`}
                                            style={{
                                              backgroundColor: getColor(seat),
                                            }}
                                          >
                                            <span className="text-[1.2vw] font-semibold text-white">
                                              {`${seat.seatNumber}`}
                                            </span>
                                            <span className=" font-bold text-[1.1vw] text-white">
                                              {`₹ ${calculateDiscountedFare(
                                                BusDetails?.BUS_START_DATE,
                                                seat?.price,
                                                tbs_discount
                                              )}`}
                                            </span>
                                          </div>
                                        </div>
                                        {/* <ReactTooltip
                                          id={`tooltip-${index}`}
                                          place="top"
                                          style={{
                                            backgroundColor: getColor(seat),
                                            color: "white",
                                            zIndex: 2,
                                            transform: "rotateY(180deg)",
                                            fontWeight: "bold",
                                          }}
                                        /> */}
                                        {/* </Tooltip> */}
                                      </div>
                                    </>
                                  ) : (
                                    // </Flex>

                                    <div
                                      key={index}
                                      className="relative items-center justify-center flex"
                                      style={{
                                        gridRow:
                                          seat.type === "LB"
                                            ? `span 2`
                                            : seat.row, // Sleeper seats span 2 rows
                                        gridColumn: seat.column,
                                      }}
                                    >
                                      {/* <div className="absolute top-[0.8vw] right-[1.3vw]">
                                        {seatHighlight(seat)}
                                      </div> */}
                                      {/* <Tooltip
                                        placement="top"
                                        title={
                                          <div className="flex items-center gap-x-[1vw] justify-between">
                                            <span className="text-[1.2vw] font-semibold text-white">{`${seat.seatNumber}`}</span>
                                            <span className=" font-bold text-[1.1vw] text-white">
                                              {" "}
                                              {`₹ ${calculateDiscountedFare(
                                                BusDetails?.BUS_START_DATE,
                                                seat?.price,
                                                tbs_discount
                                              )}`}
                                            </span>
                                          </div>
                                        }
                                        color={getColor(seat)}
                                      > */}
                                      <svg
                                        width="2.5vw"
                                        height="6vw"
                                        viewBox="0 0 94 221"
                                        fill={getBackgroundClass(seat)}
                                        xmlns="http://www.w3.org/2000/svg"
                                        onClick={() => handleSeatClick(seat)}
                                        className="cursor-pointer hovsvg"
                                        // style={{ userSelect: "none" }}
                                        style={{
                                          userSelect: "none",
                                          filter:
                                            currentrate ===
                                              Math.round(seat?.price) &&
                                            seat.isBooked === false
                                              ? `drop-shadow(2px 2px 2px  ${getBorderClass(
                                                  seat
                                                )})`
                                              : null,
                                        }}
                                      >
                                        <path
                                          d="M1.30176 209.776V7.28689C1.30176 4.18046 3.82002 1.6622 6.92645 1.6622H45.3618L82.8597 1.66212C85.9662 1.66211 88.4844 4.18038 88.4844 7.28681V209.776C88.4844 212.882 85.9662 215.4 82.8597 215.4H45.3618H6.92645C3.82002 215.4 1.30176 212.882 1.30176 209.776Z"
                                          stroke={getBorderClass(seat)}
                                          strokeWidth="1.8749"
                                        />
                                        <path
                                          d="M63.5838 180.224H26.2565C22.1334 180.224 18.791 183.566 18.791 187.689C18.791 191.812 22.1334 195.155 26.2565 195.155H63.5838C67.7069 195.155 71.0493 191.812 71.0493 187.689C71.0493 183.566 67.7069 180.224 63.5838 180.224Z"
                                          stroke={getBorderClass(seat)}
                                          strokeWidth="1.65808"
                                        />
                                      </svg>
                                      <div
                                        style={{ transform: "rotateY(180deg)" }}
                                        className="hovcontent hidden absolute z-[40]   top-[-2.4vw]"
                                      >
                                        <div
                                          className={`flex items-center w-[7vw] px-[.4vw] py-[.2vw] rounded-[.3vw]  justify-around`}
                                          style={{
                                            backgroundColor: getColor(seat),
                                          }}
                                        >
                                          <span className="text-[1.2vw] font-semibold text-white">{`${seat.seatNumber}`}</span>
                                          <span className=" font-bold text-[1.1vw] text-white">
                                            {" "}
                                            {`₹ ${calculateDiscountedFare(
                                              BusDetails?.BUS_START_DATE,
                                              seat?.price,
                                              tbs_discount
                                            )}`}
                                          </span>
                                        </div>
                                      </div>
                                      {/* </Tooltip> */}
                                    </div>
                                  )
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* upper */}
                    <div className="col-span-1 h-full w-full py-[1vw] ">
                      {upperDeckSeats?.length > 0 ? (
                        <div
                          className="border-[0.1vw] border-gray-400  w-full rounded-[0.5vw] relative bg-white"
                          style={{
                            height: `${
                              Number(layout?.upperTotalColumns) * 3.8
                            }vw`,
                          }}
                        >
                          <p className="text-[1vw] absolute top-[-1.5vw] left-[3vw] text-center">
                            {"Upper List".toUpperCase()}
                            {`(${upperDeckSeats?.length})`}
                          </p>
                          <div
                            className="grid grid-rows-4 h-full w-full pt-[6vw] py-[1vw]"
                            style={{ userSelect: "none" }}
                          >
                            <div>
                              <div
                                className={`grid grid-flow-col gap-y-[0.5vw] mt-[0.5vw]`}
                                style={{
                                  transform: "rotateY(180deg)",
                                }}
                              >
                                {upperDeckSeats?.map((seat, index) =>
                                  seat?.type === "SS" ? (
                                    <div
                                      key={index}
                                      className="relative items-center justify-center flex"
                                      style={{
                                        gridRow: seat.row,
                                        gridColumn: seat.column,
                                      }}
                                    >
                                      {" "}
                                      {/* <div className="absolute top-[0.8vw] right-[1.23vw]">
                                        {seatHighlight(seat)}
                                      </div> */}
                                      {/* <Tooltip
                                        placement="top"
                                        title={
                                          <div className="flex items-center gap-x-[1vw] justify-between">
                                            <span className="text-[1.2vw] font-semibold text-white">{`${seat.seatNumber}`}</span>
                                            <span className=" font-bold text-[1.1vw] text-white">
                                              {" "}
                                              {`₹ ${calculateDiscountedFare(
                                                BusDetails?.BUS_START_DATE,
                                                seat?.price,
                                                tbs_discount
                                              )}`}
                                            </span>
                                          </div>
                                        }
                                        color={getColor(seat)}
                                      > */}
                                      <svg
                                        width="2.4vw"
                                        height="2.6vw"
                                        viewBox="0 0 34 39"
                                        fill={`${getBackgroundClass(seat)}`}
                                        // fill="#D8D8D8"
                                        onClick={() => handleSeatClick(seat)}
                                        className={` cursor-pointer hovsvg`}
                                        // ${getShadowClass(seat)}
                                        style={{
                                          filter:
                                            currentrate ===
                                              Math.round(seat?.price) &&
                                            seat.isBooked === false
                                              ? `drop-shadow(2px 2px 2px  ${getBorderClass(
                                                  seat
                                                )})`
                                              : null,
                                        }}
                                      >
                                        <path
                                          d="M3.55687 11.5354V6.43945C3.55687 3.67803 5.79544 1.43945 8.55687 1.43945H23.91C26.6714 1.43945 28.9099 3.67855 28.9099 6.43998V11.5352L29.6538 11.5353C30.5498 11.5353 31.2762 12.2618 31.2762 13.1579V34.0056C31.2762 35.3498 30.1865 36.4395 28.8423 36.4395H3.28643C1.94223 36.4395 0.852539 35.3498 0.852539 34.0056V13.158C0.852539 12.2619 1.579 11.5354 2.47514 11.5354H3.55687Z"
                                          fill={`${getBackgroundClass(seat)}`}
                                          // stroke="#D8D8D8"
                                        />
                                        <path
                                          d="M3.55687 11.5354V6.43945C3.55687 3.67803 5.79544 1.43945 8.55687 1.43945H23.91C26.6714 1.43945 28.9099 3.67855 28.9099 6.43998C28.9099 9.12696 28.9099 11.5352 28.9099 11.5352M28.9099 11.5352L29.6538 11.5353C30.5498 11.5353 31.2762 12.2618 31.2762 13.1579V34.0056C31.2762 35.3498 30.1865 36.4395 28.8423 36.4395H3.28643C1.94223 36.4395 0.852539 35.3498 0.852539 34.0056V13.158C0.852539 12.2619 1.579 11.5354 2.47514 11.5354H4.6386C5.53474 11.5354 6.2612 12.2619 6.2612 13.158V29.9671C6.2612 31.3113 7.35089 32.401 8.69509 32.401H24.1098C25.454 32.401 26.5437 31.3113 26.5437 29.9671V13.1579C26.5437 12.2618 27.2701 11.5353 28.1661 11.5353L28.9099 11.5352Z"
                                          stroke={`${getBorderClass(seat)}`}
                                          // stroke="#D8D8D8"
                                        />
                                      </svg>
                                      <div
                                        style={{ transform: "rotateY(180deg)" }}
                                        className="hovcontent hidden absolute z-[40]   top-[-2.4vw]"
                                      >
                                        <div
                                          className={`flex items-center w-[7vw] px-[.4vw] py-[.2vw] rounded-[.3vw]  justify-around`}
                                          style={{
                                            backgroundColor: getColor(seat),
                                          }}
                                        >
                                          <span className="text-[1.2vw] font-semibold text-white">{`${seat.seatNumber}`}</span>
                                          <span className=" font-bold text-[1.1vw] text-white">
                                            {" "}
                                            {`₹ ${calculateDiscountedFare(
                                              BusDetails?.BUS_START_DATE,
                                              seat?.price,
                                              tbs_discount
                                            )}`}
                                          </span>
                                        </div>
                                      </div>
                                      {/* </Tooltip> */}
                                    </div>
                                  ) : (
                                    <div
                                      key={index}
                                      className="relative items-center justify-center flex"
                                      style={{
                                        gridRow:
                                          seat.type === "UB"
                                            ? `span 2`
                                            : seat.row, // Sleeper seats span 2 rows
                                        gridColumn: seat.column,
                                      }}
                                    >
                                      {/* <div className="absolute top-[0.8vw] right-[1.3vw]">
                                        {seatHighlight(seat)}
                                      </div> */}
                                      {/* <Tooltip
                                        placement="top"
                                        title={
                                          <div className="flex items-center gap-x-[1vw] justify-between">
                                            <span className="text-[1.2vw] font-semibold text-white">{`${seat.seatNumber}`}</span>
                                            <span className=" font-bold text-[1.1vw] text-white">
                                              {" "}
                                              {`₹ ${calculateDiscountedFare(
                                                BusDetails?.BUS_START_DATE,
                                                seat?.price,
                                                tbs_discount
                                              )}`}
                                            </span>
                                          </div>
                                        }
                                        color={getColor(seat)}
                                      > */}
                                      <svg
                                        width="2.5vw"
                                        height="6vw"
                                        viewBox="0 0 94 221"
                                        fill={getBackgroundClass(seat)}
                                        xmlns="http://www.w3.org/2000/svg"
                                        onClick={() => handleSeatClick(seat)}
                                        className="cursor-pointer hovsvg"
                                        // style={{ userSelect: "none" }}
                                        style={{
                                          userSelect: "none",
                                          filter:
                                            currentrate ===
                                              Math.round(seat?.price) &&
                                            seat.isBooked === false
                                              ? `drop-shadow(2px 2px 2px  ${getBorderClass(
                                                  seat
                                                )})`
                                              : null,
                                        }}
                                      >
                                        <path
                                          d="M1.30176 209.776V7.28689C1.30176 4.18046 3.82002 1.6622 6.92645 1.6622H45.3618L82.8597 1.66212C85.9662 1.66211 88.4844 4.18038 88.4844 7.28681V209.776C88.4844 212.882 85.9662 215.4 82.8597 215.4H45.3618H6.92645C3.82002 215.4 1.30176 212.882 1.30176 209.776Z"
                                          stroke={getBorderClass(seat)}
                                          strokeWidth="1.8749"
                                        />
                                        <path
                                          d="M63.5838 180.224H26.2565C22.1334 180.224 18.791 183.566 18.791 187.689C18.791 191.812 22.1334 195.155 26.2565 195.155H63.5838C67.7069 195.155 71.0493 191.812 71.0493 187.689C71.0493 183.566 67.7069 180.224 63.5838 180.224Z"
                                          stroke={getBorderClass(seat)}
                                          strokeWidth="1.65808"
                                        />
                                      </svg>
                                      <div
                                        style={{ transform: "rotateY(180deg)" }}
                                        className="hovcontent hidden absolute z-[40]   top-[-2.4vw]"
                                      >
                                        <div
                                          className={`flex items-center w-[7vw] px-[.4vw] py-[.2vw] rounded-[.3vw]  justify-around`}
                                          style={{
                                            backgroundColor: getColor(seat),
                                          }}
                                        >
                                          <span className="text-[1.2vw] font-semibold text-white">{`${seat.seatNumber}`}</span>
                                          <span className=" font-bold text-[1.1vw] text-white">
                                            {" "}
                                            {`₹ ${calculateDiscountedFare(
                                              BusDetails?.BUS_START_DATE,
                                              seat?.price,
                                              tbs_discount
                                            )}`}
                                          </span>
                                        </div>
                                      </div>
                                      {/* </Tooltip> */}
                                    </div>
                                  )
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </div>
                <div className={`col-span-3 h-[53vw] w-full md:block hidden`}>
                  <PickUpandDrop
                    BusDetails={BusDetails}
                    setSelectedRoutes={setSelectedRoutes}
                    setBillAddress={setBillAddress}
                    billAddress={billAddress}
                    selectedRoutes={selectedRoutes}
                    layout={layout}
                  />
                  <div className="h-[11vw] w-full  px-[2vw] py-[1vw] ">
                    <div className="border-[0.1vw] border-gray-400 w-full h-full mt-[0.5vw] rounded-[0.5vw] bg-white">
                      <div className="grid grid-rows-2 h-full w-full">
                        <div className="row-span-1 px-[1vw] pt-[1vw]">
                          <div className="flex justify-between">
                            <div className="flex flex-col">
                              <p className="text-[1.1vw] font-bold">
                                Selected Seats
                              </p>
                              {/* <p className="text-[1vw]">11</p> */}
                              <div className="flex flex-row flex-wrap">
                                {selectedSeats?.length > 0 ? (
                                  selectedSeats?.map((seat, index) => (
                                    <p
                                      key={index}
                                      className="text-[1vw] mr-[0.4vw]"
                                    >
                                      {seat}
                                      {index < selectedSeats?.length - 1 && ","}
                                    </p>
                                  ))
                                ) : (
                                  <p className="text-[1vw] mr-[0.4vw]">
                                    No Seat Selected
                                  </p>
                                )}
                              </div>
                            </div>
                            {selectedseatprice.length > 0 ? (
                              <div className="flex flex-col">
                                <p className="float-end text-[1.3vw] font-bold">
                                  {" "}
                                  {`₹ ${calculateDiscountedFare(
                                    BusDetails?.BUS_START_DATE,
                                    totalprice,
                                    tbs_discount
                                  )}`}
                                </p>

                                {/* <Popover placement="top" content={content}> */}
                                {/* <p className="text-[0.8vw] text-blue-500 font-semibold">
                        Fare Details
                      </p> */}
                                {/* </Popover> */}
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                        <div className="row-span-1 px-[1vw] py-[0.5vw]">
                          <button
                            className={`w-full h-full ${
                              selectedSeats?.length > 0
                                ? "bg-[#1F487C] cursor-pointer"
                                : "bg-gray-400 cursor-not-allowed"
                            } rounded-[0.5vw] text-white font-bold text-[1.3vw] `}
                            disabled={selectedSeats?.length > 0 ? false : true}
                            onClick={() => setShowModal(!modalshow)}
                            style={{
                              backgroundColor:
                                selectedSeats?.length > 0
                                  ? LuxuryFind(BusDetails?.Bus_Type_Name) ===
                                    true
                                    ? "#393939"
                                    : LuxuryFind(BusDetails?.Bus_Type_Name) ===
                                      false
                                    ? "#1F487C"
                                    : "#9CA3AF"
                                  : "#9CA3AF",
                            }}
                          >
                            Continue
                          </button>
                        </div>
                        <Drawer
                          placement={"right"}
                          closable={false}
                          onClose={onClose}
                          open={modalshow}
                          key={"right"}
                          // width={"60%"}
                          width={drawerWidth}
                          // className="drawer"
                          // style={{
                          //   backgroundImage:  LuxuryFind(BusDetails?.Bus_Type_Name) === true
                          //   ? `url(${backgroundImg}),linear-gradient(to right, #F8C550, #FFEB76, #FFE173)`
                          //   : "#ffffff",
                          //   zIndex: 2,
                          // }}
                        >
                          {/* <DrawerDetails
                            modalshow={modalshow}
                            setShowModal={setShowModal}
                            selectedSeats={selectedSeats}
                            selectedRoutes={selectedRoutes}
                            busdetails={busdetails}
                            seatDetails={seatDetails}
                            // seatplatform={seatplatform}
                            //type={type}
                            discount={totalprice}
                            busprice={totalprice}
                            setDropDown={setDropDown}
                            bookingId1={bookingId1}
                            setBookingId1={setBookingId1}
                            // imageurl={logo}
                          /> */}
                          <DrawerIndex
                            layout={layout}
                            BusDetails={BusDetails}
                            selectedSeats={selectedSeats}
                            selectedRoutes={selectedRoutes}
                            busprice={totalprice}
                            seatDetails={seatDetails}
                            selectedseatprice={selectedseatprice}
                            setDropDown={setDropDown}
                            emailInput={emailInput}
                            setEmailInput={setEmailInput}
                            mobileInput={mobileInput}
                            setMobileInput={setMobileInput}
                            termschecked={termschecked}
                            setTermsChecked={setTermsChecked}
                            travelerDetails={travelerDetails}
                            setTravelerDetails={setTravelerDetails}
                            billAddress={billAddress}
                            setBillAddress={setBillAddress}
                            setTicketNumber={setTicketNumber}
                            setTicketLoading={setTicketLoading}
                            ticketnumber={ticketnumber}
                            ticketloading={ticketloading}
                          />
                        </Drawer>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center p-[2vw]">
          {/* <Spin
            indicator={
              <LoadingOutlined
                style={{
                  fontSize: "5vw",
                }}
                spin
              />
            }
          /> */}
          <Skeleton loading={layoutloading} />
        </div>
      )}
    </>
  );
};

export default SeatLayout;
