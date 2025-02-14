import { useState, useEffect, useRef, useMemo } from "react";
import PropTypes from "prop-types";
import getDaysInMonth from "../Utils/getDayInMonths";
import formatDate from "../Utils/formatDate";
import useClickOutside from "../hooks/UseClickOutside";
import DateInputPopup from "./DateInputPopup";
import DateItem from "./DateItem";
import dayjs from "dayjs";
import {
  useLocation,
  // useParams
} from "react-router";
import { CiCalendar } from "react-icons/ci";
import { useDispatch } from "react-redux";
import { HOME_SELECTED_DATE } from "../../../../Store/Type";

function getDateSlots(currentMonth, currentYear) {
  const slotSkipCount = new Date(currentYear, currentMonth, 1).getDay();

  const currentMonthDays = getDaysInMonth(currentMonth, currentYear).map(
    (date) => ({
      date,
      currentMonth: true,
    })
  );

  // Include days from the previous month
  let prevMonthDays = [];
  if (slotSkipCount > 0) {
    const prevMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    const prevMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear;
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
    const nextMonth = currentMonth === 11 ? 0 : currentMonth + 1;
    const nextMonthYear = currentMonth === 11 ? currentYear + 1 : currentYear;
    nextMonthDays = getDaysInMonth(nextMonth, nextMonthYear)
      .slice(0, nextMonthSlotCount)
      .map((date) => ({
        date,
        currentMonth: false,
      }));
  }

  return [...prevMonthDays, ...currentMonthDays, ...nextMonthDays];
}

function DateInput(props, { selecteddate, setSelecteddate, dateSelection }) {
  const popupRef = useRef();
  const [showPopup, setShowPopup] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const location = useLocation();
  //const path = useParams();
  const dispatch = useDispatch();

  useClickOutside(popupRef, () => {
    setShowPopup(false);
  });

  const dateArray = useMemo(
    () => getDateSlots(currentMonth, currentYear),
    [currentMonth, currentYear]
  );

  function togglePopupHandler() {
    setShowPopup((currentShowPopup) => !currentShowPopup);
  }

  function navigateMonthHandler(navigateBy = 1) {
    if (currentMonth + navigateBy === 12) {
      setCurrentMonth(0);
      setCurrentYear((currentState) => currentState + 1);
    } else if (currentMonth + navigateBy === -1) {
      setCurrentMonth(11);
      setCurrentYear((currentState) => currentState - 1);
    } else {
      setCurrentMonth((currentState) => currentState + navigateBy);
    }
  }

  function selectDateHandler(date) {
    if (typeof props.onChange === "function") {
      props.onChange(new Date(date.date));
    } else {
      console.error("props.onChange is not a function");
    }
    setSelectedDate(date.date);
    setShowPopup(false);
  }

  // function isDateDisabled(date) {
  //   const today = new Date();
  //   const threeDay=today.getDate()+3;

  //   return date<threeDay
  //   // return date < today.setHours(0, 0, 0, 0);
  // }
  // function isDateDisabled(date) {
  //   if (!(date instanceof Date)) {
  //     date = new Date(date);
  //   }

  //   const today = new Date();
  //   today.setHours(0, 0, 0, 0);

  //   const endDate = new Date(today);
  //   endDate.setDate(today.getDate() + 4);

  //   console.log("Today:", today);
  //   console.log("End Date:", endDate);
  //   console.log("Date being checked:", date);

  //   return date < endDate;
  // }

  function isDateDisabled(date) {
    if (!(date instanceof Date)) {
      date = new Date(date);
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const maxDate = new Date(today);
    maxDate.setDate(today.getDate() + 60); // Set the maximum date to 60 days from today

    return date < today || date > maxDate;
  }

  useEffect(() => {
    if (props.value) {
      const dateObj = new Date(props.value);
      setSelectedDate(formatDate(dateObj));
      setCurrentMonth(dateObj.getMonth());
      setCurrentYear(dateObj.getFullYear());
    }
  }, [props.value]);

  useEffect(() => {
    if (location.pathname === "/") {
      dispatch({
        type: HOME_SELECTED_DATE,
        payload: selectedDate,
      });
    }
  }, [dispatch, location.pathname, selectedDate]);

  const currentDate = new Date();
  const nextDate3 = new Date();
  nextDate3.setDate(currentDate.getDate() + 3);

  return (
    <span ref={popupRef} className="date-input-wrapper relative">
      <input
        defaultValue={
          selectedDate && location.pathname !== "/"
            ? dayjs(selectedDate).format("DD-MM-YYYY")
            : ""
        }
        onClick={togglePopupHandler}
        readOnly
        // className={`cursor-pointer md:block hidden h-[4.5vw] w-[4.5vw] left-[5vw] border-l-[0.15vw] border-t-[0.4vw] border-r-[0.4vw] border-b-[0.15vw] border-[#1F487C] text-black ${location.pathname ==="/"
        //   ? `rounded-[0.7vw] outline-none `
        //   : "h-[2.2vw] w-[100%] md:hidden block  text-[1vw] outline-none rounded-[0.5vw] pl-[1vw]"
        //   } `}
        className={`cursor-pointer text-center  text-black ${
          location.pathname === "/"
            ? ` h-[3.95vw] w-[3.95vw] rounded-[0.4vw] outline-none `
            : "h-[2.2vw] w-[95%] md:block hidden text-[1vw] outline-none rounded-[0.5vw] pl-[1vw]"
        } `}
        placeholder={`${location.pathname === "/" ? "" : "Select Date"}`}
      />
      {selectedDate ? (
        ""
      ) : (
        <>
          <div
            className={`${
              location.pathname === "/" ? "block" : "hidden"
            } flex-col absolute bottom-[0.5vw] left-[1vw] z-10 cursor-pointer  md:block hidden `}
            onClick={() => setShowPopup(!showPopup)}
          >
            <span
              className={`justify-center flex ${
                location.pathname === "/" ? "block" : "hidden"
              }`}
            >
              <CiCalendar
                size={"1.5vw"}
                color={`${showPopup ? "white" : "black"}`}
              />
            </span>
            <p
              className={`text-center text-[1vw] ${
                showPopup ? "text-white" : "text-black"
              } ${location.pathname === "/" ? "block" : "hidden"}`}
            >
              Date
            </p>
          </div>
          {/* ----------------------------------------------------------MOBILE VIEW------------------------------------------------------------------------------------------- */}
          <div
            className={`${
              location.pathname === "/" ? "block" : "hidden"
            } flex-col absolute top-[-3vw] left-[0.5vw] z-10 cursor-pointer  md:hidden block`}
            onClick={() => setShowPopup(!showPopup)}
          >
            <div className="">
              <span className="justify-center flex">
                <CiCalendar
                  size={"5vw"}
                  color={`${showPopup ? "white" : "black"}`}
                />
              </span>
            </div>
            <p
              className={`text-center text-[2.5vw] ${
                showPopup ? "text-white" : "text-black"
              } `}
            >
              Date
            </p>
          </div>
          {/* ----------------------------------------------------------MOBILE VIEW------------------------------------------------------------------------------------------- */}
        </>
      )}
      {selectedDate && location.pathname === "/" && (
        <div
          className={`flex-col absolute top-[50%] left-[50%] transform translate-y-[-50%] translate-x-[-50%] z-10`}
          onClick={() => setShowPopup(!showPopup)}
        >
          <div
          // className=
          // {`${dayjs(selectedDate).format("D") ==
          //   dayjs(dateSelection).format("D")
          //   ? "bg-[#1F487C] text-white"
          //   : "bg-[#E5FFF1] text-black"
          //   }
          //    cursor-pointer w-[12vw] h-[16vw] md:w-[4.5vw] md:h-[4.5vw] rounded-[0.7vw] border-l-[0.15vw] border-t-[0.4vw] border-r-[0.4vw] border-b-[0.15vw] border-[#1F487C] `}
          // onClick={() => setSelectedDate(dateSelection)}
          >
            <p className="text-center text-[3vw] md:text-[0.8vw] absolute md:bottom-[3.1vw] bottom-[1.5vw] md:left-[1.5vw] left-[1vw]">
              {dayjs(selectedDate).format("MMM")}
            </p>
            <p className="text-center pl-[0.2vw] font-semibold flex md:text-[1.2vw] absolute md:bottom-[1.25vw] bottom-[-4vw]  md:left-[1.2vw] left-[1.2vw]">
              {dayjs(selectedDate).format("DD")}
            </p>
            <p className="text-center text-[3vw] md:text-[0.8vw] absolute md:bottom-[0.05vw] bottom-[-9vw] md:left-[1.6vw] left-[1.4vw]">
              {dayjs(selectedDate).format("ddd")}
            </p>
          </div>
        </div>
      )}
      <div className="md:block hidden">
        {showPopup && (
          <DateInputPopup
            currentMonth={currentMonth}
            currentYear={currentYear}
            navigateMonth={navigateMonthHandler}
          >
            {dateArray.map((dateInfo, index) => {
              const dateObj = dateInfo.date ? new Date(dateInfo.date) : null;
              return (
                <DateItem
                  key={index}
                  dateObj={dateObj}
                  selected={selectedDate === formatDate(dateObj)}
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
              const dateObj = dateInfo.date ? new Date(dateInfo.date) : null;
              return (
                <DateItem
                  key={index}
                  dateObj={dateObj}
                  selected={selectedDate === formatDate(dateObj)}
                  currentMonth={dateInfo.currentMonth}
                  isDisabled={dateObj && isDateDisabled(dateObj)}
                  onClick={() => selectDateHandler(dateInfo)}
                />
              );
            })}
          </DateInputPopup>
        )}
      </div>
    </span>
  );
}

DateInput.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.string,
};

DateInput.defaultProps = {
  onChange: () => {},
  value: "",
};

export default DateInput;
