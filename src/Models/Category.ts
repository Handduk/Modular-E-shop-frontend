import { Product } from "./Product"

export type Category = {
    id: number,
    name: string,
    description?: string,
    images?: string,
    products?: Product[],
}