import React from 'react'
import './description.css'

const Description = () => {
  return (
    <div className='descriptionbox'>
      <div className='descriptionbox-navigator'>
        <div className='descriptionbox-nav-box'>Description</div>
        <div className='descriptionbox-nav-box fade'>Reviews (122)</div>
      </div>
      <div className='descriptionbox-description'>
        <p>
          An e-commerce website is an online platform that allows businesses to sell products 
          and services to customers over the internet. It provides a convenient shopping experience 
          where customers can browse, search, and purchase items from the comfort of their homes. 
          E-commerce websites typically include features like product catalogs, shopping carts, 
          secure payment gateways, and customer reviews.
        </p>
        <p>
          Our high-quality products are carefully selected and sourced from trusted suppliers. 
          We ensure that every item meets our standards for quality, durability, and style. 
          With our extensive collection, you're sure to find exactly what you're looking for.
        </p>
      </div>
    </div>
  )
}

export default Description
