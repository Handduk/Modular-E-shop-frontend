import { Route, Routes } from "react-router-dom";
import { Homepage } from "./Views/Homepage/Main/Homepage";
import { AboutUs } from "./Views/AboutUs/AboutUs";
import { Login } from "./Views/Login/Login";
import { Shop } from "./Views/Shop/Shop";
import { ProductPage } from "./Views/Shop/ProductPage";
import { Admin } from "./Views/Admin/Admin";
import { AddCategoryProduct } from "./Views/Admin/Components/Products/CategoryProducts";
import { ProtectedRoute } from "./Wrappers/ProtectedRoute";
import { useProduct } from "./Context/ProductContext";
import { Products } from "./Views/Shop/Products";
import { Terms } from "./Views/Terms/terms";
import { Cart } from "./Views/Cart/Cart/cart";
import { Checkout } from "./Views/Cart/Checkout/checkout";

export const PageRoutes = () => {
  const { categorys } = useProduct();
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/login" element={<Login />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/product" element={<ProductPage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/terms" element={<Terms />} />
        {categorys &&
          categorys.map((res, index) => (
            <Route
              path={`shop/${res.name}`}
              element={<Products />}
              key={index}
            />
          ))}
        <Route
          path="/admin"
          element={<ProtectedRoute role="ADMIN">{<Admin />}</ProtectedRoute>}
        />
        <Route
          path="/admin/category"
          element={
            <ProtectedRoute role="ADMIN">
              {<AddCategoryProduct />}
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
};
