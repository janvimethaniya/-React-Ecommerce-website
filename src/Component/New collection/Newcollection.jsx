import React from 'react'
import './newcollection.css'

import img1 from '../Assets/product_145.avif'
import img2 from '../Assets/product_146.avif'
import img3 from '../Assets/product_148.avif'
import img4 from '../Assets/product_147.avif'
import img5 from '../Assets/product_149.avif'
import img6 from '../Assets/product_150.avif'

const NewCollection = () => {

    const collectionData = [
        { id: 1, img: img1, name: "Modern women's kurti", price: "₹799" },
        { id: 2, img: img2, name: "Women's Frock ", price: "₹1499" },
        { id: 3, img: img3, name: "Men's Shirt", price: "₹699" },
        { id: 4, img: img4, name: "Designing Top", price: "₹1999" },
        { id: 5, img:  img5 , name: " Men's Jacket", price: "₹999" },
        { id: 6, img:  img6 , name: "Casual Hoodie", price: "₹899" },
    ]

  return (
    <div className="new-collection">
      <h1>New Collection</h1>
      <p>Fresh styles curated just for you</p>

      <div className="collection-grid">
        {collectionData.map((item) => (
          <div className="collection-card" key={item.id}>
            <img src={item.img} alt={item.name} />
            <h3>{item.name}</h3>
            <span>{item.price}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default NewCollection
