import { Category } from "../../../../Models/Category";
import { createCategory } from "../../../../services/categoryApi";

interface AddCategoryProps {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}

const category: Category = {
  id: 0,
  name: "test",
};

export const AddCategory = ({ show, setShow }: AddCategoryProps) => {
  const handlePostCategory = async (e: React.MouseEvent) => {
    e.preventDefault();
    console.log("Category:", category);
    try {
      const response = await createCategory(category);
      console.log("Category created:", response);
    } catch (error) {
      console.error("Error creating category:", error);
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
          <h1 className="text-center text-3xl font-semibold">Ny kategori</h1>
          <form className="flex flex-col items-center justify-center mt-4">
            <input
              type="text"
              placeholder="Namn på kategori"
              className="w-8/10 h-10 border !border-neutral-500 !rounded-md mb-4 px-2"
            />
            <button
              type="submit"
              className="w-8/10 h-10 bg-neutral-200/30 border !border-neutral-500 !rounded-md
                hover:bg-neutral-300 transition-all duration-300 ease-in-out"
              onClick={(e) => handlePostCategory(e)}
            >
              Skapa kategori
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
