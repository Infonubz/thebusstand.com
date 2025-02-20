import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { GetDiscountOffers, GetPromotion } from "../../../Api-TBS/Home/Home";

export default function Promotion() {
  const apicrmimage = process.env.REACT_APP_CRM_API_URL_IMAGE;

  const promotionlist = useSelector((state) => state?.promo_list);
  const offerlist = useSelector((state) => state?.discount_offer_list);
  const colors = useSelector((state) => state.themecolors[0]);
  const [totaloffer, setTotalOffer] = useState("");
  const [startIndex, setStartIndex] = useState(0);
  const [plusvalues, setPlusvalues] = useState(0);
  const dispatch = useDispatch();

  const prevSlide = () => {
    const newIndex = Math.max(0, startIndex - 1);
    setStartIndex(newIndex);
  };

  const nextSlide = () => {
    const newIndex = Math.min(startIndex + 1, offerlist?.response?.length - 5);
    setStartIndex(newIndex);
  };

  const updateStartIndex = () => {
    const width = window.innerWidth;
    if (width < 640) {
      // mobile
      setPlusvalues(1);
    } else if (width < 1024) {
      // tablet
      setPlusvalues(4);
    } else {
      // laptop and above
      setPlusvalues(5);
    }
  };

  useEffect(() => {
    // GetPromotion(dispatch);
    GetDiscountOffers(dispatch);
  }, [dispatch]);

  useEffect(() => {
    updateStartIndex(); // Set initial startIndex based on screen size
    window.addEventListener("resize", updateStartIndex); // Update startIndex on window resize
    return () => {
      window.removeEventListener("resize", updateStartIndex); // Cleanup event listener on component unmount
    };
  }, []);

  // useEffect(() => {
  //   let temp = [];

  //   if (Array.isArray(promotionlist)) {
  //     promotionlist.forEach((item) => {
  //       temp.push(item.background_image);
  //     });
  //   }
  //   if (Array.isArray(offerlist)) {
  //     offerlist.forEach((item) => {
  //       temp.push(item.theme);
  //     });
  //   }
  //   setTotalOffer(temp);
  // }, [promotionlist, offerlist]);

  return (
    <>
      <div
        className={`absolute w-full md:block hidden md:top-[34.5vw] top-[1vw] px-[5vw] h-[20vw] `}
      >
        <div
          className={`bg-[${colors.background}] w-[100%] h-[15vw] rounded-[2vw]  shadow-lg shadow-gray-400 relative`}
          style={{
            backgroundColor: colors.background,
          }}
        >
          <div className="h-[15%] w-full md:flex px-[2vw] items-center justify-between pt-[1.5vw] ">
            <p
              className={`md:text-[1.5vw] text-[5vw] font-bold text-[${colors.primary}]`}
            >
              Trending Offers
            </p>
            {offerlist?.response?.length > 5 && (
              <div className="">
                <Link to="/TrendingOffer" className="">
                  <button
                    className={`border-[0.1vw] border-[#AAAAAA] px-[1.5vw] py-[0.2vw] rounded-full text-[1vw] bg-white shadow-lg`}
                  >
                    View All
                  </button>
                </Link>
              </div>
            )}
          </div>
          <div className="h-[85%] w-full md:mt-0 mt-[5vw]">
            <div
              className={`grid lg:grid-cols-5 md:grid-cols-4  w-full h-full items-center gap-[1vw] justify-center px-[2vw]`}
            >
              {offerlist?.response?.length > 0 &&
                offerlist?.response
                  .slice(startIndex, startIndex + plusvalues)
                  .map((item, index) => (
                    <div key={index}>
                      {/* <div className="relative">
                      <img
                        src={item?.img}
                        className="w-[80vw] lg:h-[80%] md:h-[12vw] h-[40vw]"
                      />
                      <p className="absolute text-[0.8vw] left-[1.2vw] bottom-[2.5vw] text-white">
                        {`Valid till ${item?.valid}`}
                      </p>
                      <div className="w-auto h-[1.7vw] border-dashed flex items-center rounded-[0.2vw] border-[0.1vw] bg-opacity-20 bg-white border-white absolute left-[1.2vw] bottom-[0.6vw] px-[1.5vw]   text-white">
                        <p className="text-[1vw]">{item?.coupon}</p>
                        <img
                          src={clipboard}
                          className="absolute bottom-[0.2vw] right-[-2.2vw] h-[1.5vw] w-[1.5vw] cursor-pointer"
                          onClick={() => copyCouponCode(item)}
                        />
                      </div>
                    </div> */}
                      <div className="relative">
                        <div className={`absolute left-[4.6vw] top-0`}>
                          <div
                            className={`bg-[${colors.background}] w-[1.6vw] h-[0.8vw] rounded-b-full`}
                          ></div>
                        </div>
                        {/* <div
                          className={`absolute border-white border-[.1vw] h-[8vw] top-[.9vw] border-dashed left-[5.4vw]`}
                        ></div> */}
                        <img
                          alt="background_Image"
                          src={`${apicrmimage}${item?.theme ? item?.theme :item?.background_image}`}
                          className="w-[80vw] lg:h-[9.5vw] md:h-[8vw] h-[40vw]"
                        />
                        <div className={`absolute left-[4.6vw] bottom-0`}>
                          <div
                            className={`bg-[${colors.background}] w-[1.6vw] h-[0.8vw] rounded-t-full rounded-b-[0.5vw]`}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
            </div>
          </div>
          {startIndex > 0 && offerlist?.response?.length > 5 && (
            <div className={`absolute left-[-3vw] top-[50%]`}>
              <button
                className={`cursor-pointer  p-2 rounded-full`}
                onClick={prevSlide}
                style={{ zIndex: -10 }}
              >
                <IoIosArrowBack size={"2.5vw"} color={`${colors.primary}`} />
              </button>
            </div>
          )}
          <div className={`absolute right-[-3vw] top-[50%]`}>
            {offerlist?.response?.length > 5 && startIndex < offerlist?.response?.length - 5 && (
              <button
                className={`cursor-pointer  p-2 rounded-full`}
                onClick={nextSlide}
              >
                <IoIosArrowForward size={"2.5vw"} color={`${colors.primary}`} />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* --------------------------------MObileView------------------------------------------- */}

      <div className="absolute w-full md:hidden block md:top-[35vw] top-[120vw] px-[5vw] h-[20vw]">
        <div className="flex items-center justify-between mt-[1vw] ">
          <p
            className={`md:text-[1.5vw] text-[5vw] font-bold text-[${colors.primary}]`}
          >
            Trending Offers
          </p>
          <Link
            to="/TrendingOffer"
            className={`px-[2vw] py-[2vw] md:border-[0.1vw] text-[3vw] md:border-[#AAAAAA] md:px-[1.5vw] md:py-[0.2vw] rounded-full md:text-[1vw] `}
          >
            View All
          </Link>
        </div>

        <div className={`flex overflow-x-auto scrollbar-hide mt-[2vw]`}>
          {/* <div className="flex"> */}

          {offerlist?.response?.length > 0 &&
            offerlist?.response?.map((item, index) => (
              <div key={index} className={`relative flex-shrink-0 mr-[2vw]`}>
                <img
                  alt="background_image"
                  src={`${apicrmimage}${item?.theme ? item?.theme :item?.background_image}`}
                  className="w-[80vw] lg:h-[80%] md:h-[12vw] h-[45vw] relative z-10" // Ensure z-index is higher
                />
                {/* <div
                  className={` absolute border-dashed  border-white h-[38vw] border-[.4vw]  top-[4.5vw] left-[26vw] z-20`}
                ></div> */}
                <span className={`absolute left-[22vw] top-[-.2vw] z-20`}>
                  <div
                    className={`bg-[${colors.background}]  border-none w-[8vw] h-[4vw] rounded-b-full`}
                  ></div>
                </span>
                <span className={`absolute left-[22vw] bottom-[-.2vw] z-20`}>
                  <div
                    className={`bg-[${colors.background}]  border-none w-[8vw] h-[4vw] rounded-t-full`}
                  ></div>
                </span>
              </div>
            ))}
          {/* {currentoffers.map((item, index) => (
              <div key={index} className="relative flex-shrink-0 mr-[4vw]">
                <img src={item?.img} className="w-[80vw] h-[45vw]" />
                <p className="absolute text-[4vw] font-semibold left-[7vw] bottom-[12vw] text-white">
                  {`Valid till ${item?.valid}`}
                </p>
                <div className="w-[50vw] h-[7vw] border-dashed flex items-center rounded-[1vw] border-[0.1vw] bg-opacity-20 bg-white border-white absolute left-[7vw] bottom-[3vw] px-[1.5vw] text-white">
                  <p className="text-[5vw] font-bold">{item?.coupon}</p>
                  <img
                    src={clipboard}
                    className="absolute bottom-[0.2vw] right-[-10vw] h-[7vw] w-[7vw] cursor-pointer"
                    onClick={() => copyCouponCode(item)}
                  />
                </div>
              </div>
            ))} */}
          {/* </div> */}
        </div>
      </div>
    </>
  );
}
