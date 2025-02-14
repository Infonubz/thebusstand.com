import axios from "axios";
import React from "react";
import { MdAutoDelete } from "react-icons/md";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { Deleteall } from "../../../../Api-TBS/MyAccounts/Passenger";

export default function DeleteModal({ api, title, setDeleteModalIsOpen, passName }) {
  // const DeletePromoData = async () => {
  //   const response = await axios.delete(api);
  //   toast.success(response?.data?.message);
  //   setDeleteModalIsOpen(false)
  // };
  const dispatch = useDispatch();
  const handlesubmit = () => {
    setDeleteModalIsOpen(false);
    Deleteall(api, dispatch);
  };
  return (
    <div>
      <div className="flex flex-col  justify-center">
        <div className="items-center flex-col flex justify-center mt-[0.5vw]">
          <MdAutoDelete
            color="#1f4b7f"
            className="md:text-[5vw] text-[30vw] "
          />
          <p className="md:text-[1.7vw] text-[4vw] font-semibold text-[#1f4b7f] mt-[1vw]">
            Are you Sure ?
          </p>
          <p className="md:text-[1.1vw] text-[4vw] text-[#1f4b7f] mt-[0.5vw]">
            {`${title}`} <span className="font-bold ">{passName} ?</span>
          </p>
        </div>
        <div className="flex items-center md:mt-[2vw] mt-[5vw] gap-[5vw] md:gap-[2vw] justify-evenly md:justify-center">
          <button
            className="border-[#1f4b7f] border-[0.1vw] rounded-[1vw] md:rounded-[0.5vw] text-[5vw] md:text-[1.1vw] font-semibold text-[#1f4b7f] w-[30vw] h-[10vw] md:w-[10vw] md:h-[3vw]"
            onClick={() => setDeleteModalIsOpen(false)}
          >
            No
          </button>
          <button
            className="bg-[#1f4b7f] text-white font-semibold text-[5vw] md:text-[1.1vw] w-[30vw] h-[10vw] md:w-[10vw] md:h-[3vw] rounded-[1vw] md:rounded-[0.5vw]"
            // onClick={() => DeletePromoData()}
            onClick={() => handlesubmit()}
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
}
