import { Route, Routes } from "react-router-dom";
import { Homepage } from "./Views/Homepage/Main/Homepage";
import { AboutUs } from "./Views/AboutUs/AboutUs";
import { Login } from "./Views/Login/Login";
import { Shop } from "./Views/Shop/Shop";
import { ProductPage } from "./Views/Shop/ProductPage";
import { Admin } from "./Views/Admin/Admin";
import { AddCategoryProduct } from "./Views/Admin/Components/Products/CategoryProducts";
import { ProtectedRoute } from "./Wrappers/ProtectedRoute";
import { Checkout } from "./Views/Checkout/checkout";
import { useProduct } from "./Context/ProductContext";
import { Products } from "./Views/Shop/Products";

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
        <Route path="/checkout" element={<Checkout />} />
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
