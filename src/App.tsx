import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { PageRoutes } from "./Pageroutes";
import { Navbar } from "./Components/Navbar/Navbar";
import { CartProvider } from "./Context/CartContext";
import { useLocation } from "react-router-dom";
import { AuthProvider } from "./Context/AuthContext";
import { ProductProvider } from "./Context/ProductContext";

export const App = () => {
  const location = useLocation();
  const hideNavbar = [
    "/reseller",
    "/admin",
    "/login",
    "/admin/category",
    "/checkout",
  ];

  const showNavbar = !hideNavbar.includes(location.pathname);
  return (
    <>
      <AuthProvider>
        <ProductProvider>
          <CartProvider>
            <div className="min-h-screen flex flex-col">
              {showNavbar && <Navbar />}
              <main className="flex flex-grow">
                <PageRoutes />
              </main>
            </div>
          </CartProvider>
        </ProductProvider>
      </AuthProvider>
    </>
  );
};
