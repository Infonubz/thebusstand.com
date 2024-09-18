import React, { useEffect, useRef, useState } from "react";
import buslogo from "../../../src/assets/502-ai 1.png";
import busstand from "../../../src/assets/busstand.png";
import bus from "../../../src/assets/bus 1.png";
import profile from "../../../src/assets/Profile.png";
import ticket from "../../../src/assets/ticket.png";
import share from "../../../src/assets//Share.png";
import bg_build1 from "../../assets/bg_build1.png";
import bg_build2 from "../../assets/bg_build2.png";
import vehicle from "../../../src/assets/vehicles.png";
import {
  DatePicker,
  Drawer,
  Dropdown,
  Input,
  Popover,
  Select,
  Space,
} from "antd";
import suitcase from "../../../src/assets/suitcase.png";
import stand_man from "../../assets/stand_man.png";
import man from "../../assets/man.png";
import bag from "../../assets/bag.png";
import map from "../../assets/map.png";
import stand from "../../assets/stand.png";
import "../../App.css";
import {
  FaArrowLeft,
  FaArrowRightArrowLeft,
  FaArrowRightLong,
  FaBus,
  FaMapPin,
} from "react-icons/fa6";
import dayjs from "dayjs";
import card1 from "../../assets/card1.png";
import card2 from "../../assets/card2.png";
import card3 from "../../assets/card3.png";
import place1 from "../../assets/Vector (10).png";
import place2 from "../../assets/Vector (11).png";
import place4 from "../../assets/Vector (5).png";
import place5 from "../../assets/Vector (6).png";
import place6 from "../../assets/Vector (7).png";
import place7 from "../../assets/Vector (8).png";
import place8 from "../../assets/Vector (9).png";
import mumbai from "../../assets/mumbai.png";
import Buses from "./Buses";
import BusOperator from "./BusOperator";
import mumbai1 from "../../assets/mumbai1.png";
import bengaluru from "../../assets/bengaluru.png";
import pondy from "../../assets/pondy.png";
import cbe from "../../assets/cbe.png";
import DomesticPlace from "./Domestic";
import Rating from "./Rating";
import { useLocation, useNavigate, useParams } from "react-router";
import { CiCalendar, CiSearch } from "react-icons/ci";
import { FiCalendar } from "react-icons/fi";
import Faqs from "./FAQ";
import MobileApp from "./Mobile";
import Footer from "./Footer";
import Partner from "../../assets/Partner.png";
import { useDispatch, useSelector } from "react-redux";
import { BUS_DATAS } from "../../Store/type";
import LocationComponent from "./LocationPermission";
// import Modal from "react-modal";
// import { Button, Modal } from "antd";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import { RxCross2 } from "react-icons/rx";
import { LuArrowDownUp, LuMapPin } from "react-icons/lu";
import map1 from "../../assets/Precise.png";
import map2 from "../../assets/Approx.png";
import { toast } from "react-toastify";
import GoogleMap from "./GoogleMap";
import ShareButtons from "../MainComponenet/ShareButton";
import {
  IoIosArrowBack,
  IoIosArrowDown,
  IoIosArrowForward,
} from "react-icons/io";
import locationmap from "../../assets/locationicon.png";
import { FaMapMarkerAlt, FaTicketAlt, FaUserCircle } from "react-icons/fa";
import precius from "../../assets/precius.png";
import ModalPopup from "../MainComponenet/Modal/ModalPopup";
import thankyou from "../../assets/thankyou.png";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Offers from "./Offers";
// import { Calendar } from "primereact/calendar";
import axios from "axios";
import moment, { min } from "moment";
import { PiBusThin, PiUserCircleDuotone } from "react-icons/pi";
import Calendar from "react-calendar";
import { LiaCitySolid } from "react-icons/lia";
import HomePageDatePicker from "./HomeDatePicker";
import "./HomeDatePicker.css";
import DateInput from "../MainComponenet/DatePicker/Components/DateInput";
import "../../Components/Home/Home.css";
import HomedateInput from "../MainComponenet/DatePicker/Components/HomeDateInput";
import HomeDateInput from "../MainComponenet/DatePicker/Components/HomeDateInput";
import LoginModalPopUp from "../Login/LoginModalPopUp";
import Login from "../Login/Login";
import { SendTravelDetails } from "../../Api/Dashboard/Dashboard";
import TopTravelledBusRoutes from "./TopTravelledBusRoutes";
import { SearchableDropdown } from "./SearchableDropDown";
import { RiLogoutCircleLine } from "react-icons/ri";
import { GetUserDetails } from "../../Api/Login/Login";
import { MdKeyboardDoubleArrowUp } from "react-icons/md";
import CommonMainNavbar from "../Common/CommonMainNavbar";

const validationSchema = Yup.object().shape({
  occupation: Yup.string()
    // .oneOf(["option1", "option2", "option3"], "Invalid option")
    .required("Occupation is required"),
  mobile: Yup.string()
    .matches(/^[0-9]+$/, "Mobile number must be a number")
    .min(min(10), "Mobile number must be at least 10 digits")
    .max(10, "Mobile number maximum 10 digits only")
    .required("Mobile Number is required"),
  age: Yup.number()
    .required("Age is required")
    .min(3, "Age must be at least 3 years")
    .max(100, "Age cannot exceed 100 years"),
  from: Yup.string().required("Field is Required"),
  to: Yup.string().required("Field is Required"),
});
export default function Home1() {
  const onChange = (value) => {
    console.log(`selected ${value}`);
  };
  const onSearch = (value) => {
    console.log("search:", value);
  };

  // Filter `option.label` match the user type `input`

  const getselecteddate = useSelector((state) => state.selected_date);
  console.log(getselecteddate, "getselecteddategetselecteddate");

  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());
  const currentDate = new Date();
  const nextDate1 = new Date();
  nextDate1.setDate(currentDate.getDate() + 1);
  const nextDate2 = new Date();
  nextDate2.setDate(currentDate.getDate() + 2);
  const nextDate3 = new Date();
  nextDate3.setDate(currentDate.getDate() + 3);
  console.log(dayjs(currentDate).format("ddd"), "currentDate");
  const dateSelection = new Date(getselecteddate);
  console.log(dateSelection, "dateselectiondateselectiondateselection");
  console.log(nextDate3, "nextdatenextedatewfaewfawgafdsagewa");

  const offer = [card1, card2, card3, card1, card2, card1, card3];
  const top_routes = [
    {
      from: "Bengaluru",
      to: "Hyderabad",
      img: place1,
      buses: 232,
    },
    {
      from: "Indore",
      to: "Bhopal",
      img: place7,
      buses: 122,
    },
    {
      from: "Hyderabad",
      to: "Bengaluru",
      img: place4,
      buses: 55,
    },
    {
      from: "Bengaluru",
      to: "Indore",
      img: place8,
      buses: 354,
    },
    {
      from: "Chennai",
      to: "mumbai",
      img: mumbai,
      buses: 600,
    },
    {
      from: "Bengaluru",
      to: "Mumbai",
      img: mumbai,
      buses: 50,
    },
    {
      from: "Bengaluru",
      to: "Goa",
      img: bengaluru,
      buses: 400,
    },
    {
      from: "Hyderabad",
      to: "kolkata",
      img: place2,
      buses: 511,
    },
    {
      from: "Bengaluru",
      to: "Pondicherry",
      img: pondy,
      buses: 187,
    },
    {
      from: "Chennai",
      to: "Coimbatore",
      img: cbe,
      buses: 266,
    },
  ];
  const navigation = useNavigate();

  const handleLoginPage = () => {
    navigation("/Login");
  };

  const [seatFilter, SetSeatFilter] = useState("");
  const [luxury, setLuxury] = useState(false);
  const [busdatas, setBusDatas] = useState({
    ac: "false",
    from: "",
    to: "",
    date: "",
    seater: "",
    sleeper: "",
    semi_sleeper: "",
    luxury_data: false,
  });
  const dispatch = useDispatch();
  const [error, setError] = useState({
    from: "",
    to: "",
    occupation: "",
    mobile: "",
  });

  useEffect(() => {
    setBusDatas({
      ...busdatas,
      seater: seatFilter == "seater" ? "true" : "false",
      sleeper: seatFilter == "sleeper" ? "true" : "false",
      semi_sleeper: seatFilter == "semi_sleeper" ? "true" : "false",
      date: moment(getselecteddate).format("YYYY-MM-DD"),
      luxury_data: luxury,
    });

    // setBusDatas({date:moment(getselecteddate).format('YYYY-MM-DD')})
  }, [seatFilter, getselecteddate, luxury]);

  console.log(seatFilter, busdatas.seater, "sssseaaahjhaadsfdsffdsf");
  console.log(busdatas, "datevaluesdfasdf");

  // const handlebussearch = () => {
  //   SendTravelDetails(dispatch);
  //   navigation(`/dashboard`);
  // };

  const handlebussearch = async () => {
    // if (
    //   busdatas.from &&
    //   busdatas.to
    //   // ||
    //   // (localStorage.getItem("depature") && localStorage.getItem("arrival"))
    // ) {
    //   navigation(`/dashboard`);
    //   localStorage.setItem("busdetails", busdatas);
    //   dispatch({
    //     type: BUS_DATAS,
    //     payload: busdatas,
    //   });
    // }
    sessionStorage.setItem("loading", true);
    localStorage.setItem("departure", busdatas.from);
    localStorage.setItem("arrival", busdatas.to);
    try {
      const data = await SendTravelDetails(
        dispatch,
        // busdatas.from,
        // busdatas.to,
        busdatas,
        luxury
      );
      console.log(busdatas.from, busdatas.to, "datadata");
    } catch (error) {
      console.error("Error fetching additional user data", error);
    }
    if (busdatas.from === "" || busdatas.to === "") {
      const errors = {};
      if (busdatas.from === "") {
        errors.from = "field is required";
      }
      if (busdatas.to === "") {
        errors.to = "field is required";
      }
      setError(errors);
    } else {
      navigation(`/dashboard`);
    }
  };
  const handlecheckbox = (e) => {
    const { checked } = e.target;
    setBusDatas({
      ...busdatas,
      ac: checked,
    });
  };
  const handleflip = () => {
    setBusDatas({
      from: busdatas.to,
      to: busdatas.from,
    });
  };
  const [showDialog, setShowDialog] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  // const handleGrantPermission = () => {
  //   navigator.geolocation.getCurrentPosition(
  //     (position) => {
  //       const { latitude, longitude } = position.coords;
  //       console.log("User location:", latitude, longitude);

  //       setShowDialog(false);
  //       toast.success("Location Permission added successfully");
  //     },
  //     (error) => {
  //       console.error("Error getting user location:", error.message);
  //     }
  //   );
  // };
  const [mapopen, setMapOpen] = useState(false);
  const [currentloaction, setCurrentLocation] = useState({
    latitude: null,
    longitude: null,
  });
  const handleGrantPermission = () => {
    navigator.permissions
      .query({ name: "geolocation" })
      .then((permissionStatus) => {
        if (permissionStatus.state === "granted") {
          getCurrentLocation();
        } else {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const { latitude, longitude } = position.coords;
              console.log("User location:", latitude, longitude);
              // setShowDialog(false);
              setCurrentLocation({
                ...currentloaction,
                latitude: latitude,
                longitude: longitude,
              });
              localStorage.setItem("latitude", latitude);
              localStorage.setItem("longitude", longitude);
              setMapOpen(true);
              toast.success("Location Permission added successfully");
            },
            (error) => {
              console.error("Error getting user location:", error.message);
            }
          );
        }
      });
  };
  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        console.log("User location:", latitude, longitude);
        setShowDialog(false);
        toast.success("Location Permission added successfully");
      },
      (error) => {
        console.error("Error getting user location:", error.message);
      }
    );
  };

  const handleDenyPermission = () => {
    setShowDialog(false);
  };
  const closeModal = () => {
    setModalIsOpen(false);
    setShowDialog(false);
  };
  const latitude = 11.1280128;
  const longitude = 77.3259264;
  const handlecross = () => {
    setShowDialog(false);
  };
  const [showregister, setShowRegister] = useState(false);
  console.log(showregister, "showregistershowregister");
  const handleregister = () => {
    console.log("registerbutton", registerdata);

    let errors = { occupation: "", mobile: "" };

    // Check if occupation or mobile is empty and set errors
    if (registerdata.occupation === "") {
      errors.occupation = "Field is required";
    }
    if (registerdata.mobile === "") {
      errors.mobile = "Field is required";
    }

    // If both occupation and mobile are filled, proceed to register
    console.log(registerdata.mobile == undefined, "registerdata");
    if (
      registerdata.occupation !== "" &&
      registerdata.mobile !== "" &&
      registerdata.mobile != undefined &&
      registerdata.mobile != "undefined"
    ) {
      setShowRegister(true);
      localStorage.setItem("mobile", registerdata.mobile);
      setError({ occupation: "", mobile: "" }); // Clear errors if registration is successful
    } else {
      // If either occupation or mobile is empty, set errors and do not proceed to register
      setError(errors);
      setShowRegister(false);
    }
  };

  console.log(showregister, "showregister");
  const [startIndex, setStartIndex] = useState(0);

  const prevSlide = () => {
    const newIndex = Math.max(0, startIndex - 1);
    setStartIndex(newIndex);
  };
  const nextSlide = () => {
    const newIndex = Math.min(startIndex + 1, offer.length - 5);
    setStartIndex(newIndex);
  };
  console.log(busdatas, "busdatas555555");
  const location = useLocation();
  const { data } = useParams();
  console.log(data, "location");
  const [registerdata, setRegisterData] = useState({
    mobile: "",
    occupation: "",
  });
  const [open, setOpen] = useState(false);

  const filtereOptions = [{ id: 1, label: "hi" }];
  const content = (
    <div>
      {filtereOptions.length === 0 ? (
        <p>No data found</p>
      ) : (
        filtereOptions.map((item) => (
          <div
            className="flex items-center hover:bg-gray-200 cursor-pointer"
            // onClick={() => handleonclick(item)}
            key={item.id} // assuming there's a unique identifier for each item
          >
            {/* <span>
              <FaMapMarkerAlt className="text-[#1F487C]" />
            </span> */}
            <p className="py-1 text-md my-1 pl-2">{item.label}</p>
          </div>
        ))
      )}
    </div>
  );
  const handleOpenChange = (newOpen) => {
    console.log(newOpen, "newOpen");
    setOpen(true);
  };
  const occupation = [
    {
      id: 1,
      label: "Corporate Travellers",
    },
    {
      id: 2,
      label: "General People",
    },
    {
      id: 3,
      label: "Physically Challenged Travellers",
    },
    {
      id: 4,
      label: "Piligrims Travellers",
    },
    {
      id: 5,
      label: "Senior Citizens",
    },
    {
      id: 6,
      label: "Student",
    },
    {
      id: 7,
      label: "Tourist",
    },
  ];
  const [dropdownopen, setDropDownOpen] = useState(false);
  const handledrop = (item) => {
    setDropDownOpen(false);
    setRegisterData({
      occupation: item.label,
    });
    localStorage.setItem("occupation", item.label);
  };
  console.log(registerdata.mobile, "registerdata");
  const [next, setNext] = useState(false);

  useEffect(() => {
    const lat = localStorage.getItem("latitude");
    console.log(lat != null, "lat != null");
    if (lat == null || lat == "null") {
      const timer = setTimeout(() => {
        setShowDialog(true);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, []);
  useEffect(() => {
    if (next == true) {
      const timer = setTimeout(() => {
        setShowDialog(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [next]);

  const [selecteddate, setSelectedDate] = useState(currentDate);

  useEffect(() => {
    localStorage.setItem("selectdate", selecteddate);
    localStorage.setItem("seatType", seatFilter);
    localStorage.setItem("ac", busdatas.ac);
    sessionStorage.setItem("isLuxury", luxury);
  }, [selecteddate, seatFilter, busdatas.ac, luxury]);
  console.log(busdatas.ac, "accccccccc");
  const [tobus, setToBus] = useState("");
  useEffect(() => {
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
    if (busdatas.from == "Pondicherry") {
      console.log(busdatas.from, "busdatas.from");
      setToBus(Coimbatore);
    } else if (busdatas.from == "Bangalore") {
      setToBus(Hyderabad);
    } else if (busdatas.from == "Chennai") {
      setToBus(Bangalore);
    } else {
      setToBus(all);
    }
    console.log(busdatas.from, "85858855");
  }, [busdatas.from]);
  const [choosedata, setChooseDate] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);

  const handleDateChange = (e) => {
    setSelectedDate(e.value);
    setShowCalendar(false); // Hide calendar after date is selected
  };
  console.log(localStorage.getItem("longitude"), "mapopen");
  console.log(error, "from");
  // console.log(dayjs(choosedata.value).format("D"), "selecteddate");
  useEffect(() => {
    const updateDate = async () => {
      const place = localStorage.getItem("departure");
      const payload = {
        newDate: dayjs(selecteddate).format("YYYY-MM-DD"),
      };

      try {
        const updatedate = await axios.put(
          "http://192.168.90.43:8090/updateDate",
          {}, // No data body for PUT request
          {
            params: payload,
          }
        );
        console.log(updatedate, "updatedate");
      } catch (error) {
        console.error("Error updating date:", error);
      }
    };

    updateDate();
  }, [selecteddate]);
  // const updateDate = async () => {
  //   try {
  //     const response = await axios.request(options);
  //     console.log(response.data);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  // useEffect(() => {
  //   updateDate();
  // }, []);
  const options = {
    method: "GET",
    url: "https://flixbus2.p.rapidapi.com/trips",
    params: {
      from_id: "40de8044-8646-11e6-9066-549f350fcb0c",
      to_id: "40dea87d-8646-11e6-9066-549f350fcb0c",
      date: "22.05.2024",
      adult: "1",
      search_by: "cities",
      children: "0",
      bikes: "0",
      currency: "EUR",
      locale: "en",
    },
    headers: {
      "x-rapidapi-key": "663403672cmsh49368daaa8b1538p163327jsn5420f90fc5c6",
      "x-rapidapi-host": "flixbus2.p.rapidapi.com",
    },
  };

  const updateDate = async () => {
    try {
      const response = await axios.request(options);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    updateDate();
  }, []);

  const [registerfulldetails, setRegisterFullDetails] = useState({});
  const [userdetails, setUserDetails] = useState({
    sex: "male",
  });
  const [sumbitbutton, setSubmitButoon] = useState(false);
  const [placement, setPlacement] = useState("right");
  const [modalshow, setModalShow] = useState(false);
  const onClose = () => {
    setModalShow(false);
    setInputSearch({
      ...inputsearch,
      from: "",
      to: "",
    });
  };
  const [selectinput, setSelectInput] = useState("");
  const depature_city = [
    { city: "Chennai", value: "Chennai", state: "Tamilnadu" },
    { city: "Bangalore", value: "Bangalore", state: "Karnataka" },
    { city: "Hyderabad", value: "Hyderabad", state: "Telangana" },
  ];
  const arrival_city = [
    { city: "Coimbatore", value: "Coimbatore", state: "Tamilnadu" },
    { city: "Mumbai", value: "Mumbai", state: "Maharastra" },
    { city: "Kochi", value: "Kochi", state: "Kerala" },
  ];
  const [inputsearch, setInputSearch] = useState({
    from: "",
    to: "",
  });
  const [departurelist, setDepatureList] = useState([]);
  useEffect(() => {
    if (inputsearch.from) {
      if (selectinput == "from") {
        const depaturedata = depature_city.filter((item) =>
          item.city.toLowerCase().includes(inputsearch.from.toLowerCase())
        );
        setDepatureList(depaturedata);
      } else if (selectinput == "to") {
        const depaturedata = arrival_city.filter((item) =>
          item.city.toLowerCase().includes(inputsearch.to.toLowerCase())
        );
        setDepatureList(depaturedata);
      }
    } else {
      setDepatureList(selectinput == "from" ? depature_city : arrival_city);
    }
  }, [inputsearch, selectinput]);
  const styles = `
  .custom-date-picker {
    display: none !important; /* Hide the input field */
  }
`;
  const [homedatepicker, setHomeDatePicker] = useState("");
  const handleDepatureDateChange = (date, dateString) => {
    console.log(date.$d, "handleDepatureDateChange");
    setHomeDatePicker(date.$d);
    setShowCalendar(false);
    setSelectedDate(date.$d);
  };
  const disablePastDates = (current) => {
    console.log(current, "current");
    // Can not select days before today and today
    return current && current < new Date().setHours(0, 0, 0, 0);
  };
  console.log(new Date(nextDate3), "homedatepicker");
  // const [fromDate, setFromDate] = useState(new Date());

  // useEffect(() => {
  //   setSelectedDate(new Date(getselecteddate));
  // }, [getselecteddate]);
  // console.log(
  //   dayjs(selecteddate).format("DD MM"),
  //   "getselecteddategetselecteddate85858"
  // );
  const [loginIsOpen, setLoginIsOpen] = useState(false);
  const closeLoginModal = () => {
    setLoginIsOpen(false);
  };

  const nextFieldRef = useRef(null);
  const [accDrawer, setAccDrawer] = useState(false);
  const showAccDrawer = () => {
    setAccDrawer(true);
  };
  const onAccClose = () => {
    setAccDrawer(false);
  };
  const [logMobileIsOpen, setLogMobileIsOpen] = useState(false);
  const openLogMobile = () => {
    console.log("open8888888888888888888");
    setAccDrawer(false);
    setLogMobileIsOpen(true);
  };
  const closeLogMobile = () => {
    setLogMobileIsOpen(false);
  };
  const [logModalIsOpen, setLogModalIsOpen] = useState(false);
  const openLogModal = () => {
    console.log("openkkkkk");
    setAccDrawer(false);
    setLogModalIsOpen(true);
    sessionStorage.clear();
    localStorage.clear();
    toast.success("Logout Successfully");
    // window.location.reload();
  };
  const closeLogModal = () => {
    setLogModalIsOpen(false);
  };
  const handleProPage = () => {
    navigation("/main", { state: { tabIndex: 1 } });
  };

  const handleBookingPage = () => {
    navigation("/main", { state: { tabIndex: 3 } });
  };
  const LoginUser_Name = sessionStorage.getItem("user_name");
  const items = [
    {
      key: "1",
      label: (
        <div
          className="text-[#1F487C] text-[1.4vw] px-[2vw] flex items-center gap-[1vw]"
          onClick={handleProPage}
        >
          <PiUserCircleDuotone color="#1F487C" size="1.5vw" /> My Account
        </div>
      ),
    },
    {
      key: "2",
      label: (
        <div
          className="text-[#1F487C] text-[1.4vw] px-[2vw] flex items-center gap-[1vw]"
          onClick={handleBookingPage}
        >
          <FaTicketAlt color="#1F487C" size="1.5vw" /> Bookings
        </div>
      ),
    },
    {
      key: "3",
      label: (
        <div
          className="text-[#1F487C] text-[1.4vw] px-[2vw] flex items-center gap-[1vw]"
          onClick={openLogModal}
        >
          <RiLogoutCircleLine color="#1F487C" size="1.5vw" /> Logout
        </div>
      ),
    },
  ];
  // useEffect(() => {
  //   GetUserDetails();
  // }, []);
  const [top, setShowGoTop] = useState(false);
  const handleVisibleButton = () => {
    setShowGoTop(window.pageYOffset > 50);
  };
  const handleScrollUp = () => {
    window.scrollTo({ left: 0, top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleVisibleButton);
  }, []);
  console.log(top, "toptop");

  const [scrollPercentage, setScrollPercentage] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset; // Current scroll position
      const scrollHeight = document.documentElement.scrollHeight; // Total height of the page
      const clientHeight = document.documentElement.clientHeight; // Height of the visible part (viewport height)

      // Calculate percentage
      const totalHeight = scrollHeight - clientHeight;
      const scrolled = (scrollTop / totalHeight) * 100;

      setScrollPercentage(scrolled);
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  console.log(scrollPercentage.toFixed(2), "teswtinggggg");

  return (
    <div
      className="bg-[#E5FFF1]  min-h-screen max-h-auto w-full overflow-auto  relative"

      // style={{
      //   backgroundColor: "rgba(0, 0, 0, 0.5)",
      // }}
    >
      {/* <div className="absolute bottom-[4vw] right-[2vw]">
        <button
          className="bg-blue-800 text-white text-[1vw] p-[1vw] rounded-full shadow-lg shadow-white"
          onClick={handleScrollUp}
        >
          <MdKeyboardDoubleArrowUp size={"2vw"} />
        </button>
      </div> */}
      {/* <div
        className="md:h-[4.5vw] h-[10vw]  w-full flex md:shadow-lg md:shadow-black"
        style={{
          zIndex: 1,
        }}
      > */}
      {/* <div className="w-[40%] md:h-[4vw] h-[10vw] flex ">
          <img
            className="md:w-[6.25vw] w-[15vw] md:h-[4vw] h-[10vw]"
            src={buslogo}
          />
          <img
            src={busstand}
            className="md:h-[4vw] h-[10vw] md:w-[20vw] w-[40vw] py-[0.1vw]"
          />
          <p className="border-r-[0.3vw] border-[#1F487C] hidden md:block mt-[0.2vw] h-[4vw] ml-[1vw]"></p>
          <div className="w-[9vw] h-[3.8vw] mt-[0.3vw]  bg-[#1F487C] ml-[2vw] rounded-full hidden md:block relative">
            <img
              src={bus}
              className="h-[3.1vw] w-[4vw] absolute top-0"
              style={{ left: "50%", transform: "translateX(-50%)" }}
            />
            <p
              className="text-white  font-semibold absolute bottom-[0.2vw]  text-[0.8vw]"
              style={{ left: "50%", transform: "translateX(-50%)" }}
            >
              Bus Tickets
            </p>
          </div>
        </div>
        <div className="w-[25%] h-full  items-center flex justify-center ">
          <img src={Partner} className="w-auto hidden md:block h-full" />
        </div>
        <div className="w-[35%]  h-full md:pr-[0vw]  pr-[1vw] flex gap-[2vw] items-center md:justify-center justify-end">
          <div
            className="flex items-center justify-center gap-[0.5vw] cursor-pointer"
            onClick={() => setModalIsOpen(true)}
          >
            <img
              className="md:w-[1.6vw] md:h-[1.6vw] w-[7vw] h-[7vw]"
              src={share}
            />
            <p className="text-[1.2vw] font-semibold text-[#1F487C] hidden md:block">
              Share
            </p>
          </div>
          <div
            className="flex items-center justify-center gap-[0.5vw]"
            onClick={() => navigation("/rewards")}
          >
            <img
              className="md:w-[1.6vw] md:h-[1.6vw] w-[7vw] h-[7vw]"
              src={ticket}
            />
            <p className="hidden md:block text-[1.2vw] font-semibold text-[#1F487C]">
              Rewards/Offers
            </p>
          </div>{" "}

          {LoginUser_Name && LoginUser_Name != "null" ? (
            <div>
              <Dropdown
                menu={{
                  items,
                }}
                className="flex items-center gap-[0.5vw] cursor-pointer"
              >
                <a onClick={(e) => e.preventDefault()}>
                  <Space>
                    <div className="flex items-center  gap-[1vw]">
                      <div>
                        <FaUserCircle size="1.5vw" color="#1F487C" />
                      </div>
                      <p className="text-[1.2vw] font-semibold text-[#1F487C]">
                        {LoginUser_Name == "undefined"
                          ? "Guest"
                          : LoginUser_Name}
                      </p>
                    </div>
                  </Space>
                </a>
              </Dropdown>
            </div>
          ) : (
            <div
              className="flex items-center justify-center gap-[0.5vw] cursor-pointer"
              onClick={() => setLoginIsOpen(true)}
            >
              <img className="w-[1.6vw] h-[1.6vw]" src={profile} />
              <p className="text-[1.2vw] font-semibold text-[#1F487C]">
                Login/SignUp
              </p>
            </div>
          )}
        </div> */}
      <CommonMainNavbar />
      {/* </div> */}
      <div className="hero relative md:block hidden">
        <p className="absolute top-[3vw] left-[12vw] text-[1.7vw] tracking-wide font-bold">
          <span className="text-white">
            {"India's exclusive".toUpperCase()}
            <span className="text-[#00152F] px-[1vw] font-extrabold">
              {"bus price comparison & Booking platform".toUpperCase()}
            </span>{" "}
            {"for the cheapest".toUpperCase()}
          </span>
        </p>{" "}
        <div className="bg_build1"></div>
        {/* <div className="build_1"></div> */}
        {/* <div className="cloud1"></div> */}
        {/* <img
          src={require("../../assets/passingclouds1.png")}
          className="absolute top-0 "
        /> */}
        <div className="bg_build2 "></div>
        <div className="cloud1"></div>
        <div className="vehicle-container">
          {/* {/* <div className="cloud2"></div> */}
          {/* <div className="cloud3"></div> 
           <div className="cloud4"></div>  */}
          {/* <div className="build_1"></div> */}
          <div className="flight"></div>
          <div className="scooter"></div>
          <div className="car"></div>
          <div className="bus1"></div>
          {/* <div className="car1"></div> */}
          <div className="bike"></div>
          {/* <div className="auto"></div> */}
          <div className="dubleducker"></div>
          {/* <div className="ambulance"></div> */}
          {/* <div className="ice"></div> */}
        </div>
        <Formik
          initialValues={{
            // mobile: localStorage.getItem("mobile") || "",
            // age: localStorage.getItem("age") || "",
            // email: localStorage.getItem("email") || "",
            // name: localStorage.getItem("name") || "",
            // terms: false,
            from: "",
            to: "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            setBusDatas(values);

            // localStorage.setItem("page1", true);
            // localStorage.setItem("occupation", values.option);
            // localStorage.setItem("mobile", values.mobile);
          }}
          enableReinitialize
        >
          {({
            isSubmitting,
            isValid,
            handleSubmit,
            values,
            handleChange,
            setFieldValue,
            errors,
            touched,
          }) => (
            <Form onSubmit={handleSubmit}>
              <div
                className="bg-[#E5FFF1] absolute rounded-[2vw] grid grid-cols-5 "
                style={{
                  height: "45%",
                  width: "80%",
                  left: "10%",
                  top: "20%",
                  // zIndex:1
                }}
              >
                <div className="col-span-3  w-full h-full ">
                  <div className="grid grid-rows-4 w-full h-full">
                    <div className="row-span-1 w-full h-full"></div>
                    <div className="row-span-1 w-full h-full flex justify-center gap-[2vw]">
                      <div className="grid grid-cols-9 w-full h-full px-[2vw]">
                        <div className="col-span-4 w-full h-full items-center justify-center flex">
                          <div
                            className=" bg-[#1F487C] rounded-[0.5vw] relative"
                            style={{
                              width: "100%",
                              height: "80%",
                            }}
                          >
                            <p className="text-[1.8vw] text-[#1F487C] font-extrabold absolute left-0 bottom-[3.5vw] drop-shadow-lg shadow-black header">
                              Time to Travel
                            </p>

                            <img
                              src={suitcase}
                              className="absolute right-[4vw] bottom-[3.1vw] h-[3vw] w-[1.7vw]"
                            />
                            <img
                              src={bag}
                              className="absolute right-[2.6vw] bottom-[3.0vw] h-[2.2vw] w-[1.7vw]"
                            />
                            <img
                              src={man}
                              className="absolute right-[-0.8vw] bottom-[1.1vw] h-[6.5vw] w-[3.8vw]"
                            />
                            {/* ------------------------------------------------------------------------------------------------------------------------------------ */}
                            {/* <Field name="from">
                              {({ field }) => (
                                <Select
                                  // {...field}
                                  suffixIcon={null}
                                  showSearch
                                  placeholder={<div className="text-[1.2vw]">From</div>}
                                  optionFilterProp="label"
                                  filterSort={(optionA, optionB) =>
                                    (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                  }
                                  onChange={(value) => {
                                    setBusDatas({
                                      ...busdatas,
                                      from: value,
                                    });
                                    setFieldValue("from", value); // Set Formik field value
                                    localStorage.setItem("departure", value); // Save to localStorage if needed
                                    handleChange({
                                      target: { name: "from", value: value },
                                    }); // Notify Formik of change
                                    if (nextFieldRef.current) {
                                      nextFieldRef.current.focus();
                                    }
                                  }}
                                  className="w-full h-full pl-[0.1vw] pb-[0.1vw] pt-[0.3vw] pr-[2vw]"
                                  options={[
                                    { value: "Chennai", label: "Chennai" },
                                    { value: "Bangalore", label: "Bangalore" },
                                    { value: "Salem", label: "Salem" },
                                    { value: "Coimbatore", label: "Coimbatore" },
                                  ]}
                                />
                              )}
                            </Field> */}
                            <div
                              style={{
                                width: "88%",
                              }}
                            >
                              <Field name="from" className="relative">
                                {({ field }) => (
                                  <SearchableDropdown
                                    options={[
                                      {
                                        value: "Pondicherry",
                                        label: "Pondicherry",
                                      },
                                      {
                                        value: "Bangalore",
                                        label: "Bangalore",
                                      },
                                      { value: "Chennai", label: "Chennai" },
                                    ]}
                                    value={values.from}
                                    onChange={(value) => {
                                      setBusDatas({
                                        ...busdatas,
                                        from: value,
                                      });
                                      setFieldValue("from", value); // Set Formik field value
                                      // localStorage.setItem('departure', value);
                                    }}
                                    placeholder="From"
                                  />
                                )}
                              </Field>
                              <ErrorMessage
                                name="from"
                                component="div"
                                className="text-red-500 text-[0.8vw] absolute top-[3.3vw]"
                              />
                            </div>

                            {/* ------------------------------------------------------------------------------------------------------------------------ */}
                          </div>
                        </div>
                        <div className="col-span-1 w-full h-full items-center justify-center flex cursor-not-allowed">
                          <FaArrowRightArrowLeft
                            color="#1F487C"
                            className=" cursor-not-allowed"
                            size={"2vw"}
                            // onClick={handleflip}
                          />
                        </div>
                        <div className="col-span-4 w-full h-full  items-center justify-center flex ">
                          <div
                            className=" bg-[#1F487C] rounded-md relative  "
                            style={{
                              width: "100%",
                              height: "80%",
                              // zIndex: 1,
                            }}
                          >
                            {/* <img
                        src={stand}
                        className="absolute right-[2vw] bottom-0 h-[8.2vw] w-[1.6vw] pt-[1vw]"
                      /> */}
                            <img
                              src={stand_man}
                              className="absolute right-[-2.8vw] bottom-0 h-[8vw] w-[5vw] pt-[0.5vw]"
                            />
                            <img
                              src={map}
                              className="absolute left-0 top-[-4vw]"
                              style={{
                                // height: "100%",
                                width: "80%",
                                // zIndex: 1,
                              }}
                            />
                            {/* <Field name="to">
                              {({ field }) => (
                                <>
                                  <Select
                                    ref={nextFieldRef}
                                    showSearch // Enable search functionality
                                    suffixIcon={null} // This removes the dropdown arrow
                                    placeholder={<div className="text-[1.2vw]">To</div>}
                                    optionFilterProp="label"
                                    filterSort={(optionA, optionB) =>
                                      (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                    }
                                    onChange={(value) => {
                                      setBusDatas({
                                        ...busdatas,
                                        to: value,
                                      });
                                      localStorage.setItem("arrival", value);
                                      setFieldValue("to", value);
                                      handleChange({
                                        target: { name: "to", value: value },
                                      });
                                    }}
                                    value={busdatas.to || undefined} // Ensure placeholder is shown when no value is selected
                                    onSearch={onSearch}
                                    filterOption={filterOption}
                                    className="w-full h-full pl-[0.1vw] pb-[0.1vw] pt-[0.3vw] outline-none pr-[2vw] text-[1vw] custom-select"
                                    options={tobus}
                                  />
                                </>
                              )}
                            </Field> */}
                            <div
                              style={{
                                width: "88%",
                              }}
                            >
                              <Field name="to" className="relative">
                                {({ field }) => (
                                  <SearchableDropdown
                                    // options={[
                                    //   { value: 'Chennai', label: 'Chennai' },
                                    //   { value: 'Bangalore', label: 'Bangalore' },
                                    //   { value: 'Salem', label: 'Salem' },
                                    //   { value: 'Coimbatore', label: 'Coimbatore' }
                                    // ]}
                                    options={tobus}
                                    value={values.to}
                                    onChange={(value) => {
                                      setBusDatas({
                                        ...busdatas,
                                        to: value,
                                      });
                                      setFieldValue("to", value); // Set Formik field value
                                      // localStorage.setItem('arrival', value);
                                    }}
                                    placeholder="To"
                                  />
                                )}
                              </Field>

                              <ErrorMessage
                                name="to"
                                component="div"
                                className="text-red-500 text-[0.8vw] absolute top-[3.3vw]"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="row-span-2   w-full h-full flex-col text-[#727E78]">
                      <h1 className="pl-[2vw] pt-[0.5vw] text-[1vw]">
                        Seat Type (optional)
                      </h1>
                      {/* <h1>Seat Type (optional)</h1> */}
                      <div className="flex gap-[1vw]   pt-[0.5vw] pl-[2vw] items-center w-full ">
                        <button
                          className={`border-[0.15vw] flex ${
                            seatFilter == "seater"
                              ? "bg-[#1F487C] text-white border-white"
                              : "text-black border-[#81A3B6]"
                          } py-[0.2vw] px-[1.5vw] rounded-full text-[1vw]`}
                          onClick={() => {
                            if (seatFilter == "seater") {
                              SetSeatFilter("");
                            } else {
                              SetSeatFilter("seater");
                            }
                          }}
                        >
                          {/* <span className="">
                            <div
                              className={`border-t-[0.1vw] ${
                                seatFilter == "seater"
                                  ? "bg-white border-[#1F487C]"
                                  : "bg-[#1F487C] border-white"
                              } border-l-[0.1vw] border-r-[0.1vw] rounded-t-[0.1vw] h-[0.9vw] w-[1vw] relative flex items-center justify-center cursor-pointer`}
                            >
                              <div
                                className={`border-b-[0.1vw] ${
                                  seatFilter == "seater"
                                    ? "bg-white border-[#1F487C]"
                                    : "bg-[#1F487C] border-white"
                                } border-l-[0.1vw] border-r-[0.1vw]  h-[0.9vw] w-[1.2vw] absolute top-[0.4vw] flex items-center justify-center`}
                              ></div>
                              <div
                                className={`border-b-[0.1vw]  ${
                                  seatFilter == "seater"
                                    ? " border-[#1F487C]"
                                    : " border-white"
                                } border-l-[0.1vw] border-r-[0.1vw] h-[0.7vw] w-[0.8vw] absolute top-[0.4vw] flex items-center justify-center`}
                              ></div>
                              <div
                                className={`border-t-[0.1vw] ${
                                  seatFilter == "seater"
                                    ? "bg-white border-[#1F487C]"
                                    : "bg-[#1F487C] border-white"
                                } absolute top-[0.4vw] w-[0.25vw] left-[-0.15vw]`}
                              ></div>
                              <div
                                className={`border-t-[0.1vw]  ${
                                  seatFilter == "seater"
                                    ? " border-[#1F487C]"
                                    : " border-white"
                                } absolute top-[0.4vw] w-[0.25vw] right-[-0.15vw]`}
                              ></div>
                            </div>
                          </span> */}
                          <span
                            className={` ${
                              seatFilter == "seater"
                                ? "text-white"
                                : "text-[#1F487C]"
                            } font-bold inline-flex`}
                          >
                            Seater
                          </span>
                        </button>

                        <button
                          className={`border-[0.15vw] flex ${
                            seatFilter == "sleeper"
                              ? "bg-[#1F487C] text-white border-white"
                              : "text-black border-[#81A3B6]"
                          } py-[0.2vw] px-[1.5vw] rounded-full text-[1vw]`}
                          onClick={() => {
                            if (seatFilter == "sleeper") {
                              SetSeatFilter("");
                            } else {
                              SetSeatFilter("sleeper");
                            }
                          }}
                        >
                          {/* <span
                            style={{
                              transform: "rotate(90deg)",
                            }}
                         >
                            <div
                              className={`border-[0.1vw] ${
                                seatFilter == "sleeper"
                                  ? "border-[#1F487C] bg-white"
                                  : "border-white bg-[#1F487C]"
                              } border-[#1F487C] h-[2vw] w-[1vw] rounded-[0.1vw] relative flex items-center justify-center cursor-pointer`}
                            >
                              <div
                                className={`border-[0.1vw]  ${
                                  seatFilter == "sleeper"
                                    ? "border-[#1F487C] bg-[#1F487C]"
                                    : "border-white bg-white"
                                }  w-[0.5vw] h-[0.2vw] absolute bottom-[0.3vw] rounded-[0.1vw]`}
                              ></div>
                            </div>
                          </span> */}
                          <span
                            className={` ${
                              seatFilter == "sleeper"
                                ? "text-white"
                                : "text-[#1F487C]"
                            } font-bold`}
                          >
                            Sleeper
                          </span>
                        </button>
                        {/* <button
                          className={`border-[0.15vw] ${
                            seatFilter == "semi_sleeper"
                              ? "bg-[#1F487C] text-white"
                              : "text-black border-[#81A3B6]"
                          }  py-[0.2vw] px-[1.5vw] rounded-full text-[1vw]`}
                          onClick={() => {
                            if (seatFilter == "semi_sleeper") {
                              SetSeatFilter("");
                            } else {
                              SetSeatFilter("semi_sleeper");
                            }
                          }}
                        >
                          Semi Sleeper
                        </button> */}
                        <button
                          className={`border-[0.15vw] flex items-center ${
                            luxury == true
                              ? "bg-custom-gradient-luxury bg-image-url  text-black border-[#e1db84]"
                              : "text-black border-[#81A3B6]"
                          }  py-[0.2vw] px-[1.5vw] rounded-full text-[1vw]`}
                          onClick={() => setLuxury(!luxury)}
                        >
                          {/* <span className="pr-[0.5vw]">
                            <FaBus
                              size={"1vw"}
                              color={`${luxury == true ? "black" : "1F487C"}`}
                            />
                          </span> */}
                          <span
                            className={`${
                              luxury == true ? "text-black" : "text-[#1F487C]"
                            } font-bold`}
                          >
                            Luxury Buses
                          </span>
                        </button>
                        {/* <button className="border-[0.15vw] border-[#81A3B6] py-[0.3vw] px-[1.5vw] rounded-full text-[1vw]">
                    Semi-Sleeper
                  </button> */}
                        <div className="flex items-center justify-center pl-[1vw] gap-[1vw]">
                          <input
                            type="checkbox"
                            className="w-[1.2vw] h-[1.2vw] "
                            onClick={(e) => handlecheckbox(e)}
                          />

                          <span className="text-[1vw]">Show AC Buses Only</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-span-2 w-full h-full">
                  <div className="grid grid-rows-6 w-full h-full items-center justify-center">
                    <div className="row-span-3  w-full h-full">
                      <p className="pl-[0.5vw] pt-[1.5vw] text-[1vw]">
                        Departure Date
                      </p>
                      <HomedateInput />
                    </div>
                    <div className="row-span-2 w-full h-full items-center justify-center flex">
                      <button
                        type="submit"
                        className="bg-[#1F487C] px-[4vw] py-[0.5vw] rounded-md text-[1.5vw] text-white "
                        onClick={handlebussearch}
                      >
                        Search Buses
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
      {/* <hr /> */}
      {/* --------------------------------------------------------MOBILE---------------------------------------------------------------------------- */}
      {/* mobile view */}
      <div className="flex justify-center">
        <div className="block md:hidden absolute h-[100vw] border-[0.1vw] border-t-gray-400  shadow-lg shadow-gray-400 top-[20vw] rounded-[2vw]   w-[90%]">
          <div className="grid grid-rows-5 w-full h-full p-[5vw] ">
            <div className="row-span-1 relative">
              <div
                className="flex items-center relative"
                onClick={() => {
                  setModalShow(true);
                  setSelectInput("from");
                }}
              >
                <span className="pr-[3vw]">
                  {" "}
                  {/* <PiBusThin size={"7vw"} color="#1F487C" /> */}
                  <FaMapPin size={"7vw"} color="#1F487C" />
                </span>
                <p className="text-[#1F487C] text-[5vw] ">
                  {/* {localStorage.getItem("depature")
                    ? localStorage.getItem("depature")
                    : "Tiruppur"} */}
                  {busdatas.from ? busdatas.from : "From"}
                </p>
                <div className="border-b-[0.1vw] border-[#1F487C] left-[10vw] w-[80%] absolute top-[12vw]"></div>
              </div>
              <div className="absolute top-[7vw] right-[2vw]">
                <LuArrowDownUp
                  size={"9vw"}
                  color="white"
                  className="bg-[#1F487C] p-[2vw] rounded-full"
                />
              </div>
            </div>
            <div
              className="row-span-1"
              onClick={() => {
                setModalShow(true);
                setSelectInput("to");
              }}
            >
              <div className="flex items-center relative">
                <span className="pr-[3vw]">
                  {" "}
                  <FaMapMarkerAlt size={"7vw"} color="#1F487C" />
                </span>
                <p className="text-[#1F487C] text-[5vw] ">
                  {" "}
                  {/* {localStorage.getItem("arrival")
                    ? localStorage.getItem("arrival")
                    : "Coimbatore"} */}
                  {busdatas.to ? busdatas.to : "To"}
                </p>
                {/* <div className="border-b-[0.1vw] border-[#1F487C] w-full absolute top-[10vw]"></div> */}
              </div>
            </div>
            <div className="row-span-1 relative">
              <div className="flex gap-[4.5vw] w-full h-full items-center  ">
                <p className=" text-[4vw] text-[#1F487C] absolute top-[-5vw] left-0">
                  Departure Date
                </p>
                <HomeDateInput />
              </div>
            </div>
            <div className="row-span-1 items-center mt-[2vw] relative">
              <div className="flex items-center w-full gap-[3.5vw] ">
                <button
                  className={`border-[0.15vw] ${
                    seatFilter == "seater"
                      ? "bg-[#1F487C] text-white"
                      : "text-black border-[#81A3B6]"
                  }  py-[1vw] px-[4vw] rounded-full text-[4vw]`}
                  onClick={() => {
                    if (seatFilter == "seater") {
                      SetSeatFilter("");
                    } else {
                      SetSeatFilter("seater");
                    }
                  }}
                >
                  Seater
                </button>
                <button
                  className={`border-[0.15vw] ${
                    seatFilter == "sleeper"
                      ? "bg-[#1F487C] text-white"
                      : "text-black border-[#81A3B6]"
                  }  py-[1vw] px-[4vw] rounded-full text-[4vw]`}
                  onClick={() => {
                    if (seatFilter == "sleeper") {
                      SetSeatFilter("");
                    } else {
                      SetSeatFilter("sleeper");
                    }
                  }}
                >
                  Sleeper
                </button>
                {/* <button
                  className={`border-[0.15vw] ${
                    seatFilter == "semi_sleeper"
                      ? "bg-[#1F487C] text-white"
                      : "text-black border-[#81A3B6]"
                  }  py-[1vw] px-[4vw] rounded-full text-[4vw]`}
                  onClick={() => {
                    if (seatFilter == "semi_sleeper") {
                      SetSeatFilter("");
                    } else {
                      SetSeatFilter("semi_sleeper");
                    }
                  }}
                >
                  Semi Sleeper
                </button> */}
                {/* <button className="border-[0.15vw] border-[#81A3B6] py-[0.3vw] px-[1.5vw] rounded-full text-[1vw]">
                    Semi-Sleeper
                  </button> */}
                <div className=" absolute top-[12vw] left-[1vw] items-center flex gap-[5vw]">
                  <input
                    type="checkbox"
                    className="w-[5vw] h-[5vw] "
                    onClick={(e) => handlecheckbox(e)}
                  />

                  <span className="text-[4vw]">Show AC Buses Only</span>
                </div>
              </div>
            </div>
            <div className="row-span-1 mt-[4vw] items-center justify-center  flex">
              <button
                className="bg-[#1F487C] text-white text-[5vw] w-full py-[2vw] rounded-[2vw]"
                onClick={handlebussearch}
              >
                Search Buses
              </button>
            </div>
          </div>
        </div>
      </div>
      <Offers />
      {/* <div className="mt-[16vw] md:block hidden px-[5vw]">
        <p className=" text-[1.5vw] pl-[2vw] text-[#1F487C] font-bold">
          Top Travelled Bus Routes{" "}
        </p>
        <div className="grid grid-cols-5 w-full h-full gap-[1vw] mt-[1.5vw] px-[2vw]">
          {top_routes.map((item) => (
            <div className="col-span-1 w-full h-[18vw] bg-gradient-to-t from-[#126DAF] border-t-[0.2vw] rounded-lg border-[#0D99FF]">
              <div
                className=""
                style={{
                  height: "75%",
                  width: "100%",
                }}
              >
                <img
                  src={item.img}
                  className="h-full w-full p-[0.7vw] rounded-lg"
                  style={{
                    borderRadius: "1.5vw",
                  }}
                />
              </div>
              <div
                className=""
                style={{
                  height: "25%",
                  width: "100%",
                }}
              >
                <div className="gap-[1vw] flex items-center text-white pl-[1vw] font-bold w-full ">
                  <span className="text-[0.9vw]">
                    {item.from.toUpperCase()}
                  </span>
                  <span>
                    <FaArrowRightLong size={"1vw"} />
                  </span>
                  <span className="text-[0.9vw]">{item.to.toUpperCase()}</span>
                </div>
                <p className="text-white pl-[1vw] font-bold text-[1vw] pt-[0.3vw]">{`${item.buses} Buses`}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-2 w-full h-full grid-flow-row gap-[2vw] mt-[1.5vw] px-[2vw]">
          {top_routes.map((item) => (
            <div className="col-span-1  border-[0.1vw] border-[#1F487C] shadow-md shadow-[#1F487C] rounded-[0.5vw]">
              <div className="grid grid-cols-7 w-full h-full">
                <div className="col-span-1 w-full h-full items-center justify-center p-[0.5vw]">
                  <img
                    src={item.img}
                    className="h-[5vw] w-[5vw] rounded-[0.5vw]"
                  />
                </div>
                <div className="col-span-4 w-full h-full relative  items-center    font-semibold px-[0.5vw]">
                  <div className="gap-[1vw] flex items-center absolute top-[1.5vw] w-full ">
                    <span className="text-[1vw]">{item.from}</span>
                    <span>
                      <FaArrowRightLong size={"1vw"} />
                    </span>
                    <span className="text-[1vw]">{item.to}</span>
                  </div>
                  <div className="w-full absolute bottom-[1.5vw]">
                    <span className="text-[0.7vw] text-[#727E78]">
                      (316 Buses)
                    </span>
                  </div>
                </div>
                <div className="col-span-2 w-full h-full flex items-center justify-center">
                  <button className="px-[1vw] py-[0.5vw] border-[0.1vw] rounded-full font-bold bg-white text-[0.8vw] shadow-md border-[#AAAAAA]">
                    View all buses
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div> */}
      {/* <div className="mt-[175vw] px-[5vw] md:hidden block">
        <p className=" text-[5vw] pl-[2vw] text-[#1F487C] font-bold">
          Top Travelled Bus Routes{" "}
        </p>
        <div className="relative overflow-x-auto scrollbar-hide mt-[2vw]">
          <div className="flex">
            {top_routes.map((item) => (
              <div className="w-[55vw] mr-[2vw] flex-shrink-0  h-[54vw] bg-gradient-to-t from-[#126DAF] border-t-[0.5vw] rounded-lg border-[#0D99FF]">
                <div
                  className=""
                  style={{
                    height: "40vw",
                    width: "55vw",
                  }}
                >
                  <img
                    src={item.img}
                    className="h-full w-full px-[2vw] pt-[2vw] rounded-lg"
                    style={{
                      borderRadius: "1.5vw",
                    }}
                  />
                </div>
                <div
                  className="pt-[1vw]"
                  style={{
                    height: "10vw",
                    width: "100%",
                  }}
                >
                  <div className="gap-[1vw] flex items-center text-white pl-[2.5vw] font-bold w-full ">
                    <span className="text-[3.5vw]">
                      {item.from.toUpperCase()}
                    </span>
                    <span>
                      <FaArrowRightLong size={"1vw"} />
                    </span>
                    <span className="text-[3.5vw]">
                      {item.to.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-white pl-[2.5vw] font-bold text-[3.5vw]">{`${item.buses} Buses`}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div> */}
      <TopTravelledBusRoutes />
      <Buses />
      <BusOperator />
      <DomesticPlace />
      <Rating />
      <Faqs />
      <MobileApp />
      <Footer />
      <Drawer
        // title="Basic Drawer"
        placement={placement}
        closable={false}
        onClose={onClose}
        open={modalshow}
        key={placement}
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
                      selectinput == "from"
                        ? setBusDatas({
                            ...busdatas,
                            from: item.city,
                          })
                        : setBusDatas({
                            ...busdatas,
                            to: item.city,
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
      <ModalPopup
        show={modalIsOpen}
        onClose={closeModal}
        height="28vw"
        width="32vw"
      >
        <ShareButtons url={"http://localhost:3008/"} />
      </ModalPopup>
      {/* <LocationComponent /> */}
      {/* <Modal
        isOpen={showDialog}
        onRequestClose={closeModal}
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          },
          content: {
            width: "auto", // Adjust width as needed
            height: "auto", // Adjust height as needed
            // margin: "auto",
          },
        }}
      > */}
      <ModalPopup
        // show={showDialog}
        onClose={closeModal}
        height="35vw"
        width="40vw"
      >
        {showregister == false ? (
          <>
            <div className=" justify-center flex-col">
              <p
                className="text-[#1F487C] text-[2.5vw]  font-semibold tracking-wide text-center"
                style={{
                  fontFamily: "Playfair Display",
                }}
              >
                Never miss updates!
              </p>
              <p
                className="text-[1.3vw] text-center mt-[0.5vw]"
                style={{
                  fontFamily: "Inter",
                }}
              >
                Get registered on{" "}
                <span className="font-bold">thebusstand.com</span> for exciting
              </p>
              <p
                className="text-[1.3vw] text-center"
                style={{
                  fontFamily: "Inter",
                }}
              >
                offers and deals !
              </p>

              <div
                className={`border-b-[0.2vw] ${
                  showregister ? "border-[#1F487C]" : " border-[#8EA3BD]"
                } relative mx-[3vw] my-[3vw]`}
              >
                <img
                  src={locationmap}
                  className="'w-[2vw] h-[4vw] absolute left-[-2vw] bottom-[0.4vw]"
                />
                <div
                  className={
                    " bg-[#1F487C]  w-[1vw] h-[1vw] absolute rounded-full  left-[-0.5vw] bottom-[-0.5vw]"
                  }
                >
                  <p className="text-[#1F487C] absolute left-[-1vw] bottom-[-1.8vw] text-[1.2vw] font-bold">
                    TIME
                  </p>
                </div>
                <div
                  className={`${
                    showregister ? "bg-[#1F487C]" : "bg-[#8EA3BD]"
                  } w-[1vw] h-[1vw] absolute rounded-full  right-[-0.5vw] bottom-[-0.5vw]`}
                ></div>
                <p
                  className={`${
                    showregister ? "text-[#1F487C]" : "text-[#8EA3BD]"
                  }  absolute left-[47.5%] bottom-[-2.3vw] text-[1.3vw] font-bold`}
                >
                  To
                </p>
                <div
                  className={`${
                    showregister ? `bg-[#1F487C]` : "bg-[#8EA3BD]"
                  } w-[1vw] h-[1vw] absolute rounded-full  left-[48%] bottom-[-0.5vw]`}
                ></div>
                <p
                  className={`${
                    showregister ? "text-[#1F487C]" : "text-[#8EA3BD]"
                  } absolute right-[-2vw] bottom-[-2.3vw] text-[1.3vw] font-bold`}
                >
                  TRAVEL
                </p>
              </div>
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
                      console.log("hiiiiii", "main");

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
              {/* <div className="px-[2vw] pt-[3vw] relative">
                <div className=" w-full border-[0.1vw]  rounded-[0.5vw] h-[3vw] flex border-[#1F487C]">
                  <div className=" w-[88%] rounded-l-[0.5vw]  items-center flex">
                    <p
                      className={`px-[1vw] text-[1.1vw] ${
                        registerdata.occupation != ""
                          ? "text-black"
                          : "text-gray-400"
                      } `}
                    >
                      {registerdata.occupation != ""
                        ? registerdata.occupation
                        : "SELECT AN OCCUPATION"}
                    </p>
                  </div>
                  <div
                    className="w-[12%] rounded-r-[0.3vw] bg-[#1F487C] flex items-center justify-center cursor-pointer"
                    onClick={() => setDropDownOpen(!dropdownopen)}
                  >
                    <IoIosArrowDown size={"1.5vw"} color="white" />
                  </div>
                  {dropdownopen ? (
                    <div className="h-[8vw] w-[78%] rounded-[0.5vw] shadow-xl border-[0.1vw] border-gray-300 bg-white absolute top-[6vw] overflow-y-scroll">
                      {occupation.map((item) => (
                        <p
                          key={item.id}
                          className="text-[1vw]  flex items-center px-[1vw] py-[0.5vw] cursor-pointer hover:bg-gray-200"
                          onClick={() => handledrop(item)}
                        >
                          {item.label}
                        </p>
                      ))}
                    </div>
                  ) : (
                    ""
                  )}
                </div>
                <p className="text-red-500 text-[0.8vw]">{error.occupation}</p>
              </div>
              <div className="flex w-full mt-[3vw] px-[2vw]">
                <input
                  type="number"
                  class="border-[0.1vw] border-[#1F487C] text-[1.5vw] h-[3vw] w-[60%] rounded-l-[0.5vw] outline-none px-[1vw] no-spinner"
                  placeholder="PHONE NUMBER"
                  pattern="[0-9]{10}"
                  maxLength="10"
                  onChange={(e) =>
                    setRegisterData({
                      ...registerdata,
                      mobile: e.target.value,
                    })
                  }
                />

                <button
                  className={`bg-[#1F487C] text-white h-[3vw] w-[40%] text-[1.1vw] rounded-r-[0.5vw] ${
                    registerdata.mobile == "" || undefined
                      ? ""
                      : "cursor-pointer"
                  }`}
                  // disabled={
                  //   registerdata.mobile == "" || undefined ? true : false
                  // }
                  onClick={() => handleregister()}
                >
                  REGISTER
                </button>
              </div>
              <div className="px-[2vw]">
                <p className="text-red-500 text-[0.8vw]">{error.mobile}</p>
              </div> */}
              {/* 
              <div className="px-[2vw] py-[1vw]">
                <Formik
                  initialValues={{ mobileData: "", option: "" }}
                  validationSchema={validationSchema}
                  onSubmit={(values) => {
                    // Handle form submission
                    setShowRegister(true);
                    console.log(values, "valuesvalues");
                    localStorage.setItem("page1", true);
                    localStorage.setItem("occupation", values.option);
                    localStorage.setItem("mobile", values.mobileData);
                  }}
                >
                  {({ isSubmitting }) => (
                    <Form>
                      <div>
                        <Field
                          type="text"
                          name="mobileData"
                          placeholder="Mobile Number"
                          className="border-[0.1vw] border-[#1F487C] text-[1.2vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none px-[1vw] "
                        />
                        <ErrorMessage
                          name="mobileData"
                          component="div"
                          className="text-red-500 text-[0.8vw]"
                        />
                      </div>

                      <div className="pt-[2vw]">
                        <Field
                          as="select"
                          name="option"
                          className="border-[0.1vw] border-[#1F487C] text-[1.1vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none px-[1vw] "
                        >
                          <option
                            value=""
                            label="Select option"
                            className="text-gray-400"
                          />
                          {occupation.map((item) => (
                            <option
                              value={item.label}
                              label={item.label}
                              className="py-[0.2vw]"
                            />
                          ))}
                        </Field>
                        <ErrorMessage
                          name="option"
                          component="div"
                          className="text-red-500 text-[0.8vw]"
                        />
                      </div>

                      <div className=" justify-between  flex mt-[3vw]">
                        <button
                          className="text-white bg-[#1F487C] h-[2.5vw] text-[1.1vw]  w-[8vw] rounded-[0.8vw]"
                          // onClick={handleGrantPermission}
                        >
                          Cancel
                        </button>
                        <button
                          className="text-white bg-[#1F487C] h-[2.5vw] text-[1.1vw] w-[8vw] rounded-[0.8vw]"
                          // onClick={handleDenyPermission}
                          // onClick={() => setNext(true)}
                          type="submit"
                          disabled={isSubmitting}
                        >
                          Next
                        </button>
                      </div>
                    </Form>
                  )}
                </Formik>
              </div> */}
              <div className="h-auto w-full px-[1vw]">
                {/* ----------------------------------------_used_formik_--------------------------------------------------------------------------- */}
              </div>
            </div>
          </>
        ) : next == false ? (
          <div className="h-[30vw] w-[50vw  justify-center flex-col">
            <p
              className="text-[#1F487C] text-[2.5vw]  font-semibold tracking-wide text-center"
              style={{
                fontFamily: "Playfair Display",
              }}
            >
              Never miss updates!
            </p>
            <p
              className="text-[1.3vw] text-center mt-[0.5vw]"
              style={{
                fontFamily: "Inter",
              }}
            >
              Get registered on{" "}
              <span className="font-bold">thebusstand.com</span> to access this
              device’s
            </p>
            <p
              className="text-[1.3vw] text-center"
              style={{
                fontFamily: "Inter",
              }}
            >
              precise location
            </p>

            <div
              className={`relative mx-[3vw] mb-[2vw] mt-[4.5vw]`}
              style={{
                borderStyle: `solid`,
                borderWidth: `0.2vw`,
                borderColor: `transparent`,
                borderImage: `linear-gradient(to right, #1F487C 50%, #8EA3BD 50%) 1`,
              }}
            >
              <img
                src={locationmap}
                className="'w-[2vw] h-[4vw] absolute left-[43.1%] bottom-[0.4vw]"
              />
              <div
                className={
                  " bg-[#1F487C]  w-[1vw] h-[1vw] absolute rounded-full  left-[-0.5vw] bottom-[-0.5vw]"
                }
              >
                <p className="text-[#1F487C] absolute left-[-1vw] bottom-[-1.8vw] text-[1.2vw] font-bold">
                  TIME
                </p>
              </div>
              <div
                className={`  bg-[#8EA3BD]
                 w-[1vw] h-[1vw] absolute rounded-full  right-[-0.5vw] bottom-[-0.5vw]`}
              ></div>
              <p
                className={` text-[#1F487C]
                  absolute left-[47.5%] bottom-[-2.3vw] text-[1.3vw] font-bold`}
              >
                To
              </p>
              <div
                className={`
                  bg-[#1F487C]
                 w-[1vw] h-[1vw] absolute rounded-full  left-[48%] bottom-[-0.5vw]`}
              ></div>
              <p
                className={` text-[#8EA3BD]
                absolute right-[-2vw] bottom-[-2.3vw] text-[1.3vw] font-bold`}
              >
                TRAVEL
              </p>
            </div>
            <div className="px-[2vw] pt-[1vw]">
              {currentloaction.latitude && currentloaction.longitude ? (
                <GoogleMap
                  width={"100%"}
                  height={"10vw"}
                  // currentloaction={currentloaction}
                />
              ) : (
                <img src={precius} className="h-[10vw] w-full blur-[0.2vw]" />
              )}
            </div>
            {localStorage.getItem("latitude") ? (
              <div className=" justify-between px-[2vw] flex mt-[2vw]">
                <button
                  className="text-white bg-[#1F487C] h-[2.5vw] text-[1.1vw]  w-[8vw] rounded-[0.8vw]"
                  // onClick={handleGrantPermission}
                >
                  Cancel
                </button>
                <button
                  className="text-white bg-[#1F487C] h-[2.5vw] text-[1.1vw] w-[8vw] rounded-[0.8vw]"
                  // onClick={handleDenyPermission}
                  onClick={() => setNext(true)}
                >
                  Next
                </button>
              </div>
            ) : (
              <div className=" justify-between px-[2vw] flex mt-[2vw]">
                <button
                  className="text-white bg-[#1F487C] h-[2.5vw] text-[1.1vw]  w-[8vw] rounded-[0.8vw]"
                  onClick={handleGrantPermission}
                >
                  Allow
                </button>
                <button
                  className="text-white bg-[#1F487C] h-[2.5vw] text-[1.1vw] w-[8vw] rounded-[0.8vw]"
                  onClick={handleDenyPermission}
                >
                  Don't Allow
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="h-[30vw] w-[50vw  justify-center flex-col">
            <p
              className="text-[#1F487C] text-[2.5vw]  font-semibold tracking-wide text-center"
              style={{
                fontFamily: "Playfair Display",
              }}
            >
              Never miss updates!
            </p>
            <p
              className="text-[1.3vw] text-center mt-[0.5vw]"
              style={{
                fontFamily: "Inter",
              }}
            >
              {`"${"Thank you for joining"}`}
              <span className="font-bold pl-[0.5vw]">{`${"thebusstand.com"}"`}</span>
            </p>

            <div
              className={`relative mx-[3vw] mb-[2vw] mt-[4.5vw]`}
              style={{
                borderStyle: `solid`,
                borderWidth: `0.2vw`,
                borderColor: `transparent`,
                borderImage: `linear-gradient(to right, #1F487C 50%, #1F487C 50%) 1`,
              }}
            >
              <img
                src={locationmap}
                className="'w-[2vw] h-[4vw] absolute right-[-2vw] bottom-[0.4vw]"
              />
              <div
                className={
                  " bg-[#1F487C]  w-[1vw] h-[1vw] absolute rounded-full  left-[-0.5vw] bottom-[-0.5vw]"
                }
              >
                <p className="text-[#1F487C] absolute left-[-1vw] bottom-[-1.8vw] text-[1.2vw] font-bold">
                  TIME
                </p>
              </div>
              <div
                className={`  bg-[#1F487C]
               w-[1vw] h-[1vw] absolute rounded-full  right-[-0.5vw] bottom-[-0.5vw]`}
              ></div>
              <p
                className={` text-[#1F487C]
                absolute left-[47.5%] bottom-[-2.3vw] text-[1.3vw] font-bold`}
              >
                To
              </p>
              <div
                className={`
                bg-[#1F487C]
               w-[1vw] h-[1vw] absolute rounded-full  left-[48%] bottom-[-0.5vw]`}
              ></div>
              <p
                className={` text-[#1F487C]
              absolute right-[-2vw] bottom-[-2.3vw] text-[1.3vw] font-bold`}
              >
                TRAVEL
              </p>
            </div>
            <div className="px-[2vw] pt-[1vw]">
              <img src={thankyou} className="h-[12vw] w-full " />
            </div>
          </div>
        )}
      </ModalPopup>
      <LoginModalPopUp
        show={loginIsOpen}
        onClose={closeLoginModal}
        height="35vw"
        width="60vw"
      >
        <Login setLoginIsOpen={setLoginIsOpen} />
      </LoginModalPopUp>

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
              console.log("hiiiiii", "main");

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
    </div>
  );
}

// <Formik
// initialValues={{
//   mobile: "",
//   age: "",
//   occupation: "",
//   name: "",
// }}
// validationSchema={validationSchema}
// onSubmit={(values) => {
//   console.log("onSubmit triggered"); // Log to check if onSubmit is called
//   setRegisterFullDetails(values);
//   setShowRegister(true);
//   console.log("Form submitted"); // Debug log
//   console.log(values, "values"); // Log form values                    localStorage.setItem("page1", true);
//   localStorage.setItem("occupation", values.occupation);
//   localStorage.setItem("mobile", values.mobile);
//   localStorage.setItem("sex", userdetails.sex);
//   localStorage.setItem("name", values.name);
//   localStorage.setItem("age", values.age);
// }}
// >
// {({ isSubmitting, handleSubmit, isValid }) => (
//   <Form onSubmit={handleSubmit}>
//     <div className="grid grid-row-2 w-full h-full gap-[1vw]">
//       <div className="row-span-1 py-[1vw]">
//         <div className="grid grid-cols-5 gap-[1.5vw]">
//           <div className="col-span-3 flex relative">
//             <Field
//               as="select"
//               name="option"
//               className="border-[0.1vw] border-py-[0.5vw] border-[#1F487C] placeholder-blue to-white border-[#1F487C] text-[#1F487C] text-[1.1vw] h-[3vw] w-[30%] rounded-l-[0.5vw] outline-none px-[1vw]"
//             >
//               <option
//                 value=""
//                 label="+91"
//                 className="text-gray-400"
//               />
//             </Field>
//             <Field
//               type="text"
//               name="mobile"
//               placeholder="Mobile Number"
//               maxLength={10}
//               className="border-y-[0.1vw] border-r-[0.5vw] bg-gradient-to-r placeholder-blue to-white border-[#1F487C] text-[#1F487C] text-[1.2vw] h-[3vw] w-[70%] rounded-r-[0.5vw] outline-none px-[1vw]"
//             />
//             <ErrorMessage
//               name="mobile"
//               component="div"
//               className="text-red-500 text-[0.8vw] absolute top-[3vw] left-[1vw]"
//             />
//           </div>
//           <div className="col-span-2">
//             <button
//               type="button"
//               className={`${
//                 userdetails.sex === "male"
//                   ? "bg-[#1F487C] text-white"
//                   : "bg-gradient-to-r  to-white text-[#1F487C]"
//               } h-[3vw] w-[50%] rounded-l-[0.5vw] border-[0.1vw] border-[#1F487C]`}
//               onClick={() =>
//                 setUserDetails({
//                   ...userdetails,
//                   sex: "male",
//                 })
//               }
//             >
//               Male
//             </button>
//             <button
//               type="button"
//               className={`${
//                 userdetails.sex === "female"
//                   ? "bg-[#1F487C] text-white"
//                   : "bg-gradient-to-r  to-white text-[#1F487C]"
//               } h-[3vw] w-[50%] rounded-r-[0.5vw] border-[0.1vw] border-[#1F487C]`}
//               onClick={() =>
//                 setUserDetails({
//                   ...userdetails,
//                   sex: "female",
//                 })
//               }
//             >
//               Female
//             </button>
//           </div>
//         </div>
//       </div>
//       <div className="row-span-1">
//         <div className="grid grid-cols-5 gap-[1.5vw]">
//           <div className="col-span-1">
//             <Field
//               type="text"
//               name="age"
//               placeholder="Age"
//               maxLength={2} // Enforce the character limit
//               className="border-r-[0.5vw] bg-gradient-to-r border-[0.1vw]  placeholder-blue to-white border-[#1F487C] text-[#1F487C] text-[1.2vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none px-[1vw]"
//             />
//             <ErrorMessage
//               name="age"
//               component="div"
//               className="text-red-500 text-[0.8vw]"
//             />
//           </div>
//           <div className="col-span-4">
//             <Field
//               as="select"
//               name="occupation"
//               placeholder="Occupation"
//               className="border-r-[0.5vw] bg-gradient-to-r border-[0.1vw]  placeholder-blue to-white border-[#1F487C] text-[#1F487C] text-[1.2vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none px-[1vw]"
//             >
//               <option
//                 value=""
//                 label="Select occupation"
//                 className="text-gray-400"
//               />
//               {occupation.map((item) => (
//                 <option
//                   key={item.label} // Add a key prop here
//                   value={item.label}
//                   label={item.label}
//                   className="text-gray-400"
//                 />
//               ))}
//             </Field>
//             <ErrorMessage
//               name="occupation"
//               component="div"
//               className="text-red-500 text-[0.8vw]"
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//     <div className="justify-between flex mt-[3vw]">
//       <button
//         className="text-white bg-[#1F487C] h-[2.5vw] text-[1.1vw] w-[8vw] rounded-[0.8vw]"
//         type="button"
//       >
//         Cancel
//       </button>
//       <button
//         className="text-white bg-[#1F487C] h-[2.5vw] text-[1.1vw] w-[8vw] rounded-[0.8vw]"
//         type="submit"
//         disabled={isSubmitting}
//       >
//         Next
//       </button>
//     </div>
//     {/* {registerFullDetails?.terms === true ? "" : <></>} */}
//   </Form>
// )}
// </Formik>
