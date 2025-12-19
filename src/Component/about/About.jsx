
import React from "react";
import "./About.css";
import about from "../Assets/about.jpg";
const About = () => {
  return (
    <div className="about-page">

      {/* HERO SECTION */}
      <section className="about-hero">
        <h1>About Our Fashion Store</h1>
        <p>Your Style • Your Comfort • Your Identity</p>
      </section>

      {/* ABOUT MAIN CONTENT */}
      <section className="about-section">

        <div className="about-image">
          <img src={about} alt="About Us" />
        </div>

        <div className="about-text">
          <h2>Who We Are</h2>
          <p>
            We are a premium clothing brand offering trendy, high-quality, and
            comfortable outfits. Our priority is delivering quality-tested
            products that make you feel confident every day.
          </p>

          <p>
            Since 2018, over <b>50,000+ customers</b> have trusted us. We bring new
            collections every single week to keep your style always updated!
          </p>
        </div>

      </section>

      {/* WHY CHOOSE US */}
      <section className="features">
        <h2>Why Choose Us?</h2>

        <div className="feature-boxes">
          <div className="feature-card">
            <h3>Premium Quality</h3>
            <p>Each outfit is made with top-grade fabric and detail inspection.</p>
          </div>

          <div className="feature-card">
            <h3>Fast Delivery</h3>
            <p>Quick delivery at your doorstep with safe packaging.</p>
          </div>

          <div className="feature-card">
            <h3>Affordable Prices</h3>
            <p>Trendy fashion that fits your budget perfectly.</p>
          </div>

          <div className="feature-card">
            <h3>Weekly New Collection</h3>
            <p>Latest designs added every week to keep you stylish.</p>
          </div>
        </div>
      </section>

    </div>
  );
};

export default About;
