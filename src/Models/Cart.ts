import { Product } from "./Product";
import { Variant } from "./Variant";

export type CartItem = {
    product: Product;
      option: string | null;
      variant: Variant | null;
      quantity: number;
}