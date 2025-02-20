import { Collapse, Drawer } from "antd";
import React, { useState, useEffect } from "react";
import { IoIosArrowUp } from "react-icons/io";
import { RiArrowRightSLine } from "react-icons/ri";
import complete from "../../../../Assets/BookingList/complete.png";
import { ErrorMessage, Field, Form, Formik, useFormikContext } from "formik";
import { FaEdit } from "react-icons/fa";
import { Abhibus_SeatBlocked } from "../../../../Api-Abhibus/Dashboard/DashboardPage";
import * as Yup from "yup";
import { GetFooterTabs } from "../../../../Api-TBS/Home/Home";
import { useDispatch, useSelector } from "react-redux";
// const validationSchema = Yup.object().shape({
//   address: Yup.string()
//     .required('Address is required'),
//   city: Yup.string()
//     .matches(/^[A-Za-z\s]+$/, 'InValid Names for City')
//     .required('City is required'),
//   state: Yup.string()
//     .matches(/^[A-Za-z\s]+$/, 'InValid Names for State')
//     .required('State is required'),
//   pin_code: Yup.string()
//     .matches(/^\d{6}$/, 'Pin code must be exactly 6 digits')
//     .required('Pin code is required')
//     .test('is-numeric', 'Pin code must contain only numbers', value => !isNaN(value)),
//   terms: Yup.boolean().oneOf(
//     [true],
//     "You must accept the terms and conditions"
//   ),
// });
export default function MobileBillAddress({
  MobBusDetails,
  MobSeatDetails,
  travelerDetails,
  MobSelectedRoutes,
  emailInput,
  mobileInput,
  MobSelectedseatprice,
  setConfirmModal,
  setConfirmRefNo,
  confirmModal,
  isAllDetailsFilled,
  enableInput,
  setEnableInput,
  faredetails,
  setFareDetails,
}) {
  const dispatch = useDispatch();
  const [openDrawer, setOpenDrawer] = useState(false);
  const conditionsMobile = useSelector((state) => state?.tbs_info || []);
  const terms_conditions = conditionsMobile?.terms_conditions;
  useEffect(() => {
    GetFooterTabs(dispatch);
  }, [dispatch]);

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

  const {
    handleSubmit,
    isSubmitting,
    isValid,
    values,
    setFieldValue,
    handleChange,
  } = useFormikContext();

  const [registerfulldetails, setRegisterFullDetails] = useState({});
  const [termschecked, setTermsChecked] = useState(false);
  const [sumbitbutton, setSubmitButon] = useState(false);

  // const handleSubmit = async (values) => {

  //   try {
  //     const response = await Abhibus_SeatBlocked(
  //       MobBusDetails,
  //       MobSeatDetails,
  //       travelerDetails,
  //       values,
  //       MobSelectedRoutes,
  //       emailInput,
  //       mobileInput,
  //       MobSelectedseatprice
  //     );
  //     if (response?.status === "success") {
  //       setConfirmModal(true);
  //       setConfirmRefNo(response?.ReferenceNo);
  //     }
  //   } catch (error) {
  //     console.error("API call failed:", error);
  //   }
  //   console.log(confirmModal, values, "valuesxxsssssssxxx");
  // };

  return (
    <div>
      <Collapse
        style={{
          backgroundColor:
            LuxuryFind(MobBusDetails?.Bus_Type_Name) === true
              ? "#393939"
              : "#1F4B7F",
        }}
        defaultActiveKey={["1"]}
        className="rounded-[2.5vw]  shadow-xl border-none"
        expandIcon={({ isActive }) =>
          isActive ? (
            <IoIosArrowUp
              className="mt-[0.5vw] h-[5vw] w-[5vw] "
              style={{ color: "#FFFFFF" }}
            />
          ) : (
            <RiArrowRightSLine
              className=" h-[5vw] w-[5vw] "
              style={{ color: "#FFFFFF" }}
            />
          )
        }
        expandIconPosition="end"
        items={[
          {
            key: "1",
            label: (
              <div className="flex items-center h-[4vw]">
                <div className="col-span-2">
                  <span className="">
                    {confirmModal ? (
                      <img
                        src={complete}
                        alt="completeImage"
                        className=" h-[7vw] w-[7vw]"
                      />
                    ) : (
                      ""
                    )}
                  </span>
                </div>
                <div className="pl-[1vw] text-[#FFFFFF] font-medium text-[4vw]">
                  Billing Address
                </div>
              </div>
            ),
            children: (
              <div
                style={{
                  backgroundColor:
                    LuxuryFind(MobBusDetails?.Bus_Type_Name) === true
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
                      <div className=" relative   col-span-3">
                        <Field
                          type="text"
                          name="address"
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
                          }}
                          className={`
                             ${!isSubmitting || !enableInput
                              ? `cursor-pointer`
                              : "cursor-not-allowed"
                            } border-r-[1.5vw] placeholder:text-[3.5vw] border-[.1vw] text-[4vw]   w-full h-[10vw] rounded-[1.5vw] outline-none px-[0.75vw]`}
                          style={{
                            borderColor:
                              LuxuryFind(MobBusDetails?.Bus_Type_Name) === true
                                ? "#393939"
                                : "#1F4B7F",
                            color:
                              LuxuryFind(MobBusDetails?.Bus_Type_Name) === true
                                ? "#393939"
                                : "#1F4B7F",
                          }}
                        />
                        <ErrorMessage
                          name="address"
                          component="div"
                          className="text-red-500 text-[2.5vw] absolute top-[9.7vw] left-[1vw] "
                        />
                      </div>
                      <div className=" relative col-span-2">
                        <Field
                          type="text"
                          name="pin_code"
                          disabled={enableInput}
                          autoComplete="off"
                          placeholder="Pin Code"
                          // value={emailInput}
                          onChange={(e) => {
                            handleChange(e);
                            //   setEmailInput(e.target.value);
                            //   setFieldValue("email", e.target.value);
                            // sessionStorage.setItem(
                            //   "user_email_id",
                            //   e.target.value
                            // );
                          }}
                          className={`
                             ${!isSubmitting || !enableInput
                              ? `cursor-pointer`
                              : "cursor-not-allowed"
                            } 
                             border-r-[1.5vw]  placeholder:text-[3.5vw] border-[.1vw] text-[4vw] w-full h-[10vw] rounded-[1.5vw] outline-none px-[0.75vw]`}
                          style={{
                            borderColor:
                              LuxuryFind(MobBusDetails?.Bus_Type_Name) === true
                                ? "#393939"
                                : "#1F4B7F",
                            color:
                              LuxuryFind(MobBusDetails?.Bus_Type_Name) === true
                                ? "#393939"
                                : "#1F4B7F",
                          }}
                        />
                        <ErrorMessage
                          name="pin_code"
                          component="div"
                          className="text-red-500 text-[2.5vw]  absolute top-[9.7vw] left-[1vw] "
                        />
                      </div>
                      <div className="col-span-2"></div>
                    </div>
                    <div className="grid grid-cols-4 gap-x-[2vw] pt-[4vw]">
                      <div className=" relative col-span-2">
                        <Field
                          type="text"
                          name="state"
                          disabled={enableInput}
                          autoComplete="off"
                          placeholder="State"
                          value={values?.state}
                          onChange={(e) => {
                            handleChange(e);
                            //   setEmailInput(e.target.value);
                            //   setFieldValue("email", e.target.value);
                            // sessionStorage.setItem(
                            //   "user_email_id",
                            //   e.target.value
                            // );
                          }}
                          className={`
                             ${!isSubmitting || !enableInput
                              ? `cursor-pointer`
                              : "cursor-not-allowed"
                            } 
                             border-r-[1.5vw] placeholder:text-[3.5vw] border-[.1vw] text-[4vw] w-full h-[10vw] rounded-[1.5vw]  outline-none  px-[0.75vw]`}
                          style={{
                            borderColor:
                              LuxuryFind(MobBusDetails?.Bus_Type_Name) === true
                                ? "#393939"
                                : "#1F4B7F",
                            color:
                              LuxuryFind(MobBusDetails?.Bus_Type_Name) === true
                                ? "#393939"
                                : "#1F4B7F",
                          }}
                        />
                        <ErrorMessage
                          name="state"
                          component="div"
                          className="text-red-500 text-[2.5vw]  absolute top-[9.7vw]    left-[1vw] "
                        />
                      </div>
                      <div className=" relative col-span-2">
                        <Field
                          type="text"
                          name="city"
                          disabled={enableInput}
                          autoComplete="off"
                          placeholder="City"
                          value={values?.city || ''}
                          onChange={(e) => {
                            handleChange(e);
                            //   setEmailInput(e.target.value);
                            //   setFieldValue("email", e.target.value);
                            // sessionStorage.setItem(
                            //   "user_email_id",
                            //   e.target.value
                            // );
                          }}
                          className={`
                             border-r-[1.5vw] placeholder:text-[3.5vw] border-[.1vw] text-[4vw] w-full h-[10vw] rounded-[1.5vw]  outline-none px-[0.75vw]`}
                          style={{
                            borderColor:
                              LuxuryFind(MobBusDetails?.Bus_Type_Name) === true
                                ? "#393939"
                                : "#1F4B7F",
                            color:
                              LuxuryFind(MobBusDetails?.Bus_Type_Name) === true
                                ? "#393939"
                                : "#1F4B7F",
                          }}
                        />
                        <ErrorMessage
                          name="city"
                          component="div"
                          className="text-red-500 text-[2.5vw] absolute top-[9.7vw] left-[1vw] "
                        />
                      </div>
                      <div className="col-span-2"></div>
                    </div>
                    {/* {registerfulldetails?.terms === false ? (
                            ""
                          ) : ( */}
                    <>
                      <div className="flex flex-col pt-[4vw]  py-[2vw] px-[2vw]">
                        <div className="relative flex items-center gap-[2vw] mb-[3vw]">
                          <Field
                            disabled={enableInput}
                            id="custom-checkbox"
                            type="checkbox"
                            name="terms"
                            className=" h-[4vw] w-[4vw] cursor-pointer "
                            checked={values.terms}
                            //color="#393939"
                            onChange={(e) => {
                              setFieldValue("terms", e.target.checked);
                              setTermsChecked(e.target.checked);
                              console.log(e.target.checked, "setTermsChecked");
                            }}
                          />

                          <p
                            className={` text-[4vw] underline ${LuxuryFind(MobBusDetails?.Bus_Type_Name) === true
                                ? "text-[#393939]"
                                : "text-[#1F487C]"
                              } `}
                            onClick={() => {
                              setOpenDrawer(true);
                            }}
                          >
                            Yes and I Accept the{" "}
                            <span>Terms and Conditions</span>
                          </p>

                          <ErrorMessage
                            name="terms"
                            component="div"
                            className="text-red-500 text-[2.5vw] absolute top-[4.5vw]"
                          />
                        </div>
                        <div className="flex justify-end gap-x-[6vw] items-center">
                          {sumbitbutton && (
                            <FaEdit
                              // size={"2vw"}
                              color={
                                LuxuryFind(MobBusDetails?.Bus_Type_Name) ===
                                  true
                                  ? "#393939"
                                  : LuxuryFind(MobBusDetails?.Bus_Type_Name) ===
                                    true
                                    ? "#1F4B7F"
                                    : ""
                              }
                              className="cursor-pointer text-[7vw]"
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
                                  ? LuxuryFind(MobBusDetails?.Bus_Type_Name) ===
                                    true
                                    ? "#393939"
                                    : "#1F4B7F"
                                  : "gray",
                            }}
                            className={`${termschecked && isValid && !enableInput
                                ? "cursor-pointer"
                                : "cursor-not-allowed"
                              } w-full h-[8vw]  rounded-[2vw]  ml-[1vw]`}
                            disabled={!isAllDetailsFilled}
                          >
                            <span className="text-white text-[3.2vw] font-semibold">
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
                  </Form>
                  {/* );
                    }}
                  </Formik> */}
                </div>
              </div>
            ),
          },
        ]}
      />
      <Drawer
        open={openDrawer}
        onClose={() => {
          setOpenDrawer(false);
        }}
        placement="bottom"
        width="100%"
        height="75vh"
        title={
          <span
            style={{
              fontSize: "5vw",
              color:
                LuxuryFind(MobBusDetails?.Bus_Type_Name) === true
                  ? "#393939"
                  : "#1F4B7F",
            }}
          >
            Terms and Conditions
          </span>
        }
      >
        <span
          className={`text-[1.5vw] font-semibold `}
          style={{
            color:
              LuxuryFind(MobBusDetails?.Bus_Type_Name) === true
                ? "#393939"
                : "#1F4B7F",
          }}
        ></span>
        <div className="Legal-Information-Mobile overflow-y-auto max-h-screen px-[3vw] pt-[1vw]">
          {terms_conditions?.split("\r\n")?.map((line, index) => (
            <p
              key={index}
              style={{
                color:
                  LuxuryFind(MobBusDetails?.Bus_Type_Name) === true
                    ? "#393939"
                    : "#1F4B7F",
              }}
              className={`text-[4vw] pb-[0.75vw]`}
            >
              {line}
            </p>
          ))}
        </div>
      </Drawer>
    </div>
  );
}
