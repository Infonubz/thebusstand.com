// import bus from "../../assets/bus.png";
import { FaArrowRightArrowLeft } from "react-icons/fa6";
import "react-calendar/dist/Calendar.css"; // Import the styles
import "tailwindcss/tailwind.css"; // Make sure you have Tailwind CSS imported in your project
import React, { useEffect, useMemo, useRef, useState } from "react";
import { ConfigProvider, Drawer, Popover, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import ShareButtons from "../Common-Functions/ShareButton";
import Modal from "react-modal";
import "reactjs-popup/dist/index.css"; // Importing the default styling
import dropdown from "../../../Assets/Navbar-Two/dropdown.png";
import { FaArrowLeft, FaArrowRight, FaMapMarkerAlt } from "react-icons/fa";
import split from "../../../Assets/Navbar-Two/split.png";
// import "../../Components/MainComponenet/Datepicker.css";
// import "../../Components/MainComponenet/TimePicker.css";
import { useLocation, useNavigate, useParams } from "react-router";
import DateInput from "../DatePicker/Components/DateInput";
import "../DatePicker/style.css";
import { CiSearch } from "react-icons/ci";
import { LiaCitySolid } from "react-icons/lia";
import { PiUserCircleDuotone } from "react-icons/pi";
import { FaTicketAlt } from "react-icons/fa";
import { RiLogoutCircleLine } from "react-icons/ri";
// import { SendTravelDetails } from "../../Api/Dashboard/Dashboard";
import Calendar from "react-calendar";
// import newbus from "../../assets/newbus.png";
import newbus1 from "../../../Assets/Navbar-Two/newbus1.png";
import "../../../App.css";
import Navbar_One from "./Navbar-One";
import "./CSS/Navbar-Two.css";
import SVG_List from "../../Common/SVG/SVG";
import { Abhibus_GetBusList } from "../../../Api-Abhibus/Home/HomePage";
import dayjs from "dayjs";
export const Navbar_Two = ({ loading, onTimeChanged, ...inputProps }) => {
  // const [startDate, setStartDate] = useState(new Date());
  const location = useLocation();
  const currentplace = location.state?.currentplace || "";
  console.log(currentplace, "currentplace");
  const [traveldetails, setTraveldetails] = useState({
    from: { label: "", value: "" },
    to: { label: "", value: "" },
    date: "",
    time: "",
  });
  const [toValue, setToValue] = useState("");
  const [fromValue, setFromValue] = useState("");
  const busdata = useSelector((state) => state.bus_data);
  const [toBus, setToBus] = useState("");
  const [modifyBtn, setModifyBtn] = useState(false);
  const dispatch = useDispatch();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isInputFromFocused, setIsInputFromFocused] = useState(false);
  const [isInputToFocused, setIsInputToFocused] = useState(false);
  const Get_Stations = useSelector((state) => state.get_stations);
  const SVG = SVG_List();
  const currentpath = useParams();

  const [busdatas, setBusDatas] = useState({
    from: currentpath?.source_name,
    to: currentpath?.destination_name,
    from_sourceID: currentpath?.source_ID,
    to_sourceID: currentpath?.destionation_ID,
    date: currentpath?.trip_date,
  });

  const all = [
    {
      value: "Coimbatore",
      label: "Coimbatore",
    },
    {
      value: "Hyderabad",
      label: "Hyderabad",
    },
    {
      value: "Bangalore",
      label: "Bangalore",
    },
  ];
  const Coimbatore = [
    {
      value: "Coimbatore",
      label: "Coimbatore",
    },
  ];
  const Hyderabad = [
    {
      value: "Hyderabad",
      label: "Hyderabad",
    },
  ];
  const Bangalore = [
    {
      value: "Bangalore",
      label: "Bangalore",
    },
  ];

  const options = useMemo(
    () => [
      { value: "Chennai", label: "Chennai" },
      { value: "Bangalore", label: "Bangalore" },
      { value: "Pondicherry", label: "Pondicherry" },
    ],
    []
  );

  const tooptions = useMemo(
    () => [
      { value: "Coimbatore", label: "Coimbatore" },
      { value: "Goa", label: "Goa" },
      { value: "Hyderabad", label: "Hyderabad" },
    ],
    []
  );

  const handleChangeToValue = (value) => {
    setToValue(value);
    // localStorage.setItem("arrival", value);
    console.log(value, "tooovalue");
  };

  const handleChangeFromValue = (value) => {
    setFromValue(value);

    if (value === "Pondicherry") {
      console.log(value, "busdatas");
      setToBus(Coimbatore);
    } else if (value === "Bangalore") {
      setToBus(Hyderabad);
    } else if (value === "Chennai") {
      setToBus(Bangalore);
    } else {
      setToBus(all);
    }
    // localStorage.setItem("departure", value);
  };

  const handleChangeDateValue = (value) => {
    // setFromDate(value);
    setBusDatas({
      ...busdatas,
      date: value,
    });
    // localStorage.setItem("selectdate", value);
    console.log(value, "selectdate");
  };

  // useEffect(()=>{
  //  localStorage.setItem("arrival", value);
  // localStorage.setItem("selectdate", value);
  // localStorage.setItem("departure", value);

  // },[])

  useEffect(() => {
    // Retrieve the current date string from localStorage
    let dateTimeString = localStorage.getItem("selectdate");

    if (dateTimeString) {
      // Parse the string into a Date object
      let dateObj = new Date(dateTimeString);

      // Format the date to "YYYY-MM-DD HH:mm:ss"
      let formattedDate =
        dateObj.getFullYear() +
        "-" +
        ("0" + (dateObj.getMonth() + 1)).slice(-2) +
        "-" +
        ("0" + dateObj.getDate()).slice(-2) +
        " " +
        ("0" + dateObj.getHours()).slice(-2) +
        ":" +
        ("0" + dateObj.getMinutes()).slice(-2) +
        ":" +
        ("0" + dateObj.getSeconds()).slice(-2);

      // Store the formatted date back in localStorage
      localStorage.setItem("selectdate", formattedDate);

      // Send the travel details
      //   SendTravelDetails(
      //     dispatch,
      //     localStorage.getItem("departure"),
      //     localStorage.getItem("arrival"),
      //     formattedDate
      //   );

      // Update travel details state
      setTraveldetails({
        from: {
          label: localStorage.getItem("departure") || "",
          value: localStorage.getItem("departure") || "",
        },
        to: {
          label: localStorage.getItem("arrival") || "",
          value: localStorage.getItem("arrival") || "",
        },
        date: new Date(formattedDate),
      });
    }
  }, [dispatch, modifyBtn]);

  useEffect(() => {
    const storedDeparture = localStorage.getItem("departure");
    const storedArrival = localStorage.getItem("arrival");
    const storedDate = localStorage.getItem("selectdate");

    setTraveldetails((prevDetails) => ({
      ...prevDetails,
      from: { label: storedDeparture, value: storedDeparture },
      to: { label: storedArrival, value: storedArrival },
      date: new Date(storedDate),
    }));
  }, [modifyBtn]);

  useEffect(() => {
    // Update the state when traveldetails.to.value or traveldetails.from.value changes
    setToValue(traveldetails.to.value);
    setFromValue(traveldetails.from.value);
    console.log(toValue, "traveldetailsto");
    console.log(fromValue, "traveldetailsfrom");

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [traveldetails.to.value, traveldetails.from.value]);

  // const onSearch = (value) => {
  //   console.log("search:", value);
  // };

  //   const handleSearch = () => {
  //     sessionStorage.setItem("spinner", "true");
  //     localStorage.setItem("arrival", toValue);
  //     localStorage.setItem("selectdate", fromDate);
  //     localStorage.setItem("departure", fromValue);
  //     dispatch({
  //       type: BUS_SEARCH,
  //       payload: traveldetails,
  //     });
  //     dispatch({
  //       type: SEARCH_BUTTON,
  //       payload: false,
  //     });
  //     // handlefilter();
  //     localStorage.setItem("search", false);
  //     setTimeout(() => {
  //       sessionStorage.setItem("spinner", "false");
  //     }, 1000);
  //   };
  const handleSearch = async () => {
    try {
      const data = await Abhibus_GetBusList(
        dispatch,
        busdatas,
        busdatas?.date
        // luxury
      );
      console.log(data, "datadatadata");
      // if (data?.status === "success") {
      navigation(
        `/buslist/${busdatas.from}/${busdatas.from_sourceID}/${busdatas.to}/${
          busdatas.to_sourceID
        }/${dayjs(busdatas?.date).format("YYYY-MM-DD")}`
      );
      // }
    } catch {
      console.error("Error fetching additional user data");
    }
    localStorage.setItem("departure", busdatas.from);
    localStorage.setItem("arrival", busdatas.to);
    localStorage.setItem("departureID", busdatas.from_sourceID);
    localStorage.setItem("arrivalID", busdatas.to_sourceID);
  };
  // const onChange = (date, dateString) => {
  //   console.log(date, dateString);
  // };
  // const handleSwap = () => {
  //   setTraveldetails({
  //     ...traveldetails,
  //     from: traveldetails.to,
  //     to: traveldetails.from,
  //   });
  // };

  // const filterOption = (input, option) =>
  //   (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  // const [time, setTime] = useState(new Date());

  // const handleChange = (newTime) => {
  //   setTime(newTime);
  // };

  // const openModal = () => {
  //   console.log("open");
  //   setModalIsOpen(true);
  //   dispatch({
  //     type: SHARE_BUTTON,
  //     payload: true,
  //   });
  // };

  const closeModal = () => {
    console.log("close");
    setModalIsOpen(false);
    // dispatch({
    //   type: SHARE_BUTTON,
    //   payload: false,
    // });
  };

  // const [selectedDate, setSelectedDate] = React.useState(new Date());

  // const handleDateChange = (e) => {
  //   setTraveldetails({
  //     ...traveldetails,
  //     date: e.value,
  //   });
  //   localStorage.setItem("selectdate", e.value);
  // };
  // const disablePastDates = (current) => {
  //   // Can not select days before today and today
  //   return current && current < new Date().setHours(0, 0, 0, 0);
  // };
  // let dateValue = new Date();
  // const CalendarContainer = styled.div`
  //   /* ~~~ container styles ~~~ */
  //   max-width: 600px;
  //   margin: auto;
  //   margin-top: 20px;
  //   background-color: #d4f7d4;
  //   padding: 10px;
  //   border-radius: 3px;
  // `;.
  // const format = "HH:mm";
  const handleonclick = (item) => {
    console.log(item, "itemitem");
    setTraveldetails({ ...traveldetails, from: item });
    localStorage.setItem("departure", item.label);
    if (localStorage.getItem("departure") === "Chennai") {
      localStorage.setItem("arrival", "Hyderabad");
    } else if (localStorage.getItem("departure") === "Bangalore") {
      localStorage.setItem("arrival", "Goa");
    } else if (localStorage.getItem("departure") === "Pondicherry") {
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
    if (filterText.trim() !== "" || toopen === true) {
      setFilteredToOptions(
        tooptions.filter((item) =>
          item.label.toLowerCase().includes(filterText.toLowerCase())
        )
      );
    } else {
      setFilteredToOptions(tooptions);
    }
  }, [filterText, toopen, tooptions]);

  useEffect(() => {
    if (filterText.trim() !== "" || open === true) {
      setFilteredOptions(
        options.filter((item) =>
          item.label.toLowerCase().includes(filterText.toLowerCase())
        )
      );
    } else {
      setFilteredOptions(options);
    }
  }, [filterText, open, options]);

  // const [boolean, setBoolean] = useState(false);
  console.log(filterText, "traveldetails");
  useEffect(() => {
    if (toopen === false || open === false) {
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

  // const [showTime, setShowTime] = useState(null);
  // const inputRef = useRef(null);

  // useEffect(() => {
  //   if (!inputRef.current) return;

  //   const picker = timePickerInput({
  //     mode: 12, // Set the mode to 12-hour clock with AM/PM selection
  //     inputElement: inputRef.current,
  //   });

  //   setShowTime(picker);

  //   if (onTimeChanged) {
  //     attachChangeEventToValueChange(inputRef.current, onTimeChanged);
  //   }

  //   return () => {
  //     picker.dispose();
  //   };
  // }, [onTimeChanged]);

  // const attachChangeEventToValueChange = (input, handler) => {
  //   Object.defineProperty(input, "value", {
  //     ...Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value"),
  //     set: function (val) {
  //       const oldValue = input.value;
  //       Object.getOwnPropertyDescriptor(
  //         HTMLInputElement.prototype,
  //         "value"
  //       ).set.apply(this, arguments);
  //       if (oldValue !== input.value) {
  //         const time = parseTime(input.value);
  //         if (time) {
  //           handler(time.hour, time.minute);
  //         }
  //       }
  //     },
  //   });
  // };

  // const parseTime = (time) => {
  //   const validate = /^\s*\d{1,2}\s*:\s*\d{1,2}\s*((am)|(pm))?\s*$/i;
  //   if (!time || !validate.test(time)) return null;

  //   const split = time.split(":");
  //   let hour = parseInt(split[0]);
  //   const minute = parseInt(split[1]);

  //   // Ensure hour is within 12-hour format
  //   if (hour > 12) {
  //     hour -= 12;
  //   } else if (hour === 0) {
  //     hour = 12;
  //   }

  //   // Determine AM/PM
  //   const amPm = hour >= 12 ? "pm" : "am";

  //   return { hour, minute, amPm };
  // };
  console.log(busdata, "busdata");

  // Get current date
  // const currentDate = new Date();
  // Get the start of the current month
  // const startOfMonth = new Date(
  //   currentDate.getFullYear(),
  //   currentDate.getMonth(),
  //   1
  // );
  // Get the end of the current month
  // const endOfMonth = new Date(
  //   currentDate.getFullYear(),
  //   currentDate.getMonth() + 1,
  //   0
  // );
  // const handleTimeChanged = (hour, minute) => {
  //   console.log(`Time selected: ${hour}:${minute}`);
  // };
  // const [TimePickerlist, setTimePickerlist] = useState("");
  // const Clockonchange = (time, timString) => {
  //   console.log(time, "timing");
  //   console.log(timString, "timStringtimString");
  //   setTimePickerlist(timString);
  //   handlefilter(timString);
  // };
  // const handlefilter = async (timString) => {
  //   try {
  //     const payload = {
  //       // source: localStorage.getItem("departure"),
  //       De_source: "Chennai",
  //       Ar_source: "Coimbatore",
  //       AC: "FALSE",
  //       NON_AC: "FALSE",
  //       Seater: "FALSE",
  //       Sleeper: "FALSE",
  //       Semi_sleeper: "FALSE",
  //       pickupPoints: "",
  //       dropPoints: "",
  //       selectedOperators: "",
  //       amenities: "",
  //       timedeparture: "",
  //       timeArrival: "",
  //       price: "FALSE",
  //       departure: "FALSE",
  //       arrival: "FALSE",
  //       seats: "FASLE",
  //       rating: "FALSE",
  //       start_time: timString,
  //       // timedeparture:"6:00 AM to 11:00 AM"
  //     };
  //     // const place = localStorage.getItem("departure");
  //     // const response = await axios.get(
  //     //   place === "Chennai"
  //     //     ? "http://192.168.90.47:3000/chennai_src"
  //     //     : place === "Bangalore"
  //     //     ? "http://192.168.90.47:3000/bangalore_src"
  //     //     : "http://192.168.90.47:3000/pondicherry_src",
  //     const response = await axios.get(
  //       "http://192.168.90.43:8090/bus_Api_Filter",
  //       // place === "Chennai"
  //       //   ? "http://192.168.90.43:8090/chennai_src"
  //       //   : place === "Bangalore"
  //       //   ? "http://192.168.90.43:8090/bangalore_src"
  //       //   : "http://192.168.90.43:8090/pondicherry_src",
  //       {
  //         params: payload,
  //       }
  //     );
  //     dispatch({
  //       type: GET_FILTER_DATA,
  //       payload: response.data,
  //     });
  //     console.log("Response", response.data);
  //   } catch (error) {
  //     console.error("Error", error);
  //   }
  // };
  //const depature = localStorage.getItem("departure");

  // const handlefilter = useCallback(() => {
  //   // Your filter logic here
  // }, []);

  // useEffect(() => {
  //   handlefilter();
  // }, [depature]);

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
    const departure_city = [
      { city: "Chennai", value: "Chennai", state: "Tamilnadu" },
      { city: "Bangalore", value: "Bangalore", state: "Karnataka" },
      { city: "Hyderabad", value: "Hyderabad", state: "Telangana" },
      { city: "Pondicherry", value: "Pondicherry", state: "Tamilnadu" },
    ];
    const arrival_city = [
      { city: "Coimbatore", value: "Coimbatore", state: "Tamilnadu" },
      { city: "Mumbai", value: "Mumbai", state: "Maharastra" },
      { city: "Kochi", value: "Kochi", state: "Kerala" },
    ];

    if (inputsearch.from) {
      if (selectinput === "from") {
        const departuredata = departure_city.filter((item) =>
          item.city.toLowerCase().includes(inputsearch.from.toLowerCase())
        );
        setdepartureList(departuredata);
      } else if (selectinput === "to") {
        const departuredata = arrival_city.filter((item) =>
          item.city.toLowerCase().includes(inputsearch.to.toLowerCase())
        );
        setdepartureList(departuredata);
      }
    } else {
      setdepartureList(selectinput === "from" ? departure_city : arrival_city);
    }
  }, [inputsearch, selectinput]);

  const navigation = useNavigate();
  // const currentUrl = window.location.href;
  const [fromDate, setFromDate] = useState(localStorage.getItem("selectdate"));
  // const [toDate, setToDate] = useState(null);
  console.log(fromDate, "fromDate");
  const dateSelected = sessionStorage.getItem("departure_date");
  // const handleProPage = () => {
  //   navigation("/main", { state: { tabIndex: 1 } });
  // };

  // const handleBookingPage = () => {
  //   navigation("/main", { state: { tabIndex: 3 } });
  // };

  const [logModalIsOpen, setLogModalIsOpen] = useState(false);
  // const openLogModal = () => {
  //   console.log("openhomeee");
  //   setAccDrawer(false);
  //   setLogModalIsOpen(true);
  //   sessionStorage.clear();
  //   localStorage.clear();
  //   navigation("/");
  //   toast.success("Logout Successfully");
  // };
  const closeLogModal = () => {
    setLogModalIsOpen(false);
  };
  const handleflip = () => {
    // Swap the 'from' and 'to' values in busdatas
    const newBusDatas = {
      ...busdatas,
      from: busdatas.to,
      to: busdatas.from,
      from_sourceID: busdatas.to_sourceID,
      to_sourceID: busdatas.from_sourceID,
    };

    // Update the busdatas state
    setBusDatas(newBusDatas);
  };

  // const items = [
  //   {
  //     key: "1",
  //     label: (
  //       <div
  //         className="text-[#1F487C] text-[1.4vw] px-[2vw] flex items-center gap-[1vw]"
  //         onClick={handleProPage}
  //       >
  //         <PiUserCircleDuotone color="#1F487C" size="1.5vw" /> My Account
  //       </div>
  //     ),
  //   },
  //   {
  //     key: "2",
  //     label: (
  //       <div
  //         className="text-[#1F487C] text-[1.4vw] px-[2vw] flex items-center gap-[1vw]"
  //         onClick={handleBookingPage}
  //       >
  //         <FaTicketAlt color="#1F487C" size="1.5vw" /> Bookings
  //       </div>
  //     ),
  //   },
  //   {
  //     key: "3",
  //     label: (
  //       <div
  //         className="text-[#1F487C] text-[1.4vw] px-[2vw] flex items-center gap-[1vw]"
  //         onClick={openLogModal}
  //       >
  //         <RiLogoutCircleLine color="#1F487C" size="1.5vw" /> Logout
  //       </div>
  //     ),
  //   },
  // ];

  const [accDrawer, setAccDrawer] = useState(false);
  // const showAccDrawer = () => {
  //   setAccDrawer(true);
  // };
  const onAccClose = () => {
    setAccDrawer(false);
  };

  const [logMobileIsOpen, setLogMobileIsOpen] = useState(false);
  const openLogMobile = () => {
    console.log("open5555555555555555555555");
    setAccDrawer(false);
    setLogMobileIsOpen(true);
  };
  const closeLogMobile = () => {
    setLogMobileIsOpen(false);
  };

  const formattedDate = moment(fromDate).format("DD-MM-YYYY");
  const mobileformattedDate = moment(fromDate).format("DD MMM ddd");

  // const navigate = useNavigate();

  // const [openDate,setOpenDate]=useState(false)

  // // const Drawerdate = () =>{
  //   // setOpenDate(true)

  // // }
  // const onClosedate = () =>{
  //   setOpenDate(false)
  // }

  const [openDatee, setOpenDatee] = useState(false);
  const [selectedDatee, setSelectedDatee] = useState(new Date());

  const showDrawer = () => {
    setOpenDatee(true);
  };

  const onClosee = () => {
    setOpenDatee(false);
  };

  // const handleDateChangee = (date, dateString) => {
  //   setSelectedDatee(dateString);
  // };

  const LoginUser_Name = sessionStorage.getItem("user_name");

  const [loginIsOpen, setLoginIsOpen] = useState(false);
  const closeLoginModal = () => {
    setLoginIsOpen(false);
  };
  console.log(LoginUser_Name === "null", "gggggggg");
  const totalbuses = useSelector((state) => state.get_buslist_filter);
  console.log(totalbuses?.length, "loadingloadingloading");
  console.log(currentpath, "currentpath");

  const handleonClick = (item, input) => {
    console.log("Station clicked:", item);

    // Update local state (if needed)
    if (input === "from") {
      console.log("frommmmm");

      setBusDatas({
        ...busdatas,
        from: item.Station_Name,
        from_sourceID: item.Source_ID,
      });
      setIsInputFromFocused(false);
    } else {
      setBusDatas({
        ...busdatas,
        to: item.Station_Name,
        to_sourceID: item.Source_ID,
      });
      setIsInputToFocused(false);
    }

    console.log("Dropdown closed");
  };
  console.log(busdatas, "testingsss");

  return (
    <>
      <div className="fixed w-full z-1" style={{ zIndex: 2 }}>
        <div className="md:block hidden">
          <Navbar_One />
        </div>{" "}
        {loading ? (
          <>
            <div className="h-[12vw] md:h-[5vw] w-full bg-[#1F487C] md:-z-10">
              <div className="navbar-container">
                <div className="md:block hidden">
                  <div className="newbus"></div>
                  <h1 className="words">
                    Our AI has found the best bus price for you!
                  </h1>
                  <div className="thread">
                    {/* <SlArrowRight color="#d0d2d1" size={"1.75vw"} /> */}
                    <div className="relative  h-[2vw] w-[5vw] ">
                      <div
                        className="border-[0.1vw] border-[#afafaf] w-[4vw] absolute left-0 top-[0.4vw]"
                        style={{
                          transform: "rotate(13deg)",
                        }}
                      ></div>
                      <div
                        className="border-[0.1vw] border-[#afafaf] w-[4vw] absolute left-0 bottom-[0.7vw]"
                        style={{
                          transform: "rotate(-12deg)",
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
                <div className="md:hidden block">
                  <div className="mobile-newbus"></div>
                  <h1 className="mobile-words">
                    Our AI has found the best bus price for you!
                  </h1>
                  <div className="mobile-thread">
                    {/* <SlArrowRight color="#d0d2d1" size={"1.75vw"} /> */}
                    <div className="relative  h-[2vw] w-[5vw] ">
                      <div
                        className="border-[0.1vw] border-[#afafaf] w-[4vw] absolute left-[2.5vw] top-[3.1vw]"
                        style={{
                          transform: "rotate(13deg)",
                        }}
                      ></div>
                      <div
                        className="border-[0.1vw] border-[#afafaf] w-[4vw] absolute left-[2.5vw] bottom-[-3vw]"
                        style={{
                          transform: "rotate(-12deg)",
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div
            className="h-[12vw] md:h-[5vw] w-full bg-[#1F487C] "
            style={{
              zIndex: 2,
            }}
          >
            <div className="md:h-[0.3vw] md:block hidden w-full bg-[#E5FFF1] opacity-90"></div>
            {/* <div className="grid md:hidden block w-full  h-[12vw]">
            <div className="items-center flex justify-around text-white">
              <div
                onClick={() => {
                  navigation("/");
                  localStorage.clear();
                }}
                className="text-[4vw]"
              >
                <FaArrowLeft />
              </div>
              <div className="flex justify-between gap-[2vw] text-[4vw]">
                <div className="">{fromValue}</div>
                <div className="mt-[1vw] text-gray-500">
                  <FaArrowRight />
                </div>

                <div className="">{toValue}</div>
              </div>
              <div className="pr-[2vw]">
                <button
                  onClick={showDrawer}
                  className="w-[28vw] h-[7vw] flex items-center justify-center bg-blue-500 text-white rounded-full shadow-lg"
                >
                  <div className="text-center text-[3vw] flex">
                    <span className="text-[4.5vw]">
                      <MdKeyboardArrowLeft />
                    </span>{" "}
                    <span>{mobileformattedDate}</span>{" "}
                    <span className="text-[4.5vw]">
                      <MdKeyboardArrowRight />
                    </span>
                  </div>
                </button>
              </div>
            </div>
      

            <Drawer
              title="Select Date"
              placement="bottom"
              closable={false}
              onClose={onClosee}
              open={openDatee}
              height="55%" // Adjust height as needed
              bodyStyle={{ padding: 0 }} // Removes extra padding
              className="flex justify-center md:hidden"
            >
              <div className="flex items-center justify-center">
                <Calendar
                  onChange={(date) => {
                    setSelectedDatee(date);
                    setFromDate(date);
                    onClosee(); // Close drawer on date select
                  }}
                  value={selectedDatee}
                  style={{ width: "100%" }}
                />
              </div>
            </Drawer>
          </div> */}
            <div className=" md:hidden block">
              <div className="flex px-[2vw] items-center justify-between h-full">
                <div className="flex flex-col ">
                  <div className="flex gap-x-[2vw] items-center">
                    <div className="text-[4.5vw] text-white font-semibold">
                      {fromValue}
                    </div>
                    <div className="text-white">
                      <FaArrowRight />
                    </div>
                    <div className="text-[4.5vw] text-white font-semibold">
                      {toValue}
                    </div>
                  </div>
                  <div className="mt-[-2vw]">
                    <label className="text-gray-300 text-[3vw]">{`Showing ${
                      totalbuses?.length > 0 ? totalbuses?.length : "0"
                    } Buses on This Route`}</label>
                  </div>
                </div>
                <div>
                  <button
                    onClick={showDrawer}
                    className="px-[4vw] h-[7vw] flex items-center justify-center bg-white text-[#1F487C] rounded-full shadow-lg"
                  >
                    <div className="text-center text-[3.5vw] flex font-extrabold">
                      {/* <span className="text-[4.5vw]">
                    <MdKeyboardArrowLeft />
                  </span>{" "} */}
                      <span>{mobileformattedDate}</span>{" "}
                      {/* <span className="text-[4.5vw]">
                    <MdKeyboardArrowRight />
                  </span> */}
                    </div>
                  </button>
                  <Drawer
                    title="Select Date"
                    placement="bottom"
                    closable={false}
                    onClose={onClosee}
                    open={openDatee}
                    height="50%" // Adjust height as needed
                    bodyStyle={{ padding: 0 }} // Removes extra padding
                    className="flex justify-center md:hidden"
                  >
                    <div className="flex items-center justify-center">
                      <Calendar
                        onChange={(date) => {
                          setSelectedDatee(date);
                          setFromDate(date);
                          setBusDatas({
                            ...busdatas,
                            date: date,
                          });
                          onClosee(); // Close drawer on date select
                        }}
                        value={busdatas?.date}
                        minDate={new Date()}
                        style={{ width: "100%" }}
                      />
                    </div>
                  </Drawer>
                </div>
              </div>
            </div>
            <img
              src={newbus1}
              className="absolute md:block hidden top-[1.7vw] h-[8.1vw] w-[21.75vw]   left-[-3vw]"
              alt=""
              // style={{
              //   transform: "rotateY(180deg)",
              // }}
            />
            <div className="md:block hidden">
              <div className="  pl-[1vw] md:pl-[19.5vw] md:pt-[0.2vw] grid grid-cols-12 w-full md:h-[4.5vw] h-[12vw]">
                {/* <div className="col-span-2 w-full"> */}
                {/* </div> */}
                <div className="hidden">
                  <div className="col-span-6 md:col-span-4  h-full items-center">
                    <div className="grid grid-cols-7 gap-[1vw] md:gap-0 md:grid-cols-5 items-center h-full">
                      <div
                        className="md:block hidden md:col-span-2"
                        ref={popoverRef}
                      >
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
                          placement="bottom"
                          trigger="click"
                          // title={text}
                          content={
                            <div
                              style={{ maxHeight: "10vw", overflow: "auto" }}
                            >
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
                              alt=""
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
                            alt=""
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
                            onClick={handleflip}
                            className=" cursor-not-allowed"
                          >
                            <img
                              src={split}
                              className="w-[7vw] h-[7.5vw] md:h-[2.5vw] md:w-[2.5vw]"
                              alt=""
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
                              alt=""
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
                            alt=""
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
                            <DateInput
                              value={busdatas?.date}
                              onChange={setFromDate}
                            />
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
                <div className="md:col-span-6 grid md:grid-cols-5 w-full  flex items-center justify-center">
                  {/* <div className="col-span-1  md:hidden  flex justify-start items-center ">
                <TbArrowBackUpDouble className="text-white text-5xl" onClick={()=>navigate("/")} />
              </div> */}
                  <div className="md:col-span-2 md:block hidden ">
                    {modifyBtn === true ? (
                      // <ConfigProvider
                      //   theme={{
                      //     components: {
                      //       Select: {
                      //         activeBorderColor: "#1F487C",
                      //         hoverBorderColor: "#1F487C",
                      //       },
                      //     },
                      //   }}
                      // >
                      //   <Select
                      //     showSearch
                      //     removeIcon
                      //     value={fromValue}
                      //     onChange={(value) => {
                      //       handleChangeFromValue(value);
                      //     }}
                      //     style={{
                      //       width: "100%",
                      //       height: "2.5vw",
                      //       color: "red",
                      //       fontSize: "1.5vw",
                      //     }}
                      //     placeholder="Search to Select"
                      //     optionFilterProp="label"
                      //     filterSort={(optionA, optionB) =>
                      //       (optionA?.label ?? "")
                      //         .toLowerCase()
                      //         .localeCompare((optionB?.label ?? "").toLowerCase())
                      //     }
                      //     options={options}
                      //   />
                      // </ConfigProvider>
                      <div>
                        <input
                          className="h-[3vw] w-full rounded-[0.3vw] pl-[1vw] outline-none text-[1.2vw] placeholder:text-[1.2vw]"
                          placeholder="From"
                          onFocus={() => setIsInputFromFocused(true)}
                          // onBlur={() => setIsInputFromFocused(false)}
                          value={busdatas?.from}
                          autoComplete="off"
                        />
                        {isInputFromFocused && (
                          <div className="absolute top-[8.5vw] w-full ">
                            <div
                              className="w-[16vw] min-h-auto max-h-[16vw] flex-col flex  overflow-y-scroll bg-white shadow-md rounded-[0.3vw]"
                              style={{
                                zIndex: 2,
                              }}
                            >
                              {Get_Stations?.map((item, i) => (
                                <div
                                  key={i}
                                  className="flex gap-x-[0.75vw] w-full px-[1vw] py-[0.5vw] items-center hover:bg-gray-100 "
                                  onClick={
                                    () => handleonClick(item, "from")
                                    // handleChangeFromValue(item)
                                  }
                                >
                                  {SVG.building_dropdown}
                                  <div
                                    className="flex flex-col cursor-pointer"
                                    onClick={() =>
                                      // handleonClick(item, setFieldValue)
                                      console.log("ghhggggh")
                                    }
                                  >
                                    <label className="text-[0.9vw] flex-wrap w-full font-semibold">
                                      {item.Station_Name}
                                    </label>
                                    <label className="text-gray-400 text-[0.8vw]">
                                      {item?.State_Name}
                                    </label>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="relative flex justify-center">
                        <svg
                          width="25vw"
                          height="3vw"
                          viewBox="0 0 176 54"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          preserveAspectRatio="none"
                        >
                          <path
                            d="M144.006 0.980469H32.0263C14.3565 0.980469 0.0322266 5.44593 0.0322266 10.9544V43.3695C0.0322266 48.8779 14.3565 53.3434 32.0263 53.3434H144.006C161.676 53.3434 176 48.8779 176 43.3695V10.9544C176 5.44593 161.676 0.980469 144.006 0.980469Z"
                            fill="white"
                            fillOpacity="0.2"
                          />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center text-white text-[2.5vw] md:text-[1.3vw]">
                          {busdatas?.from}
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="md:col-span-1 md:block hidden ">
                    <div className=" relative flex justify-center cursor-pointer">
                      <div
                        onClick={() => {
                          if (modifyBtn === true) {
                            handleflip();
                          } else {
                            console.log("NOT ALLOWED");
                          }
                        }}
                        className={`${
                          modifyBtn === true
                            ? "cursor-pointer"
                            : "cursor-not-allowed"
                        }`}
                      >
                        {/* <img
                      src={split}
                      className="md:h-[2.5vw] md:w-[2.5vw]"
                      alt="split"
                    /> */}
                        <svg
                          width="3vw"
                          height="3vw"
                          viewBox="0 0 52 47"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M41.9353 0.308594H9.94123C4.89269 0.308594 0.800049 4.20635 0.800049 9.01448V37.3086C0.800049 42.1167 4.89269 46.0145 9.94123 46.0145H41.9353C46.9839 46.0145 51.0765 42.1167 51.0765 37.3086V9.01448C51.0765 4.20635 46.9839 0.308594 41.9353 0.308594Z"
                            fill="white"
                            fill-opacity="0.2"
                          />
                        </svg>
                        <FaArrowRightArrowLeft
                          color="white"
                          size={"1.2vw"}
                          className="absolute size-[4vw] md:size-[1.2vw] left-[1.3vw] top-[1.8vw] md:top-[0.85vw] md:left-[3.4vw] transform translate[-50%,-50%]"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="md:col-span-2 content-center md:block hidden">
                    {modifyBtn === true ? (
                      // <ConfigProvider
                      //   theme={{
                      //     components: {
                      //       Select: {
                      //         activeBorderColor: "#1F487C",
                      //         hoverBorderColor: "#1F487C",
                      //       },
                      //     },
                      //   }}
                      // >
                      //   <Select
                      //     removeIcon
                      //     showSearch
                      //     value={toValue}
                      //     onChange={(value) => {
                      //       handleChangeToValue(value);
                      //     }}
                      //     style={{
                      //       width: "100%",
                      //       height: "2.5vw",
                      //       color: "red  ",
                      //       fontSize: "1.5vw",
                      //     }}
                      //     className="text-[1vw]"
                      //     placeholder="Search to Select"
                      //     optionFilterProp="label"
                      //     filterSort={(optionA, optionB) =>
                      //       (optionA?.label ?? "")
                      //         .toLowerCase()
                      //         .localeCompare((optionB?.label ?? "").toLowerCase())
                      //     }
                      //     // options={[
                      //     //   {
                      //     //     value: toValue,
                      //     //     label: toValue,
                      //     //   },
                      //     //   {
                      //     //     value: '2',
                      //     //     label: 'Closed',
                      //     //   },
                      //     //   {
                      //     //     value: '3',
                      //     //     label: 'Communicated',
                      //     //   },
                      //     //   {
                      //     //     value: '4',
                      //     //     label: 'Identified',
                      //     //   },
                      //     //   {
                      //     //     value: '5',
                      //     //     label: 'Resolved',
                      //     //   },
                      //     //   {
                      //     //     value: '6',
                      //     //     label: 'Cancelled',
                      //     //   },
                      //     // ]}
                      //     // options={tooptions}
                      //     options={toBus}
                      //   />
                      // </ConfigProvider>
                      <div>
                        <input
                          className="h-[3vw] w-full rounded-[0.3vw] pl-[1vw] outline-none text-[1.2vw] placeholder:text-[1.2vw]"
                          placeholder="To"
                          onFocus={() => setIsInputToFocused(true)}
                          // onBlur={() => setIsInputFromFocused(false)}
                          value={busdatas?.to}
                          autoComplete="off"
                        />
                        {isInputToFocused && (
                          <div className="absolute top-[8.5vw] w-full">
                            <div className="w-[16vw] min-h-auto max-h-[16vw] flex-col flex overflow-y-scroll bg-white shadow-md rounded-[0.3vw]">
                              {Get_Stations?.map((item, i) => (
                                <div
                                  key={i}
                                  className="flex gap-x-[0.75vw] w-full px-[1vw] py-[0.5vw] items-center hover:bg-gray-100 "
                                  onClick={
                                    () => handleonClick(item, "to")
                                    // handleChangeFromValue(item)
                                  }
                                >
                                  {SVG.building_dropdown}
                                  <div
                                    className="flex flex-col cursor-pointer"
                                    onClick={() =>
                                      // handleonClick(item, setFieldValue)
                                      console.log("ghhggggh")
                                    }
                                  >
                                    <label className="text-[0.9vw] flex-wrap w-full font-semibold">
                                      {item.Station_Name}
                                    </label>
                                    <label className="text-gray-400 text-[0.8vw]">
                                      {item?.State_Name}
                                    </label>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="relative custnav flex justify-center">
                        <svg
                          width="25vw"
                          height="3vw"
                          viewBox="0 0 176 54"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          preserveAspectRatio="none"
                        >
                          <path
                            d="M144.006 0.980469H32.0263C14.3565 0.980469 0.0322266 5.44593 0.0322266 10.9544V43.3695C0.0322266 48.8779 14.3565 53.3434 32.0263 53.3434H144.006C161.676 53.3434 176 48.8779 176 43.3695V10.9544C176 5.44593 161.676 0.980469 144.006 0.980469Z"
                            fill="white"
                            fillOpacity="0.2"
                          />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center text-white text-[2.5vw] md:text-[1.3vw]">
                          {busdatas?.to}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* <div className=" md:hidden col-span-1"></div> */}
                  {/* <div className="md:hidden block col-span-3 content-center ml-[1vw]">
            <div className="bg-blue-200 w-full  h-[7vw] rounded-[0.5vw] text-[1.1vw]">
                      <DateInput
                        value={fromDate}
                        onChange={handleChangeDateValue}
                      />
                      <input type="date"/>
                    </div>
                    </div> */}
                </div>

                <div className="md:col-span-2"></div>
                <div className="md:block hidden col-span-4 content-center">
                  <div className="grid grid-cols-4 gap-[1vw]  px-[0.5vw] ">
                    <div className="col-span-2">
                      {modifyBtn === true ? (
                        <div className="bg-white w-full h-[2.5vw] rounded-[0.5vw] text-[1.1vw]">
                          <div className="pt-[0.2vw]">
                            <DateInput
                              value={busdatas?.date}
                              onChange={handleChangeDateValue}
                            />
                          </div>
                        </div>
                      ) : (
                        <div className="relative custnav flex justify-center">
                          <svg
                            width="25vw"
                            height="3vw"
                            viewBox="0 0 176 54"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            preserveAspectRatio="none"
                          >
                            <path
                              d="M144.006 0.980469H32.0263C14.3565 0.980469 0.0322266 5.44593 0.0322266 10.9544V43.3695C0.0322266 48.8779 14.3565 53.3434 32.0263 53.3434H144.006C161.676 53.3434 176 48.8779 176 43.3695V10.9544C176 5.44593 161.676 0.980469 144.006 0.980469Z"
                              fill="white"
                              fillOpacity="0.2"
                            />
                          </svg>
                          <div className="absolute inset-0 flex items-center justify-center text-white text-[2.5vw] md:text-[1.3vw]">
                            {dayjs(busdatas?.date).format("DD-MM-YYYY")}
                          </div>
                        </div>
                      )}
                    </div>
                    {modifyBtn === true ? (
                      <div className="col-span-2">
                        <div
                          className="bg-white w-full h-[2.5vw] rounded-[0.5vw] text-[1.1vw] flex items-center justify-center cursor-pointer"
                          onClick={() => {
                            handleSearch();
                            setModifyBtn(false);
                          }}
                        >
                          Search
                        </div>
                      </div>
                    ) : (
                      <div className="col-span-2">
                        <div
                          className="bg-white w-full h-[2.5vw] mt-[.3vw] rounded-[0.5vw] text-[1.1vw] flex items-center justify-center cursor-pointer"
                          onClick={() => {
                            setModifyBtn(true);
                            sessionStorage.setItem("clearFilter", "true");
                          }}
                        >
                          Modify
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
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
            width: "50",
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
          <div className="text-[#1F487C] text-[5vw] px-[2vw] flex items-center gap-[5vw]">
            <FaTicketAlt color="#1F487C" size="5vw" /> Bookings
          </div>
          <div
            className="text-[#1F487C] text-[5vw] px-[2vw] flex items-center gap-[5vw]"
            onClick={openLogMobile}
          >
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
          <div className="font-bold text-[5vw] text-[#1F487C]">
            Are you Sure you want to Log Out ?
          </div>
          <div className="text-[4vw] px-[10vw] text-center text-[#1F487C]">
            Tickets Booking is Faster when you are Logged In
          </div>
          <button
            className=" bg-[#1F487C] text-[4vw] w-3/4 h-[10vw] text-white rounded-md font-bold"
            onClick={() => {
              console.log("hiiiiii", "home");

              navigation("/");
              sessionStorage.clear();
            }}
          >
            Yes, Log Out
          </button>
          <button className="  border-[0.2vw] border-[#1F487C] text-[4vw] w-3/4 h-[10vw] text-[#1F487C] rounded-md font-bold">
            Cancel
          </button>
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
          <div className="font-bold text-[1.7vw] text-[#1F487C]">
            Are you Sure you want to Log Out ?
          </div>
          <div className="text-[1.2vw] px-[4vw] text-center text-[#1F487C]">
            Tickets Booking is Faster when you are Logged In
          </div>
          <button
            className=" bg-[#1F487C] text-[1.4vw] w-[20vw] h-[3.5vw] text-white rounded-full font-bold "
            onClick={() => {
              console.log("hiiiiii", "home");

              navigation("/");
              sessionStorage.clear();
            }}
          >
            Yes, Log Out
          </button>
          <button className="  border-[0.2vw] border-[#1F487C] text-[1.4vw] w-[20vw] h-[3.5vw] text-[#1F487C] rounded-full font-bold">
            Cancel
          </button>
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
                      selectinput === "from"
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
      {/* <LoginModalPopUp
        show={loginIsOpen}
        onClose={closeLoginModal}
        height="35vw"
        width="60vw"
      >
        <Login
          closeLoginModal={closeLoginModal}
          setLoginIsOpen={setLoginIsOpen}
        />
      </LoginModalPopUp> */}
    </>
  );
};
