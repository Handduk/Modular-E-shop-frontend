import axios from "axios"
import { Product } from "../Models/Product";

const API_URL = `${import.meta.env.VITE_API_URL}/products`;

export const getAllProducts = async () => {
    try{
        const response = await axios.get<Product[]>(API_URL);
        return response.data;
    } catch (ex) {
        console.error(ex);
        throw ex
    }
}

export const getProductById = async (id: number) => {
    try{
        const response = await axios.get<Product>(`${API_URL}/${id}`);
        return response.data;
    } catch (ex) {
        console.error(ex);
        throw ex
    }
}

export const getProductListForCheckout = async (ids: number[]) => {
    if (!ids || ids.length === 0) {
        console.error("IDs array is undefined, null, or empty");
        return [];
    }
    try {
        console.log(`Fetching products for checkout with IDs: ${ids}`);
        const response = await axios.get<Product[]>(`${API_URL}/${ids}`);
        return response.data;
    } catch (ex) {
        console.error(`Error fetching products for checkout: ${ex}`);
        throw ex
    }
}

export const createProduct = async (product: FormData) => {
    try{
        const response = await axios.post<Product>(API_URL, product);
        return response.data;
    } catch (ex) {
        console.error(ex);
        throw ex
    }
}

export const updateProduct = async (product: FormData, id: number) => {
    try{
        const response = await axios.patch<Product>(`${API_URL}/${id}`, product);
        return response.data;
    } catch (ex) {
        console.error(ex);
        throw ex
    }
}

export const deleteProduct = async (id: number) => {
    try{
        if(!id) {
            console.error("ID is undefined or null");
            return;}
        const response = await axios.delete(`${API_URL}/${id}`
        );
        return response.status;
    } catch (ex) {
        console.error(ex);
        throw ex
    }
}