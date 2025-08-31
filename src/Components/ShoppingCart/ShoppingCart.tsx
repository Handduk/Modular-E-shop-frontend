import { useCart } from "../../Context/CartContext";
import { CartItems } from "./CartItems";
import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

export const ShoppingCart = () => {
  const { closeCart, shoppingCartItems, isOpen } = useCart();
  const [sale, setSale] = useState<number>(0);

  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/cart");
    closeCart();
  };

  useEffect(() => {
    const getTotalSale = () => {
      let totalSale: number[] = [];
      let isSale = false;
      /* shoppingCartItems.map((res) => {
        const category = categorys.find((i) => i.id === res.categoryId);
        if (!category?.products) return;
        const item = category?.products.find((i) => i.id === res.id);
        for (let i = 0; i < res.quantity; i++) {
          if (item?.discount) {
            totalSale.push(getSalesPrice(item.price, item.discount));
            isSale = true;
          } else {
            totalSale.push(Number(item?.price));
          }
        }
      }); */

      if (isSale) {
        const sum = totalSale.reduce((total, val) => total + val, 0);
        setSale(sum);
        isSale = false;
      }
    };

    getTotalSale();
  }, [isOpen]);

  const getTotalPrice = () => {
    const total = shoppingCartItems.reduce((total, cartItem) => {
      if (!cartItem.product) return total;
      const itemPrice = cartItem.variant
        ? cartItem.variant.variantPrice
        : cartItem.product.price;
      return total + itemPrice * cartItem.quantity;
    }, 0);
    return total;
  };

  return (
    <div
      className={`fixed inset-0 z-[99] transition-colors duration-300 ${
        isOpen
          ? "bg-black/15 pointer-events-auto"
          : "bg-transparent pointer-events-none"
      }`}
      onClick={closeCart}
    >
      <div
        className={`absolute top-0 right-0 bg-main-color z-[100] w-[80vw] min-h-1/3 py-2 flex flex-col items-center overflow-hidden
          md:w-2/6 lg:w-1/4 shadow shadow-gray-400 rounded-l-xl
          transform transition-transform duration-300
          ${isOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"}
        `}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center w-full h-1/12">
          <div className="text-xl font-semibold self-center ps-2">Varukorg</div>
          <div className="px-3 py-2 cursor-pointer" onClick={closeCart}>
            <FontAwesomeIcon icon={faX} />
          </div>
        </div>

        <div className="py-2 w-full overflow-auto">
          <div className="overflow-y-scroll space-y-2 md:w-full">
            {shoppingCartItems.map((res, index) => (
              <CartItems key={index} item={res} />
            ))}

            <div className="sticky bottom-0 right-0 flex flex-col w-full border-t bg-white pt-2 px-4">
              <div className="flex justify-between font-semibold mb-4">
                <div>Pris exkl. Frakt</div>
                <div>{getTotalPrice().toFixed(2)} kr</div>
              </div>
              <button
                className="bg-secondary-color py-3 text-main-color mb-4 rounded"
                onClick={handleNavigate}
              >
                GÅ TILL KASSAN
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
