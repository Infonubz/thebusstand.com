import React, { useEffect, useState } from "react";
import Footer from "../Home/Footer";
import HomeHearder from "../MainComponenet/HomeHearder";
import homesky from "../../assets/BackgroundSky1.png";
import Rewards from "../../assets/Rewards.png";
import Rewards1 from "../../assets/Rewards1.png";
import Rewards2 from "../../assets/Rewards2.png";
import Rewards3 from "../../assets/Rewards3.png";
import { useDispatch, useSelector } from "react-redux";
import { GetOffersOccupation } from "../../Api/Rewards/Rewards";
import { Empty, Pagination, Spin } from "antd";
import "./Pagination.css";
import { useNavigate } from "react-router";
import CommonMainNavbar from "../Common/CommonMainNavbar";
import { GetFeedbackById } from "../../Api/MyAccounts/RatingFeedBack";
import { LoadingOutlined } from "@ant-design/icons";
export default function Rewardsandoffers() {
  const [currenttab, setCurrenttab] = useState(2);
  const [getValues, setGetValues] = useState("General Public");
  const [spinning, setSpinning] = useState(false);

  const Reward = [
    {
      img1: <img src={Rewards} />,
      img2: <img src={Rewards1} />,
      img3: <img src={Rewards2} />,
      img4: <img src={Rewards3} />,
    },
  ];
  const OccupationDeals = useSelector((state) => state.offers_occupation);

  // const [currentPage, setCurrentPage] = useState(1);
  // const ITEMS_PER_PAGE = 8;
  // const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  // const paginatedData = OccupationDeals.slice(
  //   startIndex,
  //   startIndex + ITEMS_PER_PAGE
  // );
  // const onPageChange = (page) => {
  //   setCurrentPage(page);
  // };

  const dispatch = useDispatch();

  useEffect(() => {
    setSpinning(true);
    const feedback = async () => {
      const response = await GetFeedbackById();
      if (response && sessionStorage.getItem("passenger_id")) {
        setGetValues(
          response.occupation_id === 1 ? "Business"  :
          response.occupation_id === 2 ? "GeneralPublic"  :
          response.occupation_id === 3 ? "PhysicallyChallenged" :
          response.occupation_id === 4 ? "PilgrimTravelers"  :
          response.occupation_id === 5 ?"SeniorCitizens" :
          response.occupation_id === 6 ?"Students" :
          response.occupation_id === 7 ?"Tourist" :
          response.occupation_id === 8 ? "CorporateTravelers" :
           "GeneralPublic"
        );
        console.log(response, "lszfmjdsfksdhgj");
        GetOffersOccupation(dispatch, response.occupation_id, setSpinning);
      } else {
        GetOffersOccupation(dispatch, 2, setSpinning);
      }
    };
    feedback();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const navigation = useNavigate();
  return (
    <>
      <div className="bg-[#E5FFF1] min-h-screen max-h-auto w-full overflow-auto relative  md:block hidden ">
        <div className="">
          {/* <HomeHearder /> */}
          <CommonMainNavbar />

          <div
            className="relative md:h-[45vw] h-[100%] bg-[#d1f8e3]"
            style={{ zIndex: 1 }}
          >
            {/* <img src={homesky} className="w-full h-[10vw] bg-[#2B8EE4]" /> */}
            <div
              className="md:h-[10vw] h-[14vw] z-[1] md:z-0 overflow-x-hidden"
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
              <label className="absolute left-[39vw] md:left-[36vw] top-[2vw] md:top-[0.1vw] text-[6vw]  md:text-[4vw] text-white font-bold opacity-20">
                {`Rewards & Offers`}
              </label>
              <label className="absolute left-[43vw] top-[5vw] md:top-[2vw] text-[3vw]  md:text-[2vw] text-white font-bold">
                {"Rewards & Offers"}
              </label>
              <div className="cloudhome"></div>
              {/* <label className=" absolute left-[4vw] top-[2vw] text-[1.4vw] text-white font-bold">{`Home > Rewards/Offers`}</label>
            <div className="cloudhome"></div>
            <div className="absolute top-[5.5vw] px-[3vw] grid grid-cols-8 gap-[1vw] w-full">
              <button
                className={`${
                  currenttab == 0
                    ? "bg-[#1F487C] text-white font-semibold"
                    : "bg-white text-[#1F487C]"
                } w-full h-[3vw] text-[1vw] px-[0.5vw] rounded-[0.5vw]`}
                onClick={() => setCurrenttab(0)}
              >
                All
              </button>
              <button
                className={`${
                  currenttab == 2
                    ? "bg-[#1F487C] text-white font-semibold"
                    : "bg-white text-[#1F487C]"
                } w-full h-[3vw] text-[1vw] px-[0.5vw] rounded-[0.5vw]`}
                onClick={() => setCurrenttab(2)}
              >
                General Public
              </button>
              <button
                className={`${
                  currenttab == 3
                    ? "bg-[#1F487C] text-white font-semibold"
                    : "bg-white text-[#1F487C]"
                } w-full h-[3vw] text-[1vw] px-[0.5vw] rounded-[0.5vw]`}
                onClick={() => setCurrenttab(3)}
              >
                Physically Challenged
              </button>
              <button
                className={`${
                  currenttab == 4
                    ? "bg-[#1F487C] text-white font-semibold"
                    : "bg-white text-[#1F487C]"
                } w-full h-[3vw] text-[1vw] px-[0.5vw] rounded-[0.5vw]`}
                onClick={() => setCurrenttab(4)}
              >
                Pilgrim Travellers
              </button>
              <button
                className={`${
                  currenttab == 5
                    ? "bg-[#1F487C] text-white font-semibold"
                    : "bg-white text-[#1F487C]"
                } w-full h-[3vw] text-[1vw] px-[0.5vw] rounded-[0.5vw]`}
                onClick={() => setCurrenttab(5)}
              >
                Senior Citizens
              </button>
              <button
                className={`${
                  currenttab == 6
                    ? "bg-[#1F487C] text-white font-semibold"
                    : "bg-white text-[#1F487C]"
                } w-full h-[3vw] text-[1vw] px-[0.5vw] rounded-[0.5vw]`}
                onClick={() => setCurrenttab(6)}
              >
                Students
              </button>
              <button
                className={`${
                  currenttab == 7
                    ? "bg-[#1F487C] text-white font-semibold"
                    : "bg-white text-[#1F487C]"
                } w-full h-[3vw] text-[1vw] px-[0.5vw] rounded-[0.5vw]`}
                onClick={() => setCurrenttab(7)}
              >
                Tourists
              </button>
              <button
                className={`${
                  currenttab == 8
                    ? "bg-[#1F487C] text-white font-semibold"
                    : "bg-white text-[#1F487C]"
                } w-full h-[3vw] text-[1vw] px-[0.5vw] rounded-[0.5vw]`}
                onClick={() => setCurrenttab(8)}
              >
                Corporate Travellers
              </button> */}
            </div>

            {/* <div className="absolute top-[10vw] px-[3vw] flex flex-col gap-[0.2vw]">
            <div className="bg-white px-[1vw] w-full h-[32vw] relative">
              <div className="flex flex-col gap-[0.2vw]">
                <p className="text-center text-[1.4vw] text-[#1F487C] mt-[.5vw] font-bold">
                  Bus Booking Offers
                </p>
                <p className="text-center text-[1.2vw] text-[#1F487C] font-[1.4vw]">
                  Exciting offers on Bus Booking Online
                </p>
                <p className=" px-[6vw] text-[1vw] text-[#1F487C]">
                  Get exciting bus booking offers across India on Tbs Travellers
                  can book bus tickets quickly, easily and fast on Tbs. If
                  you’re looking for ways to save money on online bus booking
                  offers today, simply use bus booking coupons on Tbs and avail
                  great savings!
                </p>
              </div>
              <div className="">
                <div className="grid grid-cols-4 gap-x-[2vw] gap-y-[2vw] pt-[1vw] px-[5vw]">
                  {paginatedData.slice(0, 8).map((items, index) => (
                    <div
                      key={index}
                      className="w-full h-auto flex justify-center"
                    >
                      <img
                        src={`http://192.168.90.47:4000${items.theme}`}
                        className="w-[17vw] h-[8.5vw] "
                      />
                    </div>
                  ))}
                </div>
              </div>
              <Pagination
                className="absolute bottom-[-1.5vw] right-[1vw]"
                current={currentPage}
                pageSize={ITEMS_PER_PAGE}
                total={OccupationDeals.length}
                onChange={onPageChange}
                showSizeChanger={false}
              />
            </div>
          </div> */}

            <div className="absolute top-[7vw] left-[12.5vw] bg-white w-3/4 h-[35vw] rounded-lg md:block hidden">
              <div className="flex justify-between py-[2vw] px-[4vw]">
                <div className="flex flex-col">
                  <p className="text-start text-[1.5vw] text-[#1F487C] mt-[.5vw] font-bold">
                    Bus Booking Offers
                  </p>
                  <p className="text-start text-[1.1vw] text-[#1F487C] font-[1.4vw]">
                    Exciting offers on Bus Booking Online
                  </p>
                </div>
                <span className="flex flex-col justify-end ">
                  <label className="text-[1.1vw] text-[#1F487C] font-[1.4vw] pb-[.5vw]">
                    Occupation
                  </label>
                  <input
                    disabled
                    value={getValues}
                    className="border-gray-500 text-[#1F487c] h-[2.5vw] w-[18vw] border-[.1vw] rounded-[.5vw] pl-[.5vw]"
                  />
                  {/* <select
                    value={currenttab}
                    onChange={handleChange}
                    className="border-gray-500 text-[#1F487c] h-[2.5vw] w-[18vw] border-[.1vw] rounded-[.5vw] pl-[.5vw]  "
                  >
                    <option value="0">All</option>
                    <option value="2">General Public</option>
                    <option value="3">PhysicallyChallenged</option>
                    <option value="4">Pilgrim Travellers</option>
                    <option value="5">Senior Citizens</option>
                    <option value="6">Students</option>
                    <option value="7">Tourists</option>
                    <option value="8">Corporate Travellers</option>
                  </select> */}
                </span>
              </div>

              <div className="max-h-[24vw] h-full  overflow-y-auto w-[100%] px-[3vw] place-items-center py-[1vw] items-center justify-center flex">
                {spinning ? (
                  <div
                    style={{
                      position: "fixed",
                      top: 50,
                      left: -150,
                      width: "100%",
                      height: "100%",
                      // background: "rgba(0, 0, 0, 0.2)",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      zIndex: 1000,
                    }}
                  >
                    <Spin
                      className="pl-[20vw]"
                      style={{
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                      spinning={spinning}
                      indicator={
                        <LoadingOutlined style={{ fontSize: 48 }} spin />
                      }
                    />
                  </div>
                ) : (
                  <div className="grid grid-cols-3 w-full h-full  flex-col  gap-x-[1vw] gap-y-[2vw] justify-center px-[1vw]">
                    {OccupationDeals?.length > 0 ? (
                      OccupationDeals?.map((items, index) => (
                        <div
                          key={index}
                          className="w-full h-auto flex justify-center"
                        >
                          <img
                            src={`http://192.168.90.47:4000${items.theme}`}
                            className="w-[80vw]  md:h-[13vw] h-[40vw]"
                          />
                        </div>
                      ))
                    ) : (
                      <span className="flex justify-center items-center col-span-3">
                        <Empty />
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <Footer />
      </div>

      {/* ------------------------------------------------------------------Mobile-------------------------------------------------------- */}

      <div className="bg-[#E5FFF1] border-b-2 min-h-screen max-h-auto w-full md:hidden block">
        {/* <div className="">
          <HomeHearder />
        </div> */}
        <div>
          <div className="w-full h-[15vw] bg-[#1F487C] flex items-center justify-center">
            {/* <label className="px-[2vw] text-[5vw] text-white font-bold ">{`Home > Rewards/Offers`}</label> */}
            <div className="px-[2vw] text-[5vw] text-white font-bold flex gap-[2vw]">
              <p onClick={() => navigation("/")}>Home</p>
              <p>{">"}</p>
              <p>Reward/Offer</p>
            </div>
          </div>
          <div className=" px-[2vw] ">
            <div className=" gap-[1vw] w-full md:my-0 my-[2vw] grid grid-cols-4">
              <button
                className={`${
                  currenttab == 1
                    ? "bg-[#1F487C] text-white font-semibold"
                    : "bg-white text-[#1F487C]"
                } w-full h-[10vw] text-[3vw] px-[5vw] rounded-lg border-[0.1vw] border-[#1F487C]`}
                onClick={() => setCurrenttab(0)}
              >
                All
              </button>
              <button
                className={`${
                  currenttab == 2
                    ? "bg-[#1F487C] text-white font-semibold"
                    : "bg-white text-[#1F487C]"
                } w-full h-[10vw] text-[3vw]  px-[5vw] rounded-lg border-[0.1vw] border-[#1F487C]`}
                onClick={() => setCurrenttab(2)}
              >
                General Public
              </button>
              <button
                className={`${
                  currenttab == 3
                    ? "bg-[#1F487C] text-white font-semibold"
                    : "bg-white text-[#1F487C]"
                } w-full h-[10vw] text-[3vw] px-[5vw] rounded-lg border-[0.1vw] border-[#1F487C]`}
                onClick={() => setCurrenttab(3)}
              >
                Physically Challenged
              </button>
              <button
                className={`${
                  currenttab == 4
                    ? "bg-[#1F487C] text-white font-semibold"
                    : "bg-white text-[#1F487C]"
                } w-full h-[10vw] text-[3vw] px-[5vw] rounded-lg border-[0.1vw] border-[#1F487C]`}
                onClick={() => setCurrenttab(4)}
              >
                Pilgrim Travellers
              </button>
              <button
                className={`${
                  currenttab == 5
                    ? "bg-[#1F487C] text-white font-semibold"
                    : "bg-white text-[#1F487C]"
                } w-full h-[10vw] text-[3vw] px-[5vw] rounded-lg border-[0.1vw] border-[#1F487C]`}
                onClick={() => setCurrenttab(5)}
              >
                Senior Citizens
              </button>
              <button
                className={`${
                  currenttab == 6
                    ? "bg-[#1F487C] text-white font-semibold"
                    : "bg-white text-[#1F487C]"
                } w-full h-[10vw] text-[3vw] px-[5vw] rounded-lg border-[0.1vw] border-[#1F487C]`}
                onClick={() => setCurrenttab(6)}
              >
                Students
              </button>
              <button
                className={`${
                  currenttab == 7
                    ? "bg-[#1F487C] text-white font-semibold"
                    : "bg-white text-[#1F487C]"
                } w-full h-[10vw] text-[3vw] px-[5vw] rounded-lg border-[0.1vw] border-[#1F487C]`}
                onClick={() => setCurrenttab(7)}
              >
                Tourists
              </button>
              <button
                className={`${
                  currenttab == 8
                    ? "bg-[#1F487C] text-white font-semibold"
                    : "bg-white text-[#1F487C]"
                } w-full h-[10vw] text-[3vw] px-[5vw] rounded-lg border-[0.1vw] border-[#1F487C]`}
                onClick={() => setCurrenttab(8)}
              >
                Corporate Travellers
              </button>
            </div>
          </div>

          <div className=" px-[2vw] flex flex-col gap-[0.5vw]">
            <div className="px-[1vw] w-full h-auto">
              <div className="flex flex-col gap-[0.25vw] ">
                {/* <p className="text-center text-[4.5vw] text-[#1F487C] font-bold">Bus Booking Offers</p>
                  <p className="text-center text-[3.5vw] text-[#1F487C] font-semibold">Exciting offers on Bus Booking Online</p>
                  <p className="text-justify text-[3.25vw] text-[#1F487C]">Get exciting bus booking offers across India on Tbs Travellers can book bus tickets quickly, easily and fast on Tbs. If you’re looking for ways to save money on online bus booking offers today, simply use bus booking coupons on Tbs and avail great savings! </p> */}
              </div>
              <div className="overflow-y-scroll w-full h-[72.5vh] py-[1vw]">
                <div className=" flex flex-col gap-[3vw] px-[3vw]">
                  {OccupationDeals.map((items) => (
                    <img src={`http://192.168.90.47:4000${items.theme}`} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <Footer /> */}
      </div>
    </>
  );
}
