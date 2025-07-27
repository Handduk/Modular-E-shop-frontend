import { Variant } from "./Variant";

export type Product = {
    id: number,
    categoryId: number,
    brand?: string,
    name: string,
    description: string,
    options?: string[],
    price: number,
    variants?: Variant[],
    discount?: number,
    images: string[],
}