import React, { useState } from "react";
import buslogo from "../../../src/assets/502-ai 1.png";
import busstand from "../../../src/assets/busstand.png";
import bus from "../../../src/assets/bus 1.png";
import profile from "../../../src/assets/Profile.png";
import ticket from "../../../src/assets/ticket.png";
import share from "../../../src/assets//Share.png";
import bg_build1 from "../../assets/bg_build1.png";
import bg_build2 from "../../assets/bg_build2.png";
import vehicle from "../../../src/assets/vehicles.png";
import { Select } from "antd";
import suitcase from "../../../src/assets/suitcase.png";
import stand_man from "../../assets/stand_man.png";
import man from "../../assets/man.png";
import bag from "../../assets/bag.png";
import map from "../../assets/map.png";
import stand from "../../assets/stand.png";
import "../../App.css";
import { FaArrowRightArrowLeft } from "react-icons/fa6";
import dayjs from "dayjs";
import vehicle1 from "../../assets/vehicle1.png";
import card1 from "../../assets/card1.png";
import card2 from "../../assets/card2.png";
import card3 from "../../assets/card3.png";
import vehicle3 from "../../assets/vehicle3.png";
import "./test.css";

export default function Home() {
  const onChange = (value) => {
    console.log(`selected ${value}`);
  };
  const onSearch = (value) => {
    console.log("search:", value);
  };

  // Filter `option.label` match the user type `input`
  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());
  const currentDate = new Date();
  const nextDate1 = new Date();
  nextDate1.setDate(currentDate.getDate() + 1);
  const nextDate2 = new Date();
  nextDate2.setDate(currentDate.getDate() + 2);
  const nextDate3 = new Date();
  nextDate3.setDate(currentDate.getDate() + 3);
  console.log(dayjs(currentDate).format("ddd"), "currentDate");
  const offer = [card1, card2, card3, card1, card2];
  const handlebussearch = () => {
    localStorage.setItem("busdetails");
  };
  const [busdatas, setBusDatas] = useState({
    from: "",
    to: "",
    date: "",
    seater: "",
    sleeper: "",
  });
  return (
    <div className="bg-[#E5FFF1] min-h-screen max-h-auto w-full overflow-auto pb-[4vw]">
      <div className="h-[4.5vw] w-full flex ">
        <div className="w-[40%] h-[4vw] flex ">
          <img className="w-[6.25vw] h-[4vw]" src={buslogo} />
          <img src={busstand} className="h-[4vw] w-[20vw] py-[0.1vw]" />
          <p className="border-r-[0.3vw] border-[#1F487C] mt-[0.2vw] h-[4vw] ml-[1vw]"></p>
          <div className="w-[9vw] h-[3.8vw] mt-[0.3vw] bg-[#1F487C] ml-[2vw] rounded-full  relative">
            <img
              src={bus}
              className="h-[3.1vw] w-[4vw] absolute top-0"
              style={{ left: "50%", transform: "translateX(-50%)" }}
            />
            <p
              className="text-white  font-semibold absolute bottom-[0.2vw] text-[0.8vw]"
              style={{ left: "50%", transform: "translateX(-50%)" }}
            >
              Bus Tickets
            </p>
          </div>
        </div>
        <div className="w-[25%] h-full "></div>
        <div className="w-[35%]  h-full   flex gap-[2vw] items-center justify-center">
          <div className="flex items-center justify-center gap-[0.5vw]">
            <img className="w-[1.6vw] h-[1.6vw]" src={share} />
            <p className="text-[1.2vw] font-semibold text-[#1F487C]">Share</p>
          </div>
          <div className="flex items-center justify-center gap-[0.5vw]">
            <img className="w-[1.6vw] h-[1.6vw]" src={ticket} />
            <p className="text-[1.2vw] font-semibold text-[#1F487C]">
              Rewards/Offers
            </p>
          </div>{" "}
          <div className="flex items-center justify-center gap-[0.5vw]">
            <img className="w-[1.6vw] h-[1.6vw]" src={profile} />
            <p className="text-[1.2vw] font-semibold text-[#1F487C]">
              Login/SignUp
            </p>
          </div>
        </div>
      </div>
      <div className="bg-[#00152F] w-full h-[32vw] relative">
        <p className="absolute top-[0vw] left-[12vw] text-[1.7vw] tracking-wide font-bold">
          <span className="text-white">
            {"India's exclusive".toUpperCase()}
            <span className="text-[#F6C61E] px-[1vw]">
              {"bus price comparison & Booking platform".toUpperCase()}
            </span>{" "}
            {"for the cheapest".toUpperCase()}
          </span>
        </p>{" "}
        {/* <div className="hero">
          <div className="highway"></div>
          <div className="highway2"></div>
        </div> */}
        <div className="bg-build-container">
          <img
            src={bg_build1}
            className="absolute bottom-0 left-0 object-fill "
            style={{
              // height: "95%",
              width: "100%",
            }}
          />
          <img
            src={bg_build2}
            className="absolute bottom-0 left-0 object-fill "
            style={{
              // height: "100%",
              width: "100%",
            }}
          />
          {/* <img
            src={vehicle1}
            className="absolute bottom-0 left-0 object-fill bg-vehicle"
            style={{
              // height: "100%",
              width: "1000%",
              objectFit: "cover",
            }}
          />
          <img
            src={vehicle3}
            className="absolute bottom-0 left-0 object-fill bg-vehicle2"
            style={{
              // height: "100%",
              width: "500%",
              objectFit: "cover",
            }}
          /> */}
        </div>
        <div
          className="bg-[#E5FFF1] absolute rounded-[2vw] grid grid-cols-5"
          style={{
            height: "50%",
            width: "80%",
            left: "10%",
            top: "15%",
          }}
        >
          <div className="col-span-3  w-full h-full ">
            <div className="grid grid-rows-4 w-full h-full">
              <div className="row-span-1 w-full h-full"></div>
              <div className="row-span-1 w-full h-full flex justify-center gap-[2vw]">
                <div className="grid grid-cols-9 w-full h-full px-[4vw]">
                  <div className="col-span-4 w-full h-full items-center justify-center flex">
                    <div
                      className=" bg-[#1F487C] rounded-md relative"
                      style={{
                        width: "100%",
                        height: "80%",
                      }}
                    >
                      <img
                        src={suitcase}
                        className="absolute right-[4vw] bottom-[3.1vw] h-[3vw] w-[1.7vw]"
                      />
                      <img
                        src={bag}
                        className="absolute right-[2.6vw] bottom-[3.0vw] h-[2.2vw] w-[1.7vw]"
                      />
                      <img
                        src={man}
                        className="absolute right-[-0.8vw] bottom-[1.2vw] h-[5.6vw] w-[3.8vw]"
                      />

                      <Select
                        showSearch
                        placeholder="From"
                        optionFilterProp="children"
                        onChange={(value) =>
                          setBusDatas({
                            ...busdatas,
                            from: value,
                          })
                        }
                        onSearch={onSearch}
                        filterOption={filterOption}
                        removeIcon
                        className="w-full h-full pl-[0.1vw] pb-[0.1vw] pt-[0.3vw] pr-[2vw] custom-select custom-select1 custom-select2"
                        options={[
                          {
                            value: "tirupur",
                            label: "Tiruppur",
                          },
                          {
                            value: "coimbatore",
                            label: "Coimbatore",
                          },
                          {
                            value: "pondy",
                            label: "Pondy",
                          },
                        ]}
                      />
                    </div>
                  </div>
                  <div className="col-span-1 w-full h-full items-center justify-center flex">
                    <FaArrowRightArrowLeft
                      color="#1F487C"
                      className="cursor-pointer"
                      size={"2vw"}
                    />
                  </div>
                  <div className="col-span-4 w-full h-full  items-center justify-center flex">
                    <div
                      className=" bg-[#1F487C] rounded-md relative z-10"
                      style={{
                        width: "100%",
                        height: "80%",
                      }}
                    >
                      <img
                        src={stand}
                        className="absolute right-[2vw] bottom-0 h-[8.2vw] w-[1.6vw] pt-[1vw]"
                      />
                      <img
                        src={stand_man}
                        className="absolute right-[-2.4vw] bottom-0 h-[7vw] w-[4.5vw] pt-[0.5vw]"
                      />
                      <img
                        src={map}
                        className="absolute left-0 top-[-4vw] -z-20"
                        style={{
                          // height: "100%",
                          width: "80%",
                        }}
                      />
                      <Select
                        showSearch
                        placeholder="To"
                        optionFilterProp="children"
                        onChange={(value) =>
                          setBusDatas({
                            ...busdatas,
                            to: value,
                          })
                        }
                        onSearch={onSearch}
                        filterOption={filterOption}
                        className="w-full h-full pl-[0.1vw] pb-[0.1vw] pt-[0.3vw] pr-[2vw] text-[1vw] custom-select"
                        options={[
                          {
                            value: "jack",
                            label: "Jack",
                          },
                          {
                            value: "lucy",
                            label: "Lucy",
                          },
                          {
                            value: "tom",
                            label: "Tom",
                          },
                        ]}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="row-span-2 w-full h-full flex-col text-[#727E78]">
                <h1 className="pl-[4vw] pt-[1vw] text-[1vw]">
                  Seat Type (optional)
                </h1>
                {/* <h1>Seat Type (optional)</h1> */}
                <div className="flex gap-[1vw] pt-[1vw] pl-[4vw] items-center w-full ">
                  <button
                    className="border-[0.15vw] border-[#81A3B6] py-[0.3vw] px-[1.5vw] rounded-full text-[1vw]"
                    onClick={() =>
                      setBusDatas({
                        ...busdatas,
                        seater: "",
                      })
                    }
                  >
                    Seater
                  </button>
                  <button className="border-[0.15vw] border-[#81A3B6] py-[0.3vw] px-[1.5vw] rounded-full text-[1vw]">
                    Sleeper
                  </button>
                  <button className="border-[0.15vw] border-[#81A3B6] py-[0.3vw] px-[1.5vw] rounded-full text-[1vw]">
                    Semi-Sleeper
                  </button>
                  <div className="flex items-center justify-center pl-[1vw] gap-[1vw]">
                    <input type="checkbox" className="w-[1.2vw] h-[1.2vw]" />
                    <span className="text-[1vw]">Show AC Buses Only</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-2 w-full h-full">
            <div className="grid grid-rows-6 w-full h-full items-center justify-center">
              <div className="row-span-3  w-full h-full">
                <p className="pl-[0.5vw] pt-[1.5vw] text-[1vw]">
                  Depature Date
                </p>
                <div className="p-[0.5vw] gap-[1.5vw] flex">
                  <div className="bg-[#1F487C] w-[4.5vw] h-[4.5vw] rounded-md">
                    <div className="flex-col text-white pt-[0.5vw]">
                      <p className="text-center  font-semibold text-[1.2vw]">
                        {dayjs(currentDate).format("D")}
                      </p>
                      <p className="text-center text-[1vw]">
                        {dayjs(currentDate).format("ddd")}
                      </p>
                    </div>
                  </div>
                  <div className="bg-[#E5FFF1] w-[4.5vw] h-[4.5vw] rounded-md border-l-[0.1vw] border-t-[0.4vw] border-r-[0.4vw] border-b-[0.1vw] border-[#1F487C]">
                    <div className="flex-col pt-[0.5vw]">
                      <p className="text-center  font-semibold text-[1vw]">
                        {dayjs(nextDate1).format("D")}
                      </p>
                      <p className="text-center text-[1vw]">
                        {dayjs(nextDate1).format("ddd")}
                      </p>
                    </div>
                  </div>
                  <div className="bg-[#E5FFF1] w-[4.5vw] h-[4.5vw] rounded-md border-l-[0.1vw] border-t-[0.4vw] border-r-[0.4vw] border-b-[0.1vw] border-[#1F487C]">
                    <div className="flex-col pt-[0.5vw]">
                      <p className="text-center  font-semibold text-[1vw]">
                        {dayjs(nextDate2).format("D")}
                      </p>
                      <p className="text-center text-[1vw]">
                        {dayjs(nextDate2).format("ddd")}
                      </p>
                    </div>
                  </div>
                  <div className="bg-[#E5FFF1] w-[4.5vw] h-[4.5vw] rounded-md border-l-[0.1vw] border-t-[0.4vw] border-r-[0.4vw] border-b-[0.1vw] border-[#1F487C]">
                    <div className="flex-col pt-[0.5vw]">
                      <p className="text-center  font-semibold text-[1vw]">
                        {dayjs(nextDate3).format("D")}
                      </p>
                      <p className="text-center text-[1vw]">
                        {dayjs(nextDate3).format("ddd")}
                      </p>
                    </div>
                  </div>
                  <div className="bg-[#E5FFF1] w-[4.5vw] h-[4.5vw] rounded-md border-l-[0.1vw] border-t-[0.4vw] border-r-[0.4vw] border-b-[0.1vw] border-[#1F487C]">
                    {/* <div className="flex-col pt-1">
                      <p className="text-center  font-semibold">
                        {dayjs(nextDate3).format("D")}
                      </p>
                      <p className="text-center">
                        {dayjs(nextDate3).format("ddd")}
                      </p>
                    </div> */}
                  </div>
                </div>
              </div>
              <div className="row-span-3 w-full h-full items-center justify-center flex">
                <button
                  className="bg-[#1F487C] px-[4vw] py-[0.5vw] rounded-md text-[1.5vw] text-white "
                  onClick={handlebussearch}
                >
                  Search Buses
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute left-0 bottom-[-18.5vw] w-full px-[5vw] h-[20vw]">
          <div className="bg-[#E5FFF1] w-[100%] h-[15vw] rounded-[2vw] shadow-md shadow-black ">
            <div className="h-[20%] w-full flex px-[2vw] items-center justify-between pt-[1vw] ">
              <p className="text-[1.5vw] font-bold">Trending Offers</p>
              <button className="border-[0.1vw] border-black px-[1.5vw] py-[0.2vw] rounded-full text-[1vw]">
                View all
              </button>
            </div>
            <div className="h-[80%] w-full 0">
              <div className="grid grid-cols-5 w-full h-full items-center gap-[1vw] justify-center px-[2vw]">
                {offer.map((item) => (
                  // <div className="col-span-1 w-full h-full items-center  gap-2 flex ">
                  <img src={item} className="w-[100%] h-[80%]" />
                  // </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
