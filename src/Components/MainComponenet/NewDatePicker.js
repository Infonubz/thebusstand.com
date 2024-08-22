import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './NewTimePicker.css'; // Your custom CSS file

const CustomDatePicker = ({ selectedDate, handleDateChange }) => {
  return (
    <DatePicker
      selected={selectedDate}
      onChange={handleDateChange}
      calendarContainer="custom-calendar"
      calendarClassName="custom-calendar" // Custom class for the calendar
    />
  );
};

export default CustomDatePicker;
