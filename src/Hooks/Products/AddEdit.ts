import { CreateProductDTO } from "../../Models/dto/createProductDTO";
import { Product } from "../../Models/Product";
import { Variant } from "../../Models/Variant";
import { createProduct } from "../../services/productApi";

export  const initVariant: Variant = {
    id: 0,
    productId: 0,
    variantName: "",
    variantPrice: 0,
    variantImg: "",
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
    if (newVariant.variantName === "" && (product.variants?.length === 0 || !product.variants)) { 
      if(window.confirm("Du har inte angett en variant, vill du fortsätta?")) {
        const productPrice = newVariant.variantPrice;
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
    const dto: CreateProductDTO = {
      categoryId: id,
      brand: product.brand,
      name: product.name,
      description: product.description,
      options: product.options,
      price: product.price,
      discount: product.discount,
      images: images,
      variants: product.variants || [],
      variantImages: [],
    } 
    if (!dto) return;
    const formData = new FormData();
    formData.append("categoryId", dto.categoryId.toString());
    formData.append("name", dto.name);
    formData.append("description", dto.description);
    formData.append("brand", dto.brand || "");
    formData.append("discount", dto.discount?.toString() || "");
    formData.append("price", dto.price.toString());

    dto.options?.forEach((option) => {
      formData.append("options", option || "");
    });

    dto.images.forEach((file) => {
      formData.append("images", file);
    });

    formData.append("variantJson", JSON.stringify(dto.variants));

    dto.variantImages.forEach(({ variantId, file }) => {
      const filename = `variant_${variantId}_${file.name}`;
      const blob = new File([file], filename, { type: file.type });
      formData.append("variantImages", blob);
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