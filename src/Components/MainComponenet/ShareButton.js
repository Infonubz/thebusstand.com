import React, { useState } from "react";
import { FaDiscord } from "react-icons/fa6";
import { useLocation, useParams } from "react-router";
import {
  FacebookShareButton,
  TwitterShareButton,
  PinterestShareButton,
  WhatsappIcon,
  WhatsappShareButton,
  TwitterIcon,
  XIcon,
  TelegramIcon,
  TelegramShareButton,
  FacebookIcon,
  EmailShareButton,
  EmailIcon,
  LinkedinIcon,
  LinkedinShareButton,
  PinterestIcon,
  
} from "react-share";



import { SocialIcon } from "react-social-icons";

const ShareButtons = ({ url, title, imageUrl }) => {
  const [buttonname, SetButtonName] = useState(false);
  const copy = () => {
    const el = document.createElement("input");
    el.value = window.location.href;
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
    SetButtonName(true);
  };
  const location = useLocation();
  console.log(location,"location1");
  // const params = useParams();
  // console.log(params,"paramss")

  return (
    <>
      <h1 className="text-[2vw] text-center text-blue-950 font-semibold">
        Share Our Updates !!!
      </h1>
      <div className="grid grid-flow-row-dense grid-cols-4 mt-[1vw] gap-[1vw] grid-rows-2 ">
        <div className="flex flex-col items-center justify-center">
          <div className="bg-gray-300 p-[0.5vw] rounded-full flex justify-center items-center">
            <TwitterShareButton url={url} title={title}>
              <XIcon size={"3.5vw"} className="text-red-600 rounded-full" />
            </TwitterShareButton>
          </div>
          <span className="mt-[0.5vw] font-semibold text-[1.1vw]">Twitter</span>
        </div>

        <div className="flex flex-col justify-center items-center">
          <div className="bg-green-200 p-[0.5vw] rounded-full flex justify-center items-center">
            <WhatsappShareButton url={url} title={title}>
              <WhatsappIcon className="rounded-full" size={"3.5vw"} />
            </WhatsappShareButton>
          </div>
          <span className="mt-[0.5vw] font-semibold text-[1.1vw]">
            Whatsapp
          </span>
        </div>

        <div className="flex flex-col justify-center items-center">
          <div className="bg-blue-200 p-[0.5vw] rounded-full flex justify-center items-center">
            <TelegramShareButton url={url} title={title}>
              <TelegramIcon
                size={"3.5vw"}
                className="text-red-600 rounded-full"
              />
            </TelegramShareButton>
          </div>
          <span className="mt-[0.5vw] font-semibold text-[1.1vw]">
            Telegram
          </span>
        </div>

        <div className="flex flex-col justify-center items-center">
          <div className="bg-blue-200 p-[0.5vw] rounded-full flex justify-center items-center">
            <FacebookShareButton url={url} title={title}>
              <FacebookIcon size={"3.5vw"} className="rounded-full" />
            </FacebookShareButton>
          </div>
          <span className="mt-[0.5vw] font-semibold text-[1.1vw]">
            Facebook
          </span>
        </div>

        <div className="justify-center items-center h-full w-full flex flex-col">
          <div className="bg-pink-200 p-[0.5vw] rounded-full flex justify-center items-center">
            <SocialIcon
              size={"3.5vw"}
              style={{ width: "3.5vw", height: "3.5vw" }}
              url="https://www.instagram.com"
              target="_blank" 
              rel="noopener noreferrer"
            />
          </div>
          <span className="mt-[0.5vw] font-semibold text-[1.1vw]">
            Instagram
          </span>
        </div>
        <div className="justify-center items-center h-full w-full flex flex-col">
          <div className="bg-blue-200 p-[0.5vw] rounded-full flex justify-center items-center">
            <LinkedinShareButton url={url} title={title}>
              <LinkedinIcon size={"3.5vw"} className="rounded-full" />
            </LinkedinShareButton>
          </div>
          <span className="mt-[0.5vw] font-semibold text-[1.1vw]">
            Linkedin
          </span>
        </div>

        <div className="justify-center items-center h-full w-full flex flex-col">
          <div className="bg-gray-200 p-[0.5vw] rounded-full flex justify-center items-center">
            <EmailShareButton url={url} title={title}>
              <EmailIcon size={"3.5vw"} className="rounded-full" />
            </EmailShareButton>
          </div>
          <span className="mt-[0.5vw] font-semibold text-[1.1vw]">Email</span>
        </div>
        <div className="justify-center items-center h-full w-full flex flex-col">
          <div className="bg-red-200 p-[0.5vw] rounded-full flex justify-center items-center">
            {/* <PinterestShareButton
              url={url}
              media={imageUrl}
              description={title}
            >
              <PinterestIcon size={"3.5vw"} className="rounded-full" />
          
            </PinterestShareButton> */}
            <SocialIcon
              size={"3.5vw"}
              style={{ width: "3.5vw", height: "3.5vw" }}
              url="https://www.snapchat.com"
              target="_blank" 
              rel="noopener noreferrer"
            />
          </div>
          <span className="mt-[0.5vw] font-semibold text-[1.1vw]">
            snapchat
          </span>
        </div>
      </div>
      <div className="mt-[1vw] mx-[0.5vw] ">
        <p className="my-[0.5vw] text-[1.2vw] font-semibold">Page Link</p>
        <div className="flex">
          <div
            className={`border-[0.2vw] ${
              buttonname ? "border-[#03CCF4]" : "border-blue-950"
            } h-["3.5vw"px] w-[20vw] rounded-l-[0.5vw] flex items-center justify-center`}
          >
            <p className="text-[1.2vw]">
              {url}
              {location.pathname} </p>
              
          </div>
          <button
            className={`h-[3vw] w-[10vw] ${
              buttonname ? "bg-[#03CCF4]" : "bg-blue-950"
            } rounded-r-[0.5vw] text-white text-[1.1vw]`}
            // onClick={() => SetButtonName(!buttonname)}
            onClick={copy}
          >
            {buttonname ? "Link Copied" : "Copy Link"}
          </button>
        </div>
      </div>
    </>
  );
};
export default ShareButtons;
