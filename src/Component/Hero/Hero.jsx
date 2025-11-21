import React from 'react'
import hero from '../Assets/hero_image.png'
import './hero.css'

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-content">
        
        <span className="tag">New Season • 2025</span>

        <h1 className="title">
          Discover Your <br />
          Perfect Style
        </h1>

        <p className="desc">
          Trendy collections crafted for modern fashion lovers.
        </p>

        <button className="shop-btn">Shop Now</button>
      </div>

      <div className="hero-img-wrapper">
        <div className="bg-circle"></div>
        <img src={hero} alt="hero" className="hero-main-img" />
      </div>
    </section>
  )
}

export default Hero
