import { Product } from "../../Models/Product";
import { Variant } from "../../Models/Variant";
import { createProduct } from "../../services/productApi";

export  const initVariant: Variant = {
    id: 0,
    productId: 0,
    name: "",
    price: 0,
  };

export const handleChangeProduct = (e: React.ChangeEvent<HTMLInputElement>, setProduct: React.Dispatch<React.SetStateAction<Product>>) => {
    const { name, value } = e.target;
    setProduct(
      (prev) =>
        ({
          ...prev,
          [name]: name === "price" ? parseFloat(value) : value,
        } as Product)
    );
  };

  export const handleAddVariant = (e: React.MouseEvent<HTMLButtonElement>,
     newVariant: Variant,
     product: Product,
      setProduct: React.Dispatch<React.SetStateAction<Product>>,
     setNewVariant: React.Dispatch<React.SetStateAction<Variant>>) => {
    e.preventDefault();
    console.log(newVariant);
    if (newVariant.name === "" && (product.variants?.length === 0 || !product.variants)) { 
      if(window.confirm("Du har inte angett en variant, vill du fortsätta?")) {
        const productPrice = newVariant.price;
        const initProduct = {
          ...product,
          variants: [],
          price: productPrice,}
        setProduct(initProduct);
        return;
      }
    };

    setProduct((prev) => {
      const variant = prev?.variants || [];
      if (!variant.includes(newVariant)) {
        return {
          ...prev,
          variants: [...variant, newVariant],
        } as Product;
      }
      console.log(prev)
      return prev;
    });
    setNewVariant(initVariant);
  };

  export const handleAddOption = (e: React.MouseEvent<HTMLButtonElement>,
    setProduct: React.Dispatch<React.SetStateAction<Product>>,
    setNewOption: React.Dispatch<React.SetStateAction<string>>,
    newOption: string
  ) => {
    e.preventDefault();
    if (newOption.trim() === "") return;

    setProduct((prev) => {
      const options = prev?.options || [];
      if (!options.includes(newOption)) {
        return {
          ...prev,
          options: [...options, newOption],
        } as Product;
      }
      return prev;
    });
    setNewOption("");
  };

  export const setFormData = (product : Product, id : number, images : File[]) => {
    if (!product) return;

    const formData = new FormData();

    formData.append("name", product?.name || "");
    formData.append("categoryId", id.toString());
    formData.append("description", product?.description || "");
    formData.append("brand", product?.brand || "");
    formData.append("discount", product?.discount?.toString() || "");
    formData.append("price", product?.price.toString().replace(",", ".") || "0");

    product.options?.forEach((option) => {
      formData.append("options", option || "");})
      product.variants?.forEach((variant) => {
      formData.append("variants", JSON.stringify(variant) || "");});
    images.forEach((image) => {
      formData.append("images", image);
    });
    return formData as FormData;
  }

  export const handlePostProduct = async (e: React.FormEvent<HTMLFormElement>,
     product: Product,
     id: number,
     images: File[],
    setNewProd: React.Dispatch<React.SetStateAction<boolean>>,
    setShow: React.Dispatch<React.SetStateAction<boolean>>,
    setProduct: React.Dispatch<React.SetStateAction<Product>>,
    ) => {
    e.preventDefault();

    const formData = setFormData(product, id, images);

    try {
        if (!formData) {
            console.error("Form data is not set correctly.");
            return;
        }
      const response = await createProduct(formData);
      console.log("Product created:", response);
      console.log("FormData:", formData);
      setNewProd(true);
      setShow(false);
      setProduct({
          id: 0,
          categoryId: id,
          name: "",
          description: "",
          price: 0,
          brand: "",
          options: [],
          variants: [],
          discount: 0,
          images: [],
        });
    } catch (error) {
      console.error("Error creating product:", error);
      console.log(formData)
    }
  };