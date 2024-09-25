import axios from "axios";
import { toast } from "react-toastify";
import {
  CARD_DETAIL,
  DROP_POINT_LIST,
  GET_OPERATOR_LIST,
  SEAT_LAYOUT,
} from "../../Store/type";
import { object } from "yup";

const api = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
});

const apiUrl = `http://192.168.90.47:4001/api`;
// export const GetCardDetails = async (dispatch, id) => {
//     try {
//         const response = await axios.get(`${apiUrl}/bus-details`);
//         dispatch({ type: CARD_DETAIL, payload: response.data });
//         console.log(response, "carddetails");
//         return response.data;
//     } catch (error) {
//         handleError(error);
//     }
// };

export const SendTravelDetails = async (dispatch, values, luxury) => {
  console.log(luxury, "toooooo000000000ddddddddddddxn");

  // console.log(from, to,"fromfrom");
  // sessionStorage.setItem("loading",true)

  const payload = {
    source_name: localStorage.getItem("departure"),

    destination_name: localStorage.getItem("arrival"),
    // departure_date: new Date(),
    departure_date: new Date(),
    // AC:values.ac,
    Seater: values?.seater,
    Sleeper: values?.sleeper,
    luxury_bus: JSON.parse(sessionStorage.getItem("isLuxury")),
  };
  console.log(payload, "payloadpayload");

  // ac: false,
  // from: "",
  // to: "",
  // date:"",
  // seater: "",
  // sleeper: "",

  // const url = `${apiUrl}/process-bus-info`;
  const url = `${apiUrl}/filters-In`;
  const method = "post";
  try {
    const response = await api({
      method,
      url,
      data: payload,
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(response, "locationdatas");
    // sessionStorage.setItem("loading",false)
    dispatch({ type: CARD_DETAIL, payload: response.data.data });
    console.log(response.data.data, "submitlocationdata..........");
    return response.data;
  } catch (error) {
    handleError(error);
    return null;
  }
};

export const TicketBooking = async (busdetails, seat, travelerDetails) => {
  console.log(busdetails, "busdetails123");
  console.log(seat, "seatseat123");
  console.log(Object.values(travelerDetails), "travelerDetailstravelerDetails");
  const datalist = Object.values(travelerDetails);
  const result = datalist.map((user) => {
    if (user.gender === "male") {
      return "BFM";
    } else if (user.gender === "female") {
      return "BFF";
    } else {
      return "BFA";
    }
  });
  console.log(result, "statuslist");

  const payload = {
    bus_id: busdetails?.bus_id,
    id: seat,
    status: result,
  };

  const url = `${apiUrl}/update-seat-status`;
  const method = "put";
  try {
    const response = await api({
      method,
      url,
      data: payload,
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(response, "locationdatas");
    // dispatch({ type: SEAT_LAYOUT, payload: response.data });
    console.log(response.data, "submitlocationdata");
    return response.data;
  } catch (error) {
    handleError(error);
    return null;
  }
};
export const GetSeatLayout = async (busid, dispatch,setLayoutLoading) => {
  const payload = {
    bus_id: busid,
  };

  const url = `${apiUrl}/seatLayout-ById`;
  const method = "post";
  setLayoutLoading(true)
  try {
    const response = await api({
      method,
      url,
      data: payload,
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(response, "locationdatas");
    dispatch({ type: SEAT_LAYOUT, payload: response.data });
    // setTimeout(() => {
    //   setLayoutLoading(false)
    // }, 2000);
    setLayoutLoading(false)
    console.log(response.data, "submitlocationdata");
    return response.data;
  } catch (error) {
    handleError(error);
    return null;
  }
};
// export const SendTravelDetails = async (fromValue, toValue, fromDate, dispatch) => {
//   const payload = {
//     source_name: fromValue,
//     destination_name: toValue,
//     departure_date_time: fromDate,
//   };

//   const url = `${apiUrl}/process-bus-info`;
//   const method = "post";
//   try {
//     const response = await api({
//       method,
//       url,
//       data: payload,
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });
//     console.log(payload, "locationdatas");
//     dispatch({ type: CARD_DETAIL, payload: response.data });
//     console.log(response.data, "submitlocationdata");
//     return response.data;
//   } catch (error) {
//     handleError(error);
//     return null;
//   }
// };
export const Filters = async (
  departure,
  arrival,
  date,
  busType,
  acfilter,
  seattypefilter,
  pickuptime,
  droptime,
  pickupcheck,
  dropcheck,
  amenitycheck,
  operatorcheck,
  priceRange,
  sort,
  NormalBus,
  dispatch
) => {
  console.log(sort, "sort11");

  const payload = {
    // source_name:  "Pondicherry",
    // destination_name: "Coimbatore",
    source_name: departure,
    destination_name: arrival,
    luxury_bus: busType || JSON.parse(sessionStorage.getItem("isLuxury")),
    AC: acfilter === "ac" ? "true" : "false",
    NonAc: acfilter === "non_ac" ? "true" : "false",
    Seater: seattypefilter === "seater" ? "true" : "false",
    Sleeper: seattypefilter === "sleeper" ? "true" : "false",
    departure_time_range: pickuptime,
    arrival_time_range: droptime,
    price_range: priceRange,
    departure_date: date,
    boarding_point: pickupcheck.join(","),
    dropping_point: dropcheck.join(","),
    amenities: amenitycheck.join(","),
    operator_name: operatorcheck.join(","),
    //"rating": 4
    sort: [
      {
        price: sort === "price" ? true : false,
        seats: sort === "seats" ? true : false,
        ratings: sort === "ratings" ? true : false,
        departure_time: sort === "departureSort" ? true : false,
        arrival_time: sort === "arrivalSort" ? true : false,
      },
    ],
    regular_bus: NormalBus,
  };

  console.log(payload, "sort112");

  const url = `${apiUrl}/filters-In`;
  const method = "post";

  try {
    const response = await api({
      method,
      url,
      data: payload,
      headers: {
        "Content-Type": "application/json",
      },
    });
    dispatch({ type: CARD_DETAIL, payload: response.data.data });
    console.log(response, "response filter");
    sessionStorage.setItem("loading", false);
    return response.data.data;
  } catch (error) {
    handleError(error);
    return null;
  }
};

export const Drop_Point_List = async (departure, arrival, date, dispatch) => {
  const payload = {
    source_name: departure,
    destination_name: arrival,
    departure_date_time: date,
  };

  const url = `${apiUrl}/count-board-drop`;
  const method = "post";
  try {
    const response = await api({
      method,
      url,
      data: payload,
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(payload, "locationdatas");
    dispatch({ type: DROP_POINT_LIST, payload: response.data });
    console.log(response.data, "submitlocationdata");
    return response.data;
  } catch (error) {
    handleError(error);
    return null;
  }
};

export const GetOperators = async (dispatch) => {
  try {
    const response = await axios.get(`${apiUrl}/operator-name`);
    dispatch({ type: GET_OPERATOR_LIST, payload: response.data });
    return response;
  } catch (error) {
    handleError(error);
  }
};

export const OperatorFilters = async (operator, e = null) => {
  const payload = {
    search: e ? e.target.value : operator,
  };

  const url = `${apiUrl}/operator-names/${operator}`;
  const method = "post";
  try {
    const response = await api({
      method,
      url,
      data: payload,
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(response, "locationdatas");
    console.log(response.data, "submitlocationdata");
    return response.data;
    //  const response = await axios.get(`${apiUrl}/operator-names/${operator}`);
  } catch (error) {
    handleError(error);
  }
};
export const sendBookingPrice = async (
  totalAmount,
  bookingId,
  selectedSeats,
  busdetails
) => {
  const payload = {
    bus_id: busdetails.bus_id,
    price: totalAmount,
    seat: selectedSeats,
  };
  console.log(payload, "payload payload");
  const url = `${apiUrl}/update-price/${bookingId}`;

  const method = "put";

  try {
    const response = await api({
      method,
      url,
      data: payload,
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const handleSearch = async (dispatch ,e ,searchField) => {

  console.log(searchField,"log11111searchhh222222");

  // try{
  //   const response = await axios.post(`${apiUrl}/search-board-drop`,{
  //   source_name: localStorage.getItem("departure"),
  //   destination_name: localStorage.getItem("arrival"),
  //   departure_date_time:  localStorage.getItem("selectdate")  ,
  //   type:searchField,
  //   search_term: e.target.value 
  //   })
  //   dispatch({ type: DROP_POINT_LIST, payload: response });
  //   return response;
  // }
  //   catch (error) {
  //   handleError(error);
  //   return null;
  // }

  const payload = {
    source_name: localStorage.getItem("departure"),
    destination_name: localStorage.getItem("arrival"),
    departure_date_time:  localStorage.getItem("selectdate")  ,
    type:searchField,
    searchTerm: e.target.value
  };

  console.log(payload, "payload payload");
  const url = `${apiUrl}/search-board-drop`;

  const method = "post";

  try {
    const response = await api({
      method,
      url,
      data: payload,
      headers: {
        "Content-Type": "application/json",
      },
    });
    dispatch({ type: DROP_POINT_LIST, payload: response });
    return response;
   } catch (error) {
    handleError(error);
    return null;
  }
};

const handleError = (error) => {
  console.error("Error details:", error);
  let errorMessage = "An error occurred";

  if (error?.response) {
    console.error("Error response from server:", error?.response);
    errorMessage = `Server responded with status ${error?.response?.status}`;
  } else if (error?.request) {
    console.error("No response received:", error?.request);
    errorMessage = "No response received from server";
  } else {
    console.error("Error setting up request:", error?.message);
    errorMessage = error?.message;
  }

  if (error?.code === "ERR_NETWORK") {
    errorMessage =
      "Network Error: Unable to connect to the server. Please check the server status and your network connection.";
  }
  if (error?.code === "ERR_CONNECTION_REFUSED") {
    errorMessage =
      "Network Error: Unable to connect to the server. Please check the server status and your network connection.";
  }
  toast.error(errorMessage);
};

// const apiUrl = 'https://example.com'; // Replace with your actual API URL

// export const SendTravelDetails = async () => {
//     const payload = {
//         key1: 'value1', // Correct syntax for object properties
//     };

//     const url = `${apiUrl}/bus-details`;
//     const method = 'post';
//     const dispatch = useDispatch(); // Initialize dispatch

//     try {
//         const response = await axios({
//             method,
//             url,
//             data: payload,
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//         });

//         console.log(response, 'submitelocationdatas');
//         dispatch({ type: CARD_DETAIL, payload: response.data });
//         return response.data;
//     } catch (error) {
//         handleError(error);
//         return null;
//     }
// };
