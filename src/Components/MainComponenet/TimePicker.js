import React, { useRef, useEffect, useState } from "react";
import { timePickerInput } from "analogue-time-picker";
import "../../Components/MainComponenet/TimePicker.css";

const TimePickerComponent = ({ onTimeChanged }) => {
  const inputRef = useRef(null);
  const [time, setTime] = useState("");

  useEffect(() => {
    if (!inputRef.current) return;

    const picker = timePickerInput({
      mode: 12, // 12-hour clock with AM/PM selection
      inputElement: inputRef.current,
      onChange: handleOkClick,
    });

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.addedNodes.length) {
          const modal = document.querySelector(".atp-modal");
          if (modal) {
            modal.classList.add("time-picker-modal");
          }

          const okButton = document.querySelector(".atp-button.atp-ok");
          const cancelButton = document.querySelector(".atp-button.atp-cancel");

          if (okButton) {
            okButton.textContent = "Submit"; // Change "OK" button to "Submit"
            okButton.removeEventListener("click", handleOkClick);
            okButton.addEventListener("click", handleOkClick);
          }

          if (cancelButton) {
            cancelButton.removeEventListener("click", handleCancelClick);
            cancelButton.addEventListener("click", handleCancelClick);
          }
        }
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      picker.dispose();
      observer.disconnect();
    };
  }, []);

  const handleOkClick = (event) => {
    const inputValue = inputRef.current.value;
    const parsedTime = parseTime(inputValue);
    console.log("Input Value:", inputValue);
    console.log("Parsed Time:", parsedTime);

    if (parsedTime) {
      setTime(parsedTime);
      if (onTimeChanged) {
        const { hour, minute } = parsedTime;
        onTimeChanged(hour, minute);
      }
      sendTimeToApi(parsedTime);
    }
  };

  const handleCancelClick = () => {
    console.log("Time picker cancelled");
  };

  const parseTime = (time) => {
    const validate = /^\s*(\d{1,2})\s*:\s*(\d{1,2})\s*((am)|(pm))?\s*$/i;
    if (!time || !validate.test(time)) return null;

    const match = time.match(validate);
    let hour = parseInt(match[1]);
    const minute = parseInt(match[2]);
    const period = match[3] ? match[3].toLowerCase() : null;

    if (period === "pm" && hour !== 12) hour += 12;
    if (period === "am" && hour === 12) hour = 0;

    const nextTime = new Date();
    nextTime.setHours(hour, minute);
    nextTime.setHours(nextTime.getHours() + 1);

    const formattedTime =
      formatTime(hour, minute) +
      " to " +
      formatTime(nextTime.getHours(), nextTime.getMinutes());
    console.log("Formatted Time:", formattedTime);

    return formattedTime;
  };

  const formatTime = (hour, minute) => {
    const period = hour >= 12 ? "pm" : "am";
    hour = hour % 12;
    hour = hour ? hour : 12; // the hour '0' should be '12'
    minute = minute < 10 ? "0" + minute : minute;
    return `${hour}:${minute}${period}`;
  };

  const sendTimeToApi = async (selectedTime) => {
    console.log(selectedTime, "selectedTimeselectedTime");
    try {
      const response = await fetch("YOUR_API_ENDPOINT", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ time: selectedTime }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("API Response:", data);
      } else {
        console.error("API Response Error:", response.statusText);
      }
    } catch (error) {
      console.error("API Request Error:", error);
    }
  };

  return (
    <div >
      <input
        ref={inputRef}
        className="pl-[0.5vw] md:text-[1vw] text-[2vw] border-[0.1vw] md:h-[2.2vw] h-[6vw] w-[95%] rounded-[0.4vw]"
        type="text"
        placeholder="Select Time"
        value={time}
        readOnly
        onMouseEnter={() => console.log("testingggg")}
      />
    </div>
  );
};

export default TimePickerComponent;
