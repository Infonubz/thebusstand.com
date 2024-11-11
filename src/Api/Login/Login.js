import axios from "axios";
import { toast } from "react-toastify";
import { SEND_OTP, VERIFY_OTP } from "../../Store/type";
import { useNavigate, useNavigation } from "react-router";

const api = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
});
const apiUrl = process.env.REACT_APP_API_URL;

export const SendVerificationOTP = async (dispatch, values) => {
  const payload = {
    email_id: values.email,
    // phone: values.mobile
  };

  const url = `${apiUrl}/send-request`;
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
    // sessionStorage.setItem("user_email_id")
    dispatch({ type: SEND_OTP, payload: response.data });
    console.log(response.data, "SENDED_VERIFICATION");
    return response.data;
  } catch (error) {
    handleError(error);
    return null;
  }
};

export const GetUserDetails = async (navigation) => {
  try {
    const response = await axios.get(
      `${apiUrl}/passenger-details/${sessionStorage.getItem("user_id")}`
    );
    //   dispatch({ type: GET_BOOKING_DETAILS, payload: response.data });
    sessionStorage.setItem("user_email_id", response?.data?.email_id);
    sessionStorage.setItem("user_mobile", response?.data?.mobile_number);
    sessionStorage.setItem("user_id", response?.data?.tbs_passenger_id);
    sessionStorage.setItem("user_name", response?.data?.user_name);
    sessionStorage.setItem("passenger_name", response?.data?.user_name);
    console.log(response, "response for bookingDetails");
    // navigation("/dashboard");
    return response.data;
  } catch (error) {
    handleError(error);
  }
};
export const SendOTPassword = async (dispatch, values, Email_Id) => {
  console.log(Email_Id.email_id, "email_id__email_id");
  const payload = {
    email_id: sessionStorage.getItem("email_id"),
    otp: values.otp,
  };
  console.log(payload.email_id, "verificationforotp");

  const url = `${apiUrl}/verify-otp`;
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
    // dispatch({ type: VERIFY_OTP, payload: response.data });
    // if (response?.data?.user) {
    sessionStorage.setItem("user_email_id", response?.data?.user?.email_id);
    sessionStorage.setItem("user_mobile", response?.data?.user?.mobile_number);
    sessionStorage.setItem("user_id", response?.data?.user?.tbs_passenger_id);
    sessionStorage.setItem("user_name", response?.data?.user?.user_name);
    sessionStorage.setItem("passenger_name", response?.data?.user?.user_name);
    GetUserDetails();
    // } else {
    //   sessionStorage.setItem("user_id", response?.data?.tbs_passenger_id);
    // }
    // if (response?.data?.user?.status == 2) {
    //   window.location.reload();
    // }
    console.log(response.data, "OTP_VERIFICATION");
    return response.data;
  } catch (error) {
    handleError(error);
    return null;
  }
};

export const SendPassengerName = async (dispatch, values, setLoginIsOpen) => {
  const payload = {
    user_name: values.name,
    // email_id: sessionStorage.getItem("email_id"),
    mobile_number: values.mobile,
    occupation: values.occupation,
    occupation_id:
      values.occupation === "Business"
        ? 1
        : values.occupation === "GeneralPublic"
        ? 2
        : values.occupation === "PhysicallyChallenged"
        ? 3
        : values.occupation === "PilgrimTravelers"
        ? 4
        : values.occupation === "SeniorCitizens"
        ? 5
        : values.occupation === "Students"
        ? 6
        : values.occupation === "Tourist"
        ? 7
        : 8,
  };
  console.log(payload.email_id, "verificationforotp");
  sessionStorage.setItem("user_name",values.name );
  const user_id = sessionStorage.getItem("user_id");
  const url = `${apiUrl}/passenger-details/${user_id}`;
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
    GetUserDetails();
    setLoginIsOpen(false);
    toast.success(response?.data?.message);
    console.log(response, "OTP_VERIFICATION");
    return response.data;
  } catch (error) {
    handleError(error);
    toast.error(error.response.data.message);
    console.log(error.response.data.message);
    return error.response.data.message;
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
