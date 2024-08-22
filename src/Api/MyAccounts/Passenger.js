import axios from "axios";
import { toast } from "react-toastify";
import { PASSENGER_DATA } from "../../Store/type";

const api = axios.create({
    headers: {
        "Content-Type": "application/json",
    },
});
const apiUrl = process.env.REACT_APP_API_URL;

export const GetPassengerData = async (dispatch, id) => {
    const user_id = "tbs-pax1001";
    try {
        const response = await axios.get(`${apiUrl}/all-passengers/${user_id}`);
        dispatch({ type: PASSENGER_DATA, payload: response.data });
        return response.data;
    } catch (error) {
        handleError(error);
        // return null;
    }
};

export const SubmitPassengerData = async (passengerdata, updateData) => {


    const payload = {
        name: passengerdata.name,
        date_of_birth: passengerdata.date_of_birth,
        age: passengerdata.age,
        gender: passengerdata.gender,
        email: passengerdata.email,
        phone: passengerdata.phone,
        state: "TamilNadu",
        state_id: "TN",
        tbs_passenger_id: "tbs-pax1001"

        // tbs_passenger_id: "tbs-pax1001",
        // name: "santhosh",
        // date_of_birth: "1973-03-22",
        // gender: "male",
        // email: "santhosh@gmail.com",
        // phone: "8931212150",
        // state: "Kerala",
        // state_id: "KL32",
        // age: 52

    };
    console.log(passengerdata, "poda antha andavane namba pakkam")
    const url = updateData
        ? `${apiUrl}/add-passenger-details/${updateData}`
        : `${apiUrl}/add-passenger-details`;
    const method = updateData ? "put" : "post";

    // const url = `${apiUrl}/add-passenger-details`;
    // const method = "post";
    try {
        const response = await api({
            method,
            url,
            data: payload,
            headers: {
                "Content-Type": "application/json",
            },
        });
        console.log(response, "SubmitPassengerData");
        return response.data;
    } catch (error) {
        handleError(error);
        return null;
    }
};

export const GetPassengById = async (
    updatedata,
) => {
    console.log(updatedata, "ahsgxdahsjksaxbj");
    try {
        console.log(updatedata, "aaaaaaaaaaaaaaaaaaaa")
        const response = await api.get(`${apiUrl}/add-passenger-details/${updatedata}`);
        console.log(response.data, "GetPassengById");
        return response?.data;
    } catch (error) {
        handleError(error);
        return null;
    }
};


export const Deleteall = async (api, dispatch) => {
    try {
        const response = await axios.delete(api);
        console.log(response.data, "response.data5555");
        toast.success(response.data);
        GetPassengerData(dispatch);
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
