import type {IProduct} from "./IProduct.ts";
import './Product.scss'
import {useNavigate, useParams} from "react-router";
import {useEffect, useState} from "react";
import ReviewWrapper from "../review/ReviewWrapper.tsx";

const ProductPage = () => {

  const [product, setProduct] = useState<IProduct>({} as IProduct);

  const {id} = useParams();

  const navigate = useNavigate();

  const loadData = () => {
    fetch(`http://localhost:3000/products/${id}`).then(res => res.json()).then(json => {
      console.log(json)
      setProduct(json)
    })
  }

  useEffect(() => {
    loadData()
  }, []);

  return (
      <>
        <div className="product-page">
          <div className="product-detail">
            <div className="image-section">
              <img src={product.imageUrl} alt="Product"/>
            </div>
            <div className="info-section">
              <div className="title">{product.name}</div>
              <div className="rating">★★★★☆ ({product.reviewCount} ratings)</div>
              <div className="price">{product.price}</div>
              <div className="description">
                {product.description}
              </div>
            </div>
          </div>

          <div>
            {id && <ReviewWrapper id={id}/>}
          </div>
        </div>

      </>
  )
}

export default ProductPage