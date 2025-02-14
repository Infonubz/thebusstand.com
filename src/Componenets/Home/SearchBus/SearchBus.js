import { ErrorMessage, Field, Formik } from "formik";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import ColorCodes from "../../Common/Common-Functions/ColorCodes";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { Form } from "antd";
import { Drawer } from "antd";
import suitcase from "../../../Assets/SearchBar/suitcase.png";
import stand_man from "../../../Assets/SearchBar/stand_man.png";
import man from "../../../Assets/SearchBar/man.png";
import bag from "../../../Assets/SearchBar/bag.png";
import map from "../../../Assets/SearchBar/map.png";
// import stand from "../../assets/stand.png";
import { FaArrowLeft, FaArrowRightArrowLeft, FaMapPin } from "react-icons/fa6";
import dayjs from "dayjs";
import moment, { min } from "moment";
import HomeDateInput from "../../Common/DatePicker/Components/HomeDateInput";
import {
  Abhibus_GetBusList,
  Abhibus_GetStations,
} from "../../../Api-Abhibus/Home/HomePage";
import { PiBuildingOffice, PiBuildingOfficeBold } from "react-icons/pi";
import "../../../App.css";
import SVG_List from "../../Common/SVG/SVG";
import { toast } from "react-toastify";
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
export default function SearchBus() {
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
  });
  const [error, setError] = useState({
    from: "",
    to: "",
    occupation: "",
    mobile: "",
  });

  const handlecheckbox = (e) => {
    const { checked } = e.target;
    setBusDatas({
      ...busdatas,
      ac: checked,
    });
    checked ?
      sessionStorage.setItem('home_ac', checked)
      :
      sessionStorage.setItem('home_ac', null)
  };
  const handleflip = (setFieldValue) => {
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

    // Update Formik's values
    setFieldValue("from", newBusDatas.from);
    setFieldValue("to", newBusDatas.to);
  };
  const handlebussearch = async () => {
    try {
      const data = await Abhibus_GetBusList(
        dispatch,
        busdatas,
        getselecteddate,
        luxury
      );
      console.log(data, "datadatadata");
      if (data?.status === "success") {
        navigation(
          `/buslist/${busdatas.from}/${busdatas.from_sourceID}/${busdatas.to}/${busdatas.to_sourceID
          }/${dayjs(getselecteddate).format("YYYY-MM-DD")}`
        );
      }
    } catch {
      console.error("Error fetching additional user data");
    }
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
    localStorage.setItem("departureID", busdatas.from_sourceID);
    localStorage.setItem("arrivalID", busdatas.to_sourceID);
    // try {
    //   const data = await SendTravelDetails(
    //     dispatch,

    //     busdatas,
    //     luxury
    //   );
    //   console.log(
    //     busdatas.from,
    //     busdatas.to,
    //     busdatas.seater,
    //     busdatas.sleeper,
    //     data,
    //     "data_data"
    //   );
    // } catch (error) {
    //   console.error("Error fetching additional user data", error);
    // }
    // if (busdatas.from === "" || busdatas.to === "") {
    //   const errors = {};
    //   if (busdatas.from === "") {
    //     errors.from = "Field is required";
    //   }
    //   if (busdatas.to === "") {
    //     errors.to = "Field is required";
    //   }
    //   setError(errors);
    // } else {
    //   navigation(`/dashboard`);
    // }
  };
  const handleonClick = (item, setFieldValue, input) => {
    console.log("Station clicked:", item.Station_Name);

    // Update Formik's value
    if (input === "from") {
      setFieldValue("from", item.Station_Name);
    } else {
      setFieldValue("to", item.Station_Name);
    }

    // Update local state (if needed)
    if (input === "from") {
      setBusDatas({
        ...busdatas,
        from: item.Station_Name,
        from_sourceID: item.Source_ID,
      });
    } else {
      setBusDatas({
        ...busdatas,
        to: item.Station_Name,
        to_sourceID: item.Source_ID,
      });
    }
    if (input === "from") {
      setIsInputFromFocused(false);
    } else {
      setIsInputToFocused(false);
    }

    console.log("Dropdown closed");
  };
  useEffect(() => {
    Abhibus_GetStations(dispatch);
  }, []);
  console.log(busdatas, "Get_StationsGet_Stations");

  return (
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
            className={`bg-[${colors.background}] absolute rounded-[2vw] grid grid-cols-5 `}
            style={{
              height: "45%",
              width: "80%",
              left: "10%",
              top: "20%",
              // zIndex:1
              backgroundColor: colors.background,
            }}
          >
            <div className="col-span-3  w-full h-full ">
              <div className="grid grid-rows-4 w-full h-full">
                <div className="row-span-1 w-full h-full"></div>
                <div className="row-span-1 w-full h-full flex justify-center gap-[2vw]">
                  <div className="grid grid-cols-9 w-full h-full px-[2vw]">
                    <div className="col-span-4 w-full h-full items-center justify-center flex relative">
                      <div
                        className={`bg-[${colors.primary}] rounded-[0.5vw] absolute top-0`}
                        style={{
                          width: "100%",
                          height: "80%",
                          backgroundColor: colors.primary,
                        }}
                      >
                        <p
                          className={`text-[1.8vw] text-[${colors.primary}] font-extrabold absolute left-0 bottom-[3.5vw] drop-shadow-lg shadow-black header`}
                          style={{
                            color: colors.primary,
                          }}
                        >
                          Time to Travel
                        </p>

                        <img
                          src={suitcase}
                          alt=""
                          className="absolute right-[4vw] bottom-[3.1vw] h-[3vw] w-[1.7vw]"
                        />
                        <img
                          src={bag}
                          alt=""
                          className="absolute right-[2.6vw] bottom-[3.0vw] h-[2.2vw] w-[1.7vw]"
                        />
                        <img
                          src={man}
                          alt=""
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
                            height: "100%",
                          }}
                          className="absolute bottom-[0vw] pl-[0.2vw] pt-[0.25vw]"
                        >
                          <div className="relative">
                            <Field name="from">
                              {({ field, form: { setFieldValue } }) => (
                                <input
                                  {...field}
                                  className="h-[3vw] w-full rounded-[0.3vw] pl-[1vw] outline-none text-[1.2vw] placeholder:text-[1.2vw]"
                                  placeholder="From"
                                  onFocus={() => setIsInputFromFocused(true)}
                                  // onBlur={() => setIsInputFromFocused(false)}
                                  value={values.from} // Use Formik's field value directly
                                  autoComplete="off"
                                />
                              )}
                            </Field>

                            {isInputFromFocused && (
                              <div className="absolute top-[3.5vw] w-full">
                                <div className="w-full min-h-auto max-h-[16vw] flex-col flex overflow-y-scroll bg-white shadow-md rounded-[0.3vw]">
                                  {Get_Stations?.map((item, i) => (
                                    <div
                                      key={i}
                                      className="flex gap-x-[0.75vw] w-full px-[1vw] py-[0.5vw] items-center hover:bg-gray-100 "
                                      onClick={() =>
                                        handleonClick(
                                          item,
                                          setFieldValue,
                                          "from"
                                        )
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

                          {error.from ? (
                            <div className="text-red-500 text-[0.8vw] absolute top-[3.6vw] left-[0.25vw]">
                              {error?.from}
                            </div>
                          ) : (
                            <ErrorMessage
                              name="from"
                              component="div"
                              className="text-red-500 text-[0.8vw] absolute top-[3.6vw] left-[0.25vw]"
                            />
                          )}
                        </div>

                        {/* ------------------------------------------------------------------------------------------------------------------------ */}
                      </div>
                    </div>
                    <div className="col-span-1 w-full h-full items-center justify-center flex">
                      <FaArrowRightArrowLeft
                        color={`${colors.primary}`}
                        //className=" cursor-not-allowed"
                        size={"2vw"}
                        onClick={() => {
                          handleflip(setFieldValue);
                        }}
                      />
                    </div>
                    <div className="col-span-4 w-full h-full  items-center justify-center flex relative ">
                      <div
                        className={` bg-[${colors.primary}] rounded-[0.5vw] absolute top-0`}
                        style={{
                          width: "100%",
                          height: "80%",
                          // zIndex: 1,
                          backgroundColor: colors.primary,
                        }}
                      >
                        {/* <img
                      src={stand}
                      className="absolute right-[2vw] bottom-0 h-[8.2vw] w-[1.6vw] pt-[1vw]"
                    /> */}
                        <img
                          src={stand_man}
                          alt=""
                          className="absolute right-[-2.8vw] bottom-0 h-[8vw] w-[5vw] pt-[0.5vw]"
                        />
                        <img
                          src={map}
                          alt=""
                          className="absolute left-0 top-[-4.1vw]"
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
                            height: "100%",
                          }}
                          className="absolute bottom-[0vw] pl-[0.2vw] pt-[0.25vw]"
                        >
                          <div className="relative">
                            <Field name="to">
                              {({ field }) => (
                                <input
                                  {...field}
                                  className="h-[3vw] w-full rounded-[0.3vw] pl-[1vw] outline-none text-[1.2vw] placeholder:text-[1.2vw]"
                                  placeholder="To"
                                  onFocus={() => setIsInputToFocused(true)}
                                  // onBlur={() => setIsInputToFocused(false)}
                                  value={values.to}
                                  autoComplete="off"
                                />
                              )}
                            </Field>

                            {isInputToFocused && (
                              <div className="absolute top-[3.5vw] w-full">
                                <div className="w-full min-h-auto max-h-[16vw] flex-col flex overflow-y-scroll bg-white shadow-md rounded-[0.3vw]">
                                  {Get_Stations?.map((item, i) => (
                                    <div
                                      key={i}
                                      className="flex gap-x-[0.75vw]  w-full px-[1vw] py-[0.5vw] items-center cursor-pointer hover:bg-gray-100"
                                      onClick={() =>
                                        handleonClick(item, setFieldValue, "to")
                                      }
                                    >
                                      {/* <PiBuildingOfficeBold
                                        size={"1.5vw"}
                                        color="#1F487C"
                                      /> */}
                                      {SVG.building_dropdown}

                                      <div className="flex flex-col">
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
                          {error.to ? (
                            <div className="text-red-500 text-[0.8vw] absolute top-[3.6vw] left-[0.25vw]">
                              {error?.to}
                            </div>
                          ) : (
                            <ErrorMessage
                              name="to"
                              component="div"
                              className="text-red-500 text-[0.8vw] absolute top-[3.6vw] left-[0.25vw]"
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row-span-2   w-full h-full flex-col text-[#727E78]">
                  <h1 className="pl-[2vw] pt-[0.5vw] text-[1vw]">
                    Bus Type (optional)
                  </h1>
                  {/* <h1>Seat Type (optional)</h1> */}
                  <div className="flex gap-[1vw]   pt-[0.5vw] pl-[2vw] items-center w-full ">
                    <button
                      className={`border-[0.15vw] flex ${seatFilter === "seater"
                        ? `bg-[${colors.primary}] text-white border-white`
                        : "text-black border-[#81A3B6]"
                        } py-[0.2vw] px-[1.5vw] rounded-full text-[1vw]`}
                      onClick={() => {
                        if (seatFilter === "seater") {
                          SetSeatFilter("");
                        } else {
                          SetSeatFilter("seater");
                        }
                        sessionStorage.setItem('home_seat_type', true)
                      }}
                    >
                      {/* <span className="">
                          <div
                            className={`border-t-[0.1vw] ${
                              seatFilter == "seater"
                                ? "bg-white border-[${colors.primary}]"
                                : "bg-[${colors.primary}] border-white"
                            } border-l-[0.1vw] border-r-[0.1vw] rounded-t-[0.1vw] h-[0.9vw] w-[1vw] relative flex items-center justify-center cursor-pointer`}
                          >
                            <div
                              className={`border-b-[0.1vw] ${
                                seatFilter == "seater"
                                  ? "bg-white border-[${colors.primary}]"
                                  : "bg-[${colors.primary}] border-white"
                              } border-l-[0.1vw] border-r-[0.1vw]  h-[0.9vw] w-[1.2vw] absolute top-[0.4vw] flex items-center justify-center`}
                            ></div>
                            <div
                              className={`border-b-[0.1vw]  ${
                                seatFilter == "seater"
                                  ? " border-[${colors.primary}]"
                                  : " border-white"
                              } border-l-[0.1vw] border-r-[0.1vw] h-[0.7vw] w-[0.8vw] absolute top-[0.4vw] flex items-center justify-center`}
                            ></div>
                            <div
                              className={`border-t-[0.1vw] ${
                                seatFilter == "seater"
                                  ? "bg-white border-[${colors.primary}]"
                                  : "bg-[${colors.primary}] border-white"
                              } absolute top-[0.4vw] w-[0.25vw] left-[-0.15vw]`}
                            ></div>
                            <div
                              className={`border-t-[0.1vw]  ${
                                seatFilter == "seater"
                                  ? " border-[${colors.primary}]"
                                  : " border-white"
                              } absolute top-[0.4vw] w-[0.25vw] right-[-0.15vw]`}
                            ></div>
                          </div>
                        </span> */}
                      <span
                        className={` ${seatFilter === "seater"
                          ? "text-white"
                          : `text-[${colors.primary}]`
                          } font-bold inline-flex`}
                      >
                        Seater
                      </span>
                    </button>

                    <button
                      className={`border-[0.15vw] flex ${seatFilter === "sleeper"
                        ? `bg-[${colors.primary}] text-white border-white`
                        : "text-black border-[#81A3B6]"
                        } py-[0.2vw] px-[1.5vw] rounded-full text-[1vw]`}
                      onClick={() => {
                        if (seatFilter === "sleeper") {
                          SetSeatFilter("");
                        } else {
                          SetSeatFilter("sleeper");
                        }
                        sessionStorage.setItem('home_seat_type', false)
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
                                ? "border-[${colors.primary}] bg-white"
                                : "border-white bg-[${colors.primary}]"
                            } border-[${colors.primary}] h-[2vw] w-[1vw] rounded-[0.1vw] relative flex items-center justify-center cursor-pointer`}
                          >
                            <div
                              className={`border-[0.1vw]  ${
                                seatFilter == "sleeper"
                                  ? "border-[${colors.primary}] bg-[${colors.primary}]"
                                  : "border-white bg-white"
                              }  w-[0.5vw] h-[0.2vw] absolute bottom-[0.3vw] rounded-[0.1vw]`}
                            ></div>
                          </div>
                        </span> */}
                      <span
                        className={` ${seatFilter === "sleeper"
                          ? "text-white"
                          : `text-[${colors.primary}]`
                          } font-bold`}
                      >
                        Sleeper
                      </span>
                    </button>
                    {/* <button
                        className={`border-[0.15vw] ${
                          seatFilter == "semi_sleeper"
                            ? "bg-[${colors.primary}] text-white"
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
                      className={`border-[0.15vw] flex items-center ${luxury === true
                        ? "luxury-card  text-black border-[#e1db84]"
                        : "text-black border-[#81A3B6]"
                        }  py-[0.2vw] px-[1.5vw] rounded-full text-[1vw]`}
                      onClick={() => {
                        setLuxury(!luxury);
                        sessionStorage.setItem('home_luxury', true)
                      }}
                    >
                      {/* <span className="pr-[0.5vw]">
                          <FaBus
                            size={"1vw"}
                            color={`${luxury == true ? "black" : "1F487C"}`}
                          />
                        </span> */}
                      <span
                        className={`${luxury === true
                          ? "text-black"
                          : `text-[${colors.primary}]`
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
                        autoComplete="off"
                        className="w-[1.2vw] h-[1.2vw] cursor-pointer"
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
                  <HomeDateInput />
                </div>
                <div className="row-span-2 w-full h-full items-center justify-center flex">
                  <button
                    type="submit"
                    className={`bg-${colors.primary} px-[4vw] py-[0.5vw] rounded-md text-[1.5vw] text-white`}
                    style={{
                      backgroundColor: colors.primary,
                    }}
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
  );
}
