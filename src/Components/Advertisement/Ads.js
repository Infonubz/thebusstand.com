import React, { useEffect, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { GetAds } from "../../Api/Home/Home";

export default function Advertisement() {
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

  const numSlides = getlist.length;

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

  return (
    <div className="slide-container pt-[10vw] md:pt-0">
      <div className="relative">
        {getlist[currentIndex]?.ad_file_type === "image/jpeg" ||
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
  );
}
