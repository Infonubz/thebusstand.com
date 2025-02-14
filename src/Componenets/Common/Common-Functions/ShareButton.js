import React, { useState } from "react";
// import { FaDiscord } from "react-icons/fa6";
import { useLocation } from "react-router";
import {
  FacebookShareButton,
  TwitterShareButton,
  // PinterestShareButton,
  WhatsappIcon,
  WhatsappShareButton,
  // TwitterIcon,
  XIcon,
  TelegramIcon,
  TelegramShareButton,
  FacebookIcon,
  EmailShareButton,
  EmailIcon,
  LinkedinIcon,
  LinkedinShareButton,
  // PinterestIcon,
} from "react-share";
import { SocialIcon } from "react-social-icons";
import { FaSnapchatGhost } from "react-icons/fa";
import Insta from "../../../Assets/SocialMedia-Icons/Instagram.png";

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
  console.log(location, "location1");
  // const params = useParams();
  // console.log(params,"paramss")

  return (
    <>
      <div className="md:p-0 p-[2.5vw]">
        <h1 className="md:text-[2vw] text-[7.5vw] text-center text-blue-950 font-semibold">
          Share Our Updates !!!
        </h1>
        <div className="grid grid-flow-row-dense grid-cols-4 md:mt-[1vw] mt-[2.5vw] md:gap-[1vw] gap-[2.5vw] grid-rows-2">
          <div className="flex flex-col items-center justify-center">
            <div className="custom-icons bg-gray-300 md:p-[0.5vw] p-[5vw] md:w-[4.6vw] w-[7.5vw] h-[7.5vw] md:h-[4.6vw] rounded-full flex justify-center items-center">
              <TwitterShareButton
                url={url}
                title={title}
                style={{ backgroundColor: "#1F487C", borderRadius: "50%" }}
                className="custom-icons bg-orange-700"
              >
                <div className="md:block hidden">
                  <XIcon
                    size={"3.5vw"}
                    round={true}
                    borderRadius={"50%"}
                    style={{ borderRadius: "50%" }}
                  />
                </div>
                <div className="md:hidden block">
                  <XIcon
                    size={"7vw"}
                    round={true}
                    borderRadius={"50%"}
                    style={{ borderRadius: "50%" }}
                  />
                </div>
              </TwitterShareButton>
            </div>
            <span className="md:mt-[0.5vw] mt-[0.5vw] font-semibold md:text-[1.1vw] text-[3.5vw]">
              Twitter
            </span>
          </div>
          <div className="flex flex-col justify-center items-center">
            <div className="bg-green-200 md:p-[0.5vw] p-[5vw]  md:w-[4.6vw] w-[7.5vw] h-[7.5vw] md:h-[4.6vw] rounded-full flex justify-center items-center">
              <WhatsappShareButton url={url} title={title}>
                <div className="md:block hidden">
                  <WhatsappIcon
                    className="rounded-full"
                    size={"3.5vw"}
                    round={true}
                    borderRadius={"50%"}
                    style={{ borderRadius: "50%" }}
                  />
                </div>
                <div className="md:hidden block">
                  <WhatsappIcon
                    className="rounded-full"
                    size={"7vw"}
                    round={true}
                    borderRadius={"50%"}
                    style={{ borderRadius: "50%" }}
                  />
                </div>
              </WhatsappShareButton>
            </div>
            <span className="mt-[0.5vw] font-semibold md:text-[1.1vw] text-[3.5vw]">
              Whatsapp
            </span>
          </div>
          <div className="flex flex-col justify-center items-center">
            <div className="bg-blue-200 md:p-[0.5vw] p-[5vw] md:w-[4.6vw] w-[7.5vw] h-[7.5vw] md:h-[4.6vw] rounded-full flex justify-center items-center">
              <TelegramShareButton url={url} title={title}>
                <div className="md:block hidden">
                  <TelegramIcon
                    size={"3.5vw"}
                    className="text-red-600 rounded-full"
                    round={true}
                    borderRadius={"50%"}
                    style={{ borderRadius: "50%" }}
                  />
                </div>
                <div className="md:hidden block">
                  <TelegramIcon
                    size={"7vw"}
                    className="text-red-600 rounded-full"
                    round={true}
                    borderRadius={"50%"}
                    style={{ borderRadius: "50%" }}
                  />
                </div>
              </TelegramShareButton>
            </div>
            <span className="mt-[0.5vw] font-semibold md:text-[1.1vw] text-[3.5vw]">
              Telegram
            </span>
          </div>
          <div className="flex flex-col justify-center items-center">
            <div className="bg-blue-200 md:p-[0.5vw] p-[5vw]  md:w-[4.6vw] w-[7.5vw] h-[7.5vw] md:h-[4.6vw] rounded-full flex justify-center items-center">
              <FacebookShareButton url={url} title={title}>
                <div className="md:block hidden">
                  <FacebookIcon
                    size={"3.5vw"}
                    className="rounded-full"
                    round={true}
                    borderRadius={"50%"}
                    style={{ borderRadius: "50%" }}
                  />
                </div>
                <div className="md:hidden block">
                  <FacebookIcon
                    size={"7.5vw"}
                    className="rounded-full"
                    round={true}
                    borderRadius={"50%"}
                    style={{ borderRadius: "50%" }}
                  />
                </div>
              </FacebookShareButton>
            </div>
            <span className="mt-[0.5vw] font-semibold md:text-[1.1vw] text-[3.5vw]">
              Facebook
            </span>
          </div>

          <div className="justify-center items-center h-full w-full flex flex-col">
            <div className="bg-pink-200 md:p-[0.5vw]  md:w-[4.6vw] w-[9.5vw] h-[9.5vw] md:h-[4.6vw] rounded-full flex justify-center items-center">
              {/* <SocialIcon
              size={"3.5vw"}
              style={{
                width: "3.5vw",
                height: "3.5vw",
                backgroundColor: "#C2185B",
                borderRadius: "50%", // Ensures the icon is circular
                overflow: "hidden", // Hides anything outside the circle
                objectFit: "cover", // Prevents image distortion if applicable
                boxSizing: "border-box", // Ensures correct sizing with padding/borders
                aspectRatio: "1",
              }}
              url="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full"
            /> */}
              <div className="md:block hidden">
                <a
                  href="https://www.instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={Insta}
                    className="w-[3.5vw] h-[3.5vw]"
                    style={{
                      objectFit: "cover", // Ensures the image fits well within the circle
                      boxSizing: "border-box", // Ensures correct sizing with padding/borders
                      aspectRatio: "1", // Ensures the aspect ratio remains square (1:1)
                    }}
                  />
                </a>
              </div>
              <div className="md:hidden block">
                <a
                  href="https://www.instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={Insta}
                    className="w-[7vw] h-[7vw]"
                    style={{
                      objectFit: "cover", // Ensures the image fits well within the circle
                      boxSizing: "border-box", // Ensures correct sizing with padding/borders
                      aspectRatio: "1", // Ensures the aspect ratio remains square (1:1)
                    }}
                  />
                </a>
              </div>
            </div>
            <span className="mt-[0.5vw] font-semibold md:text-[1.1vw] text-[3.5vw]">
              Instagram
            </span>
          </div>
          <div className="justify-center items-center h-full w-full flex flex-col">
            <div className="bg-blue-200 md:p-[0.5vw] p-[5vw] md:w-[4.6vw] w-[7.5vw] h-[7.5vw] md:h-[4.6vw] rounded-full flex justify-center items-center">
              <LinkedinShareButton
                url={url}
                title={title}
                style={{ borderRadius: "50%" }}
              >
                <div className="md:block hidden">
                  <LinkedinIcon
                    size={"3.5vw"}
                    className="rounded-full"
                    round={true}
                    borderRadius={"50%"}
                    style={{ borderRadius: "50%" }}
                  />
                </div>
                <div className="md:hidden block">
                  <LinkedinIcon
                    size={"7.5vw"}
                    className="rounded-full"
                    round={true}
                    borderRadius={"50%"}
                    style={{ borderRadius: "50%" }}
                  />
                </div>
              </LinkedinShareButton>
            </div>
            <span className="mt-[0.5vw] font-semibold md:text-[1.1vw] text-[3.5vw]">
              Linkedin
            </span>
          </div>

          <div className="justify-center items-center h-full w-full flex flex-col">
            <div className="bg-gray-200 md:p-[0.5vw] p-[5vw] md:w-[4.6vw] w-[7.5vw] h-[7.5vw] md:h-[4.6vw] rounded-full flex justify-center items-center">
              <EmailShareButton
                url={url}
                title={title}
                style={{ borderRadius: "100%" }}
              >
                <div className="md:block hidden">
                  <EmailIcon
                    size={"3.5vw"}
                    className="rounded-full"
                    round={true}
                    borderRadius={"50%"}
                    style={{ borderRadius: "100%" }}
                  />
                </div>
                <div className="md:hidden block">
                  <EmailIcon
                    size={"7vw"}
                    className="rounded-full"
                    round={true}
                    borderRadius={"50%"}
                    style={{ borderRadius: "100%" }}
                  />
                </div>
              </EmailShareButton>
            </div>
            <span className="mt-[0.5vw] font-semibold md:text-[1.1vw] text-[3.5vw]">
              Email
            </span>
          </div>
          <div className="justify-center items-center h-full w-full flex flex-col rounded-full">
            <div className="bg-yellow-200 md:p-[0.5vw] md:w-[4.6vw] w-[9.5vw] h-[9.5vw] md:h-[4.6vw] rounded-full flex items-center justify-center ">
              {/* <PinterestShareButton
              url={url}
              media={imageUrl}
              description={title}
            >
              <PinterestIcon size={"3.5vw"} className="rounded-full" />
          
            </PinterestShareButton> */}

              {/* <SocialIcon
              fallback="snapchat"
              style={{
                width: "3.5vw",
                height: "3.5vw",

                overflow: "hidden", // Hides anything outside the circle
                objectFit: "cover", // Prevents image distortion if applicable
                boxSizing: "border-box", // Ensures correct sizing with padding/borders
                aspectRatio: "1",
              }}
              network="snapchat"
              url="https://www.snapchat.com"
              target="_blank"
              rel="noopener noreferrer"
            /> */}
              <div className="md:block hidden">
                <a
                  href="https://www.snapchat.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="https://www.vectorlogo.zone/logos/snapchat/snapchat-tile.svg"
                    className="rounded-full w-[3.5vw] h-[3.5vw] "
                  />
                </a>
              </div>
              <div className="md:hidden block">
                <a
                  href="https://www.snapchat.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="https://www.vectorlogo.zone/logos/snapchat/snapchat-tile.svg"
                    className="rounded-full w-[7.5vw] h-[7.5vw] "
                  />
                </a>
              </div>
            </div>
            <span className="mt-[0.5vw] font-semibold md:text-[1.1vw] text-[3.5vw]">
              Snapchat
            </span>
          </div>
        </div>
        <div className="md:mt-[1vw] mt-[3vw] mx-[0.5vw] ">
          <p className="md:my-[0.5vw] my-[1.5vw] md:text-[1.2vw] text-[3.5vw] font-semibold">
            Page Link
          </p>
          <div className="flex w-full">
            <input
              className={`border-[0.2vw] ${buttonname ? "border-[#03CCF4]" : "border-blue-950"
                } md:h-[3.5vw] h-[7vw] md:w-[20vw] w-[40vw] rounded-l-[0.5vw] flex items-center justify-center md:text-[1.2vw] text-[3vw] md:pl-[0.5vw] pl-[1vw]`}
            value={window.location.origin + location.pathname}
            />
            {/* <p className="md:text-[1.2vw] text-[3vw]">
              {window.location.origin + location.pathname}
            </p> */}
            <button
              className={`md:h-[3.5vw] h-[7vw] md:w-[10vw] w-[20vw] ${buttonname ? "bg-[#03CCF4]" : "bg-blue-950"
                } md:rounded-r-[0.5vw] rounded-r-[1vw] text-white text-[3.5vw] md:text-[1.1vw]`}
              // onClick={() => SetButtonName(!buttonname)}
              onClick={copy}
            >
              {buttonname ? "Link Copied" : "Copy Link"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default ShareButtons;
