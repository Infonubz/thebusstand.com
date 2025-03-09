import { Tooltip } from "antd";
import dayjs from "dayjs";
import React, { useEffect } from "react";
import { FaCaretRight } from "react-icons/fa";
import { IoPersonSharp } from "react-icons/io5";
import { MdOutlineKeyboardDoubleArrowRight, MdStarRate } from "react-icons/md";
import SINGLECARD_BG from "../../../../Assets/BusList/SINGLECARD_BG.png"
import { IoCloseCircle } from "react-icons/io5";
import { useNavigate } from "react-router";
import { LuxuryFind } from "../../../Common/Common-Functions/LuxuryFind";

export default function SelectedCardDesign({ busData }) {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    const apiUrlimage = process.env.REACT_APP_API_URL_IMAGE;
    const navigate = useNavigate();

    const formatTime = (timeString) => {
        const [hours, minutes] = timeString?.split(":")?.map(Number);
        return minutes === 0 ? `${hours}h` : `${hours}h ${minutes}m`;
      };
    
    // const LuxuryFind = (type) =>
    //     type?.toLowerCase()?.includes("volvo") ||
    //     type?.toLowerCase()?.includes("mercedes benz") ||
    //     type?.toLowerCase()?.includes("washroom") ||
    //     type?.toLowerCase()?.includes("bharatBenz") ||
    //     type?.toLowerCase()?.includes("luxury");
    return (
        <div className="relative">
            {/* <div
        className="absolute top-[-7vw] left-[-2.25vw] z-10"
        onClick={() => navigate("/dashboard")}
      >
        <IoCloseCircle size={"5vw"} />
      </div> */}
            <div
                className={`h-[28vw]  mt-[7vw] relative ${LuxuryFind(busData?.Bus_Type_Name) === true
                    ? "custom-gradient-luxury"
                    : "bg-white"
                    } w-full border-t-[0.2vw] border-l-[0.2vw] border-r-[0.2vw] border-[#1F487C] rounded-t-[2vw] `}
                style={{
                    backgroundImage: `linear-gradient(to right, #F8C550, #FFEB76, #FFE173), url(${SINGLECARD_BG})`,
                    backgroundBlendMode: "overlay", // Add this line to blend the color and image
                    //   zIndex: 2,
                }}
            >
                <svg
                    width="69vw"
                    height="15vw"
                    viewBox="0 0 244 35"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute left-[-0.2vw] top-[-7.5vw]"
                >
                    {
                        // item?.bus_type_status !== "luxury"
                        LuxuryFind(busData.Bus_Type_Name) !== true ? (
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
                                <mask
                                    id="path-1-inside-1_6296_632"
                                    fill="white"
                                >
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
                    className=" absolute top-[-5.1vw] right-[21.7vw]"
                >
                    <path
                        d="M19.2656 18.2311L0.89713 0.835146L0.768959 18.2218L10.4931 18.2267L19.2656 18.2311Z"
                        fill="#001938"
                    />
                </svg>
                <label
                    className={` absolute left-[1.5vw] top-[-4.5vw] text-[2.5vw] ${LuxuryFind(busData?.Bus_Type_Name) === true ? "text-black" : "text-white"
                        } `}
                >
                    Bus Operator
                </label>
                <label
                    className={` absolute left-[1.5vw] top-[-1.5vw] font-semibold text-[4vw] ${LuxuryFind(busData?.Bus_Type_Name) === true ? "text-black" : "text-white"
                        }`}
                >
                    {/* {item?.Operator_name} */}
                    <Tooltip
                        placement="bottom"
                        title={busData?.Traveler_Agent_Name}
                        className="cursor-pointer"
                        color="#1F487C"
                    >
                        {busData?.Traveler_Agent_Name?.length > 20
                            ? `${busData?.Traveler_Agent_Name.slice(0, 20)}...`
                            : busData?.Traveler_Agent_Name}
                    </Tooltip>
                </label>
                <div className="absolute right-[30vw] top-[-4vw]">
                    {busData?.logos != null && (
                        <img
                            src={`${apiUrlimage}${busData?.logos}`}
                            // src={orange_travel_logo}
                            alt="logos"
                            className={`w-[7.5vw] h-[7.5vw] rounded-full bg-white  ${LuxuryFind(busData?.Bus_Type_Name) === true
                                ? "shadow-lg shadow-[rgba(255, 238, 201, 0.9)]"
                                : "shadow-lg shadow-[rgba(238, 237, 237, 0.7)]"
                                }`}
                        />
                    )}
                </div>

                <label
                    className={` absolute  font-bold text-[3vw] ${LuxuryFind(busData?.Bus_Type_Name) === true
                        ? "text-[#393939]"
                        : "text-[#1F487C]"
                        }`}
                    style={{
                        top: "28%",
                        left: "35%",
                        transform: "translate(-50%, -50%)",
                    }}
                >
                    {" "}
                    {/* {item.bus_type} */}
                    <Tooltip
                        placement="bottom"
                        title={busData?.bus_type}
                        className="cursor-pointer"
                        color="#1F487C"
                    >
                        {busData?.bus_type?.length > 30
                            ? `${busData?.bus_type.slice(0, 30)}...`
                            : busData?.bus_type}
                    </Tooltip>
                </label>
                <div className="absolute top-[13vw] left-[22.5vw]">
                    <svg
                        width="25vw"
                        height="10vw"
                        viewBox="0 0 55 29"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M5.33748 0.927734C2.77896 0.927734 0.727539 2.97916 0.727539 5.53768V19.6725C0.727539 20.7771 1.62297 21.6725 2.72754 21.6725H6.33748C6.33748 23.5064 7.06602 25.2653 8.36282 26.5621C9.65961 27.8589 11.4184 28.5874 13.2524 28.5874C15.0863 28.5874 16.8452 27.8589 18.142 26.5621C19.4388 25.2653 20.1673 23.5064 20.1673 21.6725H35.9971C35.9971 23.5064 36.7257 25.2653 38.0225 26.5621C39.3193 27.8589 41.0781 28.5874 42.9121 28.5874C44.746 28.5874 46.5049 27.8589 47.8017 26.5621C49.0984 25.2653 49.827 23.5064 49.827 21.6725H52.4369C53.5415 21.6725 54.4369 20.7771 54.4369 19.6725V5.53768C54.4369 2.97916 52.3855 0.927734 49.827 0.927734H5.33748ZM13.2524 18.215C14.1694 18.215 15.0488 18.5793 15.6972 19.2277C16.3456 19.8761 16.7099 20.7555 16.7099 21.6725C16.7099 22.5895 16.3456 23.4689 15.6972 24.1173C15.0488 24.7657 14.1694 25.1299 13.2524 25.1299C12.3354 25.1299 11.456 24.7657 10.8076 24.1173C10.1592 23.4689 9.79494 22.5895 9.79494 21.6725C9.79494 20.7555 10.1592 19.8761 10.8076 19.2277C11.456 18.5793 12.3354 18.215 13.2524 18.215ZM42.9121 18.215C43.829 18.215 44.7085 18.5793 45.3569 19.2277C46.0053 19.8761 46.3695 20.7555 46.3695 21.6725C46.3695 22.5895 46.0053 23.4689 45.3569 24.1173C44.7085 24.7657 43.829 25.1299 42.9121 25.1299C41.9951 25.1299 41.1157 24.7657 40.4673 24.1173C39.8189 23.4689 39.4546 22.5895 39.4546 21.6725C39.4546 20.7555 39.8189 19.8761 40.4673 19.2277C41.1157 18.5793 41.9951 18.215 42.9121 18.215Z"
                            fill={LuxuryFind(busData?.Bus_Type_Name) === true ? "#393939" : "#1F487C"}
                        />
                    </svg>
                    <label
                        className="w-[15vw] text-white font-bold z-[1] text-[3vw] absolute"
                        style={{
                            top: "35%",
                            left: "55%",
                            transform: "translate(-50%, -50%)",
                        }}
                    >
                        {formatTime(busData?.TravelTime)}
                    </label>
                </div>
                <div className=" absolute left-[2vw] top-[12vw]">
                    <div className="col-span-1 flex-col flex items-center justify-center">
                        <label
                            // className="text-[3vw] text-[#868686]"
                            className={`text-[3.5vw] ${LuxuryFind(busData?.Bus_Type_Name) === true
                                ? "text-[#393939]"
                                : "text-[#1F487C]"
                                } font-semibold opacity-60`}
                        >
                            {dayjs(busData?.BUS_START_DATE).format("DD MMM")}
                        </label>
                        <label
                            // className="text-[3.5vw] text-[#1F487C] font-bold"
                            className={`text-[4vw] ${LuxuryFind(busData?.Bus_Type_Name) === true
                                ? "text-[#393939]"
                                : "text-[#1F487C]"
                                } font-bold`}
                        >
                            {busData?.Start_time}
                        </label>
                    </div>
                </div>
                <div className=" absolute right-[28vw] top-[12vw]">
                    <div className="col-span-1 flex-col flex items-center justify-center">
                        <label
                            // className="text-[3vw] text-[#868686]"
                            className={`text-[3.5vw] ${LuxuryFind(busData?.Bus_Type_Name) === true
                                ? "text-[#393939]"
                                : "text-[#1F487C]"
                                } font-semibold opacity-60`}
                        >
                            {dayjs(busData?.jdate).format("DD MMM")}
                        </label>
                        <label
                            // className="text-[3.5vw] text-[#1F487C] font-bold"
                            className={`text-[4vw] ${LuxuryFind(busData?.Bus_Type_Name) === true
                                ? "text-[#393939]"
                                : "text-[#1F487C]"
                                } font-bold`}
                        >
                            {busData?.Arr_Time}
                        </label>
                    </div>
                </div>
                <div className=" absolute left-[18vw] top-[12vw]">
                    <div
                        //  className="border-[#1F487C] border-t-[1vw] absolute left-[3vw] top-[5vw] border-dashed w-[22.5vw]"
                        className={`${LuxuryFind(busData?.Bus_Type_Name) === true
                            ? "border-[#393939]"
                            : "border-[#1F487C]"
                            } border-t-[0.5vw] z-0 absolute left-[5vw] top-[5.2vw] border-dashed w-[25vw]`}
                    ></div>
                </div>
                <div className="absolute left-[18.5vw] top-[12.45vw]">
                    <div
                        // className="bg-[#1F487C] absolute left-[-1vw] h-[3vw] w-[3vw] top-[4vw] rounded-full"
                        className={`${LuxuryFind(busData?.Bus_Type_Name) === true
                            ? "bg-[#393939]"
                            : "bg-[#1F487C]"
                            } absolute left-[2.5vw] h-[2.25vw] w-[2.25vw] top-[3.8vw] rounded-full`}
                    ></div>
                </div>
                <div className="absolute left-[49vw] top-[12.2vw]">
                    <FaCaretRight
                        // color="#1F487C"
                        size={"4.5vw"}
                        color={`${LuxuryFind(busData?.Bus_Type_Name) === true ? "#393939" : "#1F487C"
                            }`}
                        className="absolute right-[-2.7vw] top-[2.8vw]"
                    />
                </div>
                <div className=" absolute right-[38vw] top-[12vw]">
                    <div
                        //  className="border-[#1F487C] border-t-[1vw] absolute left-[3vw] top-[5vw] border-dashed w-[22.5vw]"
                        className={`${LuxuryFind(busData?.Bus_Type_Name) === true
                            ? "border-[#393939]"
                            : "border-[#1F487C]"
                            } border-t-[0.3vw] absolute left-[3vw] top-[5.2vw] border-dashed w-[17vw]`}
                        style={{
                            transform: "rotate(90deg)",
                        }}
                    ></div>
                </div>
                <div className=" absolute right-[1.5vw] top-[5vw]">
                    {/* <div
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
                                    className={`text-[4vw] font-bold px-[1vw] ${item?.rating >= 4
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
                    </div> */}
                </div>
                <div className=" absolute right-[1.3vw] top-[9vw]">
                    <div className="text-[3.3vw] text-center py-[2vw]">
                        Available Seats
                    </div>
                    <div className="flex justify-center items-center bg-[#FFC1C180] rounded-full h-[5vw] px-[2vw] gap-[1vw]">
                        <div className="text-[3.3vw] text-[#C62B2B] font-bold">
                            {busData?.available_seats} Seats Left
                        </div>
                    </div>
                </div>
                <div className=" absolute right-[1.3vw] top-[20vw]">
                    {/* {item.seat_availability.avlFemale ? ( */}
                    <div className="flex gap-x-[1vw] items-center">
                        {/* <div
                            className={`${
                                // isluxury == "true" || isluxury == true
                                   LuxuryFind(item?.Bus_Type_Name) === true
                                    ? "text-[#393939]"
                                    : "text-[#1F487C]"
                                } text-[3.5vw] font-bold `}
                        >
                            {`${busData?.seat_availability?.avlFemale
                                ? busData?.seat_availability?.avlFemale
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
                        </div> */}
                    </div>
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
            </div>
        </div>
    );
}
