import React from 'react'
import { Link } from 'react-router-dom'
import './item.css'

const Item = ({ item, id, name, image, new_price, old_price }) => {
  // Support both object and individual props
  const itemData = item || { id, name, image, new_price, old_price };
  
  return (
    <div className="item">
      <Link to={`/product/${itemData.id}`}>
        <img onClick={window.scrollTo(0,0)} src={itemData.image} alt="" />
      </Link>

      <p>{itemData.name}</p>
      <div className="prices">
        <span className="new">${itemData.new_price}</span>
        <span className="old">${itemData.old_price}</span>
      </div>
    </div>
  )
}

export default Item
