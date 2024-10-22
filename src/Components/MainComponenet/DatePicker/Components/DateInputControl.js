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
          <IoIosArrowBack className="md:ml-[1vw] md:mt-[0.6vw] md:h-[1.3vw] md:w-[1.3vw]" />
        </button>
      <p className="flex gap-[1vw] md:items-center">
        <span className="md:text-[1.2vw]">{monthNames[props.currentMonth].toUpperCase()}</span>
        <span className="md:text-[1.2vw]">{props.currentYear}</span>
      </p>
        <button type="button" onClick={props.navigateToNextMonth}>
          <IoIosArrowForward className="md:flex md:mr-[0.7vw] md:mt-[0.6vw] md:h-[1.3vw] md:w-[1.3vw]" />
        </button>
    </div>
  );
}

export default DateInputControl;
