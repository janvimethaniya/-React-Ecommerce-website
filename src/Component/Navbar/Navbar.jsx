import React, { useState, useContext } from 'react'
import './navbar.css'
import logo from '../Assets/logoo.jpg'
import cart_icon from '../Assets/cart_icon.png'
import { Link } from 'react-router-dom'
import { ShopContext } from '../../Context/Shopcontext'

const Navbar = () => {
   const [menu, setMenu] = useState("shop")
   const { getTotalItems } = useContext(ShopContext)
   const totalItems = getTotalItems()

  return (
   
    <div className='navbar'>
        <div className='nav-logo'>
            <img src={logo} alt="" />
    <ul className='nav-menu'>
        <li onClick={()=>{setMenu("shop")}}><Link to='/'>shop <hr /></Link></li>
        <li onClick={()=>{setMenu("mens")}}><Link to='/mens'>men</Link></li>
        <li onClick={()=>{setMenu("womens")}}><Link to='/womens'>women</Link></li>
        <li onClick={()=>{setMenu("kids")}}><Link to='/kids'>kids</Link></li>
    </ul>
    <div className='nav-login-cart'>
      <Link to='/login'>  <button>Login</button></Link>
        <Link to='/cart'>  <img src={cart_icon} alt="" /></Link>
        <div className='nav-cart-count'>{totalItems}</div>
    </div>

        </div>
      
    </div>
  )
}

export default Navbar
