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
import Viewall from "./Components/Home/Viewall";
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
// import 'antd/dist/antd.css';
// import 'antd/dist/reset.css';

function App() {
  const [sidebarToggle, setSidebarToggle] = useState(false);
  const menu = localStorage.getItem("search");
  const menulist = useSelector((state) => state.bus_search);
  console.log(menulist, "menulist");
  useEffect(() => {
    if (menulist) {
      setSidebarToggle(true);
    }
  }, [menulist]);
  return (
    <>
      <ToastContainer />
      <Router>
        <Routes>
          <Route path="/" element={<Home1 />} />
          {/* <Route path="/dashboard" element={<MainPage />} /> */}
          <Route path="/" element={<MainPage />}>
            <Route path="/dashboard" element={<SingleCard />} />
            <Route path="/map" element={<Map />} />
          </Route>
          <Route path="/viewall" element={<Viewall />} />
          <Route path="/dashboard/userinfo" element={<DrawerMobile/>}/>
          <Route path="/dashboard/userinfo/payment" element={<PaymentMobile/>}/>
          <Route path="/dashboard/userinfo/payment/viewticket" element={<TicketMobile/>}/>
          <Route path="/powerbi" element={<PowerBIReport />} />
          <Route path="/BusOpp" element={<BusOpp />} />
          <Route path="/BusPartners" element={<BusPartners />} />
          <Route path="/TrendingOffer" element={<TrendingOffer />} />
          <Route path="/dashboard/ViewSeats" element={<BusSeat />}/>
          <Route path="/dashboard/viewSeats/PickUppoint" element={<PickUpDrop/>}/>
          <Route path="/main" element={<MyAccountsDetails />} />
          <Route path="/rewards" element={<Rewardsandoffers/>}/>
          {/* // <Route path="/map" element={<MapIndex />} />s */}
        </Routes>
      </Router>
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
