import { useCart } from "../../Context/CartContext";
import { CartItems } from "./CartItems";
import { useEffect, useState } from "react";
import { getSalesPrice } from "../../Handlers/SalesPrice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useProduct } from "../../Context/ProductContext";

export const ShoppingCart = () => {
  const { closeCart, shoppingCartItems, isOpen } = useCart();
  const { categorys } = useProduct();
  const [sale, setSale] = useState<number>(0);

  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/checkout");
    closeCart();
  };

  useEffect(() => {
    const getTotalSale = () => {
      let totalSale: number[] = [];
      let isSale = false;
      shoppingCartItems.map((res) => {
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
      });

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
      const category = categorys.find((i) => i.id === cartItem.categoryId);
      if (!category?.products) return total;
      const item = category?.products.find((i) => i.id === cartItem.id);
      return total + (item?.price || 0) * cartItem.quantity;
    }, 0);
    return total;
  };

  return (
    <span
      className={`fixed top-0 bg-main-color z-[100] w-[80vw] h-screen py-2 flex flex-col items-center overflow-hidden right-0
        md:w-2/6 xl:w-1/4
  ${
    isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
  } transition-all duration-200 ease-linear`}
    >
      <div className="flex justify-between items-center w-full h-1/12">
        <div className="text-xl font-semibold self-center ps-2">Varukorg</div>
        <div className="px-3 py-2" onClick={() => closeCart()}>
          <FontAwesomeIcon icon={faX} />
        </div>
      </div>

      <div className="py-2 w-full">
        <div className="overflow-y-scroll space-y-2 md:w-full">
          {shoppingCartItems.map((res) => (
            <CartItems key={res.id} {...res} />
          ))}
          <div className="flex flex-col">
            {sale !== 0 && (
              <>
                <div className="flex justify-between font-semibold mb-4">
                  <div className="text-[1.2rem]">Pris före rabatt</div>
                  <div className="">{getTotalPrice().toFixed(2)} kr</div>
                </div>
                <div className="flex justify-between font-semibold mb-4 text-red-600">
                  <div className="">Sale </div>
                  <div className="">
                    -{(getTotalPrice() - Number(sale)).toFixed(2)} kr
                  </div>
                </div>
              </>
            )}
          </div>
          <div
            className="sticky flex flex-col w-full border-t-[color:var(--bs-gray)] bg-[white] pt-2 border-t border-solid bottom-0
          px-4"
          >
            <div className="flex justify-between font-semibold mb-4">
              <div className="">Totalt</div>
              <div className="">
                {sale !== 0
                  ? `${sale?.toFixed(2)} kr`
                  : `${getTotalPrice().toFixed(2)} kr`}
              </div>
            </div>
            <button
              className="bg-secondary-color py-3 text-main-color mb-4 rounded"
              onClick={() => handleNavigate()}
            >
              GÅ TILL KASSAN
            </button>
          </div>
        </div>
      </div>
    </span>
  );
};
