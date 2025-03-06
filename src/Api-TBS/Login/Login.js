import axios from "axios";
import { toast } from "react-toastify";
import { SEND_OTP, VERIFY_OTP } from "../../Store/Type";
import { useNavigate, useNavigation } from "react-router";
import {
  decryptData,
  encryptData,
} from "../../Componenets/Common/Common-Functions/Encrypt-Decrypt";

const api = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
});
const apiUrl = process.env.REACT_APP_API_URL;

export const SendVerificationOTP = async (dispatch, values) => {
  const payload = {
    email_id: values.email ? values?.email : values,
    // phone: values.mobile
  };
  console.log(values, "values");
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
export const LoginCheck = async (emailid, mbl) => {
  const payload = {
    email: emailid,
    mobile: mbl,
  };
  const url = `${apiUrl}/checkuserexist`;
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
    return response.data;
  } catch (error) {
    handleError(error);
    return null;
  }
};

export const GetUserDetails = async (navigation) => {
  const user_id = sessionStorage.getItem("user_id");
  const decryptid = user_id && decryptData(user_id);
  try {
    const response = await axios.get(
      `${apiUrl}/passenger-details/${decryptid}`
    );
    //   dispatch({ type: GET_BOOKING_DETAILS, payload: response.data });
    const encryptedUserId = encryptData(response?.data?.tbs_passenger_id);
    const encryptedUserMobile = encryptData(response?.data?.mobile_number);
    const encryptedUserEmail = encryptData(response?.data?.email_id);
    const encryptedUserName = encryptData(response?.data?.user_name);

    sessionStorage.setItem("user_email_id", encryptedUserEmail);
    sessionStorage.setItem("user_mobile", encryptedUserMobile);
    sessionStorage.setItem("user_id", encryptedUserId);
    sessionStorage.setItem("user_name", encryptedUserName);
    sessionStorage.setItem("passenger_name", encryptedUserName);
    console.log(response, "response for bookingDetails");
    // navigation("/dashboard");
    return response.data;
  } catch (error) {
    handleError(error);
  }
};
export const SendOTPassword = async (dispatch, values, Email_Id) => {
  console.log(Email_Id.email_id, "email_id__email_id");
  const email = sessionStorage.getItem("email_id");
  const encryptemailid = decryptData(email);
  const payload = {
    email_id: encryptemailid,
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

    // sessionStorage.setItem("passenger_name", response?.data?.user?.user_name);
    const encryptedUserId = encryptData(response?.data?.user?.tbs_passenger_id);
    const encryptedUserMobile = encryptData(
      response?.data?.user?.mobile_number
    );
    const encryptedUserEmail = encryptData(response?.data?.user?.email_id);
    const encryptedUserName = encryptData(response?.data?.user?.user_name);

    sessionStorage.setItem("user_email_id", encryptedUserEmail);
    sessionStorage.setItem("user_mobile", encryptedUserMobile);
    sessionStorage.setItem("user_id", encryptedUserId);
    sessionStorage.setItem("user_name", encryptedUserName);
    sessionStorage.setItem("passenger_name", encryptedUserName);

    GetUserDetails();
    // } else {
    //   sessionStorage.setItem("user_id", response?.data?.tbs_passenger_id);
    // }
    // if (response?.data?.user?.status == 2) {
    //   window.location.reload();
    // }
    console.log(response.data, "OTP_VERIFICATION");
    localStorage.setItem("tokenID", response?.data?.token);
    return response.data;
  } catch (error) {
    console.log(error, "error_message_otp");
    handleError(error);
    // toast.error(error);
    return null;
  }
};
export const SendMobileVerifycation = async (dispatch) => {
  // console.log(Email_Id.email_id, "email_id__email_id");
  const mobile = sessionStorage.getItem("mobile");
  const encryptmobile = decryptData(mobile);
  const payload = {
    mobile_number: encryptmobile,
  };

  const url = `${apiUrl}/get-user-data`;
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
console.log(response?.data?.user?.tbs_passenger_id,"response?.dataresponse?.data");

    // sessionStorage.setItem("passenger_name", response?.data?.user?.user_name);
    const encryptedUserId = encryptData(response?.data?.user?.tbs_passenger_id);
    const encryptedUserMobile = encryptData(
      response?.data?.user?.mobile_number
    );
    const encryptedUserEmail = encryptData(response?.data?.user?.email_id);
    const encryptedUserName = encryptData(response?.data?.user?.user_name);

    sessionStorage.setItem("user_email_id", encryptedUserEmail);
    sessionStorage.setItem("user_mobile", encryptedUserMobile);
    sessionStorage.setItem("user_id", encryptedUserId);
    sessionStorage.setItem("user_name", encryptedUserName);
    sessionStorage.setItem("passenger_name", encryptedUserName);

    GetUserDetails();
    // } else {
    //   sessionStorage.setItem("user_id", response?.data?.tbs_passenger_id);
    // }
    // if (response?.data?.user?.status == 2) {
    //   window.location.reload();
    // }
    console.log(response.data, "OTP_VERIFICATION");
    localStorage.setItem("tokenID", response?.data?.token);
    return response.data;
  } catch (error) {
    console.log(error, "error_message_otp");
    handleError(error);
    // toast.error(error);
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
  sessionStorage.setItem("user_name", values.name);
  const user_id = sessionStorage.getItem("user_id");
  const decryptid = user_id && decryptData(user_id);
  // const user_id = sessionStorage.getItem("user_id");
  const url = `${apiUrl}/passenger-details/${decryptid}`;
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
    // toast.error(error.response.data.message);
    console.log(error.response.data.message);
    return error.response.data.message;
  }
};

// export const SendMessage = async (phoneNumber) => {
//   const generateOTP = () => {
//     return Math.floor(100000 + Math.random() * 900000).toString();
//   };
//   const url = "http://localhost:5000/send-sms";
//   const params = {
//     uname: "akrind",
//     pwd: "Arise@7799$",
//     senderid: "AKRIND",
//     to: phoneNumber,
//     msg: `Dear User, Please use the OTP ${generateOTP()} to login your AKRCAFE Account. -AKR Industries Pvt Ltd.`,
//     // msg: `Dear User , Please use the OTP ${otp} to login your thebusstand.com Account. - Ra Tech Travels.`,
//     route: "T",
//     peid: "1501369250000039302",
//     tempid: "1707173754252096735",
//   };

//   try {
//     const response = await axios.get(url, { params });
//     console.log("SMS Response:", response.data);
//   } catch (error) {
//     console.error("Error sending SMS:", error);
//   }
// };

export const SendMessage = async (mobile, otp) => {
  try {
    const response = await axios.post(`${apiUrl}/send-sms`, {
      mobile,
      otp,
    });
    console.log(response?.data?.success===true,"hhhhhhhh");
    
    if (response?.data?.success) {
      const encryptrandom = encryptData(otp);
      sessionStorage.setItem("mobileOTP", encryptrandom);
    }
    console.log("SMS Response:", response?.data?.success);
  } catch (error) {
    console.error("Error sending OTP:", error.response?.data || error.message);
  }
};
// export const SendMessage = async (phoneNumber, otp) => {
//   const baseURL = "https://smsto.biz/sendsms";
//   const params = new URLSearchParams({
//     uname: "akrind",
//     pwd: "Arise@7799$",
//     senderid: "AKRIND",
//     to: phoneNumber,
//     msg: `Dear User, Please use the OTP ${otp} to login to your AKRCAFE Account. -AKR Industries Pvt Ltd.`,
//     route: "T",
//     peid: "1501369250000039302",
//     tempid: "1707173754252096735",
//     mode: 'cors',
//   });

//   try {
//     const response = await fetch(`${baseURL}?${params.toString()}`);
//     const data = await response.text();
//     console.log("SMS Response:", data);
//   } catch (error) {
//     console.error("Error sending SMS:", error);
//   }
// };

// export const SendMessage = async (phoneNumber, otp) => {
//   const baseURL = "http://localhost:5000/send-sms"; // Call your backend instead
//   const params = new URLSearchParams({
//     uname: "akrind",
//     pwd: "Arise@7799$",
//     senderid: "AKRIND",
//     to: phoneNumber,
//     msg: `Dear User, Please use the OTP ${otp} to login to your AKRCAFE Account. -AKR Industries Pvt Ltd.`,
//     route: "T",
//     peid: "1501369250000039302",
//     tempid: "1707173754252096735",
//     mode:"cors"
//   });

//   try {
//     const response = await fetch(`${baseURL}?${params.toString()}`);
//     const data = await response.json();
//     console.log("SMS Response:", data);
//   } catch (error) {
//     console.error("Error sending SMS:", error);
//   }
// };

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
  // else if (error?.response?.data?.error === "Invalid OTP") {
  //   errorMessage = "Invalid OTP";
  // }

  toast.error(
    error?.response?.data?.error === "Invalid OTP" ? null : errorMessage
  );
};
