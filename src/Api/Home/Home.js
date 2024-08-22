import axios from "axios";
import { toast } from "react-toastify";
import {
  ADS_LIST,
  FAQS,
  FOOTER,
  PDP,
  PROFILE_DATA,
  PROMOTION_LIST,
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
      `${"http://192.168.90.47:4000/api"}/Active-ads`
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
      `${"http://192.168.90.47:4000/api"}/promo-status/2`
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
      payload: response?.data[0]?.top_bus_routes,
    });
    console.log(response.data, "footerresponse");
    return response.data;
  } catch (error) {
    handleError(error);
    // return null;
  }
};
const handleError = (error) => {
  console.error("Error details:", error);
  let errorMessage = "An error occurred";

  if (error.response) {
    console.error("Error response from server:", error.response);
    errorMessage = `Server responded with status ${error.response.status}`;
  } else if (error.request) {
    console.error("No response received:", error.request);
    errorMessage = "No response received from server";
  } else {
    console.error("Error setting up request:", error.message);
    errorMessage = error.message;
  }

  if (error.code === "ERR_NETWORK") {
    errorMessage =
      "Network Error: Unable to connect to the server. Please check the server status and your network connection.";
  }
  if (error.code === "ERR_CONNECTION_REFUSED") {
    errorMessage =
      "Network Error: Unable to connect to the server. Please check the server status and your network connection.";
  }
  toast.error(errorMessage);
};
