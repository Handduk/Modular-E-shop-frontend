import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Views/root.css";

import { PageRoutes } from "./Pageroutes";
import { Navbar } from "./Components/Navbar/Navbar";
import { CartProvider } from "./Context/CartContext";
import { useLocation } from "react-router-dom";
import { AuthProvider } from "./Context/AuthContext";
import { ProductProvider } from "./Context/ProductContext";

export const App = () => {
  const location = useLocation();

  const hideNavbar = ["/reseller", "/admin", "/login", "/admin/category"];
  return (
    <>
      <AuthProvider>
        <ProductProvider>
          <CartProvider>
            {!hideNavbar.includes(location.pathname) && <Navbar />}
            <PageRoutes />
          </CartProvider>
        </ProductProvider>
      </AuthProvider>
    </>
  );
};
