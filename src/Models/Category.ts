import { Product } from "./Product"

export type Category = {
    id: number,
    name: string,
    img: string,
    link: string,
    component: JSX.Element,
    products: Product[],
}