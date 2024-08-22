import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function DateInputControl(props) {
  return (
    <div className="date-control">
      <button type="button" onClick={props.navigateToPrevMonth}>
        <IoIosArrowBack />
      </button>
      <p className="flex gap-[1vw]">
        <span className="md:text-[1.2vw]">{monthNames[props.currentMonth].toUpperCase()}</span>
        <span className="md:text-[1.2vw]">{props.currentYear}</span>
      </p>
      <button type="button" onClick={props.navigateToNextMonth}>
        <IoIosArrowForward />
      </button>
    </div>
  );
}

export default DateInputControl;
