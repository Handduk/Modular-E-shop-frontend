import { Modal, Image, Carousel, Button, Form } from "react-bootstrap";
import { Product } from "../../../Models/Product";
import "./ProductModal.css";
import { getSalesPrice } from "../../../Handlers/SalesPrice";
import { useState } from "react";
import { Cart } from "../../../Models/Cart";
import { useCart } from "../../../Context/CartContext";

interface ProductModalProps {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  product: Product;
}

export const ProductModal = ({ show, setShow, product }: ProductModalProps) => {
  const { getItemQuantity, setCartQuantity } = useCart();

  const [quantity, setQuantity] = useState<number>(getItemQuantity(product.id));
  const [cart, setCart] = useState<Cart>();

  const hideModal = () => {
    setShow(false);
    setQuantity(1);
  };

  return (
    <Modal
      show={show}
      centered
      indicators={false}
      interval={null}
      onHide={() => hideModal()}
      className="container-productModal"
    >
      <Modal.Header className="header-productModal" closeButton>
        <Modal.Title className="title-productModal">{product.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="body-productModal">
        {product.img.length > 1 ? (
          <Carousel
            slide={true}
            interval={null}
            variant="dark"
            indicators={false}
          >
            {product.img.map((img, index) => (
              <Carousel.Item key={index}>
                <Image src={img} className="img-productModal" />
              </Carousel.Item>
            ))}
          </Carousel>
        ) : (
          <Image src={product.img[0]} className="img-productModal" />
        )}
        <div className="info-productModal">
          {product.sale ? (
            <>
              <div className="priceContainer-productModal">
                <div className="salePrice-productModal">
                  {getSalesPrice(product.price, product.sale).toFixed(2)} kr
                </div>
                <div className="OrdinaryPrice-productModal">{`${product.price.toFixed(
                  2
                )} kr`}</div>
              </div>
              <div className="sale-productModal">{`Du sparar ${
                product.sale
              }% (${(product.price * Number(`0.${product.sale}`)).toFixed(
                2
              )} kr)`}</div>
            </>
          ) : (
            <div className="price-productModal">{`${product.price.toFixed(
              2
            )} kr`}</div>
          )}
          <div className="description-productModal">{product.description}</div>
        </div>
        <div className="buyContainer-productModal">
          <div className="quantityContainer-productModal">
            <Button
              variant="dark"
              className="quantityBtn-productModal"
              onClick={() => {
                quantity !== 1 && setQuantity(quantity - 1);
              }}
            >
              -
            </Button>
            <Form.Control
              disabled
              value={quantity}
              className="quantity-productModal"
            />
            <Button
              variant="dark"
              className="quantityBtn-productModal"
              onClick={() => setQuantity(quantity + 1)}
            >
              +
            </Button>
          </div>
          <Button
            variant="dark"
            className="buyBtn-productModal"
            onClick={() => {
              setCartQuantity(product.id, product.categoryId, quantity);
              hideModal();
            }}
          >
            LÄGG I VARUKORG
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};
