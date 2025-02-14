import dayjs from "dayjs";
import React, { useEffect } from "react";
import { HiCheckCircle } from "react-icons/hi";

export default function PickUpandDrop({
  BusDetails,
  busboarding,
  selectedRoutes,
  setSelectedRoutes,
  busdroping,
  layout,
}) {
  const LuxuryFind = (type) =>
    type.toLowerCase().includes("volvo") ||
    type.toLowerCase().includes("mercedes benz") ||
    type.toLowerCase().includes("washroom") ||
    type.toLowerCase().includes("bharatBenz") ||
    type.toLowerCase().includes("luxury");

  console.log(layout, "layoutdfghjk");
  useEffect(()=>{
    setSelectedRoutes({
      ...selectedRoutes,
      dep_route: layout?.boarding_info?.[0]?.placeName,
      arri_route: layout?.dropping_info?.[0]?.placeName,
      dep_time: layout?.boarding_info?.[0]?.placeTime,
      arr_time: layout?.dropping_info?.[0]?.placeTime,
      dep_route_id: layout?.boarding_info?.[0]?.placeId,
      arr_route_id: layout?.dropping_info?.[0]?.placeId,
    })
  },[])
  return (
    <div>
      <div
        className="grid grid-cols-2 w-full  px-[2vw] py-[1vw] gap-[1.5vw]"
        style={{
          height: `${Number(layout?.lowerTotalColumns) * 3}vw`,
        }}
      >
        <div className="col-span-1 border-[0.1vw] border-gray-400 w-full rounded-[0.5vw] bg-white">
          <p
            className="text-center py-[0.5vw] text-white rounded-tl-[0.45vw] rounded-tr-[0.45vw] text-[1.2vw]"
            style={{
              backgroundColor: LuxuryFind(BusDetails?.Bus_Type_Name)
                ? "#393939"
                : "#1F487C",
            }}
          >
            PICK POINT
          </p>

          {/* SCROLLABLE CONTAINER */}
          <div
            className={`overflow-y-auto  ${
              LuxuryFind(BusDetails?.Bus_Type_Name)
                ? "scrollbar-luxury"
                : "scrollbar-regular"
            }`}
            style={{
              maxHeight: `${
                Number(layout?.lowerTotalColumns) * 2.5 > 35
                  ? 35
                  : Number(layout?.lowerTotalColumns) * 2.5
              }vw`,
              overflowY: "auto",
            }}
          >
            {layout?.boarding_info?.map((item, index) => (
              <div
                key={index}
                className={`${
                  selectedRoutes.d === item?.placeName
                    ? "bg-[#E5FFF1]"
                    : "bg-white hover:bg-gray-200"
                } ${
                  LuxuryFind(BusDetails?.Bus_Type_Name)
                    ? "border-gray-400"
                    : "border-gray-400"
                } border-b-[0.1vw]  flex flex-col py-[0.5vw] px-[1vw] cursor-pointer relative `}
                onClick={() =>
                  setSelectedRoutes({
                    ...selectedRoutes,
                    dep_route: item?.placeName,
                    dep_time: item?.placeTime,
                    dep_route_id: item?.placeId,
                  })
                }
                style={{
                  backgroundColor:
                    selectedRoutes?.dep_route === item?.placeName
                      ? LuxuryFind(BusDetails?.Bus_Type_Name)
                        ? "#FFE5AB"
                        : "#E7E9EB"
                      : "white",
                }}
              >
                {selectedRoutes.dep_route === item?.placeName && (
                  <span className="absolute right-[1vw] top-[0.8vw]">
                    <HiCheckCircle
                      size={"1.2vw"}
                      color={
                        LuxuryFind(BusDetails?.Bus_Type_Name)
                          ? "#393939"
                          : "#1F487C"
                      }
                    />
                  </span>
                )}
                <p className="flex items-center">
                  <span className="text-[1vw] pr-[1vw] break-words overflow-hidden ">{item?.placeTime}</span>
                  <span className="text-[0.8vw]">{`(${dayjs(item.dt).format(
                    "DD MMM"
                  )})`}</span>
                </p>
                <p className="text-[1.1vw] font-bold break-words overflow-hidden">{item?.placeName}</p>
                <p className="text-[0.8vw] tracking-wide break-words overflow-hidden">
                  {item.landMark ? `( ${item.landMark} )` : ""}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="col-span-1 border-[0.1vw] border-gray-400 w-full rounded-[0.5vw] bg-white">
          <p
            className="text-center py-[0.5vw] text-white rounded-tl-[0.45vw] rounded-tr-[0.45vw] text-[1.2vw]"
            style={{
              backgroundColor: LuxuryFind(BusDetails?.Bus_Type_Name)
                ? "#393939"
                : "#1F487C",
            }}
          >
            DROP POINT
          </p>

          {/* SCROLLABLE CONTAINER */}
          <div
            className={`overflow-y-auto ${
              LuxuryFind(BusDetails?.Bus_Type_Name)
                ? "scrollbar-luxury"
                : "scrollbar-regular"
            }`}
            style={{
              maxHeight: `${
                Number(layout?.lowerTotalColumns) * 2.5 > 35
                  ? 35
                  : Number(layout?.lowerTotalColumns) * 2.5
              }vw`,
              overflowY: "auto",
            }}
          >
            {layout?.dropping_info?.map((item, index) => (
              <div
                key={index}
                className={`${
                  selectedRoutes.arri_route === item?.placeName
                    ? "bg-[#E5FFF1]"
                    : "bg-white hover:bg-gray-200"
                } ${
                  LuxuryFind(BusDetails?.Bus_Type_Name)
                    ? "border-gray-400"
                    : "border-gray-400"
                } border-b-[0.1vw]  flex flex-col py-[0.5vw] px-[1vw] cursor-pointer relative`}
                onClick={() =>
                  setSelectedRoutes({
                    ...selectedRoutes,
                    arri_route: item?.placeName,
                    arr_time: item?.placeTime,
                    arr_route_id: item?.placeId,
                  })
                }
                style={{
                  backgroundColor:
                    selectedRoutes?.arri_route === item?.placeName
                      ? LuxuryFind(BusDetails?.Bus_Type_Name)
                        ? "#FFE5AB"
                        : "#E7E9EB"
                      : "white",
                }}
              >
                {selectedRoutes.arri_route === item?.placeName && (
                  <span className="absolute right-[1vw] top-[0.8vw]">
                    <HiCheckCircle
                      size={"1.2vw"}
                      color={
                        LuxuryFind(BusDetails?.Bus_Type_Name)
                          ? "#393939"
                          : "#1F487C"
                      }
                    />
                  </span>
                )}
                <p className="flex items-center">
                  <span className="text-[1vw] pr-[1vw] break-words overflow-hidden">{item?.placeTime}</span>
                  <span className="text-[0.8vw]">{`(${dayjs(item.dt).format(
                    "DD MMM"
                  )})`}</span>
                </p>
                <p className="text-[1.1vw] font-bold break-words overflow-hidden">{item?.placeName}</p>
                <p className="text-[0.8vw] tracking-wide break-words overflow-hidden">
                  {item.landMark ? `( ${item.landMark} )` : ""}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
