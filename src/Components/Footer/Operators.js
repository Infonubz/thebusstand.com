import React, { useEffect, useState } from "react";
import homesky from "../../assets/homesky.png";
import Footer1 from "./Footer";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
import { GetOperators, OperatorFilters } from "../../Api/Dashboard/Dashboard";
import { useDispatch } from "react-redux";
import { BiSolidSearch } from "react-icons/bi";
import "../../App.css";
import CommonMainNavbar from "../Common/CommonMainNavbar";
import { Empty } from "antd";

const Operators = () => {
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

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedLetter, setSelectedLetter] = useState("A");
  const [operatorData, setOperatorData] = useState();
  //const getoperator = useSelector((state) => state.get_operator_list);

  const handleNextClick = () => {
    setSelectedIndex((prevIndex) => {
      const nextIndex = prevIndex !== null ? (prevIndex + 1) % data.length : 0;
      setSelectedLetter(data[nextIndex].name); // Set the next letter
      return nextIndex;
    });
  };

  const searchOperators = async (e) => {
    console.log(e.target.value, "targetvalue");
    setSelectedLetter(e.target.value);
    const data = await OperatorFilters(selectedLetter, e);
    setOperatorData(data);
  };


  const dispatch = useDispatch();

  useEffect(() => {
    const FilterOperator = async () => {
      console.log(selectedLetter, "getoperator");
      try {
        const data = await OperatorFilters(selectedLetter);
        setOperatorData(data);
        console.log(data, "datadata1");
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    if (selectedLetter) {
      FilterOperator();
    }   
  }, [selectedLetter]);

  useEffect(() => {

    GetOperators(dispatch);
  }, [dispatch]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
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
            className="h-[10vw] overflow-x-hidden"
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
                Operators List
              </span>
            </div>

            <div className="absolute grid grid-cols-12 gap-[7.5vw]">
              <div className="col-start-1 col-span-4 pt-[2vw] pl-[3vw] text-[1.2vw] text-white font-bold">
                {`Home > Operators`}
              </div>
              <div className="cloudhome"></div>
              <div className="col-start-6 col-end-12 pl-[4vw] text-[2.5vw] pt-[1vw] text-white font-bold">
                Operators List
              </div>
            </div>
            <div className="absolute top-[5.5vw] px-[2vw] grid grid-cols-8 w-full"></div>
          </div>
          <div className="absolute top-[7vw] px-[3vw] flex flex-col">
            <div className="bg-white w-[94vw] flex flex-row h-[4vw] border-solid border border-t-[#7f8792] border-b-[#1F487C] border-x-[#1f477caf] relative rounded-t-[1vw]">
              <div className="flex flex-row gap-[0.6vw] ml-[1vw] font-bold text-center">
                {data.map((item, index) => (
                  <div
                    key={item.id}
                    className={`flex
                    text-[1.2vw] text-[#1F487C] pt-[1vw] h-[2vw] w-[2vw] ml-[0.2vw] cursor-pointer
                   ${
                     selectedIndex === index
                       ? "text-white pt-[0vw] pt-0 h-[2vw] w-[2vw] bg-[#1F487C] rounded-md ml-[0.2vw] flex mt-[1vw]"
                       : ""
                   }
                 `}
                    onClick={() => {
                      setSelectedIndex(index);
                      setSelectedLetter(item.name);
                    }}
                  >
                    <div className="flex h-[2vw] w-[2vw] pl-[0.6vw]">
                      {item.name}
                    </div>
                    <div className="flext h-[2vw] ml-[1vw] border-solid border border-l-[#1f477c49]"></div>
                  </div>
                ))}
              </div>
              <div className="flex-1 pl-[0.4vw] text-[1.1vw] text-[#1F487C] pt-[0.7vw]">
                <button
                  type="button"
                  className="flex items-center px-[0.5vw] text-[#1F487C] text-[1vw] border-solid border border-[#1f477ca8] justify-center h-[2.5vw] gap-[0.5vw] rounded-lg"
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
              <div className="flex pl-[1vw]">
                <div className="flex search items-center gap-[0.5vw]">
                  <BiSolidSearch
                    className="search-icon pl-[1vw]"
                    style={{
                      color: "#e7eaec",
                      height: "3vw",
                      width: "3vw",
                    }}
                  />
                  <input
                    type="text"
                    className="opSearch-input text-[1.1vw] text-white outline-none pl-[0.1vw]"
                    placeholder="Search Operators"
                    onChange={(e) => {
                      searchOperators(e);
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="absolute top-[10vw] px-[3vw]">
            <div className="bg-white w-[94vw] h-[27vw] relative rounded-[1vw]">
              <div className="grid grid-flow-col grid-rows-7 px-[2vw] mt-[2vw]">
                {operatorData?.operator_name?.length > 0 ? (
                  operatorData?.operator_name?.map((item, index) => (
                    <div
                      className="flex items-center justify-between"
                      key={index}
                    >
                      <div className="text-[#1F487C] font-bold text-[1.2vw] p-[1vw]">
                        {item}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="absolute">
                    <Empty className="pl-[40vw] pt-[7vw]" />
                  </div>
                )}
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

export default Operators;
