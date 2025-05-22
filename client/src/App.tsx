import React, {useEffect, useState} from 'react'
import './App.css'
import type {IProduct} from './product/IProduct.ts';
import ProductCard from "./product/ProductCard.tsx";
import SearchPanel from "./product/SearchPanel.tsx";


function App() {
  const [products, setProducts] = useState<IProduct[]>([])


  const loadData = () => {
    fetch("http://localhost:3000/products")
        .then(response => response.json())
        .then(data => setProducts(data))
  }

  useEffect(() => {
    loadData()
  }, []);

  return (
      <div>
        <h1 className="header mb-5">
          Product Review
        </h1>
        <div className={"flex border p-2"}>
          <div className={"flex-1/4 mr-3"}>
            <SearchPanel setProducts={setProducts}/>
          </div>
          <div className={"flex-3/4"}>
            <h2 className={"text-xl"}>Product List</h2>
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

        </div>
      </div>

  )
}

export default App
