import React, { useState } from "react";
import { Drawer } from "antd";
import { useRef } from "react";
import { BsNutFill, BsPlug } from "react-icons/bs";
import { BiSolidBlanket, BiCctv } from "react-icons/bi";
import { PiWifiMedium } from "react-icons/pi";
import { FaFirstAid } from "react-icons/fa";
import { IoTicketOutline } from "react-icons/io5";
import { MdOutlineLight } from "react-icons/md";
import { GiWaterBottle } from "react-icons/gi";
import { MdMyLocation } from "react-icons/md";
import dayjs from "dayjs";
import { Popover } from "antd";
import { IoPawOutline } from "react-icons/io5";
import { Collapse } from "antd";
import { capitalizeLetter } from "../../../Common/Common-Functions/Captalization";
import SVG_List from "../../../Common/SVG/SVG";

export default function MobileCardBottomBar({
    drawername,
    showModal,
    setShowModal,
    amenities,
    boarding,
    dropping,
    busType,
    bus_type,
    policies,
    price,
}) {
    // const colorcode = {
    //   theme: "#1F487C",
    // };
    const [isToggleSwitch, setIsToggleSwitch] = useState("CDCP");

    console.log(bus_type, 'boarding_boarding')
    const onClose = () => {
        setShowModal(false);
    };
    const SVG = SVG_List()

    const LuxuryFind = (type) =>
        type?.toLowerCase().includes("volvo") ||
        type?.toLowerCase().includes("mercedes benz");

    const componentRef = useRef();

    const amenityIcons = {
        Blankets: (
            <BiSolidBlanket
                color={
                    LuxuryFind(bus_type) === true
                        // busType === "luxury"
                        ? "#393939" : "#1F487C"}
                size="4.5vw"
            />
        ),
        "Charging Point": (
            <BsPlug
                color={
                    // busType === "luxury"
                    LuxuryFind(bus_type) === true
                        ? "#393939" : "#1F487C"}
                size="4.5vw"
            />
        ),
        "Emergency exit": (
            // <svg
            //     xmlns="http://www.w3.org/2000/svg"
            //     color={busType === "luxury" ? "#393939" : "#1F487C"}
            //     width="4.5vw"
            //     height="4.5vw"
            //     viewBox="0 0 24 24"
            // >
            //     <path
            //         fill={busType === "luxury" ? "#393939" : "#1F487C"}
            //         d="M13.34 8.17c-.93 0-1.69-.77-1.69-1.7a1.69 1.69 0 0 1 1.69-1.69c.94 0 1.7.76 1.7 1.69s-.76 1.7-1.7 1.7M10.3 19.93l-5.93-1.18l.34-1.7l4.15.85l1.35-6.86l-1.52.6v2.86H7v-3.96l4.4-1.87l.67-.08c.6 0 1.1.34 1.43.85l.86 1.35c.68 1.21 2.03 2.03 3.64 2.03v1.68c-1.86 0-3.56-.83-4.66-2.1l-.5 2.54l1.77 1.69V23h-1.69v-5.1l-1.78-1.69zM21 23h-2V3H6v13.11l-2-.42V1h17zM6 23H4v-3.22l2 .42z"
            //     />
            // </svg>
            LuxuryFind(bus_type) === true ? SVG?.luxury_mobile_emergency : SVG?.normal_mobile_emergency
        ),
        "Live Bus Tracking": (
            <MdMyLocation
                color={
                    // busType === "luxury"
                    LuxuryFind(bus_type) === true
                        ? "#393939" : "#1F487C"}
                size="4.5vw"
            />
        ),
        Pillow: (
            <BiSolidBlanket
                color={
                    // busType === "luxury"
                    LuxuryFind(bus_type) === true
                        ? "#393939" : "#1F487C"}
                size="4.5vw"
            />
        ),
        "Reading Light": (
            <MdOutlineLight
                color={
                    // busType === "luxury"
                    LuxuryFind(bus_type) === true
                        ? "#393939" : "#1F487C"}
                size="4.5vw"
            />
        ),
        "Water Bottle": (
            <GiWaterBottle
                color={
                    LuxuryFind(bus_type) === true
                        // busType === "luxury" 
                        ? "#393939" : "#1F487C"}
                size="4.5vw"
            />
        ),
        "CC Camera": (
            <BiCctv
                color={
                    // busType === "luxury"
                    LuxuryFind(bus_type) === true
                        ? "#393939" : "#1F487C"}
                size="4.5vw"
            />
        ),
        "First Aid Box": (
            <FaFirstAid
                color={
                    // busType === "luxury"
                    LuxuryFind(bus_type) === true
                        ? "#393939" : "#1F487C"}
                size="4.5vw"
            />
        ),
        "M Ticket": (
            <IoTicketOutline
                color={
                    // busType === "luxury"
                    LuxuryFind(bus_type) === true
                        ? "#393939" : "#1F487C"}
                size="4.5vw"
            />
        ),
        BedSheet: (
            // <svg
            //     xmlns="http://www.w3.org/2000/svg"
            //     color={busType === "luxury" ? "#393939" : "#1F487C"}
            //     width="4.5vw"
            //     height="4.5vw"
            //     viewBox="0 0 24 24"
            // >
            //     <path
            //         fill={busType === "luxury" ? "#393939" : "#1F487C"}
            //         d="M4 4h16v12H4V4zm0 14v-2h16v2H4zm0 2h16c1.1 0 2-.9 2-2v-2H2v2c0 1.1.9 2 2 2z"
            //     />
            // </svg>
            LuxuryFind(bus_type) === true ? SVG?.luxury_mobile_bedsheet : SVG?.normal_mobile_bedsheet

        ),
        // "Mobile Charging Point": (
        //   <BsPlug
        //     color={busType === "luxury" ? "#393939" : "#1F487C"}
        //     size="4.5vw"
        //   />
        // ),
        Wifi: (
            <PiWifiMedium
                color={
                    // busType === "luxury"
                    LuxuryFind(bus_type) === true
                        ? "#393939" : "#1F487C"}
                size="4.5vw"
            />
        ),
    };
    const Travel = [
        {
            travel_img: (
                // <svg
                //     width="28"
                //     height="28"
                //     viewBox="0 0 43 42"
                //     xmlns="http://www.w3.org/2000/svg"
                // >
                //     <path
                //         fill-rule="evenodd"
                //         clip-rule="evenodd"
                //         d="M21.4239 39.8934C14.9396 39.8934 9.25157 32.7859 9.25157 24.6841C9.25157 23.2833 9.43244 21.8951 9.7921 20.5469C11.5738 21.2126 13.4137 21.5496 15.2806 21.5496C20.7233 21.5496 25.8542 18.6868 29.22 13.8333C31.9767 16.5149 33.5942 20.4858 33.5942 24.6841C33.5942 32.7859 27.9082 39.8934 21.4239 39.8934ZM28.8271 11.2085C29.1223 11.158 29.4238 11.2359 29.6566 11.4234C33.4237 14.4737 35.6731 19.4304 35.6731 24.6841C35.6731 33.9087 29.0142 42 21.4239 42C13.8336 42 7.1726 33.9087 7.1726 24.6841C7.1726 22.6766 7.50316 20.6943 8.14972 18.7942C8.24535 18.5162 8.45325 18.2887 8.72143 18.1728C8.9917 18.0527 9.29315 18.0569 9.55925 18.177C11.4033 19.0154 13.3284 19.443 15.2806 19.443C20.372 19.443 25.1723 16.5465 28.1223 11.6952C28.2783 11.4382 28.536 11.2612 28.8271 11.2085ZM23.7039 33.617C23.0927 34.2363 22.4528 34.5879 21.7996 34.6661L21.5168 34.6829C20.2071 34.6829 19.1593 33.6317 19.1489 33.6233C18.7435 33.2104 18.0907 33.2041 17.6832 33.6086C17.2716 34.0151 17.2633 34.6808 17.6645 35.0979L17.8356 35.2606C18.2719 35.654 19.4969 36.6261 21.109 36.7713L21.5189 36.7894C22.8411 36.7894 24.0719 36.2228 25.1737 35.1063C25.5791 34.6955 25.5791 34.0278 25.1737 33.617C24.7683 33.2062 24.1093 33.2062 23.7039 33.617ZM21.4243 0C28.4367 0 30.3161 1.25129 32.9189 2.58685C47.1432 11.1163 41.2452 33.332 41.1807 33.5595C41.1075 33.8257 40.9372 34.0475 40.707 34.1849L40.5238 34.2715L34.9792 36.2537C34.8669 36.2938 34.7505 36.3148 34.6341 36.3148C34.2058 36.3148 33.8046 36.0431 33.6549 35.6113C33.4849 35.1244 33.691 34.5943 34.1185 34.3464L34.289 34.2673L39.3055 32.4725L39.5304 31.4253C40.5114 26.4953 42.5424 11.2822 32.2329 4.67233C29.4221 3.07346 26.8192 2.2835 21.4243 2.2835C16.7591 2.2835 14.3496 2.98498 10.6532 4.78398C0.17693 11.8561 2.85772 28.1293 3.70504 32.1127L3.78431 32.4746L8.79877 34.2673C9.3393 34.4611 9.62412 35.0635 9.43285 35.6113C9.28317 36.0431 8.88193 36.3148 8.45158 36.3148L8.27903 36.2993L8.10647 36.2537L2.56396 34.2715C2.23964 34.1556 1.99432 33.8881 1.90492 33.5532L1.68569 32.6439C0.724169 28.3454 -2.41084 10.4367 9.96299 2.68585L11.3368 1.95758C13.2701 0.970699 15.8144 0 21.4243 0ZM18.4537 25.523H16.3976C15.8217 25.523 15.3581 25.9948 15.3581 26.5763C15.3581 27.1577 15.8217 27.6295 16.3976 27.6295H18.4537C19.0275 27.6295 19.4932 27.1577 19.4932 26.5763C19.4932 25.9948 19.0275 25.523 18.4537 25.523ZM26.7918 25.523H24.7357C24.1598 25.523 23.6962 25.9948 23.6962 26.5763C23.6962 27.1577 24.1598 27.6295 24.7357 27.6295H26.7918C27.3656 27.6295 27.8313 27.1577 27.8313 26.5763C27.8313 25.9948 27.3656 25.523 26.7918 25.523Z"
                //         fill={busType === "luxury" ? "#393939" : "#1F4B7F"}
                //     />
                // </svg>
                LuxuryFind(bus_type) === true ? SVG?.mobile_luxury_child : SVG?.mobile_normal_child
            ),
            parent: "Child Passenger Policy",
            child: "Children above the age of 4 will need a ticket",
        },
        {
            travel_img: (
                // <svg
                //     width="28"
                //     height="28"
                //     viewBox="0 0 59 58"
                //     xmlns="http://www.w3.org/2000/svg"
                // >
                //     <path
                //         d="M35.2883 39.646V54.9092H55.5057V39.646H35.2883ZM9.29449 51.8947C10.8896 51.8947 12.1827 53.2614 12.1827 54.9474C12.1827 56.6333 10.8896 58 9.29449 58C7.69938 58 6.40629 56.6333 6.40629 54.9474C6.40629 53.2614 7.69938 51.8947 9.29449 51.8947ZM20.8473 51.8947C22.4424 51.8947 23.7355 53.2614 23.7355 54.9474C23.7355 56.6333 22.4424 58 20.8473 58C19.2522 58 17.9591 56.6333 17.9591 54.9474C17.9591 53.2614 19.2522 51.8947 20.8473 51.8947ZM45.5876 30.5263C49.0833 30.5263 51.0899 32.7303 51.3442 36.5912L55.5057 36.5934C57.1009 36.5934 58.3939 37.9601 58.3939 39.646V54.9092C58.3939 56.5951 57.1009 57.9618 55.5057 57.9618H35.2883C33.6932 57.9618 32.4001 56.5951 32.4001 54.9092V39.646C32.4001 37.9601 33.6932 36.5934 35.2883 36.5934L39.8445 36.5912C40.0891 32.7313 42.0914 30.5263 45.5876 30.5263ZM39.6444 39.646H36.7562V54.9092H39.6444V39.646ZM54.0854 39.646H51.1972V54.9092H54.0854V39.646ZM45.5876 33.5789C43.7735 33.5789 42.8996 34.4225 42.7359 36.589L48.4521 36.5894C48.2809 34.4239 47.4024 33.5789 45.5876 33.5789ZM6.40629 12.2105C4.81118 12.2105 3.51809 13.5772 3.51809 15.2632V48.8421C3.51809 50.528 4.81118 51.8947 6.40629 51.8947H23.7355C25.3306 51.8947 26.6237 50.528 26.6237 48.8421V15.2632C26.6237 13.5772 25.3306 12.2105 23.7355 12.2105H6.40629ZM9.29449 9.26014H20.8473V6.10526C20.8473 4.41934 19.5542 3.05263 17.9591 3.05263H12.1827C10.5876 3.05263 9.29449 4.41934 9.29449 6.10526V9.26014ZM12.1827 0H17.9591C21.1493 0 23.7355 2.73342 23.7355 6.10526V12.3128H6.40629V6.10526C6.40629 2.73342 8.99247 0 12.1827 0ZM6.40629 9.15789H23.7355C26.9257 9.15789 29.5119 11.8913 29.5119 15.2632V48.8421C29.5119 52.2139 26.9257 54.9474 23.7355 54.9474H6.40629C3.21607 54.9474 0.629883 52.2139 0.629883 48.8421V15.2632C0.629883 11.8913 3.21607 9.15789 6.40629 9.15789ZM20.8473 36.6316C22.4424 36.6316 23.7355 37.9983 23.7355 39.6842V42.7368C23.7355 44.4228 22.4424 45.7895 20.8473 45.7895H9.29449C7.69938 45.7895 6.40629 44.4228 6.40629 42.7368V39.6842C6.40629 37.9983 7.69938 36.6316 9.29449 36.6316H20.8473ZM20.8473 39.6842H9.29449V42.7368H20.8473V39.6842ZM20.8473 18.3158C22.4424 18.3158 23.7355 19.6825 23.7355 21.3684V24.4211C23.7355 26.107 22.4424 27.4737 20.8473 27.4737H9.29449C7.69938 27.4737 6.40629 26.107 6.40629 24.4211V21.3684C6.40629 19.6825 7.69938 18.3158 9.29449 18.3158H20.8473ZM20.8473 21.3684H9.29449V24.4211H20.8473V21.3684ZM45.5876 0C49.0833 0 51.0899 2.204 51.3442 6.06489L55.5057 6.06708C57.1009 6.06708 58.3939 7.43379 58.3939 9.11971V24.3829C58.3939 26.0688 57.1009 27.4355 55.5057 27.4355H35.2883C33.6932 27.4355 32.4001 26.0688 32.4001 24.3829V9.11971C32.4001 7.43379 33.6932 6.06708 35.2883 6.06708L39.8445 6.06484C40.0891 2.205 42.0914 0 45.5876 0ZM36.7562 9.11971H35.2883V24.3829H36.7562V9.11971ZM39.6444 9.11971V24.3829H51.1972V9.11971H39.6444ZM45.5876 3.05263C43.7735 3.05263 42.8996 3.89614 42.7359 6.06273L48.4521 6.06313C48.2809 3.89761 47.4024 3.05263 45.5876 3.05263ZM55.5057 24.3829V9.11971H54.0854V24.3829H55.5057Z"
                //         fill={busType === "luxury" ? "#393939" : "#1F4B7F"}
                //     />
                // </svg>
                LuxuryFind(bus_type) === true ? SVG?.mobile_luxury_luggage : SVG?.mobile_normal_luggage
            ),
            parent: "Luggage Policy",
            child: (
                <li>
                    {" "}
                    2 pieces of luggage will be accepted free of charge per passenger.
                    Excess items will be chargeable
                </li>
            ),
            child1: (
                <li>Excess baggage over 10 kgs per passenger will be chargeable</li>
            ),
        },
        {
            travel_img: (
                <IoPawOutline
                    style={{
                        height: "8vw",
                        width: "8vw",
                    }}
                    color={
                        // busType === "luxury"
                        LuxuryFind(bus_type) === true
                            ? "#393939" : "#1F4B7F"}
                />
            ),
            parent: "Pets Policy",
            child: "Pets are not allowed",
        },
        {
            travel_img: (
                // <svg
                //     width="28"
                //     height="28"
                //     viewBox="0 0 46 45"
                //     fill="#393939"
                //     xmlns="http://www.w3.org/2000/svg"
                // >
                //     <path
                //         fill-rule="evenodd"
                //         clip-rule="evenodd"
                //         d="M23.0384 42.75C34.1765 42.75 43.206 33.6836 43.206 22.5C43.206 11.3164 34.1765 2.25 23.0384 2.25C11.9002 2.25 2.87073 11.3164 2.87073 22.5C2.87073 33.6836 11.9002 42.75 23.0384 42.75ZM23.0384 45C35.4146 45 45.4468 34.9268 45.4468 22.5C45.4468 10.0733 35.4146 0 23.0384 0C10.6622 0 0.629883 10.0733 0.629883 22.5C0.629883 34.9268 10.6622 45 23.0384 45Z"
                //         fill={busType === "luxury" ? "#393939" : "#1F4B7F"}
                //     />
                //     <path
                //         fill-rule="evenodd"
                //         clip-rule="evenodd"
                //         d="M7.68058 6.51688C7.89069 6.30598 8.17563 6.1875 8.47272 6.1875C8.76982 6.1875 9.05475 6.30598 9.26486 6.51688L17.668 14.9544C17.8721 15.1666 17.9851 15.4507 17.9825 15.7457C17.98 16.0407 17.8621 16.3228 17.6544 16.5314C17.4467 16.74 17.1656 16.8583 16.8719 16.8609C16.5781 16.8635 16.2951 16.7501 16.0838 16.5451L7.68058 8.10763C7.47054 7.89667 7.35254 7.61057 7.35254 7.31226C7.35254 7.01395 7.47054 6.72785 7.68058 6.51688ZM26.7278 26.2044C26.9379 25.9935 27.2228 25.875 27.5199 25.875C27.817 25.875 28.102 25.9935 28.3121 26.2044L39.5163 37.4544L37.932 39.0451L26.7278 27.7951C26.5177 27.5842 26.3997 27.2981 26.3997 26.9998C26.3997 26.7015 26.5177 26.4154 26.7278 26.2044Z"
                //         fill={busType === "luxury" ? "#393939" : "#1F4B7F"}
                //     />
                //     <path
                //         fill-rule="evenodd"
                //         clip-rule="evenodd"
                //         d="M26.3997 24.75V30.375H19.6771V24.75H26.3997ZM19.89 22.5H25.8092C25.6792 21.0218 25.3409 19.9969 24.4871 19.1565C24.2199 18.8944 24.0077 18.5814 23.8628 18.2358C23.7179 17.8901 23.6433 17.5189 23.6434 17.1439V9H22.4894V17.1304C22.4894 17.9437 22.1387 18.7076 21.5415 19.2364C20.6082 20.0633 20.1275 21.1106 19.89 22.5ZM20.0592 17.55C20.1187 17.4975 20.1664 17.433 20.1992 17.3607C20.2321 17.2884 20.2492 17.2099 20.2497 17.1304V7.5375C20.2497 7.10212 20.6082 6.75 21.0496 6.75H25.0832C25.5257 6.75 25.8843 7.10212 25.8843 7.5375V17.145C25.8843 17.2957 25.9459 17.442 26.0546 17.55C27.4663 18.9383 27.919 20.646 28.0613 22.5C28.1173 23.2313 28.1262 23.985 28.1262 24.75V25.2259L28.1251 25.6984L28.6405 36.3937C28.6405 37.4186 27.7957 38.25 26.7548 38.25H19.2032C18.2284 38.25 17.4363 37.4715 17.4363 36.5107V25.9718C17.4363 25.5615 17.4408 25.1542 17.4497 24.75C17.4699 23.9816 17.517 23.2279 17.6212 22.5C17.8889 20.6145 18.5321 18.9011 20.0592 17.55ZM26.3795 36L26.2159 32.625H19.6771V36H26.3795Z"
                //         fill={busType === "luxury" ? "#393939" : "#1F4B7F"}
                //     />
                // </svg>
                LuxuryFind(bus_type) === true ? SVG?.mobile_luxury_liquor : SVG?.mobile_normal_liquor
            ),
            parent: "Liquor Policy",
            child:
                "Carrying or consuming liquor inside the bus is prohibited. Bus operator reserves the right to deboard drunk passengers.",
        },
        {
            travel_img: (
                // <svg
                //     width="28"
                //     height="28"
                //     viewBox="0 0 51 45"
                //     xmlns="http://www.w3.org/2000/svg"
                // >
                //     <path
                //         d="M31.9294 6.75L32.5237 23.586C32.5243 24.2463 32.0124 24.75 31.3809 24.75H4.1813C3.51052 24.7278 3.01667 24.2069 3.03859 23.586L3.63281 6.75H31.9294ZM8.20704 0C4.59175 0 1.6296 2.75141 1.36567 6.2421L0.982586 16.9933L0.728737 21.7821C0.662834 23.1998 0.629883 24.1919 0.629883 24.7587V27.0014L33.7889 27C34.1779 27 34.5214 26.809 34.728 26.517L34.9362 26.5151L34.9315 23.8406C34.9111 22.7735 34.8245 20.8506 34.6715 18.0718L34.5284 15.5317L34.2149 6.67191C34.2081 6.47824 34.1765 6.29097 34.1232 6.11303C33.7957 2.68398 30.8621 0 27.2914 0H8.20704ZM8.20704 2.25H27.2914C28.9843 2.25 30.4624 3.15495 31.2532 4.5H4.24525C5.03606 3.15495 6.51414 2.25 8.20704 2.25ZM25.785 38.25V41.625C25.785 43.489 27.3208 45 29.2153 45H31.5021C33.3966 45 34.9324 43.489 34.9324 41.625V38.25H25.785ZM0.629883 38.25V41.625C0.629883 43.489 2.16566 45 4.06013 45H6.34696C8.24144 45 9.77721 43.489 9.77721 41.625V38.25H0.629883ZM28.0719 40.5H32.6455V41.625C32.6455 42.2463 32.1336 42.75 31.5021 42.75H29.2153C28.5838 42.75 28.0719 42.2463 28.0719 41.625V40.5ZM2.91672 40.5H7.49038V41.625C7.49038 42.2463 6.97845 42.75 6.34696 42.75H4.06013C3.42864 42.75 2.91672 42.2463 2.91672 41.625V40.5ZM32.6455 27V38.25H2.91672V27H32.6455ZM0.629883 24.75V38.25C0.629883 39.4926 1.65373 40.5 2.91672 40.5H32.6455C33.9085 40.5 34.9324 39.4926 34.9324 38.25V24.75H0.629883ZM8.58913 29.2338C10.4836 29.2338 12.0194 30.7449 12.0194 32.6088C12.0194 34.4728 10.4836 35.9838 8.58913 35.9838C6.69465 35.9838 5.15888 34.4728 5.15888 32.6088C5.15888 30.7449 6.69465 29.2338 8.58913 29.2338ZM26.9304 29.2338C28.8248 29.2338 30.3606 30.7449 30.3606 32.6088C30.3606 34.4728 28.8248 35.9838 26.9304 35.9838C25.0359 35.9838 23.5001 34.4728 23.5001 32.6088C23.5001 30.7449 25.0359 29.2338 26.9304 29.2338ZM15.4859 32.625H20.0596C20.6911 32.625 21.203 33.1287 21.203 33.75C21.203 34.3023 20.7985 34.7616 20.2651 34.8569L20.0596 34.875H15.4859C14.8544 34.875 14.3425 34.3713 14.3425 33.75C14.3425 33.1977 14.747 32.7384 15.2804 32.6431L15.4859 32.625ZM8.58913 31.4838C7.95763 31.4838 7.44571 31.9875 7.44571 32.6088C7.44571 33.2302 7.95763 33.7338 8.58913 33.7338C9.22062 33.7338 9.73254 33.2302 9.73254 32.6088C9.73254 31.9875 9.22062 31.4838 8.58913 31.4838ZM26.9304 31.4838C26.2989 31.4838 25.7869 31.9875 25.7869 32.6088C25.7869 33.2302 26.2989 33.7338 26.9304 33.7338C27.5618 33.7338 28.0738 33.2302 28.0738 32.6088C28.0738 31.9875 27.5618 31.4838 26.9304 31.4838ZM37.2185 26.0947C37.7623 25.944 38.2603 25.6633 38.6679 25.277L40.6923 23.3586L41.0752 28.948L37.2188 32.1843L37.2192 40.6451C37.8009 40.5924 38.2565 40.111 38.2565 39.5249V34.7898C38.2565 34.4605 38.4032 34.1476 38.6579 33.9339L41.2668 31.7445L41.5819 36.3446C41.5902 36.4668 41.6054 36.5885 41.6272 36.7092L42.6792 42.5231C42.7899 43.1348 43.3836 43.5424 44.0053 43.4335C44.627 43.3246 45.0413 42.7404 44.9306 42.1287L43.8694 36.2543L43.0021 23.6179L45.089 25.6595C45.1908 25.7591 45.2726 25.8767 45.3302 26.0061L48.2354 32.5346C48.4886 33.1037 49.1629 33.3631 49.7414 33.1139C50.3199 32.8647 50.5835 32.2013 50.3302 31.6322L47.4251 25.1037C47.2523 24.7155 47.0068 24.3628 46.7014 24.064L42.4635 19.918C42.0156 19.4799 41.2917 19.482 40.8464 19.9225C40.7222 20.0454 40.6328 20.1895 40.5782 20.3428L37.1835 23.5597L37.2184 24.5113L37.2185 26.0947ZM40.3497 17.9605C41.8815 18.3362 43.5779 16.8469 43.9599 15.3398C44.3418 13.8326 43.4096 12.3062 41.8778 11.9304C40.3459 11.5546 38.7945 12.4718 38.4126 13.979C38.0307 15.4861 38.8179 17.5847 40.3497 17.9605Z"
                //         fill={busType === "luxury" ? "#393939" : "#1F4B7F"}
                //     />
                // </svg>
                LuxuryFind(bus_type) === true ? SVG?.mobile_luxury_time : SVG?.mobile_normal_time
            ),
            parent: "Pick up Time Policy",
            child:
                "Bus operator is not obligated to wait beyond the scheduled departure time of the bus. No refund request will be entertained for late arriving passengers.",
        },
    ];

    const DiscountedPrice = (price, item) => {
        const originalPrice = parseInt(price?.price || 0);
        const discountRate = parseInt(item?.rate?.replace("%", "") || 0);
        const discountedPrice =
            originalPrice - (discountRate / 100) * originalPrice;
        return parseInt(discountedPrice);
    };

    // Split the policies by '#*#*' into an array
    const policyArray = policies?.split('#*#*');

    // Separate time intervals and percentages
    const times = policyArray?.slice(0, 4); // First 4 elements are time intervals
    const percentages = policyArray?.slice(4); // Last 4 elements are percentages

    // Rearranging and pairing time intervals with percentages (reverse the percentage array)
    const formattedPolicies = times?.map((time, index) => {
        // If the time contains '--', split it into the time part and percentage part
        let cleanedTime = time;
        let percentage = percentages[percentages?.length - 1 - index];

        if (time.includes('--')) {
            // Split the time and percentage part at '--'
            const [timePart, percentPart] = time?.split('--');
            cleanedTime = timePart?.trim(); // Cleaned time part (before '--')
            percentage = percentPart?.trim() || percentage; // Cleaned percentage part (after '--')
        }

        return (
            <div key={index}>
                {cleanedTime} {percentage} {/* Combine cleaned time and percentage */}
            </div>
        );
    });


    return (
        <div>
            <Drawer
                title={
                    <h1
                        className={` ${
                            // busType === "luxury"
                            LuxuryFind(bus_type) === true
                                ? "text-[#393939]" : "text-[#1F487C]"
                            } pl-[0.6vw] text-[5vw] text-[#1F487C] font-semibold`}
                    >
                        {drawername === "Amenities"
                            ? "Amenities"
                            : drawername === "pickupDrop"
                                ? "Boarding & Droping Points"
                                : "Booking Policies"}
                    </h1>
                }
                placement={"bottom"}
                closable={false}
                onClose={onClose}
                open={showModal}
                key={"bottom"}
                width={"100vw"}
                height={"50%"}
                classNames={{
                    header: "bg-[#E5FFF1]",
                    body: "bg-[#E5FFF1]",
                }}
            >
                <div className="md:p-0 px-[3vw]">
                    <div ref={componentRef} id="capture" className={`h-auto w-full`}>
                        <div className={`h-auto w-full`}>
                            {drawername === "Amenities" ? (
                                <div className="w-full grid grid-flow-col grid-rows-9 gap-[3vw] py-[1.5vw] overflow-x-auto overflow-y-hidden">
                                    {amenities && amenities?.map((amenity, idx) => (
                                        <div key={idx} className="flex items-center gap-[2vw]">
                                            {amenityIcons?.[amenity] || <span>Icon not found</span>}
                                            <p
                                                className={`${
                                                    // busType === "luxury"
                                                    LuxuryFind(bus_type) === true
                                                        ? "text-[#393939]"
                                                        : "text-[#1F487C]"
                                                    } text-[3.5vw]`}
                                            >
                                                {capitalizeLetter(amenity)}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            ) : drawername === "pickupDrop" ? (
                                <div className={`h-auto w-full`}>
                                    <div className="grid grid-col gap-[3vw]">
                                        <Collapse
                                            className="relative shadow-lg bg-white"
                                            items={[
                                                {
                                                    key: "1",
                                                    label: (
                                                        <div className="flex items-center h-[3.5vw] md:h-[5vh]">
                                                            <div className="col-span-2 pl-[1vw] pt-[2vw] md:pt-[0vw]">
                                                                <span
                                                                    className={`
                                    ${
                                                                        // busType === "luxury"
                                                                        LuxuryFind(bus_type) === true
                                                                            ? "text-black"
                                                                            : "text-[#1F487C]"
                                                                        }
                                font-medium  text-[4.5vw] md:text-[1.5vw]`}
                                                                >
                                                                    Boarding
                                                                </span>
                                                            </div>
                                                        </div>
                                                    ),
                                                    children: (
                                                        <div className="flex flex-col gap-y-[2.5vw]">
                                                            {/* <p
                          className={`${
                            busType === "luxury"
                              ? "text-[#393939]"
                              : "text-[#1F487C]"
                          } text-[4vw] font-medium py-[1.5vw]`}
                        >
                          BOARDING
                        </p> */}
                                                            {boarding?.map((item) => {
                                                                // Split the string item by '^'
                                                                const parts = item.split('^');
                                                                console.log(parts, 'parts_dropping')
                                                                // Ensure we have enough parts in the split string
                                                                if (parts.length >= 3) {
                                                                    const place = parts[0];  // "Ameerpet"
                                                                    const time = parts[1];   // "09:00 PM"
                                                                    const id = parts[2];     // "6"

                                                                    return (
                                                                        <div className="flex gap-x-[1vw] pb-[.7vw] items-center" key={id}>


                                                                            <div className={`${
                                                                                // busType === "luxury"
                                                                                LuxuryFind(bus_type) === true
                                                                                    ? "text-[#393939]" : "text-[#1F487C]"} text-[3.5vw] cursor-pointer flex items-center gap-x-[1vw]`}>
                                                                                <span className="font-bold">{time}</span>

                                                                                <span>
                                                                                    {place?.length > 15 ? (
                                                                                        <Popover content={place}>
                                                                                            <div
                                                                                                className={`${
                                                                                                    // busType === "luxury"
                                                                                                    LuxuryFind(bus_type) === true
                                                                                                        ? "text-[#393939]" : "text-[#1F487C]"} text-[4vw] cursor-pointer`}
                                                                                            >
                                                                                                {place?.substr(0, 15)}...
                                                                                            </div>
                                                                                        </Popover>
                                                                                    ) : (
                                                                                        <div
                                                                                            className={`${
                                                                                                // busType === "luxury"
                                                                                                LuxuryFind(bus_type) === true
                                                                                                    ? "text-[#393939]" : "text-[#1F487C]"} text-[4vw]`}
                                                                                        >
                                                                                            {place}
                                                                                        </div>
                                                                                    )}
                                                                                </span>
                                                                            </div>
                                                                        </div>

                                                                    );
                                                                }

                                                                return null;  // If the parts don't have the expected structure, return null.
                                                            })}
                                                        </div>
                                                    ),
                                                },
                                            ]}
                                        />
                                        <Collapse
                                            className={`relative shadow-lg bg-white`}
                                            items={[
                                                {
                                                    key: "1",
                                                    label: (
                                                        <div className="flex items-center h-[3.5vw] md:h-[5vh]">
                                                            <div className="col-span-2 pl-[1vw] pt-[2vw] md:pt-[0vw]">
                                                                <span
                                                                    className={`
                                    ${
                                                                        // busType === "luxury"
                                                                        LuxuryFind(bus_type) === true
                                                                            ? "text-black"
                                                                            : "text-[#1F487C]"
                                                                        }
                                    text-[#1F487C] font-medium  text-[4.5vw] md:text-[1.5vw]`}
                                                                >
                                                                    Dropping
                                                                </span>
                                                            </div>
                                                        </div>
                                                    ),
                                                    children: (
                                                        <div className="flex flex-col gap-y-[2.5vw]">
                                                            {dropping?.map((item) => {
                                                                // Split the string item by '^'
                                                                const parts = item.split('^');

                                                                // Ensure we have enough parts in the split string
                                                                if (parts.length >= 3) {
                                                                    const place = parts[1];
                                                                    const time = parts[2];
                                                                    const id = parts[0];

                                                                    return (
                                                                        <div className="flex gap-x-[1vw] pb-[.7vw] items-center" key={id}>


                                                                            <div className={`${
                                                                                // busType === "luxury"
                                                                                LuxuryFind(bus_type) === true
                                                                                    ? "text-[#393939]" : "text-[#1F487C]"} text-[3.5vw] cursor-pointer flex items-center gap-x-[1vw]`}>
                                                                                <span className="font-bold">{time}</span>

                                                                                <span>
                                                                                    {place?.length > 15 ? (
                                                                                        <Popover content={place}>
                                                                                            <div
                                                                                                className={`${
                                                                                                    // busType === "luxury"
                                                                                                    LuxuryFind(bus_type) === true
                                                                                                        ? "text-[#393939]" : "text-[#1F487C]"} text-[4vw] cursor-pointer`}
                                                                                            >
                                                                                                {place?.substr(0, 15)}...
                                                                                            </div>
                                                                                        </Popover>
                                                                                    ) : (
                                                                                        <div
                                                                                            className={`${
                                                                                                // busType === "luxury"
                                                                                                LuxuryFind(bus_type) === true
                                                                                                    ? "text-[#393939]" : "text-[#1F487C]"} text-[4vw]`}
                                                                                        >
                                                                                            {place}
                                                                                        </div>
                                                                                    )}
                                                                                </span>
                                                                            </div>
                                                                        </div>

                                                                    );
                                                                }

                                                                return null;  // If the parts don't have the expected structure, return null.
                                                            })}
                                                        </div>
                                                    ),
                                                },
                                            ]}
                                        />
                                    </div>
                                </div>
                            ) : drawername === "Policies" ? (
                                <div className={` h-auto`}>
                                    <div className="flex w-full">
                                        <button
                                            className={`w-[50vw] h-[7vw] flex border-[0.15vw] rounded-l-[1vw]  px-[0.3vw] justify-center gap-[0.5vw] items-center ${isToggleSwitch === "CDCP"
                                                ?
                                                // busType === "luxury"
                                                LuxuryFind(bus_type) === true
                                                    ? "bg-[#393939] border-[#393939]"
                                                    :
                                                    // busType === "regular"
                                                    LuxuryFind(bus_type) !== true
                                                        ? "bg-[#1F4B7F] border-[#1F4B7F]"
                                                        : ""
                                                : "bg-[#F6F6F6]"
                                                }`}
                                            onClick={() => setIsToggleSwitch("CDCP")}
                                        >
                                            <span
                                                className={`${isToggleSwitch === "CDCP"
                                                    ? "text-[#F6F6F6]"
                                                    : LuxuryFind(bus_type) !== true
                                                        // busType === "regular"
                                                        ? "text-[#1F4B7F]"
                                                        : LuxuryFind(bus_type) === true
                                                            //  busType === "luxury"
                                                            ? "text-[#393939]"
                                                            : "text-[#F6F6F6]"
                                                    }  text-[3vw] font-medium`}
                                            >
                                                Cancellation Related Policies
                                            </span>
                                        </button>
                                        <button
                                            className={`w-[50vw] h-[7vw] flex border-[0.15vw]  rounded-r-[1vw] px-[0.1vw] justify-center gap-[0.5vw] items-center ${isToggleSwitch === "TRP"
                                                ?
                                                // busType === "luxury"
                                                LuxuryFind(bus_type) === true
                                                    ? "bg-[#393939] border-[#393939]"
                                                    :
                                                    // busType === "regular"
                                                    LuxuryFind(bus_type) !== true
                                                        ? "bg-[#1F4B7F] border-[#1F487C]"
                                                        : ""
                                                : "bg-[#F6F6F6]"
                                                }`}
                                            onClick={() => setIsToggleSwitch("TRP")}
                                        >
                                            <span
                                                className={`${isToggleSwitch === "TRP"
                                                    ? "text-[#F6F6F6]"
                                                    : LuxuryFind(bus_type) !== true
                                                        // busType === "regular"
                                                        ? "text-[#1F4B7F]"
                                                        :
                                                        // busType === "luxury"
                                                        LuxuryFind(bus_type) === true
                                                            ? "text-[#393939]"
                                                            : "text-[#F6F6F6]"
                                                    }  text-[3vw] font-medium`}
                                            >
                                                Travel Related Policies
                                            </span>
                                        </button>
                                    </div>

                                    {isToggleSwitch === "CDCP" ? (
                                        <div className="py-[5vw]">
                                            <div className="">
                                                <div className="grid grid-cols-12 justify-between  gap-[1vw]">
                                                    <div className="col-span-7">
                                                        <p
                                                            className={`${
                                                                // busType === "luxury"
                                                                LuxuryFind(bus_type) === true
                                                                    ? "text-[#393939]"
                                                                    : "text-[#1F487C]"
                                                                } text-[3.2vw] font-semibold `}
                                                        >
                                                            Cancellation Time
                                                        </p>
                                                    </div>
                                                    <div className="col-span-2 flex items-center justify-center">
                                                        <p
                                                            className={`${
                                                                // busType === "luxury"
                                                                LuxuryFind(bus_type) === true
                                                                    ? "text-[#393939]"
                                                                    : "text-[#1F487C]"
                                                                } text-[3.2vw] font-semibold col-span-2`}
                                                        >
                                                            Penalty(%)
                                                        </p>
                                                    </div>
                                                    <div className="col-span-3 flex items-center justify-center">
                                                        <p
                                                            className={`${
                                                                // busType === "luxury"
                                                                LuxuryFind(bus_type) === true
                                                                    ? "text-[#393939]"
                                                                    : "text-[#1F487C]"
                                                                } text-[3.2vw] font-semibold col-span-3`}
                                                        >
                                                            Refund
                                                        </p>
                                                    </div>

                                                </div>

                                                <div className=" mt-[1.5vw]">
                                                    <div className={`text-[3.2vw]  ${
                                                        // busType === 'luxury'
                                                        LuxuryFind(bus_type) === true
                                                            ? 'text-[#393939]' : 'text-[#1F4B7F]'}`}>
                                                        {formattedPolicies?.map((items, index) => {
                                                            const parts = items?.props?.children;
                                                            const percentageString = parts[2]; // Assume parts[2] contains "20%" as a string

                                                            // Check if the percentage is valid
                                                            const percentage = percentageString ? parseFloat(percentageString) / 100 : 0;

                                                            // Calculate the value
                                                            const calculatedValue = price * percentage;

                                                            const CancellationFare = price - calculatedValue
                                                            // Log the calculated value if you want to inspect it


                                                            if (parts && parts.length > 0) {
                                                                return (
                                                                    <>
                                                                        <div className="grid grid-cols-12 ">
                                                                            <div className="col-span-7 justify-center items-center" key={index}>{parts[0]}</div>
                                                                            <div className="col-span-2 flex justify-center items-center" key={index}>{parts[2]}</div>
                                                                            <div className="col-span-3 flex justify-center items-center" key={index}>
                                                                                {`₹ ${Math.floor(CancellationFare)}`}
                                                                            </div>
                                                                        </div>
                                                                    </>
                                                                );  // Display the first part safely
                                                            } else {
                                                                return <div key={index}>No content</div>;  // Fallback for empty or missing parts
                                                            }
                                                        })}
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    ) : (
                                        <div className="py-[5vw]">
                                            {Travel?.map((trp) => (
                                                <div className="flex gap-x-[9vw] py-[2vw]">
                                                    <div className="w-[3vw] h-[3vw] pt-[1vw] ">
                                                        {trp?.travel_img}
                                                    </div>
                                                    <div className="flex flex-col ">
                                                        <div
                                                            className={`${
                                                                // busType === "luxury"
                                                                LuxuryFind(bus_type) === true
                                                                    ? "text-[#393939]"
                                                                    : "text-[#1F4B7F]"
                                                                } text-[3.5vw] font-semibold`}
                                                        >
                                                            {trp?.parent}
                                                        </div>
                                                        <div
                                                            className={`${
                                                                // busType === "luxury"
                                                                LuxuryFind(bus_type) === true
                                                                    ? "text-[#393939]"
                                                                    : "text-[#1F4B7F]"
                                                                } text-[3.2vw]`}
                                                        >
                                                            {trp?.child}
                                                        </div>
                                                        <div
                                                            className={`${
                                                                // busType === "luxury"
                                                                LuxuryFind(bus_type) === true
                                                                    ? "text-[#393939]"
                                                                    : "text-[#1F4B7F]"
                                                                } text-[3.2vw]`}
                                                        >
                                                            {trp?.child1}
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ) : (
                                ""
                            )}
                        </div>
                    </div>
                </div>
            </Drawer>
        </div>
    );
};
