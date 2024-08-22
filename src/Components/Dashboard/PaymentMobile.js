import { GiSevenPointedStar } from "react-icons/gi";
import bus_comp from "../../assets/bus_comp.png";
import ticketview from "../../assets/ticket_view.png";
import { IoIosAddCircleOutline } from "react-icons/io";
import { Form } from "antd";
import { Field } from "formik";
import { useNavigate } from "react-router";


const PaymentMobile = () => {
  const navigation = useNavigate()
  const offers = [
    {
      coupon: "SAVE5",
      details:
        "Get 5% off on your next purchase. Use code 'SAVE5' at checkout. Valid for orders over 100 rs.",
    },
    {
      coupon: "FREEBIE",
      details:
        "Receive a free gift with every purchase over 500 rs. Use code 'FREEBIE' at checkout. Limited time offer.",
    },
    {
      coupon: "DISCOUNT10",
      details:
        "Enjoy a 10% discount on all items. Use code 'DISCOUNT10' at checkout. Valid for online orders only.",
    },
    {
      coupon: "BONUS15",
      details:
        "Get 15% off on selected products. Enter code 'BONUS15' during checkout. Excludes sale items.",
    },
    {
      coupon: "FLASH20",
      details:
        "Take 20% off site-wide for a limited time. Apply code 'FLASH20' at checkout. Minimum purchase of 200 rs required.",
    },
  ];

  return (
    <div>
      <div className="">
      <div className="flex w-full px-[2vw] py-[1vw] pt-[0.5vw]">
        <img
          src={
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBLGr1409-fFH7iElQDsl2gOvw_uKG7xDDWsJXvMqyvnMVLkJ5Ceg2gcQsSxgJBs3nkvI&usqp=CAU"
          }
          className="h-[9vw] w-[12vw] mr-[2vw]"
        />
        <h1 className="text-[8vw] font-semibold bg-gradient-to-r from-[#2E78AE] to-[#1F487C] bg-clip-text text-transparent">
          Payment
        </h1>
      </div>
      <div
        className="h-auto mx-[2vw]   F rounded-[0.5vw] pb-[1vw]"
        style={{ boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)" }}
      >
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
            <div className="row-span-1 flex flex-col px-2">
              <div className="flex justify-between items-center">
                <div className="flex flex-col mb-2">
                  <p className="text-base">Seat Number</p>
                  <p className="text-[#1F487C] text-lg font-semibold">
                    {/* {`${selectedRoutes?.arri_route} : ${selectedRoutes?.arr_time}`} */}
                    1u
                  </p>
                </div>
                <div className="relative flex items-center">
                  <img src={ticketview} className="w-[24vw] " />
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
      <div
        className="h-auto mx-[2vw]  my-[2vw]  F rounded-[0.5vw] pb-[1vw]"
        style={{ boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)" }}
      >
        <p className="text-[#1F487C]  pt-2 mx-2 text-[5vw] font-bold">
          UPI Payments
        </p>
        <div className="flex justify-around mt-[2vw]">
          <div className="flex flex-col items-center">
            <img
              className="h-[8vw]"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0P8Yd9xJdktV7ZQk0bjUXoMsO5xfXz2LtHdcv7_owmq553TzmPVpTOTOvhOBBuYV9voo&usqp=CAU"
              alt="Gpay"
            />
            <p className="mt-2">Gpay</p>
          </div>
          <div className="flex flex-col items-center">
            <img
              className="h-[8vw]"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQInR-uH66RWqolq1QFiMgZcaqZVOs2vKfjww&s"
              alt="Paytm"
            />
            <p className="mt-2">Paytm</p>
          </div>
          <div className="flex flex-col items-center">
            <img
              className="h-[8vw]"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUjJUlxW_cbjk2QL26jHguNloSs0UZI3JCTw&s"
              alt="Phonepe"
            />
            <p className="mt-2">Phonepe</p>
          </div>
        </div>
        {/* <div className="w-[100%]  border-t-[0.1vw] border-dashed border-gray-600 mt-4"></div> */}
        <div className="p-2 mt-2 flex items-center">
          <span className="me-[1.5vw]">
            <IoIosAddCircleOutline />
          </span>{" "}
          <span className="text-sm">Add new UPI</span>
        </div>
      </div>

      <div
        className="h-auto mx-[2vw]  my-[2vw]  F rounded-[0.5vw] pb-[1vw]"
        style={{ boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)" }}
      >
        <p className="text-[#1F487C]  pt-2 mx-2 text-[5vw] font-bold">
          NetBanking
        </p>
        <div className="flex justify-around mt-[2vw]">
          <div className="flex flex-col items-center">
            <img
              className="h-[8vw]"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_M3Rkl4hk--cvdCXUqc0xWUZ6RVxgywqtug&s"
              alt="Gpay"
            />
            <p className="mt-2">Sbi</p>
          </div>
          <div className="flex flex-col items-center">
            <img
              className="h-[8vw]"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRL-637EgLUyDO4RZot3aELESvwZOxg6Udy0Q&s"
              alt="Paytm"
            />
            <p className="mt-2">HDFC</p>
          </div>
          <div className="flex flex-col items-center">
            <img
              className="h-[8vw]"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTK4R9wqPZXjnF5E3EgQXzVr-IMOSVmDNEeCw&s"
              alt="Phonepe"
            />
            <p className="mt-2">Axis</p>
          </div>
          <div className="flex flex-col items-center">
            <img
              className="h-[8vw]"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSq8PlTJT0Pfqcz4N0E3njPNVjGrGEZtANLlS-nvJlQF8d6kSDo3I-KoTspyEswInR3Tpg&usqp=CAU"
              alt="Phonepe"
            />
            <p className="mt-2">ICICI</p>
          </div>
        </div>
        {/* <div className="w-[100%]  border-t-[0.1vw] border-dashed border-gray-600 mt-4"></div> */}
        <div className="p-2 mt-2 flex items-center">
          <span className="me-[1.5vw]">
            <IoIosAddCircleOutline />
          </span>{" "}
          <span className="text-sm">other banks</span>
        </div>
      </div>
      <div
        className="row-span-4 h-auto  m-2 px-1 rounded-[0.5vw] pb-[2vw]"
        style={{ boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)" }}
      >
        <h1 className="text-[5vw] font-semibold bg-gradient-to-r px-[1vw] py-[0.5vw] text-[#1F487C] ">
          Fare Details
        </h1>
        <div className="px-[1vw] flex justify-between">
          <p className="text-[4vw]">Base Fare</p>
          <p className="text-[4vw]">
            ₹{/* {busprice.discount} */}
            1234
          </p>
        </div>
        <div className="px-[1vw] flex justify-between">
          <p className="text-[4vw]">GST 3%</p>
          <p className="text-[4vw]">
            + ₹ 85
            {/* {Math.round(busprice.discount * 0.03)} */}
          </p>
        </div>
        <button className="bg-[#1F487C] w-full  rounded-[1vw] mt-[0.8vw] flex items-center justify-between px-[1vw]">
          <span className="text-white text-[4vw] font-semibold">
            {/* http://192.168.90.43:8090e */}
            Total Payable
          </span>
          <span className="text-white text-[4vw] font-bold">
            {/* {`₹ ${
              Number(busprice.discount) +
              Number(Math.round(busprice.discount * 0.03))
            }`} */}
            1319
          </span>
        </button>
      </div>

      <div
        className="row-span-6 h-auto mx-2 mb-16  rounded-[0.5vw] pb-[2vw]"
        style={{ boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)" }}
      >
        <div>
        <div className="mx-2">
          <h1 className="text-[5vw] font-semibold px-[1vw] py-[0.5vw]  text-[#1F487C]">
            Offers
          </h1>
        </div>

        <div className="px-[1vw] h-[40vw] overflow-y-auto">
          {offers.map((item, index) => (
            <div
              key={index}
              className="border-[0.1vw] border-[#2E78AE] rounded-[0.5vw] mb-[1vw]"
            >
              <div className="grid grid-cols-10 m-[0.5vw] w-full">
                <div className="col-span-1 pt-[0.2vw]">
                  <input type="radio" name="offer" className="w-full h-auto" />
                </div>
                <div className="col-span-9 flex flex-col w-full">
                  <p className="text-[4.1vw] text-[#2E78AE] font-bold">
                    {item.coupon}
                  </p>
                  <p className="text-[4vw] font-semibold text-[#A4A4A4]">
                    {item.details}
                  </p>
                </div>
              </div>
            </div>
          ))}

        </div>
          <Form className="flex px-[1vw] mt-[0.8vw] relative">
            <GiSevenPointedStar
              size={"7vw"}
              className="absolute left-[1.5vw] top-[0.5vw]"
              color="#1F487C"
            />
            <p className="text-white font-bold absolute left-[3.5vw] top-[1vw]">
              %
            </p>
            <input
              type="text"
              name="name"
              placeholder="Enter promo code"
              className=" payplaceholder border-dashed border-[0.1vw] border-[#1F487C] bg-[#E0E6ED] placeholder-blue  outline-none  text-[#1F487C]  h-[9vw] w-[75%] rounded-l-[1vw]   pl-[10vw] "
            />

            <button className="bg-[#1F487C] w-[25%] h-[9vw] rounded-r-[1vw] text-white  font-bold flex items-center  justify-center">
              Apply
            </button>
          </Form>
        </div>
      </div>
      </div>
      <div className="bg-[#CED9E5] fixed bottom-0 left-0 w-full flex justify-end p-3">
        <button onClick={()=>navigation("/dashboard/userinfo/payment/viewticket")}   className="bg-[#1F487C] p-2 text-white rounded shadow hover:bg-[#2f7de3]">
            Proceed to Pay 1000
        </button>
    </div>
    </div>
  );
};
export default PaymentMobile;
