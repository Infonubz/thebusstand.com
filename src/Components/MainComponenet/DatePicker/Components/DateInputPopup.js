import { useLocation } from "react-router";
import DateInputControl from "./DateInputControl";

function DateInputPopup(props) {
  const location = useLocation();
  return (
    <div>
      <div className="md:block hidden">
        <div
          className={`date-popup mr-[2vw] ${location.pathname == "/" ? "md:ml-[-13.5vw]" : "md:mr-[0vw]"
            }`}
        >
          <DateInputControl
            currentMonth={props.currentMonth}
            currentYear={props.currentYear}
            navigateToNextMonth={() => props.navigateMonth(1)}
            navigateToPrevMonth={() => props.navigateMonth(-1)}
          />
          <div className="date-popup__grid">
            <span className="week-code">SUN</span>
            <span className="week-code">MON</span>
            <span className="week-code">TUE</span>
            <span className="week-code">WED</span>
            <span className="week-code">THU</span>
            <span className="week-code">FRI</span>
            <span className="week-code">SAT</span>
            {props.children}
          </div>
        </div>
      </div>

      <div className="md:hidden block">
        <div
          className={`date-popup-mobile mr-[2vw] ${location.pathname == "/" ? "md:ml-[-13.5vw]" : "md:mr-[0vw]"
            }`}
        >
          <DateInputControl
            currentMonth={props.currentMonth}
            currentYear={props.currentYear}
            navigateToNextMonth={() => props.navigateMonth(1)}
            navigateToPrevMonth={() => props.navigateMonth(-1)}
          />
          <div className="date-popup__grid">
            <span className="week-code">SUN</span>
            <span className="week-code">MON</span>
            <span className="week-code">TUE</span>
            <span className="week-code">WED</span>
            <span className="week-code">THU</span>
            <span className="week-code">FRI</span>
            <span className="week-code">SAT</span>
            {props.children}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DateInputPopup;
