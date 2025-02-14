// function DateItem(props) {
//     if (!props.dateObj) {
//       return <button className="empty-date-item"> </button>;
//     }

//     const displayDate = props.dateObj.getDate();
//     const cssClasses = ["date-item"];

//     if (props.selected) {
//       cssClasses.push("selected");
//     }

//     return (
//       <button onClick={props.onClick} className={cssClasses.join(" ")}>
//         {displayDate}
//       </button>
//     );
//   }

//   export default DateItem;
function DateItem({ dateObj, selected, currentMonth, onClick, isDisabled }) {
  const dateClass = currentMonth ? "current-month-date" : "other-month-date";
  const selectedClass = selected ? "selected-date" : "";
  const disabledClass = isDisabled ? "disabled-date" : "";

  return (
    <div
      className={`date-item ${dateClass} ${selectedClass} ${disabledClass}`}
      onClick={!isDisabled ? onClick : null}
      style={{ pointerEvents: isDisabled ? "none" : "auto" }}
    >
      {dateObj ? dateObj.getDate() : ""}
    </div>
  );
}

export default DateItem;

