import React, { useEffect } from "react";
// import place1 from "../../assets/Vector (6).png";
// import place2 from "../../assets/Vector (11).png";
// import place4 from "../../assets/Vector (5).png";
// import place5 from "../../assets/Vector (6).png";
// import place6 from "../../assets/Vector (7).png";
// import place7 from "../../assets/Vector (8).png";
// import place8 from "../../assets/Vector (9).png";
// import mumbai from "../../assets/mumbai.png";
// import newdheli from "../../assets/newdheli.jpg";
// import goa from "../../assets/goa.jpg"
// import chennai from "../../assets/chennai.jpg";
// import Buses from "./Buses";
// import BusOperator from "./BusOperator";
// import mumbai1 from "../../assets/mumbai1.png";
// import bengaluru from "../../assets/bengaluru.png";
// import pondy from "../../assets/pondy.png";
// import cbe from "../../assets/cbe.png";
import bus from "../../../../Assets/Logo/bus.png";
import { GetPdp } from "../../../../Api-TBS/Home/Home";
import { useDispatch, useSelector } from "react-redux";
// import ColorCodes from "../Common/ColorCodes";

// const busdetails = [
//   {
//     label: "chennai",
//     logo: chennai,
//   },
//   {
//     label: "puducherry",
//     logo: pondy,
//   },
//   {
//     label: "hyderabad",
//     logo: place8,
//   },
//   {
//     label: "bengaluru",
//     logo: bengaluru,
//   },
//   {
//     label: "new delhi",
//     logo: newdheli,
//   },
//   {
//     label: "goa",
//     // logo: goa,
//   },
//   {
//     label: "mumbai",
//     logo: mumbai,
//   },
// ];

export default function PopularDomestic() {
  const colors = useSelector((state) => state.themecolors[0]);
  const apiUrlimage = process.env.REACT_APP_API_URL_IMAGE;
  // const apicrmimage = process.env.REACT_APP_CRM_API_URL_IMAGE;
  const dispatch = useDispatch();
  const popular_domestic_presence = useSelector((state) => state?.pdp);

  // const colors = ColorCodes();

  // const sanitizePath = (path) => {
  //   const sanitizedPath = path.replace(/\\\\/g, "file://").replace(/\\/g, "//");
  //   console.log(encodeURI(sanitizedPath), "techimage");
  //   return encodeURI(sanitizedPath);
  // };

  useEffect(() => {
    GetPdp(dispatch);
  }, [dispatch]);

  return (
    <>
      <div className="px-[5vw] md:block hidden">
        <p
          className={`text-[1.5vw] pl-[1.5vw] text-[${colors.primary}] font-bold pt-[0.6vw] pb-[1vw]`}
        >
          Popular Domestic Presence
        </p>

        <div className="grid grid-cols-7 w-full py-[1vw]">
          {popular_domestic_presence?.map((item) => (
            <div className="col-span-1 w-full items-center justify-center flex-col">
              <img
                src={`${apiUrlimage}${item.image}`}
                className={`w-[9vw] h-[9vw] ml-[1.8vw] rounded-full shadow-md shadow-[${colors.primary}]`}
                alt="domestic_presence"
              />
              <p className="text-center py-[0.8vw] text-[1.2vw] font-bold">
                {item?.source_name?.toUpperCase()}
              </p>
            </div>
          ))}
        </div>
      </div>
      {/* // mobile */}
      <div className="px-[5vw] md:hidden block">
        <p
          className={`text-[vw] pl-[1vw] text-[${colors.primary}] font-bold pt-[3vw] pb-[1vw]`}
        >
          Popular Domestic Presence
        </p>
        {/* <div className="relative overflow-x-auto scrollbar-hide">
          <div className="flex w-full">
            <div className="flex-shrink-0 w-[30vw] py-[1vw]">
              {busdetails.map((item) => (
                <div className="w-[30vw] ">
                  <img
                    src={item.logo}
                    className="w-[25vw] h-[25vw] ml-[1.8vw] rounded-full shadow-md shadow-[${colors.primary}]"
                  />
                  <p className="text-center py-[0.8vw] text-[3vw] font-bold">
                    {item.label.toUpperCase()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div> */}
        <div className="relative overflow-x-auto scrollbar-hide">
          <div className="flex w-full  py-[1vw]">
            {popular_domestic_presence?.map((item) => (
              <div className="w-[20vw] mr-[5vw] flex-shrink-0 ml-[1vw]">
                {/* <div className="w-[40vw]"> */}
                <img
                  src={`${apiUrlimage}${item.image}`}
                  className={`w-[20vw] h-[20vw]  rounded-full shadow-md shadow-[${colors.primary}]`}
                  alt="domestice_presence"
                />
                <p className="text-center py-[0.8vw] mt-[2vw] text-[3vw] font-bold">
                  {item?.source_name?.toUpperCase()}
                </p>
                {/* </div> */}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
