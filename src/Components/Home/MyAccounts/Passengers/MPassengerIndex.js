import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MobileAddPassenger from "./MobileAddPassenger";
import MobilePassengerList from "./MobilePassengerList";
import { GetPassengerData } from "../../../../Api/MyAccounts/Passenger";
import { IoIosArrowRoundBack } from "react-icons/io";
import BGSCREEN from '../../../../assets/BG Image.png'
import HomeHearder from "../../../MainComponenet/HomeHearder";
import homesky from "../../../../assets/BackgroundSky1.png"

export default function MPassengerIndex() {

    const [isPassengersList, setIsPassengersList] = useState(true);
    const [passData, setPassData] = useState("")
    const [updateData, setUpdateData] = useState("")

    const passengerdata = useSelector((state) => state?.passenger_data.add_passenger_details)
    console.log(passengerdata, "passengerdatapassengerdata")
    const dispatch = useDispatch();

    useEffect(() => {
        GetPassengerData(dispatch);
    }, [dispatch]);

    const nextPage = () => {
        setIsPassengersList(false);
    };

    const prevStep = () => {
        setIsPassengersList(true);
    };

    return (
        <div className='bg-[#E5FFF1] min-h-screen max-h-auto w-full'>
            <div className="fixed top-0 w-screen left-0 right-0 bg-[#E5FFF1] z-10">
                <div><HomeHearder /></div>
                <div className="">
                    <div
                        className="relative h-[20vw] w-[100%]"
                        style={{ backgroundImage: `url(${homesky})`, zIndex: 0 }}
                    >
                        <label className="text-white text-[8vw] font-bold absolute top-[3vw] left-[32vw] opacity-15">Passengers</label>
                        <label className="text-white text-[5vw] font-bold absolute top-[6vw] left-[40vw]">Passenger</label>
                        <div className="cloudhome"></div>
                    </div>
                </div>
            </div>
            <div className="relative">
                <img src={BGSCREEN} className="bg-cover h-screen w-screen" />
                <div className="absolute top-[30vw] w-full">
                    {isPassengersList
                        ? <MobilePassengerList
                            nextPage={nextPage}
                            passengerdata={passengerdata}
                            passData={passData}
                            updateData={updateData}
                            setPassData={setPassData}
                            setUpdateData={setUpdateData} />
                        : <MobileAddPassenger
                            nextPage={nextPage}
                            prevStep={prevStep}
                            passengerdata={passengerdata}
                            passData={passData}
                            updateData={updateData}
                            setPassData={setPassData}
                            setUpdateData={setUpdateData} />
                    }
                </div>
            </div>
        </div>
    );
}

