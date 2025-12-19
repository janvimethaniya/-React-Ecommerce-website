import React, { useEffect, useState } from "react";
import "./newcollection.css";
import { useNavigate } from "react-router-dom";

const NewCollection = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [activeFilter, setActiveFilter] = useState("all");
  const navigate = useNavigate();

  // 🔹 Fetch all products from admin panel API
  const fetchProducts = async () => {
    try {
      const res = await fetch("http://localhost:7000/allproducts");
      const data = await res.json();
      // Normalize category to lowercase
      const normalized = data.map(item => ({
        ...item,
        category: item.category ? item.category.toLowerCase() : "other"
      }));
      setAllProducts(normalized);
      setFilteredProducts(normalized);
    } catch (err) {
      console.log("Fetch Error:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // 🔹 Filter function (case-insensitive)
  const handleFilter = (category) => {
    setActiveFilter(category);
    if (category === "all") {
      setFilteredProducts(allProducts);
    } else {
      const filtered = allProducts.filter(
        item => item.category === category.toLowerCase()
      );
      setFilteredProducts(filtered);
    }
  };

  return (
    <div className="new-collection">
      <h1>New Collection</h1>
      <p>Fresh styles curated just for you</p>

      {/* 🔘 Filter Buttons */}
      <div className="filter-buttons">
        {["all", "women", "man", "kids"].map((cat) => (
          <button
            key={cat}
            className={activeFilter === cat ? "active" : ""}
            onClick={() => handleFilter(cat)}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      {/* 🔹 Products Grid */}
      <div className="collection-grid">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((item) => (
            <div
              className="collection-card"
              key={item.id || item._id}
              onClick={() => navigate(`/product/${item.id || item._id}`)}
            >
              <img src={item.image || item.img} alt={item.name} />
              <h3>{item.name}</h3>
              <span>₹{item.new_price}</span>
            </div>
          ))
        ) : (
          <p>No products found</p>
        )}
      </div>
    </div>
  );
};

export default NewCollection;
