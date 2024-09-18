import React, { useState } from "react";
import { HiViewGridAdd } from "react-icons/hi";
import { IoHomeOutline, IoInformationCircleOutline } from "react-icons/io5";
import { BiSolidOffer } from "react-icons/bi";
import { MdOutlineHomeRepairService } from "react-icons/md";
import { IoIosContact } from "react-icons/io";
import { RiQuestionAnswerLine } from "react-icons/ri";
import { FaRoute } from "react-icons/fa";
import { TbInfoHexagon } from "react-icons/tb";
import { GoBriefcase } from "react-icons/go";
import { LuBus } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

const NavMobile = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigate = useNavigate();

  return (
    <div>
      <HiViewGridAdd
        onClick={() => setIsModalVisible(!isModalVisible)}
        className={`text-3xl cursor-pointer transition-transform duration-300 ${isModalVisible ? 'rotate-90' : ''}`}
      />
      {isModalVisible &&
        <div
          className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-start z-50"
          onClick={() => setIsModalVisible(false)}
        >
          <div
            className="bg-white rounded-lg shadow-lg overflow-hidden w-[50vw] mt-[24vw]"
            // onClick={(e) => e.stopPropagation()} // Prevents modal from closing when clicking inside the modal
          >
            <nav className="flex flex-col py-[4vw] text-blue-800 text-[4vw]">
              <div className="flex items-center py-[2vw] px-[4vw] hover:bg-blue-800 hover:text-white cursor-pointer" onClick={() => navigate("/")}>
                <IoHomeOutline className="text-[5vw]" />
                <div className="ml-[4vw] text-[3vw] font-semibold">Home</div>
              </div>
              <div className="border-t border-blue-800"></div>

              <div className="flex items-center py-[2vw] px-[4vw] hover:bg-blue-800 hover:text-white cursor-pointer" onClick={() => navigate("/offers")}>
                <BiSolidOffer className="text-[5vw]" />
                <div className="ml-[4vw] text-[3vw] font-semibold">Offers</div>
              </div>
              <div className="border-t border-blue-800"></div>

              <div className="flex items-center py-[2vw] px-[4vw] hover:bg-blue-800 hover:text-white cursor-pointer" onClick={() => navigate("/about")}>
                <MdOutlineHomeRepairService className="text-[5vw]" />
                <div className="ml-[4vw] text-[3vw] font-semibold">About</div>
              </div>
              <div className="border-t border-blue-800"></div>

              <div className="flex items-center py-[2vw] px-[4vw] hover:bg-blue-800 hover:text-white cursor-pointer" onClick={() => navigate("/contact")}>
                <IoIosContact className="text-[5vw]" />
                <div className="ml-[4vw] text-[3vw] font-semibold">Contact</div>
              </div>
              <div className="border-t border-blue-800"></div>

              <div className="flex items-center py-[2vw] px-[4vw] hover:bg-blue-800 hover:text-white cursor-pointer" onClick={() => navigate("/faq")}>
                <RiQuestionAnswerLine className="text-[5vw]" />
                <div className="ml-[4vw] text-[3vw] font-semibold">FAQ</div>
              </div>
              <div className="border-t border-blue-800"></div>

              <div className="flex items-center py-[2vw] px-[4vw] hover:bg-blue-800 hover:text-white cursor-pointer" onClick={() => navigate("/routes")}>
                <FaRoute className="text-[5vw]" />
                <div className="ml-[4vw] text-[3vw] font-semibold">Routes</div>
              </div>
              <div className="border-t border-blue-800"></div>

              <div className="flex items-center py-[2vw] px-[4vw] hover:bg-blue-800 hover:text-white cursor-pointer" onClick={() => navigate("/privacy", { state: { toggleTabs: 1 } })}>
                <TbInfoHexagon className="text-[5vw]" />
                <div className="ml-[4vw] text-[3vw] font-semibold">Privacy Policy</div>
              </div>
              <div className="border-t border-blue-800"></div>

              <div className="flex items-center py-[2vw] px-[4vw] hover:bg-blue-800 hover:text-white cursor-pointer" onClick={() => navigate("/agreement", { state: { toggleTabs: 3 } })}>
                <GoBriefcase className="text-[5vw]" />
                <div className="ml-[4vw] text-[3vw] font-semibold">User Agreement</div>
              </div>
              <div className="border-t border-blue-800"></div>

              <div className="flex items-center py-[2vw] px-[4vw] hover:bg-blue-800 hover:text-white cursor-pointer" onClick={() => navigate("/operators")}>
                <LuBus className="text-[5vw]" />
                <div className="ml-[4vw] text-[3vw] font-semibold">Operator</div>
              </div>
              <div className="border-t border-blue-800"></div>

              <div className="flex items-center py-[2vw] px-[4vw] hover:bg-blue-800 hover:text-white cursor-pointer" onClick={() => navigate("/terms", { state: { toggleTabs: 2 } })}>
                <IoInformationCircleOutline className="text-[5vw]" />
                <div className="ml-[4vw] text-[3vw] font-semibold">Terms & Conditions</div>
              </div>
            </nav>
          </div>
        </div>
      }
    </div>
  );
};

export default NavMobile;
