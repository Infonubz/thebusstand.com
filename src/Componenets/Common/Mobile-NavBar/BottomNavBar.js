import React, { useEffect, useState } from "react";
import ColorCodes from "../../Common/Common-Functions/ColorCodes";
import { FaHome, FaTicketAlt } from "react-icons/fa";
// import { IoFilter } from "react-icons/io5";
import { BiSolidDashboard, BiSolidUserRectangle } from "react-icons/bi";
import { useLocation, useNavigate, useParams } from "react-router";
import { Drawer } from "antd";
import SidebarMobile from "../Sidebar-Filter/Sidebar-Mobile";
import { Abhibus_GetBusList } from "../../../Api-Abhibus/Home/HomePage";
import { useDispatch } from "react-redux";
import moment from "moment";
// import LoginMobile from "../Login/LoginMobile";

export default function BottomNavbar({ ticketInfo }) {
    const colors = ColorCodes();
    const [currentTab, setCurrentTab] = useState(
        Number(sessionStorage.getItem("tab")) || 2
    );
    const [opendrawer, setOpenDrawer] = useState(false);
    const navigation = useNavigate();

    const location = useLocation();
    const handleDrawerClose = () => {
        setOpenDrawer(false);
    };



    const LuxuryFind = (type) =>
        type?.toLowerCase().includes("volvo") ||
        type?.toLowerCase().includes("mercedes benz") ||
        type?.toLowerCase().includes("washroom") ||
        type?.toLowerCase().includes("bharatBenz") ||
        type?.toLowerCase().includes("luxury");


    const busFrom = localStorage.getItem("departure");
    const busTo = localStorage.getItem("arrival");
    const fromSourceID = localStorage.getItem("departureID");
    const toSourceID = localStorage.getItem("arrivalID");
    const jdate = localStorage.getItem("selectedDate");

    console.log(busFrom, busTo, fromSourceID, toSourceID, jdate, 'Arigato')

    useEffect(() => {
        if (location.pathname.includes('buslist')) {
            setCurrentTab(2);
        } else if (location.pathname.includes('settings')) {
            setCurrentTab(4);
        }
    }, [location]);

    useEffect(() => {
        sessionStorage.setItem("tab", currentTab);
    }, [currentTab]);

    console.log(currentTab, "currentTabcurrentTab");

    const dispatch = useDispatch()

    // const GetBUslist = async () => {

    //     try {
    //         const data = await Abhibus_GetBusList(
    //             dispatch,
    //             BusDetails,
    //             BusDetails?.date,
    //             // luxury
    //         );
    //     } catch {
    //         console.error("Error fetching additional user data");
    //     }
    // };

    // useEffect(() => {
    //     GetBUslist();
    // }, []);


    return (
        <>
            <footer
                className={` fixed bottom-0 h-[15vw] w-full  ${LuxuryFind(ticketInfo?.bustype) === true ? 'bg-[#FFE782]' : 'bg-[#1F487C]'} md:hidden block py-[1vw] z-[2]`}
            >
                <div className="flex items-center justify-between px-[5vw]">
                    <div
                        className={`flex flex-col items-center ${currentTab === 1 ? "" : " opacity-50"
                            }`}
                        onClick={(e) => {
                            setCurrentTab(1);
                            sessionStorage.setItem("tab", 1);
                            navigation("/");
                            e.preventDefault();
                        }}
                    >
                        <FaHome color={`${LuxuryFind(ticketInfo?.bustype) === true ? '#393939' : 'white'} `} size={"8vw"} />
                        <label
                            className={`${currentTab === 1 ? ` ${LuxuryFind(ticketInfo?.bustype) === true ? 'text-[#393939]' : 'text-white'} font-extrabold` : `${LuxuryFind(ticketInfo?.bustype) === true ? 'text-[#393939]' : 'text-white'}`
                                } text-[4vw]`}
                        >
                            Home
                        </label>
                    </div>
                    {/* <div
                        className={`flex flex-col items-center ${currentTab === 2 ? "" : " opacity-50"
                            }`}
                        // onClick={handleFilterClick}
                        onClick={(e) => {
                            setCurrentTab(2);
                            sessionStorage.setItem("tab", 2);
                            navigation(
                                `/buslist/${busFrom}/${fromSourceID}/${busTo}/${toSourceID
                                }/${moment(jdate).format("YYYY-MM-DD")}`)
                            e.preventDefault();
                        }}
                    >
                        <BiSolidDashboard color="white" size={"8vw"} />
                        <label
                            className={`${currentTab === 2 ? "text-white font-extrabold" : "text-white"
                                } text-[4vw]`}
                        >
                            Dashboard
                        </label>
                    </div> */}

                    <div
                        className={`flex flex-col items-center ${currentTab === 3 ? "" : " opacity-50"
                            }`}
                        onClick={(e) => {
                            setCurrentTab(3);
                            sessionStorage.setItem("tab", 3);
                            navigation("/main", { state: { tabIndex: 3 } });
                            e.preventDefault();
                        }}
                    >
                        <FaTicketAlt color={`${LuxuryFind(ticketInfo?.bustype) === true ? '#393939' : 'white'} `}  size={"8vw"} />
                        <label
                            className={`${currentTab === 3 ? ` ${LuxuryFind(ticketInfo?.bustype) === true ? 'text-[#393939]' : 'text-white'} font-extrabold` : ` ${LuxuryFind(ticketInfo?.bustype) === true ? 'text-[#393939]' : 'text-white'}`
                                } text-[4vw]`}
                        >
                            Booking
                        </label>
                    </div>

                    <div
                        className={`flex flex-col items-center ${currentTab === 4 ? "" : " opacity-50"
                            }`}
                        onClick={(e) => {
                            setCurrentTab(4);
                            sessionStorage.setItem("tab", 4);
                            navigation("/settings");
                            e.preventDefault();
                        }}
                    >
                        <BiSolidUserRectangle color={`${LuxuryFind(ticketInfo?.bustype) === true ? '#393939' : 'white'} `}  size={"8vw"} />
                        <label
                            className={`${currentTab === 4 ? ` ${LuxuryFind(ticketInfo?.bustype) === true ? 'text-[#393939]' : 'text-white'} font-extrabold` : ` ${LuxuryFind(ticketInfo?.bustype) === true ? 'text-[#393939]' : 'text-white'}`
                                } text-[4vw]`}
                        >
                            Profile
                        </label>
                    </div>
                </div>
            </footer>
            {/* <Drawer
        title={"Login Is Needed to Access the Account."}
        closable
        destroyOnClose
        placement="bottom"
        width={"100%"}
        height={"100%"}
        style={{ backgroundColor: "#E5FFF1" }}
        open={openLoginDrawer}
        onClose={handleDrawerClose}
      >
        <LoginMobile />
      </Drawer> */}
            <Drawer
                closable
                destroyOnClose
                placement="bottom"
                width={"100%"}
                style={{ backgroundColor: "#E5FFF1" }}
                open={opendrawer}
                onClose={handleDrawerClose}
            >
                <SidebarMobile />
            </Drawer>
        </>
    );
}
