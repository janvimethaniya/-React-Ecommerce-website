import React from 'react'
import { useParams } from 'react-router-dom'
import all_product from '../Component/Assets/all_product'
import ProductDisplay from '../Component/productDisplay/ProductDisplay'
import Description from '../Component/Descriptionbox/Description'

const Product = () => {

  const { productId } = useParams()
  const product = all_product.find(p => p.id === Number(productId))

  return (
    <div>
      <ProductDisplay product={product} />
    <Description />

    </div>
  )
}

export default Product
