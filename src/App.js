// src/App.js
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './Component/Navbar/Navbar';
import Footer from './Component/footer/Footer';
import Shop from './Pages/Shop';
import Shopcategory from './Pages/Shopcategory';
import Product from './Pages/Product';
import Cart from './Pages/Cart';
import Loginsignup from './Pages/Loginsignup';
import About from './Component/about/About';
import Checkout from './Pages/checkout/Checkout';
import Payment from './Component/payment/Payment';
import UPIPayment from './Component/payment/UPIPayment'; // Import UPI payment component

import ShopContextProvider from './Context/Shopcontext';

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

// Stripe public key
const stripePromise = loadStripe('pk_test_51Sd7Ww1A0zFWtvjAiBIlIMHuUmiwc4VzIsYMdDgGCtzkhDmi0JViQ2vN4GGiIg0AmUqbptJRjy0GZtAjNIKpDrns00TGOzrgE6');

const App = () => {
  return (
    <ShopContextProvider>
      <BrowserRouter>
        <Navbar />

        {/* Stripe wrapper only around payment routes */}
        <Elements stripe={stripePromise}>
          <Routes>
            <Route path="/" element={<Shop />} />
            <Route path="/contact" element={<Shopcategory />} />
            <Route path="/about" element={<About />} />
            <Route path="/product/:productId" element={<Product />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<Loginsignup />} />

            {/* Checkout and Payment */}
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/payment" element={<Payment />} />

            {/* UPI Payment Route */}
            <Route path="/upi-payment" element={<UPIPayment amount={500} />} />
          </Routes>
        </Elements>

        <Footer />
      </BrowserRouter>
    </ShopContextProvider>
  );
};

export default App;
