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
        <li onClick={()=>{setMenu("shop")}}><Link to='/'>Shop <hr /></Link></li>
        <li onClick={()=>{setMenu("about")}}><Link to='/About'>About</Link></li>
        <li onClick={()=>{setMenu("contact")}}><Link to='/Contact'>Contact</Link></li>

    </ul>
    <div className='nav-login-cart'>
      {localStorage.getItem('auth-token')
      ?<button onClick={()=>{localStorage.removeItem('auth-token');window.location.replace('/')}}>Logout</button>
      :<Link to='/login'>  <button>Login</button></Link>}
      
        <Link to='/cart'>  <img src={cart_icon} alt="" /></Link>
        <div className='nav-cart-count'>{totalItems}</div>
    </div>

        </div>
      </div>
  )
}

export default Navbar
