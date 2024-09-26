import React, { useEffect, useState } from "react";
import shape from "../../assets/shape.png";
import double from "../../assets/doubl.png";
import { FaStar } from "react-icons/fa";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { GetFeedbacks } from "../../Api/Home/RatingFeedback";
import { Popover } from "antd";
import { capitalizeFirstLetter } from "../Common/Captalization";
import ColorCodes from "../Common/ColorCodes";

export default function Rating() {
  // const ratingdata = [
  //   {
  //     rating: "4.5",
  //     description: "Accurating real-time tracking. Excellent!",
  //     name: "Harish Yarrabothula",
  //     occupation: "Nubiznez Pvt. Ltd.",
  //   },
  //   {
  //     rating: "3.5",
  //     description: "Very convenient for daily commute.",
  //     name: "P Manoj",
  //     occupation: "Incture Technologies",
  //   },
  //   {
  //     rating: "2.5",
  //     description: "Reliable schedules, moderating ticket booking.",
  //     name: "Praveen K P",
  //     occupation: "Neudesic",
  //   },
  //   {
  //     rating: "1.5",
  //     description: "Good App, but bus I booked was bad.",
  //     name: "Virushne V K",
  //     occupation: "Nous Infosystems",
  //   },
  //   {
  //     rating: "4.0",
  //     description: "Perfect for planning bus journeys.",
  //     name: "MithunKumar V",
  //     occupation: "PathPartner Technology",
  //   },
  //   {
  //     rating: "1.0",
  //     description: "Unable to Book, Faced lot of issues.",
  //     name: "Vigashne",
  //     occupation: "RapidValue Solutions",
  //   },

  // ];

  const [startIndex, setStartIndex] = useState(0);

  const dispatch = useDispatch()

  useEffect(() => {
    GetFeedbacks(dispatch)
  }, [dispatch])

  const ratingdata = useSelector((state) => state.feed_back)

  const prevSlide = () => {
    const newIndex = Math.max(0, startIndex - 1);
    setStartIndex(newIndex);
  };

  const nextSlide = () => {
    const newIndex = Math.min(startIndex + 1, ratingdata.length - 4);
    setStartIndex(newIndex);
  };
  console.log(startIndex, "startIndex");
  // const colors=ColorCodes()

  const colors = useSelector((state) => state.themecolors[0]);

  return (
    <div className="px-[5vw] py-[1vw] ">
      <p className={`text-[3.2vw] my-[2vw] md:my-0  md:text-[1.6vw]  text-[${colors.primary}] font-bold pt-[1vw] px-[2vw] pb-[1vw]`}>
        Here’s what a few of our customers have to say about us
      </p>
      {/* DesktopView */}
      <div className="pl-[2vw]  py-[1vw] md:block hidden ">
        <div className="grid grid-cols-4 w-full gap-[1vw]  h-[10%] relative ">
          {ratingdata.slice(startIndex, startIndex + 4).map((item, index) => (
            <div key={index} className="col-span-1 w-full h-full relative ">
              {/* <img src={shape} className="h-[100%] w-full " /> */}
              <div className=" rounded-[.5vw] h-[8vw] w-full bg-[#f5f6f7] shadow-lg  ">
              <img
                src={double}
                className="absolute left-[2vw] top-[1vw] w-[2vw] h-[2vw] "
              />
              <div className="absolute right-[2vw] top-[1vw]">
                <div className={`w-[6.3vw] h-[2.5vh] sm:w-[4vw] sm:h-[2vw] ${item.rating == "5" ? "bg-[#61B00F]" : item.rating == "4" ? "bg-[#61B00F]" : item.rating == "3" ? "bg-[#FF910E]" : item.rating == "2" ? "bg-[#FF910E]" : "bg-[#EA222F]"} flex items-center justify-center rounded-[0.2vw]`}>
                  <FaStar
                    style={{
                      color: "white",
                    }}
                    size={"1.4vw"}
                    className="mx-[0.2vw]"
                  />
                  <div>
                    <p className="text-white font-bold text-[1.15vw]">
                      {item.rating}
                    </p>
                  </div>
                </div>
              </div>
              {
                
              }
              <div className="absolute bottom-[1vw] px-[2vw] items-center justify-center flex">
               {
                item?.description?.length > 60 ? <Popover content={item.description} trigger="hover" overlayStyle={{ maxWidth: '20vw' }}><p className={` text-[${colors.primary}] text-[1.1vw]`}>{`${capitalizeFirstLetter(item?.description?.slice(0,60))}...`}</p></Popover> : <p className={`text-[${colors.primary}] text-[1.1vw] items-center justify-center flex`}>{capitalizeFirstLetter(item.description)}</p>
               } 
              </div>
              <div className="absolute left-[0.2vw] bottom-[-2vw]">
                <p className={`text-[1.1vw] text-[${colors.primary}] font-bold`}>
                  {item.name}
                </p>
              </div>
              <div className="absolute left-[0.2vw] bottom-[-3.5vw] ">
                <p className="text-[1.1vw] text-[#8DA0A8] ">{item.occupation}</p>
              </div>
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
              <IoIosArrowForward size={"2vw"} color={`${colors.primary}`} />
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
                    className={`w-[6vw] h-[2.5vh] ${item.rating == "5" ? "bg-[#61B00F]" : item.rating == "4" ? "bg-[#ffbf0e]" : item.rating == "3" ? "bg-[#FF910E]" : item.rating == "2" ? "bg-[#ff520e]" : "bg-[#EA222F]"} flex space-x-[0.1vw] justify-center items-center rounded-[0.2vw]`}>
                    <FaStar
                      style={{
                        color: "white",
                      }}
                      size={"1.8vw"}
                      className="mx-[0.2vw]"
                    />
                    <div>
                      <p className="text-white font-bold text-[2vw]">{item.rating}</p>
                    </div>
                  </div>
                </div>
                <div className="absolute top-[9vw] px-[2vw] ">
                  <p className="text-black text-[3.5vw] text-wrap">{item.description}</p>
                </div>
                <div className="absolute left-[0.2vw] bottom-[8.5vw]">
                  <p className={`text-[3.5vw] text-[${colors.primary}] font-bold`}>{item.name}</p>
                </div>
                <div className="absolute left-[0.2vw] bottom-[4.5vw]">
                  <p className="text-[3vw] text-[#8DA0A8]">{item.occupation}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}



