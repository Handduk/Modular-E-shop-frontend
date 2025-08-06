import { useCart } from "../../Context/CartContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { getSalesPrice } from "../../Handlers/SalesPrice";
import { CartItem } from "../../Models/Cart";
import { useNavigate } from "react-router-dom";

interface CartItemsProps {
  item: CartItem;
}

export const CartItems = ({ item }: CartItemsProps) => {
  const { removeFromCart } = useCart();

  const navigate = useNavigate();

  return (
    <div className="border-b-secondary-color pb-2 border-b border-solid flex px-2">
      <img
        className="h-24 w-20 object-cover me-2 cursor-pointer"
        src={item.product?.images[0]}
        alt={item.product?.name}
        onClick={() => navigate(`/product?id=${item.product?.id}`)}
      />
      <div className="flex flex-col justify-center h-[inherit] mr-auto">
        <div className="text-md text-black space-y-1">
          {item.product.brand &&
            item.product.brand !== `"null"` &&
            item.product.brand !== "null" && <div>{item.product.brand}</div>}
          <div className="font-bold">{item.product?.name}</div>
          {item.product?.discount ? (
            <div className="flex">
              <p className="font-semibold text-red-600 mr-2">
                {getSalesPrice(
                  item.product.price,
                  item.product.discount
                ).toFixed(2)}{" "}
                kr
              </p>
              <p className="line-through">{item.product.price.toFixed(2)} kr</p>
            </div>
          ) : (
            <div className="font-semibold">
              {!item.variant?.variantPrice
                ? item.product.price
                : item.variant?.variantPrice.toFixed(2)}{" "}
              kr
            </div>
          )}
          <div>
            <div>{item.option && item.option}</div>
            <div>{item.variant && item.variant.variantName}</div>
          </div>
          <div className="font-semibold">
            Antal: <span>{item.quantity}</span>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-start">
        <button className="px-2 py-1" onClick={() => removeFromCart(item)}>
          <FontAwesomeIcon
            icon={faTrash}
            className="text-xl"
            title="Radera produkt"
          />
        </button>
      </div>
    </div>
  );
};
