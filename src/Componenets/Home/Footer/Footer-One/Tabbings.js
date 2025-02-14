import React, { useEffect, useState } from "react";
// import "../../Components/Home/Footer.css";
import { useDispatch, useSelector } from "react-redux";
import { GetFooter } from "../../../../Api-TBS/Home/Home";
import { useNavigate } from "react-router";
import dayjs from "dayjs";
import { Abhibus_GetBusList } from "../../../../Api-Abhibus/Home/HomePage";

export default function Tabbings({ top_bus_routeFooter, buses_from_top_citiesFooter, top_rtc_busesFooter, top_bus_serviceFooter, quick_links }) {

    const getselecteddate = useSelector((state) => state.selected_date);
    const [btns, setBtns] = useState(1);
    const [source, setSource] = useState({
        from: '',
        to: '',
        from_sourceID: '',
        to_sourceID: ''
    })
    const [luxury, setLuxury] = useState(false);
    const dispatch = useDispatch()
    const navigate = useNavigate()


    const handleonClick = async (item) => {
        // Update local state
        setSource({
            ...source,
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
                source,
                getselecteddate,
                luxury
            );
            console.log(data?.status === "success", "datadatadata");
            if (data?.status === "success") {
                console.log(data, "test");
                navigate(
                    `/buslist/${source.from}/${source.from_sourceID}/${source.to}/${source.to_sourceID
                    }/${dayjs(getselecteddate).format("YYYY-MM-DD")}`
                );
            }
        } catch (error) {
            console.error("Error fetching additional user data", error);
        }

        localStorage.setItem("departure", source.from);
        localStorage.setItem("arrival", source.to);
    };

    useEffect(() => {
        if (source.from_sourceID && source.to_sourceID) {
            handlebussearch();
        }
    }, [source]);



    return (
        <>
            <div className="">
                <div className="grid grid-cols-5 grid-flow-row">
                    <div
                        onClick={() => setBtns(1)}
                        className={`${btns === 1 ? "bg-[#03ccf4] rounded-full" : "border-b-[0.1vw] border-white"
                            } items-center justify-center flex h-[3.1vw] cursor-pointer`}
                    >
                        <p className="text-white text-[1.3vw] font-bold">Top Bus Route</p>
                    </div>
                    <div
                        onClick={() => setBtns(2)}
                        className={`${btns === 2 ? "bg-[#03ccf4] rounded-full" : "border-b-[0.2vh] border-white"
                            } items-center justify-center flex h-[3.1vw] cursor-pointer`}
                    >
                        <div className="text-white text-[1.3vw] font-bold">Buses From Top Cities</div>
                    </div>
                    <div
                        onClick={() => setBtns(3)}
                        className={`${btns === 3 ? "bg-[#03ccf4] rounded-full" : "border-b-[0.2vh] border-white"
                            } items-center justify-center flex h-[3.1vw] cursor-pointer`}
                    >
                        <p className="text-white text-[1.3vw] font-bold">Top RTC Buses</p>
                    </div>
                    <div
                        onClick={() => setBtns(4)}
                        className={`${btns === 4 ? "bg-[#03ccf4] rounded-full" : "border-b-[0.2vh] border-white"
                            } items-center justify-center flex h-[3.1vw] cursor-pointer`}
                    >
                        <p className="text-white text-[1.3vw] font-bold">Top Bus Service</p>
                    </div>
                    <div
                        onClick={() => setBtns(5)}
                        className={`${btns === 5 ? "bg-[#03ccf4] rounded-full" : "border-b-[0.2vh] border-white"
                            } items-center justify-center flex h-[3.1vw] cursor-pointer`}
                    >
                        <p className="text-white text-[1.3vw] font-bold">Quick Links</p>
                    </div>
                </div>

                {btns === 1 && (
                    <div className="grid grid-cols-4 grid-row gap-0 space-y-[10%] px-6"
                    >
                        {top_bus_routeFooter?.map((item, index) => (
                            <a
                                key={index}
                                className="text-[#7A7A7A] hover:text-[#7A7A7A] text-[1vw] mt-[10%] cursor-pointer"
                                href={item.url}
                                target="blank"
                                onClick={() => {
                                    handleonClick(item);
                                    console.log(item.to, item.from, 'busdestination')
                                }}
                            >
                                <p>
                                    {item.from} to {item.to}
                                </p>
                            </a>
                        ))}
                    </div>
                )}

                {btns === 2 && (
                    <div className="grid grid-cols-4 grid-row gap-0 space-y-[10%] px-6">
                        {buses_from_top_citiesFooter?.map((item, index) => (
                            <a
                                key={index}
                                className="text-[#7A7A7A] hover:text-[#7A7A7A] text-[1vw] mt-[10%]"
                                href={item.url}
                                target="blank"
                            >
                                <p>{item.city_name}</p>
                            </a>
                        ))}
                    </div>
                )}

                {btns === 3 && (
                    <div className="grid grid-cols-4 grid-row gap-0 space-y-[10%] px-6">
                        {top_rtc_busesFooter?.map((item, index) => (
                            <a
                                key={index}
                                className="text-[#7A7A7A] hover:text-[#7A7A7A] text-[1vw] mt-[10%]"
                                href={item.url}
                                target="blank"
                            >
                                <p>{item.rtc_name}</p>
                            </a>
                        ))}
                    </div>
                )}

                {btns === 4 && (
                    <div className="grid grid-cols-4 grid-row gap-0 space-y-[10%] px-6">
                        {top_bus_serviceFooter?.map((item, index) => (
                            <a
                                key={index}
                                className="text-[#7A7A7A] hover:text-[#7A7A7A] text-[1vw] mt-[10%]"
                                href={item.url}
                                target="blank"
                            >
                                <p>{item.operator_name}</p>
                            </a>
                        ))}
                    </div>
                )}

                {btns === 5 && (
                    <div className="grid grid-cols-4 grid-row gap-0 space-y-[10%] px-6">
                        {quick_links?.map((item, index) => (
                            <a
                                key={index}
                                className="text-[#7A7A7A] hover:text-[#7A7A7A] text-[1vw] mt-[10%]"
                                href={item.url}
                                target="blank"
                            >
                                <p>{item.link}</p>
                            </a>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
};


