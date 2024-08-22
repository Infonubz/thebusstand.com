import axios from "axios";
import { toast } from "react-toastify";
import { CARD_DETAIL } from "../../Store/type";


const api = axios.create({
    headers: {
        "Content-Type": "application/json",
    },
});

const apiUrl = `http://192.168.90.47:4001/api`
// export const GetCardDetails = async (dispatch, id) => {
//     try {
//         const response = await axios.get(`${apiUrl}/bus-details`);
//         dispatch({ type: CARD_DETAIL, payload: response.data });
//         console.log(response, "carddetails");
//         return response.data;
//     } catch (error) {
//         handleError(error);
//     }
// };

export const SendTravelDetails = async (dispatch) => {

    const payload = {
        source_name: "Chennai",
        destination_name: "Bangalore",
        depat_datetime: "2024-07-25 23:10:00"
    }

    const url = `${apiUrl}/bus-details`;
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
        console.log(response, "locationdatas");
        dispatch({ type: CARD_DETAIL, payload: response.data });
        console.log(response.data,"submitlocationdata")
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




// const apiUrl = 'https://example.com'; // Replace with your actual API URL

// export const SendTravelDetails = async () => {
//     const payload = {
//         key1: 'value1', // Correct syntax for object properties
//     };

//     const url = `${apiUrl}/bus-details`;
//     const method = 'post';
//     const dispatch = useDispatch(); // Initialize dispatch

//     try {
//         const response = await axios({
//             method,
//             url,
//             data: payload,
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//         });

//         console.log(response, 'submitelocationdatas');
//         dispatch({ type: CARD_DETAIL, payload: response.data });
//         return response.data;
//     } catch (error) {
//         handleError(error);
//         return null;
//     }
// };
