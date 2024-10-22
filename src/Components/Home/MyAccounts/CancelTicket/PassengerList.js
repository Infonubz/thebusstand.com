import React, { useState, useEffect, useMemo } from "react";
import { Table, Spin } from "antd";
import { TbTicketOff } from "react-icons/tb";
import ModalPopup from "../../../MainComponenet/Modal/ModalPopup";
import { useDispatch, useSelector } from "react-redux";
import { CancelTicket } from "../../../../Api/MyAccounts/MyBookings";
import { TiArrowRightOutline } from "react-icons/ti";
import moment from "moment";
import { LoadingOutlined } from "@ant-design/icons";
import { Popover, Drawer } from "antd";
import { LuUser2 } from "react-icons/lu";
import { capitalizeFirstLetter } from "../../../Common/Captalization";

const PassengerList = ({ spinning, setSpinning }) => {
  const cancelledDetails = useSelector((state) => state.get_ticket_to_cancel);
  const [deletemodalIsOpen, setDeleteModalIsOpen] = useState(false);
  const [cancelmodalIsOpen, setCancelModalIsOpen] = useState(false);
  const [nameToDelete, setNameToDelete] = useState([]);
  const [deleteId, setDeleteId] = useState({
    mobile_number: "",
    Booking_Id: "",
    seat_numbers: [],
    status: [],
  });

  const [selectedRowsData, setSelectedRowsData] = useState([]);

  const closeDeleteModal = () => {
    setDeleteModalIsOpen(false);
  };

  const closeCancelModal = () => {
    setCancelModalIsOpen(false);
  };

  const passengerData = useMemo(() => {
    if (!cancelledDetails || cancelledDetails.length === 0) return [];

    return cancelledDetails?.flatMap((booking) =>
      booking.passenger.map((passenger) => ({
        key: `${booking.Booking_Id}-${passenger.seat}`,
        name: passenger.user_name,
        age: passenger.age,
        gender: passenger.gender,
        bookingId: booking.Booking_Id,
        seat: passenger.seat,
        mobile_number: booking.mobile_number,
        status:
          passenger.gender === "male"
            ? "AFM"
            : passenger.gender === "female"
            ? "AFF"
            : "AFA",
      }))
    );
  }, [cancelledDetails]);

  const dispatch = useDispatch();

  const handleCancel = () => {
    setSpinning(true);
    CancelTicket(dispatch, deleteId, setSpinning);
    setDeleteModalIsOpen(false);
    setCancelModalIsOpen(false);
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedRowsData(passengerData);
      updateDeleteId(passengerData);
    } else {
      setSelectedRowsData([]);
      setDeleteId({
        mobile_number: "",
        Booking_Id: "",
        seat_numbers: [],
        status: [],
      });
    }
  };

  const handleRowSelection = (row) => {
    const isSelected = selectedRowsData.some((item) => item.key === row.key);
    const updatedSelectedRowsData = isSelected
      ? selectedRowsData.filter((item) => item.key !== row.key)
      : [...selectedRowsData, row];

    console.log(
      updatedSelectedRowsData,
      row,
      isSelected,
      "updatedSelectedRowsData"
    );
    setSelectedRowsData(updatedSelectedRowsData);
    updateDeleteId(updatedSelectedRowsData);
  };

  const updateDeleteId = (rows) => {
    if (rows?.length > 0) {
      setNameToDelete(rows?.map((row) => row.name));
      setDeleteId({
        mobile_number: rows[0]?.mobile_number,
        Booking_Id: rows[0]?.bookingId,
        seat_numbers: rows?.map((row) => row.seat),
        status: rows?.map((row) => row.status),
      });
    } else {
      setDeleteId({
        mobile_number: "",
        Booking_Id: "",
        seat_numbers: [],
        status: [],
      });
    }
  };

  const columns = [
    {
      title: (
        <span className="flex gap-x-[.5vw]">
          <input
            type="checkbox"
            className="border-white h-[3.2vw] w-[3.2vw] md:h-[1.3vw] md:w-[1.3vw] mt-[1vw] md:mt-[.3vw]"
            indeterminate={
              selectedRowsData?.length > 0 &&
              selectedRowsData?.length < passengerData?.length
            }
            checked={selectedRowsData?.length === passengerData?.length}
            onChange={handleSelectAll}
          />{" "}
          <span className={`text-[3.5vw] md:text-[1.2vw]`}>Select</span>
        </span>
      ),
      width: "8%",
      render: (_, record) => (
        <input
          type="checkbox"
          className="border-black h-[3.2vw] w-[3.2vw] md:h-[1.3vw] md:w-[1.3vw] mt-[.5vw]"
          checked={selectedRowsData?.some((item) => item.key === record.key)}
          onChange={(e) => handleRowSelection(record, e.target.checked)}
        />
      ),
    },
    {
      title: <div className={`text-[3vw] md:text-[1.2vw]`}>S.NO</div>,
      width: "10%",
      render: (row, record, index) => (
        <div className="flex justify-center">
          <h1 className="text-[3vw] md:text-[1vw]">{index + 1}</h1>
        </div>
      ),
    },
    {
      title: <div className={`text-[3.5vw] md:text-[1.2vw]`}>Name</div>,
      width: "16%",
      render: (row) => (
        <div className="flex justify-center">
          <h1 className="text-[3vw] md:text-[1vw]">{row.name}</h1>
        </div>
      ),
    },
    {
      title: <div className={`text-[3.5vw] md:text-[1.2vw]`}>Gender</div>,
      width: "16%",
      render: (row) => (
        <div className="flex justify-center">
          <h1 className="text-[3vw] md:text-[1vw]">{row.gender}</h1>
        </div>
      ),
    },
    {
      title: <div className={`text-[3.5vw] md:text-[1.2vw]`}>Age</div>,
      width: "13%",
      render: (row) => (
        <div className="flex justify-center">
          <h1 className="text-[3vw] md:text-[1vw]">{row.age}</h1>
        </div>
      ),
    },
    {
      title: <div className={`text-[3.5vw] md:text-[1.2vw]`}>SeatNO</div>,
      width: "16%",
      render: (row) => (
        <div className="flex justify-center">
          <h1 className="text-[3vw] md:text-[1vw]">{row.seat}</h1>
        </div>
      ),
    },
    // {
    //   title: <div className="">Action</div>,
    //   width: '20%',
    //   key: "actions",
    //   render: (row) => (
    //     <div className="flex justify-center">
    //       <div
    //         className="flex justify-center items-center cursor-pointer bg-[#FFC1C180] w-[12vw] rounded-full h-[2.5vw] gap-[1vw]"
    //         onClick={() => {
    //           setDeleteModalIsOpen(true);
    //           setNameToDelete(row.name);
    //           setDeleteId({
    //             mobile_number: row.mobile_number,
    //             Booking_Id: row.bookingId,
    //             seat_numbers: [row.seat],
    //             status: [row.status],
    //           });
    //         }}
    //       >
    //         <div>
    //           <TbTicketOff size="1.7vw" className="text-[#C62B2B]" />
    //         </div>
    //         <div className="text-[1.1vw] text-[#C62B2B] font-bold">Cancel Ticket</div>
    //       </div>
    //     </div>
    //   ),
    // },
  ];

  const getRandomColor = () => {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
  };

  const [passengerColors, setPassengerColors] = useState({});

  useEffect(() => {
    const colors = {};
    passengerData.forEach((passenger) => {
      if (!colors[passenger.key]) {
        colors[passenger.key] = getRandomColor();
      }
    });
    setPassengerColors(colors);
  }, [passengerData]);

  console.log(passengerData, "passengerData");
  return (
    <div>
      {spinning ? (
        // <div
        //   style={{
        //     position: "fixed",
        //     top: 0,
        //     left: 0,
        //     width: "100%",
        //     height: "100%",
        //     // background: "rgba(0, 0, 0, 0.2)",
        //     display: "flex",
        //     justifyContent: "center",
        //     alignItems: "center",
        //     zIndex: 1000,
        //   }}
        // >
        <Spin
          className="pl-[20vw]"
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
          spinning={spinning}
          indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />}
        />
      ) : (
        <span className={`flex gap-x-[3vw] pt-[4vw] md:pt-[0vw]`}>
          {cancelledDetails?.length > 0
            ? cancelledDetails?.map((value) => (
                <div
                  className={`flex items-center text-gray-700 pb-[2vw] md:pb-[1vw]`}
                >
                  <span
                    className={`font-bold text-[4.2vw] md:text-[1.2vw] text-[#1f4b7f] md:mr-3`}
                  >
                    Passenger List
                  </span>
                  <span className={`md:block hidden text-[1.1vw] mr-[.5vw]`}>
                    (
                  </span>
                  <span className={`md:block hidden text-[1.1vw]`}>
                    {value.departure_name}
                  </span>
                  <span className={`md:block hidden text-[1.1vw] mx-[.5vw]`}>
                    —
                  </span>
                  <span className={`md:block hidden text-[1.1vw]`}>
                    {value.departure_time.slice(0, 5)},
                    <span className="pl-[.5vw]">
                      {moment(value.departure_date).format("DD MMM YY")}
                    </span>
                  </span>
                  <span className={`md:block hidden text-[1.5vw] mx-[.5vw]`}>
                    <TiArrowRightOutline />
                  </span>
                  <span className={`md:block hidden text-[1.1vw]`}>
                    {value.arrival_name}
                  </span>
                  <span className={`md:block hidden text-[1.1vw] mx-[.5vw]`}>
                    —
                  </span>
                  <span className={`md:block hidden text-[1.1vw]`}>
                    {value.arrival_time.slice(0, 5)},
                    <span className="pl-[.5vw]">
                      {moment(value.arrival_date).format("DD MMM YY")}
                    </span>
                  </span>
                  <span className={`md:block hidden text-[1.1vw] ml-[.5vw]`}>
                    )
                  </span>
                </div>
              ))
            : ""}
          <div className={`md:block hidden`}>
            <button
              className={`flex justify-center items-center bg-[#FFC1C180] ${
                deleteId.Booking_Id &&
                deleteId.mobile_number &&
                deleteId.seat_numbers
                  ? "cursor-pointer"
                  : "cursor-not-allowed bg-gray-400"
              }  w-[12vw] rounded-full h-[2.5vw] gap-[1vw] mb-[1vw]`}
              onClick={() => {
                if (
                  deleteId.Booking_Id &&
                  deleteId.mobile_number &&
                  deleteId.seat_numbers
                ) {
                  setDeleteModalIsOpen(true);
                }
              }}
            >
              <div>
                <TbTicketOff
                  size="1.7vw"
                  className={`
                    ${
                      selectedRowsData.length === 0
                        ? "text-white"
                        : "text-[#C62B2B]"
                    }
                  text-[#C62B2B]`}
                />
              </div>
              <div
                className={`
                  ${
                    selectedRowsData.length === 0
                      ? "text-white"
                      : "text-[#C62B2B]"
                  }
                text-[1.1vw] text-[#C62B2B] font-bold`}
              >
                Cancel Ticket
              </div>
            </button>
          </div>
          <div className={`block md:hidden pl-[25vw]`}>
            <button
              className={`block md:hidden flex justify-center items-center bg-[#FFC1C180] ${
                deleteId.Booking_Id &&
                deleteId.mobile_number &&
                deleteId.seat_numbers
                  ? "cursor-pointer"
                  : "cursor-not-allowed bg-gray-400"
              }  
             w-[30vw] h-[9vw] rounded-[7vw] gap-[1vw] mb-[1vw]`}
              onClick={() => {
                if (
                  deleteId.Booking_Id &&
                  deleteId.mobile_number &&
                  deleteId.seat_numbers
                ) {
                  setCancelModalIsOpen(true);
                } else {
                  <Popover
                    content={"Please Select passenger"}
                    trigger="hover"
                    overlayStyle={{ maxWidth: "20vw" }}
                  >
                    {/* <p
                    className={`block md:hidden text-[${colors.primary}] text-[1.1vw]`}
                  ></p> */}
                  </Popover>;
                }
              }}
            >
              <div>
                <TbTicketOff
                  className={`
                    ${
                      selectedRowsData.length === 0
                        ? "text-white"
                        : "text-[#C62B2B]"
                    }
                  h-[4vw] w-[4vw] text-[#C62B2B]`}
                />
              </div>
              <div
                className={`
                ${
                  selectedRowsData.length === 0
                    ? "text-white"
                    : "text-[#C62B2B]"
                }
                text-[3.5vw] text-[#C62B2B] font-bold`}
              >
                {selectedRowsData.length === 0 ? (
                  <Popover
                    content="Please select Passenger"
                    trigger="hover"
                    overlayStyle={{ maxWidth: "70vw" }}
                  >
                    <p>Cancel Ticket</p>
                  </Popover>
                ) : (
                  <p className={` items-center justify-center flex`}>
                    Cancel Ticket
                  </p>
                )}
              </div>
            </button>
          </div>
        </span>
      )}

      <div className={`md:block hidden h-[18vw] overflow-y-auto pt-[0vw]`}>
        <Table
          columns={columns}
          dataSource={passengerData}
          pagination={false}
          className="Passenger-class"
        />
      </div>
      <div
        className={`h-[82vw] overflow-y-auto block md:hidden pt-[5vw] pb-[5vw]`}
      >
        <div className="rounded-lg">
          {passengerData?.map((passenger, index) => {
            const userIconColor = passengerColors[passenger.key];
            const isSelected = selectedRowsData.some(
              (item) => item.key === passenger.key
            );
            const backgroundColor = isSelected ? "#1F487C" : "";

            return (
              <div
                key={index}
                onClick={() => {
                  handleRowSelection(passenger);
                  console.log(passenger, "passenger");
                }}
                style={{ backgroundColor }}
                className={`${isSelected ? "text-white" : ""} 
              flex items-center justify-between mt-[3vw] p-[3vw] gap-[3vw] rounded-[2.5vw] cursor-pointer border-t border-b border-gray-300`}
              >
                <div
                  style={{ backgroundColor: userIconColor }}
                  className={`w-11 h-11 flex justify-center items-center rounded-full text-white`}
                >
                  <LuUser2 color="white" size={"8vw"} />
                </div>
                <div className="flex-1">
                  <span
                    className={`${
                      isSelected ? "text-white" : ""
                    } block font-semibold text-gray-800`}
                  >
                    {passenger?.name}
                  </span>
                  <span
                    className={`${
                      isSelected ? "text-white" : ""
                    } block text-[4vw] text-gray-600`}
                  >
                    {capitalizeFirstLetter(passenger?.gender)}, {passenger?.age}{" "}
                    years
                  </span>
                </div>
                <div
                  className={`${
                    isSelected ? "text-white" : ""
                  } flex-1 text-[3.5vw] text-center text-gray-800 font-semibold`}
                >
                  Seat: {passenger?.seat}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <ModalPopup
        show={deletemodalIsOpen}
        onClose={closeDeleteModal}
        height="20vw"
        width="30vw"
        closeicon={false}
        className="md:block hidden"
      >
        <div>
          <div className="flex flex-col justify-center">
            <div className="items-center flex-col flex justify-center mt-[0.5vw]">
              <TbTicketOff color="#1f4b7f" size={"5vw"} />
              <p className="text-[1.7vw] font-semibold text-[#1f4b7f] mt-[1vw]">
                Are you Sure?
              </p>
              <p className="text-[1.1vw] text-[#1f4b7f] mt-[0.5vw]">
                Want to cancel the{" "}
                <span className="font-semibold text-[1.1vw] px-[.5vw] text-red-600">{`${nameToDelete?.join(
                  "  ,  "
                )}`}</span>{" "}
                ticket('s)
              </p>
            </div>
            <div className="flex items-center mt-[2vw] gap-[2vw] justify-center">
              <button
                className="border-[#1f4b7f] border-[0.1vw] rounded-[0.5vw] text-[1.1vw] font-semibold text-[#1f4b7f] w-[10vw] h-[3vw]"
                onClick={() => setDeleteModalIsOpen(false)}
              >
                No
              </button>
              <button
                type="submit"
                className="bg-[#1f4b7f] text-white font-semibold text-[1.1vw] w-[10vw] h-[3vw] rounded-[0.5vw]"
                onClick={() => handleCancel()}
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      </ModalPopup>
      <Drawer
        onClose={closeCancelModal}
        placement={"bottom"}
        closable={false}
        open={cancelmodalIsOpen}
        // key={"right"}
        // width={"75%"}
        className="block md:hidden custom-drawer"
        height="75vw"
        width="100%"
      >
        <div>
          <div className="flex flex-col justify-center">
            <div className="items-center flex-col flex justify-center mt-[6vw]">
              <TbTicketOff color="#1f4b7f" size={"27vw"} />
              <p className="text-[4vw] font-semibold text-[#1f4b7f] mt-[1vw]">
                Are you Sure?
              </p>
              <p className="text-[4vw] text-[#1f4b7f] px-[4vw] mt-[1vw]">
                Want to cancel the{" "}
                <span className="font-semibold text-[3.5vw] px-[1vw] text-red-600">{`${nameToDelete?.join(
                  "  ,  "
                )}`}</span>{" "}
                ticket('s)
              </p>
            </div>
            <div className="flex items-center mt-[9vw] gap-[3vw] justify-center">
              <button
                className="border-[#1f4b7f] border-[0.2vw] rounded-[1vw] text-[4vw] font-semibold text-[#1f4b7f] w-[30vw] h-[10vw]"
                onClick={() => setCancelModalIsOpen(false)}
              >
                No
              </button>
              <button
                type="submit"
                className="bg-[#1f4b7f] text-white font-semibold text-[4vw] w-[30vw] h-[10vw] rounded-[1vw]"
                onClick={() => handleCancel()}
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      </Drawer>
    </div>
  );
};

export default PassengerList;
