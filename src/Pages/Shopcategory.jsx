import React, { useContext } from 'react'
import './css/ShopCategory.css'
import { ShopContext } from '../Context/Shopcontext'
import dropdown_icon from '../Component/Assets/dropdown_icon.png'
import { Link } from 'react-router-dom'

const Shopcategory = (props) => {

  const { all_product } = useContext(ShopContext)

  return (
    <div className='shop-category'>

      {/* Banner */}
      <img src={props.banner} alt="" />

      {/* Sort Section */}
      <div className='shopcategory-indexSort'>
        <p>
          <span>Showing 1-12</span> out of 36 products
        </p>

        <div className='shopcategory--sort'>
          Sort by
          <img src={dropdown_icon} alt="" />
        </div>
      </div>

      {/* Product List */}
      <div className='shopcategory-products'>
        {all_product?.length > 0 &&
          all_product.map((item, i) => {
            if (props.category && props.category === item.category) {
              return (
                <div className="product-box" key={i}>

                  <Link to={`/product/${item.id}`}>
                    <img src={item.image} alt="" />
                  </Link>

                  <h3>{item.name}</h3>
                  <p>₹{item.new_price}</p>

                </div>
              )
            } else {
              return null
            }
          })
        }
      </div>

    </div>
  )
}

export default Shopcategory
