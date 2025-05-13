import { useEffect, useState } from "react";
import { Category } from "../../../../Models/Category";
import { getAllCategorys } from "../../../../services/categoryApi";
import { AddCategory } from "./AddCategory";

export const ProductList = () => {
  const [categorys, setCategorys] = useState<Category[]>([]);
  const [showModal, setShowModal] = useState(false);

  const showAddCategoryModal = () => {
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
  }, []);

  return (
    <div className="text-center">
      <h1>Produkter</h1>
      <div className="flex flex-row flex-wrap mx-4 gap-4 mt-4">
        <div>
          {categorys &&
            categorys.map((cat, index) => (
              <div
                key={index}
                className="w-52 h-40 flex flex-col items-center justify-center bg-neutral-200/30 border-1 border-neutral-500 !rounded-2xl
              hover:bg-neutral-300 transition-all duration-300 ease-in-out"
              >
                {cat.name}
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
      <AddCategory show={showModal} setShow={setShowModal} />
    </div>
  );
};
