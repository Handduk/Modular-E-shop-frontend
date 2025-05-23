import { useEffect, useState } from "react";
import { useURLId } from "../../../../Hooks/useURLId";
import { getSingleCategory } from "../../../../services/categoryApi";
import { Product } from "../../../../Models/Product";
import {
  getStorage,
  setStorage,
  updateStorage,
} from "../../../../Hooks/localstorage";
import { Category } from "../../../../Models/Category";
import { AddProduct } from "./AddProduct";
import { EditProduct } from "./EditProduct/EditProduct";

export const AddCategoryProduct = () => {
  const { id } = useURLId();
  const [products, setProducts] = useState<Product[]>([]);
  const [singleProduct, setSingleProduct] = useState<Product>({
    id: 0,
    name: "",
    description: "",
    brand: "",
    images: [],
    options: [],
    variants: [],
    discount: 0,
    price: 0,
    categoryId: 0,
  });
  const [showModal, setShowModal] = useState(false);
  const [showProductModal, setShowProductModal] = useState(false);
  const [newProd, setNewProd] = useState<boolean>(false);
  const [deletedProd, setDeletedProd] = useState<boolean>(false);
  const [updatedProduct, setUpdatedProduct] = useState<boolean>(false);

  const category = getStorage("category") as Category;

  const fetchCategorys = async () => {
    if (!id) return;
    try {
      const response = await getSingleCategory(id);
      if (!response.products) response.products = [];
      setProducts(response.products);
      updateStorage("category", response);
    } catch (error) {
      console.error("Error fetching categorys:", error);
    }
  };

  const handleShowModal = () => {
    setNewProd(false);
    setShowModal(true);
  };
  const handleProductModal = (product: Product) => {
    setSingleProduct(product);
    setStorage("product", product);
    setShowProductModal(true);
  };

  useEffect(() => {
    fetchCategorys();
  }, [id, newProd, deletedProd]);

  return (
    <div className="h-[calc(100vh-80px)] text-center">
      <h1>{category && category.name}</h1>
      <div className="flex flex-row flex-wrap mx-4 mt-4">
        <div className="w-full flex flex-row flex-wrap gap-4 ">
          {products &&
            products.map((prod, index) => (
              <div
                key={index}
                className="relative w-52 h-40 flex flex-col items-center justify-center bg-neutral-200/30 border-1 border-neutral-500 cursor-pointer !rounded-2xl
              hover:bg-neutral-300 transition-all duration-300 ease-in-out"
                onClick={() => {
                  handleProductModal(prod);
                }}
              >
                <img
                  src={prod.images[0]}
                  alt={prod.name}
                  className="rounded-2xl inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 rounded-2xl" />
                <div className="absolute text-main-color font-bold text-4xl w-full h-full flex items-center justify-center hover:text-5xl transition-all duration-300 ease-in-out">
                  {prod.name}
                </div>
              </div>
            ))}
          <button
            className="w-52 h-40 flex flex-col items-center justify-center bg-neutral-200/30 border-1 border-neutral-500 !rounded-2xl
        hover:bg-neutral-300 transition-all duration-300 ease-in-out"
            onClick={() => {
              handleShowModal();
            }}
          >
            <h2 className="!text-2xl">Ny Produkt</h2>+
          </button>
        </div>
      </div>

      <AddProduct
        id={id}
        setNewProd={setNewProd}
        show={showModal}
        setShow={setShowModal}
      />
      <EditProduct
        prod={singleProduct}
        setDeletedProd={setDeletedProd}
        setUpdatedProduct={setUpdatedProduct}
        show={showProductModal}
        setShow={setShowProductModal}
      />
    </div>
  );
};
