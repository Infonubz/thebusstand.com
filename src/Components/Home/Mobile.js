import React, { useState } from "react";
import BgHills from "../../assets/BgHills.png";
import AppRating from "../../assets/App rating.png";
import iphone from "../../assets/iPhone 13 Pro.png";
import Award from "../../assets/Award.png";
import AppStore from "../../assets/AppStore.png";
import GoogleStore from "../../assets/GoogleStore.png";
import { App } from "antd";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "../../Components/Home/Mobile.css";
import { Rate } from "antd";
const MobileApp = () => {
  const [modalshow, setModalShow] = useState(false);
  return (
    <>
      <div
        alt="BgHills"
        className="h-[35vw] w-full relative md:block hidden"
        style={{
          backgroundImage: `url(${BgHills})`,
          backgroundSize: "cover",
          backgroundPosition: "bottom",
        }}
      >
        <div className="grid grid-cols-6 w-full h-[35vw] ">
          <div className=" col-span-2 relative">
            <img
              src={iphone}
              alt="iphone"
              className="absolute top-[-7vw] h-[40vw]"
            />
          </div>
          <div className=" col-span-4  h-[35vw] w-full">
            <div className="grid grid-rows-7 w-full h-full">
              <div className="row-span-1 items-center flex">
                <span className=" text-white font-bold text-[2.5vw]">
                  Your all-in-one Booking app
                </span>
              </div>
              <div className="row-span-1 items-center flex">
                <span className=" text-white text-[1.3vw] ">
                  Book Buses anywhere in the world in just seconds. Get
                  real-time flight updates, travel info, exclusive deals, and
                  30% more Trip Coins only on the app!
                </span>
              </div>

              <div className="row-span-3 items-center flex">
                <div className="flex flex-col ">
                  <div className="flex">
                    <div
                      className={` cursor-pointer ${modalshow ? "bg-[#B3C2D4]" : ""
                        } rounded-[1vw] w-[10vw] py-[0.5vw]`}
                      onClick={() => setModalShow(!modalshow)}
                    >
                      <p className="text-[1.4vw] text-white text-center">
                        Mobile
                      </p>
                    </div>
                    <div
                      className={` cursor-pointer ${modalshow ? "" : "bg-[#B3C2D4]"
                        } rounded-[1vw] w-[10vw] py-[0.5vw]`}
                      onClick={() => setModalShow(!modalshow)}
                    >
                      <div className="text-[1.4vw] text-white text-center">
                        E-Mail
                      </div>
                    </div>
                  </div>
                  {modalshow ? (
                    <div className="">
                      <div className="font-InterFont text-white text-[1.3vw] py-[1vw]">
                        Enter your phone number to receive a text with a link to
                        download the app.
                      </div>
                      <div className="relative">
                        <button className="absolute top-[0.25vw] right-[7.6vw] w-[13vw] h-[3.25vw] bg-white rounded-full text-[#1F4B7F] font-bold">Search</button>
                        <input
                          type="text"
                          className="inputbox  pl-[1vw] font-InterFont rounded-[1vw]    outline-none "
                          placeholder="+91 Mobile Number"
                          style={{}}
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="">
                      <div className="font-InterFont text-white text-[1.3vw] py-[1vw]">
                        Enter your Email to receive a text with a link to
                        download the app.
                      </div>
                      <div className="relative">
                        <button className="absolute top-[0.25vw] right-[2.5vw] w-[13vw] h-[3.25vw] bg-white rounded-full text-[#1F4B7F] font-bold">Search</button>
                        <input
                          type="email"
                          className="inputbox  pl-[1vw] font-InterFont rounded-[1vw]    outline-none "
                          placeholder="Email"
                          style={{}}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="row-span-2">
                <div className="flex gap-[5vw] py-[1vw]">
                  <div className="">
                    <img
                      src={AppRating}
                      alt="AppRating"
                      className="w-[15vw] h-[2.5vw]"
                    />
                    {/* <Rate disabled defaultValue={4.6}  /> */}
                    <div className=" text-white font-InterFont text-[1.1vw] ">
                      4.6/5 based on 210260 reviews
                    </div>
                    <div className=" text-white font-InterFont text-[1.1vw]">
                      Trusted by 5+ Crores Travellers
                    </div>
                  </div>
                  <div>
                    <img
                      src={Award}
                      alt="Award"
                      className="w-[15vw] h-[6vw]"
                    />
                  </div>
                </div>
              </div>

              {/* </div> */}

              {/* <div className=" flex flex-rows gap-[5%] w-[65vw]">
                <div className=" ">
                  <Tabs>
                    <div className="flex flex-col ">
                      <TabList>
                        <Tab className="tab1 my-[2vh]">
                          <div className="text-2xl text-white">Mobile</div>
                        </Tab>
                        <Tab className="tab1 my-[2vh]">
                          <div className="text-2xl text-white">E-Mail</div>
                        </Tab>
                      </TabList>

                      <TabPanel>
                        <div className="flex flex-col gap-6">
                          <div className="font-InterFont text-white text-xl w-[37vw]">
                            Enter your phone number to receive a text with a
                            link to download the app.
                          </div>
                          <input
                            type="text"
                            className="inputbox   font-InterFont rounded-2xl  grid content-center  outline-none "
                            placeholder="   +91 Mobile Number"
                            style={{}}
                          />
                        </div>
                      </TabPanel>

                      <TabPanel>
                        <div className="flex flex-col gap-6">
                          <div className="font-InterFont text-white text-xl w-[37vw]">
                            Enter your Email to receive a text with a link to
                            download the app.
                          </div>
                          <input
                            type="email"
                            className="inputbox   font-InterFont rounded-2xl  grid content-center  outline-none "
                            placeholder="  Email"
                            style={{}}
                          />
                        </div>
                      </TabPanel>
                    </div>
                  </Tabs>
                </div>
                <div className="flex flex-col justify-center items-center ">
                  <div className="w-[0.1vw] h-[11vh] opacity-35 rounded-full bg-white"></div>
                  <div className="text-white text-2xl">or</div>
                  <div className="w-[0.1vw] h-[11vh] opacity-35 rounded-full bg-white"></div>
                </div>

                <div className=" grid grid-flow-row w-[15vw] gap-[10%] items-center">
                  <img src={GoogleStore} alt="GoogleStore" className=" " />
                  <img src={AppStore} alt="App store" className="" />
                </div>
              </div>

              <div className="flex flex-col">
                <div className="grid grid-flow-col w-[55%] gap-[20%] items-center">
                  <div>
                    <img src={AppRating} alt="AppRating" className="w-[90%]" />
                    <div className=" text-white font-InterFont text-lg">
                      4.6/5 based on 210260 reviews
                    </div>
                    <div className=" text-white font-InterFont text-lg">
                      Trusted by 5+ Crores Travellers
                    </div>
                  </div>
                  <img src={Award} alt="Award" className="w-[100%]" />
                </div>
              </div> */}
            </div>
          </div>
        </div>
        <img
          src={GoogleStore}
          alt="GoogleStore"
          className="absolute right-[2vw] bottom-[19vw] w-[15vw] h-[5vw]"
        />
        <img
          src={AppStore}
          alt="App store"
          className="absolute right-[2vw] bottom-[12vw] w-[15vw] h-[5vw]"
        />
        {/* <div className="flex flex-col justify-center items-center ">
          <div className="w-[0.1vw] h-[11vh] opacity-35 rounded-full bg-white"></div>
          <div className="text-white text-2xl">or</div>
          <div className="w-[0.1vw] h-[11vh] opacity-35 rounded-full bg-white"></div>
        </div> */}
      </div>
    </>
  );
};

export default MobileApp;
