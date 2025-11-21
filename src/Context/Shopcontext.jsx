import { createContext } from "react";
import all_product from '../Component/Assets/all_product';
import { useState, useEffect } from "react";

export const ShopContext = createContext(null);

// Build default cart keyed by product id with qty and size
const getDefaultCart = () => {
  const cart = {}
  for (const p of all_product) {
    cart[p.id] = { qty: 0, size: '' }
  }
  return cart
}

// Retrieve cart from localStorage or return default
const getCartFromStorage = () => {
  try {
    const saved = localStorage.getItem('shopCart')
    if (saved) {
      return JSON.parse(saved)
    }
  } catch (e) {
    console.error('Error reading cart from localStorage:', e)
  }
  return getDefaultCart()
}

const ShopContextProvider = (props) => {
  const [cartItems, setCartItems] = useState(getCartFromStorage())

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('shopCart', JSON.stringify(cartItems))
    } catch (e) {
      console.error('Error saving cart to localStorage:', e)
    }
  }, [cartItems])

  // increment quantity by 1 (keep existing size)
  const addToCart = (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: {
        qty: ((prev[itemId]?.qty) || 0) + 1,
        size: prev[itemId]?.size || ''
      }
    }))
  }

  // add to cart with specified size
  const addToCartWithSize = (itemId, size) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: {
        qty: ((prev[itemId]?.qty) || 0) + 1,
        size: size
      }
    }))
  }

  // decrement quantity by 1 (not below 0)
  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: {
        qty: Math.max(((prev[itemId]?.qty) || 0) - 1, 0),
        size: prev[itemId]?.size || ''
      }
    }))
  }

  // set exact quantity for an item (qty >= 0)
  const setItemQuantity = (itemId, qty) => {
    const normalized = Math.max(0, Number(qty) || 0)
    setCartItems((prev) => ({
      ...prev,
      [itemId]: {
        qty: normalized,
        size: prev[itemId]?.size || ''
      }
    }))
  }

  // remove item from cart (set qty to 0)
  const deleteFromCart = (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: { qty: 0, size: '' }
    }))
  }

  const getTotalCartAmount = () => {
    let totalAmount = 0
    for (const itemId in cartItems) {
      const item = cartItems[itemId]
      const qty = item?.qty || 0
      if (qty > 0) {
        const itemInfo = all_product.find((product) => Number(product.id) === Number(itemId))
        if (itemInfo) totalAmount += itemInfo.new_price * qty
      }
    }
    return totalAmount
  }

  const getTotalItems = () => {
    let total = 0
    for (const itemId in cartItems) {
      const qty = cartItems[itemId]?.qty || 0
      total += qty
    }
    return total
  }

  const contextValue = {
    all_product,
    cartItems,
    addToCart,
    addToCartWithSize,
    removeFromCart,
    setItemQuantity,
    deleteFromCart,
    getTotalCartAmount,
    getTotalItems,
  }

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  )
}

export default ShopContextProvider;
