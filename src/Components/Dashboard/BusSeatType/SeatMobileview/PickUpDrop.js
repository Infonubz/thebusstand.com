import React, { useEffect, useState } from "react";
import IMG from "../../../../assets/platforms/makemytrip.png";
import platformTheme from "../../PlatformTheme";
import tinycolor from "tinycolor2";
import { useDispatch, useSelector } from "react-redux";
import { BUS_LIST, GET_DATA, GET_FILTER_DATA } from "../../../../Store/type";
import DropdownButton from "antd/es/dropdown/dropdown-button";
import { HiCheckCircle } from "react-icons/hi";
import dayjs from "dayjs";
import { useNavigate } from "react-router";

const PickUpDrop  = () => {
  const busdetails = {
    Drop_points:
      "KOYAMBEDU (SBLT LOUNGE), Rohini Theatre, Maduravoyal, Maduravoyal (erikarai Stop), Velappanchavadi, Acs Medical Hospital, Poonamallee, Poonamallee New BusStand, Saveetha Medical College, Sri Peramabathur, Tollgate Plaza, Saint Gobain, Sunguvarchatram Bypass, Kanchipuram",
    Pickup_points:
      "Karumathapathi, Kanniyur Toll, Neelambur Bus Stand, Chiniyampalayam, Kmch, sitra, Hopes College, Peelamedu, Lakshmi Mills, Gandhipuram, ukkadam, Athupalam, Sundarapuram, Malumichampatti, Kenathukadavu, Othakalmandapam",
    Bus_Depature_time:
      "10:15 AM, 10:30 AM, 10:45 AM, 11:00 AM, 11:15 AM, 11:30 AM, 11:45 AM, 12:00 PM, 12:15 PM, 12:30 PM, 12:45 PM, 1:00 PM, 1:15 PM, 1:30 PM",
    Bus_Arrival_time:
      "10:15 AM, 10:30 AM, 10:45 AM, 11:00 AM, 11:15 AM, 11:30 AM, 11:45 AM, 12:00 PM, 12:15 PM, 12:30 PM, 12:45 PM, 1:00 PM, 1:15 PM, 1:30 PM, 1:45 PM, 2:00 PM",
    Bus_depature_date: new Date().toISOString(),
    Bus_arrival_date: new Date().toISOString(),
  };

  const [updatedarrival, setUpdatedArrival] = useState([""]);
  const [updatedDepartures, setUpdatedDepartures] = useState([]);
  const dropPointsArray = busdetails?.Drop_points?.split(",")?.map(
    (item, index) => (
      // Assuming you want to return some JSX or string representation of each item
      <p key={index}>{item.trim()}</p>
    )
  );

  const addTenMinutes = (timeStr, index) => {
    const [hours, minutes] = timeStr.split(":").map(Number);
    const totalMinutes = hours * 60 + minutes + index * 10;
    const newHours = Math.floor(totalMinutes / 60);
    const newMinutes = totalMinutes % 60;
    return `${newHours.toString().padStart(2, "0")}:${newMinutes
      .toString()
      .padStart(2, "0")}`;
  };

  useEffect(() => {
    const pickupPoints = busdetails?.Pickup_points?.split(",");
    const updatedDepartures = pickupPoints?.map((pickup, index) => {
      // const time = addTenMinutes(busdetails.Bus_Depature_time, index);
      const time = busdetails.Bus_Depature_time?.split(",")[0];
      return { pickup, time };
    });
    setUpdatedDepartures(updatedDepartures);
    const dropPoints = busdetails?.Pickup_points?.split(",");
    const updatedarrival = dropPoints?.map((pickup, index) => {
      // const time = addTenMinutes(busdetails.Bus_Arrival_time, index);
      const time = busdetails.Bus_Depature_time?.split(",")[0];
      return { pickup, time };
    });
    setUpdatedArrival(updatedarrival);
  }, [busdetails]);
  console.log(busdetails, "busdetailsbusdetailsbusdetails");

  const [sampledata, setSampleData] = useState("");
  const [seatplatform, setSeatPlatform] = useState("");
  const [type, setType] = useState("");
  const [busprice, setBusPrice] = useState({
    price: "",
    discount: "",
  });
  const [selectedRoutes, setSelectedRoutes] = useState({
    dep_route: busdetails?.Pickup_points?.split(",")[0],
    arri_route: busdetails?.Drop_points?.split(",")[0],
    // dep_time: busdetails?.Bus_Depature_time,
    // arr_time: busdetails?.Bus_Arrival_time,
    dep_time: busdetails?.Bus_Depature_time?.split(",")[0],
    arr_time: busdetails?.Bus_Arrival_time?.split(",")[0],
  });
  // ---------------------------------------Drawer---------------------------------------
  // const [placement, setPlacement] = useState("right");
  // const [modalshow, setShowModal] = useState(false);
  // const showDrawer = () => {
  //     setOpen(true);
  // };
  // const onClose = () => {
  //     setShowModal(false);
  // };
  // const onChange = (e) => {
  //     setPlacement(e.target.value);
  // };

  // --------------------------------------------------------------------------------------------
  console.log(busprice, "Checkiong wehfher the soaksatekis working wor not ");
  const getData = useSelector((state) => state?.get_filter_data);
  const dispatch = useDispatch();
  const fil = ["Shollinganallur", "Thuraipakkam"];
  const colorcode = platformTheme(seatplatform);
  const baseColor = tinycolor(colorcode);
  const lightColor = baseColor.lighten(41).toString();

  useEffect(() => {
    sessionStorage.setItem("CurrentInde", 0);
  }, []);

  useEffect(() => {
    const place = localStorage.getItem("depature");
    // axios
    //   .get(
    //     place == "Chennai"
    //       ? "http://192.168.90.47:3000/chennai_src"
    //       : place == "Bangalore"
    //       ? "http://192.168.90.47:3000/bangalore_src"
    //       : "http://192.168.90.47:3000/pondicherry_src"
    //   )
    //   .then((response) => {
    // const fulldata = response.data;
    const fulldata = getData;
    const operator = fulldata.filter((item) => {
      return item.operator_id == 1;
    });
    const filterbuslist = fulldata.filter((item) => {
      return item.bus_operator_id == 172;
    });
    const filterbuslist1 = fulldata.filter((item) => {
      return item.bus_operator_id == 174;
    });
    const concatdata = filterbuslist.concat(filterbuslist1);
    const filterlist = fulldata.filter((item) =>
      item.Pickup_Point?.some((point) => fil.includes(point))
    );
    console.log(concatdata, "fulldatafulldatafulldata");
    const splitData = (data) => {
      const splitArrays = [];
      for (let i = 0; i < data.length; i += 8) {
        splitArrays.push(data.slice(i, i + 8));
      }
      return splitArrays;
    };

    const groupedData = getData.reduce((acc, obj) => {
      const key = `operator${obj.bus_operator_id}`;
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(obj);
      return acc;
    }, {});

    const dataArray = Object.entries(groupedData).map(([key, value]) => ({
      [key]: splitData(value),
    }));
    setSampleData(dataArray);
    dispatch({
      type: BUS_LIST,
      payload: dataArray,
    });
    // }
    // )/
    // .catch((error) => {
    //   console.error("Error fetching data:", error);
    // });
  }, [getData, localStorage.getItem("depature")]);
  console.log(sampledata, "sampledata fetching");

  // bg-[#E5FFF1]
  const navigate = useNavigate();
  return (
    <>
      <div className="col-span-1 h-full w-full">
        <div className="bg-blue-900 w-full h-[15vw] flex justify-evenly">
          <div className="flex items-center">
            <div>
              {" "}
              <img
                src={IMG}
                className="h-[6vw] w-[6vw] bg-white rounded-full"
              />
            </div>
            <div>
              <p className="text-[5vw] text-white font-bold pl-[1vw]">
                MAKE MY TRIP
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white p-[1vw]">
          <div className="grid grid-cols-2 w-full bg-slate-300 px-[2vw] py-[1vw] gap-[1.5vw]">
            <div className="col-span-1 border-[0.1vw] border-gray-400 w-full h-fit rounded-[0.5vw] bg-white">
              <p
                className={`text-center py-[0.5vw] text-white rounded-tl-[0.45vw] rounded-tr-[0.45vw] text-[2.5vw]`}
                style={{
                  backgroundColor: colorcode.theme,
                }}
              >
                PICKUP POINT
              </p>
              <div className="h-[80vh] overflow-y-auto new-scrollbar">
                {busdetails?.Pickup_points?.split(",").map((item, index) => (
                  <>
                    <div
                      key={index}
                      className={`${
                        selectedRoutes?.dep_route == item
                          ? ""
                          : " hover:bg-gray-200"
                      } flex flex-col py-[0.5vw] px-[1vw]  cursor-pointer `}
                      onClick={() =>
                        setSelectedRoutes({
                          ...selectedRoutes,
                          dep_route: item,
                          // dep_time: updatedDepartures[index]?.time,
                          dep_time:
                            busdetails?.Bus_Depature_time?.split(",")[0],
                        })
                      }
                      style={{
                        backgroundColor:
                          selectedRoutes?.dep_route == item
                            ? colorcode.color
                            : "white",
                      }}
                    >
                      <div className="flex justify-between">
                        <p className=" flex items-center">
                          <span className="text-[2.5vw] pr-[1vw]">
                            {updatedDepartures[index]?.time}
                          </span>
                          <span className="text-[2vw] ">
                            {`(${dayjs(busdetails.Bus_depature_date).format(
                              "DD MMM"
                            )})`}
                          </span>
                        </p>
                        <div className="order-last">
                          {selectedRoutes?.dep_route == item ? (
                            <span className=" right-[3vw] top-[13vw]">
                              <HiCheckCircle
                                size={"3.6vw"}
                                color={colorcode.theme}
                              />
                            </span>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                      <p className="text-[3vw] font-bold">{item}</p>
                    </div>
                    <div className="w-full border-slate-600 border-t-[0.1vw] border-dashed"></div>
                  </>
                ))}
              </div>
            </div>

            <div className="col-span-1 border-[0.1vw] border-gray-400 w-full h-fit rounded-[0.5vw] bg-white">
              <p
                className={`text-center py-[0.5vw]  text-white rounded-tl-[0.45vw] rounded-tr-[0.45vw] text-[2.5vw]`}
                style={{
                  backgroundColor: colorcode.theme,
                }}
              >
                DROP POINT
              </p>
              <div className="h-[80vh] overflow-y-auto new-scrollbar">
                {" "}
                {busdetails?.Drop_points?.split(",").map((item, index) => (
                  <>
                    <div
                      key={index}
                      className={`${
                        selectedRoutes?.arri_route == item
                          ? ""
                          : " hover:bg-gray-200"
                      } flex flex-col py-[0.5vw] px-[1vw]  cursor-pointer `}
                      onClick={() =>
                        setSelectedRoutes({
                          ...selectedRoutes,
                          arri_route: item,
                          arr_time: updatedarrival[index]?.time,
                        })
                      }
                      style={{
                        backgroundColor:
                          selectedRoutes?.arri_route == item
                            ? colorcode.color
                            : "white",
                      }}
                    >
                      <div className="flex justify-between">
                        <p className=" flex items-center">
                          <span className="text-[2.5vw] pr-[1vw]">
                            {updatedDepartures[index]?.time}
                          </span>
                          <span className="text-[2vw] ">
                            {`(${dayjs(busdetails.Bus_arrival_date).format(
                              "DD MMM"
                            )})`}
                          </span>
                        </p>
                        <div className="order-last">
                          {selectedRoutes?.arri_route == item ? (
                            <span className=" right-[3vw] top-[13vw]">
                              <HiCheckCircle
                                size={"3.6vw"}
                                color={colorcode.theme}
                              />
                            </span>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                      <p className="text-[3vw] font-bold">{item}</p>
                    </div>
                    <div className="w-full border-slate-600 border-t-[0.1vw] border-dashed"></div>
                  </>
                ))}
              </div>
            </div>
          </div>
        </div>
        <button
          className="bg-blue-900 w-full h-[4vh] fixed bottom-0"
          onClick={() => navigate("/dashboard/userinfo")}
        >
          <p className="text-white">CONTINUE</p>
        </button>
      </div>
    </>
  );
};

export default PickUpDrop ;
