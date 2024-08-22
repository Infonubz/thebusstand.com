import React, { useEffect, useState } from "react";
import { Table, Button } from 'antd';
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdOutlineModeEdit } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import './PassengersTable.css'
import AddPassengers from "./AddPassengers";
import { PASSENGER_DATA } from "../../../../Store/type";
import { useDispatch, useSelector } from "react-redux";
import { GetPassengById, GetPassengerData } from "../../../../Api/MyAccounts/Passenger";
import ModalPopup from "../../../MainComponenet/Modal/ModalPopup";
import Delete from "./Delete";

export default function PassengersList({ nextPage, passengerdata, setPassData, passData, updateData, setUpdateData }) {

  const getDataById = (id) => {
    GetPassengById(id)
  }

  const [presentPage, setPresentPage] = useState(true);

  const handleOnTogglePage = () => {
    setPresentPage(!presentPage)
  }

  const handleNextPage = () => {
    setUpdateData(null)
    nextPage()
  }

  const [deletemodalIsOpen, setDeleteModalIsOpen] = useState(false);
  const closeDeleteModal = () => {
    setDeleteModalIsOpen(false);
  };

  const [deleteId, SetDeleteId]=useState(null)
  const columns = [
    {
      title: <div className=''>Name</div>,
      // dataIndex: 'name',
      // specify the condition of filtering result
      // here is that finding the name started with `value`
      // onFilter: (value, record) => record.name.indexOf(value) === 0,
      sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ['descend'],
      render: (row) => {
        return (
          <div className="flex justify-center">
            <h1 className="text-[1vw]">{row.name}</h1>
          </div>
        )
      }
    },
    {
      title: <div className=''>Age</div>,
      // dataIndex: 'age',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.age - b.age,
      render: (row) => {
        return (
          <div className="flex justify-center">
            <h1 className="text-[1vw]">{row.age}</h1>
          </div>
        )
      }
    },
    {
      title: <div className=''>Gender</div>,
      // dataIndex: 'gender',
      render: (row, index) => {
        return (
          <div className="flex justify-center">
            <h1 className="text-[1vw]">{row.gender}</h1>
          </div>
        )
      }
    },
    {
      title: <div className=''>Action</div>,
      key: 'actions',
      render: (row, record) => {
        return (
          <div className="flex justify-center gap-[1vw] ">
            <div className="flex items-center cursor-pointer px-[0.5vw] border-[0.1vw] border-[#1f4b7f] rounded-[0.2vw] w-[5.5vw] h-[2vw] gap-[0.5vw]"
              onClick={() => {
                setUpdateData(row.tbs_add_pax_id);
                nextPage();
              }}>
              <div><MdOutlineModeEdit size='1.1vw' /></div>
              <div className="text-[1vw]">Edit</div>
            </div>
            <div className="flex items-center cursor-pointer px-[0.5vw] border-[0.1vw] border-[#1f4b7f] rounded-[0.2vw] w-[5.5vw] h-[2vw] gap-[0.5vw]" onClick={() => {
              setDeleteModalIsOpen(true);
              SetDeleteId(row.tbs_add_pax_id);
            }}>
              <div><RiDeleteBin6Line size='1.1vw' /></div>
              <div className="text-[1vw]">Delete</div>
            </div>
          </div>
        )
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




  return (
    <>

      <div className="flex justify-between">
        <div className=" order-first text-[#1F487C] font-semibold font-size: 1.2vw;">Saved Passenger</div>
        <div className="order-last text-[#1F487C] font-semibold cursor-pointer font-size-[1.2vw] flex items-center gap-[0.5vw]" onClick={handleNextPage}><IoMdAdd size='1.5vw' /> Add New Passenger</div>
      </div>
      <div>
        <div className="text-[#1F487C] text-[1vw] py-[0.5vw]">You have {passengerdata?.length} Traveller(s)</div>
      </div>
      <div>
        <Table
          className="Passenger-class"
          columns={columns}
          // dataSource={data}
          dataSource={passengerdata}
          pagination={false}
          // onChange={onChange}
          showSorterTooltip={{
            target: 'sorter-icon',
          }}
        />
      </div>

      <ModalPopup
        show={deletemodalIsOpen}
        onClose={closeDeleteModal}
        height="20vw"
        width="30vw"
        closeicon={false}
      >
        <Delete
          setDeleteModalIsOpen={setDeleteModalIsOpen}
          title={"Want to delete Passenger"}
          api={`http://192.168.90.47:4001/api/add-passenger-details/${deleteId}`}
        />
      </ModalPopup>
    </>
  );
}

