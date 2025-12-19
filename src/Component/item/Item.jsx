import React from 'react';
import { Link } from 'react-router-dom';
import './item.css';

const Item = ({ item, id, name, image, new_price, old_price }) => {
 
  const itemData = item || { id, name, image, new_price, old_price };

  
  const imageURL = itemData.image?.startsWith("http")
    ? itemData.image
    : `http://localhost:7000/${itemData.image}`;

  return (
    <div className="item">
      <Link to={`/product/${itemData.id}`}>
        <img
          onClick={() => window.scrollTo(0, 0)}
          src={imageURL}
          alt={itemData.name}
        />
      </Link>

      <p>{itemData.name}</p>
      <div className="prices">
        <span className="new">Rs.{itemData.new_price}</span>
        <span className="old">Rs.{itemData.old_price}</span>
      </div>
    </div>
  );
};

export default Item;
