import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Section, sectionData } from "../../../../Models/Section";
import { useProduct } from "../../../../Context/ProductContext";
import { Product } from "../../../../Models/Product";

export const Topsection = () => {
  const [section, setSection] = useState<Section>(sectionData[0]);
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { products, mainPageProduct, searchForProduct } = useProduct();

  useEffect(() => {
    if (products.length > 0 && !mainPageProduct) {
      searchForProduct("Slättakaffe");
    }
  }, [products]);

  useEffect(() => {
    if (mainPageProduct) {
      setProduct(mainPageProduct);
      setLoading(false);
    }
  }, [mainPageProduct]);

  const navigate = useNavigate();

  const getInfoLink = () => {
    const infoLink = section.link.split("/")[1];
    navigate(`/${infoLink}`);
  };

  return (
    <>
      <section className="flex flex-col items-center w-full mb-4 lg:flex-row px-4">
        {loading ? (
          <div className="h-96 w-full bg-neutral-600 animate-pulse" />
        ) : (
          <div className="w-full lg:w-1/2">
            <img
              src={product?.images[0]}
              alt="product"
              className="h-96 w-full object-cover object-bottom cursor-pointer my-2
            md:h-120 md:object-[25%_85%] lg:object-[25%_75%] lg:h-140 rounded-md border"
              onClick={() => navigate("shop/kaffe")}
            />
          </div>
        )}
        <div className="flex flex-col lg:w-1/2 lg:h-full lg:justify-around lg:mx-4">
          <div className="flex flex-col items-center mb-4 lg:px-4">
            <div className="text-[2rem] font-extrabold w-full">
              {product?.name}
            </div>
            <div className="w-full leading-5">{product?.description}</div>
          </div>
          <div className="w-full mb-6 flex items-center lg:mb-0 lg:px-4">
            <button
              className="border border-black py-2.5 px-4 rounded-xs !mr-6"
              onClick={() => navigate("")}
            >
              Läs mer
            </button>
            <button
              className="border border-black bg-neutral-900 text-neutral-50 py-2.5 px-4 rounded-xs"
              onClick={() => navigate("shop/kaffe")}
            >
              Handla kaffe
            </button>
          </div>
        </div>
      </section>
    </>
  );
};
