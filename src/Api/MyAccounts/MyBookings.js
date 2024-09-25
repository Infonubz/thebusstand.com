import axios from "axios";
import { toast } from "react-toastify";
import { BOOKING_DETAILS_STATUS, GET_BOOKING_DETAILS, GET_TICKET_TO_CANCEL } from "../../Store/type";
import { string } from "yup";

const api = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
});
const apiUrl = process.env.REACT_APP_API_URL;

export const GetBookingDetails = async (mbleNum, dispatch) => {
  try {
    const response = await axios.get(`${apiUrl}/booking_details/${mbleNum}`);
    dispatch({ type: GET_BOOKING_DETAILS, payload: response.data });
    console.log(response, "response for bookingDetails");
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const SendBookingDetails = async (
  busdetails,
  selectedRoutes,
  selectedSeats,
  travelerDetails,
  date,
  email,
  mobile,
  bookingId
) => {
  console.log(busdetails, "busdetailsbusdetails");
  const passengers = Object.values(travelerDetails).map((detail) => ({
    user_name: detail.user_name,
    age: detail.age,
    gender: detail.gender,
    seat: detail.seat,
  }));

  const payload = {
    departure_name: busdetails?.source_name,
    arrival_name: busdetails?.destination_name,
    date: date,
    seat: selectedSeats,
    pickup: selectedRoutes?.dep_route,
    drop: selectedRoutes?.arri_route,
    passenger: passengers,
    email_id: email,
    mobile_number: mobile,
    bus_id: busdetails?.bus_id,
  };

  const url = bookingId
    ? `${apiUrl}/booking-details/${bookingId}`
    : `${apiUrl}/booking_details`;

  const method = bookingId ? "put" : "post";

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
    console.log(response.data, "submit booking Detail");
    return response.data;
  } catch (error) {
    handleError(error);
    return null;
  }
};

export const TicketViewDetails = async (busBookingId, mobileNum) => {
  console.log(busBookingId, "busBookingId");

  const payload = {
    mobile_number: mobileNum,
    Booking_Id: String(busBookingId),
  };

  const url = `${apiUrl}/ticket-views`;

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
    console.log(response, "locationdata TicketView");
    console.log(response.data, "Submit TicketView");
    return response.data[0];
  } catch (error) {
    handleError(error);
    return null;
  }
};

export const sendBookingPrice = async (
  totalAmount,
  bookingId,
  selectedSeats,
  busdetails,
  travelerDetails,
  promoCode
) => {
  console.log(totalAmount, "totalAmount");
  console.log(bookingId, "bookingId");
  console.log(selectedSeats, "selectedSeats");
  console.log(busdetails, "busdetails");
  console.log(promoCode, "promoCode");

  const result = Object.values(travelerDetails).map((user) => {
    if (user.gender === "male") {
      return "BFM";
    } else if (user.gender === "female") {
      return "BFF";
    } else {
      return "BFA";
    }
  });

  console.log(result, "result");

  const payload = {
    bus_id: busdetails?.bus_id,
    price: totalAmount,
    seat: selectedSeats,
    status: result,
    offers_rewards: {
      code: promoCode,
      Value: "3%",
    },
  };

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
    // sessionStorage.removeItem("booking_id")
    console.log(response, "submit Price Detail");
    return response.data;
  } catch (error) {
    handleError(error);
  }
};
export const GetBookingStatusDetails =async (statusid,Number,dispatch,setSpinning) =>{
  
  try{
    const response = await axios.post(`${apiUrl}/${statusid}`,{
      mobile_number:Number
    })
    dispatch({type:BOOKING_DETAILS_STATUS,payload:response.data})
    console.log(response.data,'upcomingdata');
    setSpinning(false)
    return response.data
  }
  catch(err){
console.log(err);
  }
}

export const GetCancelTicket = async (dispatch, busBookingId, mobileNum) => {
  try {
    const response = await axios.post(`${apiUrl}/ticket-views`, {
      mobile_number: mobileNum,
      Booking_Id: busBookingId,
    });
    dispatch({ type: GET_TICKET_TO_CANCEL, payload: response.data });
    console.log(response.data, "canceldetails");
  } catch (err) {
    handleError(err);
  }
};
 
export const CancelTicket = async (cancelvalues, dispatch) => {
  console.log("ima calling 2", cancelvalues);
  try {
    const response = await axios.post(`${apiUrl}/cancel-ticket`, cancelvalues);
    toast.success(response.data.message)
    GetCancelTicket(dispatch,cancelvalues.Booking_Id,cancelvalues.mobile_number);
  } catch (err) {
    handleError(err);
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
