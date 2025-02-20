import React, { useEffect, useState } from "react";
import { RazorpayGateway } from "./RazorPay";

export default function RazorPayindex() {

  const [amount, setAmount] = useState(100);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://razorpay.me/@ratraveltechprivatelimited";
    script.async = true;
    script.onload = () => console.log("Razorpay Loaded");
    document.body.appendChild(script);
  }, []);
  

  return (
    <div>
      <RazorpayGateway amount1={amount} />
    </div>
  );
}
