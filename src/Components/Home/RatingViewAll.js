import { useDispatch, useSelector } from "react-redux";
import CommonMainNavbar from "../Common/CommonMainNavbar";
import homesky from "../../assets/BackgroundSky1.png";
import { capitalizeFirstLetter } from "../Common/Captalization";
import { Empty, Popover, Spin } from "antd";
import { FaStar } from "react-icons/fa6";
// import double from "../../assets/doubl.png";
import { GetFeedbacks } from "../../Api/MyAccounts/RatingFeedBack";
import { useEffect, useState } from "react";
import Footer1 from "../Footer/Footer";
import { LoadingOutlined } from "@ant-design/icons";

import { PiUserSquareThin } from "react-icons/pi";

const RatingViewAll = () => {

  const [spinner, setSpinner] = useState(false);
  const colors = useSelector((state) => state.themecolors[0]);
  const ratingdata = useSelector((state) => state.feed_back);
  const dispatch = useDispatch();

  
  //  const handleChange = (value) =>{
  //   setSpinner(true)
  //       GetFeedbacks(dispatch,value,setSpinner)
  //  }


  useEffect(() => {
    GetFeedbacks(dispatch, 1);
  }, [dispatch]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div
        className={`bg-[${colors.background}] border-b-2 bg-[${colors.background}] min-h-screen max-h-auto w-full> `}
      >
        <CommonMainNavbar />
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
              width: "100%",
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
              <div className=" w-full flex flex-col md:flex-row px-[2vw] items-center justify-center md:justify-between md:py-[0vw] py-[2vw] my-[1vw] ">
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
                  <div className="grid grid-cols-1 md:grid-cols-3  md:my-[2vw] pl-[1.5vw]  max-h-[130vw] md:max-h-[26vw] overflow-y-auto ">
                    {ratingdata?.length > 0 ? (
                      ratingdata.map((item, index) => (
                        <div key={index} className=" ">
                          {/* <img src={shape} className="h-[100%] w-full " /> */}

                          <div className="rounded-[2vw] md:rounded-[.5vw] h-[27vw] md:h-[8vw] gap-[1vw] md:mb-[1vw] mb-[3vw] w-full md:w-[21vw] bg-[#f5f6f7] shadow-lg relative  ">
                            {/* <img
                  src={double}
                  className="absolute left-[5vw] md:left-[2vw] top-[2.5vw] md:top-[1vw] md:w-[2vw] md:h-[2vw] w-[5vw] h-[5vw] "
                /> */}
                            <PiUserSquareThin
                              className={` text-[7vw] md:text-[2.2vw] absolute text-gray-600 left-[5vw] md:left-[1.8vw] top-[2.1vw] md:top-[.8vw]`}
                            />
                            {/* <svg
                          width="69"
                          height="61"
                          viewBox="0 0 69 61"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="absolute left-[5vw] md:left-[2vw] top-[2.5vw] md:top-[1vw] md:w-[2vw] md:h-[2vw] w-[5vw] h-[5vw] "
                        >
                          <path
                            d="M62.5049 30.5C65.958 30.5 68.8799 33.4219 68.8799 36.875V53.875C68.8799 57.4609 65.958 60.25 62.5049 60.25H45.5049C41.9189 60.25 39.1299 57.4609 39.1299 53.875V22C39.1299 10.3125 48.5596 0.75 60.3799 0.75H61.4424C63.1689 0.75 64.6299 2.21094 64.6299 3.9375V10.3125C64.6299 12.1719 63.1689 13.5 61.4424 13.5H60.3799C55.5986 13.5 51.8799 17.3516 51.8799 22V30.5H62.5049ZM24.2549 30.5C27.708 30.5 30.6299 33.4219 30.6299 36.875V53.875C30.6299 57.4609 27.708 60.25 24.2549 60.25H7.25488C3.66895 60.25 0.879883 57.4609 0.879883 53.875V22C0.879883 10.3125 10.3096 0.75 22.1299 0.75H23.1924C24.9189 0.75 26.3799 2.21094 26.3799 3.9375V10.3125C26.3799 12.1719 24.9189 13.5 23.1924 13.5H22.1299C17.3486 13.5 13.6299 17.3516 13.6299 22V30.5H24.2549Z"
                            fill="#8DA0A8"
                            fill-opacity="0.51"
                          />
                        </svg> */}
                            <div className="absolute right-[5vw] md:right-[2vw] top-[2.5vw] md:top-[1vw]">
                              <div
                                className={`md:w-[3.5vw] md:h-[4vh] w-[10vw] h-[6vw] ${
                                  item.rating == "5"
                                    ? "bg-[#61B00F]"
                                    : item.rating == "4"
                                    ? "bg-[#61B00F]"
                                    : item.rating == "3"
                                    ? "bg-[#FF910E]"
                                    : item.rating == "2"
                                    ? "bg-[#FF910E]"
                                    : "bg-[#EA222F]"
                                } flex items-center justify-center rounded-[0.2vw]`}
                              >
                                <FaStar
                                  style={{
                                    color: "white",
                                  }}
                                  //   size={"1.4vw"}
                                  className="mx-[0.2vw] md:text-[1.4vw] text-[3.2vw]"
                                />
                                <div>
                                  <p className="text-white font-bold text-[3.3vw] md:text-[1.15vw]">
                                    {item.rating}
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div className="absolute bottom-[1vw] md:px-[2vw] px-[5vw] items-center justify-center flex">
                              {item?.description?.length > 60 ? (
                                <Popover
                                  content={item.description}
                                  trigger="hover"
                                  overlayStyle={{ maxWidth: "20vw" }}
                                >
                                  <p
                                    className={` text-[${colors.primary}] text-[3.5vw] md:pb-[0vw] pb-[2vw]  md:text-[1vw]`}
                                  >{`${capitalizeFirstLetter(
                                    item?.description?.slice(0, 60)
                                  )}...`}</p>
                                </Popover>
                              ) : (
                                <p
                                  className={`text-[${colors.primary}] text-[3.5vw] md:text-[1vw] md:pb-[0vw] pb-[2vw]  items-center justify-center flex`}
                                >
                                  {capitalizeFirstLetter(item.description)}
                                </p>
                              )}
                            </div>
                            <div className="absolute md:left-[4.4vw] left-[12vw] top-[1.5vw] md:top-[.8vw]">
                              <p
                                className={`md:text-[.8vw] text-[3vw] text-[#929393] `}
                              >
                                {item.name}
                              </p>
                            </div>
                            <div className="absolute md:left-[4.4vw] left-[12vw] top-[5.4vw] md:top-[1.9vw] ">
                              <p className="md:text-[.7vw] text-[2.6vw] text-[#8DA0A8] ">
                                {item.occupation}
                              </p>
                            </div>
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
        <Footer1 />
      </span>
    </>
  );
};
export default RatingViewAll;
