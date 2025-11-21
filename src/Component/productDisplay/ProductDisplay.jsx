import React, { useContext, useState } from 'react'
import './productdisplay.css'

import star_icon from '../Assets/star_icon.png'
import star_dull from '../Assets/star_dull_icon.png'
import { ShopContext } from '../../Context/Shopcontext'
import { useNavigate } from 'react-router-dom'

const ProductDisplay = ({ product }) => {
  const {addToCartWithSize} = useContext(ShopContext)
  const navigate = useNavigate()
  const [selectedSize, setSelectedSize] = useState('')

  const handleAddToCart = (id) => {
    if (!selectedSize) {
      alert('Please select a size')
      return
    }
    addToCartWithSize(id, selectedSize)
    navigate('/cart')
  }

  return (
    <div className='productdisplay'>
      
      <div className='productdisplay-left'>


        <div className='productdisplay-img'>
          <img
            className='productdisplay-main-img'
            src={product.image}
            alt=""
          />
        </div>
      </div>

      <div className='productdisplay-right'>
        <h1>{product.name}</h1>

        <div className='productdisplay-right-star'>
          <img src={star_dull} alt="" />
          <img src={star_dull} alt="" />
          <img src={star_dull} alt="" />
          <img src={star_dull} alt="" />
          <img src={star_dull} alt="" />
          <p>(122)</p>
        </div>
        <div className='productdisplay-right-prices'>
            <div className='productdisplay-right-price-old'>${product.old_price}</div>
             <div className='productdisplay-right-price-new'>${product.new_price}</div>
        </div>
        <div className='description'>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Assumenda hic omnis debitis magnam non aliquam asperiores molestiae. Aliquam, excepturi similique. Amet consequatur nisi eius odio, quos dicta asperiores nobis sunt?

        </div>
        <div className='size'>
        <h1>select size</h1>
        <div className='size'>
            <div className={`size-option ${selectedSize === 'S' ? 'active' : ''}`} onClick={() => setSelectedSize('S')}>S</div>
            <div className={`size-option ${selectedSize === 'M' ? 'active' : ''}`} onClick={() => setSelectedSize('M')}>M</div>
            <div className={`size-option ${selectedSize === 'L' ? 'active' : ''}`} onClick={() => setSelectedSize('L')}>L</div>
            <div className={`size-option ${selectedSize === 'XL' ? 'active' : ''}`} onClick={() => setSelectedSize('XL')}>XL</div>
            <div className={`size-option ${selectedSize === 'XXL' ? 'active' : ''}`} onClick={() => setSelectedSize('XXL')}>XXL</div>
        </div>
        </div>
        <button onClick={() => handleAddToCart(product.id)}>Add to cart</button>

        <p className='productdisplay-right-category'><span>Tags:</span> Modern latest</p>
       
        </div>
      </div>

   
  )
}

export default ProductDisplay
