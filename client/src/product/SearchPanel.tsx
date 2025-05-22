import React, {type Dispatch, type SetStateAction} from "react";
import type {IProduct} from "./IProduct.ts";


const SearchPanel = ({setProducts}: { setProducts: Dispatch<SetStateAction<IProduct[]>> }) => {
  const [searchText, setSearchText] = React.useState<string>("");
  const [elect, setElect] = React.useState<boolean>(false);
  const [home, setHome] = React.useState<boolean>(false);
  const [clothing, setClothing] = React.useState<boolean>(false);
  const [other, setOther] = React.useState<boolean>(false);

  const searchProduct = () => {
    let url = `http://localhost:3000/products/search?`
    if (searchText !== "") {
      url += `q=${searchText}&`
    }
    url += `&category=${elect ? "electronics" : ""}${clothing ? ",clothing" : ""}${home ? ",home" : ""}${other ? ",other" : ""}`
    fetch(url)
        .then(response => response.json())
        .then(data => setProducts(data))
  }


  return (
      <div>
        <div className={""}>
          <div>Search and filter</div>
          <input type="text" className={"input"} value={searchText} onChange={(e) => setSearchText(e.target.value)}/>
        </div>

        <fieldset className="fieldset bg-base-100 border-base-300 rounded-box w-64 border p-4">
          <legend className="fieldset-legend">Select category</legend>
          <label className="label">
            <input type="checkbox" checked={elect} className="checkbox" onChange={(e) => setElect(e.target.checked)}/>
            Electronics
          </label>
          <label className="label">
            <input type="checkbox" checked={clothing} className="checkbox"
                   onChange={(e) => setClothing(e.target.checked)}/>
            Clothing
          </label>
          <label className="label">
            <input type="checkbox" checked={home} className="checkbox" onChange={(e) => setHome(e.target.checked)}/>
            Home
          </label>
          <label className="label">
            <input type="checkbox" checked={other} className="checkbox" onChange={(e) => setOther(e.target.checked)}/>
            Other
          </label>
        </fieldset>
        <div className={"mt-3"}>
          <button className={"btn"} onClick={searchProduct}>Apply</button>
        </div>
      </div>
  )
}

export default SearchPanel