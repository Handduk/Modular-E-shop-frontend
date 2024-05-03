import { Route, Routes } from "react-router-dom";
import { Homepage } from "./Views/Homepage/Homepage";
import { AboutUs } from "./Views/AboutUs/AboutUs";
import { AdminLogin } from "./Views/Admin/Admin.login";

export const PageRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/admin" element={<AdminLogin />} />
      </Routes>
    </>
  );
};
