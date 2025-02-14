import React from 'react'
import { useSelector } from "react-redux";
import bus from "../../../../Assets/Logo/bus.png";

export default function Deals() {

    const colors = useSelector((state) => state.themecolors[0]);
  

  return (
    <>
     <div className="px-[4.5vw] md:block hidden">
        <p
          className={` text-[1.5vw] pl-[2vw] text-[${colors.primary}] font-bold pt-[1vw] pb-[1vw]`}
        >
          Deals on thebusstand.com
        </p>
        <p className="pl-[2vw] text-[1.1vw] leading-[2.5vw] tracking-wider">
          Don't miss out on these incredible offers, book your bus tickets now
          and travel with convenience and affordability. Hurry, grab the best
          bus booking deals before they're gone!
        </p>
        <div className="px-[2vw]">
          <div className="h-[8vw] w-full bg-gradient-to-l from-[#82C5F2] border-[0.01vw] border-[#82C5F2]  shadow-lg  mt-[2vw] rounded-xl grid grid-cols-6">
            <div className="col-span-1 items-center justify-center flex">
              <img src={bus} className="h-[7vw]" alt="bus" />
            </div>
            <div className="col-span-3  ">
              <p className=" text-[1.8vw] tracking-wide mt-[1.2vw] text-[#4A4A4A]">
                Unlock Unbeatable Exclusive Deals!{" "}
              </p>
              <p className="flex  text-[1.3vw] mt-[0.5vw] tracking-wider">
                <span>
                  <span
                    className={`font-bold text-[${colors.primary}] text-[1.5vw] pr-[0.4vw]`}
                  >
                    4152
                  </span>
                  <span className="text-[#4A4A4A] pr-[1vw]">Deals</span>
                </span>
                <span className="w-[0.15vw] h-[2.2vw] bg-black"></span>
                <span className="pl-[1vw]">
                  <span
                    className={`font-bold text-[${colors.primary}] text-[1.5vw]`}
                  >
                    1648
                  </span>
                  <span className="text-[#4A4A4A] pr-[1vw] pl-[0.5vw]">
                    Bus Operators
                  </span>
                </span>
                <span className="w-[0.15vw] h-[2.2vw] bg-black"></span>

                <span className="pl-[1vw]">
                  <span
                    className={`font-bold text-[${colors.primary}] text-[1.5vw]`}
                  >
                    21542
                  </span>
                  <span className="text-[#4A4A4A] pr-[1vw] pl-[0.5vw]">
                    Routes
                  </span>
                </span>
              </p>
            </div>
            <div className="col-span-1 flex items-center ">
              <p className={`text-[3vw] text-[${colors.primary}] font-bold`}>
                20% OFF
              </p>
            </div>
            <div className="col-span-1 items-center justify-center flex">
              <button className="bg-white px-[2vw] py-[0.5vw] shadow-lg rounded-full">
                Book now
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="px-[5vw] md:hidden block">
        <p
          className={`text-[vw] pl-[2vw] text-[${colors.primary}] font-bold pt-[3vw] pb-[1vw]`}
        >
          Popular Domestic Presence
        </p>
        {/* <div className="relative overflow-x-auto scrollbar-hide">
          <div className="flex w-full">
            <div className="flex-shrink-0 w-[30vw] py-[1vw]">
              {busdetails.map((item) => (
                <div className="w-[30vw] ">
                  <img
                    src={item.logo}
                    className="w-[25vw] h-[25vw] ml-[1.8vw] rounded-full shadow-md shadow-[${colors.primary}]"
                  />
                  <p className="text-center py-[0.8vw] text-[3vw] font-bold">
                    {item.label.toUpperCase()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div> */}
        <p
          className={` text-[4vw] pl-[2vw] text-[${colors.primary}] font-bold pt-[1vw] pb-[1vw]`}
        >
          Deals on thebusstand.com
        </p>
        <p className="pl-[2vw] text-[3vw] leading-[5vw] tracking-wider">
          Don't miss out on these incredible offers, book your bus tickets now
          and travel with convenience and affordability. Hurry, grab the best
          bus booking deals before they're gone!
        </p>
        <div className="pl-[2vw]">
          <div className="h-[35vw] w-full bg-gradient-to-l relative from-[#82C5F2] border-[0.01vw] border-[#82C5F2]  shadow-lg  mt-[2vw] rounded-xl grid grid-cols-6">
            <img
              src={bus}
              className="h-[12vw] w-[22vw] absolute left-[2vw] top-[10vw]"
              alt="domestice_presence"
            />
            <div>
              <p className="text-[3.9vw] tracking-wide mt-[2vw] font-extrabold absolute left-[2vw] text-[#4A4A4A]">
                Unlock Unbeatable Exclusive Deals!{" "}
                <spn className={`text-[${colors.primary}]`}>20% OFF</spn>{" "}
              </p>
              <p className="flex text-[3vw] mt-[0.5vw] absolute left-[30vw] top-[10vw] tracking-wider">
                <span>
                  <span
                    className={`font-bold text-[${colors.primary}] text-[3vw] pr-[1.5vw] `}
                  >
                    4152
                  </span>
                  <span className="text-[#4A4A4A] pr-[1vw] ">Deals</span>
                </span>
                <span className="w-[0.15vw] h-[4vw] bg-black"></span>
                <span className="pl-[1vw]">
                  <span
                    className={`font-bold text-[${colors.primary}] text-[3vw]`}
                  >
                    1648
                  </span>
                  <span className="text-[#4A4A4A] pr-[1vw] pl-[1.5vw]">
                    Bus Operators
                  </span>
                </span>
                {/* <span className="w-[0.15vw] h-[4vw] bg-black"></span> */}
              </p>
              <span className="pl-[1vw] absolute left-[29vw] top-[15vw]">
                <span
                  className={`font-bold text-[${colors.primary}] text-[3vw]`}
                >
                  21542
                </span>
                <span className="text-[#4A4A4A] text-[3vw] pr-[1vw] pl-[1.5vw]">
                  Routes
                </span>
              </span>
            </div>
            {/* </div> */}
            <div className="absolute top-[7vw] right-[1vw] ">
              <p
                className={`text-[3vw] text-[${colors.primary}] font-bold`}
              ></p>
            </div>
            <button
              className={`absolute bottom-[1vw] item-center flex left-[2.3vw] rounded-[1.3vw] justify-center w-[95%] py-[1.5vw] bg-[${colors.primary}] text-white`}
            >
              Book now
            </button>
            {/* <div className="col-span-1 items-center justify-center flex">
              <p className="text-[3vw] text-[${colors.primary}] font-bold">20% OFF</p>
              <button className="bg-white px-[2vw] py-[0.5vw] shadow-lg rounded-full">
                Book now
              </button>
            </div> */}
          </div>
        </div>
      </div>
      </>
  )
}
