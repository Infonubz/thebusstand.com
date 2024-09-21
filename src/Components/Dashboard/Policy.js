import React, {  useState } from "react";
// import { ref } from "yup";
import ChildPolicy from "../../assets/Child-policy.png";
import Liqour from "../../assets/Liqour.png";
import Luggage from "../../assets/Luggage.png";
import Paws from "../../assets/Paws.png";
import PickUp from "../../assets/PickingUp.png";

const Policy = ({bus_type_status}) => {
  const [isToggleSwitch, setIsToggleSwitch] = useState("CDCP");

  const cancellation = [
    {
      time: "Before 20 - Feb 18:00",
    },
    {
      time: "Between 20 Feb & 21 Feb 10:00",
    },
    {
      time: "After 21 Feb - 10:00",
    },
  ];
  const refund = [
    {
      amount: "Rs 1190/- @ 85% refund",
    },
    {
      amount: "Rs 980/- @ 70% refund",
    },
    {
      amount: "Rs 0/- @ 0% refund",
    },
  ];
  const Travel = [
    {
      travel_img: <img src={ChildPolicy} alt=""/>,
      parent: "Child Passenger Policy",
      child: "Children above the age of 4 will need a ticket",
    },
    {
      travel_img: <img src={Luggage} alt=""/>,
      parent: "Luggage Policy",
      child: (
        <li>
          {" "}
          2 pieces of luggage will be accepted free of charge per passenger.
          Excess items will be chargeable
        </li>
      ),
      child1: (
        <li>Excess baggage over 10 kgs per passenger will be chargeable</li>
      ),
    },
    {
      travel_img: <img src={Paws} alt=""/>,
      parent: "Pets Policy",
      child: "Pets are not allowed",
    },
    {
      travel_img: <img src={Liqour} alt="" />,
      parent: "Liquor Policy",
      child:
        "Carrying or consuming liquor inside the bus is prohibited. Bus operator reserves the right to deboard drunk passengers.",
    },
    {
      travel_img: <img src={PickUp} alt=""/>,
      parent: "Pick up Time Policy",
      child:
        "Bus operator is not obligated to wait beyond the scheduled departure time of the bus. No refund request will be entertained for late arriving passengers.",
    },
  ];
  console.log(bus_type_status,"bus_type_status");
  
  return (
    <>
      <div className="md:block  hidden w-full">
        <div
          className={`${
            bus_type_status?.bus_type_status === "luxury" ? "bg-[#FFEEC9]" : "bg-[#EEEDED]"
          } h-auto px-[1vw] pt-[1vw]`}
        >
          <div className="flex justify-center mt-[1vw] mx-auto border-[0.15vw] border-[#1F487C] w-[60vw] rounded-[0.2vw]">
            <button
              className={`${
                isToggleSwitch === "CDCP" ? "bg-[#1F4B7F]" : "bg-[#F6F6F6]"
              } w-[30vw] h-[2.5vw] flex px-[1vw] justify-center gap-[0.5vw] items-center`}
              onClick={() => setIsToggleSwitch("CDCP")}
            >
              <span
                className={`${
                  isToggleSwitch === "CDCP" ? "text-[#F6F6F6]" : "text-[#1F4B7F]"
                }  text-[1.3vw]`}
              >
                Cancellation & Date Change Policy
              </span>
            </button>
            <button
              className={`${
                isToggleSwitch === "TRP" ? "bg-[#1F4B7F]" : "bg-[#F6F6F6]"
              } w-[30vw] h-[2.5vw] flex px-[1vw] justify-center gap-[0.5vw] items-center`}
              onClick={() => setIsToggleSwitch("TRP")}
            >
              <span
                className={`${
                  isToggleSwitch === "TRP" ? "text-[#F6F6F6]" : "text-[#1F4B7F]"
                }  text-[1.3vw]`}
              >
                Travel Related Policies
              </span>
            </button>
          </div>

          {isToggleSwitch === "CDCP" ? (
            <div className="py-[2vw] px-[.5vw]">
              <div className="flex justify-between">
                <div className="bg-[#D0E5FF80] rounded-[0.5vw]">
                  <div className="py-[1vw] px-[0.5vw] flex flex-col gap-[1vw]">
                    <p className="text-[1.1vw] text-[#1F4B7F]">
                      Refund amount is Indicative.
                    </p>
                    <p className="text-[1.1vw] text-[#1F4B7F]">
                      Additional Rs. 15 per seat cancellation fee is applicable.
                    </p>
                    <p className="text-[1.1vw] text-[#1F4B7F]">
                      Partial cancellation is not allowed.
                    </p>
                  </div>
                </div>
                <div className="flex flex-col gap-[1vw]">
                  <p className="text-[1.1vw] text-[#1F4B7F] font-semibold">
                    Cancellation Time
                  </p>
                  {cancellation.map((item) => (
                    <p className="text-[1.1vw] text-[#1F4B7F]">{item.time}</p>
                  ))}
                </div>
                <div className="flex flex-col gap-[1vw]">
                  <p className="text-[1.1vw] text-[#1F4B7F] font-semibold">
                    Refund Amount
                  </p>
                  {refund.map((item) => (
                    <p className="text-[1.1vw] text-[#1F4B7F]">{item.amount}</p>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="py-[2vw]">
              {Travel.map((trp) => (
                <div className="flex items-center gap-x-[2vw] py-[0.5vw]">
                  <div className="w-[2vw] h-[2vw] ">{trp.travel_img}</div>
                  <div className="flex flex-col ">
                    <div className="text-[1.1vw] text-[#1F4B7F] font-semibold">
                      {trp.parent}
                    </div>
                    <div className="text-[1.1vw] text-[#1F4B7F]">
                      {trp.child}
                    </div>
                    <div className="text-[1.1vw] text-[#1F4B7F]">
                      {trp.child1}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="md:hidden block w-full">
        <div className="bg-[#F6F6F6] h-auto px-[5vw]">
          <div className="flex border-[0.15vw] border-[#1F487C] w-full rounded-[0.5vw]">
            <button
              className={`${
                isToggleSwitch === "CDCP" ? "bg-[#1F4B7F]" : "bg-[#F6F6F6]"
              } w-1/2 h-[5vw] flex px-[1vw] justify-center gap-[0.5vw] items-center`}
              onClick={() => setIsToggleSwitch("CDCP")}
            >
              <span
                className={`${
                  isToggleSwitch === "CDCP" ? "text-[#F6F6F6]" : "text-[#1F4B7F]"
                }  text-[2.2vw]`}
              >
                Cancellation & Date Change Policy
              </span>
            </button>
            <button
              className={`${
                isToggleSwitch === "TRP" ? "bg-[#1F4B7F]" : "bg-[#F6F6F6]"
              } w-1/2 h-[5vw] flex px-[1vw] justify-center gap-[0.5vw] items-center`}
              onClick={() => setIsToggleSwitch("TRP")}
            >
              <span
                className={`${
                  isToggleSwitch === "TRP" ? "text-[#F6F6F6]" : "text-[#1F4B7F]"
                }  text-[2.2vw]`}
              >
                Travel Related Policies
              </span>
            </button>
          </div>

          {isToggleSwitch === "CDCP" ? (
            <div className="py-[2vw]">
              <div className="grid grid-cols-3 gap-[3vw]">
                <div className="bg-[#D0E5FF80] rounded-[0.5vw] px-[1vw]">
                  <div className="py-[1vw] px-[0.5vw] flex flex-col gap-[1vw]">
                    <p className="text-[2.2vw] text-[#1F4B7F]">
                      Refund amount is Indicative.
                    </p>
                    <p className="text-[2.2vw] text-[#1F4B7F]">
                      Additional Rs. 15 per seat cancellation fee is applicable.
                    </p>
                    <p className="text-[2.2vw] text-[#1F4B7F]">
                      Partial cancellation is not allowed.
                    </p>
                  </div>
                </div>
                <div className="flex flex-col gap-[1vw]">
                  <p className="text-[2.2vw] text-[#1F4B7F] font-semibold">
                    Cancellation Time
                  </p>
                  {cancellation.map((item) => (
                    <p className="text-[2.2vw] text-[#1F4B7F]">{item.time}</p>
                  ))}
                </div>
                <div className="flex flex-col gap-[1vw]">
                  <p className="text-[2.2vw] text-[#1F4B7F] font-semibold">
                    Refund Amount
                  </p>
                  {refund.map((item) => (
                    <p className="text-[2.2vw] text-[#1F4B7F]">{item.amount}</p>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="py-[2vw]">
              {Travel.map((trp) => (
                <div className="flex items-center gap-x-[2vw] py-[0.5vw]">
                  <div className="w-[4vw] h-[4vw] ">{trp.travel_img}</div>
                  <div className="flex flex-col ">
                    <div className="text-[2.2vw] text-[#1F4B7F] font-semibold">
                      {trp.parent}
                    </div>
                    <div className="text-[2.2vw] text-[#1F4B7F]">
                      {trp.child}
                    </div>
                    <div className="text-[2.2vw] text-[#1F4B7F]">
                      {trp.child1}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Policy;
