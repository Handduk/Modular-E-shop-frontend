export type Product = {
    id: number,
    categoryId: number,
    brand?: string,
    name: string,
    description: string,
    img: string[],
    price: number,
    size?: string,
    sale?: number,
    stock: number,
}