import { Drawer, Tooltip } from "antd";
import { useRef } from "react";
import arrow from "../../../src/assets/arrow.png";
import cut from "../../../src/assets/Cut.png";
import moment from "moment";
import { FaAngleRight } from "react-icons/fa6";
import QRCode from "react-qr-code";
import { capitalizeFirstLetter } from "../Common/Captalization";
import { savePDF } from "@progress/kendo-react-pdf";
import BottomNavbar from "./BottomNavbar";
import dayjs from "dayjs";

function convertTo12Hour(timeString) {
  if (!timeString) {
    return "";
  }

  const [hours, minutes] = timeString.split(":");
  let hour = parseInt(hours);
  const ampm = hour >= 12 ? "PM" : "AM";

  hour = hour % 12 || 12;
  return `${hour}:${minutes}`;
}

const MobileTicketView = ({ showModal, setShowModal, ticketDetails }) => {
  const colorcode = {
    theme: "#1F487C",
  };

  const onClose = () => {
    setShowModal(false);
  };

  function generateRandomId(prefix) {
    return prefix + ticketDetails?.Booking_Id;
  }
  console.log(ticketDetails, setShowModal, "upwkjfdszkfdskjf");

  const componentRef = useRef();

  const generatePDF = () => {
    if (componentRef.current) {
      savePDF(componentRef.current, {
        paperSize: "A4", // Paper size
        margin: 1, // Margin in mm
        fileName: "MyTicket.pdf", // File name for the downloaded PDF
      });
    }
  };

  const departureTime =
    ticketDetails?.departure_time &&
    convertTo12Hour(ticketDetails?.departure_time);
  const arrivalTime =
    ticketDetails?.arrival_time && convertTo12Hour(ticketDetails?.arrival_time);

  return (
    <>
    <div className="p-[4vw] mb-[15vw]">
      {/* <Drawer
        // title="Basic Drawer"
        placement={"bottom"}
        closable={false}
        onClose={onClose}
        open={showModal}
        key={"bottom"}
        width={"100%"}
        height={"80%"}
      > */}
      <div className="my-[4vw]">
        {/* {ticketDetails.map((item)=>( */}
        <div
          ref={componentRef}
          id="capture"
          className={`h-auto w-full border-solid border-2 border-[#1F487C] rounded-t-[3.5vw]`}
        >
          <div
            className={`h-[40vw] w-full rounded-t-[3vw]`}
            style={{ backgroundColor: colorcode.theme }}
          >
            <div
              className={` flex justify-center items-center gap-[4vw] px-[4vw]`}
            >
              <div className={`pt-[2vw]`}>
                <label className={`text-white uppercase text-[5vw] font-bold`}>
                  {/* {ticketDetails?.departure_name?.slice(0, 3)}
                   */}
                  {/* {ticketDetails?.departure_name} */}
                  {/* Mahabalipuram */}
                  {ticketDetails?.departure_name?.length > 11 ? (
                    <Tooltip
                      title={ticketDetails?.departure_name}
                      placement="top"
                    >
                      {ticketDetails?.departure_name?.slice(0, 11)}..
                    </Tooltip>
                  ) : (
                    <span>{ticketDetails?.departure_name}</span>
                  )}
                </label>

                <p
                  className={`text-[4vw] text-white text-center font-semibold`}
                >
                   {dayjs(ticketDetails?.departure_date).format("DD MMM YYYY")}
                </p>
              </div>
              <div>
                <img src={arrow} alt="arrow" className="w-[15vw] h-[4vw]" />
              </div>
              <div className={`pt-[2vw]`}>
                <label className={`text-white uppercase text-[5vw] font-bold`}>
                  {/* {ticketDetails?.arrival_name?.slice(0, 3)} */}
                  {/* {ticketDetails?.arrival_name} */}
                  {ticketDetails?.arrival_name?.length > 11 ? (
                    <Tooltip
                      title={ticketDetails?.arrival_name}
                      placement="top"
                    >
                      {ticketDetails?.arrival_name?.slice(0, 11)}..
                    </Tooltip>
                  ) : (
                    <span>{ticketDetails?.arrival_name}</span>
                  )}
                </label>
                <p
                  className={`text-[4vw] text-center text-white font-semibold`}
                >
                  {dayjs(ticketDetails?.arrival_date).format("DD MMM YYYY")}
                </p>
              </div>
            </div>
            {/* <div className={`flex items-center`}> */}
            <p
              className={`flex pt-[3vw] justify-center font-thin items-center text-white text-[4.5vw]`}
            >
              {`Ticket Number : ${ticketDetails?.Booking_Id}`}
            </p>
            <p
              className={`flex pt-[2vw] justify-center font-thin items-center text-white text-[4.5vw]`}
            >
              {`PNR : ${generateRandomId("CHEN", 12)}`}
            </p>
            {/* </div> */}
          </div>
          <div className={`pl-[7vw] py-[3.5vw]`}>
            <div className={`grid grid-cols-3 w-full`}>
              <p className={`text-[4.5vw]`}>Name</p>
              <p className={`text-[4.5vw]`}>Age/ Gender</p>
              <p className={`text-[4.5vw] px-[8vw]`}>Seat</p>
            </div>
            {ticketDetails?.passenger?.length > 0
              ? ticketDetails?.passenger?.map((v) => (
                  <div className={`grid grid-cols-3 w-full pt-[2vw]`}>
                    <p className={`text-[4vw] font-semibold`}>
                      {capitalizeFirstLetter(v?.user_name)}
                    </p>
                    <p className={`text-[4vw] font-semibold px-[6vw]`}>
                      {v?.age}/ {capitalizeFirstLetter(v?.gender[0])}
                    </p>
                    <p className={`text-[4vw] font-semibold px-[9vw]`}>
                      {v?.seat}
                    </p>
                  </div>
                ))
              : ""}
          </div>
          <div
            className={`border-dashed border-[0.4vw] border-[#1F487C] mt-[2vw] relative`}
          >
            <span className={`absolute left-[-1vw] top-[-5vw] z-[3]`}>
              <div
                className={`bg-[white] border border-l-white border-r-[1vw] border-[#1F487C] w-[5vw] h-[10vw] rounded-r-full `}
              ></div>
            </span>
            <span className="absolute right-[-1vw] top-[-5.5vw] z-[1]">
              <div
                className={`bg-[white] border border-r-white border-l-[1vw] border-[#1F487C] w-[5vw] h-[10vw] rounded-l-full `}
              ></div>
            </span>
          </div>
          <div
            className={`h-auto flex flex-row justify-center text-center w-full px-[1vw] pt-[2vw]`}
          >
            {ticketDetails?.logos != null && (
              <img
                src={`http://192.168.90.47:4001${ticketDetails.logos}`}
                alt="logos"
                className={`w-[10vw] h-[10vw] rounded-full bg-white shadow-lg shadow-[rgba(238, 237, 237, 0.7)]`}
              />
            )}
            <label className={`text-[4.5vw] font-bold pt-[1.5vw] pl-[2vw]`}>
              {ticketDetails?.operator_name}
            </label>
          </div>
          <div className={`grid grid-cols-7 px-[2vw] pt-[4vw] pb-[8vw]`}>
            <div className="col-span-2 ">
              <div className={`flex flex-col pl-[1vw] gap-y-[1vw] text-left`}>
                <p className={`text-[3.7vw] text-[#1F487C] pt-[0.5vw]`}>
                  {moment(ticketDetails?.departure_date).format("DD MMM")}
                </p>
                <p className={`font-bold text-[4vw]`}>{ticketDetails?.departure_time}</p>
                <p className="text-[3.8vw] ">
                  {" "}
                  {ticketDetails?.Pickup_Point_and_Time}
                </p>
              </div>
            </div>
            <div
              className={`col-span-3 flex-col items-center w-full justify-center`}
            >
              <div
                className={`col-span-2 h-full relative w-full flex  justify-center`}
              >
                <div className="absolute md:left-0 top-[2vw] w-[33vw] md:w-[18.5vw]">
                                            <svg
                                             className="w-[36vw] md:w-[19vw] h-[15vw] md:h-[2vw]"
                                              viewBox="0 0 300 28"
                                              fill="none"
                                              xmlns="http://www.w3.org/2000/svg"
                                            >
                                              <line
                                                x1="172.258"
                                                y1="13.6426"
                                                x2="279.058"
                                                y2="13.6426"
                                                stroke={ticketDetails.bus_type_status === "luxury" ? "#393939" : "#1F4B7F"}
                                                stroke-width="2.71095"
                                                stroke-dasharray="5.42 5.42"
                                              />
                                              <line
                                                x1="10.2483"
                                                y1="13.6426"
                                                x2="111.618"
                                                y2="13.6426"
                                                stroke={ticketDetails.bus_type_status === "luxury" ? "#393939" : "#1F4B7F"}
                                                stroke-width="2.71095"
                                                stroke-dasharray="5.42 5.42"
                                              />
                                              <ellipse
                                                cx="6.12043"
                                                cy="13.8221"
                                                rx="5.82925"
                                                ry="5.42191"
                                                fill={ticketDetails.bus_type_status === "luxury" ? "#393939" : "#1F4B7F"}
                                              />
                                              <path
                                                fill-rule="evenodd"
                                                clip-rule="evenodd"
                                                d="M280.078 6.24612C280.553 5.805 281.321 5.805 281.796 6.24612L289.082 13.0235C289.557 13.4646 289.557 14.1798 289.082 14.621L281.796 21.3983C281.321 21.8395 280.553 21.8395 280.078 21.3983C279.604 20.9572 279.604 20.242 280.078 19.8009L286.506 13.8222L280.078 7.84357C279.604 7.40245 279.604 6.68725 280.078 6.24612Z"
                                                fill={ticketDetails.bus_type_status === "luxury" ? "#393939" : "#1F4B7F"}
                                                stroke={ticketDetails.bus_type_status === "luxury" ? "#393939" : "#1F4B7F"}
                                                stroke-width="0.271095"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                              />
                                            </svg>
                                          </div>
                                          <div
                                            style={{
                                              zIndex: 2,
                                            }}
                                            className="relative md:h-[2.1vw] h-[8vw] w-[20vw] flex md:w-[5.5vw]
                                            text-white text-[3.5vw]  font-bold justify-center items-center top-[5.5vw] left-[1vw]"
                                          >
                                            <svg
                                                    className="w-[30vw] md:w-[40vw] h-[10vw] md:h-[10vw]"
                                                     viewBox="0 0 106 54"
                                                     fill="none"
                                                    xmlns="http://www.w3.org/2000/svg">
                                                 <path
                                                 d="M9.62178 0.374512C4.61028 0.374512 0.592041 4.3313 0.592041 9.26618V35.1452C0.592041 38.0402 2.93887 40.387 5.83382 40.387H11.5805C11.5805 43.9243 13.0076 47.3168 15.5477 49.818C18.0878 52.3193 21.5329 53.7245 25.1251 53.7245C28.7174 53.7245 32.1625 52.3193 34.7026 49.818C37.2427 47.3168 38.6698 43.9243 38.6698 40.387H69.6765C69.6765 43.9243 71.1035 47.3168 73.6436 49.818C76.1837 52.3193 79.6288 53.7245 83.2211 53.7245C86.8133 53.7245 90.2585 52.3193 92.7986 49.818C95.3387 47.3168 96.7657 43.9243 96.7657 40.387H100.554C103.449 40.387 105.795 38.0402 105.795 35.1452V9.26618C105.795 4.3313 101.777 0.374512 96.7657 0.374512H9.62178ZM25.1251 33.7182C26.9213 33.7182 28.6438 34.4208 29.9139 35.6715C31.1839 36.9221 31.8975 38.6183 31.8975 40.387C31.8975 42.1557 31.1839 43.8519 29.9139 45.1025C28.6438 46.3531 26.9213 47.0557 25.1251 47.0557C23.329 47.0557 21.6065 46.3531 20.3364 45.1025C19.0663 43.8519 18.3528 42.1557 18.3528 40.387C18.3528 38.6183 19.0663 36.9221 20.3364 35.6715C21.6065 34.4208 23.329 33.7182 25.1251 33.7182ZM83.2211 33.7182C85.0172 33.7182 86.7398 34.4208 88.0098 35.6715C89.2799 36.9221 89.9934 38.6183 89.9934 40.387C89.9934 42.1557 89.2799 43.8519 88.0098 45.1025C86.7398 46.3531 85.0172 47.0557 83.2211 47.0557C81.425 47.0557 79.7024 46.3531 78.4324 45.1025C77.1623 43.8519 76.4488 42.1557 76.4488 40.387C76.4488 38.6183 77.1623 36.9221 78.4324 35.6715C79.7024 34.4208 81.425 33.7182 83.2211 33.7182Z"
                                                fill={ticketDetails.bus_type_status === "luxury" ? "#393939" : "#1F4B7F"} />
                                            </svg>
                                            <div className="absolute pb-[3vw]">
                                              {ticketDetails?.duration}
                                            </div>
                                          </div>
              </div>
            </div>
            <div className={`col-span-2`}>
              <div className={`flex flex-col gap-y-[1vw] text-right pr-[1vw]`}>
                <p className={`text-[3.7vw] text-[#1F487C] pt-[0.5vw]`}>
                  {moment(ticketDetails?.arrival_date).format("DD MMM")}
                </p>
                <p className={`font-bold text-[4vw]`}>{ticketDetails?.arrival_time}</p>
                {/* <p className="text-[3.8vw] max-w-[2vw]"> {ticketDetails?.Pickup_Point_and_Time}</p> */}
                <p className="text-[3.8vw] ">
                  {ticketDetails?.Dropping_Point} ({ticketDetails?.Droppimg_Time})
                </p>
              </div>
            </div>
          </div>

          <div
            className={`border-dashed border-[0.4vw] border-[#1F487C] mt-[2vw] relative`}
          >
            <span className={`absolute left-[-1vw] top-[-5vw] z-[3]`}>
              <div
                className={`bg-[white] border border-l-white border-r-[.8vw] border-[#1F487C] w-[5vw] h-[10vw] rounded-r-full `}
              ></div>
            </span>
            <span className={`absolute right-[-1vw] top-[-5.5vw] z-[1]`}>
              <div
                className={`bg-[white] border border-r-white border-l-[.8vw] border-[#1F487C] w-[5vw] h-[10vw] rounded-l-full `}
              ></div>
            </span>
          </div>
          <div
            className={`flex flex-col items-center justify-center pl-[.8vw] pr-[2vw] py-[5vw]`}
          >
            <p className={`flex text-[4vw]`}>
              Scan this QR code to get on the bus
            </p>
            <QRCode
              size={256}
              className={`flex pt-[2vw] w-[70vw] h-[30vw]`}
              value={generateRandomId("AXER", 12)}
              viewBox={`0 0 256 256`}
            />
          </div>
        </div>
        <div
          className={`flex flex-col relative bg-[#1F487C] items-center justify-center rounded-b-[3vw] border-dashed 
              border-t-[1vw] border-white h-[16vw] pl-[.8vw] pr-[2vw] mt-[1vw] py-[3vw]`}
          style={{
            transform: "rotate(2deg)",
          }}
          onClick={generatePDF}
        >
          <p className={`flex text-white text-[4vw] font-semibold`}>
            DOWNLOAD TICKET
          </p>
          <img
            className={`absolute top-[-3vw] left-[15vw]`}
            src={cut}
            alt="cut"
          />
        </div>
        {/* ))} */}
      </div>
      {/* </Drawer> */}
     
    </div>
    <BottomNavbar />
    </>
  );
};
export default MobileTicketView;
