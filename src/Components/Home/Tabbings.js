import React, { useEffect, useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "../../Components/Home/Footer.css";
import { useDispatch, useSelector } from "react-redux";
import { GetFooter } from "../../Api/Home/Home";

const Tabbings = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [btns, setBtns] = useState(1);
  const topbusrote = [
    "Hyderabad to Bangalore Bus",
    "Hyderabad to Vijayawada Bus",
    "Hyderabad to Mumbai Bus",
    "Vijayawada to Bangalore Bus",
    "Chennai to Madurai Bus",
    "Chennai to Coimbatore Bus",
    "Mumbai to Pune Bus",
    "Mumbai to Hyderabad Bus",
    "Ahmedabad to Rajkot Bus",
    "Ahmedabad to Indore Bus",
    "Udaipur to Jaipur Bus",
    "Jaipur to Delhi Bus",
    "Delhi to Jaipur Bus",
  ];

  const fetchedFooter = useSelector((state) => state.footer)
  console.log(fetchedFooter, "fetchedFooter")
  const top_bus_routeFooter = fetchedFooter[0]?.top_bus_route
  console.log(top_bus_routeFooter, "top_bus_routeFooter")
  const buses_from_top_citiesFooter = fetchedFooter[0]?.buses_from_top_cities
  const top_rtc_busesFooter = fetchedFooter[0]?.top_rtc_buses
  const top_bus_serviceFooter = fetchedFooter[0]?.top_bus_service
  const quick_links = fetchedFooter[0]?.quick_links



  const dispatch = useDispatch();
  useEffect(() => {
    GetFooter(dispatch);
  }, [dispatch]);

  return (
    <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
      <div className="">
        <TabList>
          <div className="grid grid-cols-5 grid-flow-row">
            <Tab
              onClick={() => setBtns(1)}
              className={`${btns == 1
                ? "bg-[#03ccf4]  rounded-full"
                : "border-b-[0.1vw] border-white"
                }  items-center justify-center flex h-[3.1vw] cursor-pointer`}
            >
              <p className="text-white text-[1.3vw] font-bold ">
                Top Bus Route
              </p>
            </Tab>
            <Tab
              onClick={() => setBtns(2)}
              className={`${btns == 2
                ? "bg-[#03ccf4]  rounded-full"
                : "border-b-[0.2vh] border-white"
                }  items-center justify-center flex h-[3.1vw] cursor-pointer`}
            >
              <div className="text-white text-[1.3vw] font-bold ">
                Buses From Top Cities
              </div>
            </Tab>
            <Tab
              onClick={() => setBtns(3)}
              className={`${btns == 3
                ? "bg-[#03ccf4]  rounded-full"
                : "border-b-[0.2vh] border-white"
                }  items-center justify-center flex h-[3.1vw] cursor-pointer`}
            >
              <p className="text-white text-[1.3vw] font-bold">Top RTC Buses</p>
            </Tab>
            <Tab
              onClick={() => setBtns(4)}
              className={`${btns == 4
                ? "bg-[#03ccf4]  rounded-full"
                : "border-b-[0.2vh] border-white"
                }  items-center justify-center flex h-[3.1vw] cursor-pointer`}
            >
              <p className="text-white text-[1.3vw] font-bold">
                Top Bus Service
              </p>
            </Tab>
            <Tab
              onClick={() => setBtns(5)}
              className={`${btns == 5
                ? "bg-[#03ccf4]  rounded-full"
                : "border-b-[0.2vh] border-white"
                }  items-center justify-center flex h-[3.1vw] cursor-pointer`}
            >
              <p className="text-white text-[1.3vw] font-bold">Quick Links</p>
            </Tab>
          </div>
        </TabList>



        <TabPanel>
          <div className="grid grid-cols-4 grid-row gap-0 space-y-[10%] px-6 ">
            {top_bus_routeFooter?.map((item) => (
              <a
                className="text-[#7A7A7A] hover:text-[#7A7A7A]  text-[1vw] mt-[10%]"
                href=""
                target="blank"
              >
                <p>{item.from} to {item.to}</p>
              </a>
            ))}
          </div>
        </TabPanel>
        <TabPanel>
          <div className="grid grid-cols-4 grid-row gap-0 space-y-[10%]  px-6 ">
            {buses_from_top_citiesFooter?.map((item) => (
              <a
                className="text-[#7A7A7A] hover:text-[#7A7A7A] text-[1vw]  mt-[10%]"
                href=""
                target="blank"
              >
                <p>{item.city_name}</p>
              </a>
            ))}
          </div>
        </TabPanel>
        <TabPanel>
          <div className="grid grid-cols-4 grid-row gap-0 space-y-[10%] px-6 ">
            {top_rtc_busesFooter?.map((item) => (
              <a
                className="text-[#7A7A7A] hover:text-[#7A7A7A] text-[1vw] mt-[10%]"
                href=""
                target="blank"
              >
                <p>{item.rtc_name}</p>
              </a>
            ))}
          </div>
        </TabPanel>
        <TabPanel>
          <div className="grid grid-cols-4 grid-row gap-0 space-y-[10%] px-6 ">
            {top_bus_serviceFooter?.map((item) => (
              <a
                className="text-[#7A7A7A] hover:text-[#7A7A7A] text-[1vw] mt-[10%]"
                href=""
                target="blank"
              >
                <p>{item.operator_name}</p>
              </a>
            ))}
          </div>
        </TabPanel>
        <TabPanel>
          <div className="grid grid-cols-4 grid-row gap-0 space-y-[10%] px-6 ">
            {quick_links?.map((item) => (
              <a
                className="text-[#7A7A7A] hover:text-[#7A7A7A] text-[1vw]  mt-[10%]"
                href=""
                target="blank"
              >
                <p>{item.link}</p>
              </a>
            ))}
          </div>
        </TabPanel>
      </div>
    </Tabs>
  );
};

export default Tabbings;
