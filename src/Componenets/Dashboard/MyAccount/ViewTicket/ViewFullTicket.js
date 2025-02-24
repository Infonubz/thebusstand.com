import { Skeleton, Tooltip } from "antd";
import dayjs from "dayjs";
import moment from "moment";
import { useEffect, useRef, useState } from "react";
import Barcode from "react-barcode";
import { FiDownload } from "react-icons/fi";
import Logo from "../../../../Assets/Logo/tbs_logo.png";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { calculateDiscountedFare } from "../../../Common/Common-Functions/TBS-Discount-Fare";
import { useSelector } from "react-redux";
import { RatingFeedBack } from "../../../Common/Rating&FeedBack/Ratings&Feedback.js";
import ModalPopup from "../../../Common/Modal/Modal.js";

const ViewFullTicket = ({ ticketDetails, droppingDate, ticketnumber }) => {
  console.log(droppingDate, "droppingDate");
  const ticketlist = useSelector((state) => state?.get_ticket_detail);
  const tbs_discount = useSelector((state) => state?.live_per);

  console.log(ticketlist, "tickckckckckc");
  const componentRef = useRef();
  const colorcode = {
    theme: "#1F4B7F",
  };
  function generateRandomId(prefix, length) {
    return prefix;
  }

  const calculateDuration = (startTime, endTime) => {
    // Parse start and end times using Moment.js
    const start = moment(startTime, "hh:mm A"); // 12-hour format (e.g., "08:20 PM")
    const end = moment(endTime, "hh:mm A"); // 12-hour format (e.g., "04:00 AM")

    // If the end time is before the start time, add 1 day to the end time
    if (end.isBefore(start)) {
      end.add(1, "days"); // Add a day to end time
    }

    // Calculate the duration between the two times
    const duration = moment.duration(end.diff(start));

    // Get the hours and minutes from the duration
    const hours = duration.hours();
    const minutes = duration.minutes();

    return `${hours}h ${minutes}m`;
  };

  const LuxuryFind = (type) =>
    type?.toLowerCase().includes("volvo") ||
    type?.toLowerCase().includes("mercedes benz") ||
    type?.toLowerCase().includes("washroom") ||
    type?.toLowerCase().includes("bharatBenz") ||
    type?.toLowerCase().includes("luxury");

  const downloadPDF = () => {
    // setLoader(true);
    const capture = componentRef.current;
    if (capture) {
      html2canvas(capture, {
        scale: 2, // Higher scale for better image quality
        useCORS: true, // For cross-origin resources (images from other domains)
        logging: true, // Optional, logs any warnings/errors
      }).then((canvas) => {
        const imgData = canvas.toDataURL("image/png"); // Image data URL

        const doc = new jsPDF("p", "mm", "a4");
        // Calculate the appropriate size of the image in the PDF
        const componentWidth = doc.internal.pageSize.getWidth();
        const componentHeight = doc.internal.pageSize.getHeight();

        // Add the image to the PDF with the correct dimensions
        doc.addImage(imgData, "PNG", 0, 0, componentWidth, componentHeight);

        // Save the PDF
        doc.save("receipt.pdf");
        //setLoader(false); // Stop loader after PDF is saved
      });
    } else {
      console.error("Element not found");
      //   setLoader(false);
    }
  };

  const handleDownloadClick = () => {
    const capture = componentRef.current;
    if (capture) {
      downloadPDF();
    } else {
      console.error("Element not found on button click.");
    }
  };
  const formatDate = (inputDate) => {
    // Extract parts from input
    const regex = /(\d{1,2})[a-z]{2} (\w{3}) (\d{4})/;
    const match = inputDate?.match(regex);

    if (!match) return "Invalid Date Format";

    const [, day, monthStr, year] = match;

    // Month mapping
    const monthMap = {
      Jan: "01",
      Feb: "02",
      Mar: "03",
      Apr: "04",
      May: "05",
      Jun: "06",
      Jul: "07",
      Aug: "08",
      Sep: "09",
      Oct: "10",
      Nov: "11",
      Dec: "12",
    };

    const month = monthMap[monthStr];

    return `${year}-${month}-${day.padStart(2, "0")}`;
  };
  const [ratingModal, setRatingModal] = useState(false);

  const closeRatingModal = () => {
    setRatingModal(false);
  };

  useEffect(() => {
    setTimeout(() => {
      if (ticketnumber != null) {
        setRatingModal(true);
      }
    }, [5000]);
  }, []);

  return (
    <div className="p-[2.5vw] md:p-[1.5vw] flex flex-col gap-y-[3vw] md:gap-y-[1.60vw]">
      <div
        className={`rounded-[1vw] ${
          LuxuryFind(ticketDetails?.ticketInfo?.bustype) === true
            ? "bg-[#FFEFCE]"
            : "bg-white"
        }`}
      >
        {/* {ticketDetails.map((item)=>( */}
        <div
          ref={componentRef}
          id="capture"
          className={`h-auto w-full rounded-[1vw] relative border-[.2vw]  ${
            LuxuryFind(ticketDetails?.ticketInfo?.bustype) === true
              ? "border-[#393939]"
              : "border-[#1F4B7F]"
          }`}
          style={{ boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)" }}
        >
          <div
            className="h-[3vw] w-full rounded-t-[0.5vw] flex justify-between items-center px-[1vw]"
            style={{
              backgroundColor:
                LuxuryFind(ticketDetails?.ticketInfo?.bustype) === true
                  ? "#393939"
                  : colorcode.theme,
            }}
          >
            <label className="text-white text-[1.1vw] font-semibold">
              {/* {`Booking Id : ${bookingId?.Booking_Id}`} */}
              {`Booking Id : ${ticketDetails?.ticketInfo?.Ticket_no}`}
            </label>
            <label className="text-white text-[1.1vw] font-semibold">
              {/* {`Bus Partner Id : ${generateRandomId("CHEN", 12)}`} */}
              {`Bus Operator PNR : ${ticketDetails?.ticketInfo?.operator_pnr}`}
            </label>
          </div>
          <span className="absolute md:block hidden top-[4.1vw] left-[12.5vw]">
            <div className="h-full py-[0.5vw]">
              <svg
                className="md:h-[14.6vw] md:w-[3.76vw]"
                viewBox="0 0 58 233"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="24.7695"
                  y="110.186"
                  width="7.77032"
                  height="7.77032"
                  rx="3.88516"
                  fill={
                    LuxuryFind(ticketDetails?.ticketInfo?.bustype) === true
                      ? "#393939"
                      : "#1F4B7F"
                  }
                  stroke-width="2.30622"
                />
                <mask id="path-2-inside-1_6794_2554" fill="white">
                  {" "}
                  <path d="M28.0771 117.016H29.2303V203.374H28.0771V117.016Z" />{" "}
                </mask>
                <path
                  d="M29.8068 203.374V201.647H28.6537V203.374H29.8068ZM29.8068 199.344V195.89H28.6537V199.344H29.8068ZM29.8068 193.587V190.133H28.6537V193.587H29.8068ZM29.8068 187.83V184.375H28.6537V187.83H29.8068ZM29.8068 182.072V178.618H28.6537V182.072H29.8068ZM29.8068 176.315V172.861H28.6537V176.315H29.8068ZM29.8068 170.558V167.104H28.6537V170.558H29.8068ZM29.8068 164.801V161.346H28.6537V164.801H29.8068ZM29.8068 159.043V155.589H28.6537V159.043H29.8068ZM29.8068 153.286V149.832H28.6537V153.286H29.8068ZM29.8068 147.529V144.075H28.6537V147.529H29.8068ZM29.8068 141.772V138.317H28.6537V141.772H29.8068ZM29.8068 136.014V132.56H28.6537V136.014H29.8068ZM29.8068 130.257V126.803H28.6537V130.257H29.8068ZM29.8068 124.5V121.046H28.6537V124.5H29.8068ZM29.8068 118.743V117.016H28.6537V118.743H29.8068ZM30.3834 203.374V201.647H28.0771V203.374H30.3834ZM30.3834 199.344V195.89H28.0771V199.344H30.3834ZM30.3834 193.587V190.133H28.0771V193.587H30.3834ZM30.3834 187.83V184.375H28.0771V187.83H30.3834ZM30.3834 182.072V178.618H28.0771V182.072H30.3834ZM30.3834 176.315V172.861H28.0771V176.315H30.3834ZM30.3834 170.558V167.104H28.0771V170.558H30.3834ZM30.3834 164.801V161.346H28.0771V164.801H30.3834ZM30.3834 159.043V155.589H28.0771V159.043H30.3834ZM30.3834 153.286V149.832H28.0771V153.286H30.3834ZM30.3834 147.529V144.075H28.0771V147.529H30.3834ZM30.3834 141.772V138.317H28.0771V141.772H30.3834ZM30.3834 136.014V132.56H28.0771V136.014H30.3834ZM30.3834 130.257V126.803H28.0771V130.257H30.3834ZM30.3834 124.5V121.046H28.0771V124.5H30.3834ZM30.3834 118.743V117.016H28.0771V118.743H30.3834Z"
                  fill={
                    LuxuryFind(ticketDetails?.ticketInfo?.bustype) === true
                      ? "#393939"
                      : "#1F4B7F"
                  }
                  mask="url(#path-2-inside-1_6794_2554)"
                />
                <line
                  x1="11.3012"
                  y1="232.748"
                  x2="45.4302"
                  y2="232.748"
                  stroke={
                    LuxuryFind(ticketDetails?.ticketInfo?.bustype) === true
                      ? "#393939"
                      : "#1F4B7F"
                  }
                  stroke-width="0.2"
                />
                <path
                  d="M41.7225 208.675V207.454H43.0084C43.1814 207.454 43.3228 207.31 43.3228 207.133C43.3228 205.061 41.6721 202.374 39.644 202.374H16.8165C14.7884 202.374 13.1376 205.061 13.1376 207.133C13.1376 207.31 13.276 207.454 13.452 207.454H14.7349V208.672C13.8294 208.826 13.1376 209.632 13.1376 210.599V221.927C13.1376 222.897 13.8294 223.7 14.7349 223.855V232.378C14.7349 232.554 14.8765 232.699 15.0493 232.699C15.2254 232.699 15.3638 232.554 15.3638 232.378V223.855C16.2693 223.7 16.9642 222.897 16.9642 221.927V219.919H18.6873V220.353C18.6873 221.516 19.6117 222.46 20.7499 222.46H35.7105C36.8456 222.46 37.77 221.516 37.77 220.353V219.919H39.4962V221.927C39.4962 222.897 40.1817 223.7 41.0935 223.855V232.378C41.0935 232.554 41.2351 232.699 41.4079 232.699C41.584 232.699 41.7223 232.554 41.7223 232.378V223.855C42.6279 223.7 43.3228 222.897 43.3228 221.927V219.379C43.3228 219.203 43.1813 219.058 43.0084 219.058C42.8354 219.058 42.694 219.203 42.694 219.379V221.927C42.694 222.65 42.1186 223.238 41.4111 223.241H41.408C41.059 223.241 40.7383 223.096 40.5056 222.859C40.2729 222.624 40.1251 222.296 40.1251 221.927V210.599C40.1251 209.876 40.7005 209.288 41.408 209.288C41.7507 209.288 42.0746 209.427 42.3167 209.674C42.5619 209.921 42.694 210.249 42.694 210.599V219.773C42.694 219.95 42.8356 220.094 43.0084 220.094C43.1814 220.094 43.3228 219.95 43.3228 219.773V210.599C43.3228 210.079 43.1247 209.587 42.7632 209.218C42.4771 208.925 42.1155 208.739 41.7225 208.675ZM16.3354 221.927C16.3354 222.653 15.76 223.241 15.0494 223.241C14.3419 223.241 13.7665 222.653 13.7665 221.927V210.599C13.7665 209.876 14.3419 209.288 15.0494 209.288C15.76 209.288 16.3354 209.876 16.3354 210.599V221.927ZM18.6873 219.277H16.9643V213.25H18.6873V219.277ZM33.3083 219.334H23.1491C22.9762 219.334 22.8347 219.193 22.8347 219.013C22.8347 218.836 22.9762 218.692 23.1491 218.692H33.3083C33.4844 218.692 33.6227 218.836 33.6227 219.013C33.6228 219.193 33.4844 219.334 33.3083 219.334ZM33.3083 216.584H23.1491C22.9762 216.584 22.8347 216.443 22.8347 216.263C22.8347 216.086 22.9762 215.942 23.1491 215.942H33.3083C33.4844 215.942 33.6227 216.087 33.6227 216.263C33.6228 216.443 33.4844 216.584 33.3083 216.584ZM33.3083 213.834H23.1491C22.9762 213.834 22.8347 213.69 22.8347 213.513C22.8347 213.336 22.9762 213.192 23.1491 213.192H33.3083C33.4844 213.192 33.6227 213.336 33.6227 213.513C33.6228 213.69 33.4844 213.834 33.3083 213.834ZM39.4963 219.277H37.7732V213.25H39.4963V219.277ZM41.0936 208.675C40.188 208.829 39.4963 209.632 39.4963 210.599V212.607H37.7701V212.173C37.7701 211.014 36.8457 210.069 35.7106 210.069H20.75C19.6117 210.069 18.6873 211.014 18.6873 212.173V212.607H16.9643V210.599C16.9643 209.632 16.2694 208.826 15.3638 208.672V207.454H41.0936V208.675Z"
                  fill={
                    LuxuryFind(ticketDetails?.ticketInfo?.bustype) === true
                      ? "#393939"
                      : "#1F4B7F"
                  }
                />
                <path
                  d="M16.1612 221.961V210.605C16.1612 210.245 15.9867 209.906 15.6933 209.697C15.3059 209.42 14.7849 209.42 14.3975 209.696C14.1036 209.906 13.9296 210.245 13.9307 210.606L13.9633 221.963C13.9643 222.302 14.1223 222.622 14.3908 222.83C14.7864 223.136 15.3391 223.136 15.7346 222.83C16.0037 222.622 16.1612 222.301 16.1612 221.961Z"
                  fill={
                    LuxuryFind(ticketDetails?.ticketInfo?.bustype) === true
                      ? "#393939"
                      : "#1F4B7F"
                  }
                  stroke={
                    LuxuryFind(ticketDetails?.ticketInfo?.bustype) === true
                      ? "#393939"
                      : "#1F4B7F"
                  }
                  stroke-width="0.2"
                />
                <path
                  d="M42.5103 221.975V210.591C42.5103 210.239 42.3415 209.908 42.0569 209.702C41.6728 209.423 41.1524 209.423 40.7683 209.701C40.4833 209.908 40.315 210.24 40.316 210.592L40.3481 221.977C40.3491 222.308 40.5018 222.62 40.762 222.825C41.1537 223.132 41.7057 223.133 42.0974 222.825C42.3581 222.62 42.5103 222.307 42.5103 221.975Z"
                  fill={
                    LuxuryFind(ticketDetails?.ticketInfo?.bustype) === true
                      ? "#393939"
                      : "#1F4B7F"
                  }
                  stroke={
                    LuxuryFind(ticketDetails?.ticketInfo?.bustype) === true
                      ? "#393939"
                      : "#1F4B7F"
                  }
                  stroke-width="0.2"
                />
                <path
                  d="M36.5847 224.381H19.8759C18.7252 224.381 17.7881 225.336 17.7881 226.511C17.7881 227.687 18.7252 228.645 19.8759 228.645H20.2218V232.378C20.2218 232.554 20.3634 232.699 20.5362 232.699H22.4637C22.6366 232.699 22.7781 232.554 22.7781 232.378V228.645H33.6825V232.378C33.6825 232.554 33.8241 232.699 33.997 232.699H35.9213C36.0942 232.699 36.2357 232.554 36.2357 232.378V228.645H36.5847C37.7356 228.645 38.6694 227.687 38.6694 226.511C38.6694 225.336 37.7356 224.381 36.5847 224.381ZM22.1493 232.056V228.756V228.645V232.056ZM36.5847 226.511C35.7829 226.511 19.8759 226.511 19.8759 226.511C19.071 226.511 19.8759 226.511 18.417 226.511C18.417 225.692 19.071 225.024 19.8759 225.024H36.5847C37.3865 225.024 38.0405 225.692 38.0405 226.511C36.7628 226.511 37.3865 226.511 36.5847 226.511Z"
                  fill={
                    LuxuryFind(ticketDetails?.ticketInfo?.bustype) === true
                      ? "#393939"
                      : "#1F4B7F"
                  }
                />
                <mask id="path-9-inside-2_6794_2554" fill="white">
                  {" "}
                  <path d="M28.01 26.7649H29.1631V108.636H28.01V26.7649Z" />
                </mask>
                <path
                  d="M29.7396 108.636V106.881H28.5865V108.636H29.7396ZM29.7396 104.542V101.033H28.5865V104.542H29.7396ZM29.7396 98.6942V95.1855H28.5865V98.6942H29.7396ZM29.7396 92.8463V89.3376H28.5865V92.8463H29.7396ZM29.7396 86.9984V83.4897H28.5865V86.9984H29.7396ZM29.7396 81.1505V77.6417H28.5865V81.1505H29.7396ZM29.7396 75.3026V71.7938H28.5865V75.3026H29.7396ZM29.7396 69.4547V65.9459H28.5865V69.4547H29.7396ZM29.7396 63.6068V60.098H28.5865V63.6068H29.7396ZM29.7396 57.7588V54.2501H28.5865V57.7588H29.7396ZM29.7396 51.9109V48.4022H28.5865V51.9109H29.7396ZM29.7396 46.063V42.5543H28.5865V46.063H29.7396ZM29.7396 40.2151V36.7064H28.5865V40.2151H29.7396ZM29.7396 34.3672V30.8584H28.5865V34.3672H29.7396ZM29.7396 28.5193V26.7649H28.5865V28.5193H29.7396ZM30.3162 108.636V106.881H28.01V108.636H30.3162ZM30.3162 104.542V101.033H28.01V104.542H30.3162ZM30.3162 98.6942V95.1855H28.01V98.6942H30.3162ZM30.3162 92.8463V89.3376H28.01V92.8463H30.3162ZM30.3162 86.9984V83.4897H28.01V86.9984H30.3162ZM30.3162 81.1505V77.6417H28.01V81.1505H30.3162ZM30.3162 75.3026V71.7938H28.01V75.3026H30.3162ZM30.3162 69.4547V65.9459H28.01V69.4547H30.3162ZM30.3162 63.6068V60.098H28.01V63.6068H30.3162ZM30.3162 57.7588V54.2501H28.01V57.7588H30.3162ZM30.3162 51.9109V48.4022H28.01V51.9109H30.3162ZM30.3162 46.063V42.5543H28.01V46.063H30.3162ZM30.3162 40.2151V36.7064H28.01V40.2151H30.3162ZM30.3162 34.3672V30.8584H28.01V34.3672H30.3162ZM30.3162 28.5193V26.7649H28.01V28.5193H30.3162Z"
                  fill={
                    LuxuryFind(ticketDetails?.ticketInfo?.bustype) === true
                      ? "#393939"
                      : "#1F4B7F"
                  }
                  mask="url(#path-9-inside-2_6794_2554)"
                />
                <g clip-path="url(#clip0_6794_2554)">
                  <path
                    d="M14.4654 3.70703C13.98 3.70703 13.5865 4.10055 13.5865 4.58594V11.5586C13.5865 12.044 13.98 12.4375 14.4654 12.4375C14.9508 12.4375 16.945 11.6491 16.945 11.1637L15.3443 5.46484H28.5865V3.70703H14.4654Z"
                    fill={
                      LuxuryFind(ticketDetails?.ticketInfo?.bustype) === true
                        ? "#393939"
                        : "#1F4B7F"
                    }
                  />
                  <path
                    d="M42.7076 3.70703H28.5865V5.46484H41.8287L40.2712 11.0776C40.2712 11.563 42.2222 12.4961 42.7076 12.4961C43.193 12.4961 43.5865 12.1026 43.5865 11.6172V4.58594C43.5865 4.10055 43.193 3.70703 42.7076 3.70703Z"
                    fill={
                      LuxuryFind(ticketDetails?.ticketInfo?.bustype) === true
                        ? "#393939"
                        : "#1F4B7F"
                    }
                  />
                  <path
                    d="M24.192 26.3241V29.2538C24.192 29.739 23.7982 30.1327 23.313 30.1327H19.7974C19.3123 30.1327 18.9185 29.739 18.9185 29.2538V26.0259C19.2578 26.2157 19.6486 26.3241 20.0646 26.3241H24.192Z"
                    fill={
                      LuxuryFind(ticketDetails?.ticketInfo?.bustype) === true
                        ? "#393939"
                        : "#1F4B7F"
                    }
                  />
                  <path
                    d="M38.2545 26.0259V29.2538C38.2545 29.739 37.8607 30.1327 37.3755 30.1327H33.8599C33.3748 30.1327 32.981 29.739 32.981 29.2538V26.3241H37.1084C37.5244 26.3241 37.9152 26.2157 38.2545 26.0259Z"
                    fill={
                      LuxuryFind(ticketDetails?.ticketInfo?.bustype) === true
                        ? "#393939"
                        : "#1F4B7F"
                    }
                  />
                  <path
                    d="M40.0123 2.76953V3.70703L38.8404 11.198C40.368 20.8654 40.0205 17.0927 39.8775 21.3438L39.3091 22.2227L39.7914 23.1016L39.7416 24.11C39.6724 25.5156 38.5158 26.6172 37.1084 26.6172H20.0646C18.6572 26.6172 17.5005 25.5156 17.4314 24.11L17.3793 23.043L17.8052 22.1641L17.2925 21.2852C17.2105 19.5058 17.1607 18.8219 17.1607 18.4141L18.3326 11.198L17.1607 3.70703V2.76953C17.1607 1.31582 18.3437 0.132812 19.7974 0.132812H37.3755C38.8293 0.132812 40.0123 1.31582 40.0123 2.76953Z"
                    fill={
                      LuxuryFind(ticketDetails?.ticketInfo?.bustype) === true
                        ? "#393939"
                        : "#1F4B7F"
                    }
                  />
                  <path
                    d="M39.8775 21.3438L39.3091 22.2227L39.7914 23.1016L39.7416 24.11C39.6724 25.5156 38.5158 26.6172 37.1084 26.6172H28.5865V0.132812H37.3756C38.8293 0.132812 40.0123 1.31582 40.0123 2.76953V3.70703L38.8404 11.1982C39.6449 16.2883 39.9291 17.6523 39.9976 18.4234C40.0586 19.1172 39.9455 19.3311 39.8775 21.3438Z"
                    fill={
                      LuxuryFind(ticketDetails?.ticketInfo?.bustype) === true
                        ? "#393939"
                        : "#1F4B7F"
                    }
                  />
                  <path
                    d="M40.0123 3.70703V18.4205C32.463 19.8572 24.7105 19.8572 17.1607 18.4205V3.70703H40.0123Z"
                    fill={
                      LuxuryFind(ticketDetails?.ticketInfo?.bustype) === true
                        ? "#393939"
                        : "#1F4B7F"
                    }
                  />
                  <path
                    d="M40.0123 3.70703V18.4205C40.0076 18.4217 40.0023 18.4223 39.9976 18.4234C36.2277 19.14 32.4074 19.498 28.5865 19.498V3.70703H40.0123Z"
                    fill={
                      LuxuryFind(ticketDetails?.ticketInfo?.bustype) === true
                        ? "#393939"
                        : "#1F4B7F"
                    }
                  />
                  <path
                    d="M22.4341 22.1641C22.4341 22.6492 22.0404 23.043 21.5552 23.043H17.3793L17.2925 21.2852H21.5552C22.0404 21.2852 22.4341 21.6789 22.4341 22.1641Z"
                    fill={
                      LuxuryFind(ticketDetails?.ticketInfo?.bustype) === true
                        ? "#393939"
                        : "#1F4B7F"
                    }
                  />
                  <path
                    d="M39.8775 21.3438L39.7914 23.1016H35.6177C35.1326 23.1016 34.7388 22.7078 34.7388 22.2227C34.7388 21.7375 35.1326 21.3438 35.6177 21.3438H39.8775Z"
                    fill={
                      LuxuryFind(ticketDetails?.ticketInfo?.bustype) === true
                        ? "#393939"
                        : "#1F4B7F"
                    }
                  />
                  <path
                    d="M32.0435 21.2852H25.0709C24.5855 21.2852 24.192 21.6787 24.192 22.1641V23.8963C24.192 24.3805 24.5835 24.7735 25.0676 24.7752L32.0403 24.8008H32.0435C32.276 24.8008 32.4991 24.7087 32.6639 24.5445C32.8294 24.3796 32.9224 24.1555 32.9224 23.9219V22.1641C32.9224 21.6787 32.5289 21.2852 32.0435 21.2852Z"
                    fill={
                      LuxuryFind(ticketDetails?.ticketInfo?.bustype) === true
                        ? "#393939"
                        : "#1F4B7F"
                    }
                  />
                  <path
                    d="M32.9224 22.1641V23.9219C32.9224 24.1557 32.8293 24.3795 32.664 24.5447C32.4994 24.7088 32.2761 24.8008 32.0435 24.8008H32.0406L28.5865 24.7879V21.2852H32.0435C32.5287 21.2852 32.9224 21.6789 32.9224 22.1641Z"
                    fill={
                      LuxuryFind(ticketDetails?.ticketInfo?.bustype) === true
                        ? "#393939"
                        : "#1F4B7F"
                    }
                  />
                </g>
                <defs>
                  {" "}
                  <clipPath id="clip0_6794_2554">
                    <rect
                      width="30"
                      height="30"
                      fill="white"
                      transform="translate(13.5865 0.132812)"
                    />
                  </clipPath>{" "}
                </defs>
              </svg>
            </div>
          </span>
          <div className="px-[1vw] py-[1vw] relative">
            <div className="grid grid-cols-10 w-full h-[18vw]">
              <div className="col-span-3 w-[70%] h-full flex">
                <div className="w-[50vw] h-full items-center justify-center flex flex-col">
                  <div className="h-[60%] flex justify-center items-center">
                    {/* {" "}
                                        {ticketDetails?.logos != null && (
                                            <img
                                                //   src={`${apiUrlimage}${ticketDetails.logos}`}
                                               src={Logo}
                                                alt="logos"
                                                className={`w-[6vw] h-[6vw] rounded-full bg-white  ${LuxuryFind(ticketDetails?.ticketInfo?.bustype) === true
                                                        ? "shadow-lg shadow-[rgba(255, 238, 201, 0.9)]"
                                                        : "shadow-lg shadow-[rgba(238, 237, 237, 0.7)]"
                                                    }`}
                                            />
                                        )} */}
                    <img
                      src={`${Logo}`}
                      alt="logos"
                      className={`w-[6vw] h-[6vw]  object-contain rounded-full bg-white  ${
                        LuxuryFind(ticketDetails?.ticketInfo?.bustype) === true
                          ? "shadow-lg shadow-[rgba(255, 238, 201, 0.9)]"
                          : "shadow-lg shadow-[rgba(238, 237, 237, 0.7)]"
                      }`}
                    />
                  </div>
                  <div className="flex flex-col h-[40%] items-center">
                    <p
                      className="text-[1vw] font-bold"
                      style={{
                        color:
                          LuxuryFind(ticketDetails?.ticketInfo?.bustype) ===
                          true
                            ? "#393939"
                            : colorcode.theme,
                      }}
                    >
                      {ticketDetails?.ticketInfo?.operatorname?.length > 23 ? (
                        <Tooltip
                          placement="top"
                          title={ticketDetails?.ticketInfo?.operatorname}
                          className="cursor-pointer"
                          color={
                            LuxuryFind(ticketDetails?.ticketInfo?.bustype) ===
                            true
                              ? "#393939"
                              : colorcode.theme
                          }
                        >
                          {`${ticketDetails?.ticketInfo?.operatorname?.slice(
                            0,
                            22
                          )}...`}
                        </Tooltip>
                      ) : (
                        `${ticketDetails?.ticketInfo?.operatorname?.slice(
                          0,
                          22
                        )}`
                      )}
                    </p>
                    <p
                      className={`${
                        LuxuryFind(ticketDetails?.ticketInfo?.bustype) === true
                          ? "text-[#393939]"
                          : "text-[#1F487C]"
                      }  text-[0.8vw]`}
                    >
                      {ticketDetails?.ticketInfo?.bustype?.length > 25 ? (
                        <Tooltip
                          placement="top"
                          title={ticketDetails?.ticketInfo?.bustype}
                          className="cursor-pointer"
                          color={
                            LuxuryFind(ticketDetails?.ticketInfo?.bustype) ===
                            true
                              ? "#393939"
                              : colorcode.theme
                          }
                        >
                          {`${ticketDetails?.ticketInfo?.bustype?.slice(
                            0,
                            24
                          )}...`}
                        </Tooltip>
                      ) : (
                        `${ticketDetails?.ticketInfo?.bustype?.slice(0, 24)}`
                      )}
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-span-7">
                <div className="grid grid-rows-2 gap-y-[2.5vw]">
                  {/* <div className="row-span-2 flex px-[1vw] justify-between ">
                    <div className="flex flex-col  ">
                      <p
                        className={`text-[1vw] ${
                          LuxuryFind(ticketDetails?.ticketInfo?.bustype) ===
                          true
                            ? "text-[#393939]"
                            : "text-[#1F487C]"
                        }`}
                      >
                        Dropping Point & Time
                      </p>
                      <p
                        className={`${
                          LuxuryFind(ticketDetails?.ticketInfo?.bustype) ===
                          true
                            ? "text-[#393939]"
                            : "text-[#1F487C]"
                        }  text-[1.1vw] font-bold`}
                        // style={{ color: colorcode.theme }}
                      >
                    
                        {ticketDetails?.ticketInfo?.dest_name}
                        {"  "}(
                        {moment(
                          ticketDetails?.ticketInfo?.Arr_Time,
                          "HH:mm:ss"
                        ).format("hh:mm A")}
                        )
                      </p>
                    </div>
                    <div className="relative flex  items-center justify-center">
                      <svg
                        className="w-[11vw] h-[4vw]"
                        viewBox="0 0 191 65"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M63.8027 21.9522V46.3763C63.8027 49.4454 66.3049 51.9629 69.3893 51.9629H104.074C107.159 51.9629 109.661 49.4446 109.661 46.3763V21.9522C109.661 18.883 107.159 16.3656 104.074 16.3656H69.3893C66.3049 16.3656 63.8027 18.8839 63.8027 21.9522Z"
                          fill={
                            LuxuryFind(ticketDetails?.ticketInfo?.bustype) ===
                            true
                              ? "#393939"
                              : "#1F4B7F"
                          }
                        />
                        <path
                          d="M15.9289 2.65835C12.1005 0.255909 8.38323 -0.150284 5.5036 1.50614C-0.254637 4.80155 -0.571095 15.0933 4.76045 24.9138C5.82014 26.8619 7.05462 28.648 8.39942 30.2544C6.51724 33.8422 6.97543 38.339 9.87036 41.4234L28.4267 61.1303C30.1672 62.9812 32.6192 64.0527 35.1345 64.0527H181.215C186.356 64.0527 190.533 59.7672 190.533 54.4913L190.532 15.0765C190.532 9.8006 186.355 5.51503 181.214 5.51503L35.1337 5.51503C32.6184 5.51503 30.1816 6.58665 28.4258 8.43743L24.7869 12.3011C22.3833 8.14502 19.2666 4.73605 15.9289 2.65835ZM35.1337 8.71347L181.214 8.71347C184.631 8.71347 187.431 11.5704 187.431 15.0933V54.491C187.431 57.9974 184.647 60.8709 181.214 60.8709L35.1337 60.8709C33.4571 60.8709 31.8275 60.1565 30.6724 58.9229L12.1161 39.1993C10.9455 37.9657 10.3602 36.3584 10.3602 34.7675C10.3602 33.1766 10.9455 31.5858 12.1161 30.3356L23.9969 17.7063C25.2784 20.7907 27.3527 23.6617 27.0355 26.7161V26.8133C27.0355 27.2519 27.0039 27.6897 26.9723 28.0959C26.4502 27.9663 25.9126 27.8683 25.3427 27.8683C21.6408 27.8683 18.6196 30.9527 18.6196 34.7515C18.6196 38.5662 21.6408 41.6505 25.3427 41.6505C29.0602 41.6505 32.0659 38.566 32.0659 34.7515C32.0659 32.7545 31.2118 30.9527 29.8826 29.7033C30.0404 28.7946 30.136 27.8525 30.136 26.8299V26.716C29.8826 22.046 28.0939 19.1183 26.3065 15.2389L30.6408 10.645C31.8276 9.42716 33.4571 8.71347 35.1337 8.71347ZM22.5412 14.6714L10.344 27.6255C9.29964 26.3105 8.33468 24.8983 7.48069 23.3565C3.13026 15.3691 2.92467 6.63597 7.02169 4.29839C8.88849 3.22677 11.483 3.6164 14.3148 5.38581C17.4161 7.33383 20.3264 10.6291 22.5412 14.6714Z"
                          fill={
                            LuxuryFind(ticketDetails?.ticketInfo?.bustype) ===
                            true
                              ? "#393939"
                              : "#1F4B7F"
                          }
                        />
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M32.2528 54.6614C34.0086 54.6614 35.4319 55.8294 35.4319 57.2702C35.4319 58.711 34.0086 59.879 32.2528 59.879C32.2365 59.879 32.2202 59.8789 32.2039 59.8787L32.2528 62.4375L184.608 62.4375L187.301 59.8787C187.284 59.8789 187.269 59.879 187.252 59.879C185.496 59.879 184.073 58.711 184.073 57.2702C184.073 55.8294 185.496 54.6614 187.252 54.6614C187.269 54.6614 187.284 54.6615 187.301 54.6617V50.4067C187.284 50.4069 187.269 50.407 187.252 50.407C185.496 50.407 184.073 49.239 184.073 47.7982C184.073 46.3574 185.496 45.1894 187.252 45.1894H187.26L187.275 45.1895L187.284 45.1895L187.301 45.1897V41.5772C182.493 41.5772 178.595 38.3786 178.595 34.433C178.595 30.4875 182.493 27.2889 187.301 27.2889V23.7566C187.284 23.7569 187.269 23.757 187.252 23.757C185.496 23.757 184.073 22.5889 184.073 21.1481C184.073 19.7073 185.496 18.5393 187.252 18.5393C187.269 18.5393 187.284 18.5394 187.301 18.5396V14.2846C187.292 14.2847 187.284 14.2848 187.275 14.2849C187.268 14.2849 187.26 14.2849 187.252 14.2849C185.496 14.2849 184.073 13.1169 184.073 11.6761C184.073 10.2353 185.496 9.0673 187.252 9.0673C187.269 9.0673 187.284 9.06738 187.301 9.06762L185.147 6.42857L32.2039 6.96711L32.2039 9.06762C32.1876 9.06762 32.2202 9.06738 32.2039 9.06762C33.9597 9.06762 35.4319 10.2353 35.4319 11.6761C35.4319 13.1169 34.0086 14.2849 32.2528 14.2849C32.2365 14.2849 32.2202 14.2849 32.2039 14.2846V18.5396C32.2202 18.5394 32.2365 18.5393 32.2528 18.5393C34.0086 18.5393 35.4319 19.7073 35.4319 21.1481C35.4319 22.5889 34.0086 23.757 32.2528 23.757C32.2365 23.757 32.2202 23.7569 32.2039 23.7566V27.2889C37.0119 27.2889 41.9793 30.4875 41.9793 34.433C41.9793 38.3786 37.0119 41.5772 32.2039 41.5772V45.1897C32.2202 45.1895 32.2365 45.1894 32.2528 45.1894C34.0086 45.1894 35.4319 46.3574 35.4319 47.7982C35.4319 49.239 34.0086 50.407 32.2528 50.407C32.2365 50.407 32.2202 50.4069 32.2039 50.4067V54.6617C32.2202 54.6615 32.2365 54.6614 32.2528 54.6614Z"
                          fill={
                            LuxuryFind(ticketDetails?.ticketInfo?.bustype) ===
                            true
                              ? "#393939"
                              : "#1F4B7F"
                          }
                        />
                      </svg>
                      <p
                        className={`md:text-[1.5vw] text-[4vw] pl-[1.5vw] font-bold text-white absolute 
                                      ${
                                        LuxuryFind(
                                          ticketDetails?.ticketInfo?.bustype
                                        ) === true
                                          ? "text-[#393939]"
                                          : "text-[#1F487C]"
                                      }`}
                      >
          
                        {`₹ ${
                          calculateDiscountedFare(
                            formatDate(ticketDetails?.ticketInfo?.Journey_Date),
                            ticketDetails?.ticketInfo?.FareBreakup?.baseFare,
                            tbs_discount
                          ) +
                          Number(
                            Math.round(
                              ticketDetails?.ticketInfo?.FareBreakup?.serviceTax
                            )
                          )
                        }`}
                      </p>
                    </div>
                  </div> */}
                  <div className=" flex justify-between px-[1vw] ">
                    <div className="flex flex-col gap-x-[1vw]  ">
                      <div
                        className={`text-[1vw] ${
                          LuxuryFind(ticketDetails?.ticketInfo?.bustype) ===
                          true
                            ? "text-[#393939]"
                            : "text-[#1F487C]"
                        }`}
                      >
                        Source Point
                      </div>
                      <div
                        className={`${
                          LuxuryFind(ticketDetails?.ticketInfo?.bustype) ===
                          true
                            ? "text-[#393939]"
                            : "text-[#1F487C]"
                        } font-bold text-[1.2vw]`}
                        // style={{ color: colorcode.theme }}
                      >
                        {ticketDetails?.ticketInfo?.source_name}
                        {/* Venkatanarasimharajuvaripeta */}
                        {/* {"  "}(
                        {moment(
                          ticketDetails?.ticketInfo?.Start_Time,
                          "HH:mm:ss"
                        ).format("hh:mm A")}
                        ) */}
                      </div>
                    </div>
                    <div className="flex flex-col items-end  ">
                      <p
                        className={`text-[1vw] ${
                          LuxuryFind(ticketDetails?.ticketInfo?.bustype) ===
                          true
                            ? "text-[#393939]"
                            : "text-[#1F487C]"
                        }`}
                      >
                        Destination Point
                      </p>
                      <p
                        className={`${
                          LuxuryFind(ticketDetails?.ticketInfo?.bustype) ===
                          true
                            ? "text-[#393939]"
                            : "text-[#1F487C]"
                        }  text-[1.1vw] font-bold text-end`}
                        // style={{ color: colorcode.theme }}
                      >
                        {ticketDetails?.ticketInfo?.dest_name}
                        {/* Venkatanarasimharajuvaripeta */}
                        {/* {"  "}(
                        {moment(
                          ticketDetails?.ticketInfo?.Arr_Time,
                          "HH:mm:ss"
                        ).format("hh:mm A")}
                        ) */}
                      </p>
                    </div>
                  </div>
                  <div className="content-center">
                    <div className="grid grid-cols-4 ">
                      <div className="col-span-1 ">
                        <div className="flex flex-col pl-[1vw] text-left">
                          <p
                            className={`text-[0.8vw] ${
                              LuxuryFind(ticketDetails?.ticketInfo?.bustype) ===
                              true
                                ? "text-[#393939]"
                                : "text-[#1F487C]"
                            } `}
                            // style={{ color: colorcode.theme }}
                          >
                            {ticketDetails?.ticketInfo?.Journey_Date}
                          </p>
                          <p
                            className={`font-bold ${
                              LuxuryFind(ticketDetails?.ticketInfo?.bustype) ===
                              true
                                ? "text-[#393939]"
                                : "text-[#1F487C]"
                            } text-[1.2vw]`}
                            // style={{ color: colorcode.theme }}
                          >
                            {/* {item.bus_depature} */}
                            {/* {bus[busIndex]?.Bus_Depature_time} */}

                            {moment(
                              ticketDetails?.ticketInfo?.Start_Time,
                              "HH:mm:ss"
                            ).format("hh:mm A")}
                          </p>
                          <p
                            className={`${
                              LuxuryFind(ticketDetails?.ticketInfo?.bustype) ===
                              true
                                ? "text-[#393939]"
                                : "text-[#1F487C]"
                            } text-[0.9vw] `}
                            // style={{ color: colorcode.theme }}
                          >
                            {/* {bus[busIndex]?.Bus_Depature_place} */}
                            {/* {busdetails?.source_name} */}
                            {ticketDetails?.departure_name}
                          </p>
                        </div>
                      </div>
                      <div className="col-span-2 flex-col  items-center w-full justify-center">
                        <div className="absolute top-[7.3vw] w-[18.5vw]">
                          <svg
                            className="w-[36vw] md:w-[19vw] h-[15vw] md:h-[2vw]"
                            viewBox="0 0 300 28"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <line
                              x1="172.258"
                              y1="13.6426"
                              x2="279.058"
                              y2="13.6426"
                              stroke={
                                LuxuryFind(
                                  ticketDetails?.ticketInfo?.bustype
                                ) === true
                                  ? "#393939"
                                  : "#1F4B7F"
                              }
                              stroke-width="2.71095"
                              stroke-dasharray="5.42 5.42"
                            />
                            <line
                              x1="10.2483"
                              y1="13.6426"
                              x2="111.618"
                              y2="13.6426"
                              stroke={
                                LuxuryFind(
                                  ticketDetails?.ticketInfo?.bustype
                                ) === true
                                  ? "#393939"
                                  : "#1F4B7F"
                              }
                              stroke-width="2.71095"
                              stroke-dasharray="5.42 5.42"
                            />
                            <ellipse
                              cx="6.12043"
                              cy="13.8221"
                              rx="5.82925"
                              ry="5.42191"
                              fill={
                                LuxuryFind(
                                  ticketDetails?.ticketInfo?.bustype
                                ) === true
                                  ? "#393939"
                                  : "#1F4B7F"
                              }
                            />
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M280.078 6.24612C280.553 5.805 281.321 5.805 281.796 6.24612L289.082 13.0235C289.557 13.4646 289.557 14.1798 289.082 14.621L281.796 21.3983C281.321 21.8395 280.553 21.8395 280.078 21.3983C279.604 20.9572 279.604 20.242 280.078 19.8009L286.506 13.8222L280.078 7.84357C279.604 7.40245 279.604 6.68725 280.078 6.24612Z"
                              fill={
                                LuxuryFind(
                                  ticketDetails?.ticketInfo?.bustype
                                ) === true
                                  ? "#393939"
                                  : "#1F4B7F"
                              }
                              stroke={
                                LuxuryFind(
                                  ticketDetails?.ticketInfo?.bustype
                                ) === true
                                  ? "#393939"
                                  : "#1F4B7F"
                              }
                              stroke-width="0.271095"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                          </svg>
                        </div>
                        <div
                          style={{
                            zIndex: 2,
                          }}
                          className="relative h-[2.1vw] flex w-[5.5vw]
                                           text-white text-[1vw] font-bold justify-center items-center left-[6.2vw] top-[.5vw]"
                        >
                          <svg
                            className="w-[40vw] h-[10vw]"
                            viewBox="0 0 106 54"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M9.62178 0.374512C4.61028 0.374512 0.592041 4.3313 0.592041 9.26618V35.1452C0.592041 38.0402 2.93887 40.387 5.83382 40.387H11.5805C11.5805 43.9243 13.0076 47.3168 15.5477 49.818C18.0878 52.3193 21.5329 53.7245 25.1251 53.7245C28.7174 53.7245 32.1625 52.3193 34.7026 49.818C37.2427 47.3168 38.6698 43.9243 38.6698 40.387H69.6765C69.6765 43.9243 71.1035 47.3168 73.6436 49.818C76.1837 52.3193 79.6288 53.7245 83.2211 53.7245C86.8133 53.7245 90.2585 52.3193 92.7986 49.818C95.3387 47.3168 96.7657 43.9243 96.7657 40.387H100.554C103.449 40.387 105.795 38.0402 105.795 35.1452V9.26618C105.795 4.3313 101.777 0.374512 96.7657 0.374512H9.62178ZM25.1251 33.7182C26.9213 33.7182 28.6438 34.4208 29.9139 35.6715C31.1839 36.9221 31.8975 38.6183 31.8975 40.387C31.8975 42.1557 31.1839 43.8519 29.9139 45.1025C28.6438 46.3531 26.9213 47.0557 25.1251 47.0557C23.329 47.0557 21.6065 46.3531 20.3364 45.1025C19.0663 43.8519 18.3528 42.1557 18.3528 40.387C18.3528 38.6183 19.0663 36.9221 20.3364 35.6715C21.6065 34.4208 23.329 33.7182 25.1251 33.7182ZM83.2211 33.7182C85.0172 33.7182 86.7398 34.4208 88.0098 35.6715C89.2799 36.9221 89.9934 38.6183 89.9934 40.387C89.9934 42.1557 89.2799 43.8519 88.0098 45.1025C86.7398 46.3531 85.0172 47.0557 83.2211 47.0557C81.425 47.0557 79.7024 46.3531 78.4324 45.1025C77.1623 43.8519 76.4488 42.1557 76.4488 40.387C76.4488 38.6183 77.1623 36.9221 78.4324 35.6715C79.7024 34.4208 81.425 33.7182 83.2211 33.7182Z"
                              fill={
                                LuxuryFind(
                                  ticketDetails?.ticketInfo?.bustype
                                ) === true
                                  ? "#393939"
                                  : "#1F4B7F"
                              }
                            />
                          </svg>
                          <div
                            className={`text-white text-[1.1vw] absolute pb-[0.8vw]`}
                          >
                            {ticketDetails?.duration}
                            {calculateDuration(
                              moment(
                                ticketDetails?.ticketInfo?.Start_Time,
                                "HH:mm:ss"
                              ).format("hh:mm A"),
                              moment(
                                ticketDetails?.ticketInfo?.Arr_Time,
                                "HH:mm:ss"
                              ).format("hh:mm A")
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="col-span-1">
                        <div className="flex flex-col text-right pr-[1vw]">
                          <p
                            className={` ${
                              LuxuryFind(ticketDetails?.ticketInfo?.bustype) ===
                              true
                                ? "text-[#393939]"
                                : "text-[#1F487C]"
                            } text-[0.8vw] `}
                            // style={{ color: colorcode.theme }}
                          >
                            {droppingDate}
                          </p>
                          <p
                            className={`font-bold text-[#1F487C] text-[1.2vw] ${
                              LuxuryFind(ticketDetails?.ticketInfo?.bustype) ===
                              true
                                ? "text-[#393939]"
                                : "text-[#1F487C]"
                            }`}
                            // style={{ color: colorcode.theme }}
                          >
                            {moment(
                              ticketDetails?.ticketInfo?.Arr_Time,
                              "HH:mm:ss"
                            ).format("hh:mm A")}
                          </p>
                          <p
                            className={`${
                              LuxuryFind(ticketDetails?.ticketInfo?.bustype) ===
                              true
                                ? "text-[#393939]"
                                : "text-[#1F487C]"
                            } text-[0.9vw]`}
                            // style={{ color: colorcode.theme }}
                          >
                            {/* {bus[busIndex]?.Bus_Arrival_place} */}
                            {/* {busdetails?.destination_name} */}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="px-[1vw] pt-[3vw]">
                  <div className=" grid grid-cols-2">
                    <p
                      className={`text-[1vw] ${
                        LuxuryFind(ticketDetails?.ticketInfo?.bustype) === true
                          ? "text-[#393939]"
                          : "text-[#1F487C]"
                      }`}
                    >
                      Boarding Point & Time
                    </p>

                    <p
                      className={`text-[1vw] text-end ${
                        LuxuryFind(ticketDetails?.ticketInfo?.bustype) === true
                          ? "text-[#393939]"
                          : "text-[#1F487C]"
                      }`}
                    >
                      Dropping Point & Time
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-x-[1vw]">
                    <p
                      className={`${
                        LuxuryFind(ticketDetails?.ticketInfo?.bustype) === true
                          ? "text-[#393939]"
                          : "text-[#1F487C]"
                      } font-bold text-[1.1vw]  break-words`}
                      // style={{ color: colorcode.theme }}
                    >
                      {/* {ticketDetails?.ticketInfo?.Boarding_Place_Name}{"  "}({ticketDetails?.ticketInfo?.Board_Halt_Time}) */}
                      {ticketDetails?.ticketInfo?.Boarding_Place_Name}
                      {/* Kalasipalayam,A.V.Road,Near Busstand,market jtn */}
                      {"  "}(
                      {moment(
                        ticketDetails?.ticketInfo?.Board_Halt_Time,
                        "HH:mm:ss"
                      ).format("hh:mm A")}
                      )
                    </p>
                    <p
                      className={`${
                        LuxuryFind(ticketDetails?.ticketInfo?.bustype) === true
                          ? "text-[#393939]"
                          : "text-[#1F487C]"
                      }  text-[1.1vw] font-bold text-end break-words`}
                      // style={{ color: colorcode.theme }}
                    >
                      {/* {`${selectedRoutes?.arri_route} : ${dayjs(
                                  selectedRoutes?.arr_time
                                ).format("HH:mm")}`} */}
                      {ticketDetails?.ticketInfo?.dest_name}
                      {/* Kalasipalayam,A.V.Road,NearBusstand,market jtn */}
                      {"  "}(
                      {moment(
                        ticketDetails?.ticketInfo?.Arr_Time,
                        "HH:mm:ss"
                      ).format("hh:mm A")}
                      )
                    </p>
                  </div>

                  {/* <div className="flex flex-col  items-center">
                      <p
                        className={`text-[1vw] ${
                          LuxuryFind(ticketDetails?.ticketInfo?.bustype) ===
                          true
                            ? "text-[#393939]"
                            : "text-[#1F487C]"
                        }`}
                      >
                        Seat Number(s)
                      </p>
                      <div className="text-[1.1vw] font-semibold">
                        <div
                          className={`flex flex-row flex-wrap ${
                            LuxuryFind(ticketDetails?.ticketInfo?.bustype) ===
                            true
                              ? "text-[#393939]"
                              : "text-[#1F487C]"
                          }`}
                        >
                          {ticketDetails?.ticketInfo?.ticket_det?.length > 0 ? (
                            ticketDetails?.ticketInfo?.ticket_det?.map(
                              (val, index) => (
                                <p
                                  key={index}
                                  className="md:text-[1.1vw] text-[2.8vw] mr-[0.4vw]"
                                >
                                  {val.Seat_Num}
                                  {index <
                                    ticketDetails?.ticketInfo?.ticket_det
                                      ?.length -
                                      1 && ","}
                                </p>
                              )
                            )
                          ) : (
                            <p
                              className={`text-[1vw] mr-[0.4vw] ${
                                LuxuryFind(
                                  ticketDetails?.ticketInfo?.bustype
                                ) === true
                                  ? "text-[#393939]"
                                  : "text-[#1F487C]"
                              }`}
                            >
                              No Seat Selected
                            </p>
                          )}
                        </div>
                      </div>
                    </div> */}
                </div>
              </div>
            </div>
          </div>
          <div className="h-auto w-full px-[1vw] ">
            {/* <p className="text-[1.4vw] font-bold">Traveller Details:</p>
                    <div className="flex justify-between text-[1.2vw] font-bold pt-[1.5vw]">
                      <div className="flex-1">Name</div>
                      <div className="flex-1">Age</div>
                      <div className="flex-1">Gender</div>
                    </div>
                    {Object.keys(travelerDetails).map((key) => (
                      <div
                        key={key}
                        className="flex justify-between text-[1.2vw] pt-[1vw]"
                      >
                        <div className="flex-1">
                          {capitalizeFirstLetter(
                            travelerDetails[key].user_name
                          )}
                        </div>
                        <div className="flex-1">{travelerDetails[key].age}</div>
                        <div className="flex-1">
                          {capitalizeFirstLetter(travelerDetails[key].gender)}
                        </div>
                      </div>
                    ))} */}

            {/* <div className="pt-[1.5vw]">
                      <p className="text-[1.4vw] font-bold">
                        Contact Details :{" "}
                      </p>
                      <div class="flex text-[1.2vw] font-medium pt-[1vw]">
                        <div class="flex w-14 pt-[0.3vw]">
                          <FaPhoneFlip color="#1F487C" />
                        </div>
                        <div class="flex w-64">{bookingId?.email_id}</div>
                      </div>
                      <div class="flex text-[1.2vw] font-medium pt-[1vw]">
                        <div class="flex w-14 pt-[0.3vw]">
                          <MdEmail
                            style={{
                              height: "1.5vw",
                              width: "1.5vw",
                              color: "#1F487C",
                            }}
                          />
                        </div>
                        <div class="flex w-64">{bookingId?.mobile_number}</div>
                      </div>
                    </div> */}
            <div className="grid grid-row-3 w-full h-full gap-[1vw]">
              <div
                className={`border-dashed border-[0.11vw] ${
                  LuxuryFind(ticketDetails?.ticketInfo?.bustype) === true
                    ? "border-[#393939]"
                    : "border-[#1F487C]"
                } relative`}
              >
                <span className={`absolute left-[-1.3vw] top-[-1.4vw] z-[3]`}>
                  <div
                    className={` ${
                      LuxuryFind(ticketDetails?.ticketInfo?.bustype) === true
                        ? "bg-white border-l-[#ffffff] border-[#393939]"
                        : " bg-white border-l-[#ffffff] border-[#1F487C]"
                    }  border-[0.16vw]  w-[1.6vw] h-[2.8vw] rounded-full rounded-l-none `}
                  ></div>
                </span>
                <span className="absolute right-[-1.3vw] top-[-1.4vw] z-[3]">
                  <div
                    className={`${
                      LuxuryFind(ticketDetails?.ticketInfo?.bustype) === true
                        ? "bg-white border-r-[#ffffff] border-[#393939]"
                        : "bg-white border-r-[#ffffff] border-[#1F487C]"
                    }   border-[0.16vw]  w-[1.6vw] h-[2.8vw]  rounded-full rounded-r-none `}
                  ></div>
                </span>
              </div>
              <div className="row-span-1 py-[1vw">
                <div></div>
                <div
                  className={`grid grid-cols-8 py-[1vw] font-bold px-[2vw]  ${
                    LuxuryFind(ticketDetails?.ticketInfo?.bustype) === true
                      ? "text-[#393939]"
                      : "text-[#1F487C]"
                  }`}
                >
                  <div className="col-span-2  text-[1.1vw] ">Seat No</div>
                  <div className="col-span-3  text-[1.1vw]">Passenger Name</div>
                  <div className="col-span-2  text-[1.1vw]">Gender</div>
                  <div className="col-span-1  text-[1.1vw]">Age</div>
                </div>
                <div className="">
                  {ticketDetails?.ticketInfo?.ticket_det?.length > 0
                    ? ticketDetails?.ticketInfo?.ticket_det?.map((v, ind) => (
                        <div
                          className={`grid grid-cols-8 px-[2vw] py-[.3vw] ${
                            LuxuryFind(ticketDetails?.ticketInfo?.bustype) ===
                            true
                              ? "text-[#393939]"
                              : "text-[#1F487C]"
                          }`}
                        >
                          <div className="col-span-2 text-[1vw] font-semibold">
                            {v.Seat_Num}
                          </div>
                          <div className="col-span-3 text-[1vw] font-semibold">
                            {v.Passenger_Name}
                          </div>
                          <div className="col-span-2 text-[1vw] font-semibold">
                            {v.GENDER_TYPE}
                          </div>
                          <div className="col-span-1 text-[1vw] font-semibold">
                            {v.Age}
                          </div>
                        </div>
                      ))
                    : ""}
                </div>
                {/* <div className="col-span-2"><svg
                        className="w-[5vw] h-[4vw]"
                        viewBox="0 0 191 65"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M63.8027 21.9522V46.3763C63.8027 49.4454 66.3049 51.9629 69.3893 51.9629H104.074C107.159 51.9629 109.661 49.4446 109.661 46.3763V21.9522C109.661 18.883 107.159 16.3656 104.074 16.3656H69.3893C66.3049 16.3656 63.8027 18.8839 63.8027 21.9522Z"
                          fill={
                            LuxuryFind(ticketDetails?.ticketInfo?.bustype) ===
                            true
                              ? "#393939"
                              : "#1F4B7F"
                          }
                        />
                        <path
                          d="M15.9289 2.65835C12.1005 0.255909 8.38323 -0.150284 5.5036 1.50614C-0.254637 4.80155 -0.571095 15.0933 4.76045 24.9138C5.82014 26.8619 7.05462 28.648 8.39942 30.2544C6.51724 33.8422 6.97543 38.339 9.87036 41.4234L28.4267 61.1303C30.1672 62.9812 32.6192 64.0527 35.1345 64.0527H181.215C186.356 64.0527 190.533 59.7672 190.533 54.4913L190.532 15.0765C190.532 9.8006 186.355 5.51503 181.214 5.51503L35.1337 5.51503C32.6184 5.51503 30.1816 6.58665 28.4258 8.43743L24.7869 12.3011C22.3833 8.14502 19.2666 4.73605 15.9289 2.65835ZM35.1337 8.71347L181.214 8.71347C184.631 8.71347 187.431 11.5704 187.431 15.0933V54.491C187.431 57.9974 184.647 60.8709 181.214 60.8709L35.1337 60.8709C33.4571 60.8709 31.8275 60.1565 30.6724 58.9229L12.1161 39.1993C10.9455 37.9657 10.3602 36.3584 10.3602 34.7675C10.3602 33.1766 10.9455 31.5858 12.1161 30.3356L23.9969 17.7063C25.2784 20.7907 27.3527 23.6617 27.0355 26.7161V26.8133C27.0355 27.2519 27.0039 27.6897 26.9723 28.0959C26.4502 27.9663 25.9126 27.8683 25.3427 27.8683C21.6408 27.8683 18.6196 30.9527 18.6196 34.7515C18.6196 38.5662 21.6408 41.6505 25.3427 41.6505C29.0602 41.6505 32.0659 38.566 32.0659 34.7515C32.0659 32.7545 31.2118 30.9527 29.8826 29.7033C30.0404 28.7946 30.136 27.8525 30.136 26.8299V26.716C29.8826 22.046 28.0939 19.1183 26.3065 15.2389L30.6408 10.645C31.8276 9.42716 33.4571 8.71347 35.1337 8.71347ZM22.5412 14.6714L10.344 27.6255C9.29964 26.3105 8.33468 24.8983 7.48069 23.3565C3.13026 15.3691 2.92467 6.63597 7.02169 4.29839C8.88849 3.22677 11.483 3.6164 14.3148 5.38581C17.4161 7.33383 20.3264 10.6291 22.5412 14.6714Z"
                          fill={
                            LuxuryFind(ticketDetails?.ticketInfo?.bustype) ===
                            true
                              ? "#393939"
                              : "#1F4B7F"
                          }
                        />
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M32.2528 54.6614C34.0086 54.6614 35.4319 55.8294 35.4319 57.2702C35.4319 58.711 34.0086 59.879 32.2528 59.879C32.2365 59.879 32.2202 59.8789 32.2039 59.8787L32.2528 62.4375L184.608 62.4375L187.301 59.8787C187.284 59.8789 187.269 59.879 187.252 59.879C185.496 59.879 184.073 58.711 184.073 57.2702C184.073 55.8294 185.496 54.6614 187.252 54.6614C187.269 54.6614 187.284 54.6615 187.301 54.6617V50.4067C187.284 50.4069 187.269 50.407 187.252 50.407C185.496 50.407 184.073 49.239 184.073 47.7982C184.073 46.3574 185.496 45.1894 187.252 45.1894H187.26L187.275 45.1895L187.284 45.1895L187.301 45.1897V41.5772C182.493 41.5772 178.595 38.3786 178.595 34.433C178.595 30.4875 182.493 27.2889 187.301 27.2889V23.7566C187.284 23.7569 187.269 23.757 187.252 23.757C185.496 23.757 184.073 22.5889 184.073 21.1481C184.073 19.7073 185.496 18.5393 187.252 18.5393C187.269 18.5393 187.284 18.5394 187.301 18.5396V14.2846C187.292 14.2847 187.284 14.2848 187.275 14.2849C187.268 14.2849 187.26 14.2849 187.252 14.2849C185.496 14.2849 184.073 13.1169 184.073 11.6761C184.073 10.2353 185.496 9.0673 187.252 9.0673C187.269 9.0673 187.284 9.06738 187.301 9.06762L185.147 6.42857L32.2039 6.96711L32.2039 9.06762C32.1876 9.06762 32.2202 9.06738 32.2039 9.06762C33.9597 9.06762 35.4319 10.2353 35.4319 11.6761C35.4319 13.1169 34.0086 14.2849 32.2528 14.2849C32.2365 14.2849 32.2202 14.2849 32.2039 14.2846V18.5396C32.2202 18.5394 32.2365 18.5393 32.2528 18.5393C34.0086 18.5393 35.4319 19.7073 35.4319 21.1481C35.4319 22.5889 34.0086 23.757 32.2528 23.757C32.2365 23.757 32.2202 23.7569 32.2039 23.7566V27.2889C37.0119 27.2889 41.9793 30.4875 41.9793 34.433C41.9793 38.3786 37.0119 41.5772 32.2039 41.5772V45.1897C32.2202 45.1895 32.2365 45.1894 32.2528 45.1894C34.0086 45.1894 35.4319 46.3574 35.4319 47.7982C35.4319 49.239 34.0086 50.407 32.2528 50.407C32.2365 50.407 32.2202 50.4069 32.2039 50.4067V54.6617C32.2202 54.6615 32.2365 54.6614 32.2528 54.6614Z"
                          fill={
                            LuxuryFind(ticketDetails?.ticketInfo?.bustype) ===
                            true
                              ? "#393939"
                              : "#1F4B7F"
                          }
                        />
                      </svg>
                <div className="relative ">
                      <svg
                        className="w-[5vw] h-[4vw]"
                        viewBox="0 0 191 65"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M63.8027 21.9522V46.3763C63.8027 49.4454 66.3049 51.9629 69.3893 51.9629H104.074C107.159 51.9629 109.661 49.4446 109.661 46.3763V21.9522C109.661 18.883 107.159 16.3656 104.074 16.3656H69.3893C66.3049 16.3656 63.8027 18.8839 63.8027 21.9522Z"
                          fill={
                            LuxuryFind(ticketDetails?.ticketInfo?.bustype) ===
                            true
                              ? "#393939"
                              : "#1F4B7F"
                          }
                        />
                        <path
                          d="M15.9289 2.65835C12.1005 0.255909 8.38323 -0.150284 5.5036 1.50614C-0.254637 4.80155 -0.571095 15.0933 4.76045 24.9138C5.82014 26.8619 7.05462 28.648 8.39942 30.2544C6.51724 33.8422 6.97543 38.339 9.87036 41.4234L28.4267 61.1303C30.1672 62.9812 32.6192 64.0527 35.1345 64.0527H181.215C186.356 64.0527 190.533 59.7672 190.533 54.4913L190.532 15.0765C190.532 9.8006 186.355 5.51503 181.214 5.51503L35.1337 5.51503C32.6184 5.51503 30.1816 6.58665 28.4258 8.43743L24.7869 12.3011C22.3833 8.14502 19.2666 4.73605 15.9289 2.65835ZM35.1337 8.71347L181.214 8.71347C184.631 8.71347 187.431 11.5704 187.431 15.0933V54.491C187.431 57.9974 184.647 60.8709 181.214 60.8709L35.1337 60.8709C33.4571 60.8709 31.8275 60.1565 30.6724 58.9229L12.1161 39.1993C10.9455 37.9657 10.3602 36.3584 10.3602 34.7675C10.3602 33.1766 10.9455 31.5858 12.1161 30.3356L23.9969 17.7063C25.2784 20.7907 27.3527 23.6617 27.0355 26.7161V26.8133C27.0355 27.2519 27.0039 27.6897 26.9723 28.0959C26.4502 27.9663 25.9126 27.8683 25.3427 27.8683C21.6408 27.8683 18.6196 30.9527 18.6196 34.7515C18.6196 38.5662 21.6408 41.6505 25.3427 41.6505C29.0602 41.6505 32.0659 38.566 32.0659 34.7515C32.0659 32.7545 31.2118 30.9527 29.8826 29.7033C30.0404 28.7946 30.136 27.8525 30.136 26.8299V26.716C29.8826 22.046 28.0939 19.1183 26.3065 15.2389L30.6408 10.645C31.8276 9.42716 33.4571 8.71347 35.1337 8.71347ZM22.5412 14.6714L10.344 27.6255C9.29964 26.3105 8.33468 24.8983 7.48069 23.3565C3.13026 15.3691 2.92467 6.63597 7.02169 4.29839C8.88849 3.22677 11.483 3.6164 14.3148 5.38581C17.4161 7.33383 20.3264 10.6291 22.5412 14.6714Z"
                          fill={
                            LuxuryFind(ticketDetails?.ticketInfo?.bustype) ===
                            true
                              ? "#393939"
                              : "#1F4B7F"
                          }
                        />
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M32.2528 54.6614C34.0086 54.6614 35.4319 55.8294 35.4319 57.2702C35.4319 58.711 34.0086 59.879 32.2528 59.879C32.2365 59.879 32.2202 59.8789 32.2039 59.8787L32.2528 62.4375L184.608 62.4375L187.301 59.8787C187.284 59.8789 187.269 59.879 187.252 59.879C185.496 59.879 184.073 58.711 184.073 57.2702C184.073 55.8294 185.496 54.6614 187.252 54.6614C187.269 54.6614 187.284 54.6615 187.301 54.6617V50.4067C187.284 50.4069 187.269 50.407 187.252 50.407C185.496 50.407 184.073 49.239 184.073 47.7982C184.073 46.3574 185.496 45.1894 187.252 45.1894H187.26L187.275 45.1895L187.284 45.1895L187.301 45.1897V41.5772C182.493 41.5772 178.595 38.3786 178.595 34.433C178.595 30.4875 182.493 27.2889 187.301 27.2889V23.7566C187.284 23.7569 187.269 23.757 187.252 23.757C185.496 23.757 184.073 22.5889 184.073 21.1481C184.073 19.7073 185.496 18.5393 187.252 18.5393C187.269 18.5393 187.284 18.5394 187.301 18.5396V14.2846C187.292 14.2847 187.284 14.2848 187.275 14.2849C187.268 14.2849 187.26 14.2849 187.252 14.2849C185.496 14.2849 184.073 13.1169 184.073 11.6761C184.073 10.2353 185.496 9.0673 187.252 9.0673C187.269 9.0673 187.284 9.06738 187.301 9.06762L185.147 6.42857L32.2039 6.96711L32.2039 9.06762C32.1876 9.06762 32.2202 9.06738 32.2039 9.06762C33.9597 9.06762 35.4319 10.2353 35.4319 11.6761C35.4319 13.1169 34.0086 14.2849 32.2528 14.2849C32.2365 14.2849 32.2202 14.2849 32.2039 14.2846V18.5396C32.2202 18.5394 32.2365 18.5393 32.2528 18.5393C34.0086 18.5393 35.4319 19.7073 35.4319 21.1481C35.4319 22.5889 34.0086 23.757 32.2528 23.757C32.2365 23.757 32.2202 23.7569 32.2039 23.7566V27.2889C37.0119 27.2889 41.9793 30.4875 41.9793 34.433C41.9793 38.3786 37.0119 41.5772 32.2039 41.5772V45.1897C32.2202 45.1895 32.2365 45.1894 32.2528 45.1894C34.0086 45.1894 35.4319 46.3574 35.4319 47.7982C35.4319 49.239 34.0086 50.407 32.2528 50.407C32.2365 50.407 32.2202 50.4069 32.2039 50.4067V54.6617C32.2202 54.6615 32.2365 54.6614 32.2528 54.6614Z"
                          fill={
                            LuxuryFind(ticketDetails?.ticketInfo?.bustype) ===
                            true
                              ? "#393939"
                              : "#1F4B7F"
                          }
                        />
                      </svg>
                      <p
                        className={`md:text-[1.5vw] text-[4vw] pl-[1.5vw] font-bold text-white absolute 
                                      ${
                                        LuxuryFind(
                                          ticketDetails?.ticketInfo?.bustype
                                        ) === true
                                          ? "text-[#393939]"
                                          : "text-[#1F487C]"
                                      }`}
                      >
          
                        {`₹ ${
                          calculateDiscountedFare(
                            formatDate(ticketDetails?.ticketInfo?.Journey_Date),
                            ticketDetails?.ticketInfo?.FareBreakup?.baseFare,
                            tbs_discount
                          ) +
                          Number(
                            Math.round(
                              ticketDetails?.ticketInfo?.FareBreakup?.serviceTax
                            )
                          )
                        }`}
                      </p>
                    </div>

                </div> */}
              </div>
              {/* <div className="row-span-1 py-[1vw]">
             
                {ticketDetails?.ticketInfo?.ticket_det?.length > 0
                  ? ticketDetails?.ticketInfo?.ticket_det?.map((v, ind) => (
                      <div
                        key={ind}
                        className="grid grid-cols-6 gap-[1.5vw] pt-[1vw]"
                      >
                        <div className="col-span-1 flex items-center">
                          <p
                            className={` ${
                              LuxuryFind(ticketDetails?.ticketInfo?.bustype) ===
                              true
                                ? "text-[#393939]"
                                : "text-[#1F487C]"
                            } text-[1.1vw] font-semibold`}
                            // style={{ color: colorcode.theme }}
                          >
                            Traveller Name
                          </p>
                        </div>
                        <div className="col-span-3">
                    
                          <div
                            className="flex items-center border-r-[0.5vw] border-[0.1vw] text-[1vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none px-[0.5vw] relative"
                            style={{
                              //background: `linear-gradient(to right,${colorcode.gradient} , #FFFFFF)`,
                              backgroundColor:
                                LuxuryFind(
                                  ticketDetails?.ticketInfo?.bustype
                                ) === true
                                  ? "#FFEFCE"
                                  : "",
                              borderColor:
                                LuxuryFind(
                                  ticketDetails?.ticketInfo?.bustype
                                ) === true
                                  ? "#393939"
                                  : colorcode.theme,
                              color:
                                LuxuryFind(
                                  ticketDetails?.ticketInfo?.bustype
                                ) === true
                                  ? "#393939"
                                  : colorcode.theme,
                            }}
                          >
                            {v.Passenger_Name}
                          </div>
                        </div>
                        <div className="col-span-2">
                          <div className="grid grid-cols-3 gap-[1vw]">
                            <div className="col-span-1">
                              <div
                                className="border-r-[0.5vw] bg-gradient-to-r border-[0.1vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none px-[1vw] flex items-center justify-center relative"
                                style={{
                                  //background: `linear-gradient(to right,${colorcode.gradient} , #FFFFFF)`,
                                  backgroundColor:
                                    LuxuryFind(
                                      ticketDetails?.ticketInfo?.bustype
                                    ) === true
                                      ? "#FFEFCE"
                                      : "",
                                  borderColor:
                                    LuxuryFind(
                                      ticketDetails?.ticketInfo?.bustype
                                    ) === true
                                      ? "#393939"
                                      : colorcode.theme,
                                  color:
                                    LuxuryFind(
                                      ticketDetails?.ticketInfo?.bustype
                                    ) === true
                                      ? "#393939"
                                      : colorcode.theme,
                                  resize: "none",
                                }}
                              >
                                <p className=" text-[1vw] ">
                              
                                  {v.Age}
                                </p>
                              </div>
                            </div>
                            <div className="col-span-2 gap-[1vw] w-full h-full text-[1vw]">
                              <button
                                type="button"
                                style={{
                                  ...(v?.GENDER_TYPE.toLowerCase() === "male"
                                    ? {
                                        backgroundColor:
                                          LuxuryFind(
                                            ticketDetails?.ticketInfo?.bustype
                                          ) === true
                                            ? "#393939"
                                            : colorcode.theme,
                                      }
                                    : {
                                        //background: `linear-gradient(to right,${colorcode.gradient} , #FFFFFF)`,
                                        color:
                                          LuxuryFind(
                                            ticketDetails?.ticketInfo?.bustype
                                          ) === true
                                            ? "#393939"
                                            : colorcode.theme,
                                        borderColor:
                                          LuxuryFind(
                                            ticketDetails?.ticketInfo?.bustype
                                          ) === true
                                            ? "#393939"
                                            : colorcode.theme,
                                      }),
                                }}
                                className={`${
                                  v.GENDER_TYPE.toLowerCase() === "male"
                                    ? " text-white"
                                    : ""
                                } h-[3vw] w-[50%] rounded-l-[0.5vw] border-[0.1vw] ${
                                  LuxuryFind(
                                    ticketDetails?.ticketInfo?.bustype
                                  ) === true
                                    ? "border-[#393939]"
                                    : "border-[#1F487C]"
                                } `}
                                // onClick={() =>
                                //   setUserDetails({
                                //     ...userdetails,
                                //     sex: "male",
                                //   })
                                // }
                              >
                                Male
                              </button>
                              <button
                                type="button"
                                style={{
                                  ...(v.GENDER_TYPE.toLowerCase() === "female"
                                    ? {
                                        backgroundColor:
                                          LuxuryFind(
                                            ticketDetails?.ticketInfo?.bustype
                                          ) === true
                                            ? "#393939"
                                            : colorcode.theme,
                                      }
                                    : {
                                        //background: `linear-gradient(to right,${colorcode.gradient} , #FFFFFF)`,
                                        color:
                                          LuxuryFind(
                                            ticketDetails?.ticketInfo?.bustype
                                          ) === true
                                            ? "#393939"
                                            : colorcode.theme,
                                        borderColor:
                                          LuxuryFind(
                                            ticketDetails?.ticketInfo?.bustype
                                          ) === true
                                            ? "#393939"
                                            : colorcode.theme,
                                      }),
                                }}
                                className={`
                                ${
                                  v?.GENDER_TYPE.toLowerCase() === "female"
                                    ? " text-white"
                                    : ""
                                }
                               h-[3vw] w-[50%] rounded-r-[0.5vw] border-[0.1vw] ${
                                 ticketDetails?.bus_type_status === "luxury"
                                   ? "border-[#393939]"
                                   : "border-[#1F487C]"
                               } `}
                                // onClick={() =>
                                //   setUserDetails({
                                //     ...userdetails,
                                //     sex: "female",
                                //   })
                                // }
                              >
                                Female
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  : ""}
   
              </div> */}
              {/* <div className="row-span-1 py-[1vw]">
                                <div className="grid grid-cols-6 gap-[1vw]">
                                    <div className="col-span-1 flex items-center">
                                        <p
                                            className={`${ticketDetails?.bus_type_status === "luxury"
                                                    ? "text-[#393939]"
                                                    : "text-[#1F487C]"
                                                } text-[1.1vw] font-semibold `}
                                        // style={{ color: colorcode.theme }}
                                        >
                                            Contact Details
                                        </p>
                                    </div>
                                    <div className="col-span-3">
                                        <div
                                            disabled
                                            className={`border-r-[0.5vw] border-[0.1vw]  text-[1vw] h-[3vw] w-[100%] rounded-[0.5vw] outline-none px-[0.5vw] flex items-center ${ticketDetails?.bus_type_status === "luxury"
                                                    ? "text-[#393939]  bg-[#FFEFCE]"
                                                    : "text-[#1F487C]"
                                                }`}
                                            style={{
                                                //background: `linear-gradient(to right,${colorcode.gradient} , #FFFFFF)`,
                                                borderColor:
                                                    ticketDetails?.bus_type_status === "luxury"
                                                        ? "#393939"
                                                        : colorcode.theme,
                                                color:
                                                    ticketDetails?.bus_type_status === "luxury"
                                                        ? "#393939"
                                                        : colorcode.theme,
                                                resize: "none",
                                            }}
                                        >
                                            <p className=" text-[1.1vw]">
                                                {ticketDetails?.email_id}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="col-span-2 flex relative">
                                        <div
                                            className="border-r-[0.1vw] border-py-[0.5vw] border-[0.1vw] text-[1.1vw] h-[3vw] w-[25%] rounded-l-[0.5vw] outline-none px-[1vw] relative"
                                            style={{
                                                //background: `linear-gradient(to right,${colorcode.gradient} , #FFFFFF)`,
                                                borderColor:
                                                    ticketDetails?.bus_type_status === "luxury"
                                                        ? "#393939"
                                                        : colorcode.theme,
                                                color:
                                                    ticketDetails?.bus_type_status === "luxury"
                                                        ? "#393939"
                                                        : colorcode.theme,
                                            }}
                                        >
                                            <p
                                                className="absolute left-[1.5vw] top-[0.6vw] text-[1vw] "
                                                style={
                                                    {
                                                        // color: colorcode.theme,
                                                        //   borderColor: colorcode.theme,
                                                    }
                                                }
                                            >
                                                +91
                                            </p>
                                        </div>
                                        <div
                                            className="border-r-[0.5vw] border-[0.1vw]  text-[1.2vw] h-[3vw] w-[75%] rounded-r-[0.5vw] outline-none px-[1vw] relative"
                                            style={{
                                                //background: `linear-gradient(to right,${colorcode.gradient} , #FFFFFF)`,
                                                borderColor:
                                                    ticketDetails?.bus_type_status === "luxury"
                                                        ? "#393939"
                                                        : colorcode.theme,
                                                color:
                                                    ticketDetails?.bus_type_status === "luxury"
                                                        ? "#393939"
                                                        : colorcode.theme,
                                            }}
                                        >
                                            <p className="absolute left-[1vw] top-[0.6vw] text-[1vw]">
                                                 {registerfulldetails.mobile} 
                                                {ticketDetails?.mobile_number}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div> */}
            </div>

            {/* <div
              className={`border-dashed border-[0.11vw] ${
                LuxuryFind(ticketDetails?.ticketInfo?.bustype) === true
                  ? "border-[#393939]"
                  : "border-[#1F487C]"
              }  relative mt-[2vw]`}
            >
              <span className={`absolute left-[-1.3vw] top-[-1.4vw] z-[3]`}>
              <div
                    className={` ${
                      LuxuryFind(ticketDetails?.ticketInfo?.bustype) === true
                        ? "bg-[#FFEFCE] border-l-[#FFEFCE] border-[#393939]"
                        : " bg-white border-l-[#ffffff] border-[#1F487C]"
                    }  border-[0.16vw]  w-[1.6vw] h-[2.8vw] rounded-full rounded-l-none `}
                  ></div>
              </span>
              <span className="absolute right-[-1.3vw] top-[-1.4vw] z-[3]">
              <div
                    className={`${
                      LuxuryFind(ticketDetails?.ticketInfo?.bustype) === true
                        ? "bg-[#FFEFCE] border-r-[#FFEFCE] border-[#393939]"
                        : "bg-white border-r-[#ffffff] border-[#1F487C]"
                    }   border-[0.16vw]  w-[1.6vw] h-[2.8vw]  rounded-full rounded-r-none `}
                  ></div>
              </span>
            </div> */}
          </div>

          <div className="flex items-center justify-between pl-[3vw] pr-[2vw] py-[2vw]">
            {/* <div className="barcode">
              <Barcode
                className="w-[40vw] h-[13vw] text-red-500"
                value={generateRandomId(ticketDetails?.ticketInfo?.Ticket_no)}
                // width={3}
                // height={70}
                // lineColor={colorcode.theme}
              />
            </div> */}
            <div className="flex items-center text-[1vw] mt-[.2vw] font-semibold text-[#1F487C]">
              <div
                className={`text-white h-[2.5vw] w-[12.5vw] rounded-[1vw] flex items-center justify-evenly ${
                  LuxuryFind(ticketDetails?.ticketInfo?.bustype) === true
                    ? "bg-[#393939]"
                    : "bg-[#1F487C] "
                }`}
              >
                <FiDownload size={"1.2vw"} color="white" />
                <div>Download Invoice</div>
              </div>
              <div
                className="cursor-pointer px-[2vw] pb-[vw] items-center"
                style={{ userSelect: "none" }}
              >
                {/* <div
                onClick={handleDownloadClick}
                className=" h-[3.5vw] w-[3.5vw] rounded-[50%] flex justify-center items-center border-[.6vw]  "
                style={{
                  borderColor:
                    LuxuryFind(ticketDetails?.ticketInfo?.bustype) === true
                      ? "#737373"
                      : colorcode.gradient,
                  backgroundColor:
                    LuxuryFind(ticketDetails?.ticketInfo?.bustype) === true
                      ? "#393939"
                      : colorcode.theme,
                }}
              >
                <span>
                  <FiDownload size={"1.5vw"} color="white" />
                </span>
              </div> */}
              </div>
            </div>
            <div className="relative flex  items-center justify-center">
              <svg
                className="w-[10vw] h-[3vw]"
                viewBox="0 0 191 65"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M63.8027 21.9522V46.3763C63.8027 49.4454 66.3049 51.9629 69.3893 51.9629H104.074C107.159 51.9629 109.661 49.4446 109.661 46.3763V21.9522C109.661 18.883 107.159 16.3656 104.074 16.3656H69.3893C66.3049 16.3656 63.8027 18.8839 63.8027 21.9522Z"
                  fill={
                    LuxuryFind(ticketDetails?.ticketInfo?.bustype) === true
                      ? "#393939"
                      : "#1F4B7F"
                  }
                />
                <path
                  d="M15.9289 2.65835C12.1005 0.255909 8.38323 -0.150284 5.5036 1.50614C-0.254637 4.80155 -0.571095 15.0933 4.76045 24.9138C5.82014 26.8619 7.05462 28.648 8.39942 30.2544C6.51724 33.8422 6.97543 38.339 9.87036 41.4234L28.4267 61.1303C30.1672 62.9812 32.6192 64.0527 35.1345 64.0527H181.215C186.356 64.0527 190.533 59.7672 190.533 54.4913L190.532 15.0765C190.532 9.8006 186.355 5.51503 181.214 5.51503L35.1337 5.51503C32.6184 5.51503 30.1816 6.58665 28.4258 8.43743L24.7869 12.3011C22.3833 8.14502 19.2666 4.73605 15.9289 2.65835ZM35.1337 8.71347L181.214 8.71347C184.631 8.71347 187.431 11.5704 187.431 15.0933V54.491C187.431 57.9974 184.647 60.8709 181.214 60.8709L35.1337 60.8709C33.4571 60.8709 31.8275 60.1565 30.6724 58.9229L12.1161 39.1993C10.9455 37.9657 10.3602 36.3584 10.3602 34.7675C10.3602 33.1766 10.9455 31.5858 12.1161 30.3356L23.9969 17.7063C25.2784 20.7907 27.3527 23.6617 27.0355 26.7161V26.8133C27.0355 27.2519 27.0039 27.6897 26.9723 28.0959C26.4502 27.9663 25.9126 27.8683 25.3427 27.8683C21.6408 27.8683 18.6196 30.9527 18.6196 34.7515C18.6196 38.5662 21.6408 41.6505 25.3427 41.6505C29.0602 41.6505 32.0659 38.566 32.0659 34.7515C32.0659 32.7545 31.2118 30.9527 29.8826 29.7033C30.0404 28.7946 30.136 27.8525 30.136 26.8299V26.716C29.8826 22.046 28.0939 19.1183 26.3065 15.2389L30.6408 10.645C31.8276 9.42716 33.4571 8.71347 35.1337 8.71347ZM22.5412 14.6714L10.344 27.6255C9.29964 26.3105 8.33468 24.8983 7.48069 23.3565C3.13026 15.3691 2.92467 6.63597 7.02169 4.29839C8.88849 3.22677 11.483 3.6164 14.3148 5.38581C17.4161 7.33383 20.3264 10.6291 22.5412 14.6714Z"
                  fill={
                    LuxuryFind(ticketDetails?.ticketInfo?.bustype) === true
                      ? "#393939"
                      : "#1F4B7F"
                  }
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M32.2528 54.6614C34.0086 54.6614 35.4319 55.8294 35.4319 57.2702C35.4319 58.711 34.0086 59.879 32.2528 59.879C32.2365 59.879 32.2202 59.8789 32.2039 59.8787L32.2528 62.4375L184.608 62.4375L187.301 59.8787C187.284 59.8789 187.269 59.879 187.252 59.879C185.496 59.879 184.073 58.711 184.073 57.2702C184.073 55.8294 185.496 54.6614 187.252 54.6614C187.269 54.6614 187.284 54.6615 187.301 54.6617V50.4067C187.284 50.4069 187.269 50.407 187.252 50.407C185.496 50.407 184.073 49.239 184.073 47.7982C184.073 46.3574 185.496 45.1894 187.252 45.1894H187.26L187.275 45.1895L187.284 45.1895L187.301 45.1897V41.5772C182.493 41.5772 178.595 38.3786 178.595 34.433C178.595 30.4875 182.493 27.2889 187.301 27.2889V23.7566C187.284 23.7569 187.269 23.757 187.252 23.757C185.496 23.757 184.073 22.5889 184.073 21.1481C184.073 19.7073 185.496 18.5393 187.252 18.5393C187.269 18.5393 187.284 18.5394 187.301 18.5396V14.2846C187.292 14.2847 187.284 14.2848 187.275 14.2849C187.268 14.2849 187.26 14.2849 187.252 14.2849C185.496 14.2849 184.073 13.1169 184.073 11.6761C184.073 10.2353 185.496 9.0673 187.252 9.0673C187.269 9.0673 187.284 9.06738 187.301 9.06762L185.147 6.42857L32.2039 6.96711L32.2039 9.06762C32.1876 9.06762 32.2202 9.06738 32.2039 9.06762C33.9597 9.06762 35.4319 10.2353 35.4319 11.6761C35.4319 13.1169 34.0086 14.2849 32.2528 14.2849C32.2365 14.2849 32.2202 14.2849 32.2039 14.2846V18.5396C32.2202 18.5394 32.2365 18.5393 32.2528 18.5393C34.0086 18.5393 35.4319 19.7073 35.4319 21.1481C35.4319 22.5889 34.0086 23.757 32.2528 23.757C32.2365 23.757 32.2202 23.7569 32.2039 23.7566V27.2889C37.0119 27.2889 41.9793 30.4875 41.9793 34.433C41.9793 38.3786 37.0119 41.5772 32.2039 41.5772V45.1897C32.2202 45.1895 32.2365 45.1894 32.2528 45.1894C34.0086 45.1894 35.4319 46.3574 35.4319 47.7982C35.4319 49.239 34.0086 50.407 32.2528 50.407C32.2365 50.407 32.2202 50.4069 32.2039 50.4067V54.6617C32.2202 54.6615 32.2365 54.6614 32.2528 54.6614Z"
                  fill={
                    LuxuryFind(ticketDetails?.ticketInfo?.bustype) === true
                      ? "#393939"
                      : "#1F4B7F"
                  }
                />
              </svg>
              <p
                className={`md:text-[1.5vw] text-[3.5vw] pl-[.9vw] font-bold text-white absolute 
                                      ${
                                        LuxuryFind(
                                          ticketDetails?.ticketInfo?.bustype
                                        ) === true
                                          ? "text-[#393939]"
                                          : "text-[#1F487C]"
                                      }`}
              >
                {`₹ ${
                  calculateDiscountedFare(
                    formatDate(ticketDetails?.ticketInfo?.Journey_Date),
                    ticketDetails?.ticketInfo?.FareBreakup?.baseFare,
                    tbs_discount
                  ) +
                  Number(
                    Math.round(
                      ticketDetails?.ticketInfo?.FareBreakup?.serviceTax
                    )
                  )
                }`}
              </p>
            </div>
          </div>
        </div>
        {/* ))} */}
        {/* <div className="flex justify-end items-end mt-[1vw] mr-[-0.3vw]">
          <button type="button" onClick={generatePDF}
           className={`h-[3vw] w-[15vw] flex flex-cols-2 gap-[1.8vw] justify-center items-center rounded-[1vw] border-[0.1vw] border-[#1F487C] bg-[#1F487C]`}>
             
                  <div className="" ><p className="text-[1.3vw] text-white">Download Ticket</p>  </div>
                  <div
                    className=" h-[2.4vw] w-[2.4vw] rounded-[50%] flex justify-center items-center "
                    style={{ backgroundColor: "white" }}
                  >
                    <span>
                      <FiDownload size={"1.5vw"} color="black" />
                    </span>
                  </div>
            </button>
          </div> */}
      </div>
      <ModalPopup
        show={ratingModal}
        onClose={closeRatingModal}
        height="40vw"
        width="37.5vw"
        padding="0px"
      >
        <RatingFeedBack setRatingModal={setRatingModal} />
      </ModalPopup>
    </div>
  );
};
export default ViewFullTicket;
