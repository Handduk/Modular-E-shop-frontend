import { useEffect, useState } from "react";
import { Product } from "../../../../../Models/Product";
import {
  deleteProduct,
  getProductById,
  updateProduct,
} from "../../../../../services/productApi";
import { removeStorage } from "../../../../../Hooks/localstorage";
import {
  handleAddOption,
  initVariant,
} from "../../../../../Hooks/Products/AddEdit";
import { Variant } from "../../../../../Models/Variant";
import { HandleVariant } from "../../../../../Components/AddEditProd/HandleVariant";
import { UpdateProductDTO } from "../../../../../Models/dto/updateProductDTO";

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
  const [imagePreview, setImagePreview] = useState<string[]>([]);
  const [images, setImages] = useState<File[]>([]);
  const [newOption, setNewOption] = useState<string>("");

  const [newVariant, setNewVariant] = useState<Variant>(initVariant);

  const getProduct = async () => {
    const response = await getProductById(prod.id);
    if (response) {
      setProduct(response);
      setImagePreview([]);
      setImages([]);
      setNewVariant(initVariant);
    }
  };

  useEffect(() => {
    if (show) {
      getProduct();
    }
  }, [prod]);

  const handleClose = () => {
    setShow(false);
    setImagePreview([]);
    setImages([]);
    removeStorage("product");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (!product) return;
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
    }
  };

  const handleUpdateProduct = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!product) return;
    const dto: UpdateProductDTO = {
      brand: product.brand,
      name: product.name,
      description: product.description,
      price: product.price,
      discount: product.discount,
      options: product.options,
      newImages: images,
      keptImages: product.images,
      variants: product.variants || [],
      variantImages: [],
    };
    if (!dto) return;
    const formData = new FormData();
    formData.append("name", dto.name);
    formData.append("description", dto.description);
    formData.append("brand", dto.brand || "");
    formData.append("discount", dto.discount?.toString() || "");
    formData.append("price", dto.price.toString());

    dto.options?.forEach((option) => {
      formData.append("options", option || "");
    });

    formData.append("variantJson", JSON.stringify(dto.variants));

    dto.newImages.forEach((image) => {
      formData.append("newImages", image);
    });

    dto.keptImages.forEach((image) => {
      formData.append("keptImages", image);
    });

    dto.variantImages.forEach(({ variantId, file }) => {
      const filename = `variant_${variantId}_${file.name}`;
      const blob = new File([file], filename, { type: file.type });
      formData.append("variantImages", blob);
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
                    step="any"
                    placeholder="Pris"
                    name="price"
                    value={product.price}
                    required
                    className="w-full h-10 border !border-neutral-500 !rounded-md mb-4 px-2"
                    onChange={handleChange}
                  />

                  <label htmlFor="options" className="self-start mb-1 ms-1">
                    Alternativ
                  </label>
                  <div className="w-full flex flex-row items-center mb-2">
                    <input
                      id="options"
                      className="w-36 h-10 border !border-neutral-500 !rounded-md px-2 bg-neutral-200"
                      type="text"
                      name="options"
                      placeholder="Ex: Färg"
                      value={newOption}
                      onChange={(e) => {
                        setNewOption(e.target.value);
                      }}
                    />
                    {product &&
                      product.options &&
                      product.options.length > 0 && (
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
                  <HandleVariant
                    product={product}
                    setProduct={setProduct}
                    newVariant={newVariant}
                    setNewVariant={setNewVariant}
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
