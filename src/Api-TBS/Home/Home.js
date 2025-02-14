import axios from "axios";
import { toast } from "react-toastify";
import {
  DISCOUNT_OFFER_LIST,
  PROMOTION_LIST,
  TOP_ROUTE_LIST,
  PDP,
  FAQ_LIST,
  FAQS,
  FEED_BACK,
  SEND_APP_LINK,
  TBS_INFO,
  FOOTER,
  OFFERS_OCCUPATION,
} from "../../Store/Type";

const api = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
});
const apiUrl = process.env.REACT_APP_API_URL;
const apicrm = process.env.REACT_APP_CRM_API_URL;

export const GetPromotion = async (dispatch, id) => {
  try {
    const response = await axios.get(`${apicrm}/getLivePromotions`);
    dispatch({ type: PROMOTION_LIST, payload: response.data });
    console.log(response.data, "footerresponse");
    return response.data;
  } catch (error) {
    handleError(error);
    // return null;
  }
};

export const GetDiscountOffers = async (dispatch, id) => {
  try {
    const response = await axios.get(`${apicrm}/getLiveOffersDeals/0`);
    dispatch({ type: DISCOUNT_OFFER_LIST, payload: response.data });
    console.log(response.data, "footerresponse");
    return response.data;
  } catch (error) {
    handleError(error);
    // return null;
  }
};

export const GetTopBusRoutes = async (dispatch, id) => {
  try {
    const response = await axios.get(`${apiUrl}/top-bus-routes`);
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

// --------------------------------------------FAQS--------------------------------------------

export const GetFAQById = async (dispatch, id) => {
  try {
    const response = await axios.get(`${apicrm}/faqs/${id}`);
    dispatch({ type: FAQ_LIST, payload: response.data });
    console.log(response.data, "Get_Footer_Tabs");
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const GetFAQS = async (dispatch, tabName, setSpinning) => {
  try {
    let id;
    switch (tabName) {
      case "general":
        id = 1;
        break;
      case "ticket_related":
        id = 2;
        break;
      case "payment":
        id = 3;
        break;
      case "cancellation":
        id = 4;
        break;
      case "insurance":
        id = 5;
        break;
      default:
        console.error("Invalid tab name");
        return;
    }
    const response = await axios.get(`${apicrm}/faqs/${id}`);
    dispatch({ type: FAQS, payload: response.data });
    console.log(response, "faqsresponse");
    setSpinning(false);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};
// ------------------------------------------------Ratings & FeedBack-----------------------------------------

export const GetAverageRating = async () => {
  try {
    const response = await axios.get(`${apiUrl}/feedbackCount`);
    console.log(response.data);
    return response.data;
  } catch (err) {
    handleError(err);
  }
};

export const GetFeedbacks = async (dispatch, id, setSpinner) => {
  try {
    const response = await axios.post(`${apiUrl}/feedback-By-Rating`, {
      ratingFrom: id || 4,
      // ratingTo: id === 1 ? 2 : 5
      ratingTo: 5,
    });
    dispatch({ type: FEED_BACK, payload: response.data });
    console.log(response, "GET_FEED_BACK");
    return response.data;
  } catch (error) {
    handleError(error);
    // return null;
  } finally {
    setSpinner && setSpinner(false);
  }
};

// ----------------------------------------------BookingApp---------------------------------------------------

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
// -----------------------------------Footer------------------------------------------------------

export const GetFooterTabs = async (dispatch, id) => {
  try {
    const response = await axios.get(`${apicrm}/tbsInfo`);
    dispatch({ type: TBS_INFO, payload: response.data });
    console.log(response.data, "Get_Footer_Tabs");
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
// --------------------------------------RewardsandOffers----------------------------------------------------------

export const GetOffersOccupation = async (dispatch, id) => {
  try {
    const response = await axios.get(`${apicrm}/offers-deals-occupation/0`);
    dispatch({ type: OFFERS_OCCUPATION, payload: response.data });
    console.log(response, "Offers_occupationss");
    return response.data;
  } catch (error) {
    handleError(error);
    // return null;
  }
};

export const GetFeedbackById = async () => {
  const id = sessionStorage.getItem("passenger_id");
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
