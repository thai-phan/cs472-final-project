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
        </Routes>
      </>
  );
}

export default AppRoute