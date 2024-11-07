import React, { useEffect, useState } from "react";
// import refer from "../../../../assets/refer.png";
// import reffer from "../../../../assets/cashback1.gif";
import referralnew from "../../../../assets/referralnew.gif";
import referralMble from "../../../../assets/CashBack_Mble.gif.gif";
import { Tooltip } from "antd";
import {
  FacebookIcon,
  FacebookShareButton,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
  XIcon,
} from "react-share";
import { RxCopy } from "react-icons/rx";
import { IoShareSocialOutline, IoShareSocialSharp } from "react-icons/io5";
import { FaMobileScreen } from "react-icons/fa6";
import { BiSolidOffer } from "react-icons/bi";
import { GiReceiveMoney } from "react-icons/gi";
import {
  GetRefferalCode,
  GetRefferalContent,
} from "../../../../Api/MyAccounts/Referral";
import ModalPopup from "../../../MainComponenet/Modal/ModalPopup";
import ShareButtons from "../../../MainComponenet/ShareButton";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import { useNavigate } from "react-router";

export default function ReferralsIndex() {
  const [currenttab, setCurrentTab] = useState(1);
  const [getContent, setGetContent] = useState("");
  const [getCode, setGetCode] = useState("");
  const [shareModal, setShareModal] = useState(false);
  const [spinning, setSpinning] = useState(false);
  const [visible, setVisible] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const navigation = useNavigate();
  //const navigate = useNavigate();
  const termsConditions = getContent?.['referernt&c'];

  const closeModal = () => {
    setShareModal(false);
  };

  const closeOpenModal = () => {
    setModalIsOpen(false);
  };

  const copyToClipboard = () => {
    const code = getCode?.referral_code;
    console.log(code, "codecodecodecodecode");

    if (code) {
      navigator?.clipboard
        .writeText(code)
        .then(() => {
          setVisible(true);
          // Hide the popover after 2 seconds
          setTimeout(() => setVisible(false), 1000);
        })
        .catch((err) => {
          console.error("Failed to copy: ", err);
        });
    }
  };

  useEffect(() => {
    setSpinning(true);
    const getContent = async () => {
      const response = await GetRefferalContent(setSpinning);
      setGetContent(response);
      console.log(response, "responce content");
    };
    getContent();
  }, []);

  useEffect(() => {
    const getcode = async () => {
      const response = await GetRefferalCode();
      setGetCode(response);
      console.log(response, "isuxdfoidsf");
    };
    getcode();
  }, []);

  // const procedureSteps = getContent?.procedure?.split(/\n\n+/);
  // console.log(procedureSteps[0],"sjdhfkjdfklefd");
  // const contentMapping = {
  //   shareCode: procedureSteps[0],
  //   installApp: procedureSteps[1],
  //   receiveVoucher: procedureSteps[2],
  //   completeTravel: procedureSteps[3],
  // };
 

  return (
    <>
      {spinning ? (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            // background: "rgba(0, 0, 0, 0.2)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <Spin
            className="pl-[20vw]"
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            spinning={spinning}
            indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />}
          />
        </div>
      ) : (
        <div className="md:bg-white md:shadow-lg md:shadow-gray-400 w-full rounded-[1vw]">
          <span className="relative">
            <img
              src={referralMble}
              alt="referralHeader"
              className="w-full block md:hidden"
              // className="rotate-90"
              // style={{
              //   rotate: 90,
              // }}
              // style={{ transform: "rotate(90deg)" }}
            />
            <img
              src={referralnew}
              alt="referralHeader"
              className="w-full rounded-t-[1vw] md:block hidden"
              // className="rotate-90"
              // style={{
              //   rotate: 90,
              // }}
              // style={{ transform: "rotate(90deg)" }}
            />
            <div className="absolute text-[5.5vw] md:text-[3vw] text-white top-[-.2vw] left-[38vw] md:left-[26vw] font-bold ">
              Refer & Earn
            </div>
            <div className="absolute font-mono text-[5.5vw] md:text-[1.8vw] top-[6vw] md:top-[3.3vw] left-[39vw] md:left-[29vw] text-[#ff0805] font-semibold">
              Upto
              <span className="text-[7.5vw] md:text-[2.8vw]">
                ₹{getContent?.referral_amount}
              </span>
            </div>
            <div className="absolute text-[3.5vw] md:text-[1.3vw] font-times font-serif bottom-[5vw] md:bottom-[1.8vw] left-[30vw] md:left-[26.5vw]">
              Refer to <span className="font-semibold">thebusstand.com</span>
            </div>
            <div className="absolute text-[3.5vw] md:text-[1.3vw] font-serif bottom-[.1vw] left-[36vw] md:left-[29vw]">
              Get Your Rewards !!!
            </div>
          </span>
          {/* <label>hi</label> */}

          <div className="flex flex-col pt-[3vw] md:pt-[0vw] md:flex-row items-center md:justify-between px-[3vw] py-[1vw]">
            <div className="flex bg-white shadow-lg shadow-grey-400 md:shadow-none p-[4vw] md:p-[0vw] items-center gap-[6vw] md:gap-[3vw]">
              <div className="flex flex-col">
                <label
                  className={`md:block hidden pt-[0.5vw] md:text-[1vw] ${
                    getCode?.referral_code === null
                      ? "text-[2vw]"
                      : "text-[4vw]"
                  }text-[4vw] text-[#1F487C] font-semibold`}
                >
                  {`${
                    getCode?.referral_code === null
                      ? "Update 100% Profile, Get Referral Code"
                      : "Your referral code"
                  }`}
                </label>
                {/* <Popover 
             content={"Copied to Clipboard"} 
             visible={visible} 
             placement="top"
             className="bg-black text-white"
             arrowPointAtCenter></Popover> */}
                {getCode?.referral_code != null ? (
                  <div className="bg-[#04B9EF] md:mt-[0.5vw] w-[41vw] md:w-[14vw] flex items-center border-dashed rounded-[0.2vw] border-[0.1vw] relative border-[#1F487C]">
                    <label className="text-white text-[4vw] md:text-[1.2vw] pl-[.5vw]">
                      {/* MI487661 */}{" "}
                      {visible ? "Copied to Cliboard" : getCode?.referral_code}
                    </label>
                    <span className="cursor-pointer" onClick={copyToClipboard}>
                      <div className="md:block hidden border-[0.15vw] border-white h-[2vw] w-[2vw] md:h-[0.8vw] md:w-[0.8vw] absolute right-[1vw] md:right-[1vw] top-[1.4vw] md:top-[0.4vw] rounded-[0.2vw]"></div>
                      <div className="md:block hidden border-[0.15vw] border-white h-[2vw] w-[2vw] md:h-[0.8vw] md:w-[0.8vw] bg-[#04B9EF] absolute right-[1.5vw] top-[1.9vw] md:right-[0.5vw] md:top-[0.6vw] rounded-[0.2vw]"></div>
                    </span>
                  </div>
                ) : (
                  <button
                    className="text-[1vw] text-white font-bold bg-[#04B9EF] px-[1vw] py-[0.25vw] rounded-[0.5vw]"
                    onClick={() =>
                      navigation("/main", { state: { tabIndex: 1 } })
                    }
                  >
                    Update Your Profile
                  </button>
                )}
                <label className="block pt-[2vw] md:hidden md:text-[1.2vw] text-[3vw] text-[#1F487C] font-semibold">
                  Your referral code
                </label>
              </div>
              <div className="flex flex-col md:mt-[0vw] mt-[1vw]">
                <div className="block md:hidden bg-[#1F487C] px-[4vw] h-[7vw] w-[25vw] flex items-center rounded-[1.2vw] relative border-solid border-[0.1vw] border-[#1F487C]">
                  <span className="cursor-pointer" onClick={copyToClipboard}>
                    <RxCopy color="white" />
                  </span>
                  <label className="text-white text-[3.5vw] md:text-[1.2vw] pl-[2vw]">
                    COPY
                  </label>
                </div>
                <label className="md:block pt-[0.5vw] hidden text-[1vw] text-[#1F487C] font-semibold">
                  Share On Social
                </label>
                <div className="flex md:pt-[0.5vw] pt-[2vw] items-center gap-x-[2vw] md:gap-x-[0.5vw]">
                  <WhatsappShareButton url={"hi"} title={"hi"}>
                    <WhatsappIcon className="rounded-full md:h-[1.5vw] md:w-[1.5vw] h-[5vw] w-[5vw]" />
                  </WhatsappShareButton>
                  <TwitterShareButton url={"hi"} title={"hi"}>
                    <XIcon className="text-red-600 rounded-full md:h-[1.5vw] md:w-[1.5vw] h-[5vw] w-[5vw]" />
                  </TwitterShareButton>
                  <FacebookShareButton url={"hi"} title={"hi"}>
                    <FacebookIcon className="rounded-full md:h-[1.5vw] md:w-[1.5vw] h-[5vw] w-[5vw]" />
                  </FacebookShareButton>
                  <span
                    className="cursor-pointer"
                    onClick={() => setShareModal(true)}
                  >
                    <IoShareSocialOutline
                      className="md:h-[1.5vw] md:w-[1.5vw] h-[5vw] w-[5vw]"
                      color="#1F487C"
                    />
                  </span>
                </div>
              </div>
            </div>
            <div className="flex md:items-center gap-x-[22vw] mt-[6vw] md:gap-[5vw] md:mt-[0vw]">
              <button
                className={`${
                  currenttab === 1 ? "border-b-[0.2vw] border-[#1F487C]" : ""
                } text-[#1F487C] text-[5vw] md:text-[1.5vw] font-bold`}
                onClick={() => setCurrentTab(1)}
              >
                Refer and Earn
              </button>
              <button
                className={`${
                  currenttab === 2 ? "border-b-[0.2vw] border-[#1F487C]" : ""
                } text-[#1F487C] text-[5vw] md:text-[1.5vw] font-bold`}
                onClick={() => setCurrentTab(2)}
              >
                Referral History
              </button>
            </div>
          </div>
          {currenttab === 1 ? (
            <>
              {/* {getContent?.procedure?.length > 0 &&
             getContent.map((value,index)=>(
           index[0]
          <div>
          {value[0]}
          </div>
        
        ))} */}
              <div className="flex md:items-center md:justify-center">
                <label className="text-[#1F487C] pt-[2vw] md:pt-[0vw] text-[4vw] pl-[4vw] md:pl-[0vw] md:text-[1.3vw] font-semibold">
                  How it works
                </label>
              </div>
              <div className="grid md:grid-cols-2 px-[3vw] md:justify-between md:gap-y-[0vw] gap-y-[5vw] md:gap-x-[12vw] py-[1vw] md:mb-0 mb-[4vw]">
                <>
                  <div className="col-span-1 flex gap-x-[5vw] md:gap-x-[1vw] items-center pt-[2vw] md:pt-[0vw]">
                    <span className="border-[0.1vw] border-[#1F487C] bg-[white] rounded-[2vw] md:rounded-[0.5vw] p-[0.5vw]">
                      <IoShareSocialSharp
                        color="#1F487C"
                        className="md:h-[3vw] md:w-[3vw] h-[13vw] w-[13vw]"
                      />
                    </span>

                    {/* Share your unique referral code with your friends and family to
                earn referral benefits. The more you share, the more benefits
                you get! */}
                      <label className="md:text-[0.9vw] text-[3.4vw] text-[#1F487C]">
                      {getContent && getContent?.procedure[0]?.text.length > 150 ? (
                        <Tooltip
                          placement="top"
                          title={getContent && getContent?.procedure[0]?.text }
                          className="cursor-pointer"
                          color="#1F487C"
                        >
                          {`${getContent && getContent?.procedure[0]?.text?.slice(0, 150)}...`}
                        </Tooltip>
                      ) : (
                        `${getContent && getContent?.procedure[0]?.text?.slice(0, 150)}`
                      )}
                      </label>
                  </div>
                  <div className="col-span-1 flex gap-x-[5vw] md:gap-x-[1vw] items-center">
                    <span className="border-[0.1vw] border-[#1F487C] rounded-[2vw] md:rounded-[0.5vw] p-[0.8vw] md:p-[0.5vw]">
                      <FaMobileScreen
                        color="#1F487C"
                        className="md:h-[3vw] bg-[white] md:w-[3vw] h-[13vw] w-[13vw]"
                      />
                    </span>
                      <label className="md:text-[0.9vw] text-[3.4vw] text-[#1F487C]">
                      {getContent && getContent?.procedure[1]?.text.length > 150 ? (
                        <Tooltip
                          placement="top"
                          title={getContent && getContent?.procedure[1]?.text }
                          className="cursor-pointer"
                          color="#1F487C"
                        >
                          {`${getContent && getContent?.procedure[1]?.text?.slice(0, 150)}...`}
                        </Tooltip>
                      ) : (
                        `${getContent && getContent?.procedure[1]?.text?.slice(0, 150)}`
                      )}
                      </label>
                  </div>
                  <div className="col-span-1 pt-[2vw] flex gap-x-[5vw] md:gap-x-[1vw] items-center">
                    <span className="border-[0.1vw] border-[#1F487C] rounded-[2vw] md:rounded-[0.5vw] p-[0.5vw]">
                      <GiReceiveMoney
                        color="#1F487C"
                        className="md:h-[3vw] bg-[white] md:w-[3vw] h-[13vw] w-[13vw]"
                      />
                    </span>
                      <label className="md:text-[0.9vw] text-[3.4vw] text-[#1F487C]">
                        {/* {getContent?.procedure[2]?.text}{" "} */}
                        {getContent && getContent?.procedure[2]?.text.length > 150 ? (
                        <Tooltip
                          placement="top"
                          title={getContent && getContent?.procedure[2]?.text }
                          className="cursor-pointer"
                          color="#1F487C"
                        >
                          {`${getContent && getContent?.procedure[2]?.text?.slice(0, 150)}...`}
                        </Tooltip>
                      ) : (
                        `${getContent && getContent?.procedure[2]?.text?.slice(0, 150)}`
                      )}
                      </label>
                  </div>
                  <div className="col-span-1 pt-[2vw] flex gap-x-[5vw] md:gap-x-[1vw] items-center">
                    <span className="border-[0.1vw] border-[#1F487C] rounded-[2vw] md:rounded-[0.5vw] p-[0.5vw]">
                      <BiSolidOffer
                        color="#1F487C"
                        className="md:h-[3vw] bg-[white] md:w-[3vw] h-[13vw] w-[13vw]"
                      />
                    </span>
                      <label className="md:text-[0.9vw] text-[3.4vw] text-[#1F487C]">
                      {getContent && getContent?.procedure[3]?.text.length > 150 ? (
                        <Tooltip
                          placement="top"
                          title={getContent && getContent?.procedure[3]?.text }
                          className="cursor-pointer"
                          color="#1F487C"
                        >
                          {`${getContent && getContent?.procedure[3]?.text?.slice(0, 150)}...`}
                        </Tooltip>
                      ) : (
                        `${getContent && getContent?.procedure[3]?.text?.slice(0, 150)}`
                      )}
                      </label>
                  </div>
                </>
              </div>
              {/* <div className="grid grid-cols-2 px-[3vw] justify-between gap-x-[12vw] py-[1vw]">
           
          </div> */}
              <div className="flex items-center justify-center pt-[6vw] md:pt-[0vw] w-full">
                <label
                 onClick={() => setModalIsOpen(true)}
                  className="text-[#1F487C] text-[4.5vw] md:text-[1.3vw] font-semibold py-[1vw] cursor-pointer"
                >
                  Terms & Conditions
                </label>
              </div>
            </>
          ) : (
            <div className="flex items-center justify-end mt-[2vw] pr-[3vw]">
              <div className="flex flex-col md:p-[0vw] p-[8vw] w-screen md:w-[20vw]">
                <div className="border-[#1F487C] bg-white flex flex-col border-[0.1vw] py-[0.2vw] h-[20vw] md:h-[4vw] pl-[1vw] w-full rounded-[3.5vw] md:rounded-[1vw]">
                  <label className="text-[#1F487C] p-[2vw] md:p-[0vw] text-[5vw] md:text-[1.1vw]">
                    ₹ 0
                  </label>
                  <label className="text-[#1F487C] p-[1.5vw] md:p-[0vw] font-semibold text-[4vw] md:text-[1.1vw]">
                    Total Rewards
                  </label>
                </div>
                <label className="text-[#1F487C] text-[5vw] md:text-[1.2vw] font-bold text-center pt-[6vw] md:pt-[2vw]">
                  No referrals yet!
                </label>
                <label className="text-[#1F487C] text-[4vw] md:text-[1vw] text-center py-[1vw]">
                  Start referring your friends and earn rewards
                </label>
                {/* <label className="text-[#1F487C] md:px-0 px-[21vw] fixed text-[4.5vw] md:text-[1.2vw] md:pt-[0vw] pt-[10vw] text-center font-semibold md:pb-[2vw]
                 bottom-3 md:static">
                  Terms & Conditions
                </label> */}
                <label className={`text-[#1F487C] cursor-pointer text-[4.5vw] md:text-[1.2vw] md:pt-[0vw] pt-[10vw] text-center font-semibold md:pb-[2vw]`} onClick={() => setModalIsOpen(true)}>
                  Terms & Conditions
                </label>
              </div>
            </div>
          )}
          <ModalPopup
            show={shareModal}
            onClose={closeModal}
            height="28vw"
            width="32vw"
          >
            <ShareButtons url={"http://localhost:3008/"} />
          </ModalPopup>
        </div>
      )}

     <ModalPopup
        show={modalIsOpen}
        onClose={closeOpenModal}
        height="35vw"
        width="48vw"
      >
        <div>
        <div className="flex h-[3vw] justify-center text-center">
         <label className="text-[1.4vw] text-[#1F487C] font-bold">Terms & Conditions</label> 
        </div>
        <div className='Legal-Information overflow-y-scroll w-full h-[29vw] px-[0.5vw] py-[1vw]'>
         {/* <label>{termsConditions}</label> */}
         <div><p className='text-[1vw] text-[#1F487C]'>
                        {termsConditions?.split("\r\n")?.map((line, index) => (
                            <p key={index} className="pb-[0.1vw]">
                                {line}
                                <br />
                            </p>
                        ))}
                    </p></div>
        </div>
        </div>
      </ModalPopup>
    </>
  );
}
