import { Drawer, theme } from "antd";
import { useRef, useState } from "react";
import Barcode from "react-barcode";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaBus } from "react-icons/fa6";
import { FiDownload } from "react-icons/fi";
import operatorlogo from "../../../../assets/Operator_logos/161.png";
import bus_comp from "../../../../assets/bus_comp.png";
import moment from "moment";
import ticketview from "../../../../assets/ticket_view.png";
import buslocation from "../../../../assets/buslocation.png";
import busicon from "../../../../assets/busicon.png";
import dayjs from "dayjs";
// import jsPDF from "jspdf";
import html2canvas from "html2canvas";
// import { toPng } from 'html-to-image';
import jsPDF from "jspdf";
import { savePDF } from "@progress/kendo-react-pdf";

const TicketView = ({ showModal, setShowModal, ticketDetails }) => {
  const colorcode = {
    theme: "#1F487C",
  };

  const onClose = () => {
    setShowModal(false);
  };

  function generateRandomId(prefix, length) {
    // const randomNumbers = Math.random().toString().substr(2, length);
    // return prefix + randomNumbers;
    return prefix + ticketDetails?.Booking_Id;
  }
  const seatplatform = "tbstravells";
  console.log(ticketDetails, "upwkjfdszkfdskjf");
  // const [UpcomingDetailss] = ticketdetails

  const componentRef = useRef();

  const generatePDF = () => {
    // html2canvas(componentRef.current, {
    //   scrollX: 0,
    //   scrollY: -window.scrollY,
    // }).then((canvas) => {
    //   const imgData = canvas.toDataURL("image/png");
    //   const pdf = new jsPDF("p", "mm", "a4");
    //   const imgWidth = pdf.internal.pageSize.getWidth();
    //   const imgHeight = (canvas.height * imgWidth) / canvas.width;
    //   pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
    //   // pdf.save(`${registerfulldetails.name}.pdf`);
    //   pdf.save(`MyTicker.pdf`);
    // });

    if (componentRef.current) {
      savePDF(componentRef.current, {
        paperSize: "A4", // Paper size
        margin: 1, // Margin in mm
        fileName: "MyTicket.pdf", // File name for the downloaded PDF
      });
    }
  };

  // const generatePDF = () => {
  //   toPng(componentRef.current)
  //     .then((dataUrl) => {
  //       const pdf = new jsPDF('p', 'mm', 'a4');
  //       const img = new Image();
  //       img.src = dataUrl;

  //       img.onload = () => {
  //         // Define the dimensions of the PDF page
  //         const pdfWidth = pdf.internal.pageSize.getWidth();
  //         const pdfHeight = pdf.internal.pageSize.getHeight();

  //         // Calculate the image dimensions to fit within the PDF page
  //         const imgWidth = img.width;
  //         const imgHeight = img.height;

  //         const scaleFactor = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
  //         const scaledWidth = imgWidth * scaleFactor;
  //         const scaledHeight = imgHeight * scaleFactor;

  //         // Center the image on the PDF page
  //         const xOffset = (pdfWidth - scaledWidth) / 2;
  //         const yOffset = (pdfHeight - scaledHeight) / 2;

  //         // Add the image to the PDF
  //         pdf.addImage(img, 'PNG', xOffset, yOffset, scaledWidth, scaledHeight);

  //         // Save the PDF
  //         pdf.save(`${ticketDetails.departure_name}.pdf`);
  //       };
  //     })
  //     .catch((error) => {
  //       console.error('Error generating image:', error);
  //     });
  // };

  // const generatePDF = () => {
  //   // Convert HTML element to PNG image
  //   toPng(componentRef.current)
  //     .then((dataUrl) => {
  //       // Create a new jsPDF instance
  //       const pdf = new jsPDF('p', 'mm', 'a4');

  //       // Create an image element and set its source to the data URL
  //       const img = new Image();
  //       img.src = dataUrl;

  //       // Wait for the image to load
  //       img.onload = () => {
  //         // Define the dimensions of the PDF page
  //         const imgWidth = pdf.internal.pageSize.getWidth();
  //         const imgHeight = (img.height * imgWidth) / img.width;

  //         // Add the image to the PDF
  //         pdf.addImage(img, 'PNG', 0, 0, imgWidth, imgHeight);

  //         // Save the PDF
  //         pdf.save(`${ticketDetails.departure_name}.pdf`);
  //       };
  //     })
  //     .catch((error) => {
  //       console.error('Error generating image:', error);
  //     });
  // };

  return (
    <div>
      <Drawer
        // title="Basic Drawer"
        placement={"right"}
        closable={false}
        onClose={onClose}
        open={showModal}
        key={"right"}
        width={"60%"}
      >
        <div ref={componentRef} id="capture">
          {/* {ticketDetails.map((item)=>( */}
          <div
            className="h-auto w-full rounded-[1vw]"
            style={{ boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)" }}
          >
            <div
              className="h-[3vw] w-full rounded-t-[0.5vw] flex justify-between items-center px-[1vw]"
              style={{ backgroundColor: colorcode.theme }}
            >
              <label className="text-white text-[1.1vw] font-semibold">
                {/* {`Booking Id : ${bookingId?.Booking_Id}`} */}
                {`Booking Id : ${ticketDetails?.Booking_Id}`}
              </label>
              <label className="text-white text-[1.1vw] font-semibold">
                {`Bus Partner Id : ${generateRandomId("CHEN", 12)}`}
              </label>
            </div>
            <div className="px-[1vw] py-[1vw]">
              <div className="grid grid-cols-6 w-full h-[18vw]">
                <div className="col-span-2 w-[100%] h-full flex">
                  <div className="w-[80%] h-full items-center justify-center flex flex-col">
                    <div className="h-[60%] flex justify-center items-center">
                      {" "}
                      <img
                        src={operatorlogo}
                        className="w-[5vw] h-[5vw] rounded-full"
                      />
                    </div>
                    <div className="flex flex-col h-[40%] items-center ">
                      <p
                        className="text-[1vw] font-bold"
                        style={{ color: colorcode.theme }}
                      >
                        {seatplatform}
                      </p>
                      <p
                        className="text-[#1F487C]  text-[1vw] "
                        // style={{ color: colorcode.theme }}
                      >
                        {/* {busdetails?.bus_type} */}
                        {ticketDetails?.Bus_Type}
                      </p>
                    </div>
                  </div>
                  <div className=" h-full  py-[1vw] flex justify-center w-full ">
                    {/* <img src={bus_complete} className="h-full w-full " /> */}
                    <div
                      className="border-dashed border-r-[0.1vw] h-[90%] relative "
                      // style={{borderColor:colorcode.theme}}
                    >
                      {/* <FaBus
                        className=" absolute top-[-0.5vw] left-[-0.7vw]"
                        style={{ color: colorcode.theme }}
                        size={"1.5vw"}
                      /> */}
                      <div className="absolute h-[1vw] w-[2vw] left-[-1vw] top-[-1vw]">
                        <img
                          src={busicon}
                          alt="bus logo"
                          className=""
                        />
                      </div>
                      {/* <h1 className="absolute top-[-.5vw] left-[-0.7vw]">hai</h1> */}
                      <div className=" absolute top-[6vw] left-[-0.5vw]">
                        <div
                          className="h-[1vw] w-[1vw] border-[0.1vw]  bg-white rounded-full"
                          style={{ borderColor: colorcode.theme }}
                        ></div>
                      </div>{" "}
                      {/* <FaMapMarkerAlt
                        size={"1.5vw"}
                        style={{ color: colorcode.theme }}
                        className="absolute left-[-0.7vw] bottom-[-1.2vw]"
                      /> */}
                        <div className="absolute h-[1vw] w-[2vw] left-[-1vw] bottom-[-1vw]">
                        <img
                          src={buslocation}
                          alt="bus logo"
                          className=""
                        />
                        </div>
                    </div>
                  </div>
                </div>
                <div className="col-span-4">
                  <div className="grid grid-rows-7 w-full h-full">
                    <div className="row-span-3">
                      <div className="grid grid-cols-4">
                        <div className="col-span-1 ">
                          <div className="flex flex-col pl-[1vw] text-left">
                            <p
                              className="text-[0.8vw] text-[#1F487C] pt-[0.5vw]"
                              // style={{ color: colorcode.theme }}
                            >
                              {/* {dayjs(bus[busIndex]?.Bus_depature_date).format(
                                "DD MMM"
                              )} */}
                              {moment(ticketDetails?.departure_date).format(
                                "DD MMM"
                              )}
                              {/* {dayjs(
                                      busdetails?.departure_date_time
                                    ).format("DD MMM")} */}
                            </p>
                            <p
                              className="font-bold text-[#1F487C] text-[1.2vw]"
                              // style={{ color: colorcode.theme }}
                            >
                              {/* {item.bus_depature} */}
                              {/* {bus[busIndex]?.Bus_Depature_time} */}

                              {ticketDetails?.departure_time}
                            </p>
                            <p
                              className="text-[#1F487C] text-[0.9vw] "
                              // style={{ color: colorcode.theme }}
                            >
                              {/* {bus[busIndex]?.Bus_Depature_place} */}
                              {/* {busdetails?.source_name} */}
                              {ticketDetails?.departure_name}
                            </p>
                          </div>
                        </div>
                        <div className="col-span-2 flex-col mt-[0.5vw] items-center w-full justify-center">
                          <img src={bus_comp} className="h-[3.5vw] w-[22vw] " />
                          <p
                            className="text-center text-[#1F487C] text-[1.1vw] font-bold"
                            // style={{ color: colorcode.theme }}
                          >
                            {/* {item.bus_travel_time} */}
                            {/* {bus[busIndex]?.Bus_travel_time} */}
                            {/* {busdetails?.time_duration} */}
                            {ticketDetails?.duration}
                          </p>
                        </div>
                        <div className="col-span-1">
                          <div className="flex flex-col text-right pr-[1vw]">
                            <p
                              className="text-[0.8vw] text-[#1F487C] pt-[0.5vw]"
                              // style={{ color: colorcode.theme }}
                            >
                              {/* {dayjs(bus[busIndex]?.Bus_arrival_date).format(
                                "DD MMM"
                              )} */}
                              {/* {dayjs(
                                      busdetails?.arrival_date_time
                                    ).format("DD MMM")} */}
                              {moment(ticketDetails?.arrival_date).format(
                                "DD MMM"
                              )}
                            </p>
                            <p
                              className="font-bold text-[#1F487C] text-[1.2vw] "
                              // style={{ color: colorcode.theme }}
                            >
                              {/* {item.bus_arr} */}
                              {/* {bus[busIndex]?.Bus_Arrival_time} */}
                              {/* {dayjs(
                                      busdetails?.arrival_date_time
                                    ).format("HH:mm A")} */}
                              {ticketDetails?.arrival_time}
                            </p>
                            <p
                              className="text-[#1F487C] text-[0.9vw]"
                              // style={{ color: colorcode.theme }}
                            >
                              {/* {bus[busIndex]?.Bus_Arrival_place} */}
                              {/* {busdetails?.destination_name} */}
                              {ticketDetails?.arrival_name}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row-span-2 flex justify-between px-[1vw] ">
                      <div className="flex flex-col  ">
                        <p className="text-[1vw] ">Boarding Point & Time</p>
                        <p
                          className="text-[#1F487C] font-bold text-[1.2vw]"
                          // style={{ color: colorcode.theme }}
                        >
                          {/* {`${selectedRoutes?.dep_route} : ${dayjs(
                                  selectedRoutes?.dep_time
                                ).format("DD MMM, HH:mm")}`} */}
                          {/* {`${selectedRoutes?.dep_route} : ${dayjs(
                                  selectedRoutes?.dep_time
                                ).format("HH:mm")}`} */}
                          {`${ticketDetails?.Pickup_Point_and_Time} : ${ticketDetails?.departure_time} `}
                        </p>
                      </div>
                      <div className="flex flex-col  items-center">
                        <p className="text-[1vw] ">Seat Number(s)</p>
                        <p
                          className=" text-[1.1vw] text-[#1F487C] font-bold"
                          // style={{ color: colorcode.theme }}
                        >
                          {/* {selectedSeats} */}
                          {ticketDetails?.passenger?.length > 0
                            ? ticketDetails?.passenger?.map((v) => (
                                <span>{v.seat} ,</span>
                              ))
                            : ""}
                        </p>
                      </div>
                    </div>
                    <div className="row-span-2 flex px-[1vw] justify-between ">
                      <div className="flex flex-col  ">
                        <p className="text-[1vw] ">Dropping Point & Time</p>
                        <p
                          className="text-[#1F487C] text-[1.1vw] font-bold"
                          // style={{ color: colorcode.theme }}
                        >
                          {/* {`${selectedRoutes?.arri_route} : ${dayjs(
                                  selectedRoutes?.arr_time
                                ).format("HH:mm")}`} */}
                          {`${ticketDetails?.Dropping_Point_Time} : ${ticketDetails?.arrival_time} `}
                        </p>
                      </div>
                      <div className="relative">
                        <img src={ticketview} className="w-[9vw] h-[3.5vw]" />
                        <p className="text-[1.5vw] font-bold text-white absolute left-[2.8vw] top-[0.8vw]">
                          {/* {`₹ ${
                                  Number(discount) +
                                  Number(Math.round(discount * 0.03))
                                }`} */}
                          {ticketDetails?.price}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="h-auto w-full px-[1vw] pt-[1vw]">
              {/* <p className="text-[1.4vw] font-bold">Traveller Details:</p>
                    <div className="flex justify-between text-[1.2vw] font-bold pt-[1.5vw]">
                      <div className="flex-1">Name</div>
                      <div className="flex-1">Age</div>
                      <div className="flex-1">Gender</div>
                    </div>
                    {Object.keys(travelerDetails).map((key) => (
                      <div
                        key={key}
                        className="flex justify-between text-[1.2vw] pt-[1vw]"
                      >
                        <div className="flex-1">
                          {capitalizeFirstLetter(
                            travelerDetails[key].user_name
                          )}
                        </div>
                        <div className="flex-1">{travelerDetails[key].age}</div>
                        <div className="flex-1">
                          {capitalizeFirstLetter(travelerDetails[key].gender)}
                        </div>
                      </div>
                    ))} */}

              {/* <div className="pt-[1.5vw]">
                      <p className="text-[1.4vw] font-bold">
                        Contact Details :{" "}
                      </p>
                      <div class="flex text-[1.2vw] font-medium pt-[1vw]">
                        <div class="flex w-14 pt-[0.3vw]">
                          <FaPhoneFlip color="#1F487C" />
                        </div>
                        <div class="flex w-64">{bookingId?.email_id}</div>
                      </div>
                      <div class="flex text-[1.2vw] font-medium pt-[1vw]">
                        <div class="flex w-14 pt-[0.3vw]">
                          <MdEmail
                            style={{
                              height: "1.5vw",
                              width: "1.5vw",
                              color: "#1F487C",
                            }}
                          />
                        </div>
                        <div class="flex w-64">{bookingId?.mobile_number}</div>
                      </div>
                    </div> */}
              <div className="grid grid-row-3 w-full h-full gap-[1vw]">
                <div class="border-dashed border-2 border-[#1F487C]"></div>
                <div className="row-span-1 py-[1vw]">
                  {/* {Object.keys(travelerDetails).map((key) => ( */}
                  {ticketDetails?.passenger?.length > 0
                    ? ticketDetails?.passenger?.map((v) => (
                        <div className="grid grid-cols-5 gap-[1.5vw] pt-[1vw]">
                          <div className="col-span-1 pt-[1vw]">
                            <p
                              className="text-[1.1vw] font-semibold"
                              // style={{ color: colorcode.theme }}
                            >
                              Traveller Name
                            </p>
                          </div>
                          <div className="col-span-2">
                            <div
                              className="border-r-[0.5vw] border-[0.1vw] text-[1.2vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none px-[1vw] relative"
                              style={{
                                //background: `linear-gradient(to right,${colorcode.gradient} , #FFFFFF)`,
                                borderColor: colorcode.theme,
                                color: colorcode.theme,
                              }}
                            >
                              <p className="absolute left-[1vw] top-[0.6vw] text-[1.1vw] font-semibold">
                                {/* {travelerDetails[key].user_name} */}
                                {v.user_name}
                              </p>
                            </div>
                          </div>
                          <div className="col-span-2">
                            <div className="grid grid-cols-3">
                              <div className="col-span-1">
                                <div
                                  className="border-r-[0.5vw] bg-gradient-to-r border-[0.1vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none px-[1vw] relative"
                                  style={{
                                    //background: `linear-gradient(to right,${colorcode.gradient} , #FFFFFF)`,
                                    borderColor: colorcode.theme,
                                    color: colorcode.theme,
                                  }}
                                >
                                  <p className="absolute left-[2.5vw] top-[0.6vw] text-[1.1vw]  font-semibold ">
                                    {/* {travelerDetails[key].age} */}
                                    {v.age}
                                  </p>
                                </div>
                              </div>
                              <div className="col-span-2 gap-[1vw] w-full h-full pl-[1.5vw]">
                                <button
                                  type="button"
                                  style={{
                                    ...(v?.gender === "male"
                                      ? {
                                          backgroundColor: colorcode.theme,
                                        }
                                      : {
                                          //background: `linear-gradient(to right,${colorcode.gradient} , #FFFFFF)`,
                                          color: colorcode.theme,
                                          borderColor: colorcode.theme,
                                        }),
                                  }}
                                  className={`${
                                    v.gender === "male" ? " text-white" : ""
                                  } h-[3vw] w-[50%] rounded-l-[0.5vw] border-[0.1vw] border-[#1F487C] `}
                                  // onClick={() =>
                                  //   setUserDetails({
                                  //     ...userdetails,
                                  //     sex: "male",
                                  //   })
                                  // }
                                >
                                  Male
                                </button>
                                <button
                                  type="button"
                                  style={{
                                    ...(v.gender === "female"
                                      ? {
                                          backgroundColor: colorcode.theme,
                                        }
                                      : {
                                          //background: `linear-gradient(to right,${colorcode.gradient} , #FFFFFF)`,
                                          color: colorcode.theme,
                                          borderColor: colorcode.theme,
                                        }),
                                  }}
                                  className={`
                                ${v?.gender === "female" ? " text-white" : ""}
                               h-[3vw] w-[50%] rounded-r-[0.5vw] border-[0.1vw] border-[#1F487C]`}
                                  // onClick={() =>
                                  //   setUserDetails({
                                  //     ...userdetails,
                                  //     sex: "female",
                                  //   })
                                  // }
                                >
                                  Female
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    : ""}
                  {/* ))}  */}
                </div>
                <div className="row-span-1 py-[1vw]">
                  <div className="grid grid-cols-5 gap-[1.5vw]">
                    <div className="col-span-1 ">
                      <p
                        className="text-[1.1vw] font-semibold"
                        // style={{ color: colorcode.theme }}
                      >
                        Contact Details
                      </p>
                    </div>
                    <div className="col-span-2">
                      <div
                        className="border-r-[0.5vw]  border-[0.1vw]  text-[1.2vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none px-[1vw] relative"
                        style={{
                          //background: `linear-gradient(to right,${colorcode.gradient} , #FFFFFF)`,
                          borderColor: colorcode.theme,
                          color: colorcode.theme,
                        }}
                      >
                        <p className="absolute left-[1vw] top-[0.6vw] text-[1.1vw]  font-semibold ">
                          {/* {registerfulldetails.email} */}
                          {ticketDetails?.email_id}
                        </p>
                      </div>
                    </div>
                    <div className="col-span-2 flex relative">
                      <div
                        className="border-r-[0.1vw] border-py-[0.5vw] border-[0.1vw] text-[1.1vw] h-[3vw] w-[25%] rounded-l-[0.5vw] outline-none px-[1vw] relative"
                        style={{
                          //background: `linear-gradient(to right,${colorcode.gradient} , #FFFFFF)`,
                          borderColor: colorcode.theme,
                          color: colorcode.theme,
                        }}
                      >
                        <p
                          className="absolute left-[1.5vw] top-[0.6vw] text-[1.1vw]  font-semibold "
                          style={
                            {
                              // color: colorcode.theme,
                              //   borderColor: colorcode.theme,
                            }
                          }
                        >
                          +91
                        </p>
                      </div>
                      <div
                        className="border-r-[0.5vw] border-[0.1vw]  text-[1.2vw] h-[3vw] w-[75%] rounded-r-[0.5vw] outline-none px-[1vw] relative"
                        style={{
                          //background: `linear-gradient(to right,${colorcode.gradient} , #FFFFFF)`,
                          borderColor: colorcode.theme,
                          color: colorcode.theme,
                        }}
                      >
                        <p className="absolute left-[1vw] top-[0.6vw] text-[1.1vw]  font-semibold">
                          {/* {registerfulldetails.mobile} */}
                          {ticketDetails?.mobile_number}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="border-dashed border-2 border-[#1F487C]"></div>
              </div>
            </div>
            <div className="flex items-center justify-between pl-[1vw] pr-[2vw] pt-[1vw]">
              <div>
                <Barcode
                  className="w-[45vw] h-[13vw]"
                  value={generateRandomId("AXER", 12)}
                  // width={3}
                  // height={70}
                  // lineColor={colorcode.theme}
                />
              </div>
              {/* <img
                    className="h-[6vw] w-[6vw] cursor-pointer"
                    src={require("../../assets/download.png")}
                    onClick={generatePDF}
                  /> */}
              {/* <div className="cursor-pointer pr-[2vw] pb-[2vw]">
                    <div className="border-[.6vw] absolute h-[6vw] w-[6vw] rounded-[50%] border-fuchsia-600"></div>
                    <div className="bg-red-600 relative h-[5vw] w-[5vw] left-[.5vw] top-[.9vw]  rounded-[50%] flex justify-center items-center ">
                    
                    <span><FiDownload size={35} color="white"/></span>
                    </div>
                  </div> */}
              <div
                className="cursor-pointer pr-[2vw] pb-[2vw] "
                onClick={generatePDF}
              >
                <div
                  className="border-[.6vw] h-[6vw] w-[6vw] rounded-[50%]"
                  // style={{ borderColor: colorcode.gradient }}
                >
                  <div
                    className=" relative h-[5vw] w-[5vw] right-[.1vw] bottom-[.1vw] rounded-[50%] flex justify-center items-center "
                    style={{ backgroundColor: colorcode.theme }}
                  >
                    <span>
                      <FiDownload size={35} color="white" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* ))} */}
        </div>
      </Drawer>
    </div>
  );
};
export default TicketView;
