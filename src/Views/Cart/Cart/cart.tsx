import { useEffect, useState } from "react";
import { useCart } from "../../../Context/CartContext";
import { CartProducts } from "./cartProducts";
import { CheckoutItems } from "../../../Models/checkoutItems";
import { fetchPaymentId } from "../../../services/checkoutApi";
import { useNavigate } from "react-router-dom";

export const Cart = () => {
  const { shoppingCartItems } = useCart();
  const [items, setItems] = useState<CheckoutItems[]>([]);
  /* const [shippingCost, setShippingCost] = useState<number>(59); */
  const shippingCost = 59;

  const navigate = useNavigate();

  const getCheckoutItems = () => {
    const items: CheckoutItems[] = shoppingCartItems.map((item) => ({
      product: item.product,
      productId: item.product.id,
      name: item.product.name,
      totalPrice: item.variant
        ? item.variant.variantPrice * item.quantity
        : item.product.price * item.quantity,
      productImage: item.product.images[0],
      option: item.option || null,
      variant: item.variant || null,
      quantity: item.quantity,
    }));
    setItems(items);
  };

  const getTotalPrice = () => {
    return items.reduce((total, item) => {
      return total + item.totalPrice;
    }, 0);
  };

  const handleCheckout = async () => {
    const response = await fetchPaymentId();
    if (!response) {
      console.error("Failed to fetch payment ID");
      return;
    }
    navigate(`/checkout?paymentId=${response}`);
  };

  useEffect(() => {
    getCheckoutItems();
  }, [shoppingCartItems]);

  return (
    <div className="contentBody dark:bg-dark-main-color">
      <div className="h-full w-full flex flex-col justify-around mt-20 space-x-5 lg:flex-row lg:justify-center lg:mt-36">
        <div
          className="w-full h-[calc(100%-11rem)] border border-neutral-400 rounded-sm p-2 mb-44
         md:p-4 lg:w-1/2 lg:h-fit lg:mb-0 overflow-auto "
        >
          <CartProducts items={items} setItems={setItems} />
        </div>
        <div className="w-full h-44 fixed bottom-0 left-0 z-50 lg:w-1/3 md:h-52 lg:h-full lg:mt-10 lg:static">
          <div
            className="w-full h-full bg-neutral-100 rounded-sm p-3 lg:p-4 lg:w-10/12 lg:h-fit
           dark:bg-dark-main-color dark:border dark:border-neutral-400 dark:text-dark-secondary-color"
          >
            <div className="flex flex-col space-y-2 lg:space-y-4">
              <div className="font-semibold text-lg flex justify-between lg:text-xl">
                <div>Summa</div>
                <div>
                  {getTotalPrice().toFixed(2)}
                  <span className="ms-1">kr</span>
                </div>
              </div>
              <div className="font-semibold text-lg flex justify-between md:text-xl md:mb-6">
                <div>Frakt</div>
                <div>
                  {items.length
                    ? shippingCost.toFixed(2)
                    : getTotalPrice().toFixed(2)}
                  <span className="ms-1">kr</span>
                </div>
              </div>
              <div
                className="font-semibold text-lg flex justify-between border-t-1 border-neutral-400 mb-0 
              md:!mb-2 md:text-xl"
              >
                <div>Total</div>
                <div>
                  {items.length
                    ? (getTotalPrice() + shippingCost).toFixed(2)
                    : getTotalPrice().toFixed(2)}
                  <span className="ms-1">kr</span>
                </div>
              </div>
              <div className="w-full flex justify-center">
                <button
                  className="font-semibold bg-neutral-800 px-10 py-3 text-main-color rounded
                hover:text-neutral-400 transition-all duration-200 ease-linear"
                  onClick={() => handleCheckout()}
                >
                  Till kassan
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
