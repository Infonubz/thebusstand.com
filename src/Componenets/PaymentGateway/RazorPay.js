import React, { useState, useEffect } from "react";
import "../../App.css"
export const RazorpayGateway = ({ amount }) => {
  const handlePayment = () => {
    if (!amount) {
      alert("Please enter an amount");
      return;
    }
    const options = {
        key: "rzp_test_eyuWUoPChgfzBC",
        amount: amount * 1, 
        currency: "INR",
        name: "THEBUSSTAND.COM",
        description: "For testing purposes",
        handler: function (response) {
          alert(`Payment ID: ${response.razorpay_payment_id}`);
        },
        prefill: {
          name: "Velmurugan",
          email: "nubiznezakr@gmail.com",
          contact: "8190098951",
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#1F4B7F",
        },
        modal: {
          escape: false, // Prevents accidental closing
          backdropclose: false, // Prevents closing by clicking outside
          handleback: true, // Handles back button behavior on mobile
        },
      };
      

    const pay = new window.Razorpay(options);
    pay.open();
  };

  return <button onClick={handlePayment}>Submit</button>;
};


