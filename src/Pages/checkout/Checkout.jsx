// src/pages/Checkout.jsx
import React, { useState, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { ShopContext } from "./../../Context/Shopcontext";
import "./checkout.css";

const Checkout = () => {
  const { cartItems, all_product } = useContext(ShopContext);
  const navigate = useNavigate();

  const [address, setAddress] = useState({
    name: "",
    phone: "",
    line1: "",
    city: "",
    state: "",
    pincode: ""
  });

  const [errors, setErrors] = useState({});

  // Prepare cartProducts
  const cartProducts = useMemo(() => {
    return Object.entries(cartItems || {})
      .filter(([, item]) => item?.qty > 0)
      .map(([id, item]) => {
        const product = all_product.find((p) => Number(p.id) === Number(id));
        if (!product) return null;
        return {
          ...product,
          quantity: item.qty,
          size: item.size,
        };
      })
      .filter(Boolean);
  }, [cartItems, all_product]);

  const subtotal = cartProducts.reduce(
    (acc, item) => acc + item.new_price * item.quantity,
    0
  );

  const handleChange = (e) => {
    setAddress(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validateAndContinue = () => {
    const err = {};
    if (!address.name) err.name = "Name required";
    if (!address.phone) err.phone = "Phone required";
    if (!address.line1) err.line1 = "Address required";
    setErrors(err);
    if (Object.keys(err).length > 0) return;

    // go to payment page with state
    navigate("/payment", { state: { amount: subtotal, cartProducts, address } });
  };

  return (
    <div className="checkout-page">
      <div className="checkout-card">
        <div className="left-col">
          <h2>Shipping Information</h2>

          <label className="field">
            <span>Full name</span>
            <input name="name" value={address.name} onChange={handleChange} placeholder="ex: Janvi Patel" />
            {errors.name && <small className="err">{errors.name}</small>}
          </label>

          <label className="field">
            <span>Mobile number</span>
            <input name="phone" value={address.phone} onChange={handleChange} placeholder="10 digits" />
            {errors.phone && <small className="err">{errors.phone}</small>}
          </label>

          <label className="field">
            <span>House no / Street</span>
            <input name="line1" value={address.line1} onChange={handleChange} placeholder="House, street, landmark" />
            {errors.line1 && <small className="err">{errors.line1}</small>}
          </label>

          <div className="row">
            <label className="field small">
              <span>City</span>
              <input name="city" value={address.city} onChange={handleChange} />
            </label>

            <label className="field small">
              <span>State</span>
              <input name="state" value={address.state} onChange={handleChange} />
            </label>

            <label className="field small">
              <span>Pincode</span>
              <input name="pincode" value={address.pincode} onChange={handleChange} />
            </label>
          </div>

          <div className="actions">
            <button className="btn primary" onClick={validateAndContinue}>
              Continue to Payment — ₹{subtotal}
            </button>
            <button className="btn ghost" onClick={() => navigate(-1)}>
              Back to Cart
            </button>
          </div>
        </div>

        <div className="right-col">
          <h3>Order Summary</h3>

          <div className="summary-list">
            {cartProducts.length === 0 && <div className="empty">Your cart is empty</div>}
            {cartProducts.map(item => (
              <div className="summary-item" key={item.id}>
                <img src={item.image} alt={item.name} />
                <div className="meta">
                  <div className="name">{item.name}</div>
                  <div className="qty">Qty: {item.quantity} {item.size ? ` • ${item.size}` : ""}</div>
                </div>
                <div className="price">₹{item.new_price * item.quantity}</div>
              </div>
            ))}
          </div>

          <div className="summary-total">
            <div><strong>Total</strong></div>
            <div><strong>₹{subtotal}</strong></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
