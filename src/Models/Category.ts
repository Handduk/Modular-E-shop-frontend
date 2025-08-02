import { Product } from "./Product"

export type Category = {
    id: number,
    name: string,
    description?: string,
    image?: string,
    products?: Product[],
}