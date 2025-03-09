import React, { useEffect, useState } from "react";
//import HomeHearder from "../MainComponenet/HomeHearder";
import homesky from "../../../Assets/Theme/Sky/BackgroundSky1.png"
import {
    Collapse,
    // Divider
} from "antd";
import { RiArrowUpSFill } from "react-icons/ri";
import { RiArrowDownSFill } from "react-icons/ri";
import { Input } from "antd";
import FaQgif from "../../../Assets/Gif/faq.gif";
import { useDispatch } from "react-redux";
import Navbar_One from "../../Common/Top-Navbar/Navbar-One";
import FooterTwo from "../Footer/Footer-Two/FooterTwo";
import { GetFAQById } from "../../../Api-TBS/Home/Home";
import FooterThree from "../Footer/Footer-Three/FooterThree";
import NavMobile from "../Footer/Footer-Two/FooterTabs/NavMobile";

export default function FAQPage() {
    const [faq, setFAQ] = useState();
    const dispatch = useDispatch();
    const [activeKey, setActiveKey] = useState(null);

    const handleCollapseChange = (key) => {
        setActiveKey(activeKey === key ? null : key);
    };

    const handleClick = async (value) => {
        try {
            const response = await GetFAQById(dispatch, value);
            setFAQ(response);
             // console.log("response of FAQ", response);
        } catch (error) {
            console.error("Error", error);
        }
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <div className="bg-[#E5FFF1] min-h-screen max-h-auto w-full overflow-clip ">
                <div className="">
                    <Navbar_One />
                </div>
                <div
                    className="relative md:h-[45vw] h-[100%] bg-[#E5FFF1]"
                    style={{ zIndex: 1 }}
                >
                    <div
                        className="md:h-[10vw] h-[19vw] md:z-0 overflow-x-hidden"
                        style={{
                            backgroundImage: `url(${homesky})`,
                            width: "100%",
                            overflow: "hidden",
                            // backgroundSize: "cover",
                            position: "relative",
                            overflowX: "hidden",
                        }}
                    >
                        <label className="absolute left-[39vw] md:left-[48.5vw] top-[2vw] md:top-[0.1vw] text-[8vw]  md:text-[4vw] text-white font-bold opacity-20">
                            {`FAQs`}
                        </label>
                        <label className="absolute left-[43vw] md:left-[51vw] top-[4.5vw] md:top-[2vw] text-[5vw]  md:text-[2vw] text-white font-bold">
                            {`FAQs`}
                        </label>
                        <div className="absolute left-[3vw] top-[4vw] z-[2] text-[7vw] text-white font-bold md:hidden sm:block ">
                            <NavMobile />
                        </div>
                        <div className="cloudhome"></div>
                    </div>
                    <div className="absolute md:top-[6vw] top-[15vw] px-[3vw] flex flex-col">
                        <div className="bg-white h-[85vh] w-[94vw] md:h-[35vw] relative rounded-[2.5vw] md:rounded-[1vw] shadow-lg shadow-gray-300">
                            <div className="grid grid-rows md:grid-cols-7">
                                <div className="md:col-start-1 md:col-span-4 m-[1vw] md:m-[3vw] h-[37vh] md:h-[25vw] Legal-Information  overflow-y-auto">
                                    <Collapse
                                        accordion
                                        activeKey={activeKey ? [activeKey] : []}
                                        onChange={(key) => {
                                            handleCollapseChange(key);
                                            // Check if the active key matches the key you want to trigger
                                            const value = 1;
                                            handleCollapseChange("1");
                                            handleClick(value);
                                        }}
                                        size="large"
                                        className="relative shadow-lg bg-white md:m-[1vw] m-[3vw] border-none"
                                        style={{
                                            boxShadow:
                                                "0 -4px 6px rgba(31, 71, 124, 0.04), 0 8px 15px rgba(31, 71, 124, 0.2)",
                                        }}
                                        expandIcon={({ isActive }) =>
                                            isActive ? (
                                                <>
                                                    <RiArrowUpSFill
                                                        className="md:block hidden mt-[1.2vw]"
                                                        style={{
                                                            color: "#1F487C",
                                                            height: "2.5vw",
                                                            width: "2.5vw",
                                                        }}
                                                    />
                                                    <RiArrowUpSFill
                                                        className="block md:hidden mt-[5vw]"
                                                        style={{
                                                            color: "#1F487C",
                                                            height: "7vw",
                                                            width: "7vw",
                                                        }}
                                                    />
                                                </>
                                            ) : (
                                                <>
                                                    <RiArrowDownSFill
                                                        className="md:block hidden mt-[1.2vw]"
                                                        style={{
                                                            color: "#1F487C",
                                                            height: "2.5vw",
                                                            width: "2.5vw",
                                                        }}
                                                    />
                                                    <RiArrowDownSFill
                                                        className="block md:hidden mt-[6.5vw]"
                                                        style={{
                                                            color: "#1F487C",
                                                            height: "7vw",
                                                            width: "7vw",
                                                        }}
                                                    />
                                                </>
                                            )
                                        }
                                        expandIconPosition="end"
                                        items={[
                                            {
                                                key: "1",
                                                label: (
                                                    <div
                                                        className="flex items-center md:flex-none h-[13vw] md:h-[5vh]"
                                                    // onClick={() => {
                                                    //   const value = 1;
                                                    //   handleCollapseChange("1");
                                                    //   handleClick(value);
                                                    // }}
                                                    >
                                                        <div className="col-span-2 pl-[1vw]">
                                                            <span className="text-[#1F487C] font-medium text-[4.5vw] md:text-[1.5vw]">
                                                                GENERAL
                                                            </span>
                                                        </div>
                                                    </div>
                                                ),
                                                children:
                                                    faq?.general?.length > 0 ? (
                                                        faq?.general?.map((item, index) => (
                                                            <div key={index}>
                                                                <p className="font-bold text-[#1F487C] pb-[1.5vw] md:pb-[0.5vw]">
                                                                    {item?.question}
                                                                </p>
                                                                <p className="text-[#1F487C] md:text-[1vw] text-[3.2vw] pb-[2vw] md:pb-[1.5vw]">
                                                                    {item?.answer}
                                                                </p>
                                                            </div>
                                                        ))
                                                    ) : (
                                                        <p className="text-[#1F487C] md:text-[1vw] text-[3.2vw]">
                                                            No FAQs available.
                                                        </p>
                                                    ),
                                            },
                                        ]}
                                    />
                                    <Collapse
                                        accordion
                                        activeKey={activeKey ? [activeKey] : []} // Ensure only one can be opened
                                        onChange={(key) => {
                                            handleCollapseChange(key);
                                            // Check if the active key matches the key you want to trigger
                                            const value = 2;
                                            handleCollapseChange("2");
                                            handleClick(value);
                                        }}
                                        size={`large`}
                                        className="relative shadow-lg bg-white md:m-[1vw] m-[3vw] border-none"
                                        style={{
                                            boxShadow:
                                                "0 -4px 6px rgba(31, 71, 124, 0.04), 0 8px 15px rgba(31, 71, 124, 0.2)",
                                        }}
                                        expandIcon={({ isActive }) =>
                                            isActive ? (
                                                <>
                                                    <RiArrowUpSFill
                                                        className="md:block hidden mt-[1.2vw]"
                                                        style={{
                                                            color: "#1F487C",
                                                            height: "2.5vw",
                                                            width: "2.5vw",
                                                        }}
                                                    />
                                                    <RiArrowUpSFill
                                                        className="block md:hidden mt-[5vw]"
                                                        style={{
                                                            color: "#1F487C",
                                                            height: "7vw",
                                                            width: "7vw",
                                                        }}
                                                    />
                                                </>
                                            ) : (
                                                <>
                                                    <RiArrowDownSFill
                                                        className="md:block hidden mt-[1.2vw]"
                                                        style={{
                                                            color: "#1F487C",
                                                            height: "2.5vw",
                                                            width: "2.5vw",
                                                        }}
                                                    />
                                                    <RiArrowDownSFill
                                                        className="block md:hidden mt-[6.5vw]"
                                                        style={{
                                                            color: "#1F487C",
                                                            height: "7vw",
                                                            width: "7vw",
                                                        }}
                                                    />
                                                </>
                                            )
                                        }
                                        expandIconPosition="end"
                                        items={[
                                            {
                                                key: "2",
                                                label: (
                                                    <div className="flex items-center md:flex-none h-[13vw] md:h-[5vh]">
                                                        <div className="col-span-2 pl-[1vw]">
                                                            <span className="text-[#1F487C] font-medium text-[4.5vw] md:text-[1.5vw]">
                                                                TICKET - RELATED
                                                            </span>
                                                        </div>
                                                    </div>
                                                ),
                                                children:
                                                    faq?.ticket_related?.length > 0 ? (
                                                        faq?.ticket_related?.map((item, index) => (
                                                            <div key={index}>
                                                                <p className="font-bold text-[#1F487C] pb-[1.5vw] md:pb-[0.5vw]">
                                                                    {item?.question}
                                                                </p>
                                                                <p className="text-[#1F487C] md:text-[1vw] text-[3.2vw] pb-[2vw] md:pb-[1.5vw]">
                                                                    {item?.answer}
                                                                </p>
                                                            </div>
                                                        ))
                                                    ) : (
                                                        <p className="text-[#1F487C] md:text-[1vw] text-[3.2vw]">
                                                            No FAQs available.
                                                        </p>
                                                    ),
                                            },
                                        ]}
                                    />
                                    <Collapse
                                        size={`large`}
                                        accordion
                                        activeKey={activeKey ? [activeKey] : []} // Ensure only one can be opened
                                        onChange={(key) => {
                                            handleCollapseChange(key);
                                            const value = 3;
                                            handleCollapseChange("3");
                                            handleClick(value);
                                        }}
                                        className="relative shadow-lg bg-white md:m-[1vw] m-[3vw] border-none"
                                        style={{
                                            boxShadow:
                                                "0 -4px 6px rgba(31, 71, 124, 0.04), 0 8px 15px rgba(31, 71, 124, 0.2)",
                                        }}
                                        expandIcon={({ isActive }) =>
                                            isActive ? (
                                                <>
                                                    <RiArrowUpSFill
                                                        className="md:block hidden mt-[1.2vw]"
                                                        style={{
                                                            color: "#1F487C",
                                                            height: "2.5vw",
                                                            width: "2.5vw",
                                                        }}
                                                    />
                                                    <RiArrowUpSFill
                                                        className="block md:hidden mt-[5vw]"
                                                        style={{
                                                            color: "#1F487C",
                                                            height: "7vw",
                                                            width: "7vw",
                                                        }}
                                                    />
                                                </>
                                            ) : (
                                                <>
                                                    <RiArrowDownSFill
                                                        className="md:block hidden mt-[1.2vw]"
                                                        style={{
                                                            color: "#1F487C",
                                                            height: "2.5vw",
                                                            width: "2.5vw",
                                                        }}
                                                    />
                                                    <RiArrowDownSFill
                                                        className="block md:hidden mt-[6.5vw]"
                                                        style={{
                                                            color: "#1F487C",
                                                            height: "7vw",
                                                            width: "7vw",
                                                        }}
                                                    />
                                                </>
                                            )
                                        }
                                        expandIconPosition="end"
                                        items={[
                                            {
                                                key: "3",
                                                label: (
                                                    <div className="flex items-center md:flex-none h-[13vw] md:h-[5vh]">
                                                        <div className="col-span-2 pl-[1vw]">
                                                            <span className="text-[#1F487C] font-medium text-[4.5vw] md:text-[1.5vw]">
                                                                PAYMENT - RELATED
                                                            </span>
                                                        </div>
                                                    </div>
                                                ),
                                                children:
                                                    faq?.payment?.length > 0 ? (
                                                        faq?.payment?.map((item, index) => (
                                                            <div key={index}>
                                                                <p className="font-bold text-[#1F487C] pb-[1.5vw] md:pb-[0.5vw]">
                                                                    {item?.question}
                                                                </p>
                                                                <p className="text-[#1F487C] md:text-[1vw] text-[3.2vw] pb-[2vw] md:pb-[1.5vw]">
                                                                    {item?.answer}
                                                                </p>
                                                            </div>
                                                        ))
                                                    ) : (
                                                        <p className="text-[#1F487C] md:text-[1vw] text-[3.2vw]">
                                                            No FAQs available.
                                                        </p>
                                                    ),
                                            },
                                        ]}
                                    />
                                    <Collapse
                                        size={`large`}
                                        accordion
                                        activeKey={activeKey ? [activeKey] : []} // Ensure only one can be opened
                                        onChange={(key) => {
                                            handleCollapseChange(key);
                                            const value = 4;
                                            handleCollapseChange("4");
                                            handleClick(value);
                                        }}
                                        className="relative shadow-lg bg-white md:m-[1vw] m-[3vw] border-none"
                                        style={{
                                            boxShadow:
                                                "0 -4px 6px rgba(31, 71, 124, 0.04), 0 8px 15px rgba(31, 71, 124, 0.2)",
                                        }}
                                        expandIcon={({ isActive }) =>
                                            isActive ? (
                                                <>
                                                    <RiArrowUpSFill
                                                        className="md:block hidden mt-[1.2vw]"
                                                        style={{
                                                            color: "#1F487C",
                                                            height: "2.5vw",
                                                            width: "2.5vw",
                                                        }}
                                                    />
                                                    <RiArrowUpSFill
                                                        className="block md:hidden mt-[5vw]"
                                                        style={{
                                                            color: "#1F487C",
                                                            height: "7vw",
                                                            width: "7vw",
                                                        }}
                                                    />
                                                </>
                                            ) : (
                                                <>
                                                    <RiArrowDownSFill
                                                        className="md:block hidden mt-[1.2vw]"
                                                        style={{
                                                            color: "#1F487C",
                                                            height: "2.5vw",
                                                            width: "2.5vw",
                                                        }}
                                                    />
                                                    <RiArrowDownSFill
                                                        className="block md:hidden mt-[6.5vw]"
                                                        style={{
                                                            color: "#1F487C",
                                                            height: "7vw",
                                                            width: "7vw",
                                                        }}
                                                    />
                                                </>
                                            )
                                        }
                                        expandIconPosition="end"
                                        items={[
                                            {
                                                key: "4",
                                                label: (
                                                    <div
                                                        className="flex items-center md:flex-none h-[13vw] md:h-[5vh]"
                                                    // onClick={() => {
                                                    //   const value = 4;
                                                    //   handleCollapseChange("4");
                                                    //   handleClick(value);
                                                    // }}
                                                    >
                                                        <div className="col-span-2 pl-[1vw]">
                                                            <span className="text-[#1F487C] font-medium text-[4.5vw] md:text-[1.5vw]">
                                                                CANCELLATION - RELATED
                                                            </span>
                                                        </div>
                                                    </div>
                                                ),
                                                children:
                                                    faq?.cancelation_refund?.length > 0 ? (
                                                        faq?.cancelation_refund?.map((item, index) => (
                                                            <div key={index}>
                                                                <p className="font-bold text-[#1F487C] pb-[1.5vw] md:pb-[0.5vw]">
                                                                    {item?.question}
                                                                </p>
                                                                <p className="text-[#1F487C] md:text-[1vw] text-[3.2vw] pb-[2vw] md:pb-[1.5vw]">
                                                                    {item?.answer}
                                                                </p>
                                                            </div>
                                                        ))
                                                    ) : (
                                                        <p className="text-[#1F487C] md:text-[1vw] text-[3.2vw]">
                                                            No FAQs available.
                                                        </p>
                                                    ),
                                            },
                                        ]}
                                    />
                                    <Collapse
                                        size={`large`}
                                        accordion
                                        activeKey={activeKey ? [activeKey] : []} // Ensure only one can be opened
                                        onChange={(key) => {
                                            handleCollapseChange(key);
                                            const value = 5;
                                            handleCollapseChange("5");
                                            handleClick(value);
                                        }}
                                        className="relative shadow-lg bg-white md:m-[1vw] m-[3vw] border-none"
                                        style={{
                                            boxShadow:
                                                "0 -4px 6px rgba(31, 71, 124, 0.04), 0 8px 15px rgba(31, 71, 124, 0.2)",
                                        }}
                                        expandIcon={({ isActive }) =>
                                            isActive ? (
                                                <>
                                                    <RiArrowUpSFill
                                                        className="md:block hidden mt-[1.2vw]"
                                                        style={{
                                                            color: "#1F487C",
                                                            height: "2.5vw",
                                                            width: "2.5vw",
                                                        }}
                                                    />
                                                    <RiArrowUpSFill
                                                        className="block md:hidden mt-[5vw]"
                                                        style={{
                                                            color: "#1F487C",
                                                            height: "7vw",
                                                            width: "7vw",
                                                        }}
                                                    />
                                                </>
                                            ) : (
                                                <>
                                                    <RiArrowDownSFill
                                                        className="md:block hidden mt-[1.2vw]"
                                                        style={{
                                                            color: "#1F487C",
                                                            height: "2.5vw",
                                                            width: "2.5vw",
                                                        }}
                                                    />
                                                    <RiArrowDownSFill
                                                        className="block md:hidden mt-[6.5vw]"
                                                        style={{
                                                            color: "#1F487C",
                                                            height: "7vw",
                                                            width: "7vw",
                                                        }}
                                                    />
                                                </>
                                            )
                                        }
                                        expandIconPosition="end"
                                        items={[
                                            {
                                                key: "5",
                                                label: (
                                                    <div
                                                        className="flex items-center md:flex-none h-[13vw] md:h-[5vh]"
                                                    // onClick={() => {
                                                    //   const value = 5;
                                                    //   handleCollapseChange("5");
                                                    //   handleClick(value);
                                                    // }}
                                                    >
                                                        <div className="col-span-2 pl-[1vw]">
                                                            <span className="text-[#1F487C] font-medium text-[4.5vw] md:text-[1.5vw]">
                                                                {" "}
                                                                REFUND - RELATED
                                                            </span>
                                                        </div>
                                                    </div>
                                                ),
                                                children:
                                                    faq?.insurance?.length > 0 ? (
                                                        faq?.insurance?.map((item, index) => (
                                                            <div key={index}>
                                                                <p className="font-bold text-[#1F487C] pb-[1.5vw] md:pb-[0.5vw]">
                                                                    {item?.question}
                                                                </p>
                                                                <p className="text-[#1F487C] md:text-[1vw] text-[3.2vw] pb-[2vw] md:pb-[1.5vw]">
                                                                    {item?.answer}
                                                                </p>
                                                            </div>
                                                        ))
                                                    ) : (
                                                        <p className="text-[#1F487C] md:text-[1vw] text-[3.2vw]">
                                                            No FAQs available.
                                                        </p>
                                                    ),
                                            },
                                        ]}
                                    />
                                </div>
                                <div className="md:col-start-5 pt-[2vw] md:pl-[3.5vw] md:pt-[0vw] md:col-span-3">
                                    <div className="md:pt-[2vw] text-center"></div>
                                    <div className="flex flex-col items-center justify-center">
                                        <img
                                            src={FaQgif}
                                            alt="GIF description"
                                            className="h-[35vw] w-[35vw] md:w-[13vw] md:h-[13vw] object-cover"
                                        />
                                        <p className="text-[4.5vw] pl-[3vw] md:pl-[0vw] md:text-[1.5vw] font-extrabold md:font-bold text-[#1F487C] pt-[1vw]">
                                            Any Question?
                                        </p>
                                    </div>
                                    <div className="pl-[3vw]">
                                        <p className="text-[3.2vw] ml-[1vw] md:ml-[0vw] md:text-[1vw] font-bold text-[#1F487C] pt-[1vw]">
                                            You can ask anything you want to know about Feedback
                                        </p>
                                    </div>
                                    <div className="pl-[3vw]">
                                        <p className="text-[3.2vw] ml-[1vw] md:ml-[0vw] md:text-[1vw] font-bold text-[#90a7c7] pt-[2vw]">
                                            Let me know...?
                                        </p>
                                    </div>
                                    <div className={`pl-[3vw] pt-[1vw]`}>
                                        <Input
                                            className={`w-[87vw] h-[10vw] md:w-[26vw] md:h-[3vw] rounded-[1.5vw] md:rounded-xl md:placeholder:text-[1.1vw] placeholder:text-[4vw]`}
                                            placeholder="Enter Here"
                                            autoComplete="off"
                                        />
                                    </div>
                                    <div
                                        className={`pt-[4vw] ml-[30vw] md:pt-[2vw] md:ml-[12vw]`}
                                    >
                                        <button
                                            type="submit"
                                            className={`bg-[#1F4B7F] md:px-[2vw] text-white text-[5vw] md:text-[1vw] md:w-[9vw] md:justify-center h-[10vw] w-[31vw] md:h-[2.5vw] gap-[0.5vw] 
                        md:items-center shadow-2xl md:shadow-xl rounded-[6vw] md:rounded-[2vw]`}
                                        >
                                            Send
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <span className="md:block hidden">
                <FooterTwo />
                <FooterThree />
            </span>
        </>
    );
};

