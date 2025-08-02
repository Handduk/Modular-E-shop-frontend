import { handleAddVariant } from "../../Hooks/Products/AddEdit";
import { Product } from "../../Models/Product";
import { Variant } from "../../Models/Variant";

interface handleVariantProps {
  product: Product;
  setProduct: React.Dispatch<React.SetStateAction<Product>>;
  newVariant: Variant;
  setNewVariant: React.Dispatch<React.SetStateAction<Variant>>;
}

export const HandleVariant = ({
  product,
  setProduct,
  newVariant,
  setNewVariant,
}: handleVariantProps) => {
  return (
    <div className="w-full h-24 flex flex-row items-center mb-4">
      <div className="w-fit h-full flex flex-col justify-center">
        <div className="w-fit flex items-center">
          <label htmlFor="variantName" className="w-16 mb-1 text-start">
            Storlek:
          </label>
          <input
            id="variantName"
            className="w-44 h-10 border !border-neutral-500 !rounded-md px-2 bg-neutral-200"
            type="text"
            name="name"
            placeholder="Ex: S, M, 100g, 1kg"
            value={newVariant.name}
            onChange={(e) => {
              setNewVariant((prev) => ({
                ...prev,
                name: e.target.value,
              }));
            }}
          />
        </div>

        <div className="mt-2 flex items-center">
          <label htmlFor="variantPrice" className="w-16 mb-1 text-start">
            Pris:
          </label>
          <input
            id="variantPrice"
            className="w-44 h-10 border !border-neutral-500 !rounded-md px-2 bg-neutral-200"
            type="number"
            name="price"
            step="any"
            placeholder="Ex: 100, 200"
            value={newVariant.price}
            onChange={(e) => {
              setNewVariant((prev) => ({
                ...prev,
                price: parseInt(e.target.value, 10),
              }));
            }}
          />
        </div>
      </div>

      <div className="w-full h-full flex flex-row items-center">
        {product && product.variants && product.variants.length > 0 && (
          <div className="w-fit h-full flex flex-row flex-wrap items-center">
            {product.variants.map((variant, index) => (
              <div
                key={index}
                className="h-full flex items-center bg-secondary-color text-main-color px-2 py-1 rounded-md ms-2 cursor-pointer"
                onClick={() => {
                  setProduct((prev) => ({
                    ...prev,
                    variants: prev.variants?.filter((opt) => opt !== variant),
                  }));
                }}
              >
                <div className="flex flex-col gap-2">
                  <span>{variant.name}</span>
                  <span>{variant.price} kr</span>
                </div>
              </div>
            ))}
          </div>
        )}
        <button
          className="h-10 w-10 border !border-neutral-500 !rounded-md bg-neutral-200 ms-2 font-bold !text-xl
                                            hover:bg-neutral-300 transition-all duration-200 ease-in-out"
          type="button"
          onClick={(e) => {
            console.log(newVariant);
            handleAddVariant(e, newVariant, product, setProduct, setNewVariant);
          }}
        >
          +
        </button>
      </div>
    </div>
  );
};
