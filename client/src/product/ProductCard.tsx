import type {IProduct} from "./IProduct.ts";
import './Product.scss'
import {useNavigate} from "react-router";

const ProductCard = ({product}: { product: IProduct }) => {

  const {id, name, price, imageUrl, reviewCount} = product;

  const navigate = useNavigate();

  const viewDetail = () => {
    navigate(`/products/${id}`);

    console.log("View details for product:", id);
  }

  return (
      <div className="card-container">
        <div className="card">
          <img src={imageUrl} alt="Product" className="card-image"/>
          <div className="card-body">
            <div className="title">{name}</div>
            <div className="price">${price}</div>
            <div className="rating">★★★★☆ ({reviewCount})</div>
            <button className="view-details-button" onClick={() => viewDetail()}>View Details</button>
          </div>
        </div>
      </div>
  )
}

export default ProductCard