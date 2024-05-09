import { Image } from "react-bootstrap";
import { Product } from "../../Models/Product";
import { useState } from "react";
import { ProductModal } from "./ProductModal/ProductModal";
import { getSalesPrice } from "../../Handlers/SalesPrice";
import "../../Views/Shop/Categorys/Category.css";

interface ProductPostsProps {
  products: Product[];
}

export const ProductPosts = ({ products }: ProductPostsProps) => {
  const [show, setShow] = useState<boolean>(false);
  const [product, setProduct] = useState<Product>();

  const showProductPage = (prod: Product) => {
    setProduct(prod);
    setShow(!show);
  };

  return (
    <>
      {products &&
        products.map((res, index) => (
          <>
            <div
              className="card-product"
              key={index}
              onClick={() => showProductPage(res)}
            >
              <Image
                src={res.img[0]}
                fluid
                className="img-product"
                key={`${index}-${res.price}`}
              />
              <div className="prodInfo-product" key={`${index}-${res.id}`}>
                <div className="prodName-product">{res.name}</div>
                <div className="prodPrice-product">
                  {res.sale ? (
                    <>
                      <p className="salePrice-product">
                        {getSalesPrice(res.price, res.sale).toFixed(2)} kr
                      </p>
                      <p className="fullPrice-product">
                        {" "}
                        {`${res.price.toFixed(2)} kr`}
                      </p>
                    </>
                  ) : (
                    `${res.price.toFixed(2)} kr`
                  )}
                </div>
              </div>
            </div>
          </>
        ))}
      {product && (
        <ProductModal show={show} setShow={setShow} product={product} />
      )}
    </>
  );
};
