import React from "react";
import { RiTwitterXLine } from "react-icons/ri";
import { FaFacebookSquare, FaYoutube } from "react-icons/fa";
import { IoLogoInstagram } from "react-icons/io5";
import { IoLogoYoutube } from "react-icons/io5";

export default function FooterThree() {
    return (
        <>
            <div className="md:block hidden bg-[#ffffff] h-[3vw] flex items-center">
                <div className="flex justify-between pt-[0.8vw]">
                    <div className="flex gap-[1vw] pl-[1vw]">
                        <a href="https://www.facebook.com/">

                            <FaFacebookSquare size={"1.6vw"} color="#1F487C" />
                        </a>
                        <a href="https://www.instagram.com/">

                            <IoLogoInstagram size={"1.6vw"} color="#1F487C" />
                        </a>
                        <a href="https://twitter.com/i/flow/login">

                            <RiTwitterXLine size={"1.5vw"} color="#1F487C" />
                        </a>
                        <a href="https://www.youtube.com/">

                            <IoLogoYoutube size={"1.6vw"} color="#1F487C" />
                        </a>
                    </div>
                    <div className="flex">
                        <p className="text-[#1F487C] pr-[0.8vw] font-bold text-[1vw]">
                            Copyright @ thebusstand.com All Rights Reserved.
                        </p>
                    </div>
                </div>
            </div>

        </>
    )
}