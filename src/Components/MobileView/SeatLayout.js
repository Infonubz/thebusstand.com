import React, { useEffect, useState } from "react";
import SelectedCardDesign from "./SelectedCardDesign";
import { useDispatch, useSelector } from "react-redux";
import { Popover, Spin, Tooltip } from "antd";
import { GetSeatLayout } from "../../Api/Dashboard/Dashboard";
import { toast } from "react-toastify";
import men_se from "../../../src/assets/men_se.png";
// import men_sl_sel from "../../../src/assets/men_sl_sel.png";
import men_se_sel from "../../../src/assets/men_se_sel.png";
// import men_sl_book from "../../../src/assets/sl_men_book.png";
import men_se_book from "../../../src/assets/se_men_book.png";
// import women_sl from "../../../src/assets/women_sl.png";
import women_se from "../../../src/assets/women_se.png";
// import women_sl_sel from "../../../src/assets/women_sl_sel.png";
import women_se_sel from "../../../src/assets/women_se_sel.png";
// import women_sl_book from "../../../src/assets/sl_women_book.png";
import women_se_book from "../../../src/assets/se_women_book.png";
import unisex_book from "../../../src/assets/unisex_se_book.png";
import unisex_se_sel from "../../../src/assets/unisex_se_sel.png";
import unisex_se from "../../../src/assets/unisex_se.png";
import { RiSteering2Fill } from "react-icons/ri";
import { LoadingOutlined } from "@ant-design/icons";
import PickupDropPoint from "./Pickup&DropPoint";

export default function MobileSeatLayout({
  item,
  selectedSeats,
  setSelectedSeats,
  setSelectedSeatsPrice,
  selectedseatprice,
  setSeatDetails,
  seatDetails
}) {
  const [currentrate, SetCurrentRate] = useState(1);
  const getseats = useSelector((state) => state.seat_layout);
  const allprice = getseats?.seats_id_layout
    ?.map((items) => {
      console.log(items?.fare?.totalNetFare, "uiiiiiiiiiiiiiii");
      return Math.round(items?.fare?.totalNetFare);
    })
    .sort((a, b) => a - b);
  const [layoutloading, setLayoutLoading] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    // setInterval(() => {
    GetSeatLayout(item.bus_id, dispatch, setLayoutLoading);
    // }, 1000);
  }, [item.bus_id, dispatch]);
  console.log(currentrate, "currentrate");

  const uniqueprice = [...new Set(allprice)];
  console.log(uniqueprice, "uniquepriceuniquepriceuniquepriceuniqueprice");
  //   const getseats = useSelector((state) => state.seat_layout);
  console.log(getseats, "getseatsgetseats777777");
  //   console.log(busdroping, "busidbusid");
  //   const [layoutloading, setLayoutLoading] = useState(false);
  //   const dispatch = useDispatch();
  useEffect(() => {
    // setInterval(() => {
    GetSeatLayout(item.bus_id, dispatch, setLayoutLoading);
    // }, 1000);
  }, [item.bus_id, dispatch]);

  const lowerdeck = getseats?.seats_id_layout?.filter((item) => {
    // return item.desc == "Lower seater";
    return item.z === 0;
  });
  console.log(layoutloading, "layoutloadinglayoutloading");

  const upperdeck = getseats?.seats_id_layout?.filter((item) => {
    // return item.desc == "Upper sleeper";
    return item.z === 1;
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
  const lowerdeckc = lowerdeck?.map((item) => {
    // return item.desc == "Lower seater";
    return item.y;
  });
  const upperdeckc = upperdeck?.map((item) => {
    // return item.desc == "Lower seater";
    return item.y;
  });
  console.log(lowerdeckc, "lowerdeckclowerdeckc");

  const lowerdeckrow = Math.max(lowerdeck?.map((item) => item.x));
  const lowerdeckcol = lowerdeckc?.length > 0 ? Math.max(...lowerdeckc) : [];
  const upperdeckrow = Math.max(upperdeck?.map((item) => item.x));
  const upperdeckcol = upperdeckc?.length > 0 ? Math.max(...upperdeckc) : [];
  console.log(lowerdeckrow, upperdeckrow, "lowerdeckrowlowerdeckrow");
  console.log(lowerdeckcol, "lowerdeckcol", upperdeckcol, "upperdeckcol");

  // const [selectedSeats, setSelectedSeats] = useState([]);
  const [modalshow, setShowModal] = useState(false);
  //   const [selectedRoutes, setSelectedRoutes] = useState({
  //     dep_route: busboarding?.[0].name,
  //     arri_route: busdroping?.[0].name,
  //     dep_time: busboarding?.[0].time,
  //     arr_time: busdroping?.[0].time,
  //   });
  // const [selectedseatprice, setSelectedSeatsPrice] = useState([]);
  const [totalprice, setTotalPrice] = useState(null);
  //   const allprice = getseats?.seats_id_layout
  //     ?.map((item) => {
  //       console.log(item?.fare?.totalNetFare, "itemitemitemitemitemitemitemitem");
  //       return Math.round(item?.fare?.totalNetFare);
  //     })
  //     .sort((a, b) => a - b);

  console.log(allprice, "sorted allprice");

  //   const uniqueprice = [...new Set(allprice)];

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

  // const handleSeatClick = (seat) => {
  //   if (
  //     seat.status === "BFF" ||
  //     seat.status === "BFA" ||
  //     seat.status === "BFM" ||
  //     seat.status === "on_booking"
  //   )
  //     return;

  //   setSelectedSeats((prevSelectedSeats) => {
  //     if (prevSelectedSeats.includes(seat.id)) {
  //       return prevSelectedSeats.filter(
  //         (selectedSeat) => selectedSeat !== seat.id
  //       );
  //     } else {
  //       if (prevSelectedSeats.length < 6) {
  //         return [...prevSelectedSeats, seat.id];
  //       } else {
  //         toast.warning("You can book maximum six seats only.");
  //         return prevSelectedSeats;
  //       }
  //     }
  //   });

  //   setSelectedSeatsPrice((prevSelectedSeatsPrice) => {
  //     const seatIndex = selectedSeats.indexOf(seat.id);

  //     if (seatIndex !== -1) {
  //       return prevSelectedSeatsPrice.filter((_, i) => i !== seatIndex);
  //     } else {
  //       if (prevSelectedSeatsPrice.length < 6) {
  //         return [...prevSelectedSeatsPrice, seat.fare.totalNetFare];
  //       } else {
  //         //toast.warning("You can book only six seats.");
  //         return prevSelectedSeatsPrice;
  //       }
  //     }
  //   });
  // };


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
        // Remove seat from selectedSeats
        setSeatDetails((prevSeatDetails) => {
          const updatedDetails = { ...prevSeatDetails };
          delete updatedDetails[seat.id]; // Remove seat from seatDetails
          return updatedDetails;
        });
        return prevSelectedSeats.filter(
          (selectedSeat) => selectedSeat !== seat.id
        );
      } else {
        // Add seat to selectedSeats
        if (prevSelectedSeats.length < 6) {
          setSeatDetails((prevSeatDetails) => ({
            ...prevSeatDetails,
            [seat.id]: { Seat: seat.id, Status: seat.status }, // Store seat ID and its status
          }));
          return [...prevSelectedSeats, seat.id];
        } else {
          toast.warning("You can book only six seats.");
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
          //toast.warning("You can book only six seats.");
          return prevSelectedSeatsPrice;
        }
      }
    });
  };

  console.log(selectedSeats, lowerdeck?.[0], "selectedSeatsselectedSeats");
  // const totalFare = selectedSeats.length * busprice.discount;

  // const content = (
  //   <div>
  //     <div className="grid grid-cols-2 gap-[2vw]">
  //       <div className="col-span-1">
  //         <p className="text-[1vw] font-bold">Fare</p>
  //       </div>
  //       <div className="col-span-1">
  //         <p>{`₹${totalprice * selectedSeats.length}`}</p>
  //       </div>
  //     </div>
  //     <div className="grid grid-cols-2 gap-[2vw]">
  //       <div className="col-span-1">
  //         <p className="text-[1vw] font-bold">Base Fare</p>
  //       </div>
  //       <div className="col-span-1">
  //         <p>{`₹${totalprice * selectedSeats.length}`}</p>
  //       </div>
  //     </div>
  //     <div className="grid grid-cols-2 gap-[2vw]">
  //       <div className="col-span-1">
  //         <p className="text-[1vw] font-bold">Discount</p>
  //       </div>
  //       <div className="col-span-1">
  //         <p>{`₹${(totalprice - totalprice) * selectedSeats.length}`}</p>
  //       </div>
  //     </div>
  //   </div>
  // );

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
            <img src={unisex_se} className="w-[1.5vw] h-[1.5vw]" alt="" />
          </div>
          <div className="col-span-1  items-center justify-center flex">
            {" "}
            <img src={men_se} className="w-[1.5vw] h-[1.5vw]" alt="" />
          </div>
          <div className="col-span-1  items-center justify-center flex">
            {" "}
            <img src={women_se} className="w-[1.5vw] h-[1.5vw]" alt="" />
          </div>
        </div>
      </div>
      <div className="row-span-1">
        <div className="grid grid-cols-6">
          <div className="col-span-3">Selected</div>
          <div className="col-span-1  items-center justify-center flex">
            <img src={unisex_se_sel} className="w-[1.5vw] h-[1.5vw]" alt="" />
          </div>
          <div className="col-span-1  items-center justify-center flex">
            <img src={men_se_sel} className="w-[1.5vw] h-[1.5vw]" alt="" />
          </div>
          <div className="col-span-1  items-center justify-center flex">
            <img src={women_se_sel} className="w-[1.5vw] h-[1.5vw]" alt="" />
          </div>
        </div>
      </div>
      <div className="row-span-1">
        <div className="grid grid-cols-6">
          <div className="col-span-3">Booked</div>
          <div className="col-span-1  items-center justify-center flex">
            <img src={unisex_book} className="w-[1.5vw] h-[1.5vw]" alt="" />
          </div>
          <div className="col-span-1  items-center justify-center flex">
            <img src={men_se_book} className="w-[1.5vw] h-[1.5vw]" alt="" />
          </div>
          <div className="col-span-1  items-center justify-center flex">
            <img src={women_se_book} className="w-[1.5vw] h-[1.5vw]" alt="" />
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
  //   const [currentrate, SetCurrentRate] = useState(1);
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
        return "#298121";
      case "BFA":
        return "#958F8F";
      case "AFF":
      case "BFF":
        return "#FF56E3";
      case "AFM":
      case "BFM":
        return "#0088D3";
      case "on_booking":
        return "#958F8F";
      default:
        return "#958F8F";
    }
  };
  const getBackgroundClass = (seat) => {
    if (selectedSeats.includes(seat.id) && seat.status === "AFF") {
      return "#FDB0F9";
    } else if (selectedSeats.includes(seat.id) && seat.status === "AFM") {
      return "#58E1FF";
    } else if (selectedSeats.includes(seat.id) && seat.status === "AFA") {
      return "#84EC7A";
    }

    switch (seat.status) {
      case "BFA":
        return "#D8D8D8";
      case "BFM":
        return "#CCF6FF";
      case "BFF":
        return "#FFE9FE";
      case "on_booking":
        return "#D8D8D8";
      default:
        return "none";
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
        return "none";
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
        return "green";
    }
  };
  const [busType, setBusType] = useState(
    JSON.parse(sessionStorage.getItem("isLuxury"))
  );
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      {layoutloading == false ? (
        <>
          <div>
            <div>
              <div
                className={`${
                  lowerdeck?.length > 0 && upperdeck?.length > 0
                    ? "grid grid-cols-2 px-[2vw]"
                    : "grid grid-cols-1 px-[20vw]"
                } h-full w-full  gap-[1.5vw] `}
              >
                <div className={`col-span-1 h-full w-full py-[1vw]`}>
                  <div
                    className={`border-[0.1vw] border-gray-400 h-[165vw] w-full rounded-[0.5vw] relative bg-white`}
                  >
                    <p className="text-[3.5vw] absolute top-[1.5vw] left-[6vw] text-center">
                      {"Lower List".toUpperCase()}
                      {`(${lowerdeck?.length})`}
                    </p>
                    <span className="absolute top-[2vw] right-[2vw]">
                      <RiSteering2Fill size={"6vw"} />
                    </span>
                    <div className="border-l-[0.2vw] border-[#EEEDED] absolute left-[-0.15vw] top-[3vw] h-[3vw]"></div>
                    <div
                      className={`border-r-[0.1vw] border-t-[0.1vw] border-b-[0.1vw] ${
                        item.bus_type_status === "luxury"
                          ? "bg-[#FFEEC9]"
                          : "bg-[#EEEDED]"
                      } border-gray-400 h-[8vw] left-[-0.05vw] w-[8vw] top-[10vw] absolute`}
                    ></div>
                    <div className="grid grid-rows-6 h-full w-full gap-[1vw] pt-[20vw] py-[1vw]">
                      <div>
                        <div>
                          <div
                            className={`grid grid-flow-col gap-y-[3vw] p-[2vw]`}
                            style={{
                              transform: "rotateY(180deg)",
                            }}
                          >
                            {lowerdeck?.map((seat) => (
                              <div
                                key={seat.id}
                                className={``}
                                style={{
                                  // gridColumn: lowerdeckc,
                                  gridColumnStart: seat.y + 1,
                                  gridRowStart: seat.x + 1,
                                  //   .toLowerCase()
                                  //   .includes("sleeper")
                                  //   ? `span 2` // Span across 2 rows for sleeper seats
                                  //   : `auto`,
                                  gridRowEnd:
                                    seat.height === 2 ? `span 2` : `auto`,
                                  // transform: "scaleX(-1)",
                                }}
                              >
                                {/* Sleeper or Non-Sleeper Rendering */}
                                {seat.desc.toLowerCase().includes("sleeper") ? (
                                  <Tooltip
                                    placement="top"
                                    title={
                                      <div className="flex flex-col items-center">
                                        <div className="flex items-center">
                                          <span className="text-[4.5vw] font-semibold">{`${seat.name}`}</span>
                                          <span className="text-[3.5vw] pl-[0.5vw]">{`(
                                        ${getStatusText(seat)})`}</span>
                                        </div>
                                        <span className="pl-[0.3vw] font-bold text-[4vw]">{`₹${Math.round(
                                          seat?.fare?.totalNetFare
                                        )}`}</span>
                                      </div>
                                    }
                                    color={getColor(seat)}
                                  >
                                    {console.log(
                                      selectedSeats.map(
                                        (item) => item === seat.name
                                      ),
                                      seat.name,
                                      "testjkhkjhkjhkj"
                                    )}

                                    <svg
                                      width="9.5vw"
                                      height="20.5vw"
                                      viewBox="0 0 90 217"
                                      fill={`${getBackgroundClass(seat)}`}
                                      xmlns="http://www.w3.org/2000/svg"
                                      onClick={() => handleSeatClick(seat)}
                                      className={` cursor-pointer  ${getShadowClass(
                                        seat
                                      )}`}
                                    >
                                      <path
                                        d="M1.30176 209.776V7.28689C1.30176 4.18046 3.82002 1.6622 6.92645 1.6622H45.3618L82.8597 1.66212C85.9662 1.66211 88.4844 4.18038 88.4844 7.28681V209.776C88.4844 212.882 85.9662 215.4 82.8597 215.4H45.3618H6.92645C3.82002 215.4 1.30176 212.882 1.30176 209.776Z"
                                        stroke={` ${getBorderClass(seat)}`}
                                        stroke-width="1.8749"
                                      />
                                      <path
                                        d="M63.5838 180.224H26.2565C22.1334 180.224 18.791 183.566 18.791 187.689C18.791 191.812 22.1334 195.155 26.2565 195.155H63.5838C67.7069 195.155 71.0493 191.812 71.0493 187.689C71.0493 183.566 67.7069 180.224 63.5838 180.224Z"
                                        stroke={` ${getBorderClass(seat)}`}
                                        stroke-width="1.65808"
                                      />
                                    </svg>
                                  </Tooltip>
                                ) : (
                                  <Tooltip
                                    placement="top"
                                    title={
                                      <div className="flex flex-col items-center">
                                        <div className="flex items-center">
                                          <span className="text-[4.5vw] font-semibold">{`${seat.name}`}</span>
                                          <span className="text-[3.5vw] pl-[0.5vw]">{`( ${getStatusText(
                                            seat
                                          )})`}</span>
                                        </div>
                                        <span className="pl-[0.3vw] font-bold text-[4vw]">{`₹${Math.round(
                                          seat?.fare?.totalNetFare
                                        )}`}</span>
                                      </div>
                                    }
                                    color={getColor(seat)}
                                  >
                                    {/* <svg
                                    width="2.5vw"
                                    height="2.5vw"
                                    viewBox="0 0 87 101"
                                    xmlns="http://www.w3.org/2000/svg"
                                    // onClick="green"
                                    fill={`${getBackgroundClass(seat)}`}
                                    onClick={() => handleSeatClick(seat)}
                                    className={` cursor-pointer  ${getShadowClass(
                                      seat
                                    )}`}
                                  >
                                    <path
                                      d="M8.5533 37.5279V18.7798C8.5533 9.46053 16.1081 1.90576 25.4274 1.90576H61.9878C71.3071 1.90576 78.8619 9.46075 78.8619 18.78C78.8619 28.3043 78.8619 37.5275 78.8619 37.5275M78.8619 37.5275L81.6745 37.5277C83.7454 37.5278 85.424 39.2066 85.424 41.2775V93.7748C85.424 96.8812 82.9058 99.3995 79.7994 99.3995H6.67839C3.57196 99.3995 1.05371 96.8812 1.05371 93.7748V41.2777C1.05371 39.2068 2.73255 37.5279 4.8035 37.5279H12.3031C14.374 37.5279 16.0529 39.2068 16.0529 41.2777V82.5254C16.0529 85.6319 18.5711 88.1501 21.6776 88.1501H66.6751C69.7815 88.1501 72.2998 85.6319 72.2998 82.5254V41.2775C72.2998 39.2066 73.9785 37.5278 76.0493 37.5277L78.8619 37.5275Z"
                                      stroke={`${getBorderClass(seat)}`}
                                      strokeWidth="1.8749"
                                    />
                                  </svg> */}
                                    <svg
                                      width="8.5vw"
                                      height="8.5vw"
                                      viewBox="0 0 32 37"
                                      fill={`${getBackgroundClass(seat)}`}
                                      onClick={() => handleSeatClick(seat)}
                                      className={` cursor-pointer  ${getShadowClass(
                                        seat
                                      )}`}
                                      xmlns="http://www.w3.org/2000/svg"
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
                    <div className="border-[0.1vw] border-gray-400 h-[165vw] w-full rounded-[0.5vw] relative bg-white">
                      <p className="text-[3.5vw] absolute top-[2.5vw] left-[11vw] text-center">
                        {"Upper List".toUpperCase()}
                        {`(${upperdeck?.length})`}
                      </p>
                      <div className="grid grid-rows-4 h-full w-full pt-[20vw] py-[1vw]">
                        <div>
                          <div
                            className={`grid grid-flow-col gap-y-[3vw] p-[2vw]`}
                            style={{
                              transform: "rotateY(180deg)",
                            }}
                          >
                            {upperdeck?.map((seat) => (
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
                                    seat.height === 2 ? `span 2` : `auto`,
                                  // transform: "scaleX(-1)",
                                }}
                              >
                                {/* Sleeper or Non-Sleeper Rendering */}
                                {seat.desc.toLowerCase().includes("sleeper") ? (
                                  <Tooltip
                                    placement="top"
                                    title={
                                      <div className="flex flex-col items-center">
                                        <div className="flex items-center">
                                          <span className="text-[4.5vw] font-semibold">{`${seat.name}`}</span>
                                          <span className="text-[3.5vw] pl-[0.5vw]">{`(
                                        ${getStatusText(seat)})`}</span>
                                        </div>
                                        <span className="pl-[0.3vw] font-bold text-[4vw]">{`₹${Math.round(
                                          seat?.fare?.totalNetFare
                                        )}`}</span>
                                      </div>
                                    }
                                    color={getColor(seat)}
                                  >
                                    {console.log(
                                      selectedSeats.map(
                                        (item) => item === seat.name
                                      ),
                                      seat.name,
                                      "testjkhkjhkjhkj"
                                    )}

                                    <svg
                                      width="9.5vw"
                                      height="20.5vw"
                                      viewBox="0 0 90 217"
                                      fill={`${getBackgroundClass(seat)}`}
                                      xmlns="http://www.w3.org/2000/svg"
                                      onClick={() => handleSeatClick(seat)}
                                      className={` cursor-pointer  ${getShadowClass(
                                        seat
                                      )}`}
                                    >
                                      <path
                                        d="M1.30176 209.776V7.28689C1.30176 4.18046 3.82002 1.6622 6.92645 1.6622H45.3618L82.8597 1.66212C85.9662 1.66211 88.4844 4.18038 88.4844 7.28681V209.776C88.4844 212.882 85.9662 215.4 82.8597 215.4H45.3618H6.92645C3.82002 215.4 1.30176 212.882 1.30176 209.776Z"
                                        stroke={` ${getBorderClass(seat)}`}
                                        stroke-width="1.8749"
                                      />
                                      <path
                                        d="M63.5838 180.224H26.2565C22.1334 180.224 18.791 183.566 18.791 187.689C18.791 191.812 22.1334 195.155 26.2565 195.155H63.5838C67.7069 195.155 71.0493 191.812 71.0493 187.689C71.0493 183.566 67.7069 180.224 63.5838 180.224Z"
                                        stroke={` ${getBorderClass(seat)}`}
                                        stroke-width="1.65808"
                                      />
                                    </svg>
                                  </Tooltip>
                                ) : (
                                  <Tooltip
                                    placement="top"
                                    title={
                                      <div className="flex flex-col items-center">
                                        <div className="flex items-center">
                                          <span className="text-[4.5vw] font-semibold">{`${seat.name}`}</span>
                                          <span className="text-[3.5vw] pl-[0.5vw]">{`( ${getStatusText(
                                            seat
                                          )})`}</span>
                                        </div>
                                        <span className="pl-[0.3vw] font-bold text-[4vw]">{`₹${Math.round(
                                          seat?.fare?.totalNetFare
                                        )}`}</span>
                                      </div>
                                    }
                                    color={getColor(seat)}
                                  >
                                    <svg
                                      width="2.5vw"
                                      height="2.5vw"
                                      viewBox="0 0 32 37"
                                      fill={`${getBackgroundClass(seat)}`}
                                      onClick={() => handleSeatClick(seat)}
                                      className={` cursor-pointer  ${getShadowClass(
                                        seat
                                      )}`}
                                      xmlns="http://www.w3.org/2000/svg"
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
                                  </Tooltip>
                                )}
                              </div>
                            ))}
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
          </div>
        </>
      ) : (
        <div className="flex items-center justify-center">
          <Spin
            indicator={
              <LoadingOutlined
                style={{
                  fontSize: "2vw",
                }}
                spin
              />
            }
          />
        </div>
      )}
    </>
  );
}
