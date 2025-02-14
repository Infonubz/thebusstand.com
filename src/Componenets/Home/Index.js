import React from "react";
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
export default function HomeIndex() {
  return (
    <div
      className={`bg-[#E5FFF1]  min-h-screen max-h-auto w-full overflow-auto relative`}
    >
      <Navbar_One />
      <LocationPermission />
      <div className="Background relative md:block hidden">
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
