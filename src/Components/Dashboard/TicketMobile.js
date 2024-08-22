import ticketview from "../../assets/ticket_view.png";
import bus_comp from "../../assets/bus_comp.png";
import complete from "../../assets/complete.png";
import Barcode from "react-barcode";
import { useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";




const TicketMobile = () => {

    function generateRandomId(prefix, length) {
        const randomNumbers = Math.random().toString().substr(2, length);
        return prefix + randomNumbers;
      }

    const componentRef = useRef();
  const generatePDF = () => {
    html2canvas(componentRef.current, {
      scrollX: 0,
      scrollY: -window.scrollY,
    }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgWidth = pdf.internal.pageSize.getWidth();
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      pdf.save(`${registerfulldetails.name}.pdf`);;
    });
  };
  const registerfulldetails ={
    name:"tbs"
  }
    const passdetails = [
        {
            "name": "vikram",
            "gender": "M",
            "Age": 22,
            "SeatNO": 4
        },
        {
            "name": "saraa",
            "gender": "F",
            "Age": 29,
            "SeatNO": 12
        },
        {
            "name": "ajay",
            "gender": "M",
            "Age": 31,
            "SeatNO": 7
        },
        {
            "name": "neha",
            "gender": "F",
            "Age": 25,
            "SeatNO": 9
        },
        {
            "name": "rajesh",
            "gender": "M",
            "Age": 28,
            "SeatNO": 3
        }
    ]
    
    return(
        <div>
            <div
            className="h-auto mx-[4vw] mt-5 border-t border-t-[#1F487C]  F rounded-[0.5vw] pb-[1vw]"
            style={{ boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)" }}
          >
            <div className="h-[15vw]  w-full bg-[#1F487C] rounded-[1vw] flex justify-between items-center px-[2vw]">
                <label className="text-white text-[4vw] font-semibold">
                  {/* {`Booking Id : ${generateRandomId("AXER", 12)}`} */}
                <div> Booking Id :</div> 
                   12312e1slknc13
                </label>
                <label className="text-white text-[4vw] font-semibold">
                  {/* {`Bus Partner Id : ${generateRandomId("CHEN", 12)}`} */}
                 <div>Partner Id :</div> 
                  12312e1slknc13
                </label>
              </div>
            <div className="w-[80%]  flex justify-start pt-2 mx-2">
              <div className=" flex justify-center ">
                {" "}
                <img
                  src={
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7s_zkZS9ltVD08rhhPN7sfRhRecxyIxMzsQ&s"
                  }
                  className="w-[8vw] h-[8vw] rounded-full"
                />
              </div>
              <div className="flex flex-col  items-center mx-2 ">
                <p className="text-[#1F487C] text-[5vw] font-bold">
                  A1 Travels
                </p>
                <p className="text-[#1F487C] text-[3vw] ">(ac sleeper)</p>
              </div>
            </div>

       

            <div className="col-span-6 p-2">
              <div className="grid grid-rows-1 w-full ">
                {/* First Row: Date, Time, and Departure Place */}
                <div className="flex justify-between px-2">
                  <div className="flex flex-col items-start ">
                    <p className="text-sm text-[#1F487C]">
                      {/* {dayjs(bus[busIndex]?.Bus_depature_date).format("DD MMM")} */}
                      {/* {dayjs(busdetails?.Bus_depature_date).format("DD MMM")} */}
                      01-09-2024
                    </p>
                    <p className="font-bold text-md text-[#1F487C]">
                      {/* {item.bus_depature} */}
                      {/* {bus[busIndex]?.Bus_Depature_time} */}
                      {/* {busdetails?.Bus_Depature_time} */}
                      10:10 AM
                    </p>
                    <p className="text-sm text-[#1F487C]">
                      {/* {bus[busIndex]?.Bus_Depature_place} */}
                      {/* {busdetails?.Bus_Depature_place} */}
                      THAMBARAM
                    </p>
                  </div>
                  <div className="flex flex-col items-center mb-2">
                    <img src={bus_comp} className="h-10 w-15" />
                    <p className="text-center text-lg font-bold text-[#1F487C]">
                      {/* {item.bus_travel_time} */}
                      {/* {bus[busIndex]?.Bus_travel_time} */}
                      {/* {busdetails?.Bus_travel_time} */}
                      5 hrs
                    </p>
                  </div>
                  <div className="flex flex-col items-end">
                    <p className="text-sm text-[#1F487C]">
                      {/* {dayjs(bus[busIndex]?.Bus_arrival_date).format("DD MMM")} */}
                      {/* {dayjs(busdetails?.Bus_arrival_date).format("DD MMM")} */}
                      01-09-2024
                    </p>
                    <p className="font-bold text-md text-[#1F487C]">
                      {/* {item.bus_arr} */}
                      {/* {bus[busIndex]?.Bus_Arrival_time} */}
                      {/* {busdetails?.Bus_Arrival_time} */}
                      6:00 AM
                    </p>
                    <p className="text-sm text-[#1F487C]">
                      {/* {bus[busIndex]?.Bus_Arrival_place} */}
                      {/* {busdetails?.Bus_Arrival_place} */}
                      BENGALURU
                    </p>
                  </div>
                </div>
                {/* Second Row: Boarding Point & Time, Seat Number */}
                <div className="row-span-2 flex flex-col p-2">
                  <div className="flex justify-between mb-2">
                    <div className="flex flex-col">
                      <p className="text-base">Boarding Point & Time</p>
                      <p className="text-[#1F487C] text-lg font-semibold">
                        {/* {`${selectedRoutes?.dep_route} : ${selectedRoutes?.dep_time}`} */}
                        chennai : 10.55 am
                      </p>
                    </div>
                    <div className="flex flex-col items-end">
                      <p className="text-base">Seat Number(s)</p>
                      <p className="text-[#1F487C] text-lg font-semibold">
                        {/* {selectedSeats} */}1
                      </p>
                    </div>
                  </div>
                  {/* Third Row: Dropping Point & Time, Ticket Price */}
                  <div className="flex justify-between items-center">
                    <div className="flex flex-col mb-2">
                      <p className="text-base">Dropping Point & Time</p>
                      <p className="text-[#1F487C] text-lg font-semibold">
                        {/* {`${selectedRoutes?.arri_route} : ${selectedRoutes?.arr_time}`} */}
                        chennai : 6.00 pm
                      </p>
                    </div>
                    <div className="relative flex items-center">
                      <img src={ticketview} className="w-[25vw] " />
                      <p className="text-xl font-bold text-white absolute left-6">
                        {/* {`₹ ${busprice.discount}`} */}
                        100000
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          
          </div>

          <div className="px-[4vw]  py-[2vw] ">
          <div
            className="h-auto w-full F rounded-[0.5vw] pb-[1vw]"
            style={{ boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)" }}
          >
            <div className="flex  w-full px-[1vw] pt-[0.5vw]">
              <img src={complete} className="h-[7vw] w-[7vw]" />

              <h1 className="text-[5vw] font-semibold bg-gradient-to-r from-[#2E78AE] to-[#1F487C] bg-clip-text text-transparent">
                Passenger Details
              </h1>
            </div>


            <div className="px-2">
            <div className="grid grid-cols-5 gap-4 my-3 text-[#1F487C] font-bold">
                <div className="col-span-2">Travellers</div>
                <div>Gender</div>
                <div>Age</div>
                <div>Seat No.</div>
            </div>
            <div>
                {passdetails.map((v, index) => (
                    <div key={index} className="grid grid-cols-5 gap-4 mb-2 items-center">
                        <div className="col-span-2">{v.name}</div>
                        <div className="ps-2">{v.gender}</div>
                        <div>{v.Age}</div>
                        <div className="ps-2">{v.SeatNO}</div>
                    </div>
                ))}
            </div>
        </div>








            <div>
            <div className=" mt-3 px-2 ">
              <p className="text-[5vw] font-semibold bg-gradient-to-r from-[#2E78AE] to-[#1F487C] bg-clip-text text-transparent">Contact Details</p>
             
            </div>
            <div className="px-4 mt-3">
                <div className=" grid grid-cols-2 my-2">
                <label className="text-[#1F487C] font-bold text-lg">Phone :</label>
                <input value="1234567890"  className="border-r-[0.5vw] bg-gradient-to-r from-[#E0E6ED] placeholder-blue to-white border-[#1F487C] text-[#1F487C] text-[4vw] h-[8vw] w-[100%] rounded-[0.5vw] outline-none px-[1vw]"/>

                </div>
             <div className="grid grid-cols-2">
                <label className="text-[#1F487C] font-bold text-lg">Mail :</label>
                {/* <span className="text-[#1F487C]">tbs2024@tbs.com</span> */}
                <input value="tbs2024@tbs.com"  className="border-r-[0.5vw] bg-gradient-to-r from-[#E0E6ED] placeholder-blue to-white border-[#1F487C] text-[#1F487C] text-[4vw] h-[8vw] w-[100%] rounded-[0.5vw] outline-none px-[1vw]"/>
                </div>
            </div>
            </div>

            <div className="flex items-center justify-between px-2 py-3">
                <Barcode
                className="mr-3"
                  value={generateRandomId("AXER", 12)}
                //   width={2.5}
                  height={40}
                  lineColor={"#1F487C"}
                />
                <img
                  className="h-[15vw] w-[15vw] cursor-pointer"
                  src={require("../../assets/download.png")}
                  onClick={generatePDF}
                />
              </div>

     
             
              </div>
            </div>
           
       
        


        </div>
    )
}
export default TicketMobile;