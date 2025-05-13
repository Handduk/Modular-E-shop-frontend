import { Route, Routes } from "react-router-dom";
import { Homepage } from "./Views/Homepage/Main/Homepage";
import { AboutUs } from "./Views/AboutUs/AboutUs";
import { Login } from "./Views/Login/Login";
import { Shop } from "./Views/Shop/Shop";
import { categoryList } from "./Views/Homepage/Sections/CategorySection/CategorySection";
import { ProductPage } from "./Views/ProductPage/ProductPage";
import { Admin } from "./Views/Admin/Admin";
import { Category1 } from "./Views/Shop/Categorys/Category1/Category1";

export const PageRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/shop" element={<Shop />} />
        {categoryList &&
          categoryList.map((res, index) => (
            <Route
              path={`shop/${res.name}`}
              element={<Category1 />}
              key={index}
            />
          ))}
        <Route path="product" element={<ProductPage />} />
      </Routes>
    </>
  );
};
