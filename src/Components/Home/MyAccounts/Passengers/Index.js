import React, { useEffect, useState } from "react";
import PassengersList from "./PassengersList";
import AddPassengers from "./AddPassengers";
import { useDispatch, useSelector } from "react-redux";
import { GetPassengById, GetPassengerData } from "../../../../Api/MyAccounts/Passenger";

export default function PassengerIndex() {

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
        <div className="bg-white h-auto w-full rounded-[1vw] p-[2vw]">
            {isPassengersList
                ? <PassengersList
                    nextPage={nextPage}
                    passengerdata={passengerdata}
                    passData={passData}
                    updateData={updateData}
                    setPassData={setPassData}
                    setUpdateData={setUpdateData} />
                : <AddPassengers
                    nextPage={nextPage}
                    prevStep={prevStep} 
                    passengerdata={passengerdata}
                    passData={passData}
                    updateData={updateData}
                    setPassData={setPassData}
                    setUpdateData={setUpdateData}/>
            }
        </div>
    );
}

