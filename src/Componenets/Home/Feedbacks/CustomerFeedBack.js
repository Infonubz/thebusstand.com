import { useDispatch, useSelector } from "react-redux";
import homesky from "../../../Assets/Theme/Sky/BackgroundSky1.png"
import { Empty, Rate, Spin, Tooltip } from "antd";
// import { FaStar } from "react-icons/fa6";
// import double from "../../assets/doubl.png";
import { useEffect, useState } from "react";
import { LoadingOutlined } from "@ant-design/icons";

// import { PiUserSquareThin } from "react-icons/pi";
import dayjs from "dayjs";
import { capitalizeLetter } from "../../Common/Common-Functions/Captalization";
import FooterTwo from "../Footer/Footer-Two/FooterTwo";
import Navbar_One from "../../Common/Top-Navbar/Navbar-One";
import { GetFeedbacks } from "../../../Api-TBS/Home/Home";

export default function CustomerFeedBack() {

    const [spinner, setSpinner] = useState(false);
    const colors = useSelector((state) => state?.themecolors[0]);
    const ratingdata = useSelector((state) => state?.feed_back);
    const dispatch = useDispatch();
    console.log(ratingdata, 'ratingData')
    //  const handleChange = (value) =>{
    //   setSpinner(true)
    //       GetFeedbacks(dispatch,value,setSpinner)
    //  }

    useEffect(() => {
        GetFeedbacks(dispatch, 1, setSpinner);
    }, [dispatch]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const getColorForValue = (value) => {
        if (value <= 0) return "#FFDD2B";
        if (value <= 1) return "#FF2A2A";
        if (value <= 2) return "#FFA033";
        if (value <= 3) return "#FFA033";
        if (value <= 4) return "#00cc20";
        return "#00cc20";
    };
    return (
        <>
            <div
                className={`bg-[${colors.background}] border-b-2 bg-[${colors.background}] min-h-screen max-h-auto w-full> `}
            >
                <Navbar_One />
                <div
                    className="relative md:h-[45vw] h-[100%] bg-[#e5fff1]"
                    style={{ zIndex: 1 }}
                >
                    <div
                        className="md:h-[10vw] h-[20vw] z-0 overflow-x-hidden"
                        style={{
                            backgroundImage: `url(${homesky})`,
                            width: "100%",
                            overflow: "hidden",
                            // backgroundSize: "cover",
                            position: "relative",
                            overflowX: "hidden",
                        }}
                    >
                        <label className="absolute left-[20vw] md:left-[34vw] top-[2vw] md:top-[0.1vw] text-[7vw]  md:text-[4vw] text-white font-bold opacity-20">
                            {`Customer Ratings`}
                        </label>
                        <label className="absolute md:left-[42vw] left-[32vw] top-[5vw] md:top-[2vw] text-[4vw]  md:text-[2vw] text-white font-bold">
                            {"Customer Ratings"}
                        </label>
                        <div className="cloudhome"></div>
                    </div>
                    <div
                        className={`absolute md:top-[7vw] top-[13vw] left-[3vw] md:left-[12.5vw] bg-[${colors.background}] shadow-lg shadow-gray-400 w-[93%] md:w-3/4 h-[160vw] md:h-[35vw] rounded-lg`}
                    >
                        <div className="md:px-[2vw] px-[4vw]">
                            <div className=" w-full flex flex-col md:flex-row px-[1vw] items-center justify-center md:justify-between md:py-[0vw] py-[2vw] my-[1vw] ">
                                <p
                                    className={`md:text-[1.5vw] text-[5vw] text-[${colors.primary}] font-bold`}
                                >
                                    4500+ Customer Ratings
                                </p>
                                {/* <select
                  className={`md:w-[13vw] w-full font-bold rounded-[1.5vw] md:rounded-[.5vw] my-[2vw] md:my-[0vw] text-[${colors.primary}] text-[3.3vw] md:text-[1vw] px-[3vw] md:px-[1vw] h-[9vw] md:h-[3vw] border-[.1vw] border-[${colors.primary}]`}
                  onChange={(e)=>handleChange(e.target.value)}
                >
                  <option value={4}> Rating Above 4 ⭐ </option>
                  <option value={3}> Rating Above 3 ⭐ </option>
                  <option value={2}> Rating above 2 ⭐ </option>
                  <option value={1}> Rating below 2 ⭐ </option>
                </select> */}
                            </div>
                            {spinner ? (
                                <div
                                    style={{
                                        position: "fixed",
                                        top: 0,
                                        left: 0,
                                        width: "100%",
                                        height: "100%",
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        zIndex: 1000,
                                    }}
                                >
                                    <Spin
                                        className="pl-[0vw]"
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                        }}
                                        spinning={spinner}
                                        indicator={
                                            <LoadingOutlined style={{ fontSize: 48 }} spin />
                                        }
                                    />
                                </div>
                            ) : (
                                <div>
                                    <div className="grid grid-cols-1 md:grid-cols-3  md:my-[2vw] pl-[0vw]  max-h-[140vw] md:max-h-[26vw] overflow-y-auto ">
                                        {ratingdata?.length > 0 ? (
                                            ratingdata?.map((item, index) => (
                                                <div
                                                    key={index}
                                                    className={`md:mb-[1vw] mb-[4vw] mx-[0.5vw] h-auto rounded-[.5vw] shadow-lg bg-[#f5f6f7]`}
                                                >
                                                    <div className="flex justify-between md:px-[1vw] px-[3vw] pt-[0.5vw]">
                                                        <div className="flex flex-col">
                                                            <p className="font-bold md:text-[1vw] text-[4vw] cursor-default">
                                                                {item?.name?.length > 20 ? (
                                                                    <Tooltip
                                                                        title={item.name}
                                                                        className="cursor-pointer"
                                                                        overlayInnerStyle={{
                                                                            color: '#1F487C'
                                                                        }}
                                                                        color="white"
                                                                    >
                                                                        {item.name.slice(0, 20) + "..."}
                                                                    </Tooltip>
                                                                ) : (
                                                                    item.name
                                                                )}
                                                            </p>
                                                            <p className="md:text-[0.8vw] text-[3vw] text-gray-500">
                                                                {item.occupation}
                                                            </p>
                                                        </div>
                                                        <div className="flex flex-col justify-end items-end">
                                                            <span className="md:block hidden">
                                                                <Rate
                                                                    // defaultValue={item.rating}
                                                                    value={item?.rating}
                                                                    style={{
                                                                        fontSize: "1vw",
                                                                        color: getColorForValue(item.rating),
                                                                    }}
                                                                    disabled
                                                                />
                                                            </span>
                                                            <span className=" md:hidden block">
                                                                <Rate
                                                                    // defaultValue={item.rating}
                                                                    value={item?.rating}
                                                                    style={{
                                                                        fontSize: "3vw",
                                                                        color: getColorForValue(item.rating),
                                                                    }}
                                                                    disabled
                                                                />
                                                            </span>
                                                            <p className="md:text-[0.8vw] text-[3vw] text-gray-500 right-0">
                                                                {dayjs(item.created_at).format("MMM DD, YYYY")}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="py-[1vw] md:px-[1vw] px-[3vw]">
                                                        <p className="md:text-[0.9vw] text-[3.5vw]  break-words">
                                                            {capitalizeLetter(item.description)}
                                                        </p>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <span className="flex justify-center items-center col-span-3">
                                                <Empty />
                                            </span>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <span className="md:block hidden w-full">
                <FooterTwo />
            </span>
        </>
    );
};

