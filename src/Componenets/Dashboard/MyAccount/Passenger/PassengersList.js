import React, { useEffect, useState } from "react";
import { Table, Spin, Drawer } from "antd";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdOutlineModeEdit } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import "./PassengersTable.css";
import { capitalizeFirstLetter } from "../../../Common/Common-Functions/Captalization";
// import AddPassengers from "./AddPassengers";
// import { PASSENGER_DATA } from "../../../../Store/type";
// import { useDispatch, useSelector } from "react-redux";
import {
  GetPassengById,
  // GetPassengerData,
} from "../../../../Api-TBS/MyAccounts/Passenger";
import ModalPopup from "../../../Common/Modal/Modal";
import Delete from "./DeleteModal";
import { LoadingOutlined } from "@ant-design/icons";
import { FaUser } from "react-icons/fa";
// import { TfiArrowCircleRight } from "react-icons/tfi";
import { LuUser2 } from "react-icons/lu";
import ReactPaginate from "react-js-pagination";
import { FaAngleDoubleLeft } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa6";
import { FaAngleDoubleRight } from "react-icons/fa";
import { FaChevronLeft } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faAngleDoubleLeft,
  faAngleDoubleRight,
} from "@fortawesome/free-solid-svg-icons";


export default function PassengersList({
  nextPage,
  passengerdata,
  // setPassData,
  // passData,
  // updateData,
  setUpdateData,
  setIsEdit,
  spinning,
}) {
  const getDataById = (id) => {
    GetPassengById(id);
  };

  const [passName, setPassName] = useState();
  const [deletemodalIsOpen, setDeleteModalIsOpen] = useState(false);
  const [presentPage, setPresentPage] = useState(true);
  const [mobileDelete, setMobileDelete] = useState(false);
  const [deleteId, SetDeleteId] = useState(null);
  const [bgColor, setBgColor] = useState([]);

  const apiUrlimage = process.env.REACT_APP_API_URL_IMAGE;

  const apicrmimage = process.env.REACT_APP_CRM_API_URL_IMAGE;
  const getRandomColor = () => {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
  };

  const columns = [
    {
      title: <div className="">Name</div>,
      width: "40%",
      sorter: (a, b) => a.user_name.localeCompare(b.user_name),
      sortDirections: ["descend", "ascend"],
      render: (row) => {
        return (
          <div className="flex justify-center">
            <h1 className="text-[1vw]">{row.user_name}</h1>
          </div>
        );
      },
    },
    {
      title: <div className="">Age</div>,
      width: "20%",
      defaultSortOrder: "descend",
      sorter: (a, b) => {
        return a.age - b.age;
      },
      sortDirections: ["descend", "ascend"],
      render: (row) => {
        return (
          <div className="flex justify-center">
            <h1 className="text-[1vw]">{row.age}</h1>
          </div>
        );
      },
    },
    {
      title: <div className="">Gender</div>,
      // dataIndex: 'gender',
      width: "20%",
      render: (row, index) => {
        return (
          <div className="flex justify-center">
            <h1 className="text-[1vw]">{capitalizeFirstLetter(row.gender)}</h1>
          </div>
        );
      },
    },
    {
      title: <div className="">Action</div>,
      key: "actions",
      width: "30%",
      render: (row, record) => {
        return (
          <div className="flex justify-center gap-[1vw] ">
            <div
              className="flex items-center justify-center cursor-pointer px-[0.5vw] border-[0.1vw] border-[#1f4b7f] rounded-[0.2vw] w-[4.5vw] h-[2vw] gap-[0.5vw]"
              onClick={() => {
                setUpdateData(row.tbs_add_pax_id);
                nextPage();
                setIsEdit(true);
              }}
            >
              <div>
                <MdOutlineModeEdit size="1.1vw" />
              </div>
              <div className="text-[1vw]">Edit</div>
            </div>
            <div
              className="flex items-center cursor-pointer px-[0.5vw] border-[0.1vw] border-[#1f4b7f] rounded-[0.2vw] w-[5.5vw] h-[2vw] gap-[0.5vw]"
              onClick={() => {
                setDeleteModalIsOpen(true);
                SetDeleteId(row.tbs_add_pax_id);
                setPassName(row.user_name);
              }}
            >
              <div>
                <RiDeleteBin6Line size="1.1vw" />
              </div>
              <div className="text-[1vw]">Delete</div>
            </div>
          </div>
        );
      },
    },
  ];
  // const data = [
  //   {
  //     key: '1',
  //     name: 'Ethan Anderson',
  //     age: 25,
  //     gender: 'Male',
  //   },
  //   {
  //     key: '2',
  //     name: 'Olivia Martinez',
  //     age: 28,
  //     gender: 'Female',
  //   },
  //   {
  //     key: '3',
  //     name: 'Lucas Johnson',
  //     age: 35,
  //     gender: 'Male',
  //   },
  //   {
  //     key: '4',
  //     name: 'Emma Thompson',
  //     age: 42,
  //     gender: 'Female',
  //   },
  // ];
  // const getRandomColor = () => {
  //   const letters = '0A1B4C2G3H7B9F5D';
  //   let color = '#';
  //   for (let i = 0; i < 6; i++) {
  //     color += letters[Math.floor(Math.random() * 16)];
  //   }
  //   return color;
  // };

  // const handleOnTogglePage = () => {
  //   setPresentPage(!presentPage);
  // };

  const handleNextPage = () => {
    setUpdateData(null);
    nextPage();
    setIsEdit(false);
  };

  const closeDeleteModal = () => {
    setDeleteModalIsOpen(false);
  };

  const closeMobileDelete = () => {
    setMobileDelete(false);
  };

  useEffect(() => {
    const colors = Array.from(
      { length: passengerdata?.length },
      getRandomColor
    );
    setBgColor(colors);
    //   for(let i=0;i<passengerdata?.length ;i++){
    //     setBgColor(getRandomColor())
    //   }
  }, [passengerdata]);
  console.log(passengerdata, "passengers_daata");
  const [activePage, setActivePage] = useState(1);

  const itemsPerPage = 6;
  const indexOfLastItem = activePage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentItems =
    passengerdata?.length > 0 &&
    passengerdata?.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
  };

  return (
    <>
      <div className="md:hidden block ">
        <span className="flex justify-center mt-[2vw] mb-[4vw]  items-center">
          <button
            className="order-last bg-[#1F487C] text-white font-semibold font-size-[1.2vw] flex px-[4vw] items-center justify-center gap-[3.5vw] rounded-full h-[10vw]"
            onClick={handleNextPage}
          >
            <LuUser2 size="7vw" color="white" />
            <p>Add New Passenger </p>
          </button>
        </span>
        {/* <div className="flex items-center justify-between border-b-2 border-t-2 border-gray-300 py-2">
      <span className="text-lg font-semibold">name</span>
      <FaUser className="text-gray-600 text-2xl" />
    </div> */}
        <div className="h-[120vw] border-r-[1vw] border-l-[1vw] overflow-y-auto">
          {console.log(passengerdata, "passdataesdgfkdj,gdn")}
          {passengerdata?.length > 0 &&
            passengerdata.map((value, index) => {
              // const userIconColor = getRandomColor();
              return (
                <div
                  className=" border-t-[.1vw] border-b-[.1vw] flex justify-between items-center px-[2vw] border-gray-300 py-[2vw] my-[2vw]"
                  key={index}
                >
                  <div className="flex items-center gap-x-[3vw]">
                    <FaUser
                      className="text-white rounded-full p-[3vw] text-2xl h-[12vw] w-[12vw]"
                      //  style={{ backgroundColor: userIconColor }}
                      style={{ backgroundColor: bgColor[index] }}
                    />
                    <div className="text-[#1F487C] text-[3.8vw]">
                      <div className="font-semibold">{value.user_name}</div>
                      <span className="flex">
                        <div className="mr-[1vw]">{value.gender},</div>
                        <div>{value.age} years</div>
                      </span>
                    </div>
                    {console.log(value.user_name, "dhkjdshfkjd")}
                  </div>
                  <div className="flex gap-x-[4vw] text-[#1F487C] ">
                    <div
                      onClick={() => {
                        setUpdateData(value.tbs_add_pax_id);
                        nextPage();
                        setIsEdit(true);
                      }}
                    >
                      <MdOutlineModeEdit size="5vw" />
                    </div>
                    <div
                      onClick={() => {
                        // setDeleteModalIsOpen(true);
                        setMobileDelete(true);
                        SetDeleteId(value.tbs_add_pax_id);
                        setPassName(value.user_name);
                      }}
                    >
                      <RiDeleteBin6Line size="5vw" />
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
      <div className="md:block hidden">
        <div className="flex justify-between ">
          <div className=" order-first text-[#1F487C] font-semibold font-size: 1.2vw;">
            Saved Passenger
          </div>
          <div
            className="order-last text-[#1F487C] font-semibold cursor-pointer font-size-[1.2vw] flex items-center gap-[0.5vw]"
            onClick={handleNextPage}
          >
            <IoMdAdd size="1.5vw" /> Add New Passenger
          </div>
        </div>
        <div>
          <div className="text-[#1F487C] text-[1vw] py-[0.5vw]">
            You have {passengerdata?.length} Traveller(s)
          </div>
        </div>
        <div>
          {spinning ? (
            <div
              style={{
                position: "fixed",
                top: 0,
                left: 0,
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
                indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />}
              />
            </div>
          ) : (
            <div className="h-[25vw]">
              <Table
                className="Passenger-class"
                columns={columns}
                // dataSource={data}
                dataSource={currentItems}
                pagination={false}
                // onChange={onChange}
                showSorterTooltip={{
                  target: "sorter-icon",
                }}
              />
            </div>
          )}
        </div>
        {passengerdata?.length > 6 ? (
          <div className="w-full h-[8vh] flex justify-between items-center">
            <div className="text-[#1f4b7f] flex text-[1.1vw] gap-[0.5vw]">
              <span>Showing</span>
              <span className="font-bold">
                {currentItems && currentItems?.length > 0 ? (
                  <div>
                    {indexOfFirstItem + 1} -{" "}
                    {indexOfFirstItem + currentItems?.length}
                  </div>
                ) : (
                  "0"
                )}
              </span>
              <span>from</span>
              <span className="font-bold">
                {passengerdata?.length > 0 ? passengerdata?.length : 0}
              </span>
              <span>data</span>
            </div>
            <div>
              <ReactPaginate
                activePage={activePage}
                itemsCountPerPage={itemsPerPage}
                totalItemsCount={passengerdata?.length}
                pageRangeDisplayed={3}
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
        ) : (
          ""
        )}
      </div>
      <ModalPopup
        show={deletemodalIsOpen}
        onClose={closeDeleteModal}
        height="20vw"
        width="30vw"
        closeicon={false}
      >
        <Delete
          api={`${apiUrlimage}/api/add-passenger-details/${deleteId}`}
          title={"Want to delete Passenger"}
          setDeleteModalIsOpen={setDeleteModalIsOpen}
          passName={passName}
        />
      </ModalPopup>
      <Drawer
        placement={"bottom"}
        closable={false}
        onClose={closeMobileDelete}
        open={mobileDelete}
        key={"bottom"}
        height={"75vw"}
        className="md:hidden block"
      >
        <Delete
          api={`${apiUrlimage}/api/add-passenger-details/${deleteId}`}
          title={"Want to delete Passenger"}
          setDeleteModalIsOpen={setMobileDelete}
          passName={passName}
        />
      </Drawer>
    </>
  );
}
