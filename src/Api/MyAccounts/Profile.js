import axios from "axios";
import { toast } from "react-toastify";
import { PROFILE_DATA } from "../../Store/type";

const api = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
});
const apiUrl = process.env.REACT_APP_API_URL;

export const GetProfileById = async (dispatch, id) => {
  try {
    const response = await axios.get(`${apiUrl}/passenger-details/${id}`);
    dispatch({ type: PROFILE_DATA, payload: response.data });
    return response.data;
  } catch (error) {
    handleError(error);
    // return null;
  }
};
// export const Deleteall = async (api, dispatch, module) => {
//   try {
//     const response = await axios.delete(api);
//     console.log(module == "offer", "responsedata5555");
//     toast.success(response.data);
//     if (module == "operator") {
//       GetOperatorData(dispatch);
//       toast.success(response?.data?.message);
//       console.log(response.data, "response.dataresponse.data");
//     } else if (module == "employee") {
//       GetEmployeeData(dispatch);
//     } else if (module == "partner") {
//       GetPartnerData(dispatch);
//     } else if (module == "offer") {
//       GetOffersData(dispatch);
//     } else if (module == "ads") {
//       GetAdsData(dispatch);
//     } else if (module == "promotion") {
//       GetPromotionData(dispatch);
//     } else if (module == "client") {
//       GetClientData(dispatch);
//     } else {
//       console.log("testt");
//     }
//     return response.data;
//   } catch (error) {
//     handleError(error);
//     return null;
//   }
// };

// export const SubmitOfferExcel = async (file) => {
//   const formData = new FormData();
//   formData.append("xlsxFile", file);

//   const excelEndpoint = `${apiUrl}/offers-deals-importExcel`;
//   const method = "post";

//   try {
//     const response = await api({
//       url: excelEndpoint,
//       method: method,
//       data: formData,
//       headers: {
//         "Content-Type": "multipart/form-data",
//       },
//     });
//     toast.success(response.data);
//     return response.data;
//   } catch (error) {
//     console.error("Error uploading file:", error);
//     toast.error("Failed to upload file");
//     return null;
//   }
// };

export const UpdateProfile = async (profilevalues) => {
  const payload = {
    name: profilevalues.name,
    date_of_birth: profilevalues.dob,
    gender: profilevalues.gender,
    email: profilevalues.email,
    phone: profilevalues.phone,
    state: profilevalues.state,
    state_id: profilevalues.state_id,
  };
  const user_id = "tbs-pax1001";
  const url = user_id
    ? `${apiUrl}/passenger-details/${user_id}`
    : `${apiUrl}/passenger-details`;
  const method = user_id ? "put" : "post";

  try {
    const response = await api({
      method,
      url,
      data: payload,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    // GetOffersData(dispatch);
    console.log(response, "responseresponse");
    return response.data;
  } catch (error) {
    handleError(error);
    return null;
  }
};

// export const GetOffersById = async (
//   updatedata,
//   SetUpdateData,
//   setOfferData
// ) => {
//   console.log(updatedata, "ahsgxdahsjksaxbj");
//   try {
//     const response = await api.get(`${apiUrl}/offers-deals/${updatedata}`);
//     console.log(response, "responseresponse");
//     // SetUpdateData(null);
//     setOfferData("");
//     return response?.data[0];
//   } catch (error) {
//     handleError(error);
//     return null;
//   }
// };

// export const handleoffersearch = async (e, dispatch) => {
//   try {
//     if (e.target.value) {
//       const response = await api.get(
//         `${apiUrl}/offers-deals-search/${e.target.value}`
//       );
//       dispatch({ type: OFFERS_LIST, payload: response.data });
//       return response.data[0];
//     } else {
//       GetOffersData(dispatch);
//     }
//   } catch (error) {
//     handleError(error);
//     return null;
//   }
// };

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
