import { Collapse } from "antd";
import React, { useEffect, useState } from "react";
import { IoIosArrowUp } from "react-icons/io";
import { RiArrowRightSLine } from "react-icons/ri";
import complete from "../../../Assets/BookingList/complete.png";
import { ErrorMessage, Field, Form, Formik, useFormikContext } from "formik";
import { FaEdit } from "react-icons/fa";
import {
  Abhibus_GetFareInfo,
  Abhibus_SeatBlocked,
} from "../../../Api-Abhibus/Dashboard/DashboardPage";
import * as Yup from "yup";
import ModalPopup from "../../Common/Modal/Modal";
import { useDispatch, useSelector } from "react-redux";
import { GetFooterTabs } from "../../../Api-TBS/Home/Home";

// const validationSchema = Yup.object().shape({
//   address: Yup.string().required("required"),
//   city: Yup.string().required("required"),
//   state: Yup.string().required("required"),
//   pin_code: Yup.string().required("required"),
// });
export default function BiilingAddress({
  BusDetails,
  selectedSeats1,
  travelerDetails,
  selectedRoutes,
  emailInput,
  mobileInput,
  selectedseatprice,
  setConfirmModal,
  setConfirmRefNo,
  confirmModal,
  handleScroll,
  confirmRefNo,
  enableInput,
  setEnableInput,
  isAllDetailsFilled,
  termschecked,
  setTermsChecked,
  setFareDetails,
  faredetails,
  setBillAddress,
  billAddress,
  buttondisable,
}) {
  const LuxuryFind = (type) =>
    type?.toLowerCase().includes("volvo") ||
    type?.toLowerCase().includes("mercedes benz") ||
    type?.toLowerCase().includes("washroom") ||
    type?.toLowerCase().includes("bharatBenz") ||
    type?.toLowerCase().includes("luxury");
  const [formState, setFormState] = useState({
    isValid: false,
    isSubmitting: false,
  });
  const [registerfulldetails, setRegisterFullDetails] = useState({});
  // const [enableInput, setEnableInput] = useState(false);
  const [sumbitbutton, setSubmitButon] = useState(false);

  const {
    handleSubmit,
    isSubmitting,
    isValid,
    values,
    setFieldValue,
    handleChange,
  } = useFormikContext();
  const [modalOpen, setModalOpen] = useState(false);
  const dispatch = useDispatch();
  const conditionsMobile = useSelector((state) => state?.tbs_info || []);
  const terms_conditions = conditionsMobile?.terms_conditions;
  useEffect(() => {
    GetFooterTabs(dispatch);
  }, [dispatch]);

  // const [faredetails, setFareDetails] = useState("");

  // const getPassengerCount = (data) => {
  //   let adultCount = 0;
  //   let childCount = 0;

  //   data.forEach((passenger) => {
  //     if (parseInt(passenger.age) > 3) {
  //       adultCount++;
  //     } else {
  //       childCount++;
  //     }
  //   });

  //   return { adultCount, childCount };
  // };
  // const { adultCount, childCount } = getPassengerCount(
  //   Object?.values(travelerDetails)
  // );
  // console.log(adultCount, childCount, "tegvyuhubuhbu");

  // const handleSubmit = async (values) => {
  //   console.log(selectedSeats1, "valuesxxsssssssxxx");

  //   try {
  //     console.log("Calling API...");
  //     const response = await Abhibus_SeatBlocked(
  //       BusDetails,
  //       selectedSeats1,
  //       travelerDetails,
  //       values,
  //       selectedRoutes,
  //       emailInput,
  //       mobileInput,
  //       selectedseatprice
  //     );
  //     if (response?.status === "success") {
  //       setConfirmModal(true);
  //       setConfirmRefNo(response?.ReferenceNo);
  //       handleScroll();
  //       try {
  //         const data = await Abhibus_GetFareInfo(
  //           adultCount,
  //           childCount,
  //           response?.ReferenceNo
  //         );
  //         setFareDetails(data?.GetFaresInfo)
  //       } catch {
  //         console.log("test");
  //       }
  //     }
  //     console.log(response, "API Response");
  //     console.log(response);
  //   } catch (error) {
  //     console.error("API call failed:", error);
  //   }
  // };

  // console.log(
  //   selectedSeats1,
  //   travelerDetails,
  //   BusDetails,
  //   selectedRoutes,
  //   "ttttttttttttttt"
  // );

  return (
    <>
      <div>
        <Collapse
          style={{
            backgroundColor:
              LuxuryFind(BusDetails?.Bus_Type_Name) === true
                ? "#393939"
                : "#1F4B7F",
          }}
          defaultActiveKey={["1"]}
          className="rounded-[2.5vw] md:rounded-[1vw] shadow-xl border-none"
          expandIcon={({ isActive }) =>
            isActive ? (
              <IoIosArrowUp
                className="mt-[0.5vw] h-[5vw] w-[5vw] md:h-[2vw] md:w-[1.8vw]"
                style={{ color: "#FFFFFF" }}
              />
            ) : (
              <RiArrowRightSLine
                className="md:mt-[0.9vw] h-[5vw] w-[5vw] md:h-[2.5vw] md:w-[2.3vw]"
                style={{ color: "#FFFFFF" }}
              />
            )
          }
          expandIconPosition="end"
          items={[
            {
              key: "1",
              label: (
                <div className="flex items-center h-[4vw] md:h-[2.5vw]">
                  <div className="col-span-2">
                    <span className="">
                      {confirmModal ? (
                        <img
                          src={complete}
                          alt="completeImage"
                          className="md:h-[2.5vw] md:w-[2.5vw] h-[7vw] w-[7vw]"
                        />
                      ) : (
                        ""
                      )}
                    </span>
                  </div>
                  <div className="pl-[1vw] text-[#FFFFFF] font-medium md:text-[1.5vw] text-[4vw]">
                    Billing Address
                  </div>
                </div>
              ),
              children: (
                <div
                  style={{
                    backgroundColor:
                      LuxuryFind(BusDetails?.Bus_Type_Name) === true
                        ? "#FFEEC9"
                        : "white",
                  }}
                >
                  <div className="h-auto w-full px-[1vw] pb-[1vw]">
                    {/* <Formik
                    initialValues={{
                      address: "",
                      pin_code: "",
                      state: "",
                      city: "",
                    }}
                    validationSchema={validationSchema}
                    onSubmit={(values) => {
                      handleSubmit(values);
                    }}
                  // enableReinitialize={false}
                  >
                    {({
                      isSubmitting,
                      isValid,
                      handleSubmit,
                      values,
                      setFieldValue,
                      handleChange,
                    }) => {
                      return ( */}
                    <Form onSubmit={handleSubmit}>
                      <div className="grid grid-cols-5 gap-x-[2vw] pt-[1vw]">
                        <div className=" relative col-span-3">
                          <Field
                            type="text"
                            name="address"
                            value={
                              billAddress?.address ? billAddress?.address : ""
                            }
                            disabled={enableInput}
                            autoComplete="off"
                            placeholder="Address"
                            // value={emailInput}
                            onChange={(e) => {
                              handleChange(e);
                              //   setEmailInput(e.target.value);
                              //   setFieldValue("email", e.target.value);
                              // sessionStorage.setItem(
                              //   "user_email_id",
                              //   e.target.value
                              // );
                              setBillAddress((prev) => ({
                                ...prev,
                                address: e.target.value,
                              }));
                            }}
                            className={` ${
                              !isSubmitting || !enableInput
                                ? `cursor-pointer`
                                : "cursor-not-allowed"
                            } border-r-[1.5vw] md:border-r-[0.5vw] md:placeholder:text-[1.2vw] placeholder:text-[3.5vw] border-[.1vw] text-[4vw] md:text-[1.2vw] md:h-[3vw] w-full h-[10vw] md:w-full rounded-[1.5vw] md:rounded-[0.3vw] outline-none px-[0.75vw] md:px-[0.5vw]   `}
                            style={{
                              borderColor:
                                LuxuryFind(BusDetails?.Bus_Type_Name) === true
                                  ? "#393939"
                                  : "#1F4B7F",
                              color:
                                LuxuryFind(BusDetails?.Bus_Type_Name) === true
                                  ? "#393939"
                                  : "#1F4B7F",
                            }}
                          />
                          <ErrorMessage
                            name="address"
                            component="div"
                            className="text-red-500 text-[2.5vw] md:text-[0.8vw] absolute top-[9.7vw] md:top-[3vw] md:left-[0vw] left-[1vw] "
                          />
                        </div>
                        <div className="relative col-span-2">
                          <Field
                            type="text"
                            name="pin_code"
                            disabled={enableInput}
                            autoComplete="off"
                            placeholder="Pin Code"
                            // value={emailInput}
                            value={
                              billAddress?.pincode || values?.pin_code || ""
                            }
                            onChange={(e) => {
                              handleChange(e);
                              //   setEmailInput(e.target.value);
                              //   setFieldValue("email", e.target.value);
                              // sessionStorage.setItem(
                              //   "user_email_id",
                              //   e.target.value
                              // );
                              setBillAddress((prev) => ({
                                ...prev,
                                pincode: e.target.value,
                              }));
                            }}
                            className={`
                            ${
                              !isSubmitting || !enableInput
                                ? `cursor-pointer`
                                : "cursor-not-allowed"
                            } border-r-[1.5vw] md:border-r-[0.5vw] md:placeholder:text-[1.2vw] placeholder:text-[3.5vw] border-[.1vw]  text-[4vw] md:text-[1.2vw] md:h-[3vw] w-full h-[10vw] md:w-full rounded-[1.5vw] md:rounded-[0.3vw] outline-none px-[0.75vw] md:px-[0.5vw]   `}
                            style={{
                              borderColor:
                                LuxuryFind(BusDetails?.Bus_Type_Name) === true
                                  ? "#393939"
                                  : "#1F4B7F",
                              color:
                                LuxuryFind(BusDetails?.Bus_Type_Name) === true
                                  ? "#393939"
                                  : "#1F4B7F",
                            }}
                          />
                          <ErrorMessage
                            name="pin_code"
                            component="div"
                            className="text-red-500 text-[2.5vw] md:text-[0.8vw] absolute top-[9.7vw] md:top-[3vw] md:left-[0vw] left-[1vw] "
                          />
                        </div>
                        <div className="col-span-2"></div>
                      </div>
                      <div className="grid grid-cols-4 gap-x-[2vw] pt-[2vw]">
                        <div className="relative col-span-2">
                          <Field
                            type="text"
                            name="state"
                            disabled={enableInput}
                            autoComplete="off"
                            placeholder="State"
                            // value={emailInput}
                            value={billAddress?.state || values?.state || ""}
                            onChange={(e) => {
                              handleChange(e);
                              //   setEmailInput(e.target.value);
                              //   setFieldValue("email", e.target.value);
                              // sessionStorage.setItem(
                              //   "user_email_id",
                              //   e.target.value
                              // );
                              setBillAddress((prev) => ({
                                ...prev,
                                state: e.target.value,
                              }));
                            }}
                            className={`
                            ${
                              !isSubmitting || !enableInput
                                ? `cursor-pointer`
                                : "cursor-not-allowed"
                            }  border-r-[1.5vw] md:border-r-[0.5vw] md:placeholder:text-[1.2vw] placeholder:text-[3.5vw] border-[.1vw] text-[4vw] md:text-[1.2vw] md:h-[3vw] w-full h-[10vw] md:w-full rounded-[1.5vw] md:rounded-[0.3vw] outline-none px-[0.75vw] md:px-[0.5vw]   `}
                            style={{
                              borderColor:
                                LuxuryFind(BusDetails?.Bus_Type_Name) === true
                                  ? "#393939"
                                  : "#1F4B7F",
                              color:
                                LuxuryFind(BusDetails?.Bus_Type_Name) === true
                                  ? "#393939"
                                  : "#1F4B7F",
                            }}
                          />
                          <ErrorMessage
                            name="state"
                            component="div"
                            className="text-red-500 text-[2.5vw] md:text-[0.8vw] absolute top-[9.7vw] md:top-[3vw] md:left-[0vw] left-[1vw] "
                          />
                        </div>
                        <div className="relative col-span-2">
                          <Field
                            type="text"
                            name="city"
                            disabled={enableInput}
                            autoComplete="off"
                            placeholder="City"
                            // value={emailInput}
                            value={billAddress?.city || values?.city || ""}
                            onChange={(e) => {
                              handleChange(e);
                              //   setEmailInput(e.target.value);
                              //   setFieldValue("email", e.target.value);
                              // sessionStorage.setItem(
                              //   "user_email_id",
                              //   e.target.value
                              // );
                              setBillAddress((prev) => ({
                                ...prev,
                                city: e.target.value,
                              }));
                            }}
                            className={`
                            ${
                              !isSubmitting || !enableInput
                                ? `cursor-pointer`
                                : "cursor-not-allowed"
                            }  border-r-[1.5vw] md:border-r-[0.5vw] md:placeholder:text-[1.2vw] placeholder:text-[3.5vw] border-[.1vw]  text-[4vw] md:text-[1.2vw] md:h-[3vw] w-full h-[10vw] md:w-full rounded-[1.5vw] md:rounded-[0.3vw] outline-none px-[0.75vw] md:px-[0.5vw]   `}
                            style={{
                              borderColor:
                                LuxuryFind(BusDetails?.Bus_Type_Name) === true
                                  ? "#393939"
                                  : "#1F4B7F",
                              color:
                                LuxuryFind(BusDetails?.Bus_Type_Name) === true
                                  ? "#393939"
                                  : "#1F4B7F",
                            }}
                          />
                          <ErrorMessage
                            name="city"
                            component="div"
                            className="text-red-500 text-[2.5vw] md:text-[0.8vw] absolute top-[9.7vw] md:top-[3vw] md:left-[0vw] left-[1vw] "
                          />
                        </div>
                        <div className="col-span-2"></div>
                      </div>
                      {/* {registerfulldetails?.terms === false ? (
                            ""
                          ) : ( */}
                      <>
                        <div className="flex md:flex-row flex-col md:pt-[2vw] pt-[4vw] md:items-center md:justify-between py-[2vw] md:py-[0vw] px-[2vw] md:px-[0vw]">
                          <div className="relative flex items-center gap-[2vw] md:gap-[0.5vw] md:mb-[0vw] mb-[3vw]">
                            <Field
                              disabled={enableInput}
                              id="custom-checkbox"
                              type="checkbox"
                              name="terms"
                              className="md:h-[1.5vw] md:w-[2vw] h-[4vw] w-[4vw] cursor-pointer "
                              // checked={values.terms}
                              checked={termschecked}
                              //color="#393939"
                              onChange={(e) => {
                                setFieldValue("terms", e.target.checked);
                                setTermsChecked(e.target.checked);
                              }}
                            />

                            <p
                              className={`${
                                !isSubmitting || !enableInput
                                  ? `cursor-pointer`
                                  : "cursor-not-allowed"
                              } md:text-[0.9vw] underline text-[4vw] ${
                                LuxuryFind(BusDetails?.Bus_Type_Name) === true
                                  ? "text-[#393939]"
                                  : "text-[#1F487C]"
                              }`}
                              onClick={() => {
                                setModalOpen(true);
                              }}
                            >
                              Yes and I Accept the{" "}
                              <span>Terms and Conditions</span>
                            </p>
                            <ErrorMessage
                              name="terms"
                              component="div"
                              className="text-red-500 text-[2.5vw] md:text-[0.75vw] absolute md:top-[1vw] md:left-[2.5vw] top-[4.5vw]"
                            />
                          </div>
                          <div className="flex justify-end md:gap-x-[0vw] gap-x-[6vw] items-center">
                            {sumbitbutton && (
                              <FaEdit
                                // size={"2vw"}
                                color={
                                  LuxuryFind(BusDetails?.Bus_Type_Name) === true
                                    ? "#393939"
                                    : LuxuryFind(BusDetails?.Bus_Type_Name) ===
                                      true
                                    ? "#1F4B7F"
                                    : ""
                                }
                                className="cursor-pointer md:ml-[12vw] md:text-[2vw] text-[7vw]"
                                onClick={() => {
                                  setEnableInput(false);
                                  //fetchBookingDetail(mobilenum);
                                }}
                              />
                            )}

                            <button
                              type="button"
                              onClick={handleSubmit}
                              // style={{
                              //   backgroundColor:
                              //     isValid && termschecked
                              //       ? LuxuryFind(
                              //           BusDetails?.Bus_Type_Name
                              //         ) === true
                              //         ? "#393939"
                              //         : LuxuryFind(
                              //             BusDetails?.Bus_Type_Name
                              //           ) === true
                              //         ? "#1F4B7F"
                              //         : ""
                              //       : "gray",
                              // }}
                              style={{
                                backgroundColor:
                                  isValid && termschecked
                                    ? LuxuryFind(BusDetails?.Bus_Type_Name) ===
                                      true
                                      ? "#393939"
                                      : "#1F4B7F"
                                    : "gray",
                              }}
                              className={`${
                                termschecked && isValid && !enableInput
                                  ? "cursor-pointer"
                                  : "cursor-not-allowed"
                              } md:w-[18vw] w-full h-[8vw] md:h-[2.5vw] rounded-[2vw] md:rounded-[0.5vw] ml-[1vw]`}
                              disabled={
                                !isAllDetailsFilled ||
                                buttondisable ||
                                confirmRefNo == null
                                  ? false
                                  : true
                              }
                            >
                              <span className="text-white text-[3.2vw] md:text-[1.1vw] font-semibold">
                                {/* {isSubmitting && isValid
                                          ? `Update to Pay ₹ ${discount1}`
                                          : `Continue to Pay ₹ ${discount1}`} */}
                                Continue
                              </span>
                            </button>
                          </div>
                        </div>
                      </>
                      {/* )} */}
                      {/* </Form>
                      );
                    }}
                  </Formik> */}
                    </Form>
                  </div>
                </div>
              ),
            },
          ]}
        />
      </div>
      <ModalPopup
        show={modalOpen}
        onClose={() => setModalOpen(false)}
        height="65vh"
        width="60vw"
      >
        <span
          className={`text-[1.5vw] font-semibold `}
          style={{
            color:
              LuxuryFind(BusDetails?.Bus_Type_Name) === true
                ? "#393939"
                : "#1F4B7F",
          }}
        >
          Terms and Conditions
        </span>
        <div className=" Legal-Information-Mobile overflow-y-auto max-h-[40.5vh] px-[3vw] pt-[1vw]">
          {terms_conditions?.split("\r\n")?.map((line, index) => (
            <p
              key={index}
              style={{
                color:
                  LuxuryFind(BusDetails?.Bus_Type_Name) === true
                    ? "#393939"
                    : "#1F4B7F",
              }}
              className={`text-[1vw] pb-[0.75vw]`}
            >
              {line}
            </p>
          ))}
        </div>
      </ModalPopup>
    </>
  );
}
