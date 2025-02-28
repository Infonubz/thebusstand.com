import axios from "axios";
import { toast } from "react-toastify";
import {
  GET_AVAILABLE_OFFER,
  GET_OPERATOR_LIST,
  TBS_TICKET_DETAILS,
} from "../../Store/Type";
import { decryptData } from "../../Componenets/Common/Common-Functions/Encrypt-Decrypt";
import { useParams } from "react-router";

//import { object } from "yup";

const api = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
});
const apiUrlimage = process.env.REACT_APP_API_URL_IMAGE;

const apicrmimage = process.env.REACT_APP_CRM_API_URL_IMAGE;
// const apiUrl = `${apiUrlimage }/api`;
const apiUrl = process.env.REACT_APP_API_URL;
const apicrm = process.env.REACT_APP_CRM_API_URL;

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
export const Get_TBS_Booking_details = async (TicketNo, dispatch) => {
  try {
    const response = await axios.get(`${apiUrl}/getbookingdetails/${TicketNo}`);
    console.log(response?.data, "ddddjjjjjjdjdjhfh");
    dispatch({
      type: TBS_TICKET_DETAILS,
      payload: response?.data,
    });
    return response.data;
  } catch (err) {
    handleError(err);
  }
};
export const TBS_Booking_Details = async (
  TicketNo,
  order_id,
  payment_id,
  signature,
  ticketdetails,
  email,
  mobile,
  msg,
  BusDetails,
  arraivaldate,
  selectedRoutes,
  seatDetails,
  currentpath,
  Bustype,
  discountamount,
  code,
  tbsamount,
  tbsbasefare,
  dispatch
) => {
  console.log(
    ticketdetails,
    "ticketdetailsticketdetailsticketdetails"
  );
  const l_user_id = sessionStorage.getItem("user_id");
  const l_email_id = sessionStorage.getItem("user_email_id");
  const l_mobile = sessionStorage.getItem("user_mobile");
  const l_name = sessionStorage.getItem("user_name");
  const login_name = decryptData(l_name);
  const login_email_id = decryptData(l_email_id);
  const login_mobile = decryptData(l_mobile);
  const login_user_id = decryptData(l_user_id);
  const LuxuryFind = (type) =>
    type.toLowerCase().includes("volvo") ||
    type.toLowerCase().includes("mercedes benz") ||
    type.toLowerCase().includes("washroom") ||
    type.toLowerCase().includes("bharatBenz") ||
    type.toLowerCase().includes("luxury");
  const payload = {
    login_user_id: login_user_id,
    login_user_email: login_email_id,
    login_user_mobile: login_mobile,
    name: login_name ? login_name : null,
    email: email,
    mobile: mobile,
    ticket_no: TicketNo,
    pnr_no: TicketNo,
    source_id: currentpath?.source_ID,
    source_name: currentpath?.source_name,
    pickup_point_id: selectedRoutes?.dep_route_id,
    pickup_point_name: selectedRoutes?.dep_route,
    depature_date: BusDetails?.BUS_START_DATE,
    depature_time: BusDetails?.Start_time,
    destination_id: currentpath?.destionation_ID,
    destination_name: currentpath?.destination_name,
    droping_point_id: selectedRoutes?.arr_route_id,
    droping_point_name: selectedRoutes?.arri_route,
    arrival_date: arraivaldate,
    arraival_time: BusDetails?.Arr_Time,
    operator_id: BusDetails?.operatorId,
    operator_name: BusDetails?.Traveler_Agent_Name,
    passenger_details: ticketdetails?.ticket_det,
    payment_status: msg,
    razorpay_order_id: order_id,
    razorpay_payment_id: payment_id,
    razorpay_signature: signature,
    total_fare: tbsamount,
    bustype: Bustype,
    dicount_amt: discountamount,
    offer_code: code,
    base_fare: tbsbasefare,
    // bustype_name:ticketdetails?.bustype,
    // cancel_policy:ticketdetails?.cancelpolicy
  };

  const url = `${apiUrl}/tbsbookinghistory`;
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
    Get_TBS_Booking_details(TicketNo, dispatch);
    return response.data;
    //  const response = await axios.get(`${apiUrl}/operator-names/${operator}`);
  } catch (error) {
    handleError(error);
  }
};
export const TBS_Booking_Cancellation = async (
  passengerDetails,
  currentpath,
  selectedRowsData,
  partialCancellation,
  NewPNR,
  droppingDate,
  pickupData,
) => {
  const l_user_id = sessionStorage.getItem("user_id");
  const l_email_id = sessionStorage.getItem("user_email_id");
  const l_mobile = sessionStorage.getItem("user_mobile");
  const l_name = sessionStorage.getItem("user_name");
  const login_name = decryptData(l_name);
  const login_email_id = decryptData(l_email_id);
  const login_mobile = decryptData(l_mobile);
  const login_user_id = decryptData(l_user_id);
  console.log(droppingDate, "formattedDate");

  const payload = {
    login_user_id: login_user_id,
    login_user_email: login_email_id,
    login_user_mobile: login_mobile,
    ticket_no: passengerDetails.Ticket_no,
    pnr_no: passengerDetails.Ticket_no,
    source_name: passengerDetails?.source_name,
    pickup_point_name: passengerDetails?.Boarding_Place_Name,
    // depature_date: formattedDate,
    depature_date: pickupData,
    depature_time: passengerDetails?.Start_Time,
    destination_name: passengerDetails?.dest_name,
    droping_point_name: null,
    arrival_date: droppingDate,
    arraival_time: passengerDetails?.Arr_Time,
    operator_name: passengerDetails?.operatorname,
    passenger_details: selectedRowsData,
    partialcancellation: partialCancellation == 0 ? true : false,
    new_ticket_no: NewPNR ? NewPNR : null,
  };

  const url = `${apiUrl}/cancellation`;
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
    console.log(error, "errorerror");

    handleError(error);
  }
};
export const PostFeedBack = async (rating, nameValue, feedback, occValue) => {
  const occId =
    occValue === "Business"
      ? 1
      : occValue === "General Public"
      ? 2
      : occValue === "Physically Challenged"
      ? 3
      : occValue === "Pilgrim Traveler"
      ? 4
      : occValue === "Senior Citizen"
      ? 5
      : occValue === "Student"
      ? 6
      : occValue === "Tourist"
      ? 7
      : occValue === "Corporate Traveler"
      ? 8
      : 2;
  try {
    const passenger_id = sessionStorage.getItem("passenger_id");
    const decryptPassenger = passenger_id && decryptData(passenger_id);
    const response = await axios.post(`${apiUrl}/feedback`, {
      tbs_passenger_id: decryptPassenger,
      name: nameValue,
      rating: rating,
      description: feedback,
      occupation: occValue,
      occupation_id: occId,
    });
    toast.success(response.data);
  } catch (err) {
    console.log(err);
  }
};

export const GetFeedbackById = async () => {
  const passenger_id = sessionStorage.getItem("passenger_id");
  const id = passenger_id && decryptData(passenger_id);
  try {
    const response = await axios.get(`${apiUrl}/passenger-details/${id}`);
    console.log(response.data, "ddddjjjjjjdjdjhfh");
    return response.data;
  } catch (err) {
    handleError(err);
  }
};
export const GetAvailableOffers = async (dispatch, emailInput, mobileInput) => {
  const userid = sessionStorage.getItem("user_id");
  const id = userid && decryptData(userid);
  const payload = {
    user_id: id,
    email: emailInput,
    mobile: mobileInput,
  };
  const url = `${apiUrl}/getdiscountoffers`;
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
    dispatch({
      type: GET_AVAILABLE_OFFER,
      payload: response?.data,
    });
    console.log(response, "locationdatas");
    console.log(response.data, "submitlocationdata");
    return response.data;
    //  const response = await axios.get(`${apiUrl}/operator-names/${operator}`);
  } catch (error) {
    handleError(error);
  }
};
export const GetOfferValid = async (emailInput, mobileInput, coupon_code) => {
  const userid = sessionStorage.getItem("user_id");
  const id = userid && decryptData(userid);
  const payload = {
    code: coupon_code,
    user_id: id,
    email: emailInput,
    mobile: mobileInput,
  };
  const url = `${apiUrl}/offervalid`;
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
export const DownloadTicket = async (ticketID) => {
  try {
    const response = await axios.get(`${apiUrl}/downloadticket/${ticketID}`);
    console.log(response, "downloading_ticket");
    return response?.data;
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
