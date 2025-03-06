import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Views/root.css";

import { PageRoutes } from "./Pageroutes";
import { Navbar } from "./Components/Navbar/Navbar";
import { CartProvider } from "./Context/CartContext";

interface ShoppingcartProps {
  open: boolean;
}

export const App = ({ open }: ShoppingcartProps) => {
  return (
    <>
      <CartProvider>
        <Navbar open={open} />
        <PageRoutes />
      </CartProvider>
    </>
  );
};
