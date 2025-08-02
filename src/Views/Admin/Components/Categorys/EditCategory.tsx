import { useEffect, useState } from "react";
import { Category } from "../../../../Models/Category";
import { removeStorage, updateStorage } from "../../../../Hooks/localstorage";
import {
  deleteCategory,
  updateCategory,
} from "../../../../services/categoryApi";

interface EditCategoryProps {
  cat: Category;
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  setDeletedCat: React.Dispatch<React.SetStateAction<boolean>>;
  setUpdatedCat: React.Dispatch<React.SetStateAction<boolean>>;
}

export const EditCategory = ({
  cat,
  show,
  setShow,
  setDeletedCat,
  setUpdatedCat,
}: EditCategoryProps) => {
  const [category, setCategory] = useState<Category>(cat);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleClose = () => {
    setShow(false);
    setImagePreview("");
    setSelectedFile(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCategory((prevCategory) => ({
      ...prevCategory,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imagePreviewToAdd = URL.createObjectURL(file);
      setSelectedFile(file);
      setImagePreview(imagePreviewToAdd);
    }
  };

  const handleUpdateCategory = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!category) return;

    const formData = new FormData();
    formData.append("name", category.name || "");
    formData.append("description", category.description || "");
    if (selectedFile) {
      formData.append("image", selectedFile);
    }

    try {
      const response = await updateCategory(formData, category.id);
      console.log("Category updated:", response);
      handleClose();
      setUpdatedCat(true);
      updateStorage("category", response);
    } catch (error) {
      console.error("Error updating category:", error);
    }
  };

  const handleImageDelete = (cat: Category, image: string) => {
    if (imagePreview === image) {
      if (window.confirm("Vill du verkligen radera bilden?")) {
        setImagePreview("");
        setSelectedFile(null);
      }
      return;
    }

    if (window.confirm("Vill du verkligen radera bilden?")) {
      const categoryToUpdate = { ...cat, image: undefined };
      setCategory(categoryToUpdate);
    }
  };

  const handleDeleteProduct = async () => {
    if (
      window.confirm(`Vill du verkligen radera kategorin ${category.name}?`)
    ) {
      const response = await deleteCategory(category.id);
      if (response !== 200) {
        window.alert("Något gick fel, produkten raderades inte!");
      }
      handleClose();
      setDeletedCat(true);
    }
  };

  useEffect(() => {
    if (show) {
      setCategory(cat);
      setImagePreview("");
      setSelectedFile(null);
    }
  }, [cat, show]);

  return (
    category && (
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
              onClick={handleClose}
            >
              X
            </button>
          </div>
          <div>
            <h1 className="text-center text-3xl font-semibold">
              {category.name}
            </h1>
            <div className="flex flex-col items-center mt-4">
              <form
                className="flex flex-col items-center justify-center mt-4 w-8/10"
                onSubmit={handleUpdateCategory}
              >
                <input type="hidden" name="id" value={category.id} />
                <input
                  type="text"
                  placeholder="Produktnamn"
                  name="name"
                  value={category.name}
                  required
                  className="w-full h-10 border !border-neutral-500 !rounded-md mb-4 px-2"
                  onChange={handleChange}
                />
                <input
                  type="text"
                  placeholder="Beskrivning"
                  name="description"
                  value={category.description}
                  required
                  className="w-full h-10 border !border-neutral-500 !rounded-md mb-4 px-2"
                  onChange={handleChange}
                />

                <div className="w-full min-h-44 max-h-80 overflow-scroll flex flex-wrap gap-4 mb-3">
                  {category.image && (
                    <div className="relative max-w-40 h-40 overflow-hidden rounded">
                      <img
                        src={category.image}
                        alt={`Kategori bild ${category.name}`}
                        className="w-40 h-full object-cover rounded cursor-pointer hover:scale-105 hover:blur-xs transition-all duration-400 ease-in-out"
                      />
                      <div
                        title="Radera bild"
                        className="absolute top-0 right-0 px-2 text-main-color font-semibold cursor-pointer 
                          hover:scale-115 transition-all duration-100 ease-in-out"
                        onClick={() =>
                          handleImageDelete(category, category.image || "")
                        }
                      >
                        x
                      </div>
                    </div>
                  )}

                  {imagePreview && (
                    <div className="relative max-w-40 h-40 overflow-hidden rounded">
                      <img
                        src={imagePreview}
                        alt={`Kategori bild av ${category.name}`}
                        className="w-40 h-full object-cover rounded cursor-pointer hover:scale-105 hover:blur-xs transition-all duration-400 ease-in-out"
                        title="Radera bild"
                      />
                      <div
                        title="Radera bild"
                        className="absolute top-0 right-0 px-2 text-main-color font-semibold cursor-pointer 
                          hover:scale-115 transition-all duration-100 ease-in-out"
                        onClick={() =>
                          handleImageDelete(category, imagePreview)
                        }
                      >
                        x
                      </div>
                    </div>
                  )}
                  <div className="relative">
                    <label
                      htmlFor="category-image-upload"
                      className="w-40 h-40 border border-neutral-500 rounded-md text-2xl font-semibold cursor-pointer
                        hover:bg-neutral-300/30 transition-all duration-300 ease-in-out"
                    >
                      <div className="text-center h-full flex items-center justify-center">
                        {imagePreview || category.image
                          ? "Byt bild"
                          : "Lägg till bild"}
                      </div>
                    </label>
                    <input
                      id="category-image-upload"
                      type="file"
                      accept="image/*"
                      name="image"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                  </div>
                </div>

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
                    onClick={handleDeleteProduct}
                  >
                    Radera Produkt
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  );
};
