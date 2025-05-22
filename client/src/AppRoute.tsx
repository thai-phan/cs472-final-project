import {Route, Routes} from "react-router";
import App from "./App.tsx";
import ProductPage from "./product/ProductPage.tsx";

const AppRoute = () => {

  return (
      <>
        <Routes>
          <Route index element={<App/>}/>
          <Route path="/products" element={<App/>}/>
          <Route path="/products/:id" element={<ProductPage />}/>
          <Route path="/book-list" element={<div>aaaa</div>}/>
          <Route path="/add-book" element={<div>bbb</div>}/>
          <Route path="/update-book" element={<div>ccc</div>}/>
        </Routes>
      </>
  );
}

export default AppRoute