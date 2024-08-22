import { useState, useEffect, useRef, useMemo } from "react";
import PropTypes from "prop-types";
import getDaysInMonth from "../Utils/getDayInMonths";
import formatDate from "../Utils/formatDate";
import useClickOutside from "../hooks/UseClickOutside";
import DateInputPopup from "./DateInputPopup";
import DateItem from "./DateItem";
import dayjs from "dayjs";
import { useLocation, useParams } from "react-router";
import { CiCalendar } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { HOME_SELECTED_DATE } from "../../../../Store/type";

function getDateSlots(currentMonth, currentYear) {
  const currentMonthDays = getDaysInMonth(currentMonth, currentYear).map(
    (date) => ({
      date,
      currentMonth: true,
    })
  );

  const slotSkipCount = new Date(currentYear, currentMonth, 1).getDay();

  // Include days from the previous month
  let prevMonthDays = [];
  if (slotSkipCount > 0) {
    const prevMonth = currentMonth == 0 ? 11 : currentMonth - 1;
    const prevMonthYear = currentMonth == 0 ? currentYear - 1 : currentYear;
    prevMonthDays = getDaysInMonth(prevMonth, prevMonthYear)
      .slice(-slotSkipCount)
      .map((date) => ({
        date,
        currentMonth: false,
      }));
  }

  const totalSlots = 35;
  const nextMonthSlotCount =
    totalSlots - (prevMonthDays.length + currentMonthDays.length);

  // Include days from the next month
  let nextMonthDays = [];
  if (nextMonthSlotCount > 0) {
    const nextMonth = currentMonth == 11 ? 0 : currentMonth + 1;
    const nextMonthYear = currentMonth == 11 ? currentYear + 1 : currentYear;
    nextMonthDays = getDaysInMonth(nextMonth, nextMonthYear)
      .slice(0, nextMonthSlotCount)
      .map((date) => ({
        date,
        currentMonth: false,
      }));
  }

  return [...prevMonthDays, ...currentMonthDays, ...nextMonthDays];
}

function HomeDateInput(props, { selecteddate, setSelecteddate }) {
  const popupRef = useRef();
  const [showPopup, setShowPopup] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  const getselecteddate = useSelector((state) => state.selected_date);
  console.log(getselecteddate, "getselecteddategetselecteddate");

  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());
  const currentDate = new Date();
  const nextDate1 = new Date();
  nextDate1.setDate(currentDate.getDate() + 1);
  const nextDate2 = new Date();
  nextDate2.setDate(currentDate.getDate() + 2);
  const nextDate3 = new Date();
  nextDate3.setDate(currentDate.getDate() + 3);

  const dateSelection = new Date(getselecteddate);
  console.log(dateSelection, "dateselectiondateselectiondateselection");
  console.log(nextDate3, "nextdatenextedatewfaewfawgafdsagewa");

  const [selectedDate, setSelectedDate] = useState("");

  useClickOutside(popupRef, () => {
    setShowPopup(false);
  });
  const dateArray = useMemo(
    () => getDateSlots(currentMonth, currentYear),
    [currentMonth, currentYear]
  );

  useEffect(() => {
    if (props.value) {
      const dateObj = new Date(props.value);
      setSelectedDate(formatDate(dateObj));
      setCurrentMonth(dateObj.getMonth());
      setCurrentYear(dateObj.getFullYear());
    }
  }, [props.value]);

  function togglePopupHandler() {
    setShowPopup((currentShowPopup) => !currentShowPopup);
  }

  function navigateMonthHandler(navigateBy = 1) {
    if (currentMonth + navigateBy == 12) {
      setCurrentMonth(0);
      setCurrentYear((currentState) => currentState + 1);
    } else if (currentMonth + navigateBy == -1) {
      setCurrentMonth(11);
      setCurrentYear((currentState) => currentState - 1);
    } else {
      setCurrentMonth((currentState) => currentState + navigateBy);
    }
  }

  function selectDateHandler(date) {
    if (typeof props.onChange == "function") {
      props.onChange(new Date(date.date));
    } else {
      console.error("props.onChange is not a function");
    }
    setSelectedDate(date.date);
    setShowPopup(false);
  }

  // function isDateDisabled(date) {
  //   const today = new Date();
  //   return date < today.setHours(0, 0, 0, 0);
  // }

  function isDateDisabled(date) {
    if (!(date instanceof Date)) {
      date = new Date(date);
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const endDate = new Date(today);
    endDate.setDate(today.getDate() + 4);

    console.log("Today:", today);
    console.log("End Date:", endDate);
    console.log("Date being checked:", date);

    return date < endDate;
  }

  const location = useLocation();
  const path = useParams();
  console.log(location.pathname, "locationlocation");
  console.log(selectedDate, "selectedDateselectedDate");
  const dispatch = useDispatch();
  useEffect(() => {
    if (location.pathname == "/") {
      dispatch({
        type: HOME_SELECTED_DATE,
        payload: selectedDate,
      });
    }
  }, [location.pathname, selectedDate]);
  console.log(nextDate3, "nextDate3");
  return (
    <>
      <div className="p-[0.5vw] gap-[4.5vw] md:gap-[1.5vw] grid grid-cols-5">
        <div
          className={`${dayjs(selectedDate).format("D") == dayjs(currentDate).format("D")
              ? "bg-[#1F487C] text-white"
              : "bg-[#E5FFF1] text-black"
            }  cursor-pointer w-[12vw] h-[16vw] md:w-[4.5vw] md:h-[4.5vw] rounded-[0.4vw] md:rounded-[0.7vw] border-l-[0.15vw] border-t-[0.4vw] border-r-[0.4vw] border-b-[0.15vw] border-[#1F487C] `}
          onClick={() => setSelectedDate(currentDate)}
        >
          <div className=" justify-items-center py-[1.5vw] md:py-0">
            <div className="flex flex-col items-center">
              <p className=" md:text-[0.8vw] text-[2.5vw] text-center">
                {dayjs(currentDate).format("MMM")}
              </p>
              <p className="text-center  font-semibold md:text-[1.2vw]">
                {dayjs(currentDate).format("D")}
              </p>
              <p className="text-center font-semibold text-[2.5vw] md:text-[0.8vw]">
                {dayjs(currentDate).format("ddd")}
              </p>
            </div>
          </div>
        </div>
        <div
          className={`${dayjs(selectedDate).format("D") == dayjs(nextDate1).format("D")
              ? "bg-[#1F487C] text-white"
              : "bg-[#E5FFF1] text-black"
            }  cursor-pointer w-[12vw] h-[16vw] md:w-[4.5vw] md:h-[4.5vw] rounded-[0.4vw] md:rounded-[0.7vw] border-l-[0.15vw] border-t-[0.4vw] border-r-[0.4vw] border-b-[0.15vw] border-[#1F487C] `}
          onClick={() => setSelectedDate(nextDate1)}
        >
          <div className="flex-col py-[1.5vw] md:py-0">
            <div className="flex flex-col items-center">
              <p className=" md:text-[0.8vw] text-[2.5vw] text-center">
                {dayjs(nextDate1).format("MMM")}
              </p>
              <p className="text-center  font-semibold md:text-[1.2vw]">
                {dayjs(nextDate1).format("D")}
              </p>
              <p className="text-center font-semibold text-[2.5vw] md:text-[0.8vw]">
                {dayjs(nextDate1).format("ddd")}
              </p>
            </div>
          </div>
        </div>
        <div
          className={`${dayjs(selectedDate).format("D") == dayjs(nextDate2).format("D")
              ? "bg-[#1F487C] text-white"
              : "bg-[#E5FFF1] text-black"
            }  cursor-pointer w-[12vw] h-[16vw] md:w-[4.5vw] md:h-[4.5vw] rounded-[0.4vw] md:rounded-[0.7vw] border-l-[0.15vw] border-t-[0.4vw] border-r-[0.4vw] border-b-[0.15vw] border-[#1F487C] `}
          onClick={() => setSelectedDate(nextDate2)}
        >
          <div className="flex-col py-[1.5vw] md:py-0">
            <div className="flex flex-col items-center">
              <p className=" md:text-[0.8vw] text-[2.5vw] text-center">
                {dayjs(nextDate2).format("MMM")}
              </p>
              <p className="text-center  font-semibold md:text-[1.2vw]">
                {dayjs(nextDate2).format("D")}
              </p>
              <p className="text-center font-semibold text-[2.5vw] md:text-[0.8vw]">
                {dayjs(nextDate2).format("ddd")}
              </p>
            </div>
          </div>
        </div>
        <div
          className={`${dayjs(selectedDate).format("D") == dayjs(nextDate3).format("D")
              ? "bg-[#1F487C] text-white"
              : "bg-[#E5FFF1] text-black"
            }  cursor-pointer w-[12vw] h-[16vw] md:w-[4.5vw] md:h-[4.5vw] rounded-[0.4vw] md:rounded-[0.7vw] border-l-[0.15vw] border-t-[0.4vw] border-r-[0.4vw] border-b-[0.15vw] border-[#1F487C] `}
          onClick={() => setSelectedDate(nextDate3)}
        >
          <div className="flex-col py-[1.5vw] md:py-0">
            <div className="flex flex-col items-center">
              <p className=" md:text-[0.8vw] text-[2.5vw] text-center">
                {dayjs(nextDate3).format("MMM")}
              </p>
              <p className="text-center  font-semibold md:text-[1.2vw]">
                {dayjs(nextDate3).format("D")}
              </p>
              <p className="text-center font-semibold text-[2.5vw] md:text-[0.8vw]">
                {dayjs(nextDate3).format("ddd")}
              </p>
            </div>
          </div>
        </div>

        {/* <div
                    className="bg-[#E5FFF1] hover:bg-white cursor-pointer w-[12vw] h-[16vw] md:w-[4.5vw] md:h-[4.5vw] rounded-[0.4vw] md:rounded-[0.7vw] border-l-[0.15vw] border-t-[0.4vw] border-r-[0.4vw] border-b-[0.15vw] border-[#1F487C] "
                    onClick={() => setSelectedDate("Date")}
                  >
                    <div className="flex-col pt-[0.5vw]">
                      <span className=" justify-center flex">
                        <CiCalendar size={"1.5vw"} />{" "}
                      </span>
                      <p className="text-center text-[1vw]">Date</p>
                    </div>
                  </div> */}
        {/* <Calendar
                    value={dayjs(selecteddate).format("D ddd")}
                    onChange={(value) => setSelectedDate(value)}
                    dateFormat="dd"
                    className="bg-[#E5FFF1] hover:bg-white cursor-pointer w-[12vw] h-[16vw] md:w-[4.5vw] md:h-[4.5vw] rounded-[0.4vw] md:rounded-[0.7vw] border-l-[0.15vw] border-t-[0.4vw] border-r-[0.4vw] border-b-[0.15vw] border-[#1F487C] "
                  /> */}
        <div className="">
          {/* <div
                      className={`${
                        dayjs(currentDate).format("DD MM") !=
                          dayjs(selecteddate).format("DD MM") ||
                        dayjs(nextDate1).format("DD MM") !=
                          dayjs(selecteddate).format("DD MM") ||
                        dayjs(nextDate2).format("DD MM") !=
                          dayjs(selecteddate).format("DD MM") ||
                        dayjs(nextDate3).format("DD MM") !=
                          dayjs(selecteddate).format("DD MM")
                          ? selecteddate > nextDate3
                            ? "bg-[#1F487C] text-white"
                            : ""
                          : "bg-[#E5FFF1] text-black"
                      } cursor-pointer w-[12vw] h-[16vw] md:w-[4.5vw] md:h-[4.5vw] rounded-[0.4vw] md:rounded-[0.7vw] border-l-[0.15vw] border-t-[0.4vw] border-r-[0.4vw] border-b-[0.15vw] border-[#1F487C] `}
                      onClick={() => setShowCalendar(!showCalendar)}
                      className="bg-[#E5FFF1]  cursor-pointer w-[12vw] h-[16vw] md:w-[4.5vw] md:h-[4.5vw] rounded-[0.4vw] md:rounded-[0.7vw] border-l-[0.15vw] border-t-[0.4vw] border-r-[0.4vw] border-b-[0.15vw] border-[#1F487C] "
                    >
                      <>
                        {showCalendar == false ? (
                          <>
                            {homedatepicker == "" ? (
                              <div
                                className="flex-col absolute top-[1vw] left-[1vw] z-10"
                                onClick={() => setShowCalendar(!showCalendar)}
                              >
                                <span className="justify-center flex">
                                  <CiCalendar size={"1.5vw"} />
                                </span>
                                <p className="text-center text-[1vw]">Date</p>
                              </div>
                            ) : (
                              <div
                                className="flex-col absolute top-[50%] left-[50%] transform translate-y-[-50%] translate-x-[-50%] z-10"
                                onClick={() => setShowCalendar(!showCalendar)}
                              >
                                <span className="text-center font-semibold flex">
                                  {dayjs(homedatepicker).format("DD")}
                                </span>
                                <p className="text-center text-[1vw]">
                                  {dayjs(homedatepicker).format("ddd")}
                                </p>
                              </div>
                            )}
                          </>
                        ) : (
                          <>
                            {homedatepicker == "" ? (
                              <>
                              <div
                                className="flex-col absolute top-[1vw] left-[1vw] z-10"
                                onClick={() => setShowCalendar(!showCalendar)}
                              >
                                <span className="justify-center flex">
                                  <CiCalendar size={"1.5vw"} />
                                </span>
                                <p className="text-center text-[1vw]">Date</p>
                              </div>
                              <DateInput
                                value={fromDate}
                                onChange={setFromDate}
                              />
                              </>
                            ) : (
                              <div
                                className="flex-col absolute top-[50%] left-[50%] transform translate-y-[-50%] translate-x-[-50%] z-10"
                                onClick={() => setShowCalendar(!showCalendar)}
                              >
                                <span className="text-center  font-semibold flex">
                                  {dayjs(homedatepicker).format("DD")}
                                </span>
                                <p className="text-center text-[1vw]">
                                  {dayjs(homedatepicker).format("ddd")}
                                </p>
                              </div>
                            )}
                     

                             <DateInput
                              value={fromDate}
                              onChange={setFromDate}
                              onChange={handleDepatureDateChange}
                            /> 
                          </>
                        )}
                      </>
                    </div> */}
          {/* <div className="absolute top-[5vw] left-[0vw] z-10">
     
                      <DateInput
                        value={fromDate}
                        onChange={setFromDate}
                      />
                    </div> */}
          {/* <div
                            className={` `}
                          // onClick={() => setShowCalendar(!showCalendar)}
                          >
                            <DateInput />
                          </div> */}
          <div>
            {/* <div className="flex-col absolute top-[0.4vw] left-[0.1vw]">
                              <DateInput
                              // dateSelection={dateSelection}
                              // selecteddate={selecteddate}
                              />
                            </div> */}
            <div
            // className={`${dayjs(selectedDate).format("D") ==
            //     dayjs(dateSelection).format("D")
            //     ? "bg-[#1F487C] text-white"
            //     : "bg-[#E5FFF1] text-black"
            //     }
            //     cursor-pointer w-[12vw] h-[16vw] md:w-[4.5vw] md:h-[4.5vw] rounded-[0.4vw] md:rounded-[0.7vw] border-l-[0.15vw] border-t-[0.4vw] border-r-[0.4vw] border-b-[0.15vw] border-[#1F487C]
            //      `}
            // onClick={() => setSelectedDate(dateSelection)}
            >
              {/* <div className="flex-col ">
                                <DateInput
                                // dateSelection={dateSelection}
                                // selecteddate={selecteddate}
                                />
                            </div> */}

              <div
                ref={popupRef}
                className="relative cursor-pointer w-[12vw] h-[16vw] md:w-[4.5vw] md:h-[4.5vw] rounded-[0.4vw] md:rounded-[0.7vw] border-l-[0.15vw] border-t-[0.4vw] border-r-[0.4vw] border-b-[0.15vw] border-[#1F487C] bg-[#E5FFF1] text-black"
              >
                {/* <input
                                    defaultValue={
                                        selectedDate && location.pathname !== "/"
                                            ? dayjs(selectedDate).format("DD-MM-YYYY")
                                            : ""
                                    }
                                    onClick={togglePopupHandler}
                                    readOnly
                                    // className={`cursor-pointer md:block hidden h-[4.5vw] w-[4.5vw] left-[5vw] border-l-[0.15vw] border-t-[0.4vw] border-r-[0.4vw] border-b-[0.15vw] border-[#1F487C] text-black ${location.pathname == "/"
                                    //   ? `rounded-[0.7vw] outline-none `
                                    //   : "h-[2.2vw] w-[100%] md:hidden block  text-[1vw] outline-none rounded-[0.5vw] pl-[1vw]"
                                    //   } `}
                                    className={`cursor-pointer ${showPopup ? "bg-[#1F487C]" : "bg-[#E5FFF1]"}  text-black ${location.pathname == "/"
                                        ? ` h-[3.95vw] w-[3.95vw] rounded-[0.4vw] outline-none `
                                        : "h-[2.2vw] w-[95%] md:block hidden text-[1vw] outline-none rounded-[0.5vw] pl-[1vw]"
                                        } `}

                                    placeholder={`${location.pathname == "/" ? "" : "Select Date"}`}
                                /> */}
                {selectedDate ? (
                  <div
                    className={`flex-col absolute top-[50%] left-[50%] transform translate-y-[-50%] translate-x-[-50%] z-10`}
                    onClick={() => setShowPopup(!showPopup)}
                  >
                    <div
                      className={`${dayjs(selectedDate).format("D") ==
                          dayjs(dateSelection).format("D")
                          ? "bg-[#1F487C] text-white"
                          : "bg-[#E5FFF1] text-black"
                        } cursor-pointer w-[12vw] h-[16vw] md:w-[4.5vw] md:h-[4.5vw] rounded-[0.4vw] md:rounded-[0.7vw] border-l-[0.15vw] border-t-[0.4vw] border-r-[0.4vw] border-b-[0.15vw] border-[#1F487C] `}
                      onClick={() => setSelectedDate(dateSelection)}
                    >
                      <div className="flex flex-col items-center">
                        <p className=" md:text-[0.8vw] text-[2.5vw] text-center">
                          {dayjs(dateSelection).format("MMM")}
                        </p>
                        <p className="text-center  font-semibold md:text-[1.2vw]">
                          {dayjs(dateSelection).format("D")}
                        </p>
                        <p className="text-center font-semibold text-[2.5vw] md:text-[0.8vw]">
                          {dayjs(dateSelection).format("ddd")}
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div
                      className={`${location.pathname == "/" ? "block" : "hidden"
                        } flex-col  z-10 cursor-pointer `}
                      onClick={() => setShowPopup(!showPopup)}
                    >
                      <div className="md:block hidden">
                        <div className="flex flex-col items-center justify-center py-[0.5vw] h-full">
                          <CiCalendar
                            size={"1.5vw"}
                            color={`${showPopup ? "white" : "black"}`}
                          />
                          <p
                            className={`text-center text-[1vw] ${showPopup ? "text-white" : "text-black"
                              }`}
                          >
                            Date
                          </p>
                        </div>

                      </div>
                      <div className="md:hidden block">
                        <div className="items-center flex flex-col  py-[1.5vw]">
                          <CiCalendar
                            size={"6.5vw"}
                            color={`${showPopup ? "white" : "black"}`}
                          />
                          <p
                            className={`text-center text-[4vw] ${showPopup ? "text-white" : "text-black"
                              }`}
                          >
                            Date
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {/* {selectedDate && location.pathname == "/" && ( */}
                {/* <div
                                        className={`flex-col absolute top-[50%] left-[50%] transform translate-y-[-50%] translate-x-[-50%] z-10`}
                                        onClick={() => setShowPopup(!showPopup)}
                                    >
                                        <div
                                            className={`${dayjs(selectedDate).format("D") == dayjs(dateSelection).format("D")
                                                ? "bg-[#1F487C] text-white"
                                                : "bg-[#E5FFF1] text-black"
                                                } cursor-pointer w-[12vw] h-[16vw] md:w-[4.5vw] md:h-[4.5vw] rounded-[0.4vw] md:rounded-[0.7vw] border-l-[0.15vw] border-t-[0.4vw] border-r-[0.4vw] border-b-[0.15vw] border-[#1F487C] `}
                                            onClick={() => setSelectedDate(dateSelection)}
                                        >
                                            <div className="flex flex-col items-center">
                                                <p className="text-[3vw] md:text-[0.8vw]">
                                                    {dayjs(dateSelection).format("MMM")}
                                                </p>
                                                <p className="md:text-[1.2vw] font-semibold flex">
                                                    {dayjs(dateSelection).format("DD")}
                                                </p>
                                                <p className="md:text-[0.8vw] text-[3vw]">
                                                    {dayjs(dateSelection).format("ddd")}
                                                </p>
                                            </div>
                                        </div>
                                    </div> */}
                {/* )} */}
                <div className="md:block hidden">
                  {showPopup && (
                    <DateInputPopup
                      currentMonth={currentMonth}
                      currentYear={currentYear}
                      navigateMonth={navigateMonthHandler}
                    >
                      {dateArray.map((dateInfo, index) => {
                        const dateObj = dateInfo.date
                          ? new Date(dateInfo.date)
                          : null;
                        return (
                          <DateItem
                            key={index}
                            dateObj={dateObj}
                            selected={selectedDate == formatDate(dateObj)}
                            currentMonth={dateInfo.currentMonth}
                            isDisabled={dateObj && isDateDisabled(dateObj)}
                            onClick={() => selectDateHandler(dateInfo)}
                          />
                        );
                      })}
                    </DateInputPopup>
                  )}
                </div>
                <div className="md:hidden block ">
                  {showPopup && (
                    <DateInputPopup
                      currentMonth={currentMonth}
                      currentYear={currentYear}
                      navigateMonth={navigateMonthHandler}
                    >
                      {dateArray.map((dateInfo, index) => {
                        const dateObj = dateInfo.date
                          ? new Date(dateInfo.date)
                          : null;
                        return (
                          <DateItem
                            key={index}
                            dateObj={dateObj}
                            selected={selectedDate == formatDate(dateObj)}
                            currentMonth={dateInfo.currentMonth}
                            isDisabled={dateObj && isDateDisabled(dateObj)}
                            onClick={() => selectDateHandler(dateInfo)}
                          />
                        );
                      })}
                    </DateInputPopup>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

HomeDateInput.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.string,
};

HomeDateInput.defaultProps = {
  onChange: () => { },
  value: "",
};

export default HomeDateInput;
