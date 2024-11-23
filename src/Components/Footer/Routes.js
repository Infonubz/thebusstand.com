import React, { useEffect, useState } from "react";
import homesky from "../../assets/BackgroundSky1.png";
import Footer1 from "./Footer";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
import "../../App.css";
import "../Home/test.css";
import { LuSend } from "react-icons/lu";
import { Input } from "antd";
import { GrLocation } from "react-icons/gr";
import { CgArrowsExchangeV } from "react-icons/cg";
import CommonMainNavbar from "../Common/CommonMainNavbar";
//import { useNavigate } from "react-router";
import { Pagination } from "antd";

const Routes = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedLetter, setSelectedLetter] = useState("A");
  // const [startIndex, setStartIndex] = useState(0);

  const [currentPage, setCurrentPage] = useState(1);
  const [currentData, setCurrentData] = useState([]);
  const ITEMS_PER_PAGE = 12;
  //const navigation = useNavigate();

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

  const styles = {
    inputContainer: {
      display: "flex",
      alignItems: "center",
      width: "75vw",
      border: "1px solid #ccc",
      borderRadius: "4px",
      padding: "5px",
    },
    icon: {
      marginRight: "8px",
      color: "#1F487C",
      height: "6vw",
      width: "6vw",
    },
    input: {
      border: "none",
      outline: "none",
      flex: 1,
      width: "100%",
      fontSize: "1rem",
    },
  };

  const handleNextClick = () => {
    setSelectedIndex((prevIndex) => {
      const nextIndex = prevIndex !== null ? (prevIndex + 1) % data.length : 0;
      return nextIndex;
    });
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    setCurrentData(routesData?.slice(startIndex, endIndex));
  }, [currentPage, routesData]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


  return (
    <>
      <div className=" min-h-screen max-h-auto w-full bg-[#E5FFF1]">
        <div className="">
          <CommonMainNavbar />
        </div>
        <div
          className="relative h-auto md:h-[42vw]"
          style={{
            zIndex: 1,
          }}
        >
          {/* <img src={homesky} className="w-full h-[10vw] bg-[#2B8EE4]" /> */}
          <div
            className="md:h-[10vw] h-[20vw] overflow-x-hidden"
            style={{
              backgroundImage: `url(${homesky})`,
              overflow: "hidden",
              backgroundSize: "cover",
              position: "relative",
              overflowX: "hidden",
              width: "100%",
            }}
          >
            <label className="absolute right-[40vw] md:right-[44.5vw] top-[2.5vw] md:top-[1.7vw] text-[4vw] md:text-[2.2vw] text-white font-bold">{`Routes List`}</label>
            <label className="absolute md:block hidden right-[34vw] md:right-[40vw] top-[.2vw] text-[7vw] md:text-[4vw] opacity-25 text-white font-bold">{`Routes List`}</label>
            <div className="cloudhome"></div>
            <div className="absolute top-[5.5vw] px-[2vw] grid grid-cols-8 gap-[1vw] w-full"></div>
          </div>

          <div className="grid grid-cols-6 gap-[18vw]">
            <div className="md:block hidden col-span-1">
              <div className="absolute top-[7vw] px-[2vw] flex flex-col">
                <div className="bg-white w-[19vw] flex flex-col h-auto rounded-[1vw] py-[1vw] shadow-lg shadow-gray-300">
                  <div className="flex">
                    <p className="pl-[2vw] text-[1.5vw] font-bold text-[#1F487C] text-center justify-center items-center">
                      Search for Bus Routes
                    </p>
                  </div>

                  <div className="relative">
                    <div className="relative pl-[1vw] pt-[1.5vw]">
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
                    <div className="relative pl-[1vw] pt-[0.5vw]">
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
                  <div className="absolute left-[18vw] text-right items-end pt-[6vw] z-10">
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
                    <button className="bg-[#1F4B7F] px-[3vw] text-white text-[1.4vw] justify-center h-[5vh] gap-[0.5vw] items-center rounded-[0.5vw]">
                      SEARCH
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-5">
              <div className="md:block hidden absolute top-[7vw] px-[3vw] flex flex-col">
                <div
                  className="bg-white border-solid border px-[1vw] border-b-[#1F487C] w-[74.3vw] 
                flex flex-row h-[4vw] relative rounded-t-[1vw]"
                >
                  <div className="flex flex-row gap-[0.2vw] font-bold text-center">
                    {data.map((item, index) => (
                      <div key={item.id} className="flex items-center">
                        <button
                          className={`
          text-[1.2vw] text-[#1F487C] h-[2vw] w-[2vw] mt-[0.1vw] cursor-pointer
          ${selectedIndex === index ? "text-white bg-[#1F487C] rounded-md" : ""}
        `}
                          onClick={() => {
                            setSelectedIndex(index);
                            setSelectedLetter(item.name);
                          }}
                        >
                          <div className="text-center">{item.name}</div>
                        </button>
                        <div className="h-[2vw] border-solid border border-l-[#1f477c49] ml-[0.2vw]"></div>
                      </div>
                    ))}
                  </div>

                  <div className="flex-1 text-[1.1vw] text-[#1F487C] pt-[0.7vw] pl-[1vw]">
                    <button
                      type="button"
                      className="flex items-center px-[0.3vw] text-[#1F487C] text-[1vw] border-solid border border-[#1f477ca8] justify-center h-[2.5vw] gap-[0.5vw] rounded-lg"
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
              <div className={`absolute top-[10vw] px-[3vw]`}>
                <div
                  className={`bg-white md:w-[74.3vw] w-[94vw] h-[87vh] md:h-[29vw] relative rounded-[3vw] md:rounded-[1vw] shadow-lg shadow-gray-300`}
                >
                  <div
                    className={`block md:hidden flex flex-row overflow-y-auto gap-[2vw] font-bold text-center px-[2vw] pt-[2vw] scrollbar-hide`}
                  >
                    {data.map((item, index) => (
                      <div key={item.id} className="flex items-center">
                        <button
                          className={`
          text-[4.5vw] text-[#1F487C] h-[7vw] w-[7vw] cursor-pointer text-center justify-center
          ${
            selectedIndex === index
              ? "text-white bg-[#1F487C] text-center justify-center]"
              : ""
          }
        `}
                          onClick={() => {
                            setSelectedIndex(index);
                            setSelectedLetter(item.name);
                          }}
                        >
                          <div className="">{item.name}</div>
                        </button>
                        <div className="h-[5vw] border-solid border ml-[1.5vw] border-l-[#1f477c49]"></div>
                      </div>
                    ))}
                  </div>
                  <div
                    className={`block md:hidden border border-1 border-[#1F487C] w-[88vw] flex flex-col h-auto rounded-[2vw] mt-[6vw] ml-[3vw] py-[2vw]`}
                  >
                    <div className="flex">
                      <p className="pl-[21vw] text-[4.2vw] font-bold text-[#1F487C] text-center justify-center items-center">
                        Search for Bus Routes
                      </p>
                    </div>

                    <div className="relative p-[3vw]">
                      <div className="relative pl-[3vw] pt-[3vw]">
                        <div style={styles.inputContainer}>
                          <LuSend style={styles.icon} />
                          <input
                            type="text"
                            placeholder="Leaving from"
                            className="placeholder:text-[4vw] placeholder:text-[#1F487C]"
                            style={styles.input}
                          />
                        </div>
                      </div>
                      <div className="relative pl-[3vw] pt-[3vw]">
                        <div style={styles.inputContainer}>
                          <GrLocation style={styles.icon} />
                          <input
                            type="text"
                            placeholder="Going to"
                            className="placeholder:text-[4vw] placeholder:text-[#1F487C]"
                            style={styles.input}
                          />
                        </div>
                        {/* <Input
                          className="p-[1vw] w-[75vw] h-[9vw]"
                          placeholder="Going to"
                          prefix={
                            <GrLocation
                              style={{
                                color: "#1F487C",
                                height: "6vw",
                                width: "6vw",
                                paddingRight: "2vw",
                              }}
                            />
                          }
                        /> */}
                      </div>
                    </div>
                    <div className="absolute left-[73vw] text-right items-end top-[35vw] z-10">
                      <button className="bg-[#1F487C] px-[0.2vw] text-white text-[4vw] justify-end w-[9vw] h-[4vh] gap-[0.5vw] items-end rounded-[2vw]">
                        <CgArrowsExchangeV
                          style={{
                            color: "#f9fafc",
                            height: "7vw",
                            width: "8.5vw",
                          }}
                        />
                      </button>
                    </div>
                    <div className="flex pl-[22vw] pt-[2vw]">
                      <button className="bg-[#1F4B7F] px-[3vw] text-white text-[4vw] justify-center w-[40vw] h-[5vh] gap-[0.5vw] items-center rounded-[2vw]">
                        SEARCH
                      </button>
                    </div>
                  </div>
                  <div
                    className={`grid grid-flow-row grid-cols-2 md:grid-flow-col md:grid-rows-8 px-[2vw] mt-[7vw] md:mt-[2vw]`}
                  >
                    {currentData?.map((item, index) => (
                      <div className="flex items-center" key={index}>
                        <div
                          className="text-[#1F487C] font-bold text-[3.5vw] ml-[6vw] p-[3vw] md:text-[1.1vw] md:p-[0.7vw]"
                          key={index}
                        >
                          {item?.name}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="block md:hidden flex ml-[20vw] bottom-[8vw] fixed">
                    <Pagination
                      current={currentPage}
                      total={routesData.length}
                      pageSize={ITEMS_PER_PAGE}
                      onChange={handlePageChange}
                      showSizeChanger
                      showQuickJumper
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <span className="md:block hidden">
          <Footer1 />
        </span>
    </>
  );
};

export default Routes;
