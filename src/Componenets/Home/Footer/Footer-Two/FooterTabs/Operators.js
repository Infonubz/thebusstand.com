import React, { useEffect, useState } from "react";
import homesky from "../../../../../Assets/Theme/Sky/BackgroundSky1.png";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
import { useDispatch } from "react-redux";
import { BiSolidSearch } from "react-icons/bi";
import "../../../TBS-Theme/TBS-Theme.css";
//import { useNavigate } from "react-router";
import { Empty } from "antd";
import { Pagination } from "antd";
import { Popover } from "antd";
import {
  GetOperators,
  OperatorFilters,
} from "../../../../../Api-TBS/Dashboard/Dashboard";
import FooterTwo from "../FooterTwo";
import Navbar_One from "../../../../Common/Top-Navbar/Navbar-One";
import FooterThree from "../../Footer-Three/FooterThree";
import NavMobile from "./NavMobile";

export default function Operators() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedLetter, setSelectedLetter] = useState("A");
  const [operatorData, setOperatorData] = useState();
  //const getoperator = useSelector((state) => state.get_operator_list);
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [currentData, setCurrentData] = useState([]);
  const ITEMS_PER_PAGE = 16;
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
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

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleNextClick = () => {
    setSelectedIndex((prevIndex) => {
      const nextIndex = prevIndex !== null ? (prevIndex + 1) % data.length : 0;
      setSelectedLetter(data[nextIndex].name); // Set the next letter
      return nextIndex;
    });
  };

  const searchOperators = async (e) => {
     // console.log(e.target.value, "targetvalue");
    setSelectedLetter(e.target.value);
    const data = await OperatorFilters(selectedLetter, e);
    setCurrentData(data?.operator_name?.slice(startIndex, endIndex));
    setOperatorData(data);
  };

  useEffect(() => {
    const FilterOperator = async () => {
       // console.log(selectedLetter, "getoperator");
      try {
        const data = await OperatorFilters(selectedLetter);
        setCurrentData(data?.operator_name?.slice(startIndex, endIndex));
        setOperatorData(data);
         // console.log(data, "datadata1");
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    if (selectedLetter) {
      FilterOperator();
    }
  }, [selectedLetter, currentPage, startIndex, endIndex]);

  useEffect(() => {
    GetOperators(dispatch);
  }, [dispatch]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div
        className={`min-h-screen max-h-auto max-w-screen bg-[#E5FFF1] overflow-clip`}
      >
        <div className="">
          <Navbar_One />
        </div>
        <div
          className="relative md:h-[45vw] h-[100%] bg-[#E5FFF1]"
          style={{ zIndex: 1 }}
        >
          <div
            className="md:h-[10vw] h-[19vw]  md:z-0 overflow-x-hidden"
            style={{
              backgroundImage: `url(${homesky})`,
              width: "100%",
              overflow: "hidden",
              // backgroundSize: "cover",
              position: "relative",
              overflowX: "hidden",
            }}
          >
            <label className="absolute left-[36vw] md:left-[38vw] top-[2vw] md:top-[0.1vw] text-[6vw]  md:text-[4vw] text-white font-bold opacity-20">
              {`Operators`}
            </label>
            <label className="absolute left-[42vw] md:left-[43vw] top-[3.5vw] md:top-[2vw] text-[4vw]  md:text-[2vw] text-white font-bold">
              {"Operators"}
            </label>
            <div className="absolute left-[3vw] top-[4vw] z-[2] text-[7vw] text-white font-bold md:hidden sm:block ">
              <NavMobile />
            </div>
            <div className="cloudhome"></div>
          </div>
          <div
            className={`md:block hidden absolute top-[7vw] px-[3vw] flex flex-col`}
          >
            <div
              className={`bg-white pl-[0.5vw] w-[94vw] flex flex-row h-[4vw] border-solid border border-t-[#7f8792] border-b-[#1F487C]
             border-x-[#1f477caf] relative rounded-t-[1vw]`}
            >
              <div
                className={`flex flex-row gap-[0.3vw] font-bold text-center`}
              >
                {data.map((item, index) => (
                  <div key={item.id} className={`flex items-center`}>
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
                      <div className={`text-center`}>{item.name}</div>
                    </button>
                    <div
                      className={`h-[2vw] border-solid border ml-[0.3vw] border-l-[#1f477c49]`}
                    ></div>
                  </div>
                ))}
              </div>

              <div
                className={`flex-1 text-[1.1vw] text-[#1F487C] pt-[0.7vw] pl-[1.4vw]`}
              >
                <button
                  type="button"
                  className={`flex items-center px-[0.5vw] text-[#1F487C] text-[1vw] border-solid border border-[#1f477ca8] justify-center h-[2.5vw] gap-[0.5vw] rounded-lg`}
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
              <div className={`flex pl-[0.1vw]`}>
                <div
                  className={`bg-[#1F487C] rounded-t-[0.5vw] flex w-[12.5vw]  items-center gap-[0.5vw]`}
                >
                  <BiSolidSearch
                    className={`search-icon pl-[1vw]`}
                    style={{
                      color: "#e7eaec",
                      height: "3vw",
                      width: "3vw",
                    }}
                  />
                  <input
                    type="text"
                    className={`bg-[#1F487C] w-full text-[1.25vw] placeholder:text-[1.2vw] text-white outline-none px-[0.1vw]`}
                    placeholder="Search Operators"
                    autoComplete="off"
                    onChange={(e) => {
                      searchOperators(e);
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div
            className={`absolute top-[15vw] md:top-[10vw] px-[2vw] md:px-[3vw]`}
          >
            <div
              className={`bg-white w-[96vw] md:w-[94vw] h-[87vh] md:h-[29vw] relative rounded-[3vw] md:rounded-[1vw] shadow-lg shadow-gray-300`}
            >
              <div
                className={`block md:hidden flex flex-row overflow-y-auto gap-[2vw] font-bold text-center px-[2vw] pt-[2vw] scrollbar-hide`}
              >
                {data.map((item, index) => (
                  <div key={item.id} className={`flex items-center`}>
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
                    <div
                      className={`h-[5vw] border-solid border ml-[1.5vw] border-l-[#1f477c49]`}
                    ></div>
                  </div>
                ))}
              </div>
              <div
                className={`block md:hidden flex justify-center items-center pt-[5vw] pl-[0.5vw]`}
              >
                <div
                  className={`flex searchMble px-[22vw] items-center gap-[0.5vw]`}
                >
                  <BiSolidSearch
                    className={`search-icon`}
                    style={{
                      color: "#e7eaec",
                      height: "7vw",
                      width: "7vw",
                    }}
                  />
                  <input
                    type="text"
                    className={`opSearch-input text-[4vw] text-white outline-none pl-[2vw] placeholder:text-[4vw]`}
                    placeholder="Search Operators"
                    autoComplete="off"
                    onChange={(e) => {
                      searchOperators(e);
                    }}
                  />
                </div>
              </div>
              <div
                className={`grid md:grid-flow-col grid-flow-row grid-cols-2 md:grid-rows-7 px-[2vw] mt-[7vw] md:mt-[2vw]`}
              >
                {currentData?.length > 0 ? (
                  currentData?.map((item, index) => (
                    <div
                      className={`flex items-center justify-between`}
                      key={index}
                    >
                      {item?.length > 20 ? (
                        <Popover content={item}>
                          {" "}
                          <div
                            className={`text-[#1F487C] font-bold text-[3.5vw] md:text-[1.2vw] p-[3vw] md:p-[1vw]`}
                          >
                            {item?.substr(0, 20)}...
                          </div>
                        </Popover>
                      ) : (
                        <div
                          className={`text-[#1F487C] font-bold text-[3.5vw] md:text-[1.2vw] p-[3vw] md:p-[1vw]`}
                        >
                          {item}
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <div
                    className={`absolute top-[60vw] pl-[20vw] md:top-[0vw] md:pl-[0vw]`}
                  >
                    <Empty className="md:pl-[40vw] md:pt-[7vw]" />
                  </div>
                )}
              </div>
              <div
                className={`block md:hidden flex px-[30vw] bottom-[8vw] fixed`}
              >
                <Pagination
                  current={currentPage}
                  total={10}
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
      <span className="md:block hidden">
        <FooterTwo />
        <FooterThree />
      </span>
    </>
  );
}
