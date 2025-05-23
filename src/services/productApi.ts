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
    console.log("Deleting product with ID:", id);
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