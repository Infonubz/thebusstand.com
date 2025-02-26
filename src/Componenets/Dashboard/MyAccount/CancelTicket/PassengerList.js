import React, { useState, useEffect, useMemo } from "react";
import { Table, Spin } from "antd";
import { TbTicketOff } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
// import { CancelTicket } from "../../../../Api/MyAccounts/MyBookings";
import { TiArrowRightOutline } from "react-icons/ti";
import moment from "moment";
import { LoadingOutlined } from "@ant-design/icons";
import { Popover, Drawer } from "antd";
import { LuUser2 } from "react-icons/lu";
import ModalPopup from "../../../Common/Modal/Modal";
import dayjs from "dayjs";
import { CancelTicket } from "../../../../Api-Abhibus/MyAccount/ViewTicket";
import { toast } from "react-toastify";
import { FaArrowRightLong } from "react-icons/fa6";
import { TBS_Booking_Cancellation } from "../../../../Api-TBS/Dashboard/Dashboard";
import { useParams } from "react-router";
// import { capitalizeFirstLetter } from "../../../Common/Captalization";

const PassengerList = ({ spinning, setSpinning, passengerDetails, info }) => {
  const cancelledDetails = useSelector((state) => state.get_ticket_to_cancel);
  const [deletemodalIsOpen, setDeleteModalIsOpen] = useState(false);
  const [cancelmodalIsOpen, setCancelModalIsOpen] = useState(false);
  const [nameToDelete, setNameToDelete] = useState([]);

  const trimName = nameToDelete.map((ntd) => {
    return ntd?.length > 10 ? ntd.slice(0, 10) + "..." : ntd;
  });

  console.log(info, "name_to_delete");

  const [deleteId, setDeleteId] = useState({
    mobile_number: "",
    Booking_Id: "",
    seat_numbers: [],
    status: [],
  });

  const [selectedRowsData, setSelectedRowsData] = useState([]);
  console.log(
    selectedRowsData,
    passengerDetails?.ticket_det,
    "selected_rows_data"
  );
  const closeDeleteModal = () => {
    setDeleteModalIsOpen(false);
  };

  const closeCancelModal = () => {
    setCancelModalIsOpen(false);
  };

  const passengerData = useMemo(() => {
    if (!passengerDetails || passengerDetails?.ticket_det?.length === 0)
      return [];
    // const cancelledDetails = passengerDetails?.flatMap((booking) => {
    //   return booking;
    // });
    console.log(passengerDetails, "cancelledDetails");

    return passengerDetails?.ticket_det.map((passenger) => ({
      key: `${passenger.Seat_Num}`,
      name: passenger.Passenger_Name,
      age: passenger.Age,
      gender: passenger.GENDER_TYPE,
      bookingId: passengerDetails.Ticket_no,
      seat: passenger.Seat_Num,
      mobile_number: passengerDetails.mobile_number,
      status:
        passenger.gender === "male"
          ? "AFM"
          : passenger.gender === "female"
            ? "AFF"
            : "AFA",
    }));
  }, [passengerDetails]);

  const dispatch = useDispatch();

  const currentpath = useParams();

  const handleCancel = async () => {
    setSpinning(true);
    // CancelTicket(dispatch, deleteId, setSpinning);
    const partialCancellation =
      selectedRowsData?.length === passengerDetails?.ticket_det?.length ? 1 : 0;
    try {
      const response = await CancelTicket(deleteId, info, partialCancellation);
      console.log(response, "responseresponssdcdscsdcdse");

      if (response?.status === "success") {
        const data = await TBS_Booking_Cancellation(
          passengerDetails,
          currentpath,
          selectedRowsData,
          partialCancellation,
          response?.NewPNR
        );
        toast.success("Ticket Cancelled Successfully");
      }
      setSpinning(false);
      console.log(response, "responsegggggggggg");
    } catch (error) {
      console.log(error, "errorerrorerror");
    }
    setDeleteModalIsOpen(false);
    setCancelModalIsOpen(false);
    setSelectedRowsData([]);
    setDeleteId({
      mobile_number: "",
      Booking_Id: "",
      seat_numbers: [],
      status: [],
    });
    
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
  console.log(deleteId, "selectedRowsData");

  const columns = [
    {
      title: (
        <span className="flex items-center justify-center">
          <input
            type="checkbox"
            className="border-white h-[3.2vw] w-[3.2vw] md:h-[1.3vw] md:w-[1.3vw] mt-[1vw] md:mt-[.3vw] cursor-pointer"
            indeterminate={
              selectedRowsData?.length > 0 &&
              selectedRowsData?.length < passengerData?.length
            }
            autoComplete="off"
            checked={selectedRowsData?.length === passengerData?.length}
            onChange={handleSelectAll}
          />{" "}
          {/* <span className={`text-[3.5vw] md:text-[1.2vw]`}>Select</span> */}
        </span>
      ),
      width: "8%",
      render: (_, record) => (
        <input
          type="checkbox"
          className="border-black h-[3.2vw] w-[3.2vw] md:h-[1.3vw] md:w-[1.3vw] mt-[.5vw] cursor-pointer"
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
      title: <div className={`text-[3.5vw] md:text-[1.2vw]`}>Seat NO</div>,
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


  const mobileColumn = [
    {
      title: (
        <span className="flex items-center justify-center">
          <input
            type="checkbox"
            className="border-white h-[3.2vw] w-[3.2vw] md:h-[1.3vw] md:w-[1.3vw] mt-[1vw] md:mt-[.3vw] cursor-pointer"
            indeterminate={
              selectedRowsData?.length > 0 &&
              selectedRowsData?.length < passengerData?.length
            }
            autoComplete="off"
            checked={selectedRowsData?.length === passengerData?.length}
            onChange={handleSelectAll}
          />{" "}
          {/* <span className={`text-[3.5vw] md:text-[1.2vw]`}>Select</span> */}
        </span>
      ),
      width: "8%",
      render: (_, record) => (
        <input
          type="checkbox"
          className="border-black h-[3.2vw] w-[3.2vw] md:h-[1.3vw] md:w-[1.3vw] mt-[.5vw] cursor-pointer"
          checked={selectedRowsData?.some((item) => item.key === record.key)}
          onChange={(e) => handleRowSelection(record, e.target.checked)}
        />
      ),
    },
    {
      title: <div className={`text-[4.5vw] md:text-[1.2vw]`}>Passenger Details</div>,
      width: "65%",
      render: (row) => (
        <div className="text-start px-[2vw] break-words ">
          <h1 className="text-[4.5vw] md:text-[1vw] w-[85%] break-words font-semibold">{row.name} , {row.gender[0]} / {row.age}</h1>
        </div>
      ),
    },
    {
      title: <div className={`text-[4.5vw] md:text-[1.2vw]`}>Seat NO</div>,
      width: "25%",
      render: (row) => (
        <div className="flex justify-center">
          <h1 className="text-[4vw] md:text-[1vw] font-semibold">{row.seat}</h1>
        </div>
      ),
    },
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

  const formatTo12Hour = (timeString) => {
    const [hours, minutes] = timeString?.split(":").map(Number);
    const period = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12; // Convert 0 to 12 for 12-hour format
    return `${formattedHours}.${minutes} ${period}`;
  };
  const formatDate = (inputDate) => {
    // Remove ordinal suffixes like 'st', 'nd', 'rd', 'th'
    const cleanedDate = inputDate?.replace(/(\d+)(st|nd|rd|th)/, "$1");

    // Parse the cleaned date string
    const date = new Date(cleanedDate);

    if (isNaN(date)) {
      return "Invalid Date";
    }

    // Get the day, month, and year parts
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "short" });
    const year = date.getFullYear().toString().slice(-2);

    // Return the formatted date
    return `${day} ${month}, ${year}`;
  };
  console.log(passengerDetails, "testingdeleteid");
  const [calculatedDate, setCalculatedDate] = useState("");
  const [showmodal, setShowModal] = useState(false);

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
        // <span className={`flex gap-x-[3vw] pt-[4vw] md:pt-[0vw]`}>
        //   <div
        //     className={`flex items-center text-gray-700 pb-[2vw] md:pb-[1vw]`}
        //   >
        //     <span
        //       className={`font-bold text-[4.2vw] md:text-[1.2vw] text-[#1f4b7f] md:mr-3`}
        //     >
        //       Passenger List
        //     </span>
        //     <span className={`md:block hidden text-[1.1vw] mr-[.5vw]`}>(</span>
        //     <span className={`md:block hidden text-[1.1vw]`}>
        //       {passengerDetails?.source_name}
        //     </span>
        //     <span className={`md:block hidden text-[1.1vw] mx-[.5vw]`}>—</span>
        //     <span className={`md:block hidden text-[1.1vw]`}>
        //       {passengerDetails?.Reporting_Time},
        //       <span className="pl-[.5vw]">
        //         {formatDate(passengerDetails?.Journey_Date)}
        //       </span>
        //     </span>
        //     <span className={`md:block hidden text-[1.5vw] mx-[.5vw]`}>
        //       <TiArrowRightOutline />
        //     </span>
        //     <span className={`md:block hidden text-[1.1vw]`}>
        //       {passengerDetails?.dest_name}
        //     </span>
        //     <span className={`md:block hidden text-[1.1vw] mx-[.5vw]`}>—</span>
        //     <span className={`md:block hidden text-[1.1vw]`}>
        //       {passengerDetails?.Arr_Time
        //         ? formatTo12Hour(passengerDetails?.Arr_Time)
        //         : ""}
        //       ,
        //       <span className="pl-[.5vw]">
        //         {passengerDetails?.Journey_Date
        //           ? formatDate(passengerDetails?.Journey_Date)
        //           : ""}
        //       </span>
        //     </span>
        //     <span className={`md:block hidden text-[1.1vw] ml-[.5vw]`}>)</span>
        //   </div>

        //   {passengerDetails?.ticket_det?.length > 0 ? (
        //     <>
        //       <div className={`md:block hidden`}>
        //         <button
        //           className={`flex justify-center items-center bg-[#FFC1C180] ${
        //             deleteId.Booking_Id &&
        //             // deleteId.mobile_number &&
        //             deleteId.seat_numbers
        //               ? "cursor-pointer"
        //               : "cursor-not-allowed bg-gray-400"
        //           }  w-[12vw] rounded-full h-[2.5vw] gap-[1vw] mb-[1vw]`}
        //           onClick={() => {
        //             if (
        //               deleteId.Booking_Id &&
        //               // deleteId.mobile_number &&
        //               deleteId.seat_numbers
        //             ) {
        //               setDeleteModalIsOpen(true);
        //             }
        //           }}
        //         >
        //           <div>
        //             <TbTicketOff
        //               size="1.7vw"
        //               className={`
        //             ${
        //               selectedRowsData.length === 0
        //                 ? "text-white"
        //                 : "text-[#C62B2B]"
        //             }
        //           text-[#C62B2B]`}
        //             />
        //           </div>
        //           <div
        //             className={`
        //           ${
        //             selectedRowsData.length === 0
        //               ? "text-white"
        //               : "text-[#C62B2B]"
        //           }
        //         text-[1.1vw] text-[#C62B2B] font-bold`}
        //           >
        //             Cancel Ticket
        //           </div>
        //         </button>
        //       </div>
        //       <div className={`block md:hidden pl-[25vw]`}>
        //         <button
        //           className={`block md:hidden flex justify-center items-center bg-[#FFC1C180] ${
        //             deleteId.Booking_Id &&
        //             // deleteId.mobile_number &&
        //             deleteId.seat_numbers
        //               ? "cursor-pointer"
        //               : "cursor-not-allowed bg-gray-400"
        //           }
        //      w-[30vw] h-[9vw] rounded-[7vw] gap-[1vw] mb-[1vw]`}
        //           onClick={() => {
        //             if (
        //               deleteId.Booking_Id &&
        //               // deleteId.mobile_number &&
        //               deleteId.seat_numbers
        //             ) {
        //               setCancelModalIsOpen(true);
        //             } else {
        //               <Popover
        //                 content={"Please Select passenger"}
        //                 trigger="hover"
        //                 overlayStyle={{ maxWidth: "20vw" }}
        //               >
        //                 {/* <p
        //             className={`block md:hidden text-[${colors.primary}] text-[1.1vw]`}
        //           ></p> */}
        //               </Popover>;
        //             }
        //           }}
        //         >
        //           <div>
        //             <TbTicketOff
        //               className={`
        //             ${
        //               selectedRowsData.length === 0
        //                 ? "text-white"
        //                 : "text-[#C62B2B]"
        //             }
        //           h-[4vw] w-[4vw] text-[#C62B2B]`}
        //             />
        //           </div>
        //           <div
        //             className={`
        //         ${
        //           selectedRowsData.length === 0
        //             ? "text-white"
        //             : "text-[#C62B2B]"
        //         }
        //         text-[3.5vw] text-[#C62B2B] font-bold`}
        //           >
        //             {selectedRowsData.length === 0 ? (
        //               <Popover
        //                 content="Please select Passenger"
        //                 trigger="hover"
        //                 overlayStyle={{ maxWidth: "70vw" }}
        //               >
        //                 <p>Cancel Ticket</p>
        //               </Popover>
        //             ) : (
        //               <p className={` items-center justify-center flex`}>
        //                 Cancel Ticket
        //               </p>
        //             )}
        //           </div>
        //         </button>
        //       </div>
        //     </>
        //   ) : (
        //     ""
        //   )}
        // </span>
        <div className="flex items-center justify-between">
          <>
            <div className='md:block hidden'>
              <label className="text-[1.2vw] text-[#1F487C] font-extrabold">
                {passengerDetails?.operatorname}
                <span className="text-[1vw] pl-[1vw] font-semibold text-gray-500">{`( ${passengerDetails?.bustype} )`}</span>
              </label>
              <div className="mt-[0.5vw] mb-[1.5vw] flex justify-between gap-x-[2vw] w-full">
                <div className="flex flex-col">
                  {/* <label className="text-[1vw]">From</label> */}
                  <label className="text-[1.1vw] ">
                    {passengerDetails?.source_name}{" "}
                    <span className="text-[1vw] pl-[0.5vw]  text-gray-500">
                      {`( ${passengerDetails?.Boarding_Place_Name} )`}
                    </span>
                  </label>
                  <label className="text-[0.9vw] font-semibold">
                    {`${passengerDetails?.Reporting_Time},`}
                    <span className="text-[0.9vw] pl-[0.5vw] text-gray-500">{` ${formatDate(
                      passengerDetails?.Journey_Date
                    )}`}</span>
                  </label>
                </div>
                <div>
                  <FaArrowRightLong color="gray" size={"1.5vw"} />
                </div>
                <div className="flex flex-col">
                  {/* <label className="text-[1vw]">From</label> */}
                  <label className="text-[1.1vw] ">
                    {passengerDetails?.dest_name}{" "}
                    {/* <span className="text-[1vw] pl-[0.5vw] font-semibold text-gray-500">
                    {`( ${passengerDetails?.dest_name} )`}
                  </span> */}
                  </label>
                  <label className="text-[0.9vw] font-semibold">
                    {`${formatTo12Hour(passengerDetails?.Arr_Time)},`}
                    <span className="text-[0.9vw] pl-[0.5vw] text-gray-500">{` ${formatDate(
                      passengerDetails?.Journey_Date
                    )}`}</span>
                  </label>
                </div>
              </div>
            </div>
            <div>
              {passengerDetails?.ticket_det?.length > 0 ? (
                <>
                  <div className={`md:block hidden`}>
                    <button
                      className={`flex justify-center items-center bg-[#FFC1C180] ${deleteId.Booking_Id &&
                        // deleteId.mobile_number &&
                        deleteId.seat_numbers
                        ? "cursor-pointer"
                        : "cursor-not-allowed bg-gray-400"
                        }  w-[12vw] rounded-full h-[2.5vw] gap-[1vw] mb-[1vw]`}
                      onClick={() => {
                        if (
                          deleteId.Booking_Id &&
                          // deleteId.mobile_number &&
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
                    ${selectedRowsData.length === 0
                              ? "text-white"
                              : "text-[#C62B2B]"
                            }
                  text-[#C62B2B]`}
                        />
                      </div>
                      <div
                        className={`
                  ${selectedRowsData.length === 0
                            ? "text-white"
                            : "text-[#C62B2B]"
                          }
                text-[1.1vw] text-[#C62B2B] font-bold`}
                      >
                        Cancel Ticket
                      </div>
                    </button>
                  </div>
                </>
              ) : (
                ""
              )}
            </div>
          </>
        </div>
      )}

      <div
        className={`md:block hidden min-h-auto max-h-[16vw] overflow-y-auto pt-[0vw]`}
      >
        <Table
          columns={columns}
          dataSource={passengerData}
          pagination={false}
          className="Passenger-class"
        />
      </div>

      {/* ----------------------------------------------------Mobile--------------------------------------- */}
      <div className=" px-[3vw] rounded-[1.5vw] h-[100vw] overflow-y-auto block md:hidden bg-white">

        <div className='md:hidden block'>
          <label className="text-[5vw] text-[#1F487C] font-extrabold">
            {passengerDetails?.operatorname}
            <span className="text-[3.5vw] pl-[1vw] font-semibold text-gray-500">{`( ${passengerDetails?.bustype} )`}</span>
          </label>
          <div className="mt-[0.5vw] mb-[1.5vw] flex items-center justify-between gap-x-[2vw]">
            <div className="flex flex-col">
              {/* <label className="text-[1vw]">From</label> */}
              <label className="text-[5vw] ">
                {passengerDetails?.source_name}{" "}
              </label>
              {/* <span className="text-[3.5vw] pl-[0.5vw]  text-gray-500">
                {`( ${passengerDetails?.Boarding_Place_Name} )`}
              </span> */}
              <label className="text-[3.5vw] font-semibold">
                {`${passengerDetails?.Reporting_Time},`}
                <span className="text-[3.5vw] pl-[0.5vw] text-gray-500">{` ${formatDate(
                  passengerDetails?.Journey_Date
                )}`}</span>
              </label>
            </div>

            <div>
              <FaArrowRightLong color="gray" size={"3.5vw"} />
            </div>
            <div className="flex flex-col">
              {/* <label className="text-[1vw]">From</label> */}
              <label className="text-[5vw] ">
                {passengerDetails?.dest_name}{" "}
                {/* <span className="text-[1vw] pl-[0.5vw] font-semibold text-gray-500">
                    {`( ${passengerDetails?.dest_name} )`}
                  </span> */}
              </label>
              <label className="text-[3.5vw] font-semibold">
                {`${formatTo12Hour(passengerDetails?.Arr_Time)},`}
                <span className="text-[3.5vw] pl-[0.5vw] text-gray-500">{` ${formatDate(
                  passengerDetails?.Journey_Date
                )}`}</span>
              </label>
            </div>
          </div>
        </div>

        {/* <div
          className={`h-[60vw] overflow-y-auto block md:hidden `}
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
                      className={`${isSelected ? "text-white" : ""
                        } block font-semibold text-gray-800`}
                    >
                      {passenger?.name}
                    </span>
                    <span
                      className={`${isSelected ? "text-white" : ""
                        } block text-[4vw] text-gray-600`}
                    >
                  
                      years
                    </span>
                  </div>
                  <div
                    className={`${isSelected ? "text-white" : ""
                      } flex-1 text-[3.5vw] text-center text-gray-800 font-semibold`}
                  >
                    Seat: {passenger?.seat}
                  </div>
                </div>
              );
            })}
          </div> 
        </div> */}
        <div>
          {passengerDetails?.ticket_det?.length > 0 ? (
            <>
              <div className={`block md:hidden`}>
                <div className="flex items-center justify-end py-[2vw]">
                  <button
                    className={`flex justify-center items-center bg-[#FFC1C180] ${deleteId.Booking_Id &&
                      // deleteId.mobile_number &&
                      deleteId.seat_numbers
                      ? "cursor-pointer"
                      : "cursor-not-allowed bg-gray-400"
                      } px-[2.5vw] py-[1.5vw] rounded-[1.5vw] gap-[1vw] mb-[1vw]`}
                    onClick={() => {
                      if (
                        deleteId.Booking_Id &&
                        // deleteId.mobile_number &&
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
                    ${selectedRowsData.length === 0
                            ? "text-white"
                            : "text-[#C62B2B]"
                          }
                  h-[4vw] w-[4vw] text-[#C62B2B]`}
                      />
                    </div>
                    <div
                      className={`
                ${selectedRowsData.length === 0
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
              </div>
            </>
          ) : (
            ""
          )}
        </div>

        <Table
          columns={mobileColumn}
          dataSource={passengerData}
          pagination={false}
          className="Passenger-class"
        />
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
                <span className="font-semibold text-[1.1vw] px-[.5vw] text-red-600">{`${trimName?.join(
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
        height="80vw"
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
