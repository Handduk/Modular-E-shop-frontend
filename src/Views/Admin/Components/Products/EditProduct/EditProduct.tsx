import { useEffect, useState } from "react";
import { Product } from "../../../../../Models/Product";
import {
  deleteProduct,
  updateProduct,
} from "../../../../../services/productApi";
import { removeStorage } from "../../../../../Hooks/localstorage";

interface EditProductProps {
  prod: Product;
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  setDeletedProd: React.Dispatch<React.SetStateAction<boolean>>;
  setUpdatedProduct: React.Dispatch<React.SetStateAction<boolean>>;
}
export const EditProduct = ({
  prod,
  show,
  setShow,
  setDeletedProd,
  setUpdatedProduct,
}: EditProductProps) => {
  const [product, setProduct] = useState<Product>(prod);
  const [imageFile, setImageFile] = useState<File[]>([]);
  const [imagePreview, setImagePreview] = useState<string[]>([]);
  const [images, setImages] = useState<File[]>([]);

  const handleClose = () => {
    setShow(false);
    setImagePreview([]);
    setImageFile([]);
    setImages([]);
    removeStorage("product");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files;
    if (file) {
      setImages((prev) => [...prev, ...Array.from(file)]);
    }

    if (file) {
      const imagePreviewToAdd = URL.createObjectURL(file[0]);
      setImagePreview((imagePreview) => [...imagePreview, imagePreviewToAdd]);
      console.log("Image file:", file[0]);
    }
  };

  const handleUpdateProduct = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!product) return;
    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("categoryId", product.categoryId.toString());
    formData.append("description", product.description);
    formData.append("brand", JSON.stringify(product.brand));
    formData.append("options", JSON.stringify(product.options));
    formData.append("variants", JSON.stringify(product.variants));
    formData.append("discount", product.discount?.toString() || "");
    formData.append("price", product.price.toString());
    product.images.forEach((image) => {
      formData.append("keptImages", image);
    });
    images.forEach((image) => {
      formData.append("newImages", image);
    });

    try {
      const response = await updateProduct(formData, product.id);
      console.log("Product updated:", response);
      handleClose();
      setUpdatedProduct(true);
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const handleImageDelete = (prod: Product, image: string) => {
    if (imagePreview.includes(image)) {
      if (window.confirm("Vill du verkligen radera bilden?")) {
        const updatedImagePreview = imagePreview.filter((img) => img !== image);
        setImagePreview(updatedImagePreview);
      }
      return;
    }
    if (window.confirm("Vill du verkligen radera bilden?")) {
      const updatedImages = prod.images.filter((img) => img !== image);
      if (updatedImages) {
        const productToUpdate = {
          ...prod,
        };
        productToUpdate.images = updatedImages;
        setProduct(productToUpdate);
      }
      console.log("Updated images:", updatedImages);
    }
  };

  const handleDeleteProduct = async () => {
    if (window.confirm(`Vill du verkligen radera produkten ${product.name}?`)) {
      const response = await deleteProduct(product.id);
      if (response !== 200) {
        window.alert("Något gick fel, produkten raderades inte!");
      }
      handleClose();
      setDeletedProd(true);
    }
  };

  useEffect(() => {
    if (show) {
      setProduct(prod);
      console.log("Product to edit:", prod);
    }
  }, [prod]);

  return (
    product && (
      <>
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
              <h1 className="text-center text-3xl font-semibold">
                {product.name}
              </h1>
              <div className="flex flex-col items-center mt-4">
                <form
                  className="flex flex-col items-center justify-center mt-4 w-8/10"
                  onSubmit={handleUpdateProduct}
                >
                  <input
                    type="hidden"
                    name="categoryId"
                    value={product.categoryId}
                  />
                  <input
                    type="text"
                    placeholder="Produktnamn"
                    name="name"
                    value={product.name}
                    required
                    className="w-full h-10 border !border-neutral-500 !rounded-md mb-4 px-2"
                    onChange={handleChange}
                  />
                  <input
                    type="text"
                    placeholder="Beskrivning"
                    name="description"
                    value={product.description}
                    required
                    className="w-full h-10 border !border-neutral-500 !rounded-md mb-4 px-2"
                    onChange={handleChange}
                  />
                  <input
                    type="number"
                    placeholder="Pris"
                    name="price"
                    value={product.price}
                    required
                    className="w-full h-10 border !border-neutral-500 !rounded-md mb-4 px-2"
                    onChange={handleChange}
                  />

                  {product.images && (
                    <div className="w-full min-h-44 max-h-80 overflow-scroll flex flex-row flex-wrap gap-4 mb-3">
                      {product.images.map((image, index) => (
                        <div
                          key={index}
                          className="relative max-w-40 h-40 overflow-hidden rounded"
                        >
                          <img
                            key={index}
                            src={image}
                            alt={`Produkt bild ${index + 1} av ${product.name}`}
                            className="w-40 h-full object-cover rounded cursor-pointer hover:scale-105 hover:blur-xs transition-all duration-400 ease-in-out"
                          />
                          <div
                            title="Radera bild"
                            className="absolute top-0 right-0 px-2 text-main-color font-semibold cursor-pointer 
                            hover:scale-115 transition-all duration-100 ease-in-out"
                            onClick={() => handleImageDelete(product, image)}
                          >
                            x
                          </div>
                        </div>
                      ))}
                      {imagePreview.map((image, index) => (
                        <div
                          key={index}
                          className="relative w-40 max-h-40 overflow-hidden rounded"
                        >
                          <img
                            key={index}
                            src={image}
                            alt={`Produkt bild ${index + 1} av ${product.name}`}
                            className="w-40 h-full object-cover rounded cursor-pointer hover:scale-105 hover:blur-xs transition-all duration-400 ease-in-out"
                            title="Radera bild"
                          />
                          <div
                            title="Radera bild"
                            className="absolute top-0 right-0 px-2 text-main-color font-semibold cursor-pointer 
                            hover:scale-115 transition-all duration-100 ease-in-out"
                            onClick={() => handleImageDelete(product, image)}
                          >
                            x
                          </div>
                        </div>
                      ))}

                      <div
                        className="w-40 h-40 border border-neutral-500 rounded-md flex text-2xl font-semibold items-center justify-center cursor-pointer
                       hover:bg-neutral-300/30 transition-all duration-300 ease-in-out"
                      >
                        <input
                          id="image-upload"
                          type="file"
                          accept="image/*"
                          name="images"
                          className="hidden"
                          onChange={handleFileChange}
                        />
                        <label
                          htmlFor="image-upload"
                          className="w-full h-full !flex justify-center items-center cursor-pointer
                          hover:scale-105 transition-all duration-300 ease-in-out"
                        >
                          Lägg till bild
                        </label>
                      </div>
                    </div>
                  )}
                  <div className="w-full flex flex-row items-center justify-center gap-4">
                    <button
                      type="submit"
                      className="w-full h-10 bg-neutral-200/30 border !border-neutral-500 !rounded-md
                hover:bg-neutral-300 transition-all duration-300 ease-in-out"
                    >
                      Spara
                    </button>
                    <button
                      type="button"
                      className="w-full h-10 bg-red-500/80 border !border-neutral-500 !rounded-md
                hover:bg-red-600 hover:text-main-color transition-all duration-300 ease-in-out"
                      onClick={() => handleDeleteProduct()}
                    >
                      Radera Produkt
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  );
};
