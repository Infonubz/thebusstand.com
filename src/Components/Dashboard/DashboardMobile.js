import React, { useEffect } from "react";
import vkvimage from "../../assets/vkv.png";
import lowprice from "../../assets/lowprice.png";
import abhibus from "../../assets/abhibus.png";
import redbus from "../../assets/redbus.png";
import { CiStar } from "react-icons/ci";
import { MdAirlineSeatReclineExtra, MdStarRate } from "react-icons/md";
import { IoPersonSharp } from "react-icons/io5";
import ticketbus from "../../assets/ticketbus.png";
import { useDispatch, useSelector } from "react-redux";
import yatra from "../../assets/yatra.png";
import via from "../../assets/via.png";
import makemy from "../../assets/makemy.png";
import goibibo from "../../assets/go.png";
import zink from "../../assets/zink.png";
import orange from "../../assets/orange.png";
import clear from "../../assets/clear.png";
import seats from "../../assets/seats.png";
import { MdOutlineEventSeat } from "react-icons/md";
import { TbAirConditioning } from "react-icons/tb";
import gif from "../../assets/gif.gif";
import gif2 from "../../assets/gif2.gif";
import gif3 from "../../assets/gif3.gif";
import backdrop from "../../assets/backdrop.png";
import { useState } from "react";
import sharma from "../../assets/sharma.png";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import { RxDotFilled } from "react-icons/rx";
import { Drawer } from "antd";
import SidebarMobile from "../MainComponenet/SidebarMobile";
import {
  IoIosArrowBack,
  IoIosArrowDropleft,
  IoIosArrowDropright,
  IoIosArrowForward,
  IoIosInformationCircleOutline,
} from "react-icons/io";
import { Modal } from "react-modal";
import rectangle from "../../assets/rectangle.png";
import rect_mini from "../../assets/rect_mini.png";
import ShareButtons from "../MainComponenet/ShareButton";
import axios from "axios";
import jsondata from "../../data.json";
import Promotion from "../MainComponenet/Promotion";
import fulldata from "../../data.json";
import dayjs from "dayjs";
import { Button, Popover, Result, Tooltip } from "antd";
import paytm from "../../assets/paytm.png";
import ixigo from "../../assets/ixigo.jpg";
import {
  BUS_LIST,
  GET_DATA,
  GET_FILTER_DATA,
  SEAT_TYPE,
} from "../../Store/type";
import Sleeper from "./BusSeatType/Sleeper";
import men_sl from "../../assets/men_sl.png";
import men_se from "../../assets/men_se.png";
import men_sl_sel from "../../assets/men_sl_sel.png";
import men_se_sel from "../../assets/men_se_sel.png";
import men_sl_book from "../../assets/sl_men_book.png";
import men_se_book from "../../assets/se_men_book.png";
import women_sl from "../../assets/women_sl.png";
import women_se from "../../assets/women_se.png";
import women_sl_sel from "../../assets/women_sl_sel.png";
import women_se_sel from "../../assets/women_se_sel.png";
import women_sl_book from "../../assets/sl_women_book.png";
import women_se_book from "../../assets/se_women_book.png";
import unisex_book from "../../assets/unisex_se_book.png";
import unisex_sel from "../../assets/unisex_sel.png";
import unisex_se from "../../assets/unisex_se.png";
import unisex_se_sel from "../../assets/unisex_se_sel.png";
import unisex_se_book from "../../assets/unisex_book.png";
import Seater from "./BusSeatType/Seater";
import SemiSleeper from "./BusSeatType/SemiSleeper";
import "../../Components/Home/test.css";
import platformlogo from "./Logo";
import currentlogo from "../../assets/Operator_logos/1.png";
import tinycolor from "tinycolor2";
import platformTheme from "./PlatformTheme";
import platformImages from "./PlatformImages";
import Sidebar from "../MainComponenet/Sidebar";
import bus_comp from "../../assets/bus_comp.png";
import { Link, useNavigate } from "react-router-dom";
import BusSeat from "./BusSeatType/SeatMobileview/BusSeat";
import PickUpDrop from "./BusSeatType/SeatMobileview/PickUpDrop";
import SeaterMobile from "./BusSeatType/SeatMobileview/SeaterMobile";
import SleeperMobile from "./BusSeatType/SeatMobileview/SleeperMobile";
import SemiSleeperMobile from "./BusSeatType/SeatMobileview/SemiSleeperMobile";
import Advertisement from "../Advertisement/Ads";
const DashboardMobile = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [drawerHeight, setDrawerHeight] = useState("50%");
  const [isDrawer, setIsDrawer] = useState(false);

  const toggleDrawer = () => {
    setDrawerHeight("50%");
    setIsDrawerOpen(!isDrawerOpen);
  };

  const showAll = () => {
    // setDrawerHeight("100%")
    setIsDrawerOpen(false);
    setIsDrawer(true);
  };

  const busdetails = [
    {
      operator: "VKV Travels",
      operator_logo: vkvimage,
      lowprice_operator_logo: vkvimage,
      lowprice_operator: "VKV TRAVELS",
      low_price: "₹ 1300",
      left_seat: 17,
      window_seat: 5,
      operator_rating: 4.2,
      subscribers: 8.3,
      bus_depature: "18:20",
      bus_arr: "09:25",
      bus_travel_time: "10:30 Hrs",
      ac: true,
      bus_type: " A/C Sleeper",
      other_operator: [
        {
          bus_operator: "YATRA",
          bus_operator_logo: yatra,
          price: "₹ 2200",
          dis_price: "1700",
          url: "https://www.yatra.com/bus-booking",
        },
        {
          bus_operator: "ABHI BUS",
          bus_operator_logo: abhibus,
          price: "₹ 2500",
          dis_price: "1950",
        },
        {
          bus_operator: "GOIBIBO",
          bus_operator_logo: goibibo,
          price: "₹ 2200",
          dis_price: "1500",
        },
        {
          bus_operator: "MAKE MY TRIP",
          bus_operator_logo: makemy,
          price: "₹ 2300",
          dis_price: "2000",
        },
        {
          bus_operator: "ZING BUS",
          bus_operator_logo: zink,
          price: "₹ 2200",
          dis_price: "1900",
        },
        {
          bus_operator: "CLEAR TRIP",
          bus_operator_logo: clear,
          price: "₹ 2500",
          dis_price: "1650",
        },
        {
          bus_operator: "ORANGE TRAVELS",
          bus_operator_logo: orange,
          price: "₹ 2200",
          dis_price: "1600",
        },
        {
          bus_operator: "SHARMA TRAVELS",
          bus_operator_logo: sharma,
          price: "₹ 2500",
          dis_price: "1550",
        },
      ],
    },
    {
      operator: "KPN Travels",
      operator_logo: vkvimage,
      lowprice_operator_logo: abhibus,
      lowprice_operator: "ORANGE TRAVELS",
      low_price: "₹ 1300",
      left_seat: 22,
      window_seat: 10,
      operator_rating: 3.1,
      subscribers: 6.8,
      bus_depature: "21:20",
      bus_arr: "11:25",
      bus_travel_time: "12:20 Hrs",
      bus_type: " A/C Sleeper",
      ac: true,
      other_operator: [
        {
          bus_operator: "YATRA",
          bus_operator_logo: yatra,
          price: "₹ 2200",
          dis_price: "1700",
          url: "https://www.yatra.com/bus-booking",
        },
        {
          bus_operator: "ABHI BUS",
          bus_operator_logo: abhibus,
          price: "₹ 2500",
          dis_price: "1950",
        },
        {
          bus_operator: "GOIBIBO",
          bus_operator_logo: goibibo,
          price: "₹ 2200",
          dis_price: "1500",
        },
        {
          bus_operator: "MAKE MY TRIP",
          bus_operator_logo: makemy,
          price: "₹ 2300",
          dis_price: "2000",
        },
        {
          bus_operator: "ZING BUS",
          bus_operator_logo: zink,
          price: "₹ 2200",
          dis_price: "1900",
        },
        {
          bus_operator: "CLEAR TRIP",
          bus_operator_logo: clear,
          price: "₹ 2500",
          dis_price: "1650",
        },
        {
          bus_operator: "ORANGE TRAVELS",
          bus_operator_logo: orange,
          price: "₹ 2200",
          dis_price: "1600",
        },
        {
          bus_operator: "SHARMA TRAVELS",
          bus_operator_logo: sharma,
          price: "₹ 2500",
          dis_price: "1550",
        },
      ],
    },
    {
      operator: "KPN Travels",
      operator_logo: vkvimage,
      lowprice_operator_logo: abhibus,
      lowprice_operator: "Abhi Bus",
      low_price: "₹ 1300",
      left_seat: 8,
      window_seat: 2,
      operator_rating: 1.7,
      subscribers: 5.4,
      bus_depature: "03:20",
      bus_arr: "10:25",
      bus_travel_time: "15:25 Hrs",
      bus_type: " A/C Sleeper",
      ac: false,
      other_operator: [
        {
          bus_operator: "YATRA",
          bus_operator_logo: yatra,
          price: "₹ 2200",
          dis_price: "1800",
          url: "https://www.yatra.com/bus-booking",
        },
        {
          bus_operator: "ABHI BUS",
          bus_operator_logo: abhibus,
          price: "₹ 2500",
          dis_price: "1950",
        },
        {
          bus_operator: "GOIBIBO",
          bus_operator_logo: goibibo,
          price: "₹ 2200",
          dis_price: "1800",
        },
        {
          bus_operator: "MAKE MY TRIP",
          bus_operator_logo: makemy,
          price: "₹ 2300",
          dis_price: "1850",
        },
        {
          bus_operator: "ZING BUS",
          bus_operator_logo: zink,
          price: "₹ 2200",
          dis_price: "1800",
        },
        {
          bus_operator: "CLEAR TRIP",
          bus_operator_logo: clear,
          price: "₹ 2500",
          dis_price: "1950",
        },
        {
          bus_operator: "ORANGE TRAVELS",
          bus_operator_logo: orange,
          price: "₹ 2200",
          dis_price: "1800",
        },
        {
          bus_operator: "ABHI BUS",
          bus_operator_logo: abhibus,
          price: "₹ 2500",
          dis_price: "1,950",
        },
      ],
    },
    {
      operator: "KPN Travels",
      operator_logo: vkvimage,
      lowprice_operator_logo: abhibus,
      lowprice_operator: "Abhi Bus",
      low_price: "₹ 1300",
      left_seat: 8,
      window_seat: 2,
      operator_rating: 4.7,
      subscribers: 5.4,
      bus_depature: "03:20",
      bus_arr: "10:25",
      bus_travel_time: "15:25 Hrs",
      bus_type: " A/C Sleeper",
      ac: false,
      other_operator: [
        {
          bus_operator: "YATRA",
          bus_operator_logo: yatra,
          price: "₹ 2200",
          dis_price: "1800",
          url: "https://www.yatra.com/bus-booking",
        },
        {
          bus_operator: "ABHI BUS",
          bus_operator_logo: abhibus,
          price: "₹ 2500",
          dis_price: "1950",
        },
        {
          bus_operator: "GOIBIBO",
          bus_operator_logo: goibibo,
          price: "₹ 2200",
          dis_price: "1800",
        },
        {
          bus_operator: "MAKE MY TRIP",
          bus_operator_logo: makemy,
          price: "₹ 2300",
          dis_price: "1850",
        },
        {
          bus_operator: "ZING BUS",
          bus_operator_logo: zink,
          price: "₹ 2200",
          dis_price: "1800",
        },
        {
          bus_operator: "CLEAR TRIP",
          bus_operator_logo: clear,
          price: "₹ 2500",
          dis_price: "1950",
        },
        {
          bus_operator: "ORANGE TRAVELS",
          bus_operator_logo: orange,
          price: "₹ 2200",
          dis_price: "1800",
        },
        {
          bus_operator: "ABHI BUS",
          bus_operator_logo: abhibus,
          price: "₹ 2500",
          dis_price: "1,950",
        },
      ],
    },
  ];
  const [sampledata, setSampleData] = useState("");
  const [bookseatmodal, setBookSeatModal] = useState(null);
  const [seatplatform, setSeatPlatform] = useState("");
  const [type, setType] = useState("");
  const [currentrate, SetCurrentRate] = useState("All");
  const [busprice, setBusPrice] = useState({
    price: "",
    discount: "",
  });
  console.log(busprice, "Checkiong wehfher the soaksatekis working wor not ");
  const getData = useSelector((state) => state.get_filter_data);
  console.log(getData, "getdataisworkingproperly");
  const dispatch = useDispatch();
  const fil = ["Shollinganallur", "Thuraipakkam"];
  const filterlist = fulldata.filter((item) =>
    item.Pickup_Point.some((point) => fil.includes(point))
  );
  const colorcode = platformTheme(seatplatform);
  // Assuming platform is a color code like "#ED5A24"
  const baseColor = tinycolor(colorcode);
  const lightColor = baseColor.lighten(41).toString(); //
  const redirectTravelPage = (bus_operator) => {
    if (bus_operator == "YATRA") {
      window.open("https://www.yatra.com/bus-booking", "_blank");
    } else if (bus_operator == "ABHI BUS") {
      // window.open("https://www.abhibus.com/bus_search/Chennai/6/Bangalore/7/11-03-2024/O", "_blank");
      window.open("https://www.abhibus.com/", "_blank");
    } else if (bus_operator == "GOIBIBO") {
      window.open("https://www.goibibo.com/bus/", "_blank");
    } else if (bus_operator == "MAKE MY TRIP") {
      window.open("https://www.makemytrip.com/bus-tickets/", "_blank");
    } else if (bus_operator == "ZING BUS") {
      window.open("https://www.zingbus.com/", "_blank");
    } else if (bus_operator == "CLEAR TRIP") {
      window.open("https://www.cleartrip.com/bus", "_blank");
    } else if (bus_operator == "ORANGE TRAVELS") {
      window.open("https://www.orangetravels.in/#/", "_blank");
    } else if (bus_operator == "VKV TRAVELS") {
      window.open("https://www.vkvtravels.in/", "_blank");
    } else {
      window.open("https://www.yatra.com/bus-booking", "_blank");
    }
  };

  // const [seatData, setSeatData] = useState({})

  const seatData = {
    seater: "FALSE",
    sleeper: "TRUE",
    semi_sleeper: "FALSE",
  };
  const navigate = useNavigate();
  const handlebookseat = (bus, type) => {
    console.log(bus.Seater, "bus.Seaterbus.Seater");
    setType(type);
    navigate("/dashboard/ViewSeats");
    // setSeatData({
    //   ...seatData,
    //   seater: bus.Seater,
    //   sleeper: bus.Sleeper,
    //   semi_sleeper: bus.Semi_sleeper
    // });

    dispatch({
      type: SEAT_TYPE,
      payload: seatData,
    });

    console.log(seatData, "FetchedFull_list_data");

    if (bookseatmodal == null) {
      setBookSeatModal(bus.bus_operator_id);
    } else {
      setBookSeatModal(null);
    }
    // setBookSeatModal(bus.bus_operator_id);

    setSeatPlatform(
      type == "lowprice"
        ? bus.Bus_lowprice_name
        : bus.Bus_lowprice_name == bus?.Bus_platform_name
        ? bus.Bus_operator_name
        : bus?.Bus_platform_name
    );
    setBusPrice({
      ...busprice,
      price:
        type == "lowprice"
          ? bus.Bus_low_price
          : bus.Bus_lowprice_name == bus?.Bus_platform_name
          ? bus.Bus_operator_price
          : bus.Bus_platform_price,
      discount:
        type == "lowprice"
          ? bus.Bus_low_price
          : bus?.Bus_lowprice_name == bus?.Bus_platform_name
          ? bus.Bus_operator_price
          : bus.Bus_platform_disprice,
    });
  };

  const content = (
    <div className="grid grid-rows-4 gap-[0.5vw]">
      <div className="row-span-1">
        <div className="grid grid-cols-6">
          <div className="col-span-3"></div>
          <div className="col-span-1 items-center justify-center flex">
            <p className="font-bold text-[0.8vw]">Unisex</p>
          </div>
          <div className="col-span-1 items-center justify-center flex">
            <p className="font-bold text-[0.8vw]">Men</p>
          </div>
          <div className="col-span-1 items-center justify-center flex">
            <p className="font-bold text-[0.8vw]">Women</p>
          </div>
        </div>
      </div>
      <div className="row-span-1">
        <div className="grid grid-cols-6">
          <div className="col-span-3">Available</div>
          <div className="col-span-1 items-center justify-center flex">
            {" "}
            <img src={unisex_se} className="w-[1.5vw] h-[1.5vw]" />
          </div>
          <div className="col-span-1  items-center justify-center flex">
            {" "}
            <img src={men_se} className="w-[1.5vw] h-[1.5vw]" />
          </div>
          <div className="col-span-1  items-center justify-center flex">
            {" "}
            <img src={women_se} className="w-[1.5vw] h-[1.5vw]" />
          </div>
        </div>
      </div>
      <div className="row-span-1">
        <div className="grid grid-cols-6">
          <div className="col-span-3">Selected</div>
          <div className="col-span-1  items-center justify-center flex">
            <img src={unisex_se_sel} className="w-[1.5vw] h-[1.5vw]" />
          </div>
          <div className="col-span-1  items-center justify-center flex">
            <img src={men_se_sel} className="w-[1.5vw] h-[1.5vw]" />
          </div>
          <div className="col-span-1  items-center justify-center flex">
            <img src={women_se_sel} className="w-[1.5vw] h-[1.5vw]" />
          </div>
        </div>
      </div>
      <div className="row-span-1">
        <div className="grid grid-cols-6">
          <div className="col-span-3">Booked</div>
          <div className="col-span-1  items-center justify-center flex">
            <img src={unisex_book} className="w-[1.5vw] h-[1.5vw]" />
          </div>
          <div className="col-span-1  items-center justify-center flex">
            <img src={men_se_book} className="w-[1.5vw] h-[1.5vw]" />
          </div>
          <div className="col-span-1  items-center justify-center flex">
            <img src={women_se_book} className="w-[1.5vw] h-[1.5vw]" />
          </div>
        </div>
      </div>

      {/* <div className="col-span-1">
        <div className="grid grid-rows-4">
          <p className="text-[1vw]"></p>
          <p className="text-[1vw] items-center flex ">Available</p>
          <p className="text-[1vw]">Selected</p>
          <p className="text-[1vw]">Booked</p>
        </div>
      </div>
      <div className="col-span-1">
        <div className="grid grid-rows-4">
          <div className="grid grid-cols-3">
            <p className="text-[0.8vw] font-bold">Unisex</p>
            <p className="text-[0.8vw] font-bold">Men</p>
            <p className="text-[0.8vw] font-bold">Women</p>
          </div>
          <div className="grid grid-cols-3">
            <img src={unisex_se} className="w-[2vw] h-[2vw]" />
            <img src={men_se} className="w-[1.5vw] h-[1.5vw]" />
            <img src={women_se} className="w-[1.5vw] h-[1.5vw]" />
          </div>
          <div className="grid grid-cols-3">
            <img src={unisex_se} className="w-[2vw] h-[2vw]" />
            <img src={men_se} className="w-[1.5vw] h-[1.5vw]" />
            <img src={women_se} className="w-[1.5vw] h-[1.5vw]" />
          </div>
          <div className="grid grid-cols-3  ">
            <img src={unisex_se} className="w-[2vw] h-[2vw]" />
            <img src={men_se} className="w-[1.5vw] h-[1.5vw]" />
            <img src={women_se} className="w-[1.5vw] h-[1.5vw]" />
          </div>
        </div>
      </div> */}
    </div>
  );
  // function importAll(r) {
  //   let images = {};
  //   r.keys().forEach((item, index) => {
  //     images[item.replace("./", "")] = r(item);
  //   });
  //   return images;
  // }

  // const imageslist = importAll(
  //   require.context("./path/to/images", false, /\.(png|jpe?g|svg)$/)
  // );
  // const imagelogo = ({ bus, busIndex }) => {
  //   const logoPath = bus[busIndex]?.Logo
  //     ? imageslist[`${bus[busIndex].Logo}`]
  //     : null;
  //   return logoPath;
  // };
  // const logoPath = bus[busIndex]?.Logo
  //   ? imageslist[`${bus[busIndex].Logo}`]
  //   : null;
  const convertPath = (path) => {
    const converted = "file:" + path;
    return converted;
  };
  // const ArrivalDate = (date) => {
  //   const currentDate = new Date(date);
  //   const nextDate1 = new Date();
  //   nextDate1.setDate(currentDate.getDate() + 1);
  //   return nextDate1
  // };
  // const ArrivalDate = (data) => {
  //   const date = new Date(data);
  //   date.setDate(date.getDate() + 1);
  //   const updatedDateStr = date.toISOString();
  //   return dayjs(updatedDateStr).format("DD MMM");
  // };
  const ArrivalDate = (data, time, dep_time) => {
    const date = new Date(data);
    const timing =
      Number(dep_time?.split(":")[0]) + Number(time?.split(":")[0]);

    date.setDate(date.getDate() + 1);
    const updatedDateStr = date?.toISOString();
    const formattedDate = dayjs(updatedDateStr).format("DD MMM");
    return timing > 24 ? formattedDate : dayjs(date).format("DD MMM");
  };
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
  console.log(isDrawerOpen, "isDrawerOpen");
  // bg-[#E5FFF1]
  console.log(busprice, "allbuspricearelisted");
  return (
    <>
      <div className={`bg-[#E5FFF1] w-full min-h-screen max-h-auto pb-[25vw]`}>
        {/* <Promotion /> */}
        <Advertisement />
        <div className=" relative w-full min-h-screen max-h-auto">
          <div className="h-full w-full ">
            {sampledata.length > 0 ? (
              sampledata?.map((operator, index) => (
                <div key={index}>
                  {Object.values(operator)[0]?.map((bus, busIndex) => {
                    const sortedData = [...bus].sort((a, b) => {
                      const aPrice = a.Bus_platform_disprice;
                      const bPrice = b.Bus_platform_disprice;

                      // Handling "NA" and "Sold" values
                      if (
                        (aPrice === "NA" || aPrice === "Sold") &&
                        (bPrice === "NA" || bPrice === "Sold")
                      ) {
                        return 0;
                      }
                      if (aPrice === "NA" || aPrice === "Sold") {
                        return 1; // "NA" and "Sold" come last
                      }
                      if (bPrice === "NA" || bPrice === "Sold") {
                        return -1; // "NA" and "Sold" come last
                      }

                      // Converting to numbers for comparison
                      return parseInt(aPrice) - parseInt(bPrice);
                    });

                    return (
                      <>
                        <div className="border-[0.1vw] bg-white mb-[2vw] mx-[1vw]  border-gray-300 w-full h-[56vw] rounded-[1vw]">
                          <div className="w-full h-[5vw]">
                            <div className="grid grid-cols-11 w-full  relative h-full">
                              <div className="col-span-6 relative w-full">
                                <img
                                  src={backdrop}
                                  className="h-[11.5vw] w-full"
                                />
                                {/* <div className="h-[65%] w-full bg-gradient-to-r rounded-tl-2xl  rounded-br-[150px] from-[#1E4B7F] to-[#06B8E2]"> */}
                                <div className="px-[0.6vw] py-[0.2vw]">
                                  <h6 className="text-white text-[3vw] absolute left-[1vw] top-[1vw] underline underline-offset-2">
                                    Bus Operator
                                    {/* {`file:${bus[busIndex].Logo}`} */}
                                  </h6>
                                  <h2
                                    className="text-white font-bold text-[3.5vw] absolute top-[6vw] left-[1vw]"
                                    style={{ fontFamily: "Inter" }}
                                  >
                                    {/* {item.operator.toUpperCase()} */}
                                    {bus[busIndex]?.Bus_operator_name?.length >
                                    15 ? (
                                      <Tooltip
                                        placement="top"
                                        title={bus[
                                          busIndex
                                        ]?.Bus_operator_name.toUpperCase()}
                                        className="cursor-pointer"
                                        color="#1F487C"
                                      >
                                        {`${bus[
                                          busIndex
                                        ]?.Bus_operator_name.toUpperCase().slice(
                                          0,
                                          15
                                        )}...`}
                                      </Tooltip>
                                    ) : (
                                      bus[
                                        busIndex
                                      ]?.Bus_operator_name.toUpperCase().slice(
                                        0,
                                        15
                                      )
                                    )}
                                  </h2>
                                  <img
                                    className="rounded-full w-[7vw] h-[7vw] absolute right-[10vw] top-[1vw] bg-white"
                                    // src={item.operator_logo}
                                    src={require(`../../assets/Operator_logos/${bus[busIndex]?.bus_operator_id}.png`)}
                                    // src={
                                    //   bus[
                                    //     busIndex
                                    //   ]?.Bus_lowprice_name.toUpperCase() ===
                                    //   bus[
                                    //     busIndex
                                    //   ]?.Bus_platform_name.toUpperCase()
                                    //     ? platformlogo(
                                    //         bus[busIndex]?.Bus_platform_name
                                    //       )
                                    //     : require(`../../assets/Operator_logos/${bus[busIndex]?.bus_operator_id}.png`)
                                    // }
                                    // src={require(`file:${bus[busIndex].Logo}`)}
                                  />
                                </div>
                                {/* </div> */}
                              </div>

                              <div className="col-span-3 w-full  relative  h-full items-center flex flex-col">
                                <p className="text-[2.5vw]  absolute left-[-14vw] bottom-[-20vw]">
                                  <span className="text-[2.5vw] font-semibold">
                                    {bus[busIndex]?.Bus_type}
                                  </span>
                                  {/* <span className="text-[3vw]">
                                  <TbAirConditioning
                                    size={"3vw"}
                                    // className="mx-[0.5vw] "
                                  />
                                </span> */}
                                </p>
                                <p className="text-[2.2vw] absolute top-[2vw] left-[1vw]">
                                  <span className="text-[3vw] font-semibold">
                                    {bus[busIndex]?.Available_seats}
                                  </span>
                                  <span className="text-[2.8vw] mx-[0.5vw]">
                                    Seats Left
                                  </span>
                                </p>
                                <div className="top-[7vw] absolute left-[1vw] flex items-center">
                                  <p className="text-[3vw] font-semibold">{`${bus[busIndex]?.Window_seats}`}</p>
                                  <p className="text-[2.5vw] ml-[0.6vw] ">
                                    Window Seats Left
                                  </p>
                                </div>
                              </div>
                              <div className="col-span-2 w-full items-center flex justify-center">
                                <div
                                  className={`${
                                    bus[busIndex]?.operator_rating >= 4
                                      ? "border-green-600"
                                      : bus[busIndex]?.operator_rating >= 2
                                      ? "border-orange-400"
                                      : "border-red-600"
                                  } border-[0.1vw] h-[10vw] w-[13vw] rounded-[1vw]`}
                                >
                                  <div className="h-[5vw] rounded-[1vw]">
                                    <div
                                      className={`
                            ${
                              bus[busIndex]?.operator_rating >= 4
                                ? "bg-green-600"
                                : bus[busIndex]?.operator_rating >= 2
                                ? "bg-orange-400"
                                : "bg-red-600"
                            }
                            flex  h-[5vw]  items-center justify-center`}
                                    >
                                      <MdStarRate
                                        size={"3.5vw"}
                                        style={{ color: "white" }}
                                      />
                                      <p className="text-[3.5vw] font-bold text-white ml-[0.25vw]">
                                        {bus[busIndex]?.operator_rating}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="h-[4vw] ">
                                    <div className="flex items-center justify-center h-full">
                                      <IoPersonSharp
                                        size={"3.5vw"}
                                        className={`${
                                          bus[busIndex]?.operator_rating >= 4
                                            ? "text-green-600"
                                            : bus[busIndex]?.operator_rating >=
                                              2
                                            ? "text-orange-400"
                                            : "text-red-600"
                                        }`}
                                      />
                                      <p
                                        className={`text-[3.5vw] font-bold ml-[0.5vw] ${
                                          bus[busIndex]?.operator_rating >= 4
                                            ? "text-green-600"
                                            : bus[busIndex]?.operator_rating >=
                                              2
                                            ? "text-orange-400"
                                            : "text-red-600"
                                        }`}
                                      >
                                        {`${bus[busIndex]?.operator_users}`}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          {bookseatmodal == bus[busIndex]?.bus_operator_id ? (
                            <div className=" w-full h-[50vw]  ">
                              {/* bg-[#EEEDED] */}
                              <div className=" w-full h-[30vw] ">
                                <div className="grid grid-cols-11 h-full w-full">
                                  <div className="col-span-2  w-full px-[1vw] ">
                                    <div className="bg-[#1F487C] h-[20vw] w-full items-center  cursor-pointer rounded-[0.5vw] relative">
                                      <div
                                        className="bg-[#E5FFF1] h-[4.7vw] rounded-[0.5vw] mx-[0.2vw] relative cursor-pointer"
                                        // onClick={() =>
                                        //   redirectTravelPage(
                                        //     bus[busIndex]?.Bus_low_price
                                        //   )
                                        // }
                                      >
                                        <img
                                          src={lowprice}
                                          className="absolute bottom-[2.7vw] h-[4vw] w-full"
                                        />
                                        <img
                                          // src={require(`../../assets/Operator_logos/${bus[busIndex]?.bus_operator_id}.png`)}
                                          // src={
                                          //   bus[
                                          //     busIndex
                                          //   ]?.Bus_lowprice_name.toUpperCase() ===
                                          //   bus[
                                          //     busIndex
                                          //   ]?.Bus_platform_name.toUpperCase()
                                          //     ? platformlogo(
                                          //         bus[busIndex]?.Bus_platform_name
                                          //       )
                                          //     : require(`../../assets/Operator_logos/${bus[busIndex]?.bus_operator_id}.png`)
                                          // }
                                          src={
                                            bus[
                                              busIndex
                                            ]?.Bus_lowprice_name?.toUpperCase() ==
                                            bus[
                                              busIndex
                                            ]?.Bus_operator_name?.toUpperCase()
                                              ? require(`../../assets/Operator_logos/${bus[busIndex]?.bus_operator_id}.png`)
                                              : platformlogo(
                                                  bus[busIndex]
                                                    ?.Bus_lowprice_name
                                                )
                                          }
                                          // src={convertPath(bus[busIndex].Logo)}
                                          // src={imagelogo(bus, busIndex)}
                                          className="rounded-full w-[2.5vw] h-[2.5vw] bg-white absolute bottom-[1.6vw] left-1/2 transform -translate-x-1/2 "
                                        />

                                        <h2 className="text-blue-900 text-[0.8vw] absolute bottom-0 font-bold text-center w-full">
                                          {bus[
                                            busIndex
                                          ]?.Bus_lowprice_name.toUpperCase()
                                            .length > 20 ? (
                                            <Tooltip
                                              placement="right"
                                              title={bus[
                                                busIndex
                                              ].Bus_lowprice_name.toUpperCase()}
                                              className="cursor-pointer"
                                              color="#1F487C"
                                            >
                                              {`${bus[
                                                busIndex
                                              ]?.Bus_lowprice_name.toUpperCase().slice(
                                                0,
                                                20
                                              )}...`}
                                            </Tooltip>
                                          ) : (
                                            bus[
                                              busIndex
                                            ]?.Bus_lowprice_name.toUpperCase().slice(
                                              0,
                                              20
                                            )
                                          )}
                                        </h2>
                                      </div>
                                      <div className="grid grid-cols-6 absolute bottom-0 w-full">
                                        <div className="col-span-3 w-full float-left px-[0.6vw] flex flex-col ">
                                          <h3 className="text-white text-[1.2vw] font-bold">
                                            {`₹ ${bus[busIndex]?.Bus_low_price}`}
                                          </h3>
                                        </div>
                                        <div class="col-span-3 justify-center relative cursor-pointer">
                                          <button
                                            className="absolute top-[0.5vw] transform cursor-pointer -translate-y-1/2 bg-white text-[0.9vw] px-[0.6vw] right-0 mr-[0.2vw] text-blue-950 mb-[0.25vw] font-bold rounded-[0.3vw] items-center justify-center"
                                            // onClick={() =>
                                            //   redirectTravelPage(
                                            //     bus[busIndex]?.Bus_low_price
                                            //   )
                                            // }
                                            onClick={() =>
                                              handlebookseat(
                                                bus[busIndex],
                                                "lowprice"
                                              )
                                            }
                                          >
                                            {bookseatmodal == null
                                              ? "Show Seats"
                                              : "Hide Seats"}
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="col-span-9 h-[7.25vw] mr-[0.6vw] ">
                                    <div className="grid grid-flow-col-dense grid-cols-4 h-full pb-[0.5vw] gap-[0.6vw] grid-rows-2">
                                      {sortedData.map((bus, i) => (
                                        <div
                                          key={i}
                                          className="col-span-1 row-span-1"
                                        >
                                          <button
                                            className="border-[0.1vw]  border-gray-300 w-full h-full rounded-[0.4vw]"
                                            // onClick={() =>
                                            //   redirectTravelPage(
                                            //     bus.Bus_operator_name
                                            //   )
                                            // }
                                            // onClick={() =>
                                            //   handlebookseat(bus, "platform")
                                            // }
                                          >
                                            <div className="grid grid-cols-6 h-full w-full">
                                              <div className="col-span-1 p-[0.2vw]">
                                                <img
                                                  // src={makemy}
                                                  src={
                                                    bus?.Bus_lowprice_name.toUpperCase() ===
                                                    bus?.Bus_platform_name.toUpperCase()
                                                      ? require(`../../assets/Operator_logos/${bus.bus_operator_id}.png`)
                                                      : platformlogo(
                                                          bus?.Bus_platform_name
                                                        )
                                                  }
                                                  className="rounded-full"
                                                />
                                              </div>
                                              <div className="col-span-3 ">
                                                <p className="text-[0.85vw] font-bold flex items-center pl-[0.1vw] h-full">
                                                  {/* {bus.Bus_lowprice_name ==
                                                                    bus.Bus_platform_name
                                                                      ? bus.Bus_operator_name.toUpperCase()
                                                                      : bus.Bus_platform_name.toUpperCase()} */}

                                                  {bus?.Bus_lowprice_name.toUpperCase() ===
                                                  bus?.Bus_platform_name.toUpperCase() ? (
                                                    bus?.Bus_operator_name.toUpperCase()
                                                      .length > 10 ? (
                                                      <Tooltip
                                                        placement="top"
                                                        title={bus?.Bus_operator_name?.toUpperCase()}
                                                        className="cursor-pointer"
                                                        color="#1F487C"
                                                      >
                                                        {`${bus?.Bus_operator_name?.toUpperCase().slice(
                                                          0,
                                                          10
                                                        )}...`}
                                                      </Tooltip>
                                                    ) : (
                                                      bus?.Bus_operator_name?.toUpperCase().slice(
                                                        0,
                                                        10
                                                      )
                                                    )
                                                  ) : bus?.Bus_platform_name.toUpperCase()
                                                      .length > 10 ? (
                                                    <Tooltip
                                                      placement="right"
                                                      title={bus?.Bus_platform_name.toUpperCase()}
                                                      className="cursor-pointer"
                                                      color="#1F487C"
                                                    >
                                                      {`${bus.Bus_platform_name.toUpperCase().slice(
                                                        0,
                                                        10
                                                      )}...`}
                                                    </Tooltip>
                                                  ) : (
                                                    bus?.Bus_platform_name?.toUpperCase().slice(
                                                      0,
                                                      10
                                                    )
                                                  )}
                                                </p>
                                              </div>
                                              <div className="col-span-2 items-center h-full justify-center w-full flex">
                                                <div className="grid grid-row-2">
                                                  {bus.Bus_platform_price !=
                                                  "NA" ? (
                                                    <div>
                                                      <p className="text-[0.8vw] text-right text-red-500 font-semibold line-through">
                                                        {`₹ ${bus.Bus_platform_price}`}
                                                      </p>
                                                    </div>
                                                  ) : (
                                                    ""
                                                  )}
                                                  <div className="flex">
                                                    <p className="text-[1.2vw] text-blue-900 font-bold pr-[0.2vw]">
                                                      ₹
                                                    </p>
                                                    <p className="text-[1.2vw] text-blue-900 font-bold underline underline-offset-1">
                                                      {/* {bus.Bus_platform_disprice} */}
                                                      {/* {` ${
                                                                bus.Bus_platform_disprice.toUpperCase() ==
                                                                bus.Bus_low_price.toUpperCase()
                                                                  ? bus.Bus_operator_price
                                                                  : bus.Bus_platform_disprice
                                                              }`} */}
                                                      {` ${
                                                        bus.Bus_lowprice_name.toUpperCase() ==
                                                        bus.Bus_platform_name.toUpperCase()
                                                          ? bus.Bus_operator_price
                                                          : bus.Bus_platform_disprice
                                                      }`}
                                                    </p>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </button>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="md:block hidden px-[0.5vw] pt-[0.5vw] ">
                                <div
                                  className="h-[4vw] w-full  pt-[0.5vw] border-x-[0.1vw] rounded-t-[0.5vw]  pb-[1vw] border-t-[0.1vw]"
                                  style={{
                                    // boxShadow: "0 0 10px 5px #3498db",
                                    borderColor: colorcode.theme,
                                    backgroundColor: colorcode.theme,
                                  }}
                                >
                                  <div className="grid grid-cols-2 w-full h-full  items-center">
                                    <div className="col-span-1">
                                      <div className="grid grid-cols-2 w-full h-[2vw] px-[2vw]">
                                        <div className="col-span-1 items-center  flex">
                                          <Popover
                                            placement="bottomLeft"
                                            title={
                                              <span className="text-[0.8vw]">
                                                Seater/Sleeper/Semi Sleeper Info
                                              </span>
                                            }
                                            content={content}
                                            style={{
                                              padding: "8px",
                                              margin: "0",
                                            }}
                                          >
                                            <div className="flex items-center ">
                                              <span className="">
                                                <IoIosInformationCircleOutline
                                                  color="white"
                                                  size={"1.5vw"}
                                                />
                                              </span>
                                              <span className="text-[1.2vw] font-bold text-white pl-[0.2vw] cursor-pointer">
                                                Know your seats
                                              </span>
                                            </div>
                                          </Popover>
                                        </div>
                                        <div className="col-span-1 ">
                                          <button
                                            type="button"
                                            className={`${
                                              currentrate === "All" ? " " : "  "
                                            } h-[2.5vw] w-[5vw] rounded-l-[0.5vw] font-bold  border-y-[0.1vw] border-l-[0.1vw]`}
                                            onClick={() =>
                                              SetCurrentRate("All")
                                            }
                                            style={{
                                              background:
                                                currentrate === "All"
                                                  ? colorcode.color
                                                  : "white",
                                              borderColor: colorcode.color,
                                              color:
                                                currentrate === "All"
                                                  ? colorcode.theme
                                                  : colorcode.theme,
                                            }}
                                          >
                                            All
                                          </button>
                                          <button
                                            type="button"
                                            className={`${
                                              currentrate === "amount"
                                                ? " "
                                                : "   "
                                            } h-[2.5vw] w-[5vw]  rounded-r-[0.5vw] font-bold  border-y-[0.1vw] border-r-[0.1vw]`}
                                            onClick={() =>
                                              SetCurrentRate("amount")
                                            }
                                            style={{
                                              background:
                                                currentrate === "amount"
                                                  ? colorcode.color
                                                  : "white",
                                              color:
                                                currentrate === "amount"
                                                  ? colorcode.theme
                                                  : colorcode.theme,
                                              borderColor: colorcode.color,
                                            }}
                                          >
                                            {`₹ ${busprice.discount}`}
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-span-1 flex items-center justify-center">
                                      {type == "lowprice" ? (
                                        <>
                                          <img
                                            src={
                                              type == "lowprice"
                                                ? bus[
                                                    busIndex
                                                  ]?.Bus_lowprice_name?.toUpperCase() ==
                                                  bus[
                                                    busIndex
                                                  ]?.Bus_operator_name?.toUpperCase()
                                                  ? require(`../../assets/Operator_logos/${bus[busIndex]?.bus_operator_id}.png`)
                                                  : platformlogo(
                                                      bus[busIndex]
                                                        ?.Bus_lowprice_name
                                                    )
                                                : bus[
                                                    busIndex
                                                  ]?.Bus_lowprice_name?.toUpperCase() ===
                                                  bus[
                                                    busIndex
                                                  ]?.Bus_platform_name?.toUpperCase()
                                                ? require(`../../assets/Operator_logos/${bus[busIndex]?.bus_operator_id}.png`)
                                                : platformlogo(seatplatform)
                                            }
                                            className="h-[2vw] w-[2vw] bg-white rounded-full"
                                          />
                                          <p className="text-[1.5vw] text-white font-bold pl-[1vw]">
                                            {seatplatform.toUpperCase()}
                                          </p>
                                        </>
                                      ) : (
                                        <div className="col-span-1 flex items-center justify-center">
                                          <img
                                            src={
                                              type == "lowprice"
                                                ? bus[
                                                    busIndex
                                                  ]?.Bus_lowprice_name?.toUpperCase() ==
                                                  bus[
                                                    busIndex
                                                  ]?.Bus_operator_name?.toUpperCase()
                                                  ? require(`../../assets/Operator_logos/${bus[busIndex]?.bus_operator_id}.png`)
                                                  : platformlogo(
                                                      bus[busIndex]
                                                        ?.Bus_lowprice_name
                                                    )
                                                : bus[
                                                    busIndex
                                                  ]?.Bus_lowprice_name?.toUpperCase() ===
                                                  bus[
                                                    busIndex
                                                  ]?.Bus_platform_name?.toUpperCase()
                                                ? require(`../../assets/Operator_logos/${bus[busIndex]?.bus_operator_id}.png`)
                                                : platformlogo(seatplatform)
                                            }
                                            className="h-[2.5vw] w-[2.5vw] bg-white rounded-full border-[0.1vw] border-white  "
                                          />
                                          <p className="text-[1.5vw] text-white font-bold pl-[1vw]">
                                            {seatplatform.toUpperCase()}
                                          </p>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {bus[busIndex]?.Seater == "TRUE" &&
                              bus[busIndex]?.Sleeper == "FALSE" &&
                              bus[busIndex]?.Semi_sleeper == "FALSE" ? (
                                <SeaterMobile
                                  busdetails={bus[busIndex]}
                                  seatplatform={seatplatform}
                                  type={type}
                                  busprice={busprice}
                                  logo={bus?.Bus_platform_name}
                                  imageurl={
                                    // bus[
                                    //   busIndex
                                    // ]?.Bus_lowprice_name.toUpperCase() ==
                                    // seatplatform.toUpperCase()
                                    //   ? require(`../../assets/Operator_logos/${bus[busIndex]?.bus_operator_id}.png`)
                                    //   : platformlogo(seatplatform)
                                    type == "lowprice"
                                      ? bus[
                                          busIndex
                                        ]?.Bus_lowprice_name?.toUpperCase() ==
                                        bus[
                                          busIndex
                                        ]?.Bus_operator_name?.toUpperCase()
                                        ? require(`../../assets/Operator_logos/${bus[busIndex]?.bus_operator_id}.png`)
                                        : platformlogo(
                                            bus[busIndex]?.Bus_lowprice_name
                                          )
                                      : bus[
                                          busIndex
                                        ]?.Bus_lowprice_name?.toUpperCase() ===
                                        bus[
                                          busIndex
                                        ]?.Bus_platform_name?.toUpperCase()
                                      ? require(`../../assets/Operator_logos/${bus[busIndex]?.bus_operator_id}.png`)
                                      : platformlogo(seatplatform)
                                  }
                                />
                              ) : bus[busIndex]?.Seater == "FALSE" &&
                                bus[busIndex]?.Sleeper == "TRUE" &&
                                bus[busIndex]?.Semi_sleeper == "FALSE" ? (
                                <SleeperMobile
                                  busdetails={bus[busIndex]}
                                  seatplatform={seatplatform}
                                  type={type}
                                  busprice={busprice}
                                  logo={bus?.Bus_platform_name}
                                  imageurl={
                                    // bus[busIndex]?.Bus_lowprice_name.toUpperCase() ==
                                    // seatplatform.toUpperCase()
                                    //   ? require(`../../assets/Operator_logos/${bus[busIndex]?.bus_operator_id}.png`)
                                    //   : platformlogo(seatplatform)

                                    // bus[
                                    //   busIndex
                                    // ]?.Bus_lowprice_name.toUpperCase() ===
                                    // seatplatform.toUpperCase()
                                    //   ? platformlogo(seatplatform)
                                    //   : require(`../../assets/Operator_logos/${bus[busIndex]?.bus_operator_id}.png`)

                                    type == "lowprice"
                                      ? bus[
                                          busIndex
                                        ]?.Bus_lowprice_name?.toUpperCase() ==
                                        bus[
                                          busIndex
                                        ]?.Bus_operator_name?.toUpperCase()
                                        ? require(`../../assets/Operator_logos/${bus[busIndex]?.bus_operator_id}.png`)
                                        : platformlogo(
                                            bus[busIndex]?.Bus_lowprice_name
                                          )
                                      : bus[
                                          busIndex
                                        ]?.Bus_lowprice_name?.toUpperCase() ===
                                        bus[
                                          busIndex
                                        ]?.Bus_platform_name?.toUpperCase()
                                      ? require(`../../assets/Operator_logos/${bus[busIndex]?.bus_operator_id}.png`)
                                      : platformlogo(seatplatform)
                                  }
                                />
                              ) : (
                                <SemiSleeperMobile
                                  busdetails={bus[busIndex]}
                                  seatplatform={seatplatform}
                                  type={type}
                                  busprice={busprice}
                                  logo={bus?.Bus_platform_name}
                                  imageurl={
                                    // bus[
                                    //   busIndex
                                    // ]?.Bus_lowprice_name.toUpperCase() ==
                                    // seatplatform.toUpperCase()
                                    //   ? require(`../../assets/Operator_logos/${bus[busIndex]?.bus_operator_id}.png`)
                                    //   : platformlogo(seatplatform)
                                    type == "lowprice"
                                      ? bus[
                                          busIndex
                                        ]?.Bus_lowprice_name?.toUpperCase() ==
                                        bus[
                                          busIndex
                                        ]?.Bus_operator_name?.toUpperCase()
                                        ? require(`../../assets/Operator_logos/${bus[busIndex]?.bus_operator_id}.png`)
                                        : platformlogo(
                                            bus[busIndex]?.Bus_lowprice_name
                                          )
                                      : bus[
                                          busIndex
                                        ]?.Bus_lowprice_name?.toUpperCase() ===
                                        bus[
                                          busIndex
                                        ]?.Bus_platform_name?.toUpperCase()
                                      ? require(`../../assets/Operator_logos/${bus[busIndex]?.bus_operator_id}.png`)
                                      : platformlogo(seatplatform)
                                  }
                                />
                              )}
                            </div>
                          ) : (
                            <>
                              <div className=" w-full h-[50vw]  mt-[7vw]">
                                <div className="grid grid-cols-9 h-[15vw] w-full ">
                                  <div className="col-span-2 relative ">
                                    <div className="">
                                      <p className="text-[3vw] absolute left-[3vw] text-[#1F487C] pt-[0.5vw]">
                                        {dayjs(bus[busIndex]?.date).format(
                                          "DD MMM"
                                        )}
                                      </p>
                                      <p className="font-bold absolute left-[3vw] top-[3.5vw] text-[4.5vw] text-[#1F487C] ">
                                        {/* {item.bus_depature} */}
                                        {bus[busIndex]?.Bus_Depature_time}
                                      </p>
                                      <p className="text-center text-[3vw] absolute left-[3vw] top-[8.5vw] text-[#1F487C] ">
                                        {bus[busIndex]?.Bus_Depature_place}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="col-span-5  flex items-center justify-center ">
                                    <div className="flex-col relative flex items-center w-full justify-center">
                                      <img
                                        src={bus_comp}
                                        className="h-[10vw] w-full pl-[3vw]"
                                      />
                                      <p className="text-center text-[3.5vw] font-bold text-[#1F487C] ">
                                        {/* {item.bus_travel_time} */}
                                        {bus[busIndex]?.Bus_travel_time}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="col-span-2 relative">
                                    <div className="r">
                                      <p className="text-[3vw] absolute right-[3vw]  pt-[0.5vw] text-[#1F487C] ">
                                        {dayjs(bus[busIndex]?.AR_Date).format(
                                          "DD MMM"
                                        )}
                                        {/* {ArrivalDate(
                                      bus[busIndex]?.date,
                                      bus[busIndex]?.Bus_travel_time,
                                      bus[busIndex]?.Bus_Depature_time
                                    )} */}
                                      </p>
                                      <p className="font-bold absolute right-[3vw] top-[3.5vw] text-[#1F487C]  text-[4.5vw]">
                                        {/* {item.bus_arr} */}
                                        {bus[busIndex]?.Bus_Arrival_time}
                                      </p>
                                      <p className="absolute right-[3vw] top-[8.5vw] text-[3vw] text-[#1F487C] ">
                                        {bus[busIndex]?.Bus_Arrival_place}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                                <div className="grid grid-cols-10 h-full w-full mt-[5vw]">
                                  <div className="col-span-4  w-full px-[1vw] ">
                                    <div className="bg-[#1F487C] h-[22vw] w-full items-center  cursor-pointer rounded-[1.5vw] relative">
                                      <div
                                        className="bg-white h-[15vw] rounded-t-[1.5vw] mx-[1vw] relative cursor-pointer"
                                        // onClick={() =>
                                        //   redirectTravelPage(
                                        //     bus[busIndex]?.Bus_low_price
                                        //   )
                                        // }
                                      >
                                        <img
                                          src={lowprice}
                                          className="absolute bottom-[7vw] h-[13vw] w-full"
                                        />
                                        <img
                                          // src={item.lowprice_operator_logo}
                                          // src={require("file://192.168.90.20//nubiznez//Operator_logos//2.png")}
                                          alt={busIndex}
                                          // src={require(`../../assets/Operator_logos/${bus[busIndex]?.bus_operator_id}.png`)}
                                          // src={
                                          //   bus[
                                          //     busIndex
                                          //   ]?.Bus_lowprice_name.toUpperCase() ===
                                          //   bus[
                                          //     busIndex
                                          //   ]?.Bus_platform_name.toUpperCase()
                                          //     ? platformlogo(
                                          //         bus[busIndex]?.Bus_platform_name
                                          //       )
                                          //     : require(`../../assets/Operator_logos/${bus[busIndex]?.bus_operator_id}.png`)
                                          // }
                                          src={
                                            bus[
                                              busIndex
                                            ]?.Bus_lowprice_name?.toUpperCase() ==
                                            bus[
                                              busIndex
                                            ]?.Bus_operator_name?.toUpperCase()
                                              ? require(`../../assets/Operator_logos/${bus[busIndex]?.bus_operator_id}.png`)
                                              : platformlogo(
                                                  bus[busIndex]
                                                    ?.Bus_lowprice_name
                                                )
                                          }
                                          // src={require("file://192.168.90.20//nubiznez//Operator_logos//16.png")}
                                          onError={(e) => {
                                            console.error(
                                              "Image load error:",
                                              e.target.src
                                            );
                                          }} // Debugging
                                          className="rounded-full w-[7vw] bg-white h-[7vw] absolute bottom-[4.5vw] left-1/2 transform -translate-x-1/2 "
                                        />
                                        {/* <img
                                                src={encodeURI(
                                                  bus[busIndex]?.Logo.replace(
                                                    /\\\\/g,
                                                    "file:\\"
                                                  )
                                                )}
                                                className="rounded-full w-[2.5vw] h-[2.5vw] absolute bottom-[1.6vw] left-1/2 transform -translate-x-1/2"
                                              /> */}
                                        {/* <img
                                                key={busIndex}
                                                src={bus[busIndex]?.Logo.replace(
                                                  /\\\\/g,
                                                  "http://"
                                                )}
                                                className="rounded-full w-[2.5vw] h-[2.5vw] absolute bottom-[1.6vw] left-1/2 transform -translate-x-1/2"
                                                alt="Bus Logo"
                                              /> */}

                                        <h2 className="text-blue-900 text-[3vw] absolute bottom-0 font-bold text-center w-full">
                                          {/* {item.lowprice_operator} */}
                                          {/* {bus[
                                                  busIndex
                                                ]?.Bus_lowprice_name.toUpperCase()} */}

                                          {bus[
                                            busIndex
                                          ]?.Bus_lowprice_name.toUpperCase()
                                            .length > 15 ? (
                                            <Tooltip
                                              placement="right"
                                              title={bus[
                                                busIndex
                                              ].Bus_lowprice_name.toUpperCase()}
                                              className="cursor-pointer"
                                              color="#1F487C"
                                            >
                                              {`${bus[
                                                busIndex
                                              ]?.Bus_lowprice_name.toUpperCase().slice(
                                                0,
                                                15
                                              )}...`}
                                            </Tooltip>
                                          ) : (
                                            bus[
                                              busIndex
                                            ]?.Bus_lowprice_name.toUpperCase().slice(
                                              0,
                                              15
                                            )
                                          )}
                                        </h2>
                                      </div>
                                      <div className="grid grid-cols-6 absolute bottom-0 w-full">
                                        <div className="col-span-3 w-full float-left px-[1.5vw] flex flex-col ">
                                          <h3 className="text-white text-[4.5vw] font-bold">
                                            {`₹ ${bus[busIndex]?.Bus_low_price}`}
                                            {/* {`₹ ${
                                                  bus[busIndex]?.Bus_lowprice_name ==
                                                  bus[busIndex]?.Bus_operator_name
                                                    ? bus[busIndex]?.Bus_operator_price
                                                    : bus[busIndex]?.Bus_low_price
                                                }`} */}
                                          </h3>
                                        </div>
                                        <div class="col-span-3 justify-center relative cursor-pointer">
                                          {/* <Link to={{ pathname: '/dashboard/ViewSeats', state: seatData }} > */}
                                          <button
                                            className="absolute top-[3.2vw] py-[0.3vw] transform cursor-pointer -translate-y-1/2 bg-white text-[2.8vw] px-[1vw] right-[1vw]  text-blue-950 mb-[0.25vw] font-bold rounded-[1vw] items-center justify-center"
                                            // onClick={() =>
                                            //   redirectTravelPage(
                                            //     bus[busIndex]?.Bus_low_price
                                            //   )
                                            // }
                                            onClick={() =>
                                              handlebookseat(
                                                bus[busIndex],
                                                "lowprice"
                                              )
                                            }
                                          >
                                            Show Seats
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="col-span-6 w-[95%] justify-center h-[22vw] new-scrollbar1 overflow-y-auto mr-[0.6vw] ">
                                    <div className=" h-full w-full  pb-[1vw] gap-[0.6vw] ">
                                      {sortedData.map((bus, i) => (
                                        <div
                                          key={i}
                                          className="h-[10.5vw] mb-[1vw] w-full"
                                        >
                                          <Link to="/dashboard/ViewSeats">
                                            <button
                                              className="border-[0.3vw]   border-gray-300 w-full h-full rounded-[1.5vw]"
                                              // onClick={() =>
                                              //   redirectTravelPage(
                                              //     bus.Bus_operator_name
                                              //   )
                                              // }
                                              onClick={() =>
                                                handlebookseat(bus, "platform")
                                              }
                                            >
                                              <div className="grid grid-cols-6 h-full w-full">
                                                <div className="col-span-1 p-[0.6vw]  flex items-center ">
                                                  <img
                                                    // src={makemy}
                                                    src={
                                                      bus?.Bus_lowprice_name.toUpperCase() ===
                                                      bus?.Bus_platform_name.toUpperCase()
                                                        ? require(`../../assets/Operator_logos/${bus.bus_operator_id}.png`)
                                                        : platformlogo(
                                                            bus?.Bus_platform_name
                                                          )
                                                    }
                                                    className="rounded-full"
                                                  />
                                                </div>
                                                <div className="col-span-3 ">
                                                  <p className="text-[3vw] font-bold flex items-center pl-[0.1vw] h-full">
                                                    {/* {bus.Bus_lowprice_name ==
                    bus.Bus_platform_name
                      ? bus.Bus_operator_name.toUpperCase()
                      : bus.Bus_platform_name.toUpperCase()} */}

                                                    {bus?.Bus_lowprice_name.toUpperCase() ===
                                                    bus?.Bus_platform_name.toUpperCase() ? (
                                                      bus?.Bus_operator_name.toUpperCase()
                                                        .length > 10 ? (
                                                        <Tooltip
                                                          placement="top"
                                                          title={bus.Bus_operator_name.toUpperCase()}
                                                          className="cursor-pointer"
                                                          color="#1F487C"
                                                        >
                                                          {`${bus.Bus_operator_name.toUpperCase().slice(
                                                            0,
                                                            10
                                                          )}...`}
                                                        </Tooltip>
                                                      ) : (
                                                        bus.Bus_operator_name.toUpperCase().slice(
                                                          0,
                                                          10
                                                        )
                                                      )
                                                    ) : bus?.Bus_platform_name.toUpperCase()
                                                        .length > 10 ? (
                                                      <Tooltip
                                                        placement="right"
                                                        title={bus.Bus_platform_name.toUpperCase()}
                                                        className="cursor-pointer"
                                                        color="#1F487C"
                                                      >
                                                        {`${bus?.Bus_platform_name.toUpperCase().slice(
                                                          0,
                                                          10
                                                        )}...`}
                                                      </Tooltip>
                                                    ) : (
                                                      bus?.Bus_platform_name.toUpperCase().slice(
                                                        0,
                                                        10
                                                      )
                                                    )}
                                                  </p>
                                                </div>
                                                <div className="col-span-2 items-center h-full justify-center w-full flex">
                                                  <div className="grid grid-row-2">
                                                    {bus?.Bus_platform_price !=
                                                    "NA" ? (
                                                      <div>
                                                        <p className="text-[3vw] text-right text-red-500 font-semibold line-through">
                                                          {`₹ ${bus.Bus_platform_price}`}
                                                        </p>
                                                      </div>
                                                    ) : (
                                                      ""
                                                    )}
                                                    <div className="flex">
                                                      <p className="text-[4vw] text-blue-900 font-bold pr-[0.2vw]">
                                                        ₹
                                                      </p>
                                                      <p className="text-[4vw] text-blue-900 font-bold underline underline-offset-1">
                                                        {/* {bus.Bus_platform_disprice} */}
                                                        {` ${
                                                          bus.Bus_lowprice_name.toUpperCase() ==
                                                          bus.Bus_platform_name.toUpperCase()
                                                            ? bus.Bus_operator_price
                                                            : bus.Bus_platform_disprice
                                                        }`}
                                                      </p>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                            </button>
                                          </Link>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </>
                          )}
                        </div>
                      </>
                    );
                  })}
                </div>
              ))
            ) : (
              <>
                <div className="flex justify-center items-center mt-[12vw]">
                  <p className="text-[1.5vw] text-red-500">No Buses Found</p>
                </div>
              </>
            )}
          </div>

          {/* <div className="absolute flex flex-row bottom-0 md:hidden block">
            <div className="flex w-[98vw] bg-[#1F487C] h-[20vw] fixed rounded-lg bottom-[0.5vw]  ml-[1vw] mr-[4vw]">
              <div className="w-[19vw] ml-[2vw] mr-[1vw] mt-[2vw] flex-shrink-0 h-[15vw] rounded-lg">
                <div className="" style={{ height: "40vw", width: "55vw" }}>
                  <button
                    className="h-[15vw] w-[18vw] px-[1vw] pt-[1vw] rounded-lg bg-[#cbd5e1]"
                    style={{ borderRadius: "1.5vw" }}
                  >
                    sort
                  </button>
                </div>
              </div>
              <div className="w-[19vw] mr-[1vw] mt-[2vw]  flex-shrink-0 h-[15vw] rounded-lg">
                <div className="" style={{ height: "40vw", width: "55vw" }}>
                  <button
                    className="h-[15vw] w-[18vw] px-[1vw] pt-[1vw] rounded-lg bg-[#cbd5e1]"
                    style={{ borderRadius: "1.5vw" }}
                    onClick={toggleDrawer}
                  >
                    Filter
                  </button>
                </div>
              </div>
              <div className="w-[19vw] mr-[1vw] mt-[2vw]  flex-shrink-0 h-[15vw] rounded-lg">
                <div className="" style={{ height: "40vw", width: "55vw" }}>
                  <button
                    className="h-[15vw] w-[18vw] px-[1vw] pt-[1vw] rounded-lg bg-[#cbd5e1]"
                    style={{ borderRadius: "1.5vw" }}
                  >
                    Map
                  </button>
                </div>
              </div>
            </div>
            <div className="flex w-[80.5vw] ml-[74vw] h-[20vw] fixed bottom-[0.5vw] ">
              <div className="w-[20vw] flex-shrink-0 h-[20vw]">
                <div className="h-[20vw] w-[25vw] pl-[2.5vw] rounded-r-lg bg-[#c2410c]">
                  <p className="text-white p-[3vw]">sort & Filters</p>
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </div>

      <Drawer
        closable
        destroyOnClose
        title={<p>Filter</p>}
        placement="bottom"
        width={"100%"}
        height={drawerHeight}
        style={{
          backgroundColor: "#E5FFF1",
        }}
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      >
        <SidebarMobile />
      </Drawer>

      {/* <Drawer
        closable
        destroyOnClose
        title={<p>Filter</p>}
        placement="bottom"
        width={"100%"}
        height={drawerHeight}
        style={{
          backgroundColor: "#E5FFF1"
        }}
        open={isDrawer}
        onClose={() => 
          setIsDrawer(false)
        }
      >
        <p>Hi</p>
      </Drawer> */}
    </>
  );
};
export default DashboardMobile;
