import axios from "axios";
import { toast } from "react-toastify";
import { XMLParser } from "fast-xml-parser";
import {
  BUSLIST_LOADER,
  GET_BUS_FILTERS,
  GET_BUS_LIST,
  GET_OPERATORS,
  GET_STATIONS,
} from "../../Store/Type";
import dayjs from "dayjs";

const username = process.env.REACT_APP_ABHIBUS_USERNAME || "demo@test"; // Replace with actual username if not in .env
const password = process.env.REACT_APP_ABHIBUS_PASSWORD || "demo@abhibus"; // Replace with actual password if not in .env
const abhibusurl = process.env.REACT_APP_ABHIBUS_URL;
const abhibuscollection = process.env.REACT_APP_ABHIBUS_COLLECTIONS;

// Utility function to parse XML response using DOMParser

export const processSOAPResponse = async (soapResponse, name) => {
  try {
    // Step 1: Create a new XMLParser instance
    const parser = new XMLParser({
      ignoreAttributes: true, // Optional: Ignore attributes for simplicity
      parseNodeValue: true, // Ensure node values are parsed as string
      alwaysCreateTextNode: true, // Ensure text nodes are always created
    });

    // Step 2: Parse the SOAP response (XML to JS object)
    const parsedSOAP = parser.parse(soapResponse);


    // Step 3: Extract the JSON string from the parsed response
    // Check if the response exists and then try to access GetStationsResult
    const getStationsResult =
      parsedSOAP["SOAP-ENV:Envelope"]?.["SOAP-ENV:Body"]?.[
        `ns1:${name}Response`
      ]?.[`ns1:${name}Result`]?.["#text"];

    // Ensure the jsonString is a valid string before trying to parse it
    if (getStationsResult) {
      // Check if it's a JSON string and parse it
      const jsonObject = JSON.parse(getStationsResult);
      return jsonObject;
    } else {
      console.error("No valid 'GetStationsResult' found in the response");
      return null;
    }
  } catch (error) {
    console.error("Error processing SOAP response:", error);
    return null;
  }
};

// Main function for fetching stations
export const Abhibus_GetStations = async (dispatch) => {
  const soapRequest = `<?xml version="1.0" encoding="utf-8"?>
    <soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tns="${abhibuscollection}">
      <soap:Body>
        <tns:GetStationsV1>
          <username>${username}</username>
          <password>${password}</password>
        </tns:GetStationsV1>
      </soap:Body>
    </soap:Envelope>`;

  const url = `${abhibusurl}abhiWebServer`;

  try {
    const authHeader = `Basic ${btoa(`${username}:${password}`)}`;

  

    const response = await axios({
      method: "post",
      url,
      data: soapRequest,
      headers: {
        "Content-Type": "text/xml;charset=UTF-8",
        Authorization: authHeader,
        SOAPAction: `${abhibusurl}GetStationsV1`, // Ensure quotes if required
      },
    });

    const result = await processSOAPResponse(response.data, "GetStationsV1");
    // dispatch({ type: GET_STATIONS, payload: result?.stations });
    return result;
  } catch (error) {
    console.error("Error Response:", error.response?.data || error.message);
    toast.error(error);
    return null;
  }
};

export const Abhibus_GetBusList = async (
  dispatch,
  busdatas,
  getselecteddate
) => {


  const soapRequest = `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <tns:GetAvailableServices xmlns:tns="${abhibuscollection}">
      <tns:username>${username}</tns:username>
      <tns:password>${password}</tns:password>
      <tns:sourceStationId>${busdatas.from_sourceID}</tns:sourceStationId>
      <tns:destinationStationId>${busdatas.to_sourceID
    }</tns:destinationStationId>
      <tns:journeyDate>${dayjs(getselecteddate).format(
      "YYYY-MM-DD"
    )}</tns:journeyDate>
    </tns:GetAvailableServices>
  </soap:Body>
</soap:Envelope>
`;

  const url = `${abhibusurl}abhiWebServer`;
  dispatch({ type: BUSLIST_LOADER, payload: true });

  try {
    const authHeader = `Basic ${btoa(`${username}:${password}`)}`;


    const response = await axios({
      method: "post",
      url,
      data: soapRequest,
      headers: {
        "Content-Type": "text/xml;charset=UTF-8",
        Authorization: authHeader,
        SOAPAction: `${abhibusurl}/GetAvailableServices`, // Ensure quotes if required
      },
    });
    dispatch({ type: BUSLIST_LOADER, payload: false });

    const result = await processSOAPResponse(
      response.data,
      "GetAvailableServices"
    );
    if (result?.status === "fail") {
      toast.error(`${result?.status} - ${result?.message}`);
    }
    dispatch({ type: GET_BUS_LIST, payload: result?.services });
    dispatch({ type: GET_BUS_FILTERS, payload: result?.services });
  sessionStorage.setItem('busListLoader', false)

    return result;
  } catch (error) {
    console.error("Error Response:", error.response?.data || error.message);
    toast.error(error);
    return null;
  }
};

export const Abhibus_GetOperators = async (dispatch) => {
  const soapRequest = `<?xml version="1.0" encoding="utf-8"?>
    <soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tns="${abhibuscollection}">
      <soap:Body>
        <tns:GetOperators>
          <username>${username}</username>
          <password>${password}</password>
        </tns:GetOperators>
      </soap:Body>
    </soap:Envelope>`;
 
  const url = `${abhibusurl}abhiWebServer`;
 
  try {
    const authHeader = `Basic ${btoa(`${username}:${password}`)}`;
 
    // console.log("Request Headers:", {
    //   "Content-Type": "text/xml;charset=UTF-8",
    //   Authorization: authHeader,
    //   SOAPAction: '"https://staging.abhibus.com/GetOperators"',
    // });
    const response = await axios({
      method: "post",
      url,
      data: soapRequest,
      headers: {
        "Content-Type": "text/xml;charset=UTF-8",
        Authorization: authHeader,
        SOAPAction: `${abhibusurl}/GetOperators`, // Ensure quotes if required
      },
      mode: "no-cors",
    });
 
    // Process the SOAP response using the utility function
    const result = await processSOAPResponse(response.data, "GetOperators");
    // Dispatch the result to the Redux store
    dispatch({ type: GET_OPERATORS, payload: result?.operatorsInfo });
 
    return result;
  } catch (error) {
    console.error("Error Response:", error.response?.data || error.message);
    toast.error(error.message || "Failed to fetch operators");
    return null;
  }
};

// export const getBusList = async () => {
//   try {
//     const response = await axios.post(
//       "http://localhost:5000/api/getBusList",
//       {
//         from_sourceID: 3,
//         to_sourceID: 5,
//         journeyDate: "2025-03-08",
//       },
//       { withCredentials: true }  // Add this
//     );

//     console.log("Bus List:", response.data);
//   } catch (error) {
//     console.error("CORS Error:", error.response?.data || error.message);
//   }
// };


// export const getBusList = async () => {
//   try {
//     const response = await fetch("http://localhost:5000/api/getBusList", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         from_sourceID: 3,
//         to_sourceID: 5,
//         journeyDate: "2025-03-08",
//       }),
//       credentials: "include",  // Allow cookies to be sent with the request
//     });

//     if (!response.ok) {
//       throw new Error(`HTTP error! Status: ${response.status}`);
//     }

//     const data = await response.json();
//     console.log("Bus List:", data);
//   } catch (error) {
//     console.error("CORS Error:", error.message);
//   }
// };
