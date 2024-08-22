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
import { BUS_LIST, GET_DATA, GET_FILTER_DATA } from "../../Store/type";
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
import DashboardMobile from "./DashboardMobile";
import Advertisement from "../Advertisement/Ads";
const Dashboard = () => {
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
  const getData = useSelector((state) => state.get_filter_data);
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

  // const platformlogo = (logo) => {
  //   if (logo == "Red bus") {
  //     return redbus;
  //   } else if (logo == "Abhi bus") {
  //     return abhibus;
  //   } else if (logo == "Makemytrip") {
  //     return makemy;
  //   } else if (logo == "GOIBIBO") {
  //     return goibibo;
  //   } else if (logo == "CLEAR TRIP") {
  //     return clear;
  //   } else if (logo == "Yatra") {
  //     return yatra;
  //   } else if (logo == "Paytm") {
  //     return paytm;
  //   } else if (logo == "ixigo") {
  //     return ixigo;
  //   }
  // };

  const handlebookseat = (bus, type) => {
    setType(type);
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
  console.log(sampledata, "sampledata");
  return (
    <>
      <div
        className={`bg-[#E5FFF1] md:block hidden px-[0.5vw] min-h-screen max-h-auto pb-[1vw] relative`}
      >
        <Advertisement />
        <div className="">
          {sampledata.length > 0 ? (
            sampledata?.map((operator, index) => (
              <div key={index}>
                {Object.values(operator)[0]?.map((bus, busIndex) => {
                  // <p key={busIndex}>{bus[busIndex]?.Bus_operator_name}</p>

                  // setPlatForm(bus);
                  const logoPath = convertPath(bus[busIndex]?.Logo);
                  // console.log("Logo Path for bus", index, ":", logoPath); // Debugging
                  // console.log("bus img", `file:${bus[busIndex].Logo}`)
                  // const sortedData = [...bus].sort((a, b) => {
                  //   // Handling "NA" values
                  //   if (
                  //     a.Bus_platform_disprice === "NA" &&
                  //     b.Bus_platform_disprice === "NA"
                  //   ) {
                  //     return 0;
                  //   }
                  //   if (a.Bus_platform_disprice === "NA") {
                  //     return -1;
                  //   }
                  //   if (b.Bus_platform_disprice === "NA") {
                  //     return 1;
                  //   }
                  //   // Converting to numbers for comparison
                  //   return (
                  //     parseInt(a.Bus_platform_disprice) -
                  //     parseInt(b.Bus_platform_disprice)
                  //   );
                  // });
                  // const sortedData = [...bus].sort((a, b) => {
                  //   // Handling "NA" values
                  //   if (
                  //     a.Bus_platform_disprice === "NA" &&
                  //     b.Bus_platform_disprice === "NA"
                  //   ) {
                  //     return 0;
                  //   }
                  //   if (a.Bus_platform_disprice === "NA") {
                  //     return 1; // "NA" comes last
                  //   }
                  //   if (b.Bus_platform_disprice === "NA") {
                  //     return -1; // "NA" comes last
                  //   }
                  //   // Converting to numbers for comparison
                  //   return (
                  //     parseInt(a.Bus_platform_disprice) -
                  //     parseInt(b.Bus_platform_disprice)
                  //   );
                  // });
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
                      <div className="border-[0.1vw] bg-white  border-gray-300 mt-[0.5vw] grid grid-row-5 h-full rounded-[0.8vw] shadow-lg hover:shadow-[-5px_10px_5px_-2px_rgba(0,0,0,0.3)]">
                        {/* <div className="grid grid-rows-5 h-full w-full"> */}
                        <div className="w-full h-[5vw]">
                          <div className="grid grid-cols-11 w-full h-full">
                            <div className="col-span-3 relative ">
                              <img
                                src={backdrop}
                                className="h-[3.8vw] w-full"
                              />
                              {/* <div className="h-[65%] w-full bg-gradient-to-r rounded-tl-2xl  rounded-br-[150px] from-[#1E4B7F] to-[#06B8E2]"> */}
                              <div className="px-[0.6vw] py-[0.2vw]">
                                <h6 className="text-white text-[1vw] absolute left-[0.6vw] top-[0.25vw] underline underline-offset-2">
                                  Bus Operator
                                  {/* {`file:${bus[busIndex].Logo}`} */}
                                </h6>
                                <h2
                                  className="text-white font-bold text-[1vw] absolute top-[2vw] left-[0.6vw]"
                                  style={{ fontFamily: "Inter" }}
                                >
                                  {/* {item.operator.toUpperCase()} */}
                                  {bus[busIndex]?.Bus_operator_name?.length >
                                  20 ? (
                                    <Tooltip
                                      placement="right"
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
                                        20
                                      )}...`}
                                    </Tooltip>
                                  ) : (
                                    bus[
                                      busIndex
                                    ]?.Bus_operator_name.toUpperCase().slice(
                                      0,
                                      20
                                    )
                                  )}
                                </h2>
                                <img
                                  className="rounded-full w-[2.6vw] h-[2.6vw] absolute right-[5vw] top-[0.4vw] bg-white"
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
                            <div className="col-span-3 justify-center h-full items-center flex flex-col">
                              <p className="text-[1vw] flex justify-center items-center">
                                <span className="text-[1.1vw] font-semibold">
                                  {/* {item.left_seat} */}
                                  {bus[busIndex]?.Available_seats}
                                </span>
                                <span className="text-[1.1vw] mx-[0.5vw]">
                                  Seats Left
                                </span>
                                {/* <MdAirlineSeatReclineExtra size={18} className="" /> */}
                                <p className="text-[1.1vw] font-semibold">{`| ${bus[busIndex]?.Window_seats}`}</p>
                                <p className="text-[1.1vw] ml-[0.6vw]">
                                  Window Seats Left
                                </p>
                                {/* <MdAirlineSeatReclineExtra size={18} className="mx-1" /> */}
                              </p>
                              <p className="text-[1.1vw] flex items-center justify-center">
                                <span className="text-[0.8vw]">
                                  {/* {item.bus_type} */}
                                  {bus[busIndex]?.Bus_type}
                                </span>
                                {/* <span className="text-[1vw]">(2 +1)</span> */}
                                <span className="text-[1vw]">
                                  <TbAirConditioning
                                    size={"1.2vw"}
                                    className="mx-[0.5vw] "
                                  />
                                </span>
                              </p>
                            </div>
                            <div className="col-span-4">
                              <div className="grid grid-cols-4">
                                <div className="col-span-1 ">
                                  <div className="items-center h-full w-full justify-center">
                                    <p className="text-[0.8vw] text-center pt-[0.5vw]">
                                      {dayjs(bus[busIndex]?.date).format(
                                        "DD MMM"
                                      )}
                                    </p>
                                    <p className="font-bold text-center text-[1vw]">
                                      {/* {item.bus_depature} */}
                                      {bus[busIndex]?.Bus_Depature_time}
                                    </p>
                                    <p className="text-center text-[0.9vw]">
                                      {bus[busIndex]?.Bus_Depature_place}
                                    </p>
                                  </div>
                                </div>
                                <div className="col-span-2 flex-col items-center w-full justify-center">
                                  <img
                                    src={ticketbus}
                                    className="h-[3.5vw] w-[20vw] "
                                  />
                                  <p className="text-center text-[1vw] font-bold">
                                    {/* {item.bus_travel_time} */}
                                    {bus[busIndex]?.Bus_travel_time}
                                  </p>
                                </div>
                                <div className="col-span-1">
                                  <div className="items-center h-full w-full justify-center">
                                    <p className="text-[0.8vw] text-center pt-[0.5vw]">
                                      {dayjs(bus[busIndex]?.AR_Date).format(
                                        "DD MMM"
                                      )}
                                      {/* {ArrivalDate(
                                        bus[busIndex]?.date,
                                        bus[busIndex]?.Bus_travel_time,
                                        bus[busIndex]?.Bus_Depature_time
                                      )} */}
                                    </p>
                                    <p className="font-bold text-center text-[1vw]">
                                      {/* {item.bus_arr} */}
                                      {bus[busIndex]?.Bus_Arrival_time}
                                    </p>
                                    <p className="text-center text-[0.9vw]">
                                      {bus[busIndex]?.Bus_Arrival_place}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="col-span-1 p-[0.5vw] w-full flex items-center float-right">
                              <div
                                className={`${
                                  bus[busIndex]?.operator_rating >= 4
                                    ? "border-green-600"
                                    : bus[busIndex]?.operator_rating >= 2
                                    ? "border-orange-400"
                                    : "border-red-600"
                                } border-[0.1vw] h-[4.2vw] w-full rounded-[0.4vw]`}
                              >
                                <div className="h-[2vw] rounded-[0.4vw]">
                                  <div
                                    className={` 
                            ${
                              bus[busIndex]?.operator_rating >= 4
                                ? "bg-green-600"
                                : bus[busIndex]?.operator_rating >= 2
                                ? "bg-orange-400"
                                : "bg-red-600"
                            } 
                            flex  h-[2vw]  items-center justify-center`}
                                  >
                                    <MdStarRate
                                      size={"1.2vw"}
                                      style={{ color: "white" }}
                                    />
                                    <p className="text-[1.1vw] font-bold text-white ml-[0.25vw]">
                                      {bus[busIndex]?.operator_rating}
                                    </p>
                                  </div>
                                </div>
                                <div className="h-[2vw] ">
                                  <div className="flex items-center justify-center h-full">
                                    <IoPersonSharp
                                      size={"1vw"}
                                      className={`${
                                        bus[busIndex]?.operator_rating >= 4
                                          ? "text-green-600"
                                          : bus[busIndex]?.operator_rating >= 2
                                          ? "text-orange-400"
                                          : "text-red-600"
                                      }`}
                                    />
                                    <p
                                      className={`text-[1.1vw] font-bold ml-[0.5vw] ${
                                        bus[busIndex]?.operator_rating >= 4
                                          ? "text-green-600"
                                          : bus[busIndex]?.operator_rating >= 2
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
                          <div className=" w-full h-[60vw]  ">
                            {/* bg-[#EEEDED] */}
                            <div className=" w-full h-[7.5vw] ">
                              <div className="grid grid-cols-11 h-full w-full">
                                <div className="col-span-2  w-full px-[1vw] ">
                                  <div className="bg-[#1F487C] h-[6.7vw] w-full items-center  cursor-pointer rounded-[0.5vw] relative">
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
                                        className="absolute bottom-[2vw] h-[4vw] w-full"
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
                                                bus[busIndex]?.Bus_lowprice_name
                                              )
                                        }
                                        // src={convertPath(bus[busIndex].Logo)}
                                        // src={imagelogo(bus, busIndex)}
                                        className="rounded-full w-[2.2vw] bg-white h-[2.2vw] absolute bottom-[1.2vw] left-1/2 transform -translate-x-1/2 "
                                      />

                                      <h2 className="text-blue-900 text-[0.9vw] absolute bottom-0 font-extrabold text-center w-full">
                                        {/* {bus[
                                          busIndex
                                        ]?.Bus_lowprice_name.toUpperCase()} */}
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
                                          {/* {`₹ ${
                                            bus[busIndex]?.Bus_lowprice_name ==
                                            bus[busIndex]?.Bus_operator_name
                                              ? bus[busIndex]
                                                  ?.Bus_operator_price
                                              : bus[busIndex]?.Bus_low_price
                                          }`} */}
                                          {`₹ ${bus[busIndex]?.Bus_low_price}`}
                                        </h3>
                                      </div>
                                      <div class="col-span-3 justify-center relative cursor-pointer">
                                        <button
                                          className="absolute top-[0.8vw] transform cursor-pointer -translate-y-1/2 bg-white text-[0.9vw] px-[0.6vw] right-0 mr-[0.2vw] text-blue-950 mb-[0.25vw] font-bold rounded-[0.3vw] items-center justify-center"
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

                                <div className="col-span-9 h-[7.25vw] mr-[0.6vw]">
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
                                          onClick={() =>
                                            handlebookseat(bus, "platform")
                                          }
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
                            <div className="px-[0.5vw] pt-[0.5vw] ">
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
                                          onClick={() => SetCurrentRate("All")}
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
                              <Seater
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
                              <Sleeper
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
                              <SemiSleeper
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
                          <div className=" w-full h-[7.5vw] ">
                            <div className="grid grid-cols-11 h-full w-full">
                              <div className="col-span-2  w-full px-[1vw] ">
                                <div className="bg-[#1F487C] h-[6.7vw] w-full items-center  cursor-pointer rounded-[0.5vw] relative">
                                  <div
                                    className="bg-[#E5FFF1] h-[4.7vw] rounded-t-[0.5vw] mx-[0.2vw] relative cursor-pointer"
                                    // onClick={() =>
                                    //   redirectTravelPage(
                                    //     bus[busIndex]?.Bus_low_price
                                    //   )
                                    // }
                                  >
                                    <img
                                      src={lowprice}
                                      className="absolute bottom-[2vw] h-[4vw] w-full"
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
                                              bus[busIndex]?.Bus_lowprice_name
                                            )
                                      }
                                      // src={require("file://192.168.90.20//nubiznez//Operator_logos//16.png")}
                                      onError={(e) => {
                                        console.error(
                                          "Image load error:",
                                          e.target.src
                                        );
                                      }} // Debugging
                                      className="rounded-full w-[2.2vw] bg-white h-[2.2vw] absolute bottom-[1.2vw] left-1/2 transform -translate-x-1/2 "
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

                                    <h2 className="text-blue-900 text-[0.9vw] absolute bottom-0 font-extrabold text-center w-full">
                                      {/* {item.lowprice_operator} */}
                                      {/* {bus[
                                        busIndex
                                      ]?.Bus_lowprice_name.toUpperCase()} */}

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
                                        {/* {`₹ ${
                                          bus[busIndex]?.Bus_lowprice_name ==
                                          bus[busIndex]?.Bus_operator_name
                                            ? bus[busIndex]?.Bus_operator_price
                                            : bus[busIndex]?.Bus_low_price
                                        }`} */}
                                      </h3>
                                    </div>
                                    <div class="col-span-3 justify-center relative cursor-pointer">
                                      <button
                                        className="absolute top-[0.8vw] transform cursor-pointer -translate-y-1/2 bg-white text-[0.9vw] px-[0.6vw] right-0 mr-[0.2vw] text-blue-950 mb-[0.25vw] font-bold rounded-[0.3vw] items-center justify-center"
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

                              <div className="col-span-9 h-[7.25vw] mr-[0.6vw]">
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
                                        onClick={() =>
                                          handlebookseat(bus, "platform")
                                        }
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
                        )}
                        {/* </div> */}
                      </div>
                    </>
                  );
                })}
              </div>
            ))
          ) : (
            <>
              {/* <div>
                <Result
                  status="500"
                  title="500"
                  subTitle="Sorry, No Data Found"
                  extra={<Button type="primary">Back Home</Button>}
                />
              </div> */}
              {/* <div class="vehicle-container_nodatabus absolute bottom-[15vw]">
                <div class="nodatabus"></div>
              </div> */}
              <div className="flex justify-center items-center mt-[12vw]">
                <p className="text-[1.5vw] text-red-500">No Buses Found</p>
              </div>
            </>
            // <div></div>
          )}
        </div>
      </div>

      <div className="md:hidden block w-full">
        <DashboardMobile />
      </div>
    </>
  );
};
export default Dashboard;
