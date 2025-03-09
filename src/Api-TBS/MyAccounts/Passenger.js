import axios from "axios";
import { toast } from "react-toastify";
import { PASSENGER_DATA } from "../../Store/Type";
import { decryptData } from "../../Componenets/Common/Common-Functions/Encrypt-Decrypt";

const api = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
});
const apiUrl = process.env.REACT_APP_API_URL;
const authToken = localStorage.getItem("tokenID");

export const GetPassengerData = async (dispatch, setSpinning) => {
  const user_id = sessionStorage.getItem("user_id");
  const decryptid = user_id && decryptData(user_id);
  // const user_id = sessionStorage.getItem("user_id");
  try {
    const response = await axios.get(`${apiUrl}/all-passengers/${decryptid}`);
    dispatch({ type: PASSENGER_DATA, payload: response.data });
    return response.data;
  } catch (error) {
    handleError(error);
    // return null;
  } finally {
    setSpinning && setSpinning(false);
  }
};

// Define the function to submit passenger data
export const SubmitPassengerData = async (passengerdata, updateData) => {
  // Construct the payload object with passenger data
  const user_id = sessionStorage.getItem("user_id");
  const decryptid = user_id && decryptData(user_id);
  const payload = {
    user_name: passengerdata?.name,
    date_of_birth: passengerdata?.date_of_birth,
    age: passengerdata?.age,
    gender: passengerdata?.gender,
    email_id: passengerdata?.email,
    mobile_number: passengerdata?.phone,
    state: passengerdata?.state,
    state_id: "TN",
    tbs_passenger_id: decryptid,
  };

  // Log the passenger data for debugging
  // console.log(passengerdata, authToken, "poda antha andavane namba pakkam");

  // Determine the URL and HTTP method based on whether we are updating data
  const url = updateData
    ? `${apiUrl}/add-passenger-details/${updateData}`
    : `${apiUrl}/addpassengerdetails`;
  const method = updateData ? "put" : "post";

  // Log the payload for debugging
  // console.log(payload, "payload outside");

  try {
    // Log the payload again for debugging
    // console.log(payload, "payload inside");

    // Make the API call
    const response = await api({
      method,
      url,
      data: payload,
      headers: {
        authorization: "Bearer " + authToken, // Include the authToken in the headers
        "Content-Type": "application/json",
      },
    });

    // Log the response for debugging
    // console.log(response, "SubmitPassengerData");

    // Show a success message using toast
    toast.success(response.data.message);

    // Return the response data
    return response.data;
  } catch (error) {
    // Handle any errors that occur during the API call
    handleError(error);
    return null;
  }
};

export const GetPassengById = async (updatedata) => {
  // console.log(updatedata, "ahsgxdahsjksaxbj");
  try {
    // console.log(updatedata, "aaaaaaaaaaaaaaaaaaaa");
    const response = await api.get(
      `${apiUrl}/add-passenger-details/${updatedata}`
    );
    // console.log(response.data, "GetPassengById");
    return response?.data;
  } catch (error) {
    handleError(error);
    return null;
  }
};

export const Deleteall = async (api, dispatch) => {
  try {
    const response = await axios.delete(api);
    // console.log(response.data, "response.data5555");
    toast.success(response.data);
    GetPassengerData(dispatch);
    toast.success(response.data.message);
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
