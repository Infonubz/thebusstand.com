import axios from "axios";
import { toast } from "react-toastify";
import { FEED_BACK } from "../../Store/Type";

const api = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
});
const apiUrl = process.env.REACT_APP_API_URL;
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
    const response = await axios.post(`${apiUrl}/feedback`, {
      tbs_passenger_id: sessionStorage.getItem("passenger_id"),
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
  const id = sessionStorage.getItem("passenger_id");
  try {
    const response = await axios.get(`${apiUrl}/passenger-details/${id}`);
    console.log(response.data, "ddddjjjjjjdjdjhfh");
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

export const GetAverageRating = async () => {
  try {
    const response = await axios.get(`${apiUrl}/feedbackCount`);
    console.log(response.data);
    return response.data;
  } catch (err) {
    handleError(err);
  }
};

export const SendFeedBacks = async (dispatch, values) => {
  console.log(values, "SEND__FEED__BACK");
  // console.log(gettingDetails, 'getting_details')
  const payload = {
    description: values.description,
    rating: values.rating,
    name: values.name,
    occupation: values.occupation,
    email: localStorage.getItem("email"),
    phone: localStorage.getItem("mobile"),
  };

  const url = `${apiUrl}/feedback`;
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
    dispatch({ type: FEED_BACK, payload: response.data });
    console.log(response.data, "FEEDBACK_RESPONDED");
    return response.data;
  } catch (error) {
    handleError(error);
    return null;
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
