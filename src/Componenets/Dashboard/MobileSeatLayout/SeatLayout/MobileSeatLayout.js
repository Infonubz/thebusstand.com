import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { Skeleton, Spin, Tooltip } from "antd";
import { toast } from "react-toastify";
import { RiSteering2Fill } from "react-icons/ri";
import { LoadingOutlined } from "@ant-design/icons";
import { calculateDiscountedFare } from "../../../Common/Common-Functions/TBS-Discount-Fare";
import { Abhibus_SeatLayout } from "../../../../Api-Abhibus/Dashboard/DashboardPage";

export default function MobileSeatLayout({
  item,
  selectedSeats,
  setSelectedSeats,
  setSelectedSeatsPrice,
  selectedseatprice,
  setSeatDetails,
  seatHighlight,
  layout,
  setLayout
}) {
  const tbs_discount = useSelector((state) => state?.live_per);


  const LuxuryFind = (type) =>
    type?.toLowerCase()?.includes("volvo") ||
    type?.toLowerCase()?.includes("mercedes benz") ||
    type?.toLowerCase()?.includes("washroom") ||
    type?.toLowerCase()?.includes("bharatBenz") ||
    type?.toLowerCase()?.includes("luxury");


  const getseats = useSelector((state) => state.seat_layout);
  const allprice = getseats?.seats_id_layout
    ?.map((items) => {
      return Math.round(items?.fare?.totalNetFare);
    })
    .sort((a, b) => a - b);
  const [layoutloading, setLayoutLoading] = useState(true);
  const dispatch = useDispatch();
  //   useEffect(() => {
  //     // setInterval(() => {
  //     GetSeatLayout(item.bus_id, dispatch, setLayoutLoading);
  //     // }, 1000);
  //   }, [item.bus_id, dispatch]);

  const uniqueprice = [...new Set(allprice)];

  const lowerdeck = getseats?.seats_id_layout?.filter((item) => {

    return item.z === 0;
  });

  const upperdeck = getseats?.seats_id_layout?.filter((item) => {

    return item.z === 1;
  });

  const lowerdeckc = lowerdeck?.map((item) => {

    return item.y;
  });
  const upperdeckc = upperdeck?.map((item) => {

    return item.y;
  });

  const lowerdeckrow = Math.max(lowerdeck?.map((item) => item.x));
  const lowerdeckcol = lowerdeckc?.length > 0 ? Math.max(...lowerdeckc) : [];
  const upperdeckrow = Math.max(upperdeck?.map((item) => item.x));
  const upperdeckcol = upperdeckc?.length > 0 ? Math.max(...upperdeckc) : [];
  console.log(lowerdeckrow, upperdeckrow, "lowerdeckrowlowerdeckrow");
  console.log(lowerdeckcol, "lowerdeckcol", upperdeckcol, "upperdeckcol");

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


  const getBorderClass = (seat) => {
    if (seat?.isBooked === true && seat.gender === "M") {
      return "#0088D3";
    }
    if (seat?.isBooked === false && seat.gender === "F") {
      return "#FF00D5";
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
      return "#CCF6FF";
    } else if (seat?.gender === "F" && seat?.isBooked === true) {
      return "#FFE9FE";
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
  // const [busType, setBusType] = useState(
  //   JSON.parse(sessionStorage.getItem("isLuxury"))
  // );

  // ------------------------------AbhibusSeatLayout------------------------------

  // const [layout, setLayout] = useState()

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


  const fetchSeatLayout = async () => {
    setLayoutLoading(true);
    try {
      const data = await Abhibus_SeatLayout(item, dispatch);
      setLayoutLoading(false);
      setLayout(data?.seatlayout);
    } catch (error) {
      console.error("Error fetching seat layout data", error);
    }
  };

  useEffect(() => {
    fetchSeatLayout();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {layoutloading === false ? (
        <>
          <div className={`md:col-span-3 col-span-6 h-full w-full`}>
            <div
              className={`${lowerDeckSeats?.length > 0 && upperDeckSeats?.length > 0
                ? "grid grid-cols-2 px-[2vw]"
                : "grid grid-cols-1 px-[20vw]"
                }  w-full  gap-[1.5vw]`}
            >
              <div className={`col-span-1 h-full w-full py-[1vw]`}>
                <div
                  className={`border-[0.1vw] border-gray-400  w-full rounded-[0.5vw] relative bg-white`}
                  style={{
                    height: `${Number(layout?.lowerTotalColumns) * 13
                      }vw`,
                  }}
                >
                  <p className="text-[3.5vw] absolute top-[0.5vw] left-[6vw] text-center">
                    {"Lower List".toUpperCase()}
                    {`(${lowerDeckSeats?.length})`}
                  </p>
                  <span className="absolute top-[1vw] right-[1vw]">
                    <RiSteering2Fill size={"6vw"} />
                  </span>
                  <div
                    className={` border-l-[0.2vw] ${LuxuryFind(item?.Bus_Type_Name) === true
                      ? "border-[#FFEEC9]"
                      : "border-[#EEEDED]"
                      }  absolute left-[-0.15vw] top-[10vw] h-[8vw]`}
                  ></div>
                  <div
                    className={`border-r-[0.1vw] border-t-[0.1vw] border-b-[0.1vw] ${LuxuryFind(item?.Bus_Type_Name) === true
                      ? "bg-[#FFEEC9]"
                      : "bg-[#EEEDED]"
                      } border-gray-400 h-[8vw] left-[-0.05vw] w-[8vw] top-[10vw] absolute`}
                  ></div>
                  <div
                    className="grid grid-rows-6 h-full w-full gap-[1vw] pt-[20vw] py-[1vw]"
                    style={{ userSelect: "none" }}
                  >
                    <div>
                      <div>
                        <div
                          className={`grid grid-flow-col gap-y-[1.5vw]`}
                          style={{
                            transform: "rotateY(180deg)",
                          }}
                        >
                          {lowerDeckSeats?.map((seat, index) =>
                            seat?.type === "SS" ? (
                              // <Flex align="center">

                              <div
                                key={index}
                                className="relative items-center justify-center flex"
                                style={{
                                  gridRow: seat.row,
                                  gridColumn: seat.column,
                                }}
                              >
                                {" "}
                                <div className="absolute top-[0.8vw] right-[58%]">
                                  {seatHighlight(seat)}
                                </div>
                                <Tooltip
                                  placement="top"
                                  title={
                                    <div className="flex items-center gap-x-[1vw] justify-between">
                                      <span className="text-[3.5vw] font-semibold text-white">{`${seat.seatNumber}`}</span>
                                      <span className=" font-bold text-[3.5vw] text-white">
                                        {calculateDiscountedFare(
                                          item?.BUS_START_DATE,
                                          seat?.price,
                                          tbs_discount
                                        )}
                                      </span>
                                    </div>
                                  }
                                  color={getColor(seat)}
                                >
                                  <svg
                                    width="9vw"
                                    height="9vw"
                                    viewBox="0 0 34 39"
                                    fill={`${getBackgroundClass(seat)}`}
                                    // fill="#D8D8D8"
                                    onClick={() => handleSeatClick(seat)}
                                    className={` cursor-pointer`}
                                  // ${getShadowClass(seat)}
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
                                </Tooltip>
                              </div>
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
                                <div className="absolute top-[0.8vw] right-[4vw]">
                                  {seatHighlight(seat)}
                                </div>
                                <Tooltip
                                  placement="top"
                                  title={
                                    <div className="flex items-center gap-x-[1vw] justify-between">
                                      <span className="text-[3.5vw] font-semibold text-white">{`${seat.seatNumber}`}</span>
                                      <span className=" font-bold text-[3.5vw] text-white">
                                        {" "}
                                        {calculateDiscountedFare(
                                          item?.BUS_START_DATE,
                                          seat?.price,
                                          tbs_discount
                                        )}
                                      </span>
                                    </div>
                                  }
                                  color={getColor(seat)}
                                >
                                  <svg
                                    width="8.5vw"
                                    height="16w"
                                    viewBox="0 0 94 221"
                                    fill={getBackgroundClass(seat)}
                                    xmlns="http://www.w3.org/2000/svg"
                                    onClick={() => handleSeatClick(seat)}
                                    className="cursor-pointer"
                                    style={{ userSelect: "none" }}
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
                                </Tooltip>
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
                      height: `${Number(layout?.upperTotalColumns) * 13
                        }vw`,
                    }}
                  >
                    <p className="text-[3.5vw] absolute top-[0.5vw] left-[6vw] text-center">
                      {"Upper List".toUpperCase()}
                      {`(${upperDeckSeats?.length})`}
                    </p>
                    <div
                      className="grid grid-rows-4 h-full w-full pt-[20vw] py-[1vw]"
                      style={{ userSelect: "none" }}
                    >
                      <div>
                        <div
                          className={`grid grid-flow-col gap-y-[1.5vw] mt-[0.5vw]`}
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
                                <div className="absolute top-[0.8vw] right-[1.23vw]">
                                  {seatHighlight(seat)}
                                </div>
                                <Tooltip
                                  placement="top"
                                  title={
                                    <div className="flex items-center gap-x-[1vw] justify-between">
                                      <span className="text-[3.5vw] font-semibold text-white">{`${seat.seatNumber}`}</span>
                                      <span className=" font-bold text-[3.5vw] text-white">
                                        {" "}
                                        {calculateDiscountedFare(
                                          item?.BUS_START_DATE,
                                          seat?.price,
                                          tbs_discount
                                        )}
                                      </span>
                                    </div>
                                  }
                                  color={getColor(seat)}
                                >
                                  <svg
                                    width="9vw"
                                    height="9vw"
                                    viewBox="0 0 34 39"
                                    fill={`${getBackgroundClass(seat)}`}
                                    // fill="#D8D8D8"
                                    onClick={() => handleSeatClick(seat)}
                                    className={` cursor-pointer`}
                                  // ${getShadowClass(seat)}
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
                                </Tooltip>
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
                                <div className="absolute top-[0.8vw] right-[5vw]">
                                  {seatHighlight(seat)}
                                </div>
                                <Tooltip
                                  placement="top"
                                  title={
                                    <div className="flex items-center gap-x-[1vw] justify-between">
                                      <span className="text-[3.5vw] font-semibold text-white">{`${seat.seatNumber}`}</span>
                                      <span className=" font-bold text-[3.5vw] text-white">
                                        {" "}
                                        {calculateDiscountedFare(
                                          item?.BUS_START_DATE,
                                          seat?.price,
                                          tbs_discount
                                        )}
                                      </span>
                                    </div>
                                  }
                                  color={getColor(seat)}
                                >
                                  <svg
                                    width="14.5vw"
                                    height="20vw"
                                    viewBox="0 0 94 221"
                                    fill={getBackgroundClass(seat)}
                                    xmlns="http://www.w3.org/2000/svg"
                                    onClick={() => handleSeatClick(seat)}
                                    className="cursor-pointer"
                                    style={{ userSelect: "none" }}
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
                                </Tooltip>
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
        </>
      ) : (
        <div className="flex items-center justify-center">
          <Skeleton
            loading={layoutloading}
            active
            style={{ margin: "0.5vw", padding: "0.5vw" }}
            paragraph={{ rows: 4 }}
            avatar
          ></Skeleton>
        </div>
      )}
    </>
  );
}
