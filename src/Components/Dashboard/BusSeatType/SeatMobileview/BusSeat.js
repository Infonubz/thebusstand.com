import React, { useState } from 'react'
import SleeperMobile from './SleeperMobile'
import SemiSleeperMobile from './SemiSleeperMobile'
import SeaterMobile from './SeaterMobile'
import IMG from '../../../../assets/platforms/makemytrip.png'
import PickUpDrop from './PickUpDrop'
import unisex_se from "../../../../assets/unisex_se.png";
import men_se from "../../../../assets/men_se.png";
import women_se from "../../../../assets/women_se.png";
import unisex_se_sel from "../../../../assets/unisex_se_sel.png";
import men_se_sel from "../../../../assets/men_se_sel.png";
import women_se_sel from "../../../../assets/women_se_sel.png";
import unisex_book from "../../../../assets/unisex_se_book.png";
import men_se_book from "../../../../assets/se_men_book.png";
import women_se_book from "../../../../assets/se_women_book.png";
import { GoInfo } from "react-icons/go";
import { Button, Drawer } from 'antd';
import platformTheme from "../../PlatformTheme";
import { useLocation } from 'react-router-dom';
import tinycolor from "tinycolor2";
import { useSelector } from 'react-redux'



const BusSeat = () => {

  // const location = useLocation();
  // const stateData = location.state;
  // console.log(location.state, "LocationstateLocationstate")
  // // console.log(sleeper,"sleepersemisleeeprer");
  // console.log(stateData, "here iam getting datas")

  const stateData = useSelector((state) => state.seat_type);
  const [type, setType] = useState(null)
  const [open, setOpen] = useState(false);
  const [currentrate, SetCurrentRate] = useState("All");
  const [seatplatform, setSeatPlatform] = useState("");
  const colorcode = platformTheme(seatplatform);
  const [busprice, setBusPrice] = useState({
    price: "",
    discount: "",
  });
  console.log(stateData, "useSelectorPassedthetest")
  // const [selectedSeats, setSelectedSeats] = useState([]);

  // setSelectedSeats((prevSelectedSeats) => {
  //   if (prevSelectedSeats.includes(seat.id)) {
  //     return prevSelectedSeats.filter(
  //       (selectedSeat) => selectedSeat !== seat.id
  //     );
  //   } else {
  //     if (prevSelectedSeats.length < 1) {
  //       return [...prevSelectedSeats, seat.id];
  //     } else {
  //       // alert("You can only book a maximum of 2 seats.");
  //       toast.warning("You can book only one seat.");
  //       return prevSelectedSeats;
  //     }
  //   }
  // });
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };


  const content = (
    <div className="grid grid-rows-4 gap-[0.1 vw]">
      <div className="row-span-1 justify-items-center">
        <div className="grid grid-cols-6 gap-x-[3vw] justify-center ">
          <div className="col-span-3 "></div>
          <div className="col-span-1 items-center justify-center flex">
            <p className="font-semibold text-[5vw]">Unisex</p>
          </div>
          <div className="col-span-1 items-center justify-center flex">
            <p className="font-semibold text-[5vw]">Men</p>
          </div>
          <div className="col-span-1 items-center justify-center flex">
            <p className="font-semibold text-[5vw]">Women</p>
          </div>
        </div>
      </div>
      <div className="row-span-1">
        <div className="grid grid-cols-6 gap-x-[3vw] items-center">
          <div className="col-span-3 text-[5vw]">Available</div>
          <div className="col-span-1 items-center justify-center flex">
            {" "}
            <img src={unisex_se} className="w-[15vw] h-[15vw]" />
          </div>
          <div className="col-span-1  items-center justify-center flex">
            {" "}
            <img src={men_se} className="w-[15vw] h-[15vw]" />
          </div>
          <div className="col-span-1  items-center justify-center flex">
            {" "}
            <img src={women_se} className="w-[15vw] h-[15vw]" />
          </div>
        </div>
      </div>
      <div className="row-span-1">
        <div className="grid grid-cols-6 gap-x-[3vw] items-center">
          <div className="col-span-3 text-[5vw]">Selected</div>
          <div className="col-span-1  items-center justify-center flex">
            <img src={unisex_se_sel} className="w-[15vw] h-[15vw]" />
          </div>
          <div className="col-span-1  items-center justify-center flex">
            <img src={men_se_sel} className="w-[15vw] h-[15vw]" />
          </div>
          <div className="col-span-1  items-center justify-center flex">
            <img src={women_se_sel} className="w-[15vw] h-[15vw]" />
          </div>
        </div>
      </div>
      <div className="row-span-1">
        <div className="grid grid-cols-6 gap-x-[3vw] items-center">
          <div className="col-span-3 text-[5vw]">Booked</div>
          <div className="col-span-1  items-center justify-center flex">
            <img src={unisex_book} className="w-[15vw] h-[15vw]" />
          </div>
          <div className="col-span-1  items-center justify-center flex">
            <img src={men_se_book} className="w-[15vw] h-[15vw]" />
          </div>
          <div className="col-span-1  items-center justify-center flex">
            <img src={women_se_book} className="w-[15vw] h-[15vw]" />
          </div>
        </div>
      </div>
    </div>
  );


  return (
    <>
      <div className="col-span-1 h-full w-full">

        <div className='bg-blue-900 w-full h-[10vw] flex justify-evenly'>
          <div
            className='cursor-pointer flex items-center space-x-[3.5vw] order-first'
            onClick={showDrawer}>
            <GoInfo color='white' size={'3.5vw'} />
            <p className=' text-white text-[3.5vw]'>Know your Seats</p>
          </div>
          <div className='flex items-center'>
            <div> <img src={IMG} className='h-[6vw] w-[6vw] bg-white rounded-full' /></div>
            <div><p className='text-[5vw] text-white font-bold pl-[1vw]'>MAKE MY TRIP</p></div>
          </div>
        </div>
        <div className='flex justify-center'>
          <div className="col-span-1 py-[2vw]">
            <button
              type="button"
              className={`${currentrate === "All" ? " " : "  "
                } h-[6vw] w-[12vw] rounded-l-[0.5vw] font-bold  border-y-[0.1vw] border-l-[0.1vw]`}
              onClick={() =>
                SetCurrentRate("All")
              }
              style={{
                background:
                  currentrate === "All"
                    ? colorcode.color
                    : "white",
                borderColor: colorcode.color,
                color:
                  currentrate === "All"
                    ? colorcode.theme
                    : colorcode.theme,
              }}
            >
              All
            </button>
            <button
              type="button"
              className={`${currentrate === "amount"
                ? " "
                : "   "
                } h-[6vw] w-[12vw]  rounded-r-[0.5vw] font-bold  border-y-[0.1vw] border-r-[0.1vw]`}
              onClick={() =>
                SetCurrentRate("amount")
              }
              style={{
                background:
                  currentrate === "amount"
                    ? colorcode.color
                    : "white",
                color:
                  currentrate === "amount"
                    ? colorcode.theme
                    : colorcode.theme,
                borderColor: colorcode.color,
              }}
            >
              {/* {`₹ ${busprice.discount}`} */}
              ₹ 749
            </button>
          </div>
        </div>


        <div className='bg-white w-full h-full px-[1vw] flex flex-col space-y-[5vw] '>
          {/* <SleeperMobile /> */}
          <SemiSleeperMobile/>  
          {/* <SeaterMobile /> */}
          {/* <PickUpDrop /> */}



          {/* {stateData?.seater == "TRUE" &&
            stateData?.sleeper == "FALSE" &&
            stateData?.semi_sleeper == "FALSE" ? (
            <SeaterMobile
              busdetails={stateData}
              seatplatform={seatplatform}
              type={type}
              busprice={busprice}
              logo={stateData?.Bus_platform_name}
              // imageurl={
              //   // bus[
              //   //   busIndex
              //   // ]?.Bus_lowprice_name.toUpperCase() ==
              //   // seatplatform.toUpperCase()
              //   //   ? require(`../../assets/Operator_logos/${stateData?.bus_operator_id}.png`)
              //   //   : platformlogo(seatplatform)
              //   type == "lowprice"
              //     ? stateData?.Bus_lowprice_name?.toUpperCase() ==
              //       stateData?.Bus_operator_name?.toUpperCase()
              //       ? require(`../../../../assets/Operator_logos/${stateData?.bus_operator_id}.png`)
              //       : platformlogo(
              //         stateData?.Bus_lowprice_name
              //       )
              //     : stateData?.Bus_lowprice_name?.toUpperCase() ===
              //       stateData?.Bus_platform_name?.toUpperCase()
              //       ? require(`../../../../assets/Operator_logos/${stateData?.bus_operator_id}.png`)
              //       : platformlogo(seatplatform)
              // }
            />
          ) : stateData?.seater == "FALSE" &&
            stateData?.sleeper == "TRUE" &&
            stateData?.semi_sleeper == "FALSE" ? (
            <SleeperMobile
              // busdetails={stateData}
              seatplatform={seatplatform}
              type={type}
              busprice={busprice}
              logo={stateData?.Bus_platform_name}
              // imageurl={
              //   // stateData?.Bus_lowprice_name.toUpperCase() ==
              //   // seatplatform.toUpperCase()
              //   //   ? require(`../../assets/Operator_logos/${stateData?.bus_operator_id}.png`)
              //   //   : platformlogo(seatplatform)

              //   // bus[
              //   //   busIndex
              //   // ]?.Bus_lowprice_name.toUpperCase() ===
              //   // seatplatform.toUpperCase()
              //   //   ? platformlogo(seatplatform)
              //   //   : require(`../../assets/Operator_logos/${stateData?.bus_operator_id}.png`)

              //   type == "lowprice"
              //     ? stateData?.Bus_lowprice_name?.toUpperCase() ==
              //       stateData?.Bus_operator_name?.toUpperCase()
              //       ? require(`../../../../assets/Operator_logos/${stateData?.bus_operator_id}.png`)
              //       : platformlogo(
              //         stateData?.Bus_lowprice_name
              //       )
              //     : stateData?.Bus_lowprice_name?.toUpperCase() ===
              //       stateData?.Bus_platform_name?.toUpperCase()
              //       ? require(`../../../../assets/Operator_logos/${stateData?.bus_operator_id}.png`)
              //       : platformlogo(seatplatform)
              // }
            />
          ) : (
            <SemiSleeperMobile
              busdetails={stateData}
              seatplatform={seatplatform}
              type={type}
              busprice={busprice}
              logo={stateData?.Bus_platform_name}
              // imageurl={
              //   // bus[
              //   //   busIndex
              //   // ]?.Bus_lowprice_name.toUpperCase() ==
              //   // seatplatform.toUpperCase()
              //   //   ? require(`../../assets/Operator_logos/${stateData?.bus_operator_id}.png`)
              //   //   : platformlogo(seatplatform)
              //   type == "lowprice"
              //     ? stateData?.Bus_lowprice_name?.toUpperCase() ==
              //       stateData?.Bus_operator_name?.toUpperCase()
              //       ? require(`../../../../assets/Operator_logos/${stateData?.bus_operator_id}.png`)
              //       : platformlogo(
              //         stateData?.Bus_lowprice_name
              //       )
              //     : stateData?.Bus_lowprice_name?.toUpperCase() ===
              //       stateData?.Bus_platform_name?.toUpperCase()
              //       ? require(`../../../../assets/Operator_logos/${stateData?.bus_operator_id}.png`)
              //       : platformlogo(seatplatform)
              // }
            />
          )} */}


        </div>


      </div>
      <Drawer
        title={<p className='text-[4vw]'>Seater/Sleeper/Semi Sleeper Info</p>}
        onClose={onClose}
        open={open}
        placement='bottom'
        height={"40%"}>
        {content}
      </Drawer>
    </>
  )
}
export default BusSeat


