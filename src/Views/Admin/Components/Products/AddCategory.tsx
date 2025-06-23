import { useState } from "react";
import { Category } from "../../../../Models/Category";
import { createCategory } from "../../../../services/categoryApi";

interface AddCategoryProps {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  setCreatedCategory: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AddCategory = ({
  show,
  setShow,
  setCreatedCategory,
}: AddCategoryProps) => {
  const [category, setCategory] = useState<Category>({
    id: 0,
    name: "",
    description: "",
    imageUrl: "",
  });
  const [image, setImage] = useState<File | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCategory((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePostCategory = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!category) return;
    const formData = new FormData();
    formData.append("name", category.name);
    formData.append("description", category.description || "");
    if (image) {
      formData.append("image", image);
    }

    try {
      const response = await createCategory(formData);
      console.log("Category created:", response);
      setCreatedCategory(true);
      setShow(false);
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
        <div className="flex flex-col items-center">
          <h1 className="text-center text-3xl font-semibold">Ny Kategori</h1>
          <form
            className="flex flex-col mt-4 w-8/10"
            onSubmit={(e) => handlePostCategory(e)}
          >
            <label htmlFor="categoryName" className="self-start mb-1 ms-1">
              Kategorinamn
            </label>
            <input
              id="categoryName"
              type="text"
              name="name"
              required
              className="h-10 border !border-neutral-500 !rounded-md mb-2 px-2 bg-neutral-200"
              onChange={(e) => handleChange(e)}
            />
            <label
              htmlFor="categoryDescription"
              className="self-start mb-1 ms-1"
            >
              Beskrivning
            </label>
            <input
              id="categoryDescription"
              type="text"
              name="description"
              required
              className="h-10 border !border-neutral-500 !rounded-md mb-2 px-2 bg-neutral-200"
              onChange={(e) => handleChange(e)}
            />
            <label htmlFor="image" className="self-start mb-1 ms-1">
              Kategoribild
            </label>
            <input
              id="image"
              type="file"
              accept="image/*"
              name="image"
              onChange={(e) => {
                if (e.target.files) {
                  setImage(e.target.files[0]);
                }
              }}
              className="block h-12 text-base border !border-neutral-500 !rounded-md mb-4 file:cursor-pointer cursor-pointer bg-neutral-200
                  file:h-full file:bg-secondary-color file:text-main-color file:px-2 file:mr-4
                   focus:outline-none"
            />
            <button
              type="submit"
              className=" h-10 bg-neutral-200/30 border !border-neutral-500 !rounded-md
                    hover:bg-neutral-300 transition-all duration-300 ease-in-out"
            >
              Skapa kategori
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
