import React, { useRef, useState } from "react";
import JourneyDetails from "./JourneyDetails";
import PassengerDetails from "./PassengerDetails";
import BiilingAddress from "./BiilingAddress";
import { useLocation } from "react-router";
import ConfirmTicket from "./ConfirmTicket";

export default function DrawerIndex({
  BusDetails,
  layout,
  selectedSeats,
  selectedRoutes,
  busprice,
  seatDetails,
  selectedseatprice,
}) {
  console.log(seatDetails, "trrfyfjygy");
  const location = useLocation();
  const {
    selectedSeats2,
    selectedRoutes2,
    busdetails2,
    seatDetails2,
    discount2,
    //busprice,
  } = location.state || {};

  const [loader, setLoader] = useState(false);
  const selectedSeats1 = selectedSeats;
  const [travelerDetails, setTravelerDetails] = useState(
    selectedSeats1?.reduce((acc, seat, index) => {
      acc[index] = { user_name: "", age: "", gender: "male", seat: "" };
      return acc;
    }, {})
  );
  console.log(selectedSeats1, "testtestetttttttttttt");

  const [emailInput, setEmailInput] = useState("");
  const [mobileInput, setMobileInput] = useState("");
  const [confirmModal, setConfirmModal] = useState(false);
  const [confirmRefNo, setConfirmRefNo] = useState(null);
  const sectionRef = useRef(null);

  const handleScroll = () => {
    console.log("scroling");
    
    sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });  };

  return (
    <div>
      <div ref={sectionRef} className="p-[2.5vw] md:p-[1.5vw] flex flex-col gap-y-[3vw] md:gap-y-[1.60vw]">
        <JourneyDetails
          BusDetails={BusDetails}
          layout={layout}
          selectedSeats={selectedSeats}
          selectedRoutes={selectedRoutes}
          busprice={busprice}
          seatDetails={seatDetails}
        />
        <PassengerDetails
          seatDetails={seatDetails}
          BusDetails={BusDetails}
          selectedSeats={selectedSeats}
          discount={busprice}
          setTravelerDetails={setTravelerDetails}
          travelerDetails={travelerDetails}
          setEmailInput={setEmailInput}
          emailInput={emailInput}
          setMobileInput={setMobileInput}
          mobileInput={mobileInput}
        />
        <BiilingAddress
          BusDetails={BusDetails}
          selectedSeats1={seatDetails}
          travelerDetails={travelerDetails}
          selectedRoutes={selectedRoutes}
          emailInput={emailInput}
          mobileInput={mobileInput}
          selectedseatprice={selectedseatprice}
          setConfirmModal={setConfirmModal}
          setConfirmRefNo={setConfirmRefNo}
          confirmModal={confirmModal}
          handleScroll={handleScroll}
        />
        {confirmModal && (
          <ConfirmTicket
            seatDetails={seatDetails}
            BusDetails={BusDetails}
            selectedSeats={selectedSeats}
            discount={busprice}
            confirmRefNo={confirmRefNo}
          />
        )}
      </div>
    </div>
  );
}
