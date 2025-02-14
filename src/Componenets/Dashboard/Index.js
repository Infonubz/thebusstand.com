import React from "react";
import BusList from "./BusList/BusList";
import Navbar_One from "../Common/Top-Navbar/Navbar-One";
import { Navbar_Two } from "../Common/Top-Navbar/Navbar-Two";
import Sidebar from "../Common/Sidebar-Filter/Sidebar";

export default function Dashboard() {
  return (
    // <div className="w-full h-full overflow-hidden">
    //   <div className="md:block hidden h-[3.8vw]">
    //     <Navbar_One />
    //   </div>
    //   <div className="h-[5vw]">
    //     <Navbar_Two />
    //   </div>{" "}
    //   <div className="flex">
    //     <div className="w-[18vw]">
    //       <Sidebar />
    //     </div>
    //     <div className="w-[82vw] min-h-screen max-h-auto overflow-y-scroll">
    //       <BusList />
    //     </div>
    //   </div>
    // </div>
    <div>
      {/* <Navbar_One />
      <Navbar_Two />
      <Sidebar />
      <BusList /> */}
    </div>
  );
}
