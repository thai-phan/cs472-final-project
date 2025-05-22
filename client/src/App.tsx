import React, {useEffect, useState} from 'react'
import './App.css'
import type {IProduct} from './product/IProduct.ts';
import ProductCard from "./product/ProductCard.tsx";


function App() {
  const [products, setProducts] = useState<IProduct[]>([])


  const loadData = () => {
    fetch("http://localhost:3000/products")
        .then(response => response.json()).then(data => setProducts(data))
  }

  useEffect(() => {
    loadData()
  }, []);

  return (
      <div>
        <h1 className="header">
          Product Review
        </h1>
        <div className={"layout-grid"}>
          <div className={"border"}>
            <div>
              {
                  products && products.map((product, idx) => <ProductCard key={idx} product={product}/>)
              }
            </div>
          </div>
        </div>
      </div>
  )
}

export default App
