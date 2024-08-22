import { DatePicker } from "antd";
import "./HomeDatePicker.css";
import { useState } from "react";
const HomePageDatePicker = () => {
  const [bustton, setButton] = useState(false);
  return (
    <>
      <DatePicker
        // open
        format="DD MMM"
        // className="custom-date-picker"
        // onChange={handleDateChange}
        // placeholder="Select Date"
        className="custom-date-picker-dropdown-home"
        // dropdownClassName="custom-date-picker-dropdown"
        // popupStyle={{ display: "block" }}
        // style={{ display: "none" }} // Hide the input field
      />
    </>
  );
};
export default HomePageDatePicker;
