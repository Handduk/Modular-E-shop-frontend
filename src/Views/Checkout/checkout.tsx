import { useEffect, useState } from "react";
import { useCart } from "../../Context/CartContext";
import { Product } from "../../Models/Product";
import { getProductListForCheckout } from "../../services/productApi";

export const Checkout = () => {
  const { shoppingCartItems } = useCart();

  const [products, setProducts] = useState<Product[]>([]);

  const getProducts = async () => {
    if (shoppingCartItems && shoppingCartItems.length > 0) {
      const ids = shoppingCartItems.map((item) => item.id);
      if (ids.length === 0) {
        return [];
      }
      const response = await getProductListForCheckout(ids);
      setProducts(response);
    }
  };

  useEffect(() => {
    getProducts();
  }, [shoppingCartItems]);

  return (
    <div className="contentBody h-[calc(100vh-5rem)]">
      <div className="h-full w-full flex flex-col items-center">
        <div className="w-11/12 h-2/3">
          <div className="font-semibold text-2xl my-2">
            {!products.length ? "Din varukorg är tom." : "Mina varor"}
          </div>
          {products.length > 0 && (
            <div className="w-full h-5/6 flex flex-col items-center sm:flex-row sm:items-baseline sm:space-x-2">
              <div
                className={`${
                  products.length != 0 ? "h-2/3" : "h-1/3"
                } w-full border rounded-sm md:w-1/2`}
              >
                <div className="w-full h-full flex flex-col items-center justify-center">
                  <span className="font-semibold text-xl sm:text-2xl">
                    Ojdå. Här ekar det tomt.
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
