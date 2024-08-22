// import React, { useEffect, useState } from "react";
// import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
// import "../../App.css";
// import gif from "../../assets/gif.gif";
// import gif2 from "../../assets/gif2.gif";
// import gif3 from "../../assets/gif3.gif";
// import chennai1 from "../../assets/Ads/Frame 8.png";
// import chennai2 from "../../assets/Ads/Frame 9.png";
// import chennai3 from "../../assets/Ads/Frame 10.png";
// import chennai4 from "../../assets/Ads/Frame 11.png";
// import pondy1 from "../../assets/Ads/Tamil-Frame 8.png";
// import pondy2 from "../../assets/Ads/Tamil-Frame 9.png";
// import pondy3 from "../../assets/Ads/Tamil-Frame 10.png";
// import pondy4 from "../../assets/Ads/Tamil-Frame 11.png";
// import bang1 from "../../assets/Ads/Kannada-Frame 8.png";
// import bang2 from "../../assets/Ads/Kannada-Frame 9.png";
// import bang3 from "../../assets/Ads/Kannada-Frame 10.png";
// import bang4 from "../../assets/Ads/Kannada-Frame 11.png";
// import hyd1 from "../../assets/Ads/Telugu-Frame 8.png";
// import hyd2 from "../../assets/Ads/Telugu-Frame 9.png";
// import hyd3 from "../../assets/Ads/Telugu-Frame 10.png";
// import hyd4 from "../../assets/Ads/Telugu-Frame 11.png";
// import virgio from "../../assets/Gif/VIRGIO-2.gif";
// import virgio2 from "../../assets/Gif/VIRGIO (1).gif";
// import ReactPlayer from "react-player";
// import virgio_video from "../../assets/Video/VIRGIO-video.mp4";
// import video2 from "../../assets/Video/video2.mp4";
// import kfc from "../../assets/Gif/KFC.gif";
// import Virgio from "../../assets/Video/Virgio.mp4";
// import urgear from "../../assets/Video/Urgear 1.mp4";
// import "../../App.css";
// export default function Promotion() {
//   const slides = [gif, gif2, gif3];
//   const chennai = [chennai1, chennai2, chennai3, chennai4];
//   // const pondy = [pondy1, pondy2, pondy3, pondy4];
//   const pondy = [Virgio, kfc];
//   const bangalore = [bang1, bang2, bang3, bang4];
//   const hyderabad = [hyd1, hyd2, hyd3, hyd4];
//   const video = [ Virgio];
//   const [ads, setAds] = useState([
//     localStorage.getItem("hy1"),
//     localStorage.getItem("hy2"),
//     localStorage.getItem("hy3"),
//     localStorage.getItem("hy4"),
//   ]);
//   const [currentIndex, setCurrentIndex] = useState(0);

//   useEffect(() => {
//     const depature = localStorage.getItem("depature");
//     if (depature === "Chennai") {
//       setAds(video);
//     } else if (depature === "Pondicherry") {
//       setAds(chennai);
//     } else if (depature === "Bangalore") {
//       setAds(bangalore);
//     }
//   }, []);

//   useEffect(() => {
//     const index = Number(sessionStorage.getItem("CurrentIndex")) || 0;
//     setCurrentIndex(index);
//   }, [sessionStorage.setItem("CurrentIndex", 0)]);

//   const numSlides = ads.length;

//   const prevSlide = () => {
//     const newIndex = (currentIndex - 1 + numSlides) % numSlides;
//     sessionStorage.setItem("CurrentIndex", newIndex);
//     setCurrentIndex(newIndex);
//   };

//   const nextSlide = () => {
//     const newIndex = (currentIndex + 1) % numSlides;
//     sessionStorage.setItem("CurrentIndex", newIndex);
//     setCurrentIndex(newIndex);
//   };

//   useEffect(() => {
//     const interval = setInterval(() => {
//       const newIndex = (currentIndex + 1) % numSlides;
//       sessionStorage.setItem("CurrentIndex", newIndex);
//       setCurrentIndex(newIndex);
//     }, 5000);

//     return () => clearInterval(interval);
//   }, [currentIndex, numSlides]);
//   useEffect(() => {
//     sessionStorage.setItem("CurrentIndex", 0);
//   }, []);
//   useEffect(() => {
//     localStorage.setItem("hy1", hyd1);
//     localStorage.setItem("hy2", hyd2);
//     localStorage.setItem("hy3", hyd3);
//     localStorage.setItem("hy4", hyd4);
//   }, []);
//   console.log(ads[currentIndex], "adsadsadsads");
//   console.log(Virgio,"Virgio");
//   return (
//     <div className="slide-container  md:pt-0">
//       <div className="relative">
//         {/* <div
//           className="h-[11vw] rounded-[0.5vw] slide-wrapper slide"
//           style={{
//             backgroundImage: `url(${ads[currentIndex]})`,
//             backgroundSize: "cover",
//             backgroundRepeat: "no-repeat",
//             transition: "background-image 1s ease-in-out",
//           }}
//         ></div> */}
//         <video
//           autoPlay
//           muted
//           loop
//           className="object-cover"
//           style={{
//             objectFit: "cover",
//             width: "100%",
//             borderRadius: "1vw",
//           }}
//         >
//           <source src={Virgio} type="video/mp4" />
//         </video>
//         {/* <ReactPlayer
//           url={Virgio}
//           height={"10.5vw"}
//           width={"100%"}
//           playing={true}
//           loop={true}
//           // className="react-player"
//           style={{
//             // objectPosition:'center',
//             objectFit:"fill"
//           }}
//         />  */}

//         <div className="absolute md:block hidden left-[2%] top-[5vw]">
//           <button
//             className="cursor-pointer bg-white p-[0.5vw] rounded-full"
//             onClick={prevSlide}
//           >
//             <IoIosArrowBack size={"1vw"} />
//           </button>
//         </div>
//         <div className="absolute md:block hidden right-[2%] top-[5vw]">
//           <button
//             className="cursor-pointer bg-white p-[0.5vw] rounded-full"
//             onClick={nextSlide}
//           >
//             <IoIosArrowForward size={"1vw"} />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }
