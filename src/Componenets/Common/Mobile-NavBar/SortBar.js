import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function SortBar({ selectedOption, setSelectedOption }) {
  const dispatch = useDispatch()
  const buslist = useSelector((state) => state?.get_buslist);
  const buslistFilter = useSelector((state) => state?.get_buslist_filter);

  const [sortList, setSortList] = useState({
    low_high_price: false,
    high_low_price: false,
    early_late_dep: false,
    late_early_dep: false,
    early_late_arv: false,
    late_early_arv: false,
    low_high_seats: false,
    high_low_seats: false,
  });

  // console.log(sortList, 'sortList_sort')

  const handleRadioChange = (option, key) => {
    if (selectedOption === option) {

      setSortList((prev) => ({
        ...prev,
        [key]: false,
      }));
      setSelectedOption(null);
    } else {

      const newSortList = Object.keys(sortList).reduce((acc, key) => {
        acc[key] = false;
        return acc;
      }, {});
      newSortList[key] = true;
      setSortList(newSortList);
      setSelectedOption(option);
    }
  };

  const convertTo24Hour = (time) => {
    const [hourMin, modifier] = time.split(' '); // "11:30", "PM"
    let [hour, minute] = hourMin.split(':'); // hour: "11", minute: "30"

    // Convert the hour based on AM/PM
    if (modifier === "PM" && hour !== "12") {
      hour = parseInt(hour) + 12; // Convert PM times (except 12 PM) to 24-hour format
    } else if (modifier === "AM" && hour === "12") {
      hour = "00"; // Convert 12 AM to 00 in 24-hour format
    }

    return `${hour}:${minute}`; // Return in 24-hour time format (HH:mm)
  };

  const sortListItems = () => {
    let sortedList = [...buslist];
    if (sortList.low_high_price) {
      sortedList.sort((a, b) => a.Fare - b.Fare);
    } else if (sortList.high_low_price) {
      sortedList.sort((a, b) => b.Fare - a.Fare);
    }

    if (sortList.early_late_dep) {
      sortedList.sort((a, b) => {
        const timeA = convertTo24Hour(a.Start_time);
        const timeB = convertTo24Hour(b.Start_time);
        return timeA?.localeCompare(timeB);
      });
    } else if (sortList?.late_early_dep) {
      sortedList.sort((a, b) => {
        const timeA = convertTo24Hour(a.Start_time);
        const timeB = convertTo24Hour(b.Start_time);
        return timeB?.localeCompare(timeA);
      });
    }
    if (sortList.early_late_arv) {
      sortedList.sort((a, b) => {
        const timeA = convertTo24Hour(a.Arr_Time);
        const timeB = convertTo24Hour(b.Arr_Time);
        return timeA?.localeCompare(timeB);
      });
    } else if (sortList?.late_early_arv) {
      sortedList.sort((a, b) => {
        const timeA = convertTo24Hour(a.Arr_Time);
        const timeB = convertTo24Hour(b.Arr_Time);
        return timeB?.localeCompare(timeA);
      });
    }

    if (sortList.low_high_seats) {
      sortedList.sort((a, b) => a.available_seats - b.available_seats);
    } else if (sortList.high_low_seats) {
      sortedList.sort((a, b) => b.available_seats - a.available_seats);
    }
    // console.log(sortedList, 'sorted_List')
    dispatch({ type: "GET_BUS_FILTERS", payload: sortedList });
    return sortedList;
  };

  useEffect(() => {
    const sortedItems = sortListItems();
    // console.log(sortedItems, 'sortedItems');
  }, [sortList]);

  return (
    <>
      <div className='text-[5vw] font-semibold ml-[5vw] py-[2.5vw]'>
        Sort By:
      </div>
      <div className="flex flex-col gap-[2vw] px-[6vw] ">
        <label className="flex items-center gap-[4vw] border-b-[0.5px] border-gray-300 pb-[1.5vw]">
          <input
            type="radio"
            className="w-[4vw] h-[4vw]"
            checked={selectedOption === 'lowToHighPrice'}
            onClick={() => handleRadioChange('lowToHighPrice', 'low_high_price')}
          />
          <p className="text-[4vw]">Price - Low to High</p>
        </label>
        <label className="flex items-center gap-[4vw] border-b-[0.5px] border-gray-300 pb-[1.5vw]">
          <input
            type="radio"
            className="w-[4vw] h-[4vw]"
            checked={selectedOption === 'highToLowPrice'}
            onClick={() => handleRadioChange('highToLowPrice', 'high_low_price')}
          />
          <p className="text-[4vw]">Price - High to Low</p>
        </label>
        <label className="flex items-center gap-[4vw] border-b-[0.5px] border-gray-300 pb-[1.5vw]">
          <input
            type="radio"
            className="w-[4vw] h-[4vw]"
            checked={selectedOption === 'lowToHighSeats'}
            onClick={() => handleRadioChange('lowToHighSeats', 'low_high_seats')}
          />
          <p className="text-[4vw]">Seat Availability: Low to High</p>
        </label>
        <label className="flex items-center gap-[4vw] border-b-[0.5px] border-gray-300 pb-[1.5vw]">
          <input
            type="radio"
            className="w-[4vw] h-[4vw]"
            checked={selectedOption === 'highToLowSeats'}
            onClick={() => handleRadioChange('highToLowSeats', 'high_low_seats')}
          />
          <p className="text-[4vw]">Seat Availability: High to Low</p>
        </label>
        <label className="flex items-center gap-[4vw] border-b-[0.5px] border-gray-300 pb-[1.5vw]">
          <input
            type="radio"
            className="w-[4vw] h-[4vw]"
            checked={selectedOption === 'earliestToLateDeparture'}
            onClick={() => handleRadioChange('earliestToLateDeparture', 'early_late_dep')}
          />
          <p className="text-[4vw]">Departure: Earliest to Latest</p>
        </label>
        <label className="flex items-center gap-[4vw] border-b-[0.5px] border-gray-300 pb-[1.5vw]">
          <input
            type="radio"
            className="w-[4vw] h-[4vw]"
            checked={selectedOption === 'lateToEarliestDeparture'}
            onClick={() => handleRadioChange('lateToEarliestDeparture', 'late_early_dep')}
          />
          <p className="text-[4vw]">Departure: Latest to Earliest</p>
        </label>
        <label className="flex items-center gap-[4vw] border-b-[0.5px] border-gray-300 pb-[1.5vw]">
          <input
            type="radio"
            className="w-[4vw] h-[4vw]"
            checked={selectedOption === 'earlistToLateArrival'}
            onClick={() => handleRadioChange('earlistToLateArrival', 'early_late_arv')}
          />
          <p className="text-[4vw]">Arrival: Earliest to Latest</p>
        </label>
        <label className="flex items-center gap-[4vw] border-b-[0.5px] border-gray-300 pb-[1.5vw]">
          <input
            type="radio"
            className="w-[4vw] h-[4vw]"
            checked={selectedOption === 'latetoEarliestArrival'}
            onClick={() => handleRadioChange('latetoEarliestArrival', 'late_early_arv')}
          />
          <p className="text-[4vw]">Arrival: Latest to Earliest</p>
        </label>
      </div>
    </>
  );
}
