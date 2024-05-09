import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Views/root.css";

import { PageRoutes } from "./PageRoutes";
import { Navbar } from "./Components/Navbar/Navbar";
import { CartProvider } from "./Context/CartContext";

export const App = () => {
  return (
    <>
      <CartProvider>
        <Navbar />
        <PageRoutes />
      </CartProvider>
    </>
  );
};
