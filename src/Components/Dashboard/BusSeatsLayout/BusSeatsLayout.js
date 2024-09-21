import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetSeatLayout } from "../../../Api/Dashboard/Dashboard";
import { FaBed } from "react-icons/fa6";
import { RiSteering2Fill } from "react-icons/ri";
// import unisex_sel from "../../../assets/unisex_sel.png";
// import unisex_se from "../../../assets/unisex_se.png";
import unisex_sel from "../../../assets/s_sleeper.png";
import unisex_se from "../../../assets/unisex_se.png";
import { Popover, Tooltip } from "antd";
import { HiCheckCircle } from "react-icons/hi";
import dayjs from "dayjs";
import { toast } from "react-toastify";
import DrawerDetails from "../Drawer";
import { IoIosInformationCircleOutline } from "react-icons/io";
import men_sl from "../../../assets/men_sl.png";
import men_se from "../../../assets/men_se.png";
import men_sl_sel from "../../../assets/men_sl_sel.png";
import men_se_sel from "../../../assets/men_se_sel.png";
import men_sl_book from "../../../assets/sl_men_book.png";
import men_se_book from "../../../assets/se_men_book.png";
import women_sl from "../../../assets/women_sl.png";
import women_se from "../../../assets/women_se.png";
import women_sl_sel from "../../../assets/women_sl_sel.png";
import women_se_sel from "../../../assets/women_se_sel.png";
import women_sl_book from "../../../assets/sl_women_book.png";
import women_se_book from "../../../assets/se_women_book.png";
import unisex_book from "../../../assets/unisex_se_book.png";
import unisex_se_sel from "../../../assets/unisex_se_sel.png";
import unisex_se_book from "../../../assets/unisex_book.png";
// import "./SeatLayout.css";
export default function BusSeatsLayout({
  busid,
  busdetails,
  busprice,
  busdroping,
  logo,
  seatplatform,
  busboarding,
}) {
  const getseats = useSelector((state) => state.seat_layout);
  console.log(getseats.seats_id_layout, "getseatsgetseats");
  console.log(busdroping, "busidbusid");

  const dispatch = useDispatch();
  useEffect(() => {
    GetSeatLayout(busid, dispatch);
  }, []);
  const lowerdeck = getseats?.seats_id_layout?.filter((item) => {
    // return item.desc == "Lower seater";
    return item.z == 0;
  });
  const upperdeck = getseats?.seats_id_layout?.filter((item) => {
    // return item.desc == "Upper sleeper";
    return item.z == 1;
  });
  // const findlowerdeckrow = lowerdeck.length - 1;
  // const lowerdeckrow = lowerdeck[findlowerdeckrow].x;
  // const findupperdeckrow = upperdeck.length - 1;
  // const upperdeckrow = upperdeck[findupperdeckrow].x;
  console.log(lowerdeck, upperdeck, "lowerdecklowerdeck");
  // const lowerdeckrow = Math.max(...lowerdeck?.map((item) => item.x));
  // const lowerdeckcol = Math.max(...lowerdeck?.map((item) => item.y));
  // const upperdeckrow = Math.max(...upperdeck?.map((item) => item.x));
  // const upperdeckcol = Math.max(...upperdeck?.map((item) => item.y));
  const lowerdeckrow = Math.max(lowerdeck?.map((item) => item.x));
  const lowerdeckcol = Math.max(lowerdeck?.map((item) => item.y));
  const upperdeckrow = Math.max(upperdeck?.map((item) => item.x));
  const upperdeckcol = Math.max(upperdeck?.map((item) => item.y));
  console.log(lowerdeckrow, upperdeckrow, "lowerdeckrowlowerdeckrow");
  console.log(lowerdeckcol, "lowerdeckcol", upperdeckcol, "upperdeckcol");

  const [selectedSeats, setSelectedSeats] = useState([]);
  const [modalshow, setShowModal] = useState(false);
  const [selectedRoutes, setSelectedRoutes] = useState({
    dep_route: busboarding?.[0].name,
    arri_route: busdroping?.[0].name,
    dep_time: busboarding?.[0].time,
    arr_time: busdroping?.[0].time,
  });
  const [selectedseatprice, setSelectedSeatsPrice] = useState([]);
  const [totalprice, setTotalPrice] = useState(null);
  const allprice = getseats?.seats_id_layout
    ?.map((item) => {
      console.log(item?.fare?.totalNetFare, "itemitemitemitemitemitemitemitem");
      return Math.round(item?.fare?.totalNetFare);
    })
    .sort((a, b) => a - b);

  console.log(allprice, "sorted allprice");

  const uniqueprice = [...new Set(allprice)];

  console.log(uniqueprice, "allprice");

  useEffect(() => {
    if (selectedseatprice.length > 0) {
      const price = selectedseatprice.reduce((a, b) => {
        return a + b;
      });
      setTotalPrice(Math.round(price));
      console.log(price, "pricepricepriceprice");
    }
  }, [selectedseatprice]);
  console.log(selectedseatprice, selectedSeats, "selectedseatprice");

  const handleSeatClick = (seat) => {
    if (
      seat.status === "BFF" ||
      seat.status === "BFA" ||
      seat.status === "BFM" ||
      seat.status == "on_booking"
    )
      return;

    setSelectedSeats((prevSelectedSeats) => {
      if (prevSelectedSeats.includes(seat.id)) {
        return prevSelectedSeats.filter(
          (selectedSeat) => selectedSeat !== seat.id
        );
      } else {
        if (prevSelectedSeats.length < 6) {
          return [...prevSelectedSeats, seat.id];
        } else {
          toast.warning("You can book only one seat.");
          return prevSelectedSeats;
        }
      }
    });

    setSelectedSeatsPrice((prevSelectedSeatsPrice) => {
      const seatIndex = selectedSeats.indexOf(seat.id);

      if (seatIndex !== -1) {
        return prevSelectedSeatsPrice.filter((_, i) => i !== seatIndex);
      } else {
        if (prevSelectedSeatsPrice.length < 6) {
          return [...prevSelectedSeatsPrice, seat.fare.totalNetFare];
        } else {
          toast.warning("You can book only one seat.");
          return prevSelectedSeatsPrice;
        }
      }
    });
  };

  console.log(selectedSeats, lowerdeck?.[0], "selectedSeatsselectedSeats");
  // const totalFare = selectedSeats.length * busprice.discount;

  const content = (
    <div>
      <div className="grid grid-cols-2 gap-[2vw]">
        <div className="col-span-1">
          <p className="text-[1vw] font-bold">Fare</p>
        </div>
        <div className="col-span-1">
          <p>{`₹${totalprice * selectedSeats.length}`}</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-[2vw]">
        <div className="col-span-1">
          <p className="text-[1vw] font-bold">Base Fare</p>
        </div>
        <div className="col-span-1">
          <p>{`₹${totalprice * selectedSeats.length}`}</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-[2vw]">
        <div className="col-span-1">
          <p className="text-[1vw] font-bold">Discount</p>
        </div>
        <div className="col-span-1">
          <p>{`₹${(totalprice - totalprice) * selectedSeats.length}`}</p>
        </div>
      </div>
    </div>
  );

  const seatcontent = (
    <div className="grid grid-rows-4 gap-[0.5vw]">
      <div className="row-span-1">
        <div className="grid grid-cols-6">
          <div className="col-span-3"></div>
          <div className="col-span-1 items-center justify-center flex">
            <p className="font-bold text-[0.8vw]">Unisex</p>
          </div>
          <div className="col-span-1 items-center justify-center flex">
            <p className="font-bold text-[0.8vw]">Men</p>
          </div>
          <div className="col-span-1 items-center justify-center flex">
            <p className="font-bold text-[0.8vw]">Women</p>
          </div>
        </div>
      </div>
      <div className="row-span-1">
        <div className="grid grid-cols-6">
          <div className="col-span-3">Available</div>
          <div className="col-span-1 items-center justify-center flex">
            {" "}
            <img src={unisex_se} className="w-[1.5vw] h-[1.5vw]" />
          </div>
          <div className="col-span-1  items-center justify-center flex">
            {" "}
            <img src={men_se} className="w-[1.5vw] h-[1.5vw]" />
          </div>
          <div className="col-span-1  items-center justify-center flex">
            {" "}
            <img src={women_se} className="w-[1.5vw] h-[1.5vw]" />
          </div>
        </div>
      </div>
      <div className="row-span-1">
        <div className="grid grid-cols-6">
          <div className="col-span-3">Selected</div>
          <div className="col-span-1  items-center justify-center flex">
            <img src={unisex_se_sel} className="w-[1.5vw] h-[1.5vw]" />
          </div>
          <div className="col-span-1  items-center justify-center flex">
            <img src={men_se_sel} className="w-[1.5vw] h-[1.5vw]" />
          </div>
          <div className="col-span-1  items-center justify-center flex">
            <img src={women_se_sel} className="w-[1.5vw] h-[1.5vw]" />
          </div>
        </div>
      </div>
      <div className="row-span-1">
        <div className="grid grid-cols-6">
          <div className="col-span-3">Booked</div>
          <div className="col-span-1  items-center justify-center flex">
            <img src={unisex_book} className="w-[1.5vw] h-[1.5vw]" />
          </div>
          <div className="col-span-1  items-center justify-center flex">
            <img src={men_se_book} className="w-[1.5vw] h-[1.5vw]" />
          </div>
          <div className="col-span-1  items-center justify-center flex">
            <img src={women_se_book} className="w-[1.5vw] h-[1.5vw]" />
          </div>
        </div>
      </div>

      {/* <div className="col-span-1">
        <div className="grid grid-rows-4">
          <p className="text-[1vw]"></p>
          <p className="text-[1vw] items-center flex ">Available</p>
          <p className="text-[1vw]">Selected</p>
          <p className="text-[1vw]">Booked</p>
        </div>
      </div>
      <div className="col-span-1">
        <div className="grid grid-rows-4">
          <div className="grid grid-cols-3">
            <p className="text-[0.8vw] font-bold">Unisex</p>
            <p className="text-[0.8vw] font-bold">Men</p>
            <p className="text-[0.8vw] font-bold">Women</p>
          </div>
          <div className="grid grid-cols-3">
            <img src={unisex_se} className="w-[2vw] h-[2vw]" />
            <img src={men_se} className="w-[1.5vw] h-[1.5vw]" />
            <img src={women_se} className="w-[1.5vw] h-[1.5vw]" />
          </div>
          <div className="grid grid-cols-3">
            <img src={unisex_se} className="w-[2vw] h-[2vw]" />
            <img src={men_se} className="w-[1.5vw] h-[1.5vw]" />
            <img src={women_se} className="w-[1.5vw] h-[1.5vw]" />
          </div>
          <div className="grid grid-cols-3  ">
            <img src={unisex_se} className="w-[2vw] h-[2vw]" />
            <img src={men_se} className="w-[1.5vw] h-[1.5vw]" />
            <img src={women_se} className="w-[1.5vw] h-[1.5vw]" />
          </div>
        </div>
      </div> */}
    </div>
  );
  const [currentrate, SetCurrentRate] = useState(1);
  console.log(currentrate, "currentratecurrentrate");
  const getShadowClass = (seat) => {
    const roundedFare = Math.round(seat?.fare?.totalNetFare);
    if (currentrate === roundedFare) {
      switch (seat.status) {
        case "AFF":
        case "BFF":
          return "shadow-lg shadow-pink-400";
        case "AFA":
          return "shadow-lg shadow-green-400";
        case "BFM":
        case "AFM":
          return "shadow-lg shadow-blue-400";
        case "BFA":
          return "shadow-lg shadow-gray-400";
        default:
          return "";
      }
    }
    return "";
  };
  const getBorderClass = (seat) => {
    switch (seat.status) {
      case "AFA":
        return "border-green-500";
      case "BFA":
        return "border-gray-400";
      case "AFF":
      case "BFF":
        return "border-pink-500";
      case "AFM":
      case "BFM":
        return "border-blue-500";
      case "on_booking":
        return "border-gray-400";
      default:
        return "border-gray-400";
    }
  };
  const getBackgroundClass = (seat) => {
    if (selectedSeats.includes(seat.id) && seat.status == "AFF") {
      return "bg-pink-300";
    } else if (selectedSeats.includes(seat.id) && seat.status == "AFM") {
      return "bg-blue-300";
    } else if (selectedSeats.includes(seat.id) && seat.status == "AFA") {
      return "bg-green-300";
    }

    switch (seat.status) {
      case "BFA":
        return "bg-gray-200";
      case "BFM":
        return "bg-blue-100";
      case "BFF":
        return "bg-pink-100";
      case "on_booking":
        return "bg-gray-200";
      default:
        return "bg-white";
    }
  };
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
        return "";
    }
  };
  const getColor = (seat) => {
    switch (seat.status) {
      case "BFF":
      case "BFM":
      case "BFA":
        return "gray";
      case "AFF":
        return "#FF26E5";
      case "AFM":
        return "blue";
      case "on_booking":
        return "gray";
      default:
        return "#4caf50";
    }
  };
  console.log(lowerdeckcol, "upperdeckcol");

  return (
    <div className="px-[0.5vw]">
      <div
        className={`${
          busdetails.bus_type_status === "luxury"
            ? "bg-[#FFEEC9]"
            : "bg-[#EEEDED]"
        }  border-x-[0.1vw] border-b-[0.1vw] rounded-b-[0.5vw]`}
      >
        <div className="h-[4vw] w-full   ">
          <div className="grid grid-cols-4 w-full h-full pt-[1vw] px-[1vw]  items-center">
            <div className="col-span-3 pl-[4vw]">
              <button
                type="button"
                className={`${
                  currentrate == 1 ? " " : "  "
                } h-[2.5vw] w-[6vw] rounded-l-[0.5vw] font-bold  border-y-[0.1vw] border-l-[0.1vw]`}
                onClick={() => SetCurrentRate(1)}
                style={{
                  background:
                    busdetails.bus_type_status === "luxury" && currentrate == 1
                      ? "#393939"
                      : busdetails.bus_type_status === "regular" &&
                        currentrate == 1
                      ? "#1F487C"
                      : "white",
                  borderColor:
                    busdetails.bus_type_status === "luxury"
                      ? "#393939"
                      : "#1F487C",
                  color:
                    currentrate == 1
                      ? "white"
                      : busdetails.bus_type_status === "luxury"
                      ? "#393939"
                      : busdetails.bus_type_status === "regular"
                      ? "#1F487C"
                      : "white",
                }}
              >
                All
              </button>
              {uniqueprice.length > 0 &&
                uniqueprice?.map((item) => (
                  <button
                    type="button"
                    className={`${
                      currentrate == Number(item) ? " " : "   "
                    } h-[2.5vw] w-[6vw]   font-bold  border-y-[0.1vw] border-r-[0.1vw]`}
                    onClick={() => SetCurrentRate(item)}
                    style={{
                      background:
                        busdetails.bus_type_status === "luxury" &&
                        currentrate == item
                          ? "#393939"
                          : busdetails.bus_type_status === "regular" &&
                            currentrate == item
                          ? "#1F487C"
                          : "white",
                      borderColor:
                        busdetails.bus_type_status === "luxury"
                          ? "#393939"
                          : "#1F487C",
                      color:
                        currentrate == item
                          ? "white"
                          : busdetails.bus_type_status === "luxury"
                          ? "#393939"
                          : busdetails.bus_type_status === "regular"
                          ? "#1F487C"
                          : "white",
                    }}
                  >
                    {`₹ ${item}`}
                  </button>
                ))}
            </div>
            <div className="col-span-1 flex items-center">
              <div className=" w-full h-[2vw] px-[2vw]">
                <div className=" items-center  flex">
                  <Popover
                    placement="bottomRight"
                    title={<span className="text-[0.8vw]">Seater/Sleeper</span>}
                    content={seatcontent}
                    style={{
                      padding: "8px",
                      margin: "0",
                    }}
                  >
                    <div className="flex items-center ">
                      <span className="">
                        <IoIosInformationCircleOutline
                          color="black"
                          size={"1.5vw"}
                        />
                      </span>
                      <span className="text-[1.2vw] font-bold  pl-[0.2vw] cursor-pointer">
                        Know your seats
                      </span>
                    </div>
                  </Popover>
                </div>
              </div>
            </div>
          </div>
        </div>{" "}
        <div
          className={`${
            busdetails.bus_type_status === "luxury"
              ? "bg-[#FFEEC9]"
              : "bg-[#EEEDED]"
          }  grid grid-cols-2 h-[55vw] pt-[1vw] w-full rounded-b-[0.5vw]`}
        >
          <div className="col-span-1 h-full w-full">
            <div className="grid grid-cols-2 h-full w-full px-[5vw] gap-[1.5vw]">
              <div className={`col-span-1 h-full w-full py-[1vw]`}>
                <div className="border-[0.1vw] border-gray-400 h-[53vw] w-full rounded-[0.5vw] relative bg-white">
                  <p className="text-[1vw] absolute top-[-1.5vw] left-[3vw] text-center">
                    {"Lower List".toUpperCase()}
                    {`(${lowerdeck?.length})`}
                  </p>
                  <span className="absolute top-[1vw] right-[1vw]">
                    <RiSteering2Fill size={"2vw"} />
                  </span>
                  <div className="border-l-[0.2vw] border-[#EEEDED] absolute left-[-0.15vw] top-[3vw] h-[3vw]"></div>
                  <div className="border-r-[0.1vw] border-t-[0.1vw] border-b-[0.1vw] bg-[#EEEDED] border-gray-400 h-[3vw] left-[-0.05vw] w-[3vw] top-[3vw] absolute"></div>
                  <div className="grid grid-rows-6 h-full w-full gap-[1vw] pt-[6vw] py-[1vw]">
                    <div>
                      <div>
                        <div
                          className={`grid grid-cols-${upperdeckcol} gap-y-[1.5vw] p-[1vw]`}
                          style={{
                            transform: "rotateY(180deg)",
                          }}
                        >
                          {lowerdeck?.map((seat) => (
                            <div
                              key={seat.id}
                              className={``}
                              style={{
                                gridColumnStart: seat.y + 1,
                                gridRowStart: seat.x + 1,
                                // gridRowEnd: seat.desc
                                //   .toLowerCase()
                                //   .includes("sleeper")
                                //   ? `span 2` // Span across 2 rows for sleeper seats
                                //   : `auto`,

                                gridRowEnd:
                                  seat.height == 2 ? `span 2` : `auto`,
                                // transform: "scaleX(-1)",
                              }}
                            >
                              {/* Sleeper or Non-Sleeper Rendering */}
                              {seat.desc.toLowerCase().includes("sleeper") ? (
                                <Tooltip
                                  title={
                                    <div className="flex flex-col items-center">
                                      <div className="flex items-center">
                                        <span className="text-[1.2vw] font-semibold">{`${seat.name}`}</span>
                                        <span className="text-[1vw] pl-[0.5vw]">{`(
                                        ${getStatusText(seat)})`}</span>
                                      </div>
                                      <span className="pl-[0.3vw] font-bold text-[1.1vw]">{`₹${Math.round(
                                        seat?.fare?.totalNetFare
                                      )}`}</span>
                                    </div>
                                  }
                                  color={getColor(seat)}
                                >
                                  {console.log(
                                    selectedSeats.map(
                                      (item) => item == seat.name
                                    ),
                                    seat.name,
                                    "testjkhkjhkjhkj"
                                  )}
                                  <div
                                    className={`border-[0.1vw] 
                                       ${getBorderClass(seat)}
                                      ${getShadowClass(seat)}      
                                        ${getBackgroundClass(seat)}
 h-[6vw] w-[2.5vw] rounded-[0.3vw] relative flex items-center justify-center cursor-pointer`}
                                    onClick={() => handleSeatClick(seat)}
                                  >
                                    <div
                                      className={`border-[0.1vw]                                           ${getBorderClass(
                                        seat
                                      )}
  w-[1.5vw] h-[0.5vw] absolute bottom-[0.5vw] rounded-[0.3vw]`}
                                    ></div>
                                  </div>
                                </Tooltip>
                              ) : (
                                <Tooltip
                                  title={
                                    <div className="flex flex-col items-center">
                                      <div className="flex items-center">
                                        <span className="text-[1.2vw] font-semibold">{`${seat.name}`}</span>
                                        <span className="text-[1vw] pl-[0.5vw]">{`( ${getStatusText(
                                          seat
                                        )})`}</span>
                                      </div>
                                      <span className="pl-[0.3vw] font-bold text-[1.1vw]">{`₹${Math.round(
                                        seat?.fare?.totalNetFare
                                      )}`}</span>
                                    </div>
                                  }
                                  color={getColor(seat)}
                                >
                                  <div
                                    className={`border-t-[0.1vw] border-l-[0.1vw] border-r-[0.1vw] rounded-t-[0.2vw] h-[2vw] w-[2vw] relative flex items-center justify-center cursor-pointer
                                          ${getBorderClass(seat)}

                                         ${getShadowClass(seat)}      

 ${getBackgroundClass(seat)}`}
                                    onClick={() => handleSeatClick(seat)}
                                  >
                                    <div
                                      className={`border-b-[0.1vw] border-l-[0.1vw] border-r-[0.1vw]  h-[2vw] w-[2.4vw] absolute top-[0.7vw] flex items-center justify-center 
                                             ${getBorderClass(seat)}

                                             ${getShadowClass(seat)}      
    
      ${getBackgroundClass(seat)}`}
                                    ></div>
                                    <div
                                      className={`border-b-[0.1vw] border-l-[0.1vw] border-r-[0.1vw] h-[1.6vw] w-[1.6vw] absolute top-[0.7vw] flex items-center justify-center 
                                           ${getBorderClass(seat)}

        ${getBackgroundClass(seat)}`}
                                    ></div>
                                    <div
                                      className={`border-t-[0.1vw] absolute top-[0.7vw] w-[0.4vw] left-[-0.2vw] 
                                            ${getBorderClass(seat)}
 `}
                                    ></div>
                                    <div
                                      className={`border-t-[0.1vw] absolute top-[0.7vw] w-[0.4vw] right-[-0.2vw] rounded-tr-[0.2vw] 
                                              ${getBorderClass(seat)}
 `}
                                    ></div>
                                  </div>
                                </Tooltip>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* upper */}
              <div className="col-span-1 h-full w-full py-[1vw] ">
                {upperdeck?.length > 0 ? (
                  <div className="border-[0.1vw] border-gray-400 h-[53vw] w-full rounded-[0.5vw] relative bg-white">
                    <p className="text-[1vw] absolute top-[-1.5vw] left-[3vw] text-center">
                      {"Upper List".toUpperCase()}
                      {`(${upperdeck?.length})`}
                    </p>
                    <div className="grid grid-rows-6 h-full w-full pt-[6vw] py-[1vw]">
                      <div
                        className={`grid grid-cols-${upperdeckcol} gap-y-[1.5vw] p-[1vw]`}
                        style={{
                          transform: "rotateY(180deg)",
                        }}
                      >
                        {upperdeck?.map((seat) => (
                          <div
                            key={seat.id}
                            style={{
                              gridColumnStart: seat.y + 1,
                              gridRowStart: seat.x + 1,
                              // gridRowEnd: seat.desc
                              //   .toLowerCase()
                              //   .includes("sleeper")
                              //   ? `span 2` // Span across 2 rows for sleeper seats
                              //   : `auto`,
                              gridRowEnd: seat.height == 2 ? `span 2` : `auto`,
                            }}
                          >
                            {/* <FaBed className="text-3xl text-gray-700" /> */}
                            {/* <span className="font-bold">{seat.id}</span>
                          <span className="text-sm text-gray-500">
                            {seat.desc}
                          </span> */}
                            {seat?.desc?.toLowerCase().includes("sleeper") ? (
                              <Tooltip
                                title={
                                  <div className="flex flex-col items-center">
                                    <div className="flex items-center">
                                      <span className="text-[1.2vw] font-semibold">{`${seat.name}`}</span>
                                      <span className="text-[1vw] pl-[0.5vw]">{`( ${getStatusText(
                                        seat
                                      )})`}</span>
                                    </div>
                                    <span className="pl-[0.3vw] font-bold text-[1.1vw]">{`₹${Math.round(
                                      seat?.fare?.totalNetFare
                                    )}`}</span>
                                  </div>
                                }
                                color={getColor(seat)}
                              >
                                <div
                                  className={`border-[0.1vw]                                          ${getBorderClass(
                                    seat
                                  )}

                                                                               ${getShadowClass(
                                                                                 seat
                                                                               )}      

                                   ${getBackgroundClass(
                                     seat
                                   )}  h-[6vw] w-[2.5vw] rounded-[0.3vw] relative flex items-center justify-center cursor-pointer`}
                                  onClick={() => handleSeatClick(seat)}
                                >
                                  <div
                                    className={`border-[0.1vw]                                            ${getBorderClass(
                                      seat
                                    )}
  w-[1.5vw] h-[0.5vw] absolute bottom-[0.5vw] rounded-[0.3vw]`}
                                  ></div>
                                </div>
                              </Tooltip>
                            ) : (
                              <Tooltip
                                title={
                                  <div className="flex flex-col items-center">
                                    <div className="flex items-center">
                                      <span className="text-[1.2vw] font-semibold">{`${seat.name}`}</span>
                                      <span className="text-[1vw] pl-[0.5vw]">{`( ${getStatusText(
                                        seat
                                      )})`}</span>
                                    </div>
                                    <span className="pl-[0.3vw] font-bold text-[1.1vw]">{`₹${Math.round(
                                      seat?.fare?.totalNetFare
                                    )}`}</span>
                                  </div>
                                }
                                color={
                                  seat.status === "BFF" ||
                                  seat.status === "BFM" ||
                                  seat.status === "BFA"
                                    ? "gray"
                                    : seat.status === "AFF"
                                    ? "#FF26E5"
                                    : "#4caf50"
                                }
                              >
                                <div
                                  className={`border-t-[0.1vw]  border-l-[0.1vw] border-r-[0.1vw]                                            ${getBorderClass(
                                    seat
                                  )}


                                             ${getShadowClass(seat)}      
  ${getBackgroundClass(
    seat
  )} h-[2vw] w-[2vw] rounded-t-[0.2vw] relative flex items-center justify-center cursor-pointer`}
                                  onClick={() => handleSeatClick(seat)}
                                >
                                  <div
                                    className={`border-b-[0.1vw] border-l-[0.1vw] border-r-[0.1vw]  ${
                                      currentrate ==
                                      Math.round(seat?.fare?.totalNetFare)
                                        ? "shadow-lg shadow-gray-500 "
                                        : ""
                                    }  
                                    ${getBorderClass(seat)} 




                              ${getShadowClass(seat)}      

                                  ${getBackgroundClass(seat)}
                                   h-[2vw] rounded-b-[0.2vw] w-[2.4vw] absolute top-[0.7vw] flex items-center`}
                                  ></div>
                                  <div
                                    className={`border-b-[0.1vw] border-l-[0.1vw] border-r-[0.1vw]
                                         ${getBorderClass(seat)}
                                           h-[1.6vw] w-[1.6vw] rounded-b-[0.1vw] absolute top-[0.7vw] flex items-center`}
                                  ></div>
                                  <div
                                    className={`border-t-[0.1vw] absolute top-[0.7vw] w-[0.4vw] left-[-0.2vw]  
                                        ${getBorderClass(seat)} `}
                                  ></div>
                                  <div
                                    className={`border-t-[0.1vw]  absolute top-[0.7vw] w-[0.4vw]  right-[-0.2vw]   
                                       ${getBorderClass(
                                         seat
                                       )}  rounded-tr-[0.2vw]`}
                                  ></div>
                                </div>
                              </Tooltip>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
          <div className="col-span-1 h-[55vw] w-full ">
            <div className="grid grid-cols-2 w-full h-[43vw] px-[2vw] py-[1vw] gap-[1.5vw]">
              <div className="col-span-1 border-[0.1vw] border-gray-400 w-full h-[43vw] rounded-[0.5vw] bg-white">
                <p
                  className="text-center py-[0.5vw]  text-white rounded-tl-[0.45vw] rounded-tr-[0.45vw] text-[1.2vw]"
                  style={{
                    backgroundColor:
                      busdetails.bus_type_status === "luxury"
                        ? "#393939"
                        : "#1F487C",
                  }}
                >
                  PICKUP POINT
                </p>
                <div className="max-h-[39vw] overflow-y-auto new-scrollbar">
                  {" "}
                  {busboarding.map((item, index) => (
                    <div
                      key={index}
                      className={`${
                        selectedRoutes?.dep_route == item.anme
                          ? "bg-[#E5FFF1]"
                          : "bg-white hover:bg-gray-200"
                      } flex flex-col py-[0.5vw] px-[1vw]  cursor-pointer relative`}
                      onClick={() =>
                        setSelectedRoutes({
                          ...selectedRoutes,
                          dep_route: item.name,
                          dep_time: item?.time,
                        })
                      }
                      style={{
                        backgroundColor:
                          selectedRoutes?.dep_route == item.name
                            ? busdetails.bus_type_status === "luxury"
                              ? "#FFE5AB"
                              : busdetails.bus_type_status === "regular"
                              ? "#E7E9EB"
                              : "white"
                            : "white",
                      }}
                    >
                      {selectedRoutes?.dep_route == item.name ? (
                        <span className="absolute right-[1vw] top-[0.8vw]">
                          <HiCheckCircle
                            size={"1.2vw"}
                            color={
                              busdetails.bus_type_status === "luxury"
                                ? "#393939"
                                : "#1F487C"
                            }
                          />
                        </span>
                      ) : (
                        ""
                      )}

                      <p className=" flex items-center">
                        <span className="text-[1vw] pr-[1vw]">
                          {dayjs(item?.time).format("HH:mm")}
                        </span>
                        <span className="text-[0.8vw] ">
                          {`(${dayjs(item.time).format("DD MMM")})`}
                        </span>
                      </p>
                      <p className="text-[1.1vw] font-bold">{item.name}</p>
                      <p className="text-[0.8vw]">{`(${item.address})`}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="col-span-1 border-[0.1vw] border-gray-400 w-full h-[43vw] rounded-[0.5vw] bg-white">
                <p
                  className="text-center py-[0.5vw]  text-white rounded-tl-[0.45vw] rounded-tr-[0.45vw] text-[1.2vw]"
                  style={{
                    backgroundColor:
                      busdetails.bus_type_status === "luxury"
                        ? "#393939"
                        : "#1F487C",
                  }}
                >
                  DROP POINT
                </p>
                <div className="max-h-[39vw] overflow-y-auto new-scrollbar">
                  {" "}
                  {busdroping?.map((item, index) => (
                    <div
                      key={index}
                      className={`${
                        selectedRoutes.arri_route == item.name
                          ? "bg-[#E5FFF1]"
                          : "bg-white hover:bg-gray-200"
                      } flex flex-col py-[0.5vw] px-[1vw]  cursor-pointer relative`}
                      onClick={() =>
                        setSelectedRoutes({
                          ...selectedRoutes,
                          arri_route: item.name,
                          arr_time: item?.time,
                        })
                      }
                      style={{
                        backgroundColor:
                          selectedRoutes?.arri_route == item.name
                            ? busdetails.bus_type_status === "luxury"
                              ? "#FFE5AB"
                              : busdetails.bus_type_status === "regular"
                              ? "#E7E9EB"
                              : "white"
                            : "white",
                      }}
                    >
                      {selectedRoutes.arri_route == item.name ? (
                        <span className="absolute right-[1vw] top-[0.8vw]">
                          <HiCheckCircle
                            size={"1.2vw"}
                            color={
                              busdetails.bus_type_status === "luxury"
                                ? "#393939"
                                : "#1F487C"
                            }
                          />
                        </span>
                      ) : (
                        ""
                      )}

                      <p className=" flex items-center">
                        <span className="text-[1vw] pr-[1vw]">
                          {dayjs(item?.time).format("HH:mm")}
                        </span>
                        <span className="text-[0.8vw] ">
                          {`(${dayjs(item.time).format("DD MMM")})`}
                        </span>
                      </p>
                      <p className="text-[1.1vw] font-bold">{item.name}</p>
                      <p className="text-[0.8vw]">{`(${item.address})`}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="h-[11vw] w-full  px-[2vw] py-[1vw] ">
              <div className="border-[0.1vw] border-gray-400 w-full h-full mt-[1vw] rounded-[0.5vw] bg-white">
                <div className="grid grid-rows-2 h-full w-full">
                  <div className="row-span-1 px-[1vw] pt-[1vw]">
                    <div className="flex justify-between">
                      <div className="flex flex-col">
                        <p className="text-[1.1vw] font-bold">Selected Seats</p>
                        {/* <p className="text-[1vw]">11</p> */}
                        <div className="flex flex-row flex-wrap">
                          {selectedSeats?.length > 0 ? (
                            selectedSeats?.map((seat, index) => (
                              <p key={index} className="text-[1vw] mr-[0.4vw]">
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
                          <p className="float-end text-[1.3vw] font-bold">{`₹${totalprice}`}</p>

                          <Popover placement="top" content={content}>
                            <p className="text-[0.8vw] text-blue-500 font-semibold">
                              Fare Details
                            </p>
                          </Popover>
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
                            ? busdetails.bus_type_status === "luxury"
                              ? "#393939"
                              : busdetails.bus_type_status === "regular"
                              ? "#1F487C"
                              : "#9CA3AF"
                            : "#9CA3AF",
                      }}
                    >
                      Continue
                    </button>
                  </div>
                  <DrawerDetails
                    modalshow={modalshow}
                    setShowModal={setShowModal}
                    selectedSeats={selectedSeats}
                    selectedRoutes={selectedRoutes}
                    busdetails={busdetails}
                    // seatplatform={seatplatform}
                    //type={type}
                    discount={totalprice}
                    busprice={totalprice}
                    // imageurl={logo}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
