import React, { useEffect, useState } from "react";
import refer from "../../../../assets/refer.png";
import reffer from "../../../../assets/cashback1.gif"
import referralnew from "../../../../assets/referralnew.gif"
import {
  FacebookIcon,
  FacebookShareButton,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
  XIcon,
} from "react-share";
import { IoShareSocialOutline, IoShareSocialSharp } from "react-icons/io5";
import { FaMobileScreen } from "react-icons/fa6";
import { BiSolidOffer } from "react-icons/bi";
import { GiReceiveMoney } from "react-icons/gi";
import { GetRefferalCode, GetRefferalContent } from "../../../../Api/MyAccounts/Referral";
import ModalPopup from "../../../MainComponenet/Modal/ModalPopup";
import ShareButtons from "../../../MainComponenet/ShareButton";
import { LoadingOutlined } from "@ant-design/icons";
import { Popover, Spin } from "antd";
import { useNavigate } from "react-router";

export default function ReferralsIndex() {
  const [currenttab, setCurrentTab] = useState(1);
  const [getContent,setGetContent] = useState("");
  const [getCode , setGetCode] = useState("")
  const [shareModal,setShareModal] = useState(false)
  const [spinning,setSpinning] = useState(false)
  const [visible, setVisible] = useState(false);
  
  const navigate = useNavigate()

  const closeModal = () =>{
    setShareModal(false)
  }

  console.log(getContent,"1responcecontent");


useEffect(()=>{
  setSpinning(true)
  const getContent = async() =>{
    const response = await GetRefferalContent(setSpinning)
    setGetContent(response)
    console.log(response,"responcecontent");
  }
  getContent()
},[])

useEffect(()=>{
  const getcode = async() =>{
    const response = await GetRefferalCode()
    setGetCode(response)
    console.log(response,"isuxdfoidsf");
  }
 getcode()
},[])

const procedureSteps = getContent?.procedure?.split(/\r\n\r\n+/);
// console.log(procedureSteps[0],"sjdhfkjdfklefd");
// const contentMapping = {
//   shareCode: procedureSteps[0],
//   installApp: procedureSteps[1],
//   receiveVoucher: procedureSteps[2],
//   completeTravel: procedureSteps[3],
// };
const copyToClipboard = () => {
  const code = getCode?.referral_code;
  if (code) {
    navigator.clipboard.writeText(code)
      .then(() => {
        setVisible(true);
        // Hide the popover after 2 seconds
        setTimeout(() => setVisible(false), 1000);
      })
      .catch(err => {
        console.error('Failed to copy: ', err);
      });
  }
};



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
        ) :(
    <div className="bg-white w-full rounded-[1vw]">
      <span className="relative">
      <img
        src={referralnew}
        className="w-full rounded-t-[1vw]"
        // className="rotate-90"
        // style={{
        //   rotate: 90,
        // }}
        // style={{ transform: "rotate(90deg)" }}
      />
      <div className="absolute text-[3vw] text-white top-[-.2vw] left-[26vw] font-bold ">Refer & Earn</div>
      <div className="absolute font-mono  text-[1.8vw] top-[3.3vw] left-[28vw] text-[#ff0805] font-semibold">Upto <span className="text-[2.8vw]">₹{
getContent?.referral_amount}</span></div>
      <div className="absolute text-[1.3vw] font-times font-serif bottom-[1.8vw] left-[26.5vw]">Refer to <span className="font-semibold">thebusstand.com</span></div>
      <div className="absolute  text-[1.3vw] font-serif bottom-[.1vw] left-[29vw]" >Get Your Rewards !!!</div>
      </span>
      {/* <label>hi</label> */}

      <div className="flex items-center justify-between px-[3vw] py-[1vw]">
        <div className="flex items-center gap-[3vw]">
          <div className="flex flex-col">
            <label className="text-[1.2vw] text-[#1F487C] font-semibold">
              Your referral code
            </label>
            {/* <Popover 
             content={"Copied to Clipboard"} 
             visible={visible} 
             placement="top"
             className="bg-black text-white"
             arrowPointAtCenter></Popover> */}
            <div  className="bg-[#04B9EF] w-[14vw] flex items-center border-dashed rounded-[0.2vw] border-[0.1vw] relative border-[#1F487C]">
              <label className="text-white text-[1.2vw] pl-[.5vw]">
                {/* MI487661 */}  {visible ? "Copied to Cliboard" : getCode?.referral_code} 
              </label>
              <span className="cursor-pointer" onClick={copyToClipboard}>
              <div className="border-[0.15vw] border-white h-[0.8vw] w-[0.8vw] absolute right-[1vw] top-[0.4vw] rounded-[0.2vw]"></div>
              <div className="border-[0.15vw] border-white h-[0.8vw] w-[0.8vw] bg-[#04B9EF] absolute right-[0.5vw] top-[0.6vw] rounded-[0.2vw]"></div>
              </span>
            </div>
          </div>
          <div className="flex flex-col">
            <label className="text-[1.2vw] text-[#1F487C] font-semibold">
              Share On Social
            </label>
            <div className="flex items-center gap-x-[0.5vw]">
              <WhatsappShareButton url={"hi"} title={"hi"}>
                <WhatsappIcon className="rounded-full" size={"1.5vw"} />
              </WhatsappShareButton>
              <TwitterShareButton url={"hi"} title={"hi"}>
                <XIcon size={"1.5vw"} className="text-red-600 rounded-full" />
              </TwitterShareButton>
              <FacebookShareButton url={"hi"} title={"hi"}>
                <FacebookIcon size={"1.5vw"} className="rounded-full" />
              </FacebookShareButton>
              <span className="cursor-pointer" onClick={()=>setShareModal(true)}>
              <IoShareSocialOutline size={"1.5vw"} color="#1F487C" />
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-[5vw]">
          <button
            className={`${
              currenttab == 1 ? "border-b-[0.2vw] border-[#1F487C]" : ""
            } text-[#1F487C] text-[1.5vw] font-bold`}
            onClick={() => setCurrentTab(1)}
          >
            Refer and Earn
          </button>
          <button
            className={`${
              currenttab == 2 ? "border-b-[0.2vw] border-[#1F487C]" : ""
            } text-[#1F487C] text-[1.5vw] font-bold`}
            onClick={() => setCurrentTab(2)}
          >
            Referral History
          </button>
        </div>
      </div>
      {currenttab == 1 ? (
        <>
        {/* {getContent?.procedure?.length > 0 &&
        getContent?.procedure?.split(/\r\n\r\n/)?.map((value,index)=>(
          // index[0]
          <div>

          </div>
        
        ))} */}
          <div className="flex items-center justify-center">
            <label className="text-[#1F487C] text-[1.3vw] font-semibold">
              How it works
            </label>
          </div>
          <div className="grid grid-cols-2 px-[3vw] justify-between gap-x-[12vw] py-[1vw]">
            <div className="col-span-1 flex gap-x-[1vw] items-center">
              <span className="border-[0.1vw] border-[#1F487C] rounded-[0.5vw] p-[0.5vw]">
                <IoShareSocialSharp size={"3vw"} color="#1F487C" className="" />
              </span>
              <label className="text-[0.9vw] text-[#1F487C]">
                {/* Share your unique referral code with your friends and family to
                earn referral benefits. The more you share, the more benefits
                you get! */}
               {procedureSteps?.length > 0 && procedureSteps[0]}
              </label>
            </div>
            <div className="col-span-1 flex gap-x-[1vw]  items-center">
              <span className="border-[0.1vw] border-[#1F487C] rounded-[0.5vw] p-[0.5vw]">
                <FaMobileScreen size={"3vw"} color="#1F487C" className="" />
              </span>
              <label className="text-[0.9vw] text-[#1F487C]">
                {/* Your friend must install the Tbs app and enter your unique code
                while signing up. */}
                {procedureSteps?.length > 0 && procedureSteps[1]}
              </label>
            </div>
          </div>
          <div className="grid grid-cols-2 px-[3vw] justify-between gap-x-[12vw] py-[1vw]">
            <div className="col-span-1 flex gap-x-[1vw] items-center">
              <span className="border-[0.1vw] border-[#1F487C] rounded-[0.5vw] p-[0.5vw]">
                <GiReceiveMoney size={"3vw"} color="#1F487C" className="" />
              </span>
              <label className="text-[0.9vw] text-[#1F487C]">
                {/* Once they successfully sign up, they will receive a voucher of
                ₹250 instant discount + ₹250 cashback that can be availed on
                their first ever booking. */}
                 {procedureSteps?.length > 0 && procedureSteps[2]}
              </label>
            </div>
            <div className="col-span-1 flex gap-x-[1vw]  items-center">
              <span className="border-[0.1vw] border-[#1F487C] rounded-[0.5vw] p-[0.5vw]">
                <BiSolidOffer size={"3vw"} color="#1F487C" className="" />
              </span>
              <label className="text-[0.9vw] text-[#1F487C]">
                {/* After the completion of their first travel you will receive a
                discount voucher worth ₹150. */}
                 {procedureSteps?.length > 0 && procedureSteps[3]}
              </label>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <label onClick={()=>navigate("/terms")} className="text-[#1F487C] text-[1.3vw] font-semibold py-[1vw] cursor-pointer">
              Terms & Conditions
            </label>
          </div>
        </>
      ) : (
        <div className="flex items-center  justify-end mt-[2vw] pr-[3vw]">
          <div className="flex flex-col w-[20vw]">
            <div className="border-[#1F487C] flex flex-col border-[0.1vw] py-[0.2vw] h-[4vw]  pl-[1vw] w-full rounded-[1vw]">
              <label className="text-[#1F487C] text-[1.1vw]">₹ 0</label>
              <label className="text-[#1F487C] font-semibold text-[1.1vw]">
                Total Rewards
              </label>
            </div>
            <label className="text-[#1F487C] text-[1.2vw] font-bold text-center pt-[2vw]">
              No referrals yet!
            </label>
            <label className="text-[#1F487C] text-[1vw] text-center py-[1vw]">
              Start referring your friends and earn rewards
            </label>
            <label className="text-[#1F487C] text-[1.2vw] text-center font-semibold pb-[2vw]">
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
    </>
  );
}
