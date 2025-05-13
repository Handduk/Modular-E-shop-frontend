import { useCart } from "../../Context/CartContext";
import { CartItems } from "./CartItems";
import { categoryList } from "../../Views/Homepage/Sections/CategorySection/CategorySection";
import { useEffect, useState } from "react";
import { getSalesPrice } from "../../Handlers/SalesPrice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";

export const ShoppingCart = () => {
  const { closeCart, shoppingCartItems, isOpen } = useCart();
  const [sale, setSale] = useState<number>(0);

  useEffect(() => {
    const getTotalSale = () => {
      let totalSale: number[] = [];
      let isSale = false;
      shoppingCartItems.map((res) => {
        const category = categoryList.find((i) => i.id === res.categoryId);
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
      const category = categoryList.find((i) => i.id === cartItem.categoryId);
      if (!category?.products) return total;
      const item = category?.products.find((i) => i.id === cartItem.id);
      return total + (item?.price || 0) * cartItem.quantity;
    }, 0);
    return total;
  };

  return (
    <span
      className={`bg-main-color z-[100] w-[90vw] h-[calc(100vh)] py-2 px-4 flex flex-col items-center fixed overflow-y-hidden transition-all duration-200 ease-linear right-0 top-20 
  ${
    isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
  }`}
    >
      <div className="flex justify-between items-center w-full py-2">
        <div className="text-xl font-semibold self-center">Varukorg</div>
        <button onClick={() => closeCart()}>
          <FontAwesomeIcon icon={faX} />
        </button>
      </div>

      <div className="py-2">
        <div className="overflow-y-scroll space-y-2">
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
          <div className="sticky flex flex-col w-[333px] border-t-[color:var(--bs-gray)] bg-[white] pt-2 border-t border-solid bottom-0">
            <div className="flex justify-between font-semibold mb-4">
              <div className="">Totalt</div>
              <div className="">
                {sale !== 0
                  ? `${sale?.toFixed(2)} kr`
                  : `${getTotalPrice().toFixed(2)} kr`}
              </div>
            </div>
            <button className="bg-secondary-color py-3 text-main-color mb-4 rounded">
              GÅ TILL KASSAN
            </button>
          </div>
        </div>
      </div>
    </span>
  );
};
