export type Product = {
    id: number,
    categoryId: number,
    brand?: string,
    name: string,
    description: string,
    img: string[],
    options?: string[],
    price: number,
    sizes?: string[],
    sale?: number,
}