import { Variant } from "../Variant";

export type UpdateProductDTO = {
    brand?: string;
    name: string;
    description: string;
    price: number;
    discount?: number;
    options?: string[];
    newImages: File[];
    keptImages: string[];
    variants: Variant[];
    variantImages: { variantId: number; file: File }[];
}