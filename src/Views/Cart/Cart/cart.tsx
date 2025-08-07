import { useEffect, useRef, useState } from "react";
import { useCart } from "../../../Context/CartContext";
import { CartProducts } from "./cartProducts";
import { CheckoutItems } from "../../../Models/checkoutItems";
import { fetchPaymentId } from "../../../services/checkoutApi";
import { useNavigate } from "react-router-dom";

export const Cart = () => {
  const { shoppingCartItems } = useCart();
  const [items, setItems] = useState<CheckoutItems[]>([]);
  const [shippingCost, setShippingCost] = useState<number>(0);

  const navigate = useNavigate();

  const getCheckoutItems = () => {
    const items: CheckoutItems[] = shoppingCartItems.map((item) => ({
      product: item.product,
      productId: item.product.id,
      name: item.product.name,
      totalPrice: item.variant
        ? item.variant.variantPrice * item.quantity
        : item.product.price * item.quantity,
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
    <div className="contentBody h-[calc(100vh-5rem)]">
      <div className="h-full w-full flex flex-row  justify-center mt-10 space-x-5">
        <div className="w-1/2 h-fit border border-neutral-400 rounded-sm p-4">
          <CartProducts items={items} setItems={setItems} />
        </div>
        <div className="w-1/3 h-full mt-10">
          <div className="w-10/12 h-fit bg-neutral-100 rounded-sm p-4">
            <div className="flex flex-col space-y-4">
              <div className="font-semibold text-xl flex justify-between">
                <div>Summa</div>
                <div>
                  {getTotalPrice().toFixed(2)}
                  <span className="ms-1">kr</span>
                </div>
              </div>
              <div className="font-semibold text-xl flex justify-between mb-6">
                <div>Frakt</div>
                <div>Frakt beräknas i kassan</div>
              </div>
              <div className="font-semibold text-xl flex justify-between border-t-1 border-neutral-400">
                <div>Total</div>
                <div>
                  {(getTotalPrice() + shippingCost).toFixed(2)}
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
