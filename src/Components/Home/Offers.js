import React, { useEffect, useState, useMemo } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
// Corporate Travellers
import CT1 from "../../assets/Promotion/Deals/Corporate Travellers/Frame 1.png";
import CT2 from "../../assets/Promotion/Deals/Corporate Travellers/Frame 2.png";
import CT3 from "../../assets/Promotion/Deals/Corporate Travellers/Frame 3.png";
import CT4 from "../../assets/Promotion/Deals/Corporate Travellers/Frame 4.png";
import CT5 from "../../assets/Promotion/Deals/Corporate Travellers/Frame 5.png";
import CT6 from "../../assets/Promotion/Deals/Corporate Travellers/Frame 6.png";
import CT7 from "../../assets/Promotion/Deals/Corporate Travellers/Frame 7.png";
// General People
import GP1 from "../../assets/Promotion/Deals/General People/Frame 1.png";
import GP2 from "../../assets/Promotion/Deals/General People/Frame 2.png";
import GP3 from "../../assets/Promotion/Deals/General People/Frame 3.png";
import GP4 from "../../assets/Promotion/Deals/General People/Frame 4.png";
import GP5 from "../../assets/Promotion/Deals/General People/Frame 5.png";
import GP6 from "../../assets/Promotion/Deals/General People/Frame 6.png";
import GP7 from "../../assets/Promotion/Deals/General People/Frame 7.png";
// Physically Challenged Travellers
import PCT1 from "../../assets/Promotion/Deals/Physically Challenged Travellers/Frame 1.png";
import PCT2 from "../../assets/Promotion/Deals/Physically Challenged Travellers/Frame 2.png";
import PCT3 from "../../assets/Promotion/Deals/Physically Challenged Travellers/Frame 3.png";
import PCT4 from "../../assets/Promotion/Deals/Physically Challenged Travellers/Frame 4.png";
import PCT5 from "../../assets/Promotion/Deals/Physically Challenged Travellers/Frame 5.png";
import PCT6 from "../../assets/Promotion/Deals/Physically Challenged Travellers/Frame 6.png";
import PCT7 from "../../assets/Promotion/Deals/Physically Challenged Travellers/Frame 7.png";
// Piligrims Travellers
import PT1 from "../../assets/Promotion/Deals/Piligrims Travellers/Frame 1.png";
import PT2 from "../../assets/Promotion/Deals/Piligrims Travellers/Frame 2.png";
import PT3 from "../../assets/Promotion/Deals/Piligrims Travellers/Frame 3.png";
import PT4 from "../../assets/Promotion/Deals/Piligrims Travellers/Frame 4.png";
import PT5 from "../../assets/Promotion/Deals/Piligrims Travellers/Frame 5.png";
import PT6 from "../../assets/Promotion/Deals/Piligrims Travellers/Frame 6.png";
import PT7 from "../../assets/Promotion/Deals/Piligrims Travellers/Frame 7.png";
// Senior Citizens
import SC1 from "../../assets/Promotion/Deals/Senior Citizens/Frame 1.png";
import SC2 from "../../assets/Promotion/Deals/Senior Citizens/Frame 2.png";
import SC3 from "../../assets/Promotion/Deals/Senior Citizens/Frame 3.png";
import SC4 from "../../assets/Promotion/Deals/Senior Citizens/Frame 4.png";
import SC5 from "../../assets/Promotion/Deals/Senior Citizens/Frame 5.png";
import SC6 from "../../assets/Promotion/Deals/Senior Citizens/Frame 6.png";
import SC7 from "../../assets/Promotion/Deals/Senior Citizens/Frame 7.png";
// Student
import S1 from "../../assets/Promotion/Deals/Student/Frame 1.png";
import S2 from "../../assets/Promotion/Deals/Student/Frame 2.png";
import S3 from "../../assets/Promotion/Deals/Student/Frame 3.png";
import S4 from "../../assets/Promotion/Deals/Student/Frame 4.png";
import S5 from "../../assets/Promotion/Deals/Student/Frame 5.png";
import S6 from "../../assets/Promotion/Deals/Student/Frame 6.png";
import S7 from "../../assets/Promotion/Deals/Student/Frame 7.png";
// Tourist
import T1 from "../../assets/Promotion/Deals/Tourist/TOURIST-FRAME1.png";
import T2 from "../../assets/Promotion/Deals/Tourist/TOURIST-FRAME2.png";
import T3 from "../../assets/Promotion/Deals/Tourist/TOURIST-FRAME3.png";
import T4 from "../../assets/Promotion/Deals/Tourist/TOURIST-FRAME4.png";
import T5 from "../../assets/Promotion/Deals/Tourist/TOURIST-FRAME5.png";
import T6 from "../../assets/Promotion/Deals/Tourist/TOURIST-FRAME6.png";
import T7 from "../../assets/Promotion/Deals/Tourist/TOURIST-FRAME7.png";
//import clipboard from "../../assets/clipboard.png";
//import { toast } from "react-toastify";
import { Link } from "react-router-dom";
//import TrendingOffer from "../Home/TrendingOffer";
import { useDispatch, useSelector } from "react-redux";
import { GetPromotion } from "../../Api/Home/Home";
//import ColorCodes from "../Common/ColorCodes";

function Offers() {
  const [startIndex, setStartIndex] = useState(0);
  const [currentoffers, setCurrentOffer] = useState([]);
  const [plusvalues, setPlusvalues] = useState(0);
  const promotionlist = useSelector((state) => state?.promo_list);
  const colors = useSelector((state) => state.themecolors[0]);
  const dispatch = useDispatch();
  // const colors=ColorCodes()
  const apiUrlimage = process.env.REACT_APP_API_URL_IMAGE;

  const apicrmimage = process.env.REACT_APP_CRM_API_URL_IMAGE;
  const CorporateTravellers = useMemo(
    () => [
      { img: CT1, valid: "30 May", coupon: "BUCKS14" },
      { img: CT2, valid: "15 JUN", coupon: "AVIS100" },
      { img: CT3, valid: "20 JUN", coupon: "20HILTON" },
      { img: CT4, valid: "30 MAY", coupon: "DROP50" },
      { img: CT5, valid: "10 JUN", coupon: "AMAZON70" },
      { img: CT6, valid: "25 May", coupon: "FEDEX15" },
      { img: CT7, valid: "18 JUN", coupon: "10UBER" },
    ],
    []
  );

  const GeneralPeople = useMemo(
    () => [
      { img: GP1, valid: "23 JUN", coupon: "NOISE80" },
      { img: GP2, valid: "15 JUN", coupon: "SUMMERSALE10" },
      { img: GP3, valid: "21 JUN", coupon: "ICICI400" },
      { img: GP4, valid: "07 MAY", coupon: "JOS18" },
      { img: GP5, valid: "18 JUN", coupon: "GPAY25" },
      { img: GP6, valid: "27 May", coupon: "NEXT149" },
      { img: GP7, valid: "19 JUN", coupon: "DISCOUNT999" },
    ],
    []
  );

  const PhysicallyChallengedTravellers = useMemo(
    () => [
      { img: PCT1, valid: "14 JUN", coupon: "ACCESS20" },
      { img: PCT2, valid: "18 JUN", coupon: "EAR30EASE" },
      { img: PCT3, valid: "01 MAY", coupon: "THERAPY25" },
      { img: PCT4, valid: "28 JUN", coupon: "WHEEL10" },
      { img: PCT5, valid: "14 May", coupon: "ROOM20" },
      { img: PCT6, valid: "13 JUN", coupon: "25PHARM" },
      { img: PCT7, valid: "06 May", coupon: "LENS100" },
    ],
    []
  );

  const PiligrimsTravellers = useMemo(
    () => [
      { img: PT1, valid: "08 May", coupon: "SPOTI100" },
      { img: PT2, valid: "19 JUN", coupon: "JEWEL15" },
      { img: PT3, valid: "04 JUN", coupon: "10YOGOO" },
      { img: PT4, valid: "20 MAY", coupon: "1SOULGUID" },
      { img: PT5, valid: "14 JUN", coupon: "KINDLE100" },
      { img: PT6, valid: "15 May", coupon: "BREETHE20" },
      { img: PT7, valid: "19 JUN", coupon: "100BUSTAND" },
    ],
    []
  );

  const SeniorCitizens = useMemo(
    () => [
      { img: SC1, valid: "14 May", coupon: "DINE10" },
      { img: SC2, valid: "05 JUN", coupon: "TICKET299" },
      { img: SC3, valid: "19 JUN", coupon: "299FIT" },
      { img: SC4, valid: "22 MAY", coupon: "SHOPPER75" },
      { img: SC5, valid: "03 JUN", coupon: "MELODIA49" },
      { img: SC6, valid: "08 May", coupon: "WANDER15" },
      { img: SC7, valid: "01 JUN", coupon: "50SWIGGY" },
    ],
    []
  );

  const Student = useMemo(
    () => [
      { img: S1, valid: "15 May", coupon: "CLASS10" },
      { img: S2, valid: "07 JUN", coupon: "90UDEMY" },
      { img: S3, valid: "30 JUN", coupon: "10SWIGG50" },
      { img: S4, valid: "25 MAY", coupon: "GLOBAL15" },
      { img: S5, valid: "17 JUN", coupon: "SKULL70" },
      { img: S6, valid: "28 May", coupon: "AMAZON65" },
      { img: S7, valid: "28 JUN", coupon: "SKYWING35" },
    ],
    []
  );

  const Tourist = useMemo(
    () => [
      { img: T1, valid: "15 May", coupon: "HOTELFREE" },
      { img: T2, valid: "25 JUN", coupon: "EXCURSION50" },
      { img: T3, valid: "04 JUN", coupon: "BAZAAR100" },
      { img: T4, valid: "11 MAY", coupon: "179SKYLINE" },
      { img: T5, valid: "31 JUN", coupon: "BUSSTAND20" },
      { img: T6, valid: "01 May", coupon: "TOWN15" },
      { img: T7, valid: "23 JUN", coupon: "TOURS25" },
    ],
    []
  );

  const prevSlide = () => {
    const newIndex = Math.max(0, startIndex - 1);
    setStartIndex(newIndex);
    console.log(newIndex, startIndex, "newIndex");
  };

  const nextSlide = () => {
    const newIndex = Math.min(startIndex + 1, currentoffers?.length - 5);
    setStartIndex(newIndex);
    console.log(startIndex, newIndex, "nextIndex");
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

  // const copyCouponCode = (item) => {
  //   const couponCode = item?.coupon;
  //   if (couponCode) {
  //     navigator.clipboard
  //       .writeText(couponCode)
  //       .then(() => {
  //         // alert('Coupon code copied to clipboard!');
  //         toast.success("Coupon code copied to clipboard: ");
  //       })
  //       .catch((err) => {
  //         // console.error('Failed to copy coupon code: ', err);
  //         toast.error("Failed to copy coupon code:", err);
  //       });
  //   }
  // };

  useEffect(() => {
    const occupation = localStorage.getItem("occupation");
    if (occupation === "Corporate Travellers") {
      setCurrentOffer(CorporateTravellers);
    } else if (occupation === "General People") {
      setCurrentOffer(GeneralPeople);
    } else if (occupation === "Physically Challenged Travellers") {
      setCurrentOffer(PhysicallyChallengedTravellers);
    } else if (occupation === "Piligrims Travellers") {
      setCurrentOffer(PiligrimsTravellers);
    } else if (occupation === "Senior Citizens") {
      setCurrentOffer(SeniorCitizens);
    } else if (occupation === "Student") {
      setCurrentOffer(Student);
    } else if (occupation === "Tourist") {
      setCurrentOffer(Tourist);
    } else {
      setCurrentOffer(GeneralPeople);
    }
  }, [
    CorporateTravellers,
    GeneralPeople,
    PhysicallyChallengedTravellers,
    PiligrimsTravellers,
    SeniorCitizens,
    Student,
    Tourist,
  ]);

  useEffect(() => {
    updateStartIndex(); // Set initial startIndex based on screen size
    window.addEventListener("resize", updateStartIndex); // Update startIndex on window resize

    return () => {
      window.removeEventListener("resize", updateStartIndex); // Cleanup event listener on component unmount
    };
  }, []);

  useEffect(() => {
    GetPromotion(dispatch);
  }, [dispatch]);

  console.log(`${apicrmimage}${promotionlist[0]?.background_image}`, "promotionlist");
  console.log(colors, "colorscolorscolorscolorscolors");

  return (
    <div>
      <div
        className={`absolute w-full md:block hidden md:top-[34.5vw] top-[122vw] px-[5vw] h-[20vw] `}
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
            <div className="">
              <Link to="/TrendingOffer" className="">
                <button
                  className={`border-[0.1vw] border-[#AAAAAA] px-[1.5vw] py-[0.2vw] rounded-full text-[1vw] bg-white shadow-lg`}
                >
                  View all
                </button>
              </Link>
            </div>
          </div>
          <div className="h-[85%] w-full md:mt-0 mt-[5vw]">
            <div
              className={`grid lg:grid-cols-5 md:grid-cols-4  w-full h-full items-center gap-[1vw] justify-center px-[2vw]`}
            >
              {promotionlist?.length > 0 &&
                promotionlist
                  .slice(startIndex, startIndex + plusvalues)
                  .map((item, index) => (
                    <>
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
                        <div
                          className={`absolute border-white border-[.1vw] h-[8vw] top-[.9vw] border-dashed left-[5.4vw]`}
                        ></div>
                        <img
                          alt="background_Image"
                          src={`${apicrmimage}${item?.background_image}`}
                          className="w-[80vw] lg:h-[9.5vw] md:h-[8vw] h-[40vw]"
                        />
                        <div className={`absolute left-[4.6vw] bottom-0`}>
                          <div
                            className={`bg-[${colors.background}] w-[1.6vw] h-[0.8vw] rounded-t-full rounded-b-[0.5vw]`}
                          ></div>
                        </div>
                      </div>
                    </>
                  ))}
            </div>
          </div>
          {startIndex > 0 && promotionlist?.length > 5 && (
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
            {promotionlist?.length > 5 &&
              startIndex < promotionlist?.length - 5 && (
                <button
                  className={`cursor-pointer  p-2 rounded-full`}
                  onClick={nextSlide}
                >
                  <IoIosArrowForward
                    size={"2.5vw"}
                    color={`${colors.primary}`}
                  />
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
            className={`text-[${colors.primary}] px-[2vw] py-[2vw] md:border-[0.1vw] text-[3vw] md:border-[#AAAAAA] md:px-[1.5vw] md:py-[0.2vw] rounded-full md:text-[1vw] `}
          >
            View all
          </Link>
        </div>

        <div className={`flex overflow-x-auto scrollbar-hide mt-[2vw]`}>
          {/* <div className="flex"> */}

          {promotionlist?.length > 0 &&
            promotionlist.map((item, index) => (
              <div key={index} className={`relative flex-shrink-0 mr-[2vw]`}>
                <img
                  alt="background_image"
                  src={`${apicrmimage}${item?.background_image}`}
                  className="w-[80vw] lg:h-[80%] md:h-[12vw] h-[45vw] relative z-10" // Ensure z-index is higher
                />
                <div
                  className={` absolute border-dashed  border-white h-[38vw] border-[.4vw]  top-[4.5vw] left-[26vw] z-20`}
                ></div>
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
    </div>
  );
}

export default Offers;
