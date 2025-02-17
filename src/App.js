import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Navbar_One from "./Componenets/Common/Top-Navbar/Navbar-One";
import { ToastContainer } from "react-toastify";
import HomeIndex from "./Componenets/Home/Index";
import "react-toastify/dist/ReactToastify.css";
import Dashboard from "./Componenets/Dashboard/Index";
import BusList from "./Componenets/Dashboard/BusList/BusList";
import Loader from "./Componenets/Dashboard/Loader/Main-Loader";
import Promo_ViewAll from "./Componenets/Home/Promotion/Promo_ViewAll";
import ViewAll_BusParner from "./Componenets/Home/BusPartners/ViewAll_BusParner";
import ViewAll_PvtOperators from "./Componenets/Home/Operators/Private/ViewAll_PvtOperators";
import ViewAll_GvntOperators from "./Componenets/Home/Operators/Government/ViewAll_GvntOperators";
import FAQPage from "./Componenets/Home/FAQ/FAQPage";
import CustomerFeedBack from "./Componenets/Home/Feedbacks/CustomerFeedBack";
import AboutUs from "./Componenets/Home/Footer/Footer-Two/FooterTabs/AboutUS";
import Contact from "./Componenets/Home/Footer/Footer-Two/FooterTabs/Contact";
import Operators from "./Componenets/Home/Footer/Footer-Two/FooterTabs/Operators";
import BusRoutes from "./Componenets/Home/Footer/Footer-Two/FooterTabs/Routes";
import TermsAndCondition from "./Componenets/Home/Footer/Footer-Two/FooterTabs/TermsAndCondition";
import { PrivacyAndPolicy } from "./Componenets/Home/Footer/Footer-Two/FooterTabs/PrivacyAndPolicy";
import { UserAndAgreement } from "./Componenets/Home/Footer/Footer-Two/FooterTabs/UserAndAgreement";
import Rewardsandoffers from "./Componenets/Home/Footer/Footer-Two/FooterTabs/RewardsOffer";
import RazorPayindex from "./Componenets/PaymentGateway";
import MyAccountIndex from "./Componenets/Dashboard/MyAccount/MyAccountIndex";
import Settings from "./Componenets/Dashboard/MyAccount/Settings";
import IndexSeatLayout from "./Componenets/Dashboard/MobileSeatLayout/IndexSeatLayout"
import IndexBlock from "./Componenets/Dashboard/MobileSeatLayout/IndexBlock";
function App() {
  function DashboardRoute({ element: Component }) {
    const departure = localStorage.getItem("departure");
    const arrival = localStorage.getItem("arrival");
    const selectdate = localStorage.getItem("selectdate");
    const data = departure && arrival && selectdate;
    return data ? <Component /> : <Navigate to="/" />;
  }
  return (
    <>
      <ToastContainer />
      <Router>
        <Routes>
          <Route path="/razorpay" element={<RazorPayindex />} />
          <Route path="/" element={<HomeIndex />} />
          <Route path="/" element={<Loader />}>
            <Route
              path="/buslist/:source_name/:source_ID/:destination_name/:destionation_ID/:trip_date"
              element={<DashboardRoute element={BusList} />}
              MobileBusList
            />
          </Route>
          <Route path="/TrendingOffer" element={<Promo_ViewAll />} />
          <Route path="/BusOperators" element={<ViewAll_PvtOperators />} />
          <Route path="/GvrnBusOperators" element={<ViewAll_GvntOperators />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/rewards" element={<Rewardsandoffers />} />
          <Route path="/CustomerRatings" element={<CustomerFeedBack />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/terms" element={<TermsAndCondition />} />
          <Route path="/privacy" element={<PrivacyAndPolicy />} />
          <Route path="/agreement" element={<UserAndAgreement />} />
          <Route path="/routes" element={<BusRoutes />} />
          <Route path="/operators" element={<Operators />} />
          <Route path="/main" element={<MyAccountIndex />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/seats" element={<IndexSeatLayout />} />
          <Route path="/bookingDetails" element={<IndexBlock />}/>
        </Routes>
      </Router>
      {/* </ScrollToTop> */}
    </>
  );
}

export default App;
