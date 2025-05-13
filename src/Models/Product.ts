export type Product = {
    id: number,
    categoryId: number,
    brand?: string,
    name: string,
    description: string,
    options?: string[],
    price: number,
    variants?: string[],
    discount?: number,
    images: string[],
}