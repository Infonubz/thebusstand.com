import axios from "axios";
import { XMLParser } from "fast-xml-parser";
import { toast } from "react-toastify";

const username = process.env.REACT_APP_ABHIBUS_USERNAME || "demo@test";
const password = process.env.REACT_APP_ABHIBUS_PASSWORD || "demo@abhibus";

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

    console.log("Parsed SOAP:", parsedSOAP); // Log the parsed SOAP response

    // Step 3: Extract the JSON string from the parsed response
    // Check if the response exists and then try to access GetStationsResult
    const getStationsResult =
      parsedSOAP["SOAP-ENV:Envelope"]?.["SOAP-ENV:Body"]?.[
        `ns1:${name}Response`
      ]?.[`ns1:${name}Result`]?.["#text"];
    console.log("Extracted GetStationsResult:", getStationsResult);

    // Ensure the jsonString is a valid string before trying to parse it
    if (getStationsResult) {
      // Check if it's a JSON string and parse it
      const jsonObject = JSON.parse(getStationsResult);
      console.log("Converted JSON Object:", jsonObject);
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

export const ViewTicketById = async (ticketID, setSpinning) => {
  setSpinning(true);
  const soapRequest = `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <tns:GetTicketDetailsV4 xmlns:tns="https://staging.abhibus.com/">
      <tns:username>${username}</tns:username>
      <tns:password>${password}</tns:password>
       <tns:ticketNo>${ticketID}</tns:ticketNo>
    </tns:GetTicketDetailsV4>
  </soap:Body>
</soap:Envelope>`;

  //   <tns:ticketNo>ABRS7354857</tns:ticketNo>
  const url = `https://staging.abhibus.com/abhiWebServer`;

  try {
    // Assuming you need a Basic Auth header with username and password
    const authHeader = `Basic ${btoa(`${username}:${password}`)}`;

    // Using await to wait for the response
    const response = await axios.post(url, soapRequest, {
      headers: {
        "Content-Type": "text/xml;charset=UTF-8",
        Authorization: authHeader,
        SOAPAction: "http://staging.abhibus.com/GetTicketDetailsV4",
      },
    });
    const result = await processSOAPResponse(
      response.data,
      "GetTicketDetailsV4"
    );
    setSpinning(false);

    // console.log([result.ticketInfo], "Responsesdsdsdsdsd Data");
    return result;
  } catch (err) {
    console.error(err, "Error in the response");
  }
};

export const PreCancelTicket = async (values) => {
  //   setSpinning(true);
  const soapRequest = `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <tns:PreCancellation xmlns:tns="https://staging.abhibus.com/">
       <tns:username>${username}</tns:username>
      <tns:password>${password}</tns:password>
       <tns:ticketNo>${values?.ticketNumber}</tns:ticketNo>
      <tns:phoneNum>${values?.phoneNumber}</tns:phoneNum>
    </tns:PreCancellation>
  </soap:Body>
</soap:Envelope>
`;

  //   <tns:ticketNo>ABRS7354857</tns:ticketNo>
  const url = `https://staging.abhibus.com/abhiWebServer`;

  try {
    // Assuming you need a Basic Auth header with username and password
    const authHeader = `Basic ${btoa(`${username}:${password}`)}`;

    // Using await to wait for the response
    const response = await axios.post(url, soapRequest, {
      headers: {
        "Content-Type": "text/xml;charset=UTF-8",
        Authorization: authHeader,
        SOAPAction: "http://staging.abhibus.com/PreCancellation",
      },
    });
    const result = await processSOAPResponse(response.data, "PreCancellation");

    // console.log([result.ticketInfo], "Responsesdsdsdsdsd Data");
    return result;
  } catch (err) {
    console.error(err, "Error in the response");
  }
};
export const CancelTicket = async (values, info) => {

  const cancelseat = values?.seat_numbers?.map((item) => item).join(",");
  const soapRequest = `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <tns:CancelTicket xmlns:tns="https://staging.abhibus.com/">
        <tns:username>${username}</tns:username>
      <tns:password>${password}</tns:password>
       <tns:ticketNo>${info?.ticketNumber}</tns:ticketNo>
      <tns:phoneNum>${info?.phoneNumber}</tns:phoneNum>
      <tns:operatorId>100</tns:operatorId>
      <tns:cancelSeats>${cancelseat}</tns:cancelSeats>
      <tns:partialCancellation>0</tns:partialCancellation>
    </tns:CancelTicket>
  </soap:Body>
</soap:Envelope>
`;

  //   <tns:ticketNo>ABRS7354857</tns:ticketNo>
  const url = `https://staging.abhibus.com/abhiWebServer`;

  try {
    // Assuming you need a Basic Auth header with username and password
    const authHeader = `Basic ${btoa(`${username}:${password}`)}`;

    // Using await to wait for the response
    const response = await axios.post(url, soapRequest, {
      headers: {
        "Content-Type": "text/xml;charset=UTF-8",
        Authorization: authHeader,
        SOAPAction: "http://staging.abhibus.com/CancelTicket",
      },
    });
    console.log(response,"yyyyyyyyyyyyyyy");
    
    const result = await processSOAPResponse(response.data, "CancelTicket");
    // console.log([result.ticketInfo], "Responsesdsdsdsdsd Data");
    return result;
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