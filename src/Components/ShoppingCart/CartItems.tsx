import { useCart } from "../../Context/CartContext";
import { categoryList } from "../../Views/Homepage/Sections/CategorySection/CategorySection";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { getSalesPrice } from "../../Handlers/SalesPrice";

interface CartItemsProps {
  id: number;
  categoryId: number;
  quantity: number;
}

export const CartItems = ({ id, categoryId, quantity }: CartItemsProps) => {
  const { removeFromCart } = useCart();
  const category = categoryList.find((i) => i.id === categoryId);
  const item = category?.products.find((i) => i.id === id);
  if (category === null) return null;
  if (item === null) return null;

  return (
    <div className="border-b-secondary-color pb-2 border-b border-solid flex">
      <img className="h-24 w-20 object-cover me-2" src={item?.images[0]} />
      <div className="flex flex-col justify-center h-[inherit] mr-auto">
        <div className="text-sm">
          {item?.name}
          {quantity > 1 && (
            <span className="text-[0.7rem] text-secondary-color ml-2">
              {quantity}x
            </span>
          )}
        </div>
        {item?.discount ? (
          <div className="flex">
            <p className="font-semibold text-red-600 mr-2">
              {getSalesPrice(item.price, item.discount).toFixed(2)} kr
            </p>
            <p className="line-through">{item.price.toFixed(2)} kr</p>
          </div>
        ) : (
          <div className="text-sm text-secondary-color">
            {item?.price.toFixed(2)} kr
          </div>
        )}
      </div>
      <div className="flex justify-center items-center">
        <button
          className="px-2 py-1 rounded border border-black"
          onClick={() => removeFromCart(Number(item?.id))}
        >
          <FontAwesomeIcon icon={faX} />
        </button>
      </div>
    </div>
  );
};
