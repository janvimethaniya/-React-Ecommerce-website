import React from 'react'
import Navbar from './Component/Navbar/Navbar'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Shopcategory from './Pages/Shopcategory'
import Product from './Pages/Product'
import Cart from './Pages/Cart'
import Loginsignup from './Pages/Loginsignup'
import Shop from './Pages/Shop'
import Footer from './Component/footer/Footer'

// ⭐ IMPORT CONTEXT PROVIDER
import ShopContextProvider from './Context/Shopcontext'

// ⭐ Banner images
import men_banner from './Component/Assets/banner_mens.png'
import women_banner from './Component/Assets/banner_women.png'
import kids_banner from './Component/Assets/banner_kids.png'

const App = () => {
  return (
   
    <ShopContextProvider>
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route path='/' element={<Shop />} />
          <Route path='/mens' element={<Shopcategory category="men" banner={men_banner} />} />
          <Route path='/womens' element={<Shopcategory category="women" banner={women_banner} />} />
          <Route path='/kids' element={<Shopcategory category="kid" banner={kids_banner} />} />
          <Route path='/product/:productId' element={<Product />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/login' element={<Loginsignup />} />
        </Routes>

        <Footer />
      </BrowserRouter>
    </ShopContextProvider>
  )
}

export default App
