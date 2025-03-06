import { useEffect, useState } from "react";
import { useCart } from "../../Context/CartContext";
import { useURLId } from "../../Hooks/useURLId";
import { Category } from "../../Models/Category";
import { Product } from "../../Models/Product";
import { categoryList } from "../Homepage/Sections/CategorySection/CategorySection";
import { useNavigate } from "react-router-dom";
import { getSalesPrice } from "../../Handlers/SalesPrice";

export const ProductPage = () => {
  const { setCartQuantity } = useCart();
  const navigate = useNavigate();
  const { id } = useURLId();
  const [category, setCategory] = useState<Category>(categoryList[0]);
  const [product, setProduct] = useState<Product>();
  const [selectedCheck, setSelectedCheck] = useState<string | null>(null);
  const [quantity, setQuantity] = useState<number>(1);

  useEffect(() => {
    if (category && category.products) {
      const prod = category.products.find((prod) => prod.id === id);
      if (prod) {
        setProduct(prod);
      } else {
        console.warn("Product not found");
      }
    }
  }, [category, id]);

  useEffect(() => {
    setQuantity(1);
  }, [product]);

  const handleCheckboxChange = (value: string) => {
    setSelectedCheck((prev) => (prev === value ? null : value));
  };

  const handleNegativeQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    } else {
      setQuantity(1);
    }
  };

  return (
    <div className="contentBody">
      <div className="content">
        <div className="flex flex-col items-center justify-center">
          <div className="cursor-pointer mb-2">
            <img src={product?.img[0]} alt={product?.name} />
          </div>
          <div className="w-11/12 flex flex-col space-y-2">
            <div className="text-black text-2xl font-semibold">
              {product?.name}
            </div>
            <div className="flex flex-row space-x-2 items-end">
              {product?.sale ? (
                <div className="flex flex-col">
                  <span className="font-semibold text-xl text-red-600">
                    {getSalesPrice(product.price, product.sale).toFixed(2)} kr
                    <span className="text-secondary-color/70 ms-2 text-lg">
                      inkl. moms
                    </span>
                  </span>
                  <span className="text-neutral-600 text-md">
                    Ordinarie pris:{" "}
                    <span className="line-through">{product.price} kr</span>
                  </span>
                </div>
              ) : (
                <span className="font-semibold text-xl">
                  {product?.price} kr
                </span>
              )}
            </div>
            {category.products.length > 0 && (
              <>
                <div>
                  <span>Produkt: </span>
                  <span className="font-bold">{product?.name}</span>
                </div>
                {category.products.length > 1 && (
                  <div className="flex flex-row flex-wrap space-x-2 space-y-2">
                    {category.products.map((product, index) => (
                      <img
                        key={index}
                        src={product.img[0]}
                        alt={product.name}
                        className="size-20 object-cover cursor-pointer"
                        onClick={() => navigate(`/product?id=${product.id}`)}
                      />
                    ))}
                  </div>
                )}
                {product?.options && (
                  <div className="flex flex-row space-x-4">
                    {product.options.map((option, index) => (
                      <div className="flex items-center" key={index}>
                        <input
                          type="checkbox"
                          id={option}
                          value={option}
                          className="size-6 me-2 cursor-pointer"
                          checked={selectedCheck === option}
                          onChange={() => handleCheckboxChange(option)}
                        />
                        <label htmlFor={option}>{option}</label>
                      </div>
                    ))}
                  </div>
                )}
                {product?.sizes && (
                  <div className="flex flex-col space-y-2">
                    <label htmlFor="size">Storlek:</label>
                    <select
                      name="size"
                      id="size"
                      className="w-full border border-black h-12 px-2"
                    >
                      {product.sizes.map((size, index) => (
                        <option key={index} value={size}>
                          {size}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </>
            )}
            <div className="flex w-full h-12">
              <button
                className="border border-black w-16 bg-secondary-color text-main-color"
                onClick={() => handleNegativeQuantity()}
              >
                <div className="text-3xl">-</div>
              </button>
              <div className="border-y-1 w-full flex items-center justify-center text-xl">
                {quantity}
              </div>
              <button
                className="border border-black w-16 bg-secondary-color text-main-color"
                onClick={() => setQuantity(quantity + 1)}
              >
                <div className="text-3xl">+</div>
              </button>
            </div>
            <div className="w-full h-12 mt-2">
              <button
                className="border border-secondary-color w-full h-full bg-secondary-color text-main-color"
                onClick={() => {
                  product &&
                    setCartQuantity(product.id, product.categoryId, quantity);
                }}
              >
                Lägg i varukorg
              </button>
            </div>
            <div className="flex flex-col space-y-2 mt-2 mb-16">
              <span className="text-black text-xl font-semibold">
                Produktinformation
              </span>
              <span className="text-black text-base">
                {product?.description}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
