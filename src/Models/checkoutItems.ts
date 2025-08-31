import { Product } from "./Product";
import { Variant } from "./Variant";


export type CheckoutItems = {
    product: Product;
    productId: number;
    name: string;
    totalPrice: number;
    option: string | null;
    variant: Variant | null;
    quantity: number;
    productImage: string;
}