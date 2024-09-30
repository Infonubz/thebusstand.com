import React, { useCallback, useEffect, useState } from "react";
// import {
//   MdAirlineSeatIndividualSuite,
//   MdAirlineSeatReclineExtra,
// } from "react-icons/md";
// import {
//   TbAirConditioning,
//   TbAirConditioningDisabled,
//   TbRuler2,
// } from "react-icons/tb";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { LuSunrise, LuSunset } from "react-icons/lu";
import { IoSunnyOutline } from "react-icons/io5";
import { PiMoonLight } from "react-icons/pi";
import { Input } from "antd";
import { CiSearch } from "react-icons/ci";
// import Modal from "react-modal";
import s_ac from "../../assets/s_ac.png";
import s_c_ac from "../../assets/s_c_ac.png";
import s_non_ac from "../../assets/s_non_ac.png";
import s_c_non_ac from "../../assets/s_c_non_ac.png";
import seats from "../../assets/seats.png";
import sleeper from "../../assets/seat_sleep.png";
import { useDispatch, useSelector } from "react-redux";
import { FILTER, GET_FILTER_DATA } from "../../Store/type";
// import { BiMapPin } from "react-icons/bi";
// import { useNavigate } from "react-router";
// import Map from "../Dashboard/Map";
import axios from "axios";
import { Drawer } from "antd";
import { Filters, Drop_Point_List } from "../../Api/Dashboard/Dashboard";
import RangeSlide from "./RangeSlide";
import { RiBusFill } from "react-icons/ri";
import { FaBus } from "react-icons/fa";

const SidebarMobile = ({ sidebarToggle, share, showAll }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isDrawerName, setIsDrawerName] = useState("");
  const [drawerSearch, setDrawerSearch] = useState("");


  const [amenitieslist, setAmenitiesList] = useState([]);
  console.log(amenitieslist, 'amenitieslist_amenitieslist');

  // const [dropponitlist, setDropPointList] = useState([]);
  const [dropfulllist, setDropFullList] = useState([]);
  // const [pickuppointlist, setPickupPointlist] = useState([]);
  const [pickupfullist, setPickupFullList] = useState([]);
  console.log(pickupfullist, 'pickingFullList_mobile');
  // const [opertorlist, setOperatorList] = useState([]);
  const [opertorfulllist, setOperatorFullList] = useState([]);


  // const drop_Point_List = useSelector((state) => state?.drop_point_list);

  const toggleDrawer = (name) => {
    setIsDrawerOpen(!isDrawerOpen);
    setIsDrawerName(name);
    sessionStorage.setItem('isluxury', false)
  };
  const [showingdata, setShowingData] = useState([]);
  const [drawershowdata, setDrawerShowData] = useState([]);
  console.log(drawershowdata, 'line_64_checking')
  console.log(showingdata, 'drawer_show_data');

  // const openDrawer = (name) => {
  //   setIsDrawerName(name);
  //   setIsDrawerOpen(isDrawerOpen);
  // };
  // const [busData, setBusData] = useState();

  const closeDrawer = () => {
    setDrawerSearch("");
    setIsDrawerOpen(!isDrawerOpen);
  };

  useEffect(() => {
    if (isDrawerName === "pickup") {
      setShowingData(pickupfullist);

    } else if (isDrawerName === "drop") {
      setShowingData(dropfulllist);
    } else if (isDrawerName === "amenities") {
      console.log("hii");
      setShowingData(amenitieslist);
    } else {
      setShowingData(opertorfulllist);
    }
  }, [isDrawerName, pickupfullist, dropfulllist, amenitieslist, opertorfulllist]);

  useEffect(() => {
    if (isDrawerName === "pickup") {
      const filteredData = showingdata?.filter((item) =>
        item?.name?.toLowerCase()?.includes(drawerSearch?.toLowerCase())
      );
      // const groupedPlaces = groupByFirstLetter(filteredData);
      // setModalShowData(groupedPlaces);
      console.log(filteredData, 'filter_dataa');

      setDrawerShowData(filteredData);
    } else if (isDrawerName === "drop") {
      const filteredData = showingdata?.filter((item) =>
        item.name?.toLowerCase()?.includes(drawerSearch?.toLowerCase())
      );
      // const groupedPlaces = groupByFirstLetter(filteredData);
      // setModalShowData(groupedPlaces);
      setDrawerShowData(filteredData);
    } else if (isDrawerName === "amenities") {
      const filteredData = showingdata?.filter((item) =>
        item?.amenity?.toLowerCase()?.includes(drawerSearch?.toLowerCase())
      );
      // const groupedPlaces = groupByFirstLetter(filteredData);
      // setModalShowData(groupedPlaces);
      setDrawerShowData(filteredData);
    } else {
      const filteredData = showingdata?.filter((item) =>
        item?.operator?.toLowerCase()?.includes(drawerSearch?.toLowerCase())
      );
      // const groupedPlaces = groupByFirstLetter(filteredData);
      // setModalShowData(groupedPlaces);
      setDrawerShowData(filteredData);
    }
  }, [isDrawerName, drawerSearch, showingdata]);

  const capitalizeFirstLetter = (string) => {
    return string
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const arrange_data = useSelector((state) => state.rearrange);
  const [amenitiesvalue, setAmenitiesValue] = useState({});
  // const [vehiclevalue, setVehicleValue] = useState([]);
  // const [modalIsOpen, setModalIsOpen] = useState(false);
  // const [modalname, setModalname] = useState("");
  // const [finalpickupdata, setFinalPickupData] = useState([]);
  // const [finaldropdata, setFinalDropData] = useState([]);
  // const [finaloperatordata, setFinalOperatorData] = useState([]);
  // const [modalsearch, setModalSearch] = useState("");
  // const [modalshowdata, setModalShowData] = useState([]);
  // console.log(modalshowdata, 'modal_show_mobile')
  const [pickupchecked, setPickupChecked] = useState({});
  const [dropchecked, setDropChecked] = useState({});
  const [operatorchecked, setOperatorChecked] = useState({});
  //const [showingdata, setShowingData] = useState([]);
  // const [modalpickupsearch, setModalpickupsearch] = useState("");
  const [searchvalue, setSearchValue] = useState({
    pickup: "",
    drop: "",
    operator: "",
  });
  const [filtervalue, setFitervalue] = useState({
    ac: false,
    non_ac: false,
    sleeper: false,
    seater: false,
    amenities: [],
    radius: false,
  });
  console.log(filtervalue, 'filter_valuee')
  const [timefiltervalue, setTimeFitervalue] = useState({
    // time_6am-11am: false,
    // time_11am-6pm: false,
    // time_6pm-11pm: false,
    // time_11pm-6am: false,
  });
  // const [pickuptimefiltervalue, setPickupTimeFitervalue] = useState({
  //   // time_6am-11am: false,
  //   // time_11am-6pm: false,
  //   // time_6pm-11pm: false,
  //   // time_11pm-6am: false,
  // });
  const [boolean, setBoolean] = useState({
    pickup: true,
    drop: true,
    pickup_time: true,
    drop_time: true,
    amenities: true,
    operators: true,
    vehicle: true,
  });

  const handleClear = () => {
    setFitervalue({
      ...filtervalue,
      ac: false,
      non_ac: false,
      sleeper: false,
      seater: false,
      radius: false,
    });
    setDropChecked({});
    setOperatorChecked({});
    setPickupChecked({});
    setAmenitiesValue({});
    setFitervalue({
      ac: false,
      non_ac: false,
      sleeper: false,
      seater: false,
      amenities: [],
      radius: false,
    });
    setTimeFitervalue({
      ...timefiltervalue,
      // time_6am-11am: false,
      // time_11am-6pm: false,
      // time_6pm-11pm: false,
      // time_11pm-6am: false,
    });
    setDropTime("");
    setPickUpTime("");
    setAcFilter("");
    setSeatTypeFilter("");
    setBusType("");
    setNoramlBus("");
  };
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
  const amenitiesClear = () => {
    setAmenitiesValue({});
  };
  console.log(amenitiesvalue, "amenitiesvalue");

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
    setAcFilter("");
    setSeatTypeFilter("");
    setBusType("");
    setNoramlBus("");
  };
  // const openModal = (name) => {
  //   setModalname(name);
  //   setModalIsOpen(true);
  // };

  // const closeModal = () => {
  //   setModalIsOpen(false);
  //   setModalSearch("");
  // };

  // const groupByFirstLetter = (places) => {
  //   const groupedPlaces = {};
  //   places?.forEach((item) => {
  //     const firstLetter = item.place?.charAt(0)?.toUpperCase();
  //     if (!groupedPlaces[firstLetter]) {
  //       groupedPlaces[firstLetter] = [];
  //     }
  //     groupedPlaces[firstLetter].push(item);
  //   });
  //   return groupedPlaces;
  // };

  const handlePickupCheckbox = (event, itemName) => {
    const { checked } = event.target;
    // const { name, checked } = event.target;
    // setCheckboxes({ ...checkboxes, [name]: checked });
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

  const handleAmenityCheckbox = (event, itemName) => {
    const { checked } = event?.target;

    setAmenitiesValue((prevState) => {
      if (checked) {
        console.log(prevState, "drop checked");
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
    //   time_6am-11am: false,
    //   time_11am-6pm: false,
    //   time_6pm-11pm: false,
    //   time_11pm-6am: false,
    // });
    setDropTime("");
  };
  const pickuptimeClear = () => {
    setPickUpTime("");
  };


  // useEffect(() => {
  //   // const pickupslice = place.slice(0, 5);
  //   const dropslice = drop_place.slice(0, 5);
  //   const travelslice = travel_operator.slice(0, 5);
  //   if (searchvalue.pickup) {
  //     const filteredData = place.filter((item) =>
  //       item.place.toLowerCase().includes(searchvalue.pickup.toLowerCase())
  //     );
  //     setFinalPickupData(filteredData);
  //   } else {
  //     setFinalPickupData(pickupslice);
  //   }
  //   if (searchvalue.drop) {
  //     const filteredData = drop_place.filter((item) =>
  //       item.place.toLowerCase().includes(searchvalue.drop.toLowerCase())
  //     );
  //     setFinalDropData(filteredData);
  //   } else {
  //     setFinalDropData(dropslice);
  //   }
  //   if (searchvalue.operator) {
  //     const filteredData = travel_operator.filter((item) =>
  //       item.place.toLowerCase().includes(searchvalue.operator.toLowerCase())
  //     );
  //     setFinalOperatorData(filteredData);
  //   } else {
  //     setFinalOperatorData(travelslice);
  //   }
  // }, [searchvalue]);

  useEffect(() => {
    const filterfun = () => {
      if (filtervalue) {
        dispatch({
          type: FILTER,
          payload: filtervalue,
        });
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
  console.log(busdata, 'busdata_working_')
  const [busType, setBusType] = useState(
    JSON.parse(sessionStorage.getItem("isLuxury"))
  );
  const [NormalBus, setNoramlBus] = useState(false);
  const [acfilter, setAcFilter] = useState("");
  const [seattypefilter, setSeatTypeFilter] = useState("");
  const [pickuptime, setPickUpTime] = useState("");
  const [droptime, setDropTime] = useState("");
  const [pickUp_list, setPickUpList] = useState({});
  console.log(pickUp_list.boarding_points, 'pick_upcc_mob')
  const [priceRange, setPriceRange] = useState({
    min: 0,
    max: 3000,
  });

  const departure_local = localStorage.getItem("depature")
  const arrival_local = localStorage.getItem("arrival")
  const departure_date_local = localStorage.getItem("departure_date")
  const isLuxury_local = sessionStorage.getItem("isLuxury")
  const sort_local = localStorage.getItem("sort")
  const set_ac_local = localStorage.getItem("ac")
  const seatType_local = localStorage.getItem("seatType")
  console.log(busType, "GOLDEN_TICKET")
  console.log(acfilter, "filtervalue.radius");
  console.log(seattypefilter, 'seattypefileterer');

  useEffect(() => {
    if (localStorage.getItem("ac") === "true") {
      setAcFilter("ac");
      console.log(localStorage.getItem("ac"), "joooooooo");
    }
    if (localStorage.getItem("seatType")) {
      setSeatTypeFilter(localStorage.getItem("seatType"));
    }
  }, [set_ac_local, seatType_local]);



  const handleAllFilters = useCallback(async () => {
    try {
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
        // Parse the string into a Date object
        let dateObj = new Date(dateTimeString);

        // Format the date to "YYYY-MM-DD"
        const formattedDate =
          dateObj.getFullYear() +
          "-" +
          ("0" + (dateObj.getMonth() + 1)).slice(-2) +
          "-" +
          ("0" + dateObj.getDate()).slice(-2);

        // Store the formatted date back in localStorage
        localStorage.setItem("departure_date", formattedDate);
      }

      const allFilters = await Filters(
        // localStorage.getItem("departure"),
        departure_local,
        // localStorage.getItem("arrival"),
        arrival_local,
        // localStorage.getItem("departure_date"),
        departure_date_local,
        busType,
        acfilter,
        seattypefilter,
        pickuptime,
        droptime,
        pickupcheck,
        dropcheck,
        amenitycheck,
        operatorcheck,
        priceRange,
        localStorage.getItem("sort"),
        NormalBus,
        dispatch
      );
      // setBusData(allFilters);
      console.log(allFilters, "allFilters");
      console.log(pickuptime, "pickuptime");
    } catch (error) {
      console.error("Error", error);
    }
  }, [busType, acfilter, seattypefilter, pickuptime, droptime, pickupchecked, dropchecked, amenitiesvalue, operatorchecked, priceRange, NormalBus, departure_local, arrival_local, departure_date_local, dispatch])

  useEffect(() => {
    handleAllFilters();
  }, [
    // localStorage.getItem("departure"),
    // localStorage.getItem("arrival"),
    // localStorage.getItem("departure_date"),
    // ,
    handleAllFilters,
    isLuxury_local,
    // busType,
    // acfilter,
    // seattypefilter,
    // pickuptime,
    // droptime,
    // pickupchecked,
    // dropchecked,
    // amenitiesvalue,
    // operatorchecked,
    // priceRange,
    sort_local,
    // localStorage.getItem("sort"),
    // sessionStorage.setItem("isLuxury", false),
    // busIsLuxury,
    // NormalBus,
    // dispatch,
  ]);

  const handleDropPoint = useCallback(async () => {
    try {
      const dropPointFilter = await Drop_Point_List(
        localStorage.getItem("departure"),
        localStorage.getItem("arrival"),
        localStorage.getItem("selectdate"),
        dispatch
      );
      console.log(dropPointFilter, "dropPointFilter");
      setPickUpList(dropPointFilter);
    } catch (error) {
      console.error("Error", error);
    }
  }, [dispatch]);

  const selectdate_local = localStorage.getItem("selectdate")


  useEffect(() => {
    handleDropPoint();
  }, [
    handleDropPoint,
    departure_local,
    arrival_local,
    selectdate_local,
    dispatch,
  ]);

  const handlefilter = useCallback(async () => {
    // console.log(amenitiesvalue, "searchvaluesearchvalue");
    console.log(pickupchecked, "pickupchecked");
    try {
      const pickupcheck = Object.keys(pickupchecked).filter(
        (key) => pickupchecked[key]
      );
      const dropcheck = Object.keys(dropchecked).filter(
        (key) => dropchecked[key]
      );
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
      console.log(amenitiescheck.join(","), "transformedData");
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
        Semi_sleeper: seattypefilter === "is_Luxury" ? "TRUE" : "FALSE",
        pickupPoints: pickupcheck.join(","),
        dropPoints: dropcheck.join(","),
        selectedOperators: operatorcheck.join(","),
        amenities: amenitiescheck.join(","),
        timeDepature: pickuptime,
        timeArrival: droptime,
        price: arrange_data?.price ? arrange_data?.price : "FALSE",
        depature: arrange_data.depature ? arrange_data.depature : "FALSE",
        arrival: arrange_data.arrival ? arrange_data.arrival : "FALSE",
        seats: arrange_data.seats ? arrange_data.seats : "FASLE",
        rating: arrange_data.rating ? arrange_data.rating : "FALSE",
        // timeDepature:"6am-11am"
      };
      console.log(payload, "sidebarMobile_payload")
      console.log(operatorchecked, "dropcheck");
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
      console.log("Response", response);
    } catch (error) {
      console.error("Error", error);
    }
  }, [acfilter, seattypefilter, pickupchecked, dropchecked, operatorchecked, amenitiesvalue, pickuptime, arrange_data, droptime, dispatch])
  useEffect(() => {
    handlefilter();
    // sessionStorage.setItem("isLuxury", busIsLuxury);
  }, [
    // acfilter,
    // seattypefilter,
    searchvalue,
    // pickupchecked,
    // dropchecked,
    // operatorchecked,
    // amenitiesvalue,
    // pickuptime,
    // droptime,
    // arrange_data,
    departure_local,
    arrival_local,
    handlefilter,
    // sessionStorage.setItem("isLuxury", false)
    // busIsLuxury
  ]);


  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const place = localStorage.getItem("depature");
  //       const response = await axios.get(
  //         place === "Chennai"
  //           ? "http://192.168.90.43:8090/chennaisrc"
  //           : place === "Bangalore"
  //             ? "http://192.168.90.43:8090/bangaloresrc"
  //             : "http://192.168.90.43:8090/chennaisrc"
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
  console.log(fulllist, "searchvaluesearchvalue555");

  // const filter = fulllist.map((item) => {
  //   return item?.Pickup_points.split(",");
  // });
  // const find = filter.filter((item, index) => {
  //   return item[0] == "Siruseri";
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
    // // setAmenitiesList(AmenitiesData);

    setAmenitiesList(pickUp_list?.amenities);
    console.log(pickUp_list, 'settamininties')
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
    // setDropFullList(DroppointsData);
    setDropFullList(pickUp_list?.dropping_points);
    // const travelslice = DroppointsData.slice(0, 5);
    // if (searchvalue.drop) {
    //   const filteredData = DroppointsData.filter((item) =>
    //     item.place.toLowerCase().includes(searchvalue.drop.toLowerCase())
    //   );
    //   setDropPointList(filteredData);
    // } else {
    //   setDropPointList(travelslice);
    // }
    // pickuppoint
    const Pickuppoints = fulllist.map((item) => {
      return item.Pickup_points.split(",");
    });
    const PickuppointsArray = [].concat(...Pickuppoints);
    const PickuppointsCount = PickuppointsArray.reduce((acc, val) => {
      acc[val] = (acc[val] || 0) + 1;
      return acc;
    }, {});
    console.log(PickuppointsCount, "PickuppointsArray");
    // const PickuppointsData = Object.entries(PickuppointsCount)
    //   .filter(([place, count]) => place.trim() !== "")
    //   .map(([place, count]) => ({
    //     place,
    //     count,
    //   }));
    // setPickupFullList(PickuppointsData);
    setPickupFullList(pickUp_list?.boarding_points);
    console.log(pickUp_list.boarding_points, 'mobile_pickuplist')
    // const pickupslice = PickuppointsData.slice(0, 5);
    // if (searchvalue.pickup) {
    //   const filteredData = PickuppointsData.filter((item) =>
    //     item.place.toLowerCase().includes(searchvalue.pickup.toLowerCase())
    //   );
    //   setPickupPointlist(filteredData);
    // } else {
    //   setPickupPointlist(pickupslice);
    // }
    // travel operator
    const Bus_operator_name = fulllist.map((item) => {
      return item.Bus_operator_name;
    });
    const uniqueArray = [...new Set(Bus_operator_name)];
    console.log(uniqueArray, "Bus_operator_name");

    const travelcount = uniqueArray.reduce((acc, val) => {
      acc[val] = (acc[val] || 0) + 1;
      return acc;
    }, {});
    console.log(uniqueArray, "travelcount");
    const traveldata = Object.entries(travelcount)
      .filter(([place, count]) => place.trim() !== "")
      .map(([place, count]) => ({
        place,
        count,
      }));
    // const travelopertorslice = traveldata.slice(0, 5);
    setOperatorFullList(traveldata);
    setOperatorFullList(pickUp_list?.operators);

    // if (searchvalue.operator) {
    //   const filteredData = traveldata.filter((item) =>
    //     item.place.toLowerCase().includes(searchvalue.operator.toLowerCase())
    //   );
    //   setOperatorList(filteredData);
    // } else {
    //   setOperatorList(travelopertorslice);
    // }
    // console.log(traveldata, "Bus_operator_name");
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
  }, [searchvalue, fulllist, pickUp_list]);
  const sortedList = drawershowdata
    ?.slice()
    ?.sort((a, b) =>
      isDrawerName === "amenities"
        ? a?.amenity?.localeCompare(b?.amenity)
        : isDrawerName === "operators"
          ? a?.operator?.localeCompare(b?.operator)
          : a?.name?.localeCompare(b?.name)
    );
  console.log(sortedList, "dropponitlist");
  console.log(share, "shareshareshare");
  const sharing = useSelector((state) => state.share);
  console.log(sharing, "sharing");

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
  //               ? "http://192.168.90.43:8090/bangaloresrc"
  //               : "http://192.168.90.43:8090/chennaisrc"
  //         );
  //         dispatch({
  //           type: GET_DATA,
  //           payload: response.data,
  //         });
  //       } catch (error) {
  //         console.error("Error fetching data:", error);
  //       }
  //     };
  //     fetchData();
  //   }, 5000);
  //   // 5 * 60 * 1000
  //   return () => clearInterval(interval);
  // }, [localStorage.getItem("depature")]);
  // const [plusvalues, setPlusvalues] = useState(0);
  // const updateStartIndex = () => {
  //   const width = window.innerWidth;
  //   if (width < 640) {
  //     // mobile
  //     setPlusvalues(1);
  //   } else if (width < 1024) {
  //     // tablet
  //     setPlusvalues(3);
  //   } else {
  //     // laptop and above
  //     setPlusvalues(5);
  //   }
  // };
  // useEffect(() => {
  //   updateStartIndex(); // Set initial startIndex based on screen size
  //   window.addEventListener("resize", updateStartIndex); // Update startIndex on window resize

  //   return () => {
  //     window.removeEventListener("resize", updateStartIndex); // Cleanup event listener on component unmount
  //   };
  // }, []);

  console.log(sidebarToggle, "sidebarToggle");
  console.log(drawershowdata, "drawershowdatadrawershowdata");
  console.log(sessionStorage.getItem('isLuxury'), "luxury_Value")
  return (
    <>
      <div
        className={`w-full bg-[#E5FFF1] h-full overflow-y-auto overflow-y-auto pt-[1vw] z-1`}
        style={{
          // zIndex: modalIsOpen || sharing === true ? 1 : 0,
          // fontFamily:"Lato"
        }}
      >
        <div className="h-full pb-[8vw] overflow-y-scroll scrollbar-hide w-full">
          <div>
            <div className="py-[1vw] pb-[1vw]">
              <div className="grid grid-cols-2 justify-between items-center">
                <div className="">
                  <h1
                    className="text-[5vw] text-black font-extrabold px-[1vw] font-[Lato]"
                    style={{
                      fontFamily: "Lato",
                    }}
                  >
                    All Filters
                  </h1>
                </div>
                <div>
                  <h3
                    className="text-[4.5vw] float-end px-[1vw] cursor-pointer underline underline-offset-[1vw]"
                    onClick={handleClear}
                  >
                    CLEAR ALL
                  </h3>
                  {/* <img src={"file://akritnas/nubiznez/Operator_logos/ss.png"} /> */}
                </div>
              </div>
            </div>

            {/* <p className="mx-[0.6vw] font-semibold text-gray-500 text-[1.1vw] my-[0.6vw]">
              Vehicle Type
            </p> */}
            <div className="grid grid-cols-4 justify-between items-center my-[6vw]">
              <div className="col-span-3">
                <h1 className="text-[5vw] font-bold px-[1vw]"> Vehicle Type</h1>
              </div>
              <div className="flex items-center">
                <h3
                  className="text-[4.5vw] pr-[1vw] float-end text-gray-500 cursor-pointer"
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
                    <IoIosArrowUp size={"6vw"} className="cursor-pointer" />
                  </button>
                ) : (
                  <IoIosArrowDown
                    size={"6vw"}
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

                <div className="grid grid-cols-2 pt-[2vw] gap-[3.5vw] mx-[1vw]">
                  <button
                    className={`${NormalBus ? "bg-[#1F487C]" : "bg-white"}  ${NormalBus
                      ? "text-white border-[#1F487C]"
                      : "border-gray-300"
                      } w-full border-[0.1vw] rounded-md cursor-pointer `}
                    onClick={() => {
                      if (NormalBus) {
                        setNoramlBus(false);
                        sessionStorage.setItem("isNoramlBus", false);
                      } else {
                        setNoramlBus(true);
                        sessionStorage.setItem("isNoramlBus", true);
                      }
                    }}
                  >
                    <div className="flex justify-center items-center">
                      <div className="py-[0.5vw] flex  items-center justify-center gap-[1vw]">
                        <span>
                          {" "}
                          <RiBusFill className="w-[5vw] h-[5vw]" />
                        </span>
                        <span className="font-semibold  text-[5vw]">
                          Normal
                        </span>
                      </div>
                    </div>
                  </button>
                  <button
                    className={`${busType ? "bg-custom-gradient-luxury bg-image-url" : "bg-white"
                      } h-full ${busType
                        ? "text-black border-custom-gradient-luxury bg-image-url"
                        : "border-gray-300 "
                      } w-full border-[0.1vw] rounded-[1.2vw] cursor-pointer `}
                    onClick={() => {
                      if (busType) {
                        setBusType(false);
                        sessionStorage.setItem("isLuxury", false);

                      } else {
                        setBusType(true);
                        sessionStorage.setItem("isLuxury", true);
                      }
                    }}
                  >
                    <div className="flex justify-center items-center">
                      <div className="py-[2vw] flex gap-[1vw] items-center justify-center">
                        <FaBus className="w-[5vw] h-[5vw]" />
                        <span className="font-semibold  text-[5vw]">
                          Luxury
                        </span>
                      </div>
                    </div>
                  </button>
                </div>





                <div className="grid grid-cols-2 pt-[2vw] gap-[3.5vw] mx-[1.5vw]">
                  <button
                    className={`${acfilter === "ac" ? "bg-[#1F487C]" : "bg-white"
                      }  ${acfilter === "ac"
                        ? "text-white border-[#1F487C]"
                        : "border-gray-300"
                      } w-full border-[0.1vw] rounded-md cursor-pointer `}
                    onClick={() => {
                      if (acfilter === "ac") {
                        setAcFilter("");
                      } else {
                        setAcFilter("ac");
                      }
                    }}
                  >
                    <div className="py-[2vw] flex items-center justify-center gap-[2vw]">
                      {/* <span>
                    <TbAirConditioning size={15} className="mx-1 " />
                  </span> */}
                      {acfilter === "ac" ? (
                        <img src={s_c_ac} className="w-[5.5vw] h-[5.5vw]" alt="s_c_ac" />
                      ) : (
                        <img src={s_ac} className="w-[5.5vw] h-[5.5vw]" alt="s_ac" />
                      )}
                      <span
                        className={`${filtervalue.ac} font-semibold  text-[5vw]`}
                      >
                        AC
                      </span>
                    </div>
                  </button>
                  <button
                    className={`${acfilter === "non_ac" ? "bg-[#1F487C]" : "bg-white"
                      } ${acfilter === "non_ac"
                        ? "text-white border-[#1F487C]"
                        : "border-gray-300"
                      } w-full border-[0.1vw]  rounded-md cursor-pointer `}
                    onClick={() => {
                      if (acfilter === "non_ac") {
                        setAcFilter("");
                      } else {
                        setAcFilter("non_ac");
                      }
                    }}
                  >
                    <div className="py-[2vw] gap-[2vw] flex items-center justify-center">
                      {/* <span>
                    <TbAirConditioningDisabled size={20} className="mx-1" />
                  </span> */}
                      {acfilter === "non_ac" ? (
                        <img src={s_c_non_ac} className="w-[5.5vw] h-[5.5vw]" alt="s_c_non_ac" />
                      ) : (
                        <img src={s_non_ac} className="w-[5.5vw] h-[5.5vw]" alt="s_non_ac" />
                      )}
                      <span className="font-semibold  text-[5vw]">Non AC</span>
                    </div>
                  </button>
                </div>

                <div className="grid grid-cols-2 pt-[2vw] gap-[3.5vw] mx-[1vw]">
                  <button
                    className={`${seattypefilter === "sleeper" ? "bg-[#1F487C]" : "bg-white"
                      } h-full ${seattypefilter === "sleeper"
                        ? "text-white border-[#1F487C]"
                        : "border-gray-300"
                      } w-full border-[0.1vw]  rounded-md cursor-pointer `}
                    onClick={() => {
                      if (seattypefilter === "sleeper") {
                        setSeatTypeFilter("");
                      } else {
                        setSeatTypeFilter("sleeper");
                      }
                    }}
                  >
                    <p className="py-[2vw] flex items-center justify-center gap-[2vw]">
                      {/* <span>
                    <MdAirlineSeatIndividualSuite size={20} className="pl-1" />
                  </span> */}
                      <img src={sleeper} className="w-[7.5vw] h-[4.5vw]" alt="sleeper" />
                      <span className="font-semibold text-[5vw]">Sleeper</span>
                    </p>
                  </button>
                  <button
                    className={`${seattypefilter === "seater" ? "bg-[#1F487C]" : "bg-white"
                      } h-full ${seattypefilter === "seater"
                        ? "text-white border-[#1F487C]"
                        : "border-gray-300 "
                      } w-full border-[0.1vw] rounded-md cursor-pointer `}
                    onClick={() => {
                      if (seattypefilter === "seater") {
                        setSeatTypeFilter("");
                      } else {
                        setSeatTypeFilter("seater");
                      }
                    }}
                  >
                    <div className="py-[1vw] flex gap-[2vw] items-center justify-center">
                      {/* <span>
                    <MdAirlineSeatReclineExtra size={20} className="pl-1" />
                  </span> */}
                      <img src={seats} className="w-[6vw] h-[6vw]" alt="seats_type" />
                      <span className="font-semibold text-[5vw]">Seater</span>
                    </div>
                  </button>
                </div>

              </>
            ) : (
              ""
            )}
            <p className="my-[4vw] border-b-[0.01vw] border-gray-300"></p>
          </div>
          <div>
            <RangeSlide setPriceRange={setPriceRange} priceRange={priceRange} />
            <p className="my-[0.5vw] border-b-[0.01vw] border-gray-300"></p>
          </div>
          <div className="">
            <div className="grid grid-cols-4 justify-between items-center my-[4vw]">
              <div className="col-span-3">
                <h1 className="text-[5vw] font-bold px-[1vw]">
                  {busdata.from
                    ? `Pick up point - ${busdata.from.charAt(0).toUpperCase() +
                    busdata.from.slice(1)
                    }`
                    : "Pick up point"}
                </h1>
              </div>
              <div className="flex items-center">
                <h3
                  className="text-[4.5vw] float-end pr-[1vw] text-gray-500 cursor-pointer"
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
                    <IoIosArrowUp size={"6vw"} className="cursor-pointer" />
                  </button>
                ) : (
                  <IoIosArrowDown
                    size={"6vw"}
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
                <div className="px-[2vw] py-[2.5vw]">
                  {/* <input className="border-2 border-gray-300 h-8 rounded-md w-full mb-4" /> */}
                  <Input
                    prefix={<CiSearch size={"5.5vw"} />}
                    placeholder="Search"
                    className="filter-input mb-[3vw] text-[5vw] h-[10vw]"
                    onChange={(e) =>
                      setSearchValue({
                        ...searchvalue,
                        pickup: e.target.value,
                      })
                    }
                  />
                  {/* 81110 66300 */}
                  {/* {pickuppointlist.map((item, i) => (
                    <div className="flex items-center justify-between" key={i}>
                      <div className="flex items-center my-[3vw]">
                        <input
                          type="checkbox"
                          className="w-[5vw] h-[5vw] mr-[1.5vw]"
                          onChange={(e) => handlePickupCheckbox(e, item.place)}
                          checked={pickupchecked[item.place] || false}
                        />
                        <span className="text-[4.1vw]">{item.place}</span>
                      </div>
                      <div>
                        <span className="text-[4.1vw]">{`(${item.count / 8
                          })`}</span>
                      </div>
                    </div>
                  ))} */}
                  {pickUp_list?.boarding_points?.length > 0 ? pickUp_list.boarding_points.slice(0, 5).map((item, i) =>
                  (
                    <div className="flex items-center justify-between" key={i}>
                      <div className="flex items-center my-[3vw] gap-[2vw]">
                        <input
                          type="checkbox"
                          className=" filter-input w-[5vw] h-[5vw] mr-[1.5vw]"
                          onChange={(e) => handlePickupCheckbox(e, item.name)}
                          checked={pickupchecked[item.name] || false}
                        />
                        <span className="text-[4.1vw]">{item.name}</span>
                      </div>
                      <div>
                        <span className="text-[4.1vw]">{`(${item?.count})`}</span>
                      </div>
                    </div>
                  ))
                    :
                    ""}
                  <p
                    className="text-[#1F487C] font-bold text-[3.8vw] pt-[3.5vw] cursor-pointer"
                    //onClick={() => openModal("pickup")}
                    onClick={() => toggleDrawer("pickup")}
                  >{`SHOW ALL (${pickUp_list?.boarding_points?.length})`}</p>
                </div>
              </>
            ) : (
              ""
            )}
            <p className="my-[3vw] border-b-[0.01vw] border-gray-300"></p>
          </div>

          <div>
            <div className="">
              <div className="grid grid-cols-4 justify-between items-center my-[3vw]">
                <div className="col-span-3">
                  <h1 className="text-[5vw] text-black font-bold px-[1vw]">
                    {busdata.from
                      ? `Pick up time - ${busdata.from.charAt(0).toUpperCase() +
                      busdata.from.slice(1)
                      }`
                      : "Pick up time"}
                  </h1>
                </div>
                <div className="flex items-center">
                  <h3
                    className="text-[4.5vw] pr-[1vw] text-gray-500 cursor-pointer"
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
                      <IoIosArrowUp size={"6vw"} className="cursor-pointer" />
                    </button>
                  ) : (
                    <IoIosArrowDown
                      size={"6vw"}
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
                <div className="grid grid-cols-2 pt-[3vw] gap-[3vw] mx-[1vw] ">
                  <button
                    className={`${pickuptime === "6am-11am"
                      ? "bg-[#1F487C]"
                      : "bg-white"
                      } h-full ${pickuptime === "6am-11am" ? "text-white " : ""
                      } w-full  ${pickuptime === "6am-11am"
                        ? "border-[#1F487C] border-[0.1vw]"
                        : "border-gray-300 border-[0.1vw]"
                      } rounded-md cursor-pointer flex flex-col items-center justify-center py-[1.5vw]`}
                    // onClick={() =>
                    //   setTimeFitervalue({
                    //     ...timefiltervalue,
                    //     time_6am-11am: !timefiltervalue.time_6am-11am,
                    //   })
                    // }
                    onClick={() => {
                      if (pickuptime === "6am-11am") {
                        setPickUpTime("");
                      } else {
                        setPickUpTime("6am-11am");
                      }
                    }}
                  >
                    <span className="pb-[1vw]">
                      <LuSunrise className="" size={"4.5vw"} />
                    </span>
                    <span className="font-semibold text-center text-[4vw]">
                      6 AM to 11 AM
                    </span>
                  </button>
                  <button
                    className={`${pickuptime === "11am-6pm"
                      ? "bg-[#1F487C]"
                      : "bg-white"
                      } h-full ${pickuptime === "11am-6pm" ? "text-white " : ""
                      } w-full  ${pickuptime === "6am_11pm"
                        ? "border-[#1F487C] border-[0.1vw]"
                        : "border-gray-300 border-[0.1vw]"
                      } rounded-md cursor-pointer flex flex-col items-center justify-center py-[1.5vw]`}
                    // onClick={() =>
                    //   setTimeFitervalue({
                    //     ...timefiltervalue,
                    //     time_11am-6pm: !timefiltervalue.time_11am-6pm,
                    //   })
                    // }
                    onClick={() => {
                      if (pickuptime === "11am-6pm") {
                        setPickUpTime("");
                      } else {
                        setPickUpTime("11am-6pm");
                      }
                    }}
                  >
                    <span className="pb-[1vw]">
                      <IoSunnyOutline size={"4.5vw"} />
                    </span>
                    <span className="font-semibold text-center text-[4vw]">
                      11 AM to 6 PM
                    </span>
                  </button>
                </div>
                <div className="grid grid-cols-2 pt-[3vw] gap-[3vw] mx-[1vw] mb-[2.5vw]">
                  <button
                    className={`${pickuptime === "6pm-11pm"
                      ? "bg-[#1F487C]"
                      : "bg-white"
                      } h-full ${pickuptime === "6pm-11pm" ? "text-white" : ""
                      } w-full border-[0.1vw] ${pickuptime === "6pm-11pm"
                        ? "border-[#1F487C]"
                        : "border-gray-300"
                      } rounded-[0.6vw] cursor-pointer flex flex-col items-center justify-center py-[1.5vw]`}
                    // onClick={() =>
                    //   setTimeFitervalue({
                    //     ...timefiltervalue,
                    //     time_6pm-11pm: !timefiltervalue.time_6pm-11pm,
                    //   })
                    // }
                    onClick={() => {
                      if (pickuptime === "6pm-11pm") {
                        setPickUpTime("");
                      } else {
                        setPickUpTime("6pm-11pm");
                      }
                    }}
                  >
                    <span className="pb-[1vw]">
                      <LuSunset className="" size={"4.5vw"} />
                    </span>
                    <span className="font-semibold text-center text-[4vw]">
                      6 PM to 11 PM
                    </span>
                  </button>
                  <button
                    className={`${pickuptime === "11pm-6am"
                      ? "bg-[#1F487C]"
                      : "bg-white"
                      } h-full ${pickuptime === "11pm-6am" ? "text-white" : ""
                      } w-full border-[0.1vw] ${pickuptime === "11pm-6am"
                        ? "border-[#1F487C]"
                        : "border-gray-300"
                      } rounded-[0.6vw] cursor-pointer flex flex-col items-center justify-center py-[1.5vw]`}
                    // onClick={() =>
                    //   setTimeFitervalue({
                    //     ...timefiltervalue,
                    //     time_11pm-6am: !timefiltervalue.time_11pm-6am,
                    //   })
                    // }
                    onClick={() => {
                      if (pickuptime === "11pm-6am") {
                        setPickUpTime("");
                      } else {
                        setPickUpTime("11pm-6am");
                      }
                    }}
                  >
                    <span className="pb-1">
                      <PiMoonLight size={"4.5vw"} />
                    </span>
                    <span className="font-semibold text-center text-[4vw]">
                      11 PM to 6 AM
                    </span>
                  </button>
                </div>
              </>
            ) : (
              ""
            )}
            <p className="my-[4vw] border-b-[0.01vw] border-gray-300"></p>
          </div>
          <div className="">
            <div className="grid grid-cols-4 justify-between items-center my-[2vw]">
              <div className="col-span-3">
                <h1 className="text-[5vw] font-bold pl-[1vw] ">
                  Travel Operators
                </h1>
              </div>
              <div className="flex items-center">
                <h3
                  className="text-[4.5vw] pr-[1vw] float-end text-gray-500  cursor-pointer"
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
                    <IoIosArrowUp size={"6vw"} className="cursor-pointer" />
                  </button>
                ) : (
                  <IoIosArrowDown
                    size={"6vw"}
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
            {boolean.operators === true ? (
              <>
                <div className="px-[1vw] pb-[2vw] pt-[2vw]">
                  {/* <input className="border-2 border-gray-300 h-8 rounded-md w-full mb-4" /> */}
                  <Input
                    prefix={<CiSearch className="" size={"5.5vw"} />}
                    placeholder="Search"
                    className=" filter-input mb-[3vw] h-[10vw] text-[5vw]"
                    onChange={(e) =>
                      setSearchValue({
                        ...searchvalue,
                        operator: e.target.value,
                      })
                    }
                  />
                  {pickUp_list?.operators?.length > 0 ? pickUp_list.operators.slice(0, 5).map((item, i) => {
                    return (
                      <div
                        className="flex items-center justify-between"
                        key={i}
                      >
                        <div className="flex items-center my-[3vw]  gap-[2vw]">
                          <input
                            type="checkbox"
                            className=" filter-input w-[5vw] h-[5vw] mr-[1.5vw]"
                            onChange={(e) =>
                              handleoperatorCheckbox(e, item.operator)
                            }
                            checked={operatorchecked[item.operator] || false}
                          />
                          <span className="text-[4.1vw]">{capitalizeFirstLetter(item.operator)}</span>
                        </div>
                        <div>
                          {/* <span className="text-[0.8vw]">{`(${item.count})`}</span> */}
                        </div>
                      </div>
                    );
                  })
                    :
                    ""}

                  <p
                    className="text-[#1F487C] font-bold text-[3.8vw] pt-[3vw] cursor-pointer"
                    // onClick={() => openModal("operators")}
                    onClick={() => toggleDrawer("operators")}
                  >{`SHOW ALL (${pickUp_list?.operators?.length})`}</p>
                </div>
              </>
            ) : (
              ""
            )}
            <p className="my-[3vw] border-b-[0.01vw] border-gray-300"></p>
          </div>

          <div className="">
            <div className="grid grid-cols-4 justify-between items-center my-[3vw]">
              <div className="col-span-3">
                <h1 className="text-[5vw] font-bold pl-[1vw] ">
                  {busdata.from
                    ? `Drop point - ${busdata.to.charAt(0).toUpperCase() + busdata.to.slice(1)
                    }`
                    : "Drop point"}
                </h1>
              </div>
              <div className="flex items-center">
                <h3
                  className="text-[4.5vw] pr-[1vw] float-end text-gray-500 cursor-pointer"
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
                    <IoIosArrowUp size={"6vw"} className="cursor-pointer" />
                  </button>
                ) : (
                  <IoIosArrowDown
                    size={"6vw"}
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
            {boolean.drop === true ? (
              <>
                <div className="px-[1vw] pb-[2vw] pt-[3vw]">
                  {/* <input className="border-2 border-gray-300 h-8 rounded-md w-full mb-4" /> */}
                  <Input
                    prefix={<CiSearch size={"5.5vw"} />}
                    placeholder="Search"
                    className=" filter-input mb-[2vw] h-[10vw] text-[5vw]"
                    // onChange={(e) =>
                    //   setSearchValue({
                    //     ...searchvalue,
                    //     drop: e.target.value,
                    //   })}
                    onChange={(e) => {
                      setSearchValue({
                        ...searchvalue,
                        drop: e.target.value,
                      });
                    }}
                  />
                  {pickUp_list?.dropping_points?.length > 0 ? pickUp_list.dropping_points.slice(0, 5).map((item, i) => (
                    <div className="flex items-center justify-between" key={i}>
                      <div className="flex items-center my-[3vw] gap-[2vw]">
                        <input
                          type="checkbox"
                          className=" filter-input w-[5vw] h-[5vw] mr-[1vw]"
                          onChange={(e) => handledropCheckbox(e, item.name)}
                          checked={dropchecked[item.name] || false}
                        />
                        <span className=" text-[4.1vw]">{item.name}</span>
                      </div>
                      <div>
                        <span className="text-[4.1vw]">{`(${item.count})`}</span>
                      </div>
                    </div>
                  ))
                    : ""}
                  <p
                    className="text-[#1F487C] font-bold text-[3.8vw] pt-[3vw] cursor-pointer"
                    // onClick={() => openModal("drop")}
                    onClick={() => toggleDrawer("drop")}
                  >{`SHOW ALL (${pickUp_list?.dropping_points?.length})`}</p>
                </div>
              </>
            ) : (
              ""
            )}
            <p className="my-[3vw] border-b-[0.01vw] border-gray-300"></p>
          </div>
          <div>
            <div className="">
              <div className="grid grid-cols-4 justify-between items-center my-[3vw]">
                <div className="col-span-3">
                  <h1 className="text-[5vw] text-black font-bold px-[1vw]">
                    {busdata.from
                      ? `Drop time - ${busdata.to.charAt(0).toUpperCase() +
                      busdata.to.slice(1)
                      }`
                      : "Drop time"}
                  </h1>
                </div>
                <div className="flex items-center">
                  <h3
                    className="text-[4.5vw] pr-[1vw] text-gray-500 cursor-pointer"
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
                      <IoIosArrowUp size={"6vw"} className="cursor-pointer" />
                    </button>
                  ) : (
                    <IoIosArrowDown
                      size={"6vw"}
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
                <div className="grid grid-cols-2 pt-[3vw] gap-[3vw] mx-[1vw] ">
                  <button
                    className={`${droptime === "6am-11am"
                      ? "bg-[#1F487C]"
                      : "bg-white"
                      } h-full ${droptime === "6am-11am" ? "text-white " : ""
                      } w-full  ${droptime === "6am-11am"
                        ? "border-[#1F487C] border-[0.1vw]"
                        : "border-gray-300 border-[0.1vw]"
                      } rounded-[0.6vw] cursor-pointer flex flex-col items-center justify-center py-[2vw]`}
                    // onClick={() =>
                    //   setTimeFitervalue({
                    //     ...timefiltervalue,
                    //     time_6am-11am: !timefiltervalue.time_6am-11am,
                    //   })
                    // }
                    onClick={() => {
                      if (droptime === "6am-11am") {
                        setDropTime("");
                      } else {
                        setDropTime("6am-11am");
                      }
                    }}
                  >
                    <span className="pb-[1vw]">
                      <LuSunrise className="" size={"4.5vw"} />
                    </span>
                    <span className="font-semibold text-center text-[4.1vw]">
                      6 AM to 11 AM
                    </span>
                  </button>
                  <button
                    className={`${droptime === "11am-6pm"
                      ? "bg-[#1F487C]"
                      : "bg-white"
                      } h-full ${droptime === "11am-6pm" ? "text-white " : ""
                      } w-full  ${droptime === "6am_11pm"
                        ? "border-[#1F487C] border-[0.1vw]"
                        : "border-gray-300 border-[0.1vw]"
                      } rounded-[0.6vw] cursor-pointer flex flex-col items-center justify-center py-[2vw]`}
                    // onClick={() =>
                    //   setTimeFitervalue({
                    //     ...timefiltervalue,
                    //     time_11am-6pm: !timefiltervalue.time_11am-6pm,
                    //   })
                    // }
                    onClick={() => {
                      if (droptime === "11am-6pm") {
                        setDropTime("");
                      } else {
                        setDropTime("11am-6pm");
                      }
                    }}
                  >
                    <span className="pb-[1vw]">
                      <IoSunnyOutline size={"4.5vw"} />
                    </span>
                    <span className="font-semibold text-center text-[4.1vw]">
                      11 AM to 6 PM
                    </span>
                  </button>
                </div>
                <div className="grid grid-cols-2 pt-[2vw] gap-[3vw] mx-[1vw] mb-[3vw]">
                  <button
                    className={`${droptime === "6pm-11pm"
                      ? "bg-[#1F487C]"
                      : "bg-white"
                      } h-full ${droptime === "6pm-11pm" ? "text-white" : ""
                      } w-full border-[0.1vw] ${droptime === "6pm-11pm"
                        ? "border-[#1F487C]"
                        : "border-gray-300"
                      } rounded-[0.6vw] cursor-pointer flex flex-col items-center justify-center py-[2vw]`}
                    // onClick={() =>
                    //   setTimeFitervalue({
                    //     ...timefiltervalue,
                    //     time_6pm-11pm: !timefiltervalue.time_6pm-11pm,
                    //   })
                    // }
                    onClick={() => {
                      if (droptime === "6pm-11pm") {
                        setDropTime("");
                      } else {
                        setDropTime("6pm-11pm");
                      }
                    }}
                  >
                    <span className="pb-[1vw]">
                      <LuSunset className="" size={"4.5vw"} />
                    </span>
                    <span className="font-semibold text-center text-[4.1vw]">
                      6 PM to 11 PM
                    </span>
                  </button>
                  <button
                    className={`${droptime === "11pm-6am"
                      ? "bg-[#1F487C]"
                      : "bg-white"
                      } h-full ${droptime === "11pm-6am" ? "text-white" : ""
                      } w-full border-[0.1vw] ${droptime === "11pm-6am"
                        ? "border-[#1F487C]"
                        : "border-gray-300"
                      } rounded-[0.6vw] cursor-pointer flex flex-col items-center justify-center py-[2vw]`}
                    // onClick={() =>
                    //   setTimeFitervalue({
                    //     ...timefiltervalue,
                    //     time_11pm-6am: !timefiltervalue.time_11pm-6am,
                    //   })
                    // }
                    onClick={() => {
                      if (droptime === "11pm-6am") {
                        setDropTime("");
                      } else {
                        setDropTime("11pm-6am");
                      }
                    }}
                  >
                    <span className="pb-2">
                      <PiMoonLight size={"4.5vw"} />
                    </span>
                    <span className="font-semibold text-center text-[4.1vw]">
                      11 PM to 6 AM
                    </span>
                  </button>
                </div>
              </>
            ) : (
              ""
            )}
            <p className="my-[3vw] border-b-[0.01vw] border-gray-300"></p>
          </div>

          <div className="">
            <div className="grid grid-cols-4 justify-between items-center my-[3vw]">
              <div className="col-span-3">
                <h1 className="text-[5vw] font-bold px-[1vw]">Amenities</h1>
              </div>
              <div className="flex items-center">
                <h3
                  className="text-[4.5vw] pr-[1vw] float-end text-gray-500  cursor-pointer"
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
                    <IoIosArrowUp size={"6vw"} className="cursor-pointer" />
                  </button>
                ) : (
                  <IoIosArrowDown
                    size={"6vw"}
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
            <div>
              {boolean.amenities && (
                <div className="flex-col items-center justify-center gap-[1vw] py-[2vw] px-[1vw]">

                  {pickUp_list?.amenities?.length > 0 ? pickUp_list?.amenities.slice(0, 5).map((item, i) => (
                    <div className=" items-center justify-between" key={i}>
                      <div className="flex items-center my-[0.25vw] gap-[2vw]">
                        <input
                          type="checkbox"
                          className=" filter-input w-[5vw] h-[5vw] mr-[0.4vw]"
                          // onChange={() => handleAmenities(item.amenity)}
                          onChange={(e) => handleAmenityCheckbox(e, item.amenity)}
                          // checked={amenitiesvalue?.includes(item.amenity)}
                          checked={amenitiesvalue[item.amenity] || false}
                        />
                        <span className="text-[4.5vw]">{capitalizeFirstLetter(item.amenity)}</span>
                      </div>
                      <div>
                        <span className="text-[0.8vw]">{`(${item.count})`}</span>
                      </div>
                    </div>
                  ))
                    : ""
                  }
                </div>
              )}
              <p
                className="text-[#1F487C] font-bold text-[3.8vw] pt-[3vw] cursor-pointer pl-[1vw]"
                // onClick={() => openModal("amenities")}
                onClick={() => toggleDrawer("amenities")}
              >{`${`SHOW ALL (${pickUp_list?.amenities?.length}`})`}</p>{" "}
              <p className="mt-[2vw] border-b-[0.01vw] border-gray-300"></p>
            </div>
          </div>
        </div>

        <Drawer
          closable
          destroyOnClose
          title={<p>Filter</p>}
          placement="bottom"
          width={"100%"}
          height={"100%"}
          style={{
            backgroundColor: "#E5FFF1",
          }}
          open={isDrawerOpen}
          onClose={closeDrawer}
        >
          <h1 className="border-l-[1vw] pl-[2vw] pt-[2vw] text-[5vw] border-[#1F487C]">
            {isDrawerName === "pickup"
              ? "Pickup Point"
              : isDrawerName === "drop"
                ? "Drop Point"
                : isDrawerName === "amenities"
                  ? "Amenities"
                  : "Travel Operator"}
          </h1>
          <div className="p-[3vw] ">
            {" "}
            <Input
              prefix={<CiSearch size={"5vw"} />}
              placeholder="Search"
              className=" filter-input mb-[3vw] text-[4.5vw] h-[10vw] "
              onChange={(e) => setDrawerSearch(e.target.value)}
            />
            {/* <div className="flex flex-wrap">
                            {drawershowdata?.map(([ letters], index) => (
                                <div  className="w-full px-[3vw]">
                                    <h2 className="text-[#1F487C] my-[0.6vw] text-[1vw] font-semibold text-center">
                                        {row}
                                    </h2>
                                    {drawershowdata?.map((item, j) => (
                                        <div
                                            className="flex items-center justify-between gap-5"
                                            key={j}
                                        >
                                            <div className="flex items-center my-[2.5vw]">
                                                <input
                                                    type="checkbox"
                                                    className="w-[5.5vw] h-[5.5vw] mr-[2.2vw]"
                                                    onChange={(e) =>
                                                        isDrawerName === "pickup"
                                                            ? handlePickupCheckbox(e, item.place)
                                                            : isDrawerName === "drop"
                                                                ? handledropCheckbox(e, item.place)
                                                                : isDrawerName === "amenities"
                                                                    ? handleAmenities(item.place)
                                                                    : handleoperatorCheckbox(e, item.place)
                                                    }
                                                    checked={
                                                        isDrawerName === "pickup"
                                                            ? pickupchecked[item.place] || false
                                                            : isDrawerName === "drop"
                                                                ? dropchecked[item.place]
                                                                : operatorchecked[item.place]
                                                    }
                                                />
                                                <span className="text-[4.1vw]">{item.place}</span>
                                            </div>
                                            <div>
                                                <span className="text-[4.1vw]">{`(${item.count / 8
                                                    })`}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                          ))}
                        </div> */}
            <div className=" h-[70vh] overflow-x-hidden">
              {sortedList?.map((item, i) => (
                // <p key={item.place} className="whitespace-nowrap pr-[5vw] ">
                //   {item.place}
                // </p>
                <div
                  className="flex items-center justify-between pr-[6vw] gap-5 mb-[3vw]"
                  key={i}
                >
                  <div className="whitespace-nowrap items-center flex justify-center my-[2.5vw]">
                    <input
                      type="checkbox"
                      className=" w-[6vw] h-[6vw] mr-[3vw] pt-[2vw]"
                      onChange={(e) =>
                        isDrawerName === "pickup"
                          ? handlePickupCheckbox(e, item.name)
                          : isDrawerName === "drop"
                            ? handledropCheckbox(e, item.name)
                            : isDrawerName === "amenities"
                              ? handleAmenityCheckbox(e, item.amenity)
                              : handleoperatorCheckbox(e, item.operator)
                      }
                      checked={
                        isDrawerName === "pickup"
                          ? pickupchecked[item.name] || false
                          : isDrawerName === "drop"
                            ? dropchecked[item.name] || false
                            : isDrawerName === "amenities"
                              ? amenitiesvalue[item.amenity]
                              : operatorchecked[item.operator]
                      }
                    />
                    {/* <span className="text-[4.5vw]">
                      {item.place.charAt(0).toUpperCase() +
                        item.place.slice(1).toLowerCase()}
                      <span className="pl-[4vw]">
                        {" "}
                        {`(${isDrawerName != "operators"
                          ? item.count / 8
                          : item.count
                          })`}
                      </span>
                    </span> */}
                    <span className="pt-1 text-[4vw]">
                      {isDrawerName === "amenities"
                        ? item.amenity?.charAt(0).toUpperCase() +
                        item.amenity?.slice(1).toLowerCase()
                        : isDrawerName === "operators"
                          ? item.operator?.charAt(0).toUpperCase() +
                          item.operator?.slice(1).toLowerCase()
                          : item.name?.charAt(0).toUpperCase() +
                          item.name?.slice(1).toLowerCase()}
                      <span className="pl-[1vw]">
                        {isDrawerName !== "operators" && item.count}
                      </span>
                    </span>
                  </div>

                  {/* <div>
                                        <span className="text-[4.5vw] pl-[3.5vw]">{`(${item.count / 8
                                            })`}</span>
                                    </div> */}
                </div>
              ))}
            </div>
          </div>
        </Drawer>

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

export default SidebarMobile;
