import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MobileAddPassenger from "./MobileAddPassenger";
import MobilePassengerList from "./MobilePassengerList";
import { GetPassengerData } from "../../../../Api/MyAccounts/Passenger";
import { IoIosArrowRoundBack } from "react-icons/io";
import BGSCREEN from '../../../../assets/BG Image.png'


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
            <div className="relative">
                <img src={BGSCREEN} className="bg-cover h-screen w-screen" />
                <div className="absolute top-0">
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

