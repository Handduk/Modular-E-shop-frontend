import { Route, Routes } from "react-router-dom";
import { Homepage } from "./Views/Homepage/Main/Homepage";
import { AboutUs } from "./Views/AboutUs/AboutUs";
import { AdminLogin } from "./Views/Admin/Admin.login";
import { Shop } from "./Views/Shop/Shop";
import { categoryList } from "./Views/Homepage/Sections/CategorySection/CategorySection";
import { ProductPage } from "./Views/ProductPage/ProductPage";

export const PageRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/shop" element={<Shop />} />
        {categoryList &&
          categoryList.map((res, index) => (
            <Route path={res.link} element={res.component} key={index} />
          ))}
        <Route path="product" element={<ProductPage />} />
      </Routes>
    </>
  );
};
