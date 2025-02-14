import axios from "axios";
import { ADS_LIST, MOB_ADS_LIST } from "../../Store/Type";
import { toast } from "react-toastify";

const apicrm = process.env.REACT_APP_CRM_API_URL;
export const GetAds = async (dispatch, id) => {
    try {
        const response = await axios.get(`${apicrm}/Active-ads`);
        dispatch({ type: ADS_LIST, payload: response.data });
        console.log(response.data, "footerresponse");
        return response.data;
    } catch (error) {
        handleError(error);
        // return null;
    }
};

export const GetMobAds = async (dispatch, id) => {
    try {
        const response = await axios.get(`${apicrm}/mobads-all`);
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