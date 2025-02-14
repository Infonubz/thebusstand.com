import React, { useEffect, useState } from "react";
import PassengersList from "./PassengersList";
import AddPassengers from "./AddPassengers";
import { useDispatch, useSelector } from "react-redux";
import { GetPassengById, GetPassengerData } from "../../../../Api-TBS/MyAccounts/Passenger";

export default function PassengerIndex() {

    const [isPassengersList, setIsPassengersList] = useState(true);
    const [passData, setPassData] = useState("")
    const [updateData, setUpdateData] = useState("")
    const [isEdit,setIsEdit] = useState(false)
    const [spinning,setSpinning] = useState(false)
    
    const passengerdata = useSelector((state) => state?.passenger_data.add_passenger_details)
    console.log(passengerdata, "passengerdatapassengerdata")
    const dispatch = useDispatch();

    useEffect(() => {
        setSpinning(true)
        GetPassengerData(dispatch,setSpinning);
    }, [dispatch]);

    const nextPage = () => {
        setIsPassengersList(false);
    };

    const prevStep = () => {
        setIsPassengersList(true);
    };

    return (
        <div className="bg-white h-auto md:w-full w-[90vw] md:mx-[0vw] shadow-lg shadow-gray-400 rounded-[2vw] px-[4vw] md:px-[3vw] md:rounded-[1vw] py-[1.2vw]">
            {isPassengersList
                ? <PassengersList
                    nextPage={nextPage}
                    passengerdata={passengerdata}
                    passData={passData}
                    updateData={updateData}
                    setPassData={setPassData}
                    setUpdateData={setUpdateData}
                    setIsEdit={setIsEdit}
                    spinning={spinning} />
                    
                : <AddPassengers
                    nextPage={nextPage}
                    prevStep={prevStep} 
                    passengerdata={passengerdata}
                    passData={passData}
                    updateData={updateData}
                    setPassData={setPassData}
                    setUpdateData={setUpdateData}
                    isEdit={isEdit}
                    setSpinning={setSpinning}
                    />

            }
        </div>
    );
}

