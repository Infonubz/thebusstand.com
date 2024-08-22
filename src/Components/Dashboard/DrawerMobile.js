import { FaBus, FaMapMarkerAlt } from "react-icons/fa";
import bus_comp from "../../assets/bus_comp.png";
import ticketview from "../../assets/ticket_view.png";
import complete from "../../assets/complete.png";
import { useState } from "react";
import { useNavigate } from "react-router";

function DrawerMobile() {
  const [userdetails, setUserDetails] = useState("male");
  const Navigation = useNavigate();
  return (
    <>
      <div className="">
        <div className="">
          <div className=" ">
            <div className="flex w-full px-[1vw] pt-[0.5vw]">
              <img src={complete} className="h-[8vw] w-[8vw]" />
              <h1 className="text-[6vw] font-semibold bg-gradient-to-r from-[#2E78AE] to-[#1F487C] bg-clip-text text-transparent">
                Journey Details
              </h1>
            </div>
            <div
              className="h-auto mx-[4vw]   F rounded-[0.5vw] pb-[1vw]"
              style={{ boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)" }}
            >
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

              {/* <div className="w-[10%] h-full  py-[1vw] flex justify-center">
        <div className="border-dashed border-r-[0.1vw] border-[#1F487C] h-[90%] relative">
          <FaBus
            className=" absolute top-[-0.5vw] left-[-0.7vw]"
            color="#1F487C"
            size={"1.5vw"}
          />
          <div className=" absolute top-[6vw] left-[-0.5vw]">
            <div className="h-[1vw] w-[1vw] border-[0.1vw] border-[#1F487C] bg-white rounded-full"></div>
          </div>{" "}
          <FaMapMarkerAlt
            size={"1.5vw"}
            color="#1F487C"
            className="absolute left-[-0.7vw] bottom-[-1.2vw]"
          />
        </div>
      </div> */}

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
                        {/* {busdetails?.Bus_travel_time} */}5 hrs
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
              {/* ----------------------------end of first card --------------------------- */}
            </div>
          </div>
        </div>
        <div className="mb-20">
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
              <div className=" mt-3 px-2 ">
                <p className="text-[3.5vw] text-[#1F487C] text-lg font-semibold">
                  Phone
                </p>
                <input
                  type="text"
                  placeholder="Enter Your Phone Number"
                  className="border-r-[0.5vw] journeyplaceholder  bg-gradient-to-r from-[#E0E6ED] placeholder-blue to-white border-[#1F487C] text-[#1F487C] text-[4vw] h-[10vw] w-[100%] rounded-[1vw] outline-none px-[3vw]"
                />
              </div>
              <div className=" mt-3 px-2 ">
                <p className="text-[3.5vw] text-[#1F487C] text-lg font-semibold">
                  Email
                </p>
                <input
                  type="email"
                  placeholder="Enter Your Email"
                  className="border-r-[0.5vw] journeyplaceholder bg-gradient-to-r from-[#E0E6ED] placeholder-blue to-white border-[#1F487C] text-[#1F487C] text-[4vw] h-[10vw] w-[100%] rounded-[1vw] outline-none px-[3vw]"
                />
              </div>
              <div>
                <p className="text-[2.9vw] text-center pt-[3vw]">
                  Your booking details will be sent to this email address and
                  mobile number.
                </p>
                <div className="px-2">
                  <div className="border-b-[0.2vw] w-full"></div>
                </div>
              </div>

              <div className=" mt-3 px-2 ">
                <p className="text-lg text-[#1F487C] font-semibold">Name</p>
                <input
                  type="text"
                  placeholder="Enter Your Name"
                  className="border-r-[0.5vw] journeyplaceholder bg-gradient-to-r from-[#E0E6ED] placeholder-blue to-white border-[#1F487C] text-[#1F487C] text-[4vw] h-[10vw] w-[100%] rounded-[1vw] outline-none px-[3vw]"
                />
              </div>

              <div className="flex justify-between">
                <div className=" mt-3 ps-2 ">
                  <p className="text-lg text-[#1F487C] font-semibold">Age</p>
                  <input
                    placeholder="Enter Your Age"
                    type="text"
                    className="border-r-[0.5vw] journeyplaceholder bg-gradient-to-r from-[#E0E6ED] placeholder-blue to-white border-[#1F487C] text-[#1F487C] text-[4vw] h-[10vw] w-[40vw] rounded-[1vw] outline-none px-[3vw]"
                  />
                </div>
                <div className=" mt-3 px-2 ">
                  <p className="text-lg text-[#1F487C] font-semibold">Gender</p>
                  <div className="col-span-2 gap-[1vw]  pl-[1.5vw]">
                    <button
                      type="button"
                      className={`${
                        userdetails == "male"
                          ? "bg-[#1F487C] text-white"
                          : "bg-gradient-to-r from-[#E0E6ED] to-white text-[#1F487C]"
                      } h-[10vw] w-[20vw] rounded-l-[1vw] border-[0.1vw] border-[#1F487C]`}
                      onClick={() => setUserDetails("male")}
                    >
                      Male
                    </button>
                    <button
                      type="button"
                      className={`${
                        userdetails == "female"
                          ? "bg-[#1F487C] text-white"
                          : "bg-gradient-to-r from-[#E0E6ED] to-white text-[#1F487C]"
                      } h-[10vw] w-[20vw] rounded-r-[1vw] border-[0.1vw] border-[#1F487C]`}
                      onClick={() => setUserDetails("female")}
                    >
                      Female
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#CED9E5] mt-14 fixed bottom-0 left-0 w-full flex justify-end p-3">
        <button
          onClick={() => Navigation("/dashboard/userinfo/payment")}
          className="bg-[#1F487C] p-2 text-white rounded shadow hover:bg-[#2f7de3]"
        >
          Continue to Pay 1000
        </button>
      </div>
    </>
  );
}

export default DrawerMobile;
