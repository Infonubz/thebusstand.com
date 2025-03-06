import { ErrorMessage, Field, Formik } from "formik";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import ColorCodes from "../../Common/Common-Functions/ColorCodes";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { Drawer } from "antd";
// import stand from "../../assets/stand.png";
import { FaArrowLeft, FaMapPin } from "react-icons/fa6";
import dayjs from "dayjs";
import { min } from "moment";
import HomeDateInput from "../../Common/DatePicker/Components/HomeDateInput";
import {
  Abhibus_GetBusList,
  Abhibus_GetStations,
} from "../../../Api-Abhibus/Home/HomePage";
import "../../../App.css";
import SVG_List from "../../Common/SVG/SVG";
import { LuArrowDownUp } from "react-icons/lu";
import { FaMapMarkerAlt } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { LiaCitySolid } from "react-icons/lia";
import { toast } from "react-toastify";
import { GetStations } from "../../../Api-TBS/Home/Home";

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
  // from: Yup.string().required("Field is Required"),
  // to: Yup.string().required("Field is Required"),
});
export default function SearchBusMobile() {
  useEffect(() => {
    const [navigationEntry] = performance.getEntriesByType("navigation");

    if (navigationEntry) {
      if (navigationEntry.type === "reload") {
        localStorage.removeItem("departure");
        localStorage.removeItem("arrival");
        localStorage.removeItem("departureID");
        localStorage.removeItem("arrivalID");
        localStorage.removeItem("selectedDate");
      } else if (navigationEntry.type === "navigate") {
      }
    }
  }, []);

  const SVG = SVG_List();
  const getselecteddate = useSelector((state) => state.selected_date);

  const Get_Stations = useSelector((state) => state.get_stations);

  const [isInputFromFocused, setIsInputFromFocused] = useState(false);
  const [isInputToFocused, setIsInputToFocused] = useState(false);
  const colors = ColorCodes();
  const navigation = useNavigate();
  const dispatch = useDispatch();
  const [seatFilter, SetSeatFilter] = useState("");
  const [luxury, setLuxury] = useState(false);
  const [departurelist, setDepatureList] = useState([]);
  const [selectinput, setSelectInput] = useState("");

  const [busdatas, setBusDatas] = useState({
    ac: "false",
    from: "",
    to: "",
    from_sourceID: null,
    to_sourceID: null,
    date: "",
    seater: "",
    sleeper: "",
    semi_sleeper: "",
    luxury_data: false,
    from_state: '',
    to_state: ''
  });
  const [error, setError] = useState();

  const handlecheckbox = (e) => {
    const { checked } = e.target;
    setBusDatas({
      ...busdatas,
      ac: checked,
    });
    checked
      ? sessionStorage.setItem("home_ac", checked)
      : sessionStorage.setItem("home_ac", null);
  };

  const handleflip = () => {
    // Swap the 'from' and 'to' values in busdatas
    const newBusDatas = {
      ...busdatas,
      from: busdatas.to,
      to: busdatas.from,
      from_sourceID: busdatas.to_sourceID,
      to_sourceID: busdatas.from_sourceID,
      to_state: busdatas?.from_state,
      from_state: busdatas?.to_state
    };

    // Update the busdatas state
    setBusDatas(newBusDatas);

    // // Update Formik's values
    // setFieldValue("from", newBusDatas.from);
    // setFieldValue("to", newBusDatas.to);
  };

  const [BusFilters, SetBusFilters] = useState({
    bustype: null,
    ac_non_ac: null,
    seat_type: null,
    price_range: null,
  });

  const handlebussearch = async () => {
    try {
      if (
        !busdatas?.from ||
        !busdatas?.from_sourceID ||
        !busdatas?.to ||
        !busdatas?.to_sourceID
      ) {
        toast.error("Please Enter Your Origin and Destination City");
      } else {
        const data = await Abhibus_GetBusList(
          dispatch,
          busdatas,
          getselecteddate,
          luxury
        );
        sessionStorage.setItem('loader', true)
        // sessionStorage.removeItem('loader')
        navigation(
          `/buslist/${busdatas.from}/${busdatas.from_sourceID}/${busdatas.to}/${busdatas.to_sourceID
          }/${dayjs(getselecteddate).format("YYYY-MM-DD")}`, { state: busdatas }
        );
      }
    } catch (error) {
      console.error(error.message || "Error fetching additional user data");
    }
    sessionStorage.setItem("loading", true);
    localStorage.setItem("departure", busdatas.from);
    localStorage.setItem("arrival", busdatas.to);
    localStorage.setItem("departureID", busdatas.from_sourceID);
    localStorage.setItem("arrivalID", busdatas.to_sourceID);
    localStorage.setItem("selectedDate", getselecteddate);
  };

  const [inputsearch, setInputSearch] = useState({
    from: "",
    to: "",
  });

  const [modalshow, setModalShow] = useState(false);

  const onClose = () => {
    setModalShow(false);
    setInputSearch({
      ...inputsearch,
      from: "",
      to: "",
    });
  };

  // useEffect(() => {
  // const depature_city = [
  //   { city: "Chennai", value: "Chennai", state: "Tamilnadu" },
  //   { city: "Bangalore", value: "Bangalore", state: "Karnataka" },
  //   { city: "Hyderabad", value: "Hyderabad", state: "Telangana" },
  // ];

  //     if (inputsearch.from) {
  //         if (selectinput === "from") {
  //             const depaturedata = Get_Stations.filter((item) =>
  //                 item.city.toLowerCase().includes(inputsearch.from.toLowerCase())
  //             );
  //             setDepatureList(depaturedata);
  //         } else if (selectinput === "to") {
  //             const depaturedata = Get_Stations.filter((item) =>
  //                 item.city.toLowerCase().includes(inputsearch.to.toLowerCase())
  //             );
  //             setDepatureList(depaturedata);
  //             // if (localStorage.getItem("departure") === "Pondicherry" ){
  //             //   setDepatureList({ city: "Coimbatore", value: "Coimbatore", state: "Tamilnadu" })
  //             // }
  //         }
  //     } else {
  //         // setDepatureList(selectinput === "from" ? depature_city : arrival_city);
  //         const locdep = localStorage.getItem("departure");
  //         setDepatureList(
  //             selectinput === "from"
  //                 ? depature_city
  //                 : locdep === "Pondicherry"
  //                     ? [{ city: "Coimbatore", value: "Coimbatore", state: "Tamilnadu" }]
  //                     : locdep === "Bangalore"
  //                         ? [{ city: "Hyderabad", value: "Hyderabad", state: "Telugana" }]
  //                         : [
  //                             {
  //                                 value: "Bangalore",
  //                                 city: "Bangalore",
  //                                 state: "Karnataka",
  //                             },
  //                         ]
  //         );
  //     }
  // }, [inputsearch, selectinput]);

  const [searchQuery, setSearchQuery] = useState("");


  const handleSearch = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
  };
  useEffect(() => {
    if (searchQuery.length > 0) {
      GetStations(dispatch, searchQuery);
    } else {
      const val = "";
      GetStations(dispatch, val);
    }
  }, [dispatch, searchQuery]);

  return (
    <>
      <div className="flex justify-center">
        <div className="block md:hidden absolute h-[100vw]  border-[0.1vw] border-t-gray-400  shadow-lg shadow-gray-400 top-[15vw] rounded-[2vw]   w-[90%]">
          <div className="px-[5vw] py-[1.5vw]">
            <div className="row-span-2 relative flex items-center py-[2vw] h-[17.5vh] overflow-y-auto">
              <div className="w-full flex flex-col">
                <div
                  className="flex items-center relative"
                  onClick={() => {
                    setModalShow(true);
                    setSelectInput("from");
                    setSearchQuery("");
                  }}
                >
                  <span className="pr-[3vw]">
                    {" "}
                    <FaMapPin size={"7vw"} color="#1F487C" />
                  </span>
                  <p className="text-[#1F487C] text-[5vw] ">
                    {busdatas.from ? busdatas.from : "From"}
                  </p>
                </div>
                <div className="flex items-center">
                  <div className="border-b-[0.1vw] border-[#1F487C] w-[100%]   "></div>
                  <div className="">
                    <LuArrowDownUp
                      size={"9vw"}
                      color="white"
                      className="bg-[#1F487C] p-[2vw] rounded-full"
                      onClick={handleflip}
                    />
                  </div>
                </div>
                <div
                  className="flex items-center relative"
                  onClick={() => {
                    setModalShow(true);
                    setSelectInput("to");
                    setSearchQuery("");
                  }}
                >
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
                  {/* <div className="border-b-[0.1vw] border-[#1F487C] left-[10vw] w-[80%] absolute top-[12vw]"></div> */}
                </div>
              </div>
              {/* <div clas   sName="absolute top-[27vw] text-[3.5vw] text-red-500 ">{error ? <span>{error}</span> : ''}</div> */}
            </div>
            <div className="row-span-1 relative">
              <div className="gap-[1vw] w-full h-full flex flex-col  ">
                <p className=" text-[4vw] text-[#1F487C] ">Departure Date</p>
                <HomeDateInput />
              </div>
            </div>
            <div className="row-span-1 items-center mt-[2vw] relative">
              <div className="flex flex-col justify-between w-full gap-y-[2vw] py-[1vw]">
                <div className="flex justify-between">
                  <button
                    className={`border-[0.15vw] ${seatFilter === "seater"
                      ? "bg-[#1F487C] text-white"
                      : "text-black border-[#81A3B6]"
                      }  py-[1vw] px-[4vw] rounded-full text-[4vw]`}
                    onClick={() => {
                      if (seatFilter === "seater" && sessionStorage.getItem("home_seat_type") === "true") {
                        SetSeatFilter("");
                        sessionStorage.setItem("home_seat_type", null)
                      } else {
                        SetSeatFilter("seater")
                        sessionStorage.setItem("home_seat_type", true);
                      }
                    }}
                  >
                    Seater
                  </button>
                  <button
                    className={`border-[0.15vw] ${seatFilter === "sleeper"
                      ? "bg-[#1F487C] text-white"
                      : "text-black border-[#81A3B6]"
                      }  py-[1vw] px-[4vw] rounded-full text-[4vw]`}
                    onClick={() => {
                      if (seatFilter === "sleeper" && sessionStorage.getItem("home_seat_type") === "false") {
                        SetSeatFilter("");
                        sessionStorage.setItem("home_seat_type", null)
                      } else {
                        SetSeatFilter("sleeper")
                        sessionStorage.setItem("home_seat_type", false);
                      }
                    }}
                  >
                    Sleeper
                  </button>
                  <button
                    className={`border-[0.15vw]  ${luxury === true
                      ? "bg-custom-gradient-luxury bg-image-url  text-black border-[#e1db84]"
                      : "text-black border-[#81A3B6]"
                      }  py-[1vw] px-[4vw] rounded-full text-[4vw]`}
                    onClick={() => {
                      setLuxury(!luxury);
                      // if (seatFilter == "semi_sleeper") {
                      //   SetSeatFilter("");
                      // } else {
                      //   SetSeatFilter("semi_sleeper");
                      // }
                      SetBusFilters((prev) => ({
                        ...prev,
                        bustype: prev.bustype === false ? null : false,
                      }));
                      sessionStorage.setItem("home_luxury", !luxury);
                    }}
                  >
                    Luxury Bus
                  </button>
                </div>

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
                <div className=" items-center flex gap-[5vw]">
                  <input
                    type="checkbox"
                    autoComplete="off"
                    className="w-[5vw] h-[5vw] cursor-pointer"
                    onClick={(e) => handlecheckbox(e)}
                  />

                  <span className="text-[4vw]">Show AC Buses Only</span>
                </div>
              </div>
            </div>
            <div
              className="row-span-1 mt-[2vw] items-center justify-center  flex"
              onClick={handlebussearch}
            >
              <button className="bg-[#1F487C] text-white text-[5vw] w-full py-[2vw] rounded-[2vw]">
                Search Buses
              </button>
            </div>
          </div>
        </div>
      </div>
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
        <div
          className={`bg-[${colors.background}] w-full h-full overflow-y-clip`}
          style={{
            backgroundColor: colors.background,
          }}
        >
          <div
            className={`h-[15vw] w-full bg-[${colors.primary}] relative items-center flex justify-center`}
          >
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
            <div
              className={`relative items-center flex  bg-[${colors.background}] w-full justify-center h-[18vw]`}
              style={{
                backgroundColor: colors.background,
              }}
            >
              <CiSearch
                size={"6vw"}
                color={`${colors.primary}`}
                className="absolute left-[6vw]"
              />
              <input
                placeholder="Search your city"
                className={`text-[5vw] h-[12vw] pl-[12vw] w-[95%] bg-white rounded-full outline-none border-[0.1vw] border-[${colors.primary}]  custom-search custom-placeholder`}
                autoComplete="off"
                onChange={(e) => {
                  handleSearch(e);
                }}
                value={searchQuery}
              // value={inputsearch.from}
              />
            </div>
            <div className="h-screen  w-full overflow-y-scroll">
              {
                // departurelist?.length > 0 &&
                Get_Stations?.map((item, i) => (
                  <>
                    <div
                      className=" py-[3vw] bg-white flex items-center justify-between px-[2vw]"
                      onClick={() => {
                        selectinput === "from"
                          ? localStorage.setItem("departure", item.city)
                          : localStorage.setItem("arrival", item.city);
                        setModalShow(false);
                        setInputSearch({
                          ...inputsearch,
                          from: "",
                        });
                        selectinput === "from"
                          ? setBusDatas({
                            ...busdatas,
                            from: item?.station_name,
                            from_sourceID: item?.source_id,
                            from_state: item?.state_name
                          })
                          : setBusDatas({
                            ...busdatas,
                            to: item?.station_name,
                            to_sourceID: item?.source_id,
                            to_state: item?.state_name
                          });
                        setError("");
                        setSearchQuery("");
                      }}
                    >
                      <div className="flex items-center gap-[3vw]">
                        <span>
                          <LiaCitySolid size={"6.5vw"} />
                        </span>

                        <label className="text-[4vw] float-start font-semibold">
                          {item.station_name}
                        </label>
                      </div>
                      <div className="">
                        <label className="text-gray-400 float-end text-[4vw]">
                          {item?.state_name}
                        </label>
                      </div>
                    </div>
                    <div className="border-b-[0.2vw] border-gray-400 w-full"></div>
                  </>
                ))
              }
            </div>
          </div>
        </div>
      </Drawer>
    </>
  );
}
