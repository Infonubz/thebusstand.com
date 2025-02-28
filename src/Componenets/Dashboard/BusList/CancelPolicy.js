import React, { useEffect, useState } from "react";
import { Popover, Skeleton } from "antd";
// import { ref } from "yup";
// import ChildPolicy from "../../assets/Child-policy.png";
// import Liqour from "../../assets/Liqour.png";
// import Luggage from "../../assets/Luggage.png";
// import Paws from "../../assets/Paws.png";
// import PickUp from "../../assets/PickingUp.png";
import { IoPawOutline } from "react-icons/io5";
import { capitalizeFirstLetter } from "../../Common/Common-Functions/Captalization";
import SVG_List from "../../Common/SVG/SVG";
import { Abhibus_Cancelation_Policy } from "../../../Api-Abhibus/Dashboard/DashboardPage";
import { toast } from "react-toastify";

export default function CancelPolicy({ policies, busPrice, busType, bus_type, item }) {
    const [isToggleSwitch, setIsToggleSwitch] = useState("CDCP");
    const [cancelPolicy, setCancelPolicy] = useState()
    const [policyloader, setPolicyLoader] = useState(true)
    const SVG = SVG_List()
    const selectedBus = {
        operatorId: item?.operatorId,
        Service_key: item?.Service_key,
        Source_ID: item?.Source_ID,
        Destination_ID: item?.Destination_ID,
        jdate: item?.jdate
    }

    const LuxuryFind = (type) =>
        type.toLowerCase().includes("volvo") ||
        type.toLowerCase().includes("mercedes benz");

    const DiscountedPrice = (price, item) => {
        const originalPrice = parseInt(price?.price || 0);
        const discountRate = parseInt(item?.rate?.replace("%", "") || 0);
        const discountedPrice =
            originalPrice - (discountRate / 100) * originalPrice;
        return discountedPrice === 0
            ? "No Refund"
            : `₹ ${parseInt(discountedPrice)}`;
    };

    const fetch_Cancellation_Policy = async () => {
        try {
            const response = await Abhibus_Cancelation_Policy(selectedBus, setPolicyLoader)
            setCancelPolicy(response?.Cancellationpy)
            return response
        } catch (error) {
            toast.error(error)
        }
    }
    useEffect(() => {
        fetch_Cancellation_Policy()
    }, [])


    // Split the policies by '#*#*' into an array
    const policyArray = policies.split('#*#*');

    // Separate time intervals and percentages
    const times = policyArray.slice(0, 4); // First 4 elements are time intervals
    const percentages = policyArray.slice(4); // Last 4 elements are percentages

    // Rearranging and pairing time intervals with percentages (reverse the percentage array)
    const formattedPolicies = times.map((time, index) => {
        // If the time contains '--', split it into the time part and percentage part
        let cleanedTime = time;
        let percentage = percentages[percentages.length - 1 - index];

        if (time.includes('--')) {
            // Split the time and percentage part at '--'
            const [timePart, percentPart] = time.split('--');
            cleanedTime = timePart.trim(); // Cleaned time part (before '--')
            percentage = percentPart.trim() || percentage; // Cleaned percentage part (after '--')
        }

        return (
            <div key={index}>
                {cleanedTime} {percentage} {/* Combine cleaned time and percentage */}
            </div>
        );
    });

    return (
        <>
            <div className="md:block hidden w-full">
                <div
                    className={`${
                        // busType === "luxury"
                        LuxuryFind(bus_type) === true
                            ? "bg-[#FFEEC9]" : "bg-[#EEEDED]"
                        } h-auto md:rounded-[0.5vw] px-[1vw] pt-[1vw]`}
                >


                    <div className="py-[2vw] px-[0.5vw]">
                        <div className="w-full grid grid-cols-12 gap-x-[2vw] ">
                            <div
                                className="flex rounded-[0.5vw] col-span-4"
                                style={{
                                    backgroundImage:
                                        // busType === "luxury"
                                        LuxuryFind(bus_type) === true
                                            ? "linear-gradient(to right, #F8C550, #FFEB76, #FFE173)"
                                            : "",
                                    backgroundColor:
                                        // busType === "luxury"
                                        LuxuryFind(bus_type) === true
                                            ? "" : "#D0E5FF80",
                                }}
                            >
                                <div className="py-[1vw] px-[0.5vw] flex flex-col gap-[1vw]">
                                    <p
                                        className={`${
                                            // busType === "luxury"
                                            LuxuryFind(bus_type) === true
                                                ? "text-[#393939]"
                                                : "text-[#1F4B7F]"
                                            } text-[1.1vw]`}
                                    >
                                        Refund amount is Indicative.
                                    </p>
                                    <p
                                        className={`${
                                            // busType === "luxury"
                                            LuxuryFind(bus_type) === true
                                                ? "text-[#393939]"
                                                : "text-[#1F4B7F]"
                                            } text-[1.1vw]`}
                                    >
                                        Additional Rs. 15 per seat cancellation fee is applicable.
                                    </p>
                                    <p
                                        className={`${
                                            // busType === "luxury"
                                            LuxuryFind(bus_type) === true
                                                ? "text-[#393939]"
                                                : "text-[#1F4B7F]"
                                            } text-[1.1vw]`}
                                    >
                                        Partial cancellation is not allowed.
                                    </p>
                                </div>
                            </div>
                            {/* <div className="flex flex-col gap-[1vw]">
                  <p 
                   className={`${
                    busType === "luxury" ? "text-[#393939]" : "text-[#1F4B7F]"
                  } text-[1.1vw] font-semibold`}>
                    Cancellation Time
                  </p>
                  {cancellation.map((item) => (
                    <p className={`${
                      busType === "luxury" ? "text-[#393939]" : "text-[#1F4B7F]"
                    } text-[1.1vw]`}>{item.time}</p>
                  ))}
                </div>
                <div className="flex flex-col gap-[1vw]">
                  <p className="text-[1.1vw] text-[#1F4B7F] font-semibold">
                    Refund Amount
                  </p>
                  {refund.map((item) => (
                    <p className={`${
                      busType === "luxury" ? "text-[#393939]" : "text-[#1F4B7F]"
                    } text-[1.1vw]`}>{item.amount}</p>
                  ))}
                </div> */}

                            {cancelPolicy === undefined || null ?
                                <Skeleton
                                    loading={policyloader}
                                    active
                                    style={{ margin: "0.5vw", padding: "0.5vw" }}
                                    paragraph={{ rows: 4 }}
                                    
                                ></Skeleton> :

                                <>
                                    <div className="w-full gap-[1vw] col-span-8">
                                        <div className="grid grid-cols-12">
                                            <p
                                                className={`text-[1.25vw] ${
                                                    // busType === "luxury"
                                                    LuxuryFind(bus_type) === true
                                                        ? "text-[#393939]" : "text-[#1F4B7F]"
                                                    }  font-semibold col-span-7 `}
                                            >
                                                Cancellation Time
                                            </p>
                                            <p className={`text-[1.25vw] ${
                                                // busType === 'luxury'
                                                LuxuryFind(bus_type) === true
                                                    ? 'text-[#393939]' : 'text-[#1F4B7F]'} font-semibold col-span-2 flex justify-center`}>
                                                {/* Refund Amount */}
                                                Refund(%)
                                            </p>
                                            <p className={`text-[1.25vw] ${
                                                // busType === 'luxury'
                                                LuxuryFind(bus_type) === true
                                                    ? 'text-[#393939]' : 'text-[#1F4B7F]'} font-semibold col-span-3 flex justify-center`}>
                                                Refund Amount
                                            </p>
                                        </div>
                                        <div className={`text-[1vw]  ${
                                            // busType === 'luxury'
                                            LuxuryFind(bus_type) === true
                                                ? 'text-[#393939]' : 'text-[#1F4B7F]'}`}>
                                            {/* {formattedPolicies?.map((items, index) => {
                                        const parts = items?.props?.children;
                                        const percentageString = parts[2]; // Assume parts[2] contains "20%" as a string

                                        // Check if the percentage is valid
                                        const percentage = percentageString ? parseFloat(percentageString) / 100 : 0;

                                        // Calculate the value
                                        const calculatedValue = busPrice * percentage;

                                        const CancellationFare = busPrice - calculatedValue
                                        // Log the calculated value if you want to inspect it


                                        if (parts && parts.length > 0) {
                                            return (
                                                <>
                                                    <div className="grid grid-cols-12 py-[0.25vw]">
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
                                    })} */}

                                            {cancelPolicy?.Cancellationpy?.conditions?.map((item, index) => (
                                                <div className="grid grid-cols-12 py-[0.25vw]">
                                                    <div className="col-span-7 justify-center items-center" key={index}>{item?.con}</div>
                                                    <div className="col-span-2 flex justify-center items-center" key={index}>{item?.rp}</div>
                                                    <div className="col-span-3 flex justify-center items-center" key={index}>{item?.cc}</div>
                                                </div>
                                            ))}
                                        </div>
                                        {/* {policies?.length > 0 &&
                                        policies?.map((item) => {
                                            const [start, end] = item?.span?.split("-").map(Number); // Split and convert to numbers
                                            const displaySpan =
                                                start >= 24
                                                    ? `${Math.floor(start / 24)}${end ? " to " + Math.floor(end / 24) : ""
                                                    }`
                                                    : `${start}${end ? " to " + end : ""}`;

                                            const timeUnit = start >= 24 ? "Days" : "Hours";

                                            return (
                                                <p
                                                    className={`text-[1.1vw] ${busType === "luxury"
                                                        ? "text-[#393939]"
                                                        : "text-[#1F4B7F]"
                                                        }`}
                                                >
                                                    <span className="px-[.2vw]">Before </span>
                                                    <span>{displaySpan}</span>
                                                    <span className="px-[.2vw]">{timeUnit}</span>
                                                </p>
                                            );
                                        })} */}
                                        {/* {policies?.length > 0 &&
                    policies?.map((item) => (
                      <p className="text-[1.1vw] text-[#1F4B7F] ">
                        <span className="px-[.2vw]">Before </span>
                        <span className="">
                          {item?.span?.split("-")?.join(" to ")}
                        </span>
                        <span className="px-[.2vw]">Hours</span>
                      </p>
                    ))} */}
                                    </div>
                                    <div className="flex flex-col gap-[1vw]">
                                        {/* {policies?.length > 0 &&
                                        policies?.map((item) => (
                                            <p className={`text-[1.1vw] flex justify-center  ${busType === 'luxury' ? 'text-[#393939]' : 'text-[#1F4B7F]'}`}>
                                                <span className="text-center">{`${item.rate}`}</span>
                                                <span className="mx-[2vw] col-span-1">
                    {
                     ( parseInt(item?.rate?.replace('%','') )/100 * parseInt(price?.price))
                    }
                    </span>
                                            </p>
                                        ))} */}
                                    </div>
                                    <div className="flex flex-col gap-[1vw]">
                                        {/* {policies?.length > 0 &&
                                        policies?.map((item) => (
                                            <p className={`text-[1.1vw] flex justify-center   ${busType === 'luxury' ? 'text-[#393939]' : 'text-[#1F4B7F]'}`}>
                                                <span className="col-span-1">{item.rate}</span>
                                                <span className="text-center">
                                                    {`${DiscountedPrice(price, item)}`}
                                                </span>
                                            </p>
                                        ))} */}
                                    </div>
                                </>}

                        </div>
                    </div>

                </div>
            </div >
        </>
    );
};
