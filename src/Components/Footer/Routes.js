import React, { useEffect, useState } from "react";
import homesky from "../../assets/homesky.png";
import Footer1 from "./Footer";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
import "../../App.css";
import { LuSend } from "react-icons/lu";
import { Input } from "antd";
import { GrLocation } from "react-icons/gr";
import { CgArrowsExchangeV } from "react-icons/cg";
import CommonMainNavbar from "../Common/CommonMainNavbar";

const Routes = () => {
  const data = [
    { id: 1, name: "A" },
    { id: 2, name: "B" },
    { id: 3, name: "C" },
    { id: 4, name: "D" },
    { id: 5, name: "E" },
    { id: 6, name: "F" },
    { id: 7, name: "G" },
    { id: 8, name: "H" },
    { id: 9, name: "I" },
    { id: 10, name: "J" },
    { id: 11, name: "K" },
    { id: 12, name: "L" },
    { id: 13, name: "M" },
    { id: 14, name: "N" },
    { id: 15, name: "O" },
    { id: 16, name: "P" },
    { id: 17, name: "Q" },
    { id: 18, name: "R" },
    { id: 19, name: "S" },
    { id: 20, name: "T" },
    { id: 21, name: "U" },
    { id: 22, name: "V" },
    { id: 23, name: "W" },
    { id: 24, name: "X" },
    { id: 25, name: "Y" },
    { id: 26, name: "Z" },
  ];

  const routesData = [
    { id: 1, name: "Chennai" },
    { id: 2, name: "Coimbatore" },
    { id: 3, name: "Bangalore" },
    { id: 4, name: "Hyderabad" },
    { id: 5, name: "Kochi" },
    { id: 6, name: "Thrissur" },
    { id: 7, name: "Madurai" },
    { id: 8, name: "Kodaikanal" },
    { id: 9, name: "Wayanad" },
    { id: 10, name: "Tirupati" },
    { id: 11, name: "Koyambedu" },
    { id: 12, name: "Thoothukudi" },
    { id: 13, name: "Rameswaram" },
    { id: 14, name: "Karaikudi" },
    { id: 15, name: "Nagapattinam" },
    { id: 16, name: "Alapuzha" },
    { id: 17, name: "Kollam" },
    { id: 18, name: "Vellore" },
    { id: 19, name: "Plakad" },
    { id: 20, name: "Dindigul" },
    { id: 21, name: "Palani" },
    { id: 22, name: "Theni" },
    { id: 23, name: "Tirunelveli" },
    { id: 24, name: "Nagercoil" },
    { id: 25, name: "Marthandam" },
    { id: 26, name: "Kanyakumari" },
  ];

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedLetter, setSelectedLetter] = useState("A");
  // const [startIndex, setStartIndex] = useState(0);

  const handleNextClick = () => {
    setSelectedIndex((prevIndex) => {
      const nextIndex = prevIndex !== null ? (prevIndex + 1) % data.length : 0;
      return nextIndex;
    });
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  console.log(selectedLetter, "selectedLetter");
  return (
    <>
      <div className="">
        <div className="">
          <CommonMainNavbar />
        </div>
        <div
          className="relative h-[42vw] bg-[#E5FFF1]"
          style={{
            zIndex: 1,
          }}
        >
          {/* <img src={homesky} className="w-full h-[10vw] bg-[#2B8EE4]" /> */}
          <div
            className=" h-[10vw] overflow-x-hidden"
            style={{
              backgroundImage: `url(${homesky})`,
              overflow: "hidden",
              backgroundSize: "cover",
              position: "relative",
              overflowX: "hidden",
              width: "100%",
            }}
          >
            <div className="absolute inset-0 flex justify-center opacity-20">
              <span className="text-[4vw] text-white font-bold">
                Routes List
              </span>
            </div>
            <div className="absolute grid grid-cols-12 gap-[7.5vw]">
              <div className="col-start-1 col-span-4 pt-[2vw] pl-[3vw] text-[1.2vw] text-white font-bold">
                {`Home > Routes`}
              </div>
              <div className="cloudhome"></div>
              <div className="col-start-6 col-end-12 pl-[6vw] text-[2.5vw] pt-[1vw] text-white font-bold">
                Routes List
              </div>
            </div>
            <div className="absolute top-[5.5vw] px-[2vw] grid grid-cols-8 w-full"></div>
          </div>

          <div className="grid grid-cols-5 gap-[3vw]">
            <div className="col-span-1">
              <div className="absolute top-[7vw] px-[3vw] flex flex-col">
                <div className="bg-white w-[20vw] flex flex-col h-[17vw] rounded-[1vw]">
                  <div className="flex pt-[1vw]">
                    <p className="pl-[2.5vw] text-[1.5vw] font-bold text-[#1F487C] text-center justify-center items-center">
                      Search for Bus Routes
                    </p>
                  </div>

                  <div className="relative">
                    <div className="relative pl-[1.5vw]  pt-[1.5vw]">
                      <Input
                        size="large"
                        className="p-[0.5vw] w-[17vw]"
                        placeholder="Leaving from"
                        prefix={
                          <LuSend
                            style={{
                              color: "#1F487C",
                              height: "2vw",
                              width: "2vw",
                              paddingRight: "0.7vw",
                            }}
                          />
                        }
                      />
                    </div>
                    <div className="relative pl-[1.5vw] pt-[0.5vw]">
                      <Input
                        size="large"
                        className="p-[0.5vw] w-[17vw]"
                        placeholder="Going to"
                        prefix={
                          <GrLocation
                            style={{
                              color: "#1F487C",
                              height: "2vw",
                              width: "2vw",
                              paddingRight: "0.7vw",
                            }}
                          />
                        }
                      />
                    </div>
                  </div>
                  <div className="absolute left-[18.5vw] text-right items-end pt-[7vw] z-10">
                    <button className="bg-[#1F487C] px-[0.2vw] text-white text-[1.4vw] justify-end h-[4.3vh] gap-[0.5vw] items-end rounded-[0.5vw]">
                      <CgArrowsExchangeV
                        style={{
                          color: "#f9fafc",
                          height: "2vw",
                          width: "2vw",
                        }}
                      />
                    </button>
                  </div>
                  <div className="flex pl-[3.8vw] pt-[2vw]">
                    <button className="bg-[#1F4B7F] flex px-[3vw] text-white text-[1.4vw] justify-center h-[5vh] gap-[0.5vw] items-center rounded-[0.5vw]">
                      SEARCH
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-4">
              <div className="absolute top-[7vw] px-[3vw] flex flex-col">
                <div className="bg-white border-solid border border-b-[#1F487C] w-[73.4vw] flex flex-row h-[4vw] relative rounded-t-[1vw]">
                  <div className="flex flex-row gap-[0.4vw] font-bold text-center">
                    {data.map((item, index) => (
                      <div
                        key={item.id}
                        className={`flex
                    text-[1.2vw] text-[#1F487C] pt-[1vw] h-[2vw] w-[2vw] ml-[0.2vw] cursor-pointer
                   ${
                     selectedIndex === index
                       ? "text-white h-[2vw] w-[2vw] bg-[#1F487C] rounded-md ml-[0.2vw] mt-[1vw] pt-[0vw] pt-0 flex"
                       : ""
                   }
                 `}
                        onClick={() => {
                          setSelectedIndex(index);
                          setSelectedLetter(item.name);
                        }}
                      >
                        <div className="flex h-[2vw] w-[2vw] pl-[0.6vw] text-center items-center justify-center">
                          {item.name}
                        </div>
                        <div className="h-[2vw] ml-[1vw] mr-[1vw] border-solid border border-l-[#1f477c49]"></div>
                      </div>
                    ))}
                  </div>
                  <div className="flex-1 text-[1.1vw] pl-[0.4vw] text-[#1F487C] pt-[0.7vw]">
                    <button
                      type="button"
                      className="flex items-center px-[0.7vw] text-[#1F487C] text-[1vw] border-solid border border-[#1f477ca8] justify-center h-[2.5vw] gap-[0.5vw] rounded-lg"
                      onClick={handleNextClick}
                    >
                      Next
                      <span>
                        <MdOutlineKeyboardDoubleArrowRight
                          style={{
                            color: "#1F487C",
                            height: "1.5vw",
                            width: "1.4vw",
                          }}
                        />
                      </span>
                    </button>
                  </div>
                </div>
              </div>
              <div className="absolute top-[10vw] px-[3vw]">
                <div className="bg-white w-[73.4vw] h-[27vw] relative rounded-[1vw]">
                  <div className="grid grid-flow-col grid-rows-8 px-[2vw] mt-[2vw]">
                    {routesData?.map((item, index) => (
                      <div className="flex items-center" key={index}>
                        <div
                          className="text-[#1F487C] font-bold text-[1.1vw] p-[0.7vw]"
                          key={index}
                        >
                          {item?.name}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="">
          <Footer1 />
        </div>
      </div>
    </>
  );
};

export default Routes;
