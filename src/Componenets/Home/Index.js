import React, { useEffect } from "react";
import Navbar_One from "../Common/Top-Navbar/Navbar-One";
import LocationPermission from "../Common/Common-Functions/LocationPermission";
import TBS_Theme from "./TBS-Theme/TBS-Theme";
import SearchBus from "./SearchBus/SearchBus";
import "./../Home/TBS-Theme/TBS-Theme.css";
import TopTravelledRoutes from "./Top-Travelled/Top-Travelled-Routes";
import BusPartners from "./BusPartners/BusPartners";
import Private_Operators from "./Operators/Private/Private_Operators";
import PopularDomestic from "./TBS/Popular-Domestic/Popular-Domestic";
import Promotion from "./Promotion/Promotion";
import Government_Operators from "./Operators/Government/Government_Operaators";
import Deals from "./TBS/Deals/Deals";
import FooterThree from "./Footer/Footer-Three/FooterThree";
import FooterTwo from "./Footer/Footer-Two/FooterTwo";
import FooterOne from "./Footer/Footer-One/FooterOne";
import BookingApp from "./TBS/Booking/BookingApp";
import FAQS from "./FAQ/FAQ";
import FeedBacks from "./Feedbacks/FeedBacks";

import SearchBusMobile from "./SearchBus/SearchBusMobile";
import { CurrentDiscount } from "../../Api-TBS/Home/Home";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import About from "./TBS/About/About";
import { decryptData } from "../Common/Common-Functions/Encrypt-Decrypt";
import { Abhibus_GetStations } from "../../Api-Abhibus/Home/HomePage";
export default function HomeIndex() {
  const currentpath = useParams();
  const dispatch = useDispatch();
  console.log(currentpath, "currentpath");

  useEffect(() => {
    if (currentpath?.trip_date) {
      console.log(currentpath?.trip_date, "currentpathggggg");

      const date = new Date(currentpath?.trip_date);
      date.setUTCHours(5, 30, 53, 897);
      const jdate = date?.toISOString();
      CurrentDiscount(dispatch, jdate);
    }
  }, [currentpath]);
  const encryptedUserId = sessionStorage.getItem("user_id");

  if (encryptedUserId) {
    const decryptedUserId = decryptData(encryptedUserId);
    console.log("Decrypted User ID:", decryptedUserId);
  } else {
    console.log("No user ID found in session storage.");
  }
  useEffect(() => {
    Abhibus_GetStations();
  }, []);
  return (
    <div
      className={`bg-[#E5FFF1]  min-h-screen max-h-auto w-full overflow-auto relative`}
    >
      <Navbar_One />
      <LocationPermission />
      <div className="Background  relative md:block hidden">
        {/* <div className="bg-[#1F487C] h-[32vw] w-full  relative md:block hidden"> */}
        <TBS_Theme />
        <SearchBus />
      </div>
      <div className=" block md:hidden">
        <SearchBusMobile />
      </div>
      <Promotion />
      <TopTravelledRoutes />
      <Government_Operators />
      <Private_Operators />
      <About />
      <PopularDomestic />
      <Deals />
      <FeedBacks />
      <FAQS />
      <BookingApp />
      <FooterOne />
      <FooterTwo />
      <FooterThree />
    </div>
  );
}
