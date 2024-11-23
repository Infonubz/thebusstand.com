import React, { useCallback, useEffect, useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { LuSunrise, LuSunset } from "react-icons/lu";
import { IoSunnyOutline } from "react-icons/io5";
import { PiMoonLight } from "react-icons/pi";
// import { Input } from "antd";
import { CiSearch } from "react-icons/ci";
import s_ac from "../../assets/s_ac.png";
import s_c_ac from "../../assets/s_c_ac.png";
import s_non_ac from "../../assets/s_non_ac.png";
import s_c_non_ac from "../../assets/s_c_non_ac.png";
import seats from "../../assets/seats.png";
import sleeper from "../../assets/seat_sleep.png";
import { useDispatch, useSelector } from "react-redux";
import { FILTER, GET_FILTER_DATA } from "../../Store/type";
import axios from "axios";
import { Drawer } from "antd";
import { Drop_Point_List, handleSearch } from "../../Api/Dashboard/Dashboard";
import RangeSlide from "./RangeSlide";
import { RiBusFill } from "react-icons/ri";
import { FaBus } from "react-icons/fa";
import bg from "../../assets/mobile pattern.png";

const SidebarMobile = ({
  // sidebarToggle,
  // share,
  operatorchecked,
  setOperatorChecked,
  pickuptime,
  setPickUpTime,
  setDropTime,
  droptime,
  setBusType,
  busType,
  dropchecked,
  setDropChecked,
  NormalBus,
  pickupchecked,
  setPickupChecked,
  setNoramlBus,
  priceRange,
  setPriceRange,
  setAcFilter,
  acfilter,
  value,
  setValue,
  seattypefilter,
  setSeatTypeFilter,
  amenitiesvalue,
  setAmenitiesValue,
  departure_local,
  arrival_local,
}) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isDrawerName, setIsDrawerName] = useState("");
  const [drawerSearch, setDrawerSearch] = useState("");
  const [handlesearchDrop, setHandleSearchDrop] = useState("");
  const [handlesearchValue, setHandleSearchValue] = useState("");
  const [handlesearchAmenities, setHandleSearchAmenities] = useState("");
  const [handlesearchPickup, setHandleSearchPickup] = useState("");
  const [handlesearchOperators, setHandleSearchOperators] = useState("");
  const [amenitieslist, setAmenitiesList] = useState([]);
  const [showingdata, setShowingData] = useState([]);
  const [drawershowdata, setDrawerShowData] = useState([]);
  const set_ac_local = localStorage.getItem("ac");
  const seatType_local = localStorage.getItem("seatType");
  const [pickUp_list, setPickUpList] = useState({});

  const [dropfulllist, setDropFullList] = useState([]);
  const [pickupfullist, setPickupFullList] = useState([]);
  const [opertorfulllist, setOperatorFullList] = useState([]);

  const selectdate_local = localStorage.getItem("selectdate");
  const arrange_data = useSelector((state) => state.rearrange);
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
  const [timefiltervalue, setTimeFitervalue] = useState({});
  const dispatch = useDispatch();
  const busdata = useSelector((state) => state.bus_data);
 // const sharing = useSelector((state) => state.share);
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
  const fulllist = useSelector((state) => state.get_data);


  const toggleDrawer = (name) => {
    setIsDrawerOpen(!isDrawerOpen);
    setIsDrawerName(name);
    sessionStorage.setItem("isMbleLuxury", false);
  };


  const closeDrawer = () => {
    setDrawerSearch("");
    setIsDrawerOpen(!isDrawerOpen);
  };

  const capitalizeFirstLetter = (string) => {
    return string
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };


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
    setValue([0, 3000]);
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
    });
    setDropTime("");
    setPickUpTime("");
    setAcFilter("");
    setSeatTypeFilter("");
    setBusType("");
    setNoramlBus("");
  };

  const amenitiesClear = () => {
    setAmenitiesValue({});
  };
  console.log(amenitiesvalue, "amenitiesvalue");

  const vehicleclear = () => {
    setAcFilter("");
    setSeatTypeFilter("");
    setBusType("");
    setNoramlBus("");
  };

  const handlePickupCheckbox = (event, itemName) => {
    const { checked } = event.target;
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
    setDropTime("");
  };
  const pickuptimeClear = () => {
    setPickUpTime("");
  };


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
      const payload = {
        // source: localStorage.getItem("depature"),
        De_source: "Chennai",
        Ar_source: "Coimbatore",
        AC: acfilter === "mbleAc" ? "TRUE" : "FALSE",
        NON_AC: acfilter === "mbleNon_Ac" ? "TRUE" : "FALSE",
        Seater: seattypefilter === "seater" ? "TRUE" : "FALSE",
        Sleeper: seattypefilter === "sleeper" ? "TRUE" : "FALSE",
       // Semi_sleeper: seattypefilter === "is_Luxury" ? "TRUE" : "FALSE",
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
      console.log(payload, "sidebarMobile_payload");
      console.log(operatorchecked, "dropcheck");
      const response = await axios.get(
        "http://192.168.90.43:8090/bus_Api_Filter",
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
  }, [
    acfilter,
    seattypefilter,
    pickupchecked,
    dropchecked,
    operatorchecked,
    amenitiesvalue,
    pickuptime,
    arrange_data,
    droptime,
    dispatch,
  ]);

  const sortedList = drawershowdata
  ?.slice()
  ?.sort((a, b) =>
    isDrawerName === "amenities"
      ? a?.amenity?.localeCompare(b?.amenity)
      : isDrawerName === "operators"
      ? a?.operator?.localeCompare(b?.operator)
      : a?.name?.localeCompare(b?.name)
  );


  const Search = async (e, values) => {
    console.log(values, "log11111searchhh");
    const response = await handleSearch(dispatch, e, values);
    const searchData = response?.data || [];
    if (handlesearchValue === "amenities") {
      setHandleSearchAmenities(searchData);
    } else if (handlesearchValue === "dropping") {
      setHandleSearchDrop(searchData);
    } else if (handlesearchValue === "boarding") {
      setHandleSearchPickup(searchData);
    } else if (handlesearchValue === "operators") {
      setHandleSearchOperators(searchData);
    }
    console.log("search Amenities", searchData);
  };

  const styles = {
    inputContainer: {
      display: "flex",
      alignItems: "center",
      width: "86vw",
      border: "1px solid #ccc",
      borderRadius: "1.5vw",
      padding: "2vw",
      backgroundColor: "white",
    },
    icon: {
      marginRight: "8px",
      color: "#1F487C",
      height: "6vw",
      width: "6vw",
    },
    input: {
      border: "none",
      outline: "none",
      flex: 1,
      width: "100%",
      fontSize: "1rem",
    },
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
  }, [
    isDrawerName,
    pickupfullist,
    dropfulllist,
    amenitieslist,
    opertorfulllist,
  ]);

  useEffect(() => {
    if (isDrawerName === "pickup") {
      const filteredData = showingdata?.filter((item) =>
        item?.name?.toLowerCase()?.includes(drawerSearch?.toLowerCase())
      );
      console.log(filteredData, "filter_dataa");

      setDrawerShowData(filteredData);
    } else if (isDrawerName === "drop") {
      const filteredData = showingdata?.filter((item) =>
        item.name?.toLowerCase()?.includes(drawerSearch?.toLowerCase())
      );
      setDrawerShowData(filteredData);
    } else if (isDrawerName === "amenities") {
      const filteredData = showingdata?.filter((item) =>
        item?.amenity?.toLowerCase()?.includes(drawerSearch?.toLowerCase())
      );
      setDrawerShowData(filteredData);
    } else {
      const filteredData = showingdata?.filter((item) =>
        item?.operator?.toLowerCase()?.includes(drawerSearch?.toLowerCase())
      );
      setDrawerShowData(filteredData);
    }
  }, [isDrawerName, drawerSearch, showingdata]);

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


  useEffect(() => {
    if (localStorage.getItem("ac") === "true") {
      setAcFilter("mbleAc");
      console.log(localStorage.getItem("ac"), "joooooooo");
    }
    if (localStorage.getItem("seatType")) {
      setSeatTypeFilter(localStorage.getItem("seatType"));
    }
  }, [set_ac_local, seatType_local, setAcFilter, setSeatTypeFilter]);


  useEffect(() => {
    handleDropPoint();
  }, [
    handleDropPoint,
    departure_local,
    arrival_local,
    selectdate_local,
    dispatch,
  ]);

  useEffect(() => {
    handlefilter();
  }, [searchvalue, departure_local, arrival_local, handlefilter]);

  useEffect(() => {
    setAmenitiesList(pickUp_list?.amenities);
    console.log(pickUp_list, "settamininties");

    setDropFullList(pickUp_list?.dropping_points);

    const Pickuppoints = fulllist.map((item) => {
      return item.Pickup_points.split(",");
    });
    const PickuppointsArray = [].concat(...Pickuppoints);
    const PickuppointsCount = PickuppointsArray.reduce((acc, val) => {
      acc[val] = (acc[val] || 0) + 1;
      return acc;
    }, {});
    console.log(PickuppointsCount, "PickuppointsArray");

    setPickupFullList(pickUp_list?.boarding_points);
    console.log(pickUp_list.boarding_points, "mobile_pickuplist");

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
    setOperatorFullList(traveldata);
    setOperatorFullList(pickUp_list?.operators);
  }, [searchvalue, fulllist, pickUp_list]);



  return (
    <>
      <div
        className={`w-full bg-[#E5FFF1] h-full overflow-x-none px-[6vw] z-1 `}
        style={{
          // zIndex: modalIsOpen || sharing === true ? 1 : 0,
          // fontFamily:"Lato"
          backgroundImage: `url(${bg})`,
        }}
      >
        <div className="h-full pb-[8vw] overflow-x-none w-full">
          <div>
            <div className="py-[1vw] pb-[1vw]">
              <div className="grid grid-cols-2 justify-between items-center">
                <div className="">
                  <h1
                    className="text-[4.7vw] text-black font-extrabold px-[1vw] font-[Lato]"
                    style={{
                      fontFamily: "Lato",
                    }}
                  >
                    All Filters
                  </h1>
                </div>
                <div>
                  <h3
                    className="text-[4.4vw] float-end px-[1vw] cursor-pointer underline underline-offset-[1vw]"
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
                <h1 className="text-[4.5vw] font-bold px-[1vw]">
                  {" "}
                  Vehicle Type
                </h1>
              </div>
              <div className="flex items-center">
                <h3
                  className="text-[3.5vw] pr-[1vw] float-end text-gray-500 cursor-pointer"
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
                    <IoIosArrowUp size={"5vw"} className="cursor-pointer" />
                  </button>
                ) : (
                  <IoIosArrowDown
                    size={"5vw"}
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
              <div className="grid gap-y-[1vw]">
                <div className="grid grid-cols-2 pt-[2vw] gap-[3.5vw] mx-[2vw]">
                  <button
                    className={`${
                      NormalBus
                        ? "text-white bg-[#1F487C] border-[#1F487C]"
                        : "border-gray-300 bg-white"
                    } w-full border-[0.1vw] rounded-md cursor-pointer `}
                    onClick={() => {
                      if (NormalBus) {
                        setNoramlBus(false);
                        sessionStorage.setItem("isMbleNoramlBus", false);
                      } else {
                        setNoramlBus(true);
                        sessionStorage.setItem("isMbleNoramlBus", true);
                      }
                    }}
                  >
                    <div className="flex justify-center items-center">
                      <div className="py-[0.5vw] flex  items-center justify-center gap-[1vw]">
                        <span>
                          {" "}
                          <RiBusFill className="w-[4.5vw] h-[5vw]" />
                        </span>
                        <span className="font-semibold text-[4vw]">Normal</span>
                      </div>
                    </div>
                  </button>
                  <button
                    className={`${
                      busType
                        ? "bg-custom-gradient-luxury bg-image-url"
                        : "bg-white"
                    } h-full ${
                      busType
                        ? "text-black border-custom-gradient-luxury bg-image-url"
                        : "border-gray-300 "
                    } w-full border-[0.1vw] rounded-[1.2vw] cursor-pointer `}
                    onClick={() => {
                      if (busType) {
                        setBusType(false);
                        sessionStorage.setItem("isMbleLuxury", false);
                      } else {
                        setBusType(true);
                        sessionStorage.setItem("isMbleLuxury", true);
                      }
                    }}
                  >
                    <div className="flex justify-center items-center">
                      <div className="py-[2vw] flex gap-[1vw] items-center justify-center">
                        <FaBus className="w-[4vw] h-[4vw]" />
                        <span className="font-semibold text-[4vw]">Luxury</span>
                      </div>
                    </div>
                  </button>
                </div>

                <div className="grid grid-cols-2 pt-[2vw] gap-[3.5vw] mx-[2vw]">
                  <button
                    className={`${
                      acfilter === "mbleAc" ? "bg-[#1F487C]" : "bg-white"
                    }  ${
                      acfilter === "mbleAc"
                        ? "text-white border-[#1F487C]"
                        : "border-gray-300"
                    } w-full border-[0.1vw] rounded-md cursor-pointer `}
                    onClick={() => {
                      if (acfilter === "mbleAc") {
                        setAcFilter("");
                      } else {
                        setAcFilter("mbleAc");
                      }
                    }}
                  >
                    <div className="py-[0.5vw] flex items-center justify-center gap-[2vw]">
                      {/* <span>
                    <TbAirConditioning size={15} className="mx-1 " />
                  </span> */}
                      {acfilter === "mbleAc" ? (
                        <img
                          src={s_c_ac}
                          className="w-[4.5vw] h-[4.5vw]"
                          alt="s_c_ac"
                        />
                      ) : (
                        <img
                          src={s_ac}
                          className="w-[4.5vw] h-[4.5vw]"
                          alt="s_ac"
                        />
                      )}
                      <span
                        className={`${filtervalue.ac} font-semibold text-[4vw]`}
                      >
                        AC
                      </span>
                    </div>
                  </button>
                  <button
                    className={`${
                      acfilter === "mbleNon_Ac" ? "bg-[#1F487C]" : "bg-white"
                    } ${
                      acfilter === "mbleNon_Ac"
                        ? "text-white border-[#1F487C]"
                        : "border-gray-300"
                    } w-full border-[0.1vw]  rounded-md cursor-pointer `}
                    onClick={() => {
                      if (acfilter === "mbleNon_Ac") {
                        setAcFilter("");
                      } else {
                        setAcFilter("mbleNon_Ac");
                      }
                    }}
                  >
                    <div className="py-[2vw] gap-[2vw] flex items-center justify-center">
                      {/* <span>
                    <TbAirConditioningDisabled size={20} className="mx-1" />
                  </span> */}
                      {acfilter === "mbleNon_Ac" ? (
                        <img
                          src={s_c_non_ac}
                          className="w-[4.5vw] h-[4.5vw]"
                          alt="s_c_non_ac"
                        />
                      ) : (
                        <img
                          src={s_non_ac}
                          className="w-[4.5vw] h-[4.5vw]"
                          alt="s_non_ac"
                        />
                      )}
                      <span className="font-semibold  text-[4vw]">Non AC</span>
                    </div>
                  </button>
                </div>

                <div className="grid grid-cols-2 pt-[2vw] gap-[3.5vw] mx-[2vw]">
                  <button
                    className={`${
                      seattypefilter === "sleeper" ? "bg-[#1F487C]" : "bg-white"
                    } h-full ${
                      seattypefilter === "sleeper"
                        ? "text-white border-[#1F487C]"
                        : "border-gray-300"
                    } w-full border-[0.1vw] rounded-md cursor-pointer `}
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
                      <img
                        src={sleeper}
                        className="w-[6.5vw] h-[4vw]"
                        alt="sleeper"
                      />
                      <span className="font-semibold text-[4vw]">Sleeper</span>
                    </p>
                  </button>
                  <button
                    className={`${
                      seattypefilter === "seater" ? "bg-[#1F487C]" : "bg-white"
                    } h-full ${
                      seattypefilter === "seater"
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
                      <img
                        src={seats}
                        className="w-[5vw] h-[5vw]"
                        alt="seats_type"
                      />
                      <span className="font-semibold text-[4vw]">Seater</span>
                    </div>
                  </button>
                </div>
              </div>
            ) : (
              ""
            )}
            <p className="my-[4vw] border-b-[0.01vw] border-gray-300"></p>
          </div>
          <div>
            <RangeSlide
              boolean={boolean}
              setBoolean={setBoolean}
              setPriceRange={setPriceRange}
              priceRange={priceRange}
              value={value}
              setValue={setValue}
            />
            <p className="my-[0.5vw] border-b-[0.01vw] border-gray-300"></p>
          </div>
          <div className="">
            <div className="grid grid-cols-4 justify-between items-center my-[4vw]">
              <div className="col-span-3">
                <h1 className="text-[4.5vw] font-bold px-[1vw]">
                  {busdata.from
                    ? `Pickup point - ${
                        busdata.from.charAt(0).toUpperCase() +
                        busdata.from.slice(1)
                      }`
                    : "Pickup point"}
                </h1>
              </div>
              <div className="flex items-center">
                <h3
                  className="text-[3.5vw] float-end pr-[1vw] text-gray-500 cursor-pointer"
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
                    <IoIosArrowUp size={"5vw"} className="cursor-pointer" />
                  </button>
                ) : (
                  <IoIosArrowDown
                    size={"5vw"}
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
                  <div className="relative mb-[2vw]">
                    <div style={styles.inputContainer}>
                      <CiSearch style={styles.icon} />
                      <input
                        type="text"
                        placeholder="Search"
                        className="placeholder:text-[4vw] placeholder:text-[#1F487C]"
                        style={styles.input}
                        onChange={(e) => {
                          setHandleSearchValue("boarding");
                          Search(e, "boarding");
                        }}
                      />
                    </div>
                  </div>
                  {handlesearchPickup?.boarding_point?.length > 0
                    ? handlesearchPickup.boarding_point
                        ?.slice(0, 5)
                        .map((item, i) => (
                          <div
                            className="flex items-center justify-between"
                            key={i}
                          >
                            <div className="flex items-center my-[3vw] gap-[2vw]">
                              <input
                                type="checkbox"
                                className=" filter-input w-[5vw] h-[5vw] mr-[1.5vw]"
                                onChange={(e) =>
                                  handlePickupCheckbox(e, item.name)
                                }
                                checked={pickupchecked[item.name] || false}
                              />
                              <span className="text-[4.1vw]">{item.name}</span>
                            </div>
                            <div>
                              <span className="text-[4.1vw]">{`(${item?.count})`}</span>
                            </div>
                          </div>
                        ))
                    : ""}
                  {handlesearchPickup?.boarding_point?.length <= 0 ? (
                    <div className="flex items-center justify-between mx-[.5vw]">
                      <div className="flex items-center my-[0.25vw]">
                        <span className="text-[4vw]">
                          {/* {handlesearchPickup?.message} */}
                          No matching Pickup points found.
                        </span>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                  {!handlesearchPickup?.message &&
                  !handlesearchPickup?.boarding_point &&
                  pickUp_list?.boarding_points?.length > 0
                    ? pickUp_list.boarding_points
                        ?.slice(0, 5)
                        .map((item, i) => (
                          <div
                            className="flex items-center justify-between"
                            key={i}
                          >
                            <div className="flex items-center my-[3vw] gap-[2vw]">
                              <input
                                type="checkbox"
                                className=" filter-input w-[5vw] h-[5vw] mr-[1.5vw]"
                                onChange={(e) =>
                                  handlePickupCheckbox(e, item.name)
                                }
                                checked={pickupchecked[item.name] || false}
                              />
                              <span className="text-[4.1vw]">{item.name}</span>
                            </div>
                            <div>
                              <span className="text-[4.1vw]">{`(${item?.count})`}</span>
                            </div>
                          </div>
                        ))
                    : ""}
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
                  <h1 className="text-[4.5vw] text-black font-bold px-[1vw]">
                    {busdata.from
                      ? `Pickup time - ${
                          busdata.from.charAt(0).toUpperCase() +
                          busdata.from.slice(1)
                        }`
                      : "Pickup time"}
                  </h1>
                </div>
                <div className="flex items-center">
                  <h3
                    className="text-[3.5vw] pr-[1vw] text-gray-500 cursor-pointer"
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
                      <IoIosArrowUp size={"5vw"} className="cursor-pointer" />
                    </button>
                  ) : (
                    <IoIosArrowDown
                      size={"5vw"}
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
                    className={`${
                      pickuptime === "6am-11am" ? "bg-[#1F487C]" : "bg-white"
                    } h-full ${
                      pickuptime === "6am-11am" ? "text-white " : ""
                    } w-full  ${
                      pickuptime === "6am-11am"
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
                    className={`${
                      pickuptime === "11am-6pm" ? "bg-[#1F487C]" : "bg-white"
                    } h-full ${
                      pickuptime === "11am-6pm" ? "text-white " : ""
                    } w-full  ${
                      pickuptime === "6am_11pm"
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
                    className={`${
                      pickuptime === "6pm-11pm" ? "bg-[#1F487C]" : "bg-white"
                    } h-full ${
                      pickuptime === "6pm-11pm" ? "text-white" : ""
                    } w-full border-[0.1vw] ${
                      pickuptime === "6pm-11pm"
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
                    className={`${
                      pickuptime === "11pm-6am" ? "bg-[#1F487C]" : "bg-white"
                    } h-full ${
                      pickuptime === "11pm-6am" ? "text-white" : ""
                    } w-full border-[0.1vw] ${
                      pickuptime === "11pm-6am"
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
                <h1 className="text-[4.5vw] font-bold pl-[1vw] ">
                  Travel Operators
                </h1>
              </div>
              <div className="flex items-center">
                <h3
                  className="text-[3.5vw] pr-[1vw] float-end text-gray-500  cursor-pointer"
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
                    <IoIosArrowUp size={"5vw"} className="cursor-pointer" />
                  </button>
                ) : (
                  <IoIosArrowDown
                    size={"5vw"}
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
                  {/* <Input
                    prefix={<CiSearch className="" size={"5.5vw"} />}
                    placeholder="Search"
                    className=" filter-input mb-[3vw] h-[10vw] text-[5vw]"
                    onChange={(e) => {
                      setHandleSearchValue("operators");
                      Search(e, "operators");
                    }}
                  /> */}
                  <div className="relative mb-[2vw]">
                    <div style={styles.inputContainer}>
                      <CiSearch style={styles.icon} />
                      <input
                        type="text"
                        placeholder="Search"
                        className="placeholder:text-[4vw] placeholder:text-[#1F487C]"
                        style={styles.input}
                        onChange={(e) => {
                          setHandleSearchValue("operators");
                          Search(e, "operators");
                        }}
                      />
                    </div>
                  </div>
                  {handlesearchOperators?.operators?.length > 0
                    ? handlesearchOperators.operators
                        ?.slice(0, 5)
                        .map((item, i) => {
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
                                  checked={
                                    operatorchecked[item.operator] || false
                                  }
                                />
                                <span className="text-[4.1vw]">
                                  {capitalizeFirstLetter(item.operator)}
                                </span>
                              </div>
                              <div>
                                {/* <span className="text-[0.8vw]">{`(${item.count})`}</span> */}
                              </div>
                            </div>
                          );
                        })
                    : ""}
                  {handlesearchOperators?.operators?.length <= 0 ? (
                    <div className="flex items-center justify-between mx-[.5vw]">
                      <div className="flex items-center my-[0.25vw]">
                        <span className="text-[4vw]">
                          {/* {handlesearchDrop?.message} */}
                          No matching operators found.
                        </span>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                  {!handlesearchOperators?.message &&
                    !handlesearchOperators?.operators &&
                    pickUp_list?.operators?.length > 0 &&
                    pickUp_list.operators?.slice(0, 5).map((item, i) => {
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
                            <span className="text-[4.1vw]">
                              {capitalizeFirstLetter(item.operator)}
                            </span>
                          </div>
                          <div>
                            {/* <span className="text-[0.8vw]">{`(${item.count})`}</span> */}
                          </div>
                        </div>
                      );
                    })}
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
                <h1 className="text-[4.5vw] font-bold pl-[1vw] ">
                  {busdata.from
                    ? `Drop point - ${
                        busdata.to.charAt(0).toUpperCase() + busdata.to.slice(1)
                      }`
                    : "Drop point"}
                </h1>
              </div>
              <div className="flex items-center">
                <h3
                  className="text-[3.5vw] pr-[1vw] float-end text-gray-500 cursor-pointer"
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
                    <IoIosArrowUp size={"5vw"} className="cursor-pointer" />
                  </button>
                ) : (
                  <IoIosArrowDown
                    size={"5vw"}
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
                  <div className="relative mb-[2vw]">
                    <div style={styles.inputContainer}>
                      <CiSearch style={styles.icon} />
                      <input
                        type="text"
                        placeholder="Search"
                        className="placeholder:text-[4vw] placeholder:text-[#1F487C]"
                        style={styles.input}
                        onChange={(e) => {
                          setHandleSearchValue("dropping");
                          Search(e, "dropping");
                        }}
                      />
                    </div>
                  </div>
                  <div>
                    {handlesearchDrop?.dropping_point?.length > 0
                      ? handlesearchDrop?.dropping_point
                          ?.slice(0, 5)
                          .map((item, i) => (
                            <div
                              className="flex items-center justify-between"
                              key={i}
                            >
                              <div className="flex items-center my-[3vw] gap-[2vw]">
                                <input
                                  type="checkbox"
                                  className=" filter-input w-[5vw] h-[5vw] mr-[1vw]"
                                  onChange={(e) =>
                                    handledropCheckbox(e, item.name)
                                  }
                                  checked={dropchecked[item.name] || false}
                                />
                                <span className=" text-[4.1vw]">
                                  {item.name}
                                </span>
                              </div>
                              <div>
                                <span className="text-[4.1vw]">{`(${item.count})`}</span>
                              </div>
                            </div>
                          ))
                      : ""}
                    {handlesearchDrop?.dropping_point?.length <= 0 ? (
                      <div className="flex items-center justify-between mx-[.5vw]">
                        <div className="flex items-center my-[0.25vw]">
                          <span className="text-[4vw]">
                            {/* {handlesearchDrop?.message} */}
                            No matching Drop points found.
                          </span>
                        </div>
                      </div>
                    ) : (
                      ""
                    )}
                    {!handlesearchDrop?.message &&
                      !handlesearchDrop?.dropping_point &&
                      pickUp_list?.dropping_points?.length > 0 &&
                      pickUp_list.dropping_points
                        ?.slice(0, 5)
                        .map((item, i) => (
                          <div
                            className="flex items-center justify-between"
                            key={i}
                          >
                            <div className="flex items-center my-[3vw] gap-[2vw]">
                              <input
                                type="checkbox"
                                className=" filter-input w-[5vw] h-[5vw] mr-[1vw]"
                                onChange={(e) =>
                                  handledropCheckbox(e, item.name)
                                }
                                checked={dropchecked[item.name] || false}
                              />
                              <span className=" text-[4.1vw]">{item.name}</span>
                            </div>
                            <div>
                              <span className="text-[4.1vw]">{`(${item.count})`}</span>
                            </div>
                          </div>
                        ))}
                    <p
                      className="text-[#1F487C] font-bold text-[3.8vw] pt-[3vw] cursor-pointer"
                      // onClick={() => openModal("drop")}
                      onClick={() => toggleDrawer("drop")}
                    >{`SHOW ALL (${pickUp_list?.dropping_points?.length})`}</p>
                  </div>
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
                  <h1 className="text-[4.5vw] text-black font-bold px-[1vw]">
                    {busdata.from
                      ? `Drop time - ${
                          busdata.to.charAt(0).toUpperCase() +
                          busdata.to.slice(1)
                        }`
                      : "Drop time"}
                  </h1>
                </div>
                <div className="flex items-center">
                  <h3
                    className="text-[3.5vw] pr-[1vw] text-gray-500 cursor-pointer"
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
                      <IoIosArrowUp size={"5vw"} className="cursor-pointer" />
                    </button>
                  ) : (
                    <IoIosArrowDown
                      size={"5vw"}
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
                    className={`${
                      droptime === "6am-11am" ? "bg-[#1F487C]" : "bg-white"
                    } h-full ${
                      droptime === "6am-11am" ? "text-white " : ""
                    } w-full  ${
                      droptime === "6am-11am"
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
                    className={`${
                      droptime === "11am-6pm" ? "bg-[#1F487C]" : "bg-white"
                    } h-full ${
                      droptime === "11am-6pm" ? "text-white " : ""
                    } w-full  ${
                      droptime === "6am_11pm"
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
                    className={`${
                      droptime === "6pm-11pm" ? "bg-[#1F487C]" : "bg-white"
                    } h-full ${
                      droptime === "6pm-11pm" ? "text-white" : ""
                    } w-full border-[0.1vw] ${
                      droptime === "6pm-11pm"
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
                    className={`${
                      droptime === "11pm-6am" ? "bg-[#1F487C]" : "bg-white"
                    } h-full ${
                      droptime === "11pm-6am" ? "text-white" : ""
                    } w-full border-[0.1vw] ${
                      droptime === "11pm-6am"
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
                <h1 className="text-[4.5vw] font-bold px-[1vw]">Amenities</h1>
              </div>
              <div className="flex items-center">
                <h3
                  className="text-[3.5vw] pr-[1vw] float-end text-gray-500  cursor-pointer"
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
                    <IoIosArrowUp size={"5vw"} className="cursor-pointer" />
                  </button>
                ) : (
                  <IoIosArrowDown
                    size={"5vw"}
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
                <div className="px-[1vw] pb-[2vw] pt-[3vw]">
                  {/* <input className="border-2 border-gray-300 h-8 rounded-md w-full mb-4" /> */}
                  <div className="relative mb-[2vw]">
                    <div style={styles.inputContainer}>
                      <CiSearch style={styles.icon} />
                      <input
                        type="text"
                        placeholder="Search"
                        className="placeholder:text-[4vw] placeholder:text-[#1F487C]"
                        style={styles.input}
                        onChange={(e) => {
                          setHandleSearchValue("amenities");
                          Search(e, "amenities");
                        }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex-col items-center justify-center gap-[1vw] py-[2vw] px-[1vw]">
                      {handlesearchAmenities?.amenities?.length > 0
                        ? handlesearchAmenities?.amenities
                            .slice(0, 5)
                            .map((item, i) => (
                              <div
                                className=" items-center justify-between"
                                key={i}
                              >
                                <div className="flex items-center my-[0.25vw] gap-[2vw]">
                                  <input
                                    type="checkbox"
                                    className=" filter-input w-[5vw] h-[5vw] mr-[0.4vw]"
                                    // onChange={() => handleAmenities(item.amenity)}
                                    onChange={(e) =>
                                      handleAmenityCheckbox(e, item.amenity)
                                    }
                                    // checked={amenitiesvalue?.includes(item.amenity)}
                                    checked={
                                      amenitiesvalue[item.amenity] || false
                                    }
                                  />
                                  <span className="text-[4.5vw]">
                                    {capitalizeFirstLetter(item.amenity)}
                                  </span>
                                </div>
                                <div>
                                  <span className="text-[0.8vw]">{`(${item.count})`}</span>
                                </div>
                              </div>
                            ))
                        : ""}
                      {handlesearchAmenities?.amenities?.length <= 0 ? (
                        <div className="flex items-center justify-between mx-[.5vw]">
                          <div className="flex items-center my-[0.25vw]">
                            <span className="text-[4vw]">
                              No matching amenities found.
                            </span>
                          </div>
                        </div>
                      ) : (
                        ""
                      )}
                      {!handlesearchAmenities?.message &&
                        !handlesearchAmenities?.amenities &&
                        pickUp_list?.amenities?.length > 0 &&
                        pickUp_list.amenities?.slice(0, 5).map((item, i) => (
                          <div
                            className=" items-center justify-between"
                            key={i}
                          >
                            <div className="flex items-center my-[0.25vw] gap-[2vw]">
                              <input
                                type="checkbox"
                                className=" filter-input w-[5vw] h-[5vw] mr-[0.4vw]"
                                // onChange={() => handleAmenities(item.amenity)}
                                onChange={(e) =>
                                  handleAmenityCheckbox(e, item.amenity)
                                }
                                // checked={amenitiesvalue?.includes(item.amenity)}
                                checked={amenitiesvalue[item.amenity] || false}
                              />
                              <span className="text-[4.5vw]">
                                {capitalizeFirstLetter(item.amenity)}
                              </span>
                            </div>
                            <div>
                              <span className="text-[0.8vw]">{`(${item.count})`}</span>
                            </div>
                          </div>
                        ))}
                    </div>
                    <p
                      className="text-[#1F487C] font-bold text-[3.8vw] pt-[3vw] cursor-pointer pl-[1vw]"
                      // onClick={() => openModal("amenities")}
                      onClick={() => toggleDrawer("amenities")}
                    >{`${`SHOW ALL (${pickUp_list?.amenities?.length}`})`}</p>{" "}
                    <p className="mt-[2vw] border-b-[0.01vw] border-gray-300"></p>
                  </div>
                </div>
              </>
            )}
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
            <div className="relative mb-[2vw]">
              <div style={styles.inputContainer}>
                <CiSearch style={styles.icon} />
                <input
                  type="text"
                  placeholder="Search"
                  className="placeholder:text-[4vw] placeholder:text-[#1F487C]"
                  style={styles.input}
                  onChange={(e) => setDrawerSearch(e.target.value)}
                />
              </div>
            </div>
            <div className=" h-[70vh] overflow-x-hidden">
              {sortedList?.map((item, i) => (
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
                </div>
              ))}
            </div>
          </div>
        </Drawer>
      </div>
    </>
  );
};

export default SidebarMobile;
