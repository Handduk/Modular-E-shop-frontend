import { Button, Offcanvas, Stack } from "react-bootstrap";
import { useCart } from "../../Context/CartContext";
import "./ShoppingCart.css";
import { CartItems } from "./CartItems";
import { categoryList } from "../../Views/Homepage/Sections/CategorySection/CategorySection";
import { useEffect, useState } from "react";
import { getSalesPrice } from "../../Handlers/SalesPrice";

interface ShoppingcartProps {
  open: boolean;
}

export const ShoppingCart = ({ open }: ShoppingcartProps) => {
  const { closeCart, shoppingCartItems } = useCart();
  const [sale, setSale] = useState<number>(0);

  useEffect(() => {
    const getTotalSale = () => {
      let totalSale: number[] = [];
      let isSale = false;
      shoppingCartItems.map((res) => {
        const category = categoryList.find((i) => i.id === res.categoryId);
        const item = category?.products.find((i) => i.id === res.id);
        for (let i = 0; i < res.quantity; i++) {
          if (item?.sale) {
            totalSale.push(getSalesPrice(item.price, item.sale));
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
  }, [open]);

  const getTotalPrice = () => {
    const total = shoppingCartItems.reduce((total, cartItem) => {
      const category = categoryList.find((i) => i.id === cartItem.categoryId);
      const item = category?.products.find((i) => i.id === cartItem.id);
      return total + (item?.price || 0) * cartItem.quantity;
    }, 0);
    return total;
  };

  return (
    <Offcanvas
      show={open}
      onHide={() => {
        setSale(0);
        closeCart();
      }}
      placement="end"
      className="container-shoppingCart"
    >
      <Offcanvas.Header className="header-shoppingCart" closeButton>
        <Offcanvas.Title className="title-shoppingCart">
          Varukorg
        </Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body className="body-shoppingCart">
        <Stack className="itemsContainer-shoppingCart" gap={3}>
          {shoppingCartItems.map((res) => (
            <CartItems key={res.id} {...res} />
          ))}
          <div className="totalContainer-shoppingCart">
            {sale !== 0 && (
              <>
                <div className="total-shoppingCart">
                  <div className="totalText-shoppingCart">Pris före rabatt</div>
                  <div className="totalPrice-shoppingCart">
                    {getTotalPrice().toFixed(2)} kr
                  </div>
                </div>
                <div className="totalSale-shoppingCart">
                  <div className="saleText-shoppingCart">Sale </div>
                  <div className="salePrice-shoppingCart">
                    -{(getTotalPrice() - Number(sale)).toFixed(2)} kr
                  </div>
                </div>
              </>
            )}
          </div>
          <div className="totalCart-shoppingCart">
            <div className="endTotalText-shoppingCart">
              <div className="totalCartText-shoppingCart">Totalt</div>
              <div className="totalCartText-shoppingCart">
                {sale !== 0
                  ? `${sale?.toFixed(2)} kr`
                  : `${getTotalPrice().toFixed(2)} kr`}
              </div>
            </div>
            <Button className="totalCartBtn-shoppingCart" variant="dark">
              GÅ TILL KASSAN
            </Button>
          </div>
        </Stack>
      </Offcanvas.Body>
    </Offcanvas>
  );
};
