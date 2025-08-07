import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { CheckoutItems } from "../../../Models/checkoutItems";

interface CartProductsProps {
  items: CheckoutItems[];
  setItems: React.Dispatch<React.SetStateAction<CheckoutItems[]>>;
}

export const CartProducts = ({ items, setItems }: CartProductsProps) => {
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
  };

  const navigate = useNavigate();

  return (
    <>
      <div className="font-semibold text-2xl my-2">
        {!items.length ? "Din varukorg är tom." : "Mina varor"}
      </div>
      {items.length > 0 &&
        items.map((item, index) => (
          <div
            key={index}
            className="w-full h-1/5 flex flex-col items-center mb-2 sm:flex-row sm:items-baseline sm:space-x-2 overflow-auto"
          >
            <div
              className={`${
                item.product ? "h-full" : "h-1/3"
              } w-full max-md:w-1/2`}
            >
              <div className="w-full h-full flex">
                <div className="w-1/6 h-full p-2 flex items-center justify-start overflow-hidden">
                  <img
                    className="object-cover object-bottom h-full w-full cursor-pointer"
                    src={item.product.images[0]}
                    alt={item.product.name}
                    onClick={() => navigate(`/product?id=${item.product.id}`)}
                  />
                </div>
                <div className="w-2/5 h-full flex flex-col py-4 space-y-2">
                  <div>
                    {item.product.brand &&
                      item.product.brand !== `"null"` &&
                      item.product.brand !== "null" && (
                        <div>{item.product.brand}</div>
                      )}
                    <div className="font-bold">{item.product.name}</div>
                    <div className="font-semibold">
                      {item.variant
                        ? (item.variant.variantPrice * item.quantity).toFixed(2)
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
                <div className="w-2/8 ms-auto px-4">
                  <div className="flex justify-between items-center space-x-2">
                    <div className="flex">
                      <select
                        name="quantity"
                        id="quantity"
                        value={item.quantity}
                        className="h-fit border border-black min-w-[6rem] p-2 rounded-sm font-semibold cursor-pointer
                            "
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
                    <div
                      className="px-4 py-4 cursor-pointer text-xl"
                      title="Radera produkt"
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
    </>
  );
};
