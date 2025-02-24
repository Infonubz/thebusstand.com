import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import MobileFilterNavbar from "../Dashboard/NewDashboard/MobileFilterNavbar";
import { Tooltip } from "antd";
// import BottomNavbar from "../../Components/MobileView/BottomNavbar";
import OurLowPrice from "../../../../Assets/BusList/OurLowPrice.png";
import {
  // MdEventSeat,
  MdOutlineKeyboardDoubleArrowRight,
} from "react-icons/md";
import dayjs from "dayjs";
import { FaCaretRight } from "react-icons/fa";
import { IoPersonSharp } from "react-icons/io5";
// import { AiOutlineExclamationCircle } from "react-icons/ai";
import SINGLECARD_BG from "../../../../Assets/BusList/SINGLECARD_BG.png";
// import MobileDrawer from "./Drawer";
// import BusSeatsLayout from "../Dashboard/BusSeatsLayout/BusSeatsLayout";
// import MobileSeatLayout from "./SeatLayout";
// import SelectedCardDesign from "./SelectedCardDesign";
// import SeatIndex from "./SeatIndex";
import { useAsyncError, useLocation, useNavigate, useParams } from "react-router";
import { BsBusFront } from "react-icons/bs";
import MOBILE_CARD from "../../../../Assets/BusList/Luxury_BG.png";
import { Abhibus_GetBusList } from "../../../../Api-Abhibus/Home/HomePage";
import { Skeleton, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import MobileFilterNavbar from "../../../Common/Mobile-NavBar/MobileFilterNavbar";
import MobileCardBottomBar from "./MobileCardBottomBar";
import BottomNavbar from "../../../Common/Mobile-NavBar/BottomNavBar";
import Advertisement from "../../Advertisement/Advertisement";
import { calculateDiscountedFare } from "../../../Common/Common-Functions/TBS-Discount-Fare";
export default function MobileBusList() {
  const dispatch = useDispatch();
  const buslist = useSelector((state) => state?.get_buslist_filter);
  const tbs_discount = useSelector((state) => state?.live_per);

  const [drawername, setDrawerName] = useState("");
  const [dropDown, setDropDown] = useState(null);
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);
  const [boarding, setBoarding] = useState("");
  const [dropping, setDropping] = useState("");
  const [policy, setPoliciy] = useState("");
  const [cardDetails, setCardDetails] = useState({
    boarding_point: "",
    dropping_point: "",
    policies: "",
    bus_price: "",
    bus_type: "",
    amenities: "",
  });
  const [bus_type, setBus_type] = useState();
  const location = useLocation()
  const busdatas = location?.state || {}
  
  // const [busdatas, setBusDatas] = useState({
  //   ac: "false",
  //   from: "",
  //   to: "",
  //   from_sourceID: localStorage.getItem("departureID") || null,
  //   to_sourceID: localStorage.getItem("arrivalID") || null,
  //   date: "",
  //   seater: "",
  //   sleeper: "",
  //   semi_sleeper: "",
  //   luxury_data: false,
  // });

  const loader = useSelector((state) => state?.buslist_loader);
  const [spinner, setSpinner] = useState(sessionStorage.getItem("spinner"));
  const [spin, setSpin] = useState(false);

  const LuxuryFind = (type) =>
    type?.toLowerCase()?.includes("volvo") ||
    type?.toLowerCase()?.includes("mercedes benz") ||
    type?.toLowerCase()?.includes("washroom") ||
    type?.toLowerCase()?.includes("bharatBenz") ||
    type?.toLowerCase()?.includes("luxury");

  // useEffect(() => {
  //     setSpin(true);
  //     const timer = setTimeout(() => {
  //         setSpin(false);
  //     }, 2000);
  //     return () => clearTimeout(timer);
  // }, []);
  const currentpath = useParams();
  const BusDetails = {
    from: currentpath?.source_name,
    to: currentpath?.destination_name,
    from_sourceID: currentpath?.source_ID,
    to_sourceID: currentpath?.destionation_ID,
    date: currentpath?.trip_date,
  };

  const calculateArrival = (departureDate, departureTime, duration) => {
    try {
      const departureDateTime = new Date(`${departureDate} ${departureTime}`);
      if (isNaN(departureDateTime.getTime())) {
        throw new Error("Invalid departure date or time format.");
      }
      const [hours, minutes] = duration.split(":").map(Number);
      if (isNaN(hours) || isNaN(minutes)) {
        throw new Error("Invalid duration format.");
      }
      departureDateTime.setHours(departureDateTime.getHours() + hours);
      departureDateTime.setMinutes(departureDateTime.getMinutes() + minutes);
      const arrivalDate = departureDateTime.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "2-digit",
      });
      const arrivalTime = departureDateTime.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
      return dayjs(arrivalDate).format("DD MMM");
    } catch (error) {
      return { arrivalDate: null, arrivalTime: null };
    }
  };

  const GetBusList = async () => {
    setSpin(true);
    try {
      const data = await Abhibus_GetBusList(
        dispatch,
        BusDetails,
        BusDetails?.date
        // luxury
      );

      if (data) {
        setSpin(false);
      }
      //   navigation(
      //     `/buslist/${busdatas.from}/${busdatas.from_sourceID}/${busdatas.to}/${busdatas.to_sourceID
      //     }/${dayjs(busdatas?.date).format("YYYY-MM-DD")}`
      //   );
      // }
    } catch {
      console.error("Error fetching additional user data");
    }
  };

  useEffect(() => {
    GetBusList();
  }, []);

  const navigation = useNavigate();

  const toggleDropDown = (item) => {
    navigation("/seats", {
      state: { data: item, busdatas: busdatas },
      busboarding: item.busboarding,
      busdroping: item.busdroping,
    });
    // setDropDown(dropDown === index ? null : index);
    // setModalOpen(true);
  };
  // const closeDrawer = () => {
  //   setModalOpen(false);
  // };
  const apiUrlimage = process.env.REACT_APP_API_URL_IMAGE;
  // const apicrmimage = process.env.REACT_APP_CRM_API_URL_IMAGE;
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 768); // Assume desktop view if width > 768px

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth > 375); // Adjust this breakpoint as needed
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const backgroundImage = isDesktop
    ? `linear-gradient(to right, #F8C550, #FFEB76, #FFE173), url(${SINGLECARD_BG})`
    : `linear-gradient(to right, #F8C550, #FFEB76, #FFE173), url(${MOBILE_CARD})`;

  // const calculateDiscountedFare = (date, baseFare) => {
  //   if (!date || isNaN(new Date(date))) return baseFare;
  //   const day = new Date(date).getDay();
  //   const isWeekend = day === 0 || day === 6;
  //   const discount = isWeekend ? 0.01 : 0.02;
  //   return `₹ ${Math.round(baseFare - baseFare * discount)}`;
  // };

  // const apicrmimage = process.env.REACT_APP_CRM_API_URL_IMAGE;
  const formatTime = (timeString) => {
    const [hours, minutes] = timeString.split(":").map(Number);
    return minutes === 0 ? `${hours}h` : `${hours}h ${minutes}m`;
  };

  return (
    <>
      <div className="bg-[#E5FFF1] z-10 w-screen overflow-x-auto fixed top-[12vw] overflow-y-clip">
        <MobileFilterNavbar />
      </div>
      <div className="bg-[#E5FFF1] h-full overflow-y-clip overflow-x-clip mt-[8.5vw] -z-10">
        <Advertisement />
        <div className="">
          {/* {spin ? (
            <div className="w-screen  min-h-screen max-h-screen pb-[3vw] pl-[3vw] pr-[6vw] mt-[15vw] overflow-y-auto overflow-x-clip ">
              <span className="flex items-center justify-center ">
                <Spin
                  indicator={
                    <LoadingOutlined
                      style={{
                        fontSize: 48,
                      }}
                      spin
                    />
                  }
                />
         
              </span>
            </div>
          ) : ( */}
          <div className=" w-screen  min-h-screen max-h-auto pb-[3vw] pl-[3vw] pr-[6vw] mb-[15vw] ">
            {buslist?.length > 0 ? (
              buslist?.map((item, index) => (
                <div
                  className={`h-[45vw]  mt-[7vw] relative ${
                    // item?.bus_type_status
                    LuxuryFind(item.Bus_Type_Name) === true
                      ? // === "luxury"
                      "custom-gradient-luxury border-[#C9C9C9]"
                      : "bg-white border-[#C9C9C9] "
                    } w-full border-[0.2vw] rounded-[2vw] `}
                  style={{
                    // backgroundImage: `linear-gradient(to right, #F8C550, #FFEB76, #FFE173), url(${SINGLECARD_BG})`,
                    backgroundImage: backgroundImage,
                    backgroundBlendMode: "overlay", // Add this line to blend the color and image
                    //   zIndex: 2,
                  }}
                >
                  {spin === true ? (
                    <div className="w-screen min-h-screen max-h-auto pb-[3vw] pl-[3vw] pr-[6vw] mb-[15vw]">
                      <Skeleton
                        loading={spin}
                        active
                        style={{ margin: "0.5vw", padding: "0.5vw" }}
                        paragraph={{ rows: 4 }}
                        avatar
                      ></Skeleton>
                    </div>
                  ) : (
                    <>
                      <svg
                        width="65vw"
                        height="15vw"
                        viewBox="0 0 244 35"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="absolute left-[-0.4vw] top-[-7.5vw]"
                      >
                        {
                          // item?.bus_type_status !== "luxury"
                          LuxuryFind(item.Bus_Type_Name) !== true ? (
                            <>
                              <path
                                d="M243.545 0.0266113H10.0329C4.49197 0.0266113 0.000183105 4.51841 0.000183105 10.0593V34.4801H233.512C239.053 34.4801 243.545 29.9883 243.545 24.4474V0.0266113Z"
                                fill="url(#paint0_linear_6296_312)"
                              />
                              <defs>
                                <linearGradient
                                  id="paint0_linear_6296_312"
                                  x1="243.545"
                                  y1="17.2534"
                                  x2="0.000183105"
                                  y2="17.2534"
                                  gradientUnits="userSpaceOnUse"
                                >
                                  <stop stopColor="#039FC0" />
                                  <stop offset="1" stopColor="#1E4A7E" />
                                </linearGradient>
                              </defs>
                            </>
                          ) : (
                            <>
                              <mask id="path-1-inside-1_6296_632" fill="white">
                                <path d="M0.000244141 16.6806C0.000244141 10.8912 0.000244141 7.99658 1.16259 5.80129C2.10059 4.02972 3.54937 2.58094 5.32095 1.64293C7.51623 0.480591 10.4109 0.480591 16.2002 0.480591H243V18.2806C243 24.0699 243 26.9646 241.838 29.1599C240.9 30.9315 239.451 32.3802 237.68 33.3182C235.484 34.4806 232.59 34.4806 226.8 34.4806H0.000244141V16.6806Z" />
                              </mask>
                              <g filter="url(#filter0_i_6296_632)">
                                <path
                                  d="M0.000244141 16.6806C0.000244141 10.8912 0.000244141 7.99658 1.16259 5.80129C2.10059 4.02972 3.54937 2.58094 5.32095 1.64293C7.51623 0.480591 10.4109 0.480591 16.2002 0.480591H243V18.2806C243 24.0699 243 26.9646 241.838 29.1599C240.9 30.9315 239.451 32.3802 237.68 33.3182C235.484 34.4806 232.59 34.4806 226.8 34.4806H0.000244141V16.6806Z"
                                  fill="url(#paint0_linear_6296_632)"
                                />
                              </g>
                              <path
                                d="M-0.999756 10.4806C-0.999756 4.40546 3.92511 -0.519409 10.0002 -0.519409H244L242 1.48059H10.0002C5.02968 1.48059 1.00024 5.51003 1.00024 10.4806H-0.999756ZM243 34.4806H0.000244141H243ZM-0.999756 34.4806V10.4806C-0.999756 4.40546 3.92511 -0.519409 10.0002 -0.519409V1.48059C5.02968 1.48059 1.00024 5.51003 1.00024 10.4806V34.4806H-0.999756ZM244 -0.519409V23.4806C244 29.5557 239.075 34.4806 233 34.4806C237.971 34.4806 242 30.0034 242 24.4806V1.48059L244 -0.519409Z"
                                fill=""
                                mask="url(#path-1-inside-1_6296_632)"
                              />
                              <defs>
                                <filter
                                  id="filter0_i_6296_632"
                                  x="0.000244141"
                                  y="0.480591"
                                  width="243"
                                  height="38"
                                  filterUnits="userSpaceOnUse"
                                  colorInterpolationFilters="sRGB"
                                >
                                  <feFlood
                                    floodOpacity="0"
                                    result="BackgroundImageFix"
                                  />
                                  <feBlend
                                    mode="normal"
                                    in="SourceGraphic"
                                    in2="BackgroundImageFix"
                                    result="shape"
                                  />
                                  <feColorMatrix
                                    in="SourceAlpha"
                                    type="matrix"
                                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                    result="hardAlpha"
                                  />
                                  <feOffset dy="4" />
                                  <feGaussianBlur stdDeviation="3" />
                                  <feComposite
                                    in2="hardAlpha"
                                    operator="arithmetic"
                                    k2="-1"
                                    k3="1"
                                  />
                                  <feColorMatrix
                                    type="matrix"
                                    values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.6 0"
                                  />
                                  <feBlend
                                    mode="normal"
                                    in2="shape"
                                    result="effect1_innerShadow_6296_632"
                                  />
                                </filter>
                                <linearGradient
                                  id="paint0_linear_6296_632"
                                  x1="6.07525"
                                  y1="1.18892"
                                  x2="13.8957"
                                  y2="63.1516"
                                  gradientUnits="userSpaceOnUse"
                                >
                                  <stop stopColor="#E3E3E3" />
                                  <stop offset="0.18" stopColor="#EAEFF3" />
                                  <stop offset="0.315" stopColor="#E3E3E3" />
                                  <stop offset="0.491919" stopColor="white" />
                                  <stop offset="0.615" stopColor="#DEDEDE" />
                                  <stop offset="0.785" stopColor="#E3E3E3" />
                                  <stop offset="0.955" stopColor="#E3E3E3" />
                                </linearGradient>
                              </defs>
                            </>
                          )
                        }
                      </svg>
                      <svg
                        width="5.3vw"
                        height="5.3vw"
                        viewBox="0 0 20 19"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className=" absolute top-[-5vw] right-[21vw]"
                      >
                        <path
                          d="M19.2656 18.2311L0.89713 0.835146L0.768959 18.2218L10.4931 18.2267L19.2656 18.2311Z"
                          fill={
                            // item?.bus_type_status === "luxury"
                            LuxuryFind(item.Bus_Type_Name) === true
                              ? "#000"
                              : "#001938"
                          }
                        />
                      </svg>
                      <label
                        className={` absolute left-[1.5vw] top-[-4.5vw] text-[2.5vw] ${
                          // item?.bus_type_status === "luxury"
                          LuxuryFind(item.Bus_Type_Name) === true
                            ? "text-black"
                            : "text-white"
                          } underline underline-offset-2`}
                      >
                        Bus Operator
                      </label>
                      <label
                        className={` absolute left-[1.5vw] top-[-1.5vw] font-semibold text-[4vw] ${
                          // item?.bus_type_status === "luxury"
                          LuxuryFind(item.Bus_Type_Name) === true
                            ? "text-black"
                            : "text-white"
                          }`}
                      >
                        {item?.Traveler_Agent_Name}
                        <Tooltip
                          placement="bottom"
                          title={item?.operator_name}
                          className="cursor-pointer"
                          color="#1F487C"
                        >
                          {item?.operator_name?.length > 20
                            ? `${item?.operator_name?.slice(0, 20)}...`
                            : item?.operator_name}
                        </Tooltip>
                      </label>
                      <div className="absolute right-[30vw] top-[-4vw]">
                        {item?.logos != null && (
                          <img
                            src={`${apiUrlimage}${item?.logos}`}
                            // src={orange_travel_logo}
                            alt="logos"
                            className={`w-[7.5vw] h-[7.5vw] rounded-full bg-white  ${
                              // item?.bus_type_status === "luxury"
                              LuxuryFind(item.Bus_Type_Name) === true
                                ? "shadow-lg shadow-[rgba(255, 238, 201, 0.9)]"
                                : "shadow-lg shadow-[rgba(238, 237, 237, 0.7)]"
                              }`}
                          />
                        )}
                      </div>
                      <div
                        className={` absolute bottom-[7vw] left-[20vw] ${
                          // item?.bus_type_status === "luxury"
                          LuxuryFind(item.Bus_Type_Name) === true
                            ? ""
                            : "bg-[#1F487C]"
                          } rounded-tr-[2vw] rounded-br-[0.5vw]  h-[9vw] w-[75vw]`}
                        style={{
                          background:
                            // item?.bus_type_status === "luxury"
                            LuxuryFind(item.Bus_Type_Name) === true
                              ? "linear-gradient(137.95deg, #E3E3E3 2.28%, #EAEFF3 19.8%, #E3E3E3 32.94%, #FFFFFF 50.16%, #DEDEDE 62.15%, #E3E3E3 78.69%, #E3E3E3 95.24%)"
                              : "",
                        }}
                      >
                        <svg
                          width="40vw"
                          height="9vw"
                          viewBox="0 0 136 35"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className=" absolute right-[-2.5vw]"
                        >
                          <path
                            d="M0.00012207 35.0001L12.0444 0.00012207H129.98C133.305 0.00012207 136 2.6952 136 6.01975V35.0001H0.00012207Z"
                            fill="black"
                          //   fill-opacity="0.5"
                          />
                        </svg>
                        <label
                          className={`${
                            // item?.bus_type_status === "luxury"
                            LuxuryFind(item.Bus_Type_Name) === true
                              ? "text-black"
                              : "text-white"
                            } text-[4vw] absolute left-[18vw] top-[1.5vw]`}
                        >
                          Starting @
                        </label>
                        <div onClick={() => toggleDropDown(item)}>
                          <label
                            className="text-white text-[6vw] font-extrabold absolute right-[13vw] top-[0.4vw]"
                          // onClick={() => toggleDropDown(`seat${index}`)}
                          // onClick={() => toggleDropDown(item)}
                          >
                            {/* ₹ {Math.round(item?.Fare)} */}
                            {`₹ ${calculateDiscountedFare(
                              item?.BUS_START_DATE,
                              item.Fare,
                              tbs_discount
                            )}`}
                          </label>
                          <span className="absolute right-[3vw] top-[0.75vw] ">
                            <MdOutlineKeyboardDoubleArrowRight
                              color="white"
                              size={"8vw"}
                            />
                          </span>
                        </div>
                      </div>
                      <div className=" absolute bottom-[0.5vw] left-[2vw] ">
                        <div className="">
                          <img
                            src={OurLowPrice}
                            className={`h-[23vw] w-[23vw]  ${
                              // item?.bus_type_status === "luxury"
                              LuxuryFind(item.Bus_Type_Name) === true
                                ? // ? "bg-[#ffc918]"
                                "bg-gradient-to-r from-[#facf65] to-[#fde480]"
                                : "bg-white"
                              }  rounded-full `}
                          />
                        </div>
                      </div>{" "}
                      <svg
                        width="7.5vw"
                        height="6.5vw"
                        viewBox="0 0 13 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className=" absolute bottom-[0.25vw] right-[-5.75vw]"
                      >
                        <path
                          d="M12.8719 0.0335693L0.334861 17.8141C0.334861 17.8141 1.85487 12.2663 1.85487 9.70735C1.85487 6.16066 1.85487 0.0335692 1.85487 0.0335692L12.8719 0.0335693Z"
                          // fill="#001938"
                          fill={
                            // item?.bus_type_status === "luxury"
                            LuxuryFind(item.Bus_Type_Name) === true
                              ? "black"
                              : "black"
                          }
                        />
                      </svg>
                      <label
                        className={` absolute  font-bold text-[3vw] ${
                          // item?.bus_type_status === "luxury"
                          LuxuryFind(item.Bus_Type_Name) === true
                            ? "text-[#393939]"
                            : "text-[#1F487C]"
                          }`}
                        style={{
                          top: "18%",
                          left: "35%",
                          transform: "translate(-50%, -50%)",
                        }}
                      >
                        {" "}
                        {/* {item.bus_type} */}
                        <Tooltip
                          placement="bottom"
                          title={item?.bus_type}
                          className="cursor-pointer"
                          color="#1F487C"
                        >
                          {item?.bus_type?.length > 30
                            ? `${item?.bus_type?.slice(0, 30)}...`
                            : item?.bus_type}
                        </Tooltip>
                      </label>
                      <div className="absolute top-[13vw] left-[20vw]">
                        <svg
                          width="23.5vw"
                          height="8.5vw"
                          viewBox="0 0 55 29"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M5.33748 0.927734C2.77896 0.927734 0.727539 2.97916 0.727539 5.53768V19.6725C0.727539 20.7771 1.62297 21.6725 2.72754 21.6725H6.33748C6.33748 23.5064 7.06602 25.2653 8.36282 26.5621C9.65961 27.8589 11.4184 28.5874 13.2524 28.5874C15.0863 28.5874 16.8452 27.8589 18.142 26.5621C19.4388 25.2653 20.1673 23.5064 20.1673 21.6725H35.9971C35.9971 23.5064 36.7257 25.2653 38.0225 26.5621C39.3193 27.8589 41.0781 28.5874 42.9121 28.5874C44.746 28.5874 46.5049 27.8589 47.8017 26.5621C49.0984 25.2653 49.827 23.5064 49.827 21.6725H52.4369C53.5415 21.6725 54.4369 20.7771 54.4369 19.6725V5.53768C54.4369 2.97916 52.3855 0.927734 49.827 0.927734H5.33748ZM13.2524 18.215C14.1694 18.215 15.0488 18.5793 15.6972 19.2277C16.3456 19.8761 16.7099 20.7555 16.7099 21.6725C16.7099 22.5895 16.3456 23.4689 15.6972 24.1173C15.0488 24.7657 14.1694 25.1299 13.2524 25.1299C12.3354 25.1299 11.456 24.7657 10.8076 24.1173C10.1592 23.4689 9.79494 22.5895 9.79494 21.6725C9.79494 20.7555 10.1592 19.8761 10.8076 19.2277C11.456 18.5793 12.3354 18.215 13.2524 18.215ZM42.9121 18.215C43.829 18.215 44.7085 18.5793 45.3569 19.2277C46.0053 19.8761 46.3695 20.7555 46.3695 21.6725C46.3695 22.5895 46.0053 23.4689 45.3569 24.1173C44.7085 24.7657 43.829 25.1299 42.9121 25.1299C41.9951 25.1299 41.1157 24.7657 40.4673 24.1173C39.8189 23.4689 39.4546 22.5895 39.4546 21.6725C39.4546 20.7555 39.8189 19.8761 40.4673 19.2277C41.1157 18.5793 41.9951 18.215 42.9121 18.215Z"
                            fill={
                              // item?.bus_type_status === "luxury"
                              LuxuryFind(item.Bus_Type_Name) === true
                                ? "#393939"
                                : "#1F487C"
                            }
                          />
                        </svg>
                        <div className=" absolute left-[-3vw] top-[-1vw]">
                          <div
                            //  className="border-[#1F487C] border-t-[1vw] absolute left-[3vw] top-[5vw] border-dashed w-[22.5vw]"
                            className={`${
                              // item?.bus_type_status === "luxury"
                              LuxuryFind(item.Bus_Type_Name) === true
                                ? "border-[#393939]"
                                : "border-[#1F487C]"
                              } border-t-[0.5vw] absolute left-[1.9vw] z-0 top-[4.25vw] border-dashed w-[25vw]`}
                          ></div>
                        </div>
                        <label
                          className="text-white font-bold  text-[3vw] absolute"
                          style={{
                            top: "40%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                          }}
                        >
                          {formatTime(item?.TravelTime)}
                        </label>
                      </div>
                      <div className=" absolute left-[2vw] top-[12vw]">
                        <div className="col-span-1 flex-col flex items-center justify-center">
                          <label
                            // className="text-[3vw] text-[#868686]"
                            className={`text-[3.5vw] ${
                              // item?.bus_type_status === "luxury"
                              LuxuryFind(item.Bus_Type_Name) === true
                                ? "text-[#393939]"
                                : "text-[#1F487C]"
                              } font-semibold opacity-60`}
                          >
                            {dayjs(item?.BUS_START_DATE).format("DD MMM")}
                          </label>
                          <label
                            // className="text-[3.5vw] text-[#1F487C] font-bold"
                            className={`text-[4vw] ${
                              // item?.bus_type_status === "luxury"
                              LuxuryFind(item.Bus_Type_Name) === true
                                ? "text-[#393939]"
                                : "text-[#1F487C]"
                              } font-bold`}
                          >
                            {item?.Start_time}
                          </label>
                        </div>
                      </div>
                      <div className=" absolute right-[28vw] top-[12vw]">
                        <div className="col-span-1 flex-col flex items-center justify-center">
                          <label
                            // className="text-[3vw] text-[#868686]"
                            className={`text-[3.5vw] ${
                              // item?.bus_type_status === "luxury"
                              LuxuryFind(item.Bus_Type_Name) === true
                                ? "text-[#393939]"
                                : "text-[#1F487C]"
                              } font-semibold opacity-60`}
                          >
                            {/* {dayjs(item?.jdate).format("DD MMM")} */}
                            {calculateArrival(
                              item?.BUS_START_DATE,
                              item?.Start_time,
                              item?.TravelTime
                            )}
                          </label>
                          <label
                            // className="text-[3.5vw] text-[#1F487C] font-bold"
                            className={`text-[4vw] ${
                              // item?.bus_type_status === "luxury"
                              LuxuryFind(item.Bus_Type_Name) === true
                                ? "text-[#393939]"
                                : "text-[#1F487C]"
                              } font-bold`}
                          >
                            {item?.Arr_Time}
                          </label>
                        </div>
                      </div>
                      <div className="absolute left-[18.5vw] top-[12.45vw]">
                        <div
                          // className="bg-[#1F487C] absolute left-[-1vw] h-[3vw] w-[3vw] top-[4vw] rounded-full"
                          className={`${
                            // item?.bus_type_status === "luxury"
                            LuxuryFind(item.Bus_Type_Name) === true
                              ? "bg-[#393939]"
                              : "bg-[#1F487C]"
                            } absolute left-[-1.4vw] h-[2.25vw] w-[2.25vw] top-[2.8vw] rounded-full`}
                        ></div>
                      </div>
                      <div className="absolute left-[45.5vw] top-[12.2vw]">
                        <FaCaretRight
                          // color="#1F487C"
                          size={"4.5vw"}
                          color={`${
                            // item?.bus_type_status === "luxury"
                            LuxuryFind(item.Bus_Type_Name) === true
                              ? "#393939"
                              : "#1F487C"
                            }`}
                          className="absolute right-[-2.25vw] top-[2vw]"
                        />
                      </div>
                      <div className=" absolute right-[38vw] top-[12vw]">
                        <div
                          //  className="border-[#1F487C] border-t-[1vw] absolute left-[3vw] top-[5vw] border-dashed w-[22.5vw]"
                          className={`${
                            // item?.bus_type_status === "luxury"
                            LuxuryFind(item.Bus_Type_Name) === true
                              ? "border-[#393939]"
                              : "border-[#1F487C]"
                            } border-t-[0.3vw] absolute left-[3vw] top-[5.2vw] border-dashed w-[17vw]`}
                          style={{
                            transform: "rotate(90deg)",
                          }}
                        ></div>
                      </div>
                      {/* <div className=" absolute right-[0.75vw] top-[5vw]">
                                            <div
                                                className={`${item?.rating >= 4
                                                    ? "border-[#61B00F]"
                                                    : item?.rating >= 2
                                                        ? "border-orange-400"
                                                        : "border-[#61B00F]"
                                                    } border-[0.1vw] rounded-[0.4vw] flex items-center`}
                                            >
                                                <div
                                                    className={`flex  items-center gap-x-[1vw] px-[1vw]
            ${item?.rating >= 4
                                                            ? "bg-[#61B00F]"
                                                            : item?.rating >= 2
                                                                ? "bg-orange-400"
                                                                : "bg-[#61B00F]"
                                                        } 
            `}
                                                >
                                                    <div>
                                                        <MdStarRate
                                                            size={"4vw"}
                                                            style={{
                                                                color: "white",
                                                                // marginLeft: "0.5vw",
                                                            }}
                                                        />
                                                    </div>
                                                    <div>
                                                        <p className="text-[4vw] font-bold text-white">
                                                          4
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className=" bg-white">
                                                    <div className="flex items-center justify-center h-full">
                                                        <IoPersonSharp
                                                            size={"4vw"}
                                                            className={`${item?.rating >= 4
                                                                ? "text-[#61B00F]"
                                                                : item?.rating >= 2
                                                                    ? "text-orange-400"
                                                                    : "text-[#61B00F]"
                                                                } ml-[0.5vw]`}
                                                        />
                                                        <p
                                                            className={`text-[4vw] font-bold px-[1vw] ${item.rating >= 4
                                                                ? "text-[#61B00F]"
                                                                : item?.rating >= 2
                                                                    ? "text-orange-400"
                                                                    : "text-[#61B00F]"
                                                                }`}
                                                        >
                                                           
                                                            1.7K
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div> */}
                      <div className=" absolute right-[1.3vw] top-[11vw]">
                        <div className="text-[3.3vw] text-center py-[2vw]">
                          Available Seats
                        </div>
                        <div className="flex justify-center items-center bg-[#FFC1C180] rounded-full h-[5vw] px-[2vw] gap-[1vw]">
                          <div className="text-[3.3vw] text-[#C62B2B] font-bold">
                            {item?.available_seats} Seats Left
                          </div>
                        </div>
                      </div>
                      <div className=" absolute right-[1.3vw] top-[20vw]">
                        {/* {item.seat_availability.avlFemale ? ( */}
                        {/* <div className="flex gap-x-[1vw] items-center">
                                                <div
                                                    className={`${
                                                        // isluxury == "true" || isluxury == true
                                                        item?.bus_type_status === "luxury"
                                                            ? "text-[#393939]"
                                                            : "text-[#1F487C]"
                                                        } text-[3.5vw] font-bold `}
                                                >
                                                    {`${item?.seat_availability?.avlFemale
                                                        ? item?.seat_availability?.avlFemale
                                                        : "0"
                                                        }`}
                                                </div>
                                                <div
                                                    className={`${
                                                        // isluxury == "true" || isluxury == true
                                                        item?.bus_type_status === "luxury"
                                                            ? "text-[#393939]"
                                                            : "text-[#1F487C]"
                                                        } text-[3.5vw] w-full`}
                                                >
                                                    Female Seat
                                                </div>
                                            </div> */}
                        {/* ) : (
    <div className="flex gap-[0.5vw] items-center ">
      <div className="">
        <AiOutlineExclamationCircle
          size={"3.5vw"}
          color="red"
        />
      </div>
      <div className="text-[#FF0000] text-[3.5vw] w-full">
         Sold out
      </div>
    </div>
  )} */}
                      </div>
                      <div className=" absolute left-[25vw] bottom-[0.5vw]">
                        <div className="flex items-center gap-x-[4vw]">
                          {item?.Amenities ? (
                            <label
                              className={`text-[3.5vw] font-semibold`}
                              onClick={() => {
                                setDrawerName("Amenities");
                                setDrawerIsOpen(true);
                                setCardDetails((prev) => ({
                                  bus_type: item?.Bus_Type_Name,
                                  amenities: item?.Amenities,
                                }));
                              }}
                            >
                              Amenities
                            </label>
                          ) : (
                            ""
                          )}
                          <label
                            className={`text-[3.5vw] font-semibold`}
                            onClick={() => {
                              setDrawerName("pickupDrop");
                              setDrawerIsOpen(true);
                              setCardDetails((prev) => ({
                                ...prev,
                                boarding_point: item?.boarding_info,
                                dropping_point: item?.dropping_info,
                                bus_type: item?.Bus_Type_Name,
                              }));
                            }}
                          >
                            Drop & Pickup
                          </label>
                          <label
                            className={`text-[3.5vw] font-semibold`}
                            onClick={() => {
                              setDrawerName("Policies");
                              setDrawerIsOpen(true);
                              setCardDetails((prev) => ({
                                ...prev,
                                policies: item?.Cancellationpolicy,
                                bus_type: item?.Bus_Type_Name,
                                bus_price: item?.Fare,
                              }));
                            }}
                          >
                            Policies
                          </label>
                        </div>
                      </div>
                    </>
                  )}
                  {/* {dropDown === `seat${index}` && (
  <Drawer
    closable
    title={<p className="text-[4vw]">Seat Layout</p>}
    placement="bottom"
    width={"100%"}
    height={"100%"}

    open={modalopen}
    onClose={closeDrawer}
  >

    <SeatIndex item={item}/>
  </Drawer>
)} */}
                </div>
              ))
            ) : (
              <div className="flex flex-col justify-center items-center w-full ">
                <BsBusFront
                  size={"25vw"}
                  className="mt-[20vw]"
                  color="#1F487C"
                />
                <span className="font-bold text-[#1F487C] text-[5vw]">
                  {" "}
                  No Buses Are Available!
                </span>
              </div>
            )}
          </div>
          {/* )} */}
        </div>
        <BottomNavbar />
        <MobileCardBottomBar
          drawername={drawername}
          showModal={drawerIsOpen}
          setShowModal={setDrawerIsOpen}
          amenities={cardDetails?.amenities}
          boarding={cardDetails?.boarding_point}
          dropping={cardDetails?.dropping_point}
          bus_type={cardDetails?.bus_type}
          policies={cardDetails?.policies}
          price={cardDetails?.bus_price}
        />
      </div>
    </>
  );
}
