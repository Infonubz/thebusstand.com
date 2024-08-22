import React, { useEffect, useState } from "react";
import sleeper from "../../../assets/s_sleeper.png";
import { RiSteering2Fill } from "react-icons/ri";
import dayjs from "dayjs";
import { HiCheckCircle } from "react-icons/hi";
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
import { Popover, Tooltip } from "antd";
import { IoIosInformationCircleOutline } from "react-icons/io";
import unisex_sel from "../../../assets/unisex_sel.png";
import unisex_se from "../../../assets/unisex_se.png";
import unisex_se_sel from "../../../assets/unisex_se_sel.png";
import unisex_book from "../../../assets/unisex_se_book.png";
import DrawerDetails from "../Drawer";
import ManualDrawer from "../ManualDrawer";
import { toast } from "react-toastify";
import platformTheme from "../PlatformTheme";
import tinycolor from "tinycolor2";

function SemiSleeper({ busdetails, seatplatform, type, busprice, imageurl }) {
  const upperseatlist = [
    {
      rowlist: [
        {
          id: "U1",
          seattype: sleeper,
          rate: 650,
          gender: "unisex",
          status: "available",
          berth: "upper",
        },
        {
          id: "U2",
          seattype: women_sl_book,
          rate: 650,
          gender: "women",
          status: "booked",
          berth: "upper",
        },
        {
          id: "U3",
          seattype: women_sl,
          rate: 650,
          gender: "women",
          status: "available",
          berth: "upper",
        },
      ],
    },
    {
      rowlist: [
        {
          id: "U4",
          seattype: sleeper,
          rate: 650,
          gender: "unisex",
          status: "available",
          berth: "upper",
        },
        {
          id: "U5",
          seattype: women_sl,
          rate: 650,
          gender: "women",
          status: "available",
          berth: "upper",
        },
        {
          id: "U6",
          seattype: women_sl_book,
          rate: 650,
          gender: "unisex",
          status: "booked",
          berth: "upper",
        },
      ],
    },
    {
      rowlist: [
        {
          id: "U7",
          seattype: men_sl,
          rate: 650,
          gender: "men",
          status: "available",
          berth: "upper",
        },
        {
          id: "U8",
          seattype: sleeper,
          rate: 650,
          gender: "unisex",
          status: "available",
          berth: "upper",
        },
        {
          id: "U9",
          seattype: sleeper,
          rate: 650,
          gender: "unisex",
          status: "available",
          berth: "upper",
        },
      ],
    },
    {
      rowlist: [
        {
          id: "U10",
          seattype: men_sl,
          rate: 650,
          gender: "men",
          status: "available",
          berth: "upper",
        },
        {
          id: "U11",
          seattype: sleeper,
          rate: 650,
          gender: "unisex",
          status: "available",
          berth: "upper",
        },
        {
          id: "U12",
          seattype: sleeper,
          rate: 650,
          gender: "unisex",
          status: "available",
          berth: "upper",
        },
      ],
    },
    {
      rowlist: [
        {
          id: "U13",
          seattype: sleeper,
          rate: 650,
          gender: "unisex",
          status: "available",
          berth: "upper",
        },
        {
          id: "U14",
          seattype: men_sl_book,
          rate: 650,
          gender: "men",
          status: "booked",
          berth: "upper",
        },
        {
          id: "U15",
          seattype: women_sl_book,
          rate: 650,
          gender: "women",
          status: "booked",
          berth: "upper",
        },
      ],
    },
    {
      rowlist: [
        {
          id: "U16",
          seattype: sleeper,
          rate: 650,
          gender: "unisex",
          status: "available",
          berth: "upper",
        },
        {
          id: "U17",
          seattype: sleeper,
          rate: 650,
          gender: "unisex",
          status: "available",
          berth: "upper",
        },
        {
          id: "U18",
          seattype: sleeper,
          rate: 650,
          gender: "unisex",
          status: "available",
          berth: "upper",
        },
      ],
    },
  ];
  const lowerlist = [
    {
      id: "SL1",
      seattype: sleeper,
      rate: 650,
      gender: "unisex",
      status: "available",
      berth: "lower",
    },
    {
      id: "SL2",
      seattype: sleeper,
      rate: 650,
      gender: "unisex",
      status: "available",
      berth: "lower",
    },
    {
      id: "SL3",
      seattype: sleeper,
      rate: 650,
      gender: "unisex",
      status: "available",
      berth: "lower",
    },
    {
      id: "SL4",
      seattype: sleeper,
      rate: 650,
      gender: "unisex",
      status: "available",
      berth: "lower",
    },
    {
      id: "SL5",
      seattype: sleeper,
      rate: 650,
      gender: "unisex",
      status: "available",
      berth: "lower",
    },
    {
      id: "SL6",
      seattype: sleeper,
      rate: 650,
      gender: "unisex",
      status: "available",
      berth: "lower",
    },
  ];
  const seatlist = [
    {
      id: "L1",
      seattype: unisex_se,
      rate: 650,
      gender: "unisex",
      status: "available",
      berth: "lower",
    },
    {
      id: "L2",
      seattype: unisex_se,
      rate: 650,
      gender: "unisex",
      status: "available",
      berth: "lower",
    },
    {
      id: "L3",
      seattype: women_se,
      rate: 650,
      gender: "women",
      status: "available",
      berth: "lower",
    },
    {
      id: "L4",
      seattype: women_se,
      rate: 650,
      gender: "women",
      status: "available",
      berth: "lower",
    },
    ,
    {
      id: "L5",
      seattype: unisex_se,
      rate: 650,
      gender: "unisex",
      status: "available",
      berth: "lower",
    },
    {
      id: "L6",
      seattype: unisex_se,
      rate: 650,
      gender: "unisex",
      status: "available",
      berth: "lower",
    },
    {
      id: "L7",
      seattype: women_se,
      rate: 650,
      gender: "women",
      status: "available",
      berth: "lower",
    },
    {
      id: "L8",
      seattype: women_se,
      rate: 650,
      gender: "women",
      status: "available",
      berth: "lower",
    },

    {
      id: "L9",
      seattype: unisex_se,
      rate: 650,
      gender: "unisex",
      status: "available",
      berth: "lower",
    },
    {
      id: "L10",
      seattype: unisex_se,
      rate: 650,
      gender: "unisex",
      status: "available",
      berth: "lower",
    },
    {
      id: "L11",
      seattype: unisex_se,
      rate: 650,
      gender: "unisex",
      status: "available",
      berth: "lower",
    },
    {
      id: "L12",
      seattype: unisex_se,
      rate: 650,
      gender: "unisex",
      status: "available",
      berth: "lower",
    },

    {
      id: "L13",
      seattype: men_se,
      rate: 650,
      gender: "men",
      status: "available",
      berth: "lower",
    },
    {
      id: "L14",
      seattype: men_se,
      rate: 650,
      gender: "men",
      status: "available",
      berth: "lower",
    },
    {
      id: "L15",
      seattype: unisex_se,
      rate: 650,
      gender: "unisex",
      status: "available",
      berth: "lower",
    },
    {
      id: "L16",
      seattype: unisex_se,
      rate: 650,
      gender: "unisex",
      status: "available",
      berth: "lower",
    },

    {
      id: "L17",
      seattype: unisex_book,
      rate: 650,
      gender: "unisex",
      status: "booked",
      berth: "lower",
    },
    {
      id: "L18",
      seattype: unisex_book,
      rate: 650,
      gender: "unisex",
      status: "booked",
      berth: "lower",
    },
  ];
  const [updatedDepartures, setUpdatedDepartures] = useState([]);
  const [updatedarrival, setUpdatedArrival] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [modalshow, setShowModal] = useState(false);
  const [selectedRoutes, setSelectedRoutes] = useState({
    dep_route: busdetails?.Pickup_points.split(",")[0],
    arri_route: busdetails?.Drop_points.split(",")[0],
    dep_time: busdetails?.Bus_Depature_time,
    arr_time: busdetails?.Bus_Arrival_time,
  });
  const pickuppoint = busdetails?.Pickup_points.split(",");
  const droppoint = busdetails?.Drop_points.split(",");
  const totalFare = selectedSeats.length * busprice.discount;
  const colorcode = platformTheme(seatplatform);
  const baseColor = tinycolor(colorcode);
  const lightColor = baseColor.lighten(41).toString(); 

  const content = (
    <div>
      <div className="grid grid-cols-2 gap-[2vw]">
        <div className="col-span-1">
          <p className="text-[1vw] font-bold">Fare</p>
        </div>
        <div className="col-span-1">
          <p>{`₹${busprice.discount * selectedSeats.length}`}</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-[2vw]">
        <div className="col-span-1">
          <p className="text-[1vw] font-bold">Base Fare</p>
        </div>
        <div className="col-span-1">
          <p>{`₹${busprice.price * selectedSeats.length}`}</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-[2vw]">
        <div className="col-span-1">
          <p className="text-[1vw] font-bold">Discount</p>
        </div>
        <div className="col-span-1">
          <p>{`₹${
            (busprice.price - busprice.discount) * selectedSeats.length
          }`}</p>
        </div>
      </div>
    </div>
  );
  const handleSeatClick = (seat) => {
    if (seat.status === "booked") return;

    setSelectedSeats((prevSelectedSeats) => {
      if (prevSelectedSeats.includes(seat.id)) {
        return prevSelectedSeats.filter(
          (selectedSeat) => selectedSeat !== seat.id
        );
      } else {
        if (prevSelectedSeats.length < 1) {
          return [...prevSelectedSeats, seat.id];
        } else {
          // alert("You can only book a maximum of 2 seats.");
          toast.warning("You can book only one seat.");
          return prevSelectedSeats;
        }
      }
    });
  };
  const handleClick = () => {
    // Only toggle the modal if it's not already open
    // if (!modalshow) {
    //   setShowModal(true);
    // }
    setShowModal(true);
  };


  const addTenMinutes = (timeStr, index) => {
    const [hours, minutes] = timeStr.split(":").map(Number);
    const totalMinutes = hours * 60 + minutes + index * 10;
    const newHours = Math.floor(totalMinutes / 60);
    const newMinutes = totalMinutes % 60;
    return `${newHours.toString().padStart(2, "0")}:${newMinutes
      .toString()
      .padStart(2, "0")}`;
  };

  useEffect(() => {
    const pickupPoints = busdetails?.Pickup_points.split(",");
    const updatedDepartures = pickupPoints?.map((pickup, index) => {
      const time = addTenMinutes(busdetails.Bus_Depature_time, index);
      return { pickup, time };
    });

    setUpdatedDepartures(updatedDepartures);
    const dropPoints = busdetails?.Pickup_points.split(",");
    const updatedarrival = dropPoints?.map((pickup, index) => {
      const time = addTenMinutes(busdetails.Bus_Arrival_time, index);
      return { pickup, time };
    });

    setUpdatedArrival(updatedarrival);
  }, [busdetails]); 

  return (
    <div className="px-[0.5vw]">
      <div
        className="pt-[2vw] bg-[#EEEDED] border-x-[0.1vw] border-b-[0.1vw] rounded-b-[0.5vw]"
        style={{
          // boxShadow: "0 0 10px 5px #3498db",
          borderColor: colorcode.theme,
        }}
      >
        <div className="bg-[#EEEDED] rounded-b-[0.5vw]">
          <div className="grid grid-cols-2 h-[45vw] w-full  ">
            <div className="col-span-1 h-full w-full">
              <div className="grid grid-cols-2 h-full w-full px-[6vw] gap-[1.5vw]">
                <div className="col-span-1 h-full w-full py-[1vw]">
                  <div className="border-[0.1vw] border-gray-400 h-full w-full rounded-[0.5vw] relative  bg-white">
                    <p className="text-[1vw] absolute top-[-1.5vw] left-[3vw] text-center">
                      {"Lower List".toUpperCase()}
                      {"(24)"}
                    </p>
                    <span className="absolute top-[1vw] right-[1vw]">
                      <RiSteering2Fill size={"2vw"} />
                    </span>
                    <div className="border-l-[0.2vw] border-[#EEEDED] absolute left-[-0.15vw] top-[3vw] h-[3vw]"></div>
                    <div className="border-r-[0.1vw] border-t-[0.1vw] border-b-[0.1vw] bg-[#EEEDED] border-gray-400 h-[3vw] left-[-0.05vw] w-[3vw] top-[3vw] absolute"></div>
                    {/* <div className="grid grid-rows-6 h-full w-full pt-[6vw] py-[1vw]"> */}
                    {/* {lowerseatlist.map((item, rowIndex) => (
                    <div className="row-span-1 pt-[0.5vw]" key={rowIndex}>
                      <div className="grid grid-cols-4">
                        {item.rowlist.map((bus, index) => (
                          <React.Fragment key={index}>
                            {index === 1 && <div className="col-span-1"></div>}
                            <Tooltip
                              title={
                                <div className="flex">
                                  <span className="text-[1vw]">{`${bus.id}`}</span>
                                  <span className="pl-[0.3vw] font-bold text-[1.1vw]">{`₹${busprice.discount}`}</span>
                                </div>
                              }
                              color={
                                bus.gender === "women" &&
                                bus.status === "available"
                                  ? "pink"
                                  : bus.gender === "men" &&
                                    bus.status === "available"
                                  ? "blue"
                                  : bus.gender === "unisex" &&
                                    bus.status === "available"
                                  ? "#4caf50"
                                  : "gray"
                              }
                            >
                              <div
                                className={`col-span-1 flex flex-col justify-center items-center ${
                                  bus.status === "booked"
                                    ? "cursor-not-allowed"
                                    : "cursor-pointer"
                                } `}
                                onClick={() => handleSeatClick(bus)}
                              >
                                <img
                                  src={
                                    bus.status === "available"
                                      ? selectedSeats.includes(bus.id)
                                        ? bus.gender === "men"
                                          ? men_sl_sel
                                          : bus.gender === "women"
                                          ? women_sl_sel
                                          : unisex_sel
                                        : bus.seattype
                                      : bus.seattype
                                  }
                                  className="h-[4vw] w-[2vw]"
                                  alt="seat type"
                                />
                                <p className="text-[0.8vw]">{`₹ ${busprice.discount}`}</p>
                              </div>
                            </Tooltip>
                          </React.Fragment>
                        ))}
                      </div>
                    </div>
                  ))} */}
                    <div className="grid grid-cols-4 h-full w-full pt-[6vw] py-[1vw]">
                      <div className="col-span-1 h-full w-full">
                        <div className="grid grid-rows-6 h-full w-full">
                          {lowerlist.map((bus) => (
                            <Tooltip
                              title={
                                <div className="flex">
                                  <span className="text-[1vw]">{`${bus.id}`}</span>
                                  <span className="pl-[0.3vw] font-bold text-[1.1vw]">{`₹${busprice.discount}`}</span>
                                </div>
                              }
                              color={
                                bus.gender === "women" &&
                                bus.status === "available"
                                  ? "#FF26E5"
                                  : bus.gender === "men" &&
                                    bus.status === "available"
                                  ? "#0099F2"
                                  : bus.gender === "unisex" &&
                                    bus.status === "available"
                                  ? "#4caf50"
                                  : "gray"
                              }
                            >
                              <div
                                className={`row-span-1 flex flex-col justify-center items-center ${
                                  bus.status === "booked"
                                    ? "cursor-not-allowed"
                                    : "cursor-pointer"
                                } `}
                                onClick={() => handleSeatClick(bus)}
                              >
                                <img
                                  src={
                                    bus.status === "available"
                                      ? selectedSeats.includes(bus.id)
                                        ? bus.gender === "men"
                                          ? men_sl_sel
                                          : bus.gender === "women"
                                          ? women_sl_sel
                                          : unisex_sel
                                        : bus.seattype
                                      : bus.seattype
                                  }
                                  className="h-[4vw] w-[2vw]"
                                  alt="seat type"
                                />
                                <p className="text-[0.8vw]">{`₹ ${busprice.discount}`}</p>
                              </div>
                            </Tooltip>
                          ))}
                        </div>
                      </div>
                      <div className="col-span-1"></div>
                      <div className="col-span-2">
                        <div className="grid grid-cols-2 flex-row h-full w-full">
                          {seatlist.map((bus) => (
                            <Tooltip
                              title={
                                <div className="flex">
                                  <span className="text-[1vw]">{`${bus.id}`}</span>
                                  <span className="pl-[0.3vw] font-bold text-[1.1vw]">{`₹${busprice.discount}`}</span>
                                </div>
                              }
                              color={
                                bus.gender === "women" &&
                                bus.status === "available"
                                  ? "#FF26E5"
                                  : bus.gender === "men" &&
                                    bus.status === "available"
                                  ? "#0099F2"
                                  : bus.gender === "unisex" &&
                                    bus.status === "available"
                                  ? "#4caf50"
                                  : "gray"
                              }
                            >
                              <div
                                className={` flex flex-col justify-center items-center ${
                                  bus.status === "booked"
                                    ? "cursor-not-allowed"
                                    : "cursor-pointer"
                                } `}
                                onClick={() => handleSeatClick(bus)}
                              >
                                <img
                                  src={
                                    bus.status === "available"
                                      ? selectedSeats.includes(bus.id)
                                        ? bus.gender === "men"
                                          ? men_se_sel
                                          : bus.gender === "women"
                                          ? women_se_sel
                                          : unisex_se_sel
                                        : bus.seattype
                                      : bus.seattype
                                  }
                                  className="h-[2vw] w-[2vw]"
                                  alt="seat type"
                                />
                                <p className="text-[0.8vw]">{`₹ ${busprice.discount}`}</p>
                              </div>
                            </Tooltip>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* upper */}
                <div className="col-span-1 h-full w-full py-[1vw]">
                  <div className="border-[0.1vw] border-gray-400 h-full w-full rounded-[0.5vw] relative bg-white">
                    <p className="text-[1vw] absolute top-[-1.5vw] left-[3vw] text-center">
                      {"Upper List".toUpperCase()}
                      {"(21)"}
                    </p>
                    <div className="grid grid-rows-6 h-full w-full pt-[6vw] py-[1vw]">
                      {upperseatlist.map((item, rowIndex) => (
                        <div className="row-span-1 pt-[0.5vw]" key={rowIndex}>
                          <div className="grid grid-cols-4">
                            {item.rowlist.map((bus, index) => (
                              <React.Fragment key={index}>
                                {index === 1 && (
                                  <div className="col-span-1"></div>
                                )}
                                <Tooltip
                                  title={
                                    <div className="flex">
                                      <span className="text-[1vw]">{`${bus.id}`}</span>
                                      <span className="pl-[0.3vw] font-bold text-[1.1vw]">{`₹${busprice.discount}`}</span>
                                    </div>
                                  }
                                  color={
                                    bus.gender === "women" &&
                                    bus.status === "available"
                                      ? "#FF26E5"
                                      : bus.gender === "men" &&
                                        bus.status === "available"
                                      ? "#0099F2"
                                      : bus.gender === "unisex" &&
                                        bus.status === "available"
                                      ? "#4caf50"
                                      : "gray"
                                  }
                                >
                                  <div
                                    className={`col-span-1 flex flex-col justify-center items-center ${
                                      bus.status === "booked"
                                        ? "cursor-not-allowed"
                                        : "cursor-pointer"
                                    } `}
                                    onClick={() => handleSeatClick(bus)}
                                  >
                                    <img
                                      src={
                                        bus.status === "available"
                                          ? selectedSeats.includes(bus.id)
                                            ? bus.gender === "men"
                                              ? men_sl_sel
                                              : bus.gender === "women"
                                              ? women_sl_sel
                                              : unisex_sel
                                            : bus.seattype
                                          : bus.seattype
                                      }
                                      className="h-[4vw] w-[2vw]"
                                      alt="seat type"
                                    />
                                    <p className="text-[0.8vw]">{`₹ ${busprice.discount}`}</p>
                                  </div>
                                </Tooltip>
                              </React.Fragment>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-1 h-[45vw] w-full ">
              <div className="grid grid-cols-2 w-full h-[33vw] px-[2vw] py-[1vw] gap-[1.5vw]">
                <div className="col-span-1 border-[0.1vw] border-gray-400 w-full h-[33vw] rounded-[0.5vw] bg-white">
                  <p
                    className="text-center py-[0.5vw]  text-white rounded-tl-[0.45vw] rounded-tr-[0.45vw] text-[1.2vw]"
                    style={{
                      backgroundColor: colorcode.theme,
                    }}
                  >
                    PICKUP POINT
                  </p>
                  <div className="max-h-[29vw] overflow-y-auto new-scrollbar">
                    {" "}
                    {busdetails?.Pickup_points.split(",").map((item, index) => (
                      <div
                        key={index}
                        className={`${
                          selectedRoutes?.dep_route == item
                            ? "bg-[#E5FFF1]"
                            : "bg-white hover:bg-gray-200"
                        } flex flex-col py-[0.5vw] px-[1vw]  cursor-pointer relative`}
                        onClick={() =>
                          setSelectedRoutes({
                            ...selectedRoutes,
                            dep_route: item,
                            dep_time: updatedDepartures[index]?.time,
                          })
                        }
                        style={{
                          backgroundColor:
                            selectedRoutes?.dep_route == item
                              ? colorcode.color
                              : "white",
                        }}
                      >
                        {selectedRoutes?.dep_route == item ? (
                          <span className="absolute right-[1vw] top-[0.8vw]">
                            <HiCheckCircle
                              size={"1.2vw"}
                              color={colorcode.theme}
                            />
                          </span>
                        ) : (
                          ""
                        )}

                        <p className=" flex items-center">
                          <span className="text-[1vw] pr-[1vw]">
                            {updatedDepartures[index]?.time}
                          </span>
                          <span className="text-[0.8vw] ">
                            {`(${dayjs(busdetails.Bus_depature_date).format(
                              "DD MMM"
                            )})`}
                          </span>
                        </p>
                        <p className="text-[1.1vw] font-bold">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="col-span-1 border-[0.1vw] bg-white border-gray-400 w-full h-[33vw] rounded-[0.5vw]">
                  <p
                    className="text-center py-[0.5vw]  text-white rounded-tl-[0.45vw] rounded-tr-[0.45vw] text-[1.2vw]"
                    style={{
                      backgroundColor: colorcode.theme,
                    }}
                  >
                    DROP POINT
                  </p>
                  <div className="max-h-[29vw] overflow-y-auto new-scrollbar">
                    {" "}
                    {/* Set max height and enable vertical scroll */}
                    {busdetails?.Drop_points.split(",").map((item, index) => (
                      <div
                        key={index}
                        className={`${
                          selectedRoutes.arri_route == item
                            ? "bg-[#E5FFF1]"
                            : "bg-white hover:bg-gray-200"
                        } flex flex-col py-[0.5vw] px-[1vw]  cursor-pointer relative`}
                        onClick={() =>
                          setSelectedRoutes({
                            ...selectedRoutes,
                            arri_route: item,
                            arr_time: updatedarrival[index]?.time,
                          })
                        }
                        style={{
                          backgroundColor:
                            selectedRoutes?.arri_route == item
                              ? colorcode.color
                              : "white",
                        }}
                      >
                        {selectedRoutes.arri_route == item ? (
                          <span className="absolute right-[1vw] top-[0.8vw]">
                            <HiCheckCircle
                              size={"1.2vw"}
                              color={colorcode.theme}
                            />
                          </span>
                        ) : (
                          ""
                        )}
                        <p className=" flex items-center">
                          <span className="text-[1vw] pr-[1vw]">
                            {updatedarrival[index]?.time}
                          </span>
                          <span className="text-[0.8vw] ">
                            {`(${dayjs(busdetails.Bus_arrival_date).format(
                              "DD MMM"
                            )})`}
                          </span>
                        </p>
                        <p className="text-[1.1vw] font-bold">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              {/* <div className="w-full h-[10vw] px-[2vw] flex flex-col">
            <p className="text-center bg-[#1F487C] text-white py-[0.5vw] text-[1vw] rounded-t-[0.5vw]">
              {"seat details".toUpperCase()}
            </p>
            <div className="grid grid-cols-2 py-[0.5vw] px-[1vw]">
              <div className="col-span-1">
                <p className="text-[1.2vw]">Seats:</p>
                {selectedSeats.map((seat, index) => (
                  <p key={index} className="text-[1.2vw]">
                    {seat}
                  </p>
                ))}
              </div>
              <div className="col-span-1">
                <p className="text-[1.2vw]">Total Fare:</p>
                <p className="text-[1.2vw]">{`₹${totalFare}`}</p>
              </div>
            </div>
            <button className="bg-[#E7A356] w-full py-[0.5vw] rounded-b-[0.5vw] text-[1.2vw] font-bold">
              Proceed to Book
            </button>
          </div> */}
              <div className="h-[11vw] w-full  px-[2vw] py-[1vw] ">
                <div className="border-[0.1vw] border-gray-400 w-full h-full mt-[1vw] rounded-[0.5vw] bg-white">
                  <div className="grid grid-rows-2 h-full w-full">
                    <div className="row-span-1 px-[1vw] pt-[1vw]">
                      <div className="flex justify-between">
                        <div className="flex flex-col">
                          <p className="text-[1.1vw] font-bold">
                            Selected Seats
                          </p>
                          {/* <p className="text-[1vw]">11</p> */}
                          <div className="flex flex-row flex-wrap">
                            {selectedSeats.length > 0 ? (
                              selectedSeats.map((seat, index) => (
                                <p
                                  key={index}
                                  className="text-[1vw] mr-[0.4vw]"
                                >
                                  {seat}
                                  {index < selectedSeats.length - 1 && ","}
                                </p>
                              ))
                            ) : (
                              <p className="text-[1vw] mr-[0.4vw]">
                                No Seat Selected
                              </p>
                            )}
                          </div>
                        </div>
                        {selectedSeats.length > 0 ? (
                          <div className="flex flex-col">
                            <p className="float-end text-[1.3vw] font-bold">{`₹${totalFare}`}</p>

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
                          selectedSeats.length > 0
                            ? "bg-[#1F487C] cursor-pointer"
                            : "bg-gray-400 cursor-not-allowed"
                        } rounded-[0.5vw] text-white font-bold text-[1.3vw] `}
                        disabled={selectedSeats.length > 0 ? false : true}
                        // onClick={() => setShowModal(!modalshow)}
                        style={{
                          backgroundColor:
                            selectedSeats.length > 0
                              ? colorcode.btn
                              : "#9CA3AF",
                        }}
                        onClick={handleClick}
                      >
                        Continue
                      </button>
                      {/* {modalshow && (
                    <ManualDrawer isOpen={modalshow} onClose={toggleDrawer} />
                  )} */}
                      <DrawerDetails
                        modalshow={modalshow}
                        setShowModal={setShowModal}
                        selectedSeats={selectedSeats}
                        selectedRoutes={selectedRoutes}
                        busdetails={busdetails}
                        seatplatform={seatplatform}
                        type={type}
                        busprice={busprice}
                        imageurl={imageurl}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SemiSleeper;
