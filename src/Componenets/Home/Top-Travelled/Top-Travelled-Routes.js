import React, { useState, useEffect } from "react";
import { GetTopBusRoutes } from "../../../Api-TBS/Home/Home";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
//import { capitalizeFirstLetter } from "../../Common/Common-Functions/Captalization";
import { FaArrowRightLong } from "react-icons/fa6";
import { Tooltip } from "antd";
import moment from "moment";
import { Abhibus_GetBusList } from "../../../Api-Abhibus/Home/HomePage";
import dayjs from "dayjs";
//import { SendTravelDetails } from "../../Api/Dashboard/Dashboard";

export default function TopTravelledRoutes() {
  const apiUrlimage = process.env.REACT_APP_API_URL_IMAGE;

  // const apicrmimage = process.env.REACT_APP_CRM_API_URL_IMAGE;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const getselecteddate = useSelector((state) => state.selected_date);
  const getroutes = useSelector((state) => state.top_route_list);
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

  // const handleRoutes = async (item) => {
  //   localStorage.setItem("departure", capitalizeFirstLetter(item.from));
  //   localStorage.setItem("arrival", capitalizeFirstLetter(item.to));
  //   try {
  //     const data = await SendTravelDetails(dispatch, busdatas, luxury);
  //     console.log(luxury, "luxury_luxury");
  //     console.log(busdatas.from, busdatas.to, data, "datadata");
  //   } catch (error) {
  //     console.error("Error fetching additional user data", error);
  //   }
  //   navigation("/dashboard");
  // };

  const handleonClick = async (item) => {
    // Update local state
    setBusDatas({
      ...busdatas,
      from: item.from,
      from_sourceID: item.from_id,
      to: item.to,
      to_sourceID: item.to_id,
    });
  };

  const handlebussearch = async () => {
    try {
      const data = await Abhibus_GetBusList(
        dispatch,
        busdatas,
        getselecteddate,
        luxury
      );
      console.log(data?.status === "success", "datadatadata");
      if (data?.status === "success") {
        console.log(data, "test");
        sessionStorage.setItem('loader', true)
        navigate(
          `/buslist/${busdatas.from}/${busdatas.from_sourceID}/${busdatas.to}/${busdatas.to_sourceID
          }/${dayjs(getselecteddate).format("YYYY-MM-DD")}`
        );
      }
    } catch (error) {
      console.error("Error fetching additional user data", error);
    }

    localStorage.setItem("departure", busdatas.from);
    localStorage.setItem("arrival", busdatas.to);
    localStorage.setItem("departureID", busdatas.from_sourceID);
    localStorage.setItem("arrivalID", busdatas.to_sourceID);
    localStorage.setItem("selectedDate", getselecteddate);
  };

  useEffect(() => {
    if (busdatas.from_sourceID && busdatas.to_sourceID) {
      handlebussearch();
    }
  }, [busdatas]);

  useEffect(() => {
    setBusDatas((prevBusDatas) => ({
      ...prevBusDatas,
      seater: seatFilter === "seater" ? "true" : "false",
      sleeper: seatFilter === "sleeper" ? "true" : "false",
      semi_sleeper: seatFilter === "semi_sleeper" ? "true" : "false",
      date: moment(getselecteddate).format("YYYY-MM-DD"),
      luxury_data: luxury,
    }));
  }, [seatFilter, getselecteddate, luxury]);

  useEffect(() => {
    GetTopBusRoutes(dispatch);
  }, [dispatch]);

  // const sanitizePath = (path) => {
  //   const sanitizedPath = path.replace(/\\\\/g, "file://").replace(/\\/g, "//");
  //   console.log(encodeURI(sanitizedPath), "techimage");
  //   return encodeURI(sanitizedPath);
  // };

  return (
    <>
      <div className="mt-[16vw] md:block hidden px-[5vw]">
        <p className=" text-[1.5vw] pl-[2vw] text-[#1F487C] font-bold">
          Top Travelled Bus Routes{" "}
        </p>
        <div className="grid grid-cols-5 w-full h-full gap-[1vw] mt-[1.5vw] px-[2vw]">
          {getroutes?.length > 0 &&
            getroutes?.map((item, index) => (
              <div
                key={index}
                className="cursor-pointer col-span-1 w-full h-[18vw] bg-gradient-to-t from-[#126DAF] border-t-[0.2vw] rounded-lg border-[#0D99FF]"
                onClick={() => {
                  handleonClick(item);
                  console.log(item, "item");
                }}
              >
                <div
                  style={{
                    height: "75%",
                    width: "100%",
                  }}
                >
                  <img
                    src={`${apiUrlimage}${item?.image}`}
                    className="h-full w-full p-[0.7vw] rounded-lg"
                    style={{
                      borderRadius: "1.5vw",
                    }}
                    alt={item.from}
                  />
                </div>
                <div
                  style={{
                    height: "25%",
                    width: "100%",
                  }}
                >
                  <div className="gap-[0.7vw] flex items-center text-white pl-[1vw] font-bold w-full">
                    <span className="text-[0.9vw]">
                      {item?.from?.length > 9 ? (
                        <Tooltip
                          placement="top"
                          title={item?.from}
                          className="cursor-pointer"
                          color="#126DAF"
                        >
                          {`${item?.from?.slice(0, 9)}...`}
                        </Tooltip>
                      ) : (
                        `${item?.from?.slice(0, 9)}`
                      )}
                      {/* {item.from.toUpperCase()} */}
                    </span>
                    <span>
                      <FaArrowRightLong size={"1vw"} />
                    </span>
                    <span className="text-[0.9vw]">
                      {item?.to?.length > 9 ? (
                        <Tooltip
                          placement="top"
                          title={item?.to}
                          className="cursor-pointer"
                          color="#126DAF"
                        >
                          {`${item?.to.slice(0, 9)}...`}
                        </Tooltip>
                      ) : (
                        `${item?.to?.slice(0, 9)}`
                      )}
                      {/* {item.to.toUpperCase()} */}
                    </span>
                  </div>
                  <p className="text-white pl-[1vw] font-bold text-[1vw] pt-[0.3vw]">
                    {`${item?.bus_count} Buses`}
                  </p>
                </div>
              </div>
            ))}
        </div>
      </div>
      <div className="mt-[175vw] px-[5vw] md:hidden block">
        <p className=" text-[5vw] pl-[2vw] text-[#1F487C] font-bold">
          Top Travelled Bus Routes{" "}
        </p>
        <div className="relative overflow-x-auto scrollbar-hide mt-[2vw]">
          <div className="flex">
            {getroutes?.length > 0 &&
              getroutes?.map((item, index) => (
                <div
                  key={index}
                  onClick={() => {
                    handleonClick(item);
                    console.log(item, "item");
                  }}
                  className="w-[55vw] mr-[2vw] flex-shrink-0  h-[54vw] bg-gradient-to-t from-[#126DAF] border-t-[0.5vw] rounded-lg border-[#0D99FF]"
                >
                  <div
                    className=""
                    style={{
                      height: "40vw",
                      width: "55vw",
                    }}
                  >
                    <img
                      src={`${apiUrlimage}${item.image}`}
                      className="h-full w-full px-[2vw] pt-[2vw] rounded-lg"
                      alt={item.from}
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
                    <p className="text-white pl-[2.5vw] font-bold text-[3.5vw]">{`${item.bus_count} Buses`}</p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
}
