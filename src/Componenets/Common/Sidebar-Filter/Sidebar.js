import React, { useCallback, useEffect, useState } from "react";
// import {
//   MdAirlineSeatIndividualSuite,
//   MdAirlineSeatReclineExtra,
// } from "react-icons/md";
// import { TbAirConditioning, TbAirConditioningDisabled } from "react-icons/tb";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { LuSunrise, LuSunset } from "react-icons/lu";
import { IoSunnyOutline } from "react-icons/io5";
import { PiMoonLight } from "react-icons/pi";
import { Input, Popover } from "antd";
import { CiSearch } from "react-icons/ci";
import Modal from "react-modal";
import s_ac from "../../../Assets/Sidebar/s_ac.png";
import s_c_ac from "../../../Assets/Sidebar/s_c_ac.png";
import s_non_ac from "../../../Assets/Sidebar/s_non_ac.png";
import s_c_non_ac from "../../../Assets/Sidebar/s_c_non_ac.png";
import seats from "../../../Assets/Sidebar/seats.png";
import sleeper from "../../../Assets/Sidebar/seat_sleep.png";
import { useDispatch, useSelector } from "react-redux";
import { IoTrashBinSharp } from "react-icons/io5";
// import {
//   FILTER,
//   GET_FILTER_DATA,
// } from "../../../Store/Type";
// import { BiMapPin } from "react-icons/bi";
// import { useNavigate } from "react-router";
// import Map from "../Dashboard/Map";
import axios from "axios";
// import {
//   Filters,
//   Drop_Point_List,
//   handleSearch,
// } from "../../Api/Dashboard/Dashboard";
import { FaRegStar, FaStar } from "react-icons/fa";
import RangeSlide from "../RangeSlide/RangeSlide";
import { FaBus } from "react-icons/fa";
import { RiBusFill } from "react-icons/ri";
import { GET_BUS_FILTERS, GET_BUS_LIST } from "../../../Store/Type";
import { useParams } from "react-router";
import { Abhibus_GetBusList } from "../../../Api-Abhibus/Home/HomePage";
import moment from "moment";

const Sidebar = ({ sidebarToggle, share }) => {
  const arrange_data = useSelector((state) => state.rearrange);
  const [amenitiesvalue, setAmenitiesValue] = useState({});

  // const [vehiclevalue, setVehicleValue] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalname, setModalname] = useState("");
  // const [finalpickupdata, setFinalPickupData] = useState([]);
  // const [finaldropdata, setFinalDropData] = useState([]);
  // const [finaloperatordata, setFinalOperatorData] = useState([]);
  const [modalsearch, setModalSearch] = useState("");
  const [handlesearchValue, setHandleSearchValue] = useState("");
  const [handlesearchAmenities, setHandleSearchAmenities] = useState("");
  const [handlesearchDrop, setHandleSearchDrop] = useState("");
  const [handlesearchPickup, setHandleSearchPickup] = useState("");
  const [handlesearchOperators, setHandleSearchOperators] = useState("");
  const [modalshowdata, setModalShowData] = useState([]);
  const [pickupchecked, setPickupChecked] = useState({});
  const [dropchecked, setDropChecked] = useState({});
  const [operatorchecked, setOperatorChecked] = useState({});
  const [showingdata, setShowingData] = useState([]);
  // const [modalpickupsearch, setModalpickupsearch] = useState("");
  // const [busData, setBusData] = useState();
  const [value, setValue] = useState([0, 3000]);
  const [busFilterType, setBusFilterType] = useState("")

  // const buslist = useSelector((state) => state?.card_detail);
  const [pickUp_list, setPickUpList] = useState({});
  //   const drop_Point_List = useSelector((state) => state?.drop_point_list);

  // const [selectedPickupPoint, setSelectedPickupPoint] = useState("");
  // const [selectedDroppingPoint, setSelectedDroppingPoint] = useState("");

  // const [searchvalue, setSearchValue] = useState({
  //   pickup: "",
  //   drop: "",
  //   operator: "",
  // });
  const [filtervalue, setFitervalue] = useState({
    ac: false,
    non_ac: false,
    sleeper: false,
    seater: false,
    amenities: [],
  });
  const [timefiltervalue, setTimeFitervalue] = useState({
    // time_6:00 AM to 11:00 AM: false,
    // time_11:00 AM to 6:00 PM: false,
    // time_6:00 PM to 11:00 PM: false,
    // time_11:00 PM to 6:00 AM: false,
  });
  // const [pickuptimefiltervalue, setPickupTimeFitervalue] = useState({
  //   // time_6:00 AM to 11:00 AM: false,
  //   // time_11:00 AM to 6:00 PM: false,
  //   // time_6:00 PM to 11:00 PM: false,
  //   // time_11:00 PM to 6:00 AM: false,
  // });
  const [boolean, setBoolean] = useState({
    pickup: true,
    drop: true,
    pickup_time: true,
    drop_time: true,
    amenities: true,
    operators: true,
    vehicle: true,
    price: true,
    radius: true,
    ratings: true,
  });

  const handleClear = useCallback(() => {
    // setAcFilter("");
    // setNoramlBus(false);
    // setBusType(false);
    // setSeatTypeFilter("");
    // setDropChecked({});
    // setOperatorChecked({});
    // setPickupChecked({});
    // setAmenitiesValue({});
    // setPriceRange([0, 3000]);
    // setValue([0, 3000]);
    // setBusType(false);
    // setNoramlBus(false);
    // setFitervalue({
    //   ac: false,
    //   non_ac: false,
    //   sleeper: false,
    //   seater: false,
    //   amenities: [],
    // });

    // setTimeFitervalue({
    //   ...timefiltervalue,
    // });

    // setDropTime("");
    // setPickUpTime("");
    // setAcFilter("");
    // setSeatTypeFilter("");
    // localStorage.setItem("isLuxury", false);
    amenitiesClear()
    vehicleclear()
    pickupClear()
    dropClear()
    operatorClear()
    pickuptimeClear()
    setValue([0, 3000]);
    setPriceRange({ min: 0, max: 3000 });
    timeClear("")
    sessionStorage.setItem('home_luxury', null)
    sessionStorage.setItem('home_seat_type', null)
    sessionStorage.setItem('home_ac', null)


  }, [timefiltervalue]);

  useEffect(() => {
    if (sessionStorage.getItem("clearFilter") === "true") {
      handleClear();
    }
    sessionStorage.removeItem("clearFilter");
  }, [handleClear]);

  const dispatch = useDispatch();
  // const operators = [
  //   { place: "InterCity SmartBus", count: "85" },
  //   { place: "Sharma Travels", count: "113" },
  //   { place: "SPS Travels", count: "67" },
  //   { place: "KPN Travels", count: "20" },
  //   { place: "National Travels", count: "67" },
  //   { place: "Orange Travels", count: "77" },
  //   { place: "Bharath Travels", count: "77" },
  // ];
  // const travel_operator = operators.slice(0, 5);
  // const place = [
  //   { place: "Avinashi", count: "113" },
  //   { place: "Palladam", count: "85" },
  //   { place: "Pushpa", count: "67" },
  //   { place: "New Bus Stand", count: "20" },
  //   { place: "Sri nagar", count: "67" },
  //   { place: "Old Bus Stand", count: "15" },
  //   { place: "Gandhi nagar", count: "18" },
  //   { place: "Town hall", count: "50" },
  //   { place: "Old Bus Stand", count: "15" },
  //   { place: "Gandhi nagar", count: "18" },
  //   { place: "Town hall", count: "50" },
  // ];
  // const drop_place = [
  //   { place: "KMCH", count: "113" },
  //   { place: "Airport", count: "85" },
  //   { place: "RS Puram", count: "67" },
  //   { place: "Gandhipuram", count: "20" },
  //   { place: "Saravanampatti", count: "67" },
  // ];
  // const amenities = [
  //   { amenities: "WIFI", count: 12, id: 1 },
  //   { amenities: "Water bottle", count: 15, id: 2 },
  //   { amenities: "Toilet", count: 6, id: 3 },
  //   { amenities: "Track My Bus", count: 52, id: 4 },
  //   { amenities: "Blankets", count: 74, id: 5 },
  //   { amenities: "Charging Point", count: 30, id: 6 },
  // ];

  // const handleAmenities = (item) => {
  //   const isAmenitySelected = amenitiesvalue.includes(item);
  //   const tag = amenities.includes(item);
  //   if (isAmenitySelected) {
  //     // If amenity is already selected, remove it
  //     setAmenitiesValue(amenitiesvalue.filter((amenity) => amenity !== item));
  //   } else {
  //     // If amenity is not selected, add it
  //     setAmenitiesValue([...amenitiesvalue, item]);
  //   }
  // };

  // const capitalizeFirstLetter = (string) => {
  //   return string
  //     .split(" ")
  //     .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
  //     .join(" ");
  // };

  const amenitiesClear = () => {
    setAmenitiesValue({});
  };

  const vehicleclear = () => {
    // setVehicleClear([]);
    // setFitervalue({
    //   ac: false,
    //   non_ac: false,
    //   sleeper: false,
    //   seater: false,
    //   amenities: [],
    //   radius: false,
    // });
    setAcFilter(false);
    SetBusFilters("")
    setNoramlBus(false);
    localStorage.setItem("isLuxury", false);
    setBusType(false);
    setSeatTypeFilter("");
    sessionStorage.setItem('home_luxury', null)
    sessionStorage.setItem('home_seat_type', null)
    sessionStorage.setItem('home_ac', null)
  };

  const openModal = (name) => {
    setModalname(name);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setModalSearch("");
  };

  // const groupByFirstLetter = (places) => {
  //   const groupedPlaces = {};
  //   places.forEach((item) => {
  //     const firstLetter = item.place.charAt(0).toUpperCase();
  //     if (!groupedPlaces[firstLetter]) {
  //       groupedPlaces[firstLetter] = [];
  //     }
  //     groupedPlaces[firstLetter].push(item);
  //   });
  //   return groupedPlaces;
  // };

  const handleoperatorCheckbox = (event, itemName) => {
    const { checked } = event.target;
    setOperatorChecked((prevState) => {
      if (checked) {
        return { ...prevState, [itemName]: true };
      } else {
        const updatedItems = { ...prevState };
        delete updatedItems[itemName];
        return updatedItems;
      }
    });
  };
  const pickupClear = () => {
    setPickupChecked({});
  };
  const dropClear = () => {
    setDropChecked({});
  };
  const operatorClear = () => {
    setOperatorChecked({});
  };

  const timeClear = () => {
    // setTimeFitervalue({
    //   ...timefiltervalue,
    //   time_6:00 AM to 11:00 AM: false,
    //   time_11:00 AM to 6:00 PM: false,
    //   time_6:00 PM to 11:00 PM: false,
    //   time_11:00 PM to 6:00 AM: false,
    // });
    setDropTime("");
  };
  const pickuptimeClear = () => {
    setPickUpTime("");
  };

  useEffect(() => {
    if (modalname === "pickup") {
      const filteredData = showingdata?.filter((item) =>
        item?.name?.toLowerCase()?.includes(modalsearch?.toLowerCase())
      );
      // const groupedPlaces = groupByFirstLetter(filteredData);
      // setModalShowData(groupedPlaces);
      setModalShowData(filteredData);
    } else if (modalname === "drop") {
      const filteredData = showingdata?.filter((item) =>
        item?.name?.toLowerCase()?.includes(modalsearch?.toLowerCase())
      );
      // const groupedPlaces = groupByFirstLetter(filteredData);
      // setModalShowData(groupedPlaces);
      setModalShowData(filteredData);
    } else if (modalname === "amenities") {
      const filteredData = showingdata?.filter((item) =>
        item?.amenity?.toLowerCase()?.includes(modalsearch?.toLowerCase())
      );
      // const groupedPlaces = groupByFirstLetter(filteredData);
      // setModalShowData(groupedPlaces);
      setModalShowData(filteredData);
    } else {
      const filteredData = showingdata?.filter((item) =>
        item?.operator?.toLowerCase()?.includes(modalsearch?.toLowerCase())
      );
      // const groupedPlaces = groupByFirstLetter(filteredData);
      // setModalShowData(groupedPlaces);
      setModalShowData(filteredData);
    }
  }, [modalname, modalsearch, showingdata]);
  // useEffect(() => {
  //   // const pickupslice = place.slice(0, 5);
  //   // const dropslice = drop_place.slice(0, 5);
  //   // const travelslice = travel_operator.slice(0, 5);
  //   if (searchvalue.pickup) {
  //     // const filteredData = place.filter((item) =>
  //     //   item.place.toLowerCase().includes(searchvalue.pickup.toLowerCase())
  //     // );
  //     // setFinalPickupData(filteredData);
  //   } else {
  //     // setFinalPickupData(pickupslice);
  //   }
  //   if (searchvalue.drop) {
  //     // const filteredData = drop_place.filter((item) =>
  //     //   item.place.toLowerCase().includes(searchvalue.drop.toLowerCase())
  //     // );
  //     // setFinalDropData(filteredData);
  //   } else {
  //     // setFinalDropData(dropslice);
  //   }
  //   if (searchvalue.operator) {
  //     // const filteredData = travel_operator.filter((item) =>
  //     //   item.place.toLowerCase().includes(searchvalue.operator.toLowerCase())
  //     // );
  //     // setFinalOperatorData(filteredData);
  //   } else {
  //     // setFinalOperatorData(travelslice);
  //   }
  // }, [searchvalue]);

  useEffect(() => {
    const filterfun = () => {
      if (filtervalue) {
        // dispatch({
        //   type: FILTER,
        //   payload: filtervalue,
        // });
      }
    };
    filterfun();
  }, [filtervalue, dispatch]);
  // const groupedPlaces = groupByFirstLetter(showingdata);
  // const handleonapply = () => {
  //   setModalIsOpen(false);
  // };
  // const navigation = useNavigate();
  // const [isMapPage, setIsMapPage] = useState(false);
  // const handleradius = () => {
  //   setFitervalue({ ...filtervalue, radius: !filtervalue.radius });
  //   // navigation("/map");
  //   if (isMapPage) {
  //     navigation("/dashboard");
  //     localStorage.setItem("depature", "Chennai");
  //   } else {
  //     navigation("/map");
  //   }
  //   setIsMapPage(!isMapPage);
  // };
  // useEffect(() => {
  //   if (filtervalue.radius) {
  //     navigation("/map");
  //   } else {
  //     navigation("/dashboard");
  //   }
  // }, []);
  const busdata = useSelector((state) => state.bus_data);
  const [acfilter, setAcFilter] = useState("");
  const [seattypefilter, setSeatTypeFilter] = useState("");
  const [busType, setBusType] = useState();
  const [NormalBus, setNoramlBus] = useState(false);
  const [pickuptime, setPickUpTime] = useState("");
  const [droptime, setDropTime] = useState("");
  // const [departure, setDeparture] = useState("");
  // const [arrival, setArrival] = useState("");
  // const [seatsSorting, setseatsSorting] = useState("false");
  // const [priceSorting, setpriceSorting] = useState("false");
  // const [ratingSorting, setratingSorting] = useState("false");
  // const [arrivalSorting, setarrivalSorting] = useState("false");
  // const [departureSorting, setdepartureSorting] = useState("false");
  const [priceRange, setPriceRange] = useState({
    min: 0,
    max: 3000,
  });

  const localSrgAc = localStorage.getItem("ac");
  const localSrgSeat = localStorage.getItem("seatType");

  useEffect(() => {
    if (localStorage.getItem("ac") === "true") {
      setAcFilter("ac");
    }
    if (localStorage.getItem("seatType")) {
      setSeatTypeFilter(localStorage.getItem("seatType"));
    }
    if (localStorage.getItem("isLuxury") === "true") {
      setBusType(true);
    }
    // if (localStorage.getItem("departure")) {
    //   // setDeparture(localStorage.getItem("departure"));
    // }0
    // if (localStorage.getItem("arrival")) {
    //   // setArrival(localStorage.getItem("arrival"));
    // }
    // if (localStorage.getItem("sort") === "seats") {
    //   // setseatsSorting(localStorage.getItem("sort"));
    // }
    // if (localStorage.getItem("sort") === "price") {
    //   // setpriceSorting(localStorage.getItem("sort"));
    // }
    // if (localStorage.getItem("sort") === "ratings") {
    //   // setratingSorting(localStorage.getItem("sort"));
    // }
    // if (localStorage.getItem("sort") === "arrivalSort") {
    //   // setarrivalSorting(localStorage.getItem("sort"));
    // }
    // if (localStorage.getItem("sort") === "departureSort") {
    //   // setdepartureSorting(localStorage.getItem("sort"));
    // }
  }, [localSrgAc, localSrgSeat]);

  useEffect(() => {
    // Clear sessionStorage when the page reloads
    const handleBeforeUnload = () => {
      localStorage.setItem("isLuxury", false);
      localStorage.setItem("seatType", "");
      localStorage.setItem("ac", "");
      setAcFilter("");
    };

    // Adding event listener for page unload (reload, close, etc.)
    window.addEventListener("beforeunload", handleBeforeUnload);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  const handleAllFilters = useCallback(async () => {
    sessionStorage.setItem("spinner", "true");

    try {
      // Your existing filter logic...
      const pickupcheck = Object.keys(pickupchecked).filter(
        (key) => pickupchecked[key]
      );
      const operatorcheck = Object.keys(operatorchecked).filter(
        (key) => operatorchecked[key]
      );
      const dropcheck = Object.keys(dropchecked).filter(
        (key) => dropchecked[key]
      );
      const amenitycheck = Object.keys(amenitiesvalue).filter(
        (key) => amenitiesvalue[key]
      );
      let dateTimeString = localStorage.getItem("selectdate");

      if (dateTimeString) {
        let dateObj = new Date(dateTimeString);
        const formattedDate =
          dateObj.getFullYear() +
          "-" +
          ("0" + (dateObj.getMonth() + 1)).slice(-2) +
          "-" +
          ("0" + dateObj.getDate()).slice(-2);

        localStorage.setItem("departure_date", formattedDate);
      }

      //   const allFilters = await Filters(
      //     localStorage.getItem("departure"),
      //     localStorage.getItem("arrival"),
      //     localStorage.getItem("departure_date"),
      //     busType,
      //     acfilter,
      //     seattypefilter,
      //     pickuptime,
      //     droptime,
      //     pickupcheck,
      //     dropcheck,
      //     amenitycheck,
      //     operatorcheck,
      //     priceRange,
      //     localStorage.getItem("sort"),
      //     NormalBus,
      //     dispatch
      //   );

      setTimeout(() => {
        sessionStorage.setItem("spinner", "false");
      }, 1000);
    } catch (error) {
      setTimeout(() => {
        sessionStorage.setItem("spinner", "false");
      }, 1000);
    }
  }, [
    busType,
    acfilter,
    seattypefilter,
    pickuptime,
    droptime,
    pickupchecked,
    dropchecked,
    amenitiesvalue,
    operatorchecked,
    priceRange,
    NormalBus,
    dispatch,
  ]);

  const locSrgDep = localStorage.getItem("departure");
  const locSrgarr = localStorage.getItem("arrival");
  const locSrgDepDte = localStorage.getItem("departure_date");
  const sesSrgLux = sessionStorage.getItem("isLuxury");
  const locSrgSort = localStorage.getItem("sort");

  useEffect(() => {
    handleAllFilters();
  }, [
    // localStorage.getItem("departure"),
    // localStorage.getItem("arrival"),
    // localStorage.getItem("departure_date"),
    // sessionStorage.getItem("isLuxury"),
    locSrgDep,
    locSrgarr,
    locSrgDepDte,
    sesSrgLux,
    busType,
    acfilter,
    seattypefilter,
    pickuptime,
    droptime,
    pickupchecked,
    dropchecked,
    amenitiesvalue,
    operatorchecked,
    priceRange,
    // localStorage.getItem("sort"),
    locSrgSort,
    NormalBus,
    handleAllFilters,
    dispatch,
  ]);

  const handleDropPoint = useCallback(async () => {
    try {
      //   const dropPiontFilter = await Drop_Point_List(
      //     localStorage.getItem("departure"),
      //     localStorage.getItem("arrival"),
      //     localStorage.getItem("selectdate"),
      //     dispatch
      //   );
      //   setPickUpList(dropPiontFilter || {});
    } catch (error) { }
  }, [dispatch]);

  const locSrgSdate = localStorage.getItem("selectdate");

  useEffect(() => {
    handleDropPoint();
  }, [
    // localStorage.getItem("departure"),
    // localStorage.getItem("arrival"),
    // localStorage.getItem("selectdate"),
    locSrgDep,
    locSrgarr,
    locSrgSdate,
    // drop_Point_List,
    handleDropPoint,
    dispatch,
  ]);

  const handlePickupCheckbox = (event, itemName) => {
    const { checked } = event.target;
    // const { name, checked } = event.target;
    // setCheckboxes({ ...checkboxes, [name]: checked });
    setBusFilterType("pickupfilter")
    setPickupChecked((prevState) => {
      if (checked) {
        return { ...prevState, [itemName]: true };
      } else {
        const updatedItems = { ...prevState };
        delete updatedItems[itemName];
        return updatedItems;
      }
    });

  };

  const handledropCheckbox = (event, itemName) => {
    const { checked } = event.target;

    setDropChecked((prevState) => {
      if (checked) {
        return { ...prevState, [itemName]: true };
      } else {
        const updatedItems = { ...prevState };
        delete updatedItems[itemName];
        return updatedItems;
      }
    });
  };

  //   const Search = async (e, values) => {
  //     // const response = await handleSearch(dispatch, e, values);
  //     // const searchData = response?.data || [];
  //     if (handlesearchValue === "amenities") {
  //       setHandleSearchAmenities(searchData);
  //     } else if (handlesearchValue === "dropping") {
  //       setHandleSearchDrop(searchData);
  //     } else if (handlesearchValue === "boarding") {
  //       setHandleSearchPickup(searchData);
  //     } else if (handlesearchValue === "operators") {
  //       setHandleSearchOperators(searchData);
  //     }
  //   };

  const handleAmenityCheckbox = (event, itemName) => {
    const { checked } = event.target;

    setAmenitiesValue((prevState) => {
      if (checked) {
        return { ...prevState, [itemName]: true };
      } else {
        const updatedItems = { ...prevState };
        delete updatedItems[itemName];
        return updatedItems;
      }
    });
  };
  // const handlePickup_checkbox = (e, name) => {
  //   if (e.target.checked) {
  //     // setSelectedPickupPoint(name);
  //     console.log(name, "drop checked");
  //   } else {
  //     // setSelectedPickupPoint(""); // Clear the selection if unchecked
  //   }
  // };

  // const handledrop_Checkbox = (e, name) => {
  //   if (e.target.checked) {
  //     // setSelectedDroppingPoint(name);
  //     console.log(name, "drop checked");
  //   } else {
  //     // setSelectedDroppingPoint(""); // Clear the selection if unchecked
  //   }
  // };

  const handlefilter = useCallback(async () => {
    try {
      const operatorcheck = Object.keys(operatorchecked).filter(
        (key) => operatorchecked[key]
      );

      const transformedData = amenitiesvalue?.reduce((acc, item) => {
        // Check if item exists and set its value to true
        acc[item] = true;
        return acc;
      }, {});
      const amenitiescheck = Object.keys(transformedData).filter(
        (key) => transformedData[key]
      );
      // const dropcheck = Object.keys(dropchecked)
      //   .filter((key) => dropchecked[key])
      //   .map((key, index) => "test" + (index + 1))
      //   .join(",");
      const payload = {
        // source: localStorage.getItem("depature"),
        De_source: "Chennai",
        Ar_source: "Coimbatore",
        AC: acfilter === "ac" ? "TRUE" : "FALSE",
        NON_AC: acfilter === "non_ac" ? "TRUE" : "FALSE",
        Seater: seattypefilter === "seater" ? "TRUE" : "FALSE",
        Sleeper: seattypefilter === "sleeper" ? "TRUE" : "FALSE",
        Semi_sleeper: seattypefilter === "semi_sleeper" ? "TRUE" : "FALSE",
        //pickupPoints: pickupcheck.join(","),
        //dropPoints: dropcheck.join(","),
        selectedOperators: operatorcheck.join(","),
        //amenities: amenitiescheck.join(","),
        timeDepature: pickuptime,
        timeArrival: droptime,
        price: arrange_data.price ? arrange_data.price : "FALSE",
        depature: arrange_data.depature ? arrange_data.depature : "FALSE",
        arrival: arrange_data.arrival ? arrange_data.arrival : "FALSE",
        seats: arrange_data.seats ? arrange_data.seats : "FASLE",
        rating: arrange_data.rating ? arrange_data.rating : "FALSE",
        // timeDepature:"6:00 AM to 11:00 AM"
      };

      // const place = localStorage.getItem("depature");
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
      //   dispatch({
      //     type: GET_FILTER_DATA,
      //     payload: response.data,
      //   });
    } catch (error) { }
  }, [
    acfilter,
    seattypefilter,
    // searchvalue,
    pickupchecked,
    operatorchecked,
    amenitiesvalue,
    pickuptime,
    droptime,
    arrange_data,
    dispatch,
  ]);
  useEffect(() => {
    handlefilter();
  }, [
    acfilter,
    seattypefilter,
    // searchvalue,
    pickupchecked,
    dropchecked,
    operatorchecked,
    amenitiesvalue,
    pickuptime,
    droptime,
    arrange_data,
    // localStorage.getItem("depature"),
    // localStorage.getItem("arrival"),
    locSrgDep,
    locSrgarr,
    handlefilter,
  ]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const place = localStorage.getItem("depature");
  //       const response = await axios.get(
  //         place === "Chennai"
  //           ? "http://192.168.90.43:8090/chennaisrc"
  //           : place === "Bangalore"
  //           ? "http://192.168.90.43:8090/bangaloresrc"
  //           : "http://192.168.90.43:8090/chennaisrc"
  //       );
  //       dispatch({
  //         type: GET_DATA,
  //         payload: response.data,
  //       });
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };

  //   fetchData();
  // }, [localStorage.getItem("depature")]);

  const fulllist = useSelector((state) => state.get_data);

  // const filter = fulllist.map((item) => {
  //   return item?.Pickup_points.split(",");
  // });
  // const find = filter.filter((item, index) => {
  //   return item[0] === "Siruseri";
  // });

  // const splitData = (data) => {
  //   const splitArrays = [];
  //   for (let i = 0; i < data.length; i += 8) {
  //     splitArrays.push(data.slice(i, i + 8));
  //   }
  //   return splitArrays;
  // };

  // const groupedData = fulllist.reduce((acc, obj) => {
  //   const key = `operator${obj.bus_operator_id}`;
  //   if (!acc[key]) {
  //     acc[key] = [];
  //   }
  //   acc[key].push(obj);
  //   return acc;
  // }, {});
  const [amenitieslist, setAmenitiesList] = useState([]);
  // const [dropponitlist, setDropPointList] = useState([]);
  const [dropfulllist, setDropFullList] = useState([]);
  // const [pickuppointlist, setPickupPointlist] = useState([]);
  const [pickupfullist, setPickupFullList] = useState([]);
  // const [opertorlist, setOperatorList] = useState([]);
  const [opertorfulllist, setOperatorFullList] = useState([]);

  useEffect(() => {
    // amenities
    // const Amenities = fulllist.map((item) => {
    //   return item.Amenities.split(",");
    // });

    // const AmenitiesArray = [].concat(...Amenities);
    // const AmenitiesCount = AmenitiesArray.reduce((acc, val) => {
    //   acc[val] = (acc[val] || 0) + 1;
    //   return acc;
    // }, {});

    // const AmenitiesData = Object.entries(AmenitiesCount)
    //   .filter(([place, count]) => place.trim() !== "")
    //   .map(([place, count]) => ({
    //     place,
    //     count,
    //   }));

    setAmenitiesList(
      handlesearchAmenities?.length > 0
        ? handlesearchAmenities?.amenities
        : pickUp_list?.amenities
    );

    // droppoints
    // const Droppoints = fulllist.map((item) => {
    //   return item.Drop_points.split(",");
    // });
    // const DroppointsArray = [].concat(...Droppoints);
    // const DroppointsCount = DroppointsArray.reduce((acc, val) => {
    //   acc[val] = (acc[val] || 0) + 1;
    //   return acc;
    // }, {});

    // const DroppointsData = Object.entries(DroppointsCount)
    //   .filter(([place, count]) => place.trim() !== "")
    //   .map(([place, count]) => ({
    //     place,
    //     count,
    //   }));

    setDropFullList(pickUp_list?.dropping_points);
    // const travelslice = DroppointsData?.slice(0, 5);
    // if (searchvalue.drop) {
    //   const filteredData = DroppointsData.filter((item) =>
    //     item.place.toLowerCase().includes(searchvalue.drop.toLowerCase())
    //   );
    //   setDropPointList(filteredData);
    // } else {
    //   setDropPointList(travelslice);
    // }

    // pickuppoint
    const Pickuppoints = fulllist?.map((item) => {
      return item.Pickup_points.split(",");
    });

    // const PickuppointsArray = [].concat(...Pickuppoints);
    // const PickuppointsCount = PickuppointsArray?.reduce((acc, val) => {
    //   acc[val] = (acc[val] || 0) + 1;
    //   return acc;
    // }, {});

    // const PickuppointsData = Object.entries(PickuppointsCount)
    //   .filter(([place, count]) => place.trim() !== "")
    //   .map(([place, count]) => ({
    //     place,
    //     count,
    //   }));

    setPickupFullList(pickUp_list?.boarding_points);
    // const pickupslice = PickuppointsData?.slice(0, 5);
    // if (searchvalue.pickup) {
    //   const filteredData = PickuppointsData.filter((item) =>
    //     item.place.toLowerCase().includes(searchvalue.pickup.toLowerCase())
    //   );
    //   setPickupPointlist(filteredData);
    // } else {
    //   setPickupPointlist(pickupslice);
    // }

    // travel operator
    const Bus_operator_name = fulllist?.map((item) => {
      return item.Bus_operator_name;
    });
    const uniqueArray = [...new Set(Bus_operator_name)];

    const travelcount = uniqueArray?.reduce((acc, val) => {
      acc[val] = (acc[val] || 0) + 1;
      return acc;
    }, {});
    const traveldata = Object.entries(travelcount)
      .filter(([place, count]) => place.trim() !== "")
      .map(([place, count]) => ({
        place,
        count,
      }));
    // const travelopertorslice = traveldata.slice(0, 5);

    setOperatorFullList(pickUp_list?.operators);
    // if (searchvalue.operator) {
    //   const filteredData = traveldata.filter((item) =>
    //     item.place.toLowerCase().includes(searchvalue.operator.toLowerCase())
    //   );
    //   setOperatorList(filteredData);
    // } else {
    //   setOperatorList(travelopertorslice);
    // }
    // const traveloperatorarray = [].concat(...traveloperator);
    // const traveloperatorcount = traveloperatorarray.reduce((acc, val) => {
    //   acc[val] = (acc[val] || 0) + 1;
    //   return acc;
    // }, {});
    // const traveloperatorData = Object.entries(traveloperatorcount)
    //   .filter(([place, count]) => place.trim() !== "")
    //   .map(([place, count]) => ({
    //     place,
    //     count,
    //   }));
    // setPickupFullList(traveloperatorData);
    // const traveloperatorslice = traveloperatorData.slice(0, 5);
    // if (searchvalue.pickup) {
    //   const filteredData = traveloperatorData.filter((item) =>
    //     item.place.toLowerCase().includes(searchvalue.pickup.toLowerCase())
    //   );
    //   setPickupPointlist(filteredData);
    // } else {
    //   setPickupPointlist(traveloperatorslice);
    // }
    // console.log(modalshowdata,"shdifjsodfhsdf");
  }, [
    // searchvalue ,
    fulllist,
    pickUp_list,
    opertorfulllist,
  ]);
  const sortedList = modalshowdata
    ?.slice()
    ?.sort((a, b) =>
      modalname === "amenities"
        ? a?.amenity?.localeCompare(b?.amenity)
        : modalname === "operators"
          ? a?.operator?.localeCompare(b?.operator)
          : a?.name?.localeCompare(b?.name)
    );

  const sharing = useSelector((state) => state.share);
  // const logoimage = "file://akritnas/nubiznez/Operator_logos/ss.png";
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     // window.location.reload();
  //     const fetchData = async () => {
  //       try {
  //         const place = localStorage.getItem("depature");
  //         const response = await axios.get(
  //           place === "Chennai"
  //             ? "http://192.168.90.43:8090/chennaisrc"
  //             : place === "Bangalore"
  //             ? "http://192.168.90.43:8090/bangaloresrc"
  //             : "http://192.168.90.43:8090/chennaisrc"
  //         );
  //         dispatch({
  //           type: GET_DATA,
  //           payload: response.data,
  //         });
  //       } catch (error) {
  //       }
  //     };
  //     fetchData();
  //   }, 5000);
  //   // 5 * 60 * 1000
  //   return () => clearInterval(interval);
  // }, [localStorage.getItem("depature")]);

  // const isTimeRangeEqual = (range1, range2) => {
  //   return range1.start === range2.start && range1.end === range2.end;
  // };

  useEffect(() => {
    if (modalname === "pickup") {
      handlesearchValue?.boarding_point
        ? setShowingData(handlesearchValue?.boarding_point)
        : setShowingData(pickupfullist);
    } else if (modalname === "drop") {
      handlesearchValue?.dropping_point
        ? setShowingData(handlesearchValue?.dropping_point)
        : setShowingData(dropfulllist);
    } else if (modalname === "amenities") {
      handlesearchValue?.amenities
        ? setShowingData(handlesearchValue?.amenities)
        : setShowingData(amenitieslist);
    } else {
      handlesearchValue?.operators
        ? setShowingData(handlesearchValue?.operators)
        : setShowingData(opertorfulllist);
    }
  }, [
    modalname,
    pickupfullist,
    handlesearchAmenities,
    handlesearchDrop,
    handlesearchOperators,
    dropfulllist,
    opertorfulllist,
    handlesearchPickup,
    amenitieslist,
    handlesearchValue,
  ]);

  const toTitleCase = (str) => {
    if (typeof str !== "string" || str === "") {
      return str; // return the input as is if it's not a valid string
    }

    return str
      .split(" ")
      .map((word) => {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      })
      .join(" ");
  };

  const boardingPointsLength = handlesearchValue?.boarding_point
    ? handlesearchValue?.boarding_point?.length
    : pickUp_list?.boarding_points?.length;

  const OperatorLength = handlesearchValue?.operators
    ? handlesearchValue?.operators?.length
    : pickUp_list?.operators?.length;

  const dropingPointsLength = handlesearchValue?.dropping_point
    ? handlesearchValue?.dropping_point?.length
    : pickUp_list?.dropping_points?.length;

  const amenitiesLength = handlesearchValue?.amenities
    ? handlesearchValue?.amenities?.length
    : pickUp_list?.amenities?.length;
  const handleSearch = () => {
    console.log("hi");
  };
  // new data
  const buslist = useSelector((state) => state?.get_buslist);
  const filter_buslist = useSelector((state) => state?.get_buslist_filter);

  const currentpath = useParams();

  const GetBusList = async () => {
    const busdatas = {
      from: currentpath?.source_name,
      to: currentpath?.destination_name,
      from_sourceID: currentpath?.source_ID,
      to_sourceID: currentpath?.destionation_ID,
      date: currentpath?.trip_date,
    };
    const data = await Abhibus_GetBusList(dispatch, busdatas, busdatas?.date);
  };
  //   useEffect(() => {
  //     const non_ac_list = buslist?.filter((item) => {
  //       return item?.bus_type?.toLowerCase()?.includes("non-ac");
  //     });
  //     const luxury_bus__list = buslist?.filter((item) => {
  //       return (
  //         item?.Bus_Type_Name?.toLowerCase()?.includes("mercedes benz") ||
  //         item?.Bus_Type_Name?.toLowerCase()?.includes("volvo")
  //       );
  //     });
  //     console.log(luxury_bus__list, "luxury_bus__list");
  //     const normal_bus__list = buslist?.filter((item) => {
  //       return !(
  //         item?.Bus_Type_Name?.toLowerCase()?.includes("mercedes benz") ||
  //         item?.Bus_Type_Name?.toLowerCase()?.includes("volvo")
  //       );
  //     });
  //     console.log(normal_bus__list, "normal_bus__list");
  // console.log(NormalBus,"NormalBusNormalBus");
  // console.log(busType,"buslistbuslist");

  //     if (NormalBus ===true) {
  //       dispatch({
  //         type: GET_BUS_LIST,
  //         payload: normal_bus__list,
  //       });
  //     }
  //      if(NormalBus===false) {
  //       console.log("fytgfy");

  //     GetBusList()
  //     }
  //     if (busType ===true) {
  //       dispatch({
  //         type: GET_BUS_LIST,
  //         payload: luxury_bus__list,
  //       });
  //     }
  //      if(busType===false) {
  //       console.log("fytgfy");

  //     GetBusList()
  //     }
  //   }, [NormalBus,busType]);

  const OperatorName = [
    ...new Set(buslist.map((item) => item?.Traveler_Agent_Name)),
  ];

  const dropCount = buslist
    .map((item) => item.dropping_info.map((data) => data.split("^")[1])) // Extract names from the string
    .flat() // Flatten the array if necessary
    .reduce((acc, dropping_info) => {
      // Count occurrences of each name
      acc[dropping_info] = (acc[dropping_info] || 0) + 1;
      return acc;
    }, {}); // Initialize an empty object to store name counts

  // Get the unique names and their counts as an array of objects
  const DroppingPoints = Object.entries(dropCount).map(([name, count]) => ({
    name,
    count,
  }));

  const boardCount = buslist
    .map((item) => item.boarding_info.map((data) => data.split("^")[0])) // Extract names from the string
    .flat() // Flatten the array if necessary
    .reduce((acc, boarding_info) => {
      // Count occurrences of each name
      acc[boarding_info] = (acc[boarding_info] || 0) + 1;
      return acc;
    }, {}); // Initialize an empty object to store name counts

  // Get the unique names and their counts as an array of objects
  const BoardingPoints = Object.entries(boardCount).map(([name, count]) => ({
    name,
    count,
  }));

  const [searchQueries, setSearchQueries] = useState({
    boardingPoints: "",
    droppingPoints: "",
    Operators: "",
    Amenities: "",
  });

  const handleSearchChange = (e, key) => {
    setSearchQueries((prevState) => ({
      ...prevState,
      [key]: e.target.value,
    }));
  };

  const filteredBoardingPoints = BoardingPoints.filter((point) =>
    point.name
      .toLowerCase()
      .includes(searchQueries?.boardingPoints?.toLowerCase())
  );

  const filteredDropingPoints = DroppingPoints.filter((point) =>
    point.name
      .toLowerCase()
      .includes(searchQueries?.droppingPoints?.toLowerCase())
  );

  const filteredOperatorName = OperatorName.filter((operator) =>
    operator.toLowerCase().includes(searchQueries?.Operators?.toLowerCase())
  );

  useEffect(() => {
    let newShowingData = [];

    if (modalname === "pickup") {
      newShowingData = filteredBoardingPoints;
    } else if (modalname === "drop") {
      newShowingData = filteredDropingPoints;
    } else if (modalname === "amenities") {
      newShowingData = handlesearchValue?.amenities || amenitieslist;
    } else {
      newShowingData = filteredOperatorName;
    }

    if (JSON.stringify(newShowingData) !== JSON.stringify(showingdata)) {
      setShowingData(newShowingData);
    }
  }, [
    modalname,
    filteredOperatorName,
    filteredBoardingPoints,
    filteredDropingPoints,
    handlesearchValue?.amenities,
    amenitieslist,
  ]);

  const [BusFilters, SetBusFilters] = useState({
    bustype: null,
    ac_non_ac: null,
    seat_type: null,
  });
  // useEffect(() => {
  //   if (BusFilters.bustype === true) {
  //     const normal_bus__list = buslist?.filter((item) => {
  //       return !(
  //         item?.Bus_Type_Name?.toLowerCase()?.includes("mercedes benz") ||
  //         item?.Bus_Type_Name?.toLowerCase()?.includes("volvo")
  //       );
  //     });
  //     dispatch({
  //       type: GET_BUS_FILTERS,
  //       payload: normal_bus__list,
  //     });
  //   } else if (BusFilters.bustype === false) {
  //     const luxury_bus__list = buslist?.filter((item) => {
  //       return (
  //         item?.Bus_Type_Name?.toLowerCase()?.includes("mercedes benz") ||
  //         item?.Bus_Type_Name?.toLowerCase()?.includes("volvo")
  //       );
  //     });
  //     dispatch({
  //       type: GET_BUS_FILTERS,
  //       payload: luxury_bus__list,
  //     });
  //   } else {
  //     dispatch({
  //       type: GET_BUS_FILTERS,
  //       payload: buslist,
  //     });
  //   }
  //   if (BusFilters.ac_non_ac === true) {
  //     const non_ac_list = filter_buslist?.filter((item) => {
  //       return item?.bus_type?.toLowerCase()?.includes("non-ac");
  //     });
  //     dispatch({
  //       type: GET_BUS_FILTERS,
  //       payload: non_ac_list,
  //     });
  //   }else if(BusFilters ===false){
  //     const ac_list = filter_buslist?.filter((item) => {
  //       return !item?.bus_type?.toLowerCase()?.includes("non-ac");
  //     });
  //     dispatch({
  //       type: GET_BUS_FILTERS,
  //       payload: ac_list,
  //     });
  //   }else{
  //     dispatch({
  //       type: GET_BUS_FILTERS,
  //       payload: buslist,
  //     });
  //   }
  //   console.log(BusFilters, buslist, "BusFilters");
  // }, [BusFilters]);

  function isTimeInRange(rangeStart, rangeEnd, targetTime) {
    const startRange = moment(rangeStart, "h:mm A");
    const endRange = moment(rangeEnd, "h:mm A");
    const target = moment(targetTime, "h:mm A");
    if (startRange.isAfter(endRange)) {
      return target.isBetween(startRange, moment("11:59 PM", "h:mm A"), null, '[)') || target.isBefore(endRange, null, '[)');
    }
    return target.isBetween(startRange, endRange, null, '[)');
  }

  function isTimeInRangedrop(rangeStart, rangeEnd, targetTime) {
    const startRange = moment(rangeStart, "h:mm A");
    const endRange = moment(rangeEnd, "h:mm A");
    const target = moment(targetTime, "h:mm A");
    // Case: if the range spans across midnight (e.g., 11:00 PM to 6:00 AM)
    if (startRange.isAfter(endRange)) {
      // Check if target time is either after start time OR before end time
      return target.isBetween(startRange, moment("11:59 PM", "h:mm A"), null, '[)') || target.isSameOrBefore(endRange, null, '[)');
    }
    // Regular case: check if target time is within the range
    return target.isBetween(startRange, endRange, null, '[)');
  }

  const home_luxury = sessionStorage.getItem('home_luxury')
  const home_ac = sessionStorage.getItem('home_ac')
  const home_seat_type = sessionStorage.getItem('home_seat_type')


  useEffect(() => {
    let filteredList = buslist || [];

    //++++++++++++++++++++++++ BUS TYPE FILTERS  ++++++++++++++++++++++++++++++++++

    // Filter for Bus Type (Luxury/Normal)
    if (BusFilters?.bustype === true) {
      filteredList = filteredList.filter((item) =>
        !(item?.Bus_Type_Name?.toLowerCase()?.includes("mercedes benz") ||
          item?.Bus_Type_Name?.toLowerCase()?.includes("volvo"))
      );
    } else if (home_luxury === 'true' || BusFilters?.bustype === false) {
      filteredList = filteredList.filter((item) =>
        item?.Bus_Type_Name?.toLowerCase()?.includes("mercedes benz") ||
        item?.Bus_Type_Name?.toLowerCase()?.includes("volvo")
      );
    }

    // Filter for AC/Non-AC
    if (home_ac === "true" || BusFilters?.ac_non_ac === true) {
      filteredList = filteredList.filter((item) =>
        !item?.bus_type?.toLowerCase()?.includes("non-ac")
      );
    } else if (BusFilters?.ac_non_ac === false) {
      filteredList = filteredList.filter((item) =>
        item?.bus_type?.toLowerCase()?.includes("non-ac")
      );
    }
    // Filter for Seater/Sleeper
    if (home_seat_type === 'true' || BusFilters?.seat_type === true) {
      filteredList = filteredList.filter((item) =>
        item?.bus_type?.toLowerCase()?.includes("seater")
      );
    } else if (home_seat_type === 'false' || BusFilters?.seat_type === false) {
      filteredList = filteredList.filter((item) =>
        item?.bus_type?.toLowerCase()?.includes("sleeper")
      );
    }

    //++++++++++++++++++++++++ BUS PRICE FILTERS  ++++++++++++++++++++++++++++++++++
    if (priceRange?.min > 0 || priceRange?.max < 3000) {
      filteredList = filteredList.filter((item) => {
        return (item?.Fare >= priceRange?.min) && (item?.Fare <= priceRange?.max)
      }
      )
    }

    //++++++++++++++++++++++++ BUS PICKUP FILTERS  ++++++++++++++++++++++++++++++++++

    if (Object.keys(pickupchecked)?.length > 0) {
      filteredList = filteredList?.filter((item) => {
        const cityNames = item.boarding_info.map(info => {
          const parts = info.split("^"); // Split the string by "^"
          return parts[0]; // Return the second value (city name)
        })
        console.log(cityNames, "citynames");
        return Object.keys(pickupchecked).some(value => cityNames.includes(value));

      })
    }

    //++++++++++++++++++++++++ BUS PICKUP TIME FILTERS  ++++++++++++++++++++++++++++++++++
    if (pickuptime != "") {
      filteredList = filteredList?.filter((item) => {
        const [starttime, endtime] = pickuptime.split(" - ")
        console.log(isTimeInRange(starttime, endtime, item?.Start_time), starttime, endtime, item?.Start_time, "startendtime");

        return isTimeInRange(starttime, endtime, item?.Start_time)
      })
    }

    //++++++++++++++++++++++++ BUS OPERATOR FILTERS  ++++++++++++++++++++++++++++++++++

    if (Object.keys(operatorchecked).length > 0) {
      filteredList = filteredList?.filter((item) => {
        const operator = item?.Traveler_Agent_Name.toLowerCase();
        const operatorCheckList = Object.keys(operatorchecked)
        // console.log(operatorCheckList.includes(operator), "opppppoeieoirueoiru");
        return Object.keys(operatorchecked).some(val => val.toLowerCase() === operator);
      });
    }

    //++++++++++++++++++++++++ BUS PICKUP TIME FILTERS  ++++++++++++++++++++++++++++++++++
    if (droptime != "") {
      filteredList = filteredList?.filter((item) => {
        const [starttime, endtime] = droptime.split(" - ")
        // console.log(isTimeInRange(starttime, endtime, item?.Arr_Time), starttime, endtime, item?.Arr_Time, "startendtime");
        return isTimeInRangedrop(starttime, endtime, item?.Arr_Time)
      })
    }

    //++++++++++++++++++++++++ BUS DROP FILTERS  ++++++++++++++++++++++++++++++++++

    if (Object.keys(dropchecked)?.length > 0) {
      filteredList = filteredList?.filter((item) => {
        const cityNames = item.dropping_info.map(info => {
          const parts = info.split("^"); // Split the string by "^"
          return parts[1]; // Return the second value (city name)
        })
        console.log(cityNames, "citynames");
        return Object.keys(dropchecked).some(value => cityNames.includes(value));

      })
    }
    dispatch({
      type: GET_BUS_FILTERS,
      payload: filteredList,
    });
    // console.log(BusFilters, buslist, "BusFilters");
  }, [BusFilters, buslist, priceRange, pickupchecked, dropchecked, operatorchecked, pickuptime, droptime, home_luxury, home_ac, home_seat_type]);
  // console.log(droptime, "haiiiidfbjkdhfkjdhf");




  return (
    <>
      <div
        className={`${sidebarToggle ? "hidden" : "block"
          } w-[18vw] bg-[#E5FFF1] h-full fixed pt-[1vw] md:block hidden`}
        style={{
          zIndex: modalIsOpen || sharing === true ? 1 : 0,
          // fontFamily:"Lato"
        }}
      >
        <div className="border-[0.1vw] border-[#c9c9c9] h-full pb-[8vw] overflow-y-scroll scrollbar-hide rounded-[0.5vw]">
          <div>
            <div className="py-[1.2vw] pb-[0.5vw]">
              <div className="grid grid-cols-2 justify-between items-center">
                <div className="">
                  <h1 className="text-[1.2vw] text-black font-extrabold px-[0.6vw]">
                    Filter
                  </h1>
                </div>
                <div>
                  <h3
                    className="text-[0.8vw] float-end px-[0.6vw] cursor-pointer underline underline-offset-[0.15vw]"
                    onClick={handleClear}
                  >
                    CLEAR ALL
                  </h3>
                  {/* <img src={"file://akritnas/nubiznez/Operator_logos/ss.png"} /> */}
                </div>
              </div>
            </div>
            {/* <p className="mx-[0.6vw] font-semibold text-gray-500 text-[1.1vw] flex my-[0.6vw]">
              Alternative Source Point
            </p> */}
            {/* <div className="mx-[0.6vw] my-[0.5vw]">
              <button
                className={`${filtervalue.radius ? "bg-[#1F487C]" : "bg-white"
                  }  ${filtervalue.radius
                    ? "text-white border-[#1F487C]"
                    : "border-gray-300"
                  } w-full border-[0.1vw] rounded-md cursor-pointer flex items-center justify-center gap-[0.5vw] py-[0.5vw] `}
                onClick={() => handleradius()}
              // onClick={() =>
              //   setFitervalue({ ...filtervalue, radius: !filtervalue.radius })
              // }
              >
                <BiMapPin size={"1.3vw"} />
                <span className="text-[1vw]">Radius up-to 15 Kms</span>
              </button>
            </div> */}
            {/* <p className="mx-[0.6vw] font-semibold text-gray-500 text-[1.1vw] my-[0.6vw]">
              Vehicle Type
            </p> */}
            <div className="grid grid-cols-4 justify-between items-center my-[0.5vw]">
              <div className="col-span-3">
                <h1 className="text-[1.1vw] font-bold px-[0.5vw]">
                  {" "}
                  Vehicle Type
                </h1>
              </div>
              <div className="flex items-center">
                <h3
                  className="text-[0.8vw] pr-[0.4vw] float-end text-gray-500  cursor-pointer"
                  onClick={vehicleclear}
                >
                  CLEAR
                </h3>
                {boolean.vehicle === true ? (
                  <button
                    onClick={() =>
                      setBoolean({
                        ...boolean,
                        vehicle: !boolean.vehicle,
                      })
                    }
                  >
                    <IoIosArrowUp size={"1vw"} className="cursor-pointer" />
                  </button>
                ) : (
                  <IoIosArrowDown
                    size={"1vw"}
                    className="cursor-pointer"
                    onClick={() =>
                      setBoolean({
                        ...boolean,
                        vehicle: !boolean.vehicle,
                      })
                    }
                  />
                )}
              </div>
            </div>
            {boolean.vehicle ? (
              <>
                <div className="py-[0.6vw]">
                  <div className="grid grid-cols-2 gap-[0.8vw] mx-[0.6vw]">
                    <button
                      className={`${BusFilters?.bustype === true
                        ? "bg-[#1F487C]"
                        : "bg-white"
                        }  ${BusFilters?.bustype === true
                          ? "text-white border-[#1F487C]"
                          : "border-gray-300"
                        } w-full border-[0.1vw] rounded-[0.7vw] cursor-pointer `}
                      onClick={() => {
                        // if (NormalBus) {
                        //   setNoramlBus(false);
                        // } else {
                        //   setNoramlBus(true);
                        // }
                        // if (
                        //   BusFilters?.bustype === null ||
                        //   BusFilters?.bustype === false
                        // ) {
                        //   SetBusFilters({
                        //     ...BusFilters,
                        //     bustype: true,
                        //   });
                        // } else {
                        //   SetBusFilters({
                        //     ...BusFilters,
                        //     bustype: null,
                        //   });
                        // }
                        // localStorage.setItem("isNoramlBus", NormalBus);
                        SetBusFilters((prev) => ({
                          ...prev,
                          bustype: prev.bustype === true ? null : true,
                        }));
                        setBusFilterType("bustype")
                      }}
                    >
                      <div className="flex justify-center items-center">
                        <div className="py-[0.5vw] flex items-center justify-center">
                          <span>
                            {" "}
                            <RiBusFill className="w-[2vw] h-[1.2vw]" />
                          </span>
                          <span className="font-semibold text-[1vw]">
                            Normal
                          </span>
                        </div>
                      </div>
                    </button>
                    <button
                      className={`${home_luxury === 'true'
                        ? "bg-custom-gradient-luxury bg-image-url"
                        : "bg-white"
                        } h-full ${home_luxury === 'true'
                          ? "text-black border-custom-gradient-luxury bg-image-url"
                          : "border-gray-300 "
                        } w-full border-[0.1vw] rounded-[0.7vw] cursor-pointer `}
                      onClick={() => {
                        // if (busType) {
                        //   setBusType(false);
                        //   localStorage.setItem("isLuxury", false);
                        // } else {
                        //   setBusType(true);
                        //   localStorage.setItem("isLuxury", true);
                        // }
                        // if (
                        //   BusFilters?.bustype === null ||
                        //   BusFilters?.bustype === true
                        // ) {
                        //   SetBusFilters({
                        //     ...BusFilters,
                        //     bustype: false,
                        //   });
                        // } else {
                        //   SetBusFilters({
                        //     ...BusFilters,
                        //     bustype: null,
                        //   });
                        // }
                        SetBusFilters((prev) => ({
                          ...prev,
                          bustype: prev.bustype === false ? null : false,
                        }));
                        setBusFilterType("bustype")
                        sessionStorage.getItem('home_luxury') === 'true' ? sessionStorage.setItem('home_luxury', null) : sessionStorage.setItem('home_luxury', true)
                      }}
                    >
                      <div className="flex justify-center items-center">
                        <div className="py-[0.5vw] flex items-center justify-center">
                          {/* <img src={sleeper} className="w-[2vw] h-[1vw]" /> */}
                          <FaBus className="w-[2vw] h-[1vw]" />
                          <span className="font-semibold  text-[1vw]">
                            Luxury
                          </span>
                        </div>
                      </div>
                    </button>
                  </div>
                  <div className="grid grid-cols-2 pt-[0.9vw] gap-[0.8vw] mx-[0.6vw]">
                    <button
                      className={`${sessionStorage.getItem('home_ac') === "true" ? "bg-[#1F487C]" : "bg-white"
                        }  ${sessionStorage.getItem('home_ac') === "true"
                          ? "text-white border-[#1F487C]"
                          : "border-gray-300"
                        } w-full border-[0.1vw] rounded-[0.7vw] cursor-pointer `}
                      onClick={() => {
                        // if (acfilter === "ac") {
                        //   setAcFilter("");
                        // } else {
                        //   setAcFilter("ac");
                        // }

                        // if (
                        //   BusFilters?.ac_non_ac === null ||
                        //   BusFilters?.ac_non_ac === false
                        // ) {
                        //   SetBusFilters({
                        //     ...BusFilters,
                        //     ac_non_ac: true,
                        //   });
                        // } else {
                        //   SetBusFilters({
                        //     ...BusFilters,
                        //     ac_non_ac: null,
                        //   });
                        // }
                        SetBusFilters((prev) => ({
                          ...prev,
                          ac_non_ac: prev.ac_non_ac === true ? null : true,
                        }));
                        setBusFilterType("bustype")
                        sessionStorage.getItem('home_ac') === 'true' ? sessionStorage.setItem('home_ac', null) : sessionStorage.setItem('home_ac', true)
                      }}
                    >
                      <div className="py-[0.5vw] flex items-center justify-center gap-[0.5vw]">
                        {/* <span>
                    <TbAirConditioning size={15} className="mx-1 " />
                  </span> */}
                        {sessionStorage.getItem('home_ac') === "true" ? (
                          <img
                            src={s_c_ac}
                            alt="AcImg"
                            className="w-[1.3vw] h-[1.2vw]"
                          />
                        ) : (
                          <img
                            src={s_ac}
                            alt="acimg"
                            className="w-[1.3vw] h-[1.2vw]"
                          />
                        )}
                        <span
                          className={`${filtervalue.ac} font-semibold  text-[1vw]`}
                        >
                          AC
                        </span>
                      </div>
                    </button>
                    <button
                      className={`${BusFilters?.ac_non_ac === false ? "bg-[#1F487C]" : "bg-white"
                        } ${BusFilters?.ac_non_ac === false
                          ? "text-white border-[#1F487C]"
                          : "border-gray-300"
                        } w-full border-[0.1vw] rounded-[0.7vw] cursor-pointer `}
                      onClick={() => {
                        // if (acfilter === "non_ac") {
                        //   setAcFilter("");
                        // } else {
                        //   setAcFilter("non_ac");
                        // }
                        SetBusFilters((prev) => ({
                          ...prev,
                          ac_non_ac: prev.ac_non_ac === false ? null : false,
                        }));
                        setBusFilterType("bustype")

                      }}
                    >
                      <div className="py-[0.5vw] gap-[0.5vw] flex items-center justify-center">
                        {/* <span>
                    <TbAirConditioningDisabled size={20} className="mx-1" />
                  </span> */}
                        {BusFilters?.ac_non_ac === false ? (
                          <img
                            src={s_c_non_ac}
                            alt="NonAcImg"
                            className="w-[1.3vw] h-[1.2vw]"
                          />
                        ) : (
                          <img
                            src={s_non_ac}
                            alt="nonAcimg"
                            className="w-[1.3vw] h-[1.2vw]"
                          />
                        )}
                        <span className="font-semibold text-[1vw]">Non AC</span>
                      </div>
                    </button>
                  </div>

                  <div className="grid grid-cols-2 pt-[0.9vw]  gap-[0.8vw] mx-[0.6vw]">
                    <button
                      className={`${sessionStorage.getItem('home_seat_type') === 'false'
                        ? "bg-[#1F487C]"
                        : "bg-white"
                        } h-full ${sessionStorage.getItem('home_seat_type') === 'false'
                          ? "text-white border-[#1F487C]"
                          : "border-gray-300"
                        } w-full border-[0.1vw] rounded-[0.7vw] cursor-pointer `}
                      onClick={() => {
                        // if (seattypefilter === "sleeper") {
                        //   setSeatTypeFilter("");
                        // } else {
                        //   setSeatTypeFilter("sleeper");
                        // }
                        SetBusFilters((prev) => ({
                          ...prev,
                          seat_type: prev.seat_type === false ? null : false,
                        }));
                        sessionStorage.getItem('home_seat_type') === 'false' ? sessionStorage.setItem('home_seat_type', null) : sessionStorage.setItem('home_seat_type', false)
                        setBusFilterType("bustype")
                      }}
                    >
                      <p className="py-[0.5vw] flex items-center justify-center gap-[0.5vw]">
                        {/* <span>
                    <MdAirlineSeatIndividualSuite size={20} className="pl-1" />
                  </span> */}
                        <img
                          src={sleeper}
                          alt="SleeperImg"
                          className="w-[2vw] h-[1vw]"
                        />
                        <span className="font-semibold  text-[1vw]">
                          Sleeper
                        </span>
                      </p>
                    </button>
                    <button
                      className={`${sessionStorage.getItem('home_seat_type') === 'true'
                        ? "bg-[#1F487C]"
                        : "bg-white"
                        } h-full ${sessionStorage.getItem('home_seat_type') === 'true' 
                          ? "text-white border-[#1F487C]"
                          : "border-gray-300 "
                        }w-full border-[0.1vw] rounded-[0.7vw] cursor-pointer `}
                      onClick={() => {
                        SetBusFilters((prev) => ({
                          ...prev,
                          seat_type: prev.seat_type === true ? null : true,
                        }));
                        setBusFilterType("bustype")
                        sessionStorage.getItem('home_seat_type') === 'true' ? sessionStorage.setItem('home_seat_type', null) : sessionStorage.setItem('home_seat_type', true)
                      }}
                    >
                      <div className="py-[0.5vw] flex gap-[0.5vw] items-center justify-center">
                        {/* <span>
                    <MdAirlineSeatReclineExtra size={20} className="pl-1" />
                  </span> */}
                        <img
                          src={seats}
                          alt="SeatImg"
                          className="w-[1.3vw] h-[1.2vw]"
                        />
                        <span className="font-semibold text-[1vw]">Seater</span>
                      </div>
                    </button>
                  </div>
                </div>
              </>
            ) : (
              ""
            )}
            <p className="my-[0.5vw] border-b-[0.01vw] border-gray-300"></p>
          </div>
          <div>
            <div className="">
              <RangeSlide
                boolean={boolean}
                setBoolean={setBoolean}
                setPriceRange={setPriceRange}
                priceRange={priceRange}
                value={value}
                setValue={setValue}
                setBusFilterType={setBusFilterType}
              />
            </div>
            <p className="my-[0.5vw] border-b-[0.01vw] border-gray-300"></p>
          </div>
          <div className="">
            <div className="grid grid-cols-4 justify-between items-center my-[0.6vw]">
              <div className="col-span-3">
                <h1 className="text-[1.1vw] font-bold px-[0.6vw]">
                  {busdata?.from
                    ? `Pick Up Point - ${busdata?.from?.charAt(0).toUpperCase() +
                    busdata.from.slice(1)
                    }`
                    : "Pick Up Point"}
                </h1>
              </div>
              <div className="flex items-center">
                <h3
                  className="text-[0.8vw] float-end pr-[0.4vw] text-gray-500  cursor-pointer"
                  onClick={pickupClear}
                >
                  CLEAR
                </h3>
                {boolean.pickup === true ? (
                  <button
                    onClick={() =>
                      setBoolean({
                        ...boolean,
                        pickup: !boolean.pickup,
                      })
                    }
                  >
                    <IoIosArrowUp size={"1vw"} className="cursor-pointer" />
                  </button>
                ) : (
                  <IoIosArrowDown
                    size={"1vw"}
                    className="cursor-pointer"
                    onClick={() =>
                      setBoolean({
                        ...boolean,
                        pickup: !boolean.pickup,
                      })
                    }
                  />
                )}
              </div>
            </div>
            {boolean.pickup === true ? (
              <>
                <div className="px-[0.6vw] py-[0.4vw]">
                  {/* <input className="border-2 border-gray-300 h-8 rounded-md w-full mb-4" /> */}
                  <Input
                    prefix={<CiSearch size={"1.1vw"} />}
                    placeholder="Search"
                    autoComplete="off"
                    className="mb-[1vw] text-[1vw] h-[2.5vw] "
                    onChange={(e) => {
                      // setHandleSearchValue("boarding");
                      // Search(e, "boarding");
                      // handleSearch(
                      //   dispatch,
                      //   e,
                      //   "boarding",
                      //   setHandleSearchValue
                      // );
                      handleSearchChange(e, "boardingPoints");
                    }}
                  />
                  <div>
                    {/* {
                      // handlesearchPickup?.boarding_point?.length > 0 &&
                      //   handlesearchPickup?.boarding_point
                      filteredBoardingPoints
                        ?.slice(0, 5)
                        .map((item, i) => (
                          <div
                            className="flex items-center justify-between "
                            key={i}
                          >
                            <div className="flex items-center my-[0.25vw]">
                              <input
                                type="checkbox"
                                className="w-[1.2vw] h-[1.2vw] mr-[0.4vw] cursor-pointer"
                                onChange={(e) => {
                                  handlePickupCheckbox(e, item.name);
                                }}
                                checked={pickupchecked[item.name] || false}
                              />
                              <span className="text-[1vw]">
                                {item?.name?.length > 26 ? (
                                  <Popover content={item?.name} trigger="hover">
                                    <span>
                                      {item.name?.charAt(0)?.toUpperCase() +
                                        item.name
                                          ?.slice(1)
                                          ?.toLowerCase()
                                          ?.substring(0, 26) +
                                        "..."}
                                    </span>{" "}
                                  </Popover>
                                ) : (
                                  item.name?.charAt(0)?.toUpperCase() +
                                  item.name?.slice(1)?.toLowerCase()
                                )}
                              </span>
                            </div>
                            <div>
                              <span className="text-[0.8vw]">{`(${item.count})`}</span>
                            </div>
                          </div>
                        ))} */}
                    {
                      // handlesearchValue?.boarding_point?.length <= 0
                      filteredBoardingPoints?.length <= 0 ? (
                        <div className="flex items-center justify-between mx-[.5vw]">
                          <div className="flex items-center my-[0.25vw]">
                            <span className="text-[1vw]">
                              No matching Pickup points found.
                            </span>
                          </div>
                        </div>
                      ) : (
                        filteredBoardingPoints
                          // handlesearchValue?.boarding_point?.length > 0
                          // ? handlesearchValue.boarding_point
                          // : pickUp_list?.boarding_points
                          ?.slice(0, 5)
                          .map((item, i) => (
                            <div
                              className="flex items-center justify-between"
                              key={i}
                            >
                              <div className="flex items-center my-[0.25vw]">
                                <input
                                  type="checkbox"
                                  className="w-[1.2vw] h-[1.2vw] mr-[0.4vw] cursor-pointer"
                                  onChange={(e) =>
                                    handlePickupCheckbox(e, item.name)
                                  }
                                  checked={pickupchecked[item.name] || false}
                                />
                                <span className="text-[1vw] items-center">
                                  {item?.name?.length > 26 ? (
                                    <Popover
                                      content={item?.name}
                                      trigger="hover"
                                    >
                                      <span>
                                        {item.name.charAt(0).toUpperCase() +
                                          item.name
                                            .slice(1)
                                            .toLowerCase()
                                            .substring(0, 26) +
                                          "..."}
                                      </span>
                                    </Popover>
                                  ) : (
                                    item.name.charAt(0).toUpperCase() +
                                    item.name.slice(1).toLowerCase()
                                  )}
                                </span>
                              </div>
                              <div>
                                <span className="text-[0.8vw]">{`(${item.count})`}</span>
                              </div>
                            </div>
                          ))
                      )
                    }

                    {filteredBoardingPoints?.length > 5 ? (
                      <p
                        className="text-[#1F487C] font-bold text-[0.8vw] pt-[0.5vw] cursor-pointer"
                        onClick={() => openModal("pickup")}
                      >
                        {`SHOW ALL (${filteredBoardingPoints?.length})`}
                      </p>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </>
            ) : (
              ""
            )}
            <p className="my-[0.5vw] border-b-[0.01vw] border-gray-300"></p>
          </div>

          <div>
            <div className="">
              <div className="grid grid-cols-4 justify-between items-center my-[0.6vw]">
                <div className="col-span-3">
                  <h1 className="text-[1.1vw] text-black font-bold px-[0.6vw]">
                    {busdata?.from
                      ? `Pick Up Time - ${busdata?.from.charAt(0).toUpperCase() +
                      busdata?.from.slice(1)
                      }`
                      : "Pick Up Time"}
                  </h1>
                </div>
                <div className="flex items-center">
                  <h3
                    className="text-[0.8vw] pr-[0.4vw] text-gray-500 cursor-pointer"
                    onClick={pickuptimeClear}
                  >
                    CLEAR
                  </h3>
                  {boolean.pickup_time === true ? (
                    <button
                      onClick={() =>
                        setBoolean({
                          ...boolean,
                          pickup_time: !boolean.pickup_time,
                        })
                      }
                    >
                      <IoIosArrowUp size={"1vw"} className="cursor-pointer" />
                    </button>
                  ) : (
                    <IoIosArrowDown
                      size={"1vw"}
                      className="cursor-pointer"
                      onClick={() =>
                        setBoolean({
                          ...boolean,
                          pickup_time: !boolean.pickup_time,
                        })
                      }
                    />
                  )}
                </div>
              </div>
            </div>
            {boolean.pickup_time ? (
              <>
                <div className="grid grid-cols-2 pt-[0.5vw]  gap-[0.5vw] mx-[0.5vw] ">
                  <button
                    className={`${pickuptime === "6:00 AM - 11:00 AM" ? "bg-[#1F487C]" : "bg-white"
                      } h-full ${pickuptime === "6:00 AM - 11:00 AM" ? "text-white " : ""
                      } w-full  ${pickuptime === "6:00 AM - 11:00 AM"
                        ? "border-[#1F487C] border-[0.1vw]"
                        : "border-gray-300 border-[0.1vw]"
                      } rounded-[0.6vw] cursor-pointer flex flex-col items-center justify-center py-[0.5vw]`}
                    // onClick={() =>
                    //   setTimeFitervalue({
                    //     ...timefiltervalue,
                    //     time_6:00 AM to 11:00 AM: !timefiltervalue.time_6:00 AM to 11:00 AM,
                    //   })
                    // }
                    onClick={() => {
                      if (pickuptime === "6:00 AM - 11:00 AM") {
                        setPickUpTime("");
                      } else {
                        setPickUpTime("6:00 AM - 11:00 AM");
                      }
                    }}
                  >
                    <span className="pb-[0.25vw]">
                      <LuSunrise className="" size={"1vw"} />
                    </span>
                    <span className="font-semibold text-center text-[0.8vw]">
                      6:00 to 11:00
                    </span>
                  </button>
                  <button
                    className={`${pickuptime === "11:00 AM - 6:00 PM" ? "bg-[#1F487C]" : "bg-white"
                      } h-full ${pickuptime === "11:00 AM - 6:00 PM" ? "text-white " : ""
                      } w-full  ${pickuptime === "11:00 AM - 6:00 PM"
                        ? "border-[#1F487C] border-[0.1vw]"
                        : "border-gray-300 border-[0.1vw]"
                      } rounded-[0.6vw] cursor-pointer flex flex-col items-center justify-center py-[0.5vw]`}
                    // onClick={() =>
                    //   setTimeFitervalue({
                    //     ...timefiltervalue,
                    //     time_6:00 AM to 11:00 AM: !timefiltervalue.time_6:00 AM to 11:00 AM,
                    //   })
                    // }
                    onClick={() => {
                      if (pickuptime === "11:00 AM - 6:00 PM") {
                        setPickUpTime("");
                      } else {
                        setPickUpTime("11:00 AM - 6:00 PM");
                      }
                    }}
                  >
                    <span className="pb-[0.1vw]">
                      <IoSunnyOutline size={"1vw"} />
                    </span>
                    <span className="font-semibold text-center text-[0.8vw]">
                      11:00 to 18:00
                    </span>
                  </button>
                </div>
                <div className="grid grid-cols-2 pt-[1vw]  gap-[0.5vw] mx-[0.5vw] mb-[1vw]">
                  <button
                    className={`${pickuptime === "6:00 PM - 11:00 PM" ? "bg-[#1F487C]" : "bg-white"
                      } h-full ${pickuptime === "6:00 PM - 11:00 PM" ? "text-white " : ""
                      } w-full  ${pickuptime === "6:00 PM - 11:00 PM"
                        ? "border-[#1F487C] border-[0.1vw]"
                        : "border-gray-300 border-[0.1vw]"
                      } rounded-[0.6vw] cursor-pointer flex flex-col items-center justify-center py-[0.5vw]`}
                    // onClick={() =>
                    //   setTimeFitervalue({
                    //     ...timefiltervalue,
                    //     time_6:00 AM to 11:00 AM: !timefiltervalue.time_6:00 AM to 11:00 AM,
                    //   })
                    // }
                    onClick={() => {
                      if (pickuptime === "6:00 PM - 11:00 PM") {
                        setPickUpTime("");
                      } else {
                        setPickUpTime("6:00 PM - 11:00 PM");
                      }
                    }}
                  >
                    <span className="pb-[0.5vw]">
                      <LuSunset className="" size={"1vw"} />
                    </span>
                    <span className="font-semibold text-center text-[0.8vw]">
                      18:00 to 23:00
                    </span>
                  </button>
                  <button
                    className={`${pickuptime === "11:00 PM - 6:00 AM" ? "bg-[#1F487C]" : "bg-white"
                      } h-full ${pickuptime === "11:00 PM - 6:00 AM" ? "text-white " : ""
                      } w-full  ${pickuptime === "11:00 PM - 6:00 AM"
                        ? "border-[#1F487C] border-[0.1vw]"
                        : "border-gray-300 border-[0.1vw]"
                      } rounded-[0.6vw] cursor-pointer flex flex-col items-center justify-center py-[0.5vw]`}
                    // onClick={() =>
                    //   setTimeFitervalue({
                    //     ...timefiltervalue,
                    //     time_6:00 AM to 11:00 AM: !timefiltervalue.time_6:00 AM to 11:00 AM,
                    //   })
                    // }
                    onClick={() => {
                      if (pickuptime === "11:00 PM - 6:00 AM") {
                        setPickUpTime("");
                      } else {
                        setPickUpTime("11:00 PM - 6:00 AM");
                      }
                    }}
                  >
                    <span className="pb-1">
                      <PiMoonLight size={"1vw"} />
                    </span>
                    <span className="font-semibold text-center text-[0.8vw]">
                      23:00 to 6:00
                    </span>
                  </button>
                </div>
              </>
            ) : (
              ""
            )}
            <p className="my-[0.5vw] border-b-[0.01vw] border-gray-300"></p>
          </div>
          <div className="">
            <div className="grid grid-cols-4 justify-between items-center my-[0.6vw]">
              <div className="col-span-3">
                <h1 className="text-[1.1vw] font-bold pl-[0.6vw] ">
                  Travel Operators
                </h1>
              </div>
              <div className="flex items-center">
                <h3
                  className="text-[0.8vw] pr-[0.4vw] float-end text-gray-500  cursor-pointer"
                  onClick={operatorClear}
                >
                  CLEAR
                </h3>
                {boolean.operators === true ? (
                  <button
                    onClick={() =>
                      setBoolean({
                        ...boolean,
                        operators: !boolean.operators,
                      })
                    }
                  >
                    <IoIosArrowUp size={"1vw"} className="cursor-pointer" />
                  </button>
                ) : (
                  <IoIosArrowDown
                    size={"1vw"}
                    className="cursor-pointer"
                    onClick={() =>
                      setBoolean({
                        ...boolean,
                        operators: !boolean.operators,
                      })
                    }
                  />
                )}
              </div>
            </div>
            {boolean.operators === true && (
              <>
                <div className="px-[0.6vw] pb-[0.6vw]">
                  <Input
                    prefix={<CiSearch size={"1.1vw"} />}
                    placeholder="Search"
                    autoComplete="off"
                    className="mb-[1vw] text-[1vw] h-[2.5vw] "
                    // onChange={(e) =>
                    //   setSearchValue({
                    //     ...searchvalue,
                    //     operator: e.target.value,
                    //   })
                    // }
                    onChange={(e) => {
                      // setHandleSearchValue("operators");
                      // Search(e, "operators");
                      // handleSearch(
                      //   dispatch,
                      //   e,
                      //   "operators",
                      //   setHandleSearchValue
                      // );
                      handleSearchChange(e, "Operators");
                    }}
                  />
                  <div>
                    {/* {handlesearchOperators?.operators?.length > 0 &&
                      handlesearchOperators?.operators
                        ?.slice(0, 5)
                        .map((item, i) => (
                          <div
                            className="flex items-center justify-between mx-[.5vw]"
                            key={i}
                          >
                            <div className="flex items-center my-[0.25vw]">
                              <input
                                type="checkbox"
                                className="w-[1.2vw] h-[1.2vw] mr-[0.4vw]"
                                onChange={(e) => {
                                  handleoperatorCheckbox(e, item.operator);
                                }}
                                checked={
                                  operatorchecked[item.operator] || false
                                }
                              />
                              <span className="text-[1vw]">
                                {item?.operator?.length > 26 ? (
                                  <Popover
                                    content={
                                      item.operator?.charAt(0)?.toUpperCase() +
                                      item.operator?.slice(1)?.toLowerCase()
                                    }
                                    trigger="hover"
                                  >
                                    <span>
                                      {item.operator?.charAt(0)?.toUpperCase() +
                                        item.operator
                                          ?.slice(1)
                                          ?.toLowerCase()
                                          ?.substring(0, 26) +
                                        "..."}
                                    </span>{" "}
                                  </Popover>
                                ) : (
                                  item.operator?.charAt(0)?.toUpperCase() +
                                  item.operator?.slice(1)?.toLowerCase()
                                )}
                              </span>
                            </div>
                            <div>
                              <span className="text-[0.8vw]">{`(${item?.count})`}</span>
                            </div>
                          </div>
                        ))} */}
                    {
                      // handlesearchValue?.operators?.length <= 0 ?
                      filteredOperatorName?.length <= 0 ? (
                        <div className="flex items-center justify-between mx-[.5vw]">
                          <div className="flex items-center my-[0.25vw]">
                            <span className="text-[1vw]">
                              No matching operators found.
                            </span>
                          </div>
                        </div>
                      ) : (
                        filteredOperatorName
                          // handlesearchValue?.operators?.length > 0
                          // ? handlesearchValue.operators
                          // : pickUp_list?.operators
                          ?.slice(0, 5)
                          .map((item, i) => (
                            <div
                              className="flex items-center justify-between"
                              key={i}
                            >
                              <div className="flex items-center my-[0.25vw]">
                                <input
                                  type="checkbox"
                                  className="w-[1.2vw] h-[1.2vw] mr-[0.6vw] cursor-pointer"
                                  onChange={(e) =>
                                    // handleoperatorCheckbox(e, item?.operator)
                                    handleoperatorCheckbox(e, item)
                                  }
                                  checked={operatorchecked[item] || false}
                                />
                                <span className="text-[1vw] pt-[0.1vw]">
                                  {
                                    // item?.operator?.length > 26 ?
                                    item?.length > 26 ? (
                                      <Popover
                                        content={
                                          // item.operator?.charAt(0)?.toUpperCase() +
                                          // item.operator?.slice(1)?.toLowerCase()
                                          item?.charAt(0)?.toUpperCase() +
                                          item?.slice(1)?.toLowerCase()
                                        }
                                        trigger="hover"
                                      >
                                        <span>
                                          {
                                            // item.operator?.charAt(0)?.toUpperCase() +
                                            //   item.operator
                                            item?.charAt(0)?.toUpperCase() +
                                            item
                                              ?.slice(1)
                                              ?.toLowerCase()
                                              ?.substring(0, 26) +
                                            "..."
                                          }
                                        </span>
                                      </Popover>
                                    ) : (
                                      // item.operator?.charAt(0)?.toUpperCase() +
                                      // item.operator?.slice(1)?.toLowerCase()
                                      item?.charAt(0)?.toUpperCase() +
                                      item?.slice(1)?.toLowerCase()
                                    )
                                  }
                                </span>
                              </div>
                            </div>
                          ))
                      )
                    }

                    {
                      // OperatorLength > 5 ?
                      filteredOperatorName?.length > 5 ? (
                        <p
                          className="text-[#1F487C] font-bold text-[0.8vw] pt-[0.6vw] cursor-pointer"
                          onClick={() => openModal("operators")}
                        >{`SHOW ALL (${filteredOperatorName?.length})`}</p>
                      ) : null
                    }
                  </div>
                </div>
              </>
            )}

            <p className="my-[0.5vw] border-b-[0.01vw] border-gray-300"></p>
          </div>

          <div className="">
            <div className="grid grid-cols-4 justify-between items-center my-[0.6vw]">
              <div className="col-span-3">
                <h1 className="text-[1.1vw] font-bold pl-[0.6vw] ">
                  {busdata?.from
                    ? `Drop Point - ${busdata?.to.charAt(0).toUpperCase() +
                    busdata.to.slice(1)
                    }`
                    : "Drop Point"}
                </h1>
              </div>
              <div className="flex items-center">
                <h3
                  className="text-[0.8vw] pr-[0.4vw] float-end text-gray-500  cursor-pointer"
                  onClick={dropClear}
                >
                  CLEAR
                </h3>
                {boolean.drop === true ? (
                  <button
                    onClick={() =>
                      setBoolean({
                        ...boolean,
                        drop: !boolean.drop,
                      })
                    }
                  >
                    <IoIosArrowUp size={"1vw"} className="cursor-pointer" />
                  </button>
                ) : (
                  <IoIosArrowDown
                    size={"1vw"}
                    className="cursor-pointer"
                    onClick={() =>
                      setBoolean({
                        ...boolean,
                        drop: !boolean.drop,
                      })
                    }
                  />
                )}
              </div>
            </div>
            {boolean.drop === true && (
              <>
                <div className="px-[0.6vw] pb-[0.6vw]">
                  {/* <input className="border-2 border-gray-300 h-8 rounded-md w-full mb-4" /> */}
                  <Input
                    prefix={<CiSearch size={"1.1vw"} />}
                    placeholder="Search"
                    autoComplete="off"
                    className="mb-[1vw] text-[1vw] h-[2.5vw] "
                    onChange={(e) => {
                      // setHandleSearchValue("dropping");
                      // Search(e, "dropping");
                      // handleSearch(
                      //   dispatch,
                      //   e,
                      //   "dropping",
                      //   setHandleSearchValue
                      // );
                      handleSearchChange(e, "droppingPoints");
                    }}
                  />
                  <div>
                    {/* {handlesearchDrop?.dropping_point?.length > 0 &&
                      handlesearchDrop?.dropping_point
                        ?.slice(0, 5)
                        .map((item, i) => (
                          <div
                            className="flex items-center justify-between mx-[.5vw]"
                            key={i}
                          >
                            <div className="flex items-center my-[0.25vw]">
                              <input
                                type="checkbox"
                                className="w-[1.2vw] h-[1.2vw] mr-[0.4vw]"
                                onChange={(e) => {
                                  handledropCheckbox(e, item.name);
                                }}
                                checked={dropchecked[item.name] || false}
                              />
                              <span className="text-[1vw]">
                                {item?.name?.length > 26 ? (
                                  <Popover
                                    content={
                                      item.name?.charAt(0)?.toUpperCase() +
                                      item.name?.slice(1)?.toLowerCase()
                                    }
                                    trigger="hover"
                                  >
                                    <span>
                                      {item.name?.charAt(0)?.toUpperCase() +
                                        item.name
                                          ?.slice(1)
                                          ?.toLowerCase()
                                          ?.substring(0, 26) +
                                        "..."}
                                    </span>{" "}
                                  </Popover>
                                ) : (
                                  item.name?.charAt(0)?.toUpperCase() +
                                  item.name?.slice(1)?.toLowerCase()
                                )}
                              </span>
                            </div>
                            <div>
                              <span className="text-[0.8vw]">{`(${item.count})`}</span>
                            </div>
                          </div>
                        ))} */}
                    {
                      // handlesearchValue?.dropping_point?.length <= 0 ?
                      filteredDropingPoints?.length <= 0 ? (
                        <div className="flex items-center justify-between mx-[.5vw]">
                          <div className="flex items-center my-[0.25vw]">
                            <span className="text-[1vw]">
                              No matching Drop points found.
                            </span>
                          </div>
                        </div>
                      ) : (
                        filteredDropingPoints
                          // (handlesearchValue?.dropping_point?.length > 0
                          //   ? handlesearchValue.dropping_point
                          //   : pickUp_list?.dropping_points
                          ?.slice(0, 5)
                          .map((item, i) => (
                            <div
                              className="flex items-center justify-between"
                              key={i}
                            >
                              <div className="flex items-center my-[0.25vw]">
                                <input
                                  type="checkbox"
                                  className="w-[1.2vw] h-[1.2vw] mr-[0.6vw] cursor-pointer"
                                  onChange={(e) =>
                                    handledropCheckbox(e, item.name)
                                  }
                                  checked={dropchecked[item.name] || false}
                                />
                                <span className="text-[1vw] pt-[0.1vw] items-center">
                                  {item?.name?.length > 26 ? (
                                    <Popover
                                      content={
                                        item.name?.charAt(0)?.toUpperCase() +
                                        item.name?.slice(1)?.toLowerCase()
                                      }
                                      trigger="hover"
                                    >
                                      <span>
                                        {item.name?.charAt(0)?.toUpperCase() +
                                          item.name
                                            ?.slice(1)
                                            ?.toLowerCase()
                                            ?.substring(0, 26) +
                                          "..."}
                                      </span>
                                    </Popover>
                                  ) : (
                                    item.name?.charAt(0)?.toUpperCase() +
                                    item.name?.slice(1)?.toLowerCase()
                                  )}
                                </span>
                              </div>
                              <div>
                                <span className="text-[0.8vw]">{`(${item.count})`}</span>
                              </div>
                            </div>
                          ))
                      )
                    }

                    {filteredDropingPoints.length > 5 ? (
                      <p
                        className="text-[#1F487C] font-bold text-[0.8vw] pt-[0.6vw] cursor-pointer"
                        onClick={() => openModal("drop")}
                      >{`SHOW ALL (${filteredDropingPoints.length})`}</p>
                    ) : null}
                  </div>
                </div>
              </>
            )}
            <p className="my-[0.5vw] border-b-[0.01vw] border-gray-300"></p>
          </div>
          <div>
            <div className="">
              <div className="grid grid-cols-4 justify-between items-center my-[0.6vw]">
                <div className="col-span-3">
                  <h1 className="text-[1.1vw] text-black font-bold px-[0.6vw]">
                    {busdata?.from
                      ? `Drop Time - ${busdata?.to.charAt(0).toUpperCase() +
                      busdata?.to.slice(1)
                      }`
                      : "Drop Time"}
                  </h1>
                </div>
                <div className="flex items-center">
                  <h3
                    className="text-[0.8vw] pr-[0.4vw] text-gray-500 cursor-pointer"
                    onClick={timeClear}
                  >
                    CLEAR
                  </h3>
                  {boolean.drop_time === true ? (
                    <button
                      onClick={() =>
                        setBoolean({
                          ...boolean,
                          drop_time: !boolean.drop_time,
                        })
                      }
                    >
                      <IoIosArrowUp size={"1vw"} className="cursor-pointer" />
                    </button>
                  ) : (
                    <IoIosArrowDown
                      size={"1vw"}
                      className="cursor-pointer"
                      onClick={() =>
                        setBoolean({
                          ...boolean,
                          drop_time: !boolean.drop_time,
                        })
                      }
                    />
                  )}
                </div>
              </div>
            </div>
            {boolean.drop_time ? (
              <>
                <div className="grid grid-cols-2 pt-[0.5vw]  gap-[0.5vw] mx-[0.5vw] ">
                  <button
                    className={`${droptime === "6:00 AM - 11:00 AM" ? "bg-[#1F487C]" : "bg-white"
                      } h-full ${droptime === "6:00 AM - 11:00 AM" ? "text-white " : ""
                      } w-full  ${droptime === "6:00 AM - 11:00 AM"
                        ? "border-[#1F487C] border-[0.1vw]"
                        : "border-gray-300 border-[0.1vw]"
                      } rounded-[0.6vw] cursor-pointer flex flex-col items-center justify-center py-[0.5vw]`}
                    // onClick={() =>
                    //   setTimeFitervalue({
                    //     ...timefiltervalue,
                    //     time_6:00 AM to 11:00 AM: !timefiltervalue.time_6:00 AM to 11:00 AM,
                    //   })
                    // }
                    onClick={() => {
                      if (droptime === "6:00 AM - 11:00 AM") {
                        setDropTime("");
                      } else {
                        setDropTime("6:00 AM - 11:00 AM");
                      }
                    }}
                  >
                    <span className="pb-[0.25vw]">
                      <LuSunrise className="" size={"1vw"} />
                    </span>
                    <span className="font-semibold text-center text-[0.8vw]">
                      6:00 to 11:00
                    </span>
                  </button>
                  <button
                    className={`${droptime === "11:00 AM - 6:00 PM" ? "bg-[#1F487C]" : "bg-white"
                      } h-full ${droptime === "11:00 AM - 6:00 PM" ? "text-white " : ""
                      } w-full  ${droptime === "11:00 AM - 6:00 PM"
                        ? "border-[#1F487C] border-[0.1vw]"
                        : "border-gray-300 border-[0.1vw]"
                      } rounded-[0.6vw] cursor-pointer flex flex-col items-center justify-center py-[0.5vw]`}
                    // onClick={() =>
                    //   setTimeFitervalue({
                    //     ...timefiltervalue,
                    //     time_6:00 AM to 11:00 AM: !timefiltervalue.time_6:00 AM to 11:00 AM,
                    //   })
                    // }
                    onClick={() => {
                      if (droptime === "11:00 AM - 6:00 PM") {
                        setDropTime("");
                      } else {
                        setDropTime("11:00 AM - 6:00 PM");
                      }
                    }}
                  >
                    <span className="pb-[0.1vw]">
                      <IoSunnyOutline size={"1vw"} />
                    </span>
                    <span className="font-semibold text-center text-[0.8vw]">
                      11:00 to 18:00
                    </span>
                  </button>
                </div>
                <div className="grid grid-cols-2 pt-[1vw]  gap-[0.5vw] mx-[0.5vw] mb-[1vw]">
                  <button
                    className={`${droptime === "6:00 PM - 11:00 PM" ? "bg-[#1F487C]" : "bg-white"
                      } h-full ${droptime === "6:00 PM - 11:00 PM" ? "text-white " : ""
                      } w-full  ${droptime === "6:00 PM - 11:00 PM"
                        ? "border-[#1F487C] border-[0.1vw]"
                        : "border-gray-300 border-[0.1vw]"
                      } rounded-[0.6vw] cursor-pointer flex flex-col items-center justify-center py-[0.5vw]`}
                    // onClick={() =>
                    //   setTimeFitervalue({
                    //     ...timefiltervalue,
                    //     time_6:00 AM to 11:00 AM: !timefiltervalue.time_6:00 AM to 11:00 AM,
                    //   })
                    // }
                    onClick={() => {
                      if (droptime === "6:00 PM - 11:00 PM") {
                        setDropTime("");
                      } else {
                        setDropTime("6:00 PM - 11:00 PM");
                      }
                    }}
                  >
                    <span className="pb-[0.5vw]">
                      <LuSunset className="" size={"1vw"} />
                    </span>
                    <span className="font-semibold text-center text-[0.8vw]">
                      18:00 to 23:00
                    </span>
                  </button>
                  <button
                    className={`${droptime === "11:00 PM - 6:00 AM" ? "bg-[#1F487C]" : "bg-white"
                      } h-full ${droptime === "11:00 PM - 6:00 AM" ? "text-white " : ""
                      } w-full  ${droptime === "11:00 PM - 6:00 AM"
                        ? "border-[#1F487C] border-[0.1vw]"
                        : "border-gray-300 border-[0.1vw]"
                      } rounded-[0.6vw] cursor-pointer flex flex-col items-center justify-center py-[0.5vw]`}
                    // onClick={() =>
                    //   setTimeFitervalue({
                    //     ...timefiltervalue,
                    //     time_6:00 AM to 11:00 AM: !timefiltervalue.time_6:00 AM to 11:00 AM,
                    //   })
                    // }
                    onClick={() => {
                      if (droptime === "11:00 PM - 6:00 AM") {
                        setDropTime("");
                      } else {
                        setDropTime("11:00 PM - 6:00 AM");
                      }
                    }}
                  >
                    <span className="pb-1">
                      <PiMoonLight size={"1vw"} />
                    </span>
                    <span className="font-semibold text-center text-[0.8vw]">
                      23:00 to 6:00
                    </span>
                  </button>
                </div>
              </>
            ) : (
              ""
            )}
            <p className="my-[0.5vw] border-b-[0.01vw] border-gray-300"></p>
          </div>
          {amenitieslist?.length > 0 && (
            <div className="">
              <div className="grid grid-cols-4 justify-between items-center my-[0.6vw]">
                <div className="col-span-3">
                  <h1 className="text-[1.1vw] font-bold px-[0.5vw]">Amenities</h1>
                </div>
                <div className="flex items-center">
                  <h3
                    className="text-[0.8vw] pr-[0.4vw] float-end text-gray-500  cursor-pointer"
                    onClick={amenitiesClear}
                  >
                    CLEAR
                  </h3>
                  {boolean.amenities === true ? (
                    <button
                      onClick={() =>
                        setBoolean({
                          ...boolean,
                          amenities: !boolean.amenities,
                        })
                      }
                    >
                      <IoIosArrowUp size={"1vw"} className="cursor-pointer" />
                    </button>
                  ) : (
                    <IoIosArrowDown
                      size={"1vw"}
                      className="cursor-pointer"
                      onClick={() =>
                        setBoolean({
                          ...boolean,
                          amenities: !boolean.amenities,
                        })
                      }
                    />
                  )}
                </div>
              </div>
              {boolean.amenities && (
                <>
                  <div className="px-[0.6vw] pb-[0.6vw]">
                    <Input
                      autoComplete="off"
                      prefix={<CiSearch size={"1.1vw"} />}
                      placeholder="Search"
                      className="mb-[1vw] text-[1vw] h-[2.5vw] "
                      onChange={(e) => {
                        // setHandleSearchValue("amenities");
                        // Search(e, "amenities");
                        handleSearch(
                          dispatch,
                          e,
                          "amenities",
                          setHandleSearchValue
                        );
                      }}
                    />
                    <div>
                      {/* {handlesearchAmenities?.amenities?.length > 0 &&
                      handlesearchAmenities?.amenities
                        ?.slice(0, 5)
                        .map((item, i) => (
                          <div
                            className="flex items-center justify-between"
                            key={i}
                          >
                            <div className="flex items-center my-[0.25vw] bg-red-500">
                              <input
                                type="checkbox"
                                className="w-[1.2vw] h-[1.2vw] mr-[0.4vw]"
                                onChange={(e) => {
                                  handleAmenityCheckbox(e, item.amenity);
                                }}
                                checked={amenitiesvalue[item.amenity] || false}
                              />
                              <span className="text-[1vw]">
                                {item?.amenity?.length > 26 ? (
                                  <Popover
                                    content={
                                      // item.amenity?.charAt(0)?.toUpperCase() +
                                      // item.amenity?.slice(1)?.toLowerCase()
                                      toTitleCase(item?.amenity)
                                    }
                                    trigger="hover"
                                  >
                                    <span>
                                      {item.amenity?.charAt(0)?.toUpperCase() +
                                        item.amenity
                                          ?.slice(1)
                                          ?.toLowerCase()
                                          ?.substring(0, 26) +
                                        "..."}
                                    </span>{" "}
                                  </Popover>
                                ) : (
                                  // item.amenity?.charAt(0)?.toUpperCase() +
                                  // item.amenity?.slice(1)?.toLowerCase()
                                  toTitleCase(item?.amenity)
                                )}
                              </span>
                            </div>
                            <div>
                              <span className="text-[0.8vw]">{`(${item.count})`}</span>
                            </div>
                          </div>
                        ))} */}

                      {handlesearchValue?.amenities?.length <= 0 ? (
                        <div className="flex items-center justify-between mx-[.5vw]">
                          <div className="flex items-center my-[0.25vw]">
                            <span className="text-[1vw]">
                              No matching amenities found.
                            </span>
                          </div>
                        </div>
                      ) : (
                        (handlesearchValue?.amenities?.length > 0
                          ? handlesearchValue.amenities
                          : pickUp_list?.amenities
                        )
                          ?.slice(0, 5)
                          .map((item, i) => (
                            <div
                              className="flex items-center justify-between"
                              key={i}
                            >
                              <div className="flex items-center my-[0.25vw]">
                                <input
                                  type="checkbox"
                                  className="w-[1.2vw] h-[1.2vw] mr-[0.4vw] cursor-pointer"
                                  onChange={(e) =>
                                    handleAmenityCheckbox(e, item.amenity)
                                  }
                                  checked={amenitiesvalue[item.amenity] || false}
                                />
                                <span className="text-[1vw]">
                                  {item?.amenity?.length > 26 ? (
                                    <Popover
                                      content={toTitleCase(item?.amenity)}
                                      trigger="hover"
                                    >
                                      <span>
                                        {item.amenity?.charAt(0)?.toUpperCase() +
                                          item.amenity
                                            ?.slice(1)
                                            ?.toLowerCase()
                                            ?.substring(0, 26) +
                                          "..."}
                                      </span>
                                    </Popover>
                                  ) : (
                                    toTitleCase(item?.amenity)
                                  )}
                                </span>
                              </div>
                              <div>
                                <span className="text-[0.8vw]">{`(${item.count})`}</span>
                              </div>
                            </div>
                          ))
                      )}
                    </div>
                    {amenitiesLength > 5 ? (
                      <p
                        className="text-[#1F487C] font-bold text-[0.8vw] pt-[0.5vw] cursor-pointer pl-[0.6vw]"
                        onClick={() => openModal("amenities")}
                      >{`${`SHOW ALL (${amenitiesLength}`})`}</p>
                    ) : null}
                  </div>
                </>
              )}
              <p className="mt-[0.5vw] border-b-[0.01vw] border-gray-300"></p>
            </div>
          )}
          <div className="mb-[0.7vw] mt-[1vw]">
            <p className="mt-[0.5vw] border-b-[0.01vw] border-gray-300"></p>
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
              width: "45%", // Adjust width as needed
              height: "60%", // Adjust height as needed
              margin: "11vw 35vw",
              padding: "0px",
            },
          }}
        >
          <h1 className="border-l-[0.4vw] pl-[0.6vw] pt-[0.25vw] text-[1.5vw] border-[#1F487C]">
            {modalname === "pickup"
              ? "Pickup Point"
              : modalname === "drop"
                ? "Drop Point"
                : modalname === "amenities"
                  ? "Amenities"
                  : "Travel Operator"}
          </h1>
          <div className="p-[1vw] overflow-x-auto ">
            {" "}
            <Input
              prefix={<CiSearch size={"1vw"} />}
              placeholder="Search"
              autoComplete="off"
              className="mb-[0.6vw] text-[1vw] h-[2vw]"
              onChange={(e) => {
                // setModalSearch(e.target.value);
                if (modalname === "amenities") {
                  // setHandleSearchValue("amenities");
                  // Search(e, "amenities");
                  handleSearch(dispatch, e, "amenities", setHandleSearchValue);
                } else if (modalname === "pickup") {
                  // setHandleSearchValue("boarding");
                  // Search(e, "boarding");
                  handleSearch(dispatch, e, "boarding", setHandleSearchValue);
                } else if (modalname === "drop") {
                  // setHandleSearchValue("dropping");
                  // Search(e, "dropping");
                  handleSearch(dispatch, e, "dropping", setHandleSearchValue);
                } else {
                  // setHandleSearchValue("operators");
                  // Search(e, "operators");
                  handleSearch(dispatch, e, "operators", setHandleSearchValue);
                }
              }}
            />
            <div>
              {/* <div className="flex flex-wrap">
              {Object.entries(modalshowdata).map(([row, letters], index) => (
                <div key={index} className="w-1/3 px-[0.6vw]">
                  <h2 className="text-[#1F487C] my-[0.6vw] text-[1vw] font-semibold text-center">
                    {row}
                  </h2>
                  {letters.map((item, j) => (
                    <div
                      className="flex items-center justify-between gap-4"
                      key={j}
                    >
                      <div className="flex items-center my-[0.25vw]">
                        <input
                          type="checkbox"
                          className="w-[1.2vw] h-[1.2vw] mr-[0.6vw]"
                          onChange={(e) =>
                            modalname === "pickup"
                              ? handlePickupCheckbox(e, item.place)
                              : modalname === "drop"
                              ? handledropCheckbox(e, item.place)
                              : modalname === "amenities"
                              ? handleAmenities(item.place)
                              : handleoperatorCheckbox(e, item.place)
                          }
                          checked={
                            modalname === "pickup"
                              ? pickupchecked[item.place] || false
                              : modalname === "drop"
                              ? dropchecked[item.place]
                              : operatorchecked[item.place]
                          }
                        />
                        <span className="pt-1 text-[1vw]">{item.place}</span>
                      </div>
                      <div>
                        <span className="text-[0.8vw]">{`(${
                          item.count / 8
                        })`}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div> */}
            </div>
            <div className="h-[20vw] w-full grid grid-flow-col grid-rows-10 pb-[1vw] overflow-x-auto overflow-y-hidden">
              {sortedList?.length === undefined || sortedList?.length === 0 ? (
                <div className="mt-[5vw]">
                  <div className="flex justify-center w-full">
                    {" "}
                    <IoTrashBinSharp color="#A9A9A9" size={"5.5vw"} />
                  </div>
                  <p className="text-[2vw] text-[#A9A9A9] flex justify-center w-full">
                    No data
                  </p>
                </div>
              ) : (
                sortedList?.map((item, i) => (
                  // <p key={item.place} className="whitespace-nowrap pr-[5vw] ">
                  //   {item.place}
                  // </p>
                  <div
                    className="flex items-center justify-between pr-[5vw]"
                    key={i}
                  >
                    <div className="whitespace-nowrap items-center flex justify-center">
                      <input
                        type="checkbox"
                        className="w-[1.1vw] h-[1.1vw] mr-[0.6vw] cursor-pointer"
                        onChange={(e) =>
                          modalname === "pickup"
                            ? handlePickupCheckbox(e, item?.name)
                            : modalname === "drop"
                              ? handledropCheckbox(e, item?.name)
                              : modalname === "amenities"
                                ? handleAmenityCheckbox(e, item?.amenity)
                                : handleoperatorCheckbox(e, item?.operator)
                        }
                        checked={
                          modalname === "pickup"
                            ? pickupchecked[item?.name] || false
                            : modalname === "drop"
                              ? dropchecked[item?.name] || false
                              : modalname === "amenities"
                                ? amenitiesvalue[item?.amenity]
                                : operatorchecked[item?.operator]
                        }
                      />
                      <span className="pt-1 text-[1vw]">
                        {modalname === "amenities"
                          ? //  item?.amenity?.charAt(0)?.toUpperCase() +
                          //   item?.amenity?.slice(1)?.toLowerCase()
                          toTitleCase(item?.amenity)
                          : modalname === "operators"
                            ? item?.operator?.charAt(0)?.toUpperCase() +
                            item?.operator?.slice(1)?.toLowerCase()
                            : item?.name?.charAt(0)?.toUpperCase() +
                            item?.name?.slice(1)?.toLowerCase()}
                        <span className="pl-[1vw]">
                          {modalname !== "operators" && `(${item?.count})`}
                        </span>
                      </span>
                    </div>
                    {/* <div>
                  <span className="text-[0.8vw]">{`(${
                    item.count / 8
                  })`}</span>
                </div> */}
                  </div>
                ))
              )}
            </div>
          </div>

          {/* <div className="w-full">
            {Object.entries(modalshowdata).map(([row, letters], index) => (
              <div key={index} className="grid grid-flow-row">
                {letters
                  .reduce((chunks, item, i) => {
                    if (i % 5 === 0) chunks.push(letters.slice(i, i + 5));
                    return chunks;
                  }, [])
                  .map((chunk, i) => (
                    <div key={i} className="grid grid-flow-col">
                      {chunk.map((item, j) => (
                        <div key={j} className="w-[10vw]">
                          {item.place}
                        </div>
                      ))}
                    </div>
                  ))}
              </div>
            ))}
          </div> */}

          {/* <div className="grid grid-flow-col h-[20vw] grid-rows-2">
            {Object.entries(modalshowdata).map(([row, letters], index) => (
              <div key={index} className="">
                <h2 className="text-[#1F487C] text-[1vw] font-semibold p-[1vw]">
                  {row}
                </h2>
                {letters.map((item, index) => (
                  <p key={index}>{item.place}</p>
                ))}
              </div>
            ))}
          </div> */}

          {/* <div class="flex justify-center items-center w-full  py-[1vw]">
            <button class="bg-[#1F487C] w-[20%] py-[0.5vw] rounded-full text-[1vw] text-white font-semibold mr-[0.6vw]">
              Cancel
            </button>
            <button
              class="bg-[#03CCF4] w-[20%] py-[0.25vw] rounded-full text-[1vw] text-white font-semibold ml-2"
              onClick={handleonapply}
            >
              Apply
            </button>
          </div> */}
        </Modal>

        {/* <Modal
          isOpen={filtervalue.radius}
          onRequestClose={closeModal}
          style={{
            overlay: {
              backgroundColor: "rgba(0, 0, 0, 0.5)",
            },
            content: {
              width: "30vw", // Adjust width as needed
              height: "30vw", // Adjust height as needed
              margin: "auto",
              padding: "0px",
            },
          }}
        >
          <Map />
        </Modal> */}
      </div>
    </>
  );
};

export default Sidebar;
