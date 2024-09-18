import React, { useState, useMemo } from "react";
import { Table, Checkbox } from "antd";
import { TbTicketOff } from "react-icons/tb";
import ModalPopup from "../../../MainComponenet/Modal/ModalPopup";
import { useDispatch, useSelector } from "react-redux";
import { CancelTicket } from "../../../../Api/MyAccounts/MyBookings";
import { TiArrowRightOutline } from "react-icons/ti";
import moment from "moment";

const PassengerList = () => {
  const cancelledDetails = useSelector((state) => state.get_ticket_to_cancel);
  const [deletemodalIsOpen, setDeleteModalIsOpen] = useState(false);
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
    CancelTicket(deleteId, dispatch);
    setDeleteModalIsOpen(false);
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

  const handleRowSelection = (row, checked) => {
    const updatedSelectedRowsData = checked
      ? [...selectedRowsData, row]
      : selectedRowsData?.filter((item) => item.key !== row.key);

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
            className="border-white h-[1.3vw] w-[1.3vw] mt-[.3vw]"
            indeterminate={
              selectedRowsData?.length > 0 &&
              selectedRowsData?.length < passengerData?.length
            }
            checked={selectedRowsData?.length === passengerData?.length}
            onChange={handleSelectAll}
          />{" "}
          <span>Select</span>
        </span>
      ),
      width: "8%",
      render: (_, record) => (
        <input
          type="checkbox"
          className="border-black h-[1.3vw] w-[1.3vw] mt-[.5vw]"
          checked={selectedRowsData?.some((item) => item.key === record.key)}
          onChange={(e) => handleRowSelection(record, e.target.checked)}
        />
      ),
    },
    {
      title: <div className="">S.NO</div>,
      width: "10%",
      render: (row, record, index) => (
        <div className="flex justify-center">
          <h1 className="text-[1vw]">{index + 1}</h1>
        </div>
      ),
    },
    {
      title: <div className="">Name</div>,
      width: "16%",
      render: (row) => (
        <div className="flex justify-center">
          <h1 className="text-[1vw]">{row.name}</h1>
        </div>
      ),
    },
    {
      title: <div className="">Gender</div>,
      width: "16%",
      render: (row) => (
        <div className="flex justify-center">
          <h1 className="text-[1vw]">{row.gender}</h1>
        </div>
      ),
    },
    {
      title: <div className="">Age</div>,
      width: "13%",
      render: (row) => (
        <div className="flex justify-center">
          <h1 className="text-[1vw]">{row.age}</h1>
        </div>
      ),
    },
    {
      title: <div className="">SeatNO</div>,
      width: "16%",
      render: (row) => (
        <div className="flex justify-center">
          <h1 className="text-[1vw]">{row.seat}</h1>
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

  return (
    <div>
      <span className="flex gap-x-[3vw]">
        {cancelledDetails?.length > 0
          ? cancelledDetails?.map((value) => (
              <div className="flex items-center text-gray-700 pb-[1vw]">
                <span className="font-bold text-[1.2vw] text-[#1f4b7f] mr-3">
                  Passenger List
                </span>
                <span className="text-[1.1vw] mr-[.5vw]">(</span>
                <span className="text-[1.1vw]">{value.departure_name}</span>
                <span className="text-[1.1vw] mx-[.5vw]">—</span>
                <span className="text-[1.1vw]">
                  {value.departure_time.slice(0, 5)},
                  <span className="pl-[.5vw]">
                    {moment(value.departure_date).format("DD MMM YY")}
                  </span>
                </span>
                <span className="text-[1.5vw] mx-[.5vw]">
                  <TiArrowRightOutline />
                </span>
                <span className="text-[1.1vw]">{value.arrival_name}</span>
                <span className="text-[1.1vw] mx-[.5vw]">—</span>
                <span className="text-[1.1vw]">
                  {value.arrival_time.slice(0, 5)},
                  <span className="pl-[.5vw]">
                    {moment(value.arrival_date).format("DD MMM YY")}
                  </span>
                </span>
                <span className="text-[1.1vw] ml-[.5vw]">)</span>
              </div>
            ))
          : ""}

        <div
          className="flex justify-center items-center cursor-pointer bg-[#FFC1C180] w-[12vw] rounded-full h-[2.5vw] gap-[1vw] mb-[1vw]"
          onClick={() => {
            setDeleteModalIsOpen(true);
          }}
        >
          <div>
            <TbTicketOff size="1.7vw" className="text-[#C62B2B]" />
          </div>
          <div className="text-[1.1vw] text-[#C62B2B] font-bold">
            Cancel Ticket
          </div>
        </div>
      </span>

      <div>
        <Table
          columns={columns}
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
    </div>
  );
};

export default PassengerList;
