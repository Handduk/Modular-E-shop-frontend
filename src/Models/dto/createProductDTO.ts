import { Variant } from "../Variant";

export type CreateProductDTO = {
    categoryId: number;
    brand?: string;
    name: string;
    description: string;
    options?: string[];
    price: number;
    discount?: number;
    images: File[];
    variants: Variant[];
    variantImages: { variantId: number; file: File }[];
}