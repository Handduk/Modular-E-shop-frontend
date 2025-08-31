import { Product } from "../../Models/Product";


export const getProductImage = (product: Product, option: string | null) => {
    if (!product) return "";
    if (!option) return product.images[0];
    if (!product.options) return product.images[0];

      const optionIndex = product.options.findIndex((opt) => opt === option);
      console.log("Option index:", optionIndex);
      return product.images[optionIndex] || product.images[0];
}