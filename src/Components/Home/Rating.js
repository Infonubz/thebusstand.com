// import React, { useEffect, useState } from "react";
// //import shape from "../../assets/shape.png";
// import double from "../../assets/doubl.png";
// import { FaStar } from "react-icons/fa";
// import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
// import { useDispatch, useSelector } from "react-redux";
// import { GetFeedbacks } from "../../Api/MyAccounts/RatingFeedBack.js";
// import { Popover } from "antd";
// import { capitalizeFirstLetter } from "../Common/Captalization";
// //import ColorCodes from "../Common/ColorCodes";
// import { useNavigate } from "react-router";

// export default function Rating() {

//   const [startIndex, setStartIndex] = useState(0);
//   const navigation = useNavigate();
//   const dispatch = useDispatch();
//   const ratingdata = useSelector((state) => state.feed_back);
//   const colors = useSelector((state) => state.themecolors[0]);
//   // const colors=ColorCodes()

//   // const ratingdata = [
//   //   {
//   //     rating: "4.5",
//   //     description: "Accurating real-time tracking. Excellent!",
//   //     name: "Harish Yarrabothula",
//   //     occupation: "Nubiznez Pvt. Ltd.",
//   //   },
//   //   {
//   //     rating: "3.5",
//   //     description: "Very convenient for daily commute.",
//   //     name: "P Manoj",
//   //     occupation: "Incture Technologies",
//   //   },
//   //   {
//   //     rating: "2.5",
//   //     description: "Reliable schedules, moderating ticket booking.",
//   //     name: "Praveen K P",
//   //     occupation: "Neudesic",
//   //   },
//   //   {
//   //     rating: "1.5",
//   //     description: "Good App, but bus I booked was bad.",
//   //     name: "Virushne V K",
//   //     occupation: "Nous Infosystems",
//   //   },
//   //   {
//   //     rating: "4.0",
//   //     description: "Perfect for planning bus journeys.",
//   //     name: "MithunKumar V",
//   //     occupation: "PathPartner Technology",
//   //   },
//   //   {
//   //     rating: "1.0",
//   //     description: "Unable to Book, Faced lot of issues.",
//   //     name: "Vigashne",
//   //     occupation: "RapidValue Solutions",
//   //   },

//   // ];

//   const prevSlide = () => {
//     const newIndex = Math.max(0, startIndex - 1);
//     setStartIndex(newIndex);
//   };

//   const nextSlide = () => {
//     const newIndex = Math.min(startIndex + 1, ratingdata?.length - 4);
//     setStartIndex(newIndex);
//   };

//   useEffect(() => {
//     GetFeedbacks(dispatch);
//   }, [dispatch]);

//   console.log(startIndex, "startIndex");

//   return (
//     <div className="px-[5vw] py-[1vw] ">
//       <div className="flex justify-between items-center">
//         <p
//           className={`text-[3.2vw] my-[2vw] md:my-0  md:text-[1.6vw]  text-[${colors.primary}] font-bold pt-[1vw] px-[2vw] pb-[1vw]`}
//         >
//           Here’s what a few of our customers have to say about us
//         </p>
//         <div>
//           <button
//             className="text-[2.5vw] text-[#1F487C] md:border-[0.1vw] md:border-[#AAAAAA] md:px-[1.5vw] md:py-[0.2vw] md:rounded-full md:text-[1vw] md:bg-white md:shadow-lg"
//             onClick={() => navigation("/CustomerRatings")}
//           >
//             View all
//           </button>
//         </div>
//       </div>
//       {/* DesktopView */}
//       <div className="pl-[2vw]  py-[1vw] md:block hidden ">
//         <div className="grid grid-cols-4 w-full gap-[1vw]  h-[10%] relative ">
//           {ratingdata.slice(startIndex, startIndex + 4).map((item, index) => (
//             <div key={index} className="col-span-1 w-full h-full relative ">
//               {/* <img src={shape} className="h-[100%] w-full " /> */}
//               <div className=" rounded-[.5vw] h-[8vw] w-full bg-[#f5f6f7] shadow-lg  ">
//                 <img
//                   src={double}
//                   className="absolute left-[2vw] top-[1vw] w-[2vw] h-[2vw] "
//                 />
//                 <div className="absolute right-[2vw] top-[1vw]">
//                   <div
//                     className={`w-[6.3vw] h-[2.5vh] sm:w-[4vw] sm:h-[2vw] ${
//                       item.rating == "5"
//                         ? "bg-[#61B00F]"
//                         : item.rating == "4"
//                         ? "bg-[#61B00F]"
//                         : item.rating == "3"
//                         ? "bg-[#FF910E]"
//                         : item.rating == "2"
//                         ? "bg-[#FF910E]"
//                         : "bg-[#EA222F]"
//                     } flex items-center justify-center rounded-[0.2vw]`}
//                   >
//                     <FaStar
//                       style={{
//                         color: "white",
//                       }}
//                       size={"1.4vw"}
//                       className="mx-[0.2vw]"
//                     />
//                     <div>
//                       <p className="text-white font-bold text-[1.15vw]">
//                         {item.rating}
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//                 {}
//                 <div className="absolute bottom-[1vw] px-[2vw] items-center justify-center flex">
//                   {item?.description?.length > 60 ? (
//                     <Popover
//                       content={item.description}
//                       trigger="hover"
//                       overlayStyle={{ maxWidth: "20vw" }}
//                     >
//                       <p
//                         className={` text-[${colors.primary}] text-[1.1vw]`}
//                       >{`${capitalizeFirstLetter(
//                         item?.description?.slice(0, 60)
//                       )}...`}</p>
//                     </Popover>
//                   ) : (
//                     <p
//                       className={`text-[${colors.primary}] text-[1.1vw] items-center justify-center flex`}
//                     >
//                       {capitalizeFirstLetter(item.description)}
//                     </p>
//                   )}
//                 </div>
//                 <div className="absolute left-[0.2vw] bottom-[-2vw]">
//                   <p
//                     className={`text-[1.1vw] text-[${colors.primary}] font-bold`}
//                   >
//                     {item.name}
//                   </p>
//                 </div>
//                 <div className="absolute left-[0.2vw] bottom-[-3.5vw] ">
//                   <p className="text-[1.1vw] text-[#8DA0A8] ">
//                     {item.occupation}
//                   </p>
//                 </div>
//               </div>
//             </div>
//           ))}
//          <div className="absolute left-[-4vw] top-[50%]">
//             {startIndex > 0 && ratingdata?.length > 3 && (
//               <button
//                 className="cursor-pointer  p-2 rounded-full "
//                 onClick={prevSlide}
//                 style={{ zIndex: -10 }}
//               >
//                 <IoIosArrowBack size={"2vw"} />
//               </button>
//             )}
//           </div>
//           <div className="absolute right-[-4vw] top-[50%]">
//             {ratingdata?.length > 4 && startIndex < ratingdata?.length - 5 && (
//               <button
//                 className="cursor-pointer  p-2 rounded-full "
//                 onClick={nextSlide}
//               >
//                 <IoIosArrowForward size={"2vw"} color={`${colors.primary}`} />
//               </button>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Mobile View */}

//       <div className="md:hidden block">
//         <div className="overflow-x-auto whitespace-nowrap scrollbar-hide">
//           <div className="flex space-x-2 h-[40vw]">
//             {ratingdata.map((item, index) => (
//               <div key={index} className="relative flex-none w-[60vw]">
//                 <div className=" rounded-[.5vw] h-[25vw] w-full bg-[#f5f6f7] shadow-lg  ">
//                   {/* <img src={shape} className="w-[60vw] " /> */}
//                   <img
//                   alt="double"
//                     src={double}
//                     className="absolute left-[2vw] top-[2vw] w-[5vw] h-[5vw]"
//                   />
//                   <div className="absolute right-[3vw] top-[2vw]">
//                     <div
//                       className={`w-[10vw] h-[2.5vh] ${
//                         item.rating === "5"
//                           ? "bg-[#61B00F]"
//                           : item.rating === "4"
//                           ? "bg-[#61B00F]"
//                           : item.rating === "3"
//                           ? "bg-[#FF910E]"
//                           : item.rating === "2"
//                           ? "bg-[#FF910E]"
//                           : "bg-[#EA222F]"
//                       } flex space-x-[0.1vw] justify-center items-center rounded-[0.2vw]`}
//                     >
//                       <FaStar
//                         style={{
//                           color: "white",
//                         }}
//                         size={"4.2vw"}
//                         className="mx-[0.2vw]"
//                       />
//                       <div>
//                         <p className="text-white font-bold text-[4vw] pt-[0.5vw]">
//                           {item.rating}
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="absolute top-[9vw] px-[2vw] ">
//                     <p className="text-black text-[3.5vw] text-wrap">
//                       {item?.description?.length > 60 ? (
//                         <Popover
//                           content={item.description}
//                           trigger="hover"
//                           overlayStyle={{ maxWidth: "70vw" }}
//                         >
//                           <p
//                             className={` text-[${colors.primary}] text-[3.5vw]`}
//                           >{`${capitalizeFirstLetter(
//                             item?.description?.slice(0, 60)
//                           )}...`}</p>
//                         </Popover>
//                       ) : (
//                         <p
//                           className={`text-[${colors.primary}] text-[3.5vw] items-center justify-center flex`}
//                         >
//                           {capitalizeFirstLetter(item.description)}
//                         </p>
//                       )}
//                     </p>
//                   </div>
//                   <div className="absolute left-[0.2vw] bottom-[8.5vw]">
//                     <p
//                       className={`text-[3.5vw] text-[${colors.primary}] font-bold`}
//                     >
//                       {item.name}
//                     </p>
//                   </div>
//                   <div className="absolute left-[0.2vw] bottom-[4.5vw]">
//                     <p className="text-[3vw] text-[#8DA0A8]">
//                       {item.occupation}
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import {
  IoIosArrowBack,
  IoIosArrowDropleftCircle,
  IoIosArrowDroprightCircle,
  IoIosArrowForward,
} from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { GetFeedbacks } from "../../Api/MyAccounts/RatingFeedBack.js";
import { useNavigate } from "react-router";
import { Rate } from "antd";
import { capitalizeFirstLetter } from "../Common/Captalization.js";
import dayjs from "dayjs";

export default function Rating() {
  const [startIndex, setStartIndex] = useState(0);
  const itemsPerPage = 3; // Number of items per slide
  const navigation = useNavigate();
  const dispatch = useDispatch();
  const ratingdata = useSelector((state) => state.feed_back);
  const colors = useSelector((state) => state.themecolors[0]);

  const prevSlide = () => {
    // Ensure we don’t go below zero
    setStartIndex((prev) => Math.max(prev - itemsPerPage, 0));
  };

  const nextSlide = () => {
    // Ensure we don’t exceed the array length
    setStartIndex((prev) =>
      Math.min(prev + itemsPerPage, ratingdata.length - itemsPerPage)
    );
  };
  const getColorForValue = (value) => {
    if (value <= 0) return "#FFDD2B";
    if (value <= 1) return "#FF2A2A";
    if (value <= 2) return "#FF4A22";
    if (value <= 3) return "#00cc20";
    if (value <= 4) return "#00cc20";
    return "#00cc20";
  };

  useEffect(() => {
    GetFeedbacks(dispatch);
  }, [dispatch]);
  console.log(ratingdata, "ratingdataratingdata");
  // const [startIndex, setStartIndex] = useState(0);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setStartIndex((prevIndex) => (prevIndex + 1) % ratingdata.length);
  //   }, 3000); // Adjust time (3000ms = 3s) as needed

  //   return () => clearInterval(interval); // Clear interval on component unmount
  // }, [ratingdata.length]);
  return (
    <>
      <div className="px-[5vw] py-[1vw] relative">
        <div className="flex justify-between items-center">
          <p
            className={`text-[3.2vw] my-[2vw] md:my-0 md:text-[1.6vw] text-[${colors.primary}] font-bold pt-[1vw] px-[2vw] pb-[1vw]`}
          >
            Here’s what a few of our customers have to say about us
          </p>
          <div>
            <button
              className="text-[2.5vw] text-[#1F487C] md:border-[0.1vw] md:border-[#AAAAAA] md:px-[1.5vw] md:py-[0.2vw] md:rounded-full md:text-[1vw] md:bg-white md:shadow-lg"
              onClick={() => navigation("/CustomerRatings")}
            >
              View all
            </button>
          </div>
        </div>
        {/* Desktop View */}

        <div className="pl-[2vw]  md:block hidden items-center flex">
          {startIndex > 0 && ratingdata?.length > 4 && (
            <div className=" absolute left-[4vw] top-[9vw]">
              <button onClick={prevSlide} disabled={startIndex === 0}>
                <IoIosArrowDropleftCircle size={"2vw"} color="#1F487C" />
              </button>
            </div>
          )}
          <div
            className="w-full gap-[1vw] items-center relative flex transition-transform duration-500 ease-in-out"
            // style={{ transform: `translateX(-${startIndex * 20}%)` }}
          >
            {ratingdata
              .slice(startIndex, startIndex + itemsPerPage)
              .map((item, index) => (
                <div
                  key={index}
                  className={`${
                    index === 1
                      ? "w-[50%] h-auto py-[1vw] shadow-lg"
                      : "w-[25%] h-auto shadow-md"
                  } rounded-[.5vw] bg-[#f5f6f7]`}
                >
                  <div className="flex justify-between items-center px-[1vw] pt-[0.5vw]">
                    <div className="flex flex-col">
                      <p className="font-bold text-[1vw]">{item.name}</p>
                      <p className="text-[0.8vw] text-gray-500">
                        {item.occupation}
                      </p>
                    </div>
                    <div className="flex flex-col justify-end items-end">
                      <Rate
                        defaultValue={item.rating}
                        style={{
                          fontSize: "1vw",
                          color: getColorForValue(item.rating),
                        }}
                        disabled
                      />
                      <p className="text-[0.8vw] text-gray-500 right-0">
                        {dayjs(item.created_at).format("MMM DD, YYYY")}
                      </p>
                    </div>
                  </div>
                  <div className="py-[1vw] px-[1vw]">
                    <p className="text-[0.9vw]">
                      {capitalizeFirstLetter(item.description)}
                    </p>
                  </div>
                </div>
              ))}
          </div>
          {ratingdata?.length > 4 && startIndex < ratingdata?.length - 5 && (
            <div className=" absolute right-[2vw] top-[9vw]">
              <button
                onClick={nextSlide}
                disabled={startIndex >= ratingdata.length - itemsPerPage}
              >
                <IoIosArrowDroprightCircle size={"2vw"} color="#1F487C" />
              </button>
            </div>
          )}
        </div>

        <div className="md:hidden block">
          <div className="overflow-x-auto whitespace-nowrap scrollbar-hide">
            <div className="flex space-x-2 h-[40vw]">
              <div
                className="w-full gap-x-[2vw] items-center relative flex transition-transform duration-500 ease-in-out"
                // style={{ transform: `translateX(-${startIndex * 20}%)` }}
              >
                {ratingdata?.map((item, index) => (
                  <div
                    key={index}
                    className={`flex w-auto flex-col justify-center px-[2vw] rounded-[.5vw] bg-[#f5f6f7]`}
                  >
                    <div className="flex justify-between items-center px-[3vw] pt-[0.5vw]">
                      <div className="flex flex-col">
                        <p className="font-bold text-[4vw]">{item.name}</p>
                        <p className="text-[3vw] text-gray-500">
                          {item.occupation}
                        </p>
                      </div>
                      <div className="flex flex-col justify-end items-end">
                        <Rate
                          defaultValue={item.rating}
                          style={{
                            fontSize: "3vw",
                            color: getColorForValue(item.rating),
                          }}
                        />
                        <p className="text-[2.5vw] text-gray-500 right-0">
                          {dayjs(item.created_at).format("MMM DD, YYYY")}
                        </p>
                      </div>
                    </div>
                    <div className="py-[3vw] px-[3vw]">
                      <p className="text-[3.5vw]">
                        {capitalizeFirstLetter(item.description)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
