import { useEffect, useState } from "react";
import { useCart } from "../../Context/CartContext";
import { useURLId } from "../../Hooks/useURLId";
import { Category } from "../../Models/Category";
import { Product } from "../../Models/Product";
import { getSalesPrice } from "../../Handlers/SalesPrice";
import { useProduct } from "../../Context/ProductContext";
import { getSingleCategory } from "../../services/categoryApi";
import { getProductById } from "../../services/productApi";
import { Variant } from "../../Models/Variant";

export const ProductPage = () => {
  const { setCartQuantity } = useCart();
  const { id } = useURLId();
  const { categorys, products } = useProduct();
  const [category, setCategory] = useState<Category | null>(null);
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedCheck, setSelectedCheck] = useState<string | null>(null);
  const [chosenVariant, setChosenVariant] = useState<Variant | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    getProduct();
  }, [products, categorys, id]);

  const getProduct = async () => {
    if (!products || !products.length || !id) return;

    const response = await getProductById(id);
    if (response) {
      setProduct(response);
      getCategory(response.categoryId);
      setChosenVariant(response.variants ? response.variants[0] : null);
      setLoading(false);
    }
  };

  const getCategory = async (id: number) => {
    try {
      const response = await getSingleCategory(id);
      setCategory(response);
    } catch (error) {
      console.error("failed trying to fetch category.", error);
    }
  };

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
      <div className="content lg:h-full lg:flex lg:justify-center lg:items-center">
        <div className="flex flex-col items-center justify-center lg:h-full lg:flex-row ">
          <div className="cursor-pointer mb-2 lg:h-3/4 lg:w-1/2">
            {product && product.images && (
              <img
                className="lg:h-full"
                src={
                  typeof product?.images[0] === "string"
                    ? product.images[0]
                    : URL.createObjectURL(product.images[0])
                }
                alt={product?.name}
              />
            )}
          </div>
          <div className="w-11/12 flex flex-col space-y-2">
            <div className="text-black text-2xl font-semibold">
              {product?.name}{" "}
              <span className="secondary-color font-normal">
                {chosenVariant?.variantName}
              </span>
            </div>
            <div className="flex flex-row space-x-2 items-end">
              {product?.discount ? (
                <div className="flex flex-col">
                  <span className="font-semibold text-xl text-red-600">
                    {getSalesPrice(product.price, product.discount).toFixed(2)}{" "}
                    kr
                    <span className="text-secondary-color/70 ms-2 text-lg">
                      inkl. moms
                    </span>
                  </span>
                  <div className="text-neutral-600 text-md">
                    Ordinarie pris:
                    <span className="line-through">{product.price} kr</span>
                  </div>
                </div>
              ) : (
                <div className="font-semibold text-xl">
                  {!chosenVariant ? product?.price : chosenVariant.variantPrice}{" "}
                  kr
                </div>
              )}
            </div>
            {category?.products && category.products.length > 0 && (
              <>
                <div>
                  <span>Produkt: </span>
                  <span className="font-bold">{product?.name}</span>
                </div>
                {/* {category.products.length > 1 && (
                  <div className="flex flex-row flex-wrap space-x-2 space-y-2">
                    {category.products.map((product, index) => (
                      <img
                        key={index}
                        src={typeof product.images[0]}
                        alt={product.name}
                        className="size-20 object-cover cursor-pointer"
                        onClick={() => navigate(`/product?id=${product.id}`)}
                      />
                    ))}
                  </div>
                )} */}
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
                {product?.variants && (
                  <div className="w-full h-full flex flex-row items-center">
                    {product.variants.length > 0 && (
                      <div className="w-fit my-2 h-full flex flex-row flex-wrap items-center">
                        {product.variants.map((variant, index) => {
                          const isSelected = chosenVariant?.id === variant.id;
                          return (
                            <div
                              key={index}
                              className={`h-full flex items-center p-2 py-2 me-2 rounded-md cursor-pointer
                ${
                  isSelected
                    ? "bg-lime-500 text-black"
                    : "bg-secondary-color text-main-color"
                }`}
                              onClick={() => setChosenVariant(variant)}
                            >
                              <div>{variant.variantName}</div>
                            </div>
                          );
                        })}
                      </div>
                    )}
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
