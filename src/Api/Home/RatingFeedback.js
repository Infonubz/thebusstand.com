import axios from "axios";
import { toast } from "react-toastify";
import { FEED_BACK } from "../../Store/type";

const api = axios.create({
    headers: {
        "Content-Type": "application/json",
    },
});
const apiUrl = process.env.REACT_APP_API_URL;

export const GetFeedbacks = async (dispatch, id) => {
    try {
        const response = await axios.get(`${apiUrl}/feedback`);
        dispatch({ type: FEED_BACK, payload: response.data });
        console.log(response, "GET_FEED_BACK");
        return response.data;
    } catch (error) {
        handleError(error);
        // return null;
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
        phone: localStorage.getItem("mobile")
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
        })
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
