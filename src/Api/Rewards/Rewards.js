import axios from "axios";
import { toast } from "react-toastify";
import { OFFERS_OCCUPATION } from "../../Store/type";

const api = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
});

const apiUrl = process.env.REACT_APP_API_URL;
export const GetOffersOccupation = async (dispatch, id, setSpinning) => {
  console.log(id, "iddddddddddddddddd");

  try {
    const response = await axios.get(
      `http://192.168.90.47:4000/api/offers-deals-occupation/${id}`
    );
    dispatch({ type: OFFERS_OCCUPATION, payload: response.data });
    console.log(response, "Offers_occupationss");
    setSpinning(false);
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
