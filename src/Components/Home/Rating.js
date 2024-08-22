import React, { useEffect, useState } from "react";
import shape from "../../assets/shape.png";
import double from "../../assets/doubl.png";
import { FaStar } from "react-icons/fa";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

export default function Rating() {
  const ratingdata = [
    {
      rate: "4.5",
      review: "Accurate real-time tracking. Excellent!",
      name: "Harish Yarrabothula",
      company: "Nubiznez Pvt. Ltd.",
    },
    {
      rate: "3.5",
      review: "Very convenient for daily commute.",
      name: "P Manoj",
      company: "Incture Technologies",
    },
    {
      rate: "2.5",
      review: "Reliable schedules, moderate ticket booking.",
      name: "Praveen K P",
      company: "Neudesic",
    },
    {
      rate: "1.5",
      review: "Good App, but bus I booked was bad.",
      name: "Virushne V K",
      company: "Nous Infosystems",
    },
    {
      rate: "4.0",
      review: "Perfect for planning bus journeys.",
      name: "MithunKumar V",
      company: "PathPartner Technology",
    },
    {
      rate: "1.0",
      review: "Unable to Book, Faced lot of issues.",
      name: "Vigashne",
      company: "RapidValue Solutions",
    },

  ];

  const [startIndex, setStartIndex] = useState(0);


  const prevSlide = () => {
    const newIndex = Math.max(0, startIndex - 1);
    setStartIndex(newIndex);
  };

  const nextSlide = () => {
    const newIndex = Math.min(startIndex + 1, ratingdata.length - 4);
    setStartIndex(newIndex);
  };
  console.log(startIndex, "startIndex");


  return (
    <div className="px-[5vw] py-[1vw] ">
      <p className="text-[3.2vw] my-[2vw] md:my-0  md:text-[1.6vw]  text-[#1F487C] font-bold pt-[1vw] px-[2vw] pb-[1vw]">
        Here’s what a few of our customers have to say about us
      </p>
      {/* DesktopView */}
      <div className="pl-[2vw]  py-[1vw] md:block hidden ">
        <div className="grid grid-cols-4 w-full gap-[1vw]  h-[10%] relative ">
          {ratingdata.slice(startIndex, startIndex + 4).map((item, index) => (
            <div key={index} className="col-span-1 w-full h-full relative ">
              <img src={shape} className="h-[100%] w-full " />
              <img
                src={double}
                className="absolute left-[2vw] top-[0.5vw] w-[2vw] h-[2vw] "
              />
              <div className="absolute right-[2vw] top-[1vw]">
              <div className={`w-[6.3vw] h-[2.5vh] sm:w-[4vw] sm:h-[2vw] ${item.rate >= "3.5" ? "bg-[#61B00F]" : item.rate >= "2.5" ? "bg-[#FF910E]" : "bg-[#EA222F]"} flex items-center justify-center rounded-[0.2vw]`}>
                  <FaStar
                    style={{
                      color: "white",
                    }}
                    size={"1.4vw"}
                    className="mx-[0.2vw]"
                  />
                  <div>
                    <p className="text-white font-bold text-[1.15vw]">
                      {item.rate}
                    </p>
                  </div>
                </div>
              </div>
              <div className="absolute bottom-[2vw] px-[2vw]">
                <p className="text-black text-[1.2vw]">{item.review}</p>
              </div>
              <div className="absolute left-[0.2vw] bottom-[-2vw]">
                <p className="text-[1.1vw] text-[#1F487C] font-bold">
                  {item.name}
                </p>
              </div>
              <div className="absolute left-[0.2vw] bottom-[-3.5vw]">
                <p className="text-[1.1vw] text-[#8DA0A8] ">{item.company}</p>
              </div>
            </div>
          ))}
          <div className="absolute left-[-4vw] top-[50%]">
            <button
              className="cursor-pointer  p-2 rounded-full "
              onClick={prevSlide}
              style={{ zIndex: -10 }}
            >
              <IoIosArrowBack size={"2vw"} />
            </button>
          </div>
          <div className="absolute right-[-4vw] top-[50%]">
            <button
              className="cursor-pointer  p-2 rounded-full "
              onClick={nextSlide}
            >
              <IoIosArrowForward size={"2vw"} color="#1F487C" />
            </button>
          </div>
        </div>
      </div>


      {/* Mobile View */}

      <div className="md:hidden block">
        <div className="overflow-x-auto whitespace-nowrap scrollbar-hide ">
          <div className="flex space-x-2 h-[40vw]">
            {ratingdata.map((item, index) => (
              <div key={index} className="relative flex-none w-[60vw]">
                <img src={shape} className="w-[60vw] " />
                <img
                  src={double}
                  className="absolute left-[2vw] top-[2vw] w-[5vw] h-[5vw]"
                />
                <div className="absolute right-[3vw] top-[2vw]">
                  <div
                    className={`w-[6vw] h-[2.5vh] ${item.rate >= "3.5" ? "bg-[#61B00F]" : item.rate >= "2.5" ? "bg-[#FF910E]" : "bg-[#EA222F]"} flex space-x-[0.1vw] justify-center items-center rounded-[0.2vw]`}>
                    <FaStar
                      style={{
                        color: "white",
                      }}
                      size={"1.8vw"}
                      className="mx-[0.2vw]"
                    />
                    <div> 
                      <p className="text-white font-bold text-[2vw]">{item.rate}</p>
                    </div>
                  </div>
                </div>
                <div className="absolute top-[9vw] px-[2vw] ">
                  <p className="text-black text-[3.5vw] text-wrap">{item.review}</p>
                </div>
                <div className="absolute left-[0.2vw] bottom-[8.5vw]">
                  <p className="text-[3.5vw] text-[#1F487C] font-bold">{item.name}</p>
                </div>
                <div className="absolute left-[0.2vw] bottom-[4.5vw]">
                  <p className="text-[3vw] text-[#8DA0A8]">{item.company}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}



