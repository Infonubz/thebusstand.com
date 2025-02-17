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

    const [BusFilters, SetBusFilters] = useState({
        bustype: null,
        ac_non_ac: null,
        seat_type: null,
        price_range: null,
    });

    console.log(BusFilters?.bustype, 'BusFilters_bustype')

    const filter =
        BusFilters?.bustype ||
        BusFilters?.bustype === false ||
        sessionStorage.getItem('home_luxury') === 'true' ||
        BusFilters?.seat_type === false ||
        BusFilters?.ac_non_ac === false ||
        BusFilters?.seat_type ||
        sessionStorage.getItem('home_ac') === "true" ||
        sessionStorage.getItem('home_seat_type') === 'true' ||
        sessionStorage.getItem('home_seat_type') === 'false' ||
        BusFilters?.ac_non_ac ||
        pickuptime ||
        droptime ||
        JSON.stringify(priceRange) !== JSON.stringify([0, 3000]) ||
        Object.keys(operatorchecked).length > 0 ||
        Object.keys(amenitiesvalue).length > 0 ||
        Object.keys(dropchecked).length > 0 ||
        Object.keys(pickupchecked).length > 0;

    console.log(priceRange, filter, "ac_filter");
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

            // console.error("allFilters", allFilters);
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

    const home_luxury = sessionStorage.getItem('home_luxury')
    const home_ac = sessionStorage.getItem('home_ac')
    const home_seat_type = sessionStorage.getItem('home_seat_type')
    useEffect(() => {
        let filteredList = buslist || [];
        console.log(filteredList, 'filtereedList')
        // Filter for Bus Type (Luxury/Normal)
        if (BusFilters?.bustype === true) {
            filteredList = filteredList.filter((item) =>
                !(item?.Bus_Type_Name?.toLowerCase()?.includes("mercedes benz") ||
                    item?.Bus_Type_Name?.toLowerCase()?.includes("volvo"))
            );
        } else if (home_luxury === 'true' || BusFilters?.bustype === false) {
            filteredList = filteredList.filter((item) =>
                item?.Bus_Type_Name?.toLowerCase()?.includes("mercedes benz") ||
                item?.Bus_Type_Name?.toLowerCase()?.includes("volvo")
            );
        }
        // Filter for AC/Non-AC
        if (home_ac === "true" || BusFilters?.ac_non_ac === true) {
            filteredList = filteredList.filter((item) =>
                !item?.bus_type?.toLowerCase()?.includes("non-ac")
            );
        } else if (BusFilters?.ac_non_ac === false) {
            filteredList = filteredList.filter((item) =>
                item?.bus_type?.toLowerCase()?.includes("non-ac")
            );
        }
        // Filter for Seater/Sleeper
        if (home_seat_type === 'true' || BusFilters?.seat_type === true) {
            filteredList = filteredList.filter((item) =>
                item?.bus_type?.toLowerCase()?.includes("seater")
            );
        } else if (home_seat_type === 'false' || BusFilters?.seat_type === false) {
            filteredList = filteredList.filter((item) =>
                item?.bus_type?.toLowerCase()?.includes("sleeper")
            );
        }
        dispatch({
            type: GET_BUS_FILTERS,
            payload: filteredList,
        });


    }, [dispatch, BusFilters, buslist, home_luxury, home_ac, home_seat_type]);


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
                    className={`flex items-center py-[0.5vw] px-[2vw] gap-[2vw] border-[#1F487C] border-[0.1vw] ${BusFilters?.bustype === false
                        ? "bg-custom-gradient-luxury bg-image-url "
                        : "bg-white"
                        }  rounded-[1vw]`}
                    onClick={() => {
                        SetBusFilters((prev) => ({
                            ...prev,
                            bustype: prev.bustype === false ? null : false,
                        }));

                        if (sessionStorage.getItem('home_luxury') === 'true') {
                            sessionStorage.setItem('home_luxury', null)
                        } else {
                            sessionStorage.setItem('home_luxury', true)
                        }
                    }}
                >
                    <span>
                        <FaBusAlt
                            color={`${BusFilters?.bustype === false ? "black" : "#1F487C"}`}
                            size={"4vw"}
                        />
                    </span>
                    <span
                        className={`${BusFilters?.bustype === false ? "text-black" : "text-[#1F487C]"
                            }  text-[4vw] font-semibold whitespace-nowrap`}
                        onClick={() => {
                            sessionStorage.setItem("isMbleLuxury", true);

                        }}
                    >
                        Luxury Coach
                    </span>
                </button>
                <button
                    className={`flex items-center py-[0.5vw] px-[2vw] gap-[2vw] border-[#1F487C] border-[0.1vw] ${BusFilters?.bustype === true ? "bg-[#1F487C]" : "bg-white"
                        }  rounded-[1vw]`}
                    onClick={() => {
                        SetBusFilters((prev) => ({
                            ...prev,
                            bustype: prev.bustype === true ? null : true,
                        }));
                    }}
                >
                    <span>
                        <RiBusFill
                            color={`${BusFilters?.bustype === true ? "white" : "#1F487C"
                                }`}
                            size={"4vw"}
                        />
                    </span>
                    <span
                        className={`${BusFilters?.bustype === true
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
                        BusFilters={BusFilters}
                        SetBusFilters={SetBusFilters}
                    />
                )}
                {/* {selectedButton === 'map' && <MapDrawer />} */}
            </Drawer>
        </>
    );
}
