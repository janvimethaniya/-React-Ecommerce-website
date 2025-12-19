import React, { useState } from "react";
import "./css/ShopCategory.css";

const Shopcategory = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    alert("Message Sent!");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="contact-page">
      <h1>Contact Us</h1>
      <p>We'd love to hear from you! Fill out the form below.</p>

      <div className="contact-container">
        <form className="contact-form" onSubmit={handleSubmit}>
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label>Message</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows="5"
            required
          />

          <button type="submit">Send Message</button>
        </form>

        <div className="contact-info">
          <h3>Our Info</h3>
          <p><strong>Address:</strong> 123 Main Street, City, Country</p>
          <p><strong>Email:</strong> info@example.com</p>
          <p><strong>Phone:</strong> +91 1234567890</p>
        </div>
      </div>
    </div>
  );
};

export default Shopcategory;
