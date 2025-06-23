import { useState } from "react";
import { Product } from "../../../../Models/Product";
import {
  handleAddOption,
  handleAddVariant,
  handleChangeProduct,
  handlePostProduct,
} from "../../../../Hooks/Products/AddEdit";

interface AddProductProps {
  id: number;
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  setNewProd: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AddProduct = ({
  id,
  show,
  setShow,
  setNewProd,
}: AddProductProps) => {
  const defaultValue: Product = {
    id: 0,
    categoryId: id,
    name: "",
    description: "",
    price: 0,
    brand: "",
    options: [],
    variants: [],
    discount: 0,
    images: [],
  };

  const [product, setProduct] = useState<Product>(defaultValue);
  const [images, setImages] = useState<File[]>([]);
  const [newOption, setNewOption] = useState<string>("");
  const [newVariant, setNewVariant] = useState<string>("");

  const categoryId = id;

  return (
    <div
      className={`${
        show
          ? "opacity-100 pointer-events-auto transition-all duration-200"
          : "opacity-0 pointer-events-none transition-all duration-200"
      } absolute top-0 left-0 w-full h-full flex items-center justify-center bg-neutral-800/80`}
    >
      <div className="w-8/10 h-8/10 flex flex-col bg-main-color">
        <div className="w-full h-8 flex justify-end">
          <button
            className="w-10 h-full border !border-neutral-500 !rounded-md me-2 mt-2
          hover:bg-neutral-300 transition-all duration-300 ease-in-out"
            onClick={() => setShow(!show)}
          >
            X
          </button>
        </div>
        <div className="flex flex-col items-center">
          <h1 className="text-center text-3xl font-semibold">Ny Produkt</h1>
          <form
            className="flex flex-col mt-4 w-8/10"
            onSubmit={(e) =>
              handlePostProduct(
                e,
                product,
                categoryId,
                images,
                setNewProd,
                setShow,
                setProduct
              )
            }
          >
            <input type="hidden" name="categoryId" value={categoryId} />
            <label htmlFor="productName" className="self-start mb-1 ms-1">
              Produktnamn
            </label>
            <input
              id="productName"
              type="text"
              name="name"
              required
              className="h-10 border !border-neutral-500 !rounded-md mb-2 px-2 bg-neutral-200"
              onChange={(e) => handleChangeProduct(e, setProduct)}
            />
            <label
              htmlFor="productDescription"
              className="self-start mb-1 ms-1"
            >
              Beskrivning
            </label>
            <input
              id="productDescription"
              type="text"
              name="description"
              required
              className="h-10 border !border-neutral-500 !rounded-md mb-2 px-2 bg-neutral-200"
              onChange={(e) => handleChangeProduct(e, setProduct)}
            />
            <label htmlFor="Price" className="self-start mb-1 ms-1">
              Pris (kr)
            </label>
            <input
              id="Price"
              type="number"
              step="any"
              defaultValue={0}
              name="price"
              required
              className="h-10 border !border-neutral-500 !rounded-md mb-2 px-2 bg-neutral-200"
              onChange={(e) => handleChangeProduct(e, setProduct)}
            />
            <label htmlFor="options" className="self-start mb-1 ms-1">
              Alternativ
            </label>
            <div className="flex flex-row items-center mb-2">
              <input
                id="options"
                className="w-36 h-10 border !border-neutral-500 !rounded-md px-2 bg-neutral-200"
                type="text"
                name="options"
                placeholder="Ex: Färg, Storlek"
                value={newOption}
                onChange={(e) => {
                  setNewOption(e.target.value);
                }}
              />
              {product && product.options && product.options.length > 0 && (
                <div className="flex flex-row flex-wrap items-center">
                  {product.options.map((option, index) => (
                    <div
                      key={index}
                      className="h-10 flex items-center bg-secondary-color text-main-color px-2 py-1 rounded-md ms-2 cursor-pointer"
                      onClick={() => {
                        setProduct((prev) => ({
                          ...prev,
                          options: prev.options?.filter(
                            (opt) => opt !== option
                          ),
                        }));
                      }}
                    >
                      {option}
                    </div>
                  ))}
                </div>
              )}
              <button
                className="h-10 w-10 border !border-neutral-500 !rounded-md bg-neutral-200 ms-2 font-bold !text-xl
              hover:bg-neutral-300 transition-all duration-200 ease-in-out"
                type="button"
                onClick={(e) =>
                  handleAddOption(e, setProduct, setNewOption, newOption)
                }
              >
                +
              </button>
            </div>
            <label htmlFor="variants" className="self-start mb-1 ms-1">
              Storlek
            </label>

            <div className="flex flex-row items-center mb-2">
              <input
                id="variants"
                className="w-44 h-10 border !border-neutral-500 !rounded-md px-2 bg-neutral-200"
                type="text"
                name="variants"
                placeholder="Ex: S, M, 100g, 1kg"
                value={newVariant}
                onChange={(e) => {
                  setNewVariant(e.target.value);
                }}
              />
              {product && product.variants && product.variants.length > 0 && (
                <div className="flex flex-row flex-wrap items-center">
                  {product.variants.map((variant, index) => (
                    <div
                      key={index}
                      className="h-10 flex items-center bg-secondary-color text-main-color px-2 py-1 rounded-md ms-2 cursor-pointer"
                      onClick={() => {
                        setProduct((prev) => ({
                          ...prev,
                          variants: prev.variants?.filter(
                            (opt) => opt !== variant
                          ),
                        }));
                      }}
                    >
                      {variant}
                    </div>
                  ))}
                </div>
              )}
              <button
                className="h-10 w-10 border !border-neutral-500 !rounded-md bg-neutral-200 ms-2 font-bold !text-xl
              hover:bg-neutral-300 transition-all duration-200 ease-in-out"
                type="button"
                onClick={(e) =>
                  handleAddVariant(e, newVariant, setProduct, setNewVariant)
                }
              >
                +
              </button>
            </div>
            <label htmlFor="images" className="self-start mb-1 ms-1">
              Produktbilder
            </label>
            <input
              id="images"
              type="file"
              accept="image/*"
              name="images"
              onChange={(e) => {
                if (e.target.files) {
                  setImages(Array.from(e.target.files));
                }
              }}
              multiple
              className="block h-12 text-base border !border-neutral-500 !rounded-md mb-4 file:cursor-pointer cursor-pointer bg-neutral-200
              file:h-full file:bg-secondary-color file:text-main-color file:px-2 file:mr-4
               focus:outline-none"
            />
            <button
              type="submit"
              className=" h-10 bg-neutral-200/30 border !border-neutral-500 !rounded-md
                hover:bg-neutral-300 transition-all duration-300 ease-in-out"
            >
              Skapa Produkt
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
