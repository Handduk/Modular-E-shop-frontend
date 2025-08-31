import { useEffect, useState } from "react";
import { useCart } from "../../Context/CartContext";
import { useURLId } from "../../Hooks/useURLId";
import { Product } from "../../Models/Product";
import { getSalesPrice } from "../../Handlers/SalesPrice";
import { useProduct } from "../../Context/ProductContext";
import { getProductById } from "../../services/productApi";
import { Variant } from "../../Models/Variant";
import { Footer } from "../../Components/Footer/Footer";
import { ProductImageModal } from "../../Components/Products/ProductImageModal";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface ProductImageProps {
  image: string;
  index: number;
}

export const ProductPage = () => {
  const { setCartQuantity, cartPopup } = useCart();
  const { id } = useURLId();
  const { products } = useProduct();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [chosenVariant, setChosenVariant] = useState<Variant | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [showimgModal, setShowImgModal] = useState<boolean>(false);
  const [imagePreview, setImagePreview] = useState<ProductImageProps>({
    image: product?.images[0] || "",
    index: 0,
  });
  const [viewPort, setViewPort] = useState<number>(window.innerWidth);

  useEffect(() => {
    getProduct();
  }, [products, id]);

  const getProduct = async () => {
    if (!products || !products.length || !id) return;

    const response = await getProductById(id);
    if (response) {
      setProduct(response);
      setSelectedOption(
        response.options && response.options.length >= 0
          ? response.options[0]
          : null
      );
      setImagePreview({ image: response.images[0] || "", index: 0 });
      setChosenVariant(response.variants ? response.variants[0] : null);
    }
  };

  useEffect(() => {
    setQuantity(1);
  }, [product]);

  useEffect(() => {
    if (showimgModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showimgModal]);

  useEffect(() => {
    const handeResize = () => setViewPort(window.innerWidth);
    window.addEventListener("resize", handeResize);
    return () => window.removeEventListener("resize", handeResize);
  }, []);

  const handleOptionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    const indexValue = e.target.selectedIndex;
    setSelectedOption((prev) => (prev === value ? null : value));
    showOptionImage(indexValue);
  };

  const handleNegativeQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    } else {
      setQuantity(1);
    }
  };

  const showOptionImage = (value: number) => {
    if (product?.images.length === 1) {
      setImagePreview(imagePreview);
    } else {
      setImagePreview({
        image: product?.images.find((_img, index) => index === value) || "",
        index: value,
      });
    }
  };

  const showNextImage = () => {
    const nextImageIndex = imagePreview.index + 1;
    if (
      product &&
      product.images &&
      nextImageIndex > product.images.length - 1
    ) {
      setImagePreview({ image: product.images[0], index: 0 });
      setSelectedOption(product.options ? product.options[0] : null);
    } else {
      setImagePreview({
        image:
          product?.images.find((_img, index) => index === nextImageIndex) || "",
        index: nextImageIndex,
      });
      setSelectedOption(
        (product && product.options && product.options[nextImageIndex]) || null
      );
    }
  };

  const showPrevImage = () => {
    setImagePreview((prev) => {
      if (!product) return prev;
      const prevIndex =
        prev.index === 0 ? product.images.length - 1 : prev.index - 1;
      setSelectedOption(product.options?.[prevIndex] || null);
      return {
        image: product.images[prevIndex],
        index: prevIndex,
      };
    });
  };

  return (
    <div className="contentBody lg:pt-20">
      <div className="content lg:px-20">
        <div className="flex flex-col items-center justify-center md:w-full lg:w-full lg:flex-row lg:space-x-10">
          <div className="mb-2 md:h-2/3 md:w-2/3 lg:w-1/2 lg:h-full lg:!mb-0">
            <div
              className={`relative flex justify-center items-center h-[500px] w-screen select-none md:w-full md:h-[700px] lg:h-full`}
            >
              <div
                className={`absolute left-0 h-[500px] w-[75px] flex items-center cursor-pointer ${
                  viewPort > 800 && "relative h-fit w-fit px-2 py-6"
                } ${
                  product &&
                  product.images &&
                  product.images.length <= 2 &&
                  "hidden"
                }`}
                onClick={() => showPrevImage()}
              >
                <FontAwesomeIcon
                  icon={faAngleLeft}
                  className={`text-3xl cursor-pointer 
                ${viewPort < 800 ? "text-white drop-shadow-lg ms-2" : ""}`}
                />
              </div>
              {product && product.images && (
                <img
                  className="h-full w-full object-cover cursor-pointer lg:h-[700px]"
                  onClick={() => setShowImgModal(true)}
                  src={imagePreview.image}
                  alt={product?.name}
                />
              )}
              <div
                className={`absolute right-0 h-[500px] w-[75px] flex items-center justify-end cursor-pointer ${
                  viewPort > 800 && "relative h-fit w-fit px-2 py-6"
                } ${
                  product &&
                  product.images &&
                  product.images.length <= 2 &&
                  "hidden"
                }`}
                onClick={() => showNextImage()}
              >
                <FontAwesomeIcon
                  icon={faAngleRight}
                  className={`text-3xl cursor-pointer 
        ${viewPort < 800 ? "text-white drop-shadow-lg me-2" : ""}`}
                />
              </div>
            </div>
          </div>

          <div className="w-11/12 flex flex-col space-y-2">
            <div className="text-black text-2xl font-semibold">
              {product?.name}
              <span className="secondary-color font-normal ms-2">
                {chosenVariant?.variantName}
              </span>
            </div>
            <div className="flex flex-row space-x-2 items-end">
              {product?.discount ? (
                <div className="flex flex-col">
                  <span className="font-semibold text-xl text-red-600">
                    {getSalesPrice(product.price, product.discount).toFixed(2)}
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
            <div className={`${!product?.options && "m-0"}`}>
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
            {product?.options && selectedOption && (
              <div
                className={`flex flex-row flex-wrap space-x-4 ${
                  !product.variants?.length && "m-0"
                }`}
              >
                <select
                  name="options"
                  id="options"
                  value={selectedOption || ""}
                  className="h-fit border border-black min-w-[6rem] p-2 rounded-sm font-semibold cursor-pointer
                            "
                  onChange={(e) => handleOptionChange(e)}
                >
                  {product.options.map((option, index) => (
                    <option value={option} key={index}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            )}
            {product?.variants && (
              <div className="w-full h-full flex flex-row items-center">
                {product.variants.length > 0 && (
                  <div className="w-fit h-full flex flex-row flex-wrap items-center">
                    {product.variants.map((variant, index) => {
                      const isSelected = chosenVariant?.id === variant.id;
                      return (
                        <div
                          key={index}
                          className={`flex items-center justify-center p-2 me-2 rounded-md cursor-pointer md:!p-4
                ${
                  isSelected
                    ? "bg-yellow-500 text-black"
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
            <div className="w-full mt-2">
              <button
                className="border border-secondary-color w-full h-full bg-secondary-color text-main-color py-3"
                onClick={() => {
                  product &&
                    setCartQuantity(
                      product,
                      selectedOption,
                      chosenVariant,
                      quantity
                    );
                  cartPopup();
                }}
              >
                Lägg i varukorg
              </button>
            </div>
            <div className="flex flex-col space-y-2 mt-2 mb-16">
              <span className="text-black text-xl font-semibold">
                Produktinformation
              </span>
              <span className="text-black text-base whitespace-pre-line">
                {product?.description}
              </span>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <ProductImageModal
        show={showimgModal}
        setShow={setShowImgModal}
        image={product && product.images ? imagePreview.image : ""}
      />
    </div>
  );
};
