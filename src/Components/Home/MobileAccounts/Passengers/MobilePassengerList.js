import React, { useState } from "react";
import { PiUserLight } from "react-icons/pi";
import { IoIosArrowForward } from "react-icons/io";
import { IoMdAdd } from "react-icons/io";
import { LuUserPlus2 } from "react-icons/lu";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router";
import { Button, Drawer } from 'antd';
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdOutlineModeEdit } from "react-icons/md";
import { GetPassengById } from "../../../../Api/MyAccounts/Passenger";


export default function MobilePassengerList({ nextPage, passengerdata, setPassData, passData, updateData, setUpdateData }) {

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

    const navigation = useNavigate();
    const handlePrevPage = () => {
        localStorage.setItem('navigateBack', 'true');
        navigation('/dashboard', { state: { togglePage: true } });
    };
    const [deleteId, SetDeleteId] = useState(null)

    return (
        <>
            <div className="">
                <div className="w-screen h-[15vw] bg-[#1F487C] flex items-center justify-center">
                    <div className="col-span-2" onClick={handlePrevPage}><IoIosArrowRoundBack color="white" size="10vw" /></div>
                    <div className="px-[2vw] text-[5vw] text-white font-bold flex gap-[2vw]"><p onClick={() => navigation('/dashboard')}>Home</p><p>{`>`}</p><p onClick={handlePrevPage}>My Account</p><p>{`>`}</p><p>Passenger</p></div>
                </div>
                {passengerdata?.map((items) => (
                    <>
                        <div className="py-[1vw] mt-[2vw]">
                            <div className="border-t-[0.5vw] border-b-[0.5vw] border-[#1F487C80] w-screen py-[1.5vw] px-[5vw] flex items-center justify-between">
                                <div className=" flex items-center gap-[4vw]">
                                    <div className="bg-[#F16635] w-[10vw] h-[10vw] rounded-full"><div className="flex items-center w-full h-full justify-center"><PiUserLight color="white" size="6vw" /></div></div>
                                    <div>
                                        <div className="text-[3.5vw] text-[#1F487C]">{items?.user_name?.charAt(0)?.toUpperCase() + items?.user_name?.slice(1)}</div>
                                        <div className="text-[3.5vw] text-[#1F487C]">{items?.gender?.charAt(0)?.toUpperCase() + items?.gender?.slice(1)}, {items.age} years</div>
                                    </div>
                                </div>
                                <div className="order-last flex gap-[4vw]">
                                    <div><MdOutlineModeEdit size='6vw' color="#1F487C" onClick={() => {
                                        setUpdateData(items.tbs_add_pax_id);
                                        nextPage();
                                    }} /></div>
                                    <div><RiDeleteBin6Line size='6vw' color="#1F487C" onClick={() => {
                                        setDeleteModalIsOpen(true);
                                        SetDeleteId(items.tbs_add_pax_id);
                                    }} /></div>
                                </div>
                            </div>
                        </div>
                    </>
                ))}
                <div className="px-[15vw] fixed bottom-[5vw] w-full">
                    <div className="order-last bg-[#1F487C] text-white font-semibold cursor-pointer font-size-[1.2vw] flex items-center justify-center gap-[3.5vw] rounded-full h-[10vw]" onClick={handleNextPage}>
                        <LuUserPlus2 size='7vw' color="white" />
                        <p>Add New Passenger</p>
                    </div>
                </div>
            </div>

        </>
    )
}