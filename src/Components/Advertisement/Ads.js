import React, { act, useEffect, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { GetAds, GetMobAds } from "../../Api/Home/Home";
import MobileFilterNavbar from "../Dashboard/NewDashboard/MobileFilterNavbar";

export default function Advertisement() {
  const apiUrl = process.env.REACT_APP_API_URL;
  const apicrm = process.env.REACT_CRM_API_URL;
  const getlist = useSelector((state) => state.ads_list);
  const [ads, setAds] = useState([
    localStorage.getItem("hy1"),
    localStorage.getItem("hy2"),
    localStorage.getItem("hy3"),
    localStorage.getItem("hy4"),
  ]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const index = Number(sessionStorage.getItem("CurrentIndex")) || 0;
    setCurrentIndex(index);
  }, []);

  const numSlides = getlist?.length;

  const prevSlide = () => {
    const newIndex = (currentIndex - 1 + numSlides) % numSlides;
    sessionStorage.setItem("CurrentIndex", newIndex);
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const newIndex = (currentIndex + 1) % numSlides;
    sessionStorage.setItem("CurrentIndex", newIndex);
    setCurrentIndex(newIndex);
  };
  

  useEffect(() => {
    const interval = setInterval(() => {
      const newIndex = (currentIndex + 1) % numSlides;
      sessionStorage.setItem("CurrentIndex", newIndex);
      setCurrentIndex(newIndex);
    }, 10000);

    return () => clearInterval(interval);
  }, [currentIndex, numSlides]);

  const dispatch = useDispatch();

  useEffect(() => {
    GetAds(dispatch);
    setAds(getlist);
  }, []);
  // ----------------------------------------------------------------MOBILE_VIEW--------------------------------------------------

  const adList = useSelector((state) => state.mob_ads_list);
  console.log(adList, "Mboile_ads_");
  const [mobileAds, setMobileAds] = useState([
    localStorage.getItem("ad1"),
    localStorage.getItem("ad2"),
    localStorage.getItem("ad3"),
    localStorage.getItem("ad4"),
  ]);
  const [activeAdIndex, setActiveAdIndex] = useState(0);
  console.log(activeAdIndex, "activADIndex");

  useEffect(() => {
    const storedIndex = Number(sessionStorage.getItem("ActiveIndex")) || 0;
    setActiveAdIndex(storedIndex);
  }, []);

  const totalSlides = adList?.length;

  const mobShowPreviousSlide = () => {
    const newIndex = (activeAdIndex - 1 + totalSlides) % totalSlides;
    sessionStorage.setItem("ActiveIndex", newIndex);
    setActiveAdIndex(newIndex);
  };

  const mobShowNextSlide = () => {
    const newIndex = (activeAdIndex + 1) % totalSlides;
    sessionStorage.setItem("ActiveIndex", newIndex);
    setActiveAdIndex(newIndex);
  };

  useEffect(() => {
    const slideInterval = setInterval(() => {
      const newIndex = (activeAdIndex + 1) % totalSlides;
      sessionStorage.setItem("ActiveIndex", newIndex);
      setActiveAdIndex(newIndex);
    }, 10000);

    return () => clearInterval(slideInterval);
  }, [activeAdIndex, totalSlides]);

  useEffect(() => {
    GetMobAds(dispatch);
    setMobileAds(adList);
  }, []);
  console.log(activeAdIndex, "adlist");

  return (
    <>
      <div className="md:block hidden">
        <div
          className="slide-container 
    
    md:pt-0"
        >
          <div className="relative">
            {(getlist?.length > 0 &&
              getlist[currentIndex]?.ad_file_type === "image/jpeg") ||
            getlist[currentIndex]?.ad_file_type === "image/png" ||
            getlist[currentIndex]?.ad_file_type === "image/gif" ? (
              <div
                className="h-[11vw] rounded-[0.5vw] slide-wrapper slide"
                style={{
                  backgroundImage: `url(http://192.168.90.47:4000${getlist[currentIndex]?.ad_video})`,
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                  transition: "background-image 1s ease-in-out",
                  height: "11vw",
                }}
              ></div>
            ) : (
              <video
                autoPlay
                muted
                loop
                className="object-fill"
                style={{
                  objectFit: "fill",
                  width: "100%",
                  borderRadius: "1vw",
                  height: "11vw",
                }}
                height={"2vw"}
              >
                <source
                  src={`http://192.168.90.47:4000${getlist[currentIndex]?.ad_video}`}
                  type="video/mp4"
                />
              </video>
            )}
            <div className="absolute md:block hidden left-[2%] top-[5vw]">
              <button
                className="cursor-pointer bg-white p-[0.5vw] rounded-full"
                onClick={prevSlide}
              >
                <IoIosArrowBack size={"1vw"} />
              </button>
            </div>
            <div className="absolute md:block hidden right-[2%] top-[5vw]">
              <button
                className="cursor-pointer bg-white p-[0.5vw] rounded-full"
                onClick={nextSlide}
              >
                <IoIosArrowForward size={"1vw"} />
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* -----------------------------------------MOBILE_VIEW------------------------------------------------ */}
      <div className="md:hidden block">
        <div className="ad-slider-container md:pt-0">
          <div className="relative px-[2vw] pt-[2vw] ">
            {(adList?.length > 0 &&
              adList[activeAdIndex]?.mobad_file_type === "image/jpeg") ||
            adList[activeAdIndex]?.mobad_file_type === "image/png" ||
            adList[activeAdIndex]?.mobad_file_type === "image/gif" ? (
              <div
                className="h-[25vw] md:h-[11vw] rounded-[2vw] slide-wrapper border-[0.2vw] border-black"
                style={{
                  backgroundImage: `url(http://192.168.90.47:4000${adList[activeAdIndex]?.mobad_vdo})`,
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                  transition: "background-image 1s ease-in-out",
                }}
              ></div>
            ) : (
              <video
                autoPlay
                muted
                loop
                className="object-fill"
                style={{
                  objectFit: "fill",
                  width: "100%",
                  borderRadius: "1vw",
                  height: "25vw",
                }}
              >
                <source
                  src={`http://192.168.90.47:4000${adList[activeAdIndex]?.mobad_vdo}`}
                  type="video/mp4"
                />
              </video>
            )}
            <div className="absolute md:block hidden left-[2%] ">
              <button
                className="cursor-pointer bg-white p-[0.5vw] rounded-full"
                onClick={mobShowPreviousSlide}
              >
                <IoIosArrowBack size={"1vw"} />
              </button>
            </div>
            <div className="absolute md:block hidden right-[2%] ">
              <button
                className="cursor-pointer bg-white p-[0.5vw] rounded-full"
                onClick={mobShowNextSlide}
              >
                <IoIosArrowForward size={"1vw"} />
              </button>
            </div>
{/* 
            <div className="md:hidden flex justify-between absolute left-0 right-0 top-[10vw] px-2">
              <button
                className="cursor-pointer bg-white p-[1vw] rounded-full"
                onClick={mobShowPreviousSlide}
              >
                <IoIosArrowBack size={"3vw"} />
              </button>
              <button
                className="cursor-pointer bg-white p-[1vw] rounded-full"
                onClick={mobShowNextSlide}
              >
                <IoIosArrowForward size={"3vw"} />
              </button>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
}
