import axios from "axios"
import { Product } from "../Models/Product";

const API_URL = `${import.meta.env.VITE_API_URL}/products`;

export const getAllProducts = async () => {
    try{
        const response = await axios.get(API_URL);
        return response.data;
    } catch (ex) {
        console.error(ex);
        throw ex
    }
}

export const getProductById = async (id: string) => {
    try{
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data;
    } catch (ex) {
        console.error(ex);
        throw ex
    }
}

export const createProduct = async (product: Product) => {
    try{
        const response = await axios.post(API_URL, product);
        return response.data;
    } catch (ex) {
        console.error(ex);
        throw ex
    }
}

export const updateProduct = async (product: Product) => {
    try{
        const response = await axios.patch(`${API_URL}/${product.id}`, product);
        return response.data;
    } catch (ex) {
        console.error(ex);
        throw ex
    }
}

export const deleteProduct = async (id: string) => {
    try{
        const response = await axios.delete(`${API_URL}/${id}`);
        return response.data;
    } catch (ex) {
        console.error(ex);
        throw ex
    }
}