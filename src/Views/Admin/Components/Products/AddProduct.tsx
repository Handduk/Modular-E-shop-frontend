import { useEffect, useState } from "react";
import { Product } from "../../../../Models/Product";
import { createProduct } from "../../../../services/productApi";

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
  const [product, setProduct] = useState<Product>();
  const [images, setImages] = useState<File[]>([]);

  const categoryId = id;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProduct(
      (prev) =>
        ({
          ...prev,
          [name]: name === "price" ? parseFloat(value) : value,
        } as Product)
    );
  };

  const handlePostProduct = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!product) return;

    const formData = new FormData();

    formData.append("name", product?.name || "");
    formData.append("categoryId", id.toString());
    formData.append("description", product?.description || "");
    formData.append("brand", product?.brand || "");
    formData.append("options", JSON.stringify(product?.options || []));
    formData.append("variants", JSON.stringify(product?.variants || []));
    formData.append("discount", product?.discount?.toString() || "");
    formData.append("price", product?.price.toString() || "");
    images.forEach((image) => {
      formData.append("images", image);
    });

    try {
      const response = await createProduct(formData);
      console.log("Product created:", response);
      setNewProd(true);
      setShow(false);
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

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
        <div>
          <h1 className="text-center text-3xl font-semibold">Ny Produkt</h1>
          <form
            className="flex flex-col items-center justify-center mt-4"
            onSubmit={handlePostProduct}
          >
            <input type="hidden" name="categoryId" value={categoryId} />
            <input
              type="text"
              placeholder="Produktnamn"
              name="name"
              value={product?.name}
              required
              className="w-8/10 h-10 border !border-neutral-500 !rounded-md mb-4 px-2"
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="Beskrivning"
              name="description"
              value={product?.description}
              required
              className="w-8/10 h-10 border !border-neutral-500 !rounded-md mb-4 px-2"
              onChange={handleChange}
            />
            <input
              type="number"
              placeholder="Pris"
              name="price"
              value={product?.price}
              required
              className="w-8/10 h-10 border !border-neutral-500 !rounded-md mb-4 px-2"
              onChange={handleChange}
            />
            <input
              type="file"
              accept="image/*"
              name="images"
              onChange={(e) => {
                if (e.target.files) {
                  setImages(Array.from(e.target.files));
                }
              }}
              multiple
              className="block w-8/10 h-12 text-base border !border-neutral-500 !rounded-md mb-4 file:cursor-pointer cursor-pointer
              file:h-full file:bg-secondary-color file:text-main-color file:px-2 file:mr-4
               focus:outline-none"
            />
            <button
              type="submit"
              className="w-8/10 h-10 bg-neutral-200/30 border !border-neutral-500 !rounded-md
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
