import React, { createContext, useState, useEffect } from "react";

export const ShopContext = createContext(null);

// Default empty cart generator
const getDefaultCart = () => {
  const cart = {};
  for (let i = 1; i <= 200; i++) {
    cart[i] = { qty: 0, size: "" };
  }
  return cart;
};

const ShopContextProvider = ({ children }) => {
  const [products, setProducts] = useState([]); // all products
  const [cartItems, setCartItems] = useState(getDefaultCart());

  // Clear Cart function
  const clearCart = () => {
    const newCart = getDefaultCart();
    setCartItems(newCart);

    if (localStorage.getItem("auth-token")) {
      // Reset cart in backend too
      fetch("http://localhost:7000/getcart", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("auth-token"),
        },
        body: JSON.stringify({}),
      });
    }
  };

  // ==========================
  // FETCH ALL PRODUCTS
  // ==========================
  useEffect(() => {
    fetch("http://localhost:7000/allproducts")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.log("Fetch Products Error:", err));

    // Fetch saved cart if logged in
    if (localStorage.getItem("auth-token")) {
      fetch("http://localhost:7000/getcart", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("auth-token"),
        },
        body: "",
      })
        .then((res) => res.json())
        .then((data) => setCartItems(data))
        .catch((err) => console.log("Cart Fetch Error:", err));
    }
  }, []);

  // ==========================
  // CART ACTIONS
  // ==========================
  const addToCart = (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: { qty: prev[itemId].qty + 1, size: prev[itemId].size },
    }));

    if (localStorage.getItem("auth-token")) {
      fetch("http://localhost:7000/addtocart", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("auth-token"),
        },
        body: JSON.stringify({ itemId }),
      });
    }
  };

  const addToCartWithSize = (id, size) => {
    setCartItems((prev) => {
      const existing = prev[id] || { qty: 0, size: size };
      return {
        ...prev,
        [id]: {
          qty: existing.qty + 1,
          size: size,
        },
      };
    });
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: { qty: Math.max(prev[itemId].qty - 1, 0), size: prev[itemId].size },
    }));

    if (localStorage.getItem("auth-token")) {
      fetch("http://localhost:7000/removefromcart", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("auth-token"),
        },
        body: JSON.stringify({ itemId }),
      });
    }
  };

  const setItemQuantity = (itemId, qty) => {
    const value = Math.max(0, Number(qty) || 0);
    setCartItems((prev) => ({
      ...prev,
      [itemId]: { qty: value, size: prev[itemId].size },
    }));
  };

  const deleteFromCart = (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: { qty: 0, size: "" },
    }));
  };

  // ==========================
  // TOTAL CART CALCULATIONS
  // ==========================
  const getTotalCartAmount = () => {
    let total = 0;
    for (let id in cartItems) {
      if (cartItems[id].qty > 0) {
        const product = products.find((p) => p.id == id);
        if (product) total += product.new_price * cartItems[id].qty;
      }
    }
    return total;
  };

  const getTotalItems = () => {
    let count = 0;
    for (let id in cartItems) count += cartItems[id].qty;
    return count;
  };

  const contextValue = {
    all_product: products,
    cartItems,
    addToCart,
    addToCartWithSize,
    removeFromCart,
    setItemQuantity,
    deleteFromCart,
    getTotalCartAmount,
    getTotalItems,
    clearCart,
  };

  return <ShopContext.Provider value={contextValue}>{children}</ShopContext.Provider>;
};

export default ShopContextProvider;
