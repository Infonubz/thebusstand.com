import { Drawer } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { FaBusAlt } from "react-icons/fa";
import { IoFilterSharp } from "react-icons/io5";
import { RiBusFill } from "react-icons/ri";
import { TbArrowsSort } from "react-icons/tb";
import SidebarMobile from "../../MainComponenet/SidebarMobile";
import SortBar from "../../MobileView/SortBar";
import bg from "../../../assets/mobile pattern.png";
import { Filters } from "../../../Api/Dashboard/Dashboard";
import { useDispatch } from "react-redux";

export default function MobileFilterNavbar() {

  const [selectedButton, setSelectedButton] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [busType, setBusType] = useState(JSON.parse(sessionStorage.getItem("isLuxury")));
  const [NormalBus, setNoramlBus] = useState(JSON.parse(sessionStorage.getItem("isMbleNoramlBus")));
  const [acfilter, setAcFilter] = useState("");
  const [seattypefilter, setSeatTypeFilter] = useState("");
  const [value, setValue] = useState([0, 3000]);
  const [priceRange, setPriceRange] = useState({min: 0, max: 3000});
  const [pickupchecked, setPickupChecked] = useState({});
  const [dropchecked, setDropChecked] = useState({});
  const [pickuptime, setPickUpTime] = useState("");
  const [droptime, setDropTime] = useState("");
  const [operatorchecked, setOperatorChecked] = useState({});
  const [amenitiesvalue, setAmenitiesValue] = useState({});
  const [sorting, setSorting] = useState("");
  const locSrgSorting = localStorage.getItem("sort");
  const departure_local = localStorage.getItem("depature");
  const arrival_local = localStorage.getItem("arrival");
  const departure_date_local = localStorage.getItem("departure_date");
  const isLuxury_local = sessionStorage.getItem("isLuxury");
  const sort_local = localStorage.getItem("sort");
  //const regularbus = sessionStorage.getItem("isMbleNoramlBus");
  const dispatch = useDispatch();


  const handleDrawerClose = (button) => {
    setIsDrawerOpen(false);
    setSelectedButton(null);
  };

  const filter =
    acfilter ||
    NormalBus ||
    busType ||
    seattypefilter ||
    pickuptime ||
    droptime ||
    priceRange.min !== 0 ||
    priceRange.max !== 3000 ||
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
        // Parse the string into a Date object
        let dateObj = new Date(dateTimeString);

        // Format the date to "YYYY-MM-DD"
        const formattedDate =
          dateObj.getFullYear() +
          "-" +
          ("0" + (dateObj.getMonth() + 1)).slice(-2) +
          "-" +
          ("0" + dateObj.getDate()).slice(-2);

        // Store the formatted date back in localStorage
        localStorage.setItem("departure_date", formattedDate);
      }

      const allFilters = await Filters(
        departure_local,
        arrival_local,
        departure_date_local,
        busType,
        acfilter,
        seattypefilter,
        pickuptime,
        droptime,
        pickupcheck,
        dropcheck,
        amenitycheck,
        operatorcheck,
        priceRange,
        localStorage.getItem("sort"),
        NormalBus,
        dispatch
      );
      console.log(allFilters, "allFilters");
      console.log(pickuptime, "pickuptime");
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
    sessionStorage.getItem("isMbleNoramlBus"),
    localStorage.getItem("sort"),
    departure_local,
    arrival_local,
    departure_date_local,
    dispatch,
  ]);


  useEffect(() => {
    handleAllFilters();
  }, [
    handleAllFilters,
    locSrgSorting,
    isLuxury_local,
    busType,
    sort_local,
  ]);

  
  console.log(pickupchecked, "pickupchecked");

  return (
    <>
      <div className="pt-[2vw] px-[2vw] w-[100vw] flex items-center gap-[4vw] overflow-x-auto scrollbar-hide">
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
            className={`text-[#1F487C] text-[4vw] font-semibold whitespace-nowrap ${
              filter ? "text-white bg-[#1F487C]" : "text-[#1F487C]"
            }`}
          >
            Filter
          </span>
        </button>
        <button
          className={`flex items-center py-[0.5vw] px-[2vw] gap-[2vw] border-[#1F487C] border-[0.1vw] rounded-[1vw]
             ${
               sorting ? "text-white bg-[#1F487C]" : "text-[#1F487C] bg-white"
             }`}
          onClick={() => {
            setIsDrawerOpen(true);
            setSelectedButton(2);
          }}
        >
          <span>
            <TbArrowsSort
              color={`${sorting ? "white" : "#1F487C"}`}
              size={"4vw"}
            />
          </span>
          <span
            className={`text-[#1F487C] text-[4vw] font-semibold whitespace-nowrap 
              ${sorting ? "text-white bg-[#1F487C]" : "text-[#1F487C]"} `}
          >
            Sort
          </span>
        </button>
        <button
          className={`flex items-center py-[0.5vw] px-[2vw] gap-[2vw] border-[#1F487C] border-[0.1vw] ${
            selectedButton === 3 || busType
              ? "bg-custom-gradient-luxury bg-image-url "
              : "bg-white"
          }  rounded-[1vw]`}
          onClick={() => {
            if (selectedButton === 3 || busType) {
              setSelectedButton(null);
              setBusType(false);
              sessionStorage.setItem("isLuxury", false);
            } else {
              setSelectedButton(3);
              setBusType(true);
              sessionStorage.setItem("isLuxury", true);
            }
          }}
        >
          <span>
            <FaBusAlt
              color={`${selectedButton === 3 || busType ? "black" : "#1F487C"}`}
              size={"4vw"}
            />
          </span>
          <span
            className={`${
              selectedButton === 3 || busType ? "text-black" : "text-[#1F487C]"
            }  text-[4vw] font-semibold whitespace-nowrap`}
            onClick={() => sessionStorage.setItem("isLuxury", true)}
          >
            Luxury Coach
          </span>
        </button>
        <button
          className={`flex items-center py-[0.5vw] px-[2vw] gap-[2vw] border-[#1F487C] border-[0.1vw] ${
            selectedButton === 4 || NormalBus ? "bg-[#1F487C]" : "bg-white"
          }  rounded-[1vw]`}
          onClick={() => {
            if (selectedButton === 4 || NormalBus) {
              setSelectedButton(null);
              setNoramlBus(false);
              sessionStorage.setItem("isMbleNoramlBus", false);
            } else {
              setSelectedButton(4);
              setNoramlBus(true);
              sessionStorage.setItem("isMbleNoramlBus", true);
            }
          }}
        >
          <span>
            <RiBusFill
              color={`${




                selectedButton === 4 || NormalBus ? "white" : "#1F487C"
              }`}
              size={"4vw"}
            />
          </span>
          <span
            className={`${
              selectedButton === 4 || NormalBus
                ? "text-white"
                : "text-[#1F487C]"
            }  text-[4vw] font-semibold whitespace-nowrap`}
            onClick={() => sessionStorage.setItem("isMbleNoramlBus", true)}
          >
            Normal Coach
          </span>
        </button>
      </div>
      <Drawer
        closable
        destroyOnClose
        title={<p>{selectedButton === "sort" ? "Sort" : "Filter"}</p>}
        placement="bottom"
        width={"100%"}
        height={selectedButton === 2 ? "50%" : "75%"}
        style={{
          backgroundColor: "#E5FFF1",
          backgroundImage: `url(${bg})`,
        }}
        open={isDrawerOpen}
        onClose={handleDrawerClose}
      >
        {selectedButton === 2 && (
          <SortBar setSorting={setSorting} sorting={sorting} />
        )}
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
          />
        )}
        {/* {selectedButton === 'map' && <MapDrawer />} */}
      </Drawer>
    </>
  );
}
