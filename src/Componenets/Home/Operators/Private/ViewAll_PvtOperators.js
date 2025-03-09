import React, { useEffect, useState } from "react";
// import buslogo from "../../../src/assets/502-ai 1.png";
// import busstand from "../../../src/assets/busstand.png";
// import bus from "../../../src/assets/bus 1.png";
// import share from "../../../src/assets//Share.png";
// import ticket from "../../../src/assets/ticket.png";
// import profile from "../../../src/assets/Profile.png";
import ShareButtons from "../../../Common/Common-Functions/ShareButton";
import ModalPopup from "../../../Common/Modal/Modal";
//import join from "../../assets/join.png";
//import { useNavigate } from "react-router-dom";
//import { Link, NavLink } from "react-router-dom";
//import { IoMdArrowBack } from "react-icons/io";
import homesky from "../../../../Assets/Theme/Sky/BackgroundSky1.png";
import CommonMainNavbar from "../../../Common/Top-Navbar/Navbar-One";
//import Footer from "./Footer";
//import ColorCodes from "../Common/ColorCodes";
import { useDispatch, useSelector } from "react-redux";
import { Abhibus_GetOperators } from "../../../../Api-Abhibus/Home/HomePage";
import { Tooltip } from "antd";
import ReactPaginate from "react-js-pagination";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faAngleDoubleLeft,
  faAngleDoubleRight,
} from "@fortawesome/free-solid-svg-icons";
import "../../../../App.css";
import { GetTBSOperators } from "../../../../Api-TBS/Home/Home";

export default function ViewAll_PvtOperators() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const colors = useSelector((state) => state.themecolors[0]);
  const Get_Operators = useSelector((state) => state.get_operators);
  const dispatch = useDispatch();
  const [activePage, setActivePage] = useState(1);
  const itemsPerPage = 60;
  // const [showDialog, setShowDialog] = useState(false);
  //const navigation = useNavigate();
  // const colors=ColorCodes()

  //   const BusOperator = [
  //     "SRS Travels",
  //     "VRL Travels",
  //     "JBT Travels",
  //     "Humsafar Travels",
  //     "Kallada Travels",
  //     "Chartered Speed",
  //     "Shatabdi Travels",
  //     "Mahasagar Travels",
  //     "SRS Travels",
  //     "VRL Travels",
  //     "JBT Travels",
  //     "Humsafar Travels",
  //     "Kallada Travels",
  //     "Chartered Speed",
  //     "Shatabdi Travels",
  //     "Mahasagar Travels",
  //     "SRS Travels",
  //     "VRL Travels",
  //     "JBT Travels",
  //     "Humsafar Travels",
  //     "Kallada Travels",
  //     "Chartered Speed",
  //     "Shatabdi Travels",
  //     "Mahasagar Travels",
  //   ];

  const indexOfLastItem = activePage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems =
    Get_Operators?.length > 0 &&
    Get_Operators?.slice(indexOfFirstItem, indexOfLastItem);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
  };

  useEffect(() => {
    if (currentItems?.length === 0) {
      setActivePage(activePage - 1);
    }
  }, [currentItems]);

  const closeModal = () => {
    setModalIsOpen(false);
    // setShowDialog(false);
  };

  useEffect(() => {
    // Abhibus_GetOperators(dispatch);
    GetTBSOperators(dispatch);
  }, []);

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
            }}
          >
            <label className="absolute left-[18vw] md:left-[30vw] top-[2vw] md:top-[0.1vw] text-[7vw]  md:text-[4vw] text-white font-bold opacity-20">
              {`Private Bus Operators`}
            </label>
            <label className="absolute md:left-[37vw] left-[32vw] top-[5vw] md:top-[2vw] text-[4vw]  md:text-[2vw] text-white font-bold">
              {"Private Bus Operators"}
            </label>
            <div className="cloudhome"></div>
          </div>
          <div className="absolute md:top-[7vw] top-[13vw] left-[3.5vw] md:left-[3vw] bg-white w-[93%] md:w-[94vw] h-[85vh] md:h-[35vw] rounded-lg shadow-lg shadow-gray-400">
            <div className="px-[5vw]">
              <div className=" w-full flex items-center justify-center md:justify-between md:py-[0vw] py-[2vw] my-[1vw] ">
                <p
                  className={`md:text-[1.5vw] text-[5vw] text-[${colors.primary}] font-bold`}
                >
                  {`${Get_Operators?.length}+ Private Bus Operators`}
                </p>
              </div>
              <div className="md:max-h-[28vw] h-[75vh]  overflow-y-auto">
                <div className="grid grid-cols-2 md:grid-cols-6 w-full px-[0.3vw] mt-[1vw] ">
                  {currentItems?.length > 0 &&
                    currentItems?.map((operator, index) => (
                      <div key={index} className="col-span-1 w-full py-[0.4vw]">
                        <p className="md:text-[1vw] text-[2.8vw] ">
                          {operator?.operater_name?.length > 19 ? (
                            <Tooltip
                              placement="top"
                              title={operator?.operater_name}
                              className="cursor-pointer"
                              color="#1F487C"
                            >
                              {`${operator.operater_name.slice(0, 19)}...`}
                            </Tooltip>
                          ) : (
                            operator?.operater_name.slice(0, 18)
                          )}
                        </p>
                      </div>
                    ))}
                </div>
              </div>
              <div className="flex w-full items-end justify-end">
                <ReactPaginate
                  activePage={activePage}
                  itemsCountPerPage={itemsPerPage}
                  totalItemsCount={Get_Operators?.length}
                  pageRangeDisplayed={4}
                  onChange={handlePageChange}
                  itemClass="page-item"
                  linkClass="page-link"
                  activeClass="active"
                  prevPageText={
                    <FontAwesomeIcon icon={faChevronLeft} size="1vw" />
                  }
                  nextPageText={
                    <FontAwesomeIcon icon={faChevronRight} size="1vw" />
                  }
                  firstPageText={
                    <FontAwesomeIcon icon={faAngleDoubleLeft} size="1vw" />
                  }
                  lastPageText={
                    <FontAwesomeIcon icon={faAngleDoubleRight} size="1vw" />
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <span className="md:block hidden">{/* <Footer /> */}</span>
      <ModalPopup
        show={modalIsOpen}
        onClose={closeModal}
        height="28vw"
        width="32vw"
      >
        <ShareButtons url={"http://localhost:3008/"} />
      </ModalPopup>

      {/* ------------------------MobileView------------------- */}
      {/* <div className="md:hidden block">
              <div className={`bg-[${colors.primary}] `}>
                <div className="grid grid-cols-6 items-center px-[5vw]">
                  <div className="col-span-2 py-5">
                    <NavLink to="/">
                      <IoMdArrowBack className="w-[6vw] h-[6vw]" color="white" />
                    </NavLink>
                  </div>
                  <div className="col-span-2 text-white">Bus Companies</div>
                </div>
              </div>
              <div className={`bg-[${colors.background}] min-h-screen max-h-auto overflow-auto absolute w-full `}>
                <div className=" w-full flex px-[2vw] items-center justify-between ">
                  <p className={`md:text-[1.5vw] text-[5vw] text-[${colors.primary}] font-bold`}>
                    4500+ Private Bus Operators
                  </p>
                </div>
                <div className="grid md:grid-cols-6 grid-cols-3 w-full  px-[2vw] my-[2vw] ">
                  {BusOperator.map((item) => (
                    <div className="col-span-1 w-full py-[0.8vw]">
                      <p className="md:text-[1.2vw] text-[2.8vw]">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div> */}

      {/* ------------------------MobileView------------------- */}
    </>
  );
}
