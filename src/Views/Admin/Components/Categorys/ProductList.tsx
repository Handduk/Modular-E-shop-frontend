import { useEffect, useState } from "react";
import { Category } from "../../../../Models/Category";
import { getAllCategorys } from "../../../../services/categoryApi";
import { AddCategory } from "./AddCategory";
import { useNavigate } from "react-router-dom";
import { getStorage, setStorage } from "../../../../Hooks/localstorage";

export const ProductList = () => {
  const [categorys, setCategorys] = useState<Category[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [createdCategory, setCreatedCategory] = useState<boolean>(false);

  const navigate = useNavigate();

  const showAddCategoryModal = () => {
    setCreatedCategory(false);
    setShowModal(true);
  };

  const fetchCategorys = async () => {
    try {
      const response = await getAllCategorys();
      setCategorys(response);
    } catch (error) {
      console.error("Error fetching categorys:", error);
    }
  };

  useEffect(() => {
    fetchCategorys();
  }, [createdCategory]);

  const handleNavigate = (category: Category) => {
    setStorage("category", category);

    if (!getStorage("category")) setStorage("category", category);
    navigate(`/admin/category?id=${category.id}`);
  };

  return (
    <div className="text-center">
      <h1>Produkter</h1>
      <div className="flex flex-row flex-wrap mx-4 mt-4">
        <div className="flex flex-row flex-wrap gap-4 me-4">
          {categorys &&
            categorys.map((cat, index) => (
              <div
                key={index}
                className="relative w-52 h-40 flex flex-col items-center justify-center bg-neutral-200/30 border-1 border-neutral-500 cursor-pointer !rounded-2xl
              hover:bg-neutral-300 transition-all duration-300 ease-in-out"
                onClick={() => handleNavigate(cat)}
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="rounded-2xl inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 rounded-2xl" />
                <div className="absolute text-main-color font-bold text-4xl w-full h-full flex items-center justify-center hover:text-5xl transition-all duration-300 ease-in-out">
                  {cat.name}
                </div>
              </div>
            ))}
        </div>
        <div>
          <button
            className="w-52 h-40 flex flex-col items-center justify-center bg-neutral-200/30 border-1 border-neutral-500 !rounded-2xl
        hover:bg-neutral-300 transition-all duration-300 ease-in-out"
            onClick={() => showAddCategoryModal()}
          >
            <h2 className="!text-2xl">Ny kategori</h2>+
          </button>
        </div>
      </div>
      <AddCategory
        show={showModal}
        setShow={setShowModal}
        setCreatedCategory={setCreatedCategory}
      />
    </div>
  );
};
