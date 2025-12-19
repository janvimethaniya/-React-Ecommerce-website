import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../Context/Shopcontext"
import ProductDisplay from "../Component/productDisplay/ProductDisplay" 

const Product = () => {
  const { productId } = useParams();
  const { all_product } = useContext(ShopContext);

  const product = all_product.find((p) => p.id == productId);

  return (
    <div>
      {product ? <ProductDisplay product={product} /> : <h2>Product not found</h2>}
    </div>
  );
};

export default Product;
