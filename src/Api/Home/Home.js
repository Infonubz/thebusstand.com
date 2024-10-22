import axios from "axios";
import { toast } from "react-toastify";
import {
  ADS_LIST,
  FAQS,
  FOOTER,
  MOB_ADS_LIST,
  PDP,
  PROFILE_DATA,
  PROMOTION_LIST,
  SEND_APP_LINK,
  TOP_ROUTE_LIST,
} from "../../Store/type";

const api = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
});
const apiUrl = process.env.REACT_APP_API_URL;
const apicrm = process.env.REACT_CRM_API_URL;
export const GetPdp = async (dispatch, id) => {
  try {
    const response = await axios.get(`${apiUrl}/popular-domestic-presence`);
    dispatch({ type: PDP, payload: response.data });
    console.log(response, "pdp_pdp_pdp");
    return response.data;
  } catch (error) {
    handleError(error);
    // return null;
  }
};
export const GetFAQS = async (dispatch, id) => {
  try {
    const response = await axios.get(`${apiUrl}/faqs`);
    dispatch({ type: FAQS, payload: response.data });
    console.log(response, "faqsresponse");
    return response.data;
  } catch (error) {
    handleError(error);
    // return null;
  }
};

export const GetFooter = async (dispatch, id) => {
  try {
    const response = await axios.get(`${apiUrl}/footer`);
    dispatch({ type: FOOTER, payload: response.data });
    console.log(response.data, "footerresponse");
    return response.data;
  } catch (error) {
    handleError(error);
    // return null;
  }
};
export const GetAds = async (dispatch, id) => {
  try {
    const response = await axios.get(
      `http://192.168.90.47:4000/api/Active-ads`
    );
    dispatch({ type: ADS_LIST, payload: response.data });
    console.log(response.data, "footerresponse");
    return response.data;
  } catch (error) {
    handleError(error);
    // return null;
  }
};
export const GetPromotion = async (dispatch, id) => {
  try {
    const response = await axios.get(
      `http://192.168.90.47:4000/api/getLivePromotions`
    );
    dispatch({ type: PROMOTION_LIST, payload: response.data });
    console.log(response.data, "footerresponse");
    return response.data;
  } catch (error) {
    handleError(error);
    // return null;
  }
};
export const GetTopBusRoutes = async (dispatch, id) => {
  try {
    const response = await axios.get(
      `${"http://192.168.90.47:4001/api"}/top-bus-routes`
    );
    dispatch({
      type: TOP_ROUTE_LIST,
      payload: response?.data,
    });
    console.log(response.data, "footerresponse");
    return response.data;
  } catch (error) {
    handleError(error);
    // return null;
  }
};
export const sendAppLink = async (dispatch, values) => {
  const payload = {
    email_id: values.email,
    //mobile_number : values?.mobile,
    android_link:
      "https://play.google.com/store/apps/details?id=com.whatsapp&hl=en_IN&pli=1",
    iphone_link: "https://apps.apple.com/us/app/whatsapp-messenger/id310633997",
  };

  const url = `${apiUrl}/share-link`;
  const method = "post";
  console.log(payload, "payload");
  try {
    const response = await api({
      method,
      url,
      data: payload,
      headers: {
        "Content-Type": "application/json",
      },
    });
    dispatch({ type: SEND_APP_LINK, payload: response.data });
    console.log("App Link", response);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};
export const GetMobAds = async (dispatch, id) => {
  try {
    const response = await axios.get(
      `http://192.168.90.47:4000/api/mobads-all`
    );
    dispatch({ type: MOB_ADS_LIST, payload: response.data });
    console.log(response.data, "footerresponse");
    return response.data;
  } catch (error) {
    handleError(error);
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
