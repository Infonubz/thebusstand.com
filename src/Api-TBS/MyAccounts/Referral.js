import axios from "axios";
import { toast } from "react-toastify";
import { decryptData } from "../../Componenets/Common/Common-Functions/Encrypt-Decrypt";

const apiUrl = process.env.REACT_APP_API_URL;
const apicrm = process.env.REACT_APP_CRM_API_URL;

export const GetRefferalContent = async (setSpinning) => {
  try {
    const response = await axios.get(`${apicrm}/referEarnContent`);
    // console.log(response.data, "apiressponce");
    return response?.data[0];
  } catch (err) {
    handleError(err);
  }
  finally {
    setSpinning(false)
  }
};

export const GetRefferalCode = async () => {
  const user_id = sessionStorage.getItem("user_id");
  const decryptuser_id = user_id && decryptData(user_id);
  try {
    const response = await axios.get(`${apiUrl}/ReferralCode/${decryptuser_id}`)
    return response.data
  }
  catch (err) {
    handleError(err)
  }
}
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
