import React from "react";
import "./popular.css";

// 🔥 IMPORT IMAGES FROM TOP
import img1 from "../Assets/img1.jpg";
import img2 from "../Assets/img2.jpg";
import img3 from "../Assets/img3.jpg";
import img4 from "../Assets/img4.jpg";
import img5 from "../Assets/img5.jpg";


const Popular = () => {
  return (
    <div className="popular-section">
      <h2 className="popular-title">✨ Popular Collections</h2>

      <div className="popular-grid">

        <div className="popular-card"><img src={img1} alt="" /></div>
        <div className="popular-card"><img src={img2} alt="" /></div>
        <div className="popular-card"><img src={img3} alt="" /></div>
        <div className="popular-card"><img src={img4} alt="" /></div>
        <div className="popular-card"><img src={img5} alt="" /></div>
       

      </div>
    </div>
  );
};

export default Popular;
