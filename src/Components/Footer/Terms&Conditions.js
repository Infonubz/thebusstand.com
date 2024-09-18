import React, { useEffect, useState } from "react";
import Footer from "../Home/Footer";
import TermsIndex from "../Terms&Conditions/Index";
import { useDispatch, useSelector } from "react-redux";
import { GetFooterTabs } from "../../Api/FooterTabs/FooterTabs";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router";
import BG_IMAGE from '../../assets/BG Image.png'
import HomeHearder from "../MainComponenet/HomeHearder";
import homesky from "../../assets/BackgroundSky1.png";

const TermsConditions = () => {
  const dispatch = useDispatch();
  const conditionsMobile = useSelector((state) => state?.tbs_info || [])
  console.log(conditionsMobile.terms_conditions, 'consoleconsole');

  const navigation = useNavigate()
  useEffect(() => {
    GetFooterTabs(dispatch);
  }, [dispatch]);
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  const terms_conditions = conditionsMobile?.terms_conditions
  console.log(terms_conditions, 'terms_conditions');
  return (
    <>
      <div className="md:block hidden">
        <div >
          {/* <p className="text-[1.1vw] font-semibold pl-[1vw]">PrivacyPolicy</p> */}
          <TermsIndex />
        </div>
        <div className="">
          <Footer />
        </div>
      </div>
      <div className="md:hidden block fixed top-0">
        <div className="fixed top-0 left-0 right-0 bg-[#E5FFF1] z-10">
          <HomeHearder />
        </div>
        <div
          className="relative h-[30vw] w-[100%]"
          style={{ backgroundImage: `url(${homesky})`, zIndex: 0 }}
        >
          <label className="text-white text-[8vw] font-bold absolute top-[13vw] left-[20vw] opacity-15">Terms & Conditions</label>
          <label className="text-white text-[5vw] font-bold absolute top-[16vw] left-[32vw]">Terms & Conditions</label>
          <div className="cloudhome"></div>

        </div>
        <div className="relative min-h-screen bg-[#E5FFF1] z-10">
          <img src={BG_IMAGE} className="w-full h-auto" alt="Background" />

          <div className="absolute top-[1vw] pr-[3vw]">
            <p className="text-[#1F487C] text-[5vw] font-bold px-[2vw]">Terms & Conditions</p>
            <div className=" Legal-Information-Mobile overflow-y-auto max-h-[75vh] px-[3vw] pt-[5vw]">
              {terms_conditions?.split("\r\n")?.map((line, index) => (
                <p key={index} className="text-[#1F487C] text-[3vw] pb-[0.75vw]">
                  {line}
                </p>
              ))}
            </div>
          </div>
        </div>



      </div>
    </>
  );
};

export default TermsConditions;
