import axios from "axios";
import { toast } from "react-toastify";
import { GET_OPERATOR_LIST } from "../../Store/Type";

//import { object } from "yup";

const api = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
});
const apiUrlimage = process.env.REACT_APP_API_URL_IMAGE;

const apicrmimage = process.env.REACT_APP_CRM_API_URL_IMAGE;
// const apiUrl = `${apiUrlimage }/api`;
const apiUrl = process.env.REACT_APP_API_URL;
const apicrm = process.env.REACT_APP_CRM_API_URL;



export const GetOperators = async (dispatch) => {
    try {
      const response = await axios.get(`${apiUrl}/operator-name`);
      dispatch({ type: GET_OPERATOR_LIST, payload: response.data });
      return response;
    } catch (error) {
      handleError(error);
    }
  };
  
export const OperatorFilters = async (operator, e = null) => {
    const payload = {
      search: e ? e.target.value : operator,
    };
  
    const url = `${apiUrl}/operator-names/${operator}`;
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
      console.log(response.data, "submitlocationdata");
      return response.data;
      //  const response = await axios.get(`${apiUrl}/operator-names/${operator}`);
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
