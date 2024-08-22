import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ModalPopup from "../MainComponenet/Modal/ModalPopup";
import { IoMdArrowBack } from "react-icons/io";

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
import clipboard from "../../assets/clipboard.png";
import join from "../../assets/join.png";
import buslogo from "../../../src/assets/502-ai 1.png";
import busstand from "../../../src/assets/busstand.png";
import bus from "../../../src/assets/bus 1.png";
import share from "../../../src/assets//Share.png";
import ticket from "../../../src/assets/ticket.png";
import profile from "../../../src/assets/Profile.png";
import ShareButtons from "../MainComponenet/ShareButton";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

const TrendingOffer = () => {
  const [showDialog, setShowDialog] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [startIndex, setStartIndex] = useState(0);
  const [currentoffers, setCurrentOffer] = useState([]);
  const CorporateTravellers = [
    { img: CT1, valid: "30 May", coupon: "BUCKS14" },
    { img: CT2, valid: "15 JUN", coupon: "AVIS100" },
    { img: CT3, valid: "20 JUN", coupon: "20HILTON" },
    { img: CT4, valid: "30 MAY", coupon: "DROP50" },
    { img: CT5, valid: "10 JUN", coupon: "AMAZON70" },
    { img: CT6, valid: "25 May", coupon: "FEDEX15" },
    { img: CT7, valid: "18 JUN", coupon: "10UBER" },
  ];
  const GeneralPeople = [
    { img: GP1, valid: "23 JUN", coupon: "NOISE80" },
    { img: GP2, valid: "15 JUN", coupon: "SUMMERSALE10" },
    { img: GP3, valid: "21 JUN", coupon: "ICICI400" },
    { img: GP4, valid: "07 MAY", coupon: "JOS18" },
    { img: GP5, valid: "18 JUN", coupon: "GPAY25" },
    { img: GP6, valid: "27 May", coupon: "NEXT149" },
    { img: GP7, valid: "19 JUN", coupon: "DISCOUNT999" },
    { img: GP1, valid: "23 JUN", coupon: "NOISE80" },
    { img: GP2, valid: "15 JUN", coupon: "SUMMERSALE10" },
    { img: GP3, valid: "21 JUN", coupon: "ICICI400" },
    { img: GP4, valid: "07 MAY", coupon: "JOS18" },
    { img: GP5, valid: "18 JUN", coupon: "GPAY25" },
    { img: GP6, valid: "27 May", coupon: "NEXT149" },
    { img: GP7, valid: "19 JUN", coupon: "DISCOUNT999" },
    { img: GP1, valid: "23 JUN", coupon: "NOISE80" },
    { img: GP2, valid: "15 JUN", coupon: "SUMMERSALE10" },
    { img: GP3, valid: "21 JUN", coupon: "ICICI400" },
    { img: GP4, valid: "07 MAY", coupon: "JOS18" },
    { img: GP5, valid: "18 JUN", coupon: "GPAY25" },
    { img: GP6, valid: "27 May", coupon: "NEXT149" },
    // { img: GP7, valid: "19 JUN", coupon: "DISCOUNT999" },
  ];
  const PhysicallyChallengedTravellers = [
    { img: PCT1, valid: "14 JUN", coupon: "ACCESS20" },
    { img: PCT2, valid: "18 JUN", coupon: "EAR30EASE" },
    { img: PCT3, valid: "01 MAY", coupon: "THERAPY25" },
    { img: PCT4, valid: "28 JUN", coupon: "WHEEL10" },
    { img: PCT5, valid: "14 May", coupon: "ROOM20" },
    { img: PCT6, valid: "13 JUN", coupon: "25PHARM" },
    { img: PCT7, valid: "06 May", coupon: "LENS100" },
  ];
  const PiligrimsTravellers = [
    { img: PT1, valid: "08 May", coupon: "SPOTI100" },
    { img: PT2, valid: "19 JUN", coupon: "JEWEL15" },
    { img: PT3, valid: "04 JUN", coupon: "10YOGOO" },
    { img: PT4, valid: "20 MAY", coupon: "1SOULGUID" },
    { img: PT5, valid: "14 JUN", coupon: "KINDLE100" },
    { img: PT6, valid: "15 May", coupon: "BREETHE20" },
    { img: PT7, valid: "19 JUN", coupon: "100BUSTAND" },
  ];
  const SeniorCitizens = [
    { img: SC1, valid: "14 May", coupon: "DINE10" },
    { img: SC2, valid: "05 JUN", coupon: "TICKET299" },
    { img: SC3, valid: "19 JUN", coupon: "299FIT" },
    { img: SC4, valid: "22 MAY", coupon: "SHOPPER75" },
    { img: SC5, valid: "03 JUN", coupon: "MELODIA49" },
    { img: SC6, valid: "08 May", coupon: "WANDER15" },
    { img: SC7, valid: "01 JUN", coupon: "50SWIGGY" },
  ];
  const Student = [
    { img: S1, valid: "15 May", coupon: "CLASS10" },
    { img: S2, valid: "07 JUN", coupon: "90UDEMY" },
    { img: S3, valid: "30 JUN", coupon: "10SWIGG50" },
    { img: S4, valid: "25 MAY", coupon: "GLOBAL15" },
    { img: S5, valid: "17 JUN", coupon: "SKULL70" },
    { img: S6, valid: "28 May", coupon: "AMAZON65" },
    { img: S7, valid: "28 JUN", coupon: "SKYWING35" },
  ];
  const Tourist = [
    { img: T1, valid: "15 May", coupon: "HOTELFREE" },
    { img: T2, valid: "25 JUN", coupon: "EXCURSION50" },
    { img: T3, valid: "04 JUN", coupon: "BAZAAR100" },
    { img: T4, valid: "11 MAY", coupon: "179SKYLINE" },
    { img: T5, valid: "31 JUN", coupon: "BUSSTAND20" },
    { img: T6, valid: "01 May", coupon: "TOWN15" },
    { img: T7, valid: "23 JUN", coupon: "TOURS25" },
  ];
  const prevSlide = () => {
    const newIndex = Math.max(0, startIndex - 1);
    setStartIndex(newIndex);
  };
  const nextSlide = () => {
    const newIndex = Math.min(startIndex + 1, currentoffers.length - 5);
    setStartIndex(newIndex);
  };
  useEffect(() => {
    const occupation = localStorage.getItem("occupation");
    if (occupation == "Corporate Travellers") {
      setCurrentOffer(CorporateTravellers);
    } else if (occupation == "General People") {
      setCurrentOffer(GeneralPeople);
    } else if (occupation == "Physically Challenged Travellers") {
      setCurrentOffer(PhysicallyChallengedTravellers);
    } else if (occupation == "Piligrims Travellers") {
      setCurrentOffer(PiligrimsTravellers);
    } else if (occupation == "Senior Citizens") {
      setCurrentOffer(SeniorCitizens);
    } else if (occupation == "Student") {
      setCurrentOffer(Student);
    } else if (occupation == "Tourist") {
      setCurrentOffer(Tourist);
    } else {
      setCurrentOffer(GeneralPeople);
    }
  }, [localStorage.getItem("occupation")]);
  const copyCouponCode = (item) => {
    const couponCode = item?.coupon;
    if (couponCode) {
      navigator.clipboard
        .writeText(couponCode)
        .then(() => {
          // alert('Coupon code copied to clipboard!');
          toast.success("Coupon code copied to clipboard: ");
        })
        .catch((err) => {
          // console.error('Failed to copy coupon code: ', err);
          toast.error("Failed to copy coupon code:", err);
        });
    }
  };
  const closeModal = () => {
    setModalIsOpen(false);
    setShowDialog(false);
  };
  const promotionlist = useSelector((state) => state?.promo_list);
  console.log(promotionlist, "promotionlist");

  return (
    <>
      <div className="bg-[#E5FFF1] min-h-screen max-h-auto w-full overflow-auto relative  md:block hidden ">
        <div className="flex flex-col gap-[1vw]">
          <div className="h-[4.5vw] w-full flex">
            <div className="w-[40%] h-[4vw] flex ">
              <img className="w-[6.25vw] h-[4vw]" src={buslogo} />
              <img src={busstand} className="h-[4vw] w-[20vw] py-[0.1vw]" />
              <p className="border-r-[0.3vw] border-[#1F487C] mt-[0.2vw] h-[4vw] ml-[1vw]"></p>
              <div className="w-[9vw] h-[3.8vw] mt-[0.3vw] bg-[#1F487C] ml-[2vw] rounded-full  relative">
                <img
                  src={bus}
                  className="h-[3.1vw] w-[4vw] absolute top-0"
                  style={{ left: "50%", transform: "translateX(-50%)" }}
                />
                <p
                  className="text-white  font-semibold absolute bottom-[0.2vw] text-[0.8vw]"
                  style={{ left: "50%", transform: "translateX(-50%)" }}
                >
                  Bus Tickets
                </p>
              </div>
            </div>
            <div className="w-[25%] h-full items-center flex justify-center ">
              <img src={join} className="w-[17vw] h-full" />
            </div>
            <div className="w-[35%]  h-full   flex gap-[2vw] items-center justify-center">
              <div
                className="flex items-center justify-center gap-[0.5vw] cursor-pointer"
                onClick={() => setModalIsOpen(true)}
              >
                <img className="w-[1.6vw] h-[1.6vw]" src={share} />
                <p className="text-[1.2vw] font-semibold text-[#1F487C]">
                  Share
                </p>
              </div>
              <div className="flex items-center justify-center gap-[0.5vw]">
                <img className="w-[1.6vw] h-[1.6vw]" src={ticket} />
                <p className="text-[1.2vw] font-semibold text-[#1F487C]">
                  Rewards/Offers
                </p>
              </div>{" "}
              <div className="flex items-center justify-center gap-[0.5vw]">
                <img className="w-[1.6vw] h-[1.6vw]" src={profile} />
                <p className="text-[1.2vw] font-semibold text-[#1F487C]">
                  Login/SignUp
                </p>
              </div>
            </div>
          </div>
          <div className="h-full w-[100%] px-[5vw] place-items-center py-[1vw] items-center justify-center flex">
            <div className="grid grid-cols-4 w-full h-full items-center flex-col  gap-[1vw] justify-center px-[2vw]">
              {promotionlist.map((item, index) => (
                // <>
                //   <div className="relative">
                //     <img src={item?.img} className="w-[100%] h-[100%] " />
                //     <p className="absolute text-[0.8vw] left-[1.2vw] bottom-[2.5vw] text-white">
                //       {`Valid till ${item?.valid}`}
                //     </p>
                //     <div className="w-auto h-[1.7vw] border-dashed flex items-center rounded-[0.2vw] border-[0.1vw] bg-opacity-20 bg-white border-white absolute left-[1.2vw] bottom-[0.6vw] px-[1.5vw]   text-white">
                //       <p>{item?.coupon}</p>
                //       <img
                //         src={clipboard}
                //         className="absolute bottom-[0.2vw] right-[-2.2vw] h-[1.5vw] w-[1.5vw] cursor-pointer"
                //         onClick={() => copyCouponCode(item)}
                //       />
                //     </div>
                //   </div>
                // </>
                <img
                  src={item?.background_image}
                  className="w-[100%] h-[100%] "
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ----------------------------------------MobileView------------------------------------------------ */}
      <div className="md:hidden block ">
        <div className="bg-[#1f487c] ">
          <div className="grid grid-cols-6 items-center px-[5vw]">
            <div className="col-span-2 py-5">
              <NavLink to="/">
                <IoMdArrowBack className="w-[6vw] h-[6vw]" color="white" />
              </NavLink>
            </div>
            <div className="col-span-2 text-white">TrendingOfferzzz</div>
          </div>
        </div>
        <div className=" bg-[#E5FFF1] min-h-screen max-h-auto overflow-auto absolute w-full ">
          <div className=" grid grid-row w-full h-full gap-[1vw] item-center px-[3vw] py-[5vw]">
            {currentoffers.map((item, index) => (
              // <div className="col-span-1 w-full h-full items-center  gap-2 flex ">
              <>
                <div className="relative">
                  <img src={item?.img} className="w-full h-full " />
                  <p className="absolute text-[3vw] left-[3vw] bottom-[12vw] text-white">
                    {`Valid till ${item?.valid}`}
                  </p>
                  <div className="w-auto h-[6vw] border-dashed flex items-center rounded-[0.2vw] border-[0.1vw] bg-opacity-20 bg-white border-white absolute left-[3vw] bottom-[4vw] px-[1.5vw]   text-white">
                    <p>{item?.coupon}</p>
                    <img
                      src={clipboard}
                      className="absolute bottom-[1.5vw] right-[-5vw] h-[3.5vw] w-[3.5vw] cursor-pointer"
                      onClick={() => copyCouponCode(item)}
                    />
                  </div>
                </div>
              </>
              // </div>
            ))}
          </div>
        </div>
      </div>

      {/* ----------------------------------------MobileView------------------------------------------------ */}
      <ModalPopup
        show={modalIsOpen}
        onClose={closeModal}
        height="28vw"
        width="32vw"
      >
        <ShareButtons url={"http://localhost:3008/"} />
      </ModalPopup>
    </>
  );
};

export default TrendingOffer;
