import axios from "axios";
import { toast } from "react-toastify";
import { XMLParser } from "fast-xml-parser";
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

export const Abhibus_SeatLayout = async (BusDetails, dispatch) => {
  console.log(BusDetails, "busdatasyyyy");
  const soapRequest = `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <tns:GetServiceSeatingLayoutV5 xmlns:tns="${abhibuscollection}">
      <tns:username>${username}</tns:username>
      <tns:password>${password}</tns:password>
      <tns:operatorId>${BusDetails?.operatorId}</tns:operatorId>
      <tns:serviceId>${BusDetails?.Service_key}</tns:serviceId>
      <tns:sourceStationId>${BusDetails?.Source_ID}</tns:sourceStationId>
      <tns:destinationStationId>${
        BusDetails?.Destination_ID
      }</tns:destinationStationId>
      <tns:journeyDate>${dayjs(BusDetails?.BUS_START_DATE).format(
        "YYYY-MM-DD"
      )}</tns:journeyDate>
      <tns:layoutId>${BusDetails?.layout_id}</tns:layoutId>
      <tns:seatFare>${BusDetails?.Fare}</tns:seatFare>
      <tns:isSingleLady>0</tns:isSingleLady>
      <tns:concessionId>0</tns:concessionId>
    </tns:GetServiceSeatingLayoutV5>
  </soap:Body>
</soap:Envelope>
`;
  const url = `${abhibusurl}abhiWebServer`;

  try {
    const authHeader = `Basic ${btoa(`${username}:${password}`)}`;

    console.log("Request Headers:", {
      "Content-Type": "text/xml;charset=UTF-8",
      Authorization: authHeader,
      SOAPAction: `${abhibusurl}/GetServiceSeatingLayoutV5`,
    });

    console.log("SOAP Request Body:", soapRequest);
    const response = await axios({
      method: "post",
      url,
      data: soapRequest,
      headers: {
        "Content-Type": "text/xml;charset=UTF-8",
        Authorization: authHeader,
        SOAPAction: `${abhibusurl}/GetServiceSeatingLayoutV5`, // Ensure quotes if required
      },
    });

    console.log("SOAP Response:", response.data);
    const result = await processSOAPResponse(
      response.data,
      "GetServiceSeatingLayoutV5"
    );
    console.log(result, "resultresultresultdddresultresultresult");
    if (result?.status === "fail") {
      toast.error(`${result?.status} - ${result?.message}`);
    }

    return result;
  } catch (error) {
    console.error("Error Response:", error.response?.data || error.message);
    toast.error(error);
    return null;
  }
};

export const Abhibus_SeatBlocked = async (
  BusDetails,
  selectedSeats1,
  travelerDetails,
  values,
  selectedRoutes,
  emailInput,
  mobileInput,
  selectedseatprice
) => {
  // const namesList = travelerDetails?.filter((item) => {
  //   return item?.user_name;
  // });
  // const genderList = travelerDetails?.filter((item) => {
  //   return item?.gender;
  // });
  // const ageList = travelerDetails?.filter((item) => {
  //   return item?.age;
  // });
  // const seatList = travelerDetails?.filter((item) => {
  //   return item?.seat;
  // });
  // const namesList = travelerDetails?.map(item => item.user_name).join(", ");
  const LuxuryFind = (type) =>
    type.toLowerCase().includes("volvo") ||
    type.toLowerCase().includes("mercedes benz") ||
    type.toLowerCase().includes("washroom") ||
    type.toLowerCase().includes("bharatBenz") ||
    type.toLowerCase().includes("luxury");
  console.log(selectedSeats1, "selectedSeats1selectedSeats1");

  const seatpriceList = selectedseatprice?.map((item) => item).join(", ");
  const seatFareList = Object.values(selectedSeats1)
    .map((item) => item.price)
    .filter((price) => price)
    .join(",");
  const namesList = Object.values(travelerDetails)
    .map((item) => item.user_name)
    .filter((name) => name)
    .join(",");
  const genderList = Object.values(travelerDetails)
    .map((item) => (item.gender === "male" ? "M" : "F")) // Convert to M or F
    .filter((gender) => gender) // Remove undefined/null values
    .join(",");

  console.log(genderList, "tfvgfgghhhhhhhhhhhhh");

  const ageList = Object.values(travelerDetails)
    .map((item) => item.age)
    .filter((name) => name)
    .join(",");
  const seatList = Object.values(travelerDetails)
    .map((item) => item.seat)
    .filter((name) => name)
    .join(",");
  const seatTypeList = Object.values(selectedSeats1)
    .map((item) => item.type)
    .filter((name) => name)
    .join(",");
  const seatTypeIdList = Object.values(selectedSeats1)
    .map((item) => item.typeId)
    .filter((name) => name)
    .join(",");
  const seatTaxList = Object.values(selectedSeats1)
    .map((item) => item.tax.split(",")[0])
    .filter((tax) => tax)
    .join(",");
  const isAcType = LuxuryFind(BusDetails.Bus_Type_Name) === true ? "yes" : "no";
  console.log(values, "dwewcwcwedwwedwe");
  const soapRequest = `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <tns:BlockTicketsV4 xmlns:tns="${abhibuscollection}">
   <tns:username>${username}</tns:username>
      <tns:password>${password}</tns:password>
      <tns:operatorId>${BusDetails?.operatorId}</tns:operatorId>
      <tns:serviceId>${BusDetails?.Service_key}</tns:serviceId>
      <tns:sourceStationId>${BusDetails?.Source_ID}</tns:sourceStationId>
      <tns:destinationStationId>${
        BusDetails?.Destination_ID
      }</tns:destinationStationId>
      <tns:journeyDate>${dayjs(BusDetails?.BUS_START_DATE).format(
        "YYYY-MM-DD"
      )}</tns:journeyDate>
      <tns:layoutId>${BusDetails?.layout_id}</tns:layoutId>
      <tns:boardingPointID>${selectedRoutes?.dep_route_id}</tns:boardingPointID>
      <tns:droppingPointID>${selectedRoutes?.arr_route_id}</tns:droppingPointID>
      <tns:address>${values?.address}</tns:address>
      <tns:city>${values?.city}</tns:city>
      <tns:postalCode>${values?.pin_code}</tns:postalCode>
      <tns:state>${values?.state}</tns:state>
      <tns:gstin>string</tns:gstin>
      <tns:contactNumber>${mobileInput}</tns:contactNumber>
      <tns:emailId>${emailInput}</tns:emailId>
      <tns:namesList>${namesList}</tns:namesList>
      <tns:gendersList>${genderList}</tns:gendersList>
      <tns:ageList>${ageList}</tns:ageList>
      <tns:seatNumbersList>${seatList}</tns:seatNumbersList>
      <tns:seatFareList>${seatFareList}</tns:seatFareList>
      <tns:seatTypesList>${seatTypeList}</tns:seatTypesList>
      <tns:seatTypeIds>${seatTypeIdList}</tns:seatTypeIds>
      <tns:isAcSeat>${isAcType}</tns:isAcSeat>
      <tns:serviceTaxList>${seatTaxList}</tns:serviceTaxList>
      <tns:seatLayoutUniqueId>${BusDetails?.layout_id}</tns:seatLayoutUniqueId>
      <tns:isSingleLady>0</tns:isSingleLady>
      <tns:concessionId>0</tns:concessionId>
      <tns:additionalInfoLabel>string</tns:additionalInfoLabel>
    </tns:BlockTicketsV4>
  </soap:Body>
</soap:Envelope>
`;
  const url = `${abhibusurl}abhiWebServer`;

  try {
    const authHeader = `Basic ${btoa(`${username}:${password}`)}`;

    console.log("Request Headers:", {
      "Content-Type": "text/xml;charset=UTF-8",
      Authorization: authHeader,
      SOAPAction: `${abhibusurl}/BlockTicketsV4`,
    });

    console.log("SOAP Request Body:", soapRequest);
    const response = await axios({
      method: "post",
      url,
      data: soapRequest,
      headers: {
        "Content-Type": "text/xml;charset=UTF-8",
        Authorization: authHeader,
        SOAPAction: `${abhibusurl}/BlockTicketsV4`, // Ensure quotes if required
      },
    });

    console.log("SOAP Response:", response.data);
    const result = await processSOAPResponse(response.data, "BlockTicketsV4");
    console.log(result, "resultresultresultdddresultresultresult");
    if (result?.status === "fail") {
      toast.error(`${result?.status} - ${result?.message}`);
    }

    return result;
  } catch (error) {
    console.error("Error Response:", error.response?.data || error.message);
    toast.error(error);
    return null;
  }
};

export const Abhibus_SeatConfirmed = async (BusDetails, refno) => {
  const soapRequest = `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <tns:ConfirmationSeatBooking xmlns:tns="${abhibuscollection}">
    <tns:username>${username}</tns:username>
      <tns:password>${password}</tns:password>
      <tns:operatorId>${BusDetails?.operatorId}</tns:operatorId>
 <tns:journeyDate>${dayjs(BusDetails?.BUS_START_DATE).format(
   "YYYY-MM-DD"
 )}</tns:journeyDate>
       <tns:referenceNo>${refno}</tns:referenceNo>
    </tns:ConfirmationSeatBooking>
  </soap:Body>
</soap:Envelope>
`;
  const url = `${abhibusurl}abhiWebServer`;

  try {
    const authHeader = `Basic ${btoa(`${username}:${password}`)}`;

    console.log("Request Headers:", {
      "Content-Type": "text/xml;charset=UTF-8",
      Authorization: authHeader,
      SOAPAction: `${abhibusurl}/ConfirmationSeatBooking`,
    });

    console.log("SOAP Request Body:", soapRequest);
    const response = await axios({
      method: "post",
      url,
      data: soapRequest,
      headers: {
        "Content-Type": "text/xml;charset=UTF-8",
        Authorization: authHeader,
        SOAPAction: `${abhibusurl}/ConfirmationSeatBooking`, // Ensure quotes if required
      },
    });

    console.log("SOAP Response:", response.data);
    const result = await processSOAPResponse(
      response.data,
      "ConfirmationSeatBooking"
    );
    console.log(result, "resultresultresultdddresultresultresult");
    if (result?.status === "fail") {
      toast.error(`${result?.status} - ${result?.message}`);
    }

    return result;
  } catch (error) {
    console.error("Error Response:", error.response?.data || error.message);
    toast.error(error);
    return null;
  }
};
export const Abhibus_GetFareInfo = async (
  adultCount,
  childCount,
  confirmRefNo
) => {
  const soapRequest = `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <tns:GetFaresInfo xmlns:tns="${abhibuscollection}">
       <tns:username>${username}</tns:username>
      <tns:password>${password}</tns:password>
      <tns:adultSeatNos>${adultCount}</tns:adultSeatNos>
      <tns:childSeatNos>${childCount}</tns:childSeatNos>
      <tns:referenceNo>${confirmRefNo}</tns:referenceNo>
    </tns:GetFaresInfo>
  </soap:Body>
</soap:Envelope>
`;
  const url = `${abhibusurl}abhiWebServer`;

  try {
    const authHeader = `Basic ${btoa(`${username}:${password}`)}`;

    console.log("Request Headers:", {
      "Content-Type": "text/xml;charset=UTF-8",
      Authorization: authHeader,
      SOAPAction: `${abhibusurl}/GetFaresInfo`,
    });

    console.log("SOAP Request Body:", soapRequest);
    const response = await axios({
      method: "post",
      url,
      data: soapRequest,
      headers: {
        "Content-Type": "text/xml;charset=UTF-8",
        Authorization: authHeader,
        SOAPAction: `${abhibusurl}/GetFaresInfo`, // Ensure quotes if required
      },
    });

    console.log("SOAP Response:", response.data);
    const result = await processSOAPResponse(response.data, "GetFaresInfo");
    console.log(result, "resultresultresultdddresultresultresult");
    if (result?.status === "fail") {
      toast.error(`${result?.status} - ${result?.message}`);
    }

    return result;
  } catch (error) {
    console.error("Error Response:", error.response?.data || error.message);
    toast.error(error);
    return null;
  }
};
