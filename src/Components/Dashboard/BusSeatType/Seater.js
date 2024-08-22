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
import unisex_book from "../../../assets/unisex_se_book.png";
import unisex_sel from "../../../assets/unisex_sel.png";
import unisex_se from "../../../assets/seats.png";
import unisex_se_sel from "../../../assets/unisex_se_sel.png";
import { Popover, Tooltip } from "antd";
import { IoIosInformationCircleOutline } from "react-icons/io";
import Drawer from "../Drawer";
import DrawerDetails from "../Drawer";
import { toast } from "react-toastify";
import platformTheme from "../PlatformTheme";
import tinycolor from "tinycolor2";
function Seater({ busdetails, seatplatform, type, busprice, logo, imageurl }) {
  const lowerseatlist = [
    {
      rowlist: [
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
      ],
    },
    {
      rowlist: [
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
      ],
    },
    {
      rowlist: [
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
      ],
    },
    {
      rowlist: [
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
      ],
    },
    {
      rowlist: [
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
        {
          id: "L19",
          seattype: unisex_se,
          rate: 650,
          gender: "unisex",
          status: "available",
          berth: "lower",
        },
        {
          id: "L20",
          seattype: unisex_se,
          rate: 650,
          gender: "unisex",
          status: "available",
          berth: "lower",
        },
      ],
    },
    {
      rowlist: [
        {
          id: "L21",
          seattype: unisex_se,
          rate: 650,
          gender: "unisex",
          status: "available",
          berth: "lower",
        },
        {
          id: "L22",
          seattype: unisex_se,
          rate: 650,
          gender: "unisex",
          status: "available",
          berth: "lower",
        },
        {
          id: "L23",
          seattype: unisex_se,
          rate: 650,
          gender: "unisex",
          status: "available",
          berth: "lower",
        },
        {
          id: "L24",
          seattype: unisex_se,
          rate: 650,
          gender: "unisex",
          status: "available",
          berth: "lower",
        },
      ],
    },
    {
      rowlist: [
        {
          id: "L25",
          seattype: unisex_se,
          rate: 650,
          gender: "men",
          status: "booked",
          berth: "lower",
        },
        {
          id: "L26",
          seattype: unisex_se,
          rate: 650,
          gender: "unisex",
          status: "available",
          berth: "lower",
        },
        {
          id: "L27",
          seattype: men_se,
          rate: 650,
          gender: "men",
          status: "available",
          berth: "lower",
        },
        {
          id: "L28",
          seattype: men_se,
          rate: 650,
          gender: "men",
          status: "available",
          berth: "lower",
        },
      ],
    },
    {
      rowlist: [
        {
          id: "L29",
          seattype: unisex_se,
          rate: 650,
          gender: "unisex",
          status: "available",
          berth: "lower",
        },
        {
          id: "L30",
          seattype: unisex_se,
          rate: 650,
          gender: "unisex",
          status: "available",
          berth: "lower",
        },
        {
          id: "L31",
          seattype: unisex_se,
          rate: 650,
          gender: "unisex",
          status: "available",
          berth: "lower",
        },
        {
          id: "L32",
          seattype: unisex_se,
          rate: 650,
          gender: "unisex",
          status: "available",
          berth: "lower",
        },
      ],
    },
    {
      rowlist: [
        {
          id: "L33",
          seattype: men_se_book,
          rate: 650,
          gender: "men",
          status: "booked",
          berth: "lower",
        },
        {
          id: "L34",
          seattype: men_se_book,
          rate: 650,
          gender: "men",
          status: "booked",
          berth: "lower",
        },
        {
          id: "L35",
          seattype: unisex_book,
          rate: 650,
          gender: "unisex",
          status: "booked",
          berth: "lower",
        },
        {
          id: "L36",
          seattype: unisex_book,
          rate: 650,
          gender: "unisex",
          status: "booked",
          berth: "lower",
        },
      ],
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
  const addTenMinutes = (timeStr, index) => {
    const [hours, minutes] = timeStr.split(":").map(Number);
    const totalMinutes = hours * 60 + minutes + index * 10;
    const newHours = Math.floor(totalMinutes / 60);
    const newMinutes = totalMinutes % 60;
    return `${newHours.toString().padStart(2, "0")}:${newMinutes
      .toString()
      .padStart(2, "0")}`;
  };
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
  useEffect(() => {
    const pickupPoints = busdetails?.Pickup_points.split(",");
    const updatedDepartures = pickupPoints.map((pickup, index) => {
      const time = addTenMinutes(busdetails.Bus_Depature_time, index);
      return { pickup, time };
    });
    setUpdatedDepartures(updatedDepartures);
    const dropPoints = busdetails?.Pickup_points.split(",");
    const updatedarrival = dropPoints.map((pickup, index) => {
      const time = addTenMinutes(busdetails.Bus_Arrival_time, index);
      return { pickup, time };
    });
    setUpdatedArrival(updatedarrival);
  }, [busdetails]); 
  return (
    <div className="px-[0.5vw]">
      <div
        className="bg-[#EEEDED] pt-[2vw]  border-x-[0.1vw] border-b-[0.1vw] rounded-b-[0.5vw]"
        style={{
          // boxShadow: "0 0 10px 5px #3498db",
          borderColor: colorcode.theme,
        }}
      >
        <div className="grid grid-cols-2 h-[45vw] w-full pt-[2vw] bg-[#EEEDED] rounded-b-[0.5vw]">
          <div className="col-span-1 h-full w-full">
            <div className=" h-full w-full px-[12vw] gap-[1.5vw]">
              <div className=" h-full w-full py-[1vw]">
                <div className="border-[0.1vw] border-gray-400 h-full w-full rounded-[0.5vw] relative bg-white">
                  {/* <p className="text-[1vw] absolute top-[-1.5vw] left-[3vw] text-center">
                  {"Lower List".toUpperCase()}
                  {"(18)"}
                </p> */}
                  <span className="absolute top-[1vw] right-[1vw]">
                    <RiSteering2Fill size={"2vw"} />
                  </span>
                  <div className="border-l-[0.2vw] border-[#EEEDED] absolute left-[-0.15vw] top-[3vw] h-[3vw]"></div>
                  <div className="border-r-[0.1vw] border-t-[0.1vw] border-b-[0.1vw] bg-[#EEEDED] border-gray-400 h-[3vw] left-[-0.05vw] w-[3vw] top-[3vw] absolute"></div>
                  <div className="grid grid-rows-9 h-full w-full pt-[6vw] py-[1vw]">
                    {lowerseatlist.map((item, rowIndex) => (
                      <div className="row-span-1 pt-[0.5vw]" key={rowIndex}>
                        <div className="grid grid-cols-5">
                          {item.rowlist.map((bus, index) => (
                            <React.Fragment key={index}>
                              {index === 2 && (
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
                  className={`text-center py-[0.5vw]  text-white rounded-tl-[0.45vw] rounded-tr-[0.45vw] text-[1.2vw]`}
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
                          ? ""
                          : " hover:bg-gray-200"
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

                      {/* <p className="text-[1vw]">
                      {dayjs(busdetails.Bus_depature_date).format("DD MMM")}
                    </p> */}
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
              <div className="col-span-1 border-[0.1vw] border-gray-400 w-full h-[33vw] rounded-[0.5vw] bg-white">
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
                  {busdetails.Drop_points.split(",").map((item, index) => (
                    <div
                      key={index}
                      className={`${
                        selectedRoutes.arri_route == item
                          ? ""
                          : " hover:bg-gray-200"
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
                            ? lightColor
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
                      {/* <p className="text-[1vw]">
                      {dayjs(busdetails.Bus_arrival_date).format("DD MMM")}
                    </p> */}
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
                        <p className="text-[1.1vw] font-bold">Selected Seats</p>
                        {/* <p className="text-[1vw]">11</p> */}
                        <div className="flex flex-row flex-wrap">
                          {selectedSeats.length > 0 ? (
                            selectedSeats.map((seat, index) => (
                              <p key={index} className="text-[1vw] mr-[0.4vw]">
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
                          ? " cursor-pointer"
                          : "bg-gray-400 cursor-not-allowed"
                      } rounded-[0.5vw] text-white font-bold text-[1.3vw] `}
                      // disabled={selectedSeats.length > 0 ? false : true}
                      onClick={() => setShowModal(!modalshow)}
                      style={{
                        backgroundColor:
                          selectedSeats.length > 0 ? colorcode.btn : "#9CA3AF",
                      }}
                    >
                      Continue
                    </button>
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
  );
}

export default Seater;
