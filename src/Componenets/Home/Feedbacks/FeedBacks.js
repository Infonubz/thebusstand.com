import React, { useEffect, useState } from "react";
import {
    // IoIosArrowBack,
    IoIosArrowDropleftCircle,
    IoIosArrowDroprightCircle,
    // IoIosArrowForward,
} from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Rate, Tooltip } from "antd";
import dayjs from "dayjs";
import { GetFeedbacks } from "../../../Api-TBS/Home/Home.js";
import { capitalizeLetter } from "../../Common/Common-Functions/Captalization.js";


export default function FeedBacks() {
    const [startIndex, setStartIndex] = useState(0);
    const itemsPerPage = 3; // Number of items per slide
    const navigation = useNavigate();
    const dispatch = useDispatch();
    const ratingdata = useSelector((state) => state.feed_back);
    const colors = useSelector((state) => state.themecolors[0]);
     // console.log(ratingdata, 'ratingdata_ratingdaat')
    const prevSlide = () => {
        // Ensure we don’t go below zero
        setStartIndex((prev) => Math.max(prev - itemsPerPage, 0));
    };

    const nextSlide = () => {
        // Ensure we don’t exceed the array length
        setStartIndex((prev) =>
            Math.min(prev + itemsPerPage, ratingdata.length - itemsPerPage)
        );
    };
    const getColorForValue = (value) => {
        if (value <= 0) return "#FFDD2B";
        if (value <= 1) return "#FF2A2A";
        if (value <= 2) return "#FF4A22";
        if (value <= 3) return "#00cc20";
        if (value <= 4) return "#00cc20";
        return "#00cc20";
    };

    useEffect(() => {
        GetFeedbacks(dispatch);
    }, [dispatch]);
     // console.log(ratingdata, "ratingdataratingdata");
    // const [startIndex, setStartIndex] = useState(0);

    // useEffect(() => {
    //   const interval = setInterval(() => {
    //     setStartIndex((prevIndex) => (prevIndex + 1) % ratingdata.length);
    //   }, 3000); // Adjust time (3000ms = 3s) as needed

    //   return () => clearInterval(interval); // Clear interval on component unmount
    // }, [ratingdata.length]);
    return (
        <>
            <div className="px-[5vw] py-[1vw] relative">
                <div className="flex justify-between items-center pr-[2vw]">
                    <p
                        className={`text-[3.2vw] w-3/4 mt-[2vw] md:my-0 md:text-[1.6vw] text-[${colors.primary}] font-bold pt-[1vw] px-[2vw] pb-[1vw]`}
                    >
                        Here’s what a few of our customers have to say about us
                    </p>
                    <div>
                        <button
                            className="text-[3vw] md:border-[0.1vw] md:border-[#AAAAAA] md:px-[1.5vw] md:py-[0.2vw] md:rounded-full md:text-[1vw] md:bg-white md:shadow-lg "
                            onClick={() => navigation("/CustomerRatings")}
                        >
                            View All
                        </button>
                    </div>
                </div>
                {/* Desktop View */}
                <div className="md:block hidden ">
                    <div className="px-[2vw]  items-center flex">
                        {startIndex > 0 && ratingdata?.length > 4 && (
                            <div className=" absolute left-[4vw] top-[9vw]">
                                <button onClick={prevSlide} disabled={startIndex === 0}>
                                    <IoIosArrowDropleftCircle size={"2vw"} color="#1F487C" />
                                </button>
                            </div>
                        )}
                        <div
                            className="w-full gap-[1vw] items-center relative flex transition-transform duration-500 ease-in-out"
                        // style={{ transform: `translateX(-${startIndex * 20}%)` }}
                        >
                            {ratingdata
                                ?.slice(startIndex, startIndex + itemsPerPage)
                                .map((item, index) => (
                                    <div
                                        key={index}
                                        className={`${index === 1
                                            ? "w-[50%] h-auto py-[1vw] shadow-lg"
                                            : "w-[25%] h-auto shadow-md"
                                            } rounded-[.5vw] bg-[#f5f6f7]`}
                                    >
                                        <div className="flex justify-between items-center px-[1vw] pt-[0.5vw]">
                                            <div className="grid grid-rows-2">
                                                <p className="font-bold text-[1vw]">
                                                    {item?.name?.length > 18 ? (
                                                        <Tooltip title={capitalizeLetter(item.name)}>
                                                            {capitalizeLetter(
                                                                item.name.slice(0, 18) + "..."
                                                            )}
                                                        </Tooltip>
                                                    ) : (
                                                        capitalizeLetter(item.name)
                                                    )}
                                                </p>

                                                <p className="text-[0.8vw] text-gray-500">
                                                    {item.occupation}
                                                </p>
                                            </div>
                                            <div className="flex flex-col justify-end items-end">
                                                <Rate
                                                    value={item.rating}
                                                    style={{
                                                        fontSize: "1vw",
                                                        color: getColorForValue(item.rating),
                                                    }}
                                                    disabled
                                                />
                                                <p className="text-[0.8vw] text-gray-500 right-0">
                                                    {dayjs(item.created_at).format("MMM DD, YYYY")}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="py-[1vw] px-[1vw]">
                                            <p className="text-[0.9vw]">
                                                {item.description.length > 50 ? (
                                                    <Tooltip title={item.description}>
                                                        {item.description.slice(0, 40) + "..."}
                                                    </Tooltip>
                                                ) : (
                                                    capitalizeLetter(item.description)
                                                )}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                        </div>
                        {ratingdata?.length > 4 && startIndex < ratingdata?.length - 5 && (
                            <div className=" absolute right-[2vw] top-[9vw]">
                                <button
                                    onClick={nextSlide}
                                    disabled={startIndex >= ratingdata.length - itemsPerPage}
                                >
                                    <IoIosArrowDroprightCircle size={"2vw"} color="#1F487C" />
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                <div className="md:hidden block">
                    <div className="overflow-x-auto whitespace-nowrap scrollbar-hide">
                        <div className="flex space-x-2 h-[40vw]">
                            <div
                                className="w-full gap-x-[2vw] items-center relative flex transition-transform duration-500 ease-in-out"
                            // style={{ transform: `translateX(-${startIndex * 20}%)` }}
                            >
                                {ratingdata?.map((item, index) => (
                                    <div
                                        key={index}
                                        className={`flex w-auto flex-col justify-center px-[2vw] rounded-[.5vw] bg-[#f5f6f7]`}
                                    >
                                        <div className="flex justify-between items-center px-[3vw] pt-[0.5vw] gap-[2.5vw]">
                                            <div className="flex flex-col">
                                                <p className="font-bold text-[4vw]">
                                                    {" "}
                                                    {item?.name?.length > 18 ? (
                                                        <Tooltip title={item.name}>
                                                            {item.name.slice(0, 18) + "..."}{" "}
                                                        </Tooltip>
                                                    ) : (
                                                        item.name
                                                    )}
                                                </p>
                                                <p className="text-[3vw] text-gray-500">
                                                    {item.occupation}
                                                </p>
                                            </div>
                                            <div className="flex flex-col justify-end items-end">
                                                <Rate
                                                    value={item.rating}
                                                    style={{
                                                        fontSize: "3vw",
                                                        color: getColorForValue(item.rating),
                                                    }}
                                                />
                                                <p className="text-[2.5vw] text-gray-500 right-0">
                                                    {dayjs(item.created_at).format("MMM DD, YYYY")}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="py-[3vw] px-[3vw]">
                                            <p className="text-[3.5vw]">
                                                {item?.description?.length > 18 ? (
                                                    <Tooltip
                                                        title={capitalizeLetter(item?.description)}
                                                    >
                                                        {capitalizeLetter(item?.description).slice(
                                                            0,
                                                            18
                                                        ) + "..."}{" "}
                                                    </Tooltip>
                                                ) : (
                                                    capitalizeLetter(item?.description)
                                                )}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
