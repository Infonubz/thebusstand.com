import axios from "axios";
import { toast } from "react-toastify";
import { GET_OPERATOR_LIST } from "../../Store/Type";
import { decryptData } from "../../Componenets/Common/Common-Functions/Encrypt-Decrypt";

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
export const TBS_Booking_Details = async (
  TicketNo,
  order_id,
  payment_id,
  signature,
  ticketdetails,
  email,
  mobile,
  msg
) => {
  console.log(
    ticketdetails,
    "ticketdetailsticketdetailsticketdetails",
    ticketdetails?.ticket_det?.[0]?.Passenger_Name
  );

  const payload = {
    login_user_id: "",
    login_user_email: "",
    login_user_mobile: "",
    name: ticketdetails?.ticket_det?.[0]?.Passenger_Name,
    email: email,
    mobile: mobile,
    ticket_no: TicketNo,
    pnr_no: TicketNo,
    source_id: "",
    source_name: "",
    pickup_point_id: "",
    pickup_point_name: "",
    depature_date: "",
    depature_time: "",
    destination_id: "",
    destination_name: "",
    droping_point_id: "",
    droping_point_name: "",
    arrival_date: "",
    arraival_time: "",
    operator_id: "",
    operator_name: "",
    passenger_details: "",
    payment_status: msg,
    razorpay_order_id: order_id,
    razorpay_payment_id: payment_id,
    razorpay_signature: signature,
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
    return response.data;
    //  const response = await axios.get(`${apiUrl}/operator-names/${operator}`);
  } catch (error) {
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
