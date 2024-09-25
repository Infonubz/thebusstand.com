import axios from "axios";
import { toast } from "react-toastify";
import { TBS_INFO } from "../../Store/type";

const api = axios.create({
    headers: {
        "Content-Type": "application/json",
    },
});
const apiUrl = process.env.REACT_APP_API_URL;
const apicrm = process.env.REACT_CRM_API_URL;


export const GetFooterTabs = async (dispatch, id) => {
    try {
        const response = await axios.get(`${apiUrl}/tbsInfo`);
        dispatch({ type: TBS_INFO, payload: response.data });
        console.log(response.data, "Get_Footer_Tabs");
        return response.data;
    } catch (error) {
        handleError(error);
        // return null;
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
