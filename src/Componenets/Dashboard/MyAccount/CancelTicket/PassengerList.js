import React, { useState, useEffect, useMemo } from "react";
import { Table, Spin, Modal } from "antd";
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
import { FaArrowRightLong, FaCircleInfo } from "react-icons/fa6";
import { TBS_Booking_Cancellation } from "../../../../Api-TBS/Dashboard/Dashboard";
import { useParams } from "react-router";
import { CurrentDiscount } from "../../../../Api-TBS/Home/Home";
import { calculateDiscountedFare } from "../../../Common/Common-Functions/TBS-Discount-Fare";
// import { capitalizeFirstLetter } from "../../../Common/Captalization";

const PassengerList = ({
  spinning,
  setSpinning,
  passengerDetails,
  info,
  cancellationPolicy,
  droppingDate,
  setPassengerDetails,
  setShowtable,
  setFormValues,
  mobileno,
  setCancellResModal,
  setCancelResponse
}) => {
  const cancelledDetails = useSelector((state) => state.get_ticket_to_cancel);
  const [deletemodalIsOpen, setDeleteModalIsOpen] = useState(false);
  const [cancelmodalIsOpen, setCancelModalIsOpen] = useState(false);
  const [nameToDelete, setNameToDelete] = useState([]);
  const [cancelPercent,setCancelPercent] = useState([])
  // const [cancellResModal, setCancellResModal] = useState(false);
  // const [cancelResponse, setCancelResponse] = useState("");
  // console.log(cancellResModal, "cancellResModal");
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
    // setCancellResModal((prev)=> setCancellResModal(...prev ,modalOpen:false))
    // setCancellResModal(false)
  };

  const closeCancelModal = () => {
    setCancelModalIsOpen(false);
  };

  const newConvertDate = (dateStr) => {
    // Remove ordinal suffix (st, nd, rd, th)
    const cleanedDateStr = dateStr.replace(/(\d+)(st|nd|rd|th)/, "$1");

    // Parse the date using moment
    const formattedDate = moment(cleanedDateStr, "DD MMM YYYY").format(
      "YYYY-MM-DD"
    );

    return formattedDate;
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

  console.log(passengerDetails, "passdetailssss");

  const currentpath = useParams();

  const handleCancel = async () => {
    setSpinning(true);
    // CancelTicket(dispatch, deleteId, setSpinning);
    const partialCancellation =
      selectedRowsData?.length === passengerDetails?.ticket_det?.length ? 1 : 0;
    try {
      const response = await CancelTicket(
        deleteId,
        info,
        partialCancellation,
        mobileno
      );
      console.log(response, "responseresponssdcdscsdcdse");
      // setCancelResponse(response);
      setCancelResponse(refundAmount(response.return_amount))
      // sessionStorage.setItem("returnamount",response.return_amount)
      if (response?.status === "success") {
        const calculateRefund = Math.round(response?.return_amount - ( response?.return_amount * (tbs_discount / 100 )))
        const data = await TBS_Booking_Cancellation(
          passengerDetails,
          currentpath,
          selectedRowsData,
          partialCancellation,
          response?.NewPNR,
          newConvertDate(droppingDate),
          newConvertDate(passengerDetails?.Journey_Date),
          calculateRefund

        );
        // toast.success(
        //   `Ticket Cancelled Successfully  ${
        //     response?.NewPNR ? "and New Pnr Generated :" response?.NewPNR : ""
        //   }`
        // );

        toast.success(
          `Ticket Cancelled Successfully ${
            response?.NewPNR ? "and New Pnr Generated :" + response?.NewPNR : ""
          }`
        );
      }

      setSpinning(false);
      setShowtable(false);
      setPassengerDetails(null);
      setCancellResModal(true);
    } catch (error) {
      console.log(error, "errorerrorerror");
    } finally {
    
      console.log('hiiiiasfioasdhf;oasu')
      setFormValues({
        ticketNo: "",
        phoneNo: "",
      });
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
  // console.log(cancellResModal, "selectedRowsData");

  const tbs_discount = useSelector((state) => state?.live_per);
  useEffect(() => {
    CurrentDiscount(dispatch, newConvertDate(passengerDetails?.Journey_Date));
  }, [passengerDetails]);

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
          className="border-black h-[3.2vw] w-[3.2vw] md:h-[1.1vw] md:w-[1.1vw] mt-[.5vw] cursor-pointer"
          checked={selectedRowsData?.some((item) => item.key === record.key)}
          onChange={(e) => handleRowSelection(record, e.target.checked)}
        />
      ),
    },
    {
      title: <div className={`text-[3vw] md:text-[1.1vw]`}>S.NO</div>,
      width: "10%",
      render: (row, record, index) => (
        <div className="flex justify-center">
          <h1 className="text-[3vw] md:text-[.9vw]">{index + 1}</h1>
        </div>
      ),
    },
    {
      title: <div className={`text-[3.5vw] md:text-[1.1vw]`}>Name</div>,
      width: "16%",
      render: (row) => (
        <div className="flex justify-center">
          <h1 className="text-[3vw] md:text-[.9vw]">{row.name}</h1>
        </div>
      ),
    },
    {
      title: <div className={`text-[3.5vw] md:text-[1.1vw]`}>Gender</div>,
      width: "16%",
      render: (row) => (
        <div className="flex justify-center">
          <h1 className="text-[3vw] md:text-[.9vw]">{row.gender}</h1>
        </div>
      ),
    },
    {
      title: <div className={`text-[3.5vw] md:text-[1.1vw]`}>Age</div>,
      width: "13%",
      render: (row) => (
        <div className="flex justify-center">
          <h1 className="text-[3vw] md:text-[.9vw]">{row.age}</h1>
        </div>
      ),
    },
    {
      title: <div className={`text-[3.5vw] md:text-[1.1vw]`}>Seat NO</div>,
      width: "16%",
      render: (row) => (
        <div className="flex justify-center">
          <h1 className="text-[3vw] md:text-[.9vw]">{row.seat}</h1>
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
      title: (
        <div className={`text-[4.5vw] md:text-[1.2vw]`}>Passenger Details</div>
      ),
      width: "65%",
      render: (row) => (
        <div className="text-start px-[2vw] break-words ">
          <h1 className="text-[4.5vw] md:text-[1vw] w-[85%] break-words font-semibold">
            {row.name} , {row.gender[0]} / {row.age}
          </h1>
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

  const processAmount = (amountString) => {
    const amount = parseInt(amountString.replace(/[^\d]/g, ""));
    const reducedAmount = amount - amount * 0.02;
    const roundedAmount = Math.round(reducedAmount);
    return roundedAmount;
  };

  const calculatefunction = ((val) =>{
    const removePercentage =  parseFloat(val?.replace('%', ''))
    // setCancelPercent(prev =>[...prev,removePercentage])
    const basefare = cancellationPolicy?.Collect_amt?.replace(/,/g, '');
    const findPercentage = (basefare * tbs_discount) / 100
    const newcal = basefare - findPercentage
    console.log("valuessssssiusd",removePercentage,basefare,findPercentage,newcal);
    return  Math.round(newcal * removePercentage) /100
  })

  const calTbsDiscount = (val) =>{
    return (val * tbs_discount) / 100

  }
  useEffect(() => {
    if (cancellationPolicy?.CancellationPolicyWithRefund) {
      const newRpArray = cancellationPolicy?.CancellationPolicyWithRefund?.map(
        (val) => parseFloat(val?.rp?.replace('%', ''))
      );
      setCancelPercent(newRpArray);  // Update the state with val.rp values
    }
  }, [cancellationPolicy]);
  console.log(cancelPercent,"percentaekhfkdjfhkdjxfhdxjkf");


//   const refundAmount = (val) =>{
//     const basefare = cancellationPolicy?.Collect_amt?.replace(/,/g, ''); 
//     const returnval = val;
//     // const percentagecal = (basefare * cancelPercent[0]) /100;
//     // const taxcal = (basefare * 5) / 100;
//     const tbsdis = (basefare * tbs_discount) / 100;
//     // const userBasedAmount = (tbsdis / selectedRowsData?.length);
//     const userBasedAmount = selectedRowsData?.length > 0 ? tbsdis / selectedRowsData.length : tbsdis;
//     const tbsReturnAmount = (returnval - tbsdis) ;
// console.log(basefare ,tbsdis,userBasedAmount,tbsReturnAmount,"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");

//      return tbsReturnAmount
//    }
const refundAmount = () =>{
  const basefare = cancellationPolicy?.Collect_amt?.replace(/,/g, '');
  const percentagecal = (basefare * cancelPercent[0]) /100;
  const taxcal = (percentagecal * 5) / 100;
  const tbsdis = (percentagecal * tbs_discount) / 100;
  // const userBasedAmount = (tbsdis / selectedRowsData?.length);
  // const userBasedAmount = selectedRowsData?.length > 0 ? tbsdis / selectedRowsData.length : tbsdis;
  const userBasedAmount = selectedRowsData?.length > 0 ? selectedRowsData?.length === passengerDetails?.ticket_det?.length ? tbsdis : (selectedRowsData?.length / passengerDetails?.ticket_det?.length) * tbsdis  : tbsdis 
  // const selectedUserShare = (selectedRowsData?.length / passengerDetails?.ticket_det?.length) * tbsdis
  const tbsReturnAmount = (percentagecal - userBasedAmount) + taxcal;
console.log(basefare ,percentagecal, taxcal ,tbsdis,userBasedAmount,tbsReturnAmount ,"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");

   return tbsReturnAmount
 }

   console.log(refundAmount(),"sgdsgsddbjhdbsdgbjsbdjdbjsdbjsdjsdjsgd");
   
  

  
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
        <div className="md:block hidden">
        <div className="flex items-center h-auto pb-[1vw] justify-between">
          <>
            <div className="">
              <label className="text-[1.2vw] text-[#1F487C] font-extrabold">
                {passengerDetails?.operatorname}
                <span className="text-[1vw] pl-[1vw] font-semibold text-gray-500">{`( ${passengerDetails?.bustype} )`}</span>
              </label>
              <div className="mt-[0.5vw]  grid grid-cols-7  w-full">
                <div className="flex flex-col col-span-3">
                  {/* <label className="text-[1vw]">From</label> */}
                  <label className="text-[1.1vw] ">
                    {passengerDetails?.source_name}{" "}
                    <span className="text-[1vw] pl-[0.5vw]  text-gray-500">
                      {`( ${passengerDetails?.Boarding_Place_Name} )`}
                    </span>
                  </label>
                  <label className="text-[0.9vw] font-semibold">
                    {`${passengerDetails?.Board_Halt_Time},`}
                    {/* <span className="text-[0.9vw] pl-[0.5vw] text-gray-500">{` ${formatDate(
                      passengerDetails?.Journey_Date
                    )}`}</span> */}
                    <span className="text-[0.9vw] pl-[0.5vw] text-gray-500">
                      {passengerDetails?.Journey_Date}
                    </span>
                  </label>
                </div>
                <div className="col-span-1 flex justify-center items-center">
                  <FaArrowRightLong color="gray" size={"1.5vw"} />
                </div>
                <div className="flex flex-col col-span-3">
                  {/* <label className="text-[1vw]">From</label> */}
                  <label className="text-[1.1vw] ">
                    {passengerDetails?.dest_name}{" "}
                    {/* <span className="text-[1vw] pl-[0.5vw] font-semibold text-gray-500">
                    {`( ${passengerDetails?.dest_name} )`}
                  </span> */}
                  </label>
                  <label className="text-[0.9vw] flex font-semibold">
                    {/* {`${formatTo12Hour(passengerDetails?.Arr_Time)},`} */}
                    <span>
                      {moment(passengerDetails?.Arr_Time, "HH:mm:ss").format(
                        "hh:mm A"
                      )}
                      ,
                    </span>

                    <span className="text-[0.9vw] pl-[0.5vw] text-gray-500">
                      {/* {` ${formatDate(
                      passengerDetails?.Journey_Date
                    )}`} */}
                      {droppingDate}
                    </span>
                  </label>
                </div>
              </div>
            </div>
            <div className=" flex items-start gap-x-[1vw]">
              <div className="bg-[#1F487C] w-[.1vw] h-[6.2vw]"></div>
              <div className="flex text-[.9vw] text-[#1F487C] gap-x-[.5vw] ">
                <div className="grid grid-cols-5 gap-x-[1vw]">
                  <div className=" flex flex-col col-span-2 gap-y-[.3vw]">
                    <div className="">Base Fare </div>
                    <div className="">serviceTax </div>
                    <div>Tbs Discount</div>
                    <div className="">Net Fare </div>
                  </div>
                  <div className=" flex flex-col items-center gap-y-[.3vw]">
                    <div className="">:</div>
                    <div className="">:</div>
                    <div className="">:</div>
                    <div className="">:</div>
                  </div>
                  <div className="flex flex-col  col-span-2 gap-y-[.3vw]">
                    <div className="">
                      {" "}
                      {/* {`₹ ${calculateDiscountedFare(
                        newConvertDate(passengerDetails?.Journey_Date),
                        passengerDetails?.FareBreakup?.baseFare,
                        tbs_discount
                      )}`} */}
                      {`₹ ${Math.round(passengerDetails?.FareBreakup?.baseFare)}`}
                    </div>
                    <div className="">{`₹ ${" "} ${Math.round(
                      passengerDetails?.FareBreakup?.serviceTax
                    )}`}</div>
                    <div>{`- ₹ ${Math.round(calTbsDiscount(passengerDetails?.FareBreakup?.baseFare))}`}</div>
                    <div className="">{`₹ ${
                      parseInt(
                        calculateDiscountedFare(
                          newConvertDate(passengerDetails?.Journey_Date),
                          passengerDetails?.FareBreakup?.baseFare,
                          tbs_discount
                        )
                      ) + Math.round(passengerDetails?.FareBreakup?.serviceTax)
                    } `}</div>
                  </div>
                </div>
                {/* <div className="font-semibold" >
          {`₹ ${calculateDiscountedFare(
          newConvertDate(passengerDetails?.Journey_Date),
          passengerDetails?.TicketFare,
          tbs_discount
        )}`}</div> */}
              </div>
            </div>
            <div>
              {cancellationPolicy?.CancellationPolicyWithRefund?.length > 0 && (
                <div className="flex justify-center text-[#1F487C] items-center gap-[.5vw] pb-[.5vw]">
                  <Popover
                    color="#EEEDED"
                    content={
                      <div className="">
                        {/* <div className="pb-[1vw] text-[#1F487C] font-bold">
                    <div>Ticket Fare : <span className="font-semibold">{cancellationPolicy?.Collect_amt}</span></div>
                    <div>Cancellation Charges :<span className="font-semibold"> {cancellationPolicy?.canncellation_charges}</span></div>
                    <div>Refund Amount : <span className="font-semibold">{cancellationPolicy?.return_amount}</span></div>
                    </div> */}
                        <div className="grid grid-cols-2 gap-x-[1vw] items-center">
                          {cancellationPolicy?.CancellationPolicyWithRefund
                            ?.length > 0
                            ? cancellationPolicy?.CancellationPolicyWithRefund?.map(
                                (val, ind) => {
                                  return (
                                    <>
                                      <div className="py-[.5vw] text-[#1F487C] font-semibold">
                                        {/* <li>{val.cc}</li>
                            <div>{val.rp}</div> */}
                                        {/* <div>{val.tl}</div> */}
                                        {/* <div>{`Rs ${processAmount(
                                          val.cc
                                        )} /- @ ${val.rp} refund`}</div> */}
                                        <div>{`Rs ${Math.round(calculatefunction(val.rp))} /- @ ${val.rp} refund`}</div>
                                        {/* <div>{Math.round(calculatefunction(val.rp))}</div> */}
                                        <div>{val.con}</div>
                                      </div>
                                    </>
                                  );
                                }
                              )
                            : ""}
                        </div>
                      </div>
                    }
                    placement="left"
                    trigger="hover"
                    overlayStyle={{
                      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.15)", // Apply the shadow here
                    }}
                    // overlayStyle={{ maxWidth: "70vw" }}
                  >
                    <FaCircleInfo
                      size={"1vw"}
                      color="#1F487c"
                      className="cursor-pointer"
                    />
                  </Popover>
                  <span className="text-[1vw] font-semibold ">
                    cancellation policy
                  </span>
                </div>
              )}

              {passengerDetails?.ticket_det?.length > 0 ? (
                <>
                  <div className={`md:block hidden`}>
                    {cancellationPolicy?.CancellationPolicyWithRefund?.length >
                    0 ? (
                      <button
                        className={`flex justify-center items-center bg-[#FFC1C180] ${
                          deleteId.Booking_Id &&
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
                    ) : (
                      <div className="text-red-600 font-bold text-[1vw]">
                        {" "}
                        cancellation policy has expired
                      </div>
                    )}
                  </div>
                </>
              ) : (
                ""
              )}
            </div>
          </>
        </div>
        </div>
      )}

      <div
        className={`md:block hidden min-h-auto max-h-[17vw] overflow-y-auto pt-[0vw]`}
      >
        <Table
          columns={columns}
          dataSource={passengerData}
          pagination={false}
          className="Passenger-class"
        />
      </div>

      {/* ----------------------------------------------------Mobile--------------------------------------- */}
      <div className=" px-[3vw] rounded-[1.5vw] overflow-y-auto block md:hidden">
        <div className="md:hidden block">
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
        <div className="flex flex-col py-[2vw]">
          {passengerDetails?.ticket_det?.length > 0 ? (
            <>
              <div className={`block md:hidden`}>
                <div className="flex items-center justify-between py-[2vw]">
                <div className="grid grid-cols-5 gap-x-[1vw] text-[3vw]">
                  <div className=" flex flex-col col-span-2 gap-y-[.3vw]">
                    <div className="">Base Fare </div>
                    <div className="">serviceTax </div>
                    <div>Tbs Discount</div>
                    <div className="">Net Fare </div>
                  </div>
                  <div className=" flex flex-col items-center gap-y-[.3vw]">
                    <div className="">:</div>
                    <div className="">:</div>
                    <div className="">:</div>
                    <div className="">:</div>
                  </div>
                  <div className="flex flex-col  col-span-2 gap-y-[.3vw]">
                    <div className="">
                      {" "}
                      {`₹ ${calculateDiscountedFare(
                        newConvertDate(passengerDetails?.Journey_Date),
                        passengerDetails?.FareBreakup?.baseFare,
                        tbs_discount
                      )}`}
                    </div>
                    <div className="">{`₹ ${" "} ${Math.round(
                      passengerDetails?.FareBreakup?.serviceTax
                    )}`}</div>
                     <div>{`- ₹ ${Math.round(calTbsDiscount(passengerDetails?.FareBreakup?.baseFare))}`}</div>
                    <div className="">{`₹ ${
                      parseInt(
                        calculateDiscountedFare(
                          newConvertDate(passengerDetails?.Journey_Date),
                          passengerDetails?.FareBreakup?.baseFare,
                          tbs_discount
                        )
                      ) + Math.round(passengerDetails?.FareBreakup?.serviceTax)
                    } `}</div>
                  </div>
                </div>
                <div>
                {cancellationPolicy?.CancellationPolicyWithRefund?.length > 0 && (
                <div className="flex justify-center text-[#1F487C] items-center gap-[.5vw] pb-[2.5vw]">
                  <Popover
                    color="#EEEDED"
                    content={
                      <div className="">
                        {/* <div className="pb-[1vw] text-[#1F487C] font-bold">
                    <div>Ticket Fare : <span className="font-semibold">{cancellationPolicy?.Collect_amt}</span></div>
                    <div>Cancellation Charges :<span className="font-semibold"> {cancellationPolicy?.canncellation_charges}</span></div>
                    <div>Refund Amount : <span className="font-semibold">{cancellationPolicy?.return_amount}</span></div>
                    </div> */}
                        <div className="grid grid-cols-1 gap-x-[2vw] gap-y-[1vw] items-center">
                          {cancellationPolicy?.CancellationPolicyWithRefund
                            ?.length > 0
                            ? cancellationPolicy?.CancellationPolicyWithRefund?.map(
                                (val, ind) => {
                                  return (
                                    <>
                                      <div className="py-[.5vw] text-[#1F487C] font-semibold">
                                        {/* <li>{val.cc}</li>
                            <div>{val.rp}</div> */}
                                        {/* <div>{val.tl}</div> */}
                                        {/* <div>{`Rs ${processAmount(
                                          val.cc
                                        )} /- @ ${val.rp} refund`}</div> */}
                                        <div>{`Rs ${Math.round(calculatefunction(val.rp))} /- @ ${val.rp} refund`}</div>
                                        
                                        <div>{val.con}</div>
                                      </div>
                                    </>
                                  );
                                }
                              )
                            : ""}
                        </div>
                      </div>
                    }
                    placement="top"
                    trigger="click"
                    overlayStyle={{
                      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.15)", // Apply the shadow here
                      maxWidth: "150vw"
                    }}
                    // overlayStyle={{ maxWidth: "70vw" }}
                  >
                    <div className="flex items-center gap-x-[1vw]">
                    <FaCircleInfo
                      size={"3vw"}
                      color="#1F487c"
                      className="cursor-pointer"
                    />
                     <span className="text-[3vw] font-semibold ">
                    cancellation policy
                  </span>
                  </div>
                  </Popover>
                 
                </div>
              )}
                {cancellationPolicy?.CancellationPolicyWithRefund?.length >
                    0 ? (
                      
                  <button
                    className={`flex justify-center pt-[2vw] items-center bg-[#FFC1C180] ${
                      deleteId.Booking_Id &&
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
                     ) : (
                      <div className="text-red-600 font-bold text-[3.5vw]">
                        {" "}
                        cancellation policy has expired
                      </div>
                    )}
                    </div>
                </div>
              </div>
            </>
          ) : (
            ""
          )}
        </div>
<div className="max-h-[40vw] pb-[2vw] overflow-y-auto">
        <Table
          columns={mobileColumn}
          dataSource={passengerData}
          pagination={false}
          className="Passenger-class"
        />
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
      {/* <ModalPopup
        show={cancellResModal}
        onClose={closeDeleteModal}
        height="20vw"
        width="30vw"
        closeicon={false}
        className="md:block hidden"
      >
        <div> fgfgfgfgfgfgfgfgfgfg{cancelResponse.NewPNR}</div>
      </ModalPopup> */}
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
