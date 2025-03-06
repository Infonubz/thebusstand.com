import React, { useEffect, useState } from "react";
import SelectedCardDesign from "./SeatLayout/SelectedCardDesign";
import { useDispatch, useSelector } from "react-redux";
import PickandDrop from "./SeatLayout/PickandDrop";
import MobileSeatLayout from "./SeatLayout/MobileSeatLayout";
import { IoIosInformationCircleOutline } from "react-icons/io";
import KnowYourSeat from "./SeatLayout/KnowYourSeat";
import ModalPopup from "../../Common/Modal/Modal";
import { useLocation, useNavigate } from "react-router";
import { FaArrowRight } from "react-icons/fa";
import dayjs from "dayjs";
import { calculateDiscountedFare } from "../../Common/Common-Functions/TBS-Discount-Fare";

export default function IndexSeatLayout() {
  const location = useLocation();
  const item = location?.state?.data || {};
  const tbs_discount = useSelector((state) => state?.live_per);
  const busdatas = location.state?.busdatas || {}

  const [currentrate, SetCurrentRate] = useState(1);
  const getseats = useSelector((state) => state.get_buslist_filter);
  const [layout, setLayout] = useState();
  // Function to format seat data (for both decks)
  const formatSeatData = (seatList) => {
    return seatList?.map((seat) => {
      const [
        seatNumber,
        row,
        column,
        type,
        isBooked,
        gender,
        price,
        seatTypeID,
        tax,
        childFare,
        category,
        weight,
      ] = seat.split(", ");

      // Safely parse tax as a number, default to 0 if invalid
      const parsedTax = isNaN(tax) ? 0 : Number(tax);

      return {
        seatNumber,
        row: Number(column), // Swap row and column for rotation
        column: Number(row),
        type,
        isBooked: isBooked === "N",
        gender,
        price: Number(price),
        seatTypeID: Number(seatTypeID),
        tax,
        childFare: Number(childFare),
        category,
        weight: Number(weight),
      };
    });
  };

  const lowerDeckSeats = formatSeatData(
    layout?.TotalSeatList?.lowerdeck_seat_nos || []
  );
  const upperDeckSeats = formatSeatData(
    layout?.TotalSeatList?.upperdeck_seat_nos || []
  );

  const totalseats = lowerDeckSeats.concat(upperDeckSeats);
  const allprice = totalseats
    ?.map((item) => {
      return Math.round(item?.price);
    })
    .sort((a, b) => a - b);

  const [layoutloading, setLayoutLoading] = useState(false);

  const busData = useSelector((state) => state?.get_buslist_filter);
  const dispatch = useDispatch();


  const uniqueprice = [...new Set(allprice)];

  const lowerdeck = getseats?.seats_id_layout?.filter((item) => {
    return item.z === 0;
  });

  const upperdeck = getseats?.seats_id_layout?.filter((item) => {
    return item.z === 1;
  });

  const lowerdeckc = lowerdeck?.map((item) => {
    return item.y;
  });
  const upperdeckc = upperdeck?.map((item) => {
    return item.y;
  });

  const lowerdeckrow = Math.max(lowerdeck?.map((item) => item.x));
  const lowerdeckcol = lowerdeckc?.length > 0 ? Math.max(...lowerdeckc) : [];
  const upperdeckrow = Math.max(upperdeck?.map((item) => item.x));
  const upperdeckcol = upperdeckc?.length > 0 ? Math.max(...upperdeckc) : [];


  const [selectedSeats, setSelectedSeats] = useState([]);
  const [selectedseatprice, setSelectedSeatsPrice] = useState([]);
  const [totalprice, setTotalPrice] = useState(null);


  useEffect(() => {
    if (selectedseatprice.length > 0) {
      const price = selectedseatprice.reduce((a, b) => {
        return a + b;
      });
      setTotalPrice(Math.round(price));
    }
  }, [selectedseatprice]);

  const busType = JSON.parse(sessionStorage.getItem("isLuxury"));
  const [currenttab, setCurrentTab] = useState(1);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const closeModal = () => {
    setModalIsOpen(false);
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const navigation = useNavigate();

  const [selectedRoutes, setSelectedRoutes] = useState({
    dep_route: layout?.boarding_info?.[0]?.placeName,
    arri_route: layout?.dropping_info?.[0]?.placeName,
    dep_time: layout?.boarding_info?.[0]?.placeTime,
    arr_time: layout?.dropping_info?.[0]?.placeTime,
    dep_route_id: null,
    arr_route_id: null,
    dep_landmark: layout?.boarding_info?.[0]?.landMark,
    dep_pincode: '',
    arr_landmark: layout?.dropping_info?.[0]?.landMark
  });
  const [billAddress, setBillAddress] = useState({
    address: layout?.boarding_info?.[0]?.landMark,
    pincode: layout?.boarding_info?.[0]?.pincode,
    state: "",
    city: "",
  });

  const [seatDetails, setSeatDetails] = useState(
    selectedSeats.reduce((acc, seat, index) => {
      acc[index] = {
        Seat: "",
        Status: "",
        type: "",
        typeId: "",
        tax: "",
        price: "",
      };
      return acc;
    }, {})
  );
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const seatHighlight = (seat) => {
    const roundedFare = Math.round(seat?.price);
    return currentrate === roundedFare ? (
      <div className="h-[1.3vh] w-[1.6vw] rounded-full bg-[#1F487C] absolute top-[-1vw] left-1/2 transform -translate-x-1/2"></div>
    ) : null;
  };

  const LuxuryFind = (type) =>
    type?.toLowerCase()?.includes("volvo") ||
    type?.toLowerCase()?.includes("mercedes benz") ||
    type?.toLowerCase()?.includes("washroom") ||
    type?.toLowerCase()?.includes("bharatBenz") ||
    type?.toLowerCase()?.includes("luxury");

  return (
    <>
      <div
        className={`h-[11vw] fixed top-0 w-full z-[2] flex items-center justify-between px-[2vw] ${selectedSeats?.length > 0 && totalprice != null
          ? "justify-between"
          : "justify-end"
          }  px-[2vw] ${LuxuryFind(item?.Bus_Type_Name) === true
            ? "custom-gradient-luxury"
            : "bg-[#1F487C]"
          } w-full  border-l-[0.2vw] border-r-[0.2vw] border-b-[0.2vw] border-[#1F487C]  p-[2vw]`}
        style={{
          backgroundImage:
            LuxuryFind(item?.Bus_Type_Name) === true
              ? `linear-gradient(to right, #F8C550, #FFEB76, #FFE173)`
              : "",
          backgroundBlendMode: "overlay", // Add this line to blend the color and image
          //   zIndex: 2,
        }}
      >
        <div className="flex items-center gap-[3vw]">
          <label
            className={` ${LuxuryFind(item?.Bus_Type_Name) === true
              ? "text-[#393939]"
              : "text-white"
              } font-bold text-[5vw]`}
          >
            {localStorage.getItem("departure")}
          </label>
          <label>
            {" "}
            <FaArrowRight
              color={` ${LuxuryFind(item?.Bus_Type_Name) === true ? "#393939" : "white"
                }`}
              size={"5vw"}
            />
          </label>
          <label
            className={` ${LuxuryFind(item?.Bus_Type_Name) === true
              ? "text-[#393939]"
              : "text-white"
              } font-bold text-[5vw]`}
          >
            {localStorage.getItem("arrival")}
          </label>
        </div>
        <div>
          <label
            className={` ${LuxuryFind(item?.Bus_Type_Name) === true
              ? "text-[#393939]"
              : "text-white"
              } font-bold text-[4vw]`}
          >
            {`${dayjs(localStorage.getItem("selectdate")).format(
              "DD MMM, YYYY"
            )}`}
          </label>
        </div>
      </div>
      <div className="min-h-screen max-h-auto px-[2vw] pb-[18vw] pt-[10vw] bg-[#E5FFF1]">
        <SelectedCardDesign busData={item} />
        <div
          className={`h-auto relative ${LuxuryFind(item?.Bus_Type_Name) === true
            ? "custom-gradient-luxury"
            : "bg-white"
            } w-full  border-l-[0.2vw] border-r-[0.2vw] border-b-[0.2vw] border-[#1F487C] rounded-b-[3vw]  p-[2vw]`}
          style={{
            backgroundImage: `linear-gradient(to right, #F8C550, #FFEB76, #FFE173)`,
            backgroundBlendMode: "overlay", // Add this line to blend the color and image
            //   zIndex: 2,
          }}
        >
          <div
            className={`${LuxuryFind(item?.Bus_Type_Name) === true
              ? "bg-[#FFEEC9]"
              : "bg-[#EEEDED]"
              }  border-x-[0.1vw] border-b-[0.1vw] rounded-b-[2.5vw] `}
          >
            <div
              className="flex items-center w-[91.5vw] px-[2vw] py-[1vw] "
              style={{
                backgroundColor:
                  LuxuryFind(item?.Bus_Type_Name) === true
                    ? "#393939"
                    : "#1F487C",
              }}
            >
              <button
                type="button"
                className={`${currentrate === 1 ? " " : "  "
                  } h-[8vw] w-[20vw] rounded-l-[1.5vw] font-bold  border-y-[0.1vw] border-l-[0.1vw] border-r-[0.1vw]`}
                onClick={() => SetCurrentRate(1)}
                style={{
                  background:
                    LuxuryFind(item?.Bus_Type_Name) === true &&
                      currentrate === 1
                      ? "#9B9B9B"
                      : LuxuryFind(item?.Bus_Type_Name) === false &&
                        currentrate === 1
                        ? "#8EA3BD"
                        : "white",
                  borderColor:
                    LuxuryFind(item?.Bus_Type_Name) === true
                      ? "#393939"
                      : "#1F487C",
                  color:
                    currentrate === 1
                      ? "white"
                      : LuxuryFind(item?.Bus_Type_Name) === true
                        ? "#393939"
                        : LuxuryFind(item?.Bus_Type_Name) === false
                          ? "#1F487C"
                          : "white",
                }}
              >
                All
              </button>
              {uniqueprice.length > 0 &&
                uniqueprice?.map((items, index) => (
                  <button
                    type="button"
                    className={`${currentrate === Number(items) ? "" : ""
                      } h-[8vw] w-[20vw] font-bold border-y-[0.1vw] border-r-[0.1vw] ${index === uniqueprice.length - 1
                        ? "rounded-r-[1.5vw]"
                        : ""
                      }`}
                    onClick={() => SetCurrentRate(items)}
                    style={{
                      background:
                        LuxuryFind(item?.Bus_Type_Name) === true &&
                          currentrate === items
                          ? "#9B9B9B"
                          : LuxuryFind(item?.Bus_Type_Name) === false &&
                            currentrate === items
                            ? "#8EA3BD"
                            : "white",
                      borderColor:
                        LuxuryFind(item?.Bus_Type_Name) === true
                          ? "#9B9B9B"
                          : "#1F487C",
                      color:
                        currentrate === items
                          ? "white"
                          : LuxuryFind(item?.Bus_Type_Name) === true
                            ? "#393939"
                            : LuxuryFind(item?.Bus_Type_Name) === false
                              ? "#1F487C"
                              : "white",
                    }}
                  >
                    {/* {`₹ ${items}`} */}
                    {`₹ ${calculateDiscountedFare(
                      item?.BUS_START_DATE,
                      items,
                      tbs_discount
                    )}`}
                  </button>
                ))}
            </div>
            <div className="grid grid-cols-11 w-full h-[8vw] px-[2vw] mt-[2vw]">
              <div className="col-span-1  w-full flex items-center justify-center">
                <IoIosInformationCircleOutline
                  color="black"
                  size={"5.5vw"}
                  onClick={() => {
                    setModalIsOpen(true);
                  }}
                />
              </div>
              <div
                className={`col-span-5  flex items-center justify-between px-[4vw] ${currenttab === 1 ? " underline underline-offset-4" : ""
                  }`}
                onClick={() => setCurrentTab(1)}
              >
                <div>
                  <svg
                    width="4.5vw"
                    height="4.5vw"
                    viewBox="0 0 34 39"
                    fill="none"
                    className={` cursor-pointer `}
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M3.55687 11.5354V6.43945C3.55687 3.67803 5.79544 1.43945 8.55687 1.43945H23.91C26.6714 1.43945 28.9099 3.67855 28.9099 6.43998V11.5352L29.6538 11.5353C30.5498 11.5353 31.2762 12.2618 31.2762 13.1579V34.0056C31.2762 35.3498 30.1865 36.4395 28.8423 36.4395H3.28643C1.94223 36.4395 0.852539 35.3498 0.852539 34.0056V13.158C0.852539 12.2619 1.579 11.5354 2.47514 11.5354H3.55687Z"
                      fill="white"
                    />
                    <path
                      d="M3.55687 11.5354V6.43945C3.55687 3.67803 5.79544 1.43945 8.55687 1.43945H23.91C26.6714 1.43945 28.9099 3.67855 28.9099 6.43998C28.9099 9.12696 28.9099 11.5352 28.9099 11.5352M28.9099 11.5352L29.6538 11.5353C30.5498 11.5353 31.2762 12.2618 31.2762 13.1579V34.0056C31.2762 35.3498 30.1865 36.4395 28.8423 36.4395H3.28643C1.94223 36.4395 0.852539 35.3498 0.852539 34.0056V13.158C0.852539 12.2619 1.579 11.5354 2.47514 11.5354H4.6386C5.53474 11.5354 6.2612 12.2619 6.2612 13.158V29.9671C6.2612 31.3113 7.35089 32.401 8.69509 32.401H24.1098C25.454 32.401 26.5437 31.3113 26.5437 29.9671V13.1579C26.5437 12.2618 27.2701 11.5353 28.1661 11.5353L28.9099 11.5352Z"
                      stroke="black"
                    />
                  </svg>
                </div>
                <div>
                  <label className="text-[3.5vw]">Select your seats</label>
                </div>
              </div>
              <div
                className={`col-span-5  flex items-center justify-between px-[1vw] ${currenttab === 2 ? " underline underline-offset-4" : ""
                  }`}
                onClick={() => setCurrentTab(2)}
              >
                <div>
                  <svg
                    width="4.5vw"
                    height="4.5vw"
                    viewBox="0 0 16 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8.2647 10.1684C7.54532 10.1684 6.85541 9.88645 6.34673 9.38462C5.83805 8.8828 5.55228 8.20217 5.55228 7.49248C5.55228 6.78279 5.83805 6.10217 6.34673 5.60035C6.85541 5.09852 7.54532 4.8166 8.2647 4.8166C8.98408 4.8166 9.67399 5.09852 10.1827 5.60035C10.6913 6.10217 10.9771 6.78279 10.9771 7.49248C10.9771 7.84389 10.907 8.19185 10.7706 8.5165C10.6343 8.84116 10.4345 9.13614 10.1827 9.38462C9.9308 9.6331 9.63178 9.83021 9.3027 9.96468C8.97361 10.0992 8.6209 10.1684 8.2647 10.1684ZM8.2647 0C6.25044 0 4.31868 0.789384 2.89438 2.1945C1.47008 3.59961 0.669922 5.50535 0.669922 7.49248C0.669922 13.1118 8.2647 21.4071 8.2647 21.4071C8.2647 21.4071 15.8595 13.1118 15.8595 7.49248C15.8595 5.50535 15.0593 3.59961 13.635 2.1945C12.2107 0.789384 10.279 0 8.2647 0Z"
                      fill="white"
                    />
                    <path
                      d="M6.0199 9.71591C6.61632 10.3043 7.42392 10.6337 8.2647 10.6337C8.68114 10.6337 9.09365 10.5528 9.47873 10.3955C9.86383 10.2381 10.2141 10.0073 10.5095 9.71591C10.8049 9.42451 11.0395 9.07823 11.1997 8.69666C11.3599 8.31508 11.4425 7.90588 11.4425 7.49248C11.4425 6.65732 11.1061 5.85766 10.5095 5.26906C9.91308 4.68067 9.10548 4.35123 8.2647 4.35123C7.42392 4.35123 6.61632 4.68067 6.0199 5.26906C5.42326 5.85766 5.08691 6.65732 5.08691 7.49248C5.08691 8.32765 5.42326 9.12731 6.0199 9.71591ZM8.2647 20.7059C8.06105 20.4722 7.77652 20.1397 7.4374 19.7275C6.73145 18.8694 5.79097 17.6681 4.85144 16.2943C3.91099 14.9192 2.97738 13.3798 2.28033 11.8449C1.58046 10.3037 1.13529 8.80188 1.13529 7.49248C1.13529 5.63083 1.88487 3.84413 3.22121 2.52579C4.55776 1.20724 6.37184 0.465372 8.2647 0.465372C10.1576 0.465372 11.9716 1.20724 13.3082 2.52579C14.6445 3.84413 15.3941 5.63083 15.3941 7.49248C15.3941 8.80188 14.9489 10.3037 14.2491 11.8449C13.552 13.3798 12.6184 14.9192 11.678 16.2943C10.7384 17.6681 9.79795 18.8694 9.092 19.7275C8.75287 20.1397 8.46835 20.4722 8.2647 20.7059Z"
                      stroke="black"
                      stroke-opacity="0.5"
                      stroke-width="0.930743"
                    />
                  </svg>
                </div>
                <div>
                  <label className="text-[3.5vw]">Pickup & Drop Points</label>
                </div>
              </div>
            </div>
            {currenttab === 1 ? (
              <MobileSeatLayout
                layout={layout}
                setLayout={setLayout}
                item={item}
                setSelectedSeats={setSelectedSeats}
                selectedSeats={selectedSeats}
                setSelectedSeatsPrice={setSelectedSeatsPrice}
                selectedseatprice={selectedseatprice}
                setSeatDetails={setSeatDetails}
                seatDetails={seatDetails}
                seatHighlight={seatHighlight}
                currentrate={currentrate}
                SetCurrentRate={SetCurrentRate}
              />
            ) : (
              <PickandDrop
                layout={layout}
                setLayout={setLayout}
                busType={busType}
                busid={item.bus_id}
                busData={item}
                busdroping={item.dropping}
                busboarding={item.boarding}
                setSelectedRoutes={setSelectedRoutes}
                selectedRoutes={selectedRoutes}
                billAddress={billAddress}
                setBillAddress={setBillAddress}
              />
            )}
          </div>
        </div>
      </div>
      {selectedSeats?.length > 0 && (
        <footer
          className={`h-[16vw] fixed bottom-0 w-full z-[1] flex items-center ${selectedSeats?.length > 0 && totalprice != null
            ? "justify-between"
            : "justify-end"
            }  px-[2vw] ${LuxuryFind(item?.Bus_Type_Name) === true
              ? "custom-gradient-luxury"
              : "bg-[#1F487C]"
            } w-full  border-l-[0.2vw] border-r-[0.2vw] border-b-[0.2vw] border-[#1F487C]  p-[2vw]`}
          style={{
            backgroundImage:
              LuxuryFind(item?.Bus_Type_Name) === true
                ? `linear-gradient(to right, #F8C550, #FFEB76, #FFE173)`
                : "",
            backgroundBlendMode: "overlay", // Add this line to blend the color and image
            //   zIndex: 2,
          }}
        >
          <div className="flex items-center justify-between w-[65%]">
            {selectedSeats?.length > 0 && (
              <div className="flex flex-col ">
                <label
                  className={`text-[3.5vw]  
              ${LuxuryFind(item?.Bus_Type_Name) === true
                      ? "text-[#393939]"
                      : "text-white"
                    }`}
                >
                  {`${selectedSeats}`}
                </label>
                <label
                  className={`text-[3.5vw]
            ${LuxuryFind(item?.Bus_Type_Name) === true
                      ? "text-[#393939]"
                      : "text-white"
                    }`}
                >
                  Selected seats
                </label>
              </div>
            )}
            {totalprice != null && (
              <div className="flex flex-col items-center">
                <label
                  className={`text-[5vw] font-extrabold
              ${LuxuryFind(item?.Bus_Type_Name) === true
                      ? "text-[#393939]"
                      : "text-white"
                    }`}
                >
                  {/* {`₹ ${totalprice}`} */}
                  {`₹ ${calculateDiscountedFare(
                    item?.BUS_START_DATE,
                    totalprice,
                    tbs_discount
                  )}`}
                </label>
                <label
                  className={`text-[3.5vw]
            ${LuxuryFind(item?.Bus_Type_Name) === true
                      ? "text-[#393939]"
                      : "text-white"
                    }`}
                >
                  Price
                </label>
              </div>
            )}
          </div>
          <button
            className={`text-[4.5vw] font-semibold w-[30vw] h-[10vw] ${LuxuryFind(item?.Bus_Type_Name) === true
              ? "bg-[#393939] text-white"
              : "bg-white text-[#1F487C]"
              }  rounded-full w-[30%]`}
            onClick={() => {
              if (currenttab === 2 && selectedSeats?.length > 0) {
                navigation("/bookingDetails", {
                  state: {
                    selectedSeats2: selectedSeats,
                    selectedRoutes2: selectedRoutes,
                    busdetails2: item,
                    seatDetails2: seatDetails,
                    busprice2: totalprice,
                    selectedseatprice2: selectedseatprice,
                    layout2: layout,
                    busdatas: busdatas
                  },
                });
                sessionStorage.removeItem("ticket_view")
              } else {
                setCurrentTab(2);
              }
            }}
          >
            Continue
          </button>
        </footer>
      )}
      <ModalPopup
        show={modalIsOpen}
        onClose={closeModal}
        height="60vw"
        width="90%"
      >
        <KnowYourSeat />
      </ModalPopup>
    </>
  );
}
