import React, { useContext, useState } from "react";
import "./productdisplay.css";
import star_icon from "../Assets/star_icon.png";
import star_dull from "../Assets/star_dull_icon.png";
import { ShopContext } from "../../Context/Shopcontext";
import { useNavigate } from "react-router-dom";

const ProductDisplay = ({ product }) => {
  const { addToCartWithSize } = useContext(ShopContext);
  const navigate = useNavigate();
  const [selectedSize, setSelectedSize] = useState("");

  const handleAddToCart = (id) => {
    if (!selectedSize) {
      alert("Please select a size");
      return;
    }
    addToCartWithSize(id, selectedSize);
    navigate("/cart");
  };
  return (
    <div className="productdisplay">
      <div className="productdisplay-left">
        <div className="productdisplay-img">
          <img
            className="productdisplay-main-img"
            src={product.image || product.img} 
            alt={product.name}
          />
        </div>
      </div>

      <div className="productdisplay-right">
        <h1>{product.name}</h1>

        <div className="productdisplay-right-star">
          {[...Array(5)].map((_, idx) => (
            <img key={idx} src={star_dull} alt="" />
          ))}
          <p>(122)</p>
        </div>

        <div className="productdisplay-right-prices">
          <div className="productdisplay-right-price-old">${product.old_price}</div>
          <div className="productdisplay-right-price-new">${product.new_price}</div>
        </div>

        <div className="description">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit...
        </div>

        <div className="size">
          <h1>Select size</h1>
          <div className="size-options">
            {["S", "M", "L", "XL", "XXL"].map((size) => (
              <div
                key={size}
                className={`size-option ${selectedSize === size ? "active" : ""}`}
                onClick={() => setSelectedSize(size)}
              >
                {size}
              </div>
            ))}
          </div>
        </div>

        <button onClick={() => handleAddToCart(product.id)}>Add To Cart</button>

        <p className="productdisplay-right-category">
          <span>Tags:</span> Modern latest
        </p>
      </div>
    </div>
  );
};

export default ProductDisplay;
