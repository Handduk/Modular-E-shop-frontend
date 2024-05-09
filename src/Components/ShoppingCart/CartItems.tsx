import { Button, Image, Stack } from "react-bootstrap";
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
    <Stack className="stack-cartItem" direction="horizontal" gap={2}>
      <Image className="img-cartItem" src={item?.img[0]} />
      <div className="info-cartItem">
        <div className="name-cartItem">
          {item?.name}
          {quantity > 1 && (
            <span className="quantity-cartItem">{quantity}x</span>
          )}
        </div>
        {item?.sale ? (
          <div className="sale-cartItem">
            <p className="salePrice-cartItem">
              {getSalesPrice(item.price, item.sale).toFixed(2)} kr
            </p>
            <p className="ordSalePrice-cartItem">{item.price.toFixed(2)} kr</p>
          </div>
        ) : (
          <div className="price-cartItem">{item?.price.toFixed(2)} kr</div>
        )}
      </div>
      <div className="delete-cartItem">
        <Button
          variant="outline-dark"
          className="deleteBtn-cartItem"
          onClick={() => removeFromCart(Number(item?.id))}
        >
          <FontAwesomeIcon icon={faX} />
        </Button>
      </div>
    </Stack>
  );
};
