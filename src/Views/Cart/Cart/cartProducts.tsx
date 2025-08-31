import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { CheckoutItems } from "../../../Models/checkoutItems";
import { useCart } from "../../../Context/CartContext";
import { getProductImage } from "../../../Hooks/Products/ProductHooks";

interface CartProductsProps {
  items: CheckoutItems[];
  setItems: React.Dispatch<React.SetStateAction<CheckoutItems[]>>;
}

export const CartProducts = ({ items, setItems }: CartProductsProps) => {
  const { updateCartQuantity, removeFromCart } = useCart();

  const changeItemQuantity = (item: CheckoutItems, value: string) => {
    const newQuantity = parseInt(value, 10);
    const selectedItem = items.find(
      (i) =>
        i.productId === item.productId &&
        i.option === item.option &&
        i.variant?.variantName === item.variant?.variantName
    );
    setItems((prevItems) =>
      prevItems.map((i) =>
        i === selectedItem ? { ...i, quantity: newQuantity } : i
      )
    );
    updateCartQuantity(item, newQuantity);
  };

  const navigate = useNavigate();

  return (
    <>
      <div className="font-semibold text-2xl my-2 text-center md:!text-start md:ps-2 dark:text-dark-secondary-color">
        {!items.length ? "Din varukorg är tom." : "Mina varor"}
      </div>
      {items.length > 0 &&
        items.map((item, index) => (
          <div
            key={index}
            className="w-full h-fit border-b-1 border-neutral-400 md:h-fit flex flex-col lg:items-center mb-2 sm:space-x-2 overflow-auto
            dark:text-dark-secondary-color"
          >
            <div className={`${item.product ? "h-full" : "h-1/3"} w-full`}>
              <div className="w-full h-full flex">
                <div className="w-2/6 h-1/2 md:w-1/6 md:h-full p-2 flex items-center justify-start overflow-hidden">
                  <img
                    className="object-cover object-bottom h-full w-full cursor-pointer"
                    src={getProductImage(item.product, item.option)}
                    alt={item.product.name}
                    onClick={() => navigate(`/product?id=${item.product.id}`)}
                  />
                </div>
                <div className="w-1/2 h-full md:w-full">
                  <div className="w-full h-full flex flex-col md:flex-row md:justify-between py-4">
                    <div>
                      <div>
                        {item.product.brand &&
                          item.product.brand !== `"null"` &&
                          item.product.brand !== "null" && (
                            <div>{item.product.brand}</div>
                          )}
                        <div className="font-bold">{item.product.name}</div>
                        <div className="font-semibold">
                          {item.variant
                            ? (
                                item.variant.variantPrice * item.quantity
                              ).toFixed(2)
                            : (item.product.price * item.quantity).toFixed(2)}
                          <span className="ms-1">kr</span>
                        </div>
                      </div>
                      <div>
                        {item.option && (
                          <div>
                            <span className="me-1">Alternativ:</span>
                            {item.option}
                          </div>
                        )}
                        {item.variant && (
                          <div>
                            <span className="me-1">Storlek:</span>
                            {item.variant.variantName}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex mt-3 md:!mt-0">
                      <select
                        name="quantity"
                        id="quantity"
                        value={item.quantity}
                        className="h-fit border border-black min-w-[6rem] p-2 rounded-sm font-semibold cursor-pointer
                        dark:bg-dark-main-color dark:border dark:!border-dark-secondary-color"
                        onChange={(e) =>
                          changeItemQuantity(item, e.target.value)
                        }
                      >
                        {[...Array(10).keys()].map((num) => (
                          <option key={num + 1} value={num + 1}>
                            {num + 1}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
                <div
                  className="w-fit h-fit p-3 cursor-pointer text-xl md:mt-3 md:ms-3"
                  title="Radera produkt"
                  onClick={() => removeFromCart(item)}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </div>
              </div>
            </div>
          </div>
        ))}
    </>
  );
};
