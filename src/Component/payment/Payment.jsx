import React, { useEffect, useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { ShopContext } from "../../Context/Shopcontext";
import './payment.css';
import qr from '../Assets/qr1.jpeg'
const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const { clearCart } = useContext(ShopContext);
  const state = location.state || {};
  const amount = state.amount || 0;
  const cartProducts = state.cartProducts || [];
  const address = state.address || {};
  const [method, setMethod] = useState("card");
  const [loading, setLoading] = useState(false);
  const [qrImage, setQrImage] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // redirect if invalid access
  useEffect(() => {
    if (!amount || cartProducts.length === 0) {
      navigate("/cart");
    }
  }, [amount, cartProducts, navigate]);

  /* ---------------- CREATE PAYMENT INTENT (CARD) ---------------- */
  const createPaymentIntent = async () => {
    try {
      const res = await fetch("http://localhost:7000/create-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount }),
      });
      return await res.json();
    } catch (err) {
      setErrorMsg("Stripe server error");
      setLoading(false);
    }
  };

  /* ---------------- SAVE ORDER ---------------- */
  const saveOrder = async (paymentResult) => {
    const body = {
      cartItems: cartProducts,
      totalAmount: amount,
      paymentId: paymentResult?.id || paymentResult?.paymentId || "COD_" + Date.now(),
      status: paymentResult?.status || "pending",
      address,
    };

    const token = localStorage.getItem("auth-token");

    try {
      const res = await fetch("http://localhost:7000/save-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token && { "auth-token": token }),
        },
        body: JSON.stringify(body),
      });
      return await res.json();
    } catch (err) {
      setErrorMsg("Order save failed");
      setLoading(false);
    }
  };

  /* ================= CARD PAYMENT ================= */
 const handleCardPay = async (e) => {
  e.preventDefault();
  setLoading(true);
  setErrorMsg("");

  try {
    const { clientSecret } = await createPaymentIntent(); // ✅ correct key

    if (!clientSecret) {
      throw new Error("Client secret not received");
    }

    const card = elements.getElement(CardElement);
    if (!card) throw new Error("Card input not loaded");

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: { card },
    });

    if (result.error) {
      setErrorMsg(result.error.message);
    } else if (result.paymentIntent?.status === "succeeded") {
      await saveOrder(result.paymentIntent);
      clearCart();
      setSuccessMsg("Card payment successful!");
      setTimeout(() => navigate("/orders"), 1500);
    }
  } catch (err) {
    setErrorMsg(err.message || "Payment failed");
  } finally {
    setLoading(false);
  }
};

  /* ================= UPI PAYMENT (QR MOCK) ================= */
  const handleUpiPay = () => {
    setLoading(true);
    setErrorMsg("");
    const upiId = "prysmor@upi";
    const shopName = "prysmor";

    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=upi://pay?pa=${upiId}&pn=${shopName}&am=${amount}&cu=INR`;

    setTimeout(() => {
      setQrImage(qrUrl);
      setLoading(false);
    }, 500);
  };

  const verifyUpiPayment = async () => {
    setLoading(true);
    setErrorMsg("");
    try {
      await saveOrder({
        paymentId: "UPI_" + Date.now(),
        status: "succeeded",
      });
      clearCart();
      setSuccessMsg("UPI payment successful!");
      setTimeout(() => navigate("/orders"), 1500);
    } catch {
      setErrorMsg("UPI verification failed");
    } finally {
      setLoading(false);
    }
  };

  /* ================= COD PAYMENT ================= */
  const handleCOD = async () => {
    setLoading(true);
    setErrorMsg("");
    try {
      await saveOrder({
        paymentId: "COD_" + Date.now(),
        status: "cod",
      });
      clearCart();
      setSuccessMsg("Order placed with Cash on Delivery!");
      setTimeout(() => navigate("/orders"), 1500);
    } catch {
      setErrorMsg("COD failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="payment-page">
      <div className="payment-card">
        {/* LEFT */}
        <div className="pay-left">
          <h2>Pay ₹{amount}</h2>

          <div className="address-box">
            <strong>Shipping Address</strong>
            <div>{address.name} • {address.phone}</div>
            <div>{address.line1}, {address.city}</div>
            <div>{address.state} - {address.pincode}</div>
          </div>

          <div className="payment-options">
            <button className={method === "card" ? "opt active" : "opt"} onClick={() => setMethod("card")}>💳 Card</button>
            <button className={method === "upi" ? "opt active" : "opt"} onClick={() => setMethod("upi")}>🔶 UPI</button>
            <button className={method === "cod" ? "opt active" : "opt"} onClick={() => setMethod("cod")}>📦 COD</button>
          </div>

          {/* CARD */}
          {method === "card" && (
            <form onSubmit={handleCardPay}>
              <div className="card-box"><CardElement /></div>
              <button className="btn" disabled={!stripe || loading}>{loading ? "Processing..." : `Pay ₹${amount}`}</button>
            </form>
          )}

          {/* UPI */}
          {method === "upi" && (
            <div className="upi-area">
              <button className="btn" onClick={handleUpiPay} disabled={loading}>
                {loading ? "Generating QR..." : "Generate UPI QR"}
              </button>
              {qrImage && (
                <div className="qr-area">
                  <h4>Scan QR with PhonePe / GPay / Paytm</h4>
                  <img src={qr} alt="UPI QR" />
                  <button className="btn ghost" onClick={verifyUpiPayment}>I have paid — Verify</button>
                </div>
              )}
            </div>
          )}

          {/* COD */}
          {method === "cod" && (
            <button className="btn" onClick={handleCOD}>Place COD Order</button>
          )}

          {errorMsg && <div className="msg error">{errorMsg}</div>}
          {successMsg && <div className="msg success">{successMsg}</div>}
        </div>
        {/* RIGHT */}
        <div className="pay-right">
          <h3>Order Summary</h3>
          <div className="summary-scroll">
            {cartProducts.map((it) => (
              <div className="summary-line" key={it.id}>
                <img src={it.image} alt={it.name} />
                <div className="meta">
                  <div>{it.name}</div>
                  <div>Qty: {it.quantity}</div>
                </div>
                <div>₹{it.new_price * it.quantity}</div>
              </div>
            ))}
          </div>
          <div className="summary-bottom">
            <div className="row">
              <div>Total</div>
              <strong>₹{amount}</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
