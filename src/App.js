import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Sidebar from "./Components/MainComponenet/Sidebar";
import Navbar from "./Components/MainComponenet/Navbar";
import { useEffect, useState } from "react";
import MainNavbar from "./Components/MainComponenet/MainNavbar";
import { RemoveScrollBar } from "react-remove-scroll-bar";
import MainPage from "./Components/Dashboard/Index";
import { useSelector } from "react-redux";
import Home from "./Components/Home/Home";
import Home1 from "./Components/Home/Home1";
import Testing from "./Components/Home/test";
import LocationComponent from "./Components/Home/LocationPermission";
import MapIndex from "./Components/Dashboard/MapIndex";
import DashboardLayout from "./Components/Dashboard/DashboardLayout";
import Map from "./Components/Dashboard/Map";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dashboard from "./Components/Dashboard/Dashboard";
import BusOpp from "./Components/Home/BusOpp";
import BusPartners from "./Components/Home/BusPartners";
import TrendingOffer from "./Components/Home/TrendingOffer";
import PowerBI from "./Components/PowerBI/Powerbi";
import PowerBIReport from "./Components/PowerBI/PowerBiReport";
import BusSeat from "./Components/Dashboard/BusSeatType/SeatMobileview/BusSeat";
import DrawerMobile from "./Components/Dashboard/DrawerMobile";
import PaymentMobile from "./Components/Dashboard/PaymentMobile";
import TicketMobile from "./Components/Dashboard/TicketMobile";
import PickUpDrop from "./Components/Dashboard/BusSeatType/SeatMobileview/PickUpDrop";
import HomeHearder from "./Components/MainComponenet/HomeHearder";
import MyAccountsDetails from "./Components/Home/MyAccounts/Index";
import Rewardsandoffers from "./Components/Rewards & offers/Rewards&offers";
import SingleCard from "./Components/Dashboard/NewDashboard/SingleCard";
// import MobileIndex from "./Components/Home/MobileAccounts/MobileIndex";
import MPassengerIndex from "./Components/Home/MobileAccounts/Passengers/MPassengerIndex";
import BookingIndex from "./Components/Home/MobileAccounts/MobileBookings/BookingIndex";
import MobileReferrals from "./Components/Home/MobileAccounts/Referrals/MobileReferrals";
import MobileHelp from "./Components/Home/MobileAccounts/Help/MobileHelp";
// import 'antd/dist/antd.css';
// import 'antd/dist/reset.css';
import Offers from "./Components/Footer/Offers";
import About from "./Components/Footer/About";
import Operators from "./Components/Footer/Operators";
import Routes1 from "./Components/Footer/Routes";
import Contact from "./Components/Footer/Contact";
import UserAgreement from "./Components/Footer/UserAgreement";
import PrivacyPolicy from "./Components/Footer/PrivacyPolicy";
import Terms from "./Components/Footer/Terms&Conditions";
import Faq from "./Components/Footer/FAQ";
//import Login from "./Components/Login/Login";
import LoginMobile from "./Components/Login/LoginMobile";
import Help from "./Components/Home/MyAccounts/Help/Help";
//import ScrollToTop from "../src/Components/Common/ScrollTop";
import { Navigate } from "react-router-dom";

function MainRoute({ element: Component }) {
  const userId = sessionStorage.getItem("user_id");
  return userId ? <Component /> : <Navigate to="/" />;
}

function DashboardRoute({ element: Component }) {
  const departure = localStorage.getItem("departure");
  const arrival = localStorage.getItem("arrival");
  const selectdate = localStorage.getItem("selectdate");
  const data = departure && arrival && selectdate;
  return data ? (<Component />) : (<Navigate to="/" />);
}

function App() {
  const [sidebarToggle, setSidebarToggle] = useState(false);
  //const menu = localStorage.getItem("search");
  const menulist = useSelector((state) => state.bus_search);

  console.log(menulist, "menulist");

  useEffect(() => {
    if (menulist) {
      setSidebarToggle(true);
    }
  }, [menulist]);

  return (
    <>
      {/* <ScrollToTop> */}
      <ToastContainer />
      <Router>
        <Routes>
          <Route path="/" element={<Home1 />} />
          {/* <Route path="/dashboard" element={<MainPage />} /> */}
          <Route path="/" element={<MainPage />}>
            <Route
              path="/dashboard"
              element={<DashboardRoute element={SingleCard} />}
            />

            <Route path="/map" element={<Map />} />
          </Route>
          <Route path="/dashboard/userinfo" element={<DrawerMobile />} />
          <Route
            path="/dashboard/userinfo/payment"
            element={<PaymentMobile />}
          />
          <Route
            path="/dashboard/userinfo/payment/viewticket"
            element={<TicketMobile />}
          />
          <Route path="/powerbi" element={<PowerBIReport />} />
          <Route path="/BusOpp" element={<BusOpp />} />
          <Route path="/BusPartners" element={<BusPartners />} />
          <Route path="/TrendingOffer" element={<TrendingOffer />} />
          <Route path="/dashboard/ViewSeats" element={<BusSeat />} />
          <Route
            path="/dashboard/viewSeats/PickUppoint"
            element={<PickUpDrop />}
          />
          <Route
            path="/main"
            element={<MainRoute element={MyAccountsDetails} />}
          />
          {/* <Route path="/main" element={<MyAccountsDetails />} /> */}
          <Route path="/accounts/Passengers" element={<MPassengerIndex />} />
          <Route path="/accounts/Bookings" element={<BookingIndex />} />
          <Route path="/accounts/refferals" element={<MobileReferrals />} />
          <Route path="/accounts/help" element={<Help />} />
          <Route path="/rewards" element={<Rewardsandoffers />} />
          <Route path="/Login" element={<LoginMobile />} />

          <Route path="/offers" element={<Offers />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/operators" element={<Operators />} />
          <Route path="/routes" element={<Routes1 />} />
          <Route path="/about" element={<About />} />
          <Route path="/agreement" element={<UserAgreement />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />

          {/* // <Route path="/map" element={<MapIndex />} />s */}
        </Routes>
      </Router>
      {/* </ScrollToTop> */}
    </>
  );
}

export default App;
// import "./App.css";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import Sidebar from "./Components/MainComponenet/Sidebar";
// import Navbar from "./Components/MainComponenet/Navbar";
// import Sample from "./Components/Dashboard/Sample";
// import { useEffect, useState } from "react";
// import MainNavbar from "./Components/MainComponenet/MainNavbar";
// import { useSelector } from "react-redux";
// import Home1 from "./Components/Home/Home1";
// import Map from "./Components/Dashboard/Map";

// function App() {
//   const [sidebarToggle, setSidebarToggle] = useState(false);
//   const menu = localStorage.getItem("search");
//   const menulist = useSelector((state) => state.search);
//   console.log(menulist, "menulist");
//   useEffect(() => {
//     if (menulist) {
//       setSidebarToggle(true);
//     }
//   }, [menulist]);
//   return (
//     <>
//       {/* <MainPage /> */}
//       <Router>
//         <MainNavbar />
//         <div className="flex pt-[17vh]">
//           <Sidebar sidebarToggle={sidebarToggle} />
//           <div className="flex flex-col flex-1">
//             <div
//               className={` ${sidebarToggle ? "" : "ml-[18vw]"} fixed w-full`}
//             >
//               <Navbar
//                 sidebarToggle={sidebarToggle}
//                 setSidebarToggle={setSidebarToggle}
//               />
//             </div>
//             <div className={` ${sidebarToggle ? "" : "ml-[18vw] "}mt-[5.5vh]`}>
//               <Routes>
//                 <Route path="/" element={<Home1 />} />
//                 <Route path="/dashboard" element={<Sample />} />
//                 <Route path="/map" element={<Map />} />
//               </Routes>
//             </div>
//           </div>
//         </div>
//       </Router>
//     </>
//   );
// }

// export default App;

