import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Views/root.css";

import { PageRoutes } from "./Pageroutes";
import { Navbar } from "./Components/Navbar/Navbar";
import { CartProvider } from "./Context/CartContext";
import { useLocation } from "react-router-dom";

interface ShoppingcartProps {
  open: boolean;
}

export const App = ({ open }: ShoppingcartProps) => {
  const location = useLocation();

  const hideNavbar = ["/reseller", "/admin"];
  return (
    <>
      <CartProvider>
        {!hideNavbar.includes(location.pathname) && <Navbar open={open} />}
        <PageRoutes />
      </CartProvider>
    </>
  );
};
