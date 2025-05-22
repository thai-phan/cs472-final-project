import type {IProduct} from "./IProduct.ts";
import './Product.scss'
import {useNavigate, useParams} from "react-router";
import {createContext, useCallback, useEffect, useState} from "react";
import ReviewWrapper from "../review/ReviewWrapper.tsx";
import ReactMarkdown from 'react-markdown';

export const ProductContext = createContext<{ loadData: () => void }>({
  loadData: () => {
  }
});

export const ShowStar = (rating: number) => {
  const round = Math.round(rating);
  return "★".repeat(round) + "☆".repeat(5 - round);
}

const ProductPage = () => {

  const [product, setProduct] = useState<IProduct>({} as IProduct);
  const [analyzeResult, setAnalyzeResult] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const {id} = useParams();

  const navigate = useNavigate();

  const analyze = () => {
    setLoading(true)
    setAnalyzeResult("")
    fetch(`http://localhost:3000/products/analysis?name=${product.name}&price=${product.price}`).then(res => res.json()).then(json => {
      console.log(json)
      setAnalyzeResult(json)
      setLoading(false)
    }).catch(err => {
      console.error(err)
      setAnalyzeResult("Error: " + err.message)
      setLoading(false)
    })
  }

  const loadData = useCallback(() => {
    fetch(`http://localhost:3000/products/${id}`).then(res => res.json()).then(json => {
      console.log(json)
      setProduct(json)
    })
  }, [id])

  useEffect(() => {
    loadData()
  }, [loadData]);

  return (
      <ProductContext value={{loadData}}>
        <h2 className="header" onClick={() => navigate('/')}>
          <img height={50} width={50} className={"inline"} src="../../public/home.svg" alt=""/>
          Home</h2>
        <div className="product-page">
          <div className="product-detail">
            <div className="image-section">
              <img src={product.imageUrl} alt="Product"/>
            </div>
            <div className="info-section">
              <div className="title">{product.name}</div>
              <div className="item-rating">{ShowStar(product.averageRating)} ({product.reviewCount} ratings)</div>
              <div className="price">${product.price}</div>
              <div className="description">
                {product.description}
              </div>
              <div className={"mb-3"}>
                <button className={"btn"} onClick={analyze}>Analyze price with AI tool
                  {
                      loading &&
                      <span className="loading loading-spinner loading-xl"></span>
                  }
                </button>
              </div>


              <ReactMarkdown>{analyzeResult}</ReactMarkdown>

            </div>
          </div>

          <div>
            {id && <ReviewWrapper id={id}/>}
          </div>
        </div>
      </ProductContext>
  )
}

export default ProductPage