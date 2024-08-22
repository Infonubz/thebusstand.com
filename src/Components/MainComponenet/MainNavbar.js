import bus from "../../assets/bus.png";
import { FaArrowRightArrowLeft } from "react-icons/fa6";
import "react-calendar/dist/Calendar.css"; // Import the styles
import { DownOutlined, UserOutlined } from "@ant-design/icons";
import nlogo from "../../assets/logo.png";
import profile from "../../assets/Profile.png";
import ticket from "../../assets/ticket.png";
import share from "../../assets/Share.png";
import { MdStarRate } from "react-icons/md";
// import "../src/Components/TextMoving/TextMoving.css"; // Import the stylesheet
import "tailwindcss/tailwind.css"; // Make sure you have Tailwind CSS imported in your project
import React, { useEffect, useRef, useState } from "react";
import { Button, Drawer, Popover, Select } from "antd";
import { Space, TimePicker, DatePicker } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  BUS_SEARCH,
  GET_FILTER_DATA,
  SEARCH_BUTTON,
  SHARE_BUTTON,
} from "../../Store/type";
// import logo from "./logo.svg";
import moment from "moment";
import busstand from "../../assets/busstand.png";
import ShareButtons from "./ShareButton";
import Modal from "react-modal";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css"; // Importing the default styling
import dropdown from "../../assets/dropdown.png";
import { CalendarComponent } from "@syncfusion/ej2-react-calendars";
// import TimePicker from "@mui/lab/TimePicker";
import dayjs from "dayjs";
// import { LocalizationProvider, MobileTimePicker } from "@mui/x-date-pickers";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import time from "../../assets/time.png";
import date from "../../assets/date.png";
import { IoMdTime } from "react-icons/io";
import { FaArrowLeft, FaMapMarkerAlt } from "react-icons/fa";
import split from "../../assets/split.png";
import doubleducker from "../../assets/doubleducker.png";
import buslogo from "../../assets/502-ai 1.png";
import "../../App.css";
import { Calendar } from "primereact/calendar";
import "../../Components/MainComponenet/Datepicker.css";
import TimePick from "./TimePicker";
import { timePickerInput } from "analogue-time-picker";
import Sidebar from "./Sidebar";
import "../../Components/MainComponenet/TimePicker.css";
import TimePickerComponent from "./TimePicker";
import axios from "axios";
import { useLocation, useNavigate, useParams } from "react-router";
import bus2 from "../../assets/doubleducker.png";
import { RWebShare } from "react-web-share";
// import 'antd/dist/antd.css';
// import "antd/dist/reset.css";
import "./Antd.css";
import ResponsiveTimePickers from "./NewTimePicker";
import DateInput from "./DatePicker/Components/DateInput";
import "./DatePicker/style.css";
import { CiSearch } from "react-icons/ci";
import { LiaCitySolid } from "react-icons/lia";
import { SmileOutlined } from '@ant-design/icons';
import { Dropdown } from 'antd';
import { PiNavigationArrowFill } from "react-icons/pi";
import { PiUserCircleDuotone } from "react-icons/pi";
import { FaTicketAlt } from "react-icons/fa";
import { RiLogoutCircleLine } from "react-icons/ri";
// import bus1 from "../../assets/bus";
// import bus from "../../assets/bus.png";
// import styled from "styled-components";
const MainNavbar = ({ onTimeChanged, ...inputProps }) => {
  const [startDate, setStartDate] = useState(new Date());
  const location = useLocation();
  const currentplace = location.state?.currentplace || "";
  console.log(currentplace, "currentplace");
  const [traveldetails, setTraveldetails] = useState({
    from: { label: "", value: "" },
    to: { label: "", value: "" },
    date: "",
    time: "",
  });
  console.log(traveldetails.date, "traveldetailstraveldetails");
  console.log(traveldetails.from.value, "fromoomomomomomo")
  console.log(traveldetails.to, "tototototototototototototo")

  // const fromValue = traveldetails.from.value
  // console.log(fromValue, 'fromvaluevalue')

  const [toValue, setToValue] = useState(traveldetails.to.value);
  const [fromValue, setFromValue] = useState(traveldetails.to.value);
  useEffect(() => {
    // Update the state when traveldetails.to.value changes
    setToValue(traveldetails.to.value);
    setFromValue(traveldetails.from.value);
  }, [traveldetails.to.value, traveldetails.from.value]);

  const busdata = useSelector((state) => state.bus_data);
  console.log(busdata, "busdadaaadsasdas");

  useEffect(() => {
    // if (busdata) {
    setTraveldetails({
      ...traveldetails,
      from: {
        // label: busdata.from,
        // value: busdata.from,
        label: localStorage.getItem("departure"),
        value: localStorage.getItem("departure"),
      },
      to: {
        // label: busdata.to,
        // value: busdata.to,
        label: localStorage.getItem("arrival"),
        value: localStorage.getItem("arrival"),
      },
      date: new Date(localStorage.getItem("selectdate")),
    });
    // }
  }, [
    localStorage.getItem("departure"),
    localStorage.getItem("arrival"),
    localStorage.getItem("selectdate"),
  ]);
  console.log(localStorage.getItem("departure"), "hhhhhhhhhhhh");

  const options = [
    { value: "Chennai", label: "Chennai" },
    { value: "Bangalore", label: "Bangalore" },
    { value: "Pondicherry", label: "Pondicherry" },
  ];
  const tooptions = [
    { value: "Coimbatore", label: "Coimbatore" },
    { value: "Goa", label: "Goa" },
    { value: "Hyderabad", label: "Hyderabad" },
  ];
  const onSearch = (value) => {
    console.log("search:", value);
  };
  const dispatch = useDispatch();
  const handleSearch = () => {
    dispatch({
      type: BUS_SEARCH,
      payload: traveldetails,
    });
    dispatch({
      type: SEARCH_BUTTON,
      payload: false,
    });
    // handlefilter();
    localStorage.setItem("search", false);
  };
  const onChange = (date, dateString) => {
    console.log(date, dateString);
  };
  const handleSwap = () => {
    setTraveldetails({
      ...traveldetails,
      from: traveldetails.to,
      to: traveldetails.from,
    });
  };
  console.log(traveldetails, "hhhh");

  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  const [time, setTime] = useState(new Date());

  const handleChange = (newTime) => {
    setTime(newTime);
  };
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const openModal = () => {
    console.log("open");
    setModalIsOpen(true);
    dispatch({
      type: SHARE_BUTTON,
      payload: true,
    });
  };

  const closeModal = () => {
    console.log("close");
    setModalIsOpen(false);
    dispatch({
      type: SHARE_BUTTON,
      payload: false,
    });
  };

  const [selectedDate, setSelectedDate] = React.useState(new Date());

  const handleDateChange = (e) => {
    setTraveldetails({
      ...traveldetails,
      date: e.value,
    });
    localStorage.setItem("selectdate", e.value);
  };
  const disablePastDates = (current) => {
    // Can not select days before today and today
    return current && current < new Date().setHours(0, 0, 0, 0);
  };
  let dateValue = new Date();
  // const CalendarContainer = styled.div`
  //   /* ~~~ container styles ~~~ */
  //   max-width: 600px;
  //   margin: auto;
  //   margin-top: 20px;
  //   background-color: #d4f7d4;
  //   padding: 10px;
  //   border-radius: 3px;
  // `;.
  const format = "HH:mm";
  const handleonclick = (item) => {
    console.log(item, "itemitem");
    setTraveldetails({ ...traveldetails, from: item });
    localStorage.setItem("departure", item.label);
    if (localStorage.getItem("departure") == "Chennai") {
      localStorage.setItem("arrival", "Hyderabad");
    } else if (localStorage.getItem("departure") == "Bangalore") {
      localStorage.setItem("arrival", "Goa");
    } else if (localStorage.getItem("departure") == "Pondicherry") {
      localStorage.setItem("arrival", "Coimbatore");
    }
    setOpen(false);
  };
  const tohandleonclick = (item) => {
    console.log(item, "itemitem");
    setTraveldetails({ ...traveldetails, to: item });
    localStorage.setItem("arrival", item.label);

    setToOpen(false);
  };
  const [open, setOpen] = useState(false);
  const [toopen, setToOpen] = useState(false);
  const [filterText, setFilterText] = useState("");
  const [filtereOptions, setFilteredOptions] = useState(options);
  const [filteretoOptions, setFilteredToOptions] = useState(tooptions);
  const content = (
    <div>
      {filtereOptions.length === 0 ? (
        <p>No data found</p>
      ) : (
        filtereOptions.map((item) => (
          <div
            className="flex items-center hover:bg-gray-200 cursor-pointer"
            onClick={() => handleonclick(item)}
            key={item.id} // assuming there's a unique identifier for each item
          >
            <span>
              <FaMapMarkerAlt className="text-[#1F487C]" />
            </span>
            <p className="py-1 text-[1vw] my-1 pl-2">{item.label}</p>
          </div>
        ))
      )}
    </div>
  );
  const handleOpenChange = (newOpen) => {
    console.log(newOpen, "newOpen");
    setOpen(true);
  };
  const tohandleOpenChange = (newOpen) => {
    console.log(newOpen, "newOpen");
    setToOpen(true);
  };
  const tocontent = (
    <div>
      {filteretoOptions.length === 0 ? (
        <p>No data found</p>
      ) : (
        filteretoOptions.map((item) => (
          <div
            className="flex items-center hover:bg-gray-200 mx-2 cursor-pointer"
            onClick={() => tohandleonclick(item)}
            key={item.id} // assuming there's a unique identifier for each item
          >
            <span>
              <FaMapMarkerAlt className="text-[#1F487C]" />
            </span>
            <p className="py-1 text-md my-1 pl-2 ">{item.label}</p>
          </div>
        ))
      )}
    </div>
  );
  const popoverRef = useRef(null);
  const topopoverRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target)) {
        setOpen(false);
      }
      if (
        topopoverRef.current &&
        !topopoverRef.current.contains(event.target)
      ) {
        setToOpen(false);
      }
    };

    document?.addEventListener("click", handleClickOutside);

    return () => {
      document?.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (event) => {
      const { key } = event;
      if (key === "Backspace") {
        setFilterText((prevFilterText) => prevFilterText.slice(0, -1));
      } else {
        setFilterText((prevFilterText) => prevFilterText + key);
      }
    };

    document?.addEventListener("keydown", handleKeyDown);

    return () => {
      document?.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    if (filterText.trim() !== "" || toopen == true) {
      setFilteredToOptions(
        tooptions.filter((item) =>
          item.label.toLowerCase().includes(filterText.toLowerCase())
        )
      );
    } else {
      setFilteredToOptions(tooptions);
    }
  }, [filterText]);
  useEffect(() => {
    if (filterText.trim() !== "" || open == true) {
      setFilteredOptions(
        options.filter((item) =>
          item.label.toLowerCase().includes(filterText.toLowerCase())
        )
      );
    } else {
      setFilteredOptions(options);
    }
  }, [filterText]);
  const [boolean, setBoolean] = useState(false);
  console.log(filterText, "traveldetails");
  useEffect(() => {
    if (toopen == false || open == false) {
      setFilterText("");
    }
  }, [toopen, open]);

  document.addEventListener("DOMContentLoaded", function () {
    const changingText = document.getElementById("changingText");
    if (changingText) {
      function updateTextColor() {
        const currentTime = new Date().getTime();
        const red = Math.sin(currentTime / 1000) * 127 + 128;
        const blue = Math.sin(currentTime / 1000 + Math.PI / 2) * 127 + 128;
        changingText.style.color = `rgb(${red}, 0, ${blue})`;
        requestAnimationFrame(updateTextColor);
      }
      updateTextColor();
    } else {
      console.error("Element with ID 'changingText' not found.");
    }
  });

  // timepicker

  const [showTime, setShowTime] = useState(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (!inputRef.current) return;

    const picker = timePickerInput({
      mode: 12, // Set the mode to 12-hour clock with AM/PM selection
      inputElement: inputRef.current,
    });

    setShowTime(picker);

    if (onTimeChanged) {
      attachChangeEventToValueChange(inputRef.current, onTimeChanged);
    }

    return () => {
      picker.dispose();
    };
  }, [onTimeChanged]);

  const attachChangeEventToValueChange = (input, handler) => {
    Object.defineProperty(input, "value", {
      ...Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value"),
      set: function (val) {
        const oldValue = input.value;
        Object.getOwnPropertyDescriptor(
          HTMLInputElement.prototype,
          "value"
        ).set.apply(this, arguments);
        if (oldValue !== input.value) {
          const time = parseTime(input.value);
          if (time) {
            handler(time.hour, time.minute);
          }
        }
      },
    });
  };

  const parseTime = (time) => {
    const validate = /^\s*\d{1,2}\s*:\s*\d{1,2}\s*((am)|(pm))?\s*$/i;
    if (!time || !validate.test(time)) return null;

    const split = time.split(":");
    let hour = parseInt(split[0]);
    const minute = parseInt(split[1]);

    // Ensure hour is within 12-hour format
    if (hour > 12) {
      hour -= 12;
    } else if (hour === 0) {
      hour = 12;
    }

    // Determine AM/PM
    const amPm = hour >= 12 ? "pm" : "am";

    return { hour, minute, amPm };
  };
  console.log(busdata, "busdata");

  // Get current date
  const currentDate = new Date();
  // Get the start of the current month
  const startOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  );
  // Get the end of the current month
  const endOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  );
  const handleTimeChanged = (hour, minute) => {
    console.log(`Time selected: ${hour}:${minute}`);
  };
  const [TimePickerlist, setTimePickerlist] = useState("");
  const Clockonchange = (time, timString) => {
    console.log(time, "timing");
    console.log(timString, "timStringtimString");
    setTimePickerlist(timString);
    handlefilter(timString);
  };
  const handlefilter = async (timString) => {
    try {
      const payload = {
        // source: localStorage.getItem("departure"),
        De_source: "Chennai",
        Ar_source: "Coimbatore",
        AC: "FALSE",
        NON_AC: "FALSE",
        Seater: "FALSE",
        Sleeper: "FALSE",
        Semi_sleeper: "FALSE",
        pickupPoints: "",
        dropPoints: "",
        selectedOperators: "",
        amenities: "",
        timedeparture: "",
        timeArrival: "",
        price: "FALSE",
        departure: "FALSE",
        arrival: "FALSE",
        seats: "FASLE",
        rating: "FALSE",
        start_time: timString,
        // timedeparture:"6:00 AM to 11:00 AM"
      };
      const place = localStorage.getItem("departure");
      // const response = await axios.get(
      //   place === "Chennai"
      //     ? "http://192.168.90.47:3000/chennai_src"
      //     : place === "Bangalore"
      //     ? "http://192.168.90.47:3000/bangalore_src"
      //     : "http://192.168.90.47:3000/pondicherry_src",
      const response = await axios.get(
        "http://192.168.90.43:8090/bus_Api_Filter",
        // place === "Chennai"
        //   ? "http://192.168.90.43:8090/chennai_src"
        //   : place === "Bangalore"
        //   ? "http://192.168.90.43:8090/bangalore_src"
        //   : "http://192.168.90.43:8090/pondicherry_src",
        {
          params: payload,
        }
      );
      dispatch({
        type: GET_FILTER_DATA,
        payload: response.data,
      });
      console.log("Response", response.data);
    } catch (error) {
      console.error("Error", error);
    }
  };
  useEffect(() => {
    handlefilter();
  }, [localStorage.getItem("departure")]);
  const [modalshow, setModalShow] = useState(false);
  const [selectinput, setSelectInput] = useState("");
  const [inputsearch, setInputSearch] = useState({
    from: "",
    to: "",
  });
  const onClose = () => {
    setModalShow(false);
    setInputSearch({
      ...inputsearch,
      from: "",
      to: "",
    });
  };
  console.log(traveldetails.date, "TimePickerlist");
  const [departurelist, setdepartureList] = useState([]);
  useEffect(() => {
    if (inputsearch.from) {
      if (selectinput == "from") {
        const departuredata = departure_city.filter((item) =>
          item.city.toLowerCase().includes(inputsearch.from.toLowerCase())
        );
        setdepartureList(departuredata);
      } else if (selectinput == "to") {
        const departuredata = arrival_city.filter((item) =>
          item.city.toLowerCase().includes(inputsearch.to.toLowerCase())
        );
        setdepartureList(departuredata);
      }
    } else {
      setdepartureList(selectinput == "from" ? departure_city : arrival_city);
    }
  }, [inputsearch, selectinput]);
  const departure_city = [
    { city: "Chennai", value: "Chennai", state: "Tamilnadu" },
    { city: "Bangalore", value: "Bangalore", state: "Karnataka" },
    { city: "Hyderabad", value: "Hyderabad", state: "Telangana" },
  ];
  const arrival_city = [
    { city: "Coimbatore", value: "Coimbatore", state: "Tamilnadu" },
    { city: "Mumbai", value: "Mumbai", state: "Maharastra" },
    { city: "Kochi", value: "Kochi", state: "Kerala" },
  ];
  const navigation = useNavigate();
  const currentUrl = window.location.href;
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(null);
  console.log(fromDate, "fromDate");

  const handleProPage = () => {
    navigation('/main')
  }

  const [logModalIsOpen, setLogModalIsOpen] = useState(false);
  const openLogModal = () => {
    console.log("open");
    setAccDrawer(false);
    setLogModalIsOpen(true);
  };
  const closeLogModal = () => {
    setLogModalIsOpen(false)
  }

  const items = [
    {
      key: '1',
      label:
        <div className="text-[#1F487C] text-[1.4vw] px-[2vw] flex items-center gap-[1vw]" onClick={handleProPage}>
          <PiUserCircleDuotone color="#1F487C" size="1.5vw" /> My Account
        </div>
    },
    {
      key: '2',
      label:
        <div className="text-[#1F487C] text-[1.4vw] px-[2vw] flex items-center gap-[1vw]" onClick={openLogModal}>
          <FaTicketAlt color="#1F487C" size="1.5vw" /> Bookings
        </div>
    },
    {
      key: '3',
      label:
        <div className="text-[#1F487C] text-[1.4vw] px-[2vw] flex items-center gap-[1vw]" onClick={openLogModal}>
          <RiLogoutCircleLine color="#1F487C" size="1.5vw" /> Logout
        </div>
    },
  ];
  // import { PiUserCircleDuotone } from "react-icons/pi";
  // import { FaTicketAlt } from "react-icons/fa";
  // import { RiLogoutCircleLine } from "react-icons/ri";
  const [accDrawer, setAccDrawer] = useState(false);
  const showAccDrawer = () => {
    setAccDrawer(true);
  };
  const onAccClose = () => {
    setAccDrawer(false);
  };

  const [logMobileIsOpen, setLogMobileIsOpen] = useState(false);
  const openLogMobile = () => {
    console.log("open");
    setAccDrawer(false);
    setLogMobileIsOpen(true);
  };
  const closeLogMobile = () => {
    setLogMobileIsOpen(false)
  }

  return (
    <>
      <div className="fixed w-full z-1" style={{ zIndex: 1 }}>
        <div className="h-[11vw] md:h-[3.3vw] w-full bg-[#E5FFF1] grid grid-cols-10 -z-1000">
          <div
            className="col-span-4 md:col-span-2 flex h-[3.3vw] cursor-pointer"
            onClick={() => navigation("/")}
          >
            {/* <div class="grid grid-rows-2 grid-flow-col"> */}
            {/* <div class="row-span-2">
                <img src={nlogo} className="p-1 w-12 h-[50px]" />
              </div> */}
            {/* <div class="col-span-2 w-full">
                <p className="text-[180%] text-blue-900 font-bold ml-1 w-full">
                  thebusstand.com
                </p>
              </div>
              <div class="row-span-1 col-span-2 text-xs justify-center items-center h-ful">
                <p className="flex text-center ml-1 mt-1">
                  We cover the 100% of the bus routes
                </p>
              </div> */}
            <img
              src={buslogo}
              className="h-[9vw] w-[15-vw] md:h-[3vw] md:w-[5vw]"
            />
            <img
              src={busstand}
              className="object-fill h-[9vw] w-[60vw] py-[0.5] md:py-[0.1vw] md:h-[3vw] md:w-[14vw]"
            />
            {/* </div> */}
          </div>
          <div className="col-span-3 md:col-span-7 overflow-hidden flex items-center justify-center">
            <div className="md:block hidden ">
              <div className=" flex items-center justify-center ">
                <MdStarRate
                  size={"2.5vw"}
                  id="changingText"
                  style={{
                    animation: "colorChange 2s infinite alternate",
                  }}
                />
                <span
                  id="changingText"
                  className="text-[2.1vw] tracking-normal italic px-[0.5vw]"
                  style={{
                    fontFamily: "Calibri",
                    animation: "colorChange 2s infinite alternate",
                  }}
                >
                  We show the best travel rates for the same bus by comparing
                  market apps
                </span>

                <MdStarRate
                  size={"2.5vw"}
                  id="changingText"
                  style={{
                    animation: "colorChange 2s infinite alternate",
                  }}
                />
              </div>
            </div>
            {/* <marquee direction="left" scrollamount="10">
              <div className="flex items-center  ">
                <span className="mx-[0.5vw]">
                  <MdStarRate size={"3vw"} />
                </span>
                <span className="text-[1.5vw] font-semibold italic">
                  We show the best travel rates for the same bus buy comparing
                  market apps
                </span>
                <span className="mx-2">
                  <MdStarRate size={"3vw"} />
                </span>
                <span className="text-[1.5vw] text-blue-900 font-semibold italic">
                  We do not impose any commission on either operators or
                  passengers
                </span>
                <span className="mx-2">
                  <MdStarRate size={"3vw"} />
                </span>
              </div>
            </marquee> */}
          </div>
          <div className="col-span-3 gap-[2vw] md:col-span-1 md:h-[3.3vw] w-full flex md:gap-[1vw] justify-center md:px-[0.5vw] items-center">
            <div className="flex items-center gap-[0.5vw] md:block hidden">
              <img
                src={share}
                className="h-[7vw] w-[7vw] md:h-[2vw] md:w-[2vw] cursor-pointer"
                onClick={openModal}
              />
              {/* <p className="text-[1.1vw] text-[#1F487C] font-bold">Share</p> */}
            </div>
            <div className="flex items-center gap-[0.5vw] md:hidden block">
              <RWebShare
                data={{
                  // text: "Like humans, flamingos make friends for life",
                  url: currentUrl,
                  title: "Share to social media",
                }}
                onClick={() => console.log("shared successfully!")}
              >
                <img
                  src={share}
                  className="h-[7vw] w-[7vw] md:h-[2vw] md:w-[2vw] cursor-pointer"
                // onClick={openModal}
                />
              </RWebShare>
            </div>
            <div className="flex items-center gap-[0.5vw]" onClick={() => navigation('/rewards')}>
              <img
                src={ticket}
                className="h-[7vw] w-[7vw] md:h-[2vw] md:w-[2vw]"
              />
              {/* <p className="text-[1.1vw] text-[#1F487C] font-bold">
                Rewards/Offers
              </p> */}
            </div>
            {/* <div className="justify-center items-center flex"> */}
            {/* <div className="flex items-center gap-[0.5vw]" onClick={() => navigation('/main')}> */}
            <div>
              <div className="md:block hidden">
                <Dropdown
                  menu={{
                    items,
                  }}
                  className="flex items-center gap-[0.5vw]"
                >
                  <a onClick={(e) => e.preventDefault()}>
                    <Space>
                      <img
                        src={profile}
                        className="h-[2vw] w-[2vw]"
                      />
                    </Space>
                  </a>
                </Dropdown>
              </div>





              <div className=" md:hidden block  ">
                <img
                  src={profile}
                  className="h-[7vw] w-[7vw] "
                  onClick={showAccDrawer}
                />
              </div>








            </div>
            {/* <p className="text-[1.1vw] text-[#1F487C] font-bold">
                Login/SignUp
              </p> */}
            {/* </div> */}

          </div>
        </div>
        <div className="h-[12vw] md:h-[4.7vw] w-full bg-[#1F487C] -z-10">
          <div className="md:h-[0.3vw] w-full bg-[#E5FFF1] opacity-90"></div>
          <img
            src={bus}
            className="absolute md:block hidden top-[2.7vw] h-[6.8vw] w-[19vw] object-fill -z-100 left-0"
          />
          <div className="pl-[1vw] md:pl-[19vw] grid grid-cols-12 w-full md:h-[4.5vw] h-[12vw]">
            {/* <div className="col-span-2 w-full"> */}
            {/* </div> */}
            <div className="hidden">
              <div className="col-span-6 md:col-span-4  h-full items-center">
                <div className="grid grid-cols-7 gap-[1vw] md:gap-0 md:grid-cols-5 items-center h-full">
                  <div className="md:block hidden md:col-span-2" ref={popoverRef}>
                    {/* <Select
                    showSearch
                    placeholder="From"
                    optionFilterProp="children"
                    onChange={(value) =>
                      setTraveldetails({ ...traveldetails, from: value })
                    }
                    onSearch={onSearch}
                    filterOption={filterOption}
                    options={options}
                    value={traveldetails.from}
                    className="w-full rounded-[50px]"
                    style={{ backgroundColor: "black", color: "white" }}
                  /> */}

                    <Popover
                      // placement="bottom"
                      // trigger="click"
                      // content={
                      //   <div
                      //     style={{
                      //       width: "170px",
                      //       maxHeight: "250px",
                      //       overflow: "auto",
                      //     }}
                      //   >
                      //     {content}
                      //   </div>
                      // }
                      // className="scrolbar-hide"
                      // onOpenChange={handleOpenChange}
                      placement="bottom"
                      trigger="click"
                      // title={text}
                      content={
                        <div style={{ maxHeight: "10vw", overflow: "auto" }}>
                          {content}
                        </div>
                      }
                      overlayStyle={{ width: "11vw" }}
                      className="scrolbar-hide"
                      onOpenChange={handleOpenChange}
                      open={open}
                    >
                      <div className="relative cursor-pointer top-[1.5vw] md:top-0">
                        <img
                          src={dropdown}
                          className="h-[7.5vw] md:h-[2.7vw] md:w-full "
                        />
                        <p className="absolute top-[1.7vw] text-[2.5vw] md:top-[0.5vw] font-semibold text-white md:text-[1vw] left-1/2 transform -translate-x-1/2">
                          {traveldetails?.from?.value?.toUpperCase()}

                        </p>
                      </div>
                    </Popover>
                  </div>
                  <div
                    className="col-span-3 md:hidden block"
                    onClick={() => {
                      setModalShow(true);
                      setSelectInput("from");
                    }}
                  >
                    <div className="relative cursor-pointer top-[1.5vw] md:top-0">
                      <img
                        src={dropdown}
                        className="h-[7.5vw] md:h-[2.7vw] md:w-full "
                      />
                      <p className="absolute top-[1.7vw] text-[2.5vw] md:top-[0.5vw] font-semibold text-white md:text-[1vw] left-1/2 transform -translate-x-1/2">
                        {traveldetails?.from?.value?.toUpperCase()}
                      </p>
                    </div>{" "}
                  </div>
                  <div className="col-span-1">
                    {/* <div
                    className="bg-white py-2 mx-4  rounded-md flex justify-center items-center cursor-pointer"
                    onClick={handleSwap}
                  >
                    <FaArrowRightArrowLeft />
                  </div> */}
                    <div className="relative flex items-center justify-center cursor-pointer top-[1.5vw] md:top-0">
                      <div
                        // onClick={handleSwap}
                        className=" cursor-not-allowed"
                      >
                        <img
                          src={split}
                          className="w-[7vw] h-[7.5vw] md:h-[2.5vw] md:w-[2.5vw]"
                        />
                        <FaArrowRightArrowLeft
                          color="white"
                          size={"1.2vw"}
                          className="absolute size-[4vw] md:size-[1.2vw] left-[1vw] top-[1.5vw] md:top-[0.6vw] md:left-[2.2vw] transform translate[-50%,-50%]"
                        />
                      </div>
                    </div>
                  </div>
                  <div
                    className="md:block hidden md:col-span-2"
                    ref={topopoverRef}
                  >
                    {/* <Select
                    showSearch
                    placeholder="To"
                    optionFilterProp="children"
                    onChange={(value) =>
                      setTraveldetails({ ...traveldetails, to: value })
                    }
                    onSearch={onSearch}
                    filterOption={filterOption}
                    options={options}
                    value={traveldetails.to}
                    className="w-full"
                  /> */}
                    <Popover
                      placement="bottom"
                      trigger="click"
                      // title={text}
                      content={
                        <div
                          style={{
                            maxHeight: "10vw",
                            overflow: "auto",
                            padding: "0px",
                          }}
                        >
                          {tocontent}
                        </div>
                      }
                      overlayStyle={{ width: "11vw", padding: "0px" }}
                      onOpenChange={tohandleOpenChange}
                      open={toopen}
                    >
                      <div className="relative cursor-pointer top-[1.5vw] md:top-0">
                        <img
                          src={dropdown}
                          className="h-[7.5vw] md:h-[2.7vw] w-full "
                        />
                        <p className="absolute top-[1.7vw] text-[2.5vw] md:top-[0.6vw] font-semibold text-white md:text-[1vw] left-1/2 transform -translate-x-1/2">
                          {/* {traveldetails?.to?.value?.toUpperCase()} */}
                          Coimbatore
                        </p>
                      </div>
                    </Popover>
                  </div>
                  <div
                    className="col-span-3 md:hidden block"
                    onClick={() => {
                      setModalShow(true);
                      setSelectInput("to");
                    }}
                  >
                    <div className="relative cursor-pointer top-[1.5vw] md:top-0">
                      <img
                        src={dropdown}
                        className="h-[7.5vw] md:h-[2.7vw] w-full "
                      />
                      <p className="absolute top-[1.7vw] text-[2.5vw] md:top-[0.6vw] font-semibold text-white md:text-[1vw] left-1/2 transform -translate-x-1/2">
                        {traveldetails?.to?.value?.toUpperCase()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="md:block hidden md:col-span-3"></div>
              <div className="col-span-6 md:pl-0 md:col-span-5">
                <div className="grid grid-cols-6 md:grid-cols-3 gap-[1vw] items-center h-full ">
                  <div className="col-span-3 pl-[5vw] md:hidden block bg-green-400 w-full">
                    {/* <DatePicker
                    format={{
                      format: "MMM-DD",
                      type: "mask",
                    }}
                    className="w-[21vw] top-[2vw]"
                    onChange={onChange}
                  /> */}
                    {/* <DatePicker
                    // open
                    format={{
                      format: "DD-MM-YYYY",
                      type: "mask",
                    }}
                    className=" h-[7vw] outline-none createDateRangePicker"
                    disabledDate={disablePastDates}
                    // value={traveldetails?.date}
                    // onChange={handleDateChange}
                    placeholder="Select Date"
                    dropdownClassName="custom-date-picker-dropdown" // style={{
                    //   backgroundColor:"blue"
                    // }}
                  /> */}
                    {/* <DateInput value={fromDate} onChange={setFromDate} /> */}
                  </div>

                  <div className="col-span-3  md:hidden block">
                    {/* <TimePicker
                    // defaultValue={dayjs('12:08', format)}
                    format={format}
                    placeholder="Select time"
                    className="w-[21vw] top-[2vw]"
                    onChange={Clockonchange}
                  /> */}
                    {/* <TimePickerComponent onTimeChanged={handleTimeChanged} /> */}
                  </div>

                  <div className="md:block hidden md:col-span-1">
                    {/* <DatePicker
                    onChange={(date, dateString) =>
                      setTraveldetails({
                        ...traveldetails,
                        date: dateString,
                      })
                    }
                    style={{
                      width: "100%",
                      borderRadius: "0.8vw",
                    }}
                    format={"DD MMMM YYYY"}
                    className="custom-timepicker text-[1vw] h-[4.7vh]"
                    popupStyle={{
                      backgroundColor: "red",
                    }}
                    suffixIcon={
                      <img src={date} className="w-[1.2vw] h-[2.4vh]" />
                    }
                  /> */}
                    {/* <Calendar
                    value={traveldetails.date}
                    onChange={handleDateChange}
                    placeholder="Select Date"
                    dateFormat="dd/mm/yy"
                    className=" h-[2.3vw]"
                    // className="md:block hidden h-[6.5vw] md:w-[10vw] w-[30.5vw] md:h-[2.5vw] top-[2vw] md:top-0"
                  /> */}
                    {/* <DatePicker
                    open
                    format={{
                      format: "DD-MM-YYYY",
                      type: "mask",
                    }}
                    className=" h-[2.3vw] outline-none createDateRangePicker"
                    disabledDate={disablePastDates}
                    // value={traveldetails?.date}
                    // onChange={handleDateChange}
                    placeholder="Select Date"
                    dropdownClassName="custom-date-picker-dropdown" // style={{
                    //   backgroundColor:"blue"
                    // }}
                  /> */}
                    <div className="md:col-span-1 mr-[1vw] md:block hidden mt-[0.2vw]">
                      <div className="bg-white w-full  h-[2.3vw]  rounded-[0.5vw] text-[1.1vw]">
                        <DateInput value={fromDate} onChange={setFromDate} />
                      </div>
                    </div>
                    {/* <CalendarComponent value={dateValue} /> */}
                    {/* <input
                    type="date"
                    style={{
                      // backgroundColor: "blue",
                      color: "blue",
                    }}
                    className="px-2 rounded-md py-1 outline-none custom-date-input"
                  /> */}
                  </div>
                  {/* <div className="md:col-span-1 md:block hidden relative"> */}
                  {/* <input
                    className="w-full px-2 py-1 rounded-md"
                    type="time"
                    onChange={(e) =>
                      setTraveldetails({
                        ...traveldetails,
                        time: e.target.value,
                      })
                    }
                  /> */}
                  {/* <TimePicker
                    // defaultValue={dayjs("12:08", format)}
                    format={format}
                    style={{
                      borderRadius: "0.5vw",
                    }}
                    placeholder="Select time"
                    suffixIcon={
                      <IoMdTime className="text-black size-[4.5vw] md:size-[1.3vw]" />
                    }
                    onChange={Clockonchange}
                    className="md:block hidden h-[6.6vw] top-[2vw] md:top-0 text-[1vw] w-[13vw] md:w-full md:text-[1vw] md:h-[2.3vw]"
                  /> */}
                  {/* <input
                    {...inputProps}
                    ref={inputRef}
                    className="text-white bg-white border-[0.1vw] py-[0.2vw] w-[90%] rounded-lg"
                  /> */}
                  {/* <TimePickerComponent onTimeChanged={handleTimeChanged} /> */}
                  {/* <ResponsiveTimePickers /> */}
                  {/* <TimePicker.RangePicker
                    format="HH:mm"
                    placeholder={["Start", "End"]}
                    showNow={true}
                  /> */}
                  {/* <TimePick /> */}
                  {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <MobileTimePicker
                      defaultValue={dayjs("2022-04-17T15:30")}
                      className="bg-white h-[30px] rounded-md items-center justify-center text-center"
                    />
                  </LocalizationProvider> */}
                  {/* </div> */}
                  <div className="md:col-span-1 mr-[1vw] md:block hidden">
                    <button
                      className="bg-white text-black w-full  h-[2.3vw]  rounded-[0.5vw] text-[1.1vw]"
                      onClick={handleSearch}
                    >
                      Search
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="md:col-span-5 grid md:grid-cols-5 col-span-7 grid-cols-7 gap-[1vw] content-center">
              <div className="md:col-span-2 col-span-3">
                <Select
                  showSearch
                  value={fromValue}
                  onChange={(value) => setFromValue(value)}
                  style={{
                    width: "100%",
                    height: "100%",
                    color: "red  ",
                    fontSize: "1.2vw"
                  }}
                  className="text-[1vw]"
                  placeholder="Search to Select"
                  optionFilterProp="label"
                  filterSort={(optionA, optionB) =>
                    (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                  }
                  // options={[
                  //   {
                  //     value: toValue,
                  //     label: toValue,
                  //   },
                  //   {
                  //     value: '2',
                  //     label: 'Closed',
                  //   },
                  //   {
                  //     value: '3',
                  //     label: 'Communicated',
                  //   },
                  //   {
                  //     value: '4',
                  //     label: 'Identified',
                  //   },
                  //   {
                  //     value: '5',
                  //     label: 'Resolved',
                  //   },
                  //   {
                  //     value: '6',
                  //     label: 'Cancelled',
                  //   },
                  // ]}
                  options={options}
                />
              </div>
              <div className="md:col-span-1 col-span-1 content-center ">
                <div className=" relative flex items-center justify-center cursor-pointer ">
                  <div
                    // onClick={handleSwap}
                    className=" cursor-not-allowed"
                  >
                    <img
                      src={split}
                      className="w-[7vw] h-[7.5vw] md:h-[2.5vw] md:w-[2.5vw]"
                    />
                    <FaArrowRightArrowLeft
                      color="white"
                      size={"1.2vw"}
                      className="absolute size-[4vw] md:size-[1.2vw] left-[1.3vw] top-[1.8vw] md:top-[0.7vw] md:left-[2.3vw] transform translate[-50%,-50%]"
                    />
                  </div>
                </div>

              </div>
              <div className="md:col-span-2 col-span-3 content-center">
                <Select
                  showSearch
                  value={toValue}
                  onChange={(value) => setToValue(value)}
                  style={{
                    width: "100%",
                    height: "100%",
                    color: "red  ",
                    fontSize: "1.2vw"
                  }}
                  className="text-[1vw]"
                  placeholder="Search to Select"
                  optionFilterProp="label"
                  filterSort={(optionA, optionB) =>
                    (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                  }
                  // options={[
                  //   {
                  //     value: toValue,
                  //     label: toValue,
                  //   },
                  //   {
                  //     value: '2',
                  //     label: 'Closed',
                  //   },
                  //   {
                  //     value: '3',
                  //     label: 'Communicated',
                  //   },
                  //   {
                  //     value: '4',
                  //     label: 'Identified',
                  //   },
                  //   {
                  //     value: '5',
                  //     label: 'Resolved',
                  //   },
                  //   {
                  //     value: '6',
                  //     label: 'Cancelled',
                  //   },
                  // ]}
                  options={tooptions}
                />
              </div>
            </div>
            <div className="col-span-3"></div>
            <div className="md:block hidden col-span-4 content-center">
              <div className="grid grid-cols-4 gap-[1vw]  px-[0.5vw] ">
                <div className="col-span-2">
                  <div className="bg-white w-full  h-[2.3vw] rounded-[0.5vw] text-[1.1vw]">
                    <DateInput value={fromDate} onChange={setFromDate} />
                  </div>
                </div>
                <div className="col-span-2">
                  <div
                    className="bg-white w-full  h-[2.3vw]  rounded-[0.5vw] text-[1.1vw] flex items-center justify-center cursor-pointer"
                    onClick={handleSearch}
                  >
                    Search
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          },
          content: {
            height: "28vw",
            width: "32vw",
            margin: "12vw 40vw",
          },
        }}
      >
        <ShareButtons url={"http://localhost:3008/"} />
      </Modal>

      <Drawer
        // title="Basic Drawer"
        placement={"right"}
        closable={true}
        onClose={onAccClose}
        open={accDrawer}
        key={"right"}
        width={"75%"}
        className="custom-drawer"
      >
        <div className="grid grid-rows-3 gap-y-[2vw]">
          <div className="text-[#1F487C] text-[5vw] px-[2vw] flex items-center gap-[5vw]">
            <PiUserCircleDuotone color="#1F487C" size="5vw" /> My Account
          </div>
          <div className="text-[#1F487C] text-[5vw] px-[2vw] flex items-center gap-[5vw]" >
            <FaTicketAlt color="#1F487C" size="5vw" /> Bookings
          </div>
          <div className="text-[#1F487C] text-[5vw] px-[2vw] flex items-center gap-[5vw]" onClick={openLogMobile}>
            <RiLogoutCircleLine color="#1F487C" size="5vw" /> Logout
          </div>
        </div>
      </Drawer>

      <Drawer
        // title="Basic Drawer"
        placement={"bottom"}
        closable={true}
        onClose={closeLogMobile}
        open={logMobileIsOpen}
        key={"right"}
        width={"50%"}
        className="custom-drawer"
      >
        <div className=" flex flex-col items-center gap-y-[5vw]">
          <div className="font-bold text-[5vw] text-[#1F487C]">Are you Sure you want to Log Out ?</div>
          <div className="text-[4vw] px-[10vw] text-center text-[#1F487C]">Tickets Booking is Faster when you are Logged In</div>
          <button className=" bg-[#1F487C] text-[4vw] w-3/4 h-[10vw] text-white rounded-md font-bold">Yes, Log Out</button>
          <button className="  border-[0.2vw] border-[#1F487C] text-[4vw] w-3/4 h-[10vw] text-[#1F487C] rounded-md font-bold">Cancel</button>
        </div>
      </Drawer>

      <Modal
        isOpen={logModalIsOpen}
        onRequestClose={closeLogModal}
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          },
          content: {
            height: "23vw",
            width: "auto",
            margin: "8vw 30vw",
          },
        }}
      >
        <div className=" flex flex-col items-center gap-y-[1vw]">
          <div className="font-bold text-[1.7vw] text-[#1F487C]">Are you Sure you want to Log Out ?</div>
          <div className="text-[1.2vw] px-[4vw] text-center text-[#1F487C]">Tickets Booking is Faster when you are Logged In</div>
          <button className=" bg-[#1F487C] text-[1.4vw] w-[20vw] h-[3.5vw] text-white rounded-full font-bold ">Yes, Log Out</button>
          <button className="  border-[0.2vw] border-[#1F487C] text-[1.4vw] w-[20vw] h-[3.5vw] text-[#1F487C] rounded-full font-bold">Cancel</button>
        </div>
      </Modal>

      <Drawer
        // title="Basic Drawer"
        placement={"right"}
        closable={false}
        onClose={onClose}
        open={modalshow}
        key={"right"}
        width={"100%"}
        className="custom-drawer"
      >
        <div className="bg-[#E5FFF1] w-full h-full">
          <div className="h-[15vw] w-full bg-[#1F487C] relative items-center flex justify-center">
            <span className="absolute left-[5vw]">
              <FaArrowLeft
                color="white"
                size={"6vw"}
                onClick={() => {
                  setModalShow(false);
                }}
              />
            </span>
            <p className="text-[5vw] font-semibold text-white">
              Choose your city
            </p>
          </div>
          <div className="">
            {/* <Input
              prefix={<CiSearch size={"6vw"} color="" />}
              placeholder="Search for city"
              // className="text-[4vw] h-[12vw] pl-[3vw] rounded-full outline-none custom-search"
              className="text-[4vw] h-[12vw] rounded-full outline-none custom-search custom-placeholder"
              // onChange={(e) =>
              //   setSearchValue({
              //     ...searchvalue,
              //     pickup: e.target.value,
              //   })
              // }
            /> */}
            <div className="relative items-center flex  bg-[#E5FFF1] w-full justify-center h-[18vw]">
              <CiSearch
                size={"6vw"}
                color="#1F487C"
                className="absolute left-[6vw]"
              />
              <input
                placeholder="Search your city"
                className="text-[5vw] h-[12vw] pl-[12vw] w-[95%] bg-white rounded-full outline-none border-[0.1vw] border-[#1F487C]  custom-search custom-placeholder"
                onChange={(e) => {
                  setInputSearch({
                    ...inputsearch,
                    from: e.target.value,
                  });
                }}
              // value={inputsearch.from}
              />
            </div>
            <div className="h-[100%]  w-full">
              {departurelist.map((item, i) => (
                <>
                  <div
                    className="flex items-center px-[5vw] py-[2vw] bg-white"
                    onClick={() => {
                      selectinput == "from"
                        ? localStorage.setItem("departure", item.city)
                        : localStorage.setItem("arrival", item.city);
                      setModalShow(false);
                      setInputSearch({
                        ...inputsearch,
                        from: "",
                      });
                    }}
                  >
                    <span>
                      <LiaCitySolid size={"6.5vw"} />
                    </span>
                    <div className="flex-col items-center pl-[2vw]">
                      <p key={i} className="text-[5vw] pl-[2vw]">
                        {item.city}
                      </p>
                      <p
                        key={i}
                        className=" text-gray-500 text-[3.5vw] pl-[2vw] "
                      >
                        {item.state}
                      </p>
                    </div>
                  </div>
                  <div className="border-b-[0.2vw] border-gray-400 w-full"></div>
                </>
              ))}
            </div>
          </div>
        </div>
      </Drawer>
    </>
  );
};
export default MainNavbar;
