import { Collapse, Tooltip } from "antd";
import dayjs from "dayjs";
import React, { useState } from "react";
import { RiArrowRightSLine } from "react-icons/ri";
import { IoIosArrowUp } from "react-icons/io";
import { useLocation } from "react-router";
import complete from "../../../../Assets/BookingList/complete.png";
import { calculateDiscountedFare } from "../../../Common/Common-Functions/TBS-Discount-Fare";
export default function MobileJourneyDetails({
  MobBusDetails,
  MobSelectedSeats,
  MobSelectedRoutes,
  MobBusprice,
}) {
  const formatTime = (timeString) => {
    const [hours, minutes] = timeString.split(":").map(Number);
    return minutes === 0 ? `${hours}h` : `${hours}h ${minutes}m`;
  };
  const calculateArrival = (departureDate, departureTime, duration) => {
    try {
      // Convert 12-hour time format (AM/PM) to Date object
      const departureDateTime = new Date(`${departureDate} ${departureTime}`);

      if (isNaN(departureDateTime.getTime())) {
        throw new Error("Invalid departure date or time format.");
      }

      // Extract hours and minutes from duration (HH:mm format)
      const [hours, minutes] = duration.split(":").map(Number);

      if (isNaN(hours) || isNaN(minutes)) {
        throw new Error("Invalid duration format.");
      }

      // Add duration to departure time
      departureDateTime.setHours(departureDateTime.getHours() + hours);
      departureDateTime.setMinutes(departureDateTime.getMinutes() + minutes);

      // Format arrival date (MMM DD, YYYY format)
      const arrivalDate = departureDateTime.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "2-digit",
      });

      // Format arrival time in 12-hour format with AM/PM
      const arrivalTime = departureDateTime.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });

      return dayjs(arrivalDate).format("DD MMM");
    } catch (error) {
      console.error("Error calculating arrival:", error.message);
      return { arrivalDate: null, arrivalTime: null };
    }
  };

  const LuxuryFind = (type) =>
    type?.toLowerCase().includes("volvo") ||
    type?.toLowerCase().includes("mercedes benz") ||
    type?.toLowerCase().includes("washroom") ||
    type?.toLowerCase().includes("bharatBenz") ||
    type?.toLowerCase().includes("luxury");

  const location = useLocation();

  const {
    MobSelectedSeats2,
    MobSelectedRoutes2,
    MobBusDetails2,
    seatDetails2,
    discount2,
    //MobBusprice,
  } = location.state || {};

  const [loader, setLoader] = useState(false);
  const MobSelectedSeats1 = MobSelectedSeats;
  const MobSelectedRoutes1 = MobSelectedRoutes2 || MobSelectedRoutes;

  return (
    <div>
      <div className="">
        <Collapse
          style={{
            backgroundColor:
              LuxuryFind(MobBusDetails?.Bus_Type_Name) === true
                ? "#393939"
                : "#1F4B7F",
          }}
          className="rounded-[2.5vw]  shadow-xl border-none"
          expandIcon={({ isActive }) =>
            isActive ? (
              <IoIosArrowUp
                className="mt-[0.5vw] h-[5vw] w-[5vw] "
                style={{ color: "#FFFFFF" }}
              />
            ) : (
              <RiArrowRightSLine
                className=" h-[5vw] w-[5vw]"
                style={{
                  color: "#FFFFFF",
                  // height: "2vw",
                  // width: "1.8vw",
                }}
              />
            )
          }
          defaultActiveKey={["1"]}
          expandIconPosition="end"
          items={[
            {
              key: "1",
              label: (
                <div className="flex items-center h-[4vw] ">
                  <div className="col-span-2">
                    <span className="">
                      <img
                        src={complete}
                        alt="complete"
                        className=" h-[7vw] w-[7vw] "
                      />
                    </span>
                  </div>
                  <div className="pl-[1vw] text-[#FFFFFF] font-medium  text-[4vw]">
                    Journey Details
                  </div>
                </div>
              ),
              children: (
                <div
                  style={{
                    backgroundColor:
                      LuxuryFind(MobBusDetails?.Bus_Type_Name) === true
                        ? "#FFEEC9"
                        : "white",
                  }}
                >
                  <div className="py-[0.5vw]">
                    <div className="grid grid-cols-8  w-full  h-[50vw] px-[3vw] relative">
                      <div className=" w-[100%] h-full flex justify-center">

                      </div>
                      <div className=" col-span-8">
                        <div className="grid grid-rows-7 w-full h-full">
                          <div className="row-span-3">
                            <div className="grid  grid-cols-7">
                              <div className=" col-span-2 ">
                                <div className="flex flex-col pl-[1vw] text-left">
                                  <p
                                    className={` text-[3.5vw] pt-[0.5vw] ${LuxuryFind(MobBusDetails?.Bus_Type_Name) ===
                                      true
                                      ? "text-[#393939]"
                                      : "text-[#1F487C]"
                                      }`}
                                  >
                                    {dayjs(MobBusDetails?.BUS_START_DATE).format(
                                      "DD MMM"
                                    )}
                                  </p>
                                  <p
                                    className={`font-bold text-[4vw]  ${LuxuryFind(MobBusDetails?.Bus_Type_Name) ===
                                      true
                                      ? "text-[#393939]"
                                      : "text-[#1F487C]"
                                      }`}
                                  >
                                    {MobBusDetails?.Start_time}
                                  </p>
                                  <p
                                    className={`text-[3vw] ${LuxuryFind(MobBusDetails?.Bus_Type_Name) ===
                                      true
                                      ? "text-[#393939]"
                                      : "text-[#1F487C]"
                                      }`}
                                  >
                                    {MobBusDetails?.source_name}
                                  </p>
                                </div>
                              </div>
                              <div className=" col-span-3 flex-col mt-[0.5vw] items-center w-full justify-center">
                                <div className=" col-span-3 h-full relative w-full flex justify-center items-center ">
                                  <div className="absolute  left-[-1.2vw]  w-[33vw] ">
                                    <svg
                                      className="w-[36vw] h-[15vw] "
                                      viewBox="0 0 300 28"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <line
                                        x1="172.258"
                                        y1="13.6426"
                                        x2="279.058"
                                        y2="13.6426"
                                        stroke={
                                          LuxuryFind(
                                            MobBusDetails?.Bus_Type_Name
                                          ) === true
                                            ? "#393939"
                                            : "#1F4B7F"
                                        }
                                        stroke-width="2.71095"
                                        stroke-dasharray="5.42 5.42"
                                      />
                                      <line
                                        x1="10.2483"
                                        y1="13.6426"
                                        x2="111.618"
                                        y2="13.6426"
                                        stroke={
                                          LuxuryFind(
                                            MobBusDetails?.Bus_Type_Name
                                          ) === true
                                            ? "#393939"
                                            : "#1F4B7F"
                                        }
                                        stroke-width="2.71095"
                                        stroke-dasharray="5.42 5.42"
                                      />
                                      <ellipse
                                        cx="6.12043"
                                        cy="13.8221"
                                        rx="5.82925"
                                        ry="5.42191"
                                        fill={
                                          LuxuryFind(
                                            MobBusDetails?.Bus_Type_Name
                                          ) === true
                                            ? "#393939"
                                            : "#1F4B7F"
                                        }
                                      />
                                      <path
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                        d="M280.078 6.24612C280.553 5.805 281.321 5.805 281.796 6.24612L289.082 13.0235C289.557 13.4646 289.557 14.1798 289.082 14.621L281.796 21.3983C281.321 21.8395 280.553 21.8395 280.078 21.3983C279.604 20.9572 279.604 20.242 280.078 19.8009L286.506 13.8222L280.078 7.84357C279.604 7.40245 279.604 6.68725 280.078 6.24612Z"
                                        fill={
                                          LuxuryFind(
                                            MobBusDetails?.Bus_Type_Name
                                          ) === true
                                            ? "#393939"
                                            : "#1F4B7F"
                                        }
                                        stroke={
                                          LuxuryFind(
                                            MobBusDetails?.Bus_Type_Name
                                          ) === true
                                            ? "#393939"
                                            : "#1F4B7F"
                                        }
                                        stroke-width="0.271095"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                      />
                                    </svg>
                                  </div>
                                  <div
                                    style={{
                                      zIndex: 2,
                                    }}
                                    className="relative mt-[1.25vw] h-[8vw] w-[20vw] flex 
                                           text-white text-[3.5vw]  font-bold justify-center items-center left-[-1vw] "
                                  >
                                    <svg
                                      className="w-[30vw] h-[10vw] "
                                      viewBox="0 0 106 54"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        d="M9.62178 0.374512C4.61028 0.374512 0.592041 4.3313 0.592041 9.26618V35.1452C0.592041 38.0402 2.93887 40.387 5.83382 40.387H11.5805C11.5805 43.9243 13.0076 47.3168 15.5477 49.818C18.0878 52.3193 21.5329 53.7245 25.1251 53.7245C28.7174 53.7245 32.1625 52.3193 34.7026 49.818C37.2427 47.3168 38.6698 43.9243 38.6698 40.387H69.6765C69.6765 43.9243 71.1035 47.3168 73.6436 49.818C76.1837 52.3193 79.6288 53.7245 83.2211 53.7245C86.8133 53.7245 90.2585 52.3193 92.7986 49.818C95.3387 47.3168 96.7657 43.9243 96.7657 40.387H100.554C103.449 40.387 105.795 38.0402 105.795 35.1452V9.26618C105.795 4.3313 101.777 0.374512 96.7657 0.374512H9.62178ZM25.1251 33.7182C26.9213 33.7182 28.6438 34.4208 29.9139 35.6715C31.1839 36.9221 31.8975 38.6183 31.8975 40.387C31.8975 42.1557 31.1839 43.8519 29.9139 45.1025C28.6438 46.3531 26.9213 47.0557 25.1251 47.0557C23.329 47.0557 21.6065 46.3531 20.3364 45.1025C19.0663 43.8519 18.3528 42.1557 18.3528 40.387C18.3528 38.6183 19.0663 36.9221 20.3364 35.6715C21.6065 34.4208 23.329 33.7182 25.1251 33.7182ZM83.2211 33.7182C85.0172 33.7182 86.7398 34.4208 88.0098 35.6715C89.2799 36.9221 89.9934 38.6183 89.9934 40.387C89.9934 42.1557 89.2799 43.8519 88.0098 45.1025C86.7398 46.3531 85.0172 47.0557 83.2211 47.0557C81.425 47.0557 79.7024 46.3531 78.4324 45.1025C77.1623 43.8519 76.4488 42.1557 76.4488 40.387C76.4488 38.6183 77.1623 36.9221 78.4324 35.6715C79.7024 34.4208 81.425 33.7182 83.2211 33.7182Z"
                                        fill={
                                          LuxuryFind(
                                            MobBusDetails?.Bus_Type_Name
                                          ) === true
                                            ? "#393939"
                                            : "#1F4B7F"
                                        }
                                      />
                                    </svg>
                                    <div className="absolute pb-[3vw] ">
                                      {formatTime(MobBusDetails?.TravelTime)}
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className=" col-span-2 ">
                                <div className="flex flex-col text-right pr-[1vw]">
                                  <p
                                    className={` text-[3.5vw] pt-[0.5vw] ${LuxuryFind(MobBusDetails?.Bus_Type_Name) ===
                                      true
                                      ? "text-[#393939]"
                                      : "text-[#1F487C]"
                                      }`}
                                  >
                                    {calculateArrival(
                                      MobBusDetails?.BUS_START_DATE,
                                      MobBusDetails?.Start_time,
                                      MobBusDetails?.TravelTime
                                    )}
                                  </p>
                                  <p
                                    className={`font-bold r text-[4vw] ${LuxuryFind(MobBusDetails?.Bus_Type_Name) ===
                                      true
                                      ? "text-[#393939]"
                                      : "text-[#1F487C]"
                                      }`}
                                  >
                                    {MobBusDetails?.Arr_Time}
                                  </p>
                                  <p
                                    className={`text-[3vw] ${LuxuryFind(MobBusDetails?.Bus_Type_Name) ===
                                      true
                                      ? "text-[#393939]"
                                      : "text-[#1F487C]"
                                      }`}
                                  >
                                    {MobBusDetails?.destination_name}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="row-span-2 flex justify-between px-[1vw] my-[2vw] ">
                            <div className="flex flex-col  ">
                              <p
                                className={`text-[3.5vw] ${LuxuryFind(MobBusDetails?.Bus_Type_Name) === true
                                  ? "text-[#393939]"
                                  : "text-[#1F487C]"
                                  }`}
                              >
                                Boarding Point & Time
                              </p>
                              <p
                                className={` text-[2.8vw] font-semibold ${LuxuryFind(MobBusDetails?.Bus_Type_Name) === true
                                  ? "text-[#393939]"
                                  : "text-[#1F487C]"
                                  }`}
                              // style={{
                              //   color: "#393939",

                              // }}
                              >
                                {MobSelectedRoutes1?.dep_route?.length > 25 ? (
                                  <Tooltip
                                    placement="top"
                                    title={MobSelectedRoutes1?.dep_route}
                                    className="cursor-pointer"
                                    color={
                                      LuxuryFind(MobBusDetails?.Bus_Type_Name) ===
                                        true
                                        ? "#393939"
                                        : "#393939"
                                    }
                                  >
                                    {`${MobSelectedRoutes1?.dep_route?.slice(
                                      0,
                                      20
                                    )}... (${dayjs(
                                      MobSelectedRoutes1?.dep_time
                                    ).format("HH:mm")})`}
                                  </Tooltip>
                                ) : (
                                  `${MobSelectedRoutes1?.dep_route?.slice(
                                    0,
                                    20
                                  )} (${MobSelectedRoutes1?.dep_time})`
                                )}
                              </p>
                            </div>
                            <div className="flex flex-col items-center">
                              <p
                                className={` text-[3.5vw] ${LuxuryFind(MobBusDetails?.Bus_Type_Name) === true
                                  ? "text-[#393939]"
                                  : "text-[#1F487C]"
                                  }`}
                              >
                                Seat Number(s)
                              </p>
                              <div className="text-[1.1vw] font-semibold">
                                <div
                                  className={`flex flex-row flex-wrap ${LuxuryFind(MobBusDetails?.Bus_Type_Name) ===
                                    true
                                    ? "text-[#393939]"
                                    : "text-[#1F487C]"
                                    }`}
                                >
                                  {MobSelectedSeats1?.length > 0 ? (
                                    MobSelectedSeats1.map((seat, index) => (
                                      <p
                                        key={index}
                                        className=" text-[2.8vw] mr-[0.4vw]"
                                      >
                                        {seat}
                                        {index < MobSelectedSeats1.length - 1 &&
                                          ","}
                                      </p>
                                    ))
                                  ) : (
                                    <p
                                      className={`text-[1vw] mr-[0.4vw] ${MobBusDetails?.bus_type_status === "luxury"
                                        ? "text-[#393939]"
                                        : "text-[#1F487C]"
                                        }`}
                                    >
                                      No Seat Selected
                                    </p>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="row-span-2 flex px-[1vw] justify-between  py-[2vw]">
                            <div className="flex flex-col  ">
                              <p
                                className={` text-[3.5vw] ${LuxuryFind(MobBusDetails?.Bus_Type_Name) === true
                                  ? "text-[#393939]"
                                  : "text-[#1F487C]"
                                  }`}
                              >
                                Dropping Point & Time
                              </p>
                              <p
                                className={` text-[2.8vw] font-semibold ${LuxuryFind(MobBusDetails?.Bus_Type_Name) === true
                                  ? "text-[#393939]"
                                  : "text-[#1F487C]"
                                  }`}
                              // style={{
                              //   color: "#393939",
                              // }}
                              >
                                {MobSelectedRoutes1?.arri_route?.length > 25 ? (
                                  <Tooltip
                                    placement="top"
                                    title={MobSelectedRoutes1?.arri_route}
                                    className="cursor-pointer"
                                    color={
                                      LuxuryFind(MobBusDetails?.Bus_Type_Name) ===
                                        true
                                        ? "#393939"
                                        : "#393939"
                                    }
                                  >
                                    {`${MobSelectedRoutes1?.arri_route?.slice(
                                      0,
                                      20
                                    )}... (${dayjs(
                                      MobSelectedRoutes1?.arri_route
                                    ).format("HH:mm")})`}
                                  </Tooltip>
                                ) : (
                                  `${MobSelectedRoutes1?.arri_route?.slice(
                                    0,
                                    20
                                  )} (${MobSelectedRoutes1?.arr_time})`
                                )}
                              </p>
                            </div>
                            <div className="relative">
                              <svg
                                className="  w-[30vw] h-[10vw]"
                                viewBox="0 0 191 65"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M63.8027 21.9522V46.3763C63.8027 49.4454 66.3049 51.9629 69.3893 51.9629H104.074C107.159 51.9629 109.661 49.4446 109.661 46.3763V21.9522C109.661 18.883 107.159 16.3656 104.074 16.3656H69.3893C66.3049 16.3656 63.8027 18.8839 63.8027 21.9522Z"
                                  fill={
                                    LuxuryFind(MobBusDetails?.Bus_Type_Name) ===
                                      true
                                      ? "#393939"
                                      : "#1F4B7F"
                                  }
                                />
                                <path
                                  d="M15.9289 2.65835C12.1005 0.255909 8.38323 -0.150284 5.5036 1.50614C-0.254637 4.80155 -0.571095 15.0933 4.76045 24.9138C5.82014 26.8619 7.05462 28.648 8.39942 30.2544C6.51724 33.8422 6.97543 38.339 9.87036 41.4234L28.4267 61.1303C30.1672 62.9812 32.6192 64.0527 35.1345 64.0527H181.215C186.356 64.0527 190.533 59.7672 190.533 54.4913L190.532 15.0765C190.532 9.8006 186.355 5.51503 181.214 5.51503L35.1337 5.51503C32.6184 5.51503 30.1816 6.58665 28.4258 8.43743L24.7869 12.3011C22.3833 8.14502 19.2666 4.73605 15.9289 2.65835ZM35.1337 8.71347L181.214 8.71347C184.631 8.71347 187.431 11.5704 187.431 15.0933V54.491C187.431 57.9974 184.647 60.8709 181.214 60.8709L35.1337 60.8709C33.4571 60.8709 31.8275 60.1565 30.6724 58.9229L12.1161 39.1993C10.9455 37.9657 10.3602 36.3584 10.3602 34.7675C10.3602 33.1766 10.9455 31.5858 12.1161 30.3356L23.9969 17.7063C25.2784 20.7907 27.3527 23.6617 27.0355 26.7161V26.8133C27.0355 27.2519 27.0039 27.6897 26.9723 28.0959C26.4502 27.9663 25.9126 27.8683 25.3427 27.8683C21.6408 27.8683 18.6196 30.9527 18.6196 34.7515C18.6196 38.5662 21.6408 41.6505 25.3427 41.6505C29.0602 41.6505 32.0659 38.566 32.0659 34.7515C32.0659 32.7545 31.2118 30.9527 29.8826 29.7033C30.0404 28.7946 30.136 27.8525 30.136 26.8299V26.716C29.8826 22.046 28.0939 19.1183 26.3065 15.2389L30.6408 10.645C31.8276 9.42716 33.4571 8.71347 35.1337 8.71347ZM22.5412 14.6714L10.344 27.6255C9.29964 26.3105 8.33468 24.8983 7.48069 23.3565C3.13026 15.3691 2.92467 6.63597 7.02169 4.29839C8.88849 3.22677 11.483 3.6164 14.3148 5.38581C17.4161 7.33383 20.3264 10.6291 22.5412 14.6714Z"
                                  fill={
                                    LuxuryFind(MobBusDetails?.Bus_Type_Name) ===
                                      true
                                      ? "#393939"
                                      : "#1F4B7F"
                                  }
                                />
                                <path
                                  fill-rule="evenodd"
                                  clip-rule="evenodd"
                                  d="M32.2528 54.6614C34.0086 54.6614 35.4319 55.8294 35.4319 57.2702C35.4319 58.711 34.0086 59.879 32.2528 59.879C32.2365 59.879 32.2202 59.8789 32.2039 59.8787L32.2528 62.4375L184.608 62.4375L187.301 59.8787C187.284 59.8789 187.269 59.879 187.252 59.879C185.496 59.879 184.073 58.711 184.073 57.2702C184.073 55.8294 185.496 54.6614 187.252 54.6614C187.269 54.6614 187.284 54.6615 187.301 54.6617V50.4067C187.284 50.4069 187.269 50.407 187.252 50.407C185.496 50.407 184.073 49.239 184.073 47.7982C184.073 46.3574 185.496 45.1894 187.252 45.1894H187.26L187.275 45.1895L187.284 45.1895L187.301 45.1897V41.5772C182.493 41.5772 178.595 38.3786 178.595 34.433C178.595 30.4875 182.493 27.2889 187.301 27.2889V23.7566C187.284 23.7569 187.269 23.757 187.252 23.757C185.496 23.757 184.073 22.5889 184.073 21.1481C184.073 19.7073 185.496 18.5393 187.252 18.5393C187.269 18.5393 187.284 18.5394 187.301 18.5396V14.2846C187.292 14.2847 187.284 14.2848 187.275 14.2849C187.268 14.2849 187.26 14.2849 187.252 14.2849C185.496 14.2849 184.073 13.1169 184.073 11.6761C184.073 10.2353 185.496 9.0673 187.252 9.0673C187.269 9.0673 187.284 9.06738 187.301 9.06762L185.147 6.42857L32.2039 6.96711L32.2039 9.06762C32.1876 9.06762 32.2202 9.06738 32.2039 9.06762C33.9597 9.06762 35.4319 10.2353 35.4319 11.6761C35.4319 13.1169 34.0086 14.2849 32.2528 14.2849C32.2365 14.2849 32.2202 14.2849 32.2039 14.2846V18.5396C32.2202 18.5394 32.2365 18.5393 32.2528 18.5393C34.0086 18.5393 35.4319 19.7073 35.4319 21.1481C35.4319 22.5889 34.0086 23.757 32.2528 23.757C32.2365 23.757 32.2202 23.7569 32.2039 23.7566V27.2889C37.0119 27.2889 41.9793 30.4875 41.9793 34.433C41.9793 38.3786 37.0119 41.5772 32.2039 41.5772V45.1897C32.2202 45.1895 32.2365 45.1894 32.2528 45.1894C34.0086 45.1894 35.4319 46.3574 35.4319 47.7982C35.4319 49.239 34.0086 50.407 32.2528 50.407C32.2365 50.407 32.2202 50.4069 32.2039 50.4067V54.6617C32.2202 54.6615 32.2365 54.6614 32.2528 54.6614Z"
                                  fill={
                                    LuxuryFind(MobBusDetails?.Bus_Type_Name) ===
                                      true
                                      ? "#393939"
                                      : "#1F4B7F"
                                  }
                                />
                              </svg>
                              <p
                                className={` text-[4vw] font-bold text-white absolute left-[8.5vw]  top-[2.25vw]  flex items-center justify-center
                                      ${MobBusDetails?.bus_type_status === "luxury"
                                    ? "text-[#393939]"
                                    : "text-[#1F487C]"
                                  }`}
                              >
                                {calculateDiscountedFare(
                                  MobBusDetails?.BUS_START_DATE,
                                  MobBusprice
                                )}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              ),
            },
          ]}
        />
      </div>
    </div>
  );
}
