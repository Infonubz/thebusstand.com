import * as React from "react";
import { styled } from "@mui/material/styles";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { renderTimeViewClock } from "@mui/x-date-pickers/timeViewRenderers";

const CustomTimePicker = styled(TimePicker)(({ theme }) => ({
  width: "100px", // Adjust the width here
  "& .MuiOutlinedInput-root": {
    padding: "0", // Adjust the padding here
    height: "2vw", // Adjust the height here
  },
  "& .MuiOutlinedInput-input": {
    backgroundColor: "white", // Change the background color here
  },
  "& .MuiTimePickerToolbar-clock": {
    backgroundColor: "lightblue !important", // Change the clock background color here
  },
}));

export default function TimePickerViewRenderers() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["TimePicker"]}>
        <CustomTimePicker
          viewRenderers={{
            hours: renderTimeViewClock,
            minutes: renderTimeViewClock,
            seconds: renderTimeViewClock,
          }}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}
