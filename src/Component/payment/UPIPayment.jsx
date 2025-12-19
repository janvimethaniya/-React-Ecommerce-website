import React, { useState, useEffect } from "react";
import { QRCodeSVG } from "qrcode.react";
import axios from "axios";

const UPIPayment = ({ amount }) => {
  const [paymentIntentId, setPaymentIntentId] = useState("");
  const [upiQR, setUpiQR] = useState("");

  const handleUPIPayment = async () => {
    try {
      const res = await axios.post("http://localhost:7000/create-payment", { amount });
      const { paymentIntentId } = res.data; // only use paymentIntentId
      setPaymentIntentId(paymentIntentId);

      const qrString = `upi://pay?pa=merchant-vpa@upi&pn=MerchantName&am=${amount}&cu=INR&tr=${paymentIntentId}`;
      setUpiQR(qrString);
    } catch (err) {
      console.log("Error creating payment:", err);
    }
  };

  // Optional: Poll payment status
  useEffect(() => {
    if (!paymentIntentId) return;

    const interval = setInterval(async () => {
      try {
        const res = await axios.post("http://localhost:7000/check-payment", { paymentIntentId });
        if (res.data.status === "succeeded") {
          alert("Payment Successful!");
          clearInterval(interval);
        }
      } catch (err) {
        console.log(err);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [paymentIntentId]);

  return (
    <div style={{ textAlign: "center", marginTop: 50 }}>
      <h2>Pay via UPI</h2>
      {!upiQR && (
        <button onClick={handleUPIPayment} style={{ padding: "10px 20px", fontSize: 16 }}>
          Generate UPI QR
        </button>
      )}
      {upiQR && (
        <div>
          <p>Scan this QR with your UPI app to pay ₹{amount}</p>
          <QRCodeSVG value={upiQR} size={250} />
        </div>
      )}
    </div>
  );
};

export default UPIPayment;
