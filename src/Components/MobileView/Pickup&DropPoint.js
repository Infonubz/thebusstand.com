import React, { useEffect, useState } from "react";
import { Drawer } from "antd";
import { useRef } from "react";
import dayjs from "dayjs";
import { HiCheckCircle } from "react-icons/hi";

const PickupDropPoint = ({
  busType,
  isDrawerOpen,
  setIsDrawerOpen,
  item,
  busid,
  busdroping,
  busboarding,
  setSelectedRoutes,
  selectedRoutes
}) => {
  const componentRef = useRef();

  const onClose = () => {
    setIsDrawerOpen(false);
  };

  // const [selectedRoutes, setSelectedRoutes] = useState({
  //   dep_route: busboarding?.[0].name,
  //   arri_route: busdroping?.[0].name,
  //   dep_time: busboarding?.[0].time,
  //   arr_time: busdroping?.[0].time,
  // });
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <div>
        <div ref={componentRef} id="capture" className={`h-[165vw] w-full`}>
          <div className={`h-[165vw] w-full`}>
            <div className="grid grid-cols-2 w-full h-[165vw] px-[2vw] py-[1vw] gap-[1.5vw]">
              <div className="col-span-1 border-[0.1vw] h-auto border-gray-400 w-full rounded-[1.5vw]">
                <p
                  className="text-center py-[1.4vw] text-white rounded-tl-[1.5vw] rounded-tr-[1.5vw] text-[4vw]"
                  style={{
                    backgroundColor:
                      item.bus_type_status === "luxury" ? "#393939" : "#1F487C",
                  }}
                >
                  PICKUP POINT
                </p>
                <div
                  className={`h-[165vw] rounded-b-[1.5vw] bg-white overflow-y-auto ${
                    item?.bus_type_status === "luxury"
                      ? "scrollbar-luxury"
                      : "scrollbar-regular"
                  }`}
                >
                  {busboarding.map((boarding, index) => (
                    <div
                      key={index}
                      className={`${
                        selectedRoutes?.dep_route === boarding.name
                          ? "bg-[#E5FFF1]"
                          : "bg-white hover:bg-gray-2400"
                      } flex flex-col py-[2vw] px-[1.5vw] text-[3.5vw] cursor-pointer relative`}
                      onClick={() =>
                        setSelectedRoutes({
                          ...selectedRoutes,
                          dep_route: boarding.name,
                          dep_time: boarding?.time,
                        })
                      }
                      style={{
                        backgroundColor:
                          selectedRoutes?.dep_route === boarding.name &&
                          item?.bus_type_status === "luxury"
                            ? "#FFE5AB"
                            : selectedRoutes?.dep_route === boarding.name &&
                              item?.bus_type_status === "regular"
                            ? "#E7E9EB"
                            : "white",
                      }}
                    >
                      {selectedRoutes?.dep_route === boarding.name ? (
                        <span className="absolute right-[1vw] top-[2vw]">
                          <HiCheckCircle
                            size={"4.5vw"}
                            color={
                              item?.bus_type_status === "luxury"
                                ? "#393939"
                                : "#1F487C"
                            }
                          />
                        </span>
                      ) : (
                        ""
                      )}

                      <p className="flex items-center">
                        <span className="text-[3.5vw] pr-[1vw]">
                          {dayjs(boarding?.time).format("HH:mm")}
                        </span>
                        <span className="text-[3vw] ">
                          {`(${dayjs(boarding.time).format("DD MMM")})`}
                        </span>
                      </p>
                      <p className="text-[3.4vw] font-bold">{boarding.name}</p>
                      <p className="text-[2.5vw]">{`(${boarding.address})`}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="col-span-1 border-[0.1vw] border-gray-400 w-full h-auto rounded-[1.5vw]">
                <p
                  className="text-center py-[1.4vw]  text-white rounded-tl-[1.5vw] rounded-tr-[1.5vw] text-[4vw]"
                  style={{
                    backgroundColor:
                      item?.bus_type_status === "luxury"
                        ? "#393939"
                        : "#1F487C",
                  }}
                >
                  DROP POINT
                </p>
                <div
                  className={`h-[165vw] rounded-ba-[1.5vw] bg-white overflow-y-auto ${
                    item?.bus_type_status === "luxury"
                      ? "scrollbar-luxury"
                      : "scrollbar-regular"
                  }`}
                >
                  {" "}
                  {busdroping?.map((drop, index) => (
                    <div
                      key={index}
                      className={`${
                        selectedRoutes.arri_route === drop.name
                          ? "bg-[#E5FFF1]"
                          : "bg-white hover:bg-gray-200"
                      } flex flex-col py-[2vw] px-[1.5vw]  cursor-pointer relative`}
                      onClick={() =>
                        setSelectedRoutes({
                          ...selectedRoutes,
                          arri_route: drop.name,
                          arr_time: drop?.time,
                        })
                      }
                      style={{
                        backgroundColor:
                          selectedRoutes?.arri_route === drop.name &&
                          item?.bus_type_status === "luxury"
                            ? "#FFE5AB"
                            : selectedRoutes?.arri_route === drop.name &&
                              item?.bus_type_status === "regular"
                            ? "#E7E9EB"
                            : "white",
                      }}
                    >
                      {selectedRoutes.arri_route === drop.name ? (
                        <span className="absolute right-[1vw] top-[1.5vw]">
                          <HiCheckCircle
                            size={"4.5vw"}
                            color={
                              item?.bus_type_status === "luxury"
                                ? "#393939"
                                : "#1F487C"
                            }
                          />
                        </span>
                      ) : (
                        ""
                      )}

                      <p className=" flex items-center">
                        <span className="text-[3.5vw] pr-[1vw]">
                          {dayjs(drop?.time).format("HH:mm")}
                        </span>
                        <span className="text-[3.2vw] ">
                          {`(${dayjs(drop.time).format("DD MMM")})`}
                        </span>
                      </p>
                      <p className="text-[3.5vw] font-bold">{drop.name}</p>
                      <p className="text-[2.75vw]">{`(${drop.address})`}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PickupDropPoint;
