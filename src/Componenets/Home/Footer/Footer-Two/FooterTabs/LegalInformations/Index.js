import React, { useEffect, useState } from "react";
// import HomeHearder from "../MainComponenet/HomeHearder";
// import Footer from "../Home/Footer";
import homesky from "../../../../../../Assets/Theme/Sky/BackgroundSky1.png"
import { useLocation, useNavigate } from "react-router";
// import { GetFooter } from "../../Api/Home/Home";
import { useDispatch } from "react-redux";
import Navbar_One from "../../../../../Common/Top-Navbar/Navbar-One";
import { GetFooterTabs } from "../../../../../../Api-TBS/Home/Home";
import TermsConditions from "./TermsConditions";
import FooterTwo from "../../FooterTwo";
import FooterThree from "../../../Footer-Three/FooterThree";
import { UserAgreement } from "./UserAgreement";
import { PrivacyPolicy } from "./PrivacyPolicy";

export default function TermsIndex() {
  const [currenttab, setCurrentTab] = useState(1);
  const location = useLocation();

  useEffect(() => {
    // Set currenttab based on the passed state or default to 1
    const toggleTabs = location.state?.toggleTabs;
    setCurrentTab(toggleTabs);
  }, [location.state]);

  const dispatch = useDispatch();

  useEffect(() => {
    GetFooterTabs(dispatch);
  }, [dispatch]);

  const navigate = useNavigate();
  return (
    <div className="min-h-screen max-h-auto w-full bg-[#E5FFF1]">
      <Navbar_One />
      <div className="relative h-[78.5vh] " style={{ zIndex: 1 }}>
        <div
          className="h-[10vw] overflow-x-hidden"
          style={{
            backgroundImage: `url(${homesky})`,
            width: "100%",
            overflow: "hidden",
            // backgroundSize: "cover",
            position: "relative",
            overflowX: "hidden",
          }}
        >
          {/* <label className="absolute left-[4vw] top-[1.5vw] text-[1.2vw] text-white font-bold">
                        {`Home > My Account > ${currenttab === 1
                            ? "Privacy Policy"
                            : currenttab === 2
                                ? "Terms & Conditions"
                                : "User Agreement"
                            }`}
                    </label> */}
          <div
            className={`absolute top-[0vw] left-[43.5vw] text-white text-[3.5vw] font-bold transition-transform duration-500 ease-in-out opacity-25 ${
              //   currenttab === 1
              location.pathname === "/privacy"
                ? "translate-x-0"
                : // : currenttab === 2
                location.pathname === "/terms"
                  ? "-translate-x-0"
                  : "translate-x-0"
              }`}
          >
            {`${
              //   currenttab === 1
              location.pathname === "/privacy"
                ? "Privacy Policy"
                : // : currenttab === 2
                location.pathname === "/terms"
                  ? "Terms & Conditions"
                  : "User Agreement"
              }`}
          </div>
          <div
            className={`absolute top-[1.25vw] left-[48.5vw] text-white text-[2vw] font-bold transition-transform duration-500 ease-in-out ${location.pathname === "/privacy"
              ? // currenttab === 1
              "translate-x-0"
              : // : currenttab === 2
              location.pathname === "/terms"
                ? "-translate-x-0"
                : "translate-x-0"
              }`}
          >
            {`${
              //   currenttab === 1
              location.pathname === "/privacy"
                ? "Privacy Policy"
                : // : currenttab === 2
                location.pathname === "/terms"
                  ? "Terms & Conditions"
                  : "User Agreement"
              }`}
          </div>
          <div className="cloudhome"></div>
        </div>

        <div className="absolute top-[5vw] left-[4vw]">
          <div
            className={`cursor-pointer w-[18vw] h-[5vw] rounded-tl-[1vw] rounded-tr-[1vw] border-[0.1vw] border-[#1F487C] flex items-center pl-[4vw] transition-colors duration-300 ${
              //   currenttab === 1
              location.pathname === "/privacy"
                ? "bg-[#1F487C] text-white"
                : "bg-white text-[#1F487C]"
              }`}
            onClick={
              () => navigate("/privacy")
              // setCurrentTab(1)
            }
          >
            <label className="font-bold text-[1.3vw]">Privacy Policy</label>
          </div>
        </div>
        <div className="absolute top-[10vw] left-[4vw]">
          <div
            className={`cursor-pointer w-[18vw] h-[5vw] flex items-center pl-[4vw] border-l-[0.1vw] border-r-[0.1vw] border-b-[0.1vw] border-[#1F487C] transition-colors duration-300 ${
              //   currenttab === 2
              location.pathname === "/terms"
                ? "bg-[#1F487C] text-white"
                : "bg-white text-[#1F487C]"
              }`}
            onClick={() =>
              // setCurrentTab(2)
              navigate("/terms")
            }
          >
            <label className="font-bold text-[1.3vw]">Terms & Conditions</label>
          </div>
        </div>
        <div className="absolute top-[15vw] left-[4vw]">
          <div
            className={`cursor-pointer w-[18vw] h-[5vw] rounded-bl-[1vw] rounded-br-[1vw] flex items-center pl-[4vw] border-l-[0.1vw] border-r-[0.1vw] border-b-[0.1vw] border-[#1F487C] transition-colors duration-300 ${
              //   currenttab === 3
              location.pathname === "/agreement"
                ? "bg-[#1F487C] text-white"
                : "bg-white text-[#1F487C]"
              }`}
            onClick={
              () => navigate("/agreement")
              // setCurrentTab(3)
            }
          >
            <label className="font-bold text-[1.3vw]">User Agreement</label>
          </div>
        </div>

        <div className="absolute left-[25vw] bg-red-500 top-[5vw]">
          {/* <div className="bg-white h-[35vw] w-[71vw] rounded-[1vw] border-[0.1vw] border-[#1F487C] shadow-xl"> */}
          <div className="h-[35vh] w-[71vw] bg-blue-500">
            {
              // currenttab === 1
              location.pathname === "/privacy" ? (
                <PrivacyPolicy currenttab={currenttab} />
              ) : //    currenttab === 2 ?
                location.pathname === "/terms" ? (
                  <TermsConditions />
                ) : (
                  <UserAgreement />
                )
            }
          </div>
        </div>
      </div>

    </div>
  );
}
