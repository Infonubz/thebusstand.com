import { Drawer } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { FaBusAlt } from "react-icons/fa";
import { IoFilterSharp } from "react-icons/io5";
import { RiBusFill } from "react-icons/ri";
import { TbArrowsSort } from "react-icons/tb";
// import bg from "../../../../Assets/CommonImages/mobile pattern.png";
import bg from "../../../Assets/CommonImages/mobile pattern.png"
// import { Filters } from "../../../Api/Dashboard/Dashboard";
import { useDispatch, useSelector } from "react-redux";
import SortBar from "../Mobile-NavBar/SortBar";
import SidebarMobile from "../Sidebar-Filter/Sidebar-Mobile";
import { GET_BUS_FILTERS } from "../../../Store/Type";

export default function MobileFilterNavbar() {
    const [selectedButton, setSelectedButton] = useState(null);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [isSortDrawer, setIsSortDrawer] = useState(false)
    const [selectedOption, setSelectedOption] = useState(null);
    const [busType, setBusType] = useState(
        JSON.parse(sessionStorage.getItem("isMbleLuxury"))
    );
    const [NormalBus, setNoramlBus] = useState(
        JSON.parse(sessionStorage.getItem("isMbleNoramlBus"))
    );
    const [acfilter, setAcFilter] = useState("");
    const [seattypefilter, setSeatTypeFilter] = useState("");
    const [value, setValue] = useState([0, 3000]);
    const [priceRange, setPriceRange] = useState([0, 3000]);
    const [pickupchecked, setPickupChecked] = useState({});
    const [dropchecked, setDropChecked] = useState({});
    const [pickuptime, setPickUpTime] = useState("");
    const [droptime, setDropTime] = useState("");
    const [operatorchecked, setOperatorChecked] = useState({});
    const [amenitiesvalue, setAmenitiesValue] = useState({});
    const [sorting, setSorting] = useState("");
    const locSrgSorting = sessionStorage.getItem("mbleSort");
    const departure_local = localStorage.getItem("depature");
    const arrival_local = localStorage.getItem("arrival");
    const departure_date_local = localStorage.getItem("departure_date");
    const isLuxury_local = sessionStorage.getItem("isMbleLuxury");
    const sort_local = sessionStorage.getItem("mbleSort");
    //const regularbus = sessionStorage.getItem("isMbleNoramlBus");
    const dispatch = useDispatch();

    const handleDrawerClose = (button) => {
        setIsDrawerOpen(false);
        setSelectedButton(null);
        setIsSortDrawer(false)
    };


    const [luxurybus, setluxurybus] = useState({
        luxury: null,
        normal: null,
    });

    const [acBus, setAcBus] = useState({
        ac_bus: null,
        non_ac_bus: null,
    });
    const [busSeatType, setBusSeatType] = useState({
        sleep: null,
        seat: null
    })



    useEffect(() => {
        if (sessionStorage.getItem('home_luxury') === 'true') {
            setluxurybus({
                normal: null,
                luxury: true
            })
        }
        if (sessionStorage.getItem('home_ac') === 'true') {
            setAcBus({
                ac_bus: true,
                non_ac_bus: null,
            })
        }
        if (sessionStorage.getItem('home_seat_type') === 'true') {
            setBusSeatType({
                seat: true,
                sleep: null
            })
        }
        if (sessionStorage.getItem('home_seat_type') === 'false') {
            setBusSeatType({
                sleep: true,
                seat: null
            })
        }
    }, [])

    useEffect(() => {
        if (luxurybus?.luxury === null) {
            sessionStorage.setItem("home_luxury", null)
        }
        if (busSeatType?.seat === null) {
            sessionStorage.setItem("home_seat_type", null)
        }
        if (busSeatType?.sleep === null) {
            sessionStorage.setItem("home_seat_type", null)
        }
        if (acBus?.ac_bus === null) {
            sessionStorage.setItem("home_ac", null)
        }
    }, [])
    
    const filter =
        luxurybus?.luxury === true || luxurybus?.normal === true || acBus?.ac_bus === true || acBus?.non_ac_bus === true || busSeatType?.seat === true || busSeatType?.sleep === true ||
        sessionStorage.getItem('home_luxury') === 'true' ||
        sessionStorage.getItem('home_ac') === "true" ||
        sessionStorage.getItem('home_seat_type') === 'true' ||
        sessionStorage.getItem('home_seat_type') === 'false' ||
        pickuptime ||
        droptime ||
        JSON.stringify(priceRange) !== JSON.stringify([0, 3000]) ||
        Object.keys(operatorchecked).length > 0 ||
        Object.keys(amenitiesvalue).length > 0 ||
        Object.keys(dropchecked).length > 0 ||
        Object.keys(pickupchecked).length > 0;

    const handleAllFilters = useCallback(async () => {
        try {
            const pickupcheck = Object.keys(pickupchecked).filter(
                (key) => pickupchecked[key]
            );
            const operatorcheck = Object.keys(operatorchecked).filter(
                (key) => operatorchecked[key]
            );
            const dropcheck = Object.keys(dropchecked).filter(
                (key) => dropchecked[key]
            );
            const amenitycheck = Object.keys(amenitiesvalue).filter(
                (key) => amenitiesvalue[key]
            );
            let dateTimeString = localStorage.getItem("selectdate");

            if (dateTimeString) {
                let dateObj = new Date(dateTimeString);
                const formattedDate =
                    dateObj.getFullYear() +
                    "-" +
                    ("0" + (dateObj.getMonth() + 1)).slice(-2) +
                    "-" +
                    ("0" + dateObj.getDate()).slice(-2);
                localStorage.setItem("departure_date", formattedDate);
            }

            // const allFilters = await Filters(
            //     departure_local,
            //     arrival_local,
            //     departure_date_local,
            //     busType,
            //     acfilter,
            //     seattypefilter,
            //     pickuptime,
            //     droptime,
            //     pickupcheck,
            //     dropcheck,
            //     amenitycheck,
            //     operatorcheck,
            //     priceRange,
            //     sessionStorage.getItem("mbleSort"),
            //     NormalBus,
            //     dispatch
            // );

        } catch (error) {
            console.error("Error", error);
        }
    }, [
        busType,
        acfilter,
        seattypefilter,
        pickuptime,
        droptime,
        pickupchecked,
        dropchecked,
        amenitiesvalue,
        operatorchecked,
        priceRange,
        // sessionStorage.getItem("isMbleNoramlBus"),
        // sessionStorage.getItem("mbleSort"),
        NormalBus,
        departure_local,
        arrival_local,
        departure_date_local,
        dispatch,
    ]);

    useEffect(() => {
        handleAllFilters();
    }, [handleAllFilters, locSrgSorting, isLuxury_local, busType, sort_local]);

    useEffect(() => {
        // Clear sessionStorage when the page reloads
        const handleBeforeUnload = () => {
            sessionStorage.setItem("isMbleLuxury", false);
            sessionStorage.setItem("isMbleNoramlBus", false);
            localStorage.setItem("seatType", "");
            localStorage.setItem("ac", "");
            setAcFilter("");
        };

        // Adding event listener for page unload (reload, close, etc.)
        window.addEventListener("beforeunload", handleBeforeUnload);

        // Clean up the event listener when the component unmounts
        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload);
        };
    }, []);

    const buslist = useSelector((state) => state?.get_buslist);

    // const home_luxury = sessionStorage.getItem('home_luxury')
    // const home_ac = sessionStorage.getItem('home_ac')
    // const home_seat_type = sessionStorage.getItem('home_seat_type')

    useEffect(() => {
        let filteredList = buslist || [];
        // Filter for Bus Type (Luxury/Normal)
        if (luxurybus?.normal === true) {
            filteredList = filteredList.filter((item) =>
                !(item?.Bus_Type_Name?.toLowerCase()?.includes("mercedes benz") ||
                    item?.Bus_Type_Name?.toLowerCase()?.includes("volvo"))
            );
        } else if (luxurybus?.luxury === true) {
            filteredList = filteredList.filter((item) =>
                item?.Bus_Type_Name?.toLowerCase()?.includes("mercedes benz") ||
                item?.Bus_Type_Name?.toLowerCase()?.includes("volvo")
            );
        }
        // Filter for AC/Non-AC
        if (acBus?.ac_bus === true) {
            filteredList = filteredList.filter((item) =>
                !item?.bus_type?.toLowerCase()?.includes("non-ac")
            );
        } else if (acBus?.non_ac_bus === true) {
            filteredList = filteredList.filter((item) =>
                item?.bus_type?.toLowerCase()?.includes("non-ac")
            );
        }
        // Filter for Seater/Sleeper
        if (busSeatType?.seat === true) {
            filteredList = filteredList?.filter((item) =>
                item?.bus_type?.toLowerCase()?.includes("seater")
            );
        } else if (busSeatType?.sleep === true) {
            filteredList = filteredList?.filter((item) =>
                item?.bus_type?.toLowerCase()?.includes("sleeper")
            );
        }
        dispatch({
            type: GET_BUS_FILTERS,
            payload: filteredList,
        });


    }, [dispatch, luxurybus, acBus, busSeatType, buslist]);


    return (
        <>

            <div className="py-[2vw] px-[2vw] w-[100vw] flex items-center gap-[4vw] overflow-x-auto scrollbar-hide">
                <button
                    className={`flex items-center px-[2vw] py-[0.5vw] gap-[2vw] border-[#1F487C] border-[0.1vw] rounded-[1vw]
           ${filter ? "text-white bg-[#1F487C]" : "text-[#1F487C] bg-white"} `}
                    onClick={() => {
                        setIsDrawerOpen(true);
                        setSelectedButton(1);
                    }}
                >
                    <span>
                        <IoFilterSharp
                            color={`${filter ? "white" : "#1F487C"}`}
                            size={"4vw"}
                        />
                    </span>
                    <span
                        className={`text-[#1F487C] text-[4vw] font-semibold whitespace-nowrap ${filter ? "text-white bg-[#1F487C]" : "text-[#1F487C]"
                            }`}
                    >
                        Filter
                    </span>
                </button>
                <button
                    className={`flex items-center py-[0.5vw] px-[2vw] gap-[2vw] border-[#1F487C] border-[0.1vw] rounded-[1vw]
             ${selectedOption ? "text-white bg-[#1F487C]" : "text-[#1F487C] bg-white"
                        }`}
                    onClick={() => {
                        setIsSortDrawer(true);
                        setSelectedButton(2);
                    }}
                >
                    <span>
                        <TbArrowsSort
                            color={`${selectedOption ? "white" : "#1F487C"}`}
                            size={"4vw"}
                        />
                    </span>
                    <span
                        className={`text-[#1F487C] text-[4vw] font-semibold whitespace-nowrap 
              ${selectedOption ? "text-white bg-[#1F487C]" : "text-[#1F487C]"} `}
                    >
                        Sort
                    </span>
                </button>
                <button
                    className={`flex items-center py-[0.5vw] px-[2vw] gap-[2vw] border-[#1F487C] border-[0.1vw] ${luxurybus?.luxury === true
                        ? "bg-custom-gradient-luxury bg-image-url "
                        : "bg-white"
                        }  rounded-[1vw]`}
                    onClick={() => {
                        setluxurybus((prev) => ({
                            ...prev,
                            luxury: prev.luxury === true ? null : true,
                            normal: null
                        }));

                    }}
                >
                    <span>
                        <FaBusAlt
                            color={`${luxurybus?.luxury === true ? "black" : "#1F487C"}`}
                            size={"4vw"}
                        />
                    </span>
                    <span
                        className={`${luxurybus?.luxury === true ? "text-black" : "text-[#1F487C]"
                            }  text-[4vw] font-semibold whitespace-nowrap`}
                        onClick={() => {
                            sessionStorage.setItem("isMbleLuxury", true);

                        }}
                    >
                        Luxury Coach
                    </span>
                </button>
                <button
                    className={`flex items-center py-[0.5vw] px-[2vw] gap-[2vw] border-[#1F487C] border-[0.1vw] ${luxurybus?.normal === true ? "bg-[#1F487C]" : "bg-white"
                        }  rounded-[1vw]`}
                    onClick={() => {
                        setluxurybus((prev) => ({
                            ...prev,
                            normal: prev.normal === true ? null : true,
                            luxury: null
                        }))
                    }}
                >
                    <span>
                        <RiBusFill
                            color={`${luxurybus?.normal === true ? "white" : "#1F487C"
                                }`}
                            size={"4vw"}
                        />
                    </span>
                    <span
                        className={`${luxurybus?.normal === true
                            ? "text-white"
                            : "text-[#1F487C]"
                            }  text-[4vw] font-semibold whitespace-nowrap`}
                        onClick={() => {
                            sessionStorage.setItem("isMbleNoramlBus", true)
                        }}
                    >
                        Normal Coach
                    </span>
                </button>
            </div>
            <Drawer
                closable
                destroyOnClose
                title={<p>{`Sort`}</p>}
                placement="bottom"
                width={"100%"}
                height={`60%`}
                style={{
                    backgroundColor: "#E5FFF1",
                    backgroundImage: `url(${bg})`,
                }}
                open={isSortDrawer}
                onClose={handleDrawerClose}
            >

                <SortBar selectedOption={selectedOption} setSelectedOption={setSelectedOption} />

            </Drawer>
            <Drawer
                closable
                destroyOnClose
                title={<p>{selectedButton === "sort" ? "Sort" : "Filter"}</p>}
                placement="bottom"
                width={"100%"}
                height={selectedButton === 2 ? "60%" : "75%"}
                style={{
                    backgroundColor: "#E5FFF1",
                    backgroundImage: `url(${bg})`,
                }}
                open={isDrawerOpen}
                onClose={handleDrawerClose}
            >

                {selectedButton === 1 && (
                    <SidebarMobile
                        selectedButton={selectedButton}
                        setBusType={setBusType}
                        busType={busType}
                        setNoramlBus={setNoramlBus}
                        NormalBus={NormalBus}
                        setAcFilter={setAcFilter}
                        acfilter={acfilter}
                        seattypefilter={seattypefilter}
                        setSeatTypeFilter={setSeatTypeFilter}
                        value={value}
                        setValue={setValue}
                        priceRange={priceRange}
                        setPriceRange={setPriceRange}
                        pickupchecked={pickupchecked}
                        setPickupChecked={setPickupChecked}
                        dropchecked={dropchecked}
                        setDropChecked={setDropChecked}
                        pickuptime={pickuptime}
                        setPickUpTime={setPickUpTime}
                        setDropTime={setDropTime}
                        droptime={droptime}
                        operatorchecked={operatorchecked}
                        setOperatorChecked={setOperatorChecked}
                        amenitiesvalue={amenitiesvalue}
                        setAmenitiesValue={setAmenitiesValue}
                        departure_local={departure_local}
                        arrival_local={departure_local}
                        luxurybus={luxurybus}
                        setluxurybus={setluxurybus}
                        acBus={acBus}
                        setAcBus={setAcBus}
                        busSeatType={busSeatType}
                        setBusSeatType={setBusSeatType}
                    />
                )}
                {/* {selectedButton === 'map' && <MapDrawer />} */}
            </Drawer>
        </>
    );
}
